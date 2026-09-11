# Website Information Architecture — PROPOSED

**Session:** 07 — Website IA, Search Architecture & Page System
**Date:** 2026-08-31
**Branch:** `test_branch`
**Model:** Claude Opus 5 (high effort)
**Status:** **PROPOSED ARCHITECTURE — NOT APPROVED.** Claude does not approve information architecture. Quality Gate 5 is open and awaits orchestrator and owner review.
**Governed by:** `docs/01-business/BUSINESS_STRATEGY.md` (frozen, `DEC-005`/`DEC-006`). The approved business direction was not reopened.

**Not produced in this session:** page designs, wireframes, visual direction, final copy, headlines, taglines, meta titles, article drafts, schema code, or any implementation.

---

## 0. Directory note — RESOLVED

The project standardises on **`docs/06-IA/`**. The obsolete `docs/06-information-architecture/` directory — which contained only a two-line placeholder `README.md` from the original scaffold commit `566d3e3` and **no substantive artifact** — was inspected and removed in the Session 07 correction pass, under explicit owner authorisation. **One IA directory now exists.**

---

## 1. Architectural summary

**Five decisions carry this architecture. Everything else follows from them.**

1. **The site is organised around one outcome, not a service menu.** `/services` is repositioned from an agency catalogue into the page that *is* the proposition — how MappedSkills produces measurable qualified enquiries. Capability pages sit beneath it as demand-source and delivery pages, not as co-equal pillars.
2. **Existing flat URLs are preserved wherever they carry equity.** Five commercial pages are already the destinations of legacy 308 redirects. Moving them to `/services/*` would create two-hop chains (`/seo-services` → `/seo` → `/services/seo`) for no search benefit. Directory prefixes are introduced **only** for genuinely new, scalable families.
3. **Launch scope is deliberately small: 22 unconditional indexable pages, plus 2 conditional.** The binding constraint on this business is proof, not page count. A large launch site with no analytics, no case studies and no reviews is a bigger liability than a small one. **The two conditional pages are the manufacturing beachhead page and its supporting article; they ship only if the manufacturing validation gate clears before content freeze** (§7).
4. **Search landing pages and company positioning are architecturally separate** (`DEC-008`). `/seo` and `/ai-seo` exist and target their query families; neither is the company's category. The homepage and company pages carry the outcome proposition and no technique category.
5. **The proof deficit is designed into the architecture, not designed around it.** `/research` launches with MappedSkills' own published diagnostics; `/how-it-works` becomes the published methodology including what cannot be attributed; `/work` exists as a route but is **not indexable until at least one real case study exists.**

---

## 2. Site jobs → architecture mapping

Every page primarily serves one or more of the five site jobs.

| Job | Architectural expression | Launch pages |
|---|---|---|
| **A — Commercial acquisition** | Capability and vertical pages targeting provider-seeking queries, all routing to one qualified-enquiry outcome | `/services`, `/seo`, `/ai-seo`, `/google-ads`, `/lead-generation`, `/conversion-optimization`, `/social-media-ads`, `/pricing`, **`/industries/manufacturing` (conditional)** |
| **B — Problem acquisition** | Buyer-symptom pages in the buyer's own words, where the evidence shows the SERP is open | `/problems/traffic-but-no-enquiries` |
| **C — Authority** | An editorial stream with a defined cadence, targeting buyer-phrased question families | `/blog` + 4 launch articles |
| **D — Proof** | A published method, published own-site diagnostics, and a case-study route held back until it can be honest | `/how-it-works`, `/research`, 2 research entries, `/about`, `/work` (non-indexable at launch) |
| **E — Conversion** | **One primary conversion outcome — qualified enquiry creation — reachable through two surfaces (form or meeting booking).** Model-agnostic, so neither the free/paid/hybrid entry decision nor a change of mechanism requires re-architecture | `/contact`, `/schedule-call`, `/thank-you`, plus the CTA system on every page |

---

## 3. URL architecture

### 3.1 Principles

1. **Preserve equity first.** A URL that is the target of an existing redirect, or that plausibly holds external links, is not moved without a stronger reason than tidiness.
2. **Never create a redirect chain.** Where a legacy URL must end up somewhere new, the legacy rule is re-pointed directly rather than layered.
3. **Flat for what exists; prefixed only for what must scale.** `/seo` stays flat. `/problems/`, `/industries/` and `/research/` are prefixed because they are families that will grow and need a shared parent.
4. **Lowercase, hyphenated, no trailing slash** — matching the current Next.js default (`trailingSlash: false`). No change.
5. **No parameterised indexable URLs.** `?category=` filtering must not become a crawlable variant set; if category hubs are wanted later they get real paths.
6. **A directory segment is not automatically a page.** `/industries` has one child at launch and gets no hub page until it has at least two.
7. **The URL never encodes the company's category.** It encodes the page's topic.

### 3.2 Families

| Family | Pattern | Rationale |
|---|---|---|
| Core proposition | `/services` | Existing URL, richest existing schema, existing 308 target from `/digital-marketing-services`. Repositioned, not replaced |
| Capability pages | `/seo`, `/ai-seo`, `/google-ads`, `/social-media-ads`, `/lead-generation`, `/conversion-optimization` | Five of six already exist and are redirect targets. Flat is correct here |
| Verticals | `/industries/{vertical}` | New. Prefixed so a second beachhead needs no migration. **One child at launch. Not a grid** |
| Problems | `/problems/{buyer-symptom}` | New. Prefixed so the family can grow on evidence. **One child at launch** |
| Research | `/research`, `/research/{slug}` | New. Separate from `/blog` because the job, cadence, schema and evidence standard differ |
| Editorial | `/blog`, `/blog/{slug}` | **Retained.** Existing 308 target from `/content-marketing-services`; the most completely implemented SEO surface in the codebase |
| Proof | `/work`, `/work/{slug}` | Consolidates today's split `/work` index + `/portfolio/{slug}` detail. Safe to fix **now** precisely because zero case studies are currently published |
| Company | `/about`, `/how-it-works`, `/pricing`, `/faq`, `/contact`, `/schedule-call` | All existing. Kept |
| Utility | `/thank-you`, `/privacy-policy`, `/terms`, 404 | All existing |
| Reserved, not built | `/tools/{slug}` | Namespace declared so a later tool does not force a migration. **Nothing is built at launch** |

