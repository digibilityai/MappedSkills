# MappedSkills UI Revamp — Gate 4 · OBS-18 Implementation

| | |
|---|---|
| **Date** | 2026-10-09 – 2026-10-10 |
| **Authority** | **`DEC-046`** (owner, 2026-10-09): targeted OBS-18 implementation using the verified **in-flow** fallback-priming approach, subject to regression testing; local testing in official Firefox, Playwright Firefox, Chromium, WebKit and real Safari; governance/evidence updates; local commits. Not authorised: an OBS-19 fix, typography changes, KD-09/KD-10, `pixel-main.cjs`, B5, push/merge/deploy |
| **Status** | **Implemented and verified. Every acceptance criterion passed (§10). Closure of OBS-18 is RECOMMENDED, not recorded** — owner to confirm |
| **Application commit** | **`3b333c4`** `fix(ui-revamp): prime the calibrated display fallbacks in Firefox (OBS-18)` — local, not pushed |
| **Evidence** | [`gate-4/obs18-impl/evidence/`](gate-4/obs18-impl/evidence/) (index: its `README.md`; acceptance tables: `runs/accept-summary.txt`) |
| **Companion** | OBS-19 is reported separately: [`GATE_4_OBS19_DIAGNOSTIC.md`](GATE_4_OBS19_DIAGNOSTIC.md) |

Evidence labels follow `CLAUDE.md`. Movement figures are a **geometric approximation** (impact × distance fraction), **not browser-native CLS**:
Firefox and WebKit have no Layout Instability API.

---

## 1. Authorisation and baseline

| | |
|---|---|
| Branch / HEAD at start | `ui-revamp`, **`36b934e`** (DEC-045 governance) — VERIFIED; application commit **`0e8df27`** in history — VERIFIED (application tree at `36b934e` = `0e8df27`) |
| Working tree at start | `M next-env.d.ts`; untracked B0–B4 screenshot folders, `gate-2/screenshots/app/`, `gate-4/b4/owner-review/screenshots/*`, `gate-4/b4/MappedSkills_B4_Visual_Review.zip` — **preserved, never staged** |
| Test servers at start | none listening (VERIFIED) |
| Read | `CURRENT_STATE.md`, `DECISION_LOG.md` (`DEC-042` – `DEC-045`), `QUALITY_GATES.md`, `QA_REGRESSION_RUNBOOK.md` §5, known-defects register §11–13 + JSON, `GATE_4_OBS18_REAL_FIREFOX_VERIFICATION.md`, `gate-4/obs18-real-firefox/evidence/` scripts |
| Decision recorded | **`DEC-046`** appended before any change (authorisation only; outcome added at the end) |
| Owner-confirmed implementation detail | the glyph of each priming element comes from CSS generated content (`::before`) instead of a literal text node, so no priming text enters the DOM; fallback to the literal form if less effective (§3.2) |

## 2. Implementation — files changed (commit `3b333c4`)

| File | Change |
|---|---|
| `components/direction-c/primitives.tsx` | `DcPage` renders `<FallbackPrimes />` as its first child; `FallbackPrimes` renders four `<span aria-hidden="true" className="dc-font-prime dc-font-prime--{hero\|96\|72\|96b}" />` (+ comment citing OBS-18 / DEC-046 and the Gecko rule) |
| `app/direction-c.css` | Under the calibrated `@font-face` rules: `.dc-font-prime { display:block; height:0; overflow:hidden; visibility:hidden; font-weight:800 }`, `.dc-font-prime::before { content:"a" }`, four modifiers each naming exactly one calibrated face (`"DC Display Hero Fallback"`, `"DC Display 96 Fallback"`, `"DC Display 72 Fallback"`, `"DC Display 96 Fallback B"`) |

35 insertions, 1 deletion. **Unchanged:** font files, stacks, `size-adjust`/overrides, `.dc-display` / `.dc-statement` (incl. the OBS-17
`font-optical-sizing: none` and `opsz` settings), sizes, weights, line heights, letter spacing, motion, copy, routes, metadata, analytics.
No client JavaScript, no dependency.

