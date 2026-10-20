# /blog · G2 Implementation Report (2026-10-20)

> **OWNER APPROVAL — 2026-10-20:** "Blog G2 approved as shown. Hold commit, push, PR and deployment until I authorise them."
> G2 is approved as shown. **Commit, push, PR, merge and deployment are NOT authorised.** BL-D6 remains open.

**Authorisation (owner, "MAPPEDSKILLS — BLOG G2 IMPLEMENTATION"):** implement and verify the approved G1 blog listing.
**Not authorised:** commit beyond the feature branch scope, push, PR, merge, deployment, Contentful changes, article-page changes, BL-D6.

**Status:** implemented on branch `feat/blog-g2` (from `origin/main` `0b27cfd`). *Git and PR preparation was authorised separately afterwards (commit, push, PR against `main`, DEC-066); see the PR.* Nothing merged or deployed. No Contentful entry touched. The main
checkout (`feat/ai-search-redesign`) and its uncommitted documentation are untouched apart from this folder and the
git-ignored `.claude/launch.json` preview entries.

**Local preview (fixture data, see §5):**
- http://localhost:3231/blog — the 7 live articles (titles, excerpts, categories, order as served on 2026-10-20)
- http://localhost:3232/blog — edge cases (very long title/excerpt/category, no excerpt, no category, unbroken word)
- http://localhost:3233/blog — no Contentful posts (empty state)
- http://localhost:3234/blog — unchanged `origin/main` with the same 7 articles (the "before")

---

## 1. Approved G1 requirements implemented

| G1 item | Implemented |
|---|---|
| R1 accurate lede (BL-D2) | "Practical reads on search, ads, content and turning website visits into enquiries — for business owners deciding what to do next." |
| R1 description (BL-D3) | "Practical guides on search, paid ads, content and turning website visits into enquiries, written for business owners." (also flows to `og:description`/`twitter:description` through `createMetadata`) |
| R2 hover/focus | 150 ms: row background → ground, padding 4 → 12 px (8 px narrow), title underline → tangerine, arrow box fills ink. Focus: 3 px tangerine outline. |
| R3 close (BL-D5) | Shared tangerine C+ close, "Reading about a problem you have?", the approved body, `ActionPair` "Tell us about your business" → `/contact`, "Request a call" → `/schedule-call` (as `/faq`). |
| R4 C+ shell | `CplusPage`, `px-wrap`, shared `Breadcrumb` (Home / Blog), kicker "Blog". |
| R5 reading time (BL-D4) | Row meta = category · reading time; no date on rows. |
| R6 count label | "N guides" (singular "1 guide") as the list H2 above the 3 px ink rule. |
| R7 H1 (BL-D2) | "Marketing guides, **written plainly.**" (tangerine phrase, `b-named`). |
| Empty state (G1 `?empty=1`) | No list section; lede "Nothing is published here yet."; close kept; no placeholder rows. |

**Fidelity to the mockup (VERIFIED, automated):** at 1440, 1280, 768, 375 and 320 px, in Chromium, Firefox and WebKit, the
built page has the **same visible text** and the **same section heights** (hero / list / close, ±1 px) as the approved
G1 mockup (`checks-*.json`, `parity`).

**One addition beyond the mockup (robustness, no visual change for normal text):** `overflow-wrap: anywhere` on the row
meta, title and excerpt, so an unbroken Contentful string wraps instead of running out of its column. Found by the edge
fixture; after the change, parity with G1 is unchanged.

## 2. Changed files

| File | Change | Why |
|---|---|---|
| `app/(pages)/blog/page.tsx` | Rewritten to render `CplusPage` + `BlogBody`; description (BL-D3). Title, path, `revalidate = 60` and the `getBlogListPosts()` call unchanged. | The approved design; the old `RouteHero`/`EntryList`/`CommercialSection` composition and its "Two subjects" empty-state copy are no longer used here. |
| `components/cplus/blog/BlogBody.tsx` (new) | Server component: hero, list, close. No client code. | G1 layout. |
| `components/cplus/blog/content.ts` (new) | Approved copy. | BL-D2, BL-D5, empty-state wording. |
| `components/cplus/blog/blog.css` (new) | G1 `bl.css` rules unchanged (minus the review banner) + the overflow-wrap rule. Every selector is `bl-` scoped. | Cannot reach any other page. |
| `tests/blog-page.test.cjs` (new) | 8 guards: title/path/revalidate, approved description, data source, copy, rows from listing data only (no date/author/image, Contentful order, excerpt optional), empty state, CTA pair, 150 ms + reduced motion + forced colours, `bl-` scoping, no shared list primitives or article components. | Regression protection. |

