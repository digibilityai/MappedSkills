# BL-D6 · Contentful Editorial Corrections — Audit & Proposal (2026-10-20)

**Status: PROPOSAL ONLY, awaiting owner approval.** Contentful has not been edited or published. No website code,
governance document, commit, PR, merge or deployment was touched. This file and `evidence/` are untracked.

**Starting points:** `docs/blog-redesign/bl-d6/BL_D6_EDITORIAL_CORRECTIONS.md` (on `main` at `ad23aaf`) and `DEC-067`.
**Read with:** `DEC-051` (operating facts), `DEC-061` (no published prices or ranges), `DEC-062` (no booking wording),
`DEC-067` direction 7 (Pune titles, H1s and meta are held).

---

## 0. Method, limits and one count discrepancy

**How each item was verified (VERIFIED FACT, 2026-10-20 15:26 IST).** I fetched all 7 live articles from
`https://mappedskills.com/blog/<slug>` and parsed the top-level children of the article body (`.ba-prose`). I located
each "Find" text and recorded its block index, tag, bold marks and link targets. I also collected every image's `alt`,
the head meta and the JSON-LD.
Production renders **published** Contentful (`revalidate = 60`), so this is the published state.
Evidence: `evidence/live-find-2026-10-20.txt` (every match) and `evidence/live-blocks-2026-10-20.json` (every block).

**Limits:**

- **No direct Contentful read.** The four `CONTENTFUL_*` values in `.env.local` are empty. Unpublished drafts, the
  version history and the asset reference lists were therefore **not** visible. **UNKNOWN:** whether any entry has an
  unpublished draft that differs from live. Check this in the editor before editing; see §4, step P3.
- **Asset fields are inferred.** The renderer sets `alt = asset.description || asset.title` and shows `description` as
  a `<figcaption>`. Live pages have **0** `<figcaption>` elements, so every body image has an **empty Description** and
  its alt text is its **Title** (VERIFIED FACT by inference from the rendered HTML).

**Count discrepancy (flag, not corrected).** `DEC-067` and the release report say "24 items, 10 Must". The correction
list on `main` contains **23** IDs: SEO 4, FB 4, CM 4, EM 3, PM 3, RE 4 and CW 1. That is 10 Must, 8 Should and 5
Could, and its own §2 totals also add up to 23. No item appears to be missing; the "24" looks like a counting slip.
Governance documents were not edited, as instructed. Correcting the figure in a later records PR is for the owner to
decide.

## 1. Verification result

| Result | Items |
|---|---|
| **All 23 recorded items still live, word for word, at the recorded block positions** | SEO-1–4, FB-1–4, CM-1–4, EM-1–3, PM-1–3, RE-1–4, CW-1 |
| Minor recording differences (no effect on the fix) | SEO-2: "Results vary." is **bold** live. SEO-3: the link text is **not bold** live. SEO-1: a bold ". " follows the link. |
| **New issues found in this audit** (prefixed ★ below) | SEO-5, FB-5, CM-5, CM-6, PM-4, PM-5, RE-5; image alt text ALT-1 to ALT-11; held items OG-1 to OG-3 |
| Live counts today | Booking wording: **4**. Published writer notes: **4 blocks in 2 articles**. Unsupported price ranges: **3**. Images with alt text that is not descriptive: **11 of 11**. |
| Structured data | No `FAQPage` JSON-LD is emitted (the `faqs` field is empty; the FAQs are body text). Body edits therefore cannot create a schema mismatch. `Article.dateModified` will change; see §5. |

## 2. Proposal by article

**Conventions:**

- **Field:**
  - `Post › content` means the rich-text body of the Post entry; Bn is the block index in the evidence file.
  - `Asset › Title` means the asset's Title field.
- **Formatting in the Find and Replace columns:** `**x**` is bold and `[x](url)` is a link.
- **Bold keyword spans are kept** (for example **content marketing agency in Pune**), to protect the Pune-focused SEO
  terms.
- **Evidence label:** the label of the *current* text.

