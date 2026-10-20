'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * C+ FAQ tools: progressive enhancement for the FAQ's native <details>, behaviour unchanged from the previous page
 * (only the class names and placement follow the DEC-063 design). It never replaces the native behaviour: every
 * disclosure still opens and closes by itself, with the keyboard, and with JavaScript off (this component then renders
 * nothing visible: `html:not(.px-js) .faq-tools { display: none }`).
 *
 *   1. ONE "Open all answers" / "Close all answers" button. Its label always describes what it will do next, and is
 *      re-derived from the page whenever any disclosure is toggled by hand. A polite status line reports the result.
 *      Focus stays on the button.
 *   2. JUMP LINKS. When the address targets a question (`#q-…`, on load or on hashchange), that question's disclosure
 *      is opened. Nothing else is opened on load, and focus is never moved by this code.
 */
export function FaqTools({ scope, total }: { scope: string; total: number }) {
  const [allOpen, setAllOpen] = useState(false);
  const [status, setStatus] = useState('');

  const items = useCallback(
    () => Array.from(document.querySelectorAll<HTMLDetailsElement>(`${scope} details`)),
    [scope]
  );

  useEffect(() => {
    const sync = () => setAllOpen(items().every((d) => d.open));
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id.startsWith('q-')) return;
      const el = document.getElementById(id);
      if (el instanceof HTMLDetailsElement) el.open = true;
    };
    openFromHash();
    sync();
    // `toggle` does not bubble, so listen in the capture phase on the document.
    document.addEventListener('toggle', sync, true);
    window.addEventListener('hashchange', openFromHash);
    return () => {
      document.removeEventListener('toggle', sync, true);
      window.removeEventListener('hashchange', openFromHash);
    };
  }, [items]);

  const press = () => {
    const next = !allOpen;
    items().forEach((d) => {
      d.open = next;
    });
    setAllOpen(next);
    setStatus(next ? `All ${total} answers are open.` : `All ${total} answers are closed.`);
  };

  return (
    <div className="faq-tools">
      <button type="button" className="faq-all" onClick={press}>
        <span className={'faq-pm' + (allOpen ? ' is-open' : '')} aria-hidden="true" />
        {allOpen ? 'Close all answers' : 'Open all answers'}
      </button>
      <p className="px-sr" role="status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
