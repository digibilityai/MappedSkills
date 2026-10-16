import Link from 'next/link';
import { BOOKING_HREF, CONTACT_HREF, InlineLink, Mark } from '@/components/direction-c/primitives';
import { AI_PLAIN as S } from './content';
import { IndustryExamples } from './IndustryExamples';
import { Journey } from './Journey';
import { ReportingSteps } from './ReportingSteps';
import { Scenario } from './Scenario';
import './ai-seo.css';
import { Breadcrumb } from '../Breadcrumb';

/**
 * C+ AI search (/ai-seo): the owner-approved R3 design (docs/ai-search-redesign/r3; mockup/src/parts), nine sections in
 * the approved order: hero, shortlist, industry examples, scenario, five steps, reporting, the record, questions, close.
 * Markup and classes follow the mockup; copy lives in ./content. The four animated stories (industry, scenario, five
 * steps, reporting) are client components built on ./Sequence; every section is complete without JavaScript.
 */

function Actions() {
  return (
    <div className="dc-actions">
      <Link href={CONTACT_HREF} className="dc-btn dc-btn-primary">
        <Mark />
        {S.primary}
      </Link>
      <Link href={BOOKING_HREF} className="dc-btn dc-btn-secondary">
        <Mark />
        {S.secondary}
      </Link>
    </div>
  );
}

/** Two-colour heading: `a` plain, `b` orange. */
function Hx({ h }: { h: { a: string; b: string } }) {
  return (
    <>
      {h.a} <span className="b-named">{h.b}</span>
    </>
  );
}

