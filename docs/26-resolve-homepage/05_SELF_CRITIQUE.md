# THE RESOLVE — Complete Homepage — Self-Critique

**Session:** 18 · **Date:** 2026-09-03 · **Status:** PROPOSED. **These answers are not programme
approval and must not be read as passing Gate 10.**

> A validation that reports no defects has usually not been looked at. **Eight defects were found
> by rendering this page and are recorded below with their fixes**, followed by the weaknesses that
> were *not* fixed.

---

## 1. Defects found by inspection, and fixed

| # | Defect | Why it mattered | Fix |
|---|---|---|---|
| **1** | **The page had no `color-scheme` declaration**, so a browser in forced/auto dark mode inverted the whole design | THE RESOLVE is light-first by decision; the dark hero stage is a *counted inversion inside a light page* and carries meaning. Inverted, the direction is destroyed — and it would have shipped invisible | `<meta name="color-scheme" content="light">` and `html{color-scheme:light}` |
| **2** | **The friction alignment was computed before the marks resized**, landing 4px past the outcome rule | A precision figure that misses its own rule reads as a mistake | The stop mark's **size is now constant**; only its position changes |
| **3** | **The alignment then depended on a cascade override that did not reliably apply**, and on `requestAnimationFrame`, which does not run in a non-rendering tab | A mark could be left **displaced** — worse than not animating at all | Inverted the pattern: **the aligned state is the CSS default**, JS writes the start state inline and releases it on a timer, and a `visibilitychange` resumes composed |
| **4** | **The re-read question reserved 2.4em but ran to three lines**, overlapping the steps beneath | A layout collision on the page's densest chapter | Widened to 24ch, reservation raised to 3.4em (4.4em narrow) so **no reading shifts the layout** |
| **5** | **Content behind on-view reveals was invisible if the observer never fired** | An `IntersectionObserver` does not run while a tab is hidden or throttled. Motion must never be the carrier | A **4-second floor** forces every registered behaviour, and each is guarded so it runs once |
| **6** | **23 touch targets under 40px at 390px** — the PROOF links, every footer link, the logo | The mobile buyer is the likelier one here, and the nav architecture requires targets comfortably above minimum | Narrow-width padding rules. **Now 0 under 40px** |
| **7** | **Four contrast failures**: the 122px chapter numeral at **1.30:1**, two 13px labels in `--gapc` at **3.13:1**, the footer note at **4.32:1** | Real WCAG failures, one of them on the largest type on the page | Numeral made `--tang-ink` unconditionally; `--gapc` withdrawn from all small text; footer note lightened. **129 text nodes now pass** |
| **8** | **A heading level jump (H2→H4)**, and the approved block headings were not the actual headings | Heading-only navigation is the approved skip mechanism, and it was delivering invented display lines instead of the approved argument | The approved headings are now the real `<h2>`s; the display lines are approved body copy set at scale; `<h4>` removed |

## 2. The required answers, A–J

### A. Where does the homepage feel most alive?
**Chapter 4, the re-read.** Six rows physically travelling to new positions while their labels and
states change is the only moment where the visitor watches *commercial meaning* change rather than
watching an element appear. It is also the answer to the brief's hardest instruction — capture →
convert → measure without cards, columns or a funnel.

Second: **the hero resolve**, which remains the strongest single event and is untouched from 15C.

### B. Where does it still feel static?
**Chapter 7, capabilities — and it is the longest chapter on the page at 1,750px.** It is
deliberately still, but "deliberately still" and "too long to be still" are different things. Nine
routes across three groups is a lot of ivory with nothing but a hover response. If any chapter
makes the owner say *bland* again, it will be this one.

**Chapter 9, fit**, is also still, but it is short enough to earn it.

### C. What is the single most memorable visual event?
**The hero resolve.** It is still the best thing in the direction and nothing added here competes
with it — which was the intent (§8 of the brief: do not spend an equally strong transformation
immediately afterwards).

**The strongest *new* event is the friction alignment**, because it is the only one where the
composition itself makes an argument the copy also makes.

### D. Does F1 now feel like a journey or still a diagram?
**Better than 17C, and not yet resolved.** Arriving at it by **descent** — the figure scaling up
from 0.44 out of a chapter that has already taught its vocabulary — genuinely changes what it is.
It is no longer introduced; it is approached.

**But the honest answer is that it is a diagram you arrive at well.** Once the descent finishes,
what is on screen is still a labelled chain with a legend, and the reader stops moving through
something and starts reading. **That is the specific thing the owner should judge in the browser**,
because it is the question this session existed to answer and I do not think a document can settle it.

