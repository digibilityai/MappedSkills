# Assumptions and Open Questions

**Last updated:** 2026-08-31 (Session 06 — business strategy freeze).

Questions answered by the owner-approved direction (`DEC-005`) are moved to §1 as **RESOLVED / SUPERSEDED** rather than deleted, so the trail is preserved. Genuinely unresolved questions remain open in §3 onwards.

---

## 1. Resolved or superseded by the owner decision (2026-08-31)

**APPROVED DECISION (`DEC-005`):** *MappedSkills exists to help businesses capture buyer demand and turn it into measurable qualified enquiries.*

| Previously open | Status |
|---|---|
| Should AI + Search Visibility be the primary spearhead service? | **SUPERSEDED.** The spearhead is the **outcome** — capturing demand and turning it into enquiries. Search is the strongest acquisition capability beneath it; AI Search is a visible supporting capability, not the category |
| Should CRO be a second service/value multiplier? | **RESOLVED.** Conversion is **integrated into the core delivery system**, not a separate service, and is not marketed as the acronym "CRO" in Indian-facing language |
| Should Marketing Automation be a third pillar? | **RESOLVED.** Removed from positioning; retained as a **limited downstream expansion capability** |
| Does "GET FOUND → CONVERT → AUTOMATE → GROW" provide the commercial story? | **SUPERSEDED** as a strategic structure. Its underlying sequencing logic survives inside the Entry → Core → Expansion → Retention ladder |
| Does "Search Visibility" have enough commercial clarity? | **RESOLVED — no.** The term belongs to other industries in search. Rejected as company positioning |
| Which service has the best intersection of demand, margin, recurrence, scalability and SEO opportunity? | **RESOLVED at the level that matters:** the business is defined by the outcome, not by picking a service |
| Which category term has the strongest buyer recognition? | **RESOLVED in principle.** Buyers use category vocabulary the company deliberately does not adopt as its identity. `DEC-008`: a page may target a term the company does not use as positioning |
| Is the primary ICP settled? | **RESOLVED at the criteria level.** See `ICP.md` §2–§4. Revenue bands and turnover thresholds remain deliberately unset — there is no evidence to set them |
| India-first vs international sequencing | **RESOLVED. India-first.** International remains strategically possible and entirely unvalidated. **No international SEO or location strategy yet** |
| How visible is MappedSkills today across Google and AI discovery systems? | **ANSWERED (Session 04).** Working branded retrieval; **zero unbranded discovery** — 0 appearances in 28 unbranded runs across four systems |
| What is the magnitude of AI referral traffic versus organic? | **SUBSTANTIALLY ANSWERED (Session 04).** ~0.28% of total web traffic vs Google's 28.12% (March 2026). **Vendor blog citing an unaudited third-party panel — re-verify before any client-facing use** |
| Which competitors dominate relevant AI recommendations? | **ANSWERED.** Directory sources dominate; the GEO-selling Pune competitors appeared 0/28 |
| What source patterns drive citations? | **ANSWERED.** Directories and listings — `agencies.semrush.com` in 10 of 28 runs, `clutch.co` in 5 |
| Current repository structure, router, CMS, URL inventory, forms/APIs, analytics stack, schema, sitemap/robots, canonicals, images/fonts, hosting, deployment, tests/CI, dependencies | **ANSWERED (Sessions 01/01B).** See `docs/10-technical/`. Next.js 16.2.6 App Router, React 19, TypeScript 5.7.3, Tailwind v4, Contentful GraphQL, custom Node server, cPanel/Passenger deploy, 22 routes, no API routes, no middleware, no Server Actions |
| Does the recommended direction imply an order-of-magnitude price/ICP change? | **RESOLVED — NO. The premise was factually wrong.** Production `/pricing` displays ₹50K–₹2L/month; the ₹2,500/₹5,000 figures are dead code referenced by no file. The change is a **proof and messaging change, not a business-model change** |

---

## 2. Known project facts (carried forward)

- MappedSkills has an existing production website at `https://mappedskills.com`.
- Stack: Next.js and Node (full detail in `CURRENT_STATE.md`).
- Existing functionality, URLs and SEO equity must be protected.
- The owner wants a world-class redesign and marketing engine.
- SEO-led customer acquisition is a core objective; **organic is a 12-month-plus engine and cannot be the launch channel.**
- Initial launch must include content sufficient to begin building topical authority.
- AI visibility across relevant answer/search systems is a core programme requirement — as a capability, not as the company category.
- Claude executes specialist roles under orchestration; repository documentation is durable project memory.

---

## 3. Open — vertical and market validation

