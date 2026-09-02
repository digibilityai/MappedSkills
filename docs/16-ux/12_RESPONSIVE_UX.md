# Responsive UX — PROPOSED

**Session:** 13 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**
**Governed by:** `13_RESPONSIVE_ACCESSIBILITY_PRINCIPLES.md` (approved, `DEC-015`) · `FORM_AND_BOOKING_SPEC.md` §6.
**No breakpoint, dimension, spacing or type value appears here.** Those belong to Gate 10.

---

## 1. The governing position

> **Mobile is the primary case, not the compromise.**

India-first, owner-led buyers, mixed connections — and the firm's own published advice, inside its own approved copy, is to test your form *"from a phone, on mobile data rather than office wifi."* **A site that gives that advice must be beyond reproach on a phone.**

**Two rules that follow, and that this document exists to enforce:**

1. **Responsive design is not stacking desktop sections vertically.** It is deciding what each element becomes at each width.
2. **Nothing that carries information disappears.** If something can be dropped on a phone, that is evidence it was decoration, and it should be reconsidered on desktop too.

---

## 2. Content priority — what leads at narrow widths

**Priority is per page type, and it never reorders the argument.** The block order is the argument; what changes is transformation, density and default state.

| Page type | First screen at narrow width must carry | May move below the fold |
|---|---|---|
| **Homepage** | H1 · supporting line · both primary actions | **The one dated item** — the only one of the four permitted to move, and it never disappears |
| **Commercial** | Search-intent confirmation · the bridge · one primary action | Nothing else was there to move |
| **Problem** | The symptom named · the promise that the checks are here and runnable | — |
| **Pricing** | What is being bought · the route to the price | The horizon, if it will not fit |
| **Methodology / research** | The page's opening statement | — |
| **Contact / booking** | The ask and the first field, or the route into booking | — |
| **Thank-you** | The confirmation, complete, without scrolling | — |

**If a commercial page's confirmation and bridge will not both fit the first screen at the smallest supported width, that is a finding to report — not a reason to move the bridge below the fold.** The rule that both sit in the first screen has no width exception.

---

## 3. Section order

**Unchanged at every width, on every page.** The order carries the argument, and reordering it for layout convenience changes what the page says.

**One permitted exception, already noted:** the homepage's single dated item may move from beside the hero to immediately below it.

---

## 4. The apparatus — the single biggest responsive risk

| Wide | Narrow |
|---|---|
| A margin beside the claim | **An inline, expandable disclosure directly beneath the statement it belongs to** |

**Three binding constraints:**

1. **It never disappears.** Dropping the apparatus on mobile would remove the site's differentiator for the majority of visitors.
2. **It never becomes a footer.** Provenance detached from its claim is a disclaimer, which is the exact treatment prohibited.
3. **DOM order is claim-then-apparatus at every width**, regardless of visual position. A screen-reader user and a mobile user receive the same relationship a desktop reader receives.

**And the rule that tightens rather than relaxes:** **limits and the accountability boundary are expanded on mobile. Always.** Mobile is where the temptation to collapse them is greatest and where most of the audience is.

**Commercial pages keep zero apparatus above the fold at narrow widths — the constraint is stronger here**, because the fold is smaller and the buyer is likelier to be a founder on a phone.

---

## 5. Navigation

| Aspect | Narrow behaviour |
|---|---|
| **Item set** | **Identical.** Same six items, same dropdown children, same utility, same CTA. Nothing removed because it is difficult to fit |
| **Panel** | Opens in place, not as a modal. `Escape` and an explicit close both work; focus returns to the trigger |
| **Focus** | Contained while open — **the one permitted focus containment on the site**, and it must be escapable |
| **The dropdown parent** | Still a link **and** still separately expandable |
| **Order in the panel** | Six primary → utility (contact, phone, WhatsApp) → CTA |
| **Background** | Does not scroll while the panel is open |
| **Prohibited** | A bottom tab bar · gesture-only access · a "more" affordance hiding nav items · a full-screen takeover with no visible close |

---

## 6. CTA persistence and sticky elements

| Rule | Detail |
|---|---|
| **Sticky is permitted only where the approved CRO rules permit it** | Homepage, commercial, vertical, pricing · problem page below the fold only. **Prohibited on `/how-it-works`, `/research`, `/research/*`, `/blog`, `/blog/*`** |
| **A sticky element must never obscure content** | And must **never cover anything while the mobile keyboard is open** |
| **Never two sticky elements at once** | A sticky CTA and a sticky header competing at the bottom of a small viewport is the failure the brief names, and this system avoids it by recommending a non-sticky header (`07` §4) |
| **Quiet, fixed, identical** | Never expanding, pulsing, animating or changing on scroll |
| **Direct contact** | `tel:` one tap; WhatsApp one tap to the same number. **At equal weight to the form and booking wherever contact is offered** |

---

## 7. Figures

