'use client';

import { useState } from 'react';
import { AI_PLAIN } from './content';
import { useSequence } from './Sequence';

const C = AI_PLAIN.industry;

/**
 * "Your customers are asking AI" (R3): four recognisable industries, four beats each (a buyer asks, AI answers, a few
 * names appear, and you?). Illustrative questions only; no statistic, no real answer. Plays once for the first industry
 * (STEP_MS per beat); choosing an industry stops it and shows that industry complete. Without JavaScript all four
 * industries are shown, each with its own heading.
 */
export function IndustryExamples() {
  const [ref, q] = useSequence<HTMLDivElement>(4);
  const [cur, setCur] = useState(0);
  const pick = (j: number) => {
    setCur(j);
    q.select(3);
  };
  return (
    <div ref={ref} className={`ax-ind-seq ${q.cls}`} data-reveal="cum" style={q.style}>
      {q.armed && (
        <div className="ax-chips" role="group" aria-label={C.group}>
          {C.items.map((it, j) => (
            <button key={it.k} type="button" className="ax-chip" aria-pressed={j === cur} onClick={() => pick(j)}>
              {it.k}
            </button>
          ))}
        </div>
      )}
      {C.items.map((it, j) => (
        <div key={it.k} className="ax-ind-p" hidden={q.armed && j !== cur}>
          <h3 className="ax-ind-n">{it.k}</h3>
          <ol className="ax-beats">
            <li className={`ax-tile ax-tile-cream ax-bt ${q.state(0)}`} data-i="" aria-current={q.on(0) ? 'step' : undefined}>
              <p className="ax-tl">{C.labels.ask}</p>
              <p className="ax-bt-q">{it.q}</p>
            </li>
            <li className={`ax-tile ax-tile-cream ax-bt ${q.state(1)}`} data-i="" aria-current={q.on(1) ? 'step' : undefined}>
              <p className="ax-tl">{C.labels.ans}</p>
              <p className="ax-bt-a">{it.a}</p>
            </li>
            <li className={`ax-tile ax-tile-cream ax-bt ${q.state(2)}`} data-i="" aria-current={q.on(2) ? 'step' : undefined}>
              <p className="ax-tl">{C.labels.names}</p>
              <ul className="ax-names" aria-hidden="true">
                {[0, 1, 2].map((n) => (
                  <li key={n}>
                    <i />
                    {it.name}
                  </li>
                ))}
              </ul>
              <p className="px-sr">{it.sr}</p>
            </li>
            <li className={`ax-tile ax-tile-ink ax-bt ax-bt-you ${q.state(3)}`} data-i="" aria-current={q.on(3) ? 'step' : undefined}>
              <p className="ax-tl">{C.labels.you}</p>
              <p className="ax-bt-y">
                <span className="ax-slot" aria-hidden="true" />
                {C.youQ}
              </p>
            </li>
          </ol>
        </div>
      ))}
      <p className="px-cap ax-ind-cap">{C.cap}</p>
    </div>
  );
}
