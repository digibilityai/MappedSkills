'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { registerDemo, stopDemo, type DemoState } from './demo';

/**
 * The Google Ads page's own tabs: the shared `Tabs` (components/cplus/Interactive.tsx), copied so that the shared
 * component, which /conversion-optimization also uses, stays untouched. The markup, ids, classes and keyboard map are
 * identical. The only addition is the optional `demo`, which lets the demonstration coordinator select tabs in turn.
 * Without `demo` (every use in this commit) it registers nothing: no observer, timer or listener.
 */
export type GaTabsDemo = {
  id: string;
  order: number;
  /** Tab ids in the order they are shown, with how long each stays selected (ms). */
  steps: { tab: string; hold: number }[];
  /** Tab selected if the demonstration is cut short (left the screen, tab hidden). */
  rest: string;
  pause: { text: string; aria: string };
};

export function GaTabs({
  items,
  className,
  label,
  demo,
}: {
  items: { id: string; tab: ReactNode; panel: ReactNode }[];
  className?: string;
  label: string;
  demo?: GaTabsDemo;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [state, setState] = useState<DemoState>('idle');
  const base = useId();
  const root = useRef<HTMLDivElement | null>(null);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const cur = active ?? items[0].id;

  useEffect(() => {
    if (!demo || !root.current) return;
    return registerDemo({
      id: demo.id,
      order: demo.order,
      el: root.current,
      steps: demo.steps.map((s) => ({ hold: s.hold })),
      onStep: (i) => setActive(demo.steps[i].tab),
      onRest: () => setActive(demo.rest),
      onState: setState,
    });
    // The demonstration is configured once per page load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div className={className} data-tabs="" ref={root}>
      {demo && state === 'running' ? (
        <button type="button" className="ga-pause" aria-label={demo.pause.aria} onClick={() => stopDemo(demo.id)}>
          {demo.pause.text}
        </button>
      ) : null}
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
