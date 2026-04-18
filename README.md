# Personal Finance Application

A modern, **multi-service personal finance management application** built with Spring Boot, Angular, FastAPI, and Claude AI integration.

```
Frontend (Angular)
    ↓
Spring Boot REST API ← Login Service (FastAPI)
    ↓
H2 Database
    ↓
MCP Server (Claude AI Integration)
```

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Node.js 16+
- Python 3.8+
- Maven 3.6+
- npm 8+

### Setup (5 minutes)
```bash
# Clone repository
git clone <repo-url>
cd personal-finance

# Run setup script
./scripts/setup.sh

# Configure environment
cp .env.example .env
# Edit .env and set ANTHROPIC_API_KEY
```

### Start Application (2 minutes)
```bash
# Start all services
/start-backend

# Access application
# Frontend: http://localhost:4200
# H2 Console: http://localhost:8080/h2-console
```

### Run Tests
```bash
# Run all tests
/test-all

# Run specific service
/test-all spring-boot      # Backend tests
/test-all angular          # Frontend tests
/test-all login-service    # Auth tests
/test-all mcp-server       # LLM integration tests
```

## 🏗️ Architecture

### Four Tightly-Integrated Services

| Service | Port | Technology | Purpose |
|---------|------|-----------|---------|
| **Frontend** | 4200 | Angular + TypeScript | Web UI for transaction management |
| **Backend** | 8080 | Spring Boot 3 + Java 17 | REST API + H2 database |
| **Login** | 8001 | FastAPI + Python | JWT authentication |
| **MCP Server** | 8082 | FastAPI + Python | Claude AI integration |

### Single Mono-Repo Structure
```
personal-finance/
├── services/
│   ├── backend/          (Spring Boot)
│   ├── frontend/         (Angular)
│   ├── login/            (FastAPI)
│   └── mcp-server/       (FastAPI)
├── scripts/              (Automation)
├── docker-compose.yml    (Local orchestration)
├── CLAUDE.md             (Development guide)
└── .env.example          (Configuration template)
```

## ✨ Features

### Transaction Management
- 📊 Add, edit, delete transactions
- 🏷️ Categorize transactions
- 📈 View transaction history
- 🔍 Filter and search

### Authentication
- 🔐 JWT-based authentication
- 👤 User login/logout
- 🛡️ MCP authorization

### AI Integration (via Claude)
- 💡 Spending pattern analysis
- 📈 Financial insights
- 🎯 Budget recommendations
- 💬 Natural language financial queries

### H2 Database
- 💾 In-memory database
- 🔄 Auto-schema creation
- 📊 H2 Console for data inspection

## 🧪 Testing

### Test Coverage
- **Total Tests**: 241 tests across all services
- **Coverage Target**: 80%+ 
- **Execution Time**: ~2.5 minutes (sequential) or ~50 seconds (parallel)

### Test Breakdown
| Service | Tests | Coverage | Time |
|---------|-------|----------|------|
| Backend | 42 | 80%+ | 45s |
| Login | 18 | 85%+ | 12s |
| MCP | 25 | 75%+ | 20s |
| Frontend | 156 | 70%+ | 35s |

### Run Tests
```bash
# All tests
/test-all

# Parallel (faster)
/test-all --parallel

# With coverage report
/test-all --coverage

# Fail fast (stop on first failure)
/test-all --fail-fast

# Development watch mode
/test-all angular --watch
```

## 🛠️ Development

### Individual Service Development

**Backend (Spring Boot)**
```bash
cd services/backend
./mvnw spring-boot:run
```

**Frontend (Angular)**
```bash
cd services/frontend
ng serve
```

**Login Service**
```bash
cd services/login
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

**MCP Server**
```bash
cd services/mcp-server
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Code Organization

**Frontend** - `services/frontend/src/app/`
```
components/      - UI components (dashboard, transactions, etc.)
services/        - HTTP services & business logic
models/          - TypeScript interfaces
modules/         - Angular feature modules
```

**Backend** - `services/backend/src/main/`
```
controller/      - REST API endpoints
service/         - Business logic
repository/      - JPA data access
model/           - JPA entities
```

**Python Services** - `services/login/` & `services/mcp-server/`
```
main.py          - FastAPI application
requirements.txt - Dependencies
tests/           - Unit tests
```

## 📋 Git Workflow

### Atomic Commits
This is a **mono-repo**: all 4 services in one git history.

```bash
# Feature branch
git checkout -b feature/add-spending-analysis

# Make changes across services
# Edit services/backend/src/...
# Edit services/frontend/src/...
# Add tests

# Test everything
/test-all

# Single commit (atomic change)
git commit -m "feat: add spending pattern analysis

- Backend: new spending analysis endpoint
- MCP: integrate with Claude for insights
- Frontend: new analysis dashboard component
- Tests: 100% coverage for analysis logic"

git push origin feature/add-spending-analysis
```

## 🐳 Docker

### Local Development
```bash
# Build all services
docker-compose build

# Start all services
docker-compose up

# View logs
docker-compose logs -f frontend
```

### Service Status
```bash
# Check health
curl http://localhost:4200        # Frontend
curl http://localhost:8080/health # Backend
curl http://localhost:8001/health # Login
```

## 📚 Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Development guide & commands
- **[Backend README](./services/backend/README.md)** - Spring Boot docs
- **[Frontend README](./services/frontend/README.md)** - Angular docs
- **[Login Service README](./services/login/README.md)** - Auth docs
- **[MCP Server README](./services/mcp-server/README.md)** - AI integration docs

## ⚙️ Configuration

### Environment Variables
```bash
cp .env.example .env
# Edit and configure:
# - ANTHROPIC_API_KEY (required for Claude)
# - Database settings
# - Service URLs
```

### H2 Console
Access database: http://localhost:8080/h2-console
- **URL**: `jdbc:h2:mem:testdb`
- **User**: `sa`
- **Password**: `password`

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Find & kill process on port 8080
lsof -i :8080
kill -9 <PID>
```

### Dependencies Not Installed
```bash
./scripts/setup.sh
```

### Tests Failing
```bash
# Verbose output
/test-all --verbose

# Single service
/test-all spring-boot
```

### Database Issues
```bash
# H2 resets on restart
# Restart Spring Boot to reset database
```

## 📦 Deployment

### Production Build
```bash
# Backend
cd services/backend && ./mvnw clean package -DskipTests

# Frontend
cd services/frontend && ng build --prod

# Python services
# Use Docker images with requirements.txt
```

### Docker Deployment
Each service has a Dockerfile for containerized deployment.

## 👥 Contributing

1. **Setup** - Run `./scripts/setup.sh`
2. **Branch** - Create feature branch
3. **Develop** - Make changes across services
4. **Test** - Run `/test-all` (all tests must pass)
5. **Commit** - Atomic commits with clear messages
6. **Push** - Push to origin
7. **Review** - Create pull request

## 📄 Independent Projects

These projects are maintained **separately** (NOT in this repo):
- **[vrgt-rag](../vrgt-rag)** - RAG library
- **[test-data-generator](../test-data-generator)** - Test fixture generator

## 📞 Support

- **Development Issues** - See [CLAUDE.md](./CLAUDE.md)
- **Service-Specific** - Check individual service READMEs
- **Tests** - Run `/test-all --verbose`

## 📄 License

[Add your license here]

## 🔗 Related Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Angular Documentation](https://angular.io/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Claude API Documentation](https://docs.anthropic.com/)
