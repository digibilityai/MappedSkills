# Gate 4 · B4 — Decisions Requiring Owner Approval

> **Owner decision recorded 2026-10-09: `DEC-042`** (B4 accepted with exceptions; OBS-13 seven-instance text fix; CauseZones deferred; screen-reader pass before B5 reuse; WebKit investigation). Outcome: `../../../GATE_4_B4_OWNER_CLOSURE.md`. The recommendations below are kept as written.

Prepared 2026-10-09 by the independent visual review (`B4_VISUAL_REVIEW.md`). Each item gives the evidence, a recommendation and what
approving it would and would not authorise. **Nothing here is decided.** Recommendations are **WORKING HYPOTHESIS** until the owner records
a decision in `docs/00-project/DECISION_LOG.md`.

| # | Question | Recommendation | Blocks B5? |
|---|---|---|---|
| A | Legacy `CauseZones` text below 12px (320–768) | **DEFER** (redraw with the B3 chain figures, before any production release) | No |
| B | DataTable header labels at 12.48px | **ACCEPT** | No |
| C | OBS-13 missing spaces, incl. "delivery.A form" | **Approve one separate text-only correction** (now 7 instances) | No |
| D | OBS-16 ~1.1 KB shared JS | **Do not address before B5**; schedule a module split in a performance pass | No |
| E | OBS-15 Firefox consent-banner timing | **Keep OPEN / unattributed** | No |
| F | Accessibility: is automation sufficient? | Automation is sufficient **for automated scope only**; **manual AT pass required** (list below) | Recommended before B5 reuses the components |
| G | *New* — `CauseZones` SVG text contrast 3.41:1 / 4.33:1 | Record as a known defect; fold into A's redraw | No |
| H | *New* — B4 overall | **ACCEPT WITH EXCEPTIONS** | — |

---

## A. Legacy `CauseZones` diagram — text below 12px

**Evidence (VERIFIED FACT, visible SVG only, Chromium):**

| Width | Before (`079e3cf`) | After (`6ab808a`) | Text < 12px |
|---|---|---|---|
| 320 | 9.47 / 10.33px | 9.60 / 10.47px | 24 of 24 |
| 360 | 10.80 / 11.78 | 10.93 / 11.93 | 24 of 24 |
| 390 | 11.80 / 12.87 | 11.93 / 13.02 | 14 of 24 |
| 430, 600 | 12.00 / 13.09 | 12.00 / 13.09 | 0 |
| 768 | 10.42 / 11.37 | 10.23 / 11.16 | 25 of 25 (the wide drawing at its narrowest) |
| 1024, 1440 | 13.03 / 14.21 | 13.03 / 14.21 | 0 |

Crops: `screenshots/components/{before,after}/problems-causezones-{320,390,768,1024,1440}.jpg`.

**Does it materially affect readability?** At **320–360 and 768, yes**: the grey annotation lines at 9.6–10.9px combined with 3.41:1 contrast
(item G) are hard to read on a phone; at 390 they are marginal. **But** the figure is `role="img"` with a title/description, and every fact in it
is repeated in readable HTML immediately below (the four cause headings and bodies, the "check measurement first" rule) and in the caption.
No information is available only in the small text. B4 did not make it worse (sizes moved by ±0.2px with the container width).

**Recommendation: DEFER.** Redraw `CauseZones` (and the B3 chain figures) once, against R-3 and a figure-text contrast rule, in a dedicated
figure batch. Do not fix it in isolation inside B4 or B5. It should not reach production as-is if the redraw is feasible first.
**Would authorise:** recording the deferral. **Would not authorise:** any redraw now.

## B. Pricing table header labels — 12.48px

**Evidence:** header and stacked labels are the system label role — 12.48px, weight 700, uppercase, tracked, `--dc-dim` at **6.38:1**.
Before: 12.8px, weight 600, 6.95:1. Identical rendering in Chromium, WebKit and Firefox (`screenshots/{webkit,firefox}/after/pricing-table-*.jpg`).
Below 600px the header row is visually hidden and the same 12.48px labels sit inside each stacked cell.
The R-3 working rule sets a **12px floor** and a 13px *preference* "where practical".

**In context** the labels are short ("Factor", "Pushes it lower/higher"), bold and uppercase, so they read at least as clearly as the 12.8px
semibold originals; the 0.32px reduction is not perceptible in the captures. Changing the token would alter every approved B1–B3 label.

**Recommendation: ACCEPT** (meets the floor; consistency outweighs the preference here). Optionally note that a future token review could move
all labels to 13px together.

## C. OBS-13 — missing space after inline elements

**Evidence:** source has the space; the compiled output drops it when the following JSX text spans a newline and contains HTML entities.

| Instance | Visible as | Where |
|---|---|---|
| Record (B3, 5) + B4 record (1) | e.g. "proof of delivery.**A** form" | `run/bold-whitespace-obs13.txt`; crop `screenshots/components/*/problems-obs13-*.jpg` |
| **New (this review)** | "The same object **/conversion-optimizationdraws** at a shallower depth" | `components/routes/CauseZones.tsx:210` caption; visible at every width; also in the figure's accessible name (`run/accessible-names-*.txt` line 26) |

