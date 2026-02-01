#!/bin/bash
# Coolify Deployment Setup Script for Lithiumteck Web

set -e

echo "🚀 Coolify Deployment Setup for Lithiumteck Web"
echo "================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if .env file exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from .env.example..."
    cp .env.example .env
    print_success ".env file created"
    print_warning "Please update .env with your production values before deploying!"
else
    print_success ".env file exists"
fi

# Validate required files
echo ""
echo "📋 Validating deployment files..."
echo ""

required_files=(
    "Dockerfile"
    "docker-compose.yml"
    ".dockerignore"
    "package.json"
    "pnpm-lock.yaml"
)

all_files_present=true
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        print_success "$file"
    else
        print_error "$file is missing!"
        all_files_present=false
    fi
done

if [ "$all_files_present" = false ]; then
    print_error "Some required files are missing. Please ensure all files are present."
    exit 1
fi

echo ""
echo "🔍 Checking environment variables..."
echo ""

# Read .env and check for required variables
required_vars=(
    "POCKETBASE_URL"
    "PUBLIC_SITE_URL"
    "PUBLIC_SITE_NAME"
)

missing_vars=()
for var in "${required_vars[@]}"; do
    if grep -q "^${var}=" .env 2>/dev/null && ! grep -q "^${var}=your-" .env && ! grep -q "^${var}=$" .env && ! grep -q "^${var}=http://localhost" .env; then
        print_success "$var is set"
    else
        print_warning "$var is not configured or needs updating"
        missing_vars+=("$var")
    fi
done

if [ ${#missing_vars[@]} -ne 0 ]; then
    echo ""
    print_warning "The following variables need to be configured in .env:"
    for var in "${missing_vars[@]}"; do
        echo "  - $var"
    done
fi

echo ""
echo "📦 Testing Docker build..."
echo ""

if command -v docker &> /dev/null; then
    print_success "Docker is installed"
    
    # Optional: Test build (commented out by default to save time)
    # echo "Building Docker image (this may take a few minutes)..."
    # if docker build -t lithiumteck-web-test . > /dev/null 2>&1; then
    #     print_success "Docker build successful"
    #     docker rmi lithiumteck-web-test > /dev/null 2>&1
    # else
    #     print_error "Docker build failed. Check Dockerfile and dependencies."
    # fi
else
    print_warning "Docker is not installed. Skipping build test."
fi

echo ""
echo "📝 Coolify Deployment Checklist"
echo "================================"
echo ""
echo "1. Repository Setup:"
echo "   □ Push code to Git repository (GitHub/GitLab/Gitea)"
echo "   □ Ensure main/master branch is up to date"
echo ""
echo "2. Coolify Configuration:"
echo "   □ Create new resource → Docker Compose"
echo "   □ Connect your Git repository"
echo "   □ Select branch (main/master)"
echo ""
echo "3. Environment Variables (Set in Coolify UI):"
for var in "${required_vars[@]}"; do
    echo "   □ $var"
done
echo ""
echo "4. Domain Configuration:"
echo "   □ Main app: yourdomain.com → Port 3000"
echo ""
echo "5. Deploy:"
echo "   □ Click Deploy in Coolify"
echo "   □ Monitor build logs"
echo "   □ Verify health checks pass"
echo ""
echo "6. Post-Deployment:"
echo "   □ Verify app connects to external PocketBase instance"
echo "   □ Test all API endpoints"
echo "   □ Confirm data loading correctly"
echo ""

echo "📖 Additional Resources:"
echo "========================"
echo ""
echo "• Detailed guide: DEPLOYMENT.md"
echo "• Database schema: README-SEEDING.md"
echo "• Environment template: .env.example"
echo "• Coolify config: .coolify.json"
echo ""

if [ ${#missing_vars[@]} -eq 0 ] && [ "$all_files_present" = true ]; then
    print_success "All checks passed! You're ready to deploy to Coolify."
else
    print_warning "Please address the warnings above before deploying."
fi

echo ""
echo "🎯 Quick Deploy Command for Coolify CLI (if available):"
echo "   coolify deploy --compose docker-compose.yml"
echo ""
