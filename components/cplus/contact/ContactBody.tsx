import Link from 'next/link';
import { Mark } from '@/components/direction-c/primitives';
import { BookingLink } from '@/components/analytics/BookingLink';
import { ContactForm } from '@/components/forms/ContactForm';
import { Icon } from '../Icons';
import { CONTACT_PLAIN as C, SCHEDULE_PLAIN as S, THANKS_PLAIN as T, THANKS_NEUTRAL as N } from './content';
import { EnquiryConfirmationGate } from './EnquiryConfirmationGate';
import './contact.css';
import { Breadcrumb } from '../Breadcrumb';

/**
 * C+ Contact, Schedule a call and Thank you ("Row 01"): the approved prototype's page bodies (proto/direction-c-plus
 * 0a8b611, ContactH.tsx), unchanged in markup and copy, with the production behaviour put back where the prototype
 * stood in for it:
 *   - Contact renders the real `ContactForm` (POST /api/enquiry, its validation, honeypot, idempotency, attribution
 *     and analytics, untouched) in place of the prototype's DemoContactForm, which sent nothing;
 *   - Schedule's booking button is the real `BookingLink` (same URL and `meeting_started` event as before);
 *   - links point at the live routes;
 *   - the prototype's own labels, demo controls, notes and "simulated screen" frame are not rendered.
 * No contact details, reply time, call length, availability, price or host is stated.
 */

/* The existing booking destination (PAGE-058): the canonical event, used whenever the variable is unset. */
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/mappedskills/client-discovery';

type Row = { n: string; t: string; s: string; state: string };

/* The three-step sheet used by Schedule and Thank you. State is carried by text and shape, never colour alone. */
function StepSheet({ rows, caption, title }: { rows: Row[]; caption: string; title: string }) {
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
      <figcaption className="px-cap">{caption}</figcaption>
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
export function ScheduleBody() {
  return (
    <>
      <section className="b-hero ct-hero" aria-labelledby="ct-h1">
        <div className="px-wrap ct-hero-g">
          <div className="ct-intro">
            <Breadcrumb current={S.kicker} />
            <h1 id="ct-h1" className="b-h1 ct-h1">
              {S.h1}
            </h1>
            <p className="b-lede ct-lede">{S.lede}</p>
            <div className="ct-book">
              <BookingLink href={CALENDLY_URL} className="ct-send ct-book-btn">
                {S.book}
                <span className="px-sr"> (opens in a new tab)</span>
                <Icon name="arrow" size={20} />
              </BookingLink>
              <p className="ct-book-note">{S.bookNote}</p>
            </div>
          </div>
          <StepSheet rows={S.rows} caption={S.sheetCaption} title={C.sheetTitle} />
        </div>
      </section>

      <section className="b-sec b-paper ct-call" aria-labelledby="ct-h-covers">
        <div className="px-wrap ct-call-g">
          <div>
            <h2 id="ct-h-covers" className="b-kicker ct-call-k">
              {S.covers.kicker}
            </h2>
            <ul className="ct-list">
              {S.covers.items.map((t) => (
                <li key={t}>
                  <Mark state="named" /> <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="b-kicker ct-call-k">{S.bring.kicker}</p>
            <h2 className="b-h2 b-h2-s">{S.bring.h}</h2>
            <ul className="ct-list">
              {S.bring.items.map((t) => (
                <li key={t}>
                  <Mark state="open" /> <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="b-sec ct-alt" aria-labelledby="ct-h-write">
        <div className="px-wrap ct-alt-g">
          <div>
            <p className="b-kicker">{S.write.kicker}</p>
            <h2 id="ct-h-write" className="b-h2 b-h2-s">
              {S.write.h}
            </h2>
          </div>
          <Link href="/contact" className="ct-btn-out">
            <Icon name="form" size={20} />
            {S.write.link}
          </Link>
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
  return <EnquiryConfirmationGate confirmed={<ThanksConfirmed />} neutral={<ThanksNeutral />} />;
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