All are pre-existing (identical in both builds). They read as typos on a page whose credibility rests on care, and one reaches screen-reader
users. The caption also shows a raw URL path as prose ("/conversion-optimization"); whether that should become a link or a page name is a
copy question for the owner.

**Recommendation: approve one separately scoped, text-only correction** covering all 7 instances (restore the space; nothing else), with a
content-probe diff declaring exactly those text changes. It does not need to precede B5, but it is cheap and should not wait for the figure
redraw. **Would not authorise** any other copy edit, including the caption wording.

## D. OBS-16 — ~1.1 KB shared JavaScript

**Evidence (B4 record, `run/bytes.txt`):** `/problems` +1.1 KB raw JS is the `ScopeDisclosure` client chunk, referenced by the shared
Direction C primitives module and downloaded on **every** Direction C route, whether or not it renders. Other Direction C routes' JS did not
change in B4 — the cost already existed there; B4 only adds `/problems` to the set. This review's whole-page JS totals (~532–537 KB per page,
incl. prefetches) put it well under 0.5% of loaded script; they are not precise enough to re-measure the 1.1 KB itself.

**Recommendation: do not address before B5.** The cost is fixed per route, not cumulative, and does not affect CLS or rendering. Schedule a
module split (client components out of the shared primitives file) in a performance-hardening pass before launch, and re-measure then.

## E. OBS-15 — Firefox consent-banner timing

**Evidence:** B4 record only (`run/firefox-nav-m5-summary.txt`): 3/1/0/0 M5 findings in four Firefox full-suite runs on the B4 build vs
0/0/0/0 on the before build; 0/8 targeted; 0/120 in an isolated probe per build; affected routes render no B4 code. **This review did not
re-test it and has no new evidence.**

**Recommendation: keep OPEN and unattributed** (WORKING HYPOTHESIS: suite-load timing). Do not attribute it to B4. Re-check it in the B5
Firefox run; if it recurs on a non-B5 route with no B5 code, consider adding a bounded wait to the M5 check (QA tooling change, separately approved).

## F. Accessibility — is the automated evidence sufficient?

**Automated evidence is sufficient for what automation covers:** the B4 record (axe, Tab walks, forced colours, reduced motion, no-JS, 320px,
text spacing, accessible names in 3 engines) plus this review's independent axe run — **0 violations after** in Chromium, WebKit and Firefox at
320/390/1440, versus KD-03 (`/problems`) and KD-04 (`/pricing` ≤390) violations before.

**It is not sufficient** because (1) axe does not evaluate SVG text contrast — item G was found by measurement, not automation — and (2) the
following can only be confirmed with real assistive technology. **None of this was done in this review or in B4 (E1 open).**

| Needs manual verification | Tool / device |
|---|---|
| Stacked `DataTable` (<600px): each cell announced with its row header and "Pushes it lower/higher" once, not twice; table navigation still works after stacking | VoiceOver iOS Safari, TalkBack Chrome Android, NVDA Firefox/Chrome |
| `Sequence`: ordinal announced once as "Check n" (visible "01" is `aria-hidden`); list semantics and the outcome box reading order | VoiceOver iOS/macOS, TalkBack |
| Crumb: "Problems" read as plain text, not a link; current page announced | VoiceOver, TalkBack |
| `FindingRows` description list: term/definition pairing announced | VoiceOver macOS (rotor), NVDA |
| `CauseZones`: `role="img"` name/description read in full, including the OBS-13 caption defect | VoiceOver, TalkBack |
| `NotPromised` open-square marks: not announced as checkboxes or images | VoiceOver, TalkBack |
| Sequence spine and causes rules under Windows High Contrast | Windows forced colours (real) |
| iOS H1 wrapping and the 92% / 90.5% fallback CLS on a real iPhone (item F10 in the review) | iOS Safari |

**Recommendation:** run this pass **before B5 reuses `FindingRows` and the DataTable pattern** (B5 adds `/how-it-works`, `/about`, `/faq`),
so that any fix lands once in the shared primitive.

## G. *New* — `CauseZones` SVG text contrast

**Evidence (VERIFIED FACT, computed from the SVG `fill` against the section background):** grey annotation lines **3.41:1** (before: 3.13:1),
tangerine-deep zone titles **4.33:1**, at every width, both builds. Both are below WCAG 2.x AA 4.5:1 for text of this size. Not covered by
KD-03 (which tracks HTML text through axe) or KD-05 (text-spacing clipping). `CauseZones` is used only on this route.

**Recommendation:** record it in the known-defects register as a pre-existing defect and include contrast in the A redraw brief. Not a B4
regression; not a B5 blocker.

## H. B4 overall

**Recommendation: B4 ACCEPT WITH EXCEPTIONS** — exceptions: A/G (inherited figure, deferred), C (text-only fix pending), F (manual AT pending,
E1), F10 (WebKit/iOS H1 wrapping and CLS unverified), plus the open programme items already listed in `GATE_4_B4_DECISION_PAGES.md` §13.

The owner records the decision. This review does not mark B4 approved and does not authorise B5.
