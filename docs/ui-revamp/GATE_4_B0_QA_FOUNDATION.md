# MappedSkills UI Revamp — Gate 4 · B0: Site-Wide QA Foundation

| | |
|---|---|
| **Date** | 2026-10-08 |
| **Role** | Principal QA Architect / Frontend Engineering Lead / Release Governance Auditor |
| **Authority** | Owner approval of the Gate 4 twelve-batch framework; **B0 only** authorised. B1 is **not** authorised |
| **Status** | **B0 COMPLETE WITH EXCEPTIONS** (§7). No application UI, copy, routing, analytics or production behaviour changed. **Closed at a local Git checkpoint on `ui-revamp` (§11). Not pushed, merged or deployed** |
| **Assessment** | **B1 READY WITH CONDITIONS** (§8) |
| **Evidence** | `docs/ui-revamp/gate-4/b0/evidence/baseline/` (baseline of record) · `…/validation/` (determinism, negative controls, existing suites, static gates) |

## B0 documents

| Deliverable | File |
|---|---|
| Site-wide baseline report | **this file** |
| Route-by-route QA inventory (generated from the evidence) | `gate-4/b0/GATE_4_B0_ROUTE_QA_INVENTORY.md` |
| Portable regression scripts | `gate-4/qa/` (12 files) + `QA_REGRESSION_RUNBOOK.md` §5 |
| CMS fixture strategy | `gate-4/b0/GATE_4_B0_CMS_FIXTURE_STRATEGY.md` |
| Analytics and form protection report | `gate-4/b0/GATE_4_B0_ANALYTICS_FORMS_PROTECTION.md` |
| Known-defects register | `gate-4/b0/GATE_4_B0_KNOWN_DEFECTS.md` + `gate-4/qa/known-defects.json` |
| B1 entry-criteria checklist | `gate-4/b0/GATE_4_B1_ENTRY_CRITERIA.md` |

---

## 1. Checkpoint verification (VERIFIED)

| Item | Expected | Found |
|---|---|---|
| Branch | `ui-revamp` | `ui-revamp` ✅ |
| HEAD | `352bb25` | `352bb25` ✅ (application `23c937d`) |
| `DEC-036` | recorded | `DECISION_LOG.md:668` ✅ |
| Approved Direction C routes | unchanged | No application source differs from `23c937d` or HEAD. Served `/`, `/services`, `/seo` identical to the approved Gate 3 build `--Lpst9W4pkiythkOhmVS` on 75/75 inventory facets; `<main>` pixel-identical (§5.4) ✅ |
| Excluded screenshots | untouched | `docs/ui-revamp/gate-2/screenshots/app/` still untracked and unmodified ✅ |
| Uncommitted Gate 4 planning documentation | preserved | the seven `GATE_4_*.md` planning files and the `CURRENT_STATE.md` note, untouched by B0 except the B0 status line ✅ |

## 2. What was built

**Harness** (`docs/ui-revamp/gate-4/qa/`) extends the Gate 2–3 scripts from 3 routes to **all 28 page templates (34 targets)**.
It uses only the project's `playwright-core` 1.62.1 and `axe-core` 4.13.0, with no absolute paths, and covers the brief's ten check types
(mapping in `QA_REGRESSION_RUNBOOK.md` §5.2).

**Regression model.** Every finding has a stable fingerprint, and a later run is classified against this baseline:
- KNOWN: already in the baseline, tagged with its register ID;
- NEW: fails the run;
- EXPECTED: declared in advance by the batch;
- RESOLVED: reported for explanation.

Inventories are compared facet by facet, and chrome facets can be declared as expected changes. `<main>` is compared by pixels
between two live builds. **So an expected legacy defect, such as LIVE-1 on 31 targets, is reported as KNOWN, and a new
regression is reported as NEW.**

**CMS boundary.** Two builds of the same commit:
- **plain:** no credentials. This is the real local behaviour, with empty or not-found CMS states;
- **fixture:** synthetic, labelled Contentful entries served to the real client through a `fetch` preload. The application code is unchanged.

`/blog/[slug]` and `/portfolio/[slug]` render through their real paths. The withheld-proof path is proven by sentinels.
`/research/[slug]` and `/press/[slug]` are **not covered** (§6).

## 3. Route inventory and coverage

