# Claude Session Handoff

> # ⚠ READ THIS FIRST — THE ACTIVE VISUAL DIRECTION CHANGED
>
> ## The active direction is **SESSION 15C — THE RESOLVE**.
> ## It is **NOT** THE ARRIVAL. It is **NOT** dark-first.
>
> **Approved prototype — the reference is the file, not a session label:**
> ### `docs/20-creative-convergence/prototype/convergence.html`
>
> **`docs/22-design-system/` was built for THE ARRIVAL. Its first BINDING rule is *dark-first*,
> and THE RESOLVE is *light-first*. Applying it unaudited will destroy the approved direction.**
> **Read `docs/24-resolve-governance/01_SESSION16_AUDIT.md` before you open it.**

---

## Session
- **Session ID:** 17A — Owner clarification: correct visual-direction governance
- **Date:** 2026-09-03 · **Model:** Claude Opus 5 · **Branch:** `test_branch`
- **HEAD at start:** `bd7e439251ea52616ddeaf3b76afe942d2e60df2` — matched the expected value
- **Role:** governance correction only. **Not** design, not validation, not implementation.

## The owner clarification, recorded verbatim

The owner **reopened the actual browser prototypes** and stated:

> **“Yes this is the one. I like THE CONVERGENCE — ‘The Resolve’.”**

**This is a prototype-identification correction, not a change of mind.** `DEC-017` had recorded
*"Yes, 15D is clearly better"* — a **session label**, and the wrong one. The work that followed
(Session 16's design system, Session 17's F1 test) was competently built against the wrong target.

**The lesson, carried forward into `03_NEXT_VALIDATIONS.md` §2:** an owner approval must name the
**prototype file the owner actually had open**. A session label is a filing convenience; a file
path is evidence. `DEC-018` is recorded against a file path.

## What was done

1. **Safety check** — branch, HEAD, single worktree, nothing staged, uncommitted set matched the
   brief exactly.
2. **Identified the prototypes from the repository**, not from the brief: `docs/20-creative-convergence/`
   is Session 15C (THE RESOLVE, `convergence.html`); `docs/21-creative-convergence-a/` is Session
   15D (THE ARRIVAL, `convergence-a.html`).
3. **Verified THE RESOLVE's binding characteristics by reading and rendering the prototype**, not
   by copying the brief's list. Opened it in a browser at 1440×900, watched the traffic→enquiries
   resolve, and inspected the hero, the three acts, the boundary and the full-bleed tangerine CTA.
4. **Audited Session 16 rule by rule** against that prototype — every material rule classified
   DIRECTION-INDEPENDENT, RESOLVE-COMPATIBLE or ARRIVAL-SPECIFIC.
5. **Re-derived a Resolve-specific motion and repetition budget**, closing Session 15C's own
   highest open risk (R1 — the resolve appears seven times and could become a sitewide tic).
6. **Removed the uncommitted Session 17 Arrival-F1 work** after inspecting the diff.
7. **Appended `DEC-018`**; corrected `CURRENT_STATE.md` and `QUALITY_GATES.md`.

## One correction to the brief's own shorthand — important

The brief lists *"no gradients"* among THE RESOLVE's binding characteristics. **The prototype uses
`repeating-linear-gradient` four times, and every use is load-bearing:** a 5px-on/5px-off dashed
pattern encoding **not measured / unattributed**, and a 45° hatch on a square encoding a state
that is not a value.

> **These are honesty devices, not decoration. Do not strip them while "removing gradients."**
> What is prohibited is the **decorative colour gradient** — a wash, mesh, glow or atmospheric
> fade. This is recorded in `DEC-018` item 3 and in `00_ACTIVE_DIRECTION.md` §4.6.

Everything else in the brief's list was **confirmed accurate against the source**: 0 canvas,
0 `<img>`, `box-shadow` never set, 0 `position:fixed`/`sticky`, 0 `infinite` animations,
0 monospace, and no ambient motion.

## Session 16 audit — summary

| Classification | What |
|---|---|
| **DIRECTION-INDEPENDENT — retained as written** | Accessibility floor A1–A14 · document-drift register D1–D8 · fabricated-quantity register Q1–Q8 · activity-vs-commercial-consequence · state change rather than replacement · evidence as a supporting layer with no monospace · mandatory stillness · nothing dependent on motion · approved upstream not reopened by design · narrow-must-recompose · no-library / `transform`-`opacity` / one-`rAF` performance rules · static-quality, digital/PDF and marketing-company tests |
| **RESOLVE-COMPATIBLE — retained, restated** | The demand metaphor · one-accent-means-one-thing (tangerine, not amber) · the state-semantics rule (not the eight Arrival states) · the motion-budget concept (not its numbers) · inversion, re-scoped · counted surfaces · pattern-mapping discipline · navigation and form rules · T4, T8 |
| **ARRIVAL-SPECIFIC — superseded** | **Dark-first** · espresso world · amber · the eight signal states · capture line / horizon / ledger / streak / band · the twelve primitives · canvas · ambient regions · pinned sequences · Familjen Grotesk + Instrument Sans · Arrival colour, surface and motion-budget systems · T2, T9 · the Arrival homepage-readiness assessment |

