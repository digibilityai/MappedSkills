# Provisional Visual Language — Session 14 — PROPOSED

**Session:** 14 · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED and PROVISIONAL.** Implemented in `prototype/the-record.css`.

> **Scope discipline, stated first.** This defines **only what the four validation slices need
> to be internally coherent and testable.** It is deliberately not a design system. There is no
> exhaustive token set, no complete spacing scale, no component API, no full state matrix, no
> page template, no numeric breakpoint and no dark mode. Those are Gate 10 outputs and producing
> them here would harden a system on the evidence of four slices.

---

## 1. Typography

### 1.1 The two registers

| | Argument register | Apparatus register |
|---|---|---|
| **Provisional family** | **Archivo** | **IBM Plex Mono** |
| **Carries** | H1, headings, body, the commercial statement, figure point labels | Provenance, date, sample, scope, status, source, register labels, figure annotations |
| **Where it may appear** | Anywhere | **Metadata only**, at small optical sizes |
| **Where it may never appear** | — | A headline · body copy · a hero · a CTA · anything presented as a technical-credibility signal · on a dark ground · with a prompt, caret or terminal chrome |

**Both families are provisional and neither is load-bearing.** Final selection is Gate 10. With
no network the prototype falls back to system faces and every structural claim still holds. What
*is* decided here is that the distinction is **semantic, consistent and never decorative** — and
that if monospace is the apparatus face it is bounded by the row above, per `07` §3.1's caution.

**Deliberately not chosen:** Inter and the other current toolchain defaults. `07` §4 rule 2 makes
the point about neutrals; the same argument applies to type. A defaulted face is category
membership.

### 1.2 The scale — few steps, large jumps

| Role | Size | Notes |
|---|---|---|
| H1 | `clamp(2.25rem, 9cqi, 4.75rem)` — 36px at NARROW, 76px at WIDE | Container-relative, not viewport-relative, so a narrow column is genuinely narrow |
| **Consequence statement** | `clamp(1.5rem, 4.6cqi, 2.375rem)` | **Larger than a section heading, deliberately** |
| Section heading | `clamp(1.375rem, 3.4cqi, 1.875rem)` | |
| Lede / hero support | 1.25rem | |
| Body | **1.125rem (18px)**, line-height 1.62, measure 66ch | |
| **Apparatus, all of it** | **1rem (16px)** | Provenance, status, register labels, figure labels, captions. **Nothing in the apparatus is smaller than this** |

**The consequence statement out-ranks the section heading.** This is not a typographic accident:
`16` §4 A3 requires the statement of what the buyer's problem costs to carry *"the page's heaviest
emphasis — heavier than any figure, any number and any apparatus."* A system where the heading is
always the biggest thing cannot obey that rule.

### 1.3 The single most consequential decision in this document

> **The apparatus is set at 16px — the body minimum — in a different register, not at a smaller
> size. Subordination is bought entirely with register, measure and position.**

This is the design-system-level form of `08` §8 rule 1 (*never smaller-grey-italic*), of
`13` §2.2 (*nothing important below the body minimum, including apparatus, captions and figure
labels*), and of `17` §2 (*subordinate in prominence, not in type quality*). It is also the rule
most likely to be traded away later for visual tidiness, which is why it is stated as a number.

### 1.4 Fixed behaviours
Sentence case always · no all-caps, no condensed display faces, no letter-spacing effects, no
text-as-graphic, no headline ever set as an image · two or three weights total (400, 500, 600 in
the proof) · emphasis by weight, used rarely · **italic emphasis is disabled at the stylesheet
level** — `em` renders as weight, per `VOICE_AND_TONE.md` §13 · **tabular lining numerals set on
`body`**, so every numeral on the site is a recorded value by default (`07` §3.6, verified in
browser).

---

## 2. Colour

**No hue carries meaning anywhere in the proof.** Every status, every state and every figure is
readable with all colour removed. Colour does exactly three jobs: it is the ground, it is the
ink, and it marks.

