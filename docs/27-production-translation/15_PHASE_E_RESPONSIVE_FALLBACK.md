# Session 27 — Phase E — Responsive + Fallback Hardening

**Session:** 27 · **Date:** 2026-09-05 · **Model:** Claude Opus 5 · **Effort:** High
**Branch:** `test_branch` · **Starting HEAD:** `2db0c56a3893570fd0b8fe0b2189888b789c1612`
(the single Session 26 Phase D commit) · **Nothing pushed.**
`README.md` untouched and unstaged throughout.

**Purpose.** Harden the approved homepage against environments that behave differently from the
ideal validation path. **No redesign. No new creative behaviour. No new animation. No copy change.**
Phase C remains the static baseline; Phase D remains the motion baseline.

**The question this phase asks:** *does the approved experience stay coherent when the environment
misbehaves?* Everything below is defensive.

---

## 1. Files changed

| File | Action | Purpose |
|---|---|---|
| `hooks/use-resolve-motion.ts` | modified | The view registry and the preference listener can no longer throw out of a caller's effect |
| `components/homepage/HomepageMotion.tsx` | modified | Arming is decided once, never re-armed, never applied to anything already on screen; a last-resort catch composes the page |
| `components/homepage/SystemStages.tsx` | modified | Same three guards for the chain and the stage panels |
| `components/homepage/PopulationToggle.tsx` | modified | Last-resort catch; releases the pre-paint attribute once React owns the state; aims the marks lazily if the T1 never ran |
| `components/homepage/HeroSurface.tsx` | modified | The scroll frame callback cannot throw, and guards a missing `requestAnimationFrame` |
| `components/homepage/HomepageAccountability.tsx` | modified | One class (`rsv-ink-card`) so the evidence card's type can be made printable |
| `app/resolve-motion.css` | modified | P1 lockstep text transition · a forced-colours rule for the control's pressed state · a print block |

**Not touched:** `app/globals.css`, `app/page.tsx`, `components/layout/Header.tsx`,
`components/layout/Footer.tsx`, `components/ui/*`, every other route, forms, analytics,
`robots.ts`, `sitemap.ts`, `next.config.mjs`, any prototype, any governance document, `README.md`.

**No copy changed. No layout value changed. No approved timing, easing, threshold or gesture
changed.** The seven diffs are guards, one class name, and three media blocks.

---

## 2. Method

Rendered in real Chrome over the Chrome DevTools Protocol at **real time**, so every measurement is
a genuine paint or a genuine computed style at a chosen moment. Viewport, device pixel ratio,
`prefers-reduced-motion`, `forced-colors`, print media, touch emulation and script execution were
all emulated at the protocol level; live resizing was done by changing device metrics **without
navigating**, so the page under test is the same instance throughout.

Contrast figures are sampled per animation frame from `getComputedStyle` on the rendered page and
converted with the WCAG relative-luminance formula — not computed from the stylesheet.

---

## 3. Responsive width matrix

Each width was loaded, sampled at first paint, scrolled to the bottom and back, then sampled again;
then the whole run was repeated with `prefers-reduced-motion: reduce`.

| Viewport | Initial | Motion complete | Reduced motion | Overflow | Result |
|---|---|---|---|:--:|---|
| 360 | resolved (on-view path) · 189 marks | hero resolved · 0 hidden · 0 armed · stage 3 | resolved · 0 hidden · chain opacity 1 | **0px** | PASS |
| 390 | resolved (on-view path) · 189 marks | hero resolved · 0 hidden · 0 armed · stage 3 | resolved · 0 hidden · chain opacity 1 | **0px** | PASS |
| 430 | resolved (on-view path) · 189 marks | hero resolved · 0 hidden · 0 armed · stage 3 | resolved · 0 hidden · chain opacity 1 | **0px** | PASS |
| **760** | resolved · **189 marks / 21 cols** · figure height auto | 0 hidden · 0 armed · stage 3 | resolved · 0 hidden | **0px** | PASS |
| **761** | resolved · **440 marks / 30 cols** · figure 224px | 0 hidden · 0 armed · stage 3 | resolved · 0 hidden | **0px** | PASS |
| 860 | resolved (on-view, <900) · 440 marks | 0 hidden · 0 armed · stage 3 | resolved · 0 hidden | **0px** | PASS |
| **1080** | **dark stage** (timer path) · 440 marks | resolved · 0 hidden · 0 armed · stage 3 | resolved · 0 hidden | **0px** | PASS |
| **1081** | **dark stage** · identical to 1080 | resolved · 0 hidden · 0 armed · stage 3 | resolved · 0 hidden | **0px** | PASS |
| 1425 | **dark stage** · 440 marks / 30 cols | resolved · 0 hidden · 0 armed · stage 3 | resolved · 0 hidden | **0px** | PASS |