Diff: 1 modified file (+12 / −105), 4 new files. **Not changed:** `EntryList`, `RouteHero`, `CommercialSection` (shared with
`/press`, `/research`, `/work`, 404), `lib/contentful/*`, `/blog/[slug]`, every `components/blog/*` file, analytics, layout, header, footer, sitemap, dependencies.

## 3. Before / after evidence
- **Before (production):** `../audit/screenshots/blog-{1440,768,375}-full.png`.
- **Before (same data, local):** http://localhost:3234/blog.
- Screenshots are kept outside Git; the measured results are committed as `checks-<engine>.json` and `regression.json`.
- **After:** `screenshots/<engine>/live7-<width>-{fold,full}.png` (chromium, firefox, webkit × 1440/1280/768/375/320);
  `edge-<width>-full.png`; `plain-<width>-full.png` (empty state); `row-hover-<width>.png`, `row-focus-<width>.png`.
- **G1 reference:** `../g1/screenshots/`.

## 4. Automated test results (VERIFIED, run on `feat/blog-g2`)
| Check | Result |
|---|---|
| `npm run typecheck` | pass |
| `npm run lint` | pass (exit 0) |
| `npm test` | 166 tests: 165 pass, 1 skipped (pre-existing skip), 0 fail; includes the 8 new blog tests |
| `npm run build` + `npm run verify:build` | pass (23 prerendered pages checked) |
| `npm run build:cpanel` + `verify:build` | pass |
| Fixture builds (live7, edge, empty) and `origin/main` base build | pass |

## 5. Browser and responsive verification (VERIFIED, automated — `checks-{chromium,firefox,webkit}.json`)
Playwright Chromium, Firefox and WebKit builds; emulated viewports 1440, 1280, 768, 375, 320; consent not accepted (banner removed from the DOM for captures only).

