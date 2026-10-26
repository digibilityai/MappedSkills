import Image from 'next/image';
import { TILES } from '../home/content';

/** An illustrative phone feed: a neutral post, a clearly labelled illustrative sponsored ad, another neutral post, and
 * the order and enquiry cues that follow a tap. Decorative (aria-hidden): no brands, counts, likes or results. */
export function FeedMockup() {
  return <div className="mx-feed" aria-hidden="true">
    <div className="mx-phone"><div className="mx-screen">
      <div className="mx-bar"><span>Feed</span><i /><i /></div>
      <div className="mx-post mx-post--a"><div className="mx-ph"><i className="mx-av" /><div><b /><b className="s" /></div></div><div className="mx-media mx-media--a" /><div className="mx-lines"><b /><b className="s" /></div></div>
      <div className="mx-post mx-post--ad">
        <div className="mx-ph"><i className="mx-av mx-av--ad" /><div><span className="mx-name">Your Brand</span><span className="mx-spon">Sponsored · Illustrative ad</span></div></div>
        <p className="mx-copy">Built for the trail. Pick your layers and order online.</p>
        <div className="mx-media mx-media--ad"><Image src={TILES.apparel.src} alt="" fill sizes="300px" /></div>
        <div className="mx-cta"><span><small>yourbrand.com</small><b>Shop the new range</b></span><em>Shop now<i className="mx-tap" /></em></div>
      </div>
      <div className="mx-post mx-post--b"><div className="mx-ph"><i className="mx-av" /><div><b /><b className="s" /></div></div><div className="mx-media mx-media--b" /></div>
    </div></div>
    <ul className="mx-cues">
      <li className="mx-cue mx-cue--1"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 8 8 6 8-6" /></svg><span><b>New enquiry</b><small>Sent from your website</small></span></li>
      <li className="mx-cue mx-cue--2"><svg viewBox="0 0 24 24"><path d="M5 8h14l-1 11H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg><span><b>New order</b><small>Placed on your website</small></span></li>
    </ul>
  </div>;
}
