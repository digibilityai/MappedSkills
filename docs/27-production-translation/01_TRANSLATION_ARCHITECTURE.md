# Session 21 — Translation Architecture, Tokens and Responsive System

**Session:** 21 · **Date:** 2026-09-04 · **Branch:** `test_branch`
**Status:** **PLANNING ARTEFACT — PROPOSED. Nothing implemented.**
**Governed by:** `DEC-018` · `DEC-019` · `docs/24-resolve-governance/00_ACTIVE_DIRECTION.md` ·
`docs/24-resolve-governance/02_RESOLVE_MOTION_BUDGET.md` ·
`docs/26-resolve-homepage/prototype/index.html` (the approved baseline).

---

## 1. The translation principle

> **The prototype proves the experience. It does not prescribe the implementation.**

Production must preserve visual hierarchy, composition, IA, the CAPTURE → CONVERT → MEASURE
system, the Resolve signature behaviour, meaningful motion, state semantics, evidence honesty,
quantity safety, responsive hierarchy, accessibility, no-JS and reduced-motion meaning,
performance, and the conversion architecture.

It must **not** preserve: a single 1,645-line HTML file, an IIFE, `[].slice.call`, ES5 syntax,
`document.querySelector` string plumbing, or inline `<style>`. Those were correct for a
self-contained prototype and are wrong for a Next.js application.

**Three tests to apply to every translation decision:**

| Test | Question |
|---|---|
| **Meaning** | Does the rendered result carry the same commercial meaning to a reader? |
| **Floor** | Does it still hold with JavaScript off and with reduced motion on? |
| **Budget** | Does it keep the tier counts in `02_RESOLVE_MOTION_BUDGET.md` §5? |

If all three pass, the technique is free to differ from the prototype.

## 2. Where the design system lives

**One source of truth: `app/globals.css`, under Tailwind v4's `@theme`.** No `tailwind.config.ts`
is introduced — the project is already CSS-first and adding a JS config would create a second
source of truth for the second time.

**`lib/design-system.ts` is retired.** It is the *existing* second source of truth (it hard-codes
`#C41E3A`, `#0F0F0F`, Montserrat, Inter and a `mono` stack) and carrying it forward guarantees
drift. Anything still importing it moves to CSS variables.

Layering:

```
app/globals.css
  @import 'tailwindcss'
  :root            → the Resolve primitives (raw values, semantic names)
  @theme           → the Tailwind bridge (--color-*, --font-*, --breakpoint-*)
  @layer base      → element defaults, deliberately minimal
  @layer components→ the small set of Resolve primitives that are genuinely global
```

Everything else is a component.

## 3. The light-first flip — the highest-risk single change

`app/layout.tsx` hard-codes `className="dark"` on `<html>`, and `globals.css` carries a
20-selector repair block that exists **only** because light Tailwind surfaces sit on a dark token
set (`00_REPOSITORY_AUDIT.md` §3.1).

**Decision: flip globally, once, in Phase A, and delete the repair blocks in the same change.**

**Why not scope the flip to Resolve pages only.** Two ground colours in one application means
every shared component (Header, Footer, Button, Input, Card) needs two correct appearances for the
whole rollout window. That is a permanent maintenance tax to defer a one-off risk, and THE RESOLVE
is the **site-wide** direction, not a homepage treatment.

**What the flip must do in one atomic change:**

1. Remove `dark` from the `<html>` className in `app/layout.tsx`.
2. Add `color-scheme: light` on `html` — the prototype declares it explicitly so a browser in
   forced-dark does not invert the direction. **This is load-bearing, not cosmetic:** the dark hero
   stage is a *counted inversion inside a light page* and must not become the page.
3. Delete the `.bg-white, .bg-ms-light, .bg-red-50 …` repair block.
4. Delete the `html.dark .dark\:bg-*-950\/20` counter-block.
5. Replace `:root` / `.dark` token pairs with the single Resolve `:root` set.
6. Leave `next-themes` and `components/theme-provider.tsx` unmounted (they already are). **No dark
   mode is offered.** Removing the dependency is optional cleanup, not a rollout dependency.

**Acceptance:** every one of the 21 existing routes renders legibly at WIDE and NARROW with
**0 contrast failures**, measured — not eyeballed — before Phase B starts. This is the one place
where a full-route sweep is mandatory rather than page-by-page.

## 4. The token system

All values below are read from `docs/26-resolve-homepage/prototype/index.html` and
`00_ACTIVE_DIRECTION.md` §4. **The ramp is preserved because of measured contrast, not taste.**

### 4.1 Ground and ink

