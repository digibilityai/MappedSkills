# Tier 1 Figure UX — PROPOSED

**Session:** 13 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**
**Governed by:** `19_FIGURE_PRIORITISATION.md` (approved, `DEC-015`) — **the figure ranking, the business questions, the minimum static versions, the evidence dependencies and the "what would make it misleading" constraints are carried unchanged.** This document adds **UX behaviour only**: entry state, interaction, mobile transformation, accessibility alternative, linkability and failure modes.

> **No figure is designed here.** No layout, geometry, proportion, dimension, colour, type value or component is specified. **No data is invented.**

**F17 — the `/how-it-works` stage sequence — remains BLOCKED. No sketch, no prototype, no placeholder, no exploratory version, and nothing in this document may be read as beginning it.**

---

## 0. The five rules that bind every figure

1. **The static state is the primary state.** A figure whose information is only available in motion or through interaction is disqualified, not merely wrapped in a media query.
2. **A figure replaces the prose that carried the structure.** If both the paragraph and the figure survive, the page got longer and nothing was achieved.
3. **No figure states more than the copy states.** A figure is more likely than a sentence to be screenshotted, quoted and cited — so a figure that overstates travels further.
4. **Every figure has a text or tabular equivalent** conveying the same relationships, and is readable in greyscale.
5. **Nothing is reachable only by hover, only by pointer, or only by script.**

---

## 1. F1 — The run

**Business question:** *If I am to judge you on enquiries, how does an enquiry actually get produced, and which part of it do you answer for?*

**Pages — SUPERSEDED 2026-09-02 by `22_F1_USAGE_TAXONOMY.md`, which is BINDING.**

