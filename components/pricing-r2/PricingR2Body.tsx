import Link from 'next/link';
import type { CSSProperties } from 'react';
import { BOOKING_HREF, CONTACT_HREF } from '@/components/direction-c/primitives';
import { PricingR2Motion } from './PricingR2Motion';
import { PRICING_R2 as P } from './content';
import './pricing-r2.css';

/**
 * `/pricing` body. Visual benchmark: How It Works R2.2 (tokens already on main in app/globals.css,
 * --resolve-*). Bricolage Grotesque for display, Manrope for text. Motion is one-time and only armed by script; without
 * script or with reduced motion every panel is visible.
 */

function Actions({ band = false }: { band?: boolean }) {
  const primary = band ? 'prr-btn prr-btn-ink' : 'prr-btn prr-btn-primary';
  const secondary = band ? 'prr-btn prr-btn-ink-outline' : 'prr-btn prr-btn-ghost';
  return (
    <div className="prr-actions">
      <Link href={CONTACT_HREF} className={primary}>
        {P.links.primary}
      </Link>
      <Link href={BOOKING_HREF} className={secondary}>
        {P.links.secondary}
      </Link>
    </div>
  );
}

export function PricingR2Body() {
  return (
    <div className="prr">
      <PricingR2Motion />

      {/* 1. Dark hero: transparent management pricing */}
      <section className="prr-hero prr-dark" aria-labelledby="prr-h1">
        <div className="prr-w prr-hero-grid">
          <div>
            <p className="prr-eyebrow">{P.hero.kicker}</p>
            <h1 id="prr-h1" className="prr-h1">
              {P.hero.h1.a} <span className="prr-accent-block">{P.hero.h1.b}</span>
            </h1>
            <p className="prr-lede">{P.hero.lede}</p>
            <Actions />
          </div>

          <figure className="prr-ledger" aria-labelledby="prr-ledger-q">
            <p id="prr-ledger-q" className="prr-fig-q">
              {P.hero.ledgerLabel}
            </p>
            <ul className="prr-ledger-list">
              {P.hero.ledger.map((row, i) => (
                <li key={row.k} className="prr-ledger-row" data-prr-reveal="" style={{ '--i': i } as CSSProperties}>
                  <span className="prr-ledger-k">{row.k}</span>
                  <span className="prr-ledger-v">
                    {row.v} <small>{row.unit}</small>
                  </span>
                </li>
              ))}
            </ul>
            <figcaption className="prr-cap">{P.hero.ledgerNote}</figcaption>
          </figure>
        </div>

        <ol className="prr-w prr-parts" aria-label="How the price works">
          {P.hero.parts.map((part, i) => (
            <li key={part.n} className="prr-part" data-prr-reveal="" style={{ '--i': i } as CSSProperties}>
              <span className="prr-part-n" aria-hidden="true">
                {part.n}
              </span>
              <h2 className="prr-part-t">{part.t}</h2>
              <p className="prr-part-d">{part.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 2. Three plans, one comparable list each */}
      <section className="prr-sec prr-paper" aria-labelledby="prr-h-plans">
        <div className="prr-w">
          <p className="prr-eyebrow">{P.plans.kicker}</p>
          <h2 id="prr-h-plans" className="prr-h2">
            {P.plans.h2.a} <span className="prr-accent-text">{P.plans.h2.b}</span>
          </h2>
          <p className="prr-intro">{P.plans.intro}</p>

          <div className="prr-plans">
            {P.plans.items.map((plan, i) => (
              <article
                key={plan.title}
                className={'prr-plan' + (plan.featured ? ' is-combined' : '')}
                data-prr-reveal=""
                style={{ '--i': i } as CSSProperties}
              >
                <div className="prr-plan-head">
                  <p className="prr-plan-k">{plan.k}</p>
                  <h3 className="prr-plan-t">{plan.title}</h3>
                  <p className="prr-plan-fee">
                    <span className="prr-plan-amt">{plan.fee}</span>
                    <span className="prr-plan-per">{plan.per}</span>
                  </p>
                  <p className="prr-plan-note">{plan.note}</p>
                </div>
                <dl className="prr-rows">
                  {plan.rows.map((r) => (
                    <div key={r.k} className="prr-row">
                      <dt>{r.k}</dt>
                      <dd>{r.v}</dd>
                    </div>
                  ))}
                </dl>
                <Link href={CONTACT_HREF} className={'prr-btn ' + (plan.featured ? 'prr-btn-primary' : 'prr-btn-ghost-ink')}>
                  {P.links.primary}
                </Link>
              </article>
            ))}
          </div>

          <div className="prr-compare" data-prr-reveal="">
            <table className="prr-table">
              <caption className="prr-table-cap">{P.plans.compare.label}</caption>
              <thead>
                <tr>
                  <th scope="col">Included</th>
                  {P.plans.compare.heads.map((h) => (
                    <th key={h} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {P.plans.compare.rows.map((r) => (
                  <tr key={r.k}>
                    <th scope="row">{r.k}</th>
                    {typeof r.v === 'string' ? (
                      <td colSpan={3} data-label="All plans">
                        {r.v}
                      </td>
                    ) : (
                      r.v.map((v, i) => (
                        <td key={i} data-label={P.plans.compare.heads[i]}>
                          {v}
                        </td>
                      ))
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="prr-related">
            {P.plans.related.label} <Link href={P.plans.related.google.href}>{P.plans.related.google.label}</Link>
            {' and '}
            <Link href={P.plans.related.meta.href}>{P.plans.related.meta.label}</Link>.
          </p>
        </div>
      </section>

      {/* 3. What management includes: rhythm and scope */}
      <section className="prr-sec prr-ground" aria-labelledby="prr-h-included">
        <div className="prr-w prr-included-grid">
          <div>
            <p className="prr-eyebrow">{P.included.kicker}</p>
            <h2 id="prr-h-included" className="prr-h2">
              {P.included.h2.a} <span className="prr-accent-text">{P.included.h2.b}</span>
            </h2>
            <ol className="prr-cadence">
              {P.included.cadence.map((c, i) => (
                <li key={c.when} className="prr-cad" data-prr-reveal="" style={{ '--i': i } as CSSProperties}>
                  <p className="prr-cad-when">{c.when}</p>
                  <h3 className="prr-cad-t">{c.t}</h3>
                  <p className="prr-cad-d">{c.d}</p>
                </li>
              ))}
            </ol>
          </div>

          <aside className="prr-good" aria-labelledby="prr-h-good" data-prr-reveal="">
            <h3 id="prr-h-good" className="prr-good-t">
              {P.included.scopeLabel}
            </h3>
            <ul className="prr-good-list">
              {P.included.scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* 4. Creative production and Reel policy */}
      <section className="prr-sec prr-paper" aria-labelledby="prr-h-creative">
        <div className="prr-w">
          <p className="prr-eyebrow">{P.creative.kicker}</p>
          <h2 id="prr-h-creative" className="prr-h2">
            {P.creative.h2.a} <span className="prr-accent-text">{P.creative.h2.b}</span>
          </h2>
          <div className="prr-creative">
            <div className="prr-panel" data-prr-reveal="">
              <h3 className="prr-panel-t">{P.creative.included.label}</h3>
              <ul className="prr-check">
                {P.creative.included.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="prr-panel is-reel" data-prr-reveal="">
              <h3 className="prr-panel-t">{P.creative.excluded.label}</h3>
              <ul className="prr-check">
                {P.creative.excluded.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. What costs extra (dark) */}
      <section className="prr-sec prr-dark" aria-labelledby="prr-h-extra">
        <div className="prr-w prr-extra-grid">
          <div>
            <p className="prr-eyebrow">{P.extra.kicker}</p>
            <h2 id="prr-h-extra" className="prr-h2 prr-on-dark">
              {P.extra.h2.a} <span className="prr-accent-block">{P.extra.h2.b}</span>
            </h2>
            <p className="prr-body-dark">{P.extra.intro}</p>
          </div>
          <div>
            <ul className="prr-extra-list">
              {P.extra.items.map((item, i) => (
                <li key={item} className="prr-extra-item" data-prr-reveal="" style={{ '--i': i } as CSSProperties}>
                  <span>{item}</span>
                  <span className="prr-quoted">Quoted separately</span>
                </li>
              ))}
            </ul>
            <div className="prr-outside">
              <p className="prr-outside-label">{P.extra.outside.label}</p>
              <p className="prr-outside-list">{P.extra.outside.items.join(', ')}.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. How media spend and fees work */}
      <section className="prr-sec prr-paper" aria-labelledby="prr-h-split">
        <div className="prr-w">
          <p className="prr-eyebrow">{P.split.kicker}</p>
          <h2 id="prr-h-split" className="prr-h2">
            {P.split.h2.a} <span className="prr-accent-text">{P.split.h2.b}</span>
          </h2>
          <p className="prr-intro">{P.split.intro}</p>

          <div className="prr-flow" data-prr-reveal="">
            <p className="prr-you">{P.split.youLabel}</p>
            <ul className="prr-paths">
              {P.split.paths.map((p, i) => (
                <li
                  key={p.to}
                  className={'prr-path' + (p.kind === 'fee' ? ' is-fee' : ' is-media')}
                  style={{ '--i': i } as CSSProperties}
                >
                  <span className="prr-line" aria-hidden="true" />
                  <div className="prr-dest">
                    <p className="prr-dest-to">{p.to}</p>
                    <p className="prr-dest-what">{p.what}</p>
                    <p className="prr-dest-how">{p.how}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Pricing FAQs */}
      <section className="prr-sec prr-ground" aria-labelledby="prr-h-faq">
        <div className="prr-w">
          <p className="prr-eyebrow">{P.faq.kicker}</p>
          <h2 id="prr-h-faq" className="prr-h2">
            {P.faq.h2.a} <span className="prr-accent-text">{P.faq.h2.b}</span>
          </h2>
          <div className="prr-faqs">
            {P.faq.items.map((item, i) => (
              <details key={item.q} className="prr-faq" open={i === 0}>
                <summary className="prr-faq-q">{item.q}</summary>
                <div className="prr-faq-a">
                  <p className="prr-faq-direct">{item.direct}</p>
                  <p>{item.body}</p>
                </div>
              </details>
            ))}
          </div>
          <p className="prr-more">
            <Link href={P.faq.more.href}>{P.faq.more.label}</Link>
          </p>
        </div>
      </section>

      {/* 8. Closing enquiry CTA; the dark footer comes from the root layout */}
      <section className="prr-close" aria-labelledby="prr-h-close">
        <div className="prr-w prr-close-grid">
          <div>
            <p className="prr-eyebrow">{P.close.kicker}</p>
            <h2 id="prr-h-close" className="prr-h2 prr-close-h">
              {P.close.h2}
            </h2>
            <p className="prr-close-body">{P.close.body}</p>
          </div>
          <Actions band />
        </div>
      </section>
    </div>
  );
}
