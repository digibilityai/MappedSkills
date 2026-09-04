# THE RESOLVE — Complete Homepage — Session 18B Compression

**Session:** 18B · **Date:** 2026-09-03 · **Branch:** `test_branch`
**Status:** **PROPOSED. Gate 10 remains NOT PASSED — IN PROGRESS.**

**Owner verdict entering this session:**
> *"The page seems too text heavy and long. After a point I am losing interest in reading the page.
> There is so much of monotony."*

**This is now the primary design problem, and it is not answered by more motion.** A long
text-heavy page with more animation is still a long text-heavy page. The owner **lost interest
while scrolling** — the text/visual ratios reported in Session 18A do not rebut that, and are not
offered as a defence. This session solves the **information architecture of the experience** first.

---

## 1. Before — measured at WIDE (1440×900)

| | Session 18A |
|---|---:|
| Document height | **10,635px** |
| Distinct chapters | **10** |
| Visible words in `<main>` | **1,296** |
| Paragraphs | **29** |
| List items | **22** |

### Per chapter

| Chapter | Height | **Visible words** | Paras | List items |
|---|---:|---:|---:|---:|
| 1 Hero | 895 | 119 | 2 | 0 |
| 2 Departure | 338 | 5 | 1 | 0 |
| 3 Recognition | 1316 | 161 | 6 | 5 |
| **4 Re-read** | 1190 | **239** | 4 | 3 |
| 5 F1 | 588 | 45 | 1 | 0 |
| 6 Boundary | 858 | **186** | 4 | 5 |
| 7 Capabilities | 1740 | **170** | 1 | 7 |
| **8 Evidence** | 1538 | **233** | 6 | 2 |
| 9 Fit | 602 | 128 | 2 | 0 |
| 10 Close | 777 | 10 | 2 | 0 |

**Four chapters carried 828 of the 1,296 words** — the re-read, evidence, the boundary and
capabilities. Those are the four the owner would have been reading when interest ran out.

---

## 2. The editorial audit

Every visible block, classified against the approved commercial strategy **before any CSS was
touched**.

**A — MUST KNOW ON HOMEPAGE · B — USEFUL BUT COMPRESS · C — BETTER ON A DEEPER PAGE · D —
REPETITIVE / REMOVE**

| Block | Class | Decision |
|---|:--:|---|
| H1, the two actions, the PROOF offer | **A** | Unchanged |
| Hero lede — sentence 1 (*buyer demand… never reaches you*) | **A** | Kept |
| Hero lede — sentence 2, enumerating found / paid / page / measurement | **C** | **Cut.** It lists the system in words; the system chapter now shows it |
| The Traffic / Enquiries signature and its four named objects | **A** | Unchanged |
| Departure line | **A** | Kept — 5 words, carries the continuity |
| *"That reads like three problems. It behaves like one."* | **A** | Kept, and promoted |
| The three failure routes | **A** | Kept; labels shortened |
| *"More visits on a path that does not work produce nothing…"* (3 sentences) | **B** | **Compressed to the one clause the visual cannot draw** |
| The five-symptom self-identification list | **C** | **Cut** → `/problems/traffic-but-no-enquiries` |
| Capture / Convert / Measure — the three step descriptions | **B** | **Compressed to one short line each** |
| The six re-read rows × three readings (18 labels) | **B** | **Rebuilt as the system view's stage marks** |
| *"They are different skills. The joins decide the result."* | **A** | Kept as the system chapter's statement |
| The joins paragraph + the engagement-scope paragraph | **C** | **Cut** → `/how-it-works` |
| F1 legend, five items | **B** | **Compressed to three** |
| The five unpromised things | **A** | Kept — fast, visual, and the position |
| *"We are accountable for the qualified enquiry"* + definition | **A** | Kept; definition shortened |
| Boundary `.detail` — close data, unattributed arrivals, no guarantees (3 paragraphs) | **C** | **Cut** → `/how-it-works`. **The single largest copy cut on the page** |
| Capabilities — 3 group headings | **B** | **Became the three system stages** |
| Capabilities — 7 route names | **A** | Kept as compact links |
| Capabilities — 7 route descriptions | **C** | **Cut** → each capability's own page |
| Capabilities — the three intervention maps | **B** | **Replaced.** See §5 — they were also a quantity-safety risk |
| *"We have no case studies to show you."* | **A** | Kept, at full scale |
| *"That is the honest position…"* | **B** | Compressed |
| The measured claim and its one-line provenance | **A** | Kept |
| The six-row provenance table | **C** | **Cut** → `/research/ai-visibility-baseline`. One limits line retained |
| The measured / not-testable marks legend | **C** | **Cut** → `/research/ai-visibility-baseline` |
| Two checkable items with descriptions | **B** | **Compressed to links** |
| Fit — two paragraphs | **B** | **Compressed to two short statements** |
| Close | **A** | Unchanged |

