import Link from 'next/link';
import { ActionLink } from '../paid-advertising/ActionLink';
import { PaReveal } from '../paid-advertising/PaReveal';
import { Band } from './Band';
import '../paid-advertising/paid-advertising.css';
import './b2.css';
import './how-it-works.css';

/**
 * /how-it-works (B2 Revision 3). The five approved steps (Assess, Plan, Launch, Test, Review) with one approval gate.
 * "Usually": nothing here says every engagement is identical. No timeline, price, guarantee or report metric. The
 * process diagram is plain HTML (no rotated text). Responsibilities are stated precisely: MappedSkills plans, runs and
 * reports on the agreed advertising; the client gives access and knowledge, decides, and follows up the enquiries.
 *
 * Stage 1 Resolve alignment (DEC-086): compact two-column rail so the hero fits the fold at desktop sizes; selective
 * two-tone H2s; the monthly review precedes "your part" so the page reads begin, approve, each month, what we need
 * (dark, paper, ground, dark, paper, burnt). No copy was added or changed.
 */
const RAIL = [
  { n: '1', t: 'Assess', d: 'We look at how things work today' },
  { n: '2', t: 'Plan', d: 'Findings, plan and proposal' },
  { n: 'gate', t: 'You approve', d: 'Nothing starts until you say yes' },
  { n: '3', t: 'Launch', d: 'Campaigns go live as agreed' },
  { n: '4', t: 'Test', d: 'Ads and budget adjusted' },
  { n: '5', t: 'Review', d: 'Monthly report' },
];

const ROWS = [
  { n: 1, t: 'Assess', we: 'Review how your business, website and any campaigns already running work today.', you: 'Tell us about your business, offer and customers. Give us access to your accounts.', rc: 'Our findings' },
  { n: 2, t: 'Plan', we: 'Recommend where to advertise first, what to include and what to fix before spending.', you: 'Read the proposal and ask questions. Tell us what you know about your customers.', rc: 'A plan and a proposal that sets out scope, fee and how we report' },
  { n: 3, t: 'Launch', we: 'Build and launch the agreed campaigns.', you: 'Keep ad spend with the platform. Give quick answers when we ask.', rc: 'Live campaigns, built to the plan you approved' },
  { n: 4, t: 'Test', we: 'Test different ads, adjust budget as results call for it and review where people land after they click.', you: 'Reply to enquiries and follow them up. Quick replies matter.', rc: 'The changes we make, in your monthly report' },
  { n: 5, t: 'Review', we: 'Compare with your starting point and say what worked, what did not and what we suggest next.', you: 'Read the report. Join the review call where your proposal includes one. Decide what happens next.', rc: 'A monthly performance report, and review calls where agreed' },
];

const NEED = [
  ['Access', 'To your website, ad accounts and wherever enquiries arrive.'],
  ['What you know', 'Who your customers are and what they ask before they buy.'],
  ['Quick decisions', 'Work that waits weeks for a yes loses momentum.'],
  ['Replies to enquiries', 'Your team replies to enquiries and follows them up. Quick replies matter, and that part sits with you.'],
];

const GAPS = [
  ['Phone, then laptop', 'Someone who browses on a phone and enquires on a laptop can look like two people.'],
  ['Tracking declined', 'If a visitor says no to tracking, we respect it. The enquiry arrives without a source.'],
  ['Calls, emails and shared links', 'These often arrive with no record of how the person found you.'],
  ['Small numbers', 'When numbers are too small to tell, we will not claim a change caused a result.'],
];

const QS = [
  ['Do I have to commit before I see a plan?', 'No. You see our findings, a plan and a proposal first. Nothing starts until you say yes.'],
  ['Can you guarantee more enquiries or sales?', 'No. We do the work we agreed and show you what changed.'],
  ['Who replies to the enquiries?', 'Your team does.'],
];

