# MappedSkills UI Revamp — Gate 4 · B2: Paid Media Service Pages

| | |
|---|---|
| **Date** | 2026-10-08 |
| **Authority** | **`DEC-039`**: B2 only (`/google-ads`, `/social-media-ads` bodies); local implementation and validation; no push, merge, staging, production or hotfix branch |
| **Status** | **COMPLETE WITH EXCEPTIONS** (§11). Every mandatory B2 check passes. The exceptions are open programme items (E1, E6 …) and recorded observations, not B2 defects |
| **Starting point** | `ui-revamp` @ `c9ac186` (verified): B1 app `f82d09b`, R1 `afb08ed`, `DEC-037`, `DEC-038`. Working tree: only `next-env.d.ts` (unrelated, untouched) and the excluded screenshot collections |
| **Builds** | Scratch copies outside the repository (`git archive` + the B2 files). **Before** (`c9ac186`): plain `AcgrdGtXwF54MPtAnZanT` :3810 · fixture `FDhOO8rVv3Qvg55-Ny0Hw` :3820 · placeholder-GTM `unbuU0dnJBcrf-qyRs21Z` :3811. **After, run 2 (final)**: plain `Db-rPGz2inZXPD0rYbqBY` :3830 · fixture `YuvVllKi6mjS4ka4jY7bv` :3840 · placeholder-GTM `4P8G9YYi0wLLWJUiDWnHX` :3831. (Run 1 builds `ztuBaHiCknl5WX_0SpxNm` / `YbTZ35d4n3TPxtJZDuyov` / `Vh9oPdQ41gx8JNrV93XFQ` lacked the §7 fallback fix) |
| **Evidence** | [`gate-4/b2/evidence/`](gate-4/b2/evidence/): [`EXPECTED_CHANGES.md`](gate-4/b2/evidence/EXPECTED_CHANGES.md) (declared before testing) · `run/` (all results) · [`visual/index.html`](gate-4/b2/evidence/visual/index.html) (before/after + `/seo`) · [`E1A_EARLY_DEVICE_CHECKPOINT.md`](gate-4/b2/E1A_EARLY_DEVICE_CHECKPOINT.md) |

## 1. Implementation summary

Both bodies are recomposed **only** from the approved Direction C primitives (`DcPage`, `Crumb`, `ServiceOpener`, `Section`,
`Label`, `Statement`, `Lede`, `Body`, `Note`, `TLink`, `InlineLink`, `NotPromised`, `ScopeRows`, `Close`, `DcMotion`). No new
component was built; `DcPage` gained an optional `className` (default output unchanged). Copy is carried verbatim from the production page source; section order is unchanged.

| Route | Production order (kept) | Direction C composition |
|---|---|---|
| `/google-ads` | crumb → opener → "where paid search sits" → **boundary (before scope)** → scope (6) → measurement + limit + related → close | split opener · label rail + reading column · the `/services` "reverse" accountability composition (owned statement + `NotPromised`) on paper · scope rows (production disclosure behaviour) · measurement claim with its **limit beside it** (`dc-limit`) on paper · tangerine close |
| `/social-media-ads` | crumb → opener → scope → **channel-fit boundary** → related → close | split opener · label rail + reading column · the boundary as an owned statement + first condition beside the remaining conditions (half/half) on paper · a tight "related" strip · tangerine close |

**Distinctiveness (V5):** neither page copies `/seo` — no figure (F1 D / F9 blocked, as before), no horizon plate, no questions
section. `/google-ads` is identified by its early not-promised boundary and adjacent limit; `/social-media-ads` stays the shortest
capability page (nothing added to equalise length). Inversions: 1 (the close) on each.

**Mobile composition (V8, ≤599px):** DOM order = reading order everywhere. Opener: eyebrow → H1 → lede → side paragraph → stacked
full-width CTAs. `/google-ads` boundary: owned statement and paragraphs first, then "we do not promise" (28px gap, §6). Measurement:
claim → limit → tertiary link → related. `/social-media-ads` boundary: statement + first condition, then the three paragraphs.

## 2. Exact files changed

