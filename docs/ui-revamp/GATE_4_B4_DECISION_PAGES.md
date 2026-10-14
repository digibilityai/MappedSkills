# MappedSkills UI Revamp — Gate 4 · B4: Decision Pages (`/problems/traffic-but-no-enquiries`, `/pricing`)

| | |
|---|---|
| **Date** | 2026-10-09 |
| **Authority** | **`DEC-041`**: B4 only (the existing problem page and `/pricing`); local implementation, validation and local commits only. B3 accepted as a local checkpoint with documented exceptions. No staging, push, merge, LAN preview or deployment |
| **Status** | **COMPLETE WITH EXCEPTIONS** (§13). Every mandatory check passes on the final build. The exceptions are open programme items (E1, E6 …), the declared inherited figure text, one undeclared but investigated inventory difference (§4), and a new intermittent Firefox navigation observation (OBS-15, §5) |
| **Starting point** | `ui-revamp` @ `079e3cf` (verified; B3 application `2097104`, evidence `079e3cf`; Decision Log through `DEC-040`). The six B3 scratch servers (:3950/3951/3960/3970/3971/3980) were confirmed as `scratchpad/b3/{before,after}-{plain,gtm,fixture}` `next start` processes bound to 127.0.0.1 and stopped (children and `npm exec` parents only) |
| **Builds** | Scratch copies outside the repository, loopback only. **Before** (`git archive 079e3cf`): plain `qcg9U7Dk3BVQ8RDyp3_T6` :4050 · fixture `_CrUSA7xzjGupp1kXNfBE` :4060 · placeholder-GTM `Xp6-lYEgxTZpTaUjLfthk` :4051. **After, tested**: plain `1-DP1mZNShjRXBiReysrQ` :4070 · fixture `VH_5_hEEf5eMyBLIwtub5` :4080 · placeholder-GTM `AwbXd5F6B-S_yORKtPAva` :4071. **After, final** (adds one corrected comment in the `/problems` page): plain `WZKJWKdtfWPUf8jow_do_` :4072 · fixture `fXLtlzRL1Mz4xofmFsz8s` :4082 · placeholder-GTM `3l7u90nCZdZo6ECUuJntl` :4073. Every port was checked to serve its own BUILD_ID before use |
| **Evidence** | [`gate-4/b4/evidence/`](gate-4/b4/evidence/): [`EXPECTED_CHANGES.md`](gate-4/b4/evidence/EXPECTED_CHANGES.md) (declared before the final comparison) · `baseline/` (before-build records) · `run/` · [`visual/index.html`](gate-4/b4/evidence/visual/index.html) |

## 1. Route inventory (A)

Discovered from `app/(pages)/`, `app/sitemap.ts`, `lib/analytics.ts` (`page_type`), the QA target list (`gate-4/qa/lib.cjs`) and the governance
documents (`GATE_4_IMPLEMENTATION_SEQUENCE.md` B4, `GATE_4_ROUTE_MIGRATION_MATRIX.md` rows 9–10):

| # | Route | File | `page_type` | In sitemap |
|---|---|---|---|---|
| 9 | `/problems/traffic-but-no-enquiries` | `app/(pages)/problems/traffic-but-no-enquiries/page.tsx` | `problem` | yes |
| 10 | `/pricing` | `app/(pages)/pricing/page.tsx` | `pricing` | yes |

**No discrepancy between the plan and the live route structure.** There is exactly one problem page; there is **no `/problems` index**
route and no dynamic `/problems/[slug]` segment. That is deliberate (`07_NAVIGATION_ARCHITECTURE.md` §6, restated in the page source):
"Problems" is a breadcrumb **label**, not a link. `/problems` therefore returns the site 404, as before; B4 does not add a hub.
No CMS dependency, form, booking widget or backend call exists on either route (both were already server-only).

## 2. Commercial baseline: what `/pricing` publishes (E)

