# MCP Documentation Index

Complete guide to all MCP Server documentation for the Personal Finance Manager.

## 📚 Documentation Files

### Start Here (Choose Your Path)

#### **Path A: I have 5 minutes** 🚀
→ Read [MCP_QUICK_START.md](./MCP_QUICK_START.md)
- Start services
- Configure Claude (web or desktop)
- Authenticate
- Start using!

#### **Path B: I want detailed setup instructions** 📖
→ Read [services/mcp-server/MCP_SETUP_GUIDE.md](./services/mcp-server/MCP_SETUP_GUIDE.md)
- Comprehensive setup guide
- All configuration options
- Authentication flows
- Advanced configurations
- Troubleshooting

#### **Path C: I need deployment information** 🔧
→ Read [MCP_DEPLOYMENT_STATUS.md](./MCP_DEPLOYMENT_STATUS.md)
- Current service status
- Service details and ports
- Health checks
- Debugging guide
- Docker operations

#### **Path D: I want a quick overview** 📋
→ Read [MCP_CONFIGURATION_SUMMARY.md](./MCP_CONFIGURATION_SUMMARY.md)
- 3-minute setup summary
- Tool descriptions
- Key information
- Verification checklist

---

## 📁 Complete File List

### Main Documentation

| File | Purpose | Read Time | Audience |
|------|---------|-----------|----------|
| **MCP_QUICK_START.md** | Quick setup (5 minutes) | 5 min | Everyone |
| **MCP_SETUP_GUIDE.md** | Comprehensive guide | 15 min | Power users |
| **MCP_DEPLOYMENT_STATUS.md** | Service status & debugging | 10 min | DevOps/Admins |
| **MCP_CONFIGURATION_SUMMARY.md** | Configuration overview | 3 min | Everyone |
| **MCP_DOCUMENTATION_INDEX.md** | This file | 5 min | Everyone |

### Service Documentation

| File | Purpose |
|------|---------|
| **services/mcp-server/README.md** | MCP server introduction |
| **services/mcp-server/MCP_SETUP_GUIDE.md** | Detailed MCP setup |
| **services/mcp-server/app/main.py** | MCP server code (with tools) |
| **services/mcp-server/requirements.txt** | Python dependencies |
| **services/backend/README.md** | Backend API documentation |
| **services/login/README.md** | Login service documentation |

### Configuration Templates

| File | Purpose |
|------|---------|
| **services/mcp-server/claude_desktop_config.json.template** | Desktop client configuration template |
| **services/mcp-server/scripts/start-claude-mcp.sh** | Unix/Linux startup script |
| **services/mcp-server/scripts/start-claude-mcp.bat** | Windows startup script |

### Project Files

| File | Purpose |
|------|---------|
| **docker-compose.yml** | Docker service orchestration |
| **CLAUDE.md** | Development guide |
| **.env.example** | Environment configuration template |

---

## 🎯 Common Tasks - Find Your Documentation

### "I want to get started quickly"
→ [MCP_QUICK_START.md](./MCP_QUICK_START.md) (5 minutes)

### "How do I configure Claude Desktop?"
→ [MCP_SETUP_GUIDE.md](./services/mcp-server/MCP_SETUP_GUIDE.md) - Desktop Version section  
→ [MCP_CONFIGURATION_SUMMARY.md](./MCP_CONFIGURATION_SUMMARY.md) - Option B section

### "How do I authenticate?"
→ [MCP_QUICK_START.md](./MCP_QUICK_START.md) - Step 3️⃣ Authenticate  
→ [MCP_SETUP_GUIDE.md](./services/mcp-server/MCP_SETUP_GUIDE.md) - Authentication Flow section

### "What tools are available?"
→ [MCP_SETUP_GUIDE.md](./services/mcp-server/MCP_SETUP_GUIDE.md) - Available Tools section  
→ [MCP_CONFIGURATION_SUMMARY.md](./MCP_CONFIGURATION_SUMMARY.md) - Available Tools in Claude section

### "How do I start the services?"
→ [MCP_QUICK_START.md](./MCP_QUICK_START.md) - 1️⃣ Start All Services  
→ [MCP_DEPLOYMENT_STATUS.md](./MCP_DEPLOYMENT_STATUS.md) - Running Services section

### "What's the current status of services?"
→ [MCP_DEPLOYMENT_STATUS.md](./MCP_DEPLOYMENT_STATUS.md) - Current Status section

### "Services aren't working, how do I debug?"
→ [MCP_DEPLOYMENT_STATUS.md](./MCP_DEPLOYMENT_STATUS.md) - Troubleshooting section  
→ [MCP_SETUP_GUIDE.md](./services/mcp-server/MCP_SETUP_GUIDE.md) - Troubleshooting section

### "I have a specific error, what should I do?"
→ [MCP_DEPLOYMENT_STATUS.md](./MCP_DEPLOYMENT_STATUS.md) - Logs and Debugging section

### "How do I use Claude with my finances?"
→ [MCP_QUICK_START.md](./MCP_QUICK_START.md) - 🎯 What You Can Do section  
→ [MCP_SETUP_GUIDE.md](./services/mcp-server/MCP_SETUP_GUIDE.md) - Usage Examples section

### "I want example conversations"
→ [MCP_CONFIGURATION_SUMMARY.md](./MCP_CONFIGURATION_SUMMARY.md) - Example Conversation section  
→ [MCP_QUICK_START.md](./MCP_QUICK_START.md) - 🎓 Example Conversation section

---

## 📊 Information Quick Reference

### Service Ports
```
Frontend:       4200 (optional, for UI)
MCP Server:     8000 (required for Claude integration)
Backend API:    8080 (required)
Login Service:  8001 (required)
MariaDB:        3306 (required)
```

