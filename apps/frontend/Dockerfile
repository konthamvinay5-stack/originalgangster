# syntax=docker/dockerfile:1

# ----------- Build Stage -----------
ARG NODE_VERSION=22.13.1
FROM node:${NODE_VERSION}-bullseye-slim AS build
WORKDIR /app

# Install dependencies using npm ci for deterministic builds
COPY --link package.json ./
# No package-lock.json present, so fallback to npm install
RUN --mount=type=cache,target=/root/.npm npm install

# Copy all source code (excluding files in .dockerignore)
COPY --link . .

# Build the Vite app
RUN npm run build

# ----------- Production Stage (Nginx) -----------
FROM nginx:1.25.2-alpine AS final
WORKDIR /usr/share/nginx/html

# Copy built frontend from build stage
COPY --from=build /app/dist .

# Use a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
