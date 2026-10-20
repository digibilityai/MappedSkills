# BL-D6 · Contentful Editorial Corrections — Change Manifest, Gate A freeze (r2, 2026-10-20)

**Status: GATE A — ACKNOWLEDGED by the owner (2026-10-20). Q-A1 to Q-A4 remain PENDING explicit owner confirmation; defaults are proposals only. Owner preference for Q-B1: manual editing in the Contentful web app, with independent verification. Gate B is NOT authorised. Nothing has been executed.** No Contentful entry or asset has been
created, edited, drafted or published. No website code, configuration or governance document has changed. Nothing
has been committed, pushed, merged, deployed or rolled back. This file is untracked.

**Revision:** r2 replaces r1 (15:51 IST). r1 is kept unchanged at
`superseded/BL_D6_CHANGE_MANIFEST_r1_2026-10-20_1551IST.md`.

**Builds on:** `BL_D6_EDITORIAL_PROPOSAL.md` (same folder); `BL_D6_EDITORIAL_CORRECTIONS.md` and `DEC-067` (on `main`,
`ad23aaf`); `DEC-051`, `DEC-061`, `DEC-062`.

**Gate model used in this manifest** (Gate A and Gate B are the owner's; **Gate C is proposed here**):

| Gate | What it authorises | Status |
|---|---|---|
| **A** | This manifest: the wording, the operations, the procedure | **Acknowledged 2026-10-20**; Q-A1 to Q-A4 pending confirmation |
| **B** | Pre-flight, backups, and creating the **unpublished** drafts in Contentful | **Not authorised.** Nothing in §7–§9 may start |
| **C** *(proposed)* | Publishing each reviewed draft, one article at a time | Not authorised |

## Owner decisions applied (final, 2026-10-20, second round)

| Decision | Applied as | Status now |
|---|---|---|
| FB-3: **REMOVE** the unverified paid-social client list | Delete B67–B70, the whole "Proof Through Relevant Campaign Experience" section | READY |
| CM-3a / CM-3b: **REMOVE** all three agency, tools and freelancer price ranges | CM-3a (B61) and CM-3b (B59, B60) reworded with no figures. New CM-7 adjusts the lead-in sentence that promises a cost breakdown | READY |
| SEO-4 / SEO-5: **SOFTEN** both "3 to 6 months" claims | As r1, wording frozen | READY |
| EM-1 / RE-2: **HOLD** pending direct attribution confirmation | No change to B0 of either article | HOLD |
| PM-3: **DELETE** the unsupported Seth Godin quote | Delete PM B0 | READY |
| Facebook article timeline: **SOFTEN** unsupported timing claims | r1's related claim R-1 is promoted to three new units: FB-6 (table labels), FB-7 (FAQ answer), FB-8 (the word "quickly") | READY |
| ALT-10: **HOLD** pending shared-asset verification | No change | HOLD |

r1's open questions Q1–Q5 are all answered by these decisions. **No owner question remains open inside the frozen
scope.** The new questions in §11 concern how Gate B is executed, not the wording.

---

## 0. Evidence basis

| Statement | Label | Source |
|---|---|---|
| All target blocks are still live, word for word. The block counts, the text of every block and the image alt values are identical to the 15:28 IST capture | VERIFIED FACT | Fresh fetch of all 7 articles at **16:02 IST** (10:32Z). New marked-up capture, with bold, italic, links, list items and table cells: `evidence/live-blocks-marked-2026-10-20.json` |
| `article:modified_time` for each article is unchanged: SEO 2026-09-24T12:32:13.272Z · FB 11:45:01.531Z · CM 08:52:50.814Z · RE 09:27:47.453Z · EM 2026-09-18T05:09:40.513Z · PM 05:07:41.212Z · CW 05:05:44.126Z | VERIFIED FACT | Same fetch. These are the baseline values for the concurrency check (§7) |
| Production reads Contentful space `owww06rzpjnj`, environment **`master`**, through the **Delivery** API (published content only) | VERIFIED FACT | The production `.env` and `node-selector.json` define only `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN`; there is no `CONTENTFUL_ENVIRONMENT` and no `CONTENTFUL_PREVIEW_ACCESS_TOKEN`. `lib/contentful/client.ts` falls back to `'master'`, with `isPreview = false`. Only key names were read; no secret value was printed |
| The rendered block index equals the index of the node in the entry's `content` rich-text document | **WORKING HYPOTHESIS** (high confidence) | The renderer maps every block node type to exactly one element. All embedded assets have a URL, so none renders as nothing. There are 0 empty `<p></p>` on any of the 7 articles. **The exact current text is the authoritative anchor; the index is a locator** |
| Contentful **entry IDs** of the 7 Post entries | **UNKNOWN** | The site does not expose them: the post `sys.id` is not mapped, and rich-text JSON is not in the page payload. There is no API access locally (the `.env.local` values are empty). Captured at Gate B pre-flight P2 |
| Asset IDs | VERIFIED FACT | The URL path `images.ctfassets.net/owww06rzpjnj/<assetId>/…`; a full-site crawl at 16:00 IST (§5) |
| Unpublished drafts on the 7 entries; asset references from unpublished or unrendered entries; version-history availability on this plan | **UNKNOWN** | No Contentful access. Gate B pre-flight P3–P5 |
| Reading-time model | VERIFIED FACT (model) + inference (after-values) | A re-implementation of `estimateReadingTime`, which joins all text nodes with no separator and computes `ceil(words/200)`. It reproduces the live "N min read" for **7 of 7** articles exactly |

## 1. Totals and reconciliation

### 1.1 How the count moved from r1 to r2

| | Items | Units | Note |
|---|---|---|---|
| r1 | 41 | 42 | 23 recorded, 7 new text issues, 11 alt candidates. CM-3 was split into 3a and 3b |
| + FB-6 (timeline table labels) | +1 | +1 | Promoted from r1's R-1 by the owner's Facebook timeline decision |
| + FB-7 (FAQ answer B136) | +1 | +1 | Promoted from R-1, same decision |
| + FB-8 ("quickly", B83) | +1 | +1 | Promoted from R-1, same decision; the smallest of the three. **The owner may strike it at Gate A** without affecting any other unit |
| + CM-7 (B58 lead-in) | +1 | +1 | A consequence of removing all CM figures: "Here's a breakdown of typical costs:" would otherwise introduce no costs. **The owner may strike it** |
| **r2** | **45** | **46** | CM-3 is still 2 units. CM-3b covers two blocks (B59, B60) |

### 1.2 Status (deliverable 3)

| Status | Meaning | Text | Alt | **Units** | Members |
|---|---|---|---|---|---|
| **READY** | Wording frozen; executable once Gates B and C are authorised | 32 | — | **32** | SEO-1 to SEO-5 · FB-1 to FB-8 · CM-1, CM-2, CM-3a, CM-3b, CM-5, CM-6, CM-7 · EM-2, EM-3 · PM-1 to PM-5 · RE-1, RE-3, RE-4, RE-5 · CW-1 |
| **CONDITIONAL** | Wording frozen; executable only if pre-flight P4 (Contentful › Asset › References) shows that its own article is the **only** referrer | — | 10 | **10** | ALT-1 to ALT-9, ALT-11 |
| **HOLD** | Not to be drafted | 2 | 1 | **3** | EM-1, RE-2 (attribution); ALT-10 (shared asset) |
| **NO CHANGE** | Resolved as correct | 1 | — | **1** | CM-4 (Perelman attribution verified) |
| **Total** | | **35** | **11** | **46** | |

**Status changes from r1:** FB-3, CM-3b and PM-3 move to READY. EM-1 and RE-2 move from EVIDENCE REQUIRED to HOLD.
ALT-10 stays on HOLD. FB-6, FB-7, FB-8 and CM-7 are new and READY. r1's "EVIDENCE REQUIRED" status is retired.

**Must items:** all 10 original Musts are now READY, including FB-3. CM-3a is a Must by owner decision and is READY.
ALT-8 is a Must (accessibility) and is CONDITIONAL.

**Metadata held outside the 46** (unchanged from r1): the featured-image alt values OG-1 to OG-3 (§5.3).

### 1.3 Expected totals after all READY units are published

Generated from the frozen operations (§4) applied to the 16:02 capture (inference; verified after publication by
checklist §9.3).

| Probe (across all 7 articles) | Now | After |
|---|---|---|
| "Book a Client Discovery Call" / "30 minutes" | 4 / 4 | **0 / 0** |
| Published writer-note phrases | 3 phrases (4 blocks) | **0** |
| "3 to 6 months" | 2 | **0** |
| Facebook durations ("First 2 weeks", "Weeks 3–6", "Months 2–3", "first couple of weeks", "one to three months") | 5 | **0** |
| ₹ figures | 6 | **0** |
| Named paid-social clients | 5 | **0** |
| The 6 in-scope guarantee/"ensures" lines (CM-5, CM-6, PM-1, PM-4, PM-5 ×2) | 6 | **0** (other "ensures" lines remain, see §10) |
| Seth Godin quote | 1 | **0** |
| Statista link | 1 | **0** |
| Amit Gupta quotes (EM B0, RE B0) | 2 | **2** (HOLD) |

## 2. Contentful identifiers and field paths (deliverable 4)

| Thing | Value | Label |
|---|---|---|
| Space | `owww06rzpjnj` | VERIFIED FACT (asset URLs; the production key ends `…pjnj`) |
| Environment | `master` | VERIFIED FACT (§0) |
| Content type | Post (GraphQL `postCollection`). The CMA content-type **ID** is not confirmed | VERIFIED (GraphQL name). The CMA ID is UNKNOWN |
| Body field | `content`, rich text (`content { json links }` in `lib/contentful/queries.ts`) | VERIFIED FACT (code) |
| Asset alt source | Asset `title`; Asset `description` (§5.1) | VERIFIED FACT (code) |
| Rich-text tables are enabled on `content` | Yes. FB B33 and SEO B125 are live `ba-table` tables, with a header row rendered as `<th>` | VERIFIED FACT |
| Relative hyperlinks are accepted | Yes. SEO B3 and B146 already link to `/schedule-call` | VERIFIED FACT |

**Entry IDs (UNKNOWN, captured at P2).** Record each entry's ID, `sys.version` and `sys.publishedVersion` in this
table before any draft is created.

| Article (slug = the Post `slug` field) | Entry ID | `sys.version` | `publishedVersion` | Status at P3 |
|---|---|---|---|---|
| `seo-company-in-pune` | *P2* | *P2* | *P2* | *P3* |
| `facebook-advertising-agency-pune` | *P2* | *P2* | *P2* | *P3* |
| `content-marketing-services-in-pune` | *P2* | *P2* | *P2* | *P3* |
| `building-an-email-list` | *P2* | *P2* | *P2* | *P3* |
| `performance-marketing-vs-digital-marketing` | *P2* | *P2* | *P2* | *P3* |
| `7-proven-strategies-of-digital-marketing-for-real-estate-developers` | *P2* | *P2* | *P2* | *P3* |
| `importance-of-content-writing` | *P2* | *P2* | *P2* | *P3* |

**Block positions.** `Bn` = node `n` (0-based) of `content.json.content`, the top-level nodes. This is a working
hypothesis (§0). The executor must match the **exact current text** in §4 before changing a node. If the text at
`Bn` differs, **stop**: do not search for a "nearby" match.

**Asset IDs** (VERIFIED FACT): see §3.8 and §5.

## 3. The frozen manifest (deliverables 1 and 3)

**Notation:** `**x**` = bold mark; `***x***` = bold + italic; `[x](url)` = hyperlink node. Typographic ’ is
reproduced exactly as it is live. The "Rich-text operation" column says what changes at node level.

**Not changed by any unit:** URLs, slugs, post titles, H1s, SEO titles, excerpts (= meta descriptions), canonicals,
categories, authors, featured images, and every Pune keyword phrase. Existing bold keyword spans are kept.

### 3.1 `/blog/seo-company-in-pune`: 5 READY, one publish

| ID | Pri | Status | Pos | Rich-text operation |
|---|---|---|---|---|
| SEO-1 | Must | READY | B3 | In the hyperlink (`/schedule-call`), change the bold text "Book a Client Discovery Call (30 minutes)" to "request a call"; the bold mark and the link stay. Delete the bold text node ". " after the link. Append the **unbolded** text " and we’ll get in touch to find a time." |
| SEO-2 | Must | READY | B122 | Delete the unbolded text node " If you want this page … reporting snapshots." Keep the bold "Results vary." |
| SEO-3 | Must | READY | B146 | Change the link text to "Request a call" (link kept, not bold). Append the unbolded text " and we’ll get in touch to find a time." after the link |
| SEO-4 | Should | READY | B118 | Replace the paragraph text (no marks) |
| SEO-5 | Should | READY | B131 | Replace the paragraph text (no marks). **Must ship with SEO-4** |

### 3.2 `/blog/facebook-advertising-agency-pune`: 8 READY, one publish

| ID | Pri | Status | Pos | Rich-text operation |
|---|---|---|---|---|
| FB-1 | Must | READY | B3 | The paragraph is one bold text node. Replace it with: a hyperlink to `/schedule-call` whose text is the **bold** "Request a call", then the unbolded " and we’ll get in touch to find a time." |
| FB-2 | Must | READY | B71–B73 | Delete 3 nodes: a paragraph, an ordered list and a paragraph |
| FB-3 | Must | READY | B67–B70 | Delete 4 nodes: the H2 "Proof Through Relevant Campaign Experience", 2 paragraphs and the unordered list. With FB-2, **B67–B73 go as one contiguous range**: B66 (a list) is then followed by B74 (the H2 "What Budget Should You Plan for Facebook Ads?") |
| FB-4 | Must | READY | B125 | As FB-1 |
| FB-5 | Should (a11y) | READY | B85–B92 | Delete the 8 paragraphs. Insert **one table node** at that position: 4 rows × 2 columns, with the **header row on** and bold header text, both as at B33. Each cell holds one paragraph. Cell text is in §4 |
| FB-6 | Should | READY | (in FB-5's table) | The cell labels "Timeline" / "First 2 weeks" / "Weeks 3–6" / "Months 2–3" become "Stage" / "Early stage" / "Middle stage" / "Later stage". The three description cells are unchanged. **Inseparable from FB-5** |
| FB-7 | Should | READY | B136 | Replace the FAQ answer paragraph (no marks). The question H3 at B135 is unchanged |
| FB-8 | Could | READY | B83 | Delete the word " quickly" (one text node, no marks) |

**Why these FB wordings:** the table keeps the order of the stages but no longer states a duration. FB-7's
replacement names the same variables that B93–B94 already list ("offer quality", "audience-market fit", "creative
quality") and B76–B77 ("budget"), so the article does not introduce a new claim.

### 3.3 `/blog/content-marketing-services-in-pune`: 7 READY, 1 NO CHANGE, one publish

| ID | Pri | Status | Pos | Rich-text operation |
|---|---|---|---|---|
| CM-1 | Must | READY | B9 | The paragraph is 3 bold nodes: text, hyperlink (Statista), text. Trim the first node to end at "…online presence." and delete the hyperlink node and the last node |
| CM-2 | Must | READY | B64 | Delete the paragraph. H4 "Conclusion" (B63) is then followed directly by B65 |
| CM-3a | **Must** (owner) | READY | B61 | Replace the unbolded tail after "**content marketing services**": ", often bundled into packages. Costs depend on the volume and type of content required." The two bold spans stay |
| CM-3b | Should → owner REMOVE | READY | B59, B60 | B59: replace the tail after ", or SEO tools, " with "which carry their own costs." B60: replace the unbolded text after "**2. Hiring a Freelance Content Writer**" with ": Freelancers typically charge per piece or per word, depending on their expertise and the complexity of the content." |
| CM-7 | Should (new) | READY | B58 | Change the last sentence to "Here's what drives the cost of each option:" (straight apostrophe, as in the live sentence) |
| CM-5 | Should | READY | B16 | Replace the unbolded tail after "**content marketing agency in Pune**" |
| CM-6 | Could | READY | B62 | Replace "ensures" with "can help with" (one text node) |
| CM-4 | Could | NO CHANGE | B0, B1 | None |

**Must ship together:** CM-3a + CM-3b + CM-7 (one section) and CM-5 + CM-6.

### 3.4 `/blog/building-an-email-list`: 2 READY, 1 HOLD

| ID | Pri | Status | Pos | Rich-text operation |
|---|---|---|---|---|
| EM-1 | Should | **HOLD** | B0 | **Do not touch.** Waiting for Amit Gupta to confirm authorship directly. Confirmed → no change. Not confirmed → delete B0 (a later, second publish) |
| EM-2 | Should | READY | B1 | Replace the clause after "let’s clear that up: " (one text node) |
| EM-3 | Should | READY | B28 | Replace the paragraph text (no marks) |

### 3.5 `/blog/performance-marketing-vs-digital-marketing`: 5 READY, one publish

| ID | Pri | Status | Pos | Rich-text operation |
|---|---|---|---|---|
| PM-3 | Could → owner DELETE | READY | B0 | Delete the paragraph (quote and bold attribution). B1 ("Have you ever wondered…") becomes the first block. `.ba-prose > :first-child { margin-top: 0 }` already handles this; no other style depends on B0 |
| PM-5 | Could | READY | B5, B21 | B5: replace the last sentence. B21: replace the unbolded tail after "**1. Pay for Results**" |
| PM-2 | Should | READY | B23 | Replace the bold label "3. Higher ROI" with "3. Clearer Return" (bold) and the unbolded tail |
| PM-1 | Must | READY | B42 | Replace the paragraph text (no marks) |
| PM-4 | Should | READY | B51 | Replace "ensures tangible outcomes by allowing you to pay" with "ties spend to tangible outcomes by charging" (one text node) |

**Must ship together:** PM-1 + PM-4 + PM-5. All node indexes in §4 refer to the **pre-edit** document.

### 3.6 `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers`: 4 READY, 1 HOLD

| ID | Pri | Status | Pos | Rich-text operation |
|---|---|---|---|---|
| RE-2 | Should | **HOLD** | B0 | **Do not touch** (as EM-1). The optional bold-spacing fix is held with it |
| RE-3 | Could | READY | B7 | In the last text node, delete " Prepare to take notes—these insights are designed not just to inform, but to deliver results!" (from the space before "Prepare" to the end) |
| RE-5 | Could | READY | B88 | Replace "a proven way" with "an effective way" (one text node) |
| RE-1 | Should | READY | B106 | In the last text node, replace "increasing web traffic by 20% in three months or reducing customer acquisition costs by 15%" with "a target for website traffic or for cost per enquiry over a fixed period". The bold "A/B testing" and the bold+italic "digital marketing for real estate" stay |
| RE-4 | Could | READY | B115, B116 | Delete the H2 "So why wait?" and its paragraph. B114 becomes the last block |

### 3.7 `/blog/importance-of-content-writing`: 1 READY

| ID | Pri | Status | Pos | Rich-text operation |
|---|---|---|---|---|
| CW-1 | Could | READY | B0 | Replace the quoted sentence (the first, unbolded text node). The bold "Rebecca Lieb" stays |

### 3.8 Image alt text: asset **Title** only. Never Description (§5.1)

| ID | Pri | Status | Article · pos | Asset ID | Current Title = alt (exact) | Frozen new Title (exact) |
|---|---|---|---|---|---|---|
| ALT-1 | Should | CONDITIONAL | RE · B9 | `edrNvzlzKbuqoR90B9zJT` | MappedSkills Digital Marketing for real estate leveraging social-media platform | People connected in a network around the words "Social Media" |
| ALT-2 | Should | CONDITIONAL | RE · B25 | `JtCtdm6VS4yQZyLnhal1F` | MappedSkills Digital Marketing for real estate content marketing | Person typing on a laptop showing the words "Content Marketing" |
| ALT-3 | Should | CONDITIONAL | RE · B37 | `3GYCz8DFPCNtYlUHEzpyjs` | MappedSkills Digital Marketing for real estate targeted advertising | Hand writing "Targeted Advertising" on dark paper |
| ALT-4 | Should | CONDITIONAL | RE · B54 | `23c18SCtXmfc4PzrOkCrJu` | MappedSkills Digital Marketing for real estate online presence | Hand touching a screen showing "SEO" and related search terms |
| ALT-5 | Should | CONDITIONAL | RE · B71 | `ZUAvU0mabICC5aiiyCLBz` | MappedSkills Digital Marketing for real estate email marketing | Hand holding a paper envelope above the words "Email Marketing" |
| ALT-6 | Should | CONDITIONAL | RE · B84 | `5R9PsccrbEtHXpqZBK1bJU` | MappedSkills Digital Marketing for real estate crm tools | "CRM: Customer Relationship Management" written by hand |
| ALT-7 | Should | CONDITIONAL | RE · B97 | `7tLjdzDTiKZc5TcgRiIm4s` | MappedSkills Digital Marketing for real estate Analytics Metrics | Person viewing a screen of data flows and analytics charts |
| ALT-8 | **Must** | CONDITIONAL | EM · B3 | `5e9thaSfgVbqAoKuSHq2Y5` | BlogDetailsA | Notebook labelled "Goal Getter" beside a laptop and phone |
| ALT-9 | Should | CONDITIONAL | CM · B18 | `4lUvzUnU3zgz6CXx1IOwVA` | MappedSkills Content Marketing Services types of content | Camera, laptop, notebook and glasses on a desk |
| ALT-10 | Should | **HOLD** | CM · B57 + CM featured image | `DaZDs4Sdt7PkGkPmQSRHJ` | MappedSkills Content Marketing Services Cost of Content Creation | *(not frozen; not to be drafted)* |
| ALT-11 | Should | CONDITIONAL | SEO · B40 | `2gTFCUjmO5Q1idHo6RtnD1` | Our SEO Services in Pune | Six SEO pillars that drive qualified leads: technical SEO, on-page SEO, content strategy, local SEO, authority building, and reporting and growth |

**ALT-8 note:** the renderer emits `alt=""` (decorative) when both Title and Description are empty (VERIFIED FACT,
`ArticleRichText.tsx` line 79). Whether this space lets an asset be published with an empty Title is **UNKNOWN**. The
frozen text above is used unless the owner chooses the empty-Title option at Gate A **and** P5 shows it is allowed.

**Asset IDs and the "Updated" date:** an asset publish does not touch the Post's `sys`. The article date should
therefore not move (**WORKING HYPOTHESIS**, checked by §9.3 A3).

## 4. Exact before-and-after diffs for every READY text unit (deliverable 5)

How these were made: the "−" lines are the live blocks captured at 16:02 IST (`evidence/live-blocks-marked-2026-10-20.json`).
The "+" lines are the frozen replacements. Both were generated from one operations file, so the "−" text is
copied from the capture, not retyped. Block indexes are **pre-edit**. `[Bn tag]` shows the block; list items are
shown as `•` and table rows as `⏎`. A unit with only "−" lines is a deletion. The ALT diffs are the Current → New
columns of §3.8.

#### `/blog/seo-company-in-pune`

**SEO-1** · `content` B3 · replace block text

```diff
- [B3 p] If you want SEO that supports business growth instead of vanity metrics, [**Book a Client Discovery Call (30 minutes)**](/schedule-call)**. **
+ [B3 p] If you want SEO that supports business growth instead of vanity metrics, [**request a call**](/schedule-call) and we’ll get in touch to find a time.
```

**SEO-2** · `content` B122 · replace block text

```diff
- [B122 p] **Results vary.** If you want this page to convert better, add first-party proof like case study summaries, before/after examples, or reporting snapshots.
+ [B122 p] **Results vary.**
```

**SEO-3** · `content` B146 · replace block text

```diff
- [B146 p] [Book a Client Discovery Call (30 minutes).](/schedule-call)
+ [B146 p] [Request a call](/schedule-call) and we’ll get in touch to find a time.
```

**SEO-4** · `content` B118 · replace block text

```diff
- [B118 p] Most businesses start seeing meaningful movement in 3 to 6 months, depending on:
+ [B118 p] The time it takes to see meaningful movement depends on:
```

**SEO-5** · `content` B131 · replace block text

```diff
- [B131 p] SEO is a long-term investment. Many businesses start seeing meaningful improvements within 3 to 6 months, depending on competition, website condition, and implementation quality.
+ [B131 p] SEO is a long-term investment. The time it takes to see meaningful improvements varies with competition, website condition, and implementation quality.
```


#### `/blog/facebook-advertising-agency-pune`

**FB-1** · `content` B3 · replace block text

```diff
- [B3 p] **Book a Client Discovery Call (30 minutes).**
+ [B3 p] [**Request a call**](/schedule-call) and we’ll get in touch to find a time.
```

**FB-3** · `content` B67, B68, B69, B70 · delete blocks

```diff
- [B67 h2] Proof Through Relevant Campaign Experience
- [B68 p] If you are evaluating a Facebook advertising company in Pune, case relevance matters more than generic claims.
- [B69 p] Here are a few examples from our paid social work:
- [B70 ul] • Social Media Ads for OmSaiGroup • Social Media Ads for GEMS Education • Social Media Ads for Mohali Citi Center • Social Media Ads for Advit Prints • Social Media Ads for AnybodyCanBake
```

**FB-2** · `content` B71, B72, B73 · delete blocks

```diff
- [B71 p] We also recommend supporting this page over time with:
- [B72 ol] • 1. verified performance snapshots • 2. campaign objective summaries • 3. before/after efficiency improvements • 4. vertical-specific case notes • 5. creative examples where possible
- [B73 p] That will make the page stronger for both conversion and SEO.
```

**FB-8** · `content` B83 · replace block text

```diff
- [B83 p] Facebook and Instagram ads can generate early signals quickly, but meaningful performance improvement usually comes through structured testing and optimization.
+ [B83 p] Facebook and Instagram ads can generate early signals, but meaningful performance improvement usually comes through structured testing and optimization.
```

**FB-5+FB-6** · `content` B85, B86, B87, B88, B89, B90, B91, B92 · replace 8 paragraphs with one table

```diff
- [B85 p] Timeline
- [B86 p] What Usually Happens
- [B87 p] First 2 weeks
- [B88 p] Setup, launch, early data, initial audience and creative signals
- [B89 p] Weeks 3–6
- [B90 p] Testing, pruning weak assets, budget refinement, clearer efficiency trends
- [B91 p] Months 2–3
- [B92 p] Better optimization decisions, more stable performance patterns, stronger retargeting impact
+ [B85 table]
+   header row: Stage | What Usually Happens
+   row 1: Early stage | Setup, launch, early data, initial audience and creative signals
+   row 2: Middle stage | Testing, pruning weak assets, budget refinement, clearer efficiency trends
+   row 3: Later stage | Better optimization decisions, more stable performance patterns, stronger retargeting impact
```

**FB-4** · `content` B125 · replace block text

```diff
- [B125 p] **Book a Client Discovery Call (30 minutes).**
+ [B125 p] [**Request a call**](/schedule-call) and we’ll get in touch to find a time.
```

**FB-7** · `content` B136 · replace block text

```diff
- [B136 p] You may see early performance signals within the first couple of weeks, but stronger efficiency and conversion trends usually become clearer after structured testing and optimization over one to three months.
+ [B136 p] Early performance signals usually appear before clearer efficiency and conversion trends. Those trends come through structured testing and optimization, and how long that takes depends on your offer, audience, creative and budget.
```


#### `/blog/content-marketing-services-in-pune`

**CM-1** · `content` B9 · replace block text

```diff
- [B9 p] **3. Growing Digital Demand in Pune: The city’s digital marketing sector has seen a surge, with businesses investing heavily in online presence. For instance, Pune’s **[**digital advertising spending**](https://www.statista.com/outlook/amo/advertising/india)** grew by 15% in 2023 alone.**
+ [B9 p] **3. Growing Digital Demand in Pune: The city’s digital marketing sector has seen a surge, with businesses investing heavily in online presence.**
```

**CM-5** · `content` B16 · replace block text

```diff
- [B16 p] For small businesses in Pune, partnering with a **content marketing agency in Pune** ensures targeted campaigns that deliver maximum ROI.
+ [B16 p] For small businesses in Pune, partnering with a **content marketing agency in Pune** can help focus campaigns on the audiences that matter most.
```

**CM-7** · `content` B58 · replace block text

```diff
- [B58 p] Understanding the cost of content creation is crucial for budgeting and decision-making. Here's a breakdown of typical costs:
+ [B58 p] Understanding the cost of content creation is crucial for budgeting and decision-making. Here's what drives the cost of each option:
```

**CM-3b** · `content` B59 · replace block text

```diff
- [B59 p] **1. Creating Content Yourself**: The primary cost is time. While you save money, you may need to invest in tools like graphic design software, stock images, or SEO tools, which can cost anywhere between ₹5,000 to ₹20,000 per month.
+ [B59 p] **1. Creating Content Yourself**: The primary cost is time. While you save money, you may need to invest in tools like graphic design software, stock images, or SEO tools, which carry their own costs.
```

**CM-3b** · `content` B60 · replace block text

```diff
- [B60 p] **2. Hiring a Freelance Content Writer**: Freelancers typically charge per piece or per word. Rates can range from ₹1,000 to ₹5,000 per article, depending on their expertise and the complexity of the content.
+ [B60 p] **2. Hiring a Freelance Content Writer**: Freelancers typically charge per piece or per word, depending on their expertise and the complexity of the content.
```

**CM-3a** · `content` B61 · replace block text

```diff
- [B61 p] **3. Agency Content Creation**: Agencies offer full-suite **content marketing services**, often bundled into packages. Costs can range from ₹20,000 to ₹1,00,000 per month, depending on the volume and type of content required.
+ [B61 p] **3. Agency Content Creation**: Agencies offer full-suite **content marketing services**, often bundled into packages. Costs depend on the volume and type of content required.
```

**CM-6** · `content` B62 · replace block text

```diff
- [B62 p] While creating content yourself might seem economical, hiring professionals ensures quality, consistency, and strategic alignment with your goals.
+ [B62 p] While creating content yourself might seem economical, hiring professionals can help with quality, consistency, and strategic alignment with your goals.
```

**CM-2** · `content` B64 · delete block

```diff
- [B64 p] This case demonstrates how effective **content marketing** **services **can achieve tangible results.
```


#### `/blog/building-an-email-list`

**EM-2** · `content` B1 · replace block text

```diff
- [B1 p] Starting from scratch? One of the smartest moves you can make in your marketing career is to build an email list from day one. If you’re still debating its value or think email marketing is outdated, let’s clear that up: email marketing is still one of the highest ROI channels available, surpassing social media in many ways.
+ [B1 p] Starting from scratch? One of the smartest moves you can make in your marketing career is to build an email list from day one. If you’re still debating its value or think email marketing is outdated, let’s clear that up: email is still one of the most direct ways to stay in touch with people who asked to hear from you.
```

**EM-3** · `content` B28 · replace block text

```diff
- [B28 p] Email marketing has consistently shown better conversion rates than many other forms of marketing.
+ [B28 p] Because subscribers chose to hear from you, email is often where interested readers take the next step.
```


#### `/blog/performance-marketing-vs-digital-marketing`

**PM-3** · `content` B0 · delete block

```diff
- [B0 p] "Marketing is no longer about the stuff you make, but about the stories you tell." - **Seth Godin**
```

**PM-5** · `content` B5 · replace block text

```diff
- [B5 p] Performance marketing is a data-driven strategy that emphasizes results-based advertising. In other words, you pay for the specific actions that users take – such as clicks, leads, or sales. This approach ensures that you only invest in marketing efforts that deliver measurable outcomes.
+ [B5 p] Performance marketing is a data-driven strategy that emphasizes results-based advertising. In other words, you pay for the specific actions that users take – such as clicks, leads, or sales. This means your spend is tied to actions you can measure.
```

**PM-5** · `content` B21 · replace block text

```diff
- [B21 p] **1. Pay for Results**: You only pay when specific outcomes are achieved, ensuring that your budget is spent effectively.
+ [B21 p] **1. Pay for Results**: You only pay when specific outcomes are achieved, which makes it easier to see where your budget goes.
```

**PM-2** · `content` B23 · replace block text

```diff
- [B23 p] **3. Higher ROI**: Since you are paying for concrete results, it often provides a better return on investment (ROI).
+ [B23 p] **3. Clearer Return**: Because you pay for defined outcomes, it is easier to see what the spend produced.
```

**PM-1** · `content` B42 · replace block text

```diff
- [B42 p] Performance marketing is ideal for businesses that want measurable results with minimal risk. Whether you want to drive leads, sales, or app downloads, the performance marketing approach guarantees that you get what you pay for.
+ [B42 p] Performance marketing suits businesses that want measurable results. Whether you want to drive leads, sales, or app downloads, you pay for defined outcomes, such as clicks, leads or sales, so spend is easier to tie to results.
```

**PM-4** · `content` B51 · replace block text

```diff
- [B51 p] Digital marketing and performance marketing each have their unique strengths and limitations. While digital marketing focuses on long-term brand growth and awareness, performance-based marketing ensures tangible outcomes by allowing you to pay only for the desired actions. Choosing between these strategies depends on your business objectives, budget, and the type of results you're aiming to achieve.
+ [B51 p] Digital marketing and performance marketing each have their unique strengths and limitations. While digital marketing focuses on long-term brand growth and awareness, performance-based marketing ties spend to tangible outcomes by charging only for the desired actions. Choosing between these strategies depends on your business objectives, budget, and the type of results you're aiming to achieve.
```


#### `/blog/7-proven-strategies-of-digital-marketing-for-real-estate-developers`

**RE-3** · `content` B7 · replace block text

```diff
- [B7 p] Join us as we explore **seven transformative digital marketing strategies for real estate developers** that inspire action and fuel growth like never before. Prepare to take notes—these insights are designed not just to inform, but to deliver results!
+ [B7 p] Join us as we explore **seven transformative digital marketing strategies for real estate developers** that inspire action and fuel growth like never before.
```

**RE-5** · `content` B88 · replace block text

```diff
- [B88 p] The real magic lies in **personalizing communications**—a proven way to strengthen buyer relationships. Tailored messages resonate deeply with clients by addressing their unique preferences and expectations.
+ [B88 p] The real magic lies in **personalizing communications**—an effective way to strengthen buyer relationships. Tailored messages resonate deeply with clients by addressing their unique preferences and expectations.
```

**RE-1** · `content` B106 · replace block text

```diff
- [B106 p] **A/B testing** different ad variations over time further sharpens your approach, ensuring your ***digital marketing for real estate*** efforts remain effective. Setting benchmarks, such as increasing web traffic by 20% in three months or reducing customer acquisition costs by 15%, provides clear targets and a structured path for achieving growth.
+ [B106 p] **A/B testing** different ad variations over time further sharpens your approach, ensuring your ***digital marketing for real estate*** efforts remain effective. Setting benchmarks, such as a target for website traffic or for cost per enquiry over a fixed period, provides clear targets and a structured path for achieving growth.
```

**RE-4** · `content` B115, B116 · delete blocks

```diff
- [B115 h2] So why wait?
- [B116 p] Dive into these tactics with enthusiasm and watch them transform your business, positioning you at the forefront of success in the **real estate industry**.
```


#### `/blog/importance-of-content-writing`

**CW-1** · `content` B0 · replace block text

```diff
- [B0 p] "Content is the atomic particle of all digital marketing." - **Rebecca Lieb**
+ [B0 p] "Content is marketing’s atomic particle." - **Rebecca Lieb**
```


## 5. Shared assets and how the renderer uses Title and Description (deliverable 6)

### 5.1 Renderer behaviour (VERIFIED FACT, code on `main` `ad23aaf`)

| Where | Code | Title | Description |
|---|---|---|---|
| In-body image `alt` | `components/cplus/blog-article/ArticleRichText.tsx` line 79: `alt = asset.description \|\| asset.title \|\| ''` | Used **only when Description is empty** | **Wins over Title** |
| In-body caption | Same file, line 98: `{asset.description ? <figcaption>…}` | — | **Any non-empty Description adds a visible caption** |
| Non-image asset link text | Same file, line 83 | Link text | — |
| Featured image → `og:image:alt` | `lib/contentful/mappers.ts` lines 111–114: `featuredImage.description \|\| featuredImage.title \|\| post.title`; `app/(pages)/blog/[slug]/page.tsx` line 76 | Used when Description is empty | Wins over Title |
| Featured image → `Article` JSON-LD `image` | `page.tsx` line 98 | Not used (URL only) | Not used |
| Article page hero, `/blog` cards | — | The featured image is **not rendered** (no asset IDs on `/blog`; the hero has no image) | — |

**Consequence:** every ALT unit edits **Title only**. Description must stay empty. 0 `<figcaption>` elements are live
on the 7 articles, so every Description is currently empty (inference from the rendering rule). An asset Title edit
does not change the asset URL. The URL is built from the file token and file name, not the Title (inference, high
confidence; checked by §9.3 A2).

### 5.2 Where each asset is referenced (VERIFIED FACT for the live site)

Crawl at 16:00 IST: all 31 sitemap URLs plus `/work`, `/blog`, `/press` and `/research` (35 pages, all 200), searched
for each asset ID.

| Asset | Unit | Live pages that reference it | Roles |
|---|---|---|---|
| `edrNvzlzKbuqoR90B9zJT`, `JtCtdm6VS4yQZyLnhal1F`, `3GYCz8DFPCNtYlUHEzpyjs`, `23c18SCtXmfc4PzrOkCrJu`, `ZUAvU0mabICC5aiiyCLBz`, `5R9PsccrbEtHXpqZBK1bJU`, `7tLjdzDTiKZc5TcgRiIm4s` | ALT-1 to ALT-7 | RE article only | In-body only |
| `5e9thaSfgVbqAoKuSHq2Y5` | ALT-8 | EM article only | In-body only |
| `4lUvzUnU3zgz6CXx1IOwVA` | ALT-9 | CM article only | In-body only |
| `2gTFCUjmO5Q1idHo6RtnD1` | ALT-11 | SEO article only | In-body only |
| **`DaZDs4Sdt7PkGkPmQSRHJ`** | **ALT-10 (HOLD)** | CM article | In-body (B57) **and** the CM featured image → `og:image` + `og:image:alt` |
| `4JhD04rM8Z8AhDq5pr0A2J` | OG-1 (held) | EM **and** PM articles | Featured image of both |
| `4XTbYWClKHjQR4s2dNqbGZ` | OG-2 (held) | RE article | Featured image |
| `61hi8K3M07Udh4v9RTIQh6` | OG-3 (held) | SEO article | Featured image; Title contains "Best" (D-6) |

**What the live crawl cannot see (UNKNOWN):** references from unpublished entries, from entries of content types the
site does not render, and from other environments. This is why ALT-1 to ALT-9 and ALT-11 are CONDITIONAL: pre-flight
P4 opens Contentful › each asset › **References**. If anything other than its own Post appears, that unit moves to
HOLD.

### 5.3 Held metadata (not part of the 46)

OG-1 to OG-3 above, and ALT-10, would each change `og:image:alt`, which is social and SEO metadata. They need a
separate decision.

## 6. Effects of republishing (deliverable 7)

### 6.1 Dates and structured data (VERIFIED FACT from code; the timestamps come from the 16:02 fetch)

| Output | Source | Effect of publishing a Post entry |
|---|---|---|
| Byline "Updated <date>" + `<time datetime>` | `sys.publishedAt` (`mappers.ts` 105–108; `ArticleBody.tsx` 40–42) | **Moves to the publish date.** All 7 currently show "Updated September 24, 2026" or "September 18, 2026", and will show e.g. "Updated October 21, 2026" |
| `article:modified_time`, `Article.dateModified` (JSON-LD) | `updatedAtISO = sys.publishedAt` | **Moves** to the publish timestamp |
| `Article.datePublished`, `/blog` card date, related-card dates | `sys.firstPublishedAt` | **Unchanged** |
| `Article.image`, `og:image` | Featured-image URL | Unchanged (no featured image is edited) |
| `og:image:alt` | Featured-image Description, else Title | Unchanged (ALT-10 and OG-1 to OG-3 are held) |
| `BreadcrumbList` JSON-LD | Title, slug | Unchanged |
| `FAQPage` JSON-LD | `post.faqs` | **Not emitted today**: 0 of 7 articles have one (VERIFIED live). SEO-5 and FB-7 change visible FAQ text only, not structured data |
| Sitemap | No `<lastmod>` emitted (VERIFIED live) | Unchanged |
| **Rollback publish** | Same as any publish | **Moves the date again. The original "Updated September 24/18" can never be restored**, because Contentful does not let `publishedAt` be set. **This is the one irreversible effect; the owner accepts it by approving Gate C** |

### 6.2 Reading time ("N min read")

Model: `ceil(words/200)` over all text nodes joined with no separator. It reproduces 7 of 7 live values (§0). The
"After" column is predicted from the frozen operations (inference).

| Article | Words now → after | Shown now → after | Margin to the next boundary after the change |
|---|---|---|---|
| SEO | 1,653 → 1,636 | 9 → **9** | 36 words above 1,600 |
| **FB** | 1,607 → 1,529 | **9 → 8** | Changes |
| CM | 1,066 → 1,028 | 6 → **6** | 28 words above 1,000 |
| EM | 554 → 561 | 3 → **3** | — |
| PM | 731 → 714 | 4 → **4** | — |
| **RE** | 2,628 → 2,587 | **14 → 13** | Changes |
| CW | 973 → 969 | 5 → **5** | — |

**Where it shows:** the article hero, its `/blog` card and its related-article cards on **other** articles. Those
pages regenerate on their own ISR cycle (60 s), so the FB "8 min" and RE "13 min" appear on other pages
independently of the article.

### 6.3 Ordering, contents lists and anchors

| Effect | Detail | Label |
|---|---|---|
| `/blog` order and related-post order | `order: sys_firstPublishedAt_DESC`, not affected by a republish | VERIFIED FACT (code) |
| FB contents list | 12 → **11** H2s. `#proof-through-relevant-campaign-experience` stops resolving | VERIFIED FACT |
| RE contents list | 9 → **8** H2s. `#so-why-wait` stops resolving | VERIFIED FACT |
| Other heading ids | Unchanged: FB and RE have no duplicate H2/H3 text, so the `-2` suffixes of `createHeadingIdAllocator` cannot shift | VERIFIED FACT |
| Inbound links to the two removed anchors | Only the article's own contents list (35-page crawl) | VERIFIED FACT (live site); external links UNKNOWN |
| Outbound links | −1 (Statista, CM-1) | VERIFIED FACT |
| New in-body links to `/schedule-call` | +2 (FB-1, FB-4). `DEC-067`: GTM v4 has no active tag bound to article elements | VERIFIED FACT (record) |
| FB table accessible name | The renderer labels a table from its first row's text joined with no space, giving "Table: StageWhat Usually Happens". That matches the existing B33 behaviour ("Table: ChannelBest For…"), so this is a pre-existing renderer quirk; it is not fixed here | VERIFIED FACT; out of scope |

## 7. Backup, concurrency check and rollback (deliverable 8). Not to start before Gate B

### 7.1 Gate B pre-flight (once, no edits)

| Step | Action | Pass condition |
|---|---|---|
| P1 | Owner approves Gate A (this manifest) and authorises Gate B in writing | Recorded in chat |
| P2 | For each of the 7 Posts, record the entry ID, `sys.version` and `sys.publishedVersion` in the §2 table | All 7 recorded |
| P3 | **No stray drafts:** each entry's status is **Published**, not **Changed**. For a published entry with no pending draft, `version == publishedVersion + 1` (inference from the CMA versioning rule; confirm on the first entry) | All 7 clean. **If any entry is "Changed", stop and report it: someone else's draft would be published with ours** |
| P4 | Each CONDITIONAL asset › References shows only its own Post | Pass → READY; fail → that unit moves to HOLD |
| P5 | Confirm whether this plan has entry version history ("Versions" sidebar), and whether an asset may be published with an empty Title (ALT-8 option) | Recorded; neither blocks |
| P6 | Live baseline: re-fetch the 7 articles; text, alt and `article:modified_time` still equal §0 | Identical, or stop and re-baseline the manifest |

### 7.2 Backup (before the first draft is created)

1. **Primary backup: the full entry JSON** of each of the 7 Posts and the 10 CONDITIONAL assets, fetched read-only
   through the Content Management API (`GET /spaces/owww06rzpjnj/environments/master/entries/<id>`, and the same for
   `/assets/<id>`), including `sys.version`. Save to `evidence/backup/<entryId>-v<version>.json` and record the SHA-256
   of each file. **This needs a CMA token. How it is provided is a Gate B question (§11 Q-B1). It must never be pasted
   into chat.**
2. **Secondary backup:** `evidence/live-blocks-marked-2026-10-20.json` plus a fresh HTML save of each article at P6.
   This is a rendered copy only; it cannot be re-imported.
3. **Contentful version history**, if P5 shows it exists. Not relied on.

### 7.3 Concurrency check

- **Before editing an entry:** its current `sys.version` equals the P2 value. If it does not, someone has edited it:
  stop, take a new backup, re-diff against §4 and report.
- **Writes through the CMA** send `X-Contentful-Version: <recorded version>`. A **409 VersionMismatch** means a
  concurrent edit: stop. Never retry blindly.
- **Edits in the web app:** confirm that no other collaborator avatar is shown on the entry, and that "Last updated"
  matches the backup.
- **Immediately before each publish (Gate C):** the version equals the version the reviewed draft produced (§8). If it
  has moved, re-review.

### 7.4 Rollback

| Situation | Action | Side effects |
|---|---|---|
| Draft created but **not published** | Restore the backed-up `fields` onto the draft (CMA `PUT` with the current version), or use "Versions" › restore if available. Production is untouched throughout, because it reads published content only | None on the live site |
| **Published**, and a regression is found | PUT the backed-up `fields`, then publish. Re-run §9.3 against the §0 baseline | The "Updated" date moves again (§6.1, irreversible). Content returns to the pre-change text |
| Asset Title published and wrong | PUT the backed-up asset `fields`, then publish the asset | Alt text only |
| Any rollback | Content-only: **no deploy, no code change, no rollback of the website build** | — |

## 8. How unpublished drafts are reviewed before publication (deliverable 9)

1. **Drafts stay invisible to the public:** production uses the Delivery API with no preview token (§0), so a
   "Changed" entry is not served. VERIFIED FACT (configuration).
2. **Local preview render:** a local build of `main` (`ad23aaf` or later) with `CONTENTFUL_SPACE_ID` and
   `CONTENTFUL_PREVIEW_ACCESS_TOKEN` set in the developer's **local** `.env.local` sets `isPreview = true`
   (`client.ts`) and renders the drafts at `http://localhost:<port>/blog/<slug>`. The token is supplied by the owner
   into that file, never into chat or a tracked file.
   **Caution:** preview renders **every** draft in the space. That also helps P3, because a stray draft shows up here.
3. **Automated draft diff** (local preview vs. the §0 live baseline). For each article:
   - every "−" string in §4 is absent;
   - every "+" string is present;
   - **no other block differs** (block-by-block comparison, with the expected count change: SEO 148→148,
     FB 143→129, CM 67→66, EM 45→45, PM 52→51, RE 117→115, CW 57→57);
   - 0 `<figcaption>`;
   - the FB table has 1 header row and 3 rows.
4. **Owner review pack:** a side-by-side screenshot per article (live vs. draft) at 390 px and 1280 px, plus the diff
   report, saved to `editorial/review/` and handed to the owner.
5. **Gate C:** the owner approves publication per article, after reviewing the pack. Nothing is published on the
   strength of Gate B alone.

## 9. Publication order and per-article checklists (deliverable 10)

### 9.1 Order (each article published exactly once)

| Step | Article | Units in one publish | Notes |
|---|---|---|---|
| 1 | seo-company-in-pune | SEO-1 to SEO-5 | Smallest structural risk; proves the procedure |
| 2 | facebook-advertising-agency-pune | FB-1 to FB-8 | The largest change: −14 blocks, +1 table |
| 3 | content-marketing-services-in-pune | CM-1, CM-2, CM-3a, CM-3b, CM-5, CM-6, CM-7 | — |
| 4 | performance-marketing-vs-digital-marketing | PM-1 to PM-5 | — |
| 5 | building-an-email-list | EM-2, EM-3 | EM-1 HOLD. If it is later resolved as "delete", that is a **second publish** (the date moves again) |
| 6 | 7-proven-strategies… | RE-1, RE-3, RE-4, RE-5 | RE-2 HOLD; same note as step 5 |
| 7 | importance-of-content-writing | CW-1 | — |
| 8 | Assets | ALT-8 first, then ALT-1 to ALT-7, ALT-9, ALT-11 | Only those that passed P4; each asset published once |

### 9.2 Before each publish

- [ ] Gate C approval recorded for this article
- [ ] The draft diff (§8 step 3) passed with no unexpected block change
- [ ] The current `sys.version` equals the reviewed draft's version (§7.3)
- [ ] The backup file for this entry exists and its SHA-256 is recorded
- [ ] Note the publish time (UTC)

### 9.3 After each publish (wait ≥ 60 s; request twice, because the first request after the ISR window may still serve the stale page)

**Every article:**

- [ ] T1 · Every "−" string from §4 is absent from `https://mappedskills.com/blog/<slug>`; every "+" string is present
- [ ] T2 · Block count equals the §8 expected value, and no non-target block differs from the baseline
- [ ] T3 · Unchanged: `<title>`, H1, meta description, canonical, `og:title`, `og:image`, `og:image:alt`,
  BreadcrumbList, `datePublished`, the `/blog` card title, excerpt and date
- [ ] T4 · Expected changes only: byline `<time>`, `dateModified` and `article:modified_time` = the publish time;
  reading time = the §6.2 "after" value (on the article, its `/blog` card and its related cards)
- [ ] T5 · 0 `<figcaption>`; HTTP 200; no new console errors
- [ ] T6 · The `/blog` listing order is unchanged

**Per article:**

| Article | Specific checks |
|---|---|
| SEO | `/schedule-call` link present at B3 and B146, link text "request a call" / "Request a call"; "3 to 6 months" = 0; "Book a Client Discovery Call" = 0; 11 contents entries |
| FB | `/schedule-call` link at B3 and B125; client names = 0; durations = 0; `.ba-table` count = 2 (B33 + new), the new one with header "Stage \| What Usually Happens" and 3 rows; contents list 11 entries, without "Proof Through Relevant Campaign Experience"; reading time 8 min |
| CM | ₹ = 0; Statista link = 0; "This case demonstrates" = 0; B57 and B18 images unchanged |
| PM | The first block starts "Have you ever wondered"; "Seth Godin" = 0; "guarantees" = 0; "ensures" = 0 |
| EM | B0 Amit Gupta quote **unchanged** (HOLD); "highest ROI" = 0 |
| RE | B0 quote **unchanged** (HOLD); "So why wait?" = 0; contents list 8 entries; reading time 13 min; the last block starts "These **seven secrets**" |
| CW | B0 reads "Content is marketing’s atomic particle." with bold "Rebecca Lieb" |

**After each asset publish:**

- [ ] A1 · The new `alt` is present on the article
- [ ] A2 · The image `src` is unchanged
- [ ] A3 · The article's `<time>` and `article:modified_time` are **unchanged** (confirms the §3.8 hypothesis)
- [ ] A4 · 0 `<figcaption>`

**Final sweep:** re-crawl the 35 pages. The §1.3 "After" totals hold, and no non-blog page changed.

**Optional (does not block):** a Search Console URL inspection of SEO and FB after the re-crawl.

## 10. Residual observations: NOT in the frozen scope, not counted

Recorded so the owner can decide **before Gate B**. Any later change means a second publish of that article.

| Ref | Article · block | Text | Class |
|---|---|---|---|
| R-2 | CM B9 | "has seen a surge, with businesses investing heavily in online presence" (left after CM-1) | Unsourced market claim |
| R-3 | CM B13, B30, B49, B53 | "…ensuring tailored strategies", "ensures better communication, faster project turnaround", "It ensures full control…", "ensuring consistency and quality" | Same "ensures" class as CM-5 and CM-6 |
| R-4 | RE B62, B92, B106, B112 | "ensures relevance", "ensures potential buyers remain engaged", "ensuring your … efforts remain effective", "ensures precise reach" | Same class |
| R-5 | RE B114 | "preparing for unprecedented growth" | Promotional |
| R-6 | FB and SEO tables | The accessible name joins the first-row text with no space | Renderer (code), not content |

SEO B115 "guarantees #1 rankings" is a warning-signs list item (what to avoid), so it is **not** a claim.

## 11. Questions for the owner at Gate A

| # | Question | Default if not answered |
|---|---|---|
| Q-A1 | Keep **FB-8** (delete "quickly") and **CM-7** (the cost lead-in), or strike either? | Keep both |
| Q-A2 | ALT-8: use the frozen descriptive Title, or an empty Title (decorative, `alt=""`) if P5 allows it? | Descriptive Title |
| Q-A3 | Accept that every publish (and any rollback) permanently moves the "Updated" date (§6.1)? | Required: yes before Gate C |
| Q-A4 | Extend scope to any of R-2 to R-5 before Gate B, to avoid second publishes? | No; scope stays frozen |
| Q-B1 *(for Gate B)* | Who executes: (a) the owner edits in the Contentful web app following §3/§4 while I verify; or (b) a CMA token placed by the owner in a local env file (never chat) for the backup and draft writes, with version headers; plus a preview token for §8 | Must be answered at Gate B |

## 12. Sources (attribution research, 2026-10-20, unchanged from r1)

- Perelman: [AdExchanger, "Content Is King, Distribution Is Queen and She Wears The Pants" (J. Perelman, 12 Nov 2013)](https://adexchanger.com/data-driven-thinking/content-is-king-distribution-is-queen-and-she-wears-the-pants); [News Media Alliance mediaXchange 2017 recap](https://www.newsmediaalliance.org/mxc17-perelman-content/)
- Lieb: [Heidi Cohen interview, 24 Jun 2017](https://heidicohen.com/books/content-the-atomic-particle-of-marketing/); [Kogan Page, *Content: The Atomic Particle of Marketing*](https://www.koganpage.com/marketing-communications/content-the-atomic-particle-of-marketing-9780749479756)
- Godin (secondary only; quote now deleted by owner decision): [Huble](https://huble.com/blog/top-inspirational-quotes-seth-godin); [Figmints](https://www.figmints.com/top-digital-marketing-quotes-to-guide-you-in-2017/)
- EM-1 and RE-2: no matching source found, so they are on HOLD for direct confirmation by the named person.
