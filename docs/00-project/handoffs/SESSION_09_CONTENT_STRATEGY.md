# Claude Session Handoff — Session 09

## Session
- **Session ID:** 09 — Content Strategy & Launch Content Architecture
- **Date:** 2026-09-01 · **Branch:** `test_branch`
- **Model:** Claude Opus 5 (high effort)
- **Role:** Content Strategist · SEO Content Architect · B2B Editorial Strategist · AI Search / Citation Strategist · Conversion Content Strategist · Evidence and Authority Strategist
- **Purpose:** determine what MappedSkills must publish, why it deserves to exist, what evidence it requires, how it supports search and AI-assisted discovery, and how it contributes to qualified enquiries.

---

## 0. Correction pass — 2026-09-01

A narrow orchestrator correction pass was applied within this same session. **The content strategy was not reopened, no broad research was performed, and no launch article was added.** Five corrections:

1. **Launch articles 1 and 3 retained unchanged** — the `how to appear in chatgpt` guide, and the enquiry-loss verification article. Working titles remain provisional.
2. **Launch article 2 replaced.** The proposed *"Which sources AI systems actually cite when recommending a supplier — measured across 28 runs"* was **withdrawn**: the measured 28-run findings belong primarily to the approved **AI Visibility Baseline** research asset, and an editorial article around substantially the same dataset would have duplicated `/research` in `/blog`. **Its brief was deleted, not left alongside the replacement.** The replacement addresses **SEO / organic visibility → enquiries → qualified enquiries → measurement** — how a buyer determines whether search work is actually producing qualified enquiries. **No recorded Session 03 family covers that intent, so it carries PRIMARY SEARCH TARGET = UNVALIDATED**, is classified as **buyer education + conversion support**, and records a targeted validation requirement before final copy. **No search demand was invented.**
3. **A canonical-research rule was added and made binding.** An original first-party dataset or measured study has **exactly one canonical research URL**. Editorial may interpret or apply it only where the user intent is materially different, and must summarise only what is necessary, link to the canonical research, and add materially different application. It **must not reproduce substantially the same dataset, methodology, findings, charts or conclusion** to create another search page. Recorded in `CONTENT_STRATEGY.md` §6A, `RESEARCH_CONTENT_STRATEGY.md` §6A, `EDITORIAL_STRATEGY.md` §2A, the internal-linking rules, and **quality-gate item 9b**.
4. **AI Search kept proportionate.** The unconditional editorial launch set is now **one AI-assisted discovery article, one search-to-qualified-enquiry article, one enquiry-loss diagnostic article.** No second AI launch article, and no article per capability for balance. Recorded in `EDITORIAL_STRATEGY.md` §3A.
5. **Unsupported pseudo-quantification removed.** "Roughly half of what the strategy needs from search is off-site" and its variants were replaced with **"A material part of search and AI-discovery authority is off-site and cannot be created through owned-site publishing alone."** **No replacement ratio was introduced**, and the underlying Session 04 evidence — directory sources in **15 of 28** unbranded runs, MappedSkills on none — is preserved.

**Preserved unchanged:** the seven content jobs · the information-gain standard · **exactly three unconditional launch articles** · the conditional manufacturing pair · claims governance · the evidence-gap register · the owner-input register · author strategy · freshness strategy · visual-information requirements · every commercial page brief · the page inventory · the IA · the CRO specification · the business strategy.

**Research assets unchanged in substance.** The **AI Visibility Baseline remains the canonical home for the Session 04 measured dataset**; the own-site diagnostic remains **blocked until the relevant fixes exist** and remains classified as **research rather than a case study**; **`/research` may still launch with one genuine entry** if the second is not ready.

---

## 0A. Repository reconciliation pass — 2026-09-01

A second narrow orchestrator pass, run **before** Quality Gate 7 review, to make the repository accurately express the correction pass. **No research. No strategy, IA, CRO or editorial change. No production code.**

