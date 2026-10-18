# /pricing G1: approved design and copy (R0)

**Status: G1 R0 APPROVED AS PROPOSED (owner, 2026-10-18: "G1 pricing design and copy approved as proposed. Statements in the notes table are confirmed.").** All eight statements in §4 are owner-confirmed. The G1 copy and design are frozen; changes need a new owner instruction. G2 is **not authorised**; the DECISION_LOG entry is to be written with G2, as for /about.

*Original status:* Authorised by the owner brief "Pricing Page | G1 Visual Design Brief" (2026-10-18): G1 mockup and copy only. G2, production source changes, commits, pushes, PRs, merges and deployment are **not authorised**. The production page (`app/(pages)/pricing`, `components/cplus/pricing/`), shared components and metadata are unchanged.

**OWNER REQUIREMENT (2026-10-18):** MappedSkills uses fully customised pricing. No standard packages, starting prices or price ranges are shown. No price, currency, package, discount or time promise appears anywhere in the mockup.

## Preview
- **Mockup:** `mockup/index.html` (open the file, or launch config `pr-g1-mockup` → `http://localhost:3203/mockup/index.html`). Header and footer are the live C+ chrome, reused from the /about G1 kit. `?banner=0` hides the review banner.
- **Screenshots** (`screenshots/`): full pages `desktop-1440-full.png`, `tablet-820-full.png`, `mobile-390-full.png`; folds at 1440, 1280, 820, 390 and 320; sections `*-s1` to `*-s5`; no JavaScript `desktop-1440-nojs-full.png`; measurements `checks.json`.
- **Rebuild:** from `g1/`, `node tools/build.cjs` then `node tools/capture.cjs`.

## 1. Proposed customer-facing copy

**1. Hero (ground)**
- Kicker: Pricing · Every quote is tailored
- H1: **The right work. A price that makes sense.**
- Lede: Every business needs something different. We look at what you need, recommend the right scope and explain the cost before work begins.
- CTAs: **Discuss your requirements** → `/contact` · **Book a call** → `/schedule-call`
- Figure (price tag, no number): "Your price · Built around your business" · What you need · What needs fixing · How much work is involved · **Explained before work begins**
- Caption: Illustration. There's no price list: every quote is worked out for your business.

**2. What affects your price? (paper)**
- H2: **Three things shape the quote.**
- Line: The more there is to do, the more the work costs. These are the three things we look at.
- 1 · **What you need** — One service or several working together. (scale: One service → Several, together)
- 2 · **What needs fixing** — Your website, tracking and existing setup. (scale: Little to fix → A lot to fix)
- 3 · **How much work is involved** — Content, competition and ongoing management. (scale: Lighter → Heavier)
- Caption: Illustrations only. Your situation will be different.

**3. What your fee covers (ink)**
- H2: **One plan, with only what you need.**
- Line: Your fee covers the work we recommend, planned so each part supports the next.
- **Get found** — More of the right people find your business. *If you need it*
- **Get enquiries** — More of those visitors get in touch. *If you need it*
- **See what's working** — A monthly performance report on the work. *With ongoing marketing work*
- **Your proposal sets out:** The services we recommend · The scope · The deliverables · How we report · **Our fees**
- **Ad spend:** If we run ads for you, the ad budget is paid directly to the platform. **Our fee:** Charged separately, as set out in your proposal.
- Note: Review calls are included where agreed in your proposal. No one can honestly guarantee rankings, enquiries or revenue, so we don't.

**4. How you get a quote (ground)**
- H2: **Three steps, and you decide.**
- 01 **Tell us what you need** — Share your business, goals and challenges.
- 02 **Get a clear proposal** — We recommend the scope and explain the cost.
- 03 **You decide** — Nothing starts until you approve it.

**5. Close (tangerine)**
- Kicker: Get a proposal
- H2: **Know what you're paying for.**
- Lede: Before we begin, you'll know what we're recommending, why it matters, what it costs and how we'll report on the work.
- CTAs: **Get a proposal** → `/contact` · **Book a call** → `/schedule-call`

