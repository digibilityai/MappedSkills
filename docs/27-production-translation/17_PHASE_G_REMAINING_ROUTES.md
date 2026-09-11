# Session 29 — Phase G — Remaining Route Translation

**Session:** 29 · **Date:** 2026-09-05/06 · **Branch:** `test_branch`
**Starting HEAD:** `304bfb8be320b5f72051e2b57b9fe43dd64c5d55` (*"feat: translate Resolve commercial routes"* — Phase F)
**`origin/test_branch`:** `4780d4b37346dbb4e2ac332d8490191de3a85f9e` — local was already ahead before this session; **nothing pushed.**
**Type:** Production translation of the approved Resolve system onto the remaining approved route surfaces. One route created, nine rewritten, one system route rewritten, six new components. No homepage change, no shared-chrome change, no forms backend, no booking backend, no analytics, no robots, no sitemap, no redirects.

**Evidence labels used strictly:** **CONFIGURED** = read from the repository · **MEASURED** = a number produced by running something against a rendered page · **OBSERVED** = seen directly in output.

---

## 1. Route-scope reconciliation — done before anything was edited

The session brief listed twelve candidate routes and instructed that the list be reconciled against the authoritative Phase G record first. `06_IMPLEMENTATION_SEQUENCE.md`, Phase G, defines the scope as:

> `/how-it-works` (**§2 renders nothing**) · **new** `/problems/traffic-but-no-enquiries` · `/pricing` (**every figure blocked**) · `/about` (**§4 renders nothing**) · `/faq` · `/work` (**`noindex`, out of sitemap**) · **new** `/work/[slug]` · `/blog`, `/blog/[slug]` · **new** `/research` + 2 entries · `/contact`, `/schedule-call`, `/thank-you` presentation · legal · `not-found` (**links generated from live routes**) · redirects

**Three differences from the brief's list, and how each was resolved.**

1. **`/industries/manufacturing` is NOT in the authoritative Phase G scope.** The brief listed it; the sequence document does not, and `03_PAGE_ARCHETYPES.md` archetype 13 says **DO NOT BUILD** until the manufacturing validation gate clears. **The gate is OPEN** — `DEC-019` states explicitly that "the conditional manufacturing route" remains blocked and was not resolved by Gate 10, and `PAGE_COPY_INDEX.md` §2 records the copy as **CONDITIONAL — NOT DRAFTED**. **Not built.**
2. **`/research` and the two research entries ARE in the authoritative scope, and their launch condition is NOT satisfied.** `PAGE_COPY_INDEX.md` §1 rows 13 and 14 record both entries as **NOT DRAFTED — out of Session 11 scope**; `copy/research-hub.md` is CONDITIONAL on the entries and carries an unresolved `[DECISION REQUIRED — whether /research launches with one entry or two]` that only the orchestrator can answer. Writing the entries is research-asset production, not route translation. **Deferred, and the reason is a missing decision plus missing assets, not a missing design.**
3. **Redirects and the sitemap are named in the sequence document's Phase G line, and the session brief §24 forbids them in binding terms** — *"Even if the implementation-sequence document mentions later sitemap or redirect work nearby, those tasks remain assigned to launch/SEO hardening unless an explicit newer programme decision moved them. Record issues. Do not fix them."* No newer decision exists. **`next.config.mjs`, `app/sitemap.ts` and `app/robots.ts` are untouched**, and every consequence is recorded in §17 below.

**The authoritative record governs and was followed. Nothing was pulled forward on the strength of a prompt line, and nothing in scope was dropped without a recorded reason.**

---

## 2. Authoritative sources read before editing

`06_IMPLEMENTATION_SEQUENCE.md` (Phase G scope, dependencies, acceptance) · `11`–`16` (Phases A–F records) · `03_PAGE_ARCHETYPES.md` (archetypes 4–12, §3 F1 translation, §4 content dependencies) · `docs/09-content-pages/PAGE_COPY_INDEX.md` (Gate 9, `DEC-014`) and the nine relevant approved copy files · `docs/16-ux/06_PROBLEM_PAGE_UX.md`, `22_F1_USAGE_TAXONOMY.md` (BINDING), `33_WIREFRAME_MASTER_PROBLEM.md`, `34_WIREFRAME_MASTER_CONTACT.md`, `36_WIREFRAME_MASTER_INDEX.md`, `47_WIREFRAME_STATE_BLOCKED_CONTENT.md` · `docs/11-creative/19_FIGURE_PRIORITISATION.md` (F2, F4, F6, F8) · `DECISION_LOG.md` `DEC-014`, `DEC-018`, `DEC-019`.

Visual references consulted, **not modified**: `docs/20-creative-convergence/prototype/convergence.html` and `docs/26-resolve-homepage/prototype/index.html`.

---

## 3. Authoritative Phase G scope, as executed

| Route | Included | Gate 9 copy status | Blocked / conditional | Archetype | Treatment |
|---|---|---|---|---|---|
| `/problems/traffic-but-no-enquiries` | **YES — CREATED** | FINAL-CANDIDATE | CTA **wording** only; no owner input blocks the page | 4 — problem diagnostic | Built in full |
| `/how-it-works` | **YES — rewritten** | **BLOCKED** | §2 stages · §9 post-enquiry | 5 — methodology / proof | Built; both blocked sections render nothing |
| `/pricing` | **YES — rewritten** | PARTIALLY BLOCKED | **every figure** | 6 — pricing | Built; §3 renders nothing |
| `/about` | **YES — rewritten** | PARTIALLY BLOCKED | §4 people · §6 company facts | 11 — entity | Built; both render nothing |
| `/faq` | **YES — rewritten** | PARTIALLY BLOCKED | Q1 half · Q2 whole · Q3 half · Q12 quotation | 11 — support | Built; blocked answers render nothing |
| `/contact` | **YES — shell rewritten** | PARTIALLY BLOCKED | §2 · §3 · §4 (NAP) · backend | 7 — conversion surface | Presentation only; form untouched |
| `/schedule-call` | **YES — shell rewritten** | PARTIALLY BLOCKED | who/length/availability · phone · entry offer · booking | 7 — conversion surface | Presentation only; vendor unchanged |
| `/thank-you` | **YES — rewritten** | PARTIALLY BLOCKED | §2 · §3 phone | 8 — post-conversion | Presentation only; stays orphaned + `noindex` |
| `/work` | **YES — rewritten** | NOT DRAFTED (correct) | zero permissioned case studies | 9 — index | Honest proof-pending state; `noindex` added |
| `/blog` | **YES — retained partially** | **CONDITIONAL** — needs ≥3 articles | articles do not exist | 9 — index | Listing architecture translated; no article invented |
| `not-found` | **YES — rewritten** | NOT DRAFTED (technical fix) | — | 12 — system | Recovery links generated from live routes |
| `/work/[slug]` | **NO — deferred** | — | zero case studies; needs the `/portfolio`→`/work` redirects, which are out of scope | 10 | Deferred, §17 |
| `/blog/[slug]` | **NO — deferred** | — | no article exists; bylines owner-blocked | 10 | Deferred, §17 |
| `/research` + 2 entries | **NO — deferred** | CONDITIONAL / NOT DRAFTED | entries unwritten; launch decision unresolved | 5 / 9 | Deferred, §17 |
| `/privacy-policy`, `/terms` | **NO — untouched** | NOT DRAFTED — needs legal review | entity facts owner-blocked | 12 | Untouched, §17 |
| `/industries/manufacturing` | **NO — not built** | CONDITIONAL — NOT DRAFTED | **gate OPEN** | 13 | Not built, §16 |

