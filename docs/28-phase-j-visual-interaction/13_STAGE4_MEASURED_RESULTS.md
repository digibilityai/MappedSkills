# PHASE J — STAGE 4 — MEASURED RESULTS

**Date:** 2026-09-07 · **Status:** **AWAITING OWNER / ChatGPT REVIEW**

---

## 1. Method — unchanged from Stage 3, and re-validated

Three states measured **live and side by side**, each in its own git worktree on its own dev server,
with the **same sandboxed-iframe detector, same section definition, same occupancy buckets, same
1425 px frame** used in `11_STAGE3_MEASURED_RESULTS.md`. **The detector was not altered.**

| Server | Commit | State |
|---|---|---|
| `:3113` | `f9af9ed` | original Phase J baseline |
| `:3112` | `01cf53f` | after Stage 3 |
| `:3111` | working tree | after Stage 4 |

Identity verified before measuring — `/how-it-works` "Accountable up to here": present on 3111 only.

> **A methodology note that resolves a discrepancy in `11_`.** Stage 3's composition sweep ran with
> the iframe's scripts **disabled**, which produced a baseline of 109 / 97.3%. This run allows
> scripts inside the sandbox, and reproduces the **originally published baseline exactly: 110 / 112
> = 98.2%**. The Stage 4 series below is therefore consistent with `01_QUANTITATIVE_BASELINE.md`
> as well as with itself. Stage 3's own figures are restated here on this basis.

### The primary metric

Per the Stage 3 ruling, **LEFT-THIRD DOMINANCE** is now primary and right-third occupancy is
retained **for historical continuity only**. LTD is unchanged from its Stage 3 definition: a section
is left-dominant when **more than 50%** of its text-bearing leaves have their horizontal midpoint in
the left third of a 1425 px viewport.

---

## 2. Site-wide — three states

| Metric | Original baseline | After Stage 3 | **After Stage 4** | Stage 4 Δ |
|---|:--:|:--:|:--:|:--:|
| Sections | 112 | 112 | 112 | 0 |
| **LEFT-THIRD DOMINANCE (count)** | **94** | 35 | **34** | **−1** |
| **LEFT-THIRD DOMINANCE (%)** | **83.9%** | 31.3% | **30.4%** | **−0.9 pts** |
| Modal left-start count | 110 | 58 | **57** | −1 |
| Modal left-start % | 98.2% | 51.8% | **50.9%** | −0.9 pts |
| Distinct left-starts | 3 | 8 | **9** | +1 |
| Occupancy L / C / R | 68/29/3 | 43/53/4 | **42/53/5** | L −1 |
| Text-only sections | 95 | 86 | **86** | **0** |
| Visual sections | 14 | 13 | **13** | **0** |
| Interactive sections | 3 | 13 | **13** | 0 |
| Routes with text-only run > 2 | 14 | 12 | **12** | **0** |
| *Right-third occupancy (historical only)* | *3%* | *4%* | *5%* | *+1* |

**Stage 4's site-wide effect is under one percentage point on every composition metric, and zero on
section classification and on text-only runs.**

---

## 3. The four targets

### Left-third dominant sections, per route

| Route | Baseline | Stage 3 | Stage 4 |
|---|:--:|:--:|:--:|
| `/how-it-works` | 9 | 3 | **2** |
| `/problems/traffic-but-no-enquiries` | 7 | 4 | **4** |
| `/pricing` | 8 | 2 | **2** |
| `/lead-generation` | 4 | 1 | **1** |

### Sections, runs and content

| Route | Text-led | Visual | Run | DOM words (S3 → S4) |
|---|:--:|:--:|:--:|:--:|
| `/how-it-works` | 7 → **7** | 3 → **3** | 5 → **5** | 2 327 → **2 363** (+36) |
| `/problems/…` | 6 → **6** | 1 → **1** | 4 → **4** | 2 011 → **2 003** (−8) |
| `/pricing` | 7 → **7** | 1 → **1** | 4 → **4** | 936 → **936** (0) |
| `/lead-generation` | 5 → **5** | 0 → **0** | 3 → **3** | 1 158 → **1 158** (0) |

### Page height

