# Real Estate: content, evidence and journey audit

27 October 2026. Audit only. Worktree `MappedSkills-home-r2`, branch `design/homepage-visual-r2`, base `3e0e921`. No preview built, no code edited, nothing committed, pushed, merged or deployed. Production was read with `curl` only.

Evidence labels follow `CLAUDE.md` (VERIFIED FACT, OWNER REQUIREMENT, APPROVED DECISION, WORKING HYPOTHESIS, RESEARCH REQUIRED, UNKNOWN).

## 0. Headline findings
1. **The page is already live.** `https://mappedskills.com/who-we-help/real-estate` returns 200 in production, indexable, self-canonical, in the sitemap, and linked from the homepage and `/services`. The brief assumes a pre-release page. Every change below is therefore an edit to a live URL, not a new route. (VERIFIED FACT, curl 2026-10-27.)
2. **Two source files named in the brief are not on this machine:** `MappedSkills_Real_Estate_Content_SEO_R1_APPROVED.md` and `MappedSkills_Real_Estate_Visual_R1_APPROVED.png`. A filesystem-wide search and Spotlight found nothing. Their content can only be inferred from `content.ts` (which says its FAQ answers are the R1 answers verbatim), DEC-083 and `REAL_ESTATE_R1_NOTES.md`. The owner needs to re-supply both. (UNKNOWN: any R1 wording not carried into `content.ts`.)
3. **The new audience decision conflicts with everything live.** The page, metadata, JSON-LD, nav, DEC-083 and homepage card are developer-only. Brokers are absent apart from "Channel partners" in the audience strip.
4. **The Om Sai case is developer-only and numeric.** No broker proof exists anywhere in the repository or on the live site.

## 1. Existing approved work and conflicts
| Item | Status | Finding |
|---|---|---|
| Real Estate Content and SEO R1 (md) | Approved per DEC-083 | File missing; see 0.2 |
| Real Estate Visual R1 (png) | Approved as a concept | File missing; implemented as original SVG, not photography (DEC-083, DEC-084) |
| DEC-083 | Local implementation | Records developer-only audience, route, title, FAQ, proof limits |
| DEC-084 | Bundle PR authorised | Page then released (live); the release record for this bundle is not in `DECISION_LOG.md` (UNKNOWN whether a later DEC records deploy). Verify before editing |
| DEC-078 to 082 | Approved | Reporting Policy A, tracking and creative boundaries, no guarantees, Click-to-WhatsApp |
| Homepage THE RESOLVE R3, Google Ads R4.1, Meta Ads R2.2, D2C R1.1, Education R2B | Local previews, not live | Sibling conventions to match (section 6, 7). None contains Real Estate content |

**Conflicts to resolve (all need owner sign-off):**
- **C1.** Developer-only audience (DEC-083, title, description, breadcrumb "Real Estate Developers", hero eyebrow, homepage card "Real estate developers", nav desc "Residential projects and site visits") is superseded by the both-audiences decision. Record as a new DEC; do not edit DEC-083.
- **C2.** The live page is a 9-section, developer-oriented layout (hero, audience strip, readiness, platforms, journey, proof, measurement, FAQ, close). Readiness is entirely developer-side (inventory, possession, approvals).
- **C3.** R1 refers to "Om Sai Developers"; the live case says "Om Sai Developer". Current page uses the live spelling (correct).
- **C4.** The nav (`WHO_WE_HELP_LINKS`, uncommitted in this worktree) labels the item "Real estate / Residential projects and site visits". Needs broker wording if approved.

## 2. Production and repository status (VERIFIED FACT, 2026-10-27)
| Check | Result |
|---|---|
| Local route | `app/(pages)/who-we-help/real-estate/page.tsx` exists, tracked at `3e0e921` |
| Production route | 200 after `www` to apex 308 |
| Title | "Real Estate Google & Meta Ads Agency in India \| MappedSkills" (matches code) |
| Description | "Google Ads and Meta Ads management for real estate developers in India. Reach relevant property buyers and make better decisions using enquiry and site-visit feedback." |
| Robots / canonical | `index, follow`; self-canonical `https://mappedskills.com/who-we-help/real-estate` |
| H1 | "More property enquiries. More of the right buyers." |
| Sitemap | Listed (also `/who-we-help/d2c`, `/who-we-help/education`); code in `app/sitemap.ts:92` |
| Structured data | BreadcrumbList (Home, Real Estate Developers) and FAQPage with 7 questions; no Service, rating, price or result nodes |
| Internal links in | Homepage "Real estate developers" card; one sentence on `/services`; `lib/analytics.ts` page-type mapping |
| Header nav | "Who We Help" dropdown exists only as an uncommitted change in this worktree; production header links `/#who-we-help` |
| Redirects | None for this route. `/real-estate` and `/who-we-help` return 404 in production |
| Other related URLs | `/portfolio/om-sai-developer-meta-ads` 200 (Social Media Ads, Sep 2024 to Feb 2026). Blog `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` 200 and in sitemap. **`/portfolio/google-ppc-for-real-estate` is a reserved, deliberately 404 route** (unpermissioned historical study; `lib/case-study-eligibility.ts:34-42`). Never link, redirect or reuse it |

