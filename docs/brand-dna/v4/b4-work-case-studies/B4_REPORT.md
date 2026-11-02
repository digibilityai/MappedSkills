# B4: /work and case-study template to Brand DNA 4.0

**Date:** 2 November 2026. **Branch:** `feat/b4-work-case-studies` from `main` `bff5af6e8599d547cc5f906ba5514462448f0fdf` (confirmed equal to `origin/main` before work began). **Decision:** DEC-122.
**Status:** draft PR for owner visual review. Not merged, not deployed, no CMS write, no migration.
**Scope:** `/work`, `/work/page/2`, the case-study template (`/portfolio/*`), the sitemap entry for `/work/page/2`. Approved as B4 Implementation Scope v1.0.

## 1. Implemented corrections

| Group | Change |
|:-|:-|
| B4-01 Typography | Case-study chips, labels and fact labels raised from 11 to 11.8 px to 12 px (`.ct-label`, `.ct-chip`, `.ct-spot-k`, `.ct-ctx dt`, `.ct-res-k`, `.ct-said-k`, `.ct-close-k`). Explanatory captions (`.ct-art figcaption`, `.ct-stage figcaption`) from 12.5 px to 14 px. `/work` closing kicker from 11.8 px to 12 px. `/work` heading emphasis `#D94400` (existing token `--resolve-accent-deep`, previously `#A83400`). Card text `#3a3542` (off palette) replaced by `--resolve-dim`. |
| B4-02 H1 and dates | H1 wording and heading structure unchanged. The reported result is shown in the display colour where the title states one (14 studies, `lib/case-study-headline.ts`, a per-study phrase that must be an exact run of the title); every other title is one colour (Om Sai, ClassPe, InsurYo, Ameba Software, AnybodyCanBake Meta Ads, AnybodyCanBake SEO, Home Decor). Qualifiers stay inside the emphasised run ("attributed", "reported"). Displayed periods use "Sep 2024 to Mar 2025" (`periodLabel`); the stored start and end dates are unchanged. `/work` count line reads "Showing 1 to 12". |
| B4-03 CTAs | Closing button by service classification: Google Ads gives "Discuss Your Google Ads", Meta Ads gives "Discuss Your Meta Ads", everything else (SEO, ClassPe, InsurYo, Home Decor) gives "Discuss Your Advertising". Mid-page prompt is "Discuss Your Advertising" on the existing 52 px pill. "Request a Call" (`/contact?intent=call`) is the secondary in the closing band on every study, once, not repeated mid-page. `/work` closing: "Discuss Your Advertising" and "Request a Call". Destination stays `/contact`. On phones the breadcrumb links and the case-file service link are 44 px tall (were 29 px). Focus outline (3 px) and reduced motion unchanged; no new motion. |
| B4-04 Portfolio | No change to eligibility, images, evidence or classifications. ClassPe and InsurYo remain without a service and are in no service filter. The owner-approved first-page order is implemented in code (section 7). |
| B4-05 Service names | "Meta Ads" replaces "Social Media Ads" in the case-study chip, case file, closing kicker, "part of our" sentence, library cards and the Service filter (`caseServiceLabel`). Internal keys (`/social-media-ads`, URL value `social-media-ads`) unchanged. Filter order: Google Ads, Meta Ads, SEO, then the remaining existing categories. |
| B4-06 SEO | `BreadcrumbList` JSON-LD on every case study (Home, Case studies, client, with the canonical case URL). `/work/page/2` stays indexable and self-canonical and is added to the sitemap (computed from the library size, so a page appears only when it exists). Page 2 title "Work, page 2 \| MappedSkills" (en dash removed). |

## 2. Changed files

`app/(pages)/work/page/[n]/page.tsx`, `app/sitemap.ts`, `components/b2/WorkLibrary.tsx`, `components/b2/work.css`, `components/case-study/CaseStudyTemplate.tsx`, `components/case-study/case-study.css`, `components/cplus/work/content.ts`, `components/cplus/work/studies.ts`, `lib/case-study-library.ts`, new `lib/case-study-headline.ts`, new `tests/b4-work-case-studies.test.cjs`, tests updated only where an expectation changed (`work-page`, `case-study-library`, `case-study-final-four`, `case-study-paid-batch`), `docs/00-project/DECISION_LOG.md`, this report.

