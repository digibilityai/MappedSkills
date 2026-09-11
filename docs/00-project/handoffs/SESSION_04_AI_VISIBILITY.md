# Claude Session Handoff — Session 04

## Session
- **Session ID:** Session 04 — AI Visibility, Citation & Discovery Baseline
- **Date:** 2026-08-31
- **Model:** Claude Opus 5 (high effort)
- **Branch:** `test_branch`
- **Role:** Senior AI-search strategist / SEO & AI-discovery researcher / information-retrieval analyst / brand-visibility measurement strategist / evidence-methodology designer
- **Purpose:** determine what can actually and defensibly be measured about MappedSkills' visibility across AI-assisted discovery environments **today**, and keep what was measured strictly separate from what could not be measured.

## Context Read
1. `CLAUDE.md`
2. `docs/00-project/PROJECT_CHARTER.md`
3. `docs/00-project/PROJECT_RULES.md`
4. `docs/00-project/CURRENT_STATE.md`
5. `docs/00-project/DECISION_LOG.md`
6. `docs/00-project/ASSUMPTIONS_AND_OPEN_QUESTIONS.md`
7. `docs/00-project/SOURCE_AND_EVIDENCE_POLICY.md`
8. `docs/01-business/STRATEGIC_VALIDATION.md`
9. `docs/02-research/COMPETITOR_RESEARCH.md`
10. `docs/02-research/SOURCE_REGISTER.md` (§A–§I, including §D and §I — claims explicitly rejected)
11. `docs/03-search/SEARCH_STRATEGY_VALIDATION.md`
12. `docs/00-project/handoffs/SESSION_03_SEARCH_VALIDATION.md`
13. `docs/10-technical/CURRENT_SEO_IMPLEMENTATION.md` (crawler/indexing sections only, per brief)

`MARKET_RESEARCH.md`, `SEARCH_MARKET_RESEARCH.md`, `SERP_RESEARCH.md`, `KEYWORD_UNIVERSE.md` and `KEYWORD_PRIORITY_MATRIX.md` were consulted through their conclusions as carried into `STRATEGIC_VALIDATION.md` and `SEARCH_STRATEGY_VALIDATION.md` rather than reloaded in full, per the brief's instruction not to rerun Session 03. **No application code was read for modification and none was changed.**

---

## Systems Tested

| System | Status | Runs |
|---|---|---|
| **Google AI Mode** (`udm=50`) | **DIRECTLY TESTABLE** | 25 |
| **Google AI Overviews** (classic SERP) | **DIRECTLY TESTABLE** | 4 |
| **ChatGPT** (signed out, Web search tool enabled) | **DIRECTLY TESTABLE** (signed-out tier) | 4 |
| **Perplexity** (signed out) | **PARTIALLY TESTABLE** (abbreviated answers) | 4 |
| **Gemini** (signed out, "3.5 Flash-Lite") | **PARTIALLY TESTABLE** (no citations exposed) | 2 |

**Total: 39 runs — 28 unbranded, 8 MappedSkills-branded, 2 competitor-branded.**

## Systems Inaccessible

| System | Why |
|---|---|
| **Claude** | **NOT TESTABLE IN THIS SESSION.** `https://claude.ai/new` redirects to `/login`. Account creation and credential entry are out of scope |
| **Grok** | **NOT TESTABLE IN THIS SESSION.** `grok.com` accepts a first message, then replaces the answer area with "Continue your conversation — Sign up to continue seamlessly with Grok's full power". **No answer was ever returned** |

**No substitute system was used for either, and none should be inferred from any Session 04 artifact.** Two of the six systems named in `PROJECT_CHARTER.md` therefore have **no baseline of any kind**.

---

