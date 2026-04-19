#!/bin/bash

echo "=== CATEGORY POPULATION DIAGNOSTICS ==="
echo ""

BASE_URL="http://localhost:8080/api"
LOGIN_URL="http://localhost:8001"

echo "Step 1: Get authentication token..."
# First get a token from login service
TOKEN=$(curl -s -X POST "$LOGIN_URL/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Could not get token from login service"
  echo "Trying direct API call without token..."
  TOKEN=""
fi

echo "✅ Got token (or will use session)"
echo ""

echo "Step 2: Fetch all categories..."
CATEGORIES=$(curl -s "$BASE_URL/categories")
echo "Categories available:"
echo "$CATEGORIES" | head -20
echo ""

echo "Step 3: Create a test transaction with FOOD category..."
TRANSACTION_PAYLOAD=$(cat <<'PAYLOAD'
{
  "date": "2024-04-19",
  "description": "Test Transaction with Category",
  "amount": 100.00,
  "type": "EXPENSE",
  "category": {
    "id": 2,
    "name": "FOOD"
  }
}
PAYLOAD
)

echo "Payload being sent:"
echo "$TRANSACTION_PAYLOAD"
echo ""

RESPONSE=$(curl -s -X POST "$BASE_URL/transactions" \
  -H "Content-Type: application/json" \
  -d "$TRANSACTION_PAYLOAD")

echo "Response from backend:"
echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
echo ""

TRANSACTION_ID=$(echo "$RESPONSE" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
echo "Created transaction ID: $TRANSACTION_ID"
echo ""

echo "Step 4: Fetch the transaction to verify category..."
if [ ! -z "$TRANSACTION_ID" ]; then
  echo "Fetching transaction $TRANSACTION_ID..."
  FETCHED=$(curl -s "$BASE_URL/transactions/$TRANSACTION_ID")
  echo "Transaction returned:"
  echo "$FETCHED" | python3 -m json.tool 2>/dev/null || echo "$FETCHED"
  
  echo ""
  echo "=== ANALYSIS ==="
  if echo "$FETCHED" | grep -q '"name":"FOOD"'; then
    echo "✅ CATEGORY IS PRESENT in response!"
  else
    echo "❌ CATEGORY IS MISSING from response!"
  fi
  
  if echo "$FETCHED" | grep -q '"category_id"'; then
    echo "⚠️  Response contains category_id field"
  fi
  
else
  echo "❌ Could not create transaction"
fi

echo ""
echo "Step 5: Fetch all transactions..."
curl -s "$BASE_URL/transactions" | python3 -m json.tool 2>/dev/null | head -50
