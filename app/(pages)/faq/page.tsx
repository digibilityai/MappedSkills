import { createMetadata } from '@/lib/metadata';
import { CplusPage } from '@/components/cplus/CplusPage';
import { FaqBody } from '@/components/cplus/faq/FaqBody';
import { QAS, plainAnswer } from '@/components/cplus/faq/faqData';

/**
 * `/faq`: the owner-approved G1 FAQ design (DEC-063; docs/faq-redesign/g1/). The URL and metadata (title, description,
 * canonical, Open Graph/Twitter) are unchanged, as agreed (FQ-D6). The FAQPage is emitted from the same `QAS` array the
 * page body renders (`plainAnswer` joins the rendered strings), so the two cannot drift; its questions changed with the
 * approved copy (FQ-D1, FQ-D2). The Direction C header and footer come from the root layout.
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
              acceptedAnswer: { '@type': 'Answer', text: plainAnswer(qa) },
            })),
          }),
        }}
      />
      <FaqBody />
    </CplusPage>
  );
}
