# Homepage Design Rationale — Session 15 — PROPOSED

**Session:** 15 · **Date:** 2026-09-02 · **Branch:** `test_branch`
**Status:** **PROPOSED. Not approved. Not publication readiness.** The route remains **PARTIALLY
BLOCKED** and nothing here changes that.
**Specimen:** `prototype/homepage.html` (complete page, no validation chrome) ·
`prototype/index.html` (contact sheet showing WIDE and NARROW together)

---

## 1. What was built

**The complete approved homepage, blocks 1 to 8, in the approved order, through the footer.**
Header (non-sticky), main, action region and footer all present. **No validation chrome, no
artboard frames, no annotation boxes** — so the viewport-height bands measured in
`04_F2_F3_HOMEPAGE_RETEST.md` are the bands a real reader experiences.

**Copy is verbatim from `docs/09-content-pages/copy/homepage.md`.** Nothing was rewritten,
reordered, softened, shortened or invented to make a layout work.

**The one copy-adjacent decision, declared because it is a decision.** Block 2's approved paragraph
reads: *"That reads like three problems. It behaves like one. More visits on a path that does not
work produce nothing…"*. The design sets **the first two sentences at consequence weight and
continues the remainder as body**. This is a **typographic split of one approved paragraph**: no
word is changed, added, removed or reordered, and the reading order is identical. It is recorded
here rather than buried because the alternative — setting all five sentences at 38px — would have
made a single paragraph the tallest object on the page, and the alternative to *that* would have
been to leave the page with no consequence statement at all.

**No breadcrumb is drawn on the homepage.** It is the root of the hierarchy a breadcrumb describes;
emitting one would assert a level above it.

---

## 2. Not drawn, and no placeholder drawn for any of it

Applied per the approved blocked-content rule. **No container, heading, dotted outline, "coming
soon", or "see margin" label appears at any of these positions.**

| Slot | Case | Blocker |
|---|---|---|
| First screen — the fifth, dated checkable item | **A** | Unlocks when the own-site diagnostic publishes. The launch default is **four elements** |
| Block 6 — the people element and its `/about` link | **A** | Owner team / people input |
| Block 6 — the own-site diagnostic link **and its sentence** | **A** | Technical prerequisite: the own-site fixes are not shipped |
| Block 8 — the "what happens next" sentence | **B** | Enquiry-response owner and hours |
| Block 8 — the phone / WhatsApp DIRECT peer, **and the copy sentence that depends on the number** | **B** | Published phone number |
| Footer — entity block / NAP | **A** | Complete NAP. Nothing rather than a partial address |

**Block 6 is visibly not full, and the design does not compensate for it.** No filler links, no
generic sources, no tags, no proof container without proof in it. That is the correct rendering of
the block, not an unfinished one.

**A footer legal line was drafted and removed during this session** because it was drawing
something in the space the blocked entity block occupies.

---

## 3. The first screen

**Four elements, no fifth:** the H1, the supporting copy, and the two primary actions at equal
confidence. Plus the navigation.

**Zero apparatus above the fold.** No proof strip, no stat, no logo, no badge, no evidence label,
no register label, no client quote, no inline form, no diagnostic, no figure, **no third CTA.**

**How the first screen earns its confidence.** The H1 is set at 88px and left-anchored on the
spine, occupying roughly 79% of the working width in two lines. The supporting copy sits at 20px in
a 60ch column — plainly subordinate, and doing the acquisition work. The two actions sit beneath it
as distinct objects, not text links, at equal weight. **Nothing animates and nothing resolves into
the H1.**

The line break falls as *"Judge us on the / enquiries, not the traffic."*, which keeps the contrast
phrase — the clause that carries the whole commercial idea — intact on one line. That was checked
against the alternatives rather than accepted as whatever the browser did.

**At NARROW both actions clear the 844px fold** (measured: 738px). That required two corrections
recorded in `03_RESPONSIVE_FINDINGS.md`.

---

## 4. How each block is designed, and why it is not the same as the one before it

The direction's real risk at page scale is **repetition** — a page that becomes a collection of THE
RECORD devices. The counter is that **sections are differentiated by density and by which region of
the grid they use, not by adding a new device to each one.**

