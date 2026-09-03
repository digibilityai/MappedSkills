# THE ARRIVAL — Design System — Overview

**Session:** 16 · **Date:** 2026-09-03 · **Branch:** `test_branch`
**Visual direction:** **APPROVED by the owner** — see `DEC-017` in `docs/00-project/DECISION_LOG.md`.
**This design system:** **PROPOSED. Not approved.** It is the Gate 10 deliverable and Gate 10 is
**not passed** — Claude does not pass gates.
**Source of truth for the direction:** `docs/21-creative-convergence-a/prototype/convergence-a.html`

---

## 1. What was approved, and what was not

| | |
|---|---|
| **APPROVED** | **THE ARRIVAL** as the visual direction for MappedSkills. The owner reviewed original A, Direction B, Session 15C and Session 15D side by side and said: *"Yes, 15D is clearly better."* |
| **NOT APPROVED** | This design system. Every token, rule and pattern below is **proposed** and is the input to a Gate 10 review |
| **CLOSED** | Creative-direction exploration. **There is no Session 15E.** No further territories, no further A/B/C alternatives, no reopening of THE WORKING SHEET, no reopening of B as the foundation |

## 2. The direction in one paragraph

> **Demand is active. It travels through a dark visual field. Most activity is merely activity.
> When demand becomes commercially meaningful, its state visibly changes — it is caught, stalled,
> converted, tagged, unattributed, measured or not testable. The experience distinguishes
> ACTIVITY from COMMERCIAL CONSEQUENCE, which is the approved positioning made visible:
> "Judge us on the enquiries, not the traffic."**

## 3. THE RECORD, unchanged

**THE RECORD is a CREDIBILITY SYSTEM, not a visual genre.** It governs evidence, provenance,
measurement, limitations and accountability. It does **not** set the typography, the geometry or
the atmosphere of the site.

**MappedSkills must never again look like a document, journal, textbook, audit report or research
paper.** Evidence supports the commercial experience; it never dominates it. The site communicates
*"this is a sharp modern marketing company"* first, and *"they are unusually rigorous about
evidence and measurement"* second.

## 4. How to read these documents

| File | What it settles |
|---|---|
| `01_CREATIVE_DIRECTION_FROZEN.md` | **The freeze.** What is BINDING and what is FLEXIBLE — read this first |
| `02_COLOUR.md` | Semantic colour roles, measured contrast, where amber is permitted |
| `03_TYPOGRAPHY.md` | The two families, the roles, the responsive ranges, the anti-document rules |
| `04_LAYOUT_AND_SURFACES.md` | Gutters, widths, section rhythm, full-bleed, and the four surface states |
| `05_SIGNAL_SEMANTICS.md` | The eight signal states and the rule that keeps them out of fabricated quantity |
| `06_MOTION.md` | Five roles, binding budgets, reduced motion |
| `07_VISUAL_PRIMITIVES.md` | The twelve reusable marks and structures of THE ARRIVAL |
| `08_PATTERNS.md` | The bounded pattern inventory, mapped to the approved UX architecture |
| `09_NAVIGATION_AND_ACTIONS.md` | Header, narrow navigation, buttons, links, controls |
| `10_FORMS.md` | Visual treatment for the approved `/contact` architecture |
| `11_EVIDENCE.md` | The claim and what it stands on |
| `12_FIGURES.md` | The approved figure taxonomy, reinterpreted — meaning unchanged |
| `13_RESPONSIVE.md` | WIDE / MEDIUM / NARROW behaviour, as behaviour rather than pixels |
| `14_ACCESSIBILITY_AND_PERFORMANCE.md` | Binding requirements and honest limits |
| `15_ANTI_PATTERNS.md` | The binding drift register |
| `16_HOMEPAGE_READINESS.md` | Whether the complete homepage can now be designed without inventing anything |

## 5. What governs what — the precedence order

When two documents appear to conflict, this order settles it:

1. **Approved strategy, positioning, IA, messaging and copy** — never overridden by design.
2. **Approved UX architecture (Gate 9B, `DEC-016`)** — structure, sequence, CTA architecture,
   evidence placement, blocked-content rules, the F1 taxonomy.
3. **`01_CREATIVE_DIRECTION_FROZEN.md` — the BINDING list.**
4. **The evidence and claims rules** — nothing here permits a fabricated quantity.
5. Everything else in this directory, which is implementation guidance.

**Design never resolves a conflict in its own favour.** If a visual rule cannot be satisfied
without breaking an approved decision, the visual rule loses and the conflict is reported.

## 6. Scope boundary

**This session did not and must not:** design the complete homepage · design any other route ·
write production code · modify `app/`, `components/`, `public/`, `styles/`, `hooks/`, `lib/`,
`scripts/` or any config · resolve any owner blocker · pass any gate.

**`F17` (the `/how-it-works` stage figure) remains BLOCKED** and is not designed, sketched or
placeholdered anywhere in this system.

## 7. Evidence base and its limits

Everything in this system is derived from **one rendered prototype**, inspected at 1440×900 and
390×844, plus the approved artefacts it was built from. **It has not been tested with a screen
reader, on a real device, in another browser, in print, at 200% text zoom, or with any user.**
Those limits are restated wherever a claim depends on them, and they are the first items in the
Gate 10 validation list.
