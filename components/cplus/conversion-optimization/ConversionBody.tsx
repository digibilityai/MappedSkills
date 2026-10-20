import Link from 'next/link';
import { ActionPair, InlineLink } from '@/components/direction-c/primitives';
import { CO, HOME } from './content';
import { FourPlaces, HeroStory, HowWeWork, ImproveMeasureReview, OwnForm, WhatHappensNext } from './Journeys';
import './conversion.css';
import { Breadcrumb } from '../Breadcrumb';

/**
 * C+ Conversion Optimization (/conversion-optimization): the owner-approved G1 design (docs/conversion-redesign/g1;
 * DEC-055). Six sections: hero, four places, how we work, improve/measure/review, our own form, close. Markup and
 * classes follow the mockup; copy lives in ./content; the animated stories are client components (./Journeys) built on
 * the /ai-seo sequencer. Every section is complete without JavaScript.
 */

function Hx({ h }: { h: { a: string; b: string } }) {
  return (
    <>
      {h.a} <span className="b-named">{h.b}</span>
    </>
  );
}

export function ConversionBody() {
  return (
    <>
      {/* 1 — hero (ground): the unchanged H1, and the problem told as three tiles */}
      <section className="b-hero co-hero" aria-labelledby="co-h1">
        <div className="px-wrap b-hero-g co-hero-g">
          <div className="co-hero-tx">
            <Breadcrumb trail={['What we do']} current={CO.crumb} />
            <h1 id="co-h1" className="b-h1">
              <Hx h={CO.h1} />
            </h1>
            <p className="b-lede">{CO.lede}</p>
            <ActionPair primaryLabel={HOME.hero.primary} />
          </div>
          <figure className="co-hero-fig">
            <HeroStory />
            <figcaption className="px-cap co-cap">{CO.story.caption}</figcaption>
          </figure>
        </div>
      </section>

      {/* 2 — four places (paper): the route, then the verdict that answers the speech bubble */}
      <section className="b-sec b-paper co-route-sec" aria-labelledby="co-h-four">
        <div className="px-wrap">
          <div className="co-route-head">
            <div>
              <p className="b-kicker">{CO.fourKicker}</p>
              <h2 id="co-h-four" className="b-h2">
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

      {/* 3 — how we work (ground): four one-line steps and the picture each one makes */}
      <section className="b-sec co-work-sec" aria-labelledby="co-h-work">
        <div className="px-wrap">
          <p className="b-kicker">{CO.workKicker}</p>
          <h2 id="co-h-work" className="b-h2">
            <Hx h={CO.workH} />
          </h2>
          <HowWeWork />
        </div>
      </section>

      {/* 4 — improve, measure, review (paper): CO-D06 as revised by the owner; no routine A/B testing is described */}
      <section className="b-sec b-paper co-meas-sec" aria-labelledby="co-h-meas">
        <div className="px-wrap">
          <p className="b-kicker">{CO.measKicker}</p>
          <h2 id="co-h-meas" className="b-h2">
            <Hx h={CO.measH} />
          </h2>
          <p className="co-meas-body">{CO.measBody}</p>
          <ImproveMeasureReview />
          <p className="co-nobench">
            {CO.noBench} <InlineLink href={CO.methodLink.href}>{CO.methodLink.label}</InlineLink>
          </p>
        </div>
      </section>

      {/* 5 — our own form (ink): the first-hand evidence, told in four beats */}
      <section className="b-sec b-ink co-proof-sec" aria-labelledby="co-h-own">
        <div className="px-wrap">
          <p className="b-kicker">{CO.proofKicker}</p>
          <h2 id="co-h-own" className="b-h2">
            <Hx h={CO.proofH} />
          </h2>
          <OwnForm />
        </div>
      </section>

      {/* 6 — close (tangerine): the shared look, the same two destinations, and what happens next */}
      <section className="b-close co-close" aria-labelledby="b-close-h">
        <div className="px-wrap b-close-in">
          <div>
            <h2 id="b-close-h" className="b-h2">
              {CO.close.h}
            </h2>
            <p className="b-lede">{CO.close.body}</p>
          </div>
          <ActionPair primaryLabel={HOME.hero.primary} />
        </div>
        <div className="px-wrap">
          <p className="co-next-k">{CO.close.nextK}</p>
          <WhatHappensNext />
        </div>
      </section>
    </>
  );
}
