import { ActionPair, Mark, TLink } from '@/components/direction-c/primitives';
import { HeroStage } from '@/components/direction-c/HeroStage';

/**
 * UI REVAMP GATE 2 — DIRECTION C — homepage hero. Composition: statement over
 * split (H1 across ten columns; copy left, the stage right; below 900px the
 * stage follows the CTAs, full-bleed).
 *
 * COPY: the production homepage hero (components/homepage/HomepageHero.tsx),
 * verbatim — H1, supporting line, both CTAs and the method link.
 *
 * THE PRE-PAINT SCRIPT is the production mechanism, re-pointed: it marks
 * <html> so the stage's FIRST paint is the dark traffic state when motion is
 * allowed, and removes its own attribute after 4s so a page whose JavaScript
 * never runs settles on the resolved composition. Under reduced motion it does
 * nothing. It sets one attribute and registers no listener.
 */
const HERO_FIRST_PAINT = `(function(){try{
if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var d=document.documentElement;d.setAttribute('data-dc-hero','traffic');
setTimeout(function(){d.removeAttribute('data-dc-hero')},4000)}catch(e){}})();`;

export function HomeHero() {
  return (
    <section className="dc-hero dc-ground" aria-labelledby="dc-h1">
      <script dangerouslySetInnerHTML={{ __html: HERO_FIRST_PAINT }} />
      <div className="dc-wrap">
        <div className="dc-g12">
          <h1 id="dc-h1" className="dc-display">
            Judge us on the <span className="dc-k-named">enquiries</span>, not the{' '}
            <span className="dc-k-traffic">traffic</span>.
          </h1>
          <div className="dc-hero-copy">
            <p className="dc-lede">
              <b>There is buyer demand for what you sell, and some of it never reaches you.</b> We work on the
              whole route to an enquiry.
            </p>
            <ActionPair primaryLabel="Tell us what you’re trying to fix" />
            <TLink href="/how-it-works" dim>
              See the method, including what we can&rsquo;t attribute
            </TLink>
          </div>
          <figure className="dc-hero-fig">
            <HeroStage />
          </figure>
        </div>
      </div>
    </section>
  );
}

/**
 * The departure — production's one calm beat between the hero and the first
 * chapter ("The same demand, followed all the way down."), verbatim. The
 * prototype did not stage this line; it is composed here as a quiet statement
 * band on ground (not an ink band), which keeps the homepage at Direction C's
 * two counted inversions (the hero stage and the close).
 */
export function HomeDeparture() {
  return (
    <section className="dc-sec tight dc-ground dc-rule-top">
      <div className="dc-wrap">
        <div className="dc-departure">
          <Mark state="owned" />
          <p className="dc-statement">
            The same demand, followed all the way down.{' '}
            <span className="dc-k-named">Here is where it goes.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
