import { createMetadata } from '@/lib/metadata';
import { CplusPage } from '@/components/cplus/CplusPage';
import { MethodBody } from '@/components/cplus/how-it-works/MethodBody';

/**
 * `/how-it-works`: the owner-approved G1 R2 design (DEC-058). Title and description are the approved HW-D08 strings
 * (Open Graph and Twitter follow through createMetadata); the URL, canonical and global structured data are unchanged,
 * and, as before, this top-level route emits no BreadcrumbList. The header and footer come from the root layout.
 */
export const metadata = createMetadata(
  'How It Works: From First Call to Monthly Review | MappedSkills',
  'How working with MappedSkills runs: a discovery call, an audit, a plan you approve, then the work and a monthly report. Including what tracking can’t show.',
  '/how-it-works'
);

export default function HowItWorksPage() {
  return (
    <CplusPage>
      <MethodBody />
    </CplusPage>
  );
}
