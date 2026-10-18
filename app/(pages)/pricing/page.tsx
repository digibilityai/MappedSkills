import { createMetadata } from '@/lib/metadata';
import { CplusPage } from '@/components/cplus/CplusPage';
import { PricingBody } from '@/components/cplus/pricing/PricingBody';

/**
 * `/pricing`: the owner-approved G1 R0 Pricing design (DEC-061; docs/pricing-redesign/g1/). Fully customised pricing: no
 * prices, packages or ranges. Title and description are the owner-approved G2 wording (DEC-061 addendum); the URL,
 * canonical, robots and the global structured data are unchanged (this route emits no page-level structured data), and
 * Open Graph/Twitter follow the title and description through createMetadata. The Direction C header and footer come
 * from the root layout.
 */
export const metadata = createMetadata(
  'Pricing | Tailored Digital Marketing Quotes | MappedSkills',
  'Every MappedSkills quote is tailored to your business. See what affects your price, what your fee covers and how to get a clear proposal before work begins.',
  '/pricing'
);

export default function Page() {
  return (
    <CplusPage>
      <PricingBody />
    </CplusPage>
  );
}
