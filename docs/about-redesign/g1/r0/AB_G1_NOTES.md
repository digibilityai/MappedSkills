# /about G1: design notes for owner review

**Status: G1 MOCKUP FOR REVIEW (2026-10-18).** Built on the approved G0 direction (AB-D01 to AB-D09, `../g0/AB_G0_DECISIONS.md`). Not approved yet. G2 is not authorised. The production `/about` page, shared components and metadata are unchanged. Nothing is committed, pushed or deployed.

## Preview
- **Mockup:** `mockup/index.html`. Open the file directly, or use the launch config `ab-g1-mockup` (served at `http://localhost:3202/mockup/index.html`). The header and footer are the live chrome (reused from the `/services` G1 kit), and their links point at live paths.
- **Review flags:** `?view=b` opens the figure on view 2; `?motion=reduce` makes the switch instant; `?banner=0` hides the review banner.
- **Screenshots** (`screenshots/`):
  - full pages: `desktop-1440-full.png`, `tablet-820-full.png`, `mobile-390-full.png`;
  - folds at 1440, 1280, 820, 390 and 320 px;
  - sections `*-s1` to `*-s5`;
  - the figure after one press: `*-fig-view2.png`;
  - no JavaScript: `desktop-1440-fig-nojs.png`;
  - measurements: `checks.json`.
- **Rebuild:** run `node tools/build.cjs` and then `node tools/capture.cjs` from `g1/`. The sources are `mockup/src/body.html`, `ab.css` and `ab.js`.

