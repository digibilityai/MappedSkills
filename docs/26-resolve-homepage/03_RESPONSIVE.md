# THE RESOLVE — Complete Homepage — Responsive Behaviour

**Session:** 18 · **Date:** 2026-09-03 · **Status:** PROPOSED. Gate 10 NOT PASSED.

**All three widths were rendered and measured, not reasoned about.**

| Width | Viewport | Document height | Horizontal overflow | F1 drawings visible |
|---|---|---:|---|:--:|
| **WIDE** | 1425×900 | 10,449px | **none** | 1 (wide) |
| **MEDIUM** | 845×900 | 10,276px | **none** | 1 (medium) |
| **NARROW** | 390×844 | 11,494px | **none** | 1 (narrow) |

**The 17C defect where all three F1 drawings rendered at once is not reproduced.** Exactly one
drawing is visible at every width, verified by measuring rendered widths rather than reading CSS.

---

## 1. The principle

**The journey survives recomposition; it is not the desktop page shrunk.** Every major visual event
has a narrow-native form, and none of them degrades into a paragraph. The block order never
changes, because the order is the argument.

## 2. What each chapter does at each width

| Chapter | WIDE | MEDIUM | NARROW |
|---|---|---|---|
| **Hero** | Two columns; stage right; lattice up to 440 marks; resolve fires on a timer at ~1.45s | Single column; stage below the copy | Stage below the fold, so **the resolve fires when the reader reaches it**, not to an empty screen. Rows become the box; the lattice overlays exactly that area and leaves no hole behind it |
| **Departure** | Carrier + line inline | same | same, smaller carrier |
| **Recognition** | Copy left, runs right; the outcome rule at the right margin; **the three outcomes align into one column** | Runs beneath their copy; **rule and alignment suppressed below 900px** | as MEDIUM; the runs stay, the alignment does not |
| **The re-read** | Question + steps left, six rows right | Stacked; rows full width | Stacked; row labels drop to 0.9rem; question block reserves 4.4em so no reading shifts the layout |
| **F1 — the descent** | `1000×216` horizontal, one continuous object | `640×458` **genuine vertical form** | `330×524` vertical, constant 80-unit node interval |
| **Boundary** | Two columns | Two columns | Stacked. **Never collapsible at any width** |
| **Capabilities** | Name and destination on one line, description beneath | same | Destination wraps below the name |
| **Evidence** | Provenance as a two-column definition list | same | Definition list collapses to stacked pairs |
| **Fit** | Two columns | Two columns | Stacked |
| **Close** | Marks 24px, actions inline | same | Marks 17px; **actions go full width** |

## 3. The alignment event below 900px

The friction alignment is **deliberately not attempted** under 900px. The outcome rule and its
label are hidden, and the three routes read as three runs of different length ending in the same
open dashed mark — which still carries the argument, in a form the width can hold. Forcing a
horizontal alignment into 390px would either overflow or compress the runs until their differing
lengths stopped being legible, and the differing lengths **are** the point.

**This is a recomposition, not a removal:** the three routes, the three different distances and
the three identical outcomes are all still drawn.

## 4. Navigation

| Width | Behaviour |
|---|---|
| **≥1081px** | Six primary items inline. *What we do* is a **real link** to `/services`; the disclosure is a **separate adjacent control** with `aria-expanded`. Hover opens it as an enhancement on fine-pointer devices only, after a 110ms intent delay; hover is never the only way. Utility contact and the CTA sit outside the six |
| **≤1080px** | A single menu control with a state-dependent name (*Menu* / *Close*). The panel opens **in place — not a modal**, scrolls itself (`max-height:100vh-84px`), and the page beneath is locked. Same six items, same seven children, same utility, **CTA last in the panel**. The dropdown parent is still a link and still separately expandable |

**Verified by driving it:** panel opens → `aria-expanded=true`, body scroll locked, focus moves to
the first item; sub-disclosure toggles; `Escape` closes, restores body scroll, and returns focus to
the trigger. Focus is contained while open and always escapable — the one permitted containment.

**The header is NON-STICKY at every width** (H3, option B). Zero `position:fixed` and zero
`position:sticky` on the rendered page. No persistent sales CTA anywhere.

## 5. Touch targets

Audited at 390px by measuring every rendered `<a>` and `<button>`.

- **Before:** 23 targets under 40px — the PROOF links (27px), every footer link (21px), the logo (32px).
- **After:** **0 targets under 40px.**

## 6. Reading widths

Body copy is capped at 58ch, ledes at 44–46ch, figure legends and notes at 52ch. The capability
descriptions cap at 46ch. No measure exceeds 58ch at any width.

---

# SESSION 18A UPDATE — mobile choreography, not mobile compliance

**Date:** 2026-09-03. Re-rendered and re-measured at all three widths after refinement.

| Width | Viewport | Document height | Horizontal overflow | F1 drawings visible | Targets < 40px |
|---|---|---:|---|:--:|:--:|
| **WIDE** | 1425×900 | 10,635px | **none** | 1 (wide) | **0** |
| **MEDIUM** | 845×900 | 10,401px | **none** | 1 (medium) | **0** |
| **NARROW** | 390×844 | 12,146px | **none** | 1 (narrow) | **0** |

