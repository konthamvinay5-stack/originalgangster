# Use explicit Node version
ARG NODE_VERSION=18.18.0
FROM node:${NODE_VERSION}-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy application source code
COPY . .

# Create non-root user
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

# Set environment variables
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Expose backend port
EXPOSE 5000

# Switch to non-root user
USER appuser

# Start the application
CMD ["node", "server.js"]
