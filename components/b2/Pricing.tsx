import { ActionLink } from '../paid-advertising/ActionLink';
import { PaReveal } from '../paid-advertising/PaReveal';
import { Band } from './Band';
import '../paid-advertising/paid-advertising.css';
import './b2.css';

/**
 * /pricing (B2 Revision 3). Fully customised pricing: no prices, packages, ranges, minimums or guarantees. Ad spend is paid
 * directly to the platform; the management fee is charged separately; separately scoped work is quoted on its own. The
 * written proposal is the authority (owner wording, exact).
 */
const FACTORS = [
  ['01', 'What you need', 'Google Ads, Meta Ads or both. New campaigns, or campaigns already running that need reviewing.'],
  ['02', 'What needs fixing', 'Your website, tracking and existing setup.'],
  ['03', 'How much work is involved', 'Ad designs, competition and ongoing management.'],
];
const INCLUDED = [
  'Planning campaigns around your offer and customers',
  'Running them and adjusting your budget as results call for it',
  'Testing different ads',
  'Reviewing where people land and what we find',
  'A monthly performance report with ongoing work, and review calls where your proposal agrees them',
];
const SEPARATE = [
  'Website, landing page and tracking changes',
  'Creative beyond the agreed designs, such as reels, video and scripting',
  'For Meta Ads, your proposal sets a defined number of static ad designs',
];
const PROPOSAL = ['The services we recommend', 'The scope', 'The deliverables', 'Our fees', 'The proposed duration and terms', 'Work agreed separately', 'How we report'];

