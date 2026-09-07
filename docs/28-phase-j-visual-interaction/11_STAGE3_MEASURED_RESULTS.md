# PHASE J — STAGE 3 — MEASURED RESULTS

**Date:** 2026-09-07 · **Status:** **AWAITING OWNER / ChatGPT REVIEW**

---

## 1. Method — and the one change to it, declared

Three states were measured **live and side by side**, each in its own git worktree on its own dev
server, so no figure in this document is carried over or inferred:

| Server | Commit | State |
|---|---|---|
| `:3113` | `f9af9ed` | original Phase J baseline |
| `:3112` | `791ed6e` | after Stage 1 + Stage 2 |
| `:3111` | working tree | after Stage 3 |

Server identity was verified before measuring (`/faq` `<details>` count: 0 / 0 / 11; `/seo`: 0 / 6 / 6).

**One methodology change, declared rather than buried.** Composition metrics are now measured in a
**sandboxed same-origin iframe** at an exact 1425 px, rather than in the top-level viewport. The
reason is mechanical, not cosmetic: the top-level probe was being terminated mid-run by the dev
server, and a sandboxed frame blocks the top-navigation that was killing it. **The same detector
logic, section definition and occupancy buckets are used, and all three states were re-measured
with it** — so the series below is internally consistent. It differs slightly from the figures
published in `01`/`08`, which were taken in the top-level viewport:

| | Published (top-level) | Re-measured (sandboxed) |
|---|:--:|:--:|
| Baseline modal left-start | 110 / 112 = 98.2% | **109 / 112 = 97.3%** |
| Stage 2 modal left-start | 73 / 112 = 65.2% | **72 / 112 = 64.3%** |

The one-section difference is the homepage's client leaves. **Both series tell the same story; the
sandboxed one is used below because it is the only one measured identically across all three
states.**

### The new metric — LEFT-THIRD DOMINANCE (LTD)

§21 asked for a better metric than right-third occupancy, kept alongside it rather than replacing
it. Defined transparently, from rendered geometry:

> For each `<section>`, take every text-bearing leaf element (`p, h1–h4, li, a, button, summary`)
> that is non-empty and has non-zero width. Take each leaf's **horizontal midpoint**. A section is
> **left-dominant** when **more than 50%** of its leaves have their midpoint in the **left third**
> of a 1425 px viewport (x < 475). **LTD = left-dominant sections ÷ all sections.**

It answers the question right-third occupancy could not: *does this section read as left-weighted?*
— which is what the audit was actually about. Right-third occupancy is retained unchanged.

---

## 2. Site-wide composition — three states

| Metric | Baseline `f9af9ed` | After Stage 2 | **After Stage 3** |
|---|:--:|:--:|:--:|
| Sections measured | 112 | 112 | 112 |
| Sections at the modal left-start | 109 | 72 | **57** |
| **Modal left-start share** | **97.3%** | **64.3%** | **50.9%** |
| Distinct section left-starts | 4 | 6 | **9** |
| **Left-third dominant sections (LTD)** | **94** | 60 | **35** |
| **LTD share** | **83.9%** | **53.6%** | **31.3%** |
| Occupancy — left third | **68%** | 53% | **43%** |
| Occupancy — centre third | 29% | 44% | **53%** |
| Occupancy — right third | 3% | 4% | **4%** |
| Routes with 0% right-third occupancy | 13 | 9 | **9** |
| Routes with a text-only run > 2 | 14 | 13 | **12** |
| Horizontal overflow | 0 | 0 | **0** |
| Routes without exactly one `<h1>` | 0 | 0 | **0** |

### Left-start histogram, after Stage 3

| Position | Sections |
|---|:--:|
| 40 px | 57 |
| 296 px | 35 |
| 272 px | 6 |
| 360 px | 6 |
| 376 px | 3 |
| 392 px | 2 |
| *(three further positions)* | 3 |

---

## 3. Page height — Stage 2 → Stage 3, identical method

