'use client';

import { useState } from 'react';
import { INDIA_FILTERS, REPORT, percent, type IndiaFilterKey } from './ai-visibility-data';

/**
 * Homepage AI visibility chart: a doughnut of third-party (Reckona AI) counts. Percentages come from the counts in
 * ./ai-visibility-data.ts. The Global tab deliberately shows no figures until comparable data is verified. The SVG is
 * decorative; the same numbers are given as text in the live region and legend.
 */
const R = 42;
const C = 2 * Math.PI * R;

export function AiVisibilityChart() {
  const [region, setRegion] = useState<'india' | 'global'>('india');
  const [key, setKey] = useState<IndiaFilterKey>('all');
  const f = INDIA_FILTERS.find((x) => x.key === key) ?? INDIA_FILTERS[0];
  const pct = percent(f.notMentioned, f.total);
  const mentioned = f.total - f.notMentioned;
  const arc = (f.notMentioned / f.total) * C;

  return (
    <div className="h-aiv" role="group" aria-label="AI visibility research chart">
      <div className="h-aiv-seg" role="group" aria-label="Region">
        {(['india', 'global'] as const).map((r) => (
          <button key={r} type="button" aria-pressed={region === r} onClick={() => setRegion(r)}>
            {r === 'india' ? 'India' : 'Global'}
          </button>
        ))}
      </div>

      <div className="h-aiv-panel">
        <div className={'h-aiv-view' + (region === 'india' ? '' : ' is-off')} aria-hidden={region !== 'india'}>
            <div className="h-aiv-seg h-aiv-seg-ind" role="group" aria-label="Industry">
              {INDIA_FILTERS.map((x) => (
                <button key={x.key} type="button" aria-pressed={key === x.key} onClick={() => setKey(x.key)}>
                  {x.label}
                </button>
              ))}
            </div>
            <div className="h-aiv-body">
              <div className="h-aiv-ring" aria-hidden="true">
                <svg viewBox="0 0 100 100">
                  <circle className="h-aiv-t" cx="50" cy="50" r={R} />
                  <circle className="h-aiv-v" cx="50" cy="50" r={R} strokeDasharray={`${arc} ${C - arc}`} transform="rotate(-90 50 50)" />
                </svg>
                <span className="h-aiv-pct">{pct}%</span>
              </div>
              <ul className="h-aiv-leg">
                <li>
                  <i className="h-aiv-sw h-aiv-sw-no" aria-hidden="true" />
                  Not mentioned <b>{f.notMentioned}</b>
                </li>
                <li>
                  <i className="h-aiv-sw h-aiv-sw-yes" aria-hidden="true" />
                  Mentioned <b>{mentioned}</b>
                </li>
              </ul>
            </div>
            <p className="px-sr" aria-live="polite">
              {f.label}: {pct}% ({f.notMentioned} of {f.total} tested brands) not mentioned in tested AI recommendations.
            </p>
            <p className="h-aiv-cap">
              <b>{REPORT.metric}:</b> {f.notMentioned} of {f.total} tested brands ({f.label.toLowerCase()}).
              {f.note ? ' ' + f.note : ''}
            </p>
        </div>
        <div className={'h-aiv-view h-aiv-global' + (region === 'global' ? '' : ' is-off')} aria-hidden={region !== 'global'}>
          <p className="h-aiv-gh">Comparable global data is not yet available.</p>
          <p>We’ll publish a global comparison when we have sufficiently comparable research.</p>
        </div>
      </div>

      <p className="h-aiv-src">
        Third-party research by{' '}
        <a href={REPORT.url} target="_blank" rel="noopener noreferrer">
          {REPORT.source}
        </a>
        , {REPORT.period}: 210 selected Indian brands across ten sectors. {REPORT.limitation}
      </p>
    </div>
  );
}
