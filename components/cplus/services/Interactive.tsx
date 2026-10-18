'use client';

import Link from 'next/link';
import { useState, useSyncExternalStore, type CSSProperties } from 'react';
import { CONTACT_HREF } from '@/components/direction-c/primitives';
import { useSequence, type Sequence } from '../ai-seo/Sequence';
import { SV, type StageKey } from './content';
import { Glyph } from './icons';

/**
 * The two interactive parts of /services (owner-approved G1 design, DEC-059). Everything is server-rendered; JavaScript
 * only adds behaviour. No analytics events, dataLayer pushes or data-* tracking hooks.
 *   - ProblemPicker: three aria-pressed buttons (single choice; pressing the chosen one again clears it). The chosen
 *     group is marked "Start here" and a status line links to it. Nothing is hidden or dimmed: all six service links
 *     stay visible and work without JavaScript. Without JavaScript the buttons are not rendered and each group shows
 *     its problem line instead.
 *   - EnquiryJourney: three stages on the shared /ai-seo sequencer (../ai-seo/Sequence, unchanged): step 1 on screen
 *     from the start, then one stage every 1.5 s, played once, no pause or replay; the numbers become buttons. Reduced
 *     motion and no JavaScript show it complete.
 */

const noop = () => () => {};
const useArmed = () => useSyncExternalStore(noop, () => true, () => false);

/* ------------------------------------------------------------------ 2. where to start */
export function ProblemPicker() {
  const armed = useArmed();
  const [pick, setPick] = useState<StageKey | null>(null);
  const p = SV.pick;
  const chosen = p.options.find((o) => o.key === pick);
  const chosenGroup = p.groups.find((g) => g.key === pick);

  return (
    <>
      <div className="sx-sel" hidden={!armed}>
        <p className="sx-sel-k" id="sx-sel-k">
          {p.prompt}
        </p>
        <div className="sx-sel-route" role="group" aria-labelledby="sx-sel-k">
          {p.options.map((o) => (
            <button key={o.key} type="button" className="sx-opt" aria-pressed={pick === o.key} onClick={() => setPick(pick === o.key ? null : o.key)}>
              <span className="sx-opt-n" aria-hidden="true">
                <Glyph name={o.icon} />
              </span>
              <span className="sx-opt-t">{o.t}</span>
            </button>
          ))}
        </div>
        <p className="sx-sel-out">
          <span role="status">
            {chosen && chosenGroup ? (
              <>
                {p.startWith}
                <a href={`#sx-g-${chosen.key}`}>{chosenGroup.t}</a>
                {chosen.out}
              </>
            ) : null}
          </span>{' '}
          <Link href={CONTACT_HREF} className="sx-sel-unsure">
            {p.other} <Glyph name="arrow" />
          </Link>
        </p>
      </div>

      <div className="sx-groups">
        {p.groups.map((g) => (
          <div key={g.key} className={`sx-g${g.key === 'ms' ? ' sx-g-ms' : ''}${pick === g.key ? ' is-pick' : ''}`} id={`sx-g-${g.key}`}>
            <div className="sx-g-h">
              <p className="sx-g-k">
                <span className="sx-g-i" aria-hidden="true">
                  <Glyph name={g.icon} />
                </span>
                {g.k}
              </p>
              <h3 className="sx-g-t">{g.t}</h3>
              <p className="sx-g-p">{g.p}</p>
              {pick === g.key ? (
                <span className="sx-here" aria-hidden="true">
                  {p.here}
                </span>
              ) : null}
            </div>
            {g.cards.length > 0 ? (
              <ul className={`sx-cards sx-cards-${g.cards.length}`}>
                {g.cards.map((c) => (
                  <li key={c.href}>
                    <Link className="sx-card" href={c.href}>
                      <span className="sx-card-n">{c.name}</span>
                      <span className="sx-card-d">{c.d}</span>
                      <Glyph name="arrow" className="sx-gl sx-card-a" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="sx-incl">
                <p className="sx-incl-t">
                  <span className="sx-incl-mk" aria-hidden="true">
                    <Glyph name="check" />
                  </span>
                  {p.included.t}
                </p>
                <p className="sx-incl-d">{p.included.d}</p>
                <p className="b-tlink sx-incl-l">
                  <Link href={p.included.link.href}>
                    {p.included.link.label} <span aria-hidden="true">→</span>
                  </Link>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ 3. one enquiry, start to finish */
const OPTS = { stepMs: 1500, first: 0, dwellMs: 300 };

const at = (q: Sequence, n: number) => {
  for (let j = 0; j < n; j++) if (q.on(j)) return j;
  return -1;
};

export function EnquiryJourney() {
  const j = SV.journey;
  const n = j.steps.length;
  const [ref, q] = useSequence<HTMLDivElement>(n, OPTS);
  const a = at(q, n);
  const style = { ...(q.style as CSSProperties), '--sx-p': a < 0 ? 1 : a / Math.max(n - 1, 1) } as CSSProperties;

  const scenes = [
    <div key="s" className="sx-scene sx-sc-search" aria-hidden="true">
      <p className="sx-sc-q">
        <Glyph name="search" />
        {j.search.q}
      </p>
      <span className="sx-sc-bar" />
      <p className="sx-sc-hit">
        <b>{j.search.name}</b>
        <span>{j.search.meta}</span>
      </p>
      <span className="sx-sc-bar sx-sc-bar-s" />
    </div>,
    <div key="m" className="sx-scene sx-sc-msg" aria-hidden="true">
      <p className="sx-sc-bub">{j.message.text}</p>
      <p className="sx-sc-to">
        <Glyph name="mail" />
        {j.message.to}
      </p>
    </div>,
    <div key="r" className="sx-scene sx-sc-rep" aria-hidden="true">
      <p className="sx-sc-rh">{j.report.h}</p>
      <p className="sx-sc-row">
        <span>{j.report.row[0]}</span>
        <b>{j.report.row[1]}</b>
      </p>
      <p className="sx-sc-row sx-sc-hatch">
        <span>{j.report.unknown[0]}</span>
        <b>{j.report.unknown[1]}</b>
      </p>
    </div>,
  ];

  return (
    <div ref={ref} className={`sx-seq sx-jr-seq ${q.cls}`} data-at={a} data-done={a === n - 1 ? '' : undefined} style={style}>
      <ol className="sx-jr-st">
        {j.steps.map((s, i) => (
          <li key={s.k} className={q.state(i)} data-i="" aria-current={q.on(i) ? 'step' : undefined}>
            <div className="sx-jr-top">
              {q.armed ? (
                <button type="button" className="sx-n" aria-label={`Show step ${i + 1}: ${s.label}`} aria-current={q.on(i) ? 'step' : undefined} onClick={() => q.select(i)}>
                  {i + 1}
                </button>
              ) : (
                <span className="sx-n" aria-hidden="true">
                  {i + 1}
                </span>
              )}
              <p className="sx-jr-k">{s.k}</p>
            </div>
            <p className="sx-jr-t">{s.t}</p>
            {scenes[i]}
          </li>
        ))}
      </ol>
      <p className="sx-jr-cap">
        <span className="sx-tag sx-tag-ink">{j.tag}</span> {j.note}
      </p>
    </div>
  );
}