| Token | Value | Role |
|---|---|---|
| `--ms-ivory` | `#F7F3EC` | the body ground — **light-first** |
| `--ms-paper` | `#FFFDF9` | raised light surface |
| `--ms-ink` | `#141219` | type and structure |
| `--ms-ink-2` | `#0F0D14` | the substrate beneath a dark surface |
| `--ms-rule` | `#2C2833` | rules **on** a dark surface |
| `--ms-line` | `#DED6C8` | rules on light |

### 4.2 The accent — one, and its contrast ramp

| Token | Value | Where it is legal |
|---|---|---|
| `--ms-tang` | `#FF5B04` | fills, marks, and **text on the dark ground only** |
| `--ms-tang-ink` | `#D94400` | graphical objects and **display** text on light (3.97:1) |
| `--ms-tang-sm` | `#A83400` | **small** text on light — clears 4.5:1 |

**No second accent. No amber. No decorative gradient of any kind.**
The three steps are one mark at three sizes; a linter-style review should reject `--ms-tang` used
for small text on ivory.

### 4.3 The state registers

| Token | Value | Meaning |
|---|---|---|
| `--ms-dim` | `#5C5665` | the **traffic** register — anonymous, undifferentiated |
| `--ms-gap` | `#8E8798` | **not measured / unattributed** |

### 4.4 Honesty fills — retained, and protected

```css
--ms-fill-unmeasured: repeating-linear-gradient(90deg,
    currentColor 0 5px, transparent 5px 10px);   /* 5-on / 5-off  */
--ms-fill-untestable: repeating-linear-gradient(45deg,
    currentColor 0 2px, transparent 2px 5px);    /* 45° hatch     */
```

> **These are pattern fills that encode an epistemic state, not colour gradients.** `DEC-018` §4.6
> is explicit: they must not be stripped by anyone "removing gradients". The prohibition is on the
> **decorative** gradient — a wash, a mesh, a glow, a fade used as atmosphere.

### 4.5 Typography

| Token | Value |
|---|---|
| `--ms-font-display` | `var(--font-bricolage), ui-sans-serif, system-ui, "Segoe UI", sans-serif` |
| `--ms-font-body` | `var(--font-manrope), ui-sans-serif, system-ui, -apple-system, sans-serif` |
| **monospace** | **none. The token is deleted, not redefined.** |

Loaded through `next/font/google` exactly as Montserrat/Inter are today — self-hosted, preloaded,
`display: 'swap'`, exposed as CSS variables on `<html>`. **Bricolage Grotesque is a variable font
and must be subset to `latin` and to the weights actually used (800 for display).**

Display type: `font-weight: 800`, `letter-spacing: -0.035em`, `line-height: .95`.
Body: `1.0625rem` / `1.6`.
Every size is `clamp()`-driven — **the prototype has no fixed breakpoint type ladder and
production must not invent one.**

### 4.6 Spacing, widths, measure

| Token | Value | Role |
|---|---|---|
| `--ms-pad` | `clamp(18px, 3.4vw, 56px)` | the gutter |
| `--ms-wrap` | `min(1400px, 100%)` | the page container |
| `--ms-measure` | `58ch` | the **hard cap** on body copy |
| — | `44–46ch` | ledes |
| — | `52ch` | figure legends and notes |

> **`.wrap` is `1400px`, not the current `max-w-7xl` (1280px).** Container width is a translation
> change, not an accident, and `components/layout/Container.tsx` must be updated rather than
> worked around per section.

Section rhythm is per-chapter `clamp()`, replacing the global `section { @apply py-16 }`.

### 4.7 Radii

**There is no radius scale.** CTAs are pills (`border-radius: 100px`); focus rings use `2px`;
figures and rules are square. The current `--radius: 0.75rem` system survives **only inside
`components/ui/*` where a shadcn primitive still uses it** — it is not a Resolve token.

### 4.8 Motion — two easings, four timings, and nothing else

| Token | Value | Tier |
|---|---|---|
| `--ms-e-state` | `cubic-bezier(.65,0,.35,1)` | a state changes |
| `--ms-e-arrive` | `cubic-bezier(.2,.85,.25,1)` | something arrives |
| `--ms-t-micro` | `180ms` | T4 |
| `--ms-t-state` | `620ms` | T2 |
| `--ms-t-resolve` | `900ms` | T1 |
| *(T3 range)* | `420–620ms` | transitions |

**No per-component easing.** A component introducing a third easing is a defect.

### 4.9 Interaction and z-index

- **Interaction target floor: 40×40 CSS px**, everywhere, verified by measurement, not by
  intention. The prototype achieves it on small controls with an invisible centred `::after`
  extender; **adjacent extenders must not overlap**, or one control steals a neighbour's tap.
