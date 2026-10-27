import { FEED_DEMO as D } from './content';

/** Illustrative artwork for the Meta Ads R1 preview. Generic business, original vector scenes, no brands, no counts, no results.
 * Everything here is decorative (aria-hidden): the surrounding text carries the meaning. */

export type SceneKind = 'trail' | 'learn' | 'home';

/** A flat, original scene used as the "photo" inside illustrative ads. Never presented as a client image. */
export function Scene({ kind = 'trail' }: { kind?: SceneKind }) {
  if (kind === 'learn') return <svg className="mr1-scene" viewBox="0 0 120 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <rect width="120" height="90" fill="#FFE3D1" />
    <rect x="22" y="22" width="76" height="46" rx="5" fill="#141219" /><rect x="27" y="27" width="66" height="36" rx="2" fill="#FFFDF9" />
    <rect x="33" y="33" width="30" height="4" rx="2" fill="#141219" /><rect x="33" y="41" width="46" height="3" rx="1.5" fill="#8E8798" /><rect x="33" y="48" width="38" height="3" rx="1.5" fill="#8E8798" />
    <circle cx="80" cy="45" r="8" fill="#FF5B04" /><path d="m76.500 45 2.600 2.600 4.600-5.200" fill="none" stroke="#141219" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 72h92l-6 6H20z" fill="#141219" />
  </svg>;
  if (kind === 'home') return <svg className="mr1-scene" viewBox="0 0 120 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <rect width="120" height="90" fill="#F3E3C9" /><circle cx="94" cy="20" r="9" fill="#FF5B04" />
    <rect x="20" y="30" width="34" height="50" fill="#141219" /><rect x="58" y="18" width="30" height="62" fill="#5C5665" /><rect x="92" y="40" width="18" height="40" fill="#8E8798" />
    {[0, 1, 2, 3].map((r) => [0, 1].map((c) => <rect key={`a${r}${c}`} x={26 + c * 14} y={36 + r * 10} width="7" height="6" fill="#FFE3D1" />))}
    {[0, 1, 2, 4].map((r) => [0, 1].map((c) => <rect key={`b${r}${c}`} x={63 + c * 12} y={24 + r * 10} width="6" height="6" fill="#F7F3EC" />))}
    <rect x="0" y="80" width="120" height="10" fill="#141219" />
  </svg>;
  return <svg className="mr1-scene" viewBox="0 0 120 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <rect width="120" height="90" fill="#FFE3D1" /><circle cx="86" cy="26" r="11" fill="#FF5B04" />
    <path d="M0 78 38 32l20 24 16-18 46 40z" fill="#5C5665" /><path d="M0 90V70l30-22 26 28 22-14 42 30v18z" fill="#141219" />
    <path d="m38 32 7 8-7-2-6 3z" fill="#FFFDF9" />
  </svg>;
}

/** A small sponsored tile used by the "Why Meta Ads" scenes. */
export function MiniAd({ kind }: { kind: SceneKind }) {
  return <div className="mr1-mini" aria-hidden="true">
    <div className="mr1-mini-top"><i /><span><b>{D.brand}</b><small>{D.spon}</small></span></div>
    <div className="mr1-mini-img"><Scene kind={kind} /></div>
    <div className="mr1-mini-bar"><span /><em /></div>
  </div>;
}

const Chev = () => <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="m6 12 4-4 4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

function Head({ n }: { n?: string }) {
  return <div className="mr1-ph-head"><i className="mr1-av" /><span><b>{D.brand}</b><small>{n ?? D.spon}</small></span></div>;
}
function Cta({ label = D.cta }: { label?: string }) {
  return <div className="mr1-ph-cta"><span><small>{D.site}</small><b>Shop the new range</b></span><em>{label}</em></div>;
}

/** Phone shell shared by the selector illustrations. */
function Phone({ id, dark = false, children }: { id: string; dark?: boolean; children: React.ReactNode }) {
  return <div className={`mr1-phone mr1-phone--${id}`} data-dark={dark ? 'true' : undefined} aria-hidden="true"><div className="mr1-screen">{children}</div></div>;
}

export function FeedArt() {
  return <Phone id="feed">
    <div className="mr1-status"><span>Feed</span><i /><i /></div>
    <div className="mr1-post"><div className="mr1-ph-head"><i className="mr1-av mr1-av--g" /><span><b className="mr1-ln" /><b className="mr1-ln mr1-ln--s" /></span></div><div className="mr1-gimg" /></div>
    <div className="mr1-post mr1-post--ad mr1-a">
      <Head />
      <p className="mr1-ph-copy">{D.copy}</p>
      <div className="mr1-ph-img"><Scene kind="trail" /></div>
      <Cta />
    </div>
    <div className="mr1-post"><div className="mr1-ph-head"><i className="mr1-av mr1-av--g" /><span><b className="mr1-ln" /><b className="mr1-ln mr1-ln--s" /></span></div></div>
  </Phone>;
}

export function StoriesArt() {
  return <Phone id="stories" dark>
    <div className="mr1-prog"><i /><i className="mr1-prog-on" /><i /></div>
    <div className="mr1-st-head"><Head /></div>
    <div className="mr1-st-img mr1-a"><Scene kind="trail" /></div>
    <p className="mr1-st-copy">Made for long rides.</p>
    <div className="mr1-st-more mr1-b"><Chev /><b>Learn more</b></div>
  </Phone>;
}

export function ReelsArt() {
  return <Phone id="reels" dark>
    <div className="mr1-rl-img mr1-a"><Scene kind="trail" /></div>
    <div className="mr1-rl-play" />
    <div className="mr1-rl-side"><i /><i /><i /></div>
    <div className="mr1-rl-cap"><Head /><p>{D.copy}</p><em className="mr1-b">{D.cta}</em></div>
    <div className="mr1-rl-bar"><i /></div>
  </Phone>;
}

export function CarouselArt() {
  return <Phone id="carousel">
    <div className="mr1-status"><span>Feed</span><i /><i /></div>
    <div className="mr1-post mr1-post--ad">
      <Head />
      <p className="mr1-ph-copy">Pick your layers for the season.</p>
      <div className="mr1-cr"><div className="mr1-cr-track mr1-a">
        {['Jackets', 'Layers', 'Packs'].map((t) => <div className="mr1-cr-card" key={t}><div className="mr1-cr-img"><Scene kind="trail" /></div><b>{t}</b><small>See more</small></div>)}
      </div></div>
      <div className="mr1-dots"><i className="on" /><i /><i /></div>
    </div>
    <div className="mr1-post"><div className="mr1-ph-head"><i className="mr1-av mr1-av--g" /><span><b className="mr1-ln" /><b className="mr1-ln mr1-ln--s" /></span></div><div className="mr1-gimg" /></div>
  </Phone>;
}

export function LeadArt() {
  return <Phone id="lead">
    <div className="mr1-status"><span>Feed</span><i /><i /></div>
    <div className="mr1-post mr1-post--ad mr1-post--dim"><Head /><div className="mr1-ph-img mr1-ph-img--s"><Scene kind="learn" /></div></div>
    <div className="mr1-sheet mr1-a">
      <b className="mr1-sheet-t">Get details</b>
      <label><small>Name</small><span><em /></span></label>
      <label><small>Phone</small><span><em className="mr1-fl2" /></span></label>
      <p className="mr1-sheet-b mr1-b">Send enquiry</p>
    </div>
  </Phone>;
}
