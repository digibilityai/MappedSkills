# /google-ads, THE RESOLVE R3 design, refinement R4

Status: LOCAL REVIEW ONLY. Nothing committed, pushed, merged or deployed. Live `/google-ads`, its metadata, the homepage and R3 are unchanged.
Preview: `http://localhost:3412/google-ads-preview-r4` (R3 stays at `/google-ads-preview-r3`). Development only: 404 in production, `noindex`, not in the sitemap.
Base: worktree `MappedSkills-home-r2`, HEAD `3e0e921a76935a475ff148b2c57397c525fccd63` (verified, unchanged).
Owner feedback source: the 14-page annotated PDF (`~/Downloads/Untitled document.pdf`), all 14 pages read. Written comments were on pages 1, 2, 8 and 9; the other pages are screenshots, handled per the refinement direction.
Screenshots and frames: `docs/google-ads-r3/r4/`.

## 1. What changed from R3
| PDF page | Owner feedback | R4 response |
|---|---|---|
| 1 | "Too much text. The right side could be animated: keyword typed, search result, lead" | Hero text cut to one paragraph. Right side is a CSS animation: typing, results, sponsored ad chosen, landing page, enquiry sent (about 8 s, plays once) |
| 2, 3 | Section duplicates the homepage audience cards | Replaced by "Different searches. Different buying decisions.": three lanes (they search, your ad can, then they may) |
| 4 | (screenshot) six-step list | Five outcomes; "we manage / you own" split kept |
| 5 to 7 | (screenshots) five long panels | One interactive selector with five tabs; panel height fixed, so no layout shift |
| 8 | "Overall user journey seems lacking" | New connected journey: need, advertising, website, enquiry or purchase, measurement; ownership labelled; campaign types described as tools, not steps |
| 9 | "Too much text, can this be represented better?" | Comparison table removed; "Suits you when / Best for" lives inside each selector panel |
| 10 | (screenshot) measurement | Simplified: five outcomes and one short "Tracking has limits" box; the path graphic moved into the journey |
| 11, 12 | (screenshots) case study, process | Case study unchanged (identical to the verified R3 copy, enforced by a test). Process unchanged except: the Review step mentions review calls, and the intro says what happens after you contact us |
| 13, 14 | (screenshots) FAQs, CTA, footer | Unchanged. "Talk to us" link removed from the FAQ intro so the page keeps one primary path (Discuss Your Google Ads). Shared header CTA unchanged: "Discuss Your Advertising" |

Length: 1440px page 11036px (R3) to 8322px (R4); 390px page 16504px to 11794px.

## 2. Complete R4 copy
The single source is `components/google-ads-r4/content.ts` (unchanged parts re-exported from `components/google-ads-r3/content.ts`: META, FAQS, WORK, CLOSE). Summary by section:

1. **Hero.** Eyebrow: Google Ads management. H1: "Reach customers when they’re looking for what you sell." Paragraph: "When someone searches for what you sell, they already have a need. We plan and manage Google Ads so your business appears at that moment, with a clear next step waiting for them." CTA: Discuss Your Google Ads (/contact); text link: Request a call (/contact?intent=call). Caption: "Illustrative journey with a generic business. Not every search becomes an enquiry."
2. **Different searches. Different buying decisions.** Lede: "Google Ads reaches people who are already looking. What they are looking for decides the ad, and what happens next." Lanes: a shopper comparing products ("cotton sweatshirt for men"; show your products with photos, so you are in the comparison; open a product and buy online); a learner researching a course ("online coding course for beginners"; answer what they asked and offer a demo class or a call; book a demo or send an enquiry); a buyer looking close by ("2 BHK flats near me"; match the need and lead to a page that makes enquiring easy; call, ask a question or book a site visit). Note: "Not every search leads to an enquiry. The aim is to meet the demand that already exists, with the right message."
3. **Five ways to appear on Google. Pick what fits.** Lede: "We manage all five. Most businesses need one or two, and we recommend them after understanding your offer." Tabs, each with benefit, Suits you when, How it works, Best for:
   - Search: Show up when people search for what you offer. / Your customers already search for what you sell. / You choose the searches that matter; your text ad appears with the results and a click takes people to your page. / Enquiries, calls, sign-ups and purchases.
   - Shopping: Put your products in front of people who are ready to compare. / An online store with a product catalogue and a website that takes orders. / Products appear with photo, price and store name; needs an accurate product feed. / Online purchases, for eligible product businesses.
   - Performance Max: Reach people across Google from one goal-based campaign. / A clear goal, reliable tracking, good images and text. / You set the goal; Google decides where to show ads across Search, Shopping, Display, YouTube and more; you give up some control over placement. / Wider reach towards a goal such as sales or enquiries.
   - Display: Stay visible while people browse the web. / You want to remind past visitors or reach a defined audience. / Image ads on participating websites and apps; people are not searching, so it does a different job from Search. / Awareness, and bringing people back.
   - YouTube: Show what is hard to describe, to people already watching video. / You have video that shows your product, programme or project well. / Your video ad plays on YouTube. You supply the video creative. We plan the campaign, audience and budget around it. / Awareness and consideration, and sometimes enquiries or sales.
   Footer line: "If your customers are not searching yet, Meta Ads may fit better." (/social-media-ads)
