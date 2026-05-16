FROM node:22-alpine AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
WORKDIR /app
RUN corepack enable

FROM base AS builder
COPY . .
ENV CI=true
RUN pnpm install --frozen-lockfile
RUN pnpm build
RUN pnpm deploy --legacy --filter=@kube-news/api --prod /out/api
# Copy Prisma generated client (.prisma) into the deployed api folder
RUN src=$(find /app/node_modules/.pnpm -maxdepth 3 -type d -name ".prisma" 2>/dev/null | head -1) && \
    if [ -n "$src" ]; then \
    dest_parent=$(find /out/api/node_modules/.pnpm -maxdepth 2 -type d -name "@prisma+client*" 2>/dev/null | head -1) && \
    mkdir -p "$dest_parent/node_modules" && \
    cp -r "$src" "$dest_parent/node_modules/.prisma"; \
    fi
RUN pnpm deploy --legacy --filter=@kube-news/web --prod /out/web

FROM node:22-alpine AS api-runtime
WORKDIR /app
COPY --from=builder /out/api ./
EXPOSE 3001
CMD ["node", "dist/main.js"]

FROM node:22-alpine AS web-runtime
WORKDIR /app
COPY --from=builder /out/web ./
EXPOSE 3000
CMD ["node", "node_modules/next/dist/bin/next", "start", "--port", "3000"]
