# MappedSkills UI Revamp — Gate 3: Independent Design & Release Review

| | |
|---|---|
| **Date** | 2026-10-08 |
| **Scope** | Direction C (`DEC-034`) on `/`, `/services`, `/seo`, branch `ui-revamp` @ `142b9c8` + uncommitted Gate 2 work |
| **Reviewer role** | Independent Principal UX / Frontend Architect / Accessibility / QA — **review only; no implementation changed** |
| **Evidence** | `gate-3/evidence/` (independent scripts + raw output) · `gate-3/index.html` (browser-viewable evidence page) · reproduced Gate 2 suites |
| **Verdict** | **APPROVAL WITH CONDITIONS** — approve Direction C and its component architecture; **do not start Gate 4** until the four P1 conditions in §7 are met and re-verified |

**Gate naming.** This is the UI-revamp Gate 3 (Implementation Plan: "Direction Approval", a hard human approval gate). It is
**not** Gate 3 of `docs/00-project/QUALITY_GATES.md` ("Search Opportunity Validation"), which is a different programme gate.

**State confirmed.** Branch `ui-revamp`, HEAD `142b9c8`; Gate 2 work uncommitted, nothing merged or deployed. `DEC-034`
recorded (Direction C + Gate 2 only). **Gate 3 is not approved; nothing in this review approves it.** Open:
`LIVE-1`, `LIVE-2`, `PROC-1` (unchanged, §6) and the seven decisions in §5.

**Method.** A fresh production baseline was built from `142b9c8` in a separate worktree (since removed) and compared with
a fresh production build of the working tree (`next build` + `next start`). Independent probes were written for this
review (`probe.cjs`, `investigate.cjs`, `chrome-nav.cjs`), and the Gate 2 suites were re-run against the new baseline.
**All results are automated Chromium (Playwright).** No real device, Safari/WebKit, Firefox, or screen reader was used.

---

## 1. Executive verdict

**APPROVAL WITH CONDITIONS.** The Gate 2 report's core claims hold up under independent checking.
- Copy, SEO surfaces and CTA destinations are preserved.
- Every other route is pixel-identical to baseline.
- axe-core finds 0 WCAG A/AA violations on all three routes; the baseline homepage had 4 violation types.
- Static gates pass.

The review found three issues Gate 2 did not report, each a P1, and one more that I confirmed:
1. **No direct header route to `/services`** at any width. Baseline desktop had one.
2. **Homepage CLS 0.158 on a slow connection** at 1440. Baseline was 0.009. Gate 2's "CLS 0" was measured on unthrottled localhost only.
3. **Two names for the same destinations on one page.** The new chrome says "The enquiry path / Enquiry generation"; the homepage's own approved links say "Conversion optimisation / Lead generation".
4. The strike-through on "we do not promise" (already flagged in Gate 2) is a legibility and meaning risk.

None is a P0. All four are fixable inside the Direction C layer without touching copy, IA, metadata or tracking, except finding 3, which needs a terminology decision.

---

## 2. Verified technical results (reproduced independently)

