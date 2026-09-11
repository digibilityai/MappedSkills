# Session 16 Audit — What Survives the Direction Correction

**Session:** 17A · **Date:** 2026-09-03 · **Branch:** `test_branch`
**Subject:** `docs/22-design-system/` — the 17-document design system built for **THE ARRIVAL**.
**Method:** every material rule was classified against the **actual Session 15C prototype**,
`docs/20-creative-convergence/prototype/convergence.html`, not against a description of it.

---

## 0. Why this document exists

Session 16 is large, confident, well-organised and **built on a direction that is no longer
active**. A worker who opens `docs/22` first will find a frozen "BINDING" list whose first entry
is **dark-first** — and THE RESOLVE is **light-first**. Applying it would silently destroy the
approved direction.

> **This audit is the gate on `docs/22`. Nothing in that directory may be applied to THE RESOLVE
> unless it is classified `DIRECTION-INDEPENDENT` or `RESOLVE-COMPATIBLE` below.**

**Classifications**

| | |
|---|---|
| **DIRECTION-INDEPENDENT** | True regardless of art direction. **Retain as written** |
| **RESOLVE-COMPATIBLE** | The principle survives; the Arrival-specific expression does not. **Retain, restated in Resolve's terms** |
| **ARRIVAL-SPECIFIC** | Derived from THE ARRIVAL's visual world. **Superseded** |

---

## 1. The frozen "BINDING" list (`22/01_CREATIVE_DIRECTION_FROZEN.md` Part 1)

