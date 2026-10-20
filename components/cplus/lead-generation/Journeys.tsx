'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useSequence, type Sequence } from '../ai-seo/Sequence';
import { LG } from './content';

/**
 * The four animated journeys on /lead-generation (owner-approved G1 design, DEC-057). They use the shared /ai-seo
 * sequencer (../ai-seo/Sequence, unchanged) with this page's timing: 2 seconds between steps (owner instruction, not the
 * 1.5 s of /ai-seo and /conversion-optimization), and step 1 on screen from the start (never a blank block). Each plays
 * once, keeps the finished state, has no pause, play or replay control, and stops when a visitor selects a step.
 * Without JavaScript or with reduced motion every step is shown complete. A numbered step is a button once the page is
 * interactive (keyboard, touch, visible focus). The page's other sections are static.
 */
const OPTS = { stepMs: 2000, first: 0, dwellMs: 300 };

const at = (q: Sequence, n: number) => {
  for (let j = 0; j < n; j++) if (q.on(j)) return j;
  return -1;
};
const root = (q: Sequence, n: number) => ({ 'data-at': at(q, n), style: q.style as CSSProperties });
const cls = (q: Sequence, extra: string) => `lx-seq ${extra} ${q.cls}`;

function Num({ q, j, label }: { q: Sequence; j: number; label: string }) {
  return q.armed ? (
    <button type="button" className="lx-n" aria-label={`Show step ${j + 1}: ${label}`} aria-current={q.on(j) ? 'step' : undefined} onClick={() => q.select(j)}>
      {j + 1}
    </button>
  ) : (
    <span className="lx-n" aria-hidden="true">
      {j + 1}
    </span>
  );
}

/* ------------------------------------------------------------------ 1. hero journey */
export function HeroJourney() {
  const [ref, q] = useSequence<HTMLElement>(3, OPTS);
  const h = LG.hero;
  return (
    <figure ref={ref} className={cls(q, 'lx-hero-fig')} aria-labelledby="lx-hero-cap" {...root(q, 3)}>
      <div className="lx-enq" aria-hidden="true">
        <div className="lx-enq-top">
          <span className="lx-enq-k">{h.label}</span>
          <span className="lx-chip lx-chip-1">{h.chips[0]}</span>
          <span className="lx-chip lx-chip-2">{h.chips[1]}</span>
          <span className="lx-chip lx-chip-3">{h.chips[2]}</span>
        </div>
        <p className="lx-ad">
          <b>{h.ad.k}</b>
          {h.ad.t}
        </p>
        <dl className="lx-enq-f">
          {h.fields.map((f) => (
            <div key={f.f}>
              <dt>{f.f}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
        <p className="lx-hand">
          <span className="lx-hand-arw" aria-hidden="true" />
          {h.hand}
        </p>
      </div>
      <ol className="lx-hj" aria-label={h.listLabel}>
        {h.steps.map((s, j) => (
          <li key={s.t} className={`lx-hj-s ${q.state(j)}`} data-i="" aria-current={q.on(j) ? 'step' : undefined}>
            <Num q={q} j={j} label={s.label} />
            <p>
              <b>{s.t}</b>
            </p>
          </li>
        ))}
      </ol>
      <figcaption id="lx-hero-cap" className="px-cap lx-cap">
        {h.cap}
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ 3. what we do: one path, four stops */
const ART: ReactNode[] = [
  <svg key="a" className="lx-art" viewBox="0 0 120 72" aria-hidden="true" focusable="false">
    <g className="lx-s"><circle cx="18" cy="22" r="7" /><path d="M6 46c0-8 5-12 12-12s12 4 12 12" /><circle cx="44" cy="22" r="7" /><path d="M32 46c0-8 5-12 12-12s12 4 12 12" /></g>
    <rect className="lx-s lx-fill" x="66" y="10" width="48" height="16" /><circle className="lx-s" cx="104" cy="18" r="4" />
    <path className="lx-a" d="M62 50h50" /><path className="lx-a" d="M104 43l8 7-8 7" />
  </svg>,
  <svg key="b" className="lx-art" viewBox="0 0 120 72" aria-hidden="true" focusable="false">
    <rect className="lx-s lx-fill" x="30" y="4" width="60" height="64" /><path className="lx-s" d="M30 16h60" />
    <rect className="lx-s" x="40" y="26" width="40" height="8" /><rect className="lx-s" x="40" y="40" width="40" height="8" />
    <rect className="lx-btn" x="40" y="54" width="22" height="8" />
  </svg>,
  <svg key="c" className="lx-art" viewBox="0 0 120 72" aria-hidden="true" focusable="false">
    <path className="lx-s lx-fill" d="M22 30h22l6 10h20l6-10h22v34H22z" />
    <path className="lx-a" d="M60 4v20" /><path className="lx-a" d="M53 17l7 7 7-7" />
    <path className="lx-tick" d="M48 52l8 7 16-15" />
  </svg>,
  <svg key="d" className="lx-art" viewBox="0 0 120 72" aria-hidden="true" focusable="false">
    <rect className="lx-s-ink" x="14" y="14" width="70" height="44" /><path className="lx-s-ink" d="M24 28h40M24 40h28" />
    <path className="lx-tag" d="M78 22h28l8 14-8 14H78z" />
  </svg>,
];

export function PathJourney() {
  const [ref, q] = useSequence<HTMLOListElement>(4, OPTS);
  return (
    <ol ref={ref} className={cls(q, 'lx-path')} aria-label={LG.doLabel} {...root(q, 4)}>
      {LG.stops.map((s, j) => (
        <li key={s.t} className={`lx-tile ${j === 3 ? 'lx-tile-ink' : 'lx-tile-cream'} lx-stop ${q.state(j)}`} data-i="" aria-current={q.on(j) ? 'step' : undefined}>
          <Num q={q} j={j} label={s.t} />
          {ART[j]}
          <h3 className="lx-stop-t">{s.t}</h3>
          <p className="lx-stop-d">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ 4. how an enquiry reaches you: three steps */
export function ReachJourney() {
  const [ref, q] = useSequence<HTMLDivElement>(3, OPTS);
  return (
    <div ref={ref} className={cls(q, 'lx-sort')} {...root(q, 3)}>
      <ol className="lx-gates" aria-label={LG.reachLabel}>
        {LG.reach.map((s, j) => (
          <li key={s.t} className={`lx-tile ${j === 2 ? 'lx-tile-ink' : 'lx-tile-cream'} lx-gate ${q.state(j)}`} data-i="" aria-current={q.on(j) ? 'step' : undefined}>
            <Num q={q} j={j} label={s.t} />
            <h3 className="lx-gate-t">{s.t}</h3>
            <p className="lx-gate-d">{s.d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ 7. what happens next */
export function NextJourney() {
  const [ref, q] = useSequence<HTMLOListElement>(5, OPTS);
  return (
    <ol ref={ref} className={cls(q, 'lx-next')} aria-labelledby="lx-next-k" {...root(q, 5)}>
      {LG.close.next.map((s, j) => (
        <li key={s.t} className={`lx-tile lx-tile-ink ${q.state(j)}`} data-i="" aria-current={q.on(j) ? 'step' : undefined}>
          <Num q={q} j={j} label={s.label} />
          <p>{s.t}</p>
        </li>
      ))}
    </ol>
  );
}