| Category | Templates | Coverage |
|---|---|---|
| A — Direction C (controls) | `/`, `/services`, `/seo` | full |
| B — capability | 5 | full (static) |
| C, D, E — decision, trust, conversion | `/problems/…`, `/pricing`, `/how-it-works`, `/about`, `/faq`, `/contact`, `/schedule-call`, `/thank-you` | full (static) |
| F — editorial | `/blog`, `/research`, `/press` | real empty state. `/blog` is also fixture-populated |
| F — `/blog/[slug]` | 1 | **fixture** (full + minimal) + real 404 path |
| F — `/research/[slug]`, `/press/[slug]` | 2 | **not-found path only (NOT COVERED)** |
| H — proof | `/work`, `/portfolio/[slug]` | `/work`: real empty + fixture. Case: **fixture** (open + withheld) + real 404 |
| G — utility | `/privacy-policy`, `/terms`, 404 | full |
| G — `/launch-checklist` | 1 | **gated → 404 in a production build; internal content not covered** |

Per-target detail (title, canonical, robots, JSON-LD types, headings, text, links, CTAs, forms, preloads, motion hooks, chrome, and
findings per engine): `gate-4/b0/GATE_4_B0_ROUTE_QA_INVENTORY.md`.

## 4. Baseline results (actual behaviour before B1; nothing normalised)

| Run (34 targets) | Clean checks | Findings | Classification |
|---|---|---|---|
| Inventory | 34/34 status as expected | — | proof: **0 withheld sentinels** in the withheld fixture's HTML or DOM; open control renders its sentinels |
| Chrome consistency | **0 failures**: one header and one footer variant per chrome system (Direction C ×3, legacy ×31); identical 26 destinations | — | — |
| Layout · Chromium (7 widths + text spacing + 200%/400%) | 1,386 | 2,919 | all registered: KD-08 2,625 · DEC-030-STICKY 217 · KD-04 32 · KD-05 15 · KD-01 14 · KD-07 14 · KD-06 2 |
| Layout · WebKit (7 widths) | 1,386 | 2,919 | identical to Chromium |
| Layout · Firefox (7 widths) | 1,386 | 2,919 | identical to Chromium |
| A11y · Chromium | 412 | 467 | KD-02 329 · **LIVE-1 124** · KD-03 10 · KD-04 4 |
| A11y · WebKit | 406 | 138 | LIVE-1 124 · KD-03 10 · KD-04 4 |
| A11y · Firefox | 406 | 138 | same as WebKit |
| Analytics / consent / booking / form | all sections recorded | — | §5.3 |

**The three approved Direction C routes are clean in every run**, except KD-05 on `/seo`: SVG figure text clipped under text spacing, the
already-known Gate 3 A3. They have 0 axe violations, 0 LIVE-1, 0 small targets and 0 console errors.

### 4.1 Known baseline exceptions (register: `GATE_4_B0_KNOWN_DEFECTS.md`)

- **LIVE-1** reproduced on every legacy-chrome target in all three engines.
- **DEC-030** sticky header everywhere.
- **New fingerprinted evidence of pre-existing defects:**
  - **KD-02**: the legacy focus ring disappears in forced colours, including on the `ContactForm` fields;
  - KD-04: table scroll regions are not focusable;
  - KD-06: the case page scrolls sideways at 320px with text spacing;
  - KD-07: the blog skips heading levels.
- **OBS-1 (new, pre-existing):** the consent bootstrap does not execute on **dynamically rendered not-found** responses, so
  `consent default` never reaches `dataLayer` there. **Not touched** (analytics/consent LOCKED). Owner decision; include in E6.
- OBS-3: local canonicals and OG URLs use `http://localhost:3000` (`.env.local`). Production hosts are verified only on staging.

## 5. Validation

### 5.1 Determinism

An independent second full run (all engines), classified against the baseline:
- **0 NEW, 0 RESOLVED** in all six finding sets;
- 850/850 inventory facets identical;
- analytics 0 differing sections;
- `<main>` 68/68 pixel-identical.

Evidence: `validation/determinism.txt`, `pixel-main-self.txt`.

Three harness flakes were found and fixed at their cause during B0, never by weakening an assertion:
1. Tables in scroll containers were counted as page overflow. They are now classed as *contained*.
2. Links inside closed `<details>` were counted as unnamed. They are not rendered, so they are now excluded.
3. Focus-in-view timing in the WebKit and Firefox builds is now an advisory note in those two engines; it remains a finding in Chromium.

