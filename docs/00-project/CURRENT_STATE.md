# Current Project State

## Current Phase
**Session 03 Completed — Awaiting Orchestrator Review (Quality Gate 3)**
**Session 02 Completed — Awaiting Orchestrator Review (Quality Gate 2)**
**Session 01 + 01B Completed — Awaiting Orchestrator Review (Quality Gate 1)**

Three review gates are now open in parallel. None has been approved by Claude; Claude has no authority to approve any of them.

- **Gate 1 (existing site audit)** — Session 01 + 01B artifacts delivered 2026-08-31.
- **Gate 2 (business/category validation)** — Session 02 artifacts delivered 2026-08-31. Claude's research recommendation is **MODIFY CURRENT HYPOTHESIS**. See `docs/01-business/STRATEGIC_VALIDATION.md`. **The business strategy is NOT approved.**
- **Gate 3 (search demand / SERP / commercial opportunity)** — Session 03 artifacts delivered 2026-08-31. Claude's research recommendation is **OPTION D** (vertical search-to-enquiry). See `docs/03-search/SEARCH_STRATEGY_VALIDATION.md`. **No search strategy, keyword map or content plan is approved.**

A read-only audit of the existing website/codebase was completed on 2026-08-31 on branch `test_branch` at HEAD `566d3e3`, followed by a narrowly scoped **live production verification pass (Session 01B)** on the same date. Artifacts are listed below. Quality Gate 1 has **not** been independently approved by Claude; it awaits orchestrator and owner review. Claude's recommendation is recorded in the Session 01B handoff.

## Production Website
**OWNER-SUPPLIED FACT:** the production website visitors use is **`https://mappedskills.com`**.

**VERIFIED FACT (live, 2026-08-31):** corroborated in production — the homepage canonical is `https://mappedskills.com/` and all 15 sitemap URLs use that host. `http://` redirects to `https://` (301) and HSTS is present. The `ms.mappedskills.com` reference in `doc/cpanel-deploy.md` is a repository/deployment artifact requiring explanation later, **not** an open question about the canonical production site.

**VERIFIED FACT (live):** the production edge is `Server: LiteSpeed` with HTTP/2 and HTTP/3, running Next.js behind it. Server-side ISR is functioning.

## Current Working Business Direction
**WORKING HYPOTHESIS:**
MappedSkills may reposition around:
1. AI + Search Visibility
2. Conversion Rate Optimisation
3. Marketing Automation

Working journey:
**GET FOUND → CONVERT → AUTOMATE → GROW**

## Current Positioning Territory
**WORKING HYPOTHESIS:**
Potential messaging territory includes:
- “Get Found. Convert More. Automate Growth.”
- “Search Visibility → CRO → Marketing Automation.”
- AI + Search Visibility as the likely spearhead acquisition category.
- CRO and Marketing Automation as expansion/value-multiplier services.

This requires market and search validation.

## Current Site Facts
**OWNER-SUPPLIED FACTS:**
- MappedSkills has an existing website.
- Current stack includes Next.js and Node.
- Existing pages and functionality should not be casually restructured.
- The owner wants a major visual/UI/UX transformation while protecting existing functionality and SEO value.

### Owner-Supplied Facts Added 2026-08-31 (Session 02)
**OWNER-SUPPLIED FACT:** The existing MappedSkills website contact form has not been generating enquiries for the owner.

**OWNER-SUPPLIED FACT:** There are no existing MappedSkills blog articles or case-study assets inside Contentful that must be preserved for the transformation.

*(Recorded verbatim. No further inference is drawn from these statements in this section. Their bearing on Session 01/01B critical findings C1 and C8 is noted where those findings are discussed, without extending beyond what the owner stated.)*

## Current Program Operating Model
- ChatGPT acts as program architect/orchestrator/reviewer.
- Claude acts as the execution team through bounded specialist roles.
- The owner runs Claude prompts and returns outputs for review.
- Claude sessions should be changed deliberately to control context and token use.
- Repository documents are the durable source of truth.

## Session 01 / 01B Artifacts (created 2026-08-31)
- `docs/10-technical/CURRENT_CODEBASE_AUDIT.md`
- `docs/10-technical/CURRENT_ROUTE_INVENTORY.md`
- `docs/10-technical/CURRENT_INTEGRATIONS.md`
- `docs/10-technical/CURRENT_SEO_IMPLEMENTATION.md`
- `docs/00-project/handoffs/SESSION_01_CODEBASE_AUDIT.md` (updated with the 01B verification record)

