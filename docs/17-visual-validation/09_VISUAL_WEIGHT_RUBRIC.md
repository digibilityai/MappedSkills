# Visual-Weight Assessment Rubric — Session 14A — PROPOSED, PROGRAMME-LEVEL

**Session:** 14A — Narrow visual closure · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** Defines how the proportion rule (`17_ARGUMENT_APPARATUS_HIERARCHY.md`
§4.4, anti-pattern **B32**) is assessed. Applies to F3 at Gate 10 and after.

> ### Ordering discipline, stated so it can be checked
> **This rubric was written and saved before the complete `/seo` page was built, rendered or
> measured.** No threshold, class boundary or verdict rule below was chosen after seeing a
> result. File timestamps are the evidence: `08` and `09` precede
> `prototype/05-seo-complete.html`.

---

## 1. The problem this rubric exists to solve

Session 14 measured the same screens two ways and got opposite answers:

| Measure | Capability | Limits |
|---|---|---|
| Raw rendered area | 37.5% | **62.5%** |
| Emphasis-weighted area | **51.9%** | 48.1% |

**A rule that two reasonable measures answer in opposite directions is not decidable.** Until the
programme says which reading governs, a future session could pass or fail identical screens by
choosing a measure. That is the gap this closes.

## 2. The governing distinction

> **STRUCTURAL AREA** — how much of the page a class of content occupies.
> **PERCEPTUAL EMPHASIS** — which object governs attention and meaning on a screen.

They are **not summed, not averaged and not traded**. They answer different questions, and the
proportion rule is a question about the second.

> ### **EMPHASIS GOVERNS. AREA INFORMS.**

**This does not mean evidence must occupy less physical area than commercial content.** A page can
be mostly evidence by area and still be commercially governed — that is precisely *"emphasis is
commercial, presence is evidential"* rendered. Area matters only where it **contradicts** the
emphasis reading, and §5 defines what contradiction means.

---

## 3. The unit of assessment: the viewport-height band

A page is divided into consecutive bands one **rendered viewport height** tall, at the width
being assessed.

**Why this unit and not another.** A reader scrolling a long page experiences screenfuls, not
sections. A section that is dominated by a limit across three screenfuls is a different
experience from the same material inside one. The band is the smallest unit that matches how the
page is actually consumed, and it is reproducible: another reviewer using the same viewport
height gets the same bands.

**Bands are counted from the top of the page content**, excluding any validation chrome.

---

## 4. Classification — every assessable object falls in exactly one class

| Class | What it is | Examples |
|---|---|---|
| **COMMERCIAL** | Argument-register content that states what the firm does, the buyer's problem, the consequence, the mechanism, or the action | H1, section headings, body prose, the consequence statement, CTA objects, capability scope |
| **LIMIT** | Argument-register content that **qualifies** a capability — the accountability boundary, what is not promised, what cannot be attributed | `/seo` move 5; the attribution paragraph in move 6 |
| **EVIDENTIAL** | Apparatus — provenance, status marks, scope notes, sources, dates, samples, method disclosures, register labels, figure captions | Provenance lines, `measured` / `not testable`, disclosures, register labels |
| **FIGURE** | An explanatory figure | F1 PARTIAL |

**LIMIT is separated from EVIDENTIAL deliberately.** A limit is argument-register content set at
full type quality; apparatus is provenance in a different register. Merging them would hide which
of the two is doing the out-weighing, and the two have different remedies.

**FIGURE is assessed separately** because it belongs to neither: it is commercial explanation
carrying evidential honesty, and forcing it into one class would decide the result by
classification rather than by observation.

---

## 5. Axis 1 — PERCEPTUAL EMPHASIS (the governing axis)

For each band, identify the **dominant object** by applying these channels **in order**. The first
channel that yields a clear winner decides; ties fall through to the next.

| # | Channel | How it is read |
|---|---|---|
| **1** | **Typographic scale** | Largest computed type size carrying meaning |
| **2** | **Weight and contrast** | Computed font weight; computed contrast against its ground |
| **3** | **Isolation** | Whitespace around the object relative to its neighbours |
| **4** | **Interactive prominence** | A definite, bounded action object outranks running text at equal scale |
| **5** | **Boundary and surface** | A ground change or a set-piece rule marking the object's region |
| **6** | **Position in reading order** | Earlier in the band wins a remaining tie |

Record the dominant object's **class** for every band.

**Density and repetition** are recorded per band as supporting observations — the count of
EVIDENTIAL objects, and the count of each recurring device (rules, labels, ties, evidence bands,
status marks, figures) across the whole page. They do not decide a band; they are the evidence
the drift test uses.

## 6. Axis 2 — STRUCTURAL AREA (the informing axis)

Total rendered area by class, per band and for the page. Reported as a distribution. **It never
produces a verdict on its own.**

---

## 7. The verdict rule

Defined here, before any measurement.

> **PASS** — all three hold:
> 1. **No band is emphasis-dominated by an EVIDENTIAL object.**
> 2. **COMMERCIAL is the dominant class in more bands than LIMIT and EVIDENTIAL combined.**
> 3. **No contiguous run of two or more bands is dominated by LIMIT or EVIDENTIAL on *both* axes**
>    — emphasis *and* area.

> **PARTIAL** — emphasis conditions 1 and 2 hold, but condition 3 fails: there is a contiguous
> run of two or more bands where LIMIT or EVIDENTIAL leads on both axes.

> **FAIL** — either condition 1 or condition 2 fails.

### 7.1 Why these conditions and not thresholds

- **Condition 1 is the doctrine, stated literally.** *"Emphasis is commercial"* means an
  apparatus object never governs a screen. It is binary; no threshold is possible or needed.
- **Condition 2 is a comparison, not a threshold.** It asks which class governs more of the
  reading experience. It has no tunable number.
- **Condition 3's only quantity is "two or more contiguous bands", and it is structural, not
  tuned.** One band dominated by a limit is a moment in a page — the accountability boundary is
  *supposed* to be a set-piece and *supposed* to slow the reader (`18` §4). **Two consecutive
  screenfuls of qualification is a sustained experience**, and sustained qualification is what
  B32 means by *"honesty rendered without proportion becomes apology"*. The boundary between a
  moment and a sustained experience is one screen, not a percentage.

**No condition contains a percentage, a ratio or a score.** That is deliberate: any such number
would have to be chosen, and choosing it after seeing a page is the failure this rubric exists to
prevent.

### 7.2 What is explicitly not a failure
- Evidence occupying more area than commercial content.
- A single band dominated by the accountability boundary.
- A figure dominating a band.
- Apparatus being present in every band.

---

## 8. Reproducibility

Another reviewer applying this rubric needs: the page, a stated viewport width and height, and
the class definitions in §4. They divide the page into bands, pick the dominant object per band
by §5's ordered channels, total area by class per §6, and apply §7.

**Two reviewers can still disagree** — on a borderline tie at channel 3 or 4, and on the
classification of an object that sits between COMMERCIAL and LIMIT. Both disagreements are
narrow, visible and arguable from the page, which is the standard this rubric aims at. It does
not claim to be a measurement.

## 9. What this rubric is not

Not eye-tracking, not user research, and not a model of attention. It is a **structured,
reproducible reading of a rendered page against a stated rule.** Where it is used to pass or fail
F3, that limit is carried with the verdict. Real-reader testing remains outstanding and is not
substituted for by anything here.
