import Link from 'next/link';
import { BOOKING_HREF, CONTACT_HREF, InlineLink, Mark } from '@/components/direction-c/primitives';
import { SEO_PLAIN as S } from './content';
import './seo.css';
import { Breadcrumb } from '../Breadcrumb';

/**
 * C+ SEO (/seo): the approved prototype's page body (proto/direction-c-plus 0a8b611, SeoH.tsx), unchanged in markup and
 * copy. Production changes only: the breadcrumb's Home link and the CTAs point at the live routes (`/`, CONTACT_HREF
 * and BOOKING_HREF) instead of prototype paths.
 */

/* Small illustrations of the four stations — decorative; every station is named in text beside it. */
function Glyph({ k }: { k: string }) {
  return (
    <svg className="sx-g-svg" viewBox="0 0 64 48" aria-hidden="true" focusable="false">
      {k === 'search' && (
        <>
          <rect x="3" y="13" width="44" height="22" rx="11" className="sx-g-frame" />
          <path d="M13 24h18" className="sx-g-text" />
          <circle cx="53" cy="22" r="6" className="sx-g-stroke" />
          <path d="M57.5 26.5l4 4" className="sx-g-stroke" />
        </>
      )}
      {k === 'result' && (
        <>
          <rect x="6" y="5" width="52" height="9" rx="2" className="sx-g-dim" />
          <rect x="6" y="19" width="52" height="10" rx="2" className="sx-g-ink" />
          <rect x="6" y="34" width="38" height="9" rx="2" className="sx-g-dim" />
        </>
      )}
      {k === 'page' && (
        <>
          <rect x="13" y="3" width="38" height="42" rx="3" className="sx-g-frame" />
          <rect x="19" y="10" width="22" height="6" rx="1" className="sx-g-ink" />
          <path d="M19 23h26M19 30h22M19 37h18" className="sx-g-text" />
        </>
      )}
      {k === 'enquiry' && (
        <>
          <rect x="7" y="9" width="50" height="32" rx="3" className="sx-g-tang" />
          <path d="M8 11l24 17 24-17" className="sx-g-flap" />
        </>
      )}
    </svg>
  );
}

/* One short trail for the situation cards: four marks, broken where that version of the problem breaks. */
function MiniTrail({ kind }: { kind: number }) {
  return (
    <div className={`sx-mini sx-mini-${kind}`} aria-hidden="true">
      <span className="sx-mini-ln" />
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className={`sx-mini-m sx-mini-m${i}`} />
      ))}
      {kind === 0 && <span className="sx-mini-off">competitor</span>}
      {kind === 2 && <span className="sx-mini-rep">report</span>}
    </div>
  );
}