export function Pricing() {
  return (
    <div className="pa b2">
      <PaReveal />
      <section className="b2-hero pa-wrap" aria-labelledby="pr-h1">
        <div>
          <p className="pa-eyebrow">Pricing · Every quote is tailored</p>
          <h1 id="pr-h1">Pay for the work <span>your business needs.</span></h1>
          <p className="b2-lede">There is no price list. We look at your business, recommend what is worth doing and explain the cost before any work begins.</p>
          <div className="pa-actions"><ActionLink /><ActionLink href="#quote" variant="text">How you get a quote</ActionLink></div>
        </div>
        <figure className="b2-card b2-flow" aria-labelledby="pr-flow-cap">
          <svg viewBox="0 0 460 330" role="img" aria-label="Where your money goes: ad spend is paid directly to the advertising platform, and a separate management fee is paid to MappedSkills.">
            <rect x="10" y="115" width="124" height="100" rx="8" fill="#F7F3EC" stroke="#141219" strokeWidth="2" />
            <text x="72" y="161" textAnchor="middle" fontWeight="800" fontSize="16">Your</text>
            <text x="72" y="181" textAnchor="middle" fontWeight="800" fontSize="16">business</text>
            <path d="M134 145 C 190 145, 190 65, 262 65" fill="none" stroke="#141219" strokeWidth="2.5" />
            <path d="M254 58 L264 65 L254 72" fill="none" stroke="#141219" strokeWidth="2.5" />
            <path d="M134 185 C 190 185, 190 265, 262 265" fill="none" stroke="#FF5B04" strokeWidth="4" />
            <path d="M254 258 L264 265 L254 272" fill="none" stroke="#FF5B04" strokeWidth="4" />
            <text x="150" y="104" fontWeight="800" fontSize="12.5">AD SPEND</text>
            <text x="150" y="238" fontWeight="800" fontSize="12.5" style={{ fill: '#A83400' }}>MANAGEMENT FEE</text>
            <rect x="268" y="15" width="182" height="100" rx="8" fill="#0F0D14" />
            <text x="359" y="55" textAnchor="middle" fontWeight="800" fontSize="16" style={{ fill: '#fff' }}>The platform</text>
            <text x="359" y="77" textAnchor="middle" fontSize="12.5" style={{ fill: '#d9d3e3' }}>Google or Meta</text>
            <text x="359" y="95" textAnchor="middle" fontSize="12.5" style={{ fill: '#d9d3e3' }}>Paid directly by you</text>
            <rect x="268" y="215" width="182" height="100" rx="8" fill="#FFFDF9" stroke="#141219" strokeWidth="2" />
            <text x="359" y="255" textAnchor="middle" fontWeight="800" fontSize="16">MappedSkills</text>
            <text x="359" y="277" textAnchor="middle" fontSize="12.5" style={{ fill: '#5C5665' }}>Charged separately</text>
            <text x="359" y="295" textAnchor="middle" fontSize="12.5" style={{ fill: '#5C5665' }}>As set out in your proposal</text>
          </svg>
          <ul className="b2-legend">
            <li><i className="a" aria-hidden="true" />Ad spend, paid to the platform</li>
            <li><i className="b" aria-hidden="true" />Management fee, paid to us</li>
            <li><i className="c" aria-hidden="true" />Separately scoped work, quoted in your proposal</li>
          </ul>
          <figcaption id="pr-flow-cap" className="b2-cap">How payments are kept apart. Illustration of the arrangement, not a price.</figcaption>
        </figure>
      </section>

      <section className="b2-sec b2-paper" aria-labelledby="pr-shape">
        <div className="pa-wrap">
          <p className="pa-eyebrow">What shapes the management fee</p>
          <h2 id="pr-shape" className="b2-h2">Three things decide the quote.</h2>
          <p className="b2-lede">The more there is to do, the more the work costs. These are the three things we look at.</p>
          <ol className="b2-fac">{FACTORS.map(([n, t, d]) => <li key={n} data-reveal><span className="n">{n}</span><h3>{t}</h3><p>{d}</p></li>)}</ol>
        </div>
      </section>

      <section className="b2-sec" aria-labelledby="pr-cov">
        <div className="pa-wrap">
          <p className="pa-eyebrow">Where each part sits</p>
          <h2 id="pr-cov" className="b2-h2">What the fee covers, and what does not belong to it.</h2>
          <div className="b2-cov" data-reveal>
            <div className="c1"><h4>Included in management</h4><h3>Our management fee</h3><ul>{INCLUDED.map((x) => <li key={x}>{x}</li>)}</ul></div>
            <div className="c2"><h4>Agreed separately</h4><h3>Scoped on its own</h3><ul>{SEPARATE.map((x) => <li key={x}>{x}</li>)}</ul></div>
            <div className="c3"><h4>Paid to the platform</h4><h3>Your ad spend</h3><ul><li>Paid directly to Google or Meta</li><li>Not part of our fee</li></ul></div>
          </div>
          <p className="b2-cap" style={{ maxWidth: '48em' }}>No one can honestly guarantee results, so we do not. Review calls are included where your proposal agrees them.</p>
        </div>
      </section>

      <section className="b2-sec b2-paper" aria-labelledby="pr-prop">
        <div className="pa-wrap b2-two">
          <div>
            <p className="pa-eyebrow">Before you commit</p>
            <h2 id="pr-prop" className="b2-h2">The written proposal is what counts.</h2>
            <p className="b2-lede">Your written proposal confirms the agreed scope, deliverables, fees and terms.</p>
            <p className="b2-auth">Nothing here is a price list, a package or a promise of results.</p>
          </div>
          <div className="b2-doc" data-reveal>
            <p className="pa-eyebrow">Your proposal sets out</p>
            <h3>Built around your business</h3>
            <ol>{PROPOSAL.map((x) => <li key={x}>{x}</li>)}</ol>
          </div>
        </div>
      </section>

      <section id="quote" className="b2-sec" aria-labelledby="pr-quote">
        <div className="pa-wrap">
          <p className="pa-eyebrow">How you get a quote</p>
          <h2 id="pr-quote" className="b2-h2">Three steps, and you decide.</h2>
          <ol className="b2-steps3">
            <li><div className="n">01</div><h3>Tell us what you need</h3><p>Share your business, goals and challenges.</p></li>
            <li><div className="n">02</div><h3>Get a clear proposal</h3><p>We recommend the scope and explain the cost.</p></li>
            <li className="ev"><div className="n">03</div><h3>You decide</h3><p>Nothing starts until you approve it.</p></li>
          </ol>
          <div className="b2-ready">
            <div><h3>Advertising tends to work when you</h3><p>already sell or are close, can follow up enquiries promptly, know roughly what a customer is worth and can invest enough to learn what works.</p></div>
            <div><h3>It may be premature if</h3><p>your offer is untested or you cannot follow up enquiries yet. If so, we will tell you.</p></div>
          </div>
        </div>
      </section>

      <Band id="pr-close" h="Know what you are paying for." body="Tell us about your business and what you want advertising to achieve. We will reply by email or WhatsApp. Nothing starts until you approve it." />
    </div>
  );
}
