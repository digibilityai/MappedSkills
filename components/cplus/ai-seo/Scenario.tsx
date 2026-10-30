'use client';

import Link from 'next/link';
import { CONTACT_HREF } from '@/components/direction-c/primitives';
import { AI_PLAIN } from './content';
import { SCENARIO_STEP_MS, StepNumber, useSequence } from './Sequence';

const [ASK, LOOK, TWO, YOU] = AI_PLAIN.scenario.steps as [
  { w: string; label: string; q: string },
  { w: string; label: string; t: string; where: string[]; whereLabel: string },
  { w: string; label: string; a: Biz; b: Biz; cap: string },
  { w: string; label: string; t: string; p: string; cta: string },
];
type Biz = { n: string; s: string; items: string[] };

function Biz({ biz, ink }: { biz: Biz; ink?: boolean }) {
  return (
    <div className={`ax-tile ${ink ? 'ax-tile-ink' : 'ax-tile-cream ax-biz-gap'} ax-biz`}>
      <p className="ax-biz-n">{biz.n}</p>
      <p className="ax-biz-s">{biz.s}</p>
      <ul className="ax-biz-l">
        {biz.items.map((t) => (
          <li key={t}>
            <i aria-hidden="true" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * "The question is already being asked" (R3): one illustrative question, two fictional businesses, then the visitor's
 * own. Four steps revealed one after another (SCENARIO_STEP_MS apart), once; step 1 is on screen from the start, so the section is never blank; each number is a button. Complete without
 * JavaScript. Nothing here says Business A will appear or Business B will be left out.
 */
export function Scenario() {
  const [ref, q] = useSequence<HTMLOListElement>(4, { stepMs: SCENARIO_STEP_MS, first: 0, dwellMs: 0 });
  const li = (j: number, extra = '') => ({ className: `ax-sc-i ${extra} ${q.state(j)}`.replace(/\s+/g, ' ').trim(), 'data-i': '', 'aria-current': q.on(j) ? ('step' as const) : undefined });
  const num = (j: number, label: string) => <StepNumber armed={q.armed} n={j + 1} label={label} onSelect={() => q.select(j)} />;
  return (
    <ol ref={ref} className={`ax-sc ${q.cls}`} data-reveal="cum" style={q.style}>
      <li {...li(0)}>
        {num(0, ASK.label)}
        <div className="ax-sc-b">
          <p className="ax-st-w">{ASK.w}</p>
          <p className="ax-q ax-q-l">{ASK.q}</p>
        </div>
      </li>
      <li {...li(1)}>
        {num(1, LOOK.label)}
        <div className="ax-sc-b">
          <p className="ax-st-w">{LOOK.w}</p>
          <h3 className="ax-sc-t">{LOOK.t}</h3>
          <ul className="ax-where" aria-label={LOOK.whereLabel}>
            {LOOK.where.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      </li>
      <li {...li(2)}>
        {num(2, TWO.label)}
        <div className="ax-sc-b">
          <p className="ax-st-w">{TWO.w}</p>
          <div className="ax-ab">
            <Biz biz={TWO.a} ink />
            <Biz biz={TWO.b} />
          </div>
          <p className="px-cap ax-sc-cap">{TWO.cap}</p>
        </div>
      </li>
      <li {...li(3, 'ax-sc-you')}>
        {num(3, YOU.label)}
        <div className="ax-sc-b">
          <p className="ax-st-w">{YOU.w}</p>
          <h3 className="ax-sc-t ax-sc-big">{YOU.t}</h3>
          <p className="ax-sc-p">{YOU.p}</p>
          <p className="ax-sc-act">
            <Link href={CONTACT_HREF} className="pa-action pa-action--primary">
              {YOU.cta}
              <span aria-hidden="true">{'\u2197'}</span>
            </Link>
          </p>
        </div>
      </li>
    </ol>
  );
}
