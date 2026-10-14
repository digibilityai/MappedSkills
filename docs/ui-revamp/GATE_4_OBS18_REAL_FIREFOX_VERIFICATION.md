# MappedSkills UI Revamp — Gate 4 · OBS-18 Real Firefox Verification

| | |
|---|---|
| **Date** | 2026-10-09 |
| **Authority** | **`DEC-045`** (owner, 2026-10-09): install official Firefox Stable for diagnostics; use and extend the OBS-18 harness; test normal and delayed font loading; compare with Playwright Firefox; evaluate candidate fixes by temporary runtime-only injection; create evidence and update governance. Not authorised: application, CSS, JS or font changes; permanent browser configuration; QA-tooling edits; KD-09/KD-10; B5; deployment |
| **Status** | **Verification complete. Recommended classification: A — CONFIRMED REAL-FIREFOX DEFECT** (§G). Nothing fixed. A narrowly scoped correction is described for a **separate owner decision** (§H). B5 **not** authorised |
| **Evidence** | [`gate-4/obs18-real-firefox/evidence/`](gate-4/obs18-real-firefox/evidence/) (index: its `README.md`; all tables: `rf-summary.txt`) |

---

## A. Baseline

| | |
|---|---|
| Repository / branch | `MappedSkills`, `ui-revamp`, no upstream (nothing pushed) |
| HEAD at start | **`d9b68db`** (OBS-18 diagnostic, `DEC-044`) — verified; application commit **`0e8df27`** — verified; `d9b68db` and `e74b8d7` are docs-only, so the application tree at HEAD = `0e8df27` |
| Working tree at start | `M next-env.d.ts`; untracked B0–B4 evidence screenshot folders, `gate-2/screenshots/app/`, `gate-4/b4/owner-review/screenshots/{chromium,firefox,webkit}/`, `gate-4/b4/MappedSkills_B4_Visual_Review.zip` — as documented; **none touched, staged or removed** |
| Context read | `CURRENT_STATE.md`, `DECISION_LOG.md` (`DEC-043`, `DEC-044`), `QA_REGRESSION_RUNBOOK.md` §5.10–5.11, known-defects register §11–12, `GATE_4_OBS18_FIREFOX_DIAGNOSTIC.md`, `gate-4/obs18/evidence/` (incl. `obs18-real-browser-harness.cjs`) |
| Build | `0e8df27` plain production build, BUILD_ID `w9E4P6G1vjTlgjaAF_--P`, `next start -H 127.0.0.1` :4670; BUILD_ID verified (`_buildManifest.js` → 200) at every harness start |
| Owner authorisation | `DEC-045` (OWNER REQUIREMENT, recorded as given) |

## B. Firefox installation

| | |
|---|---|
| Pre-check | No Firefox installed (`/Applications`, Spotlight `org.mozilla.firefox`); `~/Library/Application Support/Firefox` and `~/Library/Caches/Firefox` existed and were **empty** — no personal profile |
| Source | `https://download.mozilla.org/?product=firefox-latest-ssl&os=osx&lang=en-US` → 302 → `download-installer.cdn.mozilla.net/pub/firefox/releases/157.0.1/mac/en-US/Firefox 157.0.1.dmg` (161,550,118 bytes) |
| Integrity | SHA-512 = Mozilla's `releases/157.0.1/SHA512SUMS` entry (**match**); `codesign --verify --deep --strict` valid; **Developer ID Application: Mozilla Corporation (43AQ936H96)**; `spctl`: **accepted, Notarized Developer ID** |
| Identity | **Firefox 157.0.1**, `org.mozilla.firefox`, BuildID `20261005135250`, `SourceRepository=https://hg.mozilla.org/releases/mozilla-release`, SourceStamp `737ec77d…`, update channel **`release`** (`ChannelPrefs.framework`) — the official Stable release, not Nightly/Beta/Developer Edition, not Playwright's build |
| Installation | DMG mounted read-only; `ditto` to **`/Applications/Firefox.app`** (no elevation needed; signature re-verified on the installed copy). No system or security setting changed; nothing else installed |
| Default browser | **Unchanged** (`com.google.chrome`, verified before and after) |
| Profiles | Dedicated **temporary** profiles in the session scratchpad: one for measurement, one for captures, one with JavaScript disabled. `user.js` disables only first-run pages, the default-browser prompt, telemetry/studies/Safe Browsing/connectivity pings, update and add-on activity, password saving and Sync. **No font, privacy, tracking-protection, font-visibility, zoom or rendering preference was set.** No Sync sign-in, no extension, no imported data |
| Launch | Verified: `firefox -profile <temp> -no-remote -new-instance <url>`; UA `Firefox/157.0`; `navigator.webdriver` **false** in every measured run |
| Side effects on the system | Firefox created empty `Crash Reports/`, `Pending Pings/`, `Profiles/` scaffolding under `~/Library/Application Support/Firefox` (no reports, no pings, no profile). Left in place; Firefox remains installed |
| Machine | Apple M2, macOS 15.7.3 (24G419), Retina display (`devicePixelRatio` 2), window 1280 × 742 CSS px inner |

