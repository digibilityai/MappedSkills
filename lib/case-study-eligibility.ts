/**
 * WHICH CASE STUDIES MAY BE PUBLIC. One rule, used by the detail page, `/work`, the sitemap and static params.
 *
 * An entry is public only when ALL of these hold:
 *   1. it is CURRENTLY published (it has a published version now; having been published once is not enough);
 *   2. its slug is valid (`SLUG_PATTERN`) and its public route is not claimed by another published entry;
 *   3. it is not one of the four unpermissioned historical studies and does not take one of their reserved routes;
 *   4. it has every required piece of new-layout content (summary, problem, whatWeDid, impact), OR its immutable
 *      Contentful entry ID is one of the three legacy studies that were already public. Legacy studies stay on the
 *      legacy template until `LEGACY_IDS_ON_NEW_TEMPLATE` (below) names them.
 *
 * Collisions: the public route is the slug with any leading `portfolio/` and surrounding slashes removed (the same
 * rule as `normalizeCaseStudySlug` in `lib/contentful/mappers.ts`, pinned by a test). When entries collide, a legacy
 * study keeps its URL and every other colliding entry is withheld; two colliding non-legacy entries are both withheld.
 *
 * This file has no imports on purpose, so the rule is unit-testable without the application build. It decides
 * eligibility only. It does not read Contentful and it is not an approval: Contentful's Published state plus the
 * completeness rule are the editorial controls. Client permission is recorded by the owner outside this code.
 */

/** The three studies public before the template change. Immutable Contentful entry IDs, not slugs: a slug can be edited. */
export const LEGACY_CASE_STUDY_IDS: ReadonlySet<string> = new Set([
  '4DpPjLCWdakD6tBmZNMnko', // Ameba Software (stored slug `portfolio/seo-ameba-software`)
  '4zQL4P8SR2xogxHN4qFfUl', // Home decor brand
  '6Ycb7aYvXrslOXKchQnqmi', // Online courses (Google Ads)
]);

/**
 * THE FOUR UNPERMISSIONED HISTORICAL STUDIES (owner decisions WORK-010, WORK-015, WORK-025 and the Fine Living decision,
 * 2026-09-19: removed from publication; their URLs stay 404). Never public, even if published again, and their old
 * routes are RESERVED: no other entry may take a URL that external links still associate with a different client.
 */
export const EXCLUDED_CASE_STUDY_IDS: ReadonlySet<string> = new Set([
  '7eQ2t6t7qzpTkp3mScfi6C', // seo-healthfirst
  '6iXOA9jVUPJ1YZRpqorzJu', // portfolio/local-seo-service-usa
  'B63etvFne4B1vL7XyOZiF', // google-ppc-for-real-estate
  'xudVmwI50zzAYhucWzuY9', // google-ads-for-ecommerce
]);
export const RESERVED_CASE_STUDY_ROUTES: ReadonlySet<string> = new Set([
  'seo-healthfirst',
  'local-seo-service-usa',
  'google-ppc-for-real-estate',
  'google-ads-for-ecommerce',
]);

/**
 * THE TEMPLATE SWITCH FOR THE THREE LEGACY STUDIES. Names all three since G7 batch five.
 *
 * A legacy study always renders on the legacy template, even if someone fills in the new fields in Contentful. It moves
 * to the new template only when its entry ID is added here, in code, as a deliberate editorial migration decision
 * (new copy approved, evidence checked, owner sign-off recorded). Removing the ID puts it back on the legacy template.
 * Entries that are not legacy are unaffected: they use the new template whenever their content is complete.
 */
export const LEGACY_IDS_ON_NEW_TEMPLATE: ReadonlySet<string> = new Set<string>([
  '4DpPjLCWdakD6tBmZNMnko', // Ameba Software (G7 batch five, R3 copy approved)
  '4zQL4P8SR2xogxHN4qFfUl', // Home decor brand (G7 batch five, R3 copy approved)
  '6Ycb7aYvXrslOXKchQnqmi', // Online courses / AnyBodyCanBake (G7 batch five, R3 copy approved)
]);

/** Same pattern the later Contentful `slug` validation will use. The optional `portfolio/` prefix is Ameba's. */
export const SLUG_PATTERN = /^(portfolio\/)?[a-z0-9]+(-[a-z0-9]+)*$/;
/** The string form for the Contentful validation (identical to SLUG_PATTERN.source). */
export const SLUG_PATTERN_SOURCE = '^(portfolio/)?[a-z0-9]+(-[a-z0-9]+)*$';

