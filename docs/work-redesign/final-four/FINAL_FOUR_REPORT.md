# Final four case studies: local implementation report (31 October 2026)

**Status: LOCAL, release on hold.** Branch `feat/paid-case-studies-six-local`, preview on port 3500. No commit, push, PR, merge, Contentful write, publication or deployment. Decision record: `DEC-106`. Assets: `ASSET_MANIFEST.md`.

## 1. Inputs and differences

Source: `MappedSkills_4_Additional_Case_Studies_and_Image_Briefs.docx` (latest final document; earlier example values and draft labels are not used). Cases found: **ClassPe, InsurYo, Ameba Software, Wanderlooms, as expected.** Internal image briefs and "Production note" text are not in public copy.

Differences found in the attachments:
1. **Thirteen images were supplied, not twelve.** The extra is `anybodycanbake-seo-dashboard.png`, which is not one of the four (not applied; question 2).
2. **ClassPe and InsurYo dashboards are not published** (owner correction), so only Ameba Software and Wanderlooms have a dashboard.
3. The supplied images are smaller than the briefed sizes (cards 1586 x 992, heroes 1672 x 941; Wanderlooms 1585 x 992 and 1672 x 940). Used as supplied.
4. The Ameba dashboard carries a printed "Recreated agency report" caption, which breaks the no-caption rule; only that caption was removed (original kept).

## 2. Mapping

| Case | Route | Service (document) | Service tag on the site | Industry shown / sector | Period shown | Card | Hero | Dashboard |
|---|---|---|---|---|---|---|---|---|
| ClassPe | `/portfolio/classpe-social-media-strategy` (existing) | Social Media Management | **none** | Education and training / education | Since Jul 2026 | `classpe-social-media-card` | `classpe-social-media-hero(-wide)` | none |
| InsurYo | `/portfolio/insuryo-organic-growth` (existing) | Organic Growth Strategy | **none** | Insurance / financial-services (Financial services and insurance) | Since Sep 2025 (was Nov 2025) | `insuryo-organic-growth-card` | `insuryo-organic-growth-hero(-wide)` | none |
| Ameba Software | `/portfolio/seo-ameba-software` (existing) | SEO | SEO (`/seo`) | Software and technology / software-technology | none (no dates supplied) | `ameba-software-seo-card` | `ameba-software-seo-hero(-wide)` | `ameba-software-seo-dashboard` |
| Wanderlooms | `/portfolio/wanderlooms-meta-ads` (**new**) | Meta Ads | Social media ads (`/social-media-ads`) | Adventure apparel / ecommerce-retail (eCommerce and retail) | Apr 2026 – Sep 2026 | `wanderlooms-meta-ads-card` | `wanderlooms-meta-ads-hero(-wide)` | `wanderlooms-meta-ads-dashboard` |

Wanderlooms: no earlier entry, no reserved slug (checked in code, tests, eligibility lists and the live library); slug follows `<client>-<service>`.

## 3. Listing

20 studies: **12 on page 1, 8 on page 2.** The three existing cases keep positions 2, 3 and 4; Wanderlooms is appended at 20 (page 2, last). Home Decor stays unlisted.

Page 1: 1 Om Sai Developer, 2 **ClassPe**, 3 **InsurYo**, 4 **Ameba Software**, 5 AnybodyCanBake Google Ads, 6 AnybodyCanBake Meta Ads, 7 EKoching, 8 Klenzmo, 9 Bakersville, 10 Phoenix Laundry, 11 HutnHomes, 12 AnybodyCanBake SEO.
Page 2: 13 Advit Prints, 14 Meticulous Business Plan, 15 Libros Library, 16 Bakedemy Google Ads, 17 Bakedemy Meta Ads, 18 Bblewrap, 19 Talreja & Talreja, 20 **Wanderlooms**.

## 4. Evidence and copy

