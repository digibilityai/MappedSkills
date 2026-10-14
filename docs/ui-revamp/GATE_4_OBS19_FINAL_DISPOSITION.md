# MappedSkills UI Revamp — Gate 4 · OBS-19 Final Disposition and Launch-Risk Assessment

| | |
|---|---|
| **Date** | 2026-10-11 |
| **Authority** | Owner brief "Gate 4: OBS-19 Final Disposition & Launch-Risk Assessment" (assessment only). **Not authorised:** another typography cycle, B5, redesign, token changes, deployment, adopting `font-display: optional` or the arrow correction, KD-09/KD-10, SR-1 – SR-5, `pixel-main.cjs` |
| **Status** | **Assessment complete — owner decision required (§14). OBS-19 remains OPEN** (not closed by this assignment) |
| **Application changes** | **None.** Two experiments were built outside the repository and not committed (§7, §8) |
| **Evidence** | [`gate-4/obs19-final/evidence/`](gate-4/obs19-final/evidence/) (index: its `README.md`) |

Evidence labels follow `CLAUDE.md`. **Chromium "native"** figures are browser-native layout-shift values (Layout Instability API). Firefox and Safari expose no
such API: their figures are **element movement in px** measured from boxes, kept separate and never called CLS. All network profiles are **synthetic
throttling on loopback**; nothing here is field data.

---

## 1. Baseline and repository identity

| Check | Result |
|---|---|
| Branch / HEAD | `ui-revamp` / **`9e680eb`** — VERIFIED (as expected) |
| Application commit | **`46785af`** present in history; changes `app/layout.tsx`, `app/globals.css` only (+38 lines) — VERIFIED |
| Working tree | `M next-env.d.ts` and ~1,290 untracked screenshot/evidence files from earlier gates — **preserved, never staged** |
| Governance paths | The brief names `docs/ui-revamp/CURRENT_STATE.md` and `docs/ui-revamp/DECISION_LOG.md`; these files live in **`docs/00-project/`** (read there). Minor discrepancy, no effect |
| Servers | **:3620** `next start` of `3b333c4` plain (`-syppLkXlUH6HKeYL7rp5`, pre-OBS-19); **:3630** `46785af` plain (`9OkYNwf1QaSqrHrWbwZRN`) — both loopback, left by the DEC-047 session, identities verified via `_buildManifest.js` and the served primes. **:3999** the owner's `next dev` on all interfaces — **not touched**. Started by this session (loopback only): :3621 / :3631 (the DEC-047 CMS-fixture builds of `3b333c4` / `46785af`), :3640 / :3650 (experiments), harness proxies 48xx/49xx |
| Owner's Firefox | A Firefox instance on the owner's default profile was running; every official-Firefox run used a separate `-no-remote -new-instance` temporary profile |

No material baseline discrepancy.

## 2. Previously accepted evidence (DEC-047, not re-asserted)

Treated as prior results, re-tested where a question depended on them: Firefox system-font fallback fixed (mechanism A); banner height changes and button
re-wraps eliminated; Chromium late-Manrope native max 0.12 → 0.049; ≈ 3 % of weight-400 element-views re-wrap at a late swap (static sweep, not re-run);
paragraph ≤ 52 px / button ≤ 29 px moves; footer tagline the largest single source; U+2192 arrows changed in the loaded state; three Chromium `/blog`
views and three Firefox views "worse"; two official-Firefox pairs unpaired. **This gate reproduced** the stress figures (§6) and resolved the open
items (§6.2, §9).

## 3. New test methodology

1. **Realistic-loading harness** (`o19f-load.cjs`, new): top-level page loads through a loopback proxy that injects a per-frame sampler and applies a
   **synthetic network profile copied from Chrome DevTools' presets** — Fast 4G (165 ms latency, 8.1 Mbit/s), Slow 4G (562.5 ms, 1.44 Mbit/s), Slow 3G
   (2,000 ms, 0.4 Mbit/s): per-request latency plus one shared download link; compressed bytes preserved; HTML `no-store`, other assets with the server's
   own caching headers. Every Playwright run is a **fresh browser context** (empty cache). Also: unthrottled cold loopback ("cold"), Slow 4G + 4× CPU
   (Chromium), warm cache on Slow 4G (second load), and the DEC-047 **stress** reference (Manrope held 2,500 ms).
