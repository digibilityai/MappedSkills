# F1 in THE RESOLVE — Self-Critique

**Session:** 17B · **Date:** 2026-09-03 · **Branch:** `test_branch`

> A validation that reports no defects has usually not been looked at. **Five were found by
> rendering this page and are recorded below with their fixes**, followed by the risks that were
> *not* fixed.

---

## 1. Defects found by inspection, and fixed

| # | Defect | Why it mattered | Fix |
|---|---|---|---|
| **1** | **All three responsive drawings rendered at once.** `.f1 svg{display:block}` (specificity 0,1,1) out-ranked `.d-wide{display:none}` (0,1,0), so the section rendered **3335px tall** with three stacked figures | The whole responsive strategy was silently inoperative, and the page was six times its intended height | Removed `display` from the element-level rule so the band rules govern. Section is now 526px |
| **2** | **The draw animation could never fire.** The `IntersectionObserver` watched the whole section at `threshold: 0.35`; a section taller than ~2.9× the viewport can never reach that ratio | A silent, easily-missed failure: the figure would simply never appear animated, with no error | Observe the drawing itself, at a threshold it can reach |
| **3** | **The unattached-arrival mark read as a bullet for the boundary label.** At WIDE the open square sat ~12px left of the label's first character | Two unrelated meanings fused into one visual unit | Boundary label centred on the rule it names — which is also where it belongs semantically |
| **4** | **Intervention marks were distinguished from the six points by size and colour only.** Both were tangerine squares | A colour-borne distinction, and it invited reading the marks as extra stages | Changed to a **tick crossing the line** — a mark *on* the chain, not a point *in* it. **A diamond was rejected**: in a diagram it reads as a flowchart decision (SaaS drift) |
| **5** | **Tangerine failed the non-text contrast floor.** `--tang` (`#FF5B04`) on ivory measures **2.81:1**, under the 3:1 requirement for a meaningful graphical object | A real WCAG 1.4.11 failure on the figure's accent point and its intervention ticks | Moved to `--tang-ink` (`#D94400`, **3.97:1**) — THE RESOLVE's own darkened ramp, not an invented colour |

**Two further defects were found and fixed during the MEDIUM and NARROW rebuilds:**

| # | Defect | Fix |
|---|---|---|
| **6** | **MEDIUM was the sparse-tablet failure the brief warned about.** Annotations sat in a far second column, orphaned from the marks they named, with a void between; the unattributed mark was clipped at the container edge; the boundary label overlapped the chain | Rebuilt: annotations sit directly beneath the point they belong to, and the tablet's width is spent on the boundary rule running the full measure |
| **7** | **NARROW had unequal node spacing** — a final gap of 124 units against 76 elsewhere | Rebuilt at a **constant 80-unit gap** with the boundary at the midpoint of the last one. Unequal intervals in a figure are a quantity-implication risk |

---

## 2. The honest weaknesses

### 2.1 The motion is the marginal call, and it is not defended
**The static state and the animated end state are identical** — the draw adds no information. It
adds emphasis on continuity, which is genuinely F1's argument, but the brief is explicit that F1
may be largely static and that motion which does not improve comprehension should be removed.

> **Recommendation: treat the draw as provisional.** It is the first thing to cut if the homepage
> feels busy after the hero. Cutting it costs no information and requires no redesign.

### 2.2 F1 has never been seen next to the actual hero
This is the **largest** limit on the compatibility claim. The finding that F1 does not compete
rests on **channel separation measured in isolation** — object count, silhouette, ground,
geometry, motion class, tangerine budget — not on a rendered page where the hero's resolve and the
figure are both present. That comparison belongs to the homepage session and it could still
surprise.

### 2.3 The section reads slightly airy
On a bounded slice, with nothing above or below, there is a lot of ivory to the right of the
headline and the figure sits thin and low. On the real homepage the adjacent blocks fill that.
**Recorded as a composition question for the homepage session, not as a defect in the figure** —
but if the airiness persists when neighbours exist, the figure's vertical presence is the thing to
revisit.

### 2.4 The legend is a real cost
Four legend items plus a standing illustrative note is **five lines of supporting text** under the
figure. Consolidating them into one row was the right call and it is still the densest text
cluster in the section. If a future page carries F1 alongside other apparatus, the legend is where
document drift would begin.

### 2.5 Two things could not be positively confirmed
A **keyboard-driven focus ring** (synthesised `Tab` never entered the document) and an
**OS-level reduced-motion** run. Both were tested by the closest available means and both are
recorded as unconfirmed rather than passed.

### 2.6 No user has seen this
No user testing has ever been performed in this programme, and none was performed here. Every
perceptual verdict is one designer's structured reading against stated rules.

---

## 3. Standing tests

