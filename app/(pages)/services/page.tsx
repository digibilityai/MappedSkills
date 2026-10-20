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
  'Services: Digital Marketing That Works Together | MappedSkills',
  'Reach potential customers, make it easier for them to contact you, and measure what is working. MappedSkills connects search, advertising, your website and enquiry tracking.',
  '/services'
);

export default function ServicesPage() {
  return (
    <CplusPage>
      <ServicesBody />
    </CplusPage>
  );
}