| Rule / system | Original Session 16 status | Classification | Active status | Reason |
|---|---|---|---|---|
| **B1 — Dark-first.** Ground is warm near-black; light surfaces are counted inversions | BINDING | **ARRIVAL-SPECIFIC** | **SUPERSEDED** | **Directly contradicts the active direction.** 15C's rendered `body` background is `#F7F3EC` ivory. THE RESOLVE is **light-first with a dark hero stage as a counted, meaningful inversion** — the inverse relationship. This is the single most dangerous rule to carry across |
| **B2 — The demand / signal metaphor.** Demand is signals travelling through a field | BINDING | **RESOLVE-COMPATIBLE** | **RETAIN, RESTATED** | Both directions make demand visible and refuse decoration. But Resolve's metaphor is **a population that resolves**, not **signals travelling through a field**. There is no field, no plane, no horizon and no travel in 15C. Restate as: *traffic is a field of identical anonymous marks; enquiries are a few distinct named objects; the move is resolution* |
| **B3 — Activity versus commercial consequence** | BINDING | **DIRECTION-INDEPENDENT** | **RETAIN** | This is the approved positioning made visual and predates both directions. 15C expresses it as traffic-vs-enquiries |
| **B4 — One accent, and it means one thing (amber)** | BINDING | **RESOLVE-COMPATIBLE** | **RETAIN THE RULE, REPLACE THE COLOUR** | *One accent, meaning one thing, never decoration, never a mood, never a brand wash, never grading a measured result, no second accent* — all survive. **The colour is tangerine `#FF5B04`, not amber.** 15C also carries a three-step ramp (`#FF5B04` / `#D94400` / `#A83400`) so the same mark clears contrast as type gets smaller — retain the ramp mechanism |
| **B5 — Signal-state semantics; eight states; shape as well as colour** | BINDING | **RESOLVE-COMPATIBLE** | **RETAIN THE RULE, REPLACE THE VOCABULARY** | *States have fixed commercial meanings, are distinguished by shape as well as colour, may not be reused for another meaning, and may not be invented casually* — all survive. **The eight Arrival states (travelling / passed / stalled / caught / tagged / untagged / measured zero / not testable) are Arrival's vocabulary.** 15C's drawn vocabulary is smaller: anonymous mark (`--dim`), named object, **dashed = not measured**, **hatched = unattributed**. Resolve's state set must be re-derived from the prototype, not imported |
| **B6 — Commercial consequence is a state change, not a replacement** | BINDING | **DIRECTION-INDEPENDENT** | **RETAIN** | **This rule originated in Direction B and is the literal core of THE RESOLVE** — *"the same population, resolved."* It is stronger here than it was in Arrival |
| **B7 — No fabricated quantitative visuals** | BINDING | **DIRECTION-INDEPENDENT** | **RETAIN** | An honesty rule, not an aesthetic one. 15C carries its own standing line — *"the marks are kinds, not counts — no quantity, proportion or rate is drawn or claimed"* — and names the residual risk itself (15C `03` R4) |
| **B8 — Evidence is a supporting layer; no monospace register** | BINDING | **DIRECTION-INDEPENDENT** | **RETAIN** | THE RECORD is a credibility system in both directions. 15C uses claim / what-it-stands-on and has **zero monospace** — verified |
| **B9 — Motion has roles and budgets** | BINDING | **DIRECTION-INDEPENDENT as a concept; ARRIVAL-SPECIFIC as numbers** | **RETAIN THE CONCEPT; SUPERSEDE THE NUMBERS** | The governance need is real and was identified independently by Sessions 14A, 15B **and 15C**. The numbers (2 ambient / 5 major / 2 signature / 1 pinned / 1 inversion) are Arrival-derived and **partly incompatible** — see §2. Re-derived in `02_RESOLVE_MOTION_BUDGET.md` |
| **B10 — Stillness is mandatory** | BINDING | **DIRECTION-INDEPENDENT** | **RETAIN** | 15C already obeys it: its stated rhythm is **calm → event → calm**, eight events across a page length, and *"once an act has resolved it stays resolved — scrolling back does not replay it"* |
| **B11 — Nothing depends on motion** | BINDING | **DIRECTION-INDEPENDENT** | **RETAIN** | 15C honours `prefers-reduced-motion` in CSS **and** JS, and has a `html:not(.js)` path in which every resolved state is shown |
| **B12 — Accessibility floor** | BINDING | **DIRECTION-INDEPENDENT** | **RETAIN** | See §3 |
| **B13 — Approved upstream is not reopened by design** | BINDING | **DIRECTION-INDEPENDENT** | **RETAIN** | Strategy, positioning, IA, messaging, copy, UX, CTA architecture, blocked-content rules and the F1 taxonomy are inputs in any direction. Includes **non-sticky header, no persistent sticky sales CTA** — 15C has **0 fixed/sticky elements**, verified |
| **B14 — The anti-pattern register is binding** | BINDING | **DIRECTION-INDEPENDENT as a concept** | **RETAIN THE CONCEPT; SEE §4 PER ENTRY** | The register itself must be re-read entry by entry — some entries are Arrival-specific |

---

## 2. Motion (`22/06_MOTION.md`) and the budget numbers

| Rule / system | Original | Classification | Active status | Reason |
|---|---|---|---|---|
| **AMBIENT role** — a continuously running field, calm state, canvas | Defined role, homepage budget **2 regions** | **ARRIVAL-SPECIFIC** | **SUPERSEDED** | **THE RESOLVE HAS NO AMBIENT MOTION AT ALL.** 15C has 0 looping animations, 0 canvas, and explicitly **removed** an idle shimmer as gratuitous. A budget that permits two ambient regions would *license* the thing 15C deliberately deleted |
| **RESPONSIVE role** (160–520ms) | Defined | **DIRECTION-INDEPENDENT** | **RETAIN** | 15C's `--t-micro` is 180ms with two micro-interactions. Compatible |
| **TRANSFORMATIONAL role** (520–1100ms; ~1s gap between arrivals) | Defined | **RESOLVE-COMPATIBLE** | **RETAIN, ADAPTED** | 15C's `--t-state` 620ms and `--t-resolve` 900ms sit inside this range. The minimum-gap idea is good governance and is carried into `02` |
| **SCROLL-TRIGGERED, once per region** | Defined | **DIRECTION-INDEPENDENT** | **RETAIN** | 15C: each act resolves once at 40% in view and never replays |
| **Pinned sequence** — 1 permitted on the homepage | Budgeted | **ARRIVAL-SPECIFIC** | **SUPERSEDED** | 15C states **no scroll hijacking, no pinned section, no scroll scrubbing, no forced sequence**. Permitting one would contradict the active direction |
| **Full-colour inversion** — 1 permitted | Budgeted | **RESOLVE-COMPATIBLE** | **RETAIN, RE-SCOPED** | Inversion exists in Resolve but means something specific: the hero stage is dark in the traffic state and **inverts as the population resolves**, and the closing CTA is full-bleed tangerine. Re-scoped in `02` |
| **Canvas permitted for the signal field** | Permitted | **ARRIVAL-SPECIFIC** | **SUPERSEDED** | 15C has **no canvas**. Canvas is not needed and is not licensed by the active direction |
| **WebGL / 3D prohibited · animation libraries prohibited · `transform`/`opacity` first · at most one `rAF` handler writing two properties** | Binding | **DIRECTION-INDEPENDENT** | **RETAIN** | 15C matches exactly: no libraries, one throttled `rAF` writing two properties on one element |

