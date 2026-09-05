# Session 28 — Phase F — Commercial Route Translation

**Session:** 28 · **Date:** 2026-09-05 · **Branch:** `test_branch`
**Starting HEAD:** `63a441d3f5e4d8387abd541f6c6943b553d15ea5` (*"fix: harden Resolve responsive fallbacks"* — Phase E)
**`origin/test_branch`:** `4780d4b37346dbb4e2ac332d8490191de3a85f9e` — local was already ahead; **nothing pushed.**
**Type:** Production translation of the approved Resolve system onto the high-intent commercial routes. Six routes rewritten, one created, eight new shared components. No homepage change, no shared-chrome change, no forms, no analytics, no robots, no sitemap.

**Evidence labels used strictly:** **CONFIGURED** = read from the repository · **MEASURED** = a number produced by running something against a rendered page · **OBSERVED** = seen directly in output.

---

## 1. Route-scope reconciliation — the first finding of this session

The session brief listed eight candidate routes and instructed that the list be reconciled against the authoritative Phase F record before anything was built. **It does not match, and the authoritative record governs.**

`06_IMPLEMENTATION_SEQUENCE.md`, Phase F, defines the scope as:

> `/services` · `/seo` · `/google-ads` · `/social-media-ads` · `/lead-generation` · `/conversion-optimization` · **new `/ai-seo`**

**`/problems/traffic-but-no-enquiries` is Phase G, not Phase F.** It appears in that document's Phase G scope line as **new** `/problems/traffic-but-no-enquiries`, alongside `/how-it-works`, `/pricing`, `/about`, `/faq`, `/work` and the research routes. `03_PAGE_ARCHETYPES.md` §1 classifies it as archetype **4 — problem diagnostic**, a different archetype from the six commercial/capability pages, with its own wireframe master (`33_WIREFRAME_MASTER_PROBLEM.md`) and its own F2-at-full-depth figure.

**It was therefore NOT built.** Building it here would have pulled a Phase G archetype forward on the strength of a prompt line, against the record the prompt itself said to defer to.

**`/ai-seo` WAS created**, because the same authoritative line places it in Phase F explicitly. Phase A recorded the missing route as a finding rather than fixing it (`11_PHASE_A_FOUNDATION.md` §11, §16.4) and Phase B repeated the record (`12_PHASE_B_SHARED_CHROME.md` §16.3). This is the phase the plan assigns it to.

**Seven routes translated. One candidate deferred with cause.**

## 2. Authoritative sources read before editing

| Source | Used for |
|---|---|
| `27/06_IMPLEMENTATION_SEQUENCE.md` | Phase F route scope, acceptance criteria, per-page motion budget |
| `27/03_PAGE_ARCHETYPES.md` | Archetype assignment, blocked-slot rule, F1 production translation |
| `27/02_COMPONENT_MAP.md` | Component reuse classes, the design-system map, the server/client rule |
| `27/04_MOTION_IMPLEMENTATION.md` | Motion tiers, the anti-tic rules M1–M7 |
| `27/11`–`15` (Phases A–E) | Token set, chrome contract, the homepage baseline this must not disturb |
| `16-ux/22_F1_USAGE_TAXONOMY.md` | **BINDING** F1 class per route |
| `16-ux/23_COMMERCIAL_PAGE_DIFFERENTIATION_TEST.md` | The frozen per-route move sequences and the clone-failure conditions |
| `16-ux/32_WIREFRAME_MASTER_COMMERCIAL.md` | Invariants I1–I13, the `/seo` master |
| `16-ux/37`, `38`, `39`, `42` | The `/ai-seo`, `/conversion-optimization`, `/social-media-ads` and `/services` variants |
| `16-ux/12_RESPONSIVE_UX.md` | Narrow-width content priority |
| `08-messaging/AI_SEARCH_LANGUAGE.md`, `CLAIMS_LADDER.md` | `/ai-seo` positioning guards, the four layers, the crawler tokens |
| `09-content-pages/copy/*.md` (7 files) | The approved route copy |
| `09-content-pages/PAGE_COPY_INDEX.md` | Per-route copy status and owner blockers |

## 3. Route scope, copy status, archetype, F1

| Route | Included | Copy status (PAGE_COPY_INDEX §1) | Archetype | F1 mode |
|---|---|---|---|---|
| `/services` | **YES** | COPY APPROVED (Gate 9, `DEC-014`) · FINAL-CANDIDATE | 2 — proposition hub | **A — FULL**, joins marked |
| `/seo` | **YES** | COPY APPROVED · FINAL-CANDIDATE | 3 — commercial/capability (the master) | **B — PARTIAL**, discovery |
| `/ai-seo` | **YES — CREATED** | COPY APPROVED · FINAL-CANDIDATE, **one `[VALIDATION REQUIRED]` claim** | 3 — high-scepticism variant | **D — NONE** |
| `/google-ads` | **YES** | **PARTIALLY BLOCKED** — file header reads "PROPOSED COPY — NOT APPROVED" | 3 — commercial/capability | **D — NONE** |
| `/social-media-ads` | **YES** | COPY APPROVED · FINAL-CANDIDATE | 3 — minimal variant | **D — NONE** |
| `/lead-generation` | **YES** | COPY APPROVED · FINAL-CANDIDATE | 3 — master + 2 stated departures | **C — STATE**, terminus |
| `/conversion-optimization` | **YES** | COPY APPROVED · FINAL-CANDIDATE | 3 — diagnostic-led variant | **B — PARTIAL**, landing/enquiry |
| `/problems/traffic-but-no-enquiries` | **NO — PHASE G** | FINAL-CANDIDATE | 4 — problem diagnostic | D — NONE |

