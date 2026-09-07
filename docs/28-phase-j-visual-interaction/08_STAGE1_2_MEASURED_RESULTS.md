# PHASE J — STAGE 1 + STAGE 2 — MEASURED RESULTS

**Date:** 2026-09-07 · **Status:** **AWAITING OWNER / ChatGPT REVIEW**

> **Methodology is unchanged from `01_QUANTITATIVE_BASELINE.md`** — same detector, same section
> definition, same occupancy buckets, same 1425 px viewport, same `next dev` server. **The detector
> was not altered to improve the result.** "Before" figures at widths the baseline did not capture
> (390 px, 860 px) were measured by standing the **baseline commit `f9af9ed` up in a git worktree
> on a second dev server** and probing both simultaneously.

---

## 1. Stage 1 — composition, site-wide at 1425 px

| Metric | Before (`f9af9ed`) | After | Difference |
|---|:--:|:--:|:--:|
| Commercial sections | 112 | 112 | 0 |
| **Sections at the modal left-start** | **110** | **73** | **−37** |
| **Modal left-start share** | **98.2%** | **65.2%** | **−33.0 pts** |
| Distinct section left-starts | 3 | **5** | +2 |
| Occupancy — left third | **65%** | **53%** | **−12 pts** |
| Occupancy — centre third | 30% | **43%** | +13 pts |
| Occupancy — right third | 5% | 4% | **−1 pt** |
| Routes with 0% right-third occupancy | 9 of 18 | **9 of 18** | **0** |
| Routes with longest text-only run > 2 | 14 of 18 | **13 of 18** | −1 |
| Split compositions | 0 | **31** | +31 |
| Reverse compositions | 0 | **10** | +10 |
| Wide compositions | 0 | **13** | +13 |
| Centred compositions | 0 | **3** | +3 |
| Single-column (`editorial`) | 66 | **9** | −57 |

> **⚠ CORRECTION.** `01_QUANTITATIVE_BASELINE.md` §3 states "Routes breaching the §31 rhythm rule
> (run > 2): **12** of 18". Recounting its own published per-route figures gives **14 of 18**
> (`/`, `/contact`, `/thank-you` and `/blog` are the four that pass). The corrected baseline of 14
> is used above.

### Left-start histogram

| Position | Before | After |
|---|:--:|:--:|
| **40 px** | **110** | **73** |
| 296 px (split reading column) | 0 | **34** |
| 376 px (statement column) | 0 | **3** |
| 56 px | 1 | 1 |
| 88 px | 1 | 1 |

---

## 2. Stage 2 — page height, by route

| Route | 390 before | 390 after | Δ | 1425 before | 1425 after | Δ | DOM words before | DOM words after |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| `/seo` | 7 773 | **7 295** | **−478 (−6.1%)** | 6 225 | 5 984 | −241 | 1 180 | **1 180** |
| `/ai-seo` | 9 852 | **9 304** | **−548 (−5.6%)** | 7 798 | 7 470 | −328 | 1 408 | **1 408** |
| `/google-ads` | 6 049 | **5 523** | **−526 (−8.7%)** | 4 934 | 4 696 | −238 | 632 | **632** |
| `/lead-generation` | 7 528 | **7 188** | **−340 (−4.5%)** | 5 975 | 5 836 | −139 | 1 158 | **1 158** |
| `/conversion-optimization` | 6 600 | **6 248** | **−352 (−5.3%)** | 5 352 | 5 162 | −190 | 1 003 | **1 003** |
| `/services` *(3 items — excluded by rule)* | 9 900 | 9 896 | −4 | 8 007 | 8 061 | +54 | 1 547 | **1 547** |

`/seo` at 860 px (MEDIUM): **5 792 → 5 444, −348 px.**

> **DOM word count is identical on every route.** That is the content-preservation proof: visible
> word count falls because five of six panels are collapsed, while `textContent` — everything in
> the document, open or closed — does not move by a single word.

### Routes not carrying a ScopeList — mobile is untouched

