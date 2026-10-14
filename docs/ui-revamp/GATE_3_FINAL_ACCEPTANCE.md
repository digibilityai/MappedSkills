# MappedSkills UI Revamp — Gate 3 Final Acceptance & Checkpoint Pack

| | |
|---|---|
| **Date** | 2026-10-08 |
| **Branch** | `ui-revamp` @ `142b9c8` + uncommitted Gate 2, Gate 3 review, remediation and this acceptance pass. **Nothing committed, pushed, merged or deployed** |
| **Build under test** | The remediation's final production build, `BUILD_ID 7-ZqzKB1mAXbcZeuiC77h`, served by `next start` on `:3300` |
| **Scope** | First pass (§§1–9): verification and governance only, no application code changed. **Second pass (§10): the owner-authorised A1/A2 accessibility correction (`DEC-035`)** |
| **Evidence** | `gate-3-acceptance/evidence/` — first pass: `acceptance-checks.cjs`, `acceptance-chromium.txt`, `acceptance-chrome.txt`. Correction pass: `a1a2-checks.cjs`, `final-run/`, `screens/` |
| **Recommendation** | **APPROVE GATE 3 WITH RECORDED EXCEPTIONS** (§10.7). This is **not** an unconditional approval. **Recorded by the owner as `DEC-036` (2026-10-08)** |

> **STATUS UPDATE — 2026-10-08, Gate 3 APPROVED WITH RECORDED EXCEPTIONS (`DEC-036`).**
> - The proposed wording in §5.1 and §10.7 is superseded by the recorded `DEC-036` in `DECISION_LOG.md`.
> - E1 (real-device / cross-browser QA) and E6 (GTM) remain **conditions before staging**. `LIVE-1`, `LIVE-2` and `PROC-1` remain OPEN.
> - The §7 / §11 checkpoint plan was executed as **two local commits on `ui-revamp`** (application; governance and evidence). Nothing was pushed.
>   - Group 4 resolution: `gate-2/screenshots/app/` is excluded and kept locally; `gate-1/screenshots/` is committed, because `GATE_1_DESIGN_DIRECTIONS.md` cites it as `DEC-034` evidence.
> - Evidence scripts: see `QA_REGRESSION_RUNBOOK.md`. Eight reusable scripts are now portable; the rest are archival.
>
> **STATUS UPDATE — 2026-10-08, correction pass (§10). Read §10 and §11 first.**
> - **A1 and A2 are FIXED and verified** on the final build `--Lpst9W4pkiythkOhmVS`.
> - Gate 3 design decisions 5, 7 and 8 are **approved and recorded as `DEC-035`**.
> - Real-device and cross-browser testing is **retained as an outstanding acceptance requirement** (`DEC-035`).
> - **Gate 3 is still not approved.** The proposed Gate 3 entry in §5.1 is renumbered **`DEC-036`**, because `DEC-035` is now taken.
> - §§1–9 are kept as the record of the first pass. Where they say A1/A2 are open, or name decisions 5, 7 and 8 as open, §10 supersedes them.

**Gate naming.** This is the UI-revamp Gate 3 ("Direction Approval" in the Implementation Plan). It is **not** Gate 3 of
`docs/00-project/QUALITY_GATES.md` ("Search Opportunity Validation"). That programme gate is unaffected.

**Context read:** `CLAUDE.md`, `CONTEXT_INDEX.md`, `CURRENT_STATE.md`, `DECISION_LOG.md` (`DEC-034`), `GATE_3_REVIEW.md`,
`GATE_3_REMEDIATION.md` and its evidence, `PROGRAMME_RISKS_AND_LIVE_ISSUES.md`, Implementation Plan (Gate 4 structure).

---

## 1. Gate 3 approval recommendation

**APPROVE WITH RECORDED EXCEPTIONS.** The recommended path is **option A**.

| | |
|---|---|
| **Conditions R1–R4 of the Gate 3 review** | Met and re-verified by the remediation on the final build. Accepted by the owner (direction 2) |
| **R5–R7** | Met. Also accepted (direction 2) |
| **New in this pass** | One P2 accessibility regression, **A1**: the CTA pills cannot wrap. They fail WCAG 1.4.12 text spacing at ≤ 390px, and at 320px reflow they run 1px past the viewport. The baseline passes the same test. One P3 item, **A2** (forced-colours toggle state). See §3 |
| **Not done (no means available)** | Real Android or iPhone, Safari, Firefox, VoiceOver (§2). This gap is the main reason the approval cannot be unconditional |

**Option A (recommended).** Before the Git checkpoint:
1. Authorise a CSS-only fix for A1 in the Direction C layer (allow `.dc-btn` to wrap within `max-width: 100%`; no copy change).
2. Re-run the suites (Gate 2 192, remediation 80, acceptance 260, throttled CLS).
3. Run the 20-minute manual device pass in §2.1.
4. Record Gate 3 as approved, with exceptions, in a new DEC.

A1 is the button component that Gate 4 will roll out to every route. Fixing it once now is cheaper than carrying it into 4E.

**Option B.** Record Gate 3 now, with A1 and the device gap as named exceptions and Gate 4 entry conditions.

---

## 2. Device and browser coverage matrix

"Tested" means run in this session against the final build. **Blink** = the Chromium engine. Blink results do not stand in for
WebKit (Safari) or Gecko (Firefox).

