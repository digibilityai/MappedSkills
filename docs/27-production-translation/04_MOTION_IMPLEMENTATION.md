# Session 21 — Motion Implementation Plan

**Session:** 21 · **Date:** 2026-09-04 · **Status:** **PLANNING ARTEFACT — PROPOSED.**
**Binding budget:** `docs/24-resolve-governance/02_RESOLVE_MOTION_BUDGET.md` (`DEC-019`).
**Validated ceiling for the homepage: T1 = 1 · T2 = 2 (of 3) · T3 = 4 · signature = 1 · tablist = 1
· ambient = 0 · pinned = 0.**

> **4 is the validated CEILING, not headroom.** A fifth T3 is a budget breach exactly as a fourth
> was before the `DEC-019` reconciliation.

---

## 1. Does the stack need an animation library? No.

**Determined, not assumed.** Every behaviour on the approved page is one of:

| Mechanism | Count in the prototype |
|---|---|
| CSS transition on `transform` / `opacity` / colour tokens | all of them |
| `IntersectionObserver` to add a class once | 7 registrations |
| One `rAF`-throttled `scroll` handler writing 2 properties | 1 |
| `setTimeout` for staged sequences | 4 |

**Framer Motion would add ~35–50 KB gzipped to solve a problem the platform already solves**, and
its idioms (layout animation, `AnimatePresence`, spring physics) map to **nothing** in a two-easing,
four-timing system. It would also make every animated chapter a client component, which is exactly
what §5 avoids.

**Recommendation: add no animation dependency.** If a later archetype genuinely needs one, that is
a new decision with its own reasoning — not a default.

## 2. The one shared primitive

Everything on-view goes through a single hook, so the robustness floor cannot be forgotten
per-component. It reproduces the three mechanisms the prototype added in Session 18 §6:

```ts
// hooks/use-resolve-on-view.ts   ('use client')
// 1. fires once, never replays          (M5, and the __seen flag)
// 2. ALSO forced after 4s from load     (an IO does not run in a hidden/throttled tab)
// 3. visibilitychange resumes COMPOSED, never displaced
useResolveOnView(ref, onEnter, { threshold, forceAfterMs: 4000 })
```

**Non-negotiable contract:** the callback may only **add** a class or **remove** an inline start
state. It may never inject DOM, text, links or figures.

A second hook, `useReducedMotion()`, wraps `matchMedia('(prefers-reduced-motion: reduce)')` and is
read **before** any start state is written.

## 3. The four live T3s, plus T1, T2 and the controls

| # | Behaviour | Tier | Semantic purpose | Technique | CSS enough? | IO? | rAF? | Client boundary | Reduced motion | No-JS | Risk |
|---|---|:--:|---|---|:--:|:--:|:--:|---|---|---|---|
| 1 | **Hero resolve** — the lattice becomes named objects and the surface inverts | **T1** | *The same population, resolved.* The site's one idea | Build ≤440 `<i>` after first paint; CSS-grid positioned; per-mark `--tx/--ty` measured from the **real geometry** of the resolved rows; staggered `transitionDelay` `(i%17)*11ms`; `transform`+`opacity` only | No — targets need measurement | WIDE: timer at ~1.45s. **NARROW: on-view**, because the stage sits below the fold and must not play to an empty screen | No | `ResolveField` + `ResolveStage` | **Skipped entirely.** Page opens **resolved**, lattice never built | Opens resolved; named objects present | **MEDIUM** — 440 nodes; see `07_VALIDATION_GATES.md` §7 |
| 2 | **Hero departure** — the resolved stage drifts up and fades | **T3** | Joins two chapters | One `scroll` listener, `{passive:true}`, `rAF`-throttled, writing exactly `transform` + `opacity` on **one** element | No | No | **Yes — justified.** Scroll-linked position cannot be expressed in CSS without `scroll-timeline`, whose support is not yet assumable | `ResolveStage` | Not attached | Stage simply stays put | **MEDIUM** — main-thread scroll work |
| 3 | **Departure carrier** — band wipe, tangerine square arrives, line follows | **T3** | Joins two chapters | `.on` class → finite `@keyframes` (`pass`), `both`-filled | **Yes** | Yes (0.45) | No | none (class added by a tiny client wrapper) | Composed, no transition | Composed | **LOW** |
| 4 | **Friction alignment** — three outcomes travel into one column, a rule is drawn | **T2** | *Three causes, one indistinguishable result* | **The aligned state is the CSS default.** JS writes the *start* displacement inline, then releases it on a **`setTimeout`, never `rAF`** | No | Yes (0.35) | **No — deliberately** | `FrictionRuns` | Never displaced; rule shown | Aligned, rule drawn | **MEDIUM** |
| 5 | **The re-read** — six rows travel and change state across three readings | **T2** | *The meaning changed, so the population reorganised* | Class/data-attribute swap on a container; rows transition `transform` + tokens. Two `setTimeout`s at 2100/4200ms, cancelled by `autoStage=false` on any user selection | **Yes** | Yes (0.25) | No | `SystemStages` | `setStage(3)` + **all panels open**, nothing `inert` | All three panels open, all 7 links visible and tabbable | **MEDIUM** |
| 6 | **Chain descent** — F1 scales from 0.44/0.42 to full while the chain draws | **T3** | **Changes the reader's distance from an object** | `.on` → `transform: scale()` + `opacity` + `stroke-dashoffset` draw | **Yes** | Yes (0.2) | No | none | Composed at full scale, drawn | Composed at full scale, drawn | **LOW** |
| 7 | **Close arrival** — five marks land and stop (one of them **open and dashed**) | **T3** | Changes what the object means | `.on` → staggered `transform`+`opacity` | **Yes** | Yes (0.28) | No | none | Composed | Composed | **LOW** |
| 8 | **Traffic ↔ Enquiries** — the signature interaction | signature | Puts the report an agency shows beside the one we report | `data-state` on the hero; the two-state surface re-resolves tokens. `aria-pressed` on both buttons | **Yes** | No | No | `TrafficEnquiriesControl` | **Still works** — states swap with no transition | Control absent; page shows the **resolved** state | **LOW** |
| 9 | **Stage tablist** — progressive disclosure | control | Changes *which part of a structure is under examination*. **Not a second signature** | Roving `tabindex`, arrows + Home/End, `inert` on collapsed panels | **Yes** | No | No | `SystemStages` | All panels open, none `inert` | All panels open, all links tabbable | **MEDIUM** — a11y-sensitive |
| 10 | **`.rv` reveals** | *not counted* | Composition — opacity + 24px translate, **no meaning attached** | `.on` class | **Yes** | Yes (0.12) | No | none | Composed | Composed | **LOW** |
| 11 | **Micro** — CTA `translateY(-3px)`; capability hover | **T4** | *The system answered you* | CSS `:hover`/`:active`, `--ms-t-micro` | **Yes** | No | No | none | none | n/a | **LOW** |