---

## 4. Old route audit — what was replaced

MEASURED by grepping each file before rewriting. **Every one of the nine legacy routes carried unsupported material, and several carried the exact fabrications their own approved copy exists to argue against.**

| Route | Lines before → after | Unsupported material found | Action |
|---|---:|---|---|
| `/how-it-works` | 733 → 414 | **300%+** · **₹100Cr+** · ROAS ×6 · ₹50,000 and ₹500,000 figures · 3 guarantee statements · an invented delivery process | Replaced wholesale |
| `/pricing` | 664 → 264 | **300%+** · **₹100Cr+** · ROI · ROAS ×3 · ₹50/₹75/₹1L/₹2L price figures the approved copy says are **not confirmed** | Replaced wholesale |
| `/about` | 716 → 246 | **300%+** ×2 · **₹100Cr+** ×2 · ROI ×2 · ROAS ×4 · a certifications block · a team section with no named people · a client-continuation claim | Replaced wholesale |
| `/faq` | 298 → 387 | ROAS · ₹50 price figure · `FAQPage` markup for **one** question against a larger on-page set | Replaced wholesale |
| `/contact` | 406 → 144 | ROAS · legacy hero and card composition | Shell replaced; form retained |
| `/schedule-call` | 521 → 219 | ROAS ×4 · a testimonial block · "free strategy call" framing | Shell replaced; vendor retained |
| `/thank-you` | 281 → 108 | ROI · **"within 24 hours" ×2** · an invented four-step post-enquiry process · links to three blog articles that 404 | Replaced wholesale |
| `/work` | 370 → 163 | **300%+** ×2 · **₹100Cr+** ×2 · ROI ×2 · a 65% figure ×2 · ROAS ×4 · a testimonials block · fabricated result cards | Replaced wholesale |
| `/blog` | 408 → 125 | ROI ×3 · ROAS ×4 · five invented topic clusters promising "improve ROI", "ROAS improvement" and "ranking improvement" · `FAQPage` markup about a body of content that does not exist | Replaced wholesale |
| `not-found` | 192 → 126 | **three hard-coded blog slugs that all 404** · "Schedule Free Strategy Call" ×2 · gradient washes, blurred accent orbs, hover-lift card grid, 6 lucide icons | Replaced wholesale |

**Legacy components: nothing was deleted.** `Hero`, `CTASection`, `FAQSection`, `CaseStudyCard`, `StatCard`, `PricingCard`, `TeamCard`, `TestimonialCard`, `ProcessStepCard`, `ValueCard`, `BeforeAfterMetric` and `lib/constants.ts` lose call sites in this phase. Proving a component orphaned is not the same as being authorised to delete it, and deleting them here would widen the diff well past Phase G. **The orphan set is now final** (Phase F deferred this "to a cleanup pass after Phase G"), so the cleanup pass can proceed next. `CaseStudyCard` is still used by `ResultsFilter`; `BlogCard`, the blog sub-components and `CalendlyEmbed` are still used by routes this phase did not translate.

---

## 5. Files changed

| File | Action | Purpose |
|---|---|---|
| `app/(pages)/problems/traffic-but-no-enquiries/page.tsx` | **Created** (416) | Archetype 4. Static, ungated, scoreless diagnostic |
| `app/(pages)/how-it-works/page.tsx` | Rewritten (733 → 414) | Archetype 5. §2 and §9 render nothing; F1 FULL + F4 STATE |
| `app/(pages)/pricing/page.tsx` | Rewritten (664 → 264) | Archetype 6. §3 renders nothing; F8 factor matrix |
| `app/(pages)/about/page.tsx` | Rewritten (716 → 246) | Archetype 11. §4 and §6 render nothing |
| `app/(pages)/faq/page.tsx` | Rewritten (298 → 387) | Archetype 11. `FAQPage` generated from the rendered array |
| `app/(pages)/contact/page.tsx` | Rewritten (406 → 144) | Archetype 7. Shell only; form untouched |
| `app/(pages)/schedule-call/page.tsx` | Rewritten (521 → 219) | Archetype 7. Shell only; same vendor, same URL |
| `app/(pages)/thank-you/page.tsx` | Rewritten (281 → 108) | Archetype 8. No second ask, no response time, `noindex` kept |
| `app/(pages)/work/page.tsx` | Rewritten (370 → 163) | Archetype 9. Proof-pending state; `noindex` added |
| `app/(pages)/blog/page.tsx` | Rewritten (408 → 125) | Archetype 9. Listing architecture, no invented article |
| `app/not-found.tsx` | Rewritten (192 → 126) | Archetype 12. Recovery links from live routes |
| `components/routes/primitives.tsx` | Created (236) | Breadcrumb, hero, finding rows, stated list, entry rows |
| `components/routes/CauseZones.tsx` | Created (252) | F2 at full depth, two genuine drawings |
| `components/routes/CheckSequence.tsx` | Created (82) | F6, the five checks as an instrument |
| `components/routes/MethodChain.tsx` | Created (375) | F1 A—FULL and F4 as a C—STATE, two drawings each |
| `components/routes/FactorMatrix.tsx` | Created (86) | F8, directions in words, no arithmetic |
| `components/forms/ContactForm.tsx` | **Edited — content integrity only** (3 removals) | §12 below |
| `docs/27-production-translation/17_PHASE_G_REMAINING_ROUTES.md` | Created | This record |

