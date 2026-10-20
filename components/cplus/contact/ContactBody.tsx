import Link from 'next/link';
import { ContactForm } from '@/components/forms/ContactForm';
import { Icon } from '../Icons';
import { CONTACT as C, THANKS_CALL as TC, THANKS_PLAIN as T, THANKS_NEUTRAL as N } from './content';
import { EnquiryConfirmationGate } from './EnquiryConfirmationGate';
import { IntentLink } from './IntentLink';
import './contact.css';
import { Breadcrumb } from '../Breadcrumb';

/**
 * Contact (C1, DEC-071) and Thank you.
 *
 * Contact is the one contact page: `/contact` (enquiry) and `/contact?intent=call` (call request; also where the old
 * `/schedule-call` URL redirects). Its layout is the owner-approved DEC-062 "Request a call" design (hero with the
 * form card, "What we'll talk about", the closing reassurance), now around the consolidated `ContactForm`, which lets
 * the visitor choose and switch the intention. It renders from `app/(pages)/contact/layout.tsx`, shared by both
 * intentions, so moving between them never remounts the form.
 *
 * Thank you is the approved C+ design: the enquiry confirmation, the DEC-062 call-request confirmation, or the neutral
 * state, chosen by the one-time marker the form leaves after a 2xx.
 * No contact details, reply time, call length, availability, price or host is stated anywhere here.
 */

type Row = { n: string; t: string; s: string; state: string };

/* The three-step sheet used by Thank you. State is carried by text and shape, never colour alone. */
function StepSheet({ rows, caption, title }: { rows: Row[]; caption?: string; title: string }) {
  return (
    <figure className="ct-steps-fig">
      <div className="hw-sheet ct-sheet">
        <div className="hw-sh-head hw-sh-head-s">
          <span className="hw-sh-title">{title}</span>
        </div>
        <ol className="ct-rows">
          {rows.map((r) => (
            <li key={r.n} className={'is-' + r.state}>
              <span className="ct-row-n" aria-hidden="true">
                {r.n}
              </span>
              <span className="ct-row-t">{r.t}</span>
              <span className="ct-row-s">
                <span className="ct-row-m" aria-hidden="true">
                  {r.state === 'done' ? <Icon name="check" size={14} /> : null}
                </span>
                {r.s}
              </span>
            </li>
          ))}
        </ol>
      </div>
      {caption ? <figcaption className="px-cap">{caption}</figcaption> : null}
    </figure>
  );
}