| Target | Status | What was run / why not | Result |
|---|---|---|---|
| **Real Android Chrome** | **NOT TESTED — UNKNOWN** | No device, no `adb` on this machine. Note that the display-font fallback is calibrated for Arial; Android has no Arial (remediation X2) | — |
| **Real iPhone Safari** | **NOT TESTED — UNKNOWN** | No device. No Xcode, so there is no iOS Simulator either | — |
| **Desktop Safari 26.2** | **NOT TESTED — UNKNOWN** | Installed, but automation refused: *"You must enable 'Allow remote automation' in the Developer section of Safari Settings"*. That is an owner setting, so it was left unchanged | — |
| **Desktop Firefox** | **NOT TESTED — UNKNOWN** | Not installed | — |
| **VoiceOver (macOS / iOS)** | **NOT TESTED — UNKNOWN** | No way to drive or hear VoiceOver from this session. §3 uses Chromium's accessibility tree as a **proxy, not an equivalent** | — |
| Desktop Google Chrome 154 (installed browser, headless) | Tested (Blink) | `acceptance-checks.cjs` | 254 PASS · 6 FAIL (A1) · 4 NOTE (A2) |
| Playwright Chromium 151 | Tested (Blink) | `acceptance-checks.cjs`, plus the existing Gate 2 suite (192/192) and remediation suite (80/80), not re-run | 254 PASS · 6 FAIL (A1) · 4 NOTE (A2) |
| Widths 360 / 390 / 430 / 768 / 1024 / 1440 | Tested (Blink), existing evidence | Gate 2 suite ×3 routes, throttled CLS ×3 routes | PASS |
| Keyboard-only | Tested (Blink) | Full Tab traversal of each route at 1440, 390 and 200% zoom: count, visibility, ≥2px ring, scrolled into view (27 checks). Services split control, menu and Escape covered by the remediation suite | PASS |
| Reduced motion | Existing evidence | Gate 2 suite and remediation suite | PASS (not re-run) |
| 200% browser zoom | Tested, **layout-equivalent** (Blink) | CSS viewport = window ÷ 2 at 2× DPR, for 1440×900, 1280×800 and 1024×768: no horizontal scroll, no clipped text, menu CTAs and the `/services` link reachable | PASS |
| 400% zoom / 320px reflow | Tested, layout-equivalent (Blink) | Same checks at 320×256 | PASS with **A1** (CTA pair 1px past the edge) |
| Landscape | **Chromium emulation only** (`isMobile`, touch) | 568×320, 667×375, 844×390 and 932×430 ×3 routes: no overflow, header not sticky, menu Contact Us and last link reachable, Escape closes | PASS. **Not a real-device test** |
| WCAG 1.4.12 text spacing | Tested (Blink) | 360, 390, 768 and 1440 ×3 routes | **FAIL at 360 and 390 (A1).** Baseline `142b9c8` passes 24/24 |
| Forced colours | Chromium emulation | 390 and 1440 ×3 routes | Focus ring survives. **A2** |
| Slow-network CLS | Existing evidence, **confirmed valid** (§4) | Throttled profile, 3 runs | ≤ 0.001 on all 18 cells |

### 2.1 Manual pass still required (owner or tester with devices, about 20 minutes)

Run it on `/`, `/services` and `/seo`, on **Android Chrome, iPhone Safari, macOS Safari + VoiceOver and Firefox**. Use a local
build on the LAN or a protected preview; nothing is deployed today. Check:
1. **Menu.** Open it. Contact Us is reachable. Scroll to the last link. Close with the button. Do the same in landscape.
2. **Services navigation.** Desktop: the "Services" link goes to `/services`, and the chevron opens the panel. Mobile: "Services →" is first in the menu.
3. **CTAs.** Both pairs go to `/contact` and `/schedule-call`. No text is clipped at the narrowest width.
4. **Homepage hero.** The headline does not jump when the font arrives. Watch for this especially on Android, where the fallback is uncalibrated.
5. **`/seo`.** The horizon panel sits after the CTAs. The scope disclosures open and close, one at a time.
6. **VoiceOver.** Use the rotor to list headings and links: names are sensible and there are no "link, link" entries. The Traffic/Enquiries toggle announces its pressed state. The Services button announces "Services submenu, collapsed/expanded".
7. **Safari + Firefox.** Text wrapping and font rendering match the Chrome screenshots in `gate-3-remediation/index.html`.

---

## 3. Accessibility findings

| # | P | Finding | Evidence | Origin | Recommended disposition |
|---|---|---|---|---|---|
| **A1** | **P2** | **CTA pills cannot wrap** (`.dc-btn { white-space: nowrap }`, `app/direction-c.css:164`). The primary label "Tell us what you're trying to…" is the long one. With WCAG 1.4.12 spacing it grows to ~400px, so the hero and close CTA pairs on all three routes cause **40px of horizontal scroll at 360 and 10px at 390**. At 320px (400% zoom) both pills run from 16px to 321px: no right gutter, and 1px of scroll | `acceptance-*.txt` §1 and §3. Baseline 24/24 PASS on the same test | **New. Direction C regression** | Fix before checkpoint (option A): CSS only, no copy change |
| **A2** | P3 | **Forced colours: the Traffic/Enquiries pressed state is invisible.** The selection is a background fill, which forced colours removes, so both buttons render identically. `aria-pressed` is still exposed to assistive tech | `acceptance-*.txt` §4; screenshot in session scratchpad | Direction C toggle styling. Whether the baseline had the same gap: **UNKNOWN** (not compared) | `@media (forced-colors: active)` border or `Highlight` on `[aria-pressed=true]`. With A1 or in Gate 4B/4E |
| A3 | P3 | With text spacing applied, the `/seo` figure's SVG caption ("— still the number this is judged…") extends past the viewport at 360/390. SVG text inside a fixed viewBox | `acceptance-*.txt` §3 | Inherited figure (`ChainFull` family) | Gate 4G. Same class as the 11px SVG text (X5) |
| A4 | P3 | Already recorded, unchanged: logo link name "MappedSkills Logo"; 28-run count `aria-hidden` (R8); 11px SVG text | Remediation X5 | Pre-existing | Gate 4 |

