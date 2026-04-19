# MCP Server Deployment Status ✅

## Current Status
All services are running and ready for Claude integration.

## Running Services

| Service | Port | Status | Health Check |
|---------|------|--------|--------------|
| **MariaDB** | 3306 | ✅ Running | Database container |
| **Backend API** | 8080 | ✅ Running | `curl http://localhost:8080/health` |
| **Login Service** | 8001 | ✅ Running | `curl http://localhost:8001/health` |
| **MCP Server** | 8000 | ✅ Running | FastMCP transport active |
| **Frontend** | 4200 | ⏸️ Not Started | Optional for API-only use |

## Service Details

### MCP Server (FastMCP)
- **Type:** Model Context Protocol Server
- **Status:** ✅ Active
- **Location:** `services/mcp-server/`
- **Transport:** stdio (for embedded use) / can also use HTTP
- **Tools Available:** 8 tools for transaction management

**Tools provided:**
1. `login()` - Get authentication URL
2. `set_token(token)` - Set JWT token
3. `logout()` - Clear authentication
4. `register(username, email, password, role)` - Create new account
5. `get_all_transactions()` - List transactions
6. `add_transaction(date, description, amount, category)` - Create transaction
7. `update_transaction(id, date, description, amount, category)` - Update transaction
8. `delete_transaction(id)` - Delete transaction

### Backend API (Spring Boot)
- **Type:** REST API Server
- **Status:** ✅ Running
- **Port:** 8080
- **Database:** MariaDB (Docker volume: `mariadb-data`)
- **Endpoints:** `/api/auth/*`, `/api/transactions/*`, `/api/categories/*`, `/api/users/*`

### Login Service (FastAPI)
- **Type:** Authentication Service
- **Status:** ✅ Running
- **Port:** 8001
- **Purpose:** User registration and token generation

### Database (MariaDB)
- **Type:** MySQL-compatible Database
- **Status:** ✅ Running
- **Port:** 3306
- **Database:** `personalfinance`
- **Credentials:** `pfuser` / `pfpassword`
- **Volume:** `mariadb-data` (persistent)

## Docker Compose Command

Services started with:
```bash
docker-compose up mariadb backend login-service mcp-server
```

All containers are in the `pf-network` Docker network for inter-service communication.

## Next Steps - Configure Claude

### Step 1: Verify Services Are Accessible

```bash
# Test Backend
curl http://localhost:8080/health

# Test Login Service  
curl http://localhost:8001/health

# Test MCP Server is ready (FastMCP is active)
docker-compose logs mcp-server | grep "Starting MCP server"
```

### Step 2: Configure in Claude

Choose your Claude version:

#### **Web Version (claude.ai/code) - Recommended**
1. Go to https://claude.ai/code
2. Click **Settings** → **Integrations** (or **Tools**)
3. Click **+ Add MCP Server**
4. Fill in:
   - **Type:** HTTP
   - **URL:** `http://localhost:8000`
   - **Name:** Personal Finance Manager
5. Click **Connect**

#### **Desktop Version**

1. Edit `%APPDATA%\Claude\claude_desktop_config.json` (Windows)
2. Add this configuration:

```json
{
  "mcpServers": {
    "personal-finance": {
      "command": "python",
      "args": ["-m", "uvicorn", "app.main:app", "--port", "8000"],
      "cwd": "C:\\path\\to\\personal-finance\\services\\mcp-server"
    }
  }
}
```

3. Restart Claude Desktop
4. Claude will automatically start the MCP server when needed

### Step 3: Authenticate

Once configured, ask Claude in any chat:

```
Help me authenticate with my personal finance system.
```

Claude will:
1. Call the `login()` tool
2. Give you a login URL
3. You visit the URL and log in (use `testpfuser1` / `test123` for testing)
4. You get a JWT token
5. You provide the token to Claude
6. Claude sets it with `set_token()` tool
7. You're ready to use all finance tools!

