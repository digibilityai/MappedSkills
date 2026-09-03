# Design-System Foundation — Session 15 — PROPOSED

**Session:** 15 — Design-system foundation + complete homepage design · **Date:** 2026-09-02
**Branch:** `test_branch` · **HEAD at start:** `a68dfaec673e2698653296b531bbd133ccb10d57`
**Status:** **PROPOSED. Claude does not approve and does not pass gates. Gate 10 is not passed.**
**Direction:** THE RECORD · **Direction 2 — THE WORKING SHEET.** Not reopened, not re-explored.
**Implemented in:** `prototype/foundation.css` · **exercised by:** `prototype/homepage.html`

> ### Scope discipline, stated first
> This is a **foundation**, not an exhaustive design system. It defines what a complete page
> actually needed, and stops there. There is **no component API, no full state matrix, no route
> catalogue, no dark mode, no icon set, no motion library and no token dump.** Where a decision
> was not forced by the homepage, it is left open and listed in `07_OPEN_DESIGN_RISKS.md`.
>
> **Method: DESIGN → TEST → ABSTRACT.** Every rule below was either carried forward from the
> Session 14/14A validation or **discovered by rendering the homepage and looking at it.** The
> ones discovered this session are marked **[FOUND BY RENDERING]** and say what the defect was.

**Relationship to Session 14.** `docs/17-visual-validation/prototype/the-record.css` is
**unmodified**. `foundation.css` is a separate file that carries its validated tokens forward
unchanged and adds what four slices did not need: a stated grid, an action system with states, a
navigation with a working dropdown, form-input foundations, and the evidence status marks drawn.

---

## A. Typography

### A.1 Two families, one semantic distinction

| | **Argument register** | **Apparatus register** |
|---|---|---|
| Family | **Archivo** | **IBM Plex Mono** |
| Carries | H1, headings, body, the consequence statement, statements, figure point labels, action labels, limits | Provenance, date, sample, scope, status words, register labels, figure annotations, footer column labels |
| May appear | Anywhere | **Metadata only** |
| May never appear | — | A headline · body copy · a hero · a CTA · as a technical-credibility signal · on a dark ground · with a prompt, caret or terminal chrome |

**There is no third family.** A separate metadata face was considered and rejected: the apparatus
register already *is* the metadata face, and adding a third would make register a style choice
rather than a semantic one.

**Both families remain provisional.** Final selection is a licensing and performance decision, and
nothing in this foundation depends on it — every structural claim holds on the fallback stacks.

### A.2 The scale — few steps, large jumps, container-relative

| Role | Value | Rendered WIDE (1400) | Rendered NARROW (390) |
|---|---|---|---|
| **H1** | `clamp(2.25rem, 9cqi, 5.5rem)` | **88px** | **36px** |
| **Consequence statement** | `clamp(1.5rem, 4.6cqi, 2.375rem)` | 38px | 24px |
| **Section heading** | `clamp(1.375rem, 3.4cqi, 1.875rem)` | 30px | 22px |
| **Statement (in-section)** | `clamp(1.25rem, 3.2cqi, 1.625rem)` | 26px | 20px |
| **Sub-heading** | `1.1875rem` | 19px | 19px |
| **Lede / hero support** | `clamp(1.0625rem, 3.7cqi, 1.25rem)` | 20px | 17px |
| **Body** | `1.125rem`, line-height 1.62 | 18px | 18px |
| **Apparatus, all of it** | `1rem` | **16px** | **16px** |

Sizes are **container-relative (`cqi`)**, not viewport-relative, so a narrow column is genuinely
narrow regardless of how wide the window is.

**[FOUND BY RENDERING] The H1 cap was raised from Session 14's 76px to 88px.** At 76px on a
1400px screen the H1 occupied 69% of the working width and the first screen read as **empty rather
than confident** — the exact failure mode the direction's own swap test warns about. At 88px it
fills roughly 79% and the hero reads as deliberate. Nothing else in the scale moved.