**Checked and sound (Blink):**
- 0 unnamed interactive nodes in the accessibility tree on any route at 390 and 1440.
- No link text points to two destinations.
- Every keyboard stop is visible, has a ≥ 2px ring and is scrolled into view.
- `/seo` scope disclosures respond to Enter, Space and click, one open at a time, at 390, 768 and 1440.
- At 200% zoom: no horizontal scroll and no clipped text, and the menu CTAs stay reachable.
- In landscape: the header is not sticky, and the whole menu is reachable.
- axe-core: 0 violations (existing remediation evidence).

**Harness note.** An early run reported failures on the `/seo` disclosures. The cause was test speed: the next summary was
activated within one frame of the previous click, and the previous item's queued `toggle` event closed the new one. No person
can act that fast. A 150ms settle was added to the harness, and the component is correct. The component is legacy
(`components/commercial/ScopeDisclosure.tsx`, unchanged).

---

## 4. Performance and regression acceptance

| Check | Result |
|---|---|
| **No unapproved change since the closure report** | **VERIFIED.** Every application source file was last modified at or before 11:51:20, and the final build's `BUILD_ID` is 11:51:56. The server on `:3300` started at 11:52:03 and serves that `BUILD_ID`. Only two files are newer than the build, both documentation: `GATE_3_REMEDIATION.md` and `CURRENT_STATE.md`. This pass added only `docs/ui-revamp/gate-3-acceptance/` and this report |
| **Slow-network CLS valid for the final build** | **CONFIRMED.** `final-cls-throttled.txt` was captured at 13:11 against that same build: `/` 0.001 and `/services`, `/seo` ≤ 0.001 at all six widths, 3 identical runs. Throttled LCP is ~3.8s against a 3.2s baseline (Gate 2 cost, recorded) |
| Gate 2 suite 192/192 · remediation suite 80/80 · axe 0 · 42/42 unrelated routes pixel-identical · content/SEO/JSON-LD parity · `page_view` parity | Existing passing evidence on the same build. **Not re-run** (brief) |
| Typecheck · lint · tests 11/11 · build · `verify:build` | Existing evidence (remediation §6). Not re-run |

---

## 5. Outstanding decisions — matrix

This applies the owner directions given for this pass:
- **D1** retain Direction C;
- **D2** accept the seven fixes;
- **D3** retain approved page copy;
- **D4** consistent navigation labels, editorial descriptions need not match;
- **D5** context-specific SEO and measurement terminology accepted;
- **D6** LIVE-1 / LIVE-2 / PROC-1 restrictions intact;
- **D7** no Gate 4 before final acceptance.

**None of these are recorded in `DECISION_LOG.md` yet** (see §5.1).

| # | Original question (Gate 3 review §8) | Owner instruction | Current implementation | Recommended disposition | Approval still required |
|---|---|---|---|---|---|
| 1 | Approve Direction C conditional on R1–R4 | D1, D2; conditional acceptance granted | R1–R7 done and verified | Approve with recorded exceptions (§1) | **Yes — the Gate 3 DEC itself** |
| 2 | Opsz display font: keep if CLS < 0.1 on slow profile | D2 (R2 accepted) | Self-hosted under its own family. Throttled CLS ≤ 0.001 | **Keep**: the condition is met | Record only. Accept X2 (Android uncalibrated) pending the device pass |
| 3 | Vocabulary per destination | D2 (R3), D3, D4, D5 | Chrome says "Conversion optimisation" / "Lead generation", matching the homepage links. `/services` editorial rows keep "The enquiry path" / "Enquiry generation" (approved copy). SEO: "Organic search" (homepage copy), "Organic search (SEO)" (desktop panel), "SEO" (menu/footer). Measurement: "Measurement" vs "How It Works" / "How we measure it" | **Accept as is.** Nav labels are consistent for the two Convert destinations (D4). Editorial row titles are retained (D3). The SEO and measurement variants are context-specific (D5) | Record only. **Note:** the `/services` editorial titles are also link text, so a screen reader hears "Enquiry generation…" for `/lead-generation` there. D4 covers this, but the owner should know it |
| 4 | Split Services control | D2 (R1) | Link + "Services submenu" disclosure. No-JS link works | **Approve** | Record only |
| 5 | Plate labels Evidence / Method / Limitation and the "Claim" tag | **None given.** `DEC-034` ruling 3 covers other labels, not these | Implemented as `dt`/`dd`. Limitation never collapsed | **Approve**, with the review's condition (never collapse Limitation; no number without its scope) | **YES — open owner decision** |
| 6 | Remove the strike-through | D2 (R4) | Removed | Approve | Record only |
| 7 | Always-open Capture / Convert / Measure rows (retire the Phase D tablist on `/`) | **None given explicitly.** D1 retains the direction, which includes them | Always open. Clears baseline axe criticals | **Approve** | **YES — open owner decision** (affects a previously approved Phase D interaction) |
| 8 | Ruling-2 interpretation (pass-2 position) + full-copy horizon panel | D3 retains approved copy, so the full-copy panel stays and no shorter wording is commissioned | Panel after the CTAs (mobile), first beside the situation block (desktop). Measure capped at 62/66 cpl | **Confirm** the interpretation and the full-copy panel | **YES — confirm the ruling-2 interpretation** (D3 settles the copy, not the placement reading) |
| 9 | Accept the testing gap or require a device / Safari / Firefox / SR pass | Conditional acceptance "subject to final browser/device/accessibility verification" | This pass: Blink coverage complete; real-device, WebKit, Gecko and SR **not done** | Run §2.1, or accept the gap explicitly in the Gate 3 DEC | **YES** |
| — | Remediation exceptions X1–X9 | D2 implicitly | Recorded | Accept X1, X3, X4, X8, X9. Keep X2 and X6 open until the device pass. X5 to Gate 4. X7 = D6 | Record in the Gate 3 DEC |
| — | **A1** (new), **A2** (new) | None | Not fixed | A1: fix before checkpoint (option A). A2: with A1 or in Gate 4 | **YES — authorise the A1 fix or accept it as an exception** |

