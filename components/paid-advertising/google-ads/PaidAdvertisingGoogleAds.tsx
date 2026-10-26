import Link from 'next/link';
import { ActionLink } from '../ActionLink';
import { SectionHeading } from '../SectionHeading';
import { PaReveal } from '../PaReveal';
import { SearchAdMockup } from '../AdMockups';
import { HERO, WHY, BREAKS, FIT, STEPS, CASE, COST, GOOGLE_FAQS, CLOSE } from './content';
import '../paid-advertising.css';
import './google-ads.css';

const Tick = () => <svg className="pa-tick" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="m4.5 10.5 3.6 3.6 7.4-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Plus = () => <svg className="pa-tick" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M10 4.5v11M4.5 10h11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>;
const Envelope = () => <svg className="gx-env" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 8 8 6 8-6" /></svg>;

export function PaidAdvertisingGoogleAds() {
  return <div className="pa pa-gx">
    <PaReveal />
    {/* 1 Hero */}
    <section className="pa-hero pa-wrap" aria-labelledby="gx-h1">
      <div className="pa-hero-copy">
        <p className="pa-eyebrow">{HERO.eyebrow}</p>
        <h1 id="gx-h1">Reach people <span>already searching</span> for what you sell.</h1>
        <p className="gx-tagline">{HERO.tagline}</p>
        <p className="pa-lede">{HERO.body}</p>
        <div className="pa-actions"><ActionLink href="/contact">Discuss Google Ads</ActionLink><ActionLink href="/contact?intent=call" variant="text">Request a call</ActionLink></div>
      </div>
      <div className="pa-hero-visual"><div className="gx-hero-vis">
        <div className="gx-ad"><span className="sx-pill">They search</span><div className="sx-panel"><SearchAdMockup /></div></div>
        <svg className="gx-link" viewBox="0 0 20 40" aria-hidden="true" focusable="false"><path d="M10 0 V36" pathLength="1" /><path d="m5 31 5 6 5-6" fill="none" /></svg>
        <p className="gx-cue"><Envelope /><span><b>New enquiry</b><small>Sent from your website</small></span></p>
      </div></div>
    </section>

    {/* 2 Why Google Ads */}
    <section className="pa-section pa-wrap gx-why" aria-labelledby="gx-why">
      <SectionHeading id="gx-why" eyebrow="Why Google Ads">Why Google Ads: <span className="pa-em">people are already looking</span></SectionHeading>
      <p className="gx-lede">{WHY.lede}</p>
      <ol className="gx-journey" aria-label="From search to enquiry" data-reveal="line">{WHY.stages.map((s, i) => <li key={s.k} style={{ '--i': i } as React.CSSProperties}><span className="gx-node" aria-hidden="true">{i + 1}</span><h3>{s.k}</h3><p>{s.d}</p></li>)}</ol>
      <p className="gx-journey-note">{WHY.note}</p>
    </section>

    {/* 3 Where campaigns break */}
    <section className="pa-section pa-wrap gx-breaks-wrap" aria-labelledby="gx-breaks">
      <SectionHeading id="gx-breaks" eyebrow="What we manage">Where campaigns break, and <span className="pa-em">what we manage</span></SectionHeading>
      <ol className="gx-breaks">{BREAKS.rows.map((r, i) => <li key={r.k} data-reveal>
        <span className="gx-rail" aria-hidden="true">{i + 1}</span>
        <div className="gx-break">
          <h3>{r.k}</h3>
          <p className="gx-wrong"><b>Where it breaks</b>{r.wrong}</p>
          <div className={'gx-split' + (r.separate || r.yours ? ' has-sep' : '')}>
            <div className="gx-manage"><b><Tick />We manage</b><p>{r.manage}</p></div>
            {r.separate && <div className="gx-sep"><b><Plus />Agreed separately</b><p>{r.separate}</p></div>}
            {r.yours && <div className="gx-yours"><b>Your side</b><p>{r.yours}</p></div>}
          </div>
        </div>
      </li>)}</ol>
      <div className="gx-notes" data-reveal><p>{BREAKS.fee}</p><p>{BREAKS.reporting}</p></div>
      <div className="gx-band" data-reveal><p>{BREAKS.ctaLead}</p><ActionLink href="/contact" variant="dark">Discuss Google Ads</ActionLink></div>
    </section>

    {/* 4 Is Google Ads right */}
    <section className="pa-section pa-wrap" aria-labelledby="gx-fit">
      <SectionHeading id="gx-fit" eyebrow="Fit">Is Google Ads <span className="pa-em">right for your business?</span></SectionHeading>
      <div className="gx-fit">
        <div className="gx-good" data-reveal><h3>Often a good fit</h3><ul>{FIT.good.map(g => <li key={g.t}><Tick /><span><b>{g.t}</b><small>{g.d}</small></span></li>)}</ul></div>
        <div className="gx-not" data-reveal><h3>May be premature</h3><ul>{FIT.premature.map(p => <li key={p}><Plus />{p}</li>)}</ul></div>
      </div>
      <p className="gx-fit-note">{FIT.note} {FIT.meta.lead} <Link href={FIT.meta.href}>{FIT.meta.label}</Link>.</p>
    </section>

    {/* 5 How we work */}
    <section className="pa-section pa-wrap" aria-labelledby="gx-how">
      <SectionHeading id="gx-how" eyebrow="How we work">How we work on <span className="pa-em">your Google Ads</span></SectionHeading>
      <div className="gx-how">
        <div className="gx-how-side" data-reveal><p className="gx-approval">You see our findings, a recommended plan and a proposal before any work starts. <b>Nothing begins until you approve it.</b></p><ActionLink href="/how-it-works" variant="text">See How We Work</ActionLink></div>
        <ol className="gx-timeline" data-reveal="line">{STEPS.map((s, i) => <li key={s.k} style={{ '--i': i } as React.CSSProperties}><span className="gx-node" aria-hidden="true">{i + 1}</span><div><h3>{s.k}</h3><p>{s.d}</p></div></li>)}</ol>
      </div>
    </section>

    {/* 6 Case */}
    <section className="pa-section pa-ink gx-case" aria-labelledby="gx-case"><div className="pa-wrap">
      <SectionHeading id="gx-case" eyebrow="Google Ads work">Google Ads for <span className="pa-em">an online baking school</span></SectionHeading>
      <div className="gx-case-grid" data-reveal>
        <div className="gx-case-main">
          <p className="gx-case-tags">{CASE.tags.map(t => <span key={t}>{t}</span>)}</p>
          <h3>{CASE.name}</h3>
          <p>{CASE.intro}</p>
          <p>{CASE.context}</p>
        </div>
        <div className="gx-case-did"><h4>What we did</h4><ol>{CASE.did.map((d, i) => <li key={d.k}><span aria-hidden="true">{i + 1}</span><div><b>{d.k}</b><p>{d.d}</p></div></li>)}</ol></div>
      </div>
      <div className="gx-placed" data-reveal><h4>What the work put in place</h4><ul>{CASE.placed.map(p => <li key={p}><Tick />{p}</li>)}</ul></div>
      <div className="gx-case-links"><ActionLink href="/portfolio/google-ads-for-online-courses" variant="text">Read the case study</ActionLink><ActionLink href="/work" variant="text">View All Case Studies</ActionLink></div>
    </div></section>

    {/* 7 Cost */}
    <section className="pa-section pa-wrap" aria-labelledby="gx-cost">
      <SectionHeading id="gx-cost" eyebrow="Cost and expectations">What it costs, and <span className="pa-em">what to expect</span></SectionHeading>
      <div className="gx-cost">
        <div className="gx-receipt" data-reveal>
          <p className="gx-receipt-k">One click, three kinds of cost</p>
          {COST.lines.map(l => <p key={l.t} className="gx-line"><span className="gx-line-t">{l.t}</span><i aria-hidden="true" /><span className="gx-line-d">{l.d}</span></p>)}
          <p className="gx-line gx-line--sep"><span className="gx-line-t"><Plus />{COST.separate.t}</span><i aria-hidden="true" /><span className="gx-line-d">{COST.separate.d}</span></p>
          <p className="gx-receipt-foot">No amounts. Every proposal is tailored.</p>
        </div>
        <div className="gx-expect" data-reveal><p>{COST.expect}</p><ActionLink href="/pricing" variant="text">Understand Our Pricing Approach</ActionLink></div>
      </div>
    </section>

    {/* 8 FAQ and close */}
    <section className="pa-section pa-wrap gx-faq-wrap" aria-labelledby="gx-faq">
      <SectionHeading id="gx-faq" eyebrow="Questions">A few questions <span className="pa-em">before we talk</span></SectionHeading>
      <div className="pa-faq gx-faq" data-reveal>{GOOGLE_FAQS.map(f => <details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}</p></details>)}</div>
    </section>
    <section className="pa-close pa-wrap" aria-labelledby="gx-close" data-reveal><div><h2 id="gx-close">{CLOSE.h}</h2><p>{CLOSE.body}</p></div><ActionLink href="/contact" variant="dark">Discuss Google Ads</ActionLink></section>
  </div>;
}
