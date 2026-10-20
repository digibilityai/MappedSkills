'use client';

import type { ReactNode } from 'react';
import { CONTACT_INTENT_EVENT } from '@/components/forms/ContactForm';
import type { ContactIntent } from '@/lib/contact-request';

/**
 * A link further down `/contact` that takes the visitor back to the form with an intention chosen ("Request a call",
 * "Send an enquiry"). It is a plain `#request` anchor, so without JavaScript it still jumps to the form; with it, the
 * form switches intention through `CONTACT_INTENT_EVENT` and keeps everything already typed (it never navigates).
 * After the jump, focus moves to the chosen option so keyboard and screen-reader users land where the page scrolled.
 */
export function IntentLink({
  intent,
  className,
  children,
}: {
  intent: ContactIntent;
  className?: string;
  children: ReactNode;
}) {
  function handleClick() {
    window.dispatchEvent(new CustomEvent(CONTACT_INTENT_EVENT, { detail: intent }));
    requestAnimationFrame(() => {
      const option = document.querySelector<HTMLInputElement>(`#request input[name="intent"][value="${intent}"]`);
      option?.focus({ preventScroll: true });
    });
  }
  return (
    <a href="#request" className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