Also fixed in B0: the placeholder image was not a valid PNG (Firefox console error), and WebKit Tab skipped links (the walk now uses Safari's Option+Tab).

### 5.2 Sensitivity (negative controls)

All six controls behaved as intended (`validation/negative-controls.txt`):

| # | Control | Result |
|---|---|---|
| 1 | Injected `<main>` overflow on `/about` and `/seo` | classify exit 1: NEW 40 |
| 2 | Same injection, declared with `--expect` | EXPECTED, not NEW (undeclared side effects stay NEW) |
| 3 | Changed copy line, JSON-LD character and removed link | diff exit 1: 3 DIFF |
| 4 | Simulated chrome change declared with `--ignore header,footer` | exit 0: 34 EXPECTED |
| 5 | Removed `lead_form_submitted` | compare exit 1 |
| 6 | Expecting Direction C on all routes against today's build | exit 1: 31 failures |

### 5.3 Analytics and conversion (mocked; no real lead, booking or tag)

- **Consent:** all four signals denied by default in all three states. Granted → `consent update` (analytics granted, ads denied). Banner only when undecided.
- **`page_view`:** one per first load, with the correct `page_type` on 19 routes. One per client navigation (7) across the chrome seam.
- **BookingLink:** one Calendly anchor; one `meeting_started` with the documented parameters.
- **ContactForm:**
  - empty submit → 0 requests, 4 `required` validation events, error summary focused;
  - 2xx → `/thank-you` + one `lead_form_submitted`;
  - 400/429/500/network failure → stays on `/contact`, no conversion event, correct messages;
  - honeypot empty; body and attribution keys recorded.
- **Not testable locally:** GTM container (ID empty) → **E6** (exact steps in `GATE_4_B0_ANALYTICS_FORMS_PROTECTION.md` §6).

### 5.4 Approved routes and existing suites

| Check | Result |
|---|---|
| Application source `23c937d..HEAD` and working tree (app, components, lib, public, scripts, config, package files) | **no change** |
| `/`, `/services`, `/seo`: B0 build vs approved Gate 3 build | **75/75 facets identical** |
| `<main>` pixels, all 28 plain targets, B0 build vs approved Gate 3 build | **56/56 identical**. This also proves the comparison holds across separate builds |
| Gate 2 `app-checks.cjs` | **192/192 PASS** |
| Gate 3 `acceptance-checks.cjs` (Chromium) | **261 PASS · 0 FAIL · 3 NOTE** |
| Gate 3 `chrome-nav.cjs` | **0 console errors**; LIVE-1 boundary still sticky on `/about` |
| `npm run typecheck` · `npx eslint .` · `npm test` · `npm run build` · `npm run verify:build` | exit 0 · exit 0 · **11/11** · exit 0 (scratch copy of `352bb25`) · OK (23 prerendered pages) |
| Harness syntax (`node --check`, 12 files) | OK. `eslint` ignores `docs/**`, as for all earlier evidence scripts |

## 6. Not testable / not covered

| Item | Why | What closes it |
|---|---|---|
| `/research/[slug]` (reports and category variant), `/press/[slug]` | no credentials, no fixture; press has 0 production entries | Read-only token for QA, or fixture extension (owner, before B7) |
| Real CMS content on `/blog/[slug]`, `/portfolio/[slug]`, `/work` | fixtures prove the path, not the content | One credentialed run before B8/B9 |
| `/launch-checklist` content | gated at build time | Optional internal build with `ENABLE_INTERNAL_PAGES=true` |
| GTM container behaviour | ID empty locally; vendor scripts out of bounds | **E6** |
| Production canonical, OG and image hosts | local `NEXT_PUBLIC_SITE_URL` | Staging (Gate 7) |
| Gate 0 R2 (1024 overflow) | overlay scrollbars in headless engines | E1 classic-scrollbar browser; moot after B1 |

## 7. Browser coverage achieved, and what remains manual

| Target | Status |
|---|---|
| Chromium 151 (Playwright) | **Full suite** |
| WebKit build `webkit-2336` (Playwright 1.62.1) | Layout at 7 widths + a11y. **Engine proxy, not Safari** |
| Firefox build `firefox-1538` (Playwright 1.62.1) | Layout at 7 widths + a11y. **Engine proxy, not Firefox release** |
| Forced colours | Chromium emulation only |
| Real Android Chrome, real iPhone Safari, desktop Safari, desktop Firefox, VoiceOver, TalkBack, NVDA, larger-text settings, Windows High Contrast | **NOT TESTED. E1 remains OPEN** (`DEC-036`). No real-device claim is made |

**Exceptions that make B0 "complete with exceptions":**
- §6 coverage gaps;
- E1;
- E6;
- the evidence volume. Resolved at the checkpoint: machine-readable data and 64 representative screenshots are committed; 242 reproducible screenshots stay local ([`gate-4/b0/evidence/README.md`](gate-4/b0/evidence/README.md)).

## 8. Assessment: **B1 READY WITH CONDITIONS**

**The baseline is complete enough to invert `ChromeSwitch` safely.** B1 changes chrome only, and B0 can now prove the four things B1 must not break:
1. every body's content, metadata, structured data, forms and analytics hooks (inventory diff with chrome facets declared);
2. every body's pixels (`<main>` comparison, proven across builds);
3. every known defect's status (classification, which also shows LIVE-1 and the sticky header **RESOLVING** on the branch);
4. analytics behaviour (compare).

The gaps in §6 concern bodies and CMS content that B1 does not touch.

**Conditions:**
1. **Owner authorises B1 and strategy S3** (entry criterion A9).
2. **Owner states the LIVE-1 path (O4)**, so the B1 report can be accurate: the condition is gone on the branch, but production is unchanged and LIVE-1 stays OPEN (A10).
3. B1 runs the acceptance set in `GATE_4_B1_ENTRY_CRITERIA.md` §B. It declares the expected RESOLVED set before running, and **any NEW finding fails B1**.
4. **E6 is recommended before B1 acceptance.** The chrome DOM changes on 25 templates, and no `data-*` hooks exist for GTM to use (OBS-5). E6 remains mandatory before staging.
5. The B0 baseline build stays reproducible (runbook §5.1), so B1 compares against `352bb25`, not against itself.

### 8.1 Proposed B1 implementation prompt (for owner review — not executed)

> **MAPPEDSKILLS — GATE 4 · B1: GLOBAL CHROME (CHROME ONLY)**
>
> **Role.** Principal Frontend Engineer and QA Lead.
>
> **Authority.** The owner authorises B1 only, with chrome strategy S3. [Record as the next free DEC. State the LIVE-1 path chosen under O4.]
>
> **Read first.**
> - `GATE_4_B0_QA_FOUNDATION.md`
> - `gate-4/b0/GATE_4_B1_ENTRY_CRITERIA.md`
> - `GATE_4_CHROME_MIGRATION_STRATEGY.md` §§3–5, 8
> - `QA_REGRESSION_RUNBOOK.md` §5
>
> **Change, exactly.**
> 1. `components/direction-c/nav.ts`: replace `DIRECTION_C_ROUTES` with an empty `LEGACY_CHROME_ROUTES` deny-list, commented as the kill switch to be removed in B11.
> 2. `components/direction-c/ChromeSwitch.tsx`: render `legacy` only for pathnames in that set; otherwise `next`.
> 3. `app/layout.tsx`: update comments only.
>
> **Do not change.**
> - Legacy `Header.tsx` and `Footer.tsx` (retained, unrendered);
> - any page body;
> - copy, labels or destinations;
> - analytics or consent;
> - dependencies;
> - the Gate 3 E4 chevron, unless separately authorised.
>
> **Verify** against the B0 baseline (`gate-4/b0/evidence/baseline/`, build of `352bb25`), with the B1 candidate on its own ports:
> - B1-1 … B1-11 of the entry-criteria checklist, in Chromium, WebKit and Firefox;
> - declare the expected RESOLVED set first;
> - NEW must be 0;
> - `<main>` 68/68 pixel-identical;
> - inventory identical outside the declared chrome facets;
> - analytics identical;
> - also check anchors, the consent banner with the menu open, and `aria-current`;
> - produce the six-route seam compare page.
>
> Write evidence to `gate-4/b1/evidence/`. Never overwrite the B0 baseline.
>
> **Report.**
> - Write `GATE_4_B1_GLOBAL_CHROME.md`.
> - State LIVE-1 precisely: the condition no longer occurs on the branch, **production is unchanged, and LIVE-1 is OPEN** unless closed by its own DEC with production evidence.
> - Restate E1, E6, OBS-1, LIVE-2 and PROC-1 as open.
>
> **Commit and stop.**
> - Local commits on `ui-revamp` only, by explicit path: application, then evidence.
> - No push, merge or deploy.
> - Stop after B1. Finish with COMPLETE, COMPLETE WITH EXCEPTIONS or BLOCKED.

## 9. Files created or changed by B0

| Path | Change |
|---|---|
| `docs/ui-revamp/GATE_4_B0_QA_FOUNDATION.md` | new (this file) |
| `docs/ui-revamp/gate-4/qa/` | new: `lib.cjs`, `inventory.cjs`, `diff-inventory.cjs`, `chrome-consistency.cjs`, `layout.cjs`, `a11y.cjs`, `analytics-forms.cjs`, `pixel-main.cjs`, `classify.cjs`, `report-routes.cjs`, `run-all.cjs`, `known-defects.json`, `cms-fixtures/{fixtures,preload,serve-fixture}.cjs` |
| `docs/ui-revamp/gate-4/b0/` | new: the five B0 documents; `evidence/README.md` (index and retention); `evidence/baseline/` (JSON, TXT; 64 of 306 JPEG screenshots committed, the rest local); `evidence/validation/` |
| `docs/ui-revamp/QA_REGRESSION_RUNBOOK.md` | §5 added (Gate 4 harness); §§1–4 unchanged |
| `docs/00-project/CURRENT_STATE.md` | B0 status line |
| `.claude/launch.json` | two local preview entries (`b0-plain`, `b0-fixture`). The file is git-ignored (`DEC-036`) |
| Outside the repository | Playwright WebKit and Firefox engine builds in the user cache; scratch builds in the session scratchpad |
| **Not changed** | `app/`, `components/`, `lib/`, `public/`, `scripts/`, `next.config.mjs`, `package.json`, `package-lock.json`, `.env*`, workflows, `ChromeSwitch` |

**Servers left running (local only):**
- `:3510`: B0 plain build;
- `:3520`: B0 fixture build;
- `:3300` / `:3402` / `:3400` / `:3401`: pre-existing, from earlier sessions, untouched.

## 10. Session handoff (`SESSION_HANDOFF_TEMPLATE.md`)

- **Session:** 2026-10-08 · Claude (Opus 5.5) · Gate 4 B0 (QA foundation).
- **Decisions approved during session:** none recorded. The owner's B0 authorisation is applied as an OWNER REQUIREMENT. **No DEC was written**; the owner may record B0 acceptance.
- **Tests actually run:** everything in §§4–5.
- **Not run:** real devices, screen readers, GTM, live CMS (§§6–7).
- **Open:** LIVE-1, LIVE-2, PROC-1, E1, E6, OBS-1 (new). None was changed.
- **Next:** owner decisions A9–A11 (`GATE_4_B1_ENTRY_CRITERIA.md`); then the §8.1 prompt if approved.
- **Stop condition honoured:** no application change, `ChromeSwitch` untouched, B1 not started, no commit, push, merge or deploy.

---

## 11. B0 closure and Git checkpoint (2026-10-08)

**Authority:** the owner's "Gate 4 B0 closure & Git checkpoint" instruction. It authorises finalising B0 and one local commit. **B1 is not authorised.**

**Changes made at closure (documentation and harness only):**
- **Known-defects register formalised.** Every item now has affected routes and components, a reproduction method, impact, pre-existing status,
  resolution phase, acceptance test, and what it blocks (B1 / staging / production). This includes the KD-02 remediation and retest gate before
  staging, and OBS-1 placed inside E6. Link: [`gate-4/b0/GATE_4_B0_KNOWN_DEFECTS.md`](gate-4/b0/GATE_4_B0_KNOWN_DEFECTS.md).
- **`pixel-main.cjs --against <hashes>`:** compares a candidate's `<main>` with the **recorded** baseline hashes, so B1 can verify page bodies
  even if the B0 scratch build is gone. Validated: B0 build 68/68, separately built Gate 3 build 56/56. A mutated hash is detected (§11.1).
- **Evidence retained lean:** [`gate-4/b0/evidence/README.md`](gate-4/b0/evidence/README.md) (classes A–D; exact regeneration commands).
- **Runbook §5.3** covers screenshot regeneration and the hash mode. Two related open risks were added to `PROGRAMME_RISKS_AND_LIVE_ISSUES.md`
  as references only (no status change).

**Found at closure, not changed:** `next-env.d.ts` was rewritten by a `next dev` run in the repository at 17:25. That run was after B0 and not by
this work. The file is auto-generated by Next.js ("This file should not be edited"); its import now points at `.next/dev/types`. It is
**not staged and not reverted**, and is left for the owner. It does not affect production builds, which regenerate it.

### 11.1 Checkpoint validation

Results: [`gate-4/b0/evidence/validation/`](gate-4/b0/evidence/validation/) `checkpoint-*.txt`. The full screenshot matrix and the WebKit/Firefox runs
were **not** rerun: no application or harness behaviour that they exercise changed after their validated runs (§5). The only harness change,
`pixel-main --against`, was validated directly.
