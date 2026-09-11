# THE RESOLVE — Complete Homepage — Session 18C Mobile Refinement

**Session:** 18C · **Date:** 2026-09-03 · **Branch:** `test_branch`
**Status:** **PROPOSED. Gate 10 remains NOT PASSED — IN PROGRESS.**

**Owner verdict entering this session:**
> *"The monotony has reduced and the page is also now shorter than earlier. Visually the page has
> become better than earlier. The mobile view looks a little cluttered."*

**Read as: desktop POSITIVE, mobile NOT YET READY.** This was a mobile-first refinement pass.
**No approved copy was restored, no chapter was recreated, no page length was added, and THE
RESOLVE was not redesigned.** Every change is inside a `max-width: 760px` media query, and the
desktop the owner just approved is **byte-for-byte unchanged** (verified: 7,714px before, 7,714px
after, every chapter height identical).

---

## 1. The clutter audit — measured before any CSS was touched

The page was profiled **screenful by screenful** at 390×844. For each viewport-height window:
visible text elements, links, bordered objects wider than 40px, and marks. Content clipped inside
a collapsed disclosure was excluded, so the counts are what a person actually sees.

| Screen | Chapter | Texts | Links | Rules | Marks | Score | Verdict |
|---:|---|---:|---:|---:|---:|---:|---|
| 1 | Hero | 16 | 7 | 6 | 218 | **39** | **CLUTTERED** |
| 2 | Departure + problem | 7 | 0 | 4 | 21 | 18 | BUSY |
| **3** | **Problem tail + system stages** | **17** | **12** | **15** | 0 | **50** | **CLUTTERED — worst** |
| 4 | The chain | 15 | 0 | 2 | 9 | 20 | BUSY |
| 5 | Boundary | 11 | 1 | 8 | 0 | 21 | BUSY |
| 6 | Evidence | 9 | 4 | 7 | 0 | 22 | BUSY |
| 7 | Fit + close | 8 | 2 | 5 | 5 | 18 | BUSY |
| 8 | Close + footer | 13 | 10 | 1 | 0 | **28** | **CLUTTERED** |
| 9 | Footer | 13 | 9 | 2 | 0 | **28** | **CLUTTERED** |
| 10 | Footer tail | 0 | 0 | 1 | 0 | 1 | CLEAN |

### The five worst screenfuls, and the cause of each

| Rank | Screen | Cause — diagnosed, not assumed |
|---:|---|---|
| **1** | **3 — the system stages (50)** | **Fifteen bordered objects in one viewport.** Seven capability links were outlined pills — seven competing rectangles — stacked against the stages list's own top rule, three list-item rules and the deeper-page link. On top of that **all three stage titles rendered at the same 27px**, so nothing in the block was primary |
| **2** | **1 — the hero (39)** | **The entire hero fitted inside one viewport**, so the headline, the lede, two buttons, a third text link, the stage label, a two-button control, four row labels and a note all arrived together. Six distinct type sizes. Nothing dominated by position, only by size |
| **3** | **8 and 9 — the footer (28 each)** | Four link columns **stacked in a single column** occupied **two full screens** — 21% of the mobile page — and put ten-plus links in each viewport |
| **4** | **4 — the chain (20)** | **Fifteen text elements, all at 13px.** The figure's own labels, the three-item legend and a two-line note gave the screen no dominant object at all |
| **5** | **6 — evidence (22)** | **Six distinct type sizes** in one viewport across the admission, the dark claim block and its limits line |

**The cause was not spacing.** It was the **number of objects competing at equal weight**.

---

## 2. What changed — mobile only

| # | Change | Why |
|---|---|---|
| **1** | **Seven outlined capability pills became text links with a single underline** | Seven rectangles became seven words. The largest single reduction in bordered objects |
| **2** | **One stage is the subject; the other two are an index** — the active title is 24px, the inactive ones 18.4px and dim | There was no primary object in the system block. Size contrast supplies one, and the auto-advance moves it |
| **3** | **The stage numerals (01/02/03) are hidden** | They repeat what the stage titles already say |
| **4** | **The stages' per-item rules were halved** — one rule per gap instead of a border on every row | Fewer horizontal lines competing with the capability underlines |
| **5** | **The `/services` link was separated from the capability cluster** | It was reading as an eighth capability |
| **6** | **The hero gained a deliberate pause** — the stage now begins at **651px**, so the first viewport is chrome → H1 → lede → two actions → proof, and **the population is teased at the fold** | The whole hero used to fit in one screen. Now the statement owns the first viewport and the signature is *discovered* on scroll rather than competing with the headline |
| **7** | **The figure's legend drops to one item on mobile** — the join tick | The chain's own labels already name *demand we cannot see* and *one with no usable trail*. **The honesty distinctions were kept; only the redundant legend entries went** |
| **8** | **The footer became two columns with a large row gap and a much deeper top margin** | Two full screens of stacked links became roughly 1.4, and the close gets a clean ending before the footer begins |
| **9** | **More space above the system block** | So the chapter statement stays the screen's primary object rather than tying with the stage title |

