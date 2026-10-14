# MappedSkills UI Revamp — Gate 4 · Post-B4 Closure and OBS-18 Firefox Diagnostic

| | |
|---|---|
| **Date** | 2026-10-09 |
| **Authority** | **`DEC-044`** (owner, 2026-10-09): post-B4 remediation gate accepted with exceptions; OBS-17 and OBS-13 closed within their verified scope; OBS-18 diagnostic in real Firefox authorised before any correction; `pixel-main.cjs` correction deferred; KD-09/KD-10 deferred; SR-1 – SR-5 still mandatory; B5 not authorised. Governance and diagnostics only |
| **Status** | **Governance closure recorded. OBS-18 diagnostic complete within what this environment allows — classification D. UNVERIFIED** (§G): **no real Firefox was available**. Nothing fixed. B5 **not** authorised |
| **Evidence** | [`gate-4/obs18/evidence/`](gate-4/obs18/evidence/) (index: its `README.md`) |

---

## A. Owner decisions and baseline

**Owner decisions (`DEC-044`, OWNER REQUIREMENT, recorded as given):** A — post-B4 remediation gate accepted with documented exceptions; B — OBS-17
closed for the verified Safari/WebKit scope, iOS/real-iPhone limitation preserved; C — the eight verified OBS-13 instances closed, with no claim that
every whitespace defect site-wide is excluded; D — OBS-18 diagnostic in real Firefox before any correction; E — `pixel-main.cjs` correction deferred,
not edited; F — KD-09/KD-10 deferred to the pre-production batch, SR-1 – SR-5 mandatory before B5 reuse; G — B5 not authorised.

| | |
|---|---|
| Repository | `MappedSkills`, branch `ui-revamp`, no upstream (nothing pushed) |
| HEAD at start | **`e74b8d7`** (post-B4 docs, `DEC-043`) — verified; its parent **`0e8df27`** is the latest application commit (OBS-17 + eighth OBS-13 space) — verified. `e74b8d7` is docs-only, so the application tree at HEAD = `0e8df27` |
| Working tree at start (VERIFIED FACT) | `M next-env.d.ts` (pre-existing `.next/dev/types` path); untracked: B0/B2/B3/B4 evidence screenshot folders, `gate-4/b4/closure/` local captures, `gate-2/screenshots/app/`, `gate-4/b4/owner-review/screenshots/{chromium,firefox,webkit}/`, `gate-4/b4/MappedSkills_B4_Visual_Review.zip`. **Matches the previous report. None touched, staged, reset or overwritten** |
| Decision log | through `DEC-043` at start; **`DEC-044`** added; no earlier entry modified |
| Builds (scratch copies outside the repo, loopback only, BUILD_ID verified before every run) | **Pre-fix** `3bd76a8` → `OFrdowemH8Aj7fjLdNvqu` :4570 · **Post-fix** `0e8df27` → `w9E4P6G1vjTlgjaAF_--P` :4670 (plain builds) |
| Application, design-system, font-asset or tooling change | **None.** `pixel-main.cjs` and every file under `gate-4/qa/` untouched |

## B. Browser environment

| | |
|---|---|
| Machine / OS | Apple M2 (arm64), **macOS 15.7.3** (24G419) |
| **Real Firefox** | **NOT AVAILABLE (VERIFIED FACT).** Checked: `/Applications`, `~/Applications`, Spotlight for bundle IDs `org.mozilla.firefox` and `org.mozilla.nightly` and for `Firefox.app`, `firefox` on `PATH`, Homebrew casks. None present. Per the brief, nothing was installed and no setting was changed |
| Firefox actually used | **Playwright's managed Firefox build** — `~/Library/Caches/ms-playwright/firefox-1538/firefox/Nightly.app`, bundle ID `org.mozilla.nightlyunofficial`, version **153.0**, BuildID `20260722115600`; playwright-core 1.62.1. Built from Mozilla's **`release`** branch at `f1b6c0f8…` plus Playwright's "Juggler" patch set (`browser_patches/firefox/UPSTREAM_CONFIG.sh`, v1.62.1) |
| Its profile | A temporary automation profile with Playwright's `playwright.cfg` preferences (e.g. `privacy.trackingprotection.enabled=false`); font-loading prefs at Gecko defaults (`gfx.downloadable_fonts.fallback_delay` 3000, `…_short` 100, from `greprefs.js`); headless; zoom 100 %; device scale 1 (`isMobile`/`hasTouch` are not applied in Firefox) |
| Comparison engines | Playwright Chromium 151.0.7922.34, Playwright WebKit 26.5 (also proxies) |
| Relevant installed fonts | `Arial Bold.ttf`, `Arial Narrow.ttf`, `Arial Narrow Bold.ttf` in `/System/Library/Fonts/Supplemental` (macOS ships Arial Narrow; Windows and Linux generally do not — UNKNOWN for any given visitor) |
| Real browser available | Real **Safari 26.2** only. A real-Safari control run of the new harness posted no data and was stopped (§C.4); nothing is reported from it |

