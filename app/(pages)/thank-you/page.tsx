import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import { CplusPage } from '@/components/cplus/CplusPage';
import { ThanksB2 } from '@/components/b2/Contact';

/**
 * `/thank-you` — the approved C+ Thank you design (proto/direction-c-plus 0a8b611) in production, without the
 * prototype's "simulated screen" framing. `ContactForm` navigates here only after POST /api/enquiry returned 2xx, and
 * only then leaves the one-time marker that lets this page show the confirmation (`lib/enquiry-confirmation.ts`);
 * a direct visit, reload or bookmark shows neutral content that claims nothing.
 * NO CONVERSION FIRES FROM THIS PAGE: there is no tracking code on it (`lead_form_submitted` is emitted by the form,
 * on the 2xx, before navigating). `noindex, nofollow` and the absence from the sitemap are unchanged.
 * The title is neutral because the server cannot know which state the visitor will see. `createMetadata` uses the
 * title verbatim and the root layout sets no title template, so the brand suffix appears once.
 */
export const metadata: Metadata = {
  ...createMetadata(
    'Enquiry Confirmation | MappedSkills',
    'Information about your enquiry and what happens after you contact MappedSkills.',
    '/thank-you'
  ),
  robots: 'noindex, nofollow',
};

export default function ThankYouPage() {
  return (
    <CplusPage>
      <ThanksB2 />
    </CplusPage>
  );
}
