import Link from 'next/link';
import Image from 'next/image';
import { ActionLink } from '../ActionLink';
import { SectionHeading } from '../SectionHeading';
import { PaReveal } from '../PaReveal';
import { SearchAdMockup, MetaAdMockup } from '../AdMockups';
import { FeaturedArt } from './FeaturedArt';
import { AUDIENCES, SERVICES, STEPS, FAQS, WORK, TILES, type TileId } from './content';
import '../paid-advertising.css';

function Tile({ id, priority = false, sizes }: { id: TileId; priority?: boolean; sizes: string }) {
  return <Image src={TILES[id].src} alt={TILES[id].alt} fill priority={priority} sizes={sizes} />;
}
function Photo({ id, sizes = '(max-width: 600px) 90vw, 33vw' }: { id: TileId; sizes?: string }) {
  return <div className={`pa-photo pa-photo--${id}`}><Tile id={id} sizes={sizes} /></div>;
}
export function PaidAdvertisingHome() {
  return <div className="pa">
    <PaReveal />
    <section className="pa-hero pa-wrap" aria-labelledby="pa-h1">
      <div className="pa-hero-copy">
        <p className="pa-eyebrow">Paid advertising for growing Indian businesses</p>
        <h1 id="pa-h1">Paid advertising built around how <span>your customers buy.</span></h1>
        <p className="pa-lede">We plan and manage Google Ads and Meta Ads campaigns for businesses with an offer already selling.</p>
        <p className="pa-support">From discovering your offer to purchasing or making an enquiry, we plan campaigns around the steps your customers take.</p>
        <div className="pa-actions"><ActionLink /><ActionLink href="/work" variant="text">Explore Our Work</ActionLink></div>
      </div>
      <div className="pa-hero-visual"><div className="pa-stage">
        <div className="pa-tile pa-tile--a"><Tile id="apparel" priority sizes="(max-width: 800px) 40vw, 22vw" /></div>
        <div className="pa-tile pa-tile--b"><Tile id="baking" priority sizes="(max-width: 800px) 45vw, 26vw" /></div>
        <div className="pa-tile pa-tile--c"><Tile id="property" priority sizes="(max-width: 800px) 70vw, 36vw" /></div>
        <svg className="pa-route" viewBox="0 0 110 100" aria-hidden="true" focusable="false"><path d="M33 47 C 48.4 64, 74.8 40, 95.7 53 S 108.9 74, 85.8 79" pathLength="1" /></svg>
        <ol className="pa-journey" aria-label="Customer journey"><li className="pa-j1"><span>Discover</span></li><li className="pa-j2"><span>Consider</span></li><li className="pa-j3"><span>Purchase / Enquire</span></li></ol>
      </div></div>
    </section>
    <section id="who-we-help" className="pa-section pa-wrap" aria-labelledby="pa-audiences">
      <SectionHeading id="pa-audiences" eyebrow="Who we help">Advertising for <span className="pa-em">the way your business sells</span></SectionHeading>
      <div className="pa-audience-grid">{AUDIENCES.map(a => { const href: string | undefined = 'href' in a ? a.href : undefined; return <article key={a.id} id={a.id} className={href ? 'pa-card pa-card--link' : 'pa-card'} data-reveal><Photo id={a.image} /><h3>{href ? <Link className="pa-card-link" href={href}>{a.title}</Link> : a.title}</h3><p>{a.body}</p></article>; })}</div>
    </section>
    <section className="pa-section pa-ink" aria-labelledby="pa-services"><div className="pa-wrap">
      <SectionHeading id="pa-services" eyebrow="Our core services">Two core services. An approach <span className="pa-em">shaped around your business.</span></SectionHeading>
      <div className="pa-service-grid">{SERVICES.map(s => <article key={s.name} className="pa-service" data-reveal><div><h3>{s.name}</h3><p>{s.body}</p><ActionLink href={s.href} variant="text">Explore {s.name}</ActionLink></div>
        {s.type === 'search' ? <SearchAdMockup /> : <MetaAdMockup />}
      </article>)}</div>
    </div></section>
    <section id="featured-work" className="pa-section pa-wrap" aria-labelledby="pa-work">
      <div className="pa-section-top"><SectionHeading id="pa-work" eyebrow="Featured work">See <span className="pa-em">the work</span> behind the offer</SectionHeading><ActionLink href="/work" variant="text">View All Case Studies</ActionLink></div>
      <div className="pa-work-grid">{WORK.map(w => <article key={w.id} className="pa-card" data-reveal><FeaturedArt kind={w.id} /><p className="pa-eyebrow">{w.eyebrow}</p><h3>{w.title}</h3><p>{w.body}</p><ActionLink href={w.href} variant="text">{w.cta}</ActionLink></article>)}</div>
    </section>
    <section className="pa-section pa-wrap" aria-labelledby="pa-process"><SectionHeading id="pa-process" eyebrow="How we work together">Clear reporting. <span className="pa-em">Practical next steps.</span></SectionHeading><p className="pa-section-intro">Review the results relevant to your objective, what the available data shows and what needs attention next.</p>
      <ol className="pa-steps" data-reveal="line">{STEPS.map((s,i) => <li key={s.title} style={{ '--i': i } as React.CSSProperties}><span className="pa-step-number" aria-hidden="true">{i+1}</span><h3>{s.title}</h3><p>{s.body}</p></li>)}</ol><p className="pa-review-note">Your engagement includes monthly reporting and a review call.</p><ActionLink href="/how-it-works" variant="text">See How We Work</ActionLink>
    </section>
    <section className="pa-buying pa-wrap" aria-label="Pricing and questions"><div data-reveal><SectionHeading id="pa-pricing" eyebrow="Pricing">Know what your proposal includes</SectionHeading><p>Advertising spend and our management fee are separate.</p><p>Each Meta proposal includes a defined allowance of static ad designs. Reels, AI video production, scripting, landing-page implementation and technical fixes can be scoped separately where needed.</p><ActionLink href="/pricing" variant="text">Understand Our Pricing Approach</ActionLink></div>
      <div className="pa-faq" data-reveal><h2 className="pa-eyebrow">A few questions before we talk</h2>{FAQS.map(f => <details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}</p></details>)}</div>
    </section>
    <section className="pa-close pa-wrap" aria-labelledby="pa-close-title" data-reveal><div><h2 id="pa-close-title">Tell us what you want advertising to achieve.</h2><p>Share your business, current situation and growth goal. We’ll use that context to begin the conversation.</p></div><ActionLink variant="dark" /></section>
  </div>;
}
