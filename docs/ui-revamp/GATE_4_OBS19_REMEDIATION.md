# MappedSkills UI Revamp — Gate 4 · OBS-18 Closure and OBS-19 Remediation

| | |
|---|---|
| **Date** | 2026-10-10 – 2026-10-11 |
| **Authority** | **`DEC-047`** (owner): formal OBS-18 closure after evidence verification; targeted OBS-19 implementation (Firefox fallback-face priming where shown necessary; weight-specific fallback-metric calibration where supported by measurement); cross-browser and accessibility regression testing; governance updates; local commits. Not authorised: changing Manrope or Bricolage, loaded-font typography or design tokens, broad CSS refactoring, reworking components to conceal shifts, unrelated performance work, KD-09/KD-10, deferred Playwright tooling, B5, push/merge/deploy |
| **Status** | **OBS-18 CLOSED** (evidence re-verified, §2). **OBS-19: mechanism A (Firefox) RESOLVED; mechanism B (fallback metrics) PARTIALLY MITIGATED. OBS-19 does NOT qualify for closure — it stays OPEN with a re-classified residual (§12–13)** |
| **Application commit** | **`46785af`** `fix(ui-revamp): calibrate and prime the Manrope fallback per weight (OBS-19)` — local, not pushed |
| **Evidence** | [`gate-4/obs19-remediation/evidence/`](gate-4/obs19-remediation/evidence/) (index: its `README.md`) |

Evidence labels follow `CLAUDE.md`. Firefox and Safari movement figures are a **geometric approximation** (impact × distance fraction), **not
browser-native CLS** (neither exposes the Layout Instability API). Only Chromium figures marked "native" are browser-native layout-shift values.

---

## 1. Owner authorisation

Recorded as **`DEC-047`** in `docs/00-project/DECISION_LOG.md` before the application change (authorisation and the OBS-18 closure); the outcome is
appended at the end of this gate. Owner's continuation instruction (2026-10-11): finish the interrupted runs, official Firefox and Safari, the
regression checks and governance, document every acceptance criterion, quantify the weight-400 residual and **not force closure**.

## 2. Repository baseline and OBS-18 closure

| | |
|---|---|
| Branch / HEAD at start | `ui-revamp`, **`ad9d702`** — VERIFIED; application commit **`3b333c4`** in history; application tree at `ad9d702` = `3b333c4` (only `next-env.d.ts` differs, pre-existing) |
| Working tree at start | `M next-env.d.ts`; untracked B0–B4 screenshot folders, `gate-2/screenshots/app/`, `gate-4/b4/owner-review/screenshots/*`, `gate-4/b4/MappedSkills_B4_Visual_Review.zip` — **preserved, never staged** |
| Servers at start | **:3610** `next start` of `0e8df27` (`7U9gNeXduveOCiPYDID9O`, pre-OBS-18) and **:3620** of `3b333c4` (`-syppLkXlUH6HKeYL7rp5`) — identities verified by `_buildManifest.js`, both loopback, started by the previous session. **:3999** `next dev --webpack` listening on **all interfaces** (`*:3999`), started 2026-10-09 23:46 from an interactive login shell (`login → -zsh → npm run dev --port 3999`) in the repository — the user's own; purpose UNKNOWN; **left untouched** |

**OBS-18 re-verification (before closing).** Primes: served HTML of the `3b333c4` build carries exactly four `dc-font-prime` spans on each of the
ten Direction C routes and none on `/about`, `/contact`, `/faq`, `/how-it-works`, `/blog`, `/privacy-policy`, `/terms`, `/b0-no-such-page`,
`/blog/b0-no-such-post`. Stored evidence (`gate-4/obs18-impl/evidence/runs/accept-summary.txt`, `run/impl-checks.txt`, `safari/safari-real-summary.txt`)
matches every claim of `GATE_4_OBS18_IMPLEMENTATION.md` §10: real Firefox 157.0.1 H1 line changes 10 / 25 / 25 views → 0 / 0 / 0; Playwright Firefox
the same; final state identical 70/70 × 4 engines; a11y tree, Tab stops, headings and text identical; no-JS calibrated; Chromium, WebKit, real Safari
unchanged. No contradictory evidence was found. **OBS-18 CLOSED** (recorded in `DEC-047`) for the verified scope; it stays fixed on the OBS-19 build
(§10). Historical OBS-18 reports and evidence were not altered.