## 3. Before and after

| Item | Before (live, 2 Nov 2026, public pages) | After (local build) |
|:-|:-|:-|
| H1 emphasis, AnybodyCanBake Google Ads | "attributed to Google Ads" | "1,410 paid enrolments" |
| H1 emphasis, HutnHomes | "for HutnHomes" (client name) | "329 site visits and 23 reported sales" |
| Service chip, Meta cases | "Social Media Ads" | "Meta Ads" |
| Period chip | "Feb 2020" and "Aug 2021" joined by an en dash | "Feb 2020 to Aug 2021" |
| Closing CTA | "Discuss Your Advertising", "Discuss Your Google Ads Goals", "Discuss Your Meta Ads Goals", "Contact us", "Discuss Your SEO Goals" and others | the three labels in section 1 |
| `/work` closing | "Contact us" / "Request a call" | "Discuss Your Advertising" / "Request a Call" |
| Breadcrumb tap height at 390 | 29 px | 44 px |
| `/work/page/2` title | "Work" and "page 2 \| MappedSkills" joined by an en dash | "Work, page 2 \| MappedSkills" |
| Sitemap | no `/work/page/2` | `/work/page/2` listed (when the library has a second page) |

Screenshots were taken in the review pane only and are not stored in the repository; the owner preview below is the visual record.

## 4. Test and build results (all run)

| Check | Result |
|:-|:-|
| `node --test tests/*.test.cjs` | 650 tests, 649 pass, 0 fail (1 skipped by the suite) |
| New `tests/b4-work-case-studies.test.cjs` | 9 tests, all pass |
| `npm run typecheck` | pass |
| `npm run lint` | 0 errors, 14 warnings (identical to `main`) |
| `npm run build` (GTM id and site URL in the process environment only) | pass |
| `npm run verify:build:production` | OK, 27 prerendered pages |

**Limit of this verification (important).** The production Contentful values were not available to this session (a read of the production host was denied and was not retried). The browser and programmatic checks therefore ran on the repository's development preview data (`CASE_STUDY_LOCAL_PREVIEW=1`), which renders **19 of the 21** studies through the real template. **Not rendered locally: `om-sai-developer-meta-ads` and the unlisted `seo-for-home-decor-brand`.** Their H1s, classifications and closing labels are covered by the unit tests and by the live title list, but the unlisted-study visual check and the 21-page sweep still need to be run with Contentful (owner decision 1 below).

## 5. Browser and programmatic verification (19 studies, local preview)

- `/work` at 1440, 1280, 390 and 360: no horizontal overflow, no clipped text, no text under 12 px (the three icon-only footer social links report 0 px font size; unchanged, not in scope), H1 emphasis `rgb(217, 68, 0)` = `#D94400`, no target under 44 px at 390 and 360.
- `/work/page/2` at 1440 and 390 (and 360): title, `index, follow`, self-canonical path, "Showing 13 to 19", same results; `/work/page/3` is 404, `/work/page/1` is 308 to `/work`.
- Case studies: long H1 (HutnHomes), short H1 (Bblewrap), long figure H1 (Wanderlooms), no emphasis (ClassPe) at 1440, 1280, 390 and 360; all 19 at 390 and 1440 through an in-page sweep: 0 overflow, 0 text under 12 px, 0 captions under 14 px, 0 targets under 44 px on phones, 0 clipped elements.
- Each emphasised phrase's numbers also appear in the study's own page text (14 of 14), so the emphasis points at a figure the study itself reports.
- All 19 pages: exact H1 text equals the study title, one `BreadcrumbList` with three items, correct closing label, "Request a Call" once, no en or em dash in the rendered HTML.
- Keyboard focus: the mid-page CTA, breadcrumb links, case-file service link and both closing actions show a 3 px outline. Reduced motion: no motion added; existing guards untouched.
- Service filter (interactive): options "Google Ads (8), Meta Ads (7), SEO (2)"; selecting Meta Ads lists 7 studies and none of ClassPe or InsurYo; pagination links are real links; JavaScript off: controls are `hidden`, 12 cards and numbered page links render server side.
- **Not verified in this pane:** restoring a filter from a shared URL in the browser (the pane does not run `requestAnimationFrame`, which that unchanged code path uses). The parse and serialise logic is covered by the existing library tests. Back-button behaviour on filters was not exercised for the same reason.

