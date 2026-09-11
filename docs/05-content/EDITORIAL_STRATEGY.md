# Editorial Strategy — PROPOSED

**Session:** 09 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.** Quality Gate 7 is not passed by this document.
**Corrected:** 2026-09-01 (orchestrator correction pass — launch article 2 replaced; §2A added).
**Scope:** the editorial stream at `/blog` and `/blog/{slug}`. Research is governed separately by `RESEARCH_CONTENT_STRATEGY.md`.

**No article is written here.** This document decides what the editorial stream is for, which three articles launch, how authorship works, and what would make an article unacceptable.

---

## 1. What `/blog` is for

`/blog` is **retained** — it is the target of an existing 308 redirect from `/content-marketing-services` and is, on the audit's own assessment, the most completely implemented SEO surface in the codebase. It currently publishes **zero articles** and renders "No articles found".

**The editorial stream's job:** capture buyer-phrased informational demand that a commercial page cannot serve, supply the freshness signal that the enquiry-conversion SERP rewards, and give each launch cluster a second entry point.

**What it is not:** a publishing cadence for its own sake, a topical-authority theatre, a place for company news, or a home for anything that failed the commercial-page test.

**Launch volume: 3 unconditional articles, 4 if the manufacturing gate clears.** Fewer than 3 makes the stream read as abandoned; more inflates launch scope against a proof deficit and a cadence MappedSkills has never demonstrated.

---

## 2. How the three launch topics were determined

**The approved IA assigns three unconditional article slots to three named query families** (`PAGE_INVENTORY.md` §1.5, `SEARCH_ARCHITECTURE.md` §2). Those assignments are **not reopened** — changing them would be an IA change, which this session is not permitted to make.

What this session determines is what the approved IA explicitly deferred: **the exact topic, angle, information gain and boundaries within each slot.** The slots were tested against §7 below, and each survived on evidence rather than on inheritance:

| Slot | Family evidence | Survives? |
|---|---|---|
| AI guide | `how to appear in chatgpt` — **8 clean variants**, PRIORITY 1, buyer-phrased, no acronym | **Yes.** And MappedSkills holds first-party measurement on exactly this question |
| Second AI guide — **WITHDRAWN** | `how to get cited by ai` — 8 clean variants, PRIORITY 1 | **No. Withdrawn in the correction pass** — the article would have been built on the same measured dataset as the AI Visibility Baseline. See §2A |
| Search → qualified enquiry — **REPLACEMENT** | **No recorded query family covers this intent.** The measurement territory is PHASE 2 precisely because no search demand evidence exists for it | **Yes, on non-search grounds.** Carried on buyer education and conversion support, with **PRIMARY SEARCH TARGET = UNVALIDATED** and a targeted validation requirement recorded |
| Enquiry conversion | The most winnable SERP in the programme; freshness rewarded; peer-level incumbents | **Yes** — but the head phrasings belong to the problem page, so the article must take a narrower sub-intent (§4, and the RESEARCH REQUIRED flag there) |

**Three placeholder slots were rejected as topics and replaced with specific, evidence-backed angles.** A slot is not a brief.

---

## 2A. Why launch article 2 was replaced

**The withdrawn brief:** *"Which sources AI systems actually cite when recommending a supplier — measured across 28 runs."*

**Reason for withdrawal.** The measured 28-run findings belong primarily to the approved **AI Visibility Baseline** research asset. Building an editorial article around substantially the same dataset would have created duplication between `/research` and `/blog` — the same dataset, methodology, findings and conclusion published at two URLs, splitting the authority of the one genuinely original thing MappedSkills has to publish.

**The rule this produced**, now binding across the content programme: **an original first-party dataset or measured study has exactly one canonical research URL** (`CONTENT_STRATEGY.md` §6A). Editorial may interpret or apply it only where the user intent is materially different, and must summarise only what is necessary, link to the canonical research, and add something the research entry does not contain.

**The replacement** addresses the relationship between **SEO / organic visibility → enquiries → qualified enquiries → measurement**: how a buyer determines whether search work is actually producing qualified enquiries. It supports `/seo`, `/services`, `/lead-generation`, `/problems/traffic-but-no-enquiries` and `/how-it-works`, and **it is not an AI article.**

**No launch article was added.** The unconditional set remains exactly three.

---

## 3. The three unconditional launch articles

Full briefs in `editorial-briefs/`. Titles below are **working topic concepts, not headlines** — no final title is written in this session.

| # | Working topic concept | Primary job | Cluster | Supports |
|---|---|---|---|---|
| **1** | **What actually decides whether a business appears in ChatGPT — and why crawler access is not the answer** | Search demand capture, carrying the AI capability in the buyer's own words | AI-assisted discovery | `/ai-seo`, `/research/{ai-visibility-baseline}` |
| **2** | **How to tell whether SEO is actually producing qualified enquiries** | **Buyer education + conversion support.** **PRIMARY SEARCH TARGET = UNVALIDATED** | Measurement and the search-to-enquiry chain | `/seo`, `/services`, `/lead-generation`, `/problems/traffic-but-no-enquiries`, `/how-it-works` |
| **3** | **How to check whether your website is losing enquiries before they ever reach you** | Buyer education + conversion support; second entry point and freshness for the most winnable cluster | Website enquiry conversion | `/problems/traffic-but-no-enquiries`, `/conversion-optimization`, `/research/{own-site-enquiry-diagnostic}` |

