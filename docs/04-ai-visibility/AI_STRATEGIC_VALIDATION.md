# AI Strategic Validation — Session 04

**Session:** 04 — AI Visibility, Citation & Discovery Baseline
**Date:** 2026-08-31
**Branch:** `test_branch`
**Status:** RESEARCH RECOMMENDATION — **not** an approved decision. Claude does not approve strategy.
**Evidence:** `AI_ACCESS_CAPABILITY.md`, `AI_PROMPT_UNIVERSE.md`, `AI_VISIBILITY_BASELINE.md`, `AI_CITATION_RESEARCH.md`, `AI_CRAWLER_POLICY.md`, `AI_MEASUREMENT_FRAMEWORK.md`, `AI_TOOLING_LANDSCAPE.md`, `docs/02-research/SOURCE_REGISTER.md` §J–§L
**Documents deliberately NOT modified:** `BUSINESS_STRATEGY.md`, `POSITIONING.md`, `ICP.md`, `SERVICE_ARCHITECTURE.md`, `OFFER_ARCHITECTURE.md`, `STRATEGIC_VALIDATION.md`, `SEARCH_STRATEGY_VALIDATION.md`, `DECISION_LOG.md`

---

## 1. What was actually testable

Four systems produced answers. Two did not.

| System | Status |
|---|---|
| **Google AI Mode** (`udm=50`) | **DIRECTLY TESTABLE.** 25 runs. Source domains recoverable |
| **Google AI Overviews** | **DIRECTLY TESTABLE.** 4 observations. **This closes Session 03's blocker** |
| **ChatGPT** (signed out, Web search tool explicitly enabled) | **DIRECTLY TESTABLE** at the signed-out tier. 4 runs. Citations recoverable |
| **Perplexity** (signed out) | **PARTIALLY TESTABLE.** 4 runs. Best citation exposure; **answers markedly abbreviated** at the signed-out tier |
| **Gemini** (signed out) | **PARTIALLY TESTABLE.** 2 runs on the reduced **"3.5 Flash-Lite"** tier. **No citations exposed at all** |
| **Claude** | **NOT TESTABLE IN THIS SESSION.** `claude.ai` requires login |
| **Grok** | **NOT TESTABLE IN THIS SESSION.** Sign-up gate on the first message; no answer was ever returned |

**39 runs total: 28 unbranded, 8 MappedSkills-branded, 2 competitor-branded.**

## 2. What was not testable

- **Claude and Grok — two of the six systems named in `PROJECT_CHARTER.md` — have no baseline of any kind.** No substitute was used and none should be inferred.
- **No signed-in tier on any system.** Every observation is the lowest available tier; direction of bias is UNKNOWN.
- **No international lens.** Egress was Pune-locked exactly as in Session 03, so Session 03's international gap is **not** closed.
- **No Hindi or Marathi prompts**, despite Google AI Mode being documented as live in those languages in India.
- **No exhaustive off-site mention count.** A Google search-operator query triggered a bot check, which was **not** bypassed; operator queries were abandoned.
- **No day-to-day variance.** All repeats sit inside one ~40-minute window.
- **Healthcare was again not tested**, so manufacturing still cannot be ranked against it.

---

## 3. MappedSkills' current AI-discovery baseline

Four layers, deliberately not collapsed into one number.

| Layer | Result |
|---|---|
| **Branded retrieval** | **WORKS.** 7 of 8 branded runs returned a substantially accurate description. Gemini identified the company from the bare brand name with no domain supplied |
| **Unbranded discovery** | **ZERO.** 0 appearances in **28** unbranded runs across four systems and six prompt classes — including a **16-entry** ChatGPT list of Pune SEO agencies and a Pune-specific industrial prompt |
| **Recommendation** | **ZERO** |
| **Citation** | **ZERO.** `mappedskills.com` was never used as a source in an unbranded answer |
| **Accuracy** | Broadly correct, with **two material problems** |

**The one branded failure is diagnostic:** ChatGPT with web search **disabled** did not know what MappedSkills is and interpreted the name compositionally. **MappedSkills' AI presence is entirely retrieval-dependent.** No system tested carries it in parametric knowledge.

**The two accuracy problems are both live exposures, not theoretical ones:**