**[FOUND BY RENDERING] The lede became responsive.** A fixed 20px hero support line pushed the
second hero action below the 844px fold at NARROW. It now scales toward the body size — **never
below it** — and both actions clear the fold.

### A.3 The rule that does not move

> **The apparatus is set at 16px — the body minimum — in a different register, never at a smaller
> size. Subordination is bought entirely with register, measure and position.**

This is the design-system form of *never smaller-grey-italic*. It is the rule most likely to be
traded away later for visual tidiness, which is why it is stated as a number and re-verified in the
browser every session.

### A.4 Hierarchy logic, stated as a rule rather than a list

1. **One consequence statement per page**, and it is the page's heaviest object. A page with two
   has none.
2. **The consequence statement out-ranks the section heading.** A system where the heading is
   always the biggest thing cannot obey the rule that the cost of the buyer's problem carries the
   page's heaviest emphasis.
3. **A statement ranks under the consequence and over body**, and is used where a section has one
   sentence that must not be scrolled past.
4. **[FOUND BY RENDERING] Every heading carries 24px beneath it.** With no gap, a bold heading
   followed by a bold statement read as one four-line heading, and a heading followed by body read
   as a run-on. This was visible on four sections at once.

### A.5 Fixed behaviours
Sentence case always · no all-caps, no condensed display faces, no letter-spacing effects, no
text-as-graphic, no headline set as an image · three weights total (400, 500, 600) · emphasis by
weight, used rarely · **italic emphasis disabled at stylesheet level** (`em` renders as weight) ·
**tabular lining numerals on `body`**, so every numeral on the site is a recorded value by default.

---

## B. Colour

**No hue carries meaning anywhere.** Every status, state and figure is readable with all colour
removed — verified in greyscale this session. Colour does three jobs: ground, ink, and mark.

| Token | Value | Role | Measured contrast on its own ground |
|---|---|---|---|
| `--ground` | `oklch(0.982 0.006 85)` | Warm off-white. **Not pure white** | — |
| `--ground-set` | `oklch(0.950 0.010 82)` | **Deliberate ground change. Max 2 per page** | 1.10 : 1 against `--ground` |
| `--ink` | `oklch(0.235 0.012 62)` | Argument register | **15.89 : 1** |
| `--ink-2` | `oklch(0.400 0.012 62)` | Apparatus register | **8.81 : 1 (AAA)** |
| `--ink-recess` | `oklch(0.560 0.012 62)` | **Figure stroke only. Never text** | 4.44 : 1 — below the text floor **by design** |
| `--rule` | `oklch(0.855 0.008 78)` | Hairline | — |
| `--rule-strong` | `oklch(0.420 0.012 62)` | Set-piece opener | — |
| `--mark` | `oklch(0.460 0.078 218)` | **The single accent** | **6.60 : 1** |
| `--disabled-ink` | `oklch(0.620 0.008 62)` | Genuinely unavailable control only | — |

**Contrast figures above were measured in the browser this session** by rasterising each computed
colour and computing the WCAG ratio against its actual rendered background — not estimated, and not
inherited from Session 14. The full table is in `06_ACCESSIBILITY_AUDIT.md`.

### B.1 Evidence states, and how they are drawn

The state vocabulary is closed at eight and is **greyscale-safe by construction**, because the
channel is **shape plus word**, never colour:

**measured** filled square · **observed** filled circle · **inferred** filled triangle ·
**owner-supplied** half-filled square · **unmeasured** open square · **not testable** hatched
square · **unattributed** open diamond · **changed** square within a square.

Two of these are drawn on the homepage (**measured**, **not testable**) and both were checked in
greyscale. The rest are defined and undrawn — they are drawn when a page needs them, not before.

- **`unmeasured` (open) and `not testable` (hatched) are different shapes carrying different
  words.** Neither can be read as a value.
- **Measured zero has no treatment of its own.** A measured result whose value is zero takes the
  **ordinary measured mark and the ordinary argument register**. There is no red, no warning, no
  apology and no de-emphasis for it anywhere in the stylesheet. On the homepage, *"We were named in
  none of them"* is set in the argument register at body weight inside its claim.
