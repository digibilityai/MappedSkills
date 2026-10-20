import { createMetadata } from '@/lib/metadata';

/**
 * `/contact?intent=call` — the call-request state of `/contact` (C1, DEC-071), reached through the rewrite in
 * `next.config.mjs`. The page body is in `../layout.tsx`. The title and description are the owner-approved DEC-062
 * "Request a Call" metadata; the canonical is `/contact`, because this is a state of that page, not a page of its own.
 * Not in the sitemap. A direct request for `/contact/call` redirects to `/contact?intent=call`.
 */
export const metadata = createMetadata(
  'Request a Call | MappedSkills',
  'Tell us what you’re working on and request a call. We’ll get in touch to find a convenient time to talk about your business.',
  '/contact'
);

export default function ContactCallPage() {
  return null;
}