**Audit method limitation (VERIFIED FACT):** the audit was static file inspection only. `node_modules/` was not installed and the session was instructed not to install packages, so **no build, no lint, and no test was run**, and no page was loaded in a browser. The audit therefore contains no performance, Core Web Vitals, ranking, traffic, or conversion figures — none were available and none were estimated.

**Session 01B method limitation (VERIFIED FACT):** live verification was deliberately minimal — a small number of `curl` requests plus one browser session against ten URLs. **No crawler, no Lighthouse, no load testing, no form submission, no booking, no hosting-panel or environment-variable access, and no Contentful access.** Production environment-variable states noted below are **INFERENCES from observed behaviour**, not panel readings. No performance, ranking, traffic, or conversion figure was gathered in 01B either.

## Critical Findings — Status After Live Verification (Session 01B)
Recorded as state facts. Repository evidence in `CURRENT_CODEBASE_AUDIT.md` §21; live production evidence in §0 of the same file.

**Reclassification summary:** C1 PARTIALLY VERIFIED · C2 **CONFIRMED** · C3 **CLEARED as a live risk** (downgraded to latent) · C4 **CONFIRMED** · C5 **CLEARED** · C6 PARTIALLY VERIFIED (downgraded to pre-launch blocker). One finding was **escalated**: no analytics of any kind is running in production.

1. **VERIFIED FACT — the site has no backend.** There is no `app/api/` directory and no route handler anywhere. `components/forms/ContactForm.tsx` simulates submission with `setTimeout`; `components/forms/BlogNewsletterForm.tsx` does the same; a third form on `/blog` has no submit handler. **VERIFIED FACT (live):** the production `/contact` form has **no `action` and no `method`**, no CAPTCHA and no consent checkbox. **`DELIVERY NOT VERIFIED`** — no test enquiry was submitted, and lead capture is not inferred from the success UI. **Owner must confirm whether enquiries have been arriving at `info@mappedskills.com`.**
2. **VERIFIED FACT (live) — CONFIRMED.** `Cache-Control: public, max-age=31536000, immutable` is served on production HTML: `/`, `/seo`, `/contact`, `/schedule-call`, `/blog`. `/sitemap.xml` correctly receives `max-age=3600, must-revalidate`, proving the `.xml` branch of the override matches while extensionless HTML routes do not. Server-side ISR works, but browsers and intermediary caches are told not to revalidate HTML for a year.
3. **VERIFIED FACT (live) — RESOLVED.** `public/robots.txt` is the file production serves (static, LiteSpeed-served, bypassing Next.js); `app/robots.ts` is inert dead code. **`GPTBot` and `CCBot` are NOT blocked in production, and no AI-crawler directive of any kind is live.** The charter conflict is therefore **not currently active**. Residual latent risk: deleting `public/robots.txt` would silently activate the Next.js route's site-wide GPTBot/CCBot block.
4. **RESOLVED.** Production is `https://mappedskills.com` (owner-confirmed, live-corroborated). Migration planning is no longer blocked on this. **Residual Medium issue:** `https://www.mappedskills.com` returns 200 rather than redirecting to the apex, so the site is reachable on two hostnames — mitigated by the `www` response self-canonicalising to the apex.
5. **VERIFIED FACT — the five service landing pages and `/portfolio/[slug]` emit no structured data at all.**
6. **VERIFIED FACT — no consent management exists** while GTM and Meta Pixel load unconditionally. The site's own privacy policy states a banner is required before launch.
7. **VERIFIED FACT — no tests, no ESLint configuration, and `typescript.ignoreBuildErrors: true`.** There is no automated safety net for a redesign.
8. **VERIFIED FACT (live) — CONFIRMED, and this is the current production state.** `/blog` returns HTTP 200 rendering **"No articles found"** with zero article links; `/work` shows zero case studies; `/sitemap.xml` contains **exactly 15 static URLs and no CMS URLs**; the three blog slugs hard-coded in the 404 page all return **404**. **The production site currently publishes no blog articles and no case studies.** **UNKNOWN:** whether the cause is missing/invalid Contentful credentials or an empty Contentful space — the observable outcome is identical.

9. **VERIFIED FACT (live) — NEW, escalated.** **No analytics of any kind is running in production.** `window.dataLayer`, `window.gtag` and `window.fbq` are all undefined in a real browser, there is no GTM `<noscript>` iframe, and `/contact` loads zero third-party scripts. **INFERENCE:** `NEXT_PUBLIC_GTM_ID` and `NEXT_PUBLIC_META_PIXEL_ID` are unset in production. Consequences: **no analytics baseline exists for this site**, there is no GTM container configuration to protect during migration, and — because no tracking actually fires — the consent-management gap is a **pre-launch blocker rather than a live compliance breach**.

