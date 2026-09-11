# PHASE J — PROTOTYPE REVIEW

**Date:** 2026-09-07 · **Status:** **PROPOSED — AWAITING OWNER / ChatGPT VISUAL APPROVAL**
**Files:** `prototype/index.html` · `prototype-a-scope-anatomy.html` ·
`prototype-b-supplier-reports.html` · `prototype-c-fit-boundary.html` · `resolve-proto.css`

**How to open:** the prototypes load stylesheet and script as separate files, so open them over
HTTP rather than by double-clicking:

```bash
cd docs/28-phase-j-visual-interaction/prototype && python3 -m http.server 4321
```

Then open `http://localhost:4321/index.html`. Each prototype shows **BEFORE above AFTER** on one
page, using the approved production copy.

---

## 1. What the prototypes are, and are not

- Isolated static HTML, CSS and vanilla JS. **No framework, no build step, no dependency, and no
  import of any production module.**
- Design tokens are **transcribed** from `app/globals.css`, not imported, so nothing here can
  reach production and the prototypes still render in THE RESOLVE rather than an approximation.
- **No production application file was changed to make them run.**
- They are **section** prototypes, not page redesigns. Each takes one real section.

---

## 2. Prototype A — SCOPE ANATOMY

| | |
|---|---|
| **Route / section** | `/seo` §2, "What the work involves, month to month" |
| **Why this section** | It is rendered by `components/commercial/ScopeList.tsx`, which draws **the identical shape on six capability routes**. One primitive, six routes |
| **Problem** | Six pieces of work as six unranked hairline rows. The list cannot state the one thing a buyer needs — **where in the chain each piece of work acts** |
| **Primitives** | **J4 SYSTEM ANATOMY + J8 PROGRESSIVE DISCLOSURE** |
| **Technique** | The chain drawn as five points; selecting a scope item marks the segment it acts on. Server-rendered list upgraded to a tablist |
| **User action** | Click / tap an item; or Tab to the rail and use ←→↑↓, Home, End |
| **Visual logic** | Segment position only. **No length encodes volume, loss or a rate; nothing tapers; there is no number on the drawing** |
| **Copy** | **All six bodies retained verbatim.** Added: six "Acts on:" locators and one caption |
| **Motion** | **One T2** — six attachment marks resolve in sequence (95 ms stagger, 620 ms). Selection is T4 (180 ms). Fires once on entering view; never replays |
| **Mobile** | A genuinely different vertical drawing (not the horizontal one scaled) + accordion |
| **Reduced motion** | Marks composed resolved on first paint; tablist still works, states swap without transition |
| **No-JS** | Six headings each followed by its own paragraph, in document order, chain drawn complete. **Verified against the raw file: 765 words, zero content behind a `hidden` attribute** |
| **Result** | **Works.** The strongest of the three, and the only one with real reuse leverage |

### Measured, 1425 px / 390 px

| Metric | BEFORE | AFTER | Δ |
|---|:--:|:--:|:--:|
| Visible words @1425 | 184 | **181** | **−3** |
| Visible words @390 | 184 | **178** | **−6** |
| Section height @1425 | 1 014 px | **956 px** | **−58 px** |
| Screenfuls @1425 | 1.13 | **1.06** | −0.07 |
| **Section height @390** | 2 773 px | **1 736 px** | **−1 037 px (−37%)** |
| **Screenfuls @390** | 3.29 | **2.06** | **−1.23** |
| Occupancy L/C/R @1425 | 6 / 14 / 0 | **13 / 11 / 4** | right third **0 → 4** |
| Distinct left-starts @1425 | 2 | **8** | **+6** |
| Interactive controls | 0 | **6** | +6 |

Visible words fall slightly while **all six bodies remain in the DOM and in server markup** — five
are behind the selector, none is deleted.

---

## 3. Prototype B — WHERE EVERYBODY ELSE'S REPORT STOPS

| | |
|---|---|
| **Route / section** | `/about` §1, "Why we work this way" |
| **Why this section** | `/about` is the worst structural score on the site: 8 sections, 8 text-only, zero figures. And the copy states a **spatial** fact in prose |
| **Problem** | The reader must hold three supplier spans and an endpoint in their head to see that no report reaches the enquiry |
| **Primitives** | **J2 SIGNAL MAP + J5 KINETIC STATEMENT** |
| **Technique** | Three brackets over the path, each covering only its own segment; the stretch none reaches drawn in the site's dashed *unmeasured* register; the enquiry the only tangerine object |
| **User action** | None. Read-only |
| **Visual logic** | Reach only. **No bracket, gap or position is a quantity, a budget, a result or a rate** |
| **Copy** | Both paragraphs retained, restructured into five named rows. Added: SVG labels + a 2-line caption |
| **Motion** | **One T2** — three brackets draw at 150 ms stagger, then the gap (520 ms) and the enquiry (700 ms). The order **is** the argument |
| **Mobile** | Redesigned during this session (see §5): brackets carry **numbers**, not labels; every supplier name lives in the HTML rows |
| **Reduced motion / No-JS** | Drawing composed complete. Verified: all three supplier sentences present in the raw file |
| **Result** | **Works at WIDE. Costs height at both widths, and materially at NARROW.** See below |

