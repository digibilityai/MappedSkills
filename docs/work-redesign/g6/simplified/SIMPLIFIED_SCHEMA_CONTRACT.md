# Simplified G6 — schema contract for the later migration (NOT EXECUTED)

Prepared alongside the frontend change. Nothing here has been applied to any Contentful environment.

## Fields to add to `caseStudies` (all optional, not localised)

| ID | Type | Notes |
|---|---|---|
| `summary` | Symbol/Text | Hero lead, meta description, `/work` card |
| `problem` | Rich text | Paragraphs and lists only |
| `whatWeDid` | Rich text | As above |
| `impact` | Rich text | As above; rendered exactly as written |
| `evidenceNote` | Text | Optional |
| `showTestimonial` | Boolean | Absent is treated as false by the site |

## Existing fields to make optional

`review`, `size`, `audience`, `targetArea` (`required: false`; link validations unchanged).

## `slug` validations (the "straightforward" ones)

```json
[{ "unique": true }, { "regexp": { "pattern": "^(portfolio/)?[a-z0-9]+(-[a-z0-9]+)*$" } }]
```

Same pattern as `SLUG_PATTERN_SOURCE` in `lib/case-study-eligibility.ts` (a test keeps the code and this contract aligned by reading the source). `unique` stops exact duplicates only; `portfolio/x` versus `x` are different strings to Contentful, so the application collision check remains the real protection.

## Reuse of the reviewed S2-R1 package

`s2r1-migration/` already implements the preflight (route collisions, invalid slugs), plan/apply/rollback and tests. Adapting it means replacing `NEW_FIELDS` with the six fields above and dropping the `approval` field; that edit needs its own review and tests. **Done (not executed):** `simplified/migration/`, described in `../G6_SIMPLIFIED_MIGRATION_PACKAGE.md`. Run order is unchanged: S2B read-only verification, then `staging`, with explicit approval.

## Deployment order (important)

The site queries the six fields only when `CONTENTFUL_CASE_STUDY_NEW_FIELDS=1`. Set it only after the migration has been applied in that environment, otherwise the GraphQL query fails and no case study renders.

## Pre-deploy check: `sys.publishedVersion` (owner, read-only, 30 seconds)

Contentful documents `publishedVersion` as present only while an entry is published, and the site relies on it. It has not been confirmed against this space. In your own terminal, using the production **Delivery** token (not the Management token). The token goes to curl through stdin, not the command line, and is never printed:

```bash
read -rs "CDA?Delivery token (hidden): "; echo
printf 'header = "Authorization: Bearer %s"\n' "$CDA" | curl -s -K - -H 'Content-Type: application/json' \
  -d '{"query":"{ caseStudiesCollection(limit: 5) { items { sys { id publishedAt publishedVersion } } } }"}' \
  "https://graphql.contentful.com/content/v1/spaces/<SPACE_ID>/environments/master"; echo; unset CDA
```

Pass: each item shows a number for `publishedVersion` (the three existing study IDs `4DpPj…`, `4zQL4…`, `6Ycb7…` among them). Fail: `null`, or a GraphQL error naming `publishedVersion`: stop, and do not deploy. The output has no secrets and can be shared.
