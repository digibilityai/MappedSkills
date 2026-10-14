import Link from 'next/link';
import { CONTACT_HREF, InlineLink, Mark } from '@/components/direction-c/primitives';
import { GA_PLAIN as S } from './content';
import './google-ads.css';
import { Breadcrumb } from '../Breadcrumb';

/**
 * C+ Google Ads (/google-ads): the approved prototype's page body (proto/direction-c-plus 0a8b611, GoogleAdsH.tsx), unchanged in markup and
 * copy. Production changes only: the breadcrumb's Home link and the CTAs point at the live routes (`/`, CONTACT_HREF
 * and BOOKING_HREF) instead of prototype paths.
 */

function Action() {
  return (
    <div className="dc-actions">
      <Link href={CONTACT_HREF} className="dc-btn dc-btn-primary">
        <Mark />
        {S.primary}
      </Link>
    </div>
  );
}

export function GoogleAdsBody() {
  const R = S.receipt;
  return (
    <>
      {/* 1 — hero (ivory): the claim + one click, as a receipt */}
      <section className="b-hero ga-hero" aria-labelledby="ga-h1">
        <div className="px-wrap b-hero-g h-hero-g ga-hero-g">
          <div>
            <Breadcrumb trail={['What we do']} current={S.crumb} />
            <p className="b-kicker">{S.kicker}</p>
            <h1 id="ga-h1" className="b-h1">
              {S.h1.a} <span className="b-named">{S.h1.b}</span>
            </h1>
            <p className="b-lede">{S.lede}</p>
            <p className="ga-side">{S.side}</p>
            <Action />
          </div>

          <figure className="ga-fig">
            <div className="ga-rc">
              <p className="ga-rc-title">{R.title}</p>
              <div className="ga-rc-part">
                <p className="ga-rc-k">
                  <span className="ga-label">{R.topK}</span>
                  <span className="ga-tag">{R.topTag}</span>
                </p>
                <ul className="ga-rc-l">
                  {R.top.map((t) => (
                    <li key={t}>
                      <span>{t}</span>
                      <span className="ga-dots" aria-hidden="true" />
                      <span className="ga-tick" aria-hidden="true" />
                    </li>
                  ))}
                </ul>
              </div>
              <p className="ga-tear">
                <span>{R.tear}</span>
              </p>
              <div className="ga-rc-part ga-rc-ours">
                <p className="ga-rc-k">
                  <span className="ga-label">{R.bottomK}</span>
                  <span className="ga-tag ga-tag-ours">{R.bottomTag}</span>
                </p>
                <ul className="ga-rc-l">
                  {R.bottom.map((t) => (
                    <li key={t}>
                      <span>{t}</span>
                      <span className="ga-dots" aria-hidden="true" />
                      <span className="ga-tick is-on" aria-hidden="true" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <figcaption className="px-cap">{R.cap}</figcaption>
          </figure>
        </div>
      </section>

      {/* 2 — where paid search sits (ink): a ruler — where the work is measured */}
      <section className="b-sec b-ink ga-sit" aria-labelledby="ga-h-sit">
        <div className="px-wrap">
          <p className="b-kicker">{S.sitKicker}</p>
          <h2 id="ga-h-sit" className="b-h2">
            {S.sitH.a} <span className="b-named">{S.sitH.b}</span>
          </h2>
          <p className="b-lede ga-sit-body">{S.sitBody}</p>
          <figure className="ga-ruler" data-rv="">
            <figcaption className="ga-label">{S.ruler.label}</figcaption>
            <ol className="ga-ticks">
              {S.ruler.ticks.map((t, i) => (
                <li key={t} className={i === 0 ? 'is-them' : i === 2 ? 'is-us' : undefined} data-rv-i="">
                  <span className="ga-tick-mk" aria-hidden="true" />
                  <span className="ga-tick-t">{t}</span>
                  {i === 0 ? <span className="ga-pin">{S.ruler.them}</span> : null}
                  {i === 2 ? <span className="ga-pin ga-pin-us">{S.ruler.us}</span> : null}
                </li>
              ))}
            </ol>
          </figure>
          <p className="ga-line">{S.sitLine}</p>
        </div>
      </section>

      {/* 3 — the boundary (paper): spend paid to Google, our fee separate; what we will not promise */}
      <section className="b-sec b-paper ga-bd" aria-labelledby="ga-h-bd">
        <div className="px-wrap">
          <p className="b-kicker">{S.bdKicker}</p>
          <div className="ga-bd-g">
            <div>
              <h2 id="ga-h-bd" className="b-h2 ga-bd-h">
                {S.bdH.a} <span className="b-named">{S.bdH.b}</span>
              </h2>
              {S.bdBody.map((t) => (
                <p key={t} className="ga-body">
                  {t}
                </p>
              ))}
            </div>
            <div className="ga-np">
              <p className="ga-label" id="ga-np-k">
                {S.notPromisedK}
              </p>
              <ul aria-labelledby="ga-np-k">
                {S.notPromised.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className="ga-np-close">{S.notPromisedClose}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — scope (ink): grouped by where each item acts, the click between the account and the rest */}
      <section className="b-sec b-ink ga-scope" aria-labelledby="ga-h-scope">
        <div className="px-wrap">
          <p className="b-kicker">{S.scopeKicker}</p>
          <h2 id="ga-h-scope" className="b-h2">
            {S.scopeH.a} <span className="b-named">{S.scopeH.b}</span>
          </h2>
          <div className="ga-groups" data-rv="">
            {S.scope.map((g, i) => (
              <div key={g.k} className={'ga-group' + (i === 0 ? ' is-acct' : '')} data-rv-i="">
                <h3 className="ga-label ga-group-k">{g.k}</h3>
                <ul className="ga-items">
                  {g.items.map((it) => (
                    <li key={it.t}>
                      <p className="ga-item-t">{it.t}</p>
                      <p className="ga-item-d">{it.d}</p>
                    </li>
                  ))}
                </ul>
                {i === 0 ? (
                  <p className="ga-vtear" aria-hidden="true">
                    <span>{S.scopeTear}</span>
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — measurement (paper): the claim, with its limit beside it */}
      <section className="b-sec b-paper ga-meas" aria-labelledby="ga-h-meas">
        <div className="px-wrap ga-meas-g">
          <div>
            <p className="b-kicker">{S.measKicker}</p>
            <h2 id="ga-h-meas" className="b-h2">
              {S.measH.a} <span className="b-named">{S.measH.b}</span>
            </h2>
            <p className="ga-body ga-meas-body">{S.measBody}</p>
            <p className="b-tlink">
              <Link href={S.measLink.href}>{S.measLink.label} →</Link>
            </p>
            <p className="ga-related">
              {S.related.a}{' '}
              {S.related.links.map((l, i) => (
                <span key={l.href}>
                  {i ? ' · ' : ''}
                  <InlineLink href={l.href}>{l.label}</InlineLink>
                </span>
              ))}
              .
            </p>
          </div>
          <aside className="ga-limit" aria-labelledby="ga-limit-k">
            <p className="ga-label" id="ga-limit-k">
              {S.limitK}
            </p>
            <p>{S.limit}</p>
          </aside>
        </div>
      </section>

      {/* close: the shared close's markup and classes; one CTA */}
      <section className="b-close" aria-labelledby="ga-h-close">
        <div className="px-wrap b-close-in">
          <div>
            <p className="b-kicker ga-close-k">{S.close.label}</p>
            <h2 id="ga-h-close" className="b-h2">
              {S.close.h}
            </h2>
            <p className="b-lede">{S.close.body}</p>
          </div>
          <Action />
        </div>
      </section>
    </>
  );
}
