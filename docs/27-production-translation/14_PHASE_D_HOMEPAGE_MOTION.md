# Session 26 — Phase D — Homepage Motion + Interaction

**Session:** 26 · **Date:** 2026-09-05 · **Model:** Claude Opus 5 · **Effort:** High
**Branch:** `test_branch` · **Starting HEAD:** `15b705915e06c8968ff7e81b42893e8897c556d9`
(the single Session 25/25B Phase C commit) · **Nothing pushed.**
`README.md` untouched and unstaged throughout.

**Purpose.** Add the approved Resolve motion and interaction system to the Phase C homepage **as
progressive enhancement**. No redesign, no copy change, no new chapter, no form, no analytics, no
SEO surface, no other route, no shared-chrome change.

**The governing constraint, stated once:** *the Phase C static homepage is the fallback, and the
fallback is the page.* Motion is an amplifier. It is never the carrier.

---

## 1. Authoritative sources read before editing

| Source | Role here |
|---|---|
| `docs/27-production-translation/04_MOTION_IMPLEMENTATION.md` | The binding production motion plan — budget, the one shared primitive, the client-boundary strategy, the anti-tic rules |
| `docs/26-resolve-homepage/prototype/index.html` | The **behavioural / perceptual** reference. Every duration, delay, threshold, easing and `data-s` stage attribute below is transcribed from it |
| `docs/27-production-translation/13_PHASE_C_HOMEPAGE_STATIC.md` | The **static structural** reference, including §20's list of what Phase C deferred to this phase and §34's F10 finding |
| `docs/27-production-translation/12_PHASE_B_SHARED_CHROME.md`, `11_PHASE_A_FOUNDATION.md` | Boundaries not to cross |
| Gate 10 records under `docs/26-resolve-homepage/` (18A/18B/18C refinement, 19A corrections, 19B accessibility closure) | Why several behaviours are **absent**: the boundary "fall", the departure band wipe, the fifth boundary transition |

The old production homepage was **not** used as authority anywhere.

---

## 2. Files changed

| File | Action | Purpose |
|---|---|---|
| `hooks/use-resolve-motion.ts` | **new** (156 lines) | The one shared primitive: `useResolveMotion()` + `createResolveViewRegistry()` |
| `app/resolve-motion.css` | **new** (405 lines) | All homepage motion CSS, in its own revertable file |
| `components/homepage/HeroSurface.tsx` | **new** (97 lines) | Client leaf: the hero's two-state surface + the page's one scroll handler |
| `components/homepage/SystemStages.tsx` | **new** (298 lines) | Client leaf: the CCM tablist, its sequencing, and the chain's stage/descent |
| `components/homepage/HomepageMotion.tsx` | **new** (132 lines) | Client leaf: renders nothing; adds classes to server-rendered nodes |
| `app/globals.css` | modified (+8) | One `@import './resolve-motion.css'` and its rationale comment. **No token changed.** |
| `app/page.tsx` | modified | Mounts `<HomepageMotion />`; documentation comment |
| `components/homepage/HomepageHero.tsx` | modified | Wrapped in `HeroSurface`; state-dependent inline colours replaced by surface tokens; the pre-paint script |
| `components/homepage/PopulationToggle.tsx` | modified | The T1 (lattice → named objects), the field, the signature control |
| `components/homepage/HomepageActivity.tsx` | modified | `id`/class hooks for the departure carrier |
| `components/homepage/HomepageFriction.tsx` | modified | Class hooks + the approved per-mark stagger values |
| `components/homepage/HomepageIntervention.tsx` | modified | Delegates the stage list to `SystemStages`; F1 gains motion hooks and `data-s` |
| `components/homepage/HomepageAccountability.tsx` | modified | `.rsv-rv` composition reveals only — this chapter is intentionally still |
| `components/homepage/HomepageFinalCTA.tsx` | modified | Class hooks + the arrival stagger |

**Not touched:** `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/ui/*`,
every other route, forms, analytics, `robots.ts`, `sitemap.ts`, `next.config.mjs`, any prototype,
any governance document, `README.md`.

---

## 3. Architecture

**No animation library was added, and none is needed.** The homepage's own client chunk is
**13,526 bytes raw / 4,548 bytes gzipped** and contains all three leaves *plus* every stage's copy
and links. Framer Motion alone would have added ~35–50 KB gzipped to solve a problem CSS
transitions already solve, and would have made every animated chapter a client component.

**Server Components:** every chapter, every heading, every paragraph, every link, the whole F1 DOM,
the whole boundary/evidence/fit chapter, and the close.