| Route | 390 before | 390 after | Δ | 860 before | 860 after | Δ | 1425 before | 1425 after | Δ |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| **`/faq`** | 8 020 | **4 290** | **−3 730 (−46.5%)** | 5 680 | **3 440** | **−2 240 (−39.4%)** | 6 100 | **3 820** | **−2 280 (−37.4%)** |
| `/about` | 6 246 | 6 275 | **+29** | 4 871 | 4 881 | +10 | 5 292 | **5 205** | −87 |
| `/services` | 10 082 | 10 083 | +1 | 8 049 | 8 042 | −7 | 8 061 | **7 923** | −138 |
| `/seo` | 7 371 | 7 373 | +2 | 5 444 | 5 423 | −21 | 5 984 | **5 686** | −298 |
| `/ai-seo` | 9 419 | 9 422 | +3 | 6 825 | 6 791 | −34 | 7 470 | **7 301** | −169 |
| `/google-ads` | 5 548 | 5 551 | +3 | 4 288 | 4 261 | −27 | 4 696 | **4 421** | −275 |
| `/social-media-ads` | 4 258 | 4 260 | +2 | 3 121 | 3 100 | −21 | 3 265 | **2 928** | −337 |
| `/lead-generation` | 7 386 | 7 390 | +4 | 5 632 | 5 605 | −27 | 5 836 | **5 730** | −106 |
| `/conversion-optimization` | 6 307 | 6 310 | +3 | 4 701 | 4 673 | −28 | 5 162 | **5 051** | −111 |
| `/problems/…` | 10 574 | 10 574 | **0** | 7 688 | 7 688 | 0 | 8 080 | **8 039** | −41 |
| `/how-it-works` | 12 312 | 12 312 | **0** | 8 804 | 8 804 | 0 | 9 848 | **9 807** | −41 |
| `/pricing` | 7 445 | 7 445 | **0** | 5 655 | 5 655 | 0 | 6 054 | **6 014** | −40 |
| `/work` | 3 549 | 3 549 | **0** | 2 551 | 2 551 | 0 | 2 581 | **2 540** | −41 |
| `/blog` | 2 373 | 2 373 | **0** | 1 681 | 1 681 | 0 | 1 523 | **1 483** | −40 |
| **`/` (homepage)** | 7 758 | **7 758** | **0** | 7 179 | **7 179** | **0** | 7 634 | **7 634** | **0** |
| `/contact` | 3 479 | **3 479** | **0** | 2 788 | **2 788** | **0** | 2 768 | **2 768** | **0** |
| `/schedule-call` | 4 386 | **4 386** | **0** | 3 414 | **3 414** | **0** | 3 780 | **3 780** | **0** |
| `/thank-you` | 2 173 | **2 173** | **0** | 1 552 | **1 552** | **0** | 1 447 | **1 447** | **0** |

**Every affected route is shorter at 1425 px. The largest mobile increase anywhere is +29 px, on
`/about`, and it is the two column headings.** The homepage and all three conversion surfaces are
byte-identical at every width.

### Content retention

DOM word count (`textContent` — everything in the document, open or closed):

| Route | Before | After |
|---|:--:|:--:|
| `/faq` | 2 015 | **2 015** |
| `/about` | 666 | **671** *(+5: the two column labels)* |
| every other route | — | **unchanged** |

`/faq`'s *visible* word count falls 1 122 → 233 because eleven answers are collapsed. **Not one word
left the document.**

---

## 4. Responsive verification

Every one of the **18 routes** at **all ten widths** — 320, 360, 390, 430, 760, 761, 860, 1080,
1081, 1425 — **180 route × width checks**.

| Check | Result |
|---|---|
| Horizontal overflow | **0 failures at any width on any route** |
| Exactly one `<h1>` | **180 / 180** |
| Controls under the 40 px target floor | Only **3 on the homepage**, at widths below 1425. `app/page.tsx`, `components/homepage/*` and `components/layout/*` are **not in the Stage 3 diff**, so these are pre-existing |
| Two-column modes populated on both sides | Verified on the rendered page — `/seo`, `/about`, `/faq`: every grid non-empty on both sides |
| `StateComparison` half widths at 1425 | **611 px and 611 px** — equal, with a 1 px rule between |
| Chapter-label rails | No overflow |

---

## 5. Accessibility, motion and protection

