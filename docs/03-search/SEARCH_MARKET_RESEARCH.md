# Search Market Research — Session 03

**Date:** 2026-08-31
**Branch:** `test_branch`
**Companions:** `KEYWORD_UNIVERSE.md` (demand signals), `SERP_RESEARCH.md` (SERP observations)
**Status:** RESEARCH FINDING. No approved decision.

**Standing caveat, applying to every statement in this document:**
> **SEARCH VOLUME NOT VERIFIED · KEYWORD DIFFICULTY NOT VERIFIED · CPC NOT VERIFIED.**
> No keyword tool was available. Every demand judgement here is qualitative, derived from Google Autocomplete depth/intent/contamination and live SERP composition, both defined in `KEYWORD_UNIVERSE.md` §0.3.

**Standing geographic caveat:** session egress resolves to **Pune, India (Reliance Jio)**. All autocomplete and SERP evidence is **India/Pune-localised**. `gl=` did not override this. International evidence is limited to (a) geographic modifiers Google itself appended and (b) one US-only WebSearch cross-check. **No international SERP was observed directly.**

---

## 1. What buyers actually search for

### 1.1 Three audiences share the same vocabulary
The single most important structural finding is that India-lens search demand for these disciplines is **contaminated by two commercially worthless audiences** that use identical words to buyers:

| Audience | Signature terms observed | Commercial value to MappedSkills |
|---|---|---|
| **Buyers** | agency · services · company · near me · `in pune` · pricing · cost · for manufacturing | The target |
| **Learners and job-seekers** | course · certification · meaning · full form · jobs · salary · specialist · interview questions · *kya hota hai* | **Zero** |
| **Tool-seekers** | checker · score · tool · tracker · free · audit tool · platform | **Near zero** — they convert to software, not services |

This contamination is not evenly spread. It is **heaviest in exactly the terminology the current business hypothesis proposes to own**:
- `generative engine optimization` → course, meaning, **jobs**, free course, certification ahead of *agency*
- `answer engine optimization` → **certification**, course ahead of *services*
- `conversion rate optimization` → meaning, course, **jobs**
- `crm automation`, `ai marketing automation` → course, jobs, salary, specialist
- `lead automation` → **entirely** automation-engineering jobs
- `seo consultant` → **salary, jobs** first
- `technical seo` → meaning, checklist, course, **interview questions**

**INFERENCE:** ranking for the hypothesis's own category terms would deliver an audience substantially composed of students, job-seekers and competitors. Traffic in these families cannot be read as demand.

### 1.2 Buyers do not use the industry's acronyms
Where buyers describe the AI-search problem, they use **outcome language**, not technique language:
- "how to **appear in ChatGPT**" — eight clean variants
- "how to **get cited by AI**" / "get **mentioned** in AI overviews" — eight clean variants
- "how to **rank in AI overviews**" — four clean variants

Against this, `ai visibility agency` degrades into unrelated hotel noise, and the bare acronym `aeo` is owned by Aeon magazine, AEON Credit and Aeon Flux.

**INFERENCE:** this is direct search evidence for Session 02's recommendation to reframe the spearhead from a technique category to an outcome. The buyer already speaks in outcomes; only agencies speak in acronyms.

### 1.3 Indian buyers search locally, and are price-aware
- `seo company` → **"in pune" is the top suggestion**
- `digital marketing agency` → **"pune" first, then "hadapsar"** (a Pune suburb)
- `performance marketing agency` → **"pune" first**
- `healthcare digital marketing agency` → **"in pune" first**
- `ai seo agency` related searches include **"near undri, pune"**
- PAA: "How much does SEO cost in Pune?", "How much does AI SEO cost?"; autocomplete: "affordable ai seo services in india", "seo services cost"

**INFERENCE:** India-lens organic demand is *local and price-sensitive*. This is a warning as much as an opportunity — India-sourced organic leads will arrive with price expectations anchored to a market where packaged SEO sells from $199/month (`COMPETITOR_RESEARCH.md` S-26) and Pune SEO pricing content ranks quoting figures from ₹8,xxx.