---

## 3. The revised chapter architecture — ten to six

| # | Chapter | Experiential role | What it absorbed |
|---|---|---|---|
| **1** | **Hero** | **IMPACT** | — |
| — | *Departure band* | *transition* | — |
| **2** | **The problem** | **FRICTION — almost entirely visual** | Recognition, minus its list and two of its paragraphs |
| **3** | **The system** | **DISCOVERY — one large interactive system view** | **The re-read + F1 + the whole capabilities chapter** |
| **4** | **The boundary** | **ONE ENORMOUS STATEMENT** | Boundary, minus its two-column detail |
| **5** | **Evidence** | **QUIET, DARK, COMPRESSED** | Evidence, minus its provenance table |
| **6** | **Fit → close** | **FILTER, THEN DESTINATION** | Fit compressed into a band feeding the tangerine close |

**The rhythm is now IMPACT → DISCOVERY → PROBLEM → SYSTEM → CREDIBILITY → ACTION**, and no two
chapters share a silhouette: one is a dark stage, one is almost pure drawing, one is a large
interactive system, one is a single enormous sentence, one is quiet and dark, one is full-bleed
colour.

---

## 4. The system chapter — the compression device

**Three chapters became one.** The re-read (1,190px / 239 words), F1 (588px / 45 words) and
capabilities (1,740px / 170 words) were **3,518px and 454 words** explaining one system three times.

They are now **one view of that system**, with three stages:

> `01 CAPTURE` → `02 CONVERT` → `03 MEASURE`

**The chain is drawn once, complete and static** — six points, the unmeasured lead-in dashed, the
join ticks, the unattached arrival, the accountability boundary, the client-data double line. It
satisfies F1's entry state at first paint and **nothing about it is revealed only by interaction**.

Selecting a stage changes **which discrete marks on that chain are the subject**, shows **one short
line**, and surfaces **the capabilities that intervene there** as compact links to their own pages.
It plays through the three stages once on entering view and then rests on the complete state; the
three stage labels are buttons the reader can re-select.

**This chapter now does three jobs at once** — Capture→Convert→Measure, F1, and "we intervene
across the system" — which is what made three separate chapters removable.

---

## 5. Quantity-safety correction — required by §25

**The Session 18A intervention maps drew a continuous tangerine bar along a proportion of the
chain: roughly 10%, then 60%, then 100%.** Those are lengths, and a length invites reading as an
amount — coverage, effectiveness, or a share of the work. That was a real ambiguity and it has been
removed.

> ### The replacement marks **discrete points and joins only. There is no continuous active bar
> ### anywhere on the page.**

| Stage | Marked | Cannot be read as |
|---|---|---|
| **Capture** | The discovery point, and the unmeasured demand before it | a proportion — it is one point |
| **Convert** | The landing, interaction and enquiry points, and the joins between them | a proportion — they are named points |
| **Measure** | The qualified-enquiry point, the unattached arrival, and the boundary rule | a proportion — it is a limit and an exception |

A point cannot express a percentage. **Kind and location, never quantity** — and the standing note
says so.

---

## 6. After — measured by the same method as the before

Both pages were measured with every disclosure open and transitions neutralised, so the two
numbers are comparable rather than flattering.

| | Session 18A | **Session 18B** | Change |
|---|---:|---:|---:|
| **Document height, WIDE** | 11,056px | **7,714px** | **−30.2%** |
| **Visible words in `<main>`** | 1,435 | **681** | **−52.5%** |
| **Paragraphs** | 29 | **21** | **−27.6%** |
| **List items** | 22 | **10** | **−54.5%** |
| **Sections** | 10 | **8** | **−20%** |
| **Mobile screens at 390×844** | 14.4 | **9.3** | **−35.4%** |
| DOM nodes, WIDE | 1,078 | **895** | −17% |

