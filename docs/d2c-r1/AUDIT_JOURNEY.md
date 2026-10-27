# D2C R1: user journey, storytelling and motion audit

27 October 2026. Audit only: no code edited, nothing committed. Page: http://localhost:3412/d2c-preview-r1 (Chrome, 1440x900 and 390x844).
Evidence: `docs/d2c-r1/audit/` (`hero-d-t*.png`, `hero-m-t*.png` animation frames; `scroll-d-s1..s9-t250.png`, `scroll-m-s1..s9-t250.png` first 250 ms after jumping to each section). Section numbers: 1 Hero, 2 Challenge, 3 Shoppers, 4 How we help, 5 Readiness, 6 Measurement, 7 Client work, 8 FAQs, 9 Closing band.

**OBSERVED** = measured or seen in the render. **JUDGEMENT** = my opinion.

## 1. Verdict: Minor refinements
The journey and the animation are sound. No material gaps. One missing link in the story (section 2 to 3) is worth fixing; the rest is optional polish.

## 2. User journey
Question each section raises and whether the next answers it:

| From | Question raised | Next section | Answers it? |
|---|---|---|---|
| 1 Hero | "What does this cost me per order?" | 2 Challenge | **Yes.** The receipt directly extends the hero's order-versus-cost picture |
| 2 Challenge | "So how do I win orders at a cost I can afford?" | 3 Shoppers | **Partly.** Section 3 turns to how people buy and never says why that matters for cost. Reads as a new topic |
| 3 Shoppers | "Which advertising fits these paths?" | 4 How we help | **Yes.** Meta and Google tags on the paths map onto the cards |
| 4 How we help | "What do you need from me?" | 5 Readiness | **Yes.** The "You provide" column leads into the checklist, but the heading is an abrupt switch to "you" |
| 5 Readiness | "How will I know it is working?" | 6 Measurement | **Yes** |
| 6 Measurement | "Have you done this?" | 7 Client work | **Partly.** The proof is one sentence and an image, and its heading ("Work with a D2C brand.") does not tie back to measurement |
| 7 Client work / 8 FAQs | "What do I do next?" | 9 Close | **Yes** |

OBSERVED: section 4 is the longest block (1,301 px desktop, 2,171 px mobile) with five cards, an "also" line, two links and a two-column split. Mobile total length is 11,096 px (about 13 screens); desktop 7,587 px.
OBSERVED, repetition: FAQ 3 repeats the readiness list, FAQ 4 repeats the measurement section. "Not every ... buys/leads/traced" appears four times (hero caption, section 3 lede, section 3 note, section 6).
JUDGEMENT: the FAQ repeats are useful for the FAQPage schema, so they are low-risk. The hedging is slightly defensive but consistent with the proof policy.

## 3. Storytelling
The thread "orders versus what they cost" is **strong in sections 1, 2 and 6** (hero ledger, receipt, "ROAS is not profit") and **absent in sections 3 to 5**, which read as instruction (how people buy, which campaign types, what to prepare) with no cost language. The story resumes at measurement.
- OBSERVED: hero shows one linear path (find, visit, consider). Section 3 says paths are alternatives. JUDGEMENT: small tension, which the hero caption "Illustrative" mostly covers.
- OBSERVED: the hero ledger shows the "won" bar longer than the "cost" bar. JUDGEMENT: it implies the order comfortably outweighs its cost, slightly at odds with "profitability gets squeezed" in section 2. Not a claim, but worth knowing.
- OBSERVED: sections 6 and 7 do not connect. Wanderlooms appears as a standalone card, and nothing says it is an example of the approach above (correct, since no outcome is publishable).
- Lightest fixes are single sentences, listed in section 6 below.

## 4. Animation inventory
All measured with the browser's animation API. Every animation has one iteration. No loops. Layout shift measured with a layout-shift observer: **CLS 0.0 at both widths**. No automatic scrolling.

| # | What moves | Idea it communicates | Starts | Lasts | Repeats | Final state | Reduced motion | Mobile |
|---|---|---|---|---|---|---|---|---|
| 1 | Hero: search card, store card and cart card fade up in turn with dashed links | A shopper finds, visits, considers | 0.25 s, 1.0 s, 1.75 s (links 0.75 s, 1.5 s) | 0.6 s each | Once | Clear | Off, final state shown (verified) | Same timing. Art spans y 532 to 763 of 844, so it is visible at load |
| 2 | Hero: order card (check, rupee) fades up | An order sits against its cost | 2.5 s | 0.6 s | Once | Clear | As above | The persistent cookie banner covers the lower art, including this card, until dismissed (OBSERVED in `hero-m-t2_5.png`) |
| 3 | Hero: "won" and "cost" bars grow left to right | Compare what an order brings in with what it cost | 3.0 s and 3.2 s | 0.8 s each (ends 4.0 s) | Once | Clear | As above | Same |
| 4 | Scroll reveal on each block below the first screen (fade, 14 px rise) | None: pacing only | When about 8% into view | 0.42 s | Once, no replay on scroll back | Clear | Off (page untouched) | Same; many blocks wait because the page is long |
| 5 | FAQ plus icon rotates | Open or closed state | On click | 0.18 s | On demand | Clear | Not measured | Same |