---

## 2. Where commercial demand genuinely exists

Ranked by strength of the observed signal.

### 2.1 Vertical/industrial B2B search — **strongest**
`seo for manufacturing` returned eight variants, **every one commercial**, six explicitly provider-seeking (`seo agency for manufacturing`, `best seo agency for manufacturing`, `seo agency for manufacturing in surat`), with **zero course, jobs, tool or acronym contamination** — the only family in the session with that property. `digital marketing for manufacturing companies` adds `agency for b2b manufacturing companies in mumbai`.

Its SERP (`SERP_RESEARCH.md` §7) is held by small Pune agencies, and a **3-year-old agency with 17 reviews holds a Local Pack slot** beside 486- and 507-review generalists. The buyer's outcome word is **"RFQs"**.

### 2.2 Local generalist terms — **strong demand, weak accessibility**
`digital marketing agency pune` and `performance marketing agency pune` show strong hyperlocal demand. **This is MappedSkills' current declared category.** The demand exists; MappedSkills is not capturing it. The SERP explains why: Dimakh (since 1998), Movinnza (since 2004), Brainmine (13+ years), with 75–4,543 reviews displayed.

**This deserves emphasis.** The owner-supplied fact that the contact form generates no enquiries **cannot be attributed to absent search demand in the current category.**

### 2.3 `ai seo agency` — **the one AI category term with buyer intent**
The only AI-family seed whose suggestions are dominated by provider-seeking, with modifiers spanning Mumbai, Noida, Bangalore, Delhi **and** Melbourne, UK, Singapore, London, Malaysia. Its SERP is listicle-gated rather than authority-gated, and local variants (`ai seo agency pune`, `near undri, pune`) exist.

### 2.4 B2B / enterprise SEO — **clean but small**
`b2b seo` → agency, services, strategy, company, consultant, agency in mumbai, agency in india. `enterprise seo` → services, agency, consultant, services in india. Clean provider intent, high buyer sophistication, no contamination.

### 2.5 WhatsApp automation — **the one live automation signal in India**
`whatsapp automation` → **for business, tool, free, price, service provider**. Genuine India-specific commercial intent, consistent with WhatsApp's role in Indian business communication. It is the only automation seed not dominated by courses, jobs or salaries.

---

## 3. Where search demand is weak or actively misleading

| Family | What the evidence shows | Verdict |
|---|---|---|
| **"Search visibility" / "search growth" / "organic growth"** | `search growth agency` → **(NONE)**. `search visibility agency` → one weak suggestion plus noise. `search visibility` → owned by **getcontact, Twitter/X, Instagram** profile settings. `organic growth agency` → owned by **TikTok/Twitter follower-growth services**. `organic acquisition` → collides with M&A news about the company "Organic India". | **REJECT as positioning language.** Not merely unused — **already owned by other industries.** Direct search evidence against the territory in `POSITIONING.md` |
| **"CRO" as an acronym in India** | `cro services` → **Contract Research Organisation (pharma)**: market, pharma, llc, corp, in india. `b2b cro` → croissant, crown ring, cross-border payments — **zero relevant suggestions**. `ecommerce cro` → cropper, crop, crosson. `conversion rate optimization agency` → **(NONE)** | **The acronym is broken in the India market.** Conversion work must be sold through the *problem*, never the acronym |
| **GEO / AEO / LLMO as category terms** | Upstream intent is course, meaning, jobs, certification. `aeo` bare → Aeon magazine/credit/Flux. Terminology still fragmenting (related searches offer GEO, AEO **and AIO**). SERP held by Forbes, PwC, Coursera, Ahrefs, Semrush, a16z | **Ranking here attracts learners and competitors, not buyers** |
| **"AI visibility" as a service term** | Autocomplete: checker, score, tool, tracker, free, platform — **not one agency suggestion in the top nine**. `ai visibility agency` degrades to hotel noise. SERP: **ten free tools, zero services**, led by Ahrefs and Semrush | **Demand resolves to free software.** Not an agency acquisition route |
| **Marketing automation as a category** | `lead automation` → fully automation-engineering jobs. `crm automation`, `ai marketing automation` → course, jobs, salary. `marketing automation agency` → mostly international modifiers. SERP: **a parked expired domain ranks page 1**; the credible entity is a Salesforce implementation partner | **Weak and low-value in India** |
| **"Growth marketing" / "revenue marketing" / "RevOps"** | `growth marketing agency` **collapses entirely into "digital marketing agency"** — no independent identity. `revenue marketing agency` → prophet/income/revenue-share noise; **not a query**. `revops agency` → tiny, UK/HubSpot-flavoured, with "what is revops" | **All three non-viable as acquisition categories** |
| **Lead-response-time and follow-up automation** | `how to improve lead response time` → **(NONE)**. `lead automation` → job-seekers | **Not search-acquirable.** Named in the brief; the evidence does not support it |
| **`reduce cost per lead`** | Suggestions are **Meta ads, Facebook, Facebook ads, Google Ads** | **A paid-media problem in buyers' minds**, not an organic or conversion one |
| **`seo audit` as an entry-offer term** | **"free" appears three times** in the top eight (tool free, free, website free) | Audit-seekers want a **free tool**. Bears directly on the paid-diagnostic entry offer proposed in Session 02 (§8) |
| **`seo for exporters`** | **(NONE)** | Not a query, despite export being a real manufacturer motive |

