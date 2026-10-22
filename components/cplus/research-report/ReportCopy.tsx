'use client';

import { useRef, useState } from 'react';

/**
 * Copy citation / Copy link, with the live `CopyActions` behaviour (clipboard, 2 s confirmation, silent on failure) in the
 * C+ button style. The confirmation is also written to a polite live region so a screen reader hears it.
 */
export function ReportCopy({
  citation,
  url,
  labels,
}: {
  citation: string;
  url: string;
  labels: { citation: string; link: string; citationDone: string; linkDone: string };
}) {
  const [done, setDone] = useState<'citation' | 'link' | null>(null);
  const timer = useRef<number | undefined>(undefined);

  async function copy(kind: 'citation' | 'link') {
    try {
      await navigator.clipboard.writeText(kind === 'citation' ? citation : url);
      setDone(kind);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setDone(null), 2000);
    } catch {
      setDone(null);
    }
  }

  return (
    <p className="rr-copy">
      <button type="button" className="dc-btn dc-btn-secondary rr-copy-b" onClick={() => copy('citation')}>
        {done === 'citation' ? labels.citationDone : labels.citation}
      </button>
      <button type="button" className="dc-btn dc-btn-secondary rr-copy-b" onClick={() => copy('link')}>
        {done === 'link' ? labels.linkDone : labels.link}
      </button>
      <span className="rr-sr" role="status" aria-live="polite">
        {done === 'citation' ? labels.citationDone : done === 'link' ? labels.linkDone : ''}
      </span>
    </p>
  );
}