**Client leaves — three, where the plan permitted five:**

| Leaf | Owns | Why it must be client |
|---|---|---|
| `HeroSurface` | `data-state` on the hero `<section>`; the one `rAF` scroll handler | Holds the surface state; passes all copy through as server-rendered `children` |
| `SystemStages` | The CCM tablist, its sequencing, the chain's `data-stage` and descent | Roving `tabindex`, `inert`, and state the chain reads |
| `HomepageMotion` | `.rsv-rv` reveals, the departure, the friction alignment, the close arrival | Renders `null`; only **adds** attributes to server-rendered nodes |

`HomepageMotion` replaces what would otherwise have been ~24 client wrappers around server copy.
Everything it touches is Server Component output that React never re-renders, so an added attribute
is safe and permanent. It obeys the plan's §2 contract exactly: **it may only add a class or
attribute, or write a start state it also guarantees to release. It never injects DOM, text, links
or figures, and it never removes content.**

### The shared motion primitive — `hooks/use-resolve-motion.ts`

`useResolveMotion()` returns `{ mounted, reduced, enabled }`. It returns `mounted: false` on the
server and on the first client render, which is precisely why the server-rendered, no-JS and
pre-hydration page is the Phase C page: **no start state is ever written by the server.**

`createResolveViewRegistry(forceAfterMs = 4000)` provides:

- `onView(el, fn, threshold)` — fires **once**, never replays, unobserves itself;
- observers shared per threshold (the 21 `.rsv-rv` elements allocate **one** observer between them);
- **no `IntersectionObserver` at all → the callback runs immediately** (verified, §13);
- a **single ~4s timer** that force-runs every still-pending callback, because an observer does not
  run in a hidden or throttled tab and nothing on this page may depend on one having run;
- `forceAll()` for `visibilitychange`;
- `destroy()` — disconnects every observer and clears every timer on unmount. Registries are created
  *inside* effects and destroyed in their cleanup, so no listener can accumulate.

---

## 4. Motion budget

Ceiling (`02_RESOLVE_MOTION_BUDGET.md`, `DEC-019`, reconciled at Gate 10):
**T1 = 1 · T2 = 2 · T3 = 4 · signature = 1 · tablist = 1 · ambient = 0 · pinned = 0.**

| Tier | Used | What |
|---|---|---|
| **T1** | **1 / 1** | Hero resolve — the lattice becomes named objects and the surface inverts |
| **T2** | **2 / 2** | (1) Friction alignment (2) The CCM re-read |
| **T3** | **4 / 4** | (1) Hero departure (2) Departure carrier (3) Chain descent + draw (4) Close arrival |
| **signature** | **1 / 1** | Traffic ↔ Enquiries |
| **tablist** | **1 / 1** | Capture / Convert / Measure |
| **ambient** | **0 / 0** | — |
| **pinned** | **0 / 0** | — |
| T4 micro | n/a | CTA/capability hover only, CSS `:hover`, pre-existing |
| `.rsv-rv` reveals | **not counted** | 21 elements. `02_RESOLVE_MOTION_BUDGET.md` §5.0: a transition that merely makes a section appear is composition, not a tier |

**Within ceiling. Measured on the rendered page: `document.getAnimations()` returns 0 total and 0
running after a full scroll to the bottom and back, and 0 animations with infinite iterations.**
There is exactly one `animation:` declaration in the entire motion stylesheet — the 620ms one-off
ripple — and it is scoped to the traffic state so leaving that state drops it.

**Deliberately NOT reintroduced**, per the Gate 10 record:
- the boundary chapter's "fall" strike-through (removed in 19A because it had never rendered);
- the departure band's tangerine wipe (cut in 18A as decorative);
- the fifth boundary transition (removed, not repaired, in 19A).

**Deliberately NOT added:** the prototype's "lift this claim" evidence disclosure. Phase C renders
that content permanently open. Putting it behind a control would **hide currently visible content**
and is a static-composition change, not motion. Recorded as a documented deviation — see §16.

---

## 5. The pre-paint script — why it exists

The approved hero **starts on the dark traffic stage** and resolves toward the light state. In a
hydrated React page the earliest a component can act is *after* first paint, so reaching "dark"
from a client effect would produce a full-surface **light → dark → light** cycle: exactly the flash
and the strobing the brief forbids. The dark stage must therefore be the **first** paint.

`HomepageHero` renders one inline script, nine lines, at the top of the hero section:

```js
if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;   // does nothing under reduce
document.documentElement.setAttribute('data-rsv-hero', 'traffic');
setTimeout(() => document.documentElement.removeAttribute('data-rsv-hero'), 4000);
```