---

## 4. Intent classification of the strategically relevant families

| Family | Primary intent | Buyer sophistication | Could it become a qualified agency enquiry? |
|---|---|---|---|
| `seo agency for manufacturing companies` | **T / CI** | Medium | **Yes — highest confidence in the session** |
| `digital marketing / performance marketing agency pune` | **T** | Low–Medium | Yes, but the SERP is tenure-gated |
| `ai seo agency` (+ city variants) | **T / CI** | Medium–High | **Yes** |
| `b2b seo` / `enterprise seo` | **CI / T** | High | Yes — small volume, high value |
| `why your website gets traffic but no leads` | **PA** | Low–Medium | **Yes, with a conversion-shaped offer** |
| `how to appear in chatgpt` / `how to get cited by ai` | **PA** | Medium | **Plausibly** — problem-aware, one step from a diagnostic |
| `whatsapp automation for business` | **T / TD** | Low | Partly — many want a tool, some want a provider |
| `cro agency india` | CI | Medium | Weakly — thin demand |
| `geo vs seo`, `aeo vs seo` | **CI / I** | Medium | Rarely — comparison-stage, and the SERP is institutional |
| `generative engine optimization`, `answer engine optimization` | **I / CAREER** | Medium | **No** |
| `ai visibility checker`, `llm visibility`, `chatgpt visibility` | **TD** | Medium | **No — converts to free software** |
| `seo consultant`, `technical seo`, `lead automation` | **CAREER** | n/a | **No** |
| `search visibility`, `organic growth agency` | Contaminated | n/a | **No** |

---

## 5. Problem-led versus category acquisition

The brief asked whether problem-led search is a better acquisition route than category terms. **The evidence says yes in specific places, and it is not close.**

| | Category terms | Problem-led terms |
|---|---|---|
| Contamination | Heavy (courses, jobs, tools, broken acronyms) | **None observed** |
| Vocabulary | Agency vocabulary | **Buyer's own words** |
| SERP incumbents | Forbes, PwC, Ahrefs, Semrush, CXL, Baymard, a16z — or listicle walls | **Peer-level small agencies** |
| Freshness sensitivity | Low | **High** — results from "4 days ago" ranking |
| Route in for MappedSkills | Get listed in someone else's listicle | **Publish and compete directly** |

**But the advantage is conditional on framing, not topic.** The same discipline splits in two:
- `how to improve website conversion rate` → **CXL and Baymard** → DIFFICULT
- `why your website gets traffic but no leads` → **small agencies, freshness-rewarded** → ATTRACTIVE

**INFERENCE:** MappedSkills' content opening is not "write about CRO" or "write about GEO". It is **write the buyer's symptom sentence**. Generic educational framing walks into institutional SERPs; symptom framing does not.

