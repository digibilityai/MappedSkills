# /press, /blog, /research and /work: audit and coordinated design proposal

**Status: PROPOSAL for owner approval. No application code has changed for this part.** Baseline: the port-3500 worktree (`feat/paid-case-studies-six-local`, 20-case library), not `origin/main`. Visual review: `REVIEW.html` (today versus proposed, 1440 and 390 px, real header and footer). Full-length mockups: `mockup/shots/`. Today's screenshots: `audit/current/`. Measurements: `audit/data/current.json`. Mockup source: `mockup/` (`build.cjs`, `ed.css`; content read from the live pages in `mockup/data/`).

Evidence labels: **VERIFIED FACT** (inspected on port 3500, 2026-10-31), **OWNER REQUIREMENT**, **APPROVED DECISION** (decision log), **WORKING HYPOTHESIS**, **UNKNOWN**.

Inputs read: Brand DNA v3 (24 October 2026: plain, evidence-led, precise and caveated proof tone; motion purposeful, subtle and reduced-motion safe; existing visual identity preserved), the decision log (DEC-076 press, DEC-066 to DEC-068 blog, DEC-089/090 /work, DEC-102 to DEC-106 case studies), and the earlier G2 reports for press, blog and research.

## 1. What each collection is for

| Collection | Purpose | Visitor | Journey (3 steps) |
|---|---|---|---|
| **Press** (news) | A dated, citable record of what MappedSkills announces | Journalists; anyone checking a claim | Find the latest release, quote it, contact us |
| **Blog** (articles) | Plain guidance for a decision | Owners deciding what to do next | Choose a topic, read, take one next step |
| **Research** (evidence) | Original findings with their method and limits | Readers verifying a claim; journalists | See the finding, check how it was found, cite it |
| **Work** (case studies) | The full proof library | Prospects judging fit | Find a relevant case by service, industry or a word, read it |

## 2. Audit: today

**VERIFIED FACT, measured at 1440 / 390 / 360.** Pages are all in the C+ shell with a tangerine close, so the family already looks related. The problems are repetition, uneven structure and, on /work, density.

| Finding | Evidence |
|---|---|
| **The same findings are repeated up to six times.** | "42.5%" appears 6 times and "97.5%" 5 times on the press release; 4 and 7 times on the research report; 2 and 2 on the research hub, which also repeats the report's five findings. |
| **Contact details repeat.** | The media email appears 4 times on /press and 3 on /research (hero, button, close, strip). |
| **Pages are long for what they say.** | Research report 17,611 px at 1440 and 23,357 px at 390 (2,716 words); press release 6,729 / 8,648 px; research hub 5,448 / 7,042 px. |
| **Hub sections repeat each other.** | /research: headline finding, "What else we found", the report card (again with its dek), "What we checked", "For journalists", close. /press: hero contact, latest news, "Useful for your story" tiles, close with the email again. |
| **Three listing grammars.** | Press = date column and arrow; blog = topic and reading time with an arrow; research = a dark data stage and a findings list; none shares a metadata line, so a reader cannot compare "what kind of thing is this". |
| **Detail pages differ without reason.** | Reading measure 736 px (blog), 778 px (press), wider blocks on research; three different "contents" treatments; related content is either absent (blog), a single card (press) or a link row (research). |
| **Blog has no imagery rule.** | 5 of 7 articles carry a Contentful featured image, used only for sharing: generic stock photography and graphics, 600 px previews, two articles share one image, two fall back to the site icon. They are not shown on the listing or article, correctly. |
| **No controls to remove.** | /blog, /press and /research have no pagination, category or search surface (7 articles in 6 topics; 1 release; 1 report). Nothing is broken; the risk is adding controls that have nothing to filter. |
| **Thin category page.** | `/research/industry-benchmarks` is 57 words: a heading and one link. |
| **/work is the densest page.** | Hero 671 px (16 client logos plus a "same route" panel), then a "start here" block of two differently sized cards (951 px), then the library; on mobile the hero is 1,090 px and the search and filters start 2,553 px down; 12 cards on page 1 are laid out as 2 featured plus 10 in a grid. Library cards are 498 to 614 px tall at 1440 and 454 to 493 px at 390 (uneven). |
| **/work repeats the service and client.** | Each card shows the service in the image label, in the eyebrow and again in the link ("Read the Meta Ads case study"), and the client name in the title and often inside the artwork. |
| **/work controls.** | Search, an industry select, four service chips (with counts) and a "Clear filters" link: five control types in two rows; a result count is only implied ("Showing matching case studies"). |
| **Small type.** | Card labels and meta are 11.84 px (below the 12 px floor used elsewhere). |
| **Artwork carries captions.** | One supplied card (AnybodyCanBake Meta Ads) still prints a small "illustrative" caption inside the image. Artwork is out of scope here; flagged. |

