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
#   * no build on the host, and NO `npm install` / `npm ci` run by this script.
#     `node_modules` is a symlink, and the cPanel nodevenv tree is SHARED by
#     every release, so installing into it would mutate the live release before
#     the switch and break every rollback target at the same time. A changed
#     dependency set instead requires an isolated tree prepared beforehand in a
#     separate approved step (see DEPENDENCY SELECTION below);
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

# =============================================================================
# DEPENDENCY SELECTION — the release, not the host, decides which dependency
# tree it runs against.
#
# WHY. Every release directory reaches `node_modules` through a SYMLINK, and
# until now they all pointed at the SAME shared cPanel nodevenv tree. That
# makes a dependency change impossible to do safely: installing into the shared
# tree mutates the release that is currently serving, and simultaneously breaks
# every retained rollback target, which expects the previous dependency set.
#
# So a dependency set is keyed by the SHA-256 of the lockfile that produced it:
#
#   lockfile unchanged -> carry the live symlink (nothing to do, nothing moves)
#   lockfile changed   -> require ~/deps/<first-12-of-sha>/node_modules,
#                         prepared beforehand in a SEPARATE, APPROVED step, and
#                         link THIS release to it
#
# The new release then owns its dependency tree: the two-rename swap moves
# application and dependencies together, and rollback restores the previous
# release with ITS symlink still intact. No symlink inside an existing release
# is ever repointed.
#
# THIS FUNCTION NEVER INSTALLS ANYTHING. `npm install` / `npm ci` on the host is
# a deliberate operator action; a release that needs a tree which does not exist
# FAILS CLOSED and prints the exact path and command to prepare.
# =============================================================================
DEPS_ROOT="${DEPS_ROOT:-$HOME/deps}"