**Net across the eleven route files: 4,589 lines deleted, 1,806 added**, plus 1,031 lines of new shared components.

**Not touched, and verified so by `git status`:** every homepage file (`app/page.tsx`, `components/homepage/*`), `components/layout/*`, `components/ui/*`, `app/globals.css`, `app/resolve-motion.css`, `app/layout.tsx`, `hooks/*`, `lib/*`, `app/robots.ts`, `app/sitemap.ts`, `next.config.mjs`, all analytics, both prototypes, all governance, `README.md`.

---

## 6. Shared / new route architecture

**Reuse before creation.** Phase F's `components/commercial/primitives.tsx` is imported directly and unchanged by nine of the eleven routes — `CommercialSection`, `ChapterLabel`, `Display`, `Lede`, `Body`, `Note`, `Mark`, `ProofLink`, `ActionPair` — and `BoundaryBlock` and `CommercialClose` are reused where they genuinely fit. **No Phase F component was modified**, so no Phase F route can move as a side effect.

**What was created, and the named use that justifies each:**

| Component | Exists because |
|---|---|
| `RouteHero` | The action is OPTIONAL. `/problems/*` forbids any CTA above the fold and `/thank-you` has no ask at all; `CommercialHero` always renders one |
| `RouteBreadcrumb` | `/problems/*` needs a crumb that is a LABEL, not a link — no problems hub exists |
| `FindingList` | Move 6's six findings must be peers. No emphasis prop, no collapse, no ordering control |
| `StatedList` · `EntryList` | Hairline rows for limits and for indexes. `EntryList` has no empty-slot path, so it cannot emit a placeholder card |
| `CauseZones` (F2) · `CheckSequence` (F6) · `MethodChain` + `MethodChainState` (F1 + F4) · `FactorMatrix` (F8) | Four approved figures assigned to three routes |

- **Route-specific components: four**, all of them figures, each assigned to exactly one route by the approved figure record.
- **New client components: ZERO.** MEASURED — `grep -rn "use client"` over `components/routes/` and all eleven route files returns **0**.
- **New animation framework: NONE.** No dependency added.
- **No route-builder abstraction, no JSON page config.** Ordinary React composition; each route file reads as its own argument.

**Why `MethodChain` transcribes rather than imports the homepage figure:** the same reason Phase F gave for `ChainFigure`. The homepage is a closed, validated baseline (`DEC-019`) and extracting its figure would mean editing a homepage file to serve a Phase G route. The mark language, the dashed-means-unmeasured convention, the boundary rule and the double line are transcribed; `components/homepage/*` is untouched, which is why §21 can be asserted.

---

## 7. Routes are not one template — the differentiation result

| Route | Its own sequence | Its distinctive move |
|---|---|---|
| `/problems/*` | symptom → refuse the assumption (F2) → the instrument (F6) → six findings → worked example → commercial LAST | the only route with no CTA above the fold and none inside its middle third |
| `/how-it-works` | argument → **[blocked]** → what is measured (F1) → what is not → what cannot be attributed (F4) → judgement → capabilities → requirements → **[blocked]** → uncertainty → act | two blocked chapters, and the limits are a third of the page |
| `/pricing` | what is bought → horizon **before** price → **[blocked]** → what moves it (F8) → requirements → who it is not for → hardest objection → act | the only route that leads with time, and the only one that answers its own hardest objection |
| `/about` | why → accountability → method → **[blocked]** → what can be checked → **[blocked]** → who → where the firm is today | ends by saying the evidence base is thin |
| `/faq` | five question groups, expanded, then one action | the only route built entirely from question/answer pairs |
| `/contact` | the ask → the form → one cross-link | the only route with a form, and the only one with no chapter rhythm |
| `/schedule-call` | the surface → what it covers → what you get → what it is not → what to bring → the other route | the only route whose primary control leaves the site |
| `/thank-you` | confirmation → one link | 53 words. No CTA at all |
| `/work` | the admission → why → what can be checked instead | the only route whose subject is an absence |
| `/blog` | the state → the two subjects | the shortest index |
| `not-found` | recovery → capabilities → tell us | the only route that is a list of other routes |

**MEASURED word counts in `<main>`:** `/thank-you` **53** · `/blog` 99 · `/contact` 137 · `not-found` 270 · `/work` 291 · `/schedule-call` 372 · `/about` 703 · `/pricing` 996 · `/faq` 1,110 · `/problems/*` 2,107 · `/how-it-works` 2,457. **The lengths were not equalised** — a 46× spread — and each is proportionate to its purpose.

---

## 8. Figure governance

| Route | Expected (`22` §3) | Actual | Verification | Result |
|---|---|---|---|---|
| `/how-it-works` | **A — FULL** (§3) **+ C — STATE as F4** (§5) | exactly that, on the same object | 2 figures, **1 drawing each MEASURED visible at every width** | **PASS** |
| `/problems/*` | **D — NONE** (F2 and F6 are its own objects) | D — NONE. **No run appears** | F2 = 1 drawing MEASURED; F6 is HTML, not a drawing | **PASS** |
| `/pricing` | **D — NONE** (F8 is its figure) | D — NONE | **0 `<svg>` in `<main>`, MEASURED** | **PASS** |
| `/about` · `/faq` · `/work` · `/blog` · `/thank-you` · `not-found` | **D — NONE** | D — NONE | **0 `<svg>` in `<main>`, MEASURED** | **PASS** |
| `/contact` · `/schedule-call` | **D — NONE, and zero figures of ANY kind** | no figure | `/schedule-call` **0 `<svg>`**. `/contact` has **2**, and both are the chevron affordances inside the legacy `Select` controls in the Phase H1 form — control decoration, not apparatus. Both disappear with H1's field architecture | **PASS, with the exception named** |

**Quantity safety, checked on all six drawings:** points, joins, dashes and one boundary rule only · no bar, width, area, fill percentage or length encodes demand, loss, volume, share or a rate · **no taper anywhere** · no per-stage colours · every dashed stretch means *unmeasured* and nothing else · the unattached arrival appears with no upstream segment and is labelled *it still counts*.