## 4. Old route audit — what was replaced

Every one of the six existing routes was a legacy composition built on the superseded palette, and **every one carried unsupported proof.** MEASURED by grepping each file before rewriting:

| Route | Lines before | Architecture before | Unsupported material found | Action |
|---|---:|---|---|---|
| `/services` | 671 | `Hero`, `StatCard`, `ServiceCard`, `IndustryCard`, `FAQSection`, `CTASection`, 5 lucide icons | **300%+ ROI** ×2 · **₹100Cr+** ×2 · ROAS ×5 · a 65% figure | Replaced wholesale |
| `/seo` | 612 | `Card`/`Badge`/`Accordion` grids, 10 lucide icons, `SEO_*` + `SEO_PRICING_TIERS` constants | a 200% traffic claim · 45% · 2% · **three invented pricing tiers** | Replaced wholesale |
| `/google-ads` | 593 | `Hero`, `ServiceCard`, `ProblemCard`, `CaseStudyCard`, accordion | **300%+ ROI** ×3 · **₹100Cr+** · ROAS ×6 incl. 3x/6x/5x · a fabricated case-study card · 2 guarantee statements | Replaced wholesale |
| `/social-media-ads` | 647 | `Card`/`Badge`/`Accordion`, `SOCIAL_MEDIA_ADS_*` + **`TESTIMONIALS`** constants | **₹100Cr+** · ROAS ×5 incl. 6x · 25% · **a testimonial block, and no permissioned testimonial exists** | Replaced wholesale |
| `/lead-generation` | 634 | `Card`/`Badge`/`Accordion`, `LEAD_GEN_*` + `LEAD_GEN_PRICING_TIERS` | **300%+** · **₹100Cr+** · ROI · a fabricated 40/20/8% funnel · **three invented pricing tiers** | Replaced wholesale |
| `/conversion-optimization` | 651 | `Card`/`Badge`/`Accordion`, `CRO_*` + `CRO_PRICING_TIERS` | 150% · 98% · 3x · **a 2%→5% before/after** · 45% · 60% · **three invented pricing tiers** | Replaced wholesale |

**Every one of these routes carried the exact fabrications its own approved copy exists to argue against.** The `/conversion-optimization` before/after is the sharpest case: the approved copy's boundary says *"we have no before-and-after of our own to show you"* while the shipped page displayed a 2%→5% comparison.

**Legacy components: nothing was deleted.** Three components and one constants module become orphaned by this phase — **MEASURED, `grep -rl` over `app/` and `components/` now returns zero call sites for each:**

| Newly orphaned | Deleted? |
|---|---|
| `components/cards/ServiceCard.tsx` · `IndustryCard.tsx` · `ProblemCard.tsx` | **NO** |
| `lib/constants.ts` (1263 lines, incl. `TESTIMONIALS` and every `*_PRICING_TIERS` block) | **NO** |

They are left in place and recorded. `27_ROUTE-AUDIT` in the session brief requires proving a shared component is orphaned before deleting it; proving it is not the same as being authorised to delete it in this phase, and deleting `lib/constants.ts` in particular would widen the diff well past Phase F. **Deferred to a cleanup pass after Phase G, when the remaining routes have been translated and the orphan set is final.**

`CaseStudyCard` (still used by `/work` and `ResultsFilter`), `StatCard` (`/about`, `/pricing`), `Hero`, `CTASection` and `FAQSection` (many routes) remain in use and were not touched.

## 5. Files changed

