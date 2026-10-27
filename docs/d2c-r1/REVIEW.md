# D2C & Ecommerce R1: owner review

27 October 2026. Local only, branch `design/homepage-visual-r2` (HEAD 3e0e921). Nothing committed, pushed, merged or deployed.
Preview: http://localhost:3412/d2c-preview-r1 (noindex, 404 in production).

Labels: **VERIFIED** (checked in repo or by test), **REQUIREMENT** (owner brief), **RECOMMENDATION**, **OPEN** (needs owner).

## 1. Complete page copy
The single source is `components/d2c-r1/content.ts`. Summary of each section (full wording is in that file):

| # | Section | Headline | Primary message |
|---|---|---|---|
| 1 | Hero | More orders matter. **So does what they cost.** | Google and Meta Ads judged by purchases, cost to win a customer and business economics. CTA "Discuss Your Advertising", secondary "See our work" (/work) |
| 2 | Challenge | Sales can grow while **profitability gets squeezed.** | One order as a receipt: margin, discounts, shipping, returns and acquisition cost against "What is left". Illustrative, not to scale |
| 3 | Shoppers | Different shoppers. **Different buying decisions.** | Three alternative paths (Meta discovery, Google search, comparing). Last step of each is dashed: no path is certain |
| 4 | How we help | Advertising that follows **how your products sell.** | Search, Shopping, Performance Max, Meta discovery, purchase and retargeting, each with "Fits when". Display and YouTube one line. Links to /google-ads and /social-media-ads. We manage / you provide / scoped separately |
| 5 | Readiness | Before you spend more, **check what is ready.** | Six checks, a conversation not an audit, no thresholds |
| 6 | Measurement | A purchase tells you **more than a click.** | Platform report vs store orders, six measures, "ROAS is not profit", Reporting Policy A |
| 7 | Client work | Work with a **D2C brand.** | Wanderlooms, unlinked, conceptual-artwork disclosure kept |
| 8 | FAQs and close | A few questions **before we talk** | Seven questions requested in the brief; close "Tell us about your products and your store." |