## 2. Main visual choices
- **A price tag with no number on it (hero).** The page's one idea in a single image: the price exists, it is built from three things, and you see it before work begins. Tangerine marks the one event, "Explained before work begins". It tilts 2° and straightens on hover (150 ms).
- **Three columns on one shared axis (section 2), not cards or a table.** Each factor has a small still drawing (blocks that grow, a works / needs-fixing check, segmented meters) over the same "less work → more work" arrow, so the logic reads in seconds without prices. Rules divide the columns; on tablet each row puts text beside the drawing; on phones they stack.
- **Dashed = optional, solid = standard (section 3).** "Get found" and "Get enquiries" are dashed "If you need it" frames; "See what's working" is a solid paper tile, showing visually that clients don't buy everything. The proposal contents sit on one ruled line with "Our fees" highlighted, then the one fee boundary (ad spend vs our fee) as a split bar, reusing the /about "Our part / Your part" pattern.
- **One line through three numbers (section 4)**, turning tangerine at "You decide", so the customer's decision is the visual endpoint. Vertical on phones.
- **Shared C+ chrome and tokens**: Ground / Paper / Ink / Tangerine, Bricolage Grotesque + Manrope, the hero → paper → ink → ground → tangerine close rhythm used on /services and /about. No imagery, no ambient or looping motion.

## 3. Measured (Chromium, playwright-core, `screenshots/checks.json`)
| | 1440 | 1280 | 820 | 390 | 320 |
|---|---|---|---|---|---|
| Page height | 4,583 | 4,357 | 5,212 | 6,613 | 7,015 |
| Horizontal overflow | none | none | none | none | none |
| First `/contact` CTA on first screen | yes | yes | yes | yes | yes |

Also: 381 visible words in `<main>`; 0 console errors; no text under 12 px; micro-interactions 150 ms; transitions off under reduced motion (one transient `max-width` transition from the live chrome at load, not from this page); complete without JavaScript (the page needs none). **Not done:** screen reader, Firefox/WebKit, real devices.

## 4. Statements needing owner confirmation (all CONFIRMED by the owner, 2026-10-18)
| # | Statement | Basis | Status |
|---|---|---|---|
| 1 | "The more there is to do, the more the work costs." | Inferred from the brief's three factors | **Confirm** the fee is scope-based as described |
| 2 | The three factors (need, fixing, workload incl. content, competition, ongoing management) | Owner brief | Confirmed by brief; confirm nothing important is missing (e.g. ad budget size does not change the fee — UNKNOWN) |
| 3 | "A monthly performance report" / "With ongoing marketing work"; review calls "where agreed in your proposal" | Owner brief (reporting standard for ongoing engagements) | Confirmed by brief; confirm one-off projects have no monthly report |
| 4 | "Your proposal sets out the services we recommend, the scope, the deliverables, how we report, our fees" | Owner brief | Confirmed by brief |
| 5 | "Ad budget is paid directly to the platform. Our fee: charged separately" | Live /pricing ("Paid directly to Google… Our management fee: charged separately"); record of 2026-10-15 | **Confirm** it still holds for every ad platform managed |
| 6 | "Nothing starts until you approve it." / "explain the cost before work begins" | Owner brief; DEC-051 item 5; /about R4 | Confirmed |
| 7 | "No one can honestly guarantee rankings, enquiries or revenue, so we don't." | Approved /about R4 copy | **Confirm** reuse here (it can be removed; it is the page's only negative line) |
| 8 | Step 1 does not mention a call, and no turnaround time is given | Brief: no unsupported time claims | No action — flagged so it isn't added later |

## SEO note (not in scope, for G2)
The current title is "What This Costs, and What Changes the Number | MappedSkills" and the current H1 is "Your price depends on what your business actually needs." The proposed H1 changes; metadata is unchanged in this mockup. H1/metadata changes need separate owner approval at G2.
