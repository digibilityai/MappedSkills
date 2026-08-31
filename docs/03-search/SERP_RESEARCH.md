# SERP Research — Session 03

**All SERPs observed:** 2026-08-31
**Branch:** `test_branch`
**Status:** RESEARCH FINDING. Dated observations of a moving target.

---

## 0. Method

**Instrument:** live Google SERPs read in a real browser session, `https://www.google.com/search?q=...&hl=en`.

**Geography (VERIFIED FACT):** the session's network egress resolves to **Pune, Maharashtra, India (AS55836 Reliance Jio)**, confirmed via `ipinfo.io`. **Every SERP below is India- and Pune-localised.** This is what a Pune-based searcher plausibly sees. It is **not** what a London, New York, Sydney or Dubai searcher sees, and no claim is made about those.

**One US-lens cross-check** was run using the WebSearch tool, whose own tool description states it is US-only. It is labelled where used (§9).

**Sample and date:** thirteen SERPs, chosen to test the specific strategic questions in the session brief rather than to survey the market. **Every SERP in this document was observed once, on 2026-08-31.** Each individual observation below inherits that date; none was re-checked.

### Limitations, stated plainly
1. **Single observation per SERP, single day, single location.** No rank tracking, no historical comparison, no personalisation control.
2. **SEARCH VOLUME NOT VERIFIED, KEYWORD DIFFICULTY NOT VERIFIED** — no tool access. **No backlink or authority metric was measured for any ranking domain.** Where this document infers an authority barrier, it does so from *domain identity* (e.g. "Forbes and PwC rank here") and says so.
3. **AI Overview presence could not be reliably observed.** On the one SERP probed directly for it (§8), the page contained both an "AI Overview" heading and the fallback strings "An AI Overview is not available for this search" / "Can't generate an AI overview right now". No AI Overview body rendered on any SERP. **INFERENCE:** an artifact of automated browsing. **Therefore this document makes no claim about which queries trigger AI Overviews.** Carried to Session 04.
4. **Paid ads were not reliably visible** in the extracted page text. No claim is made about ad presence or advertiser identity on any SERP.
5. "Millions of results" was never used as a difficulty proxy, per the session brief.

### Winnability scale
**VERY DIFFICULT · DIFFICULT · COMPETITIVE BUT POSSIBLE · ATTRACTIVE · EMERGING OPPORTUNITY · INSUFFICIENT EVIDENCE.** All classifications are **INFERENCES** from observed page types, ranking-domain identity and content freshness. They are judgements, not measurements.

---

## 1. `ai seo agency` — the AI category term with real provider intent

**Observed page types:** agency service pages (Repindia "Award Winner AI SEO Agency in India", OuterBox, SEO.ai) · **listicles** (LLM Audit "Top AI SEO Agencies in Pune", Revv Growth "Best AI SEO Agencies of 2026", ZeroAdo "7 Best AI SEO Agencies in India", spicymargarita "9 Top AI SEO Agencies") · **LinkedIn article** · **Reddit ×2** (r/b2bmarketing, 70+ comments; plus "The 5 Best AI SEO Agencies for LLM and Generative Search", 16 posts, dated 6 May 2026).

**Domain mix:** India-heavy (Repindia, ZeroAdo, LLM Audit) with US/international players (OuterBox, SEO.ai, Revv Growth). No megabrand publisher dominance.

**People Also Ask:** What is an AI SEO agency? · Which AI SEO agency is the best? · Is there an SEO for AI? · **How much does AI SEO cost?**

**Related searches:** `ai seo agency near pune, maharashtra` · `ai seo agency near undri, pune` · ai seo agency in india · ai seo agency list · ai seo agency reviews · best ai seo agency.

**Observations of consequence:**
- **Local intent is live at neighbourhood level.** Google surfaces "near pune, maharashtra" and "near **undri**, pune" — a Pune suburb. AI-SEO buying intent exists locally, not only nationally.
- **A tooling company (LLM Audit) ranks a "Top AI SEO Agencies in Pune" listicle** — the same acquisition play Session 02 documented, now executed at city level against MappedSkills' home market.
- **Reddit appears twice with heavy engagement.** Buyers are seeking peer opinion about which AI SEO agencies are real.
- "How much does AI SEO cost?" in PAA indicates price-stage buyers.

