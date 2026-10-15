import Link from 'next/link';
import { CONTACT_HREF, Mark } from '@/components/direction-c/primitives';
import { SV_PLAIN as S } from './content';
import './services.css';
import { Breadcrumb } from '../Breadcrumb';
import { Journey } from './Journey';

/**
 * C+ Services (/services): the approved prototype's page body (proto/direction-c-plus e5c1aa4, ServicesH.tsx),
 * with the copy revised in the 2026-10-15 customer-focused pass. Production changes only: the breadcrumb's Home link and the CTA point at the live
 * routes (`/` and CONTACT_HREF) instead of prototype paths. The only client JavaScript is the Journey in section 3.
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

export function ServicesBody() {
  const P = S.plate;
  return (
    <>
      {/* 1 — hero (ivory): the outcome + the directory plate */}
      <section className="b-hero sv-hero" aria-labelledby="sv-h1">
        <div className="px-wrap b-hero-g h-hero-g sv-hero-g">
          <div>
            <Breadcrumb current={S.kicker} />
            <p className="b-kicker">{S.kicker}</p>
            <h1 id="sv-h1" className="b-h1">
              {S.h1.a} <span className="b-named">{S.h1.b}</span>
            </h1>
            <p className="b-lede">{S.lede}</p>
            <Action />
          </div>

          <figure className="sv-fig">
            <div className="sv-plate">
              <p className="sv-plate-t">{P.title}</p>
              <dl className="sv-plate-l">
                {P.rows.map((r) => (
                  <div key={r.k} className="sv-plate-r">
                    <dt>{r.k}</dt>
                    <dd>
                      <p className="sv-plate-d">{r.d}</p>
                      <ul>
                        {r.v.map((v) => (
                          <li key={v}>{v}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <figcaption className="px-cap">{P.cap}</figcaption>
          </figure>
        </div>
      </section>

      {/* 2 — the router (paper): start with the symptom */}
      <section className="b-sec b-paper sv-route" aria-labelledby="sv-h-route">
        <div className="px-wrap">
          <p className="b-kicker">{S.routeKicker}</p>
          <h2 id="sv-h-route" className="b-h2">
            {S.routeH.a} <span className="b-named">{S.routeH.b}</span>
          </h2>
          <ol className="sv-routes" data-rv="">
            {S.routes.map((r) => (
              <li key={r.tag} className="sv-row" data-rv-i="">
                <div className="sv-sym">
                  <p className="sv-tag">{r.tag}</p>
                  <h3 className="sv-sym-t">{r.sym}</h3>
                  <p className="sv-job">{r.job}</p>
                </div>
                {r.svc.length > 0 ? (
                  <ul className={'sv-svcs' + (r.svc.length > 1 ? ' is-many' : '')}>
                    {r.svc.map((v) => (
                      <li key={v.href}>
                        <Link href={v.href} className="sv-door">
                          <span className="sv-door-n">{v.name}</span>
                          <span className="sv-door-d">{v.d}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="sv-route-note">{r.note}</p>
                )}
              </li>
            ))}
          </ol>
          <div className="sv-unsure">
            <p className="sv-unsure-t">{S.unsure.t}</p>
            <p className="sv-unsure-d">{S.unsure.d}</p>
            <p className="b-tlink">
              <Link href={S.unsure.link.href}>{S.unsure.link.label} →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* 3 — how they work together (ink): the animated journey, then a compact scope summary */}
      <section className="b-sec b-ink sv-join" aria-labelledby="sv-h-join">
        <div className="px-wrap">
          <p className="b-kicker">{S.joinKicker}</p>
          <h2 id="sv-h-join" className="b-h2">
            {S.joinH.a} <span className="b-named">{S.joinH.b}</span>
          </h2>
          <Journey stages={S.journey} label={S.journeyLabel} stepOf={S.stepOf} />
          <div className="sv-sum">
            <div>
              <h3 className="sv-label">{S.sumManage.k}</h3>
              <p className="sv-body">{S.sumManage.d}</p>
            </div>
            <div>
              <h3 className="sv-label">{S.sumAffect.k}</h3>
              <p className="sv-body">{S.sumAffect.d}</p>
            </div>
          </div>
          <p className="sv-nopromise">{S.noPromise}</p>
        </div>
      </section>

      {/* 4 — boundaries (paper): what can be added later, what we do not do */}
      <section className="b-sec b-paper sv-lim" aria-labelledby="sv-h-lim">
        <div className="px-wrap sv-lim-g">
          <div>
            <h2 id="sv-h-lim" className="sv-lim-h">
              {S.laterK}
            </h2>
            <p className="sv-label">{S.laterStart.k}</p>
            <p className="sv-body sv-bd-d">{S.laterStart.d}</p>
            <p className="sv-label sv-later-k">{S.laterAdd.k}</p>
            <p className="sv-body sv-bd-d">{S.laterAdd.d}</p>
            <p className="b-tlink">
              <Link href={S.priceLink.href}>{S.priceLink.label} →</Link>
            </p>
          </div>
          <div>
            <h2 className="sv-lim-h">{S.notK}</h2>
            <ul className="sv-not">
              {S.not.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="sv-not-line">{S.notLine}</p>
          </div>
        </div>
      </section>

      {/* close: the shared close's markup and classes; one CTA */}
      <section className="b-close" aria-labelledby="sv-h-close">
        <div className="px-wrap b-close-in">
          <div>
            <p className="b-kicker sv-close-k">{S.close.label}</p>
            <h2 id="sv-h-close" className="b-h2">
              {S.close.h.a} <span className="sv-close-em">{S.close.h.b}</span>
            </h2>
            <p className="b-lede">{S.close.body}</p>
          </div>
          <Action />
        </div>
      </section>
    </>
  );
}