### 5.1 Proposed text for the Gate 3 DEC (not recorded — for the owner to approve or amend)

*Renumbered in the correction pass: `DEC-035` now records the three design decisions and the A1/A2 authorisation. Updated
wording is in §10.7.*

> **DEC-036 (proposed) — UI Revamp Gate 3 (Direction Approval): APPROVED WITH EXCEPTIONS.**
> - Direction C is retained on `/`, `/services`, `/seo`.
> - Remediation fixes R1–R7 are accepted.
> - Approved page copy is retained.
> - Navigation labels are consistent; editorial descriptions may differ.
> - Context-specific SEO and measurement terminology is accepted.
> - Decisions 2, 4 and 6 are approved as implemented. Decisions 5, 7 and 8 are [approved / amended as …].
> - Exceptions: A1 [fixed in … / open as a Gate 4E entry condition], A2, A3–A4, X1–X9. Real-device, WebKit, Gecko and VoiceOver coverage [completed on … / accepted as a gap until Gate 5].
> - Does **not** approve Gate 4 start, merge to `main`, staging or production. LIVE-1, LIVE-2 and PROC-1 are unchanged.

---

## 6. Risk register status (unchanged by this pass)

| Ref | Status | Note |
|---|---|---|
| **LIVE-1** sticky-header menu CTAs | **OPEN** | Cannot occur on the three Direction C routes on this branch. Present on every legacy route. Production untouched |
| **LIVE-2** proof-copy contradiction | **OPEN** | Homepage headline still published, as approved copy (D3) |
| **PROC-1** push to `main` deploys | **OPEN** | **No merge or push of `ui-revamp` to `main`** until it is resolved or explicitly accepted |
| X2 · X6 · X10 (doc debt; Contentful preview token; Ameba CMS copy) | OPEN | Owner checks, unchanged |
| GTM triggers keyed on legacy DOM | **RESEARCH REQUIRED** | Before staging (Gate 2 E15) |
| Android display-font fallback | **WORKING HYPOTHESIS** | Device pass |
| A1, A2 | **NEW** | §3 |

---

## 7. Exact changes awaiting the Git checkpoint

**Modified (8):**
- `app/layout.tsx` — the `ChromeSwitch` seam and the `direction-c.css` import;
- `app/page.tsx`, `app/(pages)/services/page.tsx`, `app/(pages)/seo/page.tsx`;
- `components/commercial/primitives.tsx` — breadcrumb trail and JSON-LD extracted into exports; the legacy output is unchanged;
- `docs/00-project/CURRENT_STATE.md`, `docs/00-project/DECISION_LOG.md` (`DEC-034`), `docs/ui-revamp/PROGRAMME_RISKS_AND_LIVE_ISSUES.md`.

**New — application (16):**
- `app/direction-c.css`, `app/direction-c-pages.css`;
- `components/direction-c/` — 12 `.tsx`/`.ts` files;
- `components/direction-c/fonts/BricolageGrotesque-opsz-wght-latin.woff2` (76,868 B) and `OFL.txt`. The licence must be committed with the font (X9).

**New — documentation:**
- `docs/ui-revamp/GATE_1_DESIGN_DIRECTIONS.md`, `GATE_2_IMPLEMENTATION.md`, `GATE_3_REVIEW.md`, `GATE_3_REMEDIATION.md`, this file;
- `docs/ui-revamp/gate-1/` (53 MB), `gate-2/` (19 MB), `gate-3/` (0.6 MB), `gate-3-remediation/` (4.6 MB), `gate-3-acceptance/` (0.1 MB).

**Proposed checkpoint (two commits on `ui-revamp` only; stage by explicit path, never `git add -A`):**
1. `feat(ui-revamp): Direction C on /, /services, /seo (Gate 2 + Gate 3 remediation)`: the application files above. Add the A1 fix here if option A is authorised.
2. `docs(ui-revamp): Gate 1–3 records, evidence and final acceptance pack`: the documentation files above.

**Exclude:**

| Item | Reason |
|---|---|
| `.claude/launch.json` | Local preview config. Two entries point at a previous session's scratchpad |
| `.next/`, `node_modules/`, `*.tsbuildinfo` | Build artefacts; already ignored |
| Every scratchpad path: the BASELINE and BEFORE builds on `:3400`/`:3401`, this pass's 76 screenshots | Temporary |
| Any `.env*` | Already ignored. **The secrets scan of the untracked set was clean** |

**Screenshot volume needs an owner choice.** About 52 MB of the untracked screenshots are referenced by a report or evidence page;
about 18 MB are not. The unreferenced set is mainly `gate-2/screenshots/app/` (10.2 MB) and `gate-1/screenshots/` (6.3 MB +
1.2 MB motion). The repository has no Git LFS.

