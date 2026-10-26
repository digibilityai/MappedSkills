import Link from 'next/link';
import { ActionLink } from '../ActionLink';
import { SectionHeading } from '../SectionHeading';
import { PaReveal } from '../PaReveal';
import { SearchAdMockup, MetaAdMockup } from '../AdMockups';
import { HERO, CARDS, FIT, SCOPE, WORK, PROCESS, COST, SERVICES_FAQS, CLOSE } from './content';
import '../paid-advertising.css';
import './services.css';

const Tick = () => <svg className="pa-tick" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="m4.5 10.5 3.6 3.6 7.4-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Plus = () => <svg className="pa-tick" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M10 4.5v11M4.5 10h11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>;
const Glyph = ({ k }: { k: 'search' | 'browse' | 'both' }) => <svg className="pa-fit-glyph" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
  {k === 'search' && <><circle cx="17" cy="17" r="9" /><path d="m24 24 9 9" /></>}
  {k === 'browse' && <><rect x="9" y="5" width="22" height="30" rx="4" /><path d="M14 14h12M14 20h12M14 26h7" /></>}
  {k === 'both' && <><circle cx="14" cy="16" r="7" /><path d="m19.5 21.5 5 5" /><rect x="22" y="8" width="13" height="22" rx="3" /></>}
</svg>;

