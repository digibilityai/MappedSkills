# Claude Session Handoff

## Session
- **Session ID:** 17B — F1 "THE RUN" validation against THE RESOLVE
- **Date:** 2026-09-03 · **Model:** Claude Opus 5 · **Branch:** `test_branch`
- **HEAD at start and end:** `6f1179f` — **nothing was staged, committed or pushed**
- **Role:** bounded visual compatibility test. **Not** a homepage build, not a design system.

## Result

> ### **COMPATIBLE BUT DISTINCT** — F1 can live inside THE RESOLVE.

**Gate 10 remains NOT PASSED — IN PROGRESS.** No homepage is approved and none exists.

## The question, and the answer

THE RESOLVE's signature gesture is a **population changing state**. Session 15C already spends it
seven times. **If F1 repeated it, F1 would be the eighth instance and the gesture would become the
tic the motion budget exists to prevent.**

The answer taken:

> **The signature is about STATE — what a thing *is*. F1 is about STRUCTURE — how things
> *connect*. So F1 contains no state change at all.**

One continuous object, six points, read along. The separation is carried on **seven channels** —
object count, state change, geometry, silhouette, ground, direction and motion class — and **none
of them depends on animation**.

## Tests actually run, in a browser

Rendered and inspected at **1440×900**, **880×1000** and **390×844**, plus a static/no-script state
and a **literal blurred-copy** render.

- **Text size:** minimum rendered text anywhere, at any width, **13.1px**; every figure label
  **≥16.6px**. Solved by construction — each drawing is authored to a viewBox narrower than the
  smallest container in its band, so it can only ever scale **up**.
- **Contrast:** ink 16.8:1 · labels 6.38:1 · link 6.02:1 · chain 16.8:1 · accent point and ticks
  3.97:1 · not-measured dash 3.13:1 · client-data doubled line 6.38:1. **All text ≥4.5:1, all
  graphics ≥3:1.**
- **No horizontal overflow** at any width. **Node spacing equal** at every width (176×5, 68×5,
  80×5).
- **0** monospace, **0** images, **0** canvases, **0** fixed/sticky, **0** infinite animations,
  **0** `:hover` rules.
- **No-JavaScript path verified:** all paths complete, all revealed groups visible, legend
  visible, tabular equivalent in the DOM.
- **Reduced motion:** both halves exercised directly — the JS branch resolves immediately, the CSS
  block collapses durations to 0.001s with every element present.
- **Blurred-copy marketing test performed literally** (a real `blur(5px)` render, not an
  approximation).

### Not verified — stated, not implied
A **keyboard-driven `:focus-visible` ring** (synthesised `Tab` never entered the document; the
control is a native `<summary>`, is tabbable, and focuses and opens on a real click). **OS-level
`prefers-reduced-motion`.** Screen readers, real devices, other browsers, print, 200% text resize,
hardware profiling, and **any user testing**.

## Seven defects found by rendering, and fixed

1. **All three responsive drawings rendered at once** — a CSS specificity error made the section
   3335px tall with three stacked figures.
2. **The draw animation could never fire** — the observer watched a section too tall to reach its
   threshold. A silent failure.
3. **The unattached-arrival mark read as a bullet** for the boundary label.
4. **Intervention marks differed from the six points by size and colour only** — changed to a tick
   crossing the line. **A diamond was rejected** as a flowchart-decision shape.
5. **`--tang` failed the non-text contrast floor** — 2.81:1 on ivory, under 3:1. Moved to
   `--tang-ink` (3.97:1), THE RESOLVE's own darkened ramp.
6. **MEDIUM was the sparse-tablet failure the brief warned about** — orphaned annotations, a
   clipped mark, an overlapping label. Rebuilt.
7. **NARROW had unequal node spacing** — 124 units against 76. Rebuilt at a constant 80.

## The one thing reported rather than defended

**The motion is marginal.** The static state and the animated end state are **identical**, so the
draw adds no information — only emphasis on continuity. **It is the first thing to cut if the
homepage feels busy after the hero, and cutting it costs nothing.**

## Files created
```
docs/25-resolve-f1-validation/00_F1_DIRECTION.md
docs/25-resolve-f1-validation/01_COMPATIBILITY_AUDIT.md
docs/25-resolve-f1-validation/02_RESPONSIVE_ACCESSIBILITY.md
docs/25-resolve-f1-validation/03_SELF_CRITIQUE.md
docs/25-resolve-f1-validation/prototype/index.html
docs/00-project/handoffs/SESSION_17B_RESOLVE_F1_VALIDATION.md
```

