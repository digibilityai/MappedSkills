# Research report page · G1 audit and design proposal (2026-10-22)

**Page:** `/research/marketing-measurement-gap-indian-business-websites` (template `app/(pages)/research/[slug]/page.tsx`)
**Status:** G1 proposal and static mockup only. No production source, Contentful entry, metadata or data was changed.
Nothing was committed, pushed or deployed. **Design approval is pending. G2 is NOT authorised.**

Evidence labels follow `CLAUDE.md`: **V** = VERIFIED FACT, **P** = proposal (awaiting approval), **OD** = owner decision,
**U** = UNKNOWN, **RR** = RESEARCH REQUIRED.

> **R1 refinement (owner, 2026-10-22).** The G1 direction is provisionally approved, subject to refinements 1–10. **This
> section and §9 supersede the rest of this file where they differ.** Screenshots before R1 are in `screenshots/r0/`.
>
> | Ref | What changed in the proposal and mockup |
> |---|---|
> | 1, 2 | **The report no longer repeats the hub.** The ink stage, the 120-square field and the "What this means for you / What it doesn't mean" notes are removed from the report. All five key findings now sit in **one paper ledger** ("Key findings / What the research found.", the live wording), in report order. 42.5% is the one tangerine statistic. See §3.2 (R1). |
> | 3 | **The chart rule now verifies label and value pairs, not just values** (§3.4 R1). A replaced chart's description, its alt text verbatim, becomes the bar list's visible caption, with a link to the published image. Five self-tests run on every build. No charting dependency. |
> | 4 | Methodology, limitations, citation and every anchor are unchanged. All anchors were re-verified. |
> | 5 | "How the audit was done." and "What this study can't tell you." are **approved**. `#methodology` and `#limitations` are unchanged. |
> | 6 | The status marks are clearer on light ground. NO is now a dashed **deep** tangerine outline and N/A a dim outline. Every row keeps its code (YES / NO / UTD / N/A) as text, so the meaning never depends on the mark. |
> | 7 | OD-10 was investigated read-only. **Result: unresolved, with evidence.** See §1.3 (R1). |
> | 8 | The close and the slim media strip are unchanged. |
> | 9 | Motion stays at 150 ms (link, rail and caption-link colour, a 3 px arrow nudge). The only animation, the field fade, is gone with the field. Reduced motion removes all of it (verified). |
> | 10 | No shared component, dependency or other page is touched. |
>
> **Page height after R1:** 17,412 px at 1440 (live 17,305) and **23,768 px at 375 (live 24,319)**.

## 0. Inputs and how to review

