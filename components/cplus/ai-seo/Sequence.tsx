'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type MouseEventHandler, type RefObject } from 'react';

/** Owner rule (R3 approval, 2026-10-16): 1.5 seconds between steps in every animated sequence on this page. */
export const STEP_MS = 1500;
/** The scenario story is quicker: 1 second between steps, and its first step is on screen from the start. */
export const SCENARIO_STEP_MS = 1000;
/** The block must stay in view this long before it starts (the same dwell as the Google Ads demonstrations). */
export const DWELL_MS = 400;
/** Share of the block that counts as "in view"; for very tall blocks (phones) 45% of the window is enough. */
const ENTER_RATIO = 0.4;
const ENTER_WINDOW = 0.45;

/**
 * One sequencer for the four animated stories on /ai-seo (industry examples, scenario, five steps, reporting).
 *   - Server render, no JavaScript, or reduced motion: every step is shown complete. Nothing moves.
 *   - Otherwise it starts once the block has been in view for DWELL_MS, highlights one step at a time, advances every
 *     STEP_MS, plays ONCE and stops on the last step, which stays highlighted. It never loops.
 *   - There is no pause, play or replay control. A visitor who selects a step takes over: the sequence stops at once and
 *     shows that choice. Leaving the screen or hiding the tab pauses it; it resumes on return unless a step was selected.
 *   - No live region and no focus movement. The active step carries aria-current="step" and nothing else changes for
 *     assistive technology.
 * `cum` stories reveal their steps one after another (hidden until reached); the others keep every step visible and dim
 * the ones not yet reached.
 */
export type Sequence = {
  armed: boolean;
  select: (j: number) => void;
  cls: string;
  style: CSSProperties;
  state: (j: number) => string;
  on: (j: number) => boolean;
};

const REDUCE = '(prefers-reduced-motion: reduce)';
const noop = () => () => {};
const subscribeMotion = (cb: () => void) => {
  const mql = typeof window.matchMedia === 'function' ? window.matchMedia(REDUCE) : null;
  mql?.addEventListener?.('change', cb);
  return () => mql?.removeEventListener?.('change', cb);
};
/** No animation: reduced motion asked for, or the browser cannot tell us when the block is on screen. */
const getStill = () => typeof IntersectionObserver !== 'function' || (typeof window.matchMedia === 'function' && window.matchMedia(REDUCE).matches);

export type SequenceOptions = {
  /** Milliseconds between steps (default STEP_MS). */
  stepMs?: number;
  /** Step shown from the start, so the block is never blank while it waits (default: none, -1). */
  first?: number;
  /** Milliseconds the block must be in view before the next step is scheduled (default DWELL_MS). */
  dwellMs?: number;
};

export function useSequence<T extends HTMLElement>(n: number, opts: SequenceOptions = {}): [RefObject<T | null>, Sequence] {
  const { stepMs = STEP_MS, first = -1, dwellMs = DWELL_MS } = opts;
  const ref = useRef<T>(null);
  const stopRef = useRef<() => void>(() => {});
  /** False on the server and during hydration (everything shown complete); true once the page is interactive. */
  const armed = useSyncExternalStore(noop, () => true, () => false);
  /** True when nothing should move: every step is shown, still, and the numbers remain selectable. */
  const still = useSyncExternalStore(subscribeMotion, getStill, () => false);
  /** Active step index; -1 before the first step. */
  const [k, setK] = useState(first);
  /** True once a visitor has chosen: every step is shown. */
  const [chosen, setChosen] = useState(false);
  const all = chosen || still;

  useEffect(() => {
    const root = ref.current;
    if (!root || still) return;

    let i = first;
    let state: 'idle' | 'running' | 'paused' | 'manual' | 'done' = 'idle';
    let inView = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let dwell: ReturnType<typeof setTimeout> | null = null;
    const clear = (t: ReturnType<typeof setTimeout> | null) => t !== null && clearTimeout(t);

    const tick = () => {
      if (i < n - 1) {
        i += 1;
        setK(i);
        timer = setTimeout(tick, stepMs);
      } else {
        state = 'done';
        timer = null;
      }
    };
    const run = () => {
      state = 'running';
      clear(timer);
      if (i < 0) tick();
      else timer = setTimeout(tick, stepMs);
    };
    const pause = () => {
      clear(timer);
      timer = null;
      if (state === 'running') state = 'paused';
    };
    stopRef.current = () => {
      clear(timer);
      clear(dwell);
      timer = dwell = null;
      state = 'manual';
    };

    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          inView = e.intersectionRect.height >= Math.min(e.boundingClientRect.height * ENTER_RATIO, window.innerHeight * ENTER_WINDOW);
          clear(dwell);
          if (inView) {
            dwell = setTimeout(() => {
              if (state === 'idle' || state === 'paused') run();
            }, dwellMs);
          } else if (state === 'running') pause();
        });
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    );
    io.observe(root);

    const onVis = () => {
      if (document.hidden && state === 'running') pause();
      else if (!document.hidden && inView && state === 'paused') run();
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      clear(timer);
      clear(dwell);
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [n, still, stepMs, first, dwellMs]);

  /** A visitor's choice: stop the sequence and show step `j`. */
  const select = useCallback((j: number) => {
    stopRef.current();
    setChosen(true);
    setK(j);
  }, []);

  /* Static (server render, no JavaScript, reduced motion before a choice): no step is highlighted. */
  const kk = !armed || (still && !chosen) ? -1 : k;
  const p = !armed || (still && kk < 0) ? 100 : (Math.max(0, kk) / Math.max(n - 1, 1)) * 100;
  return [
    ref,
    {
      armed,
      select,
      /** Classes for the sequence root. */
      cls: `ax-seq${armed ? ' is-armed' : ''}${still ? ' is-static' : ''}${all ? ' is-all' : ''}`,
      style: { '--ax-p': p } as CSSProperties,
      /** State classes for step `j`. */
      state: (j: number) => [j <= kk ? 'is-seen' : '', j < kk ? 'is-done' : '', j === kk ? 'is-on' : ''].filter(Boolean).join(' '),
      on: (j: number) => j === kk,
    },
  ];
}

/** The numbered marker of a step: a real button once the page is interactive (keyboard, touch, visible focus), a plain
 *  marker before that and without JavaScript. */
export function StepNumber({ armed, n, label, onSelect }: { armed: boolean; n: number; label: string; onSelect: MouseEventHandler<HTMLButtonElement> }) {
  return armed ? (
    <button type="button" className="ax-st-n" aria-label={label} onClick={onSelect}>
      {n}
    </button>
  ) : (
    <span className="ax-st-n" aria-hidden="true">
      {n}
    </span>
  );
}
