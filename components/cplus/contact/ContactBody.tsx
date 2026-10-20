import Link from 'next/link';
import { Mark } from '@/components/direction-c/primitives';
import { ContactForm } from '@/components/forms/ContactForm';
import { Icon } from '../Icons';
import {
  CONTACT_PLAIN as C,
  SCHEDULE_PLAIN as S,
  THANKS_CALL as TC,
  THANKS_PLAIN as T,
  THANKS_NEUTRAL as N,
} from './content';
import { EnquiryConfirmationGate } from './EnquiryConfirmationGate';
import './contact.css';
import { Breadcrumb } from '../Breadcrumb';

/**
 * C+ Contact, Schedule a call and Thank you ("Row 01"): the approved prototype's page bodies (proto/direction-c-plus
 * 0a8b611, ContactH.tsx), unchanged in markup and copy, with the production behaviour put back where the prototype
 * stood in for it:
 *   - Contact renders the real `ContactForm` (POST /api/enquiry, its validation, honeypot, idempotency, attribution
 *     and analytics, untouched) in place of the prototype's DemoContactForm, which sent nothing;
 *   - Schedule is the DEC-062 "Request a call" page: the same `ContactForm` in its `call` variant (no booking link,
 *     no Calendly, no `meeting_started`), approved G1 design and copy (docs/schedule-call-redesign/g1);
 *   - links point at the live routes;
 *   - the prototype's own labels, demo controls, notes and "simulated screen" frame are not rendered.
 * No contact details, reply time, call length, availability, price or host is stated.
 */

type Row = { n: string; t: string; s: string; state: string };

/* The three-step sheet used by Schedule and Thank you. State is carried by text and shape, never colour alone. */
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
export function ContactBody() {
  return (
    <>
      <section className="b-hero ct-hero" aria-labelledby="ct-h1">
        <div className="px-wrap ct-hero-g">
          <div className="ct-intro">
            <Breadcrumb current={C.kicker} />
            <h1 id="ct-h1" className="b-h1 ct-h1">
              {C.h1}
            </h1>
            <p className="b-lede ct-lede">{C.lede}</p>
            <p className="ct-talk">
              <Link href="/schedule-call">{C.talk} →</Link>
            </p>
          </div>
          <div className="ct-form-col">
            <div className="hw-sheet ct-sheet ct-form-sheet">
              <div className="hw-sh-head">
                <span className="hw-sh-title">{C.sheetTitle}</span>
              </div>
              <div className="ct-row01">
                <span className="hw-row-n">01</span>
                <span className="hw-row-l">{C.rowLabel}</span>
              </div>
              <div className="ct-form-body">
                <ContactForm labelledBy="ct-h1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="b-sec b-ink ct-next" aria-labelledby="ct-h-next">
        <div className="px-wrap">
          <p className="b-kicker">{C.next.kicker}</p>
          <h2 id="ct-h-next" className="b-h2">
            {C.next.h.a} <span className="b-named">{C.next.h.b}</span>
          </h2>
          <ol className="ct-next-l">
            {C.next.steps.map((s, i) => (
              <li key={s.n} className={i === 0 ? 'is-here' : undefined}>
                <span className="ct-next-n" aria-hidden="true">
                  {s.n}
                </span>
                <h3 className="ct-next-t">{s.t}</h3>
                <p className="ct-next-d">{s.d}</p>
                {i === 0 && (
                  <p className="ct-next-here">
                    <Mark state="owned" /> {C.next.here}
                  </p>
                )}
              </li>
            ))}
          </ol>
          <p className="ct-next-link">
            <Link href="/how-it-works">{C.next.link} →</Link>
          </p>
        </div>
      </section>

      <section className="b-sec b-paper ct-alt" aria-labelledby="ct-h-talk">
        <div className="px-wrap ct-alt-g">
          <div>
            <p className="b-kicker">{C.talkSec.kicker}</p>
            <h2 id="ct-h-talk" className="b-h2 b-h2-s">
              {C.talkSec.h}
            </h2>
            <p className="b-body ct-alt-b">{C.talkSec.body}</p>
          </div>
          <Link href="/schedule-call" className="ct-btn-out">
            <Icon name="phone" size={20} />
            {C.talkSec.button}
          </Link>
        </div>
      </section>
    </>
  );
}

/* ----------------------------------------------------------------- schedule */
/**
 * DEC-062 "Request a call". The form is the primary element and starts in the first screen at every width. The
 * three-line "how it works" list (wide screens only) and the note under the button say it is a request, not a booking.
 */
export function ScheduleBody() {
  return (
    <>
      <section className="b-hero sc-hero" aria-labelledby="sc-h1">
        <div className="px-wrap sc-hero-g">
          <div className="sc-intro">
            <Breadcrumb current={S.kicker} />
            <p className="b-kicker">{S.kicker}</p>
            <h1 id="sc-h1" className="b-h1 sc-h1">
              {S.h1.a} <span className="b-named">{S.h1.b}</span>
            </h1>
            <p className="b-lede sc-lede">{S.lede}</p>
            <ol className="sc-how" aria-label={S.howLabel}>
              {S.how.map((t, i) => (
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
              <span className="sc-card-t">{S.card.title}</span>
              <span className="sc-card-s">{S.card.sub}</span>
            </div>
            <div className="sc-card-body">
              <ContactForm labelledBy="sc-h1" variant="call" />
            </div>
          </div>
        </div>
      </section>

      <section className="b-sec b-paper sc-talk" aria-labelledby="sc-h-talk">
        <div className="px-wrap">
          <p className="b-kicker">{S.talk.kicker}</p>
          <h2 id="sc-h-talk" className="b-h2 sc-h2">
            {S.talk.h.a} <span className="b-named">{S.talk.h.b}</span>
          </h2>
          <ol className="sc-seq">
            {S.talk.steps.map((s, i) => (
              <li key={s.n} className={i === S.talk.steps.length - 1 ? 'sc-step is-next' : 'sc-step'}>
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
              {S.calm.h.a} <span className="sc-calm-2">{S.calm.h.b}</span>
            </h2>
            <p className="sc-calm-p">{S.calm.body}</p>
          </div>
          <div className="sc-calm-a">
            <a className="dc-btn dc-btn-secondary sc-back" href="#request">
              <span aria-hidden="true" className="dc-mk" />
              {S.calm.back}
            </a>
            <p className="sc-alt">
              {S.calm.alt}{' '}
              <Link href="/contact">
                {S.calm.altLink}
                <Icon name="arrow" size={18} />
              </Link>
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
            <StepSheet rows={T.rows} caption={T.sheetCaption} title={C.sheetTitle} />
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