10. **VERIFIED FACT (live) — NEW.** **There is no working conversion path on the production site.** `/schedule-call` loads the Calendly script but the inline widget container renders **empty (0 children, zero iframes on the page)**; a misplaced badge bar appears at the top of the viewport instead. The pre-hydration HTML shows the "Calendly booking link is not configured yet" fallback, which is what non-JS crawlers see. Combined with a contact form that transmits nothing, **neither documented conversion path currently functions.**

## Stack Facts Confirmed (supersedes the prior OWNER-SUPPLIED summary)
**VERIFIED FACT:** Next.js 16.2.6 App Router, React 19, TypeScript 5.7.3, Tailwind CSS v4 (CSS-first, no `tailwind.config.js`), shadcn/ui + Radix, Contentful GraphQL CMS, custom `server.cjs` Node server, deployed by GitHub Actions over SSH to cPanel/Phusion Passenger. 22 routes. No API routes, no middleware, no Server Actions.

## Session 02 — Business, Category & Competitive Validation (completed 2026-08-31)

**Purpose:** challenge and validate the emerging business direction *before* website architecture begins. The session was explicitly instructed to look for evidence the hypothesis is wrong.

### Artifacts created
- `docs/02-research/MARKET_RESEARCH.md`
- `docs/02-research/COMPETITOR_RESEARCH.md`
- `docs/02-research/SOURCE_REGISTER.md`
- `docs/01-business/STRATEGIC_VALIDATION.md`
- `docs/00-project/handoffs/SESSION_02_STRATEGIC_VALIDATION.md`

### Research recommendation (NOT approved)
**RECOMMEND MODIFY CURRENT HYPOTHESIS.**

The customer journey **GET FOUND → CONVERT → AUTOMATE → GROW** survives. The spearhead framing, the three-pillar structure, and the assumed sources of defensibility do not. Five modifications are proposed in `STRATEGIC_VALIDATION.md` §13:
1. reframe the spearhead from a technique category to an outcome, deferring the category *term* to Session 03 buyer-language evidence;
2. promote CRO from third-listed value multiplier to co-lead inside the spearhead offer;
3. demote Marketing Automation from named pillar to expansion capability;
4. treat proof architecture as the gating constraint, ahead of positioning;
5. make a segment-narrowing decision a Gate 2 requirement.

**Flagged for explicit owner attention:** the recommended direction implies an order-of-magnitude price-point and ICP change against the ₹2,500–₹5,000/month plans currently displayed on `/pricing`. This is a business-model change, not a messaging refresh.

### Session 02 method limitation (VERIFIED FACT)
Web research and direct page retrieval only. **No paid research tool, no keyword tool, no rank tracker and no AI-visibility platform was used.** No search volume, keyword difficulty, ranking, traffic, backlink or AI-citation figure was gathered for MappedSkills or any competitor, and none was estimated. Twelve competitors were examined by direct page retrieval on a single date — a purposive sample, not a census — and no competitor's revenue, retention, headcount or actual client results were independently verified. No code was read for modification, no build/lint/test was run, and no application file was changed.

