import Link from 'next/link';
import { ActionLink } from '../../paid-advertising/ActionLink';
import { BOOKING_HREF, CONTACT_HREF } from '@/components/direction-c/primitives';
import { AI_PLAIN as S } from './content';
import { IndustryExamples } from './IndustryExamples';
import { Journey } from './Journey';
import { ReportingSteps } from './ReportingSteps';
import { Scenario } from './Scenario';
import '../../paid-advertising/paid-advertising.css';
import '../../b2/b2.css';
import './ai-seo.css';

/**
 * /ai-seo as a THE RESOLVE page (Stage 4 Batch 2B). The owner-approved R3 content, section order, evidence record and
 * four animated stories (DEC-054) are unchanged: nine sections, in the approved order, with the same copy, ids and
 * interactions. Only the visual system changed. The story is the change in how buyers find a business: the hero is the
 * pain (an answer that does not name you), the shift is the moment of understanding, the record is the honest limit, and
 * the close is one decision. Nothing here states a result, a score or a guarantee; every picture is labelled as an
 * illustration. Metadata, canonical, breadcrumb and structured data are set in `app/(pages)/ai-seo/page.tsx`.
 */

function Actions() {
  return (
    <div className="pa-actions">
      <ActionLink href={CONTACT_HREF}>{S.primary}</ActionLink>
      <ActionLink href={BOOKING_HREF} variant="text">
        {S.secondary}
      </ActionLink>
    </div>
  );
}

/** Two-colour heading: `a` in the plain colour, `b` emphasised. */
function Hx({ h }: { h: { a: string; b: string } }) {
  return (
    <>
      {h.a} <span className="b2-em">{h.b}</span>
    </>
  );
}

/**
 * Narrow screens only (hidden from 768px up): the fold of a long story. One list of the stations in order, so the whole
 * journey reads in one glance; the full interactive story follows directly below it. Decorative (`aria-hidden`): the
 * words are the ones the story below already uses, and the story below is the accessible version.
 */
function Fold({ items, href, cue, tone }: { items: { k?: string; t: string }[]; href: string; cue: string; tone: 'light' | 'dark' }) {
  return (
    <>
      <ol className={`ai-strip ai-strip-${tone}`} aria-hidden="true">
        {items.map((it, i) => (
          <li key={it.t} className={i === items.length - 1 ? 'is-end' : undefined}>
            <i>{i + 1}</i>
            <span>
              {it.k && <em>{it.k}</em>}
              {it.t}
            </span>
          </li>
        ))}
      </ol>
      <a className="ai-cont" href={href}>
        {cue} <span aria-hidden="true">{'\u2193'}</span>
      </a>
    </>
  );
}

