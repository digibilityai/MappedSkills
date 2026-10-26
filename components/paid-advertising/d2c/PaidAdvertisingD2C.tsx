import Link from 'next/link';
import { ActionLink } from '../ActionLink';
import { SectionHeading } from '../SectionHeading';
import { PaReveal } from '../PaReveal';
import { HeroArt, RolesArt, BalanceArt, Glyph } from './D2CArt';
import { HERO, READY, ROLES, JOURNEY, MEASURE, PROOF, D2C_FAQS, CLOSE } from './content';
import '../paid-advertising.css';
import './d2c.css';

export function PaidAdvertisingD2C() {
  return <div className="pa pa-dx">
    <PaReveal />
    {/* 1 Hero */}
    <section className="pa-hero pa-wrap" aria-labelledby="dx-h1">
      <div className="pa-hero-copy">
        <p className="pa-eyebrow">{HERO.eyebrow}</p>
        <h1 id="dx-h1">More orders are good. <span>Profitable growth</span> is better.</h1>
        <p className="pa-lede">{HERO.body}</p>
        <div className="pa-actions"><ActionLink href="/contact">Discuss D2C Advertising</ActionLink><ActionLink href="/contact?intent=call" variant="text">Request a call</ActionLink></div>
      </div>
      <div className="pa-hero-visual"><div className="dx-hero-art"><HeroArt /></div></div>
    </section>

    {/* 2 Business readiness */}
    <section className="pa-section pa-wrap" aria-labelledby="dx-ready">
      <SectionHeading id="dx-ready" eyebrow="Readiness">Before you spend more on ads, <span className="pa-em">make sure your business is ready.</span></SectionHeading>
      <p className="dx-intro">{READY.intro}</p>
      <ul className="dx-ready">{READY.items.map(i => <li key={i.k} data-reveal><Glyph k={i.k} /><h3>{i.t}</h3><p>{i.d}</p></li>)}
        <li className="dx-ready-note" data-reveal><p>{READY.closing}</p></li>
      </ul>
    </section>

    {/* 3 Roles */}
    <section className="pa-section pa-wrap dx-roles" aria-labelledby="dx-roles">
      <SectionHeading id="dx-roles" eyebrow="Where each fits">Where Google Ads and Meta Ads <span className="pa-em">fit</span></SectionHeading>
      <div className="dx-lanes">
        <article className="dx-lane" data-reveal><RolesArt kind="search" /><p className="dx-tag">{ROLES.google.tag}</p><h3>{ROLES.google.t}</h3><p>{ROLES.google.d}</p><ActionLink href={ROLES.google.href} variant="text">{ROLES.google.cta}</ActionLink></article>
        <article className="dx-lane" data-reveal><RolesArt kind="feed" /><p className="dx-tag">{ROLES.meta.tag}</p><h3>{ROLES.meta.t}</h3><p>{ROLES.meta.d}</p><ActionLink href={ROLES.meta.href} variant="text">{ROLES.meta.cta}</ActionLink></article>
        <div className="dx-merge" aria-hidden="true"><svg viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M25 0 C25 12, 46 12, 50 20M75 0 C75 12, 54 12, 50 20" /></svg><span>{ROLES.store}</span></div>
      </div>
      <p className="dx-both">{ROLES.both}</p>
      <p className="dx-wa"><b>Click-to-WhatsApp.</b> {ROLES.whatsapp}</p>
      <div className="dx-band" data-reveal><p>{ROLES.ctaLead}</p><ActionLink href="/contact" variant="dark">Discuss D2C Advertising</ActionLink></div>
    </section>

    {/* 4 Signature journey */}
    <section className="pa-section pa-wrap" aria-labelledby="dx-journey">
      <SectionHeading id="dx-journey" eyebrow="The journey">From product discovery to <span className="pa-em">sustainable growth</span></SectionHeading>
      <div className="dx-track">
        <p className="dx-bracket dx-bracket--acq" aria-hidden="true">Acquisition</p>
        <p className="dx-bracket dx-bracket--eco" aria-hidden="true">Business economics</p>
        <ol className="dx-stages" aria-label="From discovery to improvement" data-reveal="line">{JOURNEY.stages.map((s, i) => <li key={s.k} className={`dx-stage dx-stage--${s.side}`} style={{ '--i': i } as React.CSSProperties}><span className="dx-node" aria-hidden="true">{i + 1}</span><h3>{s.k}</h3><p>{s.d}</p></li>)}</ol>
        <span className="dx-loop" aria-hidden="true"><i>Improve feeds back into Discover</i></span>
      </div>
      <p className="dx-loop-text">{JOURNEY.loop}</p>
      <aside className="dx-repeat"><b>{JOURNEY.repeat.t}.</b> {JOURNEY.repeat.d}</aside>
      <div className="dx-who" role="group" aria-label="Who does what">
        <div className="dx-who-we" data-reveal><h3>{JOURNEY.who.we.t}</h3><p>{JOURNEY.who.we.d}</p></div>
        <div className="dx-who-you" data-reveal><h3>{JOURNEY.who.you.t}</h3><p>{JOURNEY.who.you.d}</p></div>
        <div className="dx-who-sep" data-reveal><h3>{JOURNEY.who.sep.t}</h3><p>{JOURNEY.who.sep.d}</p></div>
      </div>
      <p className="dx-boundary">{JOURNEY.boundary}</p>
    </section>

    {/* 5 Measurement (the page's one dark band) */}
    <section className="pa-section pa-ink dx-measure" aria-labelledby="dx-measure"><div className="pa-wrap">
      <SectionHeading id="dx-measure" eyebrow="Measurement">Measuring what matters, <span className="pa-em">honestly</span></SectionHeading>
      <div className="dx-measure-grid">
        <div className="dx-scale" data-reveal>
          <BalanceArt />
          <p className="dx-scale-l">{MEASURE.scale.left}</p><p className="dx-scale-r">{MEASURE.scale.right}</p>
        </div>
        <div className="dx-measure-copy">
          <ul>{MEASURE.points.map(p => <li key={p}>{p}</li>)}</ul>
          <p>{MEASURE.data}</p>
          <p className="dx-attr">{MEASURE.attribution}</p>
          <p className="dx-cost">{MEASURE.cost}</p>
          <ActionLink href="/pricing" variant="text">Understand Our Pricing Approach</ActionLink>
        </div>
      </div>
    </div></section>

    {/* 6 Experience and assessment */}
    <section className="pa-section pa-wrap" aria-labelledby="dx-proof">
      <div className="pa-section-top"><SectionHeading id="dx-proof" eyebrow="Experience">Our D2C experience, and <span className="pa-em">how we would assess yours</span></SectionHeading><ActionLink href="/work" variant="text">View All Case Studies</ActionLink></div>
      <div className="dx-proof">
        <article className="dx-doc" data-reveal><p className="dx-kicker">{PROOF.doc.k}</p><p className="dx-doc-cat"><b>Meta Ads</b><span>{PROOF.doc.category}</span></p><h3>{PROOF.doc.name}</h3><p>{PROOF.doc.body}</p></article>
        <div className="dx-approach" data-reveal><p className="dx-kicker">{PROOF.approach.k}</p><h3>{PROOF.approach.h}</h3><ol>{PROOF.approach.qs.map(q => <li key={q}>{q}</li>)}</ol><p className="dx-caption">{PROOF.approach.caption}</p></div>
      </div>
    </section>

    {/* 7 FAQ and close */}
    <section className="pa-section pa-wrap dx-faq-wrap" aria-labelledby="dx-faq">
      <SectionHeading id="dx-faq" eyebrow="Questions">A few questions <span className="pa-em">before we talk</span></SectionHeading>
      <div className="pa-faq dx-faq" data-reveal>{D2C_FAQS.map(f => <details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}{'link' in f && f.link && <> <Link href={f.link.href}>{f.link.label}</Link></>}</p></details>)}</div>
    </section>
    <section className="pa-close pa-wrap" aria-labelledby="dx-close" data-reveal><div><h2 id="dx-close">{CLOSE.h}</h2><p>{CLOSE.body}</p></div><ActionLink href="/contact" variant="dark">Discuss D2C Advertising</ActionLink></section>
  </div>;
}