### 3.3 `/blog` versus `/insights` versus `/research` — decision and reasoning

**Decision: keep `/blog` for the editorial stream; add `/research` as a distinct family. Do not rename to `/insights`.**

- `/blog` is the destination of an existing 308 redirect from `/content-marketing-services`. Renaming it creates a chain for no gain.
- `/blog/[slug]` is, on the audit's own assessment, "the most completely implemented SEO surface in the codebase" — authored metadata, canonical, OG article with publish/modify times, `Article`/`Person`/`BreadcrumbList`/`ImageObject` schema, TOC extraction, reading time. Rebuilding that under a new prefix discards working implementation.
- **The directory word has no material ranking effect.** No evidence in this programme suggests buyers search or select by it. "Insights" is agency vocabulary, not buyer vocabulary.
- **What genuinely needs separating is the *job*, not the label.** Editorial articles rank and convert. Original research is dated, method-published, versioned, citable, and updated on a different cadence. Mixing them makes both weaker and makes the research asset harder to cite. Hence a hybrid: `/blog` for articles and guides, `/research` for original studies.

**One risk recorded honestly:** production currently publishes **zero** blog posts, so there is no article equity to protect — the decision above rests on the redirect target and the existing implementation, not on live article rankings, which are **UNKNOWN**.

---

## 4. Homepage architectural role

**No homepage copy is written here.**

| Dimension | Definition |
|---|---|
| **Audience** | Mixed and mostly mid-funnel: a considered-purchase business owner or marketing/commercial lead arriving from a brand search, a referral, a directory listing, or a link from a deeper page. **Not primarily a cold organic entry point** |
| **Primary job** | **E (conversion) and D (proof), then routing.** Make the proposition legible in seconds, make the reason to believe it visible, and route to the one commercial page or vertical that fits |
| **Primary proposition** | The approved outcome — capturing existing buyer demand and turning it into measurable qualified enquiries. **Industry-neutral. No technique category. No acronym** |
| **Topics it must establish** | What MappedSkills does in commercial terms · who it is for (considered purchase, meaningful opportunity value) · that the whole path is measured · that revenue is reported and not promised · that the method is published |
| **Topics it must NOT establish** | That MappedSkills is an SEO/GEO/AEO/AI-search agency · that it is a manufacturing agency · a blended AI visibility score · any guarantee |
| **Must route into** | `/services` (primary) · `/problems/traffic-but-no-enquiries` · `/how-it-works` · `/research` · `/pricing` · the enquiry path · **`/industries/manufacturing` if the conditional gate clears** |
| **Proof categories it must expose** | Published methodology · MappedSkills' own diagnostics and AI-visibility baseline · named people · **and nothing else until it exists.** No logo wall, no invented metric, no testimonial without permission |
| **Primary CTA** | Create a qualified enquiry — by form **or** by booking a meeting (`FUNNEL_ARCHITECTURE.md` §2, §5 — outcome-defined, mechanism-independent) |
| **Secondary CTA** | Read the method / see the evidence. **An offer, never a gate** |

**Ranking role.** The homepage should not attempt to rank for service or category terms. Its query surface is **brand** (`mappedskills`, `mappedskills agency`, `mappedskills pune`) and it is the **entity anchor** — the page AI systems and search engines resolve the organisation against. Every capability, vertical and problem page carries its own query family. This prevents the homepage from cannibalising `/services`, `/seo` or `/ai-seo`.

**Live exposure that must be fixed here:** the current homepage title is `Performance Marketing Agency | 300%+ ROI | MappedSkills`. Both halves are now prohibited — the category by `DEC-005`, the claim by `DEC-007` — and Session 04 verified the claim is being redistributed by Google AI Mode and Perplexity as a factual description of the company.

---

## 5. Commercial page architecture

Capabilities are **not** automatically pages (`SERVICE_ARCHITECTURE.md` §10). Each candidate was assessed against Session 03 search evidence.

