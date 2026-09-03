# Complete-Page Proof — `/seo` — Session 14A — PROPOSED

**Session:** 14A — Narrow visual closure · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** The specimen is `prototype/05-seo-complete.html`.
**Direction:** 2 — THE WORKING SHEET. **Not reopened.**

> **Everything below was rendered and inspected.** Band composition, dominance, area share,
> contrast, focus, figure form, overflow and horizontal-scroll behaviour were **measured in a
> browser at 1400×900 and 390×844**. Three defects were found by looking at the page and are
> recorded in §3 with their fixes.

---

## 1. What was built

The **complete** `/seo` page — not a section pair. Approved nine-move commercial pattern, moves
**1, 2, 3, 4, 5, 6, 8, 9** with **move 7 compressed inside move 6** (`05` §4.1). Approved copy
verbatim. Header (non-sticky), breadcrumb, main, action region and footer all present.

**Nothing was redesigned or rewritten.** The 12-month-plus horizon, the evidence placement, the
measurement limits, F1 PARTIAL, the CTA architecture and the navigation model are as approved.

**The specimen deliberately carries no validation chrome** — no annotation boxes, no artboard
frames, no captions. Viewport-height bands measured against `09_VISUAL_WEIGHT_RUBRIC.md` are
therefore the bands a real reader experiences, not bands distorted by commentary.

### 1.1 Not drawn, and no placeholder drawn for them
| Slot | Case | Blocker |
|---|---|---|
| DIRECT phone/WhatsApp peer at move 9 | **B** | Published phone number owner-blocked |
| Footer entity block (NAP) | **A** | Complete NAP owner-blocked — nothing rather than a partial address |

---

## 2. Repetition census — the drift evidence

Counted on the rendered complete page.

| Device | Count on the whole page |
|---|---|
| Hairline rules | **4** |
| Set-piece rules | **1** |
| **Register labels** | **1** *(budget under RL-4: 2)* |
| Ground changes | **2** *(budget under A23: 2)* |
| Annotation ties | 2 |
| Evidence disclosures | 2 — **both closed by default** |
| Figures | 1 |
| Limits regions | 2 — **both always open, neither inside a disclosure** |
| **Cards** | **0** |
| **Icons** | **0** |
| Status marks | 0 *(this page carries no status-bearing claim)* |
| PRIMARY action objects | 2 — first screen and end, matching the budget in `08` §3 |
| Scripts | **0** |

**Four hairline rules and one register label across nine mobile screens.** That is the numeric
answer to the archive-drift question, and it is the number Session 14 said would have to be
counted rather than felt.

---

## 3. Three defects found by rendering, and their fixes

**Recorded because a proof that reports no defects has usually not been looked at.**

### 3.1 The figure's tabular equivalent occupied an entire screenful
At WIDE, band 4 of the first build was largely a `<table>` restating a figure whose every label
is already real text. `19` §6 is explicit: *"a figure replaces the prose that carried the
structure — it does not sit beside it as an illustration of it. If both the paragraph and the
figure survive, the page got longer and nothing was achieved."*

**Fix:** the tabular equivalent became an **EXPANDABLE disclosure** — *"Read this figure as a
table"*. It remains in the DOM (crawlable and retrievable, which the strategy values),
keyboard-reachable, and forced open in print. Nothing is hidden that the figure does not already
draw.

### 3.2 The figure scrolled sideways at NARROW instead of taking a vertical form
Measured: a 1120px drawing inside a 342px container, scrolling horizontally. Labels stayed at
16px and the page body did not scroll — but `13` §3.5 and `22` §6 require **a genuine vertical
form, never a scaled-down horizontal one**, and Session 14's own finding F-R1 said *swap, do not
scroll*.

**Fix:** a **vertical drawing of the same object** now renders below the width the horizontal
form needs. Same six points, same dashed lead-in, same accountability boundary, same unattached
arrival. The threshold is derived from the horizontal figure's own required width — **it is not a
chosen breakpoint**, and numeric breakpoints remain a Gate 10 output.

### 3.3 There was no narrow header, and it cost the first screen
The header rendered as a wrapped list of six links plus the CTA, consuming roughly half the
NARROW first screen. The H1 began at y≈700 and **both hero actions fell below the fold.**

**Fix:** the approved narrow behaviour from `46` STATE 3 — a **native `<details>` panel**, no
script, all six items present, with the header CTA staying visible in the bar itself. The H1 now
begins at **y≈243** and the first PRIMARY action sits above the fold.

