import Link from 'next/link';
import type { CSSProperties } from 'react';
import { BOOKING_HREF, CONTACT_HREF, Mark } from '@/components/direction-c/primitives';
import { PR_PLAIN as S } from './content';
import './pricing.css';
import { Breadcrumb } from '../Breadcrumb';

/**
 * C+ Pricing (/pricing), revision 2: the approved prototype's page body (proto/direction-c-plus 0a8b611, PricingH.tsx), unchanged in markup and
 * copy. Production changes only: the breadcrumb's Home link and the CTAs point at the live routes (`/`, CONTACT_HREF
 * and BOOKING_HREF) instead of prototype paths.
 */

function Actions({ big }: { big?: boolean }) {
  return (
    <div className={'dc-actions' + (big ? ' pr-actions-big' : '')}>
      <Link href={CONTACT_HREF} className="dc-btn dc-btn-primary">
        <Mark />
        {S.primary}
      </Link>
      <Link href={BOOKING_HREF} className="dc-btn dc-btn-secondary">
        {S.secondary}
      </Link>
    </div>
  );
}

export function PricingBody() {
  const St = S.stacks;
  return (
    <>
      {/* 1 — hero (ivory): the idea + two stacks of work */}
      <section className="b-hero pr-hero" aria-labelledby="pr-h1">
        <div className="px-wrap b-hero-g h-hero-g pr-hero-g">
          <div>
            <Breadcrumb current={S.kicker} />
            <p className="b-kicker">{S.kicker}</p>
            <h1 id="pr-h1" className="b-h1">
              {S.h1.a} <span className="b-named">{S.h1.b}</span>
            </h1>
            <p className="b-lede">{S.lede}</p>
            <Actions big />
          </div>

          <figure className="pr-fig">
            <p className="pr-label pr-fig-k">{St.label}</p>
            <div className="pr-stacks">
              {St.items.map((it) => (
                <div key={it.k} className="pr-stack">
                  <ol className="pr-blocks" aria-label={`${it.k}: the work it needs`}>
                    {it.blocks.map((b, i) => (
                      <li key={b} className="pr-block" style={{ '--i': i } as CSSProperties}>
                        {b}
                      </li>
                    ))}
                  </ol>
                  <p className="pr-stack-k">{it.k}</p>
                  <p className="pr-stack-need">{it.need}</p>
                </div>
              ))}
            </div>
            <figcaption className="px-cap">{St.cap}</figcaption>
          </figure>
        </div>
      </section>

      {/* 2 — what changes the price (paper): five plain factors */}
      <section className="b-sec b-paper pr-fac" aria-labelledby="pr-h-fac">
        <div className="px-wrap">
          <p className="b-kicker">{S.facKicker}</p>
          <h2 id="pr-h-fac" className="b-h2">
            {S.facH.a} <span className="b-named">{S.facH.b}</span>
          </h2>
          <ul className="pr-factors" data-rv="">
            {S.factors.map((f) => (
              <li key={f.t} className="pr-factor" data-rv-i="">
                <div>
                  <h3 className="pr-factor-t">{f.t}</h3>
                  <p className="pr-factor-d">{f.d}</p>
                </div>
                <div className="pr-range">
                  <p className="pr-end pr-end-lo">
                    <span className="pr-label">{S.lessK}</span>
                    {f.less}
                  </p>
                  <span className="pr-arrow" aria-hidden="true" />
                  <p className="pr-end pr-end-hi">
                    <span className="pr-label">{S.moreK}</span>
                    {f.more}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 — what you pay separately (ink): the money paths */}
      <section className="b-sec b-ink pr-pay" aria-labelledby="pr-h-pay">
        <div className="px-wrap">
          <p className="b-kicker">{S.payKicker}</p>
          <h2 id="pr-h-pay" className="b-h2">
            {S.payH.a} <span className="b-named">{S.payH.b}</span>
          </h2>
          <p className="pr-body">{S.payIntro}</p>
          <div className="pr-flow" data-rv="">
            <p className="pr-you">{S.payYou}</p>
            <ul className="pr-paths">
              {S.pay.map((p, i) => (
                <li key={p.to} className={'pr-path' + (p.ours ? ' is-ours' : '')} style={{ '--i': i } as CSSProperties}>
                  <span className="pr-line" aria-hidden="true" />
                  <div className="pr-dest">
                    <p className="pr-dest-to">{p.to}</p>
                    <p className="pr-dest-what">{p.what}</p>
                    <p className="pr-dest-how">{p.how}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4 — how to get an estimate (paper): three steps */}
      <section className="b-sec b-paper pr-steps-s" aria-labelledby="pr-h-steps">
        <div className="px-wrap">
          <p className="b-kicker">{S.stepsKicker}</p>
          <h2 id="pr-h-steps" className="b-h2">
            {S.stepsH.a} <span className="b-named">{S.stepsH.b}</span>
          </h2>
          <ol className="pr-steps" data-rv="">
            {S.steps.map((s) => (
              <li key={s.t} data-rv-i="">
                <h3 className="pr-step-t">{s.t}</h3>
                <p className="pr-step-d">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* close */}
      <section className="b-close" aria-labelledby="pr-h-close">
        <div className="px-wrap b-close-in">
          <div>
            <p className="b-kicker pr-close-k">{S.close.label}</p>
            <h2 id="pr-h-close" className="b-h2">
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
