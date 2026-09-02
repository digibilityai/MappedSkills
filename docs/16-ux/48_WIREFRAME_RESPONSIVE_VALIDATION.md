# Wireframe — Responsive Validation (NARROW / MEDIUM / WIDE) and the Mobile Structural Set (M1–M7) — PROPOSED

**Session:** 13 — Gate 9B completion pass · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED.** Legend: `30_WIREFRAME_LEGEND.md`. Referenced by name from every master (`31`–`36`) as the width-class companion.
**Source of structure:** `12_RESPONSIVE_UX.md` (full document) · `10_EVIDENCE_INTERACTION_UX.md` §5, §7 · `28_WIREFRAME_SCOPE_AND_FIDELITY.md` §5 (M1–M7 definitions).

> **RE-AUTHORED 2026-09-02 (remediation pass).** The previous version demonstrated **NARROW only** and disposed of MEDIUM in one sentence — that it "is the transitional class between the WIDE diagrams and the NARROW diagrams and is not separately drawn". **That is a claim of coverage, not coverage.** MEDIUM is where the apparatus column disappears, and the apparatus is named in `12` §4 as *the single biggest responsive risk in the direction* — so it is precisely the class that must not be asserted. **All three classes are now demonstrated for all six master types (§2), the missing W6 narrow demonstration is added (§2.6), and §4 records the eleven-point verification actually run.**
>
> **No numeric breakpoint value appears anywhere in this document.** Numeric values are a Gate 10 output (`27` §2, `28` §8).

---

## 1. What the three width classes mean, structurally

**They are defined by what the layout can hold, not by a number.** This is what makes them checkable at Gate 9B without pre-empting Gate 10.

| Class | Definition | The structural consequence that defines it |
|---|---|---|
| **WIDE** | The reading column sits at its protected measure **and there is still room beside it** | **The apparatus margin column exists.** This is the one place a margin form of the apparatus is correct (`12` §14). Multi-item rows sit at their widest arrangement. The reading column **does not stretch** to fill the extra room |
| **MEDIUM** | One reading column at full measure, **and no room beside it** | **The apparatus margin column disappears and every apparatus item re-parents inline, beneath the claim it supports, in DOM order** (`12` §4). Multi-item rows reflow to fewer per row. This is a real transformation, not a scaling step |
| **NARROW** | One column, one hand, and an onscreen keyboard may occupy the lower viewport | Everything is linear. Figures take their **genuine vertical form**, never a scaled-down horizontal one. Limits **tighten rather than relax** (`10` §7) |

**Two rules that hold in all three classes and are checked in §4:**

- **The page body never scrolls horizontally.** Where content is genuinely wide, it scrolls **inside its own container**, with all content present and keyboard-reachable — and that is not a carousel (`12` §7–§8).
- **No content appears at a wider class that did not exist at NARROW** (`12` §14). Additive-by-width content is content the mobile majority never receives.

---

## 2. Per-master transformation — all six masters, all three classes

### 2.1 W1 — Homepage (`31`)

| | Structure |
|---|---|
| **WIDE** | Block 1: H1, supporting line, two `[ACT]` side by side. **Block 3 F1 FULL horizontal**, its `[EVD: EXPANDABLE]` mid-page claims disclosing **into the apparatus margin**. **Block 4 `[LIM]` sits beside Block 3's figure**, adjacent to the mechanism it bounds, open. Block 5 capabilities: one line per capability — a list at every width, never a grid (B14). Block 8: two `[ACT]` on one line |
| **MEDIUM** | **The apparatus margin disappears. Block 3's disclosures re-parent inline, beneath the claim each supports, DOM order unchanged.** **Block 4 `[LIM]` moves from *beside* Block 3 to *directly beneath* it — still ADJACENT-SECONDARY, still open, still after the mechanism it bounds (I4/B28).** F1 FULL is still legible horizontally; it has not yet been re-formed. Block 8's two `[ACT]` remain on one line. **This is the class where the boundary could silently become a footnote, and does not** |
| **NARROW** | See **M1**. F1 FULL takes its **genuine vertical form**. Block 4 expanded, never collapsible. The two `[ACT]` stack. Four first-screen elements must fit |

**What changes between MEDIUM and WIDE that is not a scale change:** the apparatus margin, and Block 4's position relative to Block 3. **Both are structural, and both are load-bearing for the honesty rules.**

---

### 2.2 W2 — Standard commercial page (`32`)

