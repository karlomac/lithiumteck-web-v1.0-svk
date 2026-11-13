# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and pnpm config
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc .pnpmrc ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN CI=true pnpm install --frozen-lockfile --dangerously-allow-all-builds

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files and pnpm config
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc .pnpmrc ./

# Install production dependencies only
RUN CI=true pnpm install --prod --frozen-lockfile --dangerously-allow-all-builds

# Copy built application from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./

# Expose port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production
ENV PORT=3000
ENV PROTOCOL_HEADER=x-forwarded-proto
ENV HOST_HEADER=x-forwarded-host
ENV ADDRESS_HEADER=x-forwarded-for

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/health || exit 1

# Start the application
CMD ["node", "build"]
