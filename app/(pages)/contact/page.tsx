import { createMetadata } from '@/lib/metadata';
import { BannerFocus } from '@/components/editorial/BannerFocus';

/**
 * `/contact`, enquiry first. The page body is in `layout.tsx` (shared with the call-request state); this route only
 * sets the metadata. Canonical `/contact`, unchanged.
 */
export const metadata = createMetadata(
  'Contact Us: Send an Enquiry or Request a Call | MappedSkills',
  'Tell us what you’re looking for. Send an enquiry or request a call, and we’ll get back to you to discuss the next steps.',
  '/contact'
);

/* The body is in layout.tsx; this route only mounts the shared keyboard-focus guard for the first-visit consent banner (DEC-114). */
export default function ContactPage() {
  return <BannerFocus />;
}