- **Nothing in the vocabulary can be summed, scored, averaged, badged or metered.** No traffic
  light exists and none can be built from these classes.

### B.2 Deliberately not used
The production `--ms-red: #C41E3A`, and any red, amber or green anywhere · blue as the category's
SaaS default · purple as the AI cliché · any gradient, any brand wash, any section tint.

---

## C. Spacing

A **4px base with ten steps and large jumps**: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128.

**Every margin and padding in `foundation.css` resolves to one of these ten values.** There are no
arbitrary spacing numbers in the stylesheet.

Two rhythm rules are load-bearing:

1. **The reading column is protected at every width** — 66ch, line-height 1.62, and it does not
   stretch when there is room beside it.
2. **The whitespace before the final action region is the largest gap on the page** — 128px plus
   the section's own padding, larger than any section gap. The pause is what makes the region read
   as intentional rather than pushy.

---

## D. Grid

Stated as tokens so it is a decision rather than a habit.

| Token | Value | What it is |
|---|---|---|
| `--spine` | `1180px` | The working page width. **Left-anchored, not centred** |
| `--measure` | `66ch` | The reading column |
| `--measure-app` | `56ch` | The apparatus measure — narrower, by rule |
| `--margin-col` | `22rem` (min 240px) | The apparatus margin, WIDE only |
| `--pad` | 24px, 48px at container ≥ 900px | The outer margin |

**There are exactly four layout regions, and no twelve-column grid:**

1. **The reading column** — protected at 66ch at every width.
2. **The claim-set** — reading column plus apparatus margin, as a two-column grid **only** when the
   container is ≥ 1000px. Below that the margin re-parents **inline beneath its claim**, which is
   already its DOM order, so nothing moves in the accessibility tree and it never becomes a footer.
3. **The wide region** — the full spine. Figures and set-pieces only.
4. **The footer columns** — 4 / 2 / 1 by container width.

**A twelve-column grid was not created**, because nothing on this page needed one and a grid that
exists generates cells to fill.

**[FOUND BY RENDERING] A ground change bleeds to the viewport edge; its content stays on the
spine.** In the first build the set-piece band stopped 124px short of the right edge of a 1400px
window, because it inherited the left-anchored spine's width. That reads as a rendering bug rather
than as asymmetry. Ground changes are now `width: 100vw` with `overflow-x: clip` on the sheet, so
the band is full-bleed and **the page body still never scrolls horizontally** (verified: document
scroll width 1385 at a 1400 viewport, 390 at 390).

---

## E. Rules and lines

Four kinds, one meaning each, deliberately few — a generative rule vocabulary is this direction's
named risk.

| Kind | Weight | Means | Budget per page | Used on the homepage |
|---|---|---|---|---|
| **Hairline** | 1px `--rule` | An ordinary section begins | Unrationed, but never decorative | **4** |
| **Set-piece rule** | 2px `--rule-strong` | A set-piece begins | **Max 2** | **2** |
| **The tie** | 2px `--mark`, full block height | *This provenance belongs to that claim.* Doubles as the focus indicator | One per apparatus block | **3** |
| **Dashed** | — | **An epistemic gap. Nothing else, ever** | Figures only | 8 strokes, all inside figures |

**[FOUND BY RENDERING] Per-item hairlines were removed from the capability routing list.** The
first build gave every routing row a bottom hairline, which added **four rules to the page with no
meaning attached to any of them** — precisely the proliferation this direction is most likely to
fail on. Spacing separates those rows perfectly well.

**There is no decorative dashed rule in the stylesheet and none may be added.** If a dashed line
appears anywhere on this site, it means something is not measured.

---

## F. Register labels

The Session 14A rule (`docs/17-visual-validation/08_REGISTER_LABEL_RULE.md`) is carried **unchanged
and binding**. It was not weakened, rewritten or re-scoped to make this page pass.

**RL-1** never without an argument-register heading · **RL-2** label and heading in the same
viewport band · **RL-3** no labels on sub-regions · **RL-4** at most two per page, on set-piece
regions only · **RL-5** never the heaviest element in any band, at any width.

