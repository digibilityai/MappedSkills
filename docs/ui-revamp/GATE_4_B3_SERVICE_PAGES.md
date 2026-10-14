# MappedSkills UI Revamp — Gate 4 · B3: Capability Service Pages

| | |
|---|---|
| **Date** | 2026-10-09 |
| **Authority** | **`DEC-040`**: B3 only (`/ai-seo`, `/lead-generation`, `/conversion-optimization` bodies; `Figure`, `DataTable`, `ScopeRows numbered`); local implementation, validation and local commits only; no push, merge, LAN preview, staging or production |
| **Status** | **COMPLETE WITH EXCEPTIONS** (§13). Every mandatory B3 check passes on the final build. The exceptions are open programme items (E1, E6 …), declared inherited figure exceptions and recorded pre-existing observations, not B3 defects |
| **Starting point** | `ui-revamp` @ `364cf6c` (verified; no B3 commit existed). Working tree before the checkpoint: the five B3 application files, `next-env.d.ts` (unrelated, untouched, excluded) and screenshot collections from earlier batches (excluded) |
| **Builds** | Scratch copies outside the repository, loopback only (`-H 127.0.0.1`). **Before** (`364cf6c`): plain `Py3CGLJIzv5Nqe0pkEVWl` :3950 · fixture `HW9ANeHVkQKSQ0wAS7522` :3960 · placeholder-GTM `2qIwxeSjmIrHVABGJz_93` :3951. **After (final)**: plain `5CipnBQ_3fxL_82pIV6f8` :3970 · fixture `BMD9DWH6JnpSfjyEXFLpR` :3980 · placeholder-GTM `-jLeEVXF35I97BSVREiO7` :3971. Each port was confirmed to serve its own BUILD_ID (`/_next/static/<id>/_buildManifest.js` → 200) and the after-build sources are byte-equal to the working tree (all 5 files) |
| **Evidence** | [`gate-4/b3/evidence/`](gate-4/b3/evidence/): [`EXPECTED_CHANGES.md`](gate-4/b3/evidence/EXPECTED_CHANGES.md) (declared before the final comparison) · `baseline/` (pre-B3 same-session records) · `run/` (all results) · [`visual/index.html`](gate-4/b3/evidence/visual/index.html) |
| **Sessions** | Implementation and most of the suite ran in a first session (2026-10-09 ~04:20–05:45Z); this session resumed it, verified the environment, completed the interrupted and outstanding runs, and checkpointed. Nothing was re-implemented |

## 1. Implementation summary

The three bodies are recomposed from the Direction C primitives (as `/seo` and the B2 routes), plus the three B3 primitives
planned in `GATE_4_DESIGN_SYSTEM_ARCHITECTURE.md` and `GATE_4_IMPLEMENTATION_SEQUENCE.md`. Copy is carried verbatim; the frozen
move order of each page is unchanged (the long header comments in each `page.tsx` are kept and a B3 note is added).

| Route | Frozen order (kept) | Direction C composition |
|---|---|---|
| `/ai-seo` | confirm → problem → work → **evidence before the boundary** → boundary → measurement → objections → close | split opener · situation with the share-figure refusal as an always-open limit · work as scope rows on paper, the training/retrieval crawler pair as a **`Figure`** · evidence statement, then the four layers as a **`DataTable`** (stacked rows below 600px instead of a horizontally scrolling table) · owned statement + `NotPromised` · measurement with its limit beside it · questions · tangerine close |
| `/lead-generation` | confirm → problem → **definition before the boundary** (F1 STATE) → boundary → objections → close | opener · the two versions set side by side · the five conditions as **`ScopeRows numbered`** (the production ordinal), `ChainTerminus` reused unchanged, "does not judge / does not count" as two open-marked columns · owned statement + `NotPromised` · `TLink` · questions · close |
| `/conversion-optimization` | confirm → **routes down, prominent** → four zones (second move) → work → experimentation boundary → evidence → close (no objections section, by design) | opener · brief + the route down as a full-width band link (`.dc-route`; same element, text and destination) · `ChainLossZones` reused unchanged · work as scope rows · owned statement on paper · own-site evidence · close |

