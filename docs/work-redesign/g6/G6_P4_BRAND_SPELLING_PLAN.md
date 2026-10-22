> **RECORD STATUS (added 2026-10-22, G6-P8): EXECUTED. Body below is the historical proposal, unaltered.**
> P4-1 and P4-2 were applied and published on 2026-10-22. The study entry went from published version 37 to 39 (the plan
> expected 38; Contentful counts the draft save and the publish separately). Post-checks passed. Authoritative record:
> `DEC-073` in `docs/00-project/DECISION_LOG.md` and `G6_P8_RELEASE_RECORD.md`.

# G6-P4: "AnybodyCanBake" → "AnyBodyCanBake" correction plan

**Status:** PROPOSED. Awaiting owner approval. No Contentful write, publish, code change, commit or deploy was made.
**Date:** 2026-10-22.
**Authority (OWNER REQUIREMENT, 2026-10-22):** brand spelling is **AnyBodyCanBake**. This supersedes the 2026-10-21 "AnybodyCanBake" ruling.

## Method and limits

- **VERIFIED FACT:** Contentful `master`, Delivery API, `locale=*`, all 60 entries, case-insensitive regex `any\s*body\s*can\s*bake` over every
  string in every field. Read-only, run from the production host with its existing delivery token (not printed or copied).
  Live HTML was fetched separately and every rendered occurrence traced to its source. `origin/main` (17276bf) code read via `git show` / `git grep`.
- **LIMIT:** the Delivery API shows published content only. Draft state, the Management `version` numbers and "unpublished edits" are **not yet
  verified**. No Management token is available to this session and none was requested. The guarded tool's `check` mode (owner-run, hidden
  prompt) must establish those before any write.

## A. Source inventory

Study entry `6Ycb7aYvXrslOXKchQnqmi` (caseStudies, slug `google-ads-for-online-courses`, publishedVersion 37). Client entry `4qzD1vSg28WOKWKhCD64Vc` (caseClient).

| # | Entry | Field (locale en-US) | Node path | Text | Spelling | Rendered publicly? |
|---|---|---|---|---|---|---|
| S1 | `6Ycb7aYvXrslOXKchQnqmi` | `content` | block 1 (Problem Statement paragraph), hyperlink child, text node | "AnybodyCanBake" (link text; link URI `https://anybodycanbake.com/`) | **wrong** | **Yes** (see below) |
| S2 | `6Ycb7aYvXrslOXKchQnqmi` | `conclusion` | block 0, paragraph, text node 2 | "…MappedSkills Marketing effectively addressed AnybodyCanBake’s challenges…" | **wrong** | **No.** Withheld by `lib/case-study-proof.ts` |
| — | `4qzD1vSg28WOKWKhCD64Vc` | `clientName` | — | "AnyBodyCanBake, Pune, India" | correct | Yes. **Do not touch** |
| — | `6Ycb7aYvXrslOXKchQnqmi` | `content` | same link | URI `https://anybodycanbake.com/` | a domain, not a brand string | **Do not touch** |

No other entry or field contains the name (no hits in title, slug, industry, size, audience, targetArea, review/testimonial, or any other entry).
The title is "Google Ads for Online Courses", so metaTitle / og:title contain no brand name.

### The eight live occurrences are one source node (S1)

| Live render | Count | Source |
|---|---|---|
| `<meta name="description">`, `og:description`, `twitter:description` in `<head>` | 3 | S1, via `excerptFromDocument(problemStatement)` in `lib/contentful/mappers.ts` (`summary` → `metaDescription`) |
| Body link text in the Problem Statement | 1 | S1 |
| Same four again in the RSC payload | 4 | S1 (duplicate representation) |
| **Total "AnybodyCanBake"** | **8** | **1 source node** |

The 2 "AnyBodyCanBake" in the page are the Client row (HTML + RSC), from the correct `clientName` field.
There is no `metaDescription`/`seo*` field on this entry. The metadata follows the body.

### Pending `main` build (17276bf) and `/work` card

