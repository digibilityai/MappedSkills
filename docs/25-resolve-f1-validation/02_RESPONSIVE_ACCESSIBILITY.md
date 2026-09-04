# F1 in THE RESOLVE — Responsive, Accessibility and Performance

**Session:** 17B · **Date:** 2026-09-03 · **Branch:** `test_branch`
**All figures below were measured in a rendered browser.** Anything not tested is listed in §7 and
is not claimed.

---

## 1. Three compositions, not one drawing scaled

**F1 is drawn three times.** Exactly one is in the DOM's render tree at a time; the other two are
`display:none` and are out of the accessibility tree.

| Band | Applies | Composition |
|---|---|---|
| **WIDE** | ≥ 1100px | **Horizontal.** One line left to right, labels beneath, boundary rule crossing it vertically |
| **MEDIUM** | 700–1099px | **Vertical, two-register.** Chain at the left, labels beside each point, each annotation directly beneath the point it belongs to, and the boundary rule running the **full measure** — which is what makes it a composition *for* the width |
| **NARROW** | < 700px | **Vertical, one column.** Same relationships, annotations inline, nothing dropped |

## 2. The SVG label-scaling lesson, solved by construction

The previous (invalid, Arrival-based) F1 attempt found SVG labels scaling to **10.88px** at MEDIUM
— under the accessibility floor. **Its fix is not reused**; the generic lesson is.

> **Each drawing is authored to a viewBox NARROWER than the smallest container in its own band, so
> it can only ever scale UP.** Scaling up raises label size; it can never lower it.

| Band | viewBox width | Container at band minimum | Scale | Rendered label size |
|---|---|---|---|---|
| WIDE | 1000 | ~1025 at 1100px viewport | **≥ 1.0** | measured **16.8–17.9px** at 1440 |
| MEDIUM | 640 | ~652 at 700px viewport | **≥ 1.0** | measured **18.9–20.1px** at 880 |
| NARROW | 320 | ~324 at 360px viewport | **≥ 1.0** | measured **16.6–17.7px** at 390 |

**Minimum rendered text anywhere on the page, at any tested width: 13.1px.** No text falls under
12px at any width tested.

## 3. Measured at each width

| Check | 1440×900 | 880×1000 | 390×844 |
|---|---|---|---|
| Drawing shown | `d-wide` | `d-med` | `d-narrow` |
| SVG scale | 1.12 | 1.258 | 1.106 |
| Smallest SVG label | 16.8px | 18.9px | 16.6px |
| Smallest text on page | 13.1px | 13.1px | 13.1px |
| Any text < 12px | **No** | **No** | **No** |
| Horizontal page overflow | **No** | **No** | **No** |
| SVG wider than its container | **No** | **No** | **No** |
| Node spacing equal | 176 × 5 | 68 × 5 | 80 × 5 |

**A real defect was found and fixed at NARROW:** the first draft left the final node gap at **124
units against 76 elsewhere**. Unequal intervals in a figure are a quantity-implication risk
(`15_ANTI_PATTERNS` Q2 class), so NARROW was rebuilt at a constant 80-unit gap with the boundary
at the midpoint of the last one.

## 4. Reduced motion — meaning fully retained

**Stated precisely: the OS-level `prefers-reduced-motion` setting could not be changed through
this session's tooling.** Both halves of the path were therefore exercised directly, and that is
what is claimed — no more.

| Half | How it was tested | Result |
|---|---|---|
| **The JS branch** | The script's own condition re-run with `reduce` forced true | Adds the resolved class **immediately**; no observer, no waiting |
| **The CSS block** | The `@media (prefers-reduced-motion: reduce)` declarations applied directly and measured | `transition-duration` **0.001s**, `transition-delay` **0s**; all draws complete; all revealed groups at opacity 1; boundary label present; all six points present |
| **Rule presence** | Stylesheet inspected | The `prefers-reduced-motion` media rule exists |

**Nothing waits, nothing disappears, no meaning is gated behind animation.**

## 5. No JavaScript — verified

With `<html class="nojs">` restored (exactly what a script-blocked browser renders):