| | Structure |
|---|---|
| **WIDE** | Breadcrumb on one line. Move 5 `[LIM]` full width, open, above the midpoint. **Move 6's F1 PARTIAL discovery segment horizontal**, with the **measurement limits in the adjacent margin beside the measurement claim**, and move 7's compressed evidence disclosing into the same margin |
| **MEDIUM** | **Move 7's `[EVD: EXPANDABLE]` re-parents inline, immediately beneath the claim it supports** — the compression must survive as *in-context*, not migrate to the end of the section. **The measurement limits move from beside the claim to beneath it, still adjacent, still open, still not collapsible.** The F1 PARTIAL segment is short enough to remain horizontal at this class, and **its recessive remainder must not be dropped to save width** — dropping it would turn a PARTIAL view into an apparently complete chain, which `22` §6 rule 3 prohibits. Breadcrumb may wrap to two lines; it does not truncate and does not become a "back" link |
| **NARROW** | See **M2**. F1 PARTIAL takes a vertical form. Confirm + bridge + one `[ACT]` must fit the first screen — **and if approved copy will not fit, that is a finding to report, not a reason to move the bridge below the fold** |

---

### 2.3 W3 — Problem page (`33`)

| | Structure |
|---|---|
| **WIDE** | F2 four causes at full width. **The five checks in one row of five**, each ending in its observable outcome. Move 6's six findings at equal weight, arranged so no finding reads as primary |
| **MEDIUM** | **The five checks reflow to fewer per row — and reading order is preserved: 1 2 3 across, then 4 5, never column-major.** A check and its observable outcome **never separate across a row boundary**. **Move 6's six findings: if a multi-column arrangement would make any column read as secondary, they stay in one column.** The three away-pointing outcomes must keep equal weight, equal openness and equal position priority (test F9) — **a two-column grid that puts them in the right-hand column fails that test, and this is the class where that failure would first appear** |
| **NARROW** | See **M3**. Checks fully linear, **never an accordion**. Four causes vertical and sequential, never a reduced branching graph. All six findings visible, none collapsed |

---

### 2.4 W4 — Conversion surface (`34`)

| | Structure |
|---|---|
| **WIDE** | The ask, then the form at a comfortable measure — **the form does not stretch to the full page width**; a field wider than its content is harder to scan, not easier. `[PEO]` DIRECT contact in its own region with more space around it than the surrounding content, at equal weight to the form. Entity block below |
| **MEDIUM** | Form at full measure. **`[PEO]` DIRECT contact moves from beside the form to directly beneath it — at equal weight, in its own region, and never demoted into the footer.** Equal weight is the rule (`08` §5, R7 as read by H4), and this is the class at which "beside" stops being available and the temptation to demote begins. The consent control stays separated from the optional group and is never bundled; the privacy statement stays adjacent to submit |
| **NARROW** | See **M4** — the keyboard-open overlap test. Optional fields still labelled "optional" **in words**, never by asterisk convention alone. Nothing sticky renders over a focused field or the submit control |

---

### 2.5 W5 — Long-form document (`35`)

| | Structure |
|---|---|
| **WIDE** | **Reading column at its protected measure, not stretched**, with the **apparatus margin column beside it** — the one place a margin apparatus is correct (`12` §14). Static table of contents beside the reading column on long entries. `[LIM]` limitations full width, open |
| **MEDIUM** | **The largest single transformation in the whole set.** The margin column disappears and **every apparatus item — sample, date, location, method, provenance — re-parents inline, immediately beneath the claim it belongs to, in DOM order.** **It never becomes a footer, an appendix or a sidebar dropped to the end.** The table of contents moves from beside the column to **above it, static, in reading order** — never a floating overlay. The byline stays IMMEDIATE. Findings' status marks stay shape-and-label, never colour-only |
| **NARROW** | See **M6**. Same re-parenting, plus: limitations **expanded, always** — they tighten rather than relax (`10` §7) |

---

### 2.6 W6 — Index (`36`) — **the demonstration that was missing**

**The previous version of this document recorded W6 as "covered structurally in `36`, no dedicated M-slot" and demonstrated nothing.** `36`'s own margin note asserted that at narrow width "cards stack; metadata stays on the card, not truncated" — an assertion, not a demonstration. It is demonstrated here.

