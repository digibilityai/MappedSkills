'use client';

import Script from 'next/script';

import { useConsent } from '@/components/analytics/ConsentProvider';

/**
 * SESSION 33 — PHASE H2 — the Google Tag Manager container script,
 * CONSENT-GATED.
 *
 * WHAT THIS FILE IS: the container loader, and NOTHING ELSE. It emits no event,
 * exports no helper and defines no global. `lib/analytics.ts` is the single
 * event boundary and `lib/consent.ts` is the single consent boundary.
 *
 * ---------------------------------------------------------------------------
 * TWO GATES, AND BOTH MUST OPEN.
 *
 *   1. `NEXT_PUBLIC_GTM_ID` must be set. Unset, this renders `null` — no script
 *      element, no request to Google, and an application that works exactly as
 *      it does today. `.env.example` leaves it empty and NO CONTAINER ID IS
 *      WRITTEN ANYWHERE IN THIS REPOSITORY; the production value is host
 *      configuration.
 *   2. The visitor must have explicitly accepted analytics. `state === 'granted'`
 *      is the only value that loads anything. `unset` and `denied` are treated
 *      identically here: NO THIRD-PARTY SCRIPT IS REQUESTED AT ALL.
 *
 * WHY THE CONTAINER ITSELF IS GATED, AND NOT ONLY THE TAGS INSIDE IT. Consent
 * Mode v2 alone — load the container always, let denied defaults restrain the
 * tags — is a valid Google implementation, and it is the weaker of the two for
 * a visitor who has said no or has not been asked. It still fetches a
 * third-party script from `googletagmanager.com` and still lets Google's tags
 * transmit cookieless pings. Gating the loader means a REFUSAL IS A REFUSAL:
 * nothing is fetched, nothing is transmitted, and there is no state in which
 * Google is contacted on behalf of somebody who declined. The consent defaults
 * are pushed regardless, from the document head, so the belt and the braces are
 * both present: even if this gate were ever removed, the container could not
 * read a granted state the visitor did not give.
 *
 * ORDERING IS A PROPERTY OF THE DOCUMENT, NOT OF THIS COMPONENT. By the time
 * anything here can render, the inline bootstrap in `<head>` has already put
 * `consent default` (all four DENIED) at the front of `dataLayer`, followed by
 * the replayed `consent update` for a returning accepted visitor. The container
 * reads the queue from the beginning when it finishes loading, so it sees the
 * consent commands before it sees a single event — including any `page_view` or
 * `lead_form_submitted` that `lib/analytics.ts` queued while it was loading.
 * That queue is what keeps a conversion completed on a slow connection from
 * being lost.
 *
 * `strategy="afterInteractive"` is retained: measurement must never compete
 * with the page for the main thread, and nothing is lost by loading late
 * because the queue is read from the start.
 *
 * THE `<noscript>` IFRAME WAS REMOVED, and its removal is the point. It loaded
 * `googletagmanager.com/ns.html` unconditionally for every visitor with
 * JavaScript disabled — visitors who by definition cannot be shown a consent
 * banner, cannot make a choice and cannot have one read back. There is no
 * honest way to gate it, so it does not ship. Without JavaScript this site now
 * contacts no analytics provider at all, which is the correct behaviour and is
 * recorded as such rather than treated as a regression.
 *
 * DOUBLE INJECTION IS GUARDED TWICE. `next/script` will not re-inject an id it
 * has already run, and the snippet itself returns early if the flag it sets is
 * already present — so a remount, a fast re-render or a second copy of this
 * component cannot produce two containers and two of every tag.
 */
export function GoogleTagManager() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const { state } = useConsent();

  if (!gtmId) return null;
  if (state !== 'granted') return null;

  return (
    <Script
      id="gtm-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){if(w.__msGtmLoaded)return;w.__msGtmLoaded=true;
w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
      }}
    />
  );
}
