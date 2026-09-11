# PHASE J — STAGE 3 — THE OPENER SYSTEM (HERO + CLOSE)

**Date:** 2026-09-07 · **Branch:** `test_branch` · **Starting HEAD:** `791ed6e`
**Ruling implemented:** Stage 1 PARTIAL / Stage 2 MATERIAL → approved rollout items 1–4, then stop.
**Status:** **IMPLEMENTED — AWAITING OWNER / ChatGPT REVIEW.**

---

## 1. The problem this closes

After Stage 2, **73 of 112 sections still began at the same left x-coordinate**, and
`08_STAGE1_2_MEASURED_RESULTS.md` §7 identified where they were: **46 of those 73 were not
`CommercialSection` at all** — they were `CommercialHero`, `RouteHero`, `CommercialClose` and
breadcrumb sections, which Stage 1 did not govern. Stage 3 governs the first three.

| Component | Routes |
|---|:--:|
| `CommercialHero` | 7 |
| `RouteHero` | 11 (four of them protected — see §5) |
| `CommercialClose` | 11 |

---

## 2. The binding constraint that shaped every mode

> **I2 / B27 — ZERO APPARATUS ABOVE THE FOLD. No figure, no proof module, no evidence badge, no
> metric, no system preview, on any commercial route, at any width. The rule has no width
> exception.**
> — `docs/16-ux/05_COMMERCIAL_PAGE_UX.md` I2 · `03_PAGE_TYPE_ARCHITECTURE.md` §"First screen" ·
> `32_WIREFRAME_MASTER_COMMERCIAL.md` · restated in `02_PRIMARY_USER_JOURNEYS.md` §51.
>
> `I8 / B30` applies the same prohibition to the CTA region.

**The Stage 3 brief §4 proposed "asymmetric claim + semantic figure", "centered proposition +
lateral support" and "split statement / system preview".** All three would place apparatus in the
first screen and **none of them was built.** Both hero components were deliberately written with
**no figure slot at all**, precisely so a route author could not breach I2 by oversight, and Stage 3
did not add one.

**What was built instead is pure typographic composition** — the eyebrow, the H1, the lede and the
action pair moved relative to one another. Nothing is added to a first screen and nothing is
removed from it. This is a genuine narrowing of the brief and it is recorded as one.

---

## 3. The four opener modes

Declared once, in `components/commercial/primitives.tsx`, and consumed by all three components so
the two heroes cannot drift apart.

| Mode | At ≥ 1081 px | Below 1081 px | Rail holds | Reading column holds |
|---|---|---|---|---|
| **`editorial`** | today's single column — **output unchanged** | unchanged | — | — |
| **`split`** | two columns | single column, DOM order | eyebrow + H1 | lede, bridge, action |
| **`offset`** | two columns, narrower rail | single column, DOM order | eyebrow | H1, lede, action |
| **`centred`** | one centred column, max 74ch | single column, left | — | everything, centred |

### §9 — empty columns are structurally impossible

`split` and `offset` pair (eyebrow + H1) or (eyebrow) against a reading column that always holds
the H1 or the lede. `RouteHero` is the one opener where `lede` and `action` are **both optional**,
so a hero with neither would leave a `split` reading column empty — **that case degrades to
`editorial`** in the component. Verified on the rendered page at 1425 px: every grid on `/seo`,
`/about` and `/faq` has non-empty text in both columns.

### Responsive

Every mode is a single column below 1081 px, in DOM order. **Measured: `/`, `/problems/…`,
`/how-it-works`, `/pricing`, `/contact`, `/schedule-call`, `/thank-you`, `/work` and `/blog` are
byte-identical in height at 390 px before and after Stage 3, and the six capability routes are
within +4 px.**

---

## 4. Semantic assignment

The Stage 3 brief §5 asked for per-subject hero variation — "SEO: signal-oriented", "CRO:
journey-oriented", "analytics: source-to-enquiry". **Under I2/B27 that is not achievable**: a
subject cannot be expressed in a first screen that may contain no figure and no preview. Attempting
it would have meant either breaching the rule or varying the composition on a difference the
composition cannot carry — which is the "meaningless zig-zag" §7 of the Stage 1/2 brief prohibits.

**Composition is therefore assigned by route archetype**, which is a distinction the composition
genuinely expresses:

| Archetype | Hero | Close | Reasoning |
|---|---|---|---|
| **Capability** — `/seo`, `/ai-seo`, `/google-ads`, `/social-media-ads`, `/lead-generation`, `/conversion-optimization` | `split` | `split` | The opener is structurally two-part already: confirm the searched capability (move 1), then bridge to the commercial outcome (move 2). The split renders the page's own move structure |
| **Hub / entity** — `/services`, `/about` | `centred` | `split` / `centred` | One proposition about the whole system or the whole firm, stated once |
| **Question-entered** — `/how-it-works`, `/pricing`, `/faq`, `/problems/…`, `/work`, `/blog` | `offset` | `centred` (where a close exists) | The reader arrives with a question; the eyebrow names the register from the rail and the reading is offset |
| **Conversion** — `/contact`, `/schedule-call`, `/thank-you`, 404 | **unchanged** | — | M6 mandatory stillness. These are not in the changed file set at all |

---

## 5. What Stage 3 did not touch

| | |
|---|---|
| **CTA architecture** | Unchanged. `/contact` primary, `/schedule-call` secondary, through the same `ActionPair`. No third button, no sticky bar, no urgency or scarcity device |
| **Copy** | Zero words changed in any hero or close |
| **DOM order** | Unchanged in every mode. `reverse`-style placement is done with explicit grid columns, never by reordering markup, so the heading always precedes its content |
| **Heading levels** | Unchanged. One `<h1>` on all 18 routes at all 10 widths — 180/180 |
| **JavaScript** | **Zero.** No client component was added by Stage 3. The only client component in `components/commercial/` and `components/routes/` remains Stage 2's `ScopeDisclosure` |
| **Homepage** | Uses neither hero nor the close. `app/page.tsx`, `components/homepage/*` and `components/layout/*` are **not in the Stage 3 diff**, and homepage height is identical at 390, 860 and 1425 |