| File | Action | Purpose |
|---|---|---|
| `app/(pages)/services/page.tsx` | Rewritten (671 → 357) | Proposition hub, nine approved blocks, F1 FULL with joins marked |
| `app/(pages)/seo/page.tsx` | Rewritten (612 → 274) | Capability master, horizon boundary, F1 PARTIAL discovery |
| `app/(pages)/ai-seo/page.tsx` | **Created** (320) | High-scepticism variant, evidence before boundary, F1 NONE |
| `app/(pages)/google-ads/page.tsx` | Rewritten (593 → 244) | Earliest boundary, F1 NONE, owner-blocked slot renders nothing |
| `app/(pages)/social-media-ads/page.tsx` | Rewritten (647 → 148) | Minimal variant, F1 NONE, deliberately the shortest page |
| `app/(pages)/lead-generation/page.tsx` | Rewritten (634 → 290) | Definition before boundary, F1 STATE at the terminus |
| `app/(pages)/conversion-optimization/page.tsx` | Rewritten (651 → 247) | Diagnostic-led, figure as the second move, F1 PARTIAL |
| `components/commercial/primitives.tsx` | Created (252) | Breadcrumb (+ its own `BreadcrumbList`), section, chapter label, display, lede, body, note, marks, proof link, action pair |
| `components/commercial/CommercialHero.tsx` | Created (53) | Move 1+2 opener. **Accepts no figure slot** — I2 made structural |
| `components/commercial/ScopeList.tsx` | Created (38) | "What the work involves" as hairline rows |
| `components/commercial/BoundaryBlock.tsx` | Created (71) | The boundary. No disclosure, never collapsible |
| `components/commercial/QuestionList.tsx` | Created (31) | Objections as an open `<dl>`, never an accordion |
| `components/commercial/CommercialClose.tsx` | Created (55) | Move 9, deliberately quieter than the homepage close |
| `components/commercial/ChainFigure.tsx` | Created (615) | F1 in its FULL / PARTIAL×2 / STATE classes, two genuine drawings each |
| `components/commercial/AiLayers.tsx` | Created (177) | `/ai-seo` only: the four layers, and the crawler-token table |
| `docs/27-production-translation/16_PHASE_F_COMMERCIAL_ROUTES.md` | Created | This record |

**Net: 3,689 lines deleted, 1,441 added across the six rewritten routes**, plus 1,292 lines of new shared components and 320 for the new route.

**Not touched, and verified so by `git status`:** every homepage file, `components/layout/*`, `components/ui/*`, `app/globals.css`, `app/resolve-motion.css`, `app/layout.tsx`, `hooks/*`, `lib/*`, `app/robots.ts`, `app/sitemap.ts`, `next.config.mjs`, all forms, all analytics, both prototypes, all governance, `README.md`.

`next-env.d.ts` and `tsconfig.tsbuildinfo` picked up the build churn Phase A documented and were restored with `git restore` before staging.

## 6. Shared commercial architecture

**Eight components, and the reason each exists is a named approved page use** (`08_RISK_REGISTER.md` R10 — reuse is *proven* in Phase F, not asserted):

| Component | Used by |
|---|---|
| `Breadcrumb` | the six capability routes (**not** `/services`, which is top level) |
| `CommercialSection`, `ChapterLabel`, `Display`, `Lede`, `Body`, `Note`, `Mark`, `ProofLink`, `ActionPair` | all seven |
| `CommercialHero` | all seven |
| `CommercialClose` | all seven |
| `ScopeList` | `/services`, `/seo`, `/ai-seo`, `/google-ads`, `/lead-generation`, `/conversion-optimization` |
| `BoundaryBlock` | all seven |
| `QuestionList` | `/seo`, `/ai-seo`, `/lead-generation` |
| `ChainFigure` (4 exports) | `/services`, `/seo`, `/lead-generation`, `/conversion-optimization` |
| `AiLayers`, `CrawlerTable` | `/ai-seo` only |

- **Route-specific components:** two (`AiLayers`, `CrawlerTable`), both on the one route whose figure is not F1.
- **New client components: ZERO.** Every Phase F file is a Server Component — MEASURED, `grep -rn "use client"` over `components/commercial/` and all seven route files returns **0 matches**.
- **New animation framework: NONE.** No dependency added.
- **No route-builder abstraction, no JSON page config.** Ordinary React composition; each route file reads as its own argument.

**Why `ChainFigure` duplicates rather than imports the homepage figure.** Extracting the homepage's F1 into a shared module would mean editing a homepage file to serve a commercial route, and the homepage is a closed, validated baseline. The mark language, the dashed-means-unmeasured convention, the boundary rule and the double line are **transcribed**, and `components/homepage/HomepageIntervention.tsx` is untouched. This is a deliberate trade of some duplication for a guarantee of zero homepage regression, and it is why §26 below can be asserted.

## 7. Routes are not homepage clones — the differentiation result

The homepage chapter sequence (ACTIVITY → ATTENTION → FRICTION → INTERVENTION → RESOLUTION → ACCOUNTABILITY → ACTION) **is not reproduced on any route.** Each route runs the sequence frozen for it in `23` §3:

| Route | Sequence as built | Its distinctive second move |
|---|---|---|
| `/services` | its own 9 approved blocks (not the 9 commercial moves) | the joins as the argument |
| `/seo` | confirm → bridge → problem → work → **horizon boundary** → measurement (F1 + limits + compressed evidence) → objections → convert | the horizon — no other page leads with time |
| `/ai-seo` | confirm → bridge → problem → work → **evidence section** → **strongest boundary** → measurement → objections section → convert | the four layers kept separate |
| `/google-ads` | confirm → bridge → **boundary** → work → measurement → convert | the money boundary, earliest of the six |
| `/social-media-ads` | confirm → bridge → work → **channel-fit boundary** → convert | the argument against buying it |
| `/lead-generation` | confirm → bridge → problem → **definition (F1 STATE)** → boundary → objections → convert | the published definition, before the boundary |
| `/conversion-optimization` | confirm → bridge → **routes down** → **four zones, second move** → work → experimentation boundary → evidence → convert | the diagnostic figure, earlier than any other |

