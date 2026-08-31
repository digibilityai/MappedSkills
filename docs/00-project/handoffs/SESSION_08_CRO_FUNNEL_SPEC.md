# Claude Session Handoff — Session 08

## Session
- **Session ID:** 08 — CRO & Qualified-Enquiry Funnel Specification
- **Date:** 2026-08-31 · **Branch:** `test_branch`
- **Model actually used:** **Claude Opus 5** (high effort). *The session brief specified Claude Sonnet 5; the session ran on Opus 5. Recorded accurately rather than copied from the brief, since this file is durable project memory.*
- **Role:** CRO Strategist · B2B Lead-Generation Architect · Marketing Measurement Architect · Funnel Strategist · CRM Handoff Architect
- **Purpose:** Define exactly how the website turns visitors into measurable qualified enquiries.

---

## 0. Correction pass — 2026-08-31

A narrow orchestrator correction pass was applied within this same session. **The funnel strategy was not reopened, no research was performed, and no complexity was added.** Four corrections:

1. **Qualification and attribution are now independent dimensions.** Attribution capture is **removed as a WQE condition** (six conditions → **five**). `qualification_status` and `attribution_status` (`complete` / `partial` / `unavailable`) are separate. Direct traffic, a missing referrer, privacy restrictions, blocked analytics, unavailable campaign data and attribution-storage failure **can never disqualify a legitimate enquiry.** Measurement gaps are reported, never hidden by moving enquiries out of the qualified count.
2. **Email verification fails open.** Five outcomes distinguished — invalid / disposable / valid-looking / **verification unavailable** / suspicious. Domain-MX checking is **advisory and asynchronous**; a DNS, network or API failure passes the enquiry with an advisory flag rather than rejecting it. Disposable domains and specific negative signals route to **Review Required**, not automatic rejection. **No new visitor-facing field.**
3. **Spam retention is controlled rather than permanent.** "Persisted, never deleted" is replaced: confident spam creates **no conversion, no CRM lead and no sales notification**, is **quarantined** with enough detail for abuse monitoring and false-positive review, and is **deleted or anonymised under a defined retention policy** (duration is a privacy/security decision requiring review). **Uncertain submissions go to Review Required, not quarantine.** Detection logic is never revealed to the submitter.
4. **Production analytics wording corrected.** Session 08 documents no longer assert that GTM and Meta Pixel load unconditionally in live production. They now distinguish **repository implementation** from **verified production behaviour**: repository code contains GTM/Meta implementation, while Session 01B live verification found no active third-party analytics scripts (`dataLayer`, `gtag`, `fbq` all undefined). Consent must be implemented before any tracking requiring it is activated. **Session 01 historical audit artifacts were not altered.**

**Preserved unchanged:** 4 required form fields · budget removed · phone optional · dual conversion surfaces · booking capability requirements · no weighted scoring · Website-Qualified vs Sales-Qualified · first-touch + conversion-touch attribution · UTM governance · server-confirmed conversion events · lifecycle simplicity · limited follow-up automation · no arbitrary benchmarks.

---

## 1. Status

**PROPOSED — NOT APPROVED.** Claude does not approve CRO architecture. **Quality Gate 6 is NOT passed by this session.** Gate 5 (information architecture) remains a separate, open orchestrator decision.

**Not reopened:** the frozen business strategy, the approved IA, the page inventory, the URL map, or any search research conclusion. **No UI was designed, no page copy or email copy was written, no vendor was selected, and no production code was changed.**

---

## 2. The two facts that shape the whole specification

1. **There is no backend.** No `app/api/` directory, no route handler, no server action, no email-sending capability. **Every specification here presumes a server endpoint that does not exist.** The most important requirement in this session is not a field choice — it is that a backend must exist at all.
2. **The current form shows success while transmitting nothing.** Every enquiry since that code shipped was lost, and the visitor was told it succeeded. **The persist-first architecture exists specifically so that cannot recur.**

---

## 3. Qualified enquiry — the operational definition

**Website-Qualified Enquiry (WQE)** — the business conversion, set automatically at submission when **all five** hold:
1. passes abuse screening · 2. reachable identity (name + syntactically valid, non-disposable email; **domain verification advisory and failing open**) · 3. business context (**any one of** company name, website URL, or non-free-mail domain) · 4. stated need (message of minimum length **or** service/problem selection) · 5. not a duplicate — **and no hard disqualifier applies.**