**VERIFIED FACT (source and rendered page):** `/pricing` publishes **no price, band, tier, plan name, currency, billing period, minimum,
inclusion/exclusion schedule, eligibility rule or "from" figure.** Every figure is owner-blocked (`03_PAGE_ARCHETYPES.md` §4.3, `DEC-019`);
§3 "The bands" renders nothing, and the entry-offer sentence in §7 renders nothing. What the page does carry, and what was preserved
exactly: the six-factor direction matrix (words only), the "not for" list, the 12-month-plus horizon statement, the accountability
sentence ("We do not promise rankings, …"), the no-calculator note, and four CTAs (hero "Get a scoped estimate" → `/contact`, "Book a time
to talk" → `/schedule-call`; close "Tell us what you're trying to fix" → `/contact`, "Book a call" → `/schedule-call`). The redesign adds
no price slot, plan card, comparison of plans or empty container, and no seam where §3 would sit.

Proof (`b4-content.cjs`, a new committed probe: every `<main>` text node in DOM order, CSS-independent, with and without JS):
the **copy, section order, headings, link text + `href`, CTAs, table caption/headers/row headers/cells, SVG text, lists and every
figure-like token** (digits, currency symbols, number words, "per month", "from", %) are **identical** before and after on both routes
(`run/content-compare.txt`: 7 differences, **all declared**: the `aria-hidden` `TLink` arrows (3) and the `DataTable` header row being
visually hidden below 600px). Figure tokens on `/pricing`, before and after: one, from, 12, six, three, ten, two, thousand, fifteen, four,
five — all from approved sentences ("12-month-plus", "ten-page site", "two-thousand-page site", "fifteen years").

## 3. Implementation (D)

| Route | Frozen order (kept) | Direction C composition |
|---|---|---|
| `/problems/…` "diagnostic register" | crumb → opener (**no CTA**) → 1 what it looks like → 2 four causes (F2) → 5 five checks (F6) → 6 findings → 7 own diagnostic → 8 inline action pair (last) | `Crumb` with the legacy trail · opener with the reassurance line in the side column and **no action** · statement + body · `CauseZones` reused unchanged, then the four causes as **equal peers** on ink rules (2 × 2 from 900px) and the "check measurement first" rule on a plain ink rule · **`Sequence`**: the checks on a spine, each outcome open on paper · **`FindingRows`**: seven identical rows, term beside meaning · own-diagnostic statement + `TLink` · the action pair **inside an ordinary section** (not converted into the tangerine close) |
| `/pricing` "decision register" | opener (CTA pair) → 1 buying → 2 horizon → (§3 nothing) → 4 factors (F8) → 5 needs → 6 not for → 7 objection → 8 close | opener with one lede and the approved secondary label · statement-led sections alternating ground/paper · F8 as the shared **`DataTable`** with its own caption **visible** · "not for" as a **`NotPromised` stated list** (open mark + sentence) · the objection with label rail · shared `Close` (tangerine) + `DcMotion` |

**Application files changed:**

| File | Change |
|---|---|
| `app/(pages)/problems/traffic-but-no-enquiries/page.tsx` | Body recomposed; `CHECKS`/`FINDINGS` copy unchanged (legacy utility classes removed from inner `<p>`/`<strong>`; the two inline links become `InlineLink`, same text and `href`). `metadata` unchanged. B4 note added to the header; **no `DcMotion`** |
| `app/(pages)/pricing/page.tsx` | Body recomposed; `FACTORS`/`NOT_FOR` copy and every blocked-figure comment unchanged. `metadata` unchanged. `DcPage className="dc-fallback-b"` (measured, §7) |
| `components/direction-c/primitives.tsx` | `Crumb` accepts a pre-built `trail` + caller's `jsonLd` (`href: null` → label); `ServiceOpener` `side`/`action` optional + `secondaryLabel`; `NotPromised` optional label, `ReactNode` items, `prose`; new **`Sequence`**, **`FindingRows`** (+ types). Defaults byte-identical |
| `components/routes/primitives.tsx` | `RouteBreadcrumb`'s JSON-LD builder extracted as `routeTrailJsonLd` (same object, same `JSON.stringify`); `RouteBreadcrumb` output unchanged |
| `app/direction-c-pages.css` | Additive opt-in B4 block (`.dc-crumb-txt`, `.dc-causes`, `.dc-callout`, `.dc-seq*` incl. a forced-colours rule for the spine, `.dc-findings`, `.dc-notp-prose`, `.dc-table-cap`, `.dc-inline-actions`); fallback comment extended |

**Not changed:** every other route body; `SiteHeader`/`SiteFooter`/`nav.ts`/`ChromeSwitch`; `lib/consent.ts`, `lib/gtm.tsx`, `lib/analytics.ts`;
`ContactForm`, `BookingLink`; metadata helpers; `components/routes/{CauseZones,CheckSequence,FactorMatrix}.tsx` and `components/commercial/*`
(legacy components stay for rollback); dependencies; `next-env.d.ts` (pre-existing modification, excluded).
**QA tooling added (docs only):** `gate-4/qa/b4-content.cjs`, `gate-4/qa/b4-visual-captures.cjs`; `b4/evidence/run/banner-timing-probe.cjs` (diagnostic).

**Shared-primitive safety (proved, not asserted):** served `<head>` + JSON-LD **34/34 identical** (includes `/research/[slug]` and `/press/[slug]`
fixture pages, which use `RouteBreadcrumb`); `<main>` pixels **64/68 identical** (the 4 changed = the two B4 routes × 390/1440); inventory 845
facets identical on the other 32 targets; new CSS classes are emitted only by the two B4 pages or by the new primitive props they use.

**Design deviations from the plan, recorded:** (1) `CauseZones` is **not** wrapped in `Figure` — it carries its own `<figure>`/caption, so
wrapping would nest figures (B3 precedent with `ChainTerminus`/`ChainLossZones`); (2) the S3 signature-motion candidate is **not built**
(not approved); (3) `/pricing` gets **no** breadcrumb (the legacy page had none; adding one would add JSON-LD).

## 4. Content, SEO and analytics parity (E, F)

| Check | Result |
|---|---|
| `b4-content.cjs compare` (JS 1440/390, no-JS 1440) | **7 differences, 7 declared, 0 undeclared** (§2). Copy with and without JS identical on both routes |
| Inventory, before vs after build, same session, **no facet ignored** (`run/inventory-diff-vs-before.txt`) | **845 identical · 5 differences**: 4 declared (the three `TLink` arrows in `text-main`/`links-main`; `/pricing` `dcMotion` 0→1) and **1 undeclared** (below) |
| Served `<head>` + JSON-LD (`run/served-head.txt`) | **34/34 identical** — `/problems` `BreadcrumbList` (Home → "Problems" (no `item`) → page) and Organization; `/pricing` Organization only (no page JSON-LD, as before) |
| Headings, CTAs (text + `href`), buttons, forms, `analyticsAttrs`, consent bootstrap, scripts, chrome | Identical |
| Accessible names (`run/accessible-names-*.txt`; Chromium/WebKit/Firefox @1440, Chromium @390) | **Heading (with level), link, button, form-control and image names identical, same order.** Added: 6 named `region`s per route (sections now carry `aria-labelledby`), as on B2/B3 |
| Analytics and forms vs the B3 record (`run/analytics-compare-vs-b3.txt`) | **0 differing sections** (consent states, `page_view` walk incl. `page_type`, BookingLink, ContactForm contract and outcomes) |
| Metadata / canonicals | `createMetadata(...)` calls unchanged; served values identical |

**Undeclared inventory difference — investigated, accepted as benign, recorded:** `problems · text-main` lists the visually hidden step
labels as "Check 1 … Check 5" where the before build listed "CHECK 1 … CHECK 5". The DOM text is identical ("Check n", `textContent`;
`b4-content` copy identical). The legacy ordinal `<p>` carried `text-transform: uppercase`, which `innerText` applies even to visually hidden
text; the `Sequence` ordinal is not uppercased. The visible ordinal ("01"…) is `aria-hidden` in both. Not a link, so not a GTM Click Text.
It was missed in the declaration because the legacy label's case transform applied to the hidden text.

## 5. Consent, navigation and regression (G, J)

| Check | Result |
|---|---|
| E6 probe + R1 invariants, B4 vs before build, placeholder container (`run/e6-probe/`) | **I1–I9 9/9 in Chromium, WebKit and Firefox**. R1 residual unchanged |
| Navigation (`nav-checks.cjs`, 34 targets) | Chromium **560/0**, WebKit **560/0**. Firefox: see OBS-15 below |
| Chrome consistency (`--expect-dc all`) | 0 failures |
| Layout / a11y classified vs the B3 run (`run/classify-*.txt`) | **NEW 0 in all six runs.** RESOLVED: KD-04 on `/pricing` (8 layout + 1 axe fingerprints × 3 engines) and the KD-03 instance on `/problems` (axe `color-contrast` @390/1440, the legacy "Problems" crumb label in `--resolve-gap`; the DC label uses `--dc-gap-text`, 4.90:1) × 3; Firefox also no longer shows the B3-record dynamic-404 `h1-count` flake (not a B4 effect). KNOWN: KD-05 `text-spacing|problems|320/360/390|contained:text` (inherited `CauseZones`) |
| Gate 2 `app-checks.cjs` / Gate 3 `acceptance-checks.cjs` / `chrome-nav.cjs` | **192/192** / **261 PASS · 0 FAIL · 3 NOTE** (the known Services-submenu forced-colours notes) / **0 console errors** |
| Static gates (`run/static-gates.txt`) | typecheck 0 · `eslint .` 0 · unit tests **30/30** (also re-run on the final tree) · 9 production builds · **`build:cpanel` exit 0** (1 worker, 512 MB, 27/27, `myzE9y4ydykLujOPx1Quk`) · `verify:build` OK · `verify:cpanel` OK |
| Final vs tested build (`run/final-vs-tested-build-html.txt`) | 28/34 served pages byte-identical with BUILD_ID and chunk hashes normalised (both B4 routes included). The 6 others are dynamic/not-found pages whose streamed payload length varies between **server instances** (also between the before and tested builds on `/work`), stable within an instance (0/5 re-fetches), head/title/robots identical (`run/dynamic-pages-build-variance.txt`) — OBS-6 family; no B4 code on those routes |
| Harness failures retained | `run/layout-firefox-run1-HARNESS-CRASH.txt`: Firefox `layout.cjs` crashed in run 1 (`document.body is null` during `page.evaluate`, mid-navigation); no output written; re-run alone: 516 findings, classified above |

**OBS-15 (new) — Firefox `nav-checks` M5 "banner shown false", intermittent** (`run/firefox-nav-m5-summary.txt`). On the B4 build the full Firefox
suite reported 3, 1, 0 and 0 M5 findings in four runs (`/blog` fixture @390/320, a research 404 @390; then `/privacy-policy` @320); on the
before build 0, 0, 0, 0. The banner was never covering the menu; it was **absent at the `networkidle` instant**. Targeted control runs: 0/8.
Isolated timing probe (20 loads × 3 routes × 2 rounds per build): banner absent 0/120 before, 0/120 after. None of the affected routes renders
B4 code; their served HTML and `<main>` pixels are identical. **Classification: not a reproducible B4 regression and not proven unrelated.**
WORKING HYPOTHESIS: suite-load timing (the check reads a client-rendered banner with no wait). Chromium and WebKit: 0 in every run.

## 6. Accessibility, tables and motion (H)

`route-a11y-motion.cjs` on both routes + `/seo` control, three engines (`run/route-a11y-motion-*.txt`; before: `baseline/`):

| Check | `/problems/…` | `/pricing` |
|---|---|---|
| Heading hierarchy (identical to before, 3 engines) | H1 → 6 × H2; 4 × H3 under the causes, 5 × H3 under the checks = 16 | H1 → 7 × H2 (incl. the close label) = 8 |
| Tab walk 390 / 1440 / 1440@200% (Chromium) | 37 / 44 / 38 stops, 6 in `<main>`, **0 bad**, order = DOM (identical counts to before) | 37 / 44 / 38, 6, **0 bad** (before: 38 at 390, outside `<main>`; `<main>` stops 6 in both; not attributed) |
| Forced-colours walk | 0 stops lose the outline | 0 |
| Motion | **0 targets** (no `DcMotion`; nothing to reveal) | 1 target (shared close marks), **0 text in a pre-state** |
| Reduced motion / no-JS | 0 pre-state / nothing missing: 16 headings, 6 links, 55 paragraphs (= before) | 0 / 8, 6, 30 (= before) |
| Print | marks visible, 0 pre-state | OBS-9 (0 at `beforeprint` in Chromium/WebKit; 1 in Firefox), identical on `/seo` |
| 320px | no page scroll; HTML min **12.48px**; inherited SVG below 12px (§8) | no page scroll; HTML min **12.48px** |

Each engine run exits 1 only for the two declared items: inherited `CauseZones` SVG text on `/problems` and the `/seo` control's OBS-8.
Firefox Tab-walk totals hit the known 400-iteration cap (runbook §5.6); visibility results valid.

**Tables — KD-04 on `/pricing` resolved on the branch** (`run/datatable-*.txt`, `baseline/datatable-before-chromium.txt`):

| | Before (legacy `FactorMatrix`) | After (`DataTable`) |
|---|---|---|
| Views 320 / 390 / 599 / 600 / 768 / 1440 / 1440@200% / 1280@400% | 1 scroll region and contained overflow at 320–600px and 400%; 0 focusable → **10 failures** (Chromium) | **0 scroll regions, 0 overflow, 0 focusable, also under text spacing — 0 failures × 3 engines** |
| Semantics | caption + 3 `th[scope=col]` + 6 `th[scope=row]` × 2 cells | **same** caption text (visible), headers, row headers and cells; explicit table roles keep them once rows stack below 600px; each stacked cell shows "Pushes it lower/higher" as alt-text-empty generated content (not announced twice) |

Mobile comprehension: every stacked row keeps its factor as a row header and both direction labels beside the cells
([`visual/narrow/pricing-320-full.jpg`](gate-4/b4/evidence/visual/narrow/pricing-320-full.jpg)). **Real screen readers were not used (E1).**
KD-04 remains open for blog/portfolio rich-text tables (B8/B9).

**Motion:** no new library, no new signature, no layout-property animation. `/pricing` uses the shared close reveal only; `/problems` has none.
L1 transitions only (button mark, `TLink` arrow, inline-link underline). No essential text depends on an animation.

## 7. CLS and performance (I)

**Display fallback — measured per heading, not reused automatically** (`run/fallback-sweep.txt`, `run/cls-throttled-dev-default-fallback.txt`,
development build `GYZQs8auC-ppQ4di0izWi`): `/problems` keeps its line count under the approved 90.5% fallback at every width (window
89.5–96% at 1024, 86–96% elsewhere) → **kept 90.5%** (dev: 0.000 in 21/21). `/pricing` @360 holds only at **≥ 91%**; with 90.5% the dev run
measured **0.025 @360** (a failure) → opts into the **existing** `dc-fallback-b` (92%). No new fallback value.

**Throttled CLS, final build** (`run/cls-throttled.txt`; 400ms RTT, 50 kB/s, 4× CPU, 3 runs per cell, run alone; plain `WZKJWKdtfWPUf8jow_do_`,
verified before the run):

| Route | 320 | 360 | 390 | 430 | 768 | 1024 | 1440 |
|---|---|---|---|---|---|---|---|
| `/problems/…` (90.5%) | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 |
| `/pricing` (92%) | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 | 0.000 |

**42/42 runs at 0.000** (target ≤ 0.01). LCP 3.65–3.82s under this profile; opsz face completes 7.5–7.7s.

**Transfer sizes** (`run/bytes.txt`, before → after): `/problems` HTML gz 22.8 → 21.2 KB, `/pricing` 15.6 → 15.2 KB; CSS gz 31.6 → 38.0 KB on
both (they now load the Direction C page stylesheet); JS raw +1.1 KB (`/problems`) / +2.0 KB (`/pricing`, `DcMotion`); font preloads 2 → 3
(64.3 → 139.3 KB, the opsz display face, declared). Other Direction C routes: CSS gz 37.6 → **38.0 KB** (the opt-in B4 rules); HTML, JS, fonts
unchanged. Legacy routes unchanged.
**Finding:** the `/problems` +1.1 KB is the `ScopeDisclosure` client chunk, referenced by the shared Direction C primitives module; it is
downloaded on every Direction C route but never instantiated on `/problems` (no client component renders; DOM identical without JS). The page
comment was corrected to say exactly that (the only source change between the tested and final builds). Splitting the module would touch every
DC route: not done in B4 (recorded as a candidate, OBS-16).

## 8. R-3 typography (owner working rule) and figure text

| Text | Rendered size | Status |
|---|---|---|
| New B4 labels: sequence ordinal, "what you will be able to see" | **13.12px** (.82rem) | Meets the rule (≥ 12, prefers 13) |
| Section labels, eyebrows, `DataTable` header and stacked labels (Direction C label role, reused) | **12.48px** | Meets the 12px floor. Note: the legacy `/pricing` table header was 12.8px and the legacy outcome label 12.8px; the table header now uses the system label token (12.48px). Not a layout-driven shrink, but it is 0.32px smaller — flagged for owner review; changing the token would alter approved B1–B3 routes, so it is not done |
| Inherited `CauseZones` SVG (reused unchanged) | 9.6 @320 · 10.93 @360 · 11.93 @390 · 10.23 @768 · 13.03 @1440 (before: 9.47 / 10.8 / 11.8 / 10.42 / 13.03) | **Inherited exception (KD-05/X5), not a precedent.** Below 12px at 320–768 in both builds; needs an owner decision (redraw) |

No new B4 HTML text is below 12px at any measured width (`run/figure-text-after.txt`). **No exception requiring approval was created by B4 HTML.**

## 9. GTM DOM dependency (E6 scope; `run/gtm-dom-dependency-diff.txt`)

| Route | Changes a published container could depend on |
|---|---|
| both | every body class replaced (`/problems` 125 removed / 50 added; `/pricing` 109 / 46); new section IDs `dc-pb-*` / `dc-pr-*`; `<section>` count 7→6 and 8→7 (opener is a `div`); every CTA anchor (`/contact`, `/schedule-call`) now contains an empty `aria-hidden` `span.dc-mk` (text, `href`, nesting unchanged) |
| `/problems` — **Click Text** | `/how-it-works` link: "How we do this on a client site" → "How we do this on a client site→" (`innerText` gains the `aria-hidden` arrow; accessible name and `href` unchanged). The two finding links (`/seo`, `/conversion-optimization`) change class only |
| `/pricing` — **Click Text** | two `/how-it-works` links gain "→": "The method, in full", "What is published, and what it commits us to" |
| `/pricing` | `data-dc-motion` (close) and `data-label` (table cells) added — presentation only. No tracking `data-*` existed or was added |

At risk only if the published container uses Click Classes / Click ID / Click Element selectors on these bodies, exact Click Text on the three
`/how-it-works` links, or All Elements triggers. **Real GTM compatibility is not claimed (E6 OPEN).** No GTM, consent or analytics code changed.

## 10. Visual comparison (K)

[`gate-4/b4/evidence/visual/index.html`](gate-4/b4/evidence/visual/index.html): each route before / after / reference (`/conversion-optimization`
for `/problems`; `/ai-seo` for `/pricing`) at 390, 768 and 1440 — first screen, three middle sections scrolled to the same heading in both builds
(causes, checks, findings; factor table, "not for", objection), the last section → footer — plus full-page 320 and 360 captures. **76 linked
images, all present** (6.1 MB). 320/360: `scrollWidth = clientWidth` on all four (`run/narrow-320-360.txt`). Reproduce:
```
node docs/ui-revamp/gate-4/qa/b4-visual-captures.cjs capture --label before|after|ref|narrow --base <plain url> --out <dir>
node docs/ui-revamp/gate-4/qa/b4-visual-captures.cjs page --out <dir>
```
Review notes: both pages are longer (390: `/problems` 8,766 → 9,863px, `/pricing` 5,768 → 7,175px of `<main>`) — the Direction C section rhythm,
as on B2/B3. The `/problems` close is intentionally quieter than the tangerine close (inline pair, as approved). Owner review required.

## 11. Observations (L)

| ID | Status |
|---|---|
| **OBS-13 (instance added, pre-existing)** | `/problems` check 2 outcome renders "proof of delivery.A form" (served HTML identical before/after; same JSX-newline-plus-entity pattern). Not fixed (visible text; owner approval) — `run/bold-whitespace-obs13.txt` |
| **OBS-15 (new)** | Firefox `nav-checks` M5 intermittent "banner shown false" on non-B4 routes (§5). WORKING HYPOTHESIS: suite timing |
| **OBS-16 (new, performance)** | Every Direction C route downloads the `ScopeDisclosure` chunk (~1.1 KB raw) whether or not it renders `ScopeRows ≥ 4` (§7). Candidate for a module split; not in B4 scope |
| Undeclared inventory difference | "CHECK n" → "Check n" in `innerText` of visually hidden labels (§4). Benign; recorded |
| Pricing table header 12.8 → 12.48px | System label token adopted (§8). For R-3 review |
| KD-04 | **Resolved on the branch for `/pricing`** (all original fingerprints RESOLVED × 3; 0 scroll regions). Open for B8/B9 tables |
| KD-03 | The `/problems` instance (crumb label) resolved on the branch; KD-03 open elsewhere |
| KD-05 / X5 | `CauseZones` unchanged; known; R-3 redraw decision pending |
| OBS-6, OBS-8, OBS-9 | Re-observed, unchanged |

## 12. E1 limitations

**E1 is OPEN. Nothing in B4 was tested on a real device or with assistive technology.** Needs physical verification: the stacked `DataTable` on
`/pricing` with VoiceOver (iOS/macOS), TalkBack and NVDA (row/column header association after stacking; label not announced twice); the
`Sequence` ordinals announced once ("Check n"); Windows High Contrast on the sequence spine (forced-colours rule added) and causes rules; the 92%
fallback on Android (R-5) and iOS H1 wrapping (OBS-11) on both H1s; OS larger text on the checks; real print (OBS-9 on `/pricing`).

## 13. Outstanding risks and status (B)

**B4: COMPLETE WITH EXCEPTIONS.** Every mandatory check passes on the final build. Exceptions: the open programme items below; the inherited
`CauseZones` text (declared); one undeclared, investigated inventory difference (§4); OBS-15 (intermittent, unattributed, Firefox only).
Failed and invalid evidence is retained and labelled: `layout-firefox-run1-HARNESS-CRASH.txt`, `nav-firefox-run1-M5-flake.*`, `nav-firefox-run2.*`.

| Item | State |
|---|---|
| **E1** | OPEN — §12 |
| **E6** | OPEN — §9 added to its scope |
| OBS-1, OBS-6 | OPEN, unchanged (`/problems` hub 404 by design) |
| LIVE-1, LIVE-2, KD-02 (body), PROC-1 | OPEN, unchanged. Production untouched; R1 remains a local safeguard |
| R-3 | Working rule applied to new B4 HTML; inherited SVG text and the 12.48px label token for owner review |
| G4-3 (fallback calibration) | Measured per heading; `/pricing` needed 92%, `/problems` did not |

## 14. B5 recommendation (N)

Ready for owner review, **not started**. Before or with a B5 instruction: (1) review [`visual/index.html`](gate-4/b4/evidence/visual/index.html);
(2) decide whether `CauseZones` (and the B3 chain figures) get a redraw to meet R-3, and whether the 12.48px label token is acceptable for
table headers; (3) decide OBS-13 (now 6 instances) as one text-only change; (4) run a VoiceOver/TalkBack pass on the two `DataTable`s and the
`Sequence` (E1), since B5 (`/how-it-works`, `/about`, `/faq`) will reuse `FindingRows` and add `Compare`/`DisclosureGroup`; (5) consider OBS-16
before B5 adds more Direction C routes. B5 also needs the S2 signature decision (`GATE_4_IMPLEMENTATION_SEQUENCE.md`). Use
`gate-4/b4/evidence/run/` as the baseline of record.

## 15. Rollback

`git revert 6ab808a` (the B4 application commit) restores both legacy bodies; the legacy components were never removed, the primitive changes are
backwards-compatible and the CSS is opt-in. Chrome, consent and analytics are untouched.

## 16. Session handoff (`SESSION_HANDOFF_TEMPLATE.md`)

- **Session:** 2026-10-09 · Claude (Opus 5.5) · Principal Frontend Architect / Design Systems / Accessibility / QA · Gate 4 B4.
- **Context read:** `CLAUDE.md`; `CONTEXT_INDEX.md`; `CURRENT_STATE.md` (Gate 4 blocks); `DEC-036`–`DEC-040`; B3 report; QA runbook; known-defects register; `GATE_4_IMPLEMENTATION_SEQUENCE.md` B4; route matrix rows 9–10; design-system architecture §4; both page sources and their legacy components.
- **Completed:** baseline verification and B3 server shutdown; route inventory; before-baseline (content, inventory, DOM, a11y, table, figure text); implementation; fallback calibration; expected-changes declaration; full suite (3 engines); CLS; visuals; cPanel build; this report; `DEC-041`; register, current state and runbook updates; local commits.
- **Tests actually run:** everything cited above. **Not run:** real devices / AT (E1); real GTM container (E6); real print.
- **Stop condition honoured:** no B5 work; no header/footer, consent or GTM change; no LAN preview; no push, merge or deploy; no pricing or copy change.

---

**Addendum (2026-10-09, after this report; nothing above was edited).** The owner accepted B4 with exceptions and closed it under `DEC-042`:
[`GATE_4_B4_OWNER_CLOSURE.md`](GATE_4_B4_OWNER_CLOSURE.md). OBS-13 (§11) is corrected for its seven approved instances; the inherited `CauseZones`
text (§8) is registered as KD-09/KD-10 and deferred; the WebKit H1 difference is recorded as OBS-17. The independent visual review is in
[`gate-4/b4/owner-review/`](gate-4/b4/owner-review/).