**Winnability: COMPETITIVE BUT POSSIBLE.** The SERP is not held by high-authority publishers. It is held by *listicles*, which a new entrant cannot outrank with a service page alone but can enter *by being listed in*. The local variants (`ai seo agency pune`) are a genuinely thinner target.

---

## 2. `seo company in pune` — MappedSkills' home local SERP

**Observed page types:** local agency service pages (Dimakh Consultants "Best SEO Company in Pune… **Since 1998**", Movinnza "…led by Shailendra Kadulkar, **in SEO since 2004**, 159+ brands, Kharadi HQ", Brainmine "Pune's best SEO company with **13+ years**, 850+ clients", Web Link Services, Itorix Infotech) · **local listicles by agencies** (Awrange "Top 10 Best SEO Agencies in Pune", Web Bird, Ideamagix) · **Semrush Agency Partners directory**.

**Star ratings shown on most results:** 5.0(75), 5.0(4,543), 5.0(60), 5.0(121), 5.0(205), 5.0(217).

**People Also Ask:** Which SEO agency is the best in Pune? · **How much does SEO cost in Pune?** · Which company is best for SEO? · Who is SEO in a company?

**Observations of consequence:**
- **Incumbent tenure is the barrier.** Dimakh since 1998 (28 years), Movinnza since 2004 (22 years), Brainmine 13+ years. These are relationship-and-review moats, not content moats.
- **Review counts are displayed and large.** MappedSkills' review position is **UNKNOWN** and was not checked.
- **Itorix Infotech's snippet already reads "Local SEO, AEO & GEO strategies"** — a Pune incumbent has already absorbed the AEO/GEO vocabulary into its core SEO landing page. This is local, first-hand confirmation of Session 02's commoditisation finding.
- **Price-transparency content ranks:** Web Bird's snippet surfaces "SEO pricing in Pune typically ranges from ₹8,…". PAA asks "How much does SEO cost in Pune?" — an unmet-ish, winnable content angle.

**Winnability: DIFFICULT.** Not because of content quality — the ranking pages are ordinary — but because the ranking signal here is **local tenure, reviews and Google Business Profile strength**, which MappedSkills cannot manufacture quickly. Entering via listicles and pricing-transparency content is more realistic than a head-on service page.

---

## 3. `generative engine optimization agency` — the GEO category SERP

**Observed page types:** agency GEO service pages (Brandstory Bangalore, OrangeMantra, OptMum Digital, Blusteak, Dig & Dig) · **listicles** (Minuttia "10 Best GEO Agencies", ZeroAdo "7 Best GEO Agencies in India", **Omniscient Digital "The 8 Best GEO Agencies for B2B SaaS Brands in 2026"**) · **LinkedIn article** ("Top GEO Companies in India").

**Domain mix:** overwhelmingly **Indian agencies** (Brandstory, ZeroAdo, OrangeMantra, OptMum, Blusteak, SEO Discovery, Techmagnate, TripleDart named in snippets) — partly a function of the Pune IP, but the density of Indian GEO service pages is itself the finding.

**Related searches:** Top GEO agencies · Best geo agency in Bangalore · Minuttia · **AIO agency** · Semrush · **AEO agency** · GEO Expert in India · Top GEO companies.

**Observations of consequence:**
- **Indian agencies have already built dedicated GEO service pages at scale.** This is not an emerging niche in India; supply has arrived.
- **Terminology is still fragmenting, not consolidating.** Related searches offer GEO, AEO **and AIO** as parallel category names. Building a brand on any single acronym is a bet on which one survives.
- **Omniscient Digital's vertical-sliced listicle ("for B2B SaaS Brands")** shows how specialists escape the generic listicle fight — by narrowing the *audience*, not the technique.

**Winnability: DIFFICULT and strategically unattractive.** Supply already exceeds visible differentiation, and `KEYWORD_UNIVERSE.md` §3 shows the underlying seed (`generative engine optimization`) is dominated by course, meaning and jobs intent. **Ranking here would attract learners and competitors more than buyers.**