**No two sequences are the same, the boundary sits at four different positions, and three of the six carry no figure at all.**

## 8. F1 governance

| Route | Expected (`22` §3) | Actual | Verification | Result |
|---|---|---|---|---|
| `/services` | A — FULL, joins marked | A — FULL, joins marked | 1 drawing MEASURED visible | **PASS** |
| `/seo` | B — PARTIAL, discovery | B — PARTIAL, discovery | 1 drawing MEASURED visible | **PASS** |
| `/conversion-optimization` | B — PARTIAL, landing/enquiry | B — PARTIAL as the shallow four-zone variant, one object | 1 drawing MEASURED visible | **PASS** |
| `/lead-generation` | C — STATE at the terminus | C — STATE at the terminus | 1 drawing MEASURED visible | **PASS** |
| `/ai-seo` | **D — NONE** | **D — NONE** | **0 `<svg>` in `<main>`, MEASURED** | **PASS** |
| `/google-ads` | **D — NONE** | **D — NONE** | **0 `<svg>` in `<main>`, MEASURED** | **PASS** |
| `/social-media-ads` | **D — NONE** | **D — NONE** | **0 `<svg>` in `<main>`, MEASURED** | **PASS** |

**Quantity safety, checked on all four drawings:** points and joins only · no bar, width, fill percentage or length encoding demand, loss or volume · **no taper anywhere** · every dashed stretch means *unmeasured* and nothing else · the unattributed arrival appears with no upstream segment and is labelled *it still counts*.

`/google-ads`' assigned page-specific figure **F9** (fee vs spend vs measurement) **renders nothing** — its entire content is the owner-blocked fee/spend arrangement. **No substitute figure was invented.** That route therefore carries no figure at all, which is the honest consequence of the blocker.

## 9. Blocked slots — what renders nothing

`03_PAGE_ARCHETYPES.md` §4.3: *a blocked slot renders nothing — not an empty container, not a placeholder, not a silhouette, not "coming soon"*, and the subtler failure, *reshaping the UX so that a missing load-bearing fact stops being needed*, is also prohibited.

| Route | Blocked slot | Treatment |
|---|---|---|
| `/google-ads` | `[OWNER INPUT REQUIRED — how the management fee is separated from ad spend, and whether spend is billed through MappedSkills or paid directly to Google]` | **Renders nothing.** The arrangement-independent sentence that survives it — *"Whatever the arrangement, the two are stated as separate things"* — stands alone. **A reader who arrives asking how the fee is separated gets no answer, and that is the honest state.** No "typically", no illustrative arrangement, no range |
| `/google-ads` | F9, the fee/spend/measurement figure | **Renders nothing.** No substitute figure |
| `/ai-seo` | Move 8's second objection, which rests entirely on a quotation of Google's published position that `copy/ai-seo.md` flags `[VALIDATION REQUIRED]` and states *"must not be treated as publication-ready evidence until it is re-verified"* (Project Rule 19) | **Renders nothing.** Three of the four approved objections render; the fourth does not, and nothing stands in its place. The heading reads *"The questions we get asked here"* rather than *"The four questions"* — a heading format change, which §7 of the brief permits, and the only alternative would have been to state a count that does not match what is on the page |
| `/conversion-optimization` | Move 7's own-diagnostic PROOF link, blocked on a technical prerequisite | **Renders nothing** — and this is what the approved copy itself instructs: *"Until then this section stands with the finding stated and no link."* The finding stands; the sentence closes up around the absent link |

**No blocked fact was filled, paraphrased, softened or routed around.**

## 10. Copy integrity

Approved copy is used **verbatim**. The only changes are the production-format ones §7 of the brief permits — headings, line breaks, link labels and component fit. No strategic meaning was rewritten. Specific checks:

- **`/conversion-optimization`: "CRO" appears nowhere in the rendered body**, heading, breadcrumb, figure caption or CTA — MEASURED on the rendered page. The category phrasing is confined to the metadata, where the residual query needs it, and the acronym is not used even there.
- **`/lead-generation`:** "lead" appears in the title and metadata under `DEC-008` because `lead generation agency` is the live Indian phrasing; **the outcome noun in the body is always *enquiry*.**
- **`/ai-seo`:** GEO, AEO and LLMO appear nowhere — MEASURED, 0 matches in `<main>`. No score, no "rank in ChatGPT", no guarantee of appearance, no trend, no claim about Claude or Grok beyond *not testable*. **The removed vendor AI-referral-share statistic was not reintroduced in any form.**
- **`/social-media-ads`** did not acquire a problem move, a measurement section, an objections section or a figure — the four named conditions under which `23` §3 says its differentiation has collapsed.
- **`/seo`** carries no search volume, keyword difficulty or CPC figure, and no local/Pune framing.

