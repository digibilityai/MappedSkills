# AI Citation Content Principles — PROPOSED

**Session:** 09 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.** Quality Gate 7 is not passed by this document.
**Evidence base:** Session 04 — `AI_VISIBILITY_BASELINE.md`, `AI_CITATION_RESEARCH.md`, `AI_MEASUREMENT_FRAMEWORK.md`, `AI_STRATEGIC_VALIDATION.md`, `AI_CRAWLER_POLICY.md`. **No new AI measurement was performed in this session.**

---

## 0. What this document may and may not promise

**These are practices that plausibly improve the chance of being useful as a source. They are not levers on an outcome MappedSkills controls.**

**Never promised, in content, in copy, or to a client:**
- a ChatGPT, Gemini, Perplexity, Claude or Grok "ranking";
- an AI citation, mention or inclusion in any AI answer;
- an "AI Visibility Score", an average AI rank, or any blended cross-system figure;
- that any technique causes appearance in an AI answer.

**The evidence that makes the restraint mandatory, not modest:** every AI system tested already receives **full server-rendered HTML** from `mappedskills.com`, `robots.txt` blocks no AI crawler — and MappedSkills appeared in **zero of 28** unbranded runs. **Access is necessary and demonstrably not sufficient.** MappedSkills' own baseline is the counter-example to the pitch, and no MappedSkills asset may sell crawler configuration as the route to AI visibility.

---

## 1. The four layers, which content must never collapse

| Layer | MappedSkills' measured position | What content can affect |
|---|---|---|
| **Retrieval** — can a system identify the company when named? | **Works.** 7 of 8 branded runs accurate | Directly, and strongly. Branded answers are built almost entirely from first-party sources |
| **Discovery** — does it appear unprompted? | **Zero in 28 runs** | **Barely.** Every observed selection came from somewhere else |
| **Recommendation** — is it actually recommended? | **Zero** | Barely |
| **Citation** — is its domain used as a source? | **Zero** | Partially, and mostly through third parties |

**The structural conclusion, carried verbatim in effect from Session 04:** MappedSkills' own website is already sufficient for the branded layer and worth **nothing** in the unbranded layer. **Future AI visibility requires authority outside its own website.**

**The content consequence:** first-party content is how MappedSkills controls what is said about it, not how it gets mentioned. Both matter. They are different jobs and must not be sold as one.

---

## 2. Content practices that plausibly help

Derived from what was actually observed, not from a template.

| # | Practice | Why, on this evidence |
|---|---|---|
| 1 | **State facts clearly and unambiguously** | Branded answers are assembled from first-party sources. Systems disagreed about what MappedSkills sells **because the website disagrees with itself** — one system reported the old broad list including telecalling and video editing, another reported the newer five-service architecture and flagged the contradiction |
| 2 | **Cite primary sources at the point of the claim** | Makes the assertion checkable and separable |
| 3 | **Publish the method** | The one asset type MappedSkills can produce today that competitors do not; also what makes a number quotable |
| 4 | **Publish original first-party data** with sample, date, location and run counts | The only material a summariser cannot get elsewhere |
| 5 | **Name authors, with real bios** | Attribution of expertise to a person, not to a brand voice |
| 6 | **Publish and honestly maintain dates** | A cosmetically refreshed date is a false signal |
| 7 | **Use descriptive, self-explanatory headings** | Sections must survive being read out of context |
| 8 | **Write self-contained sections** | A retrievable passage should be accurate alone. This is the single highest-value structural property |
| 9 | **Define terms concisely, in place** | One or two sentences where the term is used. **Never a glossary page** |
| 10 | **State limitations explicitly** | It is what makes a measurement usable by anyone else |
| 11 | **Keep URLs stable** | A moved asset loses whatever standing it accumulated |
| 12 | **Keep entity facts consistent** everywhere — site, schema, LinkedIn, directories | The same fact set is what a system resolves the organisation against |

**Deliberately absent from this list:** `llms.txt`, AI-specific markup, and structured data adopted to chase AI inclusion. **Nothing observed in 28 runs suggests these drove any selection**, and Google states there are no additional requirements to appear in AI Overviews or AI Mode. Structured data is implemented because it describes the page — not because it is expected to produce a citation.

---

## 3. Two entity defects content must fix, and one it must not create

| Item | Status |
|---|---|
| **The site contradicts itself about what MappedSkills sells** | Two AI systems reported two different service architectures **from the same website**. The content phase must produce **one** consistent capability description across `/services`, the capability pages, `/about` and the footer |
| **Unsupported claims are being redistributed as fact** | Google AI Mode surfaced the site's own "300%+ ROI" title and Perplexity repeated it. Only ChatGPT qualified it as a self-reported marketing claim. **Whatever the site asserts is what AI systems repeat** — which makes `DEC-007` a factual-integrity rule, not a style preference |
| **A staging host is being ingested** | Perplexity cited `testing.mappedskills.com` among ten sources. Content published anywhere a staging host also serves becomes an entity risk. **Engineering item — recorded here because it is a content-integrity exposure** |