| Block | Pace | What carries it | Devices spent |
|---|---|---|---|
| **1 — Hero** | Fast | Type scale alone. The largest object on the page, on an open ground | — |
| **2 — Recognition** | Fast | The consequence statement, then a plain symptom list in the buyer's own words | hairline |
| **3 — Mechanism** | **Slow** | The reading column **plus the apparatus margin**, then the page's one full-weight figure occupying the wide region | hairline · tie · disclosure · **F1 FULL** |
| **4 — Boundary** | **Slowest** | A ground change, a set-piece rule, a register label, four always-open paragraphs, and the same object shown in a changed state | **ground change 1** · **set-piece rule 1** · **register label 1** · F1 STATE |
| **5 — Capabilities** | Fast | Two-column routing, one line each, grouped by contribution. **No cards, no icons, no equal-weight grid** | hairline |
| **6 — What can be checked** | Medium | The admission at statement weight, then the one place the machinery is the point: full provenance, two status marks, the tie | **set-piece rule 2** · **register label 2** · tie · status marks |
| **7 — Fit** | Medium | **Prose and space, and nothing else.** No rule variation, no ground change, no apparatus, no figure, no list device | hairline |
| **8 — Action** | Fast | The largest gap on the page, then a ground change and two actions | **ground change 2** |
| **Footer** | — | Four columns, underlined links | — |

**Block 7 is deliberately the quietest section on the page.** It would have been easy to give it a
for/against split or a two-column device. It gets neither, because a page where every section has a
device is the failure mode, and the sequence needs somewhere to slow down without machinery.

---

## 5. The two figures, and why they are one object

`docs/16-ux/22_F1_USAGE_TAXONOMY.md` assigns `/` **A — FULL** at block 3 **plus C — STATE** at block
4, *on the same instance*.

- **Block 3 — FULL RUN.** Six points, equal spacing, constant stroke, constant node size. The
  unmeasured lead-in dashed. Three intervention marks on the joins. The accountability boundary
  drawn on the same line as everything else. The client-data stretch drawn doubled and labelled as
  the client's. One arrival reaching the enquiry with no upstream segment, labelled unattributed.
  **No taper, no per-stage colour, no quantity of any kind is drawn.**
- **Block 4 — STATE.** The same chain, the same spacing, the same node size, **reduced**: every
  point label the full figure already carries is removed, and only the three states the section's
  paragraphs describe are marked. It is roughly a fifth of the height of the full figure.

**Rendering it this way is what makes it a state rather than a second figure**, and it is how the
boundary reads as a property of the work rather than as a legal section. Both figures have a
genuine vertical drawing for NARROW, not a scaled-down horizontal one, and both carry an expandable
tabular equivalent.

---

## 6. Where the evidence lives, and where it stops

| Block | Apparatus state | As built |
|---|---|---|
| 1 | **ABSENT** | Nothing |
| 2 | **ABSENT** | Nothing. No statistic exists and none is implied |
| 3 | **EXPANDABLE** | One disclosure, in the apparatus margin at WIDE, inline beneath its claim below that |
| 4 | **ADJACENT-SECONDARY, always open** | The limits region. Never collapsible, never inside a disclosure, at full type quality |
| 5 | **ABSENT** | Nothing. This block routes |
| 6 | **IMMEDIATE** | Full provenance, two status marks, the tie, the sample caveat |
| 7 | **ABSENT** | Nothing |
| 8 | **ABSENT, no exceptions** | Nothing — no provenance, no date, no scope note, no limit, no register label |

---

## 7. The three acceptance tests the approved narrative sets

1. **The forty-second read.** Scrolling without opening a disclosure, the page delivers: the
   standard the firm accepts (H1) · the buyer's situation and what it costs (block 2) · how an
   enquiry is produced (block 3, figure legible without interaction) · what the firm answers for
   and will not promise (block 4, always open) · where each discipline comes in (block 5) · that
   there are no case studies and what exists instead (block 6) · who it is not for (block 7) · two
   ways to start (block 8). **Nothing load-bearing is behind a disclosure.**
2. **First fixation, per screen.** Measured, both widths. **On no band does the eye land first on a
   date, sample, status mark, method note or register label.** See `04`.
3. **Proportion.** Measured, both widths, against the frozen rubric. **PASS at both.** See `04`.

---

## 8. What is deliberately absent

No photography — every slot on this page could only have carried stock or staged imagery, and both
are prohibited without exception · no icons, anywhere · no cards, tiles, panels, shadows or
elevation · no metric tile, counter, rating, badge, seal, logo strip or "trusted by" · no case
study, testimonial, client count or award · no sticky element of any kind · no modal, interstitial,
exit-intent or entry pop-up · no page-transition animation · no dark mode · no anchor menu,
progress indicator or "jump to" control.
