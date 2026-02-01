# Coolify Dockerfile Deployment Guide

Deploy Lithiumteck Web using a simple Dockerfile deployment on Coolify.

## Overview

This project uses **Dockerfile deployment** (not Docker Compose) for maximum simplicity and efficiency. Coolify will build the Docker image directly from the Dockerfile and run it as a single service.

## Deployment Type

✅ **Dockerfile Deployment** (Current)
- Single service
- Simpler configuration
- Direct Docker build
- Recommended for Coolify

❌ ~~Docker Compose Deployment~~
- Only for local development
- Not used in production

## Quick Deploy Steps

### 1. Prerequisites

- Git repository (GitHub/GitLab/Gitea)
- Coolify instance
- External PocketBase instance running

### 2. Prepare Repository

```bash
# Ensure code is pushed
git add .
git commit -m "Ready for Coolify Dockerfile deployment"
git push origin main
```

### 3. Create Resource in Coolify

1. Go to Coolify Dashboard
2. Click **"+ New Resource"**
3. Select **"Dockerfile"** (or "Docker Image")
4. Choose **"From Git Repository"**

### 4. Configure Git Source

- **Repository**: Select your repository
- **Branch**: `main` (or your default branch)
- **Dockerfile Path**: `Dockerfile`
- **Build Context**: `.` (root directory)
- **Port**: `3000`

### 5. Set Environment Variables

**Required:**
```env
POCKETBASE_URL=https://your-pocketbase-instance.com
PUBLIC_SITE_URL=https://yourdomain.com
PUBLIC_SITE_NAME=Lithiumteck
PUBLIC_SITE_DESCRIPTION=Your description
```

**Optional (OAuth):**
```env
POCKETBASE_GOOGLE_CLIENT_ID=your-google-client-id
POCKETBASE_GOOGLE_CLIENT_SECRET=your-google-secret
POCKETBASE_GITHUB_CLIENT_ID=your-github-client-id
POCKETBASE_GITHUB_CLIENT_SECRET=your-github-secret
```

### 6. Configure Domain

- **Domain**: `yourdomain.com` or `app.yourdomain.com`
- **Port**: `3000` (already set)
- **HTTPS**: ✅ Enable

### 7. Configure Health Check (Optional but Recommended)

Coolify should auto-detect the health check from the Dockerfile, but you can also configure it manually:

- **Path**: `/`
- **Port**: `3000`
- **Interval**: 30s
- **Timeout**: 10s
- **Retries**: 3
- **Start Period**: 40s

### 8. Deploy

1. Click **"Deploy"** button
2. Monitor the build logs
3. Wait for deployment to complete (2-3 minutes)
4. Verify service is **"Running"**

### 9. Verify Deployment

```bash
# Check web app
curl https://yourdomain.com

# Check external PocketBase connection
curl https://your-pocketbase-instance.com/api/health
```

## How It Works

### Build Process

The Dockerfile uses a **multi-stage build**:

1. **Builder Stage** (Node 20 Alpine)
   - Installs pnpm
   - Installs dependencies
   - Builds the SvelteKit app

2. **Production Stage** (Node 20 Alpine)
   - Copies built app
   - Installs production dependencies only
   - Runs the app on port 3000

### Runtime

- **Base Image**: `node:20-alpine` (minimal, secure)
- **Package Manager**: pnpm
- **Port**: 3000
- **Command**: `node build`
- **Environment**: Production

## Environment Variables in Dockerfile

The Dockerfile sets these defaults:

```dockerfile
ENV NODE_ENV=production
ENV PORT=3000
```

All other environment variables are injected by Coolify at runtime.

## Advantages of Dockerfile Deployment

✅ **Simpler**: No Docker Compose complexity
✅ **Faster**: Direct Docker build
✅ **Cleaner**: Single service configuration
✅ **Native**: Coolify's preferred method
✅ **Flexible**: Easy to customize build

