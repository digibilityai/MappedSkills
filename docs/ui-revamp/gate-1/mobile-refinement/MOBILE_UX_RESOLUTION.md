# Direction C — Mobile UX Refinement & Resolution Report

| | |
|---|---|
| **Workstream** | Mobile UX refinement of the Gate 1 Direction C prototype (prototype only; no production code) |
| **Date** | 2026-10-08 |
| **Branch** | `ui-revamp` (uncommitted) |
| **Refined prototype** | `docs/ui-revamp/gate-1/prototypes/direction-c-resolution.html` |
| **Before (frozen)** | `docs/ui-revamp/gate-1/prototypes/direction-c-resolution-v1.html` — exact copy of the pre-refinement file |
| **Before/after page** | `docs/ui-revamp/gate-1/mobile-refinement/compare.html` |
| **Status** | **COMPLETE WITH EXCEPTIONS** (§6) · awaiting owner approval |

Evidence labels follow `CLAUDE.md`. Every result marked **VERIFIED** was produced by a script in `validation/`, run in Playwright Chromium (`playwright-core` from another local project, as in Gates 0–1; nothing installed here), with output saved beside it.

> **Record gap.** The owner brief calls Direction C "the existing approved visual direction". `DECISION_LOG.md` has **no entry recording that choice** (Gate 1 ended at owner review). This workstream proceeded on the owner's instruction. **The owner should record the direction decision** (e.g. as `DEC-034`) so later sessions do not treat C as unapproved.

---

## 1. What was wrong (before) — VERIFIED by `validation/audit.cjs` on v1

| # | Issue | Where | Widths |
|---|---|---|---|
| **P0** | **"We answer for this much" collapsed to a 0px-wide box**: it wrapped character by character ("SWER / R / IS / CH") and bled off the left edge, below the opportunity row instead of at the boundary | Chain figure (Capture / Convert / Measure) | 360–768 |
| P0b | The header "Contact Us" button wrapped onto two lines | Header | 360 |
| P0c | Friction lines squeezed to 3 lines in a narrow side column | Strategy section | 1024 |
| 1 | **24 interactive targets under 44px**: Traffic/Enquiries toggle 38px, breadcrumb 23px, menu service links 36px, footer links 36px | Global | all |
| 2 | SEO page: the CTA pair came **before** the explanatory paragraph on mobile; the commitment panel touched the next heading (no gap) | /seo | <900 |
| 3 | Own-site plate and "What we do not promise" touched (no gap) | Proof | <900 |
| 4 | The mark key sat far above the panels it explains, with no heading; the 28-run grid did not say what one mark means | Proof | all |
| 5 | Mobile menu: service links were 36px chips with no Capture / Convert / Measure grouping; Escape did not close it | Menu | <1200 |
| 6 | Services: no visible link affordance on mobile rows; stage heads lacked visual weight; stage titles were not headings | Services | <900 |
| 7 | Footer: Services and Company groups touched; links 36px; Company list in uneven columns | Footer | <600 |
| 8 | Desktop: Tab skipped the open Services panel (panel came after the whole nav in source order) | Header | ≥1200 |
| 9 | No skip link (production has one) | Global | all |

**Why the v1 audit missed P0 at first:** the detector treated zero-width boxes as invisible. It now reports text in a collapsed box, text off-screen, and any button whose label wraps. The tightened detector flags v1 and passes the refined file (§4).

---

## 2. What changed — by system, not by screenshot

