'use client';

import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef } from 'react';

import { useConsent } from '@/components/analytics/ConsentProvider';

/**
 * SESSION 33 — PHASE H2 — the consent interface.
 *
 * TWO CHOICES, PRESENTED IDENTICALLY. Accept and reject are the same element,
 * the same size, the same border, the same weight, the same colour and the same
 * position in the reading and tab order. Neither is a link, a small-print line
 * or a lower-contrast "manage" affordance. There is no pre-ticked state, no
 * close button that means acceptance, no timed auto-accept, and no
 * accept-on-scroll: the ONLY ways out of the undecided state are the two
 * buttons, and they do the opposite things with equal effort.
 *
 * IT DOES NOT BLOCK ANYTHING, BY CONSTRUCTION. It is not a dialog, it does not
 * trap focus, it sets no `aria-modal`, it renders no backdrop, it makes nothing
 * else inert and it never moves focus on its own. Every link, every field, the
 * contact form, its submission, the `/thank-you` navigation and the booking
 * link all remain operable with the banner on screen, which is the requirement
 * the brief states in those words.
 *
 * FIRST IN THE DOCUMENT, LAST ON THE SCREEN — and both on purpose. It is placed
 * immediately after the skip link so a keyboard or screen-reader visitor
 * reaches the question in two tabs instead of after the entire header, and it
 * is painted at the bottom of the viewport so it does not displace the page's
 * first screen. `role="region"` with an accessible name puts it in the landmark
 * list, so it is findable rather than merely encountered.
 *
 * `position: fixed` IS THE ONE DELIBERATE EXCEPTION TO THE RESOLVE'S "NO
 * FIXED/STICKY" RULE, and it is recorded rather than slipped in. That rule
 * governs PAGE COMPOSITION — no element of the page's own argument may pin
 * itself to the viewport. This is not part of the page's argument. It is a
 * one-time question that must be visible without hunting for it, it carries no
 * content, it appears on exactly one visit, and it removes itself permanently
 * the moment either button is pressed.
 *
 * NOTHING RENDERS BEFORE THE STORED VALUE IS READ. `hydrated` gates the whole
 * component, so a returning visitor never sees the banner flash and vanish, and
 * the server-rendered HTML contains no banner at all — which is also why it
 * cannot appear, or mislead, with JavaScript disabled.
 *
 * NO MOTION. No entrance transition, no animation, no `@keyframes`. Under
 * `prefers-reduced-motion` it behaves identically because there is nothing to
 * reduce.
 */
export function ConsentBanner() {
  const { hydrated, isOpen, accept, reject } = useConsent();

  // Release the space reserved by `data-consent-pending` in the same commit that mounts the banner (or that finds nothing to
  // ask), before paint, so the banner replaces the reserved block without moving the page.
  useLayoutEffect(() => {
    if (hydrated) document.documentElement.removeAttribute('data-consent-pending');
  }, [hydrated, isOpen]);

  if (!hydrated || !isOpen) return null;
  return <OpenBanner accept={accept} reject={reject} />;
}

/**
 * On short phones (see `.consent-banner` in `app/globals.css`) the banner is not an overlay at all: it is the first block of the
 * page, above the header, so it can never cover the hero or its call to action. Elsewhere it stays the fixed bar below.
 *
 * While the fixed bar is open it publishes its own height as `--consent-h` on the root element (see `app/globals.css`), which
 * reserves the same space at the end of the page and as scroll padding. A fixed bar therefore never hides the last lines of
 * the page, a focused control scrolls clear of it (WCAG 2.2, 2.4.11) and a call to action can always be scrolled above it.
 * Nothing about the choices, their order, their size or the stored value changes.
 */
function OpenBanner({ accept, reject }: { accept: () => void; reject: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    // Only a fixed bar needs reserved space; on short phones the banner sits in the page flow (see `.consent-banner`).
    const publish = () => {
      if (getComputedStyle(el).position === 'fixed') root.style.setProperty('--consent-h', `${Math.ceil(el.getBoundingClientRect().height)}px`);
      else root.style.removeProperty('--consent-h');
    };
    publish();
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(publish);
    ro?.observe(el);
    window.addEventListener('resize', publish);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', publish);
      root.style.removeProperty('--consent-h');
    };
  }, []);

  return (
    /*
      A `div` WITH `role="region"`, NOT A `<section>`, AND THAT IS NOT
      COSMETIC. `app/globals.css` carries a legacy base rule —
      `section { @apply py-16 }` — that governs the spacing of every existing
      page. A `<section>` here inherited 128px of vertical padding and made the
      banner 414px tall at 320px wide: 52% of the viewport. A `div` carrying the
      role is identical to assistive technology, is immune to that rule, and
      cannot be re-broken by a later class edit.
    */
    <div
      ref={ref}
      role="region"
      aria-labelledby="consent-banner-title"
      className="consent-banner fixed inset-x-0 bottom-0 z-[150] border-t border-resolve-line bg-resolve-paper"
      style={{ maxHeight: '80vh', overflowY: 'auto' }}
    >
      <div className="mx-auto flex max-w-[var(--resolve-wrap)] flex-col gap-2 px-4 py-3 sm:px-6 md:py-4 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-8 lg:px-8">
        {/* `md:basis-[20rem]` + wrap: when text is enlarged without the breakpoints moving (Firefox "Zoom Text Only",
            Android text scaling), the buttons move below the message instead of squeezing it to one word per line.
            At normal size the row still fits on one line, so the layout is unchanged. */}
        <div className="min-w-0 md:flex-1 md:basis-[20rem]">
          {/* The region's accessible name (`aria-labelledby` above). A paragraph, not a heading: this is a dialog-style
              notice, not a section of the page's outline, so it stays out of the screen reader's heading list. The
              `font-heading` and tracking utilities reproduce what the global `h2` rule supplied, so the look is unchanged. */}
          <p
            id="consent-banner-title"
            className="font-heading tracking-[-0.035em] !text-sm !font-extrabold !leading-snug text-resolve-ink md:!text-base"
          >
            Analytics cookies
          </p>
          <p className="mt-0.5 max-w-[var(--resolve-measure)] text-[13px] leading-snug text-resolve-ink md:mt-1 md:text-sm md:leading-relaxed">
            We would like to measure how this site is used, so we can improve it. Analytics stay off
            unless you accept. No advertising or personalisation cookies are set either way.{' '}
            <Link href="/privacy-policy" className="underline underline-offset-4">
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* Equal weight, equal size, equal prominence — and a two-column GRID
            rather than a flex row so that is literally true at every width.
            Under flex the two buttons sized to their own text and the refusal
            came out 4px narrower than the acceptance; a grid gives both cells
            the same track, so neither answer can ever be the smaller target.
            One row rather than two, so the pair costs the least height on the
            narrowest screens. `shrink-0` stops the paragraph squeezing them. */}
        <div className="grid shrink-0 grid-cols-2 gap-2 md:gap-3">
          <button
            type="button"
            onClick={accept}
            className="inline-flex min-h-[var(--resolve-target)] items-center justify-center border-2 border-resolve-ink px-4 py-2 text-sm font-bold text-resolve-ink sm:px-5"
          >
            Accept analytics
          </button>
          <button
            type="button"
            onClick={reject}
            className="inline-flex min-h-[var(--resolve-target)] items-center justify-center border-2 border-resolve-ink px-4 py-2 text-sm font-bold text-resolve-ink sm:px-5"
          >
            Reject analytics
          </button>
        </div>
      </div>
    </div>
  );
}