| Route | 390 before | 390 after | Δ |
|---|:--:|:--:|:--:|
| `/about` | 6 141 | 6 141 | **0** |
| `/faq` | 7 851 | 7 821 | −30 |
| `/pricing` | 7 304 | 7 306 | **+2** |
| `/how-it-works` | 11 978 | 11 980 | **+2** |
| `/problems/traffic-but-no-enquiries` | 10 307 | 10 311 | **+4** |

**Largest mobile increase anywhere on the site: +4 px.** The §24 requirement — that Stage 2 must
not turn concise sections into an interactive mobile tower — is met with a wide margin: every
affected route got **shorter** on mobile, by 340–548 px.

---

## 3. Site-wide interaction and content

| Metric | Before | After | Difference |
|---|:--:|:--:|:--:|
| Interactive sections | 3 | **8** | **+5** |
| Routes with zero interactive sections | 16 of 18 | **11 of 18** | −5 |
| Text-only sections | 95 | 92 | −3 |
| Visible words (site-wide) | 14 612 | 14 074 | −538 |
| **Words in the DOM** | **unchanged on every measured route** | | **0** |
| New dependencies | — | **0** | 0 |
| Client components on commercial routes | 0 | **1** | +1 |
| Client JS added | — | **1 242 bytes** compiled, per route chunk | |

The −538 visible-word figure is **entirely** collapsed `<details>` panels. The re-measurement
contract in `05_IMPLEMENTATION_RECOMMENDATION.md` §4 set a floor of "must not fall below ~14 000":
**14 074, and the DOM total is unchanged**, so no copy was deleted to hit a composition target.

---

## 4. Responsive and regression verification

Every one of the **18 routes** was checked at **all ten** widths — 320, 360, 390, 430, 760, 761,
860, 1080, 1081, 1425 — in a same-origin iframe at the exact target width (180 route×width checks).

| Check | Result |
|---|---|
| **Horizontal overflow** | **0 failures — none, at any width, on any route** |
| **Exactly one `<h1>`** | **180 of 180 pass** |
| Controls under the 40 px target floor | Only pre-existing chrome — a 32×32 header button at `components/layout/Header.tsx:98`, present at ≥ 1080 px on **every** route including untouched ones (`/contact`, `/thank-you`, `/blog`), plus 3 homepage controls. **Neither file was modified by this stage** |
| Chapter-label rails at 1425 px | 31 rails measured; **tallest is 3 lines / 55 px; zero overflow the rail** |
| Split/reverse column population | Both columns carry content in **every** instance — verified on the rendered page |

### Protected conversion routes

`/contact`, `/thank-you` and `/schedule-call` are **not in the changed file set**. Measured at 390:
`/contact` 3 453 px · `/thank-you` 2 146 px · `/schedule-call` 4 333 px, each with one `<h1>`, no
overflow, and no `<details>`. Contact remains form-first, thank-you restrained, schedule functional.

### Homepage

| | |
|---|---|
| Source changed | **NONE** — no homepage file is in the diff |
| Dependency changed | **NONE** — the homepage import graph and the changed file set have an **empty intersection** |
| Rendered delta | **ZERO by construction** |

---

## 5. Protected systems

| System | Status |
|---|---|
| `/api/enquiry`, `lib/`, `db/`, `components/forms/`, `components/analytics/` | **0 files modified** |
| `page_view`, `lead_form_started`, `lead_form_validation_error`, `lead_form_submitted`, `meeting_started` | all present and unmodified in `lib/analytics.ts` |
| New Phase J tracking | **none.** No changed file references `gtag`, `dataLayer`, `lib/analytics` or any event name |
| `robots.ts`, `sitemap.ts`, `next.config.mjs` | **0 files modified** |
| Structured data | `BreadcrumbList` and `FAQPage` emitters untouched; every route still renders exactly one `<h1>` |

---

## 6. Builds

