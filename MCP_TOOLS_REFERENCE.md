# MCP Tools Reference - Quick Guide

All tools available in Claude chat through your Personal Finance connector.

## 🔐 Authentication Tools

### `authenticate_admin(username, password)`
**Purpose:** Login as admin with automatic token setup  
**Usage:**
```
"Authenticate as admin with username admin and password admin123"
```
**Returns:** Confirmation message with role

---

### `set_token(token)`
**Purpose:** Manually set JWT token  
**Usage:**
```
"Set my token to [long-jwt-token]"
```
**Returns:** Token set confirmation

---

### `logout()`
**Purpose:** Clear authentication session  
**Usage:**
```
"Log me out"
```
**Returns:** Logout confirmation

---

## 📊 Summary & Analytics

### `get_admin_summary()`
**Purpose:** Get complete financial overview (admin only)  
**Usage:**
```
"Show me the admin financial summary"
"Give me a complete overview of all finances"
"Show financial report"
```
**Returns:** Formatted financial summary including:
- Total transactions
- Average transaction amount
- Total income/expenses
- Net balance
- Category breakdown

**Example Output:**
```
📊 ADMIN FINANCIAL SUMMARY
📈 Transaction Overview:
   • Total Transactions: 15
   • Average Transaction: $52.00
💰 Financial Summary:
   • Total Income: $5,000.00
   • Total Expenses: $2,340.50
   • Net Balance: $2,659.50
📑 Spending by Category:
   • FOOD: $450.25
   • TRAVEL: $350.00
```

---

## 📋 Transaction Tools

### `get_all_transactions()`
**Purpose:** View all transactions  
**Usage:**
```
"Show me all my transactions"
"List all my expenses"
"What transactions do I have?"
```
**Returns:** Table of all transactions with ID, Date, Description, Amount, Category

---