1. **AI systems are redistributing MappedSkills' unsubstantiated claims.** Google AI Mode surfaced the site's own "300%+ ROI" title, and Perplexity wrote that MappedSkills "emphasize measurable outcomes (e.g., '300%+ ROI')". Session 02 recorded that figure as on-site copy of **unknown provenance**. ChatGPT was the only system to add the qualification that these are self-reported marketing claims. Because branded answers are built almost entirely from first-party sources, **whatever the site asserts is what AI systems will repeat.**
2. **A staging subdomain is being ingested.** Perplexity cited **`testing.mappedskills.com`** as one of ten sources. Verified live: it resolves on the same host, currently returns HTTP 403, and returns **404 for `/robots.txt`** — it has never had a robots file.

**Access is not the constraint.** Full server-rendered HTML was returned to `OAI-SearchBot/1.4` and `ClaudeBot/1.0`; `robots.txt` blocks no AI crawler. **Every system tested has complete access to the site and none of them mentions it unprompted.**

---

## 4. Competitor baseline — the awkward result

| Competitor | Branded retrieval | Unbranded appearances in 28 runs |
|---|---|---|
| **upGrowth** (Pune; publishes a full GEO price ladder and a named diagnostic tool) | Full — own site, LinkedIn, JustDial | **0** |
| **SEOTonic** (Pune; sells AI SEO, GEO, AEO, LLM visibility from $199/mo) | Full — own site, LinkedIn | **0** |
| **DigiMark** (Bengaluru; "SEO, CRO and AI Search Growth" headline) | not tested | **0** |
| **Qoulomb** (narrow AI-search specialist; no CRO, no automation) | not tested | **3** |

Names that actually recurred instead: Techmagnate (7 runs), Awrange (6), PageTraffic (5), Opstech, OMX, Ad2brand, RepIndia, TripleDart.

**Two findings follow, and they point in opposite directions for MappedSkills.**

**The reassuring one:** MappedSkills' *branded* source footprint — own site plus LinkedIn plus a directory — is **not materially worse than either Pune competitor's**. The branded layer is not where it is behind.

**The consequential one:** **selling GEO did not produce AI visibility.** The two agencies Session 02 identified as already occupying the AI + Search Visibility position in Pune appeared **zero times in 28 unbranded runs, including on GEO- and AI-SEO-specific prompts**. Whatever drives selection in AI answers, category positioning is not observably it.

---

## 5. Manufacturing hypothesis — findings

Tested, not promoted. **Manufacturing remains a WORKING HYPOTHESIS and is not approved.**

**Supportive:**
- **The category is thinly and unstably claimed.** Across Google AI Mode (2 runs), Perplexity and ChatGPT, the recommended sets for Indian manufacturing SEO overlapped in **exactly one name — PageTraffic — common to all three**. AI Mode run 1 in isolation shared **no name** with Perplexity. Techmagnate was common to Perplexity and ChatGPT only. **There is no entrenched AI-answer incumbent.**
- **Pune agencies do surface.** Awrange appeared in both AI Mode manufacturing runs. The Pune-specific industrial prompt returned Dimakh, Osumare and Koffeetech **with full street addresses**. ChatGPT's top pick was Keyword Riser, explicitly framed as suitable "for a Pune-based industrial company".
- **Specialisation carries across surfaces.** Passion Minds — the manufacturing-specialist Session 03 observed holding a Google Local Pack slot — also appears in ChatGPT's Pune list. Session 03's "specialisation substitutes for tenure" finding is corroborated on a second, independent surface.
- **The buyer's outcome word is the AI systems' own word.** Google AI Mode, ChatGPT and Perplexity all used **RFQ / Request for Quotation** unprompted, alongside dealer enquiries and export orders. Session 03's RFQ framing is validated in the AI layer.
- **This is the one prompt family where an AI Overview *is* served** (unlike the Pune local queries).

**Adverse, and it matters:**
- **Manufacturing was the *least* stable prompt tested.** Across two Google AI Mode runs only **2 of ~5** names recurred; six of eight names appeared once. An unclaimed category is also an unstable one, and instability cuts both ways — it is easy to enter and hard to hold.
- **The entry mechanism is not vertical content.** Every observed manufacturing answer traced back to a **directory or a single listicle** — Clutch in the AI Overview, `agencies.semrush.com` in AI Mode and ChatGPT, `xsquareseo.com` supplying **4 of 4** attributions in Perplexity. ChatGPT said so explicitly.
- **Session 03's core unknown is untouched.** Whether the manufacturing family carries enough volume to sustain a business is still **UNKNOWN**. No keyword tool was available in this session either.
- **Healthcare was again not tested.**