### Per chapter, after

| Chapter | Height | Words | Role |
|---|---:|---:|---|
| 1 Hero | 895 | 91 | Impact |
| *Departure band* | 338 | 13 | transition |
| 2 The problem | 1,004 | 75 | Friction — almost entirely visual |
| **3 The system** | **1,313** | **155** | **Discovery — the one large experience** |
| 4 The boundary | 683 | 81 | One enormous statement |
| 5 Evidence | 1,431 | 145 | Quiet, dark |
| 6 Fit | 480 | 75 | Filter |
| 7 Close | 777 | 46 | Destination |

**Three chapters absorbed into one** took 3,518px and 454 words down to 1,313px and 155 words.

## 7. Anti-monotony — no two chapters share a silhouette

| Chapter | Ground | Dominance | Composition |
|---|---|---|---|
| Hero | **Dark → light inversion** | Type + population | Two columns, huge display |
| The problem | Ivory | **Drawing** | Full-width routes converging on a rule |
| The system | Ivory | **Interactive figure** | A control column above one full-width chain |
| The boundary | Ivory | **Type** | Two columns, a list falling and one statement |
| Evidence | Ivory → **dark object** | Type, then a dark surface | One 86px sentence alone, then a dark territory |
| Fit | Ivory | Type | Two short positions with state marks |
| Close | **Full-bleed tangerine** | Type + arrival | Centred destination |

## 8. Motion after compression

Recounted on the new structure. **No transition was added.**

| Tier | 18A | **18B** | Note |
|---|:--:|:--:|---|
| T1 | 1 | **1** | The hero resolve, untouched |
| T2 | 2 | **2** | The friction alignment; the three-stage sequence replaced the re-read |
| **T3** | 5 | **4** | The boundary state was **removed with its chapter** — the chain is now complete at all times, so there is no second arrival on it |
| Ambient / pinned | 0 | **0** | |
| Surface inversions | 2 | **2** | |

**Declared honestly:** the page now carries **two reader-driven controls** — the Traffic/Enquiries
signature, and the three-stage tablist. The budget permits one *signature interaction*; the
tablist is classified here as **progressive disclosure**, which §19 of this session's brief
explicitly asked for, not as a second signature. **The orchestrator may disagree, and the count is
declared rather than buried.**

**The T3 number is NOT settled in this session**, as instructed. The page currently runs 4.

## 9. Self-critique — A to L

**These answers are not programme approval and must not be read as passing Gate 10.**

### A. What percentage of visible copy was removed?
**52.5%** — 1,435 words to 681, measured by the same method on both pages. Paragraphs fell 27.6%
and list items 54.5%.

### B. What moved to deeper-page handoffs?
- The five-symptom self-identification list → `/problems/traffic-but-no-enquiries`
- The joins paragraph and the engagement-scope paragraph → `/how-it-works`
- **The boundary's three-paragraph detail** — close data, unattributed arrivals, no guarantees →
  `/how-it-works`. The single largest cut on the page
- **The six-row provenance table and the measured/not-testable legend** → `/research/ai-visibility-baseline`
- The seven capability descriptions → each capability's own page, reached from the system view

### C. What was combined?
**The re-read, F1 and the entire capabilities chapter became one system view.** They were three
chapters explaining one system; they are now one view of it with three stages. The accountability
boundary, previously a second arrival on the F1 instance, is now simply always drawn.

### D. What was removed as repetition?
- The hero's second lede sentence enumerated *found / paid / page / measurement* in words — the
  system chapter shows exactly that, so the sentence was pure duplication.
- Two of the recognition chapter's three explanatory sentences restated what the three converging
  routes already draw.
- The three intervention maps repeated the chain a fourth, fifth and sixth time; the single system
  view says the same thing once.

### E. Which visual now does the most informational work?
**The system view.** One chain carries: the six-point structure, the unmeasured demand before it,
the joins, the unattributed arrival, the accountability boundary, the client-data segment, *and* —
through its three stages — which capabilities intervene where. It replaced 454 words.

### F. Where is the longest uninterrupted reading burden?
**The evidence chapter, at 145 words and 1,431px** — now the largest chapter on the page. Its
weight is mostly the 86px admission and the dark surface rather than prose, but it is the longest
stretch where the visitor is asked to read.

