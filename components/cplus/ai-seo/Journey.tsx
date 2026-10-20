'use client';

import { StepNumber, useSequence } from './Sequence';

type Step = { w: string; t: string; d: string; label: string };

/**
 * The five-step journey on /ai-seo (R3). Design and copy are the approved ones; the interaction follows ./Sequence:
 * it starts when seen, advances every STEP_MS, plays once and ends on step 5; each number is a button that stops it.
 * Without JavaScript or with reduced motion every step is shown complete.
 */
export function Journey({ steps }: { steps: Step[] }) {
  const [ref, q] = useSequence<HTMLOListElement>(steps.length);
  return (
    <ol ref={ref} className={`ax-jr ${q.cls}`} style={q.style}>
      {steps.map((s, j) => (
        <li key={s.t} className={`ax-st ${q.state(j)}`} data-i="" aria-current={q.on(j) ? 'step' : undefined}>
          <StepNumber armed={q.armed} n={j + 1} label={s.label} onSelect={() => q.select(j)} />
          <p className="ax-st-w">{s.w}</p>
          <h3 className="ax-st-t">{s.t}</h3>
          <p className="ax-st-d">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}
