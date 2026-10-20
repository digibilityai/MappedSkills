'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useSequence, type Sequence } from '../ai-seo/Sequence';
import { HOW } from './content';
import { Glyph } from './icons';

/**
 * The four step sequences on /how-it-works (owner-approved G1 R2 design, DEC-058). They use the shared /ai-seo sequencer
 * (../ai-seo/Sequence, unchanged) with 1.5 seconds between steps (HW-D07, as /ai-seo and /conversion-optimization) and
 * step 1 on screen from the start. Each plays once, keeps the finished state, has no pause, play or replay control, and
 * stops when a visitor selects a step. Without JavaScript or with reduced motion every step is shown complete.
 *   - HeroPath: three connected stages (talk, plan, work); the track fills as each is reached.
 *   - StartStages: three getting-started stages beside the working sheet, which fills in one block per stage.
 *   - ActionBoard: the approved-actions table; rows are reached in turn (no step buttons).
 *   - ReportTrack: one monthly report, three markers on one track.
 */
const OPTS = { stepMs: 1500, first: 0, dwellMs: 300 };

const at = (q: Sequence, n: number) => {
  for (let j = 0; j < n; j++) if (q.on(j)) return j;
  return -1;
};
/** Root attributes: the active step, a "done" flag on the last step, and the track progress (full when static). */
const root = (q: Sequence, n: number) => {
  const a = at(q, n);
  return {
    'data-at': a,
    'data-done': a === n - 1 ? '' : undefined,
    style: { ...(q.style as CSSProperties), '--hx-p': a < 0 ? 1 : a / Math.max(n - 1, 1) } as CSSProperties,
  };
};
const cls = (q: Sequence, extra: string) => `hx-seq ${extra} ${q.cls}`;
/** A block that appears from stage `from` on (always shown when static, after a choice or without JavaScript). */
const from = (q: Sequence, n: number, k: number) => {
  const a = at(q, n);
  return a < 0 || a >= k ? 'is-shown' : '';
};

