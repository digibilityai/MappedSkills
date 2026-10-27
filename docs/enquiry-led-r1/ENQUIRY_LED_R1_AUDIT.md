# Enquiry-Led Businesses: content, evidence and SEO audit

27 October 2026. Audit and recommendations only. No code, route, SEO setting, Contentful entry or decision-register edit. Nothing committed, pushed, merged or deployed. No preview built. Worktree: `MappedSkills-home-r2`. Proposed page: `/who-we-help/lead-generation`.

Labels follow `CLAUDE.md`: VERIFIED FACT, OWNER REQUIREMENT, APPROVED DECISION, WORKING HYPOTHESIS, RESEARCH REQUIRED, UNKNOWN. Recommendations are WORKING HYPOTHESES until the owner approves them.

## 0. Summary

1. **There is no page at `/who-we-help/lead-generation`.** Live check (27 Oct): HTTP 404, not in the live sitemap, no redirect source or target. The Who We Help set in production is D2C, Education and Real Estate only. There is no `/who-we-help` hub.
2. **The proposed slug collides in meaning with a live, redesigned page.** `/lead-generation` (DEC-057, live since 17 Oct) is a *service* page about enquiry generation. Two pages with "lead-generation" in their path, one a service and one an audience, invite cannibalisation and visitor confusion. This is the main decision for the owner (section 9, U1).
3. **The audience is not defined anywhere in the records.** "Enquiry-led businesses" appears only as a homepage label, a Google Ads R3 card ("including real estate"), meta text and in DEC-078 as an owner requirement. Nowhere does a decision name the businesses (consultants, professional services, appointment-led). The homepage card whose id is `enquiry-led` currently *is* Real Estate.
4. **There is no proof for this audience.** Every documented paid-media case is D2C, education or real estate. Nothing verified exists for professional services, consultants or appointment-led businesses. The page must be proof-free or use method-only content.
5. **Strategy docs are cautious about this audience.** ICP v1 treats professional services as "weak-fit, not excluded" and B2B as the core. DEC-005/078 reframed the business around Google Ads and Meta Ads. The older B2B ICP is not reconciled with the new paid-advertising direction (flagged as U5).
6. **SEO: no research exists.** No keyword evidence, volumes or SERP tests for this audience. Search intent below is a WORKING HYPOTHESIS. A small live check shows the "lead generation agency India" SERP is dominated by agency directories and freelancers, which is competitive and generic.

## 1. Existing page and URL status

| Item | Status | Evidence |
|---|---|---|
| `/who-we-help/lead-generation` | **Does not exist.** 404 in production; no route file in `app/(pages)/who-we-help/` (only `d2c`, `education`, `real-estate`) | curl 27 Oct; `ls` of the route folder |
| Local preview for it | **None** | no `*-preview` route for this audience |
| `/who-we-help/d2c`, `/education`, `/real-estate` | **Live (200)**, in the live sitemap | curl; `app/sitemap.ts:90-92` |
| `/lead-generation` | **Live (200)**. Title "Lead Generation Where the Unit Is an Enquiry You Can Act On \| MappedSkills", self-canonical, in sitemap (`app/sitemap.ts:93`) | curl; `app/(pages)/lead-generation/page.tsx` |
| `/lead-generation-services` | 308 redirect to `/lead-generation` (`next.config.mjs:228`) | source |
| Local-only previews in this worktree | `/d2c-preview-r1`, `/education-preview-r2`, `/real-estate-preview-r2`, `/google-ads-preview-r3/r4/r41`, `/meta-ads-preview-r1/r2/r21/r22`, `/resolve-preview-r3` (uncommitted route folders). **None is production.** | `ls app/` |
| Header "Who We Help" dropdown (D2C, Education, Real estate) | **Uncommitted** edit in this worktree (`components/direction-c/nav.ts:42-44`); not live | `git status` |
| Homepage audience cards | Live: three cards (D2C, Education, Real estate). The third card has `id: 'enquiry-led'` but the title "Real estate developers" and links to `/who-we-help/real-estate` | `components/paid-advertising/home/content.ts:12-14` |
| Other mentions | Home metadata "D2C, education and enquiry-led businesses" (`app/page.tsx:9`); Google Ads R3 preview card "Enquiry-led businesses, including real estate" (`components/google-ads-r3/content.ts:47`, preview only); Education R2 route label "Enquiry-led enrolment" (`components/education-r2/content.ts:53`, preview) | grep |

