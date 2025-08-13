# Stage 1: build
FROM node:20-alpine AS build
WORKDIR /app

# ускорение сборки: включаем corepack для yarn/pnpm
RUN corepack enable || true

COPY package.json ./
# если есть lock-файл, копируем его
COPY package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# установка deps
RUN if [ -f pnpm-lock.yaml ]; then \
      corepack enable pnpm && pnpm i --frozen-lockfile; \
    elif [ -f yarn.lock ]; then \
      corepack enable yarn && yarn install --frozen-lockfile; \
    else \
      npm ci || npm install; \
    fi

# копируем исходники
COPY . .

# билд (универсально)
RUN if [ -f pnpm-lock.yaml ]; then pnpm build; \
    elif [ -f yarn.lock ]; then yarn build; \
    else npm run build; fi

# Stage 2: serve static
FROM nginx:alpine
# Директория билда передается как ARG (dist|build)
ARG BUILD_DIR=dist
ENV BUILD_DIR=${BUILD_DIR}

# nginx конфиг (SPA + кеш ассетов)
RUN rm -f /etc/nginx/conf.d/default.conf
COPY infra/nginx.conf /etc/nginx/conf.d/site.conf

# Копируем артефакты (dist или build)
COPY --from=build /app/${BUILD_DIR} /usr/share/nginx/html
EXPOSE 80