**Not changed by any item:** titles, H1s, slugs, SEO titles, meta descriptions, excerpts and URLs. The single
exception is the optional `og:image:alt` side effect described in ALT-10.

### 2.1 `/blog/seo-company-in-pune` (Pune; entry title "Best SEO Company in Pune…" held)

| ID | Pri | Field | Find (exact, live) | Replace with (exact) | Rationale |
|---|---|---|---|---|---|
| SEO-1 | **Must** | `content` B3 | If you want SEO that supports business growth instead of vanity metrics, [**Book a Client Discovery Call (30 minutes)**](/schedule-call)**.** | If you want SEO that supports business growth instead of vanity metrics, [**request a call**](/schedule-call) and we'll get in touch to find a time. | Implies a booked appointment (contrary to `DEC-062` item 1). The 30-minute length is not a confirmed fact (`DEC-051`) [UNKNOWN]. The wording matches the approved `/schedule-call` description. |
| SEO-2 | **Must** | `content` B122 | **Results vary.** If you want this page to convert better, add first-party proof like case study summaries, before/after examples, or reporting snapshots. | **Results vary.** | Internal writer note published to readers [VERIFIED FACT]. |
| SEO-3 | **Must** | `content` B146 | [Book a Client Discovery Call (30 minutes).](/schedule-call) | [Request a call](/schedule-call) and we'll get in touch to find a time. | As SEO-1. |
| SEO-4 | Should | `content` B118 | Most businesses start seeing meaningful movement in 3 to 6 months, depending on: | How quickly things move depends on: | The timeline is stated as typical without evidence [RESEARCH REQUIRED]. **Owner alternative:** keep it and cite first-party evidence. |
| ★SEO-5 | Should | `content` B131 (FAQ answer to "How long does SEO take to show results?") | SEO is a long-term investment. Many businesses start seeing meaningful improvements within 3 to 6 months, depending on competition, website condition, and implementation quality. | SEO is a long-term investment. How quickly you see improvements depends on competition, website condition, and implementation quality. | Repeats SEO-4. Fixing only one would leave the claim live. Decide **together with SEO-4**. |

### 2.2 `/blog/facebook-advertising-agency-pune` (Pune)

| ID | Pri | Field | Find (exact, live) | Replace with (exact) | Rationale |
|---|---|---|---|---|---|
| FB-1 | **Must** | `content` B3 | **Book a Client Discovery Call (30 minutes).** (not a link) | [**Request a call**](/schedule-call) and we'll get in touch to find a time. | Booking wording (`DEC-062`, `DEC-051`). The current text is also an instruction with no link to act on. |
| FB-2 | **Must** | `content` B71, B72, B73 | "We also recommend supporting this page over time with:" + the ordered list "verified performance snapshots … creative examples where possible" + "That will make the page stronger for both conversion and SEO." | *(delete all three blocks)* | Internal writer note published to readers [VERIFIED FACT]. |
| FB-3 | **Must — owner** | `content` B67–B70 | H2 "Proof Through Relevant Campaign Experience" / "If you are evaluating a Facebook advertising company in Pune, case relevance matters more than generic claims." / "Here are a few examples from our paid social work:" / list "Social Media Ads for OmSaiGroup · GEMS Education · Mohali Citi Center · Advit Prints · AnybodyCanBake" | **A (if the owner confirms some clients):** keep B67–B69 and list only the confirmed clients that MappedSkills may name. Link "AnybodyCanBake" → `/work` (it is on `/work`, which has no per-case URL). **B (no confirmation):** delete B67–B70. | The named clients are used as proof. Only AnybodyCanBake appears on `/work`; OmSaiGroup, GEMS Education, Mohali Citi Center and Advit Prints appear **nowhere** on `/work` (VERIFIED FACT, 0 matches each) [RESEARCH REQUIRED]. Option B removes the H2 and its contents anchor `#proof-through-relevant-campaign-experience` (the contents list goes from 12 to 11 H2s). |
| FB-4 | **Must** | `content` B125 | **Book a Client Discovery Call (30 minutes).** (not a link) | [**Request a call**](/schedule-call) and we'll get in touch to find a time. | As FB-1. |
| ★FB-5 | Should (a11y) | `content` B85–B92 | 8 separate paragraphs: "Timeline" / "What Usually Happens" / "First 2 weeks" / "Setup, launch, early data…" / "Weeks 3–6" / "Testing, pruning weak assets…" / "Months 2–3" / "Better optimization decisions…" | Replace them with **one Contentful table**: header row "Timeline \| What Usually Happens", plus 3 rows of the same cell text. **The wording is unchanged.** | A table has been flattened into paragraphs, so screen readers and sighted readers lose the pairing. The template already renders tables accessibly (`ba-table`, labelled region). The timeline is hedged ("usually") and followed by "Results vary"; I have not flagged it as a claim, but the owner may want to confirm it [WORKING HYPOTHESIS]. |

