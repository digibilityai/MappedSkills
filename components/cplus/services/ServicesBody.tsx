import Link from 'next/link';
import { ActionPair } from '@/components/direction-c/primitives';
import { Breadcrumb } from '../Breadcrumb';
import { SV } from './content';
import { Glyph } from './icons';
import { EnquiryJourney, ProblemPicker } from './Interactive';
import './services.css';

/**
 * C+ Services (/services): the owner-approved G1 design (DEC-059; docs/services-redesign/g1/mockup/), as a server
 * component. Five sections: hero with the route drawn still, where to start (problem selector and the six services),
 * one enquiry start to finish (the fictional kitchen fitter), scope, close. Only ProblemPicker and EnquiryJourney
 * (./Interactive) are client components. The close uses the shared close's classes and ActionPair (as /how-it-works and
 * /lead-generation do), so ../Close is unchanged.
 */
export function ServicesBody() {
  const r = SV.route;
  const p = SV.pick;
  const j = SV.journey;
  const s = SV.scope;
  const c = SV.close;
  return (
    <>
      {/* 1: hero (ground). On wide screens each route station sits level with its headline line. */}
      <section className="b-hero sx-hero" aria-labelledby="sv-h1">
        <div className="px-wrap b-hero-g sx-hero-g">
          <div className="sx-hero-tx">
            <Breadcrumb current={SV.crumb} />
            <p className="b-kicker">{SV.kicker}</p>
            <h1 id="sv-h1" className="b-h1 sx-h1">
              <span>{SV.h1[0]}</span> <span>{SV.h1[1]}</span> <span className="b-named">{SV.h1[2]}</span>
            </h1>
            <p className="b-lede">{SV.lede}</p>
            <ActionPair primaryLabel={SV.primary} />
          </div>

          <figure className="sx-hero-fig" aria-label={r.label}>
            <div className="sx-rc">
              <ol className="sx-route">
                <li className="sx-route-o">
                  <span className="sx-node" aria-hidden="true">
                    <Glyph name="person" />
                  </span>
                  <p>
                    <b>{r.start}</b>
                  </p>
                </li>
                {r.stations.map((st) => (
                  <li key={st.k}>
                    <span className="sx-node" aria-hidden="true">
                      <Glyph name={st.icon} />
                    </span>
                    <p>
                      <span className="sx-route-k">{st.k}</span>
                      <b>{st.t}</b>
                    </p>
                  </li>
                ))}
              </ol>
              <span className="sx-tag sx-rc-tag">{r.tag}</span>
            </div>
          </figure>
        </div>
      </section>

      {/* 2: where to start (paper): the problem selector and the six services in one section */}
      <section className="b-sec b-paper sx-pick" aria-labelledby="sv-h-pick">
        <div className="px-wrap">
          <div className="sx-pick-head">
            <div>
              <p className="b-kicker">{p.kicker}</p>
              <h2 id="sv-h-pick" className="b-h2">
                {p.h.a} <span className="b-named">{p.h.b}</span>
              </h2>
            </div>
            <p className="sx-pick-l">{p.lede}</p>
          </div>
          <ProblemPicker />
        </div>
      </section>

      {/* 3: one enquiry, start to finish (ink): fictional example, played once */}
      <section className="b-sec b-ink sx-jr" aria-labelledby="sv-h-jr">
        <div className="px-wrap">
          <div className="sx-jr-head">
            <div>
              <p className="b-kicker">{j.kicker}</p>
              <h2 id="sv-h-jr" className="b-h2">
                {j.h.a} <span className="b-named">{j.h.b}</span>
              </h2>
            </div>
            <p className="sx-jr-l">{j.lede}</p>
          </div>
          <EnquiryJourney />
        </div>
      </section>

      {/* 4: scope (ground) */}
      <section className="b-sec sx-scope" aria-labelledby="sv-h-scope">
        <div className="px-wrap">
          <h2 id="sv-h-scope" className="sx-scope-h">
            {s.h.a} <span className="b-named">{s.h.b}</span>
          </h2>
          <div className="sx-scope-g">
            {s.cols.map((col) => (
              <div key={col.t} className="sx-sc">
                <h3 className="sx-sc-t">{col.t}</h3>
                <p>{col.d}</p>
              </div>
            ))}
            <div className="sx-sc sx-sc-not">
              <h3 className="sx-sc-t">{s.notT}</h3>
              <ul className="sx-not">
                {s.not.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="b-tlink sx-scope-l">
            <Link href={s.price.href}>
              {s.price.label} <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>

      {/* close (tangerine): contact primary, booking secondary; what happens next */}
      <section className="b-close sx-close" aria-labelledby="b-close-h">
        <div className="px-wrap">
          <div className="b-close-in">
            <div>
              <p className="b-kicker sx-close-k">{c.kicker}</p>
              <h2 id="b-close-h" className="b-h2">
                {c.h.a} <span className="sx-close-2">{c.h.b}</span>
              </h2>
              <p className="b-lede">{c.body}</p>
            </div>
            <ActionPair primaryLabel={SV.primary} />
          </div>
          <div className="sx-next">
            <p className="sx-next-k">{c.nextK}</p>
            <ol>
              {c.next.map((t, i) => (
                <li key={t}>
                  <b>{i + 1}</b>
                  {t}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
