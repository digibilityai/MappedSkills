import Link from 'next/link';
import { ActionLink } from '../ActionLink';
import { SectionHeading } from '../SectionHeading';
import { PaReveal } from '../PaReveal';
import { FeedMockup } from './FeedMockup';
import { HERO, WHY, MANAGE, FIT, STEPS, WORK, COST, META_FAQS, CLOSE } from './content';
import '../paid-advertising.css';
import './meta-ads.css';

const Tick = () => <svg className="pa-tick" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="m4.5 10.5 3.6 3.6 7.4-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Plus = () => <svg className="pa-tick" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M10 4.5v11M4.5 10h11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>;
const Icon = ({ k }: { k: 'site' | 'form' | 'chat' | 'product' | 'learn' | 'home' }) => <svg className="mx-icon" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
  {k === 'site' && <><rect x="5" y="8" width="30" height="24" rx="4" /><path d="M5 15h30M10 11.5h.01M14 11.5h.01" /></>}
  {k === 'form' && <><rect x="8" y="5" width="24" height="30" rx="4" /><path d="M14 14h12M14 20h12M14 26h6" /></>}
  {k === 'chat' && <><path d="M6 8h28v18H17l-7 6v-6H6z" /><path d="M13 15h14M13 20h9" /></>}
  {k === 'product' && <><path d="M13 7 6 12l4 5 3-2v18h14V15l3 2 4-5-7-5c-1 3-3.500 4.500-7 4.500S14 10 13 7Z" /></>}
  {k === 'learn' && <><path d="m4 15 16-8 16 8-16 8Z" /><path d="M10 19v8c3 3 7 4 10 4s7-1 10-4v-8" /></>}
  {k === 'home' && <><path d="M7 34V14l13-8 13 8v20Z" /><path d="M15 34V22h10v12M15 17h.01M25 17h.01" /></>}
</svg>;