**The homepage spends both**, on its two genuinely epistemic set-pieces: *"what we answer for"*
(the accountability boundary) and *"what is published and checkable"*. Both sit beneath a rule,
above a heading 6–14px larger, and **neither is dominant in its band at either width** — measured,
not asserted (`04_F2_F3_HOMEPAGE_RETEST.md`).

They are orientation metadata. **They are never focal objects, never badges, never eyebrows, and
they are not the scan layer** — scannability is carried by the rationed hairlines, the verb-led
headings and the large jumps in the type scale.

---

## G. Actions

**Three kinds. There is no fourth, and no colour variant of any of them.**

| Kind | Form | Where |
|---|---|---|
| **Primary action** | Filled `--ink`, ground-coloured label, 2px border, 2px radius, min 48px tall | First screen · end of page. **Max 2 per page** |
| **Peer action** | Transparent, 2px `--ink` border, same size, same weight | Beside the primary, at **equal confidence** — never framed as the lesser route |
| **Textual action** | A link, deliberately | PROOF and CONTEXTUAL routes, beside the claim they support |

**States.** Hover: primary fills with `--mark`; peer borders and labels take `--mark`; textual
actions thicken their underline. Focus: the sitewide 3px `--mark` ring at 3px offset, verified with
a real keyboard `Tab`. Disabled: defined once, used nowhere on this page — it exists so that the
first real form does not invent one.

**The object/link distinction is load-bearing, not styling.** A PROOF route rendered as a button
reads as a step in a flow when it is an offer; a primary rendered as an inline link makes a reader
hunt for the conversion.

**Energy comes from contrast against restraint** — never from size, saturation, a coloured band, an
arrow, a shadow or a pill. There is no pill and no rounded card in the vocabulary: radius is capped
at 2px, which is effectively square.

**The header's primary control is a mark-underlined link, not a filled button.** A filled button
sitting permanently in the header is the persistent sales control the approved rules prohibit.

---

## H. Evidence apparatus

| Element | Treatment |
|---|---|
| **Provenance line** | Apparatus register, 16px, one labelled line each: what · when · where · how many · by whom |
| **The band** | No fill, no radius, no shadow, no border. **One edge only — the tie** |
| **Status mark** | A **drawn SVG shape** (never a font glyph, so it cannot fall back to tofu) plus a word. Colour contributes nothing |
| **Scope / limitation note** | Same register, same size, adjacent — stated in words, never by colour |
| **Expandable detail** | Native `<details>`. **The control names what it reveals** — never "More", never a bare chevron. Opens downward, in place, with no layout shift above the reader's line |
| **Limits** | **Argument register, body size, full measure, always open.** Not a band, not a disclosure, never inside one. There is no state in which a limit is closed |
| **Measured zero** | The ordinary measured mark and the ordinary register. See B.1 |
| **Not testable** | Hatched square plus the words. Named, never characterised |

Verified on the homepage: **1 limits region, always open, at both widths, not inside any
disclosure**; **2 disclosures, both closed by default, both keyboard-reachable, both forced open in
print**; apparatus contrast **8.81 : 1**.

---

## I. Figures

| Rule | How the stylesheet enforces it |
|---|---|
| Constant stroke width, identical node size, equal spacing | **There is no way to taper.** A funnel cannot be produced from these classes |
| No per-stage colour | The chain is ink; the mark appears only on marks and the boundary |
| Labels are real text | Every label is an SVG `<text>` node. Nothing is baked into an image |
| Readable in greyscale | Measured = solid · not measured = dashed · recessive = lighter stroke, never a different hue |
| Text equivalent | Every figure carries an expandable table, in the DOM, keyboard-reachable, open in print |
| Labels never below 16px | **Figures are not scaled to fit.** Below the width its horizontal form needs, a figure is **replaced by its genuine vertical drawing** — a different drawing, not a smaller one |
| One full-weight figure per page | Observed |

