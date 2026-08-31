# Service Architecture — APPROVED AND FROZEN

**Status:** APPROVED DECISION — frozen in Session 06 (2026-08-31).
**Authority:** `DEC-005` in `docs/00-project/DECISION_LOG.md`.
**Supersedes:** the three-pillar architecture (AI + Search Visibility / CRO / Marketing Automation) previously in this file.
**Governed by:** `BUSINESS_STRATEGY.md`.

**This is a commercial system, not an agency menu.** It describes how the outcome is produced. **It is not a navigation structure, not a sitemap and not a page inventory** — those belong to the information-architecture phase, which is not approved and has not begun.

---

## 1. Organising principle

**One outcome. Four capability groups beneath it. Not every capability becomes a top-level service.**

```
                    MEASURABLE QUALIFIED ENQUIRIES
                      (the core outcome system)
                                 |
   ┌───────────────┬─────────────┴─────────────┬────────────────┐
   │               │                           │                │
ACQUISITION    CONVERSION                MEASUREMENT       EXPANSION
capabilities   capabilities              capabilities      capabilities
(capture       (turn demand              (prove the        (extend once
 demand)        into enquiries)           chain)            the core works)
```

**The rule that keeps this from decaying into a service list:** acquisition, conversion and measurement are **one engagement delivered together**. They are described separately here because they are different skills — not because they are sold separately.

---

## 2. The core outcome system

**What it is:** the set of capabilities required to capture existing buyer demand and turn it into measurable qualified enquiries.

**The chain MappedSkills is accountable for, end to end:**

> discovery / source → landing experience → interaction → enquiry → qualified enquiry → opportunity → customer/revenue data supplied by the client

MappedSkills owns the chain **up to qualified enquiry**. Beyond that it **reports** using the client's own data, and states plainly what cannot be attributed. It does not promise revenue.

**Hard precondition on the whole system.** No part of this outcome may be sold — to a client, or on MappedSkills' own website — before analytics and enquiry-source capture are working.

**VERIFIED FACT (Session 01B, live):** MappedSkills' own production site currently has no analytics of any kind, a contact form with no `action` and no `method` that transmits nothing, and an empty booking widget. Neither documented conversion path functions. Fixing this is therefore a prerequisite of the transformation, not a later task.

---

## 3. Acquisition capabilities — capture the demand

Making the business findable and compelling at the moment a buyer is already looking.

| Capability | Scope | Notes and constraints |
|---|---|---|
| **Organic search** | Search strategy, site structure, internal linking, indexation, ranking work for commercial and problem-led queries | **The primary acquisition capability and the compounding engine.** Also a **12-month-plus horizon** — evidence from three independent sessions says organic cannot be the launch channel, and no plan may assume the website generates demand on publication |
| **Technical search** | Crawlability, indexation, rendering, Core Web Vitals, structured data, canonicalisation, sitemaps, robots governance, migration safety | Where MappedSkills' documented capability is already demonstrable. Also the discipline that protects existing SEO equity during the transformation |
| **Content / search demand capture** | Vertical service pages, buyer-symptom problem content, specification and RFQ-path content, comparison and evaluation content | Narrow, specific and buyer-phrased. **Never** a content factory or a city-page grid (Project Rule 10) |
| **AI-search readiness** | Entity hygiene, citability, crawler and retrieval taxonomy, source-authority footprint | Highly visible capability; subordinate to the outcome. Full treatment in §5 |
| **Paid search / paid media** | Primarily Google Ads; other paid channels on merit | **Retained capability, removed from company positioning.** See §7 |
| **Third-party authority and entity footprint** | Directory profiles, listings, reviews, Google Business Profile, citations, real backlinks | **The cheapest, fastest, best-evidenced acquisition action available.** Directory sources appeared in **15 of 28** unbranded AI runs and gate the category SERPs and the Local Pack simultaneously. Requires no case study and no repositioning to begin |

**Not acquisition capabilities, deliberately:** social media management, brand identity, PR as a standalone service, standalone web development, ecommerce merchandising.

---

## 4. Conversion capabilities — turn demand into enquiries

The second half of one outcome. **Integrated into the core engagement; never marketed as a separate service line, and never as the acronym "CRO" in Indian-facing language.**

