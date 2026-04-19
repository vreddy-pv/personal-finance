#!/bin/bash

echo "=== Starting Category Population Test ==="
echo ""

# Check if services are running
echo "Checking services..."
echo ""

# Try to connect to backend
echo "1. Testing Backend API..."
curl -s http://localhost:8080/health 2>&1 | head -5 && echo "✅ Backend is running" || echo "❌ Backend not running - Starting it..."

echo ""
echo "2. Testing Frontend..."
curl -s http://localhost:4200 2>&1 | head -1 && echo "✅ Frontend is running" || echo "❌ Frontend not running - Starting it..."

echo ""
echo "=== To run the test ==="
echo ""
echo "Terminal 1 - Start Backend:"
echo "cd services/backend && ./mvnw spring-boot:run"
echo ""
echo "Terminal 2 - Start Frontend:"
echo "cd services/frontend && ng serve"
echo ""
echo "Terminal 3 - Run this script again"
echo ""
