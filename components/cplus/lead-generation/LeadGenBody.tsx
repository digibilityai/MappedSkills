import Link from 'next/link';
import { ActionPair } from '@/components/direction-c/primitives';
import { HwSequence } from '../../b2/HwSequence';
import { LG } from './content';
import { HeroJourney, NextJourney, PathJourney } from './Journeys';
import '../../paid-advertising/paid-advertising.css';
import '../../b2/b2.css';
import './lead-gen.css';

/**
 * /lead-generation as six THE RESOLVE scenes (Stage 4 Batch 2C; DEC-095, on the DEC-057 content): the doubt (hero), the
 * problem (too few against the wrong ones), the journey (from an ad to an enquiry), who does what (and what is not
 * promised), expectations (the three questions) and the next business action. Every scene is built to fit one screen.
 * The approved copy is unchanged apart from the duplicates DEC-095 removes. Operating model (OWNER REQUIREMENT):
 * enquiries go directly to the client's own form, CRM or WhatsApp; MappedSkills does not manually review, approve or
 * release individual client enquiries. Nothing here promises a number, a cost or a quality of enquiry.
 * Motion: three sequenced journeys at about 2 seconds a step (DEC-057) and one once-only pile in the problem scene;
 * every scene is complete without JavaScript or with reduced motion.
 */

function Hx({ h }: { h: { a: string; b: string } }) {
  return (
    <>
      {h.a} <span className="b2-em">{h.b}</span>
    </>
  );
}

