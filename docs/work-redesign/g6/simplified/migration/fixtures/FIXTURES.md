# Pinned fixtures (G6 simplified migration)

These keep `migration.test.mjs` runnable with only this folder present: no application checkout and no other G6 folder.

| Fixture | Source | Used by |
|---|---|---|
| `mappers-normalize.ts` | copied unchanged from `s2r1-migration/fixtures/` (verbatim `normalizeCaseStudySlug`, `lib/contentful/mappers.ts`) | test "routeSlug equals the application …" |
| `eligibility-slug-pattern.ts` | verbatim line 40 of `lib/case-study-eligibility.ts` (`SLUG_PATTERN_SOURCE`) | test "slug pattern equals the application …" |

The S2-R1 fixtures `s1-poc-approval.mjs` and `services-servicekey.ts` are not carried over: the fields they pinned
(`approval`, `serviceKey`) are not part of this migration.

Drift check, from the repository root (each command printing nothing means the fixture still equals the application):

```bash
diff <(grep -A2 'export function normalizeCaseStudySlug' lib/contentful/mappers.ts) <(tail -n 3 docs/work-redesign/g6/simplified/migration/fixtures/mappers-normalize.ts | head -n 3)
diff <(sed -n 40p lib/case-study-eligibility.ts) <(tail -n 1 docs/work-redesign/g6/simplified/migration/fixtures/eligibility-slug-pattern.ts)
```
