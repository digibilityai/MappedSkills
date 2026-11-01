# Asset manifest: six paid-advertising case studies (local review batch, 30 October 2026)

Status: **LOCAL, not released.** Nothing committed, pushed, deployed, published or written to Contentful.
Evidence label for every statement here: **VERIFIED FACT** (repository and file inspection on 2026-10-30) unless marked otherwise.

## Mapping: document to client to service to industry to route to artwork

| # | Document | Client | Service | Industry (document) | Detail route | Sector key / service key | Card | Hero (supplied) | Hero 2.6:1 (derived) | Dashboard |
|---|---|---|---|---|---|---|---|---|---|---|
| 02 | `02_AnybodyCanBake_Meta_Ads_Approval_Draft.docx` | AnybodyCanBake | Meta Ads | Education and training | `/portfolio/anybodycanbake-meta-ads` | `education` / `/social-media-ads` | `anybodycanbake-meta-ads-card.webp` | `…-hero.webp` | `…-hero-wide.webp` | `…-dashboard.webp` |
| 04 | `04_EKoching_Google_Ads_Approval_Draft.docx` | EKoching | Google Ads | Education and training | `/portfolio/ekoching-google-ads` | `education` / `/google-ads` | `ekoching-google-ads-card.webp` | `…-hero.webp` | `…-hero-wide.webp` | `ekoching-google-ads-dashboard.webp` (second delivery) |
| 05 | `05_Klenzmo_Meta_Ads_Approval_Draft.docx` | Klenzmo | Meta Ads | D2C and ecommerce | `/portfolio/klenzmo-meta-ads` | `ecommerce-retail` / `/social-media-ads` | `klenzmo-meta-ads-card.webp` | `…-hero.webp` | `…-hero-wide.webp` | `…-dashboard.webp` |
| 06 | `06_Bakersville_Google_Ads_Approval_Draft.docx` | Bakersville | Google Ads | D2C and ecommerce | `/portfolio/bakersville-google-ads` | `ecommerce-retail` / `/google-ads` | `bakersville-google-ads-card.webp` | `…-hero.webp` | `…-hero-wide.webp` | `…-dashboard.webp` |
| 07 | `07_Phoenix_Laundry_Google_Ads_Approval_Draft.docx` | Phoenix Laundry | Google Ads | Local services | `/portfolio/phoenix-laundry-google-ads` | none (no local-services key) / `/google-ads` | `phoenix-laundry-google-ads-card.webp` | `…-hero.webp` | `…-hero-wide.webp` | `…-dashboard.webp` (second delivery, see note) |
| 08 | `08_HutnHomes_Meta_Ads_Approval_Draft.docx` | HutnHomes | Meta Ads | Real estate | `/portfolio/hutnhomes-meta-ads` | `real-estate` / `/social-media-ads` | `hutnhomes-meta-ads-card.webp` | `…-hero.webp` | `…-hero-wide.webp` | `…-dashboard.webp` |

All repository files are under `public/images/case-studies/`. The existing AnybodyCanBake **Google Ads** study (`/portfolio/google-ads-for-online-courses`, `public/images/resolve-r3/anybodycanbake-*.webp`) is untouched and is a different case with its own files.

Slugs follow the existing `<client>-<service>` pattern (Om Sai is `om-sai-developer-meta-ads`). No existing slug or entry was found for any of the six clients in the repository; whether the live Contentful space already holds entries for them could not be checked (see "Contentful read access" in the report).

## Sources (never modified)

Supplied in `~/Downloads` (`Cards/`, `Hero/`, and the dashboard PNGs at the top level). All cards and dashboards are 1586 x 992, all heroes 1672 x 941, as the briefs' 8:5 and 16:9 and 8:5 ratios. The briefs asked for 1600 x 1000, 1920 x 1080 and 1920 x 1200; the files are used at the pixels supplied, never upscaled.