---

## 4. What did NOT drive citations — recorded so effort is not wasted

| Expected | Observed across 28 unbranded runs |
|---|---|
| **Reddit** | **Zero appearances**, despite being a page-one competitor on every question-shaped Google query. Session 03's Reddit finding **does not transfer** to the AI layer |
| **`llms.txt`, AI-specific markup** | Nothing observed suggests it drove any selection |
| **GEO / AEO category positioning** | **upGrowth 0/28, SEOTonic 0/28, DigiMark 0/28** — including on GEO- and AI-SEO-specific prompts. **Selling the category did not produce visibility** |
| **News and industry publications** | One PR-wire domain, in one run |
| **Original research** | **None observed being cited in any unbranded agency prompt.** The prompt universe was vendor-selection-weighted, so this is not a refutation — but it is the only direct evidence and it must not be quietly dropped |

---

## 5. What DID drive selection — three mechanisms, none of them website content

1. **Directory and marketplace listings.** `agencies.semrush.com` in **10 of 28** runs; `clutch.co` in **5**; GoodFirms in 2. Together Semrush Agency Partners and Clutch appear in **15 of 28**. ChatGPT stated its reasoning in plain text — it selected brands by reading two directories. **MappedSkills has a profile on neither.**
2. **Single-listicle dominance.** One third-party list frequently supplied an entire answer. In the clearest case a domain was simultaneously the dominant cited source **and** a recommended brand inside its own list.
3. **Local business listing data** — ratings, review counts, categories, addresses. ChatGPT answered the Pune query with a **16-entry local business list**; Google served a **Local Pack and no AI Overview at all**.

**Caution attached to mechanism 2:** it shows the pattern is *available*. It does not establish that any given listicle is picked up, how long dominance persists, or that the tactic scales — and publishing a competitor listicle is on the DO NOT BUILD list for this business.

---

## 6. Owned content versus third-party authority — the content programme's boundary

| Route | Feasibility | Which owned asset supports it |
|---|---|---|
| **Directory profiles** — Clutch, Semrush Agency Partners, GoodFirms | **Highest. Self-serve, needs no case study, blocked by nothing** | `/about` and `/services` supply the consistent entity fact set each profile must match |
| **Google Business Profile and genuine reviews** | High value, slow, owner-dependent. **Reviews are never manufactured** | `/contact` NAP must match the profile exactly |
| **Being listed in other people's listicles** | Medium. Requires outreach, not publishing | `/how-it-works` and `/research` are what makes an inclusion request credible |
| **Expert commentary and source requests** | Medium | Named authors with real bios; the AI baseline as a citable measurement |
| **Guest contributions** | Medium, and only where genuinely relevant. **Never link-schemed** | The method and the research |
| **Research outreach** | Medium, and honestly rated | `/research/{ai-visibility-baseline}` is the only asset with genuinely novel first-party content |
| **Partner and reference pages** | Low priority at launch | — |
| **Review generation** | Owner-dependent, genuine only | — |

**The line that must survive into every later phase: publishing more articles does not solve the authority problem.** Owned content controls the narrative; third-party authority produces the mention. MappedSkills currently has neither, and only one of them can be started this week without owner input.

---

## 7. Measurement rules for anything AI-related that MappedSkills publishes

Carried from `AI_MEASUREMENT_FRAMEWORK.md` and binding on content.

**May be said, with the run count attached:**
- "In *n* runs on system *S* on date *D* from location *L*, brand *B* appeared in *k* of them."
- "The same four names appeared in all three runs; the order changed every time."
- "Across 28 unbranded runs, a named directory domain was a cited source in 10."
- "MappedSkills was identified accurately when asked by name, and appeared in none of 28 unbranded runs."

**May not be said, on the evidence available:**
- Any rank, position or score in any AI system.
- Any change, improvement or trend — **there is one measurement**.
- Anything at all about **Claude or Grok**, which were not testable.
- Anything about markets outside India or languages other than English.
- "Competitor C has no AI visibility" — zero appearances in a 28-run signed-out sample is not absence.

---

## 8. The one position MappedSkills can honestly own

Not a claim about AI systems — a claim about method.

> Publishing a measured zero, with the method, the run counts and the limits attached, is more credible than any score — and **no competitor selling a dashboard can copy it without devaluing their own product.**

Neither of the two verified measurement vendors publishes run-to-run variance, and both use ranking language. That gap is real and unclaimed.

**Its correct commercial weight, recorded so it is not overstated:** measurement honesty is **a way of doing the work that earns trust. It is not a reason a buyer calls.** A Pune manufacturer looking for RFQs does not have a methodology problem. Content may demonstrate it; positioning may not lead with it.