**Three specific honesty rules, and how each is met:**
- **F2 must not imply frequency.** No data exists on how common each cause is. The drawing carries `nothing on this drawing shows how common any of them is: that is not measured`, and the one ordering it states — START AT 04 — is a rule about the reader's procedure, stated with its reason.
- **F2 must not imply mutual exclusivity.** The drawing says `they are not alternatives — more than one can be true at the same time`.
- **F4 must not show an illustrative proportion.** No measured proportion of unattributed enquiries exists. The state drawing shows **six categories drawn identically, at the same size, none omitted and none rendered as a thin residual**, and says so: `the six are drawn identically: no proportion is shown, because none is measured`.

---

## 9. Blocked slots — what renders nothing

`03_PAGE_ARCHETYPES.md` §4.3: *a blocked slot renders nothing — not an empty container, not a placeholder, not a silhouette, not "coming soon"*, and the subtler failure, *reshaping the UX so that a missing load-bearing fact stops being needed*, is also prohibited.

| Route | Blocked slot | Treatment | Fabricated? |
|---|---|---|---|
| `/how-it-works` | §2 — the real delivery stages (F17) | **Renders nothing.** No heading, no container, no numbered outline. In particular the six-word stage outline from the brief (*diagnose · instrument · capture demand · convert demand · measure and report · extend*) is **not** drawn — the approved copy states it is architecture and "must not be published as though it were" a description of what happens | **No** |
| `/how-it-works` | §9 — what happens after an enquiry | **Renders nothing.** Owner input plus an EVIDENCE REQUIRED item that has never been produced | **No** |
| `/pricing` | §3 — the bands, inclusions, minimum, spend/fee split | **Renders nothing.** §2 and §4 read as consecutive chapters, MEASURED with no gap or seam. **A reader arriving from a cost query gets no number, and that is the honest state** | **No** |
| `/pricing` | §7's closing sentence, gated on the entry-offer decision | **Renders nothing.** The objection is answered in full without it | **No** |
| `/about` | §4 — the people | **Renders nothing.** No headcount, no unnamed roles, no silhouette, no stock photograph | **No** |
| `/about` | §6 — legal entity, address, phone, email, founding year | **Renders nothing**, and no page-level `Organization`/`LocalBusiness` JSON-LD is emitted | **No** |
| `/about` §5 · `/work` | links to both `/research` entries | **Render nothing** — neither route exists. The **measurement itself** still renders, with its full sample, date, location, language and access tier, because it is first-party and verified | **No** |
| `/faq` | Q2 in full — ad spend versus fee | **Renders nothing.** The question does not appear as an unanswered heading and no "it depends" stands in for it | **No** |
| `/faq` | the price half of Q1 and the minimum-length half of Q3 | **Render nothing.** Each question renders with the part that is unblocked and true on its own | **No** |
| `/faq` | Q12's quotation of Google's published position, `[VALIDATION REQUIRED]` | **Renders nothing.** The firm's own answer renders; the quotation and the attribution do not | **No** |
| `/contact` | §2 what happens next · §3 direct contact · §4 the NAP | **All render nothing.** No response time in any form; the production default phone is not carried forward | **No** |
| `/schedule-call` | who takes calls · call length · availability · phone · entry-offer framing | **All render nothing.** No duration, no availability claim, no "free" | **No** |
| `/thank-you` | §2 what happens next · §3 phone | **Render nothing.** The page is 53 words | **No** |
| `/problems/*` | Move 7's LOW-COMMITMENT link to the own-site diagnostic | **Renders nothing** — technical prerequisite. The finding stands and the paragraph closes up around it | **No** |
| `/problems/*` | Move 8's DIAGNOSTIC control's **label** | **The control renders nothing.** See §10 — this is the one place this phase departs from a wireframe margin note, and the reason is recorded | **No** |

**No blocked fact was filled, paraphrased, softened or routed around.**

### 9.1 One deliberate departure from a wireframe margin note, recorded rather than made silently

`33_WIREFRAME_MASTER_PROBLEM.md` says of Move 8's DIAGNOSTIC control: *"The control itself renders; only its label is undecided."* **It does not render here.** A button cannot be published without a label, and the approved copy lists **three candidate labels of which none is chosen**, all blocked on the entry-offer decision. Rendering one would be taking a commercial decision this session has no authority to take; inventing a fourth would be worse.

**What renders instead:** the diagnostic **offer itself**, in the approved Move 8 prose — *"we do this as a piece of work: the same five checks on your site and your data"* — so the reader still learns the offer exists; and the approved PRIMARY, *"Tell us what you're trying to fix"*, which is unblocked and is the page's last element exactly as the copy specifies. **The blocker is preserved, not disposed of.**

---

## 10. `/problems/traffic-but-no-enquiries` — the confirmed Phase G route

| Check | Result |
|---|---|
| Included | **YES — created.** The route did not exist |
| Copy | Approved Gate 9 copy, used verbatim; production-format changes only |
| Static | **YES — structurally.** MEASURED: 0 `use client` in the route's entire tree |
| Ungated | **YES.** No email wall, no sign-up, no download, no tool, no account |
| Scoreless | **YES.** MEASURED on the rendered page: 0 percentages, 0 grades, 0 ratings, 0 "X out of 10", 0 benchmarks, 0 traffic-light treatments |
| Saved state | **NONE.** `CheckSequence` has no state prop to pass one through |
| Figure / F2 | F2 at full depth. Two genuine drawings; exactly one visible at every MEASURED width |
| F6 | The five checks, as HTML in real list semantics — so they reflow, resize with the reader's text settings, select and print. H5 requires printability explicitly |
| Quantity safety | No size, share, rate or likelihood anywhere. Non-exclusivity and non-frequency both stated **on the drawing**, not only in prose |
| CTA above the fold | **NONE.** `RouteHero` is called without an `action` — structural, not remembered |
| CTA inside the checks | **NONE.** `CheckSequence` accepts no action slot — structural |
| Away-pointing findings | **All six render, in the copy's order, at identical weight.** `FindingList` has no emphasis, collapse or ordering control. No CTA sits beneath the self-fix finding |
| Deletion test (`06` §10.2) | Remove Move 8 entirely and 1,900+ words of runnable diagnostic remain. **PASS** |
| Responsive | 360 · 390 · 760 · 761 · 860 · 1080 · 1081 · 1425 — **0px overflow at all eight, 0 clipped SVG text, 0 label collisions** |
| Result | **PASS** |

---

## 11. Copy integrity

Approved copy is used **verbatim**; the only changes are production-format ones — headings, line breaks, link labels and component fit. Specific checks:

