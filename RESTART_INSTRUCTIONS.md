# Backend Restart Instructions - Category Fix

## What Changed?
The database now has:
1. ✅ Cleanup queries to remove corrupted categories with NULL names
2. ✅ Validation to prevent future NULL category names
3. ✅ Proper database constraints (nullable = false)

## How to Apply the Fix

### Step 1: Stop Backend
- If running, stop the backend service (Ctrl+C in the terminal)

### Step 2: Restart Backend
```bash
cd /c/Veera/AI/agents/SimpleAgent/personal-finance/services/backend
./mvnw clean package -DskipTests
./mvnw spring-boot:run
```

**Important:** The cleanup queries run on startup (through data.sql)

### Step 3: Verify the Fix

1. **In Browser:** Refresh http://localhost:4200
2. **Check Page 2 of Transactions:**
   - "Break fast" transactions should NOW show proper category names
   - Instead of empty blue badges, they should display category text

### What You Should See After Fix:
✅ Page 1: SALARY, RENT, FOOD, SHOPPING, TRAVEL all display names
✅ Page 2: Break fast transactions now show category names (not empty badges)

## If Categories Still Missing:

The cleanup removes NULL-named categories. If transactions still have no category:
1. Delete those transactions
2. Re-add them with a proper category selection

## Database Changes Made:
- Removed any categories with NULL or empty names
- Removed category references from affected transactions
- Added NOT NULL constraint to prevent recurrence
