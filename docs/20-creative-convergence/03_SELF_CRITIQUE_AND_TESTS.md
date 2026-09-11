# Self-Critique and the Three Standing Tests — Session 15C — PROPOSED

**Date:** 2026-09-02 · **Prototype:** `prototype/convergence.html`
**Method:** opened, interacted with, scrolled and inspected in a browser at 1440×900 and 390×844,
and compared directly against the unchanged original B at
`docs/19-creative-reset/prototype/b-switch.html`.

---

## 1. The static-quality test

> **Disable motion. Does it still look like a premium, contemporary marketing company?**

**YES.** Verified by rendering the page with the reduced-motion equivalents applied and by the
`html:not(.js)` path.

With every effect removed the page is: an ivory ground, black display type at up to 100px, one
saturated accent, four named enquiry objects with source labels, three acts with their marks and
labels resolved, five refusals with a rule drawn through them beside one commitment at display
scale, an ink evidence block with its substrate open, and a full-bleed tangerine CTA panel.

**That is a finished composition, not a page waiting for animation to rescue it.** This was the
property that made B the owner's foundation, and it is intact.

---

## 2. The vibrancy test

> **With motion on, is this substantially more energetic than original B — or merely "B with slightly more animation"?**

**Substantially more. It is a different mechanic, not a longer one.**

| | **Original B** | **The convergence** |
|---|---|---|
| What changes | Two **pictures** swap | One **population** transforms |
| The mark field | A static dot canvas, drawn once, cross-faded | ~190–440 real objects that travel to the thing they become |
| The H1 | Colour fades between two words | A rule is **drawn** under the word that governs, and moves |
| Capture→convert→measure | Three acts change palette; rows fade in | Three acts **resolve**, with a threshold that is crossed or not, on a spine that fills |
| The commercial argument | A statement lands | Five rules are drawn through five promises in turn while one commitment resolves in |
| The CTA | Heading, paragraph, buttons | The surviving marks **arrive**, then the line, then the actions |
| Events in a page-length read | ~4 | **8, each followed by stillness** |
| Reader agency | One toggle | The same toggle, plus five on-view transformations they travel through |

**The decisive difference:** in original B nothing is ever *the same object* before and after. In
the convergence, the marks you saw as anonymous traffic are the marks that become named enquiries.
That is A's contribution, and it is the whole of it.

---

## 3. The document test

> **Could this survive essentially unchanged as a PDF?**

**NO — and the failure is structural, not decorative.**

A printed page cannot show a population resolving; cannot show the same object in two states;
cannot let a reader run the transformation; cannot draw a rule through five promises in sequence;
cannot lift a claim off its evidence. **The static frames are strong, but the argument is made by
change, and change is the medium.**

Compared with the rejected Session 15 homepage — which survives as a PDF almost entirely — this is
the opposite condition.

---

## 4. The ten inspection questions

| | Question | Answer |
|---|---|---|
| **1** | Is B still clearly the foundation? | **Yes.** Same palette, same type, same two-state model, same claim/evidence relationship, same composition language. Placed beside original B, the family resemblance is immediate |
| **2** | Is A's energy genuinely present? | **Yes**, and it is present as behaviour: an active population, kinetic type, visible progression, reactive feedback, drawn loss |
| **3** | Has A's aesthetic contaminated B? | **No.** Zero canvases, zero particles-as-wallpaper, no dark tech ground as the site's base, no green, no monospace apparatus, no ambient motion |
| **4** | Does it feel like a modern marketing company? | **Yes** — and more commercially than A did, because the accent, the type and the ivory ground are B's |
| **5** | Does it feel vibrant? | **Yes.** The hero transformation, the drawn threshold, the five rules and the landing marks are all visual events |
| **6** | Does it feel premium? | **Yes**, mainly because motion is rationed. Eight events with stillness between them reads as confidence; constant movement would not |
| **7** | Is it memorable? | **Yes.** The hero resolve is the moment. It is also the argument, which is the test a memorable moment has to pass |
| **8** | Does any part feel like a document? | **No.** No reading-column-plus-margin geometry, no metadata register, no monospace, no rules-as-chrome |
| **9** | Does any motion feel gratuitous? | **One did and was removed** — see §5. What remains all answers *“what does this represent?”* |
| **10** | Would the concept scale? | **Yes, with a rule that does not exist yet** — see §6 |