export function SeoBody() {
  const midIdx = [1, 2];
  return (
    <>
      {/* 1 — hero (ivory): the claim + the trail from a search to an enquiry */}
      <section className="b-hero sx-hero" aria-labelledby="sx-h1">
        <div className="px-wrap b-hero-g h-hero-g sx-hero-g">
          <div>
            <Breadcrumb trail={['What we do']} current={S.crumb} />
            <p className="b-kicker">{S.kicker}</p>
            <h1 id="sx-h1" className="b-h1">
              {S.h1.a} <span className="b-named">{S.h1.b}</span> {S.h1.c}
            </h1>
            <p className="b-lede">{S.lede}</p>
            <p className="sx-side">
              {S.side.a} <b>{S.side.b}</b>
            </p>
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
          </div>

          <figure className="sx-hero-fig">
            <div className="sx-trail">
              <ol className="sx-st-list" aria-label="From a search to an enquiry">
                {S.trail.map((st, i) => (
                  <li key={st.key} className={'sx-st' + (midIdx.includes(i) ? ' is-mid' : '') + (i === 3 ? ' is-end' : '')}>
                    <span className="sx-g">
                      <Glyph k={st.key} />
                    </span>
                    <span className="sx-st-tx">
                      <span className="sx-st-t">{st.name}</span>
                      <span className="sx-st-n">{st.note}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="sx-br sx-br-mid">
                <span className="sx-br-tag">{S.trailMid.tag}</span>
                <span className="sx-br-t">{S.trailMid.t}</span>
              </p>
              <p className="sx-br sx-br-end">
                <span className="sx-br-tag">{S.trailEnd.tag}</span>
                <span className="sx-br-t">{S.trailEnd.t}</span>
              </p>
            </div>
            <figcaption className="px-cap">
              <b>{S.trailCap}</b> {S.trailNote}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 2 — horizon and limitations (ink): before any scope, the horizon in months and the boundary */}
      <section className="b-sec b-ink sx-hz-sec" aria-labelledby="sx-h-hz">
        <div className="px-wrap">
          <p className="b-kicker">{S.hzKicker}</p>
          <h2 id="sx-h-hz" className="b-h2">
            {S.hzH.a} <span className="b-named">{S.hzH.b}</span>
          </h2>
          <p className="sx-hz-st">
            {S.hzStatement.a} <span className="sx-hz-em">{S.hzStatement.b}</span>
          </p>

          <figure className="sx-hz" data-rv="">
            <div className="sx-hz-g">
              <div className="sx-hz-ticks" aria-hidden="true">
                <span className="sx-hz-axis">{S.hzFig.axis}</span>
                {S.hzFig.ticks.map((t) => (
                  <span key={t} className="sx-hz-tick">
                    {t}
                  </span>
                ))}
              </div>
              <div className="sx-hz-bar" aria-hidden="true">
                <span className="sx-hz-rep" />
                <span className="sx-hz-on" />
                <span className="sx-hz-plus" />
              </div>
              <ul className="sx-hz-notes">
                <li className="sx-hz-n-rep">
                  <i aria-hidden="true" /> {S.hzFig.repair}
                </li>
                <li className="sx-hz-n-plus">
                  <i aria-hidden="true" /> {S.hzFig.plus}
                </li>
              </ul>
            </div>
            <figcaption className="px-cap px-cap-ink">{S.hzFig.label}</figcaption>
          </figure>

          <div className="sx-hz-rows">
            <dl className="sx-hz-dl">
              <div>
                <dt>{S.rows.horizon.k}</dt>
                <dd>{S.rows.horizon.t}</dd>
              </div>
              <div className="sx-hz-urgent">
                <dt>{S.rows.urgent.k}</dt>
                <dd>
                  <b>{S.rows.urgent.t}</b>
                </dd>
              </div>
            </dl>
            <div className="sx-np">
              <p className="sx-np-k" id="sx-np-k">
                {S.rows.not.k}
              </p>
              <ul aria-labelledby="sx-np-k">
                {S.rows.not.items.map((t) => (
                  <li key={t}>
                    <span>{t}</span>
                    <em>{S.rows.not.tag}</em>
                  </li>
                ))}
              </ul>
              <p className="b-tlink sx-link-ink">
                <Link href={S.hzLink.href}>{S.hzLink.label} →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — the situation (paper): three short trails, each breaking somewhere else */}
      <section className="b-sec b-paper sx-sit-sec" aria-labelledby="sx-h-sit">
        <div className="px-wrap">
          <p className="b-kicker">{S.sitKicker}</p>
          <h2 id="sx-h-sit" className="b-h2">
            {S.sitH.a} <span className="b-named">{S.sitH.b}</span>
          </h2>
          <ol className="sx-sits" data-rv="" aria-label="Three versions of the situation">
            {S.sits.map((s, i) => (
              <li key={s.tag} data-rv-i="" className={'sx-sit' + (i > 0 ? ' is-more' : '')}>
                <MiniTrail kind={i} />
                <p className="sx-sit-tag">{s.tag}</p>
                <p className="sx-sit-t">{s.t}</p>
              </li>
            ))}
          </ol>
          <div className="sx-sit-more">
            <span className="sx-sit-br" aria-hidden="true" />
            <p>{S.sitMore}</p>
          </div>
          <p className="px-cap">{S.sitCap}</p>
          <p className="b-tlink">
            <Link href={S.sitLink.href}>{S.sitLink.label} →</Link>
          </p>
        </div>
      </section>

      {/* 4 — month to month (ivory): the six parts of the work against the four stations of the trail */}
      <section className="b-sec sx-work-sec" aria-labelledby="sx-h-work">
        <div className="px-wrap">
          <p className="b-kicker">{S.workKicker}</p>
          <h2 id="sx-h-work" className="b-h2">
            {S.workH}
          </h2>
          <p className="sx-work-cap">{S.workCap}</p>
          <div className="sx-cov">
            <div className="sx-cov-head" aria-hidden="true">
              <span />
              {S.workCols.map((c, i) => (
                <span key={c} className={'sx-cov-col' + (i === 3 ? ' is-end' : '')}>
                  <span className="sx-cov-g">
                    <Glyph k={S.trail[i].key} />
                  </span>
                  {c}
                </span>
              ))}
            </div>
            <ol className="sx-cov-list" data-rv="">
              {S.work.map((w) => (
                <li key={w.lead} className="sx-cov-r" data-rv-i="">
                  <div className="sx-cov-tx">
                    <h3 className="sx-cov-t">{w.lead}</h3>
                    <p className="sx-cov-b">{w.body}</p>
                    <p className="px-sr">Acts on: {w.on.map((n) => S.workColsSr[n]).join(', ')}.</p>
                  </div>
                  <div className="sx-cov-m" aria-hidden="true">
                    {S.workCols.map((c, i) => (
                      <span key={c} className={'sx-cov-c' + (w.on.includes(i) ? ' is-on' : '') + (i === 3 ? ' is-end' : '')}>
                        <span className="sx-cov-c-l">{c}</span>
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 5 — how you will know (ink): the report drawn as its shape (no data); the self-test is cross-linked to /ai-seo, not printed here */}
      <section className="b-sec b-ink sx-meas-sec" aria-labelledby="sx-h-meas">
        <div className="px-wrap">
          <p className="b-kicker">{S.measKicker}</p>
          <h2 id="sx-h-meas" className="b-h2">
            {S.measH}
          </h2>
          <div className="sx-meas-g">
            <div className="sx-meas-tx">
              {S.meas.map((t) => (
                <p key={t} className="sx-meas-p">
                  {t}
                </p>
              ))}
              <p className="b-tlink sx-link-ink">
                <Link href={S.measLink.href}>{S.measLink.label} →</Link>
              </p>
              <p className="b-tlink sx-link-ink">
                <Link href={S.selfLink.href}>{S.selfLink.label} →</Link>
              </p>
            </div>
            <figure className="sx-rep" data-rv="">
              <figcaption className="sx-rep-cap">{S.report.cap}</figcaption>
              <div className="sx-rep-row sx-rep-start" data-rv-i="">
                <p className="sx-rep-k">{S.report.start.k}</p>
                <p className="sx-rep-t">{S.report.start.t}</p>
              </div>
              <div className="sx-rep-row sx-rep-enq" data-rv-i="">
                <p className="sx-rep-k sx-rep-big">{S.report.enq.k}</p>
                <ul className="sx-rep-cols">
                  {S.report.enq.cols.map((c) => (
                    <li key={c}>
                      <span className="sx-rep-bars" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sx-rep-row sx-rep-un" data-rv-i="">
                <p className="sx-rep-k">
                  <Mark state="open" /> {S.report.unattr.k}
                </p>
                <p className="sx-rep-t">{S.report.unattr.t}</p>
              </div>
              <div className="sx-rep-row sx-rep-diag" data-rv-i="">
                <p className="sx-rep-k">{S.report.diag.k}</p>
                <p className="sx-rep-t">{S.report.diag.t}</p>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* 6 — questions (paper): three native disclosures, closed on load (the approved FAQ pattern) */}
      <section className="b-sec b-paper sx-q-sec" aria-labelledby="sx-h-qs">
        <div className="px-wrap sx-q-g">
          <div>
            <p className="b-kicker">{S.qKicker}</p>
            <h2 id="sx-h-qs" className="b-h2">
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
            <p className="b-tlink">
              <Link href={S.qLink.href}>{S.qLink.label} →</Link>
            </p>
            <p className="sx-above">
              {S.qAbove.a} <InlineLink href={S.qAbove.href}>{S.qAbove.link}</InlineLink>.
            </p>
          </div>
        </div>
      </section>

      {/* close (tangerine): the shared close's markup and classes, with the prototype routes */}
      <section className="b-close" aria-labelledby="sx-h-close">
        <div className="px-wrap b-close-in">
          <div>
            <p className="b-kicker sx-close-k">{S.close.label}</p>
            <h2 id="sx-h-close" className="b-h2">
              {S.close.h}
            </h2>
            <p className="b-lede">{S.close.body}</p>
          </div>
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
        </div>
      </section>
    </>
  );
}