select_dependency_tree() {
  [[ -f "$NEW_DIR/package-lock.json" ]] || die "staged release has no package-lock.json"
  [[ -f "$APP_DIR/package-lock.json" ]] || die "live release has no package-lock.json — cannot compare dependency sets"

  local staged_sha live_sha sha12 deps_dir
  staged_sha="$(sha256_of "$NEW_DIR/package-lock.json")"
  live_sha="$(sha256_of "$APP_DIR/package-lock.json")"
  sha12="${staged_sha:0:12}"

  if [[ "$staged_sha" == "$live_sha" ]]; then
    # --- Unchanged dependency set: carry the live tree, untouched ------------
    if [[ -L "$APP_DIR/node_modules" ]]; then
      ln -s -- "$(readlink "$APP_DIR/node_modules")" "$NEW_DIR/node_modules"
      log "dependency set unchanged (lock ${sha12}); carried the live node_modules symlink"
    elif [[ -e "$APP_DIR/node_modules" ]]; then
      die "live node_modules is a real directory, not the expected nodevenv symlink — stop and inspect by hand"
    else
      die "live release has no node_modules — refusing to stage a release that cannot start"
    fi
    return
  fi

  # --- Changed dependency set: an isolated, pre-approved tree is REQUIRED ----
  deps_dir="$DEPS_ROOT/$sha12"
  log "dependency set CHANGED (live ${live_sha:0:12} -> staged ${sha12})"

  if [[ ! -d "$deps_dir/node_modules" ]]; then
    printf '%s\n' \
      "" \
      "  This release needs a dependency tree that does not exist yet:" \
      "" \
      "      $deps_dir/node_modules" \
      "" \
      "  Prepare it ONCE, as a separate approved step (it never touches the live tree)." \
      "" \
      "  DO NOT 'source ~/nodevenv/.../bin/activate' to do this, and DO NOT use the" \
      "  npm on that venv's PATH. It is CloudLinux's npm_wrapper, and for the" \
      "  commands 'install', 'i', 'add', 'list', 'la' and 'll' — whatever directory" \
      "  you are in — it DELETES the LIVE application's node_modules symlink," \
      "  relinks it to the SHARED nodevenv tree, points that tree's package.json at" \
      "  the LIVE app, and installs into it. That mutates the running release and" \
      "  every retained rollback target at once. ('npm ci' itself passes straight" \
      "  through to real npm; the danger is standing in that environment at all," \
      "  where 'npm install' after a failure — or even a diagnostic 'npm list' —" \
      "  is destructive.) Use the host's Node 22 binaries directly instead:" \
      "" \
      "      B=/opt/alt/alt-nodejs22/root/usr/bin   # the binary Passenger runs" \
      "      W=\$(mktemp -d $DEPS_ROOT/.prep-$sha12-XXXXXX)   # same filesystem as $DEPS_ROOT" \
      "      cp $NEW_DIR/package.json $NEW_DIR/package-lock.json \$W/" \
      "      cd \$W && env -i HOME=\$HOME PATH=\$B:/usr/bin:/bin \$B/npm ci --omit=dev" \
      "" \
      "  Verify BEFORE promoting — package.json and package-lock.json unchanged by" \
      "  the install, node_modules/next/package.json reporting the version this" \
      "  release pins, and react, react-dom and mysql2 all present. Then promote it" \
      "  in ONE atomic rename (never install into a live path, never into $deps_dir):" \
      "" \
      "      [ ! -e $deps_dir ] && mv -T \$W $deps_dir" \
      "" \
      "  Treat $deps_dir as immutable afterwards: a different lockfile means a" \
      "  different dependency key and a different tree." \
      "" \
      "  Then re-run: release.sh stage <artifact> <sha256>" \
      "" >&2
    die "required dependency tree missing for lockfile $sha12"
  fi

  # The tree must be provably built FROM THIS LOCKFILE, not merely present.
  [[ -f "$deps_dir/package-lock.json" ]] \
    || die "$deps_dir has no package-lock.json — cannot prove which lockfile produced that tree"
  [[ "$(sha256_of "$deps_dir/package-lock.json")" == "$staged_sha" ]] \
    || die "$deps_dir/package-lock.json does not match the staged lockfile — that tree was built from a DIFFERENT dependency set"
  [[ -d "$deps_dir/node_modules/next" ]] \
    || die "$deps_dir/node_modules does not contain next — it is not a usable dependency tree"

  ln -s -- "$deps_dir/node_modules" "$NEW_DIR/node_modules"
  log "linked staged release to the isolated dependency tree $deps_dir/node_modules"
  log "the live dependency tree was NOT modified"
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

  select_dependency_tree

  mkdir -p -- "$NEW_DIR/tmp"
  if [[ -d "$APP_DIR/tmp" ]]; then
    cp -pR -- "$APP_DIR/tmp/." "$NEW_DIR/tmp/"
  fi
  log "carried: tmp/"

  # --- Runtime environment -------------------------------------------------
  # PRODUCTION EVIDENCE (preflight, 2026-09-18): the cPanel application
  # environment supplies ONLY DB_HOST/DB_USER/DB_PASSWORD/DB_NAME and NODE_ENV.
  # `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` exist NOWHERE ELSE than
  # this `.env`, so it is currently LOAD-BEARING: a release that dropped it
  # would leave the blog and portfolio without Contentful at runtime.
  #
  # The file is carried across byte-for-byte and verified. It is never read,
  # never printed, never regenerated and never written from CI — the artifact
  # must not contain one at all.
  [[ ! -e "$NEW_DIR/.env" ]] \
    || die "the artifact contains a .env — CI must never ship runtime environment; refusing to stage"

  if [[ -f "$APP_DIR/.env" ]]; then
    cp -p -- "$APP_DIR/.env" "$NEW_DIR/.env"
    [[ "$(sha256_of "$APP_DIR/.env")" == "$(sha256_of "$NEW_DIR/.env")" ]] \
      || die "the live .env was not carried across intact — refusing to stage"
    log "carried: .env, byte-for-byte verified (contents not read)"
  else
    log "NOTE: the live release has no .env. That is correct ONLY if the runtime"
    log "      environment (Contentful included) is supplied by the cPanel app"
    log "      configuration. Confirm before activating."
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
    node scripts/verify-server-files.cjs >/dev/null || die "staged: verify-server-files failed"
    node scripts/verify-build-output.cjs   >/dev/null || die "staged: verify-build-output failed"
  )
  verify_dependency_compatibility
  log "staged release verified: BUILD_ID $(cat "$NEW_DIR/.next/BUILD_ID")"
}