| Output file | Source file | Source SHA-256 (first 12) | Output |
|---|---|---|---|
| `anybodycanbake-meta-ads-card.webp` | `Cards/anybodycanbake-meta-ads-card.png` | `5fff95010ff5` | 1586x992, 122 KB |
| `anybodycanbake-meta-ads-hero.webp` | `Hero/anybodycanbake-meta-ads-hero.png` | `83ce629c5e0d` | 1672x941, 135 KB |
| `anybodycanbake-meta-ads-dashboard.webp` | `anybodycanbake-meta-ads-dashboard.png` (second delivery, 18:39, replaces the 16:33 file `b6a5ddb9fd36`) | `1c1a91eb4ea7` | 1586x992, 82 KB |
| `ekoching-google-ads-card.webp` | `Cards/ekoching-google-ads-card.png` | `88b25daf4e39` | 1586x992, 80 KB |
| `ekoching-google-ads-hero.webp` | `Hero/ekoching-google-ads-hero.png` | `8766b486dad6` | 1672x941, 81 KB |
| `klenzmo-meta-ads-card.webp` | `Cards/klenzmo-meta-ads-card.png` | `f73f6bdacb47` | 1586x992, 123 KB |
| `klenzmo-meta-ads-hero.webp` | `Hero/klenzmo-meta-ads-hero.png` | `82abc7fb82c3` | 1672x941, 124 KB |
| `klenzmo-meta-ads-dashboard.webp` | `klenzmo-meta-ads-dashboard.png` (second delivery, 18:37, replaces `e921ff55ad18`) | `5d39a4006aa8` | 1586x992, 74 KB |
| `bakersville-google-ads-card.webp` | `Cards/bakersville-google-ads-card.png` | `7779d3526299` | 1586x992, 115 KB |
| `bakersville-google-ads-hero.webp` | `Hero/bakersville-google-ads-hero.png` | `53c4adad19f3` | 1672x941, 120 KB |
| `bakersville-google-ads-dashboard.webp` | `bakersville-google-ads-dashboard.png` | `c251f1fe6983` | 1586x992, 82 KB |
| `phoenix-laundry-google-ads-card.webp` | `Cards/phoenix-laundry-google-ads-card.png` | `2b0bacee263e` | 1586x992, 92 KB |
| `phoenix-laundry-google-ads-hero.webp` | `Hero/phoenix-laundry-google-ads-hero.png` | `7452423c0ed8` | 1672x941, 120 KB |
| `phoenix-laundry-google-ads-dashboard.webp` | `Phoenix Laundry client reporting dashboard.png` (second delivery, 18:34, replaces `69724e50e6e2`) | `904d9ac80d6b` | 1586x992, 62 KB |
| `ekoching-google-ads-dashboard.webp` | `ekoching dashboard.png` (second delivery, 18:45; the owner confirmed it is EKoching's) | `096186bee8f4` | 1586x992, 71 KB |
| `hutnhomes-meta-ads-card.webp` | `Cards/hutnhomes-meta-ads-card.png` | `053b9951ef34` | 1586x992, 173 KB |
| `hutnhomes-meta-ads-hero.webp` | `Hero/hutnhomes-meta-ads-hero.png` | `28f430559760` | 1672x941, 209 KB |
| `hutnhomes-meta-ads-dashboard.webp` | `hutnhomes-meta-ads-dashboard.png` | `cd51f95b15a8` | 1586x992, 88 KB |

The six `*-hero-wide.webp` files (1672 x 643, 57 to 156 KB) are derived, see below. Conversion: `docs/work-redesign/paid-case-batch/tools/convert-assets.cjs` (WebP quality 82 cards, 84 heroes, 90 dashboards). Assets were identified by viewing each image, not by file name; each matches its document's client, figures and period (see the check list in the report).

## Second delivery of dashboards (30 October 2026, evening)

The owner supplied new dashboards for AnybodyCanBake Meta Ads, Klenzmo, Phoenix Laundry and EKoching. They supersede the earlier files (the two Phoenix files of the first delivery are both retired). One attachment was described as EKoching but its visible client name is Klenzmo; it is mapped to Klenzmo, and the separately supplied `ekoching dashboard.png` (client name EKoching) is mapped to EKoching. Nothing was substituted across clients. The supplied artwork is unchanged. The Bakersville and HutnHomes dashboards are the first-delivery files (the Bakersville source PNG is no longer in `~/Downloads`; the converted WebP in the repository is the one converted from `c251f1fe6983`).

The new dashboards no longer carry footers or evidence notes, so the page text carries them (caption under the image and the evidence section): revenue return is not profit (all), products sold are not confirmed order counts (Klenzmo), enquiry and enrolment totals are not a verified matched-cohort rate (EKoching), and for Phoenix the ₹50,000 Lifetime Value tile is a business-supplied estimate, separate from the ₹7,68,000 reported revenue and excluded from ROAS (the new Phoenix dashboard shows no ROAS tile; the 1.92 times is in the page text).

**Search + Display: CONFIRMED.** The EKoching and Phoenix Laundry dashboards show a "Search + Display" selector. The owner confirmed on 30 October 2026 that both clients used Google Search and Display campaigns, so the label stays on the supplied artwork and the page copy may say so. Nothing further about formats, keywords or tactics is claimed.

## 2.6:1 desktop hero derivatives

The case-study stage is 2.6:1 on desktop (`components/case-study/case-study.css`), 2:1 on tablet and 1.3:1 on mobile. As for AnybodyCanBake (Google Ads), narrow screens (760 px and below) show the supplied 16:9 hero whole and the desktop stage shows a 1672 x 643 derivative with the client name added by the website in the foreground. A plain crop would cut the headline or figures and a pillarbox would collide with the name, so each derivative keeps the supplied pixels and only rearranges them:

1. the supplied text lines are painted out of a copy of the artwork (dark and orange pixels inside the text rectangles, refilled from the surrounding picture);
2. the photograph is moved and cropped to 2.6:1;
3. the original text blocks (tag, headline, figures, period label) are scaled to 62 to 70 percent and placed top left, nothing retyped, so the lower fifth stays free for the outlined name.

Tool and per-hero parameters: `tools/make-wide-heroes.cjs`. Checked by eye on all six at full size and by test (no dark pixels in the name zone). Known limits, none removing meaningful content:

- Phoenix Laundry: faint ghost of the repaired headline edge in the blurred background (barely visible).
- HutnHomes and EKoching: the baked period label becomes small (about 10 px at 1440 px width); the same period is shown in the page chips and the case file.
- AnybodyCanBake Meta: keeps the baked "Illustrative learning scene" caption at the lower right.

Because the artwork carries text near its edges, the six stages use a "still" stage (no scroll-linked zoom, `is-still` in `case-study.css`). AnybodyCanBake Google Ads and Om Sai keep the existing zoom.

## Artwork discrepancies against the documents (not edited)

| Asset | Finding | Action needed |
|---|---|---|
| `phoenix-laundry-google-ads-dashboard`, `ekoching-google-ads-dashboard` | "Search + Display" selector not in documents 07 and 04 | Closed: confirmed by the owner, 30 October 2026 |
| `anybodycanbake-meta-ads-hero` | Shows "since 2018" beside 3,892 paid enrolments and 6.52x ROAS with **no results period**; brief 02 asked for "Results shown: Sep 2021 to Oct 2026". Risk: reads as results since 2018 | Revise artwork; meanwhile the stage caption says the results cover September 2021 to October 2026 and the alt text states it |
| `klenzmo-meta-ads-hero`, `phoenix-laundry-google-ads-hero` | Klenzmo dotted fragment and Phoenix faint text shadow | Accepted by the owner; no action |
| `anybodycanbake-meta-ads-dashboard` | Date selector uses an en dash ("Sep 2021 – Oct 2026") | Minor; optional revision |
| `bakersville-google-ads-hero`, `klenzmo-meta-ads-hero` | Both carry the identical headline "Product sales measured against advertising spend"; brief 06 asked for "Turning advertising investment into product sales" | Owner choice |
| `hutnhomes-meta-ads-hero` | Headline "Beyond lead volume: site visits and reported sales" differs from brief 08 ("From qualified property leads to site visits and sales"); it shows 845 sales-qualified leads and 23 reported sales, not the site-visit count its headline names | Owner choice |

Every number and label in the six cards, six heroes and five dashboards was compared with the documents: all figures, periods, "products sold", "reported sales", "site visits", "reported ROAS" and the lifetime-value caveat match. Calculations re-derived: cost per enrolment, per enquiry, per product, per customer, per lead and per visit, and every ROAS (all asserted in `tests/case-study-paid-batch.test.cjs`). The bar lengths of the three dashboards that have bars were measured: spend/revenue 0.151 (expected 0.153), 0.197 (0.193) and 0.190 (0.189).

## AnybodyCanBake Google Ads dashboard: footer removed (30 October 2026, owner instruction)

`public/images/resolve-r3/anybodycanbake-dashboard.webp` (1586 x 992) no longer carries the footer sentence "Recreated agency dashboard using reported campaign totals. Revenue return is not profit." Only that text was removed (`tools/remove-dashboard-footer.cjs`: text pixels inside the footer rectangle refilled row by row from the untouched background on each side; the divider line above it, every metric, the chart and the labels are untouched). Original kept at `source-originals/anybodycanbake-dashboard.original.webp` (SHA-256 `4408807a09d2`); edited file SHA-256 `ed39e4494491`. Before and after: `edits/abc-google-ads-dashboard-before-after.png`. Pixels outside the footer area differ from the original only by WebP re-encoding noise (at most 13 of 255 levels).

## Second batch (31 October 2026): eight further studies

Source document: `~/Downloads/MappedSkills_8_Final_Case_Studies_and_Image_Briefs.docx` (the only content source; it supersedes the earlier 14-case index). Images: 24 PNGs in `~/Downloads` (`<base>-card.png`, `<base>-feature.png` = the hero, `<base>-dashboard.png`). All 24 are present; none missing, duplicated or cross-mapped (each identified by viewing: client name, service, figures, period). Cards and dashboards 1586 x 992; heroes 1672 x 941, except Libros and Bakedemy Meta heroes at 1672 x 940 (supplied 1 px short, used as supplied, never resized). The briefs asked for 1600 x 1000 / 1920 x 1080 / 1920 x 1200; files are used at the pixels supplied.

| # | Client | Service | Industry / sector key / service key | Route | Card | Hero | Hero 2.6:1 | Dashboard |
|---|---|---|---|---|---|---|---|---|
| 1 | AnybodyCanBake | SEO | Education and training / `education` / `/seo` | `/portfolio/anybodycanbake-seo` | `anybodycanbake-seo-card.webp` | `…-hero.webp` | `…-hero-wide.webp` | `…-dashboard.webp` |
| 2 | Advit Prints | Meta Ads | D2C and ecommerce / `ecommerce-retail` / `/social-media-ads` | `/portfolio/advit-prints-meta-ads` | `advit-prints-meta-ads-*` | same pattern | | |
| 3 | Meticulous Business Plan | Google Ads | Professional services / `professional-services` / `/google-ads` | `/portfolio/meticulous-business-plan-google-ads` | `meticulous-business-plan-google-ads-*` | | | |
| 4 | Libros Library | Meta Ads | Local services (assumed) / none / `/social-media-ads` | `/portfolio/libros-library-meta-ads` | `libros-library-meta-ads-*` | | | |
| 5 | Bakedemy | Google Ads | Education and training / `education` / `/google-ads` | `/portfolio/bakedemy-google-ads` | `bakedemy-google-ads-*` | | | |
| 6 | Bakedemy | Meta Ads | Education and training / `education` / `/social-media-ads` | `/portfolio/bakedemy-meta-ads` | `bakedemy-meta-ads-*` | | | |
| 7 | Bblewrap | Google Ads | Professional services / `professional-services` / `/google-ads` | `/portfolio/bblewrap-google-ads` | `bblewrap-google-ads-*` | | | |
| 8 | Talreja & Talreja | Google Ads | Professional services / `professional-services` / `/google-ads` | `/portfolio/talreja-talreja-google-ads` | `talreja-talreja-google-ads-*` | | | |

All under `public/images/case-studies/`. Conversion: `tools/convert-assets-batch2.cjs` (WebP quality 82 cards, 84 heroes, 90 dashboards); 2.6:1 derivatives: `tools/make-wide-heroes.cjs` (second-batch entries; same method as the first six). Originals stay in `~/Downloads`. The industry for cases 2 to 8 is not stated in the document: it is my classification (see questions in the report).

| Output file | Source file | Source SHA-256 (first 12; for `hero-wide` the derived PNG) | Output |
|---|---|---|---|
| `anybodycanbake-seo-card.webp` | `anybodycanbake-seo-card.png` | `ea514bbaae06` | 1586x992, 136 KB |
| `anybodycanbake-seo-hero.webp` | `anybodycanbake-seo-feature.png` | `b441bfe5f80a` | 1672x941, 150 KB |
| `anybodycanbake-seo-hero-wide.webp` | `anybodycanbake-seo-hero-wide.png` | `41509fbc32bf` | 1672x643, 104 KB |
| `anybodycanbake-seo-dashboard.webp` | `anybodycanbake-seo-dashboard.png` | `7d1d2a368614` | 1586x992, 77 KB |
| `advit-prints-meta-ads-card.webp` | `advit-prints-meta-ads-card.png` | `63c1241bf6e8` | 1586x992, 273 KB |
| `advit-prints-meta-ads-hero.webp` | `advit-prints-meta-ads-feature.png` | `b6bb5f2d8ada` | 1672x941, 188 KB |
| `advit-prints-meta-ads-hero-wide.webp` | `advit-prints-meta-ads-hero-wide.png` | `8dcfd72c5fd2` | 1672x643, 152 KB |
| `advit-prints-meta-ads-dashboard.webp` | `advit-prints-meta-ads-dashboard.png` | `794cb9f2551e` | 1586x992, 71 KB |
| `meticulous-business-plan-google-ads-card.webp` | `meticulous-business-plan-google-ads-card.png` | `058fa3d1b67a` | 1586x992, 84 KB |
| `meticulous-business-plan-google-ads-hero.webp` | `meticulous-business-plan-google-ads-feature.png` | `e837b5604736` | 1672x941, 94 KB |
| `meticulous-business-plan-google-ads-hero-wide.webp` | `meticulous-business-plan-google-ads-hero-wide.png` | `38df94f0ba89` | 1672x643, 70 KB |
| `meticulous-business-plan-google-ads-dashboard.webp` | `meticulous-business-plan-google-ads-dashboard.png` | `3f4dcc4db769` | 1586x992, 65 KB |
| `libros-library-meta-ads-card.webp` | `libros-library-meta-ads-card.png` | `bc19513fc5b7` | 1586x992, 135 KB |
| `libros-library-meta-ads-hero.webp` | `libros-library-meta-ads-feature.png` | `5246113e5d6c` | 1672x940, 131 KB |
| `libros-library-meta-ads-hero-wide.webp` | `libros-library-meta-ads-hero-wide.png` | `a6f3e2c4fd81` | 1672x643, 88 KB |
| `libros-library-meta-ads-dashboard.webp` | `libros-library-meta-ads-dashboard.png` | `0cbc029ea711` | 1586x992, 73 KB |
| `bakedemy-google-ads-card.webp` | `bakedemy-google-ads-card.png` | `4d57f03e02f3` | 1586x992, 138 KB |
| `bakedemy-google-ads-hero.webp` | `bakedemy-google-ads-feature.png` | `0af2730f5e8c` | 1672x941, 126 KB |
| `bakedemy-google-ads-hero-wide.webp` | `bakedemy-google-ads-hero-wide.png` | `92cd6ee7d6b6` | 1672x643, 92 KB |
| `bakedemy-google-ads-dashboard.webp` | `bakedemy-google-ads-dashboard.png` | `86497716713a` | 1586x992, 60 KB |
| `bakedemy-meta-ads-card.webp` | `bakedemy-meta-ads-card.png` | `b552666dad8b` | 1586x992, 95 KB |
| `bakedemy-meta-ads-hero.webp` | `bakedemy-meta-ads-feature.png` | `e7982ff748c8` | 1672x940, 124 KB |
| `bakedemy-meta-ads-hero-wide.webp` | `bakedemy-meta-ads-hero-wide.png` | `663b17916cac` | 1672x643, 93 KB |
| `bakedemy-meta-ads-dashboard.webp` | `bakedemy-meta-ads-dashboard.png` | `c84d298bd50e` | 1586x992, 75 KB |
| `bblewrap-google-ads-card.webp` | `bblewrap-google-ads-card.png` | `cee3649986b5` | 1586x992, 88 KB |
| `bblewrap-google-ads-hero.webp` | `bblewrap-google-ads-feature.png` | `31b2bda54b34` | 1672x941, 102 KB |
| `bblewrap-google-ads-hero-wide.webp` | `bblewrap-google-ads-hero-wide.png` | `c71c544371db` | 1672x643, 60 KB |
| `bblewrap-google-ads-dashboard.webp` | `bblewrap-google-ads-dashboard.png` | `bff043d1655f` | 1586x992, 58 KB |
| `talreja-talreja-google-ads-card.webp` | `talreja-talreja-google-ads-card.png` | `77b6cbd3eacd` | 1586x992, 89 KB |
| `talreja-talreja-google-ads-hero.webp` | `talreja-talreja-google-ads-feature.png` | `bcab66389038` | 1672x941, 97 KB |
| `talreja-talreja-google-ads-hero-wide.webp` | `talreja-talreja-google-ads-hero-wide.png` | `6f5b58fa57a1` | 1672x643, 73 KB |
| `talreja-talreja-google-ads-dashboard.webp` | `talreja-talreja-google-ads-dashboard.png` | `39fc7f8ff7dc` | 1586x992, 58 KB |

### Artwork discrepancies against the document (not edited)

| Asset | Finding | Action needed |
|---|---|---|
| `talreja-talreja-google-ads-dashboard` | The tile labelled **Lifetime Value ₹30,000** is, per the document, the average first contracted fee revenue per engagement ("recurring fees or lifetime value are not included"). No ROAS, qualified-consultation or date range is shown | **REPLACE**: tile must read "Average first contracted fee revenue per engagement" (page text is correct; alt text describes what the image shows) |
| `advit-prints-meta-ads`, `meticulous-business-plan-google-ads`, `bblewrap-google-ads`, `talreja-talreja-google-ads` dashboards | Date selector reads "Date range not supplied"; the document gives Feb to Aug 2024, Apr to Sep 2026, Sep 2024 to Mar 2025, Mar to Sep 2022. The periods are carried by the page chips and copy | Optional artwork revision |
| `meticulous`, `bblewrap`, `talreja` dashboards | Tiles read "New customers" / "Advertising cost per new customer" for signed engagements or projects; Talreja shows "INR" where the document says "INR equivalent" | Optional relabel |
| `meticulous`, `bakedemy-google`, `bblewrap`, `talreja` dashboards | "Search + Display" selector. The document does not state campaign types for these clients (only EKoching and Phoenix were owner-confirmed). Owner confirmed Search + Display for these four on 31 October 2026 (label stays) | CLOSED |
| `meticulous-business-plan` dashboard | Title repeats the client name ("Meticulous Business Plan Meticulous Business Plan Google Ads Performance Overview") | Cosmetic |
| `libros-library` hero | Shows ₹4,800 lifetime value beside the result as a separate tile: consistent with the document | none |
| All heroes and cards | Every figure and label on the 8 cards, 8 heroes and 8 dashboards was compared with the document: all match except the rows above | none |

Hero derivative notes: AnybodyCanBake SEO, Meticulous, Libros, Bakedemy x2, Bblewrap and Talreja keep the supplied text blocks scaled to about 58 to 72 percent top left; faint ghosts of painted-out text are barely visible in Bakedemy Meta and Libros. Advit's and Bblewrap's lower left is photography (printed fabric; a laptop corner), so the outlined name sits over it. The Advit name is lowest contrast.

### Third delivery, 31 October 2026 (late): logos, dashboard corrections, Advit name

**Logos (owner-approved, supplied as `21.png`, `22.jpg`, `23.jpg`; originals untouched, never copied into the repository):**

| Supplied (visible content) | Client | SHA-256 (first 12) | Repository copy | Treatment |
|---|---|---|---|---|
| `mbp` + "lans" wordmark, navy and teal, registered mark (1599 x 1016 PNG) | **Meticulous Business Plan** (register key `mbp`, "MBP", which already held a 99 x 57 copy of this same mark) | `61ea739fbf32` | `public/images/clients/mbp.webp` 800 x 456 (replaces the 99 x 57 copy; previous copy kept at `source-originals/logos/mbp.previous-99x57.webp`) | white ground removed (border flood fill, enclosed whites such as the (R) kept), margin cropped, lossless WebP; register name now "Meticulous Business Plan" |
| T&T roundel, "TALREJA & TALREJA LLC / Chartered Accountants & Business Advisors" (1499 x 277 JPEG) | **Talreja & Talreja** | `da78dfc965d1` | `…/talreja-talreja.webp` 800 x 130 | same recipe |
| white "bblewrap" mark on black (2000 x 1050 JPEG) | **Bblewrap** | `4328d2497fa1` | `…/bblewrap.webp` 800 x 219 | the black ground is the logo's own, kept (as EKoching, Hut N Homes), margin cropped, 2 px radius like the other ground marks |

Tool: `tools/prepare-logos.cjs`. Nothing redrawn, recoloured or stretched; sizes by the existing fit classes (`wide`, `mid`). Supplying Talreja & Talreja's logo approves the asset only: no website link, no legal-entity claim. **Note:** the supplied Talreja logo itself reads "Chartered Accountants & Business Advisors"; it is shown as supplied (it is the approved asset), while the case copy stays service neutral and makes no accountancy claim.

**Dashboard corrections (edited with `tools/edit-dashboards.cjs`; supplied PNGs untouched; pre-edit web copies in `source-originals/dashboards/*.before-edit.webp`; edited PNGs and before/after in `edits/`):** date selector set to the period of the final DOCX on `advit-prints-meta-ads` (February 2024 to August 2024), `meticulous-business-plan-google-ads` (April 2026 to September 2026), `bblewrap-google-ads` (September 2024 to March 2025) and `talreja-talreja-google-ads` (March 2022 to September 2022); selector boxes widened to the left where the longer text needed it. Talreja: tile "Lifetime Value" now "Average first contracted fee revenue per engagement" (two lines; the ₹30,000 untouched) and the currency selector "INR" now "INR equivalent" (widened to the right, chevron kept). Everything else in the images is the supplied pixels. The text is set in Helvetica Neue because the original font is not available: look closely at the four edited controls in review. A replacement from the artwork's author remains the cleaner option if preferred.

**Advit Prints stage:** the outlined name uses the existing deeper rust stroke (`rgba(143, 44, 0, .6)`, as the insurance and home stages); the supplied hero is unchanged. Screenshots: `screenshots/batch3/advit-name-after-1440*.png` against `screenshots/batch2/advit-name-readability-1440*.png`.

### Fourth delivery, 31 October 2026 (owner-confirmed SEO periods)

`anybodycanbake-seo-dashboard`: the labels "Earlier 90 days" / "Later 90 days" (three bar cards, the table headers) now read **May 2026 to July 2026** and **August 2026 to October 2026**; the selector "Earlier 90 days vs Later 90 days" reads **May to Jul vs Aug to Oct 2026** (short month names so it fits its box). Edited with `tools/edit-seo-dashboard.cjs` (Helvetica Neue at the measured cap height and colour); every figure, bar and other pixel is the supplied one; supplied PNG untouched; pre-edit copy `source-originals/dashboards/anybodycanbake-seo-dashboard.before-edit.webp`; edited PNG `edits/anybodycanbake-seo-dashboard.edited.png`. The SEO dashboard is therefore no longer a verbatim supplied file; a replacement from the artwork's author remains the cleaner option. The SEO row of the earlier discrepancy list ("no dates supplied") is closed.