2. **Measured per frame:** FontFace status (Manrope, "Manrope Fallback"); boxes and line counts of the H1, first 8 `<main>` paragraphs, first 6 `<main>`
   CTAs, header links/buttons, consent banner (box + buttons), footer, footer tagline, form controls; Chromium native layout-shift entries with sources;
   FCP; Resource Timing of each font file. At the end the painted face of a reference paragraph is named against the page's fallback and a separately
   loaded copy of the Manrope file.
3. **Swap attribution:** the frame in which Manrope reports "loaded" **and** its file has arrived; elements compared between the previous frame and that
   frame. Two artefacts found and excluded during the gate (documented in `o19f-analyse.cjs`): a wider window caught an unrelated ≈ 560 px below-the-fold
   layout change in Firefox one frame later; real Safari flips Manrope's status to "loaded" at the end of `optional`'s block period without the file.
   Native shifts are also **attributed to the font whose file arrived 0–200 ms earlier** (Manrope, Bricolage, Direction C display face) or "other".
4. **Above the fold** = intersects the initial viewport at the swap (no scrolling occurs); the banner is fixed (always in view).
5. **Fairness:** C and O interleaved per view and condition, alternating order, one discarded warm-up per build; three engines in parallel (CPU
   contention affects loopback timing equally for both builds); no sleep event during any run (`pmset -g log`).

## 4. Route / browser / viewport matrix

| Set | Engines | Routes | Widths | Conditions | Runs |
|---|---|---|---|---|---|
| **Main sweep** C vs O | Playwright Chromium 151, Firefox 153, WebKit 26.5 | `/`, `/pricing`, `/ai-seo` (Direction C); `/problems/traffic-but-no-enquiries`; `/about`, `/contact` (form), `/faq` (legacy); `/blog` | 390, 430, 768, 1024, 1440 | cold ×3, Fast 4G, Slow 4G ×2, Slow 3G (390/1440), Slow 4G + 4× CPU (Chromium), stress, warm Slow 4G | **2,096**, 0 failed |
| **Regression re-check** P vs C (+ PF vs CF) | Chromium, WebKit (`/blog`); Firefox (`/faq`, `/ai-seo`) | DEC-047 "worse" cases | 430–1440 | stress ×3, cold ×3–5, Slow 4G ×2 | 336 |
| **Official Firefox 157.0.1** — `/contact` pairs | real | `/contact` | 430, 768 | Manrope held 300 / 2,500 ms × 3 reps, P vs C (DEC-047 harness unchanged) | 24, 0 stalled |
| **Official Firefox 157.0.1 / real Safari 26.2** C vs O | real (iframe page) | `/`, `/pricing`, `/about`, `/contact`, `/blog` | 390, 1440 | cold ×2, Slow 4G ×2, stress | 100 + 100, 0 failed, 0 hidden |
| Arrow experiment A vs C | Playwright ×3 | arrow routes | 390, 1440 | cold, stress | 72 |
| Regression checks (O vs C, A vs C, C vs C control) | Playwright ×3 | 7 / 12 / 2 routes | 390, 768, 1440 | loaded state, a11y, Tab, reduced motion, no-JS | 207 views |

Header/navigation, conversion CTAs, the consent banner (first visit in every run), the footer, the form and the blog are all in the tracked set.

## 5. Realistic loading results (approved build C)

**Was the fallback painted at all (Manrope not ready at first contentful paint)?**

| Condition | Chromium | Playwright WebKit | Real Safari 26.2 | Playwright Firefox | Official Firefox 157 |
|---|---|---|---|---|---|
| Cold, unthrottled loopback | **0 / 120** | **0 / 120** | **0 / 20** | 42 / 120 (35 %) | 2 / 20 |
| Fast 4G | 0 / 40 | 0 / 40 | — | 3 / 40 | — |
| Slow 4G | **0 / 80** | **0 / 80** | **0 / 20** | **0 / 80** | 2 / 20 |
| Slow 4G + 4× CPU | 0 / 40 | n/s | — | n/s | — |
| Slow 3G | 0 / 16 | 0 / 16 | — | 1 / 16 | — |
| Warm cache (Slow 4G) | 0 / 40 | 0 / 40 | — | 0 / 40 | — |