**Preserve:** the URL, the canonical, the sitemap entry, the Om Sai case URL, the blog URL and the reserved 404. UNKNOWN: indexation and ranking of the live page (no Search Console data in the repository).

## 3. Developer versus broker
| | Developers and project marketing teams | Agents and brokers |
|---|---|---|
| Starting problem | One project (or few), fixed inventory, a defined buyer brief | Many properties or none yet; need both buyer demand and listing visibility |
| What they advertise | A project: location, configurations, lifestyle, possession | Properties and the broker's own service in a micro-market, or a developer's project as channel partner |
| Buyer moment on Google | Searches for a locality, configuration or project name | Searches for homes in an area, plus owners searching for an agent |
| Buyer moment on Meta | Discovery of a launch or lifestyle | Discovery of listings; also local brand-building |
| Enquiry shape | Project enquiry; site visit is the key milestone | Requirement-led enquiry ("2 BHK, this budget"); matching then viewing |
| Journey | Discover, explore, enquire, sales conversation, site visit, possible booking | Discover, state requirement, enquire, property match, viewing, possible transaction |
| Handoff | Client sales team | Broker themselves or their team |
| Regulatory exposure | Project RERA registration number in ads (state rules) | Agent registration number (and, in Maharashtra, project number and QR code) |
| What relevance means | Buyer fits the brief (Om Sai: narrow lifestyle brief) | Enquiry matches a property the broker can actually show |

**Wording rules:** MappedSkills manages advertising, targeting, messaging, budget and review of available data. The client controls qualification, availability, pricing, viewings, negotiations and transactions. Any stage may be described as a possibility ("may"), never as an outcome. (APPROVED DECISION via DEC-080, DEC-083.) Property matching is the broker's activity; do not suggest MappedSkills matches buyers to properties.

## 4. Verified capability inventory
| Capability | Status | Basis |
|---|---|---|
| Google Ads management, five campaign types | APPROVED DECISION | DEC-079; Google Ads R4.1 (preview) "We manage all five" |
| Meta Ads on Facebook and Instagram | APPROVED DECISION | DEC-080 |
| Click-to-WhatsApp (suitable cases; client replies) | VERIFIED FACT (owner confirmation) | DEC-080. Relevant to brokers who already sell on WhatsApp; no performance claims |
| Location targeting | **Generic only**: FAQ says "supported geographic targeting options", no guarantee. No document lists exact options | Radius, pincode, locality-level capability is UNKNOWN. Meta housing restrictions below |
| Ad copy and message adaptation | Within management ("messaging") | `content.ts` "We handle". Detail of copy responsibility per campaign is UNKNOWN beyond DEC-080 |
| Static creative | Allowance defined in the proposal | DEC-080, DEC-082 |
| Video, reels, brochures, landing pages | Separately scoped | DEC-080; FAQ 6 |
| Client-provided photographs and videos | Not documented anywhere | UNKNOWN as a stated policy. Brokers will supply many listings' media. Needs an owner line (see section 9) |
| Reporting | Policy A: monthly report, review calls as agreed in proposal | DEC-079 |
| Client-shared sales feedback | Reviewed "where available" | R1 copy; no obligation stated |
| Tracking setup, CRM integration | Separately scoped unless proposed; observed enquiries not presented as attribution | DEC-080 |
| Listing feeds, property catalogues, dynamic ads | **No evidence** | RESEARCH REQUIRED before any broker-listing claim |
| Lead-form or portal (99acres, MagicBricks) ads | **No evidence** | Out of scope until owner states otherwise |