---

## 3. Accessibility and performance (`22/14_…`)

| Rule | Classification | Active status | Note |
|---|---|---|---|
| **A1** contrast floors (body/small ≥4.5:1, display ≥3:1, focus ≥3:1) | **DIRECTION-INDEPENDENT** | **RETAIN** | The reference to Arrival's `shape-recessive` token is Arrival naming; the floors are universal. 15C's tangerine ramp exists precisely to meet A1 |
| **A2** no colour-only meaning; shape **and** word | **DIRECTION-INDEPENDENT** | **RETAIN** | 15C: dashed and hatched patterns carry the honest states |
| **A3** visible focus, 3px ring at 3px offset, never removed | **DIRECTION-INDEPENDENT** | **RETAIN** | Colour becomes tangerine |
| **A4** keyboard parity, `Escape` closes, no focus trap | **DIRECTION-INDEPENDENT** | **RETAIN** | |
| **A5** no hover-only critical content | **DIRECTION-INDEPENDENT** | **RETAIN** | |
| **A6** nothing meaningful below 12px | **DIRECTION-INDEPENDENT** | **RETAIN** | |
| **A7** targets ≥44px | **DIRECTION-INDEPENDENT** | **RETAIN** | |
| **A8** semantic controls, `aria-expanded`, `aria-current` | **DIRECTION-INDEPENDENT** | **RETAIN** | |
| **A9** reduced motion is first-class; every state resolves | **DIRECTION-INDEPENDENT** | **RETAIN** | 15C's reduced-motion path **starts in the enquiries state** rather than freezing mid-transition — a good pattern to keep |
| **A10** canvas is `aria-hidden` and everything it conveys is in the DOM | **ARRIVAL-SPECIFIC in form, DIRECTION-INDEPENDENT in principle** | **RETAIN THE PRINCIPLE** | There is no canvas in Resolve. The surviving principle: **anything a visual system conveys must also exist in the DOM as text** |
| **A11** figures carry `role="img"`, `<title>`, substantive `<desc>`, plus a text/tabular equivalent | **DIRECTION-INDEPENDENT** | **RETAIN** | Binds the F1 revalidation |
| **A12** 200% text resize *(stated, untested)* | **DIRECTION-INDEPENDENT** | **RETAIN, STILL UNTESTED** | |
| **A13** landmarks, `lang`, heading order, skip link | **DIRECTION-INDEPENDENT** | **RETAIN** | |
| **A14** errors in words, associated, never colour-only | **DIRECTION-INDEPENDENT** | **RETAIN** | |
| **Performance validation on real hardware is a prerequisite to implementation** | **DIRECTION-INDEPENDENT** | **RETAIN** | Resolve's one performance item is different — a **one-off 190–440-element lattice transition**, not a running canvas — but the requirement to profile before shipping is unchanged |

---

## 4. The anti-pattern register (`22/15_ANTI_PATTERNS.md`)

### 4.1 Document-drift register (D1–D8) — **all DIRECTION-INDEPENDENT, RETAIN**