/* ------------------------------------------------------------------ contact */
/** The form is the primary element and starts in the first screen at every width. */
export function ContactBody() {
  return (
    <>
      <section className="b-hero sc-hero" aria-labelledby="sc-h1">
        <div className="px-wrap sc-hero-g">
          <div className="sc-intro">
            <Breadcrumb current={C.kicker} />
            <p className="b-kicker">{C.kicker}</p>
            <h1 id="sc-h1" className="b-h1 sc-h1">
              {C.h1.a} <span className="b-named">{C.h1.b}</span>
            </h1>
            <p className="b-lede sc-lede">{C.lede}</p>
            <ol className="sc-how" aria-label={C.howLabel}>
              {C.how.map((t, i) => (
                <li key={t}>
                  <span className="sc-how-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
          <div className="sc-card" id="request">
            <div className="sc-card-head">
              <span className="sc-card-t">{C.card.title}</span>
              <span className="sc-card-s">{C.card.sub}</span>
            </div>
            <div className="sc-card-body">
              <ContactForm labelledBy="sc-h1" />
            </div>
          </div>
        </div>
      </section>

      <section className="b-sec b-paper sc-talk" aria-labelledby="sc-h-talk">
        <div className="px-wrap">
          <p className="b-kicker">{C.talk.kicker}</p>
          <h2 id="sc-h-talk" className="b-h2 sc-h2">
            {C.talk.h.a} <span className="b-named">{C.talk.h.b}</span>
          </h2>
          <ol className="sc-seq">
            {C.talk.steps.map((s, i) => (
              <li key={s.n} className={i === C.talk.steps.length - 1 ? 'sc-step is-next' : 'sc-step'}>
                <span className="sc-step-n" aria-hidden="true">
                  {s.n}
                </span>
                <h3 className="sc-step-t">{s.t}</h3>
                <p className="sc-step-p">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="b-sec b-ink sc-calm" aria-labelledby="sc-h-calm">
        <div className="px-wrap sc-calm-g">
          <div>
            <h2 id="sc-h-calm" className="b-h2 sc-h2">
              {C.calm.h.a} <span className="sc-calm-2">{C.calm.h.b}</span>
            </h2>
            <p className="sc-calm-p">{C.calm.body}</p>
          </div>
          <div className="sc-calm-a">
            <IntentLink intent="call" className="dc-btn dc-btn-secondary sc-back">
              <span aria-hidden="true" className="dc-mk" />
              {C.calm.call}
            </IntentLink>
            <p className="sc-alt">
              {C.calm.alt}{' '}
              <IntentLink intent="enquiry">
                {C.calm.altLink}
                <Icon name="arrow" size={18} />
              </IntentLink>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------- thanks */
/**
 * The confirmation is shown only when `ContactForm` left a fresh one-time marker after a 2xx from /api/enquiry; every
 * other arrival gets the neutral state, which is also the server-rendered and no-JavaScript output. Neither state
 * fires an event.
 */
export function ThanksBody() {
  return (
    <EnquiryConfirmationGate
      confirmed={<ThanksConfirmed />}
      callConfirmed={<ThanksCallConfirmed />}
      neutral={<ThanksNeutral />}
    />
  );
}

function ThanksNeutral() {
  return (
    <section className="b-hero ct-hero ct-thanks" aria-labelledby="ct-h1">
      <div className="px-wrap">
        <div className="ct-intro">
          <h1 id="ct-h1" className="b-h1 ct-h1">
            {N.h1}
          </h1>
          <p className="b-lede ct-lede">{N.lede}</p>
          <p className="ct-talk">
            <Link href="/contact">
              {N.link}
              <span aria-hidden="true"> →</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function ThanksConfirmed() {
  return (
    <>
      <section className="b-hero ct-hero ct-thanks" aria-labelledby="ct-h1">
        <div className="px-wrap">
          <div className="ct-hero-g ct-thanks-g">
            <div className="ct-intro">
              <p className="b-kicker">{T.kicker}</p>
              <h1 id="ct-h1" className="b-h1 ct-h1">
                {T.h1}
              </h1>
              <p className="b-lede ct-lede">{T.lede}</p>
            </div>
            <StepSheet rows={T.rows} caption={T.sheetCaption} title={T.sheetTitle} />
          </div>
        </div>
      </section>

      <section className="b-sec b-paper ct-wait" aria-labelledby="ct-h-wait">
        <div className="px-wrap">
          <p className="b-kicker">{T.wait.kicker}</p>
          <h2 id="ct-h-wait" className="b-h2 b-h2-s">
            {T.wait.h}
          </h2>
          <p className="b-body ct-wait-b">
            {T.wait.body}{' '}
            <Link href="/how-it-works" className="ct-inline">
              {T.wait.link}
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}

/** DEC-062 (D3): after a successful `/schedule-call` request. Same layout as the enquiry confirmation. */
function ThanksCallConfirmed() {
  return (
    <>
      <section className="b-hero ct-hero ct-thanks" aria-labelledby="ct-h1">
        <div className="px-wrap">
          <div className="ct-hero-g ct-thanks-g">
            <div className="ct-intro">
              <p className="b-kicker">{TC.kicker}</p>
              <h1 id="ct-h1" className="b-h1 ct-h1">
                {TC.h1}
              </h1>
              <p className="b-lede ct-lede">{TC.lede}</p>
            </div>
            <StepSheet rows={TC.rows} title={TC.sheetTitle} />
          </div>
        </div>
      </section>

      <section className="b-sec b-paper ct-wait" aria-labelledby="ct-h-wait">
        <div className="px-wrap">
          <p className="b-kicker">{T.wait.kicker}</p>
          <h2 id="ct-h-wait" className="b-h2 b-h2-s">
            {T.wait.h}
          </h2>
          <p className="b-body ct-wait-b">
            {T.wait.body}{' '}
            <Link href="/how-it-works" className="ct-inline">
              {T.wait.link}
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
