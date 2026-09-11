# Direction A — THE SIGNAL FIELD — Session 15B — PROPOSED

**Prototype:** `prototype/a-signal.html` · **Date:** 2026-09-02 · **Status: PROPOSED, not approved.**
**Register:** bold · high-energy · digital-first.

---

## 1. Core idea

> ### **Demand is a live field of signals. The website is the instrument that catches them, routes them through the three places they get lost, and writes down where each survivor came from.**

One idea, one sentence. Everything in the direction is a consequence of it: the field is always
moving, the gates are operable, the ledger accumulates, and the marks that arrive without a source
stay visibly untagged forever.

## 2. Why it belongs to MappedSkills

The approved position is that the firm answers for **enquiries, not traffic**, and that the
difference between them is made at a small number of joins. This direction is that argument drawn
as a machine you can watch running. It also renders three approved commitments that are usually
just asserted:

- **The unmeasured lead-in** — demand the firm cannot see is drawn dashed, entering from off-field.
- **The three gates** — being found, the page answering, the enquiry completing — which is the
  approved mechanism, not an invented framework.
- **The unattributed arrival** — roughly one in six arrivals docks in the ledger as an open square
  with a dashed, untagged line, and **it never gets a source assigned to it.**

## 3. What makes it memorable

Continuous, purposeful movement that is not decorative, plus **one thing the visitor can do to the
business model**: close a gate and watch the recorded count stop rising. Very few B2B service sites
let a visitor break the product on purpose.

## 4. How it communicates marketing capability

By demonstrating rather than claiming. A firm that can render its own commercial mechanism as a
legible, interactive, performant system on its own homepage has shown it understands attention,
hierarchy and explanation. The gate interaction in particular *teaches* the buyer why more traffic
did not help them.

## 5. CAPTURE → CONVERT → MEASURE, visually

**One continuous field the reader scrolls through, not three of anything.** No cards, no columns,
no icons, no funnel, no taper — the channel is constant height by construction, so a funnel cannot
be drawn from this vocabulary.

| Phase | What lights up | What the reader sees |
|---|---|---|
| **01 capture** | The demand field at full brightness | A dense stream, most of it not measured |
| **02 convert** | The three gates | Marks being absorbed at each gate and falling out of the channel |
| **03 measure** | The ledger line and the tags | Survivors docking on the right, most with a source tag, some without |

## 6. How THE RECORD appears without dominating

Evidence is a **consequence of interest**, not a permanent margin. The AI-visibility claim is set
as the largest thing in its section; the provenance exists only after the reader presses
*"probe this claim — show what it rests on"*, and then the rows **dock in sequence**, one after
another, in the apparatus register. The limitation and the two status marks — `measured`,
`not testable` — arrive with the rest and are never smaller or dimmer than the provenance.

## 7. Motion language

| Kind | Behaviour | Meaning |
|---|---|---|
| **Ambient** | The field runs continuously at ~60fps | Demand does not wait for you |
| **Scroll-linked** | Phase lighting and copy change at three thresholds | The reader paces the explanation |
| **Reactive** | Gate toggles collapse an aperture; throughput visibly drops | Cause and effect |
| **Entry** | H1 words rise through a mask, 50ms apart | Arrival, once |
| **Sequence** | Provenance rows dock 60ms apart; the five promises strike through 180ms apart | Accumulation and refusal |

Easing `cubic-bezier(.16,.9,.24,1)`; entries 500–900ms; the field is transform/fill-only on a
single canvas.

## 8. Interaction language

Direct manipulation of the diagram. Three gate toggles are real `<button>`s with `aria-pressed`;
the evidence probe is a real button with `aria-expanded`; every action has a visible consequence in
the same screenful. **Nothing is hover-only** and no interaction is required to understand the page.

## 9. Mobile transformation

The field is not shrunk — it is **re-proportioned**. The band is measured from a real layout
element, so at 390px it occupies the middle of the screen with the phase copy above and the gate
controls below, and the ledger stays at the right edge where arrivals dock. The three step labels
stack. The hero field drops to 38% opacity so the H1 stays clean. **Measured: no horizontal
overflow at 390px.**

## 10. Primary risk

> **A moving particle field is one design decision away from "AI/tech wallpaper", and it is the
> most expensive thing on the page.**

Specifically: on a low-end phone a 300-particle canvas is real work every frame; and if the field
ever appears in a section where it is not explaining something, it becomes exactly the ambient
decoration the approved anti-patterns prohibit. **The mitigation has to be a rule — the field
appears once, on the page whose subject is the mechanism — and that rule is not yet written.**

**Secondary risk:** the field is the most legible thing on the page, so the *copy* has to fight for
attention. In the prototype the phase headings are large enough to win; on a longer page they might
not be.