What already works and is kept: the shared header, footer, tangerine close, breadcrumb, typography (Bricolage Grotesque, Manrope) and tokens; published dates, URLs and metadata.

## 3. Proposal: one editorial grammar, three deliberate differences

### 3.1 Shared components (new, `ed-` prefix)

| Component | Used by | Rule |
|---|---|---|
| **Hero** | all four | Breadcrumb, type tag (Newsroom, Blog, Research, Case studies), H1 (existing wording), lede, and one "at a glance" aside with 3 facts at most. |
| **Row** | press, blog, research category | Meta column (date or topic, reading time), title, excerpt, arrow; 3 px ink rule above the list; hover and focus change background and underline, 150 ms. |
| **Meta strip** | all detail pages | Published, updated, author, reading time or research ID, only where the CMS has the value (nothing is invented). |
| **Detail frame** | all detail pages | Contents rail (static, not sticky) at left on desktop, collapsed "In this article" at the top on mobile; one 700 px reading column (about 68 characters at 18 px, 1.7 line height). |
| **Figures** | press, research | A figure is stated once, with its sample and source; later mentions link to it. |
| **Related** | detail pages | Up to 3 links, across collections (a release links its report; a report links its release). |
| **Close** | all | The existing tangerine close, unchanged. |

### 3.2 Deliberate differences

| | Press | Blog | Research |
|---|---|---|---|
| Voice | The record: dated, dateline, quotable | Guidance in plain words | Evidence: finding, method, limit |
| Signature | Dateline ("PUNE, INDIA —"), release facts, media contact | Topic and reading time, byline | Figure board, one dark data stage, methodology and "how to cite" |
| Imagery | One release graphic where one exists | None on the listing; featured images stay sharing-only | Data graphics only (the 120-square chart), no photography |
| Listing | Dated rows, newest first | Topic rows, CMS order | Latest-report stage, then "what else we found" strip |
| Detail focus | Release, key figures once, founder quote, boilerplate | Reading column, contents, byline, keep-reading | Key findings index once, executive summary, findings, limits, citation |

### 3.3 Per collection

**Press.** Listing order: hero (contact in the aside, so the email appears twice in total, not four times) → "Press releases" rows (date, title, excerpt, the release graphic) → "Background for your story" as two text rows (replaces the tiles) → close. Detail: hero with release graphic → release text with the dateline → the three headline figures once (sample and source beneath) → "Other findings" as a definition list (the numbers not already shown) → why it matters → founder quote → about the research with one link → boilerplate and contact → related. Removes the separate "evidence in brief" repeat and the key-findings table.

**Blog.** Listing: hero with a small "in the blog" aside (7 articles, 6 topics, 3 to 13 minutes) → rows. **No filters or pagination at 7 articles;** they appear only when the blog has more than 12 articles and two topics with at least two each (the /work rule), with the same 12-per-page convention and `?topic=` and `?p=` URLs added only then. Article: meta strip (topic, reading time, byline and update date when present), contents rail, 700 px column, byline block with share, keep-reading (2 other articles), close. Article text, headings, links and images are untouched.

**Research.** Hub: hero → one dark stage (report title, dek, the facts table, the 42.5% headline figure with the 120-square chart, buttons to report, method and limits) → "What else we found" as one strip → "What we checked. What we can't claim." → close; the report is shown once, the five findings once, and the "For journalists" strip becomes one line linking the newsroom. Report: hero with facts and jump links → **Key findings as an index** (figure, one-line statement, sample, link to its finding) → executive summary → contents rail → findings, method, limits → "How to reference this report" with copy buttons → related. The index replaces the repeated "what the research found" blocks, so each figure is stated once with its full wording in its own finding.
`/research/industry-benchmarks` uses the shared row so a category with one report reads as a short list, not an empty page.