Inbound links to `/lead-generation` today: homepage footer/strategy list (`components/direction-c/home/HomeStrategy.tsx:52`), related links on several pages, blog routing (BLOG-065). It must keep all of them.

### Architecture status
- **OWNER REQUIREMENT (task brief):** four Who We Help pages: D2C & Ecommerce, Education & Training, Real Estate, Enquiry-Led Businesses. Real Estate stays standalone. B2B deferred. No additional industry pages.
- **APPROVED DECISION record:** DEC-081, 082, 083 cover the first three. **No DEC covers a fourth page, its name or its URL.** `/who-we-help/lead-generation` is a brief proposal, not a recorded decision (UNKNOWN whether previously approved elsewhere; not found in `DECISION_LOG.md`).
- Note: the brief names the first page "D2C & Ecommerce" and "Education & Training". The live pages and DEC-081/082 use "D2C" and "Education". Exclusion of `/google-ads-for-ecommerce` is preserved (DEC-081).

## 2. Approved strategy alignment

| Source | What it says | Effect on this page |
|---|---|---|
| DEC-078 (OWNER REQUIREMENT) | Concise, customer-focused Google Ads and Meta Ads positioning for D2C, education and **enquiry-led** businesses. All Google Ads campaign types supported. Do not imply Amit executes every project. | Authorises the audience concept, not its members. |
| DEC-079/080 | Reporting Policy A; tracking boundary; creative allowances proposal-defined; Click-to-WhatsApp is a **VERIFIED FACT** option; client's team handles conversations; no chat automation or CRM unless in proposal. | Reuse as FAQ boundaries. |
| DEC-083 | Real Estate is standalone with Om Sai as sole proof; sales team owns calls, qualification and bookings. | Keep real estate and Om Sai out of this page except a cross-link. |
| DEC-057 / LG-D (live `/lead-generation`) | MappedSkills manages campaigns; enquiries go straight to the client's form, CRM or WhatsApp; MappedSkills does **not** call or qualify enquiries; monthly report; no guaranteed number, cost per lead or conversion. | The new page must agree with this. It is the nearest existing language for the audience. |
| ICP v1 (`docs/01-business/ICP.md`) | Professional services "weak-fit, not excluded"; B2B considered purchase is the "core"; manufacturing is "candidate beachhead #1, not approved". Based on the superseded SEO/AI-visibility strategy. | Predates DEC-078. **Not reconciled** with the paid-advertising direction (U5). |
| Brand/design references | THE RESOLVE R3 homepage, Google Ads R4.1, Meta Ads R2.2, D2C R1.1, Education R2B, Real Estate R2.1: ivory ground, near-black ink, one tangerine accent, Bricolage Grotesque and Manrope, restrained once-only motion. | Preserve; not reopened. |

I did not re-read the individual R-series design reports for this audit beyond their registers and the Education audit; no design conflicts were found in the sources I did read.

## 3. Audience and industry recommendations

The business definition that fits the evidence: **a business where a person usually asks, enquires or speaks to someone before buying, and the sale happens after a conversation.** That is a structural definition, not an industry list.

| Candidate category | Status | Basis and caution |
|---|---|---|
| Professional services (accountants, advisers, architects, interior designers, legal-type firms) | **Requires owner confirmation** | ICP v1 "weak-fit, not excluded". No client evidence. Regulated professions (legal, medical, financial) bring Google and Meta advertising-policy restrictions: **RESEARCH REQUIRED** before naming any. |
| Consultants and specialist service providers | **Requires owner confirmation** | Natural fit with the enquiry structure; no client evidence. |
| Appointment-led businesses (clinics, studios, salons, consultations) | **Requires owner confirmation, high caution** | Health and wellness advertising is policy-restricted on both platforms; ICP v1 lists "local B2C services with low value per customer" as a poor fit. Do not name clinics. |
| Other "an enquiry precedes a sale" businesses (installers, fit-out, event services, custom/made-to-order work) | **Requires owner confirmation** | Plausible; the live `/lead-generation` hero example (an interiors studio quoting an office fit-out) is *illustrative*, not a client. |
| Real estate | **Excluded here** (standalone) | DEC-083. |
| B2B | **Deferred. Unsupported.** | Brief and DEC-005. The only B2B-flavoured case, Ameba Software, is an **SEO** case with withheld proof. |
| Manufacturing/industrial | **Unsupported on this page** | ICP v1 hypothesis only; SEO-led; not approved. |

