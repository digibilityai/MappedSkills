import Image from 'next/image';
import Link from 'next/link';
import { AUDIENCES, FAQS, SERVICES, STEPS, TILES, WORK } from '@/components/paid-advertising/home/content';
import { HeroFlow, JourneyArt } from './ArtR3';
import { PathFlow } from './PathFlow';
import { GoogleSerp, MetaFeed } from './AdsR3';
import { RvReveal3 } from './RvReveal3';
import './resolve-home-r3.css';

/**
 * THE RESOLVE R3: targeted corrections on R2 (journey, services in one scroll, animated buyer path, footer) (a DESIGN EXPERIMENT, not an approved brand or positioning change).
 * Copy, client names, links and case-study limits come from the approved R3.1 content module. Isolated: scoped to `.rv3`.
 * Remove: see docs/homepage-visual-r2/resolve-r3/REMOVAL.md.
 * Background rhythm: Ink Deep, Ground, Paper, Ink Deep, Ground, Paper, Ink Deep, then the closing band.
 * Heading rule: dark sections white plus tangerine emphasis; light sections Ink plus tangerine emphasis.
 */
const REVEAL = { 'data-rv': '' } as const;

function Cta({ href = '/contact', children = 'Discuss Your Advertising', tone = 'tang' }: { href?: string; children?: React.ReactNode; tone?: 'tang' | 'paper' }) {
  return <Link className={`rv3-btn rv3-btn--${tone}`} href={href}>{children}<span aria-hidden="true">↗</span></Link>;
}
function TextLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return <Link className={`rv3-tl${dark ? ' rv3-tl--dark' : ''}`} href={href}>{children}<span aria-hidden="true">↗</span></Link>;
}

/* Journey: the approved five stages. `stage` ties each to Capture, Convert or Measure; `who` to who is responsible. */
const JOURNEY = [
  { title: 'A buyer searches or browses', body: 'Someone looks on Google, or scrolls through Facebook or Instagram.', stage: 'Capture', who: 'ms' },
  { title: 'A relevant ad appears', body: 'Your ad meets them with an offer that fits what they are looking for.', stage: 'Capture', who: 'ms' },
  { title: 'They visit and consider', body: 'They look at your offer, your page and the answers you give.', stage: 'Convert', who: 'you' },
  { title: 'They may enquire or buy', body: 'The next step depends on how you sell: an enquiry, a call or a purchase.', stage: 'Convert', who: 'you' },
  { title: 'The path is measured', body: 'We review the results relevant to your objective, what the available data shows and what needs attention next.', stage: 'Measure', who: 'ms' },
] as const;

const WORK_ASSETS = {
  wanderlooms: { src: '/images/resolve-r3/wanderlooms-work.webp', alt: 'Conceptual artwork of two riders in adventure touring gear looking over a mountain valley at sunset beside an adventure motorcycle', logo: '/images/resolve-r3/wanderlooms-logo.png', logoAlt: 'Wanderlooms', logoW: 500, logoH: 149, note: 'Conceptual artwork. Not an actual campaign creative.' },
  'om-sai': { src: '/images/resolve-r3/omsai-work.webp', alt: 'Conceptual artwork of a contemporary residential tower with landscaped balconies at dusk', logo: '/images/resolve-r3/omsai-logo.jpg', logoAlt: 'Omsai Group', logoW: 400, logoH: 400, note: 'Conceptual artwork. Not a photograph of the project.' },
} as const;

/* The Om Sai case study route is not published (404). Until the owner confirms the URL, this card goes to the live /work page. */
const WORK_HREF: Record<string, { href: string; cta: string }> = { 'om-sai': { href: '/work', cta: 'Explore Our Work' } };