| | Structure |
|---|---|
| **WIDE** | Entry cards in a multi-card row. **Each card carries its full metadata — date · systems · sample · version — IMMEDIATE**, which is the entire reason P9 is the one legitimate card pattern on this site (`03` §7). As many rows as entries genuinely exist; **no filler card completes a row** |
| **MEDIUM** | **Fewer cards per row. The metadata does not shrink to fit the narrower card** — if the metadata will not fit, the card gets taller, never lighter. **A partial final row is left partial; it is never padded to complete the grid**, which would be the "coming soon" failure by another route |
| **NARROW** | **See the diagram below** |

```
W6 — NARROW (index, e.g. /research)
┌─────────────────┐
│ [NAV] hamburger    │   ← no breadcrumb: top-level route (`07`§6)
├─────────────────┤
│ WHAT RESEARCH MEANS  │
│  HERE — the standard  │
├─────────────────┤
│ ┌──card 1──────────┐   │  ← cards stack ONE PER ROW
│ │ figure crop       │   │
│ │ title             │   │
│ │ date · systems ·  │   │  ← FULL metadata retained.
│ │  sample · version │   │    Never truncated, never
│ │ [EVD: IMMEDIATE]  │   │    moved behind a disclosure,
│ └──────────────────┘   │    never dropped "for width"
│ ┌──card 2──────────┐   │    (`12`§11, §12)
│ │ ... same shape    │   │
│ └──────────────────┘   │
│ (as many as genuinely   │
│  exist — no filler)      │
├─────────────────┤
│ [pagination control —     │
│  reachable, keyboard-      │
│  operable, not infinite     │
│  scroll]                     │
├─────────────────┤
│ HOW TO CITE — plain text,     │
│  copyable, no gate             │
├─────────────────┤
│ WHAT THIS IS NOT YET  [LIM]     │
│  EXPANDED, never collapsible      │
├─────────────────┤
│ [ACT] PRIMARY — well below fold    │
│  if at all · NO sticky              │
└─────────────────┘
```

**What this narrow demonstration proves, and why it was worth drawing:** the metadata is the *only* thing distinguishing this index from a generic blog listing, and **narrow width is exactly where metadata gets truncated to make cards tidy.** Stating "metadata stays on the card" in a margin note does not prevent that; showing the card at its narrow form does. **The card gets taller. It does not get lighter.**

---

### 2.7 The variants — where their width behaviour differs from their master

**Recorded only where the variant transforms differently. Silence means it inherits its master.**

| Variant | The width-class difference |
|---|---|
| **V1 `/ai-seo`** (`37`) | The six-system F3 comparison — **see M7**. At MEDIUM the comparison may already exceed the column: the same rule applies, a **scroll container with all content present and keyboard-reachable**, and **the page body still does not scroll horizontally** |
| **V2 `/conversion-optimization`** (`38`) | F2-shallow must remain **recognisably the same object** as W3's F2 at every class. If it takes a vertical form at NARROW while W3's stays horizontal, the cross-page recognition the approved copy requires is broken |
| **V3 `/social-media-ads`** (`39`) | **No figure and no run, so nothing re-forms.** At NARROW it is a short linear page — and it must not acquire structure at any class |
| **V4 `/pricing`** (`40`) | **The price remains the largest element on its own screen at every class.** The factor matrix **linearises into stacked factor-and-direction pairs at NARROW** — never a horizontally scrolled table (`12` §8, `03` §5). Apparatus stays DEFERRED until "what moves the number" at every class |
| **V5 `/schedule-call`** (`41`) | The booking region must be usable at the smallest supported width — **an embed that only works on desktop fails a mandatory capability** (`03` §13). Loading / failed / no-availability states render at every class; the page's own content survives around the embed at every class |
| **V-services** (`42`) | Capability routing must be reachable within one or two screens of the top at NARROW, for a visitor who came only to route. The FULL RUN's **marked joins must survive the vertical form** — a vertical chain that loses its seams states the opposite of the page |

---

## 3. The mobile structural set (M1–M7)

**Not a courtesy pass.** These are the seven places the architecture is most likely to fail (`28` §5). All are NARROW.

### M1 — Homepage first screen + the run's vertical form + the boundary

