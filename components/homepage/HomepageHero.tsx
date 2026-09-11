import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { HeroSurface } from '@/components/homepage/HeroSurface';
import { PopulationToggle } from '@/components/homepage/PopulationToggle';

/**
 * FAR — the hero. The approved H1 is preserved exactly. Primary CTA routes to
 * /contact; booking is secondary. The population figure (traffic vs.
 * enquiries) is rendered by PopulationToggle — everything on this screen
 * except the surface state and that figure is Server Component output.
 *
 * Source: docs/26-resolve-homepage/prototype/index.html, hero + population
 * chapter. No dashboard, no fake metric, no decorative chart.
 *
 * SESSION 25B: type scale, hero padding, the two-column breakpoint (1060px)
 * and the narrow full-width CTA rule are taken from the approved prototype's
 * own `clamp()` values. The primary CTA is the approved tangerine
 * `--resolve-accent` with ink text (5.97:1).
 *
 * SESSION 26 — PHASE D. The hero becomes the approved two-state surface. The
 * state-dependent colours that Phase C wrote as inline styles are now tokens
 * on `.rsv-sw`, so a state change is a TOKEN change and not a per-element
 * override; their light-state values are unchanged, so the composed page is
 * identical. `.rsv-kw` adds the approved kinetic hierarchy — a mark that wipes
 * across the governing word, giving the state a channel that is not colour.
 *
 * THE PRE-PAINT SCRIPT. The approved hero STARTS on the dark traffic stage and
 * resolves toward the light state. Reaching "dark" after hydration would be a
 * full-surface light -> dark -> light cycle, which is precisely the flash the
 * motion brief forbids, so the dark stage must be the FIRST paint. This is the
 * only way to get it, and it is the same mechanism the approved prototype
 * relies on (its script runs during parse). It is nine lines, adds one
 * attribute, registers no listener, and REMOVES ITS OWN ATTRIBUTE AFTER 4s so
 * that a document whose JavaScript never hydrates returns to the resolved
 * light composition rather than sitting on the dark stage. Under
 * `prefers-reduced-motion: reduce` it does nothing at all.
 */
const HERO_FIRST_PAINT = `(function(){try{
if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var d=document.documentElement;d.setAttribute('data-rsv-hero','traffic');
setTimeout(function(){d.removeAttribute('data-rsv-hero')},4000)}catch(e){}})();`;

export function HomepageHero() {
  // `py-0` neutralises the global `section { @apply py-16 }` base rule in
  // app/globals.css so the hero owns its own approved padding.
  return (
    <HeroSurface className="rsv-sw py-0">
      <script dangerouslySetInnerHTML={{ __html: HERO_FIRST_PAINT }} />
      <Container>
        <div className="pt-[70px] pb-[65px]">
          <h1 className="max-w-[15ch] text-[clamp(2.55rem,7vw,6.4rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-balance">
            Judge us on the{' '}
            <span className="whitespace-nowrap">
              <span className="rsv-kw rsv-kw--e">enquiries</span>,
            </span>{' '}
            not the{' '}
            <span className="whitespace-nowrap">
              <span className="rsv-kw rsv-kw--t">traffic</span>.
            </span>
          </h1>

          <div className="mt-[clamp(24px,2.8vw,44px)] grid grid-cols-1 items-start gap-[clamp(26px,3.2vw,60px)] max-[761px]:gap-[clamp(84px,26vw,112px)] min-[1060px]:grid-cols-[0.92fr_1.08fr]">
            <div>
              <p className="rsv-muted max-w-[46ch] text-[clamp(1.06rem,1.35vw,1.28rem)]">
                <b className="rsv-strong font-bold">
                  Buyer demand already exists. The question is whether it reaches you.
                </b>{' '}
                We use SEO, Google Ads, paid social and conversion optimisation to help the right
                buyers find you, turn more visits into qualified enquiries, and measure what worked.
              </p>

              <div className="mt-[26px] flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 px-[26px] text-base font-bold no-underline max-[761px]:basis-full"
                  style={{
                    background: 'var(--resolve-accent)',
                    borderColor: 'var(--resolve-accent)',
                    color: '#141219',
                  }}
                >
                  Tell us what you&rsquo;re trying to fix
                </Link>
                <Link
                  href="/schedule-call"
                  className="rsv-cta-o inline-flex min-h-[52px] items-center justify-center rounded-full border-2 px-[26px] text-base font-bold no-underline max-[761px]:basis-full"
                >
                  Book a call
                </Link>
              </div>

              <Link
                href="/how-it-works"
                className="rsv-proof mt-5 inline-flex min-h-[44px] items-center border-b-2 border-current pb-1 text-[.98rem] font-semibold no-underline"
              >
                See the method, including what we can&rsquo;t attribute
              </Link>
            </div>

            <div>
              <PopulationToggle />
            </div>
          </div>
        </div>
      </Container>
    </HeroSurface>
  );
}