**Live T3 count: 4** — rows 2, 3, 6, 7. **The boundary chapter is intentionally still.**
`.rv` reveals are **not** T3 (`02_RESOLVE_MOTION_BUDGET.md` §5.0: a transition that merely makes a
section appear is composition).

**A fifth boundary transition documented in Sessions 18–18C had never rendered** (its selector was
`.bound.on` while the element only ever carried `class="sec sec--tight"`). It was **removed, not
repaired**, in 19A. **Do not reintroduce it in production.**

## 4. Client-boundary strategy

**Five client leaves on the homepage, and no more:**

`ResolveHeader` · `ResolveStage` (with `ResolveField` + `TrafficEnquiriesControl`) ·
`FrictionRuns` · `SystemStages` · `EvidenceDisclosure`.

Rows 3, 6, 7 and 10 need only *"add a class when this scrolls into view"*. That is one shared
2-line client wrapper (`<OnView className="on">`), not four client chapters.

**Everything else on the page is a server component**, including all copy, all links, the
boundary, capabilities, fit, and the entire F1 DOM.

## 5. Reduced motion — it resolves, it does not freeze

`prefers-reduced-motion: reduce` means the page **opens in the resolved end state**:

- The lattice is **never built**; the hero starts on `enquiries`.
- The departure is **removed**, not played instantly.
- Every act, drawn rule, claim reveal and CTA mark is shown **complete**.
- **All three stage panels are open and nothing is `inert`.**
- **The signature control still works** — states swap without transition.

Session 19A additionally fixed a **reduced-motion contrast failure of 2.66:1 against a 3:1 floor**.
Reduced motion is a **rendered mode that must be contrast-tested**, not a CSS afterthought.

## 6. Performance rules for motion

- Animate **`transform` and `opacity` only**. No layout-triggering property, ever.
- The lattice is a **one-off transition, not a running animation** — no steady-state cost.
- Build it **after first paint**; skip under reduced motion.
- **At most one `rAF`-throttled scroll handler per page**, writing at most two properties.
- **Off-screen is still.** Nothing animates that a reader cannot see.
- `will-change` only on the hero stage, and **removed when the transition ends**.
- Debounced (180ms) `resize` re-aims the lattice; **`{passive:true}` on both listeners**.
- **Real-hardware profiling is a prerequisite to implementation** (`02_RESOLVE_MOTION_BUDGET.md`
  §8). The prototype's 440 cap is **evidence, not a production limit**.

## 7. Anti-tic rules, restated as production checks

| Rule | Production check |
|---|---|
| **M1** | No two consecutive regions run the same resolve gesture |
| **M2** | One T1 per page — `grep` the codebase: `ResolveField` may be mounted once |
| **M3** | A gesture may not be reused for a different meaning; a new gesture may not be introduced to dodge a budget |
| **M4** | ≥ ~1s between consecutive T1/T2 events |
| **M5** | Every T1/T2 fires **once per page load**, on entering view, never replays |
| **M6** | Mandatory stillness: reading-heavy regions · after every T1/T2 · off-screen · **and on every conversion surface — `/contact`, `/schedule-call`, `/thank-you` carry zero figures and zero resolves** |
| **M7** | **Budget overage is a defect, not a judgement call.** Count tiers on the *rendered* page |
