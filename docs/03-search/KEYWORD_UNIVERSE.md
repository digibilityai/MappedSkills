# Keyword Universe — Session 03

**Date of all observations:** 2026-08-31
**Branch:** `test_branch`
**Status:** RESEARCH FINDING. Not an approved keyword map, sitemap or content plan.

---

## 0. Method and its limits — read before using any table below

### 0.1 SEARCH VOLUME NOT VERIFIED
**VERIFIED FACT:** no keyword-volume tool was available or used in this session. There is **no Ahrefs, Semrush, Keyword Planner, Moz or equivalent access**. Therefore:

> **SEARCH VOLUME NOT VERIFIED — for every term in this document.**
> **KEYWORD DIFFICULTY NOT VERIFIED — for every term in this document.**
> **CPC NOT VERIFIED — for every term in this document.**

No volume, difficulty or CPC figure appears anywhere in this file, because none was obtainable. None was estimated, inferred or substituted with a proxy number. Where this document says a family is "strong" or "thin", that is a **qualitative judgement from observable signals**, defined in §0.3, and it is labelled as such.

### 0.2 What was actually used
| Source | What it is | Geography | Reliability |
|---|---|---|---|
| **Google Autocomplete** via `suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=in` | Google's own live suggestion API. Raw responses preserved at `docs/03-search/_raw_autocomplete_IN_2026-08-31.json` (86 queries) | **India, Pune-localised** — see §0.4 | Primary, first-party to Google, reproducible |
| **Live Google SERPs** via browser | Ten SERPs read directly | **India, Pune-localised** | Primary observation, dated |
| **WebSearch tool** | Documented by its own tool description as **US-only** | **United States** | Secondary proxy for a US-lens SERP |

### 0.3 Definitions used for qualitative judgements
Autocomplete returns up to ten suggestions per seed. Judgements in this document are based on **observable properties of that suggestion set**, not on volume:

- **Depth** — how many returned suggestions are genuine variants of the seed rather than unrelated noise. A seed returning ten on-topic variants behaves differently from one returning two.
- **Intent composition** — whether variants skew to *buying* (agency, services, company, near me, pricing), *learning* (meaning, course, what is, checklist), *career* (jobs, salary, specialist, interview questions), or *tooling* (tool, checker, free, tracker, score).
- **Contamination** — whether the seed collides with an unrelated dominant meaning.
- **Geographic modifiers** — which cities and countries Google appends, indicating where the query is commercially live.
- **(NONE)** — Google returned no suggestion other than the seed itself. This is a meaningful negative signal: the phrase is not a recognised query pattern.

**These are demand *signals*, not demand *measurements*.** A deep suggestion set proves Google recognises the pattern; it does not prove the volume is commercially material.

### 0.4 Geographic honesty — a material limitation
**VERIFIED FACT:** the session's network egress resolves to **Pune, Maharashtra, India (AS55836 Reliance Jio)**, confirmed via `ipinfo.io`. Consequences:

1. Autocomplete and browser SERP results are **India- and Pune-localised**. For the India lens this is ideal — it is close to what a Pune-based buyer actually sees.
2. **The `gl=` parameter did not meaningfully override IP localisation.** `gl=us` and `gl=gb` returned results identical to each other and India-flavoured (e.g. `seo agency` → "seo agency in mumbai", "seo agency in india" under all three). **International autocomplete was therefore NOT reliably obtained and is not claimed anywhere in this document.**
3. International evidence in this session rests on (a) the **geographic modifiers Google itself appended** to India-lens queries — which indicate where a phrase is commercially live even when observed from India — and (b) the **US-only WebSearch tool**. Both are labelled at point of use.
4. **UNKNOWN:** what these SERPs look like from London, New York, Sydney or Dubai. Direct international SERP observation is outstanding.

### 0.5 AI Overview presence could not be reliably observed
**VERIFIED FACT:** on the one SERP where the AI Overview container was probed directly (`how to improve website conversion rate`), the page contained **both** an "AI Overview" heading and the fallback strings "An AI Overview is not available for this search" and "Can't generate an AI overview right now." No AI Overview body text was rendered on any SERP read in this session.

**INFERENCE:** this is most likely an artifact of automated browsing rather than evidence that AI Overviews are absent from these queries. **Therefore no claim is made anywhere in Session 03 about which queries do or do not trigger AI Overviews.** This is carried to Session 04 as an explicit open item and must be checked manually.