**Conclusion:** the AI evidence is **consistent with** Session 03's Option D and adds a Pune-specific corroboration Session 03 could not obtain. It does **not** independently validate the vertical, and it does not resolve the volume question that Session 03 named as Option D's largest risk.

---

## 6. Source and citation patterns

**The load-bearing finding of the session.** Selection in unbranded agency prompts traced to three mechanisms, none of which is website content:

1. **Directory and marketplace listings.** `agencies.semrush.com` appeared in **10 of 28** unbranded runs; `clutch.co` in **5**; GoodFirms in 2. Together Semrush Agency Partners and Clutch appear in **15 of 28**. ChatGPT stated its own reasoning aloud: *"Semrush… specifically identifies SEO Yodha, e intelligence, GO MO Group and others as serving manufacturing clients in India; Clutch's August 2026 B2B rankings also include e intelligence."* **MappedSkills has a profile on neither.**
2. **Single-listicle dominance.** One third-party list frequently supplied an entire answer. The clearest case: `thirdmeta.in` supplied four attributions for *alternatives to upGrowth*, and **ThirdMeta is both the dominant cited source and a recommended brand inside its own list.**
3. **Local business listing data.** ChatGPT's Pune answer was a **16-entry list with star ratings and review counts**. Google served a **Local Pack and no AI Overview** for the same query.

**What did *not* drive citations:** Reddit (zero appearances in 28 runs, despite Session 03 finding it a page-one competitor on question queries); AI-specific markup or `llms.txt`; GEO/AEO positioning; original research.

**That last absence deserves flagging rather than burying.** Sessions 02 and 03 both proposed original benchmark research as MappedSkills' most durable moat. **Session 04 looked for research assets being cited in unbranded agency prompts and found none.** The prompt universe was vendor-selection-weighted and research earns authority through channels this session did not measure — so this is not a refutation. It is the first evidence gathered *against* the moat thesis, and it should be weighed at synthesis rather than dropped.

**Structural conclusion:** MappedSkills' own website is already sufficient for the branded layer and worth **nothing** in the unbranded layer. **Future AI visibility requires authority outside its own website.**

---

## 7. Crawler implications

The four mechanisms are documented and distinct: **search indexing**, **AI answer/search crawling**, **user-triggered retrieval**, and **model training**.

- **Retrieval, not training, is what governs today's answers.** `OAI-SearchBot`, `Claude-SearchBot` and `PerplexityBot` are the tokens with a documented visibility consequence. `GPTBot`, `ClaudeBot`, `Google-Extended` and `CCBot` govern **training** and have no effect on current retrieval.
- **Google-Extended does not affect Search.** Google states verbatim that it "does not impact a site's inclusion in Google Search nor is it used as a ranking signal in Google Search."
- **AI Overviews and AI Mode have no separate control.** Google states there are "no additional requirements to appear"; eligibility follows from indexing and snippet eligibility, and the only documented controls (`nosnippet`, `data-nosnippet`, `max-snippet`, `noindex`) are general preview controls. **There is no documented way to leave AI Overviews while keeping normal snippets.**
- **xAI/Grok is UNKNOWN.** No first-party crawler documentation was located.
- **Production state:** `public/robots.txt` allows every crawler and names **no AI crawler at all**; `app/robots.ts` remains inert dead code containing a latent site-wide `GPTBot`/`CCBot` block that would activate silently if the static file were deleted. **Nothing was changed.**
- **The decisive point: access is necessary and demonstrably not sufficient.** Every system tested has complete access to `mappedskills.com`, and MappedSkills appeared in **zero of 28** unbranded runs. **No agency should sell crawler configuration as the route to AI visibility, and this session's own baseline is the counter-example.**

---

## 8. Measurement reliability

**Two results define what is honestly measurable.**

**Within a system, membership is often stable; order never was.** On Google AI Mode: `best SEO agencies in Pune` returned the **same four names in 3 of 3 runs** with the **same five source domains in 3 of 3** — but a different order every time. `best AI SEO agencies in India` recurred 4 of ~5. `best SEO agencies for manufacturing` recurred only **2 of ~5**.

**Across systems, agreement collapses.** For the same prompt, same day, same location, **no agency appeared in three or more of the four systems.** On manufacturing, AI Mode and Perplexity shared **no names**.