- **`/faq`'s section heading reads "Questions we get asked", not "The twelve questions".** With Q2 blocked out, stating a count would state a number that does not match the page. Phase F made the same adjustment on `/ai-seo` for the same reason.
- **`/pricing`'s hero does not say "Prices are below".** That approved sentence rests on §3, which is blocked. The half of it that is true and load-bearing renders; nothing was invented to replace the other half.
- **`/blog`'s approved hero line and its two cluster descriptions render only when articles exist.** They describe a body of work that does not exist yet, and a conditional render is the honest form of that.
- **`/contact`'s hero does not say "four questions".** The form in production asks eight fields. The count returns when H1 builds the 4+3 form.
- **`/schedule-call` never uses "free", "complimentary", "audit" or "strategy session"** — MEASURED, 0 occurrences in `<main>`.
- **`/thank-you` carries no response time in any form** — MEASURED, 0 occurrences of any hours/days/"shortly" pattern.

---

## 12. Content-integrity sweep

Run against the **rendered `<main>`** of all eleven routes on a production build. Shared chrome is measured separately in §14 because it is identical on every route including the untouched homepage.

| Pattern | Result in Phase G route bodies |
|---|---|
| `300%+` · `₹100Cr+` · `₹10Cr+` · any rupee figure | **0** |
| ROI · ROAS · CPA | **0** |
| bare percentages · multipliers (`3x`, `6x`) | **0** |
| fake pricing, tiers, bands, "from" figures | **0** |
| fake process / stages / steps | **0** |
| fake team facts, headcount, founding year, certifications, awards | **0** |
| fake case studies, client logos, "trusted by", ratings, review counts | **0** |
| fake testimonials | **0** |
| ranking, AI-visibility or revenue guarantees | **0** |
| response-time promises | **0** |
| "coming soon" / placeholder entries | **0** |
| scores, grades, health ratings | **0** |

**Every occurrence the sweep flagged is a DENIAL or a REFUSAL, not a claim**, and each is approved copy: *"Anyone who needs the outcome guaranteed… this is not where to get it"* · *"Why won't you guarantee results?" — "Because we do not control…"* · *"We do not produce a score"* · *"no logo wall, no 'trusted by' strip, no rating, no review count and no client count. None of those exists."*

**Every number that survives carries its sample, date, location, language and access tier:** 28 unbranded runs · 4 systems · one day · Pune · English · signed out · directory sources in 15 of 28 · two systems not testable. All are Session 04 first-party measurements, and all travel with the standing note that these are **counts, not rates**, from **one round on one day**.

### 12.1 Three unsupported claims found inside a legacy component, and removed

The sweep found them on the **rendered** `/contact` page, not in the route file — they live in `components/forms/ContactForm.tsx`, which Phase H1 owns. Leaving them would have left unsupported claims on a translated route body, which is a stop condition. **Only the claims were removed. No field, no validation rule, no submit behaviour and no tracking call was touched:**

1. A trust strip reading **"✓ We respond within 24 hours | ✓ No pushy sales calls | ✓ Your info is secure"**. Three claims, none supported: no response time has been measured, no follow-up behaviour has been committed to, and the form transmits nothing, so no security property of the transmission can be asserted. **Nothing replaces it.**
2. The success-state sentence **"Our team will review your details and get back to you within 24 hours."** The number had no provenance. Replaced with *"Nothing else is needed from you."*
3. The submit label **"Submit — We'll Call You"**, a commitment nobody had made. Replaced with **"Send this"**, which is the approved submit label in `copy/contact.md` §1.

**The success state itself is still false** — it is reached on a client-side timer with no transmission — and that is H1's to fix. Phase G did not build a backend and did not make the failure less visible; it removed the claims it could remove.

---

## 13. `/schedule-call` — why the booking component is no longer rendered, and what was not changed

The first pass of this session rendered `CalendlyEmbed` unchanged. **Measuring the server-rendered HTML caught a problem the component's source does not make obvious:** its initial client state is "no URL", so the only thing it ever puts in the server-rendered document is its **fallback** — and that fallback **publishes a hard-coded phone number and email address**, both owner-blocked entity facts. To a visitor with JavaScript disabled it also read as an internal configuration error message.

**Every other surface in this phase renders nothing rather than a partial or unconfirmed fact set.** A translated route publishing them through a component would have defeated that everywhere at once, so the route now links to the booking page directly instead.

**What did NOT change:** the vendor, the URL, the `NEXT_PUBLIC_CALENDLY_URL` environment variable and its default, and the component file itself, which is unmodified and still in the repository. **No booking backend was implemented, no second provider was added, no availability is stated and no confirmation of any kind is produced.** The link opens the booking page; the booking page is the only thing that can say what is open.

