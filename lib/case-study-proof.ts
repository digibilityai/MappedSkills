/**
 * TEMPORARY, EXPLICIT PROOF WITHHOLDING FOR NAMED CASE STUDIES.
 *
 * Authority: `docs/14-qa/link-audit-2026-09-19/LINK_ROUTING_OWNER_REVIEW.md`
 * — owner decisions WORK-011/012/013 (Ameba Software), WORK-016/017/018
 * (Home Decor Brand), WORK-020/021/022 (AnybodyCanBake) and WORK-026
 * (star ratings), authorized for implementation under GATE R1.
 *
 * WHAT THIS IS. Each of the three case studies below has written client
 * publication permission, so the page and the client stay public. None of
 * their published figures, testimonials or star ratings meets the evidence
 * standard in `CLAIMS_AND_EVIDENCE_GOVERNANCE.md` (`DEC-012`): there is no
 * baseline, no measurement period, no client-system data, no statement of
 * attribution limits, and no written approval of the quoted individuals. The
 * approved default while that remains true is to WITHHOLD the proof, not to
 * correct it, re-derive it, or replace it with vaguer wording.
 *
 * WHY IT IS AN EXPLICIT LIST AND NOT A RULE. Scope was an owner condition:
 * suppression must not reach unrelated portfolio entries, future case studies
 * or other content types. A named list is the smallest mechanism that cannot
 * do that — a case study not named here renders exactly as before, and a case
 * study added later renders exactly as before.
 *
 * WHY NOTHING IS EDITED IN CONTENTFUL. The underlying material is preserved
 * unchanged so that a figure which later satisfies `DEC-012`, or a quote whose
 * author approves it in writing, can be restored by deleting a line here. That
 * restoration is a separate owner decision and is NOT authorized by GATE R1.
 *
 * HOW TO REMOVE ONE. Delete its slug. Do not add a slug without an owner
 * decision that says so.
 */

/** Normalised route slugs (no `portfolio/` prefix, no surrounding slashes). */
const PROOF_WITHHELD_SLUGS: ReadonlySet<string> = new Set([
  'seo-ameba-software',
  'seo-for-home-decor-brand',
  'google-ads-for-online-courses',
]);

/**
 * True when this case study's quantitative proof, derived headline figure and
 * testimonial must not be rendered publicly.
 */
export function isCaseStudyProofWithheld(slug: string | null | undefined): boolean {
  if (!slug) return false;
  return PROOF_WITHHELD_SLUGS.has(slug.replace(/^portfolio\//i, '').replace(/^\/+|\/+$/g, ''));
}
