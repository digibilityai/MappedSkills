#!/usr/bin/env bash
# G6 simplified owner-run wrapper (from G6-S2B, unchanged in behaviour). READ-ONLY: runs verify.mjs (GET only) and the migration's `plan` mode (read-only client).
# It contains no `apply`, `rollback-plan` or `rollback` call, and no token. The token is typed at a hidden prompt, lives
# in this process only, and is handed to each node process through its environment (never on a command line).
#
#   bash verify.sh <SPACE_ID> <PRODUCTION_SPACE_ID> <RUN_DIR>        (RUN_DIR must not exist yet)
set -euo pipefail
set +x
[ "$#" -eq 3 ] || { echo "usage: bash verify.sh <SPACE_ID> <PRODUCTION_SPACE_ID> <RUN_DIR>" >&2; exit 1; }
SPACE="$1"; PROD="$2"; RUN="$3"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
[ ! -e "$RUN" ] || { echo "RUN_DIR $RUN already exists; use a new path." >&2; exit 1; }
command -v node >/dev/null || { echo "node not found" >&2; exit 1; }
[ "$(node -p 'process.versions.node.split(".")[0]')" -ge 20 ] || { echo "Node >= 20 required" >&2; exit 1; }

printf 'Contentful Management token (input hidden, not stored): ' >&2
IFS= read -rs TOKEN; printf '\n' >&2
[ -n "$TOKEN" ] || { echo "empty token" >&2; exit 1; }
trap 'unset TOKEN' EXIT

mkdir -p "$RUN"
echo "== 1/2 verify.mjs (read-only comparison of master and staging)" >&2
rc=0
CONTENTFUL_MANAGEMENT_TOKEN="$TOKEN" node "$HERE/verify.mjs" --space "$SPACE" --prod-space "$PROD" --out "$RUN/01-verify" || rc=$?
if [ "$rc" -ne 0 ]; then echo "STOP: verification did not pass (exit $rc). plan NOT run. See STOP rules." >&2; exit "$rc"; fi

echo "== 2/2 migration plan (dry run, read-only client)" >&2
CONTENTFUL_MANAGEMENT_TOKEN="$TOKEN" node "$HERE/cli.mjs" plan --space "$SPACE" --environment staging --out "$RUN/02-plan" || rc=$?
echo "plan exit code: $rc" >&2
exit "$rc"
