# Visual Grammar — APPROVED

**Session:** 12 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** APPROVED — 2026-09-01 (Gate 9A, `DEC-015`). Assumes the recommended territory (**The Record**) is selected. If a different territory is approved, this document is superseded.

**Scope discipline:** this is direction, not specification. **No final font, no hex value, no type scale, no spacing scale, no grid definition and no component appears in this document**, deliberately. Everything here is a rule a designer must obey and a decision they must still make.

---

## 1. Composition

**The spine.** Left-anchored and asymmetric. Content has a consistent left edge that runs the length of the site, the way a kept record has a margin. Centred composition is reserved for a very small number of genuinely symmetrical moments and is never the default — a centred hero with a pill button was observed on three unrelated sites in this session's research and is the current toolchain default.

**Two columns of unequal job.**
- **The reading column** carries the argument. Measured, comfortable, never dense.
- **The apparatus column** carries provenance. Narrower, quieter, always adjacent, never hidden.

The apparatus column is a **content relationship**, not a layout feature. On narrow screens it collapses to inline disclosures beneath the statement it belongs to; it never disappears and it never becomes a footer. See `13_RESPONSIVE_ACCESSIBILITY_PRINCIPLES.md` §3.

**Grouping by rule and space, not by container.** Cards are permitted only where content is genuinely a set of discrete comparable items — research entries, articles — and then are rule-bounded, not filled and shadowed. Everything else is separated by hairline rules and by space.

**Figures are full-width events.** An explanatory figure breaks the column structure deliberately and is the visual peak of its section. There is at most **one** figure of that weight per page.

---

## 2. Hierarchy, rhythm and contrast

**Hierarchy** comes from three channels, in this order: **type size · register · rule**. It does not come from tint, elevation, shadow, border-radius or colour.

**The page rhythm** every page follows:
> **claim → apparatus → claim**, with a figure at the argument's turning point.

A reader learns this within one screen, which is what makes the site skimmable despite carrying dense provenance.

**Contrast is spent on type and marks, not on surfaces.** Adjacent sections do not alternate background tints. The site should read as one continuous ground with things set on it, not as a stack of coloured bands — banded sections are how a page becomes a list of modules, and a list of modules is a service menu.

---

## 3. Typography direction

**No font is chosen here.** Two constraints below are strategic and must survive font selection; the rest are behaviour.

### 3.1 The two registers — the mechanism of the whole direction

| | **Argument register** | **Apparatus register** |
|---|---|---|
| Carries | What the firm says: headlines, body, the commercial statement | Provenance: date, sample, systems, run count, method, scope, status, version, source |
| Character | Editorial, plain, warm enough to be read at length | Technical, compact, precise |
| Behaviour | Long-form-grade; sustained reading | Scanned, compared, referenced |
| Must be | Instantly the more prominent of the two | Instantly recognisable as a different *kind* of text |

Whether the distinction is serif/sans, sans/mono, or one family at two very different optical sizes is a **design-phase decision**. What is decided here: **the distinction exists, it is semantic, it is consistent sitewide, and it is never decorative.**

**Caution on monospace.** Mono is the obvious apparatus register and is one step from the fake-terminal aesthetic that `14_DESIGN_ANTI_PATTERNS.md` prohibits. If mono is chosen it must be used at small optical sizes for metadata only — never for headlines, never for body, never for a hero, never as a "technical credibility" signal.

### 3.2 Headline behaviour
Sentence case, always (`VOICE_AND_TONE.md` §4.1). Plain and declarative. Large enough to carry authority; not so large that the first screen holds nothing else. **No condensed display faces, no all-caps, no letter-spacing effects, no text-as-graphic treatment.** The approved H1 in particular is never restyled into an image, split for effect, or animated.

### 3.3 Body behaviour
Optimised for genuine reading. Comfortable measure, generous leading. This site carries `/how-it-works`, two research entries and a runnable five-check diagnostic; all three are read, not scanned.

### 3.4 Scale
A wide range with **few steps and large jumps**. Hierarchy must survive without weight tricks, colour or boxes.

### 3.5 Weight and emphasis
Two or three weights total. Emphasis by weight, used rarely. `VOICE_AND_TONE.md` §13 already prohibits italic emphasis, all-caps and underline in copy; the type system must make those prohibitions easy to obey by not offering them.

### 3.6 Numerals — a hard requirement, not a preference
**Tabular, lining figures everywhere on the site.** On this site a number nearly always sits beside its sample size, its date, its run count, or a second number for comparison. Proportional figures misalign every one of those. Numerals must read as **recorded values**, not as display elements.