| Area | Change | Rationale |
|---|---|---|
| **Chain boundary (P0)** | The boundary is now an **item in the chain's own list**, between "Qualified enquiry" and "Opportunity & revenue". Desktop: an absolutely positioned rule with a two-line label to the right of it (17ch), above column 6, clear of the line. Mobile: a full-width tangerine rule with the label on one line. Screen readers now hear it in sequence | Fixed at the component level. The meaning ("our accountability stops here") is now in the correct position at every width |
| **Header** | 64px mobile bar; logo, Contact Us and a 44×44 icon-only Menu button (accessible name "Menu" / "Close menu"); buttons never wrap; at ≤379px the header CTA drops its decorative mark. Header stays **non-sticky** | Fits 360 without wrapping; keeps the frozen CTA architecture |
| **Mobile menu** | CTAs first (unchanged); then Services grouped **Capture / Convert / Measure** with their marks, links in a 2-column grid of 44px targets; then the main links. Opens with a 420ms fade/slide (instant under reduced motion). Escape closes it and returns focus; choosing a link closes it | Same destinations; clearer grouping; LIVE-1 structure still impossible |
| **Desktop services** | Panel moved directly after its button in the DOM; `inert` while closed | Correct Tab order; closed links unreachable |
| **Type hierarchy (mobile)** | Labels at +0.10em tracking (was +0.15em) so section labels wrap less; notes 15px; tighter stack spacing (22px); friction lines 17.3px | Same roles and scale, better wrapping; no copy changed |
| **CTAs** | Below 600px every CTA pair (hero, /seo, close) is **full-width and stacked**, 52px tall, primary first. No sticky CTA (§5) | Equal reach for both actions; clear primacy |
| **Proof** | The key is now a ruled block titled **"How to read the marks"**, one item per line on mobile. The 28-run grid gets a key line ("One mark per run. A named run would be filled.") and reflows to 10 per row at ≤420px. "Read the case study" moved to a plate footer. Gap restored before "What we do not promise"; tighter plate padding | Easier scanning; every count, limitation and classification is unchanged |
| **Services** | Stage heads are a ruled row: label, **h3** title, capability count, and stage marks on the right. Each service row shows its → affordance on mobile. More separation between stages | Capture → Convert → Measure is easier to read at 360 |
| **SEO page** | DOM order is now lede → "Then we keep going…" → CTAs (desktop placement unchanged: split opener, CTAs on row 2). The second paragraph keeps a rule on mobile. The commitment panel is an `aside` with a heading and three labelled rows. It follows the "situation" statement in reading order and still sits left on desktop | Explanation before the ask; scannable caveats; reading order = DOM order on mobile |
| **Friction** | Rows stack below 1200px; the closing label is left-aligned below 900px | Fixes the 1024 squeeze |
| **Footer** | Dark footer kept. Mobile: groups full-width with a rule under each heading, links in a 2-column grid of 44px rows, contact block, legal links 44px tall in a column. ≥600px: links 44px tall and full column width | Tap targets; clear grouping |
| **Accessibility plumbing** | Skip link ("Skip to main content", production wording), `main` landmark target; breadcrumb links 44px tall | Parity with production; target size |

**Unchanged:** every approved line of copy, every destination, CTA wording and order, the evidence counts and limitations, the colour tokens, both typefaces, the motion tokens, and the desktop compositions (apart from the boundary label fix and the friction stacking at 900–1199).

### 2.1 New interface labels — need owner approval (copy is LOCKED)

These are short UI labels added to explain structure. They are **not** claims. They are proposed for approval and are easy to remove:

| Label | Where |
|---|---|
| "How to read the marks" | Proof key heading |
| "One mark per run. A named run would be filled." | 28-run evidence grid |
| "4 capabilities" · "2 capabilities" · "1 capability" | Services stage heads |
| "Horizon" · "If it is urgent" · "Not promised" | /seo commitment-panel row labels (the sentences under them are unchanged) |

---

## 3. Motion and interaction (P2)

| Item | Result |
|---|---|
| Existing motion (hero resolve T1, chain draw T2, friction runs T3, 28-run plate, close arrival) | Kept. Validated with motion on at 390 (`validation/mmotion.cjs`): **4 armed elements at load, 0 left unresolved after a full scroll** (nothing gets stuck invisible). Frames in `after/motion/` |
| New: menu open | 420ms opacity + 6px translate, `e-arrive` easing. Measured opacity 0 → 0.86 at 120ms → 1.00. **Under reduced motion: 1.00 at 20ms** |
| New: boundary rule on the chain | Fades in 600ms after the chain resolves, so the accountability line arrives last |
| Reduced motion | **0 elements in a pre-state; hero stage resolved** on load (VERIFIED) |
| Rejected | Scroll-triggered fades for the new key, services rows or footer; parallax; a sticky CTA bar. None of them improves comprehension |

---

## 4. Validation results

All scripts and their raw output are in `mobile-refinement/validation/`.

### 4.1 Layout audit (`audit.cjs`; results in `audit-before.txt` and `audit-after.txt`)

The audit checks for:
- page overflow;
- collapsed, narrow or off-screen text;
- wrapped buttons;
- overlapping text;
- clipped boxes;
- targets under 44px;
- heading-level jumps;
- console errors;
- CLS.

| Width | Before: defects | After: defects | Small targets before → after | Overflow | Console errors | Height before → after (screens) |
|---|---|---|---|---|---|---|
| 360 | collapsed label; wrapped "Contact Us" | **none** | 24 → **0** | none | 0 | 14.1 → 14.5 |
| 390 | collapsed label | **none** | 24 → **0** | none | 0 | 13.8 → 14.1 |
| 430 | collapsed label | **none** | 24 → **0** | none | 0 | 13.5 → 13.8 |
| 768 | collapsed label | **none** | 24 → **0** | none | 0 | 11.8 → 12.3 |
| 1024 | friction squeeze | **none** | 24 → **0** | none | 0 | 8.9 → 9.2 |
| 1440 | — | **none** | 24 → **0** | none | 0 | 8.9 → 9.1 |