**Counter-evidence recorded honestly:** problem-led is *not* uniformly strong. `how to improve lead response time` and `brand not showing in chatgpt` return **(NONE)**; `reduce cost per lead` belongs to paid media; `why is my website not showing in chatgpt` collides with generic website-broken queries.

---

## 6. AI-search overlap with traditional search demand

**Where the overlap is real and buyer-shaped:**
- `how to appear in chatgpt` (8 variants) · `how to get cited by ai` (8 variants) · `how to rank in ai overviews` (4 variants)
- `ai crawler` → **access checker, checker, access, test** — a technical-diagnostic family, and one where MappedSkills has demonstrable first-hand competence: Session 01 traced exactly this on its own site (a live `public/robots.txt` serving no AI-crawler directive while an inert `app/robots.ts` would have blocked GPTBot and CCBot site-wide)
- `ai seo agency` — the one commercially live AI category term

**Where the overlap is illusory:**
- Everything ending in *visibility*, *checker*, *score*, *tracker* → free software
- Everything named GEO/AEO/LLMO → courses, jobs, certification, and SERPs owned by Forbes, PwC, Coursera, Ahrefs and a16z
- `geo vs seo` / `aeo vs seo` → real demand, unwinnable SERP, and the **top-voted Reddit answer is explicitly sceptical that GEO is a distinct discipline** — consistent with Google's own guidance (`SOURCE_REGISTER.md` S-01)

**INFERENCE.** The AI-search opportunity in search-acquisition terms is **narrower than the hypothesis assumes, and differently shaped**. It is not a category to own. It is (a) a set of buyer-phrased problem questions, (b) a technical-diagnostic surface around crawler access and citability, and (c) a credibility layer that makes an SEO proposition current. Sold as a category, it collides with free tools, institutional publishers and a sceptical practitioner audience.

---

## 7. CRO opportunity

**As a category: weak in India.** The acronym is owned by pharma; `conversion rate optimization agency` returns nothing; the long form is course- and jobs-dominated; the `cro agency india` SERP is thin enough that a two-year-old listicle and a "Top 1" listicle rank — thin supply *and* thin demand.

**As a problem: strong.** `why your website gets traffic but no leads`, `why is my website not generating leads`, `how to get more leads from website` are all clean, buyer-phrased, and sit on the most winnable SERP observed.

**As part of a vertical outcome: strongest.** Manufacturing buyers search for agencies and want **RFQs**. That is a conversion outcome expressed in the vertical's own language, reachable without the word "CRO" ever appearing.

**Internationally: materially better.** `cro agency` modifiers are **Manchester, UK, London, Melbourne, Sydney** ahead of any Indian city but the generic "india".

**INFERENCE:** CRO should be delivered and evidenced, but **not marketed as a category in India**. It should be sold as the second half of one outcome — found *and* enquired-with.

---

## 8. Automation opportunity

Search evidence is **negative for a Marketing Automation pillar** and mildly positive for one narrow capability.

- `lead automation` → fully contaminated by automation-engineering jobs
- `how to improve lead response time` → **(NONE)**
- `crm automation`, `ai marketing automation` → course, jobs, salary, specialist
- `marketing automation agency` → real, but modifiers are Miami, UK, London, Dubai, USA, Canada; "in india" ranks 6th
- SERP: **a parked, expired domain ranks page 1**; the credible ranking entity is a **Salesforce implementation partner**; `hubspot partner` autocomplete shows buyers going to the **platform's own partner directory**
- **Exception:** `whatsapp automation` → for business, tool, free, price, **service provider** — genuine India commercial intent

**INFERENCE:** automation is **not search-acquirable in India at the category level**, and buyers who do search route to platform partner directories rather than to agencies. This independently corroborates Session 02's conclusion that automation belongs beneath a broader outcome, not in the primary positioning. WhatsApp automation is the one component with live Indian demand — and it is a *capability inside* a follow-up offer, not a positioning.

---

## 9. Vertical opportunity

**Manufacturing / industrial B2B — leading candidate.**

