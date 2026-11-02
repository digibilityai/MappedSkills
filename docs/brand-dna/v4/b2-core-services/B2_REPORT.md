# B2 core services and the services hub: implementation report

**Status:** implemented on `feat/b2-services-seo` from `main` `ba338b4` (after B1, PR #76). Draft PR awaiting owner visual approval. Not merged, not deployed, no Contentful write.
**Authority:** owner-approved B2 scope (2 November 2026), Brand DNA 4.0 revision 4 (DEC-118), DEC-119, the B2 section of `../sitewide-audit/SITEWIDE_BRAND_DNA4_AUDIT.md`, DEC-115/DEC-116 (case showcase). Recorded as **DEC-120** in `docs/00-project/DECISION_LOG.md`.

## Changes by page

| Page | Change | Evidence label |
|---|---|---|
| `/services` | Bespoke work cards replaced by the shared CaseShowcase: AnybodyCanBake Google Ads and Wanderlooms Meta Ads, from the public library only, no fill (`components/paid-advertising/services/showcase.ts`). Heading "The work behind the offer", id `sx-work` and anchor `our-work` kept; "View all case studies" goes to `/work` | OWNER REQUIREMENT |
| `/services` | New "SEO & Organic Visibility" supporting block at the end of the core services section, after "Which one first?": label "Supporting service", one sentence (the approved `/seo` description), "Our published SEO case studies are on the SEO page.", link "Explore SEO" to `/seo`. No SEO cards, no figures. Uses the page's existing dashed "supporting" treatment | OWNER REQUIREMENT |
| `/services` | H1 emphasis moved from "Google Ads and Meta Ads." to "the right customers" (text identical, A4.1; audit OD-09 recommendation). FAQ heading one colour (A4, D-10) | APPROVED DECISION (B2 emphasis scope); **visual approval needed** for the H1 |
| `/services` | Type floors: page eyebrows .69/.72 to .75rem, card badges .72 to .75rem, "Supporting" .6875 to .75rem; diagram caption .78, mock-up captions .75 and the Meta note .82 to .875rem | APPROVED DECISION (D-03) |
| `/google-ads` | Labels to 12 px (`.ga4-lane-lbl`, `.ga4-js-who`, campaign `dt`, `.ga41-card-k`); caption `.ga4-cap` to 14 px; FAQ heading one colour. Scoped to `.ga41`; R4.1 design, claims, metadata, CTAs and evidence unchanged | APPROVED DECISION (D-03, D-10) |
| `/social-media-ads` | Labels to 12 px (format `dt`, `.mr1-js-who`, `.mr1-outs-l`, `.mr1-sig-l`, `.mr22-card-k`); captions `.mr1-cap`, `.mr22-note` to 14 px; FAQ heading one colour. Scoped to `.mr22` | APPROVED DECISION |
| `/pricing` | Eight label styles .72 to .75rem; `.prr-cap` to 14 px; buttons 48 to 52 px tall (A12); "More questions and answers" a 44 px target (was 22 px at 390). Prices, plans, copy, colours and headings unchanged | APPROVED DECISION |
| Header (desktop) | "Also: SEO" secondary link under Google Ads and Meta Ads in the Services panel, before "All services"; arrow keys reach it | OWNER REQUIREMENT |
| Header (mobile) | "Also: SEO" after the Paid advertising links in the Services section | OWNER REQUIREMENT |
| Footer | "SEO" is the last link in the Services column | OWNER REQUIREMENT |
| Active state | `/seo` is in `SERVICE_ROUTES`: Services is marked current and the SEO link carries `aria-current="page"` | OWNER REQUIREMENT |

Files: `components/direction-c/{nav.ts,SiteHeader.tsx}`, `app/direction-c.css`, `app/(pages)/services/page.tsx`, `components/paid-advertising/services/{PaidAdvertisingServices.tsx,content.ts,services.css,showcase.ts}`, `components/google-ads-r41/{GoogleAdsR41.tsx,google-ads-r41.css}`, `components/meta-ads-r22/{MetaAdsR22.tsx,meta-ads-r22.css}`, `components/pricing-r2/pricing-r2.css`, tests, DEC-120.

## Not changed, and why

| Item | Reason |
|---|---|
| Titles, descriptions, canonicals, robots, OG/Twitter, JSON-LD, H1 text, sitemap, robots.txt, redirects | Preserved; verified identical (below). The em dash in the `/google-ads` meta description and Service JSON-LD is existing metadata and was left (metadata preservation outranks the dash rule here) |
| Pricing summary cards as H2 | The audit proposed H3, but they sit directly under the H1; H3 would skip a level (A12). Left for the owner |
| Pricing primary button colour (Tangerine with Ink text), emphasis colour `#A83400` (OD-03), "you choose a plan" emphasis | Brand colour and copy decisions, outside "typography and accessibility only" |
| Platform mock-up text under 12 px (search result, Meta post, landing page, hero feed) | A3: mock-ups are treated as images; their captions now meet 14 px |
| Showcase card link 35 px tall at 390 | The whole card is the link (`.cs-cta::after` covers the card), so the target is the card |
| Inline sentence links ("SEO", "AI search", ... in the path rows) 29 px | Inline links in a sentence (WCAG 2.5.8 exception); unchanged |
| Om Sai Developer card on `/services` | Replaced by the preferred Wanderlooms case; Om Sai stays on `/social-media-ads`, `/who-we-help/real-estate` and `/work` |
| Wanderlooms card text repeats its period ("April 2026 to September 2026" in the definition, then "Apr 2026 to Sep 2026") | The library's own approved definition and period, as `/work` shows them; not edited (no case-study changes) |

## Verification (production builds, `next start`)

Baseline = `main` `ba338b4` built in a separate detached worktree; B2 = this branch. Both `npm run build` succeeded. `/services` is now ISR with 1 minute revalidation, like `/google-ads`, because it reads the case library.

| Check | Result |
|---|---|
| `npm test` | 633 tests: 632 pass, 0 fail, 1 skipped (pre-existing). New: `tests/b2-core-services.test.cjs` (8); updated: `paid-advertising-services`, `frozen-designs-integration` (footer) |
| `npm run typecheck` | Clean |
| ESLint on every touched file | 0 problems |
| `npm run verify:build` | OK, 59 prerendered pages (`verify:build:production` needs `NEXT_PUBLIC_GTM_ID`, not available locally) |
| SEO regression, 18 routes plus robots.txt, sitemap and 6 redirects (`seo-snap.sh` output compared) | No difference in status, title, description, canonical, robots, OG/Twitter, JSON-LD hash or H1 text; robots.txt, sitemap and redirects identical |
| Case eligibility | Both showcase cases are in the public `/work` library, return 200, `index, follow`, self-canonical. Home Decor stays unlisted. No fill, so nothing else can appear; zero cases hides the section (tested) |
| Conversion paths | Every `/contact` and `/contact?intent=call` link on the four pages identical before and after; only new links are `/seo` (nav, footer, Services block); no tracking attributes or consent code changed |
| Type floors (`audit.mjs`, 4 pages x 1440, 1280, 390, 360) | Non-mock labels under 12 px: services 11 to 7 (all 7 left are mock-up), google-ads 13 to 9 (mock), social 20 to 15 (mock), pricing 8 to **0**. Explanatory captions under 14 px: **0** on all pages |
| Split-colour headings | services 6 to 4, google-ads 9 to 8, social 9 to 8 (FAQ headings and services showcase heading now one colour) |
| Horizontal overflow | 0 at every page and width |
| Keyboard (`a11y.mjs`, real Tab presses, 4 pages at 1440 and 390) | 810 stops, every stop has a focus ring and, scrolled into view, is not covered. Services panel by ArrowDown: Google Ads, Meta Ads, Also: SEO, All services, View Plans & Pricing; Escape closes it and returns focus to the button |
| Reduced motion (`prefers-reduced-motion: reduce`, 390) | 0 pending reveals, 0 running animations, 0 invisible text on all four pages |
| Visual review | Before and after captures of each page's changed sections and the navigation at 1440, 1280, 390 and 360 (80 each; 18 representative pairs committed in `before/` and `after/`) |

Not run: Safari, Firefox, real devices, screen readers, Lighthouse/Core Web Vitals, live GTM tag firing.

## Evidence and tools

`before/` and `after/`: `<width>-<page>-<part>.jpg` (the committed subset; the full 4-width set is regenerated with `node capture.mjs <baseUrl> <outDir> 1440,1280,390,360`). `audit.mjs` + `audit-page.js` measure type floors, targets, emphasis, dashes and overflow; `a11y.mjs` runs the keyboard and reduced-motion checks; `cdp.mjs` is the shared headless Chrome driver. The capture removes the consent banner and releases pending entrance reveals so each section is shown in its final state.

## For owner visual approval

1. `/services` H1: emphasis on "the right customers" instead of the product names.
2. The SEO & Organic Visibility block: placement after "Which one first?" and its wording.
3. "Also: SEO" in the desktop panel and mobile menu; SEO at the end of the footer Services column.
4. `/services` showcase showing figures from the two case studies (5.24x for AnybodyCanBake, 6,607 orders for Wanderlooms), as `/work` shows them.
5. Open for a later decision: pricing summary-card heading level, pricing button colour, OD-03 emphasis colour.

## R2: owner visual corrections to `/services` (2 November 2026)

The owner reviewed the B2 `/services` preview and asked for six corrections. Only `/services` changed; the other pages, the navigation, the metadata and the case showcase are untouched. Where this section differs from the tables above, this section is current. The SEO block now follows the two core service cards directly, because "Which one first?" became its own section.

| # | Correction | What changed |
|---|---|---|
| 1 | Hero graphic | Redesigned as two journeys converging on an enquiry. "They search" with Google Ads and "They browse" with Meta Ads are equal lanes on one row; their labels share a top edge at every width (measured at 1440 and 360). Two curves merge into one path: Capture, Convert, then "A qualified enquiry". Measure is the dashed frame around the whole path. The "approach, not measured results" caption stays. Motion is CSS only and plays once on load (lanes, then the merge, then the stations, about 1.5 s); it is off under reduced motion, and all content is present without it. Headline, colours and CTAs are unchanged. |
| 2 | Core service cards | The two cards are now equal, top-aligned and the same height, with the Meta card no longer offset 64 px. Mock-ups are smaller (300 px, Meta image 2.1:1), the padding is tighter and the CTA sits at the foot of each card. Measured core section height: 1,217 px at 1440, down from 1,824 px, or 1,583 px without the former "Which one first?" block that moved out. At 360 it is 2,247 px, down from 3,149 px. A chip in each card was rendering taller because of a site-wide list margin; fixed. |
| 3 | Which one first? | Now its own section on the ground colour, between the core services and the case showcase. It is a two-way choice: Google Ads "Captures existing search demand." or Meta Ads "Reaches and influences relevant audiences.", each linked to its service page. Below it, "Not every business needs both." with the audience links as 44 px pills. The wording reuses the page's approved positioning; no new capability is added. |
| 4 | Illustration captions | The two "Illustration of how an ad can appear. Not a client ad." captions are removed. The mock-ups stay `aria-hidden` with placeholder text ("Your headline appears here", "Your Brand"). The hero diagram's "not measured results" note and every case-study figure, period and qualification are kept. |
| 5 | Defensive paragraph | "Advertising tends to work when..." is removed along with its styles. The section now runs from the cost cards straight to the steps strip with the standard gap. |
| 6 | Five-step strip | All five steps share one baseline at 1440 and 1280. The cause was the site-wide list rule, which gives every item except the last a 12 px margin, so "Review" sat lower. The "See How We Work" link is unchanged. |

**Verification (production build, `next start`).**

| Check | Result |
|---|---|
| `npm test` | 635 tests: 634 pass, 1 skipped (pre-existing) |
| `npm run typecheck` | Clean |
| Lint | 0 errors (14 warnings, all pre-existing) |
| `npm run build`, `verify:build` | OK, 59 pages |
| SEO snapshot against `main` | No difference (18 routes, robots.txt, sitemap, redirects) |
| Overflow and clipping | 0 overflow at 1440, 1280, 390 and 360; no clipped text in `main` |
| Labels and captions | Labels at least 12 px and captions at least 14 px, except platform mock-up text |
| Keyboard | `/services` 118 stops at 1440 and 110 at 390, every one with a visible ring that nothing covers |
| Reduced motion | Nothing pending or animating |
| Normal motion | The hero animation finishes within 3 s and leaves nothing hidden |
| Links and conversion | The only link change is one more link each to `/google-ads` and `/social-media-ads`, from the decision cards. Conversion destinations, case-study eligibility and tracking are unchanged |

Evidence: `r2-services/before` and `r2-services/after` (hero, core, which, terms and steps at 1440 and 360, plus the hero at 390). The full set of 28 before and 28 after captures at four widths is regenerated with `node capture.mjs <baseUrl> <outDir> 1440,1280,390,360 services`.
