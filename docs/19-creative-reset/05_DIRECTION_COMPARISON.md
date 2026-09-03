# Direction Comparison — Session 15B — PROPOSED

**Date:** 2026-09-02 · **Branch:** `test_branch`
**Prototypes:** `prototype/a-signal.html` · `prototype/b-switch.html` · `prototype/c-trace.html`
**Everything below was rendered and inspected in a browser at 1440×900 and 390×844.**

---

## 1. Signature digital moments — 3 to 5 per direction

### Direction A — THE SIGNAL FIELD
1. **The field is already running when the page loads.** Demand is moving behind the H1 before the
   reader does anything.
2. **The gate you can close.** Three real buttons. Close one and the recorded count stops rising
   while the absorbed marks fall out of the channel. *"More visits on a path that does not work
   produce nothing"* stops being a sentence.
3. **The ledger that accumulates.** Survivors dock on the right and stack, each with a source tag —
   and roughly one in six docks as an open square with a dashed, untagged line and **never gets a
   source.**
4. **Five promises struck through, one at a time.** The four-paragraph accountability boundary
   becomes five refusals and one commitment.
5. **Evidence that arrives because you pushed.** *"Probe this claim"* and the provenance rows dock
   in sequence beneath it.

### Direction B — THE SWITCH
1. **The hero demonstrates itself, once.** 1.5s after load the whole surface inverts to the traffic
   view and back, with one tangerine bar sweeping across it. The reader learns the mechanic without
   being told.
2. **A control the reader can hold.** `Traffic / Enquiries`. The same subject, twice, and the
   difference is the argument.
3. **Three acts that arrive wrong and correct themselves.** *"More visits." → "Demand you can
   actually reach."* Each with a signal column and a progress spine filling 33 → 66 → 100%.
4. **Three readings become one.** The approved recognition copy: three cards recede and *"That
   reads like three problems. It behaves like one."* lands at display size.
5. **Lifting the claim off its evidence.** The claim block physically rises and the provenance is
   revealed underneath it.

### Direction C — THE TRACE
1. **The first line of the record is about you, and it is a limitation.** *"arrived — with no
   usable trail"*, drawn with a dashed rule, within a second of arrival.
2. **The trace draws itself as you read**, with a yellow pip dropped at the exact scroll position
   of every recorded event.
3. **A cell that rewrites itself.** *"Where you came from"* moves from **recorded** to
   **not measured** depending on whether a referrer exists.
4. **The replay.** *"Here is the record of your visit"* — the approved enquiry chain generated from
   the actual session, with the unattributed source, the unsent enquiry and the client-system
   stretch all drawn dashed, and the chain visibly stopping at the qualified enquiry.
5. **The disclosure that makes it acceptable.** *"None of it is sent anywhere… the only network
   request this page makes is for its two webfonts."*

---

## 2. CAPTURE → CONVERT → MEASURE — treatment comparison

**None of the three renders it as cards, columns, icons, circles, a funnel, or boxes joined by
arrows.**

| | **A — Signal Field** | **B — The Switch** | **C — The Trace** |
|---|---|---|---|
| **Form** | One continuous field the reader scrolls *through* | Three full-height acts, each an inversion, on one progress spine | Three zones of one continuous trace, plus a live replay |
| **Mechanism** | Phase lighting + operable gates | State change from wrong subject to right subject | Recorded / not-measured, applied to the reader |
| **Capture** | The demand stream at full brightness, mostly unmeasured | *"More visits"* → demand you can reach | What the page could and could not see about your arrival |
| **Convert** | Three gates absorbing marks | *"A prettier page"* → an enquiry that completes | The observable moments of your own reading |
| **Measure** | Arrivals docking with source tags; some untagged | *"A monthly report"* → each enquiry records its source | Your visit replayed as the approved enquiry chain |
| **Quantity drawn?** | **None.** Counts are labelled *"marks in this diagram, not clients"* | **None.** Labelled *"Illustrative. No quantity, rate or client figure is drawn or claimed"* | **None.** Every value is a real property of the current session |
| **Taper possible?** | **No** — constant-height channel by construction | **No** — no chain geometry exists | **No** — a vertical list, not a shape |

---

## 3. Motion-system comparison

| | **A** | **B** | **C** |
|---|---|---|---|
| **Character** | Continuous, ambient, reactive | Few, large, decisive | Quiet, continuous, reader-driven |
| **Primary technique** | Canvas particle field (transform-free, 2D fill) | CSS token cross-fade + one keyframed sweep | SVG `stroke-dashoffset` tied to scroll |
| **Easing / duration** | `cubic-bezier(.16,.9,.24,1)`, 500–900ms | `cubic-bezier(.65,0,.35,1)`, one 620ms duration everywhere | `cubic-bezier(.22,.8,.28,1)`, 450–1100ms |
| **Scroll-linked** | Phase lighting at 3 thresholds | Section handoff on view (`IntersectionObserver`) | The trace length, continuously |
| **User-triggered** | 3 gate toggles + evidence probe | The `Traffic / Enquiries` toggle + evidence lift | Evidence node; everything else is ordinary behaviour |
| **What motion means** | Loss, throughput, accumulation | A change of subject | Time passing and behaviour being recorded |
| **Scroll hijack?** | **No** | **No** | **No** |
| **Runs on a hidden tab?** | No — `requestAnimationFrame` idles, correctly | No — CSS transitions idle | No — nothing to draw |

