# MappedSkills UI Revamp — Gate 4: Master Rollout Plan

| | |
|---|---|
| **Date** | 2026-10-08 |
| **Role** | Principal Frontend Architect / UX Design Director / Accessibility Lead / Release Planning Lead |
| **Status** | **PLANNING ONLY — Gate 4 NOT STARTED.** No application code, content, analytics, workflow or dependency was changed. Nothing was committed, pushed, merged or deployed |
| **Authority** | `DEC-036` satisfies the Gate 3 prerequisite for Gate 4 planning and controlled local implementation. **Gate 4 begins only on a separate owner instruction** |
| **Gate naming** | UI-revamp Gate 4 (global workstreams). Not `QUALITY_GATES.md` Gate 4 |

## Document set

| # | Document | Answers |
|---|---|---|
| 1 | **This file** | Executive summary, baseline verification, risks, owner decisions, first implementation prompt |
| 2 | `GATE_4_ROUTE_MIGRATION_MATRIX.md` | Every route: category, structure, conversion, interactivity, SEO, analytics, a11y, complexity, treatment |
| 3 | `GATE_4_DESIGN_SYSTEM_ARCHITECTURE.md` | Global primitives, section components, route registers; fonts; legacy → Direction C mapping |
| 4 | `GATE_4_CHROME_MIGRATION_STRATEGY.md` | `ChromeSwitch` analysis, strategies, recommendation, LIVE-1 options |
| 5 | `GATE_4_MOTION_SPECIFICATION.md` | Motion layers, rules, signature moments, safeguards, library policy |
| 6 | `GATE_4_QA_ACCEPTANCE_MATRIX.md` | Protection matrix, test levels, viewport/mode coverage, E1/E6 plans |
| 7 | `GATE_4_IMPLEMENTATION_SEQUENCE.md` | Batches B0–B11 with dependencies, checks, owner reviews and rollback |

---

## 1. Executive summary

**The system is ready to extend; the site is not one system yet.** Direction C was built in Gate 2 as an isolated, reusable
layer, and it is approved on `/`, `/services` and `/seo` (`DEC-036`). The remaining 25 route templates run on two older systems:
21 on the pre-revamp Resolve components (including the 404 page and the internal `/launch-checklist`), whose vocabulary maps
almost one-for-one onto Direction C, and **4 on a pre-Resolve legacy system** (`/blog/[slug]`, `/portfolio/[slug]`,
`/privacy-policy`, `/terms`), which needs rebuilding.

**Recommended approach.**
1. **Chrome first, as one atomic flip.** Make the approved Direction C header and footer global by inverting `ChromeSwitch` into
   an empty deny-list (strategy S3). This gives one navigation vocabulary at once, which honours D4 ("one name per destination"),
   and removes the legacy sticky header from the branch. Delete the seam last (B11), so a rollback is always one line.
2. **Bodies by register, in small batches.** Group routes by communication purpose ("registers"), not by one template. Order:
   lowest design risk → highest:
   - capability pages, in two batches;
   - decision pages;
   - trust and method pages;
   - conversion pages, after the GTM audit;
   - editorial pages;
   - the blog article;
   - proof pages;
   - legal and utility pages;
   - cleanup.
3. **Build a component only with its first consumer.** Eleven new section components are needed (a table, a figure frame,
   entry rows, prose, form fields, …). Everything else is reuse.
4. **Motion stays restrained.** No library. Reveals animate graphic parts only, never text. The one approved signature moment is
   the homepage. A second, the measured-chain on `/how-it-works`, is proposed for owner approval.
5. **QA first.** B0 turns the three-route Gate 2–3 scripts into route-parametric checks and captures a full-site baseline
   **before** any application change, so that "nothing protected changed" can be proven route by route.

**Recommended first implementation batch: B0 + B1.** B0 builds the QA harness and captures baselines; B1 is the global chrome
flip, **chrome only, no page bodies**. It is the smallest code change in the programme (≈10 lines across two files) with the
widest effect, and it unblocks every later batch. The proposed prompt is in §8.

---

## 2. Baseline verification (VERIFIED, 2026-10-08)

