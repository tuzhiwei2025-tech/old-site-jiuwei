#!/usr/bin/env bash

set -Eeuo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEPLOY_HOST="${DEPLOY_HOST:-root@47.103.28.126}"
REMOTE_RELEASES_DIR="${REMOTE_RELEASES_DIR:-/var/www/9dimension-releases}"
REMOTE_CURRENT_LINK="${REMOTE_CURRENT_LINK:-/var/www/9dimension.tech-current}"
REMOTE_LEGACY_DIR="${REMOTE_LEGACY_DIR:-/var/www/9dimension.tech}"
SERVICE_NAME="${SERVICE_NAME:-9dimension.service}"
HEALTH_URL="${HEALTH_URL:-https://9dimension.tech/home}"
DEPLOY_REF="${DEPLOY_REF:-HEAD}"
SKIP_LOCAL_BUILD="${SKIP_LOCAL_BUILD:-0}"
INSTALL_DEPS="${INSTALL_DEPS:-0}"

if [[ -f "$PROJECT_DIR/guanwang.pem" ]]; then
  DEFAULT_SSH_KEY="$PROJECT_DIR/guanwang.pem"
else
  DEFAULT_SSH_KEY="$HOME/.ssh/aliyun/guangwang.pem"
fi

SSH_KEY="${SSH_KEY:-$DEFAULT_SSH_KEY}"

if [[ ! -f "$SSH_KEY" ]]; then
  echo "SSH private key not found: $SSH_KEY" >&2
  exit 1
fi

if ! git -C "$PROJECT_DIR" rev-parse --verify "$DEPLOY_REF" >/dev/null 2>&1; then
  echo "Invalid deploy ref: $DEPLOY_REF" >&2
  exit 1
fi

chmod 400 "$SSH_KEY"

SSH_COMMAND=(ssh -i "$SSH_KEY" -o IdentitiesOnly=yes -o BatchMode=yes -o ConnectTimeout=20 -o StrictHostKeyChecking=accept-new)
COMMIT_SHA="$(git -C "$PROJECT_DIR" rev-parse "$DEPLOY_REF")"
RELEASE_ID="$(git -C "$PROJECT_DIR" rev-parse --short "$DEPLOY_REF")-$(date -u +%Y%m%d%H%M%S)"
REMOTE_RELEASE_DIR="$REMOTE_RELEASES_DIR/$RELEASE_ID"

if [[ "$SKIP_LOCAL_BUILD" != "1" ]]; then
  echo "[1/5] Building $DEPLOY_REF locally"
  (
    cd "$PROJECT_DIR"
    npm run build
  )
else
  echo "[1/5] Skipping local build"
fi

echo "[2/5] Uploading committed files to isolated release $RELEASE_ID"
"${SSH_COMMAND[@]}" "$DEPLOY_HOST" "mkdir -p '$REMOTE_RELEASE_DIR'"
git -C "$PROJECT_DIR" archive --format=tar "$DEPLOY_REF" | "${SSH_COMMAND[@]}" "$DEPLOY_HOST" "tar -x -C '$REMOTE_RELEASE_DIR'"

echo "[3/5] Building isolated release on server"
"${SSH_COMMAND[@]}" "$DEPLOY_HOST" bash -s -- "$REMOTE_RELEASE_DIR" "$REMOTE_LEGACY_DIR/node_modules" "$COMMIT_SHA" "$INSTALL_DEPS" <<'REMOTE'
set -Eeuo pipefail

release_dir="$1"
shared_node_modules="$2"
commit_sha="$3"
install_deps="$4"

if [[ "$install_deps" == "1" ]]; then
  cd "$release_dir"
  npm ci --no-audit --no-fund
elif [[ -d "$shared_node_modules" ]]; then
  ln -s "$shared_node_modules" "$release_dir/node_modules"
else
  echo "Shared dependencies are missing. Retry with INSTALL_DEPS=1." >&2
  exit 1
fi

cd "$release_dir"
nice -n 10 npm run build
printf '%s\n' "$commit_sha" > .release-revision
REMOTE

echo "[4/5] Switching release and restarting $SERVICE_NAME"
"${SSH_COMMAND[@]}" "$DEPLOY_HOST" bash -s -- "$REMOTE_RELEASE_DIR" "$REMOTE_CURRENT_LINK" "$REMOTE_RELEASES_DIR" "$SERVICE_NAME" <<'REMOTE'
set -Eeuo pipefail

release_dir="$1"
current_link="$2"
releases_dir="$3"
service_name="$4"
service_file="/etc/systemd/system/$service_name"
previous_release=""

if [[ -L "$current_link" ]]; then
  previous_release="$(readlink -f "$current_link")"
fi

if [[ -f "$service_file" ]]; then
  sed -i "s|^WorkingDirectory=.*|WorkingDirectory=$current_link|" "$service_file"
fi

ln -s "$release_dir" "$current_link.next"
mv -Tf "$current_link.next" "$current_link"
systemctl daemon-reload
systemctl restart "$service_name"

if ! curl --fail --silent --show-error --max-time 20 http://127.0.0.1:3000/home >/dev/null; then
  if [[ -n "$previous_release" && -d "$previous_release" ]]; then
    ln -s "$previous_release" "$current_link.rollback"
    mv -Tf "$current_link.rollback" "$current_link"
    systemctl restart "$service_name"
  fi
  echo "New release failed its local health check and was rolled back." >&2
  exit 1
fi

systemctl is-active "$service_name"
# Keep the current release and two rollback candidates.
find "$releases_dir" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' | sort -nr | tail -n +4 | cut -d' ' -f2- | xargs -r rm -rf
REMOTE

echo "[5/5] Checking $HEALTH_URL"
for attempt in {1..12}; do
  if curl --fail --silent --show-error --max-time 20 "$HEALTH_URL" >/dev/null; then
    echo "Deployment complete: $HEALTH_URL ($COMMIT_SHA)"
    exit 0
  fi

  if [[ "$attempt" -lt 12 ]]; then
    sleep 5
  fi
done

echo "Release is active on the server, but the public health check failed: $HEALTH_URL" >&2
exit 1
