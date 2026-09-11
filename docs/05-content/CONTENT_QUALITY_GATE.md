# Content Quality Gate — PROPOSED

**Session:** 09 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.** This document defines a per-asset publication gate. **It is not Quality Gate 7, and it does not pass it.**

**Scope:** every page, article and research entry, without exception. A conditional asset must pass this gate **and** its own condition.

---

## 1. The gate

An asset publishes only when **all sixteen** items are satisfied. **Any single failure blocks publication.** There is no partial pass and no score.

| # | Item | Pass condition | Fails when |
|---|---|---|---|
| **1** | **Reason to exist** | Names at least one of the seven content jobs (`CONTENT_STRATEGY.md` §2) and the page or decision it supports | The justification is "it's a good topic" or "a keyword exists" |
| **2** | **Correct intent** | Matches the intent of its assigned query family, or explicitly states that it has no query target and why | It targets an untested family without saying so, or serves a different intent than its assignment |
| **3** | **Original value** | Passes the delete-test: remove every sentence that could be written by someone who had not done the work, and something substantive remains | It paraphrases ranking pages, restates documentation, or reorders someone else's list |
| **4** | **Evidence available** | Every claim needing evidence has evidence that exists **now** | A claim depends on an asset, a measurement or a permission that does not exist yet |
| **5** | **No unsupported claims** | Every significant claim classified A–E (`CLAIMS_AND_EVIDENCE_GOVERNANCE.md` §1). **Zero class F** | Any unclassifiable claim, any invented number, any use of "300%+ ROI", "₹100Cr+", "₹10Cr+", any guarantee, any superiority claim without a cited third-party basis |
| **6** | **Appropriate conversion role** | CTA role and intensity match the page type (`CONTENT_STRATEGY.md` §7) | A sticky CTA on research, methodology or editorial · a hard sell above the fold on a problem page · a CTA referencing proof that does not exist · a mid-method sales interruption |
| **7** | **Correct internal links** | Links up to one primary destination, across to adjacent cluster content, and down to the evidence its claims rest on | Proof interposed as a required step · orphaned asset · a link from an unconditional page into the conditional cluster that would break |
| **8** | **Author and source transparency** | Named author with a real bio and a real basis · published date · genuine updated date · sources at the point of claim | "MappedSkills Team" · no bio · a cosmetic date · a bibliography with no in-text citations |
| **9** | **No cannibalisation** | Checked against every other launch asset for intent overlap; the boundary is stated in the brief | Two assets compete for one intent · an article restates its problem page · a guide restates its research entry |
| **9b** | **Canonical research respected** | If the asset draws on a first-party dataset or measured study, it **summarises only what is necessary, links to the canonical research URL, and adds materially different application or interpretation** (`CONTENT_STRATEGY.md` §6A) | It reproduces substantially the same **dataset, methodology, findings, charts or conclusion** as its research source · **it would have no distinct reason to exist if the research entry were deleted** · a dataset appears at two URLs |
| **10** | **Visual opportunity identified** | At least one thing better shown than described is named at brief stage, or a stated reason none applies | The asset is a wall of text by default · a figure visualises a number that does not exist |
| **11** | **Accessible structure** | Meaningful heading hierarchy · self-contained sections · tables only where tabular · figures with text alternatives · WCAG 2.2 AA on conversion elements | Headings used for styling · a table used for layout · a diagram carrying meaning with no alternative · content that only scrolls horizontally on a phone |
| **12** | **AI and human readability** | The arrival question answered near the top, in plain language · sections accurate out of context · method and limits blocks where a number appears | The answer is withheld to increase read time · a passage is misleading when lifted alone |
| **13** | **Freshness owner assigned** | A **named person** owns the asset's review, and its review model and trigger are recorded (`CONTENT_STRATEGY.md` §14) | Ownership is implicit, collective, or unassigned |
| **14** | **Metadata and schema identified** | Title, description, canonical, OG and the schema type recorded — with schema describing what the page actually is | Schema adopted to chase a rich result · `FAQPage` without re-verified eligibility · `Dataset` on a non-dataset · `AggregateRating` or `Review` without genuine permissioned first-party data |
| **15** | **Does not read like generic agency content** | Passes §2 below | Fails any item in §2 |

---

## 2. The generic-agency test

An asset fails item 15 if **any** of these is true:

1. The opening paragraph could appear on any agency site with the company name swapped.
2. It leads with technique vocabulary instead of the buyer's commercial problem.
3. It uses "CRO", GEO, AEO or LLMO as its framing.
4. It claims a superlative without a cited third-party basis.
5. It contains a statistic whose original source it cannot reach.
6. It promises an outcome MappedSkills does not control.
7. It describes copyable differentiation as a moat.
8. It presents a named framework as though the name were the value.
9. It contains an illustrative dashboard, sample chart or "typical results" graphic with invented data.
10. It could not survive a prospect asking "how do you know that?" of any sentence in it.

---

## 3. Who runs the gate

| Role | Responsibility |
|---|---|
| **Author** | Completes items 1–5, 8, 9b, 12 before submitting. Lists every claim with its class |
| **Reviewer** | A second person on items 3, 5, 9, 9b and 15. **Only named as "reviewed by" on the asset if the review genuinely happened** |
| **Owner** | Items 4 and 5 for anything involving company facts, prices, client evidence or permissions. **No Claude session can substitute for this** |
| **Technical** | Items 11 and 14 |

**Nobody approves their own significant work.** An asset with no available second reader publishes without a "reviewed by" byline rather than with a manufactured one.

---

## 4. Gate exceptions

**There are three, and they are all narrower than they look.**

1. **A correction** to a published asset does not re-run the full gate; it re-runs items 5, 8 and 14, and is **labelled as a correction**.
2. **A research re-measurement** creates a new version and runs the full gate, because it is a new asset.
3. **An asset with no query target** may pass item 2 by stating that it has none and naming the other jobs it does (`EDITORIAL_STRATEGY.md` §4). **It may not pass by inventing one.** Where a target is proposed but untested, the asset carries **PRIMARY SEARCH TARGET = UNVALIDATED** on the record until a targeted check clears it — **launch article 2 is the worked example.**

**There is no exception for launch pressure.** An asset that cannot pass is deferred, not published with a note.

---

## 5. What this gate deliberately does not do

- It does not score. An asset passes or it does not.
- It does not measure E-E-A-T. That is an evidence model, not a metric (`CONTENT_STRATEGY.md` §12).
- It does not set a word count.
- It does not check rankings, traffic or conversion — **none of which can be measured until analytics exists in production.**
- It does not approve Quality Gate 7, or any gate. Gate advancement is an owner and orchestrator action recorded in `DECISION_LOG.md`.
