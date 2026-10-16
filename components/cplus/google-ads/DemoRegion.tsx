'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { registerDemo, stopDemo, type DemoState } from './demo';

/**
 * Wraps server-rendered markup (the hero figure, the process list) so a demonstration can run on it. The coordinator
 * writes `data-demo-step` (the active step, 0-based) and `data-demo="running"` on the element, and CSS does the rest;
 * both are absent until a demonstration runs, so the server markup is the resting state. `radios` names a native
 * radio group inside the region whose options are checked in turn, so the hero's existing `:has()` lighting follows.
 * Not used by any section in this commit.
 */
export type DemoRegionProps = {
  id: string;
  order: number;
  steps: { hold: number }[];
  /** Native radio group (input name) to check in step order, if the demonstration drives one. */
  radios?: string;
  /** Step shown if the demonstration is cut short; the radio group returns to its default value. */
  restStep?: number;
  /** Return to the resting step when the demonstration finishes on its own. */
  restOnComplete?: boolean;
  pause: { text: string; aria: string };
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export function DemoRegion({ id, order, steps, radios, restStep = 0, restOnComplete = false, pause, as: Tag = 'div', className, children }: DemoRegionProps) {
  const root = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<DemoState>('idle');

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const radio = (i: number) => {
      if (!radios) return;
      const inputs = el.querySelectorAll<HTMLInputElement>(`input[type="radio"][name="${radios}"]`);
      if (inputs[i]) inputs[i].checked = true;
    };
    const show = (i: number) => {
      el.dataset.demoStep = String(i);
      radio(i);
    };
    const unregister = registerDemo({
      id,
      order,
      el,
      steps,
      onStep: show,
      onRest: () => {
        if (restOnComplete) show(restStep);
        delete el.dataset.demoStep;
      },
      onState: (s) => {
        if (s === 'running') el.dataset.demo = 'running';
        else delete el.dataset.demo;
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

  return (
    <Tag className={className} ref={root}>
      {state === 'running' ? (
        <button type="button" className="ga-pause" aria-label={pause.aria} onClick={() => stopDemo(id)}>
          {pause.text}
        </button>
      ) : null}
      {children}
    </Tag>
  );
}
