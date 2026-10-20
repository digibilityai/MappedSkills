# BL-D6 · Read-only Pre-flight Worksheet, P2–P6 (2026-10-20)

**Scope: read-only.** Nothing in this worksheet edits, saves, duplicates or publishes anything in Contentful. The
owner performs the inspection in the Contentful web app; Claude verifies independently wherever it can do so
without credentials. Gate B (draft changes) needs separate authorisation.

**Owner Gate A decisions (2026-10-20, as given):**

- **Q-A1:** keep FB-8 and CM-7, subject to an exact wording review (§6).
- **Q-A2:** descriptive Title for ALT-8, subject to confirming its purpose and references (P4, §6).
- **Q-A3:** the "Updated" date move is accepted.
- **Q-A4:** R-2 to R-5 stay out of this release.
- **Q-B1:** manual web-app editing; no CMA or preview credentials in this phase.

**Blocking rule (owner):** an entry with unpublished changes, an asset with unexpected references, or inadequate
recovery is **BLOCKED**.

> **Caution while inspecting:** the web app saves an entry automatically as soon as a field is typed into. Do not
> click into a field. If anything is changed by accident, stop and report it. Do not try to undo it, because an undo
> is also a save.

---

## P2 · Entry IDs and state (owner, web app)

1. Open **Content**. Filter by the content type for blog posts (the GraphQL name is `Post`; its display name in the
   web app is unconfirmed). Search for each slug.
2. Open the entry. **Read only:**
   - **Entry ID:** the last part of the browser URL, `…/entries/<ENTRY_ID>`. It is also shown under "Info" in the
     sidebar where available.
   - **Status** (sidebar), the **last updated** time and person, and the **last published** time.

| Article (slug) | Entry ID | Status | Last updated (time, person) | Last published | Expected live `modified_time` (UTC) |
|---|---|---|---|---|---|
| seo-company-in-pune | | | | | 2026-09-24 12:32:13 |
| facebook-advertising-agency-pune | | | | | 2026-09-24 11:45:01 |
| content-marketing-services-in-pune | | | | | 2026-09-24 08:52:50 |
| building-an-email-list | | | | | 2026-09-18 05:09:40 |
| performance-marketing-vs-digital-marketing | | | | | 2026-09-18 05:07:41 |
| 7-proven-strategies-of-digital-marketing-for-real-estate-developers | | | | | 2026-09-24 09:27:47 |
| importance-of-content-writing | | | | | 2026-09-18 05:05:44 |

**Cross-check (Claude):** "last published" should equal the live `modified_time`. The site renders it from
`sys.publishedAt`. If they differ, the entry was published again since 16:11 IST: re-run P6.

## B2 findings: read-only Delivery API snapshot (Claude, 2026-10-20 ~16:15 IST, owner-authorised)

**How it was taken.** The snapshot was taken on the production host, using the site's existing delivery token. The
token was read into a shell variable and passed to `curl` on stdin; it was never printed, put on a command line or
written to disk. Files containing the token: **0** (grep on the host). The host temp files were deleted afterwards.
The bundle's SHA-256 (`9ed232d3…a4a2`) was identical before and after transfer. Saved as
`evidence/backup-b2-2026-10-20/`: 20 JSON files, with per-file hashes in `SHA256SUMS.txt`.

**Contents:**

- the 7 Post entries, all fields, `locale=*` (the space has one locale, `en-US`), with `include=1`: the full `content`
  rich-text JSON, linked assets and linked author/category entries;
- the 14 assets, with all fields;
- `links_to_asset` results for the 14 asset IDs;
- the list of all published Posts (7);
- the content types and locales.

**Verification (VERIFIED FACT):**

