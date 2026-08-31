# Claude Session Handoff — Session 03

## Session
- **Session ID:** Session 03 — Search Demand, SERP & Commercial Opportunity Validation
- **Date:** 2026-08-31
- **Model:** Claude Opus 5 (high effort)
- **Branch:** `test_branch`
- **Role:** Senior SEO strategist / search-market researcher / SERP analyst / content-strategy architect / commercial-intent researcher
- **Purpose:** Determine where real organic-search opportunity exists for MappedSkills, and use search evidence to **challenge** the business hypotheses rather than to find keywords for a strategy already preferred.

## Context Read
1. `CLAUDE.md`
2. `docs/00-project/PROJECT_CHARTER.md`
3. `docs/00-project/PROJECT_RULES.md`
4. `docs/00-project/CURRENT_STATE.md`
5. `docs/00-project/DECISION_LOG.md`
6. `docs/00-project/ASSUMPTIONS_AND_OPEN_QUESTIONS.md`
7. `docs/00-project/SOURCE_AND_EVIDENCE_POLICY.md`
8. `docs/00-project/SESSION_HANDOFF_TEMPLATE.md`
9. `docs/01-business/BUSINESS_STRATEGY.md`
10. `docs/01-business/POSITIONING.md`
11. `docs/01-business/ICP.md`
12. `docs/01-business/SERVICE_ARCHITECTURE.md`
13. `docs/01-business/OFFER_ARCHITECTURE.md`
14. `docs/01-business/STRATEGIC_VALIDATION.md`
15. `docs/02-research/MARKET_RESEARCH.md`
16. `docs/02-research/COMPETITOR_RESEARCH.md`
17. `docs/02-research/SOURCE_REGISTER.md`
18. `docs/03-search/README.md`

Also consulted for commercial context only (not reloaded in depth): `docs/10-technical/CURRENT_ROUTE_INVENTORY.md` and `lib/constants.ts` / `lib/metadata.ts`, to establish MappedSkills' current declared category and displayed price points. **No application code was read for modification and none was changed.**

## Completed Work
1. Established and documented the session's evidence constraints before researching: no keyword tool, Pune-locked egress, unobservable AI Overviews.
2. Harvested **86 Google Autocomplete seeds** (India/Pune lens) across ten query families, preserving raw API responses in the repository for reproduction.
3. Observed **thirteen live Google SERPs** in a real browser, recording page types, ranking-domain identity, People Also Ask, related searches and Local Pack composition.
4. Ran one **US-lens** WebSearch cross-check for international retainer pricing, and attempted (unsuccessfully, HTTP 403) to verify it at source.
5. Classified query families by intent (T / CI / PA / I / N / TD / RD / CAREER) and buyer sophistication.
6. Classified strategically important families for winnability across the six-band scale in the brief.
7. Identified opportunity **types** (service page, sub-service, problem/solution, comparison, article, research, tool, case study) without producing a sitemap.
8. Tested problem-led search against category search as an acquisition route.
9. Tested vertical specialisation, and tested whether the AI-search overlap is real or illusory.
10. Compared four strategic search architectures across ten criteria.
11. Built a six-dimension priority matrix using HIGH/MEDIUM/LOW/UNKNOWN with no composite scoring.
12. Separated content assets by which job they do — rank, earn citations, convert.

## Files Created
- `docs/03-search/SEARCH_MARKET_RESEARCH.md`
- `docs/03-search/SERP_RESEARCH.md`
- `docs/03-search/KEYWORD_UNIVERSE.md`
- `docs/03-search/KEYWORD_PRIORITY_MATRIX.md`
- `docs/03-search/SEARCH_STRATEGY_VALIDATION.md`
- `docs/03-search/_raw_autocomplete_IN_2026-08-31.json`
- `docs/00-project/handoffs/SESSION_03_SEARCH_VALIDATION.md` (this file)

## Files Modified
- `docs/02-research/SOURCE_REGISTER.md` — **appended** a Session 03 addendum (§F–§I, sources S-31…S-35). Session 02 entries S-01…S-30 were not altered.
- `docs/00-project/CURRENT_STATE.md` — Session 03 completion, artifacts, recommendation and method limitations recorded; Gate 3 opened. **No strategy was marked approved.**