**Every Firefox measurement in this report is a Playwright Firefox measurement.** No real-Firefox result exists.

## C. Reproduction methodology

### C.1 Static inspection (no code edited)

- `components/direction-c/fonts.ts`: the display face `dcDisplay` is `next/font/local`, `display: 'swap'`, **preloaded**, `adjustFontFallback: false`;
  76,868 bytes, `Cache-Control: public, max-age=31536000, immutable` from `next start` (production headers not checked).
- `app/direction-c.css` stacks: `--dc-f-display: dcDisplay, "DC Display 96 Fallback", "Arial Narrow", system-ui, sans-serif` (hero: `"DC Display Hero
  Fallback"`; statement: `"DC Display 72 Fallback"`; `/pricing` uses `"DC Display 96 Fallback B"` from `app/direction-c-pages.css`).
- The calibrated faces are **`local()`-only** `@font-face` rules (`local("Arial Bold")`, `local("Arial-BoldMT")`, Liberation Sans Bold), `font-weight: 100 900`,
  `size-adjust` 90.5–96.4 %, ascent/descent/line-gap overrides. `.dc-title` names no calibrated face (outside this diagnostic).

### C.2 Dynamic measurement (`obs18-diagnostic.cjs`)

Per engine × route × width × condition × repetition, sampled **every animation frame for 9 s**:

- **Which face paints the H1 while the display face is pending.** The H1 is cloned in place (same tag, classes and parent → same cascade and font group)
  with `white-space: nowrap`; its width is matched (±1 px) against the same text set in the calibrated fallback, `"Arial Narrow"`, `system-ui` and the
  final face. A unique match names the face. **This is a metric inference, not a visual judgement and not a browser font-inspection API** (Firefox's
  used-font inspection is privileged and unavailable to page script). In every run exactly one reference matched.
- **Was the pending state painted?** Yes only if `first-contentful-paint` precedes the first frame with the face loaded; otherwise the fallback layout existed
  but was never presented, and its movement is not counted.
- **FontFace status** of `dcDisplay` and of the role's calibrated fallback, at the first frame and the last pending frame.
- **Movement:** H1 lines and height, largest move of a visible `<main>` element, first `.dc-actions a` (CTA) move, and the CLS **approximation** of
  `post-b4/evidence/obs17-swap.cjs`. Firefox and WebKit expose **no Layout Instability API** (`PerformanceObserver.supportedEntryTypes` recorded:
  no `layout-shift`), so no real CLS score exists for them; Chromium's real API total is recorded.

