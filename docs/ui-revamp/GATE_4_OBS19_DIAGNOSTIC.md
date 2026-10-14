# MappedSkills UI Revamp — Gate 4 · OBS-19 Diagnostic (site-font loading movement)

| | |
|---|---|
| **Date** | 2026-10-10 |
| **Authority** | **`DEC-046`** — OBS-19 **diagnostic only**. Runtime-only experiments (test proxy) allowed; **no** application CSS/JSX/font change, no OBS-19 commit, no extension of the OBS-18 primes to body fonts |
| **Status** | **Diagnostic complete. Recommended classification: A — CONFIRMED DEFECT REQUIRING REMEDIATION (two mechanisms, §7), proposed for a separate owner decision (§10). Nothing fixed. OBS-19 stays OPEN** |
| **Evidence** | [`gate-4/obs19/evidence/`](gate-4/obs19/evidence/) (index: its `README.md`; all tables: `runs/o19-summary.txt`) |
| **Companion** | OBS-18 implementation: [`GATE_4_OBS18_IMPLEMENTATION.md`](GATE_4_OBS18_IMPLEMENTATION.md) |

Movement figures for Firefox and WebKit are a **geometric approximation** (impact × distance fraction) — **not browser-native CLS** (neither
exposes the Layout Instability API). Chromium figures marked "native" come from its `layout-shift` entries.

---

## 1. Diagnostic scope

OBS-19 was raised in `DEC-045` from a Playwright mover probe: lede and CTA moves of 29–54 px when **Manrope** (the site body face) arrives in
Firefox, attributed to Firefox skipping the `next/font` calibrated fallback, with possible effects beyond Direction C. This gate establishes the
affected fonts, faces, components and routes; whether real Firefox, Playwright Firefox, Chromium and WebKit behave alike; normal vs delayed loading;
and separates OBS-19 movement from OBS-18 display movement, from site-Bricolage heading movement, hydration and viewport artefacts.

**Build measured:** the OBS-18 after build (`3b333c4`, plain `-syppLkXlUH6HKeYL7rp5`), so Direction C display movement is already removed; the
before build (`0e8df27`, `7U9gNeXduveOCiPYDID9O`) for the separation runs. Routes: Direction C `/`, `/pricing`, `/ai-seo`; legacy `/about`,
`/contact`, `/faq`, `/how-it-works`, `/blog`; widths 320, 360, 390, 430, 768, 1024, 1440.

## 2. Browser environments

| Engine | Use | Runs |
|---|---|---|
| **Official Firefox 157.0.1** (release; temporary profiles; window in front; no automation, `navigator.webdriver` false) | all conditions + candidates + banner probe | **726** |
| Playwright Firefox 153 | the same harness page | 538 |
| Playwright Chromium 151 (native `layout-shift`) | the same | 590 |
| Playwright WebKit 26.5 | the same | 310 |
| Real Safari | **not run for OBS-19** (rendering harness only covers display roles); WebKit proxy stands in, with the OBS-11 caveat | — |

**2,164 runs; 0 stalled; 2 throttled excluded** (WebKit `/faq` 320 and 360). All OBS-19 sweeps ran with the machine awake (`caffeinate -i`).
The consent banner was added to the tracked elements after the main sweeps (banner probe, §5.3); runs before it show "n/m" for the banner.

## 3. Font declarations and affected population

**As built** (`next/font/google` in `app/layout.tsx`; CSS extracted from the build):

| Family | File (latin) | Descriptors | Its automatic fallback (`adjustFontFallback`, next/font) |
|---|---|---|---|
| **Manrope** (variable 200–800) | `4c9affa5bc8f420e-s.p.woff2` (preloaded) | `font-display: swap`; latin `unicode-range` covers U+2191 and U+2193 **but not U+2192 (→)** | `"Manrope Fallback"`: `src: local("Arial")`, `size-adjust: 103.19%`, `ascent-override: 103.31%`, `descent-override: 29.07%`, `line-gap-override: 0%`; **no `font-weight` descriptor** (regular Arial for every weight — bold is synthesised) |
| **Bricolage Grotesque** (site instance, 200–800) | `9d5a263311222317-s.p.woff2` (preloaded) | `swap` | `"Bricolage Grotesque Fallback"`: `local("Arial")`, `size-adjust: 105.43%`, `ascent-override: 88.21%`, `descent-override: 25.61%`; no weight descriptor |

