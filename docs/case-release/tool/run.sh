#!/usr/bin/env bash
# Owner-run wrapper for the case-study release (DEC-117). The token is typed at a hidden prompt, held in this process only, passed to node via environment.
#   bash run.sh check                              (read-only; run first and again just before publish)
#   bash run.sh create                             (7 industries, 13 clients and 15 case studies as UNPUBLISHED drafts; type owww06rzpjnj/master)
#   bash run.sh snapshot                           (read-only; saves the 4 existing entries that will change)
#   bash run.sh stage-existing   <snapshot.json>   (DRAFT changes on those 4 published entries; live site unchanged)
#   bash run.sh restore-existing <snapshot.json>   (puts those drafts back to the snapshot)
#   bash run.sh publish          <snapshot.json>   RELEASE STEP (type PUBLISH owww06rzpjnj/master)
#   bash run.sh rollback-publish <snapshot.json>   (4 entries back live on the snapshot; the 15 new case studies unpublished; nothing deleted)
# Only `publish` and `rollback-publish` can publish or unpublish. Om Sai and Home Decor are never written.
set -euo pipefail; set +x
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SPACE=owww06rzpjnj
MODE="${1:-}"; SNAP="${2:-}"
case "$MODE" in
  check|create|snapshot) [ "$#" -eq 1 ] ;;
  stage-existing|restore-existing|publish|rollback-publish) [ "$#" -eq 2 ] && [ -f "$SNAP" ] ;;
  *) false ;;
esac || { sed -n '2,9p' "${BASH_SOURCE[0]}" >&2; exit 1; }
[ "$(node -p 'process.versions.node.split(".")[0]')" -ge 20 ] || { echo "Node >= 20 required" >&2; exit 1; }
SRC="${RELEASE_MANIFEST:-$HOME/gitrepo/MappedSkills-six-cases/docs/case-release/manifest/manifest.json}"
[ -f "$SRC" ] || { echo "manifest not found: $SRC" >&2; exit 1; }
GOT_SHA="$(shasum -a 256 "$SRC" | cut -d' ' -f1)"
echo "manifest: $SRC" >&2; echo "sha256:   $GOT_SHA" >&2
if [ -n "${RELEASE_MANIFEST_SHA256:-}" ] && [ "$RELEASE_MANIFEST_SHA256" != "$GOT_SHA" ]; then echo "manifest does not match the approved sha256" >&2; exit 1; fi
OUT="$HERE/runs/$(date +%Y%m%d-%H%M%S)-$MODE"
EXTRA=(--source "$SRC")
case "$MODE" in
  create) PHRASE="$SPACE/master"; echo "About to CREATE UNPUBLISHED drafts (7 industries, 13 clients, 15 case studies) in $SPACE/master. Existing entries are not touched. Nothing is published." >&2 ;;
  stage-existing) PHRASE="STAGE $SPACE/master"; echo "About to write DRAFT changes to 4 PUBLISHED entries (ClassPe, InsurYo, Ameba, AnybodyCanBake Google Ads). Live content is unchanged until publish." >&2 ;;
  publish) PHRASE="PUBLISH $SPACE/master"; echo "About to PUBLISH the 15 new case studies, their new clients and industries, and the 4 staged revisions in $SPACE/master. This changes the live site within about a minute. Only with the owner's explicit authorisation." >&2 ;;
  rollback-publish) PHRASE="ROLLBACK $SPACE/master"; echo "About to put the 4 existing entries back LIVE on the snapshot and UNPUBLISH the 15 new case studies (drafts kept, nothing deleted)." >&2 ;;
  restore-existing) PHRASE="RESTORE $SPACE/master"; echo "About to put the drafts of the 4 existing entries back to the snapshot. Nothing is published." >&2 ;;
  *) PHRASE="" ;;
esac
if [ -n "$PHRASE" ]; then
  printf 'Type %s to continue: ' "$PHRASE" >&2; IFS= read -r CONFIRM
  EXTRA+=(--confirm "$CONFIRM")
fi
if [ -n "$SNAP" ]; then
  SNAP_SHA="$(shasum -a 256 "$SNAP" | cut -d' ' -f1)"; echo "snapshot: $SNAP" >&2; echo "sha256:   $SNAP_SHA" >&2
  if [ -n "${RELEASE_SNAPSHOT_SHA256:-}" ] && [ "$RELEASE_SNAPSHOT_SHA256" != "$SNAP_SHA" ]; then echo "snapshot does not match the pinned sha256" >&2; exit 1; fi
fi
printf 'Contentful Management token (hidden): ' >&2; IFS= read -rs CONTENTFUL_MANAGEMENT_TOKEN; echo >&2
trap "unset CONTENTFUL_MANAGEMENT_TOKEN" EXIT
export CONTENTFUL_MANAGEMENT_TOKEN
ARGS=(--space "$SPACE" --out "$OUT" "${EXTRA[@]}")
[ -n "$SNAP" ] && ARGS+=(--snapshot "$SNAP")
node "$HERE/release.mjs" "$MODE" "${ARGS[@]}"