- **Why:** Manrope is preloaded and small (24.9 kB); in every profile its file finished *before* first paint in Chromium and WebKit (median Manrope
  ready 22 / 523 / 1,833 / 6,646 ms vs FCP 44 / 530 / 1,864 / 6,674 ms for cold / Fast 4G / Slow 4G / Slow 3G). Render-blocking CSS arrives no earlier.
  VERIFIED (synthetic).
- **Firefox paints the pending state briefly**: Manrope arrives **13–49 ms after first paint** (one run 179 ms). Of the 42 + 3 + 1 Playwright and
  4 official runs with a pending paint, **above-the-fold movement occurred in one view only**: `/ai-seo` 430 (1 of 3 cold loads) — the lede loses a line;
  the next paragraph and **both hero CTAs move up 27 px** within ~2–3 frames of first paint. The remaining above-the-fold items are the plain build's empty
  `/blog`, where the footer is in view (26 px). **No throttled Firefox run moved anything above the fold.**
- **Nothing else moved**: navigation never moved vertically (single-line width changes of 2–4 px only), the **consent banner height changed 0 px in every
  run**, the form never moved through a Manrope swap; warm loads: 0 swaps everywhere.
- **Native CLS (Chromium, realistic):** the only font-attributed shifts in realistic profiles are from **Bricolage**, not Manrope (§9.4); maximum
  Manrope-attributed native shift in every non-stress condition: **0.0000**.

**Observable during normal first visits?** On these synthetic profiles: **not in Chromium, WebKit or Safari; briefly in Firefox** (35 % of
cold loopback loads in Playwright under parallel CPU load, 10 % in official Firefox; tens of ms after first paint; one above-the-fold CTA case).

## 6. Stress-test results (Manrope held 2,500 ms — the DEC-047 reference)

### 6.1 Approved build C

| Engine | Views with swap | Above-the-fold elements moved / re-wrapped | Worst above the fold | Banner | Max native (Chromium) |
|---|---|---|---|---|---|
| Chromium | 40 / 40 | 15 moved; 9 line changes | `/pricing` 768: 5 paragraphs + **2 hero CTAs 29 px**; `/ai-seo` 430: **2 hero CTAs 27 px**; `/faq` 768: paragraphs 26–52 px; `/problems/…` 768: paragraphs 29 px | Δh **0** (button row: ≤ 8 px horizontal) | **0.049** (`/blog` 430, plain); `/pricing` 768 0.0429; `/problems/…` 768 0.0379 |
| Playwright Firefox | 40 / 40 | 16 / 10 | same views | 0 | n/s |
| Playwright WebKit | 37 / 40 | 15 / 9 | same views | 0 | n/s |
| Real Safari | 10 / 10 | 2 (CTAs 2 px) | — | 0 | n/s |
| Official Firefox | 10 / 10 | 0 | — | 0 | n/s |

Below the fold, lower CTAs and the footer move with the content above them (up to 241 px on long pages, e.g. `/problems/…` 768): **not visible at the
moment of the swap**. **VERIFIED:** these values reproduce DEC-047 §8 exactly (Chromium per-view natives identical). WebKit in 3/40 runs (and more often
under heavier CPU load) delayed first paint until the held Manrope arrived (FCP ≈ 2.5 s) instead of painting the fallback — both builds; a stress-only
behaviour.

### 6.2 Where the stress residual concentrates

- **Width 768** (DC hero ledes in a 2-column layout) and **430** on `/ai-seo`; Direction C routes and `/faq`. No engine-specific concentration beyond
  WebKit's delayed paint above.
- **Footer tagline**: re-wraps on almost every route (6 of 7 widths); above the fold only where the page is short (`/blog` plain, 404s).

## 7. `font-display: optional` experiment (O)

**Build:** `git archive 46785af` + `app/layout.tsx` Manrope `display: 'swap'` → `'optional'` (only Manrope's `@font-face` rules change; Bricolage, the
calibrated fallback, primes, preload unchanged). `rSKHu3NX7fRF4moFZ90g3`, :3640. **Not committed.**