**Recommendation (WORKING HYPOTHESIS):** write the audience by *behaviour*, not trade: "businesses where a conversation comes before the sale, such as consultancies, specialist services and made-to-order work." Name at most three or four example types, labelled "such as", and only after the owner confirms them. Avoid health, legal and finance examples.

## 4. Proof inventory

Sources: live `/work` (6 case studies), `lib/case-study-proof.ts`, `LINK_ROUTING_OWNER_REVIEW.md`, DEC-074 to DEC-077 area (Work redesign), live case pages.

| Client / industry | Verified work | Google/Meta | Outcome documented? | Permission / publication | Suitable for this page? |
|---|---|---|---|---|---|
| **Om Sai Developer**, residential real estate, Mumbai | Meta Ads | Meta | Reported figures exist but are not headlined (DEC-080) | Published | **No.** Real Estate proof (DEC-083). |
| **AnyBodyCanBake**, online baking school, Pune | Google Ads (keywords, ad copy, audience, optimisation) | Google | No publishable numbers (withheld) | Permission YES; proof withheld | **No.** Education proof (DEC-082); the brief forbids reuse. |
| **Wanderlooms**, adventure apparel | Meta Ads | Meta | None | Unlinked preview; no case page | **No.** D2C proof. |
| **Ameba Software**, B2B software, Chandigarh | **SEO**, not paid media | **None** | Withheld; DEC-012 open; ranking contradiction | Permission YES; proof withheld | **No.** Wrong channel; B2B is deferred; withheld. |
| **eCommerce Home Decor Brand**, Bangalore | **SEO** | None | Withheld; DEC-012 open | Permission YES | **No.** D2C, SEO. |
| **ClassPe**, exam-prep coaching | Social media strategy and content | Not paid Google/Meta (the page *does* say "social media strategy, narrative and content"); channel detail UNVERIFIED | None | New Contentful entries (late Oct); permission record **not found** in the repo (UNKNOWN) | **No.** Education; not paid. |
| **InsurYo**, insurance-assistance (micro-insurance) | Organic growth, awareness, partner outreach | Not paid Google/Meta | None | New entry; permission record **not found** (UNKNOWN) | **Not suitable.** Closest to a service/enquiry business, but organic, not paid, and insurance is a regulated category. Only possible as a *labelled* non-paid reference after owner confirmation. |
| Removed, permission NO: HealthFirst Clinics, EcoClean Pros, The Fine Living Group, Utpala Designs, Vibgyor High | n/a | n/a | n/a | **Not publishable** | **No.** |

**Conclusion (VERIFIED FACT from the records I inspected):** MappedSkills has **no documented, permissioned Google Ads or Meta Ads work for a consultant, professional-services or appointment-led business.** Recommendation: the page carries **no case study and no "experience with" band**. In its place, use a method panel ("how we assess an enquiry-led business") clearly labelled as approach, not client findings. This also avoids a "no proof" apology on the page.

What the owner could still supply, if it exists: any permissioned paid campaign for a service, consulting or appointment business; campaign scope and dates; a plain statement of what was done. UNKNOWN whether any exists outside the repository.

## 5. Verified service capabilities

| Capability | Status | Basis | Page boundary |
|---|---|---|---|
| Google Ads, all campaign types (Search, Display, YouTube, Performance Max etc.) | **OWNER REQUIREMENT / APPROVED** | DEC-078, DEC-079 | State Search first; mention others as "where they suit". YouTube needs client-provided video; video production is separate (open at the Education audit, still unrecorded). |
| Meta Ads (Facebook, Instagram) | **APPROVED** | DEC-078, DEC-080 | Say plainly. |
| Click-to-WhatsApp | **VERIFIED FACT** (owner), option where suitable | DEC-080 | Client team replies; no automation or CRM unless in proposal; no numbers. |
| Lead forms, calls, WhatsApp as enquiry routes | Enquiries go to the client's own form, CRM or WhatsApp | live `/lead-generation` (DEC-057) | OK. |
| Delivery testing | Conditional ("where the setup allows") | DEC-057 | Keep conditional. |
| Monthly report; review calls as agreed | **APPROVED** (Policy A) | DEC-079 | Use that wording exactly. |
| Tracking | Review and recommend only; setup, repairs, integrations separately scoped | DEC-080 | FAQ only. |
| Qualifying or calling enquiries | **Excluded** | DEC-057 | FAQ and "we stop here" line. |
| CRM, automation, sales process, landing pages, video | Separately scoped or excluded | DEC-079/080 | FAQ only. |
| Guarantees (volume, CPL, conversion, ROI, sales) | **Not offered** | DEC-053/057/079 | Never. |
| Free advertising account review | Offered on homepage FAQ | `home/content.ts` FAQ 2 (the follow-up DEC-080 note says wording needs correction) | Do not repeat until the correction. |

