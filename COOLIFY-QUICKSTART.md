# Coolify Quick Start Guide

Deploy Lithiumteck Web to Coolify in 5 minutes.

## Prerequisites

- Coolify instance (self-hosted or cloud)
- Git repository (GitHub/GitLab/Gitea)
- Domain name (optional)

## Quick Deploy Steps

### 1. Run Setup Check

```bash
./coolify-setup.sh
```

This validates your deployment configuration and shows a checklist.

### 2. Push to Git

```bash
git add .
git commit -m "Ready for Coolify deployment"
git push origin main
```

### 3. Create Coolify Resource

**In Coolify Dashboard:**

1. Click **"+ New Resource"**
2. Select **"Docker Compose"**
3. Choose **"From Git Repository"**
4. Select your repository
5. Branch: `main` (or your default branch)
6. Docker Compose Location: `docker-compose.yml`

### 4. Configure Environment Variables

**Required Variables:**

```env
POCKETBASE_URL=http://pocketbase:8090
POCKETBASE_ADMIN_EMAIL=admin@yourdomain.com
POCKETBASE_ADMIN_PASSWORD=YourSecurePassword123!
PUBLIC_SITE_URL=https://yourdomain.com
PUBLIC_SITE_NAME=Lithiumteck
PUBLIC_SITE_DESCRIPTION=Premium Minecraft server solutions
```

**Optional (OAuth):**

```env
POCKETBASE_GOOGLE_CLIENT_ID=your-google-client-id
POCKETBASE_GOOGLE_CLIENT_SECRET=your-google-secret
POCKETBASE_GITHUB_CLIENT_ID=your-github-client-id
POCKETBASE_GITHUB_CLIENT_SECRET=your-github-secret
```

### 5. Configure Domains

**Service: web**
- Domain: `yourdomain.com` or `lithiumteck.yourdomain.com`
- Port: `3000`
- HTTPS: ✅ Enabled

**Service: pocketbase**
- Domain: `admin.yourdomain.com` or `pb.yourdomain.com`
- Port: `8090`
- HTTPS: ✅ Enabled

### 6. Deploy

1. Click **"Deploy"** button
2. Monitor build logs in real-time
3. Wait for both services to be healthy (usually 2-5 minutes)

### 7. Initial Setup

**Access PocketBase Admin:**

1. Navigate to `https://admin.yourdomain.com/_/`
2. Complete the admin account setup
3. Create database collections (see schema below)

**Database Collections to Create:**

```javascript
// Use PocketBase Admin UI or import these schemas

1. clients (for client management)
2. projects (for portfolio)
3. services (for service offerings)
4. inquiries (for contact forms)
5. testimonials (for client reviews)
6. media (for images/videos)
```

Refer to `README-SEEDING.md` for detailed schema.

### 8. Verify Deployment

**Check Services:**

```bash
# Main Application
curl https://yourdomain.com

# PocketBase API
curl https://admin.yourdomain.com/api/health
```

**Check Logs in Coolify:**
- Navigate to your resource
- Click "Logs" tab
- Monitor both `web` and `pocketbase` services

## Common Issues & Solutions

### Build Fails

**Error:** `pnpm: command not found`

**Solution:** Coolify should auto-detect pnpm from `package.json`. If not, add to Coolify build settings:
```bash
npm install -g pnpm && pnpm install --frozen-lockfile && pnpm run build
```

### Service Won't Start

**Error:** `Connection refused to pocketbase`

**Solution:** 
1. Ensure PocketBase service started first (check health)
2. Verify `POCKETBASE_URL=http://pocketbase:8090` (internal Docker network)
3. Check service dependencies in `docker-compose.yml`

### Database Not Persisting

**Solution:**
1. In Coolify, go to your resource settings
2. Verify volumes are configured:
   - `pocketbase_data` → `/pb_data`
   - `pocketbase_public` → `/pb_public`
3. Coolify handles persistence automatically

### Domain Not Working

**Solution:**
1. Check DNS records point to Coolify server IP
2. Verify SSL certificate generation (may take 1-2 minutes)
3. Check Coolify proxy logs
4. Ensure ports 80/443 are open on server

## Environment-Specific Settings

### Production

```env
NODE_ENV=production
POCKETBASE_URL=http://pocketbase:8090
PUBLIC_SITE_URL=https://yourdomain.com
```