export function LeadGenBody() {
  return (
    <div className="pa b2 lg">
      <HwSequence scope=".lg" />

      {/* 1, Ink Deep, high: the doubt. The unchanged H1, one example enquiry, and the question every owner asks of it */}
      <section className="lg-hero lg-dark" aria-labelledby="lg-h1">
        <div className="pa-wrap lg-hero-g">
          <div className="lg-hero-tx">
            <nav aria-label="Breadcrumb" className="lg-crumb">
              <ol>
                <li>
                  <Link href="/">Home</Link>{' '}
                </li>
                <li>
                  <span aria-hidden="true">/</span> What we do{' '}
                </li>
                <li>
                  <span aria-hidden="true">/</span> <span aria-current="page">{LG.crumb}</span>
                </li>
              </ol>
            </nav>
            <p className="pa-eyebrow">{LG.kicker}</p>
            <h1 id="lg-h1">
              <Hx h={LG.h1} />
            </h1>
            <p className="b2-lede">{LG.lede}</p>
            <ActionPair primaryLabel={LG.close.primary} />
          </div>
          <HeroJourney />
        </div>
      </section>

      {/* 2, ground, high: quantity against quality. One enquiry on one side, a pile of the wrong ones on the other. */}
      <section className="lg-act lg-ground lg-prob" aria-labelledby="lg-h-prob">
        <div className="pa-wrap">
          <p className="pa-eyebrow lg-k">{LG.probKicker}</p>
          <h2 id="lg-h-prob" className="b2-h2">
            <Hx h={LG.probH} />
          </h2>
          <div className="lg-pair">
            <div className="lx-tile lx-tile-cream lx-box lx-few">
              <p className="lx-tl">{LG.few.k}</p>
              <div className="lx-inbox" aria-hidden="true">
                <p className="lx-inbox-h">{LG.few.inbox}</p>
                <i className="lx-row lx-row-real">
                  <b />
                  {LG.few.one}
                </i>
                <i className="lx-row lx-row-empty" />
                <i className="lx-row lx-row-empty" />
              </div>
              <h3 className="lx-box-t">{LG.few.t}</h3>
              <p className="lx-box-d">{LG.few.d}</p>
            </div>
            <div className="lx-tile lx-tile-ink lx-box lx-wrong">
              <p className="lx-tl">{LG.wrong.k}</p>
              <ul className="lx-pile" aria-label={LG.wrong.tagsLabel} data-hw-seq>
                {LG.wrong.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <h3 className="lx-box-t">{LG.wrong.t}</h3>
              <p className="lx-box-d">{LG.wrong.d}</p>
            </div>
          </div>
          <p className="lx-verdict">
            {LG.probLine.a} <span>{LG.probLine.b}</span>
          </p>
        </div>
      </section>

      {/* 3, Ink Deep, high: the journey from an advert to an enquiry, where a potential customer is gained or lost.
          Four stops on one path; the two operating statements kept from the merged section sit under it. */}
      <section className="lg-act lg-dark lg-do" aria-labelledby="lg-h-do">
        <div className="pa-wrap">
          <p className="pa-eyebrow lg-k">{LG.doKicker}</p>
          <h2 id="lg-h-do" className="b2-h2">
            <Hx h={LG.doH} />
          </h2>
          <PathJourney />
          <div className="lx-facts">
            {LG.facts.map((f) => (
              <p key={f.b}>
                <b>{f.b}</b> {f.t}
              </p>
            ))}
          </div>
          <p className="px-cap lx-cap">{LG.doCap}</p>
        </div>
      </section>

      {/* 4, paper, low: who does what. Measurement is Option A (DEC-095): the monthly report and the starting point sit here. */}
      <section className="lg-act lg-paper lg-bd" aria-labelledby="lg-h-bd">
        <div className="pa-wrap">
          <p className="pa-eyebrow lg-k">{LG.bdKicker}</p>
          <h2 id="lg-h-bd" className="b2-h2">
            <Hx h={LG.bdH} />
          </h2>
          <figure className="lx-relay">
            <div className="lx-tile lx-tile-cream lx-relay-ours">
              <p className="lx-tl">{LG.relay.ours}</p>
              <ol className="lx-relay-l">
                {LG.relay.oursT.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
            </div>
            <div className="lx-relay-mark">
              <span className="lx-relay-pin" aria-hidden="true" />
              <p>{LG.relay.mark}</p>
            </div>
            <div className="lx-tile lx-tile-ink lx-dash lx-relay-yours">
              <p className="lx-tl">{LG.relay.yours}</p>
              <ol className="lx-relay-l">
                {LG.relay.yoursT.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
            </div>
          </figure>
          <div className="lx-bd-g">
            <div className="lx-np">
              <p className="lx-tl" id="lx-np-k">
                {LG.notPromisedK}
              </p>
              <ul className="lx-np-l" aria-labelledby="lx-np-k">
                {LG.notPromised.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className="lx-np-why">{LG.notPromisedWhy}</p>
            </div>
            <div className="lx-get">
              <p className="lx-tl">{LG.get.k}</p>
              <p className="lx-get-t">{LG.get.t}</p>
              <p className="lx-get-s">{LG.get.start}</p>
              <p className="lx-get-a">
                <Link href={LG.bdLink.href}>{LG.bdLink.label} →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5, ground, low: the three existing questions, closed on load */}
      <section className="lg-act lg-ground lg-q" aria-labelledby="lg-h-qs">
        <div className="pa-wrap lg-q-g">
          <div>
            <p className="pa-eyebrow lg-k">{LG.qKicker}</p>
            <h2 id="lg-h-qs" className="b2-h2">
              {LG.qH}
            </h2>
          </div>
          <div>
            <ul className="fq-list">
              {LG.questions.map((qa) => (
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
              {LG.related.a}{' '}
              {LG.related.links.map((l, i) => (
                <span key={l.href}>
                  {i ? ' · ' : ''}
                  <Link href={l.href}>{l.label}</Link>
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* 6, burnt, high: the next business action. One decision first; the five-step "what happens next" stays, quietly. */}
      <section className="b2-band lg-band" aria-labelledby="lg-h-close">
        <div className="pa-wrap">
          <p className="lg-band-k">{LG.close.kicker}</p>
          <h2 id="lg-h-close">
            {LG.close.h.a} <span className="lx-close-2">{LG.close.h.b}</span>
          </h2>
          <p>{LG.close.body}</p>
          <ActionPair primaryLabel={LG.close.primary} />
          <h3 className="lx-next-k" id="lx-next-k">
            {LG.close.nextK}
          </h3>
          <NextJourney />
        </div>
      </section>
    </div>
  );
}