### Load-bearing Session 02 findings (evidence in `SOURCE_REGISTER.md`)
1. **The buyer's problem is real and independently evidenced.** Pew Research Center (2025-07-22, 900 US adults, 68,879 searches): a traditional result was clicked in 8% of searches carrying an AI summary versus 15% without; 1% clicked a link inside the summary.
2. **Google disputes the GEO/AEO sales narrative on its own surfaces.** Google Search Central (guide last updated 2026-07-10): "optimizing for generative AI search is optimizing for the search experience, and thus still SEO", with no new files, markup, chunking or schema required.
3. **Google is nationalising the measurement.** Search Console generative-AI performance reports announced June 2026.
4. **The measurement layer is a commodity.** Otterly from $29/month and Profound from $99/month (both verified at source), plus **free** AI-visibility checkers from Ahrefs and Semrush.
5. **The headline outcome resists rank-style reporting.** SparkToro/Gumshoe research reported 2026-01-28: identical brand lists recur under 1-in-100 on repeat runs (~1-in-1,000 for identical order), while leading names still appear in 60–90% of responses for a given intent.
6. **The hypothesis is already occupied inside Pune.** upGrowth publishes a full GEO ladder (₹5K–₹35K audit → ₹4L sprint → ₹1.5L+/mo retainer → ₹3L+/mo fractional CMO) plus a named free diagnostic; SEOTonic (Pune, est. 2005) sells AI SEO, GEO, AEO, LLM visibility **and** CRO from $199/month; DigiMark (Bengaluru) leads with "SEO, CRO and AI Search Growth".
7. **No credible agency examined sells all three pillars.** Search specialists do no CRO or automation; CRO specialists do no search; automation specialists do no search.
8. **The automation moat is structural, not verbal.** HubSpot Elite requires 2,750 sourced points, 11,000 total points, 80% GRR, 100+ certified employees, and an invitation.
9. **MappedSkills' own category is a weak AI-citation surface.** Similarweb reports Professional Services under 4% citation rate, against Travel ~23% and Automotive ~20%.
10. **The binding constraint is proof, not positioning.** MappedSkills would enter *any* category with no case studies, no articles, no analytics baseline, no credential and no research asset, against competitors who have several.
11. **Organic cannot be the launch acquisition channel.** Category SERPs are owned by competitor-written listicles and directories. Organic and AI visibility are a 12-month-plus compounding engine, and any plan assuming the new website generates demand on publication is wrong.

### Largest unresolved research gap
**RESEARCH REQUIRED.** The actual magnitude of AI referral traffic versus organic search is unverified. Figures circulating in search results ("0.13% of referral traffic", "11.4% vs 5.3% conversion", "345x") were **not present** on the Similarweb page retrieved and are excluded from all Session 02 artifacts. Until this is resolved, **no MappedSkills claim that AI visibility drives revenue today is supportable.** See `SOURCE_REGISTER.md` §D for the full list of claims explicitly rejected, so they are not accidentally revived later.

### Live documentation contradiction (deliberate)
`BUSINESS_STRATEGY.md`, `POSITIONING.md`, `ICP.md`, `SERVICE_ARCHITECTURE.md`, `OFFER_ARCHITECTURE.md` and `DECISION_LOG.md` were **deliberately left unmodified** and still assert the unmodified hypothesis, which `STRATEGIC_VALIDATION.md` recommends changing. `DEC-004` remains **Proposed / Not Yet Final**.

**Any session touching business strategy, positioning, ICP, service architecture, offers, IA or content must read `docs/01-business/STRATEGIC_VALIDATION.md` alongside those documents.** Once the orchestrator decides, the five business documents should be revised **together, in one pass**, and the outcome recorded in `DECISION_LOG.md`.

## Session 03 — Search Demand, SERP & Commercial Opportunity Validation (completed 2026-08-31)

**Purpose:** determine where real organic-search opportunity exists, and use search evidence to challenge — not confirm — the business hypotheses.

### Artifacts created
- `docs/03-search/SEARCH_MARKET_RESEARCH.md`
- `docs/03-search/SERP_RESEARCH.md`
- `docs/03-search/KEYWORD_UNIVERSE.md`
- `docs/03-search/KEYWORD_PRIORITY_MATRIX.md`
- `docs/03-search/SEARCH_STRATEGY_VALIDATION.md`
- `docs/03-search/_raw_autocomplete_IN_2026-08-31.json` (raw Google Autocomplete API responses, preserved for reproduction)
- `docs/00-project/handoffs/SESSION_03_SEARCH_VALIDATION.md`
- `docs/02-research/SOURCE_REGISTER.md` — **appended** with a Session 03 addendum (S-31 … S-35). Session 02 entries were not altered.

### Research recommendation (NOT approved)
**RECOMMEND OPTION D** — vertical search-to-enquiry: *getting found and getting enquiries for industrial/B2B businesses*, with AI search as a **capability and credibility layer** rather than a category, conversion **integrated into a single outcome** rather than sold as "CRO", and **manufacturing as the leading vertical candidate requiring confirmation**.

Three qualifications attached by Claude:
- **absolute search volume is UNKNOWN** — no keyword tool was available; whether the manufacturing family can carry a business is unverified and is the largest risk to the recommendation;
- **the vertical is a leading candidate, not a validated choice** — healthcare's autocomplete is equally clean and its SERP was **not** tested;
- **Option D is gated on proof MappedSkills does not have** (a manufacturing case study, client benchmark data), which requires owner action.