- **Mockup:** `mockup/index.html`. Use the `.claude/launch.json` entry **`rr-g1-mockup`** (http://localhost:3381), or open the
  file directly.
  - `?banner=0` hides the review banner.
  - `?charts=cms` shows the published raster charts in place of the native bar lists (see §3.4).
- **Screenshots:** `screenshots/` (1440, 1280, 768, 375 and 320 px; `*-fold`, `*-full`, plus section shots). The live page
  "before" is in `screenshots/before/`. Check results are in `screenshots/checks.json` and `screenshots/before/before.json`.
- **Rebuild:** inside `report-g1/`, run `python3 -I tools/extract.py && node tools/build.cjs && node tools/capture.cjs`.
- **Sources read (V):**
  - the template, `components/research/*`, `lib/contentful/research.ts` and the approved `/research` C+ code
    (`components/cplus/research/*`), all on `origin/main` @ `8aa191c`, via a detached read-only worktree at
    `../MappedSkills-report-g1`;
  - `DEC-075` (`/research`), `DEC-067` (blog article template), the `/research` G1 records in `docs/research-redesign/g1/`;
  - the live page HTML, fetched 2026-10-22 (`capture/live.html`).
- **Not read (U):**
  - **The Brand DNA PDF could not be rendered in this session** (no PDF renderer is installed). Brand rules are taken from
    the approved `/research` G1 records, which quote it (proof posture, honesty marks, CTA architecture, breakpoints), and
    from the live approved C+ pages.
  - **Contentful was not queried.** The local `.env.local` has no space ID, so all CMS content was read from the live page
    as served. Field-level structure (for example whether a node is an embedded entry) is inferred from the rendered HTML.

**How the mockup keeps the research verbatim.** `tools/extract.py` lifts the executive summary, all ten body chapters,
the methodology and the limitations out of the live HTML. It strips only classes and wrappers, and never edits a word.
The hero facts, the key findings, the citation and the media text are copied from the live page. The only new words are
the labelled headings and labels listed in §4.

---

## 1. Audit of the live page (V, live, 2026-10-22)

### 1.1 Structure today

Eleven stacked sections, all in the older Resolve route shell (`RouteHero`, `CommercialSection`, `ChapterLabel`):

| # | Section | Height at 1440 px |
|---|---|---|
| 1 | Hero: kicker, 115-character H1, excerpt | 647 |
| 2 | "Study": 5 facts, then the 42.5% **text-card image** and a caption that repeats it | 1,048 |
| 3 | "Key findings": 5 cards | 1,306 |
| 4 | "Overview / Executive Summary": one paragraph | 337 |
| 5 | The body: 10 chapters, 4 raster charts, 1 text-card image | 9,865 |
| 6 | Methodology (`#methodology`) | 1,503 |
| 7 | Limitations (`#limitations`) | 757 |
| 8 | Cite this research | 387 |
| 9 | About the author: initials avatar and name only | 215 |
| 10 | For journalists | 322 |
| 11 | "Next": one link to `/conversion-optimization` | 252 |

Page height: **17,305 px at 1440** and **24,319 px at 375**.

### 1.2 Problems

| # | Finding |
|---|---|
| A1 | **Duplication.** The 42.5% finding is shown **five times** before the body starts: the hero excerpt, the text-card image, the image's visible caption (which repeats the alt text, so screen readers hear it twice), the first key-finding card, and the executive summary. The body's Finding 1 then restates it again. The sector Meta Pixel numbers appear in key finding 5, in a body list, and again in a raster chart. |
| A2 | **Three charts are raster images of numbers that are already on the page as text** (Finding 2, and the Meta Pixel and Google Ads sector lists). They are off-brand blue charts with text baked in, which becomes about 6 px tall at 375 px. |
| A3 | **Weak hierarchy.** The H2s are labels ("Study", "Key findings", "Overview", "Methodology", "Limitations", "Cite this research", "About the author", "Next"), while the real lines ("What the research found.", "Executive Summary") are `<p>`. "Overview" and "Executive Summary" are two labels for one paragraph. |
| A4 | **The H1 is 115 characters**: 5 lines at 1440 px and 6 lines at 375 px. On mobile the visible breadcrumb repeats the whole title over 4 more lines. **The first mobile screen holds no finding at all.** |
| A5 | **The reading line is too long.** Body paragraphs are 962 px wide at 1440 px (about 120–130 characters per line). The approved blog article template targets about 68 characters. |
| A6 | **Horizontal overflow at 375 px** (11 px). The cause is the methodology status table (`min-width: 520px` inside a flex column without `min-width: 0`). The table's first row is a header ("Status / Meaning") but is rendered as an ordinary data row. |
| A7 | **There is no navigation inside a 10-chapter report.** The anchors exist (`#executive-summary`, `#body-1` … `#body-10`, `#methodology`, `#limitations`), but nothing on the page links to them. |
| A8 | **The CMS's own emphasis is invisible.** Bold takeaway lines ("Google Analytics was not publicly observable on 42.5% of the websites we audited.") and italic caveats under the charts render like any other paragraph. The five founder questions are plain H3s. |
| A9 | **Conversion is either missing or misplaced.** The only business link is a small "Next" paragraph at the very end ("start with how conversion work is run"). There is no `/contact` route except "Media enquiry". The author block is a two-letter avatar with no description. |
| A10 | **Strengths to keep.** Every key finding carries its base sample and source note. The UTM caveat, the "Unable to Determine" handling of conversion measurement (3 observed; 117 UTD, **not** "no conversion tracking") and the four limitations are stated in full. The Report JSON-LD (identifier MSR-001, spatial and temporal coverage), the citation with Copy citation / Copy link, and `revalidate = 60` all work. |

### 1.3 Possible content issue (RR, not changed)

The body's opening run ends: *"We call this The Marketing Measurement Gap. This contrast sits at the heart of the study. Most
websites could preserve…"*. "This contrast" seems to point at something that is not rendered. The template renders an
embedded entry only if it is a research finding, so **an embedded entry of another type, or an asset, may be silently
dropped here.** This needs a Contentful check (read-only) before G2. It is not changed in the mockup.

### 1.3 (R1) OD-10 investigation, read-only

**Status: UNKNOWN.** I could not see the source document. Contentful is unchanged.

**What I checked**

| Check | Result |
|---|---|
| A local Contentful query | **Not possible.** `.env.local` has no space ID, and no other local env file has Contentful credentials. |
| Local Next.js fetch caches (6 worktrees) | **None holds the live body.** One cache (`MappedSkills-research-g2`, 2026-10-22 19:31) holds this report with `content: null`, and with methodology as 20 plain paragraphs. That does not match the live page (H3s, a table), so it came from a **different Contentful environment or an earlier state**. **It is not evidence either way.** |
| The production runtime fetch cache (`~/mappedskills.com/.next/cache/fetch-cache`, read-only) | **Blocked** by this session's permission policy for production reads. I did not retry or work around it. |
| Live HTML (V) | The four paragraphs are consecutive `<p>` elements in one block. There is no empty element, placeholder or wrapper between "This contrast sits at the heart of the study." and the next paragraph. |
| Renderer and query (V, code) | The page **can** drop content silently: (1) `ResearchRichText` returns `null` for any embedded block entry that is not a `ResearchFinding`; (2) `RICH_TEXT_WITH_LINKS` asks only for `__typename` + ResearchFinding fields under `links.entries.block`, so another entry type arrives without `sys.id` and can never be matched; (3) embedded **inline** entries and assets are not queried or rendered; (4) an embedded asset without a URL (for example unpublished) returns `null`. |
| The text itself | "This contrast" can refer back to the contrast stated two paragraphs earlier (parameters preserved vs measurement less observable). The next paragraph restates it. That is consistent **either** with a dropped visual between them **or** with plain editorial repetition. The UTM image in Finding 3 is captioned "Receiving campaign information is not the same as measuring it", which would fit at this point. That is a **WORKING HYPOTHESIS** only. |

**How to settle it.** Either run one read-only Delivery API query of this entry's `content.json` (the node types around
that paragraph, owner-run), or authorise a one-off read-only look at the production fetch cache. **G2 guard (P):**
the new page-scoped renderer reports any rich-text node it does not render (a test fixture, plus a build-time warning),
so a dropped embed can no longer pass unnoticed. The rendering of the text stays as published.