| | Result |
|---|---|
| `npm run build` | **PASS** — 25 routes, all commercial routes still `○ (Static)` |
| `npm run build:cpanel` | **PASS** |
| Warnings | One: *"Next.js inferred your workspace root"*, caused by two lockfiles (`package-lock.json` and `pnpm-lock.yaml`) that **pre-date this stage and were not touched.** No new warning |
| TypeScript | One pre-existing error in `components/forms/CalendlyButton.tsx:55`, **confirmed present at `f9af9ed`** by checking out the baseline. Not introduced here and not in scope to fix |

---

## 7. Did Stage 1 solve the left-heavy problem?

### **PARTIAL — MORE WORK REQUIRED**

**What worked.** The primary metric moved **98.2% → 65.2%**, a 33-point drop, with left-third
occupancy down 12 points and distinct section positions up from 3 to 5. This was achieved with
**one component change, one token per call site, zero copy change, zero JavaScript and zero
motion** — and with mobile within ±4 px of where it was.

**What did not.** Two of the three targets in `05_IMPLEMENTATION_RECOMMENDATION.md` §4 were missed:

- **Right-third occupancy did not improve** (5% → 4%; still 9 routes at zero). The floor was ≤ 4
  routes. J9 moved weight off the left edge into the **centre**, not the right. The reason is
  structural: `split` puts the reading column at x = 296 with a 58ch measure, so the text ends
  around x = 856 — the centre third. Reaching the right third would require either widening the
  measure (prohibited) or placing something in the right margin, and **§9 forbids inventing content
  to fill a column.** On the evidence, *right-third occupancy was the wrong metric for a text site
  with a 58ch measure*; left-third share and distinct-start count are the honest ones.
- **Longest-run breaches barely moved** (14 → 13 routes). Composition does not break a run of
  text-led sections; only a figure or an interaction does, and those are Stage 3+.

**Why 65.2% and not lower.** Of the 73 sections still at x = 40, **46 are not `CommercialSection`
at all** — they are `CommercialHero`, `CommercialClose`, `RouteHero` and breadcrumb sections, which
Stage 1 did not govern. The remaining 27 are `wide`, `reverse` and `editorial` sections where the
content legitimately begins at the container edge. **J9 has very nearly exhausted what it can reach
without touching the hero and close components** — which would change the opening and closing of
every commercial page and is not Stage 1 scope.

## 8. Did Stage 2 solve the ScopeList reading burden?

### **YES — MATERIAL IMPROVEMENT**

- Mobile height down **340–548 px (−4.5% to −8.7%)** on all five disclosed routes; **+4 px is the
  worst regression anywhere on the site.**
- **DOM word count identical on every route** — nothing was deleted to achieve it.
- Interactive sections **3 → 8**; routes with no interaction **16 → 11**.
- No-JS is **complete**: every `<details>` ships `open`, zero hidden.
- The regression that killed Prototype A **cannot recur**: 25 rapid clicks plus full cycles on all
  five routes leave items, panels and DOM text byte-identical.
- Cost: **1 242 bytes** of client JS and one client component. No dependency, no observer, no loop.
- `/services` was correctly excluded by rule, not by exception.

---

## 9. Recommended next rollout — NOT implemented

Ordered by measured evidence from this stage only:

1. **Close the remaining left-edge share** by giving `CommercialHero` and `CommercialClose` the
   same mode treatment — **46 of the 73 remaining sections at x = 40 are these two components.**
   This is the single largest remaining composition lever and needs an owner ruling because it
   changes the opening and closing of every commercial page.
2. **`/faq`** — 8 sections, 8 text-only, 1 122 words, still the densest figure-less route.
   `<details>` disclosure is directly transferable from Stage 2 (`FAQPage` structured data must be
   re-verified).
3. **`/about`** — still 8/8 text-only; Prototype C (J7) is approved and unrolled.
4. **`/how-it-works`** — still the tallest page at 11 980 px on mobile.
5. Reconsider the right-third occupancy target, or replace it with left-third share.

**None of this is authorised. Stage 3 requires a fresh owner / ChatGPT ruling.**