| Capability | Decision | Evidence and reasoning |
|---|---|---|
| **The core enquiry system** | **Primary commercial page — `/services`** | The proposition needs a page that *is* the proposition. Reuses an existing URL with the richest schema on the site and an existing 308 target. Nav label changes; URL does not |
| **SEO / organic search** | **Primary commercial page — `/seo`** | Existing URL; 308 target from `/seo-services`. `b2b seo` / `enterprise seo` is the "cleanest generic-SEO sub-family: no course, jobs or acronym contamination" (PRIORITY 2). Head term `seo company in pune` is DIFFICULT (tenure-gated) and is **not** this page's target |
| **AI search visibility** | **Primary commercial page — `/ai-seo` (new)** | `ai seo agency` is the **one** AI category term with genuine provider intent (PRIORITY 2, COMPETITIVE BUT POSSIBLE, listicle-gated not authority-gated, with live Pune/neighbourhood modifiers). **Exactly one page** — GEO, AEO, LLMO and "AI visibility" category terms are all REJECT on Session 03 evidence |
| **Paid search / paid media** | **Keep three existing pages, repositioned and demoted — `/google-ads`, `/social-media-ads`, `/lead-generation`** | Frozen strategy forbids removing them for positioning reasons; all three are 308 targets carrying equity. `lead generation agency` is "the live Indian phrasing" for demand-generation intent. Repositioned as demand-source pages beneath the enquiry proposition. `/social-media-ads` has the weakest independent search evidence and is the strongest future merge candidate — but **backlink data is UNKNOWN**, so it is not merged on speculation |
| **Conversion / enquiry improvement** | **Repositioned existing page — `/conversion-optimization`** | The URL exists. `cro agency india` is "COMPETITIVE BUT POSSIBLE, LOW VALUE"; `conversion rate optimization agency` returns **(NONE)**; `cro services` is pharmaceutical. The page is retained to hold the residual category intent (`DEC-008`), but **the real acquisition route is `/problems/traffic-but-no-enquiries`**, which sits on the most winnable SERP observed in the programme. Page copy must use buyer language, not the acronym |
| **Analytics / attribution** | **NO dedicated page. Section within `/services` and `/how-it-works`** | Measurement is the credibility spine, but **no Session 03 query family supports it** — it was not found as a demand pattern anywhere. A page with no demand is bloat. It earns its visibility through the methodology page instead |
| **Enquiry follow-up automation** | **NO page. Capability mention inside `/services` only** | Evidence is actively negative: `lead automation` is fully career-contaminated; **`how to improve lead response time` returns (NONE)**; a parked expired domain ranks page 1 for `marketing automation agency india`; buyers route to platform partner directories. This implements the frozen strategy's expansion-only treatment |

**Result: 7 unconditional commercial pages + `/pricing`, plus 1 conditional (`/industries/manufacturing`).** Six already exist. Two are new — `/ai-seo` (unconditional) and `/industries/manufacturing` (**conditional**, §7).

---

## 6. Problem-led page architecture

**Rule: a problem page must be materially useful on its own terms.** If the page is only a service pitch behind a question-shaped headline, it is a doorway page and Project Rule 10 forbids it. Each problem page must contain a real diagnostic sequence a reader can follow without hiring anyone.

### Launch — one page

**`/problems/traffic-but-no-enquiries`**

Consolidates three autocomplete families that share one intent, avoiding self-cannibalisation:
- `why your website gets traffic but no leads` (Google recognises the full problem sentence)
- `why is my website not generating leads`
- `how to get more leads from website`

**Why this one and no other at launch:** it sits on the single most winnable SERP observed anywhere in the programme — no HubSpot, no Semrush, no Forbes, no CXL; ranking incumbents are peer-level small agencies; results dated "4 days ago" and "1 week ago" rank, so freshness is a live lever. It is also the page MappedSkills can write with unusual authority, having just diagnosed exactly this failure on its own site.

### Phase 2 — evidence-gated

| Candidate | Evidence | Status |
|---|---|---|
| `/problems/organic-traffic-dropped` | `organic traffic dropped` → 2 clean variants, "real, narrow, high-urgency". **SERP not tested** | PHASE 2, gated on a SERP check |
| `/problems/poor-quality-enquiries` | Enquiry *quality* is the beachhead buyer's actual language. **No query family was tested** | PHASE 2, gated on evidence |

### Explicitly rejected problem pages

| Rejected | Reason |
|---|---|
| Slow lead response / follow-up | **`how to improve lead response time` returns (NONE).** Direct evidence it is not a query |
| Cannot attribute enquiries to marketing | No tested query family. The adjacent query `reduce cost per lead` is **paid-media-shaped** and was REJECTED as a target |
| Competitors outrank us | No tested query family. Also collides with `/seo` |
| Not appearing in AI answers | `brand not showing in chatgpt` returns **(NONE)**; `why is my website not showing in chatgpt` is contaminated by generic website-broken queries. The clean demand is question-shaped (`how to appear in chatgpt`) and belongs in `/blog`, not in `/problems/` — and a problem page here would cannibalise both `/ai-seo` and the guides |
| Organic traffic not converting | Duplicate intent with the launch page. Merged |

---

## 7. Vertical architecture

**Decision: ONE indexable page — `/industries/manufacturing` — classified LAUNCH — CONDITIONAL. Not a cluster. Not a grid.**

### Launch status — CONDITIONAL

**Manufacturing / industrial B2B remains candidate vertical beachhead #1 and is NOT an approved specialisation.** The URL and the page design are architected now, but the page **ships at launch only if the manufacturing validation gate clears before content freeze**. If it does not clear, the page and its supporting article move to **PHASE 2 with no other change to the launch architecture.**

**The gate** — carried unchanged from `ICP.md` §7; this correction pass does not redefine it:
1. absolute search-volume verification with a real keyword tool;
2. a healthcare SERP test on the same basis, so the beachhead is a comparison rather than a default;
3. one completed industrial engagement with a publishable result *(owner action; no Claude session can produce it)*.

**Why conditional rather than committed.** Session 03 search evidence is genuinely strong for this family, but **search evidence is not a business decision.** Committing the page unconditionally would let an attractive SERP quietly harden a candidate beachhead into a launch commitment — exactly the drift the frozen strategy guards against. Architecting the URL now costs nothing and preserves the option; shipping it before the gate clears spends credibility the business does not yet have.

**What is conditional, and what is not.** Two items move together, because the article exists to give the beachhead depth and would be orphaned without its parent page:
- `/industries/manufacturing`
- `/blog/{industrial-b2b-article}`

**Nothing else in the architecture is affected** — no commercial page, problem page, proof page, company page, URL decision or navigation structure depends on this gate.

### Why the page is worth architecting now, despite the specialisation being unapproved

