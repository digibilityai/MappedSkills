# MappedSkills UI Revamp — Gate 3 Conditional Remediation: Closure Report

| | |
|---|---|
| **Date** | 2026-10-08 |
| **Branch** | `ui-revamp` @ `142b9c8` + uncommitted Gate 2, Gate 3 review and remediation work. **Nothing committed, pushed, merged or deployed** |
| **Scope** | The seven conditions in `GATE_3_REVIEW.md` §7 (R1–R7) on `/`, `/services`, `/seo` and their Direction C chrome |
| **Evidence** | `gate-3-remediation/index.html` (before/after evidence page) · `gate-3-remediation/evidence/` (scripts and raw outputs) |
| **Result** | **COMPLETE WITH EXCEPTIONS** (§8) |
| **Recommendation** | The owner may approve Gate 3, subject to the decisions in §9. **This report does not approve Gate 3** |

**Gate naming.** This is the UI-revamp Gate 3 (Implementation Plan, "Direction Approval", a human approval gate). It is **not**
Gate 3 of `docs/00-project/QUALITY_GATES.md` ("Search Opportunity Validation"). That programme gate has its own status, and this
work does not change it.

**Method.** There were three local production builds (`next build` + `next start`), compared in Playwright Chromium:
- **BASELINE**: `142b9c8`, in a separate worktree.
- **BEFORE**: a snapshot of the Gate 2 working tree, taken before any remediation edit.
- **AFTER**: the remediated tree.

Evidence labels follow `CLAUDE.md`. **VERIFIED** means measured in this session on these builds. No real device, Safari/WebKit,
Firefox or screen reader was used (**UNKNOWN** for those).

---

## 1. Findings and disposition

| # | Gate 3 finding | Disposition | Verified by |
|---|---|---|---|
| R1 (P1) | No direct header route to `/services` (desktop disclosure-only, dead without JS) | **RESOLVED.** Split control: a real `Services` link to `/services`, then a separate 44×44 disclosure button (`aria-label="Services submenu"`, `aria-expanded`, `aria-controls`). It is not `role=menu`. Without JS the link works and the dead button is hidden (`<noscript>` style). Below 1200px, "Services →" stays first in the menu's service group, and the footer links to `/services` | `final-r-checks.txt` (25 checks: keyboard order, Space/Enter, Escape returns focus, mouse, outside click, touch tap, no-JS at 1200/1440, current-page state); `final-probe-result.txt` §2 |
| R2 (P1) | Homepage H1 reflow on slow connections, CLS 0.158 @1440 | **RESOLVED, Direction C typography retained** (details in §4) | `final-cls-throttled.txt`, `final-probe-result.txt` §6, `fontprobe-after.txt` |
| R3 (P1) | Two names for one destination on one page | **RESOLVED for the owner-named destinations.** Header panel, mobile menu and footer now say **"Conversion optimisation"** and **"Lead generation"**, the names the homepage's approved links already use. URLs, titles, H1s, descriptions and slugs are unchanged | `final-r-checks.txt` R3; `chrome-links-diff.txt` |
| R4 | Strike-through on "we do not promise" | **RESOLVED.** Strike-through removed. Text, weight, muted register and the open marks are unchanged; contrast is 6.38:1 | `final-r-checks.txt` R4 (text identical to before) |
| R5 (P2) | Running body text set in dim | **RESOLVED.** `dim` removed from the 15 running-text paragraphs on `/services` (11) and `/seo` (4), matching the prototype's ink `.body`. Notes, labels, captions, plate terms and service descriptions stay muted | `final-r-checks.txt` R5 |
| R6 (P2) | `/seo` horizon panel: 89–109 characters/line at 600–899px | **RESOLVED.** Text measure capped at 50ch in that band, giving **62 average / 66 maximum** characters per line. The panel stays directly after the opener CTAs. Text is identical (1,014 characters); nothing was shortened, omitted or rewritten | `final-r-checks.txt` R6 |
| R7 (P2) | Pre-hydration stage contradiction (dark stage, "Enquiries" pressed) | **RESOLVED** (details below) | `final-r-checks.txt` R7 |
| R8 (P3) | 28-run count `aria-hidden` | **Not in this remediation's scope** — unchanged | — |

