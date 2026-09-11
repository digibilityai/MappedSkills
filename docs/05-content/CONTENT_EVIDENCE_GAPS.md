# Content Evidence Gap Register — PROPOSED

**Session:** 09 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**

**What this is.** Claims MappedSkills would commercially want to make, and cannot support today. Each records what evidence exists, what is missing, who can close it, and **whether content is blocked**.

**The rule this register enforces:** a gap is closed by obtaining evidence, **never by creative writing**. Where evidence does not exist, the asset either omits the claim, downgrades it to a labelled judgement, or is deferred.

**Legend — Content status:**
**BLOCKED** — the asset cannot publish until the gap closes.
**CONSTRAINED** — the asset publishes without the claim.
**DEFERRED** — the asset is not attempted at launch.

---

## 1. Client results and outcomes

| | |
|---|---|
| **Desired claim** | "We produced *X* qualified enquiries for *Y* client, measured over *Z* period." |
| **Evidence available** | **None.** Zero published case studies. `AnybodyCanBake` and `Digibility` are flagged as candidates; publishability is **UNKNOWN** |
| **Evidence missing** | Written client permission · a documented pre-work baseline · measurement period · results from the client's own system · attribution limitations (`CLAIMS_AND_EVIDENCE_GOVERNANCE.md` §6) |
| **Owner / action** | **OWNER.** The last remaining Session 02 blocker. **No Claude session can produce it.** It gates all premium positioning and the `/work` indexation decision |
| **Content status** | **BLOCKED** for `/work` and `/work/{slug}`. **CONSTRAINED** for every commercial page — each ships with method and own-diagnostic proof instead |

## 2. Revenue and ROI impact

| | |
|---|---|
| **Desired claim** | "Our work produced ₹*X* in revenue" / any ROI figure |
| **Evidence available** | None. **And the approved strategy forbids promising revenue in any case** |
| **Evidence missing** | Client close data, an attribution chain reaching it, and permission |
| **Owner / action** | Owner + client, **and only ever as a report, never a promise** |
| **Content status** | **CONSTRAINED — permanently, by design.** The approved formulation replaces it: own the enquiry, report through to revenue on the client's data, state what cannot be attributed |

## 3. The claims currently in production

| | |
|---|---|
| **Desired claim** | "300%+ ROI" · "₹100Cr+" · "₹10Cr+" |
| **Evidence available** | **None. Provenance unknown.** VERIFIED: Google AI Mode surfaced and Perplexity repeated "300%+ ROI" as a description of the company |
| **Evidence missing** | Provenance, underlying data, permission |
| **Owner / action** | **OWNER — and it is a live exposure, not a copy edit.** Whether to remove or substantiate in production is an open decision (`DEC-007`) |
| **Content status** | **PROHIBITED in all new content.** Also blocks the homepage title, which currently carries the claim |

## 4. Conversion improvement on MappedSkills' own site

| | |
|---|---|
| **Desired claim** | "We fixed our own conversion path and enquiries rose by *X*." |
| **Evidence available** | The **diagnosis** — verified, dated, reproducible: no analytics in production, a form with no `action` or `method`, an empty booking widget, `/thank-you` orphaned, no structured data on five service pages |
| **Evidence missing** | **A baseline. It cannot be created retrospectively.** No analytics has ever run |
| **Owner / action** | Technical phase, then a defined post-launch baseline period |
| **Content status** | **CONSTRAINED.** The own-site research entry publishes the **diagnosis and the fixes**, with an explicit statement that **a pre/post comparison is impossible and is not presented**. A fabricated "before" would violate Project Rule 15 and `DEC-007` |

## 5. Any measured improvement in AI visibility

| | |
|---|---|
| **Desired claim** | "Our AI visibility improved by *X*" / a trend of any kind |
| **Evidence available** | **One measurement.** 39 runs, one day, one location, English, signed out |
| **Evidence missing** | **A second measurement round.** Also: any day-to-day variance data — the largest unmeasured quantity in Session 04 |
| **Owner / action** | Owner funding for a second round; the framework to run one exists |
| **Content status** | **CONSTRAINED.** The baseline publishes as a **baseline**, with no trend claimed. **"One measurement is not a trend" is stated in the asset** |

## 6. Claude and Grok coverage

| | |
|---|---|
| **Desired claim** | "We measure visibility across ChatGPT, Gemini, Claude, Perplexity and Grok" |
| **Evidence available** | Four systems tested at signed-out tiers. **Claude and Grok were NOT TESTABLE** — login and sign-up gates |
| **Evidence missing** | Paid accounts or tooling. Full multi-system coverage is a **real recurring cost of goods** |
| **Owner / action** | **OWNER — a funding decision** |
| **Content status** | **CONSTRAINED.** Every AI asset names the systems it could not test. **No claim of any kind about Claude or Grok is permitted** |

## 7. Manufacturing / industrial proof and demand

| | |
|---|---|
| **Desired claim** | "We generate RFQs for Indian manufacturers" / any industrial outcome |
| **Evidence available** | Search evidence only — the cleanest commercial family observed; RFQ language used unprompted by all three AI systems; specialisation observed beating tenure |
| **Evidence missing** | **Absolute search volume (UNKNOWN — no keyword tool has ever been available)** · a healthcare SERP comparison · **one completed industrial engagement with a publishable result** |
| **Owner / action** | **OWNER** — keyword tooling funding, and the engagement itself |
| **Content status** | **DEFERRED.** `/industries/manufacturing` and its article are **LAUNCH — CONDITIONAL** on exactly this gate. If it clears, the page ships **and still may not imply a case study exists** |