export function AiSeoBody() {
  return (
    <>
      {/* 1 — hero (ivory): the question every owner recognises, and one AI answer taken apart */}
      <section className="b-hero ax-hero" aria-labelledby="as-h1">
        <div className="px-wrap b-hero-g h-hero-g ax-hero-g">
          <div className="ax-hero-tx">
            <Breadcrumb trail={['What we do']} current={S.crumb} />
            <p className="b-kicker">{S.kicker}</p>
            <h1 id="as-h1" className="b-h1">
              <Hx h={S.h1} />
            </h1>
            <p className="b-lede">{S.lede}</p>
            <Actions />
          </div>

          <figure className="ax-chat">
            <div className="ax-chat-win">
              <p className="ax-q">
                <span className="ax-q-k">{S.chat.askK}</span>
                {S.chat.ask}
              </p>
              <div className="ax-a">
                <p className="ax-a-k">{S.chat.ansK}</p>
                <ol className="ax-a-l">
                  {S.chat.names.map((src, i) => (
                    <li key={src}>
                      <span className={['ax-nm', 'ax-nm ax-nm-m', 'ax-nm ax-nm-s'][i]} aria-hidden="true" />
                      <span className="px-sr">{S.chat.name}</span>
                      <span className="ax-src">{src}</span>
                    </li>
                  ))}
                </ol>
                <p className="ax-you">
                  <span className="ax-you-b" aria-hidden="true" />
                  <span>
                    <b>{S.chat.you.b}</b> {S.chat.you.t}
                  </span>
                </p>
              </div>
            </div>
            <figcaption className="px-cap">{S.chat.cap}</figcaption>
          </figure>
        </div>
      </section>

      {/* 2 — what is changing (ink): links became a shortlist */}
      <section className="b-sec b-ink ax-shift" aria-labelledby="as-h-shift">
        <div className="px-wrap">
          <p className="b-kicker">{S.shift.kicker}</p>
          <h2 id="as-h-shift" className="b-h2">
            <Hx h={S.shift.h} />
          </h2>
          <div className="ax-shift-g">
            <figure className="ax-tile ax-tile-cream ax-then">
              <p className="ax-tl">{S.shift.then.l}</p>
              <ul className="ax-serp" aria-hidden="true">
                {Array.from({ length: 6 }, (_, i) => (
                  <li key={i} />
                ))}
              </ul>
              <figcaption className="ax-tt">{S.shift.then.t}</figcaption>
            </figure>
            <span className="ax-arrow" aria-hidden="true" />
            <figure className="ax-tile ax-tile-ink ax-now">
              <p className="ax-tl">{S.shift.now.l}</p>
              <ul className="ax-short" aria-hidden="true">
                {S.shift.now.names.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
                <li className="ax-short-you">{S.shift.now.you}</li>
              </ul>
              <figcaption className="ax-tt">
                {S.shift.now.t} <b>{S.shift.now.tb}</b>
              </figcaption>
            </figure>
          </div>
          <p className="ax-size">
            <b>{S.shift.size.b}</b> {S.shift.size.t}
          </p>
        </div>
      </section>

      {/* 3 — industry examples (paper): illustrative questions, no statistics. Replaces the self-test as the evidence story. */}
      <section className="b-sec b-paper ax-ind" aria-labelledby="as-h-ind">
        <div className="px-wrap">
          <p className="b-kicker">{S.industry.kicker}</p>
          <h2 id="as-h-ind" className="b-h2">
            <Hx h={S.industry.h} />
          </h2>
          <IndustryExamples />
        </div>
      </section>

      {/* 4 — scenario (ivory): one illustrative question, two fictional businesses, then the visitor's own */}
      <section className="b-sec ax-scn" aria-labelledby="as-h-scn">
        <div className="px-wrap">
          <p className="b-kicker">{S.scenario.kicker}</p>
          <h2 id="as-h-scn" className="b-h2">
            <Hx h={S.scenario.h} />
          </h2>
          <Scenario />
        </div>
      </section>

      {/* 5 — how the work moves (ink): five steps, auto-advance every 1.5 s, plays once; the numbers are buttons */}
      <section className="b-sec b-ink ax-jr-sec" aria-labelledby="as-h-jr">
        <div className="px-wrap">
          <div className="ax-jr-head">
            <div>
              <p className="b-kicker">{S.journey.kicker}</p>
              <h2 id="as-h-jr" className="b-h2">
                <Hx h={S.journey.h} />
              </h2>
            </div>
          </div>
          <Journey steps={S.journey.steps} />
          <details className="fq-d ax-crawl">
            <summary>
              <span className="fq-q">{S.crawl.summary}</span>
              <span className="fq-pm" aria-hidden="true" />
            </summary>
            <div className="ax-crawl-in">
              <p>
                <b>{S.crawl.retrieval.b}</b> {S.crawl.retrieval.t}
              </p>
              <p>
                <b>{S.crawl.training.b}</b> {S.crawl.training.t}
              </p>
              <p>{S.crawl.note}</p>
            </div>
          </details>
        </div>
      </section>

      {/* 6 — clear reporting (paper): Ask, Compare, Track */}
      <section className="b-sec b-paper ax-rp-sec" aria-labelledby="as-h-rp">
        <div className="px-wrap">
          <p className="b-kicker">{S.rep.kicker}</p>
          <h2 id="as-h-rp" className="b-h2">
            <Hx h={S.rep.h} />
          </h2>
          <ReportingSteps />
          <p className="ax-rp-note">{S.rep.note}</p>
          <p className="px-cap">{S.rep.cap}</p>
        </div>
      </section>

      {/* 7 — the record (ivory): the complete dated self-test, unchanged in substance, in a native disclosure that is
           closed on load (DEC-015, owner-approved relocation; see DEC-054). Measured zero and not-tested stay distinct. */}
      <section className="b-sec ax-evi" aria-labelledby="as-h-evi">
        <div className="px-wrap">
          <p className="b-kicker">{S.record.kicker}</p>
          <h2 id="as-h-evi" className="b-h2 ax-evi-h">
            {S.record.h}
          </h2>
          <details className="fq-d ax-rec">
            <summary>
              <span className="fq-q">{S.record.summary}</span>
              <span className="fq-pm" aria-hidden="true" />
            </summary>
            <div className="ax-rec-in">
              <table className="ax-rec-tb">
                <caption>{S.record.tableCap}</caption>
                <thead>
                  <tr>
                    {S.record.cols.map((c) => (
                      <th key={c} scope="col">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {S.record.rows.map((r) => (
                    <tr key={r.s}>
                      <th scope="row">
                        {r.s}
                        {r.note && <span>{r.note}</span>}
                      </th>
                      <td>{r.n}</td>
                      <td>0</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row">{S.record.total}</th>
                    <td>{S.record.rows.reduce((a, r) => a + r.n, 0)}</td>
                    <td>0</td>
                  </tr>
                </tfoot>
              </table>
              <p className="ax-rec-un">
                <b>{S.record.untested.b}</b> {S.record.untested.t}
              </p>
              {S.record.notes.map((n) => (
                <p key={n.b} className="ax-rec-l">
                  <b>{n.b}</b> {n.t}
                </p>
              ))}
            </div>
          </details>
        </div>
      </section>

      {/* 8 — questions (paper): native disclosures, closed on load. No FAQPage structured data on this route. */}
      <section className="b-sec b-paper as-q" aria-labelledby="as-h-qs">
        <div className="px-wrap as-q-g">
          <div>
            <p className="b-kicker">{S.qKicker}</p>
            <h2 id="as-h-qs" className="b-h2">
              {S.qH}
            </h2>
          </div>
          <div>
            <ul className="fq-list">
              {S.questions.map((qa) => (
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
            <p className="as-across">
              {S.across.a} <InlineLink href={S.across.href}>{S.across.link}</InlineLink> ·{' '}
              <InlineLink href={S.across.href2}>{S.across.link2}</InlineLink>
            </p>
          </div>
        </div>
      </section>

      {/* close (tangerine): one decision, the two existing destinations */}
      <section className="b-close" aria-labelledby="as-h-close">
        <div className="px-wrap b-close-in">
          <div>
            <h2 id="as-h-close" className="b-h2">
              {S.close.h}
            </h2>
            <p className="b-lede">{S.close.body}</p>
          </div>
          <Actions />
        </div>
      </section>
    </>
  );
}