1. **Every authoritative Gate 5 binding of `how to get cited by ai` to the second editorial slot is now annotated** — never rewritten, never deleted. Five locations across four artifacts: `PAGE_INVENTORY.md` §1.5 (row 17, plus new §1.5A), `PAGE_REASON_TO_EXIST_MATRIX.md` §5, `WEBSITE_INFORMATION_ARCHITECTURE.md` §10 and §12, `SEARCH_ARCHITECTURE.md` §2 (plus new §2A) and §5. Each carries **SUPERSEDED BY SESSION 09 — CONTENT STRATEGY REFINEMENT (2026-09-01)** with the unchanged-items list attached.
2. **The unsupported "roughly half" wording is corrected in both remaining locations.** `SEARCH_ARCHITECTURE.md` §4 is rewritten with a dated correction note recording the original sentence; the historical `SESSION_07_IA_SEARCH_ARCHITECTURE.md` **keeps its original sentence** and gains a dated §17 correction note. **No substitute ratio was introduced anywhere.** The Session 04 evidence — directory sources in **15 of 28** unbranded runs — is preserved and restated.
3. **`DEC-009` records the decision trail** as a refinement, not a company-level strategic decision: the earlier Gate 5 state, the three reasons for the replacement, and the explicit statements that it **does not validate search demand**, that the replacement remains **`PRIMARY SEARCH TARGET = UNVALIDATED`**, that targeted validation is required before any search target is claimed, and that publication is justified on buyer-education and conversion-support grounds without inventing keyword demand.
4. **Session 09 file accounting corrected** (§4 below). The prior "Files Modified — 13" was wrong; the correction pass modified **16** files.

**Gate 5 artifacts were annotated only.** No route, URL, sitemap entry, navigation item, commercial-page target, problem page, conditional gate or indexable/non-indexable count changed. **No gate status was changed by this pass** — see §10 item 8.

---

## 1. Status

**PROPOSED — NOT APPROVED. Quality Gate 7 (content architecture) is NOT passed by this session.** Claude does not approve content architecture.

**Not reopened:** the frozen business strategy (`DEC-005`/`DEC-006`), the proposed IA (Gate 5, open), the proposed CRO funnel (Gate 6, not passed), or any search or AI-visibility research conclusion.

**Not produced:** final page copy · complete articles · headlines, taglines or meta titles · page designs or wireframes · any production code change · any new indexable URL.

---

## 2. Context read

`CLAUDE.md` · `docs/00-project/` — `PROJECT_CHARTER.md`, `PROJECT_RULES.md`, `CONTEXT_INDEX.md`, `CURRENT_STATE.md`, `DECISION_LOG.md`, `QUALITY_GATES.md`, `SOURCE_AND_EVIDENCE_POLICY.md`, `ASSUMPTIONS_AND_OPEN_QUESTIONS.md`, `SESSION_HANDOFF_TEMPLATE.md`, handoffs 07 and 08 · `docs/01-business/` — `BUSINESS_STRATEGY.md`, `POSITIONING.md`, `ICP.md`, `SERVICE_ARCHITECTURE.md`, `OFFER_ARCHITECTURE.md` · `docs/03-search/` — `SEARCH_ARCHITECTURE.md`, `KEYWORD_PRIORITY_MATRIX.md`, `KEYWORD_UNIVERSE.md`, `SERP_RESEARCH.md`, `SEARCH_STRATEGY_VALIDATION.md` · `docs/04-ai-visibility/` — `AI_VISIBILITY_BASELINE.md`, `AI_CITATION_RESEARCH.md`, `AI_MEASUREMENT_FRAMEWORK.md`, `AI_STRATEGIC_VALIDATION.md` · `docs/06-IA/` — all four architecture documents · `docs/07-cro/` — `FUNNEL_ARCHITECTURE.md`, `QUALIFIED_ENQUIRY_DEFINITION.md`, `CTA_SYSTEM.md`, `PAGE_TYPE_CRO_RULES.md` · `docs/12-analytics/` — `EVENT_TAXONOMY.md`, `ATTRIBUTION_MODEL.md`.