1. **A page is a go-to-market instrument, not a company identity.** The frozen strategy states the beachhead is where effort is *concentrated* while the proposition stays industry-neutral. One page is the precise architectural expression of that, and nothing else is.
2. **It targets the only PRIORITY 1 commercial family with a genuinely open SERP.** Eight autocomplete variants, six explicitly provider-seeking, **zero contamination** — the only family in Session 03 with that property.
3. **It is the only observed route past MappedSkills' tenure barrier.** A 3-year-old Pune agency with 17 reviews holds a Local Pack slot on this exact query, beside 486- and 507-review generalists. Specialisation substituting for tenure was observed on this SERP and confirmed inside ChatGPT's Pune list. MappedSkills has no other lever against incumbents trading since 1998 and 2004.
4. **The buyer's outcome word on this SERP is "RFQ"** — a conversion-shaped outcome that matches the approved proposition exactly. All three AI systems tested used it unprompted.
5. **It is cheaply reversible, and now formally reversible.** One page can be repositioned, deferred or retired at near-zero cost. A cluster cannot. The conditional classification makes that reversibility a recorded decision rather than an informal intention.

### Constraints that keep this a beachhead and not an identity

- The homepage, `/services`, `/about` and all company-level pages **stay industry-neutral**. No "agency for manufacturers" framing anywhere outside this page.
- **No `/industries` hub page at launch.** A hub with one child is not a hub. It is created when a second vertical exists. `/industries` therefore resolves to 404 at launch — an accepted, recorded condition, not a defect.
- **No sub-vertical pages** (engineering components, industrial equipment, contract manufacturing). Session 03 is explicit that sub-service pages come only "after the parent page proves itself" and "must not become a page grid".
- **No second vertical until the first has three published results** (`ICP.md` §7).
- **Healthcare gets no page.** It remains comparison evidence only; its SERP has never been tested.

### The honest weakness, recorded

The observed entry mechanism into this vertical was **a directory or a single listicle — not vertical content**. This page is therefore necessary but not sufficient, and the listings/reviews programme is the larger half of the same job. Absolute volume for this family remains **UNKNOWN**.

---

## 8. Geographic architecture

**Decision: NO dedicated geographic pages. No Pune page, no India page, no Maharashtra page, no city grid.**

**Why — the evidence is unusually direct:**
- `best SEO agencies in Pune` served a **Local Pack and no AI Overview at all**. The surface that decides this query is not an organic page.
- `seo company in pune` is held by firms trading since **1998** and **2004**, with 75–4,543 displayed reviews. The barrier is tenure, reviews and Google Business Profile — **not content**. A location page does not move a Local Pack.
- ChatGPT's answer to the same intent was a **16-entry local business list** with ratings, review counts, categories and open/closed status. The selection signal is listing data, not website content.
- Session 03 and Session 04 reached this conclusion independently.

**What replaces location pages — entity architecture, not page architecture:**

| Requirement | Where it lives |
|---|---|
| Complete, consistent NAP (name, address, phone) | `/contact`, footer, `Organization`/`LocalBusiness` schema |
| **Fix the verified entity defect** — the current declaration's `postalCode` field contains the word "India" | Schema layer, `/contact` |
| Claimed and complete Google Business Profile + genuine reviews | **Off-site. The actual lever. No page fixes it** |
| Directory profiles (Clutch, Semrush Agency Partners, GoodFirms) | **Off-site.** Present in 15 of 28 unbranded AI runs; MappedSkills is on none |
| India-appropriate locale signals | `openGraph.locale` is currently hard-coded `en_US` against an India-only business — correct it |

**One evidence-gated future exception.** Google surfaces `ai seo agency near pune, maharashtra` and `near undri, pune`, and Session 03 rated the local AI-SEO variants "genuinely thinner". A single Pune-qualified AI-SEO page is therefore **not absurd** — but it is the first step onto the city-grid slope, and the evidence says the winning surface is the Local Pack. **Status: FUTURE, gated on (a) a live, reviewed Google Business Profile and (b) a fresh SERP check showing a genuine organic opening.** Not built at launch, and never as a template.

**Explicitly barred:** city-page grids, doorway pages, scaled location templating, `/seo-company-pune`-style permutations. Project Rule 10 and `BUSINESS_STRATEGY.md` §7.

---

## 9. Research, authority and proof architecture

MappedSkills must build authority **before** it has a case-study library. The architecture therefore separates three proof types that accumulate at different speeds.

### 9.1 The three proof surfaces

| Surface | URL | What it holds | Available today? |
|---|---|---|---|
| **Method** | `/how-it-works` | The published methodology, including an explicit statement of **what cannot be attributed** | **Yes — fully.** Unclaimed by every competitor examined |
| **Own evidence** | `/research`, `/research/{slug}` | Original, dated, method-published, versioned studies. Launches with MappedSkills' own diagnostics | **Yes — two genuine entries** |
| **Client evidence** | `/work`, `/work/{slug}` | Case studies with method, limits and permission | **No. Zero exist** |

### 9.2 `/how-it-works` becomes the methodology page — no separate `/methodology`

The existing `/how-it-works` route already exists, carries `FAQPage` + `BreadcrumbList` schema, and is in the current header navigation. Creating a parallel `/methodology` page would duplicate its intent and cannibalise it. **Decision: reposition `/how-it-works` into the published-methodology page.** It must include the attribution-honesty section, which is the single highest-value proof asset available today and requires no permission from anyone.

### 9.3 `/research` launches with two real entries

Neither requires client data or client permission:

1. **MappedSkills' own AI-visibility baseline** — identified in 7 of 8 branded runs, 0 of 28 unbranded, across four systems, with prompt universe, run counts, date, location and stated limitations. Publishing a measured zero with its method is more credible than any score, and no competitor selling a dashboard can copy it without devaluing their own product.
2. **MappedSkills' own site enquiry diagnostic** — the documented, dated, reproducible audit trail: no analytics in production, a contact form with no `action` or `method`, an empty booking widget, no structured data on five service pages, a staging subdomain being cited by Perplexity. Diagnosed, published, and fixed in public.