| Check | Result |
|---|---|
| Content type ID | `post` (fields: title, seoTitle, keyword, slug, category, author, excerpt, featuredImage, content) |
| Top-level node count vs. live block count | **7 of 7 equal** (148, 143, 67, 45, 52, 117, 57) |
| Node type and **exact** text, marks (bold, italic) and link URIs, node by node, against the live marked capture | **618 of 618 nodes identical**; embedded-asset positions and IDs identical |
| Consequence | The manifest's "Bn = node n" mapping is now **VERIFIED FACT** (it was a working hypothesis), and every "−" line in manifest §4 matches the stored JSON |
| Published time (`sys.updatedAt`) vs. live `article:modified_time` | 7 of 7 equal |
| Node types present | paragraph, heading-2 to heading-5, ordered and unordered lists, list-item, hyperlink, table and its cells, embedded-asset-block. **No embedded entries, no inline entries, no entry hyperlinks** |

### P2 entry IDs: VERIFIED from the API (the owner confirms Status in the web app)

| Article | Entry ID | Published revision | Last published (UTC) | Web-app Status | Last updated (time, person) | Matches the ID in the web-app URL |
|---|---|---|---|---|---|---|
| seo-company-in-pune | `1PEIOnxvA5yUZpV9maERO3` | 4 | 2026-09-24 12:32:13 | *owner* | *owner* | *owner* |
| facebook-advertising-agency-pune | `1ANOvipuBDHTO6GnTLXzk1` | 5 | 2026-09-24 11:45:01 | *owner* | *owner* | *owner* |
| content-marketing-services-in-pune | `uCI9MljuTLWHRjQpEVzdW` | 6 | 2026-09-24 08:52:50 | *owner* | *owner* | *owner* |
| building-an-email-list | `LxmMYSDHf6KZMNMChcHY9` | 2 | 2026-09-18 05:09:40 | *owner* | *owner* | *owner* |
| performance-marketing-vs-digital-marketing | `6u09hoUQVGiU0gbRvqKB5c` | 3 | 2026-09-18 05:07:41 | *owner* | *owner* | *owner* |
| 7-proven-strategies-of-digital-marketing-for-real-estate-developers | `5qOyCK0HOEXFN0o1cMZGzs` | 6 | 2026-09-24 09:27:47 | *owner* | *owner* | *owner* |
| importance-of-content-writing | `3E0NMJ9SZAAjE8ogzANaWF` | 3 | 2026-09-18 05:05:44 | *owner* | *owner* | *owner* |

### P4 asset references (published content): **PASS for all 10 CONDITIONAL units**

| Unit | Asset | Title (exact, backed up) | Description | Published entries linking to it |
|---|---|---|---|---|
| ALT-1 to ALT-7 | RE assets | as in manifest §3.8 | `""` (empty) | RE post only |
| ALT-8 | `5e9thaSfgVbqAoKuSHq2Y5` | `BlogDetailsA` (file `BlogDetailsA.webp`) | `""` | EM post only |
| ALT-9 | `4lUvzUnU3zgz6CXx1IOwVA` | as in §3.8 | `""` | CM post only |
| ALT-11 | `2gTFCUjmO5Q1idHo6RtnD1` | `Our SEO Services in Pune` | `""` | SEO post only |
| ALT-10 (HOLD) | `DaZDs4Sdt7PkGkPmQSRHJ` | as in §3.8 | `""` | CM post only (in-body and featured image) |
| OG-1 (held) | `4JhD04rM8Z8AhDq5pr0A2J` | `blog-details-img` | `""` | EM **and** PM posts |
| OG-2, OG-3 (held) | `4XTb…`, `61hi…` | as before | `""` | RE; SEO |

`links_to_asset` covers **published entries of every content type**. It cannot see draft or archived entries, so
the owner's web-app References check (P4 above) is still required for those. All 14 Descriptions are confirmed
empty, so a Title edit changes only the `alt` attribute, with no caption.

### §B recovery: B2 complete; recovery adequate, **conditional on P3**

- The snapshot holds the **full published rich-text structure** and the asset metadata, verified identical to the
  live site. It is the exact rollback target.
- **Condition:** it is a backup of the **published** state. If P3 finds an entry or asset with pending changes, the
  snapshot does not capture that draft, and that item is **BLOCKED** (owner rule).
