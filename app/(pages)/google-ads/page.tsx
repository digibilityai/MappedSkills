import { createMetadata } from '@/lib/metadata';
import { BreadcrumbJsonLd } from '@/components/cplus/BreadcrumbJsonLd';
import { PaidAdvertisingGoogleAds } from '@/components/paid-advertising/google-ads/PaidAdvertisingGoogleAds';
import { GoogleAdsJsonLd } from '@/components/paid-advertising/google-ads/GoogleAdsJsonLd';

/**
 * `/google-ads`: the paid-advertising Google Ads page (Content R2, Visual R1, 26 October 2026; DEC-079 supersedes DEC-053
 * only for the H1, structure, CTA wording and the case-study rule). The route, canonical, live title and description, and
 * the existing BreadcrumbList (same trail, same helper) are unchanged; the metadata awaits Search Console review. FAQPage
 * and one Service node are added. The previous C+ components (components/cplus/google-ads/*) are no longer rendered but
 * are left in the repository. Header and footer come from the root layout.
 */
export const metadata = createMetadata(
  'Google Ads Measured on the Enquiries, Not the Clicks | MappedSkills',
  'Account structure, search terms, ad copy, bidding and budget — plus the page the click lands on, whether the enquiry completes, and whether you can see where it came from.',
  '/google-ads'
);

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd label="Paid search" path="/google-ads" />
      <GoogleAdsJsonLd />
      <PaidAdvertisingGoogleAds />
    </>
  );
}