---

## 4. `what is answer engine optimization` — AI-search educational content

**Observed ranking domains:** **Coursera · PwC · Seobility · HubSpot · Forbes · Webflow · Ahrefs (an "Answer Engine Optimization (AEO) Course", 29 Apr 2026) · Reddit r/localseo (120+ comments, 125 answers)**.

**Winnability: VERY DIFFICULT.** **INFERENCE from domain identity:** the definitional layer of AI-search content is held by global institutions (Coursera, PwC, Forbes) and by the SEO software vendors themselves (HubSpot, Ahrefs, Seobility, Webflow). A Pune agency's explainer has no realistic route to this SERP.

**Strategic consequence:** the reflexive plan of "publish AEO/GEO explainer content to build topical authority" is **not supported by SERP evidence**. That content would be written into a SERP owned by Forbes, PwC and Ahrefs. Note also that **Ahrefs now sells an AEO course** — the category's educational layer is being formalised by vendors, not by agencies.

---

## 5. `ai visibility checker` — the decisive SERP of Session 03

**Observed page 1, in order:** Ahrefs (free) · Semrush (free) · Frase.io (free) · Ubersuggest / Neil Patel (free) · SEO Review Tools (free) · Arobis AI (free, no signup) · amivisibleonai.com (free, 30 seconds) · **ResultFirst** (an Indian SEO agency, free tool) · Amplitude (free report) · honeyb.ai (free).

**Every result on page 1 is a free tool. Not one is an agency service page.**

**Observations of consequence:**
- This **confirms at SERP level** what `KEYWORD_UNIVERSE.md` §3 found at autocomplete level: **AI-visibility demand resolves to free software, not to agency engagements.**
- Positions 1 and 2 are **Ahrefs and Semrush** — corroborating Session 02 sources S-12 and S-13 with live SERP evidence.
- **An Indian SEO agency (ResultFirst) already uses a free AI visibility checker as a lead magnet.** The tactic is commoditised even within MappedSkills' domestic market.

**Winnability: VERY DIFFICULT.**
**Strategic consequence — direct and unambiguous:** an "AI Visibility Score" tool built by MappedSkills would enter a SERP where two of the world's largest SEO software companies hold the top two positions with free products, alongside at least eight other free competitors including an Indian agency. Session 02 challenged the AI Visibility Score as a moat on competitor evidence; **the search evidence independently confirms it is not even a viable acquisition asset in its own right.** It may still be worth building as a *sales* instrument. It should not be expected to acquire traffic.

---

## 6. `why your website gets traffic but no leads` — the most winnable strategic SERP observed

**Observed page types:** small and mid-sized agency blog posts (TechArk Solutions, ImpressBSS **12 Aug 2026**, EB Media **"4 days ago"**, Sprintli **3 Jul 2026**, Gill Andrews) · LinkedIn post (1 month ago) · **YouTube videos** (Ajay Dhunna 18 Mar 2026; Pronto Marketing "1 week ago"; **SEO Discovery "Why B2B Companies Get Traffic But No Leads?" 22 Jun 2026**) · Slideshare.

**People Also Ask:** Why is my website getting traffic but no sales? · Why is your website not generating leads? · How to get 1000 visitors a day to your website? · Why am I getting clicks but no conversions?

**Observations of consequence:**
- **No megabrand holds this SERP.** No HubSpot, no Semrush, no Forbes, no CXL. Contrast §4 and §8.
- **Extreme freshness sensitivity.** Results dated "4 days ago", "1 week ago", 12 Aug 2026, 3 Jul 2026 are ranking. **INFERENCE:** recency is a live ranking factor here, which favours a consistent publisher over an entrenched one.
- **The ranking incumbents are peers,** not authorities — small agencies with ordinary content.
- **An Indian agency (SEO Discovery) is already working this angle on YouTube** with a B2B framing.

**Winnability: ATTRACTIVE.** This is the clearest content opening found in the session, and it sits precisely at the junction of search and conversion.