## 11. Content-integrity sweep

Run against the **rendered** `<main>` of all seven routes plus the homepage, on a production build. Shared chrome is measured separately in §12 because it is identical on every route including the untouched homepage.

| Pattern | Result in Phase F route bodies |
|---|---|
| `300%+` | **0** |
| `₹100Cr+` / `₹10Cr+` | **0** |
| fake testimonials | **0** |
| fake logos / "trusted by" / ratings | **0** |
| fake case-study metrics | **0** |
| fake conversion rates | **0** |
| fake traffic counts | **0** |
| fake lead counts | **0** |
| fake ROAS | **0** |
| fake CPA | **0** |
| ranking guarantees | **0** |
| AI-visibility guarantees | **0** |
| revenue guarantees | **0** |
| bare percentages | **0** |
| multipliers (`3x`, `6x`) | **0** |

**Every occurrence the sweep flagged inside `<main>` is a DENIAL or a REFUSAL, not a claim**, and each is approved copy: *"guaranteed by nobody"* · *"Can you guarantee rankings?" — "No."* · *"we do not promise … a cost per lead"* · *"We do not report ROI"* · *"with no uplift figure attached"* · *"no confidence interval is claimed and none is available"*. The homepage baseline produces the same class of hit (*"you need the outcome guaranteed"*).

**Every number that survives carries its sample, date, location, language and access tier:** 28 unbranded runs · 4 systems · one day · Pune · English · signed out · 8 branded runs, 7 substantially accurate · directory sources in 15 of 28. All are Session 04 first-party measurements, and all travel with the standing note that these are **counts, not rates**, from **one round on one day**.

## 12. Shared chrome — regression PASS, and one pre-existing finding recorded

MEASURED on the rendered page at 1425 and 390:

| Check | Result |
|---|---|
| Header `position` after load | `relative` — **non-sticky** |
| Header `box-shadow` / `backdrop-filter` | `none` / `none` |
| Direct `/services` link in the header | **1** |
| `/contact` CTA in the header | **1** |
| Footer primary CTA | **"Contact Us" → `/contact`** |
| Footer secondary | **"Schedule Free Strategy Call" → `/schedule-call`** |
| `position: sticky` or `fixed` anywhere in the document | **0** |
| Elements carrying a `box-shadow` | **0** |
| Mobile trigger size | **40×40** |
| Mobile panel opens · 12 links · `/services` and `/contact` reachable | **yes** |
| `Escape` closes the panel and returns focus to the trigger | **yes** |
| Hidden focusables while closed | **0** |

**Files changed in `components/layout/`: ZERO.** Phase B is not regressed.

**Two pre-existing findings, recorded and NOT fixed** — both are in files Phase F does not touch, and both are present on the untouched homepage:

1. **`components/layout/Footer.tsx` carries legacy positioning language that contradicts the approved strategy** — *"Performance marketing agency helping businesses generate qualified leads, improve **ROI**, and scale revenue"* and the strapline *"Performance Marketing | Lead Generation | SEO | **CRO**"*. **This is the only place "ROI" and "CRO" survive on any Phase F route, and it is on every page of the site including `/`.** It also conflicts with the binding `/google-ads` metadata constraint against "performance marketing" framing and with `/conversion-optimization`'s rule that "CRO" not appear in body copy. **Belongs to a shared-chrome copy correction, not to Phase F**; the session brief's default for footer issues is *record and defer*.
2. **The footer's three column headings are `<h4>` under an `<h2>`**, producing a **`2 → 4` heading jump on every page of the site**, homepage included. MEASURED. Same disposition.
3. The mobile panel's "Book a call" link measures **39px high — 1px under the 40px floor**. `components/layout/Header.tsx`, pre-existing, not introduced here.
4. The homepage's three stage tabs measure **508×29** at 860px (`components/homepage/SystemStages.tsx`, Phase D). Pre-existing; a Phase D/E file.

## 13. Responsive validation

Driven through a real browser against a production build (`npm run start`), measuring `getBoundingClientRect` and `getBBox` on the rendered page — not read from CSS.

| Route | 390 | 860 | 1425 | Horizontal overflow | Visual result |
|---|---|---|---|---|---|
| `/services` | PASS | PASS | PASS | **0px at all three** | PASS |
| `/seo` | PASS | PASS | PASS | **0px** | PASS |
| `/ai-seo` | PASS | PASS | PASS | **0px** | PASS |
| `/google-ads` | PASS | PASS | PASS | **0px** | PASS |
| `/social-media-ads` | PASS | PASS | PASS | **0px** | PASS |
| `/lead-generation` | PASS | PASS | PASS | **0px** | PASS |
| `/conversion-optimization` | PASS | PASS | PASS | **0px** | PASS |
| `/` (regression) | PASS | PASS | PASS | **0px** | unchanged |

**Additional widths on the four figure-carrying routes** — 360, 760, 761, 1080, 1099, 1100: **0px overflow at every one, and exactly one drawing visible at every one**, verified by measuring rendered widths rather than reading CSS.

