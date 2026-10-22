> **RECORD STATUS (added 2026-10-22, G6-P8): EXECUTED, with one superseded ruling. Body below is the historical proposal, unaltered.**
> - C1 and C2 were applied and published on 2026-10-22, and C4b was chosen (the Timeline `date` was cleared).
> - **WK-D4b and C3 are SUPERSEDED.** This document records the public spelling as "AnybodyCanBake" (owner, 2026-10-21) and
>   proposes changing `clientName` to it. The owner ruled on 2026-10-22 that the spelling is **AnyBodyCanBake**, and
>   **C3 was not applied**. The §6 check "AnyBodyCanBake count 0" is inverted by that ruling. See `G6_P4_BRAND_SPELLING_PLAN.md`
>   and `G6_P8_RELEASE_RECORD.md`.
> - Authoritative record: `DEC-073` in `docs/00-project/DECISION_LOG.md`.

# G6-P3: Case study content corrections (WK-D4, WK-D4b, WK-D7)

**Status:** PROPOSED. Awaiting owner approval. Nothing was edited, published or deployed.
**Date:** 2026-10-22.
**Data source (VERIFIED FACT):** Contentful Delivery API (REST, `master`, `include=2`, plus a full-text `query=` search
across all content types), read-only from the production host using its existing delivery token. The token was never
printed or copied. Results were cross-checked against the live HTML of `/portfolio/seo-ameba-software`,
`/portfolio/google-ads-for-online-courses` and `/work` (live build `1ac9827`). The code was read on `origin/main` `17276bf`
and on `1ac9827`.

## 1. Findings

### WK-D4: "TechWave Solutions"

- **VERIFIED FACT:** it occurs **once** in Contentful. Entry `4DpPjLCWdakD6tBmZNMnko` (caseStudies, Ameba, rev 1, last
  updated 2026-07-22), field `content`, block 14: a body paragraph under the H2 "Strategy and Tactics". A full-text
  search finds it in no other entry or content type.
- The "two occurrences" on the live page are the same sentence counted twice: once in the server HTML and once in the
  React Server Components payload. A single edit removes both.
- It is narrative text describing the client. It is not a testimonial, an attribution, the client field or metadata.
  Everything else in the entry identifies Ameba Software: the title, the slug, the client entry and the testimonial
  author "Gagan Deep, Partner, Ameba Software". The owner already ruled it "wrong company" (WORK-014, CHANGE REQUIRED).
  **UNKNOWN:** where the name came from. It may be template residue or another company. Nothing in the project records
  a TechWave client.
