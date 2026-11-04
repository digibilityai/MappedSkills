import { createMetadata } from '@/lib/metadata';
import { PaidAdvertisingServices } from '@/components/paid-advertising/services/PaidAdvertisingServices';
import { ServicesJsonLd } from '@/components/paid-advertising/services/ServicesJsonLd';
import { SERVICES_SHOWCASE } from '@/components/paid-advertising/services/showcase';
import { loadCaseShowcase } from '@/components/case-showcase/CaseShowcase';

/**
 * `/services`: the paid-advertising Services overview (Content R2, Visual R1, 26 October 2026). The route, canonical and
 * metadata mechanism are unchanged. PROVISIONAL: the title and description await Search Console review of /services,
 * /google-ads and /social-media-ads (docs/paid-advertising-revamp/SERVICES_R1_NOTES.md). The previous C+ components
 * (components/cplus/services/*) are no longer rendered but are left in the repository. Header and footer come from the
 * root layout. B2 (DEC-120): the work section is the shared case showcase, resolved here from the public library.
 */
export const metadata = createMetadata(
  'Google Ads, Meta Ads & SEO Services | MappedSkills',
  'Reach customers who are searching, scrolling and comparing. MappedSkills manages Google Ads, Meta Ads and SEO for growing Indian businesses, for real enquiries.',
  '/services'
);

export default async function ServicesPage() {
  const showcase = await loadCaseShowcase(SERVICES_SHOWCASE);
  return (
    <>
      <ServicesJsonLd />
      <PaidAdvertisingServices showcase={showcase} />
    </>
  );
}
