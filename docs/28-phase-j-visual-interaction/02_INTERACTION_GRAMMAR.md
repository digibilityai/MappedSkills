# PHASE J — INTERACTION GRAMMAR

**Date:** 2026-09-07 · **Status:** **PROPOSED — AWAITING OWNER / ChatGPT APPROVAL**
**Subordinate to:** `DEC-018` (THE RESOLVE) · `DEC-019` + `docs/24-resolve-governance/02_RESOLVE_MOTION_BUDGET.md` · `docs/16-ux/22_F1_USAGE_TAXONOMY.md`

---

## 0. The rule this grammar is built to obey

> **THE RESOLVE should feel alive because meaningful state changes occur — not because things are
> animating.** — `02_RESOLVE_MOTION_BUDGET.md` §2

Every primitive below must answer one question: **what does this help the visitor understand?**
A primitive with no answer is not built.

---

## 1. Reconciliation with the Phase J brief — read this before the table

The brief proposes eight primitives, J1–J8. Six survive as proposed, one is renamed to match what
the repository evidence actually supports, and **one cannot be built under current governance**.

| Brief primitive | Status | Reason |
|---|---|---|
| J1 RESOLVE FLOW | **Folded into J2** | On this site "convergence" and "signal map" are the same object — the run — in two readings. Two names for one drawing would breach anti-tic rule **M3** |
| J2 SIGNAL MAP | **Kept** | |
| J3 CONVERSION PATH | **Folded into J4** | The chain already exists as F1 and is governed by a binding taxonomy. A second path-shaped primitive is exactly the "figure becomes a signature" risk `22_F1_USAGE_TAXONOMY.md` §1 exists to prevent |
| J4 SYSTEM ANATOMY | **Kept** | |
| J5 KINETIC STATEMENT | **Kept, hard-capped** | |
| **J6 STICKY NARRATIVE VISUAL** | **BLOCKED — cannot be built** | See §3. Requires the owner to reopen `DEC-018` and `DEC-019` |
| J7 STATE COMPARISON | **Kept** | |
| J8 PROGRESSIVE DISCLOSURE | **Kept** | Already has a Gate-10-accepted precedent in `SystemStages` |

**Result: six primitives**, inside the brief's own 5–8 target.

### A factual correction to the brief

The brief states at §7: *"Existing motion ceiling: T3."* **That is not the current ceiling.** The
approved homepage carries **one T1**, up to **three T2**, **four T3** (reconciled 3→4 at Gate 10
closure, `DEC-019` §5.0) and unbounded T4. What is true is that **secondary and service pages are
capped at T2 = 1 and T3 = 2, with T1 = 0**. This document works to the real budget.

---

## 2. The six primitives

| # | Primitive | What it makes understandable | Interaction | Mobile | Reduced motion | No-JS | Best page types | Tier |
|:--:|---|---|---|---|---|---|---|:--:|
| **J2** | **SIGNAL MAP** | How far a thing reaches, and where it stops. Relationships between demand, discovery, the site, the enquiry and measurement | **None.** Read-only | Second, genuinely different vertical drawing | Composed complete on first paint | Composed complete | `/about`, `/services`, `/ai-seo`, `/lead-generation` | **T2 ×1** |
| **J4** | **SYSTEM ANATOMY** | *Where in the system* each named part acts — the fact a list cannot state | Optional selector (pairs with J8) | Vertical drawing + accordion | All parts composed, no stagger | All parts open, in order | Capability routes, `/how-it-works`, `/services` | **T2 ×1** |
| **J5** | **KINETIC STATEMENT** | One conceptual change: a term resolving into another | None — fires on view | Same, shorter distance | **Final state shown immediately** | Final state | Max **one per screenful**, chapter openings only | **T3** |
| **J7** | **STATE COMPARISON** | Two conditions and the **limit between them** — fit/not-fit, measured/unmeasured, in-scope/out-of-scope | None | Stacks; the rule becomes horizontal | Rule and both halves composed | Both halves, both headings, in text | `/about`, `/pricing`, every `BoundaryBlock` | **T2 ×1** |
| **J8** | **PROGRESSIVE DISCLOSURE** | One member of a set at a time, without losing the set | **Tablist** — click/tap, roving `tabindex`, arrows, Home/End | Accordion in place, ≥ 48 px targets | Panels **all open** — never one reading in place of six | **All panels open, in document order** | `ScopeList` routes, `/faq`, `/pricing` | **T4 only** |
| **J9** | **COMPOSITION SET** *(new — not in the brief)* | Nothing on its own. It is the answer to the 98% finding | None | Single column, as now | No motion at all | Identical | **Every route** | **none** |

### Why J9 was added

It is the only item on this list that addresses the audit's **largest** finding, costs **zero
JavaScript, zero motion and zero copy change**, and carries **zero proof risk**. A grammar of five
figure primitives that left 98% of sections starting at the same pixel would have solved the
second-biggest problem and skipped the first.

**J9 is a small closed set of composition variants on `CommercialSection`:**

| Variant | Shape | Constraint |
|---|---|---|
| `full` | today's single column | the default; still correct for reading-heavy chapters |
| `split` | index left / subject right | subject must be a figure or a set, never more prose |
| `reversed` | subject left / reading right | |
| `centred` | narrow centred statement | one per page maximum, for a chapter turn |
| `wide` | subject breaks the reading measure | figures only |

