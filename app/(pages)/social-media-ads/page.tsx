import { createMetadata } from '@/lib/metadata';
import { BreadcrumbJsonLd } from '@/components/cplus/BreadcrumbJsonLd';
import { CplusPage } from '@/components/cplus/CplusPage';
import { SocialAdsBody } from '@/components/cplus/social-media-ads/SocialAdsBody';

/**
 * `/social-media-ads` — the approved C+ Social Media Ads design (proto/direction-c-plus 0a8b611) in production. The URL, metadata
 * (title, description, canonical, Open Graph/Twitter) and the global structured data and this route's `BreadcrumbList` (same trail, same helpers) are unchanged. The Direction C header and footer come
 * from the root layout.
 */
export const metadata = createMetadata(
  'Paid Social, Judged on the Enquiries It Produces | MappedSkills',
  'We run paid social advertising, and we will tell you when it is the wrong channel for your business. Where it fits, it is one demand source inside the same measured outcome as everything else.',
  '/social-media-ads'
);

export default function Page() {
  return (
    <CplusPage>
      <BreadcrumbJsonLd label="Paid social" path="/social-media-ads" />
      <SocialAdsBody />
    </CplusPage>
  );
}
