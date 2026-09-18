#!/usr/bin/env bash
# =============================================================================
# MappedSkills production release — HOST SIDE.
#
#   release.sh stage    <artifact.tar.gz> <expected-sha256>
#   release.sh activate
#   release.sh rollback
#   release.sh status
#
# This script is the accepted manual off-host release process (DECISION_LOG,
# Phase J production deployment, 2026-09-07), written down so it can be run the
# same way every time instead of by hand:
#
#   artifact built OFF the host → checksum-verified → extracted to a FRESH
#   `<app>.new` → carry across ONLY the host-owned runtime pieces (`app.js`, the
#   `node_modules` symlink, `tmp/`) → verify the staged tree → CONTROLLED
#   two-rename swap → restart → the previous release is KEPT for rollback.
#
# WHAT IT DELIBERATELY DOES NOT DO (each of these happened in September 2026):
#   * no `rsync --delete` over the live directory — a half-finished copy can
#     leave the live release broken, and there is nothing to roll back to;
#   * no build on the host, and no `npm install` on the host — `node_modules`
#     is a symlink into the cPanel nodevenv SHARED by every release, so
#     installing into it would mutate the live release before the switch;
#   * no writing, regenerating or printing of `.env`. Runtime secrets are
#     managed on the host. An existing `.env` is carried across byte-for-byte
#     and never read.
#
# Nothing here prints a secret. It never reads `.env` content.
# =============================================================================
set -Eeuo pipefail
umask 022

APP_DIR="${APP_DIR:-$HOME/mappedskills.com}"
NEW_DIR="${APP_DIR}.new"
PREV_DIR="${APP_DIR}.prev"
PREV2_DIR="${APP_DIR}.prev2"
# cPanel "Setup Node.js App" identifies the app by its root relative to $HOME.
APP_ROOT_REL="${APP_ROOT_REL:-${APP_DIR#"$HOME"/}}"

log()  { printf '[release] %s\n' "$*"; }
die()  { printf '[release] FAIL: %s\n' "$*" >&2; exit 1; }

sha256_of() {
  if command -v sha256sum >/dev/null 2>&1; then sha256sum "$1" | awk '{print $1}'
  else shasum -a 256 "$1" | awk '{print $1}'; fi
}

restart_app() {
  # Both mechanisms the accepted process used. `tmp/restart.txt` is the
  # Passenger contract and always applies; the selector restart is used where
  # CloudLinux provides it.
  mkdir -p "$APP_DIR/tmp"
  touch "$APP_DIR/tmp/restart.txt"
  if command -v cloudlinux-selector >/dev/null 2>&1; then
    cloudlinux-selector restart --json --interpreter nodejs --app-root "$APP_ROOT_REL" >/dev/null \
      || log "WARNING: cloudlinux-selector restart returned non-zero; tmp/restart.txt was touched"
  fi
  log "restart requested"
}

cmd_stage() {
  local artifact="${1:-}" expected="${2:-}"
  [[ -f "$artifact" ]] || die "artifact not found: $artifact"
  [[ "$expected" =~ ^[0-9a-f]{64}$ ]] || die "expected sha256 missing or malformed"
  [[ -d "$APP_DIR" ]] || die "live release directory not found: $APP_DIR"

  local actual; actual="$(sha256_of "$artifact")"
  [[ "$actual" == "$expected" ]] || die "artifact checksum mismatch (expected $expected, got $actual)"
  log "artifact checksum verified"

  # Only ever remove the STAGING directory — never the live one.
  rm -rf -- "$NEW_DIR"
  mkdir -p -- "$NEW_DIR"
  tar -xzf "$artifact" -C "$NEW_DIR"
  log "extracted to $NEW_DIR"

  # --- Carry across ONLY the host-owned runtime pieces ----------------------
  if [[ -f "$APP_DIR/app.js" ]]; then
    cp -p -- "$APP_DIR/app.js" "$NEW_DIR/app.js"
    log "carried: app.js (the host's startup file wins over the repository copy)"
  fi

  if [[ -L "$APP_DIR/node_modules" ]]; then
    ln -s -- "$(readlink "$APP_DIR/node_modules")" "$NEW_DIR/node_modules"
    log "carried: node_modules symlink"
  elif [[ -e "$APP_DIR/node_modules" ]]; then
    die "live node_modules is a real directory, not the expected nodevenv symlink — stop and inspect by hand"
  else
    die "live release has no node_modules — refusing to stage a release that cannot start"
  fi

  mkdir -p -- "$NEW_DIR/tmp"
  if [[ -d "$APP_DIR/tmp" ]]; then
    cp -pR -- "$APP_DIR/tmp/." "$NEW_DIR/tmp/"
  fi
  log "carried: tmp/"

  if [[ -f "$APP_DIR/.env" ]]; then
    cp -p -- "$APP_DIR/.env" "$NEW_DIR/.env"
    log "WARNING: carried an existing .env unchanged (not read). The accepted process expects runtime"
    log "         environment to live in the cPanel Node.js app configuration — see the owner decision."
  fi

  # --- Dependency gate --------------------------------------------------------
  # `node_modules` is SHARED by every release through the symlink. A different
  # lockfile means the live dependencies do not match this build; installing
  # would change the running release underneath it. That is a deliberate,
  # owner-run step, never an automatic one.
  if [[ -f "$APP_DIR/package-lock.json" ]]; then
    if [[ "$(sha256_of "$APP_DIR/package-lock.json")" != "$(sha256_of "$NEW_DIR/package-lock.json")" ]]; then
      die "package-lock.json differs from the live release — the shared node_modules must be updated in a separate, approved step before this release can be activated"
    fi
    log "dependency set unchanged"
  else
    die "live release has no package-lock.json — cannot prove the dependency set matches"
  fi

  cmd_verify_staged
}

