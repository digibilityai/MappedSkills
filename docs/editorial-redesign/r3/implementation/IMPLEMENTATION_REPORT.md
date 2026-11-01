# Editorial R3: local implementation report (31 October 2026)

**Status: LOCAL only** on `feat/paid-case-studies-six-local`. Nothing committed, pushed, merged, deployed or published; no Contentful write. Decision record: `DEC-109`. Preview: `http://localhost:3500` (left running).

## Preview links (port 3500)
- Blog: `/blog`, `/blog/seo-company-in-pune`, `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` (and the five other articles)
- Press: `/press`, `/press/marketing-measurement-gap-indian-websites`
- Research: `/research`, `/research/marketing-measurement-gap-indian-business-websites`, `/research/industry-benchmarks`

## Screenshots (production build, preview switches off)
`screenshots/` holds full-page captures of eight pages at 1440, 820, 390 and 360 px. `detail/` holds readable crops: report reading column and chart (desktop, mobile), release evidence band and body, article reading (desktop) and contents control (mobile), research findings.

## What changed
- New: `components/editorial/` (`editorial.css`, `EdClose`, `OnThisPage`, `EdCover`), `lib/blog-related.ts`, `lib/headline-emphasis.ts`.
- Rewritten bodies: blog listing and article, press listing and release, research hub and report, research category.
- Data layer: card images, dates and update dates added to the blog and press card mappers; related articles reuse the blog list (no new query).
- Removed: `components/cplus/blog/blog.css` (unused).
- Unchanged: all route metadata, canonicals, robots, JSON-LD, data fetching, Contentful content, `/work`, case studies, homepage.

## Results
| Check | Result |
|---|---|
| Tests (`node --test tests/*.test.cjs`) | **PASS**: 585 run, 584 pass, 0 fail, 1 existing skip. 23 tests tied to the old markup were rewritten; `tests/editorial-r3.test.cjs` added (11 tests: related rule, "Two more guides" only for exactly two, headline text identity, dynamic authors and dates, `pd-h-ev` alias, report anchors, route and query parity, whole images, no internal notes) |
| `tsc --noEmit`, eslint on changed code | **PASS** (0 errors, 0 warnings) |
| Fresh production build, preview switches off (`CASE_STUDY_LOCAL_PREVIEW`, `CONTENTFUL_CASE_STUDY_NEW_FIELDS` removed), isolated copy | **PASS**: 45 static pages |
| 14 routes x 1440, 820, 390, 360 px (production build): overflow, one h1, broken images, image distortion, dead anchors, console errors, hydration warnings | **PASS**, 0 findings. Only note: 11 px uppercase kicker labels (the approved label style) |
| Keyboard: Tab reaches every control in main with a visible 3 px focus ring; mobile contents control opens with Enter, closes with Space, jumps to the section | **PASS** (blog, release, report; 390 px) |
| Reduced motion: transitions resolve to about 0 s | **PASS** |
| Metadata, canonical, robots, Open Graph, Twitter, JSON-LD vs a HEAD build, 14 routes | **PASS**, identical |
| Text parity vs HEAD | **PASS with approved changes**: only labels (breadcrumb separators, "In this article", "More on this topic", meta lines), the press-release row restating the 97.5% statistic ("Campaign tracking") and the decorative opening quote mark differ |
| Real-device and screen-reader checks | **BLOCKED**: not run (no device or assistive technology available here) |

## Notes and deviations
- The sentence "The study examined 30 websites each from…" in the release ledger is kept (adds sample information); only a row restating a displayed percentage is dropped.
- The report hero emphasises the part after the colon; the hub card does the same.
- A very long release headline (over 130 characters) is set one step smaller (24 px minimum).
- Articles without an image show the typographic cover; two share an image (R3-4, needs owner assets). No assets generated.
- The caption baked into the AnybodyCanBake artwork is out of scope.

## Unresolved
- R3-4 imagery; manual screen-reader and device checks; release remains gated (no commit, push or deployment authorised).