| Condition | What it is |
|---|---|
| `normal` | No hold: the preloaded face served by the loopback server as fast as it can |
| `d300`, `d2500` | Face response held 300 ms / 2,500 ms (the post-B4 sweep's condition) |
| `prime`, `normalprime` | As `d2500` / `normal`, plus a **runtime-only probe**: `FontFace.load()` on the calibrated faces as soon as they exist |
| `primecss` | As `d2500`, plus a **runtime-only, script-free** variant: four hidden spans whose first family is each calibrated face |
| `--no-intercept` | No Playwright request routing at all (external hosts fail through a dead proxy instead) — removes the automation layer from the font's path |

**Routes:** `/pricing`, `/problems/traffic-but-no-enquiries`, `/` at **320, 360, 390, 430, 768, 1024, 1440** (360 included: material in the post-B4 data);
all **10 Direction C routes** × 7 widths for `d2500`, `prime`, `primecss`. **Repetitions:** 3 for `normal`/`d300`/`d2500`/`normalprime` on the
3 key routes (Firefox), 1 elsewhere. **1,108 runs** in total (`gate-4/obs18/evidence/runs/`, summarised in `obs18-summary.txt`).

### C.3 Source and environment checks

- Gecko font matching, `gfx/thebes/gfxTextRun.cpp`, read at `main`, at the exact release revision Playwright built from, at 128 ESR and at 115 ESR
  (`gecko-font-matching-source.txt`).
- Playwright's Firefox patch set (v1.62.1): 71 files; **none under `gfx/`**; the two `layout/style/` files implement media-feature emulation.

### C.4 Real-browser harness (prepared, not run in real Firefox)

`obs18-real-browser-harness.cjs` runs the same measurement in any installed browser: a loopback proxy makes every web font cache-cold (unique token on
stylesheet and font URLs, including the RSC payload's resource hints, which otherwise re-insert an un-held copy), holds the display face server-side
and injects the same sampler. **Validated end to end with Playwright Firefox only** (it reproduced the direct result, e.g. `/` 390 at 300 ms: Arial
Narrow, 2 → 3 lines, 40 px). A real-Safari control run was opened once; it posted no result and made no requests for more than 10 minutes
(most likely frame throttling in a non-foreground window); it was stopped. **No data from it is used.**

**Disclosed method corrections:** (1) Playwright's `page.screenshot` waits for `document.fonts.ready`, so the first "pending" captures showed the post-swap state;
they were discarded and recaptured with `PW_TEST_SCREENSHOT_NO_FONTS_READY=1`. (2) An unsupported `layout-shift` observer silently reports 0; the
script reports the API only where it is supported. (3) Early sweeps ran two Firefox processes concurrently; `normal` was re-run alone and without
interception (§D.2). Delayed-face results were identical in every setting.

## D. Findings (Playwright Firefox unless stated)

### D.1 Which face paints, and the final face

| | Firefox | Chromium | WebKit |
|---|---|---|---|
| Pending face, no probe (all runs with a pending frame) | **Arial Narrow — 463 / 463** | calibrated fallback — 75 / 75 | calibrated fallback — 75 / 75 |
| Calibrated fallback FontFace at the last pending frame | **`unloaded`** (463 / 463) | `loaded` | `loaded` |
| Pending face with `prime` / `normalprime` / `primecss` | **calibrated fallback — 314 / 314** (`loaded`) | calibrated | calibrated |
| Final face | final in **1,108 / 1,108** runs (all engines) | | |
| Face blocked for good (post-B4 sweep) | calibrated fallback, 0 re-wraps | | |

### D.2 Movement at the swap

**Late face (held 300 ms or 2,500 ms) — deterministic.** Identical in every repetition (21/21 views ×3) and identical at 300 ms and 2,500 ms.

| Scope | Views moving | H1 line change | Max visible shift | Max CTA move | Views > 0.01 (approx.) | Max approx. |
|---|---|---|---|---|---|---|
| Firefox, 3 routes × 7 widths (post-fix) | 8 / 21 | 7 | 107 px | 157 px | 7 | **0.0409** |
| Firefox, 3 routes × 7 widths (**pre-fix**) | 8 / 21 | 7 | 107 px | 157 px | 7 | 0.0409 |
| Firefox, **10 routes** × 7 widths, `d2500` | **27 / 70** | 25 | 107 px | 157 px | **19** | **0.0409** |
| Firefox, 10 routes, **`prime`** | **0 / 70** | **0** | 0 | (below fold only) | 0 | 0 |
| Firefox, 10 routes, **`primecss`** | **0 / 70** | **0** | 0 | (below fold only) | 0 | 0 |
| Chromium, 3 routes, `d300`/`d2500` | 0 / 21 | 0 | 0 | 0 visible | 0 | 0 (API 0) |
| WebKit, 3 routes, `d300`/`d2500` | 2 / 21 (1 px, sub-pixel) | 0 | 1 px | 0 visible | 0 | 0 |

The 10-route figures reproduce the post-B4 sweep exactly (27 / 19 / 0.0409 / 157 px). The moving key views: `/` 390, 430, 1024; `/pricing` 360, 768, 1024;
`/problems` 320, 1024 — e.g. `/pricing` 1024: Arial Narrow sets the H1 on **2 lines**, the face on **3**; content below moves 107 px, the CTAs 57 px
(`shots/firefox-pricing-1024-d2500-pending.jpg` vs `…-final.jpg`; primed: 3 lines, no move, `…-prime-pending.jpg`).

**Normal loading (no hold, loopback) — intermittent.**

| Setting | Firefox: pending state painted | Firefox: views with an H1 re-wrap | Firefox: views moving | Chromium | WebKit |
|---|---|---|---|---|---|
| Concurrent (2 sweeps running) | 42 / 63 | 6 | 10 | face ready at first frame 21 / 21 | 21 / 21 |
| Alone | 33 / 63 | 7 | 11 | — | — |
| **Alone, no request interception** | **33 / 63** | **6** | **10** | **63 / 63 face ready at first frame** | **63 / 63** |
| Alone, no interception, **`normalprime`** | 27 / 63 (calibrated) | **0** | 2 (`/problems` 768, 1440: no H1 change) | — | — |

- In Playwright Firefox, first contentful paint precedes the display face's activation in **about half** of normal loads. The Arial Narrow state is then
  on screen for **12–53 ms (median 20 ms; at most 3 frames)** before the swap. Whether a given view does this varies run to run (same outcome in every
  repetition for only 4–10 of 21 views).
- Removing request interception changes nothing (33/63 both ways): **the automation layer is not the cause of the timing.**
- The `normalprime` control removes every H1 re-wrap; its 2 residual movers change no H1 line and are not attributed to OBS-18 (other content still
  loading). The largest normal-load approximation, `/pricing` 1024 (≈ 0.051), therefore mixes the H1 re-wrap with other arrivals; its display-only
  late-face value is 0.0409.
- Chromium and WebKit had the preloaded face ready before the first frame in every normal load, and paint the calibrated fallback whenever it is not.

**CTA moves under the probes** (Firefox, `/problems` 320–430: +35 to +90 px) happen with no visible movement (the first CTA there is far below the fold;
approximate score 0). Chromium and WebKit show −30 px at `/problems` 320, the below-the-fold `.dc-statement` re-wrap recorded in the post-B4 report. The
Firefox below-the-fold difference was **not investigated further**; it is not part of the visible OBS-18 effect.

## E. Real Firefox versus Playwright Firefox

**No comparison was possible: real Firefox was not available.** Every Firefox cell above is Playwright Firefox. No Playwright measurement has been
substituted for a real-Firefox one. What can be said about the difference between the two:

| Factor | Evidence | Bearing on real Firefox |
|---|---|---|
| Font-matching code | Playwright's patch set changes no file under `gfx/`; the rule in §F is present at the exact release revision Playwright built from | Same code path expected (WORKING HYPOTHESIS) |
| Automation request routing | No change with interception removed (§D.2) | Not a cause |
| Profile preferences | Automation profile (`playwright.cfg`); font-loading prefs at defaults | No font-relevant difference identified; a real user profile, ETP mode or font-visibility setting may differ (UNKNOWN) |
| Headless rendering, frame timing | Headless build; paint timing measured | **Unverified**: real compositor timing could change *how often* the normal-load flash is painted, not which face fills a pending period |
| Installed fonts | Arial Narrow present on this Mac | Other systems skip to the next available family (likely `system-ui`, wider than the calibrated face) — UNKNOWN in practice |
| Network | Loopback; holds simulate a slow face | Real cold-cache visits on slow connections are the realistic trigger; frequency **not measured** |

## F. Root-cause assessment

**Mechanism (VERIFIED in Gecko source; consistent with every Playwright Firefox run).** Gecko does not start loading a later `@font-face` in a
`font-family` list while an earlier one is still loading. In `gfxFontGroup::GetFirstValidFont` and `gfxFontGroup::FindFontForChar`
(`gfx/thebes/gfxTextRun.cpp`), a user font in state `STATUS_NOT_LOADED` is loaded only `if (!loading && …)`, the flag being set by an earlier family
that is loading — Gecko's comment: *"Load if not already loaded, unless we've already seen an in-progress load that is expected to satisfy this request."*
Our calibrated fallbacks are user fonts (`@font-face` with `local()` sources), not platform families. So while `dcDisplay` is loading:

1. `dcDisplay` is loading → `loading = true`;
2. `"DC Display … Fallback"` is `STATUS_NOT_LOADED` → **not loaded, skipped** (it stays `unloaded` — observed 463/463);
3. `"Arial Narrow"` is a platform family → **used** (observed by width, 463/463).

Once `dcDisplay` fails, nothing is loading, the calibrated face is loaded and used (the post-B4 "blocked for good" result). Once anything has loaded
the calibrated face first (`prime`, `primecss`), Firefox uses it during the pending period (314/314) and the H1 re-wraps disappear (0/70).
The rule is present unchanged in Firefox 115 ESR, 128 ESR, the release revision behind Playwright's build and `main`.

| Candidate | Assessment |
|---|---|
| **Firefox-specific font selection behaviour** | **Most consistent with the evidence.** Documented Gecko logic, absent in Blink and WebKit (both paint the calibrated face) |
| Fallback-font loading race | Part of it: the skip lasts exactly as long as the display face is pending; in Playwright Firefox that window is also *painted* in about half of normal loads |
| Installed local-font interaction | Determines *which* face shows (Arial Narrow here), not *whether* the calibrated face is skipped |
| Playwright Firefox environment difference | **Not supported**: no font-code patch; unchanged without interception. Headless frame timing remains an unverified variable for the normal-load frequency only |
| Broader application font configuration issue | The configuration (local()-only calibrated `@font-face` behind a loading web font) is what meets the Gecko rule; it is correct CSS and works in Blink and WebKit. Optical sizing and weight matching play no part (the probes change neither) |

**Uncertainty.** How real Firefox schedules the first paint against a preloaded face on real networks, and how many visitors receive the display face
after first paint, are **not measured** (RESEARCH REQUIRED). No Mozilla bug report describing this interaction was found in a brief search; none is cited.

## G. OBS-18 classification

### **D. UNVERIFIED**

Real Firefox was not available, so real-browser behaviour is not established, and the brief requires this classification in that case. The evidence is
**not** inconclusive about the mechanism: it is present in released Firefox source and nothing in the test environment explains it, so
**B (Playwright/environment-specific) is not supported.** The expected real-Firefox outcome — a **WORKING HYPOTHESIS**, not a finding — is
**C (condition-dependent)**: deterministic whenever the display face is still pending after first paint (late face; cold cache, slow network), not
otherwise. What is needed to settle it: §H.1.

Severity if confirmed (proxy figures): up to ≈ 0.041 approximate layout shift from one swap; above the 0.01 throttled threshold in 19 of 70 views; H1s gain a
line in 25 of 70 views; CTAs move up to 157 px; first-screen headings visibly change face and width. Firefox reports no CLS, and Chrome UX Report field
data comes from Chrome users (Google's documentation; not re-checked in this session), so the expected impact is user-facing visual instability for Firefox
visitors rather than Core Web Vitals field data.

## H. Recommended next action

**Further investigation first; no fix now.**

1. **Real-Firefox verification (owner decision):** authorise installing a current Firefox release on this Mac (or running on another machine that has one),
   then: `node docs/ui-revamp/gate-4/obs18/evidence/obs18-real-browser-harness.cjs --target <plain> --build-id <id> --port 4791 --out <file.json>`
   and open `http://127.0.0.1:4791/__obs18/?run=1` in Firefox, window in the foreground. Holds 0 / 300 / 2,500 ms, 3 key routes × 7 widths × 3 reps.
   Summarise with `obs18-summary.cjs`. Ideally repeat on Windows (no Arial Narrow) to see the next-family case.
2. **If real Firefox reproduces it**, a targeted remediation proposal for a separate owner decision (not implemented, not authorised):
   - **Preferred candidate — make the calibrated faces loaded before the display face can be pending, without script:** a few hidden, `aria-hidden`
     elements in the Direction C wrapper whose *first* family is each calibrated face. Runtime-only evaluation: **0 / 70 views moving, 0 H1 re-wraps,
     calibrated face painted 70 / 70** (`primecss`). Bytes are negligible and nothing is downloaded (`local()` only). Needs full three-engine regression
     (Chromium/WebKit should be unchanged — their behaviour already matches), accessibility checks (hidden from the tree) and real-Safari confirmation.
   - Alternative: an inline `document.fonts.load()` of the calibrated faces in `<head>` (`prime`: same result) — depends on JavaScript.
   - **Not recommended:** changing `font-display`, the calibration, the stacks' order or the type itself; each changes approved behaviour in every engine.
3. **If real Firefox does not reproduce it** under comparable conditions, reclassify per the brief (B or C) with the real-browser data.

## I. Governance closure

| Item | Status after `DEC-044` |
|---|---|
| **Post-B4 remediation gate** | Implementation **completed** (`0e8df27`); tests **passed** as reported (`GATE_4_POST_B4_REMEDIATION.md` §E); **owner accepted with exceptions** (`DEC-044` A) |
| **OBS-17** | **CLOSED for the verified scope** (`DEC-044` B). Correction: `font-optical-sizing: none` on `.dc-display` and `.dc-statement` (`app/direction-c.css`, `0e8df27`). Verified in **real Safari 26.2 (macOS 15.7.3)** — H1 swap re-wraps 16 → 0 of 70 views, final H1 lines = Chromium 70/70 — and **Playwright WebKit** — views above 0.01 8 → 0. Population: the 10 Direction C routes (`/`, `/services`, `/seo`, `/google-ads`, `/social-media-ads`, `/ai-seo`, `/lead-generation`, `/conversion-optimization`, `/pricing`, `/problems/traffic-but-no-enquiries`) at 320–1440 px. **Limitation kept: no iOS Safari, iPhone or iPad test (E1).** The closure does **not** close OBS-18 or any other font-loading observation |
| **OBS-13** | **The eight verified instances CLOSED** (`DEC-044` C): `/lead-generation` ×4, `/conversion-optimization` ×1, `/problems/traffic-but-no-enquiries` ×2 (incl. the `CauseZones` caption) — `98cfc82`; `/how-it-works` ×1 — `0e8df27`. The scan found 0 further candidates on 17 static routes; CMS-driven pages were not scanned. **No claim that every whitespace defect site-wide is excluded** |
| **OBS-18** | **OPEN — D. UNVERIFIED** (this report). Not fixed |
| **Exceptions outstanding** | iOS/real-device verification (E1); SR-1 – SR-5; KD-09/KD-10; OBS-18; `pixel-main.cjs` Chromium-only (deferred, `DEC-044` E); the other open items unchanged (E6, OBS-1, OBS-6, OBS-11, OBS-15, OBS-16, LIVE-1, LIVE-2, KD-02, KD-05, PROC-1) |
| **KD-09 / KD-10** | **OPEN, deferred** to the dedicated pre-production remediation batch (`DEC-043`, `DEC-044` F) |
| **Playwright tooling** | `pixel-main.cjs` still launches Chromium whatever `--engine` requests (line 80). **Deferred; not edited** |

Registers updated: `gate-4/b0/GATE_4_B0_KNOWN_DEFECTS.md` §12, `gate-4/qa/known-defects.json`. Historical entries and earlier evidence are unchanged.

## J. B5 status

**B5 is NOT authorised and was not started.** Manual VoiceOver/TalkBack verification **SR-1 – SR-5** (`GATE_4_B4_OWNER_CLOSURE.md` §F) remains **mandatory
before B5 reuses** the stacked pricing `DataTable`, the five-check `Sequence`, the `/problems` breadcrumb and the `NotPromised` indicators; it was not
performed in this pass. If B5 adds Direction C display headings, OBS-18 applies to them as to the current routes.

## Session handoff (`SESSION_HANDOFF_TEMPLATE.md`)

- **Session:** 2026-10-09 · Claude (Opus 5.5) · UI revamp technical lead / browser compatibility / QA / governance · post-B4 closure + OBS-18 diagnostic.
- **Context read:** `CLAUDE.md`; `CURRENT_STATE.md`; `DECISION_LOG.md` (`DEC-042`, `DEC-043`); `GATE_4_POST_B4_REMEDIATION.md`; `post-b4/evidence/README.md`,
  `firefox-swap-probe.{cjs,txt}`, `obs17-swap.cjs`, the Firefox sweep; `GATE_4_B0_KNOWN_DEFECTS.md` §10–11; `known-defects.json`; `QA_REGRESSION_RUNBOOK.md` §5.10;
  `gate-4/qa/lib.cjs`, `pixel-main.cjs` (read only); `components/direction-c/fonts.ts`; `app/direction-c.css`, `app/direction-c-pages.css` (read only).
- **Changed (docs only):** `DEC-044`; `CURRENT_STATE.md`; known-defects register §12 + JSON; runbook §5.11; this report; `gate-4/obs18/evidence/`.
- **Application / tooling changed:** none. `next-env.d.ts` not staged.
- **Tests actually run:** §C–D (1,108 Playwright runs, 3 engines, 2 builds); Gecko and Playwright source inspection. **Not run:** real Firefox (unavailable),
  real-Safari control (no data), iOS, Android, screen readers, the regression suite (no application change).
- **Stop condition honoured:** no fix, no B5, no diagram work, no tooling edit, nothing pushed, merged or deployed.
