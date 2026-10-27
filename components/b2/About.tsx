import Link from 'next/link';
import { ActionLink } from '../paid-advertising/ActionLink';
import { PaReveal } from '../paid-advertising/PaReveal';
import { Band } from './Band';
import '../paid-advertising/paid-advertising.css';
import './b2.css';

/**
 * /about (B2 Revision 3). Philosophy, specialisation, working approach and the two verified case studies. Owner decision:
 * no team, "wider team", founding year or company history. "Independently operated" is an owner-confirmed fact
 * (DECISION_LOG, /about G1 decision of 18 October 2026, item 3). Case studies carry no outcomes.
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
const WORK = [
  { m: 'Google Ads · Education and training', t: 'AnyBodyCanBake', p: 'A Pune online baking school that needed more students for its eggless and healthy baking courses.', href: '/portfolio/google-ads-for-online-courses', cta: 'Read the Google Ads case study' },
  { m: 'Meta Ads · Real estate', t: 'Om Sai Developer', p: 'A Chembur developer that needed enquiries from people interested in its project.', href: '/portfolio/om-sai-developer-meta-ads', cta: 'Read the Meta Ads case study' },
];

export function About() {
  return (
    <div className="pa b2">
      <PaReveal />
      <section className="b2-hero pa-wrap" aria-labelledby="ab-h1">
        <div>
          <p className="pa-eyebrow">About MappedSkills</p>
          <h1 id="ab-h1">An advertising agency that <span>answers to your enquiries.</span></h1>
          <p className="b2-lede">We plan and manage Google Ads and Meta Ads for growing Indian businesses. We are independently operated, and we want to be judged on the enquiries your advertising produces, not the traffic.</p>
          <div className="pa-actions"><ActionLink /><ActionLink href="/how-it-works" variant="text">See how we work</ActionLink></div>
        </div>
        <figure className="b2-card" aria-labelledby="ab-cap">
          <p className="pa-eyebrow">What we are</p>
          <h2 style={{ fontSize: '1.9rem', marginTop: 10 }}>A specialist, on purpose.</h2>
          <p className="b2-path" role="img" aria-label="Capture, then Convert, then Enquiry"><span>Capture</span><span>Convert</span><span className="t">Enquiry</span></p>
          <p style={{ marginTop: 18 }}>Google Ads and Meta Ads are our core work. Everything else we do supports them.</p>
          <figcaption id="ab-cap" className="b2-cap">How we plan the work. A diagram of the approach, not measured results.</figcaption>
        </figure>
      </section>

      <section className="b2-sec b2-dark" aria-labelledby="ab-bel">
        <div className="pa-wrap">
          <p className="pa-eyebrow">What we believe</p>
          <h2 id="ab-bel" className="b2-belief">Traffic is not the finish line. Enquiries are.</h2>
          <ul className="b2-bel">{BELIEFS.map(([t, d]) => <li key={t} data-reveal><h3>{t}</h3><p>{d}</p></li>)}</ul>
        </div>
      </section>

      <section className="b2-sec b2-paper" aria-labelledby="ab-foc">
        <div className="pa-wrap">
          <p className="pa-eyebrow">What we focus on</p>
          <h2 id="ab-foc" className="b2-h2">Two ways to reach buyers. Nothing to dilute them.</h2>
          <div className="b2-foc">
            <div><span className="t">They search</span><h3>Google Ads</h3><p>Reaches people already looking for what you sell.</p><p style={{ marginTop: 14 }}><ActionLink href="/google-ads" variant="text">Explore Google Ads</ActionLink></p></div>
            <div><span className="t">They browse</span><h3>Meta Ads</h3><p>Introduces your offer to people on Facebook and Instagram who were not looking yet.</p><p style={{ marginTop: 14 }}><ActionLink href="/social-media-ads" variant="text">Explore Meta Ads</ActionLink></p></div>
          </div>
          <p className="b2-cap" style={{ maxWidth: '46em', marginTop: 20 }}>We also offer SEO, AI search, conversion optimisation and lead generation as supporting services. They are there to help your advertising work, not to replace it.</p>
        </div>
      </section>

      <section className="b2-sec" aria-labelledby="ab-how">
        <div className="pa-wrap b2-two">
          <div>
            <p className="pa-eyebrow">How we work</p>
            <h2 id="ab-how" className="b2-h2">What you can count on.</h2>
            <ul className="b2-list">{COUNT.map(([a, b]) => <li key={a} data-reveal><b>{a}</b><span>{b}</span></li>)}</ul>
          </div>
          <div style={{ paddingTop: 12 }}>
            <h3 style={{ fontSize: '1.7rem' }}>Who does what</h3>
            <div className="b2-split"><div><b>Our part</b><p>Managing your advertising.</p></div><div><b>Your part</b><p>Responding to enquiries and closing sales.</p></div></div>
            <p className="b2-cap">We commit to the work and how we do it, not guaranteed outcomes.</p>
            <p style={{ marginTop: 18 }}><ActionLink href="/how-it-works" variant="text">See how the work runs</ActionLink></p>
          </div>
        </div>
      </section>

      <section className="b2-sec b2-paper" aria-labelledby="ab-work">
        <div className="pa-wrap">
          <p className="pa-eyebrow">Our work</p>
          <h2 id="ab-work" className="b2-h2">The work behind the offer.</h2>
          <div className="b2-work">{WORK.map((w) => (
            <Link key={w.href} href={w.href} data-reveal><span className="m">{w.m}</span><h3>{w.t}</h3><p>{w.p}</p><span className="go">{w.cta} <span aria-hidden="true">&nbsp;↗</span></span></Link>
          ))}</div>
          <p className="b2-cap" style={{ marginTop: 32 }}>For journalists: press releases and our media contact are in the newsroom.</p>
          <p><ActionLink href="/press" variant="text">Visit the newsroom</ActionLink></p>
        </div>
      </section>

      <Band id="ab-close" h="Tell us what is not working." body="A few lines about your business and what you want advertising to achieve is plenty. We will reply by email or WhatsApp. Nothing starts until you approve it." />
    </div>
  );
}
