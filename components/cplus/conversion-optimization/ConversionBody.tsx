import Link from 'next/link';
import { ActionPair } from '@/components/direction-c/primitives';
import { CO, HOME } from './content';
import { FourPlaces, HeroStory, MethodJourney, OwnForm, WhatHappensNext } from './Journeys';
import '../../paid-advertising/paid-advertising.css';
import '../../b2/b2.css';
import './conversion.css';

/**
 * /conversion-optimization as five THE RESOLVE scenes (Stage 4 Batch 2D; DEC-097, on the DEC-055 content): a visitor
 * arrives and something stops them (hero), the four places a customer can be lost, one method in five steps (find,
 * plan, improve, measure, review), our own enquiry form as first-hand evidence, and the next business action. Every
 * scene is built to fit one screen. The copy is the approved copy apart from the duplicates DEC-097 removes. Nothing
 * here claims a lift, a benchmark, a result or routine A/B testing. Motion: five once-only sequences at 1.5 seconds a
 * step (DEC-055 CO-D11); every scene is complete without JavaScript or with reduced motion.
 */

function Hx({ h }: { h: { a: string; b: string } }) {
  return (
    <>
      {h.a} <span className="b2-em">{h.b}</span>
    </>
  );
}

export function ConversionBody() {
  return (
    <div className="pa b2 co">
      {/* 1, Ink Deep, high: the unchanged H1, and a visitor who arrives, is stopped, and leaves */}
      <section className="co-hero co-dark" aria-labelledby="co-h1">
        <div className="pa-wrap co-hero-g">
          <div className="co-hero-tx">
            <nav aria-label="Breadcrumb" className="co-crumb">
              <ol>
                <li>
                  <Link href="/">Home</Link>{' '}
                </li>
                <li>
                  <span aria-hidden="true">/</span> What we do{' '}
                </li>
                <li>
                  <span aria-hidden="true">/</span> <span aria-current="page">{CO.crumb}</span>
                </li>
              </ol>
            </nav>
            <h1 id="co-h1">
              <Hx h={CO.h1} />
            </h1>
            <p className="b2-lede">{CO.lede}</p>
            <ActionPair primaryLabel={HOME.hero.primary} />
          </div>
          <figure className="co-hero-fig">
            <HeroStory />
            <figcaption className="px-cap co-cap">{CO.story.caption}</figcaption>
          </figure>
        </div>
      </section>

      {/* 2, ground, medium: the four places a customer can be lost, then the verdict that answers the speech bubble */}
      <section className="co-act co-ground co-route-sec" aria-labelledby="co-h-four">
        <div className="pa-wrap">
          <div className="co-route-head">
            <div>
              <p className="pa-eyebrow co-k">{CO.fourKicker}</p>
              <h2 id="co-h-four" className="b2-h2">
                <Hx h={CO.fourH} />
              </h2>
            </div>
            <p className="co-ask">
              <span className="co-ask-k">{CO.askK}</span>
              {CO.ask}
            </p>
          </div>
          <FourPlaces />
          <p className="co-start">
            <Link href={CO.start.href} className="co-start-a">
              {CO.start.label} <span aria-hidden="true">→</span>
            </Link>{' '}
            <span>{CO.start.note}</span>
          </p>
        </div>
      </section>

      {/* 3, paper, high: one method in five steps. The two diagnosis steps are ink; improve, measure and review are the
          burnt run, so the measurement is the picture (DEC-055 CO-D06; DEC-097). No routine A/B testing is described. */}
      <section className="co-act co-paper co-meas-sec" aria-labelledby="co-h-meas">
        <div className="pa-wrap">
          <p className="pa-eyebrow co-k">{CO.measKicker}</p>
          <h2 id="co-h-meas" className="b2-h2">
            <Hx h={CO.measH} />
          </h2>
          <p className="co-meas-body">{CO.measBody}</p>
          <MethodJourney />
          <p className="co-meas-cap">{CO.measCaption}</p>
          <p className="co-nobench">
            {CO.noBench} <Link href={CO.methodLink.href}>{CO.methodLink.label}</Link>
          </p>
        </div>
      </section>

      {/* 4, Ink Deep, high: our own enquiry form, first-hand, told in four beats */}
      <section className="co-act co-dark co-proof-sec" aria-labelledby="co-h-own">
        <div className="pa-wrap">
          <p className="pa-eyebrow co-k">{CO.proofKicker}</p>
          <h2 id="co-h-own" className="b2-h2">
            <Hx h={CO.proofH} />
          </h2>
          <OwnForm />
        </div>
      </section>

      {/* 5, burnt, high: the next business action; "what happens next" stays, quietly */}
      <section className="b2-band co-band" aria-labelledby="b-close-h">
        <div className="pa-wrap">
          <h2 id="b-close-h">{CO.close.h}</h2>
          <p>{CO.close.body}</p>
          <ActionPair primaryLabel={HOME.hero.primary} />
          <p className="co-next-k">{CO.close.nextK}</p>
          <WhatHappensNext />
        </div>
      </section>
    </div>
  );
}
