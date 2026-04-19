# MCP Server Setup Guide - Configure Personal Finance with Claude

This guide explains how to configure the Personal Finance MCP Server with Claude.

## Overview

The MCP (Model Context Protocol) server exposes your Personal Finance Manager API as tools that Claude can use. This enables Claude to:
- Query transactions and categories
- Add, update, and delete transactions
- Manage categories
- View financial summaries
- All with natural language commands

## Prerequisites

1. **Python 3.8+** installed
2. **Personal Finance Backend** running on `http://localhost:8080`
3. **Claude** (Web or Desktop version)
4. Environment variables configured (see `.env.example`)

## Quick Start (Recommended)

### Option 1: Start with Docker Compose (Easiest)

```bash
cd personal-finance

# Start all services including MCP server
docker-compose up mcp-server

# Verify it's running
curl http://localhost:8000
```

The MCP server will be available at `http://localhost:8000` and automatically configured to connect to your backend.

### Option 2: Start Locally (Development)

```bash
cd services/mcp-server

# Install dependencies
pip install -r requirements.txt

# Start the MCP server
uvicorn app.main:app --reload --port 8000

# Verify it's running
curl http://localhost:8000
```

## Configuring Claude with the MCP Server

### Web Version (claude.ai/code)

The web version of Claude can be configured through the MCP registry. The Personal Finance MCP server is available through:

1. Open Claude Code or any Claude session
2. Go to **Settings** → **MCP Servers**
3. Click **Add MCP Server**
4. Choose one of these options:

#### Option A: Local HTTP Server
- **Name:** Personal Finance Manager
- **Type:** HTTP
- **URL:** `http://localhost:8000`
- **Description:** MCP server for managing personal finances

#### Option B: Via Registry (If Published)
- Search for "Personal Finance Manager" in the MCP registry
- Install from the registry

### Desktop Version

For Claude Desktop, edit the configuration file at:

**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Add this MCP server configuration:

```json
{
  "mcpServers": {
    "personal-finance": {
      "command": "python",
      "args": ["-m", "uvicorn", "app.main:app", "--port", "8000"],
      "cwd": "path/to/personal-finance/services/mcp-server",
      "env": {
        "PYTHONPATH": "path/to/personal-finance/services/mcp-server",
        "ANTHROPIC_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

**macOS/Linux:** `~/.config/Claude/claude_desktop_config.json`

## Available Tools

Once configured, you can use these tools with Claude:

### Authentication
- **`login()`** - Get login URL for authentication
- **`set_token(token: str)`** - Set JWT authentication token after login
- **`logout()`** - Clear authentication token
- **`register(username, email, password, role="USER")`** - Register new user

### Transactions
- **`get_all_transactions()`** - View all transactions as a table
- **`add_transaction(date, description, amount, category_name)`** - Add new transaction
- **`update_transaction(transaction_id, date, description, amount, category_name)`** - Update transaction
- **`delete_transaction(transaction_id)`** - Delete transaction

### Categories
- **`get_all_categories()`** - View all categories as a table

### Users
- **`delete_user(username)`** - Delete user account

## Usage Examples

### Example 1: List All Transactions

**In Claude:**
```
Can you show me all my transactions?
```

**Claude will:**
1. Call `get_all_transactions()` tool
2. Display formatted table of transactions
3. Include date, description, amount, and category

### Example 2: Add a Transaction

**In Claude:**
```
Add a transaction: I spent $50 on groceries today in the FOOD category.
```

**Claude will:**
1. Parse the date, description, amount, and category
2. Call `add_transaction()` with these values
3. Confirm the transaction was added

### Example 3: Update a Transaction

**In Claude:**
```
Update transaction 5: change the amount to $75 and category to SHOPPING.
```

**Claude will:**
1. Call `update_transaction()` with the new values
2. Confirm the update

### Example 4: First Time Setup

**In Claude:**
```
Help me set up my personal finance manager. I need to log in first.
```

**Claude will:**
1. Call `login()` to get the login URL
2. Provide you with the URL and instructions
3. Once you provide the token, call `set_token()` to authenticate
4. Confirm you're ready to manage transactions

## Authentication Flow

### Initial Setup (First Time)

1. **Start Services:**
   ```bash
   docker-compose up backend login-service mcp-server
   ```

2. **Ask Claude to Log In:**
   - In Claude, ask: "Help me log in"
   - Claude calls the `login()` tool
   - You get a login URL: `http://localhost:8001/login-form?callback=...`

3. **Log In:**
   - Visit the URL in your browser
   - Enter credentials (test user: `testpfuser1` / `test123`)
   - Get JWT token from the token display page