| Criterion | Assessment | Evidence |
|---|---|---|
| Search demand | **Cleanest observed** — 8 commercial variants, no contamination | `KEYWORD_UNIVERSE.md` §9 |
| Competitive intensity | **Low-moderate**; small local incumbents, modest content | `SERP_RESEARCH.md` §7 |
| Specialisation beats tenure | **Observed** — 3-year/17-review agency in the Local Pack beside 486/507-review generalists | `SERP_RESEARCH.md` §7 |
| Buyer value | Considered purchase, long cycle, RFQ-driven | Nucleosys "Get RFQs Fast"; Nico Digital "long sales cycles" |
| MappedSkills credibility | **Geographic** — Pune is a major Indian automotive/engineering centre | Contextual |
| International bridge | **Present** — Indian manufacturers seek export enquiries | Nucleosys: "both local and international enquiries" |
| Topical-authority advantage | Narrow enough to be ownable by a small team | Inference from SERP composition |
| Proof requirement | Moderate — one credible manufacturer case study would carry the vertical | Inference |

**Healthcare:** clean, Pune-first demand (`healthcare digital marketing agency in pune`). **SERP not tested.** Higher compliance sensitivity.
**Education:** clean demand, but **SRV Media anchors education in Pune** with enterprise proof (`COMPETITOR_RESEARCH.md` S-25). Contested.
**B2B SaaS:** an *international* category, thin in the India lens — `seo for saas companies` degrades into investor queries. The international specialist cohort is mature and well-funded (Omniscient, TripleDart, Animalz, Skale, Kalungi).
**Exporters as a vertical:** `seo for exporters` → **(NONE)**. Reject as a term; the motive is real but must be expressed through manufacturing language.

**Stated per the brief:** manufacturing is supported by **one autocomplete family and one SERP**. It is a **leading candidate requiring confirmation**, not a validated decision. Evidence is **sufficient to prioritise investigation**, **insufficient to commit** the business.

---

## 10. India versus international

| | India (directly observed) | International (indirect only) |
|---|---|---|
| Evidence quality | **Strong** — Pune-localised autocomplete and ten live SERPs | **Weak** — geo modifiers Google appended, plus one US-only WebSearch |
| Demand shape | Local, city- and suburb-modified, **price-aware** | Category- and vertical-shaped; the modifiers Google appends are UK, London, Manchester, Melbourne, Sydney, Singapore, Dubai, Miami |
| Category vocabulary | `ai seo agency` works; GEO/AEO are course terms; CRO acronym broken | `cro agency` + UK/AU cities is Google's own top completion; AI-SEO-for-B2B-SaaS is a mature cohort |
| Price level | Packaged SEO from $199/mo; Pune SEO pricing content ranks quoting ₹8,xxx; "affordable ai seo services in india" | Reported $3,000–$20,000/month retainers (**secondary sources, not verified at source**) |
| SERP accessibility | Local terms tenure-gated; vertical and problem terms open | **UNKNOWN — not observed** |

**INFERENCE (staged, not either/or).** India is where MappedSkills can *see* the demand, has geographic credibility, and can win vertical and problem-led SERPs — but it is a price-compressed market whose organic leads will arrive anchored to sub-$200/month packages. International is where the retainers are, but **not a single international SERP was observed**, so no claim about winnability abroad is supportable today.

The defensible reading: **build the demonstrable asset in India, in a vertical, on problem-led and vertical terms — and treat international as a deliberate second stage** validated by its own SERP research. The manufacturing vertical happens to carry a natural bridge, because Indian manufacturers are themselves seeking international enquiries.

**Explicitly rejected (per brief §15):** location doorway pages and large-scale city-page SEO. The local demand is real, but the answer to it is one strong local entity — Google Business Profile, reviews, a genuine Pune presence — not a page grid.

---

## 11. Service-page versus content opportunity

Opportunity *types* only. **No sitemap, URL architecture, page inventory or content list is created here** (brief §19).

