# Current Project State

## Current Phase
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
| Next phase — website / search architecture | **NOT STARTED.** Not approved by the Session 06 freeze |

**Research is CLOSED for the business-strategy phase.** No further business-direction research is commissioned by this state.

### What is authoritative now
`docs/01-business/BUSINESS_STRATEGY.md` is the **primary strategic source of truth**. Alongside it, `POSITIONING.md`, `ICP.md`, `SERVICE_ARCHITECTURE.md` and `OFFER_ARCHITECTURE.md` are approved and frozen (`DEC-006`).

Any session touching IA, search architecture, content, CRO, design, copy or development must read those five documents. The research artifacts remain intact as evidence and history; **they are no longer the strategic instruction.**

### Gates not passed by Session 06
Gates 1, 3 and 4 artifacts were delivered and their conclusions were consumed by the approved strategy, but **Session 06 did not mark them passed** — that remains an orchestrator action. **No later gate (5 onwards) is passed, approached or implied by the strategy freeze.**

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

## Next Intended Phase

**Next logical phase: website and search architecture, built on the approved strategy.** It has **not** started and is **not** approved by the Session 06 freeze.

Its likely scope: information architecture and sitemap · URL architecture and migration/redirect safety · the mapping from approved capabilities to pages · search architecture and the keyword map · funnel and enquiry-path architecture. Each requires its own brief, its own gate and its own approval.

### Restrictions the next phase must respect
1. **Do not reopen the approved business direction** (`DEC-005`). Capabilities may be arranged; the proposition may not be changed.
2. **Capabilities are not pages.** `SERVICE_ARCHITECTURE.md` is a commercial system, not a navigation structure.
3. **Do not create company-level SEO/GEO/AEO/LLMO positioning.** Pages may target those queries (`DEC-008`); the company is not that category.
4. **Do not remove existing paid-media URLs** for positioning reasons. They carry SEO equity and are targets of legacy 308 redirects. Final URL decisions belong to that phase, made on migration-safety grounds.
5. **Do not build an international SEO or location strategy.** India-first; no international SERP or AI answer has ever been observed.
6. **No city-page grids, doorway pages or scaled location SEO** (Project Rule 10).
7. **Do not create a universal or blended "AI Visibility Score"** — rejected methodologically as well as commercially.
8. **Do not write final homepage copy or taglines.** Messaging is a separate, later, approval-gated phase.
9. **Do not reuse "300%+ ROI", "₹100Cr+" or "₹10Cr+"** as reasons-to-believe (`DEC-007`).
10. **Do not promise revenue, guaranteed rankings, guaranteed AI citations or guaranteed enquiry counts.**
11. **Analytics, enquiry capture and a working conversion path are a precondition** of any outcome-based claim — including on MappedSkills' own site.

### Actions that do not depend on the next phase and can begin independently
- **The listings, profiles and reviews programme** — Clutch, Semrush Agency Partners, GoodFirms, Google Business Profile and review generation. Cheapest, fastest and best-evidenced action available; needs no case study and no repositioning.
- **Fixing MappedSkills' own conversion and measurement layer** — the form that transmits nothing, the empty booking widget, the absent analytics. This is both a precondition and the first proof asset.

### Owner actions that no Claude session can produce, and which still gate premium positioning
1. **Which client results may be published**, with permissions (`AnybodyCanBake`, `Digibility`, or others). **The last remaining Session 02 owner blocker.**
2. **Whether and when to remove or substantiate** "300%+ ROI", "₹100Cr+" and "₹10Cr+" in production (`DEC-007`).
3. **Funding keyword tooling**, a second AI measurement round, and a healthcare SERP test — without which beachhead volume stays permanently UNKNOWN and the vertical choice is a default rather than a comparison.
4. **The entry-offer model decision** — free / paid / hybrid (`OFFER_ARCHITECTURE.md` §2).

### Gates
- **Gate 2 — PASSED** (2026-08-31).
- **Gates 1, 3 and 4** — artifacts delivered; their conclusions fed the approved strategy; **not marked passed by Session 06.** Orchestrator action.
- **Gates 5 onwards** — untouched, unapproached and not implied by the strategy freeze.

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
- Quality Gates 5 onwards — not started;
- **manufacturing as an exclusive or company-level specialisation** — it is candidate beachhead #1 only, gated on volume verification, a healthcare comparison, and one publishable industrial result;
- final offer names, packaging and the free/paid/hybrid entry model;
- final pricing;
- final website messaging, homepage copy and taglines;
- final information architecture, sitemap and URL architecture;
- final keyword map and content plan;
- international expansion, and any international SEO or location strategy;
- final design direction;
- the technical migration plan;
- any change to production code, content or configuration.
