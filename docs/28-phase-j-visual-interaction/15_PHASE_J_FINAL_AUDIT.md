# PHASE J — FINAL AUDIT AND ACTIVE DESIGN SYSTEM

**Date:** 2026-09-07 · **Status:** **PHASE J PASSED — SITE-WIDE VISUAL REDESIGN ACCEPTED**
(2026-09-07, `DEC-022`), on the implementation at HEAD `15bc4ed`.

> **Sequence of record.** This audit was performed and written *before* acceptance, and its
> original status line — *"AWAITING FINAL OWNER / ChatGPT ACCEPTANCE — not PASS"* — was
> correct at the time of writing, because the auditor has no authority to pass a phase.
> **Formal owner / ChatGPT acceptance occurred after this audit**, on its recommendation, and
> is recorded in `docs/00-project/DECISION_LOG.md` as `DEC-022`. **All measurements, findings,
> classifications and stated limits below are the original audit evidence and are
> unchanged** — only this status header and the recommendation heading in §7 have been
> reconciled to the accepted state.

Measured with the Stage 3/4 methodology, unchanged: sandboxed same-origin iframe, scripts enabled,
exact viewport widths, two git worktrees on separate dev servers. Pre-Phase-J is commit `f9af9ed`,
whose application source is identical to `66dff0e`, the last commit before Phase J began.

---

## 1. Final programme comparison

| Metric | Pre-Phase-J | **Final** | Difference |
|---|:--:|:--:|:--:|
| Substantive routes measured | 18 | 18 | — |
| Commercial sections | 112 | 112 | 0 |
| **LEFT-THIRD DOMINANCE (primary)** | **94 / 83.9%** | **34 / 30.4%** | **−60 sections, −53.5 pts** |
| Modal left-start | 110 / **98.2%** | 57 / **50.9%** | −53 sections, **−47.3 pts** |
| Distinct section left-starts | 3 | **9** | +6 |
| Occupancy left / centre / right | 68 / 29 / 3 | **42 / 53 / 5** | left **−26 pts** |
| Text-only sections | 95 | **86** | −9 |
| Visual sections | 14 | 13 | −1 *(see note)* |
| Interactive sections | 3 | **13** | **+10** |
| Visual + interactive combined | 17 | **26** | **+9** |
| Routes with a text-only run > 2 | 14 | **12** | −2 |
| **Average longest text-only run** | **4.17** | **3.33** | **−0.84** |
| Total mobile height, 18 routes @390 | 121 034 px | **115 532 px** | **−5 502 px (−4.5%)** |
| **Client JS introduced by Phase J** | — | **1 242 bytes** (one component, compiled, uncompressed) | — |
| **Dependencies introduced by Phase J** | — | **0** | — |
| *Right-third occupancy (historical only, not an acceptance criterion)* | *3%* | *5%* | *+2* |

> **Note on "visual sections 14 → 13".** The count did not fall because a figure was lost. Sections
> carrying a `ScopeList` gained `<details>` controls and are now classified **interactive** rather
> than **visual** — the detector reports the strongest class, not both. The honest combined figure
> is **17 → 26**.

### Longest text-only run, by route

| Route | Pre | Final | | Route | Pre | Final |
|---|:--:|:--:|---|---|:--:|:--:|
| `/faq` | 8 | **2** | | `/services` | 4 | 4 |
| `/about` | 8 | **5** | | `/problems/…` | 4 | 4 |
| `/google-ads` | 6 | **3** | | `/pricing` | 4 | 4 |
| `/seo` | 4 | **2** | | `/ai-seo` | 4 | 4 |
| `/conversion-optimization` | 4 | **3** | | `/how-it-works` | 5 | 5 |
| `/schedule-call` | 7 | 7 | | `/social-media-ads` | 5 | 5 |
| `/work` | 3 | 3 | | `/lead-generation` | 3 | 3 |
| `/` · `/contact` · `/thank-you` · `/blog` | 1 · 1 · 2 · 2 | unchanged | | | | |

### Page height @390, by route

| Route | Pre | Final | Δ | | Route | Pre | Final | Δ |
|---|:--:|:--:|:--:|---|---|:--:|:--:|:--:|
| `/faq` | 8 050 | **4 290** | **−3 760** | | `/services` | 10 086 | 10 083 | −3 |
| `/ai-seo` | 9 993 | 9 422 | −571 | | `/problems/…` | 10 570 | 10 574 | +4 |
| `/google-ads` | 6 074 | 5 551 | −523 | | `/pricing` | 7 443 | 7 445 | +2 |
| `/seo` | 7 875 | 7 373 | −502 | | `/social-media-ads` | 4 258 | 4 260 | +2 |
| `/conversion-optimization` | 6 685 | 6 310 | −375 | | `/about` | 6 246 | 6 275 | +29 |
| `/lead-generation` | 7 726 | 7 390 | −336 | | **`/how-it-works`** | 12 310 | **12 841** | **+531** |
| `/` · `/contact` · `/schedule-call` · `/thank-you` · `/work` · `/blog` | | | **0 each** | | | | | |