Recommendation:
- commit the referenced set, so the evidence pages keep working;
- commit `gate-1/screenshots/`, the record behind `DEC-034`;
- leave `gate-2/screenshots/app/` out unless the owner wants it.

Optionally, add `.claude/launch.json` to `.gitignore` in commit 2. That is a small config change and also needs approval.

**Not authorised by this pack:** any commit, push, merge or deployment.

---

## 8. Recommendation for the next implementation phase

The steps run in order. **Gate 4 does not start until step 3 is recorded (D7).**

1. **Gate 3 close-out, small and scoped:**
   - the A1 CTA wrap fix (and A2 if the owner wishes);
   - suites re-run;
   - the §2.1 manual device pass.
2. **Owner records the Gate 3 DEC** (§5.1) and resolves decisions 5, 7 and 8.
3. **Git checkpoint** on `ui-revamp` (§7). No merge to `main` while PROC-1 is open.
4. **Gate 4 planning** (Implementation Plan §Gate 4), proposed order:
   - **4D Navigation & Global Chrome** first. It replaces the `ChromeSwitch` seam and is where LIVE-1 can be absorbed if the owner chooses.
   - **4A Typography**: consolidate the two Bricolage instances (X4), calibrate the Android fallback (X2), evaluate subsetting.
   - **4E Components**: the button fixed in A1, toggle forced-colours.
   - **4G Proof**: needs the LIVE-2 wording authorised first.
   - GTM trigger research before any staging (Gate 8).

---

## 9. Session handoff (`SESSION_HANDOFF_TEMPLATE.md`)

- **Session:** 2026-10-08 · Claude (Opus 5.5) · Gate 3 final acceptance and checkpoint preparation (verification and governance).
- **Decisions approved during session:** none recorded. Owner directions D1–D7 are applied in §5 as **OWNER REQUIREMENTS**. The DEC text is proposed in §5.1.
- **Files changed:** this report; `docs/ui-revamp/gate-3-acceptance/evidence/*`; `CURRENT_STATE.md` (status line). **No application code.**
- **Tests actually run:** `acceptance-checks.cjs` on Playwright Chromium 151 and on Google Chrome 154 (254 PASS · 6 FAIL · 4 NOTE each); a text-spacing comparison against baseline `142b9c8` (24/24 PASS); diagnostic probes for A1, A2 and the disclosure harness.
- **Not run:** real devices, Safari, Firefox, VoiceOver (§2), and the existing suites (reused per the brief).
- **Next:** owner decision on §1 option A or B, and on §5 items 5, 7, 8 and 9.

---

## 10. Correction pass — A1 and A2 (owner-authorised, `DEC-035`)

