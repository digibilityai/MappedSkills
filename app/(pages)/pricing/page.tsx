import { createMetadata } from '@/lib/metadata';
import { PricingR2Body } from '@/components/pricing-r2/PricingR2Body';

/**
 * `/pricing`: the Pricing R2.1 design with the approved pricing model (fixed monthly management fee for a defined scope,
 * extra work quoted separately, ad spend paid to the platform). The URL and the title and description state the transparent
 * pricing, and canonical, robots and Open Graph/Twitter follow createMetadata as before; this route
 * emits no page-level structured data. The Direction C header and footer come from the root layout.
 */
export const metadata = createMetadata(
  'Google Ads & Meta Ads Pricing | MappedSkills',
  'Explore MappedSkills advertising management plans. Google Ads and Meta Ads at ₹14,999/month each, or both at ₹26,999/month. See included work and separately quoted extras.',
  '/pricing'
);

export default function Page() {
  return <PricingR2Body />;
}
