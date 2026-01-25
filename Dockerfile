# --------------------------
# Base image
# --------------------------
FROM node:22.17.0-alpine AS base

RUN apk add --no-cache libc6-compat bash git curl

WORKDIR /app

# Enable pnpm
RUN corepack enable pnpm

# --------------------------
# Dependencies
# --------------------------
FROM base AS deps

COPY pnpm-lock.yaml* package.json ./
RUN pnpm install --frozen-lockfile

# --------------------------
# Builder
# --------------------------
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV IS_BUILDING=true
RUN pnpm run build

# --------------------------
# Production runner
# --------------------------
FROM base AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Non-root user
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# ---- REQUIRED FOR PAYLOAD ----
# Payload runtime + CLI + adapters
COPY --from=deps /app/node_modules ./node_modules

# Payload config + source
COPY payload.config.* tsconfig.json ./
COPY src ./src

# Payload migrations (CRITICAL)
COPY src/migrations ./src/migrations

# ---- NEXT.JS STANDALONE ----
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Run migrations, then start server
CMD ["sh", "-c", "pnpm exec payload migrate && node server.js"]