```
┌─────────────────┐
│ [NAV] hamburger    │
├─────────────────┤
│ H1 (full weight)   │
│ supporting line     │
│ [ACT] enquiry        │
│ [ACT] booking          │
├─────────────────┤
│ BLOCK 2 recognition  │
├─────────────────┤
│ BLOCK 3 — [FIG:F1 FULL]│
│  GENUINE VERTICAL FORM   │
│  — never a scaled-down    │
│  horizontal one, never      │
│  horizontal page scroll      │
├─────────────────┤
│ BLOCK 4 — [LIM] boundary  │
│  EXPANDED, always (never    │
│  collapsible at any width)    │
├─────────────────┤
│ [blocks 5–8 continue,          │
│  section order unchanged]        │
└─────────────────┘
```

**What this uniquely proves:** the boundary **tightens rather than relaxes** on mobile (`10` §7); the run's vertical form remains complete and readable with no interaction and no motion.

---

### M2 — Commercial page first screen

```
┌─────────────────┐
│ [NAV] hamburger    │
├─────────────────┤
│ confirm searched     │
│  capability, own word  │
│ bridge to outcome        │
│  (≤2 sentences)             │
│ [ACT] primary                │
│ [EVD: ABSENT — zero            │
│  apparatus, stronger on         │
│  mobile per `10`§7]              │
└─────────────────┘
```

**Finding recorded (not a design change):** if approved copy for confirmation + bridge exceeds what fits in one narrow first screen on any of the six commercial pages, that is reported to the orchestrator as a **copy-length finding**. **The structural rule — both in the first screen — stands regardless** (`05` I1 has no width exception).

---

### M3 — Problem page: checks sequence and four-cause figure

```
┌─────────────────┐
│ hero, no CTA         │
├─────────────────┤
│ [FIG:F2] four causes,  │
│  vertical, sequential,   │
│  never a branching graph  │
├─────────────────┤
│ check 1 → outcome           │
│ check 2 → outcome             │  ← LINEAR, one section each,
│ check 3 → outcome               │    NOT an accordion menu
│ check 4 → outcome                 │
│ check 5 → outcome                   │
├─────────────────┤
│ finding A (routes to firm)   │
│ finding B (away — self-fix)    │  ← ALL SIX visible, equal
│ finding C (away — wrong traffic) │    weight, away-outcomes
│ finding D (no honest diagnosis)    │    never the ones that collapse
├─────────────────┤
│ worked example, full text            │
├─────────────────┤
│ [ACT] DIAGNOSTIC then PRIMARY, end     │
│  sticky below fold, suppressed during    │
│  the checks section                        │
└─────────────────┘
```

---

### M4 — Contact form with the keyboard open

```
┌─────────────────┐
│ [field: Company]     │  ← focused field, visible above
│                         │    the keyboard line
├─────────────────┤
│ ┌───────────────┐        │
│ │ ONSCREEN KEYBOARD│        │  ← occupies lower viewport
│ └───────────────┘        │
└─────────────────┘
  NOTE: no sticky element (header, CTA band, or otherwise)
  renders over the field or the submit control in this state.
  Any sticky element elsewhere on the page is SUPPRESSED while
  an input has focus. The visible focus indicator (S1 STATE 2,
  `43`) must remain visible in this state.
```

---

### M5 — Navigation panel open

**Tests:** focus containment that is escapable; the parent still a link; nothing removed for width (`28` §5). **Full diagram: `46_WIREFRAME_STATE_NAVIGATION.md` STATE 3** — cross-referenced rather than repeated.

---

### M6 — Research entry with the apparatus re-parented inline

```
┌─────────────────┐
│ question + why asked  │
│ byline [IMMEDIATE]      │
├─────────────────┤
│ finding claim text         │
│ ▸ Method and sample           │  ← apparatus RE-PARENTED
│   (EXPANDABLE, collapsed,        │    INLINE, immediately
│   immediately beneath its         │    beneath its claim —
│   claim — DOM order = claim,       │    never detached to a
│   then apparatus, same as desktop)   │    footer or sidebar
├─────────────────┤
│ limitations — [LIM]                    │
│  EXPANDED, always (never collapses         │
│  on mobile — tightens, not relaxes)          │
└─────────────────┘
```

---

### M7 — A wide comparison at narrow width — the six-system view on `/ai-seo`

```
┌─────────────────┐
│ [FIG:F3] four AI layers, per system   │
│ ┌───scroll container, horizontal───┐    │
│ │ Sys1 │ Sys2 │ Sys3 │ Sys4 │Sys5│Sys6│  │  ← scrolls WITHIN
│ │ ●    │ ●    │ ✕NT  │ ●    │✕NT│ ●  │  │    its own container;
│ └─────────────────────────────────┘    │    PAGE BODY does not
│  (✕NT = not testable, shape+label,        │    scroll horizontally
│   never colour-only, distinct from a         │
│   measured zero — B1, F5 test)                 │
└─────────────────┘
```

