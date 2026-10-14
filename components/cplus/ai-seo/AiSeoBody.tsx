import Link from 'next/link';
import { BOOKING_HREF, CONTACT_HREF, InlineLink, Mark } from '@/components/direction-c/primitives';
import { AI_PLAIN as S } from './content';
import './ai-seo.css';
import { Breadcrumb } from '../Breadcrumb';

/**
 * C+ AI search (/ai-seo): the approved prototype's page body (proto/direction-c-plus 0a8b611, AiSeoH.tsx), unchanged in markup and
 * copy. Production changes only: the breadcrumb's Home link and the CTAs point at the live routes (`/`, CONTACT_HREF
 * and BOOKING_HREF) instead of prototype paths.
 */
const RUNS = 28;

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

/* 28 squares, none filled: one per question. Decorative; the count is stated in text beside it. */
function Strip() {
  return (
    <span className="as-strip" aria-hidden="true">
      {Array.from({ length: RUNS }, (_, i) => (
        <i key={i} />
      ))}
    </span>
  );
}

function Tokens({ list }: { list: string[] }) {
  return (
    <ul className="as-tok">
      {list.map((t) => {
        const on = S.crawl.checked.includes(t);
        return (
          <li key={t} className={on ? 'is-on' : undefined}>
            <span className="as-tok-n">{t}</span>
            <span className="as-tok-tag">{on ? S.crawl.checkedTag : S.crawl.uncheckedTag}</span>
          </li>
        );
      })}
    </ul>
  );
}

function WorkItem({ it, tag }: { it: { lead: string; body: string }; tag?: string }) {
  return (
    <div className="as-it">
      {tag && <p className="as-it-tag">{tag}</p>}
      <h3 className="as-it-t">{it.lead}</h3>
      <p className="as-it-b">{it.body}</p>
    </div>
  );
}

function SourceChips({ className }: { className: string }) {
  return (
    <ol className={className}>
      {S.answer.sources.map((s) => (
        <li key={s.n}>
          <span className="as-src-n" aria-hidden="true">
            {s.n}
          </span>
          <span className="as-src-t">{s.t}</span>
        </li>
      ))}
    </ol>
  );
}

