'use client';

import { useEffect } from 'react';

import { useConsent } from '@/components/analytics/ConsentProvider';

/**
 * TWO GATES, BOTH REQUIRED — the same contract `lib/gtm.tsx` already holds.
 *
 * This component previously had only ONE gate: `NEXT_PUBLIC_META_PIXEL_ID`.
 * Setting that single variable would have loaded `fbevents.js` and fired
 * `PageView` for EVERY visitor regardless of what they chose, because nothing
 * here read the consent state. The layout carried a "⚠ MUST NOT BE SET"
 * warning in place of the gate, which makes a documented comment the only
 * thing standing between the site and loading a third-party tracker before
 * consent.
 *
 * The consent check below closes that. It changes NOTHING today — the pixel is
 * unconfigured, so both the old code and this render nothing — and it does NOT
 * pre-empt the open owner decision on whether Meta Pixel is retained at all
 * (`EVENT_TAXONOMY.md` §9 decision 4). It only makes "retained" safe.
 */
export function MetaPixel() {
  const { state } = useConsent();

  useEffect(() => {
    // Only initialize if pixel ID is configured AND analytics consent is granted
    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    if (!pixelId) return;
    if (state !== 'granted') return;

    // Lazy load Meta Pixel script to prevent CLS
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    // Add noscript image for fallback
    const noscript = document.createElement('noscript');
    const img = document.createElement('img');
    img.height = 1;
    img.width = 1;
    img.style.display = 'none';
    img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
    noscript.appendChild(img);
    document.head.appendChild(noscript);

    return () => {
      if (script.parentElement) {
        document.head.removeChild(script);
      }
      if (noscript.parentElement) {
        document.head.removeChild(noscript);
      }
    };
  }, [state]);

  return null;
}

// Helper function to track custom events
export function trackMetaPixelEvent(eventName: string, data?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, data);
  }
}