**Repository areas inspected:** documentation only. **No application code was read, and none was changed.**

---

## 3. Completed work

1. **A content principle with a publish test** — seven jobs, and a rule that an asset naming none of them does not publish.
2. **An operational information-gain standard** with five permitted sources, an explicit exclusion list, and a delete-test for editorial QA.
3. **A search-intent → content-type map**, with the three live cannibalisation risks written as rules binding on both briefs in each pair.
4. **Content clusters classified** — **3 LAUNCH (one article each), 1 LAUNCH — CONDITIONAL, 3 PHASE 2, 1 support-only, 4 DO NOT BUILD.** *(The measurement territory was promoted from PHASE 2 to LAUNCH in the correction pass to receive the replacement article; no cluster was added or removed.)*
5. **The exact three launch article topics determined**, with angles, information gain, boundaries and unacceptability criteria — plus the conditional fourth, retained as conditional. **Article 2 was subsequently replaced in the correction pass (§0.2); the set remains three.**
6. **Research strategy and standards**, including what qualifies as MappedSkills Research and what does not, versioning, citation practice and CTA restraint.
7. **Both initial research assets briefed**, including the classification decision that the own-site diagnostic is **research, not a case study** — and why.
8. **Claims and evidence governance** — a six-class classification, per-type rules, and a ten-point case-study evidence threshold.
9. **A sixteen-item content quality gate** with a generic-agency test, including the canonical-research check added in the correction pass.
10. **Owner input and evidence gap registers**, with blocking status recorded per item.
11. **22 of 22 unconditional and 2 of 2 conditional launch assets briefed**, reconciled against the approved IA.
12. **A dependency-aware production sequence** in which `/how-it-works` is the root dependency and the own-site research entry is sequence-blocked.
13. **Visual storytelling opportunities identified per content type** — what is better shown than described, with no design done.

---

## 4. Files created and modified — corrected accounting

**Verified against `git status` and the filesystem on 2026-09-01, after both the correction and reconciliation passes. This supersedes the earlier "Files Modified — 13", which was wrong.**

| Category | Count |
|---|---|
| **New files (untracked) — the Session 09 artifact set** | **35** |
| **Tracked files modified across all three passes** | **7** |
| **Files deleted** | **1** *(`editorial-briefs/article-2-cited-by-ai.md`, never tracked — removed from the filesystem only, so git records no deletion)* |
| **Total Session 09 artifacts on disk** | **35** |

**The 35 new files:** 10 `docs/05-content/` documents · 4 editorial briefs · 2 research briefs · 18 page briefs · 1 handoff.

**The 7 tracked files modified:** `CURRENT_STATE.md` · `DECISION_LOG.md` · `handoffs/SESSION_07_IA_SEARCH_ARCHITECTURE.md` · `docs/03-search/SEARCH_ARCHITECTURE.md` · `docs/06-IA/PAGE_INVENTORY.md` · `docs/06-IA/PAGE_REASON_TO_EXIST_MATRIX.md` · `docs/06-IA/WEBSITE_INFORMATION_ARCHITECTURE.md`. **Six of the seven were touched only in the reconciliation pass, and only to add supersession or correction annotations.**

**By pass:** original session — 35 files created, 1 tracked file modified. Correction pass — 1 file created, 1 deleted, **16** modified (15 of them newly-created Session 09 files, plus `CURRENT_STATE.md`). Reconciliation pass — 0 created, 0 deleted, 7 modified.

**Explicitly excluded from every count: the untracked root `README.md`, which pre-dates this session and was not touched.**

---

### The Session 09 artifact set (35 new files)

**`docs/05-content/` (10)**
`CONTENT_STRATEGY.md` · `LAUNCH_CONTENT_INVENTORY.md` · `CONTENT_CLUSTER_ARCHITECTURE.md` · `EDITORIAL_STRATEGY.md` · `RESEARCH_CONTENT_STRATEGY.md` · `AI_CITATION_CONTENT_PRINCIPLES.md` · `CLAIMS_AND_EVIDENCE_GOVERNANCE.md` · `CONTENT_QUALITY_GATE.md` · `OWNER_INPUT_REGISTER.md` · `CONTENT_EVIDENCE_GAPS.md`