| | |
|---|---|
| **Date** | 2026-10-08 |
| **Authorised by** | Owner brief "Gate 3 final accessibility correction". Recorded as `DEC-035`, together with the three design decisions |
| **BEFORE** | Build `7-ZqzKB1mAXbcZeuiC77h` (the remediation's final build), snapshotted to the session scratchpad and served on `:3402` |
| **AFTER (final)** | Build **`--Lpst9W4pkiythkOhmVS`**, `next build` + `next start` on `:3300`. **Every result in this section is from this build** |
| **Result** | **COMPLETE WITH EXCEPTIONS.** A1 and A2 are fixed and verified. The exceptions are in §10.6 (chiefly: no real-device, WebKit, Gecko or screen-reader testing) |

### 10.1 A1 — CTA overflow under text spacing and narrow reflow

**Fix.** `.dc-btn` no longer forbids wrapping. The label wraps inside the pill, within `max-width: 100%`, with `text-wrap: balance`,
centred, at `line-height: 1.25`, with 10px block padding. Single-line pills keep their height, because `min-height`
(44/48/52px) is larger than the content. The header-bar button keeps `line-height: 1`, so its short label stays exactly on its
previous baseline; it may still wrap.
- No overflow clipping was added anywhere.
- No wording, `href`, `data-*`/`aria-*` attribute or analytics changed: served-HTML CTA inventory identical on all three routes.

**Variants checked:**
- the shared CTA pair on the page ground (hero / `/services` / `/seo` openers);
- the same pair on the tangerine close section;
- the header-bar "Contact Us";
- the header "Book a call" text link;
- the mobile-menu pair (menu opened in the test).

**Results.** `a1a2-checks.cjs`; identical code was run against BEFORE and AFTER.

| Condition (×3 routes) | BEFORE | AFTER |
|---|---|---|
| WCAG 1.4.12 text spacing @360 (**original A1 failure**) | FAIL — CTA pair spans 16–400px of 360, 40px page scroll | **PASS** — inside the viewport; long label on 2 lines (328×72) |
| WCAG 1.4.12 text spacing @390 (**original A1 failure**) | FAIL — 16–400px of 390, 10px page scroll | **PASS** (358×72, 2 lines) |
| Text spacing @320 and @400% (320 CSS px) | FAIL — 80px page scroll | **PASS** (288×72; header "Contact Us" 2 lines, 134×48) |
| Normal @320 and @400% zoom | FAIL — pills end at 321px of 320, 1px scroll | **PASS** (long label on 2 lines, 288×64) |
| Normal and text spacing @430 / 768 / 1024 / 1440, and 200% zoom of 1440 / 1280 / 1024 | PASS | PASS (single line; no change) |
| Every CTA ≥ 44×44px, every mode and width | PASS | **PASS** |
| CTA focus ring ≥ 2px and fully inside the viewport (320 / 390, text spacing on) | **FAIL** on all three routes (ring followed the overflowing pill) | **PASS** |
| CTA labels, hrefs, `data-`/`aria-` attributes (served HTML) | — | **identical to BEFORE** (3/3 routes) |

**Normal-mode design preservation.** Full-page screenshots, BEFORE vs AFTER, with no overrides:
- **pixel-identical at 360, 390, 430, 768, 1024 and 1440 on all three routes (18/18);**
- also identical: the menu open at 360/390/768/1024, the services panel open at 1440, and the primary CTA focused at 390/1440 (7/7).
- **The only difference is 320px**, the A1 fix itself. BEFORE was 321px wide (overflow); AFTER is 320px wide and 24px taller, because the long label now takes two lines. The script logs these 3 cells as FAIL, and they are reported here as the **intended** change, not as passes.

> *During the pass, a first AFTER build changed ~550 pixels in the header-bar "Contact Us" at ≥ 768px: the label moved
> 0.11px because of the new line-height. The header-bar line-height was then pinned (above), and the final build is
> pixel-identical there.*

### 10.2 A2 — Traffic / Enquiries selected state in forced colours

**Fix.** A `@media (forced-colors: active)` block only:
- the marked button gets a `Highlight` fill with `HighlightText`, **plus a 2px `CanvasText` border**. The border is a shape cue that does not depend on colour;
- the unmarked button gets `Canvas` with an invisible border;
- focus is a 3px `CanvasText` outline.

The block uses the same selectors that already decide which button is marked, including the pre-hydration ones. So the stage
animation, its initial state, `aria-pressed`, the R7 pre-hydration contract and keyboard behaviour are unchanged. Normal-mode
computed styles of the toggle are **identical to BEFORE** at 390 and 1440.

| Check (forced colours emulated, Chromium) | BEFORE | AFTER |
|---|---|---|
| After hydration: selected and unselected differ in fill **and** border | **FAIL** — both rendered identically | **PASS** @390, @1440 |
| The bordered button is the `aria-pressed="true"` one | FAIL | **PASS** |
| Keyboard: Space on "Traffic" sets `aria-pressed` and moves the visible indicator | FAIL (no indicator) | **PASS** |
| Focus ring visible on the toggle | PASS | **PASS** (3px CanvasText) |
| No JS: only "Enquiries" (the painted, resolved state) is marked; controls disabled; no `aria-pressed` | FAIL (nothing marked) | **PASS** |

### 10.3 Exact changed files (correction pass)

**Application** (both files are untracked Direction C files; nothing else in `app/`, `components/` or `lib/` differs from BEFORE):

| File | Change |
|---|---|
| `app/direction-c.css` | `.dc-btn`: `white-space: nowrap` removed, `max-width: 100%` added. New A1 rule (wrap, balance, centre, line-height 1.25, block padding 10px). `.dc-hdr .dc-bar .dc-btn { line-height: 1 }` |
| `app/direction-c-pages.css` | New `@media (forced-colors: active)` block for `.dc-toggle` (A2) |

**Documentation and evidence:**
- `docs/00-project/DECISION_LOG.md` (`DEC-035`);
- `docs/00-project/CURRENT_STATE.md`;
- this report;
- `docs/ui-revamp/gate-3-acceptance/evidence/a1a2-checks.cjs`, `final-run/`, `screens/` (20 PNGs, 280 KB).

**Not changed:** copy, URLs, metadata, structured data, analytics, consent, forms, APIs, dependencies, workflows, any route
outside `/`, `/services` and `/seo`, the visual direction.

### 10.4 Updated test counts (final build `--Lpst9W4pkiythkOhmVS`)

| Suite | Result | File (`gate-3-acceptance/evidence/final-run/`) |
|---|---|---|
| Typecheck · eslint · unit tests · `verify:build` · production build | exit 0 · exit 0 · **11/11** · OK · exit 0 | `static.txt` |
| A1/A2 suite, AFTER vs BEFORE | **183 PASS**, 3 logged differences = the intended 320px change (§10.1) | `a1a2-after.txt` |
| A1/A2 suite on BEFORE (reproduction) | 122 PASS · **31 FAIL**: the six original A1 failures, 12 more A1 placement failures at 320/400%, 6 focus-ring failures, 7 A2 failures | `a1a2-before.txt` |
| Final acceptance suite: Playwright Chromium 151 / Google Chrome 154 | **261 PASS · 0 FAIL · 3 NOTE** each (first pass: 254 · 6 · 4) | `acceptance-chromium.txt`, `acceptance-chrome.txt` |
| Gate 3 remediation suite (`r-checks.cjs`) | **80/80 PASS** | `r-checks.txt` |
| Gate 2 application suite (`app-checks.cjs`): responsive ×6 widths, menu, disclosure, focus, **reduced motion**, no-JS, names, CTAs | **192/192 PASS** | `app-checks.txt` |
| Out-of-scope routes vs baseline `142b9c8` (21 routes incl. 404, 390 + 1440) | **42/42 pixel-identical**, same text and links | `unrelated-routes.txt` |
| axe-core (wcag2a/aa, 21a/aa, 22aa), 3 routes × 390/1440 | **0 violations** (baseline `/`: 4 types) | `probe.txt` §1 |
| Analytics `page_view` sequence vs baseline | **identical** | `probe.txt` §5 |
| Chrome seam (client navigation, back/forward) | correct chrome every step, 1 header, **0 console errors/warnings** | `chrome-nav.txt` |
| Content / SEO, BEFORE vs AFTER (served HTML) | **Inventories byte-identical.** Title, description, canonical, robots, OG, status, forms, JSON-LD, heading sequence, link multiset, 0 text blocks lost | `compare-before-vs-after.txt` |
| Slow-network CLS (Gate 3 profile, 3 runs), now **including 320px** | **≤ 0.001 in all 23 cells**: `/` 0.001 at 320–1440; `/services` ≤ 0.001; `/seo` 0.000; `/about` control 0.000. Every cell is identical across its 3 runs, and matches the remediation figures. Throttled LCP ~3.8 s, unchanged. Font loading is untouched (3 preloads on Direction C routes, 2 on legacy; `probe.txt` §6) | `cls-throttled.txt` |

**The three remaining NOTEs** are the forced-colours "Services submenu" chevron button at 1440: it has no border, and its
boundary is the visible chevron glyph. It is informational, outside A2's scope, and not changed.

**Harness defects found this pass.**
- My first A1 line counter included the marker `<span>` and mislabelled single-line pills as two lines. It was fixed, and the reported counts come from the fixed counter.
- A misdirected eslint redirect wrote an empty file outside the repository. It was removed.
- Neither affected the application.

### 10.5 Screenshots (`gate-3-acceptance/evidence/screens/`)

| Condition | BEFORE | AFTER |
|---|---|---|
| `/` hero CTAs, 360px, WCAG text spacing | ![](gate-3-acceptance/evidence/screens/BEFORE-a1-text-spacing-360-hero-ctas.png) | ![](gate-3-acceptance/evidence/screens/AFTER-a1-text-spacing-360-hero-ctas.png) |
| `/` hero CTAs, 320px, text spacing | ![](gate-3-acceptance/evidence/screens/BEFORE-a1-text-spacing-320-hero-ctas.png) | ![](gate-3-acceptance/evidence/screens/AFTER-a1-text-spacing-320-hero-ctas.png) |
| `/` hero CTAs, 320px, normal | ![](gate-3-acceptance/evidence/screens/BEFORE-a1-normal-320-hero-ctas.png) | ![](gate-3-acceptance/evidence/screens/AFTER-a1-normal-320-hero-ctas.png) |
| Toggle, forced colours, 1440, Enquiries selected | ![](gate-3-acceptance/evidence/screens/BEFORE-a2-forced-1440-enquiries.png) | ![](gate-3-acceptance/evidence/screens/AFTER-a2-forced-1440-enquiries.png) |
| Toggle, forced colours, 1440, Traffic selected via keyboard | ![](gate-3-acceptance/evidence/screens/BEFORE-a2-forced-1440-traffic-focused.png) | ![](gate-3-acceptance/evidence/screens/AFTER-a2-forced-1440-traffic-focused.png) |

The same set exists at 390 for A2, and for 360 normal and 400% zoom for A1. Element screenshots crop at the element box, so a
focus outline drawn outside it is not visible in the image. Focus visibility is asserted by the suite, not by these images.

### 10.6 Remaining exceptions

| # | Exception | Status |
|---|---|---|
| E1 | **No real Android Chrome, real iPhone Safari, desktop Safari, desktop Firefox or VoiceOver testing.** Forced colours, zoom and phone landscape are Chromium emulation | **Outstanding acceptance requirement** (`DEC-035`). Checklist §2.1, plus: under iOS/Android "larger text" settings, confirm the CTA wraps and nothing is clipped; in Windows High Contrast, confirm the toggle indicator |
| E2 | `text-wrap: balance` is unsupported in older WebKit/Gecko. There a wrapped label wraps greedily (e.g. "…trying to / fix"). It is still fully visible with no overflow | Accepted progressive enhancement |
| E3 | Android display-font fallback uncalibrated (remediation X2) | Device pass |
| E4 | Forced-colours "Services submenu" chevron button has no border (informational NOTE) | Gate 4D/4E |
| E5 | A3 (SVG caption under text spacing), A4 / X5 (logo name, R8, 11px SVG text), X1, X3, X4, X8, X9 | Unchanged; Gate 4 |
| E6 | GTM triggers keyed on legacy DOM | RESEARCH REQUIRED before staging |
| E7 | `LIVE-1`, `LIVE-2`, `PROC-1` | **OPEN, untouched.** LIVE-1 re-verified present on legacy `/about` @390 (`chrome-nav.txt`) |

### 10.7 Recommendation for formal Gate 3 approval

**Recommend: APPROVE GATE 3 WITH RECORDED EXCEPTIONS.** Do not approve unconditionally.

Basis:
- Review conditions R1–R4 and refinements R5–R7 are met.
- Decisions 5, 7 and 8 are recorded (`DEC-035`).
- A1 and A2 are fixed with no normal-mode design change outside 320px.
- Every automated suite passes on the final build.

What keeps it conditional is **E1**: no WebKit, Gecko, real-device or screen-reader evidence exists.

The owner has two clean options:
- **(i)** run the §2.1 checklist (about 20 minutes, plus the E1 additions), then record Gate 3 approved with exceptions E2–E7;
- **(ii)** record Gate 3 approved with exceptions now, with E1 named as a **hard entry condition for Gate 5** (site-wide responsive QA), and no staging (Gate 8) without it.

I recommend **(i)**. Safari and VoiceOver are available on this Mac today.

Proposed wording for the owner (not recorded):
> **DEC-036 — UI Revamp Gate 3 (Direction Approval): APPROVED WITH EXCEPTIONS.**
> - Direction C is approved on `/`, `/services`, `/seo` and their chrome.
> - Accepted: R1–R7 and A1–A2 (build `--Lpst9W4pkiythkOhmVS`).
> - Decisions per `DEC-035` and owner directions D1–D7.
> - Exceptions E1–E7 (`GATE_3_FINAL_ACCEPTANCE.md` §10.6). E1 is [completed on … / an entry condition for Gate 5 and Gate 8].
> - Does not approve Gate 4 start without a separate instruction. Does not approve a merge to `main`, staging or production. LIVE-1, LIVE-2 and PROC-1 are unchanged.

---

## 11. Checkpoint manifest (proposed — nothing committed)

Branch `ui-revamp` only. Stage **by explicit path**, never `git add -A`/`.`. Four groups, which can be four commits:

**Group 1 — Application implementation.** `feat(ui-revamp): Direction C on /, /services, /seo (Gate 2, Gate 3 remediation, A1/A2)`

| Path | State |
|---|---|
| `app/layout.tsx`, `app/page.tsx`, `app/(pages)/services/page.tsx`, `app/(pages)/seo/page.tsx`, `components/commercial/primitives.tsx` | modified |
| `app/direction-c.css`, `app/direction-c-pages.css` | new |
| `components/direction-c/` — `ChromeSwitch.tsx`, `HeroStage.tsx`, `Motion.tsx`, `ServiceBands.tsx`, `SiteFooter.tsx`, `SiteHeader.tsx`, `fonts.ts`, `nav.ts`, `primitives.tsx`, `home/HomeAccountability.tsx`, `home/HomeHero.tsx`, `home/HomeStrategy.tsx` | new (12) |
| `components/direction-c/fonts/BricolageGrotesque-opsz-wght-latin.woff2` (76,868 B) + `OFL.txt` | new; the licence must go with the font |

**Group 2 — Governance and decision documents.** `docs(ui-revamp): Gate 1–3 decisions, reports and state (DEC-034, DEC-035)`
- `docs/00-project/DECISION_LOG.md`, `docs/00-project/CURRENT_STATE.md`, `docs/ui-revamp/PROGRAMME_RISKS_AND_LIVE_ISSUES.md` (modified);
- `docs/ui-revamp/GATE_1_DESIGN_DIRECTIONS.md`, `GATE_2_IMPLEMENTATION.md`, `GATE_3_REVIEW.md`, `GATE_3_REMEDIATION.md`, `GATE_3_FINAL_ACCEPTANCE.md` (new);
- `docs/ui-revamp/gate-1/README.md`, `gate-1/prototypes/` (8 HTML files, including the frozen approved reference named in `DEC-034`), `gate-1/mobile-refinement/**/*.md`, `gate-2/README.md`.

**Group 3 — Essential QA evidence** (scripts, raw outputs, evidence pages and the screenshots those pages reference). `docs(ui-revamp): Gate 2–3 QA evidence`
- `docs/ui-revamp/gate-3-acceptance/` (0.65 MB, all of it);
- `docs/ui-revamp/gate-3-remediation/` (4.6 MB);
- `docs/ui-revamp/gate-3/` (0.6 MB);
- `docs/ui-revamp/gate-2/validation/`, `gate-2/screenshots/compare/` + `compare.html` (8 MB);
- `gate-1/mobile-refinement/**` validation text, `compare.html`, plus its referenced before/after images (~39 MB).

**Group 4 — Optional bulky screenshots** (owner choice; not referenced by any report or evidence page):
- `docs/ui-revamp/gate-2/screenshots/app/` — 10.2 MB;
- `docs/ui-revamp/gate-1/screenshots/` — 6.3 MB + 1.2 MB motion. This is the Gate 1 direction comparison; I'd keep it as the visual record behind `DEC-034`;
- a few small unreferenced motion frames in `gate-1/mobile-refinement/**/motion/`.

The repository has no Git LFS. Groups 3 and 4 together add roughly 70 MB of binary history.

**Exclude (do not stage):**

| Item | Reason |
|---|---|
| `.claude/` (`launch.json`) | Local preview configuration; entries point at session scratchpads |
| `.next/`, `node_modules/`, `*.tsbuildinfo` | Build artefacts (already ignored) |
| Session scratchpads: BEFORE snapshot (`:3402`), the BASELINE / Gate 2 BEFORE builds (`:3400`/`:3401`) | Temporary; outside the repository |
| `.env*`, keys, tokens | None present. The secrets scan of the untracked set was clean (filename matches only on `keyboard*.txt`) |
| Anything outside the lists above | Unrelated. `git status` shows no other changes |

**Not authorised by this pack:** commit, push, merge, staging or production deployment. Local servers left running: `:3300`
(final build, this session's preview), `:3402` (BEFORE snapshot) and `:3400`/`:3401` (an earlier session's). All are local only.

---

## 12. Session handoff — correction pass (`SESSION_HANDOFF_TEMPLATE.md`)

- **Session:** 2026-10-08 · Claude (Opus 5.5) · Principal Frontend Engineer / Accessibility QA Lead · Gate 3 final accessibility correction.
- **Decisions recorded:** `DEC-035`, covering decisions 5, 7 and 8 and the A1/A2 authorisation; device testing is retained as outstanding. **Gate 3 approval is NOT recorded.**
- **Application files changed:** `app/direction-c.css`, `app/direction-c-pages.css` (CSS only).
- **Tests actually run:** everything in §10.4, on the final build `--Lpst9W4pkiythkOhmVS`.
- **Not run:** real devices, Safari, Firefox, VoiceOver (E1).
- **Next:** owner decision on §10.7 option (i) or (ii); owner choice on the checkpoint groups (§11), especially Group 4; then a separate instruction to commit.