**This is a scroll container, not a carousel** — all six systems remain in the DOM and keyboard-accessible; nothing is paged or hidden (`12` §8, A19 as amended). **The layers are never aggregated** into a score at any width (B7).

---

## 4. Verification actually run across all three classes

**Eleven checks, against the diagrams in §2 and §3. Where a check produced a constraint rather than a clean pass, the constraint is stated rather than smoothed over.**

| # | Check | Result |
|---|---|---|
| 1 | **Reading order** | **Holds at all three classes on all six masters.** Section order never changes with width (`12` §3). The two places order could have broken are named and constrained: W3's checks reflow **row-major, never column-major** at MEDIUM, and W5's apparatus stays in DOM order — claim, then apparatus — when it re-parents |
| 2 | **Apparatus placement** | **The margin column exists at WIDE only.** At MEDIUM and NARROW every apparatus item re-parents **inline beneath its claim**. **Constraint recorded:** MEDIUM is where a re-parented apparatus could be dropped to the end of a section instead of beneath its claim, and W2 §2.2 and W5 §2.5 both state that it must not be |
| 3 | **Limits** | **Never collapsible at any of the three classes** (B29, `10` §5). Verified at W1 Block 4, W2 moves 5 and 6, W5 limitations, W6 "what this is not yet", V1 move 5, V2 move 5, V3 move 5, V-services blocks 3 and 7. **At MEDIUM the limits move from beside a claim to beneath it — they never move behind a control** |
| 4 | **Navigation** | Six items at every class; **nothing removed on mobile for width** (`07` §5). Parent link and disclosure stay separate controls at every class. **Header non-sticky at every class** (H3). Breadcrumb wraps rather than truncating |
| 5 | **Forms** | One step and four required fields at every class. DIRECT contact **beside at WIDE, beneath at MEDIUM and NARROW, equal weight at all three, never demoted to the footer.** Keyboard-open overlap tested at M4; visible focus indicator preserved (`43` STATE 2) |
| 6 | **Figures** | F1 keeps a **genuine vertical form** at NARROW, never a scaled horizontal one. F2 vertical and sequential. F3 in a scroll container with all content present. **F1 PARTIAL's recessive remainder is never dropped to save width** — that would make a partial view read as a fully measured chain. No figure depends on motion or hover at any class |
| 7 | **Long-form** | Reading column protected at WIDE (does not stretch) and at MEDIUM (full measure). TOC static and in reading order; **never a floating overlay** at any class. **No sticky on any credibility surface at any class** (B16) |
| 8 | **Index** | **Now demonstrated at all three classes** (§2.6). Metadata is never truncated, never moved behind a disclosure, never dropped. Partial rows stay partial. Pagination reachable and keyboard-operable at NARROW |
| 9 | **Horizontal overflow** | **The page body does not scroll horizontally at any class.** One permitted scroll container: F3's six-system comparison (M7), with all content in the DOM and keyboard-reachable. `/pricing`'s factor matrix **linearises** rather than scrolling |
| 10 | **Keyboard access** | Full parity at every class. The mobile panel's focus containment is the **one** permitted containment and is escapable by `Escape` and by an explicit close, returning focus to the trigger. No trap in the booking embed. Scroll containers are reachable and operable by keyboard |
| 11 | **No hover-only information** | **Nothing is hover-only at any class** (`12` §13, D3). Figure labels are real text on the figure; status meanings carry shape and label, not colour; disclosures open on activation, never on hover; field hints appear on **focus**, not on hover; navigation opens on activation |

**One thing this section deliberately does not do:** it does not solve responsive behaviour by stacking every region. **Three transformations are genuine re-arrangements, not stacks** — the apparatus re-parenting (W5, W2), Block 4's move from beside to beneath the mechanism (W1), and the pricing factor matrix linearising into factor-and-direction pairs (V4). **A stack is what happens when nothing was decided.**

---

## 5. What this document does not decide

**No numeric breakpoint value.** No pixel, em, rem or percentage threshold; no device name; no viewport figure. **The three classes are structural conditions, and the numbers that realise them are a Gate 10 artefact** (`27` §2, `28` §8). **No performance, accessibility or usability measurement was taken** — nothing here is a conformance claim, and no page was rendered or tested with users.
