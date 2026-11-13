# Dokploy / Coolify Deployment

PocketBase is deployed separately; this app reads its URL from env (`POCKETBASE_URL`, set in Dokploy/Coolify env UI or local `.env`—do not commit `.env`).

## Docker Compose (Dokploy-ready)
`docker-compose.yml`:
- No host `ports:` (avoids "port is already allocated"); uses `expose: ["3000"]`. Map domain to service **`web`**, **container port `3000`**.
- No committed `env_file`; vars declared under `environment:` as `${VAR}` for platform injection. `POCKETBASE_URL` is required (`${POCKETBASE_URL:?…}`).
- SvelteKit behind proxy: `PROTOCOL_HEADER=x-forwarded-proto`, `HOST_HEADER=x-forwarded-host`, `ADDRESS_HEADER=x-forwarded-for`, `XFF_DEPTH` (prevents 403 cross-site POST). Set `ORIGIN=https://your-domain` only to pin it; never default to localhost.
- Healthcheck: `GET /health` (`src/routes/health/+server.js`).

Deploy: New Resource → Docker Compose, file `docker-compose.yml`, set env vars (see `.env.example`), domain → `web:3000`, HTTPS.

## Dockerfile
Builds adapter-node app on port 3000 with proxy-header envs and `/health` healthcheck (Dockerfile deploy: domain → container port 3000).

Verify: `curl https://yourdomain.com/health`
