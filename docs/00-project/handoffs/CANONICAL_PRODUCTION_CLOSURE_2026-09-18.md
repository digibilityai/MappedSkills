# Claude Session Handoff — CANONICAL PRODUCTION DEPLOYMENT COMPLETE

> **Filename note.** The handoffs in this directory are numbered `SESSION_01`–`SESSION_20`.
> Sessions after 20 produced no handoff, so the next index cannot be derived from the record.
> This file is dated rather than numbered so that no session number is invented.

## Session
- **Date:** 2026-09-18
- **Model:** Claude Opus 5
- **Role:** repository/release worker (documentation closure)
- **Purpose:** record the completed canonical reconciliation, `main` transition and first canonical
  production deployment as the authoritative operational state.

## Status

**CANONICAL PRODUCTION DEPLOYMENT COMPLETE.**

## What is live

| Item | Value |
|---|---|
| Deployed commit | `ef346572a1de1974b106900da583ed4e412f27a2` |
| Production `BUILD_ID` | **`Q0DukKVy3o8Idhld4POyk`** |
| Live Next | **16.2.12** |
| Live release directory | `~/mappedskills.com` |
| Live dependency tree | `~/deps/b36d87e127cf/node_modules` |
| Canonical lock SHA-256 | `b36d87e127cf3a3b42f919e3acfa697cf46304f9c8876ab4f737e5cdc534ba3d` |
| Dependency key | `b36d87e127cf` |
| Workflow run | `35376858153` — verify success, release success, **rollback skipped** |
| Deployment record | `6529950216` — success |

## Repository

| Ref | SHA |
|---|---|
| `main` | `ef346572` **plus this documentation-only closure commit** |
| `test_branch` | `ef346572` — deliberately left at the deployed source |
| `backup/main-pre-canonical-64ecf03` | `64ecf0340ca19d1b46b193ecabefbb5acb974661` — **do not delete** |

`main` and the replaced lineage share no history; `main` was replaced under a SHA-pinned
`--force-with-lease` after the recovery branch existed and had been read back. The old lineage's
12 commits remain reachable only through that recovery branch.

## Rollback identity

`~/mappedskills.com.prev` — `BUILD_ID 29BmkWTP3aquUcUXu2KrR`, Next 16.2.6, with **its own**
symlink to the shared cPanel nodevenv tree, plus its `.env` and `app.js`. Application and
dependency tree move together, so the rollback is coherent and needs no rebuild. **It was not
executed.** The shared nodevenv tree was never modified and still holds Next 16.2.6.

To roll back, use the reviewed mechanism only — `release.sh rollback`, or the workflow's
`action=rollback` dispatch with `confirm=ROLLBACK`. Do not improvise rsync/copy/npm recovery.

## Runtime authority

`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `CONTENTFUL_SPACE_ID` and
`CONTENTFUL_ACCESS_TOKEN` are supplied by the **cPanel/LiteSpeed process environment**, confirmed
on the request-serving worker together with `NODE_ENV=production`. **`.env` is a retained,
unchanged fallback — not the sole Contentful authority.** The release carries it byte-for-byte and
never reads, writes or regenerates it. Names only were ever inspected; no value was read.

## Measurement status

`GTM-K8ZQPMXP` is compiled into the deployed bundle and loads GA4 `G-6H7WFH2BHQ` **after consent
only**. Before consent, no third-party script or request is made. Consent Mode defaults deny all
four signals; acceptance grants `analytics_storage` only, leaving `ad_storage`, `ad_user_data` and
`ad_personalization` denied. **Meta Pixel remains inert/off.** No enquiry, conversion or database
row was created during verification. This is the first time analytics has loaded in production.

## Canonical fixes verified live

- Seven commercial routes (`/services`, `/seo`, `/ai-seo`, `/google-ads`, `/social-media-ads`,
  `/conversion-optimization`, `/lead-generation`) each render **exactly one non-empty `<h1>`**.
- Header serves the light-background lockup, footer the dark-background lockup; the legacy
  `/ms_Logo.webp` is unreferenced by the verified homepage.
- 21 required routes plus `/robots.txt` and `/sitemap.xml` return 200; unknown path returns 404;
  Contentful-backed blog and portfolio routes healthy.
- Deployment smoke at 390 / 860 / 1425 px: no overflow, collision, broken image or console error.

## Protected work — do not touch

Both UI stashes remain **unapproved, separate and intact**. They are owner-review candidates and
**not deployment blockers**:

- `c1acf87` — UI-PAGE-REVIEW-2026-09-18
- `b36b243` — UI-REMEDIATION-2026-09-07

Do not apply, pop, drop, rewrite or combine either. `stash@{0}` contains a competing logo
implementation that this reconciliation partly supersedes; expect conflicts in
`components/Logo.tsx`, `lib/metadata.ts` and `components/layout/Footer.tsx` if it is ever applied.

**Phase J remains accepted and is not reopened** (`DEC-022`, `DEC-023`); THE RESOLVE (`DEC-018`)
is unchanged.

## Decisions recorded this session

`DEC-024` main replacement + recovery branch · `DEC-025` dependency-isolated release model ·
`DEC-026` manual dispatch-only deployment with environment approval · `DEC-027` cPanel runtime
authority with `.env` fallback · `DEC-028` first canonical deployment accepted.

## Open / non-blocking

- **Lint backlog** — 21 errors, 7 warnings, all pre-existing; CI reports without blocking. Make the
  lint step blocking once cleared.
- **Revoked Contentful token remains in git history** (absent from the active tree); history
  sanitisation is a separate owner decision.
- Owner content blockers unchanged: `/pricing` facts, the `/how-it-works` real process, the
  conditional manufacturing route.
- No Core Web Vitals, accessibility, real-device or cross-browser measurement was taken.

## For the next operator

1. Read `CLAUDE.md`, then the closure block at the top of `docs/00-project/CURRENT_STATE.md`.
2. Everything below that block is **chronology**, including the 2026-09-18 repository-audit
   correction and the Session 34 acceptance record. Both were true when written; where they
   disagree with the closure block — divergent `main`, `.env` as sole Contentful authority — the
   closure block is authoritative.
3. Deployment is manual: dispatch the workflow on `main`, name the exact commit, and have the owner
   approve the `production` environment. A push to `main` verifies only.
4. A release that changes the lockfile needs its isolated tree prepared first. Never use the
   CloudLinux nodevenv npm for that (see `DEC-025`); the release script prints the safe recipe.
