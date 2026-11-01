# Six paid-advertising case studies: local review batch report

**Status: LOCAL, awaiting owner visual review.** Branch `feat/paid-case-studies-six-local` in `../MappedSkills-six-cases` (from `origin/main` 1ebf7ba, which already contains the AnybodyCanBake Google Ads case and the Om Sai-matched hero, #67 to #69). Nothing committed, pushed, merged, deployed or published; Contentful not touched; no production configuration changed. Local approval does not authorise release.
Evidence labels: VERIFIED FACT (inspected or tested 2026-10-30) unless marked.

Preview: `http://localhost:3500` (dev server, `CASE_STUDY_LOCAL_PREVIEW=1` in the worktree's gitignored `.env.local`). Start again with `cd ../MappedSkills-six-cases && npx next dev --webpack -p 3500`.

| Case | Detail page | Service / industry placement | Card |
|---|---|---|---|
| AnybodyCanBake, Meta Ads | `/portfolio/anybodycanbake-meta-ads` | /work, /social-media-ads, /who-we-help/education | Meta Ads · Education and training |
| EKoching, Google Ads | `/portfolio/ekoching-google-ads` | /work, /google-ads, /who-we-help/education | Google Ads · Education and training |
| Klenzmo, Meta Ads | `/portfolio/klenzmo-meta-ads` | /work, /social-media-ads, /who-we-help/d2c | Meta Ads · D2C and ecommerce |
| Bakersville, Google Ads | `/portfolio/bakersville-google-ads` | /work, /google-ads, /who-we-help/d2c | Google Ads · D2C and ecommerce |
| Phoenix Laundry, Google Ads | `/portfolio/phoenix-laundry-google-ads` | /work, /google-ads, /who-we-help/enquiry-led-businesses | Google Ads · Local services |
| HutnHomes, Meta Ads | `/portfolio/hutnhomes-meta-ads` | /work, /social-media-ads, /who-we-help/real-estate | Meta Ads · Real estate |

Asset mapping, sources, hashes and the Phoenix duplicate: `ASSET_MANIFEST.md`.

## What was built

- **Data:** `lib/case-study-paid-batch.ts` (code-resident: routes, card copy, alt text, meta descriptions, closing wording, dashboard captions) feeds the image slots (`lib/case-study-images.ts`), per-study presentation (`lib/case-study-presentation.ts`) and the card builder (`components/b2/work-cards.ts`), so a case's card, hero and dashboard cannot be associated with another case.
- **Copy:** `lib/case-study-local-batch.ts`, a development-only Contentful-shaped fixture, added by the existing preview switch (`lib/case-study-local-preview.ts`: `NODE_ENV=development` and `CASE_STUDY_LOCAL_PREVIEW=1`; inert in build, start, tests and deployment). Entries use IDs that are not Contentful IDs and go through the real mapper, eligibility rule and template.
- **Pages:** the existing case-study template and THE RESOLVE tokens, unchanged. Closing band: "Tell us what you are trying to fix", "Discuss Your Advertising" (contact) and the existing "Request a call" (booking). Stage: wide 2.6:1 derivative with the website's outlined foreground client name; narrow screens show the supplied hero whole; sharing image is the supplied hero; each stage carries "Illustrative scene, not a client photograph."
- **Placements:** `components/case-study/RelatedCaseCards.tsx` adds a "More case studies" section (shared `WorkCard`, dedicated card image, link to the detail page) to /google-ads, /social-media-ads, and the education, D2C, real-estate and enquiry-led pages, selected from the library by service and sector or industry (`lib/case-study-related.ts`), never per study. Existing bespoke cards (AnybodyCanBake Google Ads, Om Sai, Wanderlooms) are kept and excluded from the new section. The section renders nothing until studies are published, inside a Suspense boundary, so these pages are unchanged in production until release. The six page files themselves are unchanged.
- **Template:** one new optional slot flag `still` (no scroll-linked zoom for artwork with text near its edges) and an optional second closing link. Existing studies unaffected (tested).

## Surface audit

| Surface | Result |
|---|---|
| /work and filters | all six cards plus AnybodyCanBake Google Ads, each with its own image and link; filters: Education (3), eCommerce and retail (2) offered; Real estate (1 locally, 2 with Om Sai once Contentful is connected); Phoenix has no sector key |
| /google-ads, /social-media-ads | new section lists the studies of that service |
| Education, D2C, real estate, enquiry-led pages | new section lists the studies of that sector (Phoenix by industry name "Local services") |
| /services, home, About | reference only AnybodyCanBake Google Ads and Om Sai through static cards; unchanged; AnybodyCanBake Google Ads and Meta Ads are distinguished by eyebrow, button text, image and page title |
| Related work / next study | library order; unchanged mechanism |

## Checks

- `npm test`: 540 pass, 0 fail (541 listed, one skipped in the suite) (includes 12 new tests in `tests/case-study-paid-batch.test.cjs`: six unique mappings and routes, own card/hero/dashboard files at their pixels, taxonomy, numbers re-derived, board figures, copy rules, placements, inertness outside development, bar proportions of the dashboards). Existing tests adjusted in two places only: the preview count (1 becomes 7) and the card-builder source pattern.
- `tsc --noEmit`: clean. `eslint` on touched files: no errors (one pre-existing unused-import warning in `CaseStudyTemplate.tsx`).
- Browser checks (Playwright with Chrome, fonts and images awaited): all six detail pages, AnybodyCanBake Google Ads, /work and the service and industry pages at 1440 px; the six detail pages, AnybodyCanBake Google Ads, /work, /google-ads and the enquiry-led page at 390 and 360 px (`screenshots/`, logs `shoot-log*.jsonl`). Result: no horizontal overflow, no broken visible image, stage ratio 2.6 on desktop and 1.3 on phones, correct client name and artwork on every page. The cookie banner appears in the phone full-page captures (its "Reject" click did not register in the script).

## Deliberate differences from the DOCX copy

1. Thousands commas added to numbers in titles and headlines ("3957" becomes "3,957").
2. HutnHomes: "23 sales" becomes "23 reported sales" in the title and "completed sales" becomes "reported sales" (the restrictions say not to assert completed sales).
3. Three reconciliation remarks are not shown publicly: Klenzmo "The supplied ₹212 cost is consistent with a rounded whole-rupee figure", Bakersville "The supplied ₹208 cost is consistent with rounding to whole rupees", Phoenix "which is ₹625 rather than the supplied ₹615". They read as drafting notes. **Phoenix: ₹625 is used (₹4,00,000 / 640); the source's earlier ₹615 is flagged for owner review.**
4. Hyphen added to "marketing-qualified / sales-qualified" to match the artwork.
5. Bullet and figure lists are laid out as the template's results board (at most six figures): EKoching cost per enquiry (₹276.43) and the 4.32% ratio stay in the paragraph; Phoenix cost per enquiry (₹250) and the ₹50,000 lifetime value stay in prose (the estimate is under its own sub-heading, never a board figure and never in ROAS); HutnHomes unit costs and 3.08x stay in the paragraph.
6. Unfinished drafting sentences are removed (Klenzmo "Specific creative formats ... not described until the delivery details are confirmed", Bakersville "The case does not specify Search, Shopping or Performance Max because ... not yet been supplied", Phoenix "Specific services, locations and campaign changes remain to be confirmed"). Factual evidence qualifications are kept.

## Second round (owner instructions, 30 October 2026, evening)

- Phoenix hero shadow and Klenzmo hero fragment: accepted, untouched.
- Unfinished drafting sentences removed from the Klenzmo, Bakersville and Phoenix copy; evidence qualifications kept.
- New dashboards for AnybodyCanBake Meta, Klenzmo, Phoenix Laundry and EKoching converted and wired (manifest updated with hashes); EKoching now has its dashboard; the "Klenzmo" attachment that was called EKoching is mapped to Klenzmo. Captions under each dashboard carry the evidence the artwork no longer shows; Phoenix's caption explains the ₹50,000 Lifetime Value tile.
- Whole-site mobile audit at 390 and 360: `MOBILE_AUDIT_TABLE.md` (70 route-width checks pass; Contentful-driven routes BLOCKED). `npm run build` succeeds, and the production output contains none of the six cases (the preview is inert).
- Two small fixes: launch-checklist overflow and case-study breadcrumb tap target.

- Owner confirmation recorded (EKoching and Phoenix Laundry: Search and Display campaigns). Copy and alt text updated; `DEC-103` amended.

## Third round (owner corrections, 30 October 2026)

- **Captions removed** on the seven studies: the visible "Recreated agency dashboard..." captions (all seven) and the hero "Illustrative scene, not a client photograph" note including the AnybodyCanBake Meta reporting-period sentence (six new). Empty containers are gone. Evidence basis sections, periods and qualifications are untouched; alt text is kept (AnybodyCanBake Meta's hero alt still states the results period). The listing cards still carry "Illustrative artwork, not a client photograph." under the image on /work (the instruction named case-study captions only; say if it should go too).
- **Full-size actions removed**: "Open full size", the link around the dashboard and its pointer/focus styling. The dashboard is an ordinary responsive image. The shared change is confined to the seven studies: only they have an impact image (tested).
- **AnybodyCanBake Google Ads dashboard**: the footer sentence is removed from the image itself; original kept. Before/after: `edits/abc-google-ads-dashboard-before-after.png`. No unresolved image-editing task.
- **Client logos on /work**: cause was **data**, not URLs or CSS. All five logos (EKoching, Klenzmo, Bakersville, Phoenix Laundry, Hut N Homes) already existed as approved web copies in `public/images/clients/` and are shown in the register, but `lib/clients.ts` had no `caseStudy` address for them, so the hero logo strip skipped them; the strip was also capped at five. Fixed by adding the five addresses and raising the cap to eight. All six logos now show on desktop and mobile on the cream strip (`screenshots/logos/`). No logo is missing. The case cards themselves carry the artwork's own branding and no separate logo chip.
- Checks: `tools/verify-captions.cjs` passes for the seven pages and /work at 1440, 390 and 360 (no caption text, no full-size link, dashboard at its own ratio, no empty caption, no overflow, evidence basis present, six logos loaded). `npm test` 542 pass, 0 fail, 1 skipped; `tsc` clean. `npm run build` was not re-run after this round.

## Fourth round: Wanderlooms, InsurYo and ClassPe missing from /work

**Diagnosis (VERIFIED FACT, 2026-10-30):**
1. **Cause for InsurYo and ClassPe: Contentful is unavailable locally.** Every local env file has empty `CONTENTFUL_SPACE_ID` / `CONTENTFUL_ACCESS_TOKEN` (checked in this worktree, the main folder and three other worktrees; nothing in the shell environment). With no delivery configuration the library is only the preview studies, so every existing Contentful study (Om Sai, ClassPe, InsurYo, Ameba, Home Decor) is absent. It is not a filter, pagination or eligibility effect: their slugs, images (`lib/case-study-images.ts`), register entries and proof rules are intact in code and unchanged.
2. **Cause for Wanderlooms: it is not a case study in the library.** Nothing in the repository gives Wanderlooms a case-study slug, image slot or card; it appears only as an unlinked client card on the D2C page and in the client register ("no individual page and no approved service evidence"). It could appear on /work only if a published Contentful case-study entry exists for it, and its slug is not recorded anywhere I can read.
3. **Preview merge (defect fixed):** when Contentful IS configured the preview already added the new studies to the existing collection rather than replacing it, but it moved AnybodyCanBake Google Ads from its own position to the end. It now replaces that one entry in place, leaves every other existing entry untouched and in order, and appends the six new studies after them (`lib/case-study-local-preview.ts`). A visible server warning now says why existing studies are missing when credentials are empty.
4. **Pagination and filters (tested with stand-in entries that use the real slugs, test only):** 12 studies per page, library order is listing priority then Contentful order, the new studies come last. With the seven existing public studies the merged library is 13, so **page 2 exists with one study**, and no study falls between pages. Search and the service and sector filters reach every study on any page, and `/work/index.json` holds the whole list. If the live library has more than six public studies besides the six new ones, the last ones sit on `/work/page/2`; say if you want the six new studies placed earlier or a larger page size.

**Blocker:** I cannot display Wanderlooms, InsurYo or ClassPe locally without read access to Contentful. I did not look for or use management tokens (owner-run tool folders exist under the home folder; they are not authorised for this). To see them: put a delivery `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN` and `CONTENTFUL_ENVIRONMENT` in `../MappedSkills-six-cases/.env.local` (never in chat) and restart the dev server; the merge then lists them in their live positions with their own copy and tags, and the six new studies after them. Their detail pages are BLOCKED, not passed, until then. No placeholder content was created.

**Local inventory now (7, from `/work/index.json`; page 1 of 1):** 1 AnybodyCanBake Google Ads, 2 AnybodyCanBake Meta Ads, 3 EKoching, 4 Klenzmo, 5 Bakersville, 6 Phoenix Laundry, 7 HutnHomes. Wanderlooms, InsurYo, ClassPe: not listed locally (cause 1 and 2). Screenshots of /work at 1440, 390 and 360: `screenshots/work-merge/`. Service and industry placements are unchanged (the related-case section only adds studies and excludes existing bespoke cards).

Checks: `npm test` 543 pass, 0 fail, 1 skipped (new merge, order, pagination and filter test); `tsc` clean; fresh `npm run build` succeeds and contains none of the preview studies.

## Fifth round: Contentful read access and the existing studies (2026-10-30)

**Credential search (names and lengths only, no value printed or used):** the original checkout's `.env.local` and `.env.example`, this worktree's `.env.local`, every sibling worktree's `.env.local`, the shell environment and `.claude/settings.local.json` hold **no** non-empty `CONTENTFUL_*` value. The only other place the project names them is the GitHub Actions secrets (`CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`, used by the deploy workflow); secret values cannot be read back. Management tokens (owner-run tool folders) were not touched. **Result: no valid delivery settings exist locally. BLOCKED.**

**Exactly what the owner must supply, privately (never in chat), in `../MappedSkills-six-cases/.env.local`:**
- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ACCESS_TOKEN` (the Content **Delivery** API token only, not a management or preview token)
- `CONTENTFUL_ENVIRONMENT` (only if it is not `master`)
- `CONTENTFUL_CASE_STUDY_NEW_FIELDS=1` is already set. Then restart the dev server (the merge, order and 12-card pagination need no code change).
A way to enter them without echoing: `read -s "T?Delivery token: " && printf 'CONTENTFUL_ACCESS_TOKEN=%s\n' "$T" >> .env.local; unset T` (and the same for the space ID).

**What the public live site shows (read-only GETs of mappedskills.com, no credentials; VERIFIED FACT today):**
- `/work/index.json` lists **5** public studies, in this order: 1 Om Sai Developer (Social Media Ads, real estate), 2 ClassPe (education), 3 InsurYo (financial services), 4 Ameba Software (SEO, software and technology), 5 AnybodyCanBake (Google Ads, education). There is no `/work/page/2` (404).
- The four the owner confirmed (Om Sai, ClassPe, InsurYo, Ameba) all return 200 and are in the sitemap.
- **Home Decor** (`/portfolio/seo-for-home-decor-brand`) is **published but unlisted**: 200, not in the library or sitemap (the existing "not listed on /work" rule).
- **Wanderlooms:** no published case-study entry is visible: not in the live library, not in the sitemap, and `/portfolio/wanderlooms` and `/portfolio/wanderlooms-d2c-meta-ads` return 404. Whether an unpublished or differently named Wanderlooms entry exists in Contentful cannot be known without access. It is not created or assumed.

**Expected merged inventory once access exists (11, one page; ordering and the 12-card page size unchanged):** Om Sai, ClassPe, InsurYo, Ameba, AnybodyCanBake Google Ads (all as live), then AnybodyCanBake Meta Ads, EKoching, Klenzmo, Bakersville, Phoenix Laundry, HutnHomes. That is under 12, so `/work` stays a single page and no pagination appears. (The earlier "13 and a page 2" figure was a test scenario with seven stand-ins, not the live count.)

| Item | Result |
|---|---|
| Valid delivery credentials found locally | **BLOCKED** (none exist; owner to supply) |
| Om Sai, ClassPe, InsurYo, Ameba detail pages and /work cards, locally, 1440 / 390 / 360 | **BLOCKED** (live site: all four 200 and listed) |
| Home Decor locally | **BLOCKED** (live: published, unlisted, 200) |
| Wanderlooms status | **No published entry visible** on the live site; CMS status unconfirmed, nothing created |
| Merged inventory, pagination, filters, detail links, locally with live content | **BLOCKED** (merge logic itself: PASS in unit tests with stand-ins; six new studies: PASS locally) |
| Previously blocked CMS pages (/blog/[slug], /research/[slug], /press/[slug]) at 390 / 360 | **BLOCKED** |
| Six new studies, service and industry pages, whole-site audit | PASS (earlier rounds) |

No local preview of the four existing studies was fabricated, copied from the live HTML or stubbed: that would not be their Contentful entries. The preview on :3500 is unchanged and running.

## Sixth round: Contentful Delivery access configured (2026-10-30, evening)

**Access:** verified without displaying anything: `.env.local` now holds a space ID, delivery token and environment name (lengths only checked); one read-only Delivery API request returned HTTP 200 with 6 published `caseStudies` entries (5 listed plus Home Decor). Dev server restarted on :3500 (no warning about missing configuration). Nothing was written to Contentful; `.env.local` is git-ignored.

**Merged inventory (rendered, `/work/index.json` and the page): 11 studies, PASS.** Order: 1 Om Sai Developer, 2 ClassPe, 3 InsurYo, 4 Ameba Software, 5 AnybodyCanBake Google Ads, 6 AnybodyCanBake Meta Ads, 7 EKoching, 8 Klenzmo, 9 Bakersville, 10 Phoenix Laundry, 11 HutnHomes. One page (11 is under 12), no pager. **Wanderlooms: not listed** (no published entry; nothing created). **Home Decor: unlisted, PASS** (200 at its URL, `noindex, follow`, not in `/work`, the index or the sitemap).

**Four existing studies compared with the live site (HTML text, images, robots):** ClassPe, InsurYo, Ameba Software and Home Decor are **identical to live** (0 differing sentences, same images, same robots). Om Sai differs only in its page title and H1 ("Meta ads for a real estate developer in Mumbai" locally, the Contentful "Meta ads for a Chembur housing developer" live): that is the existing development-only title override (`lib/case-study-preview-titles.ts`, Stage 3 request), not a content change.

**/work at 1440, 390 and 360 (PASS):** 11 cards, each with its own loaded image and working detail link (cards for ClassPe, InsurYo and Ameba use their existing conceptual artwork, Om Sai its supplied image, the new six their supplied cards); no overflow; all eight logos in the strip load. **Filters (PASS at all three widths):** services All 11, SEO 1 (Ameba), Google Ads 4 (AnybodyCanBake, EKoching, Bakersville, Phoenix), Social media ads 4 (Om Sai, AnybodyCanBake Meta, Klenzmo, HutnHomes); industries All 11, Real estate 2, Education and training 4, eCommerce and retail 2; search finds classpe, insuryo, om sai, ameba, klenzmo and phoenix (1 each) and nothing for a nonsense term. ClassPe and InsurYo carry no service tag (as live), so they appear under All services and their industry only.

**Previously blocked pages at 390 and 360 (`MOBILE_AUDIT_TABLE.md`, new section):** all PASS: Om Sai, ClassPe, InsurYo, Ameba, Home Decor, /blog, 7 articles, /research, 2 research pages, /press, 1 release, /work (19 routes x 2 widths = 38 checks; existing studies also at 1440, with no overflow, broken image or stage problem). Reviewed by eye, accepted as design: the current-page item of the breadcrumb on blog and press pages is truncated with an ellipsis. Warnings, not changed (existing pages): the blog share link "X" is 10 x 44 px, "Open the chart image" links on the research report are 21 px high, and inline links that wrap inside a blog table cell report overlapping boxes.

Not re-run this round: `npm run build` and `npm test` (no application code changed; last results: 543 pass, build succeeds).

## Seventh round: wrapping links in the blog article (inspected by eye and by measurement)

The flagged links are **inline links inside paragraphs, not a table**, in `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers`: "Redfin", "CoStar Group", "Google Ads" and "Social Media Ads" (also "Godrej Properties" and "Lodha Group"). At 390 px and 360 px: **PASS, no defect, no code change.** They are underlined, 17 px text on a 28.9 px line pitch, and a link that wraps (for example "Social Media Ads", "Godrej Properties") sits on two separate lines that do not touch the lines above or below. The "overlap" in the audit was the bounding boxes of a wrapped link and its neighbour. Measured: every point at both ends and the centre of every line fragment of each link hits that link and no neighbour (`elementFromPoint`), so each is individually tappable. Each fragment is 23 px high; inline text links are exempt from the 24 px minimum target rule (WCAG 2.5.8 inline exception). Evidence: `screenshots/blog-links/`. Because nothing changed, the earlier passing results stand (tests 543 pass, production build succeeds).

## Open questions for the owner

1. ~~"Search + Display" on the EKoching and Phoenix dashboards~~: **CLOSED.** The owner confirmed on 30 October 2026 that both used Google Search and Display campaigns. The label stays on the supplied dashboards and both "What we did" sections state that Search and Display campaigns were managed. No other tactic was added.
2. **AnybodyCanBake Meta hero** needs its results period on the artwork.
3. Bakersville and Klenzmo identical hero headlines; HutnHomes hero headline versus its figures. (Phoenix hero shadow and Klenzmo dotted fragment: accepted by the owner.)
5. Phoenix: confirm ₹625 over ₹615; confirm ₹7,68,000 is first-order or all attributed revenue (the page assumes neither).
6. HutnHomes: definitions of the lead stages; whether visits were attended; whether sales were booked or completed; what ₹46,15,228 measures.
7. Klenzmo and Bakersville: are "products sold" units, purchase events or orders (kept as "products sold").
8. Keep the service chip "Social Media Ads" (the site's service title) on Meta cases, or relabel to "Meta Ads"? Sector chip for D2C reads "eCommerce and retail" (the existing sector list). Phoenix has no sector chip because the list has no local-services key.
9. The period chip uses the shared `periodLabel` helper, which writes "Sep 2021 – Oct 2026" with an en dash (existing behaviour on every study; supplied artwork also contains en dashes). Not changed here.
10. Phoenix period chip shows "Dec 2025 – Oct 2026" (month precision); the full "30 October 2026" is in the copy.
11. Execution detail (challenge, campaign formats, optimisation changes) is not in any draft; none was invented, so "What we did" is short for five of the six.

## Limits of this local review

- No Contentful read credentials exist in any local env file (values are empty), so the live library, including Om Sai, cannot load locally. The Om Sai detail page and its card were therefore verified by unit tests, not rendered. Run the regression with Contentful credentials before release.
- Screen-reader, real-device and consent-banner behaviour were not tested.

## Later Contentful release requirements (not executed)

Field values for all six: `case-fields.json` (generated by `tools/export-fields.cjs`; same text as the preview). For each entry in `caseStudies`: `title`, `slug` (as in the table), `clientName` (linked client entry: reuse AnybodyCanBake's existing client entry for the Meta study; create EKoching, Klenzmo, Bakersville, Phoenix Laundry, HutnHomes), `industry` (linked: "Education and training", "D2C and ecommerce", "Local services", "Real estate"; check which exist), `summary`, `problem`, `whatWeDid`, `impact`, `evidenceNote`, `showTestimonial` unticked, `sector`, `serviceKey`, `periodStart`, `periodEnd`. No image fields: artwork is in code. Order, as for AnybodyCanBake Google Ads: draft the entries unpublished, merge the code PR, deploy, then publish the six entries (the pages revalidate within 60 s). Then delete `lib/case-study-local-batch.ts` and its call. Needs separate release authorisation; the EKoching dashboard and the artwork corrections above should land first.

## Eighth round: second batch of eight studies (31 October 2026, LOCAL, awaiting owner visual review)

Source: `~/Downloads/MappedSkills_8_Final_Case_Studies_and_Image_Briefs.docx` plus 24 images. Mapping, hashes and artwork discrepancies: `ASSET_MANIFEST.md` ("Second batch"). Nothing committed, pushed, merged, deployed or published; Contentful read only (Delivery); no write.

**Preview:** `http://localhost:3500`. **Inventory (`/work/index.json`): 19 studies, 12 on page 1 and 7 on page 2 (12-card pagination).** Order: 1 Om Sai, 2 ClassPe, 3 InsurYo, 4 Ameba Software, 5 AnybodyCanBake Google Ads, 6 AnybodyCanBake Meta, 7 EKoching, 8 Klenzmo, 9 Bakersville, 10 Phoenix Laundry, 11 HutnHomes (unchanged), then page 1 ends with 12 AnybodyCanBake SEO; page 2: 13 Advit Prints, 14 Meticulous Business Plan, 15 Libros Library, 16 Bakedemy Google Ads, 17 Bakedemy Meta Ads, 18 Bblewrap, 19 Talreja & Talreja. Home Decor stays unlisted.

| Case | Detail page | Service page | Industry page | Card / hero / dashboard |
|---|---|---|---|---|
| AnybodyCanBake SEO | `/portfolio/anybodycanbake-seo` | /seo (new section) | /who-we-help/education | `anybodycanbake-seo-card / -hero(-wide) / -dashboard.webp` |
| Advit Prints, Meta Ads | `/portfolio/advit-prints-meta-ads` | /social-media-ads | /who-we-help/d2c | `advit-prints-meta-ads-*` |
| Meticulous Business Plan, Google Ads | `/portfolio/meticulous-business-plan-google-ads` | /google-ads | /who-we-help/enquiry-led-businesses | `meticulous-business-plan-google-ads-*` |
| Libros Library, Meta Ads | `/portfolio/libros-library-meta-ads` | /social-media-ads | enquiry-led (assumed local service) | `libros-library-meta-ads-*` |
| Bakedemy, Google Ads | `/portfolio/bakedemy-google-ads` | /google-ads | education | `bakedemy-google-ads-*` |
| Bakedemy, Meta Ads | `/portfolio/bakedemy-meta-ads` | /social-media-ads | education | `bakedemy-meta-ads-*` |
| Bblewrap, Google Ads | `/portfolio/bblewrap-google-ads` | /google-ads | enquiry-led (professional services) | `bblewrap-google-ads-*` |
| Talreja & Talreja, Google Ads | `/portfolio/talreja-talreja-google-ads` | /google-ads | enquiry-led (professional services) | `talreja-talreja-google-ads-*` |

**What changed in code:** eight entries appended to `lib/case-study-paid-batch.ts` (cards, alt text, descriptions, closing wording; the closing button names the service as in the document) and to the dev-only fixture `lib/case-study-local-batch.ts`; second-batch hero tool entries and conversion script; `/seo` gets the existing related-cases section (the existing Ameba card excluded so `/seo` stays unchanged in production until a new study is published); the enquiry-led audience rule also selects the `professional-services` sector; register `caseStudy` addresses for Advit Prints, Libros, Bakedemy (Google Ads). Template, tokens, captions treatment (none), no zoom: unchanged and reused.

**Deliberate differences from the DOCX:**
1. AnybodyCanBake SEO: "including 4,691 more nonbrand clicks" removed. Nonbrand rose by 4,691 but total clicks rose by only 4,180, so the nonbrand increase cannot be "included" in the total one. Now: "4,180 more organic clicks and 42 more tracked course enquiries. Nonbrand clicks rose by 4,691 ...". Owner to confirm.
2. Board layout: at most six figures per case; the rest stay in the paragraph. Bold headline line added at the start of each impact. The three-bullet strategy lists, the closing "take" sentences and the call to action are as supplied (button: "Discuss Your SEO / Meta Ads / Google Ads Goals").
3. Internal pages (calculation corrections, production notes, image briefs) are not public. Evidence notes are new, built only from the document's own caveats.
4. No testimonial, no Search and Display claim, no Lifetime Value as revenue, no combined Bakedemy total, no ROAS for Libros.

**Checks (all run 31 October 2026):**
- `tools/verify-batch2.cjs`: 24 of 24 page checks PASS (8 pages x 1440, 390, 360): no overflow, no broken image, stage 2.6 desktop and 1.3 phone, correct stage and dashboard image per client, outlined client name present, no caption text, no "Open full size", no link around the dashboard, dashboard at 1586:992, evidence present, correct closing button and "Request a call", no editorial-note leakage, no long or double dashes (`screenshots/batch2-verify-log.jsonl`, stage and dashboard crops in `screenshots/batch2/checks/`).
- Listings at 1440, 390, 360: /work, /work/page/2, /seo, /google-ads, /social-media-ads, education, D2C, enquiry-led: 24 of 24 PASS for overflow and broken images (`screenshots/batch2-listings/`). Page 2 shows the 7 new cards. Not tested: filters and search for the new studies in a browser (covered by unit tests of the library rules), the mobile menu (unchanged code), screen readers, real devices.
- `npm test`: 553 pass, 0 fail, 1 skipped (554). New `tests/case-study-paid-batch-2.test.cjs` (10 tests: mapping, every number re-derived, board figures, metric rules, copy rules, images, placement, logos, inertness); the first-batch tests were adjusted to 14 studies. `tsc --noEmit` clean; eslint clean on touched files. Fresh `npm run build` succeeds; the build's `/work/index.json` and prerendered portfolio pages contain none of the preview studies (the fixture code ships in a chunk but is gated at runtime by `NODE_ENV=development` and the flag, tested).
- Existing 11 studies and Home Decor: order, files and tests unchanged; Home Decor still unlisted.

**Observed, not changed:** on /work page 2 the last, single card (Talreja & Talreja) is shown in the existing large layout; this is existing behaviour for a lone final card. Advit's outlined name sits over printed fabric and is the lowest contrast. A dev-preview consent banner covers part of the /work screenshots (cookie banner, existing).

**Unresolved questions for the owner:**
1. Talreja & Talreja: confirm the legal entity, website and logo (none used; copy kept service neutral as the document instructs). Dashboard tile "Lifetime Value ₹30,000" should read average first contracted fee revenue per engagement.
2. Meticulous Business Plan, Bblewrap, Talreja & Talreja: no logo exists in the register; supply logos (Bblewrap's own portfolio client logos must not be used).
3. "Search + Display" label on the Meticulous, Bakedemy Google, Bblewrap and Talreja dashboards: confirm, or have it removed.
4. Four dashboards show "Date range not supplied"; the periods are only in the page text.
5. Industry classifications (not in the document): Advit = D2C and ecommerce; Meticulous, Bblewrap, Talreja = Professional services; Libros = Local services (so it appears on the enquiry-led page). Confirm or give a different industry.
6. AnybodyCanBake SEO window dates are still not supplied; no period is shown. Confirm the nonbrand wording fix above.
7. The /seo page will list SEO studies once published (Ameba excluded): confirm.

**Contentful for a later release (not executed):** same fields as the first six (`caseStudies`: `title`, `slug`, linked `clientName`, linked `industry`, `summary`, `problem`, `whatWeDid`, `impact`, `evidenceNote`, `showTestimonial` unticked, `sector`, `serviceKey`, `periodStart`, `periodEnd`); values are in the fixture (`lib/case-study-local-batch.ts`, entries 7 to 14). Reuse existing client entries for AnybodyCanBake and Bakedemy, create Advit Prints, Meticulous Business Plan, Libros Library, Bblewrap, Talreja & Talreja. `periodStart` and `periodEnd` are empty for AnybodyCanBake SEO. Image fields: none (artwork is code-resident). Release order as before; needs separate authorisation.

## Ninth round: owner decisions and functional checks (31 October 2026)

**Resolved (recorded):** (1) "Search + Display" is owner-confirmed for all four new Google Ads cases (Meticulous Business Plan, Bakedemy, Bblewrap, Talreja & Talreja); the dashboard label stays and that question is CLOSED. The page copy still makes no further tactic claim (nothing was changed, the document does not describe formats). (2) The corrected AnybodyCanBake SEO nonbrand wording is retained. (3) The SEO window dates stay unresolved: "Earlier 90 days" and "Later 90 days" only; no dates are shown or invented.

**Functional checks (browser, `tools/functional-batch2.cjs`, 1440, 390, 360; log `screenshots/batch2-functional-log.jsonl`): 99 of 99 PASS.** Page 1 holds the first 12 in order and page 2 the last 7 at all three widths. Starting on `/work/page/2`: each service filter (Google Ads 8, Social media ads 7, SEO 2) and each industry filter (Real estate 2, Education and training 7, eCommerce and retail 3, Professional services 3) returns the complete set from the whole 19-study collection in library order, including studies that sit on page 1; every search term tried (talreja, bakedemy, libros, bblewrap, meticulous, advit, om sai, classpe) finds its study wherever it sits and a nonsense term shows none; combined education + Google Ads, then "bakedemy", then a conflicting industry behave correctly; clearing everything restores page 1 in the original order with "Page 1 of 2". While a filter is active the pager is hidden and results are one list (existing behaviour; the address bar stays on `/work/page/2` while filtering from that page). **Mobile menu** (`tools/menu-check.cjs`, `screenshots/batch2-menu-log.jsonl`): 32 of 32 PASS (16 affected routes: `/work`, `/work/page/2`, `/seo`, `/google-ads`, `/social-media-ads`, the education, D2C and enquiry-led pages and the eight detail pages, at 390 and 360): opens, stays inside the viewport, 14 links, no small or bad tap target, closes. Not tested: screen readers, real devices.

### Exact artwork corrections for owner review (supplied files NOT altered)

**A. Four dashboards whose date selector reads "Date range not supplied"** (period from the final DOCX in the right column; the pages already show these periods in text and chips):

| Supplied file (`~/Downloads`) | Repository file | Period in the final DOCX |
|---|---|---|
| `advit-prints-meta-ads-dashboard.png` | `public/images/case-studies/advit-prints-meta-ads-dashboard.webp` | February 2024 to August 2024 |
| `meticulous-business-plan-google-ads-dashboard.png` | `…/meticulous-business-plan-google-ads-dashboard.webp` | April 2026 to September 2026 |
| `bblewrap-google-ads-dashboard.png` | `…/bblewrap-google-ads-dashboard.webp` | September 2024 to March 2025 |
| `talreja-talreja-google-ads-dashboard.png` | `…/talreja-talreja-google-ads-dashboard.webp` | March 2022 to September 2022 |

**B. REPLACEMENT REQUIRED: `talreja-talreja-google-ads-dashboard.png`** (repository `talreja-talreja-google-ads-dashboard.webp`). The tile reads **"Lifetime Value ₹30,000"**. The source says ₹30,000 is the average first contracted fee revenue per engagement, and that lifetime value and recurring fees are not included. The correct tile label is **"Average first contracted fee revenue per engagement"**. Correcting the page text does not correct the image: the page still carries the mislabelled image (its alt text describes what the image shows, "A tile labelled Lifetime Value shows ₹30,000"). The image is not edited. The same image also lacks a ROAS tile, the 127 qualified consultations and shows "INR" where the document says "INR equivalent" (minor). Until a corrected file is supplied the owner may prefer not to release this case.

**C. Advit Prints outlined-name readability (no redesign made):** `screenshots/batch2/advit-name-readability-1440.png` (full stage at 1440) and `…-zoom.png` (lower left). The outlined "ADVIT PRINTS" sits over the printed floral fabric of the full-bleed hero, so the thin orange outline competes with orange and green print and is the hardest to read of the eight. The other seven stages put the name on cream or calm photography. Options for the owner, not applied: leave as is (the name is decorative, `aria-hidden`; the client is named in the breadcrumb, chips, headline area and alt text), supply a hero with a calmer lower left, or set the name differently for this stage.

### Open owner items (kept)
1. **Talreja & Talreja:** exact legal entity, website and approved logo. No logo used, no link, no identity inferred; copy stays service neutral.
2. **Missing logos:** Meticulous Business Plan, Bblewrap, Talreja & Talreja are not in the register; none invented (Bblewrap's own portfolio client logos must not be used).
3. **Proposed industry classifications (mine, not in the DOCX):** Advit Prints = D2C and ecommerce; Meticulous, Bblewrap, Talreja & Talreja = Professional services; Libros Library = Local services (so it appears on the enquiry-led page); AnybodyCanBake SEO and both Bakedemy cases = Education and training.
4. **Approval of the new `/seo` related-cases section** (Ameba excluded so the live page is unchanged until an SEO study is published).

## Tenth round: approved logos, dashboard corrections, Advit name (31 October 2026, LOCAL)

- **Logos mapped by what they show:** the `mbp` wordmark is **Meticulous Business Plan** (and it is the same mark the register already held at 99 x 57 under "MBP", now replaced by the supplied 800 px copy); the T&T roundel is **Talreja & Talreja**; the white-on-black wordmark is **Bblewrap**. Recipes and hashes: `ASSET_MANIFEST.md` (third delivery). No logo was drawn or altered.
- **Where they appear:** the homepage client wall (now 34 logos, previously 32 plus the existing MBP), and the `/work` hero band. The band was capped at the first 8 studies of the current page; it now spans the whole library (a client on page 2 is no longer missing), has no cap and shows one logo per client (16 logos), so no approved client is displaced. Case-study pages: the template places a logo only on stages without baked-in artwork; all fourteen paid-batch stages carry their own artwork, so none shows a logo (unchanged, consistent). Service and industry pages: the code has no register-driven logo section there (the register feeds only the homepage wall, the `/work` band and the card chip); nothing was added. Unconfirmed external links: none (Talreja has no website attached).
- **Dashboards:** four periods added; Talreja label and "INR equivalent" corrected; alt text updated; the pre-edit copies and the supplied originals are preserved.
- **Advit:** existing deeper stroke applied to that stage only.
- **Checks:** `tools/verify-logos.cjs`: 6 of 6 PASS (homepage and `/work` at 1440, 390, 360: the three logos present, loaded, named, no overflow; sizes at 1440 home: Meticulous 68 x 39, Bblewrap 90 x 25, Talreja 90 x 15, same bands as the other wide and mid marks). `verify-batch2.cjs` 24 of 24 PASS and `functional-batch2.cjs` 99 of 99 PASS again; shoot of `/work`, `/work/page/2` and three detail pages at three widths: no overflow, no broken image. `npm test` 555 pass, 0 fail; `tsc` clean; fresh `npm run build` succeeds. Screenshots: `screenshots/batch3/` (`home-logos-*`, `work-logos-*`, detail pages, `checks/*-dashboard-*`).
- **To note:** the Bblewrap and Talreja logos and the new MBP copy are register data, not preview data, so they would appear on the **production homepage** on deployment even before any case study is published. The Talreja mark at wall size is small (15 px high at 1440) because it is a 5:1 wordmark; its descriptor text is not legible at that size.
- **Still open for the owner:** Talreja's exact entity and website; industry classifications; approval of the `/seo` related-cases section; whether to keep the Helvetica Neue text edits or have corrected dashboards supplied.

## Eleventh round: owner-confirmed SEO periods, Talreja website, /work captions (31 October 2026, LOCAL)

1. **AnybodyCanBake SEO:** earlier period May 2026 to July 2026, later period August 2026 to October 2026, written as "three-month periods". "90 day", "90 days", "earlier/later window" and "latest 90 days" are gone from the page copy, evidence note, short description, card, alt texts and the dashboard image (assert-tested across the case). The period chip now shows "May 2026 – Oct 2026" (month precision from the stored months; the existing chip helper uses an en dash, as on every study). October is not described as a completed month and no day boundary is stated; the evidence note says exact day boundaries were not supplied. All figures and the 25.49%, 30.56%, 46.15% and 97.37% values are unchanged. The earlier open item "SEO window dates" is **CLOSED**.
2. **Talreja & Talreja:** `website: 'https://talrejaandtalreja.com/'` added to the client register (new optional `website` field, the only one populated). It is stored, not rendered: no link was added anywhere, no legal entity or service claim inferred (the entity question stays open). The "Talreja website" open item is **CLOSED**; the "exact legal entity" item stays open.
3. **/work card captions:** "Illustrative artwork, not a client photograph." removed from all 14 paid-batch card images (source: `lib/case-study-images.ts`, so it applies on page 1, page 2, search and filtered results alike). No empty note element is rendered and the image-to-eyebrow spacing is identical across cards (22 px at 1440, 14 px at 390 and 360). Alt text is kept. **Not changed (different text, not the one named):** the four existing cards that carry their own disclosures stay as they were (Om Sai "Conceptual artwork. Not a photograph of the project..." and the conceptual illustrations for ClassPe, InsurYo and Ameba, "Conceptual illustration drawn for this page. Not client artwork..."). Say if those should go too.

**Checks:** `tools/verify-card-captions.cjs` 12 of 12 PASS (page 1 apart from the four retained disclosures, page 2, search "bakedemy", filter Google Ads, at 1440, 390 and 360; log `screenshots/batch4-captions-log.jsonl`); `verify-batch2.cjs` 24 of 24 PASS (SEO page and the other seven); `functional-batch2.cjs` 99 of 99 PASS; `npm test` 556 pass, 0 fail, 1 skipped; `tsc` clean; fresh `npm run build` succeeds and contains no preview study. Screenshots: `screenshots/batch4/` and `screenshots/batch4/checks/`.

## Twelfth round: industries, /seo, older card disclosures (31 October 2026, LOCAL)

1. **Industries (owner decisions, now recorded as decided):** Advit Prints = D2C and ecommerce; Meticulous Business Plan, Bblewrap, Talreja & Talreja = Professional services (unchanged from my proposal). **Libros** = **Online Library** (an online library serving customers across India), replacing Local services, in the study's industry field, the card eyebrow ("Meta Ads · Online Library") and the industry chip. The existing structure is used: sector stays empty (the controlled sector list has no key and none was added), the industry name is the chip, and the enquiry-led audience rule now also matches the industry name "Online Library" next to the `professional-services` sector, so Libros keeps its enquiry-led page placement. No new industry landing page. Wording: the problem line no longer says "households within the library's serviceable area" (now "customers of an online library serving readers across India"); the bullet "Keep local relevance clear ... locations the library can serve" is replaced by "Describe the library accurately. Present Libros Library as an online library serving customers across India."; the closing line "Want more local customers ..." is now "Want more customers to become paying members?". No targeting detail was invented; every supplied result is unchanged (540, ₹400.00, 24.50%, 2,204, ₹2,16,000, ₹4,800 supplied lifetime value). The Libros hero and card artwork are not edited (neither mentions a locality). The enquiry-led section title was "Local services case study", now "Enquiry-led business case studies" since it lists Phoenix Laundry, Meticulous, Libros, Bblewrap and Talreja.
2. **/seo:** the Ameba exclusion is removed. `/seo` now lists both **Ameba Software** and **AnybodyCanBake SEO**, once each, with their dedicated card images and detail links (checked at 1440, 390, 360: two cards, images loaded, no duplicate). Note for release: Ameba is live in Contentful, so the `/seo` page in production will gain this section as soon as this code is deployed (with AnybodyCanBake SEO added when that entry is published).
3. **/work disclosures:** the visible text under the Om Sai, ClassPe, InsurYo and Ameba card images is removed (page 1, page 2, search, filters, and the related-case cards on service and industry pages: `WorkCard` no longer renders the conceptual-illustration note, and `toCard` passes no note). Alt text kept; no empty note element, spacing identical. **Detail pages unchanged:** their stage captions ("Conceptual illustration drawn for this page ..." and Om Sai's note) and evidence sections are untouched (asserted). The homepage and About cards, which use their own approved cards, are not part of this change.

**Checks:** `verify-card-captions.cjs` 12 of 12 PASS (zero notes of any kind on page 1, page 2, search and filter at 1440, 390, 360; `screenshots/batch5-captions-log.jsonl`); `tools/verify-placements.cjs` ALL PASS (`/seo` two cards once each; enquiry-led lists Libros once as Online Library with no duplicates; education, D2C, Google Ads and Social media ads pages have no duplicates and no notes; search "online library" finds Libros; at three widths; `screenshots/batch5-placements-log.jsonl`, crops in `screenshots/batch5/`); `verify-batch2.cjs` 24 of 24 PASS (Libros chips: Social Media Ads | Online Library | Jun 2025 – Mar 2026); `functional-batch2.cjs` 99 of 99 PASS; `npm test` 558 pass, 0 fail, 1 skipped (new tests for the Libros wording and the four disclosures); `tsc` clean; fresh `npm run build` succeeds. The earlier open items "industry classifications" and "`/seo` section approval" are **CLOSED**; the Talreja legal entity stays open.