| Item | Expected (brief) | Found | Result |
|---|---|---|---|
| Branch | `ui-revamp` | `ui-revamp` | ✅ |
| Application commit | `23c937d` | `23c937d feat(ui-revamp): approve Direction C implementation on three routes` | ✅ |
| Governance commit | `352bb25` | `352bb25 docs(ui-revamp): close Gate 3 with approved decisions and QA evidence` (HEAD) | ✅ |
| `DEC-036` | recorded | `DECISION_LOG.md:668`, "APPROVED WITH RECORDED EXCEPTIONS"; conditions E1, E6; Gate 4 begins only on separate instruction | ✅ |
| Working tree | clean apart from approved exclusions | only `?? docs/ui-revamp/gate-2/screenshots/app/`. This is the `DEC-036` exclusion, retained locally by design | ✅ No discrepancy |
| `LIVE-1`, `LIVE-2`, `PROC-1` | OPEN | OPEN (`PROGRAMME_RISKS_AND_LIVE_ISSUES.md`) | ✅ |
| Production | untouched | not inspected in this phase. No deploy was attempted | — |

Context read: `CLAUDE.md`; `CONTEXT_INDEX.md`; `CURRENT_STATE.md` (UI revamp blocks); `DECISION_LOG.md` (`DEC-029`–`DEC-036`);
Master Handoff; Implementation Plan (Gates 4–9); `GATE_0_BASELINE_AUDIT.md` (§§4, 9, 12, 14, 16, 17); `GATE_2_IMPLEMENTATION.md`;
`GATE_3_FINAL_ACCEPTANCE.md`; `GATE_3_REMEDIATION.md` (X1–X9); `QA_REGRESSION_RUNBOOK.md`; `PROGRAMME_RISKS_AND_LIVE_ISSUES.md`.
Code read: `app/layout.tsx`; every `page.tsx` and `not-found.tsx`; `app/sitemap.ts`; `next.config.mjs` redirects;
`components/direction-c/*`; `app/direction-c*.css`; legacy `Header.tsx`; footers; `lib/analytics.ts`; the `ContactForm`,
`BookingLink` and `StickySidebarCTA` headers; and the QA scripts' route lists.

---

## 3. Repository findings that shape the plan

| # | Finding | Consequence | Label |
|---|---|---|---|
| R-1 | 28 rendered templates (27 `page.tsx` incl. `app/page.tsx`, + 404); 3 Direction C, 21 Resolve, 4 legacy. The 21 Resolve templates include the 404 page and the internal `/launch-checklist` | Two migration kinds: translation (Resolve) and rebuild (legacy) | VERIFIED |
| R-2 | Direction C and Resolve share palette roles and the heading model (`h2` label + `p` statement) | Heading sequences can stay identical through migration | VERIFIED |
| R-3 | `ChromeSwitch` is a 28-line client component, exact-match allow-list, SSR-correct; its only consumers are two lines in `app/layout.tsx` | Safe to invert; safe to delete later | VERIFIED |
| R-4 | Direction C chrome already renders under the full global legacy stylesheet | Chrome isolation is proven; only adjacency to legacy bodies is new | VERIFIED |
| R-5 | Analytics emitters are two components (`ContactForm`, `BookingLink`); everything else is path-based `page_view` | Only B6 is analytics-sensitive in the DOM; GTM DOM triggers remain unknown (E6) | VERIFIED / RESEARCH REQUIRED |
| R-6 | Structured data comes from **three** breadcrumb sources, page-local blog/FAQ/legal schema, `ResearchReport`, `NewsArticle` | Every batch diffs JSON-LD byte-for-byte; trail builders are not merged | VERIFIED |
| R-7 | CMS templates render empty locally without Contentful credentials | B7–B9 need a credentialed QA build or fixtures | VERIFIED |
| R-8 | Display-font fallbacks are calibrated to the three approved routes' exact strings | Every batch re-checks above-fold reflow; port `sweep.cjs` | VERIFIED |
| R-9 | Both Bricolage files load on Direction C routes (139 KB of fonts) | Font consolidation decision at B11 | VERIFIED |
| R-10 | `resolve-motion.css` (558 lines) is still imported globally, but serves the retired homepage | Cleanup candidate (B11) | VERIFIED import / WORKING HYPOTHESIS no consumer |
| R-11 | All portable QA scripts hard-code `['/', '/services', '/seo']` | B0 must parametrise them | VERIFIED |
| R-12 | No motion library in `package.json` | Keep it that way unless evidence requires otherwise | VERIFIED |

