# /google-ads, THE RESOLVE R3 review variant

Status: LOCAL REVIEW ONLY. Nothing committed, merged or deployed. Live `/google-ads` and its metadata are unchanged.
Preview: `http://localhost:3412/google-ads-preview-r3` (development only; 404 in production, `noindex`, not in the sitemap).
Base: worktree `MappedSkills-home-r2`, HEAD and `origin/main` both `3e0e921a76935a475ff148b2c57397c525fccd63` (verified 27 Oct 2026).
Screenshots: `docs/google-ads-r3/screenshots/google-ads-r3-1440-full.png`, `...-390-full.png` (also 320, 360, 768, 1024).
Full copy: `components/google-ads-r3/content.ts` (single source; the page renders only from it).

## 1. Section outline
| # | Section | Ground | Visual |
|---|---|---|---|
| 1 | Hero: "Reach customers when they’re looking for what you sell." CTA Discuss Your Google Ads (/contact), text link Request a call (/contact?intent=call) | Ink Deep | Illustrative Google results page with sponsored ad and an "enquiry" cue |
| 2 | Where Google Ads makes sense: product/D2C, education/coaching, enquiry-led incl. real estate | Ground | Three R3 images, one lead and two offset |
| 3 | What MappedSkills manages (six items) and who owns what | Paper | Numbered list plus a "we manage / you own" split |
| 4 | Five campaign types, each with what / useful when / supports / example, then a comparison table | Ink Deep | A different illustration per type (results page, product listings, hub diagram, website banner, video player) |
| 5 | Measurement and improvement, with limits stated plainly | Ground | Four-step path whose last step is dashed ("may not be traceable") |
| 6 | Relevant work: AnyBodyCanBake | Paper | Text and process, no image (none verified), no result |
| 7 | Process: Understand, Plan, Launch, Test, Review; fee and ad spend separate | Ground | R3 step row |
| 8 | Six FAQs | Ink Deep | R3 accordion |
| 9 | Close: "Tell us what you want Google Ads to achieve." | Tangerine Deep | CTA |

## 2. SEO, AEO, GEO proposal (WORKING HYPOTHESIS until Search Console review)
- Title (58 chars): `Google Ads Management for Indian Businesses | MappedSkills`
- Description (about 156 chars): `Google Ads management for Indian businesses: Search, Shopping, Performance Max, Display and YouTube, planned around your offer and reviewed on real outcomes.`
- Live title today: "Google Ads Measured on the Enquiries, Not the Clicks | MappedSkills". It is intentionally not changed here; the live metadata awaits Search Console review (see page comment). Changing it is a decision for the owner.
- Hierarchy: H1 (hero) > H2 per section (9, FAQ and close included) > H3 for items and campaign types. One H1.
- Primary intent: Google Ads management / agency for Indian businesses (commercial). Secondary: Google Shopping ads management, Performance Max management, YouTube ads management, Google Ads for coaching and education, taking over an existing Google Ads account. **Search volumes and difficulty: RESEARCH REQUIRED. None are claimed.**
- Internal links on the page: /contact, /contact?intent=call, /who-we-help/d2c, /education, /real-estate, /social-media-ads, /portfolio/google-ads-for-online-courses, /work, /how-it-works, /pricing. Recommend adding links from /services and the three audience pages to `/google-ads#campaign-types`.
- Breadcrumb recommendation: Home > Services > Google Ads. Live JSON-LD trail uses the label "Paid search"; unchanged, for owner decision.
- Structured data (previewed in `GoogleAdsR3JsonLd.tsx`): FAQPage (six visible questions) and the existing Google Ads Service node (same @id) with the five campaign types as an OfferCatalog. No prices, ratings, reviews or client results.
- AEO: each campaign type answers "what is it, when is it useful, what does it support" in two or three plain sentences, and the FAQs answer in the first sentence.
- `/google-ads-service/`: **already a permanent redirect to `/google-ads`** (next.config.mjs line 218). No duplicate page exists, so there is no duplication risk and no migration action. Nothing was changed.