## 3. Root cause and affected population

**Fonts (VERIFIED, built CSS and fontkit on the built woff2).** Manrope is a variable font (200–800), latin subset, `font-display: swap`, preloaded;
ascent 1.066 em, descent 0.300 em, line gap 0 (UPM 2000). `next/font`'s automatic fallback was one face: `local("Arial")`, `size-adjust: 103.19%`,
no `font-weight` descriptor — regular Arial for every weight, bold synthesised.

**Population (VERIFIED, `o19r-population.cjs`, 28 plain targets × 390/1440, banner shown).** Manrope is rendered at five weights:

| Weight | Elements (both widths, all targets) | Where | Manrope ÷ Arial advance on this copy |
|---|---|---|---|
| 400 | 3,472 | body copy everywhere, footer, banner paragraph | 1.028 × Arial (per-string P05–P95 1.011–1.050) |
| 500 | 74 | DC close lines, pricing lists, form labels | 1.048 × Arial |
| 600 | 994 | header navigation (incl. hidden menu), links | 0.985 × **Arial Bold** (1.053 × Arial) |
| 700 | 2,090 | buttons, labels, banner buttons, footer headings | 0.978 × **Arial Bold** (1.023 × Arial) |
| 800 | 2 | one label on `/` | 0.964 × Arial Bold |

**Mechanism A — Firefox (VERIFIED).** While Manrope loads, Gecko does not load a later `@font-face` in the family list (the OBS-18 rule), so
`"Manrope Fallback"` stayed unloaded and text was laid out in **system-ui**; on `/` and `/pricing` an incidental U+2192 arrow loaded it mid-pending.

**Mechanism B — fallback metrics (VERIFIED, all engines).** One `size-adjust` on regular Arial cannot match five weights: bold text was synthesised
from Arial regular at the wrong width (buttons, labels and the consent banner re-wrapped), and weight-400 text differs from Manrope string by string.

## 4. Pre-change measurement methodology

1. **Static fidelity sweep** (`o19r-sweep.cjs`): with Manrope loaded and the banner shown, every visible Manrope text element's line count in
   Manrope vs in a candidate fallback, 28 plain targets × 7 widths (320–1440) × 3 engines; candidates: `next/font`'s face ("current") and 33 steps
   per weight (Arial 99–107 % for 400, 100–108 % for 500; Arial Bold 94–102 % for 600/700, 92–100 % for 800). Per element: weight, above the fold.
2. **Base-face check** (`o19r-basefont-spread.cjs`): per-string ratio spread of Arial, Helvetica, Helvetica Neue, Verdana, Tahoma, Trebuchet MS,
   system-ui against Manrope at 400 and 700.
