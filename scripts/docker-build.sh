#!/bin/bash
set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Building Personal Finance Docker Images                  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Building all Docker images..."
echo ""

docker-compose build

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Docker Build Complete ✓                                   ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Next steps:"
echo "  ./scripts/docker-up.sh           # Start all services"
echo "  docker-compose logs -f           # View logs"
echo "  ./scripts/docker-down.sh         # Stop all services"
echo ""