### Session 03 method limitations (VERIFIED FACT)
- **SEARCH VOLUME NOT VERIFIED · KEYWORD DIFFICULTY NOT VERIFIED · CPC NOT VERIFIED.** No Ahrefs, Semrush, Keyword Planner or equivalent access existed. **No volume, difficulty or CPC figure appears in any Session 03 artifact, and none was estimated.** Demand judgements are qualitative, from Google Autocomplete depth/intent/contamination and live SERP composition.
- **Geographic lens:** session egress resolves to **Pune, Maharashtra, India (AS55836 Reliance Jio)**, confirmed via `ipinfo.io`. All autocomplete and SERP evidence is **India/Pune-localised**. The `gl=` parameter did **not** override IP localisation, so **international autocomplete was not obtained and no international SERP was observed directly.**
- **AI Overview presence could not be reliably observed** — the container rendered fallback text under automation. **No Session 03 artifact claims which queries trigger AI Overviews.** Carried to Session 04.
- No backlink or authority metric was measured; authority barriers are inferred from ranking-domain identity. Paid ads were not reliably visible and no claim is made about them. One observation per SERP, one day, one location.
- No production code was read for modification and none was changed. No build, lint or test was run.

### Load-bearing Session 03 findings
1. **Three audiences share one vocabulary, and the contamination falls precisely on the hypothesis's own terminology.** `generative engine optimization` → course, meaning, **jobs**, certification ahead of *agency*; `conversion rate optimization` → meaning, course, **jobs**; `lead automation` → entirely automation-engineering jobs; `seo consultant` → **salary, jobs** first. Ranking for these terms would attract students, job-seekers and competitors.
2. **"Search Visibility" and "organic growth" are already owned by other industries.** `search growth agency` returns **(NONE)**; `search visibility` returns **getcontact, Twitter/X, Instagram** profile settings; `organic growth agency` returns **TikTok and Twitter follower-growth services**. This is direct search evidence against the positioning territory in `POSITIONING.md`.
3. **"CRO" is a broken acronym in the Indian market.** `cro services` returns pharmaceutical **Contract Research Organisations**; `b2b cro` returns croissants and crown rings; `conversion rate optimization agency` returns **(NONE)**.
4. **AI-visibility demand resolves to free software, not agencies.** Autocomplete returns checker/score/tool/tracker/free with **no agency term in the top nine**, and page 1 of `ai visibility checker` is **ten free tools led by Ahrefs and Semrush** — including one already run by an Indian agency. **An AI Visibility Score is not a viable acquisition asset.**
5. **Buyers do not use the industry's acronyms.** They search "how to appear in ChatGPT" (8 clean variants) and "how to get cited by AI" (8 clean variants).
6. **The authority barrier is bimodal and tracks framing, not topic.** `how to improve website conversion rate` is held by CXL and Baymard; `why your website gets traffic but no leads` is held by small agencies publishing four days ago. Same discipline, opposite winnability.
7. **Specialisation substitutes for tenure — observed directly.** A 3-year-old Pune agency with 17 reviews holds a Local Pack slot for `seo agency for manufacturing companies`, beside 486- and 507-review generalists — while `seo company in pune` is held by firms trading since **1998 and 2004**.
8. **Manufacturing/industrial B2B is the cleanest commercial query family observed anywhere in the session** — eight variants, six explicitly provider-seeking, **zero contamination** — on an open SERP, in a city that is a major Indian engineering centre, with an RFQ-shaped (conversion) buyer outcome and a natural export bridge to international work.
9. **Marketing automation fails a second, independent test.** A **parked, expired domain ranks page 1** for `marketing automation agency india`; the credible ranking entity is a Salesforce implementation partner; `hubspot partner` shows buyers routing to the platform's own directory.
10. **MappedSkills' current category has strong Pune demand it is not capturing.** `digital marketing agency pune` and `performance marketing agency pune` are top autocomplete completions. **The owner-supplied absence of enquiries therefore cannot be attributed to absent search demand** — the barrier is tenure, reviews, Google Business Profile, and a website with no working conversion path.
11. **Google Search Console reporting and the local incumbents both confirm Session 02's commoditisation finding locally:** a Pune SEO incumbent (Itorix Infotech) already advertises "Local SEO, AEO & GEO strategies" on its core SEO page.

### Relationship to Session 02
Session 03 **independently corroborates Session 02's MODIFY recommendation from a different evidence base** — search behaviour rather than competitor positioning. It additionally supplies supporting evidence and a leading candidate for the **vertical narrowing decision** that Session 02 proposed as a Gate 2 requirement.