export function AiSeoBody() {
  const W = S.work;
  return (
    <>
      {/* 1 — hero (ivory): the claim + one answer taken apart */}
      <section className="b-hero as-hero" aria-labelledby="as-h1">
        <div className="px-wrap b-hero-g h-hero-g as-hero-g">
          <div>
            <Breadcrumb trail={['What we do']} current={S.crumb} />
            <p className="b-kicker">{S.kicker}</p>
            <h1 id="as-h1" className="b-h1">
              {S.h1.a} <span className="b-named">{S.h1.b}</span> {S.h1.c}
            </h1>
            <p className="b-lede">{S.lede}</p>
            <p className="as-side">{S.side}</p>
            <Actions />
          </div>

          <figure className="as-ans-fig">
            <div className="as-ans">
              <div className="as-card">
                <p className="as-label">{S.answer.label}</p>
                <p className="as-card-ask">{S.answer.ask}</p>
                <div className="as-card-lines" aria-hidden="true">
                  <span className="as-ln" />
                  <span className="as-ln as-ln-s">
                    <sup>1</sup>
                  </span>
                  <span className="as-ln" />
                  <span className="as-ln as-ln-m">
                    <sup>2</sup>
                  </span>
                  <span className="as-ln as-ln-s">
                    <sup>3</sup>
                  </span>
                </div>
              </div>
              <div className="as-src">
                <p className="as-label">{S.answer.builtFrom}</p>
                <SourceChips className="as-src-list" />
                <p className="as-own">
                  <span className="as-src-n as-own-n" aria-hidden="true" />
                  <span className="as-own-tx">
                    <span className="as-src-t">{S.answer.own.t}</span>
                    <span className="as-own-d">{S.answer.own.d}</span>
                  </span>
                </p>
              </div>
            </div>
            <figcaption className="px-cap">{S.answer.cap}</figcaption>
          </figure>
        </div>
      </section>

      {/* 2 — the situation (ink): how people find out, then the size of it */}
      <section className="b-sec b-ink as-sit" aria-labelledby="as-h-sit">
        <div className="px-wrap">
          <p className="b-kicker">{S.sitKicker}</p>
          <h2 id="as-h-sit" className="b-h2">
            {S.sitH}
          </h2>
          <p className="as-label as-ways-k" id="as-ways-k">
            {S.sitWaysLabel}
          </p>
          <ol className="as-ways" aria-labelledby="as-ways-k" data-rv="">
            {S.sitWays.map((w) => (
              <li key={w.ask} className="as-way" data-rv-i="">
                <p className="as-way-q">{w.ask}</p>
                <p className="as-way-a">{w.got}</p>
              </li>
            ))}
          </ol>
          <div className="as-size-g">
            <p className="as-size">{S.sitSize}</p>
            <div className="as-limit">
              <p>
                <b>{S.sitLimit.b}</b> {S.sitLimit.t}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — the work (paper): placed by where it acts; then the two crawler lanes */}
      <section className="b-sec b-paper as-work" aria-labelledby="as-h-work">
        <div className="px-wrap">
          <p className="b-kicker">{S.workKicker}</p>
          <h2 id="as-h-work" className="b-h2">
            {S.workH}
          </h2>
          <div className="as-terr" data-rv="">
            <div className="as-zone as-zone-own" data-rv-i="">
              <p className="as-label">{S.zones.own}</p>
              <WorkItem it={W.access} />
              <WorkItem it={W.citable} />
            </div>
            <div className="as-zone as-zone-off" data-rv-i="">
              <p className="as-label">{S.zones.off}</p>
              <WorkItem it={W.authority} />
              <SourceChips className="as-off-src" />
            </div>
            <div className="as-zone as-zone-both" data-rv-i="">
              <WorkItem it={W.entity} tag={S.zones.both} />
            </div>
            <div className="as-zone as-zone-ans" data-rv-i="">
              <WorkItem it={W.measure} tag={S.zones.answers} />
            </div>
          </div>

          <figure className="as-crawl">
            <figcaption className="as-sub-h">{S.crawl.cap}</figcaption>
            <div className="as-lanes">
              <div className="as-lane">
                <h3 className="as-lane-h">{S.crawl.training.h}</h3>
                <p className="as-lane-t">{S.crawl.training.t}</p>
                <Tokens list={S.crawl.training.tokens} />
                <p className="as-lane-dest">{S.crawl.training.dest}</p>
              </div>
              <div className="as-lane is-ret">
                <h3 className="as-lane-h">{S.crawl.retrieval.h}</h3>
                <p className="as-lane-t">{S.crawl.retrieval.t}</p>
                <Tokens list={S.crawl.retrieval.tokens} />
                <p className="as-lane-dest">{S.crawl.retrieval.dest}</p>
              </div>
            </div>
            <p className="as-note">{S.crawl.note}</p>
          </figure>
        </div>
      </section>

      {/* 4 — evidence (ink), BEFORE the boundary: the dated record, two findings, the four layers kept apart, the limits */}
      <section className="b-sec b-ink as-ev" aria-labelledby="as-h-ev">
        <div className="px-wrap">
          <p className="b-kicker">{S.evKicker}</p>
          <h2 id="as-h-ev" className="b-h2">
            {S.evH.a} <span className="b-named">{S.evH.b}</span>
          </h2>

          <div className="as-ev-g">
            <div className="as-rec">
              <h3 className="as-rec-h">
                <span>{S.record.title}</span> <time dateTime="2026-08-31">{S.record.date}</time>
              </h3>
              <dl className="as-rec-meta">
                {S.record.meta.map((m) => (
                  <div key={m.k}>
                    <dt>{m.k}</dt>
                    <dd>{m.v}</dd>
                  </div>
                ))}
              </dl>
              <table className="as-rec-tb">
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
                        {r.note && <span className="as-rec-note">{r.note}</span>}
                      </th>
                      <td>{r.n}</td>
                      <td>0</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row">{S.record.total}</th>
                    <td>{RUNS}</td>
                    <td>0</td>
                  </tr>
                </tfoot>
              </table>
              <div className="as-rec-un">
                <p className="as-rec-un-k">
                  <Mark state="open" /> {S.record.untestedK}
                </p>
                <ul>
                  {S.record.untested.map((u) => (
                    <li key={u.s}>
                      <b>{u.s}</b> {u.t}
                    </li>
                  ))}
                </ul>
                <p className="as-rec-un-n">{S.record.untestedNote}</p>
              </div>
              <p className="as-rec-br">{S.record.branded}</p>
              <details className="fq-d as-method">
                <summary>
                  <span className="fq-q">{S.method.summary}</span>
                  <span className="fq-pm" aria-hidden="true" />
                </summary>
                <ul className="as-method-l">
                  {S.method.items.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </details>
            </div>

            <div className="as-find">
              <ul className="as-find-l">
                {S.findings.map((f) => (
                  <li key={f.b}>
                    <p className="as-find-b">{f.b}</p>
                    <p className="as-find-t">{f.t}</p>
                  </li>
                ))}
              </ul>
              <p className="as-find-k">{S.findingsBold}</p>
            </div>
          </div>

          <figure className="as-layers">
            <figcaption className="as-sub-h">{S.layersCap}</figcaption>
            <ol className="as-ly-list" data-rv="">
              {S.layers.map((l) => (
                <li key={l.k} className={`as-ly as-ly-${l.kind}`} data-rv-i="">
                  <h3 className="as-ly-k">{l.k}</h3>
                  <p className="as-ly-q">{l.q}</p>
                  {l.kind === 'runs' ? (
                    <Strip />
                  ) : (
                    <span className="as-acc" aria-hidden="true">
                      <i />
                      <i />
                    </span>
                  )}
                  <p className="as-ly-r">{l.r}</p>
                </li>
              ))}
            </ol>
            <div className="as-ly-un">
              <p className="as-ly-un-k">
                <Mark state="open" /> {S.layersUntested.k}
              </p>
              <p>{S.layersUntested.t}</p>
            </div>
            <p className="as-note as-note-ink">{S.layersKey}</p>
          </figure>

          <div className="as-lim">
            <h3 className="as-label">{S.limitsK}</h3>
            <ul>
              {S.limits.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5 — the boundary (paper), after the evidence: the score this page will not give, and what is not promised */}
      <section className="b-sec b-paper as-bd" aria-labelledby="as-h-bd">
        <div className="px-wrap">
          <p className="b-kicker">{S.bdKicker}</p>
          <div className="as-bd-g">
            <div>
              <h2 id="as-h-bd" className="b-h2">
                {S.bdH.a} <span className="b-named">{S.bdH.b}</span>
              </h2>
              <p className="b-lede as-bd-lede">{S.bdLede}</p>
              <ul className="as-bd-l">
                {S.bdBody.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="as-bd-side">
              <figure className="as-score">
                <div className="as-score-tile">
                  <p className="as-label">{S.bdScore.k}</p>
                  <span className="as-score-slot" aria-hidden="true" />
                  <p className="as-score-v">{S.bdScore.v}</p>
                </div>
                <figcaption className="px-cap">{S.bdScore.cap}</figcaption>
              </figure>
              <div className="as-np">
                <p className="as-label" id="as-np-k">
                  {S.notPromisedK}
                </p>
                <ul aria-labelledby="as-np-k">
                  {S.notPromised.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <p className="as-np-c">{S.notPromisedClose}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — measurement (ivory): what is reported, beside the shape of the report, per assistant */}
      <section className="b-sec as-meas" aria-labelledby="as-h-meas">
        <div className="px-wrap">
          <p className="b-kicker">{S.measKicker}</p>
          <h2 id="as-h-meas" className="b-h2">
            {S.measH}
          </h2>
          <div className="as-meas-g">
            <div className="as-meas-tx">
              <p className="b-lede">{S.meas}</p>
              <div className="as-limit as-limit-light">
                <p>
                  {S.measLimit.a} <b>{S.measLimit.b}</b>
                </p>
              </div>
            </div>
            <figure className="as-sheet" data-rv="">
              <figcaption className="as-label">{S.sheet.cap}</figcaption>
              <div className="as-sheet-g">
                {S.sheet.sys.map((sys) => (
                  <div key={sys} className="as-sys" data-rv-i="">
                    <p className="as-sys-h">{sys}</p>
                    <dl>
                      {S.sheet.rows.map((r) => (
                        <div key={r}>
                          <dt>{r}</dt>
                          <dd>
                            <span className="as-blank" aria-hidden="true" />
                            <span className="px-sr">no data</span>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
                <div className="as-sys as-sys-un" data-rv-i="">
                  <p className="as-sys-h">
                    <Mark state="open" /> {S.sheet.untested}
                  </p>
                  <p className="as-sys-t">{S.sheet.untestedT}</p>
                </div>
                <div className="as-sys as-sys-x" data-rv-i="">
                  <p className="as-sys-h">{S.sheet.blended}</p>
                  <p className="as-sys-t">{S.sheet.blendedT}</p>
                </div>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* 7 — questions (paper): native disclosures, closed on load. The blocked objection renders nothing. */}
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

      {/* close: the shared close's markup and classes, with the prototype routes */}
      <section className="b-close" aria-labelledby="as-h-close">
        <div className="px-wrap b-close-in">
          <div>
            <p className="b-kicker as-close-k">{S.close.label}</p>
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