**Why these three and not a broader set.** Each rests on evidence or work MappedSkills already holds, each supports a named commercial or problem destination, and each would be **hard for a competitor to copy without doing the same work**. Article 1 is where the AI capability becomes visible in the buyer's own words rather than through terminology the strategy rejects. Article 2 states the approved proposition in the buyer's own commercial terms — rankings and traffic are not the outcome, qualified enquiries are — and bridges the acquisition pages to the measurement half of the method. Article 3 turns MappedSkills' own conversion failure into something a reader can use.

**Article 2 is the one launch article whose primary search target is unvalidated**, and it is classified accordingly: **buyer education and conversion support**, not search demand capture. **No search demand was invented to justify it**, and a targeted validation requirement is recorded in its brief.

---

## 3A. Proportionality — one AI article, and only one

**APPROVED STRATEGIC POSITION, restated here because the editorial set is where it is most easily lost:**

> **AI Search is a highly visible supporting capability. It is not the company category.**

The unconditional editorial launch set therefore contains **exactly one article per territory**:

| # | Territory | Count |
|---|---|---|
| 1 | AI-assisted discovery | **1** |
| 2 | Search → qualified enquiry and measurement | **1** |
| 3 | Enquiry loss and conversion diagnosis | **1** |

**Rules that follow, and they are binding:**
- **Do not create another AI launch article.** Two of three launch articles being AI articles would have made AI search look like the company's category on the surface where a first-time reader forms that impression.
- **Do not create one article per capability merely for balance.** Six capabilities do not get six articles, and a territory with no evidence and no buyer question does not earn one.
- **AI Search remains visible in four surfaces** — `/ai-seo`, one launch article, the research baseline, and a PHASE 2 technical guide — **and is the company's category in none.**

---

## 4. The boundary that keeps article 3 from cannibalising the problem page

`/problems/traffic-but-no-enquiries` consolidates three autocomplete families to avoid three near-identical pages. Article 3 must not undo that.

| | Problem page | Article 3 |
|---|---|---|
| **Question answered** | **Why** is this happening, and which of the causes is mine? | **How do I check** each part of the path, and what does a real failure look like? |
| **Head phrasings** | `why your website gets traffic but no leads` · `why is my website not generating leads` · `how to get more leads from website` | **None of these.** A narrower verification sub-intent |
| **Form** | Diagnostic decision tree across four loss zones | A reproducible verification sequence with worked evidence |
| **Link direction** | Receives from article 3 | Links **up** to the problem page |

**RESEARCH REQUIRED, and flagged rather than assumed.** The exact long-tail phrasing for article 3's verification sub-intent was **not tested in Session 03**. Before the article is written, a **narrow India-lens autocomplete check** on the candidate phrasings must be run and recorded (§37 rule in `CONTENT_STRATEGY.md` lineage; `SOURCE_AND_EVIDENCE_POLICY.md` applies).

**Fallback if no clean phrasing is found:** the article publishes anyway, on the strength of its other three jobs — buyer education, conversion support and cluster freshness — with **no primary query target claimed**, and the brief records that explicitly. **An article does not get an invented query family to justify itself.**

---

## 5. The conditional fourth article

**`/blog/{industrial-b2b-article}` — LAUNCH — CONDITIONAL.**

It ships only if the manufacturing validation gate clears before content freeze, **together with `/industries/manufacturing`**. Without its parent page it is an orphaned article linking to a page that does not exist.

**Working topic concept:** *Where a manufacturer's enquiries actually come from, and where the RFQ path loses them.*

**Explicitly rejected as the topic: "10 SEO tips for manufacturers"** and every equivalent. Brief in `editorial-briefs/`.

**If the gate does not clear**, the editorial stream launches with **3** articles. Whether a PHASE 2 article is promoted to hold the floor at 4 is an **orchestrator decision, and this session does not make it** — no fourth unconditional article is invented to fill the gap.

---

## 6. Article standards

Every article, without exception:

1. **Answers the question it was found for, near the top, in plain language.**
2. **Names its author**, with a real bio and a real basis for writing it.
3. **Carries a published date and a genuinely-updated date** — never a cosmetic refresh.
4. **Cites primary sources at the point of the claim**, per `CLAIMS_AND_EVIDENCE_GOVERNANCE.md` §5.
5. **States its limits** where it reports any measurement — sample, date, location, run counts, what was not covered.
6. **Uses buyer language.** Never "CRO" as an acronym in India-facing copy; never GEO, AEO or LLMO as category terms.
7. **Promises nothing** — no ranking, no citation, no enquiry count, no revenue, no ROI. Never reuses "300%+ ROI", "₹100Cr+" or "₹10Cr+".
8. **Links up to exactly one primary destination**, plus adjacent cluster content and the evidence its claims rest on.
9. **Carries a LOW-COMMITMENT CTA only**, placed after the answer is delivered. **No sticky CTA, no booking prompt, no modal, no exit-intent.**
10. **Identifies at least one visual opportunity** at brief stage (`CONTENT_STRATEGY.md` §10).

