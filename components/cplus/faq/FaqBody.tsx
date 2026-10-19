import Link from 'next/link';
import { ActionPair } from '@/components/direction-c/primitives';
import { Breadcrumb } from '../Breadcrumb';
import { FAQ as F } from './content';
import { FAQ_GROUPS } from './faqData';
import { FaqTools } from './FaqTools';
import './faq.css';

/**
 * C+ FAQ (/faq): the owner-approved G1 design (DEC-063; docs/faq-redesign/g1/mockup/) as a server component; the only
 * client code is ./FaqTools ("Open all answers" and opening a question from the address). Four sections: hero with five
 * category links; the five categories (native <details>, closed on load, direct answer first); how working together
 * starts (three stages, then what is standard and what is agreed); close. The route emits its FAQPage from the same
 * data (./faqData.ts). Live question ids and the five live group ids are kept as anchors.
 */

const QTOTAL = FAQ_GROUPS.reduce((n, g) => n + g.items.length, 0);
const num = (i: number) => String(i + 1).padStart(2, '0');

function Glyph({ name }: { name: 'msg' | 'look' | 'ok' }) {
  return (
    <svg className="faq-gl" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {name === 'msg' && (
        <>
          <path d="M4 5h16v11H9l-5 4z" />
          <path d="M8 9h8M8 12h5" />
        </>
      )}
      {name === 'look' && (
        <>
          <circle cx="10.5" cy="10.5" r="6" />
          <path d="m15 15 5 5" />
        </>
      )}
      {name === 'ok' && (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="m8 12.3 2.8 2.8L16.2 9.6" />
        </>
      )}
    </svg>
  );
}

export function FaqBody() {
  const s = F.start;
  const c = F.close;
  return (
    <>
      {/* A: hero (ground) */}
      <section className="b-hero faq-hero" aria-labelledby="faq-h1">
        <div className="px-wrap faq-hero-g">
          <Breadcrumb current={F.crumb} />
          <p className="b-kicker">{F.kicker}</p>
          <h1 id="faq-h1" className="b-h1 faq-h1">
            <span>{F.h1.a}</span> <span className="b-named">{F.h1.b}</span>
          </h1>
          <p className="b-lede faq-lede">{F.lede}</p>

          <nav className="faq-cats" aria-labelledby="faq-cats-l">
            <p id="faq-cats-l" className="faq-cats-l">
              {F.jump}
            </p>
            <ul>
              {FAQ_GROUPS.map((g) => (
                <li key={g.id}>
                  <a href={'#' + g.id}>
                    <span className="faq-cat-t">{g.title}</span>
                    <span className="faq-cat-n">{g.items.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* B: the five categories (paper) */}
      <div className="b-paper faq-body" id="faq-body">
        <div className="px-wrap">
          <FaqTools scope="#faq-body" total={QTOTAL} />
          {FAQ_GROUPS.map((g, gi) => (
            <section key={g.id} className="faq-grp" aria-labelledby={g.id}>
              <span id={g.legacyId} className="faq-legacy" aria-hidden="true" />
              <div className="faq-grp-head">
                <span className="faq-grp-n" aria-hidden="true">
                  {num(gi)}
                </span>
                <h2 id={g.id} className="faq-grp-h">
                  {g.title}
                </h2>
                <p className="faq-grp-p">{g.line}</p>
              </div>
              <ul className="faq-list">
                {g.items.map((qa) => (
                  <li key={qa.id}>
                    <details id={qa.id} className="faq-d">
                      <summary>
                        <span className="faq-q">{qa.q}</span>
                        <span className="faq-pm" aria-hidden="true" />
                      </summary>
                      <div className="faq-a">
                        <p className="faq-direct">{qa.direct}</p>
                        {qa.rows && (
                          <dl className="faq-dl">
                            {qa.rows.map((r) => (
                              <div key={r.t}>
                                <dt>{r.t}</dt>
                                <dd>{r.d}</dd>
                              </div>
                            ))}
                          </dl>
                        )}
                        {qa.body?.map((p) => <p key={p}>{p}</p>)}
                        {qa.more && (
                          <p className="faq-more">
                            <Link href={qa.more.href}>{qa.more.label}</Link>
                          </p>
                        )}
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      {/* C: how working together starts (ink). The call is optional; reporting is standard, review calls are agreed. */}
      <section className="b-sec b-ink faq-start" aria-labelledby="faq-h-start">
        <div className="px-wrap">
          <div className="faq-start-head">
            <div>
              <p className="b-kicker">{s.kicker}</p>
              <h2 id="faq-h-start" className="b-h2">
                {s.h.a} <span className="b-named">{s.h.b}</span>
              </h2>
            </div>
            <p className="faq-start-l">{s.line}</p>
          </div>

          <ol className="faq-steps">
            {s.steps.map((st, i) => (
              <li key={st.t} className={'faq-s' + (i === s.steps.length - 1 ? ' is-you' : '')}>
                <span className="faq-s-i">
                  <Glyph name={st.icon} />
                </span>
                <span className="faq-s-n">Step {i + 1}</span>
                <h3 className="faq-s-t">{st.t}</h3>
                <p className="faq-s-p">{st.d}</p>
              </li>
            ))}
          </ol>

          <div className="faq-after" role="group" aria-label={s.after.label}>
            <p className="faq-after-k">{s.after.label}</p>
            <div className="faq-after-a">
              <b>{s.after.report.t}</b>
              <span>{s.after.report.tag}</span>
            </div>
            <div className="faq-after-b">
              <b>{s.after.calls.t}</b>
              <span>{s.after.calls.tag}</span>
            </div>
            <Link className="faq-after-link" href="/how-it-works">
              {s.after.link} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* D: close (shared tangerine close) */}
      <section className="b-close faq-close" aria-labelledby="b-close-h">
        <div className="px-wrap">
          <div className="b-close-in">
            <div>
              <p className="b-kicker faq-close-k">{c.kicker}</p>
              <h2 id="b-close-h" className="b-h2">
                {c.h.a} <span className="faq-close-2">{c.h.b}</span>
              </h2>
              <p className="b-lede">{c.body}</p>
            </div>
            <ActionPair primaryLabel={c.primary} secondaryLabel={c.secondary} />
          </div>
        </div>
      </section>
    </>
  );
}
