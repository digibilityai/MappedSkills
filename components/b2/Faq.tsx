import Link from 'next/link';
import { ActionLink } from '../paid-advertising/ActionLink';
import { Band } from './Band';
import { FaqTools } from '../cplus/faq/FaqTools';
import { FAQ_GROUPS } from '../cplus/faq/faqData';
import '../paid-advertising/paid-advertising.css';
import './b2.css';

/**
 * /faq (B2 Revision 3). Six buyer-concern groups, native <details> (answers stay readable and operable without
 * JavaScript), every question id and the five live group ids kept as anchors, and the route's FAQPage built from the same
 * array this page renders (faqData.ts). FaqTools supplies "Open all answers" and opens a question named in the address.
 */
const FIRST_PAINT = `try{document.documentElement.classList.add('px-js')}catch(e){}`;
const QTOTAL = FAQ_GROUPS.reduce((n, g) => n + g.items.length, 0);

export function Faq() {
  return (
    <div className="pa b2">
      <script dangerouslySetInnerHTML={{ __html: FIRST_PAINT }} />
      <section className="b2-fq pa-wrap" aria-labelledby="fq-h1">
        <div>
          <p className="pa-eyebrow">Questions, answered plainly</p>
          <h1 id="fq-h1">What owners ask <span>before they start.</span></h1>
          <p className="b2-lede">Short answers, in plain language, including the ones that cost us work. If yours is not here, ask us.</p>
          <nav aria-label="Question groups">
            <ul className="b2-jump">{FAQ_GROUPS.map((g) => <li key={g.id}><a href={'#' + g.id}>{g.title}</a></li>)}</ul>
          </nav>
        </div>
        <aside className="b2-side" aria-label="Still deciding">
          <b>Still deciding?</b>
          <p>Nothing starts until you have seen the plan and approved it. A call is there if you would rather talk. It is not required.</p>
          <p><ActionLink href="/how-it-works" variant="text">See how it works</ActionLink></p>
        </aside>
      </section>

      <div className="pa-wrap" id="faq-body" style={{ paddingBottom: 'clamp(48px,6vw,96px)' }}>
        <div className="b2-toolsrow">
          <span>{QTOTAL} questions in {FAQ_GROUPS.length} groups. Each opens and closes by itself.</span>
          <FaqTools scope="#faq-body" total={QTOTAL} />
        </div>
        {FAQ_GROUPS.map((g) => (
          <section key={g.id} className="b2-grp" aria-labelledby={g.id}>
            {g.legacyId ? <span id={g.legacyId} className="b2-legacy" aria-hidden="true" /> : null}
            <div>
              <h2 id={g.id}>{g.title}</h2>
              <p className="ln">{g.line}</p>
              <p className="cnt">{g.items.length} QUESTIONS</p>
            </div>
            <ul className="b2-list-q">
              {g.items.map((qa) => (
                <li key={qa.id}>
                  <details id={qa.id} className="b2-d">
                    <summary><span>{qa.q}</span><span className="b2-pm" aria-hidden="true" /></summary>
                    <div className="b2-a">
                      <p className="direct">{qa.direct}</p>
                      {qa.rows && <dl>{qa.rows.map((r) => <div key={r.t}><dt>{r.t}</dt><dd>{r.d}</dd></div>)}</dl>}
                      {qa.body?.map((p) => <p key={p}>{p}</p>)}
                      {qa.more && <p className="more"><Link href={qa.more.href}>{qa.more.label}</Link></p>}
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <Band id="fq-close" h="Ask us. You will get a straight answer." body="Tell us what is going on in your business. If we are not the right fit, we will say so.">
        <ActionLink href="/contact?intent=call" variant="text">Request a call</ActionLink>
      </Band>
    </div>
  );
}