---

## 4. Proposed rollout (summary)

| Phase | Batches | Routes | Workstreams |
|---|---|---|---|
| **Foundation** | B0 | — (harness, baselines) | QA |
| **Chrome** | B1 | all (chrome only) | 4D |
| **Commercial core** | B2 → *E1-a* → B3 → B4 | 7 capability/decision routes | 4A–4C, 4E, 4F, 4H |
| **Trust and conversion** | B5, B6 | 6 routes | + 4G (FAQ, method), forms |
| **Editorial and proof** | B7, B8, B9 | 9 templates (CMS) | + 4G proof |
| **Utility** | B10 | legal, 404, internal | 4F |
| **Consolidation** | B11 | — | cleanup, fonts |

Details, dependencies, checks and rollback: `GATE_4_IMPLEMENTATION_SEQUENCE.md`.

---

## 5. Open risks — resolved here or carried forward

| Ref | Status after this plan | Treatment |
|---|---|---|
| **E1** real-device / cross-browser QA | **Carried forward, unchanged** (mandatory before staging) | Early **E1-a** checkpoint after B2 (shared chrome + first bodies), rolling E1-b after B6/B8, full **E1-c** before staging. Add a Playwright WebKit/Firefox engine run to the harness as a proxy (not a substitute) |
| **E6** GTM triggers | **Carried forward, unchanged** (mandatory before staging) | Owner provides container access; trigger audit + GTM Preview; **recommended before B6 acceptance** (`GATE_4_QA_ACCEPTANCE_MATRIX.md` §7) |
| **LIVE-1** legacy mobile header | **OPEN; not resolved by this plan** | Options L1–L4 in `GATE_4_CHROME_MIGRATION_STRATEGY.md` §6. Recommended: L3 (minimal hotfix + B1), conditional on how a hotfix reaches production under PROC-1. B1 does **not** close LIVE-1 |
| **LIVE-2** locked legacy copy | **OPEN; preserved** | The `/` headline and the `/work` sentence are carried verbatim through B1 and B9 unless the owner separately authorises correction wording |
| **PROC-1** push to `main` deploys | **OPEN** | No merge into `main`. Every batch commits locally on `ui-revamp` only. PROC-1 also constrains LIVE-1 option L1 |
| X2 Android fallback, X3 prefetch, X4 two Bricolage instances, X5/A3/A4 SVG text and naming, E4 chevron | Carried | X3 resolved by B1 chrome scope + B11; X4 → B11 F1; X2 → E1-a; X5/A3 → B3/B5 `Figure` rule; A4 logo name → B1 (only with owner approval, because it changes an accessible name) |
| E16 `components/homepage/*` retained | Carried | B11 |
| X6 Contentful preview token, X10 Ameba CMS copy | Owner checks | X10 before B9 |

### 5.1 New risks arising from the Gate 4 architecture

| # | Risk | Likelihood / impact | Mitigation |
|---|---|---|---|
| G4-1 | **Branch-only visual seam**: legacy bodies under Direction C chrome from B1 until their batch | Certain / low (nothing ships until Gate 9) | Owner acknowledgement; ship nothing mid-Gate 4 |
| G4-2 | **Template drift**: register reuse turns into a sameness of pages | Medium / high (Master Handoff "undesired reaction") | Register rules + V5; owner review per batch; each register keeps a distinctive element |
| G4-3 | **Font-swap CLS on new display strings** (fallbacks tuned to three routes) | High / medium | Throttled CLS per route; port `sweep.cjs`; re-calibrate fallbacks across the new strings |
| G4-4 | **CMS routes unverifiable locally** | Certain without credentials / high for B7–B9 | Read-only delivery token for QA, or fixtures; owner action |
| G4-5 | **Structured-data drift** through breadcrumb/schema refactors | Low / high (SEO) | No trail-builder merge; byte-diff JSON-LD every batch |
| G4-6 | **Form regression** while restyling `ContactForm` | Low / critical (primary conversion) | Logic untouched; form contract check; intercepted `dataLayer` journeys; E6 first |
| G4-7 | **GTM DOM triggers** silently stop firing after the chrome flip or the form restyle | Unknown / high | E6 before B6 acceptance and before staging |
| G4-8 | **CSS growth**: Direction C page CSS becomes effectively global while `globals.css` stays | Medium / medium | Per-batch byte report; B11 consolidation |
| G4-9 | **Scope creep into copy**: new structural labels ("How to read …") added to make layouts work | Medium / high | V9: no new visible copy without approval; content-inventory diff |
| G4-10 | **Long-lived branch divergence** from `main` (hotfixes, CMS or SEO work on `main`) | Medium / medium | Merge `main` → `ui-revamp` at batch boundaries via the app's sync tool, never the reverse while PROC-1 is open |
| G4-11 | **Harness false confidence**: Blink-only automation reads as full coverage | Medium / medium | Reports always state the engine; E1 checkpoints are separate rows, never folded into PASS counts |

