# BL-D6 · Contentful Editorial Corrections — Final Change Manifest (2026-10-20)

**Status: FOR OWNER APPROVAL. Nothing has been executed.** No Contentful entry or asset has been created, edited or
published. No website code, configuration or governance document has changed. Nothing has been committed, pushed,
merged, deployed or rolled back. This file is untracked.

**Builds on:** `BL_D6_EDITORIAL_PROPOSAL.md` (same folder); `BL_D6_EDITORIAL_CORRECTIONS.md` and `DEC-067` (on `main`,
`ad23aaf`); `DEC-051`, `DEC-061`, `DEC-062`.

**Owner decisions applied (2026-10-20, as given):**

1. FB-3: **HOLD** named-client claims until evidence is verified.
2. EM-1 and RE-2: **VERIFY** both quote attributions before approving replacements.
3. CM-3: **REMOVE** the ₹20,000–₹1,00,000 monthly price figures, with replacement wording drafted.
4. SEO-4 and SEO-5: **SOFTEN** both "3 to 6 months" instances; do not imply a guaranteed timeline.
5. ALT-10: **HOLD** until its reuse and social-metadata effects are established.

---

## 0. Evidence basis

| Statement | Label | Source |
|---|---|---|
| All 23 recorded items are still live, word for word, at the recorded blocks. Body text, image alt text and `article:modified_time` are unchanged between 15:26 and 15:46 IST | VERIFIED FACT | Two live fetches of all 7 articles; `evidence/live-blocks-2026-10-20.json` |
| Image alt text = asset **Title**, because every asset Description is empty | VERIFIED FACT (code) + inference (data) | `ArticleRichText.tsx` uses `alt = description \|\| title` and shows Description as a `<figcaption>`. 0 figcaptions are live, so the Descriptions are empty (inferred) |
| Shared-asset usage on the **live site** | VERIFIED FACT | All 31 sitemap URLs plus `/work`, `/blog`, `/press`, `/research` crawled and searched for the 14 asset ids (§3) |
| References from unpublished entries, or from content types the site does not render | **UNKNOWN** | No Contentful API access: the four `CONTENTFUL_*` values in `.env.local` are empty. Check in the Contentful UI (pre-flight P4) |
| Unpublished drafts on the 7 entries | **UNKNOWN** | Same reason. Pre-flight P3 |
| Quote attributions | Per item (§2) | Web research, 2026-10-20; sources in §6 |

## 1. Totals and reconciliation

**Scope:** 23 original items, 7 new text issues and 11 image-alt candidates = **41 items**. CM-3 is split into CM-3a
(the figures the owner decided to remove) and CM-3b (the remaining figures, not decided), which gives **42 change
units**.

| Status | Text | Alt | **Total** | Units |
|---|---|---|---|---|
| **ELIGIBLE**: ready once this manifest is approved | 25 | — | **25** | SEO-1, SEO-2, SEO-3, SEO-4, SEO-5 · FB-1, FB-2, FB-4, FB-5 · CM-1, CM-2, CM-3a, CM-5, CM-6 · EM-2, EM-3 · PM-1, PM-2, PM-4, PM-5 · RE-1, RE-3, RE-4, RE-5 · CW-1 |
| **ELIGIBLE (CONDITIONAL)**: eligible only if the Contentful "References" check (P4) shows the asset is used only by its article | — | 10 | **10** | ALT-1–ALT-9, ALT-11 |
| **HOLD**: an owner decision is outstanding | 2 | 1 | **3** | FB-3, CM-3b, ALT-10 |
| **EVIDENCE REQUIRED** | 3 | — | **3** | EM-1, RE-2, PM-3 |
| **NO CHANGE**: the item is resolved as correct | 1 | — | **1** | CM-4 (attribution verified) |
| **Total** | **31** | **11** | **42** | = 41 items, with CM-3 counted as 2 units |

**Must items:**

- The 10 original Musts: 9 are ELIGIBLE; FB-3 is on HOLD.
- CM-3a is raised to Must by the owner decision.
- ALT-8 is Must (accessibility) and ELIGIBLE (CONDITIONAL).

**After full eligible publication** (VERIFIED FACT for the current counts; the after-counts are the expected result):

| What | Now | After |
|---|---|---|
| Booking wording | 4 | **0** |
| Published writer notes | 4 blocks | **0** |
| "3 to 6 months" | 2 | **0** |
| Guarantee / "ensures" lines | 6 | **0** |
| Rupee price figures | 6 | **4** (CM-3b, on hold) |
| Named-client list | live | **still live** (FB-3, on hold) |