- **z-index policy — four values, no more:** `0` flow · `60` header · `100` mobile nav panel ·
  `200` skip link. The prototype uses exactly these. Anything else is a smell.
- **`position: fixed` and `position: sticky` are budgeted at 0** on Resolve surfaces (§6).

## 5. Responsive translation

### 5.1 The conceptual classes, and what they mean

| Class | Meaning |
|---|---|
| **WIDE** | Two-column compositions; the hero stage sits beside the copy; F1 is horizontal |
| **MEDIUM** | Single column; the stage moves below the copy; F1 takes a **genuine vertical form** |
| **NARROW** | Mobile re-composition per Session 18C; the hero owns the first viewport and the population is *teased* at the fold |

### 5.2 Proposed production breakpoints

The prototype's breakpoints are **semantic, not arbitrary** — each marks a point where a
composition stops working. They do not align with Tailwind's defaults (640/768/1024/1280), and
**adopting Tailwind's defaults would silently move validated thresholds.**

**Recommendation: declare Resolve breakpoints as named `@theme` tokens and use them for all
Resolve surfaces. Leave Tailwind's default scale untouched for `components/ui/*`.**

| Name | Value | What it governs — and why it is that number |
|---|---:|---|
| `--breakpoint-ms-nav` | `1081px` | Inline six-item nav ↔ single menu control. **Validated at 1080/1081** |
| `--breakpoint-ms-wide` | `1100px` | F1 wide drawing |
| `--breakpoint-ms-med` | `700px` | F1 medium drawing (`700–1099`) |
| `--breakpoint-ms-align` | `900px` | The friction alignment and outcome rule |
| `--breakpoint-ms-narrow` | `760px` | **The Session 18C mobile de-clutter boundary.** Every 18C change lives inside `max-width: 760px`, and desktop was verified byte-for-byte unchanged |
| `--breakpoint-ms-split` | `1000px` | Two-column splits (boundary, footer 4-col) |
| `--breakpoint-ms-pair` | `820px` | Symptom pair columns |
| `--breakpoint-ms-fit` | `900px` | Fit two-column |

**Class mapping:** **WIDE ≥ 1081** · **MEDIUM 761–1080** · **NARROW ≤ 760**.

> **Do not collapse these to three breakpoints.** F1's drawing switch (700/1100) is a *different
> axis* from the nav switch (1080) and the de-clutter switch (760). Collapsing them will produce
> the Session 17C defect where **more than one F1 drawing renders at once** — a defect that was
> found by measuring rendered widths, and which the approved page does not reproduce.

**Target floor: 360px.** Validated widths are **360, 390, 430, 760, 761, 860, 1080, 1425** — this
is the regression set, and it is deliberately dense around each threshold.

### 5.3 What must survive recomposition

- The **block order never changes** — the order is the argument.
- Every major event has a **narrow-native form**; none degrades into a paragraph.
- **≥ 40×40** targets at every width (measured: 0 under-floor at all eight widths).
- **Zero horizontal overflow** at every width.
- **Hero owns the first viewport on NARROW**; the stage begins at ~651px so the population is
  teased at the fold rather than competing with the headline.
- **The footer is two columns on mobile**, not four stacked — it was 21% of the mobile page before
  18C.
- **The boundary chapter is never collapsible at any width.**
- **The friction alignment exists on mobile** (restored in 18A after 18 switched it off below
  900px).

## 6. Standing prohibitions for production

Carried verbatim in force from the governance, restated here so an implementer meets them:

| # | Prohibited |
|---|---|
| 1 | Ambient motion of any kind. **0.** |
| 2 | Pinned or scroll-scrubbed sequences. **0.** |
| 3 | Looping / `infinite` animation. **0.** |
| 4 | `position: fixed` / `position: sticky` on Resolve surfaces. **0.** |
| 5 | Canvas, WebGL, autoplay video, animation libraries. **0.** |
| 6 | Monospace, anywhere. |
| 7 | Decorative colour gradients — wash, mesh, glow, atmospheric fade. |
| 8 | `box-shadow` as a surface device. |
| 9 | A second accent colour. |
| 10 | A quantity, width, bar or magnitude that is not a measured fact. |
| 11 | Fabricated proof, client result, testimonial, logo, award or metric. |
| 12 | A replaying resolve. Once resolved, it stays resolved. |
| 13 | Scroll hijack, gating, or a CTA made unreachable by a sequence. |
| 14 | F1 as a logo, watermark, divider, loader or page-transition. |
| 15 | Any taper on F1 — a taper makes it a funnel. |