export function HowItWorks() {
  return (
    <div className="pa b2">
      <PaReveal />
      <section className="b2-hero hw-hero pa-wrap" aria-labelledby="hw-h1">
        <div>
          <p className="pa-eyebrow">How we work</p>
          <h1 id="hw-h1">No mystery about <span>what happens next.</span></h1>
          <p className="b2-lede">From the first conversation to the monthly review, here is how we plan, launch and manage your Google Ads and Meta Ads. You see the plan before any work starts.</p>
          <div className="pa-actions"><ActionLink /><ActionLink href="#steps" variant="text">See the five steps</ActionLink></div>
        </div>
        <figure className="b2-card b2-rail hw-rail" aria-labelledby="hw-rail-cap">
          <ol>
            <li className="start" style={{ '--i': 0 } as React.CSSProperties}><span className="dot" aria-hidden="true" /><span><b>First conversation</b><span className="d">You tell us about your business</span></span></li>
            {RAIL.map((r, i) => (
              <li key={r.t} className={r.n === 'gate' ? 'gate' : undefined} style={{ '--i': i + 1 } as React.CSSProperties}>
                <span className="dot" aria-hidden="true">{r.n === 'gate' ? '' : r.n}</span>
                <span><b>{r.t}</b><span className="d">{r.d}</span></span>
              </li>
            ))}
          </ol>
          <p className="b2-loop">Each month&rsquo;s review feeds the next plan.</p>
          <figcaption id="hw-rail-cap" className="b2-cap">How the work usually runs. A diagram of the process, not a timeline.</figcaption>
        </figure>
      </section>

      <section id="steps" className="b2-sec b2-paper" aria-labelledby="hw-steps">
        <div className="pa-wrap">
          <p className="pa-eyebrow">The five steps</p>
          <h2 id="hw-steps" className="b2-h2">How the work <span className="b2-em">usually runs.</span></h2>
          <p className="b2-lede">The first conversation is by email, WhatsApp or a discovery call. Then five steps. Work starts only after the plan, and only when you approve.</p>
          <div className="b2-lhead" aria-hidden="true"><span /><span>What we do</span><span>What you do</span><span>What you receive</span></div>
          <ol className="b2-ledger">
            {ROWS.slice(0, 2).map((r) => <Row key={r.n} r={r} />)}
            <li className="b2-gate" data-reveal aria-labelledby="hw-gate">
              <span className="dia" aria-hidden="true" />
              <div>
                <h3 id="hw-gate">Nothing starts until you say yes.</h3>
                <p>Before any work begins you will have seen what we found, what we recommend and what it costs. If advertising does not suit your business yet, we will say so.</p>
              </div>
              <div className="sheet"><b>Your proposal sets out</b><ul><li>The services we recommend</li><li>The scope</li><li>The deliverables</li><li>How we report</li><li>Our fees</li></ul></div>
            </li>
            {ROWS.slice(2).map((r) => <Row key={r.n} r={r} />)}
          </ol>
          <p className="b2-usual">Businesses differ, so the detail of each step does too. Your proposal sets out what applies to you.</p>
        </div>
      </section>

      <section className="b2-sec" aria-labelledby="hw-month">
        <div className="pa-wrap">
          <p className="pa-eyebrow">Every month</p>
          <h2 id="hw-month" className="b2-h2">You see what changed, <span className="b2-em">and what we cannot see.</span></h2>
          <div className="b2-two" style={{ marginTop: 40 }}>
            <div>
              <p className="b2-lede" style={{ marginTop: 0 }}>Before we change anything we note where things stand. Each month we compare with that starting point, where the data allows.</p>
              <div className="b2-bands" style={{ marginTop: 28 }} role="list" aria-label="What each monthly report covers">
                <div role="listitem"><small>1 · Starting point</small><b>Where things stood before we began.</b></div>
                <div role="listitem" className="now"><small>2 · What changed</small><b>This month, compared with your starting point.</b></div>
                <div role="listitem"><small>3 · What is next</small><b>What we suggest for the coming month.</b></div>
              </div>
              <p className="b2-cap">The shape of one report. Illustration, not real data.</p>
            </div>
            <div className="b2-hatch b2-gaps">
              <h3>What the numbers cannot always show</h3>
              <p style={{ marginTop: 8, fontSize: '.9375rem' }}>Tracking helps, but it is never complete. We point out the gaps instead of hiding them.</p>
              <ul>{GAPS.map(([a, b]) => <li key={a}><b>{a}</b>{b}</li>)}</ul>
              <p style={{ fontWeight: 700 }}>A missing source does not make an enquiry any less real.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="b2-sec b2-dark" aria-labelledby="hw-part">
        <div className="pa-wrap b2-two">
          <div>
            <p className="pa-eyebrow">Your part</p>
            <h2 id="hw-part" className="b2-h2">What we will need <span className="b2-em">from you.</span></h2>
            <p className="b2-lede">We plan, run and report on the agreed advertising. You provide access and knowledge, make decisions and follow up the enquiries that come in.</p>
            <div className="b2-hatch b2-sep"><b>Agreed separately</b><p>Website, landing page and tracking changes. Creative beyond the agreed designs, such as reels, video and scripting.</p></div>
          </div>
          <ul className="b2-list">{NEED.map(([a, b]) => <li key={a} data-reveal><b>{a}</b><span>{b}</span></li>)}</ul>
        </div>
      </section>

      <section className="b2-sec b2-paper" aria-labelledby="hw-qs">
        <div className="pa-wrap">
          <p className="pa-eyebrow">Questions</p>
          <h2 id="hw-qs" className="b2-h2">Asked before <span className="b2-em">the first call.</span></h2>
          <ul className="b2-qs">{QS.map(([q, a]) => <li key={q}><b>{q}</b><span>{a}</span></li>)}</ul>
          <p style={{ marginTop: 20 }}><ActionLink href="/faq" variant="text">More questions and answers</ActionLink></p>
          <p className="b2-note" style={{ marginTop: 6 }}>Related: <Link href="/pricing">pricing</Link> and <Link href="/services">our services</Link>.</p>
        </div>
      </section>

      <Band id="hw-close" h="Judge us on the enquiries, not the traffic." body="Tell us about your business and what you want advertising to achieve. We will reply by email or WhatsApp to talk it through. Nothing starts until you approve it." />
    </div>
  );
}

function Row({ r }: { r: (typeof ROWS)[number] }) {
  return (
    <li className="b2-lrow" data-reveal>
      <div><span className="n">STEP {r.n}</span><h3>{r.t}</h3></div>
      <div><h4>We do</h4><p>{r.we}</p></div>
      <div><h4>You do</h4><p>{r.you}</p></div>
      <div className="rc"><h4>You receive</h4><p>{r.rc}</p></div>
    </li>
  );
}