### G. Where is the page still monotonous?
**Between the boundary and fit** — two consecutive ivory, type-dominant, two-column chapters
separated only by the evidence chapter's dark object. If the owner still reports monotony, that is
where it lives.

### H. At what point might a visitor still lose interest?
**Entering the evidence chapter**, roughly 60% down. The system view is the page's peak; what
follows is deliberately quieter, and three quiet chapters in a row is a risk even at this length.

### I. Does mobile feel materially shorter?
**Yes — 14.4 screens to 9.3, a 35% reduction**, and no chapter now exceeds 1.6 screens. The
seven capability links are compact pills rather than seven described rows, which is most of the
saving.

### J. Does the visitor need to read every paragraph?
**No, and this was tested rather than asserted.** Reading only display type and action labels, in
document order, a visitor receives: *Judge us on the enquiries, not the traffic* → *It behaves like
one* → *The joins decide the result* → **Capture / Convert / Measure** with all seven capability
names → *What we are accountable for, and where that stops* / *we do not promise* → **We have no
case studies to show you** → *Who this is built for* → *Two ways to start*.

**That answers all six homepage questions in §6 of the brief without reading a single paragraph.**

### K. Does the page still preserve strategic meaning?
**Yes, with one honest qualification.** The approved proposition, the accountability boundary, the
refusal to promise five things, the unattributed-arrival honesty, the no-case-studies admission and
the measured zero all remain **visible on the homepage**. What left the page is *elaboration* — the
sentences that explained those positions a second time — and every one of them went to a page that
already carries it in the approved IA.

**The qualification:** Block 4's detail paragraphs were approved homepage copy, and they are no
longer on the homepage. That is a deliberate editorial decision under §3 of this brief, not an
oversight, and it should be confirmed rather than assumed.

### L. What would I cut next if the owner still says it is too long?
1. **The fit chapter (480px).** Its job could be done by one line above the close.
2. **The departure band (338px).** It carries 13 words and one continuity idea; the page would
   survive the hero handing straight to the problem.
3. **The evidence chapter's two check links** — the footer already carries both destinations.
4. **The legend under the chain** — three items of supporting text under a figure that is now
   labelled well enough to stand without them.

**Together those are roughly 1,100px, and I would take them in that order.**

## 10. Risks carried forward

- **Two reader-driven controls now exist.** Declared in §8. The stage tablist is progressive
  disclosure, but it is the second control on the page and the orchestrator should rule on it.
- **Block 4's approved detail paragraphs are no longer on the homepage.** Deliberate, and it needs
  confirmation.
- **The system view's three stages auto-advance once over ~4.2s.** A fast scroller may pass during
  stage 2. All three stages' copy and all seven links stay in the DOM and are reachable by click
  and by arrow key, and reduced motion and no-JS compose all three open — but the *sequence* can
  be missed.
- **Screenshots remained unreliable in this environment.** Layout, geometry, contrast, structure,
  word counts, reduced motion and the no-JS path were verified programmatically; **the animations
  were verified by their start and end states and by layout math, not by watching them run.**
- **No real-hardware profiling, no Core Web Vitals, Chromium only, no screen-reader pass.**

## 11. Defects found and fixed in 18B

| # | Defect | Fix |
|---|---|---|
| **12** | **All three chain drawings rendered at once.** `.chain svg{display:block}` (0,1,1) out-ranked `.d-wide{display:none}` (0,1,0) — **the exact Session 17B defect #1, reintroduced when the figure was rebuilt.** The system chapter measured 2,415px with a 1,945px column | Removed `display` from the element-level rule so the breakpoint rules govern. Chapter is now 1,313px |
| **13** | **The `/services` link was a stray grid child**, taking a grid cell of its own and squeezing the chain to 225px wide | Wrapped the stages and the link in one column element |
| **14** | **The chain's own labels rendered at ~10px** when the figure sat in a column, because the drawing is authored at a fixed viewBox | The system chapter is now **stacked at every width** and the chain is full-width — labels render at ~17px, and the page gains the one large visual moment §18 asked for |
| **15** | **Under reduced motion the reader was never shown stages 01 and 02**, so two-thirds of the capability links sat behind an interaction | All three stages **compose open** under reduced motion, matching the no-JS path |
| **16** | **The unselected stage numerals failed contrast** at 3.13:1 in `--gapc` | Moved to `--dim` |

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
