# Claude Connector Setup - Personal Finance Manager

Connect your Personal Finance MCP Server to Claude and interact naturally through chat (like Gmail integration).

## Overview

Your MCP server is now a **Claude Connector** with these tools:

✅ `authenticate_admin()` - Login as admin (admin/admin123)  
✅ `get_admin_summary()` - Get complete financial summary  
✅ `get_all_transactions()` - View all transactions  
✅ `get_all_categories()` - View categories  
✅ `add_transaction()` - Add new transaction  
✅ `update_transaction()` - Update transaction  
✅ `delete_transaction()` - Delete transaction  
✅ Plus user registration & management  

---

## Setup (2 Options)

### Option 1: Web Version (claude.ai/code) ⭐ RECOMMENDED

**Step 1: Ensure services are running**
```bash
cd personal-finance
docker-compose up mariadb backend login-service mcp-server
```

**Step 2: Configure in Claude**
1. Go to https://claude.ai/code
2. Click **Settings** → **Integrations** (or **Tools**)
3. Click **+ Add MCP Server**
4. Select **HTTP**
5. Fill in:
   - **URL:** `http://localhost:8000`
   - **Name:** Personal Finance
6. Click **Connect**

✅ Done! Your MCP server is now integrated with Claude.

---

### Option 2: Desktop Version

**Step 1: Create configuration file**

**Windows:** Open `%APPDATA%\Claude\claude_desktop_config.json`  
**Mac/Linux:** Open `~/.config/Claude/claude_desktop_config.json`

**Step 2: Add this configuration**

```json
{
  "mcpServers": {
    "personal-finance": {
      "command": "python",
      "args": [
        "-m",
        "uvicorn",
        "app.main:app",
        "--host",
        "0.0.0.0",
        "--port",
        "8000"
      ],
      "cwd": "C:\\path\\to\\personal-finance\\services\\mcp-server",
      "env": {
        "PYTHONUNBUFFERED": "1"
      }
    }
  }
}
```

Replace `C:\path\to` with your actual path.

**Step 3:** Restart Claude Desktop

✅ Claude will now auto-start the MCP server when needed.

---

## Using Your Connector (Like Gmail!)

### Example 1: Authenticate & Get Summary

**In Claude Chat:**
```
I want to see my financial summary as an admin.
```

**Claude will:**
1. Call `authenticate_admin()` with admin credentials
2. Call `get_admin_summary()`
3. Display your complete financial overview

**Output:**
```
📊 ADMIN FINANCIAL SUMMARY
================================

📈 Transaction Overview:
   • Total Transactions: 15
   • Average Transaction: $45.33

💰 Financial Summary:
   • Total Income: $5,000.00
   • Total Expenses: $2,340.50
   • Net Balance: $2,659.50

📑 Spending by Category:
   • FOOD: $450.25
   • TRAVEL: $350.00
   • SHOPPING: $289.75
   • RENT: $850.50
```

---

### Example 2: Natural Language Finance Management

**You ask Claude:**
```
Show me all my transactions this month
```

Claude will automatically call `get_all_transactions()` and display them.

**You ask:**
```
Add a $75 grocery purchase in the FOOD category for today
```

Claude will call `add_transaction()` with the right parameters.

**You ask:**
```
Update transaction 5 to $100
```

Claude will call `update_transaction()` with the new amount.

---

## Available Commands in Claude

Once connected, you can ask Claude:

### View Finances
- "Show me my financial summary"
- "What are my transactions?"
- "List all categories"
- "How much did I spend on food?"

### Add/Update Transactions
- "Add $50 coffee purchase in FOOD"
- "I spent $30 on gas"
- "Update transaction 5 to $100"
- "Delete transaction 3"

### Authentication
- "Log me in as admin"
- "Show me the admin summary"
- "Authenticate with admin account"

---

## How It Works (Behind the Scenes)

```
You: "Show my financial summary"
  ↓
Claude: Recognizes finance request
  ↓
Claude: Calls authenticate_admin() with your stored credentials
  ↓
MCP Server: Authenticates with backend
  ↓
Claude: Calls get_admin_summary()
  ↓
MCP Server: Fetches data from backend API
  ↓
Claude: Formats and displays summary
  ↓
You: See beautiful financial report
```

---

## Step-by-Step Example: Full Conversation