---

## 7. `seo agency for manufacturing companies` — the vertical test

**Local Pack (Pune-dominant):**
- Opstech Solution Pvt. Ltd — 4.9 (507 reviews), 7+ years, Aundh-Wakad Rd, Pune
- **Passion Minds Private Limited | B2B Digital Marketing Agency for Manufacturing Industries | SEO Services** — 4.7 (17 reviews), **3+ years**, Senapati Bapat Rd, Pune
- OMX Technologies — 4.8 (486 reviews), 10+ years, Pune

**Organic page types:** local specialist pages (Nucleosys Tech **"SEO for Manufacturing Industry in Pune | Get RFQs Fast"**, Saturn Web Media "SEO Agency for Manufacturing Companies in Pune", OwlClaw "SEO Agency for Manufacturing in Pune", Awrange) · international listicles (Thrive "12 Best Manufacturing SEO Agencies in 2026", Gushwork "15+ Manufacturing SEO Companies").

**People Also Ask:** What is SEO in manufacturing? · How much does an agency charge for SEO? · What is the 80/20 rule in SEO? · **Can ChatGPT do SEO?**

**Observations of consequence:**
- **A Pune agency with only 17 reviews and 3 years of trading holds a Local Pack position** on a specialist manufacturing query — against neighbours with 486 and 507 reviews on generic terms. **INFERENCE: specialisation is substituting for tenure on this SERP.** This is the single most encouraging observation in Session 03, because tenure is exactly what MappedSkills lacks (§2).
- **The buyer's outcome word is "RFQs"** (Nucleosys: "Get RFQs Fast"). Manufacturing buyers want *qualified enquiries*, not traffic — a conversion-shaped outcome, not a ranking-shaped one.
- **Export intent is present:** Nucleosys's snippet references "both local and **international** enquiries". Indian manufacturers want overseas buyers — a natural bridge to international work without leaving the vertical.
- Content depth among the local incumbents is modest; the international listicles (Thrive, Gushwork) are US-focused and do not serve an Indian manufacturer.

**Winnability: ATTRACTIVE (with the caveat below).**

**Caveat, stated per the session brief:** this is **one vertical, one SERP, one day**. It is strong evidence for a **leading candidate**, not sufficient evidence for a vertical commitment. Healthcare (`healthcare digital marketing agency in pune` — clean, Pune-first) was not SERP-tested. Education was not SERP-tested and is locally occupied by SRV Media.

---

## 8. `geo vs seo` and `how to improve website conversion rate` — two SERPs that close off obvious content plays

### 8a. `geo vs seo`
**Observed ranking domains:** Informa TechTarget · **Semrush** · Reddit r/SEO (80+ comments; a second thread with 112 answers) · **Contentful** · Medium · **Neil Patel** · **a16z (Andreessen Horowitz)** · dotCMS · YouTube.

**Winnability: VERY DIFFICULT.** **INFERENCE from domain identity:** held by SEO software vendors, CMS vendors, a top-tier VC firm and a major trade publisher.

**Note worth recording:** the top Reddit answer to "What's the REAL difference between approaching SEO [and GEO]" reads, in substance, *"Short answer: No. Long Answer: Hell no."* Practitioner consensus on the most-engaged thread is **sceptical that GEO is a distinct discipline** — consistent with Google's own published position (`SOURCE_REGISTER.md` S-01).

### 8b. `how to improve website conversion rate`
**Observed ranking domains:** **CXL** · Mightybytes · **Baymard Institute** · YouTube (Semrush, ThrillX) · Reddit r/DigitalMarketing.

**Winnability: DIFFICULT.** CXL and Baymard are the discipline's reference institutions.

**The contrast with §6 is the strategic point.** Generic CRO education (`how to improve website conversion rate`) is owned by CRO institutions. The *specific buyer-phrased problem* (`why your website gets traffic but no leads`) is wide open. **Same discipline; opposite winnability. Framing, not topic, determines the opening.**

---

## 9. `cro agency india` and `marketing automation agency india` — two weak SERPs

