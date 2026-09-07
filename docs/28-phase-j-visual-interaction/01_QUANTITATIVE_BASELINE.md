# PHASE J — QUANTITATIVE BASELINE

**Date:** 2026-09-07 · **Branch:** `test_branch` · **HEAD:** `66dff0e`
**Status:** **VERIFIED FACT** — measured, not estimated.

---

## 1. How these numbers were produced

| | |
|---|---|
| **Target** | The running application — `next dev --webpack`, `http://localhost:3111` |
| **Viewport** | 1425 × 900 CSS px (the WIDE validation width) |
| **Method** | A measurement script executed in the page against the **rendered DOM** |
| **Section definition** | Outermost `<section>` elements inside `<main>`; nested sections are not double-counted |
| **Visible words** | `innerText` of `<main>`, whitespace-split — what a reader actually sees, not source characters |
| **Section class** | `interactive` if it contains a `button`, `[role=tab]`, `details`, `input`, `select` or `textarea`; else `visual` if it contains an `<svg>`, a `<figure>`, or ≥ 6 `aria-hidden` decorative elements; else `text` |
| **Occupancy** | Each text-bearing leaf's horizontal midpoint, bucketed into left / centre / right thirds of the viewport |
| **Left start** | The modal `getBoundingClientRect().left` of a section's text-bearing leaves, rounded to 8 px |

**Known measurement caveats, stated rather than hidden:**

- The `visual` flag counts **any** `<svg>`, so `/privacy-policy` and `/terms` are flagged `visual`
  on what are almost certainly link or list icons, not figures. **Their true figure count is 0.**
  This inflates the site-wide `visual` count by 2 and is corrected wherever it matters below.
- `/launch-checklist` **returns 404** in this environment (the route calls `notFound()` unless
  enabled), so the row captured for it is the 404 page. It is excluded from every commercial total.
- `/blog/[slug]` and `/portfolio/[slug]` have **no entries at launch**. They are **UNKNOWN**, not
  estimated.

---

## 2. Page-by-page baseline

| Route | Sections | Visible words | Paragraphs | Text-led | Visual | Interactive | Longest text-only run | Page height (px) | Occupancy L/C/R |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| `/` | 6 | 648 | 22 | 2 | 2 | **2** | 1 | 7 634 | 71/18/11 |
| `/services` | 9 | 1 275 | 32 | 7 | 2 | 0 | 4 | 8 007 | 47/50/3 |
| `/seo` | 7 | 1 007 | 29 | 6 | 1 | 0 | 4 | 6 225 | 61/39/0 |
| `/ai-seo` | 8 | 1 498 | 39 | 6 | 2 | 0 | 4 | 7 798 | 58/37/6 |
| `/google-ads` | 6 | 677 | 28 | 6 | **0** | 0 | **6** | 4 934 | 58/42/0 |
| `/social-media-ads` | 5 | 399 | 13 | 5 | **0** | 0 | 5 | 3 302 | 83/17/0 |
| `/lead-generation` | 6 | 947 | 30 | 5 | 1 | 0 | 3 | 5 975 | 59/36/5 |
| `/conversion-optimization` | 7 | 815 | 25 | 6 | 1 | 0 | 4 | 5 352 | 63/37/0 |
| `/problems/traffic-but-no-enquiries` | 7 | **1 689** | 40 | 6 | 1 | 0 | 4 | 8 157 | 68/26/6 |
| `/how-it-works` | 10 | **1 789** | 40 | 7 | 3 | 0 | 5 | **10 050** | 76/24/0 |
| `/pricing` | 8 | 1 001 | 25 | 7 | 1 | 0 | 4 | 6 184 | 82/18/0 |
| `/about` | 8 | 708 | 23 | **8** | **0** | 0 | **8** | 5 474 | 81/19/0 |
| `/faq` | 8 | 1 122 | 31 | **8** | **0** | 0 | **8** | 6 429 | 81/19/0 |
| `/contact` | 3 | 212 | 13 | 2 | 0 | 1 | 1 | 2 768 | 89/11/0 |
| `/schedule-call` | 7 | 376 | 14 | **7** | 0 | 0 | **7** | 3 780 | 81/19/0 |
| `/thank-you` | 2 | 53 | 4 | 2 | 0 | 0 | 2 | 1 447 | 71/29/0 |
| `/work` | 3 | 296 | 10 | 3 | 0 | 0 | 3 | 2 653 | 83/17/0 |
| `/blog` | 2 | 100 | 5 | 2 | 0 | 0 | 2 | 1 560 | 78/22/0 |
| `/privacy-policy` | 5 | 848 | 30 | 4 | 1\* | 0 | 3 | 8 273 | 8/92/0 |
| `/terms` | 5 | 901 | 41 | 4 | 1\* | 0 | 3 | 8 377 | 8/92/0 |