**Display fallback.** `/lead-generation` and `/conversion-optimization` opt into the **existing** B2 calibration `dc-fallback-b` (92%)
through `<DcPage className="dc-fallback-b">`; `/ai-seo` keeps the approved 90.5%. Decided from measurement before the declaration
(`run/fallback-sweep.txt`; with 90.5% the development build measured 0.008 @1024 and **0.017 @320**). No new fallback value was added;
the `@font-face` and `.dc-fallback-b` rules are unchanged from B2 (only their comment changed).

## 2. Exact application files changed

| File | Change |
|---|---|
| `app/(pages)/ai-seo/page.tsx` | Body recomposed (imports, JSX); F3 layers and crawler mapping text carried verbatim from `components/commercial/AiLayers.tsx` (that file untouched). `metadata` unchanged |
| `app/(pages)/lead-generation/page.tsx` | Body recomposed; `DcPage className="dc-fallback-b"`. `metadata` and `CONDITIONS`/`QUESTIONS` copy unchanged |
| `app/(pages)/conversion-optimization/page.tsx` | Body recomposed; `DcPage className="dc-fallback-b"`. `metadata` unchanged |
| `components/direction-c/primitives.tsx` | `ScopeRows` gains optional `numbered` (default `false`: output byte-identical); new exports `Figure`, `DataTable` (+ type `DataRow`) |
| `app/direction-c-pages.css` | Additive, opt-in rules only (`.dc-numbered`, `.dc-ord`, `.dc-fig*`, `.dc-flag`, `.dc-table*`, `.dc-lists`, `.dc-tokens`, `.dc-pair`, `.dc-fit-body`, `.dc-route*`); the B2 fallback comment extended. No selector matches an element outside the three routes (proved by §5: 62/68 `<main>` hashes and 34/34 served heads identical) |

**Not changed:** `/`, `/services`, `/seo`, `/google-ads`, `/social-media-ads`; `SiteHeader`/`SiteFooter`/`nav.ts`/`ChromeSwitch`; `lib/consent.ts`,
`lib/gtm.tsx`, `lib/analytics.ts`; `ContactForm`, `BookingLink`; metadata helpers; `components/commercial/*` (legacy components remain for
other routes); dependencies; `next-env.d.ts` (its pre-existing modification is unrelated and excluded from both commits).
**QA tooling added (docs only):** `gate-4/qa/{b3-visual-captures,dom-dependency,fallback-sweep,figure-text,datatable-a11y,accessible-names}.cjs`.

## 3. Shared primitives review

| Check | Result |
|---|---|
| Existing consumers unchanged | `ScopeRows` is used by `/services`, `/seo`, `/google-ads` without `numbered`: their served HTML, inventory and masked `<main>` pixels are identical (§5). `Figure`/`DataTable` have no other consumer |
| `ScopeRows numbered` | The ordinal is a separate `<i class="dc-ord">` before the lead (as in production), so text and reading order are unchanged (inventory `text-main` identical on `/lead-generation`); 12.8px, `tabular-nums`; order only, never a score |
| `Figure` | `<figure>` + visible `<figcaption>` (label role) + the object + notes. The inherited SVG chain figures carry their own `<figure>`/caption and are **not** wrapped (no nested figures), as on `/seo` |
| `DataTable` semantics (`run/datatable-*.txt`) | `<caption>` (visually hidden; it names the table), 3 `th[scope=col]`, 4 rows each with `th[scope=row]` + 2 cells; explicit table roles keep the semantics once rows stack. Chromium's **own accessibility tree** (CDP): table named by the caption, 3 columnheaders, 4 rowheaders, 8 cells whose names equal their content — **0 doubled column labels** |
| Stacked labels not announced twice | `td::before { content: attr(data-label) / "" }` — the alt-text form was **accepted in Chromium, WebKit and Firefox** (computed `"The question" / ""`, resp. `attr(data-label) / ""`). The plain `attr()` fallback line only applies in engines without alt-text support (not observed) |
| 320px, 200%, 400% | 8 views per engine (320, 390, 599, 600, 768, 1440, 1440@200%, 1280@400%): **0 page scroll, 0 overflow, 0 scroll regions, 0 focusable elements**, also under WCAG 1.4.12 text spacing — **0 failures × 3 engines**. Rows stack below 600px; header row visible from 600px |
| Keyboard / screen reader | Nothing in the table is focusable and there is no scroll region, so there is nothing to reach by keyboard (the KD-04 failure mode is gone). Real screen readers (VoiceOver/NVDA/TalkBack) **not available — E1** |
| Small text | New HTML text is never below 12.48px (the label role) at any width (`figure-text-after.txt`, `route-a11y-motion-*.txt` R1). Inherited SVG figure text: §6 |
| Layout shift | §7: CLS 0.000 in all 63 runs |

