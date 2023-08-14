# Install dependencies only when needed
FROM node:18-alpine AS deps
ARG GITHUB_TOKEN
RUN npm config set "@astraprotocol:registry" "https://npm.pkg.github.com"
RUN npm config set "//npm.pkg.github.com/:_authToken" "${GITHUB_TOKEN}"
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
WORKDIR /app
COPY package.json yarn.lock ./
COPY . .
RUN GITHUB_PACKAGE_TOKEN=${GITHUB_TOKEN} yarn --frozen-lockfile


# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
ARG SENTRY_AUTH_TOKEN
ARG NEXT_PUBLIC_COSMOS_API
ARG NEXT_PUBLIC_EVM_API
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_CHAIN_ID
ARG NEXT_PUBLIC_TITLE
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID
ARG NEXT_PUBLIC_SENTRY_DSN
ARG NEXT_PUBLIC_ENV
ARG NEXT_PUBLIC_WASA_ADDRESS

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/ ./
COPY . . 
RUN rm next.config.js
COPY next.config.prod.js next.config.js

RUN SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN} \
    NEXT_PUBLIC_COSMOS_API=${NEXT_PUBLIC_COSMOS_API} \
    NEXT_PUBLIC_EVM_API=${NEXT_PUBLIC_EVM_API} \
    NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL} \
    NEXT_PUBLIC_CHAIN_ID=${NEXT_PUBLIC_CHAIN_ID} \
    NEXT_PUBLIC_TITLE=${NEXT_PUBLIC_TITLE} \
    NEXT_PUBLIC_GA_MEASUREMENT_ID=${NEXT_PUBLIC_GA_MEASUREMENT_ID} \
    NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN} \
    NEXT_PUBLIC_ENV=${NEXT_PUBLIC_ENV} \
    NEXT_PUBLIC_WASA_ADDRESS=${NEXT_PUBLIC_WASA_ADDRESS} \
    yarn build 

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/ ./.next/

USER nextjs

EXPOSE 3000

CMD ["yarn", "start"]