## 3. The in-flow architecture

### 3.1 Why `DcPage`

- **Population.** All ten Direction C routes render through `DcPage` and nothing else does (VERIFIED by search): `/`, `/pricing`,
  `/problems/traffic-but-no-enquiries`, `/services`, `/seo`, `/ai-seo`, `/google-ads`, `/social-media-ads`, `/lead-generation`,
  `/conversion-optimization`. Legacy routes carry no prime (served HTML: 0 on `/about`, `/faq`, …; §6).
- **Order.** The primes are the first in-flow children of `.dc`, before every display heading, so Gecko lays them out — and loads each `local()`
  face — before any display text in document order. The rejected out-of-flow form (laid out after in-flow content) is not used.
- **React.** `DcPage` is a Server Component: React renders the same spans on the server and the client — no injected wrapper, no hydration
  mismatch (0 hydration messages, §6).
- **Selectors.** No `.dc > …`, `:first-child` or `:nth-child` rule targets `.dc`'s children (direction-c*.css, globals.css), so the leading spans
  change no selector match; `<main>`/`.dc` top and document height are identical before/after (§4.3).
- **Future routes.** Any B5 route built with `DcPage` inherits the primes; a new calibrated display face needs its own prime (runbook §5.13).

### 3.2 Glyph-source gate (`::before` vs the verified literal "a") — before committing

Same pre-correction build (`0e8df27`), injected test forms: `inflow` (literal text, verified in `DEC-045`) vs `inflowcss` (empty spans + `::before`).

| Engine | Condition | Painted pending face | H1 line changes (views) |
|---|---|---|---|
| Real Firefox 157.0.1 (159 measured, 9 throttled excluded) | normal / 300 ms × `inflow` | calibrated 12 / 41 | **0 / 0** |
| | normal / 300 ms × `inflowcss` | calibrated 11 / 39 | **0 / 0** |
| Playwright Firefox 153 (189) | none (control) | Arial Narrow | 2 / 7 / 7 (normal / 300 / 2,500) |
| | `inflow` | calibrated | **0 / 0 / 0** |
| | `inflowcss` | calibrated (calibrated face `loaded` from the first frame 63/63) | **0 / 0 / 0** |

**Result:** the `::before` form is as effective as the literal form; the literal fallback was not needed. (`runs/gate-*.json`.)

## 4. Firefox before / after

### 4.1 Official Firefox 157.0.1 (no automation; temporary profiles; window in the foreground)

10 routes × 7 widths (320, 360, 390, 430, 768, 1024, 1440) × hold 0 / 300 / 2,500 ms, every web font cold per load; 3 repetitions on `/`, `/pricing`,
`/problems/…`, 1 on the other seven. **672 runs; 2 excluded** (throttled: frame gap ≥ 250 ms — `/` 1024 normal before, `/conversion-optimization`
1024 300 ms before); 0 stalled. `navigator.webdriver` false in every run.

| Build | Condition | Pending state painted | Face painted while pending | **H1 line changes (views)** | Views moving | Max H1 height change | Views ≈ > 0.01 | Max ≈ |
|---|---|---|---|---|---|---|---|---|
| Before | normal | 28 / 111 | Arial Narrow 28 | **10** | 15 | 61 px | 7 | 0.0512 |
| Before | 300 ms | 111 / 111 | Arial Narrow 111 | **25** | 29 | 78 px | 19 | 0.0409 |
| Before | 2,500 ms | 112 / 112 | Arial Narrow 112 | **25** | 28 | 78 px | 19 | 0.0409 |
| **After** | normal | 34 / 112 | **calibrated** 33, calibrated≡final 1 | **0** | 3 | **0 px** | 1 † | 0.0184 † |
| **After** | 300 ms | 112 / 112 | **calibrated** 109, calibrated≡final 3 | **0** | 0 | **0 px** | 0 | 0 |
| **After** | 2,500 ms | 112 / 112 | **calibrated** 109, calibrated≡final 3 | **0** | 3 | **0 px** | 0 | 0.0089 † |

