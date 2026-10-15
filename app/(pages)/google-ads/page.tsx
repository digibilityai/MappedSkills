import { createMetadata } from '@/lib/metadata';
import { BreadcrumbJsonLd } from '@/components/cplus/BreadcrumbJsonLd';
import { CplusPage } from '@/components/cplus/CplusPage';
import { GoogleAdsBody } from '@/components/cplus/google-ads/GoogleAdsBody';

/**
 * `/google-ads` — the approved C+ Google Ads design (proto/direction-c-plus 0a8b611) in production. The URL, metadata
 * (title, description, canonical, Open Graph/Twitter) and the global structured data and this route's `BreadcrumbList` (same trail, same helpers) are unchanged. The Direction C header and footer come
 * from the root layout.
 */
export const metadata = createMetadata(
  'Google Ads Measured on the Enquiries, Not the Clicks | MappedSkills',
  'Account structure, search terms, ad copy, bidding and budget — plus the page the click lands on, whether the enquiry completes, and whether you can see where it came from.',
  '/google-ads'
);

export default function Page() {
  return (
    <CplusPage>
      <BreadcrumbJsonLd label="Paid search" path="/google-ads" />
      <GoogleAdsBody />
    </CplusPage>
  );
}