## Files modified
- `docs/22-design-system/00_OVERVIEW.md` — **a superseded banner added at the top only.**
  **0 content lines removed**; the historical body is untouched. This closes the repository-safety
  defect carried from Session 17A.
- `docs/00-project/CURRENT_STATE.md` — a factual Session 17B annotation.

**Not modified:** `DECISION_LOG.md` · `QUALITY_GATES.md` · the Session 15C prototype · the Session
15D prototype · every other file in `docs/22-design-system/` · `docs/24-resolve-governance/` ·
any production file · `README.md`.

## Prototype

**Path:** `docs/25-resolve-f1-validation/prototype/index.html`

```bash
python3 -m http.server 8951 --directory docs/25-resolve-f1-validation/prototype
```

Then open `http://127.0.0.1:8951/index.html`. It also opens directly from the filesystem; the two
webfonts load from Google Fonts and fall back to system faces offline, with every structural and
measured claim unaffected.

## Remaining risks

1. **F1 has never been seen next to the actual hero.** The strongest limit on the verdict.
2. The section reads slightly airy as a bounded slice — a homepage composition question.
3. The legend is the densest text cluster and is where document drift would begin on a page
   carrying more apparatus.
4. The keyboard focus ring and OS reduced-motion remain unconfirmed.
5. No owner has seen it.

## Recommended next task

**Compose the complete homepage in THE RESOLVE**, with F1 in place, then re-run **F2**
(first fixation) and **F3** (visual weight) against it using
`docs/17-visual-validation/09_VISUAL_WEIGHT_RUBRIC.md` **unchanged**. That is step 3 of
`docs/24-resolve-governance/03_NEXT_VALIDATIONS.md`, and it is the render that will settle the two
open questions above.

## Stop condition

Stopped at the completion of the bounded F1 compatibility test. **The homepage was not built, the
Session 15C prototype was not modified, no production file was touched, and nothing was staged,
committed or pushed.**

---

# SESSION 17C — F1 MOTION REFINEMENT — appended 2026-09-03

## Session
- **Session ID:** 17C — F1 motion refinement, THE RESOLVE
- **Date:** 2026-09-03 · **Model:** Claude Opus 5 · **Branch:** `test_branch`
- **HEAD at start and end:** `6f1179f` — **nothing staged, committed or pushed**

## Owner feedback, binding
> **"F1 works but feels too static."**

**Interpretation applied:** the visual direction is **accepted**. The figure was **not
redesigned**, its structural concept is unchanged, and no alternative was created. **Motion only
was refined.**

## The diagnosis, and the change

In 17B the chain drew while the annotations faded in on **fixed delays unrelated to where the
drawing had reached**. Everything happened at roughly the same time and nothing appeared to be
*caused* by anything else. It read as "a figure appearing", not "a system being traversed".

> **The fix is causality, not more motion.** Every event is now keyed to the position of the
> drawing front, so things happen **as it arrives**.

