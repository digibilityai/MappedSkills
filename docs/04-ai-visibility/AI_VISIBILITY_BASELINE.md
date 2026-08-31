# AI Visibility Baseline — MappedSkills and Competitors

**Date of all observations:** 2026-08-31
**Lens:** India / Pune (session egress AS55836, Reliance Jio), English, **all systems signed out**
**Method and limits:** `AI_ACCESS_CAPABILITY.md`
**Prompts:** `AI_PROMPT_UNIVERSE.md`
**Status:** RESEARCH BASELINE. Nothing here is an approved decision.

> **Standing caveat on every table below.** These are **single-day observations at signed-out tiers on two of six named systems' full capability**. Claude and Grok were **NOT TESTABLE**. No figure below is a rank, a score, or a trend. Repeat counts are stated explicitly wherever they exist.

---

## 1. Headline result

| Layer | MappedSkills result | Runs |
|---|---|---|
| **Branded retrieval** — can a system identify MappedSkills when asked by name? | **YES on every system that could search the live web.** 7 of 8 branded runs returned a substantially accurate description | 8 |
| **Unbranded discovery** — does MappedSkills appear when the buyer does not name it? | **NO. Zero appearances.** | **28** |
| **Recommendation** — is MappedSkills actually recommended? | **NO. Zero.** | 28 |
| **Citation** — is `mappedskills.com` used as a source in an unbranded answer? | **NO. Zero.** | 28 |
| **Accuracy** — when described, is the description correct? | **Broadly yes, with two material problems** (§3) | 8 |

**These four things are different and are not combined into a score.** MappedSkills has a working *entity* and no *discovery*. That is a materially different diagnosis from "AI systems don't know who we are", and it changes what would have to be fixed.

---

## 2. Branded retrieval — what AI systems say about MappedSkills

### 2.1 Results by system

| System | Prompt | Identified? | What it said | Sources it used |
|---|---|---|---|---|
| Google AI Mode | *what is MappedSkills* | **Yes** | "a performance marketing and digital agency based in Pune, Maharashtra, India". Founder Amit Gupta; **founded 2016**; target clients "coaches, small-to-medium enterprises (SMEs), institutes, and entrepreneurs" | `mappedskills.com`, `in.linkedin.com` — **two domains only** |
| Google AI Mode | *what services does MappedSkills offer* | **Yes** | Performance marketing, SEO, social media management & advertising, lead generation **including telecalling**, content & email marketing, website design, **video editing**, marketing automation | `mappedskills.com`, `in.linkedin.com` |
| Google AI Mode | *is MappedSkills an SEO agency* | **Yes** | "a performance marketing agency that offers Search Engine Optimization (SEO) among its core services". Named a staff member, "Pooja Mane… expert SEO strategist" | `mappedskills.com`, `in.linkedin.com` |
| Google AI Mode | *MappedSkills Pune address reviews google business profile* | **Partly** | Gave phone numbers and email; **could not state an address or any rating**, and hedged: MappedSkills "operates largely as a hybrid or remote-first digital consultancy… rather than highlighting a rigid walk-in storefront" | `mappedskills.com`, `instagram.com`, `in.linkedin.com` |
| ChatGPT — **web search OFF** | *what is MappedSkills* | **NO** | "'MappedSkills' isn't a standard term with one universally accepted meaning." Explained it generically as skills mapped to roles, and asked where the term was seen | none |
| ChatGPT — **web search ON** | *What is MappedSkills (mappedskills.com)? What services does it offer?* | **Yes, in detail** | Performance/digital marketing agency; Pune, Mumbai, India-wide; founder Amit Gupta; five core services (Google Ads, social ads, lead generation, SEO, CRO). **Noted an older, broader services page contradicting the newer five-service architecture** | `mappedskills.com` **only** |
| Perplexity | *what is MappedSkills mappedskills.com* | **Yes** | "performance marketing and digital growth agency based in Pune, India, founded in 2016 by Amit Gupta". Listed telecalling. **Volunteered a disambiguation from "MappingSkills", an unrelated Delhi/Noida IT-training firm** | `mappedskills.com`, `linkedin.com`, `mappingskills.com`, `google.com`, `signalhire.com`, **`testing.mappedskills.com`** |
| Gemini (Flash-Lite) | *what is MappedSkills* | **Yes, without being given the domain** | "MappedSkills (often operating as MappedSkills Marketing) is a performance marketing and digital growth agency. Based primarily in Pune, India." | **none exposed** — signed-out Gemini shows no citations |

