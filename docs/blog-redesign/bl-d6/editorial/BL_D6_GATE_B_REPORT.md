# BL-D6 · Gate B Report: Unpublished Drafts Created (2026-10-20)

**Status: DRAFTS COMPLETE AND VERIFIED. Nothing is published.** Owner-authorised Gate B, draft preparation only.

**How the drafts were made:**

- **Where:** the Contentful web app, in the owner's signed-in Chrome session (Claude in Chrome).
- **Method:** each target text range was selected in the editor, and the replacement was typed as real keystrokes.
- **Links:** created with the editor's own "Insert hyperlink" dialog.
- **Table:** created with the editor's Table button.

**Not touched:**

- the website code, configuration, governance documents and Git;
- deploys;
- any publish action.

**Pending changes:** the live site still serves the old content (verified at 12:19Z).

## 1. Preconditions (re-run at the start of Gate B)

| Check | Result |
|---|---|
| P6 live baseline, 11:40Z | 7 of 7 articles identical to the approved capture |
| No unpublished changes | All 7 entries at their recorded versions (89/39/32/14/22/64/17 = published + 1), status Published |
| Recoverable copy | B2 Delivery API JSON snapshot (`evidence/backup-b2-2026-10-20/`, SHA-256 list). It is still exact because no entry version had moved. Contentful Versions holds each entry's last published snapshot as well |

## 2. Drafts created

| Article (entry ID) | Units applied | Blocks before → after | Status |
|---|---|---|---|
| SEO (`1PEIOnxvA5yUZpV9maERO3`) | SEO-1, 2, 3, 4, 5 | 148 → 148 | Changed (draft) |
| FB (`1ANOvipuBDHTO6GnTLXzk1`) | FB-1 to FB-8 (table: header row + 3 rows) | 143 → 129 | Changed (draft) |
| CM (`uCI9MljuTLWHRjQpEVzdW`) | CM-1, 2, 3a, 3b, 5, 6, 7 | 67 → 66 | Changed (draft) |
| EM (`LxmMYSDHf6KZMNMChcHY9`) | EM-2, 3 (**EM-1 held**) | 45 → 45 | Changed (draft) |
| PM (`6u09hoUQVGiU0gbRvqKB5c`) | PM-1 to PM-5 | 52 → 51 | Changed (draft) |
| RE (`5qOyCK0HOEXFN0o1cMZGzs`) | RE-1, 3, 4, 5 (**RE-2 held**) | 117 → 115 | Changed (draft) |
| CW (`3E0NMJ9SZAAjE8ogzANaWF`) | CW-1 | 57 → 57 | Changed (draft) |
| 10 assets | ALT-1 to ALT-9, ALT-11 (Title only; Description left empty) | — | Changed (draft) |
| **Held** | EM-1, RE-2 (B0 quotes unchanged), **ALT-10** (still Published, original Title) | — | Untouched |

**Total: 42 READY units drafted. 3 HOLD units untouched.**

## 3. Verification

| Check | Result |
|---|---|
| Each entry's editor content after a full reload, compared block by block (type, text, bold and italic, links, list items, table cells) with the manifest's approved after-state | **7 of 7 exact.** The per-block hash fingerprints match. The checker also reproduced the untouched FB B33 table exactly |
| Contentful's own compare view (latest Published vs. the current draft) | **"Show only differences (1)" on all 7**: only the `content` field changed. Title, SEO title, keyword, slug, excerpt, category, author and featured image are unchanged |
| Asset drafts | All 10 Titles equal the frozen wording exactly. Description is 0 characters on all 10. Status Changed |
| Held blocks | EM B0 and RE B0 unchanged (inside the matching fingerprints). ALT-10 unchanged and Published |
| Live site, 12:19Z | 7 of 7 articles identical to the baseline: no draft leaked |

**Incidents during editing (all corrected before final verification, none remaining):**

1. RE B88: a space was dropped ("wayto"). Fixed.
2. RE B7: the first Delete did not remove the sentence. Removed with Backspace.
3. CM B58/B59: a selection race split the CM-7 text across two blocks. Moved back.
4. SEO B146: link text replacement escaped the link. The paragraph was rebuilt with the hyperlink dialog.
5. PM B0: the quote deletion left an empty paragraph. Removed.

**Nothing else was modified.** The 7 compare views show exactly one changed field each, and every final fingerprint matches.

## 4. Needs owner review before publication (Gate C)

1. **Review each draft** in Contentful: entry › Versions › select the latest "Published" › **Compare with current version**.
   **Do not click "Apply changes"**; that restores the old content into the draft.
