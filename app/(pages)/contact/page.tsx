import { createMetadata } from '@/lib/metadata';
import { CplusPage } from '@/components/cplus/CplusPage';
import { ContactBody } from '@/components/cplus/contact/ContactBody';

/**
 * `/contact` — the approved C+ Contact design ("Row 01", proto/direction-c-plus 0a8b611) in production, around the
 * REAL enquiry form. `ContactForm` keeps its frozen field contract (DEC-011), POST /api/enquiry (success only after
 * the database has acknowledged a durable row), validation, honeypot, idempotency key, attribution and analytics
 * (`lead_form_started`, `lead_form_validation_error`, `lead_form_submitted`) unchanged; only its presentation is C+.
 * On success the visitor goes to /thank-you; on failure they stay here with every value kept and an explanation
 * that nothing was saved. No response time, phone number, address or entity JSON-LD is published.
 * The URL and metadata are unchanged; the header and footer come from the root layout.
 */
export const metadata = createMetadata(
  "Tell Us What You're Trying to Fix | MappedSkills",
  'Send us what is actually happening — what you are getting, what you are not, and what you can currently see. If you would rather talk than type, you can book a time instead.',
  '/contact'
);

export default function ContactPage() {
  return (
    <CplusPage>
      <ContactBody />
    </CplusPage>
  );
}