## Methodology
1. **Ran the access capability audit first**, before any brand testing, and classified each of the six systems DIRECTLY / PARTIALLY / NOT TESTABLE. Two came back NOT TESTABLE and were left that way.
2. **Froze the prompt universe before interpreting results** — six classes (category discovery, AI-search discovery, problem discovery, vertical discovery, competitor comparison, branded factual) plus a competitor-branded control class, deliberately including prompts MappedSkills was expected to fail.
3. **Tested every system signed out**, at its lowest available tier. Enabled ChatGPT's "Web search" tool explicitly where search behaviour was under test, and ran the branded prompt **both with and without it** to separate parametric knowledge from live retrieval.
4. **Repeated three strategically important prompts** on Google AI Mode (Pune ×3, AI SEO India ×2, manufacturing ×2) to measure within-system membership and order stability.
5. **Recorded source domains per run** from rendered HTML, and tallied source-domain frequency across all 28 unbranded runs.
6. **Ran a competitor branded control** (upGrowth, SEOTonic) to test whether MappedSkills' branded footprint is actually worse than a competitor's, or whether every agency looks equally thin to an AI system.
7. **Verified crawler policy from first-party vendor documentation only**, keeping search indexing, AI answer crawling, user-triggered retrieval and model training strictly separate, and compared each against the live production `robots.txt`.
8. **Inspected the live site's entity and technical state** by direct `curl`, including requests carrying `OAI-SearchBot/1.4` and `ClaudeBot/1.0` user-agent strings.
9. **Re-tested two Session 02 rejected claims at source** rather than repeating the rejection on trust.
10. **Refused to solve a bot check.** When a Google search-operator query returned the unusual-traffic interstitial, operator queries were abandoned and no exhaustive off-site mention count is asserted.

## Files Created
- `docs/04-ai-visibility/AI_ACCESS_CAPABILITY.md`
- `docs/04-ai-visibility/AI_PROMPT_UNIVERSE.md`
- `docs/04-ai-visibility/AI_VISIBILITY_BASELINE.md`
- `docs/04-ai-visibility/AI_CITATION_RESEARCH.md`
- `docs/04-ai-visibility/AI_CRAWLER_POLICY.md`
- `docs/04-ai-visibility/AI_MEASUREMENT_FRAMEWORK.md`
- `docs/04-ai-visibility/AI_TOOLING_LANDSCAPE.md`
- `docs/04-ai-visibility/AI_STRATEGIC_VALIDATION.md`
- `docs/00-project/handoffs/SESSION_04_AI_VISIBILITY.md` (this file)

## Files Modified
- `docs/02-research/SOURCE_REGISTER.md` — **appended** a Session 04 addendum (§J–§M, sources S-36 … S-52). Session 02 entries (S-01 … S-30) and Session 03 entries (S-31 … S-35) were not altered.
- `docs/00-project/CURRENT_STATE.md` — Session 04 completion, artifacts, recommendation and method limitations recorded; Gate 4 opened; the seven Session 03 §20 questions answered or marked still open. **No positioning was marked approved.**

**Deliberately NOT modified:** `BUSINESS_STRATEGY.md`, `POSITIONING.md`, `ICP.md`, `SERVICE_ARCHITECTURE.md`, `OFFER_ARCHITECTURE.md`, `STRATEGIC_VALIDATION.md`, `SEARCH_STRATEGY_VALIDATION.md`, `DECISION_LOG.md`, `public/robots.txt`, and all application code and configuration.

## Decisions Proposed
**AI SEARCH SHOULD BE A SUPPORTING CAPABILITY.**

Supporting positions:
- **Reject** a blended cross-system "AI Visibility Score" — now on **methodological** grounds (cross-system agreement collapses) as well as the commercial grounds Sessions 02 and 03 established.
- **Reject** "average AI rank" as a metric. Order was unstable in every repeated prompt.
- **Keep** mention frequency, recommendation frequency, citation frequency, source-domain frequency and competitor co-occurrence — **per system, per prompt, with the run count published**.
- **Measurement honesty is a methodology and a proof principle, not a proposition.** Buyers were not observed asking for it.
- **The differentiator, if one exists, is the diagnostic chain and its remediation, not the score.**

## Decisions Approved During Session
**None.** Claude has no authority to approve strategy. `DEC-004` remains **Proposed / Not Yet Final**; `DECISION_LOG.md` was not modified.

## Tests Actually Run
**None.** No build, no lint, no test suite, no application code executed or modified. This was a research and documentation session.

---

## Findings