\* icon false positive — see §1.

---

## 3. Site-wide totals — the 18 substantive routes

*(Legal pages and the env-gated internal route excluded; they are governed separately and are
correctly reading-first.)*

| Metric | Value |
|---|---|
| Substantive routes measured | **18** |
| Total sections | **112** |
| Total visible words | **14 612** |
| Text-only sections | **95 (84.8%)** |
| Visual sections | **14 (12.5%)** |
| Interactive sections | **3 (2.7%)** |
| **Visual-to-text section ratio** | **0.15 : 1** |
| Routes with **zero** interactive sections | **16 of 18 (89%)** |
| Routes with **zero** visual *and* **zero** interactive sections | **8** — `/google-ads`, `/social-media-ads`, `/about`, `/faq`, `/schedule-call`, `/thank-you`, `/work`, `/blog` |
| Mean longest text-only run | **4.2 sections** |
| Routes breaching the §31 rhythm rule (run > 2) | **12 of 18 (67%)** |

### The left-edge measurement

| Metric | Value |
|---|---|
| Commercial sections measured | **112** |
| Sections whose modal text left-start is **56 px** at 1425 px | **110** |
| **Share** | **98.2%** |
| Distinct modal left-starts across the entire commercial site | **3** (56 px ×110, 56 px-offset ×1, 88 px ×1) |

> **This is the headline number of the Phase J audit.** Ninety-eight per cent of the site's
> sections begin at the same pixel.

### Composition mix, counted

| Composition | Sections |
|---|:--:|
| Single left-aligned column | **~104** |
| Asymmetric or two-column split | 5 (`/services` and `/ai-seo` scope grids, `/how-it-works`) |
| Centred statement | 1 (homepage departure) |
| Full-bleed accent region | 8 (one `CommercialClose` per commercial route) |
| Surface inversion | 3 (homepage hero, homepage close, footer strip) |
| **Sticky / pinned / scroll-scrubbed** | **0** — and this is required, not incidental |

---

## 4. Where the words actually are

Ranked by visible words, the six densest routes hold **8 260 words — 57% of the site's total
commercial copy**:

| Rank | Route | Words | Text-led sections | Figures |
|:--:|---|:--:|:--:|:--:|
| 1 | `/how-it-works` | 1 789 | 7 | 3 |
| 2 | `/problems/traffic-but-no-enquiries` | 1 689 | 6 | 1 |
| 3 | `/ai-seo` | 1 498 | 6 | 2 |
| 4 | `/services` | 1 275 | 7 | 2 |
| 5 | `/faq` | 1 122 | **8** | **0** |
| 6 | `/seo` | 1 007 | 6 | 1 |

**`/faq` is the only route in the top six with no figure at all** — 1 122 words across eight
consecutive text-only sections.

---

## 5. Reusable-shape leverage

The strongest implementation fact in this baseline: **the density is produced by a small number of
shared components, not by twenty bespoke pages.**

| Shared shape | Routes it renders on | Sections it produces |
|---|:--:|:--:|
| `CommercialSection` + `ChapterLabel` + `Display` + `Body` | **18** | ~104 |
| `ScopeList` ("what the work involves") | **6** — `/seo`, `/ai-seo`, `/google-ads`, `/social-media-ads`, `/lead-generation`, `/conversion-optimization` | 6 |
| `BoundaryBlock` | 8 | 8 |
| `CommercialClose` | 11 | 11 |
| `CommercialHero` | 7 | 7 |

> **One change to `CommercialSection`'s composition options reaches ~104 sections.
> One change to `ScopeList` reaches six capability routes.**
> This is why Prototype A targets `ScopeList` rather than a single page.

---

## 6. What is NOT measured, and is not asserted

- No page-speed, Core Web Vitals, LCP, CLS or INP figure appears here. **None was measured in this
  session, and none is invented.**
- No claim is made about bounce, scroll depth, dwell, engagement or conversion rate. Those are
  GA4 questions and Phase J did not open GA4.
- No comparison to any competitor site was made.
- No reader-comprehension study was run. Every comprehension statement in these documents is
  reasoning about structure, labelled as such — never a measured result.
