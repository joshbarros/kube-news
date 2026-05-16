# Kube-News API Endpoints

## Web UI

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/` | Home page — lists all news articles |
| `GET` | `/post` | Render create news form |
| `POST` | `/post` | Submit new news article (title < 30 chars, summary < 50 chars, content < 2000 chars) |
| `GET` | `/post/:id` | View a single news article by ID |

## REST API

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/post` | Bulk insert news articles via JSON body `{ "artigos": [{ "title", "resumo", "description" }] }` |

## Health & Observability

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Liveness check — returns `{ state, machine }` |
| `GET` | `/ready` | Readiness check — returns `200 Ok` or `500` |
| `PUT` | `/unhealth` | Forces the app into an unhealthy state (all requests return 500) |
| `PUT` | `/unreadyfor/:seconds` | Makes the app unready for N seconds |
| `GET` | `/metrics` | Prometheus metrics (mounted by `express-prom-bundle`) |
