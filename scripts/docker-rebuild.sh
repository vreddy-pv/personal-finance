#!/bin/bash
set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Clean Rebuild Personal Finance Docker Images             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Stopping running containers..."
docker-compose down

echo ""
echo "Building images with no cache..."
docker-compose build --no-cache

echo ""
echo "Starting services with fresh containers..."
docker-compose up --force-recreate