### 9a. `cro agency india`
**Observed page types:** OrangeMantra (a generalist development shop) · **a LinkedIn showcase page** · ROI Hunt listicle · Socialee · **Clutch directory** · **Mida.so "Top 1 CRO Agencies in India (2026)"** · Linearloop listicle **dated 10 Oct 2024** · Krish TechnoLabs.

**Local Pack:** "ICRC INDIA" (4.5, 31 reviews, marketing agency, 35+ years, Pune) and "CRO AGENCY - Conversion Rate Optimization for Online Business" (advertising agency, **no reviews**).

**Observations of consequence:**
- **A listicle titled "Top 1 CRO Agencies in India"** — the publisher's own tooling apparently found a single qualifying agency. That is a direct signal of **thin supply**.
- **A listicle from October 2024 still ranks on page 1** — nearly two years stale. **INFERENCE: low competitive pressure.**
- The Local Pack is mismatched: a 35-year-old generalist and a review-less business.

**Winnability: COMPETITIVE BUT POSSIBLE.** But read it with `KEYWORD_UNIVERSE.md` §5: `conversion rate optimization agency` returns **(NONE)** in autocomplete and `cro services` is owned by pharmaceutical Contract Research Organisations. **INFERENCE: this SERP is weak because the demand behind it is weak in India, not because a gap is waiting to be taken.** Winning it is cheap and worth little on its own.

### 9b. `marketing automation agency india`
**Observed page types:** **Semrush Agency Partners directory (position 1)** · Cymetrix (a **Salesforce implementation partner**) · The Smarketers "Top 10 MarTech Agencies" · Zappkode · **Moris Media "Top 10 Marketing Automation Agencies for Manufacturing"** · GL Infotech · **automationagencyindia.com — a parked/expired domain whose snippet is domain-renewal boilerplate ("To renew: sign in, open Domain List…")** · Wellfound startup listings.

**Observations of consequence:**
- **A parked, expired domain ranks on page 1.** **INFERENCE:** the SERP is immature and weakly contested — and simultaneously that the query is not commercially valuable enough for anyone to fight for.
- **The credible ranking entity is a Salesforce implementation partner**, corroborating Session 02's finding that automation buyers route to *platform partners*.
- **Manufacturing appears again**, independently, in Moris Media's title.

**Winnability: COMPETITIVE BUT POSSIBLE, low value.** Easy to rank, unlikely to produce qualified enquiries.

---

## 10. US-lens cross-check (WebSearch, US-only tool)

**Query:** `AI search optimization agency for B2B SaaS pricing retainer`.

**Observed:** a mature, well-populated international specialist cohort with **published retainer pricing** reported in the results: Optimist $3,000/mo advisory and $4,000/mo full-service; First Page Sage $8,000–$20,000/mo; DerivateX from $3,500/mo with 90-day sprints; a general band of **$3,000–$15,000/month**, enterprise above $50,000/month.

**Source discipline:** these figures come from **agency-authored listicles and pricing blogs — secondary, self-interested sources**. A direct fetch of one named agency's pricing page returned **HTTP 403** and could not be verified at source. Recorded as **RESEARCH FINDING, NOT VERIFIED AT SOURCE**.

**Observation of consequence (INFERENCE):** even discounted for source quality, the international band ($3,000–$20,000/month ≈ ₹2.5L–₹17L/month) sits **above** the Indian premium anchor from Session 02 (upGrowth, ₹1.5L+/month) and **far above** MappedSkills' currently displayed ₹2,500–₹5,000/month plans. The same discipline is priced in a different league abroad.

---

## 11. Cross-SERP patterns

**P1 — Listicles and directories are the category gatekeepers.** They appeared on **eight of the ten** SERPs (`ai seo agency`, `seo company in pune`, `generative engine optimization agency`, `cro agency india`, `b2b seo agency india`, `marketing automation agency india`, `seo agency for manufacturing companies`, and the US-lens check), frequently outranking the service pages of the agencies they list. Semrush Agency Partners and Clutch recur. **Consequence: for category terms, getting *listed and reviewed* is a more realistic near-term route than trying to outrank the list.**

