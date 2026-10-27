import { createMetadata } from '@/lib/metadata';
import { RealEstateR2 } from '@/components/real-estate-r2/RealEstateR2';
import { RealEstateJsonLd } from '@/components/paid-advertising/real-estate/RealEstateJsonLd';

/**
 * `/who-we-help/real-estate`: renders the frozen Real Estate R2.1 design (27 October 2026; live title, description and canonical
 * preserved, D1). Previously: the Real Estate audience page (Content and SEO R1 and Visual R1, owner-approved; DEC-083). A new
 * route with no legacy SEO to preserve (`/real-estate` and `/who-we-help` do not exist; there is no hub). Local implementation
 * only: not published or deployed. Header and footer come from the root layout.
 */
export const metadata = createMetadata(
  'Real Estate Google & Meta Ads Agency in India | MappedSkills',
  'Google Ads and Meta Ads management for real estate developers in India. Reach relevant property buyers and make better decisions using enquiry and site-visit feedback.',
  '/who-we-help/real-estate'
);

export default function Page() {
  return (
    <>
      <RealEstateJsonLd />
      <RealEstateR2 />
    </>
  );
}