---

## 6. Shared component strategy (summary)

| Action | Items |
|---|---|
| **Reuse unchanged** | Tokens; type roles; marks; `dc-btn`/`dc-tlink`; grid; `Section`, `Label`, `Statement`, `Lede`, `Body`, `Note`, `TLink`, `InlineLink`, `ServiceOpener`, `Plate`/`PlateRow`, `NotPromised`, `Fit`, `ScopeRows`, `QuestionRows`, `Close`, `Mark`, `DcMotion`; `SiteHeader`, `SiteFooter`, `nav.ts`; `ScopeDisclosure`; the commercial SVG figures inside a frame |
| **Refactor (backwards-compatible)** | `Crumb` (accept a trail); `ActionPair`/`Close` (a `BookingLink` slot); `ScopeRows` (`numbered`); `ChromeSwitch` (inverted, then deleted) |
| **Build (with first consumer)** | `Figure`, `DataTable`, `Sequence`, `FindingRows`, `Compare`, `DisclosureGroup`, `Field`, `EntryRows`, `Prose`, `Contents`, `DocumentLayout` |
| **Retire (B11)** | `ChromeSwitch`, legacy `Header`/`Footer` + shims, `components/homepage/*`, `resolve-motion.css`, unconsumed `commercial/*` and `routes/*` wrappers, the four duplicate "close" implementations; optionally dead `components/ui/*` |

---

## 7. Owner decisions

### 7.1 Required before implementation starts

| # | Decision | Recommendation |
|---|---|---|
| **O1** | Authorise Gate 4 implementation, starting with **B0 + B1** only | Authorise |
| **O2** | Approve chrome strategy **S3** (atomic flip through an inverted `ChromeSwitch`; deletion in B11), and acknowledge the branch-only chrome/body seam (G4-1) | Approve |
| **O3** | Accept **batch-by-register execution** of workstreams 4A–4H (instead of eight site-wide workstream sweeps) | Accept |

### 7.2 Required before a later batch (not blocking B0/B1)

| # | Decision | Needed before |
|---|---|---|
| O4 | **LIVE-1 path** (L1 hotfix / L2 absorb / L3 both / L4 defer) and, for L1/L3, how a hotfix reaches production under PROC-1 | B1 report (so it can state LIVE-1 accurately); sooner is better for production |
| O5 | **CMS QA access**: a read-only Contentful delivery token for local QA builds, or approval of a fixture approach | B0 (CMS baselines) / B7 |
| O6 | **GTM container access** for the E6 audit | B6 acceptance |
| O7 | **Signature moment S2** (`/how-it-works` measured chain); S3 optional | B5 |
| O8 | **Marks usage rule** (`GATE_4_DESIGN_SYSTEM_ARCHITECTURE.md` §4.4), and the `LIVE-2` position for `/work` | B9 |
| O9 | B8 REVIEW items: non-sticky article sidebar; consolidating blog CTAs; responsive images | B8 |
| O10 | Font consolidation **F1**; deletions; optional dependency removal | B11 |

Not owner decisions (routine, inside the approved system): component internals, breakpoint behaviour within 600/900/1200, motion
targets within the budget, harness design.

---

## 8. Recommended first Gate 4 implementation prompt (proposed — not executed)

