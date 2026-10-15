# Google Ads Design Pass Proposal — `/google-ads`

**Date:** 2026-10-15 · **Basis:** storyboard v4 (`GOOGLE_ADS_COPY_AND_VISUAL_STORYBOARD.md`) and `DEC-053`
**Status:** PROPOSAL FOR OWNER APPROVAL. **Nothing here is implemented.** No source code, component, animation, metadata, branch, merge or deployment has been touched. The next gate is design approval, not implementation.

> **What this is.** A specific design for the seven approved blocks, built from the existing C+ components, tokens and CSS wherever they fit. It is a plan for review, not a mock-up: there are no rendered designs yet. Wireframes below are structural sketches. **I read the existing source for this proposal but did not run the app or take screenshots.** Contrast figures are quoted only where the repository already records them; anything new is a verification item (§10).

---

## 1. Final page architecture

| # | Block | Surface | Width | Role | Heading level |
|---|---|---|---|---|---|
| 1 | Hero + One Click receipt | **Ground** (ivory `#F7F3EC`) | `px-wrap`, 6/6 grid | State the offer; show the money split | H1 |
| 2 | What we look at before suggesting Google Ads | **Paper** | `px-wrap` | Educate on suitability; no verdict | H2 |
| 3 | From budget to enquiry (Path Figure) | **Ink** | `px-wrap` | The page's one interactive explanation | H2 |
| 4 | What the work covers | **Ground** | `px-wrap` | Service boundary | H2 (+ H3 per layer) |
| 5 | What we answer for | **Paper** | `px-wrap` | Commitments | H2 |
| 6 | What you learn each month | **Ground** | `px-wrap` | Findings → decisions; honest limits | H2 |
| 7 | Next step | **Ink** (`b-close`) | `px-wrap` | Two starting points, process, CTAs | H2 |

**Rhythm.** Ground → paper → **ink** → ground → paper → ground → **ink**. No two ink sections are adjacent (the live page has ink at 2 and 4; the new order gives the dark moment to the Path Figure and the close). One H1, seven H2s, H3 only for the three scope layers. No skipped levels.

**Not the SEO page.** The SEO redesign opens with a horizontal trail hero and moves through question cards and a staged sequence. This page uses a **receipt** hero, a **lane grid** for the Path Figure (steps as columns, "what Google Ads records" and "what your business confirms" as rows), and a **tick-versus-dashed boundary** system. No SEO component, class or geometry is reused (`components/cplus/seo/*` is not imported).

---

## 2. The boundary as a design system (decision F-2)

One rule, used identically in the receipt, the Path Figure, Block 4 and findings row 3, so the visitor learns it once:

| Meaning | Mark | Outline | Fill |
|---|---|---|---|
| **Part of the service** (core + oversight) | Filled tangerine tick box (existing `.ga-tick.is-on`) | Solid 2 px ink | Paper |
| **Agreed separately** | **Empty** dashed box (existing `.ga-tick` with a new dashed-border variant) | **Dashed** 2 px (`--dc-control`) | Ground/transparent |
| **Paid to Google** | Dashed tag (existing `.ga-tag`) | Dashed | None |
| **Paid to us** | Solid tangerine tag (existing `.ga-tag-ours`) | Solid | Tangerine |

Text never relies on the mark alone: every dashed item also says "agreed separately" in words. Marks are `aria-hidden`.

---

## 3. Block-by-block design treatment

### Block 1 · Hero

**Layout (desktop ≥ 1024 px).** Reuse the existing hero grid (`b-hero-g h-hero-g ga-hero-g`, 6/6, vertically centred). Left: breadcrumb → kicker "Google Ads" → H1 → two supporting paragraphs → action pair. Right: the receipt.