4. **We run the advertising. You keep the business.** Five outcomes: reach relevant searches; select suitable campaigns; manage spend responsibly; improve messaging and performance; review meaningful results. Split: MappedSkills manages advertising planning, setup, budget oversight, messaging, testing and review; your business owns your website, offer and pricing, how enquiries are followed up, and delivery. "Landing-page, website, form or tracking changes can be scoped and agreed separately, before they start."
5. **How advertising connects to an enquiry or a sale.** Stages: a customer need (your customer); relevant Google advertising (MappedSkills manages); your website or landing page (your business owns); an enquiry or a purchase (your business owns, "your follow up matters here"); measurement and improvement (MappedSkills manages). "The campaign types are different tools, not steps. Search and Shopping meet people who are looking. Display and YouTube reach people as they browse or watch. Performance Max works across Google."
6. **Judge Google Ads on what it brings your business.** Qualified enquiries; purchases; course enrolments; cost per meaningful action; revenue or ROAS, where the data is reliable. "Tracking has limits. Not every sale can be traced to an ad. A call, a visit or a later search may close it elsewhere. Where we cannot tell, we say so." "We cannot promise leads, purchases, sales or a return on ad spend." "Your engagement includes a monthly performance report and performance review calls on a regular, fixed schedule."
7. **Google Ads for an online baking school (AnyBodyCanBake).** Unchanged from the verified case study; links to `/portfolio/google-ads-for-online-courses` and `/work`.
8. **What happens after you contact us.** Intro: "We start by understanding your business and what you want advertising to achieve. You see our findings, a recommended plan and a proposal before any work starts. Nothing begins until you approve it." Steps: Understand, Plan, Launch, Test, Review ("We go through results with you on review calls and decide what to change next."). Ad spend is paid directly to Google; the management fee is separate. Links: pricing approach, how we work.
9. **Six FAQs** (unchanged from R3) and the closing band "Tell us what you want Google Ads to achieve." with Discuss Your Google Ads.

## 3. Owner decisions recorded (27 Oct 2026, OWNER REQUIREMENT)
1. Search, Shopping, Performance Max, Display and YouTube are established managed services.
2. Clients supply YouTube video creative. The page says so and makes no claim that MappedSkills produces video.
3. Performance review calls are included on a standard fixed cadence. No frequency is stated anywhere (enforced by a test).
4. The shared header CTA stays "Discuss Your Advertising".

### Conflicts with older decisions in `DECISION_LOG.md` (flagged, not rewritten)
- **DEC-053 / Strategic Thesis v2 / Wireframe v2:** treat YouTube as adjacent and bar campaign-type claims. Superseded for `/google-ads` by decision 1 above. Proposed: a new DEC entry recording decisions 1 to 3 after approval.
- **DEC-053 OD-03 (monthly report and monthly review call) and Reporting Policy A (about line 2272 of the log):** Policy A says "review calls as agreed in your proposal". Decision 3 (calls included, fixed cadence) is firmer than "as agreed", while "monthly" for the report is kept. Proposed: the new entry should state which wording governs, and whether "review calls as agreed in your proposal" on other pages (home, FAQ, services) should be aligned.
- **DEC-051 item 5 / `/lead-generation`:** says a review call is not confirmed there. Decision 3 may apply to all services; owner to confirm before any other page changes.

