#!/bin/bash
set -e

cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

SERVICE=${1:-.}

if [ "$SERVICE" = "." ]; then
    echo "Viewing logs for all services (Ctrl+C to stop)..."
    echo ""
else
    echo "Viewing logs for $SERVICE service (Ctrl+C to stop)..."
    echo ""
fi

docker-compose logs -f $SERVICE