Corollaries, all binding:
- **No number is ever set as a display graphic on its own.** A figure appears with its provenance or it does not appear (`VOICE_AND_TONE.md` §8).
- **No number appears in a heading** (§8.6).
- **No number animates.** Counting up is prohibited (`14_DESIGN_ANTI_PATTERNS.md`).

### 3.7 Script and language
**India-first.** The chosen families must have genuinely good Latin support for Indian English and must not break on ₹, lakh/crore formatting, or long Indian place and organisation names. **Devanagari or other Indic script support is NOT a launch requirement** — no multilingual decision has been approved — but selecting a family with a credible Indic companion is cheap foresight and is recommended, not required. This is flagged rather than decided.

---

## 4. Colour direction

**No hex values are specified.** Six rules are.

**1. Light-first, and warm.**
A warm off-white or very pale neutral ground. **Not pure white** — pure white with pure black is the monochrome-minimal trap observed on `Conversion` (2026-09-01). Warmth makes the ground read as a surface something is recorded on.

**Dark mode may exist as a user preference. It is never the brand.** Adopting a dark ground for technical credibility is explicitly prohibited: it was observed on four unrelated sites in this session's research and now signals category membership rather than seriousness.

**2. Neutrals carry the structure, and they are chosen, not defaulted.**
Ground, ink, rule and apparatus text are all neutrals with a deliberate, consistent temperature. **VERIFIED FACT:** the current codebase uses `oklch(… 0 0)` throughout — every neutral has chroma exactly 0. That is a toolchain default, not a decision, and replacing it with a chosen neutral family is the single cheapest step away from category membership.

**3. One accent, and it means "mark".**
Annotation ties, the active state in a figure, the focus ring, the link. It is an **ink** colour, not a brand wash. It is used in small quantities, as marks are.

**4. A second, strictly non-decorative channel for evidence state.**
Known versus unknown. Small, disciplined, and **never the only channel** — every state also carries a shape and a label (`08_EVIDENCE_DESIGN_LANGUAGE.md` §4).

**5. Colour never encodes a judgement. No red-amber-green, anywhere, including in data.**
MappedSkills does not grade outcomes it does not control. A decline is a measurement, not a red. An unmeasured stretch is a fact, not a warning. This rule also protects colour independence.

**6. What colour must never become.**
A gradient · a hero wash · a per-service identity · a decorative section tint · a mood · a glow · an AI signifier · a performance state.

---

## 5. The visual metaphor system — the decision

**The session brief required this to be determined independently, and required a recommendation against one if it would be gimmicky.**

### Recommendation: **yes, but only one, and only as a figure.**

> **Adopt "the run" — the continuous traced route from buyer demand to qualified enquiry — as the site's single recurring explanatory figure. Do NOT adopt it as an ambient brand system.**

**Why a recurring system is justified here.** The approved copy repeatedly asks the reader to hold multi-part structures in their head, and says so explicitly. Homepage Block 3: "Copy alone makes the reader hold six stages in their head." Problem page Move 2: "prose forces the reader to hold four branches in their head." `/how-it-works` §2: "Visual explanation useful here." A recurring figure that the reader learns once and then recognises across pages **reduces total cognitive load and total word count simultaneously** — which serves both the honesty requirement and the owner's not-text-heavy requirement.

**Why it must not become ambient.** A route drawn everywhere, tapering, animated, in the header and behind the hero, is a marketing funnel. The brief prohibits a generic funnel. The distance between the two is one design decision.

### What the run is

One continuous object with six marked points, from the approved `/how-it-works` §3:

> **discovery and source → landing → interaction → the enquiry → the qualified enquiry → opportunity and revenue**

And four things drawn on it that no competitor draws:

| Drawn element | What it means | Where the strategy requires it |
|---|---|---|
| **The accountability boundary** | Where MappedSkills' responsibility ends — at the qualified enquiry | Homepage Block 4; `POSITIONING.md` §4 |
| **The dashed stretch** | A segment that is not measured, or cannot be | `/how-it-works` §4 |
| **The unattached arrival** | An enquiry that arrives with no upstream segment — unattributed | Homepage Block 4: "we record those as unattributed rather than assigning them to a channel" |
| **The client-data segment** | Reported from the client's own system, visually marked as theirs, not ours | Homepage Block 4; `/how-it-works` §3 |

**The last two are the differentiators.** An unattached arrival and a segment attributed to someone else's data are things a competitor would have to be honest to draw.

### Binding rules for the run