Consequences:
- **Mention frequency, recommendation frequency, source-domain frequency and competitor co-occurrence are measurable** — per system, per prompt, with the run count published.
- **"Average AI rank" must be rejected.** Order was unstable in every repeated prompt.
- **A single blended cross-system "AI Visibility Score" must be rejected on methodological grounds**, not merely commercial ones. Blending destroys the only stable signal.
- **Stability is a property of the prompt.** Reporting a ~40%-stable prompt with the same confidence as a ~100%-stable one is the category's core dishonesty.

---

## 9. Measurement tooling landscape

Verified at source: **Profound** $99/mo (one engine — ChatGPT — 50 prompts) / $399/mo (three engines) / Enterprise custom (up to nine, including Claude and Grok). **Semrush AI Visibility Toolkit** "$99/mo per domain billed annually", 25 prompts, covering ChatGPT, Google AI, Gemini and Perplexity. Carried from Session 02: Otterly $29–$489/mo; **free** checkers from Ahrefs and Semrush.

**Neither vendor publishes a run-to-run variance methodology, and both use ranking language.**

Two things this session adds to Session 02's commoditisation finding:

1. **The tools now occupy the AI answer layer itself.** Google AI Mode answered *"companies that improve visibility in AI search"* with **Semrush, SE Ranking and Ahrefs** before naming any agency, and answered *"who can help my company get found in Google and AI search"* by naming **Profound**. Session 03 found tool companies own the tool SERPs; Session 04 finds they are being recommended over agencies inside AI answers.
2. **Multi-system coverage is a real cost of goods.** A signed-out manual method **cannot reach Claude or Grok at all** and reaches Gemini with **no citations**. Any offer promising the charter's six systems must buy that coverage, and whether the Indian price point supports it is **UNKNOWN**.

---

## 10. The proprietary measurement hypothesis

| Candidate | Commodity or differentiated? | Useful internally? | Lead magnet? | Paid diagnostic? | Defensible? | Data/method required |
|---|---|---|---|---|---|---|
| **AI Visibility Score** | **Commodity.** Free from Ahrefs and Semrush; $99/mo professionally. And now **rejected on method** (§8) — a blended score destroys the only stable signal | Only if per-system and variance-aware | **No.** Session 03 found the tool SERP is ten free tools; Session 04 finds AI answers name the tools too | Weak | **No** | — |
| **Search Visibility Audit** | Commodity as a format; every competitor audits, upGrowth prices discovery at ₹5K–₹35K | Yes | Weak — Session 03 found `seo audit` demand is dominated by "free" | **Yes, if the differentiator is the diagnostic chain** | Only via method and evidence | Repeatable protocol |
| **AI Citation Tracker** | **The most differentiated of the four, and the least glamorous** | **Yes — highest internal value found.** Source-domain frequency is the one metric that told MappedSkills *what to do* | Possibly, if narrow and specific | **Yes** | Partially | Source-domain capture across repeated runs per system |
| **Competitor Visibility Benchmark** | Differentiated **only with accumulated history** | Yes | Yes | Yes | **Yes, but only over time** — Session 02's compounding-dataset argument survives intact | Repeated runs, frozen prompts, quarters of history |

**No trademark-style naming is recommended.** Session 02 already recorded that named frameworks are table stakes.

**The strongest finding here is not on the list.** What produced actionable value in this session was **the diagnostic chain, not the score**: absent from 28 unbranded runs → because the sources are directories and local listings → and MappedSkills has no Clutch profile, no Semrush Agency Partners profile, no surfaced Google Business Profile, an empty `sameAs` array on both schema blocks, a `postalCode` field containing the word "India", and a staging subdomain being cited as a source. **A tool reports the absence. Nobody in the sample sells the chain.**

---

## 11. The measurement-honesty hypothesis

Session 02 proposed honest, variance-aware measurement as an unclaimed position. Session 04 tested it.

**Confirmed as fact:** the position is genuinely unclaimed. Neither Profound nor Semrush publishes variance. Both report "ranking". This session's own data shows order is unstable in every repeated prompt and cross-system agreement is near zero.

**But the commercial question is the one the brief insists on: what problem does it solve for a buyer?**

The honest answer is that measurement honesty is **not a proposition**. A Pune manufacturer looking for RFQs does not have a methodology problem. Nothing in this session suggests buyers ask about variance; Session 03 found the surrounding search demand is for **free checkers**, not for rigour.