**`docs/05-content/editorial-briefs/` (4)**
`article-1-appear-in-chatgpt.md` · `article-2-is-seo-producing-enquiries.md` · `article-3-losing-enquiries.md` · `article-4-conditional-industrial-rfq.md` **(CONDITIONAL)**

*Removed in the correction pass: `article-2-cited-by-ai.md`, superseded by `article-2-is-seo-producing-enquiries.md`. There is exactly one unconditional article-2 brief.*

**`docs/05-content/research-briefs/` (2)**
`ai-visibility-baseline.md` · `own-site-enquiry-diagnostic.md`

**`docs/09-content-pages/briefs/` (18)**
`homepage.md` · `services.md` · `seo.md` · `ai-seo.md` · `google-ads.md` · `social-media-ads.md` · `lead-generation.md` · `conversion-optimization.md` · `pricing.md` · `problems-traffic-but-no-enquiries.md` · `how-it-works.md` · `research-hub.md` · `blog-index.md` · `about.md` · `contact.md` · `schedule-call.md` · `faq.md` · `industries-manufacturing.md` **(CONDITIONAL)**

**`docs/00-project/handoffs/` (1)**
`SESSION_09_CONTENT_STRATEGY.md` (this file)

## 5. Files modified (1)

`docs/00-project/CURRENT_STATE.md`

**Not modified:** the frozen business strategy · `docs/06-IA/` · `docs/03-search/` · `docs/04-ai-visibility/` · `docs/07-cro/` · `docs/12-analytics/` · `docs/13-automation/` · `docs/10-technical/` · `DECISION_LOG.md` · `QUALITY_GATES.md` · all application code, configuration and content.

---

## 6. Decisions proposed

**None is approved. Each requires orchestrator or owner action.**

1. **The three launch article topics**, with their angles and boundaries.
2. **Two launch content clusters** (plus one conditional), rather than one per capability.
3. **The own-site diagnostic classified as research**, not a case study, a build-in-public series, or a marketing story.
4. **`/research` may launch with one entry** if the own-site fixes slip — preferable to publishing an unremediated defect list as proof.
5. **A production sequence in which `/how-it-works` is written first**, because every commercial page's proof link and both research entries depend on it.
6. **Author pages deferred to PHASE 2**; named team profiles on `/about` are sufficient at launch.
7. **The "reviewed by" mechanism is implemented only if a genuine second reviewer exists** — otherwise assets publish without the byline.

## 7. Decisions approved during session

**None.** Claude approves nothing.

---

## 8. Evidence gathered

**None. No fresh research was performed.** Every content decision was derived from Sessions 01–08 artifacts with their original evidence labels intact.

**No search volume, keyword difficulty, CPC, ranking, traffic, backlink, conversion-rate, benchmark or AI-citation figure was gathered or estimated, and none appears in any Session 09 artifact.**

**Two narrow research items are flagged for the writing phase rather than performed here**, because running them from this session's vantage point would have produced evidence not comparable with Session 03's India-lens observations:
1. **The exact long-tail phrasing for launch article 3's verification sub-intent** — an India-lens autocomplete check, with a recorded fallback of publishing with no primary query target rather than inventing one.
2. **The same check for the conditional article 4's informational phrasing.**

Both are recorded in the relevant briefs with their fallbacks.

## 9. Tests actually run

**None.** No build, no lint, no test, no browser session, no HTTP request. No file was modified outside the permitted documentation paths.

---

## 10. Unresolved issues

1. **The manufacturing validation gate** — determines whether 2 conditional assets ship at launch or move to PHASE 2.
2. **Whether a PHASE 2 article is promoted** to hold the editorial floor at 4 if that gate does not clear. **Orchestrator decision; no article was invented to pre-empt it.**
3. **The entry-offer model** — free, paid or hybrid. Blocks CTA framing on every page, and the `/schedule-call` description of what the call is.
4. **The two narrow phrasing checks** in §8.
5. **Named authorship** for every launch asset, and whether a genuine second reviewer exists.
6. **Sustainable publishing cadence per cluster**, which must be set from real capacity rather than asserted.
7. **Whether `/privacy-policy` becomes indexable** — carried from the IA phase.