† **Not OBS-18.** Every remaining after-build move leaves the H1's lines, width and height unchanged: `/ai-seo` 768 (normal, content +54 px,
≈ 0.0184), `/pricing` 768/1440, `/google-ads` 390, `/social-media-ads` 390, `/problems/…` 390 (25–32 px). These are the body-font moves recorded as
**OBS-19** and measured in the OBS-19 diagnostic. They are reported here, not hidden, and they are not claimed to be eliminated.
"calibrated≡final": views where the calibrated and final faces give identical lines (cannot be told apart; not Arial Narrow).

### 4.2 Playwright Firefox 153 (same harness, matrix and repetitions; 672 runs, 0 excluded)

Before: H1 line changes 9 / 25 / 25 views (normal / 300 / 2,500), Arial Narrow in every painted pending run. **After: 0 / 0 / 0**, calibrated in every
painted pending run (109 + 3 calibrated≡final). Residual non-H1 moves ≤ 31 px (OBS-19).

### 4.3 Final loaded-font state — identical

For every engine × view, the final frame (H1 lines, summed line widths, H1 height, first-CTA page-y, `<main>` top, `.dc` top, document height) is
**identical before and after in 70 / 70 views** in real Firefox, Playwright Firefox, Chromium and WebKit (`runs/accept-summary.txt`).

### 4.4 Captures (real Firefox, WebDriver BiDi, display face held 6 s; `captures/`)

| View | Before, during | After, during | After (loaded) |
|---|---|---|---|
| `/pricing` 1024 | **Arial Narrow**, 2 lines (963.1 px), calibrated `unloaded` | **calibrated**, 3 lines (1,078.5 px), `loaded` | final, 3 lines (1,101.5 px) — same as before |
| `/` 390 | Arial Narrow, 2 lines | calibrated, 3 lines | final, 3 lines |
| `/problems/…` 1024 | Arial Narrow, 3 lines | calibrated, 4 lines | final, 4 lines |

## 5. Cross-browser verification

| Engine | Result |
|---|---|
| **Chromium 151** (280 runs, hold 0 / 2,500) | Before = after: 0 pending paint under normal loading; calibrated while pending; 0 H1 line changes; final state identical 70/70. obs17-swap: final and fallback renders identical 70/70; delayed swap 0 shifting views both builds |
| **Playwright WebKit 26.5** (280 runs) | Before = after: 0 H1 line changes; the same three 1 px shifts in both builds (`/social-media-ads` 1440, `/pricing` 1440, `/problems/…` 768 — pre-existing); final state identical 70/70; obs17-swap final/fallback identical 70/70 |
| **Real Safari 26.2** (macOS 15.7.3; `safari-roles-harness.cjs`, every display role, final vs declared fallback; 280 measurements, `clientWidth` = target in all) | **H1 re-wraps 0 → 0**; display-role elements whose final ≠ fallback line count 7 → 7 (the post-`DEC-043` figure, unchanged); final H1 boxes identical; no overflow/clip; computed `font-optical-sizing` `none` (**OBS-17 correction preserved**) |
| **Firefox (obs17-swap, Playwright)** | Views shifting at the delayed swap **27 → 0**; views ≈ > 0.01 **19 → 0**; max shift **107 → 0 px**; final/fallback renders identical 70/70 |

No cross-browser regression was found.

## 6. Accessibility, hydration and no-JavaScript

