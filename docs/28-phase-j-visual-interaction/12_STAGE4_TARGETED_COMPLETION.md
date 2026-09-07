# PHASE J — STAGE 4 — TARGETED COMPLETION

**Date:** 2026-09-07 · **Branch:** `test_branch` · **Starting HEAD:** `01cf53f`
**Ruling implemented:** Stage 3 APPROVED · right-third occupancy retired as a primary metric ·
`/how-it-works` unblocked for a **static** CAPTURE → CONVERT → MEASURE system · four approved targets.
**Status:** **IMPLEMENTED — AWAITING OWNER / ChatGPT REVIEW.**

> **Headline, stated before the detail: Stage 4 is a PARTIAL result.** It delivered the approved
> `/how-it-works` system and made `/problems` §1 structurally honest, at a real height cost, and it
> moved the site-wide composition metrics by **less than one percentage point**. Two of the four
> approved targets were assessed and correctly received **no visual primitive**, for reasons given
> in full below. Nothing here is dressed up.

---

## 1. `/how-it-works` — the static three-stage system

### What was built

`StageSystem` (`components/routes/primitives.tsx`), placed in §3 *"What we measure — Six points on
one chain"*, above the existing `MethodChain` figure. Three equal columns at ≥ 761 px, stacked below.

### Where every word came from — the proof argument

Nothing in this component is invented, and that claim is checkable:

| Element | Source |
|---|---|
| The three **stage names** | The site's published commercial model — already rendered by `components/homepage/SystemStages` and by `/services`' three approved PARTS |
| The **six points** | `MethodChain`'s own labels, on this same page, in the same words — and the same six `FindingList` describes directly below |
| The **grouping** of six under three | Stated verbatim in the **approved `/services` figure description**: *"Capture covers the discovery point; convert covers landing through the enquiry; measure covers the qualified enquiry and the boundary"* (`components/commercial/ChainFigure.tsx`, `FULL_DESC`) |
| **"Accountable up to here"** | `MethodChain`'s existing boundary label |
| **"Your numbers, from your system"** | `MethodChain`'s existing qualifier on the point beyond the rule |

### What it deliberately is not

**`/how-it-works` §2 — the operational stage descriptions — remains OWNER-BLOCKED and still renders
nothing.** This system does not describe what happens inside a stage, how long one takes, what is
delivered, or in what order work is done. It states only **which measured points fall under which
stage** — a structural fact the page already carried twice.

### Quantity safety

Three stages at **equal width at every viewport**, identical type, weight and colour. Nothing
tapers. **A stage holding three points is not drawn larger than a stage holding one**, because the
number of measured points in a stage is not a quantity of anything — not effort, duration, cost,
volume, loss or a rate. No number appears.

| | |
|---|---|
| Copy retained | All. Nothing removed |
| Copy added | **36 DOM words** — three stage names, the six point labels, the boundary label, the beyond-note and a two-clause caption |
| JavaScript | **0.** Static server component, no client leaf, no motion, no interaction |
| Result | **Works.** The three-part shape of the method is now readable before the detailed chain is read |

---

## 2. `/problems/traffic-but-no-enquiries` — five symptoms made literal

§1's display line says *"Five ways the same problem shows up"*, and until now the five were a single
run-on paragraph joined by *"Or"* — the reader had to count them out of prose to see that the claim
above was literal.

**Primitive:** J4 system anatomy, rendered through the existing `StatedList` with the site's
`anonymous` mark. **No new primitive was introduced** — §7's instruction was followed.

**The mark is load-bearing, not decorative.** `anonymous` is the site's undifferentiated register,
and it is the visual form of the sentence immediately beneath it — *"All of those produce the same
feeling, and they do not have the same cause."* That is the section's entire argument.

### Copy removed — reported exactly, as §11 requires

| Removed | Where its meaning survives |
|---|---|
| Four instances of the connective **"Or "** | The list itself. Its only job was to signal that these are alternatives rather than a sequence, which a five-item list states structurally |
| *(consequential)* the lead word of those four clauses is sentence-cased | Mechanical casing, not a rewrite |

**Net DOM words 2 011 → 2 003 (−8). No clause, qualifier or claim was removed.**