**`/ai-seo`'s layer table** has `min-width: 600px` inside an `overflow-x-auto` region. MEASURED at 390: the table scrolls **inside its own region** (region right edge 372 < viewport 390) and **the page body does not scroll horizontally** — which is what `48` §M7 requires.

### 13.1 Three responsive defects found by measurement and fixed

None of these would have been caught by a `scrollWidth` check, and two of them are invisible in the source.

1. **A one-pixel gap between two media queries.** The figure wrapper paired `max-[760px]:block hidden` with `hidden min-[761px]:block`. Those look complementary and are not: **at a viewport measuring exactly 760 CSS px, MEASURED, both queries failed and `/seo` rendered NO FIGURE AT ALL.** Fixed by making one query govern both drawings — the vertical form is the default and is hidden only at the width the horizontal takes over — which is the pattern the homepage's own figure already uses. Re-MEASURED at 760/761 and 1099/1100: exactly one drawing at every width.
2. **SVG text clipped by its own viewBox.** `getBBox` measurement against each drawing's viewBox found *"— your numbers, from your system"* overflowing the STATE figure by 19 units and *"nothing recorded it, so the loss is invisible"* overflowing the four-zone figure by 11. SVG clips at the viewBox, so this was **silent content loss** with a document overflow of 0. Both viewBoxes widened 300 → 330. Re-MEASURED: **0 clipped text on any drawing at any width.**
3. **Six overlapping label pairs across the four horizontal drawings**, found by comparing every text bounding box against every other. Fixed by moving the join numbers below the chain, setting two long annotations on two lines, start-anchoring the four zone labels instead of centre-anchoring them, and separating the boundary label from the unattributed-arrival label. Re-MEASURED at 390/760/761/860/1080/1099/1100/1425: **0 collisions.**

### 13.2 Mobile composition

- **Text burden:** controlled. Word counts in `<main>` — `/social-media-ads` **400**, `/google-ads` 678, `/conversion-optimization` 1076, `/lead-generation` 1256, `/seo` 1262, `/ai-seo` 1515, `/services` 1658. **The lengths were not equalised**, which is the point: `23` §5.4 says *"if they end up the same length, symmetry has overridden intent."*
- **CTA layout:** the action pair goes full-width below 520px so both buttons are comfortable targets; primary is filled, secondary outlined, and the order never changes.
- **Figure simplification:** each figure switches to a genuine vertical composition, not a scaled-down horizontal one. Decorative complexity is not added at narrow widths and **no substantive meaning is removed** — every label present at WIDE is present at NARROW.
- **Page length:** `/social-media-ads` is 4,477px at 390 against `/ai-seo`'s 10,170px. The minimal variant is genuinely minimal.
- **Targets:** **0 controls under 40×40 in any Phase F route body**, at any width.

## 14. Motion

**All seven Phase F routes are STATIC. Motion tiers used: T1 = 0 · T2 = 0 · T3 = 0 · signature = 0 · ambient = 0 · pinned = 0 · sticky = 0.**

The Phase F acceptance bar is *T1 0 · T2 ≤1 · T3 ≤2 · sticky 0* per page. Every route is **under** it, and the brief's instruction is *"prefer significantly less."*

MEASURED on the rendered page: the only transitions inside `<main>` on any Phase F route are **colour-family properties** — `color`, `background-color`, `border-color`, `outline-color`, `text-decoration-color`, `fill`, `stroke` — inherited from the global `a {}` rule. **No `transform`, no `opacity`, no `animation-name`.** Those are T4 micro-interactions, which the budget does not count.

No new animation framework, no new global motion language, no ambient loop, no pinned content, no scroll-jacking, no decorative continuous animation. `app/resolve-motion.css` and `hooks/use-resolve-motion.ts` were not touched and are not imported by any Phase F file.

## 15. No-JS

**Every Phase F route is complete with JavaScript disabled, structurally rather than by fallback**, because every file is a Server Component and there is no client leaf to fail. Verified against the **server-rendered HTML only**, with no page JavaScript executed:

| Route | H1 | Primary copy | Figures | Evidence / boundary | CTA | Footer | Result |
|---|---|---|---|---|---|---|---|
| `/services` | 1 | present | present | present | 2× `/contact`, 2× booking | present | **PASS** |
| `/seo` | 1 | present | present | present | 2× / 2× | present | **PASS** |
| `/ai-seo` | 1 | present | N/A (D — NONE); tables present | present | 2× / 2× | present | **PASS** |
| `/google-ads` | 1 | present | N/A (D — NONE) | present | 2× / 2× | present | **PASS** |
| `/social-media-ads` | 1 | present | N/A (D — NONE) | present | 2× / 2× | present | **PASS** |
| `/lead-generation` | 1 | present | present | present | 2× / 2× | present | **PASS** |
| `/conversion-optimization` | 1 | present | present | present | 2× / 2× | present | **PASS** |

**0 critical blank sections. No copy, link or figure is created by client JavaScript on any Phase F route.**