The page grew by about 2–4%. This comes from 44px targets, stacked full-width CTAs and restored gaps; no content was added except the §2.1 labels.

**Known false positives (inspected, not defects):**
- **H1 overlap:** "enquiries" × "traffic" are inline boxes that overlap by design at 0.98 leading. The glyphs do not touch.
- **Clipped label:** `SPAN.lbl` is the menu button's visually hidden label.

**Heading order:** no level jumps at any width.

### 4.2 Keyboard and menu (`kb.cjs`; results in `keyboard-result.txt`): **20 / 20 PASS**

At 390px:
- First Tab reaches the skip link, with a visible 3px focus outline.
- Tab order: logo → Contact Us → Menu.
- Enter opens the menu (`aria-expanded`) and changes the button's name to "Close menu".
- The next Tab lands on the Contact Us inside the menu, then Book a call. Both are inside the first viewport at 390×780.
- The header is `position: relative`.
- Escape closes the menu and returns focus to the button.
- Choosing a link closes the menu.
- At **390×600** the last menu item scrolls into view, so there is no sticky trap.

Toggle: Enter and Space work, and `aria-pressed` is correct.

At 1440px:
- The services disclosure opens on Enter, and the next Tab enters the panel.
- Escape closes it and returns focus.
- Links are not focusable when the panel is closed.
- There is no `role="menu"`.

Two test-harness notes, both disclosed:
- **Desktop panel test:** it needed a 50ms settle between Enter and Tab, because same-frame key presses raced the style update.
- **Closed-panel test:** a one-frame race was fixed in the product with `inert`, not in the test.

### 4.3 Contrast (computed, unchanged tokens)

| Pairing | Ratio |
|---|---|
| Ink on ground | 16.8:1 |
| Dim on ground / paper | 6.38 / 6.95:1 |
| Gap-text on ground / paper | 4.90 / 5.34:1 (used for the run key and client-data text) |
| Tang-small | 6.02:1 (small text) |
| White on tang-small | 6.65:1 |
| Ink on tangerine | 5.97:1 |
| Control borders | 3.47:1 |

No new colours were introduced.

---

## 5. Decisions recorded in this workstream

| Decision | Reason |
|---|---|
| **No sticky CTA bar** | It conflicts with the frozen CTA architecture ("no sticky bar"). It conflicts with THE RESOLVE §4.5 ("0 fixed/sticky"). It would cost about 64px of a 600–800px phone viewport. It is the defect class behind LIVE-1. Contact Us stays in the header; both CTAs open the menu; full-width pairs sit at the hero, the /seo hero and the close |
| **Menu stays in page flow** (not a full-screen overlay) | An overlay needs `position: fixed`, which is a §4.5 binding trait. In-flow plus CTAs-first already passes the short-viewport test |
| **Boundary as a list item** | The accountability line is part of the sequence, so it belongs in the list (also better for screen readers) |

None of these changes a locked decision.

---

## 6. Exceptions and unverified checks

| # | Item | Label |
|---|---|---|
| E1 | **CLS 0.13–0.34 on some runs.** Attributed (VERIFIED): with Google Fonts blocked, CLS = 0. The shift is the web-font swap from the fallback stack. Production self-hosts the fonts through `next/font` with metric-adjusted fallbacks, so the prototype value does not predict production. **Production CLS has never been measured** | RESEARCH REQUIRED |
| E2 | The §2.1 interface labels and the existing bracketed placeholder lines need owner wording approval | OWNER |
| E3 | The LIVE-2 proof headline is still not reproduced (separately authorised) | OPEN (`LIVE-2`) |
| E4 | **Not performed:** real phones (iOS Safari, Android Chrome), Firefox/Safari engines, VoiceOver/TalkBack, 200% zoom, landscape phones, Windows High Contrast | UNKNOWN |
| E5 | The 360/390/430 checks use Chromium device-width emulation, not real devices | Limitation |
| E6 | `DECISION_LOG.md` does not record Direction C as chosen (see top) | OWNER ACTION |
| E7 | LIVE-1, LIVE-2 and PROC-1 are untouched; no production file changed | VERIFIED |

---

## 7. Recommendation

**Ready for owner review.**

The P0 defect is fixed at the component level and guarded by a detector that now catches its class. No defects, undersized targets or console errors remain at any of the six widths. Keyboard and menu behaviour passes 20/20, and motion behaves correctly with and without reduced motion.

Approval should be conditional on three owner actions:
1. Record the Direction C decision in `DECISION_LOG.md`.
2. Approve or replace the §2.1 labels.
3. Accept that device, assistive-technology and production performance testing belong to Gate 2 / Gate 5 on the real stack, not to this prototype.

**Do not start production implementation until approved.**