**Attribution is NOT a condition.** `qualification_status` and `attribution_status` (`complete` / `partial` / `unavailable`) are independent dimensions. A real buyer who types the domain into a browser is exactly as commercially valuable as one on a tagged campaign link — and much of the demand this strategy depends on (direct, dark social, word of mouth, and the directory listings that appeared in 15 of 28 unbranded AI runs) arrives with weak attribution by nature. **Downgrading those enquiries would let a measurement failure masquerade as a demand failure.**

**Sales-Qualified Enquiry** is a separate, human, downstream judgement against `ICP.md` §2. **The website is never reported as producing it.**

**The honest consequence, stated plainly:** `ICP.md` names *value per opportunity* as the single most important qualifier, and **the website cannot verify it.** A self-reported budget field is an unverified claim that adds friction and produces a number nobody should trust. It is excluded from the definition and handled in conversation.

**Condition 3 is deliberately permissive.** Requiring a corporate email domain is the conventional B2B rule and it is **wrong for this ICP** — owner-led considered-purchase businesses, with the founder named as a primary buyer role, routinely use free-mail on real businesses. A corporate-domain rule would disqualify the target buyer and flatter the quality metric.

**Hard disqualifiers are evidence-driven, not generic:** job applications, course/training enquiries, vendor outreach, student requests, explicitly out-of-scope services. Session 03 found MappedSkills' own target vocabulary is heavily career- and course-contaminated — `seo consultant` returns salary and jobs first, `generative engine optimization` returns jobs and certification ahead of *agency*. **Ranking for the approved query families will attract these audiences by design.**

**Four states:** Qualified · Unqualified · Spam · Review Required. **No legitimate enquiry is ever deleted**; a human may override any state with the reason recorded; **Review Required does not count while unresolved**; reporting always shows all four **and breaks Qualified down by `attribution_status`**.

---

## 4. Qualification model

**Hard disqualifiers + soft signals + human review. No weighted scoring.**

Scoring is **explicitly rejected at this stage**: MappedSkills has zero historical enquiries to calibrate against, so any weights would be invented — which `SOURCE_AND_EVIDENCE_POLICY.md` forbids and Project Rule 15 treats as fake precision. Revisit only when enough enquiries have reached Won/Lost for weights to be derived from outcomes.

---

## 5. Form and booking

**4 required fields:** name · work email · company · what you're trying to fix.
**3 optional:** phone/WhatsApp · website · marketing consent (separate, unticked).
**Contextual:** service/problem **pre-filled from page context, never asked.**

**Removed from the required set: budget.** It is currently required in production, is the highest-friction field on the page, collects an unverifiable number, and cannot qualify anything. **This is a deliberate change to existing production behaviour and is flagged as such.** Also not asked: role, company size, revenue, timeframe dropdown, "how did you hear about us" (the system knows), industry dropdown.

**Phone is optional on the form and required on the booking surface** — easy to give, never a barrier.

**Booking: capabilities, not a vendor.** Ten required capabilities; **two are load-bearing** — the system must accept runtime hidden/custom fields and persist them, and must expose the completed booking server-side with those fields. **If it cannot, booking is demoted from a primary conversion surface to a secondary conversion**, and that must be recorded rather than quietly accepted.

---

## 6. Attribution

**First-touch + conversion-touch, both stored. No weighted multi-touch model** — no data to calibrate it, volume will not support it, and fractional credit would imply a precision that cannot be defended to a client.

**The internal-overwrite rule:** internal links must never carry UTMs; UTM values are accepted only when the referrer is external or absent; first-touch is write-once; the site's own hostnames are excluded as referrers — **which matters concretely here, because `www.mappedskills.com` currently returns HTTP 200 rather than redirecting, and `testing.mappedskills.com` was observed being cited by Perplexity.**

**Ten limitations are published rather than hidden**, including cross-device breakage, consent-declined sessions, dark social landing in `direct`, manually received enquiries having no attribution at all, and revenue attribution depending entirely on client-supplied data. `/how-it-works` is where that statement lives publicly — and it is the differentiator, not a disclaimer.

---

## 7. Events

**16 events. The two conversion events fire server-side**, on confirmed persistence or a confirmed webhook — never from a client screen and **never from a `/thank-you` pageview**, which is the most common false-conversion source.

**A phone click is not a qualified enquiry.** It is conversion *intent*. Same for email clicks. CTA clicks are diagnostic, never business conversions.

