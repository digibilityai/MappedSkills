# THE RESOLVE — Complete Homepage — Motion System and Budget Reconciliation

**Session:** 18 · **Date:** 2026-09-03 · **Status:** PROPOSED. Gate 10 NOT PASSED.
**Measured against:** `docs/24-resolve-governance/02_RESOLVE_MOTION_BUDGET.md` (PROPOSED).

> That budget's §9 states the reconciliation happens **when the complete homepage is composed**,
> and that **the homepage, not the prototype, is what the budget is measured against.**
> **This document is that reconciliation, and it reports an overage rather than hiding one.**

---

## 1. The vocabulary — unchanged from the direction

Two easings only. Four timings. Nothing else animates.

| Token | Value | Meaning |
|---|---|---|
| `--e-state` | `cubic-bezier(.65,0,.35,1)` | a state changes |
| `--e-arrive` | `cubic-bezier(.2,.85,.25,1)` | something arrives |
| `--t-micro` | 180ms | a control answered you |
| `--t-state` | 620ms | a region's state changed |
| `--t-resolve` | 900ms | a population resolved |

**Verified absent on the rendered page:** `0` canvas · `0` `<img>` · `0` `position:fixed` · `0`
`position:sticky` · `0` `infinite` animations · `0` monospace declarations · `0` ambient motion ·
`0` pinned or scroll-scrubbed sequences · `0` animation libraries · `0` WebGL · `0` autoplay video.

**Retained and load-bearing:** `repeating-linear-gradient` as a **pattern fill encoding an
epistemic state** — 5px-on/5px-off for *not measured / unattributed*, 45° hatch for *not testable*.
These are honesty devices, not colour gradients (`00_ACTIVE_DIRECTION.md` §4.6).

## 2. The tier count on the rendered page

| Tier | Budget | **Counted** | Verdict |
|---|:--:|:--:|---|
| **T1 — MAJOR RESOLVE** | 1 | **1** | ✅ hero only |
| **T2 — SECTIONAL RESOLUTION** | 3 | **2** | ✅ under |
| **T3 — TRANSITION** | 3 | **6** | ❌ **OVER by 3** |
| **T4 — MICRO** | unbounded, two behaviours | 2 behaviours | ✅ |
| **Signature interaction** | 1 | **1** | ✅ Traffic/Enquiries |
| **Ambient regions** | 0 | **0** | ✅ |
| **Pinned sequences** | 0 | **0** | ✅ |
| **Full-bleed accent regions** | 1 | **1** | ✅ the close |
| **Surface inversions** | 2 | **2** | ✅ hero stage, close |

### The T1
1. **The hero resolve.** A population changes state and the surface inverts with it. Fires once,
   never replays, skipped entirely under reduced motion.

### The two T2s
1. **The friction alignment** (chapter 3) — three outcomes reorganise into one column.
2. **The re-read** (chapter 4) — six rows travel and change state across three readings.

> **Counting note, stated so it can be disagreed with.** The re-read has **three beats** on **one
> object**. It is counted as **one T2**, on the grounds that M3 forbids reusing a gesture for a
> different meaning and this is one gesture carrying one meaning — *the population reorganises
> when the question changes*. **If the orchestrator counts beats rather than gestures, this is 3
> T2 and the T2 line becomes 4/3, also over.** The count is declared, not concealed.

### The six T3s — the overage
1. The hero departure (scroll-linked drift)
2. The departure band wipe and carrier arrival
3. The F1 descent and chain draw
4. The boundary state on the F1 instance
5. The fall — rules drawn through the five unpromised things
6. The arrival of the marks at the close

**`.rv` reveals are NOT counted as T3.** They are composition — opacity and a 24px translate, with
no meaning attached — and the budget's own §5.3 excludes "a section opening" and "a heading
arriving" from earning a resolution. **If the orchestrator counts them, add 1.**

## 3. The conflict, stated plainly

**The T3 cap of 3 and the owner's verdict cannot both be satisfied on a nine-chapter page.**

- The budget was written against a **creative-direction prototype**, before any page existed. Its
  own §9 anticipated this reconciliation.