export function PaidAdvertisingMetaAds() {
  return <div className="pa pa-mx">
    <PaReveal />
    {/* 1 Hero */}
    <section className="pa-hero pa-wrap" aria-labelledby="mx-h1">
      <div className="pa-hero-copy">
        <p className="pa-eyebrow">{HERO.eyebrow}</p>
        <h1 id="mx-h1">Turn attention into <span>business opportunities.</span></h1>
        <p className="mx-line">{HERO.line}</p>
        <p className="pa-lede">{HERO.body}</p>
        <div className="pa-actions"><ActionLink href="/contact">Discuss Meta Ads</ActionLink><ActionLink href="/contact?intent=call" variant="text">Request a call</ActionLink></div>
      </div>
      <div className="pa-hero-visual"><FeedMockup /></div>
    </section>

    {/* 2 Why Meta Ads (the page's one dark band) */}
    <section className="pa-section pa-ink mx-why" aria-labelledby="mx-why"><div className="pa-wrap">
      <SectionHeading id="mx-why" eyebrow="Why Meta Ads">Why Meta Ads: <span className="pa-em">people discover things while they browse</span></SectionHeading>
      <div className="mx-why-grid">
        <div className="mx-scroll" aria-hidden="true"><i /><i className="on"><b /></i><i /></div>
        <p className="mx-why-body">{WHY.body}</p>
      </div>
      <ol className="mx-route" aria-label="From discovery to enquiry" data-reveal="line">{WHY.stages.map((s, i) => <li key={s.k} style={{ '--i': i } as React.CSSProperties}><span className="mx-dot" aria-hidden="true" /><h3>{s.k}</h3><p>{s.d}</p></li>)}</ol>
      <p className="mx-why-close">{WHY.closing}</p>
    </div></section>

    {/* 3 What we manage */}
    <section className="pa-section pa-wrap" aria-labelledby="mx-manage">
      <SectionHeading id="mx-manage" eyebrow="What we manage">What we manage <span className="pa-em">for you</span></SectionHeading>
      <ol className="mx-stops" data-reveal="line">{MANAGE.route.map((r, i) => <li key={r.k} style={{ '--i': i } as React.CSSProperties}><span className="mx-stop" aria-hidden="true">{i + 1}</span><h3>{r.k}</h3><p>{r.d}</p></li>)}</ol>
      <h3 className="mx-sub">{MANAGE.pathsLabel}</h3>
      <ul className="mx-paths">{MANAGE.paths.map(p => <li key={p.k} data-reveal><Icon k={p.k} /><b>{p.t}</b><span>{p.d}</span></li>)}</ul>
      <p className="mx-resp">{MANAGE.responsibility}</p>
      <div className="mx-scope">
        <div className="mx-in" data-reveal><h3>Included with ongoing management</h3><ul>{MANAGE.included.map(i => <li key={i}><Tick />{i}</li>)}</ul></div>
        <div className="mx-out" data-reveal><h3>Scoped separately unless the proposal includes it</h3><ul>{MANAGE.separate.map(i => <li key={i}><Plus />{i}</li>)}</ul></div>
      </div>
      <div className="mx-notes" data-reveal><p>{MANAGE.creative}</p><p>{MANAGE.honesty}</p></div>
      <div className="mx-band" data-reveal><p>{MANAGE.ctaLead}</p><ActionLink href="/contact" variant="dark">Discuss Meta Ads</ActionLink></div>
    </section>

    {/* 4 Business fit */}
    <section className="pa-section pa-wrap" aria-labelledby="mx-fit">
      <SectionHeading id="mx-fit" eyebrow="Fit">Is Meta Ads <span className="pa-em">right for your business?</span></SectionHeading>
      <h3 className="mx-sub">Often useful</h3>
      <ul className="mx-tiles">{FIT.good.map(g => <li key={g.k} data-reveal><Icon k={g.k} /><p>{g.t}</p></li>)}</ul>
      <div className="mx-pause" data-reveal><h3>Pause and check first</h3><ul>{FIT.pause.map(p => <li key={p}><Plus />{p}</li>)}</ul></div>
      <p className="mx-fit-close">{FIT.closing} <Link href="/google-ads">Explore Google Ads</Link></p>
      <p className="mx-fit-note">{FIT.note}</p>
    </section>

    {/* 5 How we work */}
    <section className="pa-section pa-wrap" aria-labelledby="mx-how">
      <SectionHeading id="mx-how" eyebrow="How we work">How we work on <span className="pa-em">your Meta Ads</span></SectionHeading>
      <div className="mx-loopwrap">
        <span className="mx-loop" aria-hidden="true"><i>Learn and refine</i></span>
        <ol className="mx-steps" data-reveal="line">{STEPS.map((s, i) => <li key={s.k} style={{ '--i': i } as React.CSSProperties}><span className="mx-stop" aria-hidden="true">{i + 1}</span><h3>{s.k}</h3><p>{s.d}</p></li>)}</ol>
      </div>
      <p className="mx-how-note">Results from testing and review feed back into the plan.</p>
      <p className="mx-approval">You see our plan and proposal before any work starts. <b>Nothing begins until you approve it.</b></p>
      <ActionLink href="/how-it-works" variant="text">See How We Work</ActionLink>
    </section>

    {/* 6 Our Meta Ads work */}
    <section className="pa-section pa-wrap" aria-labelledby="mx-work">
      <div className="pa-section-top"><SectionHeading id="mx-work" eyebrow="Verified work">Our <span className="pa-em">Meta Ads</span> work</SectionHeading><ActionLink href="/work" variant="text">View All Case Studies</ActionLink></div>
      <div className="mx-work-grid">{WORK.map(w => <article key={w.id} className="mx-work" data-reveal>
        <p className="mx-work-tag"><b>Meta Ads</b><span>{w.category}</span></p>
        <h3>{w.name}</h3><p className="mx-work-body">{w.body}</p>
        {w.href && <ActionLink href={w.href} variant="text">{w.cta}</ActionLink>}
      </article>)}</div>
    </section>

    {/* 7 Cost */}
    <section className="pa-section pa-wrap" aria-labelledby="mx-cost">
      <SectionHeading id="mx-cost" eyebrow="Cost and expectations">What it costs, and <span className="pa-em">what to expect</span></SectionHeading>
      <div className="mx-eq" data-reveal role="group" aria-label="Your advertising investment is Meta ad spend plus the MappedSkills management fee">
        <div className="mx-eq-total"><b>{COST.equation.total}</b></div>
        <span className="mx-eq-op" aria-hidden="true">=</span>
        <div className="mx-eq-part"><b>{COST.equation.spend.t}</b><span>{COST.equation.spend.d}</span></div>
        <span className="mx-eq-op" aria-hidden="true">+</span>
        <div className="mx-eq-part"><b>{COST.equation.fee.t}</b><span>{COST.equation.fee.d}</span></div>
      </div>
      <p className="mx-extra" data-reveal><b>{COST.extra.t}.</b> {COST.extra.d}</p>
      <p className="mx-expect">{COST.expect}</p>
      <ActionLink href="/pricing" variant="text">Understand Our Pricing Approach</ActionLink>
    </section>

    {/* 8 FAQ and close */}
    <section className="pa-section pa-wrap mx-faq-wrap" aria-labelledby="mx-faq">
      <SectionHeading id="mx-faq" eyebrow="Questions">A few questions <span className="pa-em">before we talk</span></SectionHeading>
      <div className="pa-faq mx-faq" data-reveal>{META_FAQS.map(f => <details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}</p></details>)}</div>
    </section>
    <section className="pa-close pa-wrap" aria-labelledby="mx-close" data-reveal><div><h2 id="mx-close">{CLOSE.h}</h2><p>{CLOSE.body}</p></div><ActionLink href="/contact" variant="dark">Discuss Meta Ads</ActionLink></section>
  </div>;
}
