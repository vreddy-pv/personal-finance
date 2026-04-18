# Docker Setup & Deployment Guide

Personal Finance Application with complete Docker support for development and production deployment.

## Table of Contents
1. [Quick Start](#quick-start)
2. [Prerequisites](#prerequisites)
3. [Building Docker Images](#building-docker-images)
4. [Running Services](#running-services)
5. [Docker Utility Scripts](#docker-utility-scripts)
6. [Development Workflow](#development-workflow)
7. [Image Architecture](#image-architecture)
8. [Environment Configuration](#environment-configuration)
9. [Troubleshooting](#troubleshooting)
10. [Performance & Optimization](#performance--optimization)

---

## Quick Start

### 1. Build Docker Images
```bash
./scripts/docker-build.sh
# Or manually:
docker-compose build
```

### 2. Start All Services
```bash
./scripts/docker-up.sh
# Or manually:
docker-compose up
```

### 3. Access Application
- **Frontend:** http://localhost:4200
- **Backend API:** http://localhost:8080
- **H2 Console:** http://localhost:8080/h2-console
  - URL: `jdbc:h2:mem:testdb`
  - User: `sa`
  - Password: `password`
- **Login Service:** http://localhost:8001
- **MCP Server:** http://localhost:8000

### 4. Stop Services
```bash
./scripts/docker-down.sh
# Or manually:
docker-compose down
```

---

## Prerequisites

### Docker Installation
- **Docker Desktop** (Windows/Mac): [Download](https://www.docker.com/products/docker-desktop)
- **Docker Engine** (Linux): [Install](https://docs.docker.com/engine/install/)
- **Docker Compose:** Usually included with Docker Desktop

### Verify Installation
```bash
docker --version      # Docker version
docker-compose --version
docker run hello-world  # Test Docker installation
```

### System Requirements
- **Disk Space:** 2GB minimum for all images
- **Memory:** 4GB RAM recommended (8GB for comfortable development)
- **Network:** Ports 4200, 8001, 8080, 8082 must be available

---

## Building Docker Images

### Build All Images
```bash
# Using utility script (recommended)
./scripts/docker-build.sh

# Or manually with docker-compose
docker-compose build

# Build without using cache (clean build)
docker-compose build --no-cache
```

### Build Specific Service
```bash
docker-compose build backend
docker-compose build frontend
docker-compose build login
docker-compose build mcp-server
```

### Build Output
During build, you'll see:
1. Base image download (first time only)
2. Dependency installation
3. Source code compilation/copying
4. Final image creation

### Build Times
- **First Build:** 5-10 minutes (downloads base images)
- **Subsequent Builds:** 2-3 minutes (cached layers)
- **Clean Build (no-cache):** 5-10 minutes

### View Built Images
```bash
docker images | grep personal-finance
```

---

## Running Services

### Start All Services
```bash
# Using script
./scripts/docker-up.sh

# Or manually
docker-compose up

# Start in background
docker-compose up -d
```

### Start Specific Service
```bash
docker-compose up backend
docker-compose up frontend
docker-compose up login
docker-compose up mcp-server
```

### Service Health Checks
All services include health checks that run every 30 seconds:
- **Backend:** `curl http://localhost:8080/health`
- **Login:** `curl http://localhost:8001/health`
- **Frontend:** HTTP status check
- **MCP Server:** Container startup check

View health status:
```bash
docker-compose ps
```

### Access Services
| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:4200 | Web UI |
| Backend | http://localhost:8080 | REST API |
| H2 Console | http://localhost:8080/h2-console | Database |
| Login | http://localhost:8001 | Authentication |
| MCP Server | http://localhost:8000 | Claude AI |

---

## Docker Utility Scripts

### docker-build.sh
Builds all Docker images using docker-compose.
```bash
./scripts/docker-build.sh
```

### docker-up.sh
Starts all services. Logs are printed to console (Ctrl+C to stop).
```bash
./scripts/docker-up.sh
```

### docker-down.sh
Stops and removes all containers.
```bash
./scripts/docker-down.sh

# Also remove volumes (data will be lost)
docker-compose down -v
```

### docker-logs.sh
View logs from services (useful for debugging).
```bash
# All services
./scripts/docker-logs.sh

# Specific service
./scripts/docker-logs.sh backend
./scripts/docker-logs.sh frontend
./scripts/docker-logs.sh login

# Combined with grep
./scripts/docker-logs.sh backend | grep ERROR
```

### docker-rebuild.sh
Clean rebuild: stops containers, removes images, rebuilds without cache.
```bash
./scripts/docker-rebuild.sh
```

---

## Development Workflow

### Local Development (Recommended)
Use native development tools for faster iteration:
```bash
# Terminal 1: Backend
cd services/backend && ./mvnw spring-boot:run

# Terminal 2: Frontend
cd services/frontend && ng serve

# Terminal 3: Login Service
cd services/login && uvicorn main:app --reload --port 8001

# Terminal 4: MCP Server
cd services/mcp-server && uvicorn app.main:app --reload
```

### Docker Development
Use Docker when:
- Testing containerized deployment
- Simulating production environment
- Verifying multi-service interactions
- Validating Dockerfiles

```bash
# Build and run in Docker
./scripts/docker-build.sh
./scripts/docker-up.sh

# Watch logs in new terminal
./scripts/docker-logs.sh -f
```

### Iterating with Docker
When making changes while containers are running:
```bash
# Rebuild only changed service
docker-compose build backend
docker-compose up backend

# Or use rebuild script
./scripts/docker-rebuild.sh
```

### Debugging Container Issues
```bash
# View logs
docker-compose logs -f [service]

# Enter container shell
docker-compose exec backend bash         # Java service
docker-compose exec frontend sh          # Node/Nginx
docker-compose exec login bash           # Python service
docker-compose exec mcp-server bash      # Python service

# Check service health
docker-compose ps
curl http://localhost:8080/health
```

---

## Image Architecture

### Service Images

#### Backend (Spring Boot)
**Base Images:** `maven:3.9-eclipse-temurin-17` → `eclipse-temurin:17-jre-slim`
**Size:** 500-600 MB
**Strategy:** Multi-stage build
- **Build Stage:** Compiles application with Maven
- **Runtime Stage:** Runs compiled JAR with minimal JRE

**Dockerfile:** `services/backend/Dockerfile`

#### Frontend (Angular)
**Base Images:** `node:18-alpine` → `nginx:alpine`
**Size:** 400-500 MB
**Strategy:** Multi-stage build
- **Build Stage:** Installs dependencies, builds Angular app
- **Runtime Stage:** Serves with Nginx

**Dockerfile:** `services/frontend/Dockerfile`
**Config:** `services/frontend/nginx.conf`

#### Login Service (Python/FastAPI)
**Base Image:** `python:3.8-slim`
**Size:** 200-250 MB
**Strategy:** Single-stage build
- Installs Python dependencies
- Runs with Uvicorn

**Dockerfile:** `services/login/Dockerfile`

#### MCP Server (Python/FastAPI)
**Base Image:** `python:3.8-slim`
**Size:** 200-250 MB
**Strategy:** Single-stage build
- Installs Python dependencies
- Runs with Uvicorn

**Dockerfile:** `services/mcp-server/Dockerfile`

### Total Image Size
**Combined:** 1.3-1.6 GB (manageable for development)

### .dockerignore Files
Each service has a `.dockerignore` file that excludes:
- Build artifacts (target/, dist/, node_modules/)
- Version control (.git/, .gitignore)
- IDE files (.vscode/, .idea/)
- Test coverage and logs
- Cache files

This keeps build context small and build times fast.

---

## Environment Configuration

### Environment Variables
Docker services load variables from `.env` file (created from `.env.example`):

```bash
cp .env.example .env
# Edit .env and set ANTHROPIC_API_KEY
```

### Required Variables
```bash
# CRITICAL - Required for MCP Server
ANTHROPIC_API_KEY=sk-ant-...

# Backend (optional - has defaults)
SPRING_DATASOURCE_URL=jdbc:h2:mem:testdb
SPRING_JPA_HIBERNATE_DDL_AUTO=create-drop
SPRING_H2_CONSOLE_ENABLED=true

# Login Service
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# MCP Server
BACKEND_API_URL=http://backend:8080
LOGIN_SERVICE_URL=http://login:8001
```

### Service Discovery (docker-compose network)
Services communicate using hostnames (automatically resolved):
- `backend` → Port 8080
- `login` → Port 8001
- `mcp-server` → Port 8000
- `frontend` → Port 4200

Internal URLs use hostnames (e.g., `http://backend:8080`), while external access uses localhost.

### Environment Override
Override variables for specific runs:
```bash
ANTHROPIC_API_KEY=your-key docker-compose up
```

---

## Troubleshooting

### Build Issues

#### "Cannot find Java compiler"
```bash
# Ensure Java is installed
java -version

# Rebuild without cache
docker-compose build --no-cache backend
```

#### "npm install fails"
```bash
# Check Node version in Dockerfile
# Remove node_modules before rebuild
rm -rf services/frontend/node_modules
docker-compose build --no-cache frontend
```

#### "Docker build runs out of memory"
```bash
# Increase Docker memory limit in Docker Desktop preferences
# Or use DOCKER_BUILDKIT
DOCKER_BUILDKIT=1 docker-compose build
```

### Runtime Issues

#### "Port already in use"
```bash
# Find process using port
lsof -i :8080        # macOS/Linux
netstat -ano | findstr :8080  # Windows

# Kill process
kill -9 <PID>        # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Or stop Docker containers first
./scripts/docker-down.sh
```

#### "Health check failures"
```bash
# View logs
docker-compose logs -f backend

# Check if service is responding
curl http://localhost:8080/health
curl http://localhost:8001/health
```

#### "Connection refused between services"
```bash
# Verify docker network exists
docker network ls | grep personal-finance

# Check container connectivity
docker-compose exec backend ping login

# Verify service names in .env and docker-compose.yml
```

#### "ANTHROPIC_API_KEY not found"
```bash
# Check .env file exists
cat .env | grep ANTHROPIC_API_KEY

# If missing, copy from example
cp .env.example .env
# Then edit and add your API key
```

### Debugging Commands

```bash
# View running containers
docker-compose ps

# View all containers (including stopped)
docker-compose ps -a

# View logs for all services
docker-compose logs

# View logs for specific service
docker-compose logs -f backend

# Enter container shell
docker-compose exec backend bash

# View resource usage
docker stats

# Remove all containers and volumes
docker-compose down -v

# Clean up unused images
docker image prune

# View image layers
docker history personal-finance-backend

# Inspect running container
docker-compose exec backend env  # View environment variables
```

---

## Performance & Optimization

### Build Optimization
- **Multi-stage builds:** Reduces final image size by ~70%
- **Layer caching:** Reuses cached layers for faster rebuilds
- **.dockerignore:** Excludes unnecessary files from build context
- **Slim base images:** Uses `-slim` and `-alpine` variants

### Runtime Optimization
- **Health checks:** Ensure services are running properly
- **Resource limits:** Set memory/CPU limits if needed
  ```bash
  docker-compose up --limit 2g
  ```
- **Logging:** Configure log drivers to prevent disk fill
  ```yaml
  # In docker-compose.yml
  logging:
    driver: "json-file"
    options:
      max-size: "10m"
      max-file: "3"
  ```

### Image Sizes (Approximate)
| Service | Size | Technologies |
|---------|------|---------------|
| Backend | 500-600 MB | Java 17, Spring Boot |
| Frontend | 400-500 MB | Node, Angular, Nginx |
| Login | 200-250 MB | Python 3.8, FastAPI |
| MCP Server | 200-250 MB | Python 3.8, FastAPI |
| **Total** | **1.3-1.6 GB** | **Across all services** |

### Reducing Image Size (Advanced)
```bash
# Use distroless base images (production only)
# In Dockerfile: FROM gcr.io/distroless/java17-debian11

# Run multi-stage builds (already implemented)
# Use .dockerignore effectively (already implemented)
```

---

## Production Deployment

### Preparing for Production
1. Set environment variables (secure API keys)
2. Use persistent database (PostgreSQL instead of H2)
3. Enable HTTPS/TLS
4. Configure resource limits
5. Set up monitoring and logging
6. Use non-root users in Dockerfiles (optional enhancement)

### Deployment Options
- **Docker Compose:** Single host deployment
- **Kubernetes:** Multi-host, auto-scaling, rolling updates
- **Docker Swarm:** Simpler than Kubernetes
- **Cloud Platforms:** AWS ECS, Google Cloud Run, Azure Container Instances

### Production docker-compose.yml
```yaml
# Add resource limits
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
  # ... for other services

  # Add persistent database
  postgres:
    image: postgres:14-alpine
    volumes:
      - postgres-data:/var/lib/postgresql/data
```

---

## Advanced Topics

### Building Custom Images
```bash
# Build with custom tag
docker-compose build --no-cache -t my-registry/backend:v1.0.0 backend

# Push to Docker Hub
docker push my-registry/backend:v1.0.0
```

### Viewing Build Layers
```bash
docker history personal-finance-backend --human --no-trunc
```

### Docker Compose Overrides
Create `docker-compose.override.yml` for development-specific settings:
```yaml
services:
  backend:
    volumes:
      - ./services/backend/src:/app/src  # Hot reload
    environment:
      DEBUG: "true"
```

### Health Check Customization
Modify health checks in `docker-compose.yml`:
```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
  interval: 30s
  timeout: 3s
  retries: 3
  start_period: 10s
```

---

## FAQ

**Q: How do I run tests in Docker?**
A: Tests are designed for local development. For Docker:
```bash
docker-compose exec backend ./mvnw test
docker-compose exec frontend npm test
```

**Q: Can I use hot reload with Docker?**
A: Yes, with volume mounts:
```yaml
services:
  backend:
    volumes:
      - ./services/backend/src:/app/src
```

**Q: How do I backup database data?**
A: H2 is in-memory. For persistence, use volumes or switch to PostgreSQL.

**Q: Should I use Docker for production?**
A: Yes, but add SSL/TLS, persistent database, monitoring, and security scanning.

**Q: How do I debug container performance?**
A: Use `docker stats`, `docker logs`, and monitoring tools like Prometheus.

---

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Best Practices for Writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Spring Boot Docker Guide](https://spring.io/guides/topicals/spring-boot-docker/)
- [Angular in Docker](https://angular.io/guide/docker)

---

## Support

For issues:
1. Check [Troubleshooting](#troubleshooting) section
2. View logs: `./scripts/docker-logs.sh [service]`
3. Check [CLAUDE.md](./CLAUDE.md) for development guidance
4. Review individual service READMEs