| Figure | Narrow form |
|---|---|
| **F1 — the run** | **A genuine vertical form, not a scaled-down horizontal one.** The boundary drawn across it; dashed stretches still dashed; the unattached arrival still unattached |
| **F2 — the four causes** | Vertical and sequential. Never a wide branching graph reduced |
| **F3 — the four AI layers** | Per-system results stack; layers stay separate; provenance stays IMMEDIATE. Where a six-system comparison will not fit, a **scroll container with all content present and keyboard-accessible** — permitted, and **not a carousel** |
| **F4 — what cannot be attributed** | The measured / not-measured pair stacks **adjacent and at equal weight** — never one collapsed |

**Binding, for all four:** the page body **never** scrolls horizontally · labels stay on the figure as real text · values readable without hover · text equivalent available at every width · complete without motion.

**Flagged in the approved principles as at risk of becoming unusable at narrow widths, and therefore checked explicitly at Gate 9B:** the run if drawn wide · the four-cause tree if drawn as a branching graph · per-system comparisons across six systems · the five-check sequence if it depends on holding several states side by side · any paired explanation-and-artefact layout, which is inherently two-column and needs a designed stacked form where the artefact stays tied to its step.

---

## 8. Tables

Much of this site's material is genuinely tabular, and tables are encouraged where it is.

| Requirement | Detail |
|---|---|
| **Wide tables scroll inside their own container** | All content present in the DOM, keyboard-accessible, no paging. **This is a scroll container, not a carousel** (A19 as amended) |
| **The page body never scrolls horizontally** | Without exception |
| **Dense tables get a linearised form** | Where scrolling would make the comparison unreadable, the table becomes a structured list per row, with row headers retained |
| **Headers are never lost** | A scrolled or linearised table still identifies what each value is |
| **No table becomes an image** | Ever |

---

## 9. Forms

| Requirement | Detail |
|---|---|
| **The four-field required set is itself the mobile strategy** | Nothing further is removed |
| **Input types and `inputmode`** | Correct per field. A numeric keypad for phone is not cosmetic |
| **Touch targets** | Comfortably above minimum, **including the consent checkbox**, with real spacing between adjacent targets |
| **Errors** | Visible without scrolling away from the field; focus moves to the first error |
| **Zoom** | No unwanted zoom on focus; usable at increased text size |
| **The message field** | The largest control, and it must remain usable — not a two-line box a reader has to scroll inside to review what they wrote |
| **Sticky elements** | Never over a field or the submit control |
| **Third-party dependency** | **The form must not depend on a heavy third-party script to function** |
| **Booking embed** | Usable at the smallest supported width. **An embed that only works on desktop fails a mandatory capability.** Loaded on `/schedule-call` only |

---

## 10. Long-form reading

Applies to `/how-it-works`, research entries and articles.

| Requirement | Detail |
|---|---|
| **The reading column is protected at every width** | Roughly 60–75 characters where the width allows |
| **No section runs past four paragraphs without a heading, list, table or figure** | A readability rule and a cognitive-load rule at once |
| **Table of contents** | A disclosure at the top on narrow screens. **Never a floating overlay competing with the text** |
| **In-page anchors** | Smooth anchoring is permitted; scroll-jacking is not |
| **No sticky CTA on these page types** | B16 |
| **Byline and date** | In the reading path, not in a sidebar that vanishes |

---

## 11. Research metadata

**The metadata schema — date · systems or scope · sample · version — stays IMMEDIATE at every width, on entries and on index cards.**

It is the reason to trust the entry and the thing that distinguishes the research index from a blog listing. **It does not truncate, does not collapse, and does not move to a footer.**

---

## 12. What may disappear at narrow widths

**Only these:**

- Decorative rules that exist solely to structure a wide grid.
- Any margin-position annotation that has been **re-parented inline** — it has not disappeared, it has moved.
- Secondary navigation chrome that competes with the reading column.

**Nothing else.** Every other element either transforms or stays.

---

## 13. What must never depend on hover, at any width

- Evidence disclosure.
- Figure labels and values.
- Status meanings.
- Navigation.
- Any CTA.

**Hover reveals supplementary detail only, and everything it reveals is reachable by tap and by keyboard.**

**Note on mobile emulation:** a narrow viewport is not the same thing as a touch device. The rule is written against **input capability**, not width — a touch laptop at a wide width must not lose access to anything either.

---

## 14. Large screens

Recorded because responsive is not only about small.

| Requirement | Detail |
|---|---|
| **The reading column does not stretch** | A 60–75 character measure is protected at wide widths too |
| **The apparatus column appears** | This is where the margin form is correct |
| **Figures gain room, not scale** | A figure at a wide width shows the same information with better spacing — not larger labels |
| **No content appears that did not exist at narrow width** | Additive-by-width content is content the mobile majority never receives |

---

## 15. What this document does not decide

Breakpoint values · column counts · spacing · type sizes · touch-target dimensions · container widths · the specific mechanism for any transformation. Those belong to Gate 10 and the implementation phase.

**And no responsive behaviour was tested.** No page was rendered in this session at any width.
