# Wireframe — MASTER 03 — Problem Page (W3, `/problems/traffic-but-no-enquiries`) — PROPOSED

**Session:** 13 — Gate 9B completion pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** Legend: `30_WIREFRAME_LEGEND.md`.
**Source of structure:** `06_PROBLEM_PAGE_UX.md` §3, §5, §6 · `03_PAGE_TYPE_ARCHITECTURE.md` §4 · H5 (`21_ORCHESTRATOR_DECISIONS_H1_H5.md`) — recording affordance NOT APPROVED for launch.

---

## Margin notes

- **Page type:** Problem page. Unique structure — no CTA above the fold, instrument mid-page, away-pointing outcomes protected, commercial transition last.
- **First screen:** symptom named in reader's own words + promise the checks are on-page and runnable today. **No CTA, no apparatus, no sticky above the fold.**
- **F1 class:** **D — NONE.** F2 (four causes) and F6 (five checks) are this page's own objects (`22` §3). No run appears.
- **CTA roles/locations:** none above fold · [SEC] CONTEXTUAL only in Move 6, where a finding genuinely points elsewhere · [SEC] PROOF + [SEC] LOW-COMMITMENT in Move 7 · [ACT] DIAGNOSTIC then [ACT] PRIMARY only at Move 8, the very end.
- **Omitted slots — margin annotation only; nothing below is drawn on the artboard** (`26` §5, `30` §4.1):

  | Slot | Case | Blocker | Artboard |
  |---|---|---|---|
  | Move 7 — [SEC] LOW-COMMITMENT link to the own-site diagnostic | **A** | Technical prerequisite: the own-site fixes | **Nothing drawn.** The move keeps its worked example and its PROOF link |
  | Move 8 — the [ACT] DIAGNOSTIC control's **wording** | — | The entry-offer decision. **The control itself renders**; only its label is undecided, which is a copy dependency, not a blocked slot | Control drawn; no label invented |

  **No owner input blocks this route** (`06` §9). This is the page the programme can build first.
- **Patterns used (`49_UX_PATTERN_INVENTORY.md` IDs):** P4 · P6 *(full: F2 + F6)* · P12 · P13 · R1 · R2. **Not P3** — `/problems/*` is D — NONE.
- **Width class shown:** WIDE (primary). NARROW in `48` §M3.
- **What this artefact uniquely proves:** the honest away-pointing outcomes hold equal weight/openness/position priority to the routing outcomes (F9 test); the diagnostic instrument is complete and printable without interaction (H5).

---

## WIDE structural diagram

```
┌───────────────────────────────────────────────────────────┐
│ [NAV] Header — breadcrumb: Home → Problems(text,no link) → │
│        page (`07` §6 — "Problems" is text, no hub exists)   │
├───────────────────────────────────────────────────────────┤
│ HERO                                               [ARG]    │
│  symptom named, own words · promise: checks are here, run   │
│  them today · NO CTA · [EVD: ABSENT]                         │
├───────────────────────────────────────────────────────────┤
│ MOVE 1 — WHAT THIS LOOKS LIKE                      [ARG]    │
│  5 symptom patterns, self-identification, no cause implied  │
├───────────────────────────────────────────────────────────┤
│ MOVE 2 — IT IS ONE OF FOUR THINGS       [FIG: F2, static]   │
│  four-cause structure, followable top-to-bottom, no         │
│  interaction, measurement marked "check first" with reason  │
│  visible · [EVD: ABSENT]                                     │
├───────────────────────────────────────────────────────────┤
│ MOVE 5 — FIVE CHECKS YOU CAN RUN TODAY   [FIG: F6, static]  │
│  ┌─check 1─┐┌─check 2─┐┌─check 3─┐┌─check 4─┐┌─check 5─┐    │
│  │ outcome ││ outcome ││ outcome ││ outcome ││ outcome │    │
│  └─────────┘└─────────┘└─────────┘└─────────┘└─────────┘    │
│  each [EVD: ADJACENT-SECONDARY] on its observable outcome    │
│  NO CTA, NO sticky inside this section (H5 — static only)    │
├───────────────────────────────────────────────────────────┤
│ MOVE 6 — WHAT EACH FINDING MEANS                   [ARG]    │
│  finding A → routes to firm   [SEC] CONTEXTUAL → /seo        │
│  finding B (self-fix) → AWAY-POINTING, equal weight, no CTA  │
│    directly beneath it                                       │
│  finding C (wrong traffic) → AWAY-POINTING, equal weight      │
│  finding D (checks disagree) → "no honest diagnosis yet"      │
│  (all six findings same visual weight, same openness,         │
│  same position priority — F9 test)                            │
├───────────────────────────────────────────────────────────┤
│ MOVE 7 — WHAT WE FOUND ON OURSELVES                [ARG]    │
│  worked example, full text · [SEC] PROOF → /how-it-works      │
│  [EVD: EXPANDABLE]                                             │
├───────────────────────────────────────────────────────────┤
│ ··· pause ···                                                 │
│ MOVE 8 — IF YOU WOULD RATHER WE RAN IT                        │
│  [ACT] DIAGNOSTIC                                              │
│  [ACT] PRIMARY, end only · [EVD: ABSENT in CTA region]         │
│  sticky permitted below fold only, suppressed during checks   │
├───────────────────────────────────────────────────────────┤
│ [NAV] Footer                                                   │
└───────────────────────────────────────────────────────────┘
```

**Prohibited on this wireframe (checked):** no gate/email wall/sign-up on the instrument (B25), no score/grade/percentage (B7/B26), no traffic-light treatment (B6), no accordion collapsing the checks, no CTA inside the checks section, no away-outcome reordered before routing outcomes, **no `[BLK]` tag or placeholder drawn on the artboard** (`30` §4.1).
