# Google Ads Implementation Plan and Commit Scope — `/google-ads`

**Date:** 2026-10-15 · **Basis:** `DEC-053` (incl. design-approval addendum), storyboard v4, Design Pass Proposal (approved)
**Status (updated 2026-10-16): PARTLY EXECUTED; THIS DOCUMENT IS NOW A HISTORICAL PLAN WITH CORRECTIONS.** The original status read "PROPOSAL. IMPLEMENTATION IS NOT AUTHORISED" (2026-10-15). Since then the owner authorised Track B stage by stage. **Executed on `feat/google-ads-redesign` (pushed, no PR, not merged, not deployed):** G0 `51a79f6`, G0.1 `8711efe`, G1 `b6640ae` (unapproved prototype, replaced after owner review), and **G1 revision 2 `74aec4e`** (owner-approved visually, built from `docs/google-ads-redesign/GOOGLE_ADS_G1_VISUAL_REDESIGN_PROPOSAL_R2.md`). **G1.1** (`1f3b5af`: text floor, chip accessible text, default finding) and **G1.2** (`33940ec`: finding-row border and its guard) followed, each owner-approved and pushed; the branch is now at `33940ec`. **No further gate is authorised:** G2 (motion), pre-release QA, any pull request for the code and any release need the owner's explicit go-ahead. The authoritative record is `DEC-054` in `docs/00-project/DECISION_LOG.md`.

> **Where this plan is superseded.** §§3 to 6 describe the original G1 (a text-led static composition) and a seven-block page. The built page has **eight sections**, different copy structure and different components, per the owner-approved R2 proposal. The guard test is `tests/google-ads-copy.test.cjs` (structural, extended through R2), not `tests/google-ads-page.test.cjs`. Read §§3 to 6 as history. Corrections to the facts in §1 are marked inline below.

---

## 1. Repository facts that shape the plan (verified 2026-10-15)

