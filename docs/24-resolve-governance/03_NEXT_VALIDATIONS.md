# Next Validations — Order Only

**Session:** 17A · **Date:** 2026-09-03 · **Branch:** `test_branch`
**Status:** **PROPOSED sequence. Nothing below was executed in this session, and nothing below may
be started before the orchestrator reviews `DEC-018`.**

---

## 0. Scope of this document

This defines **the order of work only**. It does not perform any of it, does not pre-judge any
outcome, and does not authorise skipping a step.

## 1. The sequence

| # | Step | Done when | Do not |
|---|---|---|---|
| **1** | **Re-draw / revalidate F1 — THE RUN — against THE RESOLVE** | F1 exists in Resolve's materials and has been rendered and inspected at WIDE / MEDIUM / NARROW | Reuse the Session 17 Arrival drawing — it was removed. Reopen the approved F1 taxonomy (`docs/16-ux/22_F1_USAGE_TAXONOMY.md`) |
| **2** | **Resolve any genuine F1 compatibility finding** | Each finding is either fixed or recorded as an accepted limit with a reason | Rationalise a finding away. Change F1's approved meaning to make it fit |
| **3** | **Complete homepage prototype in THE RESOLVE** | One complete page exists — every approved block, real approved copy, no lorem, nothing invented | Design any other route. Treat the 15C prototype as the homepage — it is a direction prototype |
| **4** | **Render WIDE / MEDIUM / NARROW** | All three widths rendered and inspected in a browser | Assert a width. **MEDIUM has never been rendered for any direction in this programme** |
| **5** | **Re-run F2 — first fixation** | Measured per viewport band at all three widths, on the complete homepage | Inherit any earlier F2 verdict — they were run against other directions |
| **6** | **Re-run F3 — visual proportion / weight** | Measured with `docs/17-visual-validation/09_VISUAL_WEIGHT_RUBRIC.md` **unchanged** | Re-tune the rubric after seeing a result. That rubric is direction-independent and was deliberately fixed before measurement |
| **7** | **Owner browser review** | The owner has opened the complete homepage live and given a verdict **against a named prototype file path** | Ask the owner to approve from a description, a screenshot or a session label |
| **8** | **Only after owner approval, consider Gate 10 closure** | The orchestrator, not Claude, passes the gate | Self-approve. Claude does not pass gates |
| **9** | **Only after Gate 10, consider production rollout** | — | Touch `app/`, `components/`, `styles/`, `public/`, `lib/`, `hooks/`, `scripts/` or config before then |

## 2. The one lesson to carry into step 7

`DEC-017` was recorded from a **session label** — *"Yes, 15D is clearly better"* — and the label
was wrong. The work that followed was correct and was aimed at the wrong target.

> **From now on, an owner approval must name the prototype file the owner actually had open**, not
> a session number. A session label is a filing convenience; a file path is evidence.

`DEC-018` records the corrected approval against
`docs/20-creative-convergence/prototype/convergence.html`.

## 3. Carried into step 1 — the standing constraints on F1

Not new; restated so they are not rediscovered late.

- **F1's approved meaning and taxonomy are upstream and are not reopened** — FULL / PARTIAL /
  STATE / NONE, with **NONE as the default**, and F1 on 6 of 22 routes with only 3 carrying the
  full figure.
- **It may not taper, may not carry per-stage colour, may not read as a funnel, a workflow, a
  pipeline, a CRM stage set or a three-step process.**
- **`F17` — the `/how-it-works` stage sequence — remains BLOCKED** and must not be drawn,
  sketched, prototyped or placeholdered.
- **Figure labels never fall below 12px at any width.** Session 17 found real label-scaling
  failures at MEDIUM in the Arrival drawing; the same failure mode applies to any SVG figure and
  must be checked, not assumed.
- **Every figure carries `role="img"`, a `<title>`, a substantive `<desc>` and a text or tabular
  equivalent** that is in the DOM, keyboard-reachable and open in print.
- **No fabricated quantity.** If a figure sits near the lattice marks, Session 15C's risk R4
  applies: **a figure beside those marks turns them into a fabricated metric and the device must
  be withdrawn.**

## 4. Open items that are not on the critical path but must not be lost

| Item | Status |
|---|---|
| **A superseded banner on `docs/22-design-system/`** | Recommended in `01_SESSION16_AUDIT.md` §7. Outside this session's staged scope |
| **The "retain, restated" rules from the Session 16 audit** | Classified but **not rewritten**. Design-system work |
| **MEDIUM width** | Never rendered, in any direction |
| **Screen reader, real device, other browsers, print, 200% text resize** | Never tested, in any direction |
| **Performance profiling on real hardware** | Never done. A prerequisite to implementation |
| **User testing** | None has ever occurred in this programme. No verdict anywhere is a claim about a real reader |
| **Owner-blocked content** | Unchanged — team/people, published phone, response process, `/pricing` facts, complete NAP |

## 5. What must not happen next

Do not build another design system before step 3. Do not explore another visual territory —
creative-direction exploration is closed, and `DEC-018` reaffirms that. Do not "improve" THE
RESOLVE. Do not modify the Session 15C prototype.