**Three coordinated events, and no more:** PROGRESSION (the chain draws; each point registers as
the front reaches it) → INTERVENTION (each tick is *struck* as the front passes that join) →
BOUNDARY (the rule grows outward from the chain, then the client's own segment draws beyond it).

**Total 2140 ms**, inside the 1.8–3.0 s target, then stillness. Full timing table in
`01_COMPATIBILITY_AUDIT.md` §13.

## Budget — unchanged and within limits
**0 major Resolve moments · 1 sectional sequence · 3 internal events.** Verified in the rendered
page: **0 ambient regions, 0 loops, 0 `@keyframes`, 0 `requestAnimationFrame`, 0 pinned or
scroll-scrubbed sequences, 0 animation libraries, 0 canvas, 0 `position: fixed`/`sticky`.**
No travelling dot, orb, comet or particle: what moves is the drawing of the structure itself.

## Resolve-repetition test — PASS
The hero changes a **population's state** across a 2-D field with a ground inversion. F1 changes
**no state at all**: one path, drawn, on an unchanged ground. The staggered reveal is the one
place drift could occur, and the defence is that F1's stagger runs strictly **along a single line
tied to a drawing front** rather than across a field in waves. **F1 is not louder than the hero** —
no ground change, no inversion, no population, largest moving element a 2 px line.

## The defect this refinement introduced, found by rendering and fixed

> **`.draw` sets `stroke-dasharray` to animate `stroke-dashoffset`. Applied to the two `--gapc`
> lines it overwrote their 5-5 dash — the shape channel carrying "not measured" and
> "unattributed". Both rendered solid.**

Two honesty states were silently converted into ordinary strokes by a *motion* decision. **Fixed:
dashed elements fade and are never drawn**, with the constraint recorded in the stylesheet.
Verified after the fix: `stroke-dasharray` computes to `5px, 5px` at every width and both lines
render visibly dashed.

**The general lesson for the design system: an animation technique may not occupy a property that
carries meaning.**

## Trigger and replay
Fires **once**, at 40 % of the drawing inside a viewport inset 12 % at the bottom — a genuine
reading position, not one pixel, and reachable at every width (stage 235 px WIDE, 557 px MEDIUM,
575 px NARROW, each shorter than its inset root; measured ratio 0.96 at NARROW). The observer
**unobserves on first intersection**, so it cannot replay while scrolling; leaving and returning
finds the figure complete — verified.

## Verified in the browser
- **WIDE 1440×900, MEDIUM 850×1000, NARROW 390×844** — all settle correctly, all dashes intact.
- **No-JS**: complete final composition renders with `html.nojs` and the sequence class removed —
  verified visually, not from source.
- **Reduced motion**: the JS branch resolves immediately; the CSS media rule is present and
  collapses durations. Both halves exercised directly.
- **No accessibility regression.** Graphics: chain 16.8:1 · qualified point 3.97:1 · ticks
  3.97:1 · not-measured 3.13:1 · your-system 6.38:1 — all ≥3:1. Text: labels 6.38:1, boundary
  label 16.8:1 — all ≥4.5:1. Min SVG text **16.8px**, min HTML text **13.1px**. No horizontal
  overflow. 0 monospace, 0 images, 0 canvas, 0 fixed/sticky, 0 hover rules. Dash patterns intact.

## A tooling limitation, stated plainly
**The animation could not be sampled frame by frame.** The browser pane throttles
`requestAnimationFrame` and returns **stale `getComputedStyle` values** while hidden — several
readings during this session reported an un-started animation that screenshots then showed
complete. What *was* verified: the initial state, the settled state at all three widths, the
**order** of events across successive forced paints, and the **complete timing configuration**
read from computed `transition-delay`/`transition-duration`, which is state-independent.
**Real-time smoothness on real hardware is unverified.**

## Superseded position from 17B
17B reported the motion as **marginal**, because the static and animated end states were identical
and the draw added no information. That remains true of the *draw alone* — and is why the draw
alone was not enough. **What the sequence adds is causality: the order in which a system is
traversed and acted on, which is F1's actual argument and is absent from the static frame.** The
motion now earns its place rather than merely being permitted.

## Files modified in 17C
```
docs/25-resolve-f1-validation/prototype/index.html      (motion only; composition unchanged)
docs/25-resolve-f1-validation/01_COMPATIBILITY_AUDIT.md (§12–19 appended)
docs/25-resolve-f1-validation/03_SELF_CRITIQUE.md       (§6–10 appended)
docs/00-project/handoffs/SESSION_17B_RESOLVE_F1_VALIDATION.md (this section)
docs/00-project/CURRENT_STATE.md                        (factual annotation)
```
**Not modified:** `DECISION_LOG.md` · `QUALITY_GATES.md` · `docs/24-resolve-governance/` · the
Session 15C prototype · the Session 15D prototype · `docs/22-design-system/` · any production
file · `README.md`.

## Remaining risks — unchanged from 17B, plus one
1. **F1 has never been seen next to the actual hero.** Still the largest limit.
2. The staggered reveal is the one place Resolve-repetition drift could appear; the defence is a
   designer's reading, not a measurement.
3. Real-time playback smoothness unverified (tooling).
4. Keyboard focus ring and OS-level reduced motion still unconfirmed.
5. No owner has seen the refinement.

## Recommended next task
**Compose the complete homepage in THE RESOLVE with F1 in place**, then re-run **F2** and **F3**
using `docs/17-visual-validation/09_VISUAL_WEIGHT_RUBRIC.md` unchanged. That render settles the
hero-adjacency question and the staggered-reveal question together.


---

> ## ⚠ STATUS UPDATE — SUPERSEDED AS A VALIDATION RESULT, RETAINED AS EVIDENCE (2026-09-04)
>
> The F1 work recorded here was validated **in isolation**. The owner subsequently reviewed the
> isolated F1 experience and **rejected it** — *"still bland, no animation, no exciting, no journey
> happening"* — which is what caused Session 18 to build the complete homepage and judge F1 inside
> it instead.
>
> **This document is retained as historical validation evidence and as the reason the method
> changed. It is not the approved F1 treatment.** The approved treatment is F1 as encountered
> inside the homepage, in the Session 19B baseline.
>
> **Gate 10 PASSED 2026-09-04 (`DEC-019`).** Full closure record:
> `SESSION_20_GATE10_CLOSURE.md`.