| Capability | Scope |
|---|---|
| **Landing experiences** | Page structure, message hierarchy, evidence placement, objection handling, page-level intent alignment |
| **Enquiry paths** | The complete route from arrival to enquiry, including the seams where enquiries are actually lost |
| **Forms** | Field design, friction, validation, error states, mobile behaviour, delivery reliability, enquiry-source capture within the form |
| **Calls** | Click-to-call paths, call tracking readiness, response expectations |
| **Booking / quote / RFQ journeys** | Booking widgets, quote request paths, specification and RFQ flows — the conversion shape of the beachhead segment |
| **Conversion research** | Session and behaviour analysis, enquiry-quality review, buyer-language research, heuristic and technical teardown |
| **Experimentation** | **Only where traffic volume can support statistical significance** |

### The honest scope boundary — written into every offer
**APPROVED DECISION.** Below a real traffic and conversion threshold, this work is **conversion research, diagnosis and design — not statistically valid A/B testing.**

Promising testing where volume cannot support significance is the same category of dishonesty as an AI visibility rank, and is prohibited.

### Language
Expressed in buyer and business language — "getting more of the right enquiries", "why visitors don't enquire" — not in the acronym. **VERIFIED FACT (Session 03):** `cro services` returns pharmaceutical Contract Research Organisations; `b2b cro` returns croissants and crown rings; `conversion rate optimization agency` returns **(NONE)**. A dedicated conversion page targeting the buyer-symptom query family may still exist — a page targeting a query is not a company-level positioning claim.

---

## 5. AI Search — a capability, not a category

**APPROVED DECISION.** AI Search is an **important, highly visible supporting capability and differentiator**. **Highly visible in capability, content and proof. Subordinate to the enquiry-generation outcome.** Both halves must survive into every later phase.

### The five roles it occupies

1. **Delivery capability** — entity hygiene; the training-crawler vs retrieval-crawler distinction (`GPTBot` / `ClaudeBot` / `Google-Extended` / `CCBot` govern training; `OAI-SearchBot` / `Claude-SearchBot` / `PerplexityBot` govern retrieval) that most of the market gets wrong; citability; listings footprint. Correct, demonstrable and cheap to prove.
2. **Methodology** — per-system, per-prompt, run-count-published measurement. **Never blended, never ranked, never scored.** Mandatory internally whether or not it is ever sold.
3. **Diagnostic component** — one section inside the entry diagnostic that establishes an AI-visibility baseline and, more usefully, the **diagnostic chain**: absent from AI answers → because the cited sources are directories and listings → which this business is not on. **The tools report the absence; nobody observed in the research sells the chain.**
4. **Content-authority surface** — the buyer-phrased families: "how to appear in ChatGPT", "how to get cited by AI", crawler-access and citability diagnostics. **Never** GEO, AEO, LLMO or "AI visibility" as category terms.
5. **Proof mechanism** — publishing MappedSkills' own baseline with its method, run counts and trajectory. Honest, checkable, and unavailable to any competitor selling a score.

### What the website must demonstrate
Genuine, current expertise in: Google Search · AI-assisted search and discovery · citations and source authority · entity visibility · evolving discovery behaviour.

### What AI Search must never become
The company category · the homepage proposition · a universal or blended "AI Visibility Score" · a guarantee of citation or AI ranking · a standalone acquisition product competing with free tools from Ahrefs and Semrush.

**Evidence for the subordination** (so no later session re-escalates it by assumption): AI chatbots sent ~0.28% of total web traffic in March 2026 against Google's 28.12% *(vendor blog citing an unaudited third-party panel; re-verify before client-facing use)*; the two Pune agencies selling GEO appeared **0/28** in unbranded runs; AI answers name Semrush, SE Ranking, Ahrefs and Profound **ahead of any agency**; `best SEO agencies in Pune` served a **Local Pack and no AI Overview**; and cross-system agreement collapsed in direct measurement, which is why a blended score is rejected **methodologically**.

---

## 6. Measurement capabilities — the credibility spine

**APPROVED DECISION.** Measurement is a **mandatory foundation of the operating model**, not a reporting deliverable. It is what makes the enquiry promise falsifiable and therefore credible.