## 6. Proposed page narrative and section structure

Narrative (customer-centric): *You don't need more form submissions. You need enquiries from people who could actually buy.* People look for and compare providers; Google meets those already searching, Meta reaches those who haven't yet; an enquiry then needs a reply; and you judge the work by what happens after the enquiry. Descriptions at 15 to 25 words. Scope boundaries live in FAQs. We do not describe or imply management of the client's sales process.

| # | Section | Working headline (not approved) | Job |
|---|---|---|---|
| 1 | Hero | "Relevant enquiries, not just more form submissions." Lede (about 22 words): "Google Ads and Meta Ads for businesses where a conversation comes before the sale, from first search to the first useful enquiry." | Who and what. Primary CTA "Discuss your enquiries" to `/contact`; secondary "Request a call" to `/contact?intent=call` (lower-case c). |
| 2 | Audience strip | "For businesses such as" + 3 or 4 confirmed types | Orient; no "trusted by". |
| 3 | The decision | "People rarely decide on the first click." | The buyer journey: notice, compare, ask, talk, decide. Leads into the animated visual. |
| 4 | Google and Meta | "Two platforms. Two moments." | Google = already searching and comparing; Meta = not yet looking, first awareness. Recommendation follows assessment. |
| 5 | After the enquiry | "An enquiry is where your work starts." | One short we/you split: we run the advertising; your team replies and has the conversation. Click-to-WhatsApp as option. |
| 6 | Measuring | "Judge it by more than the lead count." | Three levels: enquiries received, relevant enquiries (as your team judges), conversations that progressed. Data reviewed where you share it. |
| 7 | How we assess | "Before we recommend anything." | Method panel (offer, who you want, how people enquire, how fast you reply), labelled as approach. Replaces a proof band. |
| 8 | FAQs and close | "A few questions before we talk." | Scope boundaries, guarantees, tracking, qualification, regulated categories. Close CTA. |

Differences from siblings: Education has the readiness-first structure and a dark proof band; Real Estate has the sales-team handoff and Om Sai band. This page has **no proof band** and puts the buyer decision visual first.

