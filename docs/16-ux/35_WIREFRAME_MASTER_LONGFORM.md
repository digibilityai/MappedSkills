# Wireframe — MASTER 05 — Long-Form Document (W5, modelled on a research entry) — PROPOSED

**Session:** 13 — Gate 9B completion pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** Legend: `30_WIREFRAME_LEGEND.md`.
**Source of structure:** `03_PAGE_TYPE_ARCHITECTURE.md` §8, §10 · `12_RESPONSIVE_UX.md` §10 · `10_EVIDENCE_INTERACTION_UX.md` (IMMEDIATE apparatus throughout).

**Covers structurally:** `/research/{slug}`, `/blog/{slug}` (as a variant — apparatus EXPANDABLE-with-byline-IMMEDIATE rather than fully IMMEDIATE, and no method section), and `/how-it-works` (**reading structure only**, per `03` §6 — apparatus IMMEDIATE throughout, no sticky). **`/how-it-works` does not inherit this master's F1 class — see the margin note below.**

---

## Margin notes

- **Page type:** Long-form reading document. Master for research entries; `/blog/{slug}` is a variant in apparatus state only (`28` §3, "does not need its own artefact").
- **First screen:** the question and why it was asked. **Never the conclusion as a hook.**
- **F1 class:** **D — NONE** for the routes this master actually models at launch — `/research/{slug}` and `/blog/{slug}`. The reading-column figure slot (F3 four-layer, F7 intervention record) is page-specific per `19`/`22`, not the run.
  - **`/how-it-works` exception — CORRECTED 2026-09-02 (orchestrator ruling D).** This master previously declared D — NONE for every route it covers, including `/how-it-works`. **That contradicted the approved taxonomy.** `22_F1_USAGE_TAXONOMY.md` §3 classifies `/how-it-works` as **A — FULL (§3) + C — STATE as F4 (§4/§5)**, and **`22` controls.** When `/how-it-works` becomes launchable it carries that classification, inheriting this master's *reading structure* — reading column, IMMEDIATE apparatus, no sticky, return path — but **not** this master's F1 class.
  - **The route remains owner-blocked and this correction does not unblock it.** `/how-it-works` is **case 0** (`26` §3 — the real delivery process is missing), and **F17, its stage figure, remains BLOCKED and is not drawn, sketched, placed or specified here or anywhere in `30`–`51`.** Recording the approved F1 class of a blocked route is a documentation correction, not a design of it: no F1 placement block for `/how-it-works` appears on any artboard in this set, because no `/how-it-works` artboard exists.
- **CTA roles/locations:** [SEC] RESEARCH (subscribe, small form) · [SEC] LOW-COMMITMENT · [ACT] PRIMARY well below the fold if at all. **Sticky prohibited (B16).**
- **Omitted slots:** named authorship [BLK — owner input, case 0 for the asset itself per `26` §3].
- **Patterns used (`49_UX_PATTERN_INVENTORY.md` IDs):** P4 *(article variant)* · P5 *(limitations)* · P11 · P12 · P13 *(page-specific figure slot)* · P14 · R1 · R2.
- **Width class shown:** WIDE (primary). NARROW in `48` §M6 (apparatus re-parented inline — the single biggest responsive risk in the direction).
- **What this artefact uniquely proves:** reading column protected at every width; IMMEDIATE apparatus (sample/date/location/method) survives narrow width without becoming a footer; no sticky CTA on a credibility surface (B16).

---

## WIDE structural diagram

```
┌───────────────────────────────────────────────────────────┐
│ [NAV] Header — breadcrumb: Home → Evidence → entry (`07`§6)│
├───────────────────────────────────────────────────────────┤
│ QUESTION + WHY IT WAS ASKED                        [ARG]    │
│  byline [IMMEDIATE] · date [IMMEDIATE]                       │
│  NO CTA, no booking prompt, no interruption (`03`§8/§10)      │
├───────────────────────────────────────────────────────────┤
│ [in-page table of contents, static, reading order — only on  │
│  long entries, per `07`§7]                                    │
├───────────────────────────────────────────────────────────┤
│ METHOD                                             [ARG]    │
│  sample · date · location · method — [EVD: IMMEDIATE]        │
│  (in the entry itself, never an appendix, `03`§8)             │
├───────────────────────────────────────────────────────────┤
│ FINDINGS (adverse included)              [FIG: page-specific]│
│  status marks (measured/not-testable/etc.) shape+label, never │
│  colour-only · not-testable visually distinct from a zero      │
├───────────────────────────────────────────────────────────┤
│ INTERPRETATION — labelled as such, not stated as fact          │
├───────────────────────────────────────────────────────────┤
│ LIMITATIONS                                        [LIM]     │
│  [EVD: ADJACENT-SECONDARY, never collapsible]                 │
├───────────────────────────────────────────────────────────┤
│ COMMERCIAL RELEVANCE — short, once, at the end                │
│  [SEC] CONTEXTUAL link (once)                                 │
├───────────────────────────────────────────────────────────┤
│ [REL] P11 return-to-decision link — contextual or /services   │
│  (Journey G depends on this existing)                          │
│  [SEC] RESEARCH subscribe · [SEC] LOW-COMMITMENT · [ACT]        │
│  PRIMARY, well below fold if at all — NO sticky                │
├───────────────────────────────────────────────────────────┤
│ [NAV] Footer                                                    │
└───────────────────────────────────────────────────────────┘
```

**`/blog/{slug}` variant note:** identical structure; apparatus is EXPANDABLE rather than IMMEDIATE (byline stays IMMEDIATE); no method section; CONTEXTUAL link only, no booking prompt ever (`03` §10).

**Prohibited on this wireframe (checked):** no not-testable system rendered as zero (B1), no blended cross-system figure (B9), no ranking/leaderboard (B8), no trend line from one measurement (B10), no aggregate score (B7), no sticky CTA (B16), no floating TOC overlay.