## 8. Reviews, ratings and third-party standing

| | |
|---|---|
| **Desired claim** | "Rated *X* by *N* clients" · "Listed on Clutch" · any social-proof count |
| **Evidence available** | **None surfaced.** No Clutch, Semrush Agency Partners or GoodFirms profile found; no Google Business Profile surfaced by any system; AI Mode could state no address and no rating |
| **Evidence missing** | The profiles themselves, and **genuine reviews — which are never manufactured** (Project Rule 15) |
| **Owner / action** | **OWNER. Self-serve, blocked by nothing, and the highest-leverage action available.** Directory sources appeared in 15 of 28 unbranded AI runs |
| **Content status** | **CONSTRAINED.** No logo wall, no rating, no review count, no "trusted by" anywhere at launch. **`AggregateRating` and `Review` schema are prohibited** without genuine permissioned first-party data |

## 9. Response-time performance

| | |
|---|---|
| **Desired claim** | "We respond within *X* hours" |
| **Evidence available** | None. No enquiry has ever been received through the production form, which transmits nothing |
| **Evidence missing** | A measured distribution over a defined baseline period |
| **Owner / action** | Owner sets an internal target and names the responder; measurement follows launch |
| **Content status** | **CONSTRAINED. No public numeric SLA** until measured. Publishing an unmeasured promise would demonstrate the failure MappedSkills sells the fix for. **Once measured it becomes a genuine proof asset no competitor examined publishes** |

## 10. International and export capability

| | |
|---|---|
| **Desired claim** | "We generate export enquiries" / any claim about international search |
| **Evidence available** | **None. VERIFIED: no international SERP and no international AI answer has ever been observed** — egress was Pune-locked in both research sessions |
| **Evidence missing** | Research from an international vantage point, and any international delivery experience |
| **Owner / action** | Owner, if and when international is pursued. **No international SEO or location strategy is to be created yet** |
| **Content status** | **DEFERRED.** No international page, no export page, no international claim. `seo for exporters` returns **(NONE)** |

## 11. Absolute search volume, anywhere

| | |
|---|---|
| **Desired claim** | Any statement about how much demand a query family carries |
| **Evidence available** | Qualitative signals only — autocomplete depth, intent composition, contamination, SERP composition |
| **Evidence missing** | **A keyword tool. None has ever been available in this programme** |
| **Owner / action** | **OWNER — funding decision.** It also gates the manufacturing beachhead |
| **Content status** | **CONSTRAINED.** **No volume, difficulty or CPC figure may appear in any asset**, internal or public. Where a figure is wanted, write UNKNOWN |

## 12. Ranking, traffic and backlink baselines

| | |
|---|---|
| **Desired claim** | "Traffic grew by *X*" · "We rank for *N* keywords" · any migration-impact claim |
| **Evidence available** | **None for any URL.** No Search Console access, no backlink tool, **no analytics in production** |
| **Evidence missing** | A baseline captured **before** anything changes |
| **Owner / action** | Technical phase — **capture the baseline before the migration**, or the opportunity is permanently lost |
| **Content status** | **CONSTRAINED.** No traffic, ranking or migration-outcome claim at launch or after, until a baseline exists |

## 13. Industry-specific AI-citation behaviour

| | |
|---|---|
| **Desired claim** | "Industrial categories are cited at *X* rate in AI answers" |
| **Evidence available** | A professional-services figure (under 4%) from a vendor. **No industrial equivalent was found** |
| **Evidence missing** | An industrial-category figure from a credible source |
| **Owner / action** | **RESEARCH REQUIRED — but not commissioned.** Carry it; do not build a programme around it |
| **Content status** | **CONSTRAINED.** No industrial AI-citation-rate claim, and the professional-services figure is not transferred to industrial by analogy |

## 14. Whether AI visibility produces enquiries or revenue

| | |
|---|---|
| **Desired claim** | "Being visible in AI search produces enquiries" |
| **Evidence available** | AI chatbots sent ~0.28% of total web traffic vs Google's 28.12% (March 2026) — **vendor blog citing an unaudited third-party panel**. Conversion multipliers exist but are **single-company figures with self-selecting audiences** |
| **Evidence missing** | Independent, auditable data; and any MappedSkills first-party evidence — **all four layers are currently zero or unmeasurable** |
| **Owner / action** | Re-verify the referral figure before any client-facing use; measure MappedSkills' own once analytics exists |
| **Content status** | **CONSTRAINED.** **No claim that AI visibility drives revenue today is supportable, and none may be made.** The multipliers may not be quoted as benchmarks |

---

## 15. Summary — what the gaps do to the launch

| Consequence | Detail |
|---|---|
| **Two assets are outright blocked** | `/work` and `/work/{slug}` — on client permission (§1) |
| **Two assets are conditional** | `/industries/manufacturing` and its article — on the manufacturing gate (§7) |
| **One asset is sequence-blocked** | `/research/{own-site-enquiry-diagnostic}` — until the fixes ship (§4) |
| **Every commercial page is constrained** | Method and own-diagnostic proof replace client proof (§1, §8) |
| **`/pricing` carries the largest single credibility gap on the site** | Premium price, zero proof (§1, §8) |
| **No number about volume, traffic, ranking, revenue or improvement may appear anywhere** | §11, §12, §4, §5 |

**The register's own conclusion: the content phase can produce a credible launch site, and it cannot produce a proven one.** Nine of the fourteen gaps close only through owner action, and the two cheapest — directory profiles and reviews — are blocked by nothing and are slower than writing. They should start now.
