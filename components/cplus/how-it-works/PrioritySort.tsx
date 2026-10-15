'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { Icon } from '../Icons';

/**
 * C+ How It Works: the priority sort, from the approved prototype (proto/direction-c-plus 0a8b611,
 * components/proto-cplus/PrioritySort.tsx), unchanged.
 *   - One native button (aria-pressed) toggles the view; focus stays on it; a polite status line announces the result.
 *   - Groups are never colour-only: each has a heading, an icon, a position, and "not worth doing" is struck through.
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
  lanes: Lane[];
  items: Item[];
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
    root.current?.querySelectorAll<HTMLElement>('.ps-live [data-k]').forEach((el) => m.set(el.dataset.k!, el.getBoundingClientRect()));
    first.current = m;
    setTouched(true);
    setSorted((v) => !v);
  };

  useLayoutEffect(() => {
    const m = first.current;
    if (!m.size) return;
    first.current = new Map();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    root.current?.querySelectorAll<HTMLElement>('.ps-live [data-k]').forEach((el, i) => {
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

  const card = (it: Item, withWhy: boolean) => (
    <li key={it.k} data-k={it.k} className={'ps-card ps-' + it.lane}>
      <span className="ps-card-t">{it.t}</span>
      {withWhy && <span className="ps-card-why">{it.why}</span>}
    </li>
  );

  const groups = (
    <div className="ps-lanes">
      {lanes.map((l) => (
        <div key={l.key} className={'ps-lane ps-lane-' + l.key}>
          <h3 className="ps-lane-h">
            <span className="ps-lane-ic" aria-hidden="true">
              <Icon name={LANE_ICON[l.key]} size={20} />
            </span>
            {l.t}
          </h3>
          <p className="ps-lane-d">{l.d}</p>
          <ul className="ps-list" aria-label={l.t}>
            {items.filter((it) => it.lane === l.key).map((it) => card(it, true))}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <div className="ps" ref={root} data-sorted={sorted ? '' : undefined}>
      <div className="ps-ctl">
        <button type="button" className="px-toggle ps-btn" aria-pressed={sorted} onClick={press}>
          <span className="px-toggle-sw" aria-hidden="true" />
          {button}
        </button>
        <p className="px-sr" role="status" aria-live="polite">
          {touched ? (sorted ? statusSorted : statusPile) : ''}
        </p>
      </div>
      {sorted ? (
        <div className="ps-live">{groups}</div>
      ) : (
        <>
          {/* JS: the pile, as found. No JS: hidden, and the sorted groups below are the page. */}
          <div className="ps-live ps-pile-w">
            <p className="ps-pile-l">{pileLabel}</p>
            <ul className="ps-pile" aria-label={pileLabel}>
              {items.map((it) => card(it, false))}
            </ul>
          </div>
          <div className="ps-nojs">{groups}</div>
        </>
      )}
    </div>
  );
}
