# MappedSkills UI Revamp — Gate 4: Motion Design Specification (4H)

| | |
|---|---|
| **Date** | 2026-10-08 |
| **Status** | **PLANNING ONLY. No animation is implemented in this phase.** Signature moments beyond the homepage need owner approval |
| **Governing sources** | Master Handoff "Motion Design System"; THE RESOLVE `DEC-018` §4 (no ambient motion, no looping animation, no sticky elements); `DEC-031` (no data motion that implies results); `DEC-035` decision 2 (auto-advancing tablist retired) |
| **Reference implementation** | `components/direction-c/Motion.tsx` (`DcMotion`), `components/direction-c/HeroStage.tsx`, motion tokens and transitions in `app/direction-c*.css` |

Motion language (Master Handoff): **Performance · Optimisation · Progress · Measurement · Precision · Clarity.**
Its job here: show **resolution** (the same population, resolved) and **measurement** (a join being recorded). It never
decorates.

---

## 1. Inventory (VERIFIED, `23c937d`)

| Item | Layer | Where | Behaviour |
|---|---|---|---|
| `HeroStage` | L4 signature (T1) | `/` | Dark traffic field → light enquiries. A pre-paint script makes the dark stage the first paint; resolves ~900ms after load (≥900px) or on view (<900px, D12). Toggle with `aria-pressed`; forced-colours state (A2) |
| `DcMotion` | L2 scroll | `/`, `/services`, `/seo` | Every `[data-dc-motion]` element **below the fold at hydration** gets `dc-pre`, removed once at 35% visibility (+120ms). Nothing loops or pins; resolved stays resolved; no-JS, reduced motion and print are always composed |
| Chrome transitions | L1 micro | global | Buttons and marks 180ms; Services panel opacity 180ms + transform 420ms; menu bars 180ms; chevron rotate |
| Legacy `resolve-motion.css` + `components/homepage/*` | — | **retired homepage, not rendered since Gate 2** | 558 lines still `@import`ed by `globals.css` on every route (WORKING HYPOTHESIS: no remaining consumer; verify in B11) |
| Libraries | — | — | **None.** No GSAP, Motion/Framer Motion, Lenis, Lottie or WebGL in `package.json` (VERIFIED) |

**Tokens** (`app/direction-c.css`): durations `--dc-d-fast` 180ms · `--dc-d-standard` 420ms · `--dc-d-state` 620ms ·
`--dc-d-expressive` 900ms; easings `--dc-e-state` `cubic-bezier(.65,0,.35,1)` (state changes) and `--dc-e-arrive`
`cubic-bezier(.16,1,.3,1)` (arrivals). The Master Handoff's "Instant / Fast / Standard / Expressive" categories map onto
these, with **Instant = 0ms** (no transition) for anything a keyboard user triggers repeatedly.

---

## 2. Principles (binding for every Gate 4 batch)

1. **The server-rendered state is the final state.** Motion may only add a temporary pre-state on the client, after
   hydration, to elements that are below the fold. No-JS, reduced motion, failed hydration, print and screenshots all show
   the composed page.
