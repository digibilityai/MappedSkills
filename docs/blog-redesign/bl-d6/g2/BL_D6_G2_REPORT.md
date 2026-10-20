# BL-D6 · Blog Article Template — G2 Implementation Report (2026-10-20, final)

> **Correction (2026-10-20, after release):** G-4 and ED-A1/ED-A2 below rest on a fixture artefact. The fixture copied
> each image's title into its description; real Contentful assets have **no description**, so production renders **no
> captions**. The real issue is the **alt text** (the asset title, for example `alt="BlogDetailsA"`). See
> `../release/BL_D6_RELEASE_REPORT.md` §3.

**Status:** implemented and verified on the feature branch **`feat/blog-article-g2`** (worktree
`/Users/amitguptaamit/gitrepo/MappedSkills-article-g2`, from `origin/main` @ `edb7c3f`, which is still the tip of
`main`; no upstream). **Nothing committed, pushed, merged or deployed. Contentful not edited. Production unchanged.**
`DECISION_LOG.md` and `CURRENT_STATE.md` unchanged (no DEC entry yet).

**Authorisation (owner, 2026-10-20):** "GO for G2 implementation on a dedicated feature branch. Do not deploy to
production." Scope items 1–8 and the editorial restrictions. The instruction at this gate: "Before committing or
pushing, report the changed files, test results, any G1 deviations, risks and outstanding checks. Stop for owner review."

**Verification basis.** There are no Contentful credentials on this machine. All browser checks therefore run against
**local fixture builds** fed with the 7 live articles captured from production on 2026-10-20
(`tools/article-fixture.json`, the rich text rebuilt from the rendered HTML):

- G2 build on :3241.
- An `origin/main` baseline build on :3242, with the same fixture.
- A cPanel-constrained G2 build served by `server.cjs` on :3244.
- A G2 build with two synthetic heading edge-case posts on :3243.

Real-Contentful rendering is first proven in CI and then after release.

---

## 1. Changed files (all uncommitted on `feat/blog-article-g2`)

| File | Change | Lines |
|---|---|---|
| `app/(pages)/blog/[slug]/page.tsx` | Page body now renders `CplusPage` + `ArticleBody`. **`generateStaticParams`, `generateMetadata`, the Article / BreadcrumbList / FAQPage JSON-LD generators, `revalidate = 60` and the `notFound()` branch are unchanged.** Legacy imports removed. | +14 / −137 |
| `lib/contentful/mappers.ts` | `extractTocFromDocument` takes ids from the shared allocator (was `section-${index}`, which matched no heading) | +12 / −4 |
| `lib/contentful/heading-ids.ts` (new) | `headingSlug` (the production slug rule, unchanged), `nodeText`, `createHeadingIdAllocator` (unique ids `-2`, `-3`; empty → `section`), `mainHeadings` (H2s if ≥ 3, else H2 + H3) | 58 |
| `components/cplus/blog-article/ArticleBody.tsx` (new) | Server component: hero, contents rail + `<details>` panel, body, related service(s), share, more on this topic, close | 194 |
| `components/cplus/blog-article/ArticleRichText.tsx` (new) | Article rich-text renderer: same node handling as `RichTextContent`, no utility classes, H2/H3 ids from the allocator | 126 |
| `components/cplus/blog-article/ArticleShare.tsx` (new, client) | Same three share destinations and text as `SocialShare`; Copy link; **no analytics** | 58 |
| `components/cplus/blog-article/content.ts` (new) | Template copy; the close is the approved `/blog` close | 31 |
| `components/cplus/blog-article/article.css` (new) | The G1 `ba.css` minus review-only rules; every rule `ba-` scoped | 127 |
| `tests/blog-article.test.cjs` (new) | 14 tests (behavioural tests of the id rules + source guards) | 172 |

**Not changed:** the following are untouched.

- `components/blog/RichTextContent.tsx`, which `/press/[slug]` also uses.
- Every other `components/blog/*` file. They are now unused by the article route and left in place; removal would be a
  separate clean-up.