**Deviation from the plan, recorded:** `GATE_4_DESIGN_SYSTEM_ARCHITECTURE.md` lists `Figure` as the frame for the inherited SVG figures with
"figure text never below 12px at 320px". B3 reuses `ChainTerminus`/`ChainLossZones` unchanged and unwrapped (no redraw, no nested figure), so
their text stays below 12px at 320/360 (§6). This was declared in `EXPECTED_CHANGES.md`; the small-text floor (E1-a **R-3**) is still an
owner decision and is **not** made by B3.

## 4. Content, commercial and SEO parity

Baselines: `gate-4/b2/evidence/run/` (record) and same-session inventories of the pre-B3 build (`run/inventory-before.json`).

| Check | Result |
|---|---|
| Inventory, pre-B3 build vs B3, **no facet ignored**, quiescent (`inventory-diff-vs-before-quiescent.txt`) | **845 identical · 5 differences, all declared**: `/lead-generation` tertiary link `innerText` gains the `aria-hidden` `TLink` arrow (`text-main`, `links-main`); `dcMotion` 0 → 1 on each route (the shared close reveal) |
| Same, during the loaded suite run / vs the B2 record | The same 5 + 12 differences on four **dynamic not-found** pages (title/robots/canonical, live DOM): **OBS-6**, pre-existing; those pages import no B3 code and serve identical HTML (34/34 below) |
| Headings, H1, visible text and order, CTAs (text + `href`), buttons, forms | Identical |
| Accessible names (`accessible-names-*.txt`, Chromium/WebKit/Firefox @1440, Chromium @390) | **Heading (incl. level), link, button, form-control and img names identical, same order**, all three routes. Added: sections exposed as named `region`s (6 / 4 / 5), as on `/seo` |
| Served `<head>` + JSON-LD (`served-head.txt`) | **34/34 identical** (status, title, meta, canonical, `BreadcrumbList`, Organization) |
| Metadata / canonicals | `createMetadata(...)` calls unchanged in source; served values identical |
| Copy authority | Unchanged; the blocked `/ai-seo` objection and `/conversion-optimization` proof link still render nothing |

**OBS-13 (new record, pre-existing, not fixed):** on `/lead-generation` (4 places) and `/conversion-optimization` (1) the space after a
bold run is missing in the rendered text ("the work.Fit", "came from.An", "wrong ones— job", "deleted— and", "threshold:research"). The
served HTML is **byte-identical before and after B3** (`run/bold-whitespace-obs13.txt`). Source has an ordinary space; across all 9 bold
runs on the three routes the space is lost exactly when the following JSX text spans a newline and contains an HTML entity
(`&mdash;`) — WORKING HYPOTHESIS (compiler whitespace handling). Fixing it changes visible text, so it needs its own approval.

## 5. Analytics, consent and regression (site-wide)