**Figure classes are honoured as assigned, not as convenient.** The homepage carries **A — FULL
RUN** at block 3 and **C — STATE** at block 4. The state view is deliberately reduced — the same
chain, the same spacing, the same node size, drawn once more with **only** the three states the
section's paragraphs describe. It is a state on one object, not a second figure, and the design
makes that visible by removing every point label the full figure already carries.

**[FOUND BY RENDERING] Both figures had label collisions in their first drawing** — an annotation
running through a boundary label at WIDE, and a lead-in label sitting on a point label at NARROW.
Four label layouts were re-cut. Recorded because a figure that is only *specified* is not a figure.

---

## J. Navigation

**Non-sticky on every page. No sticky sales CTA anywhere. No fixed or sticky element exists on the
page at all** (verified: zero elements with `position: fixed` or `sticky`).

**The two-control rule, implemented.** *What we do* is a **real link** to `/services`; the
disclosure is a **separate adjacent control** with `aria-expanded` and its own accessible name.
Collapsing these into one element reintroduces the defect where `/services` is unreachable from the
navigation, and this is a behaviour decision the design must not undo.

- **WIDE:** six items inline, the disclosure panel opening beneath its parent, then the one primary
  control. Current page indicated by a rule, never by colour alone.
- **[FOUND BY RENDERING] NARROW: the header is two rows.** On one row the primary control's label
  pushed the menu control **entirely off-screen**, where the sheet's clip made it unreachable. The
  bar is now *identity + menu*, then *the primary control at full width*. **Neither the CTA label
  nor the menu was shortened or hidden to make them fit.**
- The narrow panel is a native `<details>` carrying **all six items plus the five children plus the
  primary control** — mobile removes nothing.
- `Escape` closes both the dropdown and the narrow panel and returns focus to the control that
  opened it. Verified with real key events.

**One script, ~15 lines, and nothing depends on it.** With JavaScript off the parent is still a
link, every child is still reachable from `/services`, the narrow panel is still a native
disclosure, and no content, evidence or limit is hidden.

---

## K. Forms and inputs — foundation only

**No form is designed here and no CRO behaviour is changed.** This exists so that the first real
form does not invent a field treatment.

Label above the field, in the argument register · square field, 2px radius, `--rule-strong` border
· 48px minimum height · focus takes the `--mark` border in addition to the sitewide ring · **hint
and error are stated in words, in the apparatus and argument registers respectively, never by
colour alone**, and the error carries the annotation tie rather than a red fill.

---

## L. Footer

Four columns plus an entity block, per the approved architecture. Columns are 4 / 2 / 1 by width;
entity facts, when they exist, remain fully readable and are never collapsed.

**Footer links are underlined** — the affordance does not rely on colour, which fixes the named
sitewide defect.

**The entity block is owner-blocked (case A) and nothing is drawn for it.** No container, no
heading, no partial address, no placeholder. A "MappedSkills" legal line was drafted and **removed**
during this session for exactly that reason: it was drawing something for a blocked slot.

---

## M. Motion

> **There is none, and that is the finding again at page scale.**

Measured on the rendered page: **0 running animations, 0 elements with a transition or animation
declared.** The only interactive behaviours are two native disclosures and the navigation panel, all
instant. Nothing on the first screen animates; no number moves; the static hierarchy carries
everything.

The optional enhancement the approved direction permits — a single non-blocking sequential reveal of
the figure on entering view — **remains permitted and remains unbuilt**, because nothing depends on
it and the static state has now been shown to carry the whole page.

---

## N. What this foundation does **not** decide

Final font families, weights or optical sizes · final colour values · dark mode · numeric
breakpoints as programme doctrine (the two container thresholds used here — 900px for the header
and 1000px for the apparatus margin, plus 1180px for the figure form swap — are **derived from the
content's own required width**, not chosen as a system) · component APIs · the full state matrix ·
page templates for the other 21 routes · an icon set (there are still zero icons) · photography
treatment (there is still no photography, because no slot on this page could carry anything but
stock or staged imagery) · print stylesheet beyond disclosure expansion · performance budget ·
production CSS architecture · any production change.

**And it does not pass Gate 10.**