- **Restore with manual editing:** re-enter from the JSON, node by node. Claude prepares the restore instructions
  per article from the JSON and verifies the result against it, or uses Versions › Restore if P5 shows it exists.
  An exact automated restore would need CMA access (not requested).
- **Owner judgement still needed:** whether manual re-entry from the JSON is an acceptable recovery path for the
  larger FB change (−14 nodes, +1 table). If not, B1 (Versions) must pass for FB, or FB is BLOCKED.

## P3 · Existing unpublished changes (owner, web app)

**What it looks like:** the status reads **Published** when there are no pending edits. It reads **Changed** when
edits were saved after the last publish; those edits would go live with ours. **Draft** means never published, and
**Archived** means archived.

1. On each of the 7 entries: Status must be **Published**.
2. Second method, on the content list: filter **Status = Changed**, with the content type set to the blog posts. None
   of the 7 may appear.
3. **Assets too:** on each of the 10 CONDITIONAL assets (P4 list), Status must be **Published**. A "Changed" asset
   would publish someone else's pending asset edit with our Title change.
4. Last updated after last published: if the "last updated" time is later than "last published", treat the entry
   as Changed even if the label is unclear.

| Rule | Outcome |
|---|---|
| Any of the 7 entries is Changed, Draft or Archived | That article is **BLOCKED** |
| Any CONDITIONAL asset is Changed | That ALT unit is **BLOCKED** |

## P4 · Asset references and ALT-8 purpose (owner, web app)

Open **Media** and search for each asset ID. Open the asset. In the sidebar (or the asset's "References" view, where
offered), list every entry that links to it, **including draft and archived entries** and entries of any content
type. Also copy the asset's **Title and Description verbatim**; together they form the asset metadata backup (§B).

| Unit | Asset ID | Expected only referrer | References seen | Title (verbatim) | Description (verbatim; expected empty) | Status |
|---|---|---|---|---|---|---|
| ALT-1 | `edrNvzlzKbuqoR90B9zJT` | RE post | | | | |
| ALT-2 | `JtCtdm6VS4yQZyLnhal1F` | RE post | | | | |
| ALT-3 | `3GYCz8DFPCNtYlUHEzpyjs` | RE post | | | | |
| ALT-4 | `23c18SCtXmfc4PzrOkCrJu` | RE post | | | | |
| ALT-5 | `ZUAvU0mabICC5aiiyCLBz` | RE post | | | | |
| ALT-6 | `5R9PsccrbEtHXpqZBK1bJU` | RE post | | | | |
| ALT-7 | `7tLjdzDTiKZc5TcgRiIm4s` | RE post | | | | |
| ALT-8 | `5e9thaSfgVbqAoKuSHq2Y5` | EM post | | | | |
| ALT-9 | `4lUvzUnU3zgz6CXx1IOwVA` | CM post | | | | |
| ALT-11 | `2gTFCUjmO5Q1idHo6RtnD1` | SEO post | | | | |
| *(ALT-10, HOLD; information only)* | `DaZDs4Sdt7PkGkPmQSRHJ` | CM post (in-body **and** featured image) | | | | HOLD |

**Rules:**

- Any referrer other than the expected Post → that unit is **BLOCKED**.
- A Description that is **not empty** → that unit is **BLOCKED**. This should not happen: a non-empty Description would
  already be showing as the alt text and a caption, and none are live.

**ALT-8 purpose (for Q-A2):**

- **Where it sits:** the image is EM B3, straight after the introduction (B1–B2) and before the first section.
- **What the text says about it:** nothing; there is no caption.
- **What it shows:** a notebook labelled "Goal Getter" beside a laptop and phone, watermarked "MappedSkills
  Marketing / Clicks to Customers".
- **Role:** illustrative, not informational. A short descriptive Title is acceptable. The current Title,
  "BlogDetailsA", is a file label, so changing it is a strict improvement.
- **Condition:** P4 must show the EM post as its only referrer.

## P5 · Recovery capability (owner, web app)

