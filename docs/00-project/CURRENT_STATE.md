# Current Project State

## Current Phase
**Session 08 Completed — CRO & QUALIFIED-ENQUIRY FUNNEL SPECIFIED. Quality Gate 6 NOT passed; Gate 5 remains OPEN.**
**Session 07 Completed — WEBSITE IA & SEARCH ARCHITECTURE PROPOSED. Quality Gate 5 OPEN, awaiting orchestrator and owner review.**
**Session 06 Completed — BUSINESS STRATEGY GATE PASSED. Business strategy documents FROZEN.**

**The owner has approved the fundamental business direction.** Recorded as `DEC-005` in `DECISION_LOG.md`:

> **MappedSkills exists to help businesses capture buyer demand and turn it into measurable qualified enquiries.**

This is an **APPROVED DECISION**. It supersedes the previous working hypotheses where they conflict, and it is not to be reopened.

### Programme status
| Phase | Status |
|---|---|
| Session 01 + 01B — existing site/codebase audit | Complete (2026-08-31). Artifacts delivered |
| Session 02 — business, category and competitive validation | **Research complete** (2026-08-31) |
| Session 03 — search demand, SERP and commercial opportunity validation | **Research complete** (2026-08-31) |
| Session 04 — AI visibility, citation and discovery baseline | **Research complete** (2026-08-31) |
| Session 05 — final strategic synthesis | **Complete** (2026-08-31). `docs/01-business/FINAL_STRATEGY_SYNTHESIS.md`, preserved unmodified as the pre-approval record |
| **Owner fundamental strategy approval** | **COMPLETE** (2026-08-31) |
| **Session 06 — business strategy freeze** | **COMPLETE** (2026-08-31). Five business documents rewritten together in one pass |
| **Quality Gate 2 — business / market validation** | **PASSED** (2026-08-31) |
| **Session 07 — website IA, search architecture & page system** | **COMPLETE** (2026-08-31). Architecture **PROPOSED, NOT APPROVED** |
| **Quality Gate 5 — information architecture** | **OPEN.** Artifacts delivered; orchestrator and owner review pending |
| **Session 08 — CRO & qualified-enquiry funnel specification** | **COMPLETE** (2026-08-31). **PROPOSED, NOT APPROVED** |
| **Quality Gate 6 — CRO architecture** | **NOT PASSED.** Artifacts delivered; orchestrator and owner review pending |
| Next phase — content architecture (Gate 7), or the technical prerequisites the funnel depends on | **NOT STARTED.** Neither is approved or implied by Session 08 |

**Research is CLOSED for the business-strategy phase.** No further business-direction research is commissioned by this state.

### What is authoritative now
`docs/01-business/BUSINESS_STRATEGY.md` is the **primary strategic source of truth**. Alongside it, `POSITIONING.md`, `ICP.md`, `SERVICE_ARCHITECTURE.md` and `OFFER_ARCHITECTURE.md` are approved and frozen (`DEC-006`).

Any session touching IA, search architecture, content, CRO, design, copy or development must read those five documents. The research artifacts remain intact as evidence and history; **they are no longer the strategic instruction.**

### Gates not passed
Gates 1, 3 and 4 artifacts were delivered and their conclusions were consumed by the approved strategy, but **Session 06 did not mark them passed** — that remains an orchestrator action.

**Gate 5 (information architecture) is OPEN, not passed.** Session 07 delivered its artifacts; Claude has no authority to approve information architecture.

**Gate 6 (CRO architecture) is NOT passed.** Session 08 delivered its artifacts. **No gate from 7 onwards is passed, approached or implied.**

## Production Website
**OWNER-SUPPLIED FACT:** the production website visitors use is **`https://mappedskills.com`**.

**VERIFIED FACT (live, 2026-08-31):** corroborated in production — the homepage canonical is `https://mappedskills.com/` and all 15 sitemap URLs use that host. `http://` redirects to `https://` (301) and HSTS is present. The `ms.mappedskills.com` reference in `doc/cpanel-deploy.md` is a repository/deployment artifact requiring explanation later, **not** an open question about the canonical production site.

**VERIFIED FACT (live):** the production edge is `Server: LiteSpeed` with HTTP/2 and HTTP/3, running Next.js behind it. Server-side ISR is functioning.

## Current Approved Business Direction
**APPROVED DECISION (`DEC-005`, 2026-08-31).**

> **MappedSkills exists to help businesses capture buyer demand and turn it into measurable qualified enquiries.**

- **Primary outcome:** measurable qualified enquiries. Revenue is measured, attributed where possible and reported — **never promised**.
- **Primary buyer:** considered-purchase businesses where each qualified opportunity has meaningful economic value, and which already have or can reasonably access market demand.
- **Core spearhead:** capture existing buyer/search demand and turn it into enquiries. Search is the strongest acquisition spearhead; **the company is not an SEO agency**.
- **AI Search:** highly visible supporting capability and differentiator — **not the company category**. No universal "AI Visibility Score" as the core proposition.
- **Conversion:** integrated into the core delivery system, in buyer/business language rather than the acronym "CRO".
- **Measurement:** a mandatory foundation of the operating model.
- **Paid media:** retained as a capability, removed from company-level positioning. **Existing paid-media URLs are not removed for positioning reasons.**
- **Automation:** limited downstream expansion capability only.
- **Vertical strategy:** horizontal proposition with vertical beachheads. **Manufacturing / industrial B2B is candidate vertical beachhead #1 — not approved exclusive specialisation.**
- **Geography:** India-first. No international SEO or location strategy yet.
- **Rejected company-level positioning:** full-service digital marketing agency · generic performance marketing agency · SEO agency · GEO/AEO/LLMO agency · marketing automation agency · RevOps consultancy · AI visibility dashboard company.

