import { createMetadata } from '@/lib/metadata';
import { CplusPage } from '@/components/cplus/CplusPage';
import { FaqBody } from '@/components/cplus/faq/FaqBody';
import { QAS } from '@/components/cplus/faq/faqData';

/**
 * `/faq` — the approved C+ FAQ design (proto/direction-c-plus 0a8b611) in production. The URL, metadata (title,
 * description, canonical, Open Graph/Twitter), the global structured data and this route's FAQPage are unchanged: the
 * FAQPage is emitted from the same `QAS` array the page body renders, so the two cannot drift. The Direction C header
 * and footer come from the root layout.
 */
export const metadata = createMetadata(
  'Questions We Get Asked, Answered Plainly | MappedSkills',
  'Including the ones with answers that lose us work: what we are accountable for, why we will not guarantee results, what we cannot tell you about where an enquiry came from, and what counts as a qualified enquiry.',
  '/faq'
);

export default function FaqPage() {
  return (
    <CplusPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: QAS.map((qa) => ({
              '@type': 'Question',
              name: qa.q,
              acceptedAnswer: { '@type': 'Answer', text: qa.plain },
            })),
          }),
        }}
      />
      <FaqBody />
    </CplusPage>
  );
}