D1 monospace anywhere · D2 a reading column with a metadata margin as dominant geometry ·
D3 constant metadata down a page · D4 rules used as chrome · D5 research-paper furniture
(figure numbering, citations, footnotes, abstract, method section) · D6 type as the only visual
system · D7 evidence as a page's opening move · D8 audit-report or dashboard layout for evidence.

**These exist because the programme already drifted into a document once and the owner rejected it
on sight. They are the most valuable thing in `docs/22` and they survive the direction change
untouched.** 15C independently satisfies all eight.

### 4.2 Fabricated-quantity register (Q1–Q8) — **all DIRECTION-INDEPENDENT, RETAIN**

Q1 no chart/axis/legend/gauge/meter without real validated first-party data plus provenance and
limitations · Q2 no marks of varying length, size, area, count or density where a quantity could
be inferred · Q3 no implied conversion rate, volume, share or trend · Q4 no before/after pair with
a figure · Q5 no fake dashboards or product screenshots · Q6 no metric tile, counter, rating,
review count, client count, award or "trusted by" strip · Q7 no case-study styling without a
permissioned case study · Q8 no colour-grading a measured result.

**Q2 is live for THE RESOLVE and must be enforced.** 15C's lattice marks are deliberately
identical and carry a standing "kinds, not counts" note — and 15C's own risk R4 warns that
**if any future page puts a figure beside those marks, the device becomes a fabricated metric and
must be withdrawn.** Carry that warning forward verbatim.

### 4.3 Technology-drift register (T1–T10) — mixed

| Entry | Classification | Active status |
|---|---|---|
| **T1** random particle wallpaper · **T5** matrix rain, circuit boards, node graphs, brains, robots · **T6** generic data visualisation · **T7** terminal / code / dark-UI chrome · **T10** density as a substitute for art direction | **DIRECTION-INDEPENDENT** | **RETAIN** |
| **T3** cyber neon, glow, bloom, halo | **DIRECTION-INDEPENDENT** | **RETAIN** — also covers the decorative colour gradient |
| **T4** no mint / AI green, **no second accent** | **RESOLVE-COMPATIBLE** | **RETAIN** — the *no second accent* rule is the load-bearing half |
| **T2** starfields — "the horizon and the streak are what make it a plane" | **ARRIVAL-SPECIFIC** | **SUPERSEDED** — there is no plane, horizon or streak in Resolve |
| **T8** no blue-black or cool-grey ground; "warm is the direction" | **RESOLVE-COMPATIBLE** | **RETAIN THE WARMTH RULE** — Resolve's warmth lives in ivory `#F7F3EC` and a warm near-black `#141219`, not in an espresso ground |
| **T9** signal fields where demand is not the subject | **ARRIVAL-SPECIFIC** | **SUPERSEDED** — no signal field exists |

---

## 5. The rest of `docs/22`, by document