2. **Wording confirmations:**
   - Q-A1: FB-8 and CM-7 exact wording.
   - Q-A2: the ALT-8 descriptive Title.
   Both are in the drafts as frozen in the manifest.
3. **Not yet seen rendered:** the drafts were verified at editor-structure level only. There is no preview token, so the
   website rendering of the drafts (FB table styling, new link styling, contents lists) can only be seen after
   publishing. §9.3 of the manifest covers this.
4. **Exposure while drafts sit:** if anyone publishes one of these entries or assets from the web app, our changes go
   live with it. Keep the time to Gate C short, or ask editors not to publish these items.
5. **Gate C decisions:**
   - publication order (manifest §9.1: SEO → FB → CM → PM → EM → RE → CW → assets);
   - acceptance that each publish moves the "Updated" date (Q-A3, accepted);
   - who clicks Publish.
6. **Rollback if needed:**
   - **before publishing:** Versions › Compare › "Select all fields from this version" › Apply. This restores the
     published content into the draft, so nothing goes live;
   - **after publishing:** the same steps, then publish; or restore from the B2 JSON.

---

## CORRECTION: readiness review, 2026-10-20 12:33Z (read-only)

**§2 and §3 overstated the asset drafts.** Only **5 of 10** asset Title drafts were saved.

**What the review found:**

| Assets | Title now | Status | Version (current / published) |
|---|---|---|---|
| ALT-3, ALT-7, ALT-8, ALT-9, ALT-11 | Frozen new Title | Changed | 5/3 (ALT-11 6/4) |
| ALT-1, ALT-2, ALT-4, ALT-5, ALT-6 | **Original** Title | Published | 4/3: no edit saved |

**Cause:** the Title field autosaves on a delay. The Gate B "Changed" reading was the page's local state, taken about
3 seconds after typing. Navigating to the next asset before the save ran discarded the edit. In each batch, the asset
edited last was saved.

**No other effect:** the 5 unsaved assets are exactly as published. Nothing was lost or published.

**Entry drafts:** not affected. All 7 were re-verified after a reload and are unchanged since Gate B (same
fingerprints, no later saves).

## Re-draft of the 5 unsaved assets (owner-authorised, 2026-10-20)

ALT-1, ALT-2, ALT-4, ALT-5 and ALT-6 were edited one at a time. Each had its Title replaced, focus moved out of the
field, a 10-second wait, then a **full reload**.

**After reload, each shows:**

- the frozen Title;
- Description 0 characters;
- status Changed;
- **Current version 5 / Published version 3**.

**Final asset state:**

- **10 of 10 drafts saved and confirmed.** ALT-1 to ALT-9 are at 5/3 and ALT-11 at 6/4.
- **ALT-10 untouched** (4/3, Published, original Title).
- **Live site:** unchanged.

---

## Gate C log: 1 of 7, SEO article + ALT-11 (owner-authorised, 2026-10-20)

| Step | Result |
|---|---|
| Pre-publish | SEO draft fingerprint unchanged (148 blocks), status Changed |
| Publish entry `1PEIOnxvA5yUZpV9maERO3` | "Published successfully" at **12:44:46Z** (`sys.publishedAt`) |
| Publish asset `2gTFCUjmO5Q1idHo6RtnD1` (ALT-11) | Published at about 12:45:30Z, version 7 / published 6 |
| Live check at 12:47:06Z (second fetch, after the 60 s ISR window) | Body **148/148 blocks exactly match** the approved after-state |
| Probes | "3 to 6 months" 0, "Book a Client Discovery Call" 0, "30 minutes" 0, writer note 0. Body links to `/schedule-call`: 2 |
| Image alt (B40) | The new ALT-11 Title |
| Unchanged | `<title>`, meta description, canonical, `og:title`, `og:image`, `og:image:alt`, H1, `datePublished`, BreadcrumbList, `Article.image`, reading time (9 min), 0 figcaptions, no FAQPage |
| Expected changes | `article:modified_time`, `dateModified` and the byline: Sep 24 → **October 20, 2026 (12:44:46Z)** |
| Asset publish vs. "Updated" date | The byline time equals the **entry** publish time, not the asset's. The hypothesis that an asset publish does not move the date is now **VERIFIED** |
| `/blog` listing | Order unchanged (7 posts); card reading times unchanged |

**Remaining:** 6 articles and 9 assets (all drafts, unpublished). Waiting for owner authorisation for the next article.

## Gate C log: 2 of 7, FB article (owner-authorised, 2026-10-20; no assets)

