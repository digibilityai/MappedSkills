'use client';

import { useLayoutEffect, useState, type ReactNode } from 'react';
import { consumeEnquiryConfirmation } from '@/lib/enquiry-confirmation';

/**
 * Chooses between the two server-rendered `/thank-you` states. Neutral is the default (server HTML, no JavaScript,
 * direct visits, reloads); the confirmation replaces it only when a fresh one-time marker is consumed on arrival.
 * A layout effect, so the client-side navigation from the form swaps before paint. It never sets neutral itself,
 * so a second effect run (React Strict Mode) cannot undo a confirmation it has already consumed. Nothing is tracked.
 */
export function EnquiryConfirmationGate({ confirmed, neutral }: { confirmed: ReactNode; neutral: ReactNode }) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  useLayoutEffect(() => {
    // Reading a one-time browser-only value on mount: it cannot be read during render without a hydration mismatch,
    // and consuming it must happen exactly once, so it is not a store snapshot either.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (consumeEnquiryConfirmation()) setIsConfirmed(true);
  }, []);
  return <>{isConfirmed ? confirmed : neutral}</>;
}