export function PaidAdvertisingServices() {
  return <div className="pa pa-sx">
    <PaReveal />
    {/* 1 Hero */}
    <section className="pa-hero pa-wrap" aria-labelledby="sx-h1">
      <div className="pa-hero-copy">
        <p className="pa-eyebrow">{HERO.eyebrow}</p>
        <h1 id="sx-h1">Reach more of the right customers with <span>Google Ads and Meta Ads.</span></h1>
        <p className="pa-lede">{HERO.lede}</p>
        <div className="pa-actions"><ActionLink /><ActionLink href="#services" variant="text">{HERO.anchor}</ActionLink></div>
      </div>
      <div className="pa-hero-visual"><div className="sx-stage">
        <div className="sx-lane sx-lane--a"><span className="sx-pill">They search</span><div className="sx-panel"><SearchAdMockup /></div></div>
        <div className="sx-lane sx-lane--b"><span className="sx-pill">They discover</span><div className="sx-panel"><MetaAdMockup /></div></div>
        <svg className="sx-merge" viewBox="0 0 100 15" aria-hidden="true" focusable="false"><path d="M25 0 C25 9, 44 11, 50 14" pathLength="1" /><path d="M75 0 C75 9, 56 11, 50 14" pathLength="1" /></svg>
        <p className="sx-end"><span>An enquiry or a purchase</span></p>
      </div></div>
    </section>

    {/* 2 Google Ads and Meta Ads */}
    <section id="services" className="pa-section pa-ink" aria-labelledby="sx-services"><div className="pa-wrap">
      <SectionHeading id="sx-services" eyebrow="Our services">Reach customers <span className="pa-em">where they are</span></SectionHeading>
      <div className="sx-card-grid">{CARDS.map(c => <article key={c.id} className={`pa-service sx-card sx-card--${c.id}`} data-reveal>
        <div className="sx-card-visual">{c.id === 'google' ? <SearchAdMockup /> : <MetaAdMockup />}</div>
        <div className="sx-card-copy">
          <p className="sx-badge">{c.badge}</p>
          <h3>{c.name}</h3>
          <p className="sx-benefit">{c.benefit}</p>
          <ul className="sx-chips" aria-label={`${c.name} suits`}>{c.suits.map(s => <li key={s}>{s}</li>)}</ul>
          <p className="sx-manage">{c.manage}</p>
          {'whatsapp' in c && <p className="sx-option">{c.whatsapp}</p>}
          {'note' in c && <p className="sx-note">{c.note}</p>}
          <ActionLink href={c.href} variant="text">Explore {c.name}</ActionLink>
        </div>
      </article>)}</div>
    </div></section>

    {/* 3 Which platform fits */}
    <section className="pa-section pa-wrap" aria-labelledby="sx-fit">
      <SectionHeading id="sx-fit" eyebrow="Choosing a platform">Which platform fits <span className="pa-em">your business?</span></SectionHeading>
      <ul className="sx-fit-grid">{FIT.rows.map(r => <li key={r.k} className={`sx-fit sx-fit--${r.k}`} data-reveal><Glyph k={r.k} /><p className="sx-fit-who">{r.who}</p><p className="sx-fit-then"><span aria-hidden="true">→</span> {r.then}</p></li>)}</ul>
      <div className="sx-caveat" data-reveal><p>{FIT.caveat}</p><ul>{FIT.checks.map(c => <li key={c}><Tick />{c}</li>)}</ul></div>
      <p className="sx-aud" data-reveal>Selling products online? <Link href="/who-we-help/d2c">See advertising for D2C brands</Link>. Teaching or training? <Link href="/who-we-help/education">See advertising for education businesses</Link>. Selling property? <Link href="/who-we-help/real-estate">See advertising for real estate developers</Link>.</p>
    </section>

    {/* 4 What we manage */}
    <section className="pa-section pa-wrap sx-scope-wrap" aria-labelledby="sx-scope">
      <SectionHeading id="sx-scope" eyebrow="What we manage">What we <span className="pa-em">manage</span></SectionHeading>
      <div className="sx-scope">
        <div className="sx-in" data-reveal><h3>Included in management</h3><ul>{SCOPE.included.map(i => <li key={i}><Tick />{i}</li>)}</ul></div>
        <div className="sx-out" data-reveal><h3>Agreed separately</h3><ul>{SCOPE.separate.map(i => <li key={i}><Plus />{i}</li>)}</ul><p>{SCOPE.separateNote}</p></div>
      </div>
    </section>

    {/* 5 Our work */}
    <section id="our-work" className="pa-section pa-wrap" aria-labelledby="sx-work">
      <div className="pa-section-top"><SectionHeading id="sx-work" eyebrow="Our work">See <span className="pa-em">the work</span> behind the offer</SectionHeading><ActionLink href="/work" variant="text">View All Case Studies</ActionLink></div>
      <div className="sx-work-grid">{WORK.map(w => <article key={w.id} className="sx-work" data-reveal>
        <p className="sx-work-tags"><b>{w.channel}</b><span>{w.sector}</span></p>
        <h3>{w.name}</h3><p className="sx-work-line">{w.line}</p>
        {w.href && <ActionLink href={w.href} variant="text">{w.cta}</ActionLink>}
      </article>)}</div>
    </section>

    {/* 6 How we work */}
    <section className="pa-section pa-wrap sx-process" aria-labelledby="sx-process">
      <SectionHeading id="sx-process" eyebrow="How we work">A clear route, <span className="pa-em">step by step</span></SectionHeading>
      <ol className="pa-steps sx-steps" data-reveal="line">{PROCESS.steps.map((s, i) => <li key={s} style={{ '--i': i } as React.CSSProperties}><span className="pa-step-number" aria-hidden="true">{i + 1}</span><h3>{s}</h3></li>)}</ol>
      <p className="sx-process-copy">{PROCESS.copy}</p>
      <ActionLink href="/how-it-works" variant="text">See How We Work</ActionLink>
    </section>

    {/* 7 Pricing and business fit */}
    <section className="pa-section pa-wrap" aria-labelledby="sx-cost">
      <SectionHeading id="sx-cost" eyebrow="Pricing and fit">What it costs, and <span className="pa-em">who it suits</span></SectionHeading>
      <ol className="sx-cost" data-reveal>{COST.items.map((c, i) => <li key={c.t}><span className="sx-cost-n" aria-hidden="true">{i + 1}</span><h3>{c.t}</h3><p>{c.d}</p></li>)}</ol>
      <div className="sx-readiness">
        <div data-reveal><h3>Ready for managed advertising</h3><ul>{COST.ready.map(i => <li key={i}><Tick />{i}</li>)}</ul></div>
        <div data-reveal><h3>May be premature</h3><ul>{COST.premature.map(i => <li key={i}><Plus />{i}</li>)}</ul></div>
      </div>
      <ActionLink href="/pricing" variant="text">Understand Our Pricing Approach</ActionLink>
    </section>

    {/* 8 FAQ and final CTA */}
    <section className="pa-section pa-wrap sx-faq-wrap" aria-labelledby="sx-faq">
      <SectionHeading id="sx-faq" eyebrow="Questions">A few questions <span className="pa-em">before we talk</span></SectionHeading>
      <div className="pa-faq sx-faq" data-reveal>{SERVICES_FAQS.map(f => <details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}</p></details>)}</div>
    </section>
    <section className="pa-close pa-wrap" aria-labelledby="sx-close" data-reveal><div><h2 id="sx-close">{CLOSE.h}</h2><p>{CLOSE.body}</p></div><ActionLink variant="dark" /></section>
  </div>;
}