## 11. Risks

1. **`/how-it-works` is the root dependency and is owner-blocked.** Without the real delivery process, the highest-value proof asset cannot be written, and every commercial page's proof link has no destination.
2. **`/research/{own-site-enquiry-diagnostic}` is blocked behind technical work that does not exist yet** — there is no backend at all. If it slips, `/research` launches with one entry.
3. **The proof deficit meets `/pricing`.** ₹50K–₹2L/month against zero case studies, no reviews and no directory profiles is the largest credibility gap on the site, and **no content work fixes it.**
4. **The AI cluster decays fastest and is where credibility is staked.** Content that is not refreshed on schedule becomes wrong, not merely stale.
4b. **Launch article 2 has no validated search target.** It is carried on buyer education and conversion support, and if the targeted validation check finds nothing clean it publishes with **no query target claimed**. That is deliberate and recorded — but it means one of three launch articles is not expected to capture search demand.
5. **The enquiry-conversion cluster requires a sustained cadence** it has never demonstrated, on the one SERP where freshness is a live ranking lever.
6. **The target query families attract students, job-seekers and vendors by design.** Editorial conversion rate will look poor; the correct response is the hard disqualifier, **not more CTA pressure.**
7. **Publishing more articles does not solve the authority problem.** Directory sources appeared in 15 of 28 unbranded AI runs and MappedSkills is on none — **a material part of that authority is off-site, cannot be created by owned-site publishing, and is blocked by nothing.**

## 12. Assumptions introduced

1. **That the three approved IA article slots remain the three launch articles.** The slot count did not change. **The correction pass changed the topic occupying slot 2**, and the reconciliation pass **annotated every Gate 5 artifact that bound `how to get cited by ai` to that slot as SUPERSEDED** — none was rewritten or deleted. That family is now **unbuilt at launch**, available to PHASE 2 only if an asset can be written that does not reproduce the baseline. **Recorded as `DEC-009`. This assumption is now closed rather than carried.**
2. **That article 3's narrower verification sub-intent does not cannibalise the problem page.** The boundary is specified in both briefs, and the phrasing check in §8 is the verification.
3. **That the own-site diagnostic is publishable as research once fixes ship.** It depends on the fixes actually happening.

---

## 13. Recommended next task

**Quality Gate 5, Gate 6 and Gate 7 review by the orchestrator and owner.** None is approved and Claude has no authority to approve any of them.

**Recommendation on sequencing, unchanged from Session 08 and reinforced by this session:** **scope the technical prerequisites early** — a backend endpoint, durable enquiry storage, transactional email, analytics and the consent mechanism. The funnel specification is inert without them, **and this session adds a second reason: the own-site research entry, the problem page's worked example and launch article 3 all depend on those fixes being shipped.** Fixing MappedSkills' own conversion and measurement layer is simultaneously a launch prerequisite, the hard precondition on every outcome claim, and the first available proof asset.

**Two workstreams that do not depend on any gate and should not wait:**
1. **The off-site listings, profiles and reviews programme.** Blocked by nothing.
2. **Collecting the owner inputs in `OWNER_INPUT_REGISTER.md`.** Items 1–5 and 9 block content that cannot begin without them.

## 14. Next session should read

1. `docs/01-business/BUSINESS_STRATEGY.md`
2. `docs/00-project/CURRENT_STATE.md`
3. `docs/05-content/CONTENT_STRATEGY.md` and `LAUNCH_CONTENT_INVENTORY.md`
4. `docs/05-content/CLAIMS_AND_EVIDENCE_GOVERNANCE.md` and `CONTENT_QUALITY_GATE.md`
5. `docs/05-content/OWNER_INPUT_REGISTER.md` and `CONTENT_EVIDENCE_GAPS.md`
6. The brief for the specific asset being produced
7. This handoff — §15 in particular