| Document | Classification | Active status |
|---|---|---|
| `02_COLOUR.md` — espresso ground, amber accent, Arrival token names and measured values | **ARRIVAL-SPECIFIC** | **SUPERSEDED.** Only the *method* survives: semantic roles, measured contrast, a stated register of where the accent is permitted and prohibited |
| `03_TYPOGRAPHY.md` — Familjen Grotesk + Instrument Sans | **ARRIVAL-SPECIFIC** | **SUPERSEDED.** Resolve uses **Bricolage Grotesque + Manrope**. The *anti-document type rules* and the **outright monospace prohibition** are DIRECTION-INDEPENDENT and **retained** |
| `04_LAYOUT_AND_SURFACES.md` — four Arrival surfaces, full-bleed rules, dark-ground inversions | **ARRIVAL-SPECIFIC** | **SUPERSEDED.** The *concepts* — counted surfaces, protected reading widths, deliberate full-bleed — are RESOLVE-COMPATIBLE and must be re-derived from 15C's ivory / paper / dark-stage / full-bleed-tangerine set |
| `05_SIGNAL_SEMANTICS.md` — the eight signal states | **ARRIVAL-SPECIFIC** | **SUPERSEDED** as a vocabulary. The *rule* (fixed meanings, shape **and** word, no casual invention) is retained — see B5 |
| `07_VISUAL_PRIMITIVES.md` — twelve Arrival marks: capture line, horizon, ledger, streak, band | **ARRIVAL-SPECIFIC** | **SUPERSEDED entirely.** None of these primitives exists in THE RESOLVE |
| `08_PATTERNS.md` — pattern inventory mapped to Gate 9B | **RESOLVE-COMPATIBLE** | **RETAIN THE MAPPING DISCIPLINE.** The rule *"map onto approved Gate 9B patterns without adding any"* is direction-independent; the Arrival visual expression of each is not |
| `09_NAVIGATION_AND_ACTIONS.md` | **RESOLVE-COMPATIBLE** | **RETAIN THE RULES** — non-sticky header, narrow disclosure navigation, object-vs-link CTA distinction. Re-express in Resolve materials |
| `10_FORMS.md` | **RESOLVE-COMPATIBLE** | **RETAIN THE STRUCTURE**, re-express visually |
| `11_EVIDENCE.md` — the claim and what it stands on | **DIRECTION-INDEPENDENT** | **RETAIN.** 15C uses the same claim / what-it-stands-on treatment |
| `12_FIGURES.md` — approved figure taxonomy reinterpreted in Arrival materials | **Mixed** | **The taxonomy is upstream and unchanged. The Arrival materials are SUPERSEDED.** F1 must be re-drawn in Resolve — see `03_NEXT_VALIDATIONS.md` |
| `13_RESPONSIVE.md` — behaviour not pixels; **narrow must recompose** | **DIRECTION-INDEPENDENT** | **RETAIN** |
| `16_HOMEPAGE_READINESS.md` — readiness assessed for THE ARRIVAL, gap G1 = F1 never drawn | **ARRIVAL-SPECIFIC as an assessment** | **SUPERSEDED.** Its finding transfers in form: **F1 has never been drawn in Resolve's materials either**, and that remains the first thing to do |

---

## 6. Summary

| Classification | Count of material rules audited | What it means |
|---|---|---|
| **DIRECTION-INDEPENDENT — retain as written** | The accessibility floor (A1–A14) · the document-drift register (D1–D8) · the fabricated-quantity register (Q1–Q8) · B3, B6, B7, B8, B10, B11, B12, B13 · responsive/scroll motion roles · the no-library / `transform`-`opacity` / one-`rAF` performance rules · narrow-must-recompose · evidence as substrate · the static-quality, digital/PDF and marketing-company tests | The governance backbone survives the direction change intact |
| **RESOLVE-COMPATIBLE — retain, restated** | B2, B4, B5, B9 (concept), the transformational role, inversion (re-scoped), counted surfaces, pattern-mapping discipline, navigation and form rules, T4 and T8 | The principle holds; the Arrival expression is replaced with Resolve's |
| **ARRIVAL-SPECIFIC — superseded** | **B1 dark-first** · the espresso world · amber · the eight signal states · capture line / horizon / ledger / streak / band · the twelve primitives · canvas · ambient regions · pinned sequences · Familjen Grotesk + Instrument Sans · the Arrival colour and surface systems · T2, T9 · the Arrival homepage-readiness assessment | Do not apply any of these to THE RESOLVE |

## 7. Two limits of this audit, stated

1. **It classifies rules, it does not rebuild them.** Where something is marked *"retain,
   restated"*, **the restatement has not been written.** That is design-system work and is
   deliberately not done in this correction session.
2. **A residual governance risk remains and cannot be closed from here.** `docs/22-design-system/`
   still opens with *"THE ARRIVAL — Design System"* and a BINDING list headed by **dark-first**,
   with no in-file warning. This session's staged scope does not permit editing that directory.
   **Recommended follow-up: a one-paragraph superseded banner at the top of
   `docs/22-design-system/00_OVERVIEW.md` and `01_CREATIVE_DIRECTION_FROZEN.md` pointing here.**
   Until that exists, `CURRENT_STATE.md` and this audit are the only guards.