## 16. Reduced motion

**NOT APPLICABLE — STATIC ROUTES.** All seven Phase F routes are recorded as static per §14, and **no motion was added in order to make this test applicable**, which the brief explicitly prohibits.

The claim is structural rather than observational: with zero client components, zero `transform`/`opacity` transitions and zero animations in any Phase F route body, there is nothing for `prefers-reduced-motion` to reduce. The global reduced-motion floor in `app/globals.css` remains in force for shared chrome and is unchanged.

## 17. Accessibility

MEASURED on the rendered page:

| Check | Result |
|---|---|
| Exactly one `<h1>` per route | **7/7** |
| Heading sequence inside `<main>` | **0 jumps on all 7 routes** (the site-wide `2 → 4` jump is the footer — §12, pre-existing) |
| Semantic sections | `<section>` per chapter; `<nav aria-label="Breadcrumb">`; `<figure>`/`<figcaption>`; `<dl>` for objections; real `<table>` with `<caption>`, `scope="col"`/`scope="row"` |
| Meaningful link names | no "click here"/"read more"; every routing link names its destination |
| Keyboard operation | no custom widgets, no `tabindex`, no focus traps — every control is a native link |
| Focus visible | global `:focus-visible` from Phase A, never suppressed |
| Figures accessible | `role="img"` + `<title>` + `<desc>`; the hidden drawing is `display:none`, so **one accessible name is exposed, not two** |
| Decorative elements hidden from AT | every `Mark` and every ornamental rule carries `aria-hidden="true"` |
| No colour-only meaning | every mark state is also stated in words. **"Not testable" is set in words and marked with the open/dashed mark, so it is distinguishable from a measured zero without colour** (B1) |
| Target sizing | **0 controls under 40×40 in any Phase F route body**, at any width |
| No horizontal content loss | **0px page overflow at 8 widths**; the one wide table scrolls inside its own region |

## 18. Cross-route system review

- **Cohesion:** one system. Shared identity comes from typography (Bricolage/Manrope), the accent ramp, the four mark states, the hairline rule, the chapter-label/display pair and the CTA architecture — never from repeating the homepage's chapter sequence.
- **Repetition:** the seven routes differ in move order, in where the boundary sits (four different positions), in whether they carry a figure at all (four do, three do not), and in length (400 to 1,658 words in `<main>`). **A system that is consistent but monotonous is not a pass, and this one is not monotonous.**
- **Archetype distinction:** two archetypes and four variants — proposition hub; capability master; high-scepticism; minimal; diagnostic-led; definition-led. **Zero unnecessary one-off designs**: only `/ai-seo` has route-specific components, and only because it is the one route whose figure is not F1.
- **F1 overuse:** **no.** Four of seven carry a figure, three do not, and the three that do not are exactly the three the taxonomy classifies D — NONE.
- **Orange overuse:** the tangerine ramp carries emphasis, the owned mark, the joins and the primary CTA — and nothing else. **The full-bleed tangerine surface inversion remains homepage-only.** No Phase F route inverts the ground.
- **Generic card-grid regression:** **none.** No card grid, no icon per capability, no equal-weight tile, no stat tile, no badge cluster on any route. Capability routing on `/services` is hairline rows ordered by contribution.
- **Typography hierarchy:** consistent and one rank below the homepage — H1 clamps to 3.9rem against the homepage's 5.8rem, MEASURED at 62px vs 100px at 1425. The homepage keeps the site's largest type, as it should.
- **CTA consistency:** identical on all seven — `/contact` primary, booking secondary, two instances per route, no third button, no sticky bar, no inline form.
- **Evidence honesty:** consistent. Every claim carries its sample; every limit is adjacent, open and never collapsible; every boundary states what is not promised.

## 19. F10 — the double close

**Classification: SYSTEMIC SHARED-COMMERCIAL, and partly mitigated inside Phase F's own files without touching the Footer.**

The homepage's final CTA is immediately followed by the footer's own commercial CTA strip. **The same adjacency exists on all seven commercial routes**, because the footer is site-wide. It is therefore not homepage-specific.

**What was done, and what was not.** The Footer was **NOT modified** — the Phase F plan does not assign shared-commercial CTA reconciliation to this phase, and the brief's default is *record and defer*. What Phase F did instead is compose its own close as the **quiet half of the pair**: `CommercialClose` is a ground surface with a hairline top rule, a heading, one sentence and the action pair. The footer's dark strip then reads as the second, louder close rather than as a duplicate of an identical one. That is a composition decision inside a Phase F file, not a change to shared chrome.

This also avoids a second problem: repeating the homepage's full-bleed tangerine inversion on seven routes would have turned a counted, meaningful event into a page-template device — the figure taxonomy's own failure mode, applied to a surface.

**Deferred to:** a shared-commercial CTA reconciliation pass, which should also take the Footer copy defects in §12. **Not fixed here.**

## 20. Homepage regression

MEASURED at 390, 860 and 1425 after Phase F, on a production build:

| Check | 390 | 860 | 1425 |
|---|---|---|---|
| Horizontal overflow | 0px | 0px | 0px |
| `<h1>` | *"Judge us on the enquiries, not the traffic."* | same | same, at **100px** |
| F1 drawings visible | **1** | **1** | **1**, viewBox `0 0 1000 216` |
| Final CTA present | yes | yes | yes, background `rgb(255, 91, 4)` — the tangerine inversion, unchanged |
| Composition reveals (`.rsv-rv`) | present | present | **21** |
| Signature control (`aria-pressed`) | present | present | present |

**Static baseline, motion, F1, final CTA and responsive behaviour are all unchanged.** No Phase F component is imported by any homepage file, and `git status` confirms **zero homepage files modified** — which is the point of §6's duplication decision.

## 21. Builds

| | Standard | cPanel |
|---|---|---|
| Command | `npm run build` | `npm run build:cpanel` |
| Result | **PASS** (exit 0) | **PASS** (exit 0) |
| Constraints | none | `NODE_OPTIONS=--max-old-space-size=512`, `CPANEL_BUILD=1`, `cpus: 1`, `RAYON_NUM_THREADS=1`, `UV_THREADPOOL_SIZE=1` |
| Route rows | **25** (was 24) | **25** (was 24) |
| Static pages generated | **24/24** (was 23/23) | **24/24**, single worker |
| Memory anomalies | none | **none — the 512 MB ceiling was not raised** |

**The route-count change is fully explained: +1 row and +1 static page, both `/ai-seo`.** No other route was added, removed or changed kind.

**Warnings: one, on both, and PRE-EXISTING** — the multiple-lockfile workspace-root warning Phase A documented (a stray `package-lock.json` in the user's home directory, outside this repository). `[contentful] Missing CONTENTFUL_SPACE_ID` is likewise the pre-existing environment condition already recorded in `CURRENT_STATE.md`. **No new warning was introduced.**

## 22. Deferred / blocked — not fixed, not hidden

| Item | Reason | Later phase |
|---|---|---|
| `/problems/traffic-but-no-enquiries` | **Phase G scope** — archetype 4, not a commercial/capability route (§1) | **G** |
| `/ai-seo` absent from `app/sitemap.ts` | The sitemap is a hand-written static list. Sitemap work is explicitly out of this session's scope, and Phase G owns it | **G** |
| `/ai-seo` absent from the header dropdown and the footer service column | Shared-chrome change; the copy record asks for both. It is reachable from `/services`, `/seo` and the homepage's Capture stage | shared-chrome pass |
| Footer's "improve ROI" / "CRO" / "Performance Marketing" strapline | Shared chrome; contradicts approved positioning and the `/google-ads` metadata constraint (§12) | shared-chrome pass |
| Footer `<h4>` heading jump, site-wide | Shared chrome (§12) | shared-chrome pass |
| Header mobile "Book a call" at 39px | Shared chrome, pre-existing (§12) | shared-chrome pass |
| Homepage stage tabs at 508×29 | Phase D/E file, pre-existing (§12) | later |
| `/google-ads` fee/spend separation, and its F9 figure | **OWNER-BLOCKED** (§9) | on owner input |
| `/ai-seo`'s Google quotation and the objection resting on it | **`[VALIDATION REQUIRED]`** (§9) | on re-verification |
| `/conversion-optimization`'s own-diagnostic link | Technical prerequisite (§9) | on the fixes shipping |
| `/services` PROOF link quality | Sequence-dependent on `/how-it-works`, whose §2 is owner-blocked. The plan explicitly permits shipping the weaker onward route | **G** |
| Links to `/problems/traffic-but-no-enquiries` and `/research/ai-visibility-baseline` | These routes do not exist yet, so those links 404 today. They follow the approved copy's Internal-Link Intent and **match the existing homepage baseline, which already carries both**. Phase G creates the targets | **G** |
| `ServiceCard`, `IndustryCard`, `ProblemCard`, `lib/constants.ts` now orphaned | Proven orphaned, deliberately not deleted (§4) | cleanup after G |
| `ignoreBuildErrors: true` still set | Pre-existing (Phase A §16.5). **0 type errors originate in any Phase F file** — verified with `tsc --noEmit`; every reported error is pre-existing | **I** |
| Screen-reader, real-device, cross-browser, print, 200% resize, real-hardware performance | **Never performed by this programme and not performed here. None may be reported as passed** | **I** |

## 23. Rollback boundary

Phase F is **one commit** containing seven route files, eight new components and this document.

- **Full rollback:** `git revert <commit>` restores the six legacy route pages and removes `/ai-seo` and `components/commercial/`.
- **Per-route rollback** is possible and clean: each route file is independent, and the shared components are additive — reverting one route file does not affect another.
- **No data migration, no schema change, no config change, no content change outside the seven routes.**
- **The homepage, shared chrome, tokens, motion layer, forms, analytics, robots and sitemap are untouched**, so no rollback of this commit can disturb Phases A–E.
