#!/bin/bash
set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Stopping Personal Finance Services (Docker)              ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Stopping all Docker containers..."
docker-compose down

echo ""
echo "✓ All services stopped"
echo ""
echo "To remove volumes (data will be lost):"
echo "  docker-compose down -v"
echo ""
