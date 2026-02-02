#!/bin/bash

set -e

# Change to the project directory on the remote server
cd /var/www/blog

# Fix "dubious ownership" error
git config --global --add safe.directory /var/www/blog

echo "Starting deployment..."

echo "Pulling latest changes..."
git pull origin main

echo "Building Docker images..."
docker compose -f docker-compose.yml down --remove-orphans
docker system prune --all -f
source .env

# Build with retry logic to handle Docker registry timeouts
MAX_RETRIES=3
RETRY_COUNT=0
BUILD_SUCCESS=false

echo "Building Docker images with retry logic..."
while [ $RETRY_COUNT -lt $MAX_RETRIES ] && [ "$BUILD_SUCCESS" = false ]; do
    echo "Build attempt $((RETRY_COUNT + 1)) of $MAX_RETRIES..."

    echo "Pulling base images..."

    # Pull the exact version used in Dockerfile
    docker pull node:22.17.0-alpine

    echo "✅ Base images cached successfully!"
    echo "You can now run your docker build or docker-compose commands"

    
    if docker compose -f docker-compose.yml build; then
        BUILD_SUCCESS=true
        echo "✅ Build successful!"
    else
        RETRY_COUNT=$((RETRY_COUNT + 1))
        if [ $RETRY_COUNT -lt $MAX_RETRIES ]; then
            echo "⚠️  Build failed, retrying in 5 seconds..."
            sleep 5
        else
            echo "❌ Build failed after $MAX_RETRIES attempts"
            exit 1
        fi
    fi
done


echo "Restarting services..."
docker compose -f docker-compose.yml up -d 2>&1 &

echo "Cleaning up unused images..."
docker image prune -f

echo "Deployment completed successfully!"