**PII is prohibited in analytics** — name, email, phone, company, website, message text, IP. Only `field_name` on errors, never `field_value`. An **opaque `enquiry_id`** is the only join to identified data.

---

## 8. Lifecycle, CRM and follow-up

**Seven stages:** New Enquiry → (Spam / Unqualified / Review Required) → Website Qualified → Sales Qualified → Opportunity → Won/Lost. **System sets everything up to and including Website Qualified; every stage beyond it is human.** No MQL stage, no scoring, no sub-stages, no per-service funnels.

**CRM: a vendor-neutral data contract, no vendor chosen.** Nine field categories. **A spreadsheet plus durable enquiry storage would satisfy it at launch volume — a legitimate starting point, not a compromise.** Heavyweight marketing-automation platforms are explicitly not a requirement, because adopting one for MappedSkills' own use would work against a strategy that rejects becoming a CRM or RevOps firm.

**Follow-up: five automated touches and nothing else** — acknowledgement, internal notification, internal no-response escalation, meeting reminder, one no-show re-book offer. **The first real response is always a person.** Nurture is **not built**; eligibility is recorded so it remains possible later.

**Response time: internal target of one business day; no public numeric SLA.** MappedSkills sells enquiry effectiveness — **publishing a response promise it has never measured, and might miss, would be a live demonstration of the failure it sells the fix for.** Publish one only after the first baseline period produces a real distribution; at that point it becomes a genuine proof asset no competitor examined publishes.

---

## 9. Failure handling — the governing principle

> **A legitimate enquiry must never be silently lost because a secondary integration failed.**

**Persist-first:** validate → screen → **persist** → return success → *then* notify, email, CRM and analytics asynchronously. Only persistence may block the response. Any step-4 failure is logged, queued and retried and never discards the record. **If persistence fails, the visitor sees an explicit failure with values preserved — a false success is the one outcome that is never acceptable.**

Confident spam receives the same success state as a legitimate submission, **creates no conversion, no CRM lead and no sales notification**, and is **quarantined under a defined retention policy then deleted or anonymised**. Enforced at source rather than in reporting, so one filter mistake cannot corrupt the business metric. **Uncertain submissions go to Review Required, not quarantine.**

---

## 10. Baseline

**There is no analytics baseline, and this session invented none.** Conversion rate, enquiry volume, traffic and source mix are all **UNKNOWN**.

**A pre/post conversion comparison is impossible and must not be presented.** Any future improvement claim must be measured from a post-launch baseline period forward. Presenting a fabricated "before" would violate Project Rule 15 and `DEC-007`.

**No benchmark targets are set** — no historical data, and no industry conversion benchmark was gathered in this programme.

---

## 11. Files created

- `docs/07-cro/QUALIFIED_ENQUIRY_DEFINITION.md`
- `docs/07-cro/FORM_AND_BOOKING_SPEC.md`
- `docs/07-cro/CTA_SYSTEM.md`
- `docs/07-cro/PAGE_TYPE_CRO_RULES.md`
- `docs/07-cro/POST_SUBMISSION_AND_FOLLOWUP.md`
- `docs/12-analytics/ATTRIBUTION_MODEL.md`
- `docs/12-analytics/EVENT_TAXONOMY.md`
- `docs/13-automation/CRM_DATA_CONTRACT.md`
- `docs/13-automation/ENQUIRY_LIFECYCLE.md`
- `docs/13-automation/FOLLOWUP_ARCHITECTURE.md`
- `docs/00-project/handoffs/SESSION_08_CRO_FUNNEL_SPEC.md` (this file)

## 12. Files modified

- `docs/07-cro/FUNNEL_ARCHITECTURE.md` — new §0A pointing to the specification layer; three previously-open items marked resolved. **Substance unchanged.**
- `docs/00-project/CURRENT_STATE.md`

**Not modified:** frozen business strategy · the approved IA (`docs/06-IA/`) · search research and `SEARCH_ARCHITECTURE.md` · AI-visibility research · `docs/10-technical/` · `DECISION_LOG.md` · `QUALITY_GATES.md` · all application code, configuration and content.

## 13. Evidence gathered

**None. No fresh research was performed** — the brief stated it was not required. Two production files were read **read-only** to ground the specification against reality: `components/forms/ContactForm.tsx` (confirming 8 fields, 5 required including budget) and `lib/gtm.tsx` (confirming the existing dataLayer helpers). Everything else is carried from Sessions 01–07 artifacts with original evidence labels intact.

