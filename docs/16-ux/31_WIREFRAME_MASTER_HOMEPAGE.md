# Wireframe — MASTER 01 — Homepage (W1) — PROPOSED

**Session:** 13 — Gate 9B completion pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** Low-fidelity structural wireframe. Legend: `30_WIREFRAME_LEGEND.md`.
**Source of structure:** `04_HOMEPAGE_UX.md`, `24_HOMEPAGE_APPARATUS_DECISION.md`, `22_F1_USAGE_TAXONOMY.md`, `21_ORCHESTRATOR_DECISIONS_H1_H5.md` (H1). **Approved H1 unchanged: "Judge us on the enquiries, not the traffic."**

---

## Margin notes

- **Page type:** Homepage (unique, no master inherited — this is the master).
- **First screen:** four elements, no fifth. Zero apparatus above the fold (`24_HOMEPAGE_APPARATUS_DECISION.md` §4 — LAUNCH DEFAULT).
- **F1 class:** **A — FULL** at Block 3; **C — STATE** at Block 4 (same instance, not a second figure). Per `22_F1_USAGE_TAXONOMY.md` §3.
- **CTA roles/locations:** [ACT] × 2 at Block 1 (form-route + booking, equal confidence); [SEC] capability routing at Block 5; [ACT] × 2 + [SEC] direct-contact at Block 8. Repetition: within the 2-PRIMARY + 1-sticky-optional budget (`08_CTA_SYSTEM.md`).
- **Omitted slots — margin annotation only; nothing below is drawn on the artboard** (`26` §5, `30` §4.1). Read the diagram as the launch page actually renders:

  | Slot | Case | Blocker | Artboard |
  |---|---|---|---|
  | First screen — the dated checkable item | **A** | Unlocks when the own-site diagnostic publishes (`24` §5) | **Nothing drawn.** The launch default is four elements |
  | Block 6 — the people element | **A** | Owner team/people input | **Nothing drawn.** Block 6 closes up and is shorter — which the direction says is correct and must not be compensated for |
  | Block 6 — own-site diagnostic link *(and its sentence)* | **A** | Technical prerequisite: the own-site fixes | **Nothing drawn** |
  | Block 8 — "what happens next" sentence | **B** | Owner response process | **Nothing drawn.** Block 8 renders its other content and says nothing about timing |
  | Block 8 — phone/WhatsApp DIRECT control | **B** | Published phone number | **Nothing drawn.** Form and booking remain |
  | Footer R2 — entity block NAP | **A** | Complete NAP *(owner)* | **Nothing drawn** rather than a partial address |

  **No container, heading, dotted outline or "see margin" label appears at any of these positions.** The side-by-side proof is `47_WIREFRAME_STATE_BLOCKED_CONTENT.md`.
- **Patterns used (`49_UX_PATTERN_INVENTORY.md` IDs):** P2 · P3 *(A — FULL + C — STATE)* · P4 · P5 · P7 · P8 · P13 · R1 · R2. **Not P1** — the commercial opener is not permitted on `/` (`49` P1 field 8).
- **Width class shown:** WIDE (primary). NARROW variant is `48_WIREFRAME_RESPONSIVE_VALIDATION.md` §W1 and mobile artefact M1.
- **What this artefact uniquely proves:** the only page carrying a FULL RUN + STATE pair on one instance, the only first-screen apparatus exception (currently unspent), and the four-choice architecture (convert / route / check — check currently inert).

---

## WIDE structural diagram

```
┌───────────────────────────────────────────────────────────┐
│ [NAV] Header — logo · nav items · [ACT] header CTA → /contact│
├───────────────────────────────────────────────────────────┤
│ BLOCK 1 — HERO                                    [ARG]     │
│  H1: "Judge us on the enquiries, not the traffic."           │
│  supporting line (subordinate, acquisition route stated)     │
│  [ACT] primary: enquiry → /contact   [ACT] primary: booking  │
│  (launch default is FOUR elements — H1, supporting line, and  │
│   the two actions. Nothing is drawn for the fifth)            │
├───────────────────────────────────────────────────────────┤
│ BLOCK 2 — RECOGNITION                             [ARG]     │
│  reader recognises own situation. [EVD: ABSENT]              │
├───────────────────────────────────────────────────────────┤
│ BLOCK 3 — MECHANISM                    [FIG: F1 FULL]       │
│  ┄┄ discovery/source → landing → interaction → enquiry ┄┄   │
│  ┄┄ → qualified enquiry → opportunity/revenue (client data)┄│
│  boundary drawn · unmeasured stretches dashed · ≥1 unattached│
│  arrival · intervention marks. One optional non-blocking      │
│  reveal on view-entry; complete static without it.           │
│  [EVD: EXPANDABLE] at mid-page claims                        │
├───────────────────────────────────────────────────────────┤
│ BLOCK 4 — BOUNDARY               [FIG: F1 STATE (same obj)] │
│  [LIM] accountability boundary — ADJACENT-SECONDARY,         │
│  never collapsible. Follows Block 3's mechanism (B28).       │
├───────────────────────────────────────────────────────────┤
│ BLOCK 5 — CAPABILITIES                    [SYS] routing     │
│  grouped by contribution, one line each, AI search = one line│
│  [EVD: ABSENT] — this block is routing, not persuasion       │
├───────────────────────────────────────────────────────────┤
│ BLOCK 6 — WHAT CAN BE CHECKED             [EVD: IMMEDIATE]  │
│  opens on admission: "no case studies to show you"           │
│  checkable items (sparse — not compensated for)              │
├───────────────────────────────────────────────────────────┤
│ BLOCK 7 — FIT                                      [ARG]    │
│  who this is for / not for. [EVD: ABSENT]                   │
├───────────────────────────────────────────────────────────┤
│ ··· isolation whitespace — more space than preceding ···    │
│ BLOCK 8 — FINAL ACTION                                       │
│  [ACT] form-route  [ACT] booking  [SEC] direct contact       │
│  [EVD: ABSENT — no exceptions]                                │
├───────────────────────────────────────────────────────────┤
│ [NAV] Footer — R2 entity block · capability routing (P2,      │
│  third surface)                                               │
└───────────────────────────────────────────────────────────┘
```

**Sequence pace (unchanged from `04` §3):** fast → fast → slow → slowest → fast → medium/warm → medium → fast.

**Prohibited on this wireframe (checked):** no tapering of F1, no per-stage colour, no ambient reuse, no metric tile in the fifth first-screen slot, no ["coming soon"] filler in Block 6, no sticky sales CTA in the header (H2/H3 — the header is NON-STICKY by default), **no `[BLK]` tag, container, dotted outline or placeholder drawn on the artboard for any blocked slot** (`30` §4.1).
