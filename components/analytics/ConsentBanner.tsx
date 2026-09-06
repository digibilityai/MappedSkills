'use client';

import Link from 'next/link';

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

  if (!hydrated || !isOpen) return null;

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
      role="region"
      aria-labelledby="consent-banner-title"
      className="fixed inset-x-0 bottom-0 z-[150] border-t border-resolve-line bg-resolve-paper"
      style={{ maxHeight: '80vh', overflowY: 'auto' }}
    >
      <div className="mx-auto flex max-w-[var(--resolve-wrap)] flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-8 lg:px-8">
        <div className="min-w-0">
          {/* A real heading, so the region has a programmatic name and shows up
              in a screen reader's heading list. Sized down deliberately: the
              global `h2` scale is display type and would shout here. */}
          <h2
            id="consent-banner-title"
            className="!text-base !font-extrabold !leading-snug text-resolve-ink"
          >
            Analytics cookies
          </h2>
          <p className="mt-1 max-w-[var(--resolve-measure)] text-sm leading-relaxed text-resolve-ink">
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
        <div className="grid shrink-0 grid-cols-2 gap-3">
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