| Step | Result |
|---|---|
| Pre-publish | FB draft fingerprint unchanged (129 blocks), status Changed |
| Publish entry `1ANOvipuBDHTO6GnTLXzk1` | Published, `sys.publishedAt` **12:48:32Z** |
| Live check at 12:50:05Z | Body **129/129 blocks exactly match** the approved after-state |
| New table | Second `.ba-table` present: 4 rows, 2 header cells ("Stage", "What Usually Happens"), cells exactly as approved; labelled "Table: StageWhat Usually Happens" (the known renderer quirk R-6, same as B33) |
| Contents list | 12 → **11** entries; "Proof Through Relevant Campaign Experience" removed |
| Probes (all 0 after) | 5 client names, 5 duration phrases, the "quickly" phrase, writer-note phrases, booking wording, "30 minutes" |
| Links | 2 body links to `/schedule-call` |
| Unchanged | `<title>`, meta description, canonical, `og:title`, `og:image`, `og:image:alt`, H1, `datePublished`, BreadcrumbList, 0 figcaptions, no FAQPage |
| Expected changes | Updated date → October 20, 2026 (12:48:32Z); reading time **9 → 8 min**, as predicted |
| `/blog` listing | Order unchanged. The FB card showed 9 min on the first fetch (stale-while-revalidate) and **8 min** on the next |

**Remaining:** 5 articles (CM, PM, EM, RE, CW) and 9 assets, all unpublished drafts.

## Gate C log: 3 of 7, CM article + ALT-9 (owner-authorised, 2026-10-20; ALT-10 not published)

| Step | Result |
|---|---|
| Pre-publish | CM draft fingerprint unchanged (66 blocks), status Changed |
| Publish entry `uCI9MljuTLWHRjQpEVzdW` | Published, `sys.publishedAt` **12:52:48Z** |
| Publish asset `4lUvzUnU3zgz6CXx1IOwVA` (ALT-9) | Published at about 12:53:20Z, version 6 / published 5 |
| Live check at 12:54:37Z | Body **66/66 blocks exactly match** the approved after-state |
| Probes (all 0) | ₹, Statista, "This case demonstrates", "breakdown of typical costs", "ensures targeted campaigns", "hiring professionals ensures", "Rates can range", "can cost anywhere" |
| Image alts | B18 = new ALT-9 Title. B57 (**ALT-10, held**) = original Title, unchanged |
| Unchanged | `<title>`, meta description, canonical, `og:title`, `og:image`, **`og:image:alt`** (ALT-10 held), H1, `datePublished`, BreadcrumbList, contents list (3), reading time 6 min, 0 figcaptions |
| Expected changes | Updated → October 20, 2026 (12:52:48Z, the entry time, not the asset time) |

**Remaining:** 4 articles (PM, EM, RE, CW) and 8 assets (ALT-1 to ALT-8), all unpublished drafts. ALT-10 stays held.

## Gate C log: 4 of 7, PM article (owner-authorised, 2026-10-20; no assets)

| Step | Result |
|---|---|
| Pre-publish | PM draft fingerprint unchanged (51 blocks), status Changed |
| Publish entry `6u09hoUQVGiU0gbRvqKB5c` | Published, `sys.publishedAt` **12:56:32Z** |
| Live check at 12:57:50Z | Body **51/51 blocks exactly match** the approved after-state. The first block is now "Have you ever wondered…" (Godin quote removed) |
| Probes (all 0) | "Seth Godin", "guarantees", "ensures", "Higher ROI", "minimal risk" |
| Unchanged | `<title>`, meta description, canonical, `og:title`, `og:image`, `og:image:alt` (held OG-1), H1, `datePublished`, BreadcrumbList, contents list (3), reading time 4 min, 0 figcaptions; `/blog` order and card (4 min) |
| Expected changes | Updated → October 20, 2026 (12:56:32Z) |

**Remaining:** 3 articles (EM, RE, CW) and 8 assets (ALT-1 to ALT-8), all unpublished drafts.

**Observation (outside scope, not changed):** one PM sentence still says "…helps keep marketing budgets in check,
ensuring high performance of marketing…". It counts twice because of the page payload. It was not in the manifest
and is not one of the residuals R-2 to R-5. It belongs to the same "ensures" class: logged here as **R-7** for a future
pass.

## Gate C log: 5 of 7, EM article + ALT-8 (owner-authorised, 2026-10-20)