**No conversion rate, benchmark, traffic figure or industry statistic was gathered or estimated, and none appears in any Session 08 artifact.**

## 14. Tests actually run

**None.** No build, no lint, no test, no browser session, no HTTP request, no form submission. No file was modified outside the permitted documentation paths.

---

## 15. Biggest conversion risks

1. **There is no backend.** Everything specified here is unbuildable until a server endpoint exists. This is the single largest blocker.
2. **Both conversion paths are broken in production today** — a form that transmits nothing and an empty booking widget.
3. **The booking tool may not support runtime custom fields.** If it cannot, the two-surface conversion model fails and booking demotes to a secondary conversion.
4. **No consent mechanism exists.** Repository code contains GTM/Meta implementation while Session 01B live verification found no active third-party analytics scripts. **Consent must be implemented before any tracking requiring it is activated** — a pre-launch blocker, not a live breach.
5. **No baseline exists**, so a post-launch regression or improvement is unprovable in either direction.
6. **The proof deficit meets the pricing page.** ₹50K–₹2L/month is displayed against zero case studies, no reviews and no directory profiles. **No CRO work fixes this** — it is the largest conversion constraint on the site and it is not a funnel problem.
7. **The target query families attract students, job-seekers and vendors by design.** Editorial conversion rate will look poor, and the correct response is the disqualifier, **not more CTA pressure.**

## 16. Decisions requiring approval

1. **Removing budget from the required form fields** — a change to existing production behaviour.
2. **Phone optional on the form** rather than required as it is today.
3. **Repair or replace the booking tool**, and accept the demotion consequence if capabilities 1–2 cannot be met.
4. **CRM selection, or the deliberate decision to defer one** and start with durable storage plus a spreadsheet.
5. **The internal response-time target and published business hours** — an operating commitment.
6. **Consent mechanism and retention periods** — legal review required.
7. **Length of the post-launch baseline period**, before which no conversion target is asserted.

## 17. Restrictions future sessions must respect

1. **Do not reopen the frozen strategy or the approved IA.**
2. **Do not count a phone click, email click or CTA click as a qualified enquiry.**
3. **Do not fire a conversion event from a `/thank-you` pageview.**
4. **Do not put PII into analytics.**
4b. **Do not make attribution completeness a qualification condition.** A measurement failure must never disqualify a legitimate enquiry.
4c. **Do not let an email-verification outage reject an enquiry.** Verification fails open; uncertainty goes to Review Required.
4d. **Do not retain spam indefinitely, and do not send it to the CRM or to sales notifications.**
5. **Do not let a secondary integration failure lose an enquiry, and never show a false success.**
6. **Do not add form fields** without displacing one, and never re-add budget as required.
7. **Do not make proof a required step** between a commercial page and the conversion.
8. **Do not build nurture sequences, lead scoring or lifecycle automation** — outside the approved scope.
9. **Do not invent a conversion benchmark or a "before" figure.** Where data does not exist, write UNKNOWN.
10. **Do not publish a response-time SLA** until one has been measured.
11. **Do not deploy CAPTCHA by default** — layers 1–8 first.

## 18. Next logical phase

**Gate 5 and Gate 6 review by the orchestrator and owner.** Then, on approval, either **content architecture (Gate 7)** — pillars, clusters, launch content roadmap, editorial and evidence standards — or the **technical architecture** work that must exist before any of this is buildable: the backend endpoint, durable enquiry storage, transactional email, and the consent mechanism.

**Recommendation:** the technical prerequisites are worth scoping early, because the entire funnel specification is inert without them, and because fixing MappedSkills' own conversion and measurement layer is simultaneously a launch prerequisite and the first available proof asset.

## 19. Next session should read

1. `docs/01-business/BUSINESS_STRATEGY.md`
2. `docs/00-project/CURRENT_STATE.md`
3. `docs/07-cro/FUNNEL_ARCHITECTURE.md` (§0A points to the rest)
4. `docs/07-cro/QUALIFIED_ENQUIRY_DEFINITION.md` and `FORM_AND_BOOKING_SPEC.md`
5. `docs/12-analytics/` and `docs/13-automation/`
6. This handoff — §17 in particular

## 20. Stop condition

**Session 08 stops here.** The funnel is specified; **Quality Gate 6 is not passed.**

**Do not begin content architecture, creative direction, UX, UI, copy, or any implementation.** The next phase requires an explicit brief from the orchestrator.
