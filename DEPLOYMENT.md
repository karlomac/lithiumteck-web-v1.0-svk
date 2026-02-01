# Coolify Deployment Guide

This guide explains how to deploy the Lithiumteck CRM application to Coolify.

## Architecture

The application consists of two services:
- **SvelteKit Frontend** (Node.js) - Port 3000
- **PocketBase Backend** (Database & API) - Port 8090

## Prerequisites

1. A Coolify instance (self-hosted or managed)
2. Git repository connected to Coolify
3. Domain name (optional but recommended)

## Deployment Steps

### Option 1: Docker Compose Deployment (Recommended)

1. **Create a new project in Coolify**
   - Go to your Coolify dashboard
   - Click "New Resource" → "Docker Compose"
   - Connect your Git repository

2. **Configure Environment Variables**
   
   Add these environment variables in Coolify:
   
   ```env
   # PocketBase Configuration
   POCKETBASE_URL=http://pocketbase:8090
   POCKETBASE_ADMIN_EMAIL=your-admin@example.com
   POCKETBASE_ADMIN_PASSWORD=your-secure-password
   
   # Application Settings
   PUBLIC_SITE_URL=https://yourdomain.com
   PUBLIC_SITE_NAME=Lithiumteck
   PUBLIC_SITE_DESCRIPTION=Premium world building, high-performance custom plugins, and immersive asset design for the next generation of Minecraft servers.
   
   # OAuth Providers (Optional)
   POCKETBASE_GOOGLE_CLIENT_ID=your-google-client-id
   POCKETBASE_GOOGLE_CLIENT_SECRET=your-google-client-secret
   POCKETBASE_GITHUB_CLIENT_ID=your-github-client-id
   POCKETBASE_GITHUB_CLIENT_SECRET=your-github-client-secret
   ```

3. **Configure Domains**
   - Main app: `yourdomain.com` → Port 3000
   - PocketBase Admin: `admin.yourdomain.com` → Port 8090

4. **Deploy**
   - Click "Deploy" in Coolify
   - Wait for the build and deployment to complete

### Option 2: Separate Services Deployment

If you prefer to deploy services separately:

#### Deploy PocketBase

1. Create a new "Docker Image" resource in Coolify
2. Use image: `ghcr.io/muchobien/pocketbase:latest`
3. Set port: `8090`
4. Add persistent volume: `/pb_data` → `pocketbase_data`
5. Add persistent volume: `/pb_public` → `pocketbase_public`
6. Set environment variables for admin credentials
7. Deploy

#### Deploy SvelteKit App

1. Create a new "Dockerfile" resource in Coolify
2. Connect your Git repository
3. Set build context to root directory
4. Set port: `3000`
5. Add environment variables (use PocketBase service URL)
6. Deploy

## Post-Deployment Setup

### 1. Initialize PocketBase

1. Access PocketBase Admin UI at `https://admin.yourdomain.com/_/`
2. Complete the admin setup
3. Create the required collections (see schema below)

### 2. Create Database Schema

Run the following collections in PocketBase Admin UI:

**Collections to create:**
- `clients` - Client management
- `projects` - Portfolio projects
- `services` - Service offerings
- `inquiries` - Contact form submissions
- `testimonials` - Client reviews
- `media` - Image and video assets

Refer to `README-SEEDING.md` for detailed schema information.

### 3. Seed Initial Data

Option A: Use the seeding script
```bash
node pocketbase-seed.js
```

Option B: Manually create records through PocketBase Admin UI

### 4. Configure OAuth (Optional)

If using Google/GitHub authentication:

1. Go to PocketBase Admin → Settings → Auth providers
2. Enable and configure Google OAuth
3. Enable and configure GitHub OAuth
4. Update redirect URLs to match your domain

## Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `POCKETBASE_URL` | PocketBase API URL | Yes | `http://pocketbase:8090` |
| `POCKETBASE_ADMIN_EMAIL` | Admin email | Yes | - |
| `POCKETBASE_ADMIN_PASSWORD` | Admin password | Yes | - |
| `PUBLIC_SITE_URL` | Public site URL | Yes | - |
| `PUBLIC_SITE_NAME` | Site name | No | `Lithiumteck` |
| `PUBLIC_SITE_DESCRIPTION` | Site description | No | - |
| `POCKETBASE_GOOGLE_CLIENT_ID` | Google OAuth ID | No | - |
| `POCKETBASE_GOOGLE_CLIENT_SECRET` | Google OAuth secret | No | - |
| `POCKETBASE_GITHUB_CLIENT_ID` | GitHub OAuth ID | No | - |
| `POCKETBASE_GITHUB_CLIENT_SECRET` | GitHub OAuth secret | No | - |

## Persistent Data

The following volumes should be configured for data persistence:

- `pocketbase_data` - Database and application data
- `pocketbase_public` - Public file uploads

Coolify automatically handles volume persistence.

## Health Checks

Both services include health checks:

- **Web**: `http://localhost:3000`
- **PocketBase**: `http://localhost:8090/api/health`

Coolify will automatically monitor these endpoints.

## Troubleshooting

### Service Won't Start

1. Check logs in Coolify dashboard
2. Verify environment variables are set correctly
3. Ensure PocketBase is healthy before web service starts

### Connection Issues

1. Verify `POCKETBASE_URL` uses internal Docker network name (`http://pocketbase:8090`)
2. Check that services are on the same Docker network
3. Verify firewall rules allow traffic on ports 3000 and 8090

### Database Issues

1. Check PocketBase logs in Coolify
2. Verify volumes are mounted correctly
3. Ensure admin credentials are set

### Build Failures

1. Verify `pnpm-lock.yaml` is committed to repository
2. Check Node.js version compatibility (requires Node 20+)
3. Review build logs for specific errors

## Updating the Application

1. Push changes to your Git repository
2. Coolify will automatically rebuild and redeploy
3. Or manually trigger deployment in Coolify dashboard

## Backup Strategy

### PocketBase Data

Backup the following volumes regularly:
- `pocketbase_data` - Contains all database records
- `pocketbase_public` - Contains uploaded files

Coolify provides built-in backup functionality for volumes.

## Security Recommendations

1. **Use strong admin passwords** - Generate secure passwords for PocketBase admin
2. **Enable HTTPS** - Configure SSL certificates in Coolify
3. **Restrict PocketBase Admin** - Only expose admin UI to trusted IPs if possible
4. **Regular updates** - Keep dependencies and Docker images updated
5. **Environment variables** - Never commit `.env` files to repository

## Performance Optimization

1. **Enable caching** - Configure appropriate cache headers
2. **CDN integration** - Use Cloudflare or similar for static assets
3. **Database optimization** - Regular PocketBase maintenance
4. **Resource limits** - Set appropriate CPU/memory limits in Coolify

## Support

For issues specific to:
- **Coolify**: Check Coolify documentation
- **PocketBase**: Visit PocketBase documentation
- **SvelteKit**: Refer to SvelteKit documentation

## Quick Reference

```bash
# Local development
pnpm install
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Run with Docker Compose locally
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```
