# Coolify Deployment Checklist

Use this checklist to ensure a smooth deployment to Coolify.

## Pre-Deployment

### 1. Code Preparation
- [ ] All code changes committed to Git
- [ ] Tests passing locally (`pnpm run validate`)
- [ ] Production build successful (`pnpm run build`)
- [ ] Docker build tested locally (`docker-compose up -d`)
- [ ] All dependencies up to date

### 2. Environment Configuration
- [ ] `.env` file configured (do NOT commit this)
- [ ] `.env.production` reviewed for production values
- [ ] Sensitive credentials secured (passwords, API keys)
- [ ] Domain names decided and documented

### 3. Repository Setup
- [ ] Code pushed to Git repository (GitHub/GitLab/Gitea)
- [ ] Main/master branch is the default
- [ ] Repository accessible by Coolify
- [ ] `.gitignore` properly configured

### 4. Validation
- [ ] Run `./coolify-setup.sh` - all checks passed
- [ ] Required files present:
  - [ ] `Dockerfile`
  - [ ] `docker-compose.yml`
  - [ ] `.dockerignore`
  - [ ] `package.json`
  - [ ] `pnpm-lock.yaml`

## Coolify Configuration

### 5. Create Resource
- [ ] Logged into Coolify dashboard
- [ ] Clicked "+ New Resource"
- [ ] Selected "Docker Compose"
- [ ] Connected Git repository
- [ ] Selected correct branch (main/master)
- [ ] Docker Compose file path set to `docker-compose.yml`

### 6. Environment Variables (Set in Coolify UI)