2. **Motion explains a structure or a change of state. It never introduces text.** Headings, body copy, CTAs and navigation
   never animate in. (This excludes the Master Handoff's "repeated generic fade-ups" by construction.)
3. **Transform, opacity and colour only.** No animated layout property, `filter`, `box-shadow`, `clip-path` on large areas,
   or `height: auto` tricks. Space is reserved for the final state, so motion cannot cause CLS.
4. **Once.** Nothing loops, nothing auto-advances, nothing re-animates on scroll-back.
5. **No numbers move.** No counters, tickers or animated totals, even for verified figures. A number appears composed,
   with its scope beside it (`DEC-031`, `DEC-035` plate rules).
6. **Nothing is gated behind motion or a control.** All content is present and readable without interacting (`DEC-035` decision 2).
7. **No dependency** unless §8's evidence test is met.

---

## 3. Layer 1 — micro-interactions (hover, focus, press)

| Element | Hover | Focus | Press / state | Duration |
|---|---|---|---|---|
| `dc-btn` | fill/border colour; the mark scales to 1.25 (primary) or fills tangerine (secondary), as implemented | 3px outline, no transition (the mark change also shows on `:focus-visible`) | — | fast (180ms) |
| `dc-tlink` / inline link | underline 1.5→3px; colour to `--dc-tang-small`; arrow `translateX(3px)` | outline | — | fast |
| Nav link | colour | outline | `aria-current` underline, static | fast |
| Disclosure (`details`, Services) | colour | outline | chevron rotate; panel opacity + `translateY(-4px→0)` | fast / standard |
| Table / entry rows | row rule darkens to `--dc-control` | outline on the row link | — | fast |
| Form fields | — | outline + boundary `--dc-ink` | error state is static (no shake) | 0ms on error appearance |
| Toggle (`aria-pressed`) | — | outline | fill + border (forced-colours safe) | fast |

Layer 1 is **already implemented** for the chrome and the approved routes; Gate 4 reuses it and adds rows only for new components. Rules: **focus indication never animates** (it must appear instantly); hover effects must not be the only cue for anything.
Touch devices get no hover-dependent affordance.

## 4. Layer 2 — scroll reveals (restricted)

**How the approved routes do it (VERIFIED):** `data-dc-motion` sits on a **container** (the close section, the friction
list, the chain figure), but the `dc-pre` rules in `app/direction-c-pages.css` (lines ~352–358) move only **marks, lines,
joins and the boundary rule**. No text node is ever hidden or displaced. Gate 4 keeps that pattern.

**Allowed pre-state targets:** non-text graphic parts of structural figures and evidence objects — chain lines and joins,
marks, `Figure` graphics, `Sequence` spines, `DataTable` rules, `Compare` dividers, `Plate` boundary rules, `ServiceBands`
bars, and the marks in `Close`.

**Not allowed as pre-state targets:** any text (headings, labels, statements, body, captions, table cells), CTAs, nav,
footer, form fields, entry rows, prose.

| Parameter | Rule |
|---|---|
| Trigger | `DcMotion`: below the fold at hydration; 35% visible; +120ms. Do not change the shared observer per route |
| Pre-state | `opacity ≥ .0` and translate ≤ 16px desktop / ≤ 10px below 600px; or `scaleX(0)` for a line that draws |
| Duration | standard (420ms) for objects; state (620ms) for a line draw; expressive (900ms) only for a route's signature |
| Stagger | ≤ 110ms per item, ≤ 4 items (≤ 330ms total), as in the homepage legend |
| Budget per route | ≤ 6 reveal targets on a route; ≤ 1 per section |
| Reduced motion | none (the existing early return) |
| Mobile | same targets; shorter travel; no expressive durations below 600px except the homepage stage |

## 5. Navigation and section transitions

| Candidate | Decision | Reason |
|---|---|---|
| Route (page) transitions, incl. the View Transitions API | **Not in Gate 4** | No comprehension gain; interacts with App Router focus management and scroll restoration; risk of perceived delay on the conversion path. Revisit only with evidence |
| Mobile menu open/close | Keep the current behaviour (in-flow panel; bars → cross 180ms). No slide-in drawer | A drawer would add a fixed/overlay element (`DEC-018` §4.5) |
| Services panel | Keep (opacity 180ms + translate 420ms; `visibility` timed so the panel is `inert` and invisible when closed) | Approved at Gate 3 |
| Section transitions | **By surface, not animation**: ground ↔ paper ↔ ink ↔ tangerine with a 1px rule. ≤ 2 inversions per route | The surface change is the transition; no scroll-linked colour morphing |
| Smooth scrolling for in-page anchors | `scroll-behavior: smooth` **only** under `prefers-reduced-motion: no-preference`, and never on the skip link | Anchors must land instantly for reduced motion and keyboard users |

## 6. Layer 3/4 — interactive proof modules and signature moments

**Interactive proof module contract** (the `HeroStage` toggle is the model): the server renders the resolved state; the
control is a real `<button>` with `aria-pressed` or a native `<details>`; every state is reachable by keyboard; state is
visible in forced colours by shape and colour; no auto-advance; no data beyond what the static figure states.

**Signature moments: 2–3 site-wide** (Master Handoff). One exists. Candidates, each needing **owner approval** before it is
built:

| # | Moment | Route | What it shows | Status |
|---|---|---|---|---|
| S1 | Traffic → enquiries resolution | `/` | The population resolved | **Approved, implemented** |
| S2 | **The measured chain records its joins** — the chain line draws, then each join mark arrives in order, ending at the owned boundary | `/how-it-works` (`MethodChain`) | Measurement as a sequence ("each enquiry records where it came from") | Candidate. Recommended |
| S3 | Cause zones resolve into checks | `/problems/traffic-but-no-enquiries` | Diagnosis | Candidate. Optional |

Each signature: ≤ 1 per route; composed final state on the server; plays once; ≤ 1.6s end to end; reduced motion → static;
below 600px → a shortened version (line + final marks only).

## 7. Performance, hydration and CLS safeguards

| Concern | Safeguard | Check |
|---|---|---|
| CLS | Pre-states use transform/opacity only; final layout reserved | Throttled CLS ≤ 0.01 per route (target ≤ 0.001, the Gate 3 result) |
| Hydration stability | No `useState` initial value that differs from the server render; pre-state classes are added in `useEffect`, never rendered | React hydration warnings = 0 in console |
| Main thread / INP | One shared `IntersectionObserver`; no scroll listeners; no `requestAnimationFrame` loops | Long tasks during scroll on a 4× CPU-throttled 390 profile: none attributable to motion |
| JS weight | Motion code shared (`DcMotion` ~1 KB); signature modules are client islands only on their own route | Per-route JS delta reported per batch |
| Mobile | Shorter travel; fewer targets; no expressive except S1 | 390/360 runs |
| Font swap | Motion never targets display text, so the opsz swap and motion cannot compound | — |

## 8. Library policy

Add a motion library **only** if a required, owner-approved moment cannot be built with CSS transitions, `IntersectionObserver`
and the Web Animations API, **and** the measured cost is acceptable. Evidence required: a prototype without the library that
fails a named requirement; the library's gzipped size and its per-route JS impact; reduced-motion and SSR behaviour. Nothing in
§§3–6 meets that test (VERIFIED against the current implementation, which achieves S1 without one).

## 9. Verification (reusable checks; details in `GATE_4_QA_ACCEPTANCE_MATRIX.md`)

1. Reduced motion: 0 pre-state classes; no element keeps a transition > 10ms (existing Gate 2 §6 check, made route-parametric).
2. Motion on: after scrolling to the end, 0 elements remain in `dc-pre`.
3. No JS: complete page; every disclosure readable.
4. Reveal budget: count `[data-dc-motion]` per route (≤ 6). With `dc-pre` applied, every text node keeps `opacity: 1` and no transform (computed-style check).
5. CLS throttled at seven widths.
6. Print emulation: composed.
