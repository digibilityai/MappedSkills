import type { ReactNode } from 'react';
import { CplusPage } from '@/components/cplus/CplusPage';
import { ContactB2 } from '@/components/b2/Contact';

/**
 * `/contact` — the one contact page (C1, DEC-071), with two visitor intentions: "Send an enquiry" (default) and
 * "Request a call" (`/contact?intent=call`, also the target of the permanent `/schedule-call` redirect).
 *
 * WHY A LAYOUT. The page body (and the form in it) renders here, shared by both intentions, and the route pages only
 * set metadata. `next.config.mjs` rewrites `/contact?intent=call` to the `call` segment, so:
 *   - both states are prerendered: the server HTML is already in the right state, with no flash and no per-request
 *     rendering;
 *   - a navigation between them (a header link while on the page) keeps this layout mounted, so nothing typed is lost.
 * The form reads the active segment to choose its starting intention. `/contact/call` itself is never a public URL:
 * a direct request redirects to `/contact?intent=call`.
 *
 * The form is the real one: POST /api/enquiry, success only after a durable row, and the existing honeypot, timing
 * flag, rate limits, idempotency, attribution and analytics. The header and footer come from the root layout.
 */
export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <CplusPage>
      <ContactB2 />
      {children}
    </CplusPage>
  );
}