## The change that mattered: the friction alignment now exists on mobile

Session 18 **switched the alignment off below 900px**. That was the one place the page disabled an
event rather than recomposing it, and §18 is explicit that narrow is a designed experience.

**Recomposed:**

- The three outcomes **still travel to one column at 390px**. There is free space in every row —
  measured `margin-left` of **277px / 217px / 157px**, all landing at **right: 370px**.
- A single tall rule would cross the copy at this width, so **the rule becomes a tick at the right
  edge of each run**. Stacked, the three ticks read as one broken vertical line.
- The label becomes a **right-aligned caption following the block**, and was moved to the end of
  the DOM so its reading order matches its visual position.

**This is the same commercial event — three different causes, one indistinguishable outcome — in a
form 390px can hold.**

## The second half on mobile

| | Session 18 | **Session 18A** |
|---|:--:|:--:|
| Second-half screens at 390px | 6.2 | 6.3 |
| **Second-half visual atoms** | **2** | **41** |

The scroll distance is essentially unchanged — **no length was added by animation** — but the
material a reader passes through on the way is no longer almost entirely text.

## Medium

The three intervention maps hold their 340px inline position beside their headings at 845px, so the
tablet composition is neither a stretched mobile column nor a squeezed desktop grid. The
capabilities chapter measures 1,316px here against 1,740px at WIDE — the width is spent on the
route lines rather than on empty gutter.

---

# SESSION 18B UPDATE — after compression

**Date:** 2026-09-03. Re-rendered and re-measured at all three widths.

| Width | Viewport | Height | vs 18A | Horizontal overflow | Drawings visible | Targets < 40px |
|---|---|---:|---:|---|:--:|:--:|
| **WIDE** | 1425×900 | **7,714px** | **−30.2%** | none | 1 (wide) | 0 |
| **MEDIUM** | 845×900 | **7,103px** | −31.7% | none | 1 (medium) | 0 |
| **NARROW** | 390×844 | **7,824px** | **−35.4% (14.4 → 9.3 screens)** | none | 1 (narrow) | 0 |

## The system chapter is stacked at every width, deliberately

The chain is authored at a fixed viewBox, so **placing it in a column shrinks its own labels below
legibility** — measured at ~10px when it sat in a 764px column at 1440. It is now **full width at
every breakpoint**: 1,302px wide at WIDE, with labels rendering at ~17px.

This is not a fallback. It gives the page the **one large visual experience** §18 of the brief
asked for instead of a squeezed diagram, and it removes the coupling between column width and
figure legibility entirely.

**Medium keeps the single-column chain for the same reason.** A two-column tablet layout would
render the medium drawing at ~380px, putting its 13px labels at an effective 7.7px. The width is
spent on the figure instead.

## Mobile

**9.3 screens, down from 14.4.** No chapter exceeds 1.6 screens. The saving is mostly editorial
rather than typographic: seven described capability rows became seven compact 40px pills surfaced
by the stage they belong to, and four chapters' worth of elaboration moved to the pages that
already carry it.

**The mobile journey is no longer paragraph-diagram-paragraph.** It runs: a dark stage that
resolves → three converging routes → one chain with three stages → one large statement → one large
admission over a dark surface → two short positions → full-bleed colour.

---

# SESSION 18C UPDATE — mobile de-clutter

**Date:** 2026-09-03. Owner: *"The mobile view looks a little cluttered."* Full record in
`08_MOBILE_REFINEMENT_18C.md`.

| Width | Viewport | Height | Screens | Overflow | Targets < 40px | Contrast fails |
|---|---|---:|---:|---|:--:|:--:|
| **NARROW** | 390×844 | **7,566px** | **9.0** *(was 9.3)* | none | 0 | 0 |
| **NARROW-S** | 360×800 | 7,720px | 9.7 | none | 0 | 0 |
| **NARROW-L** | 430×932 | 7,387px | 7.9 | none | 0 | 0 |
| **MEDIUM** | 845×900 | **7,103px — unchanged** | — | none | — | 0 |
| **WIDE** | 1425×900 | **7,714px — unchanged** | — | none | — | 0 |

**Mobile got shorter while gaining breathing room.** Every change is inside `max-width:760px`;
desktop and medium are byte-for-byte identical to 18B, chapter for chapter.

## The nine mobile-only changes

Outlined capability pills → underlined text links · one stage is the subject at 24px while the
other two are an 18.4px index · stage numerals hidden · per-row rules halved · the `/services` link
separated from the capability cluster · **the hero's stage now starts at 651px so the statement owns
the first viewport and the population is teased at the fold** · the figure's legend reduced to the
one item its own labels do not name · the footer moved to two columns with a 52px row gap and a
deep top margin · more space above the system block.

**Medium deliberately inherits none of these** — verified: pills keep their outlines, all three
stage numerals show, the inactive stage title is still 40px, and all three legend items are present.