Verdict, layer by layer:
- **As positioning — NO.** It answers a question buyers are not asking.
- **As methodology — YES, mandatory.** Any number MappedSkills publishes must be variance-aware or it is indefensible.
- **As a proof principle — YES, and this is its real value.** Saying "rank in AI is not a real number, here is the frequency across *n* runs" is a **credibility demonstration**, cheap to make and true.
- **As a content angle — LIMITED**, and constrained by the same authority barrier Session 03 documented.
- **As a diagnostic differentiator — YES, but only fused with remediation** (§10).
- **As internal best practice — YES, unconditionally.**

**It is a way of doing the work that earns trust. It is not a reason a buyer calls.**

---

## 12. AI visibility versus business value

**These four layers must never be collapsed, and this session can now put a number on the first gap.**

**AI visibility → AI referral traffic.** Ahrefs (published 2026-05-15), citing the chatgpt-vs-google.com panel of 74,752 websites: *"all AI chatbots combined sent 3.5 million visitors in March 2026—just 0.28% of total web traffic"*, against Google's 345.2 million visitors and 28.12% share — **roughly 98× larger by volume**. This substantially answers the question carried unresolved from `STRATEGIC_VALIDATION.md` §12 Q1 and `SEARCH_STRATEGY_VALIDATION.md` §20 Q7. It is a vendor blog citing an unaudited third-party panel, and should be re-verified before any client-facing use.

**Incidental correction:** the "345×" claim Session 02 explicitly rejected appears to have been a misreading of Google's **345.2 million visitors**. The defensible figure in this source is **~98× by volume for March 2026**. The rejected claim should stay rejected in the form it was stated.

**AI referral traffic → qualified enquiries.** Ahrefs reports its own visitors: *"AI search visitors accounted for just 0.5% of total visitors but drove 12.1% of signups"* (~23×); Buffer reports 20.15% versus 7.06%. **Both are single-company figures with self-selecting audiences — an SEO tool company and a social-media tool company, whose visitors are disproportionately AI-curious marketers. Neither generalises to a Pune manufacturer, and neither should be quoted to a client as a benchmark.**

**Qualified enquiries → revenue.** Nothing in this session speaks to it.

**For MappedSkills specifically, all four layers are currently zero or unmeasurable**: zero unbranded AI appearances, **no analytics in production at all** (Session 01B), and neither documented conversion path functioning. **No claim that AI visibility produces revenue for MappedSkills today is supportable, and none is made.**

**Attribution that would eventually be required:** analytics in production at all (the absolute precondition); referrer/landing-page capture able to distinguish AI-assistant referrals; UTM discipline; server-log separation of AI *crawlers* from AI *referrals* — the crawler taxonomy in §7 is what makes that possible; enquiry-source capture in the form itself; and a CRM able to carry source through to closed revenue. **Not one of these exists today.** Any AI-visibility offer sold before analytics exists would be unmeasurable by MappedSkills' own standard.

---

## 13. The strategic role AI Search should play

On this session's evidence, AI Search is:

- **Real, and growing.** ~0.28% of web traffic and rising; AI Overviews are live on national and informational Indian queries; AI Mode answers every query it is asked.
- **Small, relative to Google organic.** ~98× smaller by volume as of March 2026.
- **Structurally hostile to agency positioning.** The tools are recommended over the agencies inside AI answers themselves.
- **Not where MappedSkills' local demand is decided.** The highest-intent Pune query returns a **Local Pack and no AI Overview**. The observed lever there is Google Business Profile, reviews and tenure.
- **Not something the two local GEO-selling competitors have actually won** — 0 of 28 for both.
- **Genuinely useful as a diagnostic and as delivery competence**, where the training/retrieval distinction, crawler taxonomy, entity hygiene and variance-aware method are correct, demonstrable and cheap to prove.

That is the profile of a **supporting capability**: something to deliver well, measure honestly and mention as evidence of currency — not something to build a company's proposition on.

**Relationship to Session 03.** Session 03 recommended AI search as "a capability and a credibility layer — never the category". Session 04 **corroborates that from direct measurement and lands slightly lower**, for three reasons Session 03 could not observe: AI answers now recommend the measurement tools over agencies; the Pune local surface serves no AI Overview at all; and the competitors who sell GEO have no AI visibility to show for it. The difference between "major differentiated capability" and "supporting capability" is small but real, and the orchestrator should decide it deliberately rather than let it drift.

