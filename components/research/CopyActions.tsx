'use client';

import { useState } from 'react';

export function CopyActions({ citation, url }: { citation: string; url: string }) {
  const [copied, setCopied] = useState<'citation' | 'link' | null>(null);

  async function copy(kind: 'citation' | 'link') {
    const text = kind === 'citation' ? citation : url;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  }

  const buttonClass =
    'inline-flex min-h-[44px] items-center border-b-2 border-current pb-1 text-[.98rem] font-semibold';

  return (
    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
      <button type="button" className={buttonClass} style={{ color: 'var(--resolve-accent-dark)' }} onClick={() => copy('citation')}>
        {copied === 'citation' ? 'Citation copied' : 'Copy citation'}
      </button>
      <button type="button" className={buttonClass} style={{ color: 'var(--resolve-accent-dark)' }} onClick={() => copy('link')}>
        {copied === 'link' ? 'Link copied' : 'Copy link'}
      </button>
    </div>
  );
}
