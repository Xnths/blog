# --------------------------
# Base image
# --------------------------
# Switch from Alpine to Debian slim (bookworm-slim) for ARM environments (Raspberry Pi).
# Alpine uses musl which often forces slow, from-source compilation of native modules (like sharp, swc) on ARM.
# Debian slim provides pre-built glibc binaries, significantly reducing build time and memory usage.
FROM node:22.17.0-bookworm-slim AS base

# Install common build dependencies. libc6-compat is unnecessary on debian.
RUN apt-get update && apt-get install -y --no-install-recommends git curl \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Enable pnpm and set a global store directory for caching
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

# --------------------------
# All dependencies (dev + prod)
# --------------------------
FROM base AS deps

COPY pnpm-lock.yaml* package.json ./

# Utilize Docker BuildKit cache for pnpm store to speed up installations on subsequent builds
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# --------------------------
# Production-only dependencies
# Stripping devDependencies here cuts the node_modules copy size
# in the runner stage by ~50-70%, saving significant layer transfer time.
# --------------------------
FROM deps AS prod-deps

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm prune --prod

# --------------------------
# Builder
# --------------------------
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry to save minor CPU and network time
ENV NEXT_TELEMETRY_DISABLED=1
ENV IS_BUILDING=true

# Utilize BuildKit cache for Next.js to drastically improve subsequent build times
RUN --mount=type=cache,id=nextjs,target=/app/.next/cache pnpm run build

# --------------------------
# Production runner
# --------------------------
FROM base AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1
# Give corepack a writable home so it doesn't crash on the system user's /nonexistent home
ENV COREPACK_HOME=/app/.corepack
ENV HOME=/app

# Non-root user
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

RUN mkdir -p /app/media /app/.corepack \
  && chown -R nextjs:nodejs /app/media /app/.corepack

# ---- REQUIRED FOR PAYLOAD ----
# Copy only production node_modules (no devDependencies)
COPY --from=prod-deps /app/node_modules ./node_modules

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

# Run migrations then start the server.
# NOTE: seed is intentionally excluded — it's a one-time dev operation,
# not something that should run on every container start.
CMD ["sh", "-c", "pnpm exec payload migrate && node server.js"]
