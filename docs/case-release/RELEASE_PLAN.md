# Case-study release: plan, checklist and owner commands (DEC-117, revised)

Status: LOCAL, release on hold. Nothing committed, pushed, merged, deployed or published. **No write to Contentful**: all access was read-only (public Delivery API, public website GETs, one read-only host check, in-memory rehearsal).

## 1. What each step releases
| Step | Releases | Does not release |
|---|---|---|
| **Code deployment** (merge to main, then workflow dispatch) | the approved page redesigns: /work R2 and the case-study template, the blog, press and research editorial redesign, the case showcase on 7 pages (it shows only studies published today: Om Sai, AnybodyCanBake Google Ads, ClassPe, InsurYo, Ameba), the cookie-banner focus guard, the canonical-domain build check | the 15 new case studies, the new copy and figures of ClassPe, InsurYo and Ameba, the new listing order. ClassPe, InsurYo and Ameba look exactly as they do today until Contentful carries their final copy |
| **Contentful publication** (owner-run tool, `publish`) | the additional case content: 15 new case studies, the final copy of 4 existing ones, listing order 1 to 20; the final artwork and Ameba figures switch on by themselves when an entry's copy is final | any code change |

## 2. Is publication atomic? No.
Contentful publishes **one entry per call**; there is no transaction across entries. The tool treats a release as a sequence and is safe to stop and resume:
- **Order, chosen so every intermediate state is valid:** industries, clients (an entry may only link to published entries), then the 4 existing studies (listing order 2 to 5), then the 15 new studies in listing order 6 to 20. The public listing is therefore always a contiguous 1..n.
- **Resumable:** re-running `publish` re-checks everything first and skips what is already published; a changed or edited entry stops the run before anything is written. Rollback is also sequential and resumable (new studies, highest order first; then the 4 entries back on the snapshot, highest order first; then the new clients and industries) and ends exactly on the snapshot. Nothing is deleted.
- **Verified snapshot:** `snapshot` refuses to save unless the 4 entries are cleanly published; the file's sha256 is printed and can be pinned (`RELEASE_SNAPSHOT_SHA256`); `stage`, `publish` and `rollback` refuse a snapshot that is not clean or whose live entry changed since.
- **Rehearsed offline** against the real live schema and entries with an in-memory Contentful that enforces the link rules: a failure injected at 12 different points of publish and 8 of rollback, then a re-run, always ended valid and complete (tests pass).
- **Content gate (code):** ClassPe, InsurYo and Ameba switch to the final artwork, card copy and figures only when **all six copy fields** (title, summary, problem, what we did, impact, evidence note) equal the approved final copy. One outdated field keeps the gate closed (tested field by field, and through the real mapper).

## 3. When does a published change appear? (evidence, not a promise)
- Evidence: the live site sends `cache-control: s-maxage=60, stale-while-revalidate` and `x-nextjs-cache: STALE` on /work and /portfolio pages; the build's route table shows 1 minute revalidation for /work, /portfolio, the showcase pages and the sitemap; Contentful fetches use a 60-second data cache. There is **no on-demand purge** in the code.
- So a change appears when each page next regenerates: after its 60 s window, the first visitor may still receive the old page (stale-while-revalidate) while the new one is built, and the next visitor gets the new one. Layered caches mean several minutes is plausible; no end-to-end latency has been measured. A page that was a 404 before publication (all 15 new routes) is cached as a 404 for the same window.
- The sitemap is also sent with `max-age=3600`: crawlers may see it up to an hour late.
- Procedure: after `publish`, run `node verify-live.mjs https://mappedskills.com --wait 900` (read-only; polls every 20 s until all checks pass or 15 minutes). If something is still stale after 15 minutes the fallback is a redeploy (the build re-reads Contentful) with your authorisation.
- Before the code deployment the 7 showcase pages are static for a year on the live site; the new build makes them revalidate every minute like the rest.

## 4. Production configuration (checked)
- `CONTENTFUL_CASE_STUDY_NEW_FIELDS`: **confirmed on** by two independent facts. (1) A read-only host check (existing SSH alias, prints a count and permissions only, no values): the live `~/mappedskills.com/.env` has exactly one line `CONTENTFUL_CASE_STUDY_NEW_FIELDS=1`, mode 600. (2) The public `/work/index.json` carries sector, service and period fields and lists ClassPe and InsurYo, which only happens with the flag on. The workflow also builds with `1`.
- Canonical domain: the workflow sets no `NEXT_PUBLIC_SITE_URL`, so it defaults to https://mappedskills.com; `npm run verify:build:production` now fails any canonical off that domain. A CI-equivalent build (no .env, workflow variables only) passes on 43 pages.
- Owner private re-check at any time:
```bash
ssh abcb-staging "grep -c '^CONTENTFUL_CASE_STUDY_NEW_FIELDS=1\$' ~/mappedskills.com/.env"   # prints 1
```