- **Figures** (all re-computed in `tests/case-study-final-four.test.cjs`): Ameba 7,300 to 12,800 = +75.34%; 5,200 to 8,940 = +71.92%; 34 to 53 = +55.88%; +5,500 clicks, +19 enquiries, +3,740 nonbrand. Wanderlooms ₹36,00,000 / 6,607 = ₹544.88; ₹1,12,32,000 / 6,607 = ₹1,700.02; ₹1,12,32,000 / ₹36,00,000 = 3.12×. ClassPe about 95% (growth in student strength, stated as overall business growth); InsurYo 4 projects and ₹20 crore valuation (company milestones).
- **Source and scope of the Ameba change:** the owner-supplied final case study set of 31 October 2026, **for this case only**; it supersedes `WORK-011/012/013`. Recorded in `DEC-106` and in `lib/case-study-proof.ts`. The `/seo` Ameba summary was updated for factual consistency only (final problem and work wording, the supplied figures, the comparison caveat); layout unchanged.
- **Kept distinct:** growth percentages from capacity or occupancy (none used); business milestones and valuation from marketing outcomes (InsurYo says so on the page and in the evidence note); revenue, profit and valuation (Wanderlooms: "revenue return is not profit"; InsurYo valuation "separate from revenue, funding raised and marketing results"); enquiries, orders and customers (separate labels).
- **No causal overclaims:** ClassPe's evidence note says the growth is not attributed to organic social content alone and that paid execution was the client's in-house team; InsurYo says the milestones are not credited to MappedSkills alone; Ameba says the comparison is not proof the work caused the change. No testimonial, no invented tactic.
- **Deliberate differences from the document:** thousands commas; "in-house" and "-led" hyphenation; ClassPe's lead figure is written "≈95%" so the outcome board shows one reported figure; the document's "Metric / Result" tables are laid out as the established outcome list; the InsurYo evidence note does not mention the earlier November 2025 draft.

## 5. Design

Approved case-study template and tokens, unchanged. Established responsive hero (2.6:1 crop on desktop and tablet, supplied hero whole on narrow screens) with the outlined client name. No name duplication (names are not baked into the artwork). No visible illustrative or recreated captions and no full-size image action. Cards: own supplied image, no figure in the card copy, accurate eyebrow.

## 6. Showcase mockups (separate, pending)

Untouched and not implemented. The injected mockups existed only in scripted screenshots; **no injection exists in the application**, and port 3500 serves real output (checked: no showcase markup on the pages). The mockup server on port 3601 is stopped. Still pending from the owner's note: **two** case cards, **one** section-level "View all" link and a shorter section for `/seo` (the revised mockup kept a third "View all" tile and measured about 781 px on mobile), and approval of the per-page light/dark variant.

## 7. Verification

| Check | Result |
|---|---|
| Four detail pages and `/work` pages 1 and 2 at 1440, 390 and 360 (18 pages): HTTP 200, 0 console errors, no horizontal overflow, no conceptual/recreated caption text, images load (the only "not loaded" images are the hidden alternate hero of each `<picture>`) | **PASS** |
| Search: client, industry and keyword terms (Wanderlooms, adventure, InsurYo, insurance, ClassPe, Ameba) | **PASS** |
| Service filters (SEO: 2 studies; Social media ads: incl. Wanderlooms; ClassPe and InsurYo are absent from both) | **PASS** |
| Industry filters (education, software-technology, financial-services, ecommerce-retail), combined filters, and filters arriving on page 2 (`/work/page/2?...`), 19 URLs at 1440 and 390; non-matching studies absent in the strict check | **PASS** |
| Pagination 12 + 8, no duplicate, no broken page | **PASS** |
| Tests: 570, 569 pass, 0 fail, 1 skipped (existing skip). New file: `tests/case-study-final-four.test.cjs` (9 tests) | **PASS** |
| `tsc --noEmit` | **PASS** (no errors) |
| ESLint on changed files | **PASS** (0 errors; 4 warnings in test files, same pattern as existing tests) |
| Fresh production build (isolated copy, no preview flag, no release switch), real Contentful read | **PASS**: no Wanderlooms route, 5 public studies, no new image file, no final figure on the three live pages, conceptual illustrations kept, `/seo` Ameba summary without a figure |
| Manual screen-reader, real-device and cross-browser checks | **BLOCKED** (not run here) |
| Mobile navigation on the changed pages | **PASS** by layout and overflow check at 390 and 360; menu behaviour unchanged (no template change) |

