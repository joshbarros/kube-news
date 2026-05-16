FROM node:22-alpine AS base

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps ./apps
COPY packages ./packages

FROM base AS deps
RUN pnpm install --frozen-lockfile

FROM deps AS api-builder
RUN pnpm --filter @kube-news/api build

FROM node:22-alpine AS api-runtime
ENV NODE_ENV=production
WORKDIR /app/apps/api

COPY --from=deps /app/node_modules /app/node_modules
COPY --from=deps /app/apps/api/node_modules ./node_modules
COPY --from=api-builder /app/apps/api/dist ./dist
COPY --from=api-builder /app/apps/api/prisma ./prisma
COPY --from=api-builder /app/apps/api/package.json ./package.json

USER node
EXPOSE 3001
CMD ["node", "dist/main.js"]

FROM deps AS web-builder
RUN pnpm --filter @kube-news/web build

FROM node:22-alpine AS web-runtime
ENV NODE_ENV=production
WORKDIR /app/apps/web

COPY --from=deps /app/node_modules /app/node_modules
COPY --from=deps /app/apps/web/node_modules ./node_modules
COPY --from=web-builder /app/apps/web/.next ./.next
COPY --from=web-builder /app/apps/web/package.json ./package.json
COPY --from=web-builder /app/apps/web/next.config.ts ./next.config.ts

USER node
EXPOSE 3000
CMD ["node", "./node_modules/next/dist/bin/next", "start", "--port", "3000"]
