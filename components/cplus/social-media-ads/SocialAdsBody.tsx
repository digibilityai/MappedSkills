import Link from 'next/link';
import { CONTACT_HREF, InlineLink, Mark } from '@/components/direction-c/primitives';
import { SA_PLAIN as S } from './content';
import './social-ads.css';
import { Breadcrumb } from '../Breadcrumb';

/**
 * C+ Social Media Ads (/social-media-ads): the approved prototype's page body (proto/direction-c-plus 0a8b611, SocialAdsH.tsx), unchanged in markup and
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

export function SocialAdsBody() {
  const F = S.feed;
  return (
    <>
      {/* 1 — hero (ivory): the claim + one ad in a feed */}
      <section className="b-hero sa-hero" aria-labelledby="sa-h1">
        <div className="px-wrap b-hero-g h-hero-g sa-hero-g">
          <div>
            <Breadcrumb trail={['What we do']} current={S.crumb} />
            <p className="b-kicker">{S.kicker}</p>
            <h1 id="sa-h1" className="b-h1">
              {S.h1.a} <span className="b-named">{S.h1.b}</span>
            </h1>
            <p className="b-lede">{S.lede}</p>
            <p className="sa-side">{S.side}</p>
            <Action />
          </div>

          <figure className="sa-fig">
            <div className="sa-scene">
              <div className="sa-phone">
                <p className="sa-label sa-phone-k">{F.label}</p>
                <ul className="sa-feed">
                  <li className="sa-post">
                    <span className="sa-media" aria-hidden="true" />
                    <span className="sa-post-t">{F.posts[0]}</span>
                  </li>
                  <li className="sa-post">
                    <span className="sa-media" aria-hidden="true" />
                    <span className="sa-post-t">{F.posts[1]}</span>
                  </li>
                  <li className="sa-post sa-ad">
                    <span className="sa-ad-tag">{F.ad.tag}</span>
                    <span className="sa-media sa-media-ad" aria-hidden="true" />
                    <span className="sa-post-t">{F.ad.t}</span>
                    <span className="sa-ad-note">{F.ad.note}</span>
                  </li>
                  <li className="sa-post">
                    <span className="sa-media" aria-hidden="true" />
                    <span className="sa-post-t">{F.posts[2]}</span>
                  </li>
                </ul>
              </div>
              <div className="sa-read">
                <div className="sa-reacts">
                  <p className="sa-label">{F.reactsK}</p>
                  <ul>
                    {F.reacts.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
                <div className="sa-counts">
                  <p className="sa-label">{F.countsK}</p>
                  <p className="sa-counts-t">{F.counts}</p>
                </div>
              </div>
            </div>
            <figcaption className="px-cap">{F.cap}</figcaption>
          </figure>
        </div>
      </section>

      {/* 2 — scope (ink): the work as feed tiles; the landing experience is the one the click arrives on */}
      <section className="b-sec b-ink sa-scope" aria-labelledby="sa-h-scope">
        <div className="px-wrap">
          <p className="b-kicker">{S.scopeKicker}</p>
          <h2 id="sa-h-scope" className="b-h2">
            {S.scopeH.a} <span className="b-named">{S.scopeH.b}</span>
          </h2>
          <ul className="sa-tiles" data-rv="">
            {S.scope.map((t) => (
              <li key={t} className="sa-tile" data-rv-i="">
                {t}
              </li>
            ))}
            <li className="sa-tile sa-tile-on" data-rv-i="">
              {S.scopeLanding}
            </li>
          </ul>
          <p className="sa-meas">{S.scopeMeas}</p>
          <p className="sa-bill">{S.billing}</p>
        </div>
      </section>

      {/* 3 — the channel-fit boundary (paper): when we would tell you not to do this */}
      <section className="b-sec b-paper sa-bd" aria-labelledby="sa-h-bd">
        <div className="px-wrap">
          <p className="b-kicker">{S.bdKicker}</p>
          <h2 id="sa-h-bd" className="b-h2">
            {S.bdH.a} <span className="b-named">{S.bdH.b}</span>
          </h2>
          <div className="sa-bd-g">
            <ul className="sa-noes">
              {S.noes.map((n) => (
                <li key={n.t}>
                  <span className="sa-stop" aria-hidden="true" />
                  <div>
                    <p className="sa-no-t">{n.t}</p>
                    <p className="sa-no-d">{n.d}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="sa-principle">
              <p className="sa-principle-t">{S.principle}</p>
              <p className="sa-principle-d">{S.principleD}</p>
              <p className="b-tlink">
                <Link href={S.methodLink.href}>{S.methodLink.label} →</Link>
              </p>
              <p className="sa-related">
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
          </div>
        </div>
      </section>

      {/* close: the shared close's markup and classes; one CTA */}
      <section className="b-close" aria-labelledby="sa-h-close">
        <div className="px-wrap b-close-in">
          <div>
            <p className="b-kicker sa-close-k">{S.close.label}</p>
            <h2 id="sa-h-close" className="b-h2">
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