**Count note (repeated from the proposal):** `DEC-067` says "24 items". The list on `main` contains **23**. Governance
documents were not edited.

## 2. The manifest

**Notation:**

- `**x**` is bold and `[x](url)` is a link. Typographic apostrophes (’) are reproduced as they appear live.
- **Field:** `content` = the Post entry's rich-text body; Bn = the top-level block index; `Asset › Title` = the asset's
  Title field.
- **Fact/inference column:** **F** = verified fact; **I** = inference or judgement.
- **Not changed by any item:** URLs, titles, H1s, SEO titles, meta descriptions, excerpts, canonicals, slugs and the
  Pune terms. Bold keyword spans are kept.

### 2.1 `/blog/seo-company-in-pune` — one publish

| ID | Pri | Status | Field | Current text (exact) | Replacement (exact) | Rationale | F/I |
|---|---|---|---|---|---|---|---|
| SEO-1 | Must | **ELIGIBLE** | `content` B3 | If you want SEO that supports business growth instead of vanity metrics, [**Book a Client Discovery Call (30 minutes)**](/schedule-call)**. ** | If you want SEO that supports business growth instead of vanity metrics, [**request a call**](/schedule-call) and we’ll get in touch to find a time. | Implies a booked appointment (contrary to `DEC-062`). The 30 minutes is not a confirmed fact (`DEC-051`). | F: text, link, decision records |
| SEO-2 | Must | **ELIGIBLE** | `content` B122 | **Results vary.** If you want this page to convert better, add first-party proof like case study summaries, before/after examples, or reporting snapshots. | **Results vary.** | Internal writer note published to readers. | F |
| SEO-3 | Must | **ELIGIBLE** | `content` B146 | [Book a Client Discovery Call (30 minutes).](/schedule-call) | [Request a call](/schedule-call) and we’ll get in touch to find a time. | As SEO-1. | F |
| SEO-4 | Should | **ELIGIBLE** (owner: soften) | `content` B118 | Most businesses start seeing meaningful movement in 3 to 6 months, depending on: | The time it takes to see meaningful movement depends on: | Removes the duration; the list that follows (starting point, competition, …) still explains the variables. No timeline is implied. | F: text. I: wording |
| SEO-5 | Should | **ELIGIBLE** (owner: soften) | `content` B131 (FAQ answer to "How long does SEO take to show results?") | SEO is a long-term investment. Many businesses start seeing meaningful improvements within 3 to 6 months, depending on competition, website condition, and implementation quality. | SEO is a long-term investment. The time it takes to see meaningful improvements varies with competition, website condition, and implementation quality. | Duplicate of SEO-4; the two **must ship together**. The FAQ question stays; the answer no longer gives a duration. | F: text. I: wording |

### 2.2 `/blog/facebook-advertising-agency-pune` — one publish now; FB-3 later (a second publish)

| ID | Pri | Status | Field | Current text (exact) | Replacement (exact) | Rationale | F/I |
|---|---|---|---|---|---|---|---|
| FB-1 | Must | **ELIGIBLE** | `content` B3 | **Book a Client Discovery Call (30 minutes).** *(plain bold text, no link)* | [**Request a call**](/schedule-call) and we’ll get in touch to find a time. | Booking wording, and an instruction with nothing to click. | F |
| FB-2 | Must | **ELIGIBLE** | `content` B71, B72, B73 | B71 "We also recommend supporting this page over time with:" · B72 ordered list "verified performance snapshots / campaign objective summaries / before/after efficiency improvements / vertical-specific case notes / creative examples where possible" · B73 "That will make the page stronger for both conversion and SEO." | *(delete all three blocks)* | Internal writer note. **Dependency:** these blocks sit under FB-3's H2. With FB-3 on hold, the section ends at the client list (B70). The deletion stands on its own either way. | F |
| FB-3 | Must | **HOLD** (owner) | `content` B67–B70 | H2 "Proof Through Relevant Campaign Experience" · B68 "If you are evaluating a Facebook advertising company in Pune, case relevance matters more than generic claims." · B69 "Here are a few examples from our paid social work:" · B70 list "Social Media Ads for OmSaiGroup / Social Media Ads for GEMS Education / Social Media Ads for Mohali Citi Center / Social Media Ads for Advit Prints / Social Media Ads for AnybodyCanBake" | **None yet.** When evidence exists: keep only clients with verified paid-social work **and** permission to name them. If none qualify, delete B67–B70. | **New evidence:** 4 of the 5 names appear nowhere on the site. AnybodyCanBake's only case study (`/portfolio/google-ads-for-online-courses`) is a **Google Ads** case; it mentions no paid-social work. The proposal's earlier "link AnybodyCanBake to /work" option is therefore **withdrawn**. **Owner to clarify the HOLD (see §5, Q1):** keep the list live while evidence is gathered, or remove it now and restore verified names later. | F: site search results. I: "not evidenced" ≠ "false" |
| FB-4 | Must | **ELIGIBLE** | `content` B125 | **Book a Client Discovery Call (30 minutes).** *(plain bold text, no link)* | [**Request a call**](/schedule-call) and we’ll get in touch to find a time. | As FB-1. | F |
| FB-5 | Should (a11y) | **ELIGIBLE** | `content` B85–B92 | Eight paragraphs: "Timeline" / "What Usually Happens" / "First 2 weeks" / "Setup, launch, early data, initial audience and creative signals" / "Weeks 3–6" / "Testing, pruning weak assets, budget refinement, clearer efficiency trends" / "Months 2–3" / "Better optimization decisions, more stable performance patterns, stronger retargeting impact" | **One table** with header row `Timeline \| What Usually Happens` and 3 body rows. Each row pairs its two paragraphs: "First 2 weeks" with its description, "Weeks 3–6" with its description, "Months 2–3" with its description. **The text is unchanged.** | A table flattened into loose paragraphs. The template renders tables as a labelled, scrollable region (`ba-table`). **Related claim:** see R-1. | F: structure. I: a11y impact |

