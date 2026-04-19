# Development stage - serves Angular app with live reload
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --quiet

COPY . .

EXPOSE 4200

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -O- http://localhost:4200 || exit 1

CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--poll", "2000", "--disable-host-check"]