```
You: "Hi Claude, I want to manage my finances. Can you show me everything?"

Claude: "I'll help you with your Personal Finance Manager!
         Let me authenticate as admin and get your summary..."
         [Calls authenticate_admin()]
         "✅ Authenticated as admin. Now fetching your summary..."
         [Calls get_admin_summary()]

📊 ADMIN FINANCIAL SUMMARY
================================
📈 Transaction Overview:
   • Total Transactions: 12
   • Average Transaction: $52.50
💰 Financial Summary:
   • Total Income: $4,000.00
   • Total Expenses: $1,200.00
   • Net Balance: $2,800.00
📑 Spending by Category:
   • FOOD: $350.00
   • TRAVEL: $200.00
   • ...

You: "Add a new $45 coffee expense in FOOD category"

Claude: "I'll add that for you..."
         [Calls add_transaction(date, "coffee", 45, "FOOD")]
         "✅ Done! Added $45 coffee transaction in FOOD category."

You: "Show me my transactions again"

Claude: [Calls get_all_transactions()]
         | ID | Date | Description | Amount | Category |
         |----|------|---|---|---|
         | 12 | 2026-04-19 | coffee | $45 | FOOD |
         | 11 | 2026-04-19 | lunch | $15 | FOOD |
         ...
```

---

## Troubleshooting

### "MCP server not found"
- Ensure services are running: `docker-compose ps`
- Check backend is healthy: `curl http://localhost:8080/health`
- Restart Claude (web or desktop)

### "Authentication failed"
- Verify admin credentials are correct: `admin` / `admin123`
- Check backend is responding: `curl http://localhost:8080/api/auth/authenticate`

### "Backend connection error"
- Verify backend is running: `curl http://localhost:8080/health`
- Check MCP server logs: `docker-compose logs mcp-server`
- Ensure services are on same network: `docker-compose ps`

### Tools not appearing in Claude
- **Web version:** Refresh the page, check Settings → Integrations
- **Desktop version:** Restart Claude Desktop completely
- Check MCP server is running: `docker-compose logs mcp-server | grep "Starting"`

---

## Security Notes

✅ **Secured:**
- JWT tokens used for all API calls
- Admin account requires credentials
- Tokens expire after 30 minutes

⚠️ **Development Only:**
- Test credentials are hardcoded (admin/admin123)
- No HTTPS enforcement (local development)
- Data is in-memory or Docker volumes

---

## Advanced: Custom Connector Installation

To publish your connector to Claude registry:

1. **Document your tools** ✓ (already done)
2. **Add metadata** to MCP server
3. **Submit to Claude registry** (when ready)
4. **Users install** from Claude's connector library

For now, local installation (Options 1 & 2 above) works perfectly for development.

---

## Tips for Best Results

1. **Be specific** in requests:
   - ✅ "Add $50 grocery purchase in FOOD category"
   - ❌ "Add expense"

2. **Use natural language:**
   - Claude understands dates: "today", "yesterday", "last Monday"
   - Claude understands amounts: "$50", "fifty dollars", "50 bucks"

3. **Ask follow-ups:**
   - "Show my transactions" → "Update the highest one" → "Show summary"

4. **Get summaries:**
   - "What's my financial status?" → Complete overview
   - "How much did I spend?" → Total expenses
   - "What categories do I have?" → List all categories

---

## Next Steps

1. ✅ MCP server is updated with admin tools
2. ✅ Services are running
3. **→ Configure in Claude** (Option 1 or 2 above)
4. **→ Chat naturally** with your finances
5. **→ Enjoy!**

---

## File Structure

```
personal-finance/
├── CLAUDE_CONNECTOR_SETUP.md    ← You are here
├── MCP_QUICK_START.md
├── MCP_SETUP_GUIDE.md
├── docker-compose.yml
├── services/
│   ├── mcp-server/
│   │   ├── app/main.py          ← Updated with admin tools
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   ├── backend/                 ← Spring Boot API
│   ├── login/                   ← Auth Service
│   └── frontend/                ← Angular UI
```

---

## Questions?

- **Setup help:** See [MCP_QUICK_START.md](./MCP_QUICK_START.md)
- **Detailed guide:** See [MCP_SETUP_GUIDE.md](./services/mcp-server/MCP_SETUP_GUIDE.md)
- **Troubleshooting:** See [MCP_DEPLOYMENT_STATUS.md](./MCP_DEPLOYMENT_STATUS.md)

---

## Summary

Your Personal Finance Manager is now a **Claude Connector**! 🎉

**To start using it:**
1. Configure in Claude (Option 1 or 2)
2. Ask Claude to show your financial summary
3. Manage your finances naturally through chat

Enjoy managing your finances with Claude! 💰