Observation (existing template behaviour, not changed): on 390 and 360 px the long outlined client name "AMEBA SOFTWARE" is clipped at the stage edge ("AMEBA SOFTWAR"); other long names behave the same.

## 8. Unresolved questions

1. **"IAT"** (ClassPe, "IAT-focused content") is never expanded in the document. Used as written. What does it stand for, and should it be spelled out?
2. **An extra file:** `anybodycanbake-seo-dashboard.png` was supplied again with "Earlier 90 days / Later 90 days" labels, but the approved AnybodyCanBake SEO case uses May to July and August to October 2026. Should it replace the published dashboard (and if so, with which period labels)? Not applied.
3. **Ameba location:** the final document does not name a city; "Chandigarh" is kept from the existing entry and the `/seo` page. Confirm.
4. **Ameba periods:** no calendar dates were supplied; none is shown. Provide them if they may be published.
5. **InsurYo filtering:** it is the only study in "Financial services and insurance", and a sector filter option appears only at two or more studies (`SECTOR_OPTION_MIN`), so InsurYo is found by search but has no sector option. Acceptable, or should the threshold change (a separate library decision)?
6. **Wanderlooms industry:** shown as "Adventure apparel" (page) with the "D2C and ecommerce" label on the card eyebrow and sector eCommerce and retail. Confirm.
7. **ClassPe and InsurYo service labels:** none is shown as a tag. "Social Media Management" and "Organic Growth Strategy" are not catalogue services (`DEC-005`; standalone social media management excluded), so no taxonomy change is proposed; the supplied artwork itself prints those labels. Confirm.

## 9. Later Contentful and release requirements (not executed)

1. **Update the three existing entries** (`classpe-social-media-strategy`, `insuryo-organic-growth`, `seo-ameba-software`) with the final fields from `lib/case-study-local-final-four.ts`: title, summary, problem, what we did, impact, evidence note, client, industry, sector, service key (Ameba `/seo`; the other two none), period start (ClassPe Jul 2026, InsurYo Sep 2025), keeping their entry IDs and `listingOrder`.
2. **Create and publish Wanderlooms** (`wanderlooms-meta-ads`, sector `ecommerce-retail`, service `/social-media-ads`, period Apr to Sep 2026) after the owner's go-ahead; it needs the new-layout fields complete to be public.
3. **Then, in the same release step:** turn on the release switch (`NEXT_PUBLIC_CASE_FINAL_FOUR=1` in the build environment, or replace `finalFourReleased()` with `true` in `lib/case-study-final-four.ts`); remove `seo-ameba-software` from `PROOF_WITHHELD_SLUGS` in `lib/case-study-proof.ts`; delete the held `/seo` Ameba block (`amebaHeld`) and its switch in `SeoBody.tsx`. Doing the code before the Contentful update would put the new artwork and figures beside the old live copy.
4. Delete `lib/case-study-local-final-four.ts` and its call in `lib/case-study-local-preview.ts` once the entries exist.
5. `/seo`: the AnybodyCanBake SEO case (`anybodycanbake-seo`) must also be published (`DEC-105`).
6. Re-run tests, `tsc` and a fresh build; check the live pages, `/work` pages 1 and 2, the sitemap (Wanderlooms added) and the filters.

## 10. Files

New: `lib/case-study-final-four.ts`, `lib/case-study-local-final-four.ts`, `tests/case-study-final-four.test.cjs`, `public/images/case-studies/{classpe-social-media,insuryo-organic-growth,ameba-software-seo,wanderlooms-meta-ads}-*.webp`, this folder (`tools/`, `source-originals/`, `edits/`, `screenshots/`, `wide-work/`), git-ignored `.env.development.local`.
Changed: `lib/case-study-images.ts`, `lib/case-study-presentation.ts`, `lib/case-study-local-preview.ts`, `lib/case-study-proof.ts`, `components/cplus/seo/{content.ts,SeoBody.tsx}`, `tests/{seo-page,case-study-paid-batch,case-study-paid-batch-2,case-study-abc-google-ads}.test.cjs` (counts and held-state assertions), `docs/00-project/DECISION_LOG.md` (DEC-106).