## 15. Restrictions future sessions must respect

Carried forward from Sessions 07 and 08, plus this session's additions.

1. **Do not reopen `DEC-005`, the approved IA, or the CRO specification.**
2. **Do not add an indexable URL.** The launch inventory is 22 unconditional plus 2 conditional, and it reconciles to the IA.
3. **Do not build anything in the DO NOT BUILD lists** — 17 named page rejections and 17 named content rejections.
4. **Every asset names its job, its evidence and the destination it supports, or it does not publish.**
4b. **An original first-party dataset has exactly one canonical research URL.** Editorial links to it and adds application; it never republishes the dataset, methodology, findings, charts or conclusion.
4c. **Exactly one unconditional launch article is primarily AI Search.** Do not add a second, and do not create one article per capability for balance.
5. **No word-count target may be introduced anywhere.**
6. **Every significant claim carries a class A–E. Class F does not publish.**
7. **No number without sample size, date, location and method.** Where a figure does not exist, write **UNKNOWN**.
8. **Never reuse "300%+ ROI", "₹100Cr+" or "₹10Cr+"**, and never promise revenue, rankings, AI citations or enquiry counts.
9. **No AI Visibility Score, no average AI rank, no blended cross-system figure — ever.** No claim about Claude or Grok. No trend from one measurement.
10. **Do not sell crawler configuration as the route to AI visibility.**
11. **Never "CRO" as an acronym in Indian-facing copy; never GEO, AEO or LLMO as company-level framing.**
12. **The homepage and `/services` must not read as an SEO, GEO, AEO or AI-search agency.** If they do, the architecture has been violated regardless of what `/ai-seo` says.
13. **Never describe MappedSkills as a manufacturing agency**, and do not ship the two conditional assets unless the gate has cleared.
14. **Proof is never a required step** between a commercial page and the conversion.
15. **No sticky CTA on research, methodology or editorial pages.** No modal, no interstitial, no exit-intent, no fake scarcity anywhere.
16. **A research asset must not become an advert halfway through the methodology.**
17. **No client result, logo, testimonial, rating or count** until written permission and the ten-point evidence threshold are satisfied.
18. **Do not publish the own-site diagnostic before the fixes are shipped.**
19. **Do not invent a conversion benchmark or a "before" figure.** A pre/post comparison is impossible and must not be presented.
20. **Do not publish a response-time SLA** until one has been measured.
21. **Do not change a date without a substantive change to the content.**
22. **Do not invent a branded framework name.**
23. **Do not manufacture credentials, reviews, or a "reviewed by" byline.**
24. **Do not invent a query family to justify an asset.** Say it has none, or label it **UNVALIDATED** until a targeted check clears it.
24b. **Do not introduce a percentage or ratio for the owned-site versus off-site split.** State it qualitatively and cite the underlying counts.
25. **Re-verify fast-changing guidance at publication** (Project Rule 19) — FAQ rich-result eligibility, AI-crawler tokens, structured-data requirements.

## 16. Stop condition

**Session 09 stops here.** The content strategy and launch content architecture are proposed. **Quality Gate 7 is not passed, and no earlier gate is passed by this session.**

**Do not begin copywriting, creative direction, UX, UI design or any implementation.** The next phase requires an explicit brief from the orchestrator.

## 17. Gate 7 approved — 2026-09-01 (annotation added later)

**Quality Gate 7 (Content Strategy + Launch Content Architecture) was reviewed and PASSED by the orchestrator on 2026-09-01**, on the basis of the strategy as corrected through the editorial correction pass and the cross-gate reconciliation pass recorded above. Decision trail: `DEC-012` in `DECISION_LOG.md`. **§16's original stop condition is preserved above as the record of this session's own stop state**; it is superseded as current fact by this note and by `QUALITY_GATES.md` / `CURRENT_STATE.md`. This annotation performs no new research and reopens nothing.