---

## 2. Design direction (P)

The report should read like the approved `/research` page continued: **same shell, same lead stage, same ledger, same
close.** Then it becomes a calm long-form reading page in which nothing is hidden.

- **Section tones:** ivory hero → **ink key finding (the one decisive stage)** → paper findings ledger → ivory reading
  section → paper methodology → ivory limitations → paper citation → slim media strip → **tangerine close (the one
  conversion section)**.
- **Reuse, not reinvention:** the `rs-` lead, field, ledger, media and link styles are the live `/research` CSS, used
  unchanged. The new `rr-` rules cover only the hero facts, the reading column, the rail and the CMS rich-text roles.
- **Honesty is visual.** The methodology's YES / NO / UTD / N/A legend gets the same marks the hub uses: solid =
  observed, **dashed tangerine = checked, not observed**, **hatched = unable to determine**, empty = not applicable. "Not
  observed" never looks like "absent".
- **Nothing collapses.** There are no tabs, carousels or accordions. The only navigation aid is a contents rail on wide
  screens and four always-visible jump links in the hero.

---

## 3. Section by section (P)

### 3.1 Hero (ivory). Report identity, no sales CTA

| Element | Proposal | Content source |
|---|---|---|
| Breadcrumb | Home / Research / Industry Benchmarks / **The Marketing Measurement Gap** (the title up to its colon) | Visible text only. **The BreadcrumbList JSON-LD keeps the full title** (OD-2). |
| Kicker | "Research report · Industry Benchmarks" | NEW label + CMS category |
| H1 | **Unchanged text.** Set as two lines: "The Marketing Measurement Gap:" large, then "What 120 Indian Business Websites Reveal About Analytics and Advertising Measurement" in a smaller dim span **inside the same `<h1>`** | CMS `title`, verbatim |
| Lede | The excerpt, verbatim | CMS `excerpt` |
| Facts | Author (→ `/about`), Published, Research period, Geography, Sample size, **Research ID** | CMS fields. Research ID is the existing `researchId` (MSR-001) that today appears only in JSON-LD and in the methodology text. |
| Jump links | Key findings ↓ · Methodology ↓ · Limitations ↓ · Cite this report ↓ | NEW labels, existing anchors |

