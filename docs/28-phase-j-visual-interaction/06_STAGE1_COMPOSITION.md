# PHASE J — STAGE 1 — J9 COMPOSITION SYSTEM

**Date:** 2026-09-07 · **Branch:** `test_branch` · **Starting HEAD:** `f9af9ed`
**Ruling implemented:** Phase J design gate — *APPROVED WITH CONDITIONS*, Stage 1 + Stage 2 only.
**Status:** **IMPLEMENTED — AWAITING OWNER / ChatGPT REVIEW.** Rollout stopped after Stage 2.

---

## 1. The problem this closes

`01_QUANTITATIVE_BASELINE.md`: **110 of 112 commercial sections — 98.2% — began at exactly the
same left x-coordinate.** Every commercial route composes through one component, and that
component had exactly one composition.

> **⚠ CORRECTION to `00_VISUAL_DENSITY_AUDIT.md` §4.1.** That section's prose says the shared
> coordinate "at 1425 px is `56 px`". **The measured modal coordinate is `40 px`** — as the
> baseline's own histogram in `01_QUANTITATIVE_BASELINE.md` records (`40 px × 110`). The count and
> the percentage were right; the pixel value in the prose was wrong. Corrected here rather than by
> rewriting a reviewed gate record.

---

## 2. What was built

**One file carries the whole of Stage 1: `components/commercial/primitives.tsx`.**
`CommercialSection` gained a `mode` prop with five compositions.

| Mode | Composition at ≥ 1081 px | Below 1081 px | Earned by |
|---|---|---|---|
| **`editorial`** | today's single reading column — **output unchanged** | unchanged | the default; reading-heavy chapters, and every route not opted in |
| **`split`** | chapter label in a 20ch left rail; the reading in the wide column beside it | single column, label first | a reading chapter with more than one body paragraph |
| **`reverse`** | the reading leads at the container edge; the label annotates from the **right** margin | single column, label first | a chapter carrying a list the reader scans |
| **`statement`** | one centred column, measure **moved not widened** (68ch cap) | single column, left | a short chapter that is essentially one statement — **capped at one per route** |
| **`wide`** | label keeps the measure; content below released from it | single column | a chapter carrying a figure or a `ScopeList` |

### How a page opts in — one token, no JSX restructuring

The children are partitioned **inside the component**, by component identity
(`k.type === ChapterLabel`), into the chapter label and everything else. A call site therefore
changes from `<CommercialSection>` to `<CommercialSection mode="split">` and nothing else. There is
no wrapper at the call site, no new prop to thread, and no CSS child-position selector that a later
edit could silently break.

### §9 — empty columns are structurally impossible

A two-column mode needs a `ChapterLabel` to fill its rail. **If a section has none, the mode
degrades to `editorial`** rather than rendering a column with nothing in it. Verified on the
rendered page: on `/seo` the split section's rail carries 43 characters in 195 px and the reading
column 503 characters in 1 078 px; the reverse section's rail carries 37 characters at x = 1 178.
**Both columns are populated in every instance.**

### Responsive

Every two-column mode is **single-column below 1081 px**, in DOM order, label first. Narrow and
medium keep today's vertical reading flow exactly — measured: `/about`, `/pricing`,
`/how-it-works` and `/problems/…` are within **±4 px** of their previous height at 390 px. The
validated mobile composition was not disturbed to solve a desktop problem.

---

## 3. Mode assignment — deterministic, by section role

Modes were **not** alternated by index. Each section was classified by what it contains, by a
single rule applied uniformly to all 66 `CommercialSection` instances:

```
no ChapterLabel, or a BoundaryBlock        -> editorial   (the boundary carries its own composition)
contains a figure or a ScopeList           -> wide
contains StatedList/FindingList/
         EntryList/QuestionList            -> reverse
short (< 620 chars) and <= 1 Body,
         and none used yet on this route   -> statement
everything else                            -> split
```

**A first pass of this rule was wrong and was corrected.** Classifying `statement` on
"`<= 1 Body`" alone fired **15 times**, including on `/faq`'s Q&A group sections (which contain a
`.map()` and a `<ul>`) and on several 1 400–2 900-character chapters that simply use markup other
than `<Body>`. Centring a long FAQ list is not a statement composition. Adding the length test and
the one-per-route cap brought it to **3**, which is what the Phase J grammar allows.

### Resulting distribution — 66 sections across 14 routes

| Mode | Sections |
|---|:--:|
| `split` | **31** |
| `wide` | **13** |
| `reverse` | **10** |
| `editorial` (unchanged) | **9** |
| `statement` | **3** |

**57 of 66 sections changed composition. 9 were deliberately left alone.**

---

## 4. What Stage 1 did NOT touch

| | |
|---|---|
| **Copy** | Zero words changed. No paragraph was rewritten, shortened, merged or deleted |
| **DOM order** | Unchanged in every mode, including `reverse`, which moves the label by explicit grid column placement rather than by reordering markup — so the heading still precedes its content for a screen reader and with CSS off |
| **Heading levels** | Unchanged. `ChapterLabel` still renders `<h2>`. Verified: **exactly one `<h1>` on all 18 routes at all 10 widths** |
| **Reading measure** | Unchanged. `statement` *moves* the column; it never widens the line |
| **`/contact`, `/thank-you`, `/schedule-call`, 404** | **Not in the changed file set.** They keep `editorial`, whose output is unchanged |
| **The homepage** | See §5 |
| **Motion** | **Stage 1 adds none.** No transition, no observer, no client component. It is pure layout |

---

## 5. Homepage protection — structural, not a promise

`app/page.tsx` and `components/homepage/*` **import neither `commercial/primitives` nor
`ScopeList`**. The homepage's full transitive import graph was enumerated and intersected with the
changed file set:

```
homepage graph: analytics/*, homepage/*, layout/Container, Logo, Header, Footer,
                ui/button, hooks/use-resolve-motion, lib/{consent,gtm,meta-pixel,metadata,schema,utils}
changed set:    app/(pages)/*/page.tsx (14 routes), commercial/primitives.tsx,
                commercial/ScopeList.tsx, commercial/ScopeDisclosure.tsx  (new)
intersection:   EMPTY
```

**No homepage file was modified and no module the homepage depends on was modified.** The rendered
delta is therefore zero by construction, not by inspection.

---

## 6. Two spacing defects found and fixed during implementation

| Defect | Symptom | Fix |
|---|---|---|
| **Double top margin in `wide`** | The wrapper supplied a gap after the label *and* `Display` kept its own `mt-[18px]` — every `wide` chapter opened with a doubled gap | `[&>*:first-child]:mt-0` on the wrapper |
| **Double top margin below WIDE in `split`/`reverse`** | The first-child reset was scoped to `min-[1081px]`, so the **stacked mobile layout** got the wrapper's `mt-[18px]` on top of `Display`'s own | reset applied at every width; the wrapper's margin stays WIDE-only |

The second is the more instructive: a rule written to fix desktop introduced a mobile-only defect,
which is precisely the failure mode §10 of the Stage 1/2 brief warns about.