```
┌────────────────────────────────────────────────────────────┐
│ What we do › Paid search                                    │
│ GOOGLE ADS                       ┌──────────────────────┐   │
│ We run your ads.                 │ One click            │   │
│ We look beyond                   │ Where your money goes│   │
│ the click.                       │  ☐ Someone searches… │   │
│ We manage your Google Ads…       │  ☐ Your ad appears   │   │
│ If we find a problem…            │  ☐ They click it     │   │
│ [Tell us what…] [Book a call]    │ - - - THE CLICK - - -│   │
│                                  │ What our fee covers  │   │
│                                  │  ■ Choosing searches │   │
│                                  │  ■ Writing ads       │   │
│                                  │  ■ Managing budget   │   │
│                                  │  ■ Checking website  │   │
│                                  │  ┌ - - - - - - - - ┐ │   │
│                                  │  ☐ Fixes: separate  │ │   │
│                                  └──────────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

**Treatment.**
- H1 uses the existing `.b-h1` (Bricolage, `--dc-f-hero`), with the page's `max-width: 15ch` and `text-wrap: balance`. The two sentences break naturally on the full stop; `b-named` (tangerine) emphasis goes on **"beyond the click"**. **Do not add `text-wrap: balance` hacks that detach "click" onto its own line** (the SEO page needed a late fix, `6d2a7a5`, for the same issue — check widows at 320–430 px).
- The two supporting paragraphs use `.b-lede` (existing, `46ch` measure). The existing 4 px tangerine "side" rule (`.ga-side`) is **retired**: the second paragraph carries the boundary sentence and is set in ink, not dim, so it is read.
- The receipt keeps `.ga-rc` (paper card, 3 px ink border, 10 px tangerine offset shadow, −1.5° tilt on desktop). Changes: the lower label reads "What our management fee covers"; a fourth ticked line is added; a **dashed footer** (new `.ga-sep`) sits inside the card below the lower part, outlined dashed, with an empty box and the text "Fixes to your website or tracking: agreed separately".
- Action pair: **`ActionPair` primitive** (existing) in place of the page's single-button `Action()`; "Book a call" is the secondary button.

**Mobile (< 768 px).** Single column: breadcrumb, kicker, H1 (existing `min(…, 15.5vw)` clamp), paragraphs, **actions**, then the receipt (no tilt, 6 px shadow, existing). Actions stay above the receipt so a visitor can act without scrolling past the figure.

**Motion.** Receipt **print-in** on load: CSS keyframes only, each line fades up 8 px over `--dc-d-standard` (420 ms), 70 ms stagger, tear line draws over `--dc-d-standard`, total ≤ ~1 s. Guarded by `@media (prefers-reduced-motion: no-preference)`; the final state is the default style, so nothing is hidden without CSS animation, without JavaScript or in print. **No JavaScript.** Only `opacity` and `transform`.

**Fallbacks.** Reduced motion / no JS / print: receipt fully drawn at load.

### Block 2 · What we look at before suggesting Google Ads

**Layout.** Paper surface. Left column (5/12): kicker, H2, lead-in, closing line. Right column (7/12): the six factors as a **visible list** of question + one sentence.

```
 WHAT WE LOOK AT          │ “Are people already searching for what you sell?”
 What we look at before   │   Google Ads reaches people who are searching…
 suggesting Google Ads.   │ ─────────────────────────────────────────────────
 Google Ads isn't right…  │ “What is a new customer worth to you?”
                          │   This shapes how much it makes sense to spend…
 There's no score. We     │ … (six rows)
 talk these through…      │
```

**Component.** Existing **`QuestionRows`** (`dl.dc-qa`, quote-marked questions with answers). **Not `DisclosureGroup`:** its documentation restricts collapsed-on-load disclosures to the FAQ page type and forbids them for limits, method or attribution (`03_PAGE_TYPE_ARCHITECTURE.md` §14, as cited in the primitive). Because the sentences are short, all six stay visible. This is simpler than the storyboard's earlier "native disclosure" idea and removes any hidden content. *(Owner approved "educational checklist or native disclosures"; a visible list satisfies the first.)*

**Treatment.** No tick boxes, no score, no result panel, no interaction. Rows share identical weight (equal peers — the `FindingRows`/`QuestionRows` rule). The last row's links ("SEO", "social media ads") use `InlineLink`.

**Mobile.** Single column: heading block above, list below; rows full width; link targets ≥ 44 px tall.

**Motion.** Standard section reveal (`data-rv`) only.

### Block 3 · From budget to enquiry — the Path Figure

The page's primary interactive figure. **Design decision: build it with the existing `Tabs` component, so no new client component is required.** `Tabs` (`components/cplus/Interactive.tsx`) is the approved WAI-ARIA tablist with automatic activation, arrow/Home/End keys, inactive panels `display:none` only when JS is on, and **all panels visible with the tablist hidden when JS is off**. That gives the owner-required keyboard, screen-reader and no-JavaScript behaviour for free. (To confirm at build planning: that panels can hold the per-case figure and that tab pills are legible on ink.)

**Structure.**

```
 FROM BUDGET TO ENQUIRY
 From your budget to an enquiry — and where it can go wrong.
 Google Ads reports what it's set up to record. That isn't always the same as a genuine enquiry.

 [ As intended ] [ …wrong people click ] [ …page doesn't answer ] [ …a recorded action isn't genuine ]

            1 Budget   2 Search+click   3 Visit    4 Enquire         5 Learn + decide
 Google    ■ spent     ■ ad · click      ·         ┆☐ recorded action  ·
 Ads                                                  (if set up)
 records   ─────────────────────────────────────────────────────────────────────────
 Your       ·          ·                 ·         ■ genuine enquiry?  ■ we learn, decide
 business                                           (you confirm)
 confirms
 ┌ who acts ─────────────────────────────────────────────────────────────────────────┐
 │ ■ We manage this    /    ■ We find and recommend → ☐ agreed separately            │
 └───────────────────────────────────────────────────────────────────────────────────┘
 Google Ads calls a recorded action a "conversion".
 So we look past the report to the enquiries your business receives, as far as your tracking allows. Not every enquiry can be traced to an ad.
