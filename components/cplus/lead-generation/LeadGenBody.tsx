import Link from 'next/link';
import { ActionPair, InlineLink } from '@/components/direction-c/primitives';
import { LG } from './content';
import { HeroJourney, NextJourney, PathJourney, ReachJourney } from './Journeys';
import './lead-gen.css';
import { Breadcrumb } from '../Breadcrumb';

/**
 * C+ Lead generation (/lead-generation): the owner-approved G1 design (docs/lead-generation-redesign/g1; DEC-057).
 * Seven sections: hero, the problem, what we do, how an enquiry reaches you, what we answer for, questions, close.
 * Markup and classes follow the approved mockup; copy lives in ./content; the four journeys are client components
 * (./Journeys) built on the /ai-seo sequencer at 2 seconds per step. Every section is complete without JavaScript.
 * Operating model (OWNER REQUIREMENT): enquiries go directly to the client's own form, CRM or WhatsApp; MappedSkills does
 * not manually review, approve or release individual client enquiries.
 */

function Hx({ h }: { h: { a: string; b: string } }) {
  return (
    <>
      {h.a} <span className="b-named">{h.b}</span>
    </>
  );
}

export function LeadGenBody() {
  return (
    <>
      {/* 1: hero (ground): the unchanged H1, an example enquiry and its three-step journey; the whole hero fits above the fold */}
      <section className="b-hero lx-hero" aria-labelledby="lg-h1">
        <div className="px-wrap b-hero-g lx-hero-g">
          <div className="lx-hero-tx">
            <Breadcrumb trail={['What we do']} current={LG.crumb} />
            <p className="b-kicker">{LG.kicker}</p>
            <h1 id="lg-h1" className="b-h1">
              <Hx h={LG.h1} />
            </h1>
            <p className="b-lede">{LG.lede}</p>
            <ActionPair primaryLabel={LG.close.primary} />
          </div>
          <HeroJourney />
        </div>
      </section>

      {/* 2: the problem (ink): two inboxes, static */}
      <section className="b-sec b-ink lx-prob" aria-labelledby="lg-h-prob">
        <div className="px-wrap">
          <p className="b-kicker">{LG.probKicker}</p>
          <h2 id="lg-h-prob" className="b-h2">
            <Hx h={LG.probH} />
          </h2>
          <div className="lx-pair">
            <div className="lx-tile lx-tile-cream lx-box">
              <p className="lx-tl">{LG.few.k}</p>
              <div className="lx-inbox" aria-hidden="true">
                <p className="lx-inbox-h">{LG.few.inbox}</p>
                <i className="lx-row lx-row-real">
                  <b />
                  {LG.few.one}
                </i>
                <i className="lx-row lx-row-empty" />
                <i className="lx-row lx-row-empty" />
                <i className="lx-row lx-row-empty" />
              </div>
              <h3 className="lx-box-t">{LG.few.t}</h3>
              <p className="lx-box-d">{LG.few.d}</p>
            </div>
            <div className="lx-tile lx-tile-ink lx-box">
              <p className="lx-tl">{LG.wrong.k}</p>
              <ul className="lx-pile" aria-label={LG.wrong.tagsLabel}>
                {LG.wrong.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <h3 className="lx-box-t">{LG.wrong.t}</h3>
              <p className="lx-box-d">{LG.wrong.d}</p>
            </div>
          </div>
          <p className="px-cap px-cap-ink lx-cap">{LG.probCap}</p>
          <p className="lx-verdict">
            {LG.probLine.a} <span>{LG.probLine.b}</span>
          </p>
        </div>
      </section>

      {/* 3: what we do (paper): one path, four stops */}
      <section className="b-sec b-paper lx-do" aria-labelledby="lg-h-do">
        <div className="px-wrap">
          <p className="b-kicker">{LG.doKicker}</p>
          <h2 id="lg-h-do" className="b-h2">
            <Hx h={LG.doH} />
          </h2>
          <PathJourney />
          <p className="px-cap lx-cap">{LG.doCap}</p>
        </div>
      </section>

      {/* 4: how an enquiry reaches you (ground): the same three steps */}
      <section className="b-sec lx-chk" aria-labelledby="lg-h-chk">
        <div className="px-wrap">
          <p className="b-kicker">{LG.reachKicker}</p>
          <h2 id="lg-h-chk" className="b-h2">
            <Hx h={LG.reachH} />
          </h2>
          <p className="b-lede lx-intro">{LG.reachIntro}</p>
          <ReachJourney />
          <div className="lx-facts">
            {LG.facts.map((f) => (
              <p key={f.b}>
                <b>{f.b}</b> {f.t}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 5: what we answer for (ink): static */}
      <section className="b-sec b-ink lx-bd" aria-labelledby="lg-h-bd">
        <div className="px-wrap">
          <p className="b-kicker">{LG.bdKicker}</p>
          <h2 id="lg-h-bd" className="b-h2">
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
            <div className="lx-tile lx-tile-cream lx-get">
              <p className="lx-tl">{LG.get.k}</p>
              <p className="lx-get-t">{LG.get.t}</p>
              <p className="b-tlink lx-get-a">
                <Link href={LG.bdLink.href}>{LG.bdLink.label} →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6: questions (paper): native disclosures, closed on load */}
      <section className="b-sec b-paper lg-q" aria-labelledby="lg-h-qs">
        <div className="px-wrap lg-q-g">
          <div>
            <p className="b-kicker">{LG.qKicker}</p>
            <h2 id="lg-h-qs" className="b-h2">
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
                  <InlineLink href={l.href}>{l.label}</InlineLink>
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* 7: close (tangerine): the shared close's classes, two CTAs, and what happens next */}
      <section className="b-close lx-close" aria-labelledby="lg-h-close">
        <div className="px-wrap">
          <div className="b-close-in">
            <div>
              <p className="b-kicker lg-close-k">{LG.close.kicker}</p>
              <h2 id="lg-h-close" className="b-h2">
                {LG.close.h.a} <span className="lx-close-2">{LG.close.h.b}</span>
              </h2>
              <p className="b-lede">{LG.close.body}</p>
            </div>
            <ActionPair primaryLabel={LG.close.primary} />
          </div>
          <h3 className="lx-next-k" id="lx-next-k">
            {LG.close.nextK}
          </h3>
          <NextJourney />
        </div>
      </section>
    </>
  );
}

