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
- Helm deploys split workloads for API and Web (`kube-news-api` and `kube-news-web`) plus in-cluster PostgreSQL.
- API and Web images are published independently and can be versioned with separate tags.

Recommended next deployment update:
- Add a Helm hook Job (or initContainer) to run Prisma migrations automatically during release upgrades.
- Add chart-level smoke tests (Helm test pods) for API health and web homepage checks.

## E2E Validation Snapshot

A local Kubernetes + Helm E2E run was executed on Docker Desktop using chart release `kube-news` in namespace `kube-news`.

Validated results:
- Helm upgrade/install completed with API and Web images tagged `2.0.3`
- API health endpoint responded successfully (`GET /health`)
- Posts endpoint responded successfully (`GET /api/v1/posts`)
- Web app homepage responded successfully (HTTP `200`)

Validation notes:
- On macOS Docker Desktop, direct NodePort access to `localhost:30081` and `localhost:30082` can be unavailable depending on local networking setup.
- For reliable local verification, service checks were executed with `kubectl port-forward` against API and Web services.
- Database schema was synchronized in-cluster using Prisma after deployment (`prisma db push --accept-data-loss`) because migration history and existing schema state were not yet baselined.

## License

For training and demo purposes.
