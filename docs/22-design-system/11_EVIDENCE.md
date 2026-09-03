# Evidence — THE CLAIM AND WHAT IT STANDS ON

**Session:** 16 · **Date:** 2026-09-03 · **Status:** PROPOSED
**THE RECORD is a credibility system. It is not the visual genre and it never sets the page's
typography, geometry or atmosphere.**

---

## 1. The relationship

> ### **THE CLAIM sits on the page. WHAT IT STANDS ON is the surface beneath it, lit when the reader asks.**

This is the one evidence metaphor in the system, and it does three things at once: it makes
evidence **subordinate by position** rather than by type size, it makes inspection **an act the
reader chooses**, and it keeps the apparatus out of the page's genre.

**Evidence appears because a commercial claim invited inspection.** It does not open the page, it
does not run down the margin, and it does not set the typeface.

---

## 2. The evidence moment

| Layer | Treatment |
|---|---|
| **The claim** | Display face, section-heading scale, on the primary or raised field. The commercially owned phrase may carry the accent — **one phrase, not the sentence** |
| **The sample sentence** | Interface 400, `text-secondary`, directly beneath. States what was done, when, where, how many, signed-out status |
| **The control** | A real button whose label **names what it reveals** — e.g. *"Light it from beneath"* — and names the reverse when open. `aria-expanded` + `aria-controls` |
| **The substrate** | The surface **under** the claim, lit with a warm amber falloff from its top edge into the raised ground. **No border, no radius, no shadow, no card** |
| **The rows** | Provenance as term/description pairs at **body-adjacent size** — `what · when · where · how many · by whom · limits` |
| **The limitation** | **In the accent**, so it cannot be skipped. Always the last row and always present |
| **The status marks** | Drawn shapes plus their words — see §4 |

**Motion allowance: one responsive event.** The substrate opens and the rows resolve in sequence
(~60ms apart). **Nothing else in the evidence moment moves, ever.**

---

## 3. Binding evidence rules

1. **Evidence text is never smaller, greyer or lighter than the copy around it.** Subordination is
   position and disclosure only. **No monospace, no small print, no disclaimer treatment.**
2. **Limitations are always visible in the reveal** and are the most prominent line in it. There is
   no state in which a limitation is hidden while its claim is shown.
3. **Where the approved UX requires evidence to be present without interaction, it is** — the
   accountability boundary's limits block is **always open and never collapsible at any width**
   (P5). Only *disclosure-class* evidence is behind a control.
4. **A claim and its evidence are never separated.** The substrate is beneath its own claim, never
   in a footer, a modal, a sidebar or a separate page section.
5. **No evidence apparatus in or adjacent to a conversion region.**
6. **Every provenance line travels with its claim** wherever that claim is reused — the sample, the
   date, the location, the language and the access tier are part of the claim, not decoration.
7. **Nothing is aggregated.** No score, no index, no badge, no meter, no traffic light. None can be
   built from these classes.
8. **No fabricated evidence of any kind** — no fake dashboard, no invented metric, no unsupported
   case-study styling, no logo wall, no rating, no client count, no testimonial without a
   permissioned source.

---

## 4. Status marks

Drawn shapes, each with its word. **Colour contributes nothing**, so the vocabulary survives
greyscale and print.

| Mark | Shape | Means | Never means |
|---|---|---|---|
| **measured** | Filled square | It was measured | that the result was good |
| **measured zero** | **The same filled square**, ordinary label, ordinary register | It was measured and the value is nothing | a failure, missing data, or not-yet-measured |
| **not testable** | **Hatched square** | It could not be measured at all | a poor result |
| **unmeasured** | **Open square** | It could have been measured and was not | that it cannot be measured |
| **unattributed** | **Open or dashed square** | It arrived with no usable trail | an error to be minimised |

**The pair the doctrine turns on:** *measured zero* uses the **ordinary measured mark**;
*not testable* uses a **hatched** one. **They are different claims and must never share a
treatment.** Equally, *open* (unmeasured) and *hatched* (not testable) are different shapes carrying
different claims.

**A measured zero is stated in words at full weight** — *"we were named in none of them"* — and is
never reddened, dimmed, softened or apologised for.

---

## 5. The attribution boundary

Where the approved copy states where accountability ends, the visual states it too: **the chain
visibly stops**, and the stretch beyond it is drawn in the recessive shape language and labelled as
the client's own system. **The boundary is drawn on the same object as everything else** — it is a
property of the work, not a legal section.

---

## 6. Accessibility

- Evidence controls are real `<button>` elements with `aria-expanded` and `aria-controls`.
- **In print and with JavaScript off, every disclosure is open.** No evidence is reachable only
  through script.
- The reveal opens **downward, in place, with no layout shift above the reader's line**.
- Provenance is a real `<dl>`; status marks are text plus a decorative shape, not an icon font.
- **Verified structurally:** with reduced motion applied and the no-JS path active, all six
  provenance rows retain real geometry.

---

## 7. Prohibited

Constant metadata down a page · a metadata margin as page geometry · monospace as the evidence
register · rules-as-chrome opening every section · a research-paper or audit-report layout · figure
numbering · a citations block · footnote references · evidence as the page's opening move ·
evidence styled to look like a dashboard · **evidence turned into entertainment.**

**If a page's evidence is the most visually interesting thing on it, the direction has failed.**
