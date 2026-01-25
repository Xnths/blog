# Base image
FROM node:22.17.0-alpine AS base

# Install system deps
RUN apk add --no-cache libc6-compat bash git curl

WORKDIR /app

# Enable corepack and install pnpm
RUN corepack enable pnpm

# --------------------------
# Install dependencies only when needed
# --------------------------
FROM base AS deps

COPY pnpm-lock.yaml* package.json ./
RUN pnpm i --frozen-lockfile

# --------------------------
# Build the source code
# --------------------------
FROM base AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Enable corepack for pnpm
RUN corepack enable pnpm

# Build Next.js standalone output
RUN IS_BUILDING=true pnpm run build

# --------------------------
# Production image
# --------------------------
FROM base AS runner

WORKDIR /app
ENV NODE_ENV production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Copy standalone Next.js build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy only what PayloadCMS actually needs
COPY --chown=nextjs:nodejs payload.config.* tsconfig.json ./
COPY --chown=nextjs:nodejs src ./src

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