## 5. Proof inventory and restrictions
**Om Sai Developer (live case, VERIFIED FACT from the page):** Meta Ads, residential 2 and 3 BHK, Chembur, Mumbai, 12 Sep 2024 to 28 Feb 2026. The case publishes reported figures: cost per lead ₹2,786 to ₹271 (-90.27%), qualified leads 11 to 34 (+209.1%), and campaign totals (₹9,86,584.17 spend, 2,033 leads, ₹485.28 average CPL). Its own evidence note says the two comparisons' periods are not specified and may not share a basis, and it makes no sales or booking claim beyond the client's testimonial. A client quote and star rating exist on that page.

| Claim | Allowed on the Real Estate page now? |
|---|---|
| Meta work for a residential developer in Chembur | Yes (already live) |
| Link to case and `/work` | Yes |
| Any figure (CPL, leads, spend) | **No**, pending explicit owner approval; DEC-080/083 keep figures off audience and platform pages. If approved, use the case's own caveats and never mix the two comparisons |
| Sales, bookings, site visits | **No** (not claimed even by the case) |
| Client testimonial | Not without owner decision; it says "targets were fulfilled", which is a result claim by the client |
| "Lifestyle-led creative improves relevance" as general truth | No; present only as what the case did |
| Any Google Ads real-estate proof | **None.** The legacy Google study is reserved/unpermissioned |
| Any broker, agent or channel-partner client or result | **None exists** (VERIFIED: absence in repository, live site and portfolio) |
| Industry statistics or market size | None used; none sourced |

**Verified developer work:** one Meta case. **Unverified broker experience:** entirely. The page must not use "brokers like you", "we work with agents" or any phrase implying prior broker clients. Safe phrasing: "built for developers and for brokers" (positioning) without experience claims, with the case labelled as a developer case.

