# MCP Server - Quick Start Guide

Get your Personal Finance Manager working with Claude in 5 minutes.

## 1️⃣ Start All Services

```bash
# From the project root
cd personal-finance

# Start with Docker Compose (recommended)
docker-compose up

# Or start individual services locally:
# Terminal 1: Backend
cd services/backend && ./mvnw spring-boot:run

# Terminal 2: Login Service
cd services/login && uvicorn main:app --reload --port 8001

# Terminal 3: MCP Server
cd services/mcp-server && uvicorn app.main:app --reload --port 8000

# Terminal 4: Frontend (optional)
cd services/frontend && ng serve
```

**Verify services are running:**
```bash
curl http://localhost:8000    # MCP Server
curl http://localhost:8080/health  # Backend
curl http://localhost:8001/health  # Login Service
```

## 2️⃣ Configure Claude

### **Option A: Web Version (claude.ai/code) - EASIEST**

1. Open Claude at **https://claude.ai/code**
2. Click **Settings** → **Integrations** (or **Tools**)
3. Click **+ Add MCP Server**
4. Select **HTTP**
5. Fill in:
   - **Name:** Personal Finance Manager
   - **URL:** `http://localhost:8000`

That's it! Claude now has access to all finance tools.

### **Option B: Desktop Version**

**Windows:**
1. Open `%APPDATA%\Claude\claude_desktop_config.json`
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

**macOS/Linux:**
1. Open `~/.config/Claude/claude_desktop_config.json`
2. Add the same configuration (using Unix paths)

3. Restart Claude Desktop

## 3️⃣ Authenticate in Claude

**In Claude, ask:**
```
Help me authenticate with my personal finance system.
```

Claude will:
1. Get a login URL from the MCP server
2. Tell you to visit it in your browser
3. Once you log in and get a token, paste it back to Claude
4. Claude will set the token for all future requests

**Default test credentials:**
- Username: `testpfuser1`
- Password: `test123`

Or register a new account through Claude:
```
Create a new account with username "myaccount" and password "mypassword".
```

## 4️⃣ Start Using!

Once authenticated, ask Claude anything about your finances:

```
Show me all my transactions.
```

```
Add a $50 grocery purchase to the FOOD category for today.
```

```
Update transaction 5 - change the amount to $75.
```

```
What categories do I have?
```

```
Delete transaction 3.
```

## 🎯 What You Can Do

| Task | Example Prompt |
|------|---|
| **View Transactions** | "Show me all my transactions" |
| **Add Transaction** | "I spent $25 on gas today" |
| **Update Transaction** | "Change transaction 5 to $100" |
| **Delete Transaction** | "Remove transaction 3" |
| **View Categories** | "What categories exist?" |
| **Create Transaction** | "Add a coffee purchase for $5 in FOOD" |
| **Financial Summary** | "What's my spending breakdown?" |

## 🚀 Bonus: Use with Claude Code

Once configured, Claude Code (claude.ai/code) can:
- Query your finances while coding
- Track development expenses
- View financial data in your conversations
- Integrate finance data into your projects

## 📝 What's Happening Behind the Scenes

1. **You ask Claude:** "Add $50 expense"
2. **Claude uses MCP Server tool:** `add_transaction()`
3. **MCP Server calls Backend API:** `POST /api/transactions`
4. **Backend stores in database**
5. **Response comes back to you in Claude**

All communication is secured with JWT tokens that expire after 30 minutes.

## ❌ Troubleshooting

### MCP Server not connecting

```bash
# Check if it's running
curl http://localhost:8000

# If not, start it
cd services/mcp-server && uvicorn app.main:app --reload --port 8000

# Check logs
docker-compose logs mcp-server
```

### Backend not connecting

```bash
# Check if it's running
curl http://localhost:8080/health

# If not, start it
cd services/backend && ./mvnw spring-boot:run
```

### Token expired

Claude will tell you when your token expires. Just ask again:
```
Help me log in again, my token expired.
```

### "Not authenticated" error

Make sure you completed step 3️⃣ (Authenticate in Claude) first.

## 📚 Full Documentation

For detailed information, see:
- [services/mcp-server/MCP_SETUP_GUIDE.md](services/mcp-server/MCP_SETUP_GUIDE.md)
- [services/mcp-server/README.md](services/mcp-server/README.md)

## 🎓 Example Conversation

```
You: "Hi, help me set up my personal finance system."

Claude: "I can help! I have access to your personal finance system through MCP.
         First, let me get your login URL..."
         [Calls login() tool]
         "Visit this URL to log in: http://localhost:8001/login-form?..."

You: [Visit URL, log in with testpfuser1/test123, get token]

You: "My token is eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

Claude: [Calls set_token() tool]
        "Great! You're authenticated. Now I can manage your finances.
         Try asking me to show your transactions or add a new one."

You: "Show me all my transactions."

Claude: [Calls get_all_transactions() tool]
        Displays:
        | ID | Date       | Description | Amount | Category |
        |----|-----------|-------------|--------|----------|
        | 1  | 2025-01-15| Groceries  | $50    | FOOD     |
        | 2  | 2025-01-14| Gas        | $40    | TRAVEL   |

You: "Add a $25 coffee purchase in the FOOD category for today."

Claude: [Calls add_transaction() tool]
        "Done! I've added a $25 coffee transaction in the FOOD category."
```

## ✅ Ready to Go!

You now have a fully functional MCP server connecting Claude to your personal finances. Enjoy!

For questions, see the full [MCP_SETUP_GUIDE.md](services/mcp-server/MCP_SETUP_GUIDE.md).
