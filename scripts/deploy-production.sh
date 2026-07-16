#!/usr/bin/env bash

set -Eeuo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEPLOY_HOST="${DEPLOY_HOST:-root@47.103.28.126}"
REMOTE_DIR="${REMOTE_DIR:-/var/www/9dimension.tech}"
SSH_KEY="${SSH_KEY:-$HOME/.ssh/aliyun/guangwang.pem}"
SERVICE_NAME="${SERVICE_NAME:-9dimension.service}"
HEALTH_URL="${HEALTH_URL:-https://9dimension.tech/home}"
SKIP_LOCAL_BUILD="${SKIP_LOCAL_BUILD:-0}"
INSTALL_DEPS="${INSTALL_DEPS:-0}"

if [[ ! -f "$SSH_KEY" ]]; then
  echo "SSH private key not found: $SSH_KEY" >&2
  echo "Set SSH_KEY to the correct .pem file path and try again." >&2
  exit 1
fi

chmod 400 "$SSH_KEY"

SSH_COMMAND="ssh -i $SSH_KEY -o BatchMode=yes -o ConnectTimeout=15 -o StrictHostKeyChecking=accept-new"

if [[ "$SKIP_LOCAL_BUILD" != "1" ]]; then
  echo "[1/4] Building locally"
  (
    cd "$PROJECT_DIR"
    npm run build
  )
else
  echo "[1/4] Skipping local build"
fi

echo "[2/4] Syncing files to $DEPLOY_HOST:$REMOTE_DIR"
rsync -az --delete \
  --exclude='.git/' \
  --exclude='.next/cache/' \
  --exclude='node_modules/' \
  --exclude='.DS_Store' \
  --exclude='.env*' \
  --exclude='*.pem' \
  --exclude='*.docx' \
  --exclude='public/AIPC产品三大序列/' \
  --exclude='public/首页第一屏.mp4' \
  --exclude='public/product-assets/cloud-cutout.png' \
  --exclude='public/product-assets/enterprise-server-cutout.png' \
  --exclude='public/product-assets/mix-back-cutout.png' \
  --exclude='public/product-assets/mix-front-cutout.png' \
  -e "$SSH_COMMAND" \
  "$PROJECT_DIR/" "$DEPLOY_HOST:$REMOTE_DIR/"

echo "[3/4] Restarting the site"
$SSH_COMMAND "$DEPLOY_HOST" "set -Eeuo pipefail
  cd '$REMOTE_DIR'
  if [[ '$INSTALL_DEPS' == '1' ]]; then
    echo 'Installing dependencies'
    npm ci --no-audit --no-fund
  else
    echo 'Skipping dependency installation'
  fi
  systemctl restart '$SERVICE_NAME'
"

echo "[4/4] Checking production site"
for attempt in {1..12}; do
  if curl --fail --silent --show-error --max-time 15 "$HEALTH_URL" >/dev/null; then
    echo "Deployment complete: $HEALTH_URL"
    exit 0
  fi

  if [[ "$attempt" -lt 12 ]]; then
    sleep 5
  fi
done

echo "Deployment finished, but the health check failed: $HEALTH_URL" >&2
exit 1