| Test | Result |
|---|---|
| **Static quality** — with motion off, is it a deliberate premium figure? | **PASS.** The static state is complete and is the primary state. Verified with script disabled |
| **Digital quality** — does motion improve understanding? | **MARGINAL, and reported as such.** See §2.1 |
| **Document drift** | **PASS.** Zero decorative rules, zero monospace, no metadata register, no caption geometry, annotations consolidated into one object, minimum text 13.1px |
| **Tech / SaaS drift** | **PASS.** No boxes, arrows, axes, gauges, panels, numbered steps, chevrons or flowchart shapes. Taper is structurally impossible |
| **Marketing-company (blurred copy)** | **PASS — literally performed**, not approximated. Reads as a confident asymmetric commercial composition |
| **Quantity safety** | **PASS.** No number in the figure; identical points; equal gaps at every width; standing illustrative note |
| **Approved F1 meaning preserved** | **PASS** on all fifteen checked items (`01_COMPATIBILITY_AUDIT.md` §8) |

---

## 4. What would change the verdict

1. **The homepage render.** If F1 next to the hero reads as a second diagram-shaped event rather
   than a quiet explanation, the draw comes out first and the figure's scale is revisited second.
2. **A keyboard/screen-reader pass on real hardware.** The disclosure and the figure's text
   equivalent are the two things most likely to surface a finding.
3. **Owner review.** The owner has not seen this.

## 5. What this session did not do

No homepage. No design system. No change to the Session 15C prototype. No change to F1's approved
meaning, taxonomy or route assignment. **`F17` remains BLOCKED and was not sketched.** Nothing was
staged, committed or pushed.

---

# Session 17C — Motion Refinement Self-Critique

**Date:** 2026-09-03 · **Owner:** *"F1 works but feels too static."*

## 6. What was and was not changed

**Not changed:** the figure's structural concept, geometry, node positions, spacing, labels,
legend, colours, copy, or its role as STRUCTURE rather than STATE. **No alternative was created
and nothing was redesigned.** Only the animation was rebuilt.

**Changed:** every event is now keyed to the position of the drawing front, and two events were
added that did not exist — the tick being **struck** as the front passes a join, and the boundary
**growing outward** from the chain.

## 7. The defect this refinement introduced — and the general lesson

> **`.draw` sets `stroke-dasharray` in order to animate `stroke-dashoffset`. Applied to the two
> `--gapc` lines, it overwrote their 5-5 dash — the shape channel that carries "not measured" and
> "unattributed". Both rendered solid.**

Two honesty states were silently converted into ordinary strokes by a *motion* decision. Nothing
in the source looked wrong; only the render showed it.

**Fixed:** dashed elements fade and are never drawn, with the constraint recorded in the
stylesheet. Verified after the fix at every width.

**The general lesson, worth carrying to the design system:** *an animation technique may not
occupy a property that carries meaning.* `stroke-dasharray` is a semantic channel on this site.
Any future motion that writes to a semantic property is a defect regardless of how it looks.

## 8. Where this refinement is weakest

### 8.1 "Alive enough" is the owner's call, not a measurable property
The section now fires ten discrete events across 2.14 s, each caused by the one before, where
17B faded things in on unrelated timers. That is a real, describable change. **Whether it clears
the bar the owner set is theirs to judge, and they have not seen it.**

### 8.2 The staggered reveal is the one place drift could occur
The hero also staggers. The defence is that the hero's stagger runs **across a two-dimensional
field of marks resolving in waves**, while F1's runs **strictly along one line, tied to a drawing
front** — a route being followed, not a population changing. **That is a designer's reading, not
a measurement**, and it is the first thing to check when F1 finally sits on the homepage beside
the hero.

### 8.3 The sequence could not be observed frame by frame
**Stated plainly, because it limits what is claimed.** The browser pane throttles
`requestAnimationFrame` and returns stale `getComputedStyle` values while hidden, so the animation
could not be sampled live. What *was* verified: the **initial state** (everything hidden), the
**settled state** (screenshotted at all three widths), the **order of events** (observed across
successive forced paints), and the **complete timing configuration** read from computed
`transition-delay` and `transition-duration`, which is state-independent and determines the
sequence exactly. **Real-time smoothness on real hardware is unverified.**

### 8.4 Two 17B limits are unchanged
A keyboard-driven focus ring and an OS-level `prefers-reduced-motion` run still could not be
positively confirmed. Both paths were exercised by the closest available means.

### 8.5 F1 still has never been seen next to the hero
Unchanged from 17B, and still the largest limit on the whole compatibility claim.

## 9. Motion-quality test, applied honestly

Every animated element was asked *"what does this motion mean?"* and each has an answer
(`01_COMPATIBILITY_AUDIT.md` §14). **Nothing decorative survived.** There is no shimmer, pulse,
ambient drift, travelling dot, orb, comet, particle or glow anywhere.

**The 17B position is now superseded on one point.** In 17B the motion was reported as *marginal*
because the static and animated end states were identical and the draw added no information. That
remains true of the *draw alone*, and it is why the draw alone was not enough. **What the
sequence adds is causality — the order in which a system is traversed and acted on — which is
F1's actual argument and is not present in the static frame.** That is a stronger justification
than 17B had, and it is why the motion now earns its place rather than merely being permitted.

## 10. What would still change the verdict

1. **The homepage render**, beside the hero.
2. **Owner review** of the refinement.
3. **Real-hardware playback**, since smoothness was not observable here.