**R7 in detail.** Until React owns the state, the markup asserts no state:
- the label spans carry no `aria-hidden`, and CSS shows the one matching the painted stage (`visibility` also governs the accessibility tree);
- the toggle buttons carry no `aria-pressed` and are `disabled`, because they cannot act yet, and cannot act at all without JS;
- CSS marks the button matching the painted stage.

Visual, marked control and accessible state were checked for agreement in each of these cases:
- before hydration;
- after the pre-paint 4 s timeout without hydration;
- through slow loads (15–16 pre-hydration samples each at 1440 and 390, 0 disagreements);
- after hydration;
- with no JS;
- under reduced motion.

## 2. Files changed by the remediation

| File | Change |
|---|---|
| `components/direction-c/SiteHeader.tsx` | R1 split control (link + disclosure button), no-JS rule |
| `components/direction-c/nav.ts` | R3 two Convert labels; header comment |
| `components/direction-c/fonts.ts` | R2 opsz face via `next/font/local` under its own family; `adjustFontFallback: false` |
| `components/direction-c/fonts/BricolageGrotesque-opsz-wght-latin.woff2` (new) | Byte-identical to the file Google Fonts served for the Gate 2 build (sha256 `85f55a58…c377447`, 76,868 B) |
| `components/direction-c/fonts/OFL.txt` (new) | SIL Open Font License 1.1 for Bricolage Grotesque (from `google/fonts`) |
| `components/direction-c/HeroStage.tsx` | R7 pre-hydration state |
| `app/direction-c.css` | R2 calibrated fallbacks and scoped font tokens; R1 nav styles |
| `app/direction-c-pages.css` | R2 hero fallback and `ch`→`em` statement measures; R4; R6; R7 |
| `app/(pages)/services/page.tsx`, `app/(pages)/seo/page.tsx` | R5 only: `<Body dim>` → `<Body>`. No copy, metadata or structure change |
| Docs | this report, `gate-3-remediation/`, `CURRENT_STATE.md` |
| Local only | `.claude/launch.json` (two preview configs). **Do not commit** |

Not changed: any other route, metadata, structured data, analytics, consent, forms, APIs, backend, dependencies (`package.json`
untouched), workflows.

## 3. Before/after visual evidence

**Evidence page:** `gate-3-remediation/index.html`. It shows 27 before/after pairs, covering:
- the header (closed, on `/services`, panel open);
- the mobile menu (390, 768);
- the footer (390, 1440);
- the promises (`/` and `/services`);
- body text (3 sections);
- the horizon panel (600, 768, 899, 1440);
- the stage before hydration (1440, 390) and with no JS;
- the homepage while the font is pending vs final (1440, 1024, 768, 390).

**Must-not-change identity checks: pixel-identical BEFORE→AFTER** (`screens/ba-shots-result.txt`). These cover:
- the homepage H1 (1440, 390), strategy/chain section and close (1440, 390);
- the `/services` bands (1440, 390) and close;
- the `/seo` H1 (1440, 390), work section and close.

This confirms that self-hosting the font, scoping the type tokens and converting `ch` to `em` did not change final rendering.

## 4. Slow-network CLS and font loading (R2)

**Root cause (VERIFIED, not stated in Gate 2 or Gate 3).**
- next/font/google gave the opsz instance the **same family name** as the site instance, "Bricolage Grotesque".
- On Direction C routes the opsz face was declared later and shadowed the site face. While it downloaded, Chrome painted display text in the **already-loaded site face at its default optical size**, which is much wider than opsz 96/72. Text then re-wrapped on arrival.
- No fallback could engage while a same-named face was available.
- A secondary cause: `max-width` in `ch` on two statements resolved against whichever font was available, so their boxes narrowed by ~14% while the face was loading.