- **Reproduce:** build a scratch copy with `CONTENTFUL_SPACE_ID=fixture CONTENTFUL_ACCESS_TOKEN=fixture CONTENTFUL_PREVIEW_ACCESS_TOKEN= BLOG_FIXTURE_SET=live7|edge NODE_OPTIONS=--require <abs>/docs/blog-redesign/g2/tools/blog-fixture-preload.cjs`, serve on the ports above, then `node tools/verify.cjs <engine>` and `node tools/regression.cjs` (paths in the scripts are the worker's local paths).
- **Contentful data:** the local environment has **no Contentful credentials**, so real Contentful was **not** queried. The page ran through the real client, queries and mappers with the repo's Gate 4 fixture preload, fed with (a) the 7 live listing entries copied from production (titles, excerpts, categories, order; synthetic bodies sized to the live reading times), (b) edge cases, (c) no posts.
- No horizontal overflow and no clipped row text in any engine, width or data set; no text under 12 px; 0 console errors.
- Row meta never wraps mid-item (two lines ≥761 px, one line ≤760 px). Left edges match the C+ grid (156 px at 1440, 16 px at 375/320).
- Edge set: 590-px-tall long row at 320 px renders cleanly; missing excerpt renders no empty line; missing category shows the mapper's existing fallback "Marketing Strategy" (pre-existing behaviour, unchanged).
- Links: all 7 rows link to the unchanged `/blog/{slug}`; keyboard Enter on the first row navigates to `/blog/content-marketing-services-in-pune` in all three engines; close CTAs point to `/contact` and `/schedule-call`.
- JavaScript disabled: all 7 rows render.

## 6. Accessibility findings
- **Structure:** one H1; H2 "N guides"; H2 close; no skipped levels. Breadcrumb is a named `nav` with `aria-current="page"`. Decorative separator, arrow box and "Read" cue are `aria-hidden`.
- **Keyboard:** Tab order in `<main>`: breadcrumb "Home" → first row → … (all engines). Focus: 3 px solid `#FF5B04` outline, 2 px offset.
- **Contrast (computed):** all text ≥ 4.5:1 except the tangerine H1 phrase at 3.97:1, which is large text (≥ 38 px, 800) and passes AA's 3:1 large-text threshold; it is the shared `b-named` token used on `/faq`.
- **Targets:** every row and CTA ≥ 44 px. The shared breadcrumb "Home" link is 19–20 px tall, the same component and size as live `/faq`. It is under 24 px, so WCAG 2.2 target size (2.5.8) depends on its spacing exception (no other target within 24 px); not measured here. Recorded, not changed, because it is the shared C+ breadcrumb.
- **Link names:** each row's accessible name is its category, reading time, title and excerpt — verbose for screen-reader link lists. This matches the live page's pattern (the old `EntryList` row link also contained meta, title and summary) and the approved G1 markup, so no regression; a shorter name (`aria-labelledby` on the title) could be considered later.
- **Reduced motion:** transitions resolve to ~0 s in all engines (global rule plus the scoped `bl-` rule). **Forced colours:** arrow box and focus outline use system colours.
- **Not done:** VoiceOver, TalkBack, NVDA; real devices; shipping Safari and Firefox applications.

## 7. SEO, Contentful and analytics regression (VERIFIED — `regression.json`, `origin/main` vs G2, same fixture data)
| Route | Status | Title | Meta | Canonical | JSON-LD | `<main>` text | `data-*` | `dataLayer` on load |
|---|---|---|---|---|---|---|---|---|
| `/blog` | 200/200 | same | **description changed (BL-D3)**; robots, og/twitter otherwise same | same | same (Organization only) | changed (approved) | same (none) | same (`page_view`, `page_type: editorial`) |
| 7 × `/blog/{slug}` | 200/200 | same | same | same | same (Article, BreadcrumbList) | same | same | same |
| `/press`, `/research`, `/work`, `/faq`, `/` | 200/200 | same | same | same | same | same | same | same |
| 404 | 404/404 | same | same | same | same | same | same | same |
| `sitemap.xml` | identical (8 `/blog` URLs) |

- Clicking the close CTAs or a row pushes nothing to `dataLayer` before consent, identical to `/faq`'s close on `origin/main`. No events, `dataLayer` pushes or `data-*` hooks added.
- **For E6 (GTM):** `/blog` now contains links to `/contact` and `/schedule-call` in `<main>` that it did not have; any GTM link-click trigger matching those URLs will now also fire from `/blog` (intended). New ids: `bl-h1`, `bl-list-l`, `b-close-h`. Removed: the old route's unnamed hero/section markup (no ids read by analytics code).

## 8. Outstanding issues and known limitations
1. Real Contentful data not rendered locally (no credentials); verified with copied live listing data through the real client. First real-data render will be on the next authorised deployment or a credentialled preview.
2. Manual screen-reader, real-device, shipping-browser and GTM Preview checks not performed.
3. Row wording comes from Contentful and is unchanged (audit CL3, BD2–BD4): e.g. "MappedSkills gets results", city-page titles, inconsistent categories. Out of scope (R11).
4. Article pages remain in the legacy style; the visual gap between the index and articles is now more visible (audit R10/R11).
5. Title remains "Writing | MappedSkills" while the H1 says "Marketing guides…" (title unchanged by decision).
6. `CURRENT_STATE.md` still says production `/blog` shows "No articles found" (out of date); not edited — governance records need separate authorisation, and no DEC entry has been recorded for BL-D1–BL-D5 or G2.

## 9. BL-D6 status
**Unchanged and not started.** Article-page newsletter block, article "Book a call"/"Request a call" relabel, the "Book a Client Discovery Call (30 minutes)" content link, city-page article rewrites and all Contentful content are untouched.

## 10. Recommendation
**GO for owner review of G2** (local preview above). Implementation matches the approved G1 in three engines at five widths, with no SEO, structured-data, analytics or article-page regression beyond the approved description.

**Before any release (each needs separate authorisation):** merge; deployment; then a live check against real Contentful data and the manual checks in §8.2.
