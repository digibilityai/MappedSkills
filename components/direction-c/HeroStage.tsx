'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

/**
 * UI REVAMP GATE 2 — DIRECTION C — the homepage stage (L4 signature, T1).
 *
 * The same demand shown twice: as anonymous traffic on a dark stage, then
 * resolved — the stage inverts to paper and three marks become tangerine as
 * their sources arrive. The Traffic/Enquiries control replays it on demand.
 *
 * COMPLETE AT REST. The server renders the resolved composition (no
 * `data-state`; the toggle's pre-hydration state is described at the render). That is the whole figure with no JavaScript, after a failed
 * hydration, and under `prefers-reduced-motion: reduce`. The dark first paint
 * exists only when motion is allowed, via the pre-paint attribute written by
 * `HomeHero` (`html[data-dc-hero="traffic"]`), so there is never a
 * light → dark → light flash; that attribute removes itself after 4s if this
 * component never runs.
 *
 * WHEN IT RESOLVES. At ≥900px the stage is in the first screen and resolves
 * 900ms after load (the prototype's timing). Below 900px it sits after the
 * CTAs, so it waits until it is on screen, as the production stage did —
 * resolving out of sight would spend the page's one T1 on nobody.
 *
 * QUANTITY SAFETY: the field is illustrative — "kinds, not counts". JavaScript
 * never adds, removes or counts a mark; it only switches one attribute.
 */

type StageState = 'traffic' | 'enquiries';

/* 112 marks (16 × 7); below 600px the stylesheet shows the first 60 (12 × 5).
   `--o` is a per-mark stagger in ms — order only, never a quantity. The three
   named marks are illustrative positions, not counts. */
const FIELD = 112;
const NAMED = new Set([19, 58, 101]);
const MARKS = Array.from({ length: FIELD }, (_, i) => ({
  n: NAMED.has(i),
  o: ((i * 37) % 23) * 24,
}));

const ROWS: { label: string; open: boolean }[] = [
  { label: 'organic search', open: false },
  { label: 'paid search', open: false },
  { label: 'a page that answered the visit', open: false },
  { label: 'arrived with no usable trail — unattributed', open: true },
];

const RESOLVE_AFTER_MS = 900;
const TIMED_MIN_WIDTH = 900;

export function HeroStage() {
  const [state, setState] = useState<StageState | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    const armed = html.getAttribute('data-dc-hero') === 'traffic';
    const reduced =
      typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!armed || reduced) {
      html.removeAttribute('data-dc-hero');
      /* Hand the resolved state to React, so the toggle becomes live and
         carries aria-pressed (see "BEFORE HYDRATION" below). */
      const t = setTimeout(() => setState('enquiries'), 0);
      return () => clearTimeout(t);
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    let io: IntersectionObserver | null = null;
    const resolve = () => setState('enquiries');

    try {
      /* The dark stage is already painted by the pre-paint attribute; React
         takes it over on the next frame (the label then reads as traffic). */
      timers.push(setTimeout(() => setState((s) => s ?? 'traffic'), 0));
      const el = ref.current;
      const inView = (() => {
        if (!el) return true;
        const r = el.getBoundingClientRect();
        return r.top < window.innerHeight * 0.8 && r.bottom > 0;
      })();
      if (window.innerWidth >= TIMED_MIN_WIDTH || inView || typeof IntersectionObserver !== 'function' || !el) {
        timers.push(setTimeout(resolve, RESOLVE_AFTER_MS));
      } else {
        io = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) {
              io?.disconnect();
              timers.push(setTimeout(resolve, RESOLVE_AFTER_MS / 2));
            }
          },
          { threshold: 0.35 }
        );
        io.observe(el);
      }
    } catch {
      resolve();
    }

    /* A backgrounded tab must not come back to an unresolved stage. */
    const onVisibility = () => {
      if (!document.hidden) return;
      timers.forEach(clearTimeout);
      io?.disconnect();
      resolve();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      timers.forEach(clearTimeout);
      io?.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  /* Once React owns the state, the pre-paint attribute is inert; remove it so a
     torn-down tree can never fall back onto the dark stage. */
  useEffect(() => {
    if (state) document.documentElement.removeAttribute('data-dc-hero');
  }, [state]);

  const isTraffic = state === 'traffic';
  /* BEFORE HYDRATION (Gate 3 R7). The server cannot know which state the
     first paint shows: the pre-paint attribute may paint the dark traffic
     stage, or (no JavaScript, reduced motion, or after its 4s timeout) the
     resolved one. So until React owns the state, nothing in the markup
     asserts one: the label spans carry no aria-hidden and the stylesheet
     shows the one that matches the painted stage (visibility: hidden also
     removes the other from the accessibility tree); the buttons carry no
     aria-pressed, are disabled (they cannot act yet, and cannot at all
     without JavaScript), and the stylesheet marks the one that matches.
     Visual, control and accessible state therefore agree at every moment. */
  const live = state !== null;

  return (
    <div className="dc-stage" data-state={state ?? undefined} ref={ref}>
      <div className="dc-top">
        {/* Both labels share one grid cell, so the box is always sized to the
            longer one and switching state never reflows the stage (measured:
            the swap shifted the field at 390, CLS +0.10). Only the current
            label is visible and announced. */}
        <p className="dc-label dc-stage-label" aria-live="polite">
          <span data-v="enquiries" aria-hidden={live ? isTraffic : undefined}>
            what we report
          </span>
          <span data-v="traffic" aria-hidden={live ? !isTraffic : undefined}>
            what an agency usually shows you
          </span>
        </p>
        <div className="dc-toggle" role="group" aria-label="Show the same demand as traffic or as enquiries">
          <button
            type="button"
            data-v="traffic"
            disabled={!live}
            aria-pressed={live ? isTraffic : undefined}
            onClick={() => setState('traffic')}
          >
            Traffic
          </button>
          <button
            type="button"
            data-v="enquiries"
            disabled={!live}
            aria-pressed={live ? !isTraffic : undefined}
            onClick={() => setState('enquiries')}
          >
            Enquiries
          </button>
        </div>
      </div>
      <div className="dc-field" aria-hidden="true">
        {MARKS.map((m, i) => (
          <i key={i} className={m.n ? 'n' : undefined} style={{ '--o': m.o } as CSSProperties} />
        ))}
      </div>
      <ul className="dc-legend" aria-label="Enquiries, by where they came from">
        {ROWS.map((row) => (
          <li key={row.label} className={row.open ? 'open' : undefined}>
            <span className="dc-mk" aria-hidden="true" />
            <span className="dc-lbar" aria-hidden="true" />
            {row.label}
          </li>
        ))}
      </ul>
      <p className="dc-cap">
        Illustrative. The marks are <b>kinds, not counts</b> — no quantity, proportion or rate is drawn or
        claimed.
      </p>
    </div>
  );
}