Full detail in `docs/01-business/BUSINESS_STRATEGY.md`. Full principle list in `DECISION_LOG.md` `DEC-005`.

### Superseded
The **three-pillar hypothesis** (AI + Search Visibility / CRO / Marketing Automation), the journey **"GET FOUND → CONVERT → AUTOMATE → GROW"** as a strategic structure, and the candidate line **"Get Found. Convert More. Automate Growth."** are **SUPERSEDED** and must not be reintroduced. `DEC-004` is closed as **never approved / not adopted**. The research that closed it is preserved unaltered.

## Current Positioning Status
**APPROVED at strategic level; NOT approved at copy level.**

The approved strategic sentence in the section above is a **foundation, not a headline**. **No final homepage copy, tagline, headline or page-level messaging exists or is approved.** Later messaging work may find a sharper buyer-facing articulation; the underlying meaning must be preserved.

Language rules that all later copy must obey are in `docs/01-business/POSITIONING.md` §5 and §9.

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

**Flagged for explicit owner attention — SUBSEQUENTLY WITHDRAWN.** Session 02 stated that the recommended direction implied an order-of-magnitude price-point and ICP change against "₹2,500–₹5,000/month plans currently displayed on `/pricing`".

**CORRECTION (VERIFIED FACT, Session 05 live check, applied here in Session 06):** that premise is wrong. The production `/pricing` page displays **STARTER ₹50K–₹75K/month**, **GROWTH ₹1L–₹2L/month** and Custom Pricing, with "Starting From ₹50K" in the hero and an FAQ recommending a management fee of at least ₹50K/month excluding ad spend — confirmed live. The ₹2,500/₹5,000 figures live in `PRICING_PLANS` and `GOOGLE_ADS_PRICING_TIERS` in `lib/constants.ts` and are **referenced by no file in `app/`, `components/` or `lib/`** — dead code, displayed nowhere.

**Consequence:** there is **no order-of-magnitude price or ICP change**. MappedSkills already prices in the premium Indian band. The repositioning is a **proof and messaging change, not a business-model change**, and the "price and ICP discontinuity" risk is **withdrawn** — replaced by a sharper one: **a premium price already displayed and currently unbacked by any proof.** This is a live credibility exposure at the point of sale today.

**Still outstanding:** `docs/10-technical/CURRENT_ROUTE_INVENTORY.md` line 47 and `docs/01-business/STRATEGIC_VALIDATION.md` §10/§13 carry the uncorrected premise. **Session 06 was not permitted to modify research or technical documents**, so those two corrections remain open and are recorded in `ASSUMPTIONS_AND_OPEN_QUESTIONS.md`.

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

### Live documentation contradiction — RESOLVED 2026-08-31 (Session 06)
Between Sessions 02 and 05 the five business documents were **deliberately left unmodified** and continued to assert the unmodified three-pillar hypothesis while `STRATEGIC_VALIDATION.md` recommended changing it.

**This contradiction is now closed.** All five business documents were rewritten **together, in one pass** in Session 06 against the owner-approved direction, and the outcome is recorded in `DECISION_LOG.md` as `DEC-005` … `DEC-008`. `DEC-004` is **superseded** and closed as never approved.

`STRATEGIC_VALIDATION.md` remains **unmodified as a research record**. It is evidence and history, not strategic instruction. Where it conflicts with `BUSINESS_STRATEGY.md`, `BUSINESS_STRATEGY.md` governs.

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

## Session 04 — AI Visibility, Citation & Discovery Baseline (completed 2026-08-31)

**Purpose:** determine what can actually and defensibly be measured about MappedSkills' visibility across AI-assisted discovery environments today, separating what was measured from what could not be measured.

### Artifacts created
- `docs/04-ai-visibility/AI_ACCESS_CAPABILITY.md`
- `docs/04-ai-visibility/AI_PROMPT_UNIVERSE.md`
- `docs/04-ai-visibility/AI_VISIBILITY_BASELINE.md`
- `docs/04-ai-visibility/AI_CITATION_RESEARCH.md`
- `docs/04-ai-visibility/AI_CRAWLER_POLICY.md`
- `docs/04-ai-visibility/AI_MEASUREMENT_FRAMEWORK.md`
- `docs/04-ai-visibility/AI_TOOLING_LANDSCAPE.md`
- `docs/04-ai-visibility/AI_STRATEGIC_VALIDATION.md`
- `docs/00-project/handoffs/SESSION_04_AI_VISIBILITY.md`
- `docs/02-research/SOURCE_REGISTER.md` — **appended** with a Session 04 addendum (§J–§M, sources S-36 … S-52). Session 02 and Session 03 entries were not altered.

### Research recommendation (NOT approved)
**AI SEARCH SHOULD BE A SUPPORTING CAPABILITY.**

This sits **one notch below** Session 03's "capability and credibility layer, never the category". The orchestrator should close that gap deliberately rather than let it drift. Reasoning in `AI_STRATEGIC_VALIDATION.md` §16.

