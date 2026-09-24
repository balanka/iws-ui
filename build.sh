#!/bin/bash
set -euo pipefail

# ---- Parse arguments ----
VERSION=${1:-4.0.3}
PLATFORM=${2:-arm64}

# ---- Validate platform ----
case "$PLATFORM" in
  amd64|arm64) ;;
  *) echo "❌ Invalid platform: $PLATFORM (expected amd64 or arm64)"; exit 1 ;;
esac

echo "=============================================="
echo "  Building bateka/iws-ui:${VERSION}-${PLATFORM}"
echo "  Platform : linux/${PLATFORM}"
echo "=============================================="

# ---- Enable BuildKit ----
export DOCKER_BUILDKIT=1

# ---- Type-check + local build (fast fail) ----
echo "▶ Running tsc..."
#tsc --noEmit
./node_modules/.bin/tsc --noEmit

echo "▶ Running vite build..."
npx vite build

# ---- Build Docker image ----
echo "▶ Building Docker image..."
docker buildx build \
  --platform "linux/${PLATFORM}" \
  -f Dockerfile.prod \
  -t "bateka/iws-ui:${VERSION}-${PLATFORM}" \
  --load \
  .

echo "✅ Image built: bateka/iws-ui:${VERSION}-${PLATFORM}"
docker images | grep "bateka/iws-ui"

# Build multi-arch and push to registry
#docker buildx build \
#  --platform linux/amd64,linux/arm64 \
#  -f Dockerfile.prod \
#  -t bateka/iws-ui:4.0.2 \
#  --push \
#  .


