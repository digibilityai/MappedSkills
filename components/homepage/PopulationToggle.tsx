'use client';

import { useState } from 'react';

/**
 * The hero's population figure and its one signature interaction, translated
 * statically. The reader can put the report an agency usually shows them
 * (an undifferentiated field of anonymous traffic marks) next to the one
 * MappedSkills reports (a few distinct, named objects).
 *
 * Deliberately NOT an animation: the toggle swaps which composed state is
 * shown with no transition, so nothing here depends on motion. "Enquiries"
 * is the default and is exactly what a no-JS or pre-hydration reader sees,
 * per the static-first requirement — this component renders that same
 * default state on the server before hydration.
 *
 * This is the ONLY client component this session introduces. It is a
 * narrowly bounded leaf: no other part of the homepage needs interactivity.
 *
 * SESSION 25B: the stage head is restored to the approved order — a 2px rule,
 * then the state label and the control on ONE baseline-aligned row, then the
 * population — and the small graphical marks keep the accessible deep-tangerine ramp
 * (`--resolve-accent-deep`, 3.97:1) rather than `--resolve-accent` (2.81:1 on
 * ivory), a recorded production difference from the prototype.
 */
export function PopulationToggle() {
  const [state, setState] = useState<'traffic' | 'enquiries'>('enquiries');
  const isTraffic = state === 'traffic';

  return (
    <div className="border-t-2 pt-4" style={{ borderColor: 'var(--resolve-line)' }}>
      <div className="mb-[18px] flex flex-wrap items-baseline justify-between gap-x-[22px] gap-y-3">
        <p className="text-[.82rem] font-semibold uppercase leading-[1.4] tracking-[0.16em] text-resolve-dim" aria-live="polite">
          {isTraffic ? 'what an agency usually shows you' : 'what we report'}
        </p>

        <div
          role="group"
          aria-label="Show the same demand as traffic or as enquiries"
          className="inline-flex gap-[3px] rounded-full border-2 border-current p-[3px]"
        >
          <button
            type="button"
            aria-pressed={isTraffic}
            onClick={() => setState('traffic')}
            className="min-h-[42px] rounded-full px-[17px] text-sm font-semibold"
            style={isTraffic ? { background: 'var(--resolve-accent-deep)', color: '#FFFFFF' } : undefined}
          >
            Traffic
          </button>
          <button
            type="button"
            aria-pressed={!isTraffic}
            onClick={() => setState('enquiries')}
            className="min-h-[42px] rounded-full px-[17px] text-sm font-semibold"
            style={!isTraffic ? { background: 'var(--resolve-accent-deep)', color: '#FFFFFF' } : undefined}
          >
            Enquiries
          </button>
        </div>
      </div>

      {isTraffic ? (
        <div
          aria-hidden="true"
          className="grid grid-cols-[repeat(16,1fr)] content-between gap-[5px] max-[761px]:h-auto max-[761px]:gap-[7px] min-[761px]:h-[clamp(224px,25vw,306px)]"
        >
          {Array.from({ length: 96 }).map((_, i) => (
            <span key={i} className="h-[9px] w-full" style={{ background: 'var(--resolve-dim)', opacity: 0.55 }} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-between gap-4 max-[761px]:h-auto min-[761px]:h-[clamp(224px,25vw,306px)]">
          {ROWS.map((row) => (
            <div key={row.label} className="flex items-center gap-3.5">
              <span
                aria-hidden="true"
                className="h-[15px] w-[15px] flex-none"
                style={
                  row.open
                    ? { background: 'transparent', border: '2px dashed var(--resolve-gap)' }
                    : { background: 'var(--resolve-accent-deep)' }
                }
              />
              <span
                aria-hidden="true"
                className="h-[11px] w-[26%] flex-none rounded-sm"
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
              <span className="text-[.88rem] font-semibold leading-[1.25] text-resolve-dim">{row.label}</span>
            </div>
          ))}
        </div>
      )}

      <p className="mt-4 max-w-none text-[.82rem] font-medium leading-[1.5] text-resolve-dim">
        Illustrative. The marks are <b className="font-bold text-resolve-ink">kinds, not counts</b> — no
        quantity, proportion or rate is drawn or claimed.
      </p>
    </div>
  );
}

const ROWS = [
  { label: 'organic search', open: false },
  { label: 'paid search', open: false },
  { label: 'a page that answered the visit', open: false },
  { label: 'arrived with no usable trail — unattributed', open: true },
];
