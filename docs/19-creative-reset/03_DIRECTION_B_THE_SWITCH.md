# Direction B — THE SWITCH — Session 15B — PROPOSED

**Prototype:** `prototype/b-switch.html` · **Date:** 2026-09-02 · **Status: PROPOSED, not approved.**
**Register:** premium · sophisticated · contemporary.

---

## 1. Core idea

> ### **The site has two states — the traffic view and the enquiries view — and it switches the whole surface between them. The approved H1 stops being a headline and becomes the mechanic of the website.**

Ground, ink, type weight, the marks and the accent all invert together in one 620ms move, with a
single tangerine bar sweeping across the surface as it happens. Both states are complete, finished
compositions; neither is a "before" picture.

## 2. Why it belongs to MappedSkills

*"Judge us on the enquiries, not the traffic"* is a **comparison**. Everything downstream of it in
the approved messaging is also a comparison: sessions versus enquiries, rankings versus qualified
enquiries, what an agency shows you versus what this firm reports. A site whose central interaction
*is* that comparison is the position rendered rather than described — and the visitor performs it
themselves.

**Stated plainly so it is not confused with the evidence rules:** the switch expresses an approved
*commercial position*. It does not grade a measured result, and the accent never encodes a
judgement about any measurement — the evidence apparatus in this direction carries no colour coding
at all.

## 3. What makes it memorable

The scale of the change. Most sites animate objects; this one **changes the world the objects are
in**. One control, used three or four times across a whole site, is a signature that is cheap to
build, impossible to mistake for a competitor, and survives being screenshotted.

## 4. How it communicates marketing capability

It is a demonstration of **framing** — the core marketing skill. The visitor is shown the same
subject twice and can feel the difference the framing makes. It also shows restraint: the site has
exactly one trick and does not repeat it every section.

## 5. CAPTURE → CONVERT → MEASURE, visually

**Three full-height acts, each of which arrives in the wrong state and switches to the right one**
as it enters view, with a persistent progress spine that fills 33% → 66% → 100% across them.

| Act | Arrives showing | Switches to | Right-hand signal column |
|---|---|---|---|
| **01 capture** | *"More visits."* struck through | **Demand you can actually reach** | Two solid marks (reachable) and three dashed (demand we cannot see) |
| **02 convert** | *"A prettier page."* | **An enquiry that completes and arrives** | Two bars completing, one stopping short |
| **03 measure** | *"A monthly report."* | **Each enquiry records where it came from** | Three marks gaining source tags; one staying dashed and untagged — unattributed |

The signal column uses the **same mark vocabulary as the hero panel**, so the site reads as one
system rather than three set pieces.

## 6. How THE RECORD appears without dominating

**The claim is a solid black block, and the provenance is physically underneath it.** Pressing
*"Lift this claim — see what it stands on"* raises the claim block and opens the substrate beneath
it. Evidence is literally what the claim stands on — a spatial relationship rather than a footnote,
a card or a margin. Every provenance row, the limitation and both status marks are in the reveal;
nothing is shrunk and nothing is colour-coded.

## 7. Motion language

**Few, large, decisive.** One easing (`cubic-bezier(.65,0,.35,1)`), one duration (620ms), and a
deliberately small vocabulary:

| Kind | Behaviour |
|---|---|
| **The switch** | Ground, ink and mark tokens cross-fade while one tangerine bar sweeps left→right→out |
| **Handoff** | Each act switches itself 420ms after entering view, so scrolling causes the change |
| **Progress** | The spine grows to its share over 1.1s |
| **Sequence** | Signal rows stagger 130ms apart |
| **Micro** | Buttons lift 3px and scale 1.02 on hover |

**The hero demonstrates the switch once, unprompted, 1.5s after load, then hands the control to the
reader.** Under `prefers-reduced-motion` the auto-demo does not run and the sweep is removed; the
state change is instant.

## 8. Interaction language

A single, honest control: a two-option segmented `Traffic / Enquiries` toggle with real
`aria-pressed` state. It is reused as the site's one recurring interactive object. Everything else
is ordinary links and buttons.

## 9. Mobile transformation

The switch is **more** effective at 390px, because a small screen is a single surface and the whole
of it changes at once. The hero panel drops below the copy; the three acts lose their side-by-side
grid and put the signal column under the text; the acts stop being full-height so three inversions
do not become three empty screens. **Measured: no horizontal overflow at 390px.**

## 10. Primary risk

> **A binary switch is a gimmick if it appears more than about three times on a site, and it is
> structurally close to the prohibited "before/after" component.**

The distinction that keeps it legitimate is that the two states are **different subjects, not a
good/bad pair with a metric attached** — no number improves across the switch, because no number
exists. If a future page ever puts a figure on either side of it, the device becomes the
`BeforeAfterMetric` pattern the approved component classification retired. **That boundary needs to
be written as a rule before this direction is used on a second page.**

**Secondary risk:** the traffic state is a large dark surface with a dense dot field. It is
handsome, but it is also the state a reader may leave the site in if they use the toggle and do not
switch back. The auto-demo mitigates this by always ending in the enquiries state.