| Topic area | Opportunity type | Reason |
|---|---|---|
| Manufacturing / industrial search-to-enquiry | **Core service page** | Clean transactional intent; small incumbents; specialisation beats tenure |
| Sub-segments within the vertical (e.g. engineering components, industrial equipment) | **Sub-service pages** | Only after the parent page proves itself. Must not become a page grid |
| "Traffic but no leads", "website not generating enquiries" | **Problem/solution pages** | The most winnable SERP observed; buyer-phrased; freshness-rewarded |
| "How to appear in ChatGPT", "how to get cited by AI" | **Educational articles, refreshed on a cadence** | Real buyer-phrased demand; competitive but enterable; high AI-citation relevance |
| AI crawler access and citability | **Technical guide + diagnostic** | `ai crawler access checker` intent; genuine MappedSkills competence from its own audit |
| SEO / AI-SEO pricing in India and Pune | **Transparent pricing / cost page** | PAA asks it twice; a ranking snippet already quotes Pune pricing; under-served |
| GEO vs SEO, AEO vs SEO | **DEFER** | Real demand, unwinnable SERP (Forbes, PwC, Semrush, a16z), sceptical audience |
| Manufacturing enquiry/RFQ conversion benchmarks | **Original research / benchmark page** | Nothing comparable observed for Indian manufacturing; would earn links and citations |
| Client outcomes | **Case studies** | Gating constraint from Session 02 — requires owner permission, cannot be invented |
| AI Visibility Score / checker | **Tool — for sales use only** | SERP is ten free tools led by Ahrefs and Semrush. **Not an acquisition asset** |
| Glossary of GEO/AEO/AIO/LLMO | **REJECT** | Definitional SERPs owned by Coursera, PwC, Forbes, Ahrefs |
| City pages for every Indian city | **REJECT** | Project Rule 10; brief §15 |

---

## 12. Content moat

Separating the three jobs the brief asks to distinguish.

| Asset | Likely to **rank** | Likely to **earn links/citations** | Likely to **convert buyers** |
|---|---|---|---|
| **Indian manufacturing enquiry/RFQ benchmark** (recurring, published method) | Medium | **HIGH** — no comparable Indian dataset observed | **HIGH** — the buyer's own metric |
| **Longitudinal AI-visibility study of a defined Indian category**, variance-aware per the SparkToro finding | Medium | **HIGH** — methodologically honest in a market that is not | Medium — proves method, not outcome |
| **Buyer-symptom problem library** ("traffic but no leads" and its variants) | **HIGH** | Low | **HIGH** |
| **Vertical technical guides** (manufacturing site structure, spec sheets, RFQ paths, AI crawler access) | Medium–High | Medium | **HIGH** |
| **Transparent India/Pune pricing content** | **HIGH** | Low | Medium–High — but attracts price-shoppers |
| **AI visibility checker tool** | **LOW** — ten free competitors led by Ahrefs and Semrush | Low | Medium as a sales instrument |
| **GEO/AEO explainers and glossaries** | **LOW** | Low | Low |

**INFERENCE.** Only two candidate assets plausibly do **all three jobs**: the manufacturing enquiry benchmark and the buyer-symptom problem library. Both are consistent with the moat requirements Session 02 identified (a compounding dataset; a published, variance-aware method) and neither depends on owning a piece of contested terminology.

---

## 13. What this research cannot answer

1. **Absolute demand volume anywhere.** No tool access. Whether the manufacturing family is large enough to sustain a business, or is a handful of searches a month, is **UNKNOWN** — the autocomplete evidence establishes that Google recognises the query pattern, not how many people use it. No figure of any kind should be inferred from this document.
2. **International SERP winnability.** Not observed. All international inference is indirect.
3. **AI Overview presence and composition.** Could not be reliably observed (`SERP_RESEARCH.md` §0).
4. **Backlink and authority barriers.** Inferred from domain identity only; nothing measured.
5. **MappedSkills' own current rankings, impressions or Search Console baseline.** None exists — Session 01 established there is no analytics in production.
6. **Whether Indian manufacturing SEO buyers pay enough** to support the price point Session 02's direction implies.
7. **Whether healthcare would test better than manufacturing.** Its autocomplete is equally clean; its SERP was not examined.