> **This defect invalidated the first NARROW measurement**, which is why §5's numbers are from
> the re-run. It is also the clearest argument for the brief's insistence that a proof be
> rendered rather than described: nothing in the section-pair proof could have surfaced it.

---

## 4. Complete page at WIDE — 1400 × 900

**Six assessable bands** (the seventh is footer-only).

| Band | Dominant object | Class | Area leader | Area share |
|---|---|---|---|---|
| 0 | *"SEO that is judged on the enquiries it produces."* — 76px | **COMMERCIAL** | COMMERCIAL | 100% |
| 1 | *"Being found is only useful if the visit turns into something you can quote for."* — 38px | **COMMERCIAL** | COMMERCIAL | 100% |
| 2 | *"How long this takes, and what we will not promise"* — 30px | **LIMIT** | LIMIT | LIMIT 60 / COM 40 |
| 3 | *"How you will know whether it worked"* — 30px | **COMMERCIAL** | COMMERCIAL | COM 40 / EVD 31 / FIG 11 / LIM 17 |
| 4 | *"The three questions we get asked here"* — 30px | **COMMERCIAL** | COMMERCIAL | COM 49 / FIG 45 / LIM 6 |
| 5 | *"Tell us what search is currently doing for you"* — 30px | **COMMERCIAL** | COMMERCIAL | 100% |

**Dominance: COMMERCIAL 5 · LIMIT 1 · EVIDENTIAL 0.**

### 4.1 Findings
- **The first screen is clean.** H1 at 76px, zero apparatus, breadcrumb and header are navigation
  chrome, both actions above the fold.
- **The consequence statement is the page's second-heaviest object** and it is a commercial
  statement about what the buyer's problem costs — `16` §4 A3 rendered.
- **The boundary is one band, and it is meant to be.** `05` §4.1 calls the horizon *"the single
  most important thing on this page for qualification."* It is a set-piece, it is elevated, and
  it occupies one screenful.
- **The ground change does real work.** Entering the tinted region and returning to the ordinary
  ground at move 6 is a legible "you are inside a bounded region and it has ended" signal. It is
  the design's only lever on the boundary's length, and it earns its place.
- **The action region is unmistakable** after five bands of argument, limit, figure and
  provenance. The isolation whitespace before it is the largest gap on the page.

---

## 5. Complete page at NARROW — 390 × 844

**Nine assessable bands** (the tenth is footer-only). Page height 7 829px — about nine screens.

| Band | Dominant object | Class | Area leader | Area share |
|---|---|---|---|---|
| 0 | H1 — 36px | **COMMERCIAL** | COMMERCIAL | 100% |
| 1 | consequence statement — 24px | **COMMERCIAL** | COMMERCIAL | 100% |
| 2 | *"What the work involves, month to month"* | **COMMERCIAL** | COMMERCIAL | 100% |
| 3 | *"How long this takes, and what we will not promise"* | **LIMIT** | **LIMIT** | LIM 62 / COM 38 |
| 4 | *"How you will know whether it worked"* | **COMMERCIAL** | **LIMIT** | LIM 55 / COM 45 |
| 5 | *"Broken down by where they came from…"* | **COMMERCIAL** | **EVIDENTIAL** | EVD 53 / COM 27 / FIG 19 |
| 6 | *"The three questions we get asked here"* | **COMMERCIAL** | FIGURE | FIG 56 / COM 37 / LIM 7 |
| 7 | *"Tell us what search is currently doing for you"* | **COMMERCIAL** | COMMERCIAL | 100% |
| 8 | the PRIMARY action object | **COMMERCIAL** | COMMERCIAL | 100% |

**Dominance: COMMERCIAL 8 · LIMIT 1 · EVIDENTIAL 0.**

### 5.1 Findings
- **No horizontal body scroll.** Verified at 390px.
- **The apparatus margin re-parents inline**, in DOM order, beneath the claim it supports.
- **Both limits regions stay open.** Neither is inside a disclosure at any width.
- **The figure takes its vertical form**, fits the column, and no label overflows.
- **The first screen holds move 1, move 2 and one PRIMARY action.** The peer booking action ends
  **63px below the fold** — `48` §2.2 requires *confirm + bridge + one `[ACT]`*, which is met.
  Reported precisely rather than rounded up.
- **Band 5 is the clearest demonstration of the doctrine on the whole page.** Apparatus holds
  **53% of the area** — the most anywhere — while a commercial statement governs the screen.
  *Presence is evidential; emphasis is commercial*, measured.

