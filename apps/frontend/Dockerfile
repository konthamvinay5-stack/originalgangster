# # ---------- Build Stage ----------
# ARG NODE_VERSION=22.13.1
# FROM node:${NODE_VERSION}-bullseye-slim AS build
# WORKDIR /app

# # Install dependencies
# COPY package.json package-lock.json* ./
# RUN npm install

# # Copy app source
# COPY . .

# # Build the Vite app
# RUN npm run build

# # ---------- Production Stage ----------
# FROM nginx:1.25.2-alpine
# WORKDIR /usr/share/nginx/html

# # Copy built files from build stage
# COPY --from=build /app/dist .

# # custom nginx config
# COPY nginx.conf /etc/nginx/conf.d/default.conf 
# EXPOSE 80

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]
# ---------- Build Stage ----------
ARG NODE_VERSION=22.13.1
FROM node:${NODE_VERSION}-bullseye-slim AS build
WORKDIR /app

# Copy package.json first to leverage cache
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build React (Vite) app
RUN npm run build

# ---------- Production Stage ----------
FROM nginx:1.25.2-alpine
WORKDIR /usr/share/nginx/html

# Copy built files
COPY --from=build /app/dist .

# Custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
