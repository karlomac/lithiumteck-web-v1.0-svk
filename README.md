# Lithiumteck Web v1.0

Marketing/portfolio site for **Lithiumteck** (Minecraft server solutions: world building, custom plugins, asset design) built with SvelteKit.

## Site overview

- **`/`** — Landing page: hero, services, featured projects, code showcase, contact CTA (static content).
- **`/portfolio`** — World-building portfolio gallery with client-side category filtering.
- **`/plugins`** — Technical/plugin showcase (features, deliverables, demo/code preview).
- **`/health`** — Plain-text health endpoint (`ok`) for container/platform health checks.

Current UI content is static/hardcoded; PocketBase is intended as an external backend but is not yet wired into the app runtime.

## Tech stack

- **Frontend:** SvelteKit 2 / Svelte 5, Tailwind CSS 4
- **Backend (external):** PocketBase (separate deployment)
- **Adapter:** `@sveltejs/adapter-node` (`node build`)
- **Package manager:** pnpm
- **Deployment:** Dockerfile / Docker Compose (Dokploy/Coolify-ready)

## Local development

### Prerequisites
- Node.js 20+
- pnpm

### Setup
```sh
pnpm install
cp .env.example .env
# edit .env as needed (at minimum set POCKETBASE_URL for compose parity)
pnpm dev
```

### Scripts
```sh
pnpm dev            # start dev server
pnpm build          # production build
pnpm preview        # preview production build
pnpm lint           # eslint
pnpm check          # svelte-check
pnpm syntax-check   # custom syntax validator
pnpm validate       # syntax-check + lint + check
```

## Configuration (`.env`)

Use `.env.example` as the template. Do not commit `.env` (gitignored).

| Variable | Required | Purpose |
|---|---:|---|
| `POCKETBASE_URL` | yes (compose) | URL of the separately deployed PocketBase instance used by the app |
| `PUBLIC_SITE_URL` | recommended | Canonical/public site URL |
| `PUBLIC_SITE_NAME` | recommended | Site name (default `Lithiumteck`) |
| `PUBLIC_SITE_DESCRIPTION` | no | Site meta/description text |
| `ORIGIN` | no | Pin SvelteKit origin only if needed; leave empty when proxy headers are trusted |
| `PROTOCOL_HEADER` / `HOST_HEADER` / `ADDRESS_HEADER` | set in compose | Trust Traefik/Dokploy forwarded headers for correct origin/form handling |
| `XFF_DEPTH` | no | Trusted proxy hop depth (default `1`) |
| `POCKETBASE_GOOGLE_CLIENT_ID/SECRET` | no | OAuth config (managed on PocketBase instance as applicable) |
| `POCKETBASE_GITHUB_CLIENT_ID/SECRET` | no | OAuth config |
| `SMTP_HOST/PORT/USERNAME/PASSWORD/FROM` | no | Email/notification settings (if used) |

> **PocketBase:** deployed separately. This repo deploys the SvelteKit frontend only; provide `POCKETBASE_URL` via platform env (Dokploy/Coolify UI) or local `.env`.

## Deployment (Dokploy / Coolify)

See **[COOLIFY-DOCKERFILE.md](./COOLIFY-DOCKERFILE.md)** for the concise deploy guide.

**Docker Compose (`docker-compose.yml`, recommended for Dokploy):**
- No host `ports:` published; uses `expose: "3000"` for Traefik/internal networking.
- Map domain to service **`web`**, **container port `3000`**; enable HTTPS.
- No committed `env_file`; variables are declared as `${VAR}` for platform injection. `POCKETBASE_URL` is required.
- Proxy headers configured to avoid cross-site form POST/origin issues behind reverse proxy.
- Health check: `GET /health`.

**Dockerfile:** multi-stage build (Node 20 Alpine, pnpm) producing `node build` on port 3000 with proxy-header defaults and container healthcheck.

```sh
# verify after deploy
curl https://yourdomain.com/health
```

`docker-compose.yml` is production/Dokploy-oriented; for local container runs you may need to adapt port mapping/env for your environment.

## Project structure

```
.
├── src/
│   ├── routes/              # SvelteKit routes (+page.svelte, /portfolio, /plugins, /health)
│   ├── lib/                 # Shared assets/utilities
│   ├── app.html             # App shell (fonts/icons, dark mode)
│   └── app.d.ts
├── static/                  # Static assets (robots.txt, etc.)
├── Dockerfile               # Multi-stage production image
├── docker-compose.yml       # Dokploy/Coolify Compose config
├── .coolify.json            # Coolify metadata
├── .env.example             # Environment variable template
├── COOLIFY-DOCKERFILE.md    # Deploy guide
├── README-SEEDING.md        # PocketBase schema/seeding notes
└── pocketbase-seed.js       # Example seeding script
```

## Notes

- `README-SEEDING.md`, `pocketbase-seed.js`, and `import-json.js` are scaffolding/docs for an external PocketBase setup; app-side integration is not implemented yet.
- Private project. Built with [SvelteKit](https://kit.svelte.dev) & [PocketBase](https://pocketbase.io).
