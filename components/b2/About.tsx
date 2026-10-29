import Link from 'next/link';
import { ActionLink } from '../paid-advertising/ActionLink';
import { PaReveal } from '../paid-advertising/PaReveal';
import { WorkCard } from '../resolve/WorkCard';
import { STUDIES } from '../resolve/work';
import { Band } from './Band';
import { HwSequence } from './HwSequence';
import '../paid-advertising/paid-advertising.css';
import './b2.css';
import './about.css';

/**
 * /about (B2 Revision 3, reworked as a THE RESOLVE story; Stage 2). Philosophy, specialisation, working approach and the
 * two verified case studies. Owner decision: no team, "wider team", founding year or company history. "Independently
 * operated" is an owner-confirmed fact (DECISION_LOG, /about G1 decision of 18 October 2026, item 3). Case studies carry
 * no outcomes; artwork only where already approved for the homepage (shared WorkCard), a text-led panel otherwise.
 *
 * The page reads as four chapters after the hero: the problem (ground), how we decide (paper), working together (dark),
 * the work (ground), then the closing band (burnt). The hero figure is the Resolve idea itself: a field of anonymous
 * visits, a few of which become enquiries. Conceptual, unquantified. Motion: once only, decorative parts only; the settled
 * state is the base style and reduced motion shows it as is.
 */
const BELIEFS = [
  ['Show the path', 'From the search or the scroll to the enquiry. If the path cannot be seen, it cannot be judged.'],
  ['Say what we can measure', 'Tracking is never complete. We report the gaps instead of a tidier number.'],
  ['Claim only what we can support', 'No guaranteed outcomes. We commit to the work and how we do it.'],
];
const COUNT = [
  ['A clear plan', 'You approve the approach and scope before we begin.'],
  ['Honest measurement', 'Monthly reports show what is working and what needs attention.'],
  ['Straight answers', 'We tell you what we recommend, and what the data cannot tell us.'],
];
/* The field: 60 anonymous marks; three of them become enquiries. Positions are fixed so the picture is the same for everyone. */
const FIELD = Array.from({ length: 60 }, (_, i) => i);
const ASKED = new Set([14, 37, 51]);

const css = (v: Record<string, string | number>) => v as React.CSSProperties;

