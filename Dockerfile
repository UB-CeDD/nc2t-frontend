# =========================
# Build Stage
# =========================
FROM node:20-alpine AS builder
# NOTE: Node 20 is currently LTS and safer than 22 for production

WORKDIR /app

# Copy dependency manifests first (prevents ENOENT and improves caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --no-audit --no-fund

# Copy application source
COPY . .

# Build Vite app
RUN npm run build


# =========================
# Runtime Stage
# =========================
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP port for Nginx Proxy Manager
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]