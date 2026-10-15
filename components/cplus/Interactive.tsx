'use client';

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

/**
 * C+ the WAI-ARIA tabs and pressed toggle, from the approved prototype (proto/direction-c-plus 0a8b611, components/proto-cplus/Interactive.tsx), unchanged.
 */

/* ------------------------------------------------------------------- tabs --
   WAI-ARIA tabs (automatic activation). Inactive panels carry `.is-off` from the first render (no hydration
   mismatch, no post-hydration shift) and are `display: none` only under `html.px-js` (set by an inline script before
   first paint, see PxPage), so without JavaScript every panel is shown and the tablist is hidden. Not the `hidden`
   attribute: Tailwind's base layer forces `[hidden]` to `display: none !important`, which no unlayered rule can undo. */
export function Tabs({
  items,
  className,
  label,
}: {
  items: { id: string; tab: ReactNode; panel: ReactNode }[];
  className?: string;
  label: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const cur = active ?? items[0].id;
  const onKey = (e: KeyboardEvent, i: number) => {
    const n = items.length;
    const go = (k: number) => {
      const j = (k + n) % n;
      setActive(items[j].id);
      refs.current[j]?.focus();
    };
    const to: Record<string, number> = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: n - 1 };
    if (e.key in to) {
      e.preventDefault();
      go(to[e.key]);
    }
  };
  return (
    <div className={className} data-tabs="">
      <div role="tablist" aria-label={label} className="px-tablist">
        {items.map((it, i) => (
          <button
            key={it.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            type="button"
            id={`${base}-t-${it.id}`}
            aria-selected={cur === it.id}
            aria-controls={`${base}-p-${it.id}`}
            tabIndex={cur === it.id ? 0 : -1}
            className="px-tab"
            onClick={() => setActive(it.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {it.tab}
          </button>
        ))}
      </div>
      {items.map((it) => (
        <div
          key={it.id}
          role="tabpanel"
          id={`${base}-p-${it.id}`}
          aria-labelledby={`${base}-t-${it.id}`}
          tabIndex={0}
          className={cur === it.id ? 'px-tabpanel' : 'px-tabpanel is-off'}
        >
          {it.panel}
        </div>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------- toggle --
   A pressed button that sets `data-on` on its wrapper; CSS does the rest. */
export function PressToggle({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const [on, setOn] = useState(false);
  return (
    <div className={className} data-on={on ? '' : undefined}>
      <button type="button" className="px-toggle" aria-pressed={on} onClick={() => setOn((v) => !v)}>
        <span className="px-toggle-sw" aria-hidden="true" />
        {label}
      </button>
      {children}
    </div>
  );
}

/* ----------------------------------------------------------------- slider --
   Before/after reveal driven by a native range input (keyboard: arrows/PageUp/PageDown/Home/End). */
export function Reveal({
  before,
  after,
  label,
  className,
}: {
  before: ReactNode;
  after: ReactNode;
  label: string;
  className?: string;
}) {
  const [v, setV] = useState(50);
  return (
    <div className={className} style={{ ['--px-split' as string]: `${v}%` }}>
      <div className="px-rev-stage">
        <div className="px-rev-a">{before}</div>
        <div className="px-rev-b" aria-hidden={v <= 2 ? true : undefined}>
          {after}
        </div>
        <span className="px-rev-handle" aria-hidden="true" />
      </div>
      <label className="px-rev-ctl">
        <span className="px-sr">{label}</span>
        <input type="range" min={0} max={100} step={1} value={v} onChange={(e) => setV(Number(e.target.value))} />
      </label>
    </div>
  );
}
