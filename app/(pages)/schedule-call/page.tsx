import { createMetadata } from '@/lib/metadata';
import { CplusPage } from '@/components/cplus/CplusPage';
import { ScheduleBody } from '@/components/cplus/contact/ContactBody';

/**
 * `/schedule-call` — the approved C+ Schedule a call design (proto/direction-c-plus 0a8b611) in production. The
 * booking button is the existing `BookingLink`: the same destination (NEXT_PUBLIC_CALENDLY_URL, else the canonical
 * Client Discovery Call event, PAGE-058), opened in a new tab, emitting the same diagnostic `meeting_started` (never
 * a booking conversion). No embedded calendar, availability, call length, host or price is stated, and nothing here
 * confirms a booking. The URL, title and canonical are unchanged; the description is updated (owner decision,
 * 2026-10-14) to match what the page now says, without promising an outcome. The header and footer come from the
 * root layout.
 */
export const metadata = createMetadata(
  'Book a Time to Talk | MappedSkills',
  'Book a discovery call about what is happening with your enquiries: what you sell, what is coming in now, and what you can currently measure.',
  '/schedule-call'
);

export default function ScheduleCallPage() {
  return (
    <CplusPage>
      <ScheduleBody />
    </CplusPage>
  );
}