> **MAPPEDSKILLS — GATE 4 · BATCH B0 + B1: QA HARNESS, BASELINES AND GLOBAL CHROME**
>
> **Role.** Principal Frontend Engineer and QA Lead.
>
> **Read first.**
> - `GATE_4_MASTER_ROLLOUT_PLAN.md`
> - `GATE_4_CHROME_MIGRATION_STRATEGY.md`
> - `GATE_4_QA_ACCEPTANCE_MATRIX.md`
> - `GATE_4_IMPLEMENTATION_SEQUENCE.md` (B0, B1)
> - `QA_REGRESSION_RUNBOOK.md`
> - `DEC-036`
>
> **Authority.** The owner authorises Gate 4 batches B0 and B1 only (O1). Strategy S3 is approved (O2). [Record as the next free DEC.]
>
> **B0 — harness and baselines (no application change).**
> 1. Under `docs/ui-revamp/gate-4/qa/`, build route-parametric versions of these checks:
>    - responsive, menu, keyboard, text-spacing, zoom, forced-colours, reduced-motion/no-JS/print, axe, throttled-CLS + fallback-sweep, chrome-walk;
>    - a new content/SEO/JSON-LD/link inventory + diff;
>    - `<main>`-only pixel comparison;
>    - a `dataLayer` capture (route walk; form journeys with `/api/enquiry` intercepted; booking click);
>    - consent states.
>
>    Viewports: 320, 360, 390, 430, 768, 1024, 1440.
> 2. Calibrate the harness: on a production build of HEAD it must reproduce the recorded Gate 2/Gate 3 results on `/`, `/services` and `/seo`.
> 3. Capture the baseline for all 28 templates. CMS templates need credentials or fixtures. If neither is available, record that gap and stop for an owner decision.
> 4. Update `QA_REGRESSION_RUNBOOK.md`.
>
> **B1 — global chrome (chrome only).**
> 1. In `components/direction-c/nav.ts`, replace `DIRECTION_C_ROUTES` with an empty `LEGACY_CHROME_ROUTES` deny-list.
> 2. In `ChromeSwitch.tsx`, invert the condition. Update the comments only in `app/layout.tsx`.
> 3. Do not modify or delete the legacy `Header`/`Footer`. Do not edit any page body.
> 4. Verify against the B1 acceptance in `GATE_4_CHROME_MIGRATION_STRATEGY.md` §5 and `GATE_4_QA_ACCEPTANCE_MATRIX.md` §5:
>    - every template renders one Direction C header and footer;
>    - every legacy `<main>` is unchanged;
>    - inventories are identical;
>    - the menu suite passes on all routes;
>    - anchors, consent banner + menu, `aria-current`, and the `page_view` walk are identical;
>    - axe shows 0 new violations;
>    - bytes are reported.
> 5. Produce a six-route seam sample and a compare page for owner review.
>
> **Protected.** Copy (incl. LIVE-2), URLs, headings, metadata, canonicals, OG, JSON-LD, analytics, consent, forms, APIs,
> dependencies, workflows.
>
> **Report and commit.**
> - Report `GATE_4_B0_B1_CHROME.md`. It states LIVE-1 accurately: the condition no longer occurs on the branch, **production is unchanged and LIVE-1 remains OPEN** unless O4 has been decided and executed separately.
> - Commit locally on `ui-revamp` by explicit path: B0 tooling and evidence; B1 application; B1 evidence. Run all static gates.
>
> **HARD STOP.**
> - No B2 work.
> - No push, merge or deploy.
> - No change to LIVE-1, LIVE-2, PROC-1, E1 or E6 status without a recorded owner decision.
> - Finish with one status: COMPLETE, COMPLETE WITH EXCEPTIONS or BLOCKED.

---

## 9. Session handoff (`SESSION_HANDOFF_TEMPLATE.md`)

- **Session:** 2026-10-08 · Claude (Opus 5.5) · Gate 4 rollout architecture (planning only).
- **Files created:** the seven `docs/ui-revamp/GATE_4_*.md` documents. **Files changed:** `docs/00-project/CURRENT_STATE.md`
  (status line only). **No application code, test, dependency, workflow, analytics or content change.**
- **Decisions approved during session:** none. **Decisions proposed:** §7 (O1–O10).
- **Tests run:** none. This was a planning task; no claim of test results is made beyond those quoted, with their sources, from earlier gate reports.
- **Unresolved:** §5 (E1, E6, LIVE-1, LIVE-2, PROC-1 unchanged; G4-1…G4-11 new).
- **Recommended next task:** owner review of this plan and decisions O1–O3 (and O4–O5 early), then the §8 prompt.
- **Stop condition honoured:** no Gate 4 implementation, no commit, push, merge or deployment.