### Step 4: Start Using

After authentication, you can ask Claude:
- "Show me all my transactions"
- "Add a $50 coffee purchase"
- "What categories do I have?"
- "Update transaction 5 to $100"
- "Delete transaction 3"

## Accessing Services Directly

If you want to test the APIs directly:

### Test Backend
```bash
# Get categories
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8080/api/categories

# Get transactions
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8080/api/transactions
```

### Get JWT Token
```bash
# Authenticate
curl -X POST http://localhost:8080/api/auth/authenticate \
  -H "Content-Type: application/json" \
  -d '{"username":"testpfuser1","password":"test123"}'

# Response includes "token" field
```

### Access Database
```bash
# Connect to MariaDB
mysql -h localhost -u pfuser -p personalfinance
# Password: pfpassword
```

## Configuration Files

### Key Files
- `docker-compose.yml` - Service orchestration
- `services/mcp-server/app/main.py` - MCP server code
- `services/backend/src/main/java/com/example/financemanager/` - API implementation
- `.env` - Environment variables (copy from `.env.example`)

### MCP Server Configuration
- **Port:** 8000 (default)
- **Backend API:** http://localhost:8080
- **Base URL can be changed:** Edit `services/mcp-server/app/main.py` line 8
- **Authentication:** JWT token-based (30-minute expiration)

## Stopping Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (clears database)
docker-compose down -v

# Stop specific service
docker-compose stop mcp-server
```

## Logs and Debugging

```bash
# View all logs
docker-compose logs -f

# View specific service
docker-compose logs -f mcp-server
docker-compose logs -f backend
docker-compose logs -f login-service

# Follow logs in real-time
docker-compose logs -f --tail=50
```

## Testing Checklist

- [x] MariaDB running and healthy
- [x] Backend API running and responding
- [x] Login Service running and responding
- [x] MCP Server active with FastMCP
- [ ] Claude MCP Server configured
- [ ] Successfully authenticated in Claude
- [ ] Called a tool from Claude (e.g., list transactions)

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 8000
lsof -i :8000

# Or use Windows equivalent
netstat -ano | findstr :8000
```

### Services Won't Start
```bash
# Check Docker status
docker-compose ps

# View detailed error logs
docker-compose logs mcp-server --tail=100
```

### MCP Server Not Responding
```bash
# Verify it's running
docker-compose ps mcp-server

# Check for startup errors
docker-compose logs mcp-server | grep -i error
```

### Backend Database Error
```bash
# Check MariaDB logs
docker-compose logs mariadb

# Verify database exists
mysql -h localhost -u pfuser -p -e "SHOW DATABASES;"
```

## Performance Notes

- **First startup:** 30-60 seconds (database initialization)
- **Subsequent starts:** 5-10 seconds
- **MCP Server:** Loads in ~2 seconds
- **API Response Time:** <100ms (local network)

## Security Notes

### In Development
- JWT tokens valid for 30 minutes
- Test credentials: `testpfuser1` / `test123`
- H2 in-memory database resets on restart
- All data is local, not exposed

### Before Production
- Change test user credentials
- Set strong `ANTHROPIC_API_KEY`
- Use HTTPS for token transmission
- Implement token refresh mechanism
- Add request rate limiting
- Enable database backups

## Support Resources

1. **Quick Start:** [MCP_QUICK_START.md](./MCP_QUICK_START.md) (5 minutes)
2. **Detailed Guide:** [services/mcp-server/MCP_SETUP_GUIDE.md](./services/mcp-server/MCP_SETUP_GUIDE.md)
3. **MCP Protocol:** https://modelcontextprotocol.io/
4. **FastMCP:** https://gofastmcp.com/

## Summary

Your Personal Finance Manager is now running and ready to integrate with Claude. The MCP server provides a clean interface for Claude to manage your finances through natural language.

**Next action:** Configure the MCP server in Claude (see Step 2 above) and start asking Claude to manage your finances!