| Check | Result |
|---|---|
| Analytics and forms (`analytics-compare-vs-b2.txt`) | **0 differing sections** (consent states, `page_view` walk, BookingLink `meeting_started`, ContactForm contract and mocked outcomes) |
| Personal data | The four typed test values and any e-mail-like string: **0 occurrences** in `analytics-forms.json` and in the E6 probe output; E6 **I6** PASS in 3 engines |
| E6 probe + R1 invariants, B3 vs pre-B3 build (`e6-probe/`) | **I1–I9 9/9 in Chromium, WebKit and Firefox** (Firefox completed this session; the earlier Firefox attempt was killed with its parent task, `before-firefox.log` of that attempt superseded). R1 residual unchanged |
| Navigation (`nav-*.txt`, B1 chrome checks) | **560 checks, 0 findings** × 3 engines; scroll restored 68/68 |
| Chrome consistency (`--expect-dc all`) | 0 failures |
| Layout — classified vs B2 | Chromium / WebKit: **NEW 0 · RESOLVED 8 · KNOWN 524**. Firefox: **NEW 1 · RESOLVED 9 · KNOWN 524** (below) |
| A11y — classified vs B2 | **NEW 0 · RESOLVED 1** (KD-04 axe) · KNOWN 30 / 13 / 13 |
| `<main>` pixels, chrome masked, vs B2 hashes | **62/68 identical**; the 6 changed = the three B3 routes × 390/1440 (declared). `/`, `/services`, `/seo`, `/google-ads`, `/social-media-ads` (B2 unchanged-route check) identical |
| Gate 2 `app-checks.cjs` / Gate 3 `acceptance-checks.cjs` / `chrome-nav.cjs` | **192/192** / **261 PASS · 0 FAIL · 3 NOTE** (the known Services-submenu forced-colours notes) / **0 console errors** |
| Static gates (`static-gates.txt`) | typecheck exit 0 · `eslint .` exit 0 · **unit tests 30/30** · three production builds compile · **`build:cpanel` exit 0** (1 worker, 512 MB cap, 27/27 static pages, BUILD_ID `s1usTC2CgtXI0WVzslMiv`) · **`verify:build` OK** · `verify:cpanel` OK |
| Bytes (`bytes.txt`) | B3 routes: HTML gz 20.7→18.0 / 20.4→18.3 / 18.2→16.5 KB; CSS gz 31.7→37.6 KB (they now load the Direction C page stylesheet); JS +1.1 KB raw; font preloads 2→3 (64→139 KB, the opsz display face — **declared**). Other DC routes: CSS gz 37.0→**37.6** KB (the new opt-in rules); HTML, JS, fonts unchanged |

**Firefox NEW 1 — not B3, with baseline evidence:** `headings|blog-slug~not-found|1024|h1-count` (0 visible h1 on the client-rendered dynamic 404).
The **B2 baseline of record contains the same finding at 768** (`b2/evidence/run/layout-firefox.json`; B1 has none), the application is
byte-identical between `63df52a` and `364cf6c`, the page imports no Direction C code and its served HTML differs only by BUILD_ID. Controls:
0/12 targeted runs (6 pre-B3, 6 B3) and 0/4 full 34-target Firefox runs reproduced it (`firefox-h1-control.txt`). Render-timing flake, OBS-6 family (as in B2).

## 6. Accessibility and motion

`route-a11y-motion.cjs` on the three routes with `/seo` as control, Chromium/WebKit/Firefox (`run/route-a11y-motion-*.txt`; pre-B3 record in `baseline/`):

| Check | `/ai-seo` | `/lead-generation` | `/conversion-optimization` |
|---|---|---|---|
| Heading hierarchy (no skipped level; identical to pre-B3 in 3 engines) | H1 → 7 × H2 (incl. the close label), 2 × H3 under "What the work involves" (crawler pair) = 10 | H1 → 5 × H2, 2 × H3 under the definition = 8 | H1 → 6 × H2 = 7 |
| Full-page Tab walk 390 / 1440 / 1440@200% | 44 / 51 / 45 stops, 13 in `<main>`, **0 bad**, order = DOM | 47 / 54 / 48, 16, **0 bad** | 44 / 51 / 45, 13, **0 bad** |
| Full forced-colours walk (Chromium) | 0 stops lose the outline | 0 | 0 |
| Touch targets, text spacing, 200%/400% reflow (layout harness, 7 widths, 3 engines) | 0 findings | only KD-05 `contained:text` @320/360/390 (inherited SVG, declared) | same as `/lead-generation` |
| Motion | 1 target (shared close reveal), **0 text in a pre-state**, 0 `.dc-pre` after scroll | same | same |
| Reduced motion / no-JS | 0 pre-state, no transition >10ms / every scope row open, nothing missing | same | same |
| Print | 0 pre-state; marks visible once settled; opacity at `beforeprint` 0 (Chromium/WebKit) / 1 (Firefox) = **OBS-9**, identical on `/seo` | same | same |
| 320px | no page scroll; smallest text **12.48px** (label) | HTML 12.48px; inherited SVG text (below) | same |

