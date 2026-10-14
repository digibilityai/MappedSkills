import Link from 'next/link';
import { BOOKING_HREF, CONTACT_HREF, Mark } from '@/components/direction-c/primitives';
import { ABOUT_PLAIN as A } from './content';
import './about.css';
import { Icon } from '../Icons';
import { AccountFigure } from './AccountFigure';
import { Breadcrumb } from '../Breadcrumb';

/**
 * C+ About (/about): the approved prototype's page body (proto/direction-c-plus 0a8b611, AboutH.tsx `About`),
 * unchanged in markup and copy. Production changes only: the breadcrumb's Home link, the method links and the CTAs
 * point at the live routes (`/`, `/how-it-works`, CONTACT_HREF and BOOKING_HREF) instead of prototype paths.
 * Absent by owner decision, and not replaced: location, size, founding year, legal entity, people, history, logos,
 * testimonials, awards, team imagery. No entity JSON-LD.
 */

export function AboutBody() {
  return (
    <>
      {/* 1 — hero (ivory): the accountability problem, at once */}
      <section className="b-hero ab-hero" aria-labelledby="ab-h1">
        <div className="px-wrap b-hero-g ab-hero-g">
          <div>
            <Breadcrumb current={A.crumb} />
            <h1 id="ab-h1" className="b-h1 ab-h1">
              {A.h1.a} <span className="b-named">{A.h1.b}</span>
            </h1>
            <p className="b-lede">{A.lede}</p>
          </div>
          <figure className="ab-slips-fig">
            <ul className="ab-slips">
              {A.slips.map((s) => (
                <li key={s.who} className={'ab-slip is-' + s.state}>
                  <span className="ab-slip-who">{s.who}</span>
                  <span className="ab-slip-what">
                    <span className="ab-slip-m" aria-hidden="true">
                      {s.state === 'ok' ? <Icon name="check" size={16} /> : '?'}
                    </span>
                    {s.what}
                  </span>
                </li>
              ))}
            </ul>
            <figcaption className="px-cap">{A.slipsCaption}</figcaption>
          </figure>
        </div>
      </section>

      {/* 2 — why we work this way (ink) */}
      <section className="b-sec b-ink ab-why" aria-labelledby="ab-h-why">
        <div className="px-wrap ab-why-g">
          <div>
            <p className="b-kicker">{A.why.kicker}</p>
            <h2 id="ab-h-why" className="b-h2 ab-why-h">
              {A.why.h.a} <span className="b-named">{A.why.h.b}</span>
            </h2>
          </div>
          <div className="ab-why-b">
            {A.why.body.map((t) => (
              <p key={t}>{t}</p>
            ))}
            <p className="ab-belief">{A.why.belief}</p>
            <p className="ab-skills-l">{A.why.skillsLead}</p>
            <ol className="ab-skills">
              {A.why.skills.map((s) => (
                <li key={s.t}>
                  <span className="ab-skill-t">{s.t}</span>
                  <span className="ab-skill-d">{s.d}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 3 — what we take responsibility for (paper): the boundary, then what is not promised */}
      <section className="b-sec b-paper ab-hold" aria-labelledby="ab-h-hold">
        <div className="px-wrap">
          <p className="b-kicker">{A.hold.kicker}</p>
          <h2 id="ab-h-hold" className="b-h2">
            {A.hold.h.a} <span className="b-named">{A.hold.h.b}</span>
          </h2>
          <p className="b-lede ab-define">{A.hold.define}</p>
          <div className="ab-bound">
            <div className="ab-ours">
              <h3 className="ab-bound-t">{A.hold.ours.t}</h3>
              <p>{A.hold.ours.d}</p>
            </div>
            <div className="ab-line" aria-hidden="true">
              <span>{A.hold.line}</span>
            </div>
            <div className="ab-yours">
              <h3 className="ab-bound-t">{A.hold.yours.t}</h3>
              <p>{A.hold.yours.d}</p>
            </div>
          </div>
          <div className="ab-not">
            <h3 className="ab-not-h">{A.hold.notH}</h3>
            <ul>
              {A.hold.not.map((n) => (
                <li key={n}>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
            <p className="b-body ab-not-b">{A.hold.notBody}</p>
          </div>
        </div>
      </section>

      {/* 4 — the signature figure (ivory) */}
      <section className="b-sec ab-figsec" aria-labelledby="ab-h-fig">
        <div className="px-wrap">
          <p className="b-kicker">{A.fig.kicker}</p>
          <h2 id="ab-h-fig" className="b-h2">
            {A.fig.h}
          </h2>
          <p className="b-lede ab-fig-intro">{A.fig.intro}</p>
          <figure className="ab-figure" aria-labelledby="ab-h-fig">
            <AccountFigure />
            <figcaption className="px-cap">{A.fig.caption}</figcaption>
          </figure>
        </div>
      </section>

      {/* 5 — how we work (ink): the confirmed sequence, compact */}
      <section className="b-sec b-ink ab-how" aria-labelledby="ab-h-how">
        <div className="px-wrap">
          <p className="b-kicker">{A.how.kicker}</p>
          <h2 id="ab-h-how" className="b-h2">
            {A.how.h.a} <span className="b-named">{A.how.h.b}</span>
          </h2>
          <ol className="ab-steps">
            {A.how.steps.map((s, i) => (
              <li key={s} className={i === A.how.steps.length - 1 ? 'is-last' : undefined}>
                <span className="ab-step-n" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="ab-step-t">{s}</span>
              </li>
            ))}
          </ol>
          <div className="ab-how-g">
            <p>
              <Mark state="owned" /> {A.how.work}
            </p>
            <p>
              <Mark state="owned" /> {A.how.monthly}
            </p>
          </div>
          <p className="ab-link-ink">
            <Link href="/how-it-works">{A.how.link} →</Link>
          </p>
        </div>
      </section>

      {/* 6 — what you can check (paper): the method + a compact, fully scoped self-measurement */}
      <section className="b-sec b-paper ab-check" aria-labelledby="ab-h-check">
        <div className="px-wrap">
          <p className="b-kicker">{A.check.kicker}</p>
          <h2 id="ab-h-check" className="b-h2">
            {A.check.h.a} <span className="b-named">{A.check.h.b}</span>
          </h2>
          <div className="ab-check-g">
            <div className="ab-ev">
              <h3 className="ab-ev-t">{A.check.method.t}</h3>
              <p className="ab-ev-d">{A.check.method.d}</p>
              <p className="ab-ev-l">
                <Link href="/how-it-works">{A.check.method.link} →</Link>
              </p>
            </div>
            <div className="ab-ev ab-ev-self">
              <h3 className="ab-ev-t">{A.check.self.t}</h3>
              <p className="ab-self-fig">
                <span className="ab-self-n">{A.check.self.fig}</span> <span className="ab-self-of">{A.check.self.of}</span>
                <span className="ab-self-l">{A.check.self.figLabel}</span>
              </p>
              <p className="ab-ev-d">{A.check.self.d}</p>
              <p className="ab-limits">{A.check.self.limits}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — who this is for, and who it isn't (ivory) */}
      <section className="b-sec ab-fit" aria-labelledby="ab-h-fit">
        <div className="px-wrap">
          <p className="b-kicker">{A.fit.kicker}</p>
          <h2 id="ab-h-fit" className="b-h2">
            {A.fit.h.a} <span className="b-named">{A.fit.h.b}</span>
          </h2>
          <div className="ab-fit-g">
            <div className="ab-fit-yes">
              <h3 className="ab-fit-t">{A.fit.forH}</h3>
              <ul>
                {A.fit.for.map((t) => (
                  <li key={t}>
                    <Mark state="named" /> <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ab-fit-no">
              <h3 className="ab-fit-t">{A.fit.notH}</h3>
              <ul>
                {A.fit.not.map((t) => (
                  <li key={t}>
                    <Mark state="open" /> <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8 — close (tangerine): the shared close's markup and classes, with the live routes */}
      <section className="b-close" aria-labelledby="ab-h-close">
        <div className="px-wrap b-close-in">
          <div>
            <p className="b-kicker ab-close-k">{A.close.label}</p>
            <h2 id="ab-h-close" className="b-h2">
              {A.close.h}
            </h2>
            <p className="b-lede">{A.close.body}</p>
          </div>
          <div className="dc-actions">
            <Link href={CONTACT_HREF} className="dc-btn dc-btn-primary">
              <Mark />
              {A.close.primary}
            </Link>
            <Link href={BOOKING_HREF} className="dc-btn dc-btn-secondary">
              <Mark />
              {A.close.secondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