### Default Credentials (Testing Only)
```
Username: testpfuser1
Password: test123
```

### Key Commands

```bash
# Start all services
docker-compose up mariadb backend login-service mcp-server

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Check service status
docker-compose ps

# Run startup script (Windows)
.\services\mcp-server\scripts\start-claude-mcp.bat

# Run startup script (Unix/Linux/Mac)
./services/mcp-server/scripts/start-claude-mcp.sh
```

### Available Tools (in Claude)

| Tool | Purpose |
|------|---------|
| `login()` | Get authentication URL |
| `set_token(token)` | Set JWT authentication token |
| `logout()` | Clear authentication |
| `register(username, email, password)` | Create new account |
| `get_all_transactions()` | List transactions |
| `add_transaction(date, desc, amount, category)` | Add transaction |
| `update_transaction(id, date, desc, amount, category)` | Update transaction |
| `delete_transaction(id)` | Delete transaction |
| `get_all_categories()` | List categories |

---

## 🔗 External Resources

### MCP Protocol
- [MCP Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP Specification](https://spec.modelcontextprotocol.io/)

### FastMCP Framework
- [FastMCP Documentation](https://gofastmcp.com/)
- [FastMCP GitHub](https://github.com/jlooney/fastmcp)

### Claude API
- [Claude API Documentation](https://docs.anthropic.com/)
- [Claude Models](https://docs.anthropic.com/en/docs/about-claude/models/latest)

### Technologies Used
- [Spring Boot](https://spring.io/projects/spring-boot/)
- [Angular](https://angular.io/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [MariaDB](https://mariadb.org/)
- [Docker](https://www.docker.com/)

---

## 📈 Documentation Structure

```
personal-finance/
├── MCP_QUICK_START.md                           ← START HERE (5 min)
├── MCP_CONFIGURATION_SUMMARY.md                 ← 3-minute overview
├── MCP_DEPLOYMENT_STATUS.md                     ← Service status & debugging
├── MCP_DOCUMENTATION_INDEX.md                   ← This file (navigation)
├── README.md                                    ← Main project README
├── CLAUDE.md                                    ← Development guide
├── docker-compose.yml                           ← Service orchestration
├── .env.example                                 ← Configuration template
│
├── services/
│   ├── mcp-server/
│   │   ├── MCP_SETUP_GUIDE.md                  ← Comprehensive setup (15 min)
│   │   ├── README.md                           ← MCP server intro
│   │   ├── app/
│   │   │   └── main.py                         ← MCP server code with tools
│   │   ├── requirements.txt                    ← Dependencies
│   │   ├── scripts/
│   │   │   ├── start-claude-mcp.sh             ← Unix startup script
│   │   │   └── start-claude-mcp.bat            ← Windows startup script
│   │   ├── Dockerfile                          ← Docker image definition
│   │   └── claude_desktop_config.json.template ← Desktop config template
│   │
│   ├── backend/                                 ← Spring Boot API
│   ├── login/                                   ← FastAPI Login Service
│   └── frontend/                                ← Angular UI (optional)
│
└── scripts/                                     ← Project scripts
```

---

## ✅ Setup Checklist

- [ ] Read [MCP_QUICK_START.md](./MCP_QUICK_START.md)
- [ ] Start services with `docker-compose up mariadb backend login-service mcp-server`
- [ ] Configure MCP in Claude (web or desktop)
- [ ] Authenticate with your account
- [ ] Test a tool (e.g., "Show my transactions")
- [ ] Read [MCP_SETUP_GUIDE.md](./services/mcp-server/MCP_SETUP_GUIDE.md) for advanced features

---

## 🆘 Need Help?

1. **Quick issue?** → Check [MCP_DEPLOYMENT_STATUS.md](./MCP_DEPLOYMENT_STATUS.md) Troubleshooting
2. **Configuration question?** → See [MCP_CONFIGURATION_SUMMARY.md](./MCP_CONFIGURATION_SUMMARY.md)
3. **Detailed help needed?** → Read [MCP_SETUP_GUIDE.md](./services/mcp-server/MCP_SETUP_GUIDE.md)
4. **Docker/deployment?** → Check [MCP_DEPLOYMENT_STATUS.md](./MCP_DEPLOYMENT_STATUS.md)

---

## 📝 Document Versions

Created: **2026-04-19**  
MCP Server: **FastMCP 3.2.4**  
Spring Boot: **3.1.0**  
Python: **3.8+**  
Angular: **Latest (from package.json)

---

## 🎓 Learning Path

### Beginner
1. [MCP_QUICK_START.md](./MCP_QUICK_START.md) - 5 minutes
2. Set up and authenticate
3. Try a few basic commands

### Intermediate
1. Read [MCP_CONFIGURATION_SUMMARY.md](./MCP_CONFIGURATION_SUMMARY.md)
2. Read [MCP_DEPLOYMENT_STATUS.md](./MCP_DEPLOYMENT_STATUS.md)
3. Deploy using docker-compose
4. Set up desktop client (optional)

### Advanced
1. Read [MCP_SETUP_GUIDE.md](./services/mcp-server/MCP_SETUP_GUIDE.md) in full
2. Review [services/mcp-server/app/main.py](./services/mcp-server/app/main.py)
3. Customize tool implementations
4. Set up production deployment

---

## 🚀 You're Ready!

Your MCP server is set up and running. Choose a documentation file above and start using Claude to manage your finances!

**Quickest start:** [MCP_QUICK_START.md](./MCP_QUICK_START.md) (5 minutes)

Enjoy! 🎉