## 1. Page at a glance
| # | Section | Surface | What it does |
|---|---|---|---|
| 1 | Hero: "Judge us on the enquiries, not the traffic." | Cream | Who MappedSkills is, both CTAs, and the split drawn still (three ticked reports, one dashed gap) |
| 2 | "Everyone has a report. Who answers for the enquiry?" | Ink | Why it works this way, plus the single interaction: one press joins the split into one line under Capture, Convert and Measure |
| 3 | "Our part, and yours." | Paper | Ours / Yours on the same edge and hatching as the figure, the five "don't promise" chips, and the fit pair |
| 4 | "The people behind MappedSkills." | Cream | Founder/team introduction (**placeholders until the owner's facts arrive**), plus "How we work with you" in four lines and one link to `/how-it-works` |
| 5 | "Tell us what's actually happening." | Tangerine | The live close H2, "What happens next", Contact primary, Book a call secondary |

## 2. Measured against the live page (Chromium, playwright-core)
| | Live | G1 mockup |
|---|---|---|
| Sections | 8 | 5 |
| Page height at 1440 | 7,256 px | 5,164 px (−29%) |
| Page height at 390 | 8,637 px | 6,585 px (−24%) |
| Visible words in `<main>` | 808 | 536, of which about 45 are section 4 placeholders |
| First Contact CTA (bottom edge) | 6,279 px (desktop) | 563 px desktop, 481 px tablet, 475 px mobile: on the first screen at every width |
| Horizontal overflow (1440, 1280, 820, 390, 320) | none | none |
| Console errors | 0 | 0 |
| Text under 12 px | n/a | none |

The G0 estimate was 350 to 420 words. G1 lands at about 490 without placeholders. The remaining difference is the fit pair and the "How we work with you" lines, both kept because they carry approved facts. Either can be cut further if you prefer.

**Interaction checks (all widths):** after a press, the button label names the other view ("Show it split again"), focus stays on the button, the polite status line reads "View 2 of 2: one line", and the line draws once in 400 ms (`ax-draw`). Micro-interactions are 150 ms. **Reduced motion:** no animation runs and the switch is instant. **No JavaScript:** both views are shown, one under the other, and the button is hidden. Nothing moves on load and nothing loops.

**Not done:** manual screen reader, Firefox/WebKit, real devices. The browser pane could not open the local server in this session, so the visual checks are Playwright screenshots.

## 3. Copy and facts
Every sentence uses approved live copy, the Brand DNA, or the confirmed facts below. No guarantees, figures, response times, people facts or client results.

| Copy | Source |
|---|---|
| H1 "Judge us on the enquiries, not the traffic." | AB-D02; Brand DNA north star |
| "We're a small digital marketing firm." | Live meta description ("A small firm…"). The location is left out until the owner confirms the wording (§5). |
| "get found… turn more visits into enquiries… see what's working" | Brand DNA approved plain-English explanation; `/services` H1 (DEC-059) |
| Report slips (Rankings up, Clicks up, Site delivered, Not in any report) | Live hero, unchanged |
| "Who answers for the enquiry?" | Live H1's idea; "owns" replaced (F6) |
| "the parts you hire us for… judge the work on the enquiries it brings" | AB-D05, AB-D06 (fixes F2) |
| "tracked where tracking allows" / "where tracking allows" | DEC-053 OD-04 (fixes F3, F4) |
| Ours / Yours | Live boundary, reworded: no logging (F4), no sales-figure reporting (F5), no baseline (F3) |
| "What we don't promise" chips | Live, unchanged |
| "We'd rather tell you what we can't measure than pretend we can." | Shortened from the live paragraph |
| Fit pair | Live fit section, reworded, with the double negative removed |
| "How we work with you" (4 lines) | DEC-051 item 5; HW-D01 exact wording for the report and call (fixes F1) |
| "What happens next" | DEC-051 item 5, same as `/services` (DEC-059) |
| Close H2 "Tell us what's actually happening." | Live close H2, unchanged |

**Removed (approved):** the "0 of 28" self-measurement (AB-D04; it stays on `/ai-seo`), the six-step process block, "The method, published", the qualified-enquiry definition block (AB-D05), "measured against a starting point", and every long dash.

## 4. Metadata draft (AB-D07, for approval; applied in G2 only)
- **Title (live):** "Who We Are, and What We Can Actually Show You | MappedSkills"
- **Title (proposed):** "About Us: Judged on Enquiries, Not Traffic | MappedSkills"
- **Description (live):** "A small firm in Pune working on one thing: turning demand that already exists into enquiries a business can act on. The accountability boundary, what can be checked, and an honest account of where the firm is today."
- **Description (proposed):** "MappedSkills is a small digital marketing firm in Pune. We help businesses get found, turn visits into enquiries and see what's working, and we're clear about what we don't promise."
- **Unchanged:** URL, canonical, robots, the global `Organization` JSON-LD, no BreadcrumbList, analytics page type.
- **Heading outline:** one H1; five H2s (one per section after the hero); H3s for the two figure views, Ours, Yours, "What we don't promise", the fit pair, the person's name and "How we work with you". No skipped levels.

## 5. Open before G1 approval
1. **Founder/team facts (AB-D03):** names, roles, photograph (or none), "why we started" in the owner's words, optional background, and the location wording ("Pune" or "Pune, Mumbai, and India-wide"). Section 4 shows visible placeholders until these arrive, and will be refitted when they do. If no people facts are approved, the fallback is "How we work with you" alone, without the person block.
2. **Metadata wording** (§4).
3. **Word count:** keep the fit pair and the four working lines, or trim further.

## 6. Technical notes for G2 (for E6)
- New classes use the `ax-` prefix (the live page uses `ab-`, and `/contact` reuses `hw-*`; neither is defined here).
- Proposed heading ids: `ab-h1` (kept), `ab-h-why` (kept), `ab-h-bound`, `ab-h-team`, `b-close-h`. Removed: `ab-h-hold`, `ab-h-fig`, `ab-h-how`, `ab-h-check`, `ab-h-fit`, `ab-h-close`.
- One new control: `button.ax-tog` (the figure switch). No events, `dataLayer` pushes or `data-*` tracking hooks.
- CTA destinations: `/contact` (primary, hero and close), `/schedule-call` (secondary, hero and close), `/how-it-works` (one in-body link).
