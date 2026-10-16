import Link from 'next/link';
import { BOOKING_HREF, CONTACT_HREF, InlineLink, Mark } from '@/components/direction-c/primitives';
import { AI_PLAIN as S, MEASURED_ON, RUNS } from './content';
import { Journey } from './Journey';
import './ai-seo.css';
import { Breadcrumb } from '../Breadcrumb';

/**
 * C+ AI search (/ai-seo): the owner-approved G1 R2 design (docs/ai-search-redesign; mockup/src/body.html), eight
 * sections in the approved order. Markup and classes follow the mockup; copy lives in ./content. Only the journey is a
 * client component; every other section is static and complete without JavaScript.
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

/** Marks for one result row: open squares, one per question (none filled), or two filled marks for the two crawlers
 *  that could read the site. Decorative; the result is stated in text beside it. */
function Squares({ kind }: { kind: 'access' | 'runs' }) {
  const count = kind === 'runs' ? RUNS : 2;
  return (
    <span className={kind === 'runs' ? 'ax-sq' : 'ax-sq ax-sq-ok'} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <i key={i} />
      ))}
    </span>
  );
}

export function AiSeoBody() {
  const T = S.test;
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

      {/* 3 — where answers come from (paper): the mechanism, then our own dated test as a visible three-step sequence.
           The material result (0 of 28) and the four separate results are visible; the disclosure holds method and the
           full record. Untested systems are never shown as zero (DEC-015). */}
      <section className="b-sec b-paper ax-src-sec" aria-labelledby="as-h-src">
        <div className="px-wrap">
          <div className="ax-src-top">
            <div>
              <p className="b-kicker">{S.src.kicker}</p>
              <h2 id="as-h-src" className="b-h2">
                <Hx h={S.src.h} />
              </h2>
            </div>
            <figure className="ax-hub">
              <ul className="ax-feeds">
                {S.src.feeds.map((f) => (
                  <li key={f} className="ax-feed">
                    <span className="ax-feed-n">{f}</span>
                  </li>
                ))}
                <li className="ax-feed ax-feed-own">
                  <span className="ax-feed-n">{S.src.own.t}</span>
                  <span className="ax-feed-d">{S.src.own.d}</span>
                </li>
              </ul>
              <p className="ax-hub-ans" aria-hidden="true">
                <span>{S.src.hub}</span>
              </p>
              <figcaption className="px-cap">{S.src.cap}</figcaption>
            </figure>
          </div>

          <div className="ax-test">
            <div className="ax-test-head">
              <h3 className="ax-test-h">{T.h}</h3>
              <p className="ax-test-m">
                <time dateTime="2026-08-31">{MEASURED_ON}</time>
                {T.meta.map((m) => ` · ${m}`).join('')}
              </p>
            </div>
            <ol className="ax-tr">
              <li className="ax-tile ax-tile-cream ax-tr-s">
                <p className="ax-tl">{T.checked.l}</p>
                <p className="ax-tr-big">{T.checked.big}</p>
                <p>{T.checked.t}</p>
                <ul className="ax-tools">
                  {T.checked.tools.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <p className="ax-tr-sub ax-push">
                  <span className="ax-dash" aria-hidden="true" />
                  {T.checked.untested}
                </p>
              </li>
              <li className="ax-tile ax-tile-ink ax-tr-s ax-tr-found">
                <p className="ax-tl">{T.found.l}</p>
                <p className="ax-tr-zero">
                  <span className="ax-fig">
                    {T.found.fig} <small>{T.found.of}</small>
                  </span>
                  <span>{T.found.t}</span>
                </p>
                <ul className="ax-ly" aria-label={T.found.layersLabel}>
                  {T.found.layers.map((l) => (
                    <li key={l.q}>
                      <span className="ax-ly-q">{l.q}</span>
                      <Squares kind={l.kind} />
                      <span className="ax-ly-r">{l.r}</span>
                    </li>
                  ))}
                </ul>
                <p className="ax-tr-sub">{T.found.key}</p>
                <p className="ax-tr-sub">{T.found.branded}</p>
              </li>
              <li className="ax-tile ax-tile-cream ax-tr-s">
                <p className="ax-tl">{T.taught.l}</p>
                <p className="ax-tr-lead">{T.taught.lead}</p>
                <p>{T.taught.t}</p>
                <p className="ax-tr-so">{T.taught.so}</p>
              </li>
            </ol>
            <p className="ax-tr-lim">
              <b>{T.lim.b}</b> {T.lim.t}
            </p>
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
        </div>
      </section>

      {/* 4 — how the work moves (ink): five-step journey, auto-advances every 2 s, plays once */}
      <section className="b-sec b-ink ax-jr-sec" aria-labelledby="as-h-jr">
        <div className="px-wrap">
          <Journey
            heading={
              <>
                <p className="b-kicker">{S.journey.kicker}</p>
                <h2 id="as-h-jr" className="b-h2">
                  <Hx h={S.journey.h} />
                </h2>
              </>
            }
            steps={S.journey.steps}
            big={S.journey.big}
            labels={S.journey.ctl}
          />
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

      {/* 5 — clear reporting (paper): one picture, two sides of a line */}
      <section className="b-sec b-paper ax-rep-sec" aria-labelledby="as-h-rep">
        <div className="px-wrap">
          <p className="b-kicker">{S.rep.kicker}</p>
          <h2 id="as-h-rep" className="b-h2">
            <Hx h={S.rep.h} />
          </h2>
          <figure className="ax-bd">
            <div className="ax-tile ax-tile-cream ax-bd-can">
              <p className="ax-tl">{S.rep.can.l}</p>
              <ol className="ax-bd-l">
                {S.rep.can.items.map((it) => (
                  <li key={it.b}>
                    <b>{it.b}</b>
                    <span>{it.t}</span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="ax-bd-line">
              <span>{S.rep.line}</span>
            </p>
            <div className="ax-tile ax-tile-ink ax-bd-not">
              <p className="ax-tl">{S.rep.not.l}</p>
              <ul className="ax-bd-l">
                {S.rep.not.items.map((it) => (
                  <li key={it.b}>
                    <b>{it.b}</b>
                    <span>{it.t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </figure>
          <p className="ax-rep-note">
            {S.rep.note} <b>{S.rep.why.b}</b> {S.rep.why.t}
          </p>
        </div>
      </section>

      {/* 6 — is it right for you (ivory): a quick decision; the situations are our usual judgement, not rules */}
      <section className="b-sec ax-fit-sec" aria-labelledby="as-h-fit">
        <div className="px-wrap">
          <p className="b-kicker">{S.fit.kicker}</p>
          <h2 id="as-h-fit" className="b-h2">
            <Hx h={S.fit.h} />
          </h2>
          <p className="ax-fit-lede">{S.fit.lede}</p>
          <figure className="ax-dec">
            <p className="ax-dec-start" aria-hidden="true">
              <span>{S.fit.start}</span>
            </p>
            <div className="ax-dec-g">
              <div className="ax-tile ax-tile-cream ax-dec-c ax-dec-yes">
                <h3 className="ax-dec-h">{S.fit.yes.h}</h3>
                <ul className="ax-dec-l">
                  {S.fit.yes.items.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <p className="ax-dec-next">{S.fit.yes.next}</p>
              </div>
              <div className="ax-tile ax-tile-ink ax-dec-c ax-dec-other">
                <h3 className="ax-dec-h">{S.fit.other.h}</h3>
                <ul className="ax-dec-l">
                  {S.fit.other.items.map((it) => (
                    <li key={it.b}>
                      <b>{it.b}</b>{' '}
                      <span>
                        {it.link && (
                          <>
                            <InlineLink href={it.link.href}>{it.link.t}</InlineLink>{' '}
                          </>
                        )}
                        {it.t}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </figure>
          <p className="ax-fit-close">{S.fit.close}</p>
        </div>
      </section>

      {/* 7 — questions (paper): native disclosures, closed on load. No FAQPage structured data on this route. */}
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
