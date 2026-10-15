'use client';

import { useState } from 'react';
import { ABOUT_PLAIN } from './content';

/**
 * C+ About figure, from the approved prototype (proto/direction-c-plus 0a8b611, components/proto-cplus/AccountFigure.tsx),
 * unchanged. "Whose report is the enquiry in?": "Whose report is the enquiry in?". The same route to a sale
 * (Search → Ads → Website → Form → Enquiry → Revenue) shown two ways: split across suppliers (three labelled brackets,
 * each with its own report; the enquiry in nobody's report) and one line to the qualified enquiry (one bracket; revenue
 * marked as the client's).
 *
 * BOTH STATES ARE IN THE DOCUMENT, EACH A REAL STRUCTURE: a heading, a one-sentence summary, an ordered list of the
 * route and a list of who answers for which part ("Web developer — covers Website to Form. Reports: site delivered").
 * Meaning is carried by text and line style (solid / dashed / filled / hatched), never by colour alone.
 *   - With JavaScript: one state is shown; ONE button, whose label always names the OTHER view, switches it; focus
 *     stays on the button; a polite status line reads the new state's heading and summary. No automatic change.
 *   - Without JavaScript (`html.px-js` absent): the button is hidden and both states are shown, one under the other.
 *   - Motion: the newly shown brackets settle in once after a press; nothing on load, nothing looping, none at all
 *     under prefers-reduced-motion.
 * Layout: one grid per state, the route and the brackets on CSS subgrid so a bracket spans exactly the stages it
 * covers — vertical (stacked rows) by default, horizontal when the figure's own width allows at the reader's text size.
 */

const F = ABOUT_PLAIN.fig;
type Bracket = { from: number; to: number; kind: string; who: string; rep: string };

function State({ id, title, sum, stages, brackets, off, entering }: {
  id: 'a' | 'b';
  title: string;
  sum: string;
  stages: string[];
  brackets: Bracket[];
  off: boolean;
  entering: boolean;
}) {
  const span = (b: Bracket) => (b.from === b.to ? stages[b.from] : `${stages[b.from]} to ${stages[b.to]}`);
  return (
    <section className={'ab-state ab-state-' + id + (off ? ' is-off' : '') + (entering ? ' is-entering' : '')} aria-labelledby={`ab-st-${id}`}>
      <h3 id={`ab-st-${id}`} className="ab-state-h">
        <span className="ab-state-n">{F.stateOf(id === 'a' ? 1 : 2)}</span>
        {title}
      </h3>
      <p className="ab-state-sum">{sum}</p>
      <div className="ab-grid">
        <ol className="ab-route" aria-label={F.routeLabel}>
          {stages.map((s, i) => (
            <li key={s} className={'ab-stage' + (i === 4 ? ' is-enq' : '') + (i === 5 ? ' is-rev' : '')}>
              <span className="ab-stage-n" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="ab-stage-t">{s}</span>
            </li>
          ))}
        </ol>
        <ul className="ab-who" aria-label={F.whoLabel}>
          {brackets.map((b) => (
            <li
              key={b.who + b.from}
              className={'ab-br ab-br-' + b.kind}
              style={{ ['--a' as string]: b.from + 1, ['--b' as string]: b.to + 2 }}
            >
              <span className="ab-br-who">{b.who}</span>
              <span className="px-sr">
                {' '}
                — {F.covers} {span(b)}.{' '}
              </span>
              <span className="ab-br-rep">{b.rep}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AccountFigure() {
  const [view, setView] = useState<'a' | 'b'>('a');
  const [touched, setTouched] = useState(false);
  const cur = view === 'a' ? F.a : F.b;

  return (
    <div className="ab-fig" data-view={view}>
      <div className="ab-ctl">
        <button
          type="button"
          className="ab-btn"
          aria-controls="ab-st-panel"
          onClick={() => {
            setTouched(true);
            setView((v) => (v === 'a' ? 'b' : 'a'));
          }}
        >
          <span className="ab-btn-ic" aria-hidden="true">
            ⇄
          </span>
          {view === 'a' ? F.toB : F.toA}
        </button>
        <p className="px-sr" role="status" aria-live="polite">
          {touched ? `Now showing: ${cur.t}. ${cur.sum}` : ''}
        </p>
      </div>
      <div id="ab-st-panel" className="ab-states">
        <State id="a" title={F.a.t} sum={F.a.sum} stages={F.stages} brackets={F.a.brackets} off={view !== 'a'} entering={touched && view === 'a'} />
        <State id="b" title={F.b.t} sum={F.b.sum} stages={F.stagesB} brackets={F.b.brackets} off={view !== 'b'} entering={touched && view === 'b'} />
      </div>
    </div>
  );
}