### Session 04 method limitations (VERIFIED FACT)
- **Two of the six systems named in `PROJECT_CHARTER.md` were NOT TESTABLE.** `claude.ai` requires login; `grok.com` gates the first message behind sign-up and never returned an answer. **No baseline exists for Claude or Grok**, and no substitute was used for either.
- **Every system was tested SIGNED OUT**, at its lowest available tier. Gemini ran on "3.5 Flash-Lite" and exposed **no citations at all**; Perplexity's answers were markedly abbreviated; ChatGPT's model tier is undisclosed.
- **39 runs on one day inside a ~40-minute window**, from one location, in English only. **No day-to-day variance data exists** — the largest unmeasured quantity in the session.
- **Egress was Pune-locked again** (AS55836 Reliance Jio). **Session 03's international gap is NOT closed.** No Hindi or Marathi prompt was run.
- **Google surfaces exposed source domains but not anchor hrefs**, so linked-citation frequency was unmeasurable and is not reported.
- **A Google search-operator query triggered a bot check. It was NOT bypassed** and operator queries were abandoned, so **no exhaustive off-site mention count exists**.
- **No AI-visibility tool was trialled.** All vendor capability claims are unverified.
- **No production code, config or `robots.txt` was changed.** No build, lint or test was run.

### Load-bearing Session 04 findings
1. **MappedSkills has working branded retrieval and zero unbranded discovery.** Identified accurately in **7 of 8** branded runs; **0 appearances in 28 unbranded runs** across four systems and six prompt classes — including a 16-entry ChatGPT list of Pune SEO agencies. Retrieval, discovery, recommendation and citation are four different things and are not collapsed into a score.
2. **MappedSkills' AI presence is entirely retrieval-dependent.** ChatGPT with web search **disabled** did not know the company and read the name compositionally. No system tested carries it in parametric knowledge.
3. **Directory listings are the load-bearing citation source for agency prompts.** `agencies.semrush.com` appeared in **10 of 28** unbranded runs and `clutch.co` in **5** — together **15 of 28**. ChatGPT stated its own reasoning verbatim: *"Semrush... specifically identifies SEO Yodha, e intelligence, GO MO Group and others as serving manufacturing clients in India; Clutch's August 2026 B2B rankings also include e intelligence."* **MappedSkills has a profile on neither.**
4. **Selling GEO did not produce AI visibility.** upGrowth, SEOTonic and DigiMark each appeared **0 times in 28 unbranded runs**, including on GEO- and AI-SEO-specific prompts. Qoulomb — the narrow specialist — appeared 3 times.
5. **Google AI Overviews ARE observable — this closes the Session 03 blocker.** Present on national and informational queries; **ABSENT on `best SEO agencies in Pune`, which served a Local Pack instead.** For Pune local demand the observed lever is Google Business Profile, reviews and tenure — not AI optimisation. This corroborates Session 03 finding #10 from the AI surface.
6. **Within-system membership is often stable; order never was; cross-system agreement collapses.** Google AI Mode returned the same four Pune names in **3 of 3** runs with the same five source domains, in a different order each time — while **no agency appeared in three or more of the four systems tested**. A blended cross-system "AI Visibility Score" is therefore rejected on **methodological** grounds, not just commercial ones.
7. **AI systems are actively redistributing MappedSkills' unsubstantiated claims.** Google AI Mode surfaced the site's "300%+ ROI" title and Perplexity repeated it. Session 02 recorded that figure as copy of **unknown provenance**. Only ChatGPT qualified it as a self-reported marketing claim. **This is a live exposure and an owner decision.**
8. **A staging subdomain is being ingested.** Perplexity cited **`testing.mappedskills.com`** among ten sources. Verified live: resolves on the same host, returns HTTP 403 at the root and **404 for `/robots.txt`**.
9. **Crawler access is not the constraint.** Full server-rendered HTML is served to `OAI-SearchBot/1.4` and `ClaudeBot/1.0`; `robots.txt` blocks no AI crawler. **Access is necessary and demonstrably not sufficient** — every system has complete access and none mentions MappedSkills unprompted.
10. **Training crawlers and search crawlers are different and were kept separate.** `GPTBot`, `ClaudeBot`, `Google-Extended` and `CCBot` govern **training**; `OAI-SearchBot`, `Claude-SearchBot` and `PerplexityBot` govern **retrieval**. Google states verbatim that Google-Extended "does not impact a site's inclusion in Google Search". **xAI/Grok crawler policy is UNKNOWN** — no first-party documentation was found.
11. **The measurement tools now occupy the AI answer layer itself.** Google AI Mode answered *"companies that improve visibility in AI search"* with **Semrush, SE Ranking and Ahrefs** before naming any agency, and named **Profound** for *"who can help my company get found in Google and AI search"*. Session 03 found tool companies own the tool SERPs; Session 04 finds they are recommended over agencies inside AI answers.
12. **Manufacturing is thinly and unstably claimed.** Across Google AI Mode (2 runs), Perplexity and ChatGPT, **exactly one name — PageTraffic — was common to all three systems** (Techmagnate to two); AI Mode run 1 alone shared no name with Perplexity. Pune agencies do surface (Awrange in both AI Mode runs; Dimakh/Osumare/Koffeetech with street addresses), all three systems used **RFQ** language unprompted, and ChatGPT's top pick was framed for "a Pune-based industrial company". But manufacturing was also the **least stable** prompt tested (only 2 of ~5 names recurring), and the observed entry mechanism was a directory or a single listicle — **not vertical content**. Manufacturing remains a **WORKING HYPOTHESIS**; healthcare was again not tested; volume is still **UNKNOWN**.
13. **No research asset was observed being cited in any unbranded agency prompt.** Sessions 02 and 03 both proposed original benchmark research as the most durable moat. This is the first evidence gathered *against* that thesis. It is not a refutation — the prompt universe was vendor-selection-weighted — but it must be weighed at synthesis, not dropped.