- every chain path complete (`stroke-dashoffset: 0px`), verified across all paths;
- every revealed group at `opacity: 1`;
- the legend visible;
- the tabular text equivalent present in the DOM.

**Motion is an amplifier here, never the carrier.**

## 6. Accessibility

| Requirement | Result |
|---|---|
| **Text contrast** | ink on ivory **16.8:1**; `--dim` labels and legend **6.38:1**; link `--tang-sm` **6.02:1**. All ≥ 4.5:1 |
| **Non-text contrast (≥3:1)** | chain **16.8:1** · qualified-enquiry point **3.97:1** · intervention ticks **3.97:1** · not-measured dash **3.13:1** · your-system doubled line **6.38:1**. **All pass** |
| **A real fix this produced** | `--tang` (`#FF5B04`) measured **2.81:1** on ivory — **below the 3:1 floor**. Figure marks moved to `--tang-ink` (`#D94400`, **3.97:1**) |
| **No colour-only meaning** | Every state carries a **shape** channel: dashed = not measured, open square = unattributed, doubled line = client's system, tick-across-line = work. Verified they remain distinguishable without hue |
| **No hover-only meaning** | **Zero `:hover` rules in the stylesheet** |
| **Figure text equivalent** | `role="img"` + `<title>` + substantive `<desc>` on each drawing, **plus** a seven-row table in a native `<details>` — in the DOM, keyboard-reachable, forced open in print |
| **Semantic controls** | Native `<details>`/`<summary>`; the summary is tabbable and, when activated, opens the disclosure and holds focus (verified by real click) |
| **Target size** | Disclosure control measured **44px** tall |
| **Skip link** | Present, first in the DOM |
| **Landmarks / lang** | `<main>` present; `lang="en-IN"` set |
| **No images / icon fonts** | 0 `<img>`, 0 icon fonts, 0 `<canvas>` |
| **No monospace** | 0 elements |

### 5.1 One thing that could NOT be positively confirmed
**A keyboard-driven `:focus-visible` ring.** Synthesised `Tab` did not move focus into the
document through this session's automation — focus stayed on `BODY`. What *was* confirmed: the
control is a **native `<summary>`**, it is tabbable, a real click focuses it and opens the
disclosure, and the `:focus-visible{outline:3px solid var(--ink);outline-offset:3px}` rule is
present and inherited unchanged from the 15C prototype. Programmatic `.focus()` correctly does
**not** match `:focus-visible`, so a "none" reading from it is an artefact, not evidence of a
missing ring. **This remains unverified and must be checked on real hardware.**

### 5.2 A measurement artefact worth recording
`getBoundingClientRect()` and `offsetParent` report a **non-zero box for content inside a closed
`<details>`**, because Chrome preserves the size of `content-visibility`-skipped content. The
table is genuinely hidden when closed — confirmed visually in every screenshot. **Do not use
those two APIs to test disclosure visibility.**

## 7. Not tested — stated, not implied

Screen readers · real devices · any browser other than the one used here · print output ·
200% text resize · OS-level `prefers-reduced-motion` · hardware performance profiling ·
**any user testing**. No claim anywhere in these documents depends on them.

## 8. Performance

| | |
|---|---|
| **Technique** | Inline SVG + CSS transitions. **No canvas, no WebGL, no video, no animation framework, no library** |
| **DOM cost** | One drawing rendered at a time; the figure is ~30 SVG nodes |
| **Animated properties** | `stroke-dashoffset` and `opacity` only |
| **Per-frame JavaScript** | **None.** One `IntersectionObserver` that fires **once** and then `unobserve`s |
| **Total script** | ~15 lines, inline, no dependencies |
| **Loops** | **Zero.** 0 `infinite` animations, 0 ambient motion, 0 `position: fixed`/`sticky` |
| **Still outstanding** | Hardware profiling before implementation — a standing programme requirement, not specific to this figure |

**A defect worth recording:** the observer originally watched the whole section at
`threshold: 0.35`. A section taller than ~2.9× the viewport can never reach that ratio, so the
draw silently never fired. It now observes the drawing itself. **A threshold that a tall section
cannot reach is a real and easily-missed failure mode.**