### E. Does CAPTURE→CONVERT→MEASURE feel experiential or instructional?
**Experiential, and it is the part I am most confident about.** The visitor is not told the three
states differ; the same six rows are re-sorted in front of them three times. The risk is the
opposite one: at 1,500ms per beat the full sequence is ~3s, and **a fast scroller may pass through
during beat 2** and never see 03. The three steps remain readable as text throughout, so nothing is
lost — but the *feeling* can be missed.

### F. What would be meaningfully lost in a PDF?
Five things, and none of them is a fade:

1. **The hero resolve.** A PDF must choose traffic *or* enquiries. The argument is that they are
   **the same population**, which requires one thing becoming another.
2. **The Traffic/Enquiries control.** The only place the reader can put an agency's usual report
   beside ours, on demand. A PDF cannot offer a comparison the reader controls.
3. **The re-read.** A PDF needs three diagrams, which turns one object into three — and *three
   separate diagrams* is precisely the reading that makes it a funnel.
4. **The descent.** A change of distance is not expressible as a static frame; a PDF has one
   distance per figure.
5. **The friction alignment.** Printed, the three outcomes are simply in a column. The *travel* is
   what says *these were different and became indistinguishable*.

**This passes the test.** What is lost is sequencing, causality and reader control — not styling.

### G. Where is motion decorative rather than explanatory?
**Three places, named honestly:**

1. **The departure band's tangerine wipe.** It is atmosphere. The carrier square carries the
   meaning; the wipe is there because the band looked inert without it. **First to cut.**
2. **The fall through the five unpromised things.** Drawing a rule through each is legible, but the
   list reads perfectly without it.
3. **The `.rv` reveals.** Composition, not explanation. They are the reason the T3 count is
   arguable at all.

### H. Where could a visitor become tired of the Resolve metaphor?
**Between chapters 4 and 5.** The re-read is the fourth consecutive appearance of small squares
carrying state, and F1 immediately follows with squares as points on a chain. The vocabulary is
consistent — which is the intent — but consistency and monotony are separated only by whether each
appearance says something new. **Chapter 5 has the weakest claim to novelty**, and it is defended
only by the change of distance.

If the owner reports fatigue, **the place to break the vocabulary is chapter 7**, which currently
adds nothing visual at all and could carry a genuinely different register.

### I. Does the page look like a marketing company before reading it?
**Yes, with one reservation.** Blurred, the page reads as: a very large confident statement, a dark
stage that inverts, a wide asymmetric composition, one hot accent used sparingly, a big numeral, a
full-bleed colour close. That is a marketing company's silhouette, not a journal's, not a SaaS
product's, and not an SEO agency's.

**The reservation:** chapters 6 through 9 blur into four consecutive quiet text regions —
approximately 4,500px, or 43% of the page, with almost no visual event. A visitor who lands
mid-page could form the document impression the programme has already made once.

### J. What would you cut before adding anything else?
**In order:**

1. **The departure band's tangerine wipe** (G1) — decoration.
2. **The legend under F1.** Five items of supporting text is the densest text cluster on the page
   and 17C already flagged it as where document drift begins.
3. **The `.rv` reveal on the capability groups** — three staggered reveals on a routing surface
   that should simply be there.
4. **One of the two `.proof` links in chapter 9** — `/pricing` and `/services` compete at the
   moment the reader should be deciding.

**And I would cut chapter 7's length before adding a single new visual event anywhere.**

## 3. Weaknesses NOT fixed, and stated as risks

### 3.1 The T3 budget is exceeded, 6 against 3
Declared in `02_MOTION_SYSTEM.md` §3 with a recommended amendment and a cut order. **This is an
orchestrator decision and I have not made it.** M7 says an overage is a defect, not a judgement
call — so this page carries a declared defect until that number is settled.

### 3.2 The quantity-safety argument rests on a convention, not on geometry
The re-read draws **no bars, no widths and no proportions** — a deliberate reduction from 15C — and
holds **exactly six rows in every reading**, so nothing narrows. But the *composition* of states
differs between readings (3 live / 2 lost / 1 gap, then 3/2/1, then 3/1/1/1). A determined reader
could count them. **The standing note says kinds, not counts** and no number, percentage, rate or
axis appears anywhere — but the protection is a stated convention, not an impossibility.

The friction runs are the weaker case: three routes of 3, 6 and 9 marks. Those encode **distance
travelled**, which is a structural property, not a quantity of demand — and the note says so
explicitly. **If the owner reads them as amounts, they must be redrawn.**