| | |
|---|---|
| Keyboard | `<details>`/`<summary>` native — focusable, Enter/Space toggle. Stage 2's ScopeList keyboard behaviour unchanged |
| Touch | Whole summary row is the control; no target under 40 px introduced |
| Focus | Unchanged global 3 px ink outline |
| Screen reader | `<summary>` exposes its own expanded state; `StateComparison` names both halves with real `<h3>` headings; the boundary rule is `aria-hidden` and carries no meaning alone |
| Reading order | Unchanged — every mode places columns by explicit grid position, never by reordering markup |
| Reduced motion | **One** transition added in the whole of Stage 3 (180 ms, the FAQ affordance). Covered by the global `prefers-reduced-motion` floor. `StateComparison` and every opener mode have **no motion at all** |
| No-JS | `/faq` collapsed by the **server**, and `<details>` opens without script. Hero, close and `StateComparison` are pure CSS |
| New client components | **0** |
| New dependencies | **0** |
| JS delta | **0 bytes** |
| Observers, loops, timers | **0** |
| Analytics | No changed file references `gtag`, `dataLayer`, `lib/analytics` or any event name. `lib/`, `app/api/`, `components/analytics/`, `components/forms/`, `db/`, `robots.ts`, `sitemap.ts`, `next.config.mjs` and both CSS files: **0 files modified** |
| Proof discipline | 0 fabricated metrics · 0 unsupported claims · 0 performance-implying geometry · 0 fake company facts · 0 client data |
| Builds | `npm run build` **PASS**, `npm run build:cpanel` **PASS**, 27 routes. One warning — the two-lockfile workspace-root notice — **present before Stage 3 and unchanged**. One pre-existing TypeScript error in `components/forms/CalendlyButton.tsx:55`, confirmed at `f9af9ed`, untouched |

---

## 6. Assessment

### Did Stage 3 materially solve the remaining site-wide left-heavy problem?

## **YES — MATERIAL IMPROVEMENT**

**Evidence.**

- **Left-third dominance — the metric that actually describes the complaint — fell from 83.9% of
  sections at the baseline to 31.3%.** Stage 3 alone took it from 53.6% to 31.3%.
- Modal left-start share **64.3% → 50.9%**; across the programme **97.3% → 50.9%**.
- Distinct section left-starts **4 → 9**.
- Left-third occupancy **68% → 43%** across the programme; centre-third **29% → 53%**.
- Achieved with **zero JavaScript, zero new dependencies, zero copy change in any hero or close,
  and six words added on `/about`**.
- No cost anywhere: every affected route is **shorter** at 1425 px, `/faq` is **46.5% shorter on
  mobile**, and the worst mobile regression on the site is **+29 px**.

**Stated against it, because it is still true:** right-third occupancy is unchanged at 4%, and nine
routes still place no text there. That is a property of a 58ch reading measure, not a defect this
stage failed to fix — text set to a readable line length inside a 1400 px container lands in the
centre. **LTD was introduced precisely because right-third occupancy cannot express this, and LTD
moved decisively.** The honest reading is that the metric, not the site, was the problem — and the
old metric is retained above so the owner can judge that claim rather than take it.

**Also still true:** 57 sections remain at 40 px. They are now overwhelmingly `wide`, `reverse` and
`editorial` sections where content legitimately begins at the container edge, plus breadcrumb
navs. There is no large untouched shared component left.

---

## 7. Recommended next step — NOT implemented

1. **Resolve `/how-it-works`** — it is the only approved Stage 3 item that produced no bespoke
   change, and both blockers are owner decisions (see `10_…` §3.4). It is also still the tallest
   page on the site at 12 312 px on mobile.
2. **`/problems/traffic-but-no-enquiries`** — now the densest untouched route: 2 011 DOM words, a
   text-only run of 4, and 10 574 px on mobile.
3. **`/pricing` and `/lead-generation`** — `StateComparison` transfers directly to
   *"what raises / what lowers"* and to the qualified-enquiry boundary.
4. **Re-examine the four routes still showing a text-only run > 2 after composition alone.**

**None of this is authorised. Stage 4 requires a fresh owner / ChatGPT ruling.**
