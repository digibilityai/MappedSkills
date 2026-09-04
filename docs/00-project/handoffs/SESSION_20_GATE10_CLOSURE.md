# SESSION 20 — GATE 10 FORMAL CLOSURE

**Date:** 2026-09-04 · **Branch:** `test_branch` · **Decision:** `DEC-019`
**Type:** governance and repository hygiene. **No creative work, no visual change, no production
implementation, nothing pushed.**

---

## 1. The decision

> ### **QUALITY GATE 10 — UI / DESIGN SYSTEM — PASSED, 2026-09-04.**

**THE RESOLVE is validated as the production visual and experience direction.**

| | |
|---|---|
| **Approved homepage baseline** | `docs/26-resolve-homepage/prototype/index.html` — the **Session 19B** state |
| **Authoritative creative reference** | `docs/20-creative-convergence/prototype/convergence.html` — **unmodified throughout**, `c6d29fd34cf7c5e481d8244773f7d357` |
| **Active direction record** | `DEC-018`, unchanged |
| **THE ARRIVAL** | remains **superseded**, retained as historical record (`DEC-017`, unchanged) |
| **THE RECORD** | remains the **credibility system**, not the art direction |

Gate 10 was approved by the **orchestrator**, on owner visual validation. The repository worker
has no authority to pass a gate and did not.

## 2. The validation chain, in order

| Session | Owner input that drove it | What it produced |
|---|---|---|
| **17B / 17C** | *"F1 works but feels too static"* | F1 validated against THE RESOLVE, then motion-refined. **The isolated F1 experience was subsequently rejected** |
| **18** | *"still bland, no animation, no exciting, no journey happening"* | The **complete homepage** — F1 judged inside a page instead of alone |
| **18A** | *"finally going in the right direction"* | Refinement; second-half visual material 2 → 41 atoms |
| **18B** | *"too text heavy and long… so much of monotony"* | **Compression** — 11,056px → 7,714px, 1,435 → 681 visible words, ten chapters → eight, three chapters merged into one system view |
| **18C** | *"the mobile view looks a little cluttered"* | **Mobile de-clutter** — 390px from 9.3 to 9.0 screens *while adding* breathing room; desktop byte-for-byte unchanged |
| **19** | — | Read-only closure audit; found a documented transition that had never rendered, and an invalid interactive nesting |
| **19A** | — | Quantity-safety correction, the 40×40 interaction floor, dead-transition removal |
| **19B** | — | The last blocker closed: valid tab/tabpanel structure |
| **20** | Orchestrator ruling | **This closure** |

**Final owner verdict: *"the mobile now feels right."***

## 3. Gate 10 evidence — rendered and measured, not argued

| Test | WIDE | NARROW |
|---|---|---|
| **F2 — first fixation** *(deferred here by Gate 9B)* | **PASS** — 5.05× dominance | **PASS** — 2.05× at 360, 390 and 430 |
| **F3 — visual proportion / weight** *(deferred here by Gate 9B)* | **PASS** | **PASS** |
| Quantity safety | **PASS** | **PASS** |
| Evidence / proof safety | **PASS** | **PASS** |
| Accessibility / responsive | **PASS** | **PASS** |
| No-JS / reduced motion | **PASS** | **PASS** |
| Marketing-company blur · Digital/PDF · Static quality | **PASS · PASS · PASS** | — |
| Reader-driven controls | **ACCEPTED** — two, distinct informational jobs | — |

Measured across **eight widths** — 360, 390, 430, 760, 761, 860, 1080, 1425: **0 contrast
failures · 0 heading-level jumps · 0 interactive targets under 40×40 · 0 horizontal overflow ·
0 fixed or sticky elements · 0 looping animation · 0 images · 0 canvas.**

## 4. T3 governance reconciliation — 3 → 4

The proposed homepage T3 budget of **3** was derived in Session 17A **before any homepage existed**,
and the budget document itself specified that the reconciliation would be measured against the
composed homepage. It now has been.

| # | Live transition | Standard it meets |
|---|---|---|
| 1 | Hero departure | joins two chapters |
| 2 | Departure carrier | joins two chapters |
| 3 | Chain descent and draw | **changes the reader's distance from an object** |
| 4 | Close arrival | changes what the object means |

**The boundary chapter is intentionally still.**

> **4 is the validated CEILING for the approved homepage. It is not headroom, and it is not a
> general increase in motion allowance.**

Secondary-page and editorial budgets **unchanged**. **Ambient 0 · pinned 0 · looping decorative
motion prohibited · anti-tic rules M1–M7 unchanged.** Recorded in
`docs/24-resolve-governance/02_RESOLVE_MOTION_BUDGET.md` §5.0.

## 5. Two defects recorded rather than hidden

Both survived several sessions of reporting before the closure audit caught them.

1. **A boundary transition documented as live in Sessions 18, 18A, 18B and 18C had never
   rendered.** Its selector was `.bound.on` while the element only ever carried
   `class="sec sec--tight"`, and from 18B no script applied `.on`. **Removed rather than repaired**
   in 19A, which also closed a no-JS inconsistency (there the strike *did* draw) and a
   **reduced-motion contrast failure of 2.66:1 against a 3:1 floor**. A Session 19 arithmetic error
   that reported the live count as 3 instead of 4 was corrected in 19A.
2. **Seven capability links were nested inside `<button role="tab">`** — invalid HTML whose measured
   consequence was a **126-character accessible name** per tab. Corrected in 19B to a valid
   tab/tabpanel structure; names are now *"Capture"*, *"Convert"*, *"Measure"*.

## 6. What remains prohibited

**Passing Gate 10 approves none of the following:** production implementation, deployment or push ·
any change under `app/`, `components/`, `public/`, `styles/`, `hooks/`, `lib/`, `scripts/` or
`config/` · any fabricated proof, client result, testimonial, logo, award or metric · publication
readiness for any route · any later gate · a separate Resolve design system, which still does not
exist as a standalone deliverable · any performance, cross-browser, screen-reader or user-testing
claim beyond what was measured and reported.

**Owner blockers, all still open and none resolved by this gate:**
**`/pricing` facts** · **F17 — the real `/how-it-works` process, still BLOCKED and undrawn** ·
**the conditional manufacturing route.**

**Still outstanding and carried into production translation:** real-hardware performance profiling
and Core Web Vitals · screen-reader, real-device, cross-browser, print and 200%-text-resize
testing · **user testing, which this programme has never performed.**

## 7. Repository state after this session

**One controlled commit** containing the approved accumulated programme work from Sessions 17B
through 20: the F1 validation evidence (`docs/25-resolve-f1-validation/`), the complete homepage
work (`docs/26-resolve-homepage/`), the handoffs, the accumulated 17B/17C annotations to
`CURRENT_STATE.md` and `docs/22-design-system/00_OVERVIEW.md`, and the Gate 10 governance updates.

**Explicitly excluded:** root `README.md` — a pre-existing untracked file that predates this
programme's work and was never touched.

**No production file was created or modified at any point in Sessions 17B–20. Nothing was pushed.**

## 8. Next phase — recorded, NOT started

> ### **PRODUCTION TRANSLATION / IMPLEMENTATION PLANNING**

Its purpose is to translate the validated Resolve experience into the existing Next.js application
while preserving the approved IA, the CRO architecture, the approved page copy, the evidence
constraints, the Resolve design rules, accessibility, responsive behaviour, performance, and the
analytics and conversion requirements.

**Production work requires its own controlled implementation plan. It was not started in this
session, and no production file was touched.**