**Fix, with the design retained.**
1. **Own family for the opsz face.** The face is self-hosted with `next/font/local` under its own family name, using the same bytes as before.
2. **Calibrated fallbacks for the display roles.** Each role names a local Arial Bold fallback with `size-adjust`. The value was measured as the ratio of Bricolage 800 to Arial Bold advance widths over every display text on the three routes, then set mid-window of a sweep over all six widths (`sweep.cjs`):
   - homepage hero **93.5%**;
   - other H1s **90.5%**;
   - statements **96.4%**.

   The ascent and descent overrides reproduce Bricolage's 0.93 / 0.27 em. Titles fall back to the preloaded site face, which was their behaviour in Gate 2.
3. **`ch` to `em` on statement measures.** They now use exact `em` equivalents: 1ch = 0.6163em, measured from the Gate 2 build's computed widths.

**Results.**

| Measure | BEFORE | AFTER |
|---|---|---|
| Display elements whose line count changes when the face arrives (108 element×width cases) | **17** | **1** — a `/services` statement at 1440, far below the first screen, so it cannot count toward CLS |
| H1 height, opsz face held pending → final, `/` @1440 / @768 | 301→201px / 187→125px | 201→201 / 125→125 (no reflow) |

Slow-network CLS used the Gate 3 profile (CDP 400 ms RTT, 400 kbps down/up, 4× CPU, motion allowed, cold cache). Baseline and Before
had 2 runs each, from the first measurement pass. **AFTER is the final build, 3 runs** (`final-cls-throttled.txt`; every AFTER cell is identical across its 3 runs):

| Route | Width | BASELINE | BEFORE | **AFTER (final)** |
|---|---|---|---|---|
| `/` | 360 | 0.004 | 0.008 | **0.001** |
| `/` | 390 | 0.028 | 0.008 | **0.001** |
| `/` | 430 | 0.032 | 0.009 | **0.001** |
| `/` | 768 | 0.005 | **0.475** | **0.001** |
| `/` | 1024 | 0.007 | 0.017 | **0.001** |
| `/` | 1440 | 0.009 | **0.158** | **0.001** |
| `/services` | 360 | 0.000 | 0.024 | **0.000** |
| `/services` | 390 | 0.000 | 0.050 | **0.000** |
| `/services` | 430 / 768 / 1024 / 1440 | 0.000 | ≤0.001 | **≤0.001** |
| `/seo` | 360 | 0.000 | 0.022 | **0.000** |
| `/seo` | 390 | 0.021 | 0.045 | **0.000** |
| `/seo` | 430 / 768 / 1024 / 1440 | ≤0.001 | ≤0.002 | **0.000** |
| `/about` (legacy control) | 390 / 1440 | 0.000 | 0.000 | **0.000** |

The independent Gate 3 probe on the final build agrees: candidate ≤0.001 on all six cells it samples (`final-probe-result.txt` §6).

**Acceptance against the targets:**
- **< 0.1 met; < 0.05 target met** (maximum 0.001).
- **No fallback-to-final line-count change above the fold.**
- **No LCP regression from the remediation:** throttled LCP is ~3.8 s Before and After. The baseline is ~3.2 s; that ~0.6 s is a Gate 2 cost, not introduced here.
- **No accessibility regression:** axe reports 0 violations.


**Font cost (VERIFIED, `bytes-result.txt`).**

| Route type | Font preloads, BEFORE and AFTER |
|---|---|
| Direction C routes | 3 files, 139.3 KB (opsz face 75 KB). Unchanged |
| Legacy routes | 2 files, 64.3 KB. **Unchanged; the opsz face is not preloaded** |

- **CSS:** +0.7 KB gz on Direction C routes and +0.8 KB gz on legacy routes (the fallback `@font-face` rules are `local()` only and download nothing).
- **HTML:** +0.0–0.1 KB gz.
- **Subsetting:** evaluated but not adopted. A weight-restricted instance could cut the opsz file, but the CLS target was met without changing glyph data, so the file stays byte-identical to the approved look. This is a candidate for Gate 4 performance work.

## 5. Accessibility and navigation results

