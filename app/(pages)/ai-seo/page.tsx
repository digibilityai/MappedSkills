import { createMetadata } from '@/lib/metadata';
import { BreadcrumbJsonLd } from '@/components/cplus/BreadcrumbJsonLd';
import { CplusPage } from '@/components/cplus/CplusPage';
import { AiSeoBody } from '@/components/cplus/ai-seo/AiSeoBody';

/**
 * `/ai-seo` — the approved C+ AI search design (proto/direction-c-plus 0a8b611) in production. The URL, metadata
 * (title, description, canonical, Open Graph/Twitter), the global structured data and this route's `BreadcrumbList`
 * (same trail, same helpers) are unchanged. The Direction C header and footer come from the root layout.
 */
export const metadata = createMetadata(
  'AI Search: Why Your Business Is Not in the Answer | MappedSkills',
  'AI answers are assembled largely from sources outside your website, and being readable is not the same as being chosen. We measure it per system, publish the run counts, and do not sell a score.',
  '/ai-seo'
);

export default function Page() {
  return (
    <CplusPage>
      <BreadcrumbJsonLd label="AI search" path="/ai-seo" />
      <AiSeoBody />
    </CplusPage>
  );
}