---

## 4. Evidence-treatment comparison

**All three carry the identical approved evidence content**: the claim, the sample sentence, the
five provenance lines, the limitation, and both status marks (`measured` filled square,
`not testable` hatched square, each with its word).

| | **A** | **B** | **C** |
|---|---|---|---|
| **Metaphor** | Evidence **arrives** when you probe a claim | Evidence is **underneath** the claim; you lift it | Evidence is **a node on the trace** you are already following |
| **Trigger** | `probe this claim` button | `Lift this claim — see what it stands on` | `open this node on the trace` (native `<details>`) |
| **Reveal** | Rows dock in sequence, 60ms apart | The claim block rises; the substrate opens | Rows expand in place on the line |
| **Register** | Monospace apparatus on a dark card-less panel | Monospace-free; apparatus is weight + colour on near-black | Monospace apparatus in the reading column |
| **Limitation** | Same size as the provenance, never dimmed | Same size, accented so it is not skipped | Same size, highlighted |
| **Colour used to grade?** | **No** | **No** | **No** |

---

## 5. Mobile comparison — all inspected at 390×844

| | **A** | **B** | **C** |
|---|---|---|---|
| **Not a stack** | The field band is measured from a real layout element, so it re-proportions: copy above, band in the middle, controls below | The acts stop being full-height, so three inversions do not become three empty screens; the signal column moves under the text | **The record leaves the column and becomes a fixed live strip along the bottom of the screen** |
| **Diagram** | Same field, fewer particles' worth of width; ledger still docks at the right edge | Signal rows keep their marks and tags, full width | Replay chain is full width and unchanged |
| **Motion** | Hero field drops to 38% opacity so the H1 stays clean | The switch is *more* effective — the whole small surface changes | Trace narrows to a 22px gutter; pips still land |
| **Navigation** | Inline nav hidden; header CTA persists | Same | Same |
| **Evidence** | Panel becomes full width; rows wrap | Substrate reveal unchanged | Node unchanged |
| **Horizontal overflow** | **none** | **none** | **none** |

---

## 6. Accessibility and performance

### 6.1 Measured this session, in the browser, on all three

| Check | A | B | C |
|---|---|---|---|
| Text below the 4.5:1 / 3:1 (large) threshold | **0 elements** | **0 elements** | **0 elements** |
| Rendered text below 12px | **0** | **0** | **0** |
| Horizontal body overflow at 1440 and 390 | **none** | **none** | **none** |
| `<img>` / stock photography | **0** | **0** | **0** |
| Fixed/sticky sales CTA | **none** | **none** | **none** |
| Network requests beyond the document and two webfonts | — | — | **0, verified** |

Token contrasts, A: ink 17.65:1 · apparatus 9.54:1 · tertiary 6.46:1 · signal 13.21:1 · action
6.83:1. `--lost` (2.49:1) is **canvas stroke only and never text** — the same rule the Session 15
foundation applies to its recessive figure stroke.

B's accent was **darkened to `#D94400` for display text on the light ground** after measurement, so
large type clears 3:1; the bright `#FF5B04` is kept for fills and for text on the dark ground.

### 6.2 Implemented and code-reviewed, **not exercised**

- **`prefers-reduced-motion`** — every prototype declares it, and none of them merely freezes: A
  composes a single static frame of the whole field; B applies the state change instantly with no
  sweep and shows every signal row; C draws the highlighter and the chain complete. **The OS-level
  preference was not toggled in this session, so this is reviewed, not tested.**
- **Keyboard** — all controls are real `<button>`, `<a>` or `<summary>` elements with visible focus
  rings. **Tab order was not walked end to end.**
- **No screen-reader pass was run** on any direction.

### 6.3 Performance — stated honestly

| | **A** | **B** | **C** |
|---|---|---|---|
| **Cost** | **The highest of the three.** Two canvases, ~410 particles total, every frame | **The lowest.** CSS token transitions plus one static dot canvas drawn once | Low. One SVG attribute updated on scroll; DOM nodes appended on events |
| **Main risk** | A mid-range Android at 60fps with 300 particles is real work; the field must be capped, paused off-screen, and reduced on small viewports | None material | Unbounded DOM growth if events were ever recorded without a cap |
| **Stated cost if chosen** | Needs a particle budget, an `IntersectionObserver` pause, and a low-power fallback **before** production | Ships essentially as-is | Needs an event cap and self-hosted fonts |
| **Heavy media** | none | none | none |

**No direction requires a video background, a 3D engine, or a large JavaScript framework.** Total
script in each file is inline and small: A ~180 lines, B ~70 lines, C ~120 lines.
