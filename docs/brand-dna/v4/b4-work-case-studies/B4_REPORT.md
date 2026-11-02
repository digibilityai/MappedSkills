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
| B4-04 Portfolio | No change to eligibility, images, evidence, classifications or order. ClassPe and InsurYo remain without a service and are in no service filter. Proposed order below, NOT IMPLEMENTED. |
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
| `node --test tests/*.test.cjs` | 649 tests, 648 pass, 0 fail (1 skipped by the suite) |
| New `tests/b4-work-case-studies.test.cjs` | 8 tests, all pass |
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

## 6. SEO and evidence preservation

Unchanged and checked by test or request: all canonicals, `/work` robots, `/work/page/2` indexable and self-canonical, Home Decor `noindex, follow` (test asserts the code path), all slugs, redirects (`/work/page/1` 308), `UNLISTED_CASE_STUDY_IDS`, eligibility, case-study copy, proof figures, sources and caveats (no content file touched), existing metadata and structured data other than the added `BreadcrumbList`. No title was rewritten apart from the page 2 dash.

## 7. Pending Owner Decision: Portfolio Order (NOT IMPLEMENTED)

Current default order is listing priority then Contentful order (read from the live `/work/index.json`). The proposal moves only ClassPe and InsurYo, from the second and third place (ahead of every paid-advertising case) to the last two places of page 1, so paid Google Ads and Meta Ads work leads. Both stay on page 1, keep their classifications (no service tag, in no service filter) and are not relabelled as paid advertising.

| Position | Client | Existing service classification | Proposed position | Reason |
|-:|:-|:-|-:|:-|
| 1 | Om Sai Developer | Meta Ads | 1 | Unchanged |
| 2 | ClassPe | None (organic social) | 11 | Moves below the paid cases; stays on page 1 |
| 3 | InsurYo | None (organic growth) | 12 | Moves below the paid cases; stays on page 1 |
| 4 | Ameba Software | SEO | 2 | Moves up two as ClassPe and InsurYo move |
| 5 | AnybodyCanBake (Google Ads) | Google Ads | 3 | Moves up two |
| 6 | AnybodyCanBake (Meta Ads) | Meta Ads | 4 | Moves up two |
| 7 | EKoching | Google Ads | 5 | Moves up two |
| 8 | Klenzmo | Meta Ads | 6 | Moves up two |
| 9 | Bakersville | Google Ads | 7 | Moves up two |
| 10 | Phoenix Laundry | Google Ads | 8 | Moves up two |
| 11 | HutnHomes | Meta Ads | 9 | Moves up two |
| 12 | AnybodyCanBake (SEO) | SEO | 10 | Moves up two |
| 13 to 20 | Advit Prints, Meticulous Business Plan, Libros Library, Bakedemy (Google Ads), Bakedemy (Meta Ads), Bblewrap, Talreja & Talreja, Wanderlooms | Google Ads or Meta Ads | 13 to 20 | Unchanged |

How it would be done if approved (not done): set `listingOrder` on ClassPe and InsurYo in Contentful (a CMS write) or add a code-side priority; either needs separate authorisation. The Home Decor study is unlisted and not in the table.

## 8. Deferred and unresolved

- **Deferred:** Om Sai Developer uses the generic Open Graph image; a page-specific image is not part of B4.
- **Deferred:** blog and other pages' items in the site-wide audit (B5 and later); title rewrites; the DEC-085 consent-banner overlap; footer social icon links report 0 px font size (shared footer).
- **Owner decision 1:** run the 21-page sweep (including Om Sai and the unlisted Home Decor study) against Contentful, by allowing a read of the production Contentful values for a build, or by running it yourself.
- **Owner decision 2:** the portfolio order table above.
- **Note:** the closing label follows the study's service classification in the CMS, not a separate "verified" flag. If "verified" must mean something stricter, say so.
