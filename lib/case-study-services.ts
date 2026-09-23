/**
 * RELATED SERVICE FOR A RETAINED CASE STUDY.
 *
 * Authority: `docs/14-qa/link-audit-2026-09-19/LINK_ROUTING_OWNER_REVIEW.md`
 * — WORK-027, authorized for implementation under GATE R2.
 *
 * WHAT THIS IS. A three-entry list mapping each retained case study to the one
 * approved service it is actually about. The owner decision is explicit about
 * what this must NOT become: "no category-mapping engine, dynamic
 * recommendation logic, filler services, unapproved services or new service
 * pages". So it is a literal list, not a rule — a case study not named here
 * shows no related-service link at all, and nothing is substituted.
 *
 * WHY THE SAME THREE SLUGS AS THE PROOF MODULE. They are the three case
 * studies whose clients gave written publication permission, which is why they
 * are the only ones public. The two lists are deliberately kept SEPARATE:
 * [[lib/case-study-proof.ts]] withholds unevidenced proof and may shrink when
 * evidence is supplied, while this list is about service relationships and is
 * unaffected by that. Coupling them would make one decision silently change
 * the other.
 *
 * This adds a link only. It renders no figure, no result and no claim about
 * the engagement, so it is unaffected by, and cannot reintroduce, the proof
 * withheld under GATE R1.
 */

import { SERVICES, type ServiceCard, type ServiceKey } from '@/lib/services';

/** Owner-approved, exactly three entries. WORK-027. */
const CASE_STUDY_SERVICE: Readonly<Record<string, ServiceKey>> = {
  'seo-ameba-software': '/seo',
  'seo-for-home-decor-brand': '/seo',
  'google-ads-for-online-courses': '/google-ads',
};

/**
 * The approved related service for a case-study slug, or `null` when the study
 * has no approved relationship. Accepts a bare or `portfolio/`-prefixed slug,
 * matching the normalisation used by the proof module.
 */
export function getCaseStudyService(slug: string | null | undefined): ServiceCard | null {
  if (!slug) return null;
  const normalised = slug.replace(/^portfolio\//i, '').replace(/^\/+|\/+$/g, '');
  const key = CASE_STUDY_SERVICE[normalised];
  return key ? SERVICES[key] : null;
}
