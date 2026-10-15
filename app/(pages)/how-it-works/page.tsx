import { createMetadata } from '@/lib/metadata';
import { CplusPage } from '@/components/cplus/CplusPage';
import { MethodBody } from '@/components/cplus/how-it-works/MethodBody';

/**
 * `/how-it-works` — the approved C+ How It Works design (proto/direction-c-plus 0a8b611) in production. The URL, metadata
 * (title, description, canonical, Open Graph/Twitter) and the global structured data are unchanged; as before, this
 * top-level route emits no BreadcrumbList. The Direction C header and footer come from the root layout.
 */
export const metadata = createMetadata(
  'How We Work, What We Measure, and What We Cannot Tell You | MappedSkills',
  'The published method: what is measured at each point on the chain, what cannot be attributed and why, and where a person decides rather than a process. Written to be checked.',
  '/how-it-works'
);

export default function HowItWorksPage() {
  return (
    <CplusPage>
      <MethodBody />
    </CplusPage>
  );
}
