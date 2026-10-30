import Link from 'next/link';
import { ActionLink } from '../paid-advertising/ActionLink';
import { PaReveal } from '../paid-advertising/PaReveal';
import { Band } from './Band';
import { HwSequence } from './HwSequence';
import '../paid-advertising/paid-advertising.css';
import './b2.css';
import './how-it-works.css';

/**
 * /how-it-works (B2 Revision 3, reworked as a THE RESOLVE story; DEC-086 Stage 1). The five approved steps (Assess, Plan,
 * Launch, Test, Review) with one approval gate. "Usually": nothing here says every engagement is identical. No timeline,
 * price, guarantee or report metric. Diagrams are plain HTML (no rotated text). Responsibilities are stated precisely:
 * MappedSkills plans, runs and reports on the agreed advertising; the client gives access and knowledge, decides, and
 * follows up the enquiries.
 *
 * The page reads as one journey, each act answering a question a prospective client asks: what happens after I get in
 * touch (ground), how you decide what to recommend (paper), do I have to commit (the gate, dark), what you need from me
 * (ground), what happens once campaigns are live (dark), how I will know what changed (paper), then the closing band.
 * Ownership follows the homepage legend: solid burnt for MappedSkills, dashed for the client. Motion follows the homepage
 * convention: once only, transforms and opacity, the settled diagram is the base style, and reduced motion shows it as is.
 */
type Stop = { id: string; n: string; t: string; d: string; href: string; who: 'ms' | 'you' | 'gate'; zone?: string };

const ROUTE: Stop[] = [
  { id: 'start', n: '', t: 'First conversation', d: 'You tell us about your business', href: '#steps', who: 'you', zone: 'Before you say yes' },
  { id: 'assess', n: '1', t: 'Assess', d: 'We look at how things work today', href: '#hw-diagnose', who: 'ms' },
  { id: 'plan', n: '2', t: 'Plan', d: 'Findings, plan and proposal', href: '#hw-diagnose', who: 'ms' },
  { id: 'gate', n: '', t: 'You approve', d: 'Nothing starts until you say yes', href: '#hw-gate', who: 'gate' },
  { id: 'launch', n: '3', t: 'Launch', d: 'Campaigns go live as agreed', href: '#hw-ongoing', who: 'ms', zone: 'After you say yes' },
  { id: 'test', n: '4', t: 'Test', d: 'Ads and budget adjusted', href: '#hw-ongoing', who: 'ms' },
  { id: 'review', n: '5', t: 'Review', d: 'Monthly report', href: '#hw-ongoing', who: 'ms' },
];

const BEATS = [
  { h: 'A conversation', p: 'By email, WhatsApp or a discovery call. You tell us about your business, offer and customers.' },
  { h: 'Five steps', p: 'Assess, plan, launch, test and review. Your proposal sets out what applies to you.' },
  { h: 'One yes', p: 'Nothing starts until you approve the plan.', gate: true },
  { h: 'Every month', p: 'A report on what changed and what we suggest next.' },
];

const ROWS = [
  { n: 1, t: 'Assess', we: 'Review how your business, website and any campaigns already running work today.', you: 'Tell us about your business, offer and customers. Give us access to your accounts.', rc: 'Our findings' },
  { n: 2, t: 'Plan', we: 'Recommend where to advertise first, what to include and what to fix before spending.', you: 'Read the proposal and ask questions. Tell us what you know about your customers.', rc: 'A plan and a proposal that sets out scope, fee and how we report' },
  { n: 3, t: 'Launch', we: 'Build and launch the agreed campaigns.', you: 'Keep ad spend with the platform. Give quick answers when we ask.', rc: 'Live campaigns, built to the plan you approved' },
  { n: 4, t: 'Test', we: 'Test different ads, adjust budget as results call for it and review where people land after they click.', you: 'Reply to enquiries and follow them up. Quick replies matter.', rc: 'The changes we make, in your monthly report' },
  { n: 5, t: 'Review', we: 'Compare with your starting point and say what worked, what did not and what we suggest next.', you: 'Read the report. Join the review call where your proposal includes one. Decide what happens next.', rc: 'A monthly performance report, and review calls where agreed' },
];