- **Exit status:** each engine run exits 1 for one reason only: the **`/seo` control's known OBS-8** (11.52px horizon-plate terms), declared in `EXPECTED_CHANGES.md`. No B3 route fails.
- **Focus outline at 200% (Chromium):** one walk recorded a second outline colour (`oklab(… / 0.5)`). Measured: links have a 150ms colour transition that includes `outline-color`; the outline settles to solid 3px ink within 150ms, identically on `/seo` and `/google-ads` (`focus-outline-transition.txt`). Shared approved CSS, not B3.
- **Inherited SVG figure text (`figure-text-*.txt`):** `ChainTerminus`/`ChainLossZones` smallest rendered text 10.47px @320 and 11.93px @360 (before: 10.33 / 11.78 — the wider column makes it slightly larger); ≥12px from 390. X5/KD-05 class, declared, R-3 pending. **HTML minimum** moves from 12.8px (`/ai-seo`) and 13.12px (`/conversion-optimization`) to the Direction C label size 12.48px.
- **OBS-14 (new record, pre-existing):** in the inherited `ChainTerminus` SVG at ≤390px the label "no usable trail — it still counts" is crossed by the figure's own spine; identical in the before capture (`visual/before|after/lead-generation-390-2-mid-a.jpg`). Not changed (no redraw in B3).
- **Landmarks:** breadcrumb `nav` + 6 / 4 / 5 named regions. No-JS paragraph count +1 on `/ai-seo` and `/lead-generation`: the shared `NotPromised` label "we do not promise" is a `<p>` (as on `/services` and B2); text unchanged.

### KD-04 on `/ai-seo` — resolved on the branch (original failing checks now pass)

| Original failing check (KD-04 reproduce/acceptance) | Pre-B3 | B3 |
|---|---|---|
| `layout.cjs` `overflow …contained:table.w-full.min-w-[600px]` @320/360/390/430 | present, 3 engines | **RESOLVED**, 3 engines (`classify-layout-*.txt`) |
| `text-spacing …contained:table…` @320/360/390; `zoom400` @320 | present | **RESOLVED**, 3 engines |
| axe `scrollable-region-focusable` @390 | present | **RESOLVED**, 3 engines (`classify-a11y-*.txt`) |
| Acceptance: "no contained overflow at 320px (stacked rows), or a focusable labelled scroll region" | `datatable-before-chromium.txt`: 1 scroll region at 320–600px and 1280@400%, 0 focusable → the defect | `datatable-*.txt`: **0 scroll regions, 0 overflow at every width, also under text spacing**, 3 engines |

KD-04 stays **OPEN** for `/pricing` (B4) and the blog/portfolio rich-text tables (B8/B9). Real assistive technology was not used (E1).

## 7. Responsive and CLS

All 7 widths in three engines: no page-level horizontal scroll, no new overflow or sticky element (layout harness). 320/360 reviewed
separately on full-page captures (`visual/narrow/`, `run/narrow-320-360.txt`: scrollWidth = clientWidth on all six): no overflow;
typography and spacing follow the `/seo` and B2 patterns; the only defects seen are the inherited OBS-14 and SVG text size above.

**Throttled CLS, final** (`run/cls-throttled.txt`; 400ms RTT, 50 kB/s, 4× CPU, 3 fresh runs per cell, run alone; after-plain `5CipnBQ_3fxL_82pIV6f8`):

| Route | 320 | 360 | 390 | 430 | 768 | 1024 | 1440 |
|---|---|---|---|---|---|---|---|
| `/ai-seo` (90.5%) | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 |
| `/lead-generation` (92%) | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 |
| `/conversion-optimization` (92%) | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 |

**63/63 runs at 0.000** (target ≤ 0.01). LCP 3.66–3.81s under this profile; the opsz face completes at 7.5–7.7s. The 92% fallback fixes the
two headings that failed with 90.5% (0.017 @320, 0.008 @1024). The fallback remains opt-in: the approved routes keep 90.5% and their
served HTML and `<main>` pixels are identical.
**Invalid measurement, not used:** a development run labelled `b3-dev` was measured against a stale server; it is kept as
`run/cls-INVALID-stale-server.txt`, marked invalid. `run/cls-throttled-dev-default-fallback.txt` is a development measurement (90.5% on all
three routes) used only to choose the fallback, not acceptance evidence.