### 5a. Follow-up verification (portfolio order commit)

- **Filter URL and history (Claude in Chrome, which runs `requestAnimationFrame`):** a shared Meta Ads filter URL restores the filter directly (7 of 19 match, none of ClassPe or InsurYo); adding the Education industry gives 2 of 19; Clear filters returns the unfiltered approved order and removes the query. Opening a study from a filtered list and going back restores the filter (8 of 19 for Google Ads), and forward returns to the study. Filter changes use `replaceState` (existing design), so Back leaves the page rather than stepping through filter states. No filtered result set exceeds 12, so filtered pagination was not exercised in a browser; the paging helpers are unit tested.
- **Om Sai Developer:** rendered from the repository's recorded fixture (Om Sai final fields, no credentials). H1 "Meta ads for a real estate developer in Mumbai" is the fixture's text and differs from the live H1 ("Meta ads for a Chembur housing developer"), so this is a template check, not a live-content check. No emphasis (no figure), chips "Meta Ads", "Real estate", "Sep 2024 to Feb 2026", closing "Discuss Your Meta Ads" and "Request a Call", mid-page "Discuss Your Advertising", one BreadcrumbList, no long dash; at 1440, 1280, 390 and 360: no overflow, no clipped text, no text under 12 px, no captions under 14 px, no phone target under 44 px.
- **Home Decor (unlisted):** NOT verified in a browser. The only recorded snapshot (22 October) renders it with the legacy template (`noindex, follow` and its canonical confirmed there), but the live page uses the new template, so that snapshot cannot test the B4 template changes on it. A Contentful-backed render is still needed.
- **Regression (preview data, 19 studies):** `/work` at 1440, 1280, 390 and 360 and `/work/page/2` at 1440 and 390: no overflow or clipping, no small text, no short targets, emphasis `rgb(217, 68, 0)`. All 19 study pages: H1 equals the title, one BreadcrumbList, correct closing labels and "Request a Call", no long dash. `/work/page/2` robots `index, follow`, in the sitemap; the template, CSS and copy files are unchanged by this commit.
- **The 21-page visual sweep has not passed in full:** 19 pages on preview data, Om Sai on a fixture, Home Decor unverified.

## 6. SEO and evidence preservation

Unchanged and checked by test or request: all canonicals, `/work` robots, `/work/page/2` indexable and self-canonical, Home Decor `noindex, follow` (test asserts the code path), all slugs, redirects (`/work/page/1` 308), `UNLISTED_CASE_STUDY_IDS`, eligibility, case-study copy, proof figures, sources and caveats (no content file touched), existing metadata and structured data other than the added `BreadcrumbList`. No title was rewritten apart from the page 2 dash.

## 7. Portfolio order (OWNER APPROVED AND IMPLEMENTED, follow-up commit)

The owner approved the exact first-page order. It is a code-side list (`APPROVED_LEAD_ORDER` and `leadOrdered` in `lib/case-study-library.ts`), applied in `fetchContentfulCaseStudies` after the existing listing-priority order, so it feeds the `/work` pages, `/work/index.json`, the sitemap and the "next case study" link alike. No Contentful field or `listingOrder` value is read or written; eligibility is untouched; a slug with no published study is skipped, and nothing is removed.

| Position | Client | Classification |
|-:|:-|:-|
| 1 | Om Sai Developer (`om-sai-developer-meta-ads`) | Meta Ads |
| 2 | AnybodyCanBake (`google-ads-for-online-courses`) | Google Ads |
| 3 | AnybodyCanBake (`anybodycanbake-meta-ads`) | Meta Ads |
| 4 | EKoching (`ekoching-google-ads`) | Google Ads |
| 5 | Klenzmo (`klenzmo-meta-ads`) | Meta Ads |
| 6 | Bakersville (`bakersville-google-ads`) | Google Ads |
| 7 | Phoenix Laundry (`phoenix-laundry-google-ads`) | Google Ads |
| 8 | HutnHomes (`hutnhomes-meta-ads`) | Meta Ads |
| 9 | Ameba Software (`seo-ameba-software`) | SEO |
| 10 | AnybodyCanBake (`anybodycanbake-seo`) | SEO |
| 11 | ClassPe (`classpe-social-media-strategy`) | none (organic social) |
| 12 | InsurYo (`insuryo-organic-growth`) | none (organic growth) |
| 13 to 20 | Advit Prints, Meticulous Business Plan, Libros Library, Bakedemy (Google Ads), Bakedemy (Meta Ads), Bblewrap, Talreja & Talreja, Wanderlooms | existing relative order |