**760 / 761 is the real boundary** and behaves exactly as the approved composition requires.
**1080 / 1081 is identical in every measured respect**, which is correct — no Phase D or Phase E
behaviour is keyed to it.

### Defensive edge widths

Every one loaded, scrolled end to end, and measured for overflow, clipping and figure containment:

| 320 | 375 | 414 | 600 | 900 | 1024 | 1280 | 1536 |
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px |

**320px renders gracefully with no overflow and no clipping**, and required no compromise to the
approved 360px composition. The support floor is unchanged at 360.

---

## 4. Live boundary resizing

Device metrics were changed on a live page — no reload — and re-measured after the debounced re-aim.

| Transition | Before motion | During motion | After motion | Result |
|---|---|---|---|---|
| **760 → 761** | 189→440 marks, 21→30 cols, figure 118→224px, rows `relative`→`absolute` | state preserved (`enquiries`), one chain SVG, 0 overflow | aim drift **0px** | PASS |
| **761 → 760** | 440→189 marks, cols and figure height revert | state preserved | aim drift **0–1px** | PASS |
| **1080 ↔ 1081** | no change in marks, cols, figure height or chain drawing | no change | aim drift **0px** | PASS |

| Large jump | Result |
|---|---|
| 390 → 860 | marks 189→440, chain 330×500 → 640×458, exactly one SVG shown, tab selection preserved, 0 overflow · PASS |
| 860 → 1425 | 440 marks throughout, aim drift 0px, 0 overflow · PASS |
| 1425 → 390 | marks 440→189, chain reverts, hero state preserved, 0 overflow · PASS |

**No stale media state, no duplicate observers, no duplicate DOM, no frozen animation state, no
control disappeared, no wrong tab state, no clipped figure and no overflow was found at any
transition, at any phase.**

**The hero departure's scroll-linked values were checked for staleness after resizing without
scrolling:** worst measured drift **0.2px of translation and 0.003 of opacity**, and 0 in the
clamped cases. **Classified FALSE POSITIVE — no extra listener was added**, which also preserves the
"one scroll handler" rule.

---

## 5. Orientation

390×844 → 844×390 → 390×844, with mobile emulation and touch enabled, mid-page at the chain:

- marks recomposed 189 → 440 → 189;
- the chain switched 330×500 → 640×458 → 330×500 with **exactly one SVG displayed** at each step;
- the reader's stage selection survived both rotations;
- **0 hidden, 0 armed, 0 overflow, no motion replay, no stale hero state** at every step.

**PASS.**

---

## 6. Hydration

| Case | Result |
|---|---|
| Normal | Hero plays the approved sequence; everything settles; **no console errors or warnings** |
| No JavaScript | The Phase C page, at all seven required widths — see §11 |
| Delayed | The pre-paint script holds the dark stage for its 4s budget; if hydration lands inside it, the T1 plays; if not, the attribute is released and the page stays resolved — a slow device is not made to perform |
| Failed (root torn down) | See §7. With the Phase E guards the homepage's own code no longer causes this |
| Hydration mismatch warnings | **None.** Console captured across every run in this session |
| Content flash hidden → visible | None on first load: every armed element is below the fold at every validated width |
| Duplicate content / layout collapse / wrong initial state / broken controls | None observed |

---

## 7. IntersectionObserver failure — the phase's most serious finding

