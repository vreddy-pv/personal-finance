#!/bin/bash
set -e

# Personal Finance Application - Setup Script
# This script installs all dependencies for all 4 services

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Personal Finance Application - Setup                      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$( cd "$SCRIPT_DIR/.." && pwd )"

echo "📁 Project Directory: $PROJECT_DIR"
echo ""

# Check prerequisites
echo "🔍 Checking prerequisites..."
echo ""

# Check Java
if ! command -v java &> /dev/null; then
    echo -e "${RED}✗ Java not found. Please install Java 17 or later.${NC}"
    exit 1
fi
JAVA_VERSION=$(java -version 2>&1 | grep version | awk '{print $3}' | tr -d '"')
echo -e "${GREEN}✓ Java ${JAVA_VERSION}${NC}"

# Check Maven
if ! command -v mvn &> /dev/null; then
    echo -e "${RED}✗ Maven not found. Please install Maven 3.6+${NC}"
    exit 1
fi
MVN_VERSION=$(mvn -version | head -1 | awk '{print $3}')
echo -e "${GREEN}✓ Maven ${MVN_VERSION}${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js not found. Please install Node.js 16+${NC}"
    exit 1
fi
NODE_VERSION=$(node -v)
echo -e "${GREEN}✓ Node.js ${NODE_VERSION}${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm not found. Please install npm 8+${NC}"
    exit 1
fi
NPM_VERSION=$(npm -v)
echo -e "${GREEN}✓ npm ${NPM_VERSION}${NC}"

# Check Python
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}✗ Python 3 not found. Please install Python 3.8+${NC}"
    exit 1
fi
PYTHON_VERSION=$(python3 --version | awk '{print $2}')
echo -e "${GREEN}✓ Python ${PYTHON_VERSION}${NC}"

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Installing Dependencies                                   ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Setup Spring Boot Backend
echo "1️⃣  Setting up Spring Boot Backend..."
cd "$PROJECT_DIR/services/backend"
./mvnw clean install -DskipTests -q
echo -e "${GREEN}✓ Backend setup complete${NC}"
echo ""

# Setup Angular Frontend
echo "2️⃣  Setting up Angular Frontend..."
cd "$PROJECT_DIR/services/frontend"
npm install --silent
echo -e "${GREEN}✓ Frontend setup complete${NC}"
echo ""

# Setup Login Service
echo "3️⃣  Setting up Login Service..."
cd "$PROJECT_DIR/services/login"
pip install -q -r requirements.txt
echo -e "${GREEN}✓ Login Service setup complete${NC}"
echo ""

# Setup MCP Server
echo "4️⃣  Setting up MCP Server..."
cd "$PROJECT_DIR/services/mcp-server"
pip install -q -r requirements.txt
echo -e "${GREEN}✓ MCP Server setup complete${NC}"
echo ""

# Create .env file
echo "5️⃣  Creating environment configuration..."
if [ ! -f "$PROJECT_DIR/.env" ]; then
    cp "$PROJECT_DIR/.env.example" "$PROJECT_DIR/.env"
    echo -e "${YELLOW}⚠  .env created from .env.example${NC}"
    echo -e "${YELLOW}   Please edit .env and set ANTHROPIC_API_KEY${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi
echo ""

# Completion message
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Setup Complete! ✓                                         ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

echo "📝 Next steps:"
echo ""
echo "1. Configure environment:"
echo "   Edit .env and set ANTHROPIC_API_KEY"
echo ""
echo "2. Start services:"
echo "   /start-backend"
echo ""
echo "3. Run tests:"
echo "   /test-all"
echo ""
echo "4. Access application:"
echo "   Frontend: http://localhost:4200"
echo "   Backend:  http://localhost:8080"
echo "   H2 Console: http://localhost:8080/h2-console"
echo ""
