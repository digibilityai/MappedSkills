# Research Brief — MappedSkills Own-Site Enquiry Diagnostic

**Session:** 09 · **Status:** **PROPOSED — NOT APPROVED.** · **Class:** LAUNCH — unconditional
**URL slot:** `/research/{own-site-enquiry-diagnostic}` — final slug belongs to the writing phase
**Evidence status: SEQUENCED — blocked until the fixes are actually shipped.**
**Source evidence:** Sessions 01, 01B and 07 (`docs/10-technical/`, `CURRENT_STATE.md`)
**No research entry is written in this brief.**

---

## 0. The classification decision

**This asset is RESEARCH — specifically, a published diagnostic protocol with MappedSkills as the subject — and not a case study, not a build-in-public series, and not a marketing story.**

Four options were considered:

| Option | Verdict |
|---|---|
| **Client-style case study** | **No.** There is no client, no permission question, and — decisively — **no baseline**, so the result format a case study requires cannot be honestly produced |
| **Build-in-public series** | **No, not at launch.** It implies a publishing cadence MappedSkills has never demonstrated and would commit the business to episodes it may not deliver. **It remains available as a PHASE 2 option once cadence is proven** |
| **Methodology proof only** | **Insufficient alone.** `/how-it-works` carries the method; this asset carries the *evidence that the method was applied and produced findings* |
| **Research entry — a diagnostic protocol applied to the firm's own site** | **Yes.** It is first-party, dated, reproducible, method-published, and useful to a reader who never becomes a client — which is the definition in `RESEARCH_CONTENT_STRATEGY.md` §2 |

## 1. What this asset is
The documented, dated, reproducible diagnostic MappedSkills ran on its own website: what was checked, what was found, what was changed, and what could not be measured afterwards.

## 2. The publication rule that governs everything else

> **It must publish only once the fixes are actually shipped. Published earlier it is a list of live defects, not proof.**

If the technical prerequisites slip, **`/research` launches with one entry.** That is the correct outcome, not a compromise.

## 3. The asset's job
Proof (5) · buyer education (2) · conversion support (6) · source and citation value (4). It is also the **worked example** the problem page and launch article 3 depend on.

## 4. Audience
Evaluating buyers; and any business owner who suspects the same thing is happening to them.

## 5. What may be published — all VERIFIED first-party findings

| Finding | Status |
|---|---|
| **The contact form had no `action` and no `method` and transmitted nothing, while showing a success state** | VERIFIED live. **Every enquiry since that code shipped was lost, and the visitor was told it succeeded** |
| **The booking widget rendered empty** — zero iframes on the page, with a "not configured yet" fallback in the pre-hydration HTML, which is what non-JS crawlers saw | VERIFIED live |
| **`/thank-you` was orphaned** — nothing linked or redirected to it, so submissions could not be counted even if they had arrived | VERIFIED |
| **No analytics of any kind ran in production** — `dataLayer`, `gtag` and `fbq` all undefined in a real browser | VERIFIED live |
| **Five service pages emitted no structured data at all** | VERIFIED |
| **The entity declaration was malformed** — `postalCode` contained the word "India"; `sameAs` was empty on both schema blocks | VERIFIED |
| **`Cache-Control: public, max-age=31536000, immutable` was served on production HTML** | VERIFIED live |
| **A staging subdomain was being ingested** — `testing.mappedskills.com` was cited by Perplexity as a source about the company | VERIFIED |
| **`/blog` returned HTTP 200 rendering "No articles found"; the 404 page hard-coded three blog slugs that all returned 404** | VERIFIED live |
| **What was changed, when, and what was verified after** | To be recorded as the fixes ship |

## 6. What may NOT be published

| Excluded | Reason |
|---|---|
| **Any before/after conversion figure** | **No baseline exists and one cannot be created retrospectively.** A fabricated "before" would violate Project Rule 15 and `DEC-007` |
| **Any enquiry-volume or conversion-rate number** | MappedSkills has **zero historical enquiries** through the production form |
| **Any traffic, ranking or impression figure** | No Search Console, no backlink tool, no analytics. **No baseline for any URL** |
| **Any claim that the fixes improved a number** | Improvement can only be measured from a post-launch baseline period forward, and the entry must say so |
| **Any client data** | None involved |
| **Credentials, environment variables, host configuration or anything creating a security exposure** | Findings are described at the level a reader can act on, not at the level an attacker can use |
| **Any defect still live at publication** | The asset is a record of work completed |

## 7. Method disclosure — mandatory
What was checked and in what order · the tools and access used, and their limits · dates for each observation · **that the original audit was static file inspection plus a small number of live requests and one browser session against ten URLs — no crawler, no Lighthouse, no load testing, no form submission, no hosting-panel access** · what was inferred rather than observed, labelled as inference.

## 8. Limitations disclosure — mandatory
**No baseline. No pre/post comparison. Single-site sample of one.** Some causes remain **UNKNOWN** — for example whether the empty CMS state was missing credentials or an empty space; the observable outcome is identical. Some production states were **inferred from behaviour, not read from a panel.**

## 9. Version and update policy
**Event-triggered:** each fix actually shipped extends the record, with the date. **It is a live record of completed work, and only of completed work.** Corrections are labelled as corrections.

## 10. Author and method owner
Named individual. The person accountable for the diagnostic and for re-running it.

## 11. Dataset availability
Not applicable in a conventional sense. **Publish the reusable verification sequence instead** — the artefact a reader keeps, which is this asset's genuine contribution.

## 12. Internal links
**Up:** `/research`. **Across:** `/problems/traffic-but-no-enquiries` (worked example), `/conversion-optimization`, launch article 3. **Evidence:** `/how-it-works`.

## 13. CTA rules
**RESEARCH** primary; PROOF secondary; PRIMARY **well below the fold**. **No sticky CTA. No gate. No mid-method sales interruption.**

## 14. Source requirements
First-party observations with dates. Any external technical reference cited primarily and re-verified at publication (Project Rule 19).

## 15. Visual opportunities
**The enquiry path with the break points marked** · annotated evidence of the real failures · **before/after only for changes actually shipped, with dates** — and no chart implying a conversion improvement that was never measured.

## 16. What would make this asset fail
- **Publishing before the fixes ship.**
- Any invented or implied "before" figure.
- Framing the failure as a clever marketing device rather than a real failure that lost real enquiries.
- Softening the finding that a success screen was shown while nothing was transmitted.
- Turning it into a service pitch.
- Exposing anything that creates a security exposure.
- Claiming an improvement that has not been measured.

## 17. Why this is worth publishing at all
**A firm that ran its own diagnostic, published what it found and fixed it in public is a genuinely unusual credential** — honest, checkable, available now, and the only case study MappedSkills can publish without anyone's permission. It is also the most direct available answer to the hardest objection on the site: a premium price with no client proof.
