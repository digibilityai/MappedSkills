#!/usr/bin/env bash
# =============================================================================
# Package a VERIFIED production build into a deployable artifact.
#
#   scripts/deploy/package-release.sh <output.tar.gz>
#
# Run after `npm run build` and `npm run verify:build:production`.
#
# ALLOWLIST, NOT DENYLIST. The artifact contains only what is named below.
# The previous deployment rsync'd the whole repository to the host, so
# `docs/`, `CLAUDE.md`, `__MACOSX/` resource forks and anything else that
# happened to be in the checkout went with it. Here, a file reaches production
# only if it is listed.
#
# Source directories are included because the accepted staged-release checks
# (`scripts/verify-server-files.cjs`) run against the staged tree on the host,
# and `db/` + `scripts/db-migrate.cjs` are the migration tooling.
# =============================================================================
set -Eeuo pipefail

out="${1:?usage: package-release.sh <output.tar.gz>}"
[[ -s .next/BUILD_ID ]] || { echo "no build: .next/BUILD_ID missing" >&2; exit 1; }

INCLUDE=(
  .next
  public
  app components lib hooks db
  scripts/verify-server-files.cjs
  scripts/verify-build-output.cjs
  scripts/db-migrate.cjs
  server.cjs app.js
  package.json package-lock.json
  next.config.mjs tsconfig.json postcss.config.mjs
)
for p in "${INCLUDE[@]}"; do
  [[ -e "$p" ]] || { echo "allowlisted path missing: $p" >&2; exit 1; }
done

tar -czf "$out" \
  --exclude='.next/cache' \
  --exclude='.next/dev' \
  --exclude='.next/diagnostics' \
  --exclude='.next/trace' \
  --exclude='.next/trace-build' \
  --exclude='.DS_Store' \
  --exclude='__MACOSX' \
  --exclude='*.zip' \
  --exclude='.env' \
  --exclude='.env.*' \
  "${INCLUDE[@]}"

# Fail if anything that must never ship slipped through.
if tar -tzf "$out" | grep -E '(^|/)(\.env(\..*)?|\.DS_Store|__MACOSX/|.*\.zip|docs/|CLAUDE\.md|\.git/|\.github/|\.next/cache/)' ; then
  echo "artifact contains excluded material (listed above)" >&2
  exit 1
fi

if command -v sha256sum >/dev/null 2>&1; then sha256sum "$out" | awk '{print $1}' > "$out.sha256"
else shasum -a 256 "$out" | awk '{print $1}' > "$out.sha256"; fi
echo "artifact: $out"
echo "sha256:   $(cat "$out.sha256")"
echo "BUILD_ID: $(cat .next/BUILD_ID)"