**The single most dangerous carry-over is `B1 — Dark-first`.** THE RESOLVE's rendered `body`
background is `#F7F3EC` ivory; its dark hero stage is a **counted, meaningful inversion inside a
light page** — the inverse relationship.

## The Resolve motion budget — the R1 fix

| | Homepage | Secondary | Editorial / conversion |
|---|:--:|:--:|:--:|
| Major resolve (T1) | **1** | 0 | 0 |
| Sectional resolution (T2) | **3** | 1 | 0 |
| Transition (T3) | 3 | 2 | 1 |
| Signature interaction | 1 | 0 | 0 |
| **Ambient regions** | **0** | **0** | **0** |
| **Pinned / scroll-scrubbed** | **0** | **0** | **0** |

Plus anti-tic rules M1–M7 — chief among them **M1: no two consecutive regions may run the same
resolve gesture**, which converts a repeated gesture into a punctuated one.

**The 15C prototype exceeds this budget by design (seven resolves) and must not be edited to fit
it.** The budget governs the design system and the homepage built from it; the reconciliation
happens when the homepage is composed.

## Session 17 Arrival-F1 cleanup

Before removing anything the diff was inspected and confirmed to be **only** the described
uncommitted outputs:

| Path | Was | Action |
|---|---|---|
| `docs/23-f1-validation/` (5 files) | Untracked | **Removed** |
| `docs/00-project/handoffs/SESSION_17_F1_VALIDATION.md` | Untracked | **Removed** |
| `docs/00-project/CURRENT_STATE.md` | One Session 17 annotation hunk | **Reverted** (`git checkout --`) |

**`git ls-files` confirmed no tracked file existed under either removed path, so no committed
history was lost.** No earlier Session 15D or 16 history was reverted.

## Files created
```
docs/24-resolve-governance/00_ACTIVE_DIRECTION.md
docs/24-resolve-governance/01_SESSION16_AUDIT.md
docs/24-resolve-governance/02_RESOLVE_MOTION_BUDGET.md
docs/24-resolve-governance/03_NEXT_VALIDATIONS.md
docs/00-project/handoffs/SESSION_17A_OWNER_DIRECTION_CORRECTION.md
```

## Files modified
- `docs/00-project/DECISION_LOG.md` — **`DEC-018` appended. 22 lines added, 0 removed.**
  **`DEC-017` is byte-identical to the committed version.**
- `docs/00-project/CURRENT_STATE.md` — prominent active-direction banner at the top, plus a
  Session 17A phase record. **The Session 16 record body is byte-identical**; only its leading
  label changed to *"Prior record, preserved"*.
- `docs/00-project/QUALITY_GATES.md` — Gate 10 corrected in three places (summary row, gate
  narrative, gate body). **Gate 10 remains NOT PASSED — IN PROGRESS.**

## Files removed
`docs/23-f1-validation/` and `docs/00-project/handoffs/SESSION_17_F1_VALIDATION.md` — both
untracked, both Arrival-derived.

## Verified unchanged
Session 15C and Session 15D prototypes, by **SHA-256 before and after**:

```
25b60087…  docs/20-creative-convergence/prototype/convergence.html
d1b8c829…  docs/20-creative-convergence/prototype/index.html
3294382a…  docs/21-creative-convergence-a/prototype/convergence-a.html
c94da2b0…  docs/21-creative-convergence-a/prototype/index.html
```

## What was NOT done, and is not claimed
No design system was built. No homepage was designed. **F1 was not drawn or revalidated.** F2 and
F3 were not re-run. MEDIUM width has never been rendered in any direction. No screen-reader, real
device, other browser, print, 200% text-resize, performance-profiling or **user testing** has ever
been performed in this programme. **No production file was touched.** **Gate 10 was not passed and
no new gate was invented.**

## Residual risk — recorded, not closed
`docs/22-design-system/` still opens as *"THE ARRIVAL — Design System"* with a BINDING list headed
by **dark-first**, and carries **no in-file warning**. This session's permitted staged scope did
not include that directory, so the guard is currently `CURRENT_STATE.md` plus the audit.
**Recommended follow-up: add a superseded banner to `docs/22-design-system/00_OVERVIEW.md` and
`01_CREATIVE_DIRECTION_FROZEN.md` pointing to `docs/24-resolve-governance/`.**

## Recommended next task
**Revalidate F1 — THE RUN — against THE RESOLVE.** Sequence and constraints at
`docs/24-resolve-governance/03_NEXT_VALIDATIONS.md`. Do not build the homepage first, do not
build a design system first, and do not modify the Session 15C prototype.

## Stop condition
Stopped at the completion of the governance correction. **F1 was not revalidated, no homepage was
built, the Session 15C prototype was not modified, and nothing was pushed.** The next session must
not begin design-system work before the orchestrator has reviewed `DEC-018`.
