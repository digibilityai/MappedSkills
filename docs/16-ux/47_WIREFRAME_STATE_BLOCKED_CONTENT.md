# Wireframe — STATE 05 — Blocked Slots (S5) — omitted vs. filled, side by side — PROPOSED

**Session:** 13 — Gate 9B completion pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** Legend: `30_WIREFRAME_LEGEND.md`.
**Source of structure:** `26_OWNER_BLOCKED_STRUCTURE_RULE.md` §2–§5 (the three-way test: case 0 / A / B; case C does not exist).

---

## Margin notes

- **Page type:** Homepage (`/`), chosen because it carries the clearest case-A and case-B slots among launching routes (`26`§3).
- **First screen / apparatus:** as `31_WIREFRAME_MASTER_HOMEPAGE.md` — unchanged by this artefact.
- **F1 class:** as W1 (A-FULL Block 3, C-STATE Block 4) — unaffected by slot omission.
- **CTA roles/locations:** as W1.
- **Omitted slots:** this artefact's entire purpose is to show them, both ways.
- **Patterns used (`49_UX_PATTERN_INVENTORY.md` IDs):** As W1 (`31`): P2 · P3 · P4 · P5 · P7 · P8 · P13 · R1 · R2 — unchanged by slot omission.
- **Width class shown:** WIDE.
- **What this artefact uniquely proves:** omission leaves no visible hole, and supplying the blocked input later is a content change, not a redesign (`26`§5 — the explicit purpose of S5).

---

## Two states of Block 6 and Block 8, side by side

```
STATE A — OMITTED (launch default, current owner-input status)
┌───────────────────────────────────────────────────────────┐
│ BLOCK 6 — WHAT CAN BE CHECKED               [EVD: IMMEDIATE]│
│  opens on admission: "no case studies to show you"           │
│  checkable items (sparse — not compensated for)               │
│                                                                 │
│  Block 6 ends here. It is shorter than State B and there is     │
│  no gap, heading or marker where State B's two items sit.        │
├───────────────────────────────────────────────────────────┤
│ BLOCK 8 — FINAL ACTION                                        │
│  [ACT] form-route  [ACT] booking                                 │
│                                                                    │
│  The action region renders. Nothing occupies the positions        │
│  State B fills.                                                     │
└───────────────────────────────────────────────────────────┘

STATE B — FILLED (once the owner input is supplied)
┌───────────────────────────────────────────────────────────┐
│ BLOCK 6 — WHAT CAN BE CHECKED               [EVD: IMMEDIATE]│
│  opens on admission: "no case studies to show you"           │
│  checkable items                                               │
│  [PEO] people element — NOW RENDERS (real names, no stock,      │
│   no silhouettes)                                                 │
│  [SEC] own-diagnostic link — NOW RENDERS                          │
├───────────────────────────────────────────────────────────┤
│ BLOCK 8 — FINAL ACTION                                          │
│  [ACT] form-route  [ACT] booking  [SEC/PEO] direct contact —      │
│  NOW INCLUDES the DIRECT control at equal weight                    │
│  "what happens next" sentence — NOW RENDERS                          │
└───────────────────────────────────────────────────────────┘
```

**What differs between the two states — recorded here, in the documentation, and NOT drawn on State A's artboard** (`26` §5, `30` §4.1):

| Element | Case | Blocker | State A | State B |
|---|---|---|---|---|
| Block 6 — the people element | **A** | Owner: team/people input | **Absent.** Block 6 closes up | `[PEO]` renders — real names, no stock, no silhouettes |
| Block 6 — own-site diagnostic link *(and its sentence)* | **A** | Technical: the own-site fixes | **Absent** | `[SEC]` link renders |
| Block 8 — the DIRECT control | **B** | Owner: published phone number | **Absent.** Form and booking remain | `[SEC/PEO]` DIRECT renders at equal weight |
| Block 8 — "what happens next" sentence | **B** | Owner: enquiry response ownership | **Absent.** The block says nothing about timing | The sentence renders |

**Read State A as the page a visitor sees today.** Four elements are missing from it and **none of them is announced** — no label, no parenthesis, no dotted outline, no "does not render" marker. The earlier version of this artefact printed those markers inside State A's artboard, which is the reserved-position failure this artefact exists to disprove; they are now where they belong, in this table.

**The structural point being proved:** comparing the two states, **no container, heading, or dotted placeholder exists in State A for what State B later fills.** The block boundary itself (heading, opening admission sentence, surrounding whitespace) is IDENTICAL in both states — only the specific blocked elements differ. Nothing in State A "reserves a position" visibly; the omission is a content difference, not a layout difference. This is the direct test of `26`'s case-C prohibition (no visible empty state exists anywhere on this page).

**Cross-reference — case 0 vs. case A/B, for completeness:** `/pricing`, `/about`, `/contact`, `/schedule-call` and `/how-it-works` are **case 0** — the whole route does not launch, so no page exists to show side by side. S5 therefore uses the homepage, the clearest launching example of case A and case B slots on one page.

**Prohibited on this wireframe (checked):** any dotted rectangle, "TBC" label, `[BLK]` tag, parenthetical "does not render" note, or placeholder container drawn on State A's artboard for a blocked slot (blocked slots are margin-annotated only, per `30`§4); any heading rendered with nothing beneath it in State A; any visual difference between State A and State B beyond the specific blocked elements themselves.
