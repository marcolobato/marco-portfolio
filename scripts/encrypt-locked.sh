#!/usr/bin/env bash
# Encrypts archive articles that are password-protected.
# Called automatically by `npm run build` after `astro build`.
#
# Local dev: reads password from .env.local (gitignored).
# Cloudflare Pages: reads password from the dashboard env var STATICRYPT_PASSWORD.

set -e

# Load .env.local if it exists (local development only).
# Cloudflare provides STATICRYPT_PASSWORD via its own environment.
if [ -f .env.local ]; then
  set -a
  source .env.local
  set +a
fi

if [ -z "$STATICRYPT_PASSWORD" ]; then
  echo "❌ STATICRYPT_PASSWORD is not set."
  echo "   Local:      create .env.local with STATICRYPT_PASSWORD=yourpassword"
  echo "   Cloudflare: set it in Pages > Settings > Environment Variables"
  exit 1
fi

# Slugs of articles to password-protect. Add new ones here when locking
# additional projects. Must match the folder name under dist/work/.
LOCKED_SLUGS=(
  "ds-a11y-program"
  "mobile-device-integration"
  "future-of-mobility"
  "digital-auto-services"
  "mobility-agent"
  "vw-meets-alexa"
)

for slug in "${LOCKED_SLUGS[@]}"; do
  echo "🔒 Encrypting $slug"
  npx staticrypt "dist/work/$slug/index.html" \
    -p "$STATICRYPT_PASSWORD" \
    --short \
    --remember 30 \
    -d "dist/work/$slug"
  node scripts/inject-noindex.mjs "dist/work/$slug/index.html"
done

echo "✅ All locked articles encrypted"