export function routeSlugOf(slug: string): string {
  return slug.trim().replace(/^portfolio\//i, '').replace(/^\/+|\/+$/g, '');
}

export type EligibilityInput = {
  id: string;
  slug: string | null | undefined;
  /** `sys.publishedVersion`: present only while the entry is published. */
  publishedVersion: number | null | undefined;
  /** `sys.publishedAt`. A leftover timestamp alone never counts as published. */
  publishedAt: string | null | undefined;
  hasSummary: boolean;
  hasProblem: boolean;
  hasWhatWeDid: boolean;
  hasImpact: boolean;
};

export type Eligibility =
  | { public: true; layout: 'new' | 'legacy' }
  | { public: false; reason: 'not-published' | 'excluded' | 'invalid-slug' | 'route-collision' | 'incomplete' };

export const isCurrentlyPublished = (e: Pick<EligibilityInput, 'publishedVersion' | 'publishedAt'>): boolean =>
  typeof e.publishedVersion === 'number' && e.publishedVersion > 0 && Boolean(e.publishedAt);

export const hasAllNewLayoutContent = (e: EligibilityInput): boolean =>
  e.hasSummary && e.hasProblem && e.hasWhatWeDid && e.hasImpact;

/** Evaluates the whole set at once, because collisions are a property of the set. Keyed by entry ID. */
export function evaluateCaseStudies(
  entries: readonly EligibilityInput[],
  legacyOnNewTemplate: ReadonlySet<string> = LEGACY_IDS_ON_NEW_TEMPLATE
): Map<string, Eligibility> {
  const result = new Map<string, Eligibility>();
  const published = entries.filter(isCurrentlyPublished);

  // Routes claimed by currently published entries that have any slug at all (fail closed: an invalid-slug entry
  // still claims its route for the purpose of keeping the colliding page out).
  const claims = new Map<string, string[]>();
  for (const e of published) {
    if (!e.slug || !e.slug.trim()) continue;
    const route = routeSlugOf(e.slug);
    if (route) claims.set(route, [...(claims.get(route) ?? []), e.id]);
  }

  for (const e of entries) {
    if (!isCurrentlyPublished(e)) { result.set(e.id, { public: false, reason: 'not-published' }); continue; }
    const legacy = LEGACY_CASE_STUDY_IDS.has(e.id);
    const slug = e.slug?.trim() ?? '';
    const route = slug ? routeSlugOf(slug) : '';
    if (!slug || !route || !SLUG_PATTERN.test(slug)) { result.set(e.id, { public: false, reason: 'invalid-slug' }); continue; }
    if (EXCLUDED_CASE_STUDY_IDS.has(e.id) || RESERVED_CASE_STUDY_ROUTES.has(route)) { result.set(e.id, { public: false, reason: 'excluded' }); continue; }
    const sharing = claims.get(route) ?? [];
    if (sharing.length > 1) {
      const legacySharing = sharing.filter((id) => LEGACY_CASE_STUDY_IDS.has(id));
      const keepsRoute = legacy && legacySharing.length === 1;
      if (!keepsRoute) { result.set(e.id, { public: false, reason: 'route-collision' }); continue; }
    }
    if (legacy) {
      const moved = legacyOnNewTemplate.has(e.id) && hasAllNewLayoutContent(e);
      result.set(e.id, { public: true, layout: moved ? 'new' : 'legacy' });
      continue;
    }
    if (hasAllNewLayoutContent(e)) { result.set(e.id, { public: true, layout: 'new' }); continue; }
    result.set(e.id, { public: false, reason: 'incomplete' });
  }
  return result;
}

/** Filters any study-shaped objects through the rule and stamps the layout. The single place the rule is applied. */
export function selectPublic<
  T extends { id: string; contentfulSlug: string; eligibility: Omit<EligibilityInput, 'id' | 'slug'> },
>(studies: readonly T[]): Array<T & { layout: 'new' | 'legacy' }> {
  const verdicts = evaluateCaseStudies(studies.map((s) => ({ id: s.id, slug: s.contentfulSlug, ...s.eligibility })));
  const out: Array<T & { layout: 'new' | 'legacy' }> = [];
  for (const study of studies) {
    const v = verdicts.get(study.id);
    if (v && v.public) out.push({ ...study, layout: v.layout });
  }
  return out;
}