**Binding on J9:** no two adjacent sections may use the same variant; `full` may not appear more
than twice consecutively; and **the reading measure (`--resolve-measure`, 58ch) is never widened**
— composition moves the column, it does not stretch the line.

---

## 3. J6 — STICKY NARRATIVE VISUAL — BLOCKED. This is an owner decision.

The brief asks for it at §20. **It cannot be built without reopening two approved decisions.**

| Governing rule | Where | What it says |
|---|---|---|
| **0 fixed / 0 sticky elements** | `DEC-018` §4.5, verified against the approved prototype | `position: fixed` and `position: sticky` occurrences: **0** |
| **Pinned / scroll-scrubbed sequences: 0** | `02_RESOLVE_MOTION_BUDGET.md` §5 | **0 on the homepage, 0 on secondary pages, 0 on editorial** |
| **No scroll hijack** | §3 | *"no pinning, no scrubbing, no forced sequence, no gating"* |
| **Ambient regions: 0** | §5 | A visual held in view through a scroll range is the ambient case the direction removed on purpose |

The brief's own §20 caveat — *"Do NOT create 8-screen scroll prisons"* — shows the risk was
anticipated. **The governance answer is stricter than the caveat: the count is zero, not "short".**

> **RECOMMENDATION: do not build J6.** J8 delivers most of what J6 was wanted for — a reader
> stepping through states of one visual — **without pinning the page, without a scroll handler,
> and without a scroll-position dependency that has no honest mobile equivalent.** It is also
> already precedented at Gate 10.
>
> If the owner wants J6 regardless, that is a legitimate decision, but it must be taken explicitly
> as a **reopening of `DEC-018` §4.5 and `DEC-019`**, recorded in `DECISION_LOG.md`. **Phase J will
> not take it silently.**

---

## 4. The proposed per-page budget

Derived from `02_RESOLVE_MOTION_BUDGET.md` §5. **Phase J proposes no increase to any figure in
that table.**

| | Homepage | Capability / secondary | Editorial · legal · conversion |
|---|:--:|:--:|:--:|
| T1 MAJOR RESOLVE | 1 *(existing — untouched)* | **0** | **0** |
| T2 SECTIONAL RESOLUTION | 3 | **1** | **0** |
| T3 TRANSITION | 4 *(validated ceiling)* | **2** | **1** |
| T4 MICRO | the two defined behaviours | same | same |
| Signature interaction | 1 *(existing)* | **0** | **0** |
| **J8 disclosure control** | 1 *(existing tablist)* | **1** | **0** |
| Ambient regions | **0** | **0** | **0** |
| Pinned / scroll-scrubbed | **0** | **0** | **0** |
| **J9 composition variants** | unchanged | **unlimited — it is not motion** | **unlimited** |

**The consequence, stated plainly:** a capability route may carry **one** T2 and **one** disclosure
control. It may not carry an interactive figure in three different sections. **If Phase J is
expected to make several sections of one service page interactive, the budget must be reopened —
and that is an owner decision, not a Phase J one.**

`SystemStages` is the precedent for counting a disclosure control separately from the signature
interaction: Gate 10 accepted both on the homepage because they do **distinct informational jobs**,
and explicitly recorded that the tablist *"is not a second signature and does not raise the
signature limit."*

---

## 5. Rules binding every primitive

| # | Rule |
|---|---|
| **J-1** | Every visual explanation has a **text equivalent in server markup** — a caption, a heading or a named row. Never only a `title`, `desc` or `aria-label` |
| **J-2** | **Reduced motion resolves, it does not freeze.** Every settled state is present on first paint |
| **J-3** | **With JavaScript off, no meaning is lost** — only enhancement. Every panel open, every drawing complete |
| **J-4** | Every T2 fires **once per load**, on entering view, and **never replays**. The observer is disconnected on fire |
| **J-5** | A **~4 s force-completion floor** writes the resolved state if the observer never fires. A figure is never left in a start state |
| **J-6** | **No start state may exist in server markup.** Start states are written by a running script and removed by it |
| **J-7** | `transform` and `opacity` only. No animated layout property, no `filter`, no `box-shadow`, no canvas, no WebGL, no animation library |
| **J-8** | **No scroll handler**, no `rAF` loop, no timer surviving resolution |
| **J-9** | **Quantity safety.** No length, width, area or taper encodes a volume, a rate, a result or a proportion. Numbering is **order only** |
| **J-10** | **Not pointer-only.** Every control is keyboard-operable with a visible focus ring and a ≥ 40 px target (48 px on touch) |
| **J-11** | **Discoverable.** No hover-only affordance and no mystery-meat UI. Controls are labelled and visible |
| **J-12** | **Anti-tic M1–M7 remain binding.** No two consecutive regions run the same gesture |
| **J-13** | **No interactive state emits an analytics event.** Selecting a tab is not a conversion and is not instrumented |
| **J-14** | **No production enquiry data, ever.** Every example is generic and structural |

---

## 6. What this grammar deliberately refuses

Cursor-followers · floating decoration · endless parallax · looping backgrounds · WebGL · particles
· blobs · fake dashboards · fake charts · numeric counters · stock illustration · decorative icon
grids · per-stage colour · **anything that tapers** · motion that delays comprehension · a figure
used as a signature, watermark, divider, loader or page transition.
