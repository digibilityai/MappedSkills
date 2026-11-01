# Editorial direction R3: /blog, /press, press release and /research (31 October 2026)

**STATUS (31 October 2026): APPROVED by the owner for LOCAL implementation and IMPLEMENTED locally; revised by DEC-112 (natural-height batch) on `feat/paid-case-studies-six-local` (see `docs/editorial-redesign/r3/implementation/IMPLEMENTATION_REPORT.md` and `DEC-109`). Not committed, pushed, deployed or published.** The text below is the proposal as approved.

**(Original status: PROPOSAL FOR APPROVAL. No application code changed.)** Replaces the rejected R2 visual direction (`EDITORIAL_AND_WORK_PROPOSAL.md` sections 3 to 10 for these collections). `/work` R2 and the case-study implementation are unchanged; the reusable case-showcase component remains a separate pending task. Review material: `PROPOSAL_EDITORIAL_R3.pdf` (54 sheets, rendered and inspected page by page), `r3/key-screens/`, source `r3/build-r3.cjs`, `r3/ed3.css`.

## 1. Brand-alignment comparison (VERIFIED against the port-3500 pages and Brand DNA v3)

Measured on `/faq`, `/how-it-works`, `/about`, the home page and the case-study template: opening hero background #0F0D14 with 72 px above and 86 px below; headline Bricolage Grotesque 800 at 68.8 px, line height 1.04, tracking -0.035em, white with the second clause #FF5B04; kicker Manrope 11.5 px, weight 750, uppercase, tracking .15em; lede 20 px / 32 px; primary button a 999 px pill, #A83400, white 16 px / 800, 12 px 26 px; outlined 11 px uppercase pill chips; a dark "reported figure" panel with a 3 px orange top rule; "01 —" chapter labels; one burnt (#A83400) closing band.

| Principle (approved pages, Brand DNA v3) | R2 proposal | R3 |
|---|---|---|
| Dark-to-light narrative pacing | Flat paper throughout | Deep-ink opening, paper collection, dark evidence where there is evidence, burnt close |
| Bold two-tone editorial headline | Small, pale headings | Same size, tracking and two-tone rule on every opening |
| A grounded graphic with every opening ("bold editorial headline, supporting line, clear CTA, grounded graphic") | None; text directories | The opening visual is real content: featured article image, release graphic, the 120-square research chart |
| Proof precise, attributed, caveated | Thin tables | Dark figure panels and evidence bands, each figure with its sample and source |
| Numbered chapters, kicker, pill chips | Generic hairlines | Reused as built |
| One call-to-action language | Bright tangerine band, square buttons | Burnt pill, text link with arrow, burnt band |
| Restraint and honest imagery | Restrained, but empty | Existing assets only; no invented photography; typographic cover tile where an image is missing |

## 2. Approved components and treatments reused
Header and footer; deep-ink hero; kicker; two-tone headline and section heading; outlined chips; the dark "reported figure" panel and the case-study outcomes-board language (evidence bands); the "01 —" chapter label; paper card with hairline, image first, one stretched link, tangerine underline on hover and a 3 px focus outline (home cards, /work R2); the burnt pill, text link and burnt closing band; the numbered three-up of How it works; the collapsed "On this page" control (previous pass, owner-required).

## 3. How each collection feels distinct and still belongs
| | Feel | Signature | Visual |
|---|---|---|---|
| Blog | A reader's library: practical, image-led | One featured read, then an even three-column collection with topic and reading time | Existing article images whole in a 2:1 frame; typographic cover where none |
| Press | A newsroom: credible, dated, quotable | Latest announcement first; compact background records; dateline; facts and contacts in separate material | The release graphic only |
| Research | A lab notebook: evidence-led | Dark evidence bands with sample and source on every figure; the charts kept | The 120-square chart and the published bar charts |

