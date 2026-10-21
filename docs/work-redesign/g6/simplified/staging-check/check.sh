#!/usr/bin/env bash
# G6 simplified — owner-run wrapper for check.cjs. READ-ONLY: Contentful Delivery API, environment `staging` only.
# The Delivery token is typed at a hidden prompt, lives in this process only, reaches node through its environment
# (never a command line) and is unset on exit. No Management or Preview token is used.
#
#   bash check.sh <SPACE_ID> <NEW_OUT_DIR> [<run-03 before-entries-report.json>]
set -euo pipefail
set +x
[ "$#" -ge 2 ] && [ "$#" -le 3 ] || { echo "usage: bash check.sh <SPACE_ID> <NEW_OUT_DIR> [before-entries-report.json]" >&2; exit 1; }
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
[ ! -e "$2" ] || { echo "$2 already exists; use a new path." >&2; exit 1; }
printf 'Contentful DELIVERY token with access to staging (input hidden, not stored): ' >&2
IFS= read -rs TOKEN; printf '\n' >&2
[ -n "$TOKEN" ] || { echo "empty token" >&2; exit 1; }
trap 'unset TOKEN' EXIT
rc=0
env -u CONTENTFUL_PREVIEW_ACCESS_TOKEN -u CONTENTFUL_MANAGEMENT_TOKEN CONTENTFUL_ACCESS_TOKEN="$TOKEN" node "$HERE/check.cjs" "$@" || rc=$?
echo "check exit code: $rc" >&2
exit "$rc"
