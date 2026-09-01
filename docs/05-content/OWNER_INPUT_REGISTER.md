# Owner Input Register — PROPOSED

**Session:** 09 · **Date:** 2026-09-01 · **Branch:** `test_branch`
**Status:** **PROPOSED — NOT APPROVED.**

**What this is.** Information only the owner can supply, without which specific content assets cannot be written honestly. **Nothing here is assumed, inferred or filled with a plausible answer.**

**How to use it.** Work top-down. Items 1–4 block the most assets. Items marked **BLOCKING** stop an asset entirely; **CONSTRAINING** items let it ship without something it would otherwise carry.

---

## Priority checklist

| # | Input needed | Blocks | Status |
|---|---|---|---|
| **1** | **Which client results may be published, and with whose written permission** | `/work`, `/work/{slug}`, every proof claim on every commercial page, `/pricing` credibility | **BLOCKING** |
| **2** | **Verified company facts** — legal entity name, complete registered postal address including a real postal code, phone, email, founding year | `/about`, `/contact`, footer, all Organization/LocalBusiness schema, every directory profile | **BLOCKING** |
| **3** | **Current team members, roles and genuine expertise** — and who authors what | `/about`, every article byline, every research entry, `Person` schema | **BLOCKING** |
| **4** | **Decision on "300%+ ROI", "₹100Cr+", "₹10Cr+" in production** — remove or substantiate | The homepage title, and the live exposure that AI systems are redistributing | **BLOCKING** |
| **5** | **Confirmed current prices, bands, what is included, and what changes the price** | `/pricing` | **BLOCKING** |
| **6** | **The entry-offer model — free, paid or hybrid** | The PRIMARY and DIAGNOSTIC CTA framing on every page; whether a diagnostic tool is ever built | **BLOCKING for CTA language, not for page structure** |
| **7** | **Google Business Profile status** — exists, claimed, complete? | Local discovery, `/contact` NAP consistency, the AI local-answer mechanism | **CONSTRAINING** |
| **8** | **Authorisation to create directory profiles** — Clutch, Semrush Agency Partners, GoodFirms | The authority side of the strategy, which owned-site publishing cannot create. **Present in 15 of 28 unbranded AI runs** | **CONSTRAINING, and blocked by nothing** |
| **9** | **The actual delivery process** — what genuinely happens, stage by stage, on a real engagement | `/how-it-works`, which is the single highest-value proof asset available | **BLOCKING** |
| **10** | **Funding for keyword tooling and a second AI measurement round** | The manufacturing gate; any volume statement; any AI trend statement | **CONSTRAINING** |

---

## Detail

### 1. Client evidence
**Needed:** which clients may be named · what may be published for each (name, logo, figures, screenshots, quotes) · written permission from the right person at each · whether an anonymised version is permitted where a named one is not.
**Candidates flagged in the programme:** `AnybodyCanBake`, `Digibility`. **Publishability is UNKNOWN.**
**Consequence if not supplied:** `/work` stays `noindex`, out of navigation and out of the sitemap; every commercial page ships on method and own-diagnostic proof only; the premium price on `/pricing` stays unbacked.
**No Claude session can produce this. It is the last remaining Session 02 blocker.**

### 2. Company facts
**Needed:** the exact legal entity name as used in contracts · the complete registered postal address **including a real postal code** · the primary phone and email that will be published · the founding year.
**Why it is blocking, specifically:** AI systems report a founding year of **2016 from LinkedIn** — **NOT VERIFIED** in this programme. The current schema's `postalCode` field contains the word **"India"**, which is malformed on its own terms. Google AI Mode **could state no address and no rating** for MappedSkills. Every directory profile, the Local Pack and the AI local-answer mechanism depend on one consistent, correct fact set.
**Nothing here may be inferred from the existing site**, because the existing site is part of the problem.

### 3. People and authorship
**Needed:** who works at MappedSkills now, in what role, with what genuinely relevant expertise · who will author each launch asset · whether a genuine second reviewer exists for the "reviewed by" mechanism · which social and professional profiles are current.
**Why it is blocking:** the strategy names visible founder expertise and named authorship among the few available trust signals, and **credentials are never manufactured**. A staff name surfaced by Google AI Mode is **NOT VERIFIED**. Three social links are currently hard-coded in the codebase and must be verified before launch.
**If no second reviewer genuinely exists, assets publish without a "reviewed by" byline** rather than with a manufactured one.