### Measured

| Metric | BEFORE | AFTER | Δ |
|---|:--:|:--:|:--:|
| Visible words @1425 | 127 | 162 | **+35** |
| Section height @1425 | 614 px | 712 px | **+98 px** |
| Occupancy L/C/R @1425 | 3 / 2 / 0 | **7 / 5 / 5** | right third **0 → 5** |
| Distinct left-starts @1425 | **1** | **10** | **+9** |
| Visible words @390 | 127 | 144 | +17 |
| **Section height @390** | 607 px | **1 115 px** | **+508 px (+84%)** |

> ### ⚠ B is the honest failure among the three, and it is reported as one.
> It is **the best composition result** (1 → 10 distinct left-starts, right-third occupancy 0 → 5)
> and **the worst height result** (+84% on mobile). The narrow drawing was already redesigned once
> in this session — labels moved out of the SVG into HTML rows, which cut 202 px and improved SEO
> and screen-reader behaviour — and it is **still 508 px taller than the paragraph it replaces**.
>
> **This is a genuine trade, not a bug**: prose is vertically cheap and a diagram is not.
> **Whether a clearer reading is worth 508 px of mobile height is an owner judgement, and Phase J
> does not make it.** If the answer is no, the honest options are to run B at MEDIUM and above only
> and keep the paragraph at NARROW, or not to build B at all.

---

## 4. Prototype C — THE FIT BOUNDARY

| | |
|---|---|
| **Route / section** | `/about` §5, "Who we work with — And who we do not." |
| **Problem** | Six sentences at one left edge. Three are inclusions and three exclusions, and **the composition never says so** — the reader discovers it by noticing the word "Not" |
| **Primitive** | **J7 STATE COMPARISON** |
| **Technique** | Two named halves with the boundary rule on the axis; exclusions carry the site's open/dashed *not met* mark |
| **User action** | None |
| **Visual logic** | Membership only. Both halves are **equal width** — no area, no taper, nothing implying that one set is larger or more likely |
| **Copy** | **Six sentences in, six sentences out, verbatim.** Added: the two headings |
| **Motion** | **One T2** — the rule draws (620 ms), then the exclusions settle into the unmet register (+380 ms). This is the one content class the motion budget names explicitly: **"a limit or boundary being drawn"** (`02_RESOLVE_MOTION_BUDGET.md` §5.3, item 3) |
| **Mobile** | Halves stack; the vertical hairline becomes a horizontal rule — measured complementary at 760/761, never both and never neither |
| **Reduced motion / No-JS** | Both halves, both headings and the rule composed complete. **The headings are server markup, so the two halves are named in text whether or not anything runs** |
| **Result** | **Works. The cleanest result of the three** |

### Measured

| Metric | BEFORE | AFTER | Δ |
|---|:--:|:--:|:--:|
| Visible words | 92 | 103 | **+11** (the two headings) |
| Section height @1425 | 776 px | **655 px** | **−121 px** |
| Screenfuls @1425 | 0.86 | **0.73** | −0.13 |
| Occupancy L/C/R @1425 | 8 / 2 / 0 | **6 / 2 / 4** | right third **0 → 4** |
| Section height @390 | 788 px | 885 px | +97 px |

---

## 5. Defects found and fixed during prototyping

Recorded because they are exactly the failure modes a production rollout would repeat.

| # | Defect | Consequence | Fix |
|---|---|---|---|
| **1** | **Panel destruction.** Prototype A moved the selected panel into the wide readout with `readBody.innerHTML = ''`, which **destroyed** the previously shown panel instead of returning it home | Cycling the six tabs left **4 panels of 6** in the document and **permanently deleted two paragraphs of approved copy** | Every non-current panel is returned to its own server parent first. Panels are **moved, never cleared**. Re-verified: **6 panels survive 14 tab cycles** |
| **2** | **Width-boundary placement.** The wide/narrow decision was taken once at init | A resize or orientation change stranded the reading in a container the layout no longer showed | A `change` listener on the media query re-places on every boundary crossing. Not a resize handler — it does no work while resizing within a band |
| **3** | **SVG right-edge clipping.** Prototype A's `viewBox` was 900 units with content to 876 | "the qualified enquiry" and "YOUR OWN SYSTEM" were clipped at WIDE | Re-laid to a 940-unit box with content ending at 900 |
| **4** | **Prototype B mobile height.** The narrow drawing carried three long text labels inside the SVG | 1 317 px on mobile, and three supplier names locked inside graphics text | Labels moved into HTML rows; brackets carry order-only numbers. **−202 px, and the names are now crawlable** |

