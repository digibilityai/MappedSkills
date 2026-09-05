'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createResolveViewRegistry, useResolveMotion } from '@/hooks/use-resolve-motion';
import { useHeroSurface } from '@/components/homepage/HeroSurface';

/**
 * The hero's population figure, its one signature interaction, and the page's
 * ONE T1.
 *
 * THE ARGUMENT. The reader can put the report an agency usually shows them —
 * an undifferentiated field of anonymous traffic marks — beside the one
 * MappedSkills reports: a few distinct, NAMED objects. With motion, the page
 * makes that argument itself, once: it opens on the dark traffic stage and the
 * SAME population resolves into the named objects. Then the surface is still.
 *
 * SESSION 26 — PHASE D. Phase C shipped this as a static two-state swap. This
 * session adds the approved resolve, the surface inversion and the marks'
 * travel. Everything Phase C guaranteed still holds:
 *
 *   - the server renders the RESOLVED state, so no-JS, a failed hydration and
 *     the pre-hydration paint are all the approved static composition;
 *   - the control still works with motion off — the states simply swap;
 *   - the marks are KINDS, NOT COUNTS. See the quantity-safety note below.
 *
 * QUANTITY SAFETY. Nothing here may be read as a measurement:
 *   - the number of marks never changes, in either direction;
 *   - no mark is removed, consumed, or filtered out;
 *   - every mark travels into one of the four named rows, distributed evenly
 *     (`i % targets.length`), so no row accumulates "more" than another;
 *   - the four row bars are ONE EQUAL LENGTH (Session 19A), carrying STATE
 *     only — solid = a named, attributed object; dashed = arrived with no
 *     usable trail;
 *   - nothing counts up, nothing counts down, and no percentage, rate,
 *     proportion or conversion is drawn at any point in the sequence.
 */

/* The lattice is server-rendered so the dark first paint is never an empty
   box. 440 is the cap the approved prototype computes for itself at MEDIUM and
   WIDE (30 columns); below 761px the stylesheet shows the first 189 (21
   columns), which is the geometry it computes at NARROW. JavaScript never
   builds, adds or removes a mark — it only measures where each one should
   travel to. */
const FIELD_MARKS = 440;
const FIELD_HTML = '<i></i>'.repeat(FIELD_MARKS);

/* The approved sequence. WIDE (>=900) plays on a timer because the stage is on
   the first screen; NARROW plays on view, because there the stage sits below
   the fold and must not perform to an empty screen. */
const PULSE_AT_MS = 420;
const RESOLVE_AT_MS = 1450;
const RESOLVE_AFTER_PULSE_MS = 900;
const TIMED_SEQUENCE_MIN_WIDTH = 900;

const ROWS = [
  { label: 'organic search', open: false },
  { label: 'paid search', open: false },
  { label: 'a page that answered the visit', open: false },
  { label: 'arrived with no usable trail — unattributed', open: true },
];

