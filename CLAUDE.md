# Personal Finance Application - Development Guide

This is a **monolithic repository** containing 4 tightly-integrated services.

## 💻 Quick Start Commands

### Start All Services
```bash
/start-backend
# Orchestrates: Login (8001) → Backend (8080) → MCP Server → Frontend (4200)
```

### Run All Tests
```bash
/test-all
# Tests: Spring Boot → Login Service → MCP Server → Angular
# Coverage: 80%+ target
```

### Setup Environment (First Time)
```bash
./scripts/setup.sh
# Installs all dependencies for all 4 services
```

## 📁 Project Structure

```
personal-finance/
├── services/
│   ├── backend/              (Spring Boot - Java 17)
│   │   ├── src/
│   │   ├── pom.xml
│   │   └── Dockerfile
│   ├── frontend/             (Angular - TypeScript)
│   │   ├── src/
│   │   ├── angular.json
│   │   ├── package.json
│   │   └── Dockerfile
│   ├── mcp-server/           (FastAPI - Python 3.8+)
│   │   ├── app/
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   └── login/                (FastAPI - Python 3.8+)
│       ├── main.py
│       ├── requirements.txt
│       └── Dockerfile
├── scripts/
│   └── setup.sh
├── docker-compose.yml
├── .env.example
├── .gitignore
├── CLAUDE.md
└── README.md
```

## 🏗️ Architecture

### Service Dependencies
```
Frontend (4200)
    ↓
Login Service (8001) → Backend API (8080) → H2 Database
    ↓
MCP Server → Claude API
```

### Service Details

| Service | Port | Tech | Purpose |
|---------|------|------|---------|
| **Login** | 8001 | FastAPI (Python) | Authentication & MCP authorization |
| **Backend** | 8080 | Spring Boot (Java) | Core REST API + H2 database |
| **MCP** | 8082 | FastAPI (Python) | LLM integration via MCP protocol |
| **Frontend** | 4200 | Angular (TypeScript) | Web UI |

## 🚀 Development Workflow

### 1. Initial Setup
```bash
cd personal-finance
./scripts/setup.sh
```

### 2. Start Services
```bash
# Option A: All services at once (recommended)
/start-backend

# Option B: Individual services
cd services/backend && ./mvnw spring-boot:run
cd services/frontend && ng serve
cd services/login && uvicorn main:app --reload --port 8001
cd services/mcp-server && uvicorn app.main:app --reload
```

### 3. Verify Services
```bash
# Check health
curl http://localhost:8001/health     # Login
curl http://localhost:8080/health     # Backend
curl http://localhost:4200            # Frontend

# Access H2 Console
curl http://localhost:8080/h2-console
```

### 4. Run Tests
```bash
# All tests
/test-all

# Specific service
/test-all spring-boot
/test-all angular
/test-all login-service
/test-all mcp-server

# With coverage
/test-all --coverage

# Development (watch mode)
/test-all angular --watch
```

## 📦 Dependencies

### System Requirements
- **Java 17+** (Spring Boot)
- **Node.js 16+** (Angular)
- **Python 3.8+** (FastAPI services)
- **Maven 3.6+**
- **npm 8+**
- **Docker** (optional, for containerized development)

### Install Dependencies
```bash
# Automatic setup
./scripts/setup.sh

# Manual setup
cd services/backend && ./mvnw clean install
cd ../frontend && npm install
cd ../login && pip install -r requirements.txt
cd ../mcp-server && pip install -r requirements.txt
```

## 🧪 Testing

All tests managed by `/test-all` skill:

### Test Coverage by Service
| Service | Tests | Time | Coverage Target |
|---------|-------|------|-----------------|
| Spring Boot | 42 | 45s | 80%+ |
| Login Service | 18 | 12s | 85%+ |
| MCP Server | 25 | 20s | 75%+ |
| Angular | 156 | 35s | 70%+ |
| **TOTAL** | **241** | **2:30** | **80%+** |

### Before Committing
```bash
# Fail fast (stop on first failure)
/test-all --fail-fast

# With coverage validation
/test-all --coverage
```

## 🔧 Configuration

### Environment Variables
Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required variables:
```bash
# Spring Boot
SPRING_DATASOURCE_URL=jdbc:h2:mem:testdb
SPRING_JPA_HIBERNATE_DDL_AUTO=create-drop

# Login Service
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# MCP Server (REQUIRED)
ANTHROPIC_API_KEY=sk-...
BACKEND_API_URL=http://localhost:8080
LOGIN_SERVICE_URL=http://localhost:8001

# Angular
API_BASE_URL=http://localhost:8080
LOGIN_SERVICE_URL=http://localhost:8001
```

## 🐳 Docker Development

### Build All Services
```bash
docker-compose build
```

### Start All Services
```bash
docker-compose up
```

### View Logs
```bash
docker-compose logs -f
docker-compose logs -f backend
docker-compose logs -f frontend
```

## 📝 Code Organization

### Backend (Spring Boot)
```
services/backend/src/main/java/com/example/financemanager/
├── controller/      REST API endpoints
├── service/         Business logic
├── repository/      Data access
└── model/           JPA entities
```

### Frontend (Angular)
```
services/frontend/src/app/
├── components/      UI components
├── services/        HTTP & business logic
├── models/          TypeScript interfaces
└── modules/         Angular modules
```

### Python Services
```
services/login/ & services/mcp-server/
├── main.py / app/main.py
├── requirements.txt
└── tests/
```

## 🔀 Git Workflow

### Typical Feature Flow
```bash
# Create feature branch
git checkout -b feature/add-transaction-filter

# Make changes across services
# Edit services/backend/...
# Edit services/frontend/...
# Edit tests in both

# Test everything
/test-all

# Commit (atomic change)
git commit -m "feat: add transaction filter

- Backend: new TransactionFilter service
- Frontend: new filter UI component
- Tests: 100% coverage for filter logic"

# Push
git push origin feature/add-transaction-filter
```

### Important Notes
- This is a mono-repo: one git history for all services
- Commit atomic changes (API + consumers together)
- All tests must pass before merging
- Coverage must meet service targets

## 🚀 Deployment

### Local (Docker Compose)
```bash
docker-compose up
# Access at http://localhost:4200
```

### Staging/Production
- Each service has its own Dockerfile
- Orchestrate with Kubernetes or Docker Swarm
- Environment variables override defaults

## 📚 Additional Resources

- **Backend Docs**: `services/backend/README.md`
- **Frontend Docs**: `services/frontend/README.md`
- **MCP Server Docs**: `services/mcp-server/README.md`
- **Login Service Docs**: `services/login/README.md`

## ⚠️ Common Issues

### Port Already in Use
```bash
# Find process using port
lsof -i :8080

# Kill process
kill -9 <PID>
```

### Dependencies Not Installed
```bash
./scripts/setup.sh
```

### Tests Failing
```bash
# Run with verbose output
/test-all --verbose

# Run single service
/test-all spring-boot
```

### Database Issues
```bash
# H2 is in-memory, resets on restart
# Restart Spring Boot to reset database
```

## 👥 Contributing

1. Create feature branch
2. Make changes across services
3. Run `/test-all` - all tests must pass
4. Coverage must meet targets
5. Create pull request
6. Request review

## 📞 Support

For issues, check:
1. `CLAUDE.md` (this file)
2. Individual service READMEs
3. Test logs with `/test-all --verbose`
