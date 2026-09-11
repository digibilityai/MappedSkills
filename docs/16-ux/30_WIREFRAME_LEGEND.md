# Wireframe Legend — Shared Across All Wireframes — PROPOSED

**Session:** 13 — Gate 9B completion pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** Governs every wireframe in `31`–`47`. **APPROVED DECISION** basis: `27_GATE_9B_SCOPE_RECONCILIATION.md`, `28_WIREFRAME_SCOPE_AND_FIDELITY.md`.

> **One legend, used identically everywhere.** A label used inconsistently across wireframes is worse than no label.

---

## 1. Fidelity boundary (restated, binding)

Every wireframe in this set is a **low-fidelity structural documentation artefact** — Markdown, ASCII/box-style diagrams, functional labels. **No image, no final typography, colour, shadow, border, icon, photography or illustration.** Per `28` §7–§8: hierarchy, order, relative emphasis, grouping, approximate spatial relationship, navigation structure, CTA placement/role/repetition, figure placement/role/relative size, evidence placement/visibility state, responsive transformation, form flow, omitted slots (margin-annotated) are all that may be shown. Fonts, colours, borders, icons, illustration, photography, spacing tokens, pixel breakpoints, motion timing, and any rendered drawing of F1–F4 (or F17, which must never appear) are prohibited.

**Greyscale/functional-label only. Figures are labelled placement blocks, never attempted drawings.**

---

## 2. Width classes (APPROVED DECISION, §4B of the orchestrator task)

**NARROW / MEDIUM / WIDE.** No pixel breakpoint values — those are a **Gate 10** artefact. Each master states its transformation across these three classes (see `48_WIREFRAME_RESPONSIVE_VALIDATION.md`).

---

## 3. Notation tags

| Tag | Meaning | Notes |
|---|---|---|
| **[ARG]** | Commercial argument — a move in the page's persuasive sequence (confirm, bridge, problem, work, measurement, objections, etc.) | Text content, not apparatus |
| **[ACT]** | Primary action — a PRIMARY-weight CTA object (routes to `/contact`, or booking where approved) | Object, not a link |
| **[SEC]** | Secondary/contextual action — a SECONDARY CTA, a PROOF link, capability-routing link | May be a link or a lighter object |
| **[EVD]** | Evidence apparatus — a disclosure, provenance note, dated item, sample/scope note | Governed by `10_EVIDENCE_INTERACTION_UX.md`; apparatus visibility state noted per instance (ABSENT / EXPANDABLE / IMMEDIATE / ADJACENT-SECONDARY) |
| **[LIM]** | Interpretive limit / accountability boundary | Never collapsible at any width (B29); always ADJACENT-SECONDARY, full weight |
| **[FIG]** | Explanatory figure placement (F1–F4 only) | Labelled block only, with its F1 class (FULL/PARTIAL/STATE/NONE) per `22_F1_USAGE_TAXONOMY.md`; F17 must **never** appear |
| **[NAV]** | Navigation — header, footer, breadcrumb, in-page routing | See `46_WIREFRAME_STATE_NAVIGATION.md` |
| **[PEO]** | Real people / human-contact element | Owner-blocked at launch; annotated per `26_OWNER_BLOCKED_STRUCTURE_RULE.md` |
| **[BLK]** | Owner-blocked content position | **Documentation annotation only. NEVER visible on the real page.** Always drawn in the margin, never on the artboard (per `26` §5) |
| **[SYS]** | System/capability routing (P2 — capability routing block) | Routes by contribution, not a service menu |
| **[REL]** | Related content (P11 — return-to-decision link; P9 — entry cards) | Link, not a CTA object |
| **[FORM]** | Form (P10 — conversion surface, `/contact` only) | Per `09_FORM_AND_BOOKING_UX.md` |
| **[BOOK]** | Booking surface (`/schedule-call` only) | Per `09_FORM_AND_BOOKING_UX.md` §8 |

**No decorative notation.** A block with no tag is structural whitespace/grouping only, and is labelled as such (e.g. `[whitespace pause before ACT]`) rather than left ambiguous.

---

## 4. Margin-annotation convention (binding, from `26` §5)

Every wireframe carries margin notes stating: page type and master inherited from; first-screen requirement and confirmation of zero apparatus above the fold; apparatus visibility state per region; F1 class and reasoning; CTA roles/locations with repetition count; **omitted slots with the blocker that omits them** (never drawn on the artboard); the width class shown; and what the artefact uniquely proves.

**A blocked slot ([BLK]) is written only in the margin note, never as a container, dotted rectangle, or placeholder on the artboard itself.**

### 4.1 The keyed-omission convention *(clarified 2026-09-02, remediation pass)*

**A `[BLK]` tag written on a line inside the artboard is itself a violation of this rule**, even when the line says "does not render". A reader scanning the diagram sees a labelled position where the real page has nothing, which is precisely the reserved-position failure `26` §1 exists to remove.

**The binding convention, therefore:**

| Case (`26` §2) | What the artboard shows | Where the blocker is recorded |
|---|---|---|
| **Case 0** — the route does not launch | The artboard may draw the **FILLED** state at structural completeness, with **no `[BLK]` tag on any line** | A margin note listing every owner-blocked or technically-blocked element on the route, and the statement that the route does not launch |
| **Case A** — the slot is omitted entirely | **Nothing.** The surrounding content closes up as though the slot were never designed | A margin note naming the omitted element and its blocker |
| **Case B** — structure renders, one element does not | The surrounding structure, **minus the blocked element**, with no gap or label where it would be | A margin note naming the element and its blocker |
| **Case C** | Does not exist | — |

**The one permitted exception is `47_WIREFRAME_STATE_BLOCKED_CONTENT.md` (S5)**, whose entire purpose is to place the omitted and filled states side by side. **Even there, State A draws nothing at the omitted position** — the proof is the comparison with State B, not a label.

---

## 5. ASCII block convention

```
┌─────────────────────────────┐
│ [TAG] Block label            │   ← one block = one structural region
│  content description only    │
└─────────────────────────────┘
```

Nesting indicates containment. `···` between blocks indicates an intentional whitespace pause (e.g. before Block 8 on the homepage). A dashed border `┄┄┄` is reserved exclusively for figure elements that are themselves unmeasured/unattached per F1's own drawing convention (B23) — it is not a generic "TBC" marker, which does not exist in this legend (case C does not exist, per `26`).

---

## 6. What this legend does not do

It does not assign colour, weight, size or type to any tag. It does not imply a component name (P1–P14, R1–R2 are UX patterns, specified in `49_UX_PATTERN_INVENTORY.md`, not components). It does not pass Gate 9B.