**Evidence standard for `/research`, written into the architecture:** every entry carries sample size, date, location, method, run counts and stated limitations. No entry may quote a borrowed vendor benchmark as MappedSkills' own.

**The contested item, recorded:** Sessions 02 and 03 rated original benchmark research the strongest content asset; Session 04 observed **no research asset cited in any of 28 unbranded AI runs**. Per the frozen strategy, `/research` is funded for **vertical authority, sales credibility and client trust — not for AI-citation acquisition.** The architecture must not be justified on a citation expectation the evidence does not support.

### 9.4 `/work` exists but is NOT indexable at launch

`/work` is the target of an existing 308 from `/results` and must survive. But an indexed case-study hub with zero case studies is the "empty case-study hub" trap named in the brief, and it is exactly the credibility exposure the frozen strategy identifies (premium price, zero proof).

**Decision: `/work` remains a live route, `noindex` and excluded from the sitemap, until at least one permissioned case study is published.** At that point it is indexed and enters the navigation. No redesign is required — this is a flag, not an architecture change.

### 9.5 `/work/{slug}` consolidation

Today the index is `/work` and details are `/portfolio/{slug}`; bare `/portfolio` 404s. **This is the right moment to consolidate, because zero case studies are currently published.** The legacy rule `/results/:slug` → `/portfolio/:slug` is **re-pointed directly** to `/work/:slug` (single hop, no chain), and `/portfolio/:slug` → `/work/:slug` is added as a safety net for any historically indexed detail URL.

**Prerequisite, non-negotiable:** enumerate the full Contentful case-study slug set before this ships. The historical `/results/:slug` slug set is **UNKNOWN**.

---

## 10. AI Search authority architecture — the minimum coherent cluster

**Four surfaces. Not one page per acronym.**

| # | Surface | URL | Role |
|---|---|---|---|
| 1 | **Commercial** | `/ai-seo` | The one AI category term with buyer intent. Delivery capability, framed as a capability inside the enquiry outcome |
| 2 | **Buyer-question content** | `/blog/{how-to-appear-in-chatgpt}`, `/blog/{how-to-get-cited-by-ai}` **[the second is SUPERSEDED — see §12]** | The buyer's own words — 8 clean variants each. Refreshed on a cadence, because this topic decays fast |
| 3 | **Own proof** | `/research/{ai-visibility-baseline}` | The published, variance-aware baseline. The proof mechanism |
| 4 | **Technical depth** | Crawler/retrieval access guide + checker | **PHASE 2.** `ai crawler access checker` is a clean diagnostic family and MappedSkills' own audit is the credential |

**Explicitly NOT built, at launch or later:**
- `/geo`, `/aeo`, `/llmo`, `/generative-engine-optimization`, `/answer-engine-optimization` — category terms whose upstream intent is **courses, jobs and certifications**, on SERPs held by Coursera, PwC, Forbes, HubSpot and Ahrefs.
- A GEO/AEO/AIO glossary — definitional SERPs are institutionally owned.
- `geo vs seo` / `aeo vs seo` comparison pages — real demand, unwinnable SERP (Forbes, PwC, Semrush, a16z, Contentful), and the top-voted Reddit answer is sceptical the distinction exists. **DEFER.**
- A page per AI platform (ChatGPT / Gemini / Perplexity / Claude / Grok). Thin permutations.
- **Any "AI Visibility Score" page, product or dashboard.** Rejected on three independent bases: page 1 of `ai visibility checker` is ten free tools led by Ahrefs and Semrush; AI answers name Semrush, SE Ranking, Ahrefs and Profound ahead of any agency; and cross-system agreement collapsed in direct measurement.

**The architectural test this cluster must pass:** AI Search is visible in four places and is the company's category in none. If a later phase produces a homepage or `/services` page that reads as an AI-search agency, this architecture has been violated.

---

## 11. Tool and diagnostic architecture

**Decision: ZERO tools at launch.** The `/tools/{slug}` namespace is reserved so a later tool needs no migration.

| Candidate tool | Buyer value | Search demand | Lead-gen potential | Commodity risk | Complexity | Data needed | Verdict |
|---|---|---|---|---|---|---|---|
| **AI visibility / citation checker** | Low — reports absence, does not diagnose | High **but entirely tool-shaped** | Low | **EXTREME** — page 1 is ten free tools led by Ahrefs and Semrush; an Indian agency already runs one; AI answers name Profound over agencies | Medium | AI system access, run repetition | **DO NOT BUILD as an indexable asset.** Permitted only as an **internal, unindexed sales instrument** |
| **AI crawler access checker** | Medium — concrete, correct, immediately actionable | Medium, clean diagnostic family (`ai crawler access checker`) | Medium | **Low** — technical niche, few strong incumbents observed | Low | `robots.txt` fetch + UA simulation | **PHASE 2.** The one tool where MappedSkills' own audit is the credential |
| **Enquiry-path / conversion diagnostic** | High | Not a query family | High | Medium | Medium–High | Client site + analytics access | **FUTURE, blocked.** This *is* the entry offer. A free self-serve version would price the analysis at zero — and the free/paid/hybrid entry decision is still open (`OFFER_ARCHITECTURE.md` §2). **Do not pre-empt an unresolved commercial decision with an architecture decision** |
| **Conversion leak calculator** | Low–Medium — output is arithmetic the buyer half-knows | None tested | Medium | High — calculators are commodity | Low | None | **FUTURE, low priority** |
| **Attribution readiness diagnostic** | Medium — genuinely differentiated territory | **None tested** | Low–Medium | Low | Medium | Client analytics access | **FUTURE.** Differentiated but demand is unevidenced |

