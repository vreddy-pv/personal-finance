# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --quiet

COPY . .

RUN npm run build -- --prod --output-path=dist/personal-finance-ui

# Runtime stage - using nginx for production
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Remove default nginx config
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy built application
COPY --from=builder /app/dist/personal-finance-ui .

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -O- http://localhost:4200 || exit 1

CMD ["nginx", "-g", "daemon off;"]