| Case | Before Phase E | After Phase E |
|---|---|---|
| `IntersectionObserver` **undefined** | composed immediately | composed immediately · 0 hidden · 0 armed · **COMPLETE** |
| **Constructor throws** (Resolve's own registrations) | **BROKEN** — see below | 0 hidden · 0 armed · hero resolved · rows visible · tablist present · **no console error at all** · **COMPLETE** |
| Constructor throws **globally** (the framework's own prefetch observer too) | dark hero + hidden rows for ~4s | unchanged — see the accepted residual below |
| Element already in view when the observer attaches | fires on the next frame | unchanged · PASS |
| **Fallback fires before the observer**, observer fires after | idempotent | re-verified: `data-rsv="on"`, stop mark aligned, 0 hidden, 0 armed · **no duplicate animation** · PASS |

**The defect, measured.** With `new IntersectionObserver` throwing, the exception propagated out of
`HomepageMotion`'s effect. React discarded the hydrated tree and re-rendered from the un-hydrated
state, which removed `data-state` from the hero — so `html[data-rsv-hero="traffic"]` matched again
and **the hero sat on the dark stage with the four named rows hidden, while the label above them
still read "what we report"**, until the pre-paint script's own 4s failsafe. Captured as an image.

**Classification: NEW PHASE E DEFECT — a Phase D fragility exposed by hardening. FIXED.**
The registry now catches a failing constructor or `observe()` and runs the callback immediately —
the same contract as having no observer at all — and each client leaf has a last-resort catch that
composes everything it touches rather than letting an error reach React.

**Accepted residual.** If the *framework's* own IntersectionObserver throws, React tears the root
down before any homepage effect runs, so no homepage guard can help. Measured in that state: all
6,679 characters of main content present, 0 hidden reveals, and full self-heal at 4s; the only
degradation is a dark hero with the row labels hidden for that window. This requires every route in
the application to be broken, not just this page. **PRE-EXISTING — ACCEPTED.**
Per §10 of the brief the 4s budget was **not** changed: shortening it would risk cancelling the
approved T1 on a genuinely slow device, which is a real cost against a hypothetical one.

**A smaller related fix:** `PopulationToggle` now releases `data-rsv-hero` in a *later* effect, once
the render carrying `data-state` has been committed. There is no frame in which neither rule
applies, and a tree torn down after that point can no longer fall back onto the dark stage.

---

## 8. The ~4s fallback timer

| Check | Result |
|---|---|
| Timer count | **One per registry**, created on the first registration, not per element |
| Registries | One per client leaf (three on the page), each destroyed on unmount |
| Completion | Every registered element resolves — verified at eight viewport sizes, `stillArmed: 0` after a scroll-through in all of them |
| Cleanup | `destroy()` disconnects every observer and clears the timer; verified by listener accounting (§17) |
| Late replay after fallback | **None** — `run()` is idempotent; the fallback-then-observer race was tested explicitly |
| Duplicate composition | None |
| Route/navigation cleanup | Verified across three client-side round trips (§17) |
| Value | **Unchanged at 4000ms**, per §10 of the brief |

---

## 9. Visibility change

| Case | Result |
|---|---|
| Hidden **before** motion starts | Everything composes; nothing plays to an unseen screen |
| Hidden **during** the hero sequence | Hero jumps to `enquiries`; friction, departure, chain and close all `on`; stage 3; **no residual inline transform on any stop mark** |
| Hidden **during** the CCM sequence | Sequence completes to stage 3; timers cleared |
| Hidden **after** a reader tab selection | The reader's stage is **not** overridden — `autoStage` stays cancelled |
| On return | Nothing replays; nothing resumes from a half-state; `armed: 0`, `rvHidden: 0` |

**PASS.**

---

## 10. Reader interaction during motion

| Case | Result |
|---|---|
| Click during the auto-sequence | Selection takes effect and **survives every remaining timer** — re-checked 4.5s later, still the reader's tab |
| Arrow keys during the sequence | Selection, focus, roving `tabindex` and `inert` all move together |
| Home / End | Correct, and cancel the sequence |
| Rapid mixed keys (`←←`, End, Home, `→`) | Settles consistent: selection, focus and `tabindex` agree (`focusMatchesSelected: true`); wrap-around from the first tab reaches the last |
| Selecting the current tab repeatedly | Idempotent |
| Hidden mid-interaction | Reader's choice preserved |
| Resize after selection | Selection preserved |
| Stale timer overriding the reader | **Never observed** |

**PASS.** An earlier apparent divergence between focus and selection was a **FALSE POSITIVE**: the
probe read the DOM synchronously inside the same task that dispatched the keys, before React had
committed.

---

## 11. Reduced motion

| Viewport | Result |
|---|---|
| 390 / 860 / 1425 | Hero opens resolved · lattice `display: none` · no descent · chain rests on stage 3 · all three panels open · nothing `inert` · tablist operable · signature control works · **0 hidden, 0 armed, 0 overflow** |

**Runtime preference changes — a second Phase E defect, found and fixed.**

| Transition | Before Phase E | After Phase E |
|---|---|---|
| Loaded with reduce, reader turns it **off** mid-page | **17 of 21 reveals re-armed and hidden; the chain re-armed and dropped to 46% scale / 0.42 opacity** | **0 hidden · chain never armed · all three panels stay open · tabs still work** |
| Loaded without reduce, reader turns it **on** | composed correctly | composed correctly (unchanged) |
| …then turns it **off** again | re-armed | **0 hidden · chain stays `on` at opacity 1** |

**Classification: NEW PHASE E DEFECT — FIXED.** Three guards now hold the line, and all three state
the same principle: *the page never takes back something the reader has already been shown.*
1. arming is decided **once**, at mount — if motion was unavailable on the first paint, the page
   stays composed for good;
2. nothing already marked settled is re-armed;
3. nothing currently **on screen** is armed at all.

Runtime preference changes are honoured **live** — no reload is required — and the live listener is
now attached defensively (an engine without `addEventListener` on a `MediaQueryList` loses the live
update instead of tearing down the page).

---

## 12. Zoom and text enlargement

Emulated as real browser zoom (the CSS viewport shrinks and the device pixel ratio rises), which is
what layout zoom actually does.

| Base | 100% | 125% | 150% | 200% |
|---|---|---|---|---|
| 1425 | 0px overflow | 0px | 0px | 0px |
| 860 | 0px | — | 0px | 0px |
| 390 | 0px | — | 0px | 18px at a **195px** layout viewport |

- **H1** reflows rather than clipping — 3 lines at 390/100%, 5 at 150%, 6 at 200%.
- **No clipped element** was found at any step: every `overflow: hidden` box was measured against
  its own `scrollHeight`, and the population rows never exceeded their figure box.
- **CTA labels, controls and figures** all remained within the page at every supported combination.
- No base font size was reduced.

**The single overflow is at a 195px layout viewport** — 390 at 200% — which is **far below the
360px support floor** and below the 320px WCAG reflow target as well. **320px itself is clean**
(§3). **Classified PRE-EXISTING — ACCEPTED, outside the supported range.**

---

## 13. Viewport height

Every on-view trigger was checked against the geometry that can actually satisfy it — for each
target, whether `viewportHeight / elementHeight` can ever reach its threshold.

| Viewport | Unreachable triggers | Tallest revealed element | After a scroll-through |
|---|:--:|---|---|
| 390×667 · 390×844 · 390×1000 | **0** | 587px | 0 armed · hero resolved · stage 3 · 0 overflow |
| 860×600 · 860×1000 | **0** | 595px | same |
| 1425×700 · 1425×900 · 1425×1200 | **0** | 554px | same |

**No chapter requires an unusually tall viewport to activate, no trigger can wait forever, and the
fallback remains the floor rather than the mechanism.** At the shortest tested viewport (600px) the
tallest revealed element is 595px, so every threshold is satisfiable by geometry alone.

**PASS.**

---

## 14. Forced colours

Measured under emulated `forced-colors: active`.

**Survives correctly:** all copy, every link, both calls to action, the tab titles, the open/dashed
marks (a border is preserved), the whole F1 chain, and the tab selection — the selected stage is the
one with its panel open, which is not a colour channel.

**One real usability failure, found and fixed.** The signature control's pressed state is a
background fill, and a background fill is exactly what forced colours discards: `Traffic` and
`Enquiries` rendered identically, so a sighted reader could not see which state they were looking
at. `aria-pressed` still carried it to assistive technology, which is not a substitute.

The fix is three declarations on one button: `Highlight` / `HighlightText` — the reader's own
"this one is chosen" pair — with `forced-color-adjust: none`. The first attempt used the system
colours **without** the opt-out and was **measured to be worse**: the engine drew a text backplate
in `Canvas` behind the label and the word became a black box on the highlight fill. Verified after
correction: the pressed label is legible and the two states are unmistakably distinct.

**Recorded, not fixed:** the solid population marks lose their fill, so the figure's solid/dashed
channel flattens. Every row is named in text beside its mark and the caption still says what the
marks are, so the meaning survives in words. Giving those marks a forced-colours-only border would
be redesigning the figure for one rendering mode. **PRE-EXISTING — ACCEPTED.**

---

## 15. Print — the phase's second serious finding

**Measured before this phase, printing the homepage produced:**

- **all 21 composition reveals at `opacity: 0`** — the friction and system headings, the entire
  accountability chapter and the whole close printed **blank**;
- F1 printed at **46% scale and 42% opacity**;
- the departure carrier and **all five arrival marks invisible**;
- a solid black band where the departure chapter should be and a **full page of solid tangerine**
  where the close should be;
- and, because browsers do not print background colours by default, ivory type on the dark
  departure band and the dark evidence card would print **white on white**.

Captured as a full-page image. Every symptom §17 of the brief names was present.

**Classification: NEW PHASE E DEFECT — FIXED.** A print block was added, and it is defensive only —
this is not a print design. It does two things:

1. **composes everything**, because paper has no viewport and no observer will ever fire for the
   part of the page that was off screen when printing started — including expanding all three stage
   panels and hiding the lattice, which is a transient rather than content;
2. **puts ink back on the surfaces that assume a dark ground**, including restoring the hero's state
   tokens (printing while the surface happened to be mid-inversion otherwise left the dimmed
   register at its dark-ground value on white paper — found and fixed within this phase).

**Verified after the fix:** 0 invisible reveals, chain at full scale and opacity, carrier and
arrival marks visible, hero/departure/close on the light ground with ink type, evidence card
readable, all three stages expanded. `break-inside: avoid` keeps each figure with its chapter.

---

## 16. Touch and pointer

| Check | Result |
|---|---|
| Hover dependency | **None.** One `:hover` rule exists in the motion layer and it changes a link's colour. No content, control or explanation is hover-only |
| Tab touch targets | **40px effective height on all three tabs**, measured by hit-testing `elementFromPoint` outward from each tab's centre. The bare box is 19–24px; the invisible extender supplies the rest |
| Coarse pointer | Verified with touch emulation at 390 and through both orientation changes |
| Mobile CTAs | Full-width, 52px, unchanged |
| Determinism | Interaction is click/keyboard driven throughout |

An earlier "undersized target" reading was a **FALSE POSITIVE** — `getBoundingClientRect()` does not
include the `::after` hit-area extender.

---

## 17. Performance

| Check | Result |
|---|---|
| Scroll handlers | **One**, `{passive:true}`, rAF-throttled, two properties, one element, no React state per event |
| rAF | Guarded by a `ticking` flag; the callback body cannot throw, and clears its own inline values if it ever does |
| Observer sharing | One observer per threshold per registry — the 21 reveals still share one |
| Listener duplication after resize | **None** |
| **Listener accounting across client navigation** | net `scroll` / `resize` / `visibilitychange` counts measured after 1 and after 3 away-and-back round trips: **identical and flat** (`resize 2, scroll 3, visibilitychange 2`, including the framework's own). **No leak** |
| Timer duplication | `setInterval` count: **0**. One fallback timer per registry |
| ResizeObserver | None added |
| Forced layout loop | None; the resize path is debounced at 180ms and only re-aims |
| Long/continuous animation | `document.getAnimations()` = **0** after a full scroll-through and a scroll back |
| Homepage client JS | **14,480 bytes raw / 4,809 gzipped** (Phase D: 13,526 / 4,548) — **+954 raw, +261 gzipped** for every guard in this phase |

**PASS.** The increase is entirely error handling and three boolean guards.

---

## 18. No-JS matrix

Script execution disabled at the protocol level; the browser executed no page JavaScript.

| Viewport | Hero | Chapters | Figures | CTA | Overflow | Result |
|---|---|---|---|---|:--:|---|
| 360 | resolved, rows visible, no lattice, no emphasis mark | all present, 6,679 chars | F1 one SVG at opacity 1 · friction runs + rule + label visible | 5 arrival marks + both CTAs visible | 0px | PASS |
| 390 | same | same | same | same | 0px | PASS |
| 760 | same | same | same | same | 0px | PASS |
| 761 | same | same | same | same | 0px | PASS |
| 1080 | same | same | same | same | 0px | PASS |
| 1081 | same | same | same | same | 0px | PASS |
| 1425 | same | same | same | same | 0px | PASS |

Also at every width: the static `<ol>` stage list with **three `<h3>` headings**, **18 in-page
links**, the full footer (25 links), and **0 hidden reveals**.

The only elements hidden anywhere are the **two chain-legend entries Session 18C deliberately hides
below 761px** — verified by name. All five accountability promises render at every width. An earlier
"accountability hidden" reading was a **FALSE POSITIVE** caused by a probe selecting the legend.

---

## 19. Motion failure matrix

| Failure mode | Outcome | Classification |
|---|---|---|
| JavaScript disabled | Full Phase C page at seven widths | **COMPLETE** |
| `IntersectionObserver` undefined | Composes immediately, 0 hidden, 0 armed, sequence still runs | **COMPLETE** |
| IO constructor throws (Resolve's registrations) | Composes immediately, **no console error**, tablist intact | **COMPLETE** |
| IO constructor throws globally (framework's observer too) | All copy present, 0 hidden reveals, full self-heal at 4s; dark hero with row labels hidden inside that window | **DEGRADED BUT SAFE** |
| Observer never fires (fallback only) | Everything composed by the single 4s timer | **COMPLETE** |
| Fallback fires first, observer fires after | Idempotent — no duplicate animation, correct final state | **COMPLETE** |
| Reduced motion | Every resolved state composed; nothing hidden | **COMPLETE** |
| Reduced-motion preference changed at runtime, either direction | Nothing hidden, nothing re-armed, panels stay open | **COMPLETE** |
| Background-tab interruption at any phase | Composed on return, nothing replayed, reader's choice preserved | **COMPLETE** |
| Resize mid-event, at any boundary or jump | Recomposes correctly, aim drift 0–1px, no stale state | **COMPLETE** |
| Motion stylesheet rules removed at runtime | All content present and legible; the page renders as Phase C | **DEGRADED BUT SAFE** |
| Client-side navigation back with a restored scroll position | The sections at that position play their reveal once, exactly as a first visit to that position would; everything settles | **DEGRADED BUT SAFE** |
| An effect throws for any other reason | Last-resort catch composes everything that leaf touches | **COMPLETE** |

**No BROKEN state remains.** Two states were BROKEN before this phase (IO constructor throwing, and
print) and both are now COMPLETE.

---

## 20. P1 — the hero contrast decision

### The existing crossing, measured

Sampled every animation frame on the rendered production build through the inversion:

| Element | Below 3:1 | Minimum ratio |
|---|---|---|
| H1 vs ground | **67 ms** | 1.19 |
| dimmed register vs ground | **343 ms** | 1.02 |

Phase D's estimate of "~125ms" was the aggregate window in which *something* was below 3:1. Measured
per element, the H1's own crossing is **67ms** — and the larger problem turned out to be a different
one: **the dimmed register was not crossfading at all.**

The H1 inherits `color` from the surface, so it has always crossfaded with the ground. Everything
that reads a token instead — the supporting line, the method link, the state label, the row labels,
the stage rule, the two governing words — had no transition of its own, so its colour **snapped** to
the destination while the ground behind it was still 620ms away from arriving. That left the dimmed
register sitting at its light-ground colour on an almost-black surface for a third of a second.

### Alternatives tested, on the rendered page

| Hypothesis | Measured | Verdict |
|---|---|---|
| **Step the type colour at the mid-point** (`color 1ms` at 280–310ms) | H1 never drops below 3:1 (min 3.36–3.95) — but the dimmed register is **unchanged at 343ms**, and the type gains a hard discontinuity the approved prototype does not have | **REJECTED.** It introduces a visible flick on a 100px display H1 — a third state, which §23(C) forbids — and fixes only the smaller half of the problem |
| **Retime the two transitions against each other** | Analysed and rejected before implementation: two colours travelling toward each other must cross, and a *simultaneous symmetric* crossfade crosses at the point where both are moving fastest, which is the **shortest possible** crossing. Any offset moves the crossing to a slower part of the curve and makes it longer (modelled at 140–155ms) | **REJECTED** |
| **Shorten the inversion** | Would change the approved pace of the gesture and the reader-driven toggle with it | **REJECTED** |
| **Opacity isolation** | Lowers contrast further | **REJECTED** |
| **Crossfade the token-driven text *with* the surface** | dimmed register **343ms → 116ms** below 3:1 (a 66% reduction); H1 unchanged at 67ms; both end states identical; consistent in both directions of the reader-driven toggle | **IMPLEMENTED** |

### Fidelity

The implemented change makes the rest of the surface do **what the H1 already did**. It removes a
discontinuity rather than adding one; it introduces no third state, no new duration, no new easing
and no new colour; and both end states are byte-identical. It brings production *closer* to a single
coherent gesture — "the surface inverts" — than the token-snapping behaviour it replaces.

### Final classification

**IMPROVED WITHOUT FIDELITY LOSS.**

Recorded alongside it, and explicitly accepted: **the H1's own 67ms symmetric crossing remains and
is irreducible.** It is inherent to any continuous inversion between two colours, it is inherited
from the approved prototype, WCAG's contrast criteria apply to states rather than to transition
frames, and removing it would mean removing the inversion. **ACCEPTED RESIDUAL, within an outcome
that is otherwise an improvement.**

---

## 21. P2, F10, D1

| ID | Status | Worse under hardening? | Changed? |
|---|---|---|---|
| **P2** — WIDE chain label overlap (`WE ANSWER FOR THIS MUCH` / `arrived with no usable trail`) | Pre-existing in Phase C and in the approved prototype; the geometry is unchanged | **No.** Checked across every width, both boundary pairs, all three zoom levels and both orientations: it neither appears at new widths nor worsens at any of them | **No** |
| **F10** — the Phase B footer's CTA block follows the homepage close | Present, re-confirmed rendered | n/a | **No** — out of Phase E scope, deferred to the shared-commercial / launch-polish phase |
| **D1** — the evidence claim stays composed open | Unchanged; no hiding interaction was introduced. The card gained one class, used only by the print block | n/a | **No** |

---

## 22. Regression findings

| Finding | Classification | Action | Result |
|---|---|---|---|
| IO constructor throwing tore down the React tree; the hero fell back to the dark stage with the named rows hidden for ~4s | **NEW PHASE E DEFECT** (Phase D fragility exposed by hardening) | Registry and all three leaves made throw-proof; pre-paint attribute released once React owns the state | **FIXED — COMPLETE** |
| Turning reduced motion off mid-page re-armed 17 reveals and the chain | **NEW PHASE E DEFECT** | Arming decided once; never re-arm what is settled; never arm what is on screen; composed panels stay open | **FIXED** |
| The homepage printed with 21 blank sections, a black band, a solid tangerine page and white-on-white type | **NEW PHASE E DEFECT** | Minimal `@media print` block | **FIXED** |
| The dimmed register snapped colour while the ground crossfaded (343ms below 3:1) | **PHASE C/D REGRESSION EXPOSED BY HARDENING** | Lockstep transition | **FIXED — 116ms** |
| The signature control's pressed state was invisible in forced colours | **DEFENSIVE IMPROVEMENT** | System-colour pair with `forced-color-adjust: none` | **FIXED** |
| Printing mid-inversion left the dimmed register on its dark-ground token | **NEW PHASE E DEFECT** (introduced and fixed inside this phase) | Print block resets the state tokens | **FIXED** |
| The marks were never aimed if the T1 did not run (client-side navigation) | **DEFENSIVE IMPROVEMENT** | Lazy aim on the reader's first switch to `traffic` | **FIXED** |
| Hero departure transform slightly stale after resizing without scrolling | **FALSE POSITIVE** (0.2px / 0.003 opacity) | None — adding a listener would breach the one-scroll-handler rule for no benefit | Accepted |
| Tab buttons appeared to be 19px touch targets | **FALSE POSITIVE** (the `::after` extender is excluded from `getBoundingClientRect`) | None — measured 40px effective by hit-testing | Accepted |
| Accountability list appeared hidden at narrow with no JS | **FALSE POSITIVE** (the probe selected the 18C-hidden legend entries) | None | Accepted |
| Focus and selection appeared to diverge under rapid keys | **FALSE POSITIVE** (read before React committed) | None | Accepted |
| Global IO failure (framework included) leaves a dark hero for ≤4s | **PRE-EXISTING — ACCEPTED** | None; 4s budget deliberately unchanged per §10 | Recorded |
| 18px overflow at a 195px layout viewport (390 @ 200%) | **PRE-EXISTING — ACCEPTED** — below the 360px floor and below the 320px reflow target, both of which are clean | None | Recorded |
| Forced colours flattens the solid/dashed mark channel | **PRE-EXISTING — ACCEPTED** — every row is named in text | None | Recorded |
| Back-navigation with restored scroll replays the reveal at that position | **PRE-EXISTING — ACCEPTED** — a reveal, not a loss; everything settles | Partially mitigated by the on-screen guard | Recorded |
| P2 chain label overlap | **PRE-EXISTING — UNCHANGED** | None | Recorded |
| F10 double close | **OUT OF PHASE E SCOPE** | None | Deferred |

---

## 23. Static baseline preservation

At **390 / 860 / 1425**, the live page, the no-JS page and the reduced-motion page were captured and
compared against the approved Phase C composition.

| | Result |
|---|---|
| Typography | Unchanged — no size, weight, tracking or leading value was touched |
| Chapter density and heights | Unchanged |
| F1 proportions | Unchanged — the three drawings keep their exact viewBoxes and coordinates |
| F2 / F3 proportions | Unchanged — runs, stop marks and rule geometry untouched |
| Final CTA | Unchanged — five arrival marks, both CTAs, the same scale |
| Mobile simplification | Unchanged — 18C's hidden numerals, single legend entry and borderless capability links all intact |
| Resolve identity | Unchanged — no token, ground, accent or face altered |
| No-JS hero | Light ground, `enquiries` in accent-deep with **no** emphasis mark, resolved rows, no lattice — the Phase C hero exactly |

**The only rendered differences Phase E introduces are in states Phase C never had: print, forced
colours, and the intermediate frames of the inversion.**

---

## 24. Shared chrome

| | |
|---|---|
| Header non-sticky | Yes |
| Services direct link | Present |
| `/contact` primary header CTA | Present |
| Mobile navigation | Functional (burger at ≤1080, verified through both orientation changes) |
| Footer `/contact` primary, booking secondary | Unchanged |
| Social targets | Intact (25 footer links at every width) |
| Default button shadow | Still absent |
| Files changed | **None** |

---

## 25. Builds

| | Standard | cPanel |
|---|---|---|
| Command | `npm run build` | `npm run build:cpanel` |
| Result | **PASS** | **PASS** |
| Routes | **24** | **24** |
| Warnings | Pre-existing multiple-lockfile workspace-root warning only — identical to Phases A–D | Same |
| Memory ceiling | untouched | **512 MB, unchanged** |

`next-env.d.ts` and `tsconfig.tsbuildinfo` picked up the usual one-line build churn and were
restored with `git restore` before staging, and confirmed clean afterwards.

---

## 26. Rollback boundary

Phase E is **one commit** containing 8 files — 7 modified, plus this document. No file was created.

- **Full rollback:** `git revert <commit>` returns the homepage to the Phase D commit exactly.
- **Partial rollback:** the three CSS additions (P1 lockstep, forced colours, print) are contiguous
  and independently removable; the TypeScript changes are guards that can be reverted per file.
- No data migration, no schema change, no route change outside `/`, no shared-chrome change, no
  form, analytics, robots or sitemap change, no token change, no layout change.

## 27. What a worker may claim from this document

**Claimed (MEASURED / rendered):** 0px overflow at all nine programme widths and all eight defensive
edge widths, including 320 · live boundary and large-jump resizing recompose correctly with 0–1px
aim drift · orientation round-trips are clean · no-JS is the Phase C page at seven widths · reduced
motion composes everything and honours runtime changes in both directions without hiding anything ·
no motion failure mode remains BROKEN · every on-view trigger is reachable at eight viewport sizes ·
no listener or timer leak across three client-side round trips · one scroll handler · 0 running and
0 infinite animations after a full scroll-through · the print output is complete · the forced-colours
control state is visible and legible · P1's dimmed-register exposure is reduced 343ms → 116ms with
both end states unchanged.

**Not claimed:** any gate is passed (gate-passing is reserved to the orchestrator) · real-device or
cross-browser testing · screen-reader testing with an actual AT · Core Web Vitals or field
performance · anything about the live site · testing on a real printer · that P2, F10 or D1 have
been resolved · that the H1's 67ms crossing has been removed.