| Fact | Evidence | Consequence |
|---|---|---|
| Current branch `feat/seo-page-redesign` is `main` (`52ecdae`) plus **16 unmerged commits** (SEO redesign, home and services copy work) **[Corrected 2026-10-16: the SEO redesign and the home and services copy work were merged into `main` (PRs #6, #7, #8); that branch is superseded.]** | `git rev-list main..HEAD` = 16; `HEAD..main` = 0 | Google Ads work must **not** be stacked on this branch or mixed into the SEO review |
| Shared C+ files are **identical** between `main` and the SEO branch (`cplus.css`, `Interactive.tsx`, `primitives.tsx`, `direction-c.css`, `globals.css`) | `git diff main HEAD --stat` on those paths: empty | The Google Ads branch can start from `main` and be independent of the SEO branch |
| `DECISION_LOG.md` differs from `main` only by my `DEC-053` entry (+ addendum) **[Updated 2026-10-16: DEC-053 and its addendum are on `main` (PR #9, `e7bdc6a`)]** | `git diff main --stat` | The decision-log change can be carried to a docs branch cleanly |
| Uncommitted today: `docs/00-project/DECISION_LOG.md` (modified); `docs/google-ads-redesign/` (untracked). `docs/seo-redesign/` is untracked and **belongs to another work stream** | `git status` | Commit only the first two; leave `docs/seo-redesign/` alone |
| `main` is protected: changes arrive by pull request with a non-self approval; deploys are dispatch-only (R0, PR #3 merged) **[Corrected 2026-10-16: the "Protect main" ruleset requires a pull request but has required **0 approving reviews** since 2026-10-15 (ruleset history: approvals 1 → 0 at 13:39Z, last-push approval removed at 15:04Z, both by the owner account). PR #9 was merged by the owner account with no review. This was a statement made from memory and not checked against the live ruleset; the ruleset change is not recorded in the decision log (see DEC-054). Deploys remain dispatch-only and the `production` environment still requires reviewers.]** | Memory notes; `DEC-052` | Nothing reaches production without a pull request, the dispatch-only workflow and the production-environment reviewer, and a separate release decision |
| Open PR: `fix/package-lead-export` (#5) | `gh pr list` | Unrelated; do not touch |
| Existing guard-test precedent: `tests/seo-page.test.cjs`; `npm test` runs `node --test tests/*.test.cjs` | `package.json` | Add `tests/google-ads-page.test.cjs` in the same style |
| Page route already exists with metadata and `BreadcrumbJsonLd` | `app/(pages)/google-ads/page.tsx` | The route file needs no functional change |

---

## 2. Proposed commit scope — two separate tracks

### Track A · Documentation commit (can be approved now, independent of implementation)

| Item | Detail |
|---|---|
| **Branch** | `docs/google-ads-dec-053`, created from `main` (the working-tree changes carry across because `main` and HEAD agree on the log's base) |
| **Files** | `docs/00-project/DECISION_LOG.md` (DEC-053 + addendum); `docs/google-ads-redesign/GOOGLE_ADS_COPY_AND_VISUAL_STORYBOARD.md` (v4) and `_v1.md`, `_v2.md`, `_v3.md`; `GOOGLE_ADS_DESIGN_PASS_PROPOSAL.md`; `GOOGLE_ADS_IMPLEMENTATION_PLAN.md` |
| **Explicitly excluded** | `docs/seo-redesign/` (other stream); any source, config or lock file; screenshots |
| **Message** | `docs: record the Google Ads copy, scope and design decisions (DEC-053)` + attribution trailer |
| **Route to main** | Pull request, reviewed and approved by a non-author per the branch ruleset. No merge by me |
| **Risk** | None to the site: documentation only |

*Optional, owner's choice (not included above):* annotations to `SERVICE_ARCHITECTURE.md` §6, `google-ads.md`, `PAGE_COPY_AUDIT.md`, `CLAIMS_LADDER.md`, `TERMINOLOGY_DICTIONARY.md` as recommended in storyboard §9. Proposed as a **separate** docs commit so it can be rejected independently.

### Track B · Implementation (needs separate authorisation)

| Item | Detail |
|---|---|
| **Branch** | `feat/google-ads-redesign`, created from `main` (after Track A merges, or from `main` directly; it does not need Track A's files to build) |
| **Not based on** | `feat/seo-page-redesign` |
| **Files to modify** | `components/cplus/google-ads/content.ts` (replace with v4 copy); `components/cplus/google-ads/GoogleAdsBody.tsx` (seven blocks); `components/cplus/google-ads/google-ads.css` (receipt change, lane grid, dashed variant, steps, motion) |
| **File to add** | `tests/google-ads-page.test.cjs` |
| **File to touch only if needed** | `app/(pages)/google-ads/page.tsx` — no functional change planned; metadata, `BreadcrumbJsonLd`, path and canonical stay byte-identical |
| **Files that must NOT change** | `components/cplus/Interactive.tsx` (reuse `Tabs`), `components/direction-c/primitives.tsx` (reuse `ActionPair`, `QuestionRows`, `FindingRows`, `ScopeRows`), `components/cplus/cplus.css`, `app/globals.css`, `app/direction-c*.css`, `lib/metadata.ts`, nav, sitemap, JSON-LD helpers, analytics, consent, any other page, `package.json`, `package-lock.json`, env files |
| **Dependencies / events** | None added |
| **Documentation at close** | `CURRENT_STATE.md` entry and a short `docs/google-ads-redesign/BUILD_REPORT.md` — documentation commit, proposed after verification |
| **Evidence screenshots** | Kept **outside** the branch (as in `DEC-052`'s lean policy); referenced by path in the build report |

---

## 3. Work packages and commits on `feat/google-ads-redesign`

Small, reviewable commits that follow the SEO precedent (static composition, then motion, then guards). Each ends in a green local check set and an owner stop.

| # | Package | Contents | Commit message (conventional) | Stop |
|---|---|---|---|---|
| **G0** | Copy | `content.ts` replaced with the v4 copy, structured per block; no markup change yet | `copy(google-ads): management, oversight and agreed-separately copy (DEC-053)` | Owner may diff copy against storyboard v4 |
| **G1** | Static composition | `GoogleAdsBody.tsx` and CSS for all seven blocks, **no motion**: hero + receipt (4th line, dashed footer), `QuestionRows` factors, Path Figure inside `Tabs` (static panels), three-layer scope, ledger via `ScopeRows numbered`, findings via `FindingRows`, six-step list, `ActionPair` | `feat(google-ads): static composition for the seven approved blocks` | **Owner visual review of screenshots (desktop, tablet, mobile, no-JS)** |
| **G2** | Motion | Receipt print-in (CSS keyframes, no-preference only), Path Figure draw and state transitions, findings arrows, standard reveals via `data-rv` | `feat(google-ads): purposeful motion for receipt, path and findings` | Owner review of reduced-motion and no-JS states |
| **G3** | Guards | `tests/google-ads-page.test.cjs` asserting the points in §5 | `test(google-ads): guard H1, scope boundary, single use of conversion and unchanged metadata` | — |
| **G4** | Fixes | Anything found in QA (one commit per defect class) | `fix(google-ads): …` | — |

If `Tabs` proves unsuitable at G1 (panel layout, pill legibility on ink, per-panel draw-in), I stop and ask before writing a bespoke client component; that is a scope change.

---

## 4. Implementation details by block (what changes in code)

| Block | Markup | CSS | Reuses |
|---|---|---|---|
| 1 Hero | `S.h1`, two `b-lede` paragraphs, `ActionPair`, receipt with 4th line and `.ga-sep` footer; retire `.ga-side` | `.ga-sep` (dashed card), print-in keyframes | `b-hero*`, `.ga-rc*`, `.ga-tag*` |
| 2 Factors | `QuestionRows` (visible, not collapsed) | Paper-surface spacing | `QuestionRows`, `InlineLink` |
| 3 Path Figure | `Tabs` with four server-rendered panels; shared lane-grid markup | `.ga-path*`, break marker, who-acts strip, mobile vertical layout | `Tabs`, `.ga-tick`, `.ga-label` |
| 4 Scope | Three groups, third `.is-sep` | Ground-surface variants of `.ga-group*`; dashed outline; tear kept | `.ga-groups`, `.ga-vtear` |
| 5 Accountability | `ScopeRows numbered` + `.ga-limit` for the qualification | Tick variant | `ScopeRows`, `.ga-limit` |
| 6 Reporting | `FindingRows` + monthly strip + `.ga-limit` note | Arrow pseudo-element, strip | `FindingRows` |
| 7 Close | Two start cards, `.ga-steps` list, `ActionPair` | `.ga-steps` | `b-close`, `ActionPair` |

Section surfaces and order exactly as in the design pass: ground, paper, ink, ground, paper, ground, ink.

---

## 5. Content-guard test (G3) — what it will assert

1. H1 is exactly "We run your ads. We look beyond the click."; kicker "Google Ads"; the two supporting paragraphs verbatim.
2. Metadata unchanged: title `Google Ads Measured on the Enquiries, Not the Clicks | MappedSkills`, the current description, path `/google-ads`, `<BreadcrumbJsonLd label="Paid search" path="/google-ads" />`.
3. "agreed separately" present for the receipt footer, Block 4, Block 5 and findings row 3; Path Figure cases 2 and 3 carry the separate-agreement marker.
4. The word "conversion" occurs **exactly once** in customer-facing copy.
5. No "ROI", "return on", "guarantee", "free", digits-as-figures in copy (apart from step numbers), "response time", or "call length".
6. The seven blocks exist in order; one H1; no extra sections.
7. Both CTAs present: `/contact` and `/schedule-call`.
8. `Interactive.tsx` and `primitives.tsx` are imported, not modified (checked by path, not by diff).
Each assertion is a code check; I will report only what I actually ran.

---

## 6. Verification plan (run before any request to merge)

| Check | How | Reported as |
|---|---|---|
| Typecheck, lint, unit tests | `npm run typecheck`, `npm run lint`, `npm test` | Pass/fail with output |
| Builds | `npm run build`, `npm run build:cpanel`, `npm run verify:build` | Pass/fail |
| Served head identical | Compare title, description, canonical, robots, Open Graph, JSON-LD against production/`main` | Diff result |
| Visual | Browser pane at 320, 375, 430, 768, 1024, 1440 px; screenshots stored outside the repo | Screenshots for owner |
| Behaviour | Tab selection, who-acts markers, keyboard (arrows/Home/End), both CTAs resolve | Observed results |
| Fallbacks | Reduced-motion emulation; JavaScript disabled; print | Observed results |
| Accessibility | Automated checks in available engines; text-spacing override; forced colours; heading outline | Findings list |
| Performance | CLS and LCP before/after on the page; font-loading profiles (OBS-19/20) | Numbers measured, with method |
| Analytics and consent | Confirm no new events/requests | Result |
| Not covered by me | Real-device screen readers (SR-1 – SR-5), E1 real devices, real Calendly availability | Listed as outstanding |

Tests are never described as passed unless run.

---

## 7. Release path (separate, later)

1. PR from `feat/google-ads-redesign` to `main`; non-author approval required; I do not merge.
2. A release decision and dispatch under the R0 workflow, separately authorised.
3. Release prerequisites carried from the programme: SR-1 – SR-5, E1, consent/analytics regression, owner screenshot sign-off, Calendly confirmation.
4. Post-release only: Search Console research for the H1 (`DEC-053` §F-4). No evidence exists yet.

---

## 8. Risks specific to implementation

| Risk | Handling |
|---|---|
| `Tabs` unsuitable for the lane grid | Prototype in G1; stop and ask before building a bespoke component |
| Ground-surface use of scope classes written for ink | Contrast checks on every new pairing; reuse tokens only |
| Receipt print-in affecting LCP | Animate only `opacity`/`transform`, ≤ ~1 s; measure |
| Firefox / Slow-4G font reflow on a two-sentence H1 | Check widows at 320–430 px; compare CLS to the B-series baselines |
| Copy drift implying automatic fixes | Guard test + owner diff at G0 |
| Scope creep into other pages (pricing, services, FAQ) | Out of scope by `DEC-053`; separate decisions |
| Mixing with the SEO branch | Separate branch from `main`; shared files are identical, so no conflict expected |

---

## 9. Approvals requested (answer individually)

1. **Track A:** approve committing the documentation set (files and message above) to `docs/google-ads-dec-053` and opening a PR. *Yes / No / change scope.*
2. **Track A optional:** approve the documentation annotations (storyboard §9) as a separate docs commit. *Yes / No / which ones.*
3. **Track B:** authorise implementation on `feat/google-ads-redesign` from `main`, limited to the files in §2. *Yes / No.*
4. **Stops:** confirm owner review stops after G0 and after G1 (screenshots) before motion (G2) begins.
5. **Evidence:** confirm screenshots stay outside the repository.
6. **Governance:** confirm I should record a `DEC-054` for implementation authorisation when you give it.

**STOP.** Nothing in this plan has been executed. Awaiting your approvals.
