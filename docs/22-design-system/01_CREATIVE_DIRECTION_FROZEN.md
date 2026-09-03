# THE ARRIVAL — Creative Direction, Frozen

**Session:** 16 · **Date:** 2026-09-03
**Status of the direction:** **APPROVED (`DEC-017`).** **Status of this specification:** PROPOSED.

> **The purpose of this document is to say exactly what a later session may not change, and exactly
> what it may.** Freezing too little lets the direction erode; freezing too much turns one
> prototype's incidental choices into programme law. Both failures have already happened once in
> this programme.

---

## PART 1 — BINDING

These are the direction. Changing any of them is a **new creative direction** and requires the
owner, not a designer.

### B1 — Dark-first
The site's ground is a **warm near-black**. Light surfaces exist only as deliberate, counted
inversions (`04_LAYOUT_AND_SURFACES.md` §4). **A light-first MappedSkills is a different
direction.**

### B2 — The demand / signal metaphor
Buyer demand is represented as **signals travelling through a field**. This is the site's one
visual idea. It is not decoration and it is not a background: it must participate in the
composition (`07_VISUAL_PRIMITIVES.md` §2).

### B3 — Activity versus commercial consequence
The system's job is to **visually distinguish activity from commercial consequence**. Anything that
blurs that distinction is off-direction, however attractive.

### B4 — One accent, and it means one thing
**Amber is the commercial-state accent.** It marks the moment demand becomes commercially
meaningful — caught, tagged, owned, actionable. **Amber is never decoration, never a mood, never a
brand wash, and never grades a measured result.** There is no second accent.

### B5 — Signal-state semantics
The eight states in `05_SIGNAL_SEMANTICS.md` — travelling, passed, stalled, caught, tagged,
untagged/unattributed, measured zero, not testable — have **fixed commercial meanings** and each is
distinguished by **shape as well as colour**. A state may not be reused for a different meaning and
a new state may not be invented casually.

### B6 — Commercial consequence is a state change, not a replacement
When something becomes commercially meaningful, **the same object changes state**. It is never
swapped for an unrelated illustration. This is the principle carried over from Direction B and it
is what stops the field from being an animation.

### B7 — No fabricated quantitative visuals
**Signal visuals represent KINDS and STATES, never counts, proportions or rates.** Ledger marks are
identical in length. No visual may imply a volume, a ratio, a conversion rate or a trend unless it
renders **real validated first-party data**, with its provenance and limitations attached. Any
region that shows marks carries the standing line: *"the marks are kinds, not counts — no quantity,
proportion or rate is drawn or claimed."*

### B8 — Evidence is a supporting layer
**THE RECORD is a credibility system, not the visual genre.** Evidence appears where a commercial
claim invites inspection and, wherever the approved UX permits, **on demand**. It never sets the
page's typography, geometry or atmosphere. **No monospace as an evidence register, ever.**

### B9 — Motion has roles and budgets
The five motion roles and the per-page-type budgets in `06_MOTION.md` are binding **maximums**.
Motion that cannot name its role is removed.

### B10 — Stillness is mandatory
In reading-heavy regions, after every major transformation, and whenever a visual system is
off-screen. **A resolved system is a quiet system.**

### B11 — Nothing depends on motion
Every meaning survives `prefers-reduced-motion`, a starved animation frame, and JavaScript being
off. Transformational states **resolve immediately** rather than disappearing.

### B12 — Accessibility floor
WCAG 2.2 AA contrast on all text; **no colour-only state anywhere**; visible focus on every
interactive element; no hover-only critical content; keyboard parity; comfortable target sizes.
**Creative ambition never buys an exemption** (`14_ACCESSIBILITY_AND_PERFORMANCE.md`).

### B13 — The approved upstream is not reopened by design
Strategy, positioning, IA, messaging, copy, the UX architecture, the CTA architecture, the
blocked-content rules and the F1 taxonomy are inputs, not material. **The header is non-sticky and
there is no persistent sticky sales CTA.**

### B14 — The anti-pattern register is binding
`15_ANTI_PATTERNS.md` is part of the direction, not advice. It exists because this programme has
already drifted twice — once into a document, once toward a technology demo.

---

## PART 2 — FLEXIBLE

These are **implementation decisions**. A later session may change them with reasoning, without
owner approval, provided the BINDING list still holds.

| Flexible | Constrained by |
|---|---|
| Exact field geometry — band height, horizon position, mask shape, streak length | Must read as a **designed plane**, never a scatter (B2) |
| Exact signal counts and density | Must sit inside the performance budget and must never imply a quantity (B7) |
| Exact type sizes per breakpoint | Must stay inside the stated ranges and role hierarchy (`03`) |
| Exact animation durations | Must stay inside the stated ranges per motion role (`06`) |
| Exact easing curves | Must remain two families — *move* and *state* — not a per-component zoo |
| Exact hex values | Must preserve the semantic roles and the measured contrast floors (`02`) |
| Composition of individual secondary pages | Must obey that page type's motion budget and surface rules |
| Which primitives a given page uses | Must not exceed the pattern budget or invent a new primitive without a stated need |
| Grid column ratios, gutters, section padding | Must preserve reading widths and the full-bleed rules (`04`) |
| The two typefaces | Replaceable for a **concrete technical or licensing reason**, provided the replacement holds the roles in `03` and does not reintroduce monospace |

---

## PART 3 — Deliberately still open

Recorded so a later session does not mistake silence for a decision.

1. **Light inversion.** One is permitted in principle (`04` §4) and **none is designed**. Its rules
   must be written before the first one ships.
2. **Production breakpoint numbers.** Behaviour is specified; the numbers are an implementation
   output (`13`).
3. **Dark-first reach.** Contrast passes, but comprehension in bright outdoor light and for some
   low-vision readers is **untested** and is an open risk.
4. **The canvas on real hardware.** The prototype's budget is evidence, not a production limit
   (`14` §3).
5. **The typefaces.** Approved as the working pairing; licensing, subsetting and self-hosting are
   unresolved.
6. **Secondary-page expression.** The budgets are written; **no secondary page has been designed**,
   so the budgets are untested against real content.
