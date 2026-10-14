import Link from 'next/link';
import { CONTACT_HREF, InlineLink, Mark } from '@/components/direction-c/primitives';
import { LG_PLAIN as S } from './content';
import './lead-gen.css';
import { Breadcrumb } from '../Breadcrumb';

/**
 * C+ Lead generation (/lead-generation): the approved prototype's page body (proto/direction-c-plus 0a8b611, LeadGenH.tsx), unchanged in markup and
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

function N({ n, className }: { n: number; className?: string }) {
  return (
    <span className={'lg-n' + (className ? ' ' + className : '')} aria-hidden="true">
      {n}
    </span>
  );
}

export function LeadGenBody() {
  return (
    <>
      {/* 1 — hero (ivory): the claim + one enquiry, read closely */}
      <section className="b-hero lg-hero" aria-labelledby="lg-h1">
        <div className="px-wrap b-hero-g h-hero-g lg-hero-g">
          <div>
            <Breadcrumb trail={['What we do']} current={S.crumb} />
            <p className="b-kicker">{S.kicker}</p>
            <h1 id="lg-h1" className="b-h1">
              {S.h1.a} <span className="b-named">{S.h1.b}</span>
            </h1>
            <p className="b-lede">{S.lede}</p>
            <p className="lg-side">{S.side}</p>
            <Action />
          </div>

          <figure className="lg-fig">
            <div className="lg-read">
              <div className="lg-stack">
                <div className="lg-ghost" aria-hidden="true" />
                <div className="lg-card">
                  <p className="lg-card-k">
                    <span className="lg-label">{S.card.label}</span>
                    <N n={1} />
                  </p>
                  <dl className="lg-fields">
                    {S.card.fields.map((f) => (
                      <div key={f.f} className={(f.long ? 'is-long' : '') + (f.optional ? ' is-opt' : '') || undefined}>
                        <dt>{f.f}</dt>
                        <dd>
                          <span className="lg-bar" aria-hidden="true" />
                          <span className="px-sr">blank</span>
                          <N n={f.n} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="lg-stamp">
                    <N n={4} />
                    <span>{S.card.stamp}</span>
                  </p>
                </div>
                <p className="lg-hand">
                  <N n={5} />
                  <span className="lg-hand-t">{S.card.handoff}</span>
                </p>
              </div>
              <ol className="lg-notes" aria-label={S.card.notesLabel}>
                {S.card.notes.map((x) => (
                  <li key={x.n}>
                    <N n={x.n} />
                    <span>
                      <b>{x.t}</b> <span className="lg-notes-d">{x.d}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <figcaption className="px-cap">{S.card.cap}</figcaption>
          </figure>
        </div>
      </section>

      {/* 2 — the situation (ink): two inboxes, two different problems */}
      <section className="b-sec b-ink lg-sit" aria-labelledby="lg-h-sit">
        <div className="px-wrap">
          <p className="b-kicker">{S.sitKicker}</p>
          <h2 id="lg-h-sit" className="b-h2">
            {S.sitH.a} <span className="b-named">{S.sitH.b}</span>
          </h2>
          <div className="lg-pair" data-rv="">
            <div className="lg-box lg-few" data-rv-i="">
              <h3 className="lg-box-h">{S.few.k}</h3>
              <div className="lg-tray" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <p className="lg-box-t">{S.few.t}</p>
            </div>
            <div className="lg-box lg-wrong" data-rv-i="">
              <h3 className="lg-box-h">{S.wrong.k}</h3>
              <ul className="lg-pile" aria-label="What arrives instead">
                {S.wrong.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className="lg-box-t">{S.wrong.t}</p>
            </div>
          </div>
          <p className="px-cap px-cap-ink">{S.sitCap}</p>
          <p className="lg-line">{S.sitLine}</p>
        </div>
      </section>

      {/* 3 — the standard (paper): five steps, the rule, where each enquiry stands, criteria per campaign, no calls */}
      <section className="b-sec b-paper lg-def" aria-labelledby="lg-h-def">
        <div className="px-wrap">
          <p className="b-kicker">{S.defKicker}</p>
          <h2 id="lg-h-def" className="b-h2">
            {S.defH}
          </h2>
          <p className="b-lede lg-def-intro">{S.defIntro}</p>
          <ol className="lg-checks" data-rv="">
            {S.checks.map((c) => (
              <li key={c.n} className="lg-check" data-rv-i="">
                <N n={c.n} />
                <h3 className="lg-check-t">{c.t}</h3>
                <p className="lg-check-d">{c.d}</p>
              </li>
            ))}
          </ol>

          <p className="lg-rule">{S.rule}</p>

          <div className="lg-status">
            <h3 className="lg-label" id="lg-status-k">
              {S.statusK}
            </h3>
            <ul className="lg-status-l" aria-labelledby="lg-status-k">
              {S.statuses.map((x) => (
                <li key={x.k} className={x.on ? 'is-on' : undefined}>
                  <p className="lg-status-k">{x.k}</p>
                  <p className="lg-status-t">{x.t}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg-split">
            <div className="lg-half lg-half-e">
              <p className="lg-label">{S.split.agreed.k}</p>
              <p className="lg-half-t">{S.split.agreed.t}</p>
              <p className="lg-half-d">{S.split.agreed.d}</p>
            </div>
            <div className="lg-half lg-half-b">
              <p className="lg-label">{S.split.not.k}</p>
              <p className="lg-half-t">{S.split.not.t}</p>
              <p className="lg-half-d">{S.split.not.d}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — the boundary (ink): where our accountability stops */}
      <section className="b-sec b-ink lg-bd" aria-labelledby="lg-h-bd">
        <div className="px-wrap">
          <p className="b-kicker">{S.bdKicker}</p>
          <h2 id="lg-h-bd" className="b-h2">
            {S.bdH.a} <span className="b-named">{S.bdH.b}</span>
          </h2>
          <figure className="lg-rail">
            <div className="lg-rail-ours">
              <p className="lg-label">{S.rail.ours}</p>
              <ol className="lg-rail-t">
                {S.rail.oursT.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
            </div>
            <div className="lg-rail-mark">
              <span className="lg-rail-pin" aria-hidden="true" />
              <p className="lg-rail-m">{S.rail.mark}</p>
            </div>
            <div className="lg-rail-yours">
              <p className="lg-label">{S.rail.yours}</p>
              <ol className="lg-rail-t">
                {S.rail.yoursT.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
            </div>
          </figure>
          <div className="lg-bd-g">
            <ul className="lg-bd-rows">
              {S.bdRows.map((r) => (
                <li key={r.b}>
                  <p className="lg-bd-b">{r.b}</p>
                  <p className="lg-bd-t">{r.t}</p>
                </li>
              ))}
            </ul>
            <div className="lg-np">
              <p className="lg-label" id="lg-np-k">
                {S.notPromisedK}
              </p>
              <ul aria-labelledby="lg-np-k">
                {S.notPromised.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className="b-tlink lg-link-ink">
                <Link href={S.bdLink.href}>{S.bdLink.label} →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — questions (paper): native disclosures, closed on load */}
      <section className="b-sec b-paper lg-q" aria-labelledby="lg-h-qs">
        <div className="px-wrap lg-q-g">
          <div>
            <p className="b-kicker">{S.qKicker}</p>
            <h2 id="lg-h-qs" className="b-h2">
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
            <p className="lg-related">
              {S.related.a}{' '}
              {S.related.links.map((l, i) => (
                <span key={l.href}>
                  {i ? ' · ' : ''}
                  <InlineLink href={l.href}>{l.label}</InlineLink>
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* close: the shared close's markup and classes; one CTA */}
      <section className="b-close" aria-labelledby="lg-h-close">
        <div className="px-wrap b-close-in">
          <div>
            <p className="b-kicker lg-close-k">{S.close.label}</p>
            <h2 id="lg-h-close" className="b-h2">
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
