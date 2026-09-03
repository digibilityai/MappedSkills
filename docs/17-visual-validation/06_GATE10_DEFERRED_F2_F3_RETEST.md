# Gate-9B-Deferred Perceptual Tests, Re-Run Against Rendered Screens — Session 14 — PROPOSED

**Session:** 14 · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED. Neither test is passed automatically, and one is not passed at all.**

---

## 1. What was deferred, and why it could be re-run now

Gate 9B recorded two items as **NOT ASSESSABLE**, with **mandatory re-tests carried to Gate 10**
(`51_GATE_9B_FINAL_ASSESSMENT.md`, orchestrator rulings 4 and 5):

| Test | Gate 9B disposition |
|---|---|
| **F2 — first fixation** | *"On any screen the eye lands first on a date, sample, status mark or method note."* The **reading-order half passed**; the perceptual half required a rendered visual hierarchy that Gate 9B was forbidden from producing |
| **F3 — proportion / visual weight** | The **structural half passed** on count and order. The perceptual half required rendered type and spacing: *"a limits block set in the same size and contrast as the claims it qualifies could still out-weigh them once type and spacing exist"* |

A rendered visual hierarchy now exists for four slices, so both can be examined against something
real. **Four slices are not a site**, and that limit is carried into both verdicts.

### 1.1 Method — stated so the results can be checked or disputed

Both tests were **measured in the browser**, not judged by eye alone.

- **F2** — every text node in each WIDE artboard was measured for rendered geometry, computed
  font size and computed weight. An emphasis proxy of `size² × rendered width × boldness` was
  computed, and the **heaviest element in each ~900px vertical band** was identified and
  classified as argument register or apparatus register. Validation chrome was excluded.
- **F3** — the same nodes were classified as **limit/gap material** or **capability/accountability
  material**, and totalled two ways: by **raw rendered area**, and by **area × type size ×
  boldness** (an emphasis-weighted measure).

**The proxy is a proxy.** It approximates optical weight with geometry and type size; it does not
model contrast, position, colour or reading behaviour, and it is not eye-tracking. It is offered
as a checkable structured measurement, not as evidence about a real reader.

---

## 2. F2 — FIRST FIXATION

### 2.1 Results, per band, per slice

| Slice | Band | Heaviest element | Register |
|---|---|---|---|
| **1 — hero** | first screen | **"Judge us on the enquiries, not the traffic."** at 76px | **argument** |
| **2 — evidence** | 1 | "We have no case studies to show you." at 38px | **argument** |
| **2 — evidence** | 2 | "Zero appearances, in twenty-eight unbranded runs." at 38px | **argument** |
| **2 — evidence** | 0 and 3 | a **register label** at 16px | **APPARATUS** |
| **4 — `/seo`** | 1 | "How long this takes, and what we will not promise" at 30px | **argument** |
| **4 — `/seo`** | 2 | **"After that, the report is enquiries."** at 38px | **argument** |
| **4 — `/seo`** | 3 | **"what cannot be attributed"** — a register label at 16px | **APPARATUS** |

### 2.2 Verdict

> ### **F2 — PASS ON DENSE SCREENS · FAIL ON SPARSE SCREENS.**
> ### **Not passed outright, and a narrow correction is required.**

**Where it passes, it passes decisively.** On every screen carrying a commercial statement, the
heaviest element is that statement by a very large margin — the H1 at 76px against a 20px next
element, the consequence statement at 38px against 18px body. There is no screen in the proof on
which a **date, sample, status mark, method note or provenance line** is the heaviest element.
That is the literal wording of the test, and on that wording the proof is clean.

**Where it fails, the cause is specific and reproducible.** In a band whose only structured
element is a **register label** — because the region is short, or because it is the tail of a
section — the label becomes the heaviest thing on screen by default. It is apparatus-register
type. **On the strict reading of F2, that is a failure.**

### 2.3 Why this matters more than it looks
The register label is Direction 2's **scan layer** and one of the four reasons it was selected.
This result says the scan layer has a cost: it introduces an apparatus-register element into
every region, including regions too sparse to give it competition.

### 2.4 The narrow correction proposed

**Not** removing register labels — that would remove the scan layer and re-open failure mode 6.

> **Proposed rule: a register label never appears without an argument-register element of
> greater weight in the same region.** A region too short to carry a heading does not get a
> label; it inherits the preceding region's.

This is checkable at review, costs nothing, and preserves the scan layer. **It is a Gate 10
input, not a change made in this session.**