## 3. Content and proof verification
| Claim | Class | Basis |
|---|---|---|
| All five campaign types are managed services | OWNER REQUIREMENT | Task brief, 27 Oct 2026 |
| AnyBodyCanBake facts (Pune, eggless and healthy baking, small budget, four work items, three "put in place" items) | VERIFIED FACT | Live case page `/portfolio/google-ads-for-online-courses`, HTTP 200, read 27 Oct 2026. It states "No result is claimed", so none is used |
| Ad spend paid to Google, fee separate, landing page/form/tracking work scoped separately, monthly report and review calls as agreed, "nothing starts until you approve" | APPROVED DECISION | DEC-053 and DEC-079 wording, carried from the live page |
| Platform descriptions of the five types (Performance Max spans Search, Shopping, Display, YouTube and Maps; Shopping needs a product feed; Display is not intent-based) | VERIFIED FACT (general Google Ads behaviour, not MappedSkills performance) | Standard product behaviour; recommend a final owner read |
| Illustrations (results page, listings, hub, banner, player, "New enquiry" cue) | Illustrative | Generic "Your Business", labelled on the page; no screenshots, metrics, prices or dashboards |
| Images | Reused | Three existing site images copied from the approved R3 homepage and the existing property tile |

No figures, testimonials, awards, budgets, prices, timelines, minimums or guarantees appear (checked by `tests/google-ads-r3-preview.test.cjs`).

## 4. Outstanding decisions and assumptions
1. **Conflict to resolve:** the Strategic Thesis v2 and Master Wireframe v2 describe YouTube as "adjacent, not yet operationally proven", and DEC-053 bars campaign-type claims. This page follows the owner's 27 Oct statement that all five are established. If approved, record it in `DECISION_LOG.md` (it supersedes those parts for `/google-ads`).
2. **Video production for YouTube:** the copy says "you have video, or we agree how it will be made". Confirm whether MappedSkills produces video creative.
3. **No proof exists for Shopping, Performance Max, Display or YouTube** (only the Search-type baking case). The page makes no result claim for them.
4. **Pune** appears only as the case-study tag, as on the live case page. No other locations are added.
5. **Header CTA** still reads "Discuss Your Advertising" (shared site header, out of scope); the page CTA reads Discuss Your Google Ads.
6. The review-call wording follows the live Google Ads page. `/lead-generation` deliberately does not promise one; confirm which applies.
7. Whether to publish the new title or keep the live one (see section 2).
8. Reuses `components/resolve-home-r3/resolve-home-r3.css` and `RvReveal3`. If the R3 homepage experiment folder is removed or promoted, this variant must move with it.
9. Not performed: screen-reader testing, real-device testing, Safari/Firefox visual pass, Lighthouse. Keyboard access relies on native links, buttons and `<details>`.

## 5. Checks run (27 Oct 2026)
- Widths 320, 360, 390, 768, 1024, 1440: no horizontal overflow (documentElement scrollWidth equals width), no console errors or page errors.
- `npx tsc --noEmit`: clean. `eslint` on the new files: clean. New test file: 8 of 8 pass (not the full suite).
- Production build in an isolated copy: `/google-ads-preview-r3` returns **404**, `/google-ads` 200, sitemap has no preview URL.
- Reduced motion: handled by the shared reveal script (leaves content untouched); no looping animation was added. Not separately screenshotted.
- Small text: only the generic ad mock-ups use 11 to 13px type, as the platform UIs do; body copy is 15px or larger.

## 6. Files changed and reversal
New, all untracked, nothing existing modified:
- `app/google-ads-preview-r3/page.tsx`
- `components/google-ads-r3/` (`content.ts`, `GoogleAdsR3.tsx`, `ArtGa3.tsx`, `GoogleAdsR3JsonLd.tsx`, `google-ads-r3.css`)
- `public/images/google-ads-r3/` (three images)
- `tests/google-ads-r3-preview.test.cjs`
- `docs/google-ads-r3/` (this file, screenshots)

Reversal: `rm -rf app/google-ads-preview-r3 components/google-ads-r3 public/images/google-ads-r3 tests/google-ads-r3-preview.test.cjs docs/google-ads-r3`. No config, layout, nav or live page was touched, so nothing else needs undoing.
