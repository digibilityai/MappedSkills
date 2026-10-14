import { createMetadata } from '@/lib/metadata';
import { CplusPage } from '@/components/cplus/CplusPage';
import { PricingBody } from '@/components/cplus/pricing/PricingBody';

/**
 * `/pricing` — the approved C+ Pricing (revision 2) design (proto/direction-c-plus 0a8b611) in production. The URL, metadata
 * (title, description, canonical, Open Graph/Twitter) and the global structured data (this route emits no page-level structured data, before or after) are unchanged. The Direction C header and footer come
 * from the root layout.
 */
export const metadata = createMetadata(
  'What This Costs, and What Changes the Number | MappedSkills',
  'What you are buying, the horizon before anything changes, the six factors that actually move the number, and who this is not for. A real number comes from scope.',
  '/pricing'
);

export default function Page() {
  return (
    <CplusPage>
      <PricingBody />
    </CplusPage>
  );
}