export function AiSeoBody() {
  return (
    <div className="pa b2 ai">
      {/* 1, Ink Deep, high: the question every owner recognises, and one AI answer that does not name them */}
      <section className="ai-hero ai-dark" aria-labelledby="as-h1">
        <div className="pa-wrap ai-hero-g">
          <div className="ai-hero-tx">
            <nav aria-label="Breadcrumb" className="ai-crumb">
              <ol>
                <li>
                  <Link href="/">Home</Link>{' '}
                </li>
                <li>
                  <span aria-hidden="true">/</span> What we do{' '}
                </li>
                <li>
                  <span aria-hidden="true">/</span> <span aria-current="page">{S.crumb}</span>
                </li>
              </ol>
            </nav>
            <p className="pa-eyebrow">{S.kicker}</p>
            <h1 id="as-h1">
              <Hx h={S.h1} />
            </h1>
            <p className="b2-lede">{S.lede}</p>
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

      {/* 2, ground, high: the moment of understanding. Links became a shortlist. */}
      <section className="ai-act ai-ground ai-shift" aria-labelledby="as-h-shift">
        <div className="pa-wrap">
          <p className="pa-eyebrow ai-k">{S.shift.kicker}</p>
          <h2 id="as-h-shift" className="b2-h2">
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

      {/* 3, paper, calm: industry examples, illustrative questions only, no statistics */}
      <section className="ai-act ai-paper ai-ind" aria-labelledby="as-h-ind">
        <div className="pa-wrap">
          <p className="pa-eyebrow ai-k">{S.industry.kicker}</p>
          <h2 id="as-h-ind" className="b2-h2">
            <Hx h={S.industry.h} />
          </h2>
          <IndustryExamples />
        </div>
      </section>

      {/* 4, ground, medium: one illustrative question, two fictional businesses, then the visitor's own */}
      <section className="ai-act ai-ground ai-scn" aria-labelledby="as-h-scn">
        <div className="pa-wrap">
          <div className="ai-scene">
            <p className="pa-eyebrow ai-k">{S.scenario.kicker}</p>
            <h2 id="as-h-scn" className="b2-h2">
              <Hx h={S.scenario.h} />
            </h2>
            <Fold items={S.scenario.steps.map((st) => ({ t: st.w }))} href="#ai-scn-full" cue="Read the full story" tone="light" />
          </div>
          <div id="ai-scn-full" className="ai-full">
            <Scenario />
          </div>
        </div>
      </section>

      {/* 5, Ink Deep, medium: five steps, auto-advance every 1.5 s, plays once; the numbers are buttons */}
      <section className="ai-act ai-dark ai-jr-sec" aria-labelledby="as-h-jr">
        <div className="pa-wrap">
          <div className="ai-scene">
            <div className="ax-jr-head">
              <p className="pa-eyebrow ai-k">{S.journey.kicker}</p>
              <h2 id="as-h-jr" className="b2-h2">
                <Hx h={S.journey.h} />
              </h2>
            </div>
            <Fold items={S.journey.steps.map((st) => ({ t: st.t }))} href="#ai-jr-full" cue="What each step involves" tone="dark" />
          </div>
          <div id="ai-jr-full" className="ai-full">
            <Journey steps={S.journey.steps} />
          </div>
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

      {/* 6, paper, low: clear reporting, Ask, Compare, Track */}
      <section className="ai-act ai-paper ax-rp-sec" aria-labelledby="as-h-rp">
        <div className="pa-wrap">
          <div className="ai-scene">
            <p className="pa-eyebrow ai-k">{S.rep.kicker}</p>
            <h2 id="as-h-rp" className="b2-h2">
              <Hx h={S.rep.h} />
            </h2>
            <Fold items={S.rep.steps.map((st) => ({ k: st.w, t: st.t }))} href="#ai-rp-full" cue="How each step is reported" tone="light" />
          </div>
          <div id="ai-rp-full" className="ai-full">
            <ReportingSteps />
          </div>
          <p className="ax-rp-note">{S.rep.note}</p>
          <p className="px-cap">{S.rep.cap}</p>
        </div>
      </section>

      {/* 7, Ink Deep, high: the honest limit. The complete dated self-test, unchanged in substance, in a native disclosure
           that is closed on load (DEC-015, owner-approved relocation; see DEC-054). Measured zero and not-tested stay distinct. */}
      <section className="ai-act ai-dark ai-evi ax-evi" aria-labelledby="as-h-evi">
        <div className="pa-wrap ai-evi-g">
          <p className="pa-eyebrow ai-k">{S.record.kicker}</p>
          <h2 id="as-h-evi" className="b2-h2 ax-evi-h">
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

      {/* 8, ground, low: native disclosures, closed on load. No FAQPage structured data on this route. */}
      <section className="ai-act ai-ground as-q" aria-labelledby="as-h-qs">
        <div className="pa-wrap as-q-g">
          <div>
            <p className="pa-eyebrow ai-k">{S.qKicker}</p>
            <h2 id="as-h-qs" className="b2-h2">
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
              {S.across.a} <Link href={S.across.href}>{S.across.link}</Link> · <Link href={S.across.href2}>{S.across.link2}</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Close: one decision, the two existing destinations, full-bleed burnt with white text like the other approved pages */}
      <section className="b2-band ai-band" aria-labelledby="as-h-close">
        <div className="pa-wrap">
          <h2 id="as-h-close">{S.close.h}</h2>
          <p>{S.close.body}</p>
          <div className="pa-actions">
            <ActionLink href={CONTACT_HREF} variant="dark">
              {S.primary}
            </ActionLink>
            <ActionLink href={BOOKING_HREF} variant="text">
              {S.secondary}
            </ActionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