Result: the H1 at 1440 px goes from 5 lines to 2 + 2. At 375 px the hero is taller than today (866 px, against 571 px
plus a 4-line breadcrumb), because the facts move up into it from the "Study" section. The first key finding therefore
starts about 930 px down the page, against roughly 1,700 px on the live page, where it follows the facts and the 42.5%
image (approximate, from the measured section heights).

### 3.2 (R1) Key findings (paper): one ledger, no repeated hub figure. Supersedes §3.2 and §3.3 below

**Recommendation: simplify. Do not repeat the 120-square figure on the report.**

**Why it doesn't earn its place here:**
1. **It can't show the distinction this report cares most about.** The field can draw only what the CMS states as
   fields (51 of 120). It cannot draw "Unable to Determine": the 67 / 2 split lives only in the description text. On
   the hub that is acceptable; on the full report it would mean the one visual of the headline finding leaves out its
   most important qualification.
2. **It adds no new information.** "More than 4 in 10" and "51 of 120" are already concrete. The description,
   immediately below, gives 51 / 67 / 2 exactly.
3. **It repeats the hub.** A visitor arriving from `/research` sees the same ink stage, the same figure and the same
   notes twice in a row (refinement 1).
4. **It costs space.** At 375 px the lead section was 1,318 px before any other finding.

**What replaces it.** All five key findings in report order, in the live `/research` ledger style (statistic · headline
and full description · Sample and Source). The section uses the live wording "Key findings / What the research found."
42.5% is the one deep-tangerine statistic. **The hub keeps its figure (`DEC-075`); nothing changes there.**

### 3.2 Key finding 1 (ink): the `/research` lead block, reused (R0, superseded)

- **Kicker:** "Key finding 1 of 5" (NEW).
- **Then, verbatim:** `statistic`, `headline` (H2), the **120-square field**, `description`, `baseSample` · `sourceNote`.
- **The field** is drawn by the existing `sampleField()` (`components/cplus/research/sample.ts`) from the CMS `statistic`
  and `sampleSize` only. It gives 51 marked and 69 plain. The 67 / 2 split is shown **only** through the CMS description,
  so "Unable to Determine" is never drawn as "observed". This is the `DEC-075` rule, unchanged.
- **"What this means for you" / "What it doesn't mean":** the owner-approved `LEAD_NOTES` already live on `/research`.
  They are matched on the exact headline and disappear if it changes.
- **Removed from the page:** the 42.5% text-card image and its duplicated caption (A1). **The image stays the
  `og:image` and the JSON-LD `image`** (OD-3).

### 3.3 Key findings 2–5 (paper): the `/research` ledger, reused (R0, superseded by §3.2 R1)

- **Kicker:** "Key findings 2 to 5". **H2:** "What else the audit found." (NEW)
- Four rows in report order. Each row shows the statistic, the headline (H3), the **full** description, and the
  **Sample** and **Source** lines, always visible.
- The paired statistic "66.7% vs 6.7%" uses the hub's paired style, and its row keeps "n=30 websites per sector".

### 3.4 The full report (ivory): one reading column, a rail, nothing hidden

- **Grid at ≥1081 px:** a contents rail (3/12) and the reading column (about 68 characters per line). The rail is
  sticky, which follows the `DEC-067` blog-article precedent (OD-5). Rail entries:
  - Key findings and Executive summary;
  - the ten CMS H2s verbatim, with "Finding N" as a small label;
  - Methodology, Limitations and Cite this report.
