# Base image for dependencies
FROM node:19-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

COPY frontend/web-app/package*.json ./
RUN npm install --omit-dev --legacy-peer-deps

# Build stage
FROM node:19-alpine AS builder
WORKDIR /app

# Install pnpm in the builder stage too
RUN npm install -g pnpm

COPY frontend/web-app ./
# Add other specific files needed for building (e.g., tailwind config, etc.)

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Final production image
FROM node:19-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
