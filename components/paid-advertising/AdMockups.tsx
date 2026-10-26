import Image from 'next/image';
import { TILES } from './home/content';

/** Demonstration ad mockups (no client results, counts or graphs), shared by the homepage and /services. aria-hidden: decorative. */
export function SearchAdMockup() {
  return <div className="pa-platform pa-platform--search" aria-hidden="true">
    <div className="pa-search-bar"><svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="8.5" cy="8.5" r="5.5" /><path d="m13 13 4.5 4.5" /></svg><span>online baking course</span></div>
    <div className="pa-ad">
      <p className="pa-ad-label"><b>Sponsored</b></p>
      <p className="pa-ad-site"><i />Your Business <span>yourbusiness.com</span></p>
      <p className="pa-ad-title">Eggless Baking Courses, Start Anytime</p>
      <p className="pa-ad-copy">Learn at your pace with live guidance. See the syllabus and book a free demo class.</p>
      <p className="pa-ad-links"><span>Syllabus</span><span>Fees</span><span>Free demo</span></p>
    </div>
    <div className="pa-organic"><span /><span className="pa-organic-short" /></div>
  </div>;
}
export function MetaAdMockup() {
  return <div className="pa-platform pa-platform--social" aria-hidden="true">
    <div className="pa-post-head"><i /><div><b>Your Brand</b><small>Sponsored · Facebook and Instagram</small></div></div>
    <p className="pa-post-copy">Built for the trail. Pick your layers and order online.</p>
    <div className="pa-post-media"><Image src={TILES.apparel.src} alt="" fill sizes="(max-width: 600px) 60vw, 280px" /></div>
    <div className="pa-post-cta"><div><small>yourbrand.com</small><b>Shop the new range</b></div><span>Shop now</span></div>
  </div>;
}