- **Manufacturing beachhead validation.** Three gates stand before any company-level commitment: (1) **absolute search volume verification with a real keyword tool** — no keyword tool has ever been available in this programme and this is the largest single risk to the direction; (2) a **healthcare SERP test** on the same basis, so the beachhead is a comparison rather than a default; (3) **one completed industrial engagement with a publishable result**. *(OWNER ACTION required for funding and for (3).)*
- **Healthcare comparison** — its autocomplete is equally clean and it has never been SERP-tested. Retained because it is the only named alternative with comparable signal.
- **Does the professional-services AI-citation weakness apply to industrial categories?** No industrial-category equivalent figure was found. **RESEARCH REQUIRED** — but not commissioned; carry it, do not build a programme around it.

---

## 4. Open — proof and evidence

- **Which client results may be published**, with written permission. `AnybodyCanBake` and `Digibility` are flagged candidates; publishability remains **UNKNOWN**. **This is the last remaining Session 02 owner blocker and it gates all premium positioning.** No Claude session can produce it.
- **Whether and when to remove or substantiate** "300%+ ROI", "₹100Cr+" and "₹10Cr+" in production. The strategic rule is settled (`DEC-007`: they may not be used as reasons-to-believe). The **production remediation** is an open owner decision. **VERIFIED FACT:** the "300%+ ROI" claim is being redistributed by Google AI Mode and Perplexity as a description of the company.
- **Google Business Profile status** — whether one exists, is claimed and is complete. Not surfaced in any research observation. This is the observed lever on Pune local demand, alongside reviews.
- **Third-party listing status** — MappedSkills has no Clutch and no Semrush Agency Partners profile. Self-serve; blocked by nothing.
- **What proprietary data or research can be generated**, and whether the longitudinal benchmark asset is funded. Its job is reclassified as vertical authority and sales credibility — **not** AI-citation acquisition.

---

## 5. Open — commercial

- **The entry-offer model: free, paid, or hybrid.** Deliberately not forced in `OFFER_ARCHITECTURE.md` §2. Evidence pulls both ways and the choice interacts with the proof position.
- **Final offer packaging and naming** — including whether the Session 05 working labels "Enquiry Diagnostic" and "Enquiry System" survive. **They are naming hypotheses and are not approved.**
- **Final pricing**, contract terms and what is credited against what.
- **International expansion timing.** Gated on its own SERP and AI research from an international vantage point. **VERIFIED FACT:** no international SERP or AI answer has ever been observed — egress was Pune-locked in both research sessions.
- **Exact paid-media scope** within engagements — channels, thresholds, and how spend is separated from fee.
- **Whether industry-specific landing pages are justified**, and how many. An IA-phase question, gated on the beachhead evidence.

---

## 6. Open — website, content and technical

- **Final website messaging**, homepage copy and taglines. Not written, not approved. A later, separately gated phase.
- **Final sitemap, URL architecture and page inventory.** Not produced. Capabilities are not pages.
- **Final keyword clusters and content roadmap**; launch article count; initial tools/calculators; author structure and editorial process; update cadence for fast-changing AI-search topics.
- **Root cause of the empty Contentful state** — missing/invalid production credentials versus an empty space. Observable outcome is identical. A pre-launch engineering item, not a strategy blocker.
- **Analytics, enquiry capture and a working conversion path.** Currently absent in production. **This is a hard precondition of any outcome-based claim**, including on MappedSkills' own site.
- **`.htaccess` and host-level configuration; `www` normalisation; cPanel environment-variable audit; Search Console verification; Core Web Vitals and accessibility measurement; backlink inventory against the nine legacy redirect sources.** Deferred to implementation; not gate-blocking.
- **Latent risk:** deleting `public/robots.txt` during the redesign would silently activate the inert site-wide `GPTBot`/`CCBot` block in `app/robots.ts`. Must appear in the technical migration plan.

---

## 7. Open — documentation corrections outside Session 06's permitted scope

Session 06 was permitted to modify only the five business documents and four project documents. The following carry the withdrawn price premise and should be corrected by a session with the appropriate scope:

- `docs/10-technical/CURRENT_ROUTE_INVENTORY.md` line 47 — refers to a "stated ₹50K/month entry price"; reconcile with the verified `/pricing` content.
- `docs/01-business/STRATEGIC_VALIDATION.md` §10 and §13 — state the ₹2,500–₹5,000/month premise and the "order-of-magnitude price and ICP change" that is now withdrawn. **If corrected, annotate rather than rewrite** — it is a research record, and its history must not be edited to look as though the approved strategy was always obvious.

---

## 8. Standing rules on this document

- Do not create new research programmes unnecessarily. An open question is not automatically a work order.
- Do not silently promote a hypothesis into an approved decision. Approval is recorded in `DECISION_LOG.md` or it did not happen.
- Do not close a question by inventing a figure. Label it UNKNOWN.