```

**Layout.** Five columns (steps) × two rows (lanes) on ≥ 900 px, drawn with CSS grid. A connecting tangerine line runs along the top of the five step markers. A "who acts" strip sits under the grid. The word "conversion" appears **once**, in the definition line directly under the figure. Elsewhere: "recorded action".

**State table** (each tab is one panel, server-rendered):

| State (tab) | Steps 1–2 | Step 3 | Step 4, Google lane | Step 4, business lane | Step 5 | Who-acts strip |
|---|---|---|---|---|---|---|
| **As intended** | Lit | Lit | Dashed tick "recorded action (if set up)" | Solid tick "genuine enquiry" | Lit | Hidden |
| **Wrong people click** | Lit; Google lane shows ad · click ticked | **Dim** | Dashed, dim | Reads **Fewer genuine enquiries** | Lit ("we review the searches") | **■ We manage this** (core service). No dashed marker |
| **Page doesn't answer** | Lit | **Break:** line becomes dashed; "People arrive and leave" | Dashed, dim | **Fewer genuine enquiries** | Lit | **■ We find and recommend → ☐ changing the page is agreed separately** |
| **Recorded action isn't genuine** | Lit | Lit | **Ticked** (Google Ads records it) | **Hollow/open box:** "not a genuine enquiry" | Lit | **■ We find and recommend → ☐ tracking repairs are agreed separately** |

**What the states teach.** The Google lane and the business lane disagree at step 4 in the third state, which is the distinction required by F-5. In the first two, Google Ads has still recorded activity but the business lane is thin. No state shows numbers, rates or proportions, and none shows a fix being made.

**Interaction storyboard (frame by frame).**
1. *Arrival (first view, ≈ 40 % visible):* the connecting line draws left to right over `--dc-d-expressive` (900 ms) and the five step labels reveal with 90 ms stagger (existing `data-rv-i` mechanism). The "As intended" tab is selected. Total ≈ 1.2 s, once.
2. *Select a case (click, tap, or arrow key):* the old panel swaps instantly; in the new panel the break marker and dimmed steps appear with a `--dc-d-state` (620 ms) opacity/line transition (not a re-draw). The who-acts strip fades in over `--dc-d-standard`.
3. *Select another case:* repeat step 2. *Select "As intended":* the path returns to its calm, fully lit state.
4. *Idle:* nothing moves. No loop, no auto-advance, no hover-only behaviour.

**Accessibility.** `role="tablist"` / `tab` / `tabpanel` from `Tabs`; label "Cases to explore"; visible `:focus-visible` outline (inverse colour on ink, existing rule). Each panel is a real list with a text equivalent: "A path with five steps from budget to learning. Google Ads can record clicks and, where set up, a recorded action. Your business confirms which are genuine enquiries. In this case…", ending with the who-acts sentence in words. No `aria-live` region is needed because the tab panel is focusable and its label changes with selection; confirm with a screen reader (SR checks) before release.

**Mobile (< 768 px).** The grid becomes a **vertical path**: each step is a row with the node at the left and the two lanes as two compact stacked lines under the step label ("Google Ads records…" / "You confirm…"). Tabs wrap onto two lines (no horizontal scroll: `flex-wrap`, as the existing `.px-tablist`), each pill ≥ 48 px tall (existing `.px-tab`). The who-acts strip is full width under the path.

**Reduced motion.** The line is fully drawn at load; state changes are instant. **No JavaScript:** `Tabs` shows all four panels stacked, each with its heading (the pill row is hidden without JS, existing behaviour), so a visitor sees the intended path and all three problem cases with their captions.

**New CSS.** `.ga-path` grid, lane rows, step nodes, break marker, who-acts strip; reuse `.ga-tick`, `.ga-label`, `.ga-tag`. **New component:** none required if `Tabs` is confirmed (§7).

### Block 4 · What the work covers

**Layout.** Ground surface. Three columns ≥ 1024 px (core service · oversight · agreed separately) reusing the existing `.ga-groups` grid and the **click tear** (`.ga-vtear`, "The click") between columns 1 and 2. Column 3 is a **dashed-outline card** (`.ga-group.is-sep`: dashed border, ground fill, empty dashed boxes in place of ticks, label "Agreed separately"). The sub-line above the grid states the fee boundary in words.

```
 What the work covers.
 Management and oversight are covered by our management fee. Anything we'd build or fix… is agreed separately.
 ┌ CORE SERVICE ──────┐ THE ┌ OVERSIGHT ────────┐ ┌ - AGREED SEPARATELY - ┐
 │ ■ Set up and manage │ CLICK│ ■ Review the page  │ ┆ ☐ Landing pages        ┆
 │ ■ Write your ads    │      │ ■ Check enquiry    │ ┆ ☐ Website/form fixes   ┆
 │ ■ Manage budget     │      │ ■ Spot problems    │ ┆ ☐ New or repaired      ┆
 │ ■ Review & improve  │      │ ■ Explain & recomm.│ ┆   tracking             ┆
 └─────────────────────┘      └───────────────────┘ └ - - - - - - - - - - - ┘
 If we find a problem, we'll explain what needs fixing. Any additional work is agreed with you separately.