### 5.2 The narrowest margin on the page, stated plainly
**Bands 3 and 4 are the pressure point.** Band 3 leads on both axes for LIMIT; band 4 leads on
area for LIMIT while a commercial heading governs emphasis. Together they are roughly 1.7 mobile
screens in which boundary prose leads the area.

This **passes** the rubric — condition 3 requires a contiguous run of two or more bands leading on
**both** axes, and band 4 does not. It passes on the merits too: cumulative limit material is one
emphasis-dominant band and two area-leading bands out of nine, so limits plainly do not exceed
capability at page level, which is what B32 asks.

**But it is a one-band margin, and it is the thing to re-check if the boundary copy ever grows or
if the ground-change allocation changes.** The design has no further lever here: the copy is
approved and may not be shortened by a designer, and the second ground change is already spent on
the action region.

---

## 6. The eight full-page validation questions

| | Question | Answer |
|---|---|---|
| **A** | **Commercial first impression** | **Yes.** Bands 0–2 at both widths are wholly commercial. A buyer meets the capability, the problem, its cost and an action before any apparatus. The first apparatus object on the page is the move 7 disclosure control, in band 3 (WIDE) / band 5 (NARROW) |
| **B** | **Evidence supports without becoming the subject** | **Yes.** Apparatus is present in three bands and governs none. Both disclosures are closed by default, so the page's resting state shows argument and a named control, not machinery |
| **C** | **Limitations visible and credible without overpowering** | **Yes, with the margin in §5.2 stated.** The boundary is a set-piece with its own ground and its own rule, at full type quality, always open — and it is one band of six at WIDE, one of nine at NARROW |
| **D** | **Repetition / archive drift** | **No drift.** 4 hairlines, 1 set-piece rule, 1 register label, 2 ties, 0 cards, 0 icons across nine mobile screens. See §2 |
| **E** | **F1 explanatory and bounded** | **Yes.** One figure, once, in one section. Not in the header, background, divider, loader or footer. It does not taper, carries no per-stage colour, no numbering, no arrowheads and no branded name |
| **F** | **CTA obvious after the evidential sections** | **Yes.** Two PRIMARY objects — first screen and end — with the page's largest whitespace before the action region and its own ground change. It is the only bounded, filled object on the page |
| **G** | **NARROW preserves the hierarchy** | **Yes.** 8 of 9 bands commercial-dominant, versus 5 of 6 at WIDE. Evidence density rises (band 5 reaches 53% apparatus area) **and never takes over a screen** |

---

## 7. Accessibility and usability — measured on this page

| Check | Result |
|---|---|
| Contrast | ink **15.86:1**, apparatus ink **8.77:1 (AAA)**, accent **6.58:1** on the ground |
| Focus | **Verified with real keyboard Tab**: `:focus-visible` true, `solid 3px` accent, `3px` offset. *(Note: programmatic `.focus()` does not match `:focus-visible` in Chrome and returns `none` — an earlier reading of "none" was that artefact, not a missing ring.)* |
| Type sizes | body 18px · apparatus 16px · figure labels 16px · **nothing important below 16px** |
| Hover-only content | **None.** Every `:hover` rule in the stylesheet changes only colour or underline thickness — verified by inspecting all four |
| Colour-only meaning | **None.** Links underlined; no status on this page depends on hue |
| Greyscale | Inspected at WIDE with all colour removed: register, tie, ground change, figure and links all remain legible and distinguishable |
| Script | **Zero `<script>` tags, zero inline handlers.** Both disclosures are native `<details>`; the dead-control failure `45` STATE 4 prohibits cannot occur |
| Keyboard | Skip link present; disclosures and the narrow menu are native and operable; no focus trap exists because no script creates one |
| Horizontal body scroll | **None** at 1400px, 900px or 390px |

---

## 8. Residual observations for Gate 10

1. **The header CTA label is long at NARROW** and pushes the header to two lines. A shorter
   header-bar form may be needed. Not a defect; a refinement.
2. **The ground-change region stops at the content's right edge** rather than bleeding full
   width, because the composition is left-anchored and asymmetric. Both readings satisfy A23.
   Which one is correct is a Gate 10 decision.
3. **The figure-form threshold** is currently derived from the horizontal drawing's required
   width. Gate 10 must convert it to a real breakpoint alongside the rest of the scale.
4. **Print remains unverified.** The stylesheet forces disclosures open; no print output was
   produced or inspected in this session.