| Route | 390 S3 | 390 S4 | Δ | 860 S3 | 860 S4 | Δ | 1425 S3 | 1425 S4 | Δ | *vs original baseline @1425* |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| `/how-it-works` | 12 312 | 12 841 | **+529 (+4.3%)** | 8 804 | 9 070 | +266 | 9 807 | 10 107 | +300 | *10 050 → 10 107, **+57*** |
| `/problems/…` | 10 574 | 10 805 | **+231 (+2.2%)** | 7 688 | 7 937 | +249 | 8 039 | 8 343 | +304 | *8 157 → 8 343, **+186*** |
| `/pricing` | 7 445 | 7 498 | +53 (+0.7%) | 5 655 | 5 681 | +26 | 6 014 | 6 040 | +26 | *6 184 → 6 040, **−144*** |
| `/lead-generation` | 7 390 | 7 390 | **0** | 5 605 | 5 605 | **0** | 5 730 | 5 730 | **0** | *5 975 → 5 730, **−245*** |
| **`/` (homepage)** | 7 758 | **7 758** | **0** | 7 179 | **7 179** | **0** | 7 634 | **7 634** | **0** | *unchanged* |
| `/contact` | 3 479 | **3 479** | **0** | 2 788 | **2 788** | **0** | 2 768 | **2 768** | **0** | — |
| `/thank-you` | 2 173 | **2 173** | **0** | 1 552 | **1 552** | **0** | 1 447 | **1 447** | **0** | — |
| `/schedule-call` | 4 386 | **4 386** | **0** | 3 414 | **3 414** | **0** | 3 780 | **3 780** | **0** | — |

**Stage 4 makes two pages taller.** The worst case is `/how-it-works` at **+529 px (+4.3%) on
mobile**. Against the *original* Phase J baseline the same page is **+57 px** — essentially flat —
because Stage 3 had made it shorter first. Both framings are shown; neither is hidden.

---

## 4. Responsive verification

**18 routes × 10 widths = 180 checks** at 320 · 360 · 390 · 430 · 760 · 761 · 860 · 1080 · 1081 · 1425.

| Check | Result |
|---|---|
| Horizontal overflow | **0 failures at any width on any route** |
| Exactly one `<h1>` | **180 / 180** |
| **Heading-order jumps** (a skipped level inside `<main>`) | **0 at every width** — newly added to the sweep for Stage 4 |
| Controls under the 40 px floor | Only **3 on the homepage**, below 1425 px — pre-existing; `app/page.tsx`, `components/homepage/*` and `components/layout/*` are not in the Stage 4 diff |
| Collision / clipping | None observed; no route scrolls horizontally and no figure is cut |

---

## 5. Accessibility, protection and performance

| | |
|---|---|
| Semantic structure | `StageSystem` is an `<ol>` of three `<li>`, each an `<h3>` plus a `<ul>` of its points, inside a `<figure>` with a visible `<figcaption>`. Reading order is stage → that stage's points, in document order |
| Screen reader | No ARIA added and none needed. Marks are `aria-hidden`; every mark's meaning is in adjacent text |
| No-JS | **Complete.** All Stage 4 content is server-rendered — verified by string match on the served HTML for all three stage names, all six point labels, the boundary label, the beyond-note and all five `/problems` symptoms |
| Reduced motion | **No motion added anywhere in Stage 4** — `git diff` shows **0** added lines containing `transition`, `@keyframes`, `IntersectionObserver`, `requestAnimationFrame`, `useEffect`, `useState`, `addEventListener` or `'use client'` |
| Keyboard | No new controls exist, so nothing new to operate |
| New dependencies | **0** · New client components | **0** · JS delta | **0 bytes** · Loops | **0** |
| Homepage | Source delta **NONE** (not in the diff); rendered height delta **ZERO** at 390, 860 and 1425 |
| Protected systems | `lib/`, `app/api/`, `components/analytics/`, `components/forms/`, `db/`, `robots.ts`, `sitemap.ts`, `next.config.mjs`, both CSS files, `app/page.tsx`, `components/homepage/`, `components/layout/`: **0 files modified** |
| Analytics | No changed file references `gtag`, `dataLayer`, `lib/analytics` or any event name. The five events are untouched |
| Proof discipline | 0 fabricated metrics · 0 unsupported results · 0 fake pricing · 0 performance-implying geometry · 0 fake company facts · 0 client data |
| Builds | `npm run build` **PASS** · `npm run build:cpanel` **PASS** · one warning (two lockfiles), **present before Stage 4 and unchanged** · one pre-existing TypeScript error in `components/forms/CalendlyButton.tsx:55`, confirmed at `f9af9ed` |

---

