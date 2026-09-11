# Claims and Evidence Governance — PROPOSED

**Session:** 09 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.** Quality Gate 7 is not passed by this document.
**Governed by:** Project Rules 15 and 18, `SOURCE_AND_EVIDENCE_POLICY.md`, `DEC-007`, `BUSINESS_STRATEGY.md` §11, `POSITIONING.md` §9.

**Why this document exists.** MappedSkills displays ₹50K–₹2L/month in production with zero published case studies, and Session 04 verified that **AI systems are actively redistributing the site's unsupported claims as fact about the company**. Claims governance here is not editorial hygiene — it is the control that prevents the new site repeating the failure the old one is currently demonstrating.

---

## 1. The classification rule

**Every significant claim carries exactly one classification, assigned at brief stage, before the sentence is written.**

| Class | Definition | Publication rule |
|---|---|---|
| **A — First-party measured** | MappedSkills measured it itself | **Publishable** with sample size, date, location, method and run counts attached |
| **B — Client-supplied** | The client's own data | **Publishable only with written permission**, attributed to the client, with what MappedSkills did and did not control stated |
| **C — Primary-source verified** | Retrieved from official platform, standards-body or first-party documentation | **Publishable** with the source linked, its date, and the retrieval date |
| **D — Secondary-source supported** | Credible reporting or research, not primary | **Publishable, labelled as secondary**, with the publisher, date, method limits and — where the source is a vendor — that fact stated |
| **E — Opinion / inference** | MappedSkills' judgement or reading | **Publishable, labelled as such.** Never phrased as a finding or a fact |
| **F — Unsupported** | No evidence of any class | **PROHIBITED.** Removed, or downgraded to E and rewritten as an explicit judgement — never smuggled through as a fact |

**A significant claim is any of:** a number · a comparison · a causal statement · a statement about market conditions · a statement about a competitor · a statement about what MappedSkills has achieved · a statement about what a technique produces.

**"Everyone says it" is class F.** So is "it is well known that", "studies show" without a study, and any statistic whose original source cannot be reached.

---

## 2. Claim rules by type

### 2.1 Quantitative claims
Every number carries **sample size, date, location and method**. No exceptions, including in marketing material. A number without its *n* is not a measurement, and a mean of unstable values is manufactured precision.

**Prohibited outright:** invented or estimated search volume, keyword difficulty, rankings, traffic, conversion rates, revenue, market size, AI citation frequency and competitor performance. Where a figure cannot be obtained, **write UNKNOWN**.

### 2.2 Client-result claims
**Zero permissioned client results exist today.** Until one does:
- no client result appears anywhere on the site, in any form, including anonymised;
- no logo wall, no testimonial, no "trusted by", no client count;
- `/work` stays `noindex`, out of navigation and out of the sitemap;
- **no CTA may reference case studies that do not exist.**

The evidence threshold that must be met before any client case study publishes is in §6.

### 2.3 Market claims
Class C or D, with the source and its date. **Distinguish India from international explicitly** — no international SERP and no international AI answer has ever been observed in this programme, so no claim about international conditions is supportable. Distinguish a vendor's blog from independent research.

### 2.4 Competitor claims
- Never name a competitor to disparage it.
- Never publish a "top agencies" list — MappedSkills has no standing to arbitrate a category it appears in **zero times out of 28**.
- A factual comparison of publicly stated offerings is permitted with the source, the date and the retrieval date. **Positioning claims about competitors are class E and must be labelled.**
- **"Competitor C has no AI visibility" is prohibited.** Zero appearances in a 28-run signed-out sample is not absence.

### 2.5 Superiority claims
**"Best", "leading", "top", "#1", "award-winning" and every equivalent are prohibited** unless a verifiable, dated, third-party basis exists and is cited. None exists today. Differentiation is described factually, and `POSITIONING.md` §7 is explicit that all current differentiation is **copyable within weeks and is not a moat** — content may not describe it as one.

### 2.6 AI-search claims
**Never promised:** a ranking, a citation, a mention, inclusion in any AI answer, an "AI Visibility Score", an average AI rank, or any blended cross-system figure. **Never implied** by phrasing, illustration or CTA. Full rules in `AI_CITATION_CONTENT_PRINCIPLES.md` §0 and §7.

**And never sold:** crawler configuration as the route to AI visibility. MappedSkills' own baseline — full access, zero appearances — is the counter-example.

### 2.7 ROI and revenue claims
**Revenue is measured, attributed where possible and reported. It is never promised.** The approved formulation, whose meaning must be preserved in every asset:

> *We own the enquiry. We report through to revenue using your close data. We state plainly what cannot be attributed.*

**Prohibited:** guaranteed ROI, guaranteed revenue, guaranteed enquiry counts, guaranteed rankings, guaranteed citations. **And prohibited by name: "300%+ ROI", "₹100Cr+", "₹10Cr+"** (`DEC-007`) — these may not enter any new asset until provenance and evidence are established, and their remediation in existing production content is an open owner decision.

### 2.8 Benchmark claims
No benchmark is quoted as MappedSkills' own. **Named prohibitions:** the Ahrefs 23× and Buffer 185% AI-visitor conversion multipliers — single-company figures with self-selecting audiences. The ~0.28% AI-referral-traffic figure is a vendor blog citing an unaudited third-party panel and **must be re-verified before any client-facing use**, with that caveat attached.

**No conversion benchmark or target may be invented.** None exists in this programme's evidence base, MappedSkills has no analytics baseline, and **a pre/post conversion comparison is impossible and must not be presented.**

