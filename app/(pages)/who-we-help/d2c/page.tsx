import { createMetadata } from '@/lib/metadata';
import { D2CR1 } from '@/components/d2c-r1/D2CR1';
import { D2CJsonLd } from '@/components/paid-advertising/d2c/D2CJsonLd';

/**
 * `/who-we-help/d2c`: renders the frozen D2C and Ecommerce R1.1 design (27 October 2026; live title, description and canonical
 * preserved, D1). Previously: the D2C audience page (Content R2, Visual R1, 26 October 2026; DEC-081). A new route with no legacy
 * SEO to preserve; there is no `/who-we-help` hub. Local implementation only: not published or deployed. Header and footer
 * come from the root layout.
 */
export const metadata = createMetadata(
  'Paid Advertising for D2C Brands in India | MappedSkills',
  'Google Ads and Meta Ads management for D2C brands in India, with customer acquisition costs and business economics in focus. Discuss your advertising.',
  '/who-we-help/d2c'
);

export default function Page() {
  return (
    <>
      <D2CJsonLd />
      <D2CR1 />
    </>
  );
}