**P2 — Reddit is a first-page competitor on every question-shaped query.** Present on `ai seo agency`, `how to appear in chatgpt search results`, `geo vs seo`, `what is answer engine optimization` and `how to improve website conversion rate`, often with 80–125 answers. **Consequence: buyers actively seek peer verification of agency claims. Vendor-voiced content competes against a wall of scepticism** — and on two threads the top-voted answer is explicitly sceptical that GEO/AI-SEO is a new discipline.

**P3 — The authority barrier is bimodal, and it tracks framing rather than topic.** Definitional and comparison queries (`what is answer engine optimization`, `geo vs seo`, `how to improve website conversion rate`) are held by Forbes, PwC, Coursera, a16z, Semrush, CXL and Baymard. Buyer-phrased problem queries (`why your website gets traffic but no leads`) and vertical queries (`seo agency for manufacturing companies`) are held by ordinary small agencies. **There is no middle ground: MappedSkills is locked out of the first group and competitive in the second.**

**P4 — Tool queries are owned by tool companies, absolutely.** `ai visibility checker` returned ten free tools and zero services.

**P5 — Specialisation substitutes for tenure.** The clearest instance: a 3-year-old Pune agency with 17 reviews holds a Local Pack slot on a manufacturing-specialist query, beside 486- and 507-review generalists (§7). Against `seo company in pune`, where 13-to-28-year incumbents hold the page (§2), this is the difference between a viable and an unviable route for MappedSkills.

**P6 — Freshness is a live lever on problem-led SERPs.** Results dated "4 days ago" and "1 week ago" rank in §6. Not observed on the institutional SERPs in §4 and §8.

**P7 — Indian buyers are price-aware and Google surfaces it.** PAA "How much does SEO cost in Pune?" and "How much does AI SEO cost?"; a ranking snippet quoting Pune SEO pricing from ₹8,xxx; autocomplete "affordable ai seo services in india" and "seo services cost". **Consequence: transparent pricing content is a genuine and under-served ranking opportunity — and a warning about the price expectations of India-sourced organic leads.**

---

## 12. Winnability summary

| Query family | Winnability | Decisive reason |
|---|---|---|
| `seo agency for manufacturing companies` (+ Pune/industrial variants) | **ATTRACTIVE** | Small local incumbents; specialisation beating tenure in the Local Pack; clean commercial intent upstream |
| `why your website gets traffic but no leads` (+ lead-problem phrasings) | **ATTRACTIVE** | No megabrands; peer-level incumbents; freshness rewarded |
| `how to appear in chatgpt` / `how to get cited by ai` | **COMPETITIVE BUT POSSIBLE** | Reddit, YouTube, HubSpot and OpenAI's own help centre present — but the query is buyer-phrased and deep |
| `ai seo agency` (+ Pune/city variants) | **COMPETITIVE BUT POSSIBLE** | Listicle-gated, not authority-gated; local variants thinner |
| `cro agency india` | **COMPETITIVE BUT POSSIBLE, LOW VALUE** | Stale content and a "Top 1" listicle rank — thin demand, not an unclaimed gap |
| `marketing automation agency india` | **COMPETITIVE BUT POSSIBLE, LOW VALUE** | A parked domain ranks page 1; buyers route via platform partner directories |
| `seo company in pune` / `digital marketing agency pune` | **DIFFICULT** | 13–28 year incumbents with hundreds of reviews; the barrier is tenure and GBP, not content |
| `generative engine optimization agency` | **DIFFICULT and strategically unattractive** | Indian supply already dense; upstream intent is courses and jobs |
| `how to improve website conversion rate` | **DIFFICULT** | CXL and Baymard own generic CRO education |
| `geo vs seo`, `what is answer engine optimization` | **VERY DIFFICULT** | Forbes, PwC, Coursera, a16z, Semrush, Ahrefs, Contentful |
| `ai visibility checker` and all tool queries | **VERY DIFFICULT** | Ten free tools on page 1, led by Ahrefs and Semrush |
| Anything international | **INSUFFICIENT EVIDENCE** | No international SERP was observed directly (§0) |