- It registers **no listener** and adds **one attribute**.
- CSS keys off `html[data-rsv-hero="traffic"] .rsv-sw:not([data-state])`. Once React sets its own
  `data-state`, that selector stops matching — so there is no ordering race and nothing to unwind.
- **It removes its own attribute after 4s.** A document whose JavaScript never hydrates therefore
  returns to the resolved light composition instead of sitting on the dark stage. This is the
  fail-open guarantee for the one behaviour that has a pre-paint start state.
- `PopulationToggle` only starts the T1 **if that attribute is present**. A client-side navigation
  back to `/` (where a `dangerouslySetInnerHTML` script does not re-execute) therefore does not
  invert a surface the reader is already reading; the page simply stays resolved. This also
  enforces anti-tic rule **M5**: one T1 per page load.

---

## 6. Every animated sequence

Durations, delays, thresholds and easings are the approved prototype's own values.
Easings: `--resolve-ease-state: cubic-bezier(.65,0,.35,1)` · `--resolve-ease-arrive: cubic-bezier(.2,.85,.25,1)`.

| # | Behaviour | Tier | Trigger | Duration | Stagger / delay | Replay | Reduced motion | No-JS |
|---|---|:--:|---|---|---|---|---|---|
| 1 | **Hero resolve** — lattice → named objects, surface inverts | T1 | Pre-paint dark; **≥900px**: timer, pulse at 420ms, resolve at 1450ms. **<900px**: on view of the figure (0.45), pulse then resolve +900ms | surface 620ms; marks 900ms; ripple 620ms | per-mark `(i % 17) × 11ms` | **Never** — once per page load | **Skipped entirely.** Lattice `display:none`; page opens resolved; control still works | Opens resolved; no lattice |
| 2 | **Hero departure** — the stage drifts up and fades | T3 | Scroll position | continuous, `rAF`-throttled | — | Reversible with scroll | Not attached | Stage stays put |
| 3 | **Departure carrier** — the surviving mark arrives, the statement follows | T3 | On view `#rsv-dep` (0.45) | 520/620ms | carrier 900ms, statement 1000ms | Once | Composed | Composed |
| 4 | **Friction alignment** — three outcomes travel into one column | T2 | On view `#rsv-fail` (0.35) | marks 300/380ms; release 640ms | per-mark 0→720ms; hold 1100ms before release | Once | Composed, never displaced | Aligned, rule drawn |
| 5 | **The CCM re-read** — Capture → Convert → Measure | T2 | On view of the system view (0.25) | panel 620ms | stage 2 at 2100ms, stage 3 at 4200ms | Once, then rests on 03. **Cancelled permanently by any reader selection** | `setStage(3)`, **all three panels open**, nothing `inert` | All three open, all 7 links tabbable |
| 6 | **Chain descent + draw** | T3 | On view `#rsv-chain` (0.2) | descent 900ms; draws 420–1150ms | element delays 0→1860ms | Once | Composed at full scale, drawn | Composed at full scale, drawn |
| 7 | **Close arrival** — five marks land | T3 | On view `#rsv-close` (0.28) | 340/680ms | 0/110/220/330/440ms | Once | Composed | Composed |
| 8 | **Traffic ↔ Enquiries** | signature | Reader | 620ms | — | Reader-driven | **Still works** — states swap with no transition | Control present, page shows the resolved state |
| 9 | **Stage tablist** | control | Reader | 620ms | — | Reader-driven | All panels open, none `inert` | Static `<ol>` with headings, all panels open |
| 10 | `.rsv-rv` reveals | *not counted* | On view (0.12) | 700ms | — | Once | Composed | Composed |

### Temporal check — is there anything to wait for?

The longest single sequence is the chain's, whose last element settles at **1860ms + 420ms**. It
plays while the reader is reading the stage list beside it, and the figure is legible from the first
frame of the descent. The CCM re-read completes at **4200ms**, and the reader can take it over
instantly. **Nothing requires the reader to stop scrolling and wait**: every chapter's content is in
the DOM and composed before its motion starts, and every start state is a fade or a small
translation of something already laid out. No sequence blocks a link, a CTA or a heading.

---

## 7. Hero motion and the inversion

**Trigger:** pre-paint script, then a timer at WIDE / on view at NARROW.
**Initial state:** dark ink surface, ivory H1, an undifferentiated lattice of identical anonymous
marks, `Traffic` pressed, the emphasis mark under *traffic*.
**Event:** a 620ms ripple across the lattice, then the same population travels into the four named
objects while the surface inverts to the light/resolved state.
**Resolved state:** identical to the Phase C static hero, plus the approved emphasis mark under
*enquiries*.

