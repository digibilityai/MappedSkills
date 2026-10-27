import Image from 'next/image';

/** Illustrative advertising situations for THE RESOLVE R3. Generic invented business ("Your Brand"); NOT client campaigns,
 * screenshots or account data. Each is exposed to assistive technology as one labelled image; the caption says so on screen. */

export function GoogleSerp() {
  return <div className="rv3-serp" role="img" aria-label="Illustrative Google search results page: a buyer searches for a product and sees one sponsored result above the organic results.">
    <div className="rv3-serp-bar"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" /><path d="m13 13 5 5" /></svg><span>waterproof riding jacket</span></div>
    <div className="rv3-serp-tabs" aria-hidden="true"><b>All</b><span>Shopping</span><span>Images</span><span>News</span></div>
    <div className="rv3-serp-ad">
      <p className="rv3-serp-spon"><b>Sponsored</b></p>
      <p className="rv3-serp-site"><i aria-hidden="true" />Your Brand <span>https://www.yourbrand.com</span></p>
      <p className="rv3-serp-title">Waterproof Riding Jackets | Shop the Range</p>
      <p className="rv3-serp-desc">Built for long rides and changing weather. Browse jackets, gloves and riding accessories.</p>
      <p className="rv3-serp-links"><span>Jackets</span><span>Gloves</span><span>Size guide</span></p>
    </div>
    <div className="rv3-serp-org"><p className="rv3-serp-site"><i aria-hidden="true" />example.com <span>› guides</span></p><p className="rv3-serp-title rv3-serp-title--org">How to choose a waterproof riding jacket</p><p className="rv3-serp-desc">What to look for in fabric, fit and ventilation before you buy.</p></div>
    <div className="rv3-serp-org"><p className="rv3-serp-site"><i aria-hidden="true" />example.org <span>› reviews</span></p><p className="rv3-serp-title rv3-serp-title--org">Touring jackets compared</p></div>
  </div>;
}

export function MetaFeed() {
  return <div className="rv3-feed" role="img" aria-label="Illustrative Facebook and Instagram feed advertisement: a sponsored post with a product image and a Shop now button.">
    <div className="rv3-feed-top"><i aria-hidden="true" /><div><p><b>Your Brand</b></p><p>Sponsored</p></div><span aria-hidden="true">···</span></div>
    <p className="rv3-feed-copy">Built for the road ahead. Meet the new season range.</p>
    <div className="rv3-feed-img"><Image src="/images/paid-advertising/tile-apparel.webp" alt="" fill sizes="(min-width: 900px) 320px, 80vw" /></div>
    <div className="rv3-feed-cta"><div><p>yourbrand.com</p><p><b>New season range</b></p></div><span>Shop now</span></div>
    <div className="rv3-feed-act" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.6-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.4-9 9-9 9z" /></svg>
      <svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.6A8 8 0 1 1 21 12z" /></svg>
      <svg viewBox="0 0 24 24"><path d="M22 3 2 11l7 3 3 7zM9 14l13-11" /></svg>
    </div>
  </div>;
}