**Work (library).** OWNER REQUIREMENT (scope update, 31 October 2026). Hero: tag, H1 "Real work. Judge it for yourself.", the existing lede. **No logo strip, no "same route" panel, no separate "start here" block.** One control bar: Search, Service ▾, Industry ▾, then "Clear filters" when active; a visible count line ("20 case studies", "Showing 1–12", "2 of 20 match SEO"). Cards: image, then eyebrow (service · industry, once), client name (title), a two-line summary, "Read case study →". The approved result is in the card artwork; no figure is typed into card text. Grid: 3 columns at 1440, 2 on tablet, 1 on mobile; 12 per page with Previous, page numbers, Next. Page 1 shows all 12 cards in one grid (today 2 featured plus 10), so Om Sai Developer and ClassPe keep positions 1 and 2. Empty search: a plain message, a "Show all 20 case studies" button, the controls still visible.

| /work measure | Today (1440 / 390 / 360) | Proposed |
|---|---|---|
| Hero plus controls | 671 px (hero only) / 1,090 / 1,092 | about 560 / 590 / 590 |
| Search and filters start at | 1,984 px / 2,553 / 2,508 | about 465 / 395 / 395 (including the site header) |
| First case image starts at | 985 px (a featured image) / 1,351 / 1,353 | about 670 / 690 / 690 |
| Card height | 498 to 614 / 454 to 493 / 430 to 469 | 402 / 363 / 344 (uniform) |
| Page 1 length | 6,258 / 9,718 / 9,513 | 3,774 / 7,542 / about 7,400 (mockup) |
| Control types | 5 | 3 |

## 4. Typography, images, reading and motion

