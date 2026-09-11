'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import {
  pushConsentUpdate,
  readStoredConsent,
  writeStoredConsent,
  type ConsentChoice,
  type ConsentState,
} from '@/lib/consent';

/**
 * SESSION 33 — PHASE H2 — the consent decision, as React state.
 *
 * ONE PROVIDER, MOUNTED ONCE, IN THE ROOT LAYOUT, so the banner, the footer's
 * preferences control and the container loader all read the SAME value. A
 * second source of truth is how a site ends up loading a container while its
 * banner still says the question is open.
 *
 * THE INITIAL STATE IS `unset` ON BOTH SIDES OF HYDRATION, AND THAT IS
 * DELIBERATE. `localStorage` does not exist on the server, so a returning
 * accepted visitor's stored choice CANNOT be known while the HTML is being
 * produced. Reading it during render would either mismatch hydration or force
 * every route in this application to render dynamically. It is read in an
 * effect instead, after mount:
 *
 *   - The DENIED DEFAULT is already in `dataLayer` before this component
 *     exists, pushed by the inline bootstrap in the document head, so the delay
 *     grants nothing and risks nothing.
 *   - The stored `granted` was ALSO already replayed by that same bootstrap, so
 *     Google's consent state for a returning accepted visitor is correct from
 *     the first line of the document. This effect only catches React up.
 *
 * ANALYTICS FAILURE IS NON-BLOCKING, and this component is inside that
 * guarantee. `readStoredConsent`, `writeStoredConsent` and `pushConsentUpdate`
 * all swallow their own errors and return `void`. Nothing here is awaited,
 * nothing here can reject, and no enquiry code path reads this context.
 */

type ConsentContextValue = {
  /** `granted` · `denied` · `unset`. `unset` means the visitor has not decided. */
  state: ConsentState;
  /** True once the stored value has been read, so the banner never flashes. */
  hydrated: boolean;
  /** True while the banner should be shown. */
  isOpen: boolean;
  accept: () => void;
  reject: () => void;
  /** Reopens the banner so a decision can be changed or withdrawn. */
  reopen: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ConsentState>('unset');
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    setState(stored);
    setHydrated(true);
    // Asked only when there is no decision on record. A stored refusal silences
    // the question exactly as a stored acceptance does; the visitor can reopen
    // it from the footer whenever they want.
    setIsOpen(stored === 'unset');
  }, []);

  /**
   * One decision path for both answers, so acceptance and refusal cannot drift
   * apart in what they do. Storage is written, the consent command is pushed,
   * React state is updated, the banner closes. In that order, and none of the
   * four can throw.
   */
  const decide = useCallback((choice: ConsentChoice) => {
    writeStoredConsent(choice);
    pushConsentUpdate(choice);
    setState(choice);
    setIsOpen(false);
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      state,
      hydrated,
      isOpen,
      accept: () => decide('granted'),
      reject: () => decide('denied'),
      reopen: () => setIsOpen(true),
    }),
    [state, hydrated, isOpen, decide]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

/**
 * Reads the consent decision.
 *
 * RETURNS A DENIED-EQUIVALENT VALUE RATHER THAN THROWING when no provider is
 * above it. A missing provider is a wiring mistake, and the safe way for a
 * wiring mistake to fail is "no container loads and no banner appears" — not a
 * thrown error that white-screens the page, and never "assume consent".
 */
export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);
  if (context) return context;
  return {
    state: 'unset',
    hydrated: false,
    isOpen: false,
    accept: () => {},
    reject: () => {},
    reopen: () => {},
  };
}