---

## 14. Major limitations

1. **Two of six charter systems — Claude and Grok — were NOT TESTABLE.** No baseline exists for either.
2. **Every observation is at a signed-out tier**; Gemini ran on "3.5 Flash-Lite" and exposed **no citations**; Perplexity's answers were abbreviated.
3. **One day, one location, English only.** 39 runs. No day-to-day variance data whatsoever — the largest unmeasured quantity in this session.
4. **Domain-level citations only** on Google surfaces. Linked-citation frequency is unmeasurable here and is not reported.
5. **Pune-locked egress.** Session 03's international gap is unchanged.
6. **No causal claim anywhere.** The entity defects in §3 are *consistent with* the absence in §3; that is all. Google's own documentation says no special markup is required.
7. **The AI-referral figures are vendor-published and unaudited**; the conversion multipliers are single-company anecdotes.
8. **Healthcare untested**; manufacturing volume still **UNKNOWN**.
9. **The prompt universe is vendor-selection-weighted**, which may understate how research assets earn citations.
10. **No AI-visibility tool was trialled.** Every vendor capability claim is unverified.

---

## 15. Inputs required for the final strategic synthesis

1. **A Gate 2 / Gate 3 decision.** Sessions 02, 03 and 04 now agree from three independent evidence bases; the business documents still assert the unmodified hypothesis.
2. **Whether AI search is a supporting or a major differentiated capability** — the one place Session 04 lands lower than Session 03.
3. **Whether MappedSkills will pursue the directory/listing route**, which is what this session actually found drives selection, and which requires no proof asset to begin.
4. **Owner confirmation of Google Business Profile status** — inferred absent, not verified, and it is the mechanism behind every local prompt observed.
5. **A decision on the unsubstantiated on-site claims.** "300%+ ROI" is being actively redistributed by AI systems. This is now a live exposure, and it is an owner decision, not a copy edit.
6. **Whether analytics will be implemented before any AI-visibility offer is sold**, since nothing in §12 is measurable without it.
7. **Whether to fund keyword tooling and multi-system AI tooling**, without which volume stays UNKNOWN and Claude/Grok stay unmeasured.

---

## 16. Recommendation

## AI SEARCH SHOULD BE A SUPPORTING CAPABILITY

**Reasoning, in the order the evidence carries it.**

MappedSkills is absent from **28 of 28** unbranded AI answers while being accurately retrieved in **7 of 8** branded ones — so the problem is not that AI systems cannot see the company, it is that nothing outside the company's own website tells them to mention it. The mechanism is now documented rather than assumed: **Semrush Agency Partners and Clutch appear in 15 of 28 unbranded runs**, ChatGPT states in plain text that it selected brands by reading them, and MappedSkills has a profile on neither. That is a listings-and-authority problem, and it would be a listings-and-authority problem in any category MappedSkills chose.

Positioning on AI search would additionally mean leading with a capability that **the two Pune agencies already selling it have won nothing from** — upGrowth and SEOTonic appeared zero times each — while **the AI answers themselves now recommend Semrush, SE Ranking, Ahrefs and Profound ahead of any agency**. The commercial layer beneath it is small: ~0.28% of web traffic against Google's 28.12%. And the highest-intent local query MappedSkills could win returns **a Local Pack and no AI Overview at all**.

None of that makes AI search worthless. It is real, it is growing, the manufacturing prompts are thinly and unstably claimed, buyers ask about it in their own words, and the technical craft — the training/retrieval distinction, crawler taxonomy, entity hygiene, variance-aware measurement — is correct, demonstrable, and something MappedSkills has already proved it can do on its own site. That is worth delivering and worth mentioning. It is not worth leading with.

**Three qualifications the orchestrator should weigh:**
- **This recommendation sits one notch below Session 03's** ("capability and credibility layer"). The gap is small and the orchestrator should close it deliberately.
- **Two of six systems were never tested.** A materially different Claude or Grok picture would not overturn the traffic-magnitude or directory findings, but it would strengthen the case for the higher rung.
- **The recommendation rests on one day of data.** A second measurement round is the cheapest way to test it, and the framework to run one now exists.

**Claude does not approve this recommendation.** `DEC-004` remains Proposed. No business strategy document was modified.