1. **Working branded retrieval, zero unbranded discovery.** MappedSkills was identified accurately in **7 of 8** branded runs and appeared in **0 of 28** unbranded runs — including a **16-entry** ChatGPT list of Pune SEO agencies and a Pune-specific industrial prompt.
2. **AI presence is entirely retrieval-dependent.** ChatGPT with web search **disabled** did not know the company and read the name compositionally. No system tested carries MappedSkills in parametric knowledge.
3. **Directories are the load-bearing citation source.** `agencies.semrush.com` in **10 of 28** unbranded runs, `clutch.co` in **5** — together **15 of 28**. ChatGPT stated its own selection reasoning verbatim. **MappedSkills has a profile on neither, and both are self-serve.**
4. **Selling GEO did not produce AI visibility.** upGrowth, SEOTonic and DigiMark each appeared **0 times in 28** unbranded runs, including on GEO- and AI-SEO-specific prompts.
5. **AI Overviews are observable — the Session 03 blocker is closed.** Present on national/informational queries; **absent on `best SEO agencies in Pune`, which served a Local Pack**. For Pune local demand the observed lever is Google Business Profile, reviews and tenure.
6. **Within-system membership is often stable; order never was; cross-system agreement collapses.** Same four Pune names in 3 of 3 AI Mode runs with the same five source domains, different order each time — yet **no agency appeared in three or more of the four systems**.
7. **AI systems are actively redistributing MappedSkills' unsubstantiated "300%+ ROI" claim.** Only ChatGPT qualified it as self-reported. **A live exposure and an owner decision.**
8. **Perplexity cited `testing.mappedskills.com`** — a staging subdomain that resolves on the same host, returns HTTP 403 at the root and **404 for `/robots.txt`**.
9. **Crawler access is not the constraint.** Full SSR HTML is served to `OAI-SearchBot/1.4` and `ClaudeBot/1.0`; `robots.txt` blocks no AI crawler. **Access is necessary and demonstrably not sufficient.**
10. **Training and search crawlers are distinct and were kept distinct.** Google states verbatim that Google-Extended "does not impact a site's inclusion in Google Search". **xAI/Grok crawler policy is UNKNOWN** — no first-party documentation exists.
11. **The tools now occupy the AI answer layer.** Google AI Mode named **Semrush, SE Ranking and Ahrefs** before any agency for "companies that improve visibility in AI search", and named **Profound** for "who can help my company get found in Google and AI search".
12. **Manufacturing is thinly and unstably claimed.** Pune agencies do surface and all three systems used **RFQ** language unprompted — but it was the **least stable** prompt tested (2 of ~5 names recurring), and every entry route observed was a directory or a single listicle, **not vertical content**.
13. **No research asset was observed being cited in any unbranded agency prompt** — the first evidence gathered *against* the Session 02/03 research-moat thesis. Not a refutation; the prompt universe was vendor-selection-weighted. **Must be weighed at synthesis, not dropped.**
14. **AI referral magnitude is now substantially answered.** ~0.28% of web traffic against Google's 28.12% in March 2026 — **~98× smaller by volume** — closing a question open since Session 02, with vendor-source caveats attached.

---

## Unresolved Issues
1. **No baseline for Claude or Grok.** Two of six charter systems. Requires paid accounts or paid tooling.
2. **No signed-in tier tested on any system.** Direction of bias UNKNOWN.
3. **No day-to-day variance data.** All repeats sit inside one ~40-minute window. **The largest unmeasured quantity in the session.**
4. **No international lens, again.** Egress Pune-locked. **Session 03's international gap is unchanged.**
5. **No Hindi or Marathi prompts**, despite Google AI Mode being live in those languages in India.
6. **Healthcare was again not tested**; manufacturing still cannot be ranked against it.
7. **Manufacturing search volume is still UNKNOWN** — no keyword tool in this session either. Option D's largest risk is untouched.
8. **Whether AI-citation weakness in professional services extends to industrial categories** — no equivalent figure found. **RESEARCH REQUIRED.**
9. **Google Business Profile status is inferred absent, not verified.** Owner confirmation required.
10. **No exhaustive off-site mention count** — the operator query hit a bot check that was not bypassed.
11. **Linked-citation frequency is unmeasurable** in this environment; only domains were recoverable on Google surfaces.
12. **No AI-visibility tool was trialled**; all vendor capability claims are unverified.
13. **The proof deficit persists** and remains the binding constraint across Sessions 02, 03 and 04.

