#!/bin/bash
set -e

# Change to the project directory on the remote server
cd /var/www/blog

# Fix "dubious ownership" error
git config --global --add safe.directory /var/www/blog

echo "Starting zero-downtime deployment..."
echo "Pulling latest changes..."
git pull origin main

source .env

# Initialize upstream file if missing
NGINX_UPSTREAM_FILE="nginx/conf.d/upstream.inc"
if [ ! -f "$NGINX_UPSTREAM_FILE" ]; then
    echo 'set $backend_upstream "blog-payload-blue:3000";' > "$NGINX_UPSTREAM_FILE"
fi

# Determine active environment securely
ACTIVE_ENV="blue"
if grep -q "blog-payload-green:3000" "$NGINX_UPSTREAM_FILE"; then
    ACTIVE_ENV="green"
fi

# Set target environment to the opposite
if [ "$ACTIVE_ENV" = "blue" ]; then
    TARGET_ENV="green"
else
    TARGET_ENV="blue"
fi

echo "Current active environment is $ACTIVE_ENV. Deploying to target: $TARGET_ENV..."

echo "Pulling base images..."
docker pull node:22.17.0-bookworm-slim

# Build the target environment
echo "Building $TARGET_ENV environment..."
DOCKER_BUILDKIT=1 COMPOSE_DOCKER_CLI_BUILD=1 docker compose --profile $TARGET_ENV build blog-payload-$TARGET_ENV

# Start the target environment
echo "Starting $TARGET_ENV environment..."
docker compose --profile $TARGET_ENV up -d blog-payload-$TARGET_ENV || { echo "Failed to start $TARGET_ENV"; exit 1; }

# Wait for the target environment to become healthy (Next.js server started)
echo "Waiting for $TARGET_ENV's Next.js server to start..."
MAX_RETRIES=40
RETRY_COUNT=0
HEALTHY=false

# We'll use docker compose exec blog-nginx if nginx is running, otherwise a temporary container
if docker ps | grep -q "blog-nginx"; then
    TEST_CMD="docker exec blog-nginx wget -q --spider http://blog-payload-$TARGET_ENV:3000"
else
    # First deploy, nginx isn't up
    TEST_CMD="docker run --rm --network blog_blog-net curlimages/curl -s -f http://blog-payload-$TARGET_ENV:3000"
fi

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if $TEST_CMD > /dev/null 2>&1; then
        HEALTHY=true
        break
    fi
    echo "Still waiting... (attempt $((RETRY_COUNT + 1))/$MAX_RETRIES)"
    sleep 8
    RETRY_COUNT=$((RETRY_COUNT + 1))
done

if [ "$HEALTHY" = false ]; then
    echo "❌ Start-up check failed for $TARGET_ENV. Aborting switch."
    echo "Stopping failed container..."
    docker compose --profile $TARGET_ENV stop blog-payload-$TARGET_ENV
    exit 1
fi
echo "✅ Target environment $TARGET_ENV is up and running!"

# Start database and other dependent services just in case
docker compose up -d blog-db blog-nginx

# Switch Nginx backend
echo "Switching Nginx backend to $TARGET_ENV..."
echo "set \$backend_upstream \"blog-payload-$TARGET_ENV:3000\";" > "$NGINX_UPSTREAM_FILE"

# Reload Nginx securely
echo "Reloading Nginx to serve new traffic..."
docker exec blog-nginx nginx -s reload
echo "✅ Nginx reloaded to serve $TARGET_ENV!"

# Stop and remove the old environment
echo "Stopping old environment $ACTIVE_ENV..."
docker compose --profile $ACTIVE_ENV stop blog-payload-$ACTIVE_ENV || true
docker compose --profile $ACTIVE_ENV rm -f blog-payload-$ACTIVE_ENV || true

echo "Cleaning up unused images..."
docker image prune -f

echo "🎉 Zero-Downtime Deployment completed successfully!"