### 2.2 What the branded results establish

1. **MappedSkills exists as a resolvable entity to every system that can search the live web.** Gemini identified it from the bare brand name alone.
2. **It does not exist in model parametric knowledge.** ChatGPT with search disabled had no idea, and read the name compositionally. **INFERENCE:** MappedSkills' visibility today is entirely retrieval-dependent. If a system does not search, MappedSkills is invisible to it.
3. **The entity's whole source footprint in AI answers is two domains: its own site and LinkedIn** (plus Instagram once, and — see §3.2 — a staging subdomain once). Every branded answer traces to first-party material.
4. **Systems disagree about what MappedSkills sells**, because the website disagrees with itself. Google AI Mode reported the older broad list including telecalling and video editing; ChatGPT reported the newer five-service architecture *and explicitly flagged the contradiction*. This is not an AI failure — it is the site's own inconsistency being faithfully reproduced.

---

## 3. Accuracy — two material problems

### 3.1 AI systems are repeating MappedSkills' unsubstantiated claims verbatim

**VERIFIED FACT.** Google AI Mode's answer surfaced the site's own title tag — *"Performance Marketing Agency | 300%+ ROI | MappedSkills"* — and Perplexity wrote: *"They emphasize measurable outcomes (e.g., '300%+ ROI')"*.

Session 02 recorded "300%+ ROI", "₹100Cr+" and "₹10Cr+" as **on-site copy of unknown provenance** (`SOURCE_REGISTER.md` §D). **These claims are now being redistributed by AI systems as descriptions of the company.**

Two observations are worth separating:
- ChatGPT (web search on) handled this well, writing that these "are claims made by MappedSkills on its own website, so I'd treat them as marketing claims rather than independently verified results."
- **Google AI Mode and Perplexity did not add that qualification.**

**This is a live reputational exposure, not a theoretical one.** It is also the single sharpest illustration in this session of a general principle: *AI systems amplify whatever a company asserts about itself, because first-party content is the dominant source for branded prompts.*

### 3.2 A staging subdomain is being used as a source

**VERIFIED FACT.** Perplexity cited **`testing.mappedskills.com`** among its ten sources for the branded query.

Verified directly on 2026-08-31: `testing.mappedskills.com` resolves, terminates TLS on the same LiteSpeed host as production, currently returns **HTTP 403** at the root, and returns **HTTP 404 for `/robots.txt`** — meaning it has never served a robots file and anything it did serve was crawlable. `ms.mappedskills.com` (the deployment artifact noted in `CURRENT_STATE.md`) behaves identically.

**No change was made.** This is recorded as an observation for the engineering phase. Whether the subdomain currently serves duplicate content is **UNKNOWN**; that it has been ingested by at least one AI system is **VERIFIED**.

### 3.3 Facts reported by AI that this session could not verify

| Reported | Source AI attributed it to | Status |
|---|---|---|
| Founded **2016** | LinkedIn (Google AI Mode, Perplexity) | **NOT VERIFIED.** Repeated by two systems from the same underlying source, which is not corroboration |
| Target clients "coaches, SMEs, institutes, entrepreneurs" | LinkedIn | **NOT VERIFIED** |
| Named staff member "Pooja Mane" | first-party pages | **NOT VERIFIED** |
| "Over half of their clients continue beyond a single campaign" | site copy, surfaced via WebSearch | **NOT VERIFIED.** Another unsubstantiated on-site claim |

---

## 4. Unbranded discovery — 28 runs, zero appearances

### 4.1 The full record

**Google AI Mode (19 unbranded runs, 0 MappedSkills appearances).** Names actually returned:

| Prompt | Names in the answer |
|---|---|
| best SEO agencies in Pune ×3 | Opstech Solution, OMX Technologies, Awrange Digital, Ad2brand *(all 3 runs)*; VP Advertising *(1 of 3)* |
| best digital marketing agency in Pune | SRV Media, Amura, Saletify, Brainmine, Awrange |
| best SEO companies in India | Techmagnate, PageTraffic, SEOValley, SEO Discovery, EZ Rankings |
| SEO agency for B2B companies in India | TripleDart, SEOValley, DigiStreet Media, Ace Logic, Webindia Inc |
| best AI SEO agencies in India ×2 | RepIndia, Infidigit, Techmagnate, Black Marlin *(both runs)*; PageTraffic *(1)*; Qoulomb, ThatWare *(1)* |
| agencies that help brands appear in ChatGPT | Thrive, iPullRank, RankingBite, ZeroAdo, Forthea |
| generative engine optimization agencies in India | BrandStory, ZeroAdo, TripleDart, Techmagnate, PageTraffic |
| companies that improve visibility in AI search | **Semrush, SE Ranking, Ahrefs** (tools), then Contensify |
| my website gets traffic but no leads who can help | **No brands** — answered with roles (CRO specialist, UX/UI designer, copywriter, lead-gen agency) |
| who can help my company get found in Google and AI search | **Profound** (tool) named first, then generic agency categories |
| best SEO agencies for manufacturing companies in India ×2 | Digicobweb, Awrange *(both runs)*; Nico Digital, Schbang, Qoulomb *(run 1)*; The 4P Solutions, Osumare, PageTraffic *(run 2)* |
| digital marketing agencies for industrial companies in Pune | Dimakh Consultants, Osumare, Koffeetech — **each with a full street address** |
| agencies that generate enquiries for manufacturers in India | MOTM Tech, Dechcept; plus IndiaMART / TradeIndia as channels |
| alternatives to upGrowth for SEO in India | TripleDart, GrowthSpree, ThirdMeta, Schbang, Omniscient Digital |
| compare SEO agencies in Pune for B2B companies | Itorix Infotech, GO MO Group, Web Link Services, eSearch Logix |

**ChatGPT (2 unbranded runs, 0 appearances).**
- *best SEO agencies in Pune* returned a **16-entry local business list with star ratings and review counts** (Brainmine 4.3, Brand Pillars 4.9, Opstech 4.9, OMX 4.8, Mage Marketer 4.9, **Passion Minds** 4.7, Ad2brand 4.8, Digital Entire 4.9, Digital Tokri 4.7, Binvento 4.9, Eternal Digital 4.9, Digibrandz 4.9, VP Advertising 5.0, A2 Digital 4.5, The Vanilla Theory 4.9, Jay Shinde 4.9). **MappedSkills is not among sixteen Pune agencies.**
- *SEO for manufacturing and industrial companies in India* shortlisted seven and ranked a top three: **1. Keyword Riser** ("particularly for a Pune-based industrial company"), 2. Techmagnate, 3. GO MO Group.

**Perplexity (3 unbranded runs, 0 appearances).** Pune → Dimakh, Techmagnate, SEOValley. AI SEO India → Techeasify, Snezzi, RepIndia, HikeMyTraffic, Qoulomb, GO MO, ROI Minds, AdLift, ThatWare, Techmagnate. Manufacturing → Techmagnate, Softtrix, PageTraffic, SEO Discovery, EZ Rankings, IndeedSEO, Black Marlin.

**Gemini (1 unbranded run, 0 appearances).** Pune → Osumare, SRV Media, Brainmine, IKF, Techmagnate, Dimakh, Codexxa.

**Google AI Overviews (3 answered, 0 appearances).** See §5.

### 4.2 What the zero actually means

It is important not to over-read 28 nulls. Three honest readings:

1. **It is a real, complete absence at this sample size** — MappedSkills did not appear once, in any class, on any system, including a 16-entry local list and a Pune-specific industrial prompt where a Pune agency is exactly what was wanted.
2. **It is not a surprise and was largely predictable from Session 01–03**: no articles, no case studies, no directory profiles, no reviews surfaced, no third-party mentions. Absence from AI answers is consistent with absence from the sources those answers are built from.
3. **It is not evidence that AI visibility is the binding commercial constraint.** MappedSkills is equally absent from the ordinary Local Pack, and §5 shows the highest-intent local prompt does not produce an AI answer at all.

---

## 5. AI Overviews versus AI Mode — the surfaces behave differently

**This resolves the question Session 03 could not observe** (`SEARCH_STRATEGY_VALIDATION.md` §20 Q2).

| Query (India/Pune lens, 2026-08-31) | AI Overview? | What was served | Cited publishers |
|---|---|---|---|
| how to appear in chatgpt search results | **PRESENT** | Full generated answer about crawler access and Bing indexing | YouTube, Rank Math SEO |
| why is my website getting traffic but no leads | **PRESENT** | Full diagnostic answer | YouTube (Ajay Dhunna), TechArk, Gill Andrews |
| best SEO agencies for manufacturing companies in India | **PRESENT** | Named PageTraffic, Techmagnate, Wildnet | **Clutch**, Viwork Digital, Wildnet |
| **best SEO agencies in Pune** | **ABSENT** | **Local Pack instead** — Opstech Solution, 4.9 (507), "7+ years in business", street address | n/a |