Suggested FAQs (cautious; answers to be drafted at R1):
1. Do you call or qualify our enquiries? (No; DEC-057.)
2. How many enquiries can we expect? (We don't know; no guarantee.)
3. Where do enquiries go? (Your form, CRM or WhatsApp.)
4. Can people message us on WhatsApp from an ad? (Click-to-WhatsApp, DEC-080.)
5. Do you help with tracking or CRM? (Review yes; set-up scoped separately.)
6. Can you advertise regulated services? (RESEARCH REQUIRED on platform policies; answer as "depends on the category and platform rules".)
7. How is this different from your lead generation service page? (Cross-link; see U1.)

Cross-links: `/google-ads`, `/social-media-ads`, `/pricing`, `/how-it-works`, `/faq`, `/contact`. Link to `/lead-generation` only if both pages stay (U1).

## 7. Visual storytelling recommendations

Concept: **"From interest to a real conversation."** One horizontal line runs from a faint crowd of identical anonymous marks (the RESOLVE motif) through four stops, **Notice, Compare, Ask, Talk**, and ends at a single distinct named mark in tangerine. Google and Meta each appear as small generic icons (search bar, feed card) at the stage where they work, with no logos. The final stop shows the handoff: a quiet boundary line between "advertising" and "your team".

- Distinct from Education (three routes) and Real Estate (five-stage stage ring): a single path that **narrows**, echoing the homepage resolve idea without copying its hero.
- Motion: outline visible at first frame; each stop comes to full strength once, in order, when the section enters view; the final mark draws last. No loops, no parallax, no scroll-jacking, no autoplay. Final state identical with reduced motion and with no script. Reuse the once-only trigger pattern from D2C R1.1 (copy the pattern, do not edit the frozen D2C code).
- Mobile: the line turns vertical; same order; no horizontal scroll at 375/390 px; CLS 0.
- Accessibility: decorative SVG `aria-hidden`; the sequence given as a real ordered list; sufficient contrast; focus order unchanged.
- Imagery: original SVG only; no stock people, fabricated dashboards, fake enquiries or client mockups. The live `/lead-generation` hero uses a clearly labelled fictional example ("Meera S."); do not reuse that example here.

## 8. SEO findings

### 8.1 URL
- **VERIFIED FACT:** `/who-we-help/lead-generation` is 404 live, unreferenced, with no redirect and no equity of its own. Creating it is a new route.
- **VERIFIED FACT:** `/lead-generation` has live equity (self-canonical, sitemap, redirect from `/lead-generation-services`, internal links). It must not be redirected or retitled by this work. Backlink data is UNKNOWN (SEARCH_ARCHITECTURE notes it).
- **Risk:** two pages whose path contains `lead-generation` at different depths. Visitors and crawlers may treat them as variants. Mitigation depends on U1.

### 8.2 URL options (for owner decision, none implemented)
| Option | Pros | Cons |
|---|---|---|
| A. `/who-we-help/lead-generation` (brief) | Matches the brief; shows as sibling of D2C, Education, Real Estate | Name implies the service; likely competes with `/lead-generation`; the page's subject is an *audience* |
| B. `/who-we-help/enquiry-led-businesses` | Names the audience; no collision; reads as the nav label | Longer; "enquiry-led" is not search vocabulary |
| C. `/who-we-help/service-businesses` | Plain English | Broader than the approved name; excludes consultants? |

**Recommendation (WORKING HYPOTHESIS): Option B**, unless the owner prefers A for a reason not in the record. The page title and H1 can still carry search-relevant language independent of the slug.

### 8.3 Search intent and keyword theme
- **No evidence in the repo** for this audience. `KEYWORD_PRIORITY_MATRIX.md` has no row for it, and the older matrix is SEO-era. Volumes, difficulty and CPC: **RESEARCH REQUIRED; none invented**.
- **VERIFIED FACT from a live search on 27 Oct** (standard web search, not a SERP tool): "lead generation agency India for service businesses Google Ads" returns agency directories (Semrush Agency Partners, GoodFirms, SaveMyLeads), freelancer marketplaces (Upwork, Contra) and agency listicles. A search for Google Ads for professional services/consultants in India returned mostly freelancer listings and no authoritative page. This indicates a **crowded, generic, directory-heavy "lead generation agency" SERP** and a **thin SERP for the professional-services-plus-Google-Ads angle**. It is not a volume or ranking measurement.
- **Intent split (WORKING HYPOTHESIS):**
  - *Broad "lead generation"* (e.g. "lead generation agency", "lead generation services India"): commercial, but a mixed audience (B2B list sellers, call centres, SaaS). Already the job of `/lead-generation`.
  - *Paid-advertising service intent* ("Google Ads agency for service businesses", "Meta Ads for consultants"): a business owner choosing an agency. This is the page's lane.
  - *Audience-led* ("marketing for consultants", "ads for professional services"): possible but unvalidated.
- **Recommended primary theme (WORKING HYPOTHESIS):** **Google Ads and Meta Ads for service and enquiry-driven businesses in India**, not "lead generation" alone. Secondary themes: enquiries from Google Ads; Meta Ads for service businesses. Validate with a SERP and autocomplete pass (as done for D2C/Education matrix rows) before setting title or description.
- Same caution as Education and Real Estate: no Service, Review, Rating, Offer or Organization-rating schema. BreadcrumbList (Home, label) and FAQPage matching visible questions only. Self-canonical. Add to sitemap and analytics page-type map (commercial) when built, not now.
- Titles/meta: not drafted; keep within ~60/155 characters (the Education title is 70).
- **No production metadata or URLs changed.**

## 9. Conflicts and unresolved decisions

| # | Item | Type | Needed |
|---|---|---|---|
| U1 | `/who-we-help/lead-generation` vs live service page `/lead-generation`: cannibalisation and naming | Conflict | Owner: choose A, B or C (8.2); decide whether `/lead-generation` stays the service page |
| U2 | Fourth page, its name and URL have no DEC | Gap | A decision entry when approved |
| U3 | Which businesses the audience names. None are confirmed | Unresolved | Owner confirms 3 to 4 examples, or approves the behavioural definition only |
| U4 | Homepage `enquiry-led` card is Real Estate; a fourth card or restructure needed; Google Ads R3 preview card says "Enquiry-led businesses, including real estate" | Conflict | Homepage change needs approval; R3 is frozen |
| U5 | ICP v1 (B2B core, professional services weak-fit) vs DEC-078 paid-advertising direction | Unreconciled | Owner: is ICP v1 to be treated as superseded for this page? |
| U6 | No permissioned paid-media proof for this audience | Gap | Owner: any such work to disclose? Otherwise ship without proof |
| U7 | Regulated categories (legal, health, finance) and platform policy | RESEARCH REQUIRED | Check Google and Meta policies before naming any |
| U8 | YouTube with client-provided video remains unconfirmed and unrecorded (carried from Education audit) | Open | Owner confirmation |
| U9 | Free account review and reporting wording on the homepage need correction (DEC-080 follow-up) | Open | Do not repeat on this page |
| U10 | Brief names "D2C & Ecommerce" and "Education & Training"; live labels are "D2C" and "Education" | Inconsistency | Confirm intended nav labels |
| U11 | Records: D2C R1.1 approval, Education R2B and Real Estate R2.1 approvals not in `DECISION_LOG.md` (last entry DEC-084); production release of the paid-advertising bundle not recorded | Owed | One records entry after owner confirms |
| U12 | Nav dropdown and footer "Who We Help" group uncommitted; dropdown has three items | Pending | Add the fourth only after the page is approved |
| U13 | ClassPe and InsurYo permission records not found in the repo | UNKNOWN | Owner confirms if either may be referenced |

## 10. Recommendation for the content-first R1 preview

**Proceed to R1 only after owner answers U1, U3 and U6.** Proposed R1 (content-first, no visual build beyond a plain layout):

1. **Name and URL:** adopt the audience name "Enquiry-led businesses" and (recommended) `/who-we-help/enquiry-led-businesses`; keep `/lead-generation` unchanged as the service page and cross-link both ways.
2. **Audience:** behavioural definition plus up to four owner-confirmed example types; no real estate, no B2B, no health/legal/finance examples.
3. **Content:** the eight sections in 6, short descriptions (15 to 25 words), headlines as working text for review, scope boundaries in FAQs only.
4. **Proof:** none. Method panel in place of a case band. State nothing about results.
5. **Visual:** brief only (section 7) for approval in R2; R1 is text-first.
6. **SEO:** primary theme "Google Ads and Meta Ads for service and enquiry-driven businesses in India", pending a SERP/autocomplete pass. No metadata edits to live pages.
7. **Deliverables for R1:** content doc with proposed title, description, H1, section copy, FAQs, link plan, schema plan; no code, no preview, no commits.

## 11. Evidence references
- Decisions: `docs/00-project/DECISION_LOG.md` DEC-005, DEC-012, DEC-053, DEC-057, DEC-078 to DEC-084.
- Routes and links: `app/(pages)/who-we-help/`, `app/(pages)/lead-generation/page.tsx`, `app/sitemap.ts:90-93`, `next.config.mjs:228`, `components/direction-c/nav.ts`, `components/paid-advertising/home/content.ts`, `components/cplus/lead-generation/content.ts`.
- Proof: `lib/case-study-proof.ts`, `docs/14-qa/link-audit-2026-09-19/LINK_ROUTING_OWNER_REVIEW.md`, live `/work` and `/portfolio/*` pages (27 Oct).
- Search: `docs/03-search/KEYWORD_PRIORITY_MATRIX.md`, `SEARCH_ARCHITECTURE.md`, `KEYWORD_UNIVERSE.md`; two live web searches (27 Oct), no volume data.
- Format reference: `docs/education-r1/EDUCATION_R1_AUDIT.md`.

## 12. Not done / limits
- No SERP tool, keyword tool or Search Console data was used; no volumes or rankings are stated.
- Platform advertising policies for regulated categories were not researched.
- The individual R-series design reports were not re-read in full; design references were taken from the registers and the Education audit.
- ClassPe and InsurYo pages were checked for description and industry only.
- No browser testing, no tests run, nothing built.
