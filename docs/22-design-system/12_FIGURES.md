# Figures — THE ARRIVAL

**Session:** 16 · **Date:** 2026-09-03 · **Status:** PROPOSED

> **The approved figure taxonomy and every figure's MEANING are not reopened.**
> `docs/11-creative/19_FIGURE_PRIORITISATION.md` (Tier 1: F1 the run · F2 the four causes · F3 the
> four AI layers · F4 what cannot be attributed) and `docs/16-ux/22_F1_USAGE_TAXONOMY.md` (the
> binding A/B/C/D class per route) both stand as approved. This document only says how a figure
> **looks and behaves** in THE ARRIVAL.

---

## 1. Reinterpretation, not redefinition

A figure gains the system's **materials** — the dark ground, warm bone stroke, the amber accent for
commercial states, the shape vocabulary for honest ones. It does **not** gain a new meaning, a new
class, or an extra element.

**Binding, carried unchanged from the approved creative direction:**
- **No taper of any kind.** Constant stroke width, identical node size, equal spacing. **The
  distance between "the run" and "a funnel" is one decision about tapering**, and the vocabulary
  must offer no way to make it.
- **No per-stage colour.** The chain is one material; the accent marks only commercial states.
- **Dashed always means a genuine epistemic gap.** Nothing else, ever.
- **Every label is real text**, never baked into an image.
- **Every figure carries a text or tabular equivalent** conveying the same relationships.
- **Figure labels never fall below the body minimum**, which means **figures are never scaled down
  to fit**.
- **At most one figure of full weight per page.**
- **F17 (`/how-it-works` stages) remains BLOCKED** — not designed, sketched or placeholdered.

## 2. Materials

| Element | Treatment |
|---|---|
| Measured stroke | `text-primary`, 2px, solid |
| Unmeasured stroke | `text-primary`, 2px, **dashed** |
| Recessive stroke | `shape-recessive`, 1.5px — **stroke only, never a label colour** |
| Client-data stretch | Doubled recessive line, labelled as the client's own system |
| Node | Solid square, identical size throughout |
| Intervention mark | A short stem plus a small **amber** square — where the work is done |
| Accountability boundary | An **amber** rule across the object, labelled |
| Unattached arrival | A **dashed** line entering a node with no upstream segment |
| Labels | Interface face. Point labels `text-primary` 600; annotations `text-secondary` |

**The amber rule inside a figure:** the accent appears **only** on intervention marks and the
accountability boundary — the two genuinely commercial facts in the drawing. It never colours a
stage, a stroke or a node.

## 3. Motion in figures

> **Motion is allowed only when it materially improves understanding.**

| Allowed | Prohibited |
|---|---|
| **One** non-blocking sequential reveal on entering view, once, where the figure's argument is a progression | Ambient motion of any kind inside a figure |
| A state change on the **same object** where the approved taxonomy specifies a STATE class | Scroll-scrubbing a figure |
| Nothing at all — the default | Turning any figure into a running signal field |

**Do NOT turn every figure into moving signals.** The signal field and the figures are two
different things: the field is the *atmosphere of demand*; a figure is a *drawn argument*. Merging
them would destroy both. **A figure's complete static state always carries the whole meaning.**

Under reduced motion the figure renders complete, all points visible, all labels present. **This is
the primary state.**

## 4. Narrow behaviour

**Figures recompose; they never scale sideways and never scroll horizontally.**

- Below the width a horizontal drawing needs, it is **replaced by its genuine vertical form** — a
  different drawing, not a smaller one.
- The vertical form carries **every honest element** of the horizontal one: the dashed lead-in, the
  boundary, the unattached arrival, the client-data stretch.
- **Labels stay at the body minimum at every width.** If they cannot, the drawing is wrong.
- The page body never scrolls horizontally.

## 5. The figure wrapper (P13)

Hairline-edged region on the primary or raised field · caption in `text-secondary` beneath ·
**an expandable text/tabular equivalent** that stays in the DOM, is keyboard-reachable and is
**forced open in print** · `role="img"` with a `<title>` and a substantive `<desc>` conveying the
same relationships as the drawing.

## 6. The rule that keeps figures from becoming a signature

Carried unchanged: **a figure that appears everywhere stops explaining and starts branding, and a
brand device shaped like a path is a funnel.** The approved taxonomy already cut F1 to six of
twenty-two routes with three at full weight. **That taxonomy governs; this system does not extend
it.** D — NONE remains the default, and a route earns a figure by argument.
