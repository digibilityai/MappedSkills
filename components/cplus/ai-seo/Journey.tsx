'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

/** Owner rule 7: two seconds between steps. */
export const STEP_MS = 2000;
/** The list must stay in view this long before it starts (the same dwell as the Google Ads demonstrations). */
export const DWELL_MS = 400;
/** Share of the list that counts as "in view". */
const ENTER_RATIO = 0.4;

type Step = { w: string; t: string; d: string };
type Mode = 'pause' | 'play' | 'replay';
type Labels = { pause: string; play: string; replay: string; of: string };

/**
 * The five-step journey on /ai-seo (approved G1 R2 behaviour).
 *   - Server render, no JavaScript, or reduced motion: every step shown complete, the button absent. Nothing moves.
 *   - Otherwise it starts once the list has been 40% in view for DWELL_MS, highlights one step at a time and advances
 *     every STEP_MS. After the last step it settles into the complete state. It plays once and never loops (Brand DNA).
 *   - A visible Pause / Play / Replay button (WCAG 2.2.2). Leaving the screen or hiding the tab pauses it; it resumes on
 *     return unless the visitor paused it. Switching to reduced motion mid-run shows the complete state.
 *   - No live region and no focus movement: the active step carries aria-current="step" only.
 */
export function Journey({ heading, steps, big, labels }: { heading: ReactNode; steps: Step[]; big: number; labels: Labels }) {
  const n = steps.length;
  const listRef = useRef<HTMLOListElement>(null);
  const clickRef = useRef<() => void>(() => {});
  const [armed, setArmed] = useState(false);
  /** Active step index; -1 before the first step, n once complete. */
  const [k, setK] = useState(-1);
  const [mode, setMode] = useState<Mode>('pause');

  useEffect(() => {
    const list = listRef.current;
    const mql = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    if (!list || mql?.matches || typeof IntersectionObserver !== 'function') return;

    let i = -1;
    let state: 'idle' | 'running' | 'paused' | 'done' = 'idle';
    let userPaused = false;
    let inView = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let dwell: ReturnType<typeof setTimeout> | null = null;
    const clear = (t: ReturnType<typeof setTimeout> | null) => t !== null && clearTimeout(t);

    const tick = () => {
      if (i < n - 1) {
        i += 1;
        setK(i);
        timer = setTimeout(tick, STEP_MS);
      } else {
        state = 'done';
        timer = null;
        setK(n);
        setMode('replay');
      }
    };
    const run = () => {
      state = 'running';
      setMode('pause');
      clear(timer);
      if (i < 0) tick();
      else timer = setTimeout(tick, STEP_MS);
    };
    const pause = () => {
      clear(timer);
      timer = null;
      if (state === 'running') {
        state = 'paused';
        setMode('play');
      }
    };
    clickRef.current = () => {
      if (state === 'running') {
        userPaused = true;
        pause();
      } else if (state === 'done') {
        userPaused = false;
        i = -1;
        setK(-1);
        run();
      } else if (state === 'idle') {
        /* Paused before it reached the screen: it will not start on its own. */
        userPaused = true;
        state = 'paused';
        setMode('play');
      } else {
        userPaused = false;
        run();
      }
    };

    setArmed(true);
    setK(-1);
    setMode('pause');

    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          inView = e.intersectionRatio >= ENTER_RATIO;
          clear(dwell);
          if (inView) {
            dwell = setTimeout(() => {
              if (state === 'idle' || (state === 'paused' && !userPaused)) run();
            }, DWELL_MS);
          } else if (state === 'running') pause();
        });
      },
      { threshold: [0, ENTER_RATIO] }
    );
    io.observe(list);

    const onVis = () => {
      if (document.hidden && state === 'running') pause();
      else if (!document.hidden && inView && state === 'paused' && !userPaused) run();
    };
    document.addEventListener('visibilitychange', onVis);

    /* Reduced motion switched on mid-way: stop and show the complete, static state. */
    const onMotion = () => {
      if (!mql?.matches) return;
      clear(timer);
      clear(dwell);
      io.disconnect();
      state = 'done';
      setArmed(false);
      setK(n);
    };
    mql?.addEventListener?.('change', onMotion);

    return () => {
      clear(timer);
      clear(dwell);
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      mql?.removeEventListener?.('change', onMotion);
    };
  }, [n]);

  const complete = !armed || k >= n;
  const label = labels[mode];
  const progress = complete ? 100 : (Math.max(0, k) / (n - 1)) * 100;

  return (
    <>
      <div className="ax-jr-head">
        <div>{heading}</div>
        <button type="button" className="ax-jr-ctl" data-mode={mode} hidden={!armed} aria-label={`${label} ${labels.of}`} onClick={() => clickRef.current()}>
          <span className="ax-jr-ic" aria-hidden="true" />
          <span>{label}</span>
        </button>
      </div>
      <ol
        ref={listRef}
        className={`ax-jr${armed ? ' is-armed' : ''}${armed && complete ? ' is-complete' : ''}`}
        style={{ '--ax-p': progress } as CSSProperties}
      >
        {steps.map((s, j) => {
          const on = armed && !complete && j === k;
          const done = armed && (complete || j < k);
          return (
            <li
              key={s.t}
              className={['ax-st', j === big ? 'ax-st-big' : '', done ? 'is-done' : '', on ? 'is-on' : ''].filter(Boolean).join(' ')}
              aria-current={on ? 'step' : undefined}
            >
              <span className="ax-st-n" aria-hidden="true">
                {j + 1}
              </span>
              <p className="ax-st-w">{s.w}</p>
              <h3 className="ax-st-t">{s.t}</h3>
              <p className="ax-st-d">{s.d}</p>
            </li>
          );
        })}
      </ol>
    </>
  );
}
