'use client';

import { AI_PLAIN } from './content';
import { StepNumber, useSequence } from './Sequence';

const [ASK, CMP, TRK] = AI_PLAIN.rep.steps as [
  { w: string; label: string; t: string; d: string; q: string },
  { w: string; label: string; t: string; d: string; cmp: string[]; you: string },
  { w: string; label: string; t: string; d: string; tag: string; cap: string; cols: string[]; rows: { q: string; a: string; b: string; up: boolean }[] },
];

/**
 * Reporting as a journey (R3): Ask, Compare, Track. Three steps, STEP_MS apart, once; each number is a button; complete
 * without JavaScript. The tracking picture is two rows of plain words under the visible label "Illustrative example":
 * not a MappedSkills dashboard, a report or a client result, and it shows no number or score.
 */
export function ReportingSteps() {
  const [ref, q] = useSequence<HTMLOListElement>(3);
  const item = (j: number) => ({ className: `ax-rp-i ${q.state(j)}`.trim(), 'data-i': '', 'aria-current': q.on(j) ? ('step' as const) : undefined });
  return (
    <ol ref={ref} className={`ax-rp ${q.cls}`} style={q.style}>
      <li {...item(0)}>
        <StepNumber armed={q.armed} n={1} label={ASK.label} onSelect={() => q.select(0)} />
        <div className="ax-rp-b">
          <p className="ax-st-w">{ASK.w}</p>
          <h3 className="ax-st-t">{ASK.t}</h3>
          <p className="ax-st-d">{ASK.d}</p>
          <div className="ax-mini">
            <p className="ax-q ax-q-m">{ASK.q}</p>
          </div>
        </div>
      </li>
      <li {...item(1)}>
        <StepNumber armed={q.armed} n={2} label={CMP.label} onSelect={() => q.select(1)} />
        <div className="ax-rp-b">
          <p className="ax-st-w">{CMP.w}</p>
          <h3 className="ax-st-t">{CMP.t}</h3>
          <p className="ax-st-d">{CMP.d}</p>
          <div className="ax-mini">
            <ul className="ax-cmp" aria-hidden="true">
              {CMP.cmp.map((c) => (
                <li key={c}>
                  <i />
                  <span>{c}</span>
                </li>
              ))}
              <li className="ax-cmp-you">
                <b />
                <span>{CMP.you}</span>
              </li>
            </ul>
          </div>
        </div>
      </li>
      <li {...item(2)}>
        <StepNumber armed={q.armed} n={3} label={TRK.label} onSelect={() => q.select(2)} />
        <div className="ax-rp-b">
          <p className="ax-st-w">{TRK.w}</p>
          <h3 className="ax-st-t">{TRK.t}</h3>
          <p className="ax-st-d">{TRK.d}</p>
          <div className="ax-mini">
            <div>
              <p className="ax-tl ax-mini-l">{TRK.tag}</p>
              <table className="ax-trk">
                <caption className="px-sr">{TRK.cap}</caption>
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="px-sr">Question</span>
                    </th>
                    {TRK.cols.map((c) => (
                      <th key={c} scope="col">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TRK.rows.map((r) => (
                    <tr key={r.q}>
                      <th scope="row">{r.q}</th>
                      <td>{r.a}</td>
                      <td className={r.up ? 'ax-trk-up' : undefined}>{r.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </li>
    </ol>
  );
}
