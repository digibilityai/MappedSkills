import { ActionPair, InlineLink } from '@/components/direction-c/primitives';
import { Breadcrumb } from '../Breadcrumb';
import { HOW } from './content';
import { Glyph } from './icons';
import { ActionBoard, HeroPath, ReportTrack, StartStages } from './Journeys';
import { PrioritySort } from './PrioritySort';
import './how-it-works.css';

/**
 * C+ How It Works (/how-it-works): the owner-approved G1 R2 design (DEC-058; docs/how-it-works-redesign/g1/mockup/), as a
 * server component. Seven sections: hero, getting started, finding priorities, doing the work, keeping you informed (with
 * the limits band), questions, close. Only the four step sequences (./Journeys) and the priority sort are client
 * components. The close uses the shared close's classes and ActionPair (as /lead-generation does), so ../Close is unchanged.
 */
export function MethodBody() {
  const s = HOW.sort;
  const w = HOW.work;
  const inf = HOW.info;
  const g = inf.gaps;
  return (
    <>
      {/* 1: hero (ground) */}
      <section className="b-hero hx-hero" aria-labelledby="hw-h1">
        <div className="px-wrap b-hero-g hx-hero-g">
          <div className="hx-hero-tx">
            <Breadcrumb current={HOW.crumb} />
            <p className="b-kicker">{HOW.kicker}</p>
            <h1 id="hw-h1" className="b-h1">
              {HOW.h1.a} <span className="b-named">{HOW.h1.b}</span>
            </h1>
            <p className="b-lede">{HOW.lede}</p>
            <ActionPair primaryLabel={HOW.primary} />
          </div>
          <HeroPath />
        </div>
      </section>

      {/* 2: getting started (ink): three stages beside the working sheet */}
      <section className="b-sec b-ink hx-start" aria-labelledby="hw-h-start">
        <div className="px-wrap">
          <p className="b-kicker">{HOW.start.kicker}</p>
          <h2 id="hw-h-start" className="b-h2">
            {HOW.start.h.a} <span className="b-named">{HOW.start.h.b}</span>
          </h2>
          <p className="b-lede b-lede-ink hx-start-l">{HOW.start.lede}</p>
          <StartStages />
        </div>
      </section>

      {/* 3: finding priorities (ground): the priority sort */}
      <section className="b-sec hx-sort" aria-labelledby="hw-h-sort">
        <div className="px-wrap">
          <div className="hx-sort-head">
            <div>
              <p className="b-kicker">{s.kicker}</p>
              <h2 id="hw-h-sort" className="b-h2">
                {s.h.a} <span className="b-named">{s.h.b}</span>
              </h2>
            </div>
            <p className="b-lede hx-sort-l">{s.lede}</p>
          </div>
          <PrioritySort lanes={s.lanes} items={s.items} button={s.button} pileLabel={s.pileLabel} statusSorted={s.statusSorted} statusPile={s.statusPile} />
          <p className="px-cap hx-ps-cap">{s.cap}</p>
          <p className="hx-honest">
            <span className="hx-honest-ic" aria-hidden="true">
              <Glyph name="chat" />
            </span>
            {s.honest}
          </p>
        </div>
      </section>

      {/* 4: doing the work (ink): what we need from you, and the approved-actions board */}
      <section className="b-sec b-ink hx-work" aria-labelledby="hw-h-work">
        <div className="px-wrap hx-work-g">
          <div className="hx-work-tx">
            <p className="b-kicker">{w.kicker}</p>
            <h2 id="hw-h-work" className="b-h2">
              {w.h.a} <span className="b-named">{w.h.b}</span>
            </h2>
            <p className="b-lede b-lede-ink hx-work-l">{w.lede}</p>
            <h3 className="hx-need-h">{w.needH}</h3>
            <ul className="hx-need">
              {w.need.map((n) => (
                <li key={n.t}>
                  <span className="hx-need-ic" aria-hidden="true">
                    <Glyph name={n.icon} />
                  </span>
                  <p>
                    <b>{n.t}</b>
                    <span>{n.d}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <ActionBoard />
        </div>
      </section>

      {/* 5: keeping you informed (paper): one report, HW-D01, then the limits band (ink) */}
      <section className="b-sec b-paper hx-info" aria-labelledby="hw-h-info">
        <div className="px-wrap">
          <p className="b-kicker">{inf.kicker}</p>
          <h2 id="hw-h-info" className="b-h2">
            {inf.h.a} <span className="b-named">{inf.h.b}</span>
          </h2>
          <p className="b-lede hx-info-l">{inf.lede}</p>
          <div className="hx-info-g">
            <ReportTrack />
            <div className="hx-month">
              <p className="hx-month-k">{inf.month.k}</p>
              <p className="hx-month-t">{inf.month.t}</p>
              <p className="hx-month-n">{inf.month.note}</p>
            </div>
          </div>
        </div>

        {/* Kept visible: /conversion-optimization, /google-ads, /about and /faq link here promising these limits. */}
        <div className="b-ink hx-gaps">
          <div className="px-wrap">
            <div className="hx-gaps-head">
              <h3 id="hw-h-gaps" className="hx-gaps-h">
                {g.h}
              </h3>
              <p className="hx-gaps-l">{g.lead}</p>
            </div>
            <ul className="hx-gaps-list" aria-labelledby="hw-h-gaps">
              {g.items.map((it) => (
                <li key={it.t}>
                  <span className="hx-gap-ic" aria-hidden="true">
                    <Glyph name={it.icon} />
                  </span>
                  <p>
                    <b>{it.t}</b>
                    <span>{it.d}</span>
                  </p>
                </li>
              ))}
            </ul>
            <p className="hx-gaps-line">
              {g.line.a} <span>{g.line.b}</span>
            </p>
          </div>
        </div>
      </section>

      {/* 6: questions (ground): native details, closed on load */}
      <section className="b-sec hx-q" aria-labelledby="hw-h-qs">
        <div className="px-wrap hx-q-g">
          <div>
            <p className="b-kicker">{HOW.questions.kicker}</p>
            <h2 id="hw-h-qs" className="b-h2">
              {HOW.questions.h}
            </h2>
          </div>
          <div>
            <ul className="fq-list">
              {HOW.questions.items.map((qa) => (
                <li key={qa.q}>
                  <details className="fq-d">
                    <summary>
                      <span className="fq-q">{qa.q}</span>
                      <span className="fq-pm" aria-hidden="true" />
                    </summary>
                    <div className="fq-a">
                      <p>{qa.a}</p>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
            <p className="hx-related">
              {HOW.questions.related.a}{' '}
              {HOW.questions.related.links.map((l, i) => (
                <span key={l.href}>
                  {i ? ' · ' : ''}
                  <InlineLink href={l.href}>{l.label}</InlineLink>
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* 7: close (tangerine): the shared close's classes and the two CTAs */}
      <section className="b-close hx-close" aria-labelledby="b-close-h">
        <div className="px-wrap">
          <div className="b-close-in">
            <div>
              <h2 id="b-close-h" className="b-h2">
                {HOW.close.h.a} <span className="hx-close-2">{HOW.close.h.b}</span>
              </h2>
              <p className="b-lede">{HOW.close.body}</p>
            </div>
            <ActionPair primaryLabel={HOW.primary} />
          </div>
        </div>
      </section>
    </>
  );
}