**Rule written into the architecture:** no tool ships whose output is not useful to someone who never becomes a client. A tool that exists only to capture an email is a lead gate, not a tool, and it will be judged as one.

---

## 12. Content cluster architecture

**No articles are written in this session.** Clusters define what the editorial stream is *for*.

| Cluster | Anchor page | Launch? | Evidence |
|---|---|---|---|
| **Website enquiry conversion** (buyer-symptom) | `/problems/traffic-but-no-enquiries` | **LAUNCH** — 1 article | The most winnable SERP observed; freshness-rewarded; peer-level incumbents |
| **AI-assisted discovery** (buyer-phrased) | `/ai-seo` | **LAUNCH** — 2 articles **[SUPERSEDED — now 1 article; see the note below this table]** | `how to appear in chatgpt` and `how to get cited by ai`: 8 clean variants each, PRIORITY 1 |
| **Industrial / B2B acquisition** | `/industries/manufacturing` | **LAUNCH — CONDITIONAL** — 1 article | The cleanest commercial family observed; zero contamination. **Ships only if the manufacturing gate clears** (§7) |
| **Search demand and B2B SEO** | `/seo` | PHASE 2 | `b2b seo` / `enterprise seo` clean but small |
| **AI crawler access and citability** | `/ai-seo` | PHASE 2 | Clean diagnostic family; MappedSkills' own audit is the credential |
| **India/Pune cost transparency** | `/pricing` | PHASE 2 | PAA asks twice; a ranking snippet already quotes Pune pricing. **Caveat: attracts price-shoppers; the ICP filter is the mitigation** |
| **Measurement and attribution** | `/how-it-works` | PHASE 2 | No search demand evidence. Publish for credibility, not for traffic |
| **Paid demand capture** | `/google-ads` | PHASE 3 / as needed | Off-positioning. Support existing pages; do not build a cluster |
| **GEO/AEO explainers and glossaries** | — | **DO NOT BUILD** | Institutionally owned SERPs; course/jobs upstream intent |

> **SUPERSEDED BY SESSION 09 — CONTENT STRATEGY REFINEMENT (2026-09-01).**
> The **second unconditional editorial slot remains**, and its topic changed. It is now *"how to tell whether SEO is actually producing qualified enquiries"* — the search → enquiries → qualified enquiries → measurement article — carrying **`PRIMARY SEARCH TARGET = UNVALIDATED`** and classified as buyer education and conversion support, **not** as keyword-demand-led.
> **`how to get cited by ai` is UNBUILT at launch.** It may be reconsidered in PHASE 2 only if it can support a distinct asset without duplicating the canonical `/research/{ai-visibility-baseline}` dataset, methodology, findings, charts or conclusion.
> **Unchanged by this refinement:** the launch article count (3 unconditional + 1 conditional) · every URL and route · the sitemap · navigation · commercial-page targeting · the problem page · the manufacturing conditional gate · indexable and non-indexable counts. **This is a content-topic refinement, not an IA redesign.** Rationale and decision trail: `DEC-009`, `docs/05-content/EDITORIAL_STRATEGY.md` §2A.

**Additionally superseded in the same refinement:** the AI-assisted discovery cluster carries **one** launch article rather than two, and the measurement / search-to-enquiry territory carries **one**. **The cluster count and the launch article count are unchanged**, and no cluster was added or removed.

**Launch editorial target: 4 articles — 3 unconditional + 1 conditional.** *(Unchanged.)* Fewer than 4 makes `/blog` read as abandoned; more inflates launch scope against a proof deficit.

**Open consequence, flagged rather than decided:** if the manufacturing gate does not clear, the editorial stream launches with **3** articles. Either that is accepted, or a PHASE 2 article is promoted to hold the floor at 4. **This is an orchestrator decision — no page is added here to pre-empt it.**

Cadence, editorial standards and author structure belong to the content phase.

---

## 13. Entity and AI-discovery architecture

Session 04's mechanism findings, translated into architecture. **Schema is not authority; most of what matters here is off-site.**

### On-site

| Requirement | Where | Why |
|---|---|---|
| **`/about` promoted into the primary navigation** | Header | Currently footer-only. It is the entity anchor and the only page carrying named people |
| **Named authorship on every article and research entry** | `/blog/{slug}`, `/research/{slug}` | `Person` schema already implemented on articles; extend to research |
| **Author pages** | `/about/{person}` | **PHASE 2.** Justified only when there is a body of authored work to anchor |
| **Published methodology** | `/how-it-works` | The most citable first-party asset MappedSkills can produce today |
| **Complete organisation data** | `/contact`, footer, schema | Fix the `postalCode: "India"` defect; correct `openGraph.locale` from `en_US` |
| **Editorial and evidence standards page** | `/about/editorial-standards` or a `/how-it-works` section | **PHASE 2.** Genuinely unclaimed; low cost |
| **Sources and references on research entries** | `/research/{slug}` | Consistent with `SOURCE_AND_EVIDENCE_POLICY.md` |
| **Visible breadcrumb UI** | Sitewide | `BreadcrumbList` schema is emitted on 11 routes with **no visible breadcrumb anywhere**. Schema without the UI it describes is a mismatch |

### Off-site — larger than the on-site half, and no page substitutes for it

Directory profiles (Clutch, Semrush Agency Partners, GoodFirms — present in **15 of 28** unbranded AI runs, MappedSkills on none), Google Business Profile and reviews, being listed in other people's listicles, and LinkedIn (already the cheapest third-party surface MappedSkills occupies). **These are recorded here because the architecture must not be expected to deliver what only off-site work can.**

