# Consolidated Integration and Pre-Release Audit

27 October 2026. Read-only audit. Worktree `MappedSkills-home-r2` (branch `design/homepage-visual-r2`, base `3e0e921` = `main` after PR #59).
Nothing was edited, committed, pushed, merged or deployed. Only this folder (`docs/website-integration-audit/`) was created.
Labels follow `CLAUDE.md`. "Browser-tested" means observed in a running browser; "code-inspected" means read from source only.

> **Status update, 27 October 2026 (after owner decisions D1 to D5).** The eight P1 findings below were addressed locally on branch `integration/frozen-designs-wp0-7`; see `INTEGRATION_RESULTS.md` for the resolution matrix, evidence, remaining P2 findings and limitations. Nothing is pushed, merged or deployed. The text below is the original pre-integration audit, kept unaltered.

Companion files: `ROUTE_AND_SEO_MATRIX.md` · `NAVIGATION_AND_USER_JOURNEYS.md` · `PRE_RELEASE_QA_MATRIX.md` · `MINIMUM_INTEGRATION_PLAN.md`.

## 1. Result in one paragraph

**There are no P0 findings.** The seven approved designs are sound as previews: no horizontal overflow at 320 to 1440 px, header and content aligned, no console errors, reduced motion and no-JavaScript both work, every disclosure is native `details`, and preview routes are 404 in a production build. But **none of the seven is integrated.** Six replace pages that are already live and indexed (the seven-page bundle of PR #59 is live), and one (Enquiry-Led) has no route at all. The previews carry different titles, H1s, FAQ counts and structured data from the live pages, the working tree mixes superseded homepage work with navigation work, and the live site has no path to a fourth audience page. Integration is a bounded job (nine small work packages), but it needs five owner decisions first.

## 2. Actual repository state (VERIFIED FACT, repository and live inspection)

| Item | Finding |
|---|---|
| Branch / base | `design/homepage-visual-r2` at `3e0e921`, which equals `origin/main` (PR #59, "seven pages", merged 26 Oct). |
| Live site | `https://mappedskills.com` already serves the PR #59 bundle: `/`, `/services`, `/google-ads`, `/social-media-ads`, `/who-we-help/{d2c,education,real-estate}` return 200 with `index, follow`, self-canonicals and are in the live sitemap. `/who-we-help/enquiry-led-businesses` and `/who-we-help` return 404. The exact deployed commit and workflow run are not recorded in repository or memory (UNKNOWN). |
| Working tree | 70 changed paths, all uncommitted: 12 modified tracked files, the rest untracked. |
| Pre-existing local work (predates this audit) | (a) **Homepage R2.1** edits to the live homepage component: `PaidAdvertisingHome.tsx`, `FeaturedArt.tsx`, new `BuyerJourney.tsx`, `HomeArt.tsx`, `home-r2.css`, and five rewritten `tests/paid-advertising-*.test.cjs`. (b) **Who We Help dropdown**: `nav.ts`, `SiteHeader.tsx` (+184 lines), `direction-c.css`. (c) **Dev-only homepage switcher** wired into shared files: `app/layout.tsx` (`DesignSwitcher`) and `next.config.mjs` (`?design=` rewrites, development only). (d) Preview routes, components, tests, docs and images for the seven designs and their earlier rounds. |
| Preview routes present | 15 directories under `app/`: `resolve-preview{,-r2,-r3}`, `google-ads-preview-r{3,4,41}`, `meta-ads-preview-r{1,2,21,22}`, `d2c-preview-r1`, `education-preview-r2`, `real-estate-preview-r2`, `enquiry-led-preview-r{1,11}`. All are `noindex, nofollow`, call `notFound()` when `NODE_ENV === 'production'`, and are not in the sitemap. |
| Dev servers | `:3412` serves this worktree (used for all browser checks). `:3410` serves `MappedSkills-paid-home`. `:3100` serves an unrelated repo. None was touched. |
| Decision records | Latest decision is `DEC-084`. **No decision records the approval of the seven frozen designs, the navigation structure, or the Enquiry-Led route.** The Enquiry-Led R1.1 report lists these records as owed. |

### Approved design to preview mapping

| # | Approved design | Preview route (this worktree) | Component folder | Live route today | Integrated? |
|---|---|---|---|---|---|
| 1 | Homepage THE RESOLVE R3 | `/resolve-preview-r3` (also `/?design=resolve-r3`, dev only) | `components/resolve-home-r3/` | `/` (older component, `PaidAdvertisingHome`) | No |
| 2 | Google Ads R4.1 | `/google-ads-preview-r41` | `components/google-ads-r41/` | `/google-ads` | No |
| 3 | Meta Ads R2.2 | `/meta-ads-preview-r22` | `components/meta-ads-r22/` | `/social-media-ads` | No |
| 4 | D2C and Ecommerce R1.1 | `/d2c-preview-r1` | `components/d2c-r1/` | `/who-we-help/d2c` | No |
| 5 | Education and Training R2B | `/education-preview-r2` | `components/education-r2/` | `/who-we-help/education` | No |
| 6 | Real Estate R2.1 | `/real-estate-preview-r2` | `components/real-estate-r2/` | `/who-we-help/real-estate` | No |
| 7 | Enquiry-Led Businesses R1.1 | `/enquiry-led-preview-r11` | `components/enquiry-led-r11/` | **none (404)** | No |

Two of the preview names do not match their version: Education R2B and Real Estate R2.1 live in the shared `-r2` folders and routes, and Real Estate R2.1 is the second round inside the same route. Each report (`docs/*/…REPORT.md`) states which round the route currently renders. This audit used those routes as the frozen baseline.

**Can the previews be integrated without replacing unrelated work? Yes.** Each preview is self-contained and additive. The live route files (`page.tsx`) only compose metadata, JSON-LD and one page component, so integration is a component swap inside the existing wrapper. Two shared dependencies must be handled first (finding P1-05): every interior design imports `RvReveal3` and `resolve-home-r3.css` from the homepage R3 folder, Google R4.1 imports `google-ads-r3` and `google-ads-r4` modules, and Meta R2.2 imports `meta-ads-r1`, `r2` and `r21` modules. Deleting earlier rounds would break the approved ones.

## 3. Findings

Severity rules used: **P0** unsafe or fundamentally broken; **P1** required before launch of this integration; **P2** useful, not launch-blocking; **Deferred** outside the approved scope.

### Counts

| P0 | P1 | P2 | Deferred |
|---|---|---|---|
| **0** | **8** | **7** | **6** |

### P0

None. The dev-only switcher and rewrites in shared files are inert in production (browser-tested against an isolated production build, section 5), so they are cleanup, not a blocker.

### P1: required before launch

**P1-01 Enquiry-Led Businesses has no production route, metadata, schema or sitemap entry.**
- *Affected:* new route `/who-we-help/enquiry-led-businesses`; `app/sitemap.ts`; analytics page-type mapping.
- *Evidence:* live 404; no `app/(pages)/who-we-help/enquiry-led-businesses`; the preview emits only the site-wide Organization JSON-LD, no canonical, no FAQPage or BreadcrumbList. Title and description are WORKING HYPOTHESES; the R1.1 report says SERP and autocomplete validation is still owed, and there is no keyword evidence for this audience.
- *Impact:* the approved page cannot be reached. A new indexable page also risks overlap with `/lead-generation` (WORKING HYPOTHESIS; no ranking data).
- *Smallest safe fix:* create the route following the `real-estate/page.tsx` pattern (metadata, `BreadcrumbList` Home then Enquiry-led businesses, `FAQPage` matching the seven visible questions, self-canonical), add one sitemap line and the commercial page-type mapping.
- *Verify:* 200 on the built route; one canonical, `index, follow`; JSON-LD parses and FAQ text equals visible text; present in `sitemap.xml`; `/lead-generation` unchanged.

**P1-02 Frozen previews differ from the live indexed pages in title and H1 for four routes.**
- *Evidence (live vs preview):*

| Route | Live title | Preview title | Live H1 | Preview H1 |
|---|---|---|---|---|
| `/google-ads` | Google Ads Measured on the Enquiries, Not the Clicks | Google Ads Management for Indian Businesses | Reach people already searching for what you sell. | Reach customers when they're looking for what you sell. |
| `/social-media-ads` | Paid Social, Judged on the Enquiries It Produces | Meta Ads Management for Businesses in India | Turn attention into business opportunities. | Turn attention on Facebook and Instagram into business opportunities. |
| `/who-we-help/d2c` | Paid Advertising for D2C Brands in India | Google Ads and Meta Ads for D2C and Ecommerce Brands | More orders are good. Profitable growth is better. | More orders matter. So does what they cost. |
| `/who-we-help/education` | Google Ads & Meta Ads for Education Businesses in India | Google & Meta Ads for Course Providers in India | More of the right students. | Find learners who are ready for what you teach. |

  `/` and `/who-we-help/real-estate` match on title and H1. The homepage preview title is the preview label ("THE RESOLVE R3 homepage preview") and must not ship.
- *Impact:* `DEC-079` and `DEC-080` say the live title, description and breadcrumb are preserved "pending Search Console review". Shipping the preview metadata would change indexed titles and H1s on four ranking-eligible pages without the review those decisions require. No Search Console data is available (evidence gap).
- *Smallest safe fix:* owner decision per page (decision D1). Default recommendation: **keep the live title, description and canonical on every route; change the visible H1 only where the frozen design requires it**, and record each change.
- *Verify:* before and after `curl` diff of title, description, canonical, robots, OG and Twitter tags for all seven routes.

**P1-03 Structured data and FAQ parity would be lost or wrong if a preview replaced a page.**
- *Evidence:* the live pages carry `BreadcrumbList` and `FAQPage` (7 questions each on D2C, Education, Real Estate, Google, Meta; `Service` on Google and Meta). The previews carry less: Real Estate and Enquiry-Led emit Organization only; D2C has FAQPage but no BreadcrumbList; Google and Meta have Service and FAQPage but no BreadcrumbList. Visible FAQ counts differ from live schema: Education 10 vs 7, Real Estate 9 vs 7, Google R4.1 6 vs 7.
- *Impact:* replacing `page.tsx` instead of its inner component would drop breadcrumbs and schema. Keeping the old `FAQPage` over a changed visible FAQ is a structured-data mismatch.
- *Smallest safe fix:* swap only the component inside each existing `page.tsx`; regenerate each `FAQPage` from the same content module the page renders.
- *Verify:* extract JSON-LD from built HTML; assert each `FAQPage` question set equals the visible questions and each page keeps its `BreadcrumbList`.

**P1-04 Homepage R3 repeats a promise the owner has superseded.**
- *Evidence:* `components/resolve-home-r3/ResolveHomeR3.tsx:138`: "Your engagement includes monthly reporting and a review call." Reporting Policy A (`DEC-079`, `DEC-080`, `DEC-081`) replaced this with "a monthly performance report with ongoing management, and review calls as agreed in your proposal." The same sentence is live on `/` today, and `DEC-080` records the homepage correction as a known follow-up.
- *Impact:* a genuine contradiction between the approved homepage and every other page in the set.
- *Smallest safe fix:* one-sentence change to the Policy A wording (needs owner sign-off because the design is frozen; decision D4).
- *Verify:* grep the built homepage for "review call" and compare with the other six pages.

**P1-05 The working tree mixes superseded and current work, and shared files contain dev-only hooks.**
- *Evidence:* the uncommitted homepage R2.1 edits (and five tests rewritten to assert R2.1 structure, for example four `pa-bj-step` items and three line-art cards) are an older homepage version than R3. `app/layout.tsx` imports `components/resolve-home/DesignSwitcher`, and `next.config.mjs` adds `?design=` rewrites. All six interior designs import `RvReveal3` and `resolve-home-r3.css`; Google R4.1 and Meta R2.2 import earlier-round modules.
- *Impact:* committing the tree as is would ship the superseded homepage and dev scaffolding. Deleting earlier rounds as tidy-up would break approved previews. The current tests pass only because they assert R2.1; they will fail, correctly, when R3 replaces it.
- *Smallest safe fix:* triage before any commit (decision D5): keep navigation work; supersede R2.1 homepage edits with R3; remove the two dev hooks; promote shared modules to stable names rather than deleting rounds.
- *Verify:* `git diff main` shows no `resolve-home`, `DesignSwitcher` or `?design=` reference in shared files; tests updated for R3 and green.

**P1-06 Navigation, footer and homepage have no path to the fourth audience, and the required structure is not in place.**
- *Evidence:* the Who We Help dropdown (uncommitted) lists D2C, Education and Real estate only; the footer has no Who We Help group; the homepage audience section has three cards and the third is titled "Real estate developers" with `id="enquiry-led"` and a link to `/who-we-help/real-estate`. The Enquiry-Led preview itself links out to the other three audiences, but nothing links in. See `NAVIGATION_AND_USER_JOURNEYS.md`.
- *Impact:* journeys F and G cannot complete from the homepage or navigation; the new page would be orphaned on release.
- *Smallest safe fix:* add one dropdown item, one footer column, and one homepage card or card link; correct the `id`/title collision.
- *Verify:* every page reaches Enquiry-Led in two clicks; active state shows on all four audience routes.

**P1-07 Retained indexed service pages receive no links from the pages that matter.**
- *Evidence (live HTML, 27 Oct):* `/lead-generation`, `/seo`, `/ai-seo`, `/conversion-optimization` and `/problems/traffic-but-no-enquiries` are in the sitemap but are not linked from `/`, `/services`, the three audience pages, `/google-ads`, `/social-media-ads`, the header or the footer. In source they are linked only from `not-found.tsx` and legacy components (`HomepageIntervention`, `HomeStrategy`) the live pages do not render.
- *Impact:* an SEO-equity risk the owner has said must be protected (`/lead-generation` named explicitly). Rankings, traffic and backlinks are unavailable, so the size of the loss is an evidence gap, not a figure.
- *Smallest safe fix:* owner decision D3. Smallest option: one "More services" footer group listing the four retained service pages, plus the Enquiry-Led FAQ link to `/lead-generation` that already exists in the preview.
- *Verify:* each retained page has at least one crawlable inbound link from a site-wide template; unchanged URLs, titles and canonicals.

**P1-08 Approvals and supersessions are not recorded.**
- *Evidence:* no `DEC-085+`. The seven designs, the navigation structure, the Enquiry-Led slug, and the changes to recorded wording (for example "Discuss Google Ads" in `DEC-079` versus "Discuss Your Google Ads" in the frozen design; `DEC-081` D2C H1) are absent. The R1.1 report flags the same gap.
- *Impact:* `CLAUDE.md` requires meaningful approved decisions in the log, and a release authorisation needs something to point at.
- *Smallest safe fix:* one append-only decision entry per design group, drafted from the existing reports, for owner confirmation.
- *Verify:* entries exist and name route, version, metadata policy and what is superseded.

### P2: useful, not launch-blocking

| ID | Finding | Evidence | Note |
|---|---|---|---|
| P2-01 | CTA labels vary by page | Home, D2C, Education, Enquiry-Led: "Discuss Your Advertising". Google: "Discuss Your Google Ads". Meta: "Discuss Your Meta Ads". Real Estate: "Discuss Property Advertising". Header and footer: "Discuss Your Advertising". Secondary "Request a call" appears only on four pages. All go to `/contact` or `/contact?intent=call`. | One consistent pattern; not a contradiction. Record the labels in the decision entry. |
| P2-02 | Audience labels differ between surfaces | Real Estate page: "property developers and Channel Partners". Homepage card and dropdown: "Real estate developers" / "Real estate" with the body speaking only to developers. | Terminology on the page is correct; the labels elsewhere omit Channel Partners. |
| P2-03 | One standalone text link is below 24 px | Google R4.1: "Meta Ads may fit better…" measures 183 by 22 px at 320, 360, 768, 1024 and 1440 px. | Browser-measured; may be exempt if treated as inline text. |
| P2-04 | Meta R2.2 clips 7 px at 390 px | The root element has `overflow: clip` with `scrollWidth` 397 at a 390 px viewport. No horizontal scroll occurs. Both tab strips scroll horizontally by design inside their own rows. | Visually check at 390 px before release. |
| P2-05 | Cookie banner covers about 25% of a 390 by 844 first screen | 209 px tall at 390 px, 127 px at 1024. Hero CTAs stay visible at 844 px. Not tested at shorter phone heights. | Existing site-wide component, not part of the seven designs. |
| P2-06 | `/lead-generation` does not link back to Enquiry-Led | The Enquiry-Led FAQ links to `/lead-generation`; the reverse link needs an edit to a live approved page. | Needs owner authorisation to touch `/lead-generation`. |
| P2-07 | Earlier-round previews and dev scaffolding should go after release | 15 preview routes and their component folders. | Do not delete before the shared-module move (P1-05). |

### Deferred (outside the approved scope)

1. `/services` still says "Setting up tracking for meaningful enquiry actions, where technically possible", and the homepage free-account-review wording needs correction. Both recorded as known follow-ups in `DEC-080`.
2. `/ppc-marketing` redirect: held in the migration register, not implemented (`DEC-079`). Live returns 404.
3. No Wanderlooms case page; the homepage card and D2C proof link to `/work`.
4. A `/who-we-help` hub page: none exists by decision (`DEC-081`); the dropdown overview points to `/#who-we-help`.
5. `www` normalisation, `.htaccess` review, GPTBot and CCBot policy, Search Console verification (all open owner or programme items).
6. Pricing page rewording, FAQ and blog content (not in the seven).

## 4. Content and proof consistency (code-inspected plus rendered text scan)

No contradictions found other than P1-04 and the label items above. Specifically:

- **Guarantees.** Every "guarantee" match across the seven pages is a refusal ("Can you guarantee enquiries…? No."), or the proof disclaimer ("shows our approach, not a guaranteed result").
- **Invented results.** No percentages, rupee amounts, ROI, testimonials, ratings or "trusted by" language on any page. "ROAS" and "qualified enquiries" appear only as metrics the page says it will review. Wanderlooms and Om Sai are unlinked or qualitative; AnyBodyCanBake uses the live spelling.
- **Scope statements.** Reporting Policy A, the tracking boundary, creative scope (client supplies original photographs and videos; allowances proposal-defined; production and Reels separately scoped), Click-to-WhatsApp (client replies; no automation or CRM unless proposed) and ad-spend billing are consistent on Google, Meta, D2C, Education, Real Estate and Enquiry-Led. Only the homepage deviates (P1-04).
- **Property Developers and Channel Partners.** The Real Estate page uses the approved pair on every audience-facing string; internal identifiers (`id: 'broker'`) are not shown to users.
- **Google and Meta positioning.** Google is the primary service on search-led audiences, Meta on social; each interior page names the other as a complement with a link, and neither the Education nor the Enquiry-Led page ranks one above the other.
- **Automatic qualification.** None promised. The Enquiry-Led FAQ states "We manage the advertising", not that MappedSkills speaks to or qualifies enquiries.

## 5. Technical readiness (browser-tested and command-run)

| Check | Result |
|---|---|
| `tsc --noEmit` (no incremental) | exit 0 |
| `node --test tests/*.test.cjs` | 502 tests, 501 pass, 1 skipped, 0 fail. These tests encode the current (R2.1) homepage and the live pages, not the frozen designs. |
| `eslint` on the seven component folders, `components/direction-c`, and all preview routes | exit 0. Full-repo `npm run lint` was not run. |
| Production build | Run in an **isolated copy** under the session scratchpad with `node_modules` symlinked, so `.next` of the dev server was never touched. `next build --webpack` exit 0; 46 static pages. `next start` on a spare port: all 15 preview routes and `/who-we-help/enquiry-led-businesses` return 404 with `noindex`; `/?design=resolve-r3` returns the normal homepage; the sitemap contains no "preview"; the homepage markup contains no switcher. A dead `DesignSwitcher` string remains in the layout chunk (returns `null` in production). The temporary server was stopped. |
| Console and network on the seven previews (Chromium, 1440 px) | No error or warning messages, no failed (4xx or 5xx) responses. |
| Contentful | Build logs "Missing CONTENTFUL…" in the isolated copy because no `.env` was supplied; expected and unrelated. |

## 6. Missing evidence (gaps, not guesses)

1. Search Console impressions, rankings, clicks and backlinks for every route (none available).
2. SERP and autocomplete validation for the Enquiry-Led title and description.
3. The exact commit, run and `BUILD_ID` currently live, and so the rollback target.
4. Screen-reader testing (NVDA, VoiceOver) and real-device touch testing.
5. Colour-contrast measurement (not run; code-inspected only).
6. Core Web Vitals field data and Lighthouse runs (lab CLS was measured at 390 px in development mode only, all values under 0.05).
7. Analytics and consent event behaviour on the new page set.
8. Short-viewport (for example 320 by 568) behaviour with the cookie banner.
9. Owner decisions D1 to D5 below.

## 7. Recommended minimum implementation sequence

Full detail and dependencies are in `MINIMUM_INTEGRATION_PLAN.md`.

1. Owner answers D1 to D5 and approves decision entries (WP0).
2. Triage the working tree onto a fresh branch from `main` (WP1).
3. Promote shared modules (WP2).
4. Add the Enquiry-Led route (WP4) and the navigation, footer and homepage links (WP5).
5. Swap the six existing pages one at a time inside their wrappers (WP3) and correct the homepage sentence (WP6).
6. Update tests, then verify in an isolated production build (WP7).
7. Deployment is a separate, explicitly authorised step (WP8). Cleanup of earlier rounds comes last (WP9).

## 8. Exact next owner decision

**Approve or amend the five decisions below and authorise local implementation of work packages WP0 to WP7 on a new branch from `main` (no commit to `main`, no push, no deployment).**

| # | Decision | Recommended answer |
|---|---|---|
| D1 | Metadata and H1 policy for Google, Meta, D2C and Education | Keep live title, description and canonical; adopt the frozen H1 only where the design needs it; record each |
| D2 | Enquiry-Led title, description and slug | Keep `/who-we-help/enquiry-led-businesses`; use the R1.1 working title; mark SERP validation as post-release review |
| D3 | How retained service pages receive links | One footer "More services" group (Lead generation, SEO, AI search, Conversion) |
| D4 | Homepage reporting sentence | Use the Reporting Policy A wording |
| D5 | Uncommitted homepage R2.1 and dev hooks | Treat R2.1 as superseded by R3; keep the navigation work; remove dev hooks; discard nothing without your explicit instruction |

## 9. Session handoff (per `SESSION_HANDOFF_TEMPLATE.md`, condensed)

- **Done:** audit of seven designs; five documents in this folder; isolated production build; browser checks.
- **Changed in the repository:** only `docs/website-integration-audit/` (untracked). No code, route, metadata, navigation, commit, push, merge or deployment.
- **Temporary artefacts:** an isolated build copy and scripts in the session scratchpad (outside the repository). The `:3499` test server was stopped.
- **Stop point:** approval gate for D1 to D5 and for implementation.