## Next Intended Phase
1. **Quality Gate 1** — orchestrator and owner review of the Session 01 + 01B evidence. Claude recommends **PASS** with owner confirmations attached; see the 01B handoff. Claude has no authority to approve the gate.
2. **Quality Gate 2** — orchestrator and owner review of `docs/01-business/STRATEGIC_VALIDATION.md`. A decision is required on each of the five proposed modifications **and** on the implied price-point/ICP change. Claude does not approve strategy.
2b. **Quality Gate 3** — orchestrator and owner review of `docs/03-search/SEARCH_STRATEGY_VALIDATION.md`. Decisions required: whether to adopt **Option D**; whether to pursue a vertical at all; and if so, whether to test **healthcare** against manufacturing before committing (healthcare's autocomplete is equally clean and its SERP was not tested). Note that Gates 2 and 3 are coupled — Session 03 corroborates Session 02 from an independent evidence base, and Option D presupposes the MODIFY decision.
3. Two owner inputs that no Claude session can produce, and which gate any premium positioning:
   - which client results, if any, may be published as case studies (`ASSUMPTIONS_AND_OPEN_QUESTIONS.md` flags AnybodyCanBake and Digibility as candidates; publishability is **UNKNOWN**);
   - whether the owner accepts the implied price-point and ICP change.
4. **Only after Gate 2 is decided:** revise `BUSINESS_STRATEGY.md`, `POSITIONING.md`, `ICP.md`, `SERVICE_ARCHITECTURE.md` and `OFFER_ARCHITECTURE.md` **together, in one pass**, and record the outcome in `DECISION_LOG.md` (updating or superseding `DEC-004`).
5. **Session 03 has now run** ahead of the Gate 2 decision, scoped as term-family testing rather than as a final keyword map, consistent with the sequencing note previously recorded here. Its findings answer questions 2–5 of `STRATEGIC_VALIDATION.md` §12; **question 1 (magnitude of AI referral traffic versus organic) remains unresolved** and is carried to Session 04.
6. **Then** commission Session 04 (AI visibility), which must answer the seven questions in `SEARCH_STRATEGY_VALIDATION.md` §20. Two prerequisites Session 03 could not satisfy: AI Overview presence must be checked **manually**, since it was not observable under automation; and international SERPs must be observed from an international vantage point, since session egress is Pune-locked.
7. No design, IA, or implementation phase should begin until the open gates are reviewed. **No sitemap, URL architecture, page inventory or content roadmap should be produced until Gates 2 and 3 are decided** — Session 03 deliberately stopped short of all four.

### Status of the two Session 01B owner confirmations
Both were addressed by the owner-supplied facts recorded above on 2026-08-31, within the limits of what the owner actually stated:
- **C1 (enquiries):** the owner states the contact form **has not been generating enquiries**. Recorded as an owner-supplied fact. Note the owner did not state that a delivery mechanism was tested, so the *technical* finding — the production form has no `action` and no `method` and transmits nothing — stands unchanged as the documented cause.
- **C8 (Contentful):** the owner states there are **no blog or case-study assets inside Contentful that must be preserved**. This resolves the **migration** question: there is no CMS content to protect. It does **not** by itself distinguish between an empty Contentful space and missing production credentials, so that root cause remains **UNKNOWN** and is a pre-launch engineering item rather than a strategy blocker.

## Open Items Explicitly Deferred (not gate-blocking)
Recorded so they are not lost, and judged safe to address during implementation rather than before strategy:
- `.htaccess` contents and host-level configuration review;
- why `www` is not normalised to the apex;
- cPanel environment-variable audit;
- Search Console verification status and property setup;
- Core Web Vitals and accessibility measurement;
- backlink inventory against the nine legacy redirect sources.

## Not Yet Approved
- Quality Gate 1 (existing site audit) — artifacts delivered, review pending;
- **Quality Gate 2 (business/category validation) — artifacts delivered, review pending;**
- **Quality Gate 3 (search demand / SERP / commercial opportunity) — artifacts delivered, review pending;**
- **the business strategy and the direction recommended in `STRATEGIC_VALIDATION.md`;**
- **the search architecture recommended in `SEARCH_STRATEGY_VALIDATION.md` (Option D), including the manufacturing vertical candidate;**
- `DEC-004` (three-pillar direction) — remains **Proposed / Not Yet Final**;
- final positioning;
- final services;
- final homepage messaging;
- final sitemap;
- final keywords;
- final content plan;
- final industries;
- final pricing;
- final design direction;
- final technical migration plan.