### Crawler and retrieval — carried, not decided

Access is **necessary and demonstrably not sufficient**: every AI system tested already receives full server-rendered HTML from `mappedskills.com`, and MappedSkills appeared in zero of 28 unbranded runs. The architecture makes one demand: **the migration plan must not delete `public/robots.txt`**, because doing so hands `/robots.txt` to the inert `app/robots.ts` and silently activates a site-wide `GPTBot`/`CCBot` block. Crawler policy itself is a technical-phase decision, not an IA decision.

---

## 14. Internal linking architecture

**Principle: links follow buyer movement, not a link graph designed for crawlers.** No artificial hub-and-spoke, no footer link farm, no reciprocal-link scheme.

### Primary relationships

| Relationship | Direction | Purpose |
|---|---|---|
| **Homepage ↔ core nodes** | Both | `/services`, `/industries/manufacturing`, `/how-it-works`, `/research`, `/pricing` |
| **`/services` ↔ capability pages** | Both | `/services` is the hub; each capability page links back up. **The only true hub in the architecture** |
| **Commercial ↔ problem** | Both | `/conversion-optimization` ↔ `/problems/traffic-but-no-enquiries`; `/seo` and `/ai-seo` → the same problem page |
| **Commercial ↔ proof** | Commercial → proof | Every commercial page links prominently to `/how-it-works` and to the relevant `/research` entry, **and carries proof in context beside the claims it supports.** This is the proof-deficit mitigation. **The link is an offer, never a gate — proof must not be a required step between a commercial page and the conversion** |
| **Problem → enquiry**, optionally via method | One direction | The problem page converts directly; `/how-it-works` is available for visitors who want depth, not interposed. It must not dead-end in a service pitch |
| **Research → commercial** | Research → commercial | Contextual, one or two links. Research must remain useful to a non-buyer |
| **Article ↔ article** | Both | Within a cluster only. Existing `RelatedPosts` component |
| **Article → commercial** | One direction | Existing `RelatedServices` and `CTABlock` components, retargeted |
| **Vertical → commercial + proof** *(conditional)* | One direction | `/industries/manufacturing` → `/services`, `/how-it-works`, `/research`. **All internal links to this page must be removable in one change if the gate does not clear** |
| **Any page → enquiry** | One direction | Every indexable page routes to exactly one primary conversion **outcome** — qualified enquiry creation — reachable by form or by meeting booking |

### Hub pages — only two are genuine

`/services` (capability hub) and `/blog` (editorial hub). `/research` is an index rather than a hub while it holds two entries. **`/industries` gets no hub until it has two children, and `/problems` gets none until it has three.** Hubs with one or two children are navigation theatre.

### Structural fixes the current site requires
- The header "Services" trigger is a dropdown button, **not a link to `/services`** — the site's most schema-rich page is unreachable from the primary navigation. Fix.
- No visible breadcrumb UI exists despite `BreadcrumbList` on 11 routes. Add.
- `?category=` filtering produces no crawlable hub URL. Either give categories real paths (PHASE 2) or leave filtering non-indexable. **Do not create both.**
- No pagination on `/blog` or `/work`; the Contentful query ceiling is 100 items. Pagination is required before the editorial stream scales.
- `/thank-you` is orphaned — nothing links or redirects to it. It must become the post-enquiry destination for conversion measurement.

---

## 15. Schema mapping — architecture level only

**No schema is implemented, and none is specified in code.** Mapping only.

| Page type | Schema opportunity | Note |
|---|---|---|
| Global (all pages) | `Organization`, `WebSite` | `WebSite` **without** `SearchAction`/sitelinks-searchbox unless a real site search exists. Do not claim a feature the site lacks |
| Global | `BreadcrumbList` | Already emitted on 11 routes. **Pair it with visible breadcrumb UI** |
| `/`, `/about`, `/contact` | `Organization`, `ProfessionalService` / `LocalBusiness` | Consolidate to **one** entity declaration. Fix the `postalCode: "India"` defect. Do not emit conflicting variants on different pages |
| Commercial pages | `Service` | Already correct on `/services`. **Five service pages currently emit no structured data at all** |
| `/pricing` | `Offer` / `PriceSpecification` | Only for what is genuinely and publicly offered. No invented tiers |
| `/blog/{slug}` | `Article`, `Person`, `ImageObject`, `BreadcrumbList` | Already implemented. Fix `dateModified`, which currently maps to any CMS republish |
| `/research/{slug}` | `Article` + `Dataset` **only where a genuine dataset with method and provenance is published** | `Dataset` is not decoration. Most research entries will be `Article` alone |
| `/work/{slug}` | `Article` or `CreativeWork` + `Organization` | Currently emits **nothing**. Never `Review`/`AggregateRating` without genuine, permissioned, first-party review data |
| `/about`, author pages | `Person` | Real people, real credentials |
| `/faq`, FAQ sections | `FAQPage` | **RESEARCH REQUIRED at implementation.** Rich-result eligibility for FAQ markup has changed before and Project Rule 19 requires re-verifying current official guidance at implementation time. Do not emit it site-wide on the assumption of a rich result. The current `/faq` page also under-emits relative to its on-page content |
| `/how-it-works` | `HowTo` **only if** the content is genuinely procedural | Currently `FAQPage` only. Do not force `HowTo` onto non-procedural content |
| Video, where published | `VideoObject` | Only where real video exists |

**Prohibited:** `AggregateRating` or `Review` markup without genuine first-party review data · `Dataset` on non-datasets · schema describing UI the page does not have · any markup adopted to chase a rich result rather than to describe the page.

---

## 16. What NOT to build — MappedSkills-specific traps

Each of these is a live risk for **this** business, not a generic warning.