1. Open any one of the 7 entries. Look in the sidebar for **Versions** (also shown as "Version history" or
   "Snapshots" in some layouts). Record:
   - (a) whether it exists;
   - (b) whether the **latest published version** is listed, with a date equal to "last published";
   - (c) whether it offers **Compare** and **Restore**. Do not click Restore.
2. Repeat for all 7 entries. The history can differ per entry.
3. Asset version history: Contentful is not known to offer it for assets (**UNKNOWN**; record what you see). Asset
   recovery relies on the verbatim Title and Description captured in P4.

| Entry | Versions present | Latest published version listed (date) | Compare / Restore offered |
|---|---|---|---|
| SEO | | | |
| FB | | | |
| CM | | | |
| EM | | | |
| PM | | | |
| RE | | | |
| CW | | | |

## P6 · Live baseline (Claude) — **PASS**, 2026-10-20 10:41Z (16:11 IST)

All 7 articles were re-fetched and compared block by block with the 16:02 IST marked capture, including text, marks,
links, image `alt` and `src`.

| Check | Result |
|---|---|
| Changed blocks | **0** in every article (SEO 148, FB 143, CM 67, EM 45, PM 52, RE 117, CW 57) |
| `article:modified_time` | Identical for all 7 |
| `og:image:alt` | Identical for all 7 |

P6 is repeated immediately before Gate B starts. Any difference means re-baselining the manifest first.

---

## §B · Backup and recovery assessment (options as first written; the B2 outcome is recorded above)

**Owner requirement:** the backup must preserve the **full rich-text structure** and the relevant asset metadata.
The rendered capture (`evidence/live-blocks-marked-*.json`) does **not** meet this, so it is a secondary backup only.

| Option | Preserves full rich text | Credentials | Who | Status |
|---|---|---|---|---|
| **B1.** Contentful **Versions** (server-side snapshots) | Yes, for entries. Restore is in the UI | None | Owner (P5) | **Adequate only if** P5 shows Versions, with the latest published version, on **all 7** entries |
| **B2.** Read-only **Delivery API** JSON snapshot, using the production site's existing delivery token **on the production host**. The token is never printed or copied off the host. Claude runs, for example, `GET /spaces/owww06rzpjnj/environments/master/entries?content_type=<post>&fields.slug[in]=…&include=1`, plus each asset | Yes. It returns the full published `content` JSON (every node, mark and link), asset Title, Description and file metadata, entry IDs and `sys.revision`. **The published version is exactly the rollback target**, provided P3 shows no pending changes | No **new** credential, but it uses a production secret for a non-site purpose, **so it needs your explicit authorisation** | Claude | Not started. **Recommended** |
| **B3.** Contentful CLI `space export`, run by the owner on the owner's own machine after `contentful login`; filtered to the 7 entries and 11 assets with `--query-entries` / `--query-assets` (confirm flags with `--help`). Claude receives only the output JSON | Yes, including `sys.version` | The owner's own login, never shared | Owner | Optional alternative |

**Extra independent checks B2 would give** (read-only, published content only):

- the entry IDs (cross-checks P2);
- `links_to_asset=<id>` for each ALT asset, listing **every published entry of any content type** that links to it.
  This cross-checks P4. Drafts are not covered; P3/P4 in the web app cover them.

**How a rollback would work with manual editing:** re-enter the backed-up structure in the web app, guided node by
node from the JSON (B2/B3), or use **Restore** (B1). Each Gate B draft is checked against the backup before
publication.

**Recovery is "adequate" when:** (B1 passes for all 7 entries) **or** (B2 or B3 is complete and Claude has verified that
the JSON renders identically to the P6 baseline). The P4 Title/Description record must also be complete for every
unit going ahead. Until then the whole release is **BLOCKED** on recovery.

---

## P3 / P4 / P5 RESULTS: web-app inspection (Claude in Chrome, owner's session, read-only), 2026-10-20

**Method:**

