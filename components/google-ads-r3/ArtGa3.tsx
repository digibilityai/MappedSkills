import Image from 'next/image';

/** Illustrative Google Ads situations for the R3 review variant. Generic invented business ("Your Business"); NOT client
 * campaigns, screenshots, prices or account data. Each is one labelled image for assistive technology; captions say so. */

export function SerpArt({ query = 'beginner photography course', title = 'Beginner Photography Course, Learn at Your Pace', desc = 'Live classes and feedback on your own photos. See the syllabus and book a free demo class.', links = ['Syllabus', 'Fees', 'Free demo'] }: { query?: string; title?: string; desc?: string; links?: string[] }) {
  return <div className="rv3-serp ga3-serp" role="img" aria-label={`Illustrative Google search results page: a search for ${query} shows one sponsored text ad above the organic results.`}>
    <div className="rv3-serp-bar"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" /><path d="m13 13 5 5" /></svg><span>{query}</span></div>
    <div className="rv3-serp-tabs" aria-hidden="true"><b>All</b><span>Shopping</span><span>Images</span><span>Videos</span></div>
    <div className="rv3-serp-ad">
      <p className="rv3-serp-spon"><b>Sponsored</b></p>
      <p className="rv3-serp-site"><i aria-hidden="true" />Your Business <span>https://www.yourbusiness.com</span></p>
      <p className="rv3-serp-title">{title}</p>
      <p className="rv3-serp-desc">{desc}</p>
      <p className="rv3-serp-links">{links.map((l) => <span key={l}>{l}</span>)}</p>
    </div>
    <div className="rv3-serp-org"><p className="rv3-serp-site"><i aria-hidden="true" />example.com <span>› guides</span></p><p className="rv3-serp-title rv3-serp-title--org">How to choose your first camera</p></div>
  </div>;
}

export function ShoppingArt() {
  const pos = ['12% 50%', '52% 60%', '88% 45%'];
  return <div className="ga3-shop" role="img" aria-label="Illustrative Google Shopping results: three sponsored product listings, each with a photo, a product name, a price and a store name.">
    <p className="ga3-shop-q"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" /><path d="m13 13 5 5" /></svg>cotton sweatshirt</p>
    <ul>{pos.map((p, i) => <li key={p}>
      <span className="ga3-shop-img"><Image src="/images/paid-advertising/tile-apparel.webp" alt="" fill sizes="140px" style={{ objectPosition: p }} /></span>
      <small>Sponsored</small>
      <b>Sweatshirt {i + 1}</b>
      <i aria-hidden="true" className="ga3-bar" />
      <span className="ga3-shop-st">Your Business</span>
    </li>)}</ul>
  </div>;
}

export function PmaxArt() {
  const ch = ['Search', 'Shopping', 'Display', 'YouTube', 'Maps'];
  const cx = 150, cy = 100, r = 78;
  return <svg className="ga3-svg" viewBox="0 0 300 200" role="img" aria-label="Illustrative diagram: one Performance Max campaign in the centre sends your ads to Search, Shopping, Display, YouTube and Maps.">
    {ch.map((c, i) => { const a = (-90 + i * 72) * Math.PI / 180; const x = cx + Math.cos(a) * r * 1.5, y = cy + Math.sin(a) * r; return <g key={c}>
      <line x1={cx} y1={cy} x2={x} y2={y} className="ga3-spoke" />
      <rect x={x - 32} y={y - 11} width="64" height="22" rx="11" className="ga3-chip" />
      <text x={x} y={y + 4} textAnchor="middle" className="ga3-chip-t">{c}</text>
    </g>; })}
    <circle cx={cx} cy={cy} r="30" className="ga3-hub" />
    <text x={cx} y={cy - 1} textAnchor="middle" className="ga3-hub-t">One</text>
    <text x={cx} y={cy + 12} textAnchor="middle" className="ga3-hub-t">campaign</text>
  </svg>;
}

export function DisplayArt() {
  return <div className="ga3-disp" role="img" aria-label="Illustrative website with a Display ad: an article page with a banner ad in the side column for a photography course.">
    <div className="ga3-bw-bar" aria-hidden="true"><i /><i /><i /><span /></div>
    <div className="ga3-disp-body" aria-hidden="true">
      <div className="ga3-disp-main"><b /><u /><u /><u className="s" /><u /><u className="s" /></div>
      <div className="ga3-disp-ad"><small>Ad</small><strong>Learn photography at your pace</strong><span>Book a free demo</span></div>
    </div>
  </div>;
}

export function YoutubeArt() {
  return <div className="ga3-yt" role="img" aria-label="Illustrative YouTube video player showing an ad with a Skip control and a progress bar.">
    <div className="ga3-yt-screen" aria-hidden="true"><span className="ga3-yt-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></span><em>Ad</em><span className="ga3-yt-skip">Skip ›</span></div>
    <div className="ga3-yt-bar" aria-hidden="true"><i /></div>
    <p aria-hidden="true"><b>Your Business</b><small>Sponsored</small></p>
  </div>;
}