| Step | Result |
|---|---|
| Pre-publish | EM draft fingerprint unchanged (45 blocks), status Changed |
| Publish entry `LxmMYSDHf6KZMNMChcHY9` | Published, `sys.publishedAt` **12:59:59Z** |
| Publish asset `5e9thaSfgVbqAoKuSHq2Y5` (ALT-8) | Published at about 13:00:30Z, version 6 / published 5 |
| Live check at 13:01:48Z | Body **45/45 blocks exactly match** the approved after-state |
| **EM-1 (HOLD)** | B0 quote **unchanged**: `"The money is in the list, but the relationship is in the message." - **Amit Gupta**` |
| Probes (all 0) | "highest ROI", "surpassing social media", "consistently shown better conversion" |
| Image alt (B3) | `Notebook labelled "Goal Getter" beside a laptop and phone`. "BlogDetailsA" survives only in the image file name in the URL, which is expected |
| Unchanged | `<title>`, meta description, canonical, `og:title`, `og:image`, `og:image:alt` (held OG-1), H1, `datePublished`, BreadcrumbList, contents list (6), reading time 3 min, 0 figcaptions; `/blog` order and card (3 min) |
| Expected changes | Updated → October 20, 2026 (12:59:59Z, the entry time) |

**Remaining:** 2 articles (RE, CW) and 7 assets (ALT-1 to ALT-7, all RE), all unpublished drafts.

## Gate C log: 6 of 7, RE article + ALT-1 to ALT-7 (owner-authorised, 2026-10-20)

| Step | Result |
|---|---|
| Pre-publish | RE draft fingerprint unchanged (115 blocks), status Changed |
| Publish entry `5qOyCK0HOEXFN0o1cMZGzs` | Published, `sys.publishedAt` **13:03:30Z** |
| Publish 7 assets | One at a time. Each was published only after the page confirmed the exact frozen Title and Changed status. All 7 now Published at version 6 / published 5 (13:04–13:07Z) |
| Live check at 13:08:33Z | Body **115/115 blocks exactly match** the approved after-state |
| **RE-2 (HOLD)** | B0 quote **unchanged**, including its original `-** Amit Gupta**` spacing |
| Image alts | All 7 in-body alts (B9, B25, B37, B54, B71, B84, B97) equal the frozen Titles |
| Probes (all 0) | "So why wait", "Prepare to take notes", "20% in three months", "15%", "a proven way" |
| Contents list | 9 → **8**; `#so-why-wait` removed |
| Unchanged | `<title>`, meta description, canonical, `og:title`, `og:image`, `og:image:alt` (held OG-2), H1, `datePublished`, BreadcrumbList, 0 figcaptions; `/blog` order |
| Expected changes | Updated → October 20, 2026 (13:03:30Z, the entry time); reading time **14 → 13 min** (as predicted), also on the `/blog` card |

**Remaining:** 1 article (CW), no assets. Held, untouched: EM-1, RE-2, ALT-10.

## Gate C log: 7 of 7, CW article + final sweep (owner-authorised, 2026-10-20)

| Step | Result |
|---|---|
| Pre-publish | CW draft fingerprint unchanged (57 blocks), status Changed |
| Publish entry `3E0NMJ9SZAAjE8ogzANaWF` | Published, `sys.publishedAt` **13:10:37Z** |
| Live check at 13:12:39Z | Body **57/57** exact. B0 = `"Content is marketing’s atomic particle." - **Rebecca Lieb**`. Metadata unchanged except the Updated date; 5 min |
| Contentful "Changed" view | **0 entries** with unpublished changes |

### Final sweep at 13:12:51Z

**Every article matches its approved after-state exactly:**

| Article | Blocks | Reading time | Updated (UTC) |
|---|---|---|---|
| SEO | 148/148 | 9 min | 12:44:46 |
| FB | 129/129 | 8 min | 12:48:32 |
| CM | 66/66 | 6 min | 12:52:48 |
| EM | 45/45 | 3 min | 12:59:59 |
| PM | 51/51 | 4 min | 12:56:32 |
| RE | 115/115 | 13 min | 13:03:30 |
| CW | 57/57 | 5 min | 13:10:37 |

0 figcaptions on all 7.

**Sitewide crawl:** 35 pages, all HTTP 200. Count of every removed claim across the site: **0**. The phrases checked:

- the booking wording and "30 minutes";
- "3 to 6 months";
- the 4 unverified client names;
- the FB durations;
- the ₹ ranges;
- Statista;
- the phantom case study;
- Seth Godin;
- "highest ROI", "minimal risk" and the "guarantees" line;
- RE's percentages, "So why wait" and "Prepare to take notes";
- the old Lieb wording;
- the writer notes;
- the `BlogDetailsA` alt.

"AnybodyCanBake" remains only on `/work` and its Google Ads case study, as before.

**BL-D6 editorial release complete:**

- **Published:** 42 units across 7 entries and 10 assets.
- **Still held, unchanged:** EM-1, RE-2, ALT-10, plus the OG-1 to OG-3 metadata.
- **Logged for a future pass:** residuals R-2 to R-7.
- **Not done (needs owner authorisation):** a `DECISION_LOG` entry and a `CURRENT_STATE` update.