**Deliberately NOT modified:** `BUSINESS_STRATEGY.md`, `POSITIONING.md`, `ICP.md`, `SERVICE_ARCHITECTURE.md`, `OFFER_ARCHITECTURE.md`, `DECISION_LOG.md`, `STRATEGIC_VALIDATION.md`, and all application code.

## Decisions Proposed
**RECOMMEND OPTION D** — vertical search-to-enquiry: getting found and getting enquiries for industrial/B2B businesses, with AI search as a capability and credibility layer rather than a category, conversion integrated into a single outcome rather than sold as "CRO", and **manufacturing as the leading vertical candidate requiring confirmation**.

Supporting recommendations:
- **AI Search** → capability and credibility layer, expressed through buyer-phrased questions and technical diagnostics. If any category term is targeted, `ai seo agency` — entered largely by being *listed* in the listicles that gate it.
- **CRO** → integrated as the "enquiry" half of one outcome; never marketed to Indian buyers as an acronym.
- **Marketing Automation** → removed from primary positioning; retained as an expansion capability.

## Decisions Approved During Session
**None.** Claude has no authority to approve strategy. `DEC-004` remains **Proposed / Not Yet Final**; `DECISION_LOG.md` was not modified.

## Evidence Gathered
Full register: `docs/02-research/SOURCE_REGISTER.md` §F–§I.
- **S-31** Google Autocomplete API, India/Pune lens, 86 seeds, raw data preserved (**primary**).
- **S-32** Thirteen live Google SERPs, India/Pune lens (**primary**).
- **S-33** `ipinfo.io` egress check establishing the Pune lens.
- **S-34** US-lens WebSearch on international retainer pricing (**secondary, self-interested, not verified at source**).
- **S-35** US-lens WebSearch on manufacturing conversion benchmarks (**recorded but NOT USED as evidence**).

## Tests Actually Run
**None.** No build, no lint, no test suite, no application code executed or modified. This was a research and documentation session.

## Important Findings
1. **Three audiences share one vocabulary — and the course/jobs/tool contamination falls precisely on the hypothesis's own terminology.**
2. **"Search Visibility" and "organic growth" are owned by other industries** (`search growth agency` → **(NONE)**; `search visibility` → getcontact/Twitter/Instagram; `organic growth agency` → TikTok follower services). Direct search evidence against `POSITIONING.md`.
3. **"CRO" is a broken acronym in India** — pharma Contract Research Organisations dominate; `conversion rate optimization agency` returns **(NONE)**.
4. **AI-visibility demand resolves to free software.** Page 1 of `ai visibility checker` is ten free tools led by Ahrefs and Semrush, including one run by an Indian agency. **An AI Visibility Score is not a viable acquisition asset** — Session 02 challenged it as a moat; Session 03 removes it as a traffic play too.
5. **Buyers do not use the acronyms** — they search "how to appear in ChatGPT" and "how to get cited by AI", eight clean variants each.
6. **The authority barrier is bimodal and tracks framing, not topic.** Generic CRO education is owned by CXL and Baymard; the buyer's symptom sentence is held by small agencies publishing days ago.
7. **Specialisation substitutes for tenure — observed directly.** A 3-year-old, 17-review Pune agency holds a Local Pack slot on a manufacturing query beside 486- and 507-review generalists, while `seo company in pune` is held by firms trading since 1998 and 2004. **This is the mechanism by which MappedSkills' lack of tenure stops being disqualifying.**
8. **Manufacturing/industrial B2B is the cleanest commercial query family observed** — zero contamination, open SERP, RFQ-shaped buyer outcome, Pune credibility, export bridge to international.
9. **Marketing automation fails a second independent test** — a parked expired domain ranks page 1 for `marketing automation agency india`.
10. **MappedSkills' current category has strong Pune demand it is not capturing.** The owner-supplied absence of enquiries is not an absence of demand.
11. **A Pune SEO incumbent already advertises "Local SEO, AEO & GEO strategies"** — local, first-hand confirmation of Session 02's commoditisation finding.