### 2.3 `/blog/content-marketing-services-in-pune` (Pune)

| ID | Pri | Field | Find (exact, live) | Replace with (exact) | Rationale |
|---|---|---|---|---|---|
| CM-1 | **Must** | `content` B9 | **3. Growing Digital Demand in Pune: The city's digital marketing sector has seen a surge, with businesses investing heavily in online presence. For instance, Pune's [digital advertising spending](https://www.statista.com/outlook/amo/advertising/india) grew by 15% in 2023 alone.** | **3. Growing Digital Demand in Pune: The city's digital marketing sector has seen a surge, with businesses investing heavily in online presence.** | The city-level figure is linked to a **national** (India) source, the figure is unverified, and it dates from 2023 [RESEARCH REQUIRED]. The outbound Statista link is removed with it. **Residual:** the first sentence ("surge", "investing heavily") is also unsourced. The owner may soften it further, but I have not proposed new wording, because any replacement would itself be a claim. |
| CM-2 | **Must** | `content` B64 | This case demonstrates how effective **content marketing** **services** can achieve tangible results. | *(delete the block)* | Refers to a case the article does not contain [VERIFIED FACT]. The "Conclusion" H4 then opens with B65, which reads correctly. |
| CM-3 | Should → **recommend Must** (owner) | `content` B59, B60, B61 | "…which can cost anywhere between ₹5,000 to ₹20,000 per month." / "Rates can range from ₹1,000 to ₹5,000 per article…" / "Costs can range from ₹20,000 to ₹1,00,000 per month, depending on the volume and type of content required." | **Recommended:** remove the figures and keep the comparison. **B59:** "…stock images, or SEO tools, which add to the cost." **B60:** "**2. Hiring a Freelance Content Writer**: Freelancers typically charge per piece or per word, depending on their expertise and the complexity of the content." **B61:** "**3. Agency Content Creation**: Agencies offer full-suite **content marketing services**, often bundled into packages, priced by the volume and type of content required." **Alternative:** keep the figures, introduced by "Typical market ranges vary widely; as a rough guide:", but only if the owner confirms they are current. | Unsourced market prices [RESEARCH REQUIRED]. The **agency** range on a MappedSkills-authored page can be read as MappedSkills' own price band. `DEC-061` (owner requirement: no published price, band or range) applies formally to `/pricing` only, but the risk is the same. **Owner decision.** |
| CM-4 | Could | `content` B0, B1 | "Content is king, but distribution is queen and she wears the pants." / "Jonathan Perelman" | Keep it if the attribution is confirmed against a primary source. Otherwise delete B0 and B1. | Attribution has no source [RESEARCH REQUIRED]. The quote is widely circulated with this attribution [WORKING HYPOTHESIS]. |
| ★CM-5 | Should | `content` B16 | For small businesses in Pune, partnering with a **content marketing agency in Pune** ensures targeted campaigns that deliver maximum ROI. | For small businesses in Pune, partnering with a **content marketing agency in Pune** can help focus campaigns on the audiences that matter most. | "Ensures … maximum ROI" reads as a guarantee (the same class as PM-1). The bold keyword is kept. |
| ★CM-6 | Could | `content` B62 | …hiring professionals ensures quality, consistency, and strategic alignment with your goals. | …hiring professionals can help with quality, consistency, and strategic alignment with your goals. | Removes "ensures", which reads as a guarantee. |

### 2.4 `/blog/building-an-email-list`

| ID | Pri | Field | Find (exact, live) | Replace with (exact) | Rationale |
|---|---|---|---|---|---|
| EM-1 | Should — owner | `content` B0 | "The money is in the list, but the relationship is in the message." - **Amit Gupta** | **If Amit Gupta confirms authorship:** no change. **Otherwise:** delete the attribution, or delete the whole block. | The article's author (byline and JSON-LD) is Amit Gupta, but authorship of the quote itself is not confirmed [RESEARCH REQUIRED]. **Single yes/no from the owner.** |
| EM-2 | Should | `content` B1, last sentence | …let's clear that up: email marketing is still one of the highest ROI channels available, surpassing social media in many ways. | …let's clear that up: email is still one of the most direct ways to stay in touch with people who asked to hear from you. | Comparative ROI claim without a source [RESEARCH REQUIRED]. |
| EM-3 | Should | `content` B28 | Email marketing has consistently shown better conversion rates than many other forms of marketing. | Because subscribers chose to hear from you, email is often where interested readers take the next step. | Comparative claim without a source [RESEARCH REQUIRED]. |

### 2.5 `/blog/performance-marketing-vs-digital-marketing`

| ID | Pri | Field | Find (exact, live) | Replace with (exact) | Rationale |
|---|---|---|---|---|---|
| PM-1 | **Must** | `content` B42 | Performance marketing is ideal for businesses that want measurable results with minimal risk. Whether you want to drive leads, sales, or app downloads, the performance marketing approach guarantees that you get what you pay for. | Performance marketing suits businesses that want measurable results. Whether you want to drive leads, sales, or app downloads, you pay for defined outcomes, such as clicks, leads or sales, so spend is easier to tie to results. | Guarantee language. "With minimal risk" is removed as well, which goes slightly beyond the recorded PM-1 for the same reason. |
| PM-2 | Should | `content` B23 | **3. Higher ROI**: Since you are paying for concrete results, it often provides a better return on investment (ROI). | **3. Clearer Return**: Because you pay for defined outcomes, it is easier to see what the spend produced. | ROI claim without a source. |
| PM-3 | Could | `content` B0 | …the stories you tell." - **Seth Godin** | Keep it if confirmed against a primary source; otherwise delete the attribution. | Attribution has no source [RESEARCH REQUIRED]. |
| ★PM-4 | Should | `content` B51 | …performance-based marketing ensures tangible outcomes by allowing you to pay only for the desired actions. | …performance-based marketing ties spend to tangible outcomes by charging only for the desired actions. | The conclusion repeats the PM-1 guarantee. |
| ★PM-5 | Could | `content` B5 and B21 | B5: "This approach ensures that you only invest in marketing efforts that deliver measurable outcomes." · B21: "…You only pay when specific outcomes are achieved, ensuring that your budget is spent effectively." | B5: "This means your spend is tied to actions you can measure." · B21: "…You only pay when specific outcomes are achieved, which makes it easier to see where your budget goes." | Keeps the article consistent once PM-1 and PM-4 are applied. |

### 2.6 `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers` (title "7 Proven…" unchanged)

| ID | Pri | Field | Find (exact, live) | Replace with (exact) | Rationale |
|---|---|---|---|---|---|
| RE-1 | Should | `content` B106, 2nd sentence | Setting benchmarks, such as increasing web traffic by 20% in three months or reducing customer acquisition costs by 15%, provides clear targets… | Setting benchmarks, such as a target for website traffic or for cost per enquiry over a fixed period, provides clear targets… | The specific percentages read as expected results. |
| RE-2 | Should — owner | `content` B0 | "…sells the dream." -**&nbsp;Amit Gupta** | As EM-1: single yes/no from the owner. | Authorship not confirmed. |
| RE-3 | Could | `content` B7, 2nd sentence | Prepare to take notes—these insights are designed not just to inform, but to deliver results! | *(delete the sentence)* | Promotional promise. |
| RE-4 | Could | `content` B115, B116 | H2 "So why wait?" + "Dive into these tactics with enthusiasm and watch them transform your business, positioning you at the forefront of success in the **real estate industry**." | *(delete both blocks)* | Promotional close, and it adds an empty H2 to the contents list (9 → 8 H2s; the anchor `#so-why-wait` goes). |
| ★RE-5 | Could | `content` B88 | The real magic lies in **personalizing communications**—a proven way to strengthen buyer relationships. | The real magic lies in **personalizing communications**—an effective way to strengthen buyer relationships. | "Proven" with no evidence. The title's "Proven" is not touched (it is held with the titles). |

### 2.7 `/blog/importance-of-content-writing`

| ID | Pri | Field | Find | Replace | Rationale |
|---|---|---|---|---|---|
| CW-1 | Could | `content` B0 | …"Content is the atomic particle of all digital marketing." - **Rebecca Lieb** | Keep it if confirmed against a primary source; otherwise delete the attribution. | Attribution has no source [RESEARCH REQUIRED]. |

No booking wording, internal notes or MappedSkills claims were found in this article (re-checked).

### 2.8 ★ Image alt text (accessibility) — edit `Asset › Title` only

**Why Title and not Description.** The renderer uses Description first as the alt text **and** shows it as a visible
caption. Filling Description would therefore add 11 captions, which is a design change. Editing **Title** changes only
the alt text (VERIFIED FACT, `ArticleRichText.tsx` lines 79–98 on `main`).

**What each asset looks like.** I described each image after viewing it on 2026-10-20. Nine of the eleven carry a
"MappedSkills Marketing / Clicks to Customers" watermark.

| ID | Pri | Article · block | Asset id | Current Title = alt (exact) | Proposed Title | Note |
|---|---|---|---|---|---|---|
| ALT-1 | Should | RE · B9 | `edrNvzlzKbuqoR90B9zJT` | MappedSkills Digital Marketing for real estate leveraging social-media platform | People connected in a network around the words "Social Media" | Keyword string, not a description |
| ALT-2 | Should | RE · B25 | `JtCtdm6VS4yQZyLnhal1F` | MappedSkills Digital Marketing for real estate content marketing | Person typing on a laptop showing the words "Content Marketing" | |
| ALT-3 | Should | RE · B37 | `3GYCz8DFPCNtYlUHEzpyjs` | MappedSkills Digital Marketing for real estate targeted advertising | Hand writing "Targeted Advertising" on dark paper | |
| ALT-4 | Should | RE · B54 | `23c18SCtXmfc4PzrOkCrJu` | MappedSkills Digital Marketing for real estate online presence | Hand touching a screen showing "SEO" and related search terms | The current alt does not match the image |
| ALT-5 | Should | RE · B71 | `ZUAvU0mabICC5aiiyCLBz` | MappedSkills Digital Marketing for real estate email marketing | Hand holding a paper envelope above the words "Email Marketing" | |
| ALT-6 | Should | RE · B84 | `5R9PsccrbEtHXpqZBK1bJU` | MappedSkills Digital Marketing for real estate crm tools | "CRM: Customer Relationship Management" written by hand | |
| ALT-7 | Should | RE · B97 | `7tLjdzDTiKZc5TcgRiIm4s` | MappedSkills Digital Marketing for real estate Analytics Metrics | Person viewing a screen of data flows and analytics charts | |
| ALT-8 | **Must** (a11y) | EM · B3 | `5e9thaSfgVbqAoKuSHq2Y5` | BlogDetailsA | Notebook labelled "Goal Getter" beside a laptop and phone | Meaningless alt text. The image is decorative stock. An empty title (giving `alt=""`) would be ideal, but **UNKNOWN** whether the space allows publishing an asset with no Title; use the text proposed here if it does not |
| ALT-9 | Should | CM · B18 | `4lUvzUnU3zgz6CXx1IOwVA` | MappedSkills Content Marketing Services types of content | Camera, laptop, notebook and glasses on a desk | |
| ALT-10 | Should | CM · B57 | `DaZDs4Sdt7PkGkPmQSRHJ` | MappedSkills Content Marketing Services Cost of Content Creation | Content strategy cycle: create, research, measure, promote, publish, optimise | **Side effect:** this asset is also the CM article's featured image, so its `og:image:alt` (a social metadata tag) changes too. Covered by this approval, or hold the item |
| ALT-11 | Should | SEO · B40 | `2gTFCUjmO5Q1idHo6RtnD1` | Our SEO Services in Pune | Six SEO pillars that drive qualified leads: technical SEO, on-page SEO, content strategy, local SEO, authority building, and reporting and growth | An informative infographic: the alt must carry its content. This drops "Pune" from one alt attribute (the body, title and H1 keep it). The image's own subtitle reads "What the best SEO company in Pune actually delivers"; that superlative is held with the D-6 "Best" decision |

Asset ids are the URL path segment after the space id; see `evidence/live-blocks-2026-10-20.json`.

**Held, not proposed: featured-image alt text.** These values appear only as `og:image:alt`, which is metadata held
under `DEC-067` direction 7.

| ID | Asset | Current Title | Used by | Note |
|---|---|---|---|---|
| OG-1 | `4JhD04rM8Z8AhDq5pr0A2J` | blog-details-img | **Shared** by the email and performance articles | Team stock photo. One edit changes both articles |
| OG-2 | `4XTbYWClKHjQR4s2dNqbGZ` | Mappedskills Digital-Marketing-Strategies-for-Real-Estate | RE article | |
| OG-3 | `61hi8K3M07Udh4v9RTIQh6` | Best SEO Company in Pune | SEO article | Contains "Best", so it is held with D-6 |

The FB and CW articles have **no featured image**; their `og:image` falls back to `/ms_icon.webp`. This is noted only.

## 3. Owner confirmations, evidence and Search Console

| # | Needed for | Question | Type |
|---|---|---|---|
| O1 | FB-3 | For each of OmSaiGroup, GEMS Education, Mohali Citi Center, Advit Prints and AnybodyCanBake: was it a MappedSkills paid-social engagement, and may MappedSkills name the client? | **Owner confirmation (blocks a Must)** |
| O2 | EM-1, RE-2 | Did Amit Gupta write both quotes? | Owner yes/no |
| O3 | CM-3 | Remove the price figures (recommended), or keep them as market ranges confirmed to be current? Should the `DEC-061` no-ranges rule be treated as applying to blog content? | Owner decision |
| O4 | SEO-4, SEO-5 | Is there first-party evidence for "3 to 6 months"? If there is none, both instances are softened. | Evidence |
| O5 | CM-4, PM-3, CW-1 | Primary sources for the three quote attributions. If none is found, the attribution is removed. | Research (can be done without the owner) |
| O6 | ALT-10 | Approve the `og:image:alt` side effect, or hold ALT-10. | Owner decision |
| O7 | FB-5 | Is the ads timeline acceptable as general guidance? (The text is unchanged; only the structure is fixed.) | Owner (optional) |
| GSC | SEO-4/5, FB-3 option B, RE-4 | **No item in this proposal needs Search Console to proceed.** It is useful only as a before/after check: impressions and clicks for queries landing on `seo-company-in-pune` (for example "how long does seo take") and the two Pune articles over the 28 days before and after the edits. The **held** items (titles, H1s, meta, "Best", OG-3) still need Search Console evidence under D-6. | Optional monitoring |

## 4. Recommended implementation sequence (when authorised)

**Principle: one publish per entry.** Each Post publish changes the visible "Updated" date, `Article.dateModified` and
`article:modified_time`. Collect the owner answers (O1–O4) first, then apply **all** approved items for an entry in a
single edit and publish. If O1 is slow, run Wave 1 first. The booking wording conflicts with `DEC-062` today, so its
fixes should not wait.

**Pre-flight (no edits):**

- **P1.** Owner approves this proposal, item by item or by wave, and answers O1–O4 and O6.
- **P2.** Confirm the environment production reads, via `CONTENTFUL_ENVIRONMENT` on the host (not visible locally).
  Edit only in that environment.
- **P3.** For each entry, confirm there is no pending draft (status "Published", not "Changed"). Note the entry version
  and keep the evidence JSON as the "before" snapshot.
- **P4.** For each asset in §2.8, open "References" and confirm it is not used elsewhere (case studies, press, research).
  OG-1 shows that sharing happens.

**Wave 1 — Must items and the no-input Should/Could items, ordered by exposure:**

1. `seo-company-in-pune`: SEO-1, SEO-2, SEO-3 (+ SEO-4/5 per O4)
2. `facebook-advertising-agency-pune`: FB-1, FB-2, FB-4, FB-5 (+ FB-3 per O1 if answered)
3. `content-marketing-services-in-pune`: CM-1, CM-2, CM-5, CM-6 (+ CM-3 per O3)
4. `performance-marketing-vs-digital-marketing`: PM-1, PM-2, PM-4, PM-5
5. `building-an-email-list`: EM-2, EM-3 (+ EM-1 per O2)
6. `7-proven-strategies…`: RE-1, RE-3, RE-4, RE-5 (+ RE-2 per O2)
7. `importance-of-content-writing`: CW-1 (only if O5 is resolved; otherwise skip; it is the only item there)

**Wave 2 — assets (independent of the entry publishes; republishing an asset does not change a Post's "Updated"
date [WORKING HYPOTHESIS: the date comes from the entry's own `sys`]):** ALT-8 first, then ALT-1 to ALT-7, ALT-9,
ALT-11, and ALT-10 per O6.

**Wave 3 (only if Wave 1 ran without the owner answers):** FB-3, CM-3, EM-1, RE-2, SEO-4/5 and the attribution items.
This republishes those entries a second time.

**After each publish:** wait at least 60 seconds (ISR), then re-run the find check against live. Expected results:

- every "Find" string absent and every "Replace" string present;
- the links in SEO-1, SEO-3, FB-1 and FB-4 point to `/schedule-call`;
- 0 `<figcaption>`;
- the new alt values present;
- title, H1, meta description, canonical, Article/Breadcrumb JSON-LD and the excerpt unchanged, **except**
  `dateModified` / `article:modified_time`;
- the contents-list count matches the expected change (FB −1 only under option B; RE −1).

At the end, the BL-D6 probe totals should read: booking wording **0**, writer-note phrases **0**.

## 5. Dependencies and risks

| Risk | Effect | Mitigation |
|---|---|---|
| "Updated" date changes on every edited article | A visible freshness signal. It is legitimate for substantive edits, but repeated republishes look noisy | One publish per entry (§4) |
| No local Contentful access; drafts not visible | A stale draft could be published by mistake | P2–P3 in the editor |
| Shared assets (OG-1 confirmed; CM's ALT-10 doubles as the featured image) | One edit changes several pages or metadata | P4; O6; OG-1 held |
| Rich-text editing | Lost bold keyword marks or links; pasted formatting | Edit text in place; keep the bold keyword spans; verify links after publishing |
| Headings removed (RE-4; FB-3 option B) | Contents entries and anchors `#so-why-wait` and `#proof-through-relevant-campaign-experience` disappear. There are no duplicate headings, so no `-2` suffix shifts | Accept, or keep the headings |
| Outbound Statista link removed (CM-1) | One fewer external citation | It cited the wrong geography |
| FAQ answer softened (SEO-5) | An answer engine may quote a less specific answer | O4; optional Search Console monitoring |
| Rollback | Contentful's version history depends on the plan [UNKNOWN] | Evidence JSON snapshot (P3); a CMA export by an admin if available |
| Analytics | New in-body `/schedule-call` links in the FB article | `DEC-067`: GTM v4 has no active tag that depends on article elements; no new events |
| Out of scope, still open | Header and footer "Book a call" relabel (`DEC-062` D4); held titles and meta (D-6); categories (D-7); watermarked images | Separate approvals |
