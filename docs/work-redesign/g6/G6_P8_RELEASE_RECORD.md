# G6-P8 — Release record and documentation reconciliation (`DEC-073`)

**Date:** 2026-10-22. **Status:** documentation only. No code, configuration, dependency, Contentful or production change.
**Authoritative decision:** `DEC-073` in `docs/00-project/DECISION_LOG.md`.

## 1. Release identity (VERIFIED FACT unless noted)

| Item | Value | Source |
|---|---|---|
| Repository | `digibilityai/MappedSkills` | `gh` |
| Release commit | `17276bf8c8a70f31d88a7e4240cd8022f008161b` (PR #41 squash merge) | `gh pr view`, run `headSha` |
| Deployment run | `39713297875` ("Production release", `workflow_dispatch`, created 2026-10-22 02:47:23Z) | `gh run view` |
| Jobs | Verify and build artifact: success. Release to production: success (finished 02:57:42Z). Roll back: skipped | `gh run view` |
| Production environment gate | Approved by `digibilityai`. Deployment record `7242506248` | `gh api …/approvals`, `…/deployments` |
| Production build ID | `wMkS0ZyN-QeL52oN480S_` | run log: `BUILD_ID`, "staged release verified", "swapped: live=…" |
| Previous live build / rollback target | `OepyJ3b8W8Aq4Au79t0mr` (`1ac9827`). Logged as `previous=` at the swap. Not used | run log; `DEC-072` |
| Smoke test | Passed: readiness `/` 200 on attempt 1; `/`, `/services`, `/seo`, `/contact`, `/contact?intent=call`, `/thank-you`, `/robots.txt`, `/sitemap.xml` 200; `/schedule-call` 308 → `/contact?intent=call`; unknown page 404 | run log |
| Contentful space / environment | `owww06rzpjnj` / `master` | owner-run tool arguments |
| Feature flag | `CONTENTFUL_CASE_STUDY_NEW_FIELDS` **OFF** (Option A) | OWNER REQUIREMENT / release decision; not set in CI. Host `.env` not re-read in this task |
| Post-deployment verification | PASS (G6-P7 report; see §4) | Owner brief for this task. The G6-P5 and G6-P7 report files were not available to this session |

### Merges in the released range (`1ac9827..17276bf`), all by `digibilityai`

| PR | Merge commit | Merged (UTC) | Content |
|---|---|---|---|
| #39 | `d9ff3e4` | 2026-10-21 08:08:42 | Docs: `DEC-072` release record |
| #40 | `a57fc25` | 2026-10-21 09:53:10 | `/work` redesign |
| #41 | `17276bf` | 2026-10-21 17:10:25 | Simplified G6 case-study frontend and eligibility, flag off by default |

`main` push CI for `17276bf`: run `39641411182`, success. `origin/main` was still `17276bf` when this record was written.

## 2. Contentful work before the release (VERIFIED FACT, owner-run guarded tools, `master`)

| Package | When | What changed | Result |
|---|---|---|---|
| Schema migration | 2026-10-21 | `caseStudies` content type: 12 of 12 planned changes, additive. New optional `summary`, `problem`, `whatWeDid`, `impact`, `evidenceNote`, `showTestimonial`. `slug` gained a pattern rule next to `unique`. `size`, `audience`, `targetArea`, `review` made optional. Content type version 18, published 17. 7 entries: 3 published legacy studies, 4 drafts, all untouched | Post-check passed |
| **G6-P3** | 2026-10-22, before the release | Ameba entry `4DpPjLCWdakD6tBmZNMnko`: "TechWave Solutions" → "Ameba Software" (Strategy and Tactics) and "Ameba Softwares’" → "Ameba Software’s" (Challenges). Published version 39 → 41. Client entry `4qzD1vSg28WOKWKhCD64Vc`: timeline `date` ("April - 2016") cleared; published version 4 → 6. `clientName` unchanged | Contentful post-check passed; live verification passed |
| **G6-P4** | 2026-10-22, before the release | Study entry `6Ycb7aYvXrslOXKchQnqmi`: two text replacements, "AnybodyCanBake" → "AnyBodyCanBake" in (a) the Problem Statement hyperlink display text and (b) the conclusion. Published version 37 → 39 | Contentful post-check passed |

P3 and P4 both ran before the release dispatch (run-folder timestamps 07:38 and 08:03 IST, against a dispatch at 02:47Z).

**G6-P4 detail.** The official spelling is **AnyBodyCanBake**.
- The hyperlink destination (`https://anybodycanbake.com/`), the slug, the case-study URL, `clientName`, the title and all
  other fields are unchanged. Post-check: 0 wrong spellings left in the entry, 2 correct spellings in the entry,
  hyperlink URI unchanged, slug unchanged, `clientName` unchanged, client has no date, Ameba P3 intact, inventory intact.
- **The conclusion is withheld and is not public.** `lib/case-study-proof.ts` stops it from rendering. It was corrected
  for consistency only.

**Source edits versus rendered occurrences.** These are different counts:
- *Source:* one visible text node (the Problem Statement link text) plus the withheld conclusion, plus `clientName`,
  which was already correct.
- *Rendered:* the Problem Statement node appears 8 times in the page (meta, Open Graph and Twitter descriptions, the body
  link, and the same four again in the Next.js payload). The Client row adds 2 (HTML and payload). Total 10.

## 3. Owner authorisations and gates (OWNER REQUIREMENT, in order)

Quotations are not reproduced where the source text was not available to this session. The facts below are as stated in
the project's earlier records and in the owner brief for this task.

1. 2026-10-21: `/work` G1 R3 approved (filter hidden, year removed); G2 implemented; PR #40 merged. Release held (G5 audit: NO-GO pending WK-D4 and WK-D7).
2. 2026-10-21: owner fact that MappedSkills or its team did the AnybodyCanBake work (resolves WK-D7 "who").
3. 2026-10-21: owner dropped the signed-approval design; the simplified six-field G6 design was adopted. Staging then master migration were owner-run.
4. 2026-10-22: owner approved G6-P3 (C1, C2, C4b) and kept `clientName` as "AnyBodyCanBake, Pune, India" (C3 not applied).
5. 2026-10-22: owner ruled the brand spelling is **AnyBodyCanBake**, superseding the 2026-10-21 "AnybodyCanBake" ruling; approved G6-P4.
6. 2026-10-22: the release of `17276bf` (Option A, flag off) was dispatched and the `production` environment gate was approved from the owner account `digibilityai` (VERIFIED in GitHub). The wording of the owner's deployment authorisation was not available to this session and is not quoted.

## 4. Verification

- **Release run:** §1.
- **G6-P7 post-deployment verification: PASS** (owner brief). Reported results for the AnyBodyCanBake study page:
  0 "AnybodyCanBake"; 10 rendered "AnyBodyCanBake"; correct SEO descriptions; the three published legacy studies
  accessible; the four drafts remain unpublished.
- **Independent read-only spot check for this record (2026-10-22, public pages, GET only):** `/work` 200 with exactly
  3 `/portfolio/` links; the two studies fetched return 200; AnyBodyCanBake page: 0 "AnybodyCanBake", 10 "AnyBodyCanBake";
  Ameba page: 0 "TechWave". This is a count check, not a repeat of P7.
- **Not tested, still open:** see §6.

## 5. Documentation reconciliation

### 5.1 Contradictions found

| Statement | Where | Status |
|---|---|---|
| Public spelling "AnybodyCanBake"; change `clientName` to it (WK-D4b, C3) | `G6_P3_CONTENT_CORRECTIONS.md`; `G6_D_EXISTING_STUDY_MIGRATION.md` (incl. R3); `G6_F_APPROVAL_REGISTER.md` C-03 (incl. r2, r3); `WORK_G2_REPORT.md` §4, §7 | **SUPERSEDED** by the 2026-10-22 owner ruling. C3 was not applied |
| M3 lists fixing "AnyBodyCanBake" | `G6_E_CONTENTFUL_ARCHITECTURE.md:142` | Stale. The text that needed fixing was "AnybodyCanBake" in the Problem Statement and conclusion |
| Proposed `DEC-073` for the `/work` G1–G2 record, and G6 as `DEC-074` | `G6_F_APPROVAL_REGISTER.md`, r2, r3 | Resolved: `DEC-073` now records the whole `/work` and G6 programme through its release |
| Option B (flag on), nine-field and signed-approval designs | G6-E, G6-F r2/r3, TF-01, S1, S2 | Historical. The simplified six-field design with the flag off is what shipped |

### 5.2 Disposition

| Document | Action |
|---|---|
| `DECISION_LOG.md`, `CURRENT_STATE.md` | **Updated** (`DEC-073`; current-state block) |
| `G6_P3_CONTENT_CORRECTIONS.md`, `G6_P4_BRAND_SPELLING_PLAN.md` | **Added** with an executed/superseded banner. Bodies unaltered, so history is intact |
| `G6_P8_RELEASE_RECORD.md` | **New** (this file) |
| `G6_SIMPLIFIED_MIGRATION_PACKAGE.md`, `simplified/`, S2-R1, S2B | Already on `main`. Remain historical; unchanged |
| `G6_A`–`G6_F`, `r2/`, `r3/`, TF-01 reports, S1, S2 | **Kept local, not published.** Pre-simplification proposals. They name clients that are not approved for publication and contain unevidenced figures and draft client material. They need a "superseded" marker locally, listed in §5.1; the owner's working copies were not edited |
| `G6_P1_PRODUCTION_MIGRATION_PLAN.md`, `G6_P2_RELEASE_READINESS_AUDIT.md`, `simplified/production/` | **Kept local** (uncommitted on another local branch). P2 contains host paths and operational detail not suited to a public record. Its release-relevant conclusions are in `DEC-073` |
| `WORK_G2_REPORT.md` and `/work` G1 notes | **Kept local.** Needs a footnote that WK-D4b was resolved on 2026-10-22 (spelling) and WK-D4/WK-D7 were closed by the P3 and P4 work |
| Run folders `~/g6-simplified-runs/`, Contentful before/after snapshots, owner-run tool folders | **Outside the repository.** They hold content snapshots. They were not copied |
| Historical mentions in `ASSUMPTIONS_AND_OPEN_QUESTIONS.md`, `handoffs/`, `01-business`, `02-research`, `05-content`, `blog-redesign/`, `14-qa/` | Unchanged. Factual records of what was captured, including raw evidence |
| Spaced "Anybody Can Bake" on `/seo` (`components/cplus/seo/content.ts`, `tests/seo-page.test.cjs`) | Unchanged. A different string, out of scope. Owner decision if it should match |

## 6. Follow-up tasks (NOT done; no evidence they passed)

1. Real-device mobile testing of `/work`, `/portfolio/*` and the new case-study layout.
2. Screen-reader accessibility testing of the same.
3. GTM verification (Tag Assistant / consent behaviour) on the released pages.
4. Extend the deployment smoke test in `.github/workflows/deploy.yml` to cover `/work`, `/portfolio` and `/blog`. Their failure mode is silent (an empty Contentful response renders zero studies). Needs its own authorised change.
5. Local housekeeping: add "superseded" markers to the local G6-D, G6-E, G6-F (and r2/r3) and `WORK_G2_REPORT.md` as listed in §5.1.
6. Before any new-layout study is published: client permission, evidence and editorial approval; Option B would also need a host `.env` change and a `deploy.yml` change. Neither is part of this release.
7. `DEC-073` and this record are in a docs PR that is **not merged**. Merge needs owner authorisation.
