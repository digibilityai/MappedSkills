import Link from 'next/link';
import { ContactForm } from '@/components/forms/ContactForm';
import { EnquiryConfirmationGate } from '../cplus/contact/EnquiryConfirmationGate';
import { IntentLink } from '../cplus/contact/IntentLink';
import { CONTACT as C, THANKS_CALL as TC, THANKS_PLAIN as T, THANKS_NEUTRAL as N } from '../cplus/contact/content';
import '../cplus/contact/contact.css';
import './b2.css';

/**
 * Contact and Thank you (B2 Revision 3). The page around the form is new; the form, its fields, validation, anti-spam,
 * analytics and POST /api/enquiry are untouched (components/forms/ContactForm.tsx). Contact renders from
 * app/(pages)/contact/layout.tsx so the two intentions share one form instance and typed values survive a switch.
 * Thank you: the one-time marker chooses the confirmation; every other arrival gets the neutral state, which is also the
 * server and no-JavaScript output. Neither state fires an event (lead_form_submitted comes from the form on a 2xx).
 */
export function ContactB2() {
  return (
    <div className="b2c">
      <div className="b2c-wrap b2c-split">
        <div className="b2c-intro">
          <p className="b2c-kick">{C.kicker}</p>
          <h1 id="sc-h1" className="b2c-h1">{C.h1.a} <span>{C.h1.b}</span></h1>
          <p className="b2c-lede">{C.lede}</p>
          <ol className="b2c-how" aria-label={C.howLabel}>{C.how.map((t) => <li key={t}>{t}</li>)}</ol>
        </div>
        <div className="b2c-form" id="request">
          <p className="b2c-form-h">{C.card.title}</p>
          <p className="b2c-form-s">{C.card.sub}</p>
          <ContactForm labelledBy="sc-h1" />
        </div>
        <aside className="b2c-inc" aria-label="What to mention">
          <b>Helpful to mention, if you can</b>
          What your business sells, what you want advertising to achieve, and what is running now. Rough numbers and open questions are fine.
        </aside>
      </div>

      <section className="b2c-paper" aria-labelledby="ct-talk">
        <div className="b2c-wrap">
          <p className="b2c-kick">{C.talk.kicker}</p>
          <h2 id="ct-talk" className="b2c-h2">{C.talk.h.a} {C.talk.h.b}</h2>
          <ol className="b2c-talk">{C.talk.steps.map((s) => <li key={s.n}><span className="n">{s.n}</span><h3>{s.t}</h3><p>{s.d}</p></li>)}</ol>
          <div className="b2c-calm">
            <h2>{C.calm.h.a} {C.calm.h.b}</h2>
            <div className="acts">
              <IntentLink intent="call" className="b2c-btn primary">{C.calm.call}</IntentLink>
              <IntentLink intent="enquiry" className="b2c-btn">{C.calm.altLink}</IntentLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

type Row = { n: string; t: string; s: string; state: string };
function Receipt({ rows, title, tag }: { rows: Row[]; title: string; tag: string }) {
  return (
    <figure className="b2c-rcpt">
      <figcaption className="b2c-rcpt-hd">{title} · {tag}</figcaption>
      <ol>
        {rows.map((r) => (
          <li key={r.n} className={'is-' + r.state}>
            <span className="dot" aria-hidden="true">{r.state === 'done' ? '✓' : r.n.replace(/^0/, '')}</span>
            <b>{r.t}</b>
            <span className="b2c-chip">{r.s}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

const NEXT = [
  { href: '/how-it-works', t: 'How it works', d: 'The five steps, from the first conversation to the monthly review.', go: 'Read' },
  { href: '/work', t: 'Our work', d: 'Case studies for Google Ads and Meta Ads.', go: 'Browse' },
  { href: '/faq', t: 'Questions', d: 'Cost, results and what we will not promise.', go: 'Read' },
];

function Next() {
  return (
    <section className="b2c-paper" aria-labelledby="ty-wait">
      <div className="b2c-wrap">
        <div className="b2c-nxt">
          <div><p className="b2c-kick">While you wait</p><h2 id="ty-wait" className="b2c-h2" style={{ fontSize: '2rem' }}>One thing worth reading.</h2></div>
          {NEXT.map((n) => <Link key={n.href} href={n.href}><b>{n.t}</b><span>{n.d}</span><span className="go">{n.go} <span aria-hidden="true">&nbsp;↗</span></span></Link>)}
        </div>
      </div>
    </section>
  );
}

function Confirmed({ call }: { call: boolean }) {
  const d = call ? TC : T;
  return (
    <>
      <div className="b2c-wrap b2c-ty">
        <div>
          <p className="b2c-kick">{d.kicker}</p>
          <h1 id="ty-h1" className="b2c-h1">{d.h1}</h1>
          <p className="b2c-lede">{d.lede}</p>
        </div>
        <Receipt rows={d.rows} title={call ? 'Your call request' : 'Your enquiry'} tag="Next steps" />
      </div>
      <Next />
    </>
  );
}

function Neutral() {
  return (
    <div className="b2c-wrap b2c-ty" style={{ gridTemplateColumns: '1fr' }}>
      <div>
        <h1 id="ty-h1" className="b2c-h1">{N.h1}</h1>
        <p className="b2c-lede">{N.lede}</p>
        <p style={{ marginTop: 22 }}><Link className="b2c-btn primary" href="/contact">{N.link}<span aria-hidden="true">&nbsp;↗</span></Link></p>
      </div>
    </div>
  );
}

export function ThanksB2() {
  return (
    <div className="b2c">
      <EnquiryConfirmationGate confirmed={<Confirmed call={false} />} callConfirmed={<Confirmed call />} neutral={<Neutral />} />
    </div>
  );
}