### 2.9 Experimentation claims
Below a real traffic and conversion threshold, this work is **conversion research, diagnosis and design — not statistically valid A/B testing.** Promising testing where volume cannot support significance is prohibited, and content must not imply it.

### 2.10 Response-time claims
**No public numeric SLA until one has been measured.** Publishing an unmeasured response promise would be a live demonstration of the failure MappedSkills sells the fix for. Once a real distribution exists it becomes a genuine proof asset that no competitor examined publishes.

---

## 3. The evidence-link rule

**A claim that needs evidence links to it.**

- A commercial page making a claim links to the asset that supports it (`CONTENT_STRATEGY.md` §8).
- A claim whose supporting asset does not exist yet is **not written yet**.
- A claim with no possible supporting asset is class F and is removed or rewritten as class E.

This is what carries the proof deficit through the content phase rather than around it.

---

## 4. Language prohibitions carried into content

**Never as company-level positioning:** GEO · AEO · LLMO · "generative engine optimisation" · "answer engine optimisation" · "AI Visibility Score" · "average AI rank" · "search visibility" as a category · "organic growth" · "search growth" · "growth agency" · "revenue marketing" · "RevOps" · "performance marketing agency" · "full-service digital marketing agency" · "360° agency" · **"CRO" as an acronym in Indian-facing language** · "marketing automation agency" · "CRM partner" · "lifecycle marketing".

**Usable where the query justifies it, on the page assigned to that query:** "AI search", "how to appear in ChatGPT", "how to get cited by AI", "SEO", "technical SEO", "conversion", "landing pages", "lead generation", "Google Ads". **`DEC-008`: a page may target a term the company does not use as positioning.**

**Never described as a moat:** a named framework or methodology name · a score · tool subscriptions · service breadth · office locations · years in business · being early to terminology · the measurement-honesty position on its own.

**Never described as approved:** manufacturing as a specialisation. MappedSkills is **not** "a marketing agency for manufacturers" or any equivalent, anywhere, including on the conditional vertical page.

---

## 5. Source policy for public-facing content

Public content inherits `SOURCE_AND_EVIDENCE_POLICY.md`. What follows is the public-facing application.

**Priority order:** primary sources → official platform documentation → MappedSkills' own measurements → credible research organisations with a published method → strong secondary reporting → community and practitioner evidence, **labelled as sentiment only**.

| Requirement | Specification |
|---|---|
| **Citation placement** | At the point of the claim, not only in a footer list |
| **What a citation records** | Publisher, title, publication date, retrieval date, and the specific claim supported |
| **Linking** | Link to the primary source, not to an aggregator that summarises it. Where only an aggregator is reachable, say so |
| **Never** | Cite a source for a claim it does not support. **Never fabricate a citation** |
| **Freshness** | Platform, SEO, AI-crawler and structured-data guidance changes. **Re-verify near publication and at any refresh** (Project Rule 19) |
| **Archived sources** | Where a cited page is volatile or likely to disappear — an AI answer, a SERP observation, a pricing page — record the retrieval date and preserve the evidence internally. **A dated screenshot is an observation of a moving target and must be labelled as one** |
| **Conflicting sources** | Show the conflict and justify the preference. **Do not silently pick the convenient one** |
| **Vendor sources** | Always labelled as vendor-published, with the commercial interest stated |

---

## 6. Case-study evidence threshold

**No client case study publishes until every one of these is satisfied.** This is the threshold `/work` waits on.

| # | Requirement |
|---|---|
| 1 | **Written client permission**, specific about what may be published — name, logo, figures, screenshots and quotes each covered explicitly |
| 2 | **A documented baseline** captured before the work started, from the client's own measurement, with its date and its own limitations |
| 3 | **A stated intervention** — what MappedSkills actually did, and what it did not do |
| 4 | **A stated measurement period**, with start and end dates |
| 5 | **Stated attribution limitations** — what could not be isolated, what else changed, what the client did independently |
| 6 | **Results from the client's own system**, not from MappedSkills' interpretation of them |
| 7 | **Commercial context** — market, seasonality, spend changes, sales-side changes |
| 8 | **An explicit statement of what cannot be claimed** from the result |
| 9 | **Screenshots and data verified against source**, dated, and with client PII and commercially sensitive detail removed **with the client's agreement** |
| 10 | **Any client quote verified in writing by the person quoted**, and approved for publication in the form it appears |

**Anonymised case studies:** permitted **only with written permission to publish anonymously**. Anonymity is not a substitute for permission, and an anonymised study still requires 2–8 and 10. It must not be described in a way that identifies the client by inference.

### What is NOT a case study
- A project description with no measured outcome.
- A results claim with no baseline.
- A client logo with no story.
- A testimonial on its own.
- A screenshot of a dashboard with no method, no dates and no attribution statement.
- Anything from a client who has not given written permission.
- **Anything reconstructed from memory or estimated.**

**The own-site diagnostic is the one exception available today** — it needs no client permission, and it is the only case study MappedSkills can publish now. It is governed by `RESEARCH_CONTENT_STRATEGY.md` and must publish only after the fixes are shipped.

---

## 7. Governance in practice

| When | Control |
|---|---|
| **At brief stage** | Every claim the asset intends to make is listed with its class. **Class F claims are removed before writing begins** |
| **At draft stage** | Every number carries sample, date, location, method. Every citation resolves to a source that supports it |
| **At QA** | `CONTENT_QUALITY_GATE.md` items 5, 8 and 14 |
| **At publication** | The freshness owner and the review trigger are recorded |
| **On refresh** | Sources re-verified; corrections labelled as corrections |
| **On any dispute** | The classification decides. **A claim nobody can classify does not publish** |
