# --- build stage ---
FROM node:20-alpine AS build
WORKDIR /app

ARG BUILD_VERSION
ARG BUILD_TIME
ENV BUILD_VERSION=${BUILD_VERSION}
ENV BUILD_TIME=${BUILD_TIME}

COPY package*.json bun.lockb* ./
RUN npm ci --only=production

COPY . .
RUN npm run build \
  && npm prune --production \
  && npm cache clean --force

# --- nginx stage ---
FROM nginx:alpine

ARG BUILD_VERSION
ARG BUILD_TIME
ENV BUILD_VERSION=${BUILD_VERSION}
ENV BUILD_TIME=${BUILD_TIME}

COPY --from=build /app/dist /usr/share/nginx/html

RUN addgroup -S nginx && adduser -S -G nginx nginx \
  && mkdir -p /var/cache/nginx /var/run \
  && chown -R nginx:nginx /var/cache/nginx /var/run /usr/share/nginx/html \
  && sed -i 's/listen       80;/listen       8080;/' /etc/nginx/conf.d/default.conf

EXPOSE 8080
USER nginx

HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget -qO- http://localhost:8080/ || exit 1
