import { createMetadata } from '@/lib/metadata';
import { PaidAdvertisingServices } from '@/components/paid-advertising/services/PaidAdvertisingServices';
import { ServicesJsonLd } from '@/components/paid-advertising/services/ServicesJsonLd';

/**
 * `/services`: the paid-advertising Services overview (Content R2, Visual R1, 26 October 2026). The route, canonical and
 * metadata mechanism are unchanged. PROVISIONAL: the title and description await Search Console review of /services,
 * /google-ads and /social-media-ads (docs/paid-advertising-revamp/SERVICES_R1_NOTES.md). The previous C+ components
 * (components/cplus/services/*) are no longer rendered but are left in the repository. Header and footer come from the
 * root layout.
 */
export const metadata = createMetadata(
  'Google Ads and Meta Ads Management in India | MappedSkills',
  'Reach customers who are searching and customers who are browsing. MappedSkills plans and manages Google Ads and Meta Ads for growing Indian businesses.',
  '/services'
);

export default function ServicesPage() {
  return (
    <>
      <ServicesJsonLd />
      <PaidAdvertisingServices />
    </>
  );
}
