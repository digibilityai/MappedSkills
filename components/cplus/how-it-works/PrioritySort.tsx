'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { Glyph } from './icons';

/**
 * How It Works: the priority sort (owner-approved G1 R2 design, DEC-058; behaviour unchanged from the released page).
 *   - One native button (aria-pressed) toggles the view; focus stays on it; a polite status line announces the result.
 *   - Groups are never colour-only: each has a heading, an icon and a position, and "not worth doing" is struck through.
 *   - Motion: the cards glide from where they were to where they land (FLIP, Web Animations), once per press. Under
 *     prefers-reduced-motion they simply appear in place. Nothing loops.
 *   - Without JavaScript (`html.px-js` absent) the button and the unsorted pile are hidden and the sorted groups are
 *     shown: the meaningful state is the fallback.
 */
type Lane = { key: string; t: string; d: string };
type Item = { k: string; lane: string; t: string; why: string };

const LANE_ICON: Record<string, string> = { first: 'target', later: 'clock', not: 'cross' };

export function PrioritySort({
  lanes,
  items,
  button,
  pileLabel,
  statusSorted,
  statusPile,
}: {
  lanes: readonly Lane[];
  items: readonly Item[];
  button: string;
  pileLabel: string;
  statusSorted: string;
  statusPile: string;
}) {
  const [sorted, setSorted] = useState(false);
  const [touched, setTouched] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const first = useRef<Map<string, DOMRect>>(new Map());

  const press = () => {
    const m = new Map<string, DOMRect>();
    root.current?.querySelectorAll<HTMLElement>('.hx-ps-live [data-k]').forEach((el) => m.set(el.dataset.k!, el.getBoundingClientRect()));
    first.current = m;
    setTouched(true);
    setSorted((v) => !v);
  };

  useLayoutEffect(() => {
    const m = first.current;
    if (!m.size) return;
    first.current = new Map();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    root.current?.querySelectorAll<HTMLElement>('.hx-ps-live [data-k]').forEach((el, i) => {
      const a = m.get(el.dataset.k!);
      if (!a || typeof el.animate !== 'function') return;
      const b = el.getBoundingClientRect();
      const dx = a.left - b.left;
      const dy = a.top - b.top;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
      el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], {
        duration: 560,
        delay: i * 35,
        easing: 'cubic-bezier(.2, .75, .2, 1)',
        fill: 'backwards',
      });
    });
  }, [sorted]);

  const card = (it: Item) => (
    <li key={it.k} data-k={it.k} className="hx-pc">
      <b>{it.t}</b>
      <span>{it.why}</span>
    </li>
  );

  const groups = (
    <div className="hx-ps-lanes">
      {lanes.map((l) => (
        <div key={l.key} className={'hx-lane hx-lane-' + l.key}>
          <h3 className="hx-lane-h">
            <span className="hx-lane-ic" aria-hidden="true">
              <Glyph name={LANE_ICON[l.key]} />
            </span>
            {l.t}
          </h3>
          <p className="hx-lane-d">{l.d}</p>
          <ul aria-label={l.t}>{items.filter((it) => it.lane === l.key).map(card)}</ul>
        </div>
      ))}
    </div>
  );

  return (
    <div className="hx-ps" ref={root}>
      <div className="hx-ps-ctl">
        <button type="button" className="px-toggle hx-ps-btn" aria-pressed={sorted} onClick={press}>
          <span className="px-toggle-sw" aria-hidden="true" />
          {button}
        </button>
        {!sorted ? <p className="hx-ps-hint">{pileLabel}</p> : null}
        <p className="px-sr" role="status" aria-live="polite">
          {touched ? (sorted ? statusSorted : statusPile) : ''}
        </p>
      </div>
      {sorted ? (
        <div className="hx-ps-live">{groups}</div>
      ) : (
        <>
          {/* JS: the pile, as found. No JS: hidden, and the sorted groups below are the page. */}
          <ul className="hx-ps-live hx-ps-pile" aria-label={pileLabel}>
            {items.map(card)}
          </ul>
          <div className="hx-ps-nojs">{groups}</div>
        </>
      )}
    </div>
  );
}