**Required:**
- [ ] `POCKETBASE_URL=http://pocketbase:8090`
- [ ] `POCKETBASE_ADMIN_EMAIL` (your admin email)
- [ ] `POCKETBASE_ADMIN_PASSWORD` (strong password)
- [ ] `PUBLIC_SITE_URL` (https://yourdomain.com)
- [ ] `PUBLIC_SITE_NAME=Lithiumteck`
- [ ] `PUBLIC_SITE_DESCRIPTION` (site description)

**Optional (OAuth):**
- [ ] `POCKETBASE_GOOGLE_CLIENT_ID`
- [ ] `POCKETBASE_GOOGLE_CLIENT_SECRET`
- [ ] `POCKETBASE_GITHUB_CLIENT_ID`
- [ ] `POCKETBASE_GITHUB_CLIENT_SECRET`

**Optional (Email):**
- [ ] `SMTP_HOST`
- [ ] `SMTP_PORT`
- [ ] `SMTP_USERNAME`
- [ ] `SMTP_PASSWORD`
- [ ] `SMTP_FROM`

### 7. Domain Configuration

**Web Service:**
- [ ] Domain configured (e.g., `yourdomain.com`)
- [ ] Port set to `3000`
- [ ] HTTPS enabled
- [ ] SSL certificate generated

**PocketBase Service:**
- [ ] Domain configured (e.g., `admin.yourdomain.com`)
- [ ] Port set to `8090`
- [ ] HTTPS enabled
- [ ] SSL certificate generated

### 8. Persistent Storage
- [ ] Volume `pocketbase_data` configured → `/pb_data`
- [ ] Volume `pocketbase_public` configured → `/pb_public`
- [ ] Backup strategy defined

### 9. Resource Settings (Optional)
- [ ] Memory limit set (recommended: 512MB for web, 256MB for PocketBase)
- [ ] CPU limit set (recommended: 0.5 for web, 0.25 for PocketBase)
- [ ] Auto-deploy enabled (optional)
- [ ] Build cache enabled

## Deployment

### 10. Initial Deploy
- [ ] Clicked "Deploy" button in Coolify
- [ ] Monitored build logs (no errors)
- [ ] PocketBase service health check passed
- [ ] Web service health check passed
- [ ] Both services showing "Running" status
- [ ] Deployment completed successfully

### 10. DNS Configuration
- [ ] DNS A record for main domain points to Coolify server IP
- [ ] DNS propagation verified (use `dig` or online tools)
- [ ] SSL certificates issued successfully

### 11. Verify Services
- [ ] Main app accessible at `https://yourdomain.com`
- [ ] No console errors in browser
- [ ] Health endpoint responding:
  - [ ] `https://yourdomain.com` (200 OK)
- [ ] External PocketBase accessible:
  - [ ] `https://your-pocketbase-instance.com/api/health` (200 OK)

## Post-Deployment

### 13. PocketBase Setup
- [ ] Accessed PocketBase Admin UI (`https://admin.yourdomain.com/_/`)
- [ ] Completed admin account setup
- [ ] Admin email and password working

### 14. Database Collections
- [ ] Created `clients` collection
- [ ] Created `projects` collection
- [ ] Created `services` collection
- [ ] Created `inquiries` collection
- [ ] Created `testimonials` collection
- [ ] Created `media` collection
- [ ] All schemas configured correctly (see `README-SEEDING.md`)

### 15. Data Seeding
- [ ] Initial data seeded (via script or manual)
- [ ] Test records created
- [ ] Media files uploaded
- [ ] Data visible in admin panel

### 16. OAuth Configuration (Optional)
- [ ] Google OAuth provider enabled in PocketBase
- [ ] Google OAuth credentials configured
- [ ] Google OAuth redirect URLs set
- [ ] GitHub OAuth provider enabled in PocketBase
- [ ] GitHub OAuth credentials configured
- [ ] GitHub OAuth redirect URLs set
- [ ] OAuth login tested

### 17. Application Testing
- [ ] Homepage loads correctly
- [ ] All pages accessible
- [ ] Forms submitting successfully
- [ ] API endpoints responding
- [ ] Images loading correctly
- [ ] Navigation working
- [ ] Contact form functional
- [ ] Authentication working (if applicable)

### 18. Monitoring & Logging
- [ ] Coolify monitoring enabled
- [ ] Health checks configured
- [ ] Log retention set
- [ ] Alerts configured (optional)
- [ ] Metrics dashboard reviewed

### 19. Security
- [ ] Strong admin password set
- [ ] HTTPS enforced on all domains
- [ ] Environment variables not exposed
- [ ] PocketBase admin UI access restricted (if needed)
- [ ] CORS settings configured
- [ ] Rate limiting considered
- [ ] Security headers reviewed

### 20. Performance
- [ ] Initial load time acceptable (<3s)
- [ ] Build cache working on redeployments
- [ ] Static assets cached
- [ ] CDN considered (optional)
- [ ] Image optimization reviewed

### 21. Backup Strategy
- [ ] Backup schedule defined
- [ ] Coolify volume backups configured
- [ ] Backup restoration tested
- [ ] Backup location secured
- [ ] Backup retention policy set

### 22. Documentation
- [ ] Environment variables documented
- [ ] Deployment process documented
- [ ] Access credentials stored securely
- [ ] Team members notified
- [ ] Runbook created for common issues

## Ongoing Maintenance

### 23. Regular Tasks
- [ ] Monitor application logs weekly
- [ ] Check health metrics weekly
- [ ] Update dependencies monthly
- [ ] Review security patches monthly
- [ ] Test backups monthly
- [ ] Review and rotate credentials quarterly
- [ ] Update documentation as needed

### 24. Scaling Preparation
- [ ] Current resource usage noted
- [ ] Scaling triggers defined
- [ ] Horizontal scaling plan created (if needed)
- [ ] Load balancer considered (if needed)

---

## Quick Reference

**Deployment Command:**
```bash
./coolify-setup.sh  # Validate before deploying
```

**Useful Coolify Commands:**
```bash
# Redeploy
coolify deploy --resource lithiumteck-web

# View logs
coolify logs lithiumteck-web --tail 100

# Restart services
coolify restart lithiumteck-web
```

**Health Check URLs:**
- Web: `https://yourdomain.com`
- PocketBase (external): `https://your-pocketbase-instance.com/api/health`

**Important Ports:**
- Web: `3000`

---

## Troubleshooting

If any checklist item fails, refer to:
- **COOLIFY-QUICKSTART.md** - Common issues and solutions
- **DEPLOYMENT.md** - Detailed deployment guide
- Coolify logs in the dashboard
- Service health status in Coolify

---

**Status:** [ ] Deployment Complete | [ ] Post-Deployment Complete | [ ] Production Ready

**Deployment Date:** _________________

**Deployed By:** _________________

**Production URL:** _________________

**Notes:** _________________
