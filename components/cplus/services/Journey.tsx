'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Services "how the parts work together": a four-stage connected journey.
 *   - Rendered fully lit on the server and without JavaScript, under reduced motion and without IntersectionObserver.
 *   - Otherwise it resets to unlit when mounted and plays once, the first time it is 40% visible: each stage lights,
 *     then the line to the next fills. It never loops, and choosing a stage finishes the sequence at once.
 *   - Choosing a stage highlights it and its link to the next stage; the explanation is always in the DOM
 *     (visually shown beside each stage on narrow screens, in the shared panel on wide ones).
 */

type Stage = { k: string; s: string; d: string };

const ICONS: ReactNode[] = [
  <>
    <circle cx="14" cy="14" r="7" />
    <path d="M19.5 19.5 27 27" />
  </>,
  <>
    <rect x="4" y="6" width="24" height="20" rx="2" />
    <path d="M4 12h24M9 9h.01M13 9h.01" />
  </>,
  <>
    <rect x="4" y="8" width="24" height="17" rx="2" />
    <path d="m5 10 11 8 11-8" />
  </>,
  <>
    <path d="M5 27V5M5 27h22" />
    <path d="m9 21 6-6 4 4 7-8" />
  </>,
];

const STEP_MS = 650;

export function Journey({ stages, label, stepOf }: { stages: Stage[]; label: string; stepOf: string[] }) {
  const last = stages.length - 1;
  const [lit, setLit] = useState(stages.length); // stages lit
  const [linked, setLinked] = useState(stages.length); // connectors filled
  const [active, setActive] = useState(last);
  const root = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => {
    const reduce = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = root.current;
    if (reduce || typeof IntersectionObserver !== 'function' || !el) return;

    setLit(0);
    setLinked(0);
    setActive(0);

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        for (let i = 0; i <= last; i++) {
          timers.current.push(
            window.setTimeout(() => {
              setLit(i + 1);
              setActive(i);
            }, 250 + i * STEP_MS * 2)
          );
          if (i < last) timers.current.push(window.setTimeout(() => setLinked(i + 1), 250 + i * STEP_MS * 2 + STEP_MS * 0.6));
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clear();
    };
  }, [last]);

  const choose = (i: number) => {
    clear();
    setLit(stages.length);
    setLinked(stages.length);
    setActive(i);
  };

  return (
    <div className="jr" ref={root}>
      <ol className="jr-list" aria-label={label}>
        {stages.map((st, i) => (
          <li
            key={st.k}
            className="jr-item"
            data-lit={i < lit ? '' : undefined}
            data-linked={i < linked ? '' : undefined}
            data-active={i === active ? '' : undefined}
          >
            <button type="button" className="jr-btn" aria-pressed={i === active} aria-describedby={`jr-d-${i}`} onClick={() => choose(i)}>
              <span className="jr-node" aria-hidden="true">
                <svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {ICONS[i]}
                </svg>
              </span>
              <span className="jr-txt">
                <span className="jr-k">{st.k}</span>
                <span className="jr-s">{st.s}</span>
              </span>
            </button>
            <p className="jr-d" id={`jr-d-${i}`}>
              {st.d}
            </p>
            {i < last && (
              <span className="jr-link" aria-hidden="true">
                <span className="jr-fill" />
              </span>
            )}
          </li>
        ))}
      </ol>
      {/* shared panel for wide screens; the same text is already in the list above, so it is hidden from assistive technology */}
      <div className="jr-panel" aria-hidden="true">
        <span className="jr-step">{stepOf[active]}</span>
        <p key={active} className="jr-panel-d">
          {stages[active].d}
        </p>
      </div>
    </div>
  );
}
