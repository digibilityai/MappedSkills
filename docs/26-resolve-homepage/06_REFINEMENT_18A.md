# THE RESOLVE — Complete Homepage — Session 18A Refinement

**Session:** 18A · **Date:** 2026-09-03 · **Branch:** `test_branch`
**Status:** **PROPOSED. Gate 10 remains NOT PASSED — IN PROGRESS.**
**Owner verdict entering this session:** *"This is finally going in the right direction."*

**Interpretation, stated so it cannot drift:** this is **positive directional validation**. It is
**not** homepage approval, not Gate 10, not permission to implement, and not permission to freeze
every current choice. The Session 18 approach was **refined, not replaced.**

---

## 1. Pre-refinement audit — measured before anything was edited

The page was re-rendered at all three widths and profiled per chapter. **Visual atoms** counts the
non-text marks, rules, points and figure elements a chapter actually draws.

### WIDE (1425×900), document 10,449px

| Chapter | % of page | Chars / 1000px | **Visual atoms** |
|---|---:|---:|---:|
| 1 Hero | 8.6 | 728 | **448** |
| 2 Departure | 3.2 | 195 | 0 |
| 3 Recognition | 12.6 | 727 | **21** |
| 4 Re-read | 11.4 | 1600 | 6 |
| 5 F1 descent | 5.6 | 842 | **52** |
| **6 Boundary** | **8.2** | 1210 | **0** |
| **7 Capabilities** | **16.7** | 581 | **0** |
| **8 Evidence** | **12.4** | 1022 | **2** |
| **9 Fit** | **6.3** | 1073 | **0** |
| 10 Close | 7.3 | 292 | 5 |

> ### The finding, stated numerically.
> **Chapters 6–9 were 43.6% of the page and drew 2 visual atoms between them.**
> Chapters 1–5 were 41.4% and drew 527.

On **NARROW (390×844)** the same problem was worse in felt terms: the page ran **14 screens**, of
which **the second half was 6.2 screens of near-continuous text with 2 visual atoms.**

### Strongest three moments, pre-refinement
1. **The hero resolve.** Still the best thing in the direction.
2. **The friction alignment** — the only place where the composition makes the argument the copy makes.
3. **The descent into F1** — the change of distance genuinely changes what the figure is.

### Weakest three moments, pre-refinement
1. **Capabilities (16.7% of the page, zero visual material).** A long, airy list with nothing to look at.
2. **Fit** — two columns of prose with no visual material at all.
3. **The approach to the close** — the fit chapter drifted into the tangerine region rather than arriving at it.

### Where energy died
**At the boundary chapter and it did not recover until the tangerine close.** Everything after F1
was carried by copy. A visitor reaching chapter 7 had good reason to think the interesting part was
over — which is exactly what §5 of the brief named as the primary risk.

### Where the journey became a sequence of sections
**Between chapters 6 and 9.** Each of those chapters begins with an eyebrow heading and a display
line and then delivers prose. **They share one silhouette**, so they read as a stack rather than as
continued travel — the failure mode §7 of the Session 18 brief warned about, reappearing in the
half of the page that got less design attention.

---

## 2. Changes made

### 2.1 Capabilities — THE INTERVENTION MAP *(the primary change)*

The approved heading is **"Where each discipline comes in"** — a **spatial** statement. It is now
answered spatially.

The chain the reader learned two chapters earlier **returns, recessive and unlabelled**, once per
group. Each map marks the stretch of the chain that group acts on:

| Group | Marked stretch | Measured on the rendered page |
|---|---|---|
| Reaching buyers who are already looking | The dashed lead-in and the discovery point | **10% of the chain, 1 point** |
| Turning those visits into enquiries | Landing → interaction → the enquiry → the qualified enquiry | **60% of the chain, 4 points** |
| Knowing what happened | The whole chain — the measurement instruments all of it | **100% of the chain, 6 points** |

**Reading down the chapter, the marked stretch marches forward and then covers everything.** That
is the chapter's visual progression, and **it needs no motion to carry it** — which is what lets
this stay the quiet-precision beat rather than becoming another animated section.

It also states the thing a card grid cannot, and which §6 of the brief required: **these are not
seven services, they are interventions at different points of one demand-to-enquiry system.**

**What it is not:** not cards, not an icon grid, not an accordion, not a generic capabilities list.
No new primitive was invented — it is the existing chain at a smaller scale.
**Cost: zero added height** (1750px → 1740px; the maps sit inline with their headings).