1. **One page per AI acronym** — `/geo`, `/aeo`, `/llmo`, `/aio`. Session 03 shows terminology is still fragmenting (buyers add a third acronym, AIO) and that upstream intent is courses and jobs. Building here attracts students and competitors.
2. **An "AI Visibility Score" page, tool or dashboard.** Rejected on the classic SERP, inside AI answers, and methodologically. This is the single most likely architecture mistake given how visible AI Search is in the strategy.
3. **A city-page grid** — `/seo-company-pune`, `/digital-marketing-agency-mumbai`, and permutations. The Pune SERP is decided by tenure, reviews and GBP; the AI answer is decided by local listing data. Pages cannot win either.
4. **An industry grid** — a page per vertical because manufacturing worked. One beachhead; a second only after three published results.
5. **An indexed case-study hub with no case studies.** `/work` is held back deliberately.
6. **A `/resources` graveyard** — templates, checklists, ebooks, "guides" with no query family. Nothing enters the site without a named audience and intent.
7. **Thin service permutations** — `/seo-for-b2b`, `/seo-for-exporters` (**`seo for exporters` returns (NONE)**), `/ai-seo-for-manufacturing`. These cannibalise the parent page and produce nothing.
8. **A GEO/AEO glossary.** Definitional SERPs are held by Coursera, PwC, Forbes and Ahrefs.
9. **A "statistics" or "marketing stats" page** built from borrowed vendor figures. `DEC-007` and the source policy forbid it, and Session 04 showed AI systems will redistribute whatever the site asserts.
10. **A lead-response-time or marketing-automation content cluster.** `how to improve lead response time` returns **(NONE)**; a parked expired domain ranks page 1 for `marketing automation agency india`.
11. **A comparison/listicle asset naming competitors** ("best SEO agencies in Pune"). The mechanism was observed working (ThirdMeta), but it sits close to Project Rule 10, it is a low-trust format, and MappedSkills has no standing to arbitrate a category it is absent from. **Not at launch. Revisit only with proof.**
12. **A tool that exists only to capture an email.**

---

## 17. Open architecture decisions

Recorded rather than assumed. Each requires orchestrator or owner input.

| # | Decision | Why it cannot be settled here |
|---|---|---|
| 1 | **`/work/{slug}` consolidation** — re-point `/results/:slug` directly and add `/portfolio/:slug` → `/work/:slug` | Requires the full Contentful case-study slug set, which is **UNKNOWN**. Safe today only because zero case studies are published |
| 2 | **The entry-offer model (free / paid / hybrid)** | Still open in `OFFER_ARCHITECTURE.md` §2. The CTA architecture is deliberately model-agnostic so this decision does not force a re-architecture — but the diagnostic tool decision is blocked on it |
| 3 | **Whether `/social-media-ads` is eventually merged** | No backlink or ranking data exists for any current URL. Merging on speculation would destroy unmeasured equity |
| 4 | **Whether `/privacy-policy` becomes indexable** | Currently `noindex`. It is a genuine trust and entity signal, and noindexing legal pages is a choice rather than a requirement. Low stakes, but it is a change |
| 5 | **Whether category archives get real URLs** | Contentful category exists with no crawlable hub. Deferred to PHASE 2 to avoid creating both a parameter and a path |
| 6 | **The manufacturing validation gate** — volume verification, a healthcare SERP comparison, and one publishable industrial result | **This now governs whether `/industries/manufacturing` and its supporting article ship at launch or move to PHASE 2.** Needs keyword tooling that has never been available in this programme, plus owner action |
| 6b | **If the gate does not clear: whether the editorial stream launches with 3 articles, or a PHASE 2 article is promoted to hold the floor at 4** | A scope decision, not an architecture decision |
| 7 | **FAQ schema eligibility** | Must be re-verified against current official guidance at implementation time (Project Rule 19) |

---

## 18. Fresh research performed in this session

**None.** Per session brief §30, research is largely closed and fresh checks are permitted only where an architecture question cannot be answered from existing evidence. Every architecture question in this document was resolved from Sessions 01–06 artifacts:

- `/blog` vs `/insights` — decided on redirect-target and existing-implementation grounds, not on search grounds.
- Whether a Pune page is warranted — answered by `SERP_RESEARCH.md` §2 (Local Pack, tenure barrier) and `AI_CITATION_RESEARCH.md` §3 (local listing data).
- Whether `seo` and `ai seo` are materially different intent — answered by `SERP_RESEARCH.md` §1 vs §2 (different SERP composition, different modifiers, different barrier).
- Whether the three lead-symptom families are one intent — answered by `KEYWORD_UNIVERSE.md` §6.

**No search volume, keyword difficulty, ranking, traffic, backlink or AI-citation figure was gathered or estimated in this session, and none appears in any Session 07 artifact.**

---

## 19. Method limitations of this session

1. **No backlink, ranking, impression or traffic data exists for any current URL.** No Search Console access, no backlink tool, no analytics — because **no analytics of any kind runs in production**. Every KEEP/MERGE/REDIRECT judgement in `CURRENT_TO_FUTURE_URL_MAP.md` is made on intent, redirect history and strategic fit, **not** on measured equity. This is the largest limitation in the session and it is why nothing is retired.
2. **Absolute search volume is UNKNOWN everywhere**, as in every prior session.
3. **The `/blog/{slug}` and `/portfolio/{slug}` slug sets are UNKNOWN.** Production publishes zero of each; whether the cause is missing credentials or an empty Contentful space is unresolved.
4. **Host-level redirects are UNKNOWN.** No `.htaccess` is committed; its contents must be retrieved from the server before migration.
5. **No international lens.** Every search judgement inherits Session 03's Pune-locked egress.
6. **No code was read for modification, no build/lint/test was run, and no page was rendered.**