## 4. Page structures
- **Blog listing:** dark hero (headline, lede) with the featured read as its visual (image, topic, reading time, title, summary, button) → "01 — The collection": six image-led cards → burnt close.
- **Article:** dark hero (type, reading time and "Updated October 20, 2026" chips; headline with its last clause in orange; "By Amit Gupta") → article image, 700 px body with the "On this page" rail → separated Related service and Share cards → "Keep reading" (two cards) → close.
- **Press listing:** dark hero with the latest announcement card (release graphic, date, title, summary, one button) and the media contact → "01 — Background": compact records (research report with its date, About MappedSkills) beside the boilerplate → close. With one release the lead is not repeated as a row; later releases would be compact dated records under it.
- **Press release:** dark hero (chips for type, date and research ID; the recorded title with "42.5% of 120 Indian Business Websites Audited" in orange; summary; Media enquiries and About the research; the release graphic) → the release in a 700 px column → dark "Key findings" evidence band (three figures with sample and source, the other findings, the not-an-estimate caveat) → why it matters and the founder's note → separated cards: About the research, About MappedSkills, Media enquiries → close.
- **Research hub:** dark hero with the headline-finding panel (42.5%, the chart, the statement and its sample and source) → paper band for the latest report (facts, three links, "What this means for you" and "What it doesn't mean") → dark "What else we found" band → "What we checked. What we can't claim." as 01, 02, 03 → close.
- **Research report:** dark hero (report name in orange; facts panel with jump links to the real sections) → dark "What the research found." cards with sample, source and a link to each finding → body with rail: executive summary, every finding with its charts, method, limits → citation → For journalists → close.
- **Mobile:** every hero stacks (text first, visual second); grids become one column; the contents control is collapsed by default; no hover-only information.
- **Motion:** none except 150 ms colour and underline changes, off under reduced motion; no autoplay, parallax, counters or sticky parts.

## 5. Preserved
URLs (`/blog`, `/blog/[slug]`, `/press`, `/press/[slug]`, `/research`, `/research/[slug]`, `/research/industry-benchmarks`); titles, descriptions, canonicals, robots and structured data; all article, release and report text, charts and the release graphic; recorded dates (release October 23, 2026; report October 5, 2026; "Updated October 20, 2026" on the seven articles); authorship (no author added; the press release stays without a byline). Anchors kept: `the-release`, `key-findings`, `why-this-matters-for-businesses`, `a-note-from-the-founder`, `about-the-research`, `about-mappedskills`, `media-enquiries`, the blog heading ids, `rr-h-more`, `rr-h-sum`, `body-1` to `body-10`, `rr-h-method`, `rr-h-limits`, `rr-h-cite`; **`pd-h-ev` is kept as an alias** on the evidence band. The orange emphasis in headlines styles part of the recorded title; the heading text is not changed. No imagery implies a client event or endorsement; the blog images are the articles' own featured images, shown whole.

## 6. Exact implementation scope (after approval; nothing built)
| Area | Files |
|---|---|
| Shared (new) | `components/editorial/`: `EdHero` (dark, two-tone), `EdVisualCard` (featured read and latest announcement), `EdCard` (image-first), `EdRecords`, `EdEvidenceBand`, `EdFigurePanel`, `EdChapter`, `OnThisPage`, `EdCover` (typographic tile), `editorial.css` (`ed-`, tokens from `components/b2/b2.css`); reuse `ActionLink`, the approved burnt band and closing pattern, `CplusPage`, `Breadcrumb`, `BreadcrumbJsonLd` |
| Blog | `components/cplus/blog/{BlogBody.tsx,content.ts,blog.css}`; `components/cplus/blog-article/{ArticleBody.tsx,ArticleRichText.tsx,ArticleShare.tsx,article.css}` (featured image from the existing `featuredImageUrl`; `images.ctfassets.net` is already an allowed host) |
| Press | `components/cplus/press/*`; `components/cplus/press-release/{PressReleaseBody.tsx,ReleaseRichText.tsx,release.css}` (adds the `pd-h-ev` alias) |
| Research | `components/cplus/research/*`; `components/cplus/research-report/*`; `/research/industry-benchmarks` keeps its route and adopts the shared row |
| Not touched | page files' metadata, canonicals, robots, JSON-LD and getters; `/work` R2; case-study template and data; `lib/contentful/**`; Contentful content; the showcase component |
| Tests | metadata and JSON-LD unchanged for every route; every live anchor present, including `pd-h-ev`; headings text identical to the recorded titles; one H1; contents control closed by default under 1081 px and keyboard operable; no overflow and no console errors at 1440, 820, 390 and 360 px; reduced motion; text parity with the recorded content; fresh production build with preview switches off |

## 7. Remaining decisions, with recommendations
See `DECISIONS_REGISTER_R3.md` and the last two sheets of the PDF. Recommended: R3-1 adopt the direction; R3-2 feature "7 Proven Strategies of Digital Marketing for Real Estate Developers"; R3-3 existing images whole plus typographic cover tile; R3-5 latest announcement as the lead with compact background records; R3-6 the release structure with the `pd-h-ev` alias; R3-7 align research; R3-8 orange clause in headlines; R3-9 burnt band; R3-10 the new small copy. Genuine blockers: R3-4 (distinct on-brand blog images for three articles; layout is not blocked) and B-3 (a card-artwork caption on `/work`).