| Question | Finding (actual browser behaviour) |
|---|---|
| 1. Does it reduce/eliminate swap movement? | **Chromium, WebKit, real Safari: yes, but only in the stress case** (40/40 → 0 moves; native 0.049 → 0) — the realistic profiles had no swap to remove. **Firefox: no.** Gecko paints the fallback immediately and still swaps when Manrope arrives inside its short `optional` window: Playwright cold **51/120 swaps (C: 42)**, Slow 4G **5/80 (C: 0)**; official Firefox Slow 4G **7/20 (C: 2)** — `optional` made Firefox *slightly worse*. Same above-the-fold case (`/ai-seo` 430, CTAs 27 px) |
| 2. Do slower connections stay on the fallback for the whole view? | **Only when Manrope misses the ~100 ms block period.** Under all three throttled profiles Manrope arrived before first paint, so `optional` **showed Manrope in 100 % of throttled runs** (Chromium/WebKit/Safari/Firefox). With Manrope held 2.5 s: fallback for the whole view in every engine (final face fallback 26/40, 29/40, 27/40, Safari 8/10, Firefox 8/10; the rest indistinguishable) |
| 3. How often is Manrope not displayed? | Tested realistic conditions: **0 %** — 0 of 1,008 non-stress `optional` runs (Playwright × 3 + official Firefox + Safari) ended on the fallback (740 named Manrope; 268 where the reference paragraph cannot tell the faces apart, all with Manrope ready before first paint or swapped in). Stress: **100 %**. Real-world frequency depends on how often Manrope arrives > ~100 ms after first render — **UNKNOWN** without field data (font served from the same origin, preloaded, 24.9 kB) |
| 4. Is the difference noticeable? | Layout: no — the calibrated fallback keeps line counts (captures: body width within 1 %, CTA 1–3 px, banner +12 px of 1,229 summed line width, same lines). Typeface: **yes to a trained eye** — body copy, CTAs, nav and banner render in Arial-like letterforms (e.g. `g`, `y`, `t`, `a`); headings (Bricolage / display face) unchanged. `captures/optional-chromium-*-side-by-side.jpg` |
| 5. Accessibility / readability / conversion UI | Arial at the calibrated size is a legible system face; colours, sizes, line heights, focus styles, a11y tree and Tab order unchanged (§10). No conversion element changes size materially |
| 6. Engine differences | Chromium: no swap after the period; FCP unchanged (44 ms both, cold). WebKit/Safari: as Chromium; **real Safari additionally downloads Manrope's latin-ext file** (`cc978ac5…`) ~140 ms after load when the latin face times out (an extra request the current build never makes) and reports the FontFace as "loaded" at the end of the block period without the file. Firefox: swaps within its window (above) |

**Spec vs behaviour:** the CSS Fonts spec describes `optional` as an extremely short block period and **no swap period**. Measured: Chromium, WebKit and
Safari match that once the period has elapsed; **Firefox paints the fallback during the period and swaps if the font arrives within it** — so the
"no movement" property does not hold in Firefox.

**Trade-off:** `optional` removes a movement that, on the tested profiles, only occurs when Manrope is artificially late, and in exchange guarantees that
whenever Manrope *is* late the visitor sees fallback typography for the whole view; it does not help Firefox, the one engine that showed swaps on normal
loads. Benefits do not outweigh the risk.

## 8. Arrow-glyph investigation

**Facts (VERIFIED):** U+2192 is not in Manrope's latin subset (which covers U+2191 and U+2193 but not U+2192), so arrows are always drawn by
`"Manrope Fallback"`. Inventory (`arrow/inventory-*.json`): **24 CTA arrows** (17 px / 700, all `aria-hidden`, DC CTAs), **31 inline link arrows**
(14 px / 400, `/privacy-policy`, `/terms`), **1** decorative 32 px / 800 arrow (`/services`). Pre-OBS-19 they were regular Arial at 103.19 % (bold synthesised).

| Arrow (advance, px) | Chromium pre → current | Firefox | WebKit |
|---|---|---|---|
| 17 px / 700 (CTA) | 17.547 → **16.844** (−0.70) | 18.067 → **16.833** (−1.23) | 17.542 → **16.830** (−0.71) |
| 14 px / 400 (links) | 14.453 → 14.453 | 14.45 → 14.45 | 15.0 → 15.0 |

**Candidate correction (built and tested as experiment A, `k6_BrnQgV-TsyoBszlobt`, not committed)** — two rules added after the calibrated faces in `app/globals.css`:

```css
@font-face { font-family: "Manrope Fallback"; src: local("Arial"), local("ArialMT"), local("Liberation Sans"), local("LiberationSans"); font-weight: 100 500; unicode-range: U+2192; size-adjust: 103.19%; ascent-override: 103.31%; descent-override: 29.07%; line-gap-override: 0%; }
@font-face { font-family: "Manrope Fallback"; src: local("Arial Bold"), local("Arial-BoldMT"), local("Liberation Sans Bold"), local("LiberationSans-Bold"); font-weight: 600 900; unicode-range: U+2192; size-adjust: 103.19%; ascent-override: 103.31%; descent-override: 29.07%; line-gap-override: 0%; }
```

| Result | |
|---|---|
| Advance restored | Chromium **17.547** (= pre), WebKit **17.542** (= pre); Firefox **17.55** (pre 18.067: Firefox's synthetic bold widened the old arrow; no descriptor reproduces it) |
| Glyph | WebKit: **pixel-identical** to pre. Chromium: real Arial Bold vs the old synthetic bold — different stroke rendering (100 of 108 ink px differ); Firefox closer than current (56 vs 148 px differ). A regular-Arial bold face (c2) renders identically to c1; restricting the bold face's range (c3) does not work (font matching never falls back across weight groups) — `arrow/candidates-*.txt`, `arrow/sheet.png` |
| Regressions | Final loaded state vs C: only arrow-bearing elements change, ≤ 1 px horizontally (40 views, `SUBPIXEL-H`); no wrap, height or position change; a11y tree, Tab order, text, headings, primes, reduced motion identical; 0 console/hydration errors; no-JS face unchanged; while Manrope is pending (stress, 3 engines) arrow-bearing CTAs behave exactly as C, fallback faces loaded at first paint |

**Recommendation: accept the documented difference; do not adopt A.** The change is safe and small, but it restores the arrow only partially (advance
in two engines, glyph in one), the arrows are decorative (`aria-hidden`), and the difference is ≤ 0.7 px (1.2 px in Firefox) — not user-visible at
normal viewing. Restoring it would add two permanent rules whose only purpose is pixel parity with a superseded rendering. If the owner wants parity in
Chromium/WebKit geometry, A is the exact, verified change.

## 9. Residual regression analysis

| Case (DEC-047 "worse") | Re-test | Classification |
|---|---|---|
| **Chromium `/blog` 768 / 1024 / 1440** (native 0.0145→0.0201, 0.009→0.0125, 0.0233→0.0321) | Reproduced exactly (deterministic, 3/3) on the **plain** build. On the **CMS-fixture** build (posts listed, as in production): 430 **0.0766 → 0.0001**, 768 0.0038 → 0.0037, 1024 0.0027 → 0.0016, 1440 0.0022 → 0.0012 — **current ≤ pre on every width** | **Measurement artefact of the empty plain `/blog`**: with no posts the footer is in view and its tagline re-wrap dominates. **Not user-facing** |
| **Firefox `/ai-seo` 430, `/faq` 430, `/faq` 768** (0 → 26/26/52 px) | Reproduced in stress (3/3): current moves `/ai-seo` 430 hero CTAs 27 px, `/faq` paragraphs 26–52 px where pre (system-ui) happened to match Manrope. **But** pre moved `/ai-seo` 768 hero CTAs and paragraphs 29–54 px above the fold where current moves nothing above the fold (stress 3/3, cold 2/5 pre vs 0/5 current); `/faq` 430 and `/ai-seo` 430 cold: 1 of 5 loads each | **Expected trade-off** of replacing an accidental system-ui match with a calibrated face; aggregate DEC-047 Firefox result (improved 9 / worse 3) stands |
| **Shared footer tagline re-wrap** | Stress: re-wraps on almost every route; above the fold only on short pages (`/blog` plain, 404) | **Expected trade-off** (per-string metric limit, DEC-047 §7.1); below the fold on content pages; zero in realistic profiles (Chromium/WebKit) |
| **Conversion-critical movement** | Stress: hero CTAs 27–29 px on `/pricing` 768, `/ai-seo` 430; realistic: `/ai-seo` 430 in Firefox cold only (27 px, within ~40 ms of first paint); banner 0 px always; form 0 px (Manrope); nav never moves vertically | **Genuine but narrow**: requires Manrope to land after first paint, which did not occur in Chromium/WebKit/Safari on any profile |
| **Official Firefox `/contact` 430 @2,500 and 768 @300** | **Now paired** (3 reps × 2 holds × 2 widths each build): pending face system-ui (before) → **calibrated** (after); **0 px** paragraph, button, heading and banner movement in both builds | **Verified PASS** (`runs/real-firefox-contact-recheck.txt`) |

### 9.4 New finding — Bricolage arrives after first paint on Slow 4G (outside DEC-047's scope)

The site heading face **Bricolage Grotesque** (41.5 kB, `next/font` automatic fallback, unchanged by `46785af`) finished **after** FCP in 80/80 Slow 4G
runs in every engine (Manrope: 0/80). Its swap moves content in a few views:

| Engine (Slow 4G) | Views with an above-the-fold move | Native (Chromium) |
|---|---|---|
| Chromium | `/contact` 430: **form fields + paragraph 37 px**; `/faq` 768/1024: paragraphs 22–24 px | **0.0285** (`/contact` 430), 0.0035 |
| WebKit | `/faq` 390/768/1024: paragraphs 22–40 px; `/blog` 390: 26 px | n/s |
| Firefox | none above the fold | n/s |

Fast 4G, cold and warm: none. Identical in C and O (VERIFIED: `runs/bricolage-late-arrival.txt`). This is the **largest realistic-profile font shift
observed**, and it concerns the heading face — OBS-19's original title includes "site Bricolage", but DEC-047 authorised Manrope only and forbade changing
Bricolage. **Recommended:** record it as a separate, non-blocking observation for a future decision (proposed below), not as a reason to keep the Manrope
work open.

## 10. Accessibility and conversion implications

- **Current implementation:** the late swap never changes the banner (0 px), never moves navigation vertically, and never moved the form through a Manrope
  swap. Hero CTAs move 27–29 px only when Manrope lands after first paint — observed realistically only in Firefox, ~15–40 ms after first paint, before a
  plausible interaction. No focus, a11y-tree or keyboard effect (DEC-047 §9; re-confirmed below).
- **`optional`:** no a11y-tree or keyboard change; the fallback is legible; readability effect limited to typeface character. Conversion UI unaffected in
  size. Real Safari makes one extra font request.
- **Arrow experiment:** decorative `aria-hidden` glyphs; no accessible-name change.
- **Regression checks (`regression/`, 207 views × Chromium/Firefox/WebKit):** a11y tree (with and without the banner) **identical 114/114**, Tab stops
  identical, primes correct, `<main>` text and headings identical, **0 console/hydration errors**; no-JavaScript face unchanged (calibrated while Manrope is
  held). Flags on `/` (an animated hero list item, 1–3 px) and one Firefox reduced-motion paragraph on `/conversion-optimization` **also occur in a
  same-build control (C vs C)** — harness/animation timing, not regressions. Screen readers: **not tested** (SR-1 – SR-5, out of scope).
- SEO metadata, analytics/consent wiring, booking and forms: neither experiment touches markup, scripts or `<head>` (CSS only); not re-run — DEC-047's
  served-head (34/34), analytics (0 diffs) and content (0 diffs) results apply to `46785af`, which is the recommended state.

## 11. Limitations and unverified cases

- **No field data / RUM; no real devices** (iOS, Android), **no Windows/Linux** (Liberation Sans fallback untested), **no Android** (no Arial: the fallback
  chain falls through to the platform sans).
- Network profiles are **synthetic** (DevTools preset numbers) on loopback **HTTP/1.1**; production protocol, TLS, CDN and server timing differ. The
  real-world probability that Manrope misses first paint is **UNKNOWN**.
- Playwright Firefox's 35 % cold pending rate was measured with three engines in parallel (CPU contention); official Firefox showed 10 % on fewer runs.
- CMS routes other than `/blog` were measured on the plain build only.
- Experiment A was tested in Playwright engines only (not in official Firefox or real Safari); experiment O in all five.
- The static weight-400 line-change percentage (≈ 3 %) was not re-measured (unchanged build).
- Native CLS exists only in Chromium; Firefox/Safari movement is geometric.
- Screen readers (SR-1 – SR-5), KD-09/KD-10: not in scope, not performed.

## 12. Decision matrix

| | **A — Accept residual, close with exception** | **B — Adopt `font-display: optional`** | **C — One targeted correction (arrow faces)** | **D — Keep OBS-19 open, non-blocking** |
|---|---|---|---|---|
| User-visible benefit | Records the verified fix (Firefox system-ui gone; banner and button re-wraps gone) as complete | Removes late-swap movement in Chromium/WebKit/Safari **only when Manrope is very late**; none on tested realistic profiles | Restores CTA arrow width (+0.7 px) in Chromium/WebKit | None |
| Remaining risk | Late-Manrope moves (≤ 29 px CTAs, stress) and brief Firefox swaps (one above-the-fold CTA case) remain | Late visitors get fallback typography for the whole view; **Firefox still swaps (slightly more often)**; Safari extra font request | Same as A plus 2 rules to maintain | Same as A |
| Design fidelity | Manrope on every tested realistic load | Lower whenever Manrope is late (frequency UNKNOWN) | Arrow closer to pre-OBS-19 (partial in Chromium glyph, Firefox advance) | Same as A |
| Accessibility | No change (verified) | No a11y change; typeface change only | No change | No change |
| Performance | No cost (net +212 B gzip, DEC-047) | Neutral FCP; Safari +1 request | +2 CSS rules | — |
| Implementation effort | Governance only | 1 line + full regression | 2 rules + regression (done once here) | Governance only |
| Regression risk | None | Low (verified), but engine-divergent behaviour | Low (verified) | None |
| Launch implications | OBS-19 no longer listed as open; residual documented as accepted exception | Changes the brand-typography guarantee | None | An open item persists without a planned action |

## 13. Recommended OBS-19 disposition

**Option A — accept the residual and close OBS-19 (Manrope) with a documented, owner-approved exception**, with two companion decisions: **do not adopt
`font-display: optional`**, and **accept the arrow-glyph difference** (do not adopt experiment A). Record the Bricolage finding (§9.4) as a **separate
new non-blocking observation** rather than keeping OBS-19 open for it.

**Reasoning:** on every tested profile in Chromium, WebKit and real Safari, Manrope is ready at first paint, so the residual never occurs; in Firefox it
occurs briefly (tens of ms after first paint), with one above-the-fold CTA case; the banner, navigation and form are stable. The remaining movement is a
stress-case property of a fallback that cannot match Manrope string by string; `optional` would trade that for fallback typography and does not fix the
engine that shows the swap. Option D adds no information or action; Option B fails its own premise in Firefox.

## 14. Exact owner approval required

1. **Approve or reject:** "OBS-19 is CLOSED for Manrope with an accepted exception: when Manrope arrives after first paint, ≈ 3 % of regular-weight
   elements may change lines; content (including hero CTAs) may move ≤ ~30 px above the fold and further below it; Chromium native ≤ 0.05 in the 2.5 s
   stress case; in Firefox this can occur on normal loads ~15–50 ms after first paint. The banner and buttons do not re-wrap."
2. **Approve or reject:** keep `font-display: swap` for Manrope (do **not** adopt `optional`).
3. **Approve or reject:** accept the U+2192 arrow difference (CTA arrows 0.7 px narrower; 1.2 px in Firefox) — **or** authorise experiment A (§8) as a separate change.
4. **Approve or reject:** register the **Bricolage late-arrival shift** (§9.4) as a new non-blocking observation (proposed **OBS-20**), with any
   remediation needing its own decision.

Until the owner decides, OBS-19 remains **OPEN** and nothing is changed in the application.

## 15. Remaining launch blockers versus non-blocking defects

| Item | Status (from the governance records; **not changed** by this gate) | Assessment here |
|---|---|---|
| **OBS-19** | OPEN | **Recommended non-blocking**: close with exception (§13) |
| Bricolage late arrival (proposed OBS-20) | not registered | Non-blocking (Slow-4G `/contact` 430 native 0.0285; no banner/CTA effect) |
| KD-09 / KD-10 | OPEN, deferred to the pre-production accessibility batch | Remain **pre-production obligations** |
| SR-1 – SR-5 | Not performed; mandatory before B5 reuse | Remain mandatory |
| E1 (real devices, Windows/Linux, real networks) | Not tested | Remains outstanding; also the main limitation of this assessment |
| OBS-1 / E6, LIVE-1, LIVE-2, KD-02 – KD-08, OBS-6, TOOL-1 | As recorded in the known-defects register §15 | Not re-assessed (out of scope) |

Not pushed, merged or deployed. B5 not started. `pixel-main.cjs` not edited.