export function About() {
  return (
    <div className="pa b2 ab">
      <PaReveal />
      <HwSequence scope=".ab" />

      {/* Hero, Ink Deep: the promise, and the idea behind it */}
      <section className="ab-hero ab-dark" aria-labelledby="ab-h1">
        <div className="pa-wrap ab-hero-grid">
          <div className="ab-hero-copy">
            <p className="pa-eyebrow">About MappedSkills</p>
            <h1 id="ab-h1">An advertising agency that <span>answers to your enquiries.</span></h1>
            <p className="b2-lede">We plan and manage Google Ads and Meta Ads for growing Indian businesses. We are independently operated, and we want to be judged on the enquiries your advertising produces, not the traffic.</p>
            <div className="pa-actions"><ActionLink /><ActionLink href="/how-it-works" variant="text">See how we work</ActionLink></div>
          </div>
          <figure className="ab-field" aria-labelledby="ab-field-cap">
            <div className="ab-field-in">
              <div className="ab-field-zone">
                <p className="ab-field-k">Traffic</p>
                <ul className="ab-marks" aria-hidden="true">
                  {FIELD.map((i) => <li key={i} className={ASKED.has(i) ? 'on' : undefined} style={css({ '--r': Math.floor(i / 10), '--k': i % 10 })} />)}
                </ul>
              </div>
              <span className="ab-field-arrow" aria-hidden="true" />
              <div className="ab-field-out">
                <p className="ab-field-k">Enquiries</p>
                <ul className="ab-asked" aria-hidden="true"><li /><li /><li /></ul>
                <p className="ab-field-say">What we answer to</p>
              </div>
            </div>
            <figcaption id="ab-field-cap">Many visits, a few people who ask. Conceptual illustration. It shows no results.</figcaption>
          </figure>
        </div>
      </section>

      {/* 01, Ground: the problem */}
      <section className="ab-act ab-ground" aria-labelledby="ab-bel">
        <div className="pa-wrap">
          <header className="ab-head" data-reveal>
            <p className="ab-ch"><span>01</span>The problem</p>
            <h2 id="ab-bel" className="b2-h2">Traffic is not the finish line. <span className="b2-em">Enquiries are.</span></h2>
            <p className="b2-lede">Advertising can look busy and still bring nothing to follow up. A report full of clicks rarely says whether anyone asked to buy.</p>
          </header>
          <p className="ab-sub">What we believe</p>
          <ol className="ab-stairs" data-hw-seq>
            {BELIEFS.map(([t, d], i) => (
              <li key={t} style={css({ '--i': i })}>
                <span className="ab-step" aria-hidden="true">{i + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 02, Paper: how we decide where to advertise */}
      <section className="ab-act b2-paper" aria-labelledby="ab-foc">
        <div className="pa-wrap">
          <header className="ab-head" data-reveal>
            <p className="ab-ch"><span>02</span>How we decide</p>
            <h2 id="ab-foc" className="b2-h2">Two ways to reach buyers. <span className="b2-em">Nothing to dilute them.</span></h2>
            <p className="b2-lede">We start from how your customers buy: whether they search for what you sell, or discover it while they browse.</p>
          </header>
          <ol className="ab-ccm" data-hw-seq aria-label="Where each part of the work sits">
            <li className="cap" style={css({ '--i': 0 })}>
              <p className="ab-stage"><b>Capture</b><span>MappedSkills plans and manages the advertising</span></p>
              <div className="ab-svc">
                <div><span className="t">They search</span><h3>Google Ads</h3><p>Reaches people already looking for what you sell.</p><ActionLink href="/google-ads" variant="text">Explore Google Ads</ActionLink></div>
                <div><span className="t">They browse</span><h3>Meta Ads</h3><p>Introduces your offer to people on Facebook and Instagram who were not looking yet.</p><ActionLink href="/social-media-ads" variant="text">Explore Meta Ads</ActionLink></div>
              </div>
            </li>
            <li className="conv" style={css({ '--i': 1 })}>
              <p className="ab-stage"><b>Convert</b><span>Your business: offer, website and follow up</span></p>
            </li>
            <li className="meas" style={css({ '--i': 2 })}>
              <p className="ab-stage"><b>Measure</b><span>MappedSkills reviews</span></p>
            </li>
          </ol>
          <p className="b2-cap ab-also">We also offer SEO, AI search, conversion optimisation and lead generation as supporting services. They are there to help your advertising work, not to replace it.</p>
        </div>
      </section>

      {/* 03, Ink Deep: working together, and the approval boundary */}
      <section className="ab-act ab-dark" aria-labelledby="ab-how">
        <div className="pa-wrap">
          <header className="ab-head" data-reveal>
            <p className="ab-ch"><span>03</span>Working together</p>
            <h2 id="ab-how" className="b2-h2">You approve the plan. <span className="b2-em">We answer for the work.</span></h2>
          </header>
          <div className="ab-pact" data-hw-seq>
            <div className="ab-part ours"><b>Our part</b><p>Managing your advertising.</p></div>
            <div className="ab-gate"><span className="ab-dia" aria-hidden="true" /><p>You approve the approach and scope before we begin.</p></div>
            <div className="ab-part yours"><b>Your part</b><p>Responding to enquiries and closing sales.</p></div>
          </div>
          <h3 className="ab-sub ab-sub-dark">What you can count on</h3>
          <ul className="ab-count">{COUNT.map(([a, b], i) => <li key={a} data-reveal style={css({ '--i': i })}><b>{a}</b><span>{b}</span></li>)}</ul>
          <div className="ab-foot">
            <p>We commit to the work and how we do it, not guaranteed outcomes.</p>
            <ActionLink href="/how-it-works" variant="text">See how the work runs</ActionLink>
          </div>
        </div>
      </section>

      {/* 04, Ground: the work (shared case-study cards) */}
      <section className="ab-act ab-ground" aria-labelledby="ab-work">
        <div className="pa-wrap">
          <div className="ab-work-top">
            <header className="ab-head" data-reveal>
              <p className="ab-ch"><span>04</span>The work</p>
              <h2 id="ab-work" className="b2-h2">The work <span className="b2-em">behind the offer.</span></h2>
              <p className="b2-lede">See the approach in practice with two clients, one on each channel.</p>
            </header>
            <ActionLink href="/work" variant="text">Explore our work</ActionLink>
          </div>
          <div className="rs-wc-grid">
            <WorkCard s={STUDIES['om-sai']} lead />
            <WorkCard s={STUDIES.anybodycanbake} />
          </div>
          <p className="ab-press">For journalists: press releases and our media contact are in the <Link href="/press">newsroom</Link>.</p>
        </div>
      </section>

      <Band id="ab-close" h="Tell us what is not working." body="A few lines about your business and what you want advertising to achieve is plenty. We will reply by email or WhatsApp. Nothing starts until you approve it." />
    </div>
  );
}