# --- Dependency compatibility, checked BEFORE the swap -----------------------
# A staged release whose dependency tree cannot satisfy it must never become
# live. Everything here reads; nothing installs.
verify_dependency_compatibility() {
  local target staged_sha sha12
  [[ -L "$NEW_DIR/node_modules" ]] || die "staged: node_modules is not a symlink"
  target="$(cd "$NEW_DIR" && readlink node_modules)"
  [[ -d "$NEW_DIR/node_modules/" ]] || die "staged: node_modules symlink does not resolve ($target)"

  # Every runtime package the application cannot start without.
  local pkg
  for pkg in next react react-dom mysql2; do
    [[ -f "$NEW_DIR/node_modules/$pkg/package.json" ]] \
      || die "staged: dependency tree does not provide '$pkg'"
  done

  # The installed Next must be exactly what this build's own metadata pins.
  local want_next have_next
  want_next="$(node -p "require('$NEW_DIR/package.json').dependencies.next" 2>/dev/null || echo '')"
  have_next="$(node -p "require('$NEW_DIR/node_modules/next/package.json').version" 2>/dev/null || echo '')"
  [[ -n "$want_next" && -n "$have_next" ]] || die "staged: could not determine the next version"
  [[ "$have_next" == "$want_next" ]] \
    || die "staged: dependency tree has next $have_next but this release pins $want_next"

  # The tree must correspond to THIS release's lockfile.
  staged_sha="$(sha256_of "$NEW_DIR/package-lock.json")"
  sha12="${staged_sha:0:12}"
  case "$target" in
    "$DEPS_ROOT/"*)
      [[ "$target" == "$DEPS_ROOT/$sha12/node_modules" ]] \
        || die "staged: linked to $target, which is not the tree for lockfile $sha12"
      [[ "$(sha256_of "$DEPS_ROOT/$sha12/package-lock.json")" == "$staged_sha" ]] \
        || die "staged: $DEPS_ROOT/$sha12 no longer matches this release's lockfile"
      ;;
    *)
      [[ "$(sha256_of "$APP_DIR/package-lock.json")" == "$staged_sha" ]] \
        || die "staged: using the live dependency tree, but the lockfiles differ"
      ;;
  esac
  log "dependency compatibility verified: next $have_next, tree $target (lock $sha12)"
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
  #
  # DEPENDENCY COHERENCE: each release directory carries its OWN `node_modules`
  # symlink, so renaming directories moves the application AND its dependency
  # tree together. No symlink inside any release — live, staged or retained —
  # is read-modified or repointed here. A rollback therefore restores the
  # previous application together with the dependency tree it was built for.
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
  # The previous release keeps its own symlink; refuse if that tree has been
  # removed, rather than swapping in a release that cannot start.
  [[ -L "$PREV_DIR/node_modules" ]] \
    || die "previous release has no node_modules symlink — refusing an incoherent rollback"
  [[ -d "$PREV_DIR/node_modules/" ]] \
    || die "previous release points at a dependency tree that no longer exists ($(cd "$PREV_DIR" && readlink node_modules)) — refusing"
  [[ -f "$PREV_DIR/node_modules/next/package.json" ]] \
    || die "previous release's dependency tree does not provide next — refusing"
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
      printf '%-46s BUILD_ID=%-24s deps=%s\n' "$d" \
        "$(cat "$d/.next/BUILD_ID" 2>/dev/null || echo '-')" \
        "$( [[ -L "$d/node_modules" ]] && (cd "$d" && readlink node_modules) || echo '-' )"
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
