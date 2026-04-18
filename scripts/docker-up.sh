#!/bin/bash
set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Starting Personal Finance Services (Docker)              ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Starting all Docker containers..."
echo ""

docker-compose up