## C. Test methodology

**Harness** (`rf-harness.cjs`, extends the unchanged `obs18-real-browser-harness.cjs`). A loopback proxy in front of the build; the browser is opened by
hand (no automation). Per load: every web font **cold** (unique token on stylesheet and font URLs, including the RSC payload's resource hints); the
display face **held** server-side for 0 / 300 / 2,500 ms; the frame's scrollbar hidden **from the first frame** so layout width = target (real macOS
Firefox shows 15 px classic scrollbars — found during the smoke test, §C.2); an injected measurement script samples **every animation frame for 9 s**.

**What is measured, and how the face is identified (§6 of the brief).**

| Layer | Measure |
|---|---|
| Requested family | Computed `font-family` of the H1 (e.g. `"dcDisplay", "DC Display 96 Fallback", "Arial Narrow", system-ui, sans-serif`) |
| Loaded faces | `document.fonts` status of `dcDisplay` and of the role's calibrated fallback, every frame |
| Font request | Server-side hold (the swap time confirms it: median 331 ms / 2,531 ms); Resource Timing recorded but **not used** (its `responseEnd` for the held face was not consistent with the hold) |
| **Selected / laid-out face** | **The H1's own laid-out lines** — `Range.getClientRects()` of its contents grouped into lines: line count + summed line widths — matched (± 1.5 px, same line count) against clones of the H1 forced into each candidate face at the H1's width (calibrated fallback, "Arial Narrow", system-ui, final). In every pending frame exactly one face matched (3 calibrated/final ties are labelled AMBIGUOUS) |
| Painted | A frame sampled at or after **first contentful paint** is treated as painted. Direct paint-level font identification is **not available** to page script (Firefox's used-font inspection is privileged); this is the stated limitation. The BiDi captures (§D.4) are the visual confirmation |
| Movement | Frame-to-frame over the **whole painted sequence**: H1 lines and height, first CTA page-y (and whether it is on screen), largest move of a visible `<main>` element, and a **geometric approximation** of layout shift (impact × distance fraction). **Not browser-native CLS**: Firefox 157 exposes no Layout Instability API (`supportedEntryTypes` recorded per run) |

**Why the measurement changed from the earlier report (disclosed).** The `obs18` scripts named the face from a freshly inserted nowrap clone and compared
only "last pending frame vs final". The smoke test showed a frame where the H1 was still laid out in Arial Narrow while a fresh clone already saw the
calibrated face (the face loaded during a later part of the same reflow). The H1 itself is therefore now the witness, and every transition is counted.

**Matrices** (`runs/`). **Real Firefox 157.0.1:** `/`, `/pricing`, `/problems/traffic-but-no-enquiries` × **320, 360, 390, 430, 768, 1024, 1440** × hold
**0 / 300 / 2,500 ms** × baseline / candidate × **3 reps** (378 runs); all **10 Direction C routes** × 7 widths × 2,500 ms × baseline / candidate (140); the
out-of-flow candidate placement × 0 / 300 ms × 2 (84). **Playwright Firefox 153** (device scale 2): the same three matrices with the same harness page.
**Playwright Chromium 151:** main matrix, 1 rep. Runs executed one sweep at a time (no competing sweeps).

**Excluded runs (disclosed).** The real-Firefox window must stay visible; when it was covered, Firefox paused animation frames. **14 runs stalled**
(no result in 20 s) and **41 runs were throttled** (hidden at the end or a ≥ 250 ms frame gap); all are excluded and listed in `rf-summary.txt`. No
Playwright run was excluded. Cache: cold for every load (first-visit case); warm-cache behaviour was not measured.

### C.2 Smoke-test corrections before the full suite

1. **Scrollbar width:** the first real-Firefox smoke run hid the scrollbar at `onload`, which waits for the held font, so pending frames laid out 15 px
   narrower (H1 343 vs 358 px). Fixed by serving the style in `<head>`; the faulty smoke data is not used.
2. **Face identification and transitions:** see above.
3. **Second Firefox launch:** a launch into an already-running profile stalled; each run now starts a fresh `-no-remote -new-instance` and closes its own PID.
4. **Screenshots:** Playwright's screenshot waits for fonts; the real-Firefox captures use WebDriver BiDi `captureScreenshot`, which does not, and each
   capture is verified against the H1's lines read at the same moment.

## D. Baseline results — official Firefox 157.0.1

### D.1 Font selection

| | Real Firefox 157.0.1 |
|---|---|
| Face laid out while the display face is pending (every painted pending frame) | **Arial Narrow — 135 / 135 runs** in the main matrix (16 normal + 61 + 58 delayed); **63 / 63** on all 10 routes |
| Calibrated fallback FontFace while pending | **`unloaded`** in every baseline run |
| Requested stack | `dcDisplay, "DC Display … Fallback", "Arial Narrow", system-ui, sans-serif` (unchanged CSS) |
| Final face | the display face in every run (dcDisplay `loaded`; H1 lines = the final reference) |
| BiDi captures, held face (§D.4) | Arial Narrow verified in 3 / 3 views (H1 lines = the Arial Narrow reference exactly, e.g. `/pricing` 1024: 2 lines, 963.1 px) |

**OBS-18 reproduces in official Firefox Stable.** While `dcDisplay` loads, Firefox does not load the `local()` calibrated fallback and lays the
display text out in the next family, **Arial Narrow**.

### D.2 Movement — 3 routes × 7 widths (real Firefox; excluded runs removed)

| Condition | Pending state painted | Views whose H1 changes lines | Views moving | Max H1 height change | Max visible CTA move | Max ≈ (single) | Views ≈ > 0.01 | Painted (median / max) | Same every rep |
|---|---|---|---|---|---|---|---|---|---|
| **Normal** (no hold, cold, loopback) | **16 / 61** | **6** | 8 | 57 px | 56 px | **0.0409** | 6 | **16 / 22 ms** | 8 / 21 |
| **300 ms** | 61 / 61 | **7** | 8 | 78 px | 78 px | **0.0409** (sum 0.0413) | **7** | 277 / 298 ms | **21 / 21** |
| **2.5 s** | 58 / 58 | **7** | 9 | 78 px | 78 px | **0.0409** | **7** | 2,477 / 2,576 ms | 20 / 21 |

- **Delayed (300 ms, 2.5 s): deterministic.** The same 7 views change H1 lines in every repetition: `/` 390, 430, 1024 (2 → 3 lines); `/pricing` 360,
  1024 (2 → 3); `/problems` 320, 1024 (3 → 4). Largest: **`/pricing` 1024 — H1 2 → 3 lines, content below +107 px, CTAs +56 px, ≈ 0.041**;
  `/` 1024 — H1 +78 px taller, CTAs +78 px (visible), ≈ 0.022.
- **Normal loading: intermittent, but real.** In **16 of 61** cold loads the Arial Narrow state was painted (first contentful paint before the face
  was ready) for **16–22 ms (one frame)**; in 9 of those the H1 then re-wrapped (6 distinct views). Which loads do this varies run to run (same outcome
  in every repetition for 8 / 21 views). In Playwright Chromium the face was ready at first paint in 21 / 21 normal loads.
- **All 10 routes, 2.5 s** (63 measured views): **27 views move, 24 change H1 lines, 19 above ≈ 0.01, max ≈ 0.0409 for one transition (summed max 0.0466 and visible CTA move 101 px, both
  `/ai-seo` 768, where the OBS-19 body-font move added to the display swap in that load)**.
- Movement occurs **after first paint** in every counted run (by definition of "painted"); the pending face is visible to the user for that time.

### D.3 Movement not caused by the display face (new observation, §I)

Some views move while the H1 does **not** change (lines and height identical): e.g. `/pricing` 1440 (+31 px, 1 of 3 normal loads), `/ai-seo` 768 (+54 px).
They occur in the **candidate** runs too, intermittently, and in Playwright Firefox in the same views; Chromium shows none. In Playwright Firefox the
mover probe ties them to the arrival of **Manrope** (the site body face): the lede and CTA move 29–54 px when Manrope loads (`runs/mover-probe.txt`). The
body stack is `"Manrope", "Manrope Fallback", system-ui, …`, and `"Manrope Fallback"` is a `next/font` **`local("Arial")` @font-face** — the same
construction as the display fallbacks. This is reported as **OBS-19** (§I), not counted as OBS-18.

### D.4 Before / during / after captures (real Firefox, `captures/`)

WebDriver BiDi on a separate temporary profile; face held 6 s; "during" at ≈ 1.2 s; "after" once loaded. Every image paired with the H1's lines read at that moment.

| View | Baseline, during | Candidate, during | After (both) |
|---|---|---|---|
| `/pricing` 1024 | **Arial Narrow**, 2 lines (963.1 px); calibrated `unloaded` | **calibrated**, 3 lines (1,078.5 px); `loaded` | final, 3 lines (1,101.5 px) |
| `/` 390 | **Arial Narrow**, 2 lines | **calibrated**, 3 lines | final, 3 lines |
| `/problems` 1024 | **Arial Narrow**, 3 lines | **calibrated**, 4 lines | final, 4 lines |

The captures show a fresh profile's consent banner (no stored consent; nothing was clicked). The "before" (blank) state is not captured: the first
paint cannot be targeted reliably by screenshot.

## E. Official Firefox versus Playwright Firefox

Same build, harness page, holds, cold cache, measurement code, viewport widths, zoom 100 %, device scale 2.

| Measure | Real Firefox 157.0.1 | Playwright Firefox 153 | Playwright Chromium 151 |
|---|---|---|---|
| 1. Pending face painted | Arial Narrow (100 % of painted pending runs) | Arial Narrow (100 %) | calibrated fallback (100 %) |
| 2. Final face | display face | display face | display face |
| 3. H1 line changes, delayed (3 routes) | 7 views, every rep | 7 views (same views) | 0 |
| 3. H1 line changes, 2.5 s, 10 routes | 24 / 63 views | 25 / 70 | — |
| 4. H1 height change (max) | 78 px | 78 px | 0 |
| 5. Visible CTA move (max), delayed | 78 px (3 routes) · 101 px (10 routes) | 78 px | 0 |
| 6. First contentful paint (median, normal) | 57 ms | 65 ms | 60 ms |
| 6. Pending state painted, normal loads | **16 / 61** | 21 / 63 | **0 / 21** |
| 7. ≈ layout shift, delayed (max; views > 0.01) | 0.0409; 7 / 21 · 19 / 63 (10 routes) | 0.0409; 7 / 21 · 19 / 70 | 0; 0 |
| 7. Layout Instability API | not supported | not supported | supported (not used for comparison) |
| 8. Reproducibility, delayed | 21 / 21 (300 ms), 20 / 21 (2.5 s) views identical every rep | 19 / 21 | 21 / 21 |
| 8. Reproducibility, normal | intermittent (8 / 21 views identical every rep) | intermittent (7 / 21) | deterministic (no pending paint) |

**The earlier Playwright findings are representative of official Firefox Stable** for font selection, geometry and severity under delayed loading.
Under normal loading both are intermittent at similar rates (here 26 % vs 33 % of cold loads painted the pending face); the exact rate depends on
timing and was measured on loopback only. Differences found: none material; real Firefox showed slightly fewer painted pending frames under normal loading
and one larger visible CTA move on the 10-route set — `/ai-seo` 768, 101 px, summed ≈ 0.0466 in a single run, where the display-face swap and the
OBS-19 body-font move (§D.3) occurred in the same load.

## F. Candidate correction — runtime only

**Candidate (`cand=inflow`, served by the test proxy only):** four hidden spans as the first children of `<body>`, each with **one calibrated face as its
first family**, so Gecko's font matching loads each `local()` face before any display text is laid out — no script:

```html
<span data-obs18-prime aria-hidden="true" style="display:block;height:0;overflow:hidden;visibility:hidden;font-weight:800;font-family:'DC Display Hero Fallback'">a</span>
… (one each for "DC Display 96 Fallback", "DC Display 72 Fallback", "DC Display 96 Fallback B")
```

### F.1 Results (real Firefox, same runs as §D)

| Condition | Pending face painted | Views whose H1 changes lines | Views ≈ > 0.01 | Max H1 height change | Max visible CTA move |
|---|---|---|---|---|---|
| Normal | **calibrated** (18 / 18 painted) | **0** (was 6) | **0** (was 6) | 0 | 31 px (`/pricing` 1440, OBS-19, H1 unchanged) |
| 300 ms | **calibrated** (62 / 62) | **0** (was 7) | **0** (was 7) | 0 | 0 |
| 2.5 s | **calibrated** (62 / 62) | **0** (was 7) | **0** (was 7) | 0 | 0 |
| 2.5 s, 10 routes | calibrated (60) / calibrated≡final (3) | **0** (was 24) | 1 (was 19) — `/ai-seo` 768 ≈ 0.018, H1 unchanged: **OBS-19** | 0 | 54 px (same view) |

| Check | Result |
|---|---|
| Correct fallback loading | Calibrated faces `loaded` from the first frame in every candidate run (real and Playwright) |
| Heading line counts / CTA positions | **Stable**: 0 H1 line changes in any candidate run, any engine, any condition; no CTA move attributable to the display face |
| Overflow / clipping | **None** (0 runs with page overflow or clipped display text, all engines) |
| Visual change | Hidden spans have 0 px height, `visibility: hidden`; layout (main top, document height, overflow) **identical** to baseline in Firefox and Chromium; final rendering unchanged |
| Accessibility tree | **Identical** to baseline (`ariaSnapshot` of `<body>`, 6 views × Firefox 153 + Chromium 151); spans inside `aria-hidden="true"`, hidden — real Firefox: present and inside `aria-hidden` in 248 / 248 measured candidate runs, visible 0, focusable 0 |
| Focus | **Never focusable** (`tabIndex` −1 in every run); first 40 Tab stops identical to baseline in both engines |
| Without JavaScript | **Works.** Real Firefox, temporary profile with `javascript.enabled=false`: page script **did not run** (checked in the page realm: 0 / 6 loads, vs 6 / 6 with JavaScript on); baseline Arial Narrow, candidate calibrated in 3 / 3 views. Playwright Firefox (`javaScriptEnabled: false`): same in 6 / 6 |
| Hydration / console | 0 console or uncaught errors in every candidate run; spans persist after React hydration (as served test markup) |
| Chromium / WebKit effect | Chromium: identical results with and without (it already uses the calibrated face). WebKit was not re-run in this gate |

### F.2 Placement matters — failures found

| Variant | Result |
|---|---|
| **Out-of-flow spans** (`position:absolute`, the earlier Playwright "primecss" probe) | **Unreliable in real Firefox**: Arial Narrow still painted first in 8 / 9 normal-load and 8 / 28 300-ms runs (Arial Narrow → calibrated → final), H1 re-wraps in up to 2 views per condition (≈ 0.018). Playwright Firefox: same pattern (10 / 42 at 300 ms). Out-of-flow boxes are laid out after the in-flow content, so the H1 can be set before the faces load |
| **In-flow spans in a wrapper `<div>`** | Effective, but React 19 rejected the injected `<div>` at hydration (minified error #418) and re-rendered — an artefact of injecting into served HTML; not pursued |
| **In-flow spans directly in `<body>`** (the candidate above) | Effective, no hydration error |

**Correction to the earlier report (`GATE_4_OBS18_FIREFOX_DIAGNOSTIC.md` §D, §H).** Its "0 / 70 views moving" for `prime`/`primecss` rested on a
measurement that could not see a first frame laid out in Arial Narrow or a pending → pending move. The out-of-flow form it recommended is not reliable;
the in-flow placement is. The earlier report is unchanged; this correction is recorded here and in the register (§13).

### F.3 Limitations

Test markup injected by a proxy, not rendered by React; a real implementation must be verified as built (hydration, ordering inside the Direction C
wrapper, every DC route). WebKit and real Safari not re-tested with the candidate. Warm cache and real networks not measured. The candidate does not
address OBS-19.

## G. OBS-18 classification

### **A. CONFIRMED REAL-FIREFOX DEFECT**

Official Firefox 157.0.1 reproduces meaningful, user-facing display-font instability, with the same mechanism, faces and geometry as Playwright Firefox:

- **Reproduction conditions:** a cold-cache visit to any Direction C route where the display face (`dcDisplay`, 76.9 KB, preloaded) is not ready at
  first paint. **Deterministic** whenever the face arrives after first paint (300 ms and 2.5 s holds: every repetition); **intermittent under normal
  local loading** (16 of 61 cold loopback loads painted the pending face; one frame, ≈ 16 ms). Real-network frequency **not measured** (RESEARCH REQUIRED).
- **Severity (geometric approximation, not browser-native CLS):** up to ≈ 0.041 from one swap; above the 0.01 threshold in 19 of 63 views on all Direction C
  routes under a late face; H1s gain a line in 24 of 63; visible CTA moves up to 101 px; the headline visibly changes face (Arial Narrow → Bricolage)
  on the first screen. Firefox only; Chromium (and, per earlier evidence, WebKit/Safari) unaffected. No Core Web Vitals field-data impact is expected
  (Chrome UX Report is Chrome-only; not re-checked in this session). Proposed severity: **medium** — first-impression visual instability, no
  functional loss.
- **Why not C:** the instability depends on timing, but the defect itself — skipping the calibrated fallback — occurs in **every** run where the face is
  pending, and it reached the screen under ordinary, un-throttled local loading.

## H. Recommendation

**Yes — propose a narrowly scoped application correction, for separate owner approval** (not authorised by `DEC-045`; not implemented):

- **Scope:** render four hidden priming elements, one per calibrated face (`DC Display Hero Fallback`, `DC Display 96 Fallback`, `DC Display 72 Fallback`,
  `DC Display 96 Fallback B`), **in flow, before the page content**, from the Direction C page wrapper (so only the 10 Direction C routes carry them and
  React renders them — no hydration mismatch): `aria-hidden="true"`, `display:block; height:0; overflow:hidden; visibility:hidden`, one character each,
  `font-weight: 800`. No change to fonts, stacks, calibration, sizes, typography or motion. **Not** the out-of-flow form.
- **Acceptance for that batch:** real Firefox (this harness) — 0 H1 line changes under 0 / 300 / 2,500 ms on all 10 routes × 7 widths; Chromium,
  Playwright WebKit and **real Safari** unchanged (rendering, `<main>` pixels, swap behaviour); accessibility tree and Tab order identical; no
  hydration error; the full regression suite (`QA_REGRESSION_RUNBOOK.md` §5).
- **Separately:** OBS-19 (site body/heading fonts) needs its own measurement and decision; the same priming idea may apply to `Manrope Fallback` /
  `Bricolage Grotesque Fallback` but is **not evaluated**.

## I. Remaining quality gates

| Item | Status |
|---|---|
| **OBS-18** | **OPEN — classification A recommended.** Not fixed. Correction requires a separate owner decision |
| **OBS-19 (new)** | **OPEN, new observation.** In Firefox, the `next/font` fallbacks of the site faces (`"Manrope Fallback"`, `"Bricolage Grotesque Fallback"`: `local("Arial")` @font-face) are subject to the same Gecko rule; Playwright Firefox ties lede/CTA moves of 29–54 px to Manrope's arrival; real Firefox shows non-H1 moves in the same views (≤ ≈ 0.018; attribution in real Firefox not separately verified); Chromium none. Affects every route that uses the site fonts. RESEARCH REQUIRED; owner decision |
| **OBS-17** | CLOSED (verified Safari/WebKit scope; iOS untested) — unchanged |
| **OBS-13** | CLOSED (the eight verified instances) — unchanged |
| **KD-09 / KD-10** | **OPEN, deferred** to the dedicated pre-production accessibility batch — unchanged |
| **SR-1 – SR-5** | **Not performed; mandatory before B5 reuses** the stacked pricing `DataTable`, `Sequence`, the `/problems` breadcrumb and `NotPromised` |
| **TOOL-1** (`pixel-main.cjs` Chromium-only) | **Deferred; not edited** |
| Measurement tooling | The `obs18` evidence scripts are unchanged; their clone-based face naming and last-pending-vs-final comparison are superseded for transitions by `obs18-real-firefox/evidence/rf-analyse.cjs` (runbook §5.12) |

## J. B5 status

**B5 is NOT authorised and was not started.** SR-1 – SR-5 remain a prerequisite for component reuse. If B5 adds Direction C display headings, OBS-18
applies to them until a correction is approved.

## Session handoff (`SESSION_HANDOFF_TEMPLATE.md`)

- **Session:** 2026-10-09 · Claude (Opus 5.5) · browser compatibility / frontend performance / QA / governance · OBS-18 real-Firefox verification gate.
- **Installed:** official Firefox 157.0.1 at `/Applications/Firefox.app` (verified signature, notarisation, checksum). Default browser unchanged. Temporary profiles only.
- **Changed (docs/evidence only):** `DEC-045`; `CURRENT_STATE.md`; known-defects register §13 + JSON; runbook §5.12; this report; `gate-4/obs18-real-firefox/evidence/`.
- **Application / tooling changed:** none. `pixel-main.cjs` and `gate-4/qa/` untouched; `obs18` evidence scripts untouched. `next-env.d.ts` not staged.
- **Tests actually run:** §C–F — real Firefox 157.0.1 (602 harness runs, of which 55 excluded as stalled/throttled; 24 BiDi captures), Playwright Firefox 153
  (602 runs), Playwright Chromium 151 (126 runs), candidate side checks (Firefox + Chromium), mover probe. **Not run:** real Safari/WebKit with the
  candidate, iOS, Android, Windows Firefox (no Arial Narrow there), real networks, warm cache, screen readers, the regression suite (no application change).
- **Stop condition honoured:** no fix, no B5, no diagram work, no tooling edit, nothing pushed, merged or deployed.
