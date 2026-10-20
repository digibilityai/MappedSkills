'use client';

import { useLayoutEffect, useState, type ReactNode } from 'react';
import { consumeEnquiryConfirmation, type ConfirmationKind } from '@/lib/enquiry-confirmation';

/**
 * Chooses between the two server-rendered `/thank-you` states. Neutral is the default (server HTML, no JavaScript,
 * direct visits, reloads); the confirmation replaces it only when a fresh one-time marker is consumed on arrival.
 * A layout effect, so the client-side navigation from the form swaps before paint. It never sets neutral itself,
 * so a second effect run (React Strict Mode) cannot undo a confirmation it has already consumed. Nothing is tracked.
 * A call-request marker (DEC-062) shows `callConfirmed`.
 */
export function EnquiryConfirmationGate({
  confirmed,
  callConfirmed,
  neutral,
}: {
  confirmed: ReactNode;
  callConfirmed: ReactNode;
  neutral: ReactNode;
}) {
  const [kind, setKind] = useState<ConfirmationKind | null>(null);
  useLayoutEffect(() => {
    // Reading a one-time browser-only value on mount: it cannot be read during render without a hydration mismatch,
    // and consuming it must happen exactly once, so it is not a store snapshot either.
    const consumed = consumeEnquiryConfirmation();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (consumed) setKind(consumed);
  }, []);
  return <>{kind === 'call' ? callConfirmed : kind === 'enquiry' ? confirmed : neutral}</>;
}
