# syntax=docker/dockerfile:1
ARG NODE_VERSION=22.13.1
FROM node:${NODE_VERSION}-slim AS base
WORKDIR /app

# Install dependencies with cache and bind mounts for deterministic builds
COPY --link package.json ./
# No package-lock.json present, so fallback to npm install
RUN --mount=type=cache,target=/root/.npm npm install --production

# Copy application source (excluding .env, .git, etc. via .dockerignore)
COPY --link . .

# Create non-root user
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"

EXPOSE 4000
USER appuser

CMD ["node", "server.js"]