export function PopulationToggle() {
  const { state, setState } = useHeroSurface();
  const { mounted, reduced, enabled } = useResolveMotion();
  const [pulsing, setPulsing] = useState(false);

  const fieldRef = useRef<HTMLDivElement | null>(null);
  const aimedRef = useRef(false);
  const rowsRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  // `null` renders as the resolved state — the server, no-JS and pre-hydration
  // composition, and the Phase C baseline.
  const isTraffic = state === 'traffic';

  /**
   * Tell each mark which resolved object it travels toward, measured from the
   * REAL geometry of the rendered rows, so the gesture is correct at any width
   * and after any resize. Layout offsets are used for the marks (`offsetLeft`
   * is transform-independent) and rects for the targets.
   */
  const aim = useCallback(() => {
    const field = fieldRef.current;
    const rows = rowsRef.current;
    if (!field || !rows) return;

    const fieldRect = field.getBoundingClientRect();
    const targets = Array.from(rows.querySelectorAll<HTMLElement>('[data-rsv-row-mark]')).map((m) => {
      const r = m.getBoundingClientRect();
      return {
        x: r.left - fieldRect.left + r.width / 2,
        y: r.top - fieldRect.top + r.height / 2,
      };
    });
    if (!targets.length) return;

    const marks = Array.from(field.children) as HTMLElement[];
    let visible = 0;
    for (const mark of marks) {
      if (mark.offsetWidth === 0 && mark.offsetHeight === 0) continue; // hidden at NARROW
      const target = targets[visible % targets.length];
      const cx = mark.offsetLeft + mark.offsetWidth / 2;
      const cy = mark.offsetTop + mark.offsetHeight / 2;
      mark.style.setProperty('--rsv-tx', `${Math.round(target.x - cx)}px`);
      mark.style.setProperty('--rsv-ty', `${Math.round(target.y - cy)}px`);
      mark.style.transitionDelay = `${(visible % 17) * 11}ms`;
      visible += 1;
    }
    aimedRef.current = visible > 0;
  }, []);

  /* ------------------------------------------------------------------ T1 -- */
  useEffect(() => {
    if (!mounted) return;

    // REDUCED MOTION RESOLVES, IT DOES NOT FREEZE. The lattice is never shown,
    // the travel never happens, and the page simply opens resolved — with the
    // signature control still fully operable.
    if (reduced || !enabled) {
      setState('enquiries');
      return;
    }

    // The T1 fires ONCE PER PAGE LOAD (anti-tic rule M5). The pre-paint script
    // in HomepageHero is what puts the reader on the dark stage before the
    // first paint; if its attribute is not there — a client-side navigation
    // back to `/`, a blocked inline script, reduced motion — then starting the
    // sequence now would mean inverting a surface the reader is already
    // reading. In that case the page simply stays resolved.
    if (document.documentElement.getAttribute('data-rsv-hero') !== 'traffic') {
      setState('enquiries');
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const registry = createResolveViewRegistry();

    const resolve = () => setState('enquiries');

    /* PHASE E — THE LAST RESORT. The hero is the one behaviour with a
       PRE-PAINT start state, so it is the one place where a failure would be
       seen rather than merely missed: an uncaught error here would tear down
       the React root, `data-state` would disappear, and the pre-paint dark
       stage would re-apply — with the named rows hidden — until its own ~4s
       failsafe. Resolving immediately is always safe. */
    try {

    // Measured BEFORE the surface inverts, while the rows are composed.
    aim();
    setState('traffic');

    if (window.innerWidth >= TIMED_SEQUENCE_MIN_WIDTH) {
      timers.push(setTimeout(() => setPulsing(true), PULSE_AT_MS));
      timers.push(setTimeout(resolve, RESOLVE_AT_MS));
    } else {
      registry.onView(
        boxRef.current,
        () => {
          if (document.hidden) {
            resolve();
            return;
          }
          setPulsing(true);
          timers.push(setTimeout(resolve, RESOLVE_AFTER_PULSE_MS));
        },
        0.45
      );
    }

    // A tab hidden mid-sequence resumes RESOLVED, never half-travelled. We
    // never replay: the event happened, and the reader gets its result.
    const onVisibility = () => {
      if (!document.hidden) return;
      timers.forEach(clearTimeout);
      registry.forceAll();
      resolve();
    };
    document.addEventListener('visibilitychange', onVisibility);

    // Re-aim on resize, debounced, passive. This does not rebuild anything and
    // does not animate: it only corrects where the marks would travel to.
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(aim, 180);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(resizeTimer);
      registry.destroy();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
    };

    } catch {
      timers.forEach(clearTimeout);
      registry.destroy();
      resolve();
      return;
    }
    // `setState` and `aim` are stable; the sequence must run once per motion mode.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, reduced, enabled]);

  /* PHASE E — RELEASE THE PRE-PAINT ATTRIBUTE AS SOON AS REACT OWNS THE STATE.
     `html[data-rsv-hero="traffic"]` only styles `.rsv-sw:not([data-state])`, so
     while this component is alive the attribute is already inert. Removing it
     in a *later* effect — after the render that applied `data-state` has been
     committed, so there is no frame where neither rule applies — closes the
     window in which a torn-down React tree would drop back onto the dark stage
     and wait out the script's own 4s failsafe with the named rows hidden. */
  useEffect(() => {
    if (state) document.documentElement.removeAttribute('data-rsv-hero');
  }, [state]);

  /* -------------------------------------------------------- the signature -- */
  const select = (next: 'traffic' | 'enquiries') => {
    if (next === (state ?? 'enquiries')) return;
    // PHASE E: the T1 aims the marks on its way past. It does not run on a
    // client-side navigation back to `/`, so a reader who drives the control
    // first would otherwise send the marks nowhere — they would collapse on
    // their own centres instead of travelling into the named rows. Measure once,
    // on the reader's own action, while the rows are still composed.
    if (!aimedRef.current && next === 'traffic') aim();
    setState(next);
    if (next !== 'traffic' || !enabled) {
      setPulsing(false);
      return;
    }
    setPulsing(false);
    requestAnimationFrame(() => setPulsing(true));
  };

  return (
    <div className="rsv-stage rsv-rule-t border-t-2 pt-4" data-rsv-stage="">
      <div className="mb-[18px] flex flex-wrap items-baseline justify-between gap-x-[22px] gap-y-3">
        <p
          className="rsv-muted text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.16em]"
          aria-live="polite"
        >
          {isTraffic ? 'what an agency usually shows you' : 'what we report'}
        </p>

        <div
          role="group"
          aria-label="Show the same demand as traffic or as enquiries"
          className="rsv-control inline-flex gap-[3px] rounded-full border-2 border-current p-[3px]"
        >
          <button
            type="button"
            aria-pressed={isTraffic}
            onClick={() => select('traffic')}
            className="min-h-[42px] rounded-full px-[17px] text-sm font-semibold"
          >
            Traffic
          </button>
          <button
            type="button"
            aria-pressed={!isTraffic}
            onClick={() => select('enquiries')}
            className="min-h-[42px] rounded-full px-[17px] text-sm font-semibold"
          >
            Enquiries
          </button>
        </div>
      </div>

      <div className="rsv-fieldbox" ref={boxRef}>
        {/* THE SAME POPULATION, anonymous. Written once and never reconciled
            again: the html string is constant, so React leaves this subtree
            alone and the per-mark travel variables written below are safe. */}
        <div
          ref={fieldRef}
          className={`rsv-field${pulsing ? ' rsv-pulse' : ''}`}
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: FIELD_HTML }}
        />

        <div className="rsv-rows flex flex-col justify-between gap-4" ref={rowsRef}>
          {ROWS.map((row) => (
            <div key={row.label} className="rsv-row flex items-center gap-3.5">
              <span
                aria-hidden="true"
                data-rsv-row-mark=""
                className="h-[15px] w-[15px] flex-none"
                style={
                  row.open
                    ? { background: 'transparent', border: '2px dashed var(--resolve-gap)' }
                    : { background: 'var(--resolve-accent-deep)' }
                }
              />
              <span
                aria-hidden="true"
                className="rsv-row-b h-[11px] w-[26%] flex-none rounded-sm"
                style={
                  row.open
                    ? {
                        height: '6px',
                        background:
                          'repeating-linear-gradient(90deg, var(--resolve-gap) 0 5px, transparent 5px 10px)',
                      }
                    : { background: 'var(--resolve-accent-deep)' }
                }
              />
              <span className="rsv-muted text-[.88rem] font-semibold leading-[1.25]">{row.label}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="rsv-muted mt-4 max-w-none text-[.82rem] font-medium leading-[1.5]">
        Illustrative. The marks are <b className="rsv-strong font-bold">kinds, not counts</b> — no
        quantity, proportion or rate is drawn or claimed.
      </p>
    </div>
  );
}
