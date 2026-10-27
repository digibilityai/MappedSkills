import { SEARCH_DEMO as D } from './content';

/** Hero animation: type a search, results appear, the sponsored result is chosen, a landing page opens and an enquiry is
 * sent. Pure CSS (no script, no dependency). The base style is the finished frame, so reduced motion, no-JS and print all
 * show the complete journey; the sequence (about 8 s) plays once and settles. Generic business, no figures, no results. */
export function HeroSearchAnim() {
  return <div className="ga4-stage" role="img" aria-label={D.label}>
    <div className="ga4-serp" aria-hidden="true">
      <div className="ga4-bar"><svg viewBox="0 0 20 20"><circle cx="8.5" cy="8.5" r="5.5" /><path d="m13 13 5 5" /></svg><span className="ga4-q"><span className="ga4-q-t">{D.query}</span></span></div>
      <div className="ga4-tabs"><b>All</b><span>Shopping</span><span>Images</span><span>Videos</span></div>
      <div className="ga4-res">
        <div className="ga4-ad">
          <p className="ga4-spon"><b>Sponsored</b></p>
          <p className="ga4-site"><i />{D.site} <span>{D.url}</span></p>
          <p className="ga4-title">{D.adTitle}</p>
          <p className="ga4-desc">{D.adDesc}</p>
        </div>
        <div className="ga4-org"><p className="ga4-site"><i />example.com <span>› guides</span></p><p className="ga4-title ga4-title--org">{D.other}</p></div>
      </div>
    </div>
    <div className="ga4-land" aria-hidden="true">
      <div className="ga4-land-bar"><i /><i /><i /><span /></div>
      <div className="ga4-land-body">
        <p className="ga4-land-h">{D.landing.h}</p>
        <p className="ga4-land-p">{D.landing.p}</p>
        <div className="ga4-field"><small>{D.landing.f1}</small><span><em className="ga4-fill ga4-fill--1" /></span></div>
        <div className="ga4-field"><small>{D.landing.f2}</small><span><em className="ga4-fill ga4-fill--2" /></span></div>
        <p className="ga4-btn">{D.landing.btn}</p>
        <p className="ga4-done"><svg viewBox="0 0 20 20"><path d="m4.5 10.5 3.6 3.6 7.4-8" /></svg>{D.landing.done}</p>
      </div>
    </div>
    <svg className="ga4-cur" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 7.5-6 1.8-2.6 6z" /></svg>
  </div>;
}
