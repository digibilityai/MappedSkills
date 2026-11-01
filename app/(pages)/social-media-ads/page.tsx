import { createMetadata } from '@/lib/metadata';
import { BreadcrumbJsonLd } from '@/components/cplus/BreadcrumbJsonLd';
import { MetaAdsR22 } from '@/components/meta-ads-r22/MetaAdsR22';
import { loadCaseShowcase } from '@/components/case-showcase/CaseShowcase';
import { META_SHOWCASE } from '@/components/meta-ads-r22/showcase';
import { BannerFocus } from '@/components/editorial/BannerFocus';
import { MetaAdsJsonLd } from '@/components/paid-advertising/meta-ads/MetaAdsJsonLd';

/**
 * `/social-media-ads`: renders the frozen Meta Ads R2.2 design (27 October 2026; live title, description, canonical and
 * BreadcrumbList preserved, D1). Previously: the paid-advertising Meta Ads page (Content R2, Visual R1, 26 October 2026; DEC-080 supersedes the
 * unlogged Paid Social refinement only for the H1, hero, CTA wording, structure, visible terminology, tracking boundary and
 * creative allowances). The route, canonical, live title and description, and the existing BreadcrumbList (same trail and
 * label) are unchanged; the metadata awaits Search Console review. FAQPage and one Service node are added. The previous C+
 * components (components/cplus/social-media-ads/*) are no longer rendered but are left in the repository.
 */
export const metadata = createMetadata(
  'Paid Social, Judged on the Enquiries It Produces | MappedSkills',
  'We run paid social advertising, and we will tell you when it is the wrong channel for your business. Where it fits, it is one demand source inside the same measured outcome as everything else.',
  '/social-media-ads'
);

export default async function Page() {
  /* the case showcase is resolved on the server (public library only), so the whole page is in the first HTML */
  const showcase = await loadCaseShowcase(META_SHOWCASE);
  return (
    <>
      <BreadcrumbJsonLd label="Paid social" path="/social-media-ads" />
      <MetaAdsJsonLd />
      <MetaAdsR22 showcase={showcase} />
      <BannerFocus />
    </>
  );
}
