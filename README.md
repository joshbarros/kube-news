# Kube News

Kube News is a full-stack monorepo built with modern TypeScript tooling and cloud-native practices.

It includes:
- A NestJS API with Prisma + PostgreSQL
- A Next.js frontend with Tailwind CSS v4, shadcn/ui, and Redux Toolkit (RTK Query)
- Local development with Docker Compose
- Kubernetes + Helm assets for deployment workflows

## Project Goals

- Provide a clean full-stack reference architecture for DevOps and platform learning
- Keep backend and frontend strongly typed through a shared package
- Enable fast local iteration and straightforward Kubernetes deployment
- Follow production-minded standards (health/readiness probes, validation, versioned API)

## Tech Stack

- Language: TypeScript
- Package manager: pnpm workspaces
- Monorepo orchestrator: Turborepo
- Backend: NestJS 10, Prisma, PostgreSQL
- Frontend: Next.js 15 (App Router), React 19
- State management: Redux Toolkit + RTK Query
- UI: Tailwind CSS v4, shadcn/ui, Radix primitives
- Containers and orchestration: Docker, Kubernetes, Helm

## Repository Structure

```text
.
├── apps/
│   ├── api/                   # NestJS API
│   │   ├── prisma/            # Prisma schema and migrations
│   │   └── src/
│   │       ├── health/        # /health and /ready
│   │       ├── posts/         # Posts module, DTOs, service, controller
│   │       └── prisma/        # Prisma module/provider wiring
│   └── web/                   # Next.js app (App Router)
│       └── src/
│           ├── app/           # Routes and layout
│           ├── components/    # UI and feature components
│           └── lib/           # Store, API client, helpers
├── packages/
│   └── types/                 # Shared domain types
├── helm/
│   └── kube-news/             # Helm chart (legacy single-image deployment)
├── k8s/                       # Raw Kubernetes manifests (legacy single-image deployment)
├── docker-compose.yml         # Local PostgreSQL
├── turbo.json
├── pnpm-workspace.yaml
└── README.md
```

## Prerequisites

- Node.js >= 22
- pnpm >= 10
- Docker Desktop (for local PostgreSQL and optional Kubernetes)
- kubectl + Helm (optional, for cluster deployment)

## Quick Start (Local)

1. Install dependencies from repository root:

```bash
pnpm install
```

2. Start PostgreSQL locally:

```bash
docker compose up -d
```

3. Run Prisma migration in the API app:

```bash
cd apps/api
pnpm exec prisma migrate dev --name init
```

4. Return to repository root and start both apps:

```bash
cd ../..
pnpm dev
```

5. Open:
- Web: http://localhost:3000
- API: http://localhost:3001
- Swagger: http://localhost:3001/api/docs

## Environment Variables

### API (`apps/api/.env`)

```env
DATABASE_URL="postgresql://kubedevnews:Pg%23123@localhost:5432/kubedevnews"
PORT=3001
CORS_ORIGIN="http://localhost:3000"
```

Important:
- If your password contains `#`, encode it as `%23` in `DATABASE_URL`.

### Web (`apps/web/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Monorepo Commands

From repository root:

```bash
pnpm dev      # Run all dev servers via Turbo
pnpm build    # Build all workspaces
pnpm lint     # Run lint tasks in all workspaces
pnpm format   # Format TS/TSX/JSON/CSS/MD files
```

### App-Specific Commands

API (`apps/api`):

```bash
pnpm dev
pnpm build
pnpm start
pnpm exec prisma generate
pnpm exec prisma migrate dev --name <migration-name>
```

Web (`apps/web`):

```bash
pnpm dev
pnpm build
pnpm start
```

## API Overview

Base URL: `http://localhost:3001/api/v1`

- `GET /posts` - List all posts (sorted by publish date descending)
- `GET /posts/:id` - Fetch one post
- `POST /posts` - Create post
- `PATCH /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

Operational endpoints:
- `GET /health` - Liveness endpoint
- `GET /ready` - Readiness endpoint (checks database availability)

## Data Model

Prisma model: `Post`

- `id` (Int, auto-increment)
- `title` (String)
- `summary` (String)
- `content` (String)
- `publishDate` (DateTime, default now)
- `createdAt` (DateTime, default now)
- `updatedAt` (DateTime, auto-updated)

## Kubernetes and Helm

This repository contains deployment assets under:
- `k8s/` for raw manifests
- `helm/kube-news/` for Helm-based deployment

Current status:
- These assets still target the legacy single-image deployment (`goldenglowitsolutions/kube-news:1.0.0`).
- The new monorepo architecture runs two apps (`api` and `web`) and should be reflected in updated manifests/chart values.

Recommended next deployment update:
- Split workloads into `kube-news-api` and `kube-news-web`
- Inject full `DATABASE_URL` for Prisma in API deployment
- Set `NEXT_PUBLIC_API_URL` in web deployment to the internal API service
- Keep PostgreSQL in-cluster or point to an external managed instance

## E2E Validation Snapshot

A browser-driven validation flow was executed successfully in the VS Code integrated browser:
- Opened home page
- Created a new post through the frontend form
- Confirmed persistence through API (`GET /api/v1/posts`)
- Opened the created post detail page

## License

For training and demo purposes.
