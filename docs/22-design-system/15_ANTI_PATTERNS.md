# Anti-Pattern Register — THE ARRIVAL

**Session:** 16 · **Date:** 2026-09-03 · **Status:** PROPOSED — **BINDING on every future design session**

> **This register exists because this programme has already drifted twice.** Once into a document
> (Session 15, rejected by the owner on sight) and once toward a technology demo (Direction A,
> preferred but requiring correction). Both were made of individually defensible decisions. **Drift
> is cumulative, so the guard has to be a list you can check.**

**The complementary approved register — `docs/11-creative/14_DESIGN_ANTI_PATTERNS.md` — still
stands.** This one is additional and specific to THE ARRIVAL.

---

## D — DOCUMENT / JOURNAL DRIFT
*The failure that got Session 15 rejected.*

| # | Prohibited | Why |
|---|---|---|
| D1 | **Monospace anywhere** | The apparatus register that made the site read as a report — and simultaneously the developer-tool signal. **Prohibited outright, not rationed** |
| D2 | A **reading column with a metadata margin** as a page's dominant geometry | That shape *is* a report, whatever the typeface |
| D3 | **Constant metadata** running down a page | Evidence appears where a claim invites it |
| D4 | **Rules used as chrome** — hairlines opening every section | Structure comes from surface, scale and space |
| D5 | **Figure numbering, citations, footnote references, an abstract, a method section** | Research-paper furniture |
| D6 | **Type as the only visual system** | The field participates in the composition |
| D7 | **Evidence as a page's opening move** | Commercial meaning leads every screen |
| D8 | An **audit-report or dashboard layout** for evidence | Evidence is a claim's substrate, not a report |

**The standing test:** *would this survive as a PDF, essentially unchanged?* If yes, it has drifted.

---

## T — AI / TECHNOLOGY-STARTUP DRIFT
*The failure THE ARRIVAL is structurally closest to.*

| # | Prohibited | Why |
|---|---|---|
| T1 | **Random particle wallpaper** | Signals must represent something. If a moving element cannot answer *"what does this represent?"*, it is removed |
| T2 | **Starfields** — dots in a void, no horizon, no direction | The horizon and the streak are what make it a plane |
| T3 | **Cyber neon**, glow, bloom, halo, neon-on-black | Crypto and gaming |
| T4 | **Mint / AI green**, or any second accent | Direction A's green was the strongest single driver of the technology reading |
| T5 | **Matrix rain, circuit boards, node graphs, brains, robots, "intelligence" motifs** | Category cliché |
| T6 | **Generic data visualisation** — axes, legends, gauges, sparklines, meters | And see Q1 below |
| T7 | **Terminal, code, syntax colouring, command prompts, dark-UI chrome** | Developer-tool signal |
| T8 | **A blue-black or cool-grey ground** | The temperature is load-bearing; warm is the direction |
| T9 | **Signal fields where demand is not the subject** | The ambient budget is the guard |
| T10 | **Density as a substitute for art direction** | A tech demo signals effort by quantity; design signals it by control |

**The standing test:** *blur all copy. Does it look like a high-end contemporary brand, or a
product?*

---

## Q — FABRICATED QUANTITY
*The failure that would be a claims breach, not a taste breach.*

| # | Prohibited | Why |
|---|---|---|
| Q1 | **Any chart, axis, legend, gauge, meter or scale** without real validated first-party data plus provenance and limitations | |
| Q2 | **Marks of varying length, size, area, count or density** where a reader could infer a quantity | An earlier draft's ledger was a bar chart of unequal lengths. **Caught by inspection and fixed** |
| Q3 | **Any implied conversion rate, volume, share or trend** | |
| Q4 | **A before/after pair with a figure attached** | This is the retired `BeforeAfterMetric` pattern |
| Q5 | **Fake dashboards, fake analytics, fake screenshots of a product** | |
| Q6 | **A metric tile, counter, rating, review count, client count, award or "trusted by" strip** | |
| Q7 | **Case-study styling without a permissioned case study** | |
| Q8 | **Colour grading a measured result** — red for bad, green for good | There is no red and no green in this system |

**The standing test:** *could a reader take a number away from this that we have not measured?*

---

## G — GENERIC AGENCY DRIFT

| # | Prohibited |
|---|---|
| G1 | Stock office photography, smiling headset teams, handshake imagery |
| G2 | Gradient blobs, meshes, orbs, aurora backgrounds |
| G3 | Gradient text, gradient borders, gradient buttons |
| G4 | Generic funnels, tapers, pipelines, boxes-and-arrows process graphics |
| G5 | Icon-everything — an icon on every heading, capability, card or CTA. **There are no icons in this system** |
| G6 | Bento grids |
| G7 | Abstract "innovation" illustration |
| G8 | A named framework presented as a graphic |

---

## S — SAAS DRIFT

| # | Prohibited |
|---|---|
| S1 | Cards as a general container. **P9 is the one card-like pattern, for one content type** |
| S2 | Feature-card repetition — three or four equal cells with icon, title and two lines |
| S3 | Dashboard chrome, sidebars, app shells, product screenshots |
| S4 | Glassmorphism, frosting, blur, floating panels, elevation and shadows |
| S5 | Pills, heavy radii, soft-UI buttons |
| S6 | Pricing tables presented as tiers of cards *(pricing facts remain owner-blocked in any case)* |

---

## M — MOTION DRIFT

| # | Prohibited |
|---|---|
| M1 | **Animation everywhere.** The budget is a maximum, not a target |
| M2 | **Looping for decoration.** Ambient motion must have a calm state and an off-screen pause |
| M3 | **Scroll hijacking, scroll scrubbing, forced sequences, waiting for an animation** |
| M4 | **The signature gesture repeated in every section.** A signature used more than twice on a page is a tic |
| M5 | **Page-transition animations** |
| M6 | **Cursor effects, magnetic buttons, parallax** |
| M7 | **Motion on the chrome** — buttons, navigation and forms get feedback only, never THE ARRIVAL's language |
| M8 | **Motion that hides content if it is interrupted.** A resting state must always be visible. *(A real defect: a Web Animations call with `fill: both` from `opacity: 0` could leave a heading permanently invisible.)* |
| M9 | **Motion whose role cannot be named** from the five in `06_MOTION.md` |

---

## How to use this register

1. **On every new page design, walk the five standing tests** — PDF, blur, quantity, budget count,
   and reduced-motion completeness.
2. **Count, do not feel.** Ambient regions, major events, signature interactions, amber events per
   screen, patterns per page, monospace elements. Every one of these is an integer.
3. **A violation is a design defect, not a matter of taste** — fix it before review.
4. **Adding to this register is expected**; removing from it is a direction change.