## 2. Verification notes
**VERIFIED**
- `/who-we-help/d2c` already exists in the repo at HEAD (DEC-081 Content R2, merged in PR #59). Its live status is UNKNOWN (DEC-084: deployment not authorised). It is untouched.
- Google Ads supports Search, Shopping, Performance Max, Display, YouTube (`components/google-ads-r4/content.ts`, DEC-078 "all Google Ads campaign types"). Shopping "needs an accurate product feed" is existing approved wording.
- Creative policy matches Meta Ads R1 content: MappedSkills writes copy and adapts creative, the client supplies original photographs and videos.
- Wanderlooms: only "Meta advertising for an adventure apparel brand", "Featured on Shark Tank India", no individual case page (DEC-080, DEC-081). Image and logo are the approved homepage files (`public/images/resolve-r3/`), disclosure text identical. No ROAS shown. Brand DNA v3 lists an internal ROAS figure for Wanderlooms but its use requires proof and permission: not used.
- Header CTA wording "Discuss Your Advertising" is unchanged. No `/who-we-help` hub exists, so breadcrumb has no middle level.
- No figures, ROAS, prices, minimum budgets or guarantees in the copy. Dash check on `content.ts`: no em dashes, en dashes or spaced hyphens.

**Missing or partial sources (not invented):** I read the Strategic Thesis v2, Master Wireframe v2 and Brand DNA v3 from `~/Downloads/MS Performance Marketing/`, not from the repository. The "approved Wanderlooms Meta Ads engagement" evidence in the repo is only the DEC-080/081 wording above.

## 3. Conflicts and open decisions
- **OPEN, H1 conflict:** DEC-081 approved Content R2 with H1 "More orders are good. Profitable growth is better." This R1 uses your newer working H1 "More orders matter. So does what they cost." If approved, a new decision must supersede DEC-081 for this page.
- **OPEN, marketplace:** DEC-081 excludes marketplace content. The Thesis and Wireframe describe Amazon and Flipkart as exploring or developing. The FAQ says "Not at present". Confirm that wording.
- **OPEN, Shopping feed:** the page says the client "keeps an accurate product feed". Feed setup and catalogue management are not claimed. Confirm that boundary.
- **OPEN, Performance Max and retargeting:** worded "where tracking and audience size allow". Confirm both are in current delivery.
- **OPEN, secondary CTA:** "See our work" goes to `/work` (exists). No Wanderlooms case URL exists.
- **OPEN, URL:** keep `/who-we-help/d2c` (already built, in sitemap and homepage card).
- DEC-080 says static creative allowances are proposal-defined and video is scoped separately. The page uses the simpler 27 October policy; the FAQ answer does not contradict it.

## 4. SEO and URL recommendations (RECOMMENDATION, nothing applied)
- **URL:** keep `/who-we-help/d2c`; self-canonical. No redirects. `/google-ads-for-ecommerce` stays reserved and excluded.
- **Title (59 chars):** Google Ads and Meta Ads for D2C and Ecommerce Brands | MappedSkills. Current R2 title: "Paid Advertising for D2C Brands in India | MappedSkills".
- **Meta description:** Google Ads and Meta Ads management for D2C and ecommerce brands in India, judged by purchases and customer acquisition cost, not clicks alone.
- **Headings:** one H1; H2 per section (8); H3 for items. No skipped levels.
- **Intent:** primary, commercial investigation by D2C owners ("Google Ads and Meta Ads for D2C brands"). Secondary, "Google Ads vs Meta Ads for ecommerce", "ecommerce advertising costs". All keyword views are WORKING HYPOTHESES: no volumes were researched.
- **Internal links:** out to /google-ads, /social-media-ads, /work; in from the homepage D2C card, /services, nav "D2C brands". Recommend adding /pricing from the measurement section only if the owner wants cost discussion (R2 had it).
- **Breadcrumb:** Home, D2C brands (as today). **Schema:** BreadcrumbList and FAQPage matching visible FAQs; no Service, Review or price nodes. The preview emits FAQPage only.
- **Migration:** if R1 replaces R2, change content in place at the same URL; update the R2 content test (`tests/paid-advertising-d2c.test.cjs`) and DEC-081.

## 5. QA results (run, 27 October)
| Check | Result |
|---|---|
| Widths 320, 360, 390, 768, 1024, 1440 | No horizontal overflow, no off-screen elements, scrollY 0 after load, no console errors |
| No scroll on hydration | scrollY = 0 at every width; no scrollIntoView in the component |
| Reduced motion | Hero animation off, final state shown (opacity 1) |
| No JavaScript | Content visible, 0 pending reveals, 7 FAQs present, hero art shown |
| `tsc --noEmit` | Clean |
| ESLint on new files | Clean |
| `node --test tests/*.test.cjs` | 478 pass, 0 fail, 1 skipped |
| Production isolation | `next build`: route prerenders to a 404 "Page Not Found" with no D2C content |
| Not run | Manual screen reader, real-device and Safari/Firefox checks; link click-through beyond route existence |

Note: full-page screenshots hide the cookie banner and release scroll-reveal blocks, otherwise lazy sections appear blank in a capture.

## 6. Screenshots
`docs/d2c-r1/screenshots/`: `d2c-r1-1440-full.png`, `d2c-r1-390-full.png`, `hero-frame-1..4.png` (animation at about 0.9s, 2.1s, 3.3s, 4.5s).

## 7. Files and reversal
New only: `components/d2c-r1/` (D2CR1.tsx, content.ts, d2c-r1.css), `app/d2c-preview-r1/page.tsx`, `docs/d2c-r1/`. No existing file edited. (The worktree already carried unrelated uncommitted edits from earlier work; untouched.) Outside the repo, an ignored `.claude/launch.json` entry `d2c-r1-3412` was added in the main checkout.

Reverse: `rm -rf components/d2c-r1 app/d2c-preview-r1 docs/d2c-r1`.