### 2.5 What this test still cannot establish
Actual human first fixation. Position, contrast and colour all influence it and the proxy models
none of them. **No user testing occurred and none is claimed.** F2 should be re-run against real
readers before the visual system hardens.

---

## 3. F3 — PROPORTION / VISUAL WEIGHT

### 3.1 The measurement, on the hardest available material

Run on slice 4 — `/seo` moves 5–7 — which was **deliberately chosen as the limit-heaviest
connected material on the site**: an elevated boundary carrying the 12-month horizon, plus a
measurement limit, plus provenance.

| Measure | Capability / accountability | Limits / gaps |
|---|---|---|
| **Raw rendered area** | **37.5%** | **62.5%** |
| **Emphasis-weighted** (area × type size × boldness) | **51.9%** | **48.1%** |

Apparatus weight was **31.5%** of total argument-register weight — present throughout and clearly
not dominant, which is the "presence is evidential, emphasis is commercial" split behaving as
intended.

The evidence specimen sheet (slice 2) returned a **55.2%** raw-area limit share on the same
method.

### 3.2 Verdict

> ### **F3 — NOT PASSED. The margin is too thin to call, and it is thin on the material chosen
> to be hardest.**

Reading the two numbers together is the finding:

- **On emphasis, capability wins — by 3.8 points.** The consequence statement out-ranks the
  boundary heading, the limits are body type, and no limit is amplified. The typographic system
  is doing what `16` §4 A3 asks.
- **On area, limits win — by 25 points.** The boundary is three long paragraphs of approved copy,
  and **length is a form of weight even when emphasis is low.** A reader scrolling does not
  experience "type size × boldness"; they experience how much of the screen is qualification.

**The gap between the two measures is the proportion risk, quantified.** The design has bought
emphasis proportion successfully and has not bought area proportion at all.

### 3.3 Three reasons this is a "not passed" rather than a "failed"

1. **The rule is page-level; the measurement is section-level.** `17` §4.4 states the rule *"on
   any page"*. Slice 4 is moves 5–7 of a nine-move page, and **every excluded move (1, 2, 3, 4, 8,
   9) is capability-side material.** The page-level result is very likely better than 48/52 and
   **cannot be determined from this slice.**
2. **The material is approved copy and is not the design's to shorten.** The boundary's length is
   a Gate 9 decision. A design cannot pass a proportion test by compressing an approved limit,
   and it must not try.
3. **The one lever the design has was not used.** Slice 4 spends its ground change on the
   boundary set-piece — which `14` A23 explicitly sanctions, but which also gives the limits the
   only differentiated surface in the section. Spending the second permitted ground change on the
   capability side, or on the action region, is an untested option.

### 3.4 What must happen before F3 can be passed

1. **Re-run at page level**, on a complete `/seo` and a complete homepage, not on a section pair.
   This is the only measurement that answers the rule as written.
2. **Test the ground-change allocation.** Whether the boundary should hold the section's only
   differentiated surface is an open design question, not a settled one.
3. **Agree what "visual weight" means for this programme.** Raw area and emphasis-weighted area
   give opposite answers here. **Until the programme picks one, F3 is not decidable**, and a
   future session could pass or fail the same screens by choosing a measure. Proposing a
   definition is a Gate 10 action.

### 3.5 What F3 does confirm
The structural half that Gate 9B already passed still passes on rendered screens: no limit
precedes the capability it limits; no limits section is collapsible at any width; no limit is
set smaller, lighter or greyer than the claim it qualifies; and no limit appears below a CTA or
inside a disclosure.

---

## 4. Summary

| Test | Gate 9B | Session 14 result | Carried to Gate 10 |
|---|---|---|---|
| **F2 — first fixation** | NOT ASSESSABLE | **PASS on dense screens; FAIL on sparse screens.** Cause identified, narrow correction proposed | **Yes.** Apply the register-label rule, then re-test — including with real readers |
| **F3 — proportion** | NOT ASSESSABLE (structural half PASS) | **NOT PASSED.** Emphasis 51.9/48.1 to capability; raw area 37.5/62.5 to limits. Margin too thin to call, on section-level material | **Yes.** Re-run at page level, resolve the ground-change allocation, and **define "visual weight" for this programme** |

**Neither test was passed automatically, and neither result was adjusted to make the session's
conclusion tidier.** F3's outcome is the principal reason this session does not return
**A — VISUALLY VALIDATED**.