| File | Change |
|---|---|
| `app/(pages)/google-ads/page.tsx` | Body recomposed in Direction C (imports, JSX). `metadata` and `SCOPE` data unchanged. Phase F header comment kept, B2 note added |
| `app/(pages)/social-media-ads/page.tsx` | Same. `metadata` unchanged |
| `app/direction-c-pages.css` | Additive, opt-in rules only: `em.dc-k-named { font-style: normal }` (keeps the copy's own `<em>` with the accent colour); `.dc-c-side.dc-side-end` / `.dc-side-end > .dc-limit` (a limit aligned to the foot of its claim); `.dc-after-main` (gap for a main→side stacked reverse pair, see OBS-7); **`@font-face "DC Display 96 Fallback B"` (92%) + `.dc.dc-fallback-b`** (§7). None matches an element on `/`, `/services` or `/seo` |
| `components/direction-c/primitives.tsx` | `DcPage` accepts an optional `className` (the two B2 pages pass `dc-fallback-b`). Approved routes pass none: their output is unchanged (served head, inventory and `<main>` pixels identical) |

**Not changed:** `/`, `/services`, `/seo` bodies; `SiteHeader`/`SiteFooter`/`nav.ts`/`ChromeSwitch`; `lib/consent.ts`, `lib/gtm.tsx`,
`lib/analytics.ts`; `ContactForm`, `BookingLink`; metadata helpers; `components/commercial/*` (legacy components stay for other routes
until B11); dependencies. QA tooling added (docs only): `gate-4/qa/route-a11y-motion.cjs`, `gate-4/qa/cls-routes.cjs`.

## 3. Content preservation

Before baseline: `gate-4/b1/evidence/run/inventory.json` (record) and a same-session inventory of the pre-B2 build (`run/inventory-before.json`).

| Check | Result |
|---|---|
| Inventory, pre-B2 build vs B2 build, **no facet ignored** (`inventory-diff-vs-before.txt`) | **844 facets identical · 6 differences, all declared**: on each route, the tertiary link's `innerText` gains the `aria-hidden` `TLink` arrow (`text-main`, `links-main`), and `dcMotion` 0 → 1 (the shared close reveal) |
| Inventory vs B1 record (`inventory-diff-vs-b1.txt`, final quiescent run) | **The same 6 only** (844 identical). During the loaded suite runs the four dynamic not-found pages also differed in live-DOM title/robots/canonical, in **both directions** between runs: **OBS-6**, pre-existing. Controls: the pre-B2 build shows the identical variant to the candidate in 6/6 paired runs (`obs6-control.txt`, `obs6-control-run2.txt`); served HTML 34/34 identical |
| Headings, H1 count, visible text order, CTAs (text + destination), buttons, forms | Identical |
| Accessible names (browser accessibility tree, `accessible-names.txt`) | All 10 / 9 link names and the full heading outline **identical**; the arrow is not announced |
| Copy authority | Unchanged. `/google-ads` remains **PROPOSED COPY — PARTIALLY BLOCKED** (fee/spend arrangement and F9 still render nothing); `/social-media-ads` approved (`DEC-014`) |

## 4. SEO and analytics preservation

| Check | Result |
|---|---|
| Served `<head>` + JSON-LD, before vs after (`served-head.cjs`) | **34/34 identical** (status, title, meta, canonical, `BreadcrumbList`, Organization) |
| Analytics and forms (`analytics-forms.cjs --compare` vs B1) | **0 differing sections** (consent states, `page_view` walk, BookingLink `meeting_started`, ContactForm contract + mocked outcomes) |
| E6 probe + R1 invariants (I8 against the **pre-B2** build) | **I1–I9: 9/9 in Chromium, WebKit and Firefox.** R1 residual unchanged (no container on any undecided/denied route-level 404) |
| Chrome consistency (`--expect-dc all`) | 0 failures |
| Tracking hooks | None existed (OBS-5); none added or removed. `data-dc-motion` (presentation) added |

**GTM DOM changes to carry into E6** (`gtm-dom-dependency-inventory.txt`): every body class on both routes changed (144 / 101 legacy
utilities → Direction C classes); new section IDs `dc-ga-*` / `dc-sm-*`; the legacy hero `<section>` is now a `<div>` (5 and 4
`<section>`s instead of 6 and 5); each CTA anchor now contains an empty `aria-hidden` mark `<span>`; the tertiary link's text content
ends in `→`. **At risk if the container uses them:** Click Classes/ID/Element triggers, an exact Click Text match on "The method,
including what cannot be attributed", or All Elements click triggers (the clicked node may now be the span). CTA link text and
`href` are unchanged.

## 5. Regression (site-wide, against the B1 baseline of record)

| Check | Result |
|---|---|
| Layout (7 widths, text spacing 320–390, 200%/400% reflow) — classified | **NEW 0 · RESOLVED 0 · KNOWN 532** in Chromium and WebKit, both runs. Firefox: run 1 NEW 0; **run 2 NEW 1** — `headings|blog-slug~not-found|768|h1-count` (0 visible h1 on the client-rendered dynamic 404). **Not B2:** that page imports no Direction C code and its served HTML differs between builds only by BUILD_ID; recurrence 1/10 candidate runs vs 0/12 pre-B2 runs (incl. a fresh server). Render-timing flake, OBS-6 family (`firefox-h1-control.txt`) |
| A11y (axe, Tab walk, names, reduced motion, forced colours, menu) — classified | **NEW 0 · RESOLVED 0** · KNOWN 31 / 14 / 14 |
| `<main>` pixels, chrome masked, vs B1 hashes | **64/68 identical**; the 4 changed = the two B2 routes × 390/1440 (declared) |
| Navigation (`nav-checks.cjs`) | **560 checks, 0 findings** × 3 engines |
| Gate 2 `app-checks.cjs` / Gate 3 `acceptance-checks.cjs` / `chrome-nav.cjs` | **192/192** / **261 · 0 · 3** / 0 console errors |
| Static gates (final tree / final build) | typecheck exit 0 · `eslint .` exit 0 · **`npm test` 30/30** · three builds compile · `verify:build` OK (23 prerendered) · build sources byte-equal to the working tree (`static-gates.txt`) |
| Bytes (`bytes.cjs`, final build) | B2 routes: HTML gz 15.1→13.8 / 12.4→12.0 KB; CSS gz 31.7→37.0 KB (they now load the Direction C page stylesheet, as the approved routes do); JS +1.1 KB raw; **served font preloads 2→3 (64→139 KB): the opsz display face** — the predicted §3.1 consequence ("each route that migrates adds the opsz preload"), but **not in the declaration**, which covered only the live-DOM preload facet (identical). `/`, `/services`, `/seo`: CSS 36.8→**37.0** KB gz (the new opt-in rules and `@font-face` ship in the shared page stylesheet; they match nothing there); HTML byte-identical after normalising chunk hashes and BUILD_ID; JS and fonts unchanged |

## 6. Accessibility results

Harness (all 34 targets) as in §5, plus `route-a11y-motion.cjs` on the two routes (Chromium, WebKit, Firefox; `/seo` as control):

| Check | `/google-ads` | `/social-media-ads` |
|---|---|---|
| Heading order | H1 → 5 × H2 (incl. close label); unchanged | H1 → 3 × H2; unchanged |
| **Full-page** Tab walk at 390, 1440, 1440@200% (720px) | 47 / 54 / 48 stops, 16 in `<main>`; every stop visible, in view, 3px outline; order = DOM | 40 / 47 / 41 stops, 9 in `<main>`; same |
| **Full-page** forced-colours walk (Chromium emulation) | 0 stops lose the outline | 0 |
| Touch targets | 0 findings (layout harness, 7 widths) | 0 |
| Text spacing, 200% and 400% reflow | 0 findings | 0 |
| 320px | no page scroll; smallest text 12.48px | same |
| Landmarks | Breadcrumb `nav` + 4 named `region`s (new: sections are labelled, as on `/seo`) | Breadcrumb + 2 named regions |
| Reduced motion / no-JS / print | 0 pre-state, no transition >10ms / every scope row open, nothing missing / composed once settled. **Print timing (OBS-9, pre-existing, shared):** the close marks reach opacity 1 ~800ms after `beforeprint` (0 at the event in Chromium/WebKit, 1 in Firefox), identically on the approved `/seo` (`print-timing-probe.txt`). Run 2's first P1 sample at 800ms caught this in WebKit; P1 now samples the settled state and reports the at-event value | same |

**Found during B2:** the `/services`-style reverse pair stacks with 0px gap below 900px (fixed for B2 by an opt-in class; the
approved `/services` keeps it → **OBS-7**). The `/seo` control shows horizon-plate terms at 11.52px at 320 → **OBS-8**. Both pre-existing, both on protected approved bodies, recorded in `gate-4/b0/GATE_4_B0_KNOWN_DEFECTS.md` §6.

## 7. Responsive results

All 7 widths (320, 360, 390, 430, 768, 1024, 1440) in three engines: no page-level horizontal scroll, no new overflow, no sticky
element (layout harness, 0 findings on both routes). First-screen captures at every width: `run/screens/chromium/fold/`.
**Throttled CLS** (400ms RTT, 400 kbps, 4× CPU, 3 runs per cell, 7 widths):
- **Run 1 failed:** `/social-media-ads` @360 = **0.022** in 3/3 runs (`run/cls-throttled-run1.txt`). Source: the opener's lede, side and
  actions moved when the H1 re-wrapped as the opsz display face replaced its fallback — risk G4-3.
- **Cause, measured** (`run/fallback-sweep.txt`): the approved fallback (`size-adjust` 90.5%) keeps this H1 on 3 lines at 360 only at ≥ 92%;
  the approved `/seo` H1 at 360 needs ≤ 91.5%. **No single value holds all four service H1s**, so the approved calibration was not touched.
- **Fix:** a second calibrated fallback at 92% (holds every cell of both B2 routes), opt-in per page — the Gate 3 mechanism already used
  for the homepage hero. Declared in `EXPECTED_CHANGES.md` (addendum) before run 2; the whole suite was re-run.
- **Run 2: 0.000 in all 42 runs** (2 routes × 7 widths × 3) — `run/cls-throttled.txt`.

## 8. Motion

Parity with the approved `/seo`; **nothing new**:
- L2: one reveal target per route (the shared `Close` arrival marks, T3), within the ≤6 budget; graphic marks only — no text is ever in a pre-state (computed-style check); 0 `.dc-pre` left after scrolling; none under reduced motion, without JS or in print.
- L1: the existing button mark, `TLink` arrow, inline-link underline and scope-row plus/minus transitions (180ms).
- No library, no signature moment, no layout-property animation, nothing looping. Throttled CLS in §7.

## 9. Visual comparison

[`gate-4/b2/evidence/visual/index.html`](gate-4/b2/evidence/visual/index.html): both routes, before / after / `/seo`, at 390, 768 and 1440, each at the first screen, the
boundary section and the close → footer transition (45 JPEGs, 2.7 MB). Captures scroll to the same heading text in both builds.
Owner review is required (this is the first body migration).

## 10. E1 readiness

**E1 is OPEN. Nothing in this batch was tested on a real device or assistive technology.** No physical Android/iPhone, Safari
remote automation, Firefox release, VoiceOver or Windows High Contrast was available. The early **E1-a** protocol and recording
sheet are in [`gate-4/b2/E1A_EARLY_DEVICE_CHECKPOINT.md`](gate-4/b2/E1A_EARLY_DEVICE_CHECKPOINT.md) (routes, 28 checks incl. the Android display-font swap X2,
larger text, VoiceOver, High Contrast full walk). Engine and emulation results above are proxies only.

## 11. Outstanding risks and status

**B2: COMPLETE WITH EXCEPTIONS.** Every mandatory check passes on the final build. Run 1 failed one declared expectation (CLS 0.022
at 360 on `/social-media-ads`); it was fixed, the fix was declared, and the whole suite re-ran clean (§7). One served-HTML change was predicted by the architecture but not written into the declaration: the opsz font preload (§5). Three anomalies outside the B2 routes were proven pre-existing with controls (OBS-6, the Firefox dynamic-404 h1 timing flake, OBS-9).

| Item | State |
|---|---|
| **E1** | OPEN — E1-a prepared, not run |
| **E6** | OPEN — container access; the §4 DOM changes are added to its scope |
| OBS-1, OBS-6 | OPEN (OBS-6 re-observed, pre-existing) |
| OBS-7, OBS-8, OBS-9 | NEW, pre-existing on approved routes / shared approved motion; recorded, not changed; owner decision (`GATE_4_B0_KNOWN_DEFECTS.md` §6) |
| LIVE-1, LIVE-2, KD-02 (body), PROC-1 | OPEN, unchanged. Production untouched |
| `/google-ads` copy | Still PARTIALLY BLOCKED (owner inputs: fee/spend arrangement, F9) |
| R1 report correction | `typescript` 5.7.3 **is** a declared direct dependency (since `8689bc9`); the R1 unit tests pass 30/30 from a clean `npm ci`, also with `--omit=dev` (`run/dependency-reproducibility.txt`). **No dependency change needed** |

## 12. B3 entry recommendation

**Ready for an owner instruction after two owner actions:** (1) review [`visual/index.html`](gate-4/b2/evidence/visual/index.html) — B2 is the first proof that Direction C
extends by composition; (2) run E1-a (or explicitly defer it), because B3 depends on its findings for shared components (display
fallbacks on Android especially). For B3: use `gate-4/b2/evidence/run/` as the baseline of record; B3 builds `Figure` and `DataTable`
with their first consumers; decide OBS-7 (apply `.dc-after-main` to `/services`?) and OBS-8 before figure text is standardised at 12px.

## 13. Rollback

`git revert 63df52a` (the B2 implementation commit) restores both legacy bodies; the legacy components were never removed, and the CSS rules are
additive. Chrome, consent and analytics are untouched, so nothing else moves.

## 14. Session handoff (`SESSION_HANDOFF_TEMPLATE.md`)

- **Session:** 2026-10-08 · Claude (Opus 5.5) · Principal Frontend Architect / Design Systems / Accessibility / Release QA · Gate 4 B2.
- **Context read:** `CLAUDE.md`; `CONTEXT_INDEX.md`; `CURRENT_STATE.md` (Gate 4 blocks); `DEC-032`–`DEC-038`; Gate 4 master plan, design-system
  architecture, motion specification, implementation sequence, QA matrix, route matrix (B2 rows); B1 report; E6 R1 acceptance report;
  QA runbook; both route sources, `/seo`, `/services`, Direction C primitives/CSS, the legacy commercial components.
- **Completed:** §1–§10. **Files created:** this report; `gate-4/b2/E1A_EARLY_DEVICE_CHECKPOINT.md`; `gate-4/b2/evidence/**`;
  `gate-4/qa/route-a11y-motion.cjs`, `gate-4/qa/cls-routes.cjs`. **Files modified:** §2 application files; `DECISION_LOG.md` (`DEC-039`);
  `CURRENT_STATE.md`; `QA_REGRESSION_RUNBOOK.md` §5.5; `gate-4/b0/GATE_4_B0_KNOWN_DEFECTS.md` §6.
- **Decisions approved during session:** `DEC-039` (the owner's B2 brief). **Decisions proposed:** OBS-7 and OBS-9 fixes; OBS-8 handling; moving
  `typescript` to `devDependencies` is optional housekeeping, not needed.
- **Tests actually run:** everything in §§3–7, twice for the suite (run 1 and the post-fix run 2). **Not run:** E1 (no devices); real GTM
  Preview / container (E6); real print.
- **Unresolved:** §11. **Risks:** G4-3 (fallback calibration) now has a second value; every later route must be swept.
- **Recommended next task:** owner review of `visual/index.html` and this report; E1-a; then a separate B3 instruction.
- **Stop condition honoured:** no B3 work; no header/footer, consent or GTM change; no push, merge, deploy or hotfix branch.