### 2.2 The admission becomes the second half's typographic event
*"We have no case studies to show you."* went from `clamp(1.9rem, 4.6vw, 3.7rem)` to
`clamp(2.5rem, 6.4vw, 5.4rem)` — **86px at WIDE**, the largest type on the page after the H1 and
the close — set alone, with air, and with **no motion, because the scale is the event.** It is the
most commercially distinctive sentence on the page and it now reads that way.

### 2.3 The boundary and fit chapters inherit the page's state vocabulary
- Each of the five unpromised things carries an **open dashed square**; the one owned thing carries
  a **solid tangerine square**. The same two states the page has used since the hero.
- The fit chapter's two positions carry the same pair.

**Six chapters now share one mark vocabulary instead of four.** Cheap, continuous, no new device.

### 2.4 The close is arrived at rather than started
The five marks now **travel down from above (−54px) and land**, with a wider stagger, instead of
rising from below. The page has spent nine chapters following this population downward; **the last
movement on the page is downward, and it stops.** The fit chapter's bottom padding was tightened so
the tangerine arrives sooner after the final line.

### 2.5 The friction alignment now exists on mobile
Previously **switched off below 900px**. §18 is explicit that mobile is a designed experience, not
a compliance test, so it was **recomposed rather than disabled**:

- The three outcomes **still travel to one column** at 390px — there is free space in every row
  (measured margin-left: 277px / 217px / 157px, all landing at **right: 370px**).
- A single tall rule would cross the copy, so **the rule becomes a tick at the right of each run**.
  Stacked, the three ticks read as one broken vertical.
- The label follows the block as a caption instead of floating beside it, and was **moved to the
  end of the DOM** so its reading order matches.

### 2.6 One transition cut
**The departure band's tangerine wipe was removed.** See the audit below.

---

## 3. Transition audit — all six, as §8 requires

| # | Transition | What changes | Commercial meaning | Materially improves the journey? | Duplicated elsewhere? | Removing it makes the page flatter? | Makes THE RESOLVE repetitive? | **Class** |
|---|---|---|---|---|---|---|---|---|
| 1 | **Hero departure** | The resolved stage lifts and fades on scroll | The same demand moving on, not a new section | **Yes** — it is what makes chapter 2 a continuation | No | **Yes** | No | **ESSENTIAL** |
| 2 | **Departure band wipe** | A tangerine bar sweeps left to right | **None** | No | Partly — the carrier's arrival already marks the band | No | **Yes** — a second tangerine gesture seconds after the hero's | **DECORATIVE → CUT** |
| 3 | **F1 descent + draw** | Distance, then extent | Structure becomes visible on approach | **Yes** — it is the difference between approaching a figure and being shown one | No | **Yes** | No | **ESSENTIAL** |
| 4 | **Boundary state on F1** | Pre-boundary recedes; the rule becomes the subject | Where accountability stops | **Yes** — it is the taxonomy's required STATE, not a second figure | No | **Yes** | No | **ESSENTIAL** |
| 5 | **The fall** | A rule is drawn through each unpromised thing | These fall away; one does not | Moderately | No | Slightly — it is the boundary chapter's only motion | No | **USEFUL — KEEP** |
| 6 | **The close arrival** | Five marks land from above | This is where they land | **Yes, now that it lands rather than rises** | No | **Yes** — the close would simply begin | No | **USEFUL — KEPT AND STRENGTHENED** |

**Cut: 1 (the wipe). Kept: 5. Added: 0** — the intervention maps are static composition, not motion.

### Recommended final T3 budget, from the evidence of the page
> ### **T3 — TRANSITION: homepage maximum 5.**
> With the qualifier: **a T3 must join two chapters, change the reader's distance from an object,
> or change what an object means. A T3 that only makes a section appear is composition and is not
> counted.**

Not 3: the audit found four transitions (1, 3, 4, 6) that the page is materially worse without, and
the owner has just validated the direction they produce. Not 6: one of the six was decoration and
is gone. **Five is the number the page actually earns.**

**Governance was NOT amended in this session**, as instructed. This is a recommendation for the
orchestrator, recorded with the evidence behind it.

---

## 4. Result — the same profile, after

### WIDE, document 10,635px

| Chapter | % of page | **Visual atoms — before → after** |
|---|---:|---|
| 6 Boundary | 8.1 | **0 → 5** |
| 7 Capabilities | 16.4 | **0 → 27** |
| 8 Evidence | 14.5 | 2 → 2 *(its visual is the dark surface and an 86px statement, which the atom count does not capture)* |
| 9 Fit | 5.7 | **0 → 2** |
| 10 Close | 7.3 | 5 → 5 *(re-choreographed)* |
| **Second half total** | **52.0** | **2 → 41** |

On **NARROW**, the second half went from **2 atoms to 41**, and the friction event — previously
absent below 900px — **now happens**.

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