- `lib/contentful/queries.ts`, `posts.ts`, `client.ts`, `types.ts`, `lib/blog-services.ts` and `lib/services.ts`.
- The `/blog` listing, `CTASection`, shadcn `ui/*`, the header and footer, and analytics.
- The sitemap, robots, and `package.json` / lockfile (no new dependency).
- Contentful.

---

## 2. Test and build results (run 2026-10-20 in this session unless stated)

| Check | Result |
|---|---|
| `npm run typecheck` | **pass** (exit 0) |
| ESLint on every changed/new file | **pass** (exit 0, no findings) |
| `npm test` (whole suite) | **179 pass, 0 fail, 1 skipped**. The skip is the existing MariaDB export test (`EXPORT_TEST_DB_ADMIN_*` not set), unrelated. The new `blog-article.test.cjs` contributes 14 passing tests. |
| **cPanel build, worktree** (`NEXT_PUBLIC_GTM_ID=GTM-K8ZQPMXP npm run build:cpanel`: 512 MB heap, 1 thread, `CPANEL_BUILD=1`) | **pass**. BUILD_ID `g7eZtICD-E5jzmzvWDW8t`; peak RSS 891 MB. No Contentful, so `/blog/[slug]` prerenders 0 paths, as in every local build. |
| `npm run verify:build:production` on that build | **pass**. 23 prerendered pages checked (one H1, assets present); GTM `GTM-K8ZQPMXP` inlined in 1 client chunk. |
| `scripts/deploy/package-release.sh` (CI's packager, output to scratch) | **pass**. 7.2 MB, 1,107 entries. Includes `components/cplus/blog-article/*` and `lib/contentful/heading-ids.ts`; excludes `docs/`, `tests/` and `.next/cache`. sha256 `34e039c0…8270`. Not uploaded anywhere. |
| **cPanel build, scratch copy with the 7-article fixture** (same limits plus the fixture preload) | **pass**. All 7 `/blog/<slug>` paths prerendered. `verify-build-output --require-gtm` passes on 32 pages with GTM inlined. |
| That build served by **`server.cjs`** (the cPanel/Passenger entry), compared with the :3241 G2 build | **identical** on 14 paths: status, title, canonical, JSON-LD, H1 count and contents count. Paths: the 7 articles, `/blog`, `/`, `/services`, `/contact`, `/robots.txt`, `/sitemap.xml`, and `/blog/does-not-exist` (404) (`cpanel-smoke.json`). |

The CI workflow builds with `npm run build`, not `build:cpanel`. Both use `next build --webpack` and both passed here.

---

## 3. Browser × viewport results (7 articles × 6 widths × 3 engines = 126 page renders, plus head/body/reduced-motion passes)

Widths: 1440×900, 1280×800, 1024×768, 768×1024, 375×812, 320×640.

Per render the script checks:

- **Layout:** no horizontal overflow, no text under 12 px, one H1, no duplicate ids.
- **Contents:** 0 broken contents links. Rail at ≥ 1081 px, closed panel below. The panel opens by keyboard. A jump
  lands the heading 24 px from the top. The rail stays sticky at 24 px.
- **Links and close:** related-service links match `lib/blog-services.ts`. The close is the `/blog` copy with
  `/contact` + `/schedule-call`. Exactly 2 contact asks outside the body; no "Book" in template copy; all legacy blocks
  are gone.
- **Interaction:** targets ≥ 24 px. Focus rings on every Tab stop at 1440 and 375. 150 ms hover feedback. Reduced
  motion gives about 0 s transitions and `scroll-behavior: auto`.
- **Errors:** no console or page errors.

| Engine | 1440 | 1280 | 1024 | 768 | 375 | 320 | Head + JSON-LD = baseline | Body text = baseline | Canonical = live | Reduced motion | Result |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **Chromium** | 7/7 | 7/7 | 7/7 | 7/7 | 7/7 | 7/7 | 7/7 | 7/7 | 7/7 | 7/7 | **PASS** (0 fails) |
| **Firefox** | 7/7 | 7/7 | 7/7 | 7/7 | 7/7 | 7/7 | 7/7 | 7/7 | 7/7 | 7/7 | **PASS** (0 fails) |
| **WebKit** | 7/7 | 7/7 | 7/7 | 7/7 | 7/7 | 7/7 | 7/7 | 7/7 | 7/7 | 7/7 | **PASS**, after one flaky reading was re-run (below) |

**WebKit notes:**

- **Earlier crash:** the first WebKit run (previous session) crashed at article 6 with "Target page, context or browser
  has been closed". The rerun in this session completed all 7 articles, exit 0 (`verify-webkit.log`).
- **One hover reading:** a single item failed: `7-proven-strategies… 1440 hover toc {changed:false}`. Re-run in
  isolation (`hover.cjs`), the rail link changed colour on hover 6/6 times across two articles: `rgba(0,0,0,0)` →
  tangerine `rgb(255,91,4)` underline. This is a timing artefact: the reading came right after a 3 s contents jump.
  It is not a defect.

**Measured per article (Chromium; Firefox/WebKit within ±25 px):**

| Article | Contents items (mode) | Page height 1440 / 375 / 320 | Body starts at (375) | Related service(s) | More on this topic |
|---|---|---|---|---|---|
| content-marketing-services-in-pune | 3 (H2) | 8,757 / 11,657 / 12,822 | 614 | — | 1 |
| building-an-email-list | 6 (H2+H3 fallback) | 5,340 / 6,776 / 7,495 | 581 | — | 0 |
| importance-of-content-writing | 5 (H2+H3 fallback) | 6,593 / 9,264 / 10,483 | 648 | — | 0 |
| performance-marketing-vs-digital-marketing | 3 (H2) | 6,198 / 8,313 / 9,315 | 621 | /google-ads, /social-media-ads | 0 |
| 7-proven-strategies-…-real-estate-developers | 9 (H2) | 16,734 / 22,592 / 25,862 | 555 | /lead-generation, /google-ads, /seo | 0 |
| seo-company-in-pune | 11 (H2) | 17,400 / 20,010 / 21,866 | 648 | /seo | 1 |
| facebook-advertising-agency-pune | 12 (H2) | 16,864 / 19,760 / 21,666 | 648 | /social-media-ads | 0 |

The `cpl` field in `checks-*.json` reads only a paragraph's first text node, so it is not a valid measure. The proper
measurement is in §4.

---

## 4. Screenshots and deviations from the approved G1

**Screenshots:**

- `screenshots/{chromium,firefox,webkit}/` hold 84 per engine (7 articles × 6 fold + 3 full-page + 2 close +
  1 keyboard).
- `screenshots/edge/` holds the synthetic heading cases.
- **`screenshots/g1-vs-g2-engines.png`** puts the G1 mockup beside G2 in Chromium, Firefox and WebKit: SEO 1440,
  SEO 375, email 1440 and the 375 close.

**Computed-style parity with the G1 mockup** (`g1-parity.json`; SEO and email articles at 1440, 768 and 375): these
are **identical**:

- H1, lede, kicker, rule, rail and reading-column position and width.
- Body paragraph size, line height and family, and H2/H3 styles.
- Every template label.
- The measured characters per line, averaged over the first 3 long paragraphs.

| # | Deviation | Cause | Assessment |
|---|---|---|---|
| G-1 | Close H2/body is the **`/blog` close** ("Reading about a problem you have?"), not G1's default proposal | Owner direction, G2 item 5 | Intended; matches G1's `?close=blog` variant |
| G-2 | Date reads "Updated **September 24, 2026**"; G1 shows "24 September 2026" | G2 uses the existing mapper's live date format; G1 hard-coded the date | **Owner choice.** Keep the live format (also used elsewhere on the site), or switch to day-month-year (a one-line change in `ArticleBody`) |
| G-3 | When an article has no later update, the byline reads "**Published** {date}" | Owner item 7: "Retain verified author names and dates". G1 showed only "Updated" | Additive. All 7 articles currently show "Updated" |
| G-4 | Image **captions** render; page height +33 px vs G1 on the email article | G2 keeps production behaviour: the Contentful asset *description* becomes a `<figcaption>`, exactly as in `RichTextContent`. The G1 mockup dropped captions | Preserves published content (item 8). Several descriptions are poor; see editorial additions ED-A1 and ED-A2 in §9 |
| G-5 | `.ba-prose` is a `div` inside `<article aria-labelledby="ba-h1">`, not the `article` itself | Implementation detail | No effect: the same landmark and label |

No other visual or structural deviation was found.

---

## 5. Heading anchors (duplicate headings, H2/H3 fallback)

**Rule.** One allocator per document walks every H2/H3 in order, for both the contents list and the rendered headings.
- The id is the production `slugify` of the heading text, unchanged.
- A repeat gets `-2`, `-3`, and so on.
- An empty or symbol-only heading gets `section`, `section-2`, and so on.

The contents list shows H2s when an article has at least 3; otherwise it shows H2 + H3. It never shows H4.

**The 7 real articles** (`anchors.json`, G2 vs the `origin/main` baseline):

- 0 duplicate headings and 0 empty ids.
- **0 existing heading ids lost**: every id the live renderer emits is still present, so external `#heading` links keep
  working.
- Every contents link resolves. 5 articles use H2 only; `building-an-email-list` (1 H2) and
  `importance-of-content-writing` (2 H2) use the H2+H3 fallback. H4s (up to 13 per article) are never listed.

**Synthetic edge cases** (`edge-headings.json`, `screenshots/edge/`; real browser, all three engines, 1440 and 375,
every contents link clicked):

| Fixture | Rendered ids | Contents | Result |
|---|---|---|---|
| `hx-duplicates`: H2 "Overview" ×2, an empty H2, H2 "Pricing & costs?", H3 "Overview", H2 "!!!" | `overview`, `overview-2`, `section`, `pricing-costs`, `overview-3`, `section-2` | 4 H2s (the empty one is omitted; the H3 is not listed because there are ≥ 3 H2s) | Unique ids, 0 broken links, all jumps land at 24 px, hash updated, 0 errors in all 3 engines |
| `hx-fallback`: H2, H3 "Step one" ×2, H2, H4 | `intro`, `step-one`, `step-one-2`, `wrap` (H4 has no id) | 4 (H2+H3; H4 excluded) | Same: pass in all 3 engines |

A symbol-only heading ("!!!") gets the id `section-n` and is still listed under its visible text; that is the intended
rule. An empty heading still renders as an empty `<h2>`, because Contentful content is rendered unaltered. None of the
live articles has one.

---

## 6. Keyboard, focus, reduced motion, mobile disclosure

| Area | Evidence | Result |
|---|---|---|
| Tab order | From the H1, 8 Tab stops recorded per article at 1440 and 375 in all 3 engines (WebKit uses Alt+Tab, its link-tabbing key). The order is rail contents links at wide, and the panel summary then its links at narrow | Pass |
| Focus indicator | Every recorded stop shows a ≥ 2 px outline in tangerine `rgb(255, 91, 4)`; `*-1440-keyboard.png` per article per engine | Pass, 0 stops without a ring |
| Mobile disclosure | Native `<details>`: closed on load at ≤ 1080 px. Opens with Enter on the focused summary (`panelOpensByKeyboard`) in all 3 engines; needs no JavaScript | Pass |
| Contents jump | Lands 24 px from the top (rail and panel) in all engines and widths; the hash updates | Pass |
| Hover feedback | Contents, prose, share and related-service links change colour/underline with a `0.15s` transition | Pass (see the WebKit note in §3) |
| Reduced motion | `prefers-reduced-motion: reduce` gives transitions ≤ 0.001 s and `scroll-behavior: auto`; all 7 articles, 3 engines | Pass |
| Targets | Every template control is ≥ 24 px, except the shared breadcrumb ("Home" / "Blog"), which is identical on the live `/blog` and `/faq` | Pass (WCAG 2.5.8) |
| Not tested | VoiceOver, TalkBack or NVDA; forced-colours rendering; real devices | Manual (§8) |

---

## 7. SEO metadata, structured data, canonicals, GTM dataLayer

| Item | Method | Result |
|---|---|---|
| `<title>`, every `meta[name]` / `meta[property]` (description, robots, `og:*`, `twitter:*`), `link[rel=canonical\|alternate]`, all JSON-LD blocks (Article, BreadcrumbList, FAQPage where present) | Sorted outerHTML/text compared between G2 and the `origin/main` baseline, same fixture, all 7 articles, 3 engines | **Identical** 21/21 |
| Canonical vs the **live** canonical captured from production | `canonicalG2 === live.canonical` | **Identical** 7/7 in 3 engines |
| Article body text | Normalised text of `.ba-prose` vs `.blog-rich-text` | **Identical** 7/7 in 3 engines: no wording changed, added or lost |
| `generateMetadata`, JSON-LD generators, `revalidate`, `generateStaticParams`, `notFound()` | Source guard in `tests/blog-article.test.cjs` | Unchanged |
| Load-time dataLayer | Waits for `page_view`; compares non-`gtm.*` events G2 vs baseline (`datalayer.json`, `datalayer-firefox.json`, `datalayer-webkit.json`) | **Identical** 7/7 in all 3 engines: `page_view {environment: production, page_type: editorial, page_path}` |
| dataLayer on the **GTM-enabled cPanel build** (GTM network blocked, consent not given) | Same method | 7/7: `gtag consent default` then `page_view`, the same as the baseline |
| New analytics | Source guard: `ArticleShare` sends no events; no new `data-*` hooks | None added |

**Timing race in the per-engine verify script.** It reads the dataLayer at `load`, before `page_view` is pushed. That
caused 3 transient "dl false" lines: 2 in Chromium and 1 in WebKit. The dedicated check, which waits for `page_view`,
is the authoritative one and shows all identical.

**Not verifiable locally:** whether any **GTM container trigger** targets elements G2 removed. Examples are the sidebar
CTA, the in-body CTA cards, the newsletter form and the "Ready to Turn This Insight Into Action?" band, which might be
targeted by class, ID or click text. This needs GTM Preview or a container export (§8).

---

## 8. Unaffected-route regression checks

**Method:** `regression.json`, Chromium at 1440, G2 vs the `origin/main` baseline with the same fixture. It covers
every non-article route in the sitemap, plus `/terms`, `/privacy` and an unknown URL. For each route it compares the
head, the `<main>` markup (with build-hash asset URLs normalised) and the dataLayer.

| Routes | Status | Head | `<main>` markup | dataLayer |
|---|---|---|---|---|
| `/`, `/services`, `/seo`, `/ai-seo`, `/google-ads`, `/social-media-ads`, `/lead-generation`, `/conversion-optimization`, `/problems/traffic-but-no-enquiries`, `/how-it-works`, `/pricing`, `/about`, `/faq`, `/contact`, `/schedule-call`, `/work`, `/blog`, `/research`, `/press`, `/portfolio/fixture-case-study-open`, `/portfolio/google-ads-for-online-courses`, `/terms` (22) | 200 = 200 | identical | identical | identical |
| `/privacy`, `/this-page-does-not-exist` | 404 = 404 (`/privacy` is a 404 on `main` too) | identical | identical | identical |
| `/sitemap.xml`, `/robots.txt` | — | byte-identical | — | — |

**`/press/[slug]`:** this route shares `RichTextContent`. The fixture has no press entries, so it is guarded instead by
`git diff` (the file is untouched) and a source test.

---

## 9. Remaining manual QA and Contentful editorial corrections

**Manual QA (none of these is a pass yet):**

1. **GTM Preview / E6.** Confirm no tag or trigger depended on the removed article CTA blocks or the newsletter form.
   Confirm `page_view` and the close CTA clicks (`/contact`, `/schedule-call`) fire as on `/blog`.
2. **Screen readers.** VoiceOver (macOS and iOS) and TalkBack:
   - the rail `nav` and the panel `summary` announcement;
   - the heading outline;
   - share links announcing "(opens in a new tab)";
   - table regions.
3. **Real devices.** OnePlus 12 (Chrome) and an iPhone (Safari): panel tap target, sticky header vs contents jump
   offset, long tables.
4. **Shipping browsers.** Desktop Safari, Firefox and Edge. Engines are covered here by Playwright WebKit and Firefox,
   not by the branded browsers.
5. **Forced colours** (Windows High Contrast): the panel marker and focus.
6. **Real Contentful.** After a merge, the CI build prerenders the 7 articles from live Contentful. On a release, rerun
   `tools/verify.cjs` against production (the same 3 engines × 6 widths). Assets and embedded entries absent from the
   fixture can only be proven there.

**Contentful editorial corrections:** a separate owner-approval track; no change made.

- `../BL_D6_EDITORIAL_CORRECTIONS.md` lists 24 items, 10 of them Must, including:
  - SEO-1/SEO-3 and FB-1: "Book a Client Discovery Call (30 minutes)";
  - SEO-2 and FB-2: published internal writer notes;
  - FB-3: unverified client names.
- These remain **live and unchanged** in G2 by instruction. Body text is identical to production.

**Proposed additions to that list** (found during G2; not yet in the file):

| ID | Article | Issue | Proposal | Priority |
|---|---|---|---|---|
| ED-A1 | building-an-email-list | The image asset's description is "BlogDetailsA". It is shown to readers as a caption (in production too) and is likely also the alt text | Replace it with a real description of the image, or clear it (no caption is then rendered) | Should |
| ED-A2 | 7-proven-strategies (7 images), content-marketing-services (2) | Asset descriptions are keyword strings ("MappedSkills Digital Marketing for real estate crm tools"), shown as captions | Rewrite as plain descriptions, or clear them | Could |

Open G1 decisions not settled by G2: **D-6** (Pune titles held pending Search Console evidence) and **D-7** (category
taxonomy). D-7 still limits "More on this topic" to 2 of the 7 articles.

---

## 10. Risks

| Risk | Level | Mitigation |
|---|---|---|
| GTM triggers bound to removed CTA elements stop firing | Medium (unknown) | GTM Preview before the release (§9.1) |
| Real Contentful content the fixture lacks (embedded entries, other asset types) renders differently | Low | `ArticleRichText` keeps `RichTextContent`'s node handling; check after CI build and release |
| Heading ids change for repeated headings (`-2` suffix) | Low | No live article has a repeated heading; first occurrences keep their production id |
| Unused legacy `components/blog/*` files remain | Low | Intentional; separate clean-up |
| Builds not reproducible across machines (BUILD_ID differs) | Known | As for every prior release; the CI artifact is the release unit |

---

## 11. Recommendation

**GO for committing on `feat/blog-article-g2` and opening a PR against `main`**, subject to owner review of this
report. **NO-GO for merge or deploy** until §9.1 (GTM Preview) is done. G-2, the date format, is the one cosmetic
choice the owner may want settled before the commit.

Not authorised and not done: commit, push, PR, DEC entry, merge, deploy, Contentful edits.

---

## Evidence index (outside Git: `docs/blog-redesign/bl-d6/g2/` in the primary checkout)

| File | Contents |
|---|---|
| `checks-{chromium,firefox,webkit}.json` | Engine × article × width checks |
| `verify-{engine}.log` | Run logs |
| `datalayer*.json` | dataLayer parity per engine |
| `anchors.json` | Live-article heading ids vs baseline |
| `edge-headings.json` | Synthetic duplicate and fallback cases |
| `g1-parity.json` | Computed-style comparison with the G1 mockup |
| `cpanel-smoke.json` | cPanel build via `server.cjs` vs the G2 build |
| `regression.json` | 24 routes plus sitemap/robots |
| `screenshots/` | Per-engine shots, `edge/`, `g1-vs-g2-engines.png` |
| `tools/` | Scripts; `dl-check.cjs` now takes an engine argument |

Scratch-only scripts and builds for this session (`edge-preload.cjs`, `edge.cjs`, `hover.cjs`, `g1cmp.cjs`,
`cpanel-smoke.cjs`, `dl-cpanel.cjs`, the `cp/` build and the artifact) are in the session scratchpad.
