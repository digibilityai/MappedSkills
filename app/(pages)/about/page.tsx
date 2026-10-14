import { createMetadata } from '@/lib/metadata';
import { CplusPage } from '@/components/cplus/CplusPage';
import { AboutBody } from '@/components/cplus/about/AboutBody';

/**
 * `/about` — the approved C+ About design (proto/direction-c-plus 0a8b611) in production. The URL, metadata
 * (title, description, canonical, Open Graph/Twitter) and the global structured data are unchanged; as before, this
 * top-level route emits no BreadcrumbList. The Direction C header and footer come from the root layout.
 */
export const metadata = createMetadata(
  'Who We Are, and What We Can Actually Show You | MappedSkills',
  'A small firm in Pune working on one thing: turning demand that already exists into enquiries a business can act on. The accountability boundary, what can be checked, and an honest account of where the firm is today.',
  '/about'
);

export default function AboutPage() {
  return (
    <CplusPage>
      <AboutBody />
    </CplusPage>
  );
}