> Session 13 assigned F1 to **eight routes**. Applying the taxonomy, it appears on **six unconditional routes, and only three carry the full figure**. `/ai-seo`, `/google-ads` and `/social-media-ads` are **reclassified to NONE** — each has its own justified figure, and adding the run would give those pages two figures and force F1 on for consistency. `/lead-generation` is added as a **STATE**.
>
> **FULL:** `/` Block 3 · `/services` Block 2 *(joins marked)* · `/how-it-works` §3.
> **PARTIAL:** `/seo` *(discovery segment)* · `/conversion-optimization` *(landing/enquiry segment — F2-shallow **is** the partial run, one object not two)* · `/industries/manufacturing` *(conditional)*.
> **STATE:** `/` Block 4 *(on the Block 3 instance)* · `/lead-generation` *(F5 at the chain's terminus)*.
> **NONE:** every other route.
>
> **This is a correction to Session 13's own claim, not a change to approved creative direction** — `19` names the routes F1 *may* appear on and requires it on none. It directly reduces the B24 ambient-repetition risk.

### UX job
Carry the argument that the enquiry chain is **one continuous object whose joins decide the result**, and show where the firm's accountability begins and ends. On capability pages it does a second job: **locate this capability inside the whole**, which is the visual form of the rule that a capability is a part, not a pillar.

### Entry state
**Complete, static, readable, at first paint.** All six approved points labelled; the accountability boundary drawn; unmeasured stretches dashed; **at least one arrival with no upstream segment**; the client-data segment marked as the client's; intervention marks present. **No interaction is required to understand it.**

### Static baseline
The entry state **is** the baseline. Nothing is added by interaction that is not already legible.

### Optional interaction
| Permitted | Constraint |
|---|---|
| Sequential reveal on entering view | **Once.** Non-blocking. Never scroll-scrubbed, never repeating |
| Intervention marks resolving with their dates | Both states available statically |
| Segment emphasis switching on capability pages | The emphasis for **that page** is the default; switching is an enhancement, never the only way to see a segment |

**Nothing in the figure is revealed only by interaction.** Reduced motion renders the complete figure with all points and labels — and a reader who never sees the animation loses nothing but pacing.

### Mobile transformation
**A genuine vertical form, not a scaled-down horizontal one.** The chain reads top to bottom, the boundary is drawn across it, the dashed stretches remain dashed, and the unattached arrival remains unattached. **The page body never scrolls horizontally.**

### Accessibility alternative
A tabular or structured-text equivalent giving: each point in order · which points are measured and which are not · where accountability begins and ends · which segment is the client's data · that at least one arrival has no upstream segment. **Labels are on the figure as real text, not in a legend requiring cross-reference, and never baked into an image.**

### Linkability
Addressable by a stable fragment on each page that carries it. **The same object across seven routes — one figure, seven emphases, never seven drawings.**

### Failure modes
| Failure | Why it is fatal |
|---|---|
| **Tapering** | It becomes a funnel. Prohibited (B2) |
| **Reading as three services or a three-step process** | Explicitly prohibited in the approved Block 3 copy (B3) |
| **Implying a delivery process** | The real process is owner-blocked. A run that reads as *what MappedSkills does in what order* fabricates F17 (B4) |
| **Every segment drawn as measured** | The dashed stretches are load-bearing honesty, not styling |
| **Omitting the unattached arrival** | States that all enquiries are attributable — the opposite of approved copy |
| **Per-stage colours** | It becomes a transit map, and a transit map of a marketing process is a funnel with better graphics |
| **Ambient reuse** — header, background, loader, page transition, pattern | B24. The moment it is everywhere it is a brand device, and a brand device shaped like a path is a funnel |
| **A branded name for it** | B18 |

---

## 2. F2 — The four causes

**Business question:** *My traffic is not producing enquiries. Which of my four possible problems do I actually have?*

**Pages:** `/problems/traffic-but-no-enquiries` Move 2 *(full depth — the page's core value)* · `/conversion-optimization` *(deliberately shallower, visibly the same object)*.

### UX job
Replace prose that would force the reader to hold **four alternatives and one ordering rule** simultaneously. Branching logic is the canonical case where prose fails.

### Entry state
**Static and complete.** Four causes — Demand · Page · Path · Measurement — each with its distinct fix, and **measurement marked as the one to check first with its reason visible**. Followable top to bottom with no interaction.

### Static baseline
The entry state. **Determination from `06_PROBLEM_PAGE_UX.md` §4.1: this figure is static, always.** It is a comprehension aid, not an instrument, and interaction here invites the reader to expect a diagnosis the figure is prohibited from producing.

### Optional interaction
**None on this figure.** The permitted recording affordance belongs to F6 (the five checks) and is specified in `06` §4.2 — ungated, no score, local, and never required.

### Mobile transformation
**Vertical, sequential.** Never a wide branching graph scaled down, and **never horizontally scrolled**.

### Accessibility alternative
A structured list of four causes, each with its distinct fix, and a stated ordering rule with its reason. The **shallower `/conversion-optimization` variant uses the same equivalent at reduced depth**, so a reader encountering both recognises them as one object.

### Linkability
Addressable on both pages. **The `/conversion-optimization` variant must be visibly the same object at two depths** — a design instruction from the approved copy, not a content note.

### Failure modes
| Failure | Why |
|---|---|
| **Implying the four are mutually exclusive** | A business can have more than one |
| **Implying frequency or likelihood** | **No data exists** on how common each cause is. Any ordering that reads as "most likely" is an invented statistic |
| **Producing a diagnosis rather than a direction** | The figure narrows the question; it never certifies an answer |
| **Gating it** | Converts the page into the doorway page Project Rule 10 forbids (B25) |
| **A score, grade or percentage output** | B7, B26 |
| **Red-amber-green on the branches** | B6 |
| **Becoming a decorative four-box grid** | It must be genuinely followable |

---

## 3. F3 — The four AI layers, per system

**Business question:** *Do we show up when a buyer asks an assistant for a supplier like us — and how would anyone actually know?*

**Pages:** `/ai-seo` *(the page's central figure)* · `/research/{ai-visibility-baseline}` *(canonical, full depth)*.

### UX job
Show that the finding **is a shape** — retrieval working while the three layers above it sit at zero — because that relationship is the argument against a single score, and a sentence cannot show a shape.

### Entry state
**Static and complete.** Four layers kept separate — retrieval · discovery · recommendation · citation — with MappedSkills' own result on each. **Six systems shown: four with a measured zero, two in a not-testable state that cannot be read as a value.** Frequency across runs, never rank. **Full provenance IMMEDIATE**: 28 unbranded runs, four systems, one dated day, Pune, English, signed out.

### Static baseline
The entry state, at full provenance. **This figure is publishable today and needs nobody's permission** — Session 04 first-party measurement, no owner input, no client data, no unshipped work.

### Optional interaction
| Permitted | Constraint |
|---|---|
| Switching which system is under examination while the layer structure stays fixed | **All six systems' results are present in the DOM and reachable without script.** Switching is a convenience, never the only route to a system's result. Keyboard operable, no hover, no motion required |

### Mobile transformation
Per-system results **stack**, layers stay separate, provenance stays IMMEDIATE. If a comparison across six systems will not fit, it becomes a **scroll container with all content present and keyboard-accessible** — which is explicitly permitted and is **not a carousel** (A19 as amended). **The page body never scrolls horizontally.**

### Accessibility alternative
A table: six systems × four layers, with each cell carrying either a measured value or the **not-testable** state as a distinct, labelled value — **not blank, not zero, not "—"**. Provenance in the table's caption. **The not-testable state must be distinguishable from a measured zero in the text equivalent as well as in the figure.**

### Linkability
The canonical version lives on the research entry; `/ai-seo` carries it with a link to the canonical. **One dataset, two placements, not two datasets.**

### Failure modes
| Failure | Why |
|---|---|
| **Plotting the two untestable systems as zero** | **False.** The single most specific honesty rule on the site (B1) |
| **Omitting them** | Misleading by omission |
| **Blending systems into one figure or one value** | Destroys the only stable signal (B9) |
| **Any ordering, ranking or leaderboard** | Order changed in every repeated prompt measured (B8) |
| **A trend line, arrow or change indicator** | There is one measurement (B10) |
| **Aggregating the four layers** | That is the rejected score arrived at by the back door (B7) |
| **Any implication about Claude or Grok beyond "not testable"** | **No claim of any kind is permitted about either** |
| **Colour as the only carrier of the not-testable distinction** | Fails greyscale, fails colour-blind readers, and fails the honesty rule simultaneously |

---

## 4. F4 — What cannot be attributed

**Business question:** *When you report where my enquiries came from, what will you actually not know — and what happens to those enquiries?*

**Pages:** `/how-it-works` §4 *(full)* · `/` Block 4 *(as a state on F1, not a separate figure)*.

### UX job
Turn a list of five limitations — which reads as five apologies — into **a bounded region of a known system**, which reads as command of the subject. Session 11's own assessment: **the single item on the site most improved by being visual.**

### Entry state
**Static, complete, always open.** What is measured, what is not measured, and what cannot be measured, shown together **at true proportion**, with the boundary drawn as an **edge** rather than implied by a blank. **Unattributed enquiries visible as a real category with real weight.**

### Static baseline
The entry state. **This figure is never collapsible, never behind a disclosure, never below a CTA, and never in a disclaimer treatment** (B5, B29). On `/how-it-works` it must carry **a third of the page's visual weight** — the page's own copy says the attribution section "is not a disclaimer at the bottom — it is a third of the reason this page is here", and the design must make that literally true.

### Optional interaction
| Permitted | Constraint |
|---|---|
| The boundary appearing as a **state change on the run** the reader already knows, rather than as a new object | Both states must be legible statically. On `/` this is the **required** form — Block 4 is not a second figure |

### Mobile transformation
The measured / not-measured pair **remains a pair**. If they cannot sit side by side, they stack **adjacent and at equal weight** — never one open and one collapsed, never one above a CTA and one below.

### Accessibility alternative
A structured equivalent naming each category, its status, and whether it can ever be measured — with the unattributed category present and weighted, not listed last as an afterthought.

### Linkability
Addressable on `/how-it-works` as the section the whole site links to for attribution honesty. **The limitations are stated once, at full strength, on that page** — other pages link rather than restate.

### Failure modes
| Failure | Why |
|---|---|
| **Illustrative proportions presented as real** | **A figure showing "unattributed" at a plausible-looking size is a fabricated statistic in graphic form.** Where no measured proportion exists, the figure shows categories and relationships and must not imply a quantity |
| **Rendering unattributed as a thin residual, "other", or omitting it** | States the opposite of the approved position |
| **Framing gaps as empty states, warnings, errors or spinners** | They are **findings** (B22) |
| **Placing it below a CTA, collapsing it, or a disclaimer treatment** | B5, B29, B30 |
| **A lighter tint that reads as less real** | The gap is as real as the measurement |

---

## 5. Cross-figure rules

| Rule | Detail |
|---|---|
| **One figure of full weight per page** | More than one and neither is the point |
| **F1 is one object across seven routes** | Seven emphases, one drawing. Building it once — responsive, static-complete, keyboard-reachable, with a text equivalent — discharges most of Tier 1 and part of Tier 2 |
| **F4 on `/` is a state on F1**, not a second figure | Reusing the object is what makes the boundary feel like a property of the work rather than a legal section |
| **F2's two depths are one object** | A reader must recognise it across the two pages |
| **No figure carries a branded name** | B18 binds figure labels as much as copy |
| **No figure is text rendered as an image** | Ever, including labels and quoted excerpts |
| **Every figure survives the screenshot test** | Screenshot it with motion disabled. If it no longer carries its information, the figure is wrong |

---

## 6. Build order — recommendation only

Carried from `19` §6 and unchanged.

1. **F1** — reused across at least six routes; unblocked; unlocks F4 and part of F7.
2. **F3** — sharpest differentiator; publishable today; needs nobody's permission.
3. **F2** — the problem page's entire value, on the most winnable surface in the programme.
4. **F4** — the item Session 11 identified as most improved by being visual.
5. **Tier 2**, as dependencies clear — **F7 first**, once the own-site fixes ship, because it is the firm's only evidence of intervention.

**Tier 2 and Tier 3 are not specified in this session.** Tier 3 items are correctly served by prose or a plain table and should not be promoted to figures for parity.

---

## 7. F17 — BLOCKED

**Status: BLOCKED. No sketch, no prototype, no placeholder, no exploratory version, no UX specification.**

The real delivery process is an owner input that no Claude session can supply. **A speculative process diagram would fabricate the exact content the page exists to prove** — and a diagram is more likely than a paragraph to be screenshotted, quoted and cited, so the fabrication would travel further.

**The approved stage outline is the architecture, not a description of what happens. It must not be drawn.**

**Unblocks when:** the owner supplies the real process, stage by stage, including what cannot be concluded from each stage.

**This session produced nothing for F17 and specified nothing about its behaviour.**