cmd_verify_staged() {
  [[ -d "$NEW_DIR" ]] || die "no staged release at $NEW_DIR"
  (
    cd "$NEW_DIR"
    [[ -s .next/BUILD_ID ]]              || die "staged: .next/BUILD_ID missing"
    [[ -f server.cjs ]]                  || die "staged: server.cjs missing"
    [[ ! -e public/robots.txt ]]         || die "staged: stale public/robots.txt present"
    [[ ! -e lib/constants.ts ]]          || die "staged: stale lib/constants.ts present"
    [[ ! -e .next/cache ]]               || die "staged: build cache shipped in the artifact"
    [[ -e node_modules/next/package.json ]] || die "staged: node_modules does not resolve next"
    node scripts/verify-server-files.cjs >/dev/null || die "staged: verify-server-files failed"
    node scripts/verify-build-output.cjs   >/dev/null || die "staged: verify-build-output failed"
  )
  log "staged release verified: BUILD_ID $(cat "$NEW_DIR/.next/BUILD_ID")"
}

cmd_activate() {
  cmd_verify_staged
  [[ -d "$APP_DIR" ]] || die "live release directory not found: $APP_DIR"

  # Keep TWO previous releases: .prev (rollback target) and .prev2.
  if [[ -d "$PREV_DIR" ]]; then
    rm -rf -- "$PREV2_DIR"
    mv -- "$PREV_DIR" "$PREV2_DIR"
  fi

  # The controlled two-rename swap. If the second rename fails, the first is
  # undone so the live path is never left empty.
  mv -- "$APP_DIR" "$PREV_DIR"
  if ! mv -- "$NEW_DIR" "$APP_DIR"; then
    mv -- "$PREV_DIR" "$APP_DIR"
    die "swap failed; the previous release was restored in place"
  fi
  log "swapped: live=$(cat "$APP_DIR/.next/BUILD_ID")  previous=$(cat "$PREV_DIR/.next/BUILD_ID" 2>/dev/null || echo unknown)"
  restart_app
}

cmd_rollback() {
  [[ -d "$PREV_DIR" ]] || die "no previous release at $PREV_DIR to roll back to"
  local failed="${APP_DIR}.failed-$(date +%Y%m%d%H%M%S)"
  mv -- "$APP_DIR" "$failed"
  if ! mv -- "$PREV_DIR" "$APP_DIR"; then
    mv -- "$failed" "$APP_DIR"
    die "rollback swap failed; the release that was live has been put back"
  fi
  if [[ -d "$PREV2_DIR" ]]; then mv -- "$PREV2_DIR" "$PREV_DIR"; fi
  log "rolled back: live=$(cat "$APP_DIR/.next/BUILD_ID" 2>/dev/null || echo unknown); failed release kept at $failed"
  restart_app
}

cmd_status() {
  for d in "$APP_DIR" "$NEW_DIR" "$PREV_DIR" "$PREV2_DIR"; do
    if [[ -d "$d" ]]; then
      printf '%-48s BUILD_ID=%s\n' "$d" "$(cat "$d/.next/BUILD_ID" 2>/dev/null || echo '-')"
    fi
  done
}

case "${1:-}" in
  stage)    shift; cmd_stage "$@" ;;
  activate) cmd_activate ;;
  rollback) cmd_rollback ;;
  status)   cmd_status ;;
  *) die "usage: release.sh {stage <artifact> <sha256>|activate|rollback|status}" ;;
esac