function Num({ q, j, label, className = 'hx-n', children }: { q: Sequence; j: number; label: string; className?: string; children: ReactNode }) {
  return q.armed ? (
    <button type="button" className={className} aria-label={`Show step ${j + 1}: ${label}`} aria-current={q.on(j) ? 'step' : undefined} onClick={() => q.select(j)}>
      {children}
    </button>
  ) : (
    <span className={className} aria-hidden="true">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ 1. hero: one connected path */
export function HeroPath() {
  const [ref, q] = useSequence<HTMLDivElement>(3, OPTS);
  const h = HOW.hero;
  return (
    <figure className="hx-hero-fig" aria-labelledby="hx-hero-cap">
      <div ref={ref} className={cls(q, 'hx-card')} {...root(q, 3)}>
        <div className="hx-card-top">
          <span className="hx-card-k">{h.label}</span>
          <span className="hx-tag">{h.tag}</span>
        </div>
        <ol className="hx-path">
          {h.stages.map((s, j) => (
            <li key={s.t} className={q.state(j)} data-i="" aria-current={q.on(j) ? 'step' : undefined}>
              <Num q={q} j={j} label={s.label} className="hx-n hx-node">
                <Glyph name={s.icon} />
              </Num>
              <p>
                <b>{s.t}</b>
                <span>{s.d}</span>
              </p>
              {j === h.stages.length - 1 ? (
                <span className="hx-loop" aria-hidden="true">
                  <Glyph name="loop" />
                  {h.loop}
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
      <figcaption id="hx-hero-cap" className="px-cap">
        {h.cap}
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ 2. getting started: three stages and the sheet */
export function StartStages() {
  const [ref, q] = useSequence<HTMLDivElement>(3, OPTS);
  const s = HOW.start;
  const sh = s.sheet;
  return (
    <div ref={ref} className={cls(q, 'hx-start-g')} {...root(q, 3)}>
      <ol className="hx-stg" aria-label={s.listLabel}>
        {s.stages.map((st, j) => (
          <li key={st.t} className={`${q.state(j)}${j === s.stages.length - 1 ? ' hx-stg-ok' : ''}`} data-i="" aria-current={q.on(j) ? 'step' : undefined}>
            <Num q={q} j={j} label={st.t}>
              {j + 1}
            </Num>
            <div className="hx-stg-b">
              <h3 className="hx-stg-t">{st.t}</h3>
              <p className="hx-stg-d">{st.d}</p>
              <ul className="hx-chips">
                {st.chips.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <figure className="hx-sheet-fig" aria-labelledby="hx-sheet-cap">
        <div className="hx-sheet" aria-hidden="true">
          <div className="hx-sheet-top">
            <span className="hx-sheet-t">{sh.title}</span>
            <span className="hx-tag hx-tag-ink">{sh.tag}</span>
          </div>
          <div className={`hx-sr ${from(q, 3, 0)}`} data-from="0">
            <p className="hx-sr-k">{sh.want.k}</p>
            <p className="hx-sr-v">{sh.want.v}</p>
            <p className="hx-sr-pills">
              <span className="hx-pill">
                <Glyph name="reply" />
                {sh.pills[0]}
              </span>
              <span className="hx-pill">
                <Glyph name="phone" />
                {sh.pills[1]}
              </span>
            </p>
          </div>
          <div className={`hx-sr ${from(q, 3, 1)}`} data-from="1">
            <p className="hx-sr-k">{sh.found.k}</p>
            <ul className="hx-sr-list">
              {sh.found.items.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="hx-sr-k hx-sr-k2">{sh.plan.k}</p>
            <p className="hx-sr-v">{sh.plan.v}</p>
          </div>
          <div className={`hx-sr hx-sr-ok ${from(q, 3, 2)}`} data-from="2">
            <p className="hx-sr-k">{sh.decision.k}</p>
            <p className="hx-stamp">
              <Glyph name="check" />
              {sh.decision.v}
            </p>
          </div>
        </div>
        <figcaption id="hx-sheet-cap" className="px-cap px-cap-ink">
          {s.cap}
        </figcaption>
      </figure>
    </div>
  );
}

/* ------------------------------------------------------------------ 4. doing the work: the approved-actions board */
export function ActionBoard() {
  const [ref, q] = useSequence<HTMLDivElement>(4, OPTS);
  const w = HOW.work;
  const b = w.board;
  return (
    <figure className="hx-board-fig" aria-labelledby="hx-board-cap">
      <div ref={ref} className={cls(q, 'hx-board')} {...root(q, 4)}>
        <div className="hx-sheet-top">
          <span className="hx-sheet-t">{b.title}</span>
          <span className="hx-tag hx-tag-ink">{b.tag}</span>
        </div>
        <table className="hx-acts">
          <caption className="px-sr">{b.caption}</caption>
          <thead>
            <tr>
              {b.head.map((h) => (
                <th key={h} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {b.rows.map((r, j) => (
              <tr key={r.t} className={q.state(j)} data-i="">
                <th scope="row">
                  {r.t}
                  {'note' in r ? <span className="hx-note">{r.note}</span> : null}
                </th>
                <td>
                  <span className={r.both ? 'hx-who hx-who-both' : 'hx-who'}>{r.who}</span>
                </td>
                <td>
                  <span className={`hx-st hx-st-${r.state}`}>
                    {r.state === 'done' ? <Glyph name="check" /> : null}
                    {r.s}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption id="hx-board-cap" className="px-cap px-cap-ink">
        {w.cap}
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ 5. keeping you informed: one report, one track */
export function ReportTrack() {
  const [ref, q] = useSequence<HTMLOListElement>(3, OPTS);
  const r = HOW.info.report;
  return (
    <figure className="hx-rep-fig" aria-labelledby="hx-rep-cap">
      <div className="hx-report">
        <div className="hx-sheet-top hx-report-top">
          <span className="hx-sheet-t">{r.title}</span>
          <span className="hx-tag hx-tag-ink">{r.tag}</span>
        </div>
        <ol ref={ref} className={cls(q, 'hx-rep')} aria-label={r.listLabel} {...root(q, 3)}>
          {r.steps.map((s, j) => (
            <li key={s.t} className={q.state(j)} data-i="" aria-current={q.on(j) ? 'step' : undefined}>
              <Num q={q} j={j} label={s.t} className={`hx-n hx-mark hx-mark-${s.mark}`}>
                {j + 1}
              </Num>
              <p>
                <b>{s.t}</b>
                <span>{s.d}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>
      <figcaption id="hx-rep-cap" className="px-cap">
        {HOW.info.cap}
      </figcaption>
    </figure>
  );
}