### Session 02 / Session 03 open question now substantially answered
**AI referral traffic magnitude.** Ahrefs (2026-05-15), citing the chatgpt-vs-google.com panel of 74,752 websites: *"all AI chatbots combined sent 3.5 million visitors in March 2026 — just 0.28% of total web traffic"*, against Google's 345.2 million visitors and 28.12% share — **roughly 98× larger by volume**. This addresses `STRATEGIC_VALIDATION.md` §12 Q1 and `SEARCH_STRATEGY_VALIDATION.md` §20 Q7, open since Session 02.

**Caveats that must travel with the figure:** vendor blog, unaudited third-party panel, **re-verify before any client-facing use**. The accompanying conversion multipliers (23x from Ahrefs' own analytics; 185% from Buffer) are **single-company figures with self-selecting audiences and must NOT be quoted as benchmarks**.

**Two Session 02 rejections were re-tested and STAND:** the Similarweb page was re-fetched and still contains **no** "0.13% of referral traffic" and **no** "11.4% vs 5.3% conversion" figure. The rejected "345x" claim appears to have been a misreading of Google's **345.2 million** visitors.

### Relationship to Sessions 02 and 03
Session 04 **independently corroborates the MODIFY recommendation from a third distinct evidence base** — direct observation of AI answers, rather than competitor positioning (Session 02) or search behaviour (Session 03). It also corroborates Session 03's specific findings that AI-visibility demand resolves to software rather than agencies, that specialisation substitutes for tenure, and that Pune local demand is gated by Google Business Profile and reviews.

**One point of divergence the orchestrator must resolve:** Session 03 placed AI search as a "capability and credibility layer"; Session 04's direct measurement places it **one notch lower, as a supporting capability**.

## Session 05 — Final Strategic Synthesis (completed 2026-08-31)

**Purpose:** synthesise Sessions 02–04 into comparable strategic models and a single recommendation, without rerunning research.

**Artifact created:** `docs/01-business/FINAL_STRATEGY_SYNTHESIS.md`.

**Recommendation made (at the time, NOT approved):** a specialist enquiry-generation firm for considered-purchase B2B, taken to market through one vertical beachhead at a time.

**Status now:** the synthesis is the **pre-approval record**. It is preserved unmodified and must not be edited. Where it differs from the owner-approved direction — for example in treating "Enquiry Diagnostic" and "Enquiry System" as offer names, or in forcing a paid entry model — the **approved business documents govern**.

**Session 05 method limitation (VERIFIED FACT):** no research was rerun. One narrowly targeted factual check was performed — the `/pricing` verification recorded above. No business document, decision log entry or research artifact was modified in that session.

## Session 06 — Business Strategy Freeze (completed 2026-08-31)

**Purpose:** convert the owner-approved business direction into the authoritative business documents that every subsequent session will use. **Strategy was not reopened. Research was closed.**

### Owner approval received
**APPROVED DECISION:** *MappedSkills exists to help businesses capture buyer demand and turn it into measurable qualified enquiries.* Recorded with its full set of approved strategic principles as `DEC-005`.

### Files rewritten (together, in one pass)
- `docs/01-business/BUSINESS_STRATEGY.md` — now the primary strategic source of truth
- `docs/01-business/POSITIONING.md`
- `docs/01-business/ICP.md` — rewritten as an operational fit-assessment document
- `docs/01-business/SERVICE_ARCHITECTURE.md` — rewritten around the commercial system, not a service menu
- `docs/01-business/OFFER_ARCHITECTURE.md` — commercial architecture approved; names, packaging, pricing and the entry model deliberately left open

### Project files updated
`DECISION_LOG.md` (`DEC-004` superseded; `DEC-005`–`DEC-008` added) · `CURRENT_STATE.md` · `ASSUMPTIONS_AND_OPEN_QUESTIONS.md` · `QUALITY_GATES.md` · `handoffs/SESSION_06_STRATEGY_FREEZE.md`.

### Session 06 scope limitations (VERIFIED FACT)
- **No production code, configuration or content was changed.** No build, lint or test was run.
- **No research artifact was modified.** Sessions 02–04 documents and `FINAL_STRATEGY_SYNTHESIS.md` are untouched.
- **No design, IA, content or technical implementation document was modified.**
- **No new research was performed** and no new evidence was introduced.
- **No sitemap, URL architecture, page inventory, keyword map, content roadmap or website copy was produced.**
- History was not rewritten to make the approved strategy look inevitable. `DEC-004` is recorded as a reasonable hypothesis that evidence changed.

### Business strategy gate
**Quality Gate 2 (business / market validation) is marked PASSED** in `QUALITY_GATES.md`, on the basis that the repository now reflects the approved strategy consistently across the five business documents, the decision log and this state file.

## Session 07 — Website IA, Search Architecture & Page System (completed 2026-08-31)

**Purpose:** determine the complete website architecture required to deliver the approved business strategy. **Architecture only — no design, no copy, no code.** The approved business direction was **not** reopened.

### Artifacts created
- `docs/06-IA/WEBSITE_INFORMATION_ARCHITECTURE.md`
- `docs/06-IA/PAGE_INVENTORY.md`
- `docs/06-IA/PAGE_REASON_TO_EXIST_MATRIX.md`
- `docs/06-IA/CURRENT_TO_FUTURE_URL_MAP.md`
- `docs/06-IA/NAVIGATION_ARCHITECTURE.md`
- `docs/03-search/SEARCH_ARCHITECTURE.md`
- `docs/07-cro/FUNNEL_ARCHITECTURE.md`
- `docs/00-project/handoffs/SESSION_07_IA_SEARCH_ARCHITECTURE.md`

*(A narrow orchestrator correction pass was applied within Session 07 on 2026-08-31 — see "Session 07 correction pass" below. The architecture was not reopened.)*

### Major architectural recommendation (NOT approved)
**A 22-page unconditional indexable launch site — 24 if the manufacturing gate clears — organised around one outcome rather than a service menu**, with existing flat URLs preserved wherever they carry equity, and the proof deficit designed into the architecture rather than around it.

Five governing decisions:
1. `/services` is **repositioned** from an agency catalogue into the page that *is* the proposition; capability pages sit beneath it.
2. **Existing flat URLs are preserved.** Five commercial pages are already 308 targets; moving them under `/services/*` would create two-hop chains for no search benefit. Prefixed families (`/problems/`, `/industries/`, `/research/`) are introduced only where a family must scale.
3. **Launch scope is deliberately small.** The binding constraint is proof, not page count.
4. **Search landing pages and company positioning stay architecturally separate** (`DEC-008`). `/seo` and `/ai-seo` target their query families; neither is the company's category.
5. **`/research` launches with MappedSkills' own published diagnostics, `/how-it-works` becomes the published methodology including what cannot be attributed, and `/work` is NOT indexable until at least one permissioned case study exists.**

### Proposed launch inventory

| Figure | Count |
|---|---|
| **Unconditional indexable launch pages** | **22** |
| **Conditional launch pages** | **2** |
| **Non-indexable launch routes** | **5** |
| **Total routes if the manufacturing gate clears** | **29** |
| Total routes if it does not | 27 |

Of the 22 unconditional pages, 13 already exist; 9 are new. Both conditional pages are new.

| Group | Count |
|---|---|
| Homepage | 1 |
| Commercial | 8 |
| Problem | 1 |
| Proof | 4 |
| Editorial (index + 3 articles) | 4 |
| Company / conversion | 4 |
| **CONDITIONAL** (`/industries/manufacturing`, `/blog/{industrial-b2b-article}`) | **2** |
| Non-indexable (`/work` held back, `/thank-you`, `/privacy-policy`, `/terms`, 404) | 5 |

**PHASE 2:** 11 pages (13 if the manufacturing gate does not clear) · **FUTURE:** 8 · **DO NOT BUILD:** 17 named rejections.

### Determinations worth recording in state
- **No location pages of any kind.** Pune demand is decided by a Local Pack and by local listing data — Google Business Profile, reviews and complete NAP. Replaced with entity architecture, not page architecture.
- **Manufacturing gets exactly one indexable page** (`/industries/manufacturing`), classified **LAUNCH — CONDITIONAL** — not a cluster, not a grid, and **no `/industries` hub** until a second vertical exists. It ships only if the manufacturing validation gate clears before content freeze; otherwise it and its supporting article move to PHASE 2 with no other change. **Manufacturing remains candidate beachhead #1, not an approved specialisation — search evidence is not a business decision.**
- **AI Search occupies a four-surface minimum cluster** — one commercial page, two buyer-question guides, one published baseline (plus a PHASE 2 technical guide and checker). **No page per acronym or platform. No AI Visibility Score, ever.**
- **`/blog` is retained** (existing 308 target; the best-implemented SEO surface in the codebase), with `/research` added as a distinct family because the job, cadence, schema and evidence standard differ.
- **Zero tools at launch.** The `/tools/` namespace is reserved.
- **Analytics/attribution and follow-up automation get no pages** — no query family supports either, and `how to improve lead response time` returns **(NONE)**.
- **Primary conversion is qualified enquiry creation — outcome-defined and mechanism-independent.** Two surfaces satisfy it: a qualified form submission **or** a qualified meeting booking, both capturing source, landing context, interest and qualification data. Analytics distinguishes `lead_form_submitted` from `meeting_booked` while both roll into one business-level measure. The funnel is also **model-agnostic**, so the unresolved free/paid/hybrid entry decision forces no re-architecture.
- **Proof is prominently available and integrated into commercial pages — never a required navigational step.** Commercial page → qualified enquiry is the default path; commercial page → method/research → enquiry is available for evaluators who choose it. **Buyer intent determines evaluation depth.**

### Current URL decisions
**32 routes and redirect rules covered; every current route appears in the migration map.**
**KEEP 12 · REPOSITION 9 · MERGE 0 · REDIRECT 11 · RETIRE/410 0 · INVESTIGATE 4 flags.**

**Nothing is merged and nothing is retired, deliberately.** There is **no backlink, ranking, impression or traffic data for any URL on this site**, and no analytics in production. Every classification rests on intent, redirect history and strategic fit. The one structural change — consolidating `/portfolio/{slug}` into `/work/{slug}` with the legacy `/results/:slug` rule **re-pointed directly** so no chain is created — is safe only because zero case studies are currently published, and is **blocked** on enumerating the Contentful slug set.

### Session 07 method limitations (VERIFIED FACT)
- **No fresh research was performed.** Every architecture question was answered from Sessions 01–06 artifacts. **No volume, difficulty, ranking, traffic, backlink or AI-citation figure was gathered or estimated, and none appears in any Session 07 artifact.**
- **No backlink, ranking, impression or traffic data exists for any URL** — the largest limitation in the session, and the reason nothing is retired or merged.
- **The `/blog/{slug}` and `/portfolio/{slug}` slug sets are UNKNOWN;** production publishes zero of each.
- **Host-level redirects are UNKNOWN** — no `.htaccess` is committed.
- **No international lens.** All search judgements inherit Session 03's Pune-locked egress.
- **No production code, configuration or content was changed. No build, lint or test was run. No page was designed and no copy was written.**
- **The correction pass performed no research and added no page.** Its only filesystem change beyond documentation was the authorised removal of the obsolete stub IA directory.

### Session 07 correction pass (2026-08-31)
A narrow orchestrator correction pass was applied within the same session. **The architecture was not reopened, no research was performed, and no page was added.**

1. **Manufacturing reclassified LAUNCH — CONDITIONAL**, with launch counts now separating unconditional from conditional so an unvalidated business case is never folded into the headline launch number.
2. **The mandatory proof checkpoint was removed** from the funnel and from every affected document.
3. **Primary conversion redefined as qualified enquiry creation**, mechanism-independent across two surfaces.
4. **IA directory cleanup — RESOLVED.** `docs/06-information-architecture/` was inspected and contained exactly one file: a 115-byte two-line placeholder README from scaffold commit `566d3e3`, with **no substantive artifact** and no reference from any code or configuration. It was removed under explicit owner authorisation. **The project standardises on `docs/06-IA/`; one IA directory now exists.**

Unchanged by the correction pass: commercial-page decisions · problem-page decisions · geographic strategy · the AI-search cluster · research/proof architecture · schema recommendations · all current→future URL decisions · the frozen business strategy.

### Unresolved architecture decisions
1. `/work/{slug}` consolidation — requires the full Contentful case-study slug set.
2. The entry-offer model (free / paid / hybrid) — blocks a diagnostic tool; nothing else waits on it.
3. Whether `/social-media-ads` is eventually merged — needs backlink data.
4. Whether `/privacy-policy` becomes indexable.
5. Whether blog categories get real archive URLs — do not build both a parameter and a path.
6. **The manufacturing validation gate** — volume verification, a healthcare SERP comparison, and one publishable industrial result. **This determines whether the two conditional pages ship at launch or move to PHASE 2.**
7. If that gate does not clear: whether the editorial stream launches with 3 articles or a PHASE 2 article is promoted to hold the floor at 4.
8. **Whether the booking tool can carry source, landing context, interest and qualification data.** The two-surface conversion model depends on it; if it cannot, booking degrades to a secondary conversion.
9. FAQ schema eligibility — re-verify at implementation (Project Rule 19).

## Session 08 — CRO & Qualified-Enquiry Funnel Specification (completed 2026-08-31)

**Purpose:** define exactly how the website turns visitors into measurable qualified enquiries. **Specification only — no UI designed, no page or email copy written, no vendor selected, no code changed.** The frozen strategy and the approved IA were not reopened.

*Model note: the session brief specified Claude Sonnet 5; the session ran on Claude Opus 5. Recorded accurately.*

### Artifacts created
- `docs/07-cro/QUALIFIED_ENQUIRY_DEFINITION.md`
- `docs/07-cro/FORM_AND_BOOKING_SPEC.md`
- `docs/07-cro/CTA_SYSTEM.md`
- `docs/07-cro/PAGE_TYPE_CRO_RULES.md`
- `docs/07-cro/POST_SUBMISSION_AND_FOLLOWUP.md`
- `docs/12-analytics/ATTRIBUTION_MODEL.md`
- `docs/12-analytics/EVENT_TAXONOMY.md`
- `docs/13-automation/CRM_DATA_CONTRACT.md`
- `docs/13-automation/ENQUIRY_LIFECYCLE.md`
- `docs/13-automation/FOLLOWUP_ARCHITECTURE.md`
- `docs/00-project/handoffs/SESSION_08_CRO_FUNNEL_SPEC.md`

`docs/07-cro/FUNNEL_ARCHITECTURE.md` was updated with a pointer to the specification layer and three previously-open items marked resolved. **Its substance is unchanged.**

### The definition of a qualified enquiry (NOT approved)
**Website-Qualified Enquiry** — the business conversion, set automatically at submission when **all five** conditions hold: passes abuse screening · reachable identity (**email verification advisory and failing open**) · **business context (any one of** company name, website URL, or non-free-mail domain**)** · stated need · not a duplicate — and no hard disqualifier applies.

**Attribution is NOT a qualification condition.** `qualification_status` and `attribution_status` (`complete` / `partial` / `unavailable`) are **independent dimensions**. Direct traffic, a missing referrer, privacy restrictions, blocked analytics, unavailable campaign data and attribution-storage failure **can never disqualify a legitimate enquiry.** Measurement gaps are reported, never hidden by moving enquiries out of the qualified count.

**Sales-Qualified Enquiry** is a separate, human, downstream judgement against `ICP.md` §2. **The website is never reported as producing it.**

**The honest consequence:** `ICP.md` names *value per opportunity* as the single most important qualifier, and **the website cannot verify it.** It is excluded from the definition and handled in conversation rather than collected as an unverifiable self-reported number.

**Four states:** Qualified · Unqualified · Spam · Review Required. **No legitimate enquiry is ever deleted**; **Review Required does not count while unresolved**; reporting always shows all four **and breaks Qualified down by `attribution_status`**. **Confident spam creates no conversion, no CRM lead and no sales notification, and is quarantined under a defined retention policy then deleted or anonymised** — uncertain submissions go to Review Required instead.

**No scoring model** — MappedSkills has zero historical enquiries to calibrate against, so any weights would be invented.

### Determinations worth recording in state
- **Primary conversion remains qualified enquiry creation, mechanism-independent.** A qualified meeting booking is a qualified enquiry. **A booking whose attribution does not survive is still qualified** — it is recorded with `attribution_status = unavailable`. The booking capability requirements stand as a **measurement** requirement, not a qualification gate.
- **Form: 4 required fields** — name, work email, company, what you're trying to fix. **Budget is removed from the required set** (it is required in production today, is unverifiable, and cannot qualify anything). Phone is **optional on the form, required on the booking surface**. Service/problem is **pre-filled from page context, never asked**.
- **Persist-first architecture.** Validate → screen → **persist** → return success → *then* notify, email, CRM and analytics asynchronously. **A legitimate enquiry must never be silently lost because a secondary integration failed, and a false success is never acceptable.**
- **Email verification fails open.** Five outcomes — invalid / disposable / valid-looking / **verification unavailable** / suspicious. Domain-MX checking is advisory and asynchronous; **a DNS, network or API failure passes the enquiry with an advisory flag rather than rejecting it.** Disposable domains and specific negative signals route to **Review Required**, never automatic rejection. **No new visitor-facing field.**
- **Both conversion events fire server-side.** A `/thank-you` pageview can never inflate the business metric.
- **A phone click is conversion *intent*, never a qualified enquiry.** CTA clicks are diagnostic, never business conversions.
- **PII is prohibited in analytics**; an opaque `enquiry_id` is the only join to identified data.
- **Attribution: first-touch + conversion-touch, no multi-touch model**, with ten limitations published rather than hidden. Internal links must never carry UTMs, and the site's own hostnames are excluded as referrers — relevant because **`www.mappedskills.com` returns HTTP 200 rather than redirecting** and **`testing.mappedskills.com` was observed being cited by Perplexity**.
- **Lifecycle: seven stages.** System sets everything up to and including Website Qualified; **every stage beyond it is human.** No MQL stage, no scoring, no per-service funnels.
- **Follow-up: five automated touches and nothing else.** Nurture is **not built**; eligibility is recorded so it stays possible later.
- **Response time: internal target of one business day, no public numeric SLA** until one has been measured — publishing an unmeasured promise would demonstrate the failure MappedSkills sells the fix for.
- **CRM: a vendor-neutral data contract, no vendor selected.** Durable storage plus a spreadsheet would satisfy it at launch volume.

### Baseline — UNKNOWN, and no benchmark invented
**No analytics baseline exists.** Conversion rate, enquiry volume, traffic and source mix are all **UNKNOWN**. **A pre/post conversion comparison is impossible and must not be presented**; any future improvement claim must be measured from a post-launch baseline period forward. **No conversion benchmark or target was invented** — none exists in this programme's evidence base.

### Session 08 correction pass (2026-08-31)
A narrow orchestrator correction pass was applied within the same session. **The funnel strategy was not reopened, no research was performed, and no complexity was added.**

1. **Qualification separated from attribution completeness** — attribution removed as a WQE condition (six → five); `qualification_status` and `attribution_status` are now independent.
2. **Email verification fails open** — advisory, asynchronous, with uncertainty routed to Review Required rather than rejection.
3. **Spam retention made controlled** — quarantined, excluded from CRM and notifications, then deleted or anonymised under a defined retention policy.
4. **Production analytics wording corrected** — see below.

**Analytics production-state wording (corrected).** **Repository code contains GTM and Meta Pixel tracking implementation, while Session 01B live verification found no active third-party analytics scripts in production — `dataLayer`, `gtag` and `fbq` were all undefined.** Consent requirements must be implemented **before** any analytics or advertising tracking requiring consent is activated. Session 08 documents no longer state as current fact that these scripts load unconditionally in live production. **Session 01 historical audit artifacts were not altered** — the Session 01B critical findings above record the repository state and the live state separately, as they did originally.

**Preserved unchanged by the correction pass:** 4 required form fields · budget removed · phone optional · dual conversion surfaces · booking capability requirements · no weighted scoring · Website-Qualified vs Sales-Qualified · first-touch + conversion-touch attribution · UTM governance · server-confirmed conversion events · lifecycle simplicity · limited follow-up automation · no arbitrary benchmarks.

### Session 08 method limitations (VERIFIED FACT)
- **No fresh research was performed.** Two production files were read **read-only** to ground the specification: `components/forms/ContactForm.tsx` and `lib/gtm.tsx`.
- **No conversion rate, benchmark, traffic figure or industry statistic was gathered or estimated**, and none appears in any Session 08 artifact.
- **No production code, configuration or content was changed. No build, lint or test was run. No form was submitted and no page was rendered.**
- **No vendor was selected** for CRM, booking, email, analytics, consent or spam protection.

### Unresolved decisions
1. **There is no backend** — no `app/api/`, no route handler, no email capability. **Everything specified is unbuildable until a server endpoint exists.**
2. Removing budget from required fields, and phone remaining optional — both change existing production behaviour.
3. **Whether the booking tool supports runtime custom fields and a server-side webhook.** If not, booking demotes to a secondary conversion.
4. CRM selection, or the deliberate decision to defer one.
5. Internal response-time target and published business hours — an operating commitment.
6. Consent mechanism, and retention periods including the spam-quarantine duration — **privacy, security and legal review required**.
7. Length of the post-launch baseline period.

## Next Intended Phase

**Immediate: Quality Gate 5 (information architecture) and Quality Gate 6 (CRO architecture) review by the orchestrator and owner.** Neither is approved. Claude has no authority to approve either.

**On approval, two candidates:**
- **Content architecture (Gate 7)** — pillars, clusters, launch content roadmap, editorial and evidence standards; or
- **The technical prerequisites the funnel depends on** — a backend endpoint, durable enquiry storage, transactional email, and the consent mechanism.

**Recommendation: scope the technical prerequisites early.** The entire funnel specification is inert without them, and fixing MappedSkills' own conversion and measurement layer is simultaneously a launch prerequisite, the hard precondition on every outcome claim, and the first available proof asset.

### Restrictions the next phase must respect
Carried forward, plus the Session 08 specification:
1. **Do not reopen `DEC-005` or the approved IA.**
2. **Capabilities are not pages**; no page without a named query family and a reason to exist.
3. **Do not build anything in the DO NOT BUILD list** — 17 named rejections.
4. **The homepage must not rank for service terms** and must carry no technique category.
5. **`/work` stays `noindex`, out of navigation and out of the sitemap** until a permissioned case study exists.
5b. **Do not ship `/industries/manufacturing` or its supporting article** unless the manufacturing validation gate has cleared, and **never describe MappedSkills as a manufacturing agency.**
5c. **Do not make proof a required step** between a commercial page and the conversion.
5d. **Do not require one conversion mechanism.**
6. **Do not count a phone click, email click or CTA click as a qualified enquiry.**
7. **Do not fire a conversion event from a `/thank-you` pageview.**
8. **Do not put PII into analytics.**
8b. **Do not make attribution completeness a qualification condition**, and do not let an email-verification outage reject an enquiry.
8c. **Do not retain spam indefinitely, and do not send it to the CRM or to sales notifications.**
9. **Do not let a secondary integration failure lose an enquiry, and never show a false success.**
10. **Do not add form fields** without displacing one, and never re-add budget as required.
11. **Do not build nurture sequences, lead scoring or lifecycle automation** — outside the approved scope.
12. **Do not invent a conversion benchmark or a "before" figure.** Where data does not exist, write UNKNOWN.
13. **Do not publish a response-time SLA** until one has been measured.
14. **No page may promise revenue, guaranteed rankings, guaranteed AI citations or guaranteed enquiry counts**, or reuse "300%+ ROI", "₹100Cr+" or "₹10Cr+" (`DEC-007`).
15. **Do not write final homepage copy or taglines.**

### Actions that do not depend on the gates and should not wait for them
1. **The off-site listings, profiles and reviews programme** — Clutch, Semrush Agency Partners, GoodFirms, Google Business Profile. Directory sources appeared in **15 of 28** unbranded AI runs and gate the category SERPs and the Local Pack simultaneously.
2. **Fixing the conversion and measurement layer** — a working form with a real backend, a working booking path, analytics, enquiry-source capture, `/thank-you` wired up, and a consent mechanism.

### Owner actions that no Claude session can produce
1. **Which client results may be published**, with permissions. **The last remaining Session 02 owner blocker**; it gates all premium positioning and the `/work` indexation decision.
2. **Whether and when to remove or substantiate** "300%+ ROI", "₹100Cr+" and "₹10Cr+" in production (`DEC-007`). This also blocks the homepage title.
3. **Funding keyword tooling**, a second AI measurement round, and a healthcare SERP test.
4. **The entry-offer model decision** — free / paid / hybrid.
5. **Retrieving the server `.htaccess`** and the Contentful slug inventory, both of which gate the migration.
6. **Who owns enquiry response**, and the business hours to publish.
7. **Legal review** of consent, retention and WhatsApp follow-up.

### Gates
- **Gate 2 — PASSED** (2026-08-31).
- **Gates 1, 3 and 4** — artifacts delivered; conclusions consumed by the approved strategy; **not marked passed.** Orchestrator action.
- **Gate 5 — OPEN.** Artifacts delivered 2026-08-31; review pending. **Not passed.**
- **Gate 6 — NOT PASSED.** Artifacts delivered 2026-08-31; review pending.
- **Gates 7 onwards** — untouched, unapproached and not implied.

## Status of the Two Session 01B Owner Confirmations
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
Approved and closed by Session 06: the fundamental business direction (`DEC-005`), the frozen business documents (`DEC-006`), the strategic rule on unsupported claims (`DEC-007`), and the page-targets-query rule (`DEC-008`).

Still **not** approved:
- Quality Gate 1 (existing site audit) — artifacts delivered, orchestrator review pending;
- Quality Gate 3 (search demand / SERP / commercial opportunity) — artifacts delivered, orchestrator review pending;
- Quality Gate 4 (AI visibility, citation & discovery baseline) — artifacts delivered, orchestrator review pending;
- **Quality Gate 5 (information architecture) — artifacts delivered 2026-08-31, review pending. The proposed IA, page inventory, URL migration map, navigation, search architecture and funnel architecture are NOT approved;**
- **Quality Gate 6 (CRO architecture) — artifacts delivered 2026-08-31, review pending. The qualified-enquiry definition, form/booking spec, CTA system, page-type rules, attribution model, event taxonomy, CRM data contract, lifecycle and follow-up architecture are NOT approved;**
- Quality Gates 7 onwards — not started;
- **manufacturing as an exclusive or company-level specialisation** — it is candidate beachhead #1 only, gated on volume verification, a healthcare comparison, and one publishable industrial result;
- final offer names, packaging and the free/paid/hybrid entry model;
- final pricing;
- final website messaging, homepage copy and taglines;
- final information architecture, sitemap and URL architecture (proposed in Session 07, not approved);
- final keyword map and content plan;
- international expansion, and any international SEO or location strategy;
- final design direction;
- the technical migration plan;
- any change to production code, content or configuration.