**Nothing was removed that carries meaning.** No copy was cut, no link was dropped, no honesty
device was simplified away.

---

## 3. After — the same audit

| Screen | Texts | Links | Rules | Score | Verdict | vs before |
|---:|---:|---:|---:|---:|---|---|
| 1 — Hero | 15 | 7 | 6 | 34 | CLUTTERED* | 39 → 34 |
| 2 | 8 | 0 | 5 | 21 | BUSY | 18 → 21 |
| **3 — System** | **9** | **6** | **8** | **26** | BUSY/borderline | **50 → 26** |
| 4 — Chain | 13 | 0 | 2 | 18 | BUSY | 20 → 18 |
| 5 — Boundary | 11 | 1 | 8 | 21 | BUSY | 21 → 21 |
| 6 — Evidence | 7 | 3 | 6 | 18 | BUSY | 22 → 18 |
| 7 — Fit + close | 7 | 1 | 4 | 15 | **CLEAN** | 18 → 15 |
| 8 — Close + footer | 17 | 12 | 2 | 36 | CLUTTERED | 28 → 36† |
| 9 — Footer | 8 | 6 | 2 | 19 | BUSY | 28 → 19 |

\* **Screen 1's score is inflated by the count method.** The one-second test below shows a
dominance of **2.1** — the 41px headline against a 20px runner-up — and the stage that lifts the
count is *below the fold line*, teased rather than competing.

† **Screen 8 is the seam between the close and the footer**, and it densified because the footer
now occupies fewer screens. Its dominant objects are the **two CTA buttons**, which the font-size
metric does not capture. Screen 9 improved from 28 to 19 in exchange.

## 4. The one-second test

*At an arbitrary scroll stop, can the primary object be identified within one second?*

| Screen | Primary object | Dominance | Verdict |
|---:|---|---:|---|
| 1 | **41px** — *Judge us on the **enquiries**…* | **2.1×** | **PASS** |
| 2 | **32px** — *It behaves like one.* | **2.5×** | **PASS** |
| 3 | 32px — *The joins decide the result.* | 1.3× | **REVIEW** — see below |
| 4 | The chain | figure-dominant | **PASS** — the figure *is* the subject |
| 5 | **43px** — *We have no case studies to show you.* | **2.5×** | **PASS** |
| 6 | 43px — the same admission | 2.4× | **PASS** |
| 7 | **38px** — *Two ways to start.* | **2.2×** | **PASS** |
| 8 | The two CTA buttons | — | **PASS by mass**, not by type size |
| 9 | Footer | — | furniture |

**Seven of nine pass outright.** Screen 3 improved from 1.1× to 1.3× and remains the one screen
where two large elements share billing — the chapter statement and the active stage title. It is
declared rather than claimed as solved.

## 5. Page length

| Width | 18B | **18C** | Change |
|---|---:|---:|---:|
| **390×844** | 7,824px / 9.3 screens | **7,566px / 9.0 screens** | **−3.3%** |
| 360×800 | — | 7,720px / 9.7 screens | — |
| 430×932 | — | 7,387px / 7.9 screens | — |
| **1425 (WIDE)** | 7,714px | **7,714px** | **0 — unchanged** |
| 845 (MEDIUM) | 7,103px | **7,103px** | **0 — unchanged** |

**Mobile got shorter, not longer**, despite adding real breathing room to the hero and around the
close: the two-column footer more than paid for the whitespace.

## 6. Desktop and medium restraint — verified

Every change is inside `@media (max-width:760px)`. Confirmed on the rendered page at 1425 and 845:
**capability pills keep their outlines, all three stage numerals are visible, the inactive stage
title is still 40px, all three legend items are present, and the footer is four columns at WIDE and
two at MEDIUM.** Chapter heights are identical to 18B, chapter for chapter.

**Medium does not inherit the mobile simplifications**, which §19 required.

## 7. Accessibility and performance

| Check | 390 | 360 | 430 | 845 | 1425 |
|---|---|---|---|---|---|
| Text nodes checked | 78 | 78 | 78 | — | 91 |
| **Contrast failures** | **0** | **0** | **0** | — | **0** |
| SVG text failures | **0** | — | — | — | **0** |
| Touch targets < 40px | **0** | **0** | **0** | — | — |
| Horizontal overflow | none | none | none | none | none |
| Heading jumps / `<h1>` | 0 / 1 | — | — | — | 0 / 1 |
| `fixed` / `sticky` | 0 | — | — | — | 0 |
| Forced-dark protection | `color-scheme: light` intact |

**Keyboard:** the stage tablist still moves selection with arrow keys and focus follows
(`ArrowRight` from stage 01 selects stage 02 and focuses it).

**Reduced motion @390:** page opens resolved, lattice removed, all four hero objects present,
**both controls work**, all three stages compose open with **7/7 capability links**, the chain is
fully drawn, the friction outcomes are aligned at 370px, the close marks are present.

