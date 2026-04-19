# MCP Configuration Summary

## What You Have

A fully functional MCP (Model Context Protocol) server that connects Claude to your Personal Finance Manager. Claude can now:

✅ View all your transactions  
✅ Add new transactions  
✅ Update existing transactions  
✅ Delete transactions  
✅ View categories  
✅ Manage user accounts  
✅ Handle authentication  

All through natural language conversation with Claude.

## 3-Minute Setup

### 1. Start Services (if not already running)

```bash
cd personal-finance
docker-compose up mariadb backend login-service mcp-server
```

### 2. Configure Claude (Choose One)

#### **Option A: Web Version (claude.ai/code)**

1. Open https://claude.ai/code
2. Go to **Settings** → **Integrations**
3. Click **+ Add MCP Server**
4. Select **HTTP** and enter:
   - **URL:** `http://localhost:8000`
   - **Name:** Personal Finance Manager

✅ Done! Claude now has access to your finance tools.

#### **Option B: Desktop Version**

1. Open this file (for your OS):
   - **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
   - **Mac/Linux:** `~/.config/Claude/claude_desktop_config.json`

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

Replace `C:\path\to` with your actual path.

3. Restart Claude Desktop

✅ Done! Claude will now auto-start the MCP server.

### 3. Authenticate in Claude

**In any Claude conversation, ask:**

```
Help me set up my personal finance system.
```

Claude will walk you through:
1. Getting a login URL
2. Logging in with credentials (test: `testpfuser1` / `test123`)
3. Providing the token back to Claude

✅ Done! You're authenticated and ready to use all finance tools.

## Documentation Files

We've created complete documentation for you:

| File | Purpose | Read Time |
|------|---------|-----------|
| **MCP_QUICK_START.md** | Get started in 5 minutes | 5 min |
| **services/mcp-server/MCP_SETUP_GUIDE.md** | Comprehensive setup guide | 15 min |
| **MCP_DEPLOYMENT_STATUS.md** | Current service status and debugging | 10 min |
| **services/mcp-server/README.md** | MCP server documentation | 5 min |
| **CLAUDE.md** | Development guide for all services | 10 min |

## Available Tools in Claude

Once authenticated, you can use these commands:

### Transactions
```
"Show me all my transactions"
"Add a $50 coffee purchase in FOOD category"
"Update transaction 5 to $75"
"Delete transaction 3"
```

### Categories
```
"What categories do I have?"
```

### Authentication
```
"Help me log in"
"Set token to [token]"
"Log me out"
```

## Key Information

**MCP Server Details:**
- Location: `personal-finance/services/mcp-server/`
- Port: 8000
- Type: FastMCP (HTTP + stdio transport)
- Backend: Spring Boot API (port 8080)
- Database: MariaDB (port 3306)

**Authentication:**
- Type: JWT (JSON Web Tokens)
- Duration: 30 minutes per token
- Default test user: `testpfuser1` / `test123`

**Network:**
- All services run in Docker network `pf-network`
- Database volume: `mariadb-data` (persistent)

## Verification Checklist

Before using in Claude, verify:

```bash
# 1. Check backend is running
curl http://localhost:8080/health

# 2. Check login service is running
curl http://localhost:8001/health

# 3. Check MCP server logs
docker-compose logs mcp-server | grep "Starting MCP server"

# 4. View all services
docker-compose ps
```

All should show ✅ Running or Healthy.

## Troubleshooting Quick Links

**Port conflicts?** → See "Stopping Services" in MCP_DEPLOYMENT_STATUS.md  
**Authentication fails?** → See "Token Expiration" in MCP_SETUP_GUIDE.md  
**Services won't start?** → See "Troubleshooting" in MCP_DEPLOYMENT_STATUS.md  
**Claude can't connect?** → See "Configuring Claude" in MCP_QUICK_START.md  

## Next Steps

1. ✅ Services are running (you're here)
2. → Configure MCP in Claude (see above, 2 minutes)
3. → Authenticate in Claude (1 minute)
4. → Start asking Claude about your finances!

## Example Conversation

```
You: "Hi Claude, can you help me manage my finances?"

Claude: "I have access to your Personal Finance Manager! 
         Let me help you get authenticated first..."
         [Calls login() tool]
         "Visit this URL to log in: http://localhost:8001/..."

You: [Visit URL, log in, get token]

You: "Here's my token: eyJhbGciOiJI..."

Claude: [Calls set_token() tool]
        "Great! You're authenticated. What would you like to do?"

You: "Show me all my transactions"

Claude: [Calls get_all_transactions() tool]
        Displays table of your transactions

You: "Add a $25 lunch expense in the FOOD category"

Claude: [Calls add_transaction() tool]
        "Done! I've added a $25 lunch transaction."
```

## Important Notes

### Security
- Tokens expire after 30 minutes (ask Claude to re-authenticate)
- All transactions are private to your authenticated account
- Database is encrypted in Docker volumes
- Never hardcode tokens in scripts

### Development
- Test credentials work for testing only
- Create your own account for actual use
- H2 database resets on container restart (use MariaDB for persistence)

### Production
- Change default credentials
- Use strong secrets
- Set ANTHROPIC_API_KEY in .env
- Enable HTTPS for token transmission

## Support

- **MCP Protocol:** https://modelcontextprotocol.io/
- **FastMCP Framework:** https://gofastmcp.com/
- **Claude API:** https://docs.anthropic.com/

## File Structure

```
personal-finance/
├── MCP_QUICK_START.md                 ← Start here (5 min)
├── MCP_DEPLOYMENT_STATUS.md           ← Service status & debugging
├── MCP_CONFIGURATION_SUMMARY.md       ← This file
├── docker-compose.yml                 ← All services configuration
├── services/
│   ├── mcp-server/
│   │   ├── MCP_SETUP_GUIDE.md        ← Detailed setup (15 min)
│   │   ├── app/main.py               ← MCP server code
│   │   ├── requirements.txt           ← Dependencies
│   │   ├── scripts/start-claude-mcp.sh/.bat  ← Startup scripts
│   │   └── claude_desktop_config.json.template
│   ├── backend/                       ← Spring Boot API
│   ├── login/                         ← Authentication service
│   └── frontend/                      ← Angular UI (optional)
└── .env.example                       ← Configuration template
```

## Summary

Your Personal Finance MCP Server is ready to use with Claude!

**Status:** ✅ All services running  
**Next action:** Configure in Claude (2 minutes, see above)  
**Support:** Read MCP_QUICK_START.md or MCP_SETUP_GUIDE.md  

Enjoy managing your finances with Claude! 🚀
