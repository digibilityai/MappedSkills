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
  'seo-ameba-software', // see PROOF_RELEASED_BY_FINAL_FOUR below
  'seo-for-home-decor-brand',
  // 'google-ads-for-online-courses' was removed on 2026-10-30 (DEC-102): owner attested the figures from business records, their
  // reconciliation with Google Ads data, that revenue excludes refunds, and permission to publish figures and images.
]);

/**
 * AMEBA SOFTWARE (31 October 2026). The owner supplied final figures for this case (organic clicks 7,300 to 12,800, +75.34%; nonbrand clicks
 * 5,200 to 8,940, +71.92%; tracked organic enquiries 34 to 53, +55.88%; two three-month periods) in the final case study set. For THIS case
 * only they supersede WORK-011/012/013 (scope and source: docs/work-redesign/final-four/FINAL_FOUR_REPORT.md, decision log DEC-106).
 *
 * The supersession takes effect only for an entry whose published title, summary, problem, what-we-did, impact and evidence note are ALL the approved final copy (`hasFinalCopy`, lib/case-study-release.ts; DEC-117):
 * the gate is the content, so until the Contentful entry carries the final copy a production build still withholds the entry's old, unevidenced proof
 * exactly as before, and the moment it does the figures are released. No environment variable is involved. This set and `PROOF_WITHHELD_SLUGS` entry are
 * retired together once the release is confirmed live.
 */
const PROOF_RELEASED_BY_FINAL_FOUR: ReadonlySet<string> = new Set(['seo-ameba-software']);

import { hasFinalCopy, type CopyFields } from '@/lib/case-study-release';

/**
 * True when this case study's quantitative proof, derived headline figure and
 * testimonial must not be rendered publicly.
 */
export function isCaseStudyProofWithheld(slug: string | null | undefined, copy?: CopyFields | null): boolean {
  if (!slug) return false;
  const route = slug.replace(/^portfolio\//i, '').replace(/^\/+|\/+$/g, '');
  if (PROOF_RELEASED_BY_FINAL_FOUR.has(route) && hasFinalCopy(route, copy)) return false;
  return PROOF_WITHHELD_SLUGS.has(route);
}