export function ResolveHomeR3() {
  return <div className="rv3">
    <RvReveal3 />

    {/* 1. Ink Deep: the decisive stage */}
    <section className="rv3-hero rv3-dark" aria-labelledby="rv3-h1">
      <div className="rv3-wrap rv3-hero-grid">
        <div className="rv3-hero-copy">
          <p className="rv3-eyebrow">Paid advertising for growing Indian businesses</p>
          <h1 id="rv3-h1">Paid advertising built around how <em>your customers buy.</em></h1>
          <p className="rv3-lede">We plan and manage Google Ads and Meta Ads campaigns for businesses with an offer already selling.</p>
          <p className="rv3-support">From discovering your offer to purchasing or making an enquiry, we plan campaigns around the steps your customers take.</p>
          <div className="rv3-actions"><Cta /><TextLink href="/work" dark>Explore Our Work</TextLink></div>
        </div>
        <figure className="rv3-hero-fig">
          <HeroFlow />
          <figcaption>
            <ol>
              <li>Many potential buyers</li><li>Relevant attention</li><li>An ad interaction</li><li>An enquiry or a purchase</li>
            </ol>
            <small>Conceptual illustration. It shows no results.</small>
          </figcaption>
        </figure>
      </div>
    </section>

    {/* 2. Ground: the buyer journey, tied to Capture, Convert, Measure */}
    <section className="rv3-journey rv3-ground" aria-labelledby="rv3-journey-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">How a buyer reaches you</p><h2 id="rv3-journey-h">From a search or a scroll <em>to an enquiry or a sale.</em></h2></header>
      <ul className="rv3-ccm" aria-hidden="true">
        <li className="rv3-ccm-capture"><b>Capture</b><span>MappedSkills plans and manages the advertising</span></li>
        <li className="rv3-ccm-convert"><b>Convert</b><span>Your business: offer, website and follow up</span></li>
        <li className="rv3-ccm-measure"><b>Measure</b><span>MappedSkills reviews</span></li>
      </ul>
      <ol className="rv3-j-list" aria-label="How a buyer reaches your business through advertising">
        {JOURNEY.map((s, i) => <li key={s.title} className={`rv3-j rv3-j--${s.who}`} style={{ '--i': i } as React.CSSProperties} {...REVEAL}>
          <span className="rv3-j-tag">{s.stage}<i>{s.who === 'ms' ? 'MappedSkills' : 'Your business'}</i></span>
          <span className="rv3-j-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          <JourneyArt n={(i + 1) as 1 | 2 | 3 | 4 | 5} />
          <h3>{s.title}</h3><p>{s.body}</p>
        </li>)}
      </ol>
    </div></section>

    {/* 3. Paper: who we help (asymmetric; photography where approved, labelled placeholders where not yet supplied) */}
    <section id="who-we-help" className="rv3-aud rv3-paper" aria-labelledby="rv3-aud-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">Who we help</p><h2 id="rv3-aud-h">Advertising for <em>the way your business sells</em></h2><p className="rv3-aud-more"><TextLink href="/who-we-help/enquiry-led-businesses">See how we help enquiry-led businesses</TextLink></p></header>
      <div className="rv3-aud-grid">
        {AUDIENCES.map((a, i) => <article key={a.id} id={a.id} className={`rv3-a rv3-a--${i + 1}`} {...REVEAL}>
          <div className="rv3-a-img">
            {a.id === 'd2c' && <Image src="/images/resolve-r3/d2c-apparel.webp" alt="Conceptual product-commerce scene: folded t-shirts and sweatshirts in sage, blue and navy, a jacket on a rail, a cap and sunglasses on stone display plinths in warm light" fill sizes="(min-width: 1081px) 640px, 100vw" className="rv3-a-photo rv3-a-photo--d2c" />}
            {a.id === 'education' && <Image src="/images/resolve-r3/coaching-learning.webp" alt="Conceptual illustration of different coaches and learners at work: business, career, life, health and fitness, nutrition, parenting, relationship, creative and skills coaching, with a learner at a laptop in the centre" fill sizes="(min-width: 1081px) 260px, (min-width: 761px) 40vw, 100vw" className="rv3-a-photo rv3-a-photo--edu" />}
            {a.id === 'real-estate' && <Image src={TILES.property.src} alt={TILES.property.alt} fill sizes="(min-width: 900px) 34vw, 100vw" />}
          </div>
          <div className="rv3-a-body"><h3><Link href={a.href}>{a.title}</Link></h3><p>{a.body}</p></div>
        </article>)}
      </div>
          </div></section>

    {/* 4. Ink Deep: services, with believable advertising situations */}
    <section className="rv3-svc rv3-dark" aria-labelledby="rv3-svc-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">Our core services</p><h2 id="rv3-svc-h">Two core services. An approach <em>shaped around your business.</em></h2></header>
      <div className="rv3-svc-grid">
        {SERVICES.map((s, i) => <article key={s.name} className={`rv3-s rv3-s--${i + 1}`} {...REVEAL}>
          <div className="rv3-s-copy"><span className="rv3-s-n" aria-hidden="true">{i === 0 ? 'Search' : 'Social'}</span><h3>{s.name}</h3><p>{s.body}</p><TextLink href={s.href} dark>Explore {s.name}</TextLink></div>
          <div className="rv3-s-demo">{s.type === 'search' ? <GoogleSerp /> : <MetaFeed />}<p className="rv3-s-cap">Illustrative example with a generic business. Not a client campaign.</p></div>
        </article>)}
      </div>
    </div></section>

    {/* 5. Ground: featured work with the supplied conceptual artwork and the official logos */}
    <section id="featured-work" className="rv3-work rv3-ground" aria-labelledby="rv3-work-h"><div className="rv3-wrap">
      <div className="rv3-work-top"><header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">Featured work</p><h2 id="rv3-work-h">See <em>the work</em> behind the offer</h2></header><TextLink href="/work">View All Case Studies</TextLink></div>
      <div className="rv3-work-grid">
        {WORK.map((w, i) => { const a = WORK_ASSETS[w.id]; const link = WORK_HREF[w.id] ?? { href: w.href, cta: w.cta };
          return <article key={w.id} className={`rv3-w rv3-w--${i + 1}`} {...REVEAL}>
            <div className="rv3-w-img">
              <Image src={a.src} alt={a.alt} fill sizes={i === 0 ? '(min-width: 1081px) 740px, 100vw' : '(min-width: 1081px) 440px, (min-width: 761px) 70vw, 100vw'} />
              <span className={`rv3-logo rv3-logo--${w.id}`}><Image src={a.logo} alt={a.logoAlt} width={a.logoW} height={a.logoH} /></span>
            </div>
            <p className="rv3-w-note">{a.note}</p>
            <p className="rv3-eyebrow">{w.eyebrow}</p><h3>{w.title}</h3><p className="rv3-w-body">{w.body}</p><TextLink href={link.href}>{link.cta}</TextLink>
          </article>; })}
      </div>
    </div></section>

    {/* 6. Paper: process, reporting and who is responsible for what */}
    <section className="rv3-proc rv3-paper" aria-labelledby="rv3-proc-h"><div className="rv3-wrap">
      <header className="rv3-head" {...REVEAL}><p className="rv3-eyebrow">How we work together</p><h2 id="rv3-proc-h">Clear reporting. <em>Practical next steps.</em></h2><p className="rv3-intro">Review the results relevant to your objective, what the available data shows and what needs attention next.</p></header>
      <ol className="rv3-steps" {...REVEAL}>{STEPS.map((s, i) => <li key={s.title} style={{ '--i': i } as React.CSSProperties}><span className="rv3-step-n" aria-hidden="true">{i + 1}</span><h3>{s.title}</h3><p>{s.body}</p></li>)}</ol>
      <div className="rv3-flow-wrap" {...REVEAL}>
        <h3 className="rv3-flow-h">How the advertising connects to the buyer’s path</h3>
        <PathFlow />
        <p className="rv3-flow-foot">MappedSkills plans, manages, tests and reviews advertising within the agreed scope. Your business owns the offer, the website and the follow up.</p>
      </div>
      <div className="rv3-proc-foot"><p>You receive a monthly performance report with ongoing management, and review calls as agreed in your proposal.</p><TextLink href="/how-it-works">See How We Work</TextLink></div>
    </div></section>

    {/* 7. Ink Deep: pricing and the questions a buyer asks first */}
    <section className="rv3-fit rv3-dark" aria-label="Pricing and questions"><div className="rv3-wrap rv3-fit-grid">
      <div className="rv3-fit-price" {...REVEAL}>
        <p className="rv3-eyebrow">Pricing</p><h2 id="rv3-price-h">Know what your <em>proposal includes</em></h2>
        <p>Advertising spend and our management fee are separate.</p>
        <p>Each Meta proposal includes a defined allowance of static ad designs. Reels, AI video production, scripting, landing-page implementation and technical fixes can be scoped separately where needed.</p>
        <TextLink href="/pricing" dark>Understand Our Pricing Approach</TextLink>
      </div>
      <div className="rv3-faq" {...REVEAL}>
        <h2 className="rv3-eyebrow">A few questions before we talk</h2>
        {FAQS.map((f) => <details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}</p></details>)}
      </div>
    </div></section>

    {/* 8. Closing band: Tangerine Deep with white type (white on Tangerine fails contrast) */}
    <section className="rv3-close" aria-labelledby="rv3-close-h"><div className="rv3-wrap rv3-close-in" {...REVEAL}>
      <div><h2 id="rv3-close-h">Tell us what you want advertising to achieve.</h2><p>Share your business, current situation and growth goal. We’ll use that context to begin the conversation.</p></div>
      <Cta tone="paper" />
    </div></section>
  </div>;
}