**One route is materially taller than before Phase J — `/how-it-works`, by 531 px — and that is the
StageSystem the owner explicitly approved and retained.**

---

## 2. Final route classification

**A** — visually resolved · **B** — intentionally text-led · **C** — protected functional ·
**D** — proof / content constrained · **E** — further work required.

| Route | Run | Class | Reason |
|---|:--:|:--:|---|
| `/` | 1 | **A** | Gate 10 homepage. One T1, two interactions. Untouched by Phase J |
| `/faq` | 2 | **A** | 11 native disclosures; 8 → 2 run; −46.7% mobile height |
| `/seo` | 2 | **A** | Hero split, ScopeList disclosure, chain figure, close split |
| `/google-ads` | 3 | **A** | 6 → 3 run via disclosure and composition, with no figure — see D note |
| `/conversion-optimization` | 3 | **A** | Disclosure + partial chain figure + composition |
| `/lead-generation` | 3 | **A** | Disclosure + `ChainTerminus` (F1 class C) + composition |
| `/work` · `/blog` | 3 · 2 | **A** | Honest empty states, composed. Nothing to visualise |
| `/contact` | 1 | **C** | Conversion surface. Form-first, calm, byte-identical to pre-Phase-J |
| `/thank-you` | 2 | **C** | Post-conversion. Restrained by rule, byte-identical |
| `/schedule-call` | **7** | **C** | Booking surface under mandatory stillness (M6). Owner ruled: do not change |
| `/about` | 5 | **B** | 8 → 5 run, `StateComparison` shipped. The remainder is the firm's own account — deliberately read |
| `/how-it-works` | 5 | **B** | StageSystem shipped. The tail is judgement, limits and requirements: a method page may carry no disclosure (`03_PAGE_TYPE_ARCHITECTURE.md` §14) and `FindingList` may never be collapsed |
| `/services` | 4 | **B** | §7 is already a de-facto state comparison; §5 decision rule fails on three conditions |
| `/problems/…` | 4 | **B** | Two figures already. Tail is `FindingList`, bound to equal weight and no disclosure |
| `/ai-seo` | 4 | **B** | Disclosure + `AiLayers`. F1 class **D — NONE** by binding taxonomy |
| `/pricing` | 4 | **B** | Contrast already ships as an accessible `<table>`; no positive counterpart to compare |
| `/social-media-ads` | **5** | **D** | Binding **D — NONE**, explicitly anti-padding. Owner ruled: keep |
| `/google-ads` *(figure)* | — | **D** | F9 blocked on an owner-supplied commercial fact. Never invented |

### Material **E** routes: **ZERO**

Every route with a remaining run is **B** (deliberately text-led, with governance reasons on the
record), **C** (protected conversion surface) or **D** (proof-constrained). **No route is
unresolved for want of design work.**

---

## 3. The active Phase J grammar — what actually shipped

**This list describes reality.** Primitives proposed at the design gate that never shipped are
marked as such and survive only in the historical records (`02_INTERACTION_GRAMMAR.md`).

| Primitive | Status | Purpose | Routes | Interactive | JS | Mobile |
|---|---|---|:--:|:--:|:--:|---|
| **J9 — composition set** | **SHIPPED** | Five section modes + four opener modes, assigned by section role and route archetype | 14 routes · ~66 sections · 3 shared components | No | **0** | Single column below 1081 px — mobile unchanged |
| **J8 — progressive disclosure** | **SHIPPED** | One member of a set at a time, without losing the set | `ScopeList` on 5 routes; `/faq` (11 questions) | Yes | **1 242 B** total | `ScopeList` accordion in place; `/faq` server-collapsed, native |
| **J7 — state comparison** | **SHIPPED** | Two conditions and the limit between them | `/about` §5 | No | **0** | Halves stack; rule becomes horizontal |
| **J4 — system anatomy** | **SHIPPED** | Which parts of a system a named stage covers | `/how-it-works` §3 (`StageSystem`) | No | **0** | Three stages stack |
| **J2 — signal map** | **NOT SHIPPED** | — | — | — | — | Prototype B was rejected at the design gate for mobile height |
| **J5 — kinetic statement** | **NOT SHIPPED** | — | — | — | — | Never earned a place; no page needed it |
| **J6 — sticky narrative** | **BLOCKED, NEVER BUILT** | — | — | — | — | Prohibited by `DEC-018` §4.5 and `DEC-019`; owner ruled DROP |

**Four primitives shipped. Two were proposed and never earned a place. One was blocked and correctly
never built.**

---

## 4. Final interaction inventory

| Interaction | Routes | Purpose | JS | Reduced motion | No-JS |
|---|:--:|---|:--:|---|---|
| `ScopeList` disclosure | `/seo`, `/ai-seo`, `/google-ads`, `/lead-generation`, `/conversion-optimization` | Examine one scope item at a time while the whole set stays visible | 1 242 B, one client component | One 180 ms transition, collapsed by the global floor | **Server sends every panel `open`** — full set without script |
| `/faq` disclosure | `/faq` | Choose between 11 discrete questions | **0** | Same 180 ms transition | **Native `<details>` — opens with no script at all** |
| *(homepage signature + tablist)* | `/` | Pre-existing, Gate 10 | untouched | untouched | untouched |