### Staging

```env
NODE_ENV=production
POCKETBASE_URL=http://pocketbase:8090
PUBLIC_SITE_URL=https://staging.yourdomain.com
```

## Updating Your Deployment

### Option 1: Auto-Deploy (Recommended)

In Coolify, enable **"Auto Deploy"** for your resource.
Every push to main will trigger automatic deployment.

### Option 2: Manual Deploy

1. Push changes to Git
2. Go to Coolify dashboard
3. Click "Redeploy" on your resource

### Option 3: Coolify CLI

```bash
# If you have Coolify CLI installed
coolify deploy --resource lithiumteck-web
```

## Backup & Restore

### Backup PocketBase Data

**Via Coolify UI:**
1. Go to your resource → Volumes
2. Download `pocketbase_data` volume
3. Download `pocketbase_public` volume

**Via Command Line:**

```bash
# SSH into Coolify server
docker run --rm -v pocketbase_data:/data -v $(pwd):/backup \
  alpine tar czf /backup/pocketbase-backup-$(date +%Y%m%d).tar.gz /data
```

### Restore from Backup

```bash
# SSH into Coolify server
docker run --rm -v pocketbase_data:/data -v $(pwd):/backup \
  alpine sh -c "rm -rf /data/* && tar xzf /backup/pocketbase-backup.tar.gz -C /"
```

## Performance Optimization

### Enable Build Cache

In Coolify resource settings:
- Enable **Docker Build Cache**
- Faster subsequent builds

### Resource Limits

Set appropriate limits in Coolify:

```yaml
web:
  memory: 512MB
  cpu: 0.5

pocketbase:
  memory: 256MB
  cpu: 0.25
```

### CDN Integration

For static assets, configure Cloudflare or similar:
1. Point domain to Cloudflare
2. Enable caching for `/static/*`
3. Set cache rules for images, CSS, JS

## Monitoring

### Health Checks

Both services have built-in health checks:

- **Web:** `http://localhost:3000` (returns 200)
- **PocketBase:** `http://localhost:8090/api/health` (returns 200)

Coolify monitors these automatically.

### Logs

```bash
# View logs in Coolify UI or via CLI
coolify logs lithiumteck-web --service web --tail 100
coolify logs lithiumteck-web --service pocketbase --tail 100
```

### Metrics

Coolify provides built-in metrics:
- CPU usage
- Memory usage
- Network I/O
- Disk usage

## Security Checklist

- ✅ Strong admin password for PocketBase
- ✅ HTTPS enabled for all domains
- ✅ Environment variables not committed to Git
- ✅ Regular backups configured
- ✅ PocketBase admin UI restricted (IP whitelist if possible)
- ✅ OAuth secrets secured
- ✅ Regular dependency updates

## Cost Optimization

### Recommended Server Specs

**Minimum (Low Traffic):**
- 1 CPU core
- 1GB RAM
- 20GB storage

**Recommended (Production):**
- 2 CPU cores
- 2GB RAM
- 40GB storage

### Scaling

For high traffic:
1. Scale web service horizontally
2. Add load balancer in Coolify
3. Keep single PocketBase instance (SQLite limitation)

## Support Resources

- **Coolify Docs:** https://coolify.io/docs
- **PocketBase Docs:** https://pocketbase.io/docs
- **SvelteKit Docs:** https://kit.svelte.dev/docs

## Troubleshooting Commands

```bash
# Check container status
docker ps

# View container logs
docker logs lithiumteck-web
docker logs lithiumteck-pocketbase

# Restart services
docker-compose restart

# Rebuild and restart
docker-compose up -d --build

# Check volumes
docker volume ls | grep pocketbase

# Shell into container
docker exec -it lithiumteck-web sh
```

## Next Steps

1. ✅ Deploy application
2. ✅ Configure PocketBase collections
3. ✅ Seed initial data
4. ✅ Test all features
5. ✅ Configure monitoring
6. ✅ Set up backups
7. ✅ Configure OAuth (optional)
8. ✅ Optimize performance
9. ✅ Document custom configurations

---

**Need detailed information?** See `DEPLOYMENT.md`

**Database setup?** See `README-SEEDING.md`

**Issues?** Check Coolify logs and service health checks