| Token | Value (OKLCH) | Computed sRGB | Contrast on ground | Role |
|---|---|---|---|---|
| `--ground` | `0.982 0.006 85` | `#fbf9f5` | — | Warm off-white. **Not pure white** |
| `--ground-set` | `0.950 0.010 82` | ~`#f2efe8` | — | **Deliberate ground change. At most two per page** (A23 as amended) |
| `--ink` | `0.235 0.012 62` | `#221d18` | **15.86:1** | Argument register |
| `--ink-2` | `0.400 0.012 62` | `#4d4641` | **8.77:1 — AAA** | Apparatus register |
| `--ink-recess` | `0.560 0.012 62` | `#7a736d` | 4.43:1 | **Figure stroke only. Never text** — it does not meet the 4.5:1 text floor |
| `--rule` | `0.855 0.008 78` | `#d2cfca` | — | Hairline |
| `--rule-strong` | `0.420 0.012 62` | `#524c47` | 8.06:1 | Set-piece opener |
| `--mark` | `0.460 0.078 218` | `#106275` | **6.58:1** | **The accent** |

**Contrast figures were computed from the OKLCH values, not estimated.** The apparatus register
lands at AAA, which is the numeric answer to *"is the provenance grey-on-grey?"*.

**The accent.** A deep petrol ink. It is used only as a **mark**: the annotation tie, links, the
focus ring, the intervention marks and the accountability boundary on a figure. It is not a brand
wash, not a fill, not a gradient, not a section tint and not a state.

**Deliberately not used:** the current production `--ms-red: #C41E3A`, and any red, amber or
green anywhere. `--ms-red` is an alarm-adjacent hue, and B6 prohibits any colour that grades a
result. Blue was avoided as the category's SaaS default and purple as the AI cliché (B12).

**`--ink-recess` is a real constraint discovered by computation, not a preference.** It sits
below the text contrast floor, so the recessive remainder of a PARTIAL figure may be drawn in it
but may not be *labelled* in it — recessive labels use `--ink-2`.

---

## 3. Surfaces

One continuous ground with things set on it. **No card, no panel, no tile, no fill, no elevation,
no shadow.** Radius is capped at 2px, which is effectively square — there is no pill and no
rounded card in the vocabulary.

Cards remain permitted for the one case the approved direction allows — research entries and
articles, rule-bounded, not filled and shadowed — and **none appears in these four slices**,
because none of the four is that content type.

Ground changes are counted, not felt: **at most two per page**, marking a genuine set-piece,
typically the accountability boundary and the CTA region. Never alternating, never per-section,
never decorative.

---

## 4. Rules

Four kinds, one meaning each, deliberately few — because a generative rule vocabulary is this
direction's named risk.

| Kind | Weight | Means | Budget |
|---|---|---|---|
| **Hairline** | 1px `--rule` | An ordinary section begins | Unrationed, but always paired with a register label |
| **Set-piece rule** | 2px `--rule-strong` | A set-piece begins | **At most two per page** |
| **The tie** | 2px `--mark`, vertical, full height of the block | *This provenance belongs to that claim.* Doubles as the focus indicator | One per apparatus block |
| **Dashed** | — | **An epistemic gap. Nothing else, ever** | Figures only |

> **There is no decorative dashed rule in the stylesheet, and none in the validation chrome
> either.** The fold marker and the annotation boxes in the prototype were drawn solid
> specifically so that the dashed convention is not diluted even in a document nobody ships.
> If a dashed line appears anywhere on this site, it means something is not measured.

---

## 5. Spacing and rhythm

A 4px base with large jumps: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128. **This is not
proposed as the final spacing scale** — it is the smallest scale that makes four slices coherent.

Two rhythm rules are load-bearing and are proposed for retention:

1. **The reading column is protected at every width.** 66ch measure, 1.62 line-height, and it
   does not stretch when there is room beside it.
2. **The whitespace before an action region is the largest gap on the page** — larger than any
   section gap. *"The pause before it is what makes it read as intentional rather than pushy"*
   (`16` §4 D3). It is how prominence is bought without aggression.

---

## 6. Evidence treatment

| Element | Treatment |
|---|---|
| **Provenance line** | Apparatus register, 16px, one dot-separated line: what · when · where · how many · by whom |
| **The band** | No fill, no radius, no shadow, no border. **One edge only — the tie** |
| **Status mark** | A **drawn** geometric shape (SVG, not a font glyph, so it cannot fall back to tofu) plus a word. Colour contributes nothing |
| **Scope note** | Same register, same size, adjacent |
| **Expandable disclosure** | Native `<details>`. The control names what it reveals — never "More", never a bare chevron. Opens downward, in place, with **no layout shift above the reader's line** |
| **Limits `[LIM]`** | **In the argument register, at body size, at full measure, always open.** Not a band, not a disclosure, never inside one. There is no state in which a limit is closed |

### 6.1 The status vocabulary as drawn