| Check | Result |
|---|---|
| Accessibility tree (`ariaSnapshot` of `<body>`) | **Identical** before/after in 120 / 120 views (10 routes × 320/390/768/1440 × Firefox, Chromium, WebKit) |
| Keyboard | First 40 Tab stops **identical** in 120 / 120; a prime **never** took focus (also `tabIndex` −1 / not focusable in all 952 after-build harness runs) |
| Accessible names | headings, links, buttons, form controls, images **identical** (`accessible-names.cjs`, 3 engines × 390/1440) |
| Heading inventory, `<main>` innerText and textContent | **identical** in 120 / 120 (the primes carry no text node: `textContent` length 0, generated content `"a"`) |
| Reduced motion | layout under `prefers-reduced-motion: reduce` identical in 120 / 120; `route-a11y-motion.cjs` (10 routes + `/about`, 3 engines, both builds): the same 5 pre-existing failures before and after, 0 result differences |
| Primes in every after-build harness run (952) | 4 present, first child of `.dc`, all inside `aria-hidden`, `visibility: hidden`, 0 px high, 0 visible, 0 focusable, glyph = generated `"a"` with no text node, each naming its one calibrated face; 0 in every before-build run |
| Hydration / console | **0** console or uncaught errors and **0** hydration messages (#418/#423/#425) in every harness run (both builds, 4 engines) and in `impl-checks` |
| **No JavaScript — real Firefox 157.0.1** (profile `javascript.enabled=false`; page script confirmed not running, 6/6) | before: Arial Narrow 3/3 views; **after: calibrated 3/3** (`captures/*-nojs-during.jpg`) |
| No JavaScript — Playwright (`javaScriptEnabled: false`, face held 4 s) | Firefox: before Arial Narrow 20/20 → **after calibrated 20/20** (1 calibrated≡final); Chromium/WebKit: calibrated before and after; page script ran in 0 |
| SR-1 – SR-5 (VoiceOver/TalkBack) | **Not performed** — automated checks above do not substitute; still mandatory before B5 component reuse |

## 7. Regression results (after build vs the post-B4 baseline and vs the before build)

| Check | Result |
|---|---|
| `npm run typecheck` · `npm run lint` · `npm test` | pass · pass · **30 / 30** |
| `npm run build` (plain + fixture) | pass (BUILD_IDs in the evidence README) |
| cPanel: `build:cpanel` + `verify:build` + `verify:cpanel` | pass (`DdC_PpzF0SHa5QZGrM1Bb`) |
| `run-all.cjs` (34 targets, 3 engines) + `classify.cjs` vs `post-b4/evidence/run/` | layout Chromium/WebKit **NEW 0**; a11y ×3 **NEW 0**; layout Firefox **NEW 1** = `press-slug~not-found` 1024 "0 visible h1" — a dynamic not-found page with no `DcPage`; re-run in isolation it appears **intermittently on both builds** (before: 0 then 3 findings; after: 0 then 1) — OBS-6-family timing, **not caused by this change** |
| Route inventory / chrome consistency | inventory vs before build: **850 facets identical, 0 differences**; chrome consistency 0 failures |
| SEO head, structured data | `served-head.cjs`: **34 / 34** identical status, titles, meta, canonical/alternate, JSON-LD |
| Analytics, consent, booking, forms, conversion events | `analytics-forms.cjs --compare`: **0 differing sections** (consent, banner, page_view, booking, ContactForm) |
| GTM DOM dependency (`<main>`, 10 DC routes) | IDs, `data-*`, sections, buttons/forms, every link (href, class, structure, Click Text) **identical**; only difference: the 5 declared class names `dc-font-prime{,--hero,--96,--72,--96b}` |
| Content (`b4-content.cjs`, every `<main>` text node, JS + no-JS) | **0 differences** |
| Served HTML + RSC payload + rendered `<main>` (`impl-html-diff.cjs`, 34 targets) | after removing the declared primes: **34 / 34 identical** (markup, flight-payload values, rendered `<main>`). See §8 for the one separator comment |
| `<main>` pixels — **Chromium only**, two live builds, `--mask-chrome` | **68 / 68 pixel-identical** (labelled Chromium; `pixel-main.cjs` is not used for any WebKit/Firefox claim — TOOL-1) |
| WebKit / Firefox visual parity | obs17-swap captures, same capture code, both builds: final and fallback renders identical 70/70 per engine |
| Throttled CLS (Chromium, native API; 10 routes × 7 widths × 2 = 140 loads; run alone, awake) | **max 0.001** — 0.000 everywhere except `/` (all 7 widths) and `/services` 768 at 0.001 (`#text` source), **the same values and source recorded before this change** (`gate-4/e1a/evidence/run/cls-throttled.txt`, `146a892`: `/` 0.001 ×7 widths, `/services` 768 0.001) — pre-existing, unchanged; display face loaded at ≈ 7.5 s in every load |

## 8. Declared and unexpected differences

| Difference | Classification |
|---|---|
| Four `<span aria-hidden="true" class="dc-font-prime dc-font-prime--…"></span>` as the first children of `.dc` on the 10 DC routes (served HTML, RSC payload, DOM) | **DECLARED** — the authorised structural addition |
| CSS: the six `.dc-font-prime` rules; consequently the CSS chunk hash and the DC page/layout chunk hashes | **DECLARED** (build artefact) |
| RSC flight rows renumbered on DC routes (row ids/references) | **DECLARED, consequential** — identifiers only; the multiset of carried values is identical |
| `/services`: one additional empty React text-separator comment `<!-- -->` after "…each has a different fix." in the served HTML (14 → 15) | **DECLARED ON DISCOVERY, consequential** — the four prime tuples shifted the flight chunk boundary, React outlined that long string into its own row, and the HTML renderer closed the text with a separator. No text, attribute, DOM text, accessible name or layout difference (content compare 0; innerText/textContent identical; pixels identical). It is at the end of the paragraph, so it cannot create or remove a space (OBS-13 class) |
| Anything else | **None found** (no UNEXPECTED difference in any comparison) |

## 9. Remaining limitations

- Loopback only; real-network frequency of the pending state not measured; warm cache not measured. macOS only: no Windows/Linux Firefox
  (no Arial Narrow there — the fallback chain differs), no Android/iOS, no real iPhone (E1).
- Real Firefox runs are frame-sampled (a sub-frame state can be missed); the paint itself cannot be read by page script (BiDi captures are the visual check).
- **OBS-19 is not addressed**: body/heading text in the site faces still moves in Firefox when Manrope / site Bricolage arrive (§4.1 †).
- Run environment: one real-Firefox sweep restarted (window behind another app); four regression steps re-run after idle sleep (evidence README).
- Screen readers (SR-1 – SR-5) not tested.

## 10. OBS-18 closure recommendation

| Acceptance criterion (brief §6–7) | Result |
|---|---|
| OBS-18 heading re-wraps eliminated in tested Firefox conditions | **PASS** — real Firefox 0 H1 line changes in 336 after-build runs (normal, 300 ms, 2.5 s; 10 routes × 7 widths); Playwright Firefox 0 in 336 |
| Calibrated fallback preserved | **PASS** — calibrated face painted while pending in every after-build pending run (or indistinguishable from final) |
| No new layout shift / overflow / clipping | **PASS** — 0 overflow, 0 clipping; all residual moves are non-H1 (OBS-19), present before as well |
| Final loaded-font appearance, heading hierarchy, CTA positions | **PASS** — identical 70/70 × 4 engines; headings identical; Chromium `<main>` pixels 68/68 |
| No hydration warnings/errors | **PASS** — 0 |
| Accessibility tree, keyboard | **PASS** — identical 120/120 |
| Works without JavaScript | **PASS** — real Firefox 3/3, Playwright Firefox 20/20 |
| No cross-browser regression | **PASS** — Chromium, WebKit, real Safari unchanged; OBS-17 preserved |
| Regression suite | **PASS** (NEW 1 shown pre-existing and intermittent) |

**Recommendation: formally close OBS-18** for the verified scope (official Firefox 157.0.1 and Playwright Firefox 153 on macOS; the 10 Direction C
routes; 320–1440 px; loopback, cold cache), with OBS-19 remaining open as a separate item. **Closure is not recorded** — owner decision.

## 11. Commits

| Commit | Content |
|---|---|
| **`3b333c4`** | Application: `components/direction-c/primitives.tsx`, `app/direction-c.css` |
| the documentation commit that adds this report | `DEC-046`, `CURRENT_STATE.md`, register §14 + JSON, runbook §5.13, this report, `GATE_4_OBS19_DIAGNOSTIC.md`, `gate-4/obs18-impl/`, `gate-4/obs19/` (its hash is reported in the session handoff; a commit cannot contain its own hash) |

Not pushed, merged or deployed. B5 not started.