Defect 1 is the significant one. **A component that silently deletes approved copy after a few
interactions is the single most dangerous thing Phase J could ship**, and it appeared in the first
draft of the very first prototype.

---

## 6. Verification performed

### Widths — measured, all three prototypes

Tested at **320 · 360 · 390 · 430 · 760 · 761 · 860 · 1080 · 1081 · 1425**.

| Check | Result |
|---|---|
| Horizontal overflow (`body.scrollWidth > clientWidth`) | **None at any width, on any prototype** |
| Exactly one drawing displayed per figure | **Yes at every width.** The 760/761 pair was tested explicitly — the `ChainFigure` one-pixel-gap bug is not reproduced |
| Controls below the 40 px target floor | **None** in any prototype. The only sub-target element is the review harness's "back to index" link, which is chrome and ships nowhere |
| Copy present at every width | Prototype C: **276 words at every width, identical** |

### Motion

| Check | Result |
|---|---|
| Fires once on entering view | ✅ `armed → on` |
| **Never replays** | ✅ Scrolled away and back: state stayed `on` |
| Observer disconnected on fire | ✅ |
| Force-completion floor | ✅ 4 s, all three |
| Loops / `infinite` / ambient | **0** |
| Scroll handlers · `rAF` loops · sticky · fixed · canvas | **0** |
| Tiers used | A: 1×T2 + T4 · B: 1×T2 · C: 1×T2 — **all within the secondary-page budget of T2 = 1** |

### Accessibility

| Check | Result |
|---|---|
| Keyboard (Prototype A) | ✅ Arrow ↓ → next, End → last, → wraps to first, Home → first |
| Roving `tabindex` | ✅ Exactly **1** control with `tabindex="0"` |
| `inert` on collapsed panels | ✅ A focus ring cannot land on a hidden panel |
| Semantic equivalent for every visual | ✅ `<figure>` + visible `<figcaption>` + `<title>`/`<desc>`; **no meaning carried only by an `aria-label`** |
| Marks | ✅ All `aria-hidden`; every mark's meaning is in adjacent text |
| Focus visible | ✅ 3 px ink outline, never suppressed |
| Pointer-only interaction | **None** |

### No-JavaScript — verified against the raw files

| File | Words in server markup | Content behind `hidden` | Approved copy present |
|---|:--:|:--:|:--:|
| Prototype A | 765 | **1 element** — the empty wide-readout container. **No content** | ✅ all six scope bodies |
| Prototype B | 660 | **0** | ✅ all three supplier sentences + both paragraphs |
| Prototype C | 287 | **0** | ✅ all six fit sentences + both headings |

### Proof discipline

| Check | Result |
|---|---|
| Fabricated metric, percentage, count or currency figure | **0** |
| Geometry implying quantitative business performance | **0** — no bar, no area, no taper, no trend line, no funnel, no counter |
| Invented case study, logo, testimonial, rating or client name | **0** |
| Production enquiry data used | **0** — no database was read |
| Numbering | Order only, in both prototypes that use it |

---

## 7. Composition review

| | BEFORE | AFTER |
|---|---|---|
| Distinct left-starts, Prototype A @1425 | 2 | **8** |
| Distinct left-starts, Prototype B @1425 | **1** | **10** |
| Right-third occupancy, all three | **0** | **4, 5 and 4** |
| Silhouettes produced by one grammar | one | **three** — A is index-left/figure-right, B is figure-left/reading-right, C is a centred symmetric comparison |

Three sections built from the same grammar produce three different shapes. That was the §30
requirement and it is the result the prototypes were built to test.

---

## 8. Performance

| | |
|---|---|
| New dependencies | **0** |
| JavaScript added | **~2.4 KB** unminified across all three, uncompressed, no library |
| Client components implied | Prototype A → **1** client leaf. B and C → **0 in principle** (a `data` attribute written by a shared tiny observer would do), **1 as prototyped** |
| Animated properties | `transform`, `opacity`, `border-color`, `background-color`. **No layout property** |
| Animation loops | **0** |
| Scroll handlers | **0** |
| Layout thrash | None — no read-write interleave; the observer writes one attribute |
| Reduced-motion cost | **Lower** than the animated path — the script returns before creating an observer |
| **Not measured** | LCP, CLS, INP and Lighthouse were **not** measured in this session and **no figure for them is asserted** |