| Area | Result | Source |
|---|---|---|
| Typecheck · lint · tests · production build | exit 0 · exit 0 · **11/11** · exit 0 | run this review |
| Gate 2 application suite, re-run | **192/192 PASS** | `evidence/rerun-app-checks.txt` |
| Out-of-scope routes vs fresh baseline (21 routes incl. 404, 390 + 1440) | **42/42 pixel-identical**, same text and links | `evidence/rerun-unrelated-routes.txt` |
| Content / SEO preservation | 0 visible text blocks lost. Title, description, canonical, robots, OG/Twitter, JSON-LD **identical** (24/24). Same link-destination multiset. `/seo` heading order changed per ruling 2 | `evidence/rerun-compare.txt` |
| axe-core 4.13.0 (wcag2a/aa, 21a/aa, 22aa), 390 + 1440 | **Candidate: 0 violations on all 3 routes.** Baseline `/`: 4 types (`aria-required-children`, `aria-required-parent` [critical], `color-contrast`, `listitem`) | `evidence/probe-result.txt` §1 |
| Analytics | `page_view` sequence identical to baseline across `/ → /services → /seo → /about → /` (path and `page_type`); no event code changed; container gated by consent as before | probe §5 |
| Chrome seam | Direction C ↔ legacy chrome swaps correctly on client navigation and back/forward; one header; **0 console errors/warnings** | `evidence/chrome-nav-result.txt` |
| Keyboard / focus / reduced motion / no-JS | PASS in the re-run suite (every Tab stop has a ≥2px outline; Escape and focus return; reduced motion leaves no transition >10ms; no-JS pages are complete) | re-run suite |
| Font loading | 3 font preloads on `/` (baseline 2); legacy `/about` unchanged at 2 | probe §6 |
| **CLS, slow connection** (400 ms RTT, 400 kbps, 4× CPU) | **`/` @1440 0.158** (baseline 0.009); `/services` @390 0.050 (0.000); `/seo` @390 0.045 (0.021); `/` @390 0.008 (0.028) | probe §6, investigate C |
| CLS, unthrottled localhost | 0.000 (matches Gate 2's claim, which is accurate but incomplete) | Gate 2 |

**Gate 2 report accuracy.** The reproduced claims are accurate. The one material omission is CLS under realistic network
conditions. The byte figures in Gate 2 §7 were **not** re-measured here.

---

## 3. Visual and UX findings (P0 = blocker … P3 = polish)

### Verified defects

| P | Finding | Evidence |
|---|---|---|
| **P1** | **No direct, discoverable route to `/services` in the header.** At 1440 "Services" is a disclosure button. At 390–1024 it is only inside the closed menu. 0 visible header links to `/services` at any width, with JS on or off. Baseline desktop had a direct "Services" link. **With JavaScript off, the desktop header cannot reach any service page**: the button does nothing and the panel is `inert`. The footer and `/seo` breadcrumb still link to it | probe §2 |
| **P1** | **Homepage H1 reflows on slow connections.** The 75 KB opsz face arrives after first paint (`display: swap`), so the H1 sits on 3 lines in the Arial-metric fallback for about 7s, then collapses to 2 lines (301→201px). **CLS 0.158 at 1440**, above the 0.1 "good" threshold | `evidence/home-1440-throttled-{early,late}.png`, investigate C |
| **P1** | **Two names for one destination on the same page.** Homepage stage links (approved copy): "Conversion optimisation", "Lead generation". Header panel, mobile menu and footer: "The enquiry path"/"Enquiry path", "Enquiry generation". Same hrefs | homepage at any width |
| **P2** | **Pre-hydration contradiction on the stage.** Before hydration the stage is painted dark (traffic) while the toggle shows **Enquiries** pressed and the label reads "what we report". On slow loads this lasts several seconds. The mechanism was inherited from production but is now on screen longer because of the font delay | `evidence/home-1440-throttled-early.png` |
| **P2** | **`/seo` horizon plate runs about 93–96 characters per line at 600–899px** (full-width plate with no measure cap), against the 58ch rule restored under `DEC-030` | investigate B |
| **P2** | **Running body text is set in the dim colour** (`--dim`, 6.38:1) almost everywhere. The prototype sets `.body` in ink and reserves dim for notes. It passes contrast but flattens hierarchy and reduces readability. Not an approved difference | `gate-2/screenshots/compare.html` (e.g. `/seo` situation block) |
| P3 | 28-run evidence is `aria-hidden`; a screen reader hears only the key line in the Evidence row (the 28 and "none named" are in Claim and Method) | probe §7 |
| P3 | `/services` grew 0.6–1.2 screens at 360–768 (13.2→13.8 @360, 10.0→11.2 @768) | probe §4 |
| P3 | Logo link name "MappedSkills Logo" (inherited); `/services` figure uses 11px SVG text (inherited `ChainFull`) | probe §3, §7 |

### Checked and found sound

- Typography matches the prototype closely, including opsz display type once the font loads.
- No overflow or clipping at six widths. The flagged `/seo` "overlaps" are text inside collapsed `<details>`, which is not painted (false positive). "enquiries × traffic" is the intended 0.98 leading.
- Single-word last lines were checked and are acceptable ("Two ways / to start." is a balanced wrap).
- CTA hierarchy is consistent (primary `/contact`, secondary `/schedule-call`), with 44px+ targets.
- Menu: one Contact Us while open, CTAs first, "Company" label, Escape and focus return, not sticky.
- Evidence plates are legible at 390.
- Capture / Convert / Measure is consistent across the chain, stage lines, bands and nav grouping.
- Reduced motion and no-JS states are complete. The footer is complete and matches production content.
- Route consistency: one container, one button family, one close pattern across all three routes.

---

## 4. Prototype-versus-application differences

Approved by ruling or documented in Gate 2 (`GATE_2_IMPLEMENTATION.md` §5 D1–D13): production copy throughout,
unapproved prototype microcopy omitted, LIVE-2 headline kept, chain accuracy corrections, static stage lines,
departure band on ground, production logo, text social links, reused commercial figures.

**Not explicitly approved, found in this review:**
1. **Body-text colour:** dim instead of ink (§3 P2).
2. **`/seo` horizon panel density:** about 2.3× the prototype's height, because it carries the full boundary copy. The owner approved the placement against a compact three-line panel.
3. **No direct Services link:** the prototype also used a button. The difference is from production behaviour, and it was implemented without assessing the IA consequence.
4. **Mixed vocabulary on one page** (§3 P1).
5. **Opsz font loading behaviour** (the prototype loaded fonts from Google with different timing).

Browser-viewable comparison: `gate-2/screenshots/compare.html` (53 section pairs, six widths) and `gate-3/index.html`.

---

## 5. Decision matrix

| # | Decision | Recommendation | Rationale |
|---|---|---|---|
| 1 | Optical-size display font (+75 KB on the three routes) | **REVISE** | The opsz face is what makes the hero match the approved direction (verified visually), so keep the intent. As shipped it causes the P1 CLS. Revise the loading, not the look: (a) make the opsz face fall back to the already-loaded site Bricolage instead of an Arial-metric fallback, and/or use `font-display: optional` for the display face; (b) subset it to the display weights/glyphs to cut bytes; (c) re-measure throttled CLS. **If CLS cannot be brought under 0.1 on the slow profile, drop opsz.** Legacy routes are unaffected either way |
| 2 | Navigation/service terminology | **REVISE** (owner copy decision) | The current state is internally inconsistent: two names for one destination on the homepage. Pick one vocabulary per destination across chrome and page links. Either (a) keep the `/services` capability names and also approve renaming the homepage stage links (a copy change), or (b) revert the chrome to the legacy NAV-approved labels. I lean to (a), because those names express the approved positioning, but it needs a recorded copy approval |
| 3 | Desktop Services dropdown vs direct navigation | **REVISE** | A disclosure-only "Services" removes the direct route to `/services` and breaks no-JS service navigation on desktop. Use a split control: **"Services" as a real link to `/services`** plus an adjacent disclosure button for the panel (the production pattern, in Direction C styling), and keep "All services" in the panel. Below 1200px a "Services" link is already first in the menu |
| 4 | Evidence / Method / Limitation and Claim labels | **APPROVE** | Accurate, structural, and they make the proof taxonomy (Gate 1 §4.3) legible. Exposed as `dt`/`dd` pairs, and axe is clean. Condition: Limitation is never collapsed, and a plate never carries a number without its scope |
| 5 | Crossed-out promises | **REJECT** the strike-through; keep the list | A line through dim text lowers legibility. Striking "revenue" can read as "revenue doesn't matter" rather than "not promised". The treatment was removed once already (Session 19A). The heading "we do not promise" and the open marks already carry the meaning |
| 6 | Always-open Capture / Convert / Measure rows | **APPROVE** | All content and all seven links are visible with nothing gated. It removes the baseline's auto-advancing tablist, which axe flags with critical ARIA errors (`aria-required-children/parent`) and which is a WCAG 2.2.2 risk. Simpler, and it matches the prototype |
| 7 | SEO horizon panel placement | **APPROVE** placement (already ruling 2), with **REVISE** for density | The 12-month-plus horizon now meets the reader directly after the CTAs, which is the strongest expectation-setting position. Two conditions: cap the plate's text measure (~60ch) at 600–899px, and have the owner confirm the recorded interpretation of ruling 2 and accept the longer full-copy panel (or approve a shorter approved wording) |

---

## 6. Outstanding accessibility and performance risks

- **Not tested (UNKNOWN):** real iOS/Android devices, Safari/WebKit, Firefox, VoiceOver/TalkBack/NVDA, 200% zoom and text spacing, landscape, forced colours, field Core Web Vitals. axe and keyboard checks are automated Chromium only.
- **Slow-network CLS** on `/` (P1) and the pre-hydration stage contradiction (P2).
- **No-JS desktop service navigation** (decision 3). No-JS mobile navigation depends on JS, as in baseline (parity, not a regression).
- **Font bytes:** +75 KB on Direction C routes. Legacy routes may warm it through Next.js link prefetch (Gate 2 §7; not re-measured here).
- **GTM triggers** are not in the repository. Any trigger keyed on legacy classes or DOM (not href/text) would not fire on these routes — **RESEARCH REQUIRED** before staging.
- **Governance boundaries, unchanged:**
  - **LIVE-1** is still present on every legacy route (verified: `/about` header `sticky` at 390); it simply cannot occur on the three Direction C routes. Not fixed.
  - **LIVE-2** headline is still published on `/`. Not fixed.
  - **PROC-1**: do not merge `ui-revamp` to `main`.
  - None is closed by this review.

---

## 7. Recommended refinements, by impact

| # | Refinement | Closes | Copy/IA impact |
|---|---|---|---|
| R1 | Split Services control: direct link + disclosure button | P1 discoverability, no-JS | None (restores production behaviour) |
| R2 | Font loading: same-family fallback and/or `optional`, subset; re-measure throttled CLS < 0.1 | P1 CLS | None |
| R3 | One vocabulary per destination (owner picks, decision 2) | P1 consistency | **Copy decision** |
| R4 | Remove the strike-through on not-promised items | Decision 5 | None |
| R5 | Running body text in ink, dim reserved for notes (as the prototype) | P2 hierarchy | None |
| R6 | Cap the horizon-plate measure at 600–899px | P2 measure | None |
| R7 | Make the pre-paint state coherent (toggle/label match the dark stage until hydration, or start resolved on slow loads) | P2 | None |
| R8 | Expose the run count in the Evidence row as visually-hidden text derived from existing copy | P3 | None (reuses approved wording) |

**R1, R2, R3 and R4 are the conditions for Gate 3 approval.** R5–R8 are strongly recommended in the same pass.

---

## 8. Items requiring owner approval

1. **Gate 3 verdict:** approve Direction C on the three pages **conditional on R1–R4**, re-verified by an updated evidence run.
2. **Decision 1:** keep opsz subject to R2 meeting CLS < 0.1 on the slow profile; otherwise drop it.
3. **Decision 2:** choose the vocabulary. If the `/services` names are kept, approve renaming the homepage stage links (copy change, record as a DEC).
4. **Decision 3:** approve the split Services control.
5. **Decision 4:** approve the plate labels (and the "Claim" tag).
6. **Decision 5:** approve removing the strike-through.
7. **Decision 6:** approve the always-open stage rows (retiring the Phase D tablist on `/`).
8. **Decision 7:** confirm the ruling-2 interpretation, and accept the full-copy horizon panel or commission shorter approved wording.
9. Accept the testing gap, or require a real-device / Safari / Firefox / screen-reader pass **before** Gate 3 is recorded (recommended).

---

## 9. Proposed next workstream and stop conditions

**Next: "Gate 3 refinement pass"**, scoped strictly to `components/direction-c/*`, `app/direction-c*.css` and the three
routes. It implements R1–R4 (plus R5–R8 if approved) after the owner records decisions 1–8. It then re-runs the Gate 2
suites, this review's probes (including throttled CLS and axe), and a manual pass on iOS Safari, Android Chrome, Firefox,
and VoiceOver. The owner then records the Gate 3 decision as a new DEC.

**Stop conditions:**
- Stop if any refinement would change approved copy beyond the decision-2 outcome, the IA beyond restoring the direct Services link, metadata, tracking or backend.
- No Gate 4 global rollout.
- No commit to `main`, no staging or production deployment.
- LIVE-1, LIVE-2 and PROC-1 are handled only through their own authorised workstreams.

**This review stops here.**