---

## 3. `/pricing` — assessed; StateComparison **not** justified

§9 permitted `StateComparison` *only if the existing copy supports a genuine conceptual contrast*,
and directed J9 composition otherwise. It does not, for two independent reasons:

1. **The page's genuine two-sided contrast is already rendered — and rendered better.** `FactorMatrix`
   shows six factors with a **lower / higher** direction each, as a real `<table>` with a caption and
   `scope` attributes. Its own header records why: *"a well-set table is the correct answer … lets a
   screen-reader user navigate it by row and column; a grid of divs does not."*
   **Replacing that with a two-column div comparison would be an accessibility regression.**
2. **The exclusion list has no positive counterpart.** `NOT_FOR` is five reasons *not* to buy; there
   is no "who this is for" list on the page. `StateComparison` needs two states and would have one.

**What was done instead:** the five `NOT_FOR` items now carry the site's `open` mark — the existing
"condition not met" state, the same one `/about`'s fit comparison uses on its exclusion half — so a
set of exclusions reads as exclusions in the site's own vocabulary rather than only in the word
"not". **Copy unchanged. No commercial fact invented: no price, band, range, retainer, minimum,
package, discount, ROI or saving appears.**

---

## 4. `/lead-generation` — assessed; **no change made**

§10 asked for `StateComparison` on *activity → qualified enquiry* **where supported**. It is not
supported, because **the page already renders exactly that state change as its approved figure**:

- `docs/16-ux/22_F1_USAGE_TAXONOMY.md` §3 assigns `/lead-generation` **C — STATE at the chain's
  terminus**, reasoning that *"F5 — what counts as a qualified enquiry — is precisely a state on the
  run's end point: enquiry → qualified enquiry."*
- Verified on the served page: `ChainTerminus` renders, titled *"The end of the chain, showing an
  enquiry becoming a qualified enquiry."*

Adding `StateComparison` would give the page **two figures for one idea** — the "figure becomes a
signature" failure the taxonomy exists to prevent.

The page's other two-column block (*"What it deliberately does not judge"* / *"What does not count"*)
is a comparison of **two kinds of exclusion**; both sides are `open` states. `StateComparison`'s
met / not-met semantics do not fit it, and forcing them would misstate the content.

**`/lead-generation` is not in the Stage 4 diff.** It keeps everything Stages 1–3 gave it.

---

## 5. Where Stage 4 did not deliver

**Text-only runs did not move at all** — `/how-it-works` 5, `/problems` 4, `/pricing` 4,
`/lead-generation` 3, all unchanged. This is the brief's §3 objective and it was not met.

The reason is structural and worth recording rather than retrying blindly: **on both long pages the
remaining run is in the TAIL, and the tail is content the programme has deliberately protected from
figures and from disclosure.**

| Route | Tail sections forming the run | Why they stay textual |
|---|---|---|
| `/how-it-works` | judgement calls · the other capabilities · what we need from you · what we do not know | §7 is explicitly *"Three subordinate roles, **stated at their real size**"* — rendering three equal columns would contradict the copy. The method page may not carry a disclosure (`03_PAGE_TYPE_ARCHITECTURE.md` §14) |
| `/problems` | what each finding means · what we found on ourselves · close | `FindingList` is bound by `06_PROBLEM_PAGE_UX.md` §5 — equal weight, **never collapsed, never behind a disclosure, never reordered**, because several findings point away from the firm |

**Reducing those runs would mean putting figures on content the programme has decided should be
read.** No attempt was made to move the metric by giving marks to lists where a mark would mean
nothing — that would be gaming the detector, which §22 forbids in spirit.

---

## 6. Defects found and fixed

| Defect | Cause | Fix | Regression test |
|---|---|---|---|
| `StageSystem` cost **+648 px** on mobile on first build | Three stacked blocks at desktop spacing, plus a 45-word caption partly duplicating `MethodChain`'s own quantity-safety note | Narrow-specific gaps and padding; caption cut to two clauses | Re-measured at 390/860/1425 — recovered **119 px** |
| `/about`-style duplicate labelling risk | — | Avoided: `/pricing` marks add no text at all | DOM word count 936 → 936 |
