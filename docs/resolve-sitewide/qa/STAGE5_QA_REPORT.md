# Stage 5: Sitewide QA and founder acceptance evidence

Date: 2026-10-30. Branch `feat/resolve-sitewide-alignment`, HEAD `783ddfd` plus uncommitted work. Local preview on port 3451
(Next dev, webpack). Verification only: no code was changed in this stage, no commit, push, PR, merge, deployment or CMS change.
The only file edited besides this evidence is `docs/00-project/DECISION_LOG.md` (DEC-098 appended, first action of the stage).

Evidence labels: VERIFIED (measured in this stage), UNVERIFIED (not testable here), NOT TESTED.

## 1. Approvals recorded
- Batch 2C `/lead-generation`: already recorded as `DEC-096` (not duplicated).
- Batch 2D `/conversion-optimization`: recorded as `DEC-098` (visual approval, with the Batch 2D acceptance corrections).
  DEC-092, 094, 095, 096 and 097 are unchanged. No approval date is invented.

## 2. Gate 1: repository and decision integrity
| Check | Result |
|---|---|
| Repository, branch, HEAD | PASS: `feat/resolve-sitewide-alignment`, `783ddfd`; `git merge-base HEAD origin/main` = `401b45e` (pricing #65 is already in this branch) |
| No commits, pushes or deployments in this stage | PASS: reflog top is the `783ddfd` commit; nothing staged |
| Inventory | 51 modified (one deleted: `components/cplus/seo/Sequence.tsx`), 10 untracked entries |
| Unexplained changes | None found. `next-env.d.ts` is a generated dev path change (`.next/dev/types`): do not commit |
| Frozen pages not altered later | PASS (evidence: file timestamps for `/seo` and `/ai-seo` end at 29 Oct 21:06, before later batches; their tests pass). The only shared-CSS edit is the footer heading selector in `components/b2/b2.css`, `services.css` and `direction-c.css` |
| Decision log vs routes | PASS for DEC-085 to DEC-098. Gap: no decision records the pricing values (section 6) |

Change ownership by batch (uncommitted):
- Batch 1 shared foundations: header, footer, consent, four colour selector CSS files, typography doc.
- Stage 3 and 3B: `components/b2/Work*`, `components/resolve/*`, `components/case-study/*`, `components/clients/`, `lib/clients.ts`, `lib/case-study-*`, `lib/contentful/*`, `public/images/clients/`, `tests/client-logos.test.cjs`.
- 2A `/seo`, 2B `/ai-seo`, 2C `/lead-generation`, 2D `/conversion-optimization`: their `app/(pages)` page, `components/cplus/<page>/` and tests.
- Homepage: `components/resolve-home-r3/*` (client showcase, Stage 3B).

## 3. Gate 2: route and visual audit
Routes checked: 52 by HTTP and metadata crawl (all 37 sitemap URLs plus 15 legacy, noindex, unlisted and 404 cases; `route-crawl.json`).
The responsive sweep covered 37 representative routes (all page types; 2 of 7 blog posts, 3 of the 3 research and press pages).
Responsive views inspected: 111 programmatic (37 routes x 1440x900, 390x844, 360x800) plus 48 text scaling views.
Method: each route loaded in a same-origin frame at the exact viewport width; measured page overflow, off-screen elements, broken
images, H1 count, font, tiny text and tiny controls. Screenshots were taken for a representative set (section 9); full-page
visual review of all 111 views was not done.

| Check | 1440 | 390 | 360 |
|---|---|---|---|
| Horizontal page overflow | PASS (0 of 37) | PASS (0 of 37) | PASS (0 of 37) |
| Broken images | PASS (0) | PASS | PASS |
| Exactly one H1 | PASS (37) | PASS | PASS |
| Content past viewport edge | PASS | 5 pages, all inside intentional scroll regions (Google Ads tab row, FAQ jump nav, blog table, press) | same |

- Bricolage Grotesque (self-hosted as `dcDisplay`) on every H1; Manrope body. English `lang` everywhere; one `main`, header and footer on every page.
- Dual-tone H1 present on 31 of 37. Not dual-tone (plain, acceptable for their type): `/blog/seo-company-in-pune`,
  `/research/industry-benchmarks`, `/thank-you`, `/privacy-policy`, `/terms`, 404.
- D2C H1: renders "More orders matter. So does what they cost." which matches DEC-085 D1 (supersedes DEC-081's "More orders are good. Profitable growth is better."). No conflict, nothing changed.
- Header, mobile menu (opens, shows Services, Who We Help, Our Work, How We Work, About, "Discuss Your Advertising", "Request a call"): PASS at 390.
- Text scaling at 125 and 150 percent, 12 high-risk pages x 2 widths x 2 scales: 5 FAIL (D-01, D-02, D-03 below); the rest pass.

## 4. Gate 3: conversion journeys
| # | Journey | Result |
|---|---|---|
| 1 | Home > Google Ads > Contact | PASS (link graph from served HTML) |
| 2 | Home > Meta Ads > Contact | PASS |
| 3 | D2C, Education, Real Estate, Enquiry-Led > Google Ads > Contact | PASS (4 paths) |
| 4 | Work > Om Sai and AnyBodyCanBake case studies > Contact | PASS (2 paths) |
| 5 | SEO, AI SEO, Lead Generation, Conversion Optimization > Contact and call link | PASS (4 pages) |
| 6 | Mobile menu > core service > CTA | PASS (menu opens, links and CTAs present) |
| 7 | Pricing > Contact; pricing links to both ad pages | PASS |

Also verified: 44 distinct internal links across all pages, 0 broken; 244 assets, 0 broken; consent banner (Reject stores `denied`
and closes); contact form empty submit shows 4 field errors, an error summary and sends 0 POSTs; `/contact?intent=call`
preselects "Request a call"; FAQ has 18 closed `details` disclosures; API `POST /api/enquiry` rejects an empty body (400) and non-JSON (415).
UNVERIFIED: a real enquiry submission, database save, CRM delivery, WhatsApp and Calendly, GTM, GA4 and Meta Pixel events. No
enquiry was sent. No-JavaScript: all page text is in the served HTML (H1 and body checked); a browser with JavaScript disabled was not used.

## 5. Gate 4: SEO, proof, accessibility
SEO (VERIFIED on the local build):
- Titles unique (37). H1 duplicate only `/contact` and `/contact/call` (the call route is canonicalised to `/contact`).
- Robots: all marketing routes `index, follow`; `/thank-you`, `/privacy-policy`, `/terms`, `/launch-checklist`, 404 `noindex`.
- JSON-LD parses on every page (Organization everywhere; BreadcrumbList, FAQPage, Service, Article, Report, NewsArticle where expected). Open Graph on all marketing pages, Twitter `summary_large_image`.
- Sitemap: 37 URLs; excludes noindex pages and the Home Decor study. `robots.txt` valid.
- `/portfolio/seo-for-home-decor-brand`: 200, `noindex, follow`, not in `/work` (5 links only), not in the sitemap.
- The four unpermissioned studies (`seo-healthfirst`, `local-seo-service-usa`, `google-ppc-for-real-estate`, `google-ads-for-ecommerce`): all 404. Legacy `/google-ads-for-ecommerce`, `/d2c`, `/ecommerce-marketing`, `/enquiry-led`, `/who-we-help`: 404 (no redirects), as the decisions say.
- Canonical host: UNVERIFIED for production (D-09).

Proof and credibility:
- Homepage shows 32 client logos (32 distinct alt names), no Vibgyor High, with the line "A logo shows who, not a result or a particular service."
- No Apple App Ads wording anywhere. No testimonials or fabricated outcomes in application copy; "guarantee" appears only in refusals ("we cannot guarantee"). Case study percentages are on Om Sai (3) and research pages (data from the research report); not independently re-verified against sources.
- Pricing: `/pricing`, Google Ads and Meta Ads content show Rs 14,999 (Google Ads), Rs 14,999 (Meta Ads), Rs 26,999 (both). Consistent across three content files. Cannot be verified against a decision (D-10).
- Copy hygiene: no long dashes or double hyphens in application copy. Long dashes occur only inside Contentful blog posts (D-08).

Accessibility:
- Landmarks, heading order (no skipped levels), alt attributes, form labels and control names: PASS on all 37 pages.
- Reduced-motion CSS present on every page; reduced-motion behaviour not emulated (code only).
- Visible focus: PASS on the Batch 2D page (3:1 or better); not re-measured on every page.
- Contrast: measured on `/conversion-optimization` only (min 3.97:1 on large text); not measured sitewide.
- Mobile touch targets: some sub-24px controls (D-05).

## 6. Gate 5: technical
| Item | Result |
|---|---|
| `npm test` | PASS: 515 tests, 514 pass, 0 fail, 1 skipped (pre-existing: export test needs a disposable MariaDB) |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS with 2 warnings (0 errors): unused `Text` in `components/case-study/CaseStudyTemplate.tsx` (new in this branch), unused `r1` in `tests/paid-advertising-real-estate.test.cjs` (pre-existing) |
| `npm run build` | PASS (exit 0), run in a scratch copy so the live preview and `next-env.d.ts` were not touched; no warnings |
| Secrets in client output | PASS: no non-public env value found in the built static output; `package.json` and lock unchanged (no new dependencies) |
| External network calls | Only expected hosts: Contentful image CDN, social share links, analytics ids from env. No console error review was possible in the headless sweeps (NOT TESTED) |

## 7. Defect register (no fixes applied)
| ID | Sev | Route | Reproduction | Expected / actual | Smallest fix |
|---|---|---|---|---|---|
| D-01 | P2 (FIXED in 5B) | `/services` | 390 or 360 wide, root text 125% or 150% | Expected no horizontal scroll. Actual page scroll width 403 at 390/125%; `.x2-case` cards 383px wide overflow the gutter (4 to 13 elements) | Let the case grid column shrink (`minmax(0,1fr)`, `min-width:0`) |
| D-02 | P2 (FIXED in 5B) | `/about` | 360 wide, 150% text | Actual width 391 vs 360: `.rs-wc.rs-wc-side` card exceeds by 31px | Same: `min-width:0` and wrap on the card |
| D-03 | WITHDRAWN in 5B (test false positive) | `/faq` | 360 wide, 150% text | "How AI search works" link box overlaps "Discuss Your Advertising" CTA by about 30px | Add margin or `gap` between `.more` and the CTA in the help panel |
| D-04 | P3 | `/google-ads`, `/social-media-ads`, `/services`, others | any width | Illustrative mock UI text is 9.6 to 10.4px (SERP and ad mocks, labels). Only the first two pages were inspected line by line | Raise to 11px or keep `aria-hidden` only if purely decorative |
| D-05 | P3 | `/how-it-works` (6 to 7), research article (3), several single controls | 390 | Controls under 24px (WCAG 2.2 target size). Not itemised | Pad to 24px |
| D-06 | P3 | metadata | n/a | 7 titles over 65 characters (Classpe 95, Insuryo 90 characters); descriptions short on `/about` (93), `/work` (83), `/research/industry-benchmarks` (47), `/thank-you` (79); `/faq` 212 | Editorial only; approved metadata must not change without approval |
| D-07 | P3 | `CaseStudyTemplate.tsx` | `npm run lint` | Unused import `Text` | Remove import |
| D-08 | P3 | blog posts (CMS) | view posts | Long dashes in Contentful content | Content edit in CMS, not code |
| D-09 | Release condition (verification updated in 5B) | all pages | inspect canonical, `og:url`, JSON-LD, sitemap and robots host | They all derive from `NEXT_PUBLIC_SITE_URL`, which is `http://localhost:3000` locally and baked in at build time. Production correctness depends on the host build env | Before any release, verify the production build env is `https://mappedskills.com` and re-check canonicals on the live build |
| D-10 | RESOLVED by DEC-099 (founder approval 2026-10-30) | `/pricing`, `/google-ads`, `/social-media-ads` | search `DECISION_LOG.md` | No decision entry records Rs 14,999 and Rs 26,999; only the #65 commit message says approved | Founder confirms the values; add a decision entry |
| D-11 | P3 | `/contact/call` | crawl | `index, follow`, canonical `/contact`, same H1 as `/contact` | Confirm this legacy route is intended; otherwise `noindex` |

Stage 5 counts as first issued: P0 0, P1 0, P2 5, P3 6. Updated counts after Stage 5B are in section 11.

## 8. Not verified and risks
- Real form submission, database write, CRM and WhatsApp delivery, Calendly, analytics events.
- Screen reader behaviour, Safari and Firefox, real devices.
- Reduced-motion emulation and no-JavaScript in a real browser; animation timing outside `/conversion-optimization` (that page was timed in Batch 2D).
- Sitewide computed contrast and focus ring measurements (done for the 2D page only).
- Full visual review of every one of the 111 views; screenshots exist only for a representative set.
- Contentful content freshness (the preview reads the production Contentful environment).
- Production build environment and live URL behaviour.

## 9. Evidence locations
- Route and metadata matrix: `docs/resolve-sitewide/qa/route-crawl.json`.
- Representative screenshots (session tool captures, not copied into the repository): home mobile with consent banner,
  mobile menu, Google Ads, Services, Pricing, FAQ, Blog, D2C at 1440; Batch 2D scenes at 1440, 390 and 360 (listed in the Batch 2D report).
- Scratch crawl and build logs: `/private/tmp/claude-501/qa/` (`build.log`, `test.log`, `lint.log`, `tsc.log`).

## 10. Recommendation: ACCEPT WITH CONDITIONS
No P0 or P1 defects. Conditions before any release decision:
1. Confirm the pricing values and record them (D-10).
2. Verify the production `NEXT_PUBLIC_SITE_URL` and canonical output on the live build (D-09).
3. Decide whether to fix D-01 to D-03 (text scaling overflow and overlap) before release, or accept them as P2.
4. Run the unverified live integration checks (form to CRM, analytics) on a release candidate with founder approval.

## 11. Stage 5B: targeted corrections and reconciliation (2026-10-30)
HEAD verified `783ddfd` before work. No staging, commit, push, PR, merge, deployment, CMS or production change.

### D-01 `/services` (FIXED)
- Root cause: the single-column rule `.x2-work { grid-template-columns: 1fr }` at 760px and below plus a heading that cannot break.
  "AnyBodyCanBake" at enlarged text is wider than the card, so the card and the page widened.
- Fix: `components/paid-advertising/services/services.css`, inside the existing `max-width: 760px` block, `.x2-case h3 { overflow-wrap: anywhere; }` (one line). Text size is unchanged and scaling is not disabled.
- Before (page scroll width, 390 and 360 wide): 403 at 125%, 470 at 150% (both widths). After: equals the viewport (390 and 360) at 100, 125 and 150%.

### D-02 `/about` (FIXED)
- Root cause: the text-only work card (`.rs-wc-textonly`) took the width of the unbreakable word plus padding (375px in a 328px column).
- Fix: `components/resolve/work-card.css`, inside the existing `max-width: 760px` block, `html .rs-wc h3 { overflow-wrap: anywhere; }` (one line).
- Before: page scroll width 391 at 360 wide and 150%. After: 360.
- Fix history (a regression I caught and corrected): the first version applied the rule at every width and broke "AnyBodyCanBake" mid-word in the 1440px side card. It is now scoped to 760px and below. At 1440 the heading is one line, unchanged.

### D-03 `/faq` (WITHDRAWN, no change made)
- The reported overlap was a false positive of my Stage 5 test. The "How AI search works" link sits inside a closed FAQ answer (`details::details-content` has `content-visibility: hidden`), so it is not painted or clickable even though it has a layout box.
- With every answer open at 360 wide and 150% text there are no control overlaps and no overflow (scroll width 360).

### Regression (after state)
- 6 routes (`/services`, `/about`, `/faq`, `/work`, `/`, `/portfolio/om-sai-developer-meta-ads`; the last three consume the shared card CSS) at 1440 (100%) and 390 and 360 (100, 125, 150%): 42 views, 0 page overflow, 0 elements past the edge outside scroll regions, 0 control overlaps.
- Normal size: 1440 headings unchanged (`/about` side card heading one line; `/services` three card headings one line). Screenshots: `/services` and `/about` at 360 and 150% (cards fit; "AnyBodyCanBake" wraps in the narrow card) and `/about` at 1440.
- CTA: the `/about` card link `/portfolio/google-ads-for-online-courses` is hit-testable at 360 and 150% and shows its 3px focus ring after a keyboard Tab.
- Frozen pages: only two CSS blocks changed, both inside 760px media queries and scoped to `.x2-case h3` (`/services`) and `.rs-wc h3` (shared work card, used by `/about`, `/work`, home). No `/seo`, `/ai-seo`, `/lead-generation` or `/conversion-optimization` file changed.
- Honest limit: the 360px, 150% wrap shows "AnyBodyCa / nBake" (a mid-word break). It only appears at enlarged text in narrow cards; the alternative (shrinking text or padding) was ruled out.

### D-09 canonical configuration (VERIFIED at build-configuration level; live site still to be checked at release)
- Code: every consumer reads `process.env.NEXT_PUBLIC_SITE_URL || 'https://mappedskills.com'` (`lib/metadata.ts`, `lib/og-image.ts`, `app/sitemap.ts`, `app/robots.ts`, `components/routes/primitives.tsx`, `components/commercial/primitives.tsx`).
- Production workflow `.github/workflows/deploy.yml` builds off-host in CI. Its Build step sets only `NEXT_PUBLIC_GTM_ID` and the Contentful variables, never `NEXT_PUBLIC_SITE_URL`, and the host `.env` is never written. A CI build therefore takes the default.
- Prior records agree: `docs/27-production-translation/22_PRODUCTION_DEPLOYMENT_ACCEPTANCE.md` lists `NEXT_PUBLIC_SITE_URL` unset and "defaults correctly to https://mappedskills.com"; `CURRENT_CODEBASE_AUDIT.md` item 9 says it "resolves to the correct apex".
- Test: a production build in a scratch copy with no `.env*` file and the variable unset exits 0 and emits `https://mappedskills.com` for the canonical, `og:url`, JSON-LD `url`, `robots.txt` Host and Sitemap lines and every sitemap `<loc>` (no `localhost` found). The local `localhost:3000` value comes only from the local `.env.local` and is expected in development.
- Not verified: the live production output and the GitHub `production` environment settings (not readable here). D-09 is therefore downgraded from "blocker" to a release-time check: after the release build, confirm the canonical on the live page. The workflow's smoke test does not check canonicals.

### D-10 pricing reconciliation (as found in 5B; RESOLVED afterwards, see section 12 and DEC-099)
- Amounts and scope match the existing implementation: Google Ads Rs 14,999, Meta Ads Rs 14,999, both Rs 26,999 per month (`components/pricing-r2/content.ts`, `google-ads-r41/content.ts`, `meta-ads-r22/content.ts`).
- Supporting evidence: PR #65 (`401b45e`, base `main`, merged 2026-10-29T03:15:01Z by the owner's account `digibilityai`, no review) states "Approved working fees (per month)" with those three amounts and the scope. The file header says "founder-approved working prices" and lists what was not approved (setup fees, minimum budgets, GST treatment, contract terms, guarantees, add-on prices).
- Missing: no `DECISION_LOG.md` entry, no dated founder instruction and no decision ID record the pricing approval. The statements above are the implementing session's own description, so they are secondary evidence. Pricing is therefore reported as "implemented as described; approval not independently recorded". Nothing was changed.
- To close D-10 the founder confirms the three amounts and scope in writing (or points to the original instruction); a decision entry can then cite PR #65 without a new approval date.

### Technical verification (after 5B)
- `npm test`: 515 tests, 514 pass, 0 fail, 1 skipped (pre-existing). No assertions changed.
- `npm run typecheck`: pass. `npm run lint`: 0 errors, 2 warnings (same two as before).
- Full build ran only for D-09 (scratch copy, no env), exit 0.

### Updated severity counts
P0 0. P1 0. P2 1 open (D-10, pricing approval record). Release-time check, not a defect: D-09. Fixed: D-01, D-02. Withdrawn: D-03. P3 6, unchanged (D-04 to D-08, D-11).

### Remaining release conditions
1. Founder confirms the pricing amounts and scope in writing (D-10), then a decision entry cites PR #65.
2. After the release build, confirm the live canonical host is `https://mappedskills.com` (D-09).
3. Run the unverified live checks from section 8 on a release candidate with founder approval (real form to CRM, analytics events).
4. Decide whether to accept the P3 list as is.

### Recommendation for Stage 5C
ACCEPT WITH CONDITIONS: the three mobile text scaling items are closed (two fixed, one withdrawn) with no regression found, and canonical configuration is verified at build level. Pricing approval is not recorded and remains the one open P2.

## 12. Stage 5C acceptance record (2026-10-30)
Documentation only. No code change, no staging, commit, push, PR, merge or deployment. HEAD verified `783ddfd`; nothing staged.
This section supersedes the counts, conditions and recommendation of sections 10 and 11 where they differ.

### 12.1 Pricing decision (D-10 resolved)
The founder explicitly approved, on 2026-10-30, the monthly agency management fees: Google Ads INR 14,999, Meta Ads INR 14,999,
Google Ads and Meta Ads combined INR 26,999, advertising spend excluded. Recorded as `DEC-099` in `docs/00-project/DECISION_LOG.md`.
PR #65 is cited there only as historical implementation context. Published amounts and copy are unchanged; no new commercial term was added.

### 12.2 Defect register status
| ID | Status | Disposition |
|---|---|---|
| D-01 | FIXED and regression-tested | `/services` text scaling overflow, 42-view regression clean |
| D-02 | FIXED and regression-tested | `/about` text scaling overflow, same regression |
| D-03 | WITHDRAWN (false positive) | Link was inside a closed FAQ answer, not painted or clickable |
| D-09 | Build defaults VERIFIED; live canonical check pending | Moved to the release boundary (section 12.6); not a design defect |
| D-10 | RESOLVED | `DEC-099` |
| D-04 to D-08, D-11 | OPEN P3, six findings | Individually listed below; not founder-accepted |

Open counts: P0 0, P1 0, P2 0, P3 6. This follows from the register above: every P2 (D-01, D-02, D-03, D-09, D-10) is fixed, withdrawn,
resolved or reclassified as a release-time check, and no P0 or P1 was ever recorded.

Technical state: `npm test` 515 tests, 514 pass, 0 fail, 1 skipped (pre-existing); `npm run typecheck` clean; `npm run lint` 0 errors and
2 warnings; production build exit 0 (scratch copy, in Stage 5 and again without an env file in 5B).

### 12.3 The six open P3 findings
These are documented, not accepted. The disposition column is a recommendation for the founder's decision.
| ID | Finding | Potential user impact | Recommended disposition |
|---|---|---|---|
| D-04 | Illustrative mock UI text at 9.6 to 10.4px (`/google-ads`, `/social-media-ads`, `/services`; other pages not itemised) | Hard to read for low-vision visitors; the text is illustration, not core copy | Fix before release if cheap (raise to 11px), otherwise next maintenance pass |
| D-05 | Controls under 24px (`/how-it-works` 6 to 7, research article 3, a few single controls); not itemised | Harder touch targets on mobile (WCAG 2.2 target size) | Itemise, then fix in a small accessibility pass; recommend before release |
| D-06 | Metadata length: 7 titles over 65 characters (Classpe 95, Insuryo 90 characters), short descriptions on `/about` 93, `/work` 83, `/research/industry-benchmarks` 47, `/thank-you` 79, `/faq` 212 | Search snippets may truncate or look thin; no functional harm | Editorial, post-release; changing approved metadata needs approval |
| D-07 | Unused import `Text` in `components/case-study/CaseStudyTemplate.tsx` (lint warning) | None for users | Remove with the next code change |
| D-08 | Long dashes in Contentful blog posts | Style inconsistency only | Edit in the CMS when convenient; not a code change |
| D-11 | `/contact/call` is `index, follow` with canonical `/contact` and the same H1 | Possible duplicate content signal | Founder confirms the legacy route is intended; otherwise `noindex` |

### 12.4 Founder-facing acceptance record
1. **Approved page inventory and decision references (VERIFIED from `DECISION_LOG.md`):**
   `/seo` DEC-092; `/ai-seo` DEC-093 and DEC-094; `/lead-generation` DEC-095 and DEC-096; `/conversion-optimization` DEC-097 and DEC-098;
   About DEC-088; How It Works DEC-087; `/work` and the five case studies DEC-089; homepage client showcase (32 logos) DEC-090;
   `/google-ads`, `/social-media-ads`, D2C, Education, Real Estate and Enquiry-Led audience pages DEC-078 to DEC-085 (D2C H1 per DEC-085);
   pricing amounts DEC-099 (page design earlier under DEC-061, restyled in PR #65 without its own design decision ID);
   shared header, footer and consent DEC-086, DEC-091 and Batch 1 records. `/services`, `/faq`, `/contact`, `/blog`, `/research`,
   `/press` and their earlier approvals were not re-mapped to decision IDs in this stage.
2. **Sitewide QA coverage and results:** 52 routes crawled for status and metadata; 37 routes at 1440, 390 and 360 (111 views) measured
   for overflow, images, H1; 48 text scaling views (125 and 150 percent) plus 42 after-fix views; 7 conversion journey types;
   44 internal links and 244 assets with no broken one. Results are in sections 3 to 6 and 11.
3. **Open P3 findings and impact:** section 12.3.
4. **Outstanding verification limitations (not performed, so not claimed as passed):** reduced motion in a browser (code only);
   no-JavaScript in a real browser; screen readers; Safari, Firefox and real devices; sitewide contrast and focus measurement
   (done only for `/conversion-optimization`); line by line visual review of all 111 views (screenshots cover a representative set);
   headless sweeps could not read console errors; content from the production Contentful environment was not audited.
5. **Production release prerequisites:** section 12.6.
6. **Exact changes pending commit (nothing is staged or committed):** 51 modified tracked files and 10 untracked paths, listed in 12.5.
7. **Recommendation:** ACCEPT Stage 5C as design and content acceptance, with the six P3 findings still open for the founder's disposition
   and the release checks below kept separate. This is not a release authorisation.

### 12.5 Pending changes (working tree, verified with `git status`)
Modified (51): `app/direction-c.css`; `app/(pages)/` pages for ai-seo, conversion-optimization, lead-generation, portfolio/[slug], seo;
`components/analytics/ConsentBanner.tsx`; `components/b2/` (Work, WorkLibrary, b2.css, work-cards, work.css);
`components/case-study/` (CaseStudyTemplate, case-study.css); `components/cplus/` ai-seo (3 files), conversion-optimization (4), lead-generation (4),
seo (4 modified, `Sequence.tsx` deleted), work (2); `components/direction-c/` (SiteFooter, SiteHeader); `components/layout/Footer.tsx`;
`components/paid-advertising/services/services.css`; `components/resolve-home-r3/` (2); `components/resolve/` (WorkCard, work-card.css, work.ts);
`docs/00-project/DECISION_LOG.md` (DEC-098, DEC-099); `lib/case-study-eligibility.ts`; `lib/contentful/` (case-studies, mappers);
`next-env.d.ts` (generated dev path, do not commit); `tests/` (about-resolve, case-study-eligibility, conversion-page, lead-generation-page, seo-page, work-page).
Untracked: `components/case-study/CaseArt.tsx`, `components/case-study/case-art.css`, `components/clients/`, `docs/resolve-sitewide/`
(this report, `route-crawl.json`, typography conventions), `docs/work-redesign/stage3b/`, `lib/case-study-images.ts`,
`lib/case-study-preview-titles.ts`, `lib/clients.ts`, `public/images/clients/`, `tests/client-logos.test.cjs`.
Stage 5 and 5B code edits are two one-line CSS rules (`services.css`, `work-card.css`) inside already modified files.

### 12.6 Release boundary (kept separate from Stage 5C design acceptance; none of these is done)
1. Production canonical, `og:url`, JSON-LD and sitemap verification on the live site after the release build (D-09). Build defaults verified only.
2. A real contact form submission and downstream delivery, tested with founder approval (the form was only validated without sending).
3. CRM and WhatsApp integration (production CRM configuration is unverified).
4. Analytics and consent-event verification (GTM, GA4, Meta Pixel consent behaviour); only the consent banner UI and stored choice were tested.
5. Remaining browser, device and accessibility verification required for release: screen reader, Safari and Firefox, real devices,
   no-JavaScript and reduced-motion in a browser, sitewide contrast.
6. Founder disposition of the six P3 findings, and the commit, PR and deployment authorisation, which have not been given.

## 13. Stage 5D: pre-release verification and targeted remediation (2026-10-30)
HEAD verified `783ddfd`; nothing staged. Founder acceptance and the P3 dispositions are recorded as `DEC-100`.
This section supersedes the counts and recommendation of section 12.
Method note: the dev server hot-reloads and wiped long browser scans, so final regression was run on production builds of the working
tree in scratch copies (`next build` and `next start` on ports 3460, 3461, and a pre-5D baseline on 3462). Nothing was deployed.

### 13.1 Stage 5C acceptance and dispositions
`DEC-100`: Stage 5C accepted for design, content and local implementation. D-04 and D-05 pre-release accessibility review; D-06, D-07, D-08
accepted nonblocking follow-ups; D-11 pending the founder. Not a release authorisation.

### 13.2 D-04 itemised (mock and label text under 11px)
Method: every text node under 11px, at 1440 and 390 on 24 routes, split into aria-hidden illustration and visible text.
| Route and component | Size | Role | Disposition |
|---|---|---|---|
| `/google-ads` Google results mock (`.ga4-tabs`, `.ga4-site`, `.ga4-desc`, `.ga4-spon`, about 30 nodes, aria-hidden) | 10.2 to 10.4px | Decorative imitation of a search page; its meaning is in the headings and captions around it | Left as is (decorative) |
| `/social-media-ads` Meta ad mock (`.mr1-stage`, `.mr1-h*`, about 19 nodes, aria-hidden) | 9.5 to 10.9px | Decorative imitation of an ad | Left as is (decorative) |
| `/` and `/services` ad mocks (aria-hidden `small`, `span`) | 9.9 to 10.9px | Decorative | Left as is |
| `/services` case card labels "Service" and "Industry" (`.x2-tag .v`), "Supporting" (`.x2-sup b`) | 9.6 and 10.9px | Supporting labels | FIXED to 11px |
| `/seo` stage and project tags (`.sk-st-tag`, `.sk-pj-tag`, `.sk-tag`, `.sk-stamp`) | 10.6px | Supporting | FIXED to 11px |
| `/ai-seo` question label, strip labels, mini table labels (`.ax-q-k`, `.ai-strip em`, `.ax-tl`) | 9.9 to 10.6px | Supporting | FIXED to 11px |
| `/about` field labels (`.ab-field-k`), `/work` route labels (`.wk-route-k`) | 10.6px | Supporting | FIXED to 11px |
| `/how-it-works` ask chips and zone labels (`.hw-ask span`, `.hw-zone`) | 10.6px | Supporting | FIXED to 11px |
| `/google-ads` lane labels and "Your customer / MappedSkills manages" row (`.ga4-lane-lbl`, `.ga4-js-who`) | 10.9px | Essential labels | FIXED to 11px |
| `/social-media-ads` "MappedSkills manages / Your business owns" (`.mr1-js-who`) | 10.9px | Essential labels | FIXED to 11px |
Result: no visible (non aria-hidden) text under 11px remains on the 24 routes at 1440 and 390 (final production-build scan, plus a dev-server check for the last `.ga4-js-who` fix).
Sub-11px text remains only inside aria-hidden decorative ad mocks, by decision above. Layout effect: section heights on `/seo`, `/ai-seo`, `/how-it-works`, `/about` differ from the pre-fix baseline by at most 1px.

### 13.3 D-05 itemised (controls under 24px, WCAG 2.2 AA 2.5.8)
Method: every link, button, summary, input, select and textarea with a side under 24px on 34 routes at 1440 and 390; each classified by the 2.5.8 exceptions (inline in a sentence; spacing: a 24px circle centred on it touches no other target; label of a hidden input).
- Pass by spacing exception (no change): breadcrumb "Home" and trail links (18 to 22px high), `/how-it-works` list links (18 to 21px), `/seo` and `/lead-generation` related links on desktop, `/conversion-optimization` start link (21 to 23px), `/pricing` and `/privacy-policy` text links, `/contact` radio inputs (20x20, labels larger).
- Pass as inline text links: links inside sentences on `/ai-seo`, `/how-it-works`, `/pricing`, `/about`, `/contact`, `/research`.
- Pass, hidden input with a 44px label: `/who-we-help/enquiry-led-businesses` radios (1x1 inputs, labels 126 and 148px wide, 44px high).
- FAILED, fixed: `/lead-generation` related links "traffic but no enquiries", "organic search", "paid search" (22px high, stacked on adjacent lines at 390 so the spacing exception failed). Fix: `display: inline-block; min-height: 24px` on `.lg-related a` in `components/cplus/lead-generation/lead-gen.css`.
- Earlier fixed in Batch 2D: `/conversion-optimization` proof step buttons raised to 24px.
Result: 0 target-size failures on 34 routes at 1440 and 390. Pointer spacing, keyboard focus and activation were verified on the corrected `/lead-generation` links only by size and layout; keyboard activation of the link is native behaviour (an anchor).

### 13.4 D-11 `/contact/call` SEO audit (recommendation only, nothing changed)
Evidence (VERIFIED from `next.config.mjs`, `app/(pages)/contact/call/page.tsx` and live requests):
- `/contact/call` is not a public page. It is a permanent (308) redirect to `/contact?intent=call`, and `/schedule-call` redirects to the same URL.
- `/contact?intent=call` returns 200 through an internal rewrite, with title "Request a Call | MappedSkills" (the DEC-062 wording), the same H1 and form as `/contact` pre-set to "Request a call", canonical `/contact`, robots `index, follow`.
- It is not in the sitemap. Internal "Book a call" CTAs and the mobile menu link to `/contact?intent=call`. DEC-071 decided one contact page.
- My Stage 5 description of D-11 ("`/contact/call` is indexable with canonical `/contact`") was inaccurate: my crawler followed the redirect and reported the destination's metadata. The accurate subject is the query-string state `/contact?intent=call`.
- Search evidence: UNKNOWN. No Search Console or analytics data is available here.
- Distinct search value: low. It is a state of the contact page with identical content; the canonical already consolidates it.
Options: A keep indexable with unique intent (not justified: same content); B `noindex, follow` (not recommended: combining `noindex` with a canonical pointing elsewhere sends mixed signals and adds nothing); C consolidate or redirect (already effectively in place through the canonical, the sitemap exclusion and the 308s).
**Recommendation: keep the current configuration (option C as implemented), make no code change, and close D-11 as "by design, description corrected".** Founder approval requested; no SEO directive was changed.

### 13.5 Accessibility verification (this stage)
| Check | Result |
|---|---|
| Keyboard focus and activation, step controls | PASS: Enter and Space on the `/conversion-optimization` method buttons, visible rings 3:1 or better (Batch 2D); `/about` card link shows its ring after Tab |
| Manual selection stops the animation | PASS on `/conversion-optimization` (Batch 2D); not re-tested elsewhere |
| 125 and 150 percent text at 390 and 360, 15 pages, 60 views | 57 PASS, 3 FAIL: `/seo` 390 and 360, `/ai-seo` 390 (pre-existing, identical on the pre-5D baseline). D-12 and D-13 below |
| CTA reachability and non-overlap at scaled text | PASS on the 15 pages except where the page overflows (D-12, D-13) |
| No-JavaScript content | PARTIAL: content is in the server HTML, and hidden states apply only after JavaScript sets `data-pending` (checked in `b2.css` and the served markup). A real no-JavaScript browser run: NOT TESTED |
| Reduced-motion browser behaviour | NOT TESTED (no emulation available); `prefers-reduced-motion` rules exist in the CSS only |
| Contrast, 15 core pages, 2,365 text nodes at 1440 | INCONCLUSIVE for unrevealed content (the audit sees scroll-reveal items at opacity 0). Real findings with revealed text: D-14 below |
| Screen reader, Safari, Firefox, real devices | NOT TESTED |

New findings (all pre-existing, none caused by 5D; measured identically on the pre-5D baseline). Not fixed: they are on approved frozen pages and outside the D-04 and D-05 scope.
| ID | Sev | Route | Finding | Smallest recommended fix |
|---|---|---|---|---|
| D-12 | P2 | `/seo` | At 150% text the page scrolls horizontally (379px at 360 wide, 394px at 390). The overflowing element is inside an aria-hidden figure (likely an absolutely positioned nowrap stage tag); the exact element was not isolated | Find the overflowing node and allow it to wrap or clip inside its figure |
| D-13 | P2 | `/ai-seo` | At 150% text and 390 wide the page is 431px wide: the "Illustrative example" tracking table (`.ax-mini`, `ax-trk-up` cells) uses `white-space: nowrap` | Let the cells wrap or give the table its own horizontal scroll container |
| D-14 | P2 | `/seo`, `/ai-seo`, `/lead-generation`, `/how-it-works` | Not-yet-reached sequencer steps are dimmed below AA: `/seo` step titles and tags at 25% opacity (1.6 to 2.2:1), `/ai-seo` steps at 72% (3.6:1 for 4.5:1 text), `/lead-generation` step numerals at 70% (4.0:1), `/how-it-works` "You receive" heading at 35% | Raise the unplayed opacity per page as done for `/conversion-optimization` (86%); needs founder approval since DEC-096 recorded 70% for lead generation |

### 13.6 Files changed in 5D
CSS only, plus documents. No TypeScript, test or dependency change.
- `components/paid-advertising/services/services.css`, `components/cplus/seo/seo.css`, `components/cplus/ai-seo/ai-seo.css`, `components/b2/about.css`, `components/b2/work.css`, `components/b2/how-it-works.css`, `components/google-ads-r4/google-ads-r4.css`, `components/meta-ads-r1/meta-ads-r1.css`: label and chip font sizes raised to 11px (D-04).
- `components/cplus/lead-generation/lead-gen.css`: related links `min-height: 24px` (D-05).
- `docs/00-project/DECISION_LOG.md` (DEC-100) and this report.
Approved pages touched: `/seo`, `/ai-seo` and `/lead-generation` (frozen under DEC-092, DEC-094, DEC-096) received only the 11px label and 24px link changes above. No copy, structure, colour, metadata, URL or pricing changed. Regression below shows no layout change beyond 1px.

### 13.7 Regression results
- Tests: `npm test` 515 tests, 514 pass, 0 fail, 1 skipped (pre-existing). Typecheck clean. Lint 0 errors, 2 warnings (D-07 `Text` import and the pre-existing test variable). Production builds exit 0 (builds 3 and 4).
- Final production build, 15 pages at 1440x900, 390x844 and 360x800 (45 views) plus 60 scaled views: `/lead-generation` and `/conversion-optimization` have every scene within the fold at all three sizes; no new overflow; the three overflows above are the only ones and match the baseline exactly.
- `/seo`, `/ai-seo`, `/how-it-works` and `/about` section heights match the pre-5D build within 1px (for example `/how-it-works` steps 380 vs 379, `/about` hero 252 vs 251). Note: my generic measure counts some designed multi-screen scenes on those pages as over the fold, in the baseline too, so it shows no regression rather than proving fold fit for them.
- Other approved pages unaffected: pricing text, all metadata and structured data are unchanged (CSS-only edits).

### 13.8 Open counts (after 5D)
P0 0. P1 0. P2 3 open (D-12, D-13, D-14), all pre-existing and newly measured. P3: D-06, D-07 and D-08 accepted as nonblocking follow-ups; D-11 pending founder approval of the recommendation above; D-04 and D-05 closed.
Resolved earlier: D-01, D-02 fixed, D-03 withdrawn, D-10 resolved (DEC-099), D-09 live check pending (release boundary).

### 13.9 Production-only checklist (none performed; separate from design acceptance)
1. Production canonical, `og:url`, JSON-LD and sitemap verification on the live site after the release build (build defaults already verified).
2. A real form submission and downstream delivery, with founder approval.
3. CRM and WhatsApp integration (production CRM configuration unverified).
4. Analytics and consent-event verification (GTM, GA4, Meta Pixel).
5. Browser, device and screen-reader coverage: Safari, Firefox, real phones, a screen reader, reduced motion and no-JavaScript in a real browser.
6. Separate authorisation for commit, PR, merge and deployment (none given).

### 13.10 Recommendation: BLOCKED pending three founder decisions
The scope of 5D is complete (D-04 and D-05 resolved, D-11 audited). Release preparation should not start until the founder decides D-12, D-13 and D-14, because they are measured P2 accessibility defects (text scaling overflow and sub-AA text on upcoming steps) on approved pages.

### 13.11 Decisions required from the founder
1. D-12 and D-13: authorise a minimal fix to `/seo` and `/ai-seo` for 150% text scaling, or accept them as known P2 for release.
2. D-14: authorise raising the unplayed step opacity on `/seo`, `/ai-seo`, `/lead-generation` and `/how-it-works` (this changes the DEC-096 recorded 70%), or accept the current dimming.
3. D-11: approve closing as "by design, no change" (recommended), or choose another option.
4. Confirm whether the decorative aria-hidden ad mocks may keep their 9.5 to 10.9px text.

## 14. Stage 5D remediation: D-11 to D-14 (2026-10-30, local only)

### 14.1 Founder decision reference
`DEC-101` (appended to `docs/00-project/DECISION_LOG.md`). The founder authorised D-12, D-13 and D-14, closed D-11 as by design, and allowed sub-11px decorative mock text only where nonessential and hidden from assistive technology. No earlier approval date is claimed. This section supersedes the "BLOCKED" recommendation in 13.10 and the open questions in 13.11.

### 14.2 D-11 closed (by design)
Checked on the local server: `/contact/call` returns `308` to `/contact?intent=call`; the target returns `200`; its canonical path is `/contact` (host shown is the local default, production host is a release check); the sitemap contains `/contact` only and no `/contact/call` or `intent=call` entry. Routing, robots and canonical are untouched (`next.config.mjs` and the robots file have no diff).

### 14.3 D-12 and D-13: root causes and exact fixes
| ID | Root cause (isolated) | Fix |
|---|---|---|
| D-12 `/seo` | Not the stage tag guessed in 13.5. Hiding each element in turn showed the "Clear communication" `h3` in the two-column `.sk-pledges` grid: at 150% text the word "communication" is wider than a column of about 171px, and widened the page to 394px (390) and 379px (360) | `components/cplus/seo/seo.css`, mobile rule: `grid-template-columns: repeat(auto-fit, minmax(min(100%, 8rem), 1fr))`. Two columns at normal text, one column when enlarged text leaves under 8rem per column. No text shrunk or clipped |
| D-13 `/ai-seo` | `.ax-trk td { white-space: nowrap }` (the wrap override existed only at 380px and narrower), so the "Illustrative example" table kept 338px of content at 390 and made the page 431px | `components/cplus/ai-seo/ai-seo.css`: `@media (max-width: 480px) { .b2.ai .ax-trk td { white-space: normal; } }`. Full table kept (screenshot checked: "Not named" and "Question 1" wrap onto two lines, nothing hidden) |

Verified: `/seo` and `/ai-seo` at 390 and 360, 100, 125 and 150%: no horizontal overflow (12 of 12 views, was 3 failing).

### 14.4 D-14: measured contrast before and after
Method: for every text node inside each sequencer element, effective foreground and background were composited with the element's opacity over the ground behind it, then compared with 4.5:1 (3:1 for large text). The lowest ratio over all text in the element is shown. "Before" is the opacity in the code; "after" is the new opacity. Settled means opacity 1 after the sequence completes.

| Page | Element (unplayed state) | Before | Min ratio before | After | Min ratio after | Settled min |
|---|---|---|---|---|---|---|
| `/seo` | route steps, entrance start (`sk-in`) | 0.25 | 1.41 | 0.86 | 4.68 | 5.97 |
| `/lead-generation` | unreached journey steps (12 elements, light and burnt grounds) | 0.70 | 3.43 (numerals alone 4.02) | 0.86 | 4.66 | 5.97 |
| `/ai-seo` | report example pictures (`.ax-rp-b`) | 0.72 | 3.02 (worst text 3.18) | 0.88 | 4.78 | 5.97 |
| `/ai-seo` | journey step titles and descriptions | 0.70 | 9.59 titles, 6.20 text, already passing | unchanged | unchanged | 14.2 or better |
| `/how-it-works` | route nodes, entrance start (`hw-node`) | 0.25 | 1.38 | 0.86 | 4.66 | 5.97 |
| `/how-it-works` | cycle numerals (large text, 3:1) | 0.30 | 1.52 | 0.86 | 4.66 | 5.97 |
| `/how-it-works` | "You receive" panel | 0.35 | 1.53 | 0.86 | 4.86 | 6.20 |
| `/how-it-works` | timeline marker dots | 0.20 | no text | unchanged | not text (aria-hidden, decorative) | n/a |

The QA register's `/ai-seo` "steps at 72% (3.6:1)" referred to the report example pictures, not the journey steps; the journey steps pass. Margins at 0.86 are thin (4.56 to 4.86) but every measured element passes; the lowest passing opacity per element was 0.83 to 0.86. The same keyframes also hold the opening frame, so the first moment of each sequence is legible too. Timing, order, manual controls and reduced-motion rules are unchanged (opacity values only, plus the CSS comments).

### 14.5 Exceptions
- **DEC-096:** its approved 70% not-yet-reached state on `/lead-generation` is replaced by 86%, an accessibility-driven change recorded in `DEC-101` (at 70%, small numerals and labels were below 4.5:1 on some grounds).
- **Decorative mock text:** the audit of 11 pages found sub-11px text only in the `/google-ads` Performance Max diagram labels (Search, Shopping, Display, YouTube, Maps at 10.5px). They sit inside an SVG with `role="img"` and an `aria-label` that names the same channels, so they are not read separately and carry no unique information. Accepted, recorded in `DEC-101`. The footer social links report 0px only because they are icon links with screen reader text; not a finding.

### 14.6 Regression results (dev server on the worktree, Chromium)
| Check | Result |
|---|---|
| Overflow, 9 pages (`/seo`, `/ai-seo`, `/lead-generation`, `/how-it-works`, `/about`, `/work`, `/conversion-optimization`, `/pricing`, `/services`) at 1440x900, and 390x844 and 360x800 at 100, 125 and 150% | 63 of 63 views with no horizontal overflow |
| Desktop composition | The only layout-affecting edits are inside the mobile media queries (480px and below, and the mobile pledges rule); at 1440 only transient opacity values changed. No pixel diff against a prior build was run |
| Reduced motion (Chromium emulation) | all four sequencers settle at opacity 1 |
| No JavaScript | `/ai-seo`, `/lead-generation`, `/how-it-works` content at opacity 1; `/seo` measured 0.86 mid entrance (a CSS animation, not script driven), which now passes AA |
| Keyboard | Tab then Space on `/ai-seo` journey: visible 3px focus ring, step activated (`is-seen is-on`); Enter on `/lead-generation` step button activated it (`is-seen is-on`), 3px ring |
| Copy, headlines, CTAs, SEO, claims, pricing | not touched (CSS, one test file and documents only) |

### 14.7 Tests and build
- `npm test`: 520 tests, 519 pass, 0 fail, 1 skipped (pre-existing). New file `tests/stage5d-accessibility.test.cjs` (5 tests) guards the opacity floors, the pledges grid and the table wrapping.
- `npm run typecheck`: clean. `npm run lint`: 0 errors, 2 warnings (the known D-07 `Text` import and the pre-existing unused test variable).
- Production build: NOT run. The change is CSS only, and a build would overwrite the `.next` directory that the local review server on port 3451 is using. Run it as part of release preparation.

### 14.8 Open counts
P0 0. P1 0. P2 0 (D-12, D-13, D-14 fixed locally). P3: D-11 closed; D-06, D-07 and D-08 remain accepted nonblocking follow-ups (3). Release-time check D-09 remains pending.

### 14.9 Outstanding production-only checks
Unchanged from 13.9, plus: a production build and smoke, production canonical host for `/contact?intent=call`, and Safari, Firefox, screen reader and real-device passes for the four sequencers and the 150% text views.

### 14.10 Recommendation
**Accept Stage 5D** for the local design, content and accessibility scope: the three P2 defects are fixed and measured, the checks above pass, and nothing outside the authorised scope changed. Release remains separate and unauthorised.

### 14.11 Files changed in this remediation
- `components/cplus/seo/seo.css` (D-12 grid; D-14 `sk-in` keyframe)
- `components/cplus/ai-seo/ai-seo.css` (D-13 wrap; D-14 `.ax-rp-b`)
- `components/cplus/lead-generation/lead-gen.css` (D-14)
- `components/b2/how-it-works.css` (D-14: `hw-ex-rc`, `hw-cnode`, `hw-node` and `hw-land` keyframes, a comment on the marker)
- `tests/stage5d-accessibility.test.cjs` (new)
- `docs/00-project/DECISION_LOG.md` (DEC-101)
- `docs/resolve-sitewide/qa/STAGE5_QA_REPORT.md` (this section)