1. **It is a figure, never a background, a pattern, a header device, a loader or a page transition.**
2. **It never tapers.** A tapering route is a funnel.
3. **It never has per-stage colours.** A multicoloured route is a transit map, and a transit map of a marketing process is a funnel with better graphics.
4. **It appears on a small, defined set of pages** — the homepage, `/services`, `/how-it-works`, `/conversion-optimization`, the capability pages as an emphasised segment — and **nowhere else**. It does not appear on `/about`, `/pricing`, `/contact`, `/faq`, research entries or articles.
5. **It has a complete static state** that shows everything at once, and a text equivalent that a screen reader and a print stylesheet render correctly.
6. **It is never used to imply a delivery process.** `/how-it-works` §2 is BLOCKED pending owner input; the run describes *what is measured*, not *what MappedSkills does in what order*. Using it as a process diagram would be fabricating the blocked content in graphic form.

---

## 6. Graphic motif — the decision

**Recommendation: yes — the annotation tie, plus the dashed segment.** Two marks, both derived from the strategy, neither an illustration.

### 6.1 The annotation tie *(primary motif)*
A small bracket, tick or rule that **ties a statement to its provenance**. It is the visible act of citing.

Why it is the right motif:
- **It comes from the strategy, not from a mood board.** Every claim on this site carries its source; the tie is that rule made visible.
- **It cannot be mistaken for anything in the category** — not an arrow, not a funnel, not a rocket, not a brain, not a magnifier, not a chart.
- **It works at every scale** — from a mark beside one sentence to a structural device across a figure.
- **It is functional as well as decorative**: the same mark can serve as the **focus indicator**, which makes accessibility part of the identity rather than a compliance layer bolted on. That is a genuinely elegant outcome and is recommended.
- **It is script- and language-neutral**, and survives at 1px.

### 6.2 The dashed segment *(secondary motif)*
A broken line meaning **"not measured, not measurable, or not known"**. It is the mark of honest absence, and it is the only thing on the site that is allowed to be incomplete on purpose.

**Binding rule:** a dashed line on this website **always** means an epistemic gap. It is never used for decoration, for a divider, for a border, or for style. If the meaning is diluted, the site's most distinctive honest device becomes noise.

### 6.3 What is explicitly rejected as a motif
Arrows · funnels · rockets · handshakes · magnifiers · brains · nodes-and-edges network graphics · geometric blobs · gradient meshes · isometric shapes · a monogram pattern · any mark derived from the letter M.

---

## 7. Visual density by page type

Density is a per-page-type decision. **The site must not become text-heavy simply because the strategy is sophisticated** — which is achieved by moving apparatus out of prose and by carrying structure in figures, not by removing substance.

| Page type | Density | What carries it | The specific failure to avoid |
|---|---|---|---|
| **Homepage** | **Medium-low** | Plain first screen; one figure (the run); short blocks; capability routing as a grouped list, **not** a card grid | Becoming a summary of every other page. Block 5 already prohibits equal-weight capability cards |
| **`/services`** | **Medium** | The whole system in one view, with routing | Becoming a catalogue. This page is the enquiry system, not a service menu |
| **Capability pages** | **Medium** | Search-intent confirmation plainly and first; one emphasised segment of the run; apparatus | Becoming eight identical pages. Each page's figure answers a different question |
| **Problem pages** | **Medium-high** | The decision tree and the five runnable checks. **The density here is the value** — the reader is working | A service pitch behind a question-shaped headline. `PAGE_TYPE_CRO_RULES.md` §3 makes this a binding CRO constraint, not just an SEO one |
| **`/how-it-works`** | **Information-rich** | Paired explanation and evidence; the fullest apparatus on the site; measured-versus-unmeasured shown as a figure | Becoming a scientific paper. The argument register must still lead |
| **Research entries** | **Information-rich** | Data, method, per-system results, limits, version history | Blending systems; hiding limits; decorating data |
| **Research index** | **Medium-low** | Metadata-forward entry cards: date · systems · sample · version | Looking full when it holds two entries. Two entries shown honestly beat twelve stubs |
| **Articles** | **Medium** | Editorial reading; named author; one figure at most | Sidebars, related-post grids, sticky CTAs — none permitted (`PAGE_TYPE_CRO_RULES.md` §7) |
| **`/pricing`** | **Sparse-medium** | Price, what moves it, who it is not for | Decoration. A decorated price page reads as defensive |
| **`/about`** | **Medium-low** | Named people, real portraits, plain credentials | Team-grid cosplay; invented milestones |
| **`/contact`, `/schedule-call`** | **Sparse** | The form, the booking surface, NAP, phone, WhatsApp | Proof of any kind. `PAGE_TYPE_CRO_RULES.md` §9: proof here is a distraction |
| **`/faq`** | **Medium** | Question and honest answer | Accordion-everything, which hides answers from readers and retrieval alike |

---

## 8. What this document does not decide

Font families · weights · type scale values · line heights · colour values · spacing scale · grid columns and gutters · breakpoints · border radii · component definitions · any layout.

Those belong to Gate 9B (UX) and the design-system phase.