```

**Treatment.** Items are one line each, bold, no descriptions. On the ground surface the existing ink-section classes (`.ga-group`, `.ga-item-t`) need ground-variant colours (new small override; current rules assume ink). H3 per layer (`.ga-label ga-group-k`, existing).

**Mobile / tablet (< 1024 px).** Stacked cards; the tear becomes a dashed horizontal line between cards 1 and 2 (existing `@media (max-width: 1023px)` behaviour); the dashed card is last.

**Motion.** Standard reveal only. **No JavaScript beyond `CplusMotion`.**

### Block 5 · What we answer for

**Layout.** Paper surface. Left (5/12): H2, lead-in, the one qualification, fee line. Right (7/12): the **commitments ledger**: six numbered receipt-style rows, each with a bold lead and one sentence; ticks use the filled tangerine box. Rows are identical in weight; none is emphasised.

**Treatment.** Reuse `.ga-rc-l`-style rows (dotted leader + tick) or `ScopeRows` with `numbered` (production ordinal, order only). **Recommended: `ScopeRows numbered`** — existing, tested, no new CSS beyond a tick variant. The qualification uses the existing `.ga-limit` card pattern (3 px ink border, 10 px left bar), set to a calm, not defensive, tone (smaller than the ledger, below it).

**Mobile.** Single column; ledger first, qualification and fee line below.

**Motion.** Standard reveal. *Optional (droppable):* tick fill stagger using `data-rv-i` delays — no new JS; the owner has said decorative motion is unwanted, so **default is off**.

### Block 6 · What you learn each month

**Layout.** Ground surface. Top: H2 + lead-in + three numbered questions (a compact `StatedRows`-style list). Below: the **findings → decisions** graphic: a strip, then three paired rows. Right (or below): the honest-measurement note.

```
 Report → Review call → Decision → Change → Next report        (monthly strip)

 What we find                           What we do
 Some searches bring enquiries  ─────►  We look at why, and decide whether…
 Some searches bring clicks…    ─────►  We check whether they're the right searches…
 A page gets visits…            ─────►  We look at what it asks people… Making them is agreed separately.

 ┃ Not every enquiry can be traced to an ad. A phone call after someone saw your ad…
