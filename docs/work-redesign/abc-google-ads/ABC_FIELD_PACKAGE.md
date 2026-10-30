# AnybodyCanBake (Google Ads): revised case study, field package and release notes

**Updated 2026-10-30 (DEC-102):** spelling is AnybodyCanBake (supersedes DEC-073); `summary` is the full 306 character introduction (the short meta description is separate, in code); `clientName` becomes "AnybodyCanBake, Pune, India". `abc-fields.json` is synchronised.

## Evidence and permission (cleared 2026-10-30 by owner attestation, not independent audit)

Owner confirmed: permission to publish the three supplied images and the five figures; figures confirmed from business records; enrolments and revenue reconciled with Google Ads advertising data; revenue excludes refunds. Recorded as `DEC-102`. `lib/case-study-proof.ts` no longer withholds this slug. The page does not call the figures audited or causal, and the evidence note says so.

## Where the content lives

- **Copy** (title, intro, three sections, figures, evidence note, dates, sector, service): **Contentful** entry `6Ycb7aYvXrslOXKchQnqmi` (caseStudies, slug `google-ads-for-online-courses`). Owner-run package: `abc-fields.json` in this folder (same text the local preview shows, generated from `lib/case-study-local-preview.ts`).
- **In code (this branch):** the two supplied images (listing and detail slots, and the sharing image), the dashboard image inside "The impact", the closing band wording and button, the whole-image stage and card crop, the OG image hook, the card excerpt in `components/resolve/work.ts`.
- **Local preview:** `lib/case-study-local-preview.ts` swaps the Contentful entry for the package when `NODE_ENV=development` and `CASE_STUDY_LOCAL_PREVIEW=1`. It is inert in `next build`, `next start`, tests and production. Delete it (and its call in `lib/contentful/case-studies.ts`) once Contentful is updated.

## Release sequence (single release; nothing below has been done)

Why order matters: new code with the old Contentful copy would show the figures in the images beside copy saying "no result is claimed"; new Contentful copy with the old code would show figures without the dashboard, closing or images. Pages revalidate every 60 seconds, so Contentful changes appear without a deploy.

1. Prepare: in Contentful, edit the entry as a draft and **do not publish** (fields below). Note the current published version for rollback.
2. Merge the PR for `feat/abc-google-ads-case-study` (the repository ruleset requires a PR).
3. Dispatch the production deploy; confirm the smoke checks pass. Record the new and previous BUILD_ID.
4. Immediately publish the Contentful entry. Within about 60 seconds the page, `/work` card and metadata show the final state.
5. Verify live: page, `/work` card, `/google-ads`, `/who-we-help/education`, `/services`, the sharing image URL (`/images/resolve-r3/anybodycanbake-feature.webp`), meta description, canonical, no horizontal scroll at 390px.
6. Rollback: Contentful, restore the previous published version; code, redeploy the previous BUILD_ID.

Fields to change on entry `6Ycb7aYvXrslOXKchQnqmi` (values in `abc-fields.json`): `title`, `summary`, `problem`, `whatWeDid`, `impact`, `evidenceNote`, `clientName` ("AnybodyCanBake, Pune, India"), `industry` (link to an entry named "Education and training"), `sector` = `education`, `serviceKey` = `/google-ads`, `periodStart` = 2020-02-01, `periodEnd` = 2021-08-31, `showTestimonial` unticked, `review` link empty. Legacy `content` and `conclusion` are not read by the new template and can stay.

## Rules this package follows

- No before-and-after, growth or cost-reduction claim; no testimonial; no course names or prices; no monthly figures, clicks, impressions, conversion rates, targeting or tracking details.
- Cost per enrolment (₹898.15) and ROAS (5.24×) are calculated from the reported totals and say so.
- No long or double dashes in the copy. (The Period chip "Feb 2020 – Aug 2021" is built by the shared `periodLabel` helper, used by every study, and has an en dash; see open points.)