Stacks: `--font-manrope: "Manrope","Manrope Fallback"` → `--dc-f-body` (`var(--font-manrope), system-ui, …`: Direction C body, `.dc-btn`, `.dc-label`,
header nav, mobile nav, footer) and `--font-sans` (`globals.css:130`, `var(--font-manrope), ui-sans-serif, system-ui, …`: every legacy route's body);
`--font-bricolage` → legacy headings (`font-heading`) and `.dc-title`'s second family.

**Population: site-wide.** Manrope sets the body copy of every route, the Direction C chrome on every route (header, menu, footer) and the
**consent banner** (fixed, shown on every first visit). Site Bricolage sets legacy headings.

## 4. Reproduction conditions

- **Normal first visit (cold cache, nothing held, loopback):** real Firefox painted Manrope's pending state in **12 / 63** Direction C and
  **21 / 105** legacy loads; Playwright Firefox 21 / 63 and 12 / 105; **Chromium 0 / 168** (Manrope is preloaded and ready at first paint).
- **Late Manrope (300 ms or 2.5 s after first paint):** pending state painted in every run, every engine; deterministic.
- Real-network frequency not measured (RESEARCH REQUIRED); warm cache not measured.

## 5. Observed movement (after build; separated by cause, §6)

_Tables: `runs/o19-summary.txt`. "Body-face" = the first paragraph's own face changed (system-ui ↔ calibrated ↔ Manrope)._

### 5.1 Normal first visits (nothing held; 3 repetitions)

| Engine | Pop. | Pending painted | Body face while Manrope pending | Views with paragraph / button moves | Max move | Max ≈ |
|---|---|---|---|---|---|---|
| **Real Firefox 157** | DC (63) | 12 | system-ui | 1 / 6 | **32 px** (paragraph), 31 px (button) | 0.002 |
| **Real Firefox 157** | legacy (105) | 21 | system-ui | 0 / 0 | 0 | 0 |
| Playwright Firefox | DC / legacy | 21 / 12 | system-ui | 8 views (DC) | 32 px | — |
| **Chromium** (native) | DC / legacy | **0 / 0** | — | 0 | 0 | native 0 |

### 5.2 Late Manrope (held 300 ms / 2.5 s; identical results at both holds)

| Engine | Pop. | Body face while pending | Max paragraph move | Views with button moves (max) | Max h2 move | Body-face cause, max (views) |
|---|---|---|---|---|---|---|
| **Real Firefox 157** | DC | **system-ui** first, then calibrated (see §7.2) | **56 px** | 12 (54 px) | 54 px | 56 px (12) |
| **Real Firefox 157** | legacy | **system-ui** for the whole pending period | **52 px** | 0 | 40 px | 52 px (3) |
| Playwright Firefox | DC / legacy | system-ui (+calibrated on DC) | 56 / 52 px | 12 (54 px) | 54 / 40 px | 56 px (12) / 52 px (3) |
| **Chromium** | DC | **calibrated** | 29 px | 13 (**60 px**, width Δ 15 px) | — | 60 px (13); **native layout-shift up to 0.12** (§5.3) |
| **Chromium** | legacy | calibrated | 52 px | 0 | — | 52 px (3); native up to 0.119 |
| WebKit | DC / legacy | calibrated | 29 / 52 px | 13 (29 px) | — | 29 px (13) / 52 px (3) |

### 5.3 The consent banner (banner probe: `/`, `/pricing`, `/about`, `/how-it-works` × 7 widths; first visit, no stored consent)

| Engine | Condition | Banner height change (views) | Native layout-shift |
|---|---|---|---|
| **Chromium** | Manrope 2.5 s late | **23 px (2 views, 430 px)** — its text re-wraps in the calibrated fallback vs Manrope | **up to 0.101 (DC) / 0.077 (legacy)**, source `div.fixed.inset-x-0` (the banner) |
| Chromium | normal first visit (2 reps) | 0 | 0 |
| Real Firefox 157 / Playwright Firefox | Manrope late; normal | **0 px** (system-ui and Manrope give the same banner lines) | n/s |
| WebKit | Manrope late | **0 px** | n/s |

The largest single shift measured in this diagnostic is therefore **the consent banner in Chromium when Manrope arrives late** (mechanism 2, §7.3),
not a Firefox effect.

### 5.4 Site Bricolage (held separately)

Legacy H1/heading re-wraps when site Bricolage arrives: `/how-it-works` 360 H1 +1 line (content +40 px) in every engine (Firefox, Chromium, WebKit;
native ≈ 0.0285 in Chromium); 26 px paragraph moves on two legacy views in Firefox. Direction C routes: none (their display roles use `dcDisplay`).

## 6. Separation from OBS-18 and other sources

| Source | How separated | Result |
|---|---|---|
| **OBS-18 display headings** | before build, display face held alone (`face=dc`) vs Manrope held alone; after build | display face: H1 re-wraps, up to 107 px (9 views) — cause "display"; Manrope: body-face moves up to 56 px, **no H1 line change** on DC routes. After the OBS-18 correction: 0 display-cause moves |
| **OBS-19 paragraphs** | first-paragraph face change + paragraph boxes | Firefox 26–56 px (late), ≤ 32 px (normal); Chromium/WebKit 29–52 px when late only |
| **OBS-19 buttons/CTAs** | button boxes (top and width) | Firefox up to 54 px; Chromium up to 60 px + 15 px width change (`/` 1024 `.dc-tlink`) |
| **Site Bricolage** | Bricolage held alone | legacy headings only (§5.4) |
| **Hydration** | console trap per run | **0** console/hydration errors in every run |
| **Viewport / scrollbar** | scrollbar hidden from the first frame; `clientWidth` = target recorded | `clientWidth` ≠ target in 0 runs |
| Unattributed | moves with no face-status change within 120 ms | ≤ 26 px in one legacy view (`/how-it-works` 1024, at site Bricolage's load) |

Confidence: **high** for the face identification (element's own lines; system-ui and ui-sans-serif are the same on macOS Firefox, labelled
AMBIGUOUS(SYSTEM-UI/UI-SANS)); **medium** for cause labels when two loads fall within one frame; geometric figures are approximations.

## 7. Root-cause assessment

### 7.1 Mechanism 1 — Firefox skips the calibrated fallback (the OBS-18 rule) — **VERIFIED FACT**

While `Manrope` (earlier in the family list) is loading, Gecko does not load the later `@font-face` `"Manrope Fallback"` and lays the text out in
the next family, **system-ui** (DC) / **ui-sans-serif → system-ui** (legacy) — the same `gfxFontGroup` rule recorded for OBS-18
(`gate-4/obs18/evidence/gecko-font-matching-source.txt`). Real and Playwright Firefox agree. Chromium and WebKit use the calibrated face.

### 7.2 Why Direction C pages sometimes switch to the calibrated face mid-pending — **VERIFIED FACT**

Manrope's latin subset lacks **U+2192 (→)**. On `/` and `/pricing` a visible `.dc-arr` arrow (aria-hidden) in the Manrope stack makes Gecko
resolve that one character to `"Manrope Fallback"` and load it; the next reflow (triggered by any font load) then sets the body in the calibrated face.
So the body moves **twice** there (system-ui → calibrated → Manrope). On `/ai-seo` and every legacy route the only arrows are in the hidden menu, the
fallback never loads, and the body stays in system-ui until Manrope arrives (`runs/arrow-probe.txt`; `loadedAt.mf` per run).

### 7.3 Mechanism 2 — the automatic fallback metrics do not hold line breaks — **VERIFIED FACT** (all engines, late Manrope only)

Even where the calibrated `"Manrope Fallback"` is used (Chromium, WebKit, Firefox with priming), text re-wraps at the swap: `next/font` sizes Arial
**regular** to Manrope's average advance with one `size-adjust` for every weight and size, and declares no weight (bold is synthesised from Arial
regular). The consent banner and some buttons/paragraphs change line count (§5.2–5.3). This is **not** Firefox-specific and **not** addressed by
priming; under normal loading Chromium never shows it because Manrope is ready at first paint, while Firefox's pending state can still expose it.

### 7.4 Remaining uncertainty

Real-network timing (how often Manrope misses first paint for real visitors) — RESEARCH REQUIRED; Windows/Linux (different `local("Arial")` /
system-ui faces) and mobile not measured; real Safari not measured for body text.

## 8. Runtime-only candidate experiments (test proxy; no application change)

_Real Firefox 157.0.1 and Playwright engines; 5 routes × 390/1024/1440; Manrope held 2.5 s (and normal loading for `prime`)._

| Candidate (served test markup / CSS only) | Firefox effect | Chromium / WebKit effect | Side effects | Verdict |
|---|---|---|---|---|
| **`prime`** — in-flow hidden spans at the start of `<body>` naming `"Manrope Fallback"` (400/700/800) and `"Bricolage Grotesque Fallback"` (700/800), glyph from `::before` | calibrated face from the first frame in every run (late, normal and no-JS). At 390/1024/1440: paragraph and button vertical moves **→ 0** on DC, legacy 52 → 26 px (one view, site Bricolage's load). At all 7 widths (banner probe): residual **29 px (DC) / 52 px (legacy)** in exactly the views where Chromium also moves — Firefox becomes Chromium-like; what remains is mechanism 2. Button widths still change ≤ 4–6 px | **no change** (already calibrated): Chromium still 60 px buttons, banner 23 px, native ≤ 0.101 | **None found**: accessibility tree, first 40 Tab stops, layout identical in 30 / 30 views (Firefox, Chromium, WebKit × 5 routes × 390/1440); never focused; 0 console/hydration errors with 5 leading spans in `<body>` (`runs/candidate-checks.txt`) | Fixes **mechanism 1 only** |
| `prime400` — only `"Manrope Fallback"` 400 | same as `prime` (weight-independent: one face covers all weights) | — | — | Same as `prime`, fewer elements |
| `font-display: optional` (rewritten CSS) | Firefox: moves unchanged (32 / 52 px — the system-ui interval remains); Manrope then **not shown** for that page view when late | Chromium / WebKit: **0 moves, banner 0, native 0** — because Manrope is never swapped in on a late first visit | the design face is lost on slow first visits; Firefox not helped | Rejected as a fix on its own (trade-off noted for the owner) |
| `font-display: block` | moves unchanged; text invisible up to 3 s | Chromium: native 0.028 (vs 0.101), banner still 23 px | invisible text (worse) | Rejected |
| `"Manrope Fallback"` before `"Manrope"` (`order`) | no moves — because **Manrope is never used** | — | design face lost | Not viable (documents why) |

## 9. Outcome classification

### **A. CONFIRMED DEFECT REQUIRING REMEDIATION**

- **Reproducible and understood:** two verified mechanisms (§7), deterministic under late Manrope, intermittent on normal first visits in Firefox
  (≈ 20 % of cold loopback loads painted the pending state), present in official Firefox 157.0.1.
- **Meaningful:** site-wide (body copy, chrome, the consent banner on every first visit); paragraph/CTA moves up to 56–60 px; in Chromium, native
  layout-shift up to **0.12** when Manrope arrives late (the banner) — above Google's 0.1 "good" threshold for that load; on normal loopback first
  visits Chromium showed none.
- **Why not B:** the first-visit consent banner and above-the-fold CTAs move; the Chromium magnitude reaches the CLS threshold when the font is late,
  and Firefox exposes it on ordinary first visits. **Why not C/D:** reproduced in official Firefox and in three engines with the same harness.

## 10. Proposed next action (requires a separate owner decision — not implemented)

| | Proposal |
|---|---|
| **Scope** | (1) Prime `"Manrope Fallback"` (and `"Bricolage Grotesque Fallback"`) site-wide, in flow, from the root layout (the OBS-18 mechanism, verified at runtime here) — fixes mechanism 1 (Firefox). (2) **Replace the automatic Manrope/Bricolage fallbacks with calibrated, weight-specific `local()` faces** (Arial / Arial Bold, swept `size-adjust` per role, as Direction C's display fallbacks), or disable `adjustFontFallback` in favour of those — fixes mechanism 2 (all engines), including the consent banner. (3) Optionally add U+2192 handling (or keep the arrow) so behaviour no longer depends on page content |
| **Routes / components** | all routes; body copy, `.dc-btn`, `.dc-label`, header/menu/footer, consent banner, legacy headings (Bricolage) |
| **Expected benefit** | Firefox: no system-ui interval (mechanism 1 removed); all engines: body/CTA/banner keep their lines at the swap — late-font CLS from ~0.12 toward 0 |
| **Accessibility** | primes as OBS-18 (aria-hidden, invisible, 0 px, not focusable, no text node); calibration changes no text, size or spacing of the loaded face |
| **Regression risk** | low for (1) (same pattern as OBS-18, root layout instead of `DcPage`: must be verified for hydration on every template); medium for (2) (fallback metrics are tuned to copy: needs a sweep like `fallback-sweep.cjs` across body/CTA/banner strings at 7 widths, and re-runs when copy changes) |
| **Effort (estimate, WORKING HYPOTHESIS)** | (1) ~0.5 day + the OBS-18-style verification (~1 day); (2) 1.5–2.5 days incl. sweeps and the full regression suite |
| **Before production?** | **Recommended before production** for (2) (consent banner + first-screen CTAs on first visits) and (1) (Firefox); owner to decide |

## Session note

No application file was changed for OBS-19. Harness and analysis scripts are new evidence files (`gate-4/obs19/evidence/`); the OBS-18 evidence
scripts are unchanged.