All 12 slugs match published studies in the live public index (`/work/index.json`, 20 studies). The unlisted Home Decor study is not in the library and is not promoted. ClassPe and InsurYo keep no service and stay out of the Google Ads and Meta Ads filters.

**Order verification.** Unit tests (`tests/b4-work-case-studies.test.cjs`) apply the order to the 20 live slugs: exact first 12, positions 13 to 20 in their previous relative order, count unchanged, nothing added or removed, idempotent, ClassPe and InsurYo on page 1, service filters exclude them and only narrow, search unchanged, page 1 and 2 slices correct. In the browser (preview data, 19 studies, Om Sai absent from that data) the library shows the approved sequence of the studies present, the unfiltered default returns after clearing filters, and `/work/page/2` lists the remaining 7 in order. With JavaScript off the server HTML carries the same order and page links.

## 8. Deferred and unresolved

- **Deferred:** Om Sai Developer uses the generic Open Graph image; a page-specific image is not part of B4.
- **Deferred:** blog and other pages' items in the site-wide audit (B5 and later); title rewrites; the DEC-085 consent-banner overlap; footer social icon links report 0 px font size (shared footer).
- **Owner decision 1:** a Contentful-backed render of Home Decor (and of Om Sai with its live text) is still needed, by the owner or with an authorised read-only environment.
- **Owner decision 2 (resolved):** the portfolio order was approved and implemented (section 7).
- **Note:** the closing label follows the study's service classification in the CMS, not a separate "verified" flag. If "verified" must mean something stricter, say so.

## 9. Final verification (2 November 2026, before merge authorisation)

Two defects were found and fixed with the smallest change and a regression test each. No visual design, copy, claim, classification or CMS value changed.

| Finding | Fix | Test |
|:-|:-|:-|
| **Print hid content.** Printing a case study without scrolling first left every below-the-fold entrance in its waiting state: the stage photograph clipped to nothing (`clip-path: inset(0 0 100% 0)`), the outlined client name at zero opacity, and 7 to 12 takeaways, headings and list items at zero opacity. | A `@media print` block in `components/case-study/case-study.css` shows each waiting state settled. Screen motion for normal visitors is unchanged. | `tests/b4-work-case-studies.test.cjs` (fails without the fix) |
| **Approved order not guaranteed.** `/work` moved `FEATURED_SLUG` (`seo-ameba-software`) to first place whenever no published study had a listing priority, ahead of the approved order. Production is unaffected today (the live order shows listing priorities exist), but clearing them would put Ameba first. The local preview data has none, so the section 7 statement that the browser showed the approved sequence was inaccurate: it showed Ameba first. | `libraryStudies` keeps the first study first when it is an approved lead. | `tests/case-study-library.test.cjs` (fails without the fix) |

**Accessibility and motion (local preview, Playwright, 1440 and 390, `/work`, `/work/page/2` and the AnybodyCanBake Google Ads, Klenzmo, Ameba Software and ClassPe studies):** with JavaScript, after scrolling, every stage image is unclipped and every image decoded; with reduced motion nothing is armed or pending and the stage is unclipped at load; with JavaScript off nothing is armed or pending, text, navigation and images render; in print (after the fix) the stage, client name and all text are visible. No horizontal overflow in any mode. The only zero-opacity text in every mode is the closed header menu panels.

**Published content (public live pages, 2 November 2026, served by `main` code):** `/work/index.json` lists 20 studies, all 12 approved slugs present; B4 ordering applied to it gives the approved first 12 and keeps 13 to 20 in their existing order. Om Sai Developer: title "Meta ads for a Chembur housing developer", service route `/social-media-ads` (shown as "Meta Ads" by B4), "Reported before-and-after comparison" on each figure, artwork disclosed as conceptual. Home Decor: `noindex, follow`, self-canonical, absent from the index, the sitemap, `/work`, `/work/page/2` and the Om Sai page. **Not verified:** Om Sai and Home Decor rendered through the B4 template with their published content (no Contentful read access in this session).
