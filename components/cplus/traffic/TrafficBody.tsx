import Link from 'next/link';
import type { CSSProperties } from 'react';
import { BOOKING_HREF, CONTACT_HREF, Mark } from '@/components/direction-c/primitives';
import { TB_PLAIN as S } from './content';
import './traffic.css';
import { Breadcrumb } from '../Breadcrumb';

/**
 * C+ Traffic but no enquiries (/problems/traffic-but-no-enquiries), revision 2: the approved prototype's page body
 * (proto/direction-c-plus 0a8b611, TrafficH.tsx), unchanged in markup and copy. Production changes only: the breadcrumb's
 * Home link and the CTAs point at the live routes (`/`, CONTACT_HREF and BOOKING_HREF) instead of prototype paths. The
 * page's BreadcrumbList is emitted by the route, unchanged.
 */

export function TrafficBody() {
  const J = S.journey;
  return (
    <>
      {/* 1 — hero (ivory): the question, then the journey, full width. No CTA. */}
      <section className="b-hero tb-hero" aria-labelledby="tb-h1">
        <div className="px-wrap">
          <div className="tb-hero-t">
            <Breadcrumb trail={[S.crumb.a]} current={S.crumb.b} />
            <p className="b-kicker">{S.kicker}</p>
            <h1 id="tb-h1" className="b-h1">
              {S.h1.a} <span className="b-named">{S.h1.b}</span>
            </h1>
            <p className="b-lede">{S.lede}</p>
          </div>

          <figure className="tb-fig" data-rv="">
            <p className="tb-label tb-fig-k">{J.label}</p>
            <div className="tb-journey">
              <span className="tb-dots" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((n) => (
                  <i key={n} className={`tb-dot tb-dot-${n}`} />
                ))}
              </span>
              <ol className="tb-stages">
                {J.stages.map((s, i) => (
                  <li key={s.t} className="tb-stage" style={{ '--i': i } as CSSProperties}>
                    <span className="tb-node" aria-hidden="true" />
                    <p className="tb-stage-t">{s.t}</p>
                    <p className="tb-stage-d">{s.d}</p>
                    <p className={`tb-exit tb-exit-${i + 1}`}>
                      <span className="tb-exit-arrow" aria-hidden="true" />
                      <span className="px-sr">Some leave here: </span>
                      {s.exit}
                    </p>
                  </li>
                ))}
                <li className="tb-stage tb-stage-end" style={{ '--i': 3 } as CSSProperties}>
                  <span className="tb-node" aria-hidden="true" />
                  <p className="tb-end">{J.end}</p>
                </li>
              </ol>
            </div>
            <figcaption className="px-cap">{J.cap}</figcaption>
          </figure>
        </div>
      </section>

      {/* 2 — three places people leave (paper) */}
      <section className="b-sec b-paper tb-why" aria-labelledby="tb-h-why">
        <div className="px-wrap">
          <p className="b-kicker">{S.whyKicker}</p>
          <h2 id="tb-h-why" className="b-h2">
            {S.whyH.a} <span className="b-named">{S.whyH.b}</span>
          </h2>
          <ul className="tb-causes" data-rv="">
            {S.causes.map((c) => (
              <li key={c.k} className="tb-cause" data-rv-i="">
                <p className="tb-cause-k">
                  <span className="tb-exit-arrow" aria-hidden="true" />
                  {c.k}
                </p>
                <h3 className="tb-cause-t">{c.t}</h3>
                <p className="tb-cause-sign">{c.sign}</p>
                <p className="tb-cause-help">{c.help}</p>
                <p className="b-tlink tb-cause-link">
                  <Link href={c.link.href}>{c.link.label} →</Link>
                </p>
              </li>
            ))}
          </ul>
          <p className="tb-note">{S.note}</p>
        </div>
      </section>

      {/* 3 — three quick checks (ink) */}
      <section className="b-sec b-ink tb-check" aria-labelledby="tb-h-check">
        <div className="px-wrap">
          <p className="b-kicker">{S.checkKicker}</p>
          <h2 id="tb-h-check" className="b-h2">
            {S.checkH.a} <span className="b-named">{S.checkH.b}</span>
          </h2>
          <p className="tb-check-intro">{S.checkIntro}</p>
          <ol className="tb-checks" data-rv="">
            {S.checks.map((c) => (
              <li key={c.t} data-rv-i="">
                <p className="tb-check-t">{c.t}</p>
                <p className="tb-check-d">{c.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* close: the next step */}
      <section className="b-close" aria-labelledby="tb-h-close">
        <div className="px-wrap b-close-in">
          <div>
            <p className="b-kicker tb-close-k">{S.close.label}</p>
            <h2 id="tb-h-close" className="b-h2">
              {S.close.h}
            </h2>
            <p className="b-lede">{S.close.body}</p>
          </div>
          <div className="dc-actions" data-rv="">
            <Link href={CONTACT_HREF} className="dc-btn dc-btn-primary tb-nudge">
              <Mark />
              {S.close.primary}
            </Link>
            <Link href={BOOKING_HREF} className="dc-btn dc-btn-secondary">
              {S.close.secondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
