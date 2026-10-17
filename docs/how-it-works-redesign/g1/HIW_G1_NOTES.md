# /how-it-works G1 (R2): design notes for owner review

**Status: PROPOSAL, revision R2.** The design direction was accepted at the R1 review, and R2 is a visual refinement only. Nothing is approved for implementation, and G2 has not started. No released page, shared component or production metadata was changed. Nothing is committed, pushed or deployed.

## Preview

- **Open the mockup:** `mockup/index.html`.
  - Served locally at `http://localhost:3196/mockup/index.html` (launch config `hiw-g1-mockup`).
  - The header and footer links point at live paths.
- **Review flags** (add to the URL):
  - `?motion=reduce` shows every sequence finished;
  - `?step=N` freezes every sequence at step N;
  - `?sorted=1` opens the priority sort already sorted;
  - `?banner=0` hides the review banner.
- **R2 screenshots** are in `screenshots/`:
  - full pages: `desktop-1440-full.png`, `mobile-390-full.png`, `mobile-320-full.png`;
  - per section: `*-s1.png` to `*-s7.png`;
  - interaction states: `*-sort-before.png` and `*-sort-after.png`; `desktop-1440-start-step1.png` and `-step2.png`;
  - no JavaScript: `desktop-1440-nojs-full.png`;
  - check results: `checks.json`.
- **R1 screenshots** are kept in `screenshots/r1/` for before-and-after comparison.
- **Rebuild** with `node tools/build.cjs` (run inside `g1/`). Source files: `mockup/src/body.html`, `hx.css` and `seq.js`.

## R2: what changed and why

| Area | R1 | R2 | Why |
|---|---|---|---|
| **Hero illustration** | Three rows with separate number boxes, which read like a checklist | One connected path: three nodes on a single track that fills in tangerine stage by stage. The last node carries a small "Every month" loop, because the work is ongoing. On a phone the path runs downwards through the nodes. The nodes are the step buttons. | Reads as one journey. The only motion is the track filling, which shows progress. |
| **Getting started** | Six numbered steps | **Three stages**: (1) **We get to know you**: get in touch, our reply, discovery call; (2) **We look, then recommend**: audit, findings and plan, proposal; (3) **You decide**: your approval. On desktop each stage keeps its sub-steps as small chips. The working sheet now fills in one block per stage. | Less procedural, with all six facts kept. |
| **Reporting** | Three separate boxes with their own sketches | **One framed "Your monthly report"** with a single track through three markers: Starting point (solid) → What changed ("This month, compared with your starting point") → What's next (dashed until reached). No values and no rising line. | Shows immediately that the three parts are one report. Implies no improvement. |
| **HW-D01** | Unchanged | "A monthly performance report, and a review call where your service includes one." Word for word, in its own tile. The R1 "Review call" chip (which dropped the qualifier) stays removed. | Approved wording |
| **Questions** | Five answers | The same five questions, with shorter, more conversational answers (see the copy below). | Less repetition and jargon |
| **Phone** | Dense in places | See the list below. | Readability at 390 and 320 |

**Phone readability changes:**
- Getting started stages are plain text with a side rule. The chips are hidden there because they repeated the sentence above them.
- Priority cards are flat, with no tilt or heavy shadow.
- The action board shows stacked rows instead of narrow columns.
- The five limits are simple rows instead of dashed boxes.
- The report track runs vertically.
- Spacing between blocks is more generous.
- At 320 px:
  - the hero buttons sit on one line;
  - decorative tags and chip arrows are dropped;
  - the H1 is sized down slightly.

### Revised FAQ answers

1. **Do I have to commit before I see a plan?** No. You'll see our findings, a plan and a proposal first. Nothing starts until you say yes.
2. **How soon will we see results?** It depends on your service and your market, so we won't promise a date. We note where you're starting from, so you can see what changes each month.
3. **Can you guarantee more enquiries or sales?** No. We can't control your prices, your sales team or your market. We do the work we agreed and show you what changed.
4. **Who replies to the enquiries?** Your team does. Replying quickly is the one part only you can do.
5. **Do you do all the work, or do we?** We do most of it. From you, we'll need access to your accounts, a little of your time and quick decisions. Some work, like website changes, may be agreed separately.

## Page at a glance

|  | Live page | G1 R1 | G1 R2 |
|---|---|---|---|
| Words in the page body (closed FAQ answers not counted) | 2,012 | 884 | 870 (856 on phone) |
| Length, desktop / 390 / 320 | 13.5 / 20.9 / not measured | 7.9 / 11.7 / not measured | 7.8 / 11.0 / 14.3 screens |
| axe violations (WCAG 2.2 AA, Chromium; 1440, 390, 320) | 0 | 0 | 0 |
| Horizontal overflow; long dashes; text under 12 px; console errors | none / 12 dashes | none | none |

- Reduced motion shows everything complete, with nothing hidden.
- Without JavaScript, the sorted groups show and the toggle is hidden.
- Selecting a step stops its sequence and shows that step.

**Not done:**
- SR-1 to SR-5 screen-reader checks;
- Firefox and WebKit;
- real devices.

## Settled decisions applied

- **HW-D01:** exact wording kept.
- **HW-D02 (approved):** the qualified-enquiry ledger is removed from this page.
- **HW-D06 (approved):** the four technical limitations ("What we do not know") are removed.
- **HW-D03, D05 and D07:** unchanged, and no factual conflict was found. D07 is 1.5 s between steps.
- **No new claims:** no response time, price, duration, guarantee or report metric. Nothing says MappedSkills reviews or qualifies enquiries.

## HW-D08: SEO title and meta description (owner approval needed; production unchanged)

| | Current (live) | Proposed (recommended) |
|---|---|---|
| **Title** | How We Work, What We Measure, and What We Cannot Tell You \| MappedSkills *(72 characters)* | How It Works: From First Call to Monthly Review \| MappedSkills *(62 characters)* |
| **Meta description** | The published method: what is measured at each point on the chain, what cannot be attributed and why, and where a person decides rather than a process. Written to be checked. *(172 characters)* | How working with MappedSkills runs: a discovery call, an audit, a plan you approve, then the work and a monthly report. Including what tracking can't show. *(155 characters)* |

The H1, URL and canonical are unchanged. The Open Graph and Twitter title and description would follow, because `createMetadata` reuses them. No search data was used for these options (working hypothesis). They would be applied only in G2, if approved.

## Notes for G2 (if approved)

- **Build:** in `components/cplus/how-it-works/` only. Reuse `useSequence` (`stepMs: 1500, first: 0`), `ActionPair`, `Breadcrumb` and `Icon` unchanged, and adapt the existing page-owned `PrioritySort`. Do not edit `Sequence.tsx`, `Close.tsx`, `Interactive.tsx`, `cplus.css` or `primitives.tsx`.
- **GTM, for E6.** No analytics code reads these, and no events are added.
  - Heading ids change. Kept: `hw-h1`, `hw-h-sort`, `hw-h-work`, `b-close-h`.
  - New ids: `hw-h-start`, `hw-h-info`, `hw-h-gaps`, `hw-h-qs`.
  - Removed: `hw-h-first`, `hw-h-audit`, `hw-h-review`, `hw-h-tog`, `hw-h-decides`, `hw-h-measure`, `hw-h-not`, `hw-h-unknown`.
  - New step buttons will be added.