## Unresolved Issues
1. **All absolute volume is UNKNOWN.** No keyword tool. Whether the manufacturing family is large enough to carry a business is the **largest single risk to Option D**.
2. **AI Overview presence could not be observed** — the container returned fallback text under automation. Must be checked manually.
3. **No international SERP was observed.** Egress is Pune-locked and `gl=` did not override it. All international inference is indirect.
4. **Healthcare was not SERP-tested** despite an equally clean autocomplete profile. Manufacturing cannot be ranked against it on current evidence.
5. **No backlink or authority metric was measured** anywhere; barriers are inferred from domain identity.
6. **International retainer pricing is unverified at source** (HTTP 403).
7. **MappedSkills has no Search Console or ranking baseline** — none exists.
8. **The proof deficit persists.** The two strongest opportunities are gated on a manufacturing case study and client benchmark data, neither producible by Claude.

## Risks / Regressions
- **No code risk.** No application file was touched.
- **Documentation risk:** the business strategy documents still assert the unmodified hypothesis, now contradicted by **two** independent evidence bases. Any session reading `POSITIONING.md` or `SERVICE_ARCHITECTURE.md` without `STRATEGIC_VALIDATION.md` **and** `SEARCH_STRATEGY_VALIDATION.md` would proceed on rejected terminology. `CONTEXT_INDEX.md` may need rows for both validation documents once the orchestrator decides.
- **Over-commitment risk:** Option D is persuasive but rests on one vertical family and one SERP. It should shape a **pilot**, not a company-wide commitment, until volume and healthcare are tested.

## Assumptions Introduced
1. Google Autocomplete depth, intent composition and contamination are **valid qualitative demand signals** — but never volume measurements.
2. A `(NONE)` autocomplete response means Google does not recognise the phrase as an established query pattern. Treated as meaningful negative evidence.
3. Authority barriers can be reasonably inferred from ranking-domain identity (Forbes, PwC, Ahrefs, CXL) without measuring backlinks.
4. The Pune-localised lens approximates what a Pune-based buyer sees. It does not represent any other market.
5. AI Citation Potential ratings in the priority matrix are inferences from **query shape alone** and must be validated in Session 04 before being quoted.

## Recommended Next Task
**Quality Gate 3 — orchestrator and owner review of `SEARCH_STRATEGY_VALIDATION.md`,** decided together with Gate 2, since Session 03 corroborates Session 02 and Option D presupposes the MODIFY decision.

Decisions required:
- adopt, amend or reject **Option D**;
- whether to pursue a vertical at all, and whether to **test healthcare against manufacturing** before committing;
- whether to accept that **"Search Visibility", GEO/AEO and "CRO" are removed from Indian-facing acquisition language**;
- whether to fund a keyword tool, since absolute volume is otherwise permanently UNKNOWN.

**Then** commission **Session 04 (AI visibility)**, answering the seven questions in `SEARCH_STRATEGY_VALIDATION.md` §20, with two method prerequisites: check AI Overviews **manually**, and observe international SERPs from an international vantage point.

**Only after Gates 2 and 3 are decided** should any session produce a sitemap, URL architecture, page inventory or content roadmap.

## Next Session Should Read
1. `docs/03-search/SEARCH_STRATEGY_VALIDATION.md`
2. `docs/01-business/STRATEGIC_VALIDATION.md`
3. `docs/00-project/CURRENT_STATE.md`
4. `docs/03-search/SERP_RESEARCH.md` §0 and §11 (method limits and cross-SERP patterns)
5. `docs/02-research/SOURCE_REGISTER.md` §D and §I (claims explicitly rejected, so they are not revived)

## Stop Condition
**Session 03 stops here.** No AI visibility testing was started. No sitemap, navigation, URL architecture, page inventory, blog list, landing-page list or copy was produced. No business strategy document was modified. No production code was touched. No decision was approved.

The next session must not begin until the orchestrator and owner have reviewed Gates 2 and 3 together.