### 2.3 `/blog/content-marketing-services-in-pune` — one publish now; CM-3b later if decided

| ID | Pri | Status | Field | Current text (exact) | Replacement (exact) | Rationale | F/I |
|---|---|---|---|---|---|---|---|
| CM-1 | Must | **ELIGIBLE** | `content` B9 | **3. Growing Digital Demand in Pune: The city’s digital marketing sector has seen a surge, with businesses investing heavily in online presence. For instance, Pune’s [digital advertising spending](https://www.statista.com/outlook/amo/advertising/india) grew by 15% in 2023 alone.** | **3. Growing Digital Demand in Pune: The city’s digital marketing sector has seen a surge, with businesses investing heavily in online presence.** | A city figure linked to a **national** source. The figure is unverified and dates from 2023. The outbound link is removed. **Residual:** the first sentence is still unsourced (R-2). | F: link target. I: residual risk |
| CM-2 | Must | **ELIGIBLE** | `content` B64 | This case demonstrates how effective **content marketing** **services **can achieve tangible results. | *(delete the block)* | Refers to a case the article does not contain. | F |
| CM-3a | **Must** (owner) | **ELIGIBLE** | `content` B61 | **3. Agency Content Creation**: Agencies offer full-suite **content marketing services**, often bundled into packages. Costs can range from ₹20,000 to ₹1,00,000 per month, depending on the volume and type of content required. | **3. Agency Content Creation**: Agencies offer full-suite **content marketing services**, often bundled into packages. Costs depend on the volume and type of content required. | Owner decision. The range could be read as MappedSkills' own price band (the intent of `DEC-061`). The replacement states no price, band or minimum. | F: decision. I: wording |
| CM-3b | Should | **HOLD** (owner) | `content` B59, B60 | B59 "…or SEO tools, which can cost anywhere between ₹5,000 to ₹20,000 per month." · B60 "…Rates can range from ₹1,000 to ₹5,000 per article, depending on their expertise and the complexity of the content." | **Proposed, if the owner extends the decision:** B59 "…or SEO tools, which add to the cost." · B60 "**2. Hiring a Freelance Content Writer**: Freelancers typically charge per piece or per word, depending on their expertise and the complexity of the content." | The owner's decision named only the agency range. These two figures are equally unsourced, and once CM-3a ships the section mixes figures with no figures. **Recommendation: decide before the CM publish, so there is one publish.** | F: text. I: recommendation |
| CM-4 | Could | **NO CHANGE** | `content` B0, B1 | "Content is king, but distribution is queen and she wears the pants." / "Jonathan Perelman" | *(none)* | **Attribution verified:** Jonathan Perelman wrote an AdExchanger column headlined "Content Is King, Distribution Is Queen and She Wears The Pants" (12 Nov 2013). | F (primary source by the author) |
| CM-5 | Should | **ELIGIBLE** | `content` B16 | For small businesses in Pune, partnering with a **content marketing agency in Pune** ensures targeted campaigns that deliver maximum ROI. | For small businesses in Pune, partnering with a **content marketing agency in Pune** can help focus campaigns on the audiences that matter most. | Guarantee and ROI claim. The Pune keyword is kept. | F: text. I: wording |
| CM-6 | Could | **ELIGIBLE** | `content` B62 | While creating content yourself might seem economical, hiring professionals ensures quality, consistency, and strategic alignment with your goals. | While creating content yourself might seem economical, hiring professionals can help with quality, consistency, and strategic alignment with your goals. | Same "ensures" claim class as CM-5. Ship them together. | I |

### 2.4 `/blog/building-an-email-list` — one publish, ideally after EM-1 is resolved

| ID | Pri | Status | Field | Current text (exact) | Replacement (exact) | Rationale | F/I |
|---|---|---|---|---|---|---|---|
| EM-1 | Should | **EVIDENCE REQUIRED** | `content` B0 | "The money is in the list, but the relationship is in the message." - **Amit Gupta** | **None until verified.** If Amit Gupta confirms he wrote it: no change. If not: delete B0 (quote and attribution). An unattributed quote would read as MappedSkills' own wording. | Web search found **no earlier or competing source** for the exact sentence; only the generic saying "the money's in the list". This is consistent with original authorship but does not prove it. **Only the named person can confirm.** | F: search result. I: interpretation |
| EM-2 | Should | **ELIGIBLE** | `content` B1 | …let’s clear that up: email marketing is still one of the highest ROI channels available, surpassing social media in many ways. | …let’s clear that up: email is still one of the most direct ways to stay in touch with people who asked to hear from you. | Comparative ROI claim with no source. | I |
| EM-3 | Should | **ELIGIBLE** | `content` B28 | Email marketing has consistently shown better conversion rates than many other forms of marketing. | Because subscribers chose to hear from you, email is often where interested readers take the next step. | Comparative claim with no source. | I |

### 2.5 `/blog/performance-marketing-vs-digital-marketing` — one publish (PM-3 does not block it)

| ID | Pri | Status | Field | Current text (exact) | Replacement (exact) | Rationale | F/I |
|---|---|---|---|---|---|---|---|
| PM-1 | Must | **ELIGIBLE** | `content` B42 | Performance marketing is ideal for businesses that want measurable results with minimal risk. Whether you want to drive leads, sales, or app downloads, the performance marketing approach guarantees that you get what you pay for. | Performance marketing suits businesses that want measurable results. Whether you want to drive leads, sales, or app downloads, you pay for defined outcomes, such as clicks, leads or sales, so spend is easier to tie to results. | Guarantee language, and "minimal risk". | F: text |
| PM-2 | Should | **ELIGIBLE** | `content` B23 | **3. Higher ROI**: Since you are paying for concrete results, it often provides a better return on investment (ROI). | **3. Clearer Return**: Because you pay for defined outcomes, it is easier to see what the spend produced. | ROI claim with no source. | I |
| PM-3 | Could | **EVIDENCE REQUIRED** | `content` B0 | "Marketing is no longer about the stuff you make, but about the stories you tell." - **Seth Godin** | **None until verified.** If a primary source is found: no change. If not: the owner chooses to keep it (widely attributed) or delete B0. | Only secondary attributions were found: a 2015 recap of a Godin London event and quote round-ups. No book, blog post or transcript was found. | F: search result |
| PM-4 | Should | **ELIGIBLE** | `content` B51 | …performance-based marketing ensures tangible outcomes by allowing you to pay only for the desired actions… | …performance-based marketing ties spend to tangible outcomes by charging only for the desired actions… | The conclusion repeats PM-1's guarantee. **Ship with PM-1.** | I |
| PM-5 | Could | **ELIGIBLE** | `content` B5, B21 | B5 "…This approach ensures that you only invest in marketing efforts that deliver measurable outcomes." · B21 "**1. Pay for Results**: You only pay when specific outcomes are achieved, ensuring that your budget is spent effectively." | B5 "…This means your spend is tied to actions you can measure." · B21 "**1. Pay for Results**: You only pay when specific outcomes are achieved, which makes it easier to see where your budget goes." | Same claim class. **Ship with PM-1 and PM-4.** | I |

### 2.6 `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` — one publish, ideally after RE-2 is resolved

| ID | Pri | Status | Field | Current text (exact) | Replacement (exact) | Rationale | F/I |
|---|---|---|---|---|---|---|---|
| RE-1 | Should | **ELIGIBLE** | `content` B106 | …Setting benchmarks, such as increasing web traffic by 20% in three months or reducing customer acquisition costs by 15%, provides clear targets and a structured path for achieving growth. | …Setting benchmarks, such as a target for website traffic or for cost per enquiry over a fixed period, provides clear targets and a structured path for achieving growth. | The specific percentages read as expected results. | I |
| RE-2 | Should | **EVIDENCE REQUIRED** | `content` B0 | "In real estate, a strong foundation sells the property, but in digital marketing, a strong strategy sells the dream." -** Amit Gupta** | **None until verified.** Same rule as EM-1: if confirmed, no change (optionally fix the bold spacing to `- **Amit Gupta**`); if not, delete B0. | No earlier or competing source was found for either half of the sentence. Only the named person can confirm. | F: search result |
| RE-3 | Could | **ELIGIBLE** | `content` B7 | …that inspire action and fuel growth like never before. Prepare to take notes—these insights are designed not just to inform, but to deliver results! | …that inspire action and fuel growth like never before. | Promotional promise ("deliver results"). | I |
| RE-4 | Could | **ELIGIBLE** | `content` B115, B116 | H2 "So why wait?" · "Dive into these tactics with enthusiasm and watch them transform your business, positioning you at the forefront of success in the **real estate industry**." | *(delete both blocks)* | Promotional close and an empty H2. The contents list goes from 9 to 8 H2s and the anchor `#so-why-wait` is removed. No duplicate headings exist, so other anchor ids do not shift. | F: anchor, headings |
| RE-5 | Could | **ELIGIBLE** | `content` B88 | The real magic lies in **personalizing communications**—a proven way to strengthen buyer relationships. | The real magic lies in **personalizing communications**—an effective way to strengthen buyer relationships. | "Proven" with no evidence. The title's "Proven" is not touched. | I |

### 2.7 `/blog/importance-of-content-writing` — one publish

| ID | Pri | Status | Field | Current text (exact) | Replacement (exact) | Rationale | F/I |
|---|---|---|---|---|---|---|---|
| CW-1 | Could | **ELIGIBLE** | `content` B0 | "Content is the atomic particle of all digital marketing." - **Rebecca Lieb** | "Content is marketing’s atomic particle." - **Rebecca Lieb** | The published wording is **not found** in any source. Lieb's verbatim line, from a 2017 interview with Heidi Cohen about her book *Content: The Atomic Particle of Marketing*, is "…that content is marketing's atomic particle." The replacement uses her words. **Alternative:** delete B0. | F (verbatim, dated source) |

### 2.8 Image alt text: `Asset › Title` only (never Description, which would add a visible caption)

ALT-1 to ALT-11 carry Title edits. Each asset id appears **only in its own article** on the live site (§3).

| ID | Pri | Status | Article · block | Asset id | Current Title = alt (exact) | Proposed Title (exact) |
|---|---|---|---|---|---|---|
| ALT-1 | Should | **ELIGIBLE (COND.)** | RE · B9 | `edrNvzlzKbuqoR90B9zJT` | MappedSkills Digital Marketing for real estate leveraging social-media platform | People connected in a network around the words "Social Media" |
| ALT-2 | Should | **ELIGIBLE (COND.)** | RE · B25 | `JtCtdm6VS4yQZyLnhal1F` | MappedSkills Digital Marketing for real estate content marketing | Person typing on a laptop showing the words "Content Marketing" |
| ALT-3 | Should | **ELIGIBLE (COND.)** | RE · B37 | `3GYCz8DFPCNtYlUHEzpyjs` | MappedSkills Digital Marketing for real estate targeted advertising | Hand writing "Targeted Advertising" on dark paper |
| ALT-4 | Should | **ELIGIBLE (COND.)** | RE · B54 | `23c18SCtXmfc4PzrOkCrJu` | MappedSkills Digital Marketing for real estate online presence | Hand touching a screen showing "SEO" and related search terms |
| ALT-5 | Should | **ELIGIBLE (COND.)** | RE · B71 | `ZUAvU0mabICC5aiiyCLBz` | MappedSkills Digital Marketing for real estate email marketing | Hand holding a paper envelope above the words "Email Marketing" |
| ALT-6 | Should | **ELIGIBLE (COND.)** | RE · B84 | `5R9PsccrbEtHXpqZBK1bJU` | MappedSkills Digital Marketing for real estate crm tools | "CRM: Customer Relationship Management" written by hand |
| ALT-7 | Should | **ELIGIBLE (COND.)** | RE · B97 | `7tLjdzDTiKZc5TcgRiIm4s` | MappedSkills Digital Marketing for real estate Analytics Metrics | Person viewing a screen of data flows and analytics charts |
| ALT-8 | **Must** | **ELIGIBLE (COND.)** | EM · B3 | `5e9thaSfgVbqAoKuSHq2Y5` | BlogDetailsA | Notebook labelled "Goal Getter" beside a laptop and phone |
| ALT-9 | Should | **ELIGIBLE (COND.)** | CM · B18 | `4lUvzUnU3zgz6CXx1IOwVA` | MappedSkills Content Marketing Services types of content | Camera, laptop, notebook and glasses on a desk |
| ALT-10 | Should | **HOLD** (owner) | CM · B57 | `DaZDs4Sdt7PkGkPmQSRHJ` | MappedSkills Content Marketing Services Cost of Content Creation | *(proposed, not for publication: "Content strategy cycle: create, research, measure, promote, publish, optimise")* |
| ALT-11 | Should | **ELIGIBLE (COND.)** | SEO · B40 | `2gTFCUjmO5Q1idHo6RtnD1` | Our SEO Services in Pune | Six SEO pillars that drive qualified leads: technical SEO, on-page SEO, content strategy, local SEO, authority building, and reporting and growth |

**Notes on the alt-text items:**

- **Proposed text:** each proposed Title describes the image as I saw it on 2026-10-20 (I).
- **Watermark:** 9 of the 11 images carry a "MappedSkills Marketing / Clicks to Customers" watermark. That is a brand
  matter and is not addressed here.
- **ALT-8:** the image is decorative, so an empty alt (`alt=""`) would be ideal. Whether this space allows publishing
  an asset with an empty Title is **UNKNOWN**. The text above is the fallback.
- **ALT-11:** "Pune" leaves this one alt attribute; the body, title and H1 keep it. The image's own subtitle says "the
  best SEO company in Pune", which is held with the D-6 "Best" decision.

**Featured-image alt values (`og:image:alt` only) — held as metadata, not part of the 41:**

| Asset | Title | Used by | Note |
|---|---|---|---|
| `4JhD04rM8Z8AhDq5pr0A2J` | blog-details-img | **Shared** by the EM and PM articles | One edit changes both |
| `4XTbYWClKHjQR4s2dNqbGZ` | Mappedskills Digital-Marketing-Strategies-for-Real-Estate | RE | |
| `61hi8K3M07Udh4v9RTIQh6` | Best SEO Company in Pune | SEO | Contains "Best", held under D-6 |

## 3. Dependencies and effects on other published content

### 3.1 Shared assets (documented before any Title edit is proposed)

**Crawl:** the live site, all 31 sitemap URLs plus 4 index pages, searched for each asset id (VERIFIED FACT).

| Asset | Where it renders | Effect of a Title edit |
|---|---|---|
| ALT-1–9, ALT-11 assets | Only the body of their own article | Only that `<img alt>` changes |
| **`DaZDs4Sdt7PkGkPmQSRHJ` (ALT-10)** | CM body (B57) **and** the CM featured image: `og:image` and `og:image:alt` | The body alt **and** the social-share alt both change. The `og:image:alt` change touches SEO/social metadata, which is frozen unless approved, so **HOLD** |
| `4JhD04rM8Z8AhDq5pr0A2J` | Featured image of **two** articles (EM and PM); `og:image` only | Held (metadata) |
| *Any asset* | References from unpublished entries, or from content types not rendered on the site | **UNKNOWN.** Check Contentful › Asset › "References" (P4) before each Title edit; this is why the alt items are "COND." |

`/blog` listing cards do **not** render featured images (VERIFIED FACT: no asset ids on `/blog`).

### 3.2 Displayed "Updated" date — **yes, it changes on every entry publish**

| Where | Source | Effect of publishing a Post | Label |
|---|---|---|---|
| Article byline "Updated <date>" and `<time datetime>` | `sys.publishedAt`, the latest publish (`mappers.ts` lines 104–107, `ArticleBody.tsx` lines 40–42) | Becomes the publish date (for example "Updated October 21, 2026"). It is shown whenever that date differs from the first-publish date. All 7 articles currently show "Updated September 18" or "September 24, 2026" | F (code) |
| `Article.dateModified` JSON-LD and `article:modified_time` | `updatedAtISO` = `sys.publishedAt` | Changes to the publish timestamp | F (code) |
| `datePublished`, the `/blog` card date, the related-article card dates | `sys.firstPublishedAt` | **Unchanged** | F (code) |
| `/blog` listing order | `order: sys_firstPublishedAt_DESC` | **Unchanged** | F (code) |
| Sitemap | No `lastmod` emitted | **Unchanged** | F (live sitemap) |
| **Asset** publish (the alt-text items) | The Post's `sys` is not touched | The article's "Updated" date should **not** change | **WORKING HYPOTHESIS.** Confirm after the first asset publish by checking that the `<time>` is unchanged |

**Consequence: publish each entry once.** A second publish (FB-3, CM-3b, EM-1, RE-2 or PM-3 later) moves the date
again.

### 3.3 Other effects

| Effect | Where else it shows | Label |
|---|---|---|
| **Reading time** ("N min read") is recalculated from the word count (`ceil(words/200)`). Deletions (FB-2, CM-2, RE-3, RE-4, SEO-2) may lower it by about 1 minute | Article hero, **`/blog` listing card**, and **related-article cards on other articles** | F: mechanism. I: whether a given article crosses a boundary (the renderer's word count is not reproducible from HTML) |
| Contents list: RE drops from 9 to 8 H2s. FB is unchanged while FB-3 is held | That article only. The anchors `#so-why-wait` (and later possibly `#proof-through-relevant-campaign-experience`) stop resolving | F |
| CM-1 removes one outbound link (Statista) | — | F |
| New in-body links to `/schedule-call` (FB-1, FB-4) | `DEC-067`: GTM v4 has no active tag that depends on article elements; no new events | F (record) |
| Search snippets and answer engines may re-crawl and quote the softened FAQ (SEO-5) | — | I. Optional Search Console before/after check; **no item needs Search Console to proceed** |
| No claim in this manifest appears on any non-blog page | — | F (sitewide search: booking wording, "3 to 6 months", ₹, client names, ROI and guarantee phrases occur only in these articles. "AnybodyCanBake" also appears on `/work` and its Google Ads case study) |

### 3.4 Claims that must be corrected together (same publish)

| Group | Items | Why |
|---|---|---|
| Booking wording | SEO-1 + SEO-3; FB-1 + FB-4 | The same phrase appears twice per article |
| Timeline | **SEO-4 + SEO-5** | The same "3 to 6 months" claim, in body and FAQ |
| Guarantee / "ensures" | PM-1 + PM-4 + PM-5; CM-5 + CM-6 | The same claim class within an article |
| Writer notes | SEO-2; FB-2 | Different articles, same defect |
| Prices | CM-3a + (CM-3b if decided) | One section; a partial fix leaves mixed figures |
| Author quotes | EM-1 + RE-2 | The same attribution question, answered once by Amit Gupta |

**Related claims outside the 41 (not counted; owner may extend a decision):**

- **R-1:** FB B83–B92 timeline ("First 2 weeks… Months 2–3") and FAQ B136 ("…over one to three months"). These are
  hedged with "usually" and "Results vary", but they belong to the same class as SEO-4 and SEO-5. If the owner wants
  them softened, decide **before** the FB publish so FB-5 ships with the final text.
- **R-2:** the residual first sentence of CM-1 ("has seen a surge … investing heavily"), unsourced.

## 4. Per-article implementation and verification sequence (prepared, not executed)

### Pre-flight, once (no edits)

- **P1.** The owner approves this manifest, item by item or as a whole, and answers §5.
- **P2.** Confirm the Contentful environment that production reads (`CONTENTFUL_ENVIRONMENT` on the host).
- **P3.** For each of the 7 Post entries, check that the status is "Published", not "Changed", so no stray draft is
  published with the edit. Record the entry version number.
- **P4.** For each ALT asset, open "References" and confirm that only its own article references it. If any other
  entry does, move that item to HOLD.
- **P5.** "Before" snapshot = `evidence/live-blocks-2026-10-20.json`. A CMA export by an admin is recommended if
  available; whether Contentful version history is available on this plan is **UNKNOWN**.

### Order, with each article published once

| Step | Article | Apply in one edit | Then publish | Waits for |
|---|---|---|---|---|
| 1 | seo-company-in-pune | SEO-1, 2, 3, 4, 5 | Yes | — |
| 2 | facebook-advertising-agency-pune | FB-1, 2, 4, 5 (+ R-1 if the owner extends) | Yes | R-1 decision, optional. FB-3 later = a 2nd publish |
| 3 | content-marketing-services-in-pune | CM-1, 2, 3a, 5, 6 (+ CM-3b if decided) | Yes | **CM-3b decision recommended first** |
| 4 | performance-marketing-vs-digital-marketing | PM-1, 2, 4, 5 | Yes | — (PM-3 later only if it changes) |
| 5 | building-an-email-list | EM-2, 3 (+ EM-1 outcome) | Yes | **EM-1 answer recommended first** (no Must here) |
| 6 | 7-proven-strategies… | RE-1, 3, 4, 5 (+ RE-2 outcome) | Yes | **RE-2 answer recommended first** (no Must here) |
| 7 | importance-of-content-writing | CW-1 | Yes | — |
| 8 | Assets | ALT-8 first, then ALT-1–7, ALT-9, ALT-11 | Publish each asset | P4 passed |

### Verification after each publish (wait at least 60 s for ISR)

1. **Text:** fetch `https://mappedskills.com/blog/<slug>`. Every "current text" string for the applied items is absent;
   every replacement string is present.
2. **Links:** SEO-1, SEO-3, FB-1 and FB-4 link to `/schedule-call`. The Statista link is gone (CM-1).
3. **Unchanged:** `<title>`, H1, meta description, canonical, `og:title`, the excerpt on `/blog`, the
   BreadcrumbList JSON-LD and `datePublished`.
4. **Expected changes:** the byline `<time>`, `dateModified` and `article:modified_time` show the publish time. Reading
   time on the article and on its `/blog` card may change by about 1 minute.
5. **Structure:** the FB table renders as `.ba-table` with 1 header row and 3 rows. RE's contents list has 8 entries.
   There are 0 `<figcaption>` elements.
6. **Assets:** the new `alt` is present. The article's `<time>` is **unchanged**, which confirms the §3.2 hypothesis.
   `og:image:alt` is unchanged everywhere (ALT-10 is held).
7. **Final probe totals:** booking wording 0, writer-note phrases 0, "3 to 6 months" 0, ₹ figures 4 (or 0 if CM-3b
   ships).
8. If anything regresses, restore the recorded entry version in Contentful. This is a content-only rollback; no
   deploy is involved.

## 5. Owner approval gate

**Approve to publish (35 change units):**

- the 25 ELIGIBLE text units;
- the 10 ELIGIBLE (CONDITIONAL) alt units, subject to P4.

**Blocked:**

| Unit | Blocked on |
|---|---|
| FB-3 | **Q1.** Does HOLD mean "keep the list live while evidence is gathered", or "remove B67–B70 now and restore verified names later"? AnybodyCanBake's case study on the site is Google Ads, not paid social. |
| CM-3b | **Q2.** Extend the price-removal decision to the tools (B59) and freelancer (B60) figures? |
| EM-1, RE-2 | **Q3.** Amit Gupta to confirm he wrote both quotes. No external source exists either way. |
| PM-3 | **Q4.** Keep the secondary-sourced Godin attribution, or delete the quote, if no primary source is found? |
| ALT-10 | Held per the owner decision. It is the CM featured image, so its `og:image:alt` would change. |
| R-1 *(optional)* | **Q5.** Soften the FB timeline the same way as SEO-4 and SEO-5? |

## 6. Sources (attribution research, 2026-10-20)

- Perelman: [AdExchanger, "Content Is King, Distribution Is Queen and She Wears The Pants" (J. Perelman, 12 Nov 2013)](https://adexchanger.com/data-driven-thinking/content-is-king-distribution-is-queen-and-she-wears-the-pants); [News Media Alliance mediaXchange 2017 recap](https://www.newsmediaalliance.org/mxc17-perelman-content/)
- Lieb: [Heidi Cohen interview, 24 Jun 2017](https://heidicohen.com/books/content-the-atomic-particle-of-marketing/); [Kogan Page, *Content: The Atomic Particle of Marketing*](https://www.koganpage.com/marketing-communications/content-the-atomic-particle-of-marketing-9780749479756)
- Godin (secondary only): [Huble, Seth Godin quotes / London 2015 event](https://huble.com/blog/top-inspirational-quotes-seth-godin); [Figmints quote round-up](https://www.figmints.com/top-digital-marketing-quotes-to-guide-you-in-2017/)
- EM-1 and RE-2: no matching source found. The searches returned only the generic "the money's in your list" saying ([SmartCompany](https://www.smartcompany.com.au/mentor/the-relationship-is-in-your-list/)) and unrelated "sell the dream" articles ([Bruce Turkel](https://bruceturkel.com/blog/selling-the-dream-1965-and-today/)).