---

## 5. Material problems found by inspecting, and fixed

Recorded because a self-critique with nothing in it has usually not been performed.

| # | Problem | Fix |
|---|---|---|
| 1 | **The lattice was invisible.** Marks were built with `aspect-ratio` inside a grid and collapsed to ~6px slivers | Deterministic 9px marks, denser grid, higher contrast in the traffic state |
| 2 | **The H1's comma orphaned onto its own line** at every width | The emphasised word and its punctuation are wrapped together in a no-break span |
| 3 | **The handoff band parked on tangerine** and its accent `<em>` became invisible — tangerine on tangerine, and ivory body text at 2.6:1 | The bar now **passes across** as a keyframed sweep and the band settles on ink |
| 4 | **The run strips overflowed** — bars at up to 86% width pushed labels to the viewport edge and wrapped them three lines deep | Bar widths reduced to 22–44%; labels given their own flexible column |
| 5 | **The acts' resting state looked like a loading skeleton** — ragged part-drawn bars | At rest the bars are fully collapsed, so the resting state is a column of identical anonymous marks, which is what it should mean |
| 6 | **The five refusals faded to `opacity:.34`** — approved copy pushed far below readable contrast | Replaced with a **drawn rule** through each item; the words stay at full contrast, and the channel is now a shape rather than a colour |
| 7 | **Act eyebrows at 3.97:1** on 13px text | A dedicated darker accent token for small accent text (6.02:1) |
| 8 | **`<main>` was opened inside a section and closed outside it** — invalid nesting | Restructured to wrap the whole page |
| 9 | **NARROW: the resolved lattice left a 136px empty gap** | The rows define the box; the lattice overlays exactly that area |
| 10 | **NARROW: the hero resolve played to an empty screen**, because the stage is below the fold | Below 900px the resolve is triggered on view instead of on a timer |

**One motion was removed as gratuitous:** the hero lattice originally kept a continuous idle
shimmer to convey "activity". It was ambient noise by any honest reading and failed the
*“what does this represent?”* test — activity is now a **single ripple** when the traffic state
arrives, and then stillness.

---

## 6. Open risks — named, not resolved

**R1 — The resolve has no budget yet.** *(highest)* It appears seven times in this prototype. On a
22-route site the same gesture on every page becomes a tic, and the thing that made it memorable
becomes the thing that makes the site monotonous. **A rule is needed — how many resolutions a page
may carry, and which content earns one — before this becomes a design system.** This is the same
class of gap Sessions 14A and 15B kept finding, and it is not solved here.

**R2 — The lattice is the one performance item.** It is a one-off transition rather than a running
animation, but 440 elements is still 440 elements. It is capped in the prototype; build it after first paint.

**R3 — The traffic state is a large dark surface a reader can park in.** The auto-resolve always
ends in the enquiries state, but a reader who presses *Traffic* and leaves has the dark version as
their last impression.

**R4 — "Kinds, not counts" is a disclosure, not a guarantee.** The marks unavoidably suggest
proportions. The note is prominent and the counts are deliberately small and symbolic, but a reader
who does not read the note may still infer a rate. **If any future page ever puts a figure beside
these marks, the device becomes a fabricated metric and must be withdrawn.**

**R5 — This is still one designer's reading of one prototype.** No user has seen it, and nothing
here says anything about whether it converts.

---

## 7. Verdict on the convergence itself

B is unmistakably the foundation. A is present as behaviour and nowhere as appearance. The static
design is strong enough to stand without motion, and the motion is strong enough that the page
could not be a PDF. The energy comes from what things *do*, not from how much decoration is on
screen.

**The one thing that would most improve it is not more energy — it is the rule in R1.**