| Check | Result |
|---|---|
| Remediation acceptance suite (`r-checks.cjs`) | **80/80 PASS** (final build) |
| axe-core (wcag2a/aa, 21a/aa, 22aa), 3 routes × 390/1440, services panel open at 1440 | **0 violations** (final build; also 0 in the independent probe) |
| Keyboard | Order: logo → Services → Services submenu → How It Works (panel closed and inert). Space and Enter toggle; Tab enters the open panel; Shift+Tab returns; Escape closes and returns focus. Every Tab stop has a ≥2px visible outline (Gate 2 suite) |
| Touch (`hasTouch`) | Tap opens and closes the disclosure; tap on Services navigates |
| No JavaScript | Services link visible and working at 1200/1440; dead button hidden; stage resolved with controls disabled and no false pressed state; pages complete (Gate 2 suite) |
| Reduced motion | No pre-paint, never dark, Enquiries pressed, toggle live, no transition > 10 ms |
| Below 1200px | No Services link in the header bar without opening the menu — **the approved pattern** (Gate 3 decision 3: "Below 1200px a 'Services' link is already first in the menu"). Menu and footer both reach `/services` |

## 6. Regression results (final build)

| Suite | Result | File |
|---|---|---|
| `npm run typecheck` · `npx eslint .` · `npm test` · `npm run build` · `npm run verify:build` | exit 0 · exit 0 · **11/11** · exit 0 · OK | run this session |
| Gate 2 application suite (`app-checks.cjs`, **unchanged**): responsive ×6 widths ×3 routes, menu, disclosure, focus, motion, no-JS, names, CTAs | **192/192 PASS** | `final-app-checks.txt` |
| Unrelated routes vs BASELINE (21 routes incl. 404, at 390 + 1440) | **42/42 pixel-identical**, same text and links | `final-unrelated.txt` |
| Chrome seam (client navigation and back/forward) | Correct chrome on every step, one header, **0 console errors/warnings** | `final-chrome-nav.txt` |
| Content/SEO, BEFORE→AFTER (served HTML, JS off) | Title, description, canonical, robots, OG/Twitter, status, forms, **JSON-LD identical**. Headings identical in sequence; same `<main>` link multiset; **0 text blocks lost** on all three routes | `compare-before-vs-after.txt` |
| Content/SEO, BASELINE→AFTER | Same as the Gate 3 review: metadata and JSON-LD identical; `/seo` heading order changed per ruling 2; horizon paragraph split into labelled rows (word for word); homepage chain SVG `desc` replaced by the HTML list (Gate 2 E9) | `compare-baseline-vs-after.txt` |
| Chrome link sets | BEFORE→AFTER differences only: the two Convert labels, and a new header link `/services` "Services" (R1). No destination added beyond that, none removed | `chrome-links-diff.txt` |
| Analytics | `page_view` sequence identical to BASELINE across `/ → /services → /seo → /about → /` (path and `page_type`); no event code touched | `final-probe-result.txt` §5 |

**Changed visual components:**
- page length on `/seo` at 600–899px grows slightly (the capped horizon panel is about 120px taller at 768);
- `/services` and `/seo` body text is darker.

Both are intended.

## 7. Remaining terminology inconsistencies (reported, not changed)

| Where | What | Why not changed |
|---|---|---|
| `/services` body (approved page copy) | Service rows name `/conversion-optimization` "The enquiry path" and `/lead-generation` "Enquiry generation", while the chrome on the same page now says "Conversion optimisation" / "Lead generation" | Approved copy; the instruction excluded descriptions and page copy. **Owner decision** |
| SEO destination | "Organic search" (homepage links), "Organic search (SEO)" (desktop panel), "SEO" (mobile menu and footer) | Not one of the two destinations named for R3. **Owner decision** |
| Measurement destination | "Measurement" (panel/menu) and "How we measure it" (homepage link), both to `/how-it-works`, alongside "How It Works" | Same. **Owner decision** |
| Legacy chrome (every other route) | "Conversion Optimization" (US spelling), "Lead Generation", "Social Media Ads" | Out of scope (legacy routes) |

## 8. Exceptions

