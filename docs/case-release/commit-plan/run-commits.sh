#!/usr/bin/env bash
# NOT RUN. Creates the release commits in order, each from its pathspec list (literal pathspecs: the route-group names contain ( ) [ ]).
# Run from the repository root on the release branch only after the owner authorises committing.
set -euo pipefail
LIST=docs/case-release/commit-plan
git --literal-pathspecs add --pathspec-from-file=$LIST/1-case-study-platform.txt
git commit -q -F - <<'MSG'
feat(work): case-study platform, 20-study library, final copy gate and artwork (DEC-102, DEC-106, DEC-108, DEC-117)

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>
MSG
echo "committed 1-case-study-platform"
git --literal-pathspecs add --pathspec-from-file=$LIST/2-editorial-r3.txt
git commit -q -F - <<'MSG'
feat(editorial): /blog, /press and /research editorial redesign, banner-focus guard (DEC-109 to DEC-114)

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>
MSG
echo "committed 2-editorial-r3"
git --literal-pathspecs add --pathspec-from-file=$LIST/3-case-showcase.txt
git commit -q -F - <<'MSG'
feat(showcase): reusable case showcase on /social-media-ads, /seo, /google-ads and four /who-we-help pages (DEC-115, DEC-116)

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>
MSG
echo "committed 3-case-showcase"
git --literal-pathspecs add --pathspec-from-file=$LIST/4-release-tooling.txt
git commit -q -F - <<'MSG'
build(release): canonical-domain check in build verification (DEC-117)

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>
MSG
echo "committed 4-release-tooling"
git --literal-pathspecs add --pathspec-from-file=$LIST/5-docs.txt
git commit -q -F - <<'MSG'
docs: case-study release records, reports, decision log DEC-102 to DEC-117

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>
MSG
echo "committed 5-docs"
git status --short | head