3. **Dynamic harness** (`o19r-harness.cjs`, from the diagnostic's): Manrope held 300 / 2,500 ms or not held; per frame every face's status and the
   boxes of H1, paragraphs, buttons/CTAs, h2 and the banner; the painted body face named from the first paragraph's own lines; Chromium native
   layout-shift; FCP and font-load times; throttled (frame gap ≥ 250 ms or hidden) and stalled runs excluded and counted.

The implementation was proposed in session after steps 1–2 (two weight groups, Arial / Arial Bold, `next/font`'s own `adjustFontFallback` /
`fallback` options, primes as in OBS-18) and only then applied; values were frozen after all three engines' sweeps agreed (§6).

## 5. Exact application changes (`46785af`, 2 files, +38 lines)

| File | Change |
|---|---|
| `app/layout.tsx` | `Manrope({ …, adjustFontFallback: false, fallback: ['"Manrope Fallback"'] })` (+ comment). The emitted stack is **unchanged** (`--font-manrope: "Manrope","Manrope Fallback"`); only `next/font`'s automatic fallback face is no longer generated. Two `<span aria-hidden="true" className="site-font-prime site-font-prime--{regular,bold}" />` as the first children of `<body>`, before the skip link (+ comment) |
| `app/globals.css` | Two `@font-face { font-family: "Manrope Fallback" }`: `local("Arial"), local("ArialMT"), local("Liberation Sans"), local("LiberationSans")`, `font-weight: 100 500`, `size-adjust: 103.25%`, `ascent-override: 103.24%`, `descent-override: 29.06%`, `line-gap-override: 0%`; `local("Arial Bold"), local("Arial-BoldMT"), local("Liberation Sans Bold"), local("LiberationSans-Bold")`, `font-weight: 600 900`, `size-adjust: 99%`, `ascent-override: 107.68%`, `descent-override: 30.3%`, `line-gap-override: 0%`. `.site-font-prime { display:block; height:0; overflow:hidden; visibility:hidden; font-family:"Manrope Fallback" }`, `::before { content:"a" }`, `--regular { font-weight:400 }`, `--bold { font-weight:700 }` |

**Unchanged:** Manrope's file (byte-identical; renamed `…-s.p.woff2` → `….p.woff2` because the size-adjust marker no longer applies), its
`@font-face`, preload, stacks, every size, weight, line height, letter spacing, text, spacing and breakpoint; Bricolage and its automatic fallback;
the Direction C display fallbacks and the OBS-18 primes; OBS-17 settings. No client JavaScript, no dependency.

**Placement.** The root layout is the narrowest place that covers the population (body copy on every route, the DC and legacy chrome, and the consent
banner, which renders from the root layout): two elements cover both faces; the OBS-18 `DcPage` primes are untouched.

## 6. Fallback metric calibration

Sweep result (mismatching element-views, sum over 196 views; lower is better):

| Weight | `next/font` (Arial, 103.19 %, bold synthesised) Chromium / Firefox / WebKit | Optimum per engine | Chosen |
|---|---|---|---|
| 400 | 444 / 404 / 368 | 103.25 / 103.25 / 103.0 % Arial (404 / 399 / 396) | **Arial 103.25 %** (face 100–500) |
| 500 | 10 / 11 / 11 | 104 % Arial (8 each) | same face (103.25 %: 9 each) |
| 600 | 18 / 17 / 12 | 97.5–97.75 % Arial Bold (11) | **Arial Bold 99 %** (face 600–900): 12 / 13 / 13 |
| 700 | 102 / 68 / 91 | 98.75–99 % Arial Bold (28 / 27 / 54) | same face (99 %) |
| 800 | 2 / 2 / 2 | flat | same face |

ascent/descent = Manrope's 1.066 / 0.300 em ÷ size-adjust; line gap 0. Arial stays the base: no widely installed face tracks Manrope better
(400: Arial CV 1.30 %, Helvetica Neue 1.07 % but macOS-only, Tahoma 1.82 %, Trebuchet 1.99 %; `runs/basefont-spread-chromium.txt`). Two faces instead
of five: grouping costs 1 (400/500) and 3 (600/700) mismatches in Chromium.

## 7. Before / after — static fidelity of each build's fallback (28 targets × 7 widths, banner shown)

"Re-wrap" = an element whose line count in the build's own "Manrope Fallback" differs from Manrope: it **would** change lines if Manrope arrived late.

| Engine | Element re-wraps before → after | Above the fold at load | Banner elements (banner height changes) | `<button>` re-wraps | Weight 400 | Weight 600–800 |
|---|---|---|---|---|---|---|
| Chromium | 576 → 455 | **116 → 55** | **56 → 0** (28 views, 23 px → 0) | **28 → 0** | 444 → 399 | 122 → 47 |
| Firefox (calibrated face) | 502 → 450 | 59 → 57 | 0 → 0 | 0 → 0 | 404 → 398 | 87 → 43 |
| WebKit | 484 → 436 | 57 → 56 | 0 → 0 | 0 → 0 | 368 → 360 | 105 → 67 |

### 7.1 The weight-400 residual, quantified (`runs/w400-residual.txt`)

| | Chromium | Firefox | WebKit |
|---|---|---|---|
| Weight-400 element-views re-wrapping, before → after | 444 → **399 of 12,152 (3.65 % → 3.28 %)** | 404 → **398 (3.32 % → 3.28 %)** | 368 → **360 (3.03 % → 2.96 %)** |
| Views with ≥ 1 regular-face re-wrap, after | 184 / 196 | 184 / 196 | 183 / 196 |
| Above the fold at load (of 1,391), before → after | 81 → **50** | 52 → **52** | 44 → **44** |
| Largest contributors (after, Chromium) | footer tagline "We help businesses get found…" **168 views** (6 of 7 widths on every route; above the fold in 8, short pages only); footer link "Conversion optimisation" at 390 (28); not-found card text (18, all above the fold); page paragraphs (`p.dc-body` 40, `p.dc-desc` 23, `p.dc-lede` 10, legacy `p` 36) | similar | similar |

**Why it remains (VERIFIED):** Arial and Manrope differ per string (CV 1.3 % at 400); one size-adjust can only match the mean, so roughly 3 % of
weight-400 elements land on the other side of a line break. Calibration reduced it by 10 % in Chromium and ~0–2 % elsewhere; no `@font-face`
descriptor can remove it. Removing it needs either per-element tuning (component changes — not authorised) or not swapping late (`font-display:
optional`, rejected in the diagnostic as a design trade-off) — an owner decision (§13).

## 8. Before / after — dynamic runs (normal and delayed loading)

Runs: **Playwright** 2,773 measured (11 throttled excluded); **official Firefox 157.0.1** 1,120 measured (22 throttled, 20 stalled excluded; those
views re-run); **real Safari 26.2** 350 measured (61 throttled, 2 stalled excluded; re-run). 12 routes (5 Direction C incl. `/pricing` and
`/services`; `/problems/…`; legacy `/about`, `/contact`, `/faq`, `/how-it-works`, `/blog`; dynamic `/blog/b0-no-such-post`; 404) × 7 widths.
Full tables: `runs/accept-{playwright,real-firefox,safari}.txt`; paired per view: `runs/paired-summary.txt`.

### 8.1 Mechanism A — the face Firefox paints while Manrope is pending

| Engine | Condition | Before | After |
|---|---|---|---|
| **Official Firefox 157.0.1** | normal first visit (3 reps) | pending painted DC 22/105, legacy 41/146 — **system-ui** in every non-ambiguous run | DC 17/105, legacy 37/147 — **calibrated** (or indistinguishable from final); **system-ui 0** |
| | Manrope late 300 / 2,500 ms | system-ui in 44 + 35 / 46 + 36 runs | **calibrated; system-ui 0** |
| | captures (BiDi), JS on **and off** | `/about` 390, `/how-it-works` 360: system-ui, fallback `unloaded`; `/`, `/pricing`: calibrated (arrow effect) | all four: **calibrated**, both faces `loaded` (`captures/`) |
| Playwright Firefox 153 | normal ×3 / late / reduced motion | system-ui in every pending run | **system-ui 0** |
| Chromium, WebKit, real Safari | all | calibrated (unchanged) | calibrated |

### 8.2 Movement when Manrope arrives late (2,500 ms; 300 ms identical) — worst view per group

| Engine | Pop. | Paragraph / button / h2 move before → after | Button width Δ | Banner Δ | Native layout-shift (Chromium) |
|---|---|---|---|---|---|
| Chromium | DC | 29 / **60** / 29 → 29 / **29** / 29 px | 15 → 5 px | **23 px (5 views) → 0** | **max 0.1215 → 0.0429**; views > 0.01: 9 → 4 |
| Chromium | legacy | 52 / 0 / 0 → 52 / 0 / 0 px | 0 | **23 px (6) → 0** | **max 0.119 → 0.049**; views > 0.01: 14 → 9 |
| Official Firefox | DC | 56 / 54 / 54 → **29 / 29 / 29** px | 6 → 5 | 0 → 0 | n/s |
| Official Firefox | legacy | 52 / 0 / 37 → 52 / 0 / 37 px | 0 | 0 → 0 | n/s |
| Playwright WebKit | DC / legacy | 29 / 29 / 29 and 52 / 0 / 0 → same (+ new 1 px moves on `/`) | 7 → 5 | 0 | n/s |
| Real Safari | DC / legacy | 28 / 28 / 28 and 52 / 0 / 0 → same (+ 2 px on `/` 768/1440) | 7 → 5 | 0 | n/s |

**Chromium native layout-shift, paired views (84 per hold):** mean 0.0167 → **0.0046**; views > 0.1: **3 → 0**; > 0.01: **23 → 13**; improved 23,
unchanged 58, **worse 3** (`/blog` 768 0.0145 → 0.0201, 1024 0.009 → 0.0125, 1440 0.0233 → 0.0321). The remaining shifts are mostly **unchanged**
views (`/pricing` 768 0.0429, `/problems/…` 768 0.0379, not-found pages 0.0309), sourced from the header's right cluster (`div.dc-right`), the banner
buttons' row and single-line items whose **width** (not line count) differs — the sweep optimised line counts only.

**Official Firefox, paired views (late 2,500):** views moving 14 → 10; improved 9, unchanged 71, **worse 3** (`/ai-seo` 430 0 → 26 px, `/faq` 430
0 → 26, `/faq` 768 0 → 52): in those views system-ui happened to break lines like Manrope and the calibrated face does not. Same pattern in
Playwright Firefox (4 worse, 10 improved).

### 8.3 Normal first visits

| Engine | Before | After |
|---|---|---|
| Chromium, WebKit, real Safari | Manrope ready at first paint in every run (0 pending paints); no moves | unchanged (0 pending; no moves). One Chromium run on `/` 320 shows native 0.0012 (`#text`, before first paint) — **repeated 6 × 7 widths per build: 3/42 before, 1/42 after, ≤ 0.0013: intermittent, pre-existing** |
| **Official Firefox** | moves in 8 views (DC ≤ 32 px, legacy ≤ 52 px) | moves in **3 views** (DC **0**; legacy ≤ 37 px); paired: improved 6, unchanged 77, **worse 1** (`/faq` 430 0 → 26 px) |
| Playwright Firefox | 8 views (≤ 54 px) | 6 views (DC ≤ 26 px; legacy ≤ 40 px); improved 5, worse 2 |

### 8.4 Warm cache, reduced motion, no JavaScript

- **Warm cache** (page loaded once, measured on the second load; 84 views × 4 engines): **0 pending paints and 0 moves before and after** in every engine.
- **Reduced motion** (`prefers-reduced-motion: reduce`, Playwright, 12 routes × 390/1440): same pattern as above (Firefox system-ui → calibrated;
  Firefox DC moves 32 → 0 px; Chromium/WebKit unchanged).
- **No JavaScript:** official Firefox captures with `javascript.enabled=false` (page script confirmed not running): before system-ui on 2 of 4 views,
  after calibrated on 4/4 (§8.1). Playwright no-JS check: §9 (`o19r-checks.cjs`). The banner is client-rendered and absent without JavaScript (by design).

## 9. Accessibility and hydration

`o19r-checks.cjs`, before (`3b333c4`) vs after (`46785af`), 21 routes (10 Direction C, 9 legacy incl. `/about`, `/contact`, `/faq`, `/how-it-works`, `/blog`, `/schedule-call`, `/thank-you`, `/privacy-policy`,
`/terms`, dynamic `/blog/b0-no-such-post`, 404) × 7 widths × Chromium / Playwright Firefox / WebKit = 441 views; a11y subset 320/390/768/1440
(252 views). Files: `regression/side-checks-{chromium,firefox,webkit}.txt`.

| Check | Chromium | Firefox | WebKit |
|---|---|---|---|
| Accessibility tree (`ariaSnapshot` of `<body>`), consent stored | identical 84/84 | identical 84/84 | identical 84/84 |
| Accessibility tree with the **consent banner shown** (and the banner's box) | identical 84/84 | identical 84/84 | identical 84/84 |
| First 40 Tab stops; a prime ever focused | identical 84/84; **never** | identical; never | identical; never |
| Accessible names (headings, links, buttons, form controls, images; `accessible-names.cjs`, 15 routes × 390/1440) | identical | identical | identical |
| `<main>` `textContent`, heading inventory | identical 147/147 | identical 147/147 (innerText of `/` 360/390 varies with the hero widget's state — same two variants on both builds, 4 + 2 of 12 loads each) | identical 147/147 |
| Primes (2, first rendered children of `<body>`, `aria-hidden`, no text node, `visibility: hidden`, 0 px, `tabIndex` −1, not focusable, `::before` "a", family "Manrope Fallback", weights 400 / 700; both faces `loaded`; DC primes 4 on DC routes, 0 elsewhere) | correct 147/147 | 147/147 | 147/147 |
| Console errors / uncaught / hydration (#418/#423/#425) | **0** | **0** | **0** |
| Reduced motion (`prefers-reduced-motion: reduce`) final layout | identical or arrow-only | arrow-only (≤ 1.3 px) | identical or arrow-only |
| `route-a11y-motion.cjs` (10 DC routes + `/about`, both builds × 3 engines) | same failures before and after (KD-09 figure text `R1`); stop counts, order and `bad` identical; only the sampled focus-outline colour list differs (mid-transition sample, both directions) | same | same |

**No JavaScript:** Playwright Firefox (`javaScriptEnabled: false`, Manrope held 4 s): before **system-ui** on 8 of 12 views (`/ai-seo`, `/about`,
`/how-it-works`, `/faq`), after **calibrated** on 12/12; Chromium and WebKit calibrated before and after; direct loads without the proxy: Manrope and
both fallback faces `loaded` in all three engines (the WebKit `error` status under the proxy's 4 s hold occurs on both builds — harness artefact).
Official Firefox with `javascript.enabled=false`: §8.1. Screen readers: **not tested** (SR-1 – SR-5).

## 10. Cross-browser regression

| Check | Result |
|---|---|
| `npm run typecheck` · `npm run lint` · `npm test` | pass · pass · **30 / 30** (run on the committed tree) |
| `npm run build` (plain, fixture) | pass — `9OkYNwf1QaSqrHrWbwZRN`, `N7gMwUt70Pm3-Y-SXil_Y` |
| cPanel: `build:cpanel` + `verify:build` + `verify:cpanel` | pass — `Rj6ht_1o7-xUE7xz8xpYE` |
| `run-all.cjs` (34 targets, 3 engines) + `classify.cjs` vs the `3b333c4` run (`obs18-impl/evidence/run/`) | layout Chromium / WebKit / Firefox **NEW 0** (KNOWN 516; Firefox RESOLVED 1 = the intermittent OBS-6 not-found `h1-count`); a11y × 3 **NEW 0** (KNOWN 27 / 10 / 10); responsive layout 7 widths incl. text spacing, 200/400 % zoom: **0 new overflow/clipping** |
| Route inventory vs the before build (same session) | 813 facets identical; 37 differences = **31 declared** (Manrope preload file name `…-s.p.woff2` → `….p.woff2`, same bytes) + **6 OBS-6** live-DOM not-found metadata variances (served head identical, next row); chrome consistency 0 failures |
| SEO head, structured data (`served-head.cjs`) | **34 / 34** identical status, titles, meta, canonical/alternate, JSON-LD |
| Analytics, consent, booking, forms, conversion events (`analytics-forms.cjs --compare`) | **0 differing sections** |
| Content (`b4-content.cjs`, every `<main>` text node, JS + no-JS) | **0 differences** |
| GTM DOM dependency (`<main>`, 15 routes) | identical — IDs, `data-*`, sections, buttons/forms, links, classes (the primes are outside `<main>`) |
| Chromium `<main>` pixels (`pixel-main.cjs`, Chromium only — TOOL-1) | same build vs itself **68/68 identical**; before vs after **48/68 identical** — the 20 differing captures are exactly the routes that render U+2192 (8 DC routes with CTA arrows, `/privacy-policy`, `/terms`; 65–599 px each); arrow-free routes (`/ai-seo`, `/conversion-optimization`, legacy, CMS, 404) identical. Geometry check: only arrow-bearing elements change, horizontally, ≤ 0.7 px (Chromium/WebKit), ≤ 1.3 px (Firefox) |
| Final loaded geometry (`o19r-checks.cjs`, every text element's box) | 91/147 views identical per engine; the rest arrow-only (above) or `/` hero-widget timing (same-build re-run shows the same 1–3 px variation) |
| Throttled CLS (Chromium native; 10 DC routes × 7 widths; 400 ms RTT, 50 kB/s, 4× CPU, consent declined) | **max 0.001** — `/` 0.001 at all 7 widths and `/services` 768 0.001 (`#text`): **the same values and views as the `3b333c4` record**; LCP from this run not compared (side checks were running concurrently) |
| OBS-17 (real Safari 26.2, `safari-roles-harness.cjs`, 10 DC routes × 7 widths) | H1 re-wraps **0 → 0**; display roles whose final ≠ fallback 7 → 7; `font-optical-sizing: none`; no overflow/clip — **preserved** |
| OBS-18 (official Firefox, display face held 2.5 s, 5 DC routes × 7 widths) | **0 H1 line changes, 0 display-caused moves** — **preserved**; DC primes 4 on DC routes, 0 elsewhere |
| Hydration / console in every harness run | 0 errors in all 4,243 dynamic runs (Playwright, official Firefox, Safari) |

`pixel-main.cjs` was used unchanged and only for a Chromium comparison; its reported engine was not relied on (it always launches Chromium).
No regression attributable to the change was found other than the declared arrow rendering and the residual movement in §8 / §12.

## 11. Performance and font-loading impact

| | Before → after |
|---|---|
| Font files / requests | the same three preloaded fonts; Manrope byte-identical (renamed only); **no new request** (`local()` faces load no file) |
| CSS (home) | main stylesheet 170,977 → 171,664 B (gzip 27,450 → 27,683); font stylesheet 19,922 → 19,759 B (gzip 4,626 → 4,605): **net +212 B gzip** |
| HTML (home) | 92,591 → 92,989 B (+398 B: two empty spans in markup and RSC payload) |
| FCP median (normal loads) | Chromium 56 → 48 ms; Playwright Firefox 63 → 63; official Firefox 56 → 57; WebKit 67 → 60; real Safari 62 → 62 (loopback; noise level) |
| Manrope `loadingdone` median | Chromium 53 → 48 ms; Playwright Firefox 70 → 71; official Firefox 64 → 62 (WebKit/Safari do not fire the event) |
| `<meta name="next-size-adjust">` | still present (Bricolage keeps its automatic fallback) |

No font-loading regression was found.

## 12. Residual instability (reported, not hidden)

1. **Weight-400 re-wraps on late Manrope** (§7.1): ~3 % of regular-weight element-views in every engine, at least one in ~184 of 196 views; mostly the
   footer tagline (below the fold) and a few page paragraphs; above the fold 50 (Chromium) / 52 (Firefox) / 44 (WebKit) of 1,391.
2. **Late-Manrope movement still present**: paragraphs up to 52 px and buttons up to 29 px (pushed by paragraphs above them) in every engine;
   Chromium native layout-shift up to **0.049** (13 of 84 views > 0.01) in the 2.5 s stress case — below the 0.1 threshold but not zero.
3. **Firefox normal first visits**: the pending state is still painted in ~16–25 % of cold loopback loads (now calibrated); moves remain in 3 of 84
   views (legacy, ≤ 37 px).
4. **A few views got worse** where system-ui coincidentally matched Manrope (Firefox) or a width shift grew (Chromium `/blog` 768/1024/1440,
   native +0.004 to +0.009).
5. **Loaded-state difference on the → arrow** (§10): U+2192 is not in Manrope's latin subset, so the arrow is drawn by the fallback **even after
   Manrope loads**; bold arrows (Direction C CTAs, `aria-hidden`) are now real Arial Bold at 99 % instead of synthesised bold at 103.19 %: **0.71 px
   narrower**, the CTA 0.7 px narrower; regular arrows on `/privacy-policy`, `/terms` keep their width with marginally different rasterisation.
6. Not measured: real networks, Windows/Linux (Liberation Sans is metric-compatible with Arial; untested), Android (no Arial: fallback chain falls
   through), iOS, screen readers (SR-1 – SR-5).

## 13. OBS-19 closure assessment

| # | Acceptance criterion (brief §9) | Result | Evidence |
|---|---|---|---|
| 1 | Firefox loads the calibrated fallback instead of the system fallback | **PASS** | official Firefox 0 system-ui in every after-build pending run (normal, 300, 2,500 ms, JS off); Playwright Firefox the same (§8.1) |
| 2 | Manrope arrival introduces no meaningful text reflow in the tested population | **FAIL (partially improved)** | late Manrope: paragraph moves ≤ 52 px remain; ~3 % weight-400 re-wraps; Chromium native ≤ 0.049; Firefox normal loads 3 views ≤ 37 px (§7–8, §12) |
| 3 | Consent-banner height stable during the swap in the stress conditions | **PASS** | Chromium 23 px (11 views) → 0; static banner re-wraps 56 → 0; 0 in every engine and condition |
| 4 | Visible buttons do not move because of Manrope substitution | **PARTIAL** | button re-wraps 28 → 0, width change 15 → 5 px, Chromium DC button moves 60 → 29 px; buttons still move ≤ 29 px when text above them re-wraps |
| 5 | Heading/paragraph line counts stable where calibration is intended to preserve them | **PARTIAL** | bold roles (600–800): re-wraps 122 → 47 (Chromium), 87 → 43 (Firefox), 105 → 67 (WebKit); weight 400: 3.65 → 3.28 % — essentially unchanged |
| 6 | No new overflow or clipping | **PASS** | layout NEW 0 × 3 engines (7 widths, text spacing, zoom); page overflow 0 in every dynamic run |
| 7 | No hydration errors | **PASS** | 0 console/hydration errors in 441 side-check views and 4,243 dynamic runs |
| 8 | No accessibility-tree or keyboard regressions | **PASS** | a11y tree with and without the banner, Tab stops, accessible names identical; primes never focused; a11y classify NEW 0 (screen readers not tested) |
| 9 | No new font-loading performance regression | **PASS** | §11 |
| 10 | Loaded-font rendering unchanged | **PARTIAL** | every Manrope-rendered glyph and box unchanged; the U+2192 arrows (fallback-rendered in both builds) changed: Chromium `<main>` pixels 48/68 identical; the 20 differing captures are exactly the arrow-bearing routes and the geometry change is confined to arrow-bearing elements (§10, §12.5) |

**Recommendation: do NOT close OBS-19.** Mechanism A is resolved; mechanism B is mitigated (the consent banner and button re-wraps are eliminated;
peak Chromium late-font layout-shift 0.12 → 0.049) but not removed, and criteria 2, 4, 5 and 10 are not fully met. Proposed re-classification:
**OBS-19 OPEN — residual, late-font only**: weight-400 per-string metric mismatch and single-line width shifts when Manrope arrives after first paint
(never on normal loads in Chromium, WebKit or Safari; in Firefox on ~20 % of cold loopback loads, now in the calibrated face). Options for a
**separate owner decision** (none implemented): (a) accept the residual as within budget (late-font native ≤ 0.05) and close with that exception;
(b) `font-display: optional` for Manrope (no swap on a late first visit; design face absent on that view — diagnostic §8); (c) restore the arrow's
previous rendering (e.g. a separate unicode-range face for U+2192) if the 0.7 px change is unacceptable; (d) per-component tuning — not recommended.

## 14. Commits

| Commit | Content |
|---|---|
| **`46785af`** | Application: `app/layout.tsx`, `app/globals.css` |
| the documentation commit that adds this report | `DEC-047` (authorisation, OBS-18 closure, outcome), `CURRENT_STATE.md`, known-defects register §15 + JSON, runbook §5.14, this report, `gate-4/obs19-remediation/` |

Not pushed, merged or deployed. B5 not started.

## 15. Remaining quality-gate obligations

- **OBS-19** — owner decision on the residual (§13).
- **KD-09 / KD-10** — deferred to the dedicated pre-production accessibility batch (unchanged).
- **SR-1 – SR-5** — genuine VoiceOver/TalkBack testing outstanding; mandatory before B5 reuses the affected components.
- **TOOL-1** — `pixel-main.cjs` browser selection deferred; not edited (used only for labelled Chromium comparisons).
- **E1** — real devices (iOS, Android), Windows/Linux fallback faces, real-network font timing: not tested.
- **:3999** — the user's own `next dev` on all interfaces, purpose unknown, untouched: owner to confirm.
- **B5** — not authorised.