## 5. Final public inventory (20 listed, 21 published with Home Decor)
Order 1 Om Sai Developer (unchanged); 2 ClassPe, 3 InsurYo, 4 Ameba Software, 5 AnybodyCanBake Google Ads (updated, same IDs and URLs); 6 AnybodyCanBake Meta Ads, 7 EKoching, 8 Klenzmo, 9 Bakersville, 10 Phoenix Laundry, 11 HutnHomes, 12 AnybodyCanBake SEO, 13 Advit Prints, 14 Meticulous Business Plan, 15 Libros Library, 16 Bakedemy Google Ads, 17 Bakedemy Meta Ads, 18 Bblewrap, 19 Talreja & Talreja, 20 Wanderlooms (new). Home Decor stays published and unlisted. Entries to create: 15 studies, 13 clients, 7 industries. Exact fields, IDs, sector, service, period and order: `manifest/MANIFEST.md` and `manifest/manifest.json` (sha256 `d062a9f0ee734cc9529ba3f0440c6623a890840e8de04355645bd441289f065a`). Images are repository files (none missing).
Client permission: no blanket requirement is added. Specific documented restrictions that stay in force: the four historical unpermissioned studies remain 404 with reserved routes; Home Decor stays unlisted; the Vibgyor High logo stays blocked (not part of this release). No unresolved claim was found for the 20.

## 6. Commits (prepared, not run)
`docs/case-release/commit-plan/` holds one pathspec list per commit and `run-commits.sh` (not run). Order and verification (each cumulative state type-checks): 1 case-study platform (113 files), 2 editorial redesign (43), 3 case showcase (31), 4 build verification (2), 5 documentation (text records and tools only; 700+ MB of screenshots, recordings and PDFs stay untracked on purpose; `next-env.d.ts` is generated and left out). The code and docs commits are separate.

## 7. Real blockers
**None in the repository.** Owner actions only: provide the Contentful management token when running the tool; authorise each gate below; decide the commit split (proposed above).

## 8. Checklist and owner commands (gates marked A need your authorisation)
The tool is in **`~/g7-release-contentful/`** (a reviewed copy is in `docs/case-release/tool/`). Run from that directory. The token is typed at a hidden prompt.
```bash
cd ~/g7-release-contentful
node --test test/rehearsal.test.mjs            # offline rehearsal, no network writes
node verify-live.mjs https://mappedskills.com --expect before    # read-only baseline: PASSES today
```
| # | Step | Command / who |
|---|---|---|
| A1 | Commit locally | me, after your go: `bash docs/case-release/commit-plan/run-commits.sh` |
| A2 | Read-only check, then create 35 unpublished drafts (live unchanged) | you: `bash run.sh check` then `bash run.sh create` (type `owww06rzpjnj/master`) |
| A3 | Snapshot, then stage the 4 existing entries as drafts (live unchanged) | you: `bash run.sh snapshot` (note the sha256) then `RELEASE_SNAPSHOT_SHA256=<sha> bash run.sh stage-existing runs/<time>-snapshot/snapshot.json` (type `STAGE owww06rzpjnj/master`) |
| A4 | Push, PR, CI verification build, merge to main | me, after your go (ruleset: PR required; approvals were 0, re-check) |
| A5 | Deploy the merged commit (releases the redesigns; content unchanged) | GitHub: Actions > Production release > Run workflow > deploy, confirm = first 7 characters of the commit; approve the `production` environment. Smoke test and automatic rollback are built in |
| A6 | Re-check, then publish the content | you: `bash run.sh check` then `RELEASE_SNAPSHOT_SHA256=<sha> bash run.sh publish runs/<time>-snapshot/snapshot.json` (type `PUBLISH owww06rzpjnj/master`); if it stops part-way, fix the cause and run the same command again |
| 7 | Read-only verification | `node verify-live.mjs https://mappedskills.com --wait 900` |
| 8 | Release record | me: decision log, state files |

Rollback (either side alone): content `bash run.sh rollback-publish runs/<time>-snapshot/snapshot.json` (type `ROLLBACK owww06rzpjnj/master`); code: workflow dispatch, action rollback, confirm `ROLLBACK` (the previous release is kept on the host, no rebuild). A code rollback never exposes old proof and a content rollback never leaves new artwork on old copy.

## 9. Checks run for this candidate
Tests 607 (606 pass, 1 existing skip); `tsc`, ESLint clean on changed areas; offline Contentful rehearsal 5 of 5 (plan, full run, publish failure at 12 points, rollback failure at 8 points, snapshot protection); CI-equivalent production build and `verify:build:production` pass (43 pages); production build on live content leaves the three existing studies unchanged; every commit state type-checks; live read-only baseline passes. Not run: real devices, Safari, Firefox, screen readers.