## Risks / Regressions
- **No code risk.** No application file, config file or `robots.txt` was touched.
- **Live reputational exposure:** the unsubstantiated "300%+ ROI" claim is being redistributed by at least two AI systems as a description of the company. This is not a copy edit — it is an owner decision.
- **Documentation risk unchanged and now larger:** the business strategy documents still assert the unmodified hypothesis, now contradicted by **three** independent evidence bases. Any session reading `POSITIONING.md` or `SERVICE_ARCHITECTURE.md` without `STRATEGIC_VALIDATION.md`, `SEARCH_STRATEGY_VALIDATION.md` **and** `AI_STRATEGIC_VALIDATION.md` would proceed on rejected terminology.
- **Over-reading risk:** 28 nulls at this sample size, at signed-out tiers, on one day, with two systems untested, is a real and complete absence *in this sample*. It is not proof that AI visibility is the binding commercial constraint — MappedSkills is equally absent from the ordinary Local Pack.
- **Latent engineering risk carried forward unchanged from Session 01B:** deleting `public/robots.txt` during a redesign would silently activate the inert `app/robots.ts` site-wide `GPTBot`/`CCBot` block.

## Assumptions Introduced
1. A signed-out surface is a **valid but lower-bound** observation of what a system returns; where a signed-in user gets a different model, this session understates answer quality. **Direction of bias on brand selection is UNKNOWN.**
2. Source domains parsed from rendered HTML are the domains the system attributed its answer to. **Exact URLs were not captured on Google surfaces.**
3. Three runs is sufficient to distinguish "appeared once" from "appeared every time" and **nothing more**. It is not a rank measurement.
4. The local-vs-national AI Overview pattern rests on **four query observations** and is a **WORKING HYPOTHESIS**, not a measurement.
5. Entity defects (empty `sameAs`, malformed `postalCode`, no surfaced GBP) are recorded as **consistent with** the observed absence, never as its cause. Google states no special markup is required.
6. `agencies.semrush.com` (a directory listing) and `SemrushBot` (a crawler blocked in `robots.txt`) are **entirely separate things** and were not conflated.

## Recommended Next Task
**Quality Gate 4 — orchestrator and owner review of `docs/04-ai-visibility/AI_STRATEGIC_VALIDATION.md`, decided together with Gates 2 and 3**, since all three now corroborate one another from independent evidence bases.

Decisions required:
- adopt, amend or reject **AI SEARCH AS A SUPPORTING CAPABILITY**, and explicitly close the one-notch gap against Session 03's "capability and credibility layer";
- whether to pursue the **directory/listing route** (Semrush Agency Partners, Clutch, GoodFirms), which is what the evidence shows drives selection and which requires no proof asset to begin;
- what to do about the **unsubstantiated on-site claims** now being redistributed by AI systems;
- whether **analytics will be implemented before any AI-visibility offer is sold**, since nothing in the visibility→revenue chain is measurable without it;
- whether to **fund keyword and multi-system AI tooling**, without which volume stays UNKNOWN and Claude/Grok stay unmeasured.

**Then** the **final strategic synthesis of Sessions 02–04**, whose required inputs are listed in `AI_STRATEGIC_VALIDATION.md` §15.

## Next Session Should Read
1. `docs/04-ai-visibility/AI_STRATEGIC_VALIDATION.md`
2. `docs/03-search/SEARCH_STRATEGY_VALIDATION.md`
3. `docs/01-business/STRATEGIC_VALIDATION.md`
4. `docs/00-project/CURRENT_STATE.md`
5. `docs/04-ai-visibility/AI_VISIBILITY_BASELINE.md` §10 and `AI_CITATION_RESEARCH.md` §5 (what the baseline does not establish; where citations actually come from)
6. `docs/02-research/SOURCE_REGISTER.md` §D, §I and **§M** — the three lists of claims explicitly rejected or left open, so none is accidentally revived

## Stop Condition
**Session 04 stops here.** No strategy synthesis was begun. No business strategy document was modified. No sitemap, navigation, URL architecture, page inventory, content roadmap or copy was produced. No production code, config or `robots.txt` was changed. No decision was approved.

The synthesis must not begin until the orchestrator and owner have reviewed Gates 2, 3 and 4 together.