const PROPOSAL = ['The services we recommend', 'The scope', 'The deliverables', 'How we report', 'Our fees'];

const NEED = [
  ['Access', 'To your website, ad accounts and wherever enquiries arrive.'],
  ['What you know', 'Who your customers are and what they ask before they buy.'],
  ['Quick decisions', 'Work that waits weeks for a yes loses momentum.'],
  ['Replies to enquiries', 'Your team replies to enquiries and follows them up. Quick replies matter, and that part sits with you.'],
];

const REPORT = [
  ['Starting point', 'Where things stood before we began.'],
  ['What changed', 'This month, compared with your starting point.'],
  ['What is next', 'What we suggest for the coming month.'],
];

const GAPS = [
  ['Phone, then laptop', 'Someone who browses on a phone and enquires on a laptop can look like two people.'],
  ['Tracking declined', 'If a visitor says no to tracking, we respect it. The enquiry arrives without a source.'],
  ['Calls, emails and shared links', 'These often arrive with no record of how the person found you.'],
  ['Small numbers', 'When numbers are too small to tell, we will not claim a change caused a result.'],
];

const css = (v: Record<string, string | number>) => v as React.CSSProperties;

export function HowItWorks() {
  return (
    <div className="pa b2 hw">
      <PaReveal />
      <HwSequence />

      {/* Hero, Ink Deep: the promise and the whole route at a glance, with the approval gate as the hinge */}
      <section className="hw-hero hw-dark" aria-labelledby="hw-h1">
        <div className="pa-wrap hw-hero-grid">
          <div className="hw-hero-copy">
            <p className="pa-eyebrow">How we work</p>
            <h1 id="hw-h1">No mystery about <span>what happens next.</span></h1>
            <p className="b2-lede">From the first conversation to the monthly review, here is how we plan, launch and manage your Google Ads and Meta Ads. You see the plan before any work starts.</p>
            <div className="pa-actions"><ActionLink /><ActionLink href="#steps" variant="text">See the five steps</ActionLink></div>
          </div>
          <figure className="hw-route" aria-labelledby="hw-route-cap">
            <ol>
              {ROUTE.map((s, i) => (
                <li key={s.id} className={`hw-stop hw-s-${s.who}`} style={css({ '--i': i })}>
                  {s.zone && <span className="hw-zone" aria-hidden="true">{s.zone}</span>}
                  <span className="hw-node" aria-hidden="true">{s.n}</span>
                  <span className="hw-stop-t"><a href={s.href}>{s.n ? `${s.n}. ` : ''}{s.t}</a><span>{s.d}</span></span>
                </li>
              ))}
              <li className="hw-return" aria-hidden="true" />
            </ol>
            <p className="hw-loop"><span aria-hidden="true">↺</span>Each month&rsquo;s review feeds the next plan.</p>
            <figcaption id="hw-route-cap">How the work usually runs. A diagram of the process, not a timeline.</figcaption>
          </figure>
        </div>
      </section>

      {/* Act 1, Ground: the uncertainty */}
      <section id="steps" className="hw-act hw-ground" aria-labelledby="hw-steps">
        <div className="pa-wrap">
          <Head ask="What happens after I get in touch?" id="hw-steps" h={<>First, a conversation. <span className="b2-em">Then five steps.</span></>} where={['start']} whereLabel="Before step 1" />
          <p className="b2-lede hw-lede">The first conversation is by email, WhatsApp or a discovery call. Then five steps. Work starts only after the plan, and only when you approve.</p>
          <ol className="hw-beats" data-hw-seq aria-label="The shape of working with us">
            {BEATS.map((b, i) => (
              <li key={b.h} className={b.gate ? 'gate' : undefined} style={css({ '--i': i })}>
                <span className="hw-beat-mark" aria-hidden="true" />
                <h3>{b.h}</h3>
                <p>{b.p}</p>
              </li>
            ))}
          </ol>
          <p className="b2-usual">Businesses differ, so the detail of each step does too. Your proposal sets out what applies to you.</p>
        </div>
      </section>

      {/* Act 2, Paper: the diagnosis (steps 1 and 2) */}
      <section id="hw-diagnose" className="hw-act b2-paper" aria-labelledby="hw-diag-h">
        <div className="pa-wrap">
          <Head ask="How do you decide what to recommend?" id="hw-diag-h" h={<>We look first. <span className="b2-em">Then we recommend.</span></>} where={['assess', 'plan']} whereLabel="Steps 1 and 2 of 5" />
          <Legend />
          <div className="hw-steps">{ROWS.slice(0, 2).map((r) => <Exchange key={r.n} r={r} />)}</div>
        </div>
      </section>

      {/* Act 3, Ink Deep: the approval gate, the hinge of the whole engagement */}
      <section id="hw-gate" className="hw-act hw-gate hw-dark" aria-labelledby="hw-gate-h">
        <div className="pa-wrap hw-gate-grid">
          <div>
            <Head ask="Do I have to commit before I see a plan?" id="hw-gate-h" h={<>Nothing starts until <span className="b2-em">you say yes.</span></>} where={['gate']} whereLabel="Between step 2 and step 3" answer="No. You see our findings, a plan and a proposal first." />
            <p className="b2-lede">Before any work begins you will have seen what we found, what we recommend and what it costs. If advertising does not suit your business yet, we will say so.</p>
          </div>
          <div className="hw-doc" data-hw-seq>
            <span className="hw-doc-dia" aria-hidden="true" />
            <h3>Your proposal sets out</h3>
            <ul>{PROPOSAL.map((p, i) => <li key={p} style={css({ '--i': i })}><span className="hw-tick" aria-hidden="true" />{p}</li>)}</ul>
            <p className="hw-doc-sign"><span>Your approval</span><i aria-hidden="true" /></p>
          </div>
        </div>
      </section>

      {/* Act 4, Ground: the collaboration (who does what) */}
      <section className="hw-act hw-ground hw-part" aria-labelledby="hw-part">
        <div className="pa-wrap">
          <Head ask="What do you need from me?" id="hw-part" h={<>What we will need <span className="b2-em">from you.</span></>} />
          <p className="b2-lede hw-lede">We plan, run and report on the agreed advertising. You provide access and knowledge, make decisions and follow up the enquiries that come in.</p>
          <div className="hw-split">
            <div className="hw-ours" data-reveal>
              <p className="hw-side">MappedSkills</p>
              <p className="hw-verbs"><span>Plan.</span><span>Run.</span><span>Report.</span></p>
              <div className="hw-sep"><b>Agreed separately</b><p>Website, landing page and tracking changes. Creative beyond the agreed designs, such as reels, video and scripting.</p></div>
            </div>
            <div className="hw-yours">
              <p className="hw-side">You</p>
              <ol>{NEED.map(([a, b], i) => <li key={a} data-reveal style={css({ '--i': i })}><span className="n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><b>{a}</b><span>{b}</span></li>)}</ol>
              <p className="hw-qa"><b>Who replies to the enquiries?</b> Your team does.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Act 5, Ink Deep: the ongoing work (steps 3 to 5, every month) */}
      <section id="hw-ongoing" className="hw-act hw-dark" aria-labelledby="hw-on-h">
        <div className="pa-wrap">
          <Head ask="What happens once the campaigns are live?" id="hw-on-h" h={<>Launch, test, review. <span className="b2-em">Then you decide what is next.</span></>} where={['launch', 'test', 'review']} whereLabel="Steps 3 to 5 of 5" />
          <ol className="hw-cycle" data-hw-seq>
            {ROWS.slice(2).map((r, i) => (
              <li key={r.n} style={css({ '--i': i })}>
                <span className="hw-cnode" aria-hidden="true">{r.n}</span>
                <h3><span className="hw-sr">Step {r.n}: </span>{r.t}</h3>
                <dl>
                  <div><dt>We do</dt><dd>{r.we}</dd></div>
                  <div className="you"><dt>You do</dt><dd>{r.you}</dd></div>
                  <div className="rc"><dt>You receive</dt><dd>{r.rc}</dd></div>
                </dl>
              </li>
            ))}
          </ol>
          <p className="hw-loop hw-cycle-loop"><span aria-hidden="true">↺</span>Each month&rsquo;s review feeds the next plan.</p>
        </div>
      </section>

      {/* Act 6, Paper: what you will see each month, and what the numbers cannot show */}
      <section className="hw-act b2-paper" aria-labelledby="hw-month">
        <div className="pa-wrap">
          <Head ask="How will I know what changed?" id="hw-month" h={<>You see what changed, <span className="b2-em">and what we cannot see.</span></>} />
          <div className="hw-month">
            <div>
              <p className="b2-lede hw-lede">Before we change anything we note where things stand. Each month we compare with that starting point, where the data allows.</p>
              <ol className="hw-report" data-hw-seq aria-label="What each monthly report covers">
                {REPORT.map(([a, b], i) => <li key={a} className={i === 1 ? 'now' : undefined} style={css({ '--i': i })}><small>{i + 1} · {a}</small><b>{b}</b></li>)}
              </ol>
              <p className="b2-cap">The shape of one report. Illustration, not real data.</p>
              <div className="hw-promise" data-reveal>
                <p className="hw-promise-q">Can you guarantee more enquiries or sales?</p>
                <p className="hw-promise-a">No. We do the work we agreed and show you what changed.</p>
              </div>
            </div>
            <div className="b2-hatch b2-gaps hw-gaps">
              <h3>What the numbers cannot always show</h3>
              <p>Tracking helps, but it is never complete. We point out the gaps instead of hiding them.</p>
              <ul>{GAPS.map(([a, b]) => <li key={a}><b>{a}</b>{b}</li>)}</ul>
              <p className="hw-gaps-last">A missing source does not make an enquiry any less real.</p>
            </div>
          </div>
          <div className="hw-more">
            <ActionLink href="/faq" variant="text">More questions and answers</ActionLink>
            <p className="b2-note">Related: <Link href="/pricing">pricing</Link> and <Link href="/services">our services</Link>.</p>
          </div>
        </div>
      </section>

      <Band id="hw-close" h="Judge us on the enquiries, not the traffic." body="Tell us about your business and what you want advertising to achieve. We will reply by email or WhatsApp to talk it through. Nothing starts until you approve it." />
    </div>
  );
}

/** Section head: the visitor's question, the answer as the H2, and where this act sits on the route. */
function Head({ ask, id, h, where, whereLabel, answer }: { ask: string; id: string; h: React.ReactNode; where?: string[]; whereLabel?: string; answer?: string }) {
  return (
    <header className="hw-head" data-reveal>
      <div>
        <p className="hw-ask"><span>You ask</span>{ask}</p>
        {answer && <p className="hw-answer">{answer}</p>}
        <h2 id={id} className="b2-h2">{h}</h2>
      </div>
      {where && (
        <p className="hw-where">
          <span className="hw-where-marks" aria-hidden="true">
            {ROUTE.map((s) => <i key={s.id} className={[s.who === 'gate' ? 'g' : '', where.includes(s.id) ? 'on' : ''].join(' ').trim() || undefined} />)}
          </span>
          <span>{whereLabel}</span>
        </p>
      )}
    </header>
  );
}

function Legend() {
  return (
    <ul className="hw-legend" aria-label="Who does what">
      <li><i className="ms" aria-hidden="true" />MappedSkills does</li>
      <li><i className="you" aria-hidden="true" />You do</li>
      <li><i className="rc" aria-hidden="true" />You receive</li>
    </ul>
  );
}

/** One step as a collaboration: our work and yours run side by side and meet in what you receive. */
function Exchange({ r }: { r: (typeof ROWS)[number] }) {
  return (
    <article className="hw-ex" data-hw-seq aria-labelledby={`hw-ex-${r.n}`}>
      <div className="hw-ex-t"><span className="hw-ex-n" aria-hidden="true">{String(r.n).padStart(2, '0')}</span><h3 id={`hw-ex-${r.n}`}><span className="hw-sr">Step {r.n}: </span>{r.t}</h3></div>
      <div className="hw-ex-lanes">
        <div className="hw-lane ms"><h4>We do</h4><p>{r.we}</p></div>
        <div className="hw-lane you"><h4>You do</h4><p>{r.you}</p></div>
      </div>
      <div className="hw-ex-rc"><h4>You receive</h4><p>{r.rc}</p></div>
    </article>
  );
}