---

## 7. What would make an article unacceptable

Any one of these fails editorial QA and the article does not publish.

| # | Failure |
|---|---|
| 1 | **It could have been written by someone who had not done the work.** The §5 information-gain test in `CONTENT_STRATEGY.md` |
| 2 | It paraphrases the pages currently ranking, in a different order |
| 3 | It restates platform documentation without interpretation or a stated consequence |
| 4 | It quotes another company's figures as though they were MappedSkills' finding |
| 5 | It reports a measurement without sample size, date, location, method or run counts |
| 6 | It implies a ranking, a score or a guarantee in AI systems |
| 7 | It uses a rejected category term — GEO, AEO, LLMO, "AI visibility" as a service, "search visibility", "CRO" — as its framing |
| 8 | It targets a query family that was never tested, without saying so |
| 9 | It duplicates the intent of a commercial page, a problem page or a research entry |
| 9b | **It reproduces substantially the same dataset, methodology, findings, charts or conclusion as its canonical research source** (`CONTENT_STRATEGY.md` §6A) |
| 9c | **It claims a validated primary query when the target is UNVALIDATED**, or invents a query family to justify itself |
| 10 | It contains a client claim, logo, testimonial or result without written permission |
| 11 | It is a listicle assembled from other listicles |
| 12 | Its CTA pressure exceeds the reader's intent (§6.9) |
| 13 | It has no named author, or an author with no genuine basis for writing it |

---

## 8. Author and expertise architecture

**Requirement at launch: a real named author on every article and every research entry, with a real bio.** `Person` schema is already implemented on articles and must be extended to research entries.

| Element | Launch requirement |
|---|---|
| **Author identity** | A named individual. **Not "MappedSkills Team", not "Admin", not a pseudonym** |
| **Author bio** | Two to three sentences: role, the relevant expertise, and what they actually do. Real, checkable, and consistent everywhere it appears |
| **Basis for authorship** | The author must have done, or directly supervised, the work the article reports |
| **Author pages** (`/about/{person}`) | **PHASE 2.** An author page with three articles behind it is thinner than no author page. Justified once a body of authored work exists |
| **Author profiles on `/about`** | **Sufficient at launch.** Named people with roles and expertise on the entity anchor page |
| **Social / professional references** | Real, current profiles only. Verify each before launch — three social links are currently hard-coded in the codebase |
| **"Reviewed by"** | **Only where a genuine second person genuinely reviewed the asset.** A manufactured review byline is fabricated proof and Project Rule 15 forbids it. **Do not implement it at launch unless the reviewer is real and named** |
| **Research authorship** | Named, with the method owner identified. A measurement with no named owner cannot be defended |
| **Update responsibility** | **Every asset has a named freshness owner** at publication. Recorded in the brief, not left implicit |

**Credentials are never manufactured.** No invented certifications, no invented years of experience, no invented client counts, no borrowed authority.

---

## 9. Cadence

**No publishing calendar is set here** — dates depend on the owner inputs, the technical prerequisites and the production sequence in `CONTENT_STRATEGY.md` §15.

What is fixed is the **obligation attached to each launch cluster**:

| Cluster | Obligation | Consequence of missing it |
|---|---|---|
| Website enquiry conversion | A sustained cadence, because freshness is a live ranking lever on this SERP | The anchor page decays and the most winnable opening in the programme is wasted |
| AI-assisted discovery | A **scheduled review**, because platform behaviour changes faster than the content | The content becomes wrong, which is worse than stale, on the topic where MappedSkills' credibility is staked |
| Measurement and the search-to-enquiry chain | **Event-triggered only** — it changes when the qualification definition, the attribution model or the published limits change | Low decay risk. **It was never published for traffic, so a missed refresh does not cost rankings it never had** |
| Industrial / B2B *(conditional)* | Depth over frequency | Lower risk; slower decay |

**The honest constraint:** MappedSkills currently publishes zero articles and has no demonstrated publishing capacity. **A cadence that is promised and not met is worse than a smaller cadence that is met**, particularly on a site selling measurement honesty. Cadence should be set at a level the business can actually sustain and then reviewed after the first baseline period.

---

## 10. Open editorial decisions

| # | Decision | Owner |
|---|---|---|
| 1 | **Who authors each launch asset**, and whether a second named reviewer genuinely exists | Owner |
| 2 | **Sustainable publishing cadence per cluster**, set from real capacity | Owner |
| 3 | **Whether a PHASE 2 article is promoted** if the manufacturing gate does not clear | Orchestrator |
| 4 | **The narrow autocomplete check for article 3's phrasing** (§4) | Content phase, before the article is written |
| 4b | **The targeted validation check for article 2's candidate phrasings.** If none is clean and non-cannibalising, **PRIMARY SEARCH TARGET = UNVALIDATED stays on the record and no query target is claimed** | Content phase, before final copy |
| 5 | Whether blog categories get real archive paths | Deferred to PHASE 2. **Do not build both a parameter and a path** |