```

**Treatment.** Pairs use the existing `FindingRows` (`dl.dc-findings`: term/body, peers, no emphasis). A tangerine arrow sits between term and body (CSS pseudo-element, `aria-hidden`). The monthly strip is a five-item `ol` with small tangerine nodes and hairline connector; **the first two items carry the solid tick (confirmed monthly report and call)**; the rest are plain. The honest-measurement note reuses `.ga-limit` (existing). The "agreed separately" qualifier in row 3 is **text**, not a marker.

**Mobile.** Pairs stack (term above, arrow down, body below); strip becomes a vertical list; note below.

**Motion.** Arrows draw once in order on first view (CSS `transform: scaleX` with `data-rv-i` delays, `--dc-d-standard`, ≈ 90 ms stagger). **Reduced motion / no JS:** static. The sorting-tray animation from v1 is **dropped** (owner: no decorative motion).

### Block 7 · Next step

**Layout.** Ink (`b-close`, existing close region). Heading plus two starting points side by side; below them the **six-step stepper** in one row; CTAs.

```
 Already running Google Ads, or thinking about it?
 ┌ Already advertising? ───────┐  ┌ Thinking about it? ────────────┐
 │ Tell us what you spend…     │  │ Tell us what you sell and what… │
 └─────────────────────────────┘  └─────────────────────────────────┘
 ① Get in touch → ② Discovery call → ③ Audit → ④ Proposal → ⑤ Your approval → ⑥ Work begins
   You send a…      We learn what…   We review…  The work we…   Agreed work…     We start…
 You see our findings, a recommended plan and a proposal before any work starts.
 [Tell us what you're trying to fix]  [Book a call]
```

**Treatment.** **Compact:** step titles in one row at ≥ 1024 px with the one-line descriptions in small type (`--dc-t-note`, ≥ 12 px) beneath; numbered nodes joined by a hairline; step 1 filled tangerine, others outlined. New CSS-only `.ga-steps` (`ol`, six columns). `Stages` is **not** reused: it is a column-of-points layout, not a compact sequence. Buttons: `ActionPair`, with the existing `.b-close .dc-btn-secondary` inverse styling.

**Mobile.** Vertical list: node and title on one line, description beneath; two starting-point cards stack; CTAs stack full width, primary first.

**Motion.** Standard reveal only. No bespoke motion.

---

## 4. Desktop and mobile summary

| Block | Desktop ≥ 1024 | Tablet 768–1023 | Mobile < 768 |
|---|---|---|---|
| 1 | 6/6 grid, receipt right | Single column; receipt below, actions above it | Single column; no tilt; actions above receipt |
| 2 | 5/7 split | Single column | Single column |
| 3 | 5 × 2 lane grid + who-acts strip | Same grid if width allows (≥ 900), else vertical | Vertical path; wrapped pill tabs |
| 4 | Three columns + tear | Stacked cards, horizontal tear | Stacked cards |
| 5 | 5/7 split (text / ledger) | Single column | Single column |
| 6 | Pairs side by side; strip horizontal | Pairs side by side | Stacked pairs; vertical strip |
| 7 | Two cards; six-step row | Two-row steps | Vertical steps; stacked CTAs |

Global: max content width `--px-wrap` 1240 px; side padding `--dc-pad`; vertical rhythm `b-sec` / `--dc-rhythm`; **no horizontal scroll at 320 px**; tap targets ≥ 44 px (pills 48 px); no sticky or fixed elements.

---

## 5. Reuse of existing C+ components, tokens and CSS

| Need | Reuse | Status |
|---|---|---|
| Page shell, reveal, first-paint script | `CplusPage`, `CplusMotion` (`data-rv`, `data-rv-i`) | Reuse as is |
| Hero grid, kicker, H1, lede | `b-hero`, `b-hero-g`, `b-kicker`, `b-h1`, `b-lede`, `b-named`, `Breadcrumb`, `BreadcrumbJsonLd` | Reuse; retire `.ga-side` |
| Receipt | `ga-rc*`, `ga-tag*`, `ga-tick`, `ga-tear`, `ga-fig` | Reuse; add dashed footer `.ga-sep` and 4th line |
| CTAs | `ActionPair` (`/contact`, `/schedule-call`) | Reuse (replaces the page's local `Action()`) |
| Suitability list | `QuestionRows` | Reuse |
| Path Figure case selector | `Tabs` (`px-tablist`, `px-tab`, `px-tabpanel`) | Reuse if confirmed |
| Scope layers + click tear | `ga-groups`, `ga-group`, `ga-vtear` | Reuse; add `.is-sep` dashed variant and ground-surface colours |
| Commitments ledger | `ScopeRows numbered` | Reuse |
| Qualification / honest note | `ga-limit` | Reuse |
| Findings → decisions | `FindingRows` | Reuse; add arrow pseudo-element |
| Stepper | New CSS-only `.ga-steps` | New CSS |
| Tokens | `--dc-ground/paper/ink/dim/control/tang/tang-display/on-ink*`, `--dc-t-*`, `--dc-d-fast/standard/state/expressive`, `--dc-e-state/arrive`, `--dc-f-*` | Reuse; **no new tokens or colours proposed** |

---

## 6. New component requirements

| Item | Needed? | Notes |
|---|---|---|
| New client component | **None required**, assuming `Tabs` carries the Path Figure | Fallback if `Tabs` proves unsuitable: one small client wrapper holding the selected case; same markup and fallbacks |
| New server markup | `GoogleAdsBody.tsx` rewritten for seven blocks and `content.ts` replaced with the v4 copy | Not authorised yet |
| New CSS | `.ga-path*`, `.ga-sep`, `.ga-groups .is-sep` + ground variants, `.ga-steps`, finding arrow, receipt print-in keyframes | Added to `google-ads.css`; no global CSS changes |
| New dependencies | **None** | No animation library, no canvas, no SVG library |
| New analytics events | **None** | The five-event taxonomy is untouched; `meeting_started` stays on `BookingLink` as today |
| New assets | **None** | No images, fonts or illustrations |

---

## 7. Motion and accessibility specification

**Motion budget (owner: purposeful, limited).**

| Where | What | Trigger | Duration | Mechanism |
|---|---|---|---|---|
| Receipt | Lines print in, tear draws | Load, once | ≤ ~1 s (420 ms + 70 ms stagger) | CSS keyframes, `prefers-reduced-motion: no-preference` only |
| Path Figure | Line draws, step labels reveal | First view (~40 %), once | ≈ 1.2 s (900 ms line + 90 ms stagger) | Existing `data-rv` reveal + CSS |
| Path Figure | Case change | User action | 620 ms state transition, 420 ms strip fade | CSS transitions |
| Findings → decisions | Arrows draw | First view, once | 420 ms, 90 ms stagger | `data-rv-i` + CSS |
| All other blocks | Standard section reveal | First view, once | Existing (700 ms) | `data-rv` |

Rules: only `opacity`, `transform` and line `scale`; no layout-affecting animation (CLS); no looping, auto-advance, parallax, scroll-jacking, sticky elements, canvas or hover-only meaning.

**Accessibility specification.**
- One H1; seven H2s; H3 for the three scope layers; no skipped levels.
- Colour is never the only carrier: dashed-versus-solid always has words; marks are `aria-hidden`.
- Text and marks use the existing text-grade tokens; figure text ≥ 12 px at 320 px and ≥ 4.5:1 (KD-09/KD-10 rules); non-text marks ≥ 3:1.
- Keyboard: tabs via arrow/Home/End (existing); all links and buttons reachable in reading order; visible focus (inverse outline on ink).
- Screen readers: text equivalents for the receipt, Path Figure panels and findings pairs; list semantics for ledger and steps; the word "conversion" appears once.
- Text-spacing override (WCAG 1.4.12) must not clip figure text (KD-05).
- No-JavaScript and reduced-motion: §8.

---

## 8. Responsive behaviour and fallback states

| Condition | Receipt | Path Figure | Scope | Findings | Stepper |
|---|---|---|---|---|---|
| **Default (JS + motion)** | Prints in | Draws in; tabs switch panels | Static | Arrows draw | Reveals |
| **Reduced motion** | Fully drawn | Fully drawn; instant switches | Static | Static | Static |
| **No JavaScript** | Fully drawn (CSS-only animation guarded) | **All four panels stacked, tabs hidden** | Static | Static | Static |
| **No `IntersectionObserver`** | Same as default | Fully drawn | Static | Static | Static |
| **Print** | Fully drawn, shadow removed | All panels printed | Static | Static | Static |
| **Narrow (320 px)** | No tilt; lines wrap | Vertical path; wrapped pills | Stacked | Stacked | Vertical |
| **Windows high contrast / forced colours** | Dashed vs solid borders preserved | Lane borders preserved | Borders preserved | Borders preserved | Numbers retained |

---

## 8a. CTA and booking

Primary "Tell us what you're trying to fix" → `/contact`; secondary "Book a call" → `/schedule-call` via `ActionPair` (both existing). **Verified:** `/schedule-call` returns HTTP 200 and links to `calendly.com/mappedskills/client-discovery` (also HTTP 200). **Not verified:** open availability or that this is the intended event (owner action, storyboard §8). No booking URL is invented and no integration is assumed.

---

## 9. Technical risks and dependencies

| # | Risk / dependency | Mitigation |
|---|---|---|
| 1 | `Tabs` may not suit the lane-grid panels (panel layout, pill legibility on ink, per-panel draw-in) | Prototype at build planning; fallback is a thin client wrapper with the same markup |
| 2 | Receipt print-in could delay a visible LCP element | Animate only `opacity`/`transform`, ≤ 1 s, never the H1; measure LCP before and after |
| 3 | New CSS could shift layout (CLS) | Reserve space; compare CLS to the B-series baseline (max 0.028 recorded in `DEC-050`) |
| 4 | **Font-loading shifts (OBS-19 / OBS-20)** on long H1 and receipt text | Check Firefox and Slow-4G profiles named in the QA runbook; the H1 is only two short sentences, but widows at 320–430 px must be checked |
| 5 | Ground-surface variants of ink-only scope classes could cause contrast defects | Contrast-test all new colour pairings; reuse existing tokens only |
| 6 | Dashed-versus-solid distinction may be weak at small sizes | Always pair with words; test in forced-colours mode and at 200 % zoom |
| 7 | Screen-reader behaviour of tab panels (no `aria-live`) is unverified | **SR-1 – SR-5** real-device checks remain outstanding programme prerequisites; **E1** real-device testing as well |
| 8 | Copy drift: the page must never imply fixes are automatic | A content test that asserts the boundary wording and the single use of "conversion" (like the SEO page's proof-boundary test, `6378b85`) |
| 9 | Consent and analytics regressions | Run the consent and analytics regression; confirm zero diffs and no new events |
| 10 | H1 no longer names "Google Ads" | Post-release Search Console review only; **UNKNOWN** until data exists |
| 11 | Booking destination readiness | Owner confirmation (storyboard §8) |
| 12 | SEO and structured data | Title, description, canonical, URL, breadcrumbs and JSON-LD must serve byte-identical (compare against the current production head) |

## 10. Verification plan (for a later, authorised build)

1. **Content guards:** assert the H1 and supporting copy verbatim; "agreed separately" present on each boundary surface; "conversion" appears exactly once; no ROI, no figures, no "free"; no guarantee wording.
2. **Metadata and structured data:** served head identical to production for title, description, canonical, robots, Open Graph and JSON-LD.
3. **Accessibility:** automated checks in three engines at 320, 375, 430, 768, 1024, 1440 px; contrast; text-spacing override; forced colours; keyboard path through the tabs; heading outline; accessible names.
4. **Motion:** reduced-motion emulation; no-JavaScript render; no-`IntersectionObserver` render; print.
5. **Performance:** LCP, CLS and INP against the B-series baselines; font-loading profiles (OBS-19/20).
6. **Behaviour:** tab selection states and who-acts markers; both CTAs resolve; `/schedule-call` flow unchanged; no new network requests or events.
7. **Real devices:** E1 and SR-1 – SR-5 as release prerequisites.
8. **Visual review:** screenshots at the widths above, reviewed by the owner before merge.
9. **Test integrity:** nothing is reported as passed unless it was run (CLAUDE.md).

---

## 11. What I need from the owner to proceed

1. **Approve or amend this design pass**, especially: the ink/ground/paper rhythm; the lane-grid Path Figure; the receipt with a dashed "agreed separately" footer; the visible (non-collapsing) suitability list.
2. **Confirm using `Tabs`** for the Path Figure case selector (no new client component), or ask for a bespoke component.
3. **Confirm "tick versus dashed" as the boundary device.**
4. **Decide on the optional tick-fill stagger in Block 5** (default off).
5. **Confirm the Calendly event** and the documentation-annotation choices listed in storyboard §10.
6. **Authorise implementation separately**, when ready, including a branch and the verification plan above.

**STOP.** Awaiting design approval. No website implementation, metadata change, branch, commit, merge or deployment has occurred.