- **Pages visited:** each entry and asset page, opened by direct URL.
- **Clicks:** only on the sidebar tabs (General/Info), the built-in status views (Changed/Draft/Archived) and, for
  FB, a version radio button plus "Compare with current version".
- **No field was focused or typed into, and nothing was saved, restored, applied or published.**
- **How values were read:** from page text and DOM `time[datetime]` attributes.
- **Data handled:** no cookies, tokens or session data were read or stored.
- **Integrity check:** after the FB compare view, FB was re-read at version 39 / published 38, unchanged.
- **Timestamp note:** the web app's `datetime` attributes are IST wall-clock values labelled `Z` (+5:30 offset); the
  milliseconds match the Delivery API exactly. UTC values are given below.

### P3 entries: all **PASS**

| Article | Entry ID (web app = API) | Status | Current / published version | Last updated = last published (UTC) | By | Pending changes |
|---|---|---|---|---|---|---|
| SEO | `1PEIOnxvA5yUZpV9maERO3` ✓ | Published | 89 / 88 | 2026-09-24 12:32:13.272 | Amit Gupta | **None** |
| FB | `1ANOvipuBDHTO6GnTLXzk1` ✓ | Published | 39 / 38 | 2026-09-24 11:45:01.531 | Amit Gupta | **None** |
| CM | `uCI9MljuTLWHRjQpEVzdW` ✓ | Published | 32 / 31 | 2026-09-24 08:52:50.814 | Amit Gupta | **None** |
| EM | `LxmMYSDHf6KZMNMChcHY9` ✓ | Published | 14 / 13 | 2026-09-18 05:09:40.513 | Amit Gupta | **None** |
| PM | `6u09hoUQVGiU0gbRvqKB5c` ✓ | Published | 22 / 21 | 2026-09-18 05:07:41.212 | Amit Gupta | **None** |
| RE | `5qOyCK0HOEXFN0o1cMZGzs` ✓ | Published | 64 / 63 | 2026-09-24 09:27:47.453 | Amit Gupta | **None** |
| CW | `3E0NMJ9SZAAjE8ogzANaWF` ✓ | Published | 17 / 16 | 2026-09-18 05:05:44.126 | Amit Gupta | **None** |

**Evidence of no pending changes, three independent ways:**

- Every entry has current version = published version + 1, and "Updated" = "Published" to the millisecond.
- The space-wide **Changed** view returns **0 entries**.
- The live `article:modified_time` equals "Published" for all 7.

**Space-wide context:**

- The **Archived** view shows **0 entries**.
- The **Draft** view shows 11 never-published entries: 1 Post ("Freelancing in India…", `3KjLto9wna70fR0S5YXy2l`),
  4 Case Studies, 4 Case Clients, 1 Case Industry and 1 Category. None of them is one of the 7.

### P4 assets: all 10 CONDITIONAL units **PASS** (now READY)

The asset sidebar "Links" panel **includes draft entries**. Proof: the held asset `4JhD04rM8Z8AhDq5pr0A2J` lists 3
entries there (the EM post, the PM post **and** the draft Post "Freelancing…"), whereas the Delivery API listed only 2.
Archived entries: 0 in the space. The Links panel is therefore a complete reference list.