### 4. The unsupported production claims
**Needed:** a decision on "300%+ ROI", "₹100Cr+" and "₹10Cr+" — remove them, or supply the provenance and underlying data.
**Why it is urgent rather than tidy:** VERIFIED — Google AI Mode surfaced the site's own title carrying the claim and Perplexity repeated it; only ChatGPT qualified it as self-reported. **Whatever the site asserts is what AI systems redistribute.** The claims are already prohibited in new content by `DEC-007`; the production remediation is the open part.

### 5. Pricing
**Needed:** confirmation that the displayed bands are current · what each includes and excludes · **what actually changes the price** · whether ad spend is separate · minimum engagement length · whether any figure on the page is out of date.
**Verified starting point:** production `/pricing` currently displays **STARTER ₹50K–₹75K/month**, **GROWTH ₹1L–₹2L/month** and Custom Pricing, with "Starting From ₹50K" in the hero and an FAQ recommending a management fee of at least ₹50K/month excluding ad spend.
**No price may be invented, changed or inferred by any Claude session.** Every production price entering new copy requires explicit owner confirmation.

### 6. The entry-offer model
**Needed:** free, paid, or hybrid.
**Why it matters to content and not to architecture:** the funnel and the IA are deliberately model-agnostic, so page structure survives any answer — but the PRIMARY and DIAGNOSTIC **CTA framing on every page** changes with it, and it decides whether a self-serve diagnostic is ever built.
**Evidence pulls both ways, and is recorded rather than resolved:** `seo audit` demand is dominated by "free" and attracts tool-seekers; every competitor examined offers a free audit; **the current free-consultation model has not been generating enquiries**; and a paid diagnostic is a hard sale with zero proof inventory.

### 7. Google Business Profile
**Needed:** does one exist, is it claimed, is it complete, and who controls it.
**Status: INFERENCE, not verified.** No system surfaced one; AI Mode could state no address and no rating; MappedSkills was absent from a **16-entry ChatGPT list of Pune agencies**.
**This is the observed lever on Pune local demand, and no page fixes it.**

### 8. Directory profiles
**Needed:** authorisation and the fact set to create profiles on Clutch, Semrush Agency Partners and GoodFirms.
**Why it is first in the proof programme:** self-serve, needs no case study, needs no repositioning, and gates the category SERPs, the Local Pack and the AI answer layer simultaneously. **ChatGPT stated in plain text that it selected the brands it recommended by reading two directories. MappedSkills is on neither.**
**Note recorded to prevent a false blocker:** blocking `SemrushBot` in `robots.txt` has **no bearing** on listing at Semrush Agency Partners. They are different things.

### 9. The real delivery process
**Needed:** what genuinely happens on an engagement, stage by stage — what is delivered, in what order, by whom, with what the client must supply · what MappedSkills measures and what it does not · where human judgement enters · what it will not promise.
**Why it is blocking:** `/how-it-works` is the **highest-value proof asset available today** precisely because it can be published without any client permission — but only if it describes something real. **A methodology page describing an invented process is fabricated proof.**

### 10. Tooling funding
**Needed:** a decision on funding a keyword tool and a second AI measurement round.
**Consequences of not funding:** absolute search volume stays **UNKNOWN** everywhere, so the manufacturing gate cannot clear and no volume statement is possible; and with one measurement there is **no trend**, so no AI-visibility change may be described.

---

## Secondary inputs

Not blocking a launch asset, but each removes a constraint or unlocks a claim.

| Input | What it unlocks |
|---|---|
| **Which industries MappedSkills has genuinely served** | Honest domain-fluency framing without implying a specialisation or a case study |
| **Geographies genuinely served, and any real export experience** | Any international mention at all — **there is currently no supportable claim** |
| **Real partnerships, certifications or platform credentials** | Third-party trust signals. **None may be implied without one** |
| **Media features, awards or third-party mentions** | Authority signals. **None may be invented** |
| **Real screenshots, dashboards or data MappedSkills may publish** | Visual evidence on `/how-it-works` and the research entries |
| **Who owns enquiry response, and the business hours to publish** | The response-time model, and eventually a measured SLA |
| **Company history** — genuine milestones, in order | `/about`. **No invented milestones** |
| **Whether `/privacy-policy` becomes indexable** | An open IA decision with a trust dimension |
| **Consent mechanism and retention periods** | Legal review; a pre-launch blocker for any tracking requiring consent |

---

## Rules on this register

1. **No item here is answered by inference, by reading the existing site, or by a plausible default.** The existing site is a documented source of the problem.
2. **An unanswered item produces a constrained asset or a deferred one — never an invented answer.**
3. **Items 1, 3, 4, 5 and 9 cannot be delegated to any Claude session.**
4. Answers should be recorded in the repository, not only in conversation, per Project Rule 2.
