'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { registerDemo, restoreFocus, type DemoState } from './demo';
import { DemoPause } from './DemoPause';

/**
 * The Google Ads page's own tabs: the shared `Tabs` (components/cplus/Interactive.tsx), copied so that the shared
 * component, which /conversion-optimization also uses, stays untouched. The markup, ids, classes and keyboard map are
 * identical. The addition is the optional `demo`, which lets the demonstration coordinator drive the real selection:
 * each step selects a tab (and, on a nudge step, outlines one other tab for a moment). While it runs the root carries
 * `data-demo="running"` and `data-demo-step`, which the stylesheet uses for the section's own visuals. Without `demo`
 * it registers nothing.
 */
export type GaTabsDemo = {
  id: string;
  order: number;
  /** Selects `tab` and holds `hold` ms; a `nudge` step outlines that tab for `hold` ms without selecting it. */
  steps: ({ tab: string; hold: number } | { nudge: string; hold: number })[];
  /** Tab selected when the demonstration ends on its own or is cut short. */
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
  const [nudge, setNudge] = useState<string | null>(null);
  const [state, setState] = useState<DemoState>('idle');
  const base = useId();
  const root = useRef<HTMLDivElement | null>(null);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const cur = active ?? items[0].id;

  useEffect(() => {
    const el = root.current;
    if (!demo || !el) return;
    const clear = () => {
      delete el.dataset.demo;
      delete el.dataset.demoStep;
      setNudge(null);
    };
    const unregister = registerDemo({
      id: demo.id,
      order: demo.order,
      el,
      steps: demo.steps.map((s) => ({ hold: s.hold })),
      onStep: (i) => {
        const s = demo.steps[i];
        if ('nudge' in s) {
          setNudge(s.nudge);
          return;
        }
        setNudge(null);
        el.dataset.demoStep = String(i);
        setActive(s.tab);
      },
      onRest: () => {
        setActive(demo.rest);
        clear();
      },
      onState: (s) => {
        if (s === 'running') el.dataset.demo = 'running';
        else {
          clear();
          restoreFocus(el);
        }
        setState(s);
      },
    });
    return () => {
      unregister();
      delete el.dataset.demo;
      delete el.dataset.demoStep;
    };
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
      {demo && state === 'running' ? <DemoPause id={demo.id} text={demo.pause.text} aria={demo.pause.aria} /> : null}
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
            className={nudge === it.id ? 'px-tab is-nudge' : 'px-tab'}
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
