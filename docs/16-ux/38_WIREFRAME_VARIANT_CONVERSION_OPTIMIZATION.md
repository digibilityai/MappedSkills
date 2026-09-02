# Wireframe — VARIANT 02 — Diagnostic-Led Commercial (V2, `/conversion-optimization`) — of W2 — PROPOSED

**Session:** 13 — Gate 9B completion pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** Legend: `30_WIREFRAME_LEGEND.md`. Inherits `32_WIREFRAME_MASTER_COMMERCIAL.md` (W2).
**Source of structure:** `COMMERCIAL_PAGE_MESSAGE_PATTERN.md` §1.1–§1.2 (`/conversion-optimization` = moves 1, 2, 3, 5, 6, 7, 9; move 4 compressed) · `05_COMMERCIAL_PAGE_UX.md` §4.6 · `23_COMMERCIAL_PAGE_DIFFERENTIATION_TEST.md` §3 · `22_F1_USAGE_TAXONOMY.md` §3 (`/conversion-optimization` = B — PARTIAL, landing/enquiry segment = F2-shallow, same object).

> **CONSEQUENTIAL CORRECTION 2026-09-02 (remediation pass).** Re-checked against the re-authored W2 (`32`). **"MOVE 6 — WORKED CONTEXT" was a mislabel** carried from the previous master: move 6 is **how it is measured and what will be shown**, and move 7 is **evidence in context**. Both are mandatory on this page and are now drawn as the approved moves, with the measurement limits adjacent and open. **The page's distinctive arrangement — opening on the loss, routing down, and the diagnostic figure as the second move — is unchanged and must not be normalised toward W2.**

---

## Margin notes

- **Page type:** Commercial page, variant of W2. **Structural difference:** the figure arrives as the second move; F2-shallow **is** the partial run, one object not two; opens on the loss, not the discipline.
- **Intent-driven variation (`05` §3 drivers, stated not coded):** **sophistication** — medium; the buyer knows the symptom, not the cause, so move 4 compresses · **scepticism** — medium, and diagnostic rather than categorical · **misinformation** — the belief that conversion work is always the right fix, which the page contradicts by routing down · **dispute risk** — statistical validity below a real traffic threshold, which is why move 5 carries the experimentation boundary.
- **First screen:** as W2 — confirm + bridge + [ACT], zero apparatus. Move 2 routes down to the problem page, genuinely prominent (this is the honest destination for most of this page's traffic).
- **F1 class:** **B — PARTIAL** (landing/enquiry segment), rendered as the **shallow four-zone variant** — deliberately shallower than the problem page's F2 and must be visibly the same object at two depths (`05` §4.6, a design instruction, not a content note).
- **CTA roles/locations:** as W2. Move 5 carries the experimentation boundary (below a real-traffic threshold, this is diagnosis/design, not statistically valid A/B testing) — a scope boundary, not a CTA.
- **Omitted slots:** the own-diagnostic link inside move 7 — **case A** (`26` §3), blocked on the technical prerequisite (the own-site fixes). It **does not render**, and it is **not drawn on the artboard**: the surrounding sentence closes up with it (`30` §4).
- **Patterns used (`49_UX_PATTERN_INVENTORY.md` IDs):** P1 · P3 *(B — PARTIAL, and the same object as P6-shallow)* · P4 · P5 · P6 *(shallow)* · P8 · P12 · P13 · R1 · R2.
- **Width class shown:** WIDE (primary).
- **What this artefact uniquely proves:** a PARTIAL run and a page-specific diagnostic figure can be the same object at two depths, satisfying both `22`'s PARTIAL rules and `05`'s cross-page consistency requirement with the problem page.

---

## WIDE structural diagram — differences from W2 only

```
┌───────────────────────────────────────────────────────────┐
│ MOVE 1 — OPENER: OPENS ON THE LOSS (not the discipline)      │
│  [ACT] first screen · [EVD: ABSENT]                           │
├───────────────────────────────────────────────────────────┤
│ MOVE 2 — ROUTES DOWN, PROMINENT             [SEC] CONTEXTUAL │
│  → /problems/traffic-but-no-enquiries (the honest destination │
│  for most of this page's traffic)                              │
├───────────────────────────────────────────────────────────┤
│ MOVE 3 — DIAGNOSTIC VISUAL, SECOND MOVE (earlier than any      │
│  other commercial page except /ai-seo's F3)                     │
│                              [FIG: F1 PARTIAL = F2-shallow]     │
│  four loss zones, shallow depth · SAME OBJECT as W3's F2 at     │
│  full depth — must be recognisable as such by a reader arriving │
│  from either page (`06` §8 cross-page relationship)             │
├───────────────────────────────────────────────────────────┤
│ MOVE 4 — SCOPE (compressed)                        [ARG]     │
├───────────────────────────────────────────────────────────┤
│ MOVE 5 — BOUNDARY: EXPERIMENTATION VALIDITY         [LIM]     │
│  below a real traffic threshold = diagnosis/design, NOT         │
│  statistically valid A/B testing (`BUSINESS_STRATEGY.md`§7)      │
│  [EVD: ADJACENT-SECONDARY, never collapsible]                    │
├───────────────────────────────────────────────────────────┤
│ MOVE 6 — HOW IT IS MEASURED, AND WHAT WILL BE SHOWN   [ARG]   │
│  including what cannot be attributed                             │
│  ── measurement limits, ADJACENT and OPEN ──          [LIM]      │
│  never collapsible at any width, never below the CTA (`10`§5)     │
├───────────────────────────────────────────────────────────┤
│ MOVE 7 — EVIDENCE, BESIDE THE CLAIM IT SUPPORTS   [EVD:         │
│  the own-diagnostic worked example, at the point of the claim ·   │
│  never a section, never a step before the conversion (I6)         │
│  EXPANDABLE] · own-diagnostic link is case A while the technical  │
│  prerequisite is unmet — margin-annotated, not drawn               │
│  (MOVE 8 is absent on this page — objections are handled at        │
│   sentence level inside moves 3 and 5, per `05`§5)                  │
├───────────────────────────────────────────────────────────┤
│ MOVE 9 — ACT ("CRO" appears in title/meta only — never in       │
│  body, heading, breadcrumb, nav label, figure caption or CTA)   │
│  [ACT] × 2 + one [SEC/PEO] DIRECT · [EVD: ABSENT — I8]           │
└───────────────────────────────────────────────────────────┘
```

**Move order, for the clone check in `50` §2:**
`confirm → bridge (on the loss) → routes down → **four zones (F2-shallow = F1 PARTIAL), second move** → work (compressed) → **experimentation boundary** → measurement → evidence → convert`
— matching `23` §3's `/conversion-optimization` row.

**Moves present and absent, against `COMMERCIAL_PAGE_MESSAGE_PATTERN.md` §1.2:**

| Move | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|
| `/conversion-optimization` | ✓ | ✓ | ✓ **as the figure** | **compressed** | ✓ **experimentation** | ✓ | ✓ | — | ✓ |


**Prohibited on this wireframe (checked):** "CRO" anywhere in the rendered page body (`05` §4.6), F2-shallow drawn as a different object from W3's F2 (cross-page consistency failure), the experimentation boundary presented as a CTA rather than a scope limit, the routing link to the problem page demoted below fold-equivalent prominence.