- The owner has since rejected the experience as **too bland, with no journey**. A page permitted
  three transitions across ten regions is a page where seven boundaries are hard cuts.
- Every one of the six T3s carries a commercial reason and none of them is a resolve. They are
  **continuity devices**, which is exactly what a journey is made of.

**This is not a request to ignore the budget.** It is a request to amend one number with reasoning,
which is what §5 of the governance permits ("Maximums, not targets") only for the orchestrator.

### Recommended amendment
> **T3 — TRANSITION: homepage maximum 6.** Secondary pages unchanged at 2. Add a qualifier: *a T3
> must join two chapters or change the reader's distance from an object; a T3 that only makes a
> section appear is composition and is not counted.*

### If the cap stands at 3
Cut in this order, and the journey survives in reduced form:
1. **The arrival of the marks at the close** — the full-bleed inversion already carries the moment.
2. **The fall through the five promises** — they read as a list without it.
3. **The departure band wipe** — keep the carrier square, drop the wipe.

**Do not cut** the F1 descent or the boundary state: those two are the difference between F1 being
a journey and F1 being a diagram, which is the exact question this session exists to answer.

## 4. The anti-tic rules, audited

| Rule | Status |
|---|---|
| **M1** — no two consecutive regions run the same resolve gesture | ✅ The two T2s are different gestures (alignment vs re-sort) and are separated by chapter 4's copy. Chapter 6 is still, immediately after chapter 5 |
| **M2** — one T1 per page | ✅ |
| **M3** — a gesture may not be reused for a different meaning | ✅ The four mark states carry one meaning each, everywhere. The double line means *your data* in both places it appears |
| **M4** — ~1s minimum between T1/T2 events | ✅ Scroll-separated by ≥1300px between events; the re-read's own beats dwell 1500ms |
| **M5** — every T1/T2 fires once per load, on entering view, never replays | ✅ Guarded by a `__seen` flag per element |
| **M6** — mandatory stillness in reading-heavy regions and after every event | ✅ Chapters 6, 7 and 9 are still. The boundary follows the descent directly |
| **M7** — overage is a defect, not a judgement call | ⚠️ **Declared above. Awaiting the orchestrator.** |

## 5. Motion that was cut during this session

| Cut | Why |
|---|---|
| A persistent thread down the page | The dashed line means an epistemic gap; a rule motif dilutes it (F1 taxonomy §5) |
| A second segmented control on the re-read | Would dilute the one signature interaction |
| Bars and widths in the re-read | Any width is a magnitude, and a magnitude is a quantity claim |
| `requestAnimationFrame` gating on the friction release | A frame callback does not run in a non-rendering tab, and a displaced mark must never be left displaced |
| The chapter numeral fading in from near-invisible | It failed 3:1 in its start state and the fade bought nothing |

## 6. The robustness floor — added in this session

Three mechanisms, because **motion must never be the carrier**:

1. **The composed state is the CSS default** for the friction chapter. JavaScript writes the start
   state inline and then releases it. Nothing has to win a cascade for the honest end state to show.
2. **Every on-view behaviour is also forced after 4s.** An `IntersectionObserver` does not run
   while a tab is hidden or throttled; a reader who never receives the callback still gets the
   composed page.
3. **A tab hidden mid-gesture resumes composed, never displaced** (`visibilitychange`).

---

# SESSION 18A UPDATE — the audit is done, and the count is now 5

**Date:** 2026-09-03 · Following the owner verdict *"This is finally going in the right direction."*

The overage declared in §3 above was resolved by **auditing all six transitions rather than
mechanically cutting to three**. The full table is in `06_REFINEMENT_18A.md` §3.

| | Session 18 | **Session 18A** |
|---|:--:|:--:|
| T1 — MAJOR RESOLVE | 1 | **1** |
| T2 — SECTIONAL RESOLUTION | 2 | **2** |
| **T3 — TRANSITION** | **6** | **5** |
| Signature interaction | 1 | **1** |
| Ambient regions | 0 | **0** |
| Pinned sequences | 0 | **0** |
| Surface inversions | 2 | **2** |

**Cut:** the departure band's tangerine wipe — classified **DECORATIVE**. It carried no commercial
meaning, partly duplicated the carrier square's arrival, and put a second tangerine gesture seconds
after the hero's. The band still has the carrier and the line.

