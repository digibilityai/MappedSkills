import { createMetadata } from '@/lib/metadata';
import { CplusPage } from '@/components/cplus/CplusPage';
import { ScheduleBody } from '@/components/cplus/contact/ContactBody';

/**
 * `/schedule-call` — "Request a call" (DEC-062; G1 approved 2026-10-18, docs/schedule-call-redesign/g1). MappedSkills
 * has no online scheduling system, so the page no longer links to a booking page: the visitor sends a short request
 * through the existing enquiry pipeline (`ContactForm` variant `call` → POST /api/enquiry with `requestType: 'call'`,
 * stored with `source_page = '/schedule-call'`) and the team gets in touch to agree a time. On success the visitor goes
 * to the call-request state of /thank-you. Nothing here confirms a booking. The URL and canonical are unchanged; the
 * title and description are updated to match what the page now does, without promising a response time.
 * The header and footer come from the root layout.
 */
export const metadata = createMetadata(
  'Request a Call | MappedSkills',
  'Tell us what you’re working on and request a call. We’ll get in touch to find a convenient time to talk about your business.',
  '/schedule-call'
);

export default function ScheduleCallPage() {
  return (
    <CplusPage>
      <ScheduleBody />
    </CplusPage>
  );
}