| # | Exception | Label |
|---|---|---|
| X1 | One display line (`/services` "Below a real threshold…", 1440) still re-wraps when the face arrives. It is below the first screen, so its CLS contribution is 0 | Accepted residual |
| X2 | Fallback sizes are tuned to the current approved display copy. **If a display line changes, re-run `sweep.cjs`.** Calibrated for Arial/Liberation Sans (Windows, macOS, iOS, Linux). **Android has no Arial; not calibrated or tested** | WORKING HYPOTHESIS for Android |
| X3 | A legacy page can still fetch the opsz face after load through Next.js `<Link>` prefetch (observed on `/about` @390 at ~9.9 s, after LCP). Unchanged from Gate 2 | Pre-existing; Gate 4D |
| X4 | On Direction C routes the site's preloaded Bricolage (41 KB) is used only for titles and fallback while the opsz face loads. Consolidating to one instance belongs to Gate 4 global typography | Gate 4 |
| X5 | Pre-existing Gate 3 P3 items are not addressed here: R8 (28-run `aria-hidden`); `/services` length at 360–768px; logo name "MappedSkills Logo"; 11px SVG text in `ChainFull`. Also the GTM trigger check (Gate 2 E15, **RESEARCH REQUIRED**) | Open |
| X6 | **Not tested:** real iOS/Android devices, Safari/WebKit, Firefox, VoiceOver/TalkBack/NVDA, 200% zoom, forced colours, field Core Web Vitals. The Gate 3 review recommended a real-device / second-engine / screen-reader pass before recording Gate 3 | **UNKNOWN** |
| X7 | `LIVE-1`, `LIVE-2`, `PROC-1` remain open and untouched (LIVE-1 re-verified present on `/about` @390). Do not merge `ui-revamp` to `main` | Tracked |
| X8 | A Next.js "inferred workspace root" build warning appears for in-place builds because of `~/package-lock.json` on this machine. Environmental, not caused by this change | Local |
| X9 | `components/direction-c/fonts/OFL.txt` was fetched from the `google/fonts` repository. If the font file is committed, the licence file should be committed with it | Note |

## 9. Recommendation and owner items

**Recommendation: Gate 3 conditions R1–R4 are met and re-verified, and R5–R7 are also done.** The owner can record Gate 3 now, or
first require the real-device / Safari / Firefox / screen-reader pass (X6). The Gate 3 review recommended the device pass before
recording. That pass is not done here.

Owner items:
1. **Gate 3 decision** (a new DEC). Not recorded by this work.
2. Confirm the R3 resolution was meant to be applied to the chrome as done (owner requirement in the remediation brief), and decide the §7 inconsistencies.
3. Accept X1–X4 and the testing gap X6, or commission the device pass.
4. The decisions still open from `GATE_3_REVIEW.md` §8 (plate labels, always-open stage rows, ruling-2 interpretation and the full-copy horizon panel) are **not** decided by this report.

**Gate 4 must not start until Gate 3 is approved.**

## 10. Local review URLs (not deployed)

These are local production builds. Reproduce them with `npm run build && npx next start -p 3300`.

| Build | URLs |
|---|---|
| AFTER | `http://localhost:3300/` · `http://localhost:3300/services` · `http://localhost:3300/seo` |
| BEFORE (Gate 2 snapshot) | `http://localhost:3401/…` |
| BASELINE (`142b9c8`) | `http://localhost:3400/…` |

BEFORE and BASELINE live in the session scratchpad and will not persist.

## 11. Session handoff (`SESSION_HANDOFF_TEMPLATE.md`)

- **Session:** 2026-10-08 · Claude (Opus 5.5) · Principal Frontend Engineer / UX Implementation Lead / Accessibility QA · Gate 3 conditional remediation.
- **Context read:** `CLAUDE.md`, `CONTEXT_INDEX.md`, `CURRENT_STATE.md`, `DECISION_LOG.md` (`DEC-029`–`DEC-034`), `QUALITY_GATES.md` (gate naming), `GATE_2_IMPLEMENTATION.md`, `GATE_3_REVIEW.md` and its evidence, the approved prototype (sha256 verified `193b4ab8…`).
- **Decisions approved during session:** none recorded. The R3 names were applied as an **OWNER REQUIREMENT** from the remediation brief; the owner may wish to record them in a DEC.
- **Tests actually run:** everything in §§4–6. All results are from the final build except BASELINE/BEFORE throttled CLS, which comes from the first pass on unchanged servers.
- **Next:** owner Gate 3 decision; optional device/engine/screen-reader pass; do not commit `.claude/launch.json`.