The set is closed at eight and is greyscale-safe by construction: **measured** filled square ·
**observed** filled circle · **inferred** filled triangle · **owner-supplied** half-filled square
· **unmeasured** open square · **not testable** hatched square · **unattributed** open diamond ·
**changed** square within a square.

**The pair the whole doctrine turns on:** *unmeasured* is an **open** square — could be measured,
has not been. *Not testable* is a **hatched** square — could not be measured at all. They are
different shapes, they carry different words, and neither can be read as a value. Verified in
greyscale in the browser.

**Never aggregated.** Nothing in the vocabulary can be summed, scored, averaged, badged or
metered, and no traffic light exists.

---

## 7. Annotation

The **annotation tie** — a 2px mark-coloured vertical stroke at the left edge of an apparatus
block, at the block's full height. It is the visible act of citing.

It also serves as the **focus indicator** (3px solid `--mark`, 3px offset), so accessibility is
part of the identity rather than a compliance layer. Verified in the browser.

**What annotation never is here:** a callout bubble · a tooltip · a superscript number · a
footnote reference · a hover reveal · a modal.

---

## 8. Figures

| Rule | Consequence in the stylesheet |
|---|---|
| Constant stroke width, identical node size, equal spacing | **The vocabulary offers no way to taper.** A funnel cannot be produced from these classes |
| No per-stage colour | The chain is ink; the accent appears only on marks |
| Labels are real text, never baked into an image | Every label is an SVG `<text>` node |
| Readable in greyscale | Measured = solid; not-measured = dashed; recessive = lighter stroke, never a different hue |
| Every figure has a text or tabular equivalent | A `<table>` follows each figure, plus `<title>`/`<desc>` for assistive technology |
| Figure labels are never below the body minimum | **Figures are not scaled down to fit.** Below the width a figure needs, it scrolls inside its own container; at NARROW it is replaced by its **genuine vertical form**, which is a different drawing rather than a smaller one |
| At most one figure of full weight per page | Observed in all four slices |

**A finding from rendering, recorded because it changes an implementation rule:** scaling an SVG
scales its labels, so `max-width: 100%` on a wide figure silently pushes figure text below the
16px floor. The stylesheet therefore does **not** scale figures. This is a Gate 10 input.

---

## 9. Photography

> **Proposed for these four slices: none.**

Not an omission by oversight. Photography is permitted only where a **real, identified person**
or a **real, specific place** is the subject. None of the four slices is such a location:
`/about` portraits and author bylines are the launch uses, the people input is **owner-blocked**,
and no client work may be shown. **A photograph in any of these four slices could only have been
stock or staged, and both are prohibited without exception.**

Where photography does appear later, the approved treatment stands unchanged: the actual person,
in the actual working environment, environmental rather than tightly cropped, unposed, natural
light, minimal treatment, no duotone, no brand-colour overlay, no cut-out on a coloured field.

**Omission is better than decorative stock imagery, and it is what this proof does.**

---

## 10. Iconography

Minimal and functional. In these four slices exactly two things exist:

1. The **disclosure control's marker** (▸ / ▾) — a UI affordance, drawn in CSS, always
   accompanied by a text label naming what it reveals.
2. The **evidence status marks** — which are *marks*, part of the type system, drawn as SVG,
   always paired with a word.

**There is no icon for any capability, no icon in any heading, no icon on any CTA, no icon-font,
and no `icon + title + two lines` card anywhere.**

---

## 11. Motion

> **There is none in the proof, and that is the finding.**

No animation, no transition on load, no reveal, no parallax, no counter, no scroll effect. The
one interactive behaviour is the native disclosure, which is instant.

This is not motion-avoidance for its own sake. `11_MOTION_AND_INTERACTION_PRINCIPLES.md` §2
requires the static state to be the **primary** state, and a bounded validation exercise should
therefore prove the static state carries everything. It does. The optional enhancements the
approved direction permits — a single non-blocking sequential reveal of a figure on entering
view, and a quiet transition when switching the system under examination — remain permitted and
remain unbuilt, because nothing depends on them.

Binding, unchanged: **nothing on the first screen animates · no number ever moves · any
explanatory motion must have a complete static state carrying the same information.**

---

## 12. What this document does not decide

Final font families, weights or optical sizes · final colour values · the complete type scale ·
the complete spacing scale · the grid · component definitions or APIs · every interactive state ·
page templates · numeric breakpoints · dark-mode treatment · icon set · print stylesheet beyond
disclosure expansion · performance budget · production CSS architecture.

**And it does not pass Gate 10.**