## 6. The five success questions

**A. Did `/how-it-works` become understandable faster without unsupported content?**
**YES on comprehension, at a height cost.** The three stages, the six points grouped under them, and
the accountability rule in its true position are now readable in one glance, above the detailed
chain. **Nothing unsupported was added**: every string is either one of the site's three published
stage names or one of the page's own existing point labels, and the grouping is the one the approved
`/services` figure already states. §2 remains blocked and still renders nothing.
**Cost: +529 px at 390 px (+4.3%), +36 DOM words. Left-third dominant sections 3 → 2.**

**B. Did `/problems/traffic-but-no-enquiries` materially reduce its text-only run?**
**NO. The run is unchanged at 4.** It gained structure — the display line's "five" is now literally
five rows, and the `anonymous` mark carries the section's own argument — at **+231 px (+2.2%)** and
**−8 words**. The run is in the page's tail, which is `FindingList` content the governance forbids
collapsing.

**C. Did `/pricing` gain useful visual composition without inventing commercial facts?**
**MARGINALLY, and no commercial fact was invented.** `StateComparison` was correctly judged
unjustified: the page's genuine contrast already ships as an accessible `<table>`, and replacing it
would be a regression. The change is mark vocabulary only — **+53 px at 390, 0 words**.

**D. Did `/lead-generation` gain useful visual explanation without implying performance?**
**NO CHANGE WAS MADE, deliberately.** Its enquiry → qualified-enquiry state is already the binding
taxonomy's assigned figure (F1 class C, `ChainTerminus`). A second treatment of one idea is the
failure that taxonomy exists to prevent. **Nothing implies performance because nothing was added.**

**E. Did site-wide left-third dominance materially improve again?**
**NO. 31.3% → 30.4%, a 0.9-point move.** Across the whole programme it is 83.9% → 30.4%, but
**Stage 4 contributed almost none of that.**

---

## 7. Assessment

### **PARTIAL — MORE WORK REQUIRED**

**For it:** the one explicitly unblocked, explicitly approved item — the `/how-it-works` three-stage
system — was built, is static, adds zero JavaScript, and is sourced entirely from content the site
already publishes. Two targets were assessed rigorously and correctly received nothing rather than a
forced primitive. Homepage and all three conversion surfaces are byte-identical. 180/180 responsive
checks clean, including a heading-order check added this stage.

**Against it, plainly:** Stage 4 moved **left-third dominance by 0.9 points, text-only sections by
zero, visual sections by zero and long text-only runs by zero**, and made two pages taller. Measured
purely on composition, **Stage 4 is close to a null result.** Its value is comprehension on one
page, which this programme has no instrument to measure and which is therefore offered as a
judgement, not as a number.

---

## 8. Phase J completion recommendation

### **B — ONE MORE TARGETED PASS REQUIRED** *(and it should be small)*

**On the measurements:** the site-wide composition problem is **solved** — LTD 83.9% → 30.4%, modal
left-start 98.2% → 50.9%, distinct starts 3 → 9. Stage 4's near-zero contribution is itself the
evidence that **composition work has reached its floor**: the remaining 57 sections at the modal
left-start are `wide`, `reverse` and `editorial` sections whose content legitimately begins at the
container edge, plus breadcrumb navs.

**What is genuinely left is a different problem — text-only runs — and it has not moved since
Stage 2:** 14 → 12 routes, then 12, then 12. The three worst are:

| Route | Run | Status |
|---|:--:|---|
| `/schedule-call` | **7** | A protected conversion surface. **Should stay as it is** |
| `/how-it-works` | 5 | Tail is governance-protected from figures and disclosure |
| `/social-media-ads` | 5 | Binding **D — NONE**; owner ruled to keep it |

**Two of those three are routes the owner has already ruled should not change.** A fourth stage
aimed at runs would therefore be arguing with decisions already taken.

**Recommended scope for a final pass — deliberately narrow:**
1. **Decide whether to keep or revert `/problems` §1 and `/pricing` §5.** Both are small
   comprehension gains bought with height (+231 px and +53 px on mobile) and **neither moved a
   metric**. This is a judgement call and it is the owner's, not this session's.
2. **Re-examine `/services`** — run 4, LTD 0, untouched by Stages 3–4 beyond shared components, and
   the only remaining route with a run > 2 that no ruling protects.
3. **Then close Phase J.** No further primitive is needed; the grammar is complete and in use.