- **Related, same entry and owner ruling (WORK-014):** "Ameba Softwares’" appears in block 8 (Challenges › "Limited
  Organic Visibility"), which is **live**, and in `conclusion`, which is **withheld and not rendered**.

### WK-D4b: client-name spelling

- **OWNER REQUIREMENT (2026-10-21):** the public spelling is **AnybodyCanBake**. It is recorded in
  `G6_D_EXISTING_STUDY_MIGRATION.md` R3 (untracked) but **not yet in `DECISION_LOG.md`**. The client's own site mostly
  uses "Anybody Can Bake" (observed 2026-10-21). That is evidence, but the owner's ruling governs.
- **VERIFIED FACT:** only one stored value is wrong. Linked entry `4qzD1vSg28WOKWKhCD64Vc` (caseClient, rev 2), field
  `clientName`, holds "AnyBodyCanBake, Pune, India". Only `6Ycb7aYvXrslOXKchQnqmi` links to it (`links_to_entry`).
  Every other occurrence already reads "AnybodyCanBake": the Problem Statement and its link to anybodycanbake.com, the
  meta, OG and Twitter descriptions (derived from the Problem Statement), and the withheld conclusion.
- The wrong value renders as the "Client" row on the study page (2 live occurrences, HTML and RSC). On the redesigned
  `/work` (merged, not deployed) it becomes the card H3 (G2 report). The URL `google-ads-for-online-courses`, the
  title and the JSON-LD (Organization and ContactPoint only) don't contain the name and are unaffected.

### WK-D7: attribution

- **Who did the work:** resolved. **OWNER REQUIREMENT (2026-10-21):** MappedSkills or its team performed the
  AnybodyCanBake work. It is not yet recorded in `DECISION_LOG.md`.
- **When:** unresolved and **live**. `4qzD1vSg28WOKWKhCD64Vc.date` = "April - 2016" renders as the "Timeline" row on the
  study page. The owner confirmed who did the work, not when (G6-D R3).
- **Provider name:** unresolved but **not public**. "MappedSkills Marketing" appears in the `conclusion` of
  `6Ycb7aYvXrslOXKchQnqmi` and in the testimonial `4kiuz8HElbFNGdJdyk6pkB`. Both are withheld by
  `lib/case-study-proof.ts` and do not render. The 3 live occurrences of "MappedSkills Marketing" on each page come
  from the site footer © line, which is code, not Contentful.
- **Testimonial:** Sonia Gupta, Founder. Withheld. No change proposed and no evidence available.

## 2. Proposed corrections

| # | Issue | Entry / field | Current text | Proposed text | Evidence | Publishing impact |
|---|---|---|---|---|---|---|
| C1 | WK-D4 | `4DpPjLCWdakD6tBmZNMnko` · `content` · block 14 (H2 "Strategy and Tactics") | "A comprehensive SEO strategy was designed for **TechWave Solutions**, focusing on keyword optimization, technical improvements, and high-value content to increase visibility and drive relevant traffic." | "A comprehensive SEO strategy was designed for **Ameba Software**, focusing on …" (rest unchanged) | Entry identity (title, slug, client, testimonial author); WORK-014 owner ruling | Edit and publish this entry. Live on the study page only. Not in metadata. `/work` never reads this section |
| C1-alt | WK-D4 | same | same | "A comprehensive SEO strategy was designed, focusing on …" (name removed) | WORK-014 allows "correct/remove" | same |
| C2 (optional, WORK-014) | WK-D4 related | same entry · `content` · block 8 (Challenges › Limited Organic Visibility) | "Ameba Softwares’ website was not ranking well …" | "Ameba Software’s website was not ranking well …" | Client field "Ameba Software"; WORK-014 | Same publish as C1. `conclusion` (withheld) left untouched (DEC-031 preservation) |
| C3 | WK-D4b | `4qzD1vSg28WOKWKhCD64Vc` (caseClient) · `clientName` | "AnyBodyCanBake, Pune, India" | "AnybodyCanBake, Pune, India" | OWNER REQUIREMENT 2026-10-21 | Edit and publish this linked entry only. The parent study needs no republish. Changes the "Client" row on the study page now and the `/work` card H3 after release. No URL, title or meta change |
| C4a | WK-D7 (if owner confirms the period) | `4qzD1vSg28WOKWKhCD64Vc` · `date` | "April - 2016" | no change | Owner fact needed | None |
| C4b | WK-D7 (if the period cannot be confirmed) | same | "April - 2016" | *(clear the field)* | No evidence for the date; brief: withhold, don't invent | `date` is optional in `caseClient`. The page drops the Timeline row when it is empty (`page.tsx` metaItems, both builds). Same publish as C3 |
| — | WK-D7 provider name | `conclusion` of `6Ycb7…`; testimonial `4kiuz8HElbFNGdJdyk6pkB` | "MappedSkills Marketing …" | no change | Withheld, not public; testimonial text needs written approval | None |

## 3. Publishing impact (VERIFIED against code and the live response)

- **Contentful:** C1 and C2 need an edit and publish of `4DpPj…`. C3 and C4b need an edit and publish of `4qzD1…`. No
  other entries are affected, and no unpublishing is involved. The current `caseStudies` model only adds optional
  fields, so republishing Ameba passes validation. Its slug `portfolio/seo-ameba-software` matches the slug pattern.
- **Eligibility:** the gate keys legacy studies by immutable entry ID (`lib/case-study-eligibility.ts`), so a republish
  keeps all three on the legacy template. Proof withholding is by slug and is unaffected.
- **No rebuild or redeploy is needed.** `/portfolio/[slug]` and `/work` are ISR with `revalidate = 60` on both the live
  build and `main`. The live response shows `cache-control: s-maxage=60, stale-while-revalidate`, served by
  LiteSpeed. Under stale-while-revalidate, the first request after 60 s returns the stale page and triggers the
  rebuild; the next request returns the new content.
- **Independent of G6:** yes. The live build and `17276bf` read the same fields the same way, and the G6 flag stays
  off. Doing these edits **before** the G6 release clears the WK-D4 release condition.

## 4. Questions for the owner

1. **C1 or C1-alt?** Name Ameba Software, or drop the name.
2. **Include C2** ("Ameba Softwares’" in the live Challenges text) in the same publish?
3. **WK-D7 period:** confirm "April 2016" (C4a), or clear it (C4b)?
4. Record the 2026-10-21 owner facts (who did the AnybodyCanBake work; the spelling) and these choices as **DEC-073**
   in a docs PR.

## 5. Order of operations, once approved

1. Owner approves the wording (questions 1 to 3).
2. Contentful web app, `master`: edit `4qzD1vSg28WOKWKhCD64Vc`. Apply C3, and C4b if chosen. Publish.
3. Edit `4DpPjLCWdakD6tBmZNMnko` → `content`. Apply C1 or C1-alt, and C2 if chosen. Change only those words; leave
   `conclusion`, `review` and `slug` untouched. Publish.
4. Verify (§6). Rollback: Contentful version history → restore the previous version → publish.
5. Record DEC-073 via a docs PR, then continue the G6-P2 release (Option A, flag off).

## 6. Verification after publication

1. Read-only CDA re-scan (the same script): "TechWave" 0 hits; "AnyBodyCanBake" 0 hits; `publishedVersion` increased
   by one on each edited entry; all 3 studies still published.
2. Wait at least 60 s, then request each study page twice. On the second response: HTTP 200; "TechWave" count 0
   (Ameba); "AnyBodyCanBake" count 0 (AnybodyCanBake); Timeline row present or absent according to the C4 choice;
   meta description unchanged.
3. `/work` still lists three studies. `/sitemap.xml` still contains both URLs.
4. After the G6 release, repeat step 2 on the new build and check the `/work` card H3 reads "AnybodyCanBake, Pune,
   India".