**What Phase H1 must still resolve, recorded not patched:** the embed does not work (the component mounts Calendly's INLINE container and then calls `initBadgeWidget`, the FLOATING BADGE API, so the container is never populated — consistent with the verified production observation of an empty container and zero iframes); `initBadgeWidget` injects a floating persistent element, which the Resolve budget puts at 0; the fallback's hard-coded phone and email must go before the component is used anywhere again; and the open question of whether the tool can accept runtime custom fields and expose the completed booking server-side.

---

## 14. Shared chrome — regression PASS, and four findings recorded

MEASURED on the rendered page at 1425 and 390, from a Phase G route:

| Check | Result |
|---|---|
| Header `position` after load | `relative` — **non-sticky** |
| Header `box-shadow` / `backdrop-filter` | `none` / `none` |
| Direct `/services` link in the header | **1** |
| `/contact` CTA in the header | **1** |
| Footer primary CTA | **"Contact Us" → `/contact`** |
| Footer secondary | booking → `/schedule-call` |
| `position: sticky` or `fixed` anywhere in the document | **0** |
| Elements carrying a `box-shadow` | **0** |
| Mobile trigger size | **40×40** |
| Mobile panel opens · 13 visible links · `/services` and `/contact` reachable | **yes** |
| `Escape` closes the panel and returns focus to the trigger | **yes — MEASURED, `document.activeElement === trigger`** |
| Focusable elements hidden while closed | **0** |

**Files changed in `components/layout/`: ZERO. `app/layout.tsx`: ZERO.** Phase B is not regressed.

**Four findings, recorded and NOT fixed.** All are shared chrome, all pre-date this phase, and all are present identically on the untouched homepage and on every Phase F route.

1. **`app/layout.tsx` emits `Organization` and `LocalBusiness` JSON-LD on every route**, built by `lib/schema.ts` from the owner-blocked entity facts: the published phone and email, the superseded *"Performance marketing agency specializing in…"* description, and a `PostalAddress` whose **`postalCode` field contains the word "India"**. `03` §4.2 requires all entity schema to render nothing rather than a partial address. **This is the single most consequential of the four** — it is the fact set that local discovery and branded AI answers are assembled from, and it contradicts what every Phase G page now says by omission. **New finding this session.**
2. **The footer's commercial strip carries "Book a **free** strategy call"** and a "Schedule Free Strategy Call" button. "Free" is blocked on the entry-offer decision and no candidate may say it until that decision is recorded. **New finding this session.**
3. **The footer's CTA strip is a second ask on `/thank-you`**, whose approved copy prohibits a second ask of any kind. The route's own body has none; the shared footer supplies one. This is the sharpest form of the F10 double close and it cannot be solved inside a route file. **New finding this session.**
4. Phase F's two footer findings are **unchanged and still open**: the legacy positioning language (*"improve **ROI**"*, *"Performance Marketing | Lead Generation | SEO | **CRO**"*) and the **`<h4>` under `<h2>` heading jump on every page of the site**.

**Disposition for all four: DEFER to the shared-commercial / shared-chrome reconciliation pass**, per the session brief's standing instruction. Not fixed here.

---

## 15. Responsive validation

Driven through a real browser against a production build, measuring `getBoundingClientRect` and `getBBox` on the rendered page — not read from CSS.

| Route | 390 | 860 | 1425 | Extra boundaries | Horizontal overflow | Visual result |
|---|---|---|---|---|---|---|
| `/problems/traffic-but-no-enquiries` | PASS | PASS | PASS | **360 · 760 · 761 · 1080 · 1081 — all PASS** | **0px at all eight** | PASS |
| `/how-it-works` | PASS | PASS | PASS | **360 · 760 · 761 · 1080 · 1081 — all PASS** | **0px at all eight** | PASS |
| `/pricing` | PASS | PASS | PASS | 1081 | **0px** | PASS |
| `/about` · `/faq` · `/contact` · `/schedule-call` · `/thank-you` · `/work` · `/blog` · `not-found` | PASS | PASS | PASS | — | **0px** | PASS |

- **Figure switching, MEASURED at every width:** exactly **one drawing visible per figure**, always. At **760** both figures render their vertical form; at **761** both render their horizontal form. The one-pixel hole Phase F found at exactly 760px cannot recur — one media query governs both drawings and the two conditions are exact complements.
- **SVG text containment, `getBBox` against each viewBox:** **0 clipped strings on any drawing at any width.** SVG clips at the viewBox, so this is silent content loss with a document overflow of 0 — it is checked by measurement, not by looking.
- **SVG label collisions**, every text bounding box compared against every other: **0 at every width on all six drawings.**
- **One text-versus-line collision found and fixed by looking at the rendering**, which the text-versus-text sweep does not catch: `/how-it-works`'s *"the qualified enquiry"* label was start-anchored at x=640 and ran to ~774, **crossing the accountability boundary rule at x=760** — the one line on that drawing that must stay unambiguous. End-anchored at 750 in both the FULL and the STATE drawing. Re-MEASURED and re-rendered: clear.
- **Wide tables scroll inside their own region, never the page.** MEASURED at 390: `/pricing`'s factor matrix is 620 units wide inside a region whose right edge is 372 against a 390 viewport, and the document overflow is 0 — which is what `48` §M7 requires. At 1425 the table fits and does not scroll at all.
- **Blocked-slot whitespace:** MEASURED and looked at. `/pricing` §2 → §4 and `/how-it-works` §1 → §3 read as consecutive chapters with no gap, marker or seam where the blocked section would sit.

---

## 16. Conditional route review

| Route | Condition | Satisfied? | Action |
|---|---|---|---|
| `/industries/manufacturing` | The manufacturing validation gate, including one completed industrial engagement with a publishable result | **NO — the gate is OPEN** (`DEC-019` confirms it was not resolved by Gate 10) | **Not built.** No sector claim, customer, outcome, statistic or case study was created. It ships or defers **as a pair** with its supporting article |
| `/blog/{industrial-b2b}` | The same gate | **NO** | Not built |
| `/research` | The entries it indexes must exist; plus `[DECISION REQUIRED — one entry or two]` | **NO** — neither entry is drafted, and the decision is unrecorded | **Deferred.** No research material was created to justify the route |
| `/research/{ai-visibility-baseline}` | Copy production (the dataset itself is READY) | **NO — not drafted** | Deferred |
| `/research/{own-site-enquiry-diagnostic}` | Technical prerequisite: the own-site fixes shipped | **NO** | Deferred. Until the fixes ship it is a list of live defects, not research |
| `/blog` | ≥3 published articles | **NO — none exists** | **Route retained partially.** Listing architecture translated; no article, card, stub, date or byline invented |
| `/work` | ≥1 permissioned case study | **NO — none exists** | Honest proof-pending state; `noindex` added |

**No conditional route was launched, and no material was created to make a condition appear satisfied.**

---

## 17. Deferred / blocked — not fixed, not hidden

| Item | Reason | Later phase |
|---|---|---|
| `/work/[slug]` not created | Zero case studies exist, and the route only earns its place alongside the `/portfolio/:slug` → `/work/:slug` redirects, which are **out of Phase G scope by binding instruction** | with the redirect pass |
| `/blog/[slug]` untouched | No article exists to render through it; bylines are owner-blocked; pagination before the CMS's 100-item ceiling is a Phase I item | editorial + I |
| `/portfolio/[slug]` untouched, `/portfolio` and `/results/:slug` redirects not created | Redirect work, excluded by binding instruction | redirect pass |
| `/privacy-policy` and `/terms` untouched | `PAGE_COPY_INDEX.md` §3: **NOT DRAFTED — requires legal review, not copywriting.** Both already render on the Resolve token set from Phase A, both are `noindex`, and their "guarantee"/"ROAS"/"100%" hits are all disclaimers. Both publish the owner-blocked phone and email, which is a legal-content question, not a Phase G one | legal review |
| `/work` still listed in `app/sitemap.ts` | **Sitemap work is out of scope by binding instruction.** The route is `noindex` regardless of what the sitemap says, but the two disagree and should be reconciled | launch / SEO hardening |
| `/ai-seo` and `/problems/traffic-but-no-enquiries` absent from `app/sitemap.ts` | Same | launch / SEO hardening |
| `/blog` indexable with nothing on it | Route-metadata change beyond what the Phase G plan authorises (it authorises `noindex` for `/work` only) | launch / SEO hardening |
| `/thank-you` orphaned | **Correct today.** H1 wires it behind server-confirmed persistence; Phase G deliberately created no path to it | **H1** |
| Contact form: budget field, required phone, service select, client-side `dataLayer` push, fake success on a timer | **Phase H1 owns the 4+3 field form and the backend.** Recorded in full in §12.1 | **H1** |
| `components/ui/select.tsx` renders a **36px-tall trigger**, below the 40×40 floor, on `/contact`'s two selects | Shared `ui` component (Phase B). Both offending controls are removed by H1's field architecture in any case | H1 + shared-chrome pass |
| Booking: broken embed, `initBadgeWidget` floating element, hard-coded phone/email in the fallback, custom-fields/server-side question | §13 | **H1** |
| Site-wide `Organization`/`LocalBusiness` schema built from blocked and malformed entity facts | §14 finding 1. `app/layout.tsx` + `lib/schema.ts` — shared chrome | shared-chrome / entity pass |
| Footer "free strategy call"; footer second ask on `/thank-you`; footer "improve ROI" / "SEO \| CRO"; footer `<h4>` heading jump; F10 double close | §14 findings 2–4 and Phase F's carried findings | shared-commercial / shared-chrome pass |
| Header mobile "Book a call" at 39px; homepage stage tabs at 508×29 | Pre-existing, carried from Phase F | shared-chrome pass / later |
| `/how-it-works` §11's approved RESEARCH links; `/about` §5's two research links | Neither `/research` route exists; no link renders to a 404 | with `/research` |
| `/research/ai-visibility-baseline` links on the homepage and `/ai-seo` still 404 | Pre-existing, carried from Phase F. Phase G created `/problems/traffic-but-no-enquiries`, which **resolves four previously dangling links** (`/seo` ×2, `/google-ads`, `/lead-generation`, `/conversion-optimization`) and the homepage's | with `/research` |
| `ServiceCard`, `IndustryCard`, `ProblemCard`, `StatCard`, `TeamCard`, `TestimonialCard`, `PricingCard`, `ProcessStepCard`, `ValueCard`, `BeforeAfterMetric`, `lib/constants.ts` now orphaned | The orphan set is final now that the routes are translated. Deliberately not deleted in this phase | cleanup pass, now unblocked |
| `ignoreBuildErrors: true` still set | Pre-existing. **0 type errors originate in any Phase G file** — MEASURED with `tsc --noEmit`: 18 errors total, every one pre-existing (`window.gtag` typings ×15, `CalendlyButton` size union, `lib/metadata.ts` `canonical`) | **I** |
| Screen-reader, real-device, cross-browser, print, 200% text-resize, real-hardware performance | **Never performed by this programme and not performed here. None may be reported as passed** | **I** |

---

## 18. No-JS

**Every Phase G route is complete with JavaScript disabled, structurally rather than by fallback**, because every route file and every new component is a Server Component. Verified against the **server-rendered HTML only**, with no page JavaScript executed:

| Route | H1 | Approved copy | Figures | Boundaries | CTA | Footer | Result |
|---|---|---|---|---|---|---|---|
| `/problems/*` | 1 | present | both F2 drawings + all five checks present | present | present | present | **PASS** |
| `/how-it-works` | 1 | present | all four drawings present | present | present | present | **PASS** |
| `/pricing` | 1 | present | factor matrix present | present | present | present | **PASS** |
| `/about` · `/faq` · `/work` · `/blog` · `/thank-you` · `not-found` | 1 | present | N/A (D — NONE) | present | present | present | **PASS** |
| `/contact` | 1 | present | N/A | N/A | **the form renders server-side** — 5 inputs, 1 textarea, 3 buttons MEASURED in the server HTML | present | **PASS** |
| `/schedule-call` | 1 | present | N/A | N/A | **the booking link is a plain `<a>` and works with JS off** | present | **PASS** |

**0 critical blank sections. No copy, figure, check, finding or link is created by client JavaScript on any Phase G route.** The `/schedule-call` change in §13 improved this: the previous component produced only an error-shaped fallback with JS off.

---

## 19. Motion and reduced motion

**All eleven Phase G routes are STATIC. Motion tiers used: T1 = 0 · T2 = 0 · T3 = 0 · signature = 0 · ambient = 0 · pinned = 0 · sticky = 0.** Every route is under the budget, and the brief's instruction is *"prefer significantly less"*.

No new animation framework, no new motion language, no ambient loop, no pinned content, no scroll-jacking, no fake metric animation. `app/resolve-motion.css` and `hooks/use-resolve-motion.ts` were not touched and are not imported by any Phase G file.

**Reduced motion: NOT APPLICABLE — static routes**, and **no motion was added in order to make the test applicable.** The claim is structural: with zero client components and zero animations in any Phase G route body there is nothing for `prefers-reduced-motion` to reduce. The global reduced-motion floor in `app/globals.css` remains in force for shared chrome and is unchanged.

---

## 20. Accessibility

MEASURED on the rendered page:

| Check | Result |
|---|---|
| Exactly one `<h1>` per route | **11/11** |
| Heading sequence inside `<main>` | **0 jumps on all 11 routes** (the site-wide `2 → 4` jump is the footer — §14, pre-existing) |
| Semantic sections | `<section>` per chapter; `<nav aria-label="Breadcrumb">`; `<figure>`/`<figcaption>`; `<dl>` for findings and questions; `<ol>` for the checks; a real `<table>` with `<caption>` and `scope="col"`/`scope="row"` for the factor matrix |
| Figures accessible | `role="img"` + `<title>` + `<desc>` on all six drawings; the hidden drawing is `display:none`, so **one accessible name is exposed per figure, not two** |
| Decorative elements hidden from AT | every `Mark` and every ornamental rule carries `aria-hidden="true"` |
| No colour-only meaning | every mark state is also stated in words; every zone, category and limit names itself |
| Meaningful link names | no "click here" / "read more"; every routing link names its destination |
| Keyboard operation | no custom widgets, no `tabindex`, no focus traps on any Phase G route — every control is a native link, or a native form control in the Phase H1 form |
| Focus visible | global `:focus-visible` from Phase A, never suppressed |
| Target sizing | **0 non-inline controls under 40×40 in any Phase G route body, at any width**, with **one exception**: `/contact`'s two legacy `Select` triggers measure 36px tall. Both come from `components/ui/select.tsx` and both controls are removed by H1's field architecture. Inline links inside running prose measure under 40px — as they do on the validated Phase F routes, MEASURED — and are exempt under the inline-target exception |
| No horizontal content loss | **0px page overflow at every width tested**; the one wide table scrolls inside its own region |

---

## 21. Homepage regression

MEASURED at 390 and 1425 after Phase G, on a production build:

| Check | 390 | 1425 |
|---|---|---|
| Horizontal overflow | 0px | 0px |
| `<h1>` | *"Judge us on the enquiries, not the traffic."* | same, at **99.75px** |
| F1 drawings visible | **1**, viewBox `0 0 330 500` | **1**, viewBox `0 0 1000 216` |
| Composition reveals (`.rsv-rv`) | **21** | **21** |
| Signature control (`aria-pressed`) | present ×2 | present ×2 |
| Stage tablist | 3 tabs | 3 tabs |
| `position: sticky` / `fixed` | 0 | 0 |

**Static baseline, motion, F1, responsive behaviour and the final CTA are all unchanged**, and the figures match Phase F's recorded homepage baseline exactly. No Phase G component is imported by any homepage file, and `git status` confirms **zero homepage files modified**.

---

## 22. Phase F regression

MEASURED at 390 and 1425:

| Route | Overflow | Sticky/fixed | F1 class | Result |
|---|---|---|---|---|
| `/services` | 0px / 0px | 0 | FULL — `330×636` / `1000×268` | **unchanged** |
| `/seo` | 0px / 0px | 0 | PARTIAL — `300×400` / `620×200` | **unchanged** |
| `/ai-seo` | 0px / 0px | 0 | **NONE** — 0 svg; layer table scrolls in its own region (right edge 372 < 390) | **unchanged** |
| `/google-ads` | 0px / 0px | 0 | **NONE** — 0 svg | **unchanged** |
| `/social-media-ads` | 0px / 0px | 0 | **NONE** — 0 svg | **unchanged** |
| `/lead-generation` | 0px / 0px | 0 | STATE — `330×420` / `620×250` | **unchanged** |
| `/conversion-optimization` | 0px / 0px | 0 | PARTIAL — `330×430` / `620×250` | **unchanged** |

**Every value matches Phase F's own record.** No shared route primitive changed their validated presentation — Phase G imports Phase F components but modified none of them.

---

## 23. Cross-route system review

- **Cohesion:** one system, eighteen routes. Shared identity comes from typography (Bricolage/Manrope), the accent ramp, the four mark states, the hairline rule, the chapter-label/display pair and the CTA architecture — never from repeating a chapter sequence.
- **Repetition:** eleven Phase G routes across **eight distinct archetypes**, with no two sequences alike (§7) and a **46× spread in length**. A system that is consistent but monotonous is not a pass, and this one is not monotonous.
- **F1 discipline:** F1 appears on **one** of the eleven Phase G routes, and that route is one of only three on the site the taxonomy assigns the full figure. **Ten of eleven carry no run at all**, which is what D-as-default means in practice.
- **Card-grid regression: none.** No card grid, no icon per item, no equal-weight tile, no stat tile, no badge cluster on any route. Both indexes are hairline rows.
- **Orange overuse: no.** The tangerine ramp carries emphasis, the owned mark, the primary CTA and the boundary rules — nothing else. **The full-bleed tangerine surface inversion remains homepage-only.** No Phase G route inverts the ground.
- **Typography hierarchy:** consistent and one rank below the homepage — Phase G H1s clamp to 3.9rem (2.7–3.1rem on the three conversion/post-conversion surfaces, deliberately quieter) against the homepage's measured 99.75px.
- **CTA architecture:** `/contact` primary and booking secondary on every route that carries a pair. **No route elevates `/schedule-call` over `/contact`** — including `/pricing`, whose approved copy asks for booking to be *emphasised*: it is emphasised in the words and in the hero's secondary label, while the primary control remains `/contact`. `/problems/*` carries no CTA above the fold; `/thank-you` carries none at all; `/contact` and `/schedule-call` carry one conversion object each and one neutral cross-link.
- **Evidence honesty:** consistent. Every claim carries its sample; every limit is adjacent, open and never collapsible; every boundary states what is not promised; and three routes now say plainly that the firm cannot show something.

---

## 24. Builds

| | Standard | cPanel |
|---|---|---|
| Command | `npm run build` | `npm run build:cpanel` |
| Result | **PASS** (exit 0) | **PASS** (exit 0) |
| Constraints | none | `NODE_OPTIONS=--max-old-space-size=512`, `CPANEL_BUILD=1`, `RAYON_NUM_THREADS=1`, `UV_THREADPOOL_SIZE=1` |
| Route rows | **26** (was 25) | **26** (was 25) |
| Static pages generated | **25/25** (was 24/24) | **25/25**, single worker |
| Memory anomalies | none | **none — the 512 MB ceiling was not raised** |

**The route-count change is fully explained: +1 row and +1 static page, both `/problems/traffic-but-no-enquiries`.** No other route was added, removed or changed kind. `/blog/[slug]` and `/portfolio/[slug]` remain SSG; `/work` and `/blog` keep their existing 60-second revalidate.

**Warnings: one, on both, and PRE-EXISTING** — the multiple-lockfile workspace-root warning Phase A documented (a stray `package-lock.json` in the user's home directory, outside this repository). `[contentful] Missing CONTENTFUL_SPACE_ID` is likewise the pre-existing environment condition already recorded in `CURRENT_STATE.md`. **No new warning was introduced.**

`next-env.d.ts` and `tsconfig.tsbuildinfo` picked up the build churn Phase A documented and were restored with `git restore` before staging.

---

## 25. Rollback boundary

Phase G is **one commit** containing one new route, ten rewritten route files, six new components, three claim removals in one legacy form component, and this document.

- **Full rollback:** `git revert <commit>` restores the ten legacy pages and removes `/problems/traffic-but-no-enquiries` and `components/routes/`.
- **Per-route rollback** is possible and clean: each route file is independent and the new components are additive — reverting one route file does not affect another.
- **No data migration, no schema change, no config change, no content change outside the eleven routes and the three claim removals.**
- **The homepage, all seven Phase F routes, shared chrome, tokens, the motion layer, forms behaviour, analytics, robots, the sitemap and the redirect config are untouched**, so no rollback of this commit can disturb Phases A–F.
