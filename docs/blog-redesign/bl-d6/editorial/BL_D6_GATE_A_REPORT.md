# BL-D6 · Editorial Corrections — Gate A Report (2026-10-20, 16:10 IST)

**Owner position (2026-10-20): Gate A acknowledged; Q-A1 to Q-A4 PENDING explicit confirmation. Q-B1 preference: manual web-app editing with independent verification. Gate B not authorised.**

**Verdict: Gate A PASS (conditional).** All 10 deliverables are complete in
`BL_D6_CHANGE_MANIFEST.md` (r2). Four facts can only be obtained inside Contentful. Each is labelled **UNKNOWN** and
is a **blocking Gate B pre-flight check**, not an assumption. None of them changes the frozen wording.

**Nothing was executed.** No Contentful entry or asset was created, drafted, edited or published. No website code,
configuration or governance document changed. Nothing was committed, pushed, merged, deployed or rolled back.
Production was accessed **read-only** for one purpose: to list which `CONTENTFUL_*` key **names** are set. No secret
values were printed.

## Deliverables

| # | Deliverable | Result | Where | Notes |
|---|---|---|---|---|
| 1 | Freeze exact replacement wording and deletion operations | **PASS** | Manifest §3 and §4 | 32 READY units, with node-level operations; one operations file generates both the diffs and the predictions |
| 2 | Reconcile final counts, including split and new items | **PASS** | §1.1, §1.2 | 41 → **45 items / 46 units**. New: FB-6, FB-7, FB-8, CM-7. Split: CM-3a/3b. 32 READY + 10 CONDITIONAL + 3 HOLD + 1 NO CHANGE = 46 |
| 3 | Separate READY, CONDITIONAL and HOLD | **PASS** | §1.2, §3 | HOLD = EM-1, RE-2, ALT-10. CONDITIONAL = 10 alt units (P4 references check) |
| 4 | Contentful entry IDs, asset IDs, field paths, block positions where verified | **PASS (partial by nature)** | §2 | VERIFIED: space, environment `master`, Delivery API, field `content`, all 14 asset IDs, block positions (anchored on exact text). **UNKNOWN: the 7 entry IDs and versions** (not exposed by the site; no local API access), captured at P2 |
| 5 | Exact before/after diff for every READY item | **PASS** | §4 (33 diff blocks covering 32 units) | The "−" text was copied from the 16:02 IST live capture, not retyped |
| 6 | Shared asset references; renderer use of Title and Description | **PASS** | §5 | Code: `alt = description \|\| title`; Description → visible `<figcaption>`; featured Description/Title → `og:image:alt`. 35-page crawl: only ALT-10's asset (CM in-body + featured) and `4JhD…` (EM + PM featured) are multi-use. References from unpublished entries: UNKNOWN → P4 |
| 7 | Impact on Updated dates, structured data, reading time, ordering | **PASS** | §6 | Updated / `dateModified` / `article:modified_time` move; `datePublished` and order do not; no FAQPage JSON-LD exists. Reading time: **FB 9→8, RE 14→13**, the others unchanged (model matches 7/7 live values). The rollback-date effect is irreversible (Q-A3) |
| 8 | Backup, concurrency check, rollback | **PASS** | §7 | CMA JSON backup with SHA-256; `sys.version` and `X-Contentful-Version` / 409 checks; content-only rollback. The execution path depends on Q-B1 |
| 9 | Draft review before publication | **PASS** | §8 | Local preview build with a preview token (local file only); automated block diff against the baseline; owner screenshot pack; a **Gate C** publish approval is proposed |
| 10 | Per-article publication and post-publication checklist | **PASS** | §9 | Pre-publish (§9.2), generic T1–T6, per-article checks, asset checks A1–A4, final 35-page sweep |

## Checks actually run in this session

| Check | Result |
|---|---|
| Live drift: the 7 articles at 16:02 IST against the 15:28 capture (block count, every block's text, image alts, `article:modified_time`) | **No drift** |
| Production Contentful environment (key names in `.env` and `node-selector.json`) | `CONTENTFUL_ENVIRONMENT` absent → `master`; no preview token → Delivery API |
| Asset-ID crawl, 35 pages | All 200; usage as in manifest §5.2 |
| Removed anchors (`#proof-through-relevant-campaign-experience`, `#so-why-wait`) linked from other pages | No (each appears only in its own article) |
| Duplicate H2/H3 text in FB, RE, SEO (heading-id shift risk) | None |
| `FAQPage` JSON-LD live | 0 of 7 |
| Sitemap `<lastmod>` | None |
| Reading-time model against the live values | 7 of 7 exact |

**Not run** (needs Contentful access, Gate B): P2–P5, the backup, draft creation, preview review.

## Open UNKNOWNs (all blocking at Gate B, none at Gate A)

1. The entry IDs and `sys.version` of the 7 Posts (P2).
2. Whether any of the 7 entries already has an unpublished draft (P3). **If one does, Gate B stops.**
3. References to the 10 CONDITIONAL assets from unpublished or unrendered entries (P4).
4. Whether the plan has version history, and whether an empty asset Title is allowed (P5).

## Owner decisions needed

- **Gate A approval** of manifest r2, as a whole or unit by unit.
- **Q-A1:** keep FB-8 and CM-7 (the default is to keep both).
- **Q-A2:** ALT-8 descriptive Title (default) or an empty Title.
- **Q-A3:** accept the permanent "Updated" date move on publish or rollback.
- **Q-A4:** whether to extend scope to residuals R-2 to R-5 (the default is no).
- **At Gate B:** Q-B1, who executes, and how the CMA and preview tokens are provided (local file, never chat).

**Stopped for owner approval.** Gate B (draft creation) has not been started.