**Kept, and re-classified with reasons:** the hero departure, the F1 descent, the boundary state
(all **ESSENTIAL**), the fall and the close arrival (both **USEFUL**).

**Added: none.** The capabilities chapter's three intervention maps are **static composition** —
the visual progression is carried by *position*, not by motion. This is deliberate: it is what
allows the chapter to gain visual material while remaining a stillness beat.

**Changed rather than added:** the close's five marks now travel **downward from above and land**
rather than rising from below. The page follows a population downward for nine chapters; the last
movement on it should be downward and should stop.

### The recommended budget, from the page rather than from a prototype

> **T3 — TRANSITION: homepage maximum 5**, with the qualifier that a T3 must **join two chapters,
> change the reader's distance from an object, or change what an object means**. A T3 that only
> makes a section appear is composition and is not counted.

**Governance was not amended in this session.** This remains a recommendation for the orchestrator,
now supported by a per-transition audit against the rendered page rather than by argument.

---

# SESSION 18B UPDATE — recounted after compression

**Date:** 2026-09-03. **No transition was added; one disappeared with its chapter.**

| Tier | 18A | **18B** |
|---|:--:|:--:|
| T1 — MAJOR RESOLVE | 1 | **1** |
| T2 — SECTIONAL RESOLUTION | 2 | **2** |
| **T3 — TRANSITION** | 5 | **4** |
| Ambient / pinned | 0 | **0** |
| Surface inversions | 2 | **2** |

**The four T3s:** the hero departure · the carrier's arrival in the departure band · the chain's
descent and draw · the fall through the five unpromised things · the close arrival.
*(The boundary state was removed with the chapter that carried it: the chain is now complete at all
times, so there is no second arrival on it.)*

**The two T2s:** the friction alignment · the three-stage sequence, which replaced the re-read.

## The declared exception

The page now carries **two reader-driven controls**: the Traffic/Enquiries signature, and the
three-stage tablist in the system view. The budget permits **one signature interaction**.

**The tablist is classified here as progressive disclosure, not a second signature** — §19 of the
18B brief explicitly asked for "focus/selection reveals one concise explanation" and "visual state
changes reveal related capability", and the core proposition never requires it: the stages play
once on their own, and reduced motion and no-JS compose all three open.

**The orchestrator may disagree. The count is declared, not buried.**

## The T3 number is deliberately NOT settled

§24 of the 18B brief instructs that compression may change the required number and that no
governance amendment is to be made. **The page currently runs 4.** The Session 18A recommendation
of 5 is therefore left standing but unconfirmed, and the evidence has changed under it.

---

> # ⚠ CORRECTED BY SESSION 19A (2026-09-04) — READ BEFORE USING ANY T3 COUNT ABOVE
>
> **1. The boundary "fall" transition counted above was never live.** It was specified in Session
> 18 and documented as live through 18C, but its selector was `.bound.on` while the element has
> only ever carried `class="sec sec--tight"`, and from Session 18B onward no script applied `.on`.
> **It never rendered in the JavaScript path and was therefore never part of the experience the
> owner reviewed.** Session 19A **removed** it rather than repairing it; the boundary chapter is
> intentionally still. Removing it also closed a no-JS inconsistency (there the strike *did* draw)
> and a **reduced-motion contrast failure of 2.66:1 against a 3:1 floor**.
>
> **2. Every T3 count in this document is therefore overstated by one.** The live count on the
> corrected page is **4**: the hero departure · the departure carrier · the chain descent and draw ·
> the close arrival.
>
> **3. Session 19 reported the live count as 3. That was an arithmetic error** — five transitions
> were enumerated, one was found dead, and the remainder was given as three. **The correct figure
> is 4**, so the proposed governance budget of 3 is still exceeded by one and reconciliation
> **3 → 4 remains outstanding**. Governance was not modified.
>
> **4. The hero's four channel bars no longer carry unequal widths** (`34/26/30/22%`). They are one
> equal length carrying state only, per the Session 19A quantity-safety ruling.
>
> Full record: `09_CORRECTIONS_19A.md`.