### Contrast, measured

The surface inversion re-points **tokens**, exactly as the shipped `globals.css` already does for the
dark footer strip — never a per-element override.

| Pair | Ratio | Verdict |
|---|---|---|
| `#F7F3EC` ivory on `#141219` ink (H1, statements) | **16.15:1** | PASS |
| `#A29BAC` dimmed register on `#141219` | **6.95:1** | PASS |
| `#FF5B04` the mark, as text, on `#141219` | **5.97:1** | PASS |
| `#141219` on `#F7F3EC` (control's pressed state in traffic) | **16.80:1** | PASS |
| `#FFFFFF` on `#D94400` (control's pressed state in light) | **6.65:1** | PASS |

**No intermediate state pairs white with tangerine.** The primary CTA is tangerine with ink text in
both states and never changes.

### FINDING P1 — the crossfade's mid-point (INHERITED, NOT INTRODUCED)

**Observed, rendered.** During the 620ms inversion the ground and the display type crossfade between
the same two colours in opposite directions, so their luminances necessarily cross. Measured on the
sRGB interpolation:

| Transition progress | H1 vs. ground |
|---|---|
| 0.2 | 6.1:1 |
| 0.3 | 3.44:1 |
| **0.5** | **1:1 — the H1 is momentarily invisible** |
| 0.7 | 3.44:1 (mirror) |

With `cubic-bezier(.65,0,.35,1)` that band spans roughly **125 ms** — about seven frames — once per
page load, and again on each reader-driven toggle.

**Classification: INHERITED FROM THE APPROVED PROTOTYPE.** The prototype transitions
`background-color` and `color` on `.sw` with the same duration and the same easing, so it has the
identical crossing; Gate 10 reviewed and passed that behaviour. **Phase D did not introduce it and
did not make it worse.** It is also not avoidable by retiming: any continuous path from *ink on
ivory* to *ivory on ink* must cross parity somewhere. Eliminating it would require changing the
approved hero gesture, which §10 of this phase's brief expressly forbids
(*"Translate ONLY the approved Resolve hero behaviour"*).

**Not fixed in Phase D. Recorded for the orchestrator.** If the owner wants it changed, the options
are a shorter inversion or a stepped (non-crossfading) surface change — both are motion-design
decisions, not translation decisions.

### Quantity safety in the hero

- The number of marks **never changes**, in either direction. 440 at MEDIUM/WIDE, 189 at NARROW —
  fixed by the stylesheet, identical in both states.
- **No mark is removed, consumed or filtered out.** Every mark travels into one of the four named
  rows, distributed evenly (`i % targets.length`), so no row accumulates more than another.
- The four row bars are **one equal length** (the Session 19A correction), carrying **state only**:
  solid = a named, attributed object; dashed = arrived with no usable trail.
- Nothing counts up, nothing counts down. **No percentage, rate, proportion or conversion is drawn
  at any point in the sequence.** The standing caption — *"the marks are kinds, not counts"* —
  remains true of the animation as well as the static figure.

---

## 8. F1 / the population and the chain

**Same population:** yes. The hero's marks are the same population before and after; the chain's
points are the same points at every stage.

**State transition, not quantity:** choosing a stage changes **which discrete points and joins are
the subject** (`data-s` → `fill` / `stroke`). It never changes a length, never fills a bar, never
adds or removes a point, and never shows a number. **A point cannot express a percentage.**

**Friction runs:** every mark that starts a run finishes it. No run shortens; nothing is deleted.
Only the **position** of the stop mark changes, and it ends exactly where the static page already
puts it. Nothing here can be read as attrition, drop-off or a conversion rate.

**Close arrival:** five marks, four solid and one open/dashed — the same five, in the same order,
landing. The gesture adds arrival, not arithmetic.

---

## 9. Attention / friction, intervention / resolution, accountability

- **Friction (T2).** The composed, aligned state is the CSS default; JavaScript **opts in** to the
  gesture by writing `data-rsv`. Displacement is measured from **layout offsets**
  (`offsetLeft`/`offsetWidth`), which are transform-independent, so the armed scale cannot corrupt
  the measurement. F2/F3's validated proportions are untouched: the runs, the stop marks and the
  rule are the Phase C geometry exactly.
- **Intervention / resolution (T2 + T3).** The transition from unresolved to resolved is carried by
  *which marks are the subject*, plus the descent that brings the reader closer to F1. **No claim of
  measurable uplift is expressible in it.**
- **Accountability is intentionally still.** It receives the composition-level reveal and nothing
  else. No moving bar, no score, no diagnosis, no count-up, no flashing warning state exists
  anywhere on the page.

---

## 10. Reader-driven interaction

| | |
|---|---|
| Control | The CCM tablist: Capture / Convert / Measure |
| Semantic pattern | `role="tablist"` → `role="tab"` (`aria-selected`, `aria-controls`) → `role="tabpanel"` (`aria-labelledby`) |
| Keyboard | **Roving `tabindex`** — verified rendered: `0,-1,-1`. Left/Right/Up/Down wrap; Home; End. Verified: pressing **Home** on tab 3 moved selection *and* focus to tab 1, updated the roving index to `0,-1,-1`, set the chain to stage 1, and set `inert` to `false,true,true` |
| Active state | Carried by **three** channels: `aria-selected`, an ink-vs-dim colour change, and the panel opening. **Not by animation, and not by colour alone** |
| Nested interactive controls | None. The panel is a **sibling** of the tab button, never a descendant (the Session 19B structure) |
| Timed auto-advance | Plays once on entering view, then rests on stage 03. **Any reader selection cancels it permanently.** It never loops and never replays |
| Focus | Never moved for the reader — only in response to their own arrow/Home/End key. A collapsed panel is `inert`, so a focus ring can never land on a control the reader cannot see |
| Hit area | The 40px invisible extender (`.rsv-stg::after`), centred in the row's own padding so adjacent tabs cannot overlap |
| Signature control | `aria-pressed` on both buttons, `aria-live="polite"` on the state label, and the emphasis mark under the governing word — a state channel that is not colour |

**Second reader-driven behaviour, `<h3>` → `<button role="tab">`:** the tablist is rendered **only
after hydration**. Before that — on the server, with no JavaScript, and with a failed hydration —
`SystemStages` renders Phase C's `<ol>` with three `<h3>` headings and every panel open. This
preserves the static baseline byte-for-byte and avoids shipping three dead buttons to a reader who
cannot use them. The consequence is that the three stage headings are `<h3>` for crawlers and
no-JS readers and `role="tab"` for hydrated readers. **Recorded as a deliberate choice.**

---

## 11. Failure and fallback contract

**Verified by rendering, not by reading the source.**

| Failure mode | Verified result |
|---|---|
| **No JavaScript** (`Emulation.setScriptExecutionDisabled`) | Full Phase C page. Light hero, resolved rows, no lattice, no emphasis mark, all three stages open with all seven links, chain fully drawn with stage-1 accents, close composed with its five arrival marks |
| **Server HTML** (`curl`) | **0** occurrences of `data-rsv=`; **0** of `data-state=`. No start state is ever sent by the server |
| **No `IntersectionObserver`** (deleted before hydration) | Everything composes immediately: `fail/dep/chain/close = on`, **0** `.rsv-rv` still armed, hero resolved, CCM sequence still runs |
| **Observer never fires** | The single ~4s registry timer force-runs every pending callback |
| **Hydration never happens** | The pre-paint script removes its own attribute at 4s and the hero returns to the resolved light composition |
| **Tab hidden mid-sequence** | Verified: with the hero at `traffic` and the friction `armed`, dispatching `visibilitychange` composed **everything** — hero `enquiries`, `fail/dep/chain/close = on`, chain stage 3, 0 `.rsv-rv` armed, **no residual inline transform on any stop mark**. Returning to visible changed nothing further. **Nothing replays; nothing resumes from a half-state** |
| **Scrolled away and back** | Verified: state stays `enquiries`, `fail` and `chain` stay `on`. **Nothing replays** (M5) |
| **Client-side navigation back to `/`** | The pre-paint attribute is absent, so the T1 does not run and the page renders resolved |

**Nothing meaningful is left at `opacity: 0`, `visibility: hidden`, or transform-shifted out of view
under any of these.** Enhancement fails **open**.

Every `.rsv-rv` element is below the fold at every validated width, so its start state is only ever
written after hydration and is never seen as a disappearance.

---

## 12. Scroll handling and performance

| | |
|---|---|
| Scroll handlers | **Exactly one**, in `HeroSurface`. Verified by grep across `components/homepage/` and `hooks/` |
| Listener options | `{ passive: true }` |
| Throttling | One `requestAnimationFrame`, guarded by a `ticking` flag |
| Properties written | **Two** — `transform` and `opacity` — on **one** element |
| React state per scroll event | **None.** The handler writes to the DOM directly |
| `getBoundingClientRect` | One call per frame, on one element |
| Cleanup | Listener removed and both inline properties cleared on unmount, so the stage is never left displaced or faded |
| Pinned content / scroll-jacking / wheel hijack / forced scroll position | **None** |
| Animated properties | `transform`, `opacity`, colour tokens, and one `stroke-dashoffset` draw. **No layout property is animated anywhere** — no `width`, `height`, `top` or `left` |
| Filter / blur / box-shadow animation | **None** |
| Long or continuous animation | **None.** `document.getAnimations()` = 0 total, 0 running, 0 infinite, after a full scroll to the bottom and back |
| Resize | One debounced (180ms) `{passive:true}` listener that **re-aims** the marks. It builds nothing and animates nothing |
| Node cost | The 440 lattice marks are **server-rendered once** and never rebuilt. JavaScript only writes each mark's `--rsv-tx` / `--rsv-ty` from measured geometry. The narrow tier hides all but the first 189 in CSS |
| Added client JS | **13,526 bytes raw / 4,548 gzipped** for the homepage's own chunk, including all stage copy |

---

## 13. Responsive motion

**Verified rendered at every required width.** Horizontal overflow was measured after a full scroll
through the page **with motion active**:

| Viewport | Motion | Composition | Overflow | Quantity safety | Result |
|---|---|---|---|:--:|---|
| 360 | NARROW: T1 on view; friction ticks per run | NARROW | **0px** | kinds, not counts | PASS |
| 390 | NARROW: T1 on view (the figure is teased at the fold); 189 marks / 21 cols | NARROW — H1 3 lines, stacked full-width CTAs, compact rows, stage index + one open stage | **0px** | kinds, not counts | PASS |
| 430 | NARROW | NARROW | **0px** | kinds, not counts | PASS |
| **760** | NARROW: **189 marks, 21 cols**, figure height `auto`, rows `relative`, stage numerals hidden | NARROW | **0px** | kinds, not counts | PASS |
| **761** | MEDIUM: **440 marks, 30 cols**, figure height 224px, rows `absolute`, numerals shown | MEDIUM | **0px** | kinds, not counts | PASS |
| 860 | MEDIUM: T1 on view (<900); 440 marks | MEDIUM — single column, stage beneath the copy | **0px** | kinds, not counts | PASS |
| **1080** | 440 marks / 30 cols, figure 270px, MEDIUM chain drawing | MEDIUM | **0px** | kinds, not counts | PASS |
| **1081** | **Identical** — no motion decision keys off this boundary | WIDE tier, MEDIUM chain (the chain's own breakpoint is 1100, the prototype's value) | **0px** | kinds, not counts | PASS |
| 1425 | WIDE: T1 on a timer (≥900), 440 marks / 30 cols | WIDE — two-column hero, horizontal chain | **0px** | kinds, not counts | PASS |

**760 / 761 is the real motion boundary** and it behaves exactly as the approved composition
requires: the narrow page gets a proportionally shorter lattice, a flow-height figure, and no fixed
stage. **1080 / 1081 is visually and behaviourally identical**, which is correct — no Phase D
behaviour is keyed to it.

Desktop choreography is **not** forced onto mobile: the T1 waits for the figure at NARROW instead of
playing to an empty screen, the friction rule becomes a per-run tick, the stage numerals are hidden,
and the capability pills become underlined text (Session 18C's rules, preserved).

---

## 14. Detailed perceptual review

Rendered in real Chrome over Chrome DevTools Protocol at real (not virtual) time, so every frame
below is a genuine paint at a chosen moment. *(The in-app Browser pane could not be kept displayed
for this session — a hidden pane does not render — so CDP was used instead. Both agree on computed
styles.)*

### 390
- **Initial:** dark hero, ivory H1 on three lines, both CTAs full-width and stacked, the population teased at the fold.
- **Event:** the figure enters view at once at 844px tall, so the resolve fires on arrival; the lattice ripples and the marks travel into the four named rows.
- **Resolved:** the Phase C narrow hero exactly, then the dark departure band with the carrier square landed beside the statement.
- **Chapters:** friction — three runs, three ticks stacked into one broken vertical, caption beneath. System — `Measure` open at 1.5rem with `Capture`/`Convert` as a compact dim index, vertical chain with the qualified-enquiry point in tangerine. Close — 17px arrival marks, stacked CTAs.
- **Rhythm:** calm → one event per screen → calm. Nothing competes.
- **Result: PASS.**

### 860
- **Initial:** dark hero, single column, stage beneath the copy, 440-mark lattice.
- **Event:** resolve on arrival (<900px uses the on-view path), surface inverts.
- **Resolved:** matches the Phase C MEDIUM composition.
- **Chapters:** the CCM sequence plays once and rests on `Measure`; keyboard Home/End verified here.
- **Rhythm:** good. The stage list and the chain read as one object.
- **Result: PASS.**

### 1425
- **Initial:** dark ink hero, the H1 at full display scale, the lattice as an anonymous field of 15 rows × 30 columns, `Traffic` pressed, the emphasis mark under *traffic*.
- **Event:** ripple at 420ms, resolve at 1450ms; the marks travel and the surface lightens.
- **Intermediate:** see **FINDING P1** — a ~125 ms low-contrast band at the crossfade's mid-point.
- **Resolved:** the Phase C hero plus the approved emphasis mark under *enquiries*.
- **Chapters:** departure carrier lands; friction runs draw at their own lengths, hold, then all three outcomes travel into one column and the tall rule and its label appear; the chain descends and draws, and Capture → Convert → Measure changes which points are the subject; the accountability chapter is still; the close's five marks land.
- **Rhythm:** the page reads as **calm → event → calm**. Motion explains the argument at every point it appears, and there is no decoration.
- **Result: PASS, with P1 recorded.**

### FINDING P2 — chain label collision at WIDE (PRE-EXISTING)

At 1425 the WIDE drawing's boundary label **"WE ANSWER FOR THIS MUCH"** overlaps the tail of
**"arrived with no usable trail"**. Both `<text>` elements keep the approved prototype's exact
coordinates (`x=616,y=61` and `x=862,y=58` in a `0 0 1000 216` viewBox) and Phase C's exact font
attributes; Phase D added only `className` and custom properties to them.
**Classification: PRE-EXISTING — present in Phase C and in the approved prototype. Not introduced
here, not fixed here** (fixing it would move approved figure geometry, which is outside this phase).
**Deferred** with F10 — see §16.

---

## 15. Reduced motion, and the no-JS static regression

### Reduced motion — it resolves, it does not freeze

**Verified rendered with `prefers-reduced-motion: reduce` emulated.** The client leaves never write
a start state at all in this mode, so almost nothing depends on the CSS block; that block exists so
that a preference changed *mid-sequence* also lands composed rather than freezing halfway. Note it
cancels **delay** as well as duration — `globals.css` collapses duration only, which would still
have left a 900ms wait before a mark appeared.

Measured on the rendered page at 1425:

| Check | Value |
|---|---|
| Hero state | `enquiries` — opens resolved |
| Lattice | `display: none` — **never shown** |
| Pre-paint attribute | `null` — the script did nothing |
| Chain | no `data-rsv` — **no descent**; `data-stage="3"` — rests on the final reading |
| Tabs | 3 present and operable |
| Panels | `true,true,true` open · `inert` = `false,false,false` |
| `.rsv-rv` / friction / departure | no start state written anywhere |
| Signature control | still works — states swap with no transition |

These are **removals, not shortenings**: the lattice is not built, the travel does not happen, the
descent does not happen, the sweep across the band does not happen. Nothing is hidden and nothing
sits mid-animation. 390, 860 and 1425 all verified.

### No-JS static regression check

Rendered with script execution disabled at 1425 and compared against the Phase C baseline:

| | Result |
|---|---|
| Hero | Light surface, `enquiries` accent-deep with **no** emphasis mark (correctly gated on `[data-state]`), `traffic` dim, both CTAs, resolved rows, `Enquiries` pressed, **no lattice** — Phase C exactly |
| Typography / spacing / chapter heights | Unchanged |
| F1 | Fully drawn, stage-1 accents on the first point and the first join |
| F2 / F3 | Aligned, rule and label present |
| Stage list | Phase C's `<ol>` with three `<h3>` headings, all three panels open, all seven links present |
| Final CTA | Five arrival marks composed, both CTAs |
| Mobile compactness | Unchanged |

**No CSS rule in `app/resolve-motion.css` hides, displaces or fades content in the absence of
`data-rsv` / `data-state` / `html[data-rsv-hero]`.** Audited rule by rule; the ungated rules resolve
to the same values Phase C already rendered (the state tokens' light values are the Phase C inline
colours, and the field's marks resolve to `opacity: 0`).

---

## 16. Content and evidence safety, shared chrome, deferred findings

### Content / evidence safety

| | |
|---|---|
| Fake counts | **None.** No numeral is animated anywhere; no counter exists |
| Fake conversion | **None.** No mark is removed, consumed or filtered; nothing shrinks |
| Fake proportional attrition | **None.** Marks are distributed evenly across the four named rows |
| Fake performance / ROI / revenue / traffic / AI-ranking claim | **None.** No such figure exists on the page to animate |
| Unsupported claims introduced by animated geometry | **None.** Both standing captions — *"kinds, not counts"* and *"no quantity, proportion, rate or duration is drawn"* — remain true of the motion as well as the static figures |
| Copy | **Not changed.** No word on the page differs from Phase C |

### Shared chrome — regression check

| | |
|---|---|
| Header non-sticky | Yes — verified rendered (it scrolls away) |
| Services direct link | Present |
| `/contact` primary header CTA | Present |
| Mobile navigation | Intact (burger at ≤1080) |
| Footer `/contact` primary, booking secondary | Unchanged |
| Button shadow | Still removed |
| Files changed | **None.** `components/layout/Header.tsx` and `Footer.tsx` are untouched |

### Deferred — F10, the double close

The Phase B footer renders its own dark *"Ready to Make Your Marketing Measurable?"* CTA block
immediately after the homepage's tangerine close, so the page presents two closes in succession.
**Re-confirmed rendered at 390 in this session.**
**Classification: PRE-EXISTING SHARED-CHROME / COMMERCIAL COMPOSITION ISSUE. Out of Phase D scope.
NOT changed in this phase.** Deferred to the shared-commercial / launch-polish phase.

### Deferred — the full list carried forward

| ID | Finding | Classification | Deferred to |
|---|---|---|---|
| **F10** | Footer CTA block immediately follows the homepage close | Pre-existing shared chrome | Shared-commercial / launch polish |
| **P1** | ~125 ms low-contrast band at the hero crossfade's mid-point | Inherited from the approved prototype | Orchestrator decision; motion design, not translation |
| **P2** | WIDE chain label collision (`WE ANSWER FOR THIS MUCH` / `arrived with no usable trail`) | Pre-existing (Phase C and the prototype) | Figure-geometry pass |
| **D1** | The prototype's "lift this claim" evidence disclosure is **not** implemented; the content stays permanently open | Deliberate Phase D deviation — composed-open shows more and hides nothing | Orchestrator decision |
| **D2** | Stage headings are `<h3>` pre-hydration and `role="tab"` after | Deliberate — preserves the no-JS baseline and avoids dead buttons | — |

---

## 17. Builds

| | Standard | cPanel |
|---|---|---|
| Command | `npm run build` | `npm run build:cpanel` |
| Result | **PASS** | **PASS** |
| Routes | **24** | **24** |
| Warnings | Pre-existing multiple-lockfile workspace-root warning only — identical to Phases A/B/C | Same |
| Memory ceiling | untouched | **512 MB, unchanged** |

`next-env.d.ts` and `tsconfig.tsbuildinfo` picked up the same one-line build churn Phases A–C
documented; both were restored with `git restore` before staging and confirmed clean afterwards.

---

## 18. Rollback boundary

Phase D is **one commit** containing 14 files — 5 new, 8 modified, plus this document.

- **Full rollback:** `git revert <commit>` restores the Phase C homepage exactly. The five new files
  are deleted and the eight modified components return to their Phase C form.
- **Partial rollback (motion only, keep the structure):** delete the `@import './resolve-motion.css'`
  line from `app/globals.css`. Every `.rsv-*` class becomes inert and the page renders as Phase C,
  because no start state exists outside that file.
- No data migration, no schema change, no route change outside `/`, no shared-chrome change, no
  form, analytics, robots or sitemap change. No other route imports anything added here.

## 19. What a worker may claim from this document

**Claimed (MEASURED / rendered):** both builds pass · 0px horizontal overflow at all nine required
widths *with motion active, after a full scroll-through* · the no-JS page is the Phase C page ·
0 animations running and 0 infinite animations after a full scroll to the bottom and back · exactly
one scroll listener · the reduced-motion page composes every resolved state and hides nothing · the
tablist's roving `tabindex`, Home/End and `inert` behave correctly · a hidden tab composes
everything and nothing replays · removing `IntersectionObserver` composes everything · the motion
budget is within the `DEC-019` ceiling on the rendered page.

**Not claimed:** any gate is passed (gate-passing is reserved to the orchestrator) · real-device or
cross-browser testing · screen-reader testing with an actual AT · Core Web Vitals or field
performance · anything about the live site · print or 200%-zoom testing · any user testing ·
that P1 or P2 have been resolved.
