import { createMetadata } from '@/lib/metadata';
import { About } from '@/components/b2/About';

/**
 * `/about`: the owner-approved G1 About design, frozen at R4 (DEC-060; docs/about-redesign/g1/). Title and description
 * are the owner's G2 review wording (DEC-060 addendum); the URL, canonical, robots and the global structured data are
 * unchanged, and Open Graph/Twitter follow the title and description through createMetadata as on every route. As before,
 * this top-level route emits no BreadcrumbList. The Direction C header and footer come from the root layout.
 */
export const metadata = createMetadata(
  'About MappedSkills | Our Team & Approach',
  'Meet the team behind MappedSkills. Discover how we connect digital marketing services, turn interest into enquiries and measure what matters.',
  '/about'
);

export default function AboutPage() {
  return <About />;
}