---

## 1. Intent taxonomy used

| Code | Intent | Definition |
|---|---|---|
| **T** | Transactional | Ready to hire or buy now |
| **CI** | Commercial investigation | Comparing providers or approaches before buying |
| **PA** | Problem-aware | Describing a business symptom, not yet a solution category |
| **I** | Informational | Wants to understand a concept |
| **N** | Navigational | Looking for a named brand |
| **TD** | Tool / diagnostic | Wants a tool or a self-serve check, **not a supplier** |
| **RD** | Research / data seeking | Wants statistics, benchmarks or original data |
| **CAREER** | Career / education | Jobs, salary, courses, certification — **commercially worthless to an agency** |

**Buyer sophistication** is recorded as Low / Medium / High: how much the searcher already understands about the discipline they are searching for.

---

## 2. Traditional search / SEO

Autocomplete observed 2026-08-31, India (Pune) lens.

| Seed | Observed suggestion pattern | Dominant intent | Buyer sophistication | Note |
|---|---|---|---|---|
| `seo agency` | mumbai · **pune** · navi mumbai · india · near me · thane · delhi · **usa** · bangalore | **T / CI** | Low–Medium | Almost entirely **city-modified**. Strong local commercial intent. "usa" indicates outbound export-of-services intent |
| `seo company` | **in pune (#1)** · mumbai · nagpur · india · near me · **kuwait** · delhi · **dubai** · bangalore | **T** | Low–Medium | "in pune" is the **top suggestion**. Gulf modifiers (Kuwait, Dubai) recur — Indian agencies selling to GCC |
| `seo services` | mumbai · **meaning** · near me · india · delhi · navi mumbai · nagpur · **full form** · bangalore | T mixed with **I** | Low | "meaning" and "full form" indicate a meaningful share of non-buyers |
| `technical seo` | meaning · checklist · audit · tools · schema generator · checker · **course** · **interview questions** · **kya hota hai** | **I / CAREER** | Medium | Heavily educational. "interview questions" and Hindi "kya hota hai" (what is it) confirm learner/job-seeker share |
| `b2b seo` | **agency** · **services** · strategy · **company** · **consultant** · statistics · specialist · **agency in mumbai** · **agency in india** | **CI / T** | **High** | **Cleanest commercial profile in this family.** Provider-seeking dominates |
| `saas seo` | alliance · **agency** · **services** · alliance 2026 · meaning · checklist · conference · strategy | CI mixed | High | Provider intent present but diluted by community/event terms |
| `ecommerce seo` | **services** · course · **agency** · strategies · **company** · jobs · **consultant** · audit | CI / T mixed with CAREER | Medium | Provider intent real; "course"/"jobs" contamination present |
| `seo consultant` | **salary** · meaning · **jobs** · near me · in delhi · ahmedabad · kolkata · kerala | **CAREER** | Low | **Dominated by job-seekers.** Commercially misleading |
| `seo audit` | **tool free** · tools · **free** · report · meaning · auditor · **website free** · pro | **TD** | Low–Medium | **"Free" appears three times.** Audit-seekers want a *tool*, not a paid engagement — see §8 |
| `enterprise seo` | **services** · **agency** · tools · platform · **consultant** · **services in india** | **CI / T** | High | Small but clean commercial family |
| `organic search agency` | organic seo agency · **london** · **in india** · organic search marketing agency | CI | Medium | Thin. Collapses toward "organic seo agency" |

**Finding (INFERENCE).** Traditional SEO in the India lens splits sharply into three unrelated audiences: **local buyers** (city-modified), **learners and job-seekers** (`technical seo`, `seo consultant`), and **tool-seekers** (`seo audit`). Only the first two of the eleven seeds — `b2b seo` and `enterprise seo` — combine buyer intent with high sophistication and no contamination.

---

## 3. AI search

| Seed | Observed suggestion pattern | Dominant intent | Buyer sophistication | Note |
|---|---|---|---|---|
| `ai seo` | company coalition · expert in nainital · **tools** · **course** · expert in india · **services** · **agency** · optimization · **agency in mumbai** | Mixed CI / **CAREER** | Medium | Provider intent exists but ranks below tools and courses |
| `ai seo agency` | **in mumbai** · **melbourne** · **uk** · **singapore** · in noida · **london** · in bangalore · **malaysia** · in delhi | **T / CI** | Medium–High | **The strongest genuine agency-buying signal in the AI family.** Note the international spread — Melbourne, UK, Singapore, London, Malaysia |
| `ai search optimization` | **services** · tools · icon · **course** · **agency** · geo · **masterclass** · platform · checklist | Mixed CI / I / CAREER | Medium | "services" leads, but courses and masterclasses are prominent |
| `ai search agency` | california · birmingham · uk · **for law firms** · singapore · malaysia · offerings · bangkok · **for solicitors** | CI | Medium | **Vertical signal: law firms / solicitors.** Strongly UK/international flavoured |
| `generative engine optimization` | (geo) · **course** · **meaning** · tools · **course free** · **jobs** · strategies · **agency** (8th) · how to dominate ai search | **I / CAREER** | Medium | **Education and career intent dominate. "agency" ranks 8th.** Buyers are learning, not hiring |
| `geo agency` | **in india** · mavelikara · singapore · uk · malaysia · **in dubai** · **meaning** · perth · london | CI, **contaminated** | Medium | "meaning" indicates the term is not yet understood. "mavelikara" is unrelated local-business noise — the acronym is ambiguous |
| `answer engine optimization` | (aeo) · **certification** · **course** · strategy · **services** · and generative engine optimization · tools · examples · icon | **I / CAREER** | Medium | Certification and courses outrank services |
| `aeo` (bare acronym) | **aeon essays · aeon · aeon credit · aeon flux · aeo full form · aeon essays for cat · aeon meaning · aeos games** · aeo and geo | **CONTAMINATED — not a marketing query** | n/a | **The bare acronym is owned by unrelated meanings** (Aeon magazine, AEON Credit, Aeon Flux, CAT-exam prep). Only the 9th suggestion is marketing-related |
| `llm seo` | company coalition · **course** · **full form** · **meaning** · **services** · tools · optimization · **agency** · strategy | I / CAREER | Medium | "full form" and "meaning" dominate — term not yet understood |
| `llm optimization` | techniques · seo · meaning · **course** · **agency** · tools · **services** · **agency india** · vs seo | I mixed CI | Medium–High | Genuine ambiguity: also means *optimising LLMs* (an ML engineering topic), not marketing |
| `chatgpt seo` | **services** · optimization · **expert** · prompts · skills · tool · **expert india** · plugin | CI mixed | Medium | Ambiguous: partly "using ChatGPT to do SEO", partly "being visible in ChatGPT" |
| `chatgpt visibility` | **checker** · **score** · **tool** · **tracking** · brand visibility services · brand visibility · **best tracker** · search visibility | **TD** | Medium | **Tool intent dominates decisively** |
| `perplexity seo` | **audit** · **agency** · **services** · seoul · **tool** · **expert** · ai seo · computer seo | CI / TD | Medium | Small family; "seoul" is noise contamination |
| `ai visibility` | **checker** · **score** · **tools** · **checker free** · **audit** · checker adobe · essentials with semrush · **platform** · **tracker** | **TD — overwhelmingly** | Medium | **Every one of the top nine suggestions is a tool or a score. Not one is an agency or a service.** |
| `ai visibility agency` | london · ai search visibility agency · best ai visibility agency · ai agent visibility · **ai ais accommodation prices · ai ais resort contact number** | **BARELY EXISTS** | n/a | Degrades into unrelated hotel/resort noise by the fourth suggestion. **The query pattern is not established** |
| `ai search visibility` | **checker** · **tools** · **audit** · **tracker** · metrics kpis · **platform** · services · consultant · how to increase google search visibility | **TD** | Medium–High | Tools again lead; "metrics kpis" indicates a practitioner audience |
| `ai citation` | **generator** · meaning · checker · checker free · finder · tracking · share · hallucination checker · tool | **CONTAMINATED / TD** | n/a | Largely **academic citation generators**, not marketing citations |

**Finding 1 (INFERENCE, high confidence).** **AI-visibility demand in the India lens is tool demand, not agency demand.** Across `ai visibility`, `ai search visibility`, `chatgpt visibility` and `llm visibility`, the suggestion sets are near-uniformly *checker, score, tool, tracker, audit, platform, free*. `ai visibility agency` barely registers as a query pattern at all. See `SERP_RESEARCH.md` §5 for the SERP that confirms this.

**Finding 2 (INFERENCE).** **GEO and AEO are education categories before they are buying categories.** `generative engine optimization` and `answer engine optimization` return *course, meaning, jobs, certification, free course* ahead of *agency* and *services*. The bare acronym `aeo` is not a marketing query in India at all.

**Finding 3 (INFERENCE).** **`ai seo agency` is the exception** — the one AI-family seed whose suggestions are dominated by provider-seeking with geographic modifiers spanning India and five international markets. If MappedSkills targets any AI-search category term, the evidence points here, not to "AI visibility" or "GEO".

---

## 4. Organic / search growth

| Seed | Observed suggestion pattern | Verdict |
|---|---|---|
| `search growth agency` | **(NONE)** | **The phrase is not a query.** Google returned no variant |
| `search visibility agency` | ai search visibility agency · **how to find search popularity** | **Effectively (NONE)** — one of two suggestions is unrelated |
| `search visibility` | **getcontact · twitter · x · instagram** · score · meaning · tool · framework | **CONTAMINATED.** The term is owned by **social-media profile visibility settings**, not SEO |
| `organic growth agency` | grow organic agency · **tiktok organic growth agency** · organic growth marketing agency · **organic twitter growth agency** · **organic social media growth agency** · what is organic growth | **CONTAMINATED.** Owned by **social-media follower-growth services** |
| `organic acquisition` | meaning · channels · **organic india acquisition** · **organic tattva acquisition** · organic customer acquisition · organic user acquisition | **CONTAMINATED.** Collides with **M&A news about the company "Organic India"** |

**Finding (VERIFIED observation, decisive).** **Every seed in the "organic / search growth / search visibility" family either returns nothing or is owned by an unrelated meaning.** This is direct search evidence against the "Search Visibility" positioning territory carried in `POSITIONING.md` and against "organic growth agency" as a category name. Session 02 classified "Search Visibility" as TOO EARLY / EDUCATION HEAVY on competitor evidence; the search data independently confirms it and strengthens it — the term is not merely unused, it is **already taken by a different industry**.

---

## 5. CRO

| Seed | Observed suggestion pattern | Dominant intent | Note |
|---|---|---|---|
| `cro agency` | **india (#1)** · meaning · **manchester** · **uk** · **london** · **melbourne** · **sydney** · **shopify** | CI / T | **"cro agency india" is the top suggestion**, then five international city/country modifiers. Demand is real but skews international |
| `conversion rate optimization agency` | **(NONE)** | — | The full phrase is not an established query |
| `conversion rate optimization` | (cro) · **meaning** · **course** · in digital marketing · **jobs** · services · tools · examples | **I / CAREER** | Education and jobs dominate the long form |
| `cro services` | **market · meaning · llc · pharma · in india · full form · corp · thousand oaks** | **CONTAMINATED** | **"CRO" in India = Contract Research Organisation (pharma).** Every commercial suggestion belongs to a different industry |
| `landing page optimization` | tools · **by tim ash** · examples · meaning · **tim ash pdf** · services · **course** · pdf | I / TD | Dominated by one book and by tool/course intent |
| `funnel optimization` | meaning · digital marketing · strategies · marketing · adalah · **course** · tools · **specialist** | I / CAREER | Weak commercial profile |
| `website conversion optimization` | tools · web conversion optimization · website conversion rate optimization · **2025 course** · what is conversion optimization | I / TD | Thin |
| `ecommerce cro` | **cropper · crop · crosson · cross border · cropper tool** · cro agency · cro checklist · cro audit | **CONTAMINATED** | Autocomplete cannot disambiguate "cro" from "crop"/"cross" |
| `b2b cro` | **cross border payments · croissant · crown ring · crown group · crossing warehouse · cross tenant sync** | **FULLY CONTAMINATED** | **Not a query.** Zero relevant suggestions |

**Finding (INFERENCE, important and counter-intuitive).** **"CRO" is a broken acronym in the India search market.** It is dominated by pharmaceutical Contract Research Organisations and, at shorter character counts, by "crop"/"cross". Meanwhile the *long form* is dominated by courses and jobs, and `conversion rate optimization agency` returns nothing. Only `cro agency` itself carries provider intent — and its modifiers are **Manchester, UK, London, Melbourne, Sydney** ahead of any Indian city except the generic "india".

**Consequence:** conversion work is commercially real (see §6 problem-led and `SERP_RESEARCH.md` §6) but **must not be marketed to Indian buyers through the acronym "CRO" or through category terms.** It has to be reached through the *problem*.

---

## 6. Problem-led

This is the family the session brief asked to test against category terms. It behaves very differently.

| Seed | Observed suggestion pattern | Depth | Intent | Verdict |
|---|---|---|---|---|
| `how to appear in chatgpt` | results · search · search results · **answers** · how to show in chatgpt · show up in chatgpt results · show up in chatgpt searches · show up in chatgpt | **8 clean variants** | **PA** | **Strongest problem-led signal in the AI family.** Multiple natural phrasings all recognised |
| `how to get cited by ai` | ai search engines · get mentioned by ai · **cited in ai overviews** · cited in ai answers · **cited in google ai overviews** · mentioned in ai by google · mentioned in ai overview · mentioned in ai google article | **8 clean variants** | **PA** | Very strong. Buyer articulates the outcome ("cited", "mentioned") without using GEO/AEO vocabulary |
| `how to rank in ai overviews` | google ai overviews · rank website in ai overview · get rank in ai overview · rank content in ai overview | 4 clean, then noise | PA | Real, narrower |
| `geo vs seo` | **vs aeo** · meaning · marketing · what's the difference · **vs aio** · definition · **reddit** · optimization | **8 clean variants** | **CI / I** | Real comparison demand. Note buyers add a *third* acronym (aio) — terminology is proliferating faster than it is settling |
| `aeo vs seo` | vs geo · meaning · **in 2026** · full form · difference · examples · marketing · **reddit** | **8 clean variants** | **CI / I** | Real. "reddit" in both comparison seeds signals **buyers seeking unbiased peer opinion, not vendor content** |
| `organic traffic dropped` | **google organic traffic dropped** · **why has my organic traffic dropped** | 2 clean | **PA** | Real, narrow, high-urgency |
| `organic traffic declining` | decline · decrease · dropping · example | 4 (mostly morphological) | PA | Real but thin as phrased |
| `website traffic but no leads` | **why your website gets traffic but no leads** · why is my website not getting traffic | 2 clean | **PA** | Real. Google recognises the full problem sentence |
| `why is my website not getting leads` | **why is my website not generating leads** · why is my website not working | 2 clean | **PA** | Real |
| `how to get more leads from website` | from your website · on website · do you get leads through your website | 3 clean | **PA** | Real |
| `how to increase website conversion rate` | improve website conversion rate · improve conversion rate · **shopify** · **google ads** · **retail** · sales · **retail store** · **etsy** | 8, but **channel/vertical-split** | PA | Real, but dominated by **ecommerce and paid-media** contexts, not B2B services |
| `reduce cost per lead` | lower cost per lead · **meta ads** · **facebook** · **facebook ads** · **google ads** · how do you reduce · what is a good cost per lead | 7, **paid-media dominated** | PA | **This is a paid-media problem in buyers' minds**, not an organic or CRO one |
| `why is my website not showing in chatgpt` | not showing up on chatgpt · **my chatgpt website not working** · **why is my website not working** · **why www is not showing** · web pages not displaying | 5, **contaminated** | PA | The *specific* phrasing collides with generic website-broken queries |
| `brand not showing in chatgpt` | **(NONE)** | 0 | — | Not an established phrasing |
| `how to improve lead response time` | **(NONE)** | 0 | — | **Not a query.** Direct evidence against lead-response-time as an acquisition topic |

**Finding 1 (INFERENCE, and the central finding of this document).** **Problem-led queries are consistently cleaner than category queries.** They carry no course, jobs or acronym contamination, they are phrased in the buyer's own words, and Google recognises multiple natural variants of each. Compare `how to appear in chatgpt` (8 clean problem variants) against `ai visibility agency` (degrades to hotel noise), or `why is my website not generating leads` (clean) against `b2b cro` (zero relevant suggestions).

**Finding 2 (INFERENCE).** **Buyers describe AI-search outcomes without using GEO, AEO or LLMO.** They say "appear in ChatGPT", "get cited by AI", "get mentioned in AI overviews". The industry's acronyms are practitioner vocabulary; the buyer's vocabulary is outcome vocabulary. This is direct search evidence for Session 02's recommendation to reframe the spearhead from a technique category to an outcome.

**Finding 3 (caution against over-reading).** Two of the problem areas the session brief listed are **not supported by search evidence**: lead response time (`(NONE)`) and lead follow-up automation (see §7). And `reduce cost per lead` belongs to paid media, not organic. Problem-led is not uniformly strong — it is strong in *specific* places.

---

## 7. Marketing automation

| Seed | Observed suggestion pattern | Dominant intent | Note |
|---|---|---|---|
| `marketing automation agency` | **miami · uk · london · dubai · usa · in india · canada · sri lanka** | **T / CI** | Real provider intent, **almost entirely international modifiers**. "in india" ranks 6th |
| `marketing automation services` | companies · email automation services · **service provider in india** · systems · solutions · vancouver · systems examples | CI | Moderate |
| `crm automation` | meaning · tools · full form · **jobs** · **specialist** · **course** · workflow design · **n8n** | I / **CAREER** | Contaminated by career intent; "n8n" confirms the low-cost tooling layer |
| `lead automation` | **engineer salary · engineer · china · engineer jobs · technician · and technology** · tools · software | **FULLY CAREER-CONTAMINATED** | **Not a marketing query.** Dominated by industrial automation engineering roles |
| `lead nurturing` | meaning · **salesforce agent** · **meaning in hindi** · in salesforce · agent · process · emails · examples | **I** | Educational; platform-anchored to Salesforce |
| `whatsapp automation` | **for business** · **tool** · **free** · **tool free** · **price** · jobs · **service provider** · github | **T / TD** | **The strongest India-relevant automation signal.** "for business", "price", "service provider" are buying words |
| `email automation` | tools · tools free · github · uipath · free · software · examples · **ai** | **TD** | Tool-seeking, not agency-seeking |
| `hubspot partner` | partners · **partner agency** · **directory** · program · **partners in india** · list · partnership · **tiers** | **CI / N** | Buyers discover automation help **through the platform's own partner directory** — corroborates `MARKET_RESEARCH.md` §2.10 |
| `ai marketing automation` | **course** · tools · **jobs** · **agency** · trends · **salary** · **course free** · **specialist** | **CAREER** | Course, jobs and salary outrank agency |

**Finding (INFERENCE).** **Marketing automation search demand in India is tool demand and job demand, not agency demand** — with one exception. `whatsapp automation` shows genuine India-specific commercial intent ("for business", "price", "service provider"), which is unsurprising given WhatsApp's role in Indian business communication. Meanwhile `marketing automation agency` is real but internationally weighted, and `hubspot partner` shows buyers routing through the platform directory rather than Google — consistent with Session 02's finding that the moat here is platform tier.

**Direct evidence against a Marketing Automation pillar:** `lead automation` is fully career-contaminated, `how to improve lead response time` returns nothing, and `crm automation` / `ai marketing automation` are dominated by courses, jobs and salaries.

---

## 8. Adjacent categories

| Seed | Observed suggestion pattern | Verdict |
|---|---|---|
| `digital marketing agency` | **pune (#1)** · **hadapsar** · mumbai · near me · nagpur · nashik · thane · navi mumbai | **Very strong hyperlocal Pune demand.** "hadapsar" is a Pune suburb — intent goes to neighbourhood level |
| `performance marketing agency` | **pune (#1)** · mumbai · near me · india · nagpur · delhi · **dubai** · bangalore | **Strong Pune demand.** This is MappedSkills' *current* declared category |
| `growth marketing agency` | **collapses entirely to "digital marketing agency" + city modifiers** | **The term has no independent identity.** Google itself treats it as a synonym |
| `demand generation agency` | **uk** · in bangalore · delhi · then **collapses to "lead generation agency"** (near me · india · in mumbai · uk) | Weak as "demand generation"; **"lead generation agency" is the live Indian phrasing** |
| `revenue marketing agency` | prophet marketing agency · income marketing agency · revenue share marketing agency · ad revenue agency · revenue per employee | **Not a query.** All suggestions are unrelated or nonsensical |
| `revops agency` | **uk** · **reddit** · fractional · **hubspot** · premier · job description · **what is revops** | Small, UK/HubSpot-flavoured, with "what is revops" confirming education burden |

**Finding (VERIFIED observation, uncomfortable).** **MappedSkills' current category — "performance marketing agency" — has genuine, strong, Pune-local search demand** ("performance marketing agency pune" is the #1 suggestion), as does "digital marketing agency pune". The owner-supplied fact that the contact form has generated no enquiries therefore **cannot be explained by absent search demand in the current category.** The demand exists; MappedSkills is not capturing it. `SERP_RESEARCH.md` §2 shows why: the SERP is held by local incumbents with 13–28 years of tenure and hundreds of reviews.

**Finding (INFERENCE).** "Growth marketing agency", "revenue marketing agency" and "revops agency" are confirmed as non-viable acquisition categories in the India lens — the first has no independent identity, the second is not a query, the third is tiny and education-heavy.

---

## 9. Vertical query families

| Seed | Observed suggestion pattern | Contamination | Verdict |
|---|---|---|---|
| `seo for manufacturing` | companies · industry · **seo agency for manufacturing** · **agency for manufacturing in surat** · **services for manufacturing** · **agency for manufacturing companies** · services for manufacturing companies · **best seo agency for manufacturing** | **NONE** | **Outstanding.** Eight variants, every one commercial, six explicitly provider-seeking, with an Indian city modifier (Surat). **No course, jobs or acronym contamination anywhere** |
| `digital marketing for manufacturing companies` | social media marketing for mfg · digital marketing for mfg industry · **agency for manufacturing companies** · **agency for manufacturing companies in mumbai** · **b2b digital marketing for manufacturing** · **agency for b2b manufacturing companies in mumbai** | Minimal | **Very strong.** Highly specific B2B + manufacturing + Indian-city intent |
| `manufacturing lead generation` | **services** · **companies** · lead manufacturing process · lead manufacturing companies · process | Partial (metallic "lead") | Real, with predictable homonym noise |
| `b2b manufacturing marketing agency` | **b2b industrial marketing agency** · what is a b2b marketing agency · b2b marketing examples | Low | Thin but clean; "industrial marketing agency" is the adjacent phrasing |
| `healthcare digital marketing agency` | **in pune (#1)** · in india · mumbai · kolkata · delhi · chennai · gurgaon · bangalore | **NONE** | **Strong and clean**, entirely city-modified. Pune first |
| `education marketing agency` | in india · in mumbai · **uk** · **in dubai** · in delhi · ed marketing agency · **school marketing agency** · school marketing agency in india | **NONE** | Strong and clean. **But SRV Media already anchors education in Pune** (`COMPETITOR_RESEARCH.md` S-25) |
| `seo for saas companies` | **seo agency for saas companies** · strategies · how to improve · what is saas seo · **how much do saas companies sell for** · **are saas companies profitable** · saas biggest companies | **Investor/finance contamination from 5th** | Provider intent exists but the family **degrades into investor queries**. SaaS SEO is an international category, thin in the India lens |
| `seo for exporters` | **(NONE)** | — | Not a query, despite export being a real Indian manufacturing motive |

**Finding (INFERENCE — the strongest positive signal in Session 03).** **Manufacturing/industrial B2B is the cleanest commercial query family observed anywhere in this session.** It is the only family that combines: eight-deep suggestion sets, near-total provider-seeking intent, explicit Indian geographic modifiers, and **zero contamination from courses, jobs, tools or ambiguous acronyms**. Healthcare and education are also clean but education is locally occupied.

This matters disproportionately because **Pune is a major Indian automotive, engineering and manufacturing centre**, giving MappedSkills geographic credibility it cannot claim in, say, B2B SaaS. `SERP_RESEARCH.md` §7 tests whether the SERP is winnable.

**Caution (stated explicitly per the session brief).** This is **one** vertical family tested against **one** SERP. It is a **WORKING HYPOTHESIS and a leading candidate**, not a validated vertical decision. It should not be adopted without the confirmation work listed in `SEARCH_STRATEGY_VALIDATION.md`.

---

## 10. What this universe does and does not contain

**Contains:** ~86 seed observations across ten families, each with its live suggestion set, an intent classification, a sophistication estimate and a contamination note. Raw API responses preserved at `docs/03-search/_raw_autocomplete_IN_2026-08-31.json` for reproduction.

**Deliberately does not contain (per session brief §5 and §19):**
- thousands of keyword permutations;
- any volume, difficulty or CPC number;
- a final keyword map, page-to-keyword assignment, sitemap, URL architecture or content calendar;
- international autocomplete, which could not be reliably obtained (§0.4);
- any claim about AI Overview presence (§0.5).