**The pattern (WORKING HYPOTHESIS from four observations, not a measurement):** local-intent commercial queries appear to be served by the **Local Pack**, not an AI Overview. National and informational queries get an AI Overview.

**Two consequences follow directly, and they cut against a GEO-led proposition:**

- For the **Pune local demand** Session 03 found MappedSkills is not capturing, the lever observed here is **Google Business Profile presence, review count and tenure** — not AI optimisation. Session 03 finding #10 is now corroborated from the AI-surface side.
- Note the tension: **the same query produces no AI Overview in classic Search but a full AI Mode answer under `udm=50`.** Whether real Pune buyers use AI Mode for local vendor search is **UNKNOWN** and matters more than any optimisation technique.

---

## 6. Competitor baseline

### 6.1 Branded retrieval (control)

| Competitor | Retrieved? | Sources AI used |
|---|---|---|
| **upGrowth** | Fully. Pune; founded 2016/2017; Series A–C startups; fintech/edtech/healthcare/e-commerce/SaaS; India + UAE; SEO, **GEO, AEO**, fractional CMO | `in.linkedin.com`, `upgrowth.in`, `justdial.com` |
| **SEOTonic** | Fully. India, 2005; SEO + GEO; month-on-month plans; "3,000+ clients" claim | `seotonic.com`, `in.linkedin.com` |
| **MappedSkills** | Fully (§2) | `mappedskills.com`, `in.linkedin.com` (+ Instagram, + a staging subdomain) |

**Finding, and it is not the expected one: MappedSkills' branded source footprint is not materially worse than either Pune competitor's.** All three resolve from own-site plus LinkedIn plus a directory. The branded layer is **not** where MappedSkills is behind.

### 6.2 Unbranded appearances across the 28 runs

| Competitor (Session 02 set) | Unbranded appearances |
|---|---|
| **upGrowth** | **0** |
| **SEOTonic** | **0** |
| **DigiMark** | **0** |
| **Qoulomb** | **3** (AI Mode manufacturing; AI Mode AI-SEO run 2 — "best pure-play GEO specialist"; Perplexity AI-SEO) |

Frequently recurring names that are **not** in the Session 02 competitor set: Techmagnate (7 runs), Awrange (6), PageTraffic (5), Opstech, OMX, Ad2brand, RepIndia, TripleDart.

**This is the most strategically awkward finding in the session.** The two Pune agencies Session 02 identified as already occupying the AI + Search Visibility position — upGrowth, which publishes a full GEO price ladder and a named diagnostic tool, and SEOTonic, which sells GEO/AEO/LLM visibility from $199/month — **did not appear once in 28 unbranded runs, including on GEO- and AI-SEO-specific prompts.** Qoulomb, which Session 02 recorded as the narrow AI-search specialist that refuses CRO and automation, appeared three times.

**INFERENCE (not proven):** selling GEO does not produce AI visibility. What produced appearances in this sample was being **listed in a directory or a listicle**, or having **local listing data with review counts** — not category positioning. See `AI_CITATION_RESEARCH.md`.

---

## 7. Run-to-run variance (repeats)

| Prompt | System | Runs | Membership stability | Order stability |
|---|---|---|---|---|
| best SEO agencies in Pune | AI Mode | 3 | **Core set of 4 present in 3/3** (Opstech, OMX, Awrange, Ad2brand). One extra name in 1/3. **Same 5 source domains in 3/3** | **Never stable.** Order changed in all three |
| best AI SEO agencies in India | AI Mode | 2 | **4 of ~5 recurring** (RepIndia — first-listed both times — Infidigit, Techmagnate, Black Marlin) | Changed |
| best SEO agencies for manufacturing companies in India | AI Mode | 2 | **Only 2 recurring** (Digicobweb, Awrange). Six of eight names appeared once | Changed |

**The variance is prompt-dependent, and that is the finding.** Stability ranged from near-total on the local prompt to roughly 40% on the manufacturing prompt within the same system on the same day. Implications are developed in `AI_MEASUREMENT_FRAMEWORK.md`.

---

## 8. Cross-system agreement — near zero

For the anchor prompt *best SEO agencies in Pune*, on the same day from the same location:

| System | Names returned |
|---|---|
| Google AI Mode | Opstech, OMX, Awrange, Ad2brand |
| ChatGPT | Brainmine, Brand Pillars, Opstech, OMX, Mage Marketer, Passion Minds, Ad2brand + 9 more |
| Perplexity | Dimakh, Techmagnate, SEOValley |
| Gemini | Osumare, SRV Media, Brainmine, IKF, Techmagnate, Dimakh, Codexxa |

**No agency appears in three or more systems.** Only pairs overlap.

Manufacturing is barely better. Taking the union of both Google AI Mode runs (Nico Digital, Digicob Web, Awrange, Schbang, Qoulomb, The 4P Solutions, Osumare, PageTraffic) against Perplexity (Techmagnate, Softtrix, PageTraffic, SEO Discovery, EZ Rankings, IndeedSEO, Black Marlin) and ChatGPT (Techmagnate, PageTraffic, GO MO Group, e intelligence, Baclinc, Keyword Riser, SEO Yodha): **exactly one name — PageTraffic — is common to all three systems**, and Techmagnate is common to two. **AI Mode run 1 alone shares no name with Perplexity.**

**Conclusion, and it has direct commercial consequences: within-system stability is high; cross-system agreement is close to nil.** Any single blended "AI Visibility Score" averaged across systems would destroy the only signal that is stable. This is developed in `AI_MEASUREMENT_FRAMEWORK.md` §5.

---

## 9. Entity and technical baseline (live, 2026-08-31)

Gathered because §4 raised the question of *why* MappedSkills is absent. **No change was made and no causal claim is made** — Google's own documentation states no special markup is required for AI features (`AI_CRAWLER_POLICY.md` §3).

| Observation | Status |
|---|---|
| Full server-rendered HTML served to `OAI-SearchBot/1.4` and `ClaudeBot/1.0` user agents — 233KB homepage, `<h1>` present | **VERIFIED FACT.** Crawler access is not the blocker |
| `robots.txt` allows all crawlers; no AI-crawler directive of any kind is live | **VERIFIED FACT** (unchanged from Session 01B) |
| `llms.txt` → HTTP 404 | **VERIFIED FACT.** No claim is made that this matters |
| `sitemap.xml` → 15 URLs | **VERIFIED FACT** |
| Exactly two JSON-LD blocks site-wide, from the layout: `Organization` and `LocalBusiness`. No page-level `Service`, `FAQPage` or `BreadcrumbList` on `/seo` | **VERIFIED FACT** |
| **`sameAs` is `[]` — empty — on BOTH the Organization and the LocalBusiness block** | **VERIFIED FACT.** No declared link to LinkedIn, Facebook, Instagram or JustDial — the exact profiles AI systems used to describe the company |
| `streetAddress` is `"Pune, Maharashtra, India"`; **`postalCode` is `"India"`** | **VERIFIED FACT.** The postal-code field contains a country name. This is malformed on its own terms |
| No `geo`, no `openingHours`, no `aggregateRating` on the LocalBusiness | **VERIFIED FACT** |
| Off-site footprint found (WebSearch, US lens): Facebook page, LinkedIn company page, InfoisInfo, JustDial | **VERIFIED FACT**, non-exhaustive — the Google operator query hit a bot check and was abandoned |
| **No Clutch, GoodFirms, DesignRush or Semrush Agency Partners profile was found** | **VERIFIED FACT** for the searches run. Absence of evidence at this search depth, not proof of non-existence |
| No Google Business Profile surfaced by any system; AI Mode could state no address and no rating; MappedSkills absent from a 16-entry ChatGPT local list | **INFERENCE** — GBP presence is absent or ineffective. **Owner should confirm.** Not verified |
| `/seo-company-in-pune/` and `/content-marketing-services-in-pune/` are listed by a third-party search index but return **HTTP 404** live; `/content-marketing-services/` returns 200 but serves the blog page | **VERIFIED FACT.** Stale URLs persist in third-party indexes that feed AI retrieval |

---

## 10. What this baseline does not establish

1. **Nothing about Claude or Grok.** No baseline exists for two of the six systems named in the charter.
2. **Nothing about signed-in behaviour** on any system. All observations are signed-out, and Gemini and Perplexity were demonstrably on reduced tiers.
3. **Nothing about any market outside India**, and nothing outside English.
4. **No trend.** This is one day. A second measurement is required before any change can be described.
5. **No causal link** between the entity defects in §9 and the absence in §4. They are consistent with each other; that is all this session can say.
6. **Nothing about whether AI visibility produces enquiries or revenue for MappedSkills.** See `AI_STRATEGIC_VALIDATION.md` §12.
