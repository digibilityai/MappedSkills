# Session 21 — Production Validation Gates and Performance Budget

**Session:** 21 · **Date:** 2026-09-04 · **Status:** **PLANNING ARTEFACT — PROPOSED.**

These gates govern **production rollout**. They do not replace, reopen or reinterpret Gates 1–10.
**A gate is passed by the orchestrator on measured evidence. A worker may report, never pass.**

**Scope column:** **PAGE** = testable page-by-page as each ships · **SITE** = only meaningful
across the whole application · **BOTH** = per page during rollout, then once site-wide before
launch.

---

## 1. The gates

| # | Gate | Scope | Passes when — measured, not argued |
|---:|---|:--:|---|
| **P1** | **Visual parity** | PAGE | Chapter order, composition and hierarchy match the approved baseline. **F2 ≥ 5.0× WIDE / ≥ 2.0× NARROW**; **F3** per `docs/17-visual-validation/09_VISUAL_WEIGHT_RUBRIC.md`, **used unchanged** |
| **P2** | **Responsive parity** | PAGE | At **360, 390, 430, 760, 761, 860, 1080, 1425**: **0 horizontal overflow** · block order unchanged · **exactly one F1 drawing visible per width, verified by measuring rendered widths** · no measure exceeds 58ch |
| **P3** | **Accessibility** | BOTH | **0 contrast failures** · **exactly 1 `<h1>`, 0 heading jumps** · **0 targets < 40×40** · **0 interactive elements nested inside interactive elements** · valid tab/tabpanel pairing with a **roving `tabindex` (1 tab stop)** and Home/End/arrows · collapsed panels `inert` · focus visible everywhere · the one focus containment is escapable · skip link present and working |
| **P4** | **Reduced motion** | PAGE | The page **opens resolved, it does not freeze** · lattice never built · departure removed, not played instantly · **all stage panels open, nothing `inert`** · **the signature control still works** · **contrast re-tested in this mode** (19A found a 2.66:1 failure against a 3:1 floor) |
| **P5** | **No-JS meaning** | PAGE | Every resolved state shown · evidence substrate open · **all 7 capability links visible and tabbable** · all 3 tabs tabbable, 0 `inert` · chain drawn · honesty dashes render at `5px,5px` · **all copy, navigation and actions present** · **navigation operable** |
| **P6** | **Motion budget** | PAGE | Tier counts on the **rendered** page ≤ `02_RESOLVE_MOTION_BUDGET.md` §5. Homepage: **T1 1 · T2 ≤3 · T3 4 · sig 1 · ambient 0 · pinned 0**. Site-wide: **0 `infinite`, 0 `position:fixed`, 0 `position:sticky`, 0 canvas, 0 WebGL, 0 animation libraries**. **M1–M7 audited** |
| **P7** | **Quantity and evidence safety** | PAGE | **No bar, width, count or magnitude that is not a measured fact.** Run lengths encode *how far a route gets*, never *how much demand exists*, and the standing note says so. Every number carries sample, date, location and method. **0 fabricated case studies, testimonials, logos, awards, ratings or business-performance metrics** |
| **P8** | **Content integrity** | PAGE | Copy matches the approved page copy. **Every blocked slot renders nothing** — no placeholder, no empty container, no silhouette, no "coming soon". **No plausible default has been substituted, and no structure has been reshaped to stop needing a blocked fact** |
| **P9** | **Route integrity** | SITE | Every current URL resolves · **no redirect chain** · `/results/:slug` lands directly on `/work/:slug` · sitemap matches indexable reality · **`/work` `noindex` and absent from the sitemap while it renders zero studies** · `not-found` links are generated from live routes and **0 of them 404** |
| **P10** | **Forms** | SITE | A real submission is **durably persisted and retrievable** · success shows **only after confirmed persistence** · values survive a forced server error · a double-tap creates **one** record · **no budget field** · spam sees the same success state · keyboard-only completion works · booking creates a server-confirmed record |
| **P11** | **Analytics** | SITE | **0 PII in any `dataLayer` payload, verified by inspecting the live queue** · **0 conversion events fire from the client** · both ★ events fire server-side on confirmed persistence/webhook · no analytics before consent · `page_path` never carries a query string · `attribution_status` never affects `qualification_status` |
| **P12** | **SEO** | BOTH | Unique title/description/canonical per route · **no prohibited claim in any title** (`300%+ ROI`) · JSON-LD valid and present on commercial routes · **entity schema renders nothing while NAP is blocked** — the malformed `postalCode` is not carried forward · OG/Twitter complete |
| **P13** | **Performance** | PAGE | §7 budget met on **measured real hardware**. **No fabricated score.** |
| **P14** | **Build** | SITE | `npm run build` succeeds · `build:cpanel` succeeds under its 512 MB / single-worker constraints · **the type checker is green with `ignoreBuildErrors` removed** |
| **P15** | **Deployment readiness** | SITE | Live response headers verified (**including the caching rule**) · consent live · www/apex canonical redirect · env vars present · a rollback path exists and has been exercised at least once |

## 2. Testing cadence

- **P1–P8** run **per page, as it ships.** They are the rollout's working loop.
- **P9, P12** run per page for that page's own metadata, then **once site-wide** before launch.
- **P10, P11, P14, P15** are **site-wide only** and gate launch, not individual pages.
- **P13** runs per page **and** as a site-wide budget at the end.