**RERA and advertising compliance (RESEARCH, secondary sources; verify with the client and counsel):**
- RERA 2016 s.11(2) requires the promoter to show the project registration number and the Authority's website in advertisements; s.12 makes false or misleading statements in advertisements actionable by buyers. Sources: [AP RERA guidance](https://rera.ap.gov.in/RERA/Views/AdvertisementGuidelines.aspx), [LiveLaw on UP RERA](https://www.livelaw.in/amp/consumer-cases/uprera-issues-guidelines-outlining-the-dos-and-donts-for-promoters-to-adhere-to-when-advertising-projects-251750).
- UP RERA describes display of the number as shared by promoter, agent and media, and warns against unregistered or lapsed agents.
- Maharashtra: Rule 14(2) requires registered agents to include agent and project registration numbers; MahaRERA order 46B/2023 extended the QR code requirement to agents, with penalties of ₹10,000 to ₹50,000 per violation; a later notification sets font-size rules. Sources: [Realty Today](https://therealtytoday.com/news/regulatory/maharera-makes-qr-code-registration-number-mandatory-in-ads-50000-penalty-for-violations/), [ICAI WIRC newsletter](https://old.wirc-icai.org/newsletters/2023/september/maharera.html), [Rentu](https://rentu.in/property-news/maharashtra-rera-mandates-clear-display-of-project-registration-details-in-housin/1497).
- MahaRERA reportedly exempts advertisements for projects with an occupancy certificate from the number requirement (one 2023 order reported by [Housing.com](https://housing.com/news/registration-number-not-must-to-market-completed-projects-maharera/)); applicability to agents and QR is unclear.
- Enforcement: MahaRERA works with ASCI; ASCI reported real estate as a heavily flagged sector ([Social Samosa](https://www.socialsamosa.com/report/real-estate-most-violative-sector-asci-report-7610763), [Storyboard18](https://www.storyboard18.com/how-it-works/real-estate-regulatory-authority-collaborates-with-asci-to-identify-violations-in-ads-23498.htm)). Goa RERA reportedly restricts disclaimers.
- **Meta:** Housing is a Special Ad Category with audience restrictions per [Meta developer documentation](https://developers.facebook.com/documentation/ads-commerce/marketing-api/audiences/special-ad-category). Third-party guides describe US restrictions (no ZIP targeting, fixed age and gender). **India-specific application: UNKNOWN. RESEARCH REQUIRED** in Meta's Help Centre and the live ad account. This directly affects any location-targeting promise.
- **Google Ads:** no real-estate policy check was completed. RESEARCH REQUIRED.
- **Needs client verification per project:** RERA registration number and state, occupancy-certificate status, agent RERA registration, approvals, possession dates, price claims, location claims, imagery rights, and permission to name the project. State rules differ; the page must not state a single national rule.

## 6. Proposed page story and section structure
Page remains one URL (`/who-we-help/real-estate`). No separate developer or broker pages: the audit finds no compelling reason (no search data, no broker proof, and a single page lets one set of approved boundaries cover both). Revisit only if later Search Console data shows distinct intent and the owner approves.

Section lengths follow the Education R2B / D2C R1.1 convention (about 15 to 25 words per description, boundaries in FAQs, no dashes as punctuation).

1. **Hero.** Problem first: property buyers search and scroll long before they call anyone. Candidate H1 keeps SEO and equity: keep "More property enquiries. More of the right buyers." (live, approved) and change the eyebrow and lede to name both audiences, e.g. "Paid advertising for property developers and brokers". Avoid "guarantee", "leads in X days".
2. **Two audiences, side by side.** Two compact cards (Developers and project teams / Agents and brokers), each one line on what they sell and one on what relevance means. This replaces the "such as" strip and drops "channel partners" ambiguity (a channel partner is a broker; decide naming, section 9).
3. **Two moments, two platforms.** Google: someone searching a locality, configuration or agent. Meta: someone discovering a project or listing. Two panels, as live, tied to the buyer moment, not to features. Keep the genuine "we assess before recommending" line.
4. **Two journeys (the signature).** Two independent horizontal paths, drawn once: developer (discover, explore, enquire, sales conversation, site visit, may book) and broker (discover, state a requirement, enquire, property match, viewing, may transact). A bracket marks the MappedSkills portion (discovery to enquiry) versus the client's portion. Captioned "Illustrative. Not every enquiry progresses." No percentages.
5. **Why relevance, not cost per lead.** Keep the Enquiries / Relevant buyers / Site visits (or Viewings) comparison. One sentence only; no numbers.
6. **Verified work.** Single dark band: Om Sai, "Meta advertising for a residential development in Chembur, Mumbai", labelled developer work, links to the case and `/work`. Broker proof: none, so nothing is shown. Retain "our approach, not Om Sai findings" questions, extended with one broker question set.
7. **Readiness (shortened).** Move to a compact row: developer factors and broker factors (what listings, what areas, who answers calls, what registrations). Prevents it competing with the story.
8. **FAQ (about 10) carries boundaries:** guarantees; Google or Meta; location targeting; relevance; who handles calls, viewings, matching; creative, video and photo supply; landing pages and CRM scope; budget and pricing; **RERA and registration numbers appear in ads, who supplies them**; whether the service differs for brokers. Final CTA: "Discuss Property Advertising" to `/contact`.

## 7. Animation recommendations
Match the approved siblings: once only, in view, reduced-motion safe, no JS shows the final state, no layout shift, no looping, nothing sticky (THE RESOLVE governance, DEC-018; D2C R1.1 precedent).
- **Hero or section 4:** two lanes drawn once. A mark appears on each lane at "Discover", progresses along the line at about 0.4 s per stage, and halts at the handoff bracket; the client portion appears in the lighter state. Lanes are independent (different stage labels, offset start) so the page does not imply one funnel.
- **Do not animate** a conversion count, bar fill to a "booking", or a narrowing funnel; the Education/D2C precedent removed stagger that implied sequence where none exists.
- **Section 3:** optional single reveal of the two search/scroll scenes; keep static if section 4 carries the motion.
- Mobile: lanes stack vertically, same once-only reveal; confirm clearance of the fixed cookie banner (D2C R1.1 observed it covers the lower third of hero art at 390 px).
- Budget the motion at under about 3 s total; add `prefers-reduced-motion` and a no-JS fallback test as siblings did.

## 8. SEO findings
- **Intent (WORKING HYPOTHESIS from qualitative SERP samples only; no volumes exist or are invented):** developer-side queries are service-led ("real estate lead generation agency India", "real estate digital marketing for builders", developer Meta and Google Ads). The SERP is dominated by agency pages and directories (e.g. Growth Improvers, Realtica, Adchennai, Realatte, via [Clutch](https://clutch.co/profile/realtica) and [Telecrm roundup](https://telecrm.in/blog/real-estate-digital-marketing-agency/)); some competitors lead with cost per site visit or per booking, which MappedSkills must not copy without data. Broker-side intent is mostly tool and how-to content ([Privyr guides](https://www.privyr.com/blog/lead-generation-for-real-estate-agents-in-india-best-platforms-2024/)) and channel-partner vendors; paid-ads-agency pages for brokers appear thinner (single qualitative sample, RESEARCH REQUIRED).
- The repository's keyword docs (`docs/03-search/*`) contain **no** real-estate or broker entries; no keyword map exists for this page.
- **Metadata recommendation (title length is a tradeoff, not a ranking claim):** keep the URL and canonical. Adjust the description and breadcrumb to include brokers, e.g. description naming "property developers and brokers"; title may stay (it says "Real Estate", which covers both) or become "Real Estate Google & Meta Ads Agency in India" unchanged. Prefer least change to avoid disturbing an indexed title. BreadcrumbList label "Real Estate Developers" should become "Real Estate" to match the both-audiences scope.
- FAQPage JSON-LD must still match visible FAQs exactly when FAQs change.
- Internal links: homepage card should stop reading "Real estate developers" and gain broker wording; add Google Ads and Meta Ads pages' links to this page if approved; the existing blog post (developer strategies) can link to this page and, if refreshed, mention brokers (blog edits are out of scope).
- Preserve: no redirects; do not create `/real-estate` or broker URLs.
- Schema: no Service, review or rating nodes (as now).

## 9. Unresolved decisions (owner)
1. Re-supply the missing R1 Content/SEO md and Visual R1 png.
2. Is an edit to the live page authorised after design approval, and by what release route?
3. Naming: "agents and brokers" versus "channel partners" (not interchangeable to all readers); the page needs one consistent term.
4. Is Om Sai figure display approved (CPL, qualified leads)? Default recommendation: no.
5. May the Om Sai testimonial appear on this page? Default: no.
6. Photo and video policy: client-supplied property media, who edits, rights and approvals (not documented).
7. Exact location-targeting capability, and Meta's housing special-category treatment in the user's account (India).
8. Whether MappedSkills will place RERA number or QR code in ads it builds, or only on client request; who verifies the number.
9. Does MappedSkills run broker campaigns for listings (feeds, multiple properties) or only at area/service level? No experience evidence exists.
10. Is a separate broker page ever wanted (not recommended now)?
11. Nav and homepage card copy changes, and whether they stay in the uncommitted header work.
12. DEC for the both-audiences decision and Google Ads real-estate policy review.

## 10. Evidence references
- Repository (worktree `MappedSkills-home-r2`): `app/(pages)/who-we-help/real-estate/page.tsx`; `components/paid-advertising/real-estate/{content.ts,PaidAdvertisingRealEstate.tsx,RealEstateJsonLd.tsx,RealEstateArt.tsx,real-estate.css}`; `docs/paid-advertising-revamp/REAL_ESTATE_R1_NOTES.md`; `docs/00-project/DECISION_LOG.md` DEC-078 to DEC-084; `app/sitemap.ts:90-92`; `lib/analytics.ts:104-106`; `lib/case-study-eligibility.ts:34-42`; `components/direction-c/nav.ts` (uncommitted diff); `components/paid-advertising/home/content.ts:13,23`; `components/paid-advertising/services/content.ts:19,48`; `docs/education-r2/EDUCATION_R2B_REPORT.md`; `docs/d2c-r1/R11_REPORT.md`; `docs/meta-ads-r22/REPORT.md`; `components/google-ads-r41/content.ts`; `components/paid-advertising/meta-ads/content.ts`; `docs/03-search/`, `docs/01-business/ICP.md` (no real-estate entries found).
- Production (curl 2026-10-27): `mappedskills.com/who-we-help/real-estate` (200, title, canonical, robots), `/sitemap.xml`, `/`, `/services`, `/portfolio/om-sai-developer-meta-ads`, `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers`, `/real-estate` (404), `/who-we-help` (404), `/portfolio/google-ppc-for-real-estate` (404).
- Local baseline: `~/g7-release/baseline/portfolio_google-ppc-for-real-estate.meta.json` (404 page).
- External sources: links in section 5 and 8. All are secondary or commercial; none is statute text. Treat as RESEARCH REQUIRED until verified with counsel and the client.
- Not done: Search Console data, Meta/Google policy pages verification, competitor deep-read, accessibility or performance checks of the live page, any preview.