OBSERVED problems:
1. During the first 2.5 s the lower 55% of the hero art box is empty, then the ledger card appears, so the hero looks half-built (`hero-d-t1.png`, `hero-d-t2_5.png`).
2. Section 3 passes `--i` stagger values on the three path cards but nothing uses them (grep: no `var(--i)` in `d2c-r1.css`), so the three cards reveal together. The markup suggests a stagger that does not exist.
3. The receipt in section 2 (the core "cost eats the order" idea) has no motion at all, while decorative scaffolding in the hero does.
4. The dev server restarts the page once about 0.6 s after first load (HMR reload), which replays the hero animation. It appears dev-only; I cannot confirm in production because the preview route is development-only. Worth a check on the real route before release.
5. Known risk from earlier releases: reveals wait for an intersection observer, so in a hidden or background tab the blocks stay invisible until the tab is shown. Content returns on visibility; the no-JS and reduced-motion cases are fine (verified in R1 QA).

JUDGEMENT: animation 1 to 3 earns its place. Animation 4 is decorative but calm and conventional. Nothing distracting, no loops.

## 5. Conversion journey
OBSERVED CTAs: header "Discuss Your Advertising"; hero "Discuss Your Advertising" plus "See our work"; section 4 text links "Explore Google Ads" and "Explore Meta Ads"; section 7 "See our work" (same target as the hero link); closing band "Discuss Your Advertising"; footer "Discuss Your Advertising".
- One primary action, one label, one destination (/contact). No competing form or booking path. Good.
- Between the hero and the close there is no primary CTA for roughly 6,000 px desktop. The visitor's strongest buying moment, after "check what is ready" (section 5), has no action beside it.
- "See our work" appears twice with the same target. Service links lead away from the page, but are clearly secondary text links.
- Wanderlooms is unlinked, so the proof section has no next step other than "See our work". Correct under the proof policy.

## 6. Prioritised improvements (maximum five)
None is a redesign. Nothing is implemented.

| # | Recommendation | Type | Essential? | Where |
|---|---|---|---|---|
| 1 | Add one bridge sentence to the section 3 lede so it ties buying paths to cost, for example "Each path costs something different to win, so we look at them one at a time." Optionally one for section 4 ("Each path needs a different kind of ad."). Copy only | JUDGEMENT, fixes an OBSERVED gap | **Essential** (the only story break) | `SHOPPERS.lede` and optionally `HELP.lede` in `components/d2c-r1/content.ts` |
| 2 | Add a single compact CTA row after the readiness list, same label and destination, for example "Not sure what is ready? Tell us about your store." | JUDGEMENT, addresses OBSERVED CTA gap | Optional (recommended) | Section 5, `D2CR1.tsx` after `.d2c1-checks`, `d2c-r1.css` |
| 3 | Hero start state: show the order card as a faint outline from the beginning, or bring it in earlier (about 1.5 s) so the art never reads half-empty; keep the total under about 3 s | Fixes OBSERVED problem 1 | Optional | `HeroArt` and `.d2c1-n4`, `.d2c1-beam` delays in `D2CR1.tsx`, `d2c-r1.css` |
| 4 | Make the receipt bars grow once when revealed, so the central cost idea has purposeful motion. Either apply the stagger to the three buying paths or remove the unused `--i` | Fixes OBSERVED problems 2 and 3 | Optional | Section 2 `.d2c1-bar i`, section 3 `.d2c1-path`, `d2c-r1.css`, `D2CR1.tsx` |
| 5 | Small clarity items: replace the 01 to 06 numerals on the measurement list with neutral markers (the items are not a ranked sequence); retitle section 7 so it reads as an example, for example "An example from D2C"; check the hero reload in production | JUDGEMENT | Optional | Section 6 `.d2c1-ladder-n`; `WORK.h2` in `content.ts` |

Not recommended: extra sections, a second conversion path, rewriting approved copy, or removing the FAQ overlaps.

## 7. Limits of this audit
Run in Chrome on a development server. The cookie banner and the dev reload are environmental. No screen reader, Safari, Firefox or real-device checks. Mobile was measured at 390x844 only; at 667 px height the hero ledger starts at roughly the fold (calculated from the art's dimensions, not captured).
