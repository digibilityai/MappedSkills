'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { registerDemo, restoreFocus, type DemoState } from './demo';
import { DemoPause } from './DemoPause';

/**
 * Wraps server-rendered markup (the hero figure, the process list) so a demonstration can run on it. While it runs the
 * element carries `data-demo="running"` and `data-demo-step` (the active step, 0-based), and CSS does the rest; both are
 * absent otherwise, so the server markup is the resting state. `radios` names a native radio group inside the region
 * whose options are checked in turn (the hero's `:has()` lighting follows the real selection).
 */
export type DemoRegionProps = {
  id: string;
  order: number;
  steps: { hold: number }[];
  /** Native radio group (input name) to check in step order, if the demonstration drives one. */
  radios?: string;
  /** The radio returned to when the demonstration ends on its own or is cut short. */
  restStep?: number;
  pause: { text: string; aria: string };
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export function DemoRegion({ id, order, steps, radios, restStep = 0, pause, as: Tag = 'div', className, children }: DemoRegionProps) {
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
    const clear = () => {
      delete el.dataset.demo;
      delete el.dataset.demoStep;
    };
    const unregister = registerDemo({
      id,
      order,
      el,
      steps,
      onStep: (i) => {
        el.dataset.demoStep = String(i);
        radio(i);
      },
      onRest: () => {
        radio(restStep);
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
      clear();
    };
    // The demonstration is configured once per page load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag className={className} ref={root}>
      {state === 'running' ? <DemoPause id={id} text={pause.text} aria={pause.aria} /> : null}
      {children}
    </Tag>
  );
}
