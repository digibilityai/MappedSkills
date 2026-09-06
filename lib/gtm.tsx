'use client';

import Script from 'next/script';

/**
 * SESSION 32 — PHASE H2 — the Google Tag Manager container script.
 *
 * WHAT THIS FILE IS NOW: the container loader, and NOTHING ELSE.
 *
 * WHAT IT WAS: the loader plus seven `dataLayer` helper functions, five of which
 * had no caller and two of which were live PII leaks —
 * `trackPhoneClick(phoneNumber)` and `trackEmailClick(email)` pushed a phone
 * number and a RAW EMAIL ADDRESS into `dataLayer`, and `trackFormSubmit`
 * accepted an arbitrary `formData` object that would have been spread into the
 * payload whole. `EVENT_TAXONOMY.md` §7 prohibits every one of those values
 * outright, and `05_FORMS_ANALYTICS.md` §2.1 required them to be REMOVED, NOT
 * RENAMED. They are removed, along with `lib/tracking.ts`, which wrapped them.
 *
 * NOTHING EMITS AN EVENT FROM THIS FILE ANY MORE. `lib/analytics.ts` is the
 * single event boundary, its parameters go through a hard sanitiser that drops
 * any value that is not a string, number or boolean, and there is no exported
 * function here that a component could reach for by accident.
 *
 * ENVIRONMENT GATED, AND THAT GATE IS LOAD-BEARING. With `NEXT_PUBLIC_GTM_ID`
 * unset this component renders `null`: no script element, no `noscript` iframe,
 * no request to Google. `.env.example` leaves it empty and no container id
 * appears anywhere in this repository — Session 01B verified in a real browser
 * that `dataLayer`, `gtag` and `fbq` were all undefined in production, so no
 * analytics has ever run on this site and there is no historical container
 * configuration to protect.
 *
 * CONSENT — UNRESOLVED, AND THIS IS THE FILE IT BLOCKS. There is no consent
 * mechanism on this site. The moment `NEXT_PUBLIC_GTM_ID` is set, this loads a
 * third-party script unconditionally on every page. THAT VARIABLE MUST NOT BE
 * SET IN PRODUCTION UNTIL THE CONSENT DECISION EXISTS. This session does not
 * invent a banner, invent consent copy, or state a legal position — all three
 * are owner and legal input, recorded as such.
 *
 * `strategy="afterInteractive"` is retained deliberately: measurement must never
 * compete with the page for the main thread, and the container reads whatever
 * `lib/analytics.ts` has already queued in `dataLayer` when it finishes loading,
 * so an event emitted before the script executes is not lost.
 */
export function GoogleTagManager() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  if (!gtmId) {
    return null;
  }

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
        }}
      />
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}