4. **Provide Token to Claude:**
   - In Claude, ask: "Set my authentication token to [your-token]"
   - Claude calls `set_token()` tool
   - You're now authenticated for 30 minutes

5. **Start Using Tools:**
   - Ask Claude to "show me all transactions"
   - All subsequent API calls include your JWT token

### Token Expiration

If your token expires:
1. Ask Claude: "My token expired, help me log in again"
2. Follow the login flow again

## Troubleshooting

### MCP Server Not Responding

```bash
# Check if server is running
curl http://localhost:8000

# If not running, start it
cd services/mcp-server && uvicorn app.main:app --reload --port 8000

# Check logs
docker-compose logs mcp-server
```

### "Not authenticated" Error

The token has likely expired or wasn't set. Ask Claude to help you log in again:
```
Help me authenticate again. I'm getting "not authenticated" errors.
```

### Backend Not Responding

```bash
# Ensure backend is running
curl http://localhost:8080/health

# If not, start it
docker-compose up backend
```

### "Category not found" Error

This happens when creating a transaction with a category that doesn't exist. The MCP server automatically creates categories, so this shouldn't occur. If it does:

1. Ask Claude to list categories: "What categories exist?"
2. Use an existing category or provide a valid category name

## Advanced Configuration

### Custom Base URL

If your backend isn't at `localhost:8080`, edit the MCP server configuration:

**File:** `services/mcp-server/app/main.py`

```python
# Change this line
BASE_URL = "http://localhost:8080"

# To your backend URL
BASE_URL = "http://your-server:8080"
```

Then restart the MCP server.

### Environment Variables

Set these environment variables before starting:

```bash
# Backend API location
export BACKEND_API_URL=http://localhost:8080

# Other optional variables
export PYTHONPATH=/path/to/mcp-server
```

### Docker Production Deployment

```bash
# Build production image
docker build -f services/mcp-server/Dockerfile -t personal-finance-mcp:latest .

# Run with custom backend URL
docker run -e BACKEND_API_URL=http://your-backend:8080 \
           -p 8000:8000 \
           personal-finance-mcp:latest
```

## Security Notes

### JWT Token Security
- Tokens expire after 30 minutes
- Never share your token with untrusted sources
- Use HTTPS in production for token transmission
- Regenerate tokens regularly

### API Security
- All transactions are user-specific (isolated by JWT token)
- Can't access other users' data
- Backend validates all requests

### Best Practices
1. Keep `ANTHROPIC_API_KEY` secure (not in git)
2. Use strong passwords for accounts
3. Regenerate JWT tokens after 30 minutes
4. Don't share authentication URLs or tokens in logs

## Testing the MCP Server

### Manual Test with curl

```bash
# Get all transactions (requires authentication)
curl -X GET http://localhost:8000 \
  -H "Content-Type: application/json"

# Check if server is responding
curl http://localhost:8000/health 2>/dev/null || echo "Server not responding"
```

### Test with Claude

1. Open Claude
2. Configure the MCP server (see "Configuring Claude" section above)
3. Ask Claude: "Are you connected to my personal finance system?"
4. Claude should report available tools

### Test a Complete Flow

1. Start the MCP server
2. Ask Claude: "Help me log in to my personal finance system"
3. Follow login instructions
4. Ask Claude: "Add a test transaction for $10 on groceries in the FOOD category"
5. Ask Claude: "Show me all my transactions"
6. Verify the transaction appears

## Next Steps

1. **Start the MCP Server:** Choose Docker or local startup
2. **Configure in Claude:** Add MCP server to Claude settings
3. **Authenticate:** Log in with your credentials
4. **Start Using:** Ask Claude to manage your finances!

## Support

If you encounter issues:

1. Check logs: `docker-compose logs mcp-server`
2. Verify backend is running: `curl http://localhost:8080/health`
3. Test MCP server: `curl http://localhost:8000`
4. Check that Python and dependencies are installed: `pip list | grep -E "fastmcp|httpx"`

For detailed debugging:

```bash
# Run with verbose output
LOGLEVEL=DEBUG uvicorn app.main:app --reload --port 8000
```

## Files Reference

| File | Purpose |
|------|---------|
| `app/main.py` | MCP server definition and tools |
| `requirements.txt` | Python dependencies |
| `Dockerfile` | Docker image configuration |
| `.dockerignore` | Files to exclude from Docker build |
| `scripts/install-mcp.sh` | Installation script |
| `scripts/start-mcp.sh` | Startup script |

## Additional Resources

- [MCP Protocol Documentation](https://modelcontextprotocol.io/)
- [FastMCP Framework](https://github.com/jlooney/fastmcp)
- Personal Finance Backend API: `http://localhost:8080`
- Login Service: `http://localhost:8001`
