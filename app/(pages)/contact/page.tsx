import { createMetadata } from '@/lib/metadata';

/**
 * `/contact`, enquiry first. The page body is in `layout.tsx` (shared with the call-request state); this route only
 * sets the metadata. Canonical `/contact`, unchanged.
 */
export const metadata = createMetadata(
  'Contact Us: Send an Enquiry or Request a Call | MappedSkills',
  'Tell us what you’re looking for. Send an enquiry or request a call, and we’ll get back to you to discuss the next steps.',
  '/contact'
);

export default function ContactPage() {
  return null;
}
