import { createMetadata } from '@/lib/metadata';
import { PaidAdvertisingD2C } from '@/components/paid-advertising/d2c/PaidAdvertisingD2C';
import { D2CJsonLd } from '@/components/paid-advertising/d2c/D2CJsonLd';

/**
 * `/who-we-help/d2c`: the D2C audience page (Content R2, Visual R1, 26 October 2026; DEC-081). A new route with no legacy
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
      <PaidAdvertisingD2C />
    </>
  );
}