| Unit | Asset | Status | Current / published version | Links (complete) | Description |
|---|---|---|---|---|---|
| ALT-1 | `edrNvzlzKbuqoR90B9zJT` | Published | 4 / 3 | 1: RE post | empty |
| ALT-2 | `JtCtdm6VS4yQZyLnhal1F` | Published | 4 / 3 | 1: RE post | empty |
| ALT-3 | `3GYCz8DFPCNtYlUHEzpyjs` | Published | 4 / 3 | 1: RE post | empty |
| ALT-4 | `23c18SCtXmfc4PzrOkCrJu` | Published | 4 / 3 | 1: RE post | empty |
| ALT-5 | `ZUAvU0mabICC5aiiyCLBz` | Published | 4 / 3 | 1: RE post | empty |
| ALT-6 | `5R9PsccrbEtHXpqZBK1bJU` | Published | 4 / 3 | 1: RE post | empty |
| ALT-7 | `7tLjdzDTiKZc5TcgRiIm4s` | Published | 4 / 3 | 1: RE post | empty |
| ALT-8 | `5e9thaSfgVbqAoKuSHq2Y5` | Published | 4 / 3 | 1: EM post | empty (0 characters) |
| ALT-9 | `4lUvzUnU3zgz6CXx1IOwVA` | Published | 4 / 3 | 1: CM post | empty |
| ALT-11 | `2gTFCUjmO5Q1idHo6RtnD1` | Published | 5 / 4 | 1: SEO post | empty |
| *ALT-10 (HOLD)* | `DaZDs4Sdt7PkGkPmQSRHJ` | Published | 4 / 3 | 1: CM post (in-body + featured) | empty |
| *OG-1 (held)* | `4JhD04rM8Z8AhDq5pr0A2J` | Published | 4 / 3 | **3**: EM, PM, draft "Freelancing…" | empty |

**ALT-8 purpose:** illustrative image, used only by the EM post. The descriptive Title (Q-A2) is confirmed
appropriate.

**New fact for the held OG-1:** a draft Post also uses that asset as its featured image. This matters only if OG-1 is
ever taken up; it is outside the current scope.

### P5 version history: **PASS** for all 7

| Entry | Versions panel | Snapshots (= published revisions per the API) | Latest published snapshot listed |
|---|---|---|---|
| SEO | Yes | 4 (24 Sep current, 24 Sep, 21 Sep, 16 Jul) = rev 4 | Yes, the "Current" row |
| FB | Yes | 5 (24 Sep current, 21 Sep, 16 Jul ×3) = rev 5 | Yes, the "Current" row (snapshot `2EFePDuEL6Yaqh0Zzuhi0c`) |
| CM | Yes | 6 = rev 6 | Yes |
| EM | Yes | 2 = rev 2 | Yes |
| PM | Yes | 3 = rev 3 | Yes |
| RE | Yes | 6 = rev 6 | Yes |
| CW | Yes | 3 = rev 3 | Yes |

- **Compare:** offered on all 7. It was opened on FB only (21 Sep vs. current).
- **Restore mechanism (seen on FB):** the compare view offers "Select all fields from this version" and a
  (disabled-until-selected) **Apply changes** button. This is a **field-level restore into the current draft**,
  covering the `content` rich-text field. It was not used.
- **FB can be restored:** after Gate B edits, the 24 Sep published snapshot `2EFePDuEL6Yaqh0Zzuhi0c` stays in the list
  as a restore source. The restored draft must then be published (that moves the date; Q-A3 accepted).
- **Assets have no Versions panel.** Their recovery is the B2 JSON (Title and Description, verbatim), which is
  sufficient because only Title changes.

### Recovery: **ADEQUATE**

Two independent recovery paths now exist:

- **B1:** Contentful Versions › Compare › Apply, field level, for all 7 entries;
- **B2:** the verified full JSON snapshot.

Each preserves the full rich-text structure.

## Pre-flight verdict

| Check | Result |
|---|---|
| P2 entry IDs | **PASS**: web app and API agree for all 7 |
| P3 unpublished changes | **PASS**: none on the 7 entries or the 10 assets; 0 Changed and 0 Archived space-wide |
| P4 references | **PASS**: all 10 CONDITIONAL units → **READY**. ALT-10 stays on HOLD (owner) |
| P5 recovery | **PASS**: Versions on all 7; FB restorable; assets covered by B2 |
| P6 live baseline | **PASS** at 10:41Z; **must be repeated immediately before Gate B starts** |
| BLOCKED items | **None** |

**Totals after pre-flight:** READY 42 (32 text + 10 alt) · HOLD 3 (EM-1, RE-2, ALT-10) · NO CHANGE 1 (CM-4).

**Gate B (draft creation) is NOT authorised.**

**Owner (2026-10-20): pre-flight ACCEPTED. Gate B not started; it will be authorised separately.**