### `add_transaction(date, description, amount, category_name)`
**Purpose:** Create new transaction  
**Usage:**
```
"Add $50 grocery purchase in FOOD category"
"I spent $30 on gas for TRAVEL"
"New transaction: $100 rent payment in RENT category"
```
**Parameters:**
- `date`: "2026-04-19" or "today"
- `description`: What was purchased
- `amount`: Numeric value
- `category_name`: Category (creates if doesn't exist)

**Returns:** Confirmation message

---

### `update_transaction(transaction_id, date, description, amount, category_name)`
**Purpose:** Modify existing transaction  
**Usage:**
```
"Update transaction 5 to $75"
"Change transaction 3 to SHOPPING category"
"Fix transaction 2 - amount should be $120"
```
**Returns:** Confirmation message

---

### `delete_transaction(transaction_id)`
**Purpose:** Remove transaction  
**Usage:**
```
"Delete transaction 5"
"Remove the last transaction"
"Delete transaction from ID 3"
```
**Returns:** Confirmation message

---

## 🏷️ Category Tools

### `get_all_categories()`
**Purpose:** View all available categories  
**Usage:**
```
"What categories do I have?"
"Show all categories"
"List my expense categories"
```
**Returns:** Table of category IDs and names

---

## 👤 User Tools

### `register(username, email, password, role)`
**Purpose:** Create new user account  
**Usage:**
```
"Create a new account: username user123, email user@example.com, password pass123"
```
**Parameters:**
- `username`: Unique username
- `email`: User email
- `password`: Account password
- `role`: "USER" or "ADMIN" (default: "USER")

**Returns:** Registration confirmation and auto-login token

---

### `delete_user(username)`
**Purpose:** Remove user account (admin only)  
**Usage:**
```
"Delete user account testuser"
```
**Returns:** Deletion confirmation

---

### `login()`
**Purpose:** Get login URL (for manual authentication)  
**Usage:**
```
"Help me log in manually"
```
**Returns:** Login URL to visit in browser

---

## 📝 Common Chat Patterns

### Getting Started
```
"Hi Claude, help me get started with my Personal Finance Manager"

Claude will:
1. Offer to authenticate
2. Ask for credentials or generate summary
3. Show you what's available
```

### Financial Review
```
"Give me a complete financial overview"

Claude will:
1. Call authenticate_admin()
2. Call get_admin_summary()
3. Format and explain the results
```

### Transaction Management
```
"I spent $45 on coffee today. Add it to FOOD category"

Claude will:
1. Call add_transaction() with today's date
2. Confirm the addition
3. Offer to show updated summary
```

### Quick Queries
```
"Show my transactions" → get_all_transactions()
"What categories exist?" → get_all_categories()
"Delete transaction 5" → delete_transaction(5)
"Update transaction 3 to $50" → update_transaction(3, ...)
```

---

## 🎯 Tool Selection Logic

Claude automatically chooses the right tool based on your request:

| You Say | Claude Uses |
|---------|------------|
| "Show everything" | authenticate_admin() + get_admin_summary() |
| "Add expense" | add_transaction() |
| "Show transactions" | get_all_transactions() |
| "What categories?" | get_all_categories() |
| "Log me in" | authenticate_admin() or login() |
| "Log me out" | logout() |

---

## ✅ Success Indicators

**You'll know it's working when:**
- ✅ Claude shows formatted tables with data
- ✅ Claude acknowledges your requests with confirmations
- ✅ Claude asks clarifying questions about dates/amounts
- ✅ Summary shows real financial data
- ✅ New transactions appear in lists

**Examples of success:**
```
✅ "Done! Added $50 coffee transaction in FOOD category"
✅ "| ID | Date | Description | Amount | Category |"
✅ "📊 ADMIN FINANCIAL SUMMARY"
✅ "✅ Authenticated as admin"
```

---

## ⚠️ Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "You must be logged in" | Use authenticate_admin() first |
| "Category not found" | Tool auto-creates categories on add |
| "Invalid date" | Use format "2026-04-19" or "today" |
| "Transaction not found" | Check ID with get_all_transactions() |
| "Permission denied" | Ensure authenticated as ADMIN |

---

## 📊 Example Conversation

```
You: "I want to see my financial summary"

Claude: "I'll get your financial summary. Let me authenticate first..."
        [Calls authenticate_admin("admin", "admin123")]
        ✅ Authenticated as admin (ADMIN)
        
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
   • SHOPPING: $150.00

---

You: "I just spent $45 on groceries"

Claude: [Calls add_transaction("2026-04-19", "groceries", 45, "FOOD")]
        ✅ Done! Added $45 groceries transaction in FOOD category.

---

You: "Show my transactions"

Claude: [Calls get_all_transactions()]
        
| ID | Date | Description | Amount | Category |
|----|------|---|---|---|
| 1 | 2026-04-19 | groceries | 45 | FOOD |
| 2 | 2026-04-18 | dinner | 35 | FOOD |
| 3 | 2026-04-17 | gas | 50 | TRAVEL |

---

You: "That $45 groceries transaction should be $50"

Claude: [Calls update_transaction(1, "2026-04-19", "groceries", 50, "FOOD")]
        ✅ Updated! Transaction 1 is now $50.

---

You: "Show summary again"

Claude: [Calls get_admin_summary()]
        
📊 ADMIN FINANCIAL SUMMARY
💰 Financial Summary:
   • Total Income: $4,000.00
   • Total Expenses: $1,215.00  ← Updated from $1,200
   • Net Balance: $2,785.00     ← Updated from $2,800
```

---

## 🔧 Tool Parameters Reference

### Date Formats
- "2026-04-19" ✅
- "today" ✅
- "yesterday" ✅
- "next Monday" ✅

### Amount Formats
- 50 ✅
- 50.00 ✅
- "$50" ✅
- "fifty dollars" ✅

### Category Names
- FOOD ✅
- Food ✅
- food ✅
- (Auto-created if doesn't exist) ✅

---

## 📚 Related Documentation

- **Setup Guide:** [CLAUDE_CONNECTOR_SETUP.md](./CLAUDE_CONNECTOR_SETUP.md)
- **Quick Start:** [MCP_QUICK_START.md](./MCP_QUICK_START.md)
- **Full Guide:** [services/mcp-server/MCP_SETUP_GUIDE.md](./services/mcp-server/MCP_SETUP_GUIDE.md)
- **Deployment:** [MCP_DEPLOYMENT_STATUS.md](./MCP_DEPLOYMENT_STATUS.md)

---

## Summary

You now have **9 tools** available in Claude for complete finance management:

✅ Authenticate (admin login)  
✅ Get Admin Summary (overview)  
✅ Get Transactions (list all)  
✅ Add Transaction (new expense/income)  
✅ Update Transaction (modify)  
✅ Delete Transaction (remove)  
✅ Get Categories (view categories)  
✅ Register User (create account)  
✅ Delete User (remove account)  

**Start using:** Just ask Claude anything about your finances! 💰