- **≤1080 px:** no rail. The hero's jump links remain, and no panel is collapsed.
- **Executive summary** (`#executive-summary`): **one** H2 "Executive summary" (it replaces "Overview" + "Executive
  Summary"). The paragraph is set as a framed abstract.
- **The body: all ten chapters verbatim, with ids `body-1` … `body-10` unchanged.** Presentation rules key on the CMS
  structure, never on a specific sentence:

| CMS pattern | Rendered as | Why |
|---|---|---|
| H2 starting "Finding N:" | the same heading, with "Finding N:" as a small tangerine label line | Scannable; the text is unchanged |
| A paragraph entirely in **bold** | a takeaway line with a tangerine rule | The author's own emphasis becomes visible (A8) |
| A paragraph entirely in *italic* | a "Note" caveat, in full | Caveats stay next to the chart they qualify |
| A list whose **every** item is "**Label**: NN.N%" | a **bar list**: label and value stay as text; the bar is `aria-hidden`; a "Bar scale: 0 to 100%" line | Brand-coloured, readable at 320 px, no new dependency |
| A CMS chart image whose alt text states **exactly the same set of values** as a bar list in the same chapter | hidden, because the bar list carries the same numbers (3 charts) | Removes A2. `?charts=cms` shows them instead (OD-4) |
| Any other image (the 97.5% vs 55.8% UTM comparison) | kept, framed on white; the alt text is unchanged; the visible caption that repeated the alt is dropped | No number is redrawn without a list behind it |
| H3s numbered "1." … "5." | a numbered checklist (tangerine discs) | The founder questions read as a self-check |
| "A Note From …" chapter | a pull quote with the attribution line | The CMS italics already mark it as a quote |

### 3.4 (R1) Chart replacement: verified equivalence only

A published chart image is replaced by a bar list **only** when all of these hold. They are checked by
`tools/extract.py` here and by a unit test in G2:

1. The chart and a CMS list are in the **same chapter**.
2. Every list item reads "**Label**: NN.N%" (a simple, deterministic parse; no charting library).
3. The image's alt text states **exactly as many** percentages as the list has items.
4. **Every label and value pair matches.** Each item's value appears in an alt-text segment that also names its label.
   Matching is case-insensitive, and a hyphenated qualifier may be absent, so "Google Ads-related measurement" matches
   "Google Ads measurement". **A changed, missing or swapped value fails.** This is self-tested on every build.

**When a chart is replaced, nothing is lost:**
- the list text, which carries every value, stays as text, and the bar is `aria-hidden`;
- the image's description (alt text), verbatim, becomes the bar list's visible caption, labelled "Published chart";
- an "Open the chart image" link keeps the original image reachable;
- the italic caveat paragraph that follows each chart in the CMS is untouched.

**Result on this report (V):**

| Chart | Result |
|---|---|
| Finding 2: 4 technologies | Verified → bar list |
| Meta Pixel by sector | Verified → bar list |
| Google Ads by sector | Verified → bar list |
| UTM 97.5% vs 55.8% | **No list, not replaced**: shown as published |

The Google Analytics by sector list has no chart; it gets bars from its own text.

**Not machine-verifiable (U):** the words drawn *inside* the raster images (chart title and source line). The image
link preserves them. `?charts=cms` shows all four published images instead.

### 3.5 Methodology (`#methodology`, paper). Full text, always open

- **Kicker:** "Methodology". **H2 (NEW):** "How the audit was done." This replaces the H2 "Methodology" plus the `<p>`
  "Research framework and data collection." (OD-6.)
- Every methodology paragraph is verbatim, including the protocol's "No purchases were made…" paragraph and "Research
  ID: MSR-001. Research type: Data Story. Audit protocol: MSR-001 Audit Protocol v1.1."
- **The status table becomes a definition list with honesty marks.** The text is verbatim, the header row becomes the
  list's label, and the result is no horizontal scroll at any width (A6).

### 3.6 Limitations (`#limitations`, ivory). Full text, always open

- **Kicker:** "Limitations". **H2 (NEW):** "What this study **can't tell you.**" This replaces "Where the observation &
  data stops." (OD-6.)
- All five paragraphs are verbatim, each with a left rule. The closing sentence ("These limitations are an intentional
  part of the research design…") is set in bold ink.

### 3.7 Cite this report (`#cite`, paper)

- The citation is verbatim, followed by the canonical URL and **Copy citation / Copy link** (`CopyActions` behaviour
  unchanged: clipboard, 2-second confirmation).
- The author name links to `/about`. The initials avatar and the separate "About the author" section are removed, as in
  `DEC-067`.
- Downloads appear only when the report has files (none today, the same condition as now).
- **New anchor `#cite`.** It is additive; no existing anchor changes.

### 3.8 For journalists (slim strip)

The live `JournalistsCta` text, the report-specific mailto subject and "Media enquiry" → `/contact`, unchanged. It uses
the hub's `rs-media` strip.

### 3.9 Close (tangerine `b-close`): the only conversion section

- **H2:** "Not sure what your marketing is actually measuring?"
- **Body:** "We can help you understand what's visible, what's missing and what to look at next."
- **Buttons:** **Talk to MappedSkills** → `/contact`; **Request a call** → `/contact?intent=call` (`BOOKING_HREF`, as on
  `/research`).
- **Tertiary:** the live "Next" link, kept as "How conversion work starts →" → `/conversion-optimization`.
- This is the owner-approved `/research` close (`DEC-075`), reused so that the hub and the report speak with one voice.
  An alternative report-specific line is listed in OD-7.

---

## 4. Copy: new words only (OD-6)

Everything else on the page is CMS text, verbatim.

| Where | Proposed copy |
|---|---|
| Hero kicker | Research report · *[category]* |
| Jump links | Key findings · Methodology · Limitations · Cite this report |
| Facts label | Research ID |
| Findings | Key findings / **What the research found.** (live wording; R1 replaces the lead kicker and reading notes) |
| Chart captions (R1) | Published chart · Open the chart image |
| Ledger | Key findings 2 to 5 / **What else the audit found.** / Sample / Source |
| Rail | On this page |
| Summary | The full report / **Executive summary** |
| Bars | Bar scale: 0 to 100% · Note (label on italic caveats) |
| Methodology H2 | **How the audit was done.** |
| Limitations H2 | **What this study can't tell you.** |
| Cite | Cite this report / How to reference this report. (live) / Author |
| Close | The approved `/research` close + "How conversion work starts" (live link text) |

---

## 5. Unchanged evidence and functionality (explicit)

**Research content (verbatim, nothing rounded, re-ordered within a section, or removed):**
- **Key findings:** all five statistics (42.5%, 35.8%, 27.5%, 97.5%, 66.7% vs 6.7%), with every headline, description,
  base sample (n=120; n=30 per sector) and source note (MSR-001 Audit Protocol v1.1, both variants).
- **Body chapters:** the executive summary and all ten chapters, including every sector figure (Meta Pixel, Google Ads
  and Google Analytics by sector) and every count (51/67/2, 43, 33, 28, 117, 111, 20/18/3/2, 14).
- **Conversion measurement:** the "3 observed / 117 Unable to Determine, *not* no conversion measurement" passage and
  "this study does not conclude that only 2.5%…".
- **Caveats:** the UTM caveat in the key finding, in Finding 3, in the chart note and in the UTM image's alt text. Every
  "should not be interpreted as…" caveat.
- **Methodology:** the full text, including the status definitions YES / NO / UTD / N/A.
- **Limitations:** all four limitations and the closing sentence.
- **Identity:** the founder quote and attribution; the citation, the canonical URL and Research ID MSR-001.

**Functionality:**
- **URL and metadata:** the URL and the `generateStaticParams` / `resolveResearchSlug` routing (report and category).
  `generateMetadata` (title, description, canonical, Open Graph, Twitter, authors, publisher).
- **Structured data:** the `Report` JSON-LD and the BreadcrumbList JSON-LD (full title).
- **Deep links:** `#executive-summary`, `#body-1` … `#body-10`, `#methodology` and `#limitations`. The `/research` hub
  links to the last two, and the mockup verifies that they all resolve.
- **Other behaviour:** Copy citation / Copy link, the media mailto and its subject, the downloads condition and the
  related-research condition. `revalidate = 60`.
- **Out of scope:** the category page variant of the same route; the site header, footer, consent and analytics;
  `/press`, the blog and `/research`.
- **Contentful:** no entry, asset or model change.

---

## 6. Engineering plan for G2 (P, not authorised)

| File | Change |
|---|---|
| `app/(pages)/research/[slug]/page.tsx` | `ReportPage` renders a new `ReportBody` in `CplusPage`. `generateMetadata`, the JSON-LD, `generateStaticParams`, `revalidate` and `CategoryPage` are unchanged. |
| `components/cplus/research-report/ReportBody.tsx` | new, server component |
| `components/cplus/research-report/ReportRichText.tsx` | new. It is a page-scoped renderer, like `blog-article/ArticleRichText`, keeping the same chapter split and `${idPrefix}-${index}` ids, so `body-N` is unchanged. |
| `components/cplus/research-report/content.ts`, `report.css` | new; copy (§4) and `rr-`-scoped styles |
| `components/cplus/research/*` | **reused, not changed**: `research.css` (`rs-` ledger, statistic, link and media styles). R1: `sample.ts` and `LEAD_NOTES` are no longer used by the report. |
| `tests/research-report.test.cjs` | new. Covers: metadata and JSON-LD unchanged; every live anchor present; no hard-coded research figure; the bar list renders only for all-"Label: N%" lists; the chart rule replaces an image only on a verified label and value match (changed, missing and swapped values fail) and keeps its description as a caption plus an image link; every rich-text node is rendered or reported (the OD-10 guard); UTD and N/A are kept; close routes. |

**Not changed:** `components/research/ResearchRichText.tsx` and `ResearchFindingEmbed.tsx` (they are shared with
`/press` and the blog), `JournalistsCta` and `CopyActions` (reused as-is), `lib/contentful/*`, `lib/schema`, the header
and footer, and dependencies (no new package).

**Motion:** 150 ms link and rail colour, a 3 px arrow nudge and the field's one 150 ms fade. Reduced motion removes all
of them (verified in the mockup). No count-up, no reveal-on-scroll, no loop.

---

## 7 (R1). Checks re-run after R1 (V, Playwright Chromium, local file; `screenshots/checks.json`)

| Check | Result |
|---|---|
| Overflow, small text, console errors | None at 1440, 1280, 768, 375 or 320 px |
| Anchors | All live anchors exist and every in-page link resolves |
| Key findings | 5 rows, each with its sample and source |
| Charts | 4 bar lists; 3 verified replacements, each captioned; the UTM image shown; `?charts=cms` shows all 4 |
| Status marks | YES = solid, NO = dashed, UTD = hatched, N/A = outline, each next to its text code |
| Reduced motion | Transitions about 0 ms |
| Without JavaScript | Methodology and limitations render in full |
| Page height | 17,412 px at 1440 (live 17,305); 23,768 px at 375 (live 24,319) |

**Targets under 44 px:** the breadcrumb links, the desktop-only rail links (41 px) and the inline "Open the chart image"
caption links (21 px, inline text links, the WCAG target-size inline exception).

**Not run:** other browsers, devices, screen readers, the production build and Core Web Vitals (G2).

## 7. Checks run on the mockup (R0, superseded)

| Check | Result |
|---|---|
| Horizontal overflow | **None at 1440, 1280, 768, 375 or 320 px** (the live page overflows by 11 px at 375) |
| Text under 12 px | None at any width |
| Console errors | 0 |
| Deep links | Every live anchor id exists; every in-page `#` link resolves; `#methodology` lands with its heading in view |
| Lead field | 120 squares, 51 marked, at every width |
| Bar lists | 4 bar lists; 3 duplicate raster charts hidden, the UTM image shown. `?charts=cms` shows all 4 charts. |
| Reduced motion | Field animation `none`; transitions about 0 ms |
| Without JavaScript | The field, methodology and limitations render in full |
| Reading measure | 705 px at ≥768 (about 68 characters), down from 962 px |
| Page height | 18,022 px at 1440 (live 17,305); 24,393 px at 375 (live 24,319) |
| Targets under 44 px | Only the breadcrumb links (the same on every C+ page) and the desktop-only rail links (41 px) |

**Why the page is not shorter:** the research text is kept in full, the reading column is narrower, and the 120-square
figure is added. The proposal reduces repetition (A1) and makes the page navigable rather than short. Reducing length
further would mean editing Contentful copy, which is outside G1 (OD-9).

**Not run:** Firefox, WebKit, real devices, screen readers, the production build, Lighthouse and Core Web Vitals. These
are G2 checks.

---

## 8. Risks and assumptions

| # | Risk or assumption | Mitigation |
|---|---|---|
| R1 | The bar-list and chart-replacement rules depend on CMS formatting (bold label + ": NN.N%"; label and value pairs in the alt text). A future report formatted differently simply renders as text and images, as today. | The rules are inert by default; tests cover both branches. |
| R2 | Hiding a CMS image is a content-presentation change, even though its numbers stay on the page. | OD-4, with `?charts=cms` as the conservative option. |
| R3 | The possible dropped embed in the opening run (§1.3). | RR: check in Contentful, read-only, before G2. |
| R4 | The visible breadcrumb shortens the title. The JSON-LD does not change. | OD-2; keep the full title if preferred. |
| R5 | The H1 subtitle styling changes how the H1 looks, not its text. SEO risk is low, but the H1 is a rendered SEO element. | OD-1 |
| R6 | The template serves every future report. | R1: the report has no report-specific copy (`LEAD_NOTES` is no longer used), so nothing can leak between reports. |
| A1 | Brand DNA is applied as recorded in the `/research` G1 records; the PDF itself was not re-read this session. | Owner to confirm, or re-check when a PDF renderer is available. |
| A2 | The CMS content was read from the live HTML, not from Contentful. | The same content the visitor sees; G2 will run against Contentful. |

---

## 9 (R1). Recommendations on OD-1 to OD-10

**Only three items genuinely need owner approval:**
- **OD-1**, because the H1 is a rendered SEO element;
- **OD-3**, because a published CMS image leaves the page body;
- **OD-10**, because it needs owner-run Contentful access or a production-read authorisation.

Everything else is either settled by the R1 instructions or a low-risk presentation choice that follows a precedent.

| ID | Recommendation | Owner approval needed? |
|---|---|---|
| OD-1 | **Approve.** Keep the H1 text exactly, and set the part after the colon as a smaller line inside the same `<h1>`. The title, metadata and JSON-LD are unchanged. | **Yes.** The H1 is a rendered SEO element. |
| OD-2 | **Approve.** The visible breadcrumb says "The Marketing Measurement Gap"; the BreadcrumbList JSON-LD keeps the full title. It saves 3 lines on mobile. | No (presentation only) |
| OD-3 | **Approve.** Remove the 42.5% text-card image from the page body; it stays the `og:image` and JSON-LD `image`. In R1 it is replaced by the ledger, not by the hub figure. | **Yes.** A published CMS image leaves the page body. |
| OD-4 | **Approve, as in §3.4 R1.** Replace only verified-equivalent charts (3 of 4), with the description caption and image link. | No. Settled by refinement 3. |
| OD-5 | **Approve.** A sticky contents rail at ≥1081 px only (the `DEC-067` precedent), hero jump links at every width, no collapsed panel. | No (precedent) |
| OD-6 | **Settled.** "How the audit was done." and "What this study can't tell you." are approved (refinement 5). The remaining new labels are functional ("Key findings", "Research ID", "On this page", "Published chart", "Open the chart image", "Bar scale: 0 to 100%"). | No |
| OD-7 | **Reuse the approved `/research` close** and keep "How conversion work starts" as a quiet third link. A report-specific close would need new copy per report. | No. Settled by refinement 8. |
| OD-8 | **Approve.** Merge the author into the citation section (name → `/about`), and drop the initials avatar (the `DEC-067` precedent). | No (precedent) |
| OD-9 | **Defer.** An editorial pass on the CMS body (Title Case H2s, one-line paragraphs) is a separate content task, outside this redesign. | Not now |
| OD-10 | **Unresolved (§1.3 R1).** Do not block G2 design on it; add the "unrendered node" guard in G2. | **Yes.** Settling it needs one owner-run read-only Contentful query, or authorisation to read the production fetch cache. |

## 9. Owner decisions requested (R0, superseded by §9 R1)

| ID | Decision | Recommendation |
|---|---|---|
| OD-1 | Keep the H1 text and set the part after the colon as a smaller subtitle line inside the same `<h1>` | Approve |
| OD-2 | Visible breadcrumb shows "The Marketing Measurement Gap"; the JSON-LD keeps the full title | Approve |
| OD-3 | Remove the 42.5% text-card image from the page body (it stays the `og:image`); use the `/research` 120-square field and lead block instead | Approve |
| OD-4 | Draw "Label: NN.N%" lists as native bar lists, and hide a raster chart only when its alt text states exactly the same values | Approve (or keep the raster charts: `?charts=cms`) |
| OD-5 | A sticky contents rail on wide screens only (the `DEC-067` precedent); hero jump links at all widths; no collapsed panel | Approve |
| OD-6 | The new headings and labels in §4, especially "How the audit was done." and "What this study can't tell you." | Review the wording |
| OD-7 | Close: reuse the `/research` close, or a report-specific line such as "Could your business answer those five questions?" | Reuse the `/research` close |
| OD-8 | Merge "About the author" into the citation section (name → `/about`, no initials avatar) | Approve |
| OD-9 | Separately and later: an **editorial** pass on the CMS body (Title Case H2s → sentence case; trimming one-line paragraphs). It is not part of this redesign and changes no research claim. | Defer |
| OD-10 | RR §1.3: check whether an embedded entry is being dropped after "This contrast sits at the heart of the study." | Check before G2 |

**Next step after approval:** G2 on a dedicated branch from `origin/main`, with the files in §6. No deployment without a
separate authorisation.
