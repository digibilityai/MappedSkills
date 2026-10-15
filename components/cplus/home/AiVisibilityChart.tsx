'use client';

import { useEffect, useRef, useState } from 'react';
import { INDIA_FILTERS, REPORT, percent, type IndiaFilterKey } from './ai-visibility-data';

/**
 * Homepage AI visibility chart: a doughnut of third-party (Reckona AI) counts. Percentages come from the counts in
 * ./ai-visibility-data.ts. Selecting a sector updates the ring, headline percentage, counts and explanation together.
 * Segments are keyboard-focusable and explained in text; motion (arc easing, count-up) is skipped for reduced motion.
 */
const R = 42;
const GAP = 1.2; // visual gap between segments, in pathLength units (of 100)

type Seg = 'no' | 'yes';

export function AiVisibilityChart() {
  const [key, setKey] = useState<IndiaFilterKey>('all');
  const [seg, setSeg] = useState<Seg>('no');
  const f = INDIA_FILTERS.find((x) => x.key === key) ?? INDIA_FILTERS[0];
  const pct = percent(f.notMentioned, f.total);
  const mentioned = f.total - f.notMentioned;
  const noLen = (f.notMentioned / f.total) * 100;
  const yesLen = 100 - noLen;
  const scope = f.scope;

  // Count the headline number up/down to the new value (instant under reduced motion).
  const [shown, setShown] = useState(pct);
  const from = useRef(pct);
  useEffect(() => {
    const dur = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 500;
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (t: number) => {
      const k = dur ? Math.min(1, (t - start) / dur) : 1;
      const v = Math.round(a + (pct - a) * (1 - Math.pow(1 - k, 3)));
      from.current = v;
      setShown(v);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pct]);

  const explain: Record<Seg, string> = {
    no: `${f.notMentioned} of ${f.total} ${scope} were not mentioned, unprompted, in any buyer-intent answer from ChatGPT, Gemini or Perplexity.`,
    yes: `${mentioned} of ${f.total} ${scope} were mentioned in at least one tested answer.`,
  };
  const onKey = (s: Seg) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSeg(s);
    }
  };
  const segProps = (s: Seg, label: string) => ({
    tabIndex: 0,
    role: 'button' as const,
    'aria-label': label,
    'aria-pressed': seg === s,
    onClick: () => setSeg(s),
    onFocus: () => setSeg(s),
    onMouseEnter: () => setSeg(s),
    onKeyDown: onKey(s),
  });

  return (
    <div className="h-aiv" role="group" aria-label="AI visibility research chart">
      <div className="h-aiv-seg" role="group" aria-label="Sector">
        {INDIA_FILTERS.map((x) => (
          <button key={x.key} type="button" aria-pressed={key === x.key} onClick={() => setKey(x.key)}>
            {x.label}
          </button>
        ))}
      </div>

      <div className="h-aiv-panel">
        <div className="h-aiv-ring">
          <svg viewBox="0 0 100 100" aria-label={`Doughnut chart, ${f.label}`} role="group">
            <g transform="rotate(-90 50 50)">
              <circle
                className={'h-aiv-s h-aiv-s-no' + (seg === 'no' ? ' is-on' : '')}
                cx="50" cy="50" r={R} pathLength={100}
                strokeDasharray={`${Math.max(noLen - GAP, 0)} ${100 - Math.max(noLen - GAP, 0)}`}
                strokeDashoffset={-GAP / 2}
                {...segProps('no', `Not mentioned: ${f.notMentioned} of ${f.total}. ${explain.no}`)}
              />
              <circle
                className={'h-aiv-s h-aiv-s-yes' + (seg === 'yes' ? ' is-on' : '')}
                cx="50" cy="50" r={R} pathLength={100}
                strokeDasharray={`${Math.max(yesLen - GAP, 0)} ${100 - Math.max(yesLen - GAP, 0)}`}
                strokeDashoffset={-(noLen + GAP / 2)}
                {...segProps('yes', `Mentioned: ${mentioned} of ${f.total}. ${explain.yes}`)}
              />
            </g>
          </svg>
          <span className="h-aiv-pct" aria-hidden="true">
            {shown}%<small>not mentioned</small>
          </span>
        </div>

        <div className="h-aiv-info">
          <div className="h-aiv-read" aria-live="polite">
            <p className="h-aiv-stat">
              <span className="h-aiv-num">
                <b>{seg === 'no' ? f.notMentioned : mentioned}</b> of {f.total}
              </span>
              <span className="h-aiv-lbl">
                {scope} {seg === 'no' ? 'not mentioned' : 'mentioned'}
              </span>
            </p>
          </div>
          <ul className="h-aiv-leg">
            <li>
              <button type="button" aria-pressed={seg === 'no'} onClick={() => setSeg('no')}>
                <i className="h-aiv-sw h-aiv-sw-no" aria-hidden="true" />
                Not mentioned <b>{f.notMentioned}</b>
              </button>
            </li>
            <li>
              <button type="button" aria-pressed={seg === 'yes'} onClick={() => setSeg('yes')}>
                <i className="h-aiv-sw h-aiv-sw-yes" aria-hidden="true" />
                Mentioned <b>{mentioned}</b>
              </button>
            </li>
          </ul>
          <p className="h-aiv-cap">
            {seg === 'no'
              ? 'Not named, unprompted, in buyer-intent answers on ChatGPT, Gemini or Perplexity.'
              : 'Named in at least one tested answer.'}
            {f.note ? ' ' + f.note : ''}
          </p>
        </div>
      </div>

      <p className="h-aiv-src">
        Source:{' '}
        <a href={REPORT.url} target="_blank" rel="noopener noreferrer">
          {REPORT.source}
        </a>
        , {REPORT.period}. 210 selected Indian brands. {REPORT.limitation}
      </p>
    </div>
  );
}
