# Gate 9B — Scope Reconciliation — PROPOSED

**Session:** 13 — Orchestrator correction / gate-scope reconciliation pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED. GATE 9B REMAINS NOT PASSED.**

> **`docs/00-project/QUALITY_GATES.md` was inspected read-only and was NOT modified.** The durable gate definition stands as written and is **not weakened by this document.**

---

## 1. The durable definition, quoted exactly

> ## Gate 9B — UX
> **Required:** wireframes/page templates, responsive behaviours, component inventory.
> **Acceptance:** clear hierarchy, usable at target breakpoints, aligned to CRO. **Binding input:** the refined `14_DESIGN_ANTI_PATTERNS.md` (approved, Gate 9A, `DEC-015`).

**The orchestrator's ruling, which this document implements:** the UX architecture is **substantively approved**, but **Gate 9B cannot pass** because the durable definition requires low-fidelity wireframes and a component/pattern inventory, and neither exists.

**Session 13's earlier H6 — whether the gate should be reinterpreted — is closed.** The gate is not reinterpreted and not narrowed. **It is completed.**

---

## 2. Requirement-by-requirement status

| Requirement | Status | Evidence / what is missing |
|---|---|---|
| **Wireframes / page templates** | **PARTIAL** | **Page templates exist as prose** — `03_PAGE_TYPE_ARCHITECTURE.md` defines 17 page types with first-screen requirements, sequence logic, evidence placement, CTA behaviour, mobile behaviour and prohibitions; `16_PAGE_STRUCTURE_MATRIX.md` covers every launch route. **No wireframe of any kind exists.** The visual/spatial half of this requirement is entirely outstanding |
| **Responsive behaviours** | **COMPLETE** | `12_RESPONSIVE_UX.md` in full, plus per-page-type mobile rules in `03`, the apparatus transformation rule in `10` §7, and per-figure narrow forms in `11`. **Validation against wireframes is outstanding** — see acceptance below |
| **Component inventory** | **PARTIAL** | `17_REUSABLE_UX_PATTERNS.md` defines 11 patterns with job, placement, prohibitions and variation rules. **It is not yet an inventory**: three patterns are missing, and none of the 14 captures the six additional fields the inventory requires. See `29_UX_PATTERN_INVENTORY_SPEC.md` |
| **Acceptance — clear hierarchy** | **SPECIFIED, NOT DEMONSTRATED** | The hierarchy is specified in prose throughout and is testable by the first-fixation, standalone and proportion tests. **A prose specification is not a demonstration** — the wireframes are what demonstrate it |
| **Acceptance — usable at target breakpoints** | **BLOCKED ON A GATE 10 ARTIFACT — flagged** | **No target breakpoints exist.** Breakpoint values are explicitly a Gate 10 output (`13_RESPONSIVE_ACCESSIBILITY_PRINCIPLES.md` §5, `12` §15). **Proposed resolution, requiring approval:** Gate 9B validates at **structural width classes — narrow, medium, wide** — and numeric breakpoint values remain Gate 10. This satisfies the acceptance criterion's intent without inventing a value or moving a Gate 10 decision forward |
| **Acceptance — aligned to CRO** | **COMPLETE** | Every CTA role, placement rule, sticky permission, form field, booking capability and post-submission behaviour is carried unchanged from `DEC-011`, and the H1–H5 decisions resolve the four open CRO-adjacent questions |
| **Binding input — the anti-pattern framework** | **COMPLETE** | A1–A23 and B1–B32 carried in full; 20 UX-specific additions in `18_UX_ANTI_PATTERNS.md`, each naming a harm and its source; a "deliberately not banned" list so nothing reads as taste |

---

## 3. What Session 13 has completed

**Twenty-nine artifacts in `docs/16-ux/`.** In substance:

- **Seven user journeys**, each with entry, decision points, permitted exits and a stated breaking condition; none forcing a sequence.
- **Seventeen page types**, each fully specified in prose across eleven dimensions.
- **The homepage UX**, on the approved narrative and block order, with the first-screen apparatus question now decided.
- **The commercial-page system** — 13 invariants, a variation driver set, and a six-page differentiation stress test with two architectural fixes.
- **The problem-page UX**, with the interaction question decided against the affordance.
- **Navigation, CTA, form, booking and thank-you UX**, with all five open decisions now recorded.
- **The evidence-interaction contract** — four verbs, one disclosure pattern, twelve behavioural requirements.
- **Tier 1 figure UX**, plus a binding F1 usage taxonomy that reduces the run from 8 routes to 6 and reclassifies three.
- **Responsive, accessibility and performance requirements**, with no conformance or performance claim.
- **Search and AI-discovery constraints.**
- **The page structure matrix**, reconciling exactly to 22 / 2 / 5.
- **Eleven reusable patterns**, twenty UX anti-patterns, ten owner blockers with an omission rule, and a proposed gate.

**Substantively approved by the orchestrator.** Not re-opened by this pass.

---

## 4. What Gate 9B still requires

**Five deliverables. None is visual design.**

### A — Low-fidelity structural wireframes

Structural, not visual. **Set defined in `28_WIREFRAME_SCOPE_AND_FIDELITY.md`** — 6 masters, 6 variants, 5 states, and 7 mobile structural wireframes. Fidelity boundary defined in the same document.

### B — UX component / pattern inventory

**Not a React component inventory.** A UX inventory of recurring structural elements and their behaviour. **Scope defined in `29_UX_PATTERN_INVENTORY_SPEC.md`** — 14 patterns and 2 sitewide regions, each against twelve fields.

### C — Cross-page wireframe consistency check

A pass over the completed set verifying that:
- the spine holds across every page type;
- no two commercial pages share a sequence;
- **the run does not appear on every commercial wireframe** (the taxonomy's own acceptance test);
- CTA repetition stays within budget on every page;
- no apparatus appears above any fold except where explicitly permitted — **which, after `24`, is nowhere at launch**;
- every pattern used in a wireframe exists in the inventory, and every pattern in the inventory is used.

### D — Mobile structural wireframes for the most important states

**Seven, defined in `28` §5.** These are where the architecture is most likely to fail, not a courtesy pass.

### E — Gate 9B validation against the durable criteria

The completed set assessed against **the durable definition quoted in §1** and against the nine-part proposed gate in `20_GATE_9B_QUALITY_GATE.md`, with the width-class resolution in §2 above either approved or replaced.

---

## 5. What is explicitly **not** required for Gate 9B

Recorded so the remaining pass does not expand.

| Not required | Belongs to |
|---|---|
| Fonts, colours, spacing tokens, type scale, grid definitions | Gate 10 |
| Numeric breakpoint values | Gate 10 |
| Visual motif execution, icons, illustration, photography | Gate 10 |
| Polished or high-fidelity mockups, style frames, prototypes | Gate 10 / 11 |
| React or implementation components | Gate 13 |
| **F17, the `/how-it-works` stage figure** | **BLOCKED — must not be designed at any gate until the owner supplies the real process** |
| Finished renderings of F1–F4 | Gate 10. **The wireframes show placement, role, size relationship and static-state requirement — not the drawing** |
| Any owner-blocked content | Not a gate deliverable at all |
| Any production code change | Gate 13 onward |

---

## 6. Sequencing note

**The wireframe pass and the inventory pass are one piece of work, not two**, and should run in that order within it: **inventory fields are discovered by wireframing.** Attempting the inventory first produces a list written from the prose specification, which is what `17` already is.

**Recommended order:** masters → the three commercial variants *(the differentiation proof)* → states → mobile set → inventory → consistency check → gate validation.

---

## 7. Gate status

**GATE 9B — UX: NOT PASSED.**

**The UX architecture is substantively approved.** The gate remains open on deliverables A–E. **No gate status was changed by this pass, and `QUALITY_GATES.md` was not modified.**