## 4. Content and proof compliance
| Item | Class | Notes |
|---|---|---|
| Five campaign types | OWNER REQUIREMENT | No client proof exists for Shopping, Performance Max, Display or YouTube; no result is claimed for them |
| Platform behaviour descriptions (PMax channels, Shopping needs a feed, Display is not search-based) | VERIFIED FACT (general Google Ads behaviour) | Recommend a final owner read |
| AnyBodyCanBake | VERIFIED FACT | Live case page, HTTP 200; claims no result; copy identical to R3 |
| Fee and ad spend separate; landing-page, form and tracking work scoped separately; nothing starts until approved | APPROVED DECISION (DEC-053, DEC-079) | Carried from the live page |
| Search queries in the animation and lanes (photography, sweatshirt, coding course, 2 BHK) | Illustrative | Generic "Your Business"; labelled as illustrative; no numbers, prices or screenshots |
| Reporting line | OWNER REQUIREMENT plus Policy A | See conflicts above |
No double or long dashes in application copy; no guarantees, figures, budgets, timelines or pricing (test-enforced).

## 5. SEO recommendations and unresolved decisions
- Metadata unchanged from the R3 proposal (title 58 characters, description about 156): `Google Ads Management for Indian Businesses | MappedSkills`. Live title is untouched; choosing to replace it is an owner decision, ideally after Search Console review.
- One H1; H2 per section; H3 for items and tabs. Natural terms: Google Ads management, Search, Shopping, Performance Max, Display, YouTube. Search volumes remain RESEARCH REQUIRED, none claimed.
- Selector content is in the server-rendered HTML (all five panels are in the DOM), so it is crawlable; with scripts disabled all five show in turn.
- Structured data preview (unchanged from R3): FAQPage plus the existing Google Ads Service node with a campaign-type OfferCatalog.
- `/google-ads-service` is already a permanent redirect to `/google-ads`; nothing changed. Breadcrumb recommendation: Home > Services > Google Ads (live trail label "Paid search" unchanged).
- Internal links: /contact, /contact?intent=call, /social-media-ads, /portfolio/google-ads-for-online-courses, /work, /pricing, /how-it-works. Recommend linking `/google-ads#campaign-types` from /services.
Open decisions: (a) wording and scope of the review-call commitment across pages; (b) whether to record the five-service decision in the log now; (c) whether to publish the new title; (d) whether the hero Request a call link should stay as a secondary path; (e) tablet and phone: the tab row scrolls horizontally, so Display and YouTube sit off-screen on 320 to 390px until scrolled (the active tab always scrolls into view).

## 6. Verification (27 Oct 2026)
- Widths 320, 360, 390, 768, 1024, 1440: no horizontal overflow, one H1, no console or page errors.
- Selector: five states captured; section height identical across tabs (no shift); keyboard: Left and Right (wraps), Home, End work, roving tabindex, white 3px focus outline; active mobile tab stays visible.
- No script: all five panels render stacked and the tab row is hidden; the hero animation is CSS only, so it still plays and settles. Reduced motion: no animation, finished frame, cursor hidden; journey shown complete.
- CTAs: `/contact`, `/contact?intent=call`; header CTA "Discuss Your Advertising" unchanged; case study link works on the live site (200).
- `tsc --noEmit` and `eslint` on the new files: clean. New R4 test file plus R3 tests: 17 of 17 pass. The full suite was not run.
- Isolated production build: `/google-ads-preview-r4` and `/google-ads-preview-r3` return 404; `/google-ads` 200; sitemap has no preview URL.
- Not done: screen-reader testing, real-device and Safari or Firefox visual pass, Lighthouse, a video recording (representative frames are provided instead).

## 7. Files changed and reversal
New, all untracked; no existing file modified:
- `app/google-ads-preview-r4/page.tsx`
- `components/google-ads-r4/` (`content.ts`, `GoogleAdsR4.tsx`, `HeroSearchAnim.tsx`, `CampaignSelector.tsx`, `JourneyTrack.tsx`, `google-ads-r4.css`)
- `tests/google-ads-r4-preview.test.cjs`
- `docs/google-ads-r3/REVIEW_R4.md` and `docs/google-ads-r3/r4/` (screenshots, frames, comparison)
R4 imports from R3 (`ArtGa3.tsx`, `google-ads-r3.css`, `content.ts`, the JSON-LD component) and from the R3 homepage (`resolve-home-r3.css`, `RvReveal3`); do not delete those while R4 exists.

Reversal (R4 only, R3 unaffected): `rm -rf app/google-ads-preview-r4 components/google-ads-r4 tests/google-ads-r4-preview.test.cjs docs/google-ads-r3/r4 docs/google-ads-r3/REVIEW_R4.md`. Nothing else was touched.
