# Link-Routing Owner Review — MappedSkills

**Status:** OWNER REVIEW IN PROGRESS — global navigation, `/`, `/about`, `/services`, `/how-it-works` and `/pricing`, `/work`, `/blog` (routing), `/contact` and `/schedule-call`, `/thank-you`, `/faq`, `/seo`, `/ai-seo`, `/google-ads`, `/social-media-ads`, `/conversion-optimization`, `/lead-generation`, `/problems/traffic-but-no-enquiries`, `/privacy-policy` and `/terms` decided — **routing review of all 20 core pages COMPLETE** (2026-09-19; entry-offer model HYBRID; SEO-002/SEO-003 closed KEEP NOINDEX; NAV-039 and SEO-007 held open; proof-copy conflict resolved as to fact, correction pending implementation); blog article review in progress — articles 1–6 owner-reviewed (article 3 approved for later unpublish; articles 4–5 kept with later repositioning; articles 6–8 routing complete, content/proof/capability reconciliation required) — **BLOG ARTICLE REVIEW 8 OF 8 COMPLETE**; blog-wide decisions recorded (blog owner-review layer complete except owner facts BLOG-009B and SEO-007); portfolio review in progress (page 1 owner-reviewed — remove from publication; page 2 owner-reviewed — keep client/page, proof reconciliation required; page 3 owner-reviewed — remove from publication; page 4 owner-reviewed — keep client/page, proof reconciliation required; page 5 owner-reviewed — keep client/page, proof reconciliation required; page 6 owner-reviewed — remove from publication; page 7 owner-reviewed — remove from publication; shared WORK template owner-reviewed; PORTFOLIO INDIVIDUAL-PAGE REVIEW — 7 OF 7 COMPLETE); final decision-register completeness audit presented (§10); final owner decisions recorded (§0.37); **routing freeze audit: FREEZE APPROVED (§11) — implementation not authorized**; implementation plan proposed (§12); **GATE R1 AUTHORIZED; repository portion executed and owner-accepted (§13, §15) — `R1 PARTIAL` — repository complete and verified; **Contentful corrections verified; retained-case-study incident diagnosed and 2 of 3 restored; AnybodyCanBake parent + child unpublished (§18, §19)**; not committed or deployed**; BLOG-007/008 mapping owner-approved, R2 not authorized (§15.2). · **Date:** 2026-09-19 · **Uncommitted.**

**Evidence base (authoritative, unchanged):** `SITE_LINK_AUDIT_2026-09-19.md` and `LINK_INVENTORY_2026-09-19.csv` in this folder (live crawl of production, 2026-09-19). No re-crawl was needed for this review. Nothing on the website, in Contentful or in application code has been changed.

> Every **Recommendation** below is a **WORKING HYPOTHESIS** prepared for the owner. It is **not** an approved decision. An **Owner decision** cell reads `PENDING` until the owner decides that row; decided rows name the owner and date. Owner decisions are recorded in this document only (see §0); they are **routing/IA decisions, not implemented**, and are not yet entered in `DECISION_LOG.md`.

## 0. Owner decision record

### 0.1 2026-09-19 — Homepage and global navigation (decided in chat by the owner)

| Scope | Decision as given | Recorded against |
|---|---|---|
| `/` | `/ KEEP-ALL` | PAGE-001 – PAGE-014 |
| Global navigation KEEP rows | Accept all KEEP recommendations unless overridden | NAV-001–005, NAV-008–010, NAV-012–015, NAV-018–025, NAV-027–038, NAV-040 |
| NAV-006 | KEEP — retain Social Media Ads in header Services menu | NAV-006 |
| NAV-007 | KEEP — retain Lead Generation in header Services menu | NAV-007 |
| NAV-011 | KEEP DESTINATION `/work`; CHANGE LABEL TO "Case Studies" — retain in header | NAV-011 |
| NAV-026 | KEEP DESTINATION `/work`; CHANGE LABEL TO "Case Studies" — standardise footer with header | NAV-026 |
| NAV-016 | ADD — AI Search → `/ai-seo` in header Services menu | NAV-016 |
| NAV-017 | ADD — About → `/about` in header navigation | NAV-017 |
| NAV-041 | ADD — AI Search → `/ai-seo` in footer Services column | NAV-041 |
| NAV-039 | VERIFY FIRST — no Facebook URL change until the official profile URL is confirmed | NAV-039 (**remains open**) |

**Status of these decisions:** routing/IA decisions only. **Not implemented** — no Header, Footer, application, Contentful or deployment change has been made. `ADD` is the owner's decision word for the three navigation gaps (no link exists today); it is recorded verbatim.

**Implementation notes for the later build task (facts, not new decisions):**
- NAV-011: the live header already reads "Case Studies" → `/work`, so it needs no change. NAV-026 is the only label change: footer "Work" → "Case Studies".
- NAV-026 reverses a documented earlier relabel. `components/layout/Footer.tsx` (Session 33 comment) changed "Case Studies" to "Work" on the grounds that `/work` had no case studies. The owner decision supersedes that rationale; the implementer should update or remove the comment with the label.
- NAV-011 / NAV-026 do not decide `/work` indexability. **SEO-001 remains open** (`/work` is `noindex` while its 7 case studies are indexable).
- WORK-002 (the portfolio breadcrumb "Case Studies" → `/work`) is not yet decided. It already matches the chosen label and comes up in §5.
- NAV-016 / NAV-017 / NAV-041 agree with the `DEC-010` navigation-architecture context cited in §1.

### 0.2 2026-09-19 — `/about` (decided in chat by the owner)

| Scope | Decision as given | Recorded against |
|---|---|---|
| `/about` | `/about KEEP-ALL` | PAGE-015, PAGE-016, PAGE-017, PAGE-018 — all KEEP |
| Case Studies link on `/about` | **Not to be added as part of this programme.** | Owner direction; see the note in §3.2 |
| NAV-039 | Remains **OPEN — VERIFY FIRST** | NAV-039 |

**Scope boundary (owner direction):** the Supabase / `Digibility-SEO-Module` work is outside this MappedSkills programme and is not part of this document.

### 0.3 2026-09-19 — `/services` (decided in chat by the owner)

| Scope | Decision as given | Recorded against |
|---|---|---|
| `/services` | `/services KEEP-ALL` | PAGE-019 – PAGE-030, all KEEP |
| Same-destination distinctions | **Retained as documented:** PAGE-021 → `/lead-generation` = qualified-enquiry definition; PAGE-028 → `/lead-generation` = service discovery; PAGE-022 → `/how-it-works` = attribution boundaries; PAGE-029 → `/how-it-works` = measurement methodology | PAGE-021, PAGE-022, PAGE-028, PAGE-029 |
| Measurement / Analytics service page | **Not to be proposed or created in this routing programme.** `/how-it-works` remains the appropriate existing destination for measurement unless a later owner decision explicitly changes the service architecture. | Owner direction |
| Global navigation | All previously approved decisions unchanged; **NAV-039 remains OPEN — VERIFY FIRST** | §0.1 |

**Review-scope rule (owner direction):** this phase audits and approves the *existing* routing architecture. No link is to be proposed merely because a page could theoretically benefit from it.

### 0.4 2026-09-19 — `/how-it-works` (decided in chat by the owner)

| Scope | Decision as given | Recorded against |
|---|---|---|
| `/how-it-works` | `/how-it-works KEEP-ALL` | PAGE-031, PAGE-032, both KEEP |
| Previously approved page and global decisions | Unchanged; **NAV-039 remains OPEN — VERIFY FIRST** | §0.1–§0.3 |

### 0.5 2026-09-19 — `/pricing` (decided in chat by the owner)

| Scope | Decision as given | Recorded against |
|---|---|---|
| PAGE-033 | KEEP DESTINATION `/contact`; CHANGE CTA LABEL → "Get a scoped estimate" | PAGE-033 |
| PAGE-034 – PAGE-038 | KEEP | PAGE-034, PAGE-035, PAGE-036, PAGE-037, PAGE-038 |
| `/pricing` routing | **Approved** | all `/pricing` rows |

**PAGE-033 is not a routing change.** `/contact` remains the approved destination; the approved future change is CTA wording only (label "Get an actual number" → "Get a scoped estimate"). **Not implemented.** Implementation note: the same label is also the closing section's eyebrow label on this page (`label="Get an actual number"`, not a link); the owner decision covers the CTA only.

**Proof-policy conflict (below): remains OPEN.** The owner has directed that it is not decided without evidence.

### 0.6 2026-09-19 — `/work` (OWNER FACTS and OWNER DECISIONS, supplied in chat)

**Owner facts — written client permission:**

| ID | Case study | Written client permission | Owner decision |
|---|---|---|---|
| PAGE-040 | Ameba Software (`/portfolio/seo-ameba-software`) | **YES** — confirmed by owner 2026-09-19 | KEEP |
| PAGE-042 | Home Decor Brand (`/portfolio/seo-for-home-decor-brand`) | **YES** — confirmed by owner 2026-09-19 | KEEP |
| PAGE-043 | AnybodyCanBake (`/portfolio/google-ads-for-online-courses`) | **YES** — confirmed by owner 2026-09-19 | KEEP |
| PAGE-039 | HealthFirst Clinics (`/portfolio/seo-healthfirst`) | **NO** — not held | REMOVE FROM PUBLIC CASE-STUDY SURFACES |
| PAGE-041 | EcoClean Pros (`/portfolio/local-seo-service-usa`) | **NO** — not held | REMOVE FROM PUBLIC CASE-STUDY SURFACES |
| PAGE-044 | The Fine Living Group (`/portfolio/google-ppc-for-real-estate`) | **NO** — not held | REMOVE FROM PUBLIC CASE-STUDY SURFACES |
| PAGE-045 | Utpala Designs (`/portfolio/google-ads-for-ecommerce`) | **NO** — not held | REMOVE FROM PUBLIC CASE-STUDY SURFACES |

*Extended 2026-09-19: **Vibgyor High — NO** written permission (§0.21).*

"Remove from public case-study surfaces" means these four should ultimately **cease to be publicly presented or indexed as client-result case studies**. They are **not** to be deleted, and nothing is implemented now.

**Other `/work` decisions:** PAGE-046 KEEP · PAGE-047 KEEP · **SEO-001 CHANGE** — `/work` should be indexable and included in the sitemap once the permission/content cleanup is implemented.

**Intended Case Studies architecture (owner-confirmed; confirms, does not reopen, NAV-011 and NAV-026):**
- `/work` remains the Case Studies hub;
- header label remains "Case Studies" (NAV-011);
- footer label becomes "Case Studies" (NAV-026);
- `/work` becomes indexable;
- `/work` enters (or remains in) the sitemap as appropriate;
- only permissioned case studies may remain publicly presented as client-result proof.

**Proof-copy conflict — established as to fact:**
- **Claim A** (`/pricing`: no portfolio of client results because permission is unavailable) — **stale/incorrect**; requires correction in implementation.
- **Claim B** (`/work`: no published case studies because permission is unavailable) — **stale/incorrect**; requires correction in implementation.
- **Claim C** ("Published — Work published with the client’s permission") — **valid only for the three owner-confirmed studies.** It must not apply generically to arbitrary Contentful entries.

**Implementation requirement (recorded for the later build phase, not implemented):** the public Case Studies section must contain only permissioned material. It must **not** assume that every Contentful `caseStudies` entry is permissioned. Today the `/work` list query and content model carry no permission field or filter (§3.6).

**Carried context, not a new decision:** `DEC-012` evidence requirements (`CLAIMS_AND_EVIDENCE_GOVERNANCE.md` §6) apply beyond permission alone — for example, a verified baseline and quotes verified in writing (PAGE-043 carries a client quote). Whether the three permissioned studies meet the rest of that threshold is a content check for the implementation phase; it was not assessed here. **Made an explicit owner requirement 2026-09-19 — see §0.7.**

**Scope:** owner facts and decisions for this review document only. No case study, Contentful entry, `/work`, `/pricing`, robots metadata, sitemap, Header/Footer, application code or `DECISION_LOG.md` has been changed.

### 0.7 2026-09-19 — `/blog` hub (decided in chat by the owner)

| Scope | Decision as given | Recorded against |
|---|---|---|
| `/blog` | `/blog KEEP-ALL` — **routing only** | PAGE-048 – PAGE-055, all KEEP |
| Card/article wording | **Not approved.** The observations on PAGE-048 (content-marketing service framing), PAGE-053 ("MappedSkills gets results.") and PAGE-054 ("Content Marketing" category; unevidenced outcome claims) are preserved for the individual article reviews (§4) | PAGE-048, PAGE-053, PAGE-054 |
| SEO-007 | **Remains OPEN.** There is not sufficient owner evidence that 16 July 2026 is the genuine original publication date of all eight articles. Dates are not to be changed. Contentful `firstPublishedAt` values that arose from migration, import or republication must **not** automatically be treated as original publication history; resolve later **from evidence, not inference** | SEO-007 |
| Global and prior page decisions | Unchanged; **NAV-039 remains OPEN** | §0.1–§0.6 |

**Carried requirement for the later implementation/content phase (owner direction, 2026-09-19):** the three owner-permissioned case studies (PAGE-040 Ameba Software, PAGE-042 Home Decor Brand, PAGE-043 AnybodyCanBake) must be validated against the **complete `DEC-012` evidence standard** (`CLAIMS_AND_EVIDENCE_GOVERNANCE.md` §6). Owner confirmation of publication permission does not by itself establish compliance with every requirement, **particularly client quotes and quantitative claims**.

### 0.8 2026-09-19 — `/contact` (decided in chat by the owner)

| Scope | Decision as given | Recorded against |
|---|---|---|
| `/contact` | `/contact KEEP-ALL` | PAGE-056, PAGE-057 — both KEEP |
| Verified form-flow fact (preserved; not modified, not retested) | `/contact` form → `POST /api/enquiry` → `/thank-you` on successful submission | §3.8 |

**Observations only — NOT approved changes. No change is to be proposed or implemented for either during this routing programme:**
1. `/contact`'s Direct Contact section is withheld pending owner content, while the globally approved footer already exposes `info@mappedskills.com` and two phone numbers.
2. A failed form submission keeps the visitor on `/contact` with retry messaging but no page-specific alternative contact route; footer contact details remain available.

**Unchanged:** all previous decisions and open flags — **NAV-039 OPEN / VERIFY FIRST**, **SEO-007 OPEN**, and the case-study `DEC-012` evidence-standard follow-up for the implementation phase (§0.7).

### 0.9 2026-09-19 — `/schedule-call` and booking terminology (decided in chat by the owner)

| Scope | Decision as given | Recorded against |
|---|---|---|
| PAGE-058 | **CHANGE BOOKING DESTINATION → `https://calendly.com/mappedskills/client-discovery`** — the canonical direct Calendly event URL for "Client Discovery Call" (30 minutes). The generic profile `https://calendly.com/mappedskills` works, but the intended architecture routes booking CTAs directly to the single approved booking event, without an extra selection step | PAGE-058 |
| PAGE-059, PAGE-060 | KEEP | PAGE-059, PAGE-060 |

**Replacement URL verified read-only before recording (2026-09-19).** Calendly's public booking data, observed by loading the pages only (no click, no date/time selection, no booking, no analytics on mappedskills.com):
- profile `mappedskills` = "MappedSkills Marketing"; its event-type list returns **exactly one** event: "Client Discovery Call", slug `client-discovery`, UUID `c159ba97-673a-47ce-85b4-f82625acf29c`;
- `https://calendly.com/mappedskills/client-discovery` resolves to the **same UUID**, profile `mappedskills`, **duration 30**, kind `solo`.

The canonical URL is recorded **without** the `?month=…` parameter Calendly appends on load.

**Booking terminology (owner decisions):**
- Canonical meeting/event name: **Client Discovery Call**.
- Canonical duration: **30 minutes**.
- Contextual CTA labels such as "Book a call" and "Book a time to talk" **may remain**; they do not need to be renamed to "Client Discovery Call".
- **"Growth Diagnosis" is NOT an approved booking/event name.** It is to be removed or replaced wherever it appears in the later implementation/content-cleanup phase (known: `/blog/seo-company-in-pune`, BLOG-062 / BLOG-069).
- **Any "20-min" reference to this booking is incorrect**; the approved duration is 30 minutes (known: BLOG-062).
- "Strategy Calls" on the legal pages is **not** resolved here; carried to the `/privacy-policy` and `/terms` reviews.

**Calendly copy — later implementation requirement, not a routing change:** the public Calendly event and profile copy must be reviewed and aligned with current MappedSkills positioning. Legacy language flagged: "bespoke performance marketing"; "drive results"; "analyze your digital presence"; "tailor strategies"; "actionable insights". **Not rewritten during this audit; Calendly not edited.**

**`BOOKING COMPLETION DESTINATION — UNVERIFIED / NO CHANGE APPROVED`.** The audit made no booking and does not establish whether Calendly has a configured post-booking redirect. No post-booking MappedSkills redirect is created or inferred. No confirmation page, webhook or redirect is to be added in this programme unless separately approved later.

**Unchanged:** NAV-039 OPEN · SEO-007 OPEN · all earlier decisions.

**Implementation note (fact, not a decision):** the `/schedule-call` link reads `process.env.NEXT_PUBLIC_CALENDLY_URL` with `https://calendly.com/mappedskills` as fallback. Whether production sets that variable is not established here, because the rendered value equals the fallback. The later implementer should change the configured value and/or the fallback accordingly.

### 0.10 2026-09-19 — `/thank-you` (decided in chat by the owner)

| Scope | Decision as given | Recorded against |
|---|---|---|
| PAGE-061 | KEEP — PAGE-061 → `/how-it-works` remains the approved informational link after submission | PAGE-061 |
| SEO-004 | KEEP — `/thank-you` remains `noindex` and excluded from the sitemap | SEO-004 |

**Owner directions:**
- `/thank-you` remains a **transactional confirmation page, not a search landing page**.
- **No ordinary navigation link** to `/thank-you` is to be introduced in this programme.
- **No post-submission secondary conversion CTA** is to be introduced in this routing review.

**Conversion rule (preserved):** `lead_form_submitted` must occur **only after successful durable enquiry persistence** (`DEC-021`). A direct `/thank-you` visit, a refresh, back-navigation, a page view or an ordinary link click must **not** constitute `lead_form_submitted`.

**Out of scope:** GTM/GA4 configuration is outside this page-routing decision and was not investigated.

**Unchanged:** NAV-039 OPEN · SEO-007 OPEN · all earlier decisions and carried requirements.

### 0.11 2026-09-19 — `/faq` (decided in chat by the owner)

| Scope | Decision as given | Recorded against |
|---|---|---|
| `/faq` | `/faq KEEP-ALL` | PAGE-062, PAGE-063, PAGE-065 – PAGE-069 KEEP; **PAGE-064 KEEP (routing only)** — destination `/lead-generation` is correct |
| FAQ structured data | **FAQ schema — KEEP.** The omission of the trailing link sentences/URLs from four structured-data answers is **not** a material visible/schema discrepancy | `FAQPage` JSON-LD on `/faq` |

**`QUALIFICATION CAPABILITY CLAIM — CHANGE REQUIRED LATER`** (content/capability flag, separate from routing)

Statement: "The system decides, automatically, at the moment the enquiry arrives, against five checks." (`/faq`, PAGE-064's answer; `/lead-generation` carries equivalent wording: "Checked automatically at the moment it arrives.")

Current repository evidence does not support that capability:
- qualification is **not persisted** as an evaluated verdict;
- the duplicate-enquiry condition is **deliberately unresolved**;
- the implementation **explicitly avoids fabricating** a qualified/unqualified verdict (`db/migrations/001_create_enquiries.sql`);
- analytics currently reports **`qualification_status: 'not_evaluated'`**.

**This is NOT approval to build automated qualification.** The later implementation should make `/faq` and `/lead-generation` accurately describe the capability that actually exists, **unless** the owner separately approves implementing an automated qualification system. **The sentence is not rewritten now.**

**Expansion (2026-09-19, `/lead-generation` review; owner direction; same flag, not a competing one).** `/lead-generation` contains **multiple** unsupported current-capability statements, not only the automatic-check sentence:
- "Checked automatically at the moment it arrives." (section heading);
- the five conditions presented as an operating counting mechanism ("An enquiry counts when all of the following are true.");
- "CHECKED WHEN IT ARRIVES" (`ChainTerminus` figure);
- claims that non-counting enquiries are "reported separately";
- "quality is reported next to volume";
- "the reporting separates qualified from total";
- accountability expressed as extending to the qualified-enquiry number ("We are accountable up to the qualified enquiry.");
- the meta-description claim that the definition is "the number we report".

**SUPPORTED TODAY:** enquiries are persisted · name, email, company and message are captured · email format is validated · basic spam/abuse signals produce a `clean`/`suspect` flag · attribution fields can be stored for website-form enquiries · accidental/double-submit idempotency exists · MappedSkills does not currently score enquiries.

**NOT SUPPORTED TODAY:** automatic evaluation of all five qualification conditions · a qualified/not-qualified verdict · qualified-enquiry counts · qualified-versus-total reporting · same-person/open-enquiry duplicate qualification · automatic classification of job/course/vendor/student/non-service enquiries · verification that an email address can actually receive mail · automatic verification of genuine business context · a "problem selected" form field · automated client-fit/value/timing/authority qualification.

**Not to be solved by building qualification software.** For the later content implementation, the five-condition framework may be preserved **as a methodological definition** if appropriate, but the website must accurately distinguish: information automatically captured · screening signals · human review · later sales/client qualification · actual reporting capability.

**Unchanged and carried:** NAV-039 OPEN / VERIFY FIRST · SEO-007 OPEN · case-study `DEC-012` evidence validation (§0.7) · Calendly copy cleanup (§0.9) · booking completion destination unverified (§0.9) · all earlier decisions.

### 0.12 2026-09-19 — `/seo` (decided in chat by the owner)

| Scope | Decision as given | Recorded against |
|---|---|---|
| `/seo` | `/seo KEEP-ALL` | PAGE-070 – PAGE-078, all KEEP |

**Observations only — NO change approved in this routing programme:**
1. The MappedSkills own-site AI-visibility evidence used around PAGE-075 is supported, but its placement inside the enquiry-measurement argument ("How you will know whether it worked") **may be reviewed later**, because it demonstrates AI visibility rather than enquiry measurement.
2. The `/seo` title's "Enterprise SEO" positioning is an approved search target under the existing architecture (`SEARCH_ARCHITECTURE.md` P2, `DEC-010`), while the current ICP treats enterprises with mature in-house teams/formal procurement as out of scope because of the present proof deficit. **This positioning question is not resolved in this link-routing review.**

**Unchanged:** all previous decisions and open flags.

### 0.13 2026-09-19 — `/ai-seo` (decided in chat by the owner)

| Scope | Decision as given | Recorded against |
|---|---|---|
| `/ai-seo` | `/ai-seo KEEP-ALL` — **routing approval** | PAGE-079 – PAGE-084, all KEEP |

**Content/capability flags preserved for later resolution (not routing; nothing rewritten now):**

1. **`AI SEARCH GROWTH CLAIM — EVIDENCE REQUIRED OR WORDING CHANGE`.** Current wording: "Discovery through AI assistants is real and it is growing." The repository evidence reviewed does not establish the *growth* part. It is **not** to be treated as verified merely because the rest of the AI-visibility evidence is verified.
2. **`MULTI-SYSTEM CLIENT MEASUREMENT — DELIVERY CAPABILITY TO VALIDATE`.** The page describes measurement per AI system. Current evidence establishes only that MappedSkills performed a multi-system baseline **on its own site, once**. It does **not** establish an operational client-monitoring product, automated or continuous monitoring, recurring tooling, or approved pricing. **This flag is NOT approval to build monitoring software.** During implementation/content review, either establish the actual repeatable delivery process and commercial model, **or** make the page describe only the measurement capability MappedSkills can genuinely deliver.
3. **`FREE CHECKER CLAIM — VERIFY OR CHANGE`.** The claim that Ahrefs/Semrush provide the relevant checker "for free" / "for nothing" is not established by the repository evidence reviewed (the repository records the Semrush AI Visibility Toolkit at "$99/mo per domain billed annually"). Preserved for verification before implementation. **Not verified on the web during this routing review.**
4. **`AI CONTROL WORDING — REVIEW LATER`.** H1: "AI search: why your business is not in the answer, and what actually moves it." The page otherwise correctly refuses guarantees of appearances, citations, recommendations or positions. The concern is specifically that "what actually moves it" may express stronger causal certainty than the recorded evidence establishes (the baseline labels the directory/listing mechanism an INFERENCE). **The H1 is not rewritten now.**

**Also preserved:**
- AI-search terminology is materially consistent.
- **"AI Search"** remains the approved visible service/navigation label.
- **`/ai-seo`** remains the approved route.
- No external AI-platform links need to be added merely because platforms are mentioned.

**Unchanged:** every earlier owner decision and open flag.

### 0.14 2026-09-19 — `/google-ads` and the Google Ads management fee (decided in chat by the owner)

| Scope | Decision / fact as given | Recorded against |
|---|---|---|
| `/google-ads` | `/google-ads KEEP-ALL` | PAGE-085 – PAGE-091 KEEP; **PAGE-092 KEEP (routing only)** |
| **OWNER FACT — Google Ads management fee** | **"Google Ads management is charged as a custom quoted fee."** No fixed percentage-of-ad-spend pricing model has been supplied by the owner | `/google-ads` Move 5 placeholder |

**Owner-input placeholder resolved.** `[OWNER INPUT REQUIRED — how the management fee is separated from ad spend, and whether spend is billed through MappedSkills or paid directly to Google]` (`copy/google-ads.md` Move 5) is resolved to the extent of the owner fact: **the management fee is a custom quoted fee.** The existing approved principle — "The fee is never expressed as a percentage of spend in a way that rewards spending more." — is **consistent** with the owner's confirmed commercial model.

**Only the stated fact is confirmed.** No fixed monthly amount, spend band, percentage, minimum ad spend, management tier, contract length, setup fee or any other pricing mechanic is recorded or to be inferred. *Not confirmed by this fact, and not inferred:* whether ad spend is billed through MappedSkills or paid directly to Google (the second half of the original placeholder).

**Capability flags preserved — routing approval does NOT establish these statements as capabilities:**

**`GOOGLE ADS SERVER-SIDE CONVERSION CLAIM — CHANGE REQUIRED LATER`.** Current wording: "Conversions recorded server-side against the enquiry itself." Repository evidence does not establish Google Ads server-side/offline conversion reporting:
- `gclid`, `wbraid` and `gbraid` are deliberately not retained (`lib/attribution.ts`);
- offline conversion import is therefore not currently supported by stored enquiry data;
- vendor/implementation decisions remain unresolved (`EVENT_TAXONOMY.md` §6);
- consent implications remain unresolved (`ad_user_data` denied; consent-gating of server-side conversions awaits legal review).

**This is NOT approval to implement Google Ads offline/server-side conversion import.** During implementation/content cleanup, either the capability is separately designed and approved, **or** the page describes only what the system genuinely records today.

**`QUALIFIED ENQUIRIES BY CAMPAIGN — CHANGE REQUIRED LATER`** — carried under **`QUALIFICATION CAPABILITY CLAIM — CHANGE REQUIRED LATER`** (§0.11). The claim to report qualified enquiries by campaign depends on a qualification verdict the current system does not produce. **Automated qualification is not to be built merely to preserve the sentence.** The **supported** campaign-attribution capability (source/medium/campaign and `utm_term` stored first-party on the enquiry) and the **unsupported** qualification capability remain distinguished.

**Not implemented / not to be touched:** `/google-ads` content, attribution storage, ad click-ID retention, offline conversion imports, consent handling, automated qualification, pricing UI/content, application code, `DECISION_LOG.md`.

**Unchanged:** every previous decision and open flag.

### 0.15 2026-09-19 — `/social-media-ads` (decided in chat by the owner)

| Scope | Decision as given | Recorded against |
|---|---|---|
| `/social-media-ads` | `/social-media-ads KEEP-ALL` | PAGE-093 – PAGE-099, all KEEP |

**`PAID SOCIAL SERVER-SIDE CONVERSION CLAIM — CHANGE REQUIRED LATER`**

**SUPPORTED** (repository evidence, §3.15):
- enquiries are persisted server-side;
- source/attribution data is stored with the enquiry;
- a landing URL containing `fbclid` can classify the enquiry source as Facebook / paid social;
- MappedSkills can therefore report paid-social-attributed enquiries from its own first-party records, subject to the documented attribution limitations.

**NOT ESTABLISHED:**
- sending completed conversions back to Meta;
- Meta Conversions API;
- offline conversion import;
- Meta Pixel-based conversion measurement;
- remarketing/custom-audience measurement;
- ad-platform optimisation based on those conversion events.

The existing wording "recorded server-side against the enquiry itself" must later be reviewed so it cannot reasonably be read as claiming Meta-side server-to-server conversion reporting. The later content should accurately describe the first-party measurement capability that actually exists, unless the additional capabilities are separately approved.

**This is NOT approval to:** activate the Meta Pixel; implement the Conversions API; retain Meta click IDs; implement offline conversion imports; change consent handling.

**Organic-social architecture fact (evidence for the pending `/social-media-management` broken-link decisions):** `/social-media-ads` explicitly states that MappedSkills does **NOT** provide social media management, content calendars, community management or brand-building campaigns.
- **Do NOT later redirect `/social-media-management` to `/social-media-ads`** merely to eliminate a 404. Paid social advertising and organic social-media management are materially different services under the current architecture.
- **BLOG-020 and BLOG-039 remain PENDING** until their individual article reviews determine whether those links should be removed, rewritten, or routed somewhere genuinely appropriate. *(Reconciled 2026-09-20: both since decided **REMOVE LINK** by the owner — see §9.)*
- **No `/social-media-management` service page** is to be created unless the owner separately decides that MappedSkills actually offers that service.

**Unchanged:** every previous decision and open flag.

### 0.16 2026-09-19 — `/conversion-optimization` (decided in chat by the owner)

| Scope | Decision as given | Recorded against |
|---|---|---|
| `/conversion-optimization` | `/conversion-optimization KEEP-ALL` | PAGE-100 – PAGE-106, all KEEP |

**Observations preserved for later content/service-operational review — NO implementation approved now:**

**`CRO TESTING DELIVERY — VALIDATE LATER`.** The page's conditional A/B-testing architecture is consistent with the approved service architecture (`SERVICE_ARCHITECTURE.md`):
- below the relevant traffic threshold: research, diagnosis, change and subsequent observation;
- where sufficient traffic exists: a real test with significance reported.

Current programme evidence does **not** establish a testing vendor/tool, the statistical-significance procedure, or a numerical traffic/sample threshold. **None of these is to be invented. This is NOT approval to add testing software.**

**`CRO ANALYTICS-HISTORY WORDING — WILL REQUIRE UPDATE`.** Current statement: "We have no analytics history yet". It reflected the state when written. Production analytics began operating on **2026-09-18**, so the statement is time-sensitive and will become inaccurate. **Later content-cleanup item; not rewritten during this routing review.**

**CRO architecture observation (positioning nuance, not a routing defect):**
- the page body describes conversion optimisation as part of the overall system rather than a separate outcome;
- navigation and metadata also expose "Conversion Optimization" as an individually discoverable service.

**Unchanged:** every earlier decision and open flag.

### 0.17 2026-09-19 — `/lead-generation` (decided in chat by the owner)

| Scope | Decision as given | Recorded against |
|---|---|---|
| `/lead-generation` | `/lead-generation KEEP-ALL` — routing | PAGE-107 – PAGE-110, PAGE-112 – PAGE-115 KEEP; **PAGE-111 KEEP (routing only)** |
| Qualification capability | **Existing flag expanded, not duplicated** — see §0.11 "Expansion" | §0.11 |

**`NON-FORM ENQUIRY REPORTING — PROCESS NOT ESTABLISHED`.** The repository supports attribution/reporting for website-form enquiries. It does **not** establish how phone or recommendation/referral enquiries enter the enquiry record (the only write path is `POST /api/enquiry`). Claims that such enquiries are counted/reported as unattributed (`/lead-generation`; also the attribution notes on `/how-it-works` and `/faq`) therefore require either an established manual operational process, **or** later wording correction. **Not approval to build new software.**

**Form-label observation (later content/form review; form not changed):** the form label says "Work email", while the qualification definition explicitly permits Gmail and the form accepts any valid email address.

**`SHARED NAV COPY — REVIEW LATER`** (NAV **routing** decisions are not reopened; their destinations remain approved). Later copy cleanup must review these desktop Services-dropdown descriptions (`components/layout/Header.tsx`; not shown in the mobile menu):
1. **Lead Generation** — "Build a qualified enquiry pipeline." Depends on the unresolved qualification capability.
2. **Social Media Ads** — "Facebook and Instagram ads for leads, sales, and retargeting." Retargeting is not established under the current paid-social implementation; the Meta Pixel is inactive (§0.15). *Resolution carried from BLOG-099 (2026-09-19): retargeting and related audience/pixel capabilities are NOT established; later copy narrows or removes them to match actual delivery capability. Not approval to build them; any future offering is a separate capability/product decision (§0.28).*
3. **Google Ads** — "High-intent campaigns that drive leads and sales." Stronger outcome language than `/google-ads` itself is willing to promise (§3.14).

**Unchanged:** every earlier decision and open flag.

### 0.18 2026-09-19 — Diagnostic entry-offer model and `/problems/traffic-but-no-enquiries` (decided in chat by the owner)

**OWNER DECISION — Diagnostic entry-offer model: `HYBRID`.** Resolves `[DECISION REQUIRED — entry-offer model: free / paid / hybrid]` (`copy/problems-traffic-but-no-enquiries.md`; the same placeholder in `copy/pricing.md`).

Approved commercial interpretation:
- the **self-serve diagnostic** published on `/problems/traffic-but-no-enquiries` remains **completely free**;
- visitors can run the published checks themselves **without payment, signup, email capture or gating**;
- an **initial conversation/diagnostic discussion** with MappedSkills **may be free**;
- **deeper analysis** performed by MappedSkills using the client's site/data, with findings and interpretation written down, is a **PAID** piece of work;
- that deeper engagement is **custom quoted**.

**Not invented / not decided:** a fixed audit price · a minimum price · a package name · a fixed deliverable count · turnaround time · a fixed number of checks beyond what the methodology defines · a mandatory sales call · crediting the diagnostic fee against later work · any guarantee that the client proceeds to a larger engagement.

**`/pricing` reconciliation (decision-record level only; `/pricing` NOT edited):** the `/pricing` source's uncertainty ("whether a smaller entry engagement exists, and what it costs, is undecided and MUST NOT BE IMPLIED") is reconciled as follows: **a smaller paid entry engagement DOES exist conceptually** — deeper site/data diagnosis with written findings, **custom quoted**. The earlier "free" block (`not-found.tsx`, Footer, blog/portfolio templates: "no candidate may say free until it is recorded") now has a recorded answer for the diagnostic specifically: the self-serve checks are free, the initial conversation *may* be free, the deeper engagement is paid. How wording reflects this is a later content task.

| Scope | Decision as given | Recorded against |
|---|---|---|
| `/problems/traffic-but-no-enquiries` | `/problems/traffic-but-no-enquiries KEEP-ALL` | PAGE-116 – PAGE-119, PAGE-121 KEEP; **PAGE-120 KEEP (routing)** |

**Architecture preserved:** static · ungated · scoreless · no stored answers · no automated recommendation · no personalised diagnosis · full diagnostic visible before any CTA.

**Later content observations (copy not changed now):**
1. "the homepage is rarely where the loss is", "the fastest to fix", "usually in a day" are presented without supporting programme evidence.
2. Cross-page wording discrepancy, not resolved in routing review: `/problems/…` — "three of the four" are not solved by redesigning the page; `/conversion-optimization` — "Two of the four" are not the page.
3. `/how-it-works` — "The website can check that an enquiry is real, reachable and in context." remains under the existing **`QUALIFICATION CAPABILITY CLAIM — CHANGE REQUIRED LATER`** (no new flag).

**Unchanged:** every previous decision and open flag.

### 0.19 2026-09-19 — `/privacy-policy` (decided in chat by the owner)

| Scope | Decision as given | Recorded against |
|---|---|---|
| `/privacy-policy` | `/privacy-policy KEEP-ALL` | PAGE-122 – PAGE-127, all KEEP |
| SEO-002 | **Recommendation recorded — `SEO-002 — RECOMMEND KEEP NOINDEX`. NOT owner-approved.** Reason: the privacy policy remains publicly accessible; footer discovery remains available; it is primarily a legal/informational document rather than an organic-search landing page; sitemap inclusion is therefore not required for the current site architecture | SEO-002 (remained PENDING at this step; **closed KEEP NOINDEX in §0.20**) |

**`PRIVACY POLICY — FACTUAL RECONCILIATION + QUALIFIED LEGAL REVIEW REQUIRED`** (one consolidated later-work flag; evidence in §3.19)

*Material implementation mismatches:*
- nonexistent "Service interest" and "Marketing budget range" fields;
- nonexistent separate "audit request" form;
- nonexistent enquiry storage in a CRM, Google Sheets or an email-notification system;
- Meta Pixel inactive;
- Google Ads conversion tracking not implemented;
- Search Console / heatmaps not established as site tracking;
- only the established five analytics events exist (`page_view`, `lead_form_started`, `lead_form_validation_error`, `lead_form_submitted`, `meeting_started`);
- no advertising-measurement or retargeting cookies currently used;
- actual hosting is Hosting.com / A2 cPanel, not Vercel;
- stale pre-launch consent-banner note;
- outdated "strategy call" terminology;
- "Limited access to form submissions" is not established by repository evidence.

*Material implementation facts absent or insufficiently represented:*
- Contentful-hosted images can be requested directly by visitors' browsers;
- the actual hosting/database arrangement;
- the consent choice is kept in `localStorage`;
- first-touch attribution / analytics de-duplication state is kept in `sessionStorage`;
- GA4 cookies are set only after consent;
- source, medium, campaign, keyword, landing page and referrer are stored with website-form enquiries;
- ad click IDs are deliberately discarded;
- data location is not established.

*LEGAL REVIEW questions (no legal conclusion drawn):*
- marketing-email wording, particularly "if consented or contextually appropriate";
- retention/deletion periods;
- browser-storage disclosure requirements;
- privacy/legal treatment of rate limiting and spam screening;
- any jurisdiction-specific rights/disclosures.

*Automated-processing behaviour (factual; no legal characterisation):* rate-limited submissions can be rejected and not persisted · spam screening can mark an enquiry `suspect`, but it remains stored for human review · exact double-submits can be de-duplicated · there is no qualified/not-qualified verdict · there is no lead scoring · there is no approved automated qualification.

**`PRIVACY POLICY — INTERNAL DRAFTING NOTES EXPOSED PUBLICLY`.** The public policy currently exposes internal drafting/review notes (tracking-IDs note; consent-banner note; retention note; "Legal Review Note" on rights). To be addressed in the later legal-content reconciliation, **not now**.

**Booking terminology carried into later legal-content cleanup:** canonical event name **Client Discovery Call** · canonical duration **30 minutes** · "Strategy Call" is not canonical terminology · "Growth Diagnosis" is not approved terminology · 20-minute references are incorrect.

**Nothing removed, nothing rewritten, no website change.** Every earlier decision and open flag unchanged.

### 0.20 2026-09-19 — `/terms`, SEO-002, SEO-003 (decided in chat by the owner) · CORE-PAGE MILESTONE

| Scope | Decision as given | Recorded against |
|---|---|---|
| `/terms` | `/terms KEEP-ALL` | PAGE-128 – PAGE-133, all KEEP |
| **SEO-002** | **KEEP NOINDEX** — `/privacy-policy` remains publicly accessible; remains linked through the site architecture/footer; remains `noindex`; remains excluded from the sitemap. **Closes SEO-002** | SEO-002 |
| **SEO-003** | **KEEP NOINDEX** — `/terms` remains publicly accessible; remains linked through the site architecture/footer; remains `noindex`; remains excluded from the sitemap. **Closes SEO-003** | SEO-003 |

Neither SEO decision is implemented. Both match the current live state, so no change is required by them.

**`TERMS — FACTUAL RECONCILIATION + QUALIFIED LEGAL REVIEW REQUIRED`** (later reconciliation; evidence in §3.20):
- AI Search is omitted from the services description;
- "Tracking and reporting" and "Marketing strategy and audits" are described without corresponding standalone service architecture;
- LinkedIn Ads is referenced although no approved LinkedIn Ads service exists;
- Vercel is incorrectly named;
- "website pricing is indicative" does not reflect the current `/pricing` architecture, which publishes no figures;
- the pricing-factor list differs from `/pricing`;
- "Strategy Call" terminology conflicts with canonical **Client Discovery Call — 30 minutes**;
- the HYBRID diagnostic commercial model (§0.18) is not accurately described;
- public legal-review/drafting notes remain visible.

*Preserved for qualified legal review (not decided internally):* intellectual-property wording · confidentiality wording · limitation-of-liability wording · governing-law/jurisdiction wording. **Not rewritten during routing review.**

**`AD-SPEND BILLING ARRANGEMENT — OWNER FACT REQUIRED`** (KEEP OPEN).
*Established:* the Google Ads management fee is custom quoted (§0.14).
*Not established:* whether Google ad spend is always paid directly by the client · whether Meta ad spend is always paid directly by the client · whether MappedSkills ever invoices/rebills media spend.
The Terms wording that clients "usually" pay platforms directly therefore **remains unverified**. **No answer is inferred.**

**CORE-PAGE MILESTONE (2026-09-19):** routing review of **all 20 core visitor-facing pages is complete**. **This does NOT mean implementation is approved.** Every open content, capability and legal flag remains intact: NAV-039 · SEO-007 · §0.6/§0.7 case-study permission and `DEC-012` evidence validation · proof-copy correction · §0.9 booking terminology, Calendly copy and unverified booking completion · §0.11 qualification capability (expanded) · §0.13 AI-search flags · §0.14 Google Ads server-side conversion · §0.15 paid-social server-side conversion · §0.16 CRO flags · §0.17 non-form enquiry reporting, form label, shared-nav copy · §0.18 content observations · §0.19 privacy-policy flags · this section's terms and ad-spend flags.

**Next phase:** individual blog article review (§4), one article per pass.

### 0.21 2026-09-19 — Blog article 1 `/blog/content-marketing-services-in-pune` (OWNER-REVIEWED) and Vibgyor High permission fact

**OWNER FACT — Vibgyor High:** **NO written permission** to publicly identify the client or publish MappedSkills results/case-study material. The permission register (§0.6) is extended: **written permission NO** — HealthFirst Clinics, EcoClean Pros, The Fine Living Group, Utpala Designs, **Vibgyor High**; **YES** — Home Decor Brand, Ameba Software, AnybodyCanBake. Permission alone does not satisfy `DEC-012`.

| ID | Decision as given |
|---|---|
| BLOG-027 | **REMOVE** — "Read the full case study here" → `/portfolio/content-marketing-for-schools/` is removed in later implementation. Do NOT create the page; do NOT redirect to `/work`; do NOT expose Vibgyor through another case-study route |
| BLOG-078 | **REMOVE PUBLIC CLIENT/RESULT CLAIM** — remove the identifiable Vibgyor client-result claim ("boost enrollment inquiries by 35% within six months"); do not publish the 35% result attributed to Vibgyor; do not try to solve this by finding evidence for the number; do not create a Vibgyor case study |
| BLOG-014 | **CHANGE → `/blog/importance-of-content-writing`** |
| BLOG-015 | **CHANGE → `/lead-generation`** |
| BLOG-019 | **CHANGE → `/seo`** |
| BLOG-022 | **CHANGE → `/work`** |
| BLOG-024 | **CHANGE → `/blog/freelancing-in-india`** *(superseded 2026-09-19: reopened as DESTINATION REQUIRES RECONSIDERATION — §0.23)* |
| BLOG-020 | **REMOVE LINK** (`/social-media-management/`). Do NOT redirect to `/social-media-ads`; do NOT create `/social-media-management`. Surrounding wording handled under BLOG-081 |
| BLOG-018 | **REMOVE SERVICE LINK** ("videos" → `/video-editing-services/`). Video editing is not an approved service; no page to be created. Educational discussion of video is not prohibited |
| BLOG-021 | **REMOVE SERVICE LINK** ("email campaigns" → `/email-marketing-services/`). Email marketing is not an approved service; no page to be created. Educational discussion of email marketing is not prohibited |
| BLOG-017 | **CHANGE REQUIRED** — "content marketing agency" → `/content-marketing-services/` → `/blog`. `/blog` is not a Content Marketing service page and must not be used as one. No Content Marketing service page in this programme. Final destination/wording resolved during content implementation after the article's positioning is corrected |
| BLOG-081 | **CONTENT/SERVICE POSITIONING CHANGE REQUIRED** — the article may remain published as educational content but must NOT present MappedSkills as currently offering services outside the approved architecture. Later reconciliation distinguishes educational discussion from services actually sold. Specifically not presented as offered: organic social media management; content calendars / community management / brand-building social campaigns; email marketing; video editing. Content Marketing is not to be represented as a standalone MappedSkills service unless the owner separately approves it. **Not approval to unpublish; not approval to create service pages** |
| BLOG-079 | **Kept OPEN — EVIDENCE REQUIRED OR WORDING CHANGE** (Pune-specific 15% claim not supported by the linked India-level source) |
| BLOG-080 | **Kept OPEN — REVIEW** (unsourced market price ranges; not MappedSkills pricing) |

**Preserved for later content cleanup (not rewritten now):** "deliver maximum ROI" · "ensure optimal results" · "our approach delivered measurable results".

**Status:** article 1 routing/content review **OWNER-REVIEWED**. **No link is marked implemented.** Rows with no explicit owner decision in this pass (BLOG-013, BLOG-016, BLOG-023, BLOG-025, BLOG-026, BLOG-028; all recommended KEEP) remain `PENDING`. Blog-wide decisions **BLOG-006, BLOG-007, BLOG-008, BLOG-009, BLOG-010, BLOG-012**, and **SEO-005** and **SEO-007**, remain **OPEN**.

### 0.22 2026-09-19 — Blog article 1 completion and article 2 `/blog/building-an-email-list` (OWNER-REVIEWED for routing)

| ID | Decision as given |
|---|---|
| BLOG-013, BLOG-016, BLOG-023, BLOG-028 | **KEEP** |
| BLOG-025, BLOG-026 | **KEEP (routing only)**. **Not** approval of the Vibgyor client/result claim; the Vibgyor removal decisions (BLOG-027, BLOG-078, §0.21) remain authoritative |
| **Article 1** | **Owner review of all article-1 routing rows complete** |
| BLOG-029 | **KEEP** |
| **Article 2** | **No article-body routing changes required. OWNER-REVIEWED for routing** |
| BLOG-082 | **Kept OPEN — EVIDENCE REQUIRED OR WORDING CHANGE.** Affected claims: email marketing as one of the highest-ROI channels, surpassing social media; email marketing consistently having better conversion rates than many other forms of marketing. **Not researched or rewritten during the routing programme** |

**Also preserved for later content review:** "proven strategies" and "maximum engagement" (article 2).

**Service architecture:** discussing Email Marketing educationally does **not** establish Email Marketing as a MappedSkills service. **No Email Marketing service page is to be created.**

**SEO-007 (kept OPEN) — article 2, observable metadata only:** displayed publication date July 16, 2026 · displayed updated date September 18, 2026 · structured `datePublished` / `dateModified` correspond to those dates. Not stated: that September 18 is a substantive content update. Not assumed: that July 16 is the original historical publication date.

**Observation only:** the article recommends building an email list while the site's own newsletter component states no mailing list exists. Not a routing defect; **not approval to build a newsletter system.**

**Unchanged:** all blog-wide open decisions (BLOG-006, BLOG-007, BLOG-008, BLOG-009, BLOG-010, BLOG-012; SEO-005; SEO-007).

### 0.23 2026-09-19 — Blog article 3 `/blog/freelancing-in-india`: `OWNER-REVIEWED — ROUTING KEEP; ARTICLE APPROVED FOR LATER UNPUBLISH`

| ID | Decision as given |
|---|---|
| BLOG-030, BLOG-031, BLOG-032, BLOG-033 | **KEEP** — all article-3 link rows owner-reviewed |
| **BLOG-083** | **UNPUBLISH ARTICLE** (owner content/architecture decision) |
| BLOG-084, BLOG-085 | Preserved as **supporting observations under BLOG-083**; not substantiated, rewritten or marked independently remediated |
| **BLOG-024** (article 1) | **Reopened — DESTINATION REQUIRES RECONSIDERATION** (see below) |

**Reason for BLOG-083:** the article is fundamentally a career guide for freelancers rather than content serving MappedSkills' approved buyer/ICP and commercial architecture. It targets or discusses aspiring freelancers, students, homemakers, people leaving employment, and freelance career development. Aligning it would require substantial repurposing rather than a normal content correction. Additional supporting reasons: dated "2025 Guide" positioning; unverified first-person author/career claims; unsupported market assertions (BLOG-084); tax/legal guidance requiring qualified review (BLOG-085); poor semantic relationship with the site's commercial CTAs and related-service cards.

**Not now:** do **not** unpublish it during the routing-review programme; do **not** redirect it; do **not** delete the Contentful entry; do **not** rewrite it into another topic.

**Dependency — BLOG-024 reopened:** article 1's "freelance writer" link was approved (§0.21) as CHANGE → `/blog/freelancing-in-india`. That destination is now planned for unpublishing, so **that change is NOT to be implemented.** When article 1 is remediated, the link is either **removed** or pointed to **another semantically appropriate destination if one is independently approved**. No replacement is invented now.

**Other incoming links to the article (VERIFIED against the audit inventory):** only two exist — BLOG-024 (above) and the `/blog` hub card **PAGE-050** (KEEP routing). The hub list is data-driven from Contentful, so unpublishing the entry removes that card; the sitemap is likewise generated from Contentful. Noted for implementation planning.

**URL treatment when eventually unpublished (implementation planning; not implemented):** decide deliberately. **Do NOT automatically redirect** `/blog/freelancing-in-india` to `/blog`, `/services`, `/` or another unrelated article. Determine later whether a genuinely equivalent replacement exists. If none exists, use the technically appropriate removal response rather than an irrelevant redirect.

**Unchanged:** SEO-007 OPEN; blog-wide decisions BLOG-006, BLOG-007, BLOG-008, BLOG-009, BLOG-010, BLOG-012 and SEO-005 OPEN.

### 0.24 2026-09-19 — Blog article 4 `/blog/importance-of-content-writing`: `OWNER-REVIEWED — ROUTING KEEP; ARTICLE KEEP WITH LATER CONTENT REPOSITIONING`

| ID | Decision as given |
|---|---|
| BLOG-034 | **KEEP** — article 4 has no article-body routing defects |
| **BLOG-086** | **KEEP ARTICLE; CONTENT REPOSITIONING REQUIRED.** Do **NOT** unpublish. The article has a legitimate business-facing subject and remains in the content architecture |
| BLOG-087 | **Kept OPEN — EVIDENCE REQUIRED OR WORDING CHANGE** |

**Later content repositioning (BLOG-086) must address:** career-oriented sections about becoming a content writer · courses/training recommendations · freelancing-platform discussion · "financial stability" / career-opportunity framing · other material aimed primarily at prospective content writers rather than business buyers or marketing decision-makers · the closing "partnering with a content writing agency" framing, which can imply MappedSkills sells a standalone Content Writing/Content Marketing service.

MappedSkills does **NOT** currently have an approved standalone Content Writing or Content Marketing service, and **none is to be created** by this decision. The article may discuss content writing/content marketing educationally and explain its role within marketing/SEO where accurate.

**Dependencies:** because article 4 remains published, **BLOG-014 CHANGE → `/blog/importance-of-content-writing` remains APPROVED and is NOT reopened.** BLOG-043 (article 6) is evaluated normally when article 6 is reviewed.

**BLOG-087 assertions preserved for later reconciliation (not researched or rewritten):** demand for content writers "at an all-time high" · demand having "grown significantly" · content writing as "one of the most effective ways" to attract website visitors · "abundant opportunities" · "financial stability".

**Metadata/content observations (later cleanup; not routing failures):** the page title and H1 differ · three body H2 sections are absent from the table of contents.

**Unchanged:** SEO-005, SEO-007 and the applicable blog-wide decisions (BLOG-006, BLOG-007, BLOG-008, BLOG-009, BLOG-010, BLOG-012) remain OPEN.

### 0.25 2026-09-19 — Blog article 5 `/blog/performance-marketing-vs-digital-marketing`: `OWNER-REVIEWED — ROUTING KEEP; ARTICLE KEEP WITH LATER CONTENT REPOSITIONING`

| ID | Decision as given |
|---|---|
| BLOG-035 | **KEEP** — article 5 has no article-body routing defects |
| **BLOG-088** | **WORDING CHANGE REQUIRED** |
| **BLOG-089** | **KEEP ARTICLE; CONTENT REPOSITIONING REQUIRED.** Do **NOT** unpublish |
| **BLOG-009** (blog-wide) | **Expanded — AUTHOR IDENTITY / PROFILE / POSITIONING REVIEW REQUIRED** (remains OPEN) |

**BLOG-088 — claims/framing preserved for later reconciliation:** "guarantees that you get what you pay for" · "Higher ROI" · "often provides a better return on investment" · "You only pay when specific outcomes are achieved" · "best results" · "optimal results" · "minimal risk" · "ensuring high performance". The later rewrite must distinguish **(1)** how performance marketing is commonly described as a marketing concept, **(2)** how advertising platforms actually charge, and **(3)** MappedSkills' own commercial model. **Do NOT imply MappedSkills operates on pay-per-result pricing.** Established: the Google Ads management fee is **custom quoted** (§0.14); ad-spend billing remains **unconfirmed** (§0.20). **No** performance pricing, percentage-of-spend pricing, setup fee, minimum spend or other commercial model is to be invented.

**BLOG-089 — repositioning boundary:** the search/educational topic "performance marketing vs digital marketing" may remain. Allowed: discussing or defining performance marketing educationally; comparing it with digital marketing. **Not allowed:** positioning MappedSkills as a "performance marketing agency"; presenting performance marketing as MappedSkills' current core identity/value proposition. The accepted positioning remains **CAPTURE → CONVERT → MEASURE**, outcome **measurable qualified enquiries**. That strategy is **not** to be casually rewritten during the blog cleanup.

**BLOG-009 expansion (shared author template, all articles):** the fallback author bio (`app/(pages)/blog/[slug]/page.tsx`) describes Amit Gupta as "Performance Marketing Strategist" who contributes "performance marketing insights for MappedSkills". This reinforces the retired identity across blog articles. Later review must determine the correct author identity/bio, the correct LinkedIn destination (the current hard-coded `linkedin.com/in/amit-gupta` is unverified), and replacement positioning consistent with the approved strategy. **No new bio invented; the template is not changed now.**

**Observations for later content cleanup (not routing defects):** three H2 sections are absent from the table of contents · the "Affiliate Marketing vs. Digital Marketing" section does not fully deliver the comparison its heading promises.

**Unchanged:** SEO-005, SEO-007 and the other blog-wide decisions (BLOG-006, BLOG-007, BLOG-008, BLOG-010, BLOG-012) remain OPEN.

### 0.26 2026-09-19 — Blog article 6 `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers`: `OWNER-REVIEWED — ROUTING DECISIONS COMPLETE; CONTENT RECONCILIATION REQUIRED`

| Group | IDs | Decision as given |
|---|---|---|
| KEEP | BLOG-036, BLOG-040, BLOG-046, BLOG-047, BLOG-054, BLOG-055, BLOG-057, BLOG-058 | **KEEP** |
| CHANGE (canonical destination only) | BLOG-042 → `https://www.realtor.com/` · BLOG-043 → `/blog/importance-of-content-writing` · BLOG-048 → `/google-ads` · BLOG-049 → `/social-media-ads` · BLOG-050 → `/lead-generation` · BLOG-051 → `/seo` | **CHANGE**. Context/content concerns remain governed by BLOG-090/091/092 |
| REMOVE broken case-study links | BLOG-038, BLOG-041, BLOG-044 | **REMOVE.** No replacement case studies; no redirect to `/work`; no other client's case study. **BLOG-044 must NOT use `/portfolio/google-ppc-for-real-estate`** (The Fine Living Group — written permission NO) |
| REMOVE links to unapproved services | BLOG-039 (organic Social Media Management — REMOVE LINK) · BLOG-045 (Video Editing) · BLOG-052 (Web Design) · BLOG-053 (Email Marketing) · BLOG-060 (Marketing Automation) | **REMOVE (SERVICE) LINK.** **Marketing Automation is NOT approved as a MappedSkills service.** No missing service page is to be created to repair links. Educational discussion may remain where contextually useful and accurate |
| Content-marketing link | BLOG-037 | **CHANGE REQUIRED.** `/blog` is not a Content Marketing service page; no standalone Content Marketing page; resolve in later content reconciliation, consistently with BLOG-017 and BLOG-081 |
| Affiliate links | BLOG-056, BLOG-059 | **REMOVE AFFILIATE LINK.** Picky Assist URL carries a referral parameter (`?fpr=3offa`) with no established affiliate disclosure or sponsored-link treatment. Not a prohibition on mentioning CRM tools educationally; **not to be replaced with another affiliate link** |
| Claims | BLOG-090 | **WORDING CHANGE REQUIRED** — "MappedSkills gets results"; "Proven" in the title where unsupported; "unparalleled success"; "like never before"; "Maximum Impact"; "drive measurable results"; "unprecedented growth"; "a proven way"; similar unsupported performance/hype language. **No evidence is to be fabricated to preserve these claims** |
| Named companies | BLOG-091 | **EVIDENCE OR CONTEXT CHANGE REQUIRED** — claims about Zillow, Realtor.com, Redfin, CoStar, MagicBricks, 99acres, Godrej Properties, Lodha Group are not to be presented as fact without support. **Particularly fix the Redfin/CoStar passage** so links to MappedSkills' Google Ads and Social Media Ads pages cannot reasonably imply MappedSkills ran campaigns for those companies. No client relationship inferred or suggested without evidence and publication permission |
| Positioning | BLOG-092 | **CONTENT/SERVICE POSITIONING CHANGE REQUIRED** — educational discussion of channels/tactics allowed; must not imply MappedSkills sells services outside the approved architecture (SEO · AI Search · Google Ads · Social Media Ads · Conversion Optimization · Lead Generation). No pages created for Content Marketing, organic Social Media Management, Video Editing, Web Design, Email Marketing or Marketing Automation |

**Content-quality observations preserved:** H1/title mismatch · "7 strategies" framing versus the 22-section structure · **repeated anchor:** "lead generation strategies for real estate" is used repeatedly and linked to materially different destination types. Later editing should make anchor text describe the destination accurately rather than reuse one commercial phrase for unrelated case studies and the Lead Generation service page.

**Affiliate-link principle (established here):** referral/affiliate links without an approved disclosure/sponsored-link framework are not retained merely because they work technically.

**Unchanged:** BLOG-009, BLOG-012, SEO-005, SEO-007 and other unresolved blog-wide items (BLOG-006, BLOG-007, BLOG-008, BLOG-010) remain OPEN.

### 0.27 2026-09-19 — Blog article 7 `/blog/seo-company-in-pune`: `OWNER-REVIEWED — ROUTING DECISIONS COMPLETE; CONTENT/PROOF RECONCILIATION REQUIRED`

| Group | IDs | Decision as given |
|---|---|---|
| KEEP | BLOG-061, BLOG-070 | **KEEP** |
| CHANGE | BLOG-062 → `/schedule-call` · BLOG-063 → `/seo` · BLOG-065 → `/lead-generation` · BLOG-067 → `/portfolio/seo-ameba-software` · BLOG-068 → `/portfolio/seo-for-home-decor-brand` · BLOG-069 → `/schedule-call` | **CHANGE** |
| REMOVE (unpermissioned case studies) | BLOG-064 (EcoClean Pros), BLOG-066 (HealthFirst Clinics) | **REMOVE.** Both have **NO** written publication permission. No redirect to `/work`; no substitute case study. **Client references are not to be retained without hyperlinks if they still function as identifiable client proof**; surrounding wording reviewed in later content reconciliation |
| Public editorial note | BLOG-093 | **REMOVE WORDING** — the instruction "Results vary. If you want this page to convert better, add first-party proof like case study summaries, before/after examples, or reporting snapshots." must not remain public. The "Results vary" concept may be handled appropriately in final copy. **No fabricated proof, snapshots or results** are to be added to satisfy it |
| Timeline | BLOG-094 | **WORDING CHANGE REQUIRED** — the "3 to 6 months" claim conflicts with the approved framing (`/faq`: organic search "12 months and beyond"; `/seo`: "12-month-plus engine"). Later reconciliation aligns the article with the approved site-wide position. **No new SEO-results timeline is invented** |
| Booking terminology | BLOG-095 | **CHANGE TO CANONICAL BOOKING POSITIONING** — do **not** retain "Growth Diagnosis", "20-min" or "Free". Canonical identity **Client Discovery Call — 30 minutes**, routed through **`/schedule-call`**. HYBRID (§0.18) says an initial conversation **may** be free; that does **not** establish "Free" as a standing advertised promise, so the booking CTA is **not** advertised as "Free" unless the owner separately establishes that fact. "No prep. No pitch." may remain, subject to ordinary copy review (consistent with `/schedule-call`). Calendly configuration not edited |
| Claims | BLOG-096 | **EVIDENCE OR WORDING CHANGE REQUIRED** — review "Best SEO Company in Pune" (H1/title metadata; not an established factual superlative); claims that MappedSkills improves rankings, organic traffic and qualified leads; "Can you help recover from a Google penalty? Yes." (no penalty-recovery claim unless delivery capability is established); the incorrect "Content Marketing" category. **Preserve the article's no-ranking-guarantee position** |

**BLOG-067 / BLOG-068 scope:** Ameba Software and Home Decor Brand have written permission **YES**. Permission allows the public-client architecture to proceed but does **not** by itself satisfy `DEC-012`; their quotes, figures and result claims still require later evidence validation. **These routing decisions are not approval of every claim inside those case studies.** `DEC-012` validation remains OPEN for both (§0.7).

**Unchanged:** BLOG-009, BLOG-012, SEO-005, SEO-007 and other unresolved blog-wide decisions (BLOG-006, BLOG-007, BLOG-008, BLOG-010) remain OPEN.

### 0.28 2026-09-19 — Blog article 8 `/blog/facebook-advertising-agency-pune`: `OWNER-REVIEWED — ROUTING DECISIONS COMPLETE; CONTENT/CAPABILITY RECONCILIATION REQUIRED` · **BLOG ARTICLE REVIEW — 8 OF 8 COMPLETE**

| Group | IDs | Decision as given |
|---|---|---|
| KEEP | BLOG-071 | **KEEP** |
| CHANGE | BLOG-072 → `/social-media-ads` | **CHANGE** |
| REMOVE (permission UNKNOWN) | BLOG-073 OmSaiGroup · BLOG-074 GEMS Education · BLOG-075 Mohali Citi Center · BLOG-076 Advit Prints | **REMOVE.** Permission is **UNKNOWN and not inferred**. No case study created; no redirect to `/work`; no substitute client case study. Surrounding copy reviewed later so removing the links leaves no unsupported identifiable client-proof claims |
| REMOVE (no such evidence) | BLOG-077 AnybodyCanBake | **REMOVE.** Written permission YES, but **no established AnybodyCanBake Social Media Ads case study** exists. The existing Google Ads study is different evidence and is **not** substituted to repair the link |
| Public editorial note | BLOG-097 | **REMOVE WORDING** — the instruction beginning "We also recommend supporting this page over time with…". **No performance snapshots, case studies, proof or other evidence manufactured** to satisfy it |
| Booking copy | BLOG-098 | **CHANGE TO CANONICAL BOOKING POSITIONING** — both plain-text "Book a Growth Diagnosis. Free. No prep. No pitch." instances corrected later. Canonical **Client Discovery Call — 30 minutes**, destination **`/schedule-call`**. No "Growth Diagnosis"; "Free" not advertised as a standing booking promise; "No prep. No pitch." may remain subject to copy review. **Any intended booking CTA to become an actual functional link**, not button-like dead text |
| Capabilities | BLOG-099 | **CAPABILITY WORDING CHANGE REQUIRED** — website-visitor retargeting · lookalike audiences · customer-list audiences · Meta Pixel setup · event setup · retargeting engagers/viewers are **NOT established** by approved programme evidence; later reconciliation narrows/removes them to match established delivery capability |
| Wording/positioning | BLOG-100 | **WORDING / POSITIONING CHANGE REQUIRED** — review "Experts" (page title) · "turn ad spend into a more predictable growth channel" · "reduce wasted spend" · "improve lead quality" · demand-creation framing · engagement/awareness positioning · ROI/ROAS wording · "PPC" category. Final article aligns with approved paid-social capability language and proof discipline; **no invented performance evidence**; **preserve the statement rejecting guaranteed outcomes** |

**BLOG-099 is explicitly NOT approval to:** activate the Meta Pixel · implement Meta CAPI · retain Meta click IDs · build audience-sync systems · upload customer lists · create retargeting infrastructure · change consent architecture. If the owner later wants any of these established as actual services, that is a **separate capability/product decision**. **Carried into** the shared-navigation "retargeting" flag (§0.17, item 2).

**BLOG ARTICLE REVIEW — 8 OF 8 COMPLETE.** Article-specific routing rows awaiting an owner decision: **zero**, except the explicitly reopened dependency **BLOG-024 — DESTINATION REQUIRES RECONSIDERATION** (§0.23; `/blog/freelancing-in-india` approved for later unpublishing). No blog change is implemented. Portfolio review not started.

### 0.29 2026-09-19 — Blog-wide decisions, SEO-005, SEO-007, BLOG-024 · BLOG REVIEW MILESTONE

| ID | Decision as given |
|---|---|
| BLOG-001 | **KEEP** — breadcrumb Home → `/` |
| BLOG-002 | **KEEP** — breadcrumb Blog → `/blog`. When article 3 is later unpublished, its Contentful-generated hub card may disappear as part of that implementation |
| BLOG-003 | **KEEP** — "Tell us what you're trying to fix" → `/contact` |
| BLOG-004 | **KEEP** — LinkedIn share |
| BLOG-005 | **KEEP** — Facebook share |
| BLOG-006 | **CHANGE LABEL "Twitter" → "X"** — keep the existing working share behaviour unless implementation review reveals a reason to canonicalise the destination too. Label/platform-name cleanup, not a social-architecture change |
| BLOG-007, BLOG-008 | **CHANGE — per-article selection of genuinely related APPROVED services.** Not the Contentful category mapping; no universal Google Ads/SEO/Lead Generation set; the element is not required on every article and is **omitted** where no approved service is genuinely relevant. Only SEO · AI Search · Google Ads · Social Media Ads · Conversion Optimization · Lead Generation may be selected. Unused mapping copy with unsupported/unapproved wording is **not** exposed by repairing category mappings. Exact per-article selection deferred to implementation/content reconciliation |
| BLOG-009A | **KEEP AUTHOR NAME: Amit Gupta** — owner fact confirming the public byline identity. Does **not** independently validate every first-person autobiographical statement in legacy articles (those follow their article decisions) |
| BLOG-009B | **VERIFY OFFICIAL LINKEDIN URL BEFORE USE** — the hard-coded destination is not owner-confirmed; not assumed correct; no replacement invented. If still unverified at implementation, **remove/hide** the link rather than publish an unverified destination |
| BLOG-009C | **CHANGE AUTHOR ROLE/BIO** — remove the retired "Performance Marketing Strategist" positioning and the fallback bio during later content/template reconciliation. Replacement not written now; it must align with accepted positioning and actual author facts |
| BLOG-010 | **KEEP** — sidebar "Book a call" → `/schedule-call`; canonical Client Discovery Call — 30 minutes; "Want Us to Review This for Your Business?" to later copy review |
| BLOG-011 | **KEEP** — "Explore Services" → `/services` |
| BLOG-012 | **CHANGE — internal links same tab; external links new tab where appropriate, with safe rel attributes.** `target="_blank"` is not preserved on internal links. Applied later to whatever internal links survive all approved removals and changes; the current count of 38 is **not** an implementation requirement |
| SEO-005 | **KEEP CURRENT INDEX/FOLLOW BEHAVIOUR** — no explicit robots tag merely to express the default; eligible retained articles stay indexable and in the sitemap. Article 3 follows its separate unpublish decision. **CLOSED** |
| SEO-007 | **OPEN — ORIGINAL PUBLICATION DATES UNKNOWN.** `firstPublishedAt` = first publication in the current Contentful account, not historical publication; the 18 Sep timestamps are not automatically substantive updates; no fabricated dates. Later: (1) evidenced original dates if reliable evidence is recovered; (2) otherwise accurately labelled dates, or omit dates where necessary. Not resolved in routing review |
| BLOG-024 | **REMOVE LINK** — "freelance writer" in article 1 no longer points to `/blog/freelancing-in-india` (approved for unpublishing). No suitable replacement established; none invented; surrounding educational text kept only if still useful after content reconciliation |

**BLOG REVIEW MILESTONE — remaining blog items (from the register):**
1. **Owner decisions still genuinely required:** **none.** Every blog routing row (BLOG-001 – BLOG-100) now has an owner decision.
2. **Owner facts still required:** **BLOG-009B** (official LinkedIn URL) and **SEO-007** (original publication dates). These are the only remaining factual unknowns in the blog owner-review layer.
3. **Evidence/content flags intentionally deferred to later reconciliation** (decided as open, not awaiting approval): BLOG-079 (Pune 15% statistic), BLOG-080 (unsourced price ranges), BLOG-082 (email-marketing comparative claims), BLOG-087 (content-writing demand assertions); BLOG-084/BLOG-085 subsumed under the article-3 unpublish; **`DEC-012` evidence validation** of the Ameba Software and Home Decor Brand case studies linked by BLOG-067/BLOG-068 (§0.7, §0.27).
4. **Implementation approved but not executed:** all blog CHANGE / REMOVE / REMOVE LINK / REMOVE SERVICE LINK / REMOVE AFFILIATE LINK / REMOVE WORDING decisions; the content/positioning/wording reconciliations (BLOG-017, -037, -078, -081, -086, -088, -089, -090, -091, -092, -093, -094, -095, -096, -097, -098, -099, -100); the article-3 unpublish (BLOG-083) and its URL-treatment decision; BLOG-006 label; BLOG-007/008 per-article related services; BLOG-009C bio/role; BLOG-012 tab policy. **None implemented.**

### 0.30 2026-09-19 — Portfolio page 1 `/portfolio/seo-healthfirst`: `OWNER-REVIEWED — REMOVE FROM PUBLICATION; IMPLEMENTATION NOT AUTHORIZED`

**WORK-010 — REMOVE FROM PUBLICATION.** HealthFirst Clinics has **NO** written publication permission, so the case study is later removed from public MappedSkills case-study surfaces. Aligns with the already-approved **PAGE-039 REMOVE** and **BLOG-066 REMOVE**.

**Later implementation consequence (only when separately authorized):** remove the HealthFirst card from `/work` · remove the case study from public publication · remove it from the sitemap/indexable public architecture · remove remaining public internal links to it · ensure it is no longer presented as MappedSkills client proof. **Nothing implemented now.**

**URL handling — `URL TREATMENT — DECIDE DURING IMPLEMENTATION; NO IRRELEVANT REDIRECT`.** Do NOT automatically redirect `/portfolio/seo-healthfirst` to `/work`, `/services`, `/seo`, `/`, another client's case study, or any semantically unrelated destination; no genuinely equivalent replacement is established. **No specific HTTP removal status is prescribed** in this owner-review phase.

**Claims and evidence:** no further programme effort on validating the HealthFirst results, testimonial or client-specific claims; permission is NO, so they are not reused as MappedSkills public proof. **Audit finding preserved:** the page is internally inconsistent — 2.1 → 3.5 pages/session ≠ the stated +40% (+67%); 40 → 100 monthly leads ≠ the stated +50% (+150%). **Do NOT** correct those figures for republication · **do NOT** reuse the testimonial · **do NOT** anonymise the case study as a workaround during this programme · **do NOT** manufacture evidence.

**Shared template rows WORK-001 – WORK-004:** remain **PENDING**; reviewed once after all seven portfolio pages, not page-by-page.

### 0.31 2026-09-19 — Portfolio page 2 `/portfolio/seo-ameba-software`: `OWNER-REVIEWED — KEEP CLIENT/PAGE; PROOF RECONCILIATION REQUIRED; IMPLEMENTATION NOT AUTHORIZED`

**WORK-011 — KEEP CLIENT/PAGE; PROOF RECONCILIATION REQUIRED.** Ameba Software has written publication permission: it may remain publicly identified, the page may remain in the intended public Case Studies architecture, **PAGE-040 remains KEEP**, and **BLOG-067 may continue to target this case study**. Permission does **not** validate the current claims. The public case study must ultimately contain only facts and proof satisfying `DEC-012`, or owner-confirmed factual descriptions that need no quantitative substantiation. Do not unpublish merely because legacy proof is deficient; this is **not** approval of the existing copy.

**WORK-012 — REMOVE UNLESS DEC-012 EVIDENCE IS SUPPLIED.** Covers +200% organic traffic; 10,000 → 30,000 monthly visits; 30+ high-intent keywords; 18 keywords on page one; 12 → 30+ top-10 rankings; +150% inbound inquiries; 40 → 100 monthly inquiries; Domain Authority 30 → 42; and associated time-period/result claims. The issue is **evidence provenance, not arithmetic** — do not correct, reconcile or re-derive from the published page. The 40 → 100 and 30 → 42 duplication with the unpermissioned HealthFirst case study is a **material red flag**. No fabricated replacement numbers; no conversion of exact figures into vague claims ("significant growth") to preserve the implication.

**WORK-013 — WITHHOLD UNLESS WRITTEN QUOTE APPROVAL IS CONFIRMED.** Attribution "Gagan Deep, Partner, Ameba Software". Client-level permission does not establish permission to publish a named individual's testimonial verbatim. Until written approval of the quote as published and its attribution is established, later implementation removes/withholds the testimonial, the named-person attribution and the associated 5-star presentation. Do not invent Review schema; do not paraphrase into an unattributed testimonial.

**WORK-014 — CHANGE REQUIRED.** Correct/remove "TechWave Solutions", "Ameba Softwares", the "18 on page one" vs "30+ top-10" contradiction, and duplicated result presentation that adds no value. For the ranking contradiction, never choose the more favourable number — use only an evidenced figure; otherwise remove under WORK-012.

**Ameba scope:** the described SEO disciplines may remain conceptually (they fit the approved SEO service), but that does **not** establish that every listed tool or activity was used for Ameba. Later reconciliation distinguishes (a) approved MappedSkills capability, (b) owner-confirmed work actually performed for Ameba, (c) independently evidenced outcomes — none inferred from another.

**`DEC-012` remains OPEN for Ameba** until the surviving public proof is established. **Shared template rows WORK-001 – WORK-005 remain PENDING** for the final shared-template review. **Nothing implemented now.**

### 0.32 2026-09-19 — Portfolio page 3 `/portfolio/local-seo-service-usa`: `OWNER-REVIEWED — REMOVE FROM PUBLICATION; IMPLEMENTATION NOT AUTHORIZED`

**WORK-015 — REMOVE FROM PUBLICATION.** EcoClean Pros has **NO** written publication permission. Aligns with **PAGE-041 REMOVE** and **BLOG-064 REMOVE**.

**Later implementation consequence (only when separately authorized):** remove EcoClean Pros from `/work` · remove the case study from public publication · remove it from the sitemap/indexable public architecture · remove remaining public internal links to it · ensure it is no longer presented as MappedSkills client proof. **Nothing implemented now.**

**URL handling — `URL TREATMENT — DECIDE DURING IMPLEMENTATION; NO IRRELEVANT REDIRECT`** (same rule as WORK-010). Do NOT automatically redirect `/portfolio/local-seo-service-usa` to `/work`, `/services`, `/seo`, `/`, another client's case study, or another unrelated page. **No specific HTTP removal status is selected** in this owner-review phase.

**Claims and evidence:** no further programme effort on validating EcoClean-specific quantitative claims or the testimonial. Do NOT correct the bookings/leads discrepancy for republication; reuse its rankings, traffic or Google Business Profile figures; reuse its testimonial or star rating; anonymize the case study as a workaround; or manufacture replacement evidence. Audit findings (§5.4) preserved for traceability only.

**Service architecture:** Local SEO, Google Business Profile work and local citations may conceptually fall within the approved SEO service. The legacy heading "Content Marketing with a Local Focus" does **not** establish Content Marketing as a standalone approved MappedSkills service. **No service-architecture change is authorized.**

**Shared template rows WORK-001 – WORK-005:** remain **PENDING** until all seven portfolio pages are reviewed.

### 0.33 2026-09-19 — Portfolio page 4 `/portfolio/seo-for-home-decor-brand`: `OWNER-REVIEWED — KEEP CLIENT/PAGE; PROOF RECONCILIATION REQUIRED; IMPLEMENTATION NOT AUTHORIZED`

**WORK-016 — KEEP CLIENT/PAGE; PROOF RECONCILIATION REQUIRED.** Home Decor Brand has written publication permission. The existing public naming convention "**eCommerce Home Decor Brand**" may remain. Do **not** require disclosure of the underlying legal/business name as part of this programme, and do **not** infer that publication permission requires the client to be publicly named. The page may remain in the intended public Case Studies architecture: **PAGE-042 remains KEEP**; **BLOG-068 may target this canonical case-study URL**; the page may remain indexable subject to later proof/content reconciliation. Permission does **not** validate the current results, dates, testimonial, scope or attribution claims; owner-confirmed engagement facts and `DEC-012` evidence remain separate requirements.

**WORK-017 — REMOVE UNLESS DEC-012 EVIDENCE IS SUPPLIED.** Covers +85% organic traffic; 12,000 → 22,200 monthly organic visits; 20+ keyword claims; 12 keywords on page one; 8 → 20+ top-10 rankings; +50% organic sales; ₹4,00,000 → ₹6,00,000 monthly sales; attribution of those sales to organic traffic; −25% bounce rate; 58% → 43% "Conversion Rate"; and associated six-month/time-period claims. Do not correct, reinterpret or re-derive from the published page. In particular, do **not** relabel 58% → 43% as bounce rate because its change resembles the stated bounce-rate reduction — a possible explanation of a legacy error, **not evidence**. No vague performance claims preserving the same unsupported implication.

**WORK-018 — WITHHOLD UNLESS WRITTEN QUOTE APPROVAL IS CONFIRMED.** Attribution "Suyog, Marketing Head". Client-level permission does not establish permission to publish this individual's quote. Until written approval of the quote as published and its attribution: withhold/remove the testimonial, personal attribution and 5-star presentation. No invented Review schema; no paraphrase into anonymous proof.

**WORK-019 — CHANGE REQUIRED.** Later reconciliation addresses: the mislabelled or otherwise unsupported "Conversion Rate 58% → 43%" row; "12 on page one" vs "20+ top-10 rankings"; unsupported revenue attribution; "effectiveness of SEO in driving conversions"; "significantly expanding their reach"; "go-to brand"; any tool/link-building claim presented as work actually performed without factual support. Never choose the more favourable number; use evidenced information if later supplied, otherwise remove under WORK-017.

**Content Marketing heading:** may describe a supporting activity within an SEO engagement if it accurately reflects work performed; it must **not** imply standalone Content Marketing is an approved MappedSkills service. Resolved during later content reconciliation.

**Canonical URL dependency:** `/portfolio/seo-for-home-decor-brand` is the **canonical retained case-study destination**. BLOG-068 is already approved to change to this URL; the old `/portfolio/seo-for-home-decor` must **not** remain the intended internal destination. Link change **not implemented**.

**`DEC-012` remains OPEN for Home Decor Brand.** Shared template rows WORK-001 – WORK-005 remain **PENDING**. **Nothing implemented now.**

### 0.34 2026-09-19 — Portfolio page 5 `/portfolio/google-ads-for-online-courses`: `OWNER-REVIEWED — KEEP CLIENT/PAGE; PROOF RECONCILIATION REQUIRED; IMPLEMENTATION NOT AUTHORIZED`

**WORK-006 — KEEP.** "AnybodyCanBake" → `https://anybodycanbake.com/`: appropriate for the named client and currently works. External-link tab behaviour ultimately follows the shared **WORK-005** policy. No implementation now.

**WORK-007 — CHANGE → `/google-ads`.** Do not route through `/google-ads-service/`; the intended internal destination is the canonical approved service page `/google-ads`. Tab behaviour follows WORK-005 later. No implementation now.

**WORK-020 — KEEP CLIENT/PAGE; PROOF RECONCILIATION REQUIRED.** AnybodyCanBake has written publication permission: the client may remain publicly identified; **PAGE-043 remains KEEP**; this Google Ads case study may remain in the intended Case Studies architecture. Permission does **not** validate the April 2016 engagement facts, who performed the work, duration/scope, quantitative results, attribution, testimonial or exact legacy wording — all remain subject to owner facts and `DEC-012`. **Not a substitute destination for BLOG-077**, which remains **REMOVE** (it refers to a non-existent social-media-ads case study — a different engagement).

**WORK-021 — REMOVE UNLESS DEC-012 EVIDENCE IS SUPPLIED.** Includes "Course Enrollments: 500"; 200 → 500 enrollments; 1,000 → 3,000 visits/month; 2% → 5% conversion rate; ₹500 → ₹200 cost per acquisition; associated growth/result/time-period claims; ROI/result implications dependent on those figures. The current units/periods do not form a coherent measurement set: do not reconcile from the page, do not choose one interpretation and recalculate the others, do not manufacture a measurement period, and do not substitute vague claims preserving the same unsupported outcome. `DEC-012` evidence may come from appropriate reliable underlying records — **no single evidence source is prescribed**.

**WORK-022 — WITHHOLD UNLESS WRITTEN QUOTE APPROVAL IS CONFIRMED.** Attribution "Sonia Gupta, Founder". Client-level permission does not independently establish permission to publish this person's quote. Until written approval of the quote as published and its attribution: withhold/remove testimonial, personal attribution and 5-star presentation. No invented Review schema; no anonymization/paraphrase workaround.

**WORK-023 — CHANGE REQUIRED.** Later reconciliation must establish or correct: **client identity** — correct public spelling/capitalization ("AnyBodyCanBake" vs "AnybodyCanBake"), not guessed from the page; **engagement facts** — owner facts/evidence on whether MappedSkills performed the April 2016 work, engagement scope, engagement/result period, and attribution to "MappedSkills Marketing" (unsupported historical provider claims are not retained merely because published); **organic/paid framing** — reconcile the poor-organic-visibility challenge with a Google Ads case study; do not imply paid advertising resolved organic visibility unless evidenced; **result period** — not inferred (material to the conversion-rate inconsistency); **"Online Baking Academy"** — do **not** change automatically; first determine what it represents; keep it if an accurate descriptive category label; change only if incorrect, misleading or more specific than the evidence supports; **other wording** — reconcile/remove "substantial growth", "significantly boosted", ROI implications and other outcome language dependent on unsupported proof. "transformed our business" is testimonial text and follows WORK-022.

**`DEC-012` remains OPEN for AnybodyCanBake.** This permissioned Google Ads case study does **not** validate any other AnybodyCanBake engagement. Shared template rows WORK-001 – WORK-005 remain **PENDING**. **Nothing implemented now.**

### 0.35 2026-09-19 — Portfolio page 6 `/portfolio/google-ppc-for-real-estate`: `OWNER-REVIEWED — REMOVE FROM PUBLICATION; IMPLEMENTATION NOT AUTHORIZED`

**WORK-024 — REMOVE FROM PUBLICATION.** The Fine Living Group has **NO** written publication permission. Aligns with **PAGE-044 REMOVE** and **BLOG-044 REMOVE**.

**Later implementation consequence (only when separately authorized):** remove The Fine Living Group from `/work` · remove this case study from public publication · remove it from the sitemap/indexable public architecture · remove any remaining public internal links to it · ensure it is no longer presented as MappedSkills client proof. **Nothing implemented now.**

**BLOG-044:** the existing decision **REMOVE** is preserved. BLOG-044 points to a different, non-existent case-study URL; do **not** redirect or repoint it to `/portfolio/google-ppc-for-real-estate` merely because both relate to real estate — no approved relationship between those case studies exists.

**URL handling — `URL TREATMENT — DECIDE DURING IMPLEMENTATION; NO IRRELEVANT REDIRECT`** (same rule as HealthFirst WORK-010 and EcoClean WORK-015). Do NOT automatically redirect `/portfolio/google-ppc-for-real-estate` to `/work`, `/google-ads`, `/services`, `/`, another client's case study or another semantically adjacent page. **No final HTTP removal status selected** during owner review.

**Claims/evidence:** no further programme effort validating or rehabilitating "Monthly Leads Generated: 90+", 60 → 90+ monthly leads, $60 → $39 CPL, "Moderate → Significant (+60%)" traffic, 3.5% → 5.0% conversion rate, "exceptional results", "maximizing ROI", budget claims, the testimonial, the star rating or other Fine Living-specific performance claims. Do NOT correct the figures for republication, reuse them elsewhere, reuse or anonymize the testimonial, convert the case study into anonymous proof, or manufacture substitute evidence. Audit findings (§5.7) preserved for traceability only.

**Service architecture:** nothing on this legacy page establishes a new approved service; references to designing landing pages or engaging visuals do **not** establish Web Design as an approved standalone MappedSkills service. **No service-architecture change is authorized.**

**Shared template rows WORK-001 – WORK-005:** remain **PENDING**.

### 0.36 2026-09-19 — Portfolio page 7, shared case-study template and portfolio milestone: `PORTFOLIO INDIVIDUAL-PAGE REVIEW — 7 OF 7 COMPLETE`

**WORK-025 — REMOVE FROM PUBLICATION** (`/portfolio/google-ads-for-ecommerce`). Utpala Designs has **NO** written publication permission; aligns with **PAGE-045 REMOVE**. Later (only when separately authorized): remove Utpala Designs from `/work`; remove the case study from public publication; remove it from the sitemap/indexable public architecture; remove remaining public internal links; ensure it is no longer presented as MappedSkills client proof. **`URL TREATMENT — DECIDE DURING IMPLEMENTATION; NO IRRELEVANT REDIRECT`** — no automatic redirect to `/work`, `/google-ads`, `/services`, `/`, another case study or another adjacent page; no final HTTP removal status chosen. No rehabilitation, anonymization, reuse or correction of its proof.

**WORK-008 — SUPERSEDED BY WORK-025; NO SEPARATE IMPLEMENTATION.** Otherwise a valid external client link; no effort to retain or change it. **WORK-009 — SUPERSEDED BY WORK-025; NO SEPARATE IMPLEMENTATION.** Do not independently change it to `/google-ads`.

**Shared template:** **WORK-001 KEEP** (Home → `/`) · **WORK-002 KEEP** (Case Studies → `/work`; consistent with approved naming) · **WORK-003 KEEP** (Tell us what you're trying to fix → `/contact`) · **WORK-004 KEEP DESTINATION; COPY REVIEW LATER** (What we can and cannot show you → `/work`; wording reassessed only when `/work` content is reconciled; no other destination) · **WORK-005 CHANGE** — BLOG-012 policy: internal links same tab (e.g. `/google-ads`), external links new tab where appropriate with safe `rel` (e.g. AnybodyCanBake) · **WORK-026 CHANGE** — no automatic five stars; a rating only with a genuine, attributable rating source; when a testimonial is withheld under WORK-013/018/022, leave no stars, empty testimonial framing or implied review/rating proof; no manufactured Review schema; no rating inferred from positive wording · **WORK-027 ADD RELATED SERVICE LINK** — retained studies: Ameba Software → `/seo`; Home Decor Brand → `/seo`; AnybodyCanBake → `/google-ads`; a simple contextual internal link using the study's approved service relationship — no category-mapping engine, dynamic recommendation logic, filler services, unapproved services or new service pages; same tab (WORK-005); exact label decided during implementation.

**Final publication architecture — RETAIN:** (1) Ameba Software, (2) Home Decor Brand, (3) AnybodyCanBake — each: publication permission YES; `DEC-012` OPEN; proof reconciliation required. **REMOVE:** HealthFirst Clinics, EcoClean Pros, The Fine Living Group, Utpala Designs — all permission NO. **No live case study has UNKNOWN client-level publication permission.** Testimonial approval unconfirmed — Gagan Deep / Ameba Software; Suyog / Home Decor Brand; Sonia Gupta / AnybodyCanBake — withheld unless written quote approval is established. Deferred `DEC-012` evidence work is **not** an undecided owner decision.

**Breadcrumb structured data:** absence recorded only as **`LATER TECHNICAL SEO OPPORTUNITY — NOT AN APPROVED CHANGE IN THIS ROUTING PROGRAMME`**. Not implemented.

**Nothing implemented now.**

### 0.37 2026-09-20 — Final routing-owner decisions: 404 page, SEO-006, NAV-039

**PAGE-134 – PAGE-145 — `404 PAGE — KEEP-ALL`.** All twelve recovery-card destinations (`/services`, `/how-it-works`, `/problems/traffic-but-no-enquiries`, `/pricing`, `/faq`, `/about`, `/seo`, `/ai-seo`, `/google-ads`, `/social-media-ads`, `/lead-generation`, `/conversion-optimization`) are **OWNER-APPROVED — KEEP / NO IMPLEMENTATION**. Do not redesign the 404 page, add recovery cards or change their destinations during this programme.

**SEO-006 — CHANGE.** A genuine not-found response under `/portfolio/*` must not be presented as an indexable page: it renders **`noindex`**. This does **not** determine the final HTTP treatment of the four case studies approved for removal (404, 410 or another technically appropriate removal response) — that remains an implementation decision under **`URL TREATMENT — DECIDE DURING IMPLEMENTATION; NO IRRELEVANT REDIRECT`**. SEO-006 only establishes that the site's not-found experience for a portfolio URL must not invite indexing. Not implemented.

**NAV-039 — `VERIFY FIRST; REMOVE LINK IF OFFICIAL DESTINATION CANNOT BE VERIFIED`.** Supersedes the 2026-09-19 holding decision ("no URL change until confirmed"; earlier §0 references are historical). The current destination is not accepted merely because it redirects somewhere. Before implementation: (1) verify the official MappedSkills Facebook page; (2) if reliably established, use it; (3) if not, remove the footer Facebook link. No guessed URL; no unverified link retained to preserve the icon. With this approved fallback NAV-039 **no longer blocks the routing architecture**; the factual verification remains outstanding.

### ⚠ Cross-page proof-policy conflict (found during the `/pricing` review, 2026-09-19) — owner attention, NOT a routing decision

**VERIFIED FACT (live pages, single-page checks, 2026-09-19):**
- `/pricing` renders: "What we cannot offer you is a portfolio of client results, because we do not have permission to publish any."
- `/work` renders **both** "There are no published case studies here, because we do not have permission to publish client results." **and** a "Published — Work published with the client's permission." section listing 7 case studies (`/portfolio/*`, indexable, in the sitemap).
- NAV-011 / NAV-026 (owner-decided) label `/work` "Case Studies".

The site states two incompatible positions on whether client results may be published. **UNKNOWN:** whether the 7 case studies are permissioned. This review does not resolve it and does not reopen NAV-011/NAV-026. It is carried to the `/work` review (§3.6), and bears on SEO-001 and every `/portfolio/*` page. **Update 2026-09-19:** the `/work` investigation (§3.6) finds the repository cannot establish permission for any of the seven — **`OWNER FACT REQUIRED`**. The conflict remains **OPEN**. **Resolved as to fact 2026-09-19 — see §0.6.** Correction of the copy is pending the later implementation phase. Fixing either side is a content/proof-policy change, outside link routing.

## 1. Review instructions and decision legend

**How to answer.** Reply with the decision ID and one of the decision words, for example `NAV-009 REMOVE`, `BLOG-014 CHANGE → /blog/importance-of-content-writing`, `PAGE-012 KEEP`. To accept every KEEP row on a page as a block, reply `<page> KEEP-ALL` (for example `/ KEEP-ALL`) — any row can still be overridden individually by its ID. Pages are reviewed one at a time in the order of §3.

| Decision | Meaning |
|---|---|
| **KEEP** | The current destination is appropriate. |
| **CHANGE** | Another *existing* destination is more appropriate (name it). |
| **REMOVE** | The link should not exist. |
| **CREATE PAGE** | The destination purpose is valid, but the page does not exist. Page creation is a separate, later, approved task. |
| **OWNER DECISION** | Business/marketing intent cannot be determined safely from evidence; the owner must choose. |
| **ADD** *(owner-introduced)* | Create a navigation link that does not exist today, to an existing page. |
| **VERIFY FIRST** *(owner-introduced)* | Decision held open until a stated fact is confirmed. |

**Recommendation vocabulary used below:** `KEEP` · `CHANGE → /existing-route` · `REMOVE` · `CREATE PAGE — [type]` · `REVIEW` (owner input needed; one-line reason given). This review does not recommend `CREATE PAGE` for any missing service or case study: a stale CMS link is not evidence that MappedSkills offers that service today, so each is framed as a question (§6).

**Marketing logic applied.** Positioning `CAPTURE → CONVERT → MEASURE`; primary outcome **measurable qualified enquiries**. CTA convention: enquiry/contact intent → `/contact`; booking intent → `/schedule-call`; enquiry CTAs are not sent straight to Calendly; no service is invented because old content mentions it.

**Prior architecture context (not an owner decision on these links).** `DEC-010` (Quality Gate 5 passed, 2026-09-01) cites `docs/06-IA/NAVIGATION_ARCHITECTURE.md`. That file still reads "PROPOSED" in its header and states labels are functional, not final. Where the live navigation departs from it, the row says so and is marked `REVIEW`. The live site was not built to that header spec (for example, `/research` does not exist), so it is context for the owner, not a rule this review enforces.

**De-duplication rules.** Desktop and mobile renderings of one navigation item are one row. The same wording to the same destination in several places on a page is one row with all locations listed. Different wording to the same destination stays as separate rows. Table-of-contents anchors are one row per page. Shared navigation is reviewed once (§2); blog and case-study template links are reviewed once (§4.1, §5.1).

## 2. Global shared navigation baseline

Rendered identically on all 36 audited surfaces (audit §5: zero deviations). Approving this table approves global navigation once for every page.

### 2.1 Accessibility and consent

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| NAV-001 | Skip link (keyboard focus; every page) | Skip to main content | `#main` | Same-page anchor | Accessibility — skip to content | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-002 | Consent banner (first visit) | Privacy Policy | `/privacy-policy` | Internal 200 | Legal — consent disclosure | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |

### 2.2 Header and mobile navigation (one logical set)

Desktop header (≥1024 px nav, ≥768 px CTAs) and the opened mobile menu render the **same destinations**; the mobile menu omits only the service descriptions. Each row below covers both renderings.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| NAV-003 | Header logo (desktop + mobile) | MappedSkills logo | `/` | Internal 200 | Return home | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-004 | Header nav + mobile menu | Services | `/services` | Internal 200 | Service discovery (hub) | KEEP — Parent is a real link, as the approved IA requires. | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-005 | Services dropdown + mobile services list | Google Ads | `/google-ads` | Internal 200 | Service discovery — Google Ads | KEEP — Matches the approved IA's single paid-demand entry. | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-006 | Services dropdown + mobile services list | Social Media Ads | `/social-media-ads` | Internal 200 | Service discovery — Paid social | **REVIEW** — Approved-IA context (`DEC-010`, `NAVIGATION_ARCHITECTURE.md`): `/social-media-ads` is reached from `/services`, `/google-ads` and the footer, not the header. Keep in header menu or remove from it? | **KEEP** — owner, 2026-09-19: retain Social Media Ads in header Services menu |
| NAV-007 | Services dropdown + mobile services list | Lead Generation | `/lead-generation` | Internal 200 | Service discovery — Lead generation | **REVIEW** — Approved-IA context (`DEC-010`, `NAVIGATION_ARCHITECTURE.md`): `/lead-generation` is reached from `/services` and the footer, not the header. Keep in header menu or remove from it? | **KEEP** — owner, 2026-09-19: retain Lead Generation in header Services menu |
| NAV-008 | Services dropdown + mobile services list | SEO | `/seo` | Internal 200 | Service discovery — SEO | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-009 | Services dropdown + mobile services list | Conversion Optimization | `/conversion-optimization` | Internal 200 | Service discovery — Conversion optimisation | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-010 | Header nav + mobile menu | How It Works | `/how-it-works` | Internal 200 | Method / measurement credibility | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-011 | Header nav + mobile menu | Case Studies | `/work` | Internal 200 | Case-study discovery | **REVIEW** — Naming and placement: header says "Case Studies", footer says "Work" (NAV-026), portfolio breadcrumb says "Case Studies". Live `/work` lists 7 published case studies and is `noindex` (SEO-001). Approved-IA context (`DEC-010`, `NAVIGATION_ARCHITECTURE.md`): `/work` enters the header only once the first *permissioned* case study publishes — whether the 7 are permissioned is UNKNOWN. Decide: keep / relabel / remove from header. | **KEEP DESTINATION `/work`; LABEL "Case Studies"** — owner, 2026-09-19: retain in header (live label already reads "Case Studies") |
| NAV-012 | Header nav + mobile menu | Pricing | `/pricing` | Internal 200 | Cost expectations | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-013 | Header nav + mobile menu | Blog | `/blog` | Internal 200 | Educational content hub | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-014 | Header CTA (secondary text link) + mobile menu | Book a call | `/schedule-call` | Internal 200 | Secondary booking CTA | KEEP — Booking intent → `/schedule-call` (convention). | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-015 | Header CTA (primary button) + mobile menu | Contact Us | `/contact` | Internal 200 | Primary enquiry CTA | KEEP — Enquiry intent → `/contact` (convention); primary commercial action. | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-016 | Services dropdown + mobile services list (**gap — no link today**) | AI search | — (would be `/ai-seo`) | Not present | Service discovery — AI search | **REVIEW** — `/ai-seo` is live and presented as a capability on `/`, `/services`, `/faq`, `/seo` and the 404 page, but is absent from all shared navigation. Approved-IA context (`DEC-010`, `NAVIGATION_ARCHITECTURE.md`): it is in the dropdown. Add or leave out? | **ADD** — owner, 2026-09-19: add "AI Search" → `/ai-seo` to header Services menu |
| NAV-017 | Header nav + mobile menu (**gap — no link today**) | About | — (would be `/about`) | Not present | Company credibility | **REVIEW** — `/about` is reachable only from the footer and the 404 page. Approved-IA context (`DEC-010`, `NAVIGATION_ARCHITECTURE.md`): it is promoted into the primary navigation. Add or leave footer-only? | **ADD** — owner, 2026-09-19: add "About" → `/about` to header navigation |

### 2.3 Footer

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| NAV-018 | Footer brand column | MappedSkills logo | `/` | Internal 200 | Return home | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-019 | Footer › Services column | Google Ads | `/google-ads` | Internal 200 | Service discovery — Google Ads | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-020 | Footer › Services column | Social Media Ads | `/social-media-ads` | Internal 200 | Service discovery — Paid social | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-021 | Footer › Services column | Lead Generation | `/lead-generation` | Internal 200 | Service discovery — Lead generation | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-022 | Footer › Services column | SEO | `/seo` | Internal 200 | Service discovery — SEO | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-023 | Footer › Services column | Conversion Optimization | `/conversion-optimization` | Internal 200 | Service discovery — Conversion optimisation | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-024 | Footer › Company column | Services | `/services` | Internal 200 | Service discovery (hub) | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-025 | Footer › Company column | How It Works | `/how-it-works` | Internal 200 | Method / measurement credibility | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-026 | Footer › Company column | Work | `/work` | Internal 200 | Case-study discovery | **REVIEW** — Label "Work" vs header "Case Studies" (NAV-011). Approved-IA context (`DEC-010`, `NAVIGATION_ARCHITECTURE.md`): the footer lists `/work` only "when populated and indexable" — it is populated but `noindex` (SEO-001). Keep / relabel / remove? | **KEEP DESTINATION `/work`; CHANGE LABEL "Work" → "Case Studies"** — owner, 2026-09-19: standardise with header |
| NAV-027 | Footer › Company column | Pricing | `/pricing` | Internal 200 | Cost expectations | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-028 | Footer › Company column | About | `/about` | Internal 200 | Company credibility | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-029 | Footer › Company column | Blog | `/blog` | Internal 200 | Educational content hub | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-030 | Footer › Company column | FAQ | `/faq` | Internal 200 | Objection handling | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-031 | Footer › Company column | Contact | `/contact` | Internal 200 | Primary enquiry CTA | KEEP — Enquiry intent → `/contact`. | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-032 | Footer › Company column | Book a call | `/schedule-call` | Internal 200 | Secondary booking CTA | KEEP — Booking intent → `/schedule-call`. | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-033 | Footer contact column (address text) + social row (envelope icon) | info@mappedskills.com / "Email" icon (×2, same destination) | `mailto:info@mappedskills.com` | mailto | Direct email contact | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-034 | Footer contact column — "Pune" | +91 9873232662 | `tel:+919873232662` | tel | Direct phone contact | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-035 | Footer contact column — "Mumbai" | +91 9272189706 | `tel:+919272189706` | tel | Direct phone contact | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-036 | Footer › Legal row | Privacy Policy | `/privacy-policy` | Internal 200 | Legal | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-037 | Footer › Legal row | Terms | `/terms` | Internal 200 | Legal | KEEP | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-038 | Footer › Social row (icon) | LinkedIn | `https://linkedin.com/company/mappedskills` | External | Brand social profile | KEEP — Resolves (200). The approved IA asks that social profiles be verified as real and current before launch. | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-039 | Footer › Social row (icon) | Facebook | `https://facebook.com/mappedskills` | External (redirects → www.facebook.com/MappedSkill#) | Brand social profile | **REVIEW** — Works in a real browser but lands on a different handle (`facebook.com/MappedSkill`). Confirm the official page URL. | **VERIFY FIRST; REMOVE LINK IF OFFICIAL DESTINATION CANNOT BE VERIFIED** — owner, 2026-09-20 (supersedes the 2026-09-19 holding decision): before implementation verify the official MappedSkills Facebook page; if reliably established use it; otherwise remove the footer Facebook link. No guessed URL; no unverified link kept to preserve the icon |
| NAV-040 | Footer › Social row (icon) | Instagram | `https://instagram.com/mappedskills` | External (redirects → www.instagram.com/mappedskills) | Brand social profile | KEEP — Resolves (301 → 200). The profile renders as "Amit Gupta (@mappedskills)", a founder-named account — noted for owner awareness. | **KEEP** — owner, 2026-09-19 (global KEEP rows accepted) |
| NAV-041 | Footer Services column (**gap — no link today**) | AI search | — (would be `/ai-seo`) | Not present | Service discovery — AI search | **REVIEW** — Footer Services column lists 5 services but not `/ai-seo`. Approved-IA context (`DEC-010`, `NAVIGATION_ARCHITECTURE.md`): the footer carries `/ai-seo`. Add or leave out? | **ADD** — owner, 2026-09-19: add "AI Search" → `/ai-seo` to footer Services column |

**Not reviewed as links:** consent Accept/Reject, footer "Analytics preferences", the services-dropdown toggle and the mobile menu toggle are controls that do not navigate (audit §5.6).

## 3. Page-by-page review

### 3.1 `/`

*Global navigation for this page = §2 baseline (reviewed there).*

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| PAGE-001 | Hero CTA + Closing CTA | Tell us what you’re trying to fix | `/contact` | Internal 200 | Primary enquiry CTA | KEEP | **KEEP** — owner, 2026-09-19 (`/ KEEP-ALL`) |
| PAGE-002 | Hero CTA + Closing CTA | Book a call | `/schedule-call` | Internal 200 | Secondary booking CTA | KEEP | **KEEP** — owner, 2026-09-19 (`/ KEEP-ALL`) |
| PAGE-003 | Hero CTA | See the method, including what we can’t attribute | `/how-it-works` | Internal 200 | Method / measurement credibility | KEEP | **KEEP** — owner, 2026-09-19 (`/ KEEP-ALL`) |
| PAGE-004 | Body — What this usually looks like from the inside | If that is the shape of it, this page is about exactly that | `/problems/traffic-but-no-enquiries` | Internal 200 | Problem diagnosis | KEEP | **KEEP** — owner, 2026-09-19 (`/ KEEP-ALL`) |
| PAGE-005 | Body — "How the work produces an enquiry" › Capture column | Organic search | `/seo` | Internal 200 | Service discovery — SEO | KEEP | **KEEP** — owner, 2026-09-19 (`/ KEEP-ALL`) |
| PAGE-006 | Body — "How the work produces an enquiry" › Capture column | Google Ads | `/google-ads` | Internal 200 | Service discovery — Google Ads | KEEP | **KEEP** — owner, 2026-09-19 (`/ KEEP-ALL`) |
| PAGE-007 | Body — "How the work produces an enquiry" › Capture column | Paid social | `/social-media-ads` | Internal 200 | Service discovery — Paid social | KEEP | **KEEP** — owner, 2026-09-19 (`/ KEEP-ALL`) |
| PAGE-008 | Body — "How the work produces an enquiry" › Capture column | AI search | `/ai-seo` | Internal 200 | Service discovery — AI search | KEEP | **KEEP** — owner, 2026-09-19 (`/ KEEP-ALL`) |
| PAGE-009 | Body — "How the work produces an enquiry" › Convert column | Conversion optimisation | `/conversion-optimization` | Internal 200 | Service discovery — Conversion optimisation | KEEP | **KEEP** — owner, 2026-09-19 (`/ KEEP-ALL`) |
| PAGE-010 | Body — "How the work produces an enquiry" › Convert column | Lead generation | `/lead-generation` | Internal 200 | Service discovery — Lead generation | KEEP | **KEEP** — owner, 2026-09-19 (`/ KEEP-ALL`) |
| PAGE-011 | Body — "How the work produces an enquiry" › Measure column | How we measure it | `/how-it-works` | Internal 200 | Method / measurement credibility | KEEP | **KEEP** — owner, 2026-09-19 (`/ KEEP-ALL`) |
| PAGE-012 | Body — What we are accountable for, and where that stops | See what can and cannot be attributed | `/how-it-works` | Internal 200 | Method / measurement credibility | KEEP — Two adjacent links to `/how-it-works` in the same section; both kept separate because wording differs. | **KEEP** — owner, 2026-09-19 (`/ KEEP-ALL`) |
| PAGE-013 | Body — What we are accountable for, and where that stops | The method, in full — including what cannot be attributed → | `/how-it-works` | Internal 200 | Method / measurement credibility | KEEP — Two adjacent links to `/how-it-works` in the same section; both kept separate because wording differs. | **KEEP** — owner, 2026-09-19 (`/ KEEP-ALL`) |
| PAGE-014 | Body — What we are accountable for, and where that stops | What this costs, and what moves the number | `/pricing` | Internal 200 | Cost expectations | KEEP | **KEEP** — owner, 2026-09-19 (`/ KEEP-ALL`) |

### 3.2 `/about`

Shared navigation: same as approved global baseline — no page-specific deviation.

> Routing/SEO notes (evidence from the audit; no decision implied):
> - **Incoming links today:** 37 placements, from the footer "About" on every page (36) and the 404 page (1). No page body links to `/about`, and it is not in the header. **NAV-017 (ADD, owner-decided, not implemented)** will add a header link.
> - **Indexability:** `index, follow`, listed in `sitemap.xml`, HTTP 200. No SEO flag.
> - **Future content/IA consideration only — not an approved change, not a routing defect:** the H1 reads "Who we are, and what we can actually show you." and the page does not link to Case Studies (`/work`). Per owner direction (§0.2) **no Case Studies link is to be added to `/about` in this programme.**

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| PAGE-015 | Body — How we work | The method | `/how-it-works` | Internal 200 | Method / measurement credibility | KEEP | **KEEP** — owner, 2026-09-19 (`/about KEEP-ALL`) |
| PAGE-016 | Body — What you can check | Read the method | `/how-it-works` | Internal 200 | Method / measurement credibility | KEEP | **KEEP** — owner, 2026-09-19 (`/about KEEP-ALL`) |
| PAGE-017 | Closing CTA | Tell us what you're trying to fix | `/contact` | Internal 200 | Primary enquiry CTA | KEEP | **KEEP** — owner, 2026-09-19 (`/about KEEP-ALL`) |
| PAGE-018 | Closing CTA | Book a call | `/schedule-call` | Internal 200 | Secondary booking CTA | KEEP | **KEEP** — owner, 2026-09-19 (`/about KEEP-ALL`) |

### 3.3 `/services`

Shared navigation: same as approved global baseline — no page-specific deviation.

> Routing/SEO notes (evidence from the audit; no decision implied):
> - **No 404s, no redirects, no anchors, no external links** on this page. All 12 logical links (14 placements) resolve 200 on the first request.
> - **Indexability:** `index, follow`, listed in `sitemap.xml`, HTTP 200. No SEO flag.
> - **Same destination, different wording, kept as separate rows:** `/lead-generation` (PAGE-021 definition link; PAGE-028 capability link) and `/how-it-works` (PAGE-022 attribution link; PAGE-029 measurement link). Each pair serves a different purpose.
> - **Incoming-link label variation (observation only):** visitors reach `/services` via "Services" (header/footer, NAV-004/NAV-024), "What we do" (breadcrumb on the 6 service pages), "the whole system…" (service-page body links), "Explore Services" (every blog article) and the 404 route card. All resolve 200; no routing defect.
> - **Relationship to approved global navigation:** PAGE-026 (AI search → `/ai-seo`) is consistent with NAV-016/NAV-041 (ADD AI Search to header and footer). PAGE-025 (`/social-media-ads`) and PAGE-021/PAGE-028 (`/lead-generation`) are consistent with NAV-006/NAV-007 (KEEP). No page-specific link here points to `/work` or `/about`, so NAV-011, NAV-017, NAV-026 and NAV-039 do not affect this page's own links. None needs changing because of those decisions.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| PAGE-019 | Hero CTA + Closing CTA | Tell us what you’re trying to fix | `/contact` | Internal 200 | Primary enquiry CTA | KEEP | **KEEP** — owner, 2026-09-19 (`/services KEEP-ALL`) |
| PAGE-020 | Hero CTA + Closing CTA | Book a call | `/schedule-call` | Internal 200 | Secondary booking CTA | KEEP | **KEEP** — owner, 2026-09-19 (`/services KEEP-ALL`) |
| PAGE-021 | Body — What the whole system is for | What counts as one | `/lead-generation` | Internal 200 | Qualified-enquiry definition (published on `/lead-generation`) | KEEP — Wording and destination match: `/lead-generation` publishes the qualified-enquiry definition (also linked as "The published definition" from `/faq`). | **KEEP** — owner, 2026-09-19 (`/services KEEP-ALL`) |
| PAGE-022 | Body — What we are accountable for, and where that stops | See what can and cannot be attributed | `/how-it-works` | Internal 200 | Attribution boundaries | KEEP | **KEEP** — owner, 2026-09-19 (`/services KEEP-ALL`) |
| PAGE-023 | Body — Where each discipline comes in | Organic search (SEO) → the primary acquisition capability, and the slowest. Technical fou… | `/seo` | Internal 200 | Service discovery — SEO | KEEP | **KEEP** — owner, 2026-09-19 (`/services KEEP-ALL`) |
| PAGE-024 | Body — Where each discipline comes in | Google Ads → access to demand that is active now, chosen on merit for your business, on t… | `/google-ads` | Internal 200 | Service discovery — Google Ads | KEEP | **KEEP** — owner, 2026-09-19 (`/services KEEP-ALL`) |
| PAGE-025 | Body — Where each discipline comes in | Paid social → an optional additional source, judged on qualified enquiries like every oth… | `/social-media-ads` | Internal 200 | Service discovery — Paid social | KEEP | **KEEP** — owner, 2026-09-19 (`/services KEEP-ALL`) |
| PAGE-026 | Body — Where each discipline comes in | AI search → whether your business appears when a buyer asks an assistant for a supplier l… | `/ai-seo` | Internal 200 | Service discovery — AI search | KEEP | **KEEP** — owner, 2026-09-19 (`/services KEEP-ALL`) |
| PAGE-027 | Body — Where each discipline comes in | The enquiry path → the route from arrival to a received enquiry: the page, the form, the … | `/conversion-optimization` | Internal 200 | Service discovery — Conversion optimisation | KEEP | **KEEP** — owner, 2026-09-19 (`/services KEEP-ALL`) |
| PAGE-028 | Body — Where each discipline comes in | Enquiry generation → the outcome named: more of the right enquiries, with a published def… | `/lead-generation` | Internal 200 | Service discovery — Lead generation (distinct from PAGE-021 definition link) | KEEP | **KEEP** — owner, 2026-09-19 (`/services KEEP-ALL`) |
| PAGE-029 | Body — Where each discipline comes in | Measurement → analytics, event instrumentation, enquiry-source capture and attribution. I… | `/how-it-works` | Internal 200 | Measurement methodology | KEEP | **KEEP** — owner, 2026-09-19 (`/services KEEP-ALL`) |
| PAGE-030 | Body — Who this is for | What this costs, and what moves the number | `/pricing` | Internal 200 | Cost expectations | KEEP | **KEEP** — owner, 2026-09-19 (`/services KEEP-ALL`) |

### 3.4 `/how-it-works`

Shared navigation: same as approved global baseline — no page-specific deviation.

> **Note added 2026-09-19 (during the `/problems/…` review; not a new flag):** `/how-it-works` also states "The website can check that an enquiry is real, reachable and in context." Per the §0.11 expansion, only presence of name/email/company, email **format**, and a cheap `clean`/`suspect` abuse flag are supported. Reachability (deliverability) and genuine business context are **not** verified. This is an additional instance within **`QUALIFICATION CAPABILITY CLAIM — CHANGE REQUIRED LATER`**. Routing decisions for this page are unaffected.

> Routing/SEO notes (evidence from the audit; no decision implied):
> - **Page-specific links:** only the closing CTA pair under "If you want this run on your business". Each appears once; no desktop/mobile duplicates. No 404s, redirects, anchors or external links.
> - **Indexability:** `index, follow`, canonical `https://mappedskills.com/how-it-works`, in `sitemap.xml`, HTTP 200. No SEO flag.
> - **Wording vs destination:** "Tell us what you're trying to fix" → `/contact` (enquiry) and "Book a call" → `/schedule-call` (booking) both follow the CTA convention. Neither implies a capability, proof, result, case study or service.
> - **Inbound role (context only):** `/how-it-works` is one of the most-linked destinations (93 placements, incl. header/footer NAV-010/NAV-025 and body links such as "the method, including what cannot be attributed"). Those promises match the page's H1 ("How we work, what we measure, and what we cannot tell you."); body content beyond the H1 was not audited here. Inbound links are reviewed on their source pages.
> - **Outbound scope:** the page links onward only to the two conversion routes. Per owner direction (§0.3) no additional links are proposed.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| PAGE-031 | Closing CTA — "If you want this run on your business" | Tell us what you're trying to fix | `/contact` | Internal 200 | Primary enquiry CTA | KEEP | **KEEP** — owner, 2026-09-19 (`/how-it-works KEEP-ALL`) |
| PAGE-032 | Closing CTA — "If you want this run on your business" | Book a call | `/schedule-call` | Internal 200 | Secondary booking CTA | KEEP | **KEEP** — owner, 2026-09-19 (`/how-it-works KEEP-ALL`) |

### 3.5 `/pricing`

Shared navigation: same as approved global baseline — no page-specific deviation.

> Routing/SEO notes (evidence from the audit plus single-page live and source checks, 2026-09-19; no decision implied):
> - **No 404s, no redirects, no anchors, no external links.** All 6 links resolve 200 on the first request. Indexability: `index, follow`, in `sitemap.xml`. No SEO flag.
> - **Conversion architecture:** no CTA bypasses it. Both enquiry CTAs → `/contact`; both booking CTAs → `/schedule-call`; no direct Calendly link.
> - **Same destination, materially different purpose:** `/how-it-works` — PAGE-035 (what the fee buys) vs PAGE-036 (published commitments offered *instead of* case studies). `/contact` — PAGE-033 (price-seeking) vs PAGE-037 (general enquiry): same destination and intent family, different visitor motive. `/schedule-call` — PAGE-034 / PAGE-038 differ only in wording.
> - **Commitment wording:** only PAGE-033 implies something (a price) the destination does not itself provide (see its row). No link implies a proposal, audit, consultation, package, guaranteed price or result. The page source deliberately suppresses entry-offer and package claims (`[DECISION REQUIRED — entry-offer model]` renders nothing).
> - **Proof-policy conflict:** see §0.4. The PAGE-036 section states no permission to publish client results; `/work` lists 7 case studies "published with the client's permission".

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| PAGE-033 | Hero CTA — "What this costs, and what changes the number." | Get an actual number | `/contact` | Internal 200 | Pricing clarification → enquiry (primary) | **REVIEW** — Routing follows the convention (enquiry → `/contact`), but the wording implies the visitor will *get a price*. `/contact` is an enquiry form that promises "our first reply", not a number; the page's own close says "A real number comes from scope" via a conversation. Keep wording (the number follows the enquiry) or relabel? Destination change is not recommended. | **KEEP DESTINATION `/contact`; CHANGE CTA LABEL → "Get a scoped estimate"** — owner, 2026-09-19. Wording-only future change; not a routing change; not implemented |
| PAGE-034 | Hero CTA — "What this costs, and what changes the number." | Book a time to talk | `/schedule-call` | Internal 200 | Booking (secondary) | KEEP — Booking intent → `/schedule-call`. | **KEEP** — owner, 2026-09-19 |
| PAGE-035 | Body — "What you are buying" | The method, in full | `/how-it-works` | Internal 200 | Methodology — what the fee buys | KEEP | **KEEP** — owner, 2026-09-19 |
| PAGE-036 | Body — "A premium price with no case studies" | What is published, and what it commits us to | `/how-it-works` | Internal 200 | Methodology as proof substitute — published commitments and accountability boundary | KEEP — `/how-it-works` publishes the accountable number and an explicit not-promised list, so the "commits us to" wording is supported. The surrounding section copy is subject to the proof-policy conflict in §0.4 (content, not routing). | **KEEP** — owner, 2026-09-19 |
| PAGE-037 | Closing CTA — label "Get an actual number", heading "A real number comes from scope." | Tell us what you're trying to fix | `/contact` | Internal 200 | Enquiry (primary) | KEEP | **KEEP** — owner, 2026-09-19 |
| PAGE-038 | Closing CTA — label "Get an actual number", heading "A real number comes from scope." | Book a call | `/schedule-call` | Internal 200 | Booking (secondary) | KEEP — Note: the close body says "Booking a time is usually faster than writing it out" while booking is the secondary action. This is copy/CTA-hierarchy tension, not a routing bypass. | **KEEP** — owner, 2026-09-19 |

### 3.6 `/work`

Shared navigation: same as approved global baseline — no page-specific deviation.

> Indexability flag: see **SEO-001** (§8) — not part of link implementation.

> **Deeper review (2026-09-19).** `/work` intersects NAV-011 / NAV-026 (owner-approved "Case Studies"), SEO-001, the seven live case studies, and the open proof-policy conflict. Evidence below is from the audit, the canonical source (identical to the deployed build source), repository documentation, and single-page live reads on 2026-09-19. **Nothing was changed.**

**`/work` state (VERIFIED FACT).** HTTP 200 · `meta robots` **`noindex, nofollow`** (set in `app/(pages)/work/page.tsx` metadata) · canonical `https://mappedskills.com/work` (self) · **not in `sitemap.xml`** (excluded in `app/sitemap.ts`, which carries an owner note that this must be revisited when case studies publish) · meta description "What can be checked about this firm today, and why there are no published case studies." · H1 "What we can show you, and what we cannot."

**Linked from global navigation:** yes — header + mobile menu "Case Studies" (NAV-011) and footer "Work" (NAV-026, approved to become "Case Studies") on every page; also every case study's breadcrumb "Case Studies" (WORK-002) and close "What we can and cannot show you", and one blog-body link ("case studies", via redirect).

**Page function:** primarily the case-study hub (7 cards) plus a proof-substitute section ("What can be checked instead": the method, the AI-visibility self-measurement — unlinked — and the own-site diagnostic). It has no conversion CTA of its own (shared navigation only); per owner scope, none is proposed.

**The seven case studies (VERIFIED FACT, live 2026-09-19):**

| Card | Destination | Status | Robots | Canonical | In sitemap | Named client | Date shown | Result figures | Client quote | Permission wording |
|---|---|---|---|---|---|---|---|---|---|---|
| PAGE-039 | `/portfolio/seo-healthfirst` | 200 | index, follow | self | yes | HealthFirst Clinics (Delhi) | June 2023 | yes (e.g. "Decreased bounce rate by 35%") | no | none |
| PAGE-040 | `/portfolio/seo-ameba-software` | 200 | index, follow | self | yes | Ameba Software (Chandigarh) | February 2020 | yes (e.g. "200% increase in organic website traffic") | no | none |
| PAGE-041 | `/portfolio/local-seo-service-usa` | 200 | index, follow | self | yes | EcoClean Pros | October 2022 | yes (e.g. "Boosted online bookings by 65%") | no | none |
| PAGE-042 | `/portfolio/seo-for-home-decor-brand` | 200 | index, follow | self | yes | unnamed (Bangalore brand) | March 2020 | yes (e.g. "50% increase in sales") | no | none |
| PAGE-043 | `/portfolio/google-ads-for-online-courses` | 200 | index, follow | self | yes | AnybodyCanBake | April 2016 | yes (e.g. CPA ₹500 → ₹200) | **yes** | none |
| PAGE-044 | `/portfolio/google-ppc-for-real-estate` | 200 | index, follow | self | yes | The Fine Living Group | June 2024 | yes (e.g. conversion 3.5% → 5.0%) | no | none |
| PAGE-045 | `/portfolio/google-ads-for-ecommerce` | 200 | index, follow | self | yes | Utpala Designs | September 2022 | yes (e.g. "Monthly Sales: ₹5,10,000") | **yes** | none |

No 404s, no redirects: every `/work` link resolves 200 on the first request. No `/work` link is an external, anchor, `mailto` or `tel` link.

> **Superseded 2026-09-19 by owner facts (§0.6):** permission YES for PAGE-040, PAGE-042, PAGE-043; NO for PAGE-039, PAGE-041, PAGE-044, PAGE-045. The tables below are retained as the repository-evidence record at the time of investigation.

**Proof / permission investigation — per study.** The repository was searched (all of `docs/`, `doc/`, `app/`, `lib/`, `components/`) for each client name and slug.

| Card | Repository evidence found | Classification |
|---|---|---|
| PAGE-039 HealthFirst | none (0 files) | **Permission undocumented.** Origin: pre-existing Contentful entry — imported legacy content is a **WORKING HYPOTHESIS**, not verified |
| PAGE-040 Ameba Software | none (0 files) | **Permission undocumented.** Same origin hypothesis |
| PAGE-041 EcoClean | none (0 files) | **Permission undocumented.** Same origin hypothesis |
| PAGE-042 Home decor brand | none (0 files) | **Permission undocumented** (anonymity does not substitute for permission under `CLAIMS_AND_EVIDENCE_GOVERNANCE.md` §6). Same origin hypothesis |
| PAGE-043 AnybodyCanBake | 7 files — all record it as a **candidate with publishability UNKNOWN** and the decision as an open owner blocker | **Documented as NOT established** as of those records; no later record resolves it |
| PAGE-044 Real estate / The Fine Living Group | none (0 files) | **Permission undocumented.** Same origin hypothesis |
| PAGE-045 Utpala Designs | none (0 files) | **Permission undocumented.** Same origin hypothesis |

Basis for the legacy-origin **hypothesis** (not proof): the programme's own records (Sessions 01–07) state production published **zero** case studies with the Contentful slug set **UNKNOWN**; the studies are dated 2016–2024, before the programme; a legacy redirect `/results/:slug → /portfolio/:slug` exists; and Contentful blog bodies link to `/portfolio/…/` URLs in trailing-slash form. Nothing in the repository classifies any study as placeholder/demo content, and none is presumed to be. **No study is classified as permissioned, because the repository contains no evidence of permission for any of them. `OWNER FACT REQUIRED`.**

**Source of the contradictory claims (VERIFIED FACT):**

| Claim | Exact live wording | Source | Rendering | Assessment |
|---|---|---|---|---|
| A | "What we cannot offer you is a portfolio of client results, because we do not have permission to publish any." | `app/(pages)/pricing/page.tsx`, §7 "A premium price with no case studies" | Unconditional | **Consistent with every repository record** (`CLAIMS_AND_EVIDENCE_GOVERNANCE.md`: "Zero permissioned client results exist today"). Stale **only if** permission in fact exists — cannot be established from the repository |
| B | "There are no published case studies here, because we do not have permission to publish client results." | `app/(pages)/work/page.tsx`, `RouteHero` lede (Session 29, Phase G), written on the recorded premise "ZERO CASE STUDIES EXIST AND NONE MAY BE INVENTED" | **Unconditional** — renders even when the list below it is populated | Same as A. It is *factually false as a description of the page* in one respect: seven studies are published on it |
| C | "Published — Work published with the client’s permission." | Same file, hard-coded in the `caseStudies.length > 0` branch | Renders for **any** entry in the Contentful `caseStudies` collection | **Not supported by evidence.** It is a template assumption: the query (`GET_ALL_CASE_STUDIES_QUERY`) and content model carry no permission field or filter, so CMS presence alone triggers the permission claim |

**Conclusion: the repository cannot establish whether any of the seven are permissioned. `OWNER FACT REQUIRED`.** A and B match the documented record; C has no supporting evidence. Which statement is *true* is not decided here (owner direction, §0.5). *(Reconciled 2026-09-20: resolved by owner permission facts, §0.6 — YES: Ameba Software, Home Decor Brand, AnybodyCanBake; NO: HealthFirst Clinics, EcoClean Pros, The Fine Living Group, Utpala Designs.)*

**Governance context (APPROVED DECISIONS, cited, not applied):** `DEC-012` makes `CLAIMS_AND_EVIDENCE_GOVERNANCE.md` binding: *no client case study publishes until* written, item-specific client permission and nine further evidence requirements are met (§6), and *no testimonial* appears until then. The approved IA (`DEC-010`, `WEBSITE_INFORMATION_ARCHITECTURE.md` §9.4): "`/work` remains a live route, `noindex` and excluded from the sitemap, until at least one permissioned case study is published. At that point it is indexed and enters the navigation." `CTA_SYSTEM.md` rule 5: no case-study CTA until one exists. The repository contains **no record** that any of the seven met the `DEC-012` threshold.

**Dependency on owner-approved navigation (flag, not a reopening):** NAV-011 / NAV-026 keep "Case Studies" → `/work` in the header and footer. Under the approved IA that placement is correct **if** at least one study is permissioned; if none is, the approved decisions depart from `DEC-010`/`DEC-012` and would need an explicit owner supersession when decisions are later entered in `DECISION_LOG.md`.

**CTA wording vs destination:** no mismatch *within* `/work`'s own links. Inbound label mismatch: "Case Studies" (NAV-011/026, WORK-002) leads to a page whose first sentence says there are no published case studies — a consequence of claim B, resolved by the owner fact, not by routing.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| PAGE-039 | Case-study card — "Published" | SEO for HealthFirst: Healthcare Website (client: HealthFirst Clinics, Delhi) | `/portfolio/seo-healthfirst` | Internal 200 (target `index, follow`, in sitemap) | Case-study proof — permission not established in repository | **REMOVE FROM PUBLIC CASE-STUDY SURFACES — owner confirms written client permission is not held** | **OWNER FACT: permission NO** — **REMOVE FROM PUBLIC CASE-STUDY SURFACES** — owner, 2026-09-19 (not implemented) |
| PAGE-040 | Case-study card — "Published" | SEO for Ameba Software: Tech Company (client: Ameba Software, Chandigarh) | `/portfolio/seo-ameba-software` | Internal 200 (target `index, follow`, in sitemap) | Case-study proof — permission not established in repository | **KEEP — written client permission confirmed by owner 2026-09-19** | **OWNER FACT: permission YES** — **KEEP** — owner, 2026-09-19 |
| PAGE-041 | Case-study card — "Published" | Local SEO for EcoClean: Cleaning Service Provider (client: EcoClean Pros) | `/portfolio/local-seo-service-usa` | Internal 200 (target `index, follow`, in sitemap) | Case-study proof — permission not established in repository | **REMOVE FROM PUBLIC CASE-STUDY SURFACES — owner confirms written client permission is not held** | **OWNER FACT: permission NO** — **REMOVE FROM PUBLIC CASE-STUDY SURFACES** — owner, 2026-09-19 (not implemented) |
| PAGE-042 | Case-study card — "Published" | SEO for eCommerce Home Decor Brand (client unnamed, Bangalore) | `/portfolio/seo-for-home-decor-brand` | Internal 200 (target `index, follow`, in sitemap) | Case-study proof — permission not established in repository | **KEEP — written client permission confirmed by owner 2026-09-19** | **OWNER FACT: permission YES** — **KEEP** — owner, 2026-09-19 |
| PAGE-043 | Case-study card — "Published" | Google Ads for Online Courses (client: AnybodyCanBake) | `/portfolio/google-ads-for-online-courses` | Internal 200 (target `index, follow`, in sitemap) | Case-study proof — permission not established in repository | **KEEP — written client permission confirmed by owner 2026-09-19** | **OWNER FACT: permission YES** — **KEEP** — owner, 2026-09-19 |
| PAGE-044 | Case-study card — "Published" | Google PPC for Real Estate (client named in body: The Fine Living Group) | `/portfolio/google-ppc-for-real-estate` | Internal 200 (target `index, follow`, in sitemap) | Case-study proof — permission not established in repository | **REMOVE FROM PUBLIC CASE-STUDY SURFACES — owner confirms written client permission is not held** | **OWNER FACT: permission NO** — **REMOVE FROM PUBLIC CASE-STUDY SURFACES** — owner, 2026-09-19 (not implemented) |
| PAGE-045 | Case-study card — "Published" | How Our Google PPC Packages Helped an E-commerce Brand Increase in Sales (client: Utpala Designs) | `/portfolio/google-ads-for-ecommerce` | Internal 200 (target `index, follow`, in sitemap) | Case-study proof — permission not established in repository | **REMOVE FROM PUBLIC CASE-STUDY SURFACES — owner confirms written client permission is not held** | **OWNER FACT: permission NO** — **REMOVE FROM PUBLIC CASE-STUDY SURFACES** — owner, 2026-09-19 (not implemented) |
| PAGE-046 | Body — "What can be checked instead" ("Three things, and one of them found our own failures.") | Read the method | `/how-it-works` | Internal 200 | Methodology as checkable proof | KEEP | **KEEP** — owner, 2026-09-19 |
| PAGE-047 | Body — "What can be checked instead" | The checks themselves | `/problems/traffic-but-no-enquiries` | Internal 200 | Diagnostic (the five published checks) | KEEP | **KEEP** — owner, 2026-09-19 |

### 3.7 `/blog`

Shared navigation: same as approved global baseline — no page-specific deviation.

> **Hub review (2026-09-19). Article body links are out of scope here** — they are reviewed per article in §4.
> - **Hub state (VERIFIED FACT):** HTTP 200 · `index, follow` · canonical `https://mappedskills.com/blog` (self) · in `sitemap.xml` · title "Writing | MappedSkills" · H1 "Writing" · reached from header "Blog" (NAV-013) and footer "Blog" (NAV-029), both owner-approved KEEP, and from every article's breadcrumb.
> - **Page-specific links:** only the 8 article cards. Each card is one link (category · date · title · excerpt). No hub CTA, no category/filter links, no pagination (8 posts; the Contentful query ceiling is 100).
> - **Not rendered live:** `app/(pages)/blog/page.tsx` also contains links to `/problems/traffic-but-no-enquiries` and `/ai-seo`, but only in the empty-state branch (`posts.length === 0`). They do not render while posts exist and are not reviewed.
> - **No 404s, no redirects:** all 8 cards resolve 200 on the first request, each to its own article (title ↔ slug match on every card).
> - **Card date source (VERIFIED FACT):** the date shown is Contentful's system `sys.firstPublishedAt` (`lib/contentful/mappers.ts`), not an authored publication date. All 8 read **July 16, 2026**, including "Freelancing in India: Your 2025 Guide to Success". See **SEO-007**.
> - **Card copy** (title and excerpt) is Contentful article content. Claims in it are flagged in the rows and carried to each article's review; no hub-level link decision depends on them.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| PAGE-048 | Blog card — "Articles" list | Content Marketing · July 16, 2026 · Content Marketing Services in Pune \| Boost Your Business Now | `/blog/content-marketing-services-in-pune` | Internal 200 | Educational content (article) | KEEP (routing) — card copy concern carried to the article review: title/excerpt present *content marketing services* as an offer; no content-marketing service page exists (same question as BLOG-017 / BLOG-037). | **KEEP (routing only)** — owner, 2026-09-19 (`/blog KEEP-ALL`) — card wording NOT approved; carried to article review |
| PAGE-049 | Blog card — "Articles" list | Email Marketing · July 16, 2026 · Building an Email List: A Comprehensive Guide | `/blog/building-an-email-list` | Internal 200 | Educational content (article) | KEEP | **KEEP (routing only)** — owner, 2026-09-19 (`/blog KEEP-ALL`) |
| PAGE-050 | Blog card — "Articles" list | Industry Trends · July 16, 2026 · Freelancing in India: Your 2025 Guide to Success | `/blog/freelancing-in-india` | Internal 200 | Educational content (article) | KEEP | **KEEP (routing only)** — owner, 2026-09-19 (`/blog KEEP-ALL`) |
| PAGE-051 | Blog card — "Articles" list | Brand Strategy · July 16, 2026 · The Importance of Content Writing: A Guide for Business Owners and Marketing Managers | `/blog/importance-of-content-writing` | Internal 200 | Educational content (article) | KEEP | **KEEP (routing only)** — owner, 2026-09-19 (`/blog KEEP-ALL`) |
| PAGE-052 | Blog card — "Articles" list | Insights · July 16, 2026 · Performance Marketing vs. Digital Marketing: Which is Right for Your Business? | `/blog/performance-marketing-vs-digital-marketing` | Internal 200 | Educational content (article) | KEEP | **KEEP (routing only)** — owner, 2026-09-19 (`/blog KEEP-ALL`) |
| PAGE-053 | Blog card — "Articles" list | Real Estate · July 16, 2026 · 7 Proven Strategies of Digital Marketing for Real Estate Developers | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | Internal 200 | Educational content (article) | KEEP (routing) — card copy concern carried to the article review: excerpt ends "MappedSkills gets results." — an unevidenced results claim under `DEC-012`. | **KEEP (routing only)** — owner, 2026-09-19 (`/blog KEEP-ALL`) — card wording NOT approved; carried to article review |
| PAGE-054 | Blog card — "Articles" list | Content Marketing · July 16, 2026 · Best SEO Company in Pune for Businesses That Want Qualified Leads, Not Just Rankings | `/blog/seo-company-in-pune` | Internal 200 | Educational content (article) | KEEP (routing) — carried to the article review: category shown is "Content Marketing" for an SEO article; excerpt states MappedSkills "helps businesses improve rankings, organic traffic, qualified leads…" (outcome claims without evidence; the SEO service itself exists at `/seo`). | **KEEP (routing only)** — owner, 2026-09-19 (`/blog KEEP-ALL`) — card wording NOT approved; carried to article review |
| PAGE-055 | Blog card — "Articles" list | PPC · July 16, 2026 · Facebook Advertising Agency in Pune for Facebook & Instagram Ads That Drive Qualified Leads | `/blog/facebook-advertising-agency-pune` | Internal 200 | Educational content (article) | KEEP (routing) — the implied service exists (`/social-media-ads`). Observation: category "PPC" for a paid-social article. | **KEEP (routing only)** — owner, 2026-09-19 (`/blog KEEP-ALL`) |

### 3.8 `/contact`

Shared navigation: same as approved global baseline — no page-specific deviation.

> **`/contact` review (2026-09-19) — link/routing only.** The live form was **not** submitted; no lead, database write or analytics conversion was created; production form handling was not tested or altered. Form behaviour below is from the canonical source (identical to the deployed build source).
>
> - **State (VERIFIED FACT):** HTTP 200 · `index, follow` · canonical `https://mappedskills.com/contact` (self) · in `sitemap.xml` · H1 "Tell us what you’re trying to fix." · reached from header "Contact Us" (NAV-015), footer "Contact" (NAV-031) and every enquiry CTA site-wide (all owner-approved to `/contact`).
> - **Page-specific links:** two — PAGE-056 and PAGE-057 below. No 404s, no redirects. The hero lede mentions booking ("you can book a time instead") as **text, not a link**; the one booking link is PAGE-057.
> - **Form submission (not a link, VERIFIED FROM SOURCE):** one `<form>` with no `action` attribute; "Send this" submits by script as `POST /api/enquiry` (same origin; `form-action 'self'` CSP). **On success the browser is sent client-side to `/thank-you`** (`ContactForm.tsx` `router.push('/thank-you')`), after the `lead_form_submitted` event. **On failure the visitor stays on `/contact`** with an error summary ("Your enquiry was not sent.") and no navigation.
> - **Conditional in-form links (render only after a failed validation, not triggered):** the error summary links to `#name`, `#email`, `#company`, `#message`, `#phone`, `#website`. All six ids exist on the form fields (VERIFIED FROM SOURCE). Same-page anchors; no decision needed.
> - **Other form controls, not links:** marketing-consent checkbox — "Email me occasionally about what MappedSkills publishes. Not required to send this." (unticked, optional); a hidden honeypot field.
> - **Email / phone:** the page itself carries **no** `mailto:` or `tel:` link. §3 "Direct contact" is **owner-blocked and renders nothing**, per the source ("the published number is OWNER-BLOCKED"). The shared footer, however, shows `info@mappedskills.com` and two phone numbers on this page (NAV-033/034/035, owner-approved KEEP). *Observation, not a reopening:* the page withholds a number as owner-blocked while the approved footer publishes two.
> - **Hidden by design:** §2 "What happens after you send it" and §4 "Where we are" (full address) are also owner-blocked and render nothing.
> - **Bypass check:** no link on `/contact` bypasses the enquiry architecture — no direct Calendly link, no external form, no `mailto:` substitute for the form.
> - **Follow-up wording (VERIFIED):** the page promises only "our first reply" and "We will read it before anyone replies" — **no response time, quote, diagnosis, proposal or result**. The destination `/thank-you` matches this: "We have it. Nothing else is needed from you." Its source deliberately excludes any promise of a meeting, qualification, audit/diagnostic or document ("None of those is decided"). No wording overstates the flow.
> - **Observation (not a routing defect):** the form's failure messages say "try again" but offer no alternative contact route on the page (§3 is owner-blocked). The footer email/phone remain visible. Noted for the owner; no link is proposed.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| PAGE-056 | Enquiry form — privacy statement beside the submit button ("We use what you send here to reply to you.") | Privacy policy | `/privacy-policy` | Internal 200 (target `noindex, nofollow`, SEO-002) | Legal — processing-purpose disclosure at point of submission | KEEP | **KEEP** — owner, 2026-09-19 (`/contact KEEP-ALL`) |
| PAGE-057 | §5 "If you would rather talk" — "Booking a time reaches the same place." | Book a time to talk | `/schedule-call` | Internal 200 | Booking (secondary route to the same enquiry) | KEEP — booking intent → `/schedule-call`; the page presents it as an equal alternative, not a lesser one. | **KEEP** — owner, 2026-09-19 (`/contact KEEP-ALL`) |

### 3.9 `/schedule-call`

Shared navigation: same as approved global baseline — no page-specific deviation.

> **`/schedule-call` review (2026-09-19) — read-only routing and terminology.** No booking was made, nothing was submitted to Calendly, the booking link was not clicked (no `meeting_started` event), and no Calendly configuration was touched. Calendly pages were only viewed.
>
> - **State (VERIFIED FACT):** HTTP 200 · `index, follow` · canonical `https://mappedskills.com/schedule-call` (self) · in `sitemap.xml` · H1 "Book a time to talk." · reached from header/footer "Book a call" (NAV-014, NAV-032) and every booking CTA site-wide.
> - **External booking links / embeds:** **one link, no embed.** PAGE-058 → `https://calendly.com/mappedskills` (rendered value; the source reads `NEXT_PUBLIC_CALENDLY_URL` with this URL as fallback), opened in a new tab. No iframe renders (desktop or mobile); the `CalendlyEmbed` component is not used on this route (source comment). Destination status: **200**, Calendly profile "MappedSkills Marketing" listing **exactly one event: "Client Discovery Call"**; the event page (`…/client-discovery`) shows **30 min**, web conferencing, date picker. No broken booking destination.
> - **Links back to enquiry routes:** PAGE-060 → `/contact` (the page's single cross-link). No other enquiry route. The page's own direct-contact line (phone) is **owner-blocked and renders nothing** (source); the footer phones/email remain (NAV-033–035).
> - **No 404s, no redirects.**
> - **Booking completion:** occurs **on calendly.com in a separate tab**. No MappedSkills route exists to receive a booking confirmation, and the source records that `meeting_booked` would require a vendor webhook "never recorded as selected" — **BOOKING REMAINS OWNER-BLOCKED** (source comment). **Whether the Calendly event is configured to redirect to a MappedSkills URL after booking cannot be established without making a booking or Calendly admin access.**
> - **Owner-blocked content (renders nothing):** who takes the call, how long it runs, when it is available.
>
> **Booking terminology across the site (VERIFIED FACT; flagged, not rewritten):**
>
> | Term | Where | Destination | Duration stated |
> |---|---|---|---|
> | "Book a call" | header, mobile menu, footer (all pages); hero + close on every service page, `/`, `/services`, `/about`, `/faq`, `/how-it-works`, `/problems/…`, legal pages; blog sticky sidebar | `/schedule-call` | none |
> | "Book a time to talk" | `/schedule-call` H1; `/pricing` hero (PAGE-034); `/contact` (PAGE-057) | `/schedule-call` | none |
> | "Open the booking page" | `/schedule-call` (PAGE-058) | Calendly profile | none |
> | "Client Discovery Call" | Calendly event name (third-party) | — | **30 min** |
> | "Book a Growth Diagnosis (20-min)" / "(30-min)" | `/blog/seo-company-in-pune` body (BLOG-062 / BLOG-069, owner decision pending) | Calendly `…/client-discovery` direct | **20 and 30 min** |
> | "Strategy Calls" / "strategy calls" | `/terms` section "Enquiries and Strategy Calls"; `/privacy-policy` ("Schedule strategy calls") | — (text) | none |
>
> **Inconsistencies flagged:** (1) four names for one meeting — call / time to talk (site), Client Discovery Call (Calendly), Growth Diagnosis (one article), strategy call (legal pages); (2) **duration** — the site states none (owner-blocked), Calendly states 30 min, one article says 20 min and another link in the same article says 30 min for the same event; (3) the Calendly profile blurb uses the pre-programme "performance marketing … drive results" positioning.
>
> **Promised outcomes (flagged; not established by the booking flow):** `/schedule-call` promises "You will leave with a view on where the problem probably sits" and "a view on which of four things is most likely losing you enquiries… and what you would check next" — a conversational outcome, explicitly **not** a pitch, audit or qualification interview. The booking flow itself establishes only a 30-minute slot. Beyond that, the **Calendly event** promises to "analyze your digital presence… tailor strategies… actionable insights", and `/privacy-policy` lists "Provide marketing recommendations" and "Prepare proposals" as uses of data — none established by the booking flow and partly in tension with "not an audit". The blog's "Growth Diagnosis" label implies a diagnostic deliverable. No wording promises a result or a guaranteed proposal.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| PAGE-058 | "The booking page" — primary booking control (opens a new tab; click emits the diagnostic event `meeting_started`, not a conversion) | Open the booking page | `https://calendly.com/mappedskills` | External 200 — Calendly profile page (not an embed) | Booking — the external booking surface | **REVIEW** — Routing is correct (the only direct Calendly link on the site outside blog bodies). Owner decisions needed: (1) **canonical Calendly URL** — this profile page lists one event and needs one extra click, whereas blog articles deep-link `…/client-discovery` (BLOG-062/069); (2) the **destination's own copy** (Calendly-hosted, third-party configuration) conflicts with this page: event "Client Discovery Call" promises to "analyze your digital presence, and tailor strategies… actionable insights", and the profile blurb offers "bespoke performance marketing solutions designed to drive results" — while `/schedule-call` says the call is not a pitch and not an audit. Flagged only; Calendly not altered. | **CHANGE BOOKING DESTINATION → `https://calendly.com/mappedskills/client-discovery`** (canonical direct Calendly event URL for "Client Discovery Call", 30 minutes; verified read-only 2026-09-19) — owner, 2026-09-19. Not implemented |
| PAGE-059 | "What you get from it either way" | the five checks are published in full | `/problems/traffic-but-no-enquiries` | Internal 200 | Self-serve diagnostic alternative to booking | KEEP | **KEEP** — owner, 2026-09-19 |
| PAGE-060 | "Or write instead" — "The form reaches the same place." | Tell us what you’re trying to fix | `/contact` | Internal 200 | Enquiry (equal alternative route) | KEEP — enquiry intent → `/contact`; the only route back to an enquiry surface. | **KEEP** — owner, 2026-09-19 |

### 3.10 `/thank-you`

Shared navigation: same as approved global baseline — no page-specific deviation.

> **`/thank-you` review (2026-09-19) — read-only.** The contact form was not submitted, no lead was generated, no analytics event was triggered and `/thank-you` was not changed. Analytics behaviour below is from the canonical source.
>
> - **State (VERIFIED FACT):** HTTP 200 · **`noindex, nofollow`** (set in `app/(pages)/thank-you/page.tsx` metadata) · canonical `https://mappedskills.com/thank-you` (self) · **not in `sitemap.xml`** (excluded in `app/sitemap.ts`) · title "Your Enquiry Has Arrived | MappedSkills" · H1 "Your enquiry has arrived."
> - **Reachability:** **no ordinary navigation reaches it.** The complete crawl found **zero** incoming links; it is in no header, footer, menu or sitemap (the approved IA: "`/thank-you` … never appear[s] in navigation"). It is reached only by the successful-enquiry flow (`ContactForm.tsx` → `router.push('/thank-you')` after `POST /api/enquiry` returns OK) or by typing the URL directly.
> - **Links on the page:** one page-specific link, PAGE-061 → `/how-it-works` (200). No 404s, redirects or routing issues. Plus the shared global navigation (see the observation below).
> - **Conversion safety (VERIFIED FROM SOURCE):** `lead_form_submitted` has **exactly one emitter** in the codebase — `ContactForm.tsx:454`, inside the submit handler, **only after the server responds OK** (`DEC-021`: "emitted only after server-confirmed durable persistence"), via `trackOnce`, which suppresses repeats of the same submission's idempotency key per browser session (`sessionStorage`). **`/thank-you` contains no conversion code.** Its only analytics is the generic `page_view` from the site-wide `AnalyticsRouteListener`, and `DEC-021` / `lib/analytics.ts` record that a view of `/thank-you` is **not** a conversion. Therefore **refresh, direct visit, back-navigation to it, and clicking its link cannot emit `lead_form_submitted`** per the code. A new conversion requires a new successful form submission.
> - **Evidence basis:** the conversion-safety statements above rest on code inspection in this page review. This review makes no claim about, and does not supersede, the programme's separate analytics/consent verification records.
> - **Not establishable from the repository:** the GTM container configuration is not in the repository. Whether GTM/GA4 is separately configured to count a `/thank-you` page view as a conversion is **UNKNOWN** here. The recorded decision (`DEC-021`) is that it must not.
> - **Follow-up wording:** "Your enquiry has arrived." · "We have it. Nothing else is needed from you." · "While you wait — One thing worth reading." "While you wait" implies a reply is coming (consistent with `/contact`'s "our first reply") but states **no response time, meeting, proposal, audit, diagnosis or result**. The source records these as deliberately absent ("None of those is decided"). §2 "What happens next" and §3 "If it is urgent" (phone) are owner-blocked and render nothing.
> - **Observation, not a reopening:** the page's recorded architecture is "NO SECOND ASK", which is why the old footer CTA strip was removed (`Footer.tsx` comment). The **approved global header** (NAV-014 "Book a call", NAV-015 "Contact Us") still renders here, as on every page. Those clicks lead to the booking or enquiry surfaces; they do not themselves emit `lead_form_submitted`.

> Indexability flag: see **SEO-004** (§8) — not part of link implementation.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| PAGE-061 | "While you wait" — "One thing worth reading." | How we work, what we measure, and what we cannot tell you | `/how-it-works` | Internal 200 | Methodology — post-conversion reading; no second ask | KEEP — the page's single link, as designed ("NO SECOND ASK"). It cannot itself create a conversion. | **KEEP** — owner, 2026-09-19 |

### 3.11 `/faq`

Shared navigation: same as approved global baseline — no page-specific deviation.

> **`/faq` review (2026-09-19) — read-only; no FAQ content or schema changed.**
>
> - **State (VERIFIED FACT):** HTTP 200 · `index, follow` · canonical `https://mappedskills.com/faq` (self) · in `sitemap.xml` · title "Questions We Get Asked, Answered Plainly | MappedSkills" · H1 "Questions we get asked, answered plainly." · reached from footer "FAQ" (NAV-030) and the 404 page. 11 questions in 5 groups (Commercial, Outcome, Measurement, Fit, AI search) as native `<details>` accordions.
> - **Links:** 8 page-specific (4 inside answers, 2 in "Something not answered here", 2 closing CTAs). **No 404s, no redirects.** Every enquiry link → `/contact`, every booking link → `/schedule-call`.
> - **Same destination, materially different purpose:** `/how-it-works` — PAGE-063 (attribution limits, answering a specific question) vs PAGE-066 (the method in general). `/pricing` — PAGE-062 (the factor directions, answering "what changes that number") vs PAGE-067 (cost in general).
> - **Answer ↔ destination support (VERIFIED against the destination sources):** all four in-answer links lead to pages that cover the question (see each row).
> - **FAQ structured data vs visible content (VERIFIED, live):** one `FAQPage` JSON-LD block (plus the site-wide `Organization`). **11/11 questions identical.** 7 answers are word-for-word identical; 4 schema answers omit only the trailing link sentence ("Which way each factor pushes.", "The full list of what breaks, and why.", "The published definition.", "What that work involves."). The schema carries **no URLs and no claim absent from the visible page**. This is by design: the schema is built from the same `plain` field as the page (`app/(pages)/faq/page.tsx`). **No material discrepancy.**
> - **Claims review (links and surrounding wording):**
>   - *Guarantees:* none offered. The page explicitly refuses them ("Why won't you guarantee results?"; "We do not promise rankings, positions in AI answers, a number of enquiries, revenue, or a return on spend").
>   - *Unsupported services / client proof:* none. No case study, client, testimonial or client result is cited.
>   - *Results:* the AI-search answer cites MappedSkills' **own** first-party measurement (28 runs, zero appearances, directories in 15), which is the programme's recorded Session 04 dataset, not client proof. Timelines ("Organic search: 12 months and beyond"; "Paid search: weeks"; "A broken enquiry path: days … the cheapest result you will get from us") are stated positions, not guarantees.
>   - *Pricing commitments:* none. The cost answer gives factors only, no figure or package.
>   - *Attribution:* consistent with the approved methodology (source recorded at the moment of enquiry; cross-device, declined consent, phone and email shown as unattributed).
>   - **⚠ Capability-accuracy flag (content, not routing) — PAGE-064's answer (owner-recorded §0.11: QUALIFICATION CAPABILITY CLAIM — CHANGE REQUIRED LATER):** "**The system decides, automatically, at the moment the enquiry arrives, against five checks**". The repository shows this is **not fully implemented**: `db/migrations/001_create_enquiries.sql` deliberately has **no `qualification_status`**, because the fifth condition (deduplication window) is "deliberately unset" and "a column asserting `qualified` … would be a fabricated verdict". The form reports `qualification_status: 'not_evaluated'`. The same "checked automatically at the moment it arrives" wording is on `/lead-generation` (its source of truth), so the flag is **carried to the `/lead-generation` review**. Not rewritten.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| PAGE-062 | FAQ answer (Commercial) — "What does this cost, and what changes that number?" | Which way each factor pushes | `/pricing` | Internal 200 | Pricing clarification — the six cost factors | KEEP — `/pricing` publishes the six factors and the direction each pushes, which is exactly what the answer defers to. | **KEEP** — owner, 2026-09-19 (`/faq KEEP-ALL`) |
| PAGE-063 | FAQ answer (Measurement) — "How do you know an enquiry came from your work, and what can't you tell?" | The full list of what breaks, and why | `/how-it-works` | Internal 200 | Attribution limits (methodology) | KEEP — `/how-it-works` lists the same breaks (cross-device, declined consent, phone/email) in its "what cannot be attributed" section. | **KEEP** — owner, 2026-09-19 (`/faq KEEP-ALL`) |
| PAGE-064 | FAQ answer (Measurement) — "What counts as a qualified enquiry here, and who decides?" | The published definition | `/lead-generation` | Internal 200 | Qualified-enquiry definition | KEEP (routing) — `/lead-generation` publishes the five conditions. **Content-accuracy flag carried to the `/lead-generation` review:** the surrounding answer says "The system decides, automatically, at the moment the enquiry arrives, against five checks"; see the §3.11 notes. | **KEEP (routing only)** — owner, 2026-09-19 (`/faq KEEP-ALL`); separate flag: QUALIFICATION CAPABILITY CLAIM — CHANGE REQUIRED LATER (§0.11) |
| PAGE-065 | FAQ answer (AI search) — "Can you get our business into ChatGPT and AI answers?" | What that work involves | `/ai-seo` | Internal 200 | Service discovery — AI search | KEEP — `/ai-seo` describes the same three work areas (entity accuracy, the sources answers draw on, quotable content). | **KEEP** — owner, 2026-09-19 (`/faq KEEP-ALL`) |
| PAGE-066 | "Something not answered here" — "Then it is worth asking directly." | the method is published in full | `/how-it-works` | Internal 200 | Methodology (general) | KEEP | **KEEP** — owner, 2026-09-19 (`/faq KEEP-ALL`) |
| PAGE-067 | "Something not answered here" | what moves the number is set out here | `/pricing` | Internal 200 | Pricing (general) | KEEP | **KEEP** — owner, 2026-09-19 (`/faq KEEP-ALL`) |
| PAGE-068 | Closing CTA — "Ask the one that matters to you" | Tell us what you're trying to fix | `/contact` | Internal 200 | Enquiry (primary) | KEEP | **KEEP** — owner, 2026-09-19 (`/faq KEEP-ALL`) |
| PAGE-069 | Closing CTA — "Ask the one that matters to you" | Book a call | `/schedule-call` | Internal 200 | Booking (secondary) | KEEP | **KEEP** — owner, 2026-09-19 (`/faq KEEP-ALL`) |

### 3.12 `/seo`

Shared navigation: same as approved global baseline — no page-specific deviation.

> **`/seo` review (2026-09-19) — routing architecture only; no content changed.**
>
> - **State (VERIFIED FACT):** HTTP 200 · `index, follow` · canonical `https://mappedskills.com/seo` (self) · in `sitemap.xml` · title "SEO Judged on the Enquiries It Produces | B2B & Enterprise SEO | MappedSkills" · H1 "SEO that is judged on the enquiries it produces." · reached from the header Services menu (NAV-008), footer (NAV-022), `/`, `/services`, `/ai-seo`, `/lead-generation`, `/problems/…` and blog bodies (via the legacy redirect `/seo-services/`).
> - **Page-specific links:** 11 placements → 9 rows, **all internal, all 200 on the first request. No 404s, no redirects, no external links, no `/work` or case-study link, no `/pricing` link.**
> - **Links by destination:** `/contact` PAGE-072 (×2) · `/schedule-call` PAGE-073 (×2) · `/how-it-works` PAGE-076 · `/ai-seo` PAGE-075 · `/problems/traffic-but-no-enquiries` PAGE-074, PAGE-077 · `/services` PAGE-071, PAGE-078 · `/` PAGE-070 · `/pricing`, `/lead-generation`, `/work`, case studies, other service pages: **none**.
> - **Duplicated destinations at materially different stages:** `/contact` and `/schedule-call` — hero (entry, before any argument) vs close ("Start with what you can see today", after scope, timeline and measurement). `/problems/…` — PAGE-074 (entry: the visitor recognises the situation) vs PAGE-077 (objection: "We tried SEO and nothing happened"). `/services` — PAGE-071 (breadcrumb navigation) vs PAGE-078 (conceptual "the whole system this sits inside").
> - **Destination support (VERIFIED against destination sources):** every link's destination supports the surrounding claim or next step (see rows).
> - **Guarantees and claims around links:** none. The page explicitly refuses them: "We do not promise rankings or positions. We do not promise traffic figures. We do not quote search volume, keyword difficulty or cost-per-click numbers"; "Can you guarantee rankings? No." No enquiry, revenue or ROI promise. **No client result, case study or testimonial** is cited, so the owner permission facts (§0.6) are not engaged on this page. **No proprietary technology or automated capability** is claimed. The only evidence cited is MappedSkills' own first-party AI-visibility measurement (28 runs, zero appearances), stated with its limits ("Counts, not rates; one day, not a trend").
> - **Observation (content, not routing):** that AI-visibility note sits in the section "How you will know whether it worked" (enquiry measurement), directly above the `/how-it-works` link, as evidence that "we ran it on our own site first". It is first-party and supported, but it evidences AI-visibility measurement, not the enquiry-attribution method the section describes. Noted only.
> - **Service architecture:** every capability named (search, technical SEO, content, landing/enquiry path, migration/equity protection, measurement) sits inside the existing `/seo` scope or links to an existing page. No link or wording offers a service without a corresponding page.
> - **Observation (metadata positioning, not a link):** the title targets "**B2B & Enterprise SEO**". "enterprise seo" is an approved search target for `/seo` (`SEARCH_ARCHITECTURE.md` P2, `DEC-010`), but `ICP.md` lists "Enterprises with mature in-house teams and formal procurement" as **out of scope** for now ("a proof-deficit constraint, not a permanent exclusion"). Tension recorded for the owner; not a routing decision.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| PAGE-070 | Breadcrumb (current page label "Search") | Home | `/` | Internal 200 | Return home (breadcrumb) | KEEP | **KEEP** — owner, 2026-09-19 (`/seo KEEP-ALL`) |
| PAGE-071 | Breadcrumb | What we do | `/services` | Internal 200 | Navigation — service hub (breadcrumb) | KEEP | **KEEP** — owner, 2026-09-19 (`/seo KEEP-ALL`) |
| PAGE-072 | Hero CTA (entry) + Closing CTA — "Tell us what search is currently doing for you" / "Start with what you can see today." | Tell us what you’re trying to fix | `/contact` | Internal 200 | Enquiry (primary) — at entry, and again after the full case has been made | KEEP — enquiry → `/contact`. Same wording at two materially different stages (see §3.12 notes). | **KEEP** — owner, 2026-09-19 (`/seo KEEP-ALL`) |
| PAGE-073 | Hero CTA + Closing CTA | Book a call | `/schedule-call` | Internal 200 | Booking (secondary) | KEEP | **KEEP** — owner, 2026-09-19 (`/seo KEEP-ALL`) |
| PAGE-074 | Body — "The situation this is usually bought to fix" (ranking/sessions arrive, enquiries do not) | If you have the traffic and not the enquiries, start here | `/problems/traffic-but-no-enquiries` | Internal 200 | Problem diagnosis — entry-stage self-identification | KEEP — destination is the four-cause diagnostic for exactly this situation. | **KEEP** — owner, 2026-09-19 (`/seo KEEP-ALL`) |
| PAGE-075 | Body — "How long this takes, and what we will not promise" ("what we found is set out on the AI search page") | Where AI search genuinely fits | `/ai-seo` | Internal 200 | Adjacent service — AI search, and the own-site findings | KEEP — `/ai-seo` does set out the own-site measurement ("Across 28 unbranded runs, we appeared zero times"), as the surrounding sentence promises. | **KEEP** — owner, 2026-09-19 (`/seo KEEP-ALL`) |
| PAGE-076 | Body — "How you will know whether it worked" | The method, including what cannot be attributed | `/how-it-works` | Internal 200 | Measurement methodology and attribution limits | KEEP | **KEEP** — owner, 2026-09-19 (`/seo KEEP-ALL`) |
| PAGE-077 | Body — "The three questions we get asked here" (after "We tried SEO and nothing happened") | Which of the four it is, and how to check | `/problems/traffic-but-no-enquiries` | Internal 200 | Problem diagnosis — objection-stage | KEEP | **KEEP** — owner, 2026-09-19 (`/seo KEEP-ALL`) |
| PAGE-078 | Body — "The three questions we get asked here" ("Above this page:") | the whole system this sits inside | `/services` | Internal 200 | Service hub — system context | KEEP | **KEEP** — owner, 2026-09-19 (`/seo KEEP-ALL`) |

### 3.13 `/ai-seo`

Shared navigation: same as approved global baseline — no page-specific deviation.

> **`/ai-seo` review (2026-09-19) — routing architecture and claim support only; no content changed.**
>
> - **State (VERIFIED FACT):** HTTP 200 · `index, follow` · canonical `https://mappedskills.com/ai-seo` (self) · in `sitemap.xml` · title "AI Search: Why Your Business Is Not in the Answer | MappedSkills" · H1 "AI search: why your business is not in the answer, and what actually moves it." · **not in shared navigation today**; owner-approved to be added (NAV-016 header, NAV-041 footer; not implemented). Reached from `/`, `/services`, `/faq`, `/seo` and the 404 page.
> - **Links:** 8 placements → 6 rows, **all internal, all 200 on the first request. No 404s, no redirects, no external links.** The embedded `CrawlerTable` and `AiLayers` components contain **no links**.
> - **Links by destination:** `/contact` PAGE-081 (×2) · `/schedule-call` PAGE-082 (×2) · `/seo` PAGE-083 · `/services` PAGE-080, PAGE-084 · `/` PAGE-079 · `/how-it-works`, `/pricing`, `/lead-generation`, `/work`, case studies: **none** · external AI/search resources: **none linked**.
> - **Named but not linked:** ChatGPT, Claude, Grok (text); Ahrefs, Semrush (text); crawler tokens Google-Extended, OAI-SearchBot, Claude-SearchBot, PerplexityBot and others (`CrawlerTable`). No external link is needed for the commercial journey, and none is proposed.
> - **Duplicated destinations at materially different stages:** `/contact` and `/schedule-call` — hero (entry) vs close (after the page has sized AI search as "today a small one" and said it is not where to start if ordinary search is failing). `/services` — breadcrumb vs "Above it: the whole system".
> - **Destination support:** both contextual links are supported (`/seo` is the organic-search service; `/services` is the system hub).
>
> **Own-site evidence — reconciled against the recorded Session 04 baseline (`docs/04-ai-visibility/`):**
>
> | Page claim | Recorded evidence | Status |
> |---|---|---|
> | "Across 28 unbranded runs, we appeared zero times" | `AI_VISIBILITY_BASELINE.md` §1, §4: 28 unbranded runs, zero appearances (AI Mode 19, ChatGPT 2, Perplexity 3, Gemini 1, AI Overviews 3) | **Supported** |
> | "On four systems, on one day, from Pune, in English, signed out" | Baseline lens: India/Pune, English, all signed out, 2026-08-31; six systems named, Claude and Grok **not testable** → four | **Supported** |
> | "In 8 branded runs … 7 described us substantially accurately" | Baseline §1: 7 of 8 branded runs substantially accurate | **Supported** |
> | "Directory and listing sources appeared in 15 of those 28 unbranded runs" | `AI_STRATEGIC_VALIDATION.md`: Semrush Agency Partners (10) + Clutch (5) together in 15 of 28 | **Supported** |
> | "ChatGPT stated … it had chosen the brands … by reading two directories. We are listed on neither." | `AI_CITATION_RESEARCH.md` §1: "by reading two directories"; profile on neither | **Supported** |
> | "Our own site is fully readable by the retrieval crawlers, our `robots.txt` blocks none of them" | Baseline §9: full server-rendered HTML served to `OAI-SearchBot` and `ClaudeBot`; `robots.txt` allows all crawlers (still true of the live `robots.ts`) | **Supported** |
> | "two agencies in this city that sell exactly that did not appear either" | Baseline §6.2: upGrowth 0, SEOTonic 0; both Pune, both sell GEO/AI visibility (`COMPETITOR_RESEARCH.md`) | **Supported, and caveated on the page** ("one signed-out sample on one day and not a verdict on them") |
> | "membership was often stable inside one system, and the order changed in every repeated prompt" | Baseline §7: membership stability prompt-dependent (near-total to ~40%); order changed in every repeat | **Supported** |
> | "Claude and Grok … could not be tested at all" | Baseline: NOT TESTABLE | **Supported** |
>
> **Claim classes (as the page states them):**
> - **Measured facts:** the rows above.
> - **Observations/inferences:** "it does suggest that selling the terminology is not the same as having the mechanism" (the page marks it as suggestion; the baseline labels it **INFERENCE (not proven)**); "those answers are built from sources you are not on" (stated as the diagnosis, but it rests on the same inference); "Discovery through AI assistants is real and it is growing … still much smaller than ordinary search" (**no source cited on the page or located in this review**; the page itself refuses share figures).
> - **Service capabilities:** access check; entity accuracy; off-site source authority; citable pages; "Measurement, per system … You get frequency across runs, per system, never blended — and the sources". **Capability status:** the method was applied **once, to MappedSkills' own site** (one round, one day). `AI_MEASUREMENT_FRAMEWORK.md` records that full multi-system coverage "is a paid input with a real recurring cost, and any MappedSkills service must price it in". No tooling selection or pricing for client measurement is recorded. The page does **not** claim automated or continuous monitoring. **Flagged for the owner as a delivery-capability question; not a routing issue.**
> - **Predictions/expectations:** "It takes an afternoon" (access check); "If your enquiries have to improve this quarter, this is not the work that does it".
>
> **Guarantee / control language:** the page **refuses** inclusion, citations, mentions, positions and changes explicitly ("Can you get us into ChatGPT? No"; not-promised list: appearance, "a mention, a citation or a recommendation", "a position", "an improvement, a decline or a percentage change"; "the mechanism is largely outside anyone’s site"). No ranking, traffic, enquiry, revenue or ROI promise. **No client proof**, so the owner permission facts (§0.6) are not engaged. No proprietary technology claimed. **One wording to note:** the H1 "…and what actually moves it" asserts a known lever, which the evidence supports only as an inference (directories and listings co-occurring with appearances). The page does not claim MappedSkills controls inclusion.
>
> **Third-party claim not supported by repository evidence (flag):** "Ahrefs and Semrush give me a checker for free" / "the reporting part is available to you for nothing". The repository records the **Semrush AI Visibility Toolkit at "$99/mo per domain billed annually"** (`AI_MEASUREMENT_FRAMEWORK.md`) and records no free Ahrefs or Semrush AI checker. Whether free checkers exist is **UNVERIFIED** here. Content, not routing.
>
> **Terminology (VERIFIED):** visible naming is consistent — "AI search" (eyebrow, breadcrumb, H1, title "AI Search"), matching the homepage, `/services`, `/faq` and the owner-approved nav label "AI Search" (NAV-016/NAV-041). "AI visibility" appears only in "There is no AI visibility score here" (naming the metric it refuses). "Getting into ChatGPT" appears only as a question the page answers "No". GEO/AEO/"generative engine optimisation" are not used here (the FAQ calls the acronyms "mostly a way of selling the same work twice"). The only divergence is the **URL slug `/ai-seo`** against the visible name "AI search". The slug is the approved route (`DEC-010` IA) and the IA's naming rule is buyer-facing "AI search", never GEO/AEO/LLMO. **No material inconsistency**; capitalisation "AI Search"/"AI search" varies by context only.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| PAGE-079 | Breadcrumb (current page label "AI search") | Home | `/` | Internal 200 | Return home (breadcrumb) | KEEP | **KEEP** — owner, 2026-09-19 (`/ai-seo KEEP-ALL`) |
| PAGE-080 | Breadcrumb | What we do | `/services` | Internal 200 | Navigation — service hub (breadcrumb) | KEEP | **KEEP** — owner, 2026-09-19 (`/ai-seo KEEP-ALL`) |
| PAGE-081 | Hero CTA (entry) + Closing CTA — "Where this sits in the rest of the work" / "One discovery surface, and today a small one." | Tell us what you’re trying to fix | `/contact` | Internal 200 | Enquiry (primary) — at entry, and again after the page has sized AI search as a small surface | KEEP — enquiry → `/contact`; same wording at two materially different stages. | **KEEP** — owner, 2026-09-19 (`/ai-seo KEEP-ALL`) |
| PAGE-082 | Hero CTA + Closing CTA | Book a call | `/schedule-call` | Internal 200 | Booking (secondary) | KEEP | **KEEP** — owner, 2026-09-19 (`/ai-seo KEEP-ALL`) |
| PAGE-083 | "The questions we get asked here" — "Across from this page:" | the organic search work | `/seo` | Internal 200 | Adjacent service — organic search (the larger surface the close refers to) | KEEP — `/seo` is the organic search service page. | **KEEP** — owner, 2026-09-19 (`/ai-seo KEEP-ALL`) |
| PAGE-084 | "The questions we get asked here" — "Above it:" | the whole system | `/services` | Internal 200 | Service hub — system context | KEEP | **KEEP** — owner, 2026-09-19 (`/ai-seo KEEP-ALL`) |

### 3.14 `/google-ads`

Shared navigation: same as approved global baseline — no page-specific deviation.

> **`/google-ads` review (2026-09-19) — routing architecture and claim support only; no content changed.**
>
> - **State (VERIFIED FACT):** HTTP 200 · `index, follow` · canonical `https://mappedskills.com/google-ads` (self) · in `sitemap.xml` · title "Google Ads Measured on the Enquiries, Not the Clicks | MappedSkills" · H1 "Google Ads, measured on the enquiries rather than the clicks." · in shared navigation (NAV-005 header, NAV-019 footer).
> - **Links:** 10 placements → 8 rows, **all internal, all 200 on the first request. No 404s, no redirects, no external links, no Google/Google Ads resource links.**
> - **Links by destination:** `/contact` PAGE-087 (×2) · `/schedule-call` PAGE-088 (×2) · `/how-it-works` PAGE-089 · `/lead-generation` PAGE-092 · `/services` PAGE-086, PAGE-091 · `/problems/traffic-but-no-enquiries` PAGE-090 · `/` PAGE-085 · `/pricing`, `/conversion-optimization`, `/work`, case studies: **none**.
> - **Duplicated destinations at materially different stages:** `/contact` and `/schedule-call` — hero (entry) vs close (asks what the account spends, what it gets, and whether the source can currently be told). `/services` — breadcrumb vs "Related: the whole system".
> - **Destination support:** all eight supported (see rows).
>
> **Results/proof statements:**
> - **Client evidence:** **none.** No client, case study, testimonial or client figure appears; the owner permission facts (§0.6) are not engaged, and `DEC-012` is not triggered by any figure on this page.
> - **Quantitative claims (ROAS, ROI, revenue, sales, conversion rate, CPL/CPA, enquiry volume, % improvement):** **none asserted.** They appear only as **refusals**: not promised — "a return on ad spend", "a cost per enquiry", "a cost per lead", "a number of enquiries per month"; "We do not report ROI." Revenue appears only as client-supplied reporting: "Where you supply close data, we report the revenue your own system recorded against the enquiries, and state what we did not control." No guaranteed performance.
> - **MappedSkills methodology:** baseline first; enquiries and qualified enquiries by campaign; phone-originated enquiries shown as unattributed.
> - **General marketing statements:** "irrelevant matches are where a budget quietly goes"; "A campaign pointed at a page that does not [answer the search] is the most common way spend disappears without a trace" (stated as experience, not evidenced).
> - The close heading "What you spend, and what you get back." frames the visitor's own current numbers ("what you spend, what you are getting") and is not a return claim.
>
> **Capability / consent flags (content, not routing — for owner attention):**
> 1. **Server-side Google Ads conversion recording — capability not established by the repository.** Scope item: "Conversions recorded server-side against the enquiry itself, not a thank-you page view or a button click." For MappedSkills' own stack, `lib/attribution.ts` records that ad click identifiers (`gclid`, `wbraid`, `gbraid`) are **discarded by design**, and states: "**offline conversion import into Google Ads or Meta is NOT possible with what is stored**. That capability requires the identifier, and therefore requires an explicit owner decision with the consent question". `EVENT_TAXONOMY.md` §6 lists as open: server-side analytics vendor "**No vendor selected**", and "**Whether server-side conversion events are consent-gated — Legal review required**". The approved consent configuration keeps `ad_storage`, `ad_user_data` and `ad_personalization` denied. No documented delivery method for server-side conversions in *client* Google Ads accounts was located. The principle (not counting thank-you views or clicks) matches `DEC-021`; the ads-platform capability does not have repository support.
> 2. **"Enquiries and qualified enquiries by campaign"** relies on a qualified-enquiry verdict, which the repository shows is not currently evaluated or persisted: see **QUALIFICATION CAPABILITY CLAIM — CHANGE REQUIRED LATER** (§0.11). "By search term where the data allows it": `utm_term` is stored first-party on the enquiry row (`lib/attribution.ts`), which supports the caveated wording for tagged campaigns (a keyword/term parameter, not the raw search query).
> 3. **Fee commitment rests on pending owner input.** *(Resolved 2026-09-19 by owner fact — "Custom quoted fee"; see §0.14.)* "The fee is never expressed as a percentage of spend in a way that rewards spending more", and spend and fee "stated as separate things on every invoice and in every report", are approved copy (`DEC-014`; `copy/google-ads.md` Move 5). The underlying arrangement is `[OWNER INPUT REQUIRED — how the management fee is separated from ad spend, and whether spend is billed through MappedSkills or paid directly to Google]` (renders nothing live), still listed open in `OWNER_INPUT_REGISTER.md` and `ASSUMPTIONS_AND_OPEN_QUESTIONS.md`.
>
> **Attribution limits vs the documented method:** consistent. Phone-after-ad enquiries are stated as usually unattributable and "shown as unattributed rather than assigning it to paid". Consent and cross-device gaps are not restated here but are covered by the linked `/how-it-works` (PAGE-089). No promise conflicts with them, beyond flag 1's consent question for ads-platform conversions.
>
> **Account-management scope** (structure, search terms, negatives, match types, copy, extensions, bidding, budget pacing, landing experience, enquiry path) is standard paid-search management within the approved `/google-ads` service. No proprietary bidding technology or automation is claimed.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| PAGE-085 | Breadcrumb (current page label "Paid search") | Home | `/` | Internal 200 | Return home (breadcrumb) | KEEP | **KEEP** — owner, 2026-09-19 (`/google-ads KEEP-ALL`) |
| PAGE-086 | Breadcrumb | What we do | `/services` | Internal 200 | Navigation — service hub (breadcrumb) | KEEP | **KEEP** — owner, 2026-09-19 (`/google-ads KEEP-ALL`) |
| PAGE-087 | Hero CTA (entry) + Closing CTA — "Tell us what the account is doing now" / "What you spend, and what you get back." | Tell us what you’re trying to fix | `/contact` | Internal 200 | Enquiry (primary) — at entry, and again with account-specific guidance on what to send | KEEP — enquiry → `/contact`; same wording at two materially different stages. | **KEEP** — owner, 2026-09-19 (`/google-ads KEEP-ALL`) |
| PAGE-088 | Hero CTA + Closing CTA | Book a call | `/schedule-call` | Internal 200 | Booking (secondary) | KEEP | **KEEP** — owner, 2026-09-19 (`/google-ads KEEP-ALL`) |
| PAGE-089 | "What you will actually see" — after the phone-enquiry unattributed statement | The method, including what cannot be attributed | `/how-it-works` | Internal 200 | Measurement methodology and attribution limits | KEEP — `/how-it-works` covers the unattributed classes the paragraph names (phone), plus consent and cross-device. | **KEEP** — owner, 2026-09-19 (`/google-ads KEEP-ALL`) |
| PAGE-090 | "What you will actually see" — "Related:" | if the clicks arrive and the enquiries do not | `/problems/traffic-but-no-enquiries` | Internal 200 | Problem diagnosis | KEEP | **KEEP** — owner, 2026-09-19 (`/google-ads KEEP-ALL`) |
| PAGE-091 | "What you will actually see" — "Related:" | the whole system | `/services` | Internal 200 | Service hub — system context | KEEP | **KEEP** — owner, 2026-09-19 (`/google-ads KEEP-ALL`) |
| PAGE-092 | "What you will actually see" — "Related:" (section heading "Qualified enquiries, separated from total enquiries.") | the enquiries themselves | `/lead-generation` | Internal 200 | Qualified-enquiry definition / enquiry service | KEEP (routing) — `/lead-generation` publishes the qualified-enquiry definition the section relies on. See the capability note on "qualified enquiries by campaign" in §3.14. | **KEEP (routing only)** — owner, 2026-09-19 (`/google-ads KEEP-ALL`); capability flag: QUALIFIED ENQUIRIES BY CAMPAIGN — CHANGE REQUIRED LATER (§0.14) |

### 3.15 `/social-media-ads`

Shared navigation: same as approved global baseline — no page-specific deviation.

> **`/social-media-ads` review (2026-09-19) — routing architecture and claim support only; no content changed.**
>
> - **State (VERIFIED FACT):** HTTP 200 · `index, follow` · canonical `https://mappedskills.com/social-media-ads` (self) · in `sitemap.xml` · title "Paid Social, Judged on the Enquiries It Produces | MappedSkills" · H1 "Paid social, judged on the enquiries it produces." · in shared navigation (NAV-006 header, owner-approved KEEP; NAV-020 footer).
> - **Links:** 9 placements → 7 rows, **all internal, all 200 on the first request. No 404s, no redirects, no external links, no Meta/Facebook/Instagram resource links.** (The footer's Facebook/Instagram profile links are shared navigation — NAV-039 OPEN, NAV-040 KEEP — not page-specific.)
> - **Links by destination:** `/contact` PAGE-095 (×2) · `/schedule-call` PAGE-096 (×2) · `/how-it-works` PAGE-097 · `/google-ads` PAGE-098 · `/services` PAGE-094, PAGE-099 · `/` PAGE-093 · `/pricing`, `/lead-generation`, `/conversion-optimization`, `/work`, case studies: **none**.
> - **Duplicated destinations at materially different stages:** `/contact` and `/schedule-call` — hero (entry) vs close (asks what paid social costs, what it brings, and whether it turns into enquiries). `/services` — breadcrumb vs "Related: the whole system".
> - **Destination support:** all seven supported (see rows).
>
> **Results/proof statements:**
> - **Client evidence:** **none.** No client, case study, testimonial or client figure. The owner permission facts (§0.6) are not engaged here and `DEC-012` is not triggered. (Cross-reference only: the five missing social-ads case studies linked from `/blog/facebook-advertising-agency-pune` — BLOG-073 to BLOG-077 — are not linked from this page.)
> - **Quantitative claims (ROAS/ROI, revenue/sales, conversion rate, CPL/CPA, enquiry volume, % improvement, guaranteed performance):** **none.** No number of any kind appears. The close heading "What it costs, and what it brings." asks for the visitor's own current numbers; it is not a claim.
> - **Methodology / refusals:** accountability "for the enquiries it produces rather than for reach, clicks or engagement"; "**We do not claim one channel outperforms another for your business.** Nothing has been measured on your account yet".
> - **General marketing statements (judgement, unevidenced):** "For something a buyer takes weeks to decide on, it frequently is [the wrong channel]"; "Paid social is the easiest channel to be flattered by"; "the same budget works harder in search" (stated as "Our judgement").
>
> **Meta measurement claims vs what is established (VERIFIED FROM SOURCE/RECORD):**
> - **Page claim:** "The same conversion measurement as every other source: **recorded server-side against the enquiry itself**, and reported as enquiries rather than as engagement."
> - **Supported part:** each enquiry is persisted server-side with its attribution. A Meta click's `fbclid` **presence** derives the channel `facebook/paid_social` (`lib/attribution.ts`), so enquiries **can** be reported by paid-social source on MappedSkills' own first-party record.
> - **Not established:** reporting conversions **to Meta**. The `fbclid` value is discarded by design ("offline conversion import into Google Ads or Meta is NOT possible with what is stored"). **No Meta Conversions API** implementation exists in the codebase. The **Meta Pixel is "NOT ACTIVATED — optional and owner-deferred"** (`CURRENT_STATE.md`; consent-gated in `lib/meta-pixel.tsx`). Whether server-side conversion events are consent-gated remains a **legal-review** item (`EVENT_TAXONOMY.md` §6). Consent keeps `ad_storage` / `ad_user_data` / `ad_personalization` denied.
> - **Remarketing / custom audiences / pixel-based optimisation:** **not claimed** on this page ("Audience definition" only). No wording depends on the inactive pixel.
> - **Flag (content/capability, not routing):** the "recorded server-side" sentence does not distinguish the supported first-party enquiry record from ad-platform conversion reporting, which is not established. It parallels **`GOOGLE ADS SERVER-SIDE CONVERSION CLAIM — CHANGE REQUIRED LATER`** (§0.14).
>
> **Fee / pricing:** **no fee or pricing claim on this page.** The Google Ads "custom quoted fee" owner fact (§0.14) is **not** assumed to apply to paid-social management, and nothing here requires it.
>
> **Service boundary relevant to pending decisions (VERIFIED FACT, cross-reference only):** this page states "**We do not do social media management, content calendars, community management, or brand-building campaigns.**" Two pending blog 404 decisions ask whether MappedSkills offers organic social media management — BLOG-020 ("managing content across platforms") and BLOG-039 ("social media presence") → `/social-media-management`. The owner still decides those rows; this approved page copy is evidence for that decision.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| PAGE-093 | Breadcrumb (current page label "Paid social") | Home | `/` | Internal 200 | Return home (breadcrumb) | KEEP | **KEEP** — owner, 2026-09-19 (`/social-media-ads KEEP-ALL`) |
| PAGE-094 | Breadcrumb | What we do | `/services` | Internal 200 | Navigation — service hub (breadcrumb) | KEEP | **KEEP** — owner, 2026-09-19 (`/social-media-ads KEEP-ALL`) |
| PAGE-095 | Hero CTA (entry) + Closing CTA — "Tell us what you are running now" / "What it costs, and what it brings." | Tell us what you’re trying to fix | `/contact` | Internal 200 | Enquiry (primary) — at entry, and again with guidance on what to send about current campaigns | KEEP — enquiry → `/contact`; same wording at two materially different stages. | **KEEP** — owner, 2026-09-19 (`/social-media-ads KEEP-ALL`) |
| PAGE-096 | Hero CTA + Closing CTA | Book a call | `/schedule-call` | Internal 200 | Booking (secondary) | KEEP | **KEEP** — owner, 2026-09-19 (`/social-media-ads KEEP-ALL`) |
| PAGE-097 | "When we would tell you not to do this" — after "When there is no reliable way to measure what the spend produced" | The method, including what cannot be attributed | `/how-it-works` | Internal 200 | Measurement methodology and attribution limits | KEEP — `/how-it-works` sets out what can and cannot be attributed, which the surrounding boundary depends on. | **KEEP** — owner, 2026-09-19 (`/social-media-ads KEEP-ALL`) |
| PAGE-098 | "Related:" note after the boundary ("the same budget works harder in search") | paid search as the alternative source | `/google-ads` | Internal 200 | Alternative service — paid search | KEEP — matches the boundary's stated judgement that, for considered purchases, search is usually the better channel. | **KEEP** — owner, 2026-09-19 (`/social-media-ads KEEP-ALL`) |
| PAGE-099 | "Related:" note | the whole system | `/services` | Internal 200 | Service hub — system context | KEEP | **KEEP** — owner, 2026-09-19 (`/social-media-ads KEEP-ALL`) |

### 3.16 `/conversion-optimization`

Shared navigation: same as approved global baseline — no page-specific deviation.

> **`/conversion-optimization` review (2026-09-19) — routing architecture and claim support only; no content changed.**
>
> - **State (VERIFIED FACT):** HTTP 200 · `index, follow` · canonical `https://mappedskills.com/conversion-optimization` (self) · in `sitemap.xml` · title "Conversion Rate Optimization: Find Where Visits Are Lost | MappedSkills" · H1 "Turning visits into enquiries — after finding out where they are actually being lost." · breadcrumb label "The enquiry path" · in shared navigation as "Conversion Optimization" (NAV-009 header, NAV-023 footer; owner-approved KEEP).
> - **Links:** 9 placements → 7 rows, **all internal, all 200 on the first request. No 404s, no redirects, no external links, no CRO/testing/analytics tool links.** The embedded `ChainLossZones` figure (`components/commercial/ChainFigure.tsx`) contains no links.
> - **Links by destination:** `/contact` PAGE-102 (×2) · `/schedule-call` PAGE-103 (×2) · `/problems/traffic-but-no-enquiries` PAGE-104 · `/services` PAGE-101, PAGE-105 · `/how-it-works` PAGE-106 · `/` PAGE-100 · `/pricing`, `/lead-generation`, `/seo`, `/google-ads`, `/social-media-ads`, `/work`, case studies: **none**.
> - **Duplicated destinations at materially different stages:** `/contact` and `/schedule-call` — hero (entry) vs close ("What arrives, what converts, what you can measure", after the diagnosis-first order, scope and testing limits). `/services` — breadcrumb vs "Related: the whole system this sits inside".
> - **Destination support:** all seven supported (see rows).
>
> **Results/proof statements:**
> - **Client evidence:** **none.** No client, case study, testimonial or client figure. The owner permission facts (§0.6) are not engaged here and `DEC-012` is not triggered.
> - **Quantitative claims (conversion-rate or enquiry-rate improvement, % lifts, extra enquiries, revenue/ROI, A/B results, guaranteed performance):** **none.** They appear only as **refusals**: "no uplift figure attached"; "We do not publish conversion benchmarks, industry averages or typical uplifts. None exists in our evidence base"; "the number we answer for is enquiries you can act on, not a conversion rate".
> - **MappedSkills own-site evidence (supported):** "Our own contact form transmitted nothing, while showing visitors a success message … no analytics existed to make that visible." Supported by `CURRENT_CODEBASE_AUDIT.md` §12.5 (the old `/contact` → `ContactForm` → `setTimeout` path ended in "a simulated success message") and the programme's record of no production analytics at the time.
> - **Methodology:** diagnosis first; fixes in evidence order; "Built, not just recommended"; measured against a baseline captured first; a real submission "that we confirm arrives".
> - **General CRO principles (judgement):** "The brief is usually already a solution"; "in at least two of the four places demand gets lost, page-level conversion work is the wrong fix" (the page's own four-cause model, from `/problems/…`); "A recommendations deck that stops at the design is where most of this work fails".
>
> **Tooling/process claims:**
> - **A/B testing / significance:** stated **conditionally** — "Below the threshold: research, diagnosis, a change, and an observation afterwards … no uplift figure attached. Above the threshold: a real test, with the significance reported." This matches the **APPROVED DECISION** in `SERVICE_ARCHITECTURE.md` ("Below a real traffic and conversion threshold, this work is conversion research, diagnosis and design — not statistically valid A/B testing"; experimentation "Only where traffic volume can support statistical significance"). **Observation:** no testing tool, vendor or significance-testing procedure is recorded in the repository, so the above-threshold capability is described, not demonstrated. No threshold figure is stated. Noted only.
> - **Heatmaps, session recordings, user research tooling:** **not claimed.** "Research" appears only as part of the approved "research, diagnosis, a change" description.
>
> **Change vs rate vs causation:** the page distinguishes all three. Improving the enquiry path ("fixes that follow from it", including form, booking, delivery, notification, instrumentation) is kept separate from a conversion-rate claim ("not a conversion rate"), and below-threshold changes are reported as "a change, and an observation afterwards" with no causal uplift claimed.
>
> **Measurement/attribution:** no claim conflicts with the documented limits. The page links to `/how-it-works` for them (PAGE-106) and states it cannot show a pre/post comparison. **Time-sensitive wording (observation):** "We have no analytics history yet" was true when written. Production analytics first loaded on 2026-09-18 (`CURRENT_STATE.md`), so the statement will become inaccurate as history accumulates. Not changed.
>
> **Service architecture:** the page presents this work as **part of the system** ("It is not a separate service here. It is the second half of one outcome"), and its links support that (`/services` "the whole system", `/problems/…` diagnosis, `/how-it-works` measurement). **Observation:** it is simultaneously presented as a **standalone service entry** by the approved navigation label "Conversion Optimization" (NAV-009/NAV-023) and by the metadata ("Conversion Rate Optimization"; description "Conversion rate optimization services"). The metadata wording is outside body copy, which `CAPABILITY_LANGUAGE.md` governs. This is a positioning tension, not a routing defect. No change.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| PAGE-100 | Breadcrumb (current page label "The enquiry path") | Home | `/` | Internal 200 | Return home (breadcrumb) | KEEP | **KEEP** — owner, 2026-09-19 (`/conversion-optimization KEEP-ALL`) |
| PAGE-101 | Breadcrumb | What we do | `/services` | Internal 200 | Navigation — service hub (breadcrumb) | KEEP | **KEEP** — owner, 2026-09-19 (`/conversion-optimization KEEP-ALL`) |
| PAGE-102 | Hero CTA (entry) + Closing CTA — "Start with what you can currently see" / "What arrives, what converts, what you can measure." | Tell us what you’re trying to fix | `/contact` | Internal 200 | Enquiry (primary) — at entry, and again after diagnosis, scope and testing limits are set out | KEEP — enquiry → `/contact`; same wording at two materially different stages. | **KEEP** — owner, 2026-09-19 (`/conversion-optimization KEEP-ALL`) |
| PAGE-103 | Hero CTA + Closing CTA | Book a call | `/schedule-call` | Internal 200 | Booking (secondary) | KEEP | **KEEP** — owner, 2026-09-19 (`/conversion-optimization KEEP-ALL`) |
| PAGE-104 | "What this work is usually brought in to do" — card link after "Often the loss is somewhere else entirely" | Working out which of the four it is → "If you do not yet know where the loss is, that page is the honest place to start, and it costs nothing." | `/problems/traffic-but-no-enquiries` | Internal 200 | Problem diagnosis — free self-check before any engagement | KEEP — the destination is the four-cause diagnostic, and it is free to use ("Five checks you can run yourself today, with no sign-up and no tool"), so "costs nothing" is supported. | **KEEP** — owner, 2026-09-19 (`/conversion-optimization KEEP-ALL`) |
| PAGE-105 | "We ran this on ourselves first" — "Related:" | the whole system this sits inside | `/services` | Internal 200 | Service hub — system context (CONVERT inside CAPTURE → CONVERT → MEASURE) | KEEP | **KEEP** — owner, 2026-09-19 (`/conversion-optimization KEEP-ALL`) |
| PAGE-106 | "We ran this on ourselves first" — "Related:" | the method, including what cannot be attributed | `/how-it-works` | Internal 200 | Measurement methodology and attribution limits | KEEP | **KEEP** — owner, 2026-09-19 (`/conversion-optimization KEEP-ALL`) |

### 3.17 `/lead-generation`

Shared navigation: same as approved global baseline — no page-specific deviation.

> **`/lead-generation` review (2026-09-19) — routing architecture and claim/capability verification only; no content changed. The existing flag `QUALIFICATION CAPABILITY CLAIM — CHANGE REQUIRED LATER` (§0.11) applies to this page.**
>
> - **State (VERIFIED FACT):** HTTP 200 · `index, follow` · canonical `https://mappedskills.com/lead-generation` (self) · in `sitemap.xml` · title "Lead Generation Where the Unit Is an Enquiry You Can Act On | MappedSkills" · H1 "Lead generation, where the unit is an enquiry you can actually act on." · breadcrumb label "Enquiry generation" · in shared navigation (NAV-007 header, owner-approved KEEP; NAV-021 footer).
> - **Links:** 11 placements → 9 rows, **all internal, all 200 on the first request. No 404s, no redirects, no external links** (no CRM, form, lead-management or qualification resource). The embedded `ChainTerminus` figure contains no links.
> - **Links by destination:** `/contact` PAGE-109 (×2) · `/schedule-call` PAGE-110 (×2) · `/how-it-works` PAGE-111 · `/problems/traffic-but-no-enquiries` PAGE-112 · `/services` PAGE-108, PAGE-113 · `/seo` PAGE-114 · `/google-ads` PAGE-115 · `/` PAGE-107 · `/pricing`, `/conversion-optimization`, `/social-media-ads`, `/work`, case studies: **none**.
> - **Duplicated destinations at materially different stages:** `/contact` and `/schedule-call` — hero (entry) vs close ("How many, and how many are worth quoting for"). `/services` — breadcrumb vs "Related: the whole system".
> - **Destination support:** all nine links route to pages that support the surrounding next step (see rows). The claims *around* PAGE-111 depend on the capability findings below.
>
> **Every statement that says or implies automatic / immediate / on-arrival / system-generated / five-check / stored-verdict qualification (VERIFIED against `lib/enquiry-validation.ts`, `lib/enquiries.ts`, `app/api/enquiry/route.ts`, `db/migrations/001–002`, `components/forms/ContactForm.tsx`):**
>
> | # | Exact wording | Where | Supported by current implementation? | Classification |
> |---|---|---|---|---|
> | Q1 | "**Checked automatically at the moment it arrives.**" | Heading of "What counts as a qualified enquiry here" | **No.** No code evaluates the five conditions together or produces a verdict. Only a cheap abuse flag (`screening: clean/suspect`) is computed on arrival | **Falsely describes current software capability** |
> | Q2 | "An enquiry counts when all of the following are true." (+ the five numbered conditions) | Same section | **Partly.** A definition can be stated as methodology; the system does not apply it (see the condition table) | Methodology stated as if operational |
> | Q3 | "**CHECKED WHEN IT ARRIVES**" → "the qualified enquiry" / "the rest is stored and reported separately — never deleted" | `ChainTerminus` figure (`components/commercial/ChainFigure.tsx`) | **No** for "checked" and "reported separately" (no verdict, no classification, no report). **Yes** for "stored … never deleted" (persist-first; suspect entries are stored, not discarded) | Mixed — capability claim unsupported; storage claim supported |
> | Q4 | "Those are stored and readable — never silently deleted — and they are reported separately, because the ratio between them and real enquiries is itself a signal" | "What does not count" | **Stored: yes.** **Reported separately: no** — no code classifies job, course, vendor, student or out-of-scope enquiries, and no report exists | Mixed |
> | Q5 | "quality is reported next to volume rather than behind it" | FAQ-style answer | **No** — no qualified count exists to report | Service methodology presented as current practice; not implemented |
> | Q6 | "the reporting separates qualified from total" | FAQ-style answer | **No** — same reason | Same |
> | Q7 | "We are accountable up to the qualified enquiry." | Boundary heading | Depends on a verdict the system does not produce | Accountability methodology; measurement not implemented |
> | Q8 | Metadata: "…with a published definition of what counts as one, and that definition is **the number we report**." | `<meta description>` | **No** — no such number is computed or reported | Falsely describes current capability |
>
> **The five conditions against the current enquiry record:**
>
> | Condition (as published) | What the system actually does | Evaluable today? | What it needs |
> |---|---|---|---|
> | 1. "It is real … passes abuse screening" | Honeypot + "impossibly fast" timer → `screening` stored as `clean`/`suspect`, documented as "A flag for a human, not a verdict" | **Partly** — a cheap signal is stored | Human review of `suspect`; no stronger abuse layer exists |
> | 2. "It is reachable … a name, and an email address that can actually receive a reply" | Name and email are **required**; email checked only against a syntax pattern. No deliverability/MX check in code | **Partly** — presence and syntax only (true of every stored record) | Deliverability is unverified; "can actually receive a reply" needs a reply attempt or a check that does not exist |
> | 3. "There is a business context … company, or a website, or a work email domain" | **Company is a required field**, so every stored enquiry satisfies this with any non-empty text. Website optional. Work-email domain is not evaluated | **Trivially** (by the required field), not by judgement | Human judgement on whether the company text is genuine |
> | 4. "There is a stated need … a message, or a problem selected from the page they enquired on" | Message is **required**. **No "problem selected" field exists** in the form or the database | **Trivially** (required field); the "problem selected" path does not exist | Human reading of the message |
> | 5. "It is not a duplicate … of an open enquiry from the same person" | Only **same-idempotency-key replays** are deduplicated (double-submit protection). Same-person / open-enquiry deduplication is **not implemented**; the deduplication window is "deliberately unset" (`001_create_enquiries.sql`) | **No** | An owner decision on the window, plus logic that does not exist |
> | "What does not count" (jobs, courses, vendors, students, work not done) | No classification logic | **No** | Human judgement |
> | "What it deliberately does not judge" (fit, value, timing, authority) | Page says a person does this | N/A — explicitly human | Later sales qualification with the client |
>
> **Form ↔ definition consistency (observation):** the form's email label is "**Work email**", while condition 3 deliberately accepts a Gmail address ("a real business worth crores is frequently run from a Gmail address"). Validation accepts any syntactically valid address. The label and the definition pull in different directions.
>
> **FAQ comparison:** `/faq` (PAGE-064's answer) states the same five checks with the same "decides, automatically, at the moment the enquiry arrives" framing. It has the same capability gap and is already under §0.11.
>
> **Attribution / measurement statements:**
> - "measuring where each one came from" — **supported**: source/medium/campaign (+ `utm_term`, landing page, referrer host) stored first-party on the enquiry (`002_add_enquiry_attribution.sql`, `lib/attribution.ts`).
> - "An enquiry that arrives with no trail — direct, phone, a recommendation — … counts, and we show it as unattributed" — **form enquiries: supported** (attribution columns are nullable → unattributed). **Phone and recommendation enquiries:** there is no route or tool in the application for recording an enquiry that did not come through the form (the only write path is `POST /api/enquiry`), so counting them depends on a manual process not established in the repository.
> - "Duplicate detection" — double-submit only (see condition 5). "Spam filtering" — honeypot + timing flag, stored, not blocking. "**We do not score enquiries**" — **true** (no scoring exists). "CRM integration" — not claimed on this page.
>
> **Results/proof:** **no client evidence, no figures.** Volume, cost-per-lead, conversion rate and quality guarantees appear only as refusals ("a number of enquiries per month", "a cost per enquiry, or per lead", "a conversion rate", "a guaranteed quality standard"; "How many enquiries will we get? We do not know"). The owner permission facts (§0.6) are not engaged and `DEC-012` is not triggered. General principles (judgement): "when the contract is written on volume, volume is what arrives"; "Usually it falls [quality as volume rises]". Methodology: baseline first; qualified vs total separated (not implemented, above); no lists, no scraping, no outbound.
>
> **What "lead generation" means here:** primarily **B — the outcome of CAPTURE → CONVERT → MEASURE** ("They are not something we buy in … They come out of connected work"). Links support this (upstream `/seo`, `/google-ads`; `/services`; `/problems/…`; `/how-it-works`). It is also exposed as a **discoverable service** (header/footer "Lead Generation", NAV-007/NAV-021; title) — so **C (both)** in presentation. Consistent with `/services` PAGE-028 ("Enquiry generation → the outcome named").
>
> **Overlap / contradiction with sibling pages:**
> - `/google-ads` promises "Enquiries and **qualified enquiries by campaign**" — the same unimplemented verdict (§0.14).
> - `/faq` — same automatic-qualification claim (§0.11).
> - `/conversion-optimization` — "the second half of one outcome"; consistent (CONVERT inside the same outcome).
> - `/services` — "the outcome named"; consistent.
> - `/seo` — no qualification claim; consistent.
> - **Cross-page observation (shared navigation copy, not a reopening of NAV decisions):** the desktop header Services dropdown shows item descriptions (`components/layout/Header.tsx`), including "Lead Generation — **Build a qualified enquiry pipeline.**" (same qualification dependency) and "Social Media Ads — Facebook and Instagram ads for leads, sales, **and retargeting.**" The retargeting wording conflicts with §0.15 ("remarketing/custom-audience measurement — NOT ESTABLISHED"; Meta Pixel not activated). "Google Ads — High-intent campaigns that **drive leads and sales**." is an outcome claim that `/google-ads` itself declines to promise. These descriptions render only in the desktop dropdown (the mobile menu omits them). NAV-005/006/007 approved the **routing**, not this descriptive copy.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| PAGE-107 | Breadcrumb (current page label "Enquiry generation") | Home | `/` | Internal 200 | Return home (breadcrumb) | KEEP | **KEEP** — owner, 2026-09-19 (`/lead-generation KEEP-ALL`) |
| PAGE-108 | Breadcrumb | What we do | `/services` | Internal 200 | Navigation — service hub (breadcrumb) | KEEP | **KEEP** — owner, 2026-09-19 (`/lead-generation KEEP-ALL`) |
| PAGE-109 | Hero CTA (entry) + Closing CTA — "Tell us what your enquiries look like now" / "How many, and how many are worth quoting for." | Tell us what you’re trying to fix | `/contact` | Internal 200 | Enquiry (primary) — at entry, and again asking for current volume vs worthwhile enquiries | KEEP — enquiry → `/contact`; same wording at two materially different stages. | **KEEP** — owner, 2026-09-19 (`/lead-generation KEEP-ALL`) |
| PAGE-110 | Hero CTA + Closing CTA | Book a call | `/schedule-call` | Internal 200 | Booking (secondary) | KEEP | **KEEP** — owner, 2026-09-19 (`/lead-generation KEEP-ALL`) |
| PAGE-111 | "What we will not promise" — "We are accountable up to the qualified enquiry." | The method, including what cannot be attributed | `/how-it-works` | Internal 200 | Measurement methodology and attribution limits | KEEP (routing) — `/how-it-works` covers attribution limits. The accountability claim beside it depends on the qualification capability (§3.17 notes). | **KEEP (routing only)** — owner, 2026-09-19 (`/lead-generation KEEP-ALL`); see QUALIFICATION CAPABILITY CLAIM (§0.11, expanded) |
| PAGE-112 | "The questions this page gets asked" — "Related:" | if the traffic is arriving and the enquiries are not | `/problems/traffic-but-no-enquiries` | Internal 200 | Problem diagnosis | KEEP | **KEEP** — owner, 2026-09-19 (`/lead-generation KEEP-ALL`) |
| PAGE-113 | "Related:" | the whole system | `/services` | Internal 200 | Service hub — system context | KEEP | **KEEP** — owner, 2026-09-19 (`/lead-generation KEEP-ALL`) |
| PAGE-114 | "Related:" | organic search | `/seo` | Internal 200 | Upstream demand source — organic search | KEEP — supports the hero's statement that enquiries "come out of connected work — reaching the right buyers". | **KEEP** — owner, 2026-09-19 (`/lead-generation KEEP-ALL`) |
| PAGE-115 | "Related:" | paid search | `/google-ads` | Internal 200 | Upstream demand source — paid search | KEEP — same. | **KEEP** — owner, 2026-09-19 (`/lead-generation KEEP-ALL`) |

### 3.18 `/problems/traffic-but-no-enquiries`

Shared navigation: same as approved global baseline — no page-specific deviation.

> **`/problems/traffic-but-no-enquiries` review (2026-09-19) — routing architecture and claim/capability verification only; no content changed.**
>
> - **State (VERIFIED FACT):** HTTP 200 · `index, follow` · canonical `https://mappedskills.com/problems/traffic-but-no-enquiries` (self) · in `sitemap.xml` · title "Traffic But No Enquiries: How to Tell Which of Four Things Is Happening | MappedSkills" · H1 "Traffic but no enquiries: how to tell which of four things is happening." · eyebrow "A problem, not a service" · **not in shared navigation** (consistent with the approved IA: a search-entry page). Reached from body links on `/`, `/work`, `/schedule-call`, `/seo`, `/google-ads`, `/conversion-optimization`, `/lead-generation` and the 404 page (audit §6.3; the `/blog` link to it renders only in the empty state).
> - **Links:** 6 placements → 6 rows, **all internal, all 200 on the first request. No 404s, no redirects, no external links.**
> - **Links by destination:** `/contact` PAGE-120 · `/schedule-call` PAGE-121 · `/how-it-works` PAGE-119 · `/seo` PAGE-117 · `/conversion-optimization` PAGE-118 · `/` PAGE-116 · `/services`, `/pricing`, `/ai-seo`, `/google-ads`, `/social-media-ads`, `/lead-generation`, `/work`, case studies, external: **none**.
> - **Duplicated destinations:** none. `/contact` and `/schedule-call` each appear **once**, only at the close (no hero CTA on this page).
>
> **Implementation (VERIFIED FROM SOURCE):** **static educational content.** No `<form>`, no buttons in the main content, no `'use client'` in the page or its route components (`CauseZones`, `CheckSequence`, `FindingList`), no state, no storage, no fetch, no analytics call. It is **not** interactive, score-based or personalised; it stores no answers and makes no automated recommendation. The visitor runs each check on their own site and reads the corresponding finding. The source records the design intent ("no score"; "Never a score, never a grade"). **Ungated:** every check and finding is fully visible without a form; the only CTAs are optional, at the end. **Consistent with the approved architecture.**
>
> **The diagnostic — what determines each outcome:**
>
> | Check (visitor-run) | Evidence the visitor gathers | Cause it indicates | Finding / next step on the page | Link |
> |---|---|---|---|---|
> | 1. Is anything being recorded at all? | Whether analytics exists; whether an enquiry produces an event carrying its source | **Measurement** | "Fix that before anything else" — and "you should probably just fix yourself … usually in a day" | none (points away) |
> | 2. Submit a real enquiry and confirm it arrives | Whether the test message reaches the inbox; whether a test booking works | **Path** | "the highest-value finding … the fastest to fix" — fix yourself | none (points away) |
> | 3. What is the traffic actually made of? | Top landing pages / searches: could that searcher buy? | **Demand** | "Conversion work will not help you … an acquisition problem" | PAGE-117 → `/seo` |
> | 4. Does the landing page answer the visit? | First-screen read of the top three landing pages | **Page** | "the one case where page-level conversion work is the right intervention" | PAGE-118 → `/conversion-optimization` |
> | 5. Are the enquiries you do get the right ones? | Hand-sort the last twenty enquiries into three groups | Demand ("a demand problem wearing a quality costume") | "The problem is upstream of the website" | none |
> | (any) | Checks disagree, or too little data | Insufficient evidence | "no honest diagnosis is available yet" — get measurement working, wait | none |
>
> **Wording vs implementation:** no wording implies personalisation or data processing by MappedSkills. The page repeatedly frames the checks as the visitor's own ("You can run all of them yourself, today, without talking to anyone"; "No tool, no sign-up, no download, no email"). "Five checks you can run yourself today, with no sign-up and no tool" (metadata) is accurate.
>
> **Routing of diagnoses:** each diagnosis routes to an appropriate existing page or explicitly away from MappedSkills ("Two of these point away from us … Three, if you count [insufficient evidence]"). **No diagnosis recommends a service MappedSkills does not offer.**
>
> **⚠ Entry-offer implication (content, existing owner blocker) — RESOLVED 2026-09-19: HYBRID (§0.18).** the closing paragraph says "If you would rather not run them yourself, **we do this as a piece of work: the same five checks on your site and your data, with what we find and what it means, written down.**" The approved copy file (`copy/problems-traffic-but-no-enquiries.md`) attaches `[DECISION REQUIRED — entry-offer model: free / paid / hybrid. The CTA below reads as a diagnostic offer; whether it is free, paid or hybrid changes the wording…]` to exactly this paragraph. The placeholder renders nothing, but **the offer sentence renders live**. Elsewhere the site treats this as undecided: `/pricing` source ("whether a smaller entry engagement exists, and what it costs, is undecided and MUST NOT BE IMPLIED") and `/thank-you` source (no "offer of an audit or diagnostic … None of those is decided"). The CTAs themselves are the generic enquiry/booking pair (routing is fine); the **offer wording** depends on the open entry-offer decision.
>
> **Claims review:**
> - **Guarantees / results / performance:** none. No figures, no client evidence (owner permission facts not engaged; `DEC-012` not triggered).
> - **Own-site evidence (supported):** "Four of the five checks failed … The contact form had no submission target … The booking widget rendered empty. The thank-you page existed and nothing linked to it. There was no analytics of any kind." Recorded in `CONTENT_EVIDENCE_GAPS.md` ("verified, dated, reproducible" diagnosis) and `CURRENT_STATE.md` (booking widget "renders empty (0 children, zero iframes)"; no analytics); `/thank-you` orphaned (`CURRENT_CODEBASE_AUDIT.md`).
> - **Methodology:** the four-cause model; measurement checked first "because without it you cannot tell which of the other three you have"; honest "insufficient evidence" outcome.
> - **Assertions presented as fact (unevidenced generalisations):** "Measurement … is the most common [first finding]"; "the homepage is rarely where the loss is"; "[path] is the highest-value finding … and the fastest to fix"; "whoever built or maintains your site can do them, usually in a day". Stated as experience, not measured.
> - **Traffic / demand / conversion / lead quality / attribution / channel choice:** no capability claim beyond self-checks; the measurement advice ("a recorded conversion at the moment the enquiry is made, and the source captured with it") matches the implemented first-party capability; no channel is claimed to outperform another.
>
> **Cross-page wording observation:** this page's hero says "**three of the four** are not solved by redesigning the page", while `/conversion-optimization` says "**Two of the four** are not the page" (heading and `ChainFigure`) and "in at least two of the four places … the wrong fix" (metadata). Both can be read consistently (redesign vs page-level conversion work including the enquiry path), but the counts differ on the surface. Noted only.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| PAGE-116 | Breadcrumb ("Home › Problems › Traffic but no enquiries"; "Problems" is deliberately not a link) | Home | `/` | Internal 200 | Return home (breadcrumb) | KEEP | **KEEP** — owner, 2026-09-19 (`/problems/traffic-but-no-enquiries KEEP-ALL`) |
| PAGE-117 | "What each finding means" — finding: "If the traffic is the wrong traffic" (demand) | What being found for the right searches involves | `/seo` | Internal 200 | Demand/acquisition fix — organic search | KEEP — `/seo` opens its scope with "Finding the demand worth capturing". Note: the finding calls it "an acquisition problem" generally; `/seo` is one acquisition route (paid search is another). No link is proposed. | **KEEP** — owner, 2026-09-19 (`/problems/traffic-but-no-enquiries KEEP-ALL`) |
| PAGE-118 | "What each finding means" — finding: "If the page does not answer the visit" (page) | How that work runs | `/conversion-optimization` | Internal 200 | Page-level conversion work | KEEP — `/conversion-optimization` describes exactly that work (message, offer, friction), diagnosis first. | **KEEP** — owner, 2026-09-19 (`/problems/traffic-but-no-enquiries KEEP-ALL`) |
| PAGE-119 | "What we found when we ran this on ourselves" — "Four of the five checks failed." | How we do this on a client site | `/how-it-works` | Internal 200 | Methodology — how the diagnosis is applied for clients | KEEP — `/how-it-works` covers diagnosis ("Which of four failures a symptom indicates"), baselines and limits. | **KEEP** — owner, 2026-09-19 (`/problems/traffic-but-no-enquiries KEEP-ALL`) |
| PAGE-120 | Closing — "If you would rather we ran it" / "A specific question beats a general worry." (after all checks and findings) | Tell us what you're trying to fix | `/contact` | Internal 200 | Enquiry (primary) — optional, after the complete free diagnostic | KEEP (routing) — enquiry → `/contact`; not a gate. See the entry-offer flag in §3.18 for the paragraph above it. | **KEEP (routing)** — owner, 2026-09-19 (`/problems/traffic-but-no-enquiries KEEP-ALL`); entry-offer model resolved HYBRID (§0.18) |
| PAGE-121 | Closing — "If you would rather we ran it" | Book a call | `/schedule-call` | Internal 200 | Booking (secondary) | KEEP | **KEEP** — owner, 2026-09-19 (`/problems/traffic-but-no-enquiries KEEP-ALL`) |

### 3.19 `/privacy-policy`

Shared navigation: same as approved global baseline — no page-specific deviation.

> Indexability flag: see **SEO-002** (§8) — not part of link implementation.

> **`/privacy-policy` review (2026-09-19) — legal/information-routing review. NOT legal advice, NOT a compliance verdict, and NOT a rewrite.** The live policy text was read as rendered; implementation facts come from the canonical source and recorded programme evidence. **Nothing was changed.**
>
> - **State (VERIFIED FACT):** HTTP 200 · **`noindex, nofollow`** · canonical `https://mappedskills.com/privacy-policy` (self) · **not in `sitemap.xml`** · title "Privacy Policy | MappedSkills Marketing" · H1 "Privacy Policy" · "Last Updated: May 2026" · linked from the footer (NAV-036), the consent banner (NAV-002) and the `/contact` form's privacy note (PAGE-056). **SEO-002 remains open.**
> - **Links:** 21 placements (1 breadcrumb + 14 anchors + 2 mailto + 1 tel + 2 `/contact` + 1 `/schedule-call`) → 6 rows. **No 404s, no redirects, no external links.** All 14 anchors resolve. Page-specific destinations: `/contact` (PAGE-126), `/schedule-call` (PAGE-127), `mailto:info@mappedskills.com` (PAGE-124), `tel:+919873232662` (PAGE-125), `/` (PAGE-122). **Not linked from the page body:** `/terms` (footer only), any cookie/consent-settings control (the footer's "Analytics preferences" button is shared, not in the policy), and any vendor (Google, GA, GTM, Meta, Calendly, Contentful, Hosting.com). The rights-request route is email only.
> - **Label check:** "Contact Us" → `/contact` and "Book a call" → `/schedule-call` match their destinations. The policy's own "Contact Us" section gives only "Pune, Maharashtra, India" (no postal address).
>
> **⚠ Internal drafting notes are published in the live policy (VERIFIED FACT):**
> - "Note: Tracking IDs should be configurable through environment variables and should not be hardcoded." (Analytics and Tracking)
> - "Note: If required, a cookie consent banner or preference mechanism should be added before launch." (Cookies) — **a consent banner and preferences control now exist**, so this note is also stale.
> - "Note: Retention periods should be reviewed legally before launch." (Data Retention)
> - "Legal Review Note: Rights language should be reviewed for compliance with applicable Indian privacy law before publishing." (Your Rights)
>
> **Policy statements vs the current implementation (A = factual implementation mismatch · B = missing factual disclosure · C = question for qualified legal review):**
>
> | # | Policy says | Implementation (evidence) | Class |
> |---|---|---|---|
> | 1 | Collected: "Service interest", "Marketing budget range" | The form has **no** service-interest field and **no** budget field; budget was removed by design (`FORM_AND_BOOKING_SPEC.md` §1.4; `001_create_enquiries.sql` "NO BUDGET COLUMN") | **A** |
> | 2 | "When you submit a contact form, **audit request**, or enquiry form" | Only one form exists (`/contact`); no audit-request form | **A** |
> | 3 | Stored in "Email notification system", "CRM or lead management tool", "Google Sheets or reporting dashboard if configured" | Persistence is the site's own database (`POST /api/enquiry` → `lib/enquiries.ts`). **No email-sending library, no CRM, no Sheets integration** in the codebase. The "if configured" hedge covers only the Sheets item | **A** |
> | 4 | "We only collect fields that are required for business communication and **qualification**" | Phone and website are optional. No qualification verdict exists (§0.11) | **A** (wording) |
> | 5 | Tools "may include": **Meta Pixel**, **Google Ads conversion tracking**, Search Console, heatmaps "if added later" | GTM and GA4 load **only after analytics consent**. **Meta Pixel "NOT ACTIVATED — optional and owner-deferred"**. **No Google Ads conversion tracking** (the approved analytics decision excludes it). No Search Console code on the site. No heatmap/session-recording tool | **A** (lists inactive integrations as possible tools) |
> | 6 | Tracked events: "Button clicks", "**Phone and email clicks**", "**Newsletter signups**", "**Blog interactions**" | Implemented events are exactly `page_view`, `lead_form_started`, `lead_form_validation_error`, `lead_form_submitted`, `meeting_started` (booking-link click) (`lib/analytics.ts`). No phone/email-click, newsletter or blog-interaction event. The newsletter form is non-functional (`CURRENT_INTEGRATIONS.md`) | **A** |
> | 7 | Cookies used for "**Advertising measurement**", "**Retargeting**", "Conversion tracking" | Consent Mode keeps `ad_storage`, `ad_user_data` and `ad_personalization` **denied**; no retargeting; Meta inactive | **A** |
> | 8 | "a cookie consent banner … should be added before launch" | A consent banner (`ConsentBanner`) and a footer "Analytics preferences" control exist. Pre-consent: no third-party analytics. Post-consent: GTM → GA4 (`analytics_storage` only) | **A** (stale) |
> | 9 | Hosting: "**Vercel** for hosting" | Production runs on **Hosting.com / A2 shared cPanel** (LiteSpeed/Passenger) with a MySQL/MariaDB database (`22_PRODUCTION_DEPLOYMENT_ACCEPTANCE.md`) | **A** |
> | 10 | Third parties listed: "Email service providers", "CRM tools", "Form handling tools", "Payment or billing tools if added later" | None of these is integrated in the codebase | **A** (implies more than exists; "may"/"examples" hedged) |
> | 11 | *(absent)* **Contentful** | Blog articles load images **directly from `images.ctfassets.net`** in the visitor's browser (`next.config.mjs` `images.unoptimized: true`; 8 references on `/blog/seo-company-in-pune`), so visitors' browsers contact Contentful's CDN | **B** |
> | 12 | *(absent)* the actual host / database | Not named (the policy names Vercel instead) | **B** |
> | 13 | *(generic "cookies or similar technologies")* | Specific browser storage: the consent choice in `localStorage` (`lib/consent.ts`); the attribution first-touch record and analytics de-duplication keys in `sessionStorage` (`lib/attribution.ts`, `lib/analytics.ts`); GA4 cookies after consent | **B** (specificity), **C** (adequacy) |
> | 14 | Technical data incl. "IP address", "Browser type", "Device type" | The enquiry record stores **no IP, user agent or fingerprint** (`001_create_enquiries.sql`); IP is held **in memory only** for rate limiting. GA4 (post-consent) processes its own technical data | **A**/**C** — accurate only as "may collect" via analytics |
> | 15 | "Referral source", "Campaign source" | Stored first-party **with the enquiry**: source, medium, campaign, `utm_term`, landing page, referrer host (`002_add_enquiry_attribution.sql`); ad click IDs are **discarded** | **B** (the policy does not say attribution is stored against the enquiry record) |
> | 16 | "Send relevant business communication if consented **or contextually appropriate**" | The form has an **optional, unticked** marketing-consent checkbox; consent, its text and a timestamp are stored (`lib/enquiries.ts`) | **C** ("contextually appropriate") |
> | 17 | Retention: "as long as needed…" + the published note | No retention or deletion mechanism is implemented or documented | **C** |
> | 18 | Security: "Secure hosting", "HTTPS", "Access controls", "Environment variables", "**Limited access to form submissions**" | HTTPS and environment variables: evidenced. Access controls / limited access to submissions: **not established** in the repository | **A**/**C** (partly unestablished) |
> | 19 | Data location / transfers | Not stated. The host is Hosting.com (the repository does not establish the data-centre location); GA4, GTM, Calendly and Contentful are external processors | **B**/**C** |
> | 20 | "We do not sell personal information" (×2) | No evidence of any sale | Consistent |
> | 21 | Sharing: "Use website, analytics, CRM, or booking tools" | Analytics (post-consent) and Calendly (external booking) are real; CRM is not | **A** (CRM) |
> | 22 | Advertising / remarketing / profiling | See rows 5 and 7: none active. The policy nonetheless lists retargeting and advertising measurement | **A** |
> | 23 | *(absent)* automated decision-making | See the automated-processing note below | **C** |
> | 24 | "book a **strategy call**", "Schedule **strategy calls**", "Calendar booking platform if you schedule a call" | Canonical event: **Client Discovery Call, 30 minutes** (§0.9); booking happens on calendly.com via an **external link** (no embed on the site). No "Growth Diagnosis" or "20 minutes" wording on this page | **A** (terminology; carried from §0.9) |
> | 25 | Uses: "Provide marketing recommendations", "Prepare proposals" | Consistent with the HYBRID offer (§0.18) at a general level; no specific deliverable is promised here | Consistent / **C** |
>
> **Automated processing — stated factually (not characterised legally):** on submission the system (a) **rejects and does not save** a submission that exceeds the rate limit (`429 rate_limited`); (b) computes a basic abuse **signal** (honeypot + implausible timing) and **stores the enquiry anyway** with `screening = suspect` for human review; (c) de-duplicates only exact double-submits. **No qualified/not-qualified verdict, no scoring and no automated qualification exist or are approved** (§0.11). Whether (a) or (b) requires any disclosure is a **question for qualified legal review**. It is **not** automated lead qualification and must not be described as such.
>
> **Consent behaviour vs policy wording:** the implementation matches the established behaviour (pre-consent: no third-party analytics; post-consent: GTM + GA4 with `analytics_storage` only; advertising signals denied; Meta inactive). The policy's cookie and analytics sections describe a **broader, advertising-inclusive** set than is active (rows 5, 7, 22) and contain a stale pre-launch note (row 8).
>
> **Calendly:** the policy's generic "Calendly or similar booking tools" / "Calendar booking platform if you schedule a call" matches the architecture: an external link to calendly.com; booking data is processed on Calendly's site; no embed; booking completion destination unverified (§0.9).

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| PAGE-122 | Breadcrumb | Home | `/` | Internal 200 | Return home (breadcrumb) | KEEP | **KEEP** — owner, 2026-09-19 (`/privacy-policy KEEP-ALL`) |
| PAGE-123 | Table of contents | 14 section links ("→ Information We Collect" … "→ Contact Us") | `#information-we-collect` … `#contact-us` | Same-page anchor ×14 (all targets exist) | In-page navigation | KEEP | **KEEP** — owner, 2026-09-19 (`/privacy-policy KEEP-ALL`) |
| PAGE-124 | "Your Rights" (rights-request address) + "Contact Us › Get In Touch" | info@mappedskills.com (×2, same destination) | `mailto:info@mappedskills.com` | mailto | Rights requests / direct email contact | KEEP | **KEEP** — owner, 2026-09-19 (`/privacy-policy KEEP-ALL`) |
| PAGE-125 | "Contact Us › Get In Touch" | +91 9873232662 | `tel:+919873232662` | tel | Direct phone contact | KEEP — note: one number here; the shared footer shows two (NAV-034/035). | **KEEP** — owner, 2026-09-19 (`/privacy-policy KEEP-ALL`) |
| PAGE-126 | "Contact Us › Get In Touch" + closing CTA "Have Questions Before Working With Us?" | Contact Us | `/contact` | Internal 200 | Enquiry (primary) | KEEP | **KEEP** — owner, 2026-09-19 (`/privacy-policy KEEP-ALL`) |
| PAGE-127 | Closing CTA | Book a call | `/schedule-call` | Internal 200 | Booking (secondary) | KEEP | **KEEP** — owner, 2026-09-19 (`/privacy-policy KEEP-ALL`) |

### 3.20 `/terms`

Shared navigation: same as approved global baseline — no page-specific deviation.

> Indexability flag: see **SEO-003** (§8) — not part of link implementation.

> **`/terms` review (2026-09-19) — legal/information-routing and factual-accuracy review. NOT legal advice, NOT a compliance verdict, NOT a rewrite.** Live text read as rendered; business facts compared with recorded owner decisions. **Nothing was changed, and no business term was inferred.**
>
> - **State (VERIFIED FACT):** HTTP 200 · **`noindex, nofollow`** · canonical `https://mappedskills.com/terms` (self) · **not in `sitemap.xml`** · title "Terms and Conditions | MappedSkills Marketing" · H1 "Terms and Conditions" · "Last Updated: May 2026" · linked from the footer (NAV-037). **SEO-003 remains open.**
> - **Links:** 23 placements (1 breadcrumb + 17 anchors + 1 mailto + 1 tel + 2 `/contact` + 1 `/schedule-call`) → 6 rows. **No 404s, no redirects, no external links.** All 17 anchors resolve. Labels match their destinations.
> - **Page-specific links by type:** `/contact` PAGE-132 · `/schedule-call` PAGE-133 · email PAGE-130 · phone PAGE-131 (one number; the footer shows two). **Not linked from the Terms body:** `/privacy-policy` (footer only; the Terms never reference the privacy policy), `/services`, `/pricing`, any refund/cancellation/payment page (none exists), any vendor/platform.
>
> **⚠ Internal drafting notes visible publicly (VERIFIED FACT):**
> - "Legal Review Note: This section must be reviewed by a legal professional before publishing." (Limitation of Liability)
> - "Legal Review Note: Jurisdiction and dispute resolution wording must be reviewed by a legal professional before publishing." (Governing Law)
> - Draft-style wording: "These terms **should be** governed by the applicable laws of India"; "Detailed confidentiality terms **should be** defined in the formal agreement where needed"; "Final ownership … **should be** defined in the service agreement".
>
> **Terms vs established business/site facts (A = factual business/implementation mismatch · B = missing factual information · C = question for qualified legal review):**
>
> | # | Terms say | Established facts | Class |
> |---|---|---|---|
> | 1 | Services: "Google Ads management", "Social Media Ads management", "Lead Generation", "SEO", "Conversion Optimization", "**Tracking and reporting**", "**Marketing strategy and audits**" | **AI search (`/ai-seo`) is omitted**, although it is an approved service (NAV-016/NAV-041). "Tracking and reporting" and "Marketing strategy" have no service page (measurement sits inside the system / `/how-it-works`). "Audits" loosely corresponds to the HYBRID paid deeper diagnosis (§0.18), which the Terms do not describe as such | **A** / **B** |
> | 2 | Platforms: "Google, Meta, **LinkedIn**, **Vercel**…"; client pays directly to "Google Ads, Meta Ads, **LinkedIn Ads**…" | **No LinkedIn advertising service exists** on the site or in the approved service set. **Vercel** is not the host (Hosting.com / A2 cPanel; same mismatch as the privacy policy) | **A** |
> | 3 | "Platform ad spend is separate from MappedSkills management fees unless specifically agreed otherwise"; clients "usually" pay "directly to" platforms; "Payment of ad spend directly to platforms" (client responsibilities) | **Owner-confirmed:** Google Ads management is a **custom quoted fee** (§0.14). **Not confirmed:** whether ad spend is paid directly to Google/Meta or billed through MappedSkills. The Terms assert "usually directly" | **B** (owner fact needed) |
> | 4 | Engagement documents "may define: … **Monthly fees**, **Setup fees**, Payment terms, Timelines…" | Stated as possibilities, not commitments. **No setup fee, monthly-fee model or payment terms are owner-confirmed**; confirmed: custom quoted (Google Ads; deeper diagnostic) | **B** (hedged; not a conflict) |
> | 5 | "Unless clearly stated, **website pricing is indicative** and may vary based on: Scope, Number of channels, Ad budget, Complexity, Reporting needs, Tracking setup, Funnel requirements, Implementation support" | `/pricing` **displays no price figures** (its price section is owner-blocked and renders nothing); pricing is custom quoted. The Terms' factor list differs from `/pricing`'s six published factors | **A** (refers to pricing not shown) |
> | 6 | "Final scope, pricing, deliverables, timelines, and responsibilities will be defined in a written proposal, agreement, or statement of work." | Consistent with custom quoting (§0.14, §0.18) | Consistent |
> | 7 | "No Guarantee of Results": "does not guarantee specific leads, rankings, sales, revenue, ROAS, or business outcomes" | **Consistent** with the site's no-guarantee position (FAQ, `/seo`, `/google-ads`, `/ai-seo`, `/lead-generation`) | Consistent |
> | 8 | "**Enquiries and Strategy Calls**" (TOC + heading) · "**Strategy calls** are intended to understand business goals…" | Canonical: **Client Discovery Call, 30 minutes** (§0.9). "Strategy Call" is not canonical. No "Growth Diagnosis" or "20 minutes" on this page | **A** (terminology) |
> | 9 | "Submitting a form or booking a call does not create a client-agency relationship"; MappedSkills "may choose whether or not to proceed with a proposal based on business fit, scope, budget…" | Consistent with the HYBRID model's free initial conversation "may be free" (§0.18). The Terms do not state which parts are free or paid | **B** (HYBRID not described) |
> | 10 | Termination / notice / handover "governed by the relevant proposal, agreement, or statement of work" | No termination, refund, cancellation or contract-period policy is owner-supplied; the Terms defer to agreements and **state none**. No refund/cancellation page exists | **B** (nothing invented; none established) |
> | 11 | Intellectual property: MappedSkills-created "frameworks … remain protected unless otherwise agreed"; client assets remain the client's; campaign-asset ownership "should be defined in the service agreement" | No owner-supplied IP position beyond this text | **C** |
> | 12 | Confidentiality: "reasonable efforts to protect client business information…" | No confidentiality process is established in the repository | **C** |
> | 13 | Limitation of liability; governing law (India) + public "Legal Review Note"s | Draft status visible on the page | **C** |
> | 14 | Client responsibilities: "Access to ad accounts", "Analytics access", "Website or CMS access"… | Consistent with FAQ ("Measurement access is not negotiable"). No conflict | Consistent |
> | 15 | Third-party platforms MappedSkills "cannot control" (approvals, outages, tracking limitations…) | Consistent with the page-level no-control statements | Consistent |
>
> **Commercial facts cross-check:** no clause **conflicts** with the approved facts (Google Ads custom quoted; deeper diagnostic paid and custom quoted; initial conversation may be free; no fixed diagnostic package or price). The Terms simply do **not describe** the HYBRID model (rows 1, 9), and assert one **unconfirmed** billing mechanic (row 3).
>
> **Guarantee / result language:** only the no-guarantee clause and "MappedSkills focuses on structured strategy, execution, tracking, reporting, and optimization, but outcomes cannot be guaranteed." No lead-volume, revenue, ROI, ranking or ad-result promise.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| PAGE-128 | Breadcrumb | Home | `/` | Internal 200 | Return home (breadcrumb) | KEEP | **KEEP** — owner, 2026-09-19 (`/terms KEEP-ALL`) |
| PAGE-129 | Table of contents | 17 section links ("→ Use of Website" … "→ Contact Us") | `#use-of-website` … `#contact-us` | Same-page anchor ×17 (all targets exist) | In-page navigation | KEEP | **KEEP** — owner, 2026-09-19 (`/terms KEEP-ALL`) |
| PAGE-130 | "Contact Us › Get In Touch" | info@mappedskills.com | `mailto:info@mappedskills.com` | mailto | Direct email contact | KEEP | **KEEP** — owner, 2026-09-19 (`/terms KEEP-ALL`) |
| PAGE-131 | "Contact Us › Get In Touch" | +91 9873232662 | `tel:+919873232662` | tel | Direct phone contact | KEEP — note: one number here; the shared footer shows two (NAV-034/035). | **KEEP** — owner, 2026-09-19 (`/terms KEEP-ALL`) |
| PAGE-132 | "Contact Us › Get In Touch" + closing CTA "Have Questions Before Working With Us?" | Contact Us | `/contact` | Internal 200 | Enquiry (primary) | KEEP | **KEEP** — owner, 2026-09-19 (`/terms KEEP-ALL`) |
| PAGE-133 | Closing CTA | Book a call | `/schedule-call` | Internal 200 | Booking (secondary) | KEEP | **KEEP** — owner, 2026-09-19 (`/terms KEEP-ALL`) |

### 3.21 404 page (appendix — visitor-facing on every broken link)

Shared navigation: same as approved global baseline — no page-specific deviation.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| PAGE-134 | Route card (404 recovery) | PROPOSITION What we do The whole chain from demand to a recorded enquiry, and where the j… | `/services` | Internal 200 | Service discovery (hub) | KEEP | **KEEP** — owner, 2026-09-20 (`404 PAGE — KEEP-ALL`): OWNER-APPROVED — KEEP / NO IMPLEMENTATION; no redesign, no added cards, no destination change |
| PAGE-135 | Route card (404 recovery) | METHOD How we work, what we measure, and what we cannot tell you The published method, wr… | `/how-it-works` | Internal 200 | Method / measurement credibility | KEEP | **KEEP** — owner, 2026-09-20 (`404 PAGE — KEEP-ALL`): OWNER-APPROVED — KEEP / NO IMPLEMENTATION; no redesign, no added cards, no destination change |
| PAGE-136 | Route card (404 recovery) | DIAGNOSTIC Traffic but no enquiries: which of four things is happening Five checks you ca… | `/problems/traffic-but-no-enquiries` | Internal 200 | Problem diagnosis | KEEP | **KEEP** — owner, 2026-09-20 (`404 PAGE — KEEP-ALL`): OWNER-APPROVED — KEEP / NO IMPLEMENTATION; no redesign, no added cards, no destination change |
| PAGE-137 | Route card (404 recovery) | COST What this costs, and what changes the number The six factors that move it, and which… | `/pricing` | Internal 200 | Cost expectations | KEEP | **KEEP** — owner, 2026-09-20 (`404 PAGE — KEEP-ALL`): OWNER-APPROVED — KEEP / NO IMPLEMENTATION; no redesign, no added cards, no destination change |
| PAGE-138 | Route card (404 recovery) | QUESTIONS Questions we get asked, answered plainly Including the ones with answers that l… | `/faq` | Internal 200 | Objection handling | KEEP | **KEEP** — owner, 2026-09-20 (`404 PAGE — KEEP-ALL`): OWNER-APPROVED — KEEP / NO IMPLEMENTATION; no redesign, no added cards, no destination change |
| PAGE-139 | Route card (404 recovery) | THE FIRM Who we are, and what we can actually show you An honest account of where the fir… | `/about` | Internal 200 | Company credibility | KEEP | **KEEP** — owner, 2026-09-20 (`404 PAGE — KEEP-ALL`): OWNER-APPROVED — KEEP / NO IMPLEMENTATION; no redesign, no added cards, no destination change |
| PAGE-140 | Capability card (404 recovery) | CAPABILITY Search Being found by buyers already looking. | `/seo` | Internal 200 | Service discovery — SEO | KEEP | **KEEP** — owner, 2026-09-20 (`404 PAGE — KEEP-ALL`): OWNER-APPROVED — KEEP / NO IMPLEMENTATION; no redesign, no added cards, no destination change |
| PAGE-141 | Capability card (404 recovery) | CAPABILITY AI search What those answers are actually assembled from. | `/ai-seo` | Internal 200 | Service discovery — AI search | KEEP | **KEEP** — owner, 2026-09-20 (`404 PAGE — KEEP-ALL`): OWNER-APPROVED — KEEP / NO IMPLEMENTATION; no redesign, no added cards, no destination change |
| PAGE-142 | Capability card (404 recovery) | CAPABILITY Google Ads Paid search as a demand source, on the same measurement layer. | `/google-ads` | Internal 200 | Service discovery — Google Ads | KEEP | **KEEP** — owner, 2026-09-20 (`404 PAGE — KEEP-ALL`): OWNER-APPROVED — KEEP / NO IMPLEMENTATION; no redesign, no added cards, no destination change |
| PAGE-143 | Capability card (404 recovery) | CAPABILITY Social ads Where the channel fits, and where it does not. | `/social-media-ads` | Internal 200 | Service discovery — Paid social | KEEP | **KEEP** — owner, 2026-09-20 (`404 PAGE — KEEP-ALL`): OWNER-APPROVED — KEEP / NO IMPLEMENTATION; no redesign, no added cards, no destination change |
| PAGE-144 | Capability card (404 recovery) | CAPABILITY Lead generation What counts as a qualified enquiry, published. | `/lead-generation` | Internal 200 | Service discovery — Lead generation | KEEP | **KEEP** — owner, 2026-09-20 (`404 PAGE — KEEP-ALL`): OWNER-APPROVED — KEEP / NO IMPLEMENTATION; no redesign, no added cards, no destination change |
| PAGE-145 | Capability card (404 recovery) | CAPABILITY Conversion work Diagnosis first, because two of the four causes are not the pa… | `/conversion-optimization` | Internal 200 | Service discovery — Conversion optimisation | KEEP | **KEEP** — owner, 2026-09-20 (`404 PAGE — KEEP-ALL`): OWNER-APPROVED — KEEP / NO IMPLEMENTATION; no redesign, no added cards, no destination change |

## 4. Blog article review

Shared navigation on every article: same as approved global baseline — no page-specific deviation.

### 4.1 Blog article template baseline (identical on all 8 articles)

Generated by `app/(pages)/blog/[slug]/page.tsx` and `components/blog/*`. Approving a row here approves it on every article.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| BLOG-001 | Breadcrumb | Home | `/` | Internal 200 | Return home (breadcrumb) | KEEP (verified 2026-09-19): breadcrumb root link, 200, on all 8 articles. | **KEEP** — owner, 2026-09-19 |
| BLOG-002 | Breadcrumb | Blog | `/blog` | Internal 200 | Navigation (breadcrumb) | KEEP (verified 2026-09-19): breadcrumb to the blog hub, 200. | **KEEP** — owner, 2026-09-19; article 3's Contentful-generated hub card may disappear as part of its later unpublishing |
| BLOG-003 | In-article CTA block (CTABlock, type "generic") + Closing CTA section (CTASection) | Tell us what you’re trying to fix | `/contact` | Internal 200 | Primary enquiry CTA | KEEP (verified 2026-09-19): enquiry CTA → `/contact` in the in-article block ("Need a Clear Marketing Direction?") and the closing section ("Ready to Turn This Insight Into Action?"); matches the enquiry convention. | **KEEP** — owner, 2026-09-19 |
| BLOG-004 | Social share | Share: LinkedIn | `https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F…` | External (share dialog; login prompt) | Content sharing | KEEP (verified 2026-09-19): LinkedIn share dialog; logged-out users see a LinkedIn sign-in step (normal); no third-party script loads until clicked. | **KEEP** — owner, 2026-09-19 |
| BLOG-005 | Social share | Share: Facebook | `https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmapp…` | External (share dialog; login prompt) | Content sharing | KEEP (verified 2026-09-19): Facebook share dialog; logged-out users see a login prompt (normal). | **KEEP** — owner, 2026-09-19 |
| BLOG-006 | Social share | Share: Twitter | `https://twitter.com/intent/tweet?text=Content%20Marketing%20Ser…` | External (redirects → x.com/intent/tweet?text=Content%20Mar…) | Content sharing | **REVIEW** — Works (301 → x.com); label "Twitter" is outdated. Relabel "X" or keep? | **CHANGE LABEL "Twitter" → "X"** — owner, 2026-09-19: label/platform-name cleanup only; keep the working share behaviour unless implementation review finds a reason to canonicalise the destination |
| BLOG-007 | Related services card + Sticky sidebar › related service | Learn More | `/google-ads` | Internal 200 | Service discovery — Google Ads | **REVIEW** — Topic-agnostic fallback: every article shows the same services because no blog category matches the service map. Generic label. | **CHANGE** — owner, 2026-09-19: per-article selection of genuinely related APPROVED services; omit when none is relevant (see BLOG-008) |
| BLOG-008 | Related services card | "Learn More" ×3 (Google Ads, SEO, Lead Generation cards) | `/google-ads` · `/seo` · `/lead-generation` | Internal 200 | Related-service discovery | **REVIEW** — Topic-agnostic fallback: every article shows the same services because no blog category matches the service map. Generic label. | **CHANGE** — owner, 2026-09-19: per-article selection of genuinely related APPROVED services (SEO · AI Search · Google Ads · Social Media Ads · Conversion Optimization · Lead Generation); NOT the Contentful category mapping; no universal Google Ads/SEO/Lead Generation set; element omitted where nothing is genuinely relevant; unused mapping copy not to be exposed; exact selection deferred to implementation |
| BLOG-009 | Author bio | Connect on LinkedIn | `https://linkedin.com/in/amit-gupta` | External (LinkedIn authwall — unverifiable) | Author credibility | **REVIEW** — Hard-coded generic handle on every article; cannot be verified as the MappedSkills author (LinkedIn authwall). Confirm the correct profile or remove. | **Split decision** — owner, 2026-09-19: **9A KEEP AUTHOR NAME: Amit Gupta** (owner fact; does not validate legacy first-person autobiographical statements) · **9B VERIFY OFFICIAL LINKEDIN URL BEFORE USE** (OWNER FACT still required; if unverified at implementation, remove/hide the link; no replacement invented) · **9C CHANGE AUTHOR ROLE/BIO** (remove "Performance Marketing Strategist" and the fallback bio; replacement not written now) |
| BLOG-010 | Sticky sidebar CTA | Book a call | `/schedule-call` | Internal 200 | Secondary booking CTA | **REVIEW** — Booking CTA under the headline "Want Us to Review This for Your Business?" (enquiry wording); the template source says booking is not offered on blog pages while owner-blocked. Keep booking, CHANGE → `/contact`, or remove? | **KEEP** — owner, 2026-09-19: sidebar "Book a call" → `/schedule-call` (canonical Client Discovery Call — 30 minutes); headline wording to later copy review |
| BLOG-011 | Closing CTA section (CTASection) | Explore Services | `/services` | Internal 200 | Service discovery (hub) | KEEP (verified 2026-09-19): "Explore Services" → `/services` (200) in the closing section. | **KEEP** — owner, 2026-09-19 |

### 4.2 Blog-wide policy decisions

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| BLOG-012 | Article body (Contentful), 5 articles | Internal links that open in a new tab (target=_blank) | 38 internal links | Internal (new tab) | Internal navigation | **REVIEW** — Internal navigation behaves like an external link. Policy: same tab for internal links, or keep new tab? (Applies to every row marked "policy: BLOG-012".) | **CHANGE internal-link tab policy** — owner, 2026-09-19: internal links → same tab; external links → new tab where appropriate with safe rel attributes; applied to whatever internal links survive all approved removals/changes (no fixed count of 38 as a requirement) |

### 4.3 `/blog/content-marketing-services-in-pune`

Template links: same as §4.1 baseline. Article-specific links:

> **Article review (2026-09-19) — article 1 of 8 in the audit's `/blog` order. Read-only; nothing edited.**
>
> - **Identity:** title "Content Marketing Services in Pune | Boost Your Business Now" · slug `content-marketing-services-in-pune` · live URL `https://mappedskills.com/blog/content-marketing-services-in-pune` · HTTP 200 · canonical self · **no `meta robots`** (SEO-005) · in `sitemap.xml`. **Contentful entry ID: not exposed** in the rendered page. Only the public space ID `owww06rzpjnj` appears, in an image-asset URL. Contentful was not queried.
> - **Displayed metadata:** category "Content Marketing" · author "Amit Gupta — Performance Marketing Strategist" (template fallback bio: "contributes performance marketing insights for MappedSkills") · date **July 16, 2026** · "6 min read". JSON-LD `Article`: `datePublished` = `dateModified` = `2026-07-16T10:25:27.272Z` (Contentful `firstPublishedAt`). **SEO-007 remains OPEN**; not treated as the original publication date.
> - **Links:** template links as §4.1 (BLOG-001 – BLOG-011) + article-specific rows below (BLOG-013 – BLOG-028). All 9 TOC anchors resolve.
> - **Status summary (article body):** direct 200 — BLOG-025 (vibgyorhigh.com), BLOG-026 (`/`), BLOG-028 (related post) · redirect-dependent — BLOG-015 (→ `/lead-generation`, 2 hops), BLOG-017 (→ `/blog`, 2 hops), BLOG-019 (→ `/seo`, 2 hops), BLOG-022 (→ `/work`, 1 hop), BLOG-016 (Statista, 308 to trailing slash) · **404** — BLOG-014, BLOG-018, BLOG-020, BLOG-021, BLOG-024, BLOG-027 · bot-protected — BLOG-023 (fiverr.com → www, 403 to automation).
> - **Broken-link destination types:** BLOG-014 "content helps businesses" → **existing blog article** (`/blog/importance-of-content-writing`) · BLOG-024 "freelance writer" → **existing blog article** (`/blog/freelancing-in-india`) · BLOG-018 "videos" (in "Content Creation: Blogs, social media posts, videos…") → **missing service page** (video; not in the approved service set) · BLOG-020 "managing content across platforms" (in "Social Media Management…") → **missing service page — a service MappedSkills explicitly does not offer** (§0.15) · BLOG-021 "email campaigns" (in "Email Marketing: Crafting newsletters and email campaigns…") → **missing service page** (email marketing; not in the approved service set) · BLOG-027 "Read the full case study here" → **missing case study** (schools / Vibgyor High; permission unknown). Corresponding existing destinations are identified only for BLOG-014 and BLOG-024; **no change is approved by identifying them.**
> - **Internal links opening in a new tab (BLOG-012 policy):** 11 — BLOG-014, -015, -017, -018, -019, -020, -021, -022, -024, -026, -027.
> - **External URLs:** Statista (https; redirect only), fiverr.com (https; bare domain redirects to www), vibgyorhigh.com (https, 200). No HTTP-only URL, no malformed domain, **no affiliate or sponsored link**. Share links are template (BLOG-004 – BLOG-006; "Twitter" label under BLOG-006).
> - **Service links vs the approved architecture:** `/lead-generation` (BLOG-015) and `/seo` (BLOG-019) exist (via redirect). "content marketing agency" (BLOG-017) resolves to `/blog`, **which is not a service page** (RR-02). Video, social media management and email marketing links point to services outside the approved set (BLOG-018/020/021; BLOG-081).
> - **Case-study links:** "case studies" (BLOG-022) → `/work` (exists; redirect). "Read the full case study here" (BLOG-027) → nonexistent; the referenced client is not among the owner permission facts (BLOG-078).
> - **Claims (see BLOG-078 – BLOG-081):** client result "enrollment inquiries by 35% within six months" (Vibgyor High) — **no repository evidence**; "Pune’s digital advertising spending grew by 15% in 2023" — **not established**; ₹ price ranges — **unsourced**; generic promises "deliver maximum ROI", "ensure optimal results", "our approach delivered measurable results" — **no evidence**, and in tension with the site's no-guarantee position. No ranking or traffic figure; no guarantee stated as such.
> - **CTA architecture:** in-article CTA "Need a Clear Marketing Direction?" → `/contact` (BLOG-003) · sticky "Want Us to Review This for Your Business?" → "Book a call" `/schedule-call` (BLOG-010) · closing "Tell us what you’re trying to fix" `/contact` + "Explore Services" `/services`. **No direct Calendly link, no "Strategy Call", no "Growth Diagnosis", no duration reference** in this article.
> - **Other:** the newsletter block reads "There is no mailing list yet." (no form link). The related-post card shows the SEO article labelled "Content Marketing" (PAGE-054 observation).

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| BLOG-013 | Table of contents | 9 section links (e.g. "1. Why Content Marketing is Essential f…") | `#section-…` | Same-page anchor ×9 (all targets exist) | In-page navigation | KEEP | **KEEP** — owner, 2026-09-19 |
| BLOG-014 | Article body (Contentful rich text) | content helps businesses | `https://mappedskills.com/importance-of-content-writing/` | Internal 404 (after trailing-slash redirect) | Educational content (old URL) | **CHANGE → `/blog/importance-of-content-writing`** — Old URL; the same content exists at this live route. Opens in a new tab (policy: BLOG-012). | **CHANGE → `/blog/importance-of-content-writing`** — owner, 2026-09-19. Not implemented |
| BLOG-015 | Article body (Contentful rich text) | lead generation | `https://mappedskills.com/lead-generation-services/` | Internal redirect → `/lead-generation` (2 hops) | Service discovery — Lead generation | **CHANGE → `/lead-generation`** — Same final page, without 2 redirect hop(s). Opens in a new tab (policy: BLOG-012). | **CHANGE → `/lead-generation`** — owner, 2026-09-19. Not implemented |
| BLOG-016 | Article body (Contentful rich text) | digital advertising spending | `https://www.statista.com/outlook/amo/advertising/india` | External (redirects → www.statista.com/outlook/amo/advertis…) | External reference / example | KEEP | **KEEP** — owner, 2026-09-19 |
| BLOG-017 | Article body (Contentful rich text) | content marketing agency | `https://mappedskills.com/content-marketing-services/` | Internal redirect → `/blog` (2 hops) | Service discovery — content marketing (lands on blog) | **REVIEW** — Promises a content-marketing service but redirects to `/blog`. Does MappedSkills offer content marketing? If not: remove or re-point. Opens in a new tab (policy: BLOG-012). | **CHANGE REQUIRED** — owner, 2026-09-19: `/blog` is not a Content Marketing service page and must not be used as one; no Content Marketing service page to be created in this programme; final destination/wording resolved during content implementation after the article's service positioning is corrected |
| BLOG-018 | Article body (Contentful rich text) | videos | `https://mappedskills.com/video-editing-services/` | Internal 404 (after trailing-slash redirect) | Service discovery (page missing) | **REVIEW — OWNER DECISION: create page vs remove/replace link** — Does MappedSkills currently offer / want to present **video editing** as a service? Opens in a new tab (policy: BLOG-012). | **REMOVE SERVICE LINK** — owner, 2026-09-19: video editing is not an approved service; no Video Editing page to be created; educational discussion of video may remain (later content review) |
| BLOG-019 | Article body (Contentful rich text) | Optimized content to rank higher | `https://mappedskills.com/seo-services/` | Internal redirect → `/seo` (2 hops) | Service discovery — SEO | **CHANGE → `/seo`** — Same final page, without 2 redirect hop(s). Opens in a new tab (policy: BLOG-012). | **CHANGE → `/seo`** — owner, 2026-09-19. Not implemented |
| BLOG-020 | Article body (Contentful rich text) | managing content across platforms | `https://mappedskills.com/social-media-management/` | Internal 404 (after trailing-slash redirect) | Service discovery (page missing) | **REVIEW — OWNER DECISION: create page vs remove/replace link** — Does MappedSkills currently offer / want to present **organic social media management**? (`/social-media-ads` is paid social only.) **Owner-recorded architecture fact (§0.15):** `/social-media-ads` states MappedSkills does NOT provide social media management; do not redirect `/social-media-management` to `/social-media-ads` merely to remove the 404. Opens in a new tab (policy: BLOG-012). **Article review 2026-09-19 — recommendation: REMOVE the link** (the anchor sits in "Social Media Management: Curating and managing content across platforms"). MappedSkills does not offer this service (§0.15); do not redirect to `/social-media-ads`; do not create the page. | **REMOVE LINK** — owner, 2026-09-19: MappedSkills does not offer organic social media management; do NOT redirect to `/social-media-ads`; do NOT create `/social-media-management`; surrounding wording handled under BLOG-081 |
| BLOG-021 | Article body (Contentful rich text) | email campaigns | `https://mappedskills.com/email-marketing-services/` | Internal 404 (after trailing-slash redirect) | Service discovery (page missing) | **REVIEW — OWNER DECISION: create page vs remove/replace link** — Does MappedSkills currently offer / want to present **email marketing** as a service? Opens in a new tab (policy: BLOG-012). | **REMOVE SERVICE LINK** — owner, 2026-09-19: email marketing is not an approved service; no Email Marketing page to be created; educational discussion of email marketing may remain |
| BLOG-022 | Article body (Contentful rich text) | case studies | `https://mappedskills.com/work/` | Internal redirect → `/work` (1 hop) | Case-study discovery | **CHANGE → `/work`** — Same final page, without 1 redirect hop(s). Label/naming of `/work` is decided under NAV-011 / NAV-026. Opens in a new tab (policy: BLOG-012). | **CHANGE → `/work`** — owner, 2026-09-19. Not implemented |
| BLOG-023 | Article body (Contentful rich text) | Freelancers | `https://fiverr.com` | External (bot-protected — unverifiable by automation) | External reference / example | KEEP | **KEEP** — owner, 2026-09-19 |
| BLOG-024 | Article body (Contentful rich text) | freelance writer | `https://mappedskills.com/freelancing-in-india/` | Internal 404 (after trailing-slash redirect) | Educational content (old URL) | **CHANGE → `/blog/freelancing-in-india`** — Old URL; the same content exists at this live route. Opens in a new tab (policy: BLOG-012). | **REMOVE LINK** — owner, 2026-09-19 (resolves the reopened dependency): no suitable replacement destination established; surrounding educational text kept only if still useful after content reconciliation; no destination invented |
| BLOG-025 | Article body (Contentful rich text) | Vibgyor High | `https://www.vibgyorhigh.com/schools/pune` | External | External reference / example | KEEP | **KEEP (routing only)** — owner, 2026-09-19; NOT approval of the Vibgyor client/result claim (BLOG-078/BLOG-027 removal decisions remain authoritative) |
| BLOG-026 | Article body (Contentful rich text) | MappedSkills Marketing | `https://mappedskills.com` | Internal 200 | Return home | KEEP — Opens in a new tab (policy: BLOG-012). | **KEEP (routing only)** — owner, 2026-09-19; NOT approval of the Vibgyor client/result claim (BLOG-078/BLOG-027 removal decisions remain authoritative) |
| BLOG-027 | Article body (Contentful rich text) | Read the full case study here | `https://mappedskills.com/portfolio/content-marketing-for-school…` | Internal 404 (after trailing-slash redirect) | Case-study proof (page missing) | **REVIEW — OWNER DECISION: create page vs remove/replace link** — Does MappedSkills have a permissioned **schools / content-marketing case study** to publish? Opens in a new tab (policy: BLOG-012). **Article review 2026-09-19:** the case study it points to is the **Vibgyor High** claim (BLOG-078). Vibgyor High is **not** among the seven owner permission facts and has **no repository evidence**. **OWNER FACT REQUIRED.** If permission is not held: recommendation REMOVE this link together with the claim; do not publish or expose an unpermissioned case study to repair the 404. | **REMOVE** — owner, 2026-09-19: Vibgyor High has NO written permission; do NOT create the case-study page; do NOT redirect to `/work`; do NOT expose Vibgyor through another case-study route |
| BLOG-028 | Related posts card | Content Marketing Best SEO Company in Pune for Businesses That Want Qualified Leads, Not … | `/blog/seo-company-in-pune` | Internal 200 | Educational content | KEEP | **KEEP** — owner, 2026-09-19 |
| BLOG-078 | Article body — "Conclusion" | Client-result claim (text + BLOG-025/026/027): "Vibgyor High, a leading school in Pune, used tailored content strategies to boost enrollment inquiries by 35% within six months. By partnering with MappedSkills Marketing, as their content marketing agency…" | — (claim) | Named client + quantitative result | Client proof | **REVIEW — OWNER FACT REQUIRED:** is written client permission held for Vibgyor High, and does evidence meet `DEC-012` (baseline, period, attribution limits, client-system data)? No repository evidence exists (0 files). Not one of the seven confirmed permission facts. Content change later; not rewritten now | **REMOVE PUBLIC CLIENT/RESULT CLAIM** — owner, 2026-09-19: no written permission; remove the identifiable Vibgyor client-result claim; do not publish the 35% result attributed to Vibgyor; not to be solved by finding evidence for the number; no Vibgyor case study |
| BLOG-079 | Article body — "Why Content Marketing is Essential…" | Statistic: "Pune’s digital advertising spending grew by 15% in 2023 alone" (source link = BLOG-016) | — (claim) | Quantitative market claim | Market context | **REVIEW — EVIDENCE REQUIRED OR WORDING CHANGE:** the cited Statista page is an **India-level** advertising outlook; a **Pune-specific** 15% figure is not established by the repository and was not verified here | **OPEN — EVIDENCE REQUIRED OR WORDING CHANGE** (kept by owner, 2026-09-19) |
| BLOG-080 | Article body — "Cost of Creating Content…" | Price ranges: tools "₹5,000 to ₹20,000 per month"; freelancers "₹1,000 to ₹5,000 per article"; agencies "₹20,000 to ₹1,00,000 per month" | — (claim) | Unsourced market figures | Budget context | **REVIEW:** unsourced figures, not MappedSkills pricing (which is custom quoted and publishes no figures). Keep with a source, generalise, or remove — owner/content decision | **OPEN — REVIEW** (kept by owner, 2026-09-19): unsourced market price ranges; not MappedSkills pricing |
| BLOG-081 | Whole article (title, headings, conclusion) | Positioning: "Content Marketing Services in Pune"; lists "Social Media Management", "Email Marketing", videos as agency services; MappedSkills described as Vibgyor’s "content marketing agency" | — (positioning) | Service positioning | Article purpose | **REVIEW — OWNER DECISION:** content marketing, social media management, email marketing and video are **not** in the approved service architecture, and `/social-media-ads` states MappedSkills does not do social media management (§0.15). Keep as general education, rewrite, or unpublish? Not decided here | **CONTENT/SERVICE POSITIONING CHANGE REQUIRED** — owner, 2026-09-19: article may remain published as educational content but must not present MappedSkills as offering services outside the approved architecture (not approval to unpublish; not approval to create service pages) |

### 4.4 `/blog/building-an-email-list`

Template links: same as §4.1 baseline. Article-specific links:

> **Article review (2026-09-19) — article 2 of 8 in the audit's `/blog` order. Read-only; nothing edited.**
>
> - **Identity:** title "Building an Email List: A Comprehensive Guide" · slug `building-an-email-list` · live URL `https://mappedskills.com/blog/building-an-email-list` · HTTP 200 · canonical self · **no `meta robots`** (SEO-005) · in `sitemap.xml`. **Contentful entry ID: not exposed** (public space `owww06rzpjnj` visible only in an image-asset URL); Contentful not queried.
> - **Displayed metadata:** category "Email Marketing" · author "Amit Gupta" · **"July 16, 2026" and "Updated September 18, 2026"** · "3 min read". JSON-LD `Article`: `datePublished` `2026-07-16T10:21:08.303Z`, **`dateModified` `2026-09-18T05:09:40.513Z`** (Contentful `publishedAt`). **SEO-007 remains OPEN.** Observable facts only: displayed publication date July 16, 2026; displayed updated date September 18, 2026; structured `datePublished` and `dateModified` correspond to those dates. **Not established:** that September 18 represents a substantive content update, or that July 16 is the original historical publication date.
> - **Links:** **no article-body links at all.** Article-specific links are only the 6 TOC anchors (BLOG-029; all resolve). Everything else is the §4.1 template (BLOG-001 – BLOG-011). **No 404s, no redirects, no internal new-tab links in the body** (the only `target=_blank` links are the template share buttons and author LinkedIn). **No related-post card** renders on this article.
> - **External references:** WordPress, Mailchimp and ConvertKit are **named but not linked**. No affiliate/sponsored link. No HTTP-only or malformed URL.
> - **Service architecture:** the article is **educational** about email marketing and does **not** state that MappedSkills sells email marketing. This is consistent with §0.21 (email marketing is not an approved service; educational discussion permitted). The template's related-service cards point to Google Ads / SEO / Lead Generation regardless of topic (BLOG-007/BLOG-008, open).
> - **Case-study / work links:** none. No client named.
> - **Claims:** no MappedSkills or client results, no figures attributed to anyone, no guarantee. **Unsourced comparative performance claims** → BLOG-082. Generic persuasive phrases: "proven strategies" and "maximum engagement" (excerpt). Opening quote attributed to "Amit Gupta" (self-attributed; the author identity is the same unverified question as BLOG-009).
> - **CTA / booking:** template only — in-article "Need a Clear Marketing Direction?" → `/contact`; sticky "Want Us to Review This for Your Business?" → "Book a call" `/schedule-call` (BLOG-010); closing → `/contact` + `/services`. **No direct Calendly link, no "Strategy Call", no "Growth Diagnosis", no duration reference.**
> - **Observation (no decision):** the article recommends building an email list and a lead magnet, while the site's own newsletter block states "There is no mailing list yet." Not a routing issue.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| BLOG-029 | Table of contents | 6 section links (e.g. "1. What is an Email List?") | `#section-…` | Same-page anchor ×6 (all targets exist) | In-page navigation | KEEP | **KEEP** — owner, 2026-09-19 |
| BLOG-082 | Article body — introduction and "Top 10 Benefits" item 10 | Performance generalisations: "email marketing is still one of the highest ROI channels available, surpassing social media in many ways"; "Email marketing has consistently shown better conversion rates than many other forms of marketing" | — (claim) | Unsourced comparative performance claims | Educational persuasion | **REVIEW — EVIDENCE REQUIRED OR WORDING CHANGE:** no source cited and none in the repository; not MappedSkills or client results. Educational discussion of email marketing is permitted (§0.21); the concern is the unsupported comparative claims | **OPEN — EVIDENCE REQUIRED OR WORDING CHANGE** (kept by owner, 2026-09-19); not researched or rewritten during the routing programme |

### 4.5 `/blog/freelancing-in-india`

Template links: same as §4.1 baseline. Article-specific links:

> **Article review (2026-09-19) — article 3 of 8 in the audit's `/blog` order. Read-only; nothing edited.**
>
> - **Identity:** title "Freelancing in India: Your 2025 Guide to Success" · slug `freelancing-in-india` · live URL `https://mappedskills.com/blog/freelancing-in-india` · HTTP 200 · canonical self · **no `meta robots`** (SEO-005) · in `sitemap.xml`. **Contentful entry ID: not exposed** (public space `owww06rzpjnj` visible only in an image-asset URL); Contentful not queried.
> - **Displayed metadata (observable only):** category "Industry Trends" · author "Amit Gupta" · displayed publication date **July 16, 2026** · displayed updated date **September 18, 2026** · "5 min read". Structured `datePublished` `2026-07-16T10:17:46.489Z` / `dateModified` `2026-09-18T05:04:23.979Z` correspond. **SEO-007 remains OPEN.** Not asserted: that 18 Sep is a substantive update, or that 16 Jul is the original publication date.
> - **Links:** article-specific = 12 TOC anchors (BLOG-030; all resolve) + 3 external platform links (BLOG-031 – BLOG-033). Template links as §4.1. **No internal article-body links, therefore no 404s, no redirect-dependent internal links and no internal new-tab links.** The three external links open in a new tab (normal for external). **No related-post card** renders.
> - **External destinations:** Upwork `https://www.upwork.com/` — **403 bot challenge** to automated fetch and real browser (unverifiable, not evidence of breakage) · Fiverr `https://www.fiverr.com/` — **403 bot challenge** (same) · Freelancer `https://www.freelancer.in/` — **200**. All HTTPS; no malformed URL; **no affiliate or tracking parameters**; no sponsorship implication. Minor label nuance: link text "Freelancer" → the `.in` site, while the platform list names "Freelancer.com" (unlinked). Truelancer and WorknHire are named but not linked.
> - **Service architecture:** freelancing skills named ("SEO, social media management, and paid ads", content writing, web development, "Creative Design and Video Editing") are **skills for freelancers**, not MappedSkills offerings. The article makes **no claim that MappedSkills sells them**; no service links. Consistent with §0.21: discussing a discipline does not approve it as a service.
> - **Case-study / work links:** none. No client named.
> - **Claims:** **no numerical statistics, percentages, market-size figures, rankings, traffic, enquiry, conversion, revenue or ROI claims, no client outcomes and no MappedSkills performance claims.** Unsourced qualitative market claims → BLOG-084. Tax/legal statements → BLOG-085. Audience/positioning and first-person biography → BLOG-083. Excerpt wording "Kindly go through Freelancing in India: Your 2025 Guide to Success." is awkward (copy observation only).
> - **Author:** "Amit Gupta"; opening quote self-attributed; the body is written in the first person about the author's own freelancing career and health. Identity and biography are unverified (BLOG-009 question).
> - **CTA / booking:** template only (in-article → `/contact`; sticky "Book a call" → `/schedule-call`, BLOG-010; closing → `/contact` + `/services`). **No direct Calendly link, no "Strategy Call", no "Growth Diagnosis", no duration reference.**
> - **Duplicate/misleading/obsolete links:** none among the article's own links. The template's related-service cards (Google Ads / SEO / Lead Generation, BLOG-007/008) bear no relation to a freelancer-career article.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| BLOG-030 | Table of contents | 12 section links (e.g. "1. Why Freelancing? Breaking Away from …") | `#section-…` | Same-page anchor ×12 (all targets exist) | In-page navigation | KEEP | **KEEP** — owner, 2026-09-19 |
| BLOG-031 | Article body — "Profile on Platforms: … Upwork, Fiverr, and Freelancer" | Upwork | `https://www.upwork.com/` | External (bot-protected — unverifiable by automation) | External reference / example | KEEP | **KEEP** — owner, 2026-09-19 |
| BLOG-032 | Article body — same sentence | Fiverr | `https://www.fiverr.com/` | External (bot-protected — unverifiable by automation) | External reference / example | KEEP | **KEEP** — owner, 2026-09-19 |
| BLOG-033 | Article body — same sentence (link text "Freelancer" → freelancer.in; the later platform list calls it "Freelancer.com", unlinked) | Freelancer | `https://www.freelancer.in/` | External | External reference / example | KEEP | **KEEP** — owner, 2026-09-19 |
| BLOG-083 | Whole article (title, excerpt, first-person narrative) | Audience and positioning: a first-person career guide for **freelancers** ("insights from my four years of freelancing"; "Starting my freelancing career was a turning point…"); title "Your **2025** Guide to Success" displayed July 2026 | — (positioning) | Content aimed outside the ICP | Article purpose | **REVIEW — OWNER DECISION:** the audience (aspiring freelancers, students, homemakers, job-leavers) is outside MappedSkills' ICP, and `/lead-generation` lists job/student enquiries as not counting. Keep as-is, rewrite, or unpublish? The first-person biographical claims are unverified (author identity is the BLOG-009 question). The "2025" title is dated. Not decided here | **UNPUBLISH ARTICLE** — owner, 2026-09-19: `/blog/freelancing-in-india` approved for LATER unpublish (content/architecture decision). Not unpublished, redirected, deleted or rewritten now |
| BLOG-084 | Article body — intro, "Highest-Paying Freelancing Jobs", "Future Scope" | Unsourced market claims: "Freelancing in India has grown tremendously"; "Skilled developers are among the highest-paid freelancers"; "Visual content creation has surged"; "opportunities are only set to grow"; "unparalleled flexibility" | — (claim) | Unsourced market/growth assertions and a prediction | Educational context | **REVIEW — EVIDENCE REQUIRED OR WORDING CHANGE:** no source cited and none in the repository. No numbers, percentages or MappedSkills/client results are involved | **SUBSUMED under BLOG-083 (unpublish)** — owner, 2026-09-19: supporting observation; not substantiated, rewritten or independently remediated |
| BLOG-085 | Article body — "Taxation and Legalities for Freelancers in India" | Tax/legal statements: "Is freelancing in India legal? Absolutely!"; "Freelance income is taxed under Income from Business or Profession in India"; "Registering as a sole proprietor or business entity can have additional tax benefits" | — (claim) | Legal/tax information | Reader guidance | **REVIEW — QUALIFIED TAX/LEGAL REVIEW:** not assessed here (no legal/tax verdict). `/terms` states website content "should not be treated as professional legal, financial, or tax advice"; this section reads as such advice. Not rewritten | **SUBSUMED under BLOG-083 (unpublish)** — owner, 2026-09-19: supporting observation (tax/legal statements would need qualified review only if the content were ever retained publicly); not independently remediated |

### 4.6 `/blog/importance-of-content-writing`

Template links: same as §4.1 baseline. Article-specific links:

> **Article review (2026-09-19) — article 4 of 8 in the audit's `/blog` order. Read-only; nothing edited.**
>
> - **Identity:** H1 "The Importance of Content Writing: A Guide for Business Owners and Marketing Managers" · **document `<title>` differs:** "Content Writing: The Key to Boosting Your Brand’s Reach" · slug `importance-of-content-writing` · live URL `https://mappedskills.com/blog/importance-of-content-writing` · HTTP 200 · canonical self · **no `meta robots`** (SEO-005) · in `sitemap.xml`. **Contentful entry ID: not exposed** (no Contentful asset URL on this page); Contentful not queried.
> - **Displayed metadata (observable only):** category "Brand Strategy" · author "Amit Gupta" · displayed publication date **July 16, 2026** · displayed updated date **September 18, 2026** · "5 min read". Structured `datePublished` `2026-07-16T10:14:50.982Z` / `dateModified` `2026-09-18T05:05:44.126Z` correspond. **SEO-007 remains OPEN**; neither date is asserted as more than displayed.
> - **Links:** article-specific = **5 TOC anchors only** (BLOG-034; all resolve). **No article-body links (internal or external)**, so no 404s, no redirects, no new-tab internal links, no external-link issues. **No link to `/blog/freelancing-in-india`.** No related-post card. Template links as §4.1.
> - **TOC coverage (observation):** the body contains three further H2 sections ("Is Content Writing a Good Career Choice?", "Actionable Tips for Getting Started with Content Writing", "Getting the Right Support: Why Partner with a Content Writing Agency") that the generated table of contents does not list. The anchors that exist all work.
> - **Tools/platforms named, not linked:** Grammarly, Hemingway Editor, Yoast SEO, Coursera, Udemy, LinkedIn Learning, Upwork, Fiverr, Freelancer. No affiliate or sponsored link.
> - **Service architecture:** SEO content, social media content, email newsletters, copywriting and content calendars are discussed as **content-writer activities**, not as MappedSkills services. The closing "partner with a content writing agency" does not name MappedSkills but, on MappedSkills' site, may read as an implied offer → BLOG-086. No service links.
> - **Case-study / work links:** none. No client named.
> - **Claims:** **no statistics, percentages, market-size figures, rankings, traffic, enquiry, conversion, revenue, ROI, client outcomes or MappedSkills performance claims.** Unsourced qualitative assertions → BLOG-087. Opening quote attributed to Rebecca Lieb.
> - **Author:** "Amit Gupta"; profile link is template BLOG-009 (open).
> - **CTA / booking:** template only (in-article → `/contact`; sticky "Book a call" → `/schedule-call`, BLOG-010; closing → `/contact` + `/services`). **No direct Calendly link, no "Strategy Call", no "Growth Diagnosis", no duration reference.**
> - **Incoming dependency (VERIFIED against the audit inventory):** this article is the destination chosen for **BLOG-014** (article 1, owner-approved CHANGE) and recommended for **BLOG-043** (article 6, pending). Any content decision here should be read with those rows.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| BLOG-034 | Table of contents | 5 section links (e.g. "1. What is a Content Writer?") | `#section-…` | Same-page anchor ×5 (all targets exist) | In-page navigation | KEEP | **KEEP** — owner, 2026-09-19 |
| BLOG-086 | Whole article — sections "Is Content Writing a Good Career Choice?", "Actionable Tips for Getting Started with Content Writing", "Getting the Right Support: Why Partner with a Content Writing Agency" | Positioning: part business guide, part **career guide for content writers** (online courses, freelancing platforms, "flexible and fulfilling career path", "financial stability"); closes by recommending "partnering with a content writing agency" | — (positioning) | Mixed audience; implied agency service | Article purpose | **REVIEW — OWNER DECISION:** the career-guidance sections address job-seekers/writers, outside the ICP (compare BLOG-083). The agency close may imply a content-writing service, which is not in the approved architecture (§0.21: Content Marketing not a standalone service). Keep, rewrite (for example, remove the career sections), or unpublish? **Dependency:** this article is the approved target of **BLOG-014** (article 1) and the recommended target of **BLOG-043** (article 6); an unpublish decision would reopen both | **KEEP ARTICLE; CONTENT REPOSITIONING REQUIRED** — owner, 2026-09-19: do NOT unpublish; later reconciliation makes it consistently useful to the buyer/ICP; no standalone Content Writing/Content Marketing service to be created. BLOG-014 remains approved (not reopened) |
| BLOG-087 | Article body — intro, "Why is Content Writing Important?", career section, conclusion | Unsourced assertions: "the importance of content writing has grown significantly"; "the demand for content writers is at an all-time high"; "Content writing for SEO is one of the most effective ways to attract website visitors"; "brands can attract qualified leads"; "abundant opportunities … financial stability" | — (claim) | Unsourced qualitative claims | Educational persuasion | **REVIEW — EVIDENCE REQUIRED OR WORDING CHANGE:** no source cited; none in the repository. No numbers, percentages, client or MappedSkills results involved | **OPEN — EVIDENCE REQUIRED OR WORDING CHANGE** (kept by owner, 2026-09-19); not researched or rewritten during routing review |

### 4.7 `/blog/performance-marketing-vs-digital-marketing`

Template links: same as §4.1 baseline. Article-specific links:

> **Article review (2026-09-19) — article 5 of 8 in the audit's `/blog` order. Read-only; nothing edited.**
>
> - **Identity:** H1 "Performance Marketing vs. Digital Marketing: Which is Right for Your Business?" · document `<title>` "Performance Marketing vs. Digital Marketing" · slug `performance-marketing-vs-digital-marketing` · live URL `https://mappedskills.com/blog/performance-marketing-vs-digital-marketing` · HTTP 200 · canonical self · **no `meta robots`** (SEO-005) · in `sitemap.xml`. **Contentful entry ID: not exposed** (public space `owww06rzpjnj` visible only in an image-asset URL); Contentful not queried.
> - **Displayed metadata (observable only):** category "Insights" · author "Amit Gupta" · displayed publication date **July 16, 2026** · displayed updated date **September 18, 2026** · "4 min read". Structured `datePublished` `2026-07-16T10:11:10.037Z` / `dateModified` `2026-09-18T05:07:41.212Z` correspond. **SEO-007 remains OPEN.**
> - **Links:** article-specific = **6 TOC anchors only** (BLOG-035; all resolve). **No article-body links (internal or external)**, so no 404s, no redirects, no internal new-tab links, no external-link issues. **No link to `/blog/freelancing-in-india`** (approved for later unpublish) **or to `/blog/importance-of-content-writing`.** No related-post card. Template links as §4.1.
> - **TOC coverage (observation):** body H2s "Why Performance Marketing?", "Difference Between Performance Marketing and Digital Marketing" and "Which Type of Digital Marketing is Best?" are not in the generated TOC. The section "Affiliate Marketing vs. Digital Marketing" lists only affiliate-marketing pros; the heading promises a comparison the section does not make (copy observation).
> - **Service architecture:** SEO, social media marketing, content marketing, email marketing, affiliate networks, Google Ads and social media ads are named **educationally as channels**, with no service links and no statement that MappedSkills sells them. Affiliate marketing is not in the approved architecture and is not presented as offered. Consistent with the rule that educational discussion is not proof of a service.
> - **Case-study / work links:** none. No client named.
> - **Claims:** no statistics, percentages, market-size figures, rankings, traffic, enquiry or revenue figures, and no client or MappedSkills results. **Material:** a **guarantee** ("guarantees that you get what you pay for"), an unsourced **ROI** claim, and pay-for-results framing → **BLOG-088**. Other unsupported qualifiers: "best results", "optimal results", "minimal risk", "ensuring high performance". Opening quote attributed to Seth Godin.
> - **Positioning:** the article reinforces "performance marketing" as the value proposition → **BLOG-089**. **Template observation (all articles, not only this one):** the author bio fallback reads "Performance Marketing Strategist" / "contributes performance marketing insights for MappedSkills" (`app/(pages)/blog/[slug]/page.tsx`), the same identity framing; recorded here for the later content/template review under BLOG-009's scope, not as a new routing decision.
> - **Author:** "Amit Gupta"; profile link is template BLOG-009 (open).
> - **CTA / booking:** template only (in-article → `/contact`; sticky "Book a call" → `/schedule-call`, BLOG-010; closing → `/contact` + `/services`). **No direct Calendly link, no "Strategy Call", no "Growth Diagnosis", no duration reference.**

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| BLOG-035 | Table of contents | 6 section links (e.g. "1. What is Performance Marketing in Dig…") | `#section-…` | Same-page anchor ×6 (all targets exist) | In-page navigation | KEEP | **KEEP** — owner, 2026-09-19 |
| BLOG-088 | Article body — "Why Performance Marketing?", performance-marketing pros, "How Performance Marketing Works", conclusion | Guarantee / pay-for-results / ROI claims: "the performance marketing approach **guarantees** that you get what you pay for"; "You only pay when specific outcomes are achieved, ensuring that your budget is spent effectively"; "Higher ROI … it often provides a better return on investment"; "minimal risk"; "cost-effective strategy"; "ensure optimal results" | — (claim) | Guarantee language + unsourced ROI claim + pay-per-result framing | Persuasion | **REVIEW — WORDING CHANGE REQUIRED (recommended):** (1) "guarantees" conflicts with the site's no-guarantee position (`/terms` "No Guarantee of Results"; FAQ; `/google-ads`); (2) "Higher ROI" is unsourced; (3) the pay-only-for-outcomes description does not match how the ad platforms MappedSkills uses (Google Ads, Meta) are ordinarily billed, and on MappedSkills' site may imply pay-for-results pricing, whereas the owner-confirmed model is a **custom quoted fee** (§0.14, §0.18) | **WORDING CHANGE REQUIRED** — owner, 2026-09-19: later rewrite must distinguish (1) performance marketing as a concept, (2) how ad platforms actually charge, (3) MappedSkills' own commercial model; must NOT imply pay-per-result pricing; no commercial model invented |
| BLOG-089 | Whole article (title, framing, author bio) | Positioning: the article promotes **performance marketing** as the results-focused choice; the template author bio reads "Performance Marketing Strategist … contributes performance marketing insights" | — (positioning) | Superseded identity framing | Article purpose | **REVIEW — OWNER DECISION:** the programme records "performance marketing agency" as MappedSkills' "current, non-performing identity" (`POSITIONING.md`) and requires "Never 'performance marketing agency'" in copy (`CAPABILITY_LANGUAGE.md`). The article does not use that exact phrase, but its premise reinforces the superseded positioning. Keep as neutral education (with BLOG-088 fixed), reposition, or unpublish? Not decided here | **KEEP ARTICLE; CONTENT REPOSITIONING REQUIRED** — owner, 2026-09-19: do NOT unpublish; topic may remain; must not reinforce the retired "performance marketing agency" positioning |

### 4.8 `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers`

Template links: same as §4.1 baseline. Article-specific links:

> **Article review (2026-09-19) — article 6 of 8 in the audit's `/blog` order. Read-only; nothing edited.**
>
> - **Identity:** H1 "7 Proven Strategies of Digital Marketing for Real Estate Developers" · document `<title>` "Digital Marketing for Real Estate Strategies" · slug `7-proven-strategies-of-digital-marketing-for-real-estate-developers` · live URL `https://mappedskills.com/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` · HTTP 200 · canonical self · **no `meta robots`** (SEO-005) · in `sitemap.xml`. **Contentful entry ID: not exposed** (public space `owww06rzpjnj` visible only in an image-asset URL); Contentful not queried.
> - **Displayed metadata (observable only):** category "Real Estate" · author "Amit Gupta" (opening quote self-attributed) · displayed publication date **July 16, 2026** · displayed updated date **September 18, 2026** · "14 min read". Structured `datePublished` `2026-07-16T10:06:05.853Z` / `dateModified` `2026-09-18T05:09:03.009Z` correspond. **SEO-007 remains OPEN.**
> - **Links:** 22 TOC anchors (BLOG-036; all resolve) + **24 article-body links** (BLOG-037 – BLOG-060), each located above by its sentence. **All 24 body links open in a new tab.**
> - **Status summary:** **404 (after trailing-slash 308)** — BLOG-038, -039, -041, -043, -044, -045, -052, -053, -060 (9) · **redirect-dependent internal** — BLOG-037 (→ `/blog`), -048 (→ `/google-ads`), -049 (→ `/social-media-ads`), -050 (→ `/lead-generation`), -051 (→ `/seo`), all 2 hops · **external 200** — Zillow, CoStar, MagicBricks, 99acres, Godrej, Lodha · **external bot-protected** — Redfin (429), Realtor.com (429) · **external redirect** — pickyassist (301 → trailing slash).
> - **Broken internal destination types:** existing blog article — BLOG-043 (`/blog/importance-of-content-writing`, still published) · missing case study — BLOG-038 (Omaxe), BLOG-041 (Emaar Mohali Hills), BLOG-044 (Google Ads for real estate) · missing service page, not approved — BLOG-039 (organic social management; explicitly not offered), BLOG-045 (video editing), BLOG-052 (web design), BLOG-053 (email marketing), BLOG-060 (marketing automation; pillar 3 hypothesis only). The only obvious existing corresponding destination is BLOG-043's; **BLOG-044's earlier "probable" match (`/portfolio/google-ppc-for-real-estate`) is The Fine Living Group — permission NOT held — so it is withdrawn.**
> - **Internal links opening in a new tab (BLOG-012):** all **14** internal body links — BLOG-037, -038, -039, -041, -043, -044, -045, -048, -049, -050, -051, -052, -053, -060. The 10 external body links also open in a new tab, which is normal for external links.
> - **Repeated anchor text:** "lead generation strategies for real estate" is linked **four times to four different destinations** (BLOG-038 Omaxe case study, BLOG-041 Emaar case study, BLOG-044 Google Ads case study, BLOG-050 `/lead-generation`). The phrase also appears unlinked roughly 20 more times. Misleading as navigation; resolved by the row decisions.
> - **External-link issues:** `http://Realtor.com` (insecure, capitalised; BLOG-042) · **affiliate/referral** `pickyassist.com/en?fpr=3offa` twice (BLOG-056, BLOG-059; `rel="noopener noreferrer"` only, no `sponsored`, no disclosure) · no malformed domains, no obsolete social destinations in the body. Salesforce, HubSpot, Google Keyword Planner, UberSuggest and PageSpeed Insights are named but not linked.
> - **Service links vs approved architecture:** approved services reached (via redirects): Google Ads (BLOG-048), Social Media Ads (BLOG-049), Lead Generation (BLOG-050), SEO (BLOG-051). Non-approved: content marketing (→ `/blog`), social media management, video, web design, email, marketing automation → BLOG-092. **Retargeting** is recommended educationally ("Retargeting Ads for Maximum Impact"); the article does not claim MappedSkills runs it (retargeting is not established — §0.15).
> - **Case-study / work links:** three, all nonexistent; **none of the referenced clients has recorded permission** (Omaxe, Emaar: no fact; the Google Ads real-estate case's live counterpart is The Fine Living Group: permission NO). None is to be created or re-routed to an existing case study. No `/work` link.
> - **Dependencies:** **no link to `/blog/freelancing-in-india`.** BLOG-043 → `/blog/importance-of-content-writing` evaluated normally (that article stays published; BLOG-014 remains approved).
> - **Claims:** MappedSkills results claim and hype → **BLOG-090** · named-company claims → **BLOG-091** · service positioning → **BLOG-092**. Illustrative targets "increasing web traffic by 20% in three months or reducing customer acquisition costs by 15%" are presented as **example benchmarks to set**, not as results; not flagged as claims. "multimedia-rich pages are favored by search engines" is an unsourced general SEO assertion (covered by the BLOG-090 wording review). No client outcomes and no guarantee as such.
> - **Author:** "Amit Gupta"; template profile/bio issue is BLOG-009 (open, expanded).
> - **CTA / booking:** template only (in-article → `/contact`; sticky "Book a call" → `/schedule-call`, BLOG-010; closing → `/contact` + `/services`). **No direct Calendly link, no "Strategy Call", no "Growth Diagnosis", no duration reference.**

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| BLOG-036 | Table of contents | 22 section links (e.g. "1. Leveraging Social Media Platforms") | `#section-…` | Same-page anchor ×22 (all targets exist) | In-page navigation | KEEP | **KEEP** — owner, 2026-09-19 |
| BLOG-037 | Intro — "…where compelling content marketing strategies bring your unique offerings to life" | compelling content marketing strategies | `https://mappedskills.com/content-marketing-services/` | Internal redirect → `/blog` (2 hops) | Service discovery — content marketing (lands on blog) | **REVIEW — CHANGE REQUIRED (recommended; same pattern as owner-decided BLOG-017):** `/blog` is not a Content Marketing service page; resolve with the article's positioning (BLOG-092). Opens in a new tab (BLOG-012). | **CHANGE REQUIRED** — owner, 2026-09-19: `/blog` is not a Content Marketing service page; no standalone Content Marketing page; resolve in content reconciliation consistently with BLOG-017 and BLOG-081 |
| BLOG-038 | Intro — "From virtual tours to engaging video content, you can use lead generation strategies for real estate…" | lead generation strategies for real estate | `https://mappedskills.com/portfolio/lead-generation-for-real-est…` | Internal 404 (after trailing-slash redirect) | Case-study proof (page missing) | **REVIEW — REMOVE recommended.** Destination type: missing case study (Omaxe). Omaxe is **not** among the owner permission facts — **OWNER FACT REQUIRED** if a case study were ever proposed; even with permission, a generic educational sentence is not an appropriate case-study anchor. Do not create the page or route to another case study. | **REMOVE** — owner, 2026-09-19: no replacement case study; no redirect to `/work`; no substitute client case study |
| BLOG-039 | "Building an Engaging Social Media Presence" — heading sentence | social media presence | `https://mappedskills.com/social-media-management/` | Internal 404 (after trailing-slash redirect) | Service discovery (page missing) | **REVIEW — REMOVE LINK recommended** (same as owner-decided BLOG-020): organic social media management is not offered (§0.15). Do not redirect to `/social-media-ads`; do not create the page. | **REMOVE LINK** — owner, 2026-09-19: organic Social Media Management is not offered; no page to be created |
| BLOG-040 | "Building an Engaging Social Media Presence" — "Take inspiration from brands like Zillow…" | Zillow | `https://www.zillow.com/` | External | External reference / example | KEEP | **KEEP** — owner, 2026-09-19 |
| BLOG-041 | "User-Generated Content" — Pinterest paragraph | lead generation strategies for real estate | `https://mappedskills.com/portfolio/lead-generation-for-real-est…` | Internal 404 (after trailing-slash redirect) | Case-study proof (page missing) | **REVIEW — REMOVE recommended.** Destination type: missing case study (Emaar Mohali Hills). Not among the permission facts — **OWNER FACT REQUIRED** if ever proposed; the generic sentence is not an appropriate case-study anchor. Do not create the page. | **REMOVE** — owner, 2026-09-19: no replacement case study; no redirect to `/work`; no substitute client case study |
| BLOG-042 | "User-Generated Content" — "Take inspiration from brands like Realtor.com…" | Realtor.com | `http://Realtor.com` | External (bot-protected — unverifiable by automation) | External reference / example | **CHANGE → `https://www.realtor.com/`** — Insecure `http://` scheme and capitalised host; this is where it already resolves. | **CHANGE → `https://www.realtor.com/`** — owner, 2026-09-19. Canonical-destination decision only; context/content concerns governed by BLOG-090/091/092. Not implemented |
| BLOG-043 | "Creating Compelling Content Marketing Strategies" — "In today’s digital landscape, content is king…" | content is king | `https://mappedskills.com/importance-of-content-writing/` | Internal 404 (after trailing-slash redirect) | Educational content (old URL) | **REVIEW — CHANGE → `/blog/importance-of-content-writing` recommended.** Destination type: existing blog article; it remains published (BLOG-086, repositioning later), consistent with owner-approved BLOG-014. Opens in a new tab (BLOG-012). | **CHANGE → `/blog/importance-of-content-writing`** — owner, 2026-09-19. Canonical-destination decision only; context/content concerns governed by BLOG-090/091/092. Not implemented |
| BLOG-044 | "Developing a Consistent Content Calendar" — "…enhancing your lead generation strategies for real estate" | lead generation strategies for real estate | `https://mappedskills.com/portfolio/google-ads-for-real-estate/` | Internal 404 (after trailing-slash redirect) | Case-study proof (page missing) | **REVIEW — REMOVE recommended. Earlier "probable destination `/portfolio/google-ppc-for-real-estate`" is WITHDRAWN:** that case study is **The Fine Living Group**, for which the owner has confirmed **written permission is NOT held** (§0.6). Do not route a broken link to an unpermissioned case study; do not create the page. | **REMOVE** — owner, 2026-09-19: no replacement case study; no redirect to `/work`; do NOT use `/portfolio/google-ppc-for-real-estate` (The Fine Living Group — written permission NO) |
| BLOG-045 | "Elevating Content with Virtual Tours" — "…integrating virtual tours and video content" | video content | `https://mappedskills.com/video-editing-services/` | Internal 404 (after trailing-slash redirect) | Service discovery (page missing) | **REVIEW — REMOVE SERVICE LINK recommended** (same as owner-decided BLOG-018): video editing is not an approved service; no page to be created. Educational discussion of video is not prohibited. | **REMOVE SERVICE LINK** — owner, 2026-09-19: Video Editing not approved; no page to be created |
| BLOG-046 | "Leveraging Data Analytics" — "Take inspiration from brands like Redfin and CoStar Group…" | Redfin | `https://www.redfin.com/` | External (bot-protected — unverifiable by automation) | External reference / example | KEEP | **KEEP** — owner, 2026-09-19 |
| BLOG-047 | "Leveraging Data Analytics" — same sentence | CoStar Group | `https://www.costargroup.com/` | External | External reference / example | KEEP | **KEEP** — owner, 2026-09-19 |
| BLOG-048 | "Leveraging Data Analytics" — same sentence ("…optimize conversions on their Google Ads and Social Media Ads") | Google Ads | `https://mappedskills.com/google-ads-service/` | Internal redirect → `/google-ads` (2 hops) | Service discovery — Google Ads | **CHANGE → `/google-ads`** (same final page, without 2 redirect hops). **Context caution:** the link sits in a sentence about Redfin/CoStar's own campaigns and may imply an association (BLOG-091). | **CHANGE → `/google-ads`** — owner, 2026-09-19. Canonical-destination decision only; context/content concerns governed by BLOG-090/091/092. Not implemented |
| BLOG-049 | "Leveraging Data Analytics" — same sentence | Social Media Ads | `https://mappedskills.com/social-media-advertising/` | Internal redirect → `/social-media-ads` (2 hops) | Service discovery — Paid social | **CHANGE → `/social-media-ads`** (same final page, without 2 redirect hops). **Context caution:** same Redfin/CoStar sentence (BLOG-091). | **CHANGE → `/social-media-ads`** — owner, 2026-09-19. Canonical-destination decision only; context/content concerns governed by BLOG-090/091/092. Not implemented |
| BLOG-050 | "Retargeting Ads…" close — "supports effective lead generation strategies for real estate" | lead generation strategies for real estate | `https://mappedskills.com/lead-generation-services/` | Internal redirect → `/lead-generation` (2 hops) | Service discovery — Lead generation | **CHANGE → `/lead-generation`** — Same final page, without 2 redirect hop(s). Opens in a new tab (policy: BLOG-012). | **CHANGE → `/lead-generation`** — owner, 2026-09-19. Canonical-destination decision only; context/content concerns governed by BLOG-090/091/092. Not implemented |
| BLOG-051 | "Local SEO for Real Estate Developers" — "By tailoring SEO strategies with geographic-specific keywords…" | SEO strategies | `https://mappedskills.com/seo-services/` | Internal redirect → `/seo` (2 hops) | Service discovery — SEO | **CHANGE → `/seo`** — Same final page, without 2 redirect hop(s). Opens in a new tab (policy: BLOG-012). | **CHANGE → `/seo`** — owner, 2026-09-19. Canonical-destination decision only; context/content concerns governed by BLOG-090/091/092. Not implemented |
| BLOG-052 | "Ensuring Optimal Website Performance" — first sentence (anchor text truncated: "Website performanc") | Website performanc | `https://mappedskills.com/web-designing-services/` | Internal 404 (after trailing-slash redirect) | Service discovery (page missing) | **REVIEW — REMOVE SERVICE LINK recommended:** web design is not an approved service; no page to be created. The anchor text is also truncated ("Website performanc"). | **REMOVE SERVICE LINK** — owner, 2026-09-19: Web Design not approved; no page to be created |
| BLOG-053 | "Harnessing the Power of Email Marketing" — first sentence | email campaigns | `https://mappedskills.com/email-marketing-services/` | Internal 404 (after trailing-slash redirect) | Service discovery (page missing) | **REVIEW — REMOVE SERVICE LINK recommended** (same as owner-decided BLOG-021): email marketing is not an approved service; no page to be created. | **REMOVE SERVICE LINK** — owner, 2026-09-19: Email Marketing not approved; no page to be created |
| BLOG-054 | "Captivating Subject Lines…" — "Take inspiration from brands like MagicBricks and 99acres…" | MagicBricks | `https://www.magicbricks.com/` | External | External reference / example | KEEP | **KEEP** — owner, 2026-09-19 |
| BLOG-055 | "Captivating Subject Lines…" — same sentence | 99acres | `https://www.99acres.com/` | External | External reference / example | KEEP | **KEEP** — owner, 2026-09-19 |
| BLOG-056 | "Building Strong Relationships Through CRM Tools" — "The first step in leveraging CRM technology…" | leveraging CRM technology | `https://pickyassist.com/en?fpr=3offa` | External (redirects → pickyassist.com/en/?fpr=3offa) | Vendor recommendation (affiliate URL) | **REVIEW** — Affiliate/referral URL (`?fpr=`) with no `rel="sponsored"` or disclosure; generic anchor text. Keep with disclosure, replace, or remove? | **REMOVE AFFILIATE LINK** — owner, 2026-09-19: referral parameter with no established disclosure/sponsored-link treatment; do not replace with another affiliate link; educational mention of CRM tools allowed |
| BLOG-057 | "Maximizing CRM Efficiency with Automation" — "Take inspiration from brands like Godrej Properties and Lodha Group…" | Godrej Properties | `https://www.godrejproperties.com/` | External | External reference / example | KEEP | **KEEP** — owner, 2026-09-19 |
| BLOG-058 | "Maximizing CRM Efficiency with Automation" — same sentence | Lodha Group | `https://www.lodhagroup.com/` | External | External reference / example | KEEP | **KEEP** — owner, 2026-09-19 |
| BLOG-059 | "Maximizing CRM Efficiency with Automation" — same sentence ("…the potential of CRM Tools…") | CRM Tools | `https://pickyassist.com/en?fpr=3offa` | External (redirects → pickyassist.com/en/?fpr=3offa) | Vendor recommendation (affiliate URL) | **REVIEW** — Affiliate/referral URL (`?fpr=`) with no `rel="sponsored"` or disclosure; generic anchor text. Keep with disclosure, replace, or remove? | **REMOVE AFFILIATE LINK** — owner, 2026-09-19: referral parameter with no established disclosure/sponsored-link treatment; do not replace with another affiliate link; educational mention of CRM tools allowed |
| BLOG-060 | "Maximizing CRM Efficiency with Automation" — same sentence ("…used marketing automation strategies…") | marketing automation | `https://mappedskills.com/marketing-automation-services/` | Internal 404 (after trailing-slash redirect) | Service discovery (page missing) | **REVIEW — OWNER DECISION; REMOVE SERVICE LINK recommended** unless the owner separately approves marketing automation as a service (pillar 3 is a WORKING HYPOTHESIS only). No page to be created. | **REMOVE SERVICE LINK** — owner, 2026-09-19: Marketing Automation is NOT approved as a MappedSkills service; no page to be created |
| BLOG-090 | Excerpt, title, intro and close | MappedSkills results claim and evidence-dependent language: excerpt "Boost sales with Digital Marketing for Real Estate Strategies—SEO to lead generation, **MappedSkills gets results.**"; title "7 **Proven** Strategies"; "unlock the secrets to unparalleled success"; "fuel growth like never before"; "deliver results!"; "Retargeting Ads for **Maximum** Impact"; "a true game-changer"; "drive measurable results"; "a **proven** way to strengthen buyer relationships"; "unprecedented growth" | — (claim) | Unevidenced MappedSkills results claim + hype | Persuasion | **REVIEW — WORDING CHANGE REQUIRED (recommended):** "MappedSkills gets results" is a MappedSkills performance claim with no evidence (`DEC-012`; carried from PAGE-053). The rest is unsupported evidence-dependent language. **Metadata:** document `<title>` "Digital Marketing for Real Estate Strategies" differs from the H1; a "7 strategies" title sits over 22 TOC sections ("seven secrets") | **WORDING CHANGE REQUIRED** — owner, 2026-09-19; do not fabricate evidence to preserve the claims |
| BLOG-091 | "Building an Engaging Social Media Presence", "User-Generated Content", "Leveraging Data Analytics", "Captivating Subject Lines…", "Maximizing CRM Efficiency…" | Unsourced claims about named companies' marketing: Zillow ("leverage Instagram Stories and Reels"), Realtor.com ("leverage User-Generated Content"), Redfin and CoStar Group ("leveraged data analytics to constantly monitor and optimize conversions on their Google Ads and Social Media Ads"), MagicBricks and 99acres ("leveraged email marketing strategies"), Godrej Properties and Lodha Group ("leveraged … CRM Tools and used marketing automation strategies") | — (claim) | Third-party factual claims | Illustration | **REVIEW — EVIDENCE REQUIRED OR WORDING CHANGE:** none sourced; none in the repository. The Redfin/CoStar sentence links "Google Ads" and "Social Media Ads" to **MappedSkills' own service pages** (BLOG-048/049), which can read as implying MappedSkills ran those campaigns. None of these companies is a recorded client | **EVIDENCE OR CONTEXT CHANGE REQUIRED** — owner, 2026-09-19; fix the Redfin/CoStar passage so MappedSkills service links cannot imply MappedSkills ran their campaigns; no client relationship to be inferred |
| BLOG-092 | Whole article (link architecture) | Service positioning: educational phrases are linked to MappedSkills service URLs for content marketing (BLOG-037), organic social media management (BLOG-039), video (BLOG-045), web design (BLOG-052), email marketing (BLOG-053) and marketing automation (BLOG-060), none of which is in the approved architecture | — (positioning) | Implied offering of non-approved services | Article purpose | **REVIEW — OWNER DECISION (recommended: CONTENT/SERVICE POSITIONING CHANGE REQUIRED, as owner-decided BLOG-081):** keep the article as education about real-estate marketing, but stop presenting MappedSkills as offering services outside the approved architecture. Not approval to unpublish or create pages | **CONTENT/SERVICE POSITIONING CHANGE REQUIRED** — owner, 2026-09-19; no service pages created as a consequence |

### 4.9 `/blog/seo-company-in-pune`

Template links: same as §4.1 baseline. Article-specific links:

> **Article review (2026-09-19) — article 7 of 8 in the audit's `/blog` order. Read-only; nothing edited.**
>
> - **Identity:** H1 "Best SEO Company in Pune for Businesses That Want Qualified Leads, Not Just Rankings" · document `<title>` "Best SEO Company in Pune for Lead-Driven Growth | MappedSkills" · slug `seo-company-in-pune` · live URL `https://mappedskills.com/blog/seo-company-in-pune` · HTTP 200 · canonical self · **no `meta robots`** (SEO-005) · in `sitemap.xml`. **Contentful entry ID: not exposed** (public space `owww06rzpjnj` visible only in an image-asset URL); Contentful not queried.
> - **Displayed metadata (observable only):** category "Content Marketing" · author "Amit Gupta" · displayed date **July 16, 2026** · **no "Updated" date shown** · "9 min read". Structured `datePublished` = `dateModified` = `2026-07-16T09:50:59.577Z`. **SEO-007 remains OPEN.**
> - **Links:** 40 TOC anchors (BLOG-061; all resolve — the TOC also lists each FAQ question) + **9 article-body link placements → 8 rows** (BLOG-062 – BLOG-069; "SEO services" ×2) + 1 related-post card (BLOG-070 → `/blog/content-marketing-services-in-pune`, article 1, kept with positioning change). **All body links open in a new tab.**
> - **Status summary:** **404** — BLOG-068 only (after trailing-slash 308) · **redirect-dependent internal** — BLOG-063 (→ `/seo`, 2 hops), BLOG-065 (→ `/lead-generation`, 2 hops), BLOG-064/-066/-067 (trailing-slash 308 → 200) · **external** — BLOG-062/-069 Calendly event (200; direct booking, bypasses `/schedule-call`). No HTTP-only, malformed, obsolete-social or **affiliate/referral** URL (Calendly URL carries no parameters).
> - **Broken internal destination type:** BLOG-068 → **existing case study** `/portfolio/seo-for-home-decor-brand` (Home Decor Brand — permission YES; `DEC-012` pending). Identified, **not approved**.
> - **Internal links opening in a new tab (BLOG-012):** 6 rows — BLOG-063 (×2), -064, -065, -066, -067, -068.
> - **Service links vs approved architecture:** SEO (BLOG-063) and Lead Generation (BLOG-065) are approved. The article describes local SEO, technical SEO, content strategy, authority building (including "backlink acquisition") and reporting **within SEO**. "Search Visibility and AI Discoverability" sits within the approved SEO/AI Search scope, with no guarantee. No non-approved service linked.
> - **Case-study links vs permission facts:** BLOG-064 EcoClean — **NO** · BLOG-066 HealthFirst — **NO** · BLOG-067 Ameba Software — **YES** · BLOG-068 Home Decor Brand — **YES**. Permission is necessary, not sufficient: the two permitted studies still need `DEC-012` validation (§0.7) before serving as proof. No `/work` link.
> - **Dependencies:** **no link to `/blog/freelancing-in-india`**; the related-post card links article 1 (kept).
> - **Claims:** **public drafting note** → BLOG-093 · **3–6-month timeline contradicts the approved 12-month position** → BLOG-094 · booking name/duration/"Free" → BLOG-095 · "Best", outcome claim, penalty-recovery capability, mis-category → BLOG-096. **Consistent with the site:** "A credible SEO agency should not guarantee rankings"; red flag "guarantees #1 rankings"; "Results vary by competition…". No statistics, percentages, client results or named-company claims. Target sectors listed (SaaS/software, ed-tech, real estate, consultants, high-ticket services) overlap only partly with the ICP (content observation; no ID).
> - **Author:** "Amit Gupta"; template bio/profile under BLOG-009 (open).
> - **CTA / booking:** direct Calendly links ×2 labelled "Growth Diagnosis" (20-min / 30-min) — **conflict with canonical Client Discovery Call — 30 minutes** (BLOG-062/069, BLOG-095). Template CTAs: in-article → `/contact`; sticky "Book a call" → `/schedule-call` (BLOG-010); closing → `/contact` + `/services`. The article therefore offers **three** booking routes (two direct-Calendly, one via `/schedule-call`) with two durations. No "Strategy Call" wording.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| BLOG-061 | Table of contents | 40 section links (e.g. "1. Why Businesses Hire an SEO Agency in…") | `#section-…` | Same-page anchor ×40 (all targets exist) | In-page navigation | KEEP | **KEEP** — owner, 2026-09-19 |
| BLOG-062 | Intro (and closing CTA block) — "…Book a Growth Diagnosis (20-min). Free. No prep. No pitch." | Book a Growth Diagnosis (20-min) | `https://calendly.com/mappedskills/client-discovery` | External | Booking (direct to Calendly) | **CHANGE → `/schedule-call`** (recommended; booking convention). §0.9: "Growth Diagnosis" is NOT an approved name; "20-min" is incorrect (canonical **Client Discovery Call, 30 minutes**). The adjacent "Free. No prep. No pitch." wording is BLOG-095. | **CHANGE → `/schedule-call`** — owner, 2026-09-19. Not implemented |
| BLOG-063 | "Our SEO Services in Pune" — "You can explore our full SEO services here…" + closing "…explore our SEO services" (×2) | SEO services (×2) | `https://mappedskills.com/seo-services/` | Internal redirect → `/seo` (2 hops) | Service discovery — SEO | **CHANGE → `/seo`** — Same final page, without 2 redirect hop(s). Opens in a new tab (policy: BLOG-012). | **CHANGE → `/seo`** — owner, 2026-09-19. Not implemented |
| BLOG-064 | "Local SEO for Pune Businesses" — "…you may want to review this local SEO case example" | local SEO case example | `https://mappedskills.com/portfolio/local-seo-service-usa/` | Internal redirect → `/portfolio/local-seo-service-usa` (1 hop) | Case-study proof | **REVIEW — REMOVE recommended.** Destination `/portfolio/local-seo-service-usa` is **EcoClean Pros — written permission NO** (§0.6), approved for removal from public case-study surfaces. Do not re-point to another client's case study. | **REMOVE** — owner, 2026-09-19: EcoClean Pros — NO written permission; no redirect to `/work`; no substitute case study; surrounding wording reviewed so it does not remain identifiable client proof |
| BLOG-065 | "We Focus on Business Outcomes…" — "…align SEO with broader lead generation services where needed" | lead generation services | `https://mappedskills.com/lead-generation-services/` | Internal redirect → `/lead-generation` (2 hops) | Service discovery — Lead generation | **CHANGE → `/lead-generation`** — Same final page, without 2 redirect hop(s). Opens in a new tab (policy: BLOG-012). | **CHANGE → `/lead-generation`** — owner, 2026-09-19. Not implemented |
| BLOG-066 | "Who Our SEO Services Are Best Suited For" — "If you want proof by business type…" list item | SEO for healthcare | `https://mappedskills.com/portfolio/seo-healthfirst/` | Internal redirect → `/portfolio/seo-healthfirst` (1 hop) | Case-study proof | **REVIEW — REMOVE recommended.** Destination `/portfolio/seo-healthfirst` is **HealthFirst Clinics — written permission NO** (§0.6). Do not re-point to another client's case study. | **REMOVE** — owner, 2026-09-19: HealthFirst Clinics — NO written permission; no redirect to `/work`; no substitute case study; surrounding wording reviewed so it does not remain identifiable client proof |
| BLOG-067 | Same proof list item | SEO for software business | `https://mappedskills.com/portfolio/seo-ameba-software/` | Internal redirect → `/portfolio/seo-ameba-software` (1 hop) | Case-study proof | **REVIEW — CHANGE → `/portfolio/seo-ameba-software` recommended** (canonical; removes the trailing-slash hop). **Ameba Software — written permission YES** (§0.6); the case study's figures/quotes still require `DEC-012` validation (§0.7) before being relied on as proof. | **CHANGE → `/portfolio/seo-ameba-software`** — owner, 2026-09-19: permission YES allows the public-client architecture; NOT approval of every claim — quotes/figures/results still require DEC-012 validation. Not implemented |
| BLOG-068 | Same proof list item | SEO for home decor brands | `https://mappedskills.com/portfolio/seo-for-home-decor/` | Internal 404 (after trailing-slash redirect) | Case-study proof (page missing) | **REVIEW — CHANGE → `/portfolio/seo-for-home-decor-brand` recommended.** Destination type: existing case study (current URL 404s). **Home Decor Brand — written permission YES** (§0.6); `DEC-012` validation of its figures still pending (§0.7). | **CHANGE → `/portfolio/seo-for-home-decor-brand`** — owner, 2026-09-19: permission YES allows the public-client architecture; NOT approval of every claim — quotes/figures/results still require DEC-012 validation. Not implemented |
| BLOG-069 | Closing "Ready to Build a Stronger Organic Growth Engine?" — "Book a Growth Diagnosis (30-min) · Free. No prep. No pitch." | Book a Growth Diagnosis (30-min) | `https://calendly.com/mappedskills/client-discovery` | External | Booking (direct to Calendly) | **CHANGE → `/schedule-call`** (recommended; booking convention). "Growth Diagnosis" not approved (§0.9); the 30-min duration matches the canonical event. The "Free. No prep. No pitch." wording is BLOG-095. | **CHANGE → `/schedule-call`** — owner, 2026-09-19. Not implemented |
| BLOG-070 | Related posts card | Content Marketing Content Marketing Services in Pune \| Boost Your Business Now Explore to… | `/blog/content-marketing-services-in-pune` | Internal 200 | Educational content | KEEP | **KEEP** — owner, 2026-09-19 |
| BLOG-093 | Article body — "What Results Can You Realistically Expect?" | **Internal editorial note published live:** "Results vary. If you want this page to convert better, add first-party proof like case study summaries, before/after examples, or reporting snapshots." | — (content) | Drafting instruction exposed publicly | None (not for readers) | **REVIEW — REMOVE WORDING (recommended):** an instruction to the site owner, visible to visitors (compare the privacy-policy/terms drafting-note flags, §0.19/§0.20) | **REMOVE WORDING** — owner, 2026-09-19: the internal instruction must not remain public; no fabricated proof/snapshots/results to satisfy it |
| BLOG-094 | "What Results Can You Realistically Expect?" + FAQ "How long does SEO take to show results?" | Timeline: "Most businesses start seeing meaningful movement in **3 to 6 months**"; "Many businesses start seeing meaningful improvements within **3 to 6 months**" | — (claim) | Contradicts the approved site position | Expectation-setting | **REVIEW — WORDING CHANGE REQUIRED (recommended):** conflicts with the approved, published position "Organic search: **12 months and beyond**" (`/faq`) and "a **12-month-plus engine**" (`/seo`). No evidence for 3–6 months in the repository | **WORDING CHANGE REQUIRED** — owner, 2026-09-19: align with the approved 12-month SEO position; no new timeline invented |
| BLOG-095 | Intro and closing booking blocks | Booking offer wording: "Book a **Growth Diagnosis** (**20-min**). **Free.** No prep. No pitch." / "(30-min) … Free." | — (content) | Booking name/duration/price framing | Booking CTA copy | **REVIEW — OWNER DECISION:** "Growth Diagnosis" is not an approved name and "20-min" is incorrect (§0.9: **Client Discovery Call, 30 minutes**). "Free" — under HYBRID (§0.18) the initial conversation **may** be free; whether to state "Free" on the site is an owner wording decision. "No pitch" is consistent with `/schedule-call` ("none of them is a pitch") | **CHANGE TO CANONICAL BOOKING POSITIONING** — owner, 2026-09-19: no "Growth Diagnosis", no "20-min", no "Free"; Client Discovery Call — 30 minutes via `/schedule-call`; "No prep. No pitch." may remain subject to copy review; Calendly not edited |
| BLOG-096 | Title/H1/`<title>`, excerpt, category, FAQ | Claims/positioning: "**Best** SEO Company in Pune" (H1, title, page title "Best SEO Company in Pune for Lead-Driven Growth"); excerpt "MappedSkills helps businesses improve rankings, organic traffic, qualified leads…" (PAGE-054); FAQ "Can you help recover from a Google penalty? **Yes.**"; "customized, data-informed SEO"; category shown "Content Marketing" | — (claim) | Superlative + unevidenced capability/outcome claims + mis-categorisation | Positioning | **REVIEW — EVIDENCE REQUIRED OR WORDING CHANGE:** "Best" is unsupported. The outcome claim is unevidenced (`DEC-012`; the site refuses ranking/traffic promises). **Penalty recovery is not established as a MappedSkills capability** in the repository. The SEO article is mis-tagged "Content Marketing" (also feeds BLOG-007/008's service fallback) | **EVIDENCE OR WORDING CHANGE REQUIRED** — owner, 2026-09-19: "Best" not an established superlative; no penalty-recovery claim unless capability established; fix "Content Marketing" category; preserve the no-ranking-guarantee position |

### 4.10 `/blog/facebook-advertising-agency-pune`

Template links: same as §4.1 baseline. Article-specific links:

> **Article review (2026-09-19) — article 8 of 8 in the audit's `/blog` order. Read-only; nothing edited.**
>
> - **Identity:** H1 "Facebook Advertising Agency in Pune for Facebook & Instagram Ads That Drive Qualified Leads" · document `<title>` "Facebook Advertising Agency in Pune \| FB & Insta Ads Experts" · slug `facebook-advertising-agency-pune` · live URL `https://mappedskills.com/blog/facebook-advertising-agency-pune` · HTTP 200 · canonical self · **no `meta robots`** (SEO-005) · in `sitemap.xml`. **Contentful entry ID: not exposed** (no Contentful asset URL on the page); Contentful not queried.
> - **Displayed metadata (observable only):** category "PPC" · author "Amit Gupta" · displayed date **July 16, 2026** · **no "Updated" date shown** · "9 min read". Structured `datePublished` `2026-07-16T07:51:33.503Z` / `dateModified` `2026-07-16T09:35:12.017Z`. **SEO-007 remains OPEN.**
> - **Links:** 38 TOC anchors (BLOG-071; all resolve; the TOC includes each FAQ question) + **6 article-body links** (BLOG-072 – BLOG-077), all opening in a new tab. No related-post card.
> - **Status summary:** **404** (after trailing-slash 308) — BLOG-073, -074, -075, -076, -077 · **redirect-dependent internal** — BLOG-072 (`/social-media-advertising/` → `/social-media-ads`, 2 hops). **No external links, no affiliate/referral parameters, no direct Calendly link.**
> - **Broken internal destination types:** all five are **missing case studies**; **no corresponding existing destination** is appropriate (four have unknown permission; AnybodyCanBake's existing study is a different service).
> - **Internal links opening in a new tab (BLOG-012):** all 6.
> - **Service links vs approved architecture:** Social Media Ads (BLOG-072) is approved. The article describes paid-social campaign management (approved), but also claims **retargeting, lookalike/customer-list audiences and Meta Pixel setup** → BLOG-099. It does **not** offer organic social management.
> - **Case-study links:** OmSaiGroup, GEMS Education, Mohali Citi Center, Advit Prints — permission **UNKNOWN** · AnybodyCanBake — permission **YES**, but no social-ads study exists. None is to be created or substituted.
> - **Dependencies:** **no link to `/blog/freelancing-in-india`** or to any other reviewed article.
> - **Claims:** second **public editorial note** → BLOG-097 · outcome/positioning/ROI claims → BLOG-100 · capability claims → BLOG-099. **Consistent with the site:** "Any agency promising guaranteed outcomes … is oversimplifying the work"; budget answer declines a universal figure; timeline table (2 weeks / weeks 3–6 / months 2–3) is framed as typical, with "Results vary". No statistics, client result figures or named-company claims.
> - **Author:** "Amit Gupta"; template profile/bio under BLOG-009 (open).
> - **CTA / booking:** "Book a Growth Diagnosis. Free. No prep. No pitch." appears twice as **unlinked text** → BLOG-098 (conflicts with canonical **Client Discovery Call — 30 minutes**; "Free" not an established standing promise). Template CTAs: in-article → `/contact`; sticky "Book a call" → `/schedule-call` (BLOG-010); closing → `/contact` + `/services`. No "Strategy Call" or duration wording.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| BLOG-071 | Table of contents | 38 section links (e.g. "1. Why Hire a Facebook Advertising Agen…") | `#section-…` | Same-page anchor ×38 (all targets exist) | In-page navigation | KEEP | **KEEP** — owner, 2026-09-19 |
| BLOG-072 | "Facebook Ads vs Google Ads…" — "…you can also explore our social media advertising services" | social media advertising services | `https://mappedskills.com/social-media-advertising/` | Internal redirect → `/social-media-ads` (2 hops) | Service discovery — Paid social | **CHANGE → `/social-media-ads`** — Same final page, without 2 redirect hop(s). Opens in a new tab (policy: BLOG-012). | **CHANGE → `/social-media-ads`** — owner, 2026-09-19. Not implemented |
| BLOG-073 | "Proof Through Relevant Campaign Experience" — "Here are a few examples from our paid social work:" list item | Social Media Ads for OmSaiGroup | `https://mappedskills.com/portfolio/social-media-ads-omsaigroup/` | Internal 404 (after trailing-slash redirect) | Case-study proof (page missing) | **REVIEW — REMOVE recommended.** Destination type: missing case study. OmSaiGroup is **not** among the owner permission facts — permission **UNKNOWN** (not to be treated as granted). Do not create the page, redirect to `/work`, or substitute another client's case study. | **REMOVE** — owner, 2026-09-19: publication permission UNKNOWN (not inferred); no case study created; no redirect to `/work`; no substitute; surrounding copy reviewed later so no unsupported identifiable client-proof claim remains |
| BLOG-074 | "Proof Through Relevant Campaign Experience" — "Here are a few examples from our paid social work:" list item | Social Media Ads for GEMS Education | `https://mappedskills.com/portfolio/social-media-ads-gems-educat…` | Internal 404 (after trailing-slash redirect) | Case-study proof (page missing) | **REVIEW — REMOVE recommended.** Destination type: missing case study. GEMS Education is **not** among the owner permission facts — permission **UNKNOWN** (not to be treated as granted). Do not create the page, redirect to `/work`, or substitute another client's case study. | **REMOVE** — owner, 2026-09-19: publication permission UNKNOWN (not inferred); no case study created; no redirect to `/work`; no substitute; surrounding copy reviewed later so no unsupported identifiable client-proof claim remains |
| BLOG-075 | "Proof Through Relevant Campaign Experience" — "Here are a few examples from our paid social work:" list item | Social Media Ads for Mohali Citi Center | `https://mappedskills.com/portfolio/social-media-ads-mohali-citi…` | Internal 404 (after trailing-slash redirect) | Case-study proof (page missing) | **REVIEW — REMOVE recommended.** Destination type: missing case study. Mohali Citi Center is **not** among the owner permission facts — permission **UNKNOWN** (not to be treated as granted). Do not create the page, redirect to `/work`, or substitute another client's case study. | **REMOVE** — owner, 2026-09-19: publication permission UNKNOWN (not inferred); no case study created; no redirect to `/work`; no substitute; surrounding copy reviewed later so no unsupported identifiable client-proof claim remains |
| BLOG-076 | "Proof Through Relevant Campaign Experience" — "Here are a few examples from our paid social work:" list item | Social Media Ads for Advit Prints | `https://mappedskills.com/portfolio/social-media-ads-advit-print…` | Internal 404 (after trailing-slash redirect) | Case-study proof (page missing) | **REVIEW — REMOVE recommended.** Destination type: missing case study. Advit Prints is **not** among the owner permission facts — permission **UNKNOWN** (not to be treated as granted). Do not create the page, redirect to `/work`, or substitute another client's case study. | **REMOVE** — owner, 2026-09-19: publication permission UNKNOWN (not inferred); no case study created; no redirect to `/work`; no substitute; surrounding copy reviewed later so no unsupported identifiable client-proof claim remains |
| BLOG-077 | "Proof Through Relevant Campaign Experience" — "Here are a few examples from our paid social work:" list item | Social Media Ads for AnybodyCanBake | `https://mappedskills.com/portfolio/social-media-ads-anybodycanb…` | Internal 404 (after trailing-slash redirect) | Case-study proof (page missing) | **REVIEW — REMOVE recommended.** Destination type: missing case study. AnybodyCanBake has written permission **YES**, but **no social-ads case study exists**; the existing AnybodyCanBake study (`/portfolio/google-ads-for-online-courses`) is **Google Ads**, a different service. Do not substitute it. Whether MappedSkills ran social ads for AnybodyCanBake is not established in the repository. | **REMOVE** — owner, 2026-09-19: AnybodyCanBake has written permission, but no established Social Media Ads case study exists; the Google Ads study is different evidence and is NOT substituted |
| BLOG-097 | "Proof Through Relevant Campaign Experience" (after the case-study list) | **Internal editorial note published live:** "We also recommend supporting this page over time with: 1. verified performance snapshots 2. campaign objective summaries 3. before/after efficiency improvements 4. vertical-specific case notes 5. creative examples where possible. That will make the page stronger for both conversion and SEO." | — (content) | Drafting instruction exposed publicly | None (not for readers) | **REVIEW — REMOVE WORDING (recommended; same as owner-decided BLOG-093).** No fabricated proof to satisfy it | **REMOVE WORDING** — owner, 2026-09-19: no performance snapshots, case studies or proof to be manufactured to satisfy the note |
| BLOG-098 | Intro and "Ready to Improve…" close | Booking text: "Book a **Growth Diagnosis**. **Free.** No prep. No pitch." (×2) — **plain text, not linked** | — (content) | Non-canonical booking copy + a CTA with no link | Booking CTA | **REVIEW — CHANGE TO CANONICAL BOOKING POSITIONING (recommended; same as owner-decided BLOG-095):** no "Growth Diagnosis", no "Free"; Client Discovery Call — 30 minutes via `/schedule-call`. Currently a dead call-to-action (text reads as a CTA but goes nowhere) | **CHANGE TO CANONICAL BOOKING POSITIONING** — owner, 2026-09-19: Client Discovery Call — 30 minutes via `/schedule-call`; no "Growth Diagnosis"; no standing "Free" promise; "No prep. No pitch." may remain subject to copy review; any intended booking CTA to become a functional link |
| BLOG-099 | "What a Facebook Ads Agency Actually Does", "Instagram Advertising Services", "Retargeting Campaigns", "Our Process" | Capability claims: "website visitor retargeting", "lookalike audiences", "customer list audiences", "Meta Pixel/event setup", "conversion tracking checks", "Retargeting Campaigns … website visitors, ad engagers, video viewers, abandoned lead paths", "WhatsApp lead campaigns" | — (claim) | Capabilities not established in the programme record | Service description | **REVIEW — CAPABILITY VALIDATION OR WORDING CHANGE:** retargeting/pixel-based capability is **not established** (§0.15 NOT ESTABLISHED list; §0.17 SHARED NAV COPY flag on "retargeting"); the approved `/social-media-ads` page does not offer retargeting. If these are done in *clients'* Meta accounts, the delivery capability, consent handling and process must be established by the owner before the article claims them | **CAPABILITY WORDING CHANGE REQUIRED** — owner, 2026-09-19: narrow/remove retargeting, lookalike, customer-list, Meta Pixel and event-setup claims to match established capability. NOT approval to activate Pixel, implement CAPI, retain click IDs, build audience sync, upload customer lists, create retargeting infrastructure or change consent |
| BLOG-100 | H1/`<title>`, intro, "Facebook Ads vs Google Ads", "Who This Service Is Best For", FAQ, category | Positioning/claims: `<title>` "Facebook Advertising Agency in Pune \| FB & Insta Ads **Experts**"; "we help you turn ad spend into a more predictable growth channel"; "reduce wasted spend, improve lead quality"; paid social recommended to "create demand" / "Demand generation … visual storytelling" / "audience warming", "frequent engagement"; FAQ "ROI is typically measured using … ROAS"; category "PPC" | — (claim/positioning) | Unevidenced outcome claims + positioning tension | Positioning | **REVIEW — WORDING CHANGE REQUIRED (recommended):** outcome claims are unevidenced (`DEC-012`). "Experts" is unsupported. Recommending paid social to **create demand** conflicts with the FAQ ("a poor fit where demand would have to be created from nothing"). Engagement/awareness framing conflicts with `CAPABILITY_LANGUAGE.md` (paid social: "must not imply … that reach or engagement is an outcome"). The ROI/ROAS framing sits uneasily with `/google-ads` ("We do not report ROI"). Category "PPC" is mis-tagged for paid social | **WORDING / POSITIONING CHANGE REQUIRED** — owner, 2026-09-19: align with approved paid-social capability language and proof discipline; no invented performance evidence; preserve the rejection of guaranteed outcomes |

### 4.11 Blog-wide owner review (2026-09-19) — presented after article 8; decisions since recorded (§0, §9)

Evidence: live pages of all 8 articles, `app/(pages)/blog/[slug]/page.tsx`, `components/blog/*`, and the audit inventory. Nothing changed.

| ID | Current behaviour | Where | Current destination / implementation | Classification | Practical consequence | Dependencies | Recommendation |
|---|---|---|---|---|---|---|---|
| BLOG-001 | Breadcrumb "Home" | All 8 articles (top) | `/` (200) | KEEP | Standard return path | None | **KEEP** |
| BLOG-002 | Breadcrumb "Blog" | All 8 | `/blog` (200) | KEEP | Returns to the hub; the hub drops article 3's card automatically when it is unpublished | BLOG-083 (hub card PAGE-050) | **KEEP** |
| BLOG-003 | "Tell us what you’re trying to fix" | All 8 — in-article block (`CTABlockFromType`, type "generic") + closing `CTASection` | `/contact` (200) | KEEP | Correct enquiry routing, twice per article | Enquiry convention (§1) | **KEEP** |
| BLOG-004 | Share: LinkedIn | All 8 — share row | `linkedin.com/sharing/share-offsite/?url=…` (new tab) | KEEP | Works; logged-out users get a sign-in step | None | **KEEP** |
| BLOG-005 | Share: Facebook | All 8 — share row | `facebook.com/sharer/sharer.php?u=…` (new tab) | KEEP | Works; logged-out users get a login prompt | None | **KEEP** |
| BLOG-006 | Share button labelled "**Twitter**" with the Twitter icon | All 8 — share row | `twitter.com/intent/tweet?…` → 301 → `x.com/intent/tweet` (new tab) | CHANGE (label) | Works, but uses the platform's former name | None | **CHANGE label to "X"** (the destination may stay; it redirects). Minor |
| BLOG-007 | Sticky sidebar "Related Service" → "Learn More" | All 8 — sidebar | Always `/google-ads` (first item of the fallback list) | CHANGE | Every article, including SEO, email and content articles, promotes Google Ads as *the* related service | BLOG-008 | **CHANGE — use the article's first genuinely related approved service, or omit** |
| BLOG-008 | "Need Help With This?" related-service cards ×3 | All 8 — below the article | `SERVICE_MAP[post.category] ‖ SERVICE_MAP['Marketing Strategy']` → **always** Google Ads / SEO / Lead Generation, because **no live category** (Content Marketing, Email Marketing, Industry Trends, Brand Strategy, Insights, Real Estate, PPC) matches a map key. Fallback copy includes "Long-term **organic growth** strategy" (a term `CAPABILITY_LANGUAGE.md` avoids) | CHANGE — **owner choice of mechanism** | Topic-agnostic cards (e.g. the Facebook-ads article never links `/social-media-ads`); `/ai-seo` is in no map entry | ⚠ **Fixing the categories alone would surface unapproved copy** in the unused entries: "Expert Meta, **LinkedIn, and TikTok** campaign management", "…for **maximum ROI**", "…for **maximum revenue**", "Generate and **qualify** high-quality leads", "Improve lead quality and **qualification** rates" (conflicts with §0.11, §0.13–§0.17, the approved service set) | **CHANGE:** show only topic-relevant services **from the six approved services**, omit the block when none fits, and review all card copy. Mechanism is owner choice: (a) per-article explicit selection, or (b) a cleaned category→service map. Recommend **(a)** — only 7 articles remain |
| BLOG-009 | Author block: name "Amit Gupta"; role "**Performance Marketing Strategist**"; bio "Amit Gupta contributes **performance marketing** insights for MappedSkills."; "Connect on LinkedIn" | All 8 | Name + avatar from the Contentful author entry; **role hard-coded** in the template; bio = Contentful `author.description` **or** template fallback (**fallback renders on all 8** — description empty); LinkedIn **hard-coded** `linkedin.com/in/amit-gupta` (authwall; unverified) | **OWNER CHOICE ×3** | Retired positioning on every article; an unverified personal profile link | BLOG-089 (§0.25 expansion); articles with first-person claims (article 3, unpublishing) | **A — identity/name:** OWNER FACT — confirm "Amit Gupta" is the correct byline for these articles (the name matches the founder referenced in the AI-visibility baseline; authorship of each article is not established). **B — LinkedIn:** OWNER FACT — supply the verified profile URL; **REMOVE the link until verified**. **C — bio/role:** **CHANGE** — remove the hard-coded "Performance Marketing Strategist" role and the fallback bio; owner supplies a bio consistent with CAPTURE → CONVERT → MEASURE. **No bio invented here** |
| BLOG-010 | Sticky sidebar: headline "Want Us to Review This for Your Business?" + "**Book a call**" | All 8 — sidebar | `/schedule-call` (200) | KEEP (routing) | Routes to the canonical booking page (Client Discovery Call — 30 min, §0.9). The headline promises a "review", while the destination is a discovery call | §0.9 booking decisions; §0.18 HYBRID; source comment "booking is not offered here … while it remains owner-blocked" is superseded by §0.9 | **KEEP routing → `/schedule-call`**; carry the headline wording ("Review This") to later copy review (no sidebar redesign) |
| BLOG-011 | "Explore Services" | All 8 — closing section | `/services` (200) | KEEP | Correct hub route | None | **KEEP** |
| BLOG-012 | Internal article-body links open in a new tab | **38 placements in 4 articles:** content-marketing-services-in-pune 11 · 7-proven-strategies 14 · seo-company-in-pune 7 · facebook-advertising-agency-pune 6 (articles 2, 3, 4, 5: none) | Contentful rich-text links with `target="_blank"` | CHANGE (policy) | Internal navigation spawns new tabs, which breaks the back button and fragments sessions | After already-approved REMOVE decisions, **19 placements would remain** (7 / 6 / 5 / 1), including BLOG-017, BLOG-037 (final form pending content reconciliation) and BLOG-024 (reopened) | **Site-wide policy: internal links open in the same tab; external links open in a new tab with `rel="noopener noreferrer"`.** Apply during implementation to the remaining internal links |
| SEO-005 | Blog articles render **no `<meta name="robots">`** | All 8 | Default behaviour = indexable and followable; all 8 are in `sitemap.xml` | Clean decision available | No SEO defect; the missing tag equals `index, follow`. Only an inconsistency with other routes that state it explicitly | Article 3's removal is governed by BLOG-083 (removed from the CMS → out of the hub and sitemap) | **KEEP — no explicit robots tag needed** (optional explicit `index, follow` for consistency is cosmetic) |
| SEO-007 | Displayed date "July 16, 2026" on all 8 (+ "Updated September 18, 2026" on 5) and matching JSON-LD `datePublished`/`dateModified` | All 8 | `sys.firstPublishedAt` / `sys.publishedAt` from Contentful — system timestamps, not authored dates | **OWNER FACT required** | Search engines and readers see all 8 as first published within one morning (07:51–10:25 UTC, 16 Jul 2026). The five "Updated" timestamps fall within five minutes (05:04–05:09 UTC, 18 Sep 2026) | **Facts:** `firstPublishedAt` = when each entry was first published **in this Contentful space**; it does **not** prove historical publication. Evidence suggests earlier originals: Contentful bodies link to legacy root-level URLs of the same articles (`/importance-of-content-writing/`, `/freelancing-in-india/`); article 3's title says "2025". **Unknown:** the original dates, and whether the 18 Sep timestamps reflect substantive edits (they coincide with the 2026-09-18 reconciliation day) | **Keep OPEN pending owner evidence.** Recommended path: do not present `firstPublishedAt` as the original date. If original dates are evidenced (e.g. a legacy export), record them in an authored date field; otherwise either stop displaying dates or label them accurately. Stop showing "Updated" where no substantive edit is evidenced |
| BLOG-024 | Article 1 "freelance writer" link — **reopened** | Article 1 body | Currently a 404 (`/freelancing-in-india/`); the earlier approved target `/blog/freelancing-in-india` is approved for unpublishing | OWNER CHOICE | The link has no suitable live destination: no other article covers freelancing, and the site does not serve that audience (BLOG-083 reasoning) | BLOG-083 | **REMOVE LINK** (no replacement destination identified) |

**Unresolved blog decisions after article 8:** **15** — the 12 template rows BLOG-001 – BLOG-012 (6 recommended KEEP, 1 label CHANGE, 5 requiring a real choice: BLOG-007, 008, 009, 010, 012), **SEO-005**, **SEO-007**, and the reopened **BLOG-024**. Separately, four owner-**kept-open evidence flags** remain for later content work (BLOG-079, BLOG-080, BLOG-082, BLOG-087); these are decided as "open", not awaiting a decision.

## 5. Portfolio / case-study review

Shared navigation on every case study: same as approved global baseline — no page-specific deviation.

### 5.1 Case-study template baseline (identical on all 7 case studies)

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| WORK-001 | Breadcrumb | Home | `/` | Internal 200 | Return home (breadcrumb) | KEEP | **KEEP** — owner, 2026-09-19 |
| WORK-002 | Breadcrumb | Case Studies | `/work` | Internal 200 | Navigation (breadcrumb) | **REVIEW** — Label "Case Studies" — see NAV-011 / NAV-026 naming decision for `/work`. | **KEEP** — owner, 2026-09-19: consistent with approved "Case Studies" naming (NAV-011/NAV-026) |
| WORK-003 | Closing CTA | Tell us what you’re trying to fix | `/contact` | Internal 200 | Primary enquiry CTA | KEEP | **KEEP** — owner, 2026-09-19 |
| WORK-004 | Closing CTA | What we can and cannot show you | `/work` | Internal 200 | Case-study discovery | KEEP — Wording matches the `/work` page heading. | **KEEP DESTINATION; COPY REVIEW LATER** — owner, 2026-09-19: reassess wording only when `/work` content is reconciled; no other destination |

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| WORK-005 | Case-study body (Contentful), 2 case studies | Internal links that open in a new tab (target=_blank) | 2 internal links | Internal (new tab) | Internal navigation | **REVIEW** — Same policy question as BLOG-012, for case-study bodies. | **CHANGE** — owner, 2026-09-19: BLOG-012 policy — internal links (e.g. `/google-ads`) same tab; external client links (e.g. AnybodyCanBake) new tab with safe rel attributes. Implementation not authorized |

### 5.2 `/portfolio/seo-healthfirst`

Template links: same as §5.1 baseline. No case-study-specific links.

> **Portfolio page 1 of 7 — review (2026-09-19). Read-only; nothing edited, unpublished or deleted.**
>
> - **Identity:** H1 "SEO for HealthFirst: Healthcare Website" · `<title>` "SEO for HealthFirst: Healthcare Website \| Case Study \| MappedSkills" · slug `seo-healthfirst` · live URL `https://mappedskills.com/portfolio/seo-healthfirst` · client shown as "HealthFirst, Delhi" / "HealthFirst Clinics" · industry "Healthcare (Multispecialty Clinics)" · service **SEO** · **Contentful entry ID: not exposed**; Contentful not queried.
> - **Publication permission: NO** (owner fact, §0.6). **Owner decision already recorded:** PAGE-039 **REMOVE FROM PUBLIC CASE-STUDY SURFACES**. Repository evidence mentioning HealthFirst: **0 files**.
> - **Links:** template only — breadcrumb "Home" → `/` (WORK-001), "Case Studies" → `/work` (WORK-002), close "Tell us what you’re trying to fix" → `/contact` (WORK-003), "What we can and cannot show you" → `/work` (WORK-004). All internal, 200, same tab. **No service links, no `/schedule-call`, no direct Calendly link, no booking terminology, no external links, no images.**
> - **SEO state (VERIFIED FACT):** HTTP 200 · **`index, follow`** · canonical self · **in `sitemap.xml`** · structured data: site-wide `Organization` only (no Article/Review schema, despite a visible 5-star testimonial).
> - **Proof inventory — every material claim (all client-attributed; none has repository evidence; `DEC-012` not met):**
>   - headline and results: "Decreased bounce rate by **35%** within **four months**"; "Improved pages per session by **40%**"; "Increased patient inquiries through the website by **50%**"; "Organic traffic increased by **25%**";
>   - before/after table: bounce rate **70% → 45%**; pages per session **2.1 → 3.5**; monthly inbound leads **40 → 100**; Domain Authority **30 → 42**;
>   - timeline "June - 2023"; company size "50-100 employees"; target area "Primarily Delhi NCR";
>   - named-client assertions: "HealthFirst Clinics, a **leading** healthcare provider in Delhi"; "attracted significant traffic";
>   - **testimonial:** ★★★★★ "…we’re getting more inquiries than ever…" — "Marketing Director, HealthFirst Clinics" (no named individual; no written verification in the repository);
>   - no screenshots or dashboards.
>   - **Internal inconsistencies (VERIFIED by arithmetic):** pages per session 2.1 → 3.5 is **+67%**, not the stated 40%; monthly leads 40 → 100 is **+150%**, not the stated 50%. Bounce 70% → 45% is consistent with −35% (relative). Domain Authority is a third-party metric, not a client outcome. A results block also appears under the heading "Tools and Technologies" and is duplicated under "Results & Metrics".
> - **Capability/service consistency:** the work described (content optimisation, on-page and technical SEO, internal linking, mobile/page speed) sits within the approved **SEO** service. No capability outside the approved architecture is claimed. The issue is permission and evidence, not scope.
> - **Client-permission consequence:** permission **NO** → the page must cease to be publicly presented or indexed as client-result proof (PAGE-039). Its figures are **not** to be validated or retained in another form.
> - **Dependencies (VERIFIED against the audit inventory):** `/work` card **PAGE-039** (decided REMOVE FROM PUBLIC CASE-STUDY SURFACES) · article 7 "SEO for healthcare" **BLOG-066** (decided REMOVE) · `sitemap.xml` entry (generated from Contentful; disappears with the entry) · `/work` list (Contentful-driven). No other page links here.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| WORK-010 | Whole page `/portfolio/seo-healthfirst` | Removal method and URL treatment for an unpermissioned case study (implementing PAGE-039) | — (page) | 200, `index, follow`, in sitemap | Implementation of the owner removal decision | **REVIEW — OWNER DECISION on URL treatment (recommended):** remove the entry from public surfaces (`/work` list, sitemap, indexable page). Treat the URL **deliberately**, as for BLOG-083: **no automatic redirect** to `/work`, `/services`, `/` or another client's case study; use the technically appropriate removal response unless a genuinely equivalent replacement exists (none does). Do not validate or reuse the figures or testimonial | **REMOVE FROM PUBLICATION** — owner, 2026-09-19: HealthFirst Clinics — NO written permission (aligns with PAGE-039, BLOG-066). **URL TREATMENT — DECIDE DURING IMPLEMENTATION; NO IRRELEVANT REDIRECT.** Implementation not authorized |

### 5.3 `/portfolio/seo-ameba-software`

Template links: same as §5.1 baseline. No case-study-specific links.

> **Portfolio page 2 of 7 — review (2026-09-19). Read-only; nothing edited, unpublished or deleted.**
>
> - **Identity:** H1 "SEO for Ameba Software: Tech Company" · `<title>` "SEO for Ameba Software: Tech Company \| Case Study \| MappedSkills" · slug `seo-ameba-software` · live URL `https://mappedskills.com/portfolio/seo-ameba-software` · client "Ameba Software, Tech Software Startup, Chandigarh" · industry "Technology (B2B Software Solutions)" · service **SEO** · **Contentful entry ID: not exposed**; Contentful not queried.
> - **Publication permission: YES** (owner fact, §0.6) — the client **may be publicly identified**. Per `DEC-012` and owner direction, permission alone is **not** evidence for any claim.
> - **Links:** template only — Home → `/`, "Case Studies" → `/work`, "Tell us what you’re trying to fix" → `/contact`, "What we can and cannot show you" → `/work` (WORK-001 – WORK-004). All internal, 200, same tab. **No service links, no `/schedule-call`, no direct Calendly, no booking terminology, no external links, no images/screenshots.**
> - **SEO state (VERIFIED FACT):** HTTP 200 · `index, follow` · canonical self · in `sitemap.xml` · structured data: site-wide `Organization` only (a visible 5-star rating with no Review schema).
> - **Proof inventory (every material claim):** headline "Achieved a **200%** increase in organic website traffic within **six months**" · "Improved rankings for **30+** high-intent keywords, with **18** keywords reaching the first page of Google" · "Inbound inquiries from organic traffic increased by **150%** … more qualified leads" · "Domain authority increased from **30 to 42**" · before/after table: monthly organic traffic **10,000 → 30,000** visits; top-10 keyword rankings **12 → 30+**; monthly inbound leads **40 → 100**; Domain Authority **30 → 42** · timeline "**February - 2020**" · company size "20–30 employees"; target area "India, USA, Australia"; "cutting-edge solutions" · tools claimed: Google Analytics, Google Search Console, Ahrefs, SEMrush, Yoast SEO · work described: keyword research, on-page and technical SEO (speed, indexing, mobile, schema), content strategy (blog posts, case studies, whitepapers), link building ("high-quality backlinks from reputable technology sites and industry publications") · **testimonial** ★★★★★ "…our inbound inquiries have more than doubled…" — **"Gagan Deep, Partner, Ameba Software"** (named individual) · no screenshots or dashboards.
> - **`DEC-012` evidence status:** repository evidence mentioning Ameba: **0 files.** Against `CLAIMS_AND_EVIDENCE_GOVERNANCE.md` §6: (1) written permission — **YES (owner fact; item-specific scope for name/figures/quotes not recorded)**; (2) documented baseline — **none**; (3) stated intervention — described on the page (not evidenced); (4) measurement period — only "February - 2020" + "within six months" (no start/end dates); (5) attribution limitations — **none stated**; (6) results from the client's own system — **none**; (7) commercial context — **none**; (8) what cannot be claimed — **none**; (9) verified screenshots/data — **none**; (10) quote verified in writing by the person quoted — **not evidenced**. **No material claim currently meets `DEC-012`.**
> - **Internal consistency (VERIFIED by arithmetic and comparison):** traffic 10,000 → 30,000 = **+200%** ✓ consistent · leads 40 → 100 = **+150%** ✓ consistent · **rankings contradiction:** "18 keywords reaching the first page" vs table "Top 10 Keyword Rankings … **30+**" (top 10 = first page) · **wrong company named:** "A comprehensive SEO strategy was designed for **TechWave Solutions**" · spelling "Ameba Softwares" · **⚠ identical figures to a different client:** monthly inbound leads **40 → 100** and Domain Authority **30 → 42** are exactly the figures on the HealthFirst case study (§5.2; different client, year and industry). This indicates templated or reused numbers and is a material red flag for every figure on the page · a results block also appears under "Results & Metrics" and the headline/conclusion restate them.
> - **Capability/service consistency:** keyword, on-page/technical SEO, schema, content strategy and link building fall within the approved **SEO** service. The tools list names third-party products (Ahrefs, SEMrush, Yoast), which the repository does not record as MappedSkills' tooling (content observation; no capability conflict with the approved architecture). "case studies, and whitepapers" content production is described as part of the SEO engagement, not a standalone content service.
> - **Separating the questions (owner direction):** client identity permission — **YES**. Existence of work performed — **not evidenced in the repository** (owner fact needed: engagement period and scope). Quantitative evidence — **none**, and figures duplicated from another client. Testimonial — named individual; written verification **not evidenced**. Exact wording — contains a wrong company name and a ranking contradiction.
> - **Dependencies (VERIFIED against the audit inventory):** `/work` card **PAGE-040** (owner: KEEP — permission YES) · article 7 "SEO for software business" **BLOG-067** (owner: CHANGE → this page, with `DEC-012` validation required) · `sitemap.xml` entry (Contentful-generated). No service page or other case study links here.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| WORK-011 | Whole page `/portfolio/seo-ameba-software` | Retention of the case study (permission YES; no `DEC-012` evidence) | — (page) | 200, `index, follow`, in sitemap | Client proof | **REVIEW — OWNER DECISION (recommended):** keep the client identity and page **only** with owner-confirmed facts about the work performed (engagement period and scope). **Withhold every quantitative result and the testimonial from publication until `DEC-012` evidence exists** (baseline, period, client-system data, attribution limits, written quote approval). Alternative: hold the page from public surfaces until evidenced. **OWNER FACTS needed:** engagement dates/scope; availability of client-system data; written approval of the quote in its published form | **KEEP CLIENT/PAGE; PROOF RECONCILIATION REQUIRED** — owner, 2026-09-19: Ameba Software has written publication permission; client may remain publicly identified and the page may remain in the public Case Studies architecture; PAGE-040 stays KEEP; BLOG-067 may keep targeting it. **Not approval of the existing copy**; do not unpublish because legacy proof is deficient. DEC-012 OPEN for Ameba. Implementation not authorized |
| WORK-012 | Headline, "Results & Metrics", before/after table, conclusion | Quantitative claims: +200% traffic (10,000 → 30,000); 30+ / 18 keyword rankings (12 → 30+); +150% inbound leads (40 → 100); Domain Authority 30 → 42; "within six months" | — (claims) | Unevidenced; leads and DA figures identical to HealthFirst's | Proof | **REVIEW — REMOVE unless evidenced (recommended):** no repository evidence; the leads (40 → 100) and DA (30 → 42) figures duplicate another client's page, which undermines all the page's figures. Retain a figure only if client-system evidence meeting `DEC-012` is supplied. **Do not correct or re-derive figures** | **REMOVE UNLESS DEC-012 EVIDENCE IS SUPPLIED** — owner, 2026-09-19: all quantitative claims (+200% traffic; 10,000 → 30,000; 30+ keywords; 18 on page one; 12 → 30+; +150% inquiries; 40 → 100; DA 30 → 42; associated time-period claims). Do not correct, reconcile or re-derive; no replacement numbers; no vague substitutes ("significant growth"). Duplication with HealthFirst = material red flag. Implementation not authorized |
| WORK-013 | "What the Client Says" | Testimonial + ★★★★★: "…our inbound inquiries have more than doubled…" — Gagan Deep, Partner, Ameba Software | — (quote) | Named individual; verification not evidenced | Social proof | **REVIEW — OWNER FACT REQUIRED:** written confirmation from the person quoted, approving the quote in this form (`DEC-012` item 10). Until then, **withhold** it. The quote's "more than doubled" depends on WORK-012's unevidenced figure. The star rating has no rating source | **WITHHOLD UNLESS WRITTEN QUOTE APPROVAL IS CONFIRMED** — owner, 2026-09-19: client permission ≠ permission for a named individual's verbatim quote. Until written approval of quote + attribution: withhold testimonial, "Gagan Deep, Partner" attribution and the 5-star presentation. No invented Review schema; no unattributed paraphrase. Implementation not authorized |
| WORK-014 | "Strategy and Tactics", Results, table | Content errors: "designed for **TechWave Solutions**" (wrong company); "18 keywords … first page" vs table "Top 10 … 30+"; "Ameba Softwares" misspelling | — (content) | Factual/editorial errors | Accuracy | **REVIEW — WORDING CHANGE REQUIRED (recommended):** correct or remove. The wrong company name is a material error on a client-attributed page | **CHANGE REQUIRED** — owner, 2026-09-19: correct/remove "TechWave Solutions", "Ameba Softwares", the 18-vs-30+ contradiction (never pick the more favourable number; evidenced figure only, else removed under WORK-012) and redundant repeated result presentation. Implementation not authorized |

### 5.4 `/portfolio/local-seo-service-usa`

Template links: same as §5.1 baseline. No case-study-specific links.

> **Portfolio page 3 of 7 — review (2026-09-19). Read-only; nothing edited, unpublished or deleted.**
>
> - **Identity:** H1 "Local SEO for EcoClean: Cleaning Service Provider" · `<title>` "Local SEO for EcoClean: Cleaning Service Provider \| Case Study \| MappedSkills" · slug `local-seo-service-usa` · live URL `https://mappedskills.com/portfolio/local-seo-service-usa` · client "EcoClean Pros, New Jersey, USA" · category "Local Cleaning Services (Residential and Commercial Cleaning)" · service **Local SEO** · **Contentful entry ID: not exposed**; Contentful not queried.
> - **Publication permission: NO** (owner fact, §0.6). Already decided: **PAGE-041 REMOVE FROM PUBLIC CASE-STUDY SURFACES**, **BLOG-064 REMOVE**. Per owner direction, findings are recorded but no effort is spent rescuing the proof.
> - **Links:** template only — Home → `/`, "Case Studies" → `/work`, "Tell us what you’re trying to fix" → `/contact`, "What we can and cannot show you" → `/work` (WORK-001 – WORK-004). All internal, 200, same tab. **No service links, no `/schedule-call`, no direct Calendly, no booking terminology, no external links, no images.**
> - **SEO state (VERIFIED FACT):** HTTP 200 · `index, follow` · canonical self · in `sitemap.xml` · title/H1 consistent · structured data: site-wide `Organization` only (visible 5-star rating, no Review schema).
> - **Proof inventory:** headline "Achieved **top 3** local search rankings for high-intent keywords like “New Jersey cleaning services,” “NJ commercial cleaning,” and “home cleaning near me”" (repeated in Results) · "[I]ncreased organic traffic by **90%** in **six months**" · "Boosted online bookings by **65%**, attributed to improved local search visibility" · "Increased [GBP] profile views by **150%**, with more calls and website clicks" · table: monthly organic traffic **4,000 → 7,600**; top-3 keyword rankings **3 → 15**; monthly leads from organic **30 → 50**; GBP views **3,500 → 8,750** · timeline "**October - 2022**" · "20–30 employees" · named-client assertion "EcoClean Pros" · work claimed: local keyword optimisation, Google Business Profile optimisation (incl. "encouraging satisfied customers to leave reviews"), citations/NAP (Yelp, Yellow Pages), "Content Marketing with a Local Focus" (blog/FAQ titles named), technical fixes in the conclusion · tools: Google Analytics, Search Console, BrightLocal, Ahrefs · **testimonial** ★★★★★ "…a huge boost in calls and online bookings…" — attributed only to "**Owner, EcoClean Pros**" (no named individual) · no screenshots or dashboards.
> - **`DEC-012` evidence status:** repository evidence mentioning EcoClean: **0 files.** No permission, baseline, measurement period (only "October - 2022" + "six months"), client-system data, attribution limitations or quote verification. **No claim meets `DEC-012`.**
> - **Internal consistency (VERIFIED by arithmetic):** traffic 4,000 → 7,600 = **+90%** ✓ · GBP views 3,500 → 8,750 = **+150%** ✓ · the "65%" figure is labelled **online bookings**, while the table reports **monthly leads from organic 30 → 50 = +66.7%** — different metric labels; the page does not reconcile bookings with leads · "top 3 rankings" in the headline vs table top-3 keywords 3 → 15 (no contradiction, but the "before" state already had 3). **No figures match HealthFirst or Ameba** (not treated as evidence of genuineness). Typo "ncreased". Repetitive legacy phrasing ("Cleaning Services EcoClean Pros", "Local SEO Services strategy") consistent with keyword-stuffed template copy. The page mentions technical SEO fixes (site speed, mobile, structured data) in Challenges/Conclusion, but no corresponding tactic is listed.
> - **Capability/service consistency:** local SEO, GBP and citations fall within approved **SEO**. "**Content Marketing** with a Local Focus" uses the name of a **non-approved** standalone service (content only within SEO scope). Moot for publication given permission NO.
> - **Unsupported claims:** every figure, the ranking claims, the bookings attribution ("attributed to improved local search visibility"), the testimonial and the star rating.
> - **Dependencies (VERIFIED against the audit inventory):** `/work` card **PAGE-041** (owner: REMOVE) · `/blog/seo-company-in-pune` **BLOG-064** (owner: REMOVE; the article's link uses `https://mappedskills.com/portfolio/local-seo-service-usa/` → redirect) · `sitemap.xml` entry. No other audited surface links here.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| WORK-015 | Whole page `/portfolio/local-seo-service-usa` | Publication of the EcoClean Pros case study (permission NO) | — (page) | 200, `index, follow`, in sitemap | Client proof | **REVIEW — REMOVE FROM PUBLICATION (recommended)**, consistent with PAGE-041 and BLOG-064 and with WORK-010 (HealthFirst): remove from `/work`, the sitemap/indexable architecture and remaining internal links; stop presenting it as client proof. **URL treatment:** recommend the WORK-010 approach — decide during implementation; no irrelevant redirect (no automatic redirect to `/work`, `/seo`, `/`, or another client's case study). No proof rescue; do not correct figures | **REMOVE FROM PUBLICATION** — owner, 2026-09-19: EcoClean Pros has NO written publication permission; aligns with PAGE-041 REMOVE and BLOG-064 REMOVE. **URL TREATMENT — DECIDE DURING IMPLEMENTATION; NO IRRELEVANT REDIRECT** (WORK-010 rule). No proof rescue, reuse or anonymization. Implementation not authorized |

### 5.5 `/portfolio/seo-for-home-decor-brand`

Template links: same as §5.1 baseline. No case-study-specific links.

> **Portfolio page 4 of 7 — review (2026-09-19). Read-only; nothing edited, unpublished or deleted.**
>
> - **Identity:** H1 "SEO for eCommerce Home Decor Brand" · `<title>` "SEO for eCommerce Home Decor Brand \| Case Study \| MappedSkills" · slug `seo-for-home-decor-brand` · live URL `https://mappedskills.com/portfolio/seo-for-home-decor-brand` · client shown as "**eCommerce Home Decor Brand, Bangalore**" — **the business is not named on the page** (the page itself, not this review, presents it unnamed) · industry: eCommerce home decor · service **SEO** · **Contentful entry ID: not exposed**; Contentful not queried. The underlying legal/trading name is **UNKNOWN** in the repository.
> - **Publication permission: YES** (owner fact, §0.6 — "Home Decor Brand"). Per `DEC-012`, permission is not evidence for any claim. **UNKNOWN:** whether the permission covers the named individual in the testimonial and the specific figures.
> - **Links:** template only — Home → `/`, "Case Studies" → `/work`, "Tell us what you’re trying to fix" → `/contact`, "What we can and cannot show you" → `/work` (WORK-001 – WORK-004). All internal, 200, same tab. **No service links, no `/schedule-call`, no direct Calendly, no booking terminology, no external links, no images.**
> - **SEO state (VERIFIED FACT):** HTTP 200 · `index, follow` · canonical self · in `sitemap.xml` · title/H1 consistent · structured data: site-wide `Organization` only (visible 5-star rating, no Review schema). Legacy URL `/portfolio/seo-for-home-decor` (no `-brand`) returns **404** (see BLOG-068).
> - **Proof inventory:** headline/results "Increased organic traffic by **85%** over **six months**, significantly expanding their reach across India" · "Improved rankings for **20+** high-intent keywords, with **12** of them reaching the first page of Google" · "Achieved a **50%** increase in sales attributed to organic traffic, demonstrating the effectiveness of SEO in driving conversions" · "Reduced bounce rate by **25%**" · table: monthly organic traffic **12,000 → 22,200**; top-10 keyword rankings **8 → 20+**; monthly sales (organic) **₹4,00,000 → ₹6,00,000**; "**Conversion Rate** **58% → 43%**" · timeline "**March - 2020**" · "30-50 employees"; target area Pan-India · "As a **newer brand**, their website had lower domain authority" · work claimed: keyword research, on-page SEO incl. structured data, "**Content Marketing**" (blog posts, buying guides), link building ("high-quality backlinks from reputable lifestyle, interior design, and decor websites"); conclusion adds "technical improvements" · tools: Google Analytics, Search Console, Ahrefs, SEMrush, Yoast SEO · **testimonial** ★★★★★ "…Our search rankings and sales have improved tremendously…" — **"Suyog, Marketing Head"** (named individual, first name only) · no screenshots, dashboards or evidence references.
> - **`DEC-012` evidence status:** repository evidence mentioning the Home Decor Brand engagement: **0 files** (only this review/audit). Against `CLAIMS_AND_EVIDENCE_GOVERNANCE.md` §6: (1) written permission — **YES (owner fact; item-level scope unrecorded)**; (2) documented baseline — none; (3) intervention — described on the page only; (4) measurement period — only "March - 2020" + "over six months"; (5) attribution limitations — none (sales explicitly "attributed to organic traffic" without method); (6) client-system results — none (no GA/revenue export); (7) commercial context — none; (8) what cannot be claimed — none; (9) verified screenshots/data — none; (10) written quote approval — not evidenced. **No material claim currently meets `DEC-012`.**
> - **Internal consistency (VERIFIED by arithmetic and comparison):** traffic 12,000 → 22,200 = **+85%** ✓ · sales ₹4,00,000 → ₹6,00,000 = **+50%** ✓ · **"Conversion Rate" 58% → 43% is contradictory:** it is a *decrease* presented as a result, contradicts "effectiveness of SEO in driving conversions", and a 58% eCommerce conversion rate is implausible. The fall 58 → 43 = **−25.9%** matches the stated "bounce rate reduced by 25%"; **WORKING HYPOTHESIS:** the row is a mislabelled bounce-rate row — not verified and **not to be corrected from the page** · **rankings contradiction:** "20+ keywords … 12 on page one" vs table "Top 10 … 20+" (top 10 = page one) — the same structural contradiction as Ameba (WORK-014) · "newer brand" is unexplained against a 30–50 employee company (not a contradiction, but unsupported) · testimonial opening "The SEO strategy has transformed our business" closely mirrors Ameba's "The SEO strategy has been transformative for our business" — template-like phrasing (**not** proof of copying) · **no exact figure matches HealthFirst, Ameba or EcoClean** (not treated as evidence of genuineness) · no wrong client name found · testimonial grammar "we’ve seen us becoming".
> - **Capability/service consistency:** keyword research, on-page SEO, structured data and link building fall within approved **SEO**. The tactic is headed "**Content Marketing**" — a **non-approved** standalone service name; content work may only be presented as part of the SEO engagement. Sales and conversion outcomes imply eCommerce CRO/revenue attribution, which the page does not evidence.
> - **Unsupported/ambiguous claims:** every figure; "attributed to organic traffic" (no attribution method); "demonstrating the effectiveness of SEO in driving conversions"; "Conversion Rate 58% → 43%"; "significantly expanding their reach across India"; "go-to brand for home decor" (testimonial); the tools list and link-building sources as work actually performed (capability ≠ performed work); the 5-star rating.
> - **Separating the questions (owner rule):** (1) permission to name the client — **YES** (published unnamed); (2) owner-confirmed engagement facts — **not in the repository** (dates, scope); (3) quantitative evidence — **none**; (4) testimonial approval — **not evidenced** ("Suyog, Marketing Head"); (5) exact public wording — contains a contradictory metric row, a ranking contradiction and a non-approved service name.
> - **Dependencies (VERIFIED against the audit inventory):** `/work` card **PAGE-042** (owner: KEEP — permission YES) · `/blog/seo-company-in-pune` **BLOG-068** (owner: CHANGE → this page; currently links to `/portfolio/seo-for-home-decor/` → 308 → 404) · `sitemap.xml` entry. No service page or other case study links here.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| WORK-016 | Whole page `/portfolio/seo-for-home-decor-brand` | Retention of the case study (permission YES; no `DEC-012` evidence) | — (page) | 200, `index, follow`, in sitemap | Client proof | **REVIEW — OWNER DECISION (recommended: as WORK-011):** keep the page in the public Case Studies architecture; proof reconciliation required; not approval of existing copy. **OWNER FACTS needed:** engagement dates/scope actually performed; whether the page should continue to present the client unnamed (as published) — **no anonymization or naming change is proposed here** | **KEEP CLIENT/PAGE; PROOF RECONCILIATION REQUIRED** — owner, 2026-09-19: Home Decor Brand has written permission; existing public naming "eCommerce Home Decor Brand" may remain (no disclosure of the legal/business name required; permission does not imply naming). PAGE-042 KEEP; BLOG-068 may target this canonical URL; may remain indexable subject to later reconciliation. Permission does not validate results, dates, testimonial, scope or attribution. DEC-012 OPEN. Implementation not authorized |
| WORK-017 | Headline, "Results & Metrics", before/after table | Quantitative claims: +85% traffic (12,000 → 22,200); 20+ / 12 rankings (8 → 20+); +50% sales (₹4,00,000 → ₹6,00,000); −25% bounce rate; "Conversion Rate" 58% → 43%; "over six months" | — (claims) | Unevidenced | Proof | **REVIEW — REMOVE UNLESS `DEC-012` EVIDENCE IS SUPPLIED (recommended, as WORK-012).** Revenue claims need client-system sales data and an attribution method. Do not correct, relabel or re-derive (including the 58% → 43% row); no replacement numbers; no vague substitutes | **REMOVE UNLESS DEC-012 EVIDENCE IS SUPPLIED** — owner, 2026-09-19: +85% traffic; 12,000 → 22,200; 20+ keywords; 12 on page one; 8 → 20+; +50% sales; ₹4,00,000 → ₹6,00,000; organic sales attribution; −25% bounce; 58% → 43% "Conversion Rate"; associated time-period claims. Do not correct, reinterpret, re-derive, or relabel 58% → 43% as bounce rate (a possible explanation, not evidence). No vague substitutes. Implementation not authorized |
| WORK-018 | "What the Client Says" | Testimonial + ★★★★★ — "Suyog, Marketing Head" | — (quote) | Named individual; approval not evidenced | Social proof | **REVIEW — WITHHOLD UNLESS WRITTEN QUOTE APPROVAL IS CONFIRMED (recommended, as WORK-013):** withhold quote, attribution and star presentation until the person quoted approves the quote as published; no Review schema; no unattributed paraphrase | **WITHHOLD UNLESS WRITTEN QUOTE APPROVAL IS CONFIRMED** — owner, 2026-09-19: "Suyog, Marketing Head"; withhold testimonial, personal attribution and 5-star presentation until written approval of quote + attribution. No invented Review schema; no anonymous paraphrase. Implementation not authorized |
| WORK-019 | Services Provided, Results, table, Challenges, testimonial | Wording/consistency: "Conversion Rate 58% → 43%" contradiction; "20+ … 12 on page one" vs "Top 10 … 20+"; "Content Marketing" as a service heading; "newer brand"; testimonial grammar | — (content) | Editorial/consistency errors | Accuracy / service architecture | **REVIEW — CHANGE REQUIRED (recommended, as WORK-014):** remove contradictory metrics unless evidenced (never pick the more favourable number); present content work only as part of SEO, not as "Content Marketing" | **CHANGE REQUIRED** — owner, 2026-09-19: address the "Conversion Rate 58% → 43%" row; 12 on page one vs 20+ top-10; unsupported revenue attribution; "effectiveness of SEO in driving conversions"; "significantly expanding their reach"; "go-to brand"; unsupported tool/link-building claims. Never pick the more favourable number; evidenced info only, else remove under WORK-017. "Content Marketing" only as a supporting activity within SEO if accurate — never implying a standalone approved service. Implementation not authorized |

### 5.6 `/portfolio/google-ads-for-online-courses`

Template links: same as §5.1 baseline. Case-study-specific links:

> **Portfolio page 5 of 7 — review (2026-09-19). Read-only; nothing edited, unpublished or deleted.**
>
> - **Identity:** H1/`<title>` "Google Ads for Online Courses" (\| Case Study \| MappedSkills) · slug `google-ads-for-online-courses` · live URL `https://mappedskills.com/portfolio/google-ads-for-online-courses` · client "**AnyBodyCanBake, Pune, India**" (body elsewhere: "AnybodyCanBake") · category/breadcrumb "**Online Baking Academy**" · industry: online education (baking courses) · service **Google Ads** · **Contentful entry ID: not exposed**; Contentful not queried.
> - **Publication permission: YES** (owner fact, §0.6 — AnybodyCanBake). Permission is not evidence for any claim; item-level scope (named quote, figures) not recorded.
> - **Links (VERIFIED against the audit inventory):** template: Home → `/`, "Case Studies" → `/work`, "Tell us what you’re trying to fix" → `/contact`, "What we can and cannot show you" → `/work` (WORK-001 – 004; internal, 200, same tab). **Case-study-specific:** WORK-006 "AnybodyCanBake" → `https://anybodycanbake.com/` — **external, 200, new tab, `rel="noopener noreferrer"`** · WORK-007 "Google Ads" → `https://mappedskills.com/google-ads-service/` — **internal, 308 → 308 → `/google-ads` 200, new tab** (tab policy: WORK-005).
> - **Navigation/CTA:** the only service link is WORK-007 (Google Ads — approved service, via a legacy URL). **No `/schedule-call`, no direct Calendly, no booking terminology.** Closing CTA → `/contact`.
> - **SEO state (VERIFIED FACT):** HTTP 200 · `index, follow` · canonical self · in `sitemap.xml` · title/H1 consistent · structured data: site-wide `Organization` only (visible 5-star rating, no Review schema). No images.
> - **Proof inventory:** hero "**Course Enrollments: 500**" · table: course enrollments **200 → 500**; website traffic **1,000 → 3,000 visits/month**; conversion rate **2% → 5%**; cost per acquisition **₹500 → ₹200** · timeline "**April - 2016**" · "5-10 employees"; target "Primarily India, with a focus on urban areas" · business goals "Increase online course enrollments by **100% within six months**" and "Optimize marketing expenditure for better ROI" (goals, not stated results) · conclusion "leading to **substantial growth** in enrollments and online visibility" · work claimed: keyword research, ad copy and creatives, audience targeting (demographics, interests, behaviour), performance optimisation · **testimonial** ★★★★★ "…significantly boosted our course enrollments…" — **"Sonia Gupta, Founder"** (named individual) · named provider "MappedSkills Marketing" in conclusion and testimonial · no screenshots, dashboards or evidence references; no tools listed; no "Results & Metrics" block.
> - **`DEC-012` evidence status:** 7 repository documents (`FINAL_STRATEGY_SYNTHESIS.md`, `STRATEGIC_VALIDATION.md`, `ASSUMPTIONS_AND_OPEN_QUESTIONS.md`, `SESSION_02_STRATEGIC_VALIDATION.md`, `OWNER_INPUT_REGISTER.md`, `MARKET_RESEARCH.md`, `CONTENT_EVIDENCE_GAPS.md`) mention AnybodyCanBake **only as a flagged candidate with publishability UNKNOWN** (since resolved to permission YES by owner fact). **None contains engagement facts, figures, account data or quote approval.** Against governance §6: permission — YES; baseline, measurement period, attribution limits, client-system (Google Ads/analytics) data, commercial context, what cannot be claimed, verified data, written quote approval — **none**. **No material claim meets `DEC-012`.**
> - **Internal consistency (VERIFIED by arithmetic):** enrollments 200 → 500 = **+150%** (exceeds the "+100%" goal, but **no result period is stated**) · traffic 1,000 → 3,000 = **+200%** · conversion 2% → 5% = **+3 pts** · CPA ₹500 → ₹200 = **−60%** · **units do not reconcile:** at 2% and 5%, 1,000 and 3,000 monthly visits imply **20 → 150** conversions/month, whereas enrollments are 200 → 500 (no unit/period); enrollments ÷ traffic would be 20% → 16.7%, contradicting the stated conversion-rate rise. The page does not say whether enrollments are monthly, cumulative or campaign totals, nor whether traffic is paid-only. **Not resolved and not to be re-derived.** · **No exact figure matches HealthFirst, Ameba, EcoClean or Home Decor** (not evidence of genuineness) · client spelled two ways ("AnyBodyCanBake"/"AnybodyCanBake") · "Online Baking Academy" used as breadcrumb/category label rather than the client name · Challenge "struggled to appear in search results … affecting **organic** traffic" is addressed only by paid Google Ads (problem/solution mismatch) · **date:** "April - 2016" credited to "MappedSkills Marketing" — whether MappedSkills (as a brand) performed work in 2016 is **UNKNOWN** in the repository (see §3 PAGE-043 date note) · layout artefact "within six months2." · template-like testimonial opening ("…transformed our business") as on Ameba/Home Decor (not proof of copying).
> - **Capability/service consistency:** keyword research, ad copy/creatives, audience targeting and optimisation fall within approved **Google Ads**. "Enhance brand visibility" and organic-visibility framing are not what a Google Ads engagement evidences. CPA/ROI claims imply conversion tracking that is not described.
> - **Unsupported/ambiguous claims:** every figure; "Course Enrollments: 500" hero; "substantial growth"; "significantly boosted"; "transformed our business"; "Optimize … for better ROI" (no ROI shown); the 5-star rating; the 2016 attribution to MappedSkills Marketing.
> - **Separating the questions (owner rule):** (1) permission to identify — **YES**; (2) engagement facts — **not in the repository** (date, scope, provider entity); (3) quantitative evidence — **none**; (4) testimonial approval — **not evidenced** ("Sonia Gupta, Founder"); (5) exact wording — two spellings, unreconcilable units, organic/paid mismatch.
> - **Dependencies (VERIFIED against the audit inventory):** `/work` card **PAGE-043** (owner: KEEP — permission YES) · `sitemap.xml` entry. **No blog article links to this page.** Related but distinct: BLOG-077 (`/blog/facebook-advertising-agency-pune`) links to a non-existent `/portfolio/social-media-ads-anybodycanbake` (404) — owner decision **REMOVE**; this Google Ads study is **not** a substitute (§0 BLOG-077 record).


| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| WORK-006 | Case-study body (Contentful rich text) | AnybodyCanBake | `https://anybodycanbake.com/` | External | External reference / example | KEEP | **KEEP** — owner, 2026-09-19: destination appropriate for the named client and currently works; tab behaviour follows shared WORK-005 policy. No implementation now |
| WORK-007 | Case-study body (Contentful rich text) | Google Ads | `https://mappedskills.com/google-ads-service/` | Internal redirect → `/google-ads` (2 hops) | Service discovery — Google Ads | **CHANGE → `/google-ads`** — Same final page, without 2 redirect hop(s). Opens in a new tab (policy: WORK-005). | **CHANGE → `/google-ads`** — owner, 2026-09-19: do not route through `/google-ads-service/`; intended destination is the canonical approved service page; tab behaviour follows shared WORK-005 later. No implementation now |
| WORK-020 | Whole page `/portfolio/google-ads-for-online-courses` | Retention of the case study (permission YES; no `DEC-012` evidence) | — (page) | 200, `index, follow`, in sitemap | Client proof | **REVIEW — OWNER DECISION (recommended: as WORK-011/016):** keep client and page; proof reconciliation required; not approval of existing copy. **OWNER FACTS needed:** whether the "April - 2016" engagement was performed by MappedSkills (or a predecessor/individual), its scope and duration; the canonical client spelling | **KEEP CLIENT/PAGE; PROOF RECONCILIATION REQUIRED** — owner, 2026-09-19: AnybodyCanBake has written permission; client may remain identified; PAGE-043 KEEP; page may remain in Case Studies architecture. Permission does not validate April 2016 engagement facts, provider, duration/scope, results, attribution, testimonial or legacy wording. Not a substitute for BLOG-077 (remains REMOVE). DEC-012 OPEN. Implementation not authorized |
| WORK-021 | Hero, before/after table | Quantitative claims: "Course Enrollments: 500"; enrollments 200 → 500; traffic 1,000 → 3,000 visits/month; conversion rate 2% → 5%; CPA ₹500 → ₹200 | — (claims) | Unevidenced; units/periods unreconcilable | Proof | **REVIEW — REMOVE UNLESS `DEC-012` EVIDENCE IS SUPPLIED (recommended, as WORK-012/017).** Paid-media claims need Google Ads account data (spend, conversions, conversion definition, period). Do not reconcile or re-derive; no vague substitutes | **REMOVE UNLESS DEC-012 EVIDENCE IS SUPPLIED** — owner, 2026-09-19: "Course Enrollments: 500"; 200 → 500; 1,000 → 3,000 visits/month; 2% → 5%; ₹500 → ₹200 CPA; associated growth/period claims and dependent ROI implications. No reconciliation, no chosen interpretation, no manufactured period, no vague substitutes. No single evidence source prescribed. Implementation not authorized |
| WORK-022 | "What the Client Says" | Testimonial + ★★★★★ — "Sonia Gupta, Founder" | — (quote) | Named individual; approval not evidenced | Social proof | **REVIEW — WITHHOLD UNLESS WRITTEN QUOTE APPROVAL IS CONFIRMED (recommended, as WORK-013/018)** | **WITHHOLD UNLESS WRITTEN QUOTE APPROVAL IS CONFIRMED** — owner, 2026-09-19: "Sonia Gupta, Founder"; withhold testimonial, attribution and 5-star presentation. No invented Review schema; no anonymization/paraphrase. Implementation not authorized |
| WORK-023 | Title/breadcrumb, Business Goals, Challenges, Conclusion, testimonial | Wording/consistency: "AnyBodyCanBake" vs "AnybodyCanBake"; "Online Baking Academy" label vs client name; organic-visibility challenge vs paid-only solution; goal "+100% within six months" with no result period; "substantial growth"; "MappedSkills Marketing" as the 2016 provider; run-together goal list ("months2.") | — (content) | Editorial/consistency issues | Accuracy | **REVIEW — CHANGE REQUIRED (recommended, as WORK-014/019).** Do not supply a period or resolve the metrics from the page | **CHANGE REQUIRED** — owner, 2026-09-19: establish client spelling (no guessing); owner facts/evidence for April 2016 work, scope, period and "MappedSkills Marketing" attribution; reconcile organic/paid framing; do not infer the enrollment period; "Online Baking Academy" changed only if shown incorrect/misleading; reconcile/remove "substantial growth", "significantly boosted", ROI implications. "transformed our business" follows WORK-022. Implementation not authorized |

### 5.7 `/portfolio/google-ppc-for-real-estate`

Template links: same as §5.1 baseline. No case-study-specific links.

> **Portfolio page 6 of 7 — review (2026-09-19). Read-only; nothing edited, unpublished or deleted.**
>
> - **Identity:** H1/`<title>` "Google PPC for Real Estate" (\| Case Study \| MappedSkills) · slug `google-ppc-for-real-estate` · live URL `https://mappedskills.com/portfolio/google-ppc-for-real-estate` · client "**The Fine Living Group, Washington, DC, USA**" · category/breadcrumb "Real Estate (Luxury and Residential Properties)" · service **Google Ads (PPC)** · **Contentful entry ID: not exposed**; Contentful not queried.
> - **Publication permission: NO** (owner fact, §0.6). Already decided: **PAGE-044 REMOVE FROM PUBLIC CASE-STUDY SURFACES**; **BLOG-044 REMOVE** and must **not** use this URL. Findings recorded for traceability only; no proof rehabilitation.
> - **Links:** template only — Home → `/`, "Case Studies" → `/work`, "Tell us what you’re trying to fix" → `/contact`, "What we can and cannot show you" → `/work` (WORK-001 – WORK-004). All internal, 200, same tab. **No service links, no `/schedule-call`, no direct Calendly, no booking terminology, no external links, no images.**
> - **SEO state (VERIFIED FACT):** HTTP 200 · `index, follow` · canonical self · in `sitemap.xml` · title/H1 consistent · structured data: site-wide `Organization` only (visible 5-star rating, no Review schema).
> - **Proof inventory:** hero "**Monthly Leads Generated: 90+**" · table: monthly leads **60 → 90+**; cost-per-lead **$60 → $39**; website traffic growth "**Moderate → Significant (+60%)**"; conversion rate **3.5% → 5.0%** · timeline "**June - 2024**" · "20–30 employees" · conclusion "achieved **exceptional results** … generating more leads, improving conversions, and **maximizing ROI**" · work claimed: Google PPC strategy/keywords, ad copy, "**Designed optimized landing pages** with clear CTAs, engaging visuals", lead-form and call extensions · **testimonial** ★★★★★ "Partnering with a **Google Ads expert in India** transformed our lead generation efforts…" — **"Jon Lahey, CEO/Founder"** (named individual) · no screenshots or evidence references; no Problem Statement, Business Goals or tools sections (unlike other studies).
> - **`DEC-012` evidence status:** repository evidence mentioning The Fine Living Group: **0 files.** No permission, baseline, period, account data, attribution limits or quote approval. **No claim meets `DEC-012`.**
> - **Internal consistency (VERIFIED by arithmetic):** leads 60 → 90+ = **≥ +50%** · CPL $60 → $39 = **−35%** · conversion 3.5% → 5.0% = **+1.5 pts (+42.9% relative)** · traffic row mixes qualitative labels with "+60%" (no numeric before/after) · no spend figure, so leads × CPL cannot be checked (60 × $60 = $3,600 vs 90 × $39 = $3,510 implied — **not a stated figure**, not evidence) · **SERVICE 4 heading "audience segmentation" describes lead-form and call extensions** (heading/content mismatch) · testimonial references "a Google Ads expert **in India**", i.e. an individual/offshore provider rather than MappedSkills by name · inconsistent capitalisation of service headings ("optimized landing pages", "audience segmentation") · **no exact figure matches the earlier five studies** (not evidence of genuineness) · template-like testimonial opening ("Partnering with … transformed our …") mirrors the AnybodyCanBake quote.
> - **Capability/service consistency:** keywords, ad copy and ad extensions fall within approved **Google Ads**; landing-page optimisation relates to approved **Conversion Optimization**, but "**Designed** … landing pages … engaging visuals" describes web-design work (**Web Design is not approved**). Moot for publication given permission NO.
> - **Unsupported claims:** every figure, "exceptional results", "maximizing ROI", "without exceeding our budget", the testimonial and star rating.
> - **Dependencies (VERIFIED against the audit inventory):** `/work` card **PAGE-044** (owner: REMOVE) · `sitemap.xml` entry. **No audited blog article, service page or case study links here.** Related: BLOG-044 (`/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers`) links to the non-existent `/portfolio/google-ads-for-real-estate/` (404) — owner **REMOVE**, and explicitly must **not** be repointed here.

| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| WORK-024 | Whole page `/portfolio/google-ppc-for-real-estate` | Publication of The Fine Living Group case study (permission NO) | — (page) | 200, `index, follow`, in sitemap | Client proof | **REVIEW — REMOVE FROM PUBLICATION (recommended)**, consistent with PAGE-044, BLOG-044, WORK-010 and WORK-015: remove from `/work`, the sitemap/indexable architecture and remaining internal links; stop presenting it as client proof. **URL treatment:** as WORK-010/015 — decide during implementation; no irrelevant redirect. No proof rescue, reuse or anonymization | **REMOVE FROM PUBLICATION** — owner, 2026-09-19: The Fine Living Group has NO written publication permission; aligns with PAGE-044 REMOVE and BLOG-044 REMOVE (BLOG-044 must not be repointed here). **URL TREATMENT — DECIDE DURING IMPLEMENTATION; NO IRRELEVANT REDIRECT** (no redirect to `/work`, `/google-ads`, `/services`, `/`, another client's study or an adjacent page). No proof rescue, reuse or anonymization. Implementation not authorized |

### 5.8 `/portfolio/google-ads-for-ecommerce`

Template links: same as §5.1 baseline. Case-study-specific links:

> **Portfolio page 7 of 7 — review (2026-09-19). Read-only; nothing edited, unpublished or deleted.**
>
> - **Identity:** H1/`<title>` "How Our Google PPC Packages Helped an E-commerce Brand Increase in Sales" (\| Case Study \| MappedSkills) · slug `google-ads-for-ecommerce` · live URL `https://mappedskills.com/portfolio/google-ads-for-ecommerce` · client "**Utpala Designs, Bangalore, KA, India**" · category/breadcrumb "e-Commerce (Fashion Brand)" · service **Google Ads (PPC / Shopping)** · **Contentful entry ID: not exposed**; Contentful not queried.
> - **Publication permission: NO** (owner fact, §0.6). Already decided: **PAGE-045 REMOVE FROM PUBLIC CASE-STUDY SURFACES**. Findings recorded for traceability only; no proof rehabilitation.
> - **Links (VERIFIED against the audit inventory and pass-2 rel check):** template: Home → `/`, "Case Studies" → `/work`, "Tell us what you’re trying to fix" → `/contact`, "What we can and cannot show you" → `/work` (WORK-001 – 004; internal, 200, same tab). **Case-study-specific:** WORK-008 "Utpala Designs" → `https://www.utpaladesigns.com/` — **external, 200, new tab, `rel="noopener noreferrer"`** · WORK-009 "Google PPC Strategy" → `https://mappedskills.com/google-ads-service/` — **internal, 308 → 308 → `/google-ads` 200, new tab**.
> - **Navigation/CTA:** only service link is WORK-009 (legacy URL). **No `/schedule-call`, no direct Calendly, no booking terminology.** Closing CTA → `/contact`. Title uses "**Google PPC Packages**" — package terminology on a service the owner has recorded as custom-quoted (Google Ads fee decision, `/pricing` review).
> - **SEO state (VERIFIED FACT):** HTTP 200 · `index, follow` · canonical self · in `sitemap.xml` · title = H1 (grammar: "Helped … Increase in Sales") · structured data: site-wide `Organization` only (visible 5-star rating, no Review schema). No images.
> - **Proof inventory:** hero "**Monthly Sales: ₹5,10,000**" · "Online sales surged by **70%** in **three months**" · "Reduced cost-per-click by **40%**" · "Delivered a **4x** return on ad spend (ROAS), maximizing e-commerce profitability" · "Increased website traffic by **60%**, converting a significant portion of new visitors into customers" · table: monthly sales **₹3,00,000 → ₹5,10,000**; CPC **₹12 → ₹7**; ROAS **2.0x → 4.0x**; website traffic "**Moderate → +60%**" · timeline "**September - 2022**" · "2-5 employees" · work claimed: campaign optimisation, demographic/interest targeting, e-commerce conversion tracking (purchases, abandoned carts), Google Shopping Ads · **testimonial** ★★★★★ restating "**4x ROAS**" and "**70% increase in sales within just three months**" — **"Seema, Founder, Utpala Designs"** (named individual, first name) · no screenshots, dashboards or evidence references.
> - **`DEC-012` evidence status:** repository evidence mentioning Utpala Designs: **0 files.** **No claim meets `DEC-012`.**
> - **Internal consistency (VERIFIED by arithmetic):** sales ₹3,00,000 → ₹5,10,000 = **+70%** ✓ · ROAS 2.0x → 4.0x = **doubled** · **CPC ₹12 → ₹7 = −41.7%**, stated as "40%" (rounding-level mismatch) · traffic row mixes a qualitative "Moderate" with "+60%" (no numeric baseline) · the page does not say whether "Monthly Sales" is total or ad-attributed revenue, so ROAS cannot be checked against sales (no spend stated) · **legacy-template contamination:** the "Results & Metrics" block is run into the SERVICE 4 paragraph without separation ("…pricing. Results & Metrics Sales GrowthOnline sales surged…"), and "Improved ROAS" is duplicated ("Improved ROASImproved ROAS:") · testimonial repeats the page's exact metrics (a quote restating marketing figures) and opens "Partnering with this team … transformed" like the AnybodyCanBake and Fine Living quotes (not proof of copying) · keyword-stuffed phrasing ("Google PPC strategy for retail", "Google PPC for e-commerce") · **no exact figure matches the other six studies** (not evidence of genuineness).
> - **Capability/service consistency:** search/Shopping campaigns, targeting and conversion tracking fall within approved **Google Ads**. "Packages" conflicts with the custom-quoted framing. Moot for publication given permission NO.
> - **Unsupported claims:** every figure, "maximizing e-commerce profitability", "converting a significant portion of new visitors", "untapped markets", the testimonial and star rating.
> - **Dependencies (VERIFIED against the audit inventory):** `/work` card **PAGE-045** (owner: REMOVE) · `sitemap.xml` entry. **No audited blog article, service page or other case study links here.**


| # | Location | Link / CTA | Current destination | Result | Purpose | Recommendation | Owner decision |
|---|---|---|---|---|---|---|---|
| WORK-008 | Case-study body (Contentful rich text) | Utpala Designs | `https://www.utpaladesigns.com/` | External 200, new tab, `noopener noreferrer` | External reference / example | **REVIEW — SUPERSEDED BY WORK-025 (recommended; updated 2026-09-19 — original audit recommendation KEEP predates the permission-NO fact):** the link leaves public publication with the page; not to be reused elsewhere | **SUPERSEDED BY WORK-025; NO SEPARATE IMPLEMENTATION** — owner, 2026-09-19 |
| WORK-009 | Case-study body (Contentful rich text) | Google PPC Strategy | `https://mappedskills.com/google-ads-service/` | Internal redirect → `/google-ads` (2 hops) | Service discovery — Google Ads | **REVIEW — SUPERSEDED BY WORK-025 (recommended; updated 2026-09-19 — original audit recommendation CHANGE → `/google-ads`):** no link change needed on a page leaving publication; applies only if the page were ever retained | **SUPERSEDED BY WORK-025; NO SEPARATE IMPLEMENTATION** — owner, 2026-09-19: do not independently change to `/google-ads` |
| WORK-025 | Whole page `/portfolio/google-ads-for-ecommerce` | Publication of the Utpala Designs case study (permission NO) | — (page) | 200, `index, follow`, in sitemap | Client proof | **REVIEW — REMOVE FROM PUBLICATION (recommended)**, consistent with PAGE-045 and WORK-010/015/024: remove from `/work`, the sitemap/indexable architecture and remaining internal links; stop presenting it as client proof. **URL treatment:** decide during implementation; no irrelevant redirect (not to `/work`, `/google-ads`, `/services`, `/`, another client's study). No proof rescue, reuse or anonymization | **REMOVE FROM PUBLICATION** — owner, 2026-09-19: Utpala Designs has NO written publication permission; aligns with PAGE-045 REMOVE. **URL TREATMENT — DECIDE DURING IMPLEMENTATION; NO IRRELEVANT REDIRECT** (not to `/work`, `/google-ads`, `/services`, `/`, another case study or an adjacent page). No rehabilitation, anonymization, reuse or correction. Implementation not authorized |

### 5.9 PORTFOLIO INDIVIDUAL-PAGE REVIEW — 7 OF 7 COMPLETE (2026-09-19)

| Page | Client | Permission | Page decision | `DEC-012` | Testimonial approval |
|---|---|---|---|---|---|
| `/portfolio/seo-healthfirst` | HealthFirst Clinics | NO | **WORK-010 REMOVE FROM PUBLICATION** (owner) | n/a — not rehabilitated | n/a |
| `/portfolio/seo-ameba-software` | Ameba Software | YES | **WORK-011 KEEP; proof reconciliation** (owner) | **OPEN** | Gagan Deep — **UNKNOWN** (WORK-013 withhold) |
| `/portfolio/local-seo-service-usa` | EcoClean Pros | NO | **WORK-015 REMOVE FROM PUBLICATION** (owner) | n/a | n/a |
| `/portfolio/seo-for-home-decor-brand` | Home Decor Brand | YES | **WORK-016 KEEP; proof reconciliation** (owner) | **OPEN** | Suyog — **UNKNOWN** (WORK-018 withhold) |
| `/portfolio/google-ads-for-online-courses` | AnybodyCanBake | YES | **WORK-020 KEEP; proof reconciliation** (owner) | **OPEN** | Sonia Gupta — **UNKNOWN** (WORK-022 withhold) |
| `/portfolio/google-ppc-for-real-estate` | The Fine Living Group | NO | **WORK-024 REMOVE FROM PUBLICATION** (owner) | n/a | n/a |
| `/portfolio/google-ads-for-ecommerce` | Utpala Designs | NO | **WORK-025 REMOVE FROM PUBLICATION** (owner) | n/a | n/a |

- **UNKNOWN publication permission among the 7 live case studies:** none. (Clients with UNKNOWN permission appear only in blog links to **non-existent** case-study URLs — OmSaiGroup, GEMS Education, Mohali Citi Center, Advit Prints, Omaxe, Emaar Mohali Hills — all already decided REMOVE; no pages to review.)
- **Owner facts still needed (retained studies; deferred evidence reconciliation, not undecided owner decisions):** Ameba — engagement dates/scope, underlying evidence, written quote approval · Home Decor Brand — engagement dates/scope, evidence, written quote approval · AnybodyCanBake — whether MappedSkills performed the April 2016 work, scope/period, "MappedSkills Marketing" attribution, correct client spelling, meaning of "Online Baking Academy", evidence, written quote approval.
- **Individual-page decisions still PENDING:** none — WORK-008, WORK-009 and WORK-025 decided by owner 2026-09-19 (§0.36). Shared template rows WORK-001 – WORK-005 and WORK-026 – WORK-027 decided (§5.10, §0.36).

### 5.10 SHARED WORK TEMPLATE — OWNER REVIEW (2026-09-19)

Applies to every case-study page that survives the approved removals (currently the three retained studies: Ameba Software, Home Decor Brand, AnybodyCanBake). Behaviour **VERIFIED** on all 7 live pages (desktop crawl + pass-2 rel check).

| # | Exact current behaviour | Where | Destination / implementation | Recommendation | Practical consequence | Dependencies | Owner decision |
|---|---|---|---|---|---|---|---|
| WORK-001 | Breadcrumb "Home" link | Breadcrumb, top of all 7 case studies (followed by "Case Studies" link and an unlinked category label) | `/` — internal, 200, same tab; hard-coded in the case-study template (not Contentful) | **KEEP** | None — standard breadcrumb | None | **KEEP** — owner, 2026-09-19 |
| WORK-002 | Breadcrumb "Case Studies" link | Breadcrumb, all 7 | `/work` — internal, 200, same tab; template | **KEEP** (label already "Case Studies") | None now; consistent with header/footer once NAV-026 is implemented | **NAV-011** (KEEP `/work`, label "Case Studies") · **NAV-026** (footer → "Case Studies") · **SEO-001 CHANGE** (`/work` indexable + in sitemap after cleanup) · PAGE-039/041/044/045 removals shrink `/work` to 3 studies | **KEEP** — owner, 2026-09-19: consistent with approved "Case Studies" naming (NAV-011/NAV-026) |
| WORK-003 | Closing CTA button "Tell us what you’re trying to fix" under the heading "Tell us what you are trying to fix." | Closing CTA band, all 7 | `/contact` — internal, 200, same tab; template | **KEEP** | Primary enquiry path from proof → contact form (`lead_form_*` events) | Enquiry/CTA decisions for core pages; `/contact` retained | **KEEP** — owner, 2026-09-19 |
| WORK-004 | Secondary closing link "What we can and cannot show you" | Closing CTA band, all 7 | `/work` — internal, 200, same tab; template | **KEEP (routing)**; wording to be re-checked when `/work` copy is reconciled | The label echoes `/work` copy about what proof can be shown; if `/work` wording changes during the permission/content cleanup, this label must still describe the destination | `/work` claims A/B recorded as stale (`/work` review) · SEO-001 · PAGE-039 – 045 | **KEEP DESTINATION; COPY REVIEW LATER** — owner, 2026-09-19: reassess wording only when `/work` content is reconciled; no other destination |
| WORK-005 | Contentful rich-text links in case-study bodies open with `target="_blank"` + `rel="noopener noreferrer"` | Bodies of **2** studies only: `google-ads-for-online-courses` (WORK-006 external, WORK-007 internal) and `google-ads-for-ecommerce` (WORK-008 external, WORK-009 internal) — 2 internal + 2 external | Contentful link data (not template code) | **CHANGE — align with BLOG-012:** internal links same tab; external links new tab where appropriate with safe `rel` | After approved removals (WORK-025 pending), only **WORK-007** (internal → `/google-ads`, same tab) and **WORK-006** (external, new tab, `noopener noreferrer` — unchanged) remain | **BLOG-012** (owner policy) · WORK-006 KEEP · WORK-007 CHANGE → `/google-ads` · WORK-008/009/025 pending | **CHANGE** — owner, 2026-09-19: BLOG-012 policy — internal links (e.g. `/google-ads`) same tab; external client links (e.g. AnybodyCanBake) new tab with safe rel attributes. Implementation not authorized |
| WORK-026 | Testimonial block always renders a **★★★★★** five-star graphic with the quote; no rating source, no Review/AggregateRating schema | "What the Client Says", all 7 | Template component (stars not tied to any rating data) | **CHANGE (template policy):** render no star rating unless a genuine, attributable rating source exists; the block must render nothing when a testimonial is withheld | Makes WORK-013/018/022 (withhold testimonial + stars) implementable across the template rather than per page; prevents unsupported rating signals on future studies | WORK-013 · WORK-018 · WORK-022 · `DEC-012` item 10 · no invented Review schema (owner) | **CHANGE** — owner, 2026-09-19: no automatic five stars; a rating only with a genuine, attributable rating source; when a testimonial is withheld (WORK-013/018/022) leave no stars, empty testimonial framing or implied review proof; no manufactured Review schema; no rating inferred from positive wording. Implementation not authorized |
| WORK-027 | Case-study template has **no link to the relevant approved service page**; the only service links are Contentful body links on 2 studies (via legacy `/google-ads-service/`) | All 7 (template); retained SEO studies (Ameba, Home Decor) have **no** service link at all | — | **REVIEW — OWNER DECISION:** add a template "related service" link (e.g. SEO studies → `/seo`, Google Ads → `/google-ads`) **or** keep the current architecture | Proof → service funnel; internal-linking/topical authority. Not required for any decision already made | Approved service architecture · WORK-007 · CAPTURE → CONVERT → MEASURE funnel | **ADD RELATED SERVICE LINK** — owner, 2026-09-19: retained studies only — Ameba → `/seo`; Home Decor Brand → `/seo`; AnybodyCanBake → `/google-ads`; simple contextual link using the case study's approved service relationship; no mapping engine, dynamic logic, filler services, unapproved services or new pages; same tab (WORK-005); label decided at implementation. Implementation not authorized |

**Observed, no owner decision proposed:** (a) the case-study template carries no `/schedule-call` link and no booking terminology — consistent with a `/contact`-first proof page; (b) the category label in the breadcrumb is unlinked and repeated as an eyebrow; (c) no `BreadcrumbList` structured data — owner, 2026-09-19: **LATER TECHNICAL SEO OPPORTUNITY — NOT AN APPROVED CHANGE IN THIS ROUTING PROGRAMME**; (d) hero headline-metric and "Before & After" table components will need to render cleanly when figures are withheld (implementation consequence of WORK-012/017/021).

## 6. Consolidated 404 decisions

All 21 broken placements (17 unique URLs) come from Contentful article text — none from navigation, templates or page code. Fixing any of them is a **Contentful content edit**, which is outside this task.

> **Reconciled 2026-09-20:** the "Recommendation / question" column below is the **original audit text** and is superseded where the owner decided otherwise. Each row now carries the owner decision from §9 (e.g. BLOG-024 is **REMOVE LINK**, not the original CHANGE; BLOG-044 is **REMOVE** and must not use `/portfolio/google-ppc-for-real-estate`).

### A. Existing suitable destination (4)

| ID | Source | Link | Current destination | Recommendation / question |
|---|---|---|---|---|
| BLOG-014 | `/blog/content-marketing-services-in-pune` | content helps businesses | `https://mappedskills.com/importance-of-content-writing/` | CHANGE → `/blog/importance-of-content-writing` — Old URL; the same content exists at this live route. Opens in a new tab (policy: BLOG-012). · **Owner decision (§9):** **CHANGE → `/blog/importance-of-content-writing`** |
| BLOG-024 | `/blog/content-marketing-services-in-pune` | freelance writer | `https://mappedskills.com/freelancing-in-india/` | CHANGE → `/blog/freelancing-in-india` — Old URL; the same content exists at this live route. Opens in a new tab (policy: BLOG-012). **Reopened 2026-09-19: destination planned for unpublishing (BLOG-083); see §0.23.** · **Owner decision (§9):** **REMOVE LINK** |
| BLOG-043 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | content is king | `https://mappedskills.com/importance-of-content-writing/` | CHANGE → `/blog/importance-of-content-writing` — Old URL; the same content exists at this live route. Opens in a new tab (policy: BLOG-012). · **Owner decision (§9):** **CHANGE → `/blog/importance-of-content-writing`** |
| BLOG-068 | `/blog/seo-company-in-pune` | SEO for home decor brands | `https://mappedskills.com/portfolio/seo-for-home-decor/` | CHANGE → `/portfolio/seo-for-home-decor-brand` — Old URL; the same content exists at this live route. Opens in a new tab (policy: BLOG-012). · **Owner decision (§9):** **CHANGE → `/portfolio/seo-for-home-decor-brand`** |

### B. Probable existing destination — owner confirmation required (1)

| ID | Source | Link | Current destination | Recommendation / question |
|---|---|---|---|---|
| BLOG-044 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | lead generation strategies for real estate | `https://mappedskills.com/portfolio/google-ads-for-real-estate/` | REVIEW — probable destination `/portfolio/google-ppc-for-real-estate` — Same topic (Google paid search, real estate); slug differs — confirm it is the same case. Opens in a new tab (policy: BLOG-012). **WITHDRAWN 2026-09-19:** `/portfolio/google-ppc-for-real-estate` is The Fine Living Group — written permission NOT held (§0.6); recommendation now REMOVE (§4.8). · **Owner decision (§9):** **REMOVE** |

### C. No destination exists — OWNER DECISION: create page vs remove/replace link (16)

| ID | Source | Link | Current destination | Recommendation / question |
|---|---|---|---|---|
| BLOG-018 | `/blog/content-marketing-services-in-pune` | videos | `https://mappedskills.com/video-editing-services/` | REVIEW — OWNER DECISION: create page vs remove/replace link — Does MappedSkills currently offer / want to present **video editing** as a service? Opens in a new tab (policy: BLOG-012). · **Owner decision (§9):** **REMOVE SERVICE LINK** |
| BLOG-020 | `/blog/content-marketing-services-in-pune` | managing content across platforms | `https://mappedskills.com/social-media-management/` | REVIEW — OWNER DECISION: create page vs remove/replace link — Does MappedSkills currently offer / want to present **organic social media management**? (`/social-media-ads` is paid social only.) **Owner-recorded architecture fact (§0.15):** `/social-media-ads` states MappedSkills does NOT provide social media management; do not redirect `/social-media-management` to `/social-media-ads` merely to remove the 404. Opens in a new tab (policy: BLOG-012). · **Owner decision (§9):** **REMOVE LINK** |
| BLOG-021 | `/blog/content-marketing-services-in-pune` | email campaigns | `https://mappedskills.com/email-marketing-services/` | REVIEW — OWNER DECISION: create page vs remove/replace link — Does MappedSkills currently offer / want to present **email marketing** as a service? Opens in a new tab (policy: BLOG-012). · **Owner decision (§9):** **REMOVE SERVICE LINK** |
| BLOG-027 | `/blog/content-marketing-services-in-pune` | Read the full case study here | `https://mappedskills.com/portfolio/content-marketing-for-school…` | REVIEW — OWNER DECISION: create page vs remove/replace link — Does MappedSkills have a permissioned **schools / content-marketing case study** to publish? Opens in a new tab (policy: BLOG-012). · **Owner decision (§9):** **REMOVE** |
| BLOG-038 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | lead generation strategies for real estate | `https://mappedskills.com/portfolio/lead-generation-for-real-est…` | REVIEW — OWNER DECISION: create page vs remove/replace link — Does MappedSkills have a permissioned **Omaxe real-estate case study** to publish? Opens in a new tab (policy: BLOG-012). · **Owner decision (§9):** **REMOVE** |
| BLOG-039 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | social media presence | `https://mappedskills.com/social-media-management/` | REVIEW — OWNER DECISION: create page vs remove/replace link — Does MappedSkills currently offer / want to present **organic social media management**? (`/social-media-ads` is paid social only.) **Owner-recorded architecture fact (§0.15):** `/social-media-ads` states MappedSkills does NOT provide social media management; do not redirect `/social-media-management` to `/social-media-ads` merely to remove the 404. Opens in a new tab (policy: BLOG-012). · **Owner decision (§9):** **REMOVE LINK** |
| BLOG-041 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | lead generation strategies for real estate | `https://mappedskills.com/portfolio/lead-generation-for-real-est…` | REVIEW — OWNER DECISION: create page vs remove/replace link — Does MappedSkills have a permissioned **Emaar Mohali Hills case study** to publish? Opens in a new tab (policy: BLOG-012). · **Owner decision (§9):** **REMOVE** |
| BLOG-045 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | video content | `https://mappedskills.com/video-editing-services/` | REVIEW — OWNER DECISION: create page vs remove/replace link — Does MappedSkills currently offer / want to present **video editing** as a service? Opens in a new tab (policy: BLOG-012). · **Owner decision (§9):** **REMOVE SERVICE LINK** |
| BLOG-052 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | Website performanc | `https://mappedskills.com/web-designing-services/` | REVIEW — OWNER DECISION: create page vs remove/replace link — Does MappedSkills currently offer / want to present **web design**? (Link text is also truncated: "Website performanc".) Opens in a new tab (policy: BLOG-012). · **Owner decision (§9):** **REMOVE SERVICE LINK** |
| BLOG-053 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | email campaigns | `https://mappedskills.com/email-marketing-services/` | REVIEW — OWNER DECISION: create page vs remove/replace link — Does MappedSkills currently offer / want to present **email marketing** as a service? Opens in a new tab (policy: BLOG-012). · **Owner decision (§9):** **REMOVE SERVICE LINK** |
| BLOG-060 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | marketing automation | `https://mappedskills.com/marketing-automation-services/` | REVIEW — OWNER DECISION: create page vs remove/replace link — Does MappedSkills currently offer / want to present **marketing automation**? (Pillar 3 is a WORKING HYPOTHESIS only.) Opens in a new tab (policy: BLOG-012). · **Owner decision (§9):** **REMOVE SERVICE LINK** |
| BLOG-073 | `/blog/facebook-advertising-agency-pune` | Social Media Ads for OmSaiGroup | `https://mappedskills.com/portfolio/social-media-ads-omsaigroup/` | REVIEW — OWNER DECISION: create page vs remove/replace link — Does MappedSkills have a permissioned **OmSaiGroup social-ads case study** to publish? Opens in a new tab (policy: BLOG-012). · **Owner decision (§9):** **REMOVE** |
| BLOG-074 | `/blog/facebook-advertising-agency-pune` | Social Media Ads for GEMS Education | `https://mappedskills.com/portfolio/social-media-ads-gems-educat…` | REVIEW — OWNER DECISION: create page vs remove/replace link — Does MappedSkills have a permissioned **GEMS Education social-ads case study** to publish? Opens in a new tab (policy: BLOG-012). · **Owner decision (§9):** **REMOVE** |
| BLOG-075 | `/blog/facebook-advertising-agency-pune` | Social Media Ads for Mohali Citi Center | `https://mappedskills.com/portfolio/social-media-ads-mohali-citi…` | REVIEW — OWNER DECISION: create page vs remove/replace link — Does MappedSkills have a permissioned **Mohali Citi Center social-ads case study** to publish? Opens in a new tab (policy: BLOG-012). · **Owner decision (§9):** **REMOVE** |
| BLOG-076 | `/blog/facebook-advertising-agency-pune` | Social Media Ads for Advit Prints | `https://mappedskills.com/portfolio/social-media-ads-advit-print…` | REVIEW — OWNER DECISION: create page vs remove/replace link — Does MappedSkills have a permissioned **Advit Prints social-ads case study** to publish? Opens in a new tab (policy: BLOG-012). · **Owner decision (§9):** **REMOVE** |
| BLOG-077 | `/blog/facebook-advertising-agency-pune` | Social Media Ads for AnybodyCanBake | `https://mappedskills.com/portfolio/social-media-ads-anybodycanb…` | REVIEW — OWNER DECISION: create page vs remove/replace link — Does MappedSkills have a permissioned **AnybodyCanBake social-ads case study** to publish? (The Google Ads case for the same client exists.) Opens in a new tab (policy: BLOG-012). · **Owner decision (§9):** **REMOVE** |

For class C, answer the question first. If the answer is **no**, the choice is *remove the link* or *replace it with an existing page* (the owner names which). If **yes**, the choice is *create the page* (a separate, approved build task) and then re-point. Grouped questions: **services** — video editing, organic social management, email marketing, web design, marketing automation; **case studies** — schools, Omaxe, Emaar Mohali Hills, and five social-ads clients.

## 7. Consolidated routing-review decisions

> **Reconciled 2026-09-20:** this is a thematic index only; every listed ID is owner-decided — see §9 for the decision text (NAV-039: verify first; remove if unverified — §0.37).

| Theme | Decision IDs | Where |
|---|---|---|
| `/work` naming — "Work" vs "Case Studies" | NAV-011, NAV-026, WORK-002 | `Global — Header / mobile nav`, `Global — Footer`, `Case-study template (all 7)` |
| Navigation gaps against the approved IA (AI search, About) | NAV-016, NAV-017, NAV-041 | `Global — Header / mobile nav`, `Global — Footer` |
| Blog booking behaviour (sticky "Book a call") | BLOG-010 | `Blog template (all 8 articles)` |
| Direct Calendly links vs `/schedule-call` | BLOG-062, BLOG-069 | `/blog/seo-company-in-pune` |
| Canonical Calendly URL | PAGE-058 | `/schedule-call` |
| CTA wording implies a price the destination does not itself provide | PAGE-033 | `/pricing` |
| Generic blog related-service recommendations | BLOG-007, BLOG-008 | `Blog template (all 8 articles)` |
| Content-marketing service links resolving to `/blog` | BLOG-017, BLOG-037 | `/blog/content-marketing-services-in-pune`, `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` |
| Author LinkedIn link | BLOG-009 | `Blog template (all 8 articles)` |
| Affiliate CRM link | BLOG-056, BLOG-059 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` |
| Redirect chains (legacy / trailing-slash URLs in content) | BLOG-015, BLOG-019, BLOG-022, BLOG-048, BLOG-049, BLOG-050, BLOG-051, BLOG-063, BLOG-064, BLOG-065, BLOG-066, BLOG-067, BLOG-072, WORK-007, WORK-009 | 6 sources |
| Internal links opening new tabs | BLOG-012, WORK-005 | `Blog article bodies (Contentful)`, `Case-study bodies (Contentful)` |
| Realtor.com over HTTP | BLOG-042 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` |
| Facebook handle mismatch | NAV-039 | `Global — Footer` |
| Twitter / X naming | BLOG-006 | `Blog template (all 8 articles)` |
| Truncated link text ("Website performanc") | BLOG-052 | also a 404 (class C) |

## 8. SEO / indexability flags

Flagged separately. **Not part of link implementation; nothing is changed.** Current status is from the audit (live `meta robots` and `sitemap.xml`, 2026-09-19).

| ID | Page | Current status | Recommendation | Owner decision |
|---|---|---|---|---|
| SEO-001 | `/work` | `noindex, nofollow`; self-canonical; not in sitemap; linked from header + footer on every page; its 7 child case studies are `index, follow` and in the sitemap | **SEO/INDEXABILITY REVIEW REQUIRED — PENDING `OWNER FACT REQUIRED` (§3.6).** Current state is internally inconsistent: an indexable, sitemapped set of 7 pages whose only hub is `noindex, nofollow` yet is in global navigation. **Conditional recommendation:** (a) if the studies are legitimate public proof (written permission, and the `DEC-012` threshold met) and `/work` is their hub, the approved IA (`DEC-010` §9.4) already specifies the outcome — `/work` becomes indexable (drop `noindex, nofollow`), enters the sitemap, stays in navigation, and claims A/B become stale copy to correct; (b) if legitimacy cannot be established, keep SEO-001 pending — do not index a hub whose own copy denies the proof it lists; (c) if only some are permissioned, decide per study first. | **CHANGE** — owner, 2026-09-19: `/work` should be indexable and included in the sitemap once the permission/content cleanup is implemented (not implemented) |
| SEO-002 | `/privacy-policy` | `noindex, nofollow`; not in sitemap | **SEO-002 — RECOMMEND KEEP NOINDEX** (recommendation recorded 2026-09-19; owner approval not yet given): the privacy policy remains publicly accessible; footer discovery remains available; it is primarily a legal/informational document rather than an organic-search landing page; sitemap inclusion is therefore not required for the current site architecture | **KEEP NOINDEX** — owner, 2026-09-19: `/privacy-policy` remains publicly accessible, remains linked through the site architecture/footer, remains `noindex`, remains excluded from the sitemap. **CLOSED.** Not implemented (no change needed to current state) |
| SEO-003 | `/terms` | `noindex, nofollow`; not in sitemap | **SEO/INDEXABILITY REVIEW REQUIRED** — Intentional in code; correctness not assumed. Linked from every page (footer). | **KEEP NOINDEX** — owner, 2026-09-19: `/terms` remains publicly accessible, remains linked through the site architecture/footer, remains `noindex`, remains excluded from the sitemap. **CLOSED.** Not implemented (no change needed to current state) |
| SEO-004 | `/thank-you` | `noindex, nofollow`; self-canonical; not in sitemap; zero incoming links; reached only via successful enquiry or direct URL | **KEEP noindex (recommended, 2026-09-19 review)** — transactional confirmation with no search value; indexing it would expose a post-conversion URL to direct entry and dilute the confirmation's meaning. `nofollow` only affects its one link to `/how-it-works`, which is linked site-wide anyway. Owner confirms. | **KEEP** — owner, 2026-09-19: `/thank-you` remains `noindex` and excluded from the sitemap |
| SEO-005 | `All 8 blog articles` | no `meta robots` rendered (default indexable); in sitemap | **REVIEW** — Additional audit observation: the only route family without an explicit robots directive. | **KEEP CURRENT INDEX/FOLLOW BEHAVIOUR** — owner, 2026-09-19: no explicit robots tag needed for the default; eligible retained articles stay indexable and in the sitemap; article 3 handled by its separate unpublish decision (BLOG-083). **CLOSED** |
| SEO-006 | `404 page under /portfolio/*` | renders `index, follow` (other 404s render `noindex`) | **REVIEW** — Additional audit observation: a 404 status with an `index` directive on the missing case-study URLs above. | **CHANGE** — owner, 2026-09-20: genuine not-found responses under `/portfolio/*` render `noindex`. Does NOT decide 404 vs 410 vs another removal response for the four removed case studies (URL TREATMENT — DECIDE DURING IMPLEMENTATION; NO IRRELEVANT REDIRECT). Not implemented |
| SEO-007 | `/blog` (hub cards) and all 8 articles | every article displays **July 16, 2026** — Contentful `sys.firstPublishedAt`, not an authored date | **REVIEW — OWNER FACT REQUIRED:** are these the true publication dates? If they reflect a Contentful import/re-publish, the site presents older articles as newly published (e.g. a "2025 Guide" dated 2026). Content/SEO decision, not routing. | **OPEN — ORIGINAL PUBLICATION DATES UNKNOWN** — owner, 2026-09-19: Contentful `firstPublishedAt` establishes first publication in the current Contentful account only, not historical publication; 18 Sep timestamps not to be described as substantive updates; no fabricated dates. Later: use evidenced original dates if recovered, otherwise accurately labelled dates or omit them. Not resolved in routing review |

## 9. Final owner-decision register

Only rows whose recommendation is not a plain `KEEP` are listed. All other rows can be accepted per page with `<page> KEEP-ALL`. *(Reconciled 2026-09-20: some KEEP rows were added during review for traceability; rows not listed here were accepted through owner `KEEP-ALL` decisions recorded per page, **except** §3.21 PAGE-134 – PAGE-145, which were never presented — see §10.)*

| ID | Source | Link | Current destination | Recommendation | Owner decision |
|---|---|---|---|---|---|
| NAV-006 | Global — Header / mobile nav | Social Media Ads | `/social-media-ads` | REVIEW | **KEEP** — owner, 2026-09-19: retain Social Media Ads in header Services menu |
| NAV-007 | Global — Header / mobile nav | Lead Generation | `/lead-generation` | REVIEW | **KEEP** — owner, 2026-09-19: retain Lead Generation in header Services menu |
| NAV-011 | Global — Header / mobile nav | Case Studies | `/work` | REVIEW | **KEEP DESTINATION `/work`; LABEL "Case Studies"** — owner, 2026-09-19: retain in header (live label already reads "Case Studies") |
| NAV-016 | Global — Header / mobile nav | AI search | — (would be `/ai-seo`) | REVIEW | **ADD** — owner, 2026-09-19: add "AI Search" → `/ai-seo` to header Services menu |
| NAV-017 | Global — Header / mobile nav | About | — (would be `/about`) | REVIEW | **ADD** — owner, 2026-09-19: add "About" → `/about` to header navigation |
| NAV-026 | Global — Footer | Work | `/work` | REVIEW | **KEEP DESTINATION `/work`; CHANGE LABEL "Work" → "Case Studies"** — owner, 2026-09-19: standardise with header |
| NAV-039 | Global — Footer | Facebook | `https://facebook.com/mappedskills` | REVIEW | **VERIFY FIRST; REMOVE LINK IF OFFICIAL DESTINATION CANNOT BE VERIFIED** — owner, 2026-09-20 (supersedes the 2026-09-19 holding decision): before implementation verify the official MappedSkills Facebook page; if reliably established use it; otherwise remove the footer Facebook link. No guessed URL; no unverified link kept to preserve the icon |
| NAV-041 | Global — Footer | AI search | — (would be `/ai-seo`) | REVIEW | **ADD** — owner, 2026-09-19: add "AI Search" → `/ai-seo` to footer Services column |
| PAGE-033 | `/pricing` | Get an actual number | `/contact` | REVIEW | **KEEP DESTINATION `/contact`; CHANGE CTA LABEL → "Get a scoped estimate"** — owner, 2026-09-19. Wording-only future change; not a routing change; not implemented |
| PAGE-039 | `/work` | SEO for HealthFirst: Healthcare Website | `/portfolio/seo-healthfirst` | **REMOVE FROM PUBLIC CASE-STUDY SURFACES — owner confirms written client permission is not held** | **OWNER FACT: permission NO** — **REMOVE FROM PUBLIC CASE-STUDY SURFACES** — owner, 2026-09-19 (not implemented) |
| PAGE-040 | `/work` | SEO for Ameba Software: Tech Company | `/portfolio/seo-ameba-software` | **KEEP — written client permission confirmed by owner 2026-09-19** | **OWNER FACT: permission YES** — **KEEP** — owner, 2026-09-19 |
| PAGE-041 | `/work` | Local SEO for EcoClean: Cleaning Service Provider | `/portfolio/local-seo-service-usa` | **REMOVE FROM PUBLIC CASE-STUDY SURFACES — owner confirms written client permission is not held** | **OWNER FACT: permission NO** — **REMOVE FROM PUBLIC CASE-STUDY SURFACES** — owner, 2026-09-19 (not implemented) |
| PAGE-042 | `/work` | SEO for eCommerce Home Decor Brand | `/portfolio/seo-for-home-decor-brand` | **KEEP — written client permission confirmed by owner 2026-09-19** | **OWNER FACT: permission YES** — **KEEP** — owner, 2026-09-19 |
| PAGE-043 | `/work` | Google Ads for Online Courses | `/portfolio/google-ads-for-online-courses` | **KEEP — written client permission confirmed by owner 2026-09-19** | **OWNER FACT: permission YES** — **KEEP** — owner, 2026-09-19 |
| PAGE-044 | `/work` | Google PPC for Real Estate | `/portfolio/google-ppc-for-real-estate` | **REMOVE FROM PUBLIC CASE-STUDY SURFACES — owner confirms written client permission is not held** | **OWNER FACT: permission NO** — **REMOVE FROM PUBLIC CASE-STUDY SURFACES** — owner, 2026-09-19 (not implemented) |
| PAGE-045 | `/work` | How Our Google PPC Packages Helped an E-commerce Brand Increase in Sales | `/portfolio/google-ads-for-ecommerce` | **REMOVE FROM PUBLIC CASE-STUDY SURFACES — owner confirms written client permission is not held** | **OWNER FACT: permission NO** — **REMOVE FROM PUBLIC CASE-STUDY SURFACES** — owner, 2026-09-19 (not implemented) |
| PAGE-058 | `/schedule-call` | Open the booking page | `https://calendly.com/mappedskills` | REVIEW | **CHANGE BOOKING DESTINATION → `https://calendly.com/mappedskills/client-discovery`** (canonical direct Calendly event URL for "Client Discovery Call", 30 minutes; verified read-only 2026-09-19) — owner, 2026-09-19. Not implemented |
| BLOG-006 | Blog template (all 8 articles) | Share: Twitter | `https://twitter.com/intent/tweet?text=Content%20Marketing%20Ser…` | REVIEW | **CHANGE LABEL "Twitter" → "X"** — owner, 2026-09-19: label/platform-name cleanup only; keep the working share behaviour unless implementation review finds a reason to canonicalise the destination |
| BLOG-007 | Blog template (all 8 articles) | Learn More | `/google-ads` | REVIEW | **CHANGE** — owner, 2026-09-19: per-article selection of genuinely related APPROVED services; omit when none is relevant (see BLOG-008) |
| BLOG-008 | Blog template (all 8 articles) | "Learn More" ×3 (Google Ads, SEO, Lead Generation… | `/google-ads` · `/seo` · `/lead-generation` | REVIEW | **CHANGE** — owner, 2026-09-19: per-article selection of genuinely related APPROVED services (SEO · AI Search · Google Ads · Social Media Ads · Conversion Optimization · Lead Generation); NOT the Contentful category mapping; no universal Google Ads/SEO/Lead Generation set; element omitted where nothing is genuinely relevant; unused mapping copy not to be exposed; exact selection deferred to implementation |
| BLOG-009 | Blog template (all 8 articles) | Connect on LinkedIn | `https://linkedin.com/in/amit-gupta` | REVIEW | **Split decision** — owner, 2026-09-19: **9A KEEP AUTHOR NAME: Amit Gupta** (owner fact; does not validate legacy first-person autobiographical statements) · **9B VERIFY OFFICIAL LINKEDIN URL BEFORE USE** (OWNER FACT still required; if unverified at implementation, remove/hide the link; no replacement invented) · **9C CHANGE AUTHOR ROLE/BIO** (remove "Performance Marketing Strategist" and the fallback bio; replacement not written now) |
| BLOG-010 | Blog template (all 8 articles) | Book a call | `/schedule-call` | REVIEW | **KEEP** — owner, 2026-09-19: sidebar "Book a call" → `/schedule-call` (canonical Client Discovery Call — 30 minutes); headline wording to later copy review |
| BLOG-012 | Blog article bodies (Contentful) | Internal links that open in a new tab (target=_bl… | 38 internal links | REVIEW | **CHANGE internal-link tab policy** — owner, 2026-09-19: internal links → same tab; external links → new tab where appropriate with safe rel attributes; applied to whatever internal links survive all approved removals/changes (no fixed count of 38 as a requirement) |
| BLOG-014 | `/blog/content-marketing-services-in-pune` | content helps businesses | `https://mappedskills.com/importance-of-content-writing/` | CHANGE → `/blog/importance-of-content-writing` | **CHANGE → `/blog/importance-of-content-writing`** — owner, 2026-09-19. Not implemented |
| BLOG-015 | `/blog/content-marketing-services-in-pune` | lead generation | `https://mappedskills.com/lead-generation-services/` | CHANGE → `/lead-generation` | **CHANGE → `/lead-generation`** — owner, 2026-09-19. Not implemented |
| BLOG-017 | `/blog/content-marketing-services-in-pune` | content marketing agency | `https://mappedskills.com/content-marketing-services/` | REVIEW | **CHANGE REQUIRED** — owner, 2026-09-19: `/blog` is not a Content Marketing service page and must not be used as one; no Content Marketing service page to be created in this programme; final destination/wording resolved during content implementation after the article's service positioning is corrected |
| BLOG-018 | `/blog/content-marketing-services-in-pune` | videos | `https://mappedskills.com/video-editing-services/` | REVIEW — OWNER DECISION: create page vs remove/replace link | **REMOVE SERVICE LINK** — owner, 2026-09-19: video editing is not an approved service; no Video Editing page to be created; educational discussion of video may remain (later content review) |
| BLOG-019 | `/blog/content-marketing-services-in-pune` | Optimized content to rank higher | `https://mappedskills.com/seo-services/` | CHANGE → `/seo` | **CHANGE → `/seo`** — owner, 2026-09-19. Not implemented |
| BLOG-020 | `/blog/content-marketing-services-in-pune` | managing content across platforms | `https://mappedskills.com/social-media-management/` | REVIEW — OWNER DECISION: create page vs remove/replace link | **REMOVE LINK** — owner, 2026-09-19: MappedSkills does not offer organic social media management; do NOT redirect to `/social-media-ads`; do NOT create `/social-media-management`; surrounding wording handled under BLOG-081 |
| BLOG-021 | `/blog/content-marketing-services-in-pune` | email campaigns | `https://mappedskills.com/email-marketing-services/` | REVIEW — OWNER DECISION: create page vs remove/replace link | **REMOVE SERVICE LINK** — owner, 2026-09-19: email marketing is not an approved service; no Email Marketing page to be created; educational discussion of email marketing may remain |
| BLOG-022 | `/blog/content-marketing-services-in-pune` | case studies | `https://mappedskills.com/work/` | CHANGE → `/work` | **CHANGE → `/work`** — owner, 2026-09-19. Not implemented |
| BLOG-024 | `/blog/content-marketing-services-in-pune` | freelance writer | `https://mappedskills.com/freelancing-in-india/` | CHANGE → `/blog/freelancing-in-india` | **REMOVE LINK** — owner, 2026-09-19 (resolves the reopened dependency): no suitable replacement destination established; surrounding educational text kept only if still useful after content reconciliation; no destination invented |
| BLOG-027 | `/blog/content-marketing-services-in-pune` | Read the full case study here | `https://mappedskills.com/portfolio/content-marketing-for-school…` | REVIEW — OWNER DECISION: create page vs remove/replace link | **REMOVE** — owner, 2026-09-19: Vibgyor High has NO written permission; do NOT create the case-study page; do NOT redirect to `/work`; do NOT expose Vibgyor through another case-study route |
| BLOG-037 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | compelling content marketing strategies | `https://mappedskills.com/content-marketing-services/` | REVIEW | **CHANGE REQUIRED** — owner, 2026-09-19: `/blog` is not a Content Marketing service page; no standalone Content Marketing page; resolve in content reconciliation consistently with BLOG-017 and BLOG-081 |
| BLOG-038 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | lead generation strategies for real estate | `https://mappedskills.com/portfolio/lead-generation-for-real-est…` | REVIEW — OWNER DECISION: create page vs remove/replace link | **REMOVE** — owner, 2026-09-19: no replacement case study; no redirect to `/work`; no substitute client case study |
| BLOG-039 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | social media presence | `https://mappedskills.com/social-media-management/` | REVIEW — OWNER DECISION: create page vs remove/replace link | **REMOVE LINK** — owner, 2026-09-19: organic Social Media Management is not offered; no page to be created |
| BLOG-041 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | lead generation strategies for real estate | `https://mappedskills.com/portfolio/lead-generation-for-real-est…` | REVIEW — OWNER DECISION: create page vs remove/replace link | **REMOVE** — owner, 2026-09-19: no replacement case study; no redirect to `/work`; no substitute client case study |
| BLOG-042 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | Realtor.com | `http://Realtor.com` | CHANGE → `https://www.realtor.com/` | **CHANGE → `https://www.realtor.com/`** — owner, 2026-09-19. Canonical-destination decision only; context/content concerns governed by BLOG-090/091/092. Not implemented |
| BLOG-043 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | content is king | `https://mappedskills.com/importance-of-content-writing/` | CHANGE → `/blog/importance-of-content-writing` | **CHANGE → `/blog/importance-of-content-writing`** — owner, 2026-09-19. Canonical-destination decision only; context/content concerns governed by BLOG-090/091/092. Not implemented |
| BLOG-044 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | lead generation strategies for real estate | `https://mappedskills.com/portfolio/google-ads-for-real-estate/` | REVIEW — REMOVE recommended (probable destination withdrawn: The Fine Living Group, permission NO) | **REMOVE** — owner, 2026-09-19: no replacement case study; no redirect to `/work`; do NOT use `/portfolio/google-ppc-for-real-estate` (The Fine Living Group — written permission NO) |
| BLOG-045 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | video content | `https://mappedskills.com/video-editing-services/` | REVIEW — OWNER DECISION: create page vs remove/replace link | **REMOVE SERVICE LINK** — owner, 2026-09-19: Video Editing not approved; no page to be created |
| BLOG-048 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | Google Ads | `https://mappedskills.com/google-ads-service/` | CHANGE → `/google-ads` | **CHANGE → `/google-ads`** — owner, 2026-09-19. Canonical-destination decision only; context/content concerns governed by BLOG-090/091/092. Not implemented |
| BLOG-049 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | Social Media Ads | `https://mappedskills.com/social-media-advertising/` | CHANGE → `/social-media-ads` | **CHANGE → `/social-media-ads`** — owner, 2026-09-19. Canonical-destination decision only; context/content concerns governed by BLOG-090/091/092. Not implemented |
| BLOG-050 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | lead generation strategies for real estate | `https://mappedskills.com/lead-generation-services/` | CHANGE → `/lead-generation` | **CHANGE → `/lead-generation`** — owner, 2026-09-19. Canonical-destination decision only; context/content concerns governed by BLOG-090/091/092. Not implemented |
| BLOG-051 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | SEO strategies | `https://mappedskills.com/seo-services/` | CHANGE → `/seo` | **CHANGE → `/seo`** — owner, 2026-09-19. Canonical-destination decision only; context/content concerns governed by BLOG-090/091/092. Not implemented |
| BLOG-052 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | Website performanc | `https://mappedskills.com/web-designing-services/` | REVIEW — OWNER DECISION: create page vs remove/replace link | **REMOVE SERVICE LINK** — owner, 2026-09-19: Web Design not approved; no page to be created |
| BLOG-053 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | email campaigns | `https://mappedskills.com/email-marketing-services/` | REVIEW — OWNER DECISION: create page vs remove/replace link | **REMOVE SERVICE LINK** — owner, 2026-09-19: Email Marketing not approved; no page to be created |
| BLOG-056 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | leveraging CRM technology | `https://pickyassist.com/en?fpr=3offa` | REVIEW | **REMOVE AFFILIATE LINK** — owner, 2026-09-19: referral parameter with no established disclosure/sponsored-link treatment; do not replace with another affiliate link; educational mention of CRM tools allowed |
| BLOG-059 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | CRM Tools | `https://pickyassist.com/en?fpr=3offa` | REVIEW | **REMOVE AFFILIATE LINK** — owner, 2026-09-19: referral parameter with no established disclosure/sponsored-link treatment; do not replace with another affiliate link; educational mention of CRM tools allowed |
| BLOG-060 | `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | marketing automation | `https://mappedskills.com/marketing-automation-services/` | REVIEW — OWNER DECISION: create page vs remove/replace link | **REMOVE SERVICE LINK** — owner, 2026-09-19: Marketing Automation is NOT approved as a MappedSkills service; no page to be created |
| BLOG-062 | `/blog/seo-company-in-pune` | Book a Growth Diagnosis (20-min) | `https://calendly.com/mappedskills/client-discovery` | CHANGE → `/schedule-call` | **CHANGE → `/schedule-call`** — owner, 2026-09-19. Not implemented |
| BLOG-063 | `/blog/seo-company-in-pune` | SEO services (×2) | `https://mappedskills.com/seo-services/` | CHANGE → `/seo` | **CHANGE → `/seo`** — owner, 2026-09-19. Not implemented |
| BLOG-064 | `/blog/seo-company-in-pune` | local SEO case example | `https://mappedskills.com/portfolio/local-seo-service-usa/` | REVIEW — REMOVE recommended (EcoClean Pros — permission NO) | **REMOVE** — owner, 2026-09-19: EcoClean Pros — NO written permission; no redirect to `/work`; no substitute case study; surrounding wording reviewed so it does not remain identifiable client proof |
| BLOG-065 | `/blog/seo-company-in-pune` | lead generation services | `https://mappedskills.com/lead-generation-services/` | CHANGE → `/lead-generation` | **CHANGE → `/lead-generation`** — owner, 2026-09-19. Not implemented |
| BLOG-066 | `/blog/seo-company-in-pune` | SEO for healthcare | `https://mappedskills.com/portfolio/seo-healthfirst/` | REVIEW — REMOVE recommended (HealthFirst Clinics — permission NO) | **REMOVE** — owner, 2026-09-19: HealthFirst Clinics — NO written permission; no redirect to `/work`; no substitute case study; surrounding wording reviewed so it does not remain identifiable client proof |
| BLOG-067 | `/blog/seo-company-in-pune` | SEO for software business | `https://mappedskills.com/portfolio/seo-ameba-software/` | REVIEW — CHANGE → `/portfolio/seo-ameba-software` recommended (permission YES; DEC-012 pending) | **CHANGE → `/portfolio/seo-ameba-software`** — owner, 2026-09-19: permission YES allows the public-client architecture; NOT approval of every claim — quotes/figures/results still require DEC-012 validation. Not implemented |
| BLOG-068 | `/blog/seo-company-in-pune` | SEO for home decor brands | `https://mappedskills.com/portfolio/seo-for-home-decor/` | REVIEW — CHANGE → `/portfolio/seo-for-home-decor-brand` recommended (permission YES; DEC-012 pending) | **CHANGE → `/portfolio/seo-for-home-decor-brand`** — owner, 2026-09-19: permission YES allows the public-client architecture; NOT approval of every claim — quotes/figures/results still require DEC-012 validation. Not implemented |
| BLOG-069 | `/blog/seo-company-in-pune` | Book a Growth Diagnosis (30-min) | `https://calendly.com/mappedskills/client-discovery` | CHANGE → `/schedule-call` | **CHANGE → `/schedule-call`** — owner, 2026-09-19. Not implemented |
| BLOG-072 | `/blog/facebook-advertising-agency-pune` | social media advertising services | `https://mappedskills.com/social-media-advertising/` | CHANGE → `/social-media-ads` | **CHANGE → `/social-media-ads`** — owner, 2026-09-19. Not implemented |
| BLOG-073 | `/blog/facebook-advertising-agency-pune` | Social Media Ads for OmSaiGroup | `https://mappedskills.com/portfolio/social-media-ads-omsaigroup/` | REVIEW — REMOVE recommended (OmSaiGroup — permission UNKNOWN) | **REMOVE** — owner, 2026-09-19: publication permission UNKNOWN (not inferred); no case study created; no redirect to `/work`; no substitute; surrounding copy reviewed later so no unsupported identifiable client-proof claim remains |
| BLOG-074 | `/blog/facebook-advertising-agency-pune` | Social Media Ads for GEMS Education | `https://mappedskills.com/portfolio/social-media-ads-gems-educat…` | REVIEW — REMOVE recommended (GEMS Education — permission UNKNOWN) | **REMOVE** — owner, 2026-09-19: publication permission UNKNOWN (not inferred); no case study created; no redirect to `/work`; no substitute; surrounding copy reviewed later so no unsupported identifiable client-proof claim remains |
| BLOG-075 | `/blog/facebook-advertising-agency-pune` | Social Media Ads for Mohali Citi Center | `https://mappedskills.com/portfolio/social-media-ads-mohali-citi…` | REVIEW — REMOVE recommended (Mohali Citi Center — permission UNKNOWN) | **REMOVE** — owner, 2026-09-19: publication permission UNKNOWN (not inferred); no case study created; no redirect to `/work`; no substitute; surrounding copy reviewed later so no unsupported identifiable client-proof claim remains |
| BLOG-076 | `/blog/facebook-advertising-agency-pune` | Social Media Ads for Advit Prints | `https://mappedskills.com/portfolio/social-media-ads-advit-print…` | REVIEW — REMOVE recommended (Advit Prints — permission UNKNOWN) | **REMOVE** — owner, 2026-09-19: publication permission UNKNOWN (not inferred); no case study created; no redirect to `/work`; no substitute; surrounding copy reviewed later so no unsupported identifiable client-proof claim remains |
| BLOG-077 | `/blog/facebook-advertising-agency-pune` | Social Media Ads for AnybodyCanBake | `https://mappedskills.com/portfolio/social-media-ads-anybodycanb…` | REVIEW — REMOVE recommended (AnybodyCanBake — permission YES, but no social-ads case study exists; do not substitute the Google Ads study) | **REMOVE** — owner, 2026-09-19: AnybodyCanBake has written permission, but no established Social Media Ads case study exists; the Google Ads study is different evidence and is NOT substituted |
| BLOG-078 | `/blog/content-marketing-services-in-pune` | Vibgyor High client-result claim (35% enrollment inquiries) | — | REVIEW — OWNER FACT REQUIRED (permission + DEC-012) | **REMOVE PUBLIC CLIENT/RESULT CLAIM** — owner, 2026-09-19: no written permission; remove the identifiable Vibgyor client-result claim; do not publish the 35% result attributed to Vibgyor; not to be solved by finding evidence for the number; no Vibgyor case study |
| BLOG-079 | `/blog/content-marketing-services-in-pune` | "Pune’s digital advertising spending grew by 15% in 2023" | — | REVIEW — EVIDENCE REQUIRED OR WORDING CHANGE | **OPEN — EVIDENCE REQUIRED OR WORDING CHANGE** (kept by owner, 2026-09-19) |
| BLOG-080 | `/blog/content-marketing-services-in-pune` | Unsourced ₹ price ranges | — | REVIEW | **OPEN — REVIEW** (kept by owner, 2026-09-19): unsourced market price ranges; not MappedSkills pricing |
| BLOG-081 | `/blog/content-marketing-services-in-pune` | Content-marketing / social / email / video service positioning | — | REVIEW — OWNER DECISION (keep as education / rewrite / unpublish) | **CONTENT/SERVICE POSITIONING CHANGE REQUIRED** — owner, 2026-09-19: article may remain published as educational content but must not present MappedSkills as offering services outside the approved architecture (not approval to unpublish; not approval to create service pages) |
| BLOG-082 | `/blog/building-an-email-list` | Unsourced "highest ROI" / "better conversion rates" comparative claims | — | REVIEW — EVIDENCE REQUIRED OR WORDING CHANGE | **OPEN — EVIDENCE REQUIRED OR WORDING CHANGE** (kept by owner, 2026-09-19); not researched or rewritten during the routing programme |
| BLOG-083 | `/blog/freelancing-in-india` | Audience/ICP fit, first-person biography, dated "2025" title | — | REVIEW — OWNER DECISION (keep / rewrite / unpublish) | **UNPUBLISH ARTICLE** — owner, 2026-09-19: `/blog/freelancing-in-india` approved for LATER unpublish (content/architecture decision). Not unpublished, redirected, deleted or rewritten now |
| BLOG-084 | `/blog/freelancing-in-india` | Unsourced market/growth assertions | — | REVIEW — EVIDENCE REQUIRED OR WORDING CHANGE | **SUBSUMED under BLOG-083 (unpublish)** — owner, 2026-09-19: supporting observation; not substantiated, rewritten or independently remediated |
| BLOG-085 | `/blog/freelancing-in-india` | Tax/legal statements for freelancers | — | REVIEW — QUALIFIED TAX/LEGAL REVIEW | **SUBSUMED under BLOG-083 (unpublish)** — owner, 2026-09-19: supporting observation (tax/legal statements would need qualified review only if the content were ever retained publicly); not independently remediated |
| BLOG-086 | `/blog/importance-of-content-writing` | Career-guide sections and implied content-writing-agency offer | — | REVIEW — OWNER DECISION (keep / rewrite / unpublish); dependency BLOG-014, BLOG-043 | **KEEP ARTICLE; CONTENT REPOSITIONING REQUIRED** — owner, 2026-09-19: do NOT unpublish; later reconciliation makes it consistently useful to the buyer/ICP; no standalone Content Writing/Content Marketing service to be created. BLOG-014 remains approved (not reopened) |
| BLOG-087 | `/blog/importance-of-content-writing` | Unsourced demand/effectiveness assertions | — | REVIEW — EVIDENCE REQUIRED OR WORDING CHANGE | **OPEN — EVIDENCE REQUIRED OR WORDING CHANGE** (kept by owner, 2026-09-19); not researched or rewritten during routing review |
| BLOG-088 | `/blog/performance-marketing-vs-digital-marketing` | "guarantees", "Higher ROI", pay-only-for-outcomes claims | — | REVIEW — WORDING CHANGE REQUIRED (recommended) | **WORDING CHANGE REQUIRED** — owner, 2026-09-19: later rewrite must distinguish (1) performance marketing as a concept, (2) how ad platforms actually charge, (3) MappedSkills' own commercial model; must NOT imply pay-per-result pricing; no commercial model invented |
| BLOG-089 | `/blog/performance-marketing-vs-digital-marketing` | Performance-marketing positioning (superseded identity) | — | REVIEW — OWNER DECISION (keep as neutral education / reposition / unpublish) | **KEEP ARTICLE; CONTENT REPOSITIONING REQUIRED** — owner, 2026-09-19: do NOT unpublish; topic may remain; must not reinforce the retired "performance marketing agency" positioning |
| BLOG-090 | `/blog/7-proven-strategies-…` | "MappedSkills gets results", "Proven", hype; title/H1 mismatch | — | REVIEW — WORDING CHANGE REQUIRED (recommended) | **WORDING CHANGE REQUIRED** — owner, 2026-09-19; do not fabricate evidence to preserve the claims |
| BLOG-091 | `/blog/7-proven-strategies-…` | Unsourced claims about Zillow, Realtor.com, Redfin, CoStar, MagicBricks, 99acres, Godrej, Lodha | — | REVIEW — EVIDENCE REQUIRED OR WORDING CHANGE | **EVIDENCE OR CONTEXT CHANGE REQUIRED** — owner, 2026-09-19; fix the Redfin/CoStar passage so MappedSkills service links cannot imply MappedSkills ran their campaigns; no client relationship to be inferred |
| BLOG-092 | `/blog/7-proven-strategies-…` | Links presenting non-approved services | — | REVIEW — OWNER DECISION (recommended CONTENT/SERVICE POSITIONING CHANGE REQUIRED) | **CONTENT/SERVICE POSITIONING CHANGE REQUIRED** — owner, 2026-09-19; no service pages created as a consequence |
| BLOG-093 | `/blog/seo-company-in-pune` | Public editorial note ("…add first-party proof…") | — | REVIEW — REMOVE WORDING (recommended) | **REMOVE WORDING** — owner, 2026-09-19: the internal instruction must not remain public; no fabricated proof/snapshots/results to satisfy it |
| BLOG-094 | `/blog/seo-company-in-pune` | "3 to 6 months" vs approved 12-month position | — | REVIEW — WORDING CHANGE REQUIRED (recommended) | **WORDING CHANGE REQUIRED** — owner, 2026-09-19: align with the approved 12-month SEO position; no new timeline invented |
| BLOG-095 | `/blog/seo-company-in-pune` | "Growth Diagnosis (20-min). Free. No prep. No pitch." | — | REVIEW — OWNER DECISION | **CHANGE TO CANONICAL BOOKING POSITIONING** — owner, 2026-09-19: no "Growth Diagnosis", no "20-min", no "Free"; Client Discovery Call — 30 minutes via `/schedule-call`; "No prep. No pitch." may remain subject to copy review; Calendly not edited |
| BLOG-096 | `/blog/seo-company-in-pune` | "Best", outcome claim, penalty recovery, mis-category | — | REVIEW — EVIDENCE REQUIRED OR WORDING CHANGE | **EVIDENCE OR WORDING CHANGE REQUIRED** — owner, 2026-09-19: "Best" not an established superlative; no penalty-recovery claim unless capability established; fix "Content Marketing" category; preserve the no-ranking-guarantee position |
| BLOG-097 | `/blog/facebook-advertising-agency-pune` | Public editorial note ("We also recommend supporting this page…") | — | REVIEW — REMOVE WORDING (recommended) | **REMOVE WORDING** — owner, 2026-09-19: no performance snapshots, case studies or proof to be manufactured to satisfy the note |
| BLOG-098 | `/blog/facebook-advertising-agency-pune` | Unlinked "Book a Growth Diagnosis. Free. No prep. No pitch." ×2 | — | REVIEW — CHANGE TO CANONICAL BOOKING POSITIONING (recommended) | **CHANGE TO CANONICAL BOOKING POSITIONING** — owner, 2026-09-19: Client Discovery Call — 30 minutes via `/schedule-call`; no "Growth Diagnosis"; no standing "Free" promise; "No prep. No pitch." may remain subject to copy review; any intended booking CTA to become a functional link |
| BLOG-099 | `/blog/facebook-advertising-agency-pune` | Retargeting / lookalike / customer-list / Meta Pixel capability claims | — | REVIEW — CAPABILITY VALIDATION OR WORDING CHANGE | **CAPABILITY WORDING CHANGE REQUIRED** — owner, 2026-09-19: narrow/remove retargeting, lookalike, customer-list, Meta Pixel and event-setup claims to match established capability. NOT approval to activate Pixel, implement CAPI, retain click IDs, build audience sync, upload customer lists, create retargeting infrastructure or change consent |
| BLOG-100 | `/blog/facebook-advertising-agency-pune` | "Experts", outcome claims, demand-creation and engagement framing, ROI/ROAS, "PPC" category | — | REVIEW — WORDING CHANGE REQUIRED (recommended) | **WORDING / POSITIONING CHANGE REQUIRED** — owner, 2026-09-19: align with approved paid-social capability language and proof discipline; no invented performance evidence; preserve the rejection of guaranteed outcomes |
| WORK-001 | Case-study template (all 7) | Home | `/` | KEEP | **KEEP** — owner, 2026-09-19 |
| WORK-002 | Case-study template (all 7) | Case Studies | `/work` | REVIEW | **KEEP** — owner, 2026-09-19: consistent with approved "Case Studies" naming (NAV-011/NAV-026) |
| WORK-003 | Case-study template (all 7) | Tell us what you’re trying to fix | `/contact` | KEEP | **KEEP** — owner, 2026-09-19 |
| WORK-004 | Case-study template (all 7) | What we can and cannot show you | `/work` | KEEP | **KEEP DESTINATION; COPY REVIEW LATER** — owner, 2026-09-19 |
| WORK-005 | Case-study bodies (Contentful) | Internal links that open in a new tab (target=_bl… | 2 internal links | REVIEW | **CHANGE** — owner, 2026-09-19: BLOG-012 policy — internal links (e.g. `/google-ads`) same tab; external client links (e.g. AnybodyCanBake) new tab with safe rel attributes. Implementation not authorized |
| WORK-006 | `/portfolio/google-ads-for-online-courses` | AnybodyCanBake | `https://anybodycanbake.com/` | KEEP | **KEEP** — owner, 2026-09-19: destination appropriate for the named client and currently works; tab behaviour follows shared WORK-005 policy. No implementation now |
| WORK-007 | `/portfolio/google-ads-for-online-courses` | Google Ads | `https://mappedskills.com/google-ads-service/` | CHANGE → `/google-ads` | **CHANGE → `/google-ads`** — owner, 2026-09-19: do not route through `/google-ads-service/`; intended destination is the canonical approved service page; tab behaviour follows shared WORK-005 later. No implementation now |
| WORK-009 | `/portfolio/google-ads-for-ecommerce` | Google PPC Strategy | `https://mappedskills.com/google-ads-service/` | REVIEW — SUPERSEDED BY WORK-025 (recommended; original CHANGE → `/google-ads`) | **SUPERSEDED BY WORK-025; NO SEPARATE IMPLEMENTATION** — owner, 2026-09-19: do not independently change to `/google-ads` |
| WORK-010 | `/portfolio/seo-healthfirst` | Removal method and URL treatment (implements PAGE-039; permission NO) | — | REVIEW — OWNER DECISION on URL treatment (no automatic redirect recommended) | **REMOVE FROM PUBLICATION** — owner, 2026-09-19: HealthFirst Clinics — NO written permission (aligns with PAGE-039, BLOG-066). **URL TREATMENT — DECIDE DURING IMPLEMENTATION; NO IRRELEVANT REDIRECT.** Implementation not authorized |
| WORK-011 | `/portfolio/seo-ameba-software` | Retention of the case study (permission YES; no DEC-012 evidence) | — | REVIEW — OWNER DECISION (+ owner facts: work period/scope, client data, quote approval) | **KEEP CLIENT/PAGE; PROOF RECONCILIATION REQUIRED** — owner, 2026-09-19: Ameba Software has written publication permission; client may remain publicly identified and the page may remain in the public Case Studies architecture; PAGE-040 stays KEEP; BLOG-067 may keep targeting it. **Not approval of the existing copy**; do not unpublish because legacy proof is deficient. DEC-012 OPEN for Ameba. Implementation not authorized |
| WORK-012 | `/portfolio/seo-ameba-software` | Quantitative claims (figures duplicate HealthFirst's) | — | REVIEW — REMOVE unless evidenced (recommended) | **REMOVE UNLESS DEC-012 EVIDENCE IS SUPPLIED** — owner, 2026-09-19: all quantitative claims (+200% traffic; 10,000 → 30,000; 30+ keywords; 18 on page one; 12 → 30+; +150% inquiries; 40 → 100; DA 30 → 42; associated time-period claims). Do not correct, reconcile or re-derive; no replacement numbers; no vague substitutes ("significant growth"). Duplication with HealthFirst = material red flag. Implementation not authorized |
| WORK-013 | `/portfolio/seo-ameba-software` | Named testimonial (Gagan Deep) + star rating | — | REVIEW — OWNER FACT REQUIRED (written quote approval) | **WITHHOLD UNLESS WRITTEN QUOTE APPROVAL IS CONFIRMED** — owner, 2026-09-19: client permission ≠ permission for a named individual's verbatim quote. Until written approval of quote + attribution: withhold testimonial, "Gagan Deep, Partner" attribution and the 5-star presentation. No invented Review schema; no unattributed paraphrase. Implementation not authorized |
| WORK-014 | `/portfolio/seo-ameba-software` | "TechWave Solutions", ranking contradiction, misspelling | — | REVIEW — WORDING CHANGE REQUIRED (recommended) | **CHANGE REQUIRED** — owner, 2026-09-19: correct/remove "TechWave Solutions", "Ameba Softwares", the 18-vs-30+ contradiction (never pick the more favourable number; evidenced figure only, else removed under WORK-012) and redundant repeated result presentation. Implementation not authorized |
| WORK-015 | `/portfolio/local-seo-service-usa` | Publication of EcoClean Pros case study (permission NO) | — | REVIEW — REMOVE FROM PUBLICATION (recommended); URL treatment as WORK-010 | **REMOVE FROM PUBLICATION** — owner, 2026-09-19: EcoClean Pros has NO written publication permission; aligns with PAGE-041 REMOVE and BLOG-064 REMOVE. **URL TREATMENT — DECIDE DURING IMPLEMENTATION; NO IRRELEVANT REDIRECT** (WORK-010 rule). No proof rescue, reuse or anonymization. Implementation not authorized |
| WORK-016 | `/portfolio/seo-for-home-decor-brand` | Retention of the case study (permission YES; no DEC-012 evidence) | — | REVIEW — OWNER DECISION (recommended as WORK-011; + owner facts: engagement scope/dates) | **KEEP CLIENT/PAGE; PROOF RECONCILIATION REQUIRED** — owner, 2026-09-19: Home Decor Brand has written permission; existing public naming "eCommerce Home Decor Brand" may remain (no disclosure of the legal/business name required; permission does not imply naming). PAGE-042 KEEP; BLOG-068 may target this canonical URL; may remain indexable subject to later reconciliation. Permission does not validate results, dates, testimonial, scope or attribution. DEC-012 OPEN. Implementation not authorized |
| WORK-017 | `/portfolio/seo-for-home-decor-brand` | Quantitative claims (traffic, rankings, ₹ sales, bounce, "conversion rate") | — | REVIEW — REMOVE UNLESS DEC-012 EVIDENCE IS SUPPLIED (recommended) | **REMOVE UNLESS DEC-012 EVIDENCE IS SUPPLIED** — owner, 2026-09-19: +85% traffic; 12,000 → 22,200; 20+ keywords; 12 on page one; 8 → 20+; +50% sales; ₹4,00,000 → ₹6,00,000; organic sales attribution; −25% bounce; 58% → 43% "Conversion Rate"; associated time-period claims. Do not correct, reinterpret, re-derive, or relabel 58% → 43% as bounce rate (a possible explanation, not evidence). No vague substitutes. Implementation not authorized |
| WORK-018 | `/portfolio/seo-for-home-decor-brand` | Named testimonial (Suyog, Marketing Head) + star rating | — | REVIEW — WITHHOLD UNLESS WRITTEN QUOTE APPROVAL IS CONFIRMED (recommended) | **WITHHOLD UNLESS WRITTEN QUOTE APPROVAL IS CONFIRMED** — owner, 2026-09-19: "Suyog, Marketing Head"; withhold testimonial, personal attribution and 5-star presentation until written approval of quote + attribution. No invented Review schema; no anonymous paraphrase. Implementation not authorized |
| WORK-019 | `/portfolio/seo-for-home-decor-brand` | "Conversion Rate 58% → 43%", ranking contradiction, "Content Marketing" heading, wording | — | REVIEW — CHANGE REQUIRED (recommended) | **CHANGE REQUIRED** — owner, 2026-09-19: address the "Conversion Rate 58% → 43%" row; 12 on page one vs 20+ top-10; unsupported revenue attribution; "effectiveness of SEO in driving conversions"; "significantly expanding their reach"; "go-to brand"; unsupported tool/link-building claims. Never pick the more favourable number; evidenced info only, else remove under WORK-017. "Content Marketing" only as a supporting activity within SEO if accurate — never implying a standalone approved service. Implementation not authorized |
| WORK-020 | `/portfolio/google-ads-for-online-courses` | Retention of the case study (permission YES; no DEC-012 evidence) | — | REVIEW — OWNER DECISION (recommended as WORK-011/016; + owner facts: 2016 engagement provider/scope, client spelling) | **KEEP CLIENT/PAGE; PROOF RECONCILIATION REQUIRED** — owner, 2026-09-19: AnybodyCanBake has written permission; client may remain identified; PAGE-043 KEEP; page may remain in Case Studies architecture. Permission does not validate April 2016 engagement facts, provider, duration/scope, results, attribution, testimonial or legacy wording. Not a substitute for BLOG-077 (remains REMOVE). DEC-012 OPEN. Implementation not authorized |
| WORK-021 | `/portfolio/google-ads-for-online-courses` | Quantitative claims (enrollments, traffic, conversion rate, CPA) | — | REVIEW — REMOVE UNLESS DEC-012 EVIDENCE IS SUPPLIED (recommended) | **REMOVE UNLESS DEC-012 EVIDENCE IS SUPPLIED** — owner, 2026-09-19: "Course Enrollments: 500"; 200 → 500; 1,000 → 3,000 visits/month; 2% → 5%; ₹500 → ₹200 CPA; associated growth/period claims and dependent ROI implications. No reconciliation, no chosen interpretation, no manufactured period, no vague substitutes. No single evidence source prescribed. Implementation not authorized |
| WORK-022 | `/portfolio/google-ads-for-online-courses` | Named testimonial (Sonia Gupta, Founder) + star rating | — | REVIEW — WITHHOLD UNLESS WRITTEN QUOTE APPROVAL IS CONFIRMED (recommended) | **WITHHOLD UNLESS WRITTEN QUOTE APPROVAL IS CONFIRMED** — owner, 2026-09-19: "Sonia Gupta, Founder"; withhold testimonial, attribution and 5-star presentation. No invented Review schema; no anonymization/paraphrase. Implementation not authorized |
| WORK-023 | `/portfolio/google-ads-for-online-courses` | Spelling, label, organic/paid mismatch, unstated period, 2016 provider wording | — | REVIEW — CHANGE REQUIRED (recommended) | **CHANGE REQUIRED** — owner, 2026-09-19: establish client spelling (no guessing); owner facts/evidence for April 2016 work, scope, period and "MappedSkills Marketing" attribution; reconcile organic/paid framing; do not infer the enrollment period; "Online Baking Academy" changed only if shown incorrect/misleading; reconcile/remove "substantial growth", "significantly boosted", ROI implications. "transformed our business" follows WORK-022. Implementation not authorized |
| WORK-024 | `/portfolio/google-ppc-for-real-estate` | Publication of The Fine Living Group case study (permission NO) | — | REVIEW — REMOVE FROM PUBLICATION (recommended); URL treatment as WORK-010/015 | **REMOVE FROM PUBLICATION** — owner, 2026-09-19: The Fine Living Group has NO written publication permission; aligns with PAGE-044 REMOVE and BLOG-044 REMOVE (BLOG-044 must not be repointed here). **URL TREATMENT — DECIDE DURING IMPLEMENTATION; NO IRRELEVANT REDIRECT** (no redirect to `/work`, `/google-ads`, `/services`, `/`, another client's study or an adjacent page). No proof rescue, reuse or anonymization. Implementation not authorized |
| WORK-008 | `/portfolio/google-ads-for-ecommerce` | Utpala Designs | `https://www.utpaladesigns.com/` | REVIEW — SUPERSEDED BY WORK-025 (recommended) | **SUPERSEDED BY WORK-025; NO SEPARATE IMPLEMENTATION** — owner, 2026-09-19 |
| WORK-025 | `/portfolio/google-ads-for-ecommerce` | Publication of Utpala Designs case study (permission NO) | — | REVIEW — REMOVE FROM PUBLICATION (recommended); URL treatment as WORK-010/015/024 | **REMOVE FROM PUBLICATION** — owner, 2026-09-19: Utpala Designs has NO written publication permission; aligns with PAGE-045 REMOVE. **URL TREATMENT — DECIDE DURING IMPLEMENTATION; NO IRRELEVANT REDIRECT** (not to `/work`, `/google-ads`, `/services`, `/`, another case study or an adjacent page). No rehabilitation, anonymization, reuse or correction. Implementation not authorized |
| WORK-026 | Case-study template (all 7) | Five-star graphic in testimonial block | — | CHANGE (template policy): no stars without a genuine rating source; render nothing when withheld | **CHANGE** — owner, 2026-09-19: no automatic five stars; a rating only with a genuine, attributable rating source; when a testimonial is withheld (WORK-013/018/022) leave no stars, empty testimonial framing or implied review proof; no manufactured Review schema; no rating inferred from positive wording. Implementation not authorized |
| WORK-027 | Case-study template (all 7) | No related-service link in template | — | REVIEW — OWNER DECISION: add template related-service link or keep | **ADD RELATED SERVICE LINK** — owner, 2026-09-19: retained studies only — Ameba → `/seo`; Home Decor Brand → `/seo`; AnybodyCanBake → `/google-ads`; simple contextual link using the case study's approved service relationship; no mapping engine, dynamic logic, filler services, unapproved services or new pages; same tab (WORK-005); label decided at implementation. Implementation not authorized |
| PAGE-134 | 404 page (all not-found responses) | PROPOSITION What we do The whole chain from demand to a recorded enquiry, and where the j… | `/services` | KEEP | **KEEP** — owner, 2026-09-20 (`404 PAGE — KEEP-ALL`) |
| PAGE-135 | 404 page (all not-found responses) | METHOD How we work, what we measure, and what we cannot tell you The published method, wr… | `/how-it-works` | KEEP | **KEEP** — owner, 2026-09-20 (`404 PAGE — KEEP-ALL`) |
| PAGE-136 | 404 page (all not-found responses) | DIAGNOSTIC Traffic but no enquiries: which of four things is happening Five checks you ca… | `/problems/traffic-but-no-enquiries` | KEEP | **KEEP** — owner, 2026-09-20 (`404 PAGE — KEEP-ALL`) |
| PAGE-137 | 404 page (all not-found responses) | COST What this costs, and what changes the number The six factors that move it, and which… | `/pricing` | KEEP | **KEEP** — owner, 2026-09-20 (`404 PAGE — KEEP-ALL`) |
| PAGE-138 | 404 page (all not-found responses) | QUESTIONS Questions we get asked, answered plainly Including the ones with answers that l… | `/faq` | KEEP | **KEEP** — owner, 2026-09-20 (`404 PAGE — KEEP-ALL`) |
| PAGE-139 | 404 page (all not-found responses) | THE FIRM Who we are, and what we can actually show you An honest account of where the fir… | `/about` | KEEP | **KEEP** — owner, 2026-09-20 (`404 PAGE — KEEP-ALL`) |
| PAGE-140 | 404 page (all not-found responses) | CAPABILITY Search Being found by buyers already looking. | `/seo` | KEEP | **KEEP** — owner, 2026-09-20 (`404 PAGE — KEEP-ALL`) |
| PAGE-141 | 404 page (all not-found responses) | CAPABILITY AI search What those answers are actually assembled from. | `/ai-seo` | KEEP | **KEEP** — owner, 2026-09-20 (`404 PAGE — KEEP-ALL`) |
| PAGE-142 | 404 page (all not-found responses) | CAPABILITY Google Ads Paid search as a demand source, on the same measurement layer. | `/google-ads` | KEEP | **KEEP** — owner, 2026-09-20 (`404 PAGE — KEEP-ALL`) |
| PAGE-143 | 404 page (all not-found responses) | CAPABILITY Social ads Where the channel fits, and where it does not. | `/social-media-ads` | KEEP | **KEEP** — owner, 2026-09-20 (`404 PAGE — KEEP-ALL`) |
| PAGE-144 | 404 page (all not-found responses) | CAPABILITY Lead generation What counts as a qualified enquiry, published. | `/lead-generation` | KEEP | **KEEP** — owner, 2026-09-20 (`404 PAGE — KEEP-ALL`) |
| PAGE-145 | 404 page (all not-found responses) | CAPABILITY Conversion work Diagnosis first, because two of the four causes are not the pa… | `/conversion-optimization` | KEEP | **KEEP** — owner, 2026-09-20 (`404 PAGE — KEEP-ALL`) |
| SEO-001 | `/work` | (indexability) | `noindex, nofollow`; not in sitemap; 7 indexable children | SEO/INDEXABILITY REVIEW REQUIRED — pending OWNER FACT REQUIRED (conditional, §8) | **CHANGE** — owner, 2026-09-19: `/work` should be indexable and included in the sitemap once the permission/content cleanup is implemented (not implemented) |
| SEO-002 | `/privacy-policy` | (indexability) | `noindex, nofollow`; not in sitemap | **SEO-002 — RECOMMEND KEEP NOINDEX** (recommendation recorded 2026-09-19; owner approval not yet given): the privacy policy remains publicly accessible; footer discovery remains available; it is primarily a legal/informational document rather than an organic-search landing page; sitemap inclusion is therefore not required for the current site architecture | **KEEP NOINDEX** — owner, 2026-09-19: `/privacy-policy` remains publicly accessible, remains linked through the site architecture/footer, remains `noindex`, remains excluded from the sitemap. **CLOSED.** Not implemented (no change needed to current state) |
| SEO-003 | `/terms` | (indexability) | `noindex, nofollow`; not in sitemap | SEO/INDEXABILITY REVIEW REQUIRED | **KEEP NOINDEX** — owner, 2026-09-19: `/terms` remains publicly accessible, remains linked through the site architecture/footer, remains `noindex`, remains excluded from the sitemap. **CLOSED.** Not implemented (no change needed to current state) |
| SEO-004 | `/thank-you` | (indexability) | `noindex, nofollow`; not in sitemap; no incoming links | KEEP noindex (expected) | **KEEP** — owner, 2026-09-19: `/thank-you` remains `noindex` and excluded from the sitemap |
| SEO-005 | All 8 blog articles | (indexability) | no `meta robots` rendered (default indexable); in sitemap | REVIEW | **KEEP CURRENT INDEX/FOLLOW BEHAVIOUR** — owner, 2026-09-19: no explicit robots tag needed for the default; eligible retained articles stay indexable and in the sitemap; article 3 handled by its separate unpublish decision (BLOG-083). **CLOSED** |
| SEO-006 | `404 page under /portfolio/*` | (indexability) | renders `index, follow` (other 404s render `noindex`) | REVIEW | **CHANGE** — owner, 2026-09-20: genuine not-found responses under `/portfolio/*` render `noindex`. Does NOT decide 404 vs 410 vs another removal response for the four removed case studies (URL TREATMENT — DECIDE DURING IMPLEMENTATION; NO IRRELEVANT REDIRECT). Not implemented |
| SEO-007 | `/blog` + 8 articles | (display dates) | all dated July 16, 2026 (`sys.firstPublishedAt`) | REVIEW — OWNER FACT REQUIRED | **OPEN — ORIGINAL PUBLICATION DATES UNKNOWN** — owner, 2026-09-19: Contentful `firstPublishedAt` establishes first publication in the current Contentful account only, not historical publication; 18 Sep timestamps not to be described as substantive updates; no fabricated dates. Later: use evidenced original dates if recovered, otherwise accurately labelled dates or omit them. Not resolved in routing review |

**Status 2026-09-19:** the 8 NAV rows in this register are owner-decided (NAV-039 is held open: VERIFY FIRST); see §0.1. *(Updated 2026-09-20: NAV-039 now has an owner-approved remove-if-unverified fallback, §0.37.)*

**Added during review:** PAGE-033 (2026-09-19, wording vs destination); PAGE-039 – PAGE-045 (2026-09-19, client-permission fact required — `/work` deeper review); SEO-007 (2026-09-19, blog display dates — `/blog` hub review); BLOG-078 – BLOG-081 (2026-09-19, article-level content flags — article 1 review); BLOG-082 (2026-09-19, article 2 review); BLOG-083 – BLOG-085 (2026-09-19, article 3 review); BLOG-086 – BLOG-087 (2026-09-19, article 4 review); BLOG-088 – BLOG-089 (2026-09-19, article 5 review); BLOG-090 – BLOG-092 (2026-09-19, article 6 review); BLOG-093 – BLOG-096 (2026-09-19, article 7 review); BLOG-097 – BLOG-100 (2026-09-19, article 8 review); WORK-010 (2026-09-19, portfolio page 1 review); WORK-011 – WORK-014 (2026-09-19, portfolio page 2 review); WORK-015 (2026-09-19, portfolio page 3 review); WORK-016 – WORK-019 (2026-09-19, portfolio page 4 review); WORK-020 – WORK-023 (2026-09-19, portfolio page 5 review); WORK-024 (2026-09-19, portfolio page 6 review); WORK-025 (2026-09-19, portfolio page 7 review); WORK-026 – WORK-027 (2026-09-19, shared case-study template review).

**Totals (as prepared):** 66 owner decisions (NAV 8 · PAGE 1 · BLOG 47 · WORK 4 · SEO 6). 212 rows are recommended KEEP.

## 10. Final decision-register completeness audit (2026-09-20)

> **Superseded by §11 (re-run after the final owner decisions, 2026-09-20).** §10 is kept as the record of the pre-decision state.

**Scope:** every decision ID in this document (NAV, PAGE, BLOG, WORK, SEO) — **320 IDs**. The authoritative decision for each ID is its §9 register cell where one exists, otherwise its page-table "Owner decision" cell. An ID counts as owner-approved only where that cell names the owner and date (including page-level `KEEP-ALL`). A recommendation is never counted as approval. **Read-only audit: nothing implemented; no website, Contentful, code, `DECISION_LOG.md`, commit, push or deploy.**

### 10.1 Classification of all 320 IDs

| Class | Count | IDs |
|---|---|---|
| A. `OWNER-APPROVED — IMPLEMENT LATER` | 68 | **NAV** (4): NAV-016, NAV-017, NAV-026, NAV-041 · **PAGE** (6): PAGE-033, PAGE-039, PAGE-041, PAGE-044, PAGE-045, PAGE-058 · **BLOG** (49): BLOG-006 – BLOG-008, BLOG-012, BLOG-014, BLOG-015, BLOG-018 – BLOG-022, BLOG-024, BLOG-027, BLOG-038, BLOG-039, BLOG-041 – BLOG-045, BLOG-048 – BLOG-053, BLOG-056, BLOG-059, BLOG-060, BLOG-062 – BLOG-069, BLOG-072 – BLOG-078, BLOG-083, BLOG-093, BLOG-095, BLOG-097, BLOG-098 · **WORK** (8): WORK-005, WORK-007, WORK-010, WORK-015, WORK-024 – WORK-027 · **SEO** (1): SEO-001 |
| B. `OWNER-APPROVED — KEEP / NO IMPLEMENTATION` | 203 | **NAV** (36): NAV-001 – NAV-015, NAV-018 – NAV-025, NAV-027 – NAV-038, NAV-040 · **PAGE** (127): PAGE-001 – PAGE-032, PAGE-034 – PAGE-038, PAGE-040, PAGE-042, PAGE-043, PAGE-046 – PAGE-057, PAGE-059 – PAGE-133 · **BLOG** (31): BLOG-001 – BLOG-005, BLOG-010, BLOG-011, BLOG-013, BLOG-016, BLOG-023, BLOG-025, BLOG-026, BLOG-028 – BLOG-036, BLOG-040, BLOG-046, BLOG-047, BLOG-054, BLOG-055, BLOG-057, BLOG-058, BLOG-061, BLOG-070, BLOG-071 · **WORK** (5): WORK-001 – WORK-004, WORK-006 · **SEO** (4): SEO-002 – SEO-005 |
| C. `SUPERSEDED` | 4 | **BLOG** (2): BLOG-084, BLOG-085 · **WORK** (2): WORK-008, WORK-009 |
| D. `INTENTIONALLY DEFERRED CONTENT/EVIDENCE RECONCILIATION` | 29 | **BLOG** (17): BLOG-017, BLOG-037, BLOG-079 – BLOG-082, BLOG-086 – BLOG-092, BLOG-094, BLOG-096, BLOG-099, BLOG-100 · **WORK** (12): WORK-011 – WORK-014, WORK-016 – WORK-023 |
| E. `OWNER FACT STILL REQUIRED` | 3 | **NAV** (1): NAV-039 · **BLOG** (1): BLOG-009 · **SEO** (1): SEO-007 |
| F. `OWNER DECISION STILL REQUIRED` | 13 | **PAGE** (12): PAGE-134 – PAGE-145 · **SEO** (1): SEO-006 |

Classification notes:
- **BLOG-009** is registered as one ID with three owner sub-decisions. **9A KEEP AUTHOR NAME** is decided, **9C CHANGE AUTHOR ROLE/BIO** is approved for later, and **9B** needs the official LinkedIn URL. It is classed E because of 9B. 9B has an owner fallback: if the URL is still unverified at implementation, remove or hide the link.
- **NAV-039** has a holding disposition: no URL change until the official Facebook URL is confirmed. It is classed E.
- **SEO-007** is OPEN: original publication dates are unknown. The display rule is already decided (`firstPublishedAt` must not be presented as the original date). It is classed E.
- **Class D routing is already decided.**
  - **BLOG-017 and BLOG-037:** the link must not target `/blog`, and no Content Marketing page will be created. The final destination (an approved service page, or no link) is left to content implementation after the article's service positioning is corrected. The owner deliberately deferred it, so it is not undecided routing.
  - **WORK-011/016/020:** the pages are KEEP; the proof awaits `DEC-012`.
  - **WORK-013/018/022:** the testimonials are withheld unless written approval of the quote is confirmed.
- **Class B** includes the rows accepted through page-level `KEEP-ALL`, and PAGE-064/092, where the link is KEEP and the capability wording is flagged separately (§0.11, §0.14).

### 10.2 Remaining PENDING / OPEN / VERIFY / UNKNOWN markers

I searched for PENDING (28), OPEN (63), VERIFY (14), UNKNOWN (27), DECISION REQUIRED (3), OWNER FACT (39), OWNER DECISION (58), TBD (0) and TODO (0). Each occurrence falls into one of these groups:

| Type | Occurrences | Disposition |
|---|---|---|
| **Genuine unresolved owner decision** | §3.21 **PAGE-134 – PAGE-145** (404-page recovery cards; `PENDING`; recommended KEEP; **never presented** for owner review) · §8/§9 **SEO-006** (404 responses under `/portfolio/*` render `index, follow`, while other 404s render `noindex`; `PENDING`) | Listed in §10.7 |
| **Genuine missing owner fact** | NAV-039 (VERIFY FIRST) · BLOG-009B (VERIFY OFFICIAL LINKEDIN URL) · SEO-007 (original dates UNKNOWN) · `AD-SPEND BILLING ARRANGEMENT — OWNER FACT REQUIRED` (§0, `/terms`) · `BOOKING COMPLETION DESTINATION — UNVERIFIED / NO CHANGE APPROVED` (§0.9) · retained case-study engagement facts and quote approvals (WORK-011 – 023) | Listed in §10.7 |
| **Intentionally deferred evidence/content** | `DEC-012` OPEN for Ameba, Home Decor Brand and AnybodyCanBake · BLOG-079/080/082/087 "Kept OPEN — EVIDENCE REQUIRED OR WORDING CHANGE" · `QUALIFICATION CAPABILITY CLAIM`, `GOOGLE ADS / PAID SOCIAL SERVER-SIDE CONVERSION CLAIM`, `QUALIFIED ENQUIRIES BY CAMPAIGN`, `AI SEARCH GROWTH CLAIM`, `AI CONTROL WORDING`, `CRO TESTING DELIVERY`, `CRO ANALYTICS-HISTORY WORDING`, `MULTI-SYSTEM CLIENT MEASUREMENT`, `NON-FORM ENQUIRY REPORTING`, `FREE CHECKER CLAIM`, `SHARED NAV COPY`, privacy/terms drafting notes and qualified legal review items | Not routing; carried to content/evidence/legal reconciliation |
| **Historical record (correct as dated)** | Portfolio-page records that say "Shared template rows … remain PENDING" (§0.30 – §0.35); the SEO-002 note "remained PENDING at this step; closed…"; the article 1 status "remain `PENDING`/OPEN" (§0); the §1 legend definition of `PENDING`; `[DECISION REQUIRED — entry-offer model]` (resolved HYBRID, §0) | Left unchanged: these record the state on their date |
| **Stale wording — reconciled in this pass** | BLOG-020/039 "remain PENDING" (§0) · §4.11 heading "decisions PENDING" · §3.6 "`OWNER FACT REQUIRED`" permission conclusion · §6 original audit recommendations (e.g. BLOG-024 "CHANGE → `/blog/freelancing-in-india`", BLOG-044 "probable destination `/portfolio/google-ppc-for-real-estate`") · §7 thematic index · §9 intro · status line "all later pages PENDING" | Annotated with the owner decision; original text preserved. The recommendation columns of §4 page tables (BLOG-024, BLOG-044 and others) remain original audit text. Their owner-decision cells are authoritative |

### 10.3 Known unresolved facts reconciled

| Item | Register state | Blocks routing? |
|---|---|---|
| NAV-039 official Facebook URL | E — OPEN / VERIFY FIRST; current link unchanged until confirmed | No. The holding disposition is decided. There is no stated fallback if the URL is never verified (optional owner choice, §10.7) |
| BLOG-009B official Amit Gupta LinkedIn URL | E — verify before use; the fallback is to remove or hide the link | No. The fallback makes the disposition complete |
| SEO-007 original blog publication dates | E — OPEN; the display rule is decided | No. This is metadata, not routing |
| Google Ads ad-spend billing arrangement | Owner fact required (§0, `/terms`); no ID | No. This is content/legal |
| Booking completion destination | Unverified; no change approved (§0.9); no ID | No. PAGE-058 sets the booking entry destination. Post-booking behaviour is on Calendly, and no MappedSkills route is approved or required |
| Retained case-study engagement facts/evidence | D — `DEC-012` OPEN (WORK-011 – 014, 016 – 019, 020 – 023) | No. The pages and routes are decided (KEEP) |
| Testimonial approvals (Gagan Deep, Suyog, Sonia Gupta) | D — withheld unless written approval (WORK-013/018/022) | No. The display rule is decided (withhold) |
| **Also found:** qualified legal review of privacy/terms (IP, confidentiality, liability, governing law) | Deferred to qualified legal review | No |
| **Also found:** AnybodyCanBake client spelling, "Online Baking Academy" meaning, 2016 provider | WORK-023 (D) owner facts | No |

### 10.4 Architecture versus later reconciliation

Routing architecture is not blocked by any of the following, which are correctly classified D or carried as §0 flags: `DEC-012` evidence; content wording; capability-claim reconciliation; privacy/terms factual and legal reconciliation; qualification claims; AI Search claims; Google Ads and paid-social conversion wording; CRO delivery validation; article evidence claims (BLOG-079/080/082/087 and others); retained case-study proof.

### 10.5 Routing completeness

| Surface | Approved routing disposition? |
|---|---|
| Global navigation (NAV-001 – 041) | **Yes** — all decided; NAV-039 holds the current URL pending verification |
| Core-page links and CTAs (PAGE-001 – 133) | **Yes** |
| **404 page recovery links (PAGE-134 – 145)** | **No — never presented; PENDING** |
| Blog template links (BLOG-001 – 012) | **Yes** (BLOG-009B has a verify-or-remove fallback) |
| Blog article links, internal and external (BLOG-013 – 077) | **Yes.** BLOG-017/037: `/blog` is excluded as a target and the final approved-service target (or no link) is set during content implementation, by owner decision |
| Portfolio template and body links (WORK-001 – 009, 026, 027) | **Yes** |
| Broken/404 destinations (§6, 21 placements) | **Yes** — every placement has a CHANGE or REMOVE decision |
| 404 response indexability (SEO-006) | **No — PENDING** |

**Unresolved routing items only:** PAGE-134 – PAGE-145 and SEO-006.

### 10.6 Removal architecture consistency

| Removal | Decision | Irrelevant redirect assigned anywhere? |
|---|---|---|
| Article 3 `/blog/freelancing-in-india` | BLOG-083 UNPUBLISH (later) · URL: no automatic redirect to `/blog`, `/services`, `/` or an unrelated article; decide at implementation (§0) · BLOG-024 REMOVE LINK (not repointed) | **None** |
| HealthFirst | PAGE-039, WORK-010, BLOG-066 REMOVE · URL: decide at implementation; no irrelevant redirect | **None** |
| EcoClean | PAGE-041, WORK-015, BLOG-064 REMOVE · same URL rule | **None** |
| The Fine Living Group | PAGE-044, WORK-024 REMOVE · BLOG-044 REMOVE, explicitly not repointed here | **None** |
| Utpala Designs | PAGE-045, WORK-025 REMOVE · WORK-008/009 superseded | **None** |
| Non-existent / unpermissioned case-study links | BLOG-027, 038, 041, 044, 073 – 077 REMOVE — no page creation, no `/work` redirect, no substitute (BLOG-077 not substituted with the AnybodyCanBake Google Ads study) | **None** |
| Unsupported service links | BLOG-018/045 (video), 020/039 (organic social; not to `/social-media-ads`), 021/053 (email), 052 (web design), 060 (marketing automation) REMOVE · BLOG-017/037 not `/blog` · affiliate BLOG-056/059 REMOVE | **None** |

I scanned every authoritative decision for the removed URLs. The only mentions are prohibitions (BLOG-044) and the unpublish decision (BLOG-083). **No removed page is assigned as a CHANGE destination, and no removal is assigned a redirect to `/work`, `/services`, `/`, a service page or another client's case study.** The original audit recommendations for BLOG-024 and BLOG-044 are superseded and annotated in §6.

### 10.7 Owner shortlist

**OWNER DECISIONS STILL REQUIRED**
1. **PAGE-134 – PAGE-145:** the 404 page's 12 recovery cards (`/services`, `/how-it-works`, `/problems/traffic-but-no-enquiries`, `/pricing`, `/faq`, `/about`, `/seo`, `/ai-seo`, `/google-ads`, `/social-media-ads`, `/lead-generation`, `/conversion-optimization`). All are 200 and all are recommended KEEP (can be accepted as `404 KEEP-ALL`).
2. **SEO-006:** 404 responses under `/portfolio/*` render `index, follow`, while other 404s render `noindex`. This matters because four case studies are being removed. **Recommendation (working hypothesis):** CHANGE so that 404 responses render `noindex`, consistent with the site's other 404s. This does not select the removal status for any URL (WORK-010/015/024/025 rule unchanged).
3. *(Optional)* **NAV-039 fallback:** what happens to the footer Facebook link if the official URL cannot be verified before implementation? For example, remove it (as BLOG-009B) or keep it unchanged.

**OWNER FACTS STILL REQUIRED**
1. The official MappedSkills Facebook URL (NAV-039).
2. The official Amit Gupta LinkedIn URL (BLOG-009B), or accept the removal fallback.
3. The original blog publication dates (SEO-007).
4. The Google Ads ad-spend billing arrangement (`/terms`).
5. Booking completion: whether the Calendly event has a post-booking redirect. This needs external verification, and no change is approved.
6. Engagement facts and `DEC-012` evidence for Ameba Software, Home Decor Brand and AnybodyCanBake. For AnybodyCanBake this includes the April 2016 provider, scope, period, client spelling and the meaning of "Online Baking Academy".
7. Written quote approval from Gagan Deep, Suyog and Sonia Gupta.
8. Qualified legal review of the privacy/terms items.

Items 3 – 8 do not block routing.

**DOES ROUTING ARCHITECTURE HAVE ENOUGH OWNER APPROVAL TO FREEZE? — `NO`.**
Exact reason: 13 routing IDs have no owner decision:
- the 404 page's 12 recovery links, PAGE-134 – PAGE-145, which were never presented for review;
- the indexability of 404 responses under `/portfolio/*`, SEO-006.

Every other link, CTA, navigation item, template link and broken destination has an owner-approved disposition. Deferred content, evidence and legal work does not affect where any link goes. **Deciding PAGE-134 – 145 and SEO-006 is sufficient to answer YES.** NAV-039's fallback is optional because its holding disposition is already decided.

## 11. Final routing freeze audit (2026-09-20) — re-run after the final owner decisions (§0.37)

**Checks:**
1. **PAGE-134 – PAGE-145 are no longer PENDING.** They are recorded as **KEEP** (`404 PAGE — KEEP-ALL`) in §3.21 and in §9.
2. **SEO-006 is no longer PENDING.** It is recorded as **CHANGE** (`noindex` on genuine portfolio not-found responses; the removal HTTP treatment is not decided here) in §8 and §9.
3. **NAV-039 has an executable, owner-approved fallback:** verify the official page and use it, or remove the footer link. It no longer blocks the freeze.
4. **Class F (owner decision still required): 0.** No decision cell in the document reads `PENDING`. All 320 IDs have an authoritative decision cell naming the owner and a date.
5. **Every discovered surface has an owner-approved or explicitly approved conditional disposition:**
   - global navigation (NAV-001 – 041);
   - core-page links and CTAs (PAGE-001 – 133);
   - 404 recovery links (PAGE-134 – 145);
   - blog template links (BLOG-001 – 012);
   - blog article links, internal and external (BLOG-013 – 077);
   - broken/404 destinations (§6, 21 placements);
   - portfolio template and body links (WORK-001 – 009, 026, 027);
   - 404 indexability (SEO-006).

   The conditional dispositions are: NAV-039 (verify, else remove), BLOG-009B (verify, else remove or hide), and BLOG-017/037 (never `/blog`; the approved-service target or no link is set during content implementation).

**Reclassified totals (320 IDs):**

| Class | Count |
|---|---|
| A. Owner-approved, implement later | 69 (adds SEO-006) |
| B. Owner-approved, keep / no implementation | 215 (adds PAGE-134 – 145) |
| C. Superseded | 4 |
| D. Deferred content/evidence reconciliation | 29 |
| E. Owner fact still required | 3 (NAV-039, BLOG-009 [9B], SEO-007), each with a safe fallback or unrelated to routing |
| F. Owner decision still required | **0** |

**Unresolved facts — does any one lack a safe routing fallback?** No.

| Fact | Routing fallback / relevance |
|---|---|
| Official Facebook URL (NAV-039) | Approved fallback: remove the link if unverified |
| Official Amit Gupta LinkedIn URL (BLOG-009B) | Approved fallback: remove or hide the link if unverified |
| Original blog publication dates (SEO-007) | Not routing. Display rule decided: `firstPublishedAt` is not to be presented as the original date |
| Google Ads ad-spend billing arrangement | Not routing (terms content) |
| Calendly booking-completion behaviour | Not routing. The entry destination is decided (PAGE-058); no post-booking route is approved or required |
| `DEC-012` evidence and engagement facts for the retained case studies | Not routing. Pages are KEEP; unevidenced figures are removed (WORK-012/017/021) |
| Testimonial approvals (Gagan Deep, Suyog, Sonia Gupta) | Not routing. Withheld unless approved (WORK-013/018/022; WORK-026) |
| Privacy/terms qualified legal review | Not routing |
| Other deferred content, evidence and capability reconciliation (class D; §0 flags) | Not routing |

### 11.1 Programme-level conclusions

**OWNER DECISIONS STILL REQUIRED:** `0 — none for routing architecture.`

**OWNER FACTS STILL REQUIRED:**
1. Official Facebook URL — **fallback approved** (remove if unverified).
2. Official Amit Gupta LinkedIn URL — **fallback approved** (remove or hide if unverified).
3. Original blog publication dates — unrelated to routing.
4. Google Ads ad-spend billing arrangement — unrelated to routing.
5. Calendly booking-completion behaviour — unrelated to routing (needs external verification).
6. `DEC-012` evidence and engagement facts for Ameba Software, Home Decor Brand and AnybodyCanBake — unrelated to routing. Withholding is the approved default.
7. Written quote approvals (Gagan Deep, Suyog, Sonia Gupta) — unrelated to routing. Withholding is the approved default.
8. Privacy/terms qualified legal review — unrelated to routing.

**ROUTING ARCHITECTURE STATUS:** **`FREEZE APPROVED`** — on the basis of this audit.
- The routing/IA decision layer is complete.
- This does **not** authorize implementation.
- It does **not** close content, proof, legal or capability reconciliation.
- It does **not** authorize Contentful edits.
- It does **not** authorize unpublishing case studies or articles.
- It does **not** authorize commit, push or deploy.

The decisions are recorded here only; they are not yet entered in `DECISION_LOG.md`.

### 11.2 Next-phase recommendation (not executed)

**Recommended order:**

1. **Routing implementation, starting with a risk-reduction batch.** First, stop presenting non-permitted or unevidenced proof:
   - remove the four permission-NO case studies from `/work`, the sitemap and internal links (WORK-010/015/024/025, PAGE-039/041/044/045, BLOG-064/066), with no irrelevant redirects;
   - remove the Vibgyor claim and link (BLOG-027/078);
   - on the three retained case studies, withhold the unevidenced figures, testimonials and stars (WORK-012/013, 017/018, 021/022, 026).

   This batch should come before **SEO-001** (making `/work` indexable) and before **BLOG-067/068** add links to the retained case studies. Otherwise the change would make unsupported proof more visible.

   The remaining routing work can follow in the same phase, split into two groups:
   - **code-level:** navigation (NAV-016/017/026/041, NAV-039 verify-or-remove), PAGE-033/058, SEO-006, WORK-027, and the related-service and tab policies;
   - **Contentful link edits:** redirect-chain canonicalisation, broken-link removals, affiliate removals, BLOG-083 unpublish.

   Each group needs its own separate authorization. Contentful and unpublishing are explicitly not authorized yet.
2. **Content, proof and capability reconciliation** (class D and the §0 flags): article repositioning and evidence claims, the retained case-study wording, capability-claim wording, booking terminology and the related-service selections. BLOG-017/037 get their final targets here.
3. **Legal and factual reconciliation, in parallel with step 2:**
   - collect the owner facts (items 1 – 8 above);
   - have a qualified legal reviewer cover privacy and terms;
   - remove the public drafting notes.

   Where facts arrive, they only restore content (links, figures or quotes) through the already-approved rules.
4. **Post-implementation verification:** re-crawl production with the same audit method (desktop and mobile). Compare every link against the §9 register: 0 unintended 404s, no removed URL redirected irrelevantly, correct robots/sitemap state (SEO-001/006), and the tab and `rel` policy applied. Keep the audit CSV as the baseline.

**Should routing implementation begin immediately?** Yes, but only after an implementation authorization, and with the risk-reduction batch first. No unresolved content dependency blocks routing. The one high-risk ordering dependency is that removing and withholding unsupported proof must come before any change that increases its visibility.

## 12. PROPOSED — NOT AUTHORIZED — implementation plan (2026-09-21)

**Status: `PROPOSED — NOT AUTHORIZED`.** Planning pass only. Nothing here is implemented: no application code, Contentful entry, publication state, sitemap, configuration, `DECISION_LOG.md`, commit, push, deploy or stash has been touched. The authority for every item is the frozen register (§9, §0); no approved decision is reinterpreted here. Repository facts below were read from the working tree, and live HTTP behaviour was checked read-only.

### 12.0 Repository facts that shape the plan (VERIFIED FACT, read-only)

1. **`/work`, the sitemap and `/portfolio/[slug]` are all driven by the Contentful Delivery API** — `app/(pages)/work/page.tsx` (`getCaseStudyListCards`), `app/sitemap.ts` (same helper) and `app/(pages)/portfolio/[slug]/page.tsx` (`getCaseStudyDetail` / `getCaseStudyStaticParams`). **Unpublishing a case-study entry in Contentful therefore removes its card, its sitemap entry and its page in one operation** — no code change, no hard-coded slug list anywhere.
2. **The new-tab behaviour is code-owned, not Contentful-owned.** `components/blog/RichTextContent.tsx:111-118` and `components/case-study/CaseStudyContent.tsx:59-66` both set `target="_blank"` for any `href` starting with `http`, so an absolute `https://mappedskills.com/...` link in Contentful opens in a new tab. BLOG-012 and WORK-005 are therefore implemented in **two components**, not in 40 content links.
3. **The case-study hero figure is derived, not authored.** `highlightResult` comes from `firstHighlightFromSections` (`lib/contentful/mappers.ts:170`), which reads the first "Results & Metrics" metric or the first "Before & After" row (`lib/contentful/case-study-sections.ts`). The same value is the `/work` card's result line. Suppressing those two parsed blocks suppresses the hero line and the card line as well.
4. **The five-star graphic is hard-coded** — `app/(pages)/portfolio/[slug]/page.tsx` renders `[...Array(5)]` stars whenever a `review` exists. There is no rating field and no Review schema (WORK-026).
5. **A dynamic not-found under `/portfolio/*` and `/blog/*` currently renders `index, follow` with a self-canonical.** Verified live: `/portfolio/zz-audit-nonexistent` → HTTP 404, rendered `robots: index, follow`, canonical `.../portfolio/zz-audit-nonexistent`; `/blog/zz-audit-nonexistent` → HTTP 404, `index, follow`, canonical `/blog`. The generic 404 (`/zz-audit-nonexistent`) renders `noindex, nofollow`. The cause is the not-found branch of each route's `generateMetadata`, which calls `createMetadata(...)` — and `lib/metadata.ts:23-30` sets `index: true` for every caller. **This is exactly the SEO-006 defect, and the removed case studies and Article 3 will land on that branch.**
6. **Redirects already exist** in `next.config` for `/seo-services`, `/google-ads-service`, `/social-media-advertising`, `/lead-generation-services`, `/content-marketing-services → /blog`, `/results` and `/results/:slug → /portfolio/:slug`. None is changed by the frozen register. *(Observation only, not a proposed change: the legacy `/content-marketing-services → /blog` redirect sends an external legacy URL to `/blog`, which BLOG-017 says must not serve as a Content Marketing service page. It is a config redirect, not one of the reviewed links, so it is out of scope here and is flagged for the owner.)*
7. **`generateStaticParams` + `revalidate = 60`** means an unpublished entry stops resolving after revalidation, and a rebuild removes it from the prerendered set. A deploy should follow the Contentful publication changes; see the verification gate in §12.6.

### 12.1 Manifest — Batch 1: publication / proof risk reduction

| # | Decision IDs | Current state | Approved target state | Surface | Exact file / entry | Dependency | Verification | Rollback |
|---|---|---|---|---|---|---|---|---|
| B1-1 | WORK-010, PAGE-039, WORK-015, PAGE-041, WORK-024, PAGE-044, WORK-025, PAGE-045 | 4 case studies published: `seo-healthfirst`, `local-seo-service-usa`, `google-ppc-for-real-estate`, `google-ads-for-ecommerce`. Each 200, `index, follow`, in sitemap, carded on `/work` | Not published; absent from `/work`, sitemap and the indexable architecture; no longer presented as client proof | **Publication state** (Contentful) | Contentful `caseStudies` entries for those 4 slugs — **unpublish only; do not delete** | Must run together with B1-4 (blog links) so no internal link points at a removed page | `/work` shows 3 cards; `sitemap.xml` has 3 portfolio URLs; each removed URL returns 404 with `noindex` (after B2-6) | Re-publish the entry in Contentful (content untouched) |
| B1-2 | WORK-011/012/013, WORK-016/017/018, WORK-020/021/022, WORK-026 | The 3 retained studies publicly show: derived hero figure, "Results & Metrics" block, "Before & After" table, conclusion outcome text, testimonial and 5 stars | Unsupported quantitative proof, unapproved testimonials and implied 5-star proof withheld; supportable non-quantitative content (client, industry, timeline, problem, challenges, services described) preserved; **nothing replaced with vague performance claims** | **Repository code** (recommended) | `app/(pages)/portfolio/[slug]/page.tsx` (hero `highlightResult`, review block incl. stars), `components/case-study/CaseStudyContent.tsx` (`resultsMetrics`, `beforeAfter`, conclusion render), `lib/contentful/case-studies.ts` (`getCaseStudyListCards` → `result`) | Applies to whatever remains published after B1-1 | Retained pages show no figures, no table, no testimonial, no stars; `/work` cards show no result line; page still renders cleanly | `git revert` of one commit; Contentful content never edited, so `DEC-012`-evidenced proof can be restored later |
| B1-2alt | same | same | same | **Contentful** | Edit the 3 entries' `content` rich text and unlink `review` | — | same | Re-edit / re-link (content history in Contentful) |
| B1-3 | BLOG-078, BLOG-027 | `/blog/content-marketing-services-in-pune` conclusion publishes the Vibgyor High claim ("boost enrollment inquiries by 35% within six months") and links "Read the full case study here" → `/portfolio/content-marketing-for-schools/` (404) | The identifiable Vibgyor client/result claim and that link removed. No page created, no redirect, no other case-study route substituted | **Contentful** | Entry `content-marketing-services-in-pune`, conclusion section | Note: BLOG-025/026 links sit in the same passage and are KEEP; if the removal of the claim sentence also removes them, that is a consequence to report, not a scope extension | The 35% claim and the link are absent; no new 404 introduced | Contentful entry version restore |
| B1-4 | BLOG-064, BLOG-066 | `/blog/seo-company-in-pune` links "local SEO case example" → EcoClean study and "SEO for healthcare" → HealthFirst study | Both links removed; no redirect to `/work`; no substitute case study | **Contentful** | Entry `seo-company-in-pune` | Must ship with B1-1 | Links absent; article has no link to a removed study | Contentful entry version restore |
| B1-5 | BLOG-073 – BLOG-077, BLOG-038, BLOG-041, BLOG-044 | 8 links to non-existent case studies (all already 404) | Removed; no page created, no substitute, no `/work` redirect | **Contentful** | Entries `facebook-advertising-agency-pune`, `7-proven-strategies-...` | Independent, but cheap to ship with B1-4 | Zero internal 404s from these articles | Contentful entry version restore |

**Not in Batch 1 (deliberately):** WORK-014/019/023 wording corrections, the "TechWave Solutions" error and every other class-D item. They need approved content reconciliation.

**URL treatment recommendation for the four removed case studies** (recommendation only — the approved rule is `URL TREATMENT — DECIDE DURING IMPLEMENTATION; NO IRRELEVANT REDIRECT`):

| Option | What it means here | Trade-off |
|---|---|---|
| **404 via unpublishing (recommended)** | Unpublish in Contentful; the route's `notFound()` already returns 404 + the recovery page. No code list of client slugs anywhere | Simplest, fully reversible, no client names in the repository. Google treats a 404 as "maybe temporary" and may re-crawl for a while — acceptable for pages with little external linking |
| 410 Gone | Needs a hard-coded slug list in middleware or a route handler | A slightly faster, clearer permanent signal, but it writes four client slugs into the repository and adds code to maintain and later remove |
| Keep published but `noindex` | Not permitted — the decision is removal from public case-study surfaces | — |
| Redirect | **Excluded by the owner decisions** | — |

Either way, SEO-006 (B2-6) must ship with or before this, so the not-found response is `noindex`.

### 12.2 Manifest — Batch 2: repository / code routing changes

| # | Decision IDs | Current state | Approved target state | Exact file | Dependency | Verification | Rollback |
|---|---|---|---|---|---|---|---|
| B2-1 | NAV-016, NAV-017 | Header Services dropdown lists 5 services; no "AI search"; no "About" in the primary nav | Add "AI Search" → `/ai-seo` to the Services menu; add "About" → `/about` to the header nav (desktop + mobile) | `components/layout/Header.tsx` (services array ~L11-35, nav array ~L38-41) | None | Both links visible and working on desktop and mobile | `git revert` |
| B2-2 | NAV-026, NAV-041 | Footer Company column links `/work` labelled **"Work"**; footer Services column has no AI Search | Label "Case Studies"; add "AI Search" → `/ai-seo` | `components/layout/Footer.tsx` (L200-215 comment + label; services column L139-171) | The existing Session-33 comment explains the old "Work" label and must be replaced, not left contradicting the new label | Footer reads "Case Studies"; AI Search present | `git revert` |
| B2-3 | PAGE-058 | `/schedule-call` uses `NEXT_PUBLIC_CALENDLY_URL` with fallback `https://calendly.com/mappedskills` | Canonical event `https://calendly.com/mappedskills/client-discovery` | `app/(pages)/schedule-call/page.tsx:83` **and** the production `NEXT_PUBLIC_CALENDLY_URL` value (build-time inlined) | Env change is a **configuration/provider** step, not a code-only one | Rendered booking link is the canonical event URL in production | Revert code + env value |
| B2-4 | BLOG-012, WORK-005 | `href.startsWith('http')` → `_blank`, so absolute internal URLs open new tabs | Internal links (including `https://mappedskills.com/...`) same tab; external links new tab with `rel="noopener noreferrer"` | `components/blog/RichTextContent.tsx:111-118`, `components/case-study/CaseStudyContent.tsx:59-66` | Pairs with the Batch 3 canonicalisation but does not depend on it | No internal link renders `target="_blank"`; external links keep new tab + rel | `git revert` |
| B2-5 | BLOG-006 | Share label "Twitter" | Label "X" (share behaviour unchanged) | `components/blog/SocialShare.tsx:69` | None | Label reads "X"; share still opens | `git revert` |
| B2-6 | SEO-006 | Not-found under `/portfolio/*` renders `index, follow` + self-canonical (§12.0 item 5) | Genuine portfolio not-found renders `noindex` | `app/(pages)/portfolio/[slug]/page.tsx:26-32` (not-found metadata branch) | **Must ship with or before Batch 1** | `/portfolio/<missing>` → 404 + `noindex` in the rendered DOM | `git revert` |
| B2-6b | *(same defect on `/blog/*` — **not covered by any frozen decision**)* | `/blog/<missing>` renders `index, follow` | Same treatment as SEO-006 | `app/(pages)/blog/[slug]/page.tsx:44` | **Needs an owner decision** (it is the direct dependency of Article 3's removal — see §12.4) | same | `git revert` |
| B2-7 | WORK-026 | 5 stars hard-coded whenever a review exists | No rating unless a genuine attributable rating source exists; no empty testimonial framing | `app/(pages)/portfolio/[slug]/page.tsx` review block | Same change as B1-2 | No stars anywhere on case studies | `git revert` |
| B2-8 | WORK-027 | Case-study template has no related-service link | Ameba → `/seo`; Home Decor Brand → `/seo`; AnybodyCanBake → `/google-ads`; one contextual internal link, same tab | `app/(pages)/portfolio/[slug]/page.tsx` (+ a 3-entry slug→service map) | **After Batch 1** (it increases case-study visibility) | Each retained study shows exactly one correct service link, same tab | `git revert` |
| B2-9 | BLOG-007, BLOG-008 | `SERVICE_MAP[post.category]` always falls back to Google Ads / SEO / Lead Generation on every article; sidebar always `/google-ads` | Per-article selection from the six approved services; block omitted where none is relevant | `app/(pages)/blog/[slug]/page.tsx:160` (`SERVICE_MAP`), `:337`, `:423`, `:445` (sidebar `relatedServices[0]`) | Mechanism is routing; the **exact selection** was deferred to implementation. Proposed, for confirmation at Gate R2: `seo-company-in-pune` → SEO · `facebook-advertising-agency-pune` → Social Media Ads · `performance-marketing-vs-digital-marketing` → Google Ads, Social Media Ads · `7-proven-strategies-...` → Google Ads, Lead Generation · the three content/email articles → **omit** pending their positioning reconciliation | No article shows an unrelated service; sidebar and cards agree; omission renders cleanly | `git revert` |
| B2-10 | NAV-039 | Footer Facebook → `https://facebook.com/mappedskills` | Verified official URL, **or the link removed** | `components/layout/Footer.tsx:370` | **External verification first** (§12.9). No guessing | Link matches the verified page, or is absent | `git revert` |
| B2-11 | BLOG-009B | `linkedinUrl="https://linkedin.com/in/amit-gupta"` hard-coded | Verified official URL, **or link removed/hidden** | `app/(pages)/blog/[slug]/page.tsx:429` | **External verification first** | Same | `git revert` |
| B2-12 | PAGE-033 | Pricing CTA label "Get an actual number" (`/contact` unchanged) | Label "Get a scoped estimate" | `app/(pages)/pricing/page.tsx:120` (the CTA). L250 is the closing eyebrow label, **not a link** — the decision covers the CTA only | None | CTA reads "Get a scoped estimate", still → `/contact` | `git revert` |

*(SEO-001 is code too, but it is gated separately — see §12.6.)*

### 12.3 Manifest — Batch 3: Contentful routing changes

All are edits to article rich text in the existing Contentful entries. **No entry is created, deleted or unpublished in this batch.**

| Entry (slug) | Decision IDs | Change |
|---|---|---|
| `content-marketing-services-in-pune` | BLOG-014, BLOG-015, BLOG-019, BLOG-022 | Re-point to canonical internal routes: `/blog/importance-of-content-writing`, `/lead-generation`, `/seo`, `/work` (relative paths, no legacy hosts, no redirect hops) |
| " | BLOG-018, BLOG-020, BLOG-021, BLOG-024 | Remove the link only (text may remain): video-editing, social-media-management, email-marketing, freelancing. No page created; no redirect; no substitute |
| " | BLOG-017 | **`TARGET SET DURING APPROVED CONTENT RECONCILIATION — /blog PROHIBITED`.** If no genuinely relevant approved service destination survives, omitting the link remains allowed |
| `7-proven-strategies-of-digital-marketing-for-real-estate-developers` | BLOG-043, BLOG-048 – BLOG-051 | Canonicalise to `/blog/importance-of-content-writing`, `/google-ads`, `/social-media-ads`, `/lead-generation`, `/seo` |
| " | BLOG-039, BLOG-045, BLOG-052, BLOG-053, BLOG-060 | Remove non-approved service links (organic social, video, web design, email, marketing automation) |
| " | BLOG-056, BLOG-059 | Remove both affiliate links (`pickyassist.com/en?fpr=3offa`); educational mention of CRM tools may remain |
| " | BLOG-042 | `http://Realtor.com` → `https://www.realtor.com/` |
| " | BLOG-037 | **`TARGET SET DURING APPROVED CONTENT RECONCILIATION — /blog PROHIBITED`** |
| `seo-company-in-pune` | BLOG-063, BLOG-065 | Canonicalise to `/seo`, `/lead-generation` |
| " | BLOG-067, BLOG-068 | Re-point to `/portfolio/seo-ameba-software` and `/portfolio/seo-for-home-decor-brand` — **after Batch 1**, so they point at studies whose unsupported proof is already withheld |
| " | BLOG-062, BLOG-069 | Direct Calendly → `/schedule-call` |
| " | BLOG-095 *(approved, co-located)* | The same sentences carry "Growth Diagnosis (20-min)… Free" — replace with the canonical Client Discovery Call — 30 minutes positioning |
| " | BLOG-093 *(approved, co-located)* | Remove the public editorial note |
| `facebook-advertising-agency-pune` | BLOG-072 | Canonicalise to `/social-media-ads` |
| " | BLOG-098, BLOG-097 *(approved, co-located)* | Canonical booking positioning; remove the public editorial note |

Ordering inside Batch 3 does not matter, except that BLOG-067/068 follow Batch 1. Verification: every changed link resolves 200 in one hop, opens in the same tab, and no removed link remains. Rollback: Contentful entry version restore, per entry.

### 12.4 Manifest — Batch 4: Article 3 (`/blog/freelancing-in-india`)

| Question | Finding (VERIFIED against the audit inventory and repository) |
|---|---|
| Incoming internal links after the approved removals | **None.** The only link into it was BLOG-024, which is already approved for removal in Batch 3. Articles 4 and 5 were confirmed to contain no link to it. The `/blog` hub card is Contentful-generated and disappears with the entry (BLOG-002) |
| Sitemap consequence | The URL leaves `sitemap.xml` automatically — `app/sitemap.ts` builds blog URLs from `getBlogListPosts()` |
| Canonical / index consequence | While published it is indexable with a self-canonical (SEO-005). After unpublishing, the URL hits the blog not-found branch, which today renders **`index, follow`** on a 404 (§12.0 item 5). **This is the one genuine blocker for Batch 4** — see B2-6b |
| Remaining dependencies | None internal. External inbound links are **UNKNOWN**; no backlink data exists in the repository, and none is assumed |
| Recommended post-unpublish HTTP behaviour | **404 + `noindex`**, i.e. the natural unpublished behaviour once B2-6b is applied. 410 would need a hard-coded slug and is not warranted for one article |
| Is any redirect justified? | **No.** No article covers the same subject, the site does not serve that audience (the BLOG-083 reasoning), and BLOG-024 is being removed, so it cannot justify preserving the URL. No replacement URL is to be invented |

Operation: unpublish the Contentful entry `freelancing-in-india` (do not delete). Rollback: re-publish.

### 12.5 Order of execution

**Batch 1 → Batch 2 → Batch 3 → Batch 4 → SEO-001.** Two exceptions that the repository evidence makes necessary:
- **B2-6 (SEO-006) must ship with or before Batch 1**, otherwise the four removed URLs return a 404 that invites indexing.
- **B2-8 (WORK-027) and the Batch 3 items BLOG-067/068 must follow Batch 1**, because both increase case-study visibility.

Batches 2 and 3 are otherwise independent and can be authorized together (see §12.10).

### 12.6 SEO-001 ordering and gate

`/work` becomes indexable (remove `robots: 'noindex, nofollow'` from `app/(pages)/work/page.tsx:58`) and is added to `indexablePaths` in `app/sitemap.ts` **only after** this gate passes:

1. The four unpermissioned studies are absent from `/work`, from `sitemap.xml` and from `/portfolio/*` (each returns 404 + `noindex`).
2. The three retained studies publicly show **no** unsupported figures, **no** testimonial, **no** stars, and no vague replacement claims.
3. No internal link anywhere points at a removed case study.
4. `/work`'s own copy does not contradict the new state (the claims A/B wording recorded as stale during the `/work` review). Wording belongs to content reconciliation, so this is a **check, not a licence to rewrite**: if it still contradicts, SEO-001 waits.
5. The verification pass in §12.8 has run and is clean.

### 12.7 Exclusions — content/proof work that must NOT leak into routing implementation

None of the following may be implemented, rewritten or "tidied" during the batches above: qualification capability claims (§0.11) · AI Search evidence and wording · Google Ads conversion/qualification claims (§0.14) · paid-social capability wording (BLOG-099) · CRO delivery validation and analytics-history wording · problem-page claims · substantive privacy/terms reconciliation and the exposed drafting notes' legal content · blog evidence claims (BLOG-079/080/082/087/088/090/091/092/094/096/100) · case-study `DEC-012` restoration and WORK-014/019/023 wording · unsupported testimonials (restoration needs written approval) · original publication dates (SEO-007) · the Google Ads ad-spend billing arrangement · BLOG-086/089 repositioning · BLOG-009C author role/bio.

Where a routing edit necessarily touches nearby copy (for example removing a link inside a sentence), make the **minimum routing-only edit** and record any consequential copy effect for the content phase rather than rewriting it.

### 12.8 Verification plan (one pass, same method as the original audit)

Re-run the audit crawl (desktop + mobile, rendered DOM, both same-origin and external links) and diff against `LINK_INVENTORY_2026-09-19.csv`. Pass criteria:

1. Every intended internal destination resolves **200 in one hop**; approved canonical targets confirmed.
2. **Zero unintended internal 404s.**
3. Every approved removed link is absent (affiliate, non-approved service, non-existent case study, BLOG-024, BLOG-027).
4. **No new redirect** to `/work`, `/services`, a service page, `/` or another client's case study.
5. Redirect chains gone where approved (no `/seo-services`, `/google-ads-service`, `/social-media-advertising`, `/lead-generation-services`, trailing-slash hops in content links).
6. No internal link renders `target="_blank"`; external links open in a new tab with `rel="noopener noreferrer"`.
7. Header and footer match the approved architecture (AI Search ×2, About, "Case Studies" label).
8. `/work` lists exactly the three retained studies.
9. The four removed studies are invisible: no card, no sitemap entry, 404 + `noindex` at each URL, no internal link.
10. Retained studies show no figures, no before/after table, no testimonial, no stars; the `/work` cards show no result line.
11. `sitemap.xml` matches the indexable set exactly (and includes `/work` only after SEO-001).
12. `robots`/meta index state correct per route, including the `noindex` routes that must stay `noindex` (`/thank-you`, `/privacy-policy`, `/terms`).
13. SEO-006: `/portfolio/<missing>` → 404 + `noindex` (and `/blog/<missing>` if B2-6b is authorized).
14. `/blog/freelancing-in-india` → 404 + `noindex`, absent from `/blog` and the sitemap, with no redirect.
15. Canonicals are self-referential and absolute on every live page.
16. The booking link is the canonical Calendly event, and `/schedule-call` still fires `meeting_started`.
17. Facebook and LinkedIn: the verified URL, or the link absent — whichever the fallback produced.
18. Responsive navigation still works at mobile width (menu opens, all links reachable), and the skip link still targets `#main`.

**Before any deployment** (run locally, all must pass): `npm run lint` · `npx tsc --noEmit` · `npm run build` · the project's test command if one is defined in `package.json`. Then deploy by the recorded release process — **deployment is not authorized by this plan**.

### 12.9 Change boundaries

**Repository files expected to change**
- `app/(pages)/portfolio/[slug]/page.tsx` — proof suppression, stars, related-service link, SEO-006 metadata
- `app/(pages)/blog/[slug]/page.tsx` — `SERVICE_MAP` and sidebar, LinkedIn URL, blog not-found metadata (if B2-6b is authorized)
- `components/case-study/CaseStudyContent.tsx` — results/before-after/conclusion suppression, internal-link tab policy
- `components/blog/RichTextContent.tsx` — internal-link tab policy
- `components/layout/Header.tsx`, `components/layout/Footer.tsx` — navigation, label, Facebook link
- `components/blog/SocialShare.tsx` — "X" label
- `app/(pages)/schedule-call/page.tsx` — canonical Calendly fallback
- `app/(pages)/pricing/page.tsx` — CTA label
- `lib/contentful/case-studies.ts` — `/work` card result line (if suppression is done in the data layer)
- `app/(pages)/work/page.tsx`, `app/sitemap.ts` — **SEO-001 only, at its own gate**

**Contentful entries expected to change** (rich text edits): `content-marketing-services-in-pune` · `7-proven-strategies-of-digital-marketing-for-real-estate-developers` · `seo-company-in-pune` · `facebook-advertising-agency-pune`. *(Entry IDs are not exposed publicly and Contentful was never queried; the slugs are the identifiers.)*

**Publication-state operations (higher risk, listed separately)**
1. Unpublish case study `seo-healthfirst`
2. Unpublish case study `local-seo-service-usa`
3. Unpublish case study `google-ppc-for-real-estate`
4. Unpublish case study `google-ads-for-ecommerce`
5. Unpublish blog post `freelancing-in-india`

None is a deletion. Each is reversible by re-publishing.

**External / provider verification**
- The official MappedSkills Facebook page URL (NAV-039)
- The official Amit Gupta LinkedIn URL (BLOG-009B)
- The production `NEXT_PUBLIC_CALENDLY_URL` value (PAGE-058), and confirmation that the canonical event is live
- *(Optional, unrelated to routing)* whether the Calendly event has a post-booking redirect (§0.9)

### 12.10 Owner authorization gates (minimum)

| Gate | Covers | Why it is its own gate |
|---|---|---|
| **GATE R1 — AUTHORIZE BATCH 1 (+ SEO-006)** | Unpublish the 4 unpermissioned case studies; withhold retained proof, testimonials and stars; remove the Vibgyor claim and link; remove blog links to removed/non-existent studies; SEO-006 | Publication-state changes and public proof — the highest-risk, most time-sensitive step |
| **GATE R2 — AUTHORIZE BATCHES 2 + 3** | All remaining code routing changes and all Contentful link changes, including the BLOG-007/008 per-article selection and the NAV-039 / BLOG-009B verify-or-remove outcomes | Ordinary routing work. Two batches, one gate: they are independent of each other and both are fully specified. *(If you prefer to separate Contentful, split it into R2a code / R2b Contentful.)* |
| **GATE R3 — AUTHORIZE ARTICLE 3 REMOVAL** | Unpublish `freelancing-in-india` | A second publication-state change, dependent on the blog not-found `noindex` question |
| **GATE R4 — AUTHORIZE SEO-001 AFTER VERIFICATION** | `/work` indexable + in sitemap | Must follow the §12.6 gate and a clean verification pass |

Deployment authorization is assumed to be part of whichever gate ships the change; no separate deploy gate is proposed. **One owner decision is still open and is a prerequisite for GATE R3:** whether the blog not-found response should render `noindex` in the same way as SEO-006 (B2-6b). It is outside the frozen register, so it is not assumed.

## 13. GATE R1 — AUTHORIZED (2026-09-21): decisions, execution and evidence

### 13.1 Owner decisions recorded with this gate

**`DYNAMIC NOT-FOUND SEO — CHANGE TO NOINDEX` (SEO-006 extension).** Genuine not-found responses under **both** `/portfolio/*` and `/blog/*` render `noindex`. A genuine not-found must not invite indexing merely because it passed through a dynamic route's metadata branch. Valid published portfolio and blog pages are **not** changed to `noindex`. This does not choose the final removal status of any specific URL. Recorded as an **implementation-time technical extension of the same SEO-006 defect, not a reopening of routing architecture**. It clears the technical prerequisite for Article 3, which **remains NOT AUTHORIZED** under R3.

**Removed case-study URL treatment — `UNPUBLISH → GENUINE 404 + NOINDEX`.** Approved for HealthFirst Clinics, EcoClean Pros, The Fine Living Group and Utpala Designs. No 410 middleware; no former client slugs hard-coded to generate 410s; no redirect to `/work`, service pages, `/` or other case studies.

**Retained case-study proof suppression — approved subject to safe scoping.** Code/template suppression for Ameba Software, Home Decor Brand and AnybodyCanBake only; it must not reach unrelated portfolio entries, future case studies or other content types; smallest explicit reversible mechanism; no hard-coded replacement claims; the underlying Contentful material preserved for later `DEC-012` reconciliation.

**R1 change boundary.** R1 covers only: the dynamic blog/portfolio not-found `noindex` correction; unpublishing the four permission-NO case studies; the R1-required removal of their internal links; the approved retained-study proof suppression; and the approved Vibgyor claim/link removal. It does **not** authorize Article 3, SEO-001, navigation, Calendly, related-service links, general tab policy, BLOG-067/068, BLOG-007/008 mappings, broader Contentful cleanup, content/capability reconciliation, privacy/terms changes or `DEC-012` proof restoration.

### 13.2 What was executed (repository only — uncommitted working tree)

| Item | Decisions | Change | File |
|---|---|---|---|
| R1-a | SEO-006 | Portfolio not-found metadata no longer routes through `createMetadata` (which sets `index: true` for every caller). It returns `robots: 'noindex, nofollow'` and **asserts no canonical** | `app/(pages)/portfolio/[slug]/page.tsx` (not-found branch of `generateMetadata`) |
| R1-b | SEO-006 extension | Same correction for the blog not-found branch. The now-unused `createMetadata` import was dropped; published posts' metadata is unchanged (they build their own object and remain indexable, SEO-005) | `app/(pages)/blog/[slug]/page.tsx` |
| R1-c | WORK-011/012/013, 016/017/018, 020/021/022, 026 | **Explicit three-slug withholding list**, with the reasoning and the removal instructions in the file | `lib/case-study-proof.ts` (new, 48 lines) |
| R1-d | as above | Derived headline figure and the whole testimonial block (quote, attribution and the hard-coded five stars) are not rendered for a listed case study | `app/(pages)/portfolio/[slug]/page.tsx` |
| R1-e | as above | New `withholdProof` prop (default `false`) suppresses "Results & Metrics", "Before & After Comparisons" and the "Conclusion" (which restates the same figures and outcome claims in prose) | `components/case-study/CaseStudyContent.tsx` |
| R1-f | as above | `/work` card result line suppressed for listed slugs, so the derived figure cannot leak into the listing | `lib/contentful/case-studies.ts` (`getCaseStudyListCards`) |

**Scoping (the owner's condition).** The mechanism is a named `ReadonlySet` of three normalised slugs. A case study that is not named renders exactly as before, including any future one; `withholdProof` defaults to `false`; no other content type reads the module. No special-case code beyond one predicate and three boolean guards, so the "stop and report instead" condition was not reached. Nothing is substituted for the withheld blocks — no replacement wording of any kind.

### 13.3 What could NOT be executed, and why

**No Contentful credentials exist in this environment.** There is no `.env`, `.env.local` or `.env.production` in the working tree (only `.env.example`, whose Contentful keys are blank), and no Contentful token in the environment. A Management API token would be needed in any case, and none is present. The following authorized R1 operations therefore **remain outstanding and require the owner to act in Contentful**:

| Outstanding R1 operation | Decisions | Exact target |
|---|---|---|
| Unpublish 4 case studies (do not delete) | WORK-010/015/024/025, PAGE-039/041/044/045 | entries with slugs `seo-healthfirst`, `local-seo-service-usa`, `google-ppc-for-real-estate`, `google-ads-for-ecommerce` |
| Remove the Vibgyor public claim and its link | BLOG-078, BLOG-027 | entry `content-marketing-services-in-pune`, conclusion section: the sentence carrying "boost enrollment inquiries by 35% within six months" and the "Read the full case study here" link |
| Remove links to removed studies | BLOG-064, BLOG-066 | entry `seo-company-in-pune` |
| Remove links to non-existent case studies | BLOG-038, BLOG-041, BLOG-044, BLOG-073 – BLOG-077 | entries `7-proven-strategies-of-digital-marketing-for-real-estate-developers`, `facebook-advertising-agency-pune` |

**Ordering consequence:** the unpublishing and those link removals must ship together, and the code in §13.2 must be deployed with or before them, so that no removed URL returns an indexable 404 and no article links to a removed page. **Deployment is not authorized by R1** and has not been performed.

### 13.4 Verification performed (local, read-only)

| Check | Method | Result |
|---|---|---|
| Typecheck | `npm run typecheck` | **Pass**, no errors |
| Lint | `npm run lint` | **No finding in any changed file.** 21 pre-existing errors and 8 warnings remain elsewhere (`lib/meta-pixel.tsx`, `hooks/use-toast.ts`, `lib/og-image.ts`, …), none touched by R1 |
| Build | `npm run build` | **Pass.** All routes compiled; `/portfolio/[slug]` and `/blog/[slug]` still prerender via `generateStaticParams` |
| Portfolio not-found | Dev server + real browser, rendered DOM | `/portfolio/zz-check` → **HTTP 404**, `robots: noindex, nofollow`, **no canonical**. Before the change, production rendered `index, follow` with a self-canonical |
| Blog not-found | same | `/blog/zz-check` → **HTTP 404**, `robots: noindex, nofollow`, **no canonical** (was `index, follow`, canonical `/blog`) |
| Generic 404 | same | `/zz-check` → 404, `noindex, nofollow` — unchanged |
| Valid pages still indexable | same | `/blog` → 200, `index, follow`, canonical `/blog`. `/work` → 200, still `noindex` (SEO-001 not authorized, correctly untouched) |
| Proof suppression | The real `CaseStudyContent` component rendered through `react-dom/server` against a fixture mirroring the live Ameba structure (metrics block, before/after table, conclusion), scratchpad harness, not added to the repository | `withholdProof=false` → 2,852 chars containing "200%", "30,000 visits", the before/after table and the conclusion. `withholdProof=true` → 365 chars: **no figures, no table, no conclusion**, Problem Statement still rendered |
| Derived hero figure | `firstHighlightFromSections` on the same fixture | Returns "Monthly Organic Traffic: 30,000 visits" — confirming the headline is derived from the withheld table, which is why it is suppressed with it |
| Scoping | `isCaseStudyProofWithheld` over 11 inputs | `true` only for the three named slugs (and their `portfolio/`-prefixed forms). `false` for the four removed studies, an unknown future slug, an empty slug and a near-miss (`seo-ameba-software-2`) |
| Responsive | Suppressed blocks are whole `<Section>` elements already rendered conditionally by the existing code path | No layout regression is possible from an omitted section; confirmed no orphaned headings in the rendered output above |

**Not verifiable locally, and honestly stated:** end-to-end rendering of the three retained case studies and the `/work` cards against **real Contentful content** could not be checked, because this environment has no Contentful credentials, so the local build contains no case studies at all. That check belongs to the post-deployment pass in §12.8 (retained studies: HTTP 200, canonical intact, no figures, no testimonial, no stars, ordinary content intact, `/work` cards clean), and deployment is not authorized. Every claim above is from a command actually run.

**Pre-existing, not introduced by R1:** the dev server logs a React hydration warning on `/` (`data-rsv-hero` attribute on `<html>`). It is on the homepage, which R1 does not touch.

### 13.5 R1 status

`R1 CODE CHANGES COMPLETE — LOCALLY VERIFIED — UNCOMMITTED` · `R1 CONTENTFUL AND PUBLICATION OPERATIONS OUTSTANDING (no credentials in this environment)` · nothing committed, pushed or deployed; neither UI stash touched; `DECISION_LOG.md` not updated.

## 14. R2 PREVIEW — NOT AUTHORIZED — service mapping and exact manifest (2026-09-21)

Prepared so R2 can be authorized in one pass. **Nothing here is implemented.**

### 14.1 BLOG-007 / BLOG-008 — proposed per-article related-service mapping

Approved services only: `/seo` · `/ai-seo` · `/google-ads` · `/social-media-ads` · `/conversion-optimization` · `/lead-generation`. The owner decision is per-article selection of **genuinely related** approved services, with the block **omitted** where none is. Today every article shows the same three cards (Google Ads / SEO / Lead Generation) and the sidebar always shows Google Ads, because no Contentful category matches the map.

| Article | Proposed related approved service(s) | Rationale |
|---|---|---|
| `/blog/seo-company-in-pune` | **`/seo`** | The article is about choosing and judging an SEO supplier. SEO is the approved service it is actually about. `/ai-seo` is deliberately not added: the article makes no AI-search argument, and pairing it here would read as an upsell rather than a related service |
| `/blog/facebook-advertising-agency-pune` | **`/social-media-ads`** | Paid social is the approved service the article is about. Nothing else is genuinely related; the article's retargeting/pixel passages are under BLOG-099 and must not be reinforced with extra service links |
| `/blog/performance-marketing-vs-digital-marketing` | **`/google-ads`, `/social-media-ads`** | The article explains paid performance channels. These are the two approved paid channels MappedSkills actually runs. Sidebar: `/google-ads` |
| `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | **`/lead-generation`, `/google-ads`, `/seo`** | Its stated subject is generating enquiries for developers, across paid search and organic. Sidebar: `/lead-generation`, which is the article's actual goal. Paid social is excluded: the article's social passages are the ones BLOG-092 flags |
| `/blog/content-marketing-services-in-pune` | **OMIT** | Its subject is content marketing, which is not an approved standalone service, and its positioning is being reconciled under BLOG-017 / BLOG-081. Any service card here would pre-empt that decision |
| `/blog/building-an-email-list` | **OMIT** | Email marketing is not an approved service. `/lead-generation` would imply MappedSkills delivers list building, which is not established |
| `/blog/importance-of-content-writing` | **OMIT** | Content writing is not an approved service and the article is being repositioned under BLOG-086 |
| *(`/blog/freelancing-in-india`)* | n/a | Approved for unpublishing under R3 |

**Not implemented.** If the owner prefers, the block can ship omitted everywhere and be populated article by article during content reconciliation.

### 14.2 Exact R2 manifest — repository

| # | Decisions | Change | File (line at time of writing) |
|---|---|---|---|
| R2-1 | NAV-016 | Add "AI Search" → `/ai-seo` to the header Services list | `components/layout/Header.tsx` — services array, L10-36 |
| R2-2 | NAV-017 | Add "About" → `/about` to the header nav (renders in desktop nav and mobile menu from one array) | `components/layout/Header.tsx` — nav array, L38-41 |
| R2-3 | NAV-026 | Footer Company link label "Work" → "Case Studies", and replace the Session-33 comment that justifies the old label | `components/layout/Footer.tsx` L200-215 |
| R2-4 | NAV-041 | Add "AI Search" → `/ai-seo` to the footer Services column | `components/layout/Footer.tsx` L139-171 |
| R2-5 | NAV-039 | Facebook link: verified official URL, **or remove the link** under the approved fallback | `components/layout/Footer.tsx` L370 |
| R2-6 | BLOG-009B | `linkedinUrl`: verified official URL, **or remove/hide** | `app/(pages)/blog/[slug]/page.tsx` L429 (`<AuthorBio …>`) |
| R2-7 | PAGE-058 | Canonical Calendly event as the fallback: `https://calendly.com/mappedskills/client-discovery` | `app/(pages)/schedule-call/page.tsx` L83 — **plus** the production `NEXT_PUBLIC_CALENDLY_URL` (build-time inlined; provider/config step) |
| R2-8 | BLOG-012, WORK-005 | Internal-link tab policy: treat `https://mappedskills.com/...` (and `www.`) as internal → same tab, no `target`/`rel`; genuine externals keep `_blank` + `noopener noreferrer` | `components/blog/RichTextContent.tsx` L111-118; `components/case-study/CaseStudyContent.tsx` L59-71 |
| R2-9 | BLOG-006 | Share label "Twitter" → "X" (destination unchanged; it redirects) | `components/blog/SocialShare.tsx` L69 |
| R2-10 | BLOG-007, BLOG-008 | Replace the category `SERVICE_MAP` fallback with a per-article (per-slug) selection; render nothing when an article has none; sidebar uses the first selected service and renders nothing when empty | `app/(pages)/blog/[slug]/page.tsx` L160 (map), L337 (lookup), L423 (cards), L445 (sidebar) |
| R2-11 | WORK-027 | One contextual related-service link on retained case studies: `seo-ameba-software` → `/seo`, `seo-for-home-decor-brand` → `/seo`, `google-ads-for-online-courses` → `/google-ads`; same tab; no mapping engine, no dynamic recommendation, no filler services | `app/(pages)/portfolio/[slug]/page.tsx` + a 3-entry slug→service constant (can live beside `lib/case-study-proof.ts`) |
| R2-12 | PAGE-033 | Pricing CTA label "Get an actual number" → "Get a scoped estimate" (destination `/contact` unchanged) | `app/(pages)/pricing/page.tsx` L120. **L250 is the closing eyebrow label, not a link — out of scope** |

### 14.3 Exact R2 manifest — Contentful

| Entry (slug) | Decisions | Exact change |
|---|---|---|
| `content-marketing-services-in-pune` | BLOG-014, BLOG-015, BLOG-019, BLOG-022 | Re-point to `/blog/importance-of-content-writing`, `/lead-generation`, `/seo`, `/work` — relative paths, no legacy hosts, no redirect hops |
| " | BLOG-018, BLOG-020, BLOG-021, BLOG-024 | Remove the link only (surrounding text may stay): video editing, social-media management, email marketing, freelancing |
| " | BLOG-017 | `TARGET SET DURING APPROVED CONTENT RECONCILIATION — /blog PROHIBITED`; omission remains allowed |
| `7-proven-strategies-of-digital-marketing-for-real-estate-developers` | BLOG-043, BLOG-048 – BLOG-051 | Re-point to `/blog/importance-of-content-writing`, `/google-ads`, `/social-media-ads`, `/lead-generation`, `/seo` |
| " | BLOG-039, BLOG-045, BLOG-052, BLOG-053, BLOG-060 | Remove the non-approved service links (organic social, video, web design, email, marketing automation) |
| " | BLOG-056, BLOG-059 | Remove both affiliate links (`pickyassist.com/en?fpr=3offa`); educational mention of CRM tools may remain |
| " | BLOG-042 | `http://Realtor.com` → `https://www.realtor.com/` |
| " | BLOG-037 | `TARGET SET DURING APPROVED CONTENT RECONCILIATION — /blog PROHIBITED` |
| `seo-company-in-pune` | BLOG-063, BLOG-065 | Re-point to `/seo`, `/lead-generation` |
| " | BLOG-067, BLOG-068 | Re-point to `/portfolio/seo-ameba-software` and `/portfolio/seo-for-home-decor-brand` — **only after R1 is deployed**, so they point at studies whose unsupported proof is already withheld |
| " | BLOG-062, BLOG-069 | Direct Calendly → `/schedule-call` |
| " | BLOG-095, BLOG-093 *(approved, same sentences)* | Canonical Client Discovery Call — 30 minutes positioning (no "Growth Diagnosis", no "20-min", no "Free"); remove the public editorial note |
| `facebook-advertising-agency-pune` | BLOG-072 | Re-point to `/social-media-ads` |
| " | BLOG-098, BLOG-097 *(approved, same sentences)* | Canonical booking positioning; remove the public editorial note |

Excluded from R2 and unchanged: everything in §12.7, plus Article 3 (R3) and SEO-001 (R4).

### 14.4 R2 verification (delta on §12.8)

Re-crawl and confirm: the four navigation changes render on desktop and mobile; every re-pointed link resolves 200 in one hop; removed links absent; no internal link renders `target="_blank"` while externals keep `rel="noopener noreferrer"`; each article shows only its mapped services (or none); each retained case study shows exactly one related-service link, same tab; the booking link is the canonical event; Facebook and LinkedIn match the verified outcome; `npm run typecheck`, `npm run lint` (no new findings) and `npm run build` pass before any deployment.

## 15. R1 acceptance, R2 mapping approval, and the manual Contentful checklist (2026-09-21)

### 15.1 Owner acceptance (recorded)

- **R1 repository portion ACCEPTED as correct so far**, including the new-tab-free not-found metadata, the three-slug withholding module, the testimonial/star withholding and the `/work` card suppression (§13.2).
- **Conclusion suppression ACCEPTED** for the three retained case studies, where the Conclusion republishes unsupported quantitative proof in prose.
- **R1 status: `PARTIAL — REPOSITORY COMPLETE; CONTENTFUL OPERATIONS OUTSTANDING`.** The outstanding operations are performed manually by the owner in the Contentful web UI (§15.3). Claude does not edit Contentful, does not unpublish anything, and **must not be given a Contentful Management API token** — no credential is to be pasted into chat or placed in repository files, `.env`, scripts, source code or governance documents.
- **BLOG-007 / BLOG-008 per-article service mapping: OWNER-APPROVED** (§15.2). This settles the mapping decision only; **R2 implementation is not authorized.**
- Not authorized and not started: R2, R3 (Article 3), R4 (SEO-001), commit, push, deploy.

### 15.2 BLOG-007 / BLOG-008 — owner-approved mapping (for later R2)

| Article | Approved related service(s) | Sidebar |
|---|---|---|
| `/blog/seo-company-in-pune` | `/seo` | `/seo` |
| `/blog/facebook-advertising-agency-pune` | `/social-media-ads` | `/social-media-ads` |
| `/blog/performance-marketing-vs-digital-marketing` | `/google-ads`, `/social-media-ads` | `/google-ads` |
| `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` | `/lead-generation`, `/google-ads`, `/seo` | `/lead-generation` |
| `/blog/content-marketing-services-in-pune` | **omit the related-services block** | — |
| `/blog/building-an-email-list` | **omit the related-services block** | — |
| `/blog/importance-of-content-writing` | **omit the related-services block** | — |

`OWNER-APPROVED — IMPLEMENTATION NOT AUTHORIZED (R2).`

### 15.3 Manual Contentful checklist — R1 only

Scope: 4 unpublish operations and 11 link/claim removals in 4 blog entries. **Nothing in R2, R3 or R4 appears here.** No surrounding content is to be rewritten. The full checklist as issued to the owner is reproduced in the session report; the operations are itemised in §13.3 with their decision IDs.

**Status when this section was written: NOT PERFORMED.** Claude has not carried out, and cannot confirm, any Contentful operation. Verification happens only after the owner reports completion.

## 16. R1 verification pass (2026-09-21, read-only)

Run after the owner reported completing the manual Contentful operations. **Owner clarification recorded:** Vibgyor **B3 — REMOVE THE ENTIRE PARAGRAPH**; the consequent disappearance of BLOG-025 (external "Vibgyor High" link) and BLOG-026 ("MappedSkills Marketing" link) is accepted, and those links are **not** to be recreated elsewhere.

### 16.1 CONTENTFUL R1 STATE — `FAIL` (no change visible on the public delivery path)

Every R1 Contentful operation is **still absent from production**. Checked live, rendered DOM, 2026-09-21 ~04:00–04:05 UTC:

| Operation | Expected after R1 | Observed |
|---|---|---|
| Unpublish `seo-healthfirst` | Absent from `/work`, sitemap; URL not resolving | `/work` card present · `sitemap.xml` entry present · URL **HTTP 200**, `index, follow`, full case study rendered |
| Unpublish `local-seo-service-usa` | as above | Card present · in sitemap · **200** |
| Unpublish `google-ppc-for-real-estate` | as above | Card present · in sitemap · **200** |
| Unpublish `google-ads-for-ecommerce` | as above | Card present · in sitemap · **200** |
| `/work` contents | 3 cards | **7 cards** |
| `sitemap.xml` | 27 URLs (31 − 4) | **31 URLs**, all 7 portfolio URLs present |
| Vibgyor claim + link (B1/B2/B3, BLOG-078/027) | Absent | "Vibgyor" still published; "35%" still published; **"Read the full case study here" still linked** to `/portfolio/content-marketing-for-schools/`; the external "Vibgyor High" link still present |
| BLOG-064 `local SEO case example` | Link removed | **Still linked** to `/portfolio/local-seo-service-usa/` |
| BLOG-066 `SEO for healthcare` | Link removed | **Still linked** to `/portfolio/seo-healthfirst/` |
| BLOG-038/041/044 (3 links) | Links removed | **All 3 still linked** (omaxe, emaar-mohali-hills, google-ads-for-real-estate) |
| BLOG-073 – 077 (5 links) | Links removed | **All 5 still linked** |
| BLOG-067/068 (R2, must stay untouched) | Unchanged | Unchanged — correct |

**Cache evidence (so this is not misread as staleness).** `/work` responds `cache-control: s-maxage=60, stale-while-revalidate=…`; across samples it went `x-nextjs-cache: HIT` → `STALE` → `HIT` **with an unchanged `etag` (`rddt7huprg1pqj`)**, i.e. a revalidation cycle completed and regenerated byte-identical HTML. The Contentful fetch TTL is also 60s (`DEFAULT_REVALIDATE_SECONDS` in `lib/contentful/client.ts`). This **suggests, but does not prove**, that the delivery API is still returning the pre-R1 data.

**Claude cannot inspect Contentful** (no credentials, and none are to be supplied). The three explanations consistent with the evidence, for the owner to distinguish inside Contentful:
1. **Entries saved but not published / not unpublished** — the four case studies should show status **Draft**; the four articles should show **Published** with no "Changed" badge. A "Changed" badge means the edits exist only as a draft.
2. **A different space or environment** from the one production reads (`CONTENTFUL_SPACE_ID`, `CONTENTFUL_ENVIRONMENT`).
3. **Production not picking up Contentful changes at all** — which would itself be a deployment defect worth knowing about before R2.

No further Contentful change was made by Claude, and none is proposed here.

### 16.2 REPOSITORY R1 STATE — `PASS`

| Check | Command / method | Result |
|---|---|---|
| Typecheck | `npm run typecheck` | Pass |
| Lint | `npm run lint` | **0 findings in the five R1 files**; pre-existing findings elsewhere unchanged |
| Build | `npm run build` | Pass — compiled, 25/25 static pages generated |
| Portfolio dynamic not-found | Local dev, rendered DOM | `/portfolio/zz-check` → 404, `noindex, nofollow`, **no canonical** |
| Blog dynamic not-found | same | `/blog/zz-check` → 404, `noindex, nofollow`, **no canonical** |
| Valid routes unaffected | same | `/blog` 200 `index, follow`; `/work` 200 still `noindex` (SEO-001 not authorized) |
| Proof withholding | Real `CaseStudyContent` rendered via `react-dom/server` against an Ameba-shaped fixture | `withholdProof=false` → 2,852 chars incl. "200%", "30,000 visits", table, conclusion. `withholdProof=true` → 365 chars: no figures, no table, no conclusion; Problem Statement intact |
| Scope | `isCaseStudyProofWithheld` over 11 inputs | `true` only for the 3 named slugs (+ `portfolio/`-prefixed); `false` for the 4 removed studies, a future slug, empty, and a near-miss |
| `/work` leakage guard | `lib/contentful/case-studies.ts:84` | `result: isCaseStudyProofWithheld(study.slug) ? '' : study.highlightResult` |
| Working tree | `git status --short` | 4 modified + 1 new code file, plus the governance folder and the previously known unrelated untracked items. **No unexpected change** |
| Stashes | `git rev-parse stash@{0} stash@{1}` | `c1acf87f…`, `b36b2430…` — **unchanged** |

### 16.3 PRODUCTION CODE STATE — `EXPECTED OLD CODE` (no drift)

Production behaves exactly as the pre-R1 code should, which is correct because R1 is uncommitted and undeployed: retained case studies still render "Results & Metrics"/"Before & After", the testimonial and **5 ★** (Ameba, Home Decor Brand, AnybodyCanBake), and `/portfolio/<missing>` still renders `index, follow`. No unexplained drift was observed.

### 16.4 R1 completion assessment — `R1 PARTIAL`

Blockers (only these):
1. **The four case studies are still published** and still reachable, carded and sitemapped (WORK-010/015/024/025, PAGE-039/041/044/045).
2. **The Vibgyor claim and its case-study link are still published** (BLOG-078, BLOG-027).
3. **The 10 remaining approved link removals are still live** (BLOG-064, BLOG-066, BLOG-038/041/044, BLOG-073–077).

The repository portion is complete and verified; deployment verification remains a later step and is not a blocker for R1 implementation.

### 16.5 Pre-commit manifest (nothing staged or committed)

**Application/code — belongs in the R1 commit**
- `lib/case-study-proof.ts` *(new)*
- `app/(pages)/portfolio/[slug]/page.tsx`
- `app/(pages)/blog/[slug]/page.tsx`
- `components/case-study/CaseStudyContent.tsx`
- `lib/contentful/case-studies.ts`

**Governance documentation — belongs in the R1 commit (or its own docs commit)**
- `docs/14-qa/link-audit-2026-09-19/LINK_ROUTING_OWNER_REVIEW.md`
- `docs/14-qa/link-audit-2026-09-19/SITE_LINK_AUDIT_2026-09-19.md` *(untouched evidence, currently untracked)*
- `docs/14-qa/link-audit-2026-09-19/LINK_INVENTORY_2026-09-19.csv` *(untouched evidence, currently untracked)*

**Must NOT enter the commit**
- `.claude/` — local session/tooling state
- `MappedSkills_Brand_DNA.pdf`, `MappedSkills_UI_Developer_Specification.docx` — unrelated binaries dropped in the repo root
- `README.md` — untracked, unrelated to R1, not reviewed here
- `public/mappedskills-logo-dark-bg.png`, `public/mappedskills-logo-light-bg.png` — unrelated assets
- Both UI stashes — not to be applied or mutated

### 16.6 R2

`R2 MANIFEST UNCHANGED.` The completed-state assumption behind BLOG-067/068 ("after R1 is live") is unchanged, and the owner-approved BLOG-007/008 mapping (§15.2) stands. R2 remains **not authorized**.

## 17. R1 verification pass 2 (2026-09-21, read-only) — after the owner's `Master`-environment operations

Contentful has now propagated: production shows real changes. **Three items are not in the state R1 requires**, one of them serious. No Contentful edit, no code change and no deployment was made in this pass.

### 17.1 Propagation evidence (so nothing here is a stale-cache artefact)

Four request rounds over ~5 minutes, with `x-nextjs-cache` observed moving `HIT → STALE → HIT`, and `/work` (`s-maxage=60`) plus the Contentful fetch TTL (60s, `lib/contentful/client.ts`) both cycling. Between rounds the sitemap changed from 31 to **24** URLs and several article links disappeared, which proves regeneration is reaching Contentful. The states below were then **stable across the last two rounds**.

### 17.2 Verified COMPLETE

| Item | Evidence |
|---|---|
| The four removed case-study URLs no longer resolve as published case studies | `seo-healthfirst`, `local-seo-service-usa`, `google-ppc-for-real-estate`, `google-ads-for-ecommerce` → **HTTP 404** |
| No irrelevant redirects introduced | Each returns 404 directly; no redirect to `/work`, a service page or another case study |
| Their 404 metadata | **404 + `noindex`**, canonical `/404` — these paths were prerendered, so they now render the root not-found metadata. The SEO-006 fix still matters for never-prerendered slugs: `/portfolio/zz-nonexistent` still shows `index, follow` — `EXPECTED UNTIL AUTHORIZED R1 CODE IS DEPLOYED` |
| Absent from sitemap | `sitemap.xml` now contains **no** `/portfolio/*` URLs |
| BLOG-064 `local SEO case example` | Link to `/portfolio/local-seo-service-usa/` **gone** |
| BLOG-066 `SEO for healthcare` | Link to `/portfolio/seo-healthfirst/` **gone** |
| BLOG-067 / BLOG-068 untouched (correct for R1) | "SEO for software business" → `/portfolio/seo-ameba-software` and "SEO for home decor brands" → `/portfolio/seo-for-home-decor` both still linked, as R1 requires |
| BLOG-038 / 041 / 044 | All three `lead generation strategies for real estate` links **gone**; none repointed to another case study |
| Vibgyor B3 | The paragraph beginning "From optimizing their website content…" is **gone** |
| BLOG-027 | `Read the full case study here` → `/portfolio/content-marketing-for-schools/` **gone** |

### 17.3 Verified INCOMPLETE — blockers

**(1) The three RETAINED case studies are also unavailable — `/work` is empty.** `seo-ameba-software`, `seo-for-home-decor-brand` and `google-ads-for-online-courses` all return **HTTP 404**; `/work` renders 200 but with **zero case-study cards**; the sitemap has **no** portfolio URLs at all. Their retention is owner-approved (WORK-011/016/020, PAGE-040/042/043), so this is a deviation from the approved architecture.

Two explanations fit the evidence, and this repository's own code makes the second one plausible:
- all seven case-study entries are unpublished in Contentful; **or**
- the `caseStudies` GraphQL query now returns an error. `lib/contentful/client.ts` does `if (json.errors?.length) return null;` — **any** error on that query collapses the whole collection to empty, which removes all seven case studies, empties `/work` and drops every portfolio URL from the sitemap. The blog uses a different query and is healthy (8 posts in the sitemap, 8 cards on `/blog`), which is consistent with a fault specific to the case-study query.

Distinguishing evidence the owner can obtain without sending Claude any credential: in Contentful, confirm those three entries still show **Published**; and check the production server log for `[contentful] GraphQL errors:` or `[contentful] GraphQL HTTP`. **If the three are still Published, the all-or-nothing fail-soft is the cause and it is a defect worth fixing before any deploy** — recorded here, not fixed, because it is outside R1's authorized scope.

**Consequence for verification:** while the collection resolves empty, the four unpublish operations cannot be confirmed independently — a 404 is what both explanations produce.

**(2) The Vibgyor claim is still published** (BLOG-078). B3 and the case-study link are gone, but both claim paragraphs remain: "For example, Vibgyor High, a leading school in Pune, used tailored content strategies to boost enrollment inquiries by **35% within six months**." and "By partnering with MappedSkills Marketing… to boost their enrollment inquiries by **35% within six months**." The string "35% within six months" still appears in the published payload, and the external "Vibgyor High" link is still present. Vibgyor is therefore **still presented as public client/result proof**.

**(3) The five paid-social links are still published** (BLOG-073 – BLOG-077) in `/blog/facebook-advertising-agency-pune`: OmSaiGroup, GEMS Education, Mohali Citi Center, Advit Prints and AnybodyCanBake still link to their non-existent case-study URLs. None was repointed to another case study.

### 17.4 Local R1 code verification — `PASS` (re-run, no code changed)

`npm run typecheck` pass · `npm run lint` **0 findings in the five R1 files** · `npm run build` pass (25/25 pages) · local `/portfolio/zz-check` and `/blog/zz-check` → 404, `noindex, nofollow`, **no canonical** · `/blog` still `index, follow`, `/work` still `noindex` · withholding harness: 2,852 chars with proof vs 365 chars without, Problem Statement retained · scope: `true` for exactly the three retained slugs across 11 inputs · `/work` guard present at `lib/contentful/case-studies.ts:84`. Working tree: the 5 R1 files plus the governance folder and the previously known unrelated untracked items. Stashes `c1acf87f…` and `b36b2430…` unchanged. Nothing staged.

**The authorized R1 implementation is not defective**; no code change was made or is proposed.

### 17.5 Status — `R1 PARTIAL`

Blockers, all on the Contentful side:
1. The three retained case studies are unavailable (`/work` empty, all portfolio URLs 404, none in the sitemap) — restore or diagnose per §17.3.
2. The Vibgyor 35% client-result claim (both paragraphs) is still published.
3. The five paid-social case-study links are still published.

**PRODUCTION CODE STATE: `EXPECTED OLD CODE`** — no drift. `R2 MANIFEST UNCHANGED.`

## 18. Retained case-study incident — diagnosis (2026-09-21, read-only)

### 18.1 Manual R1 corrections — `PASS`

Both propagated. Verified after a completed revalidation cycle (the first round was still stale; the second was fresh, `etag` changed):

| Item | Evidence |
|---|---|
| Vibgyor claim, both "35% within six months" statements, B3 paragraph, `Read the full case study here`, and the `/portfolio/content-marketing-for-schools/` link | **All absent.** Zero matches for `Vibgyor`, `35% within six months`, `Read the full case study` in the published payload. Positive control: the article still returns 200 (148 KB) with its H1 intact |
| Five paid-social links (OmSaiGroup, GEMS Education, Mohali Citi Center, Advit Prints, AnybodyCanBake) | **All absent.** Zero matches for `social-media-ads-` in the published payload; none repointed to another case study. Positive control: the article returns 200 (224 KB) and the section "Proof Through Relevant Campaign Experience" still renders |

Vibgyor is no longer presented as public client/result proof.

### 18.2 Retained case-study incident — `ROOT CAUSE CONFIRMED`

**Observed failure.** `/work` renders 200 with **zero** case-study cards; all seven `/portfolio/*` routes return 404, including the three owner-approved retained studies; `sitemap.xml` contains **no** portfolio URLs.

**Root cause (FACT — production `stderr.log`, read over SSH, read-only).** Every case-study query fails with Contentful link-resolution errors, and **every error is the same field**:

```
[contentful] GraphQL errors: Query execution error. Link from entry '<caseStudy>' to entry '<clientName>'
on field 'clientName' within type 'CaseStudies' cannot be resolved
```

- The log (born 2026-09-18 13:56, last written 2026-09-21 02:20 server time) contains **41 lines, all of them this one error**; `on field 'clientName'` occurs **97 times**. No other error type, no HTTP error, no auth error.
- **Seven distinct case-study entries** each reference a `clientName` entry that cannot be resolved. Lines logged while all seven were still published list all seven; the most recent lines list **three** — matching the three still-published (retained) studies.
- The chain: `clientName` link unresolvable → Contentful returns `errors[]` → `lib/contentful/client.ts` executes `if (json.errors?.length) { … return null; }` → `fetchContentfulCaseStudies` gets `null` → `getCaseStudyListCards` returns `[]` → **`/work` empty, sitemap portfolio URLs gone**; and `fetchContentfulCaseStudyBySlug` returns `null` → `notFound()` → **every detail route 404**.

**Blog vs case study (why only one collapsed).** The post query (`postCollection`) selects `author`/`category` links that resolve normally, so posts are unaffected — 8 posts in the sitemap, 8 cards on `/blog`, both edited articles serving correctly. The case-study fragment selects six linked entries (`clientName`, `industry`, `size`, `audience`, `targetArea`, `review`); only `clientName` is failing. The failure is therefore **data-side, not schema-, limit-, locale- or complexity-related**: no field was renamed, no type changed, and the same query worked on 2026-09-19.

**Smallest reproducible failure:** any `caseStudiesCollection` query that selects `clientName { … }` while a linked `clientName` entry is unpublished/missing → HTTP 200 with partial data **plus** `errors[]` → this client discards the whole response.

**Was a latent defect exposed?** Yes, and it is **not** the one hypothesised earlier. Two independent conditions combine:
1. **Content:** the `clientName` child entries linked from the case studies are currently unresolvable in `Master` (unpublished or deleted).
2. **Code:** `contentfulGraphql` treats *any* `errors[]` as total failure, so one unresolvable link removes **every** case study. A partial-data response would still have carried all the case-study fields.

**Is this a side-effect of unpublishing the four studies?** **No (FACT).** Errors naming all seven source entries were logged while all seven were still published, i.e. before the four unpublishes took effect. The retained three are affected identically. **INFERENCE** (not established): the breakage began after the 2026-09-19 audit, when client names still rendered — that is, within the window of the manual Contentful work — but the specific action that unpublished or removed the `clientName` entries is **not established**, and this review does not assert one.

**Are the four intended unpublishes correct?** They **appear** correct — all four URLs 404, none redirects, none is carded or sitemapped. **Caveat:** while the collection errors, a 404 is produced for published and unpublished studies alike, so the four unpublishes **cannot be independently confirmed** until the `clientName` links resolve again.

**Is any retained entry defective?** **No.** The error names the *link target*, not the case study. The three retained entries are intact; their `clientName` children are missing from the published set.

### 18.3 Smallest safe remediation (NOT implemented, NOT authorized here)

**Content fix — restores the approved architecture, no code change (owner action in Contentful):** publish the `clientName` entries linked from the three retained case studies (entry IDs from the log: sources `4DpPjLCWdakD6tBmZNMnko`, `4zQL4P8SR2xogxHN4qFfUl`, `xudVmwI50zzAYhucWzuY9` → targets `1BxsMf2zfy1La0KoEItKn0`, `2HH1bXG5mMmoAaugOqQzHq`, `3fPaNtE4ln9m3h8FfiXNI4`). Touch **only** those child entries: do not edit, republish or alter the three case studies themselves, and do not republish the four removed studies or their children. All three clients have publication permission YES, so restoring the client name republishes nothing that is not already approved.

**Code hardening — a separate defect, outside R1:** make `contentfulGraphql` return `json.data` when the response carries usable data and the errors are link-resolution errors, instead of discarding everything. This is the difference between "one missing child entry hides one client name" and "one missing child entry deletes the entire case-study architecture". **Requires its own authorization**; it is not part of R1 and must not be bundled into the R1 commit.

**Which belongs where:** the content fix restores the state R1 already approved, so it sits inside R1. The code hardening is a new defect fix and needs a separate gate.

### 18.4 Status

`R1 PARTIAL` — the three retained case studies are still unavailable. The Vibgyor and paid-social corrections are complete and verified (§18.1). The R1 repository changes remain complete, verified and uncommitted; production still runs the old code (`EXPECTED OLD CODE`). `R2 MANIFEST UNCHANGED.`

## 19. `clientName` ID reconciliation and production recheck (2026-09-21, read-only)

Evidence sources: production `stderr.log` (read over SSH), the **Contentful Delivery API queried from the production host using the credentials already present there** (read-only; no secret was copied, printed or placed in any file), and live HTTP. No Contentful change, no code change, nothing published or unpublished by Claude.

### 19.1 Authoritative ID mapping (FACT)

Delivery API, environment `master`, content type `caseStudies` (`select=sys.id,fields.slug,fields.clientName`): **total published = 2**, `errors: none`.

| Case study | Parent ID | Slug (as stored) | Log-reported `clientName` target | Current Contentful-linked `clientName` | Match? | Explanation |
|---|---|---|---|---|---|---|
| Ameba Software | `4DpPjLCWdakD6tBmZNMnko` | `portfolio/seo-ameba-software` | `1BxsMf2zfy1La0KoEItKn0` | `1BxsMf2zfy1La0KoEItKn0` (**published**, "Ameba Software, Tech Software Startup, Chandigarh") | **YES** | Link now resolves; page restored |
| Home Decor Brand | `4zQL4P8SR2xogxHN4qFfUl` | `seo-for-home-decor-brand` | `2HH1bXG5mMmoAaugOqQzHq` | `2HH1bXG5mMmoAaugOqQzHq` (**published**, "eCommerce Home Decor Brand, Bangalore") | **YES** | The log mapping was correct. The owner-reported `1Sbnqp1veCZiPHj78cmnLh` is **not** the linked child and is **not a published `caseClient`**; what it is beyond that is UNKNOWN. No parent relationship changed |
| AnybodyCanBake | `6Ycb7aYvXrslOXKchQnqmi` | `google-ads-for-online-courses` (not in the published set) | `4qzD1vSg28WOKWKhCD64Vc` | `4qzD1vSg28WOKWKhCD64Vc` (**unpublished**) — owner read the same ID from the parent | **YES** | Identity proven by two independent sources |

**Correction to §18.3.** That section paired the three IDs by their order in the newest log lines. Ameba was right; the other two were not. The pairs `xudVmwI50zzAYhucWzuY9 → 3fPaNtE4ln9m3h8FfiXNI4`, `7eQ2t6t7qzpTkp3mScfi6C → 1s3Rn4TS2w1OWTC1az3YYX`, `6iXOA9jVUPJ1YZRpqorzJu → 2x07UVQTIOCy29HsOZWbSI` and `B63etvFne4B1vL7XyOZiF → 6Zr5vu9oXrfSXw8w07TWiE` belong to the **four removed** case studies. The seven log pairs are one per case study, and none is stale: every target is the entry the parent still links to.

Published `caseClient` entries: **exactly 2** (`1BxsMf…`, `2HH1…`). Unpublished: `4qzD1vSg28WOKWKhCD64Vc`, `3fPaNtE4ln9m3h8FfiXNI4`, `1s3Rn4TS2w1OWTC1az3YYX`, `6Zr5vu9oXrfSXw8w07TWiE`, `2x07UVQTIOCy29HsOZWbSI`, and `1Sbnqp1veCZiPHj78cmnLh`.

### 19.2 Production recheck (after the owner's Ameba/Home Decor work)

| Surface | State |
|---|---|
| `/work` | **2 cards** — `seo-ameba-software`, `seo-for-home-decor-brand` |
| `/portfolio/seo-ameba-software` | **200** (restored) |
| `/portfolio/seo-for-home-decor-brand` | **200** (restored) |
| `/portfolio/google-ads-for-online-courses` | **404** |
| `sitemap.xml` | exactly those 2 portfolio URLs |
| The four removed studies | **404**, still absent from `/work` and the sitemap — correct |
| New `[contentful] GraphQL errors:` lines | **none** since line 45, across two request rounds ~75s apart. The collection query now succeeds |

Publishing the two client entries fixed the collapse: with no unresolvable link, `contentfulGraphql` no longer discards the collection. The all-or-nothing error handling (§18.2) remains a latent defect.

### 19.3 The AnybodyCanBake case study is itself unpublished (NEW FACT)

The Delivery API reports **2** published `caseStudies`. `google-ads-for-online-courses` is **not among them**, so the parent entry `6Ycb7aYvXrslOXKchQnqmi` is currently unpublished in `master` — not merely missing a client name. It was published earlier today (the GraphQL error naming it could only arise for a published entry).

This contradicts the owner's understanding that the entry is Published, and it deviates from **WORK-020 / PAGE-043**, which retain AnybodyCanBake. **INFERENCE, not established:** an adjacent-slug mix-up during step A4 is plausible — `google-ads-for-ecommerce` (Utpala, to be unpublished) versus `google-ads-for-online-courses` (AnybodyCanBake, to be retained). The actual action is not established and is not asserted here.

**Ordering matters for the fix:** publish the child `4qzD1vSg28WOKWKhCD64Vc` **first**, then the parent. Publishing the parent while its `clientName` child is unpublished reproduces the unresolvable link, and the current code would again discard the whole collection — taking Ameba and Home Decor down with it.

### 19.4 Decision

`SAFE TO PUBLISH ANYBODYCANBAKE CLIENT ENTRY 4qzD1vSg28WOKWKhCD64Vc` — identity proven by two independent sources: the production GraphQL error names `6Ycb7aYvXrslOXKchQnqmi → 4qzD1vSg28WOKWKhCD64Vc` as the failing link, and the owner independently read `4qzD1vSg28WOKWKhCD64Vc` from the AnybodyCanBake parent's own `clientName` field. No other parent references that child. It is **necessary but not sufficient**: the parent case study must then be published too, in that order.

No other child entry is to be published: the other four unpublished `caseClient` entries belong to the four removed case studies.

### 19.5 Status

`R1 PARTIAL` — two of three retained studies are publicly restored; AnybodyCanBake remains unavailable (child unpublished **and** parent unpublished). The four removed studies remain correctly absent. Repository R1 remains complete, verified and uncommitted; production still runs the old code. `R2 MANIFEST UNCHANGED.`

## 20. FINAL R1 VERIFICATION (2026-09-21, read-only) — after the owner's AnybodyCanBake restoration

Run after the owner published the AnybodyCanBake `clientName` child (`4qzD1vSg28WOKWKhCD64Vc`) and then the
parent (`6Ycb7aYvXrslOXKchQnqmi`), in that order, as §19.3/§19.4 required. **No Contentful change, no code
change, nothing staged, committed, pushed or deployed in this pass. Neither UI stash touched.** Evidence:
live HTTP against `https://mappedskills.com`, the production `stderr.log` read over SSH, and the Contentful
**Delivery** API queried read-only from the production host using the credentials already present there. No
secret was read, printed, copied or written anywhere.

### 20.1 Propagation — so nothing below is a stale-cache artefact

The first request round at 09:56 UTC returned **404** for `/portfolio/google-ads-for-online-courses`; that
request itself marked the ISR entry stale, and the next round returned **200**. A second, subtler artefact
followed: for roughly four minutes the route served **HTTP 200 with the full AnybodyCanBake body but the root
not-found metadata** — `<title>Page Not Found | MappedSkills</title>`, `robots: noindex`, canonical
`/404` — in both the HTML head and the RSC flight payload. It cleared on the next regeneration
(`etag i4pb0guxn926t7` → `j03afz8ec327qe`) and was then **stable and correct across 12 polls over ~6
minutes**. Recorded because it is a real transient that will recur on any future publish: for a few minutes
after a case study is published, the live URL can serve a valid page under `noindex` and a `/404` canonical.
It is **not** an R1 defect and needs no R1 action.

Three further rounds ~70 s apart across `/work`, `/sitemap.xml` and all three retained studies each showed
`x-nextjs-cache: STALE` followed by regeneration to a **byte-identical `etag`**, i.e. the content is settled.

### 20.2 The three retained case studies — `PASS`

| Check | Ameba `seo-ameba-software` | Home Decor `seo-for-home-decor-brand` | AnybodyCanBake `google-ads-for-online-courses` |
|---|---|---|---|
| HTTP status | **200** | **200** | **200** |
| Correct case study renders | Yes — H1 "SEO for Ameba Software: Tech Company" | Yes — H1 "SEO for eCommerce Home Decor Brand" | Yes — H1 "Google Ads for Online Courses" |
| Soft 404? | No — real title, self-canonical, `index, follow` | No | No — zero occurrences of "Page Not Found"; 103 KB body |
| Canonical | `/portfolio/seo-ameba-software` | `/portfolio/seo-for-home-decor-brand` | `/portfolio/google-ads-for-online-courses` |

### 20.3 Retained proof suppression — `IMPLEMENTED AND VERIFIED, NOT LIVE`

**This is the one item that cannot be verified on production, and the reason is not a defect.** R1's code is
uncommitted and undeployed; production runs the pre-R1 build (`PRODUCTION CODE STATE: EXPECTED OLD CODE`,
unchanged since §16.3). Measured on production today, all three retained studies therefore still expose:

| Withheld under R1 | Ameba | Home Decor | AnybodyCanBake |
|---|---|---|---|
| Derived hero figure | "Achieved a 200% increase in organic website traffic within six months." | "Increased organic traffic by 85% over six months…" | "Course Enrollments: 500" |
| Results & Metrics | present | present | *(no such section in Contentful)* |
| Before & After Comparisons | present | present | present |
| Conclusion | present | present | present |
| Testimonial + hard-coded five ★ | present — five `★` spans, verbatim quote, named attribution | present | present |

**The implementation itself is verified**, re-run this session against the real component and the real
predicate (scratchpad harness via `react-dom/server`, not added to the repository):

- `withholdProof=false` → 7,622 chars containing `200%`, `30,000 visits`, the before/after row, "Results &
  Metrics", "Before & After" and the Conclusion.
- `withholdProof=true` → 4,819 chars: **every one of those absent**; "Problem Statement" and "Services
  Provided" still render; nothing substituted.
- `isCaseStudyProofWithheld` over 11 inputs → `true` for exactly the three retained slugs and their
  `portfolio/`-prefixed forms; `false` for all four removed studies, a near-miss (`seo-ameba-software-2`), a
  future slug and the empty string.
- Hero-figure and testimonial/star suppression are guarded by the same predicate in
  `app/(pages)/portfolio/[slug]/page.tsx`; the `/work` card guard is at `lib/contentful/case-studies.ts:84`.

**Consequence for the owner, stated plainly: the unevidenced figures, the verbatim testimonials and the
five-star ratings remain publicly readable on all three retained case studies until R1 is committed and
deployed.** That is exactly what the commit/deploy decision resolves.

### 20.4 `/work` — `PASS`

HTTP **200**. Exactly **3** case-study cards — `/portfolio/seo-ameba-software`,
`/portfolio/seo-for-home-decor-brand`, `/portfolio/google-ads-for-online-courses`. Zero occurrences of
`HealthFirst`, `EcoClean`, `Fine Living`, `Utpala` or any of their four slugs. **No quantitative result line
is exposed on any card:** `app/(pages)/work/page.tsx` maps only `href`, `title`, `meta` (industry) and
`summary` into `EntryList` and never renders `study.result`, so the R1 guard in `getCaseStudyListCards` is
defence in depth and the `/work` surface is clean on the deployed build as well.

### 20.5 The four removed case studies — `PASS`

| URL | Status | Redirects | Case-study content | Metadata |
|---|---|---|---|---|
| `/portfolio/seo-healthfirst` | **404** | 0 | none | `noindex, nofollow`, canonical `/404` |
| `/portfolio/local-seo-service-usa` | **404** | 0 | none | same |
| `/portfolio/google-ppc-for-real-estate` | **404** | 0 | none | same |
| `/portfolio/google-ads-for-ecommerce` | **404** | 0 | none | same |

Zero occurrences of "Problem Statement", "Results & Metrics", "Before & After", "What the Client Says" or
"Case Study" in any of the four responses; each is the 39 KB root recovery page. `curl -L` confirms **no
redirect** to `/work`, a service page, `/` or another case study.

**The four unpublishes are now independently confirmed**, which §18.2 could not do while the collection was
collapsing: the Delivery API reports **total published `caseStudies` = 3**, and they are exactly
`portfolio/seo-ameba-software`, `seo-for-home-decor-brand` and `google-ads-for-online-courses`.
`errors: none`. Utpala (`google-ads-for-ecommerce`) remains unpublished, as required.

**Dynamic not-found `noindex` — `PASS`, with an honest note.** Freshly generated, never-prerendered slugs
(`/portfolio/zzq-…`, `/blog/zzq-…`, two independent random pairs) all return **404 with `noindex, nofollow`
and no canonical pointing at the missing URL**. This is the behaviour SEO-006 requires and it is also what
local dev returns. **However:** the rendered head comes from `app/not-found.tsx`'s static `metadata` export,
which wins over the route's `generateMetadata` not-found branch, so on today's evidence the correct robots
tag is **not attributable to the R1 code** — production, which runs the pre-R1 build, already produces it.
This **contradicts §17.2**, which measured `index, follow` on `/portfolio/zz-nonexistent` while the
case-study collection was collapsing. The mechanism behind that change is **NOT ESTABLISHED** and is not
asserted here; the observed change is in the safe direction, and R1-a/R1-b remain correct and are retained
because they make the route-level metadata right regardless of which surface wins.

### 20.6 Sitemap — `PASS`

`sitemap.xml` → **27 URLs total**, of which **exactly 3** are `/portfolio/*`:

```
https://mappedskills.com/portfolio/seo-ameba-software
https://mappedskills.com/portfolio/seo-for-home-decor-brand
https://mappedskills.com/portfolio/google-ads-for-online-courses
```

None of `seo-healthfirst`, `local-seo-service-usa`, `google-ppc-for-real-estate` or
`google-ads-for-ecommerce` appears anywhere in the document.

### 20.7 Contentful collection health — `PASS`

| Evidence | Result |
|---|---|
| `~/mappedskills.com/stderr.log` before fresh requests | 45 lines, 18,992 bytes, md5 `87f4e351…`, mtime **2026-09-21 06:56:57 UTC** |
| Fresh requests generated | 3 rounds ~70 s apart across `/work`, `/sitemap.xml` and all three retained studies, plus 12 polls of AnybodyCanBake — all forcing `STALE` → regeneration |
| Same log **after** those requests, at 10:05:57 UTC | **45 lines, 18,992 bytes, md5 `87f4e351…`, mtime unchanged** |
| New `[contentful] GraphQL errors:` lines | **ZERO.** The newest error predates the restoration by over three hours; all 45 lines are historical |
| Delivery API, `content_type=caseStudies`, `include=2` | `total: 3`, `errors: none`; **all three `clientName` links RESOLVED** — `6Ycb7aYvXrslOXKchQnqmi → 4qzD1vSg28WOKWKhCD64Vc`, `4DpPjLCWdakD6tBmZNMnko → 1BxsMf2zfy1La0KoEItKn0`, `4zQL4P8SR2xogxHN4qFfUl → 2HH1bXG5mMmoAaugOqQzHq` |

No unresolved `clientName` error, no case-study GraphQL error, and the collection returns all three retained
studies normally. **The all-or-nothing `if (json.errors?.length) return null` fail-soft in
`lib/contentful/client.ts` (§18.2, §18.3) remains a latent defect** — it is simply no longer being triggered.
It is outside R1 and still needs its own gate.

### 20.8 Manual R1 blog corrections — `PASS` (re-verified, nothing changed)

| Article | Check | Result |
|---|---|---|
| `/blog/content-marketing-services-in-pune` | Vibgyor proof / 35% claims / case-study link | **Zero** matches for `Vibgyor`, `35%`, `35% within six months`, `enrollment inquiries`, `Read the full case study`, `content-marketing-for-schools`, `vibgyorhigh`. Positive control: 200, H1 intact, **no `/portfolio/` anchor anywhere** |
| `/blog/facebook-advertising-agency-pune` | Five approved case-study links (BLOG-073–077) | **Zero** matches for `social-media-ads-` and **zero** `/portfolio/` anchors. None repointed. The five client names survive as prose only. Positive control: 200, 224 KB, "Proof Through Relevant Campaign Experience" still renders |
| `/blog/seo-company-in-pune` | HealthFirst + EcoClean links removed (BLOG-064/066) | **Zero** matches for `seo-healthfirst`, `local-seo-service-usa`, `HealthFirst`, `EcoClean`. "SEO for healthcare" and "local SEO case example" now render as **plain text** |
| `/blog/seo-company-in-pune` | Approved retained links NOT altered by R1 (BLOG-067/068) | **Both intact and unchanged:** "SEO for software business" → `https://mappedskills.com/portfolio/seo-ameba-software/` and "SEO for home decor brands" → `https://mappedskills.com/portfolio/seo-for-home-decor/`. The latter's missing `-brand` is BLOG-068, an R2 item — correctly untouched |
| `/blog/7-proven-strategies-…-real-estate-developers` | Three nonexistent case-study links (BLOG-038/041/044) | **Zero** matches for `omaxe`, `emaar-mohali-hills`, `google-ads-for-real-estate`; **zero** `/portfolio/` anchors. The phrase survives only as italic/bold emphasis, not as a link |

### 20.9 Repository state — `PASS`

| Check | Result |
|---|---|
| R1 application changes present | 4 modified + 1 new: `app/(pages)/blog/[slug]/page.tsx`, `app/(pages)/portfolio/[slug]/page.tsx`, `components/case-study/CaseStudyContent.tsx`, `lib/contentful/case-studies.ts`, `lib/case-study-proof.ts` (+95 / −10) |
| Uncommitted | `HEAD` = `ac58e462228ecddff615b73acd0d5fe38c75ee2e`, unchanged. `git diff --cached` **empty — nothing staged** |
| No R2 | No related-services / BLOG-007/008 change in any file; no Contentful change |
| No R3 | No reference to `freelancing-in-india` anywhere in `app`, `lib` or `components` |
| No R4 | `/work` still `robots: 'noindex, nofollow'` — SEO-001 untouched, confirmed live (`/work` serves `noindex` today) |
| Both UI stashes | `stash@{0}` = `c1acf87fff23323e3fa1e7e0ca2f9a5c2e0b0b9c`, `stash@{1}` = `b36b24308d4312e7614353d91bff17db36a215c9` — **identical to §17.4** |
| Original audit artifacts | `LINK_INVENTORY_2026-09-19.csv` sha256 `312de11c…`, `SITE_LINK_AUDIT_2026-09-19.md` sha256 `c217298b…`; both mtime **2026-09-19 15:16:21**, untouched |
| No unrelated staging | Untracked set unchanged: `.claude/`, the two binaries, `README.md`, the two logo PNGs, the governance folder. **None staged** |
| `npm run typecheck` | **Pass**, no errors |
| `eslint` on the five R1 files | **Pass, exit 0, zero findings.** Pre-existing findings elsewhere not touched |
| `npm run build` | **Pass** — compiled, 25/25 static pages, `/portfolio/[slug]` and `/blog/[slug]` still SSG via `generateStaticParams` |

Pre-existing and not introduced by R1: the homepage `data-rsv-hero` hydration warning (§13.4).

### 20.10 R1 gate decision

`R1 VERIFICATION PASS` · `R1 COMPLETE — READY FOR OWNER COMMIT/DEPLOY DECISION`

Every R1 requirement is met. The one item that cannot be demonstrated on production — retained proof
suppression — is met in implementation and verified against the real component; it cannot be live because
deployment is the next gated step and is not authorized by R1. Until the owner authorizes commit and deploy,
the unevidenced figures, testimonials and five-star ratings stay publicly readable on the three retained case
studies.

Still open, outside R1 and each needing its own gate: the `contentfulGraphql` all-or-nothing error handling
(§18.3); BLOG-068's `seo-for-home-decor` → `seo-for-home-decor-brand` slug (R2). `R2 MANIFEST UNCHANGED.`
Nothing committed, pushed, deployed or staged; no Contentful change; neither UI stash touched;
`DECISION_LOG.md` not updated.