**No JavaScript @390:** 20/20 reveals, all three stage panels open, **7/7 capability links at 40px**,
all three stage titles, the chain fully drawn, the friction alignment with its ticks and caption,
the evidence substrate open, 18 footer links, 15 panel links.

**Performance:** 665 DOM nodes at 390 (was 848 at 18B — the hidden stage numerals and the reduced
lattice at this width), one script, one external request, zero images, zero canvas.

## 8. Self-critique — A to M

**Not programme approval. Gate 10 remains NOT PASSED.**

**A. The five worst clutter points before refinement** — the system stages (score 50), the hero
(39), the two footer screens (28 each), the chain screen with fifteen 13px labels, and the evidence
screen with six type sizes.

**B. What caused each** — §1's table. In one sentence: **too many objects at equal weight**, not
too little space. Seven outlined pills, three equally-sized stage titles, a hero that fitted
entirely in one viewport, and a footer stacked into a single column.

**C. Removed versus recomposed** — **almost everything was recomposed, not removed.** Removed
outright: the stage numerals (redundant with the titles) and two of three legend items (redundant
with the figure's own labels). Everything else — pills, stage titles, hero, footer — changed
*weight, size or arrangement*. No copy, no link and no honesty device was cut.

**D. Strongest mobile hierarchy now** — the evidence chapter (2.5× dominance on a 43px admission)
and the hero (2.1× on a 41px headline with the population teased below the fold).

**E. Still busiest** — the seam at screen 8, where the close's two CTAs meet the footer's first
rows. It is furniture after the conversion moment, but it is the densest remaining viewport.

**F. Does the system view feel designed for mobile?** **Yes, more than before.** One stage is
visibly the subject, its capabilities follow it rather than competing with all seven at once, and
the numerals are gone. **It is not yet a mobile-native re-sequencing** — it is the desktop model
with a mobile hierarchy applied. If the owner still finds it dense, that is the next move.

**G. Is F1 legible without feeling like a squeezed infographic?** **Legible, yes** — the narrow
drawing is authored separately at 330×500 and renders at 354px with ~14px labels. **Squeezed, no —
but sparse-feeling, slightly.** Screen 4 has no dominant text because the figure *is* the subject,
which is correct, though it reads quieter than the chapters around it.

**H. Are capability links discoverable without a link wall?** **Yes.** Only the active stage's
links show — four, two, then one — and the sequence plays automatically, so all seven are seen
without a tap. Under reduced motion and no-JS all seven are present at once.

**I. Is the first viewport premium or crowded?** **Premium now.** It holds the 41px statement, one
lede, two actions and one offer, then stops — with the population arriving at the fold as an
invitation. Before, the entire hero including the diagram was inside one screen.

**J. Does the tangerine close feel like an arrival?** **Yes** — it has its own screen (7) with 2.2×
dominance and the marks landing from above. The seam that follows is the footer, not the close.

**K. Did mobile height increase or decrease?** **Decreased — 7,824 to 7,566px (9.3 to 9.0
screens)** — even though real whitespace was added to the hero and above the footer. The
two-column footer paid for it.

**L. Did any desktop experience regress?** **No. Verified numerically: 7,714px before and after,
every chapter height identical, and every mobile rule confirmed inactive at 1425 and 845.**

**M. What would I change next if the owner still says mobile is cluttered?**
1. **Give the chain its own screen** — move the note and the remaining legend item below the fold
   so screen 4 is the figure and nothing else.
2. **Show one stage at a time in full**, with the other two collapsed to a compact numeric stepper
   — the genuine mobile-native re-sequencing §7 hinted at, which I stopped short of.
3. **Cut the hero's PROOF link on mobile only**, leaving two actions on the first screen.
4. **Reduce the footer to two columns of the two most-used destinations**, with the rest behind the
   existing navigation.

## 9. Defects found and fixed

| # | Defect | Fix |
|---|---|---|
| **17** | **An 18B rule later in the same media block silently overrode the new stage size contrast** — inactive titles measured 27.3px against an intended 18.4px, so the "one primary stage" change did nothing | Removed the duplicate `.stg__t` rule |
| **18** | **My first clutter audit counted content clipped inside collapsed disclosures**, overstating every screen and hiding which fixes were working | Rewrote the audit to walk ancestors and exclude anything clipped by a collapsed parent |
| **19** | **The first footer change concentrated clutter instead of removing it** — two columns put 17 links in one viewport | Kept two columns but added a 52px row gap and a much deeper top margin, spreading the four blocks and giving the close a clean ending |

## 10. Risks carried forward

- **Screen 3 still has two large elements sharing billing** (1.3× dominance). Declared.
- **The system view is a mobile *hierarchy*, not a mobile *re-sequencing*.** §8-F and §8-M.
- **The close/footer seam is the densest remaining viewport.**
- **Screenshots remained unreliable in this environment.** Everything above was verified
  programmatically by measurement; the animations were verified by start and end states.
- **No real-hardware profiling, no Core Web Vitals, Chromium only, no screen-reader pass, and no
  test on a physical phone** — the viewports were emulated.

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