## 8. Motion

Parity with `/seo` and B2; nothing new: one L2 reveal target per route (the shared `Close` marks), graphic marks only, no text in a pre-state,
none under reduced motion, without JS or in print; L1 transitions only (button mark, `TLink` arrow, inline-link underline, scope-row
plus/minus, `.dc-route` underline colour, 180ms tokens). No library, no layout-property animation, nothing looping. OBS-9 (print release)
and OBS-10 (homepage pre-state) are unchanged and not touched.

## 9. Visual comparison

[`gate-4/b3/evidence/visual/index.html`](gate-4/b3/evidence/visual/index.html): each route before / after / reference (`/seo`, `/google-ads`,
`/social-media-ads`) at 390, 768 and 1440 — first screen, two middle sections (scrolled to the same heading text in both builds), and the
close → footer transition — plus full-page 320 and 360 captures of the after build. 102 JPEGs (7.2 MB); **96 linked images, all present**
(the 18 "—" cells are the reference column's middle sections, which are intentionally not captured).

Reproduce (Chromium proxy, consent denied, reduced motion, fonts loaded):
```
node docs/ui-revamp/gate-4/qa/b3-visual-captures.cjs capture --label before --base <pre-B3 plain url> --out <dir>
node docs/ui-revamp/gate-4/qa/b3-visual-captures.cjs capture --label after  --base <B3 plain url> --out <dir>
node docs/ui-revamp/gate-4/qa/b3-visual-captures.cjs capture --label ref    --base <B3 plain url> --out <dir>
node docs/ui-revamp/gate-4/qa/b3-visual-captures.cjs capture --label narrow --base <B3 plain url> --out <dir>
node docs/ui-revamp/gate-4/qa/b3-visual-captures.cjs page --out <dir>
```
The capture script is committed beside the images (addresses PROC-E1A-1 for B3). Owner review is required.

## 10. E6 — GTM DOM dependency inventory (`run/gtm-dom-dependency-inventory.txt`)

| Route | Changes a published container could depend on |
|---|---|
| all three | every body class replaced (176 / 154 / 135 legacy utilities → Direction C classes); new section IDs `dc-ai-*`, `dc-lg-*`, `dc-co-*` (the four `f-term-*` / `f-zone-*` SVG IDs are kept); `<section>` count 8→7, 6→5, 7→6 (the hero is now a `div`); each CTA anchor now contains an empty `aria-hidden` `span.dc-mk`; `data-dc-motion` added; no `data-*` tracking hooks existed or were added (OBS-5) |
| `/ai-seo` | the four-layer table's cells gain `data-label` (presentation) |
| `/lead-generation` — **Click Text** | link to `/how-it-works`: previous text "The method, including what cannot be attributed"; new text "The method, including what cannot be attributed→" (`innerText` gains the `aria-hidden` arrow span). **Accessible name unchanged** · **destination unchanged** (`/how-it-works`) · **application event payloads unchanged** (no application event reads link text; analytics 0 diffs) |
| `/conversion-optimization` | the route-down link to `/problems/traffic-but-no-enquiries` is now `a.dc-route` with `span.dc-route-h` / `span.dc-route-d` (text and `href` unchanged) |

**At risk only if the published container uses them:** Click Classes / Click ID / Click Element selectors on these bodies, an exact
Click Text match on the `/lead-generation` tertiary link, or All Elements triggers (the clicked node may now be a child span). **Real GTM
compatibility is NOT claimed:** the container has not been inspected (E6, blocked by access). No GTM or consent code was changed.

## 11. E1 limitations

**E1 is OPEN. Nothing in B3 was tested on a real device or with assistive technology.** Engine results (Playwright Chromium/WebKit/Firefox)
are proxies. Needs physical verification: the display fallback on Android (no Arial/Liberation: R-5) and iOS H1 wrapping (OBS-11) on all three
new H1s; the stacked `DataTable` with VoiceOver (iOS/macOS), TalkBack and NVDA (table navigation, header association after stacking,
label not announced twice); Windows High Contrast on the new `.dc-route` band and the table rules; OS larger-text on the numbered rows;
real print (OBS-9). E1 remains a hard gate before staging (`DEC-036`).

## 12. Observations

| ID | Status |
|---|---|
| **OBS-13 (new record, pre-existing)** | Missing space after 5 bold runs (§4). Not fixed (`DEC-040`); owner approval needed for a text change |
| **OBS-14 (new record, pre-existing)** | `ChainTerminus` label crossed by its spine at ≤390 (§6). Inherited figure; redraw is a separate decision |
| Focus outline transition | 150ms `outline-color` transition on links (shared, approved CSS); settles to solid; note only |
| KD-04 | **Resolved on the branch for `/ai-seo`** (§6); OPEN elsewhere |
| KD-05 / X5 | Unchanged on `/lead-generation` and `/conversion-optimization` (inherited SVG figures); R-3 owner decision pending |
| OBS-6, OBS-8, OBS-9 | Re-observed, pre-existing, unchanged |

## 13. Outstanding risks and status

**B3: COMPLETE WITH EXCEPTIONS.** Every mandatory check passes on the final build; the only failures in any run are pre-existing controls
or harness artefacts, each proven with baseline evidence (OBS-8 control, Firefox dynamic-404 flake, OBS-6), and two bugs in this batch's new
probes, fixed and re-run: the DataTable probe counted visually hidden 1px boxes as overflow (corrected: 0 failures × 3 engines), and the
accessible-names comparator skipped YAML-quoted snapshot lines, so the `/ai-seo` H1 was first not compared (corrected: all headings incl. H1 identical × 3 engines).

| Item | State |
|---|---|
| **E1** | OPEN — §11 |
| **E6** | OPEN — container access; §10 added to its scope |
| OBS-1, OBS-6 | OPEN, unchanged |
| LIVE-1, LIVE-2, KD-02 (body), PROC-1 | OPEN, unchanged. Production untouched |
| R-3 (small-text floor) | Not decided; inherited SVG text below 12px at 320/360 on two B3 routes |
| G4-3 (fallback calibration) | Two values now cover five service pages; every later route must still be swept |

## 14. B4 entry recommendation

**Ready for owner approval after review**, not started. Before or with the B4 instruction: (1) review [`visual/index.html`](gate-4/b3/evidence/visual/index.html);
(2) decide R-3 (B4's `/pricing` uses `DataTable` and more figure text); (3) ideally run the E1 Android/iOS font check (B3 adds three more
pages depending on the fallbacks) and a VoiceOver pass on the `/ai-seo` table, since `DataTable` is reused on `/pricing`; (4) decide whether
OBS-13 is fixed in its own change. Use `gate-4/b3/evidence/run/` as the baseline of record for B4.

## 15. Rollback

`git revert 2097104` (the B3 application commit) restores the three legacy bodies; the legacy components were never removed and the CSS and primitive
changes are additive and opt-in. Chrome, consent and analytics are untouched.

## 16. Session handoff (`SESSION_HANDOFF_TEMPLATE.md`)

- **Session:** 2026-10-09 · Claude (Opus 5.5) · Principal Frontend Architect / Accessibility QA / Analytics Verification / Release QA · Gate 4 B3 final validation.
- **Context read:** `CLAUDE.md`; `CONTEXT_INDEX.md`; `CURRENT_STATE.md` (Gate 4 blocks); `DEC-038`/`DEC-039`; QA runbook; B2 report; E1-a §8–§9; known-defects register; B3 `EXPECTED_CHANGES.md` and run outputs; the three page sources and the primitive/CSS diff.
- **Completed:** resume verification (§header); final CLS; E6 Firefox; route a11y/motion ×3; figure text; DataTable probe ×3; accessible names ×3; Gate 2/3; chrome-nav; bytes; `build:cpanel` + verification; static gates; visual evidence; this report; `DEC-040`; register, current state and runbook updates; local commits.
- **Tests actually run:** everything cited above. **Not run:** real devices / AT (E1); real GTM container (E6); real print.
- **Unresolved:** §13. **Recommended next task:** owner review of `visual/index.html` and this report; R-3; E1 font/AT checks; then a separate B4 instruction.
- **Stop condition honoured:** no B4 work; no header/footer, consent or GTM change; no LAN preview; no push, merge or deploy.
