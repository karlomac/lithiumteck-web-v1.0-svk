# Lithiumteck Web v1.0

Premium Minecraft server solutions platform built with SvelteKit and PocketBase.

## 🚀 Quick Deploy to Coolify

```bash
# Validate deployment configuration
./coolify-setup.sh

# Push to your Git repository
git push origin main
```

Then follow the steps in **[COOLIFY-QUICKSTART.md](./COOLIFY-QUICKSTART.md)** for complete deployment guide.

**Deployment Files:**
- `Dockerfile` - Production build (main deployment file)
- `.coolify.json` - Coolify-specific config
- `docker-compose.yml` - Local development only
- `DEPLOYMENT.md` - Detailed deployment guide
- `COOLIFY-QUICKSTART.md` - Quick start guide

## 📋 Tech Stack

- **Frontend:** SvelteKit 2.x with Tailwind CSS 4.x
- **Backend:** PocketBase (SQLite)
- **Adapter:** @sveltejs/adapter-node
- **Package Manager:** pnpm
- **Deployment:** Docker + Coolify

## 🏃 Local Development

### Prerequisites

- Node.js 20+
- pnpm

### Setup

```sh
# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env

# Start development server
pnpm run dev

# Or open in browser automatically
pnpm run dev -- --open
```

### Development Scripts

```sh
# Start dev server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Run linting
pnpm run lint

# Check syntax
pnpm run syntax-check

# Validate everything
pnpm run validate
```

## 🐳 Docker Development

```sh
# Start full stack (SvelteKit + PocketBase)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Services:**
- Web app: http://localhost:3000
- PocketBase Admin: http://localhost:8090/_/

## 🌐 Production Deployment

This project is optimized for **Coolify** deployment:

1. Run validation: `./coolify-setup.sh`
2. Follow [COOLIFY-QUICKSTART.md](./COOLIFY-QUICKSTART.md)
3. Configure environment variables in Coolify
4. Deploy and monitor

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 📚 Documentation

**Deployment Guides:**
- **[COOLIFY-DOCKERFILE.md](./COOLIFY-DOCKERFILE.md)** - **Main deployment guide** (Dockerfile)
- **[COOLIFY-QUICKSTART.md](./COOLIFY-QUICKSTART.md)** - Quick reference
- **[DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md)** - Step-by-step checklist

**Additional:**
- **[README-SEEDING.md](./README-SEEDING.md)** - Database schema and seeding
- **[.env.example](./.env.example)** - Environment variables reference

## 🔧 Project Structure

```
.
├── src/
│   ├── routes/          # SvelteKit routes
│   └── lib/             # Shared components & utilities
├── static/              # Static assets
├── build/               # Production build output
├── Dockerfile           # Multi-stage Docker build
├── docker-compose.yml   # Full stack orchestration
└── .coolify.json        # Coolify configuration
```

## 🛠️ Environment Variables

See `.env.example` for all available configuration options.

**Required:**
- `POCKETBASE_URL` - External PocketBase instance URL (https://your-pocketbase-instance.com)
- `PUBLIC_SITE_URL` - Public site URL
- `PUBLIC_SITE_NAME` - Site name

**Optional:**
- OAuth credentials (Google, GitHub) - configured on PocketBase instance
- `PUBLIC_SITE_DESCRIPTION` - Site meta description

> **Note:** PocketBase is deployed separately. This deployment only includes the SvelteKit frontend.

## 📝 License

Private project - All rights reserved

---

**Built with [SvelteKit](https://kit.svelte.dev) & [PocketBase](https://pocketbase.io)**