### 3.3 Chapter 7 is 1,750px of near-total stillness
Named in B, I and J. Not fixed in this session because fixing it means either adding a visual event
to a routing surface (which the approved copy prohibits — *"this list must not be rendered as a
grid of equal-weight cards"*) or shortening it (which loses routes). **It needs a compositional
answer, not a motion answer.**

### 3.4 The re-read's timing is untuned
1500ms per beat was chosen, not derived. It has never been watched by a person on real hardware.

### 3.5 What could not be positively confirmed in this environment
- **Screenshots were unreliable** — the preview pane repeatedly backgrounded, and a hidden tab
  throttles `IntersectionObserver`, `requestAnimationFrame` and CSS transitions. Layout, geometry,
  contrast, structure, reduced motion and the no-JS path were therefore verified **programmatically
  by measurement**, which is stricter. **The animations themselves were verified by their start and
  end states and by their layout math, not by watching them run.**
- **No real-hardware profiling**, no Core Web Vitals measurement, no cross-browser pass (Chromium
  only), no screen-reader pass, and no keyboard walk of the full page beyond the navigation.
- **Nobody has seen the page at full size on a large display.** The owner's browser review is the
  first time that will have happened.

### 3.6 F2 and F3 have not been tested against this page
Required by the brief §35. See the handoff. They are assessed, not built.

---

# SESSION 18A SELF-CRITIQUE — A to N

**Date:** 2026-09-03. **These answers are not programme approval and must not be read as passing
Gate 10.** Owner browser review is required after this pass.

## A. The three strongest visual moments now
1. **The hero resolve.** Unchanged, and still the best thing in the direction. Nothing added in
   18A competes with it, which remains deliberate.
2. **The friction alignment** — and it is stronger than in Session 18 because it **now happens on
   mobile too**, where it previously did not exist at all.
3. **The capabilities intervention maps.** New. Three drawings of the same chain where the marked
   stretch marches forward — 10%, then 60%, then all of it. It is the first thing in the second
   half that rewards looking rather than reading.

## B. The weakest chapter now
**Evidence (chapter 8), at 14.5% of the page with 2 visual atoms.** It grew when the admission was
enlarged, and it is now the largest chapter that draws almost nothing. Its visual weight is carried
by the dark surface and by 86px type — which is real, and which my atom count does not capture —
but it is the chapter I would look at next.

Capabilities is no longer the weakest, which was the point of the exercise.

## C. Where the visitor first feels anticipation
**In the hero, before the resolve fires.** The page opens dark on an undifferentiated lattice with
the H1 already legible. There is roughly 1.4s where something is obviously about to happen.

## D. Where the visitor next feels anticipation
**In the friction chapter, in the pause before the alignment.** The three routes draw, they stop at
visibly different distances, and then nothing happens for 1.1s. That gap is the anticipation, and
it is the page's most deliberate one.

**After that:** the descent into F1 (the figure is visibly small and distant before it is legible),
and — new in 18A — **the second intervention map**, because once the reader has understood the
first one, the second and third become a question: *where does this one act?*

**Four points of anticipation, not one.** The excitement test passes, but not by a wide margin.

## E. Does F1 now participate in a journey?
**More than in Session 18, and the honest answer is still: it is a diagram you arrive at well.**

What 18A added is **after** F1, not before it: the chain now **returns** in chapter 7 as the
substrate for the capabilities. So F1 is no longer the last time the reader sees the chain — it is
the moment the chain is *taught*, and the chapter that follows *uses* it. That is participation in
an environment, which is what §7 asked for.

**What is still true:** once the descent finishes, the reader stops moving and starts reading a
labelled figure. **This remains the specific thing the owner should judge in the browser.**

## F. Does CCM feel experiential?
**Yes, and it is unchanged from Session 18 because it did not need changing.** Six rows travel to
new positions and change state three times because the question above them changed. The visitor is
not told the three states differ.

**The unchanged risk:** at 1500ms per beat, a fast scroller can pass through during beat 2. The
three steps stay readable as text, so nothing is lost — but the *feeling* can be missed. Untuned,
and it has still never been watched by a person on real hardware.

## G. Does the second half retain energy?
**Materially better, and not yet equal to the first half.**

Second-half visual atoms went **2 → 41**, and every chapter in it now draws something. The
capabilities chapter — previously 16.7% of the page with nothing to look at — now carries the
page's clearest piece of spatial reasoning.

**But the second half is still 52% of the page and still carries the four most text-dense
chapters.** The improvement is real; the balance is not yet even.

## H. Where is the page intentionally still?
Three places, and all three now have composition to justify the stillness:
- **The boundary chapter** — one drawn rule per promise and nothing else moves. It follows the
  descent directly, which is what makes it read as gravity rather than as absence.
- **Capabilities** — no motion at all. Its progression is **positional**, which is precisely why it
  can stay still and stop being bland.
- **Fit** — two positions, two marks, no motion.

## I. Where is motion still decorative?
**One place, down from three.** The `.rv` reveals are still composition rather than explanation —
opacity and a 24px translate with no meaning attached. They are the reason the T3 count is arguable
at all.

The departure band's wipe **is gone**. The fall through the five promises stays, and I would now
defend it: it is the only motion in the boundary chapter and it enacts the words *fall away*.

## J. Where is THE RESOLVE becoming repetitive?
**Between chapters 4 and 7 — and 18A both improved and worsened this.**

Improved: the vocabulary is now used in six chapters instead of four, so it reads as a *system*
rather than as a gesture that keeps returning.

Worsened: that is six consecutive chapters of small squares. **The intervention maps are the fourth
appearance of the chain specifically** (F1 at chapter 5, its Block 4 state at chapter 6, then three
maps at chapter 7). If the owner reports fatigue, **the chain is where it will be**, not the squares.

**Mitigation already in place:** the maps are drawn at roughly one-third scale, recessive, with no
labels of their own — they read as a reference to the chain, not as a repeat of it.

## K. What would be meaningfully lost in a PDF?
The five from Session 18 remain — the resolve, the reader-controlled comparison, the single-object
re-read, the descent, and the alignment travel.

**18A adds a sixth, and it is a genuinely different kind:** the intervention maps would survive a
PDF **as pictures** but not **as a progression**. On the page the reader discovers the rule from
the first map and then reads the second and third against it. Printed, all three are visible at
once and the discovery is spent immediately.

**The test still passes.** What is lost is sequencing, causality, reader control and now discovery.

## L. Does it look like a premium marketing company before reading?
**Better than Session 18.** The blur silhouette is now: a huge statement over a dark stage that
inverts; a wide asymmetric composition; three runs converging on a rule; a figure that grows; a
column of routes with a small hot diagram repeating at three different states; **one enormous
sentence alone on ivory**; a dark evidence territory; a full-bleed colour close.

**The reservation from Session 18 is reduced but not gone.** Chapters 6, 8 and 9 still blur into
text regions. It is now roughly 28% of the page rather than 43%.

## M. What would I remove before adding another visual event?
1. **The F1 legend.** Five items of supporting text is still the densest text cluster on the page,
   and 17C already named it as where document drift begins.
2. **The `.rv` reveal on the three capability groups** — now that the groups carry maps, the
   staggered fade adds nothing.
3. **One of the two contextual links closing the fit chapter** — `/pricing` and `/services` still
   compete at the moment the reader should be deciding. *(Not removed: both are approved links, and
   dropping one is a copy decision, not a design one.)*

## N. What T3 budget does the actual page now justify?
> ### **Five.**

Four of the five (hero departure, F1 descent, boundary state, close arrival) are transitions the
page is materially worse without — each joins two chapters or changes the reader's distance from an
object. The fifth (the fall) is the boundary chapter's only motion. The sixth was decoration and is
gone.

**Three is too few** — it would force hard cuts at seven of nine boundaries, which is the flatness
the owner rejected. **Six was one too many**, and the audit found which one.

Recommended with the qualifier: **a T3 must join two chapters, change the reader's distance from an
object, or change what an object means. A T3 that only makes a section appear is composition and is
not counted.**

## Defects found and fixed in 18A

| # | Defect | Fix |
|---|---|---|
| **9** | **The friction alignment was switched off below 900px** — the one place the page disabled an event instead of recomposing it | Recomposed for narrow: the outcomes still travel to one column (measured landing at 370px), the rule becomes a per-run tick, the label becomes a caption |
| **10** | **The `aligned` class was orphaned** when Session 18 rewrote the friction JS to the inline-release pattern, so the new narrow ticks would never have appeared | Inverted to the composed-by-default pattern used elsewhere: the ticks are visible by default and JS holds them back with a `pre-align` class it removes on release |
| **11** | **The friction caption sat before the routes in the DOM**, so at narrow — where it becomes a static caption — it would have rendered above the runs it summarises | Moved to the end of `.fail`. At WIDE it is absolutely positioned, so DOM order is irrelevant there |

## Risks carried forward, unchanged

- **The quantity-safety argument still rests on a stated convention, not on geometry** (§3.2 above).
  The intervention maps add no new quantity risk — they draw structure only, and the caption says so
  — but they do draw *proportions of a chain*, and a reader could read the 10/60/100 stretches as
  magnitudes. **They are positions, not amounts.** Watch this in owner review.
- **The re-read's timing is still untuned.**
- **Screenshots remained unreliable in this environment.** Layout, geometry, contrast, structure,
  reduced motion and the no-JS path were verified programmatically by measurement; **the animations
  were verified by their start and end states and by their layout math, not by watching them run.**
- **No real-hardware profiling, no Core Web Vitals, Chromium only, no screen-reader pass.**