- **Type:** Bricolage Grotesque 800 for headings (H1 clamp 2.4 to 4.5 rem; long release or report titles 1.9 to 3.1 rem), Manrope for text; body 18 px on 1.7 in articles, 16 px elsewhere; labels at least 12 px, meta at least 14 px (today 11.84 px labels).
- **Images:** no new photography. Press: the existing release graphic. Blog: none on listing or article (sharing images unchanged). Research: the data chart, code-drawn and bound to the finding. /work: the supplied card artwork as is, cropped from the right so baked text stays visible, same ratio on every card.
- **Reading width:** one 700 px column (about 68 characters) on every detail page; wider blocks only for figures and tables.
- **Metadata:** shown only when the CMS has it (published, updated, author, reading time, research ID). The mockups show only values read from today's pages.
- **Motion (Brand DNA v3):** purposeful and restrained: row hover and focus (150 ms), a 350 ms fade-and-rise when a section first appears, card image scale to 1.02 on hover. All off under reduced motion; no autoplay, no parallax, nothing sticky; every page reads the same with motion off.
- **Accessibility:** one H1, ordered headings, visible 3 px tangerine focus, 44 px touch targets, a live result count on /work, tables and figures with text equivalents, 4.5:1 contrast (tang-small #A83400 for small orange text).

## 5. Preserved unless a change is approved

URLs and slugs (`/press`, `/press/[slug]`, `/blog`, `/blog/[slug]`, `/research`, `/research/[slug]`, `/research/industry-benchmarks`, `/work`, `/work/page/[n]`, `/work/index.json`); article, release and report text; publication and update dates; authorship (no author is added: bylines show only when the data has one); titles, descriptions, canonicals, robots, Open Graph; structured data (Organization, NewsArticle, Article, Report, BreadcrumbList) and indexing; every listed case, its route, approved figures, classification, order, search behaviour and filter URLs (`?service=`, `?industry=`, `q`, `p`); Home Decor unlisted; the client logo wall on the homepage and elsewhere (removed from /work only).

## 6. Implementation scope (after approval)

| Area | Files |
|---|---|
| Shared | new `components/editorial/` (`EdHero`, `EdRow`, `EdMeta`, `EdFrame`, `EdFigures`, `EdRelated`) and `editorial.css`; existing `CplusPage`, `Breadcrumb`, `BreadcrumbJsonLd`, `Close` reused unchanged |
| Press | `components/cplus/press/{PressBody.tsx,content.ts,press.css}`; `components/cplus/press-release/{PressReleaseBody.tsx,ReleaseRichText.tsx,release.css}` |
| Blog | `components/cplus/blog/{BlogBody.tsx,content.ts,blog.css}`; `components/cplus/blog-article/{ArticleBody.tsx,ArticleRichText.tsx,ArticleShare.tsx,article.css}` |
| Research | `components/cplus/research/{ResearchBody.tsx,content.ts,research.css,sample.ts}`; `components/cplus/research-report/{ReportBody.tsx,ReportCopy.tsx,ReportRichText.tsx,report.css}`; category rows for `/research/industry-benchmarks` |
| Work | `components/b2/{Work.tsx,WorkLibrary.tsx,work.css,work-cards.ts}`; `components/resolve/WorkCard.tsx`; `components/cplus/work/{content.ts,studies.ts,load.ts}`; logo strip removed from `/work` only |
| Page files | `app/(pages)/{press,blog,research,work}/**/page.tsx`: metadata, structured data and getters unchanged (verified by test) |
| Tests | update `press-page`, `press-release`, blog and research tests, `work-page`, `client-logos` (logo wall off /work); new tests for the shared components, the single-statement rule for figures, filter URLs, reduced motion, and "metadata and JSON-LD unchanged" snapshots |
| Not touched | Contentful content, `/work` case-study detail template, the reusable case-showcase component (separate, pending), any service page |

## 7. Decisions and blockers

| # | Decision (recommended first) |
|---|---|
| ED-1 | Approve the shared grammar (hero, row, meta strip, detail frame, related) and the three deliberate differences. |
| ED-2 | Press: replace the "Useful for your story" tiles with two text rows and show the release graphic on the listing row. |
| ED-3 | Blog: no filters or pagination until more than 12 articles; keep featured images sharing-only. (The existing BL-D4 "no date on rows" stands.) |
| ED-4 | Research: show each finding once (index plus its own section); drop the second summary blocks on the hub and the report. |
| ED-5 | /work: remove the logo strip, the "same route" panel and the "start here" block (this reverses part of DEC-089), and use one uniform 12-card grid. |
| ED-6 | /work controls: Service and Industry as selects (counts kept inside the options) instead of chips. |
| ED-7 | /work cards: one eyebrow, client, two-line summary, "Read case study"; the approved result stays in the artwork. |
| ED-8 | Detail pages: contents rail static at left (collapsed on mobile), 700 px column, up to 3 related links. |
| **Blocker B-1** | **UNKNOWN:** which blog articles carry an author in Contentful. Only the sampled article shows "By Amit Gupta"; no byline will be shown unless the post has one. |
| **Blocker B-2** | **UNKNOWN:** whether the "Updated" date exists for every article; shown only when present. |
| B-3 | Card artwork with a printed caption (AnybodyCanBake Meta Ads) is a separate asset decision. |
| B-4 | `/research/industry-benchmarks` purpose: category page or merged into the hub? Proposal keeps the URL. |
| B-5 | The reusable case-showcase component and its light/dark variant remain pending and are not used here. |

## 8. Honest limits

Mockups are static HTML injected into the live pages with real text, not built components. The three representative detail pages are now full length with every real paragraph, list, chart and heading (`PROPOSAL_MOCKUPS.pdf`, 24 sheets; PNGs in `mockup/shots/`). Because the report text itself is long, removing repetition shortens it only modestly: the research report is 15,229 px at 1440 against 17,611 px today (22,919 against 23,357 px at 390); the press release 5,205 against 6,729 px (8,070 against 8,648 px); the article 6,154 against 6,149 px (it has no repetition to remove). The numbers in section 3.3 for /work are measured on the mockup; the others are stated as today's measurements only.

## 9. /work revision 2 (31 October 2026): supersedes the /work design in sections 3.3 and 7 (ED-5 to ED-7)

The owner rejected the first /work proposal as still cluttered. Revision 2 (`PROPOSAL_WORK_R2.pdf`, `mockup/work-r2.cjs`, `mockup/work-r2.css`, shots `mockup/shots/work-r2-*`) changes only /work; the press, blog and research proposals are unchanged.

| Item | Revision 2 |
|---|---|
| Columns | 2 on desktop (608 px cards at 1440), 1 on mobile; the rule for tablet is 2 columns above 721 px, 1 below |
| Per page | 12 cases, current order, routes, search and filter URLs unchanged |
| Card image | the dedicated card image shown whole at 8:5; no overlay, badge, border or extra crop (Om Sai's 1080 x 688 photo is 2% shorter than 8:5, so it loses 2% at top and bottom; no figure is in it) |
| Under the image | client name (the link), service in orange, one summary sentence; no industry eyebrow, no "Read case study" |
| Link | one link per card, on the client name, stretched over the image; hover: tangerine underline and 1.5% image zoom; focus: 3 px tangerine outline; reduced motion removes the zoom |
| Spacing and decoration | 88 px between rows (48 px on mobile); no card frame, section rule, logo strip, route panel or featured block; borders only under the three controls |
| Top | breadcrumb, H1, one-line introduction, Search / Service / Industry, result count ("20 case studies", "Showing 1–12", "2 of 20 case studies match") |
| Pagination | text links: Previous, 1, 2, Next; current page underlined |

Measured on the mockup (excluding nothing; real header included): first card starts at 504 px (1440) and 567 px (390); desktop card 608 x 519 px (image 380); page 1 is 5,334 px at 1440 (today 6,258) and 7,477 px at 390 (today 9,718; first proposal 7,542). The two-column layout is longer than the first proposal on desktop (3,774 px) by design: more space, fewer words per row.

Decisions: (1) summary, not a typed figure, under the image, because the approved result is already in the artwork; (2) ClassPe and InsurYo have no service line (not catalogue services, DEC-005/DEC-106); (3) the card service label ("Meta Ads") and the filter label ("Social media ads") differ today and stay as they are. Still pending: the AnybodyCanBake Meta Ads artwork prints a small "illustrative" caption.


## 10. Correction pass (31 October 2026): supersedes sections 3 to 8 where they differ

Review material: **`PROPOSAL_MOCKUPS_R2.pdf`** (48 sheets: desktop full-width slices, mobile as consecutive 390 px screens three to a sheet, labelled continuations, then the contents-control comparison and the decision tables), key screenshots in `key-screens/`, source in `mockup/` (`build.cjs`, `ed.css`, `review-pdf.cjs`). The PDF was rendered page by page with pdf.js and inspected (cover, listings, report template, mobile sheets, contents control, decision tables); two defects found that way (a squeezed findings index on desktop and a wrong finding link) were fixed before this version. `/work` is unchanged (R2). The case-showcase component is not used.

### 10.1 Corrections

| # | Required correction | Done |
|---|---|---|
| 1 | Remove internal notes from public mockups | Removed "Order as published by the CMS", the filter and pagination explanation, "Releases are listed in date order…", "Each figure appears once…" and "The rest of the article is unchanged…". These rules stay in this document only (ED-3, ED-4). |
| 2 | Mobile research navigation | One collapsed "On this page" control (a native `details` element: Enter or Space opens it, no script, 52 px closed height, 44 px link targets), "15 sections" and a +/− mark; closed and open states are shown. The same control is used on the press and blog templates. Desktop keeps a static (not sticky) contents rail headed "On this page". |
| 3 | Research links | "The full report", "Methodology" and "Limitations" were plain-text eyebrow labels above headings that already say the same thing ("Executive summary", "How the audit was done.", "What this study can't tell you."). They are removed. The report's jump links (Key findings, Methodology, Limitations, Cite this report) now point at the real sections, and the hub's buttons go to the report and to its method and limits sections. The "Open the chart image" links inside the charts are unchanged. |
| 4 | Readable review material | New sheeted PDF (above); desktop and mobile for each listing and each complete template. |
| 5 | Preserve content and SEO | Mockups use only recorded data: the byline "By Amit Gupta" and "Updated October 20, 2026" (the blog byline no longer carries a "Founder" title the live article does not show), research author and dates, release date and ID. Existing section anchors are kept (`rr-h-more`, `rr-h-sum`, `body-1` to `body-10`, `rr-h-method`, `rr-h-limits`, `rr-h-cite`; `key-findings`, `why-this-matters-for-businesses`, `a-note-from-the-founder`, `about-the-research`, `about-mappedskills`, `media-enquiries`; the blog's heading ids). Two press anchors change by merge: `pd-h-ev` ("The evidence in brief") is folded into `key-findings`, with the three headline figures shown once; add a redirecting anchor if any external link uses it. |
| 6 | Open decisions | Section 10.3. |

### 10.2 What the repeated-summary removal drops, and what it keeps

| Page | Removed (a repeat) | Kept (unique, nothing reworded) |
|---|---|---|
| Press release | The separate "evidence in brief" block and the key-findings table's repeat of 97.5% and of the sample sentence | The three headline figures once, with sample and source; the other findings (Google Analytics 55.8%, Meta Pixel 35.8%, Google Ads-related 27.5%, sector differences); the release text, why it matters, founder note, about the research, boilerplate and media contact |
| Research report | The second "What the research found" block's duplicate prose | A findings index (figure, statement, full sample and source line, link to its finding); the executive summary; every finding section with its charts and text; method; limits; citation |
| Research hub | The findings list repeated from the report's index | The headline finding with the 120-square chart, its sentence ("Among the 120 websites audited…"), "What this means for you" and "What it doesn't mean", the sample and source line, four more findings each with sample and source, "What we checked. What we can't claim.", and the original journalists sentence |
| Blog | Nothing (no repetition) | All text |

Per-finding detail sentences that appear again, in substance, inside their own finding section are not repeated in the index.

### 10.3 Open decisions and blockers

| ID | Decision | Status | Reconciliation with the owner's decisions |
|---|---|---|---|
| ED-1 | The shared editorial grammar (hero, row, meta strip, detail frame, related links) and the three deliberate differences between news, articles and research. | **Recommendation requiring approval** | Not yet approved. The owner asked for corrections to this proposal, which is not approval of it. |
| ED-2 | Press: two text rows ("Research", "About MappedSkills") replace the "Useful for your story" tiles; the release graphic shows on the listing row. | **Recommendation requiring approval** | Not yet approved. |
| ED-3 | Blog: no filters, topic pages or pagination until the blog has more than 12 articles and two topics with at least two articles each (the /work rule); featured images stay sharing-only. The row meta stays topic and reading time with no date (BL-D4). | **Recommendation requiring approval** | The owner removed this explanation from the public mockups, so it now lives only in the proposal. Not yet approved. |
| ED-4 | Show each research finding once and remove redundant repeated summaries, without dropping unique information or changing findings. | **Resolved** | Owner instruction in this pass: retain the removal, keep unique information. Applied as: headline figures once with sample and source; the finding sections keep their full text and charts; nothing is reworded. |
| ED-5 | /work: remove the logo strip, route panel and "start here" block; one uniform grid. | **Resolved** | Approved as /work R2 and implemented locally (DEC-108). Unchanged in this pass. |
| ED-6 | /work controls: Service and Industry as selects. | **Resolved** | Approved as part of /work R2 (DEC-108). |
| ED-7 | /work cards: name, service, one approved line; no eyebrow or repeated link. | **Resolved** | Approved and refined in /work R2 (lead figure or short summary; DEC-108). |
| ED-8a | Detail pages, mobile: a collapsed "On this page" control (closed and open states shown), not an expanded contents list. | **Resolved** | Owner requirement in this pass, applied to all three templates. |
| ED-8b | Detail pages, desktop and shared: a static (not sticky) contents rail at left, one 700 px reading column, up to three related links across collections; existing section anchors kept. | **Recommendation requiring approval** | Not yet approved. The related links are listed in ED-9. |
| ED-9 | Related links: a press release links its research report and the newsroom; a report links its release and the newsroom; an article links two other articles chosen by one rule (same topic first, then newest) plus the blog index. No editorial "picks" are invented. | **Recommendation requiring approval** | New in this pass. Not yet approved. The two example articles in the mockup follow the rule from the current list order. |
| ED-10 | Blog: keep showing only "By Amit Gupta" and "Updated October 20, 2026" (both recorded on all 7 articles). Do not show the recorded publication date. | **Recommendation requiring approval** | New in this pass. All seven articles share one recorded publication date (July 16, 2026, in structured data only), which would read as a single import date. Not yet approved. |
| B-1 | Which blog articles carry an author. | **Resolved** | Verified on the live pages: all 7 show "By Amit Gupta" and carry author Amit Gupta in structured data. The research report names Amit Gupta; the press release has no byline and none is added. |
| B-2 | Whether every article has an update date. | **Resolved** | Verified: all 7 show "Updated October 20, 2026" and carry a recorded modified date; no date is changed or invented. |
| B-3 | AnybodyCanBake Meta Ads card artwork prints a small "illustrative" caption inside the image. | **Genuine blocker** | An asset fix that needs replacement artwork from the owner. It affects the implemented /work cards only, not these three collections. |
| B-4 | /research/industry-benchmarks: category page or merged into the research hub? | **Resolved** | Owner decision in this pass: it stays its own route for now. The proposal keeps the URL and its content; it only adopts the shared row. |
| B-5 | The reusable case-showcase component and its light/dark variant. | **Resolved** | A separate pending task by owner instruction; not used or touched here. |

**Genuine blockers:** only B-3, an asset supply item that does not block these three collections. **Recommendations needing approval:** ED-1, ED-2, ED-3, ED-8b, ED-9, ED-10. Nothing in the second group has been treated as approved.

### 10.4 Exact proposed implementation scope (after approval; nothing built yet)

| Area | Files and work |
|---|---|
| Shared (new) | `components/editorial/`: `EdHero`, `EdRow`, `EdMeta`, `EdFrame` (rail plus 700 px column), `OnThisPage` (static list at 1081 px and above, a collapsed `details` control below), `EdFigures`, `EdRelated`; `editorial.css` (`ed-` prefix, tokens only); reuse `CplusPage`, `Breadcrumb`, `BreadcrumbJsonLd`, `Close` unchanged |
| Press | `components/cplus/press/{PressBody.tsx,content.ts,press.css}` (listing); `components/cplus/press-release/{PressReleaseBody.tsx,ReleaseRichText.tsx,release.css}` (template: dateline, figures once, other findings, contents control) |
| Blog | `components/cplus/blog/{BlogBody.tsx,content.ts,blog.css}`; `components/cplus/blog-article/{ArticleBody.tsx,ArticleRichText.tsx,ArticleShare.tsx,article.css}` (meta strip, contents control, byline block, keep-reading by the ED-9 rule) |
| Research | `components/cplus/research/{ResearchBody.tsx,content.ts,research.css,sample.ts}` (hub); `components/cplus/research-report/{ReportBody.tsx,ReportCopy.tsx,ReportRichText.tsx,report.css}` (template: findings index, jump links to real sections, contents control, citation block); the eyebrow labels removed; `/research/industry-benchmarks` keeps its route and content, adopting the shared row only |
| Not touched | `app/(pages)/{press,blog,research}/**/page.tsx` (metadata, canonicals, robots, JSON-LD and getters unchanged and pinned by test); `/work` (R2); `lib/contentful/**`; Contentful content; the case-showcase component; every service page |
| Tests | Update `press-page`, `press-release`, blog and research tests; add: metadata and JSON-LD snapshots unchanged for every route; every live anchor id still present; each research figure appears once as a headline; no plain-text navigation labels; the contents control is closed by default below 1081 px and keyboard operable; no internal-note strings in public copy; reduced motion; 1440, 820, 390 and 360 px overflow and console checks |
| Verification at build | Browser pass at four widths, `tsc`, a fresh production build with preview switches off, comparison of rendered text against the recorded content (no paragraph, date or byline lost), Lighthouse accessibility on one page per template |


## 11. Visual direction reworked (R3, 31 October 2026)

The owner rejected the visual direction of sections 3 to 10 for /blog, /press and the press release as inconsistent with the site's brand DNA. It is replaced by `r3/R3_PROPOSAL.md` (review PDF `PROPOSAL_EDITORIAL_R3.pdf`, decisions `DECISIONS_REGISTER_R3.md`). Content preservation, anchors, scope boundaries and the resolved decisions (ED-4 to ED-7, ED-8a, B-1, B-2, B-4, B-5) carry over; ED-1 to ED-3 and ED-8b are superseded.