| Capability | Scope |
|---|---|
| **Analytics** | Analytics implementation, configuration and hygiene; a working baseline before any outcome claim |
| **Event instrumentation** | Meaningful interaction and funnel events across the enquiry path |
| **Attribution** | Discovery/source capture, referrer and landing-page capture, UTM discipline, separation of AI *crawlers* from AI *referrals* in server logs, channel and campaign attribution |
| **Qualified-enquiry tracking** | Enquiry capture, enquiry-source capture in the form itself, qualification status, enquiry-quality reporting |
| **CRM handoff measurement** | Passing source through to the client's CRM so opportunity and closed data can be joined back |
| **Honest reporting** | Reporting against a published baseline, with an explicit statement of what cannot be attributed |

**Unclaimed by every competitor examined in the research.** This is simultaneously a differentiator today and a component of future defensibility.

**Boundary rule:** enquiry-source capture is **measurement** and stays in the core engagement. Nurture, sequences and lifecycle work are **automation** and stay in expansion (§8).

---

## 7. Paid media — retained capability, not positioning

**APPROVED DECISION.** Retained as an acquisition capability and near-term demand and data engine. **Removed from company-level positioning.**

**What it does:** accelerates demand capture · creates near-term enquiry volume · supports testing · generates data · complements organic acquisition. It is also the fastest route to the client outcome data the proof programme requires, because organic cannot produce a first case study quickly enough for organic to matter.

**How it must be treated:** a **demand source inside the enquiry system**, chosen on merit per client, on the same measurement layer as everything else. It is coherent inside an enquiry proposition in a way it would not be inside a visibility proposition.

**What it must never become again:** the category, the headline, a standalone pitch, or a reason a client calls. "Performance marketing agency" is red-ocean and is MappedSkills' current, non-performing identity.

**Existing URLs.** MappedSkills' existing paid-media service pages (including `/google-ads`, `/social-media-ads`, `/lead-generation`) carry SEO equity and are the targets of legacy 308 redirects. **They must not be removed merely because paid media is no longer company positioning.** They are repositioned as demand-source capability pages beneath the enquiry proposition. **Final URL, navigation and page-level decisions belong to the information-architecture phase and are not made here.**

---

## 8. Expansion capabilities — after the core works

Sold when the client feels the pain, not when MappedSkills argues it. Enquiry volume itself creates the follow-up problem that sells the automation.

| Capability | Scope | Constraint |
|---|---|---|
| **Enquiry routing** | Routing rules, ownership assignment, escalation | In scope |
| **Response workflows** | Lead notifications, response-time automation, SLA alerting | In scope |
| **Follow-up automation** | Email and WhatsApp follow-up sequences, basic qualification, simple handoff automation | In scope. WhatsApp-for-business is the one live Indian commercial automation signal observed |
| **Additional acquisition channels** | Additional paid channels, additional search markets, additional demand sources | On merit, per client |
| **AI-search / source-authority programme** | Sustained entity, citability and listings work | Extension of §5 |
| **Export / international demand capture** | International-facing acquisition **for Indian clients** | The bridge described in `ICP.md` §8 |
| **Vertical content and authority programme** | Sustained vertical publishing and benchmark work | Beachhead-scoped |

### Explicitly excluded from expansion
**APPROVED DECISION.** CRM implementation · platform migrations · RevOps · lifecycle architecture · sales-operations consulting.

**Why:** the moat in that market belongs to platform partners (HubSpot Elite requires 2,750 sourced points, 11,000 total points, 80% GRR, 100+ certified employees and an invitation), the entry tier is under heavy AI-commoditisation pressure, and the work is bespoke, platform-fragmented and senior-talent-dependent. It does not compound, and it would recreate exactly the breadth problem this strategy exists to solve.

**MappedSkills must not become broadly positioned as a RevOps consultancy, a CRM implementation company, or a lifecycle-automation consultancy.**

---

## 9. What is deliberately NOT a service

Recorded so later phases do not quietly reintroduce them: marketing automation as a pillar or named service line · social media management · brand identity · standalone web development · ecommerce · an AI-visibility dashboard or score product · SEO sold as a standalone category service · "CRO" sold as a standalone named service · scaled location or city-page SEO · content-volume production.

---

## 10. What this document does not decide

**Navigation, sitemap, URL architecture, page inventory and internal linking are NOT decided here.** Capabilities are not pages. The mapping from capability to page belongs to the information-architecture phase, which requires its own approval and has not begun.

Also not decided: service naming, packaging, pricing, delivery process design, team structure, and tooling selection.
