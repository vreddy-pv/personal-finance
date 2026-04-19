#!/bin/bash
# Start Personal Finance MCP Server for Claude Integration

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SERVICE_DIR="$SCRIPT_DIR"

echo "🚀 Starting Personal Finance MCP Server..."
echo "Service directory: $SERVICE_DIR"

# Check if we're in the right directory
if [ ! -f "$SERVICE_DIR/requirements.txt" ]; then
    echo "❌ Error: requirements.txt not found in $SERVICE_DIR"
    echo "Make sure you're running this script from the correct location."
    exit 1
fi

# Install dependencies if not already installed
echo "📦 Checking dependencies..."
if ! python3 -c "import fastmcp" 2>/dev/null; then
    echo "Installing dependencies..."
    pip install -r "$SERVICE_DIR/requirements.txt"
else
    echo "✅ Dependencies already installed"
fi

# Display configuration
echo ""
echo "📋 Configuration:"
echo "  Backend API: http://localhost:8080"
echo "  MCP Server: http://localhost:8000"
echo ""

# Start the server
echo "Starting server on port 8000..."
echo "Press Ctrl+C to stop"
echo ""

cd "$SERVICE_DIR"
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