**Verified across every Phase J component:** `requestAnimationFrame` **0** · `IntersectionObserver`
**0** · `setInterval` **0** · `infinite` animations **0** · `position: sticky` **0** ·
`position: fixed` **0** · `<canvas>` **0** · animation libraries **0** · hover-only essential
interaction **0**.

Every interaction has an explanatory job. **Nothing exists for movement.**

---

## 5. Final reviews

### Visual rhythm

**Does the site still read as left text → left text → left text → CTA?** **No, and the geometry
says so.** Left-third dominance fell from **83.9% to 30.4%** of sections; sections sharing one left
edge fell from **98.2% to 50.9%**; distinct left-start positions rose from **3 to 9**; and content
weight moved from **68/29/3** to **42/53/5** across the thirds.

**Is there variation without a collection of unrelated gimmicks?** **Four primitives, on 14 routes,
all drawn from one mark vocabulary and one motion budget.** Two proposed primitives were dropped for
want of a job and one was blocked and never built — which is the evidence that the system was
restrained rather than accumulated.

### Proof discipline

Audited across every Phase J-created visual: **0** numbers presenting as results · **0** percentages
· **0** charts, bars or funnels · **0** tapering geometry · **0** implied conversion rates, ROI,
traffic volumes, client results, market share or growth · **0** fabricated company facts · **0**
production enquiry data. The three `StageSystem` stages are drawn at **equal width** because the
number of measured points in a stage is not a quantity of anything. Two blocked facts —
`/google-ads` F9 and `/how-it-works` §2 — **still render nothing** and were never invented.

### Accessibility

Semantic HTML throughout (`<ol>`, `<ul>`, `<details>`, `<summary>`, `<figure>`, `<figcaption>`,
real `<h3>`) · **exactly one `<h1>` on 180/180 route × width checks** · **0 heading-order jumps at
every width** · keyboard native on every control · no target under 40 px introduced · marks are
`aria-hidden` with meaning always in adjacent text · no ARIA papering over structure · reduced
motion covered by the global floor · **no-JS complete on every Phase J system**, verified against
served HTML.

### Responsive

**18 routes × 10 widths (320 · 360 · 390 · 430 · 760 · 761 · 860 · 1080 · 1081 · 1425) = 180
checks: zero horizontal overflow, zero collisions, zero clipping.** The only sub-40 px controls are
**3 pre-existing homepage ones**; `app/page.tsx`, `components/homepage/*` and `components/layout/*`
are not in the Phase J diff at all.

### Protection

`lib/`, `app/api/`, `components/analytics/`, `components/forms/`, `db/`, `robots.ts`, `sitemap.ts`,
`next.config.mjs`, `app/globals.css`, `app/resolve-motion.css`, `scripts/`, `server.cjs`,
`app/page.tsx`, `components/homepage/`, `components/layout/`: **0 files modified by any Phase J
stage.** `/contact`, `/thank-you`, `/schedule-call` and 404: **0 files modified**, byte-identical
heights at 390, 860 and 1425. All five analytics events intact; **no Phase J file references
`gtag`, `dataLayer`, `lib/analytics` or any event name.** `FAQPage` schema: 11 questions = 11
visible summaries, 0 duplicates.

### Builds

`npm run build` **PASS** · `npm run build:cpanel` **PASS**. **One warning, and it is provably
pre-existing:** the workspace-root notice caused by two lockfiles, both of which are tracked at
`f9af9ed`. **No new warning.** One pre-existing TypeScript error in
`components/forms/CalendlyButton.tsx:55`, confirmed at `f9af9ed`, untouched.

---

## 6. Total Phase J source footprint

**20 application files** — 14 route pages and 6 components:

`commercial/primitives.tsx` (section + opener modes) · `commercial/CommercialHero.tsx` ·
`commercial/CommercialClose.tsx` · `commercial/ScopeList.tsx` · `commercial/ScopeDisclosure.tsx`
*(new, the only client component)* · `routes/primitives.tsx` (`StateComparison`, `StageSystem`).

**0 dependencies · 1 client component · 1 242 bytes of JS · 0 animation libraries · 0 loops.**

---

## 7. Recommendation

### **A — READY FOR FINAL OWNER / ChatGPT ACCEPTANCE** — *recommendation as made; **ACCEPTED
2026-09-07 (`DEC-022`)***

- The primary metric moved **83.9% → 30.4%**, and Stage 4's near-zero contribution demonstrated the
  floor; Stage 5 confirmed it by finding **no justified change on `/services`**.
- **Zero material E routes.** Every remaining run is governed, protected or proof-constrained.
- The site is **4.5% shorter on mobile overall**, with one deliberate exception.
- Cost: **1 242 bytes of JavaScript and no dependencies.**
- Protected systems, conversion surfaces, analytics and the homepage are untouched and verified so.

**Not claimed:** Core Web Vitals, LCP, CLS, INP or any comprehension study. None was measured in
this programme and no figure for any of them appears in these records.
