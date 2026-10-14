import { createMetadata } from '@/lib/metadata';
import { CplusPage } from '@/components/cplus/CplusPage';
import { ServicesBody } from '@/components/cplus/services/ServicesBody';

/**
 * `/services` — the approved C+ Services design (checkpoint 11, proto/direction-c-plus e5c1aa4) in production.
 * The URL, metadata (title, description, canonical, Open Graph/Twitter) and the global structured data are unchanged;
 * this route emits no page-level structured data, before or after. The Direction C header and footer come from the
 * root layout.
 */
export const metadata = createMetadata(
  'What We Do: One Outcome, Three Connected Parts | MappedSkills',
  'Capture the demand, turn it into enquiries, and measure the whole chain. Three connected parts, the joins between them owned by one supplier, and a qualified enquiry as the unit.',
  '/services'
);

export default function ServicesPage() {
  return (
    <CplusPage>
      <ServicesBody />
    </CplusPage>
  );
}