- `/work` card H3 is the first comma-part of `clientName`, which already reads "AnyBodyCanBake". No change needed.
- `/work` card "challenge" text is the first 1–2 sentences of the Problem Statement, so it shows S1 and is fixed by the same edit.
  (Not rendered on the live `/work`, which still has the old design; this was verified from code and the G2 report, not live.)
- The new G6 template is flag-off, and this study stays on the legacy layout. Same source, same fix.
- **Hardcoded repository occurrences of the exact string "AnybodyCanBake" in code:** a comment in `lib/case-study-proof.ts:6` (not rendered)
  and a negative assertion in `tests/work-page.test.cjs:58` (guards against hardcoding; its `/i` flag already matches both spellings).
  **None render.** `components/cplus/seo/content.ts:137` and `tests/seo-page.test.cjs:33` use "Anybody Can Bake" (spaced), on `/seo`.
  That is a different string, **out of scope for P4**, and is an owner decision (the client's own site mostly uses the spaced form).
  No code change is proposed.

## B. Exact correction plan

| ID | Entry · type | Field · locale | Before (span) | After | Replacements | Affects | Publish |
|---|---|---|---|---|---|---|---|
| **P4-1** | `6Ycb7aYvXrslOXKchQnqmi` · caseStudies | `content` · en-US · block 1 · hyperlink text node | `AnybodyCanBake` | `AnyBodyCanBake` | **1** | Body link text, meta/OG/Twitter description, `/work` card challenge | Republish this entry |
| P4-2 (optional) | same | `conclusion` · en-US · block 0 · text node 2 | `…addressed AnybodyCanBake’s challenges…` | `…addressed AnyBodyCanBake’s challenges…` | 1 | **Nothing public** (withheld). Consistency only | Same publish as P4-1 |

Rules for both: replace only the 14-character brand string inside the existing text node. Keep the node structure, marks, hyperlink URI, whitespace and
all other fields byte-identical. No change to slug, title, metrics, testimonial, or `clientName`.

**Recommendation:** P4-1 required. P4-2 optional (the owner's objective is public-facing text; the DEC-031 preservation precedent argues for
leaving withheld text alone, but a later release of the conclusion would then show the wrong spelling). Recommend **include P4-2** so it cannot reappear.

## C. Safety assessment

- **Independent of the G6 website deployment: yes.** The live build and `17276bf` read the same fields the same way. The edit only changes one text
  node. Slug, eligibility (keyed by entry ID) and layout are unaffected, and a republish keeps the study on the legacy template.
- **Revalidation:** `/portfolio/[slug]` and `/work` use ISR with `revalidate = 60`, with stale-while-revalidate. The first request after 60 s is stale
  and triggers the rebuild; the second shows the new content. No redeploy needed.
- **Side effects:** the same study entry will be republished once (publishedVersion 37 → 38). `clientName` is on the linked entry, which is not edited.
- **Risks:** low. Concurrent editors are handled by the X-Contentful-Version check. The G6-P3 corrections are in the Ameba entry and the client's `date`,
  neither of which this change touches.
- **Rollback:** Contentful version history → restore version 37 → publish.

## D. Verification procedure (read-only, after a separately authorised publish)

Pre-write (guarded tool `check` mode, owner-run, hidden token prompt; abort on any mismatch):
1. Read latest versions via the Management API. Confirm the study is published with no pending changes (`version == publishedVersion + 1`).
2. Assert S1 and S2 contain exactly the expected strings, and that the count of "AnybodyCanBake" in the entry is exactly 2 (1 if P4-2 is excluded).
3. Assert G6-P3 intact: Ameba has 0 "TechWave", the client entry's `clientName` equals "AnyBodyCanBake, Pune, India", and `date` is absent.
4. Save before-snapshots outside the repo; print a diff limited to the spelling change; refuse otherwise.

Post-publish:
1. **Contentful:** the same scan as in this report on CDA: 0 "AnybodyCanBake" (excluding nothing); "AnyBodyCanBake" count = 3 (clientName, S1, and S2 if included); the
   link URI unchanged; the study's field diff vs the snapshot is exactly the planned text nodes; study published, no pending edits; all 3 studies published.
2. **Live site:** wait ≥ 60 s, request `/portfolio/google-ads-for-online-courses` twice, and use the second response: HTTP 200; page-source "AnybodyCanBake" = 0;
   "AnyBodyCanBake" = 10 (the 8 renders from S1 plus the Client row ×2); description / og / twitter text starts "AnyBodyCanBake faced challenges"; canonical, slug, title unchanged.
3. **G6-P3 regression:** Ameba page has 0 "TechWave" and shows "Ameba Software’s website"; the April 2016 / Timeline row is absent; the other two studies are unchanged.
4. **Site-wide:** `/work` returns 200 with exactly 3 `/portfolio/` links; `/sitemap.xml` still lists all 3 study URLs and `/work`; all 3 legacy URLs return 200.
5. **`/work` card (pending build):** do not deploy to inspect it. Verify the data source: the Problem Statement first sentence from CDA starts "AnyBodyCanBake"; `clientName` first comma-part = "AnyBodyCanBake". After the G6 release, confirm the card H3 and challenge text.

## E. Documentation conflicts (recommendations only; nothing edited)

| File | Statement | Class | Minimal fix |
|---|---|---|---|
| `g6/G6_P3_CONTENT_CORRECTIONS.md` §1 WK-D4b, C3 row, §4, §6 | Public spelling "AnybodyCanBake"; C3 changes clientName to it; verify "AnyBodyCanBake" count 0 | **Historical.** C3 was *not* applied (the owner kept "AnyBodyCanBake"); the doc's §6 check is now inverted | Add a header note: "WK-D4b / C3 superseded 2026-10-22 (G6-P4): spelling is AnyBodyCanBake; C3 not applied." Keep the body unaltered |
| `g6/G6_D_EXISTING_STUDY_MIGRATION.md` (line 12, §4 line 77, R3) and `r2/`, `r3/` copies | "correct public spelling is AnybodyCanBake"; "Client field must change" | Historical approval | Add a superseded marker to the current copy; leave r2/r3 as history |
| `g6/G6_F_APPROVAL_REGISTER.md` (C-03 and r2/r3 copies) | C-03 "AnyBodyCanBake → AnybodyCanBake" | Historical approval | Mark C-03 SUPERSEDED by the 2026-10-22 owner decision; add a P4 row |
| `g6/G6_E_CONTENTFUL_ARCHITECTURE.md:142` | M3 lists fixing "AnyBodyCanBake" | Stale | Change the M3 wording to "AnybodyCanBake in Problem Statement/conclusion" |
| `work-redesign/g2/WORK_G2_REPORT.md` §4, §7 (WK-D4b) | Says the Client field spelling is the issue | Historical | Footnote: resolved by owner decision 2026-10-22; the Problem Statement is the remaining mismatch (P4) |
| Proposed DEC-073 (not yet written) | Planned to record the 2026-10-21 spelling | Not yet on record | Record **AnyBodyCanBake** (2026-10-22) as the authoritative spelling and cite P4; record the supersession of 2026-10-21 |
| `00-project/ASSUMPTIONS_AND_OPEN_QUESTIONS.md:56`, `handoffs/SESSION_02_*`, `01-business`, `02-research`, `05-content`, `blog-redesign/*`, `14-qa/*` | Mentions of "AnybodyCanBake" as a candidate client / evidence | Historical, factual records | No change. Raw evidence JSON, audits and fixtures must stay as captured |

## F. Approval request

Owner, please authorise, field by field:
1. **P4-1 (required):** entry `6Ycb7aYvXrslOXKchQnqmi`, field `content` (en-US), block 1 hyperlink text: "AnybodyCanBake" → "AnyBodyCanBake" (1 replacement), then publish that entry.
2. **P4-2 (optional, recommended):** same entry, field `conclusion` (en-US), block 0: "AnybodyCanBake’s" → "AnyBodyCanBake’s" (1 replacement), in the same publish.
3. Confirm: no change to `clientName`, the URI `https://anybodycanbake.com/`, the slug, the spaced "Anybody Can Bake" on `/seo`, or any code.
4. Confirm the docs corrections in §E may be prepared (uncommitted) separately.

On approval I will prepare a guarded `check`/`apply`/`post` tool (reusing the G6-P3 pattern) for the owner to run with a hidden token prompt.