## 3. The eight-width regression set

**360 · 390 · 430 · 760 · 761 · 860 · 1080 · 1425.**

Deliberately dense around the thresholds: **760/761** brackets the 18C de-clutter boundary and
**1080** the nav switch. Testing 375 and 1440 instead would step straight over both.

## 4. Modes that must each be tested as a rendered mode

**Default · reduced motion · no JavaScript · 200% text resize · forced dark (must **not** invert
the direction — `color-scheme: light` is declared for exactly this reason) · print.**

## 5. Still outstanding from Gate 10, and carried here

Never performed by this programme, and **not closed by any gate so far**:
**real-hardware performance profiling and Core Web Vitals** · **screen-reader testing** ·
**real-device testing** · **cross-browser testing** · **print** · **200% text resize** ·
**user testing.** None of these may be reported as passed without being run.

## 6. What a worker may and may not report

**May:** measured counts, rendered measurements, raw headers, build output, and a
CONFORMS / DOES NOT CONFORM verdict per gate with the evidence attached.
**May not:** pass a gate · claim a test ran that did not · report a performance score that was not
measured · describe an unmeasured baseline as a result.

---

## 7. Performance budget

**There is no measured baseline.** No performance profiling, Lighthouse run or Core Web Vitals
measurement exists for this application, and **none is invented here.** Every figure below is a
**TARGET**, and the first task of Phase I is to establish the baseline that these are checked
against.

### 7.1 JavaScript added by the redesign

| Item | Target |
|---|---|
| **New animation dependencies** | **0** — determined, not assumed (`04_MOTION_IMPLEMENTATION.md` §1) |
| **New client JS shipped for the homepage redesign** | **≤ 15 KB gzipped**, across all five client leaves plus the two hooks. *(The prototype's entire behaviour is ~250 lines of vanilla JS; 15 KB is generous for its TypeScript/React equivalent and is a ceiling, not a goal)* |
| **Client leaves on `/`** | **≤ 5** |
| **Existing bundle** | **Expected to fall.** Retiring `HeroDashboard`, `SocialProofStrip`, the card set, `recharts`, `embla`, `vaul`, `cmdk` and `react-day-picker` removes more than the redesign adds. **This must be measured, not assumed** |

### 7.2 Animation and main-thread cost

| Item | Target |
|---|---|
| Properties animated | **`transform` and `opacity` only.** Any layout-triggering property is a defect |
| Scroll handlers per page | **≤ 1**, `rAF`-throttled, `{passive:true}`, writing **≤ 2 properties** |
| Long tasks during the hero resolve | **0 tasks > 50 ms** |
| Dropped frames during the T1 on a **mid-range Android device** | **< 5%** |
| Steady-state cost when idle | **0** — nothing loops, nothing is ambient, off-screen is still |
| Lattice construction | **After first paint**, `DocumentFragment`, capped at **440** nodes; **skipped entirely under reduced motion**. The 440 cap is **prototype evidence, not a production limit** — it may need to fall after profiling |
| `resize` | Debounced ≥ 180 ms, `{passive:true}` |

### 7.3 Core Web Vitals — targets

| Metric | Target | Note |
|---|---|---|
| **LCP** | **≤ 2.5 s** at p75 on mobile | The LCP element is the H1, which is **server-rendered text**. **The lattice must never be the LCP element** |
| **CLS** | **≤ 0.05**, and **0 from the redesign's own motion** | Nothing animates layout. The re-read question block **reserves 4.4em** so no reading shifts the layout — that reservation is load-bearing and must be carried across |
| **INP** | **≤ 200 ms** at p75 | The two controls are class/attribute swaps. `TrafficEnquiriesControl` re-resolves tokens on one subtree, which must be verified against INP on the **cheapest** supported device |
| **TTFB** | **≤ 800 ms** | Governed by the cPanel Node host, not the redesign |

### 7.4 Fonts

| Item | Target |
|---|---|
| Families | **2** — Bricolage Grotesque (display), Manrope (body). **No third family. No monospace** |
| Loading | `next/font/google`, **self-hosted and preloaded**, `display: 'swap'` |
| Subsets | `latin` only |
| Weights | Display **800** only; body only the weights actually used (400/600/700) |
| **Total font bytes** | **≤ 120 KB** across both families. Bricolage Grotesque is variable and **will exceed this if shipped unsubset** |
| FOUT | Accepted. **`display: 'block'` is not permitted** — it trades a visible swap for a blank LCP |

### 7.5 Images

| Item | Target |
|---|---|
| Images on `/` | **0** — the approved page renders **0 `<img>`, 0 canvas, 0 WebGL, 0 autoplay video** |
| Images elsewhere | `images.unoptimized: true` is a **later-optimisation** item, relevant only to `/blog` and `/work` |

### 7.6 DOM complexity

| Item | Target |
|---|---|
| Homepage DOM nodes, **resolved state** | **≤ 2,000** |
| Lattice marks | **≤ 440**, and **0 under reduced motion** |
| Maximum DOM depth | **≤ 20** |
| Nodes added by client JS | **Only the lattice.** No copy, link or figure may be created by client JavaScript |

### 7.7 The honesty clause

> **No performance number may be reported as achieved until it has been measured on real hardware.**
> Until Phase I runs, the correct statement about this application's performance is
> **"UNKNOWN — not measured."**