## Troubleshooting

### Build Fails: "pnpm not found"

**Solution**: The Dockerfile installs pnpm automatically. If this fails, check Coolify build logs for network issues.

### Build Fails: "Module not found"

**Solution**: 
1. Ensure `pnpm-lock.yaml` is committed to Git
2. Clear build cache in Coolify
3. Redeploy

### Service Won't Start

**Solution**:
1. Check environment variables are set in Coolify
2. Verify `POCKETBASE_URL` is accessible
3. Check Coolify service logs

### Port Binding Issues

**Solution**:
- Ensure port `3000` is not already in use
- Verify Coolify proxy is configured correctly
- Check service health status

## Updating Deployment

### Auto-Deploy (Recommended)

Enable **"Auto Deploy"** in Coolify settings. Every push to `main` will trigger automatic rebuild and deployment.

### Manual Deploy

1. Push changes to Git
2. Go to Coolify dashboard
3. Click **"Redeploy"**

## Resource Requirements

**Minimum:**
- CPU: 0.5 cores
- Memory: 512MB
- Storage: 1GB

**Recommended:**
- CPU: 1 core
- Memory: 1GB
- Storage: 2GB

## Build Optimization

### Enable Build Cache

In Coolify resource settings:
- ✅ Enable **Docker Build Cache**
- This speeds up subsequent builds significantly

### Build Arguments

The Dockerfile doesn't require build arguments, but you can add them in Coolify if needed.

## Security

- ✅ Multi-stage build (smaller final image)
- ✅ Alpine Linux (minimal attack surface)
- ✅ Non-root user (can be added if needed)
- ✅ Production dependencies only
- ✅ No build tools in final image

## Monitoring

### Health Check

The service includes a built-in health check that Coolify monitors:

```yaml
healthcheck:
  test: wget --quiet --tries=1 --spider http://localhost:3000
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

### Logs

View logs in Coolify:
- Real-time: Coolify Dashboard → Your Resource → Logs
- CLI: `coolify logs lithiumteck-web --tail 100`

### Metrics

Coolify provides:
- CPU usage
- Memory usage  
- Network I/O
- Restart count

## Local Testing

Test the Docker build locally before deploying:

```bash
# Build the image
docker build -t lithiumteck-web .

# Run the container
docker run -p 3000:3000 \
  -e POCKETBASE_URL=https://your-pocketbase.com \
  -e PUBLIC_SITE_URL=http://localhost:3000 \
  -e PUBLIC_SITE_NAME=Lithiumteck \
  lithiumteck-web

# Test
curl http://localhost:3000
```

## Comparison: Dockerfile vs Docker Compose

| Feature | Dockerfile | Docker Compose |
|---------|-----------|----------------|
| Complexity | Low | Medium |
| Services | Single | Multiple |
| Configuration | Simple | Complex |
| Coolify Support | Native | Supported |
| Recommended | ✅ Yes | Local dev only |

## Migration from Docker Compose

If you previously used Docker Compose:

1. **Backup** your Coolify configuration
2. **Delete** the old Docker Compose resource
3. **Create** new Dockerfile resource
4. **Configure** environment variables
5. **Deploy** and verify

Your data is safe because PocketBase is external.

## Next Steps

After successful deployment:

1. ✅ Verify app connects to PocketBase
2. ✅ Test all features
3. ✅ Configure CORS on PocketBase
4. ✅ Set up monitoring
5. ✅ Configure auto-deploy
6. ✅ Document your setup

## Support

- **Dockerfile Issues**: Check `Dockerfile` in repository
- **Build Issues**: Review Coolify build logs
- **Runtime Issues**: Check Coolify service logs
- **PocketBase Connection**: Verify `POCKETBASE_URL` and CORS

---

**Deployment Method**: Dockerfile ✅

**Docker Compose**: Local development only

**Production**: Use Dockerfile deployment
