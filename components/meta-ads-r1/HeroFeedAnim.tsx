import { FEED_DEMO as D } from './content';
import { Scene } from './ArtMeta';

/** Hero animation: a person scrolls a feed, notices a sponsored ad, taps it, looks at the offer and sends an enquiry.
 * Pure CSS (no script, no dependency). The base style is the finished frame, so reduced motion, no-JS and print all show the
 * complete journey; the sequence (about 7.6 s) plays once and settles. Generic business, no counts, no results. */
export function HeroFeedAnim() {
  return <div className="mr1-stage" role="img" aria-label={D.label}>
    <div className="mr1-hphone" aria-hidden="true"><div className="mr1-hscreen">
      <div className="mr1-hstatus"><span>Feed</span><i /><i /></div>
      <div className="mr1-hfeed"><div className="mr1-hscroll">
        <div className="mr1-hpost"><div className="mr1-hhead"><i className="mr1-av mr1-av--g" /><span><b className="mr1-ln" /><b className="mr1-ln mr1-ln--s" /></span></div><div className="mr1-gimg mr1-gimg--t" /></div>
        <div className="mr1-hpost"><div className="mr1-hhead"><i className="mr1-av mr1-av--g" /><span><b className="mr1-ln" /><b className="mr1-ln mr1-ln--s" /></span></div><div className="mr1-gimg mr1-gimg--s" /></div>
        <div className="mr1-hpost mr1-hpost--ad">
          <div className="mr1-hhead"><i className="mr1-av" /><span><b>{D.brand}</b><small>{D.spon}</small></span></div>
          <p className="mr1-hcopy">{D.copy}</p>
          <div className="mr1-himg"><Scene kind="trail" /></div>
          <div className="mr1-hcta"><span><small>{D.site}</small><b>Shop the new range</b></span><em>{D.cta}<i className="mr1-tap" /></em></div>
        </div>
        <div className="mr1-hpost"><div className="mr1-hhead"><i className="mr1-av mr1-av--g" /><span><b className="mr1-ln" /><b className="mr1-ln mr1-ln--s" /></span></div><div className="mr1-gimg mr1-gimg--s" /></div>
      </div></div>
    </div></div>

    <div className="mr1-hland" aria-hidden="true">
      <div className="mr1-hland-bar"><i /><i /><i /><span /></div>
      <div className="mr1-hland-img"><Scene kind="trail" /></div>
      <div className="mr1-hland-body">
        <p className="mr1-hland-h">{D.landing.h}</p>
        <p className="mr1-hland-p">{D.landing.p}</p>
        <div className="mr1-field"><small>{D.landing.f1}</small><span><em className="mr1-fill mr1-fill--1" /></span></div>
        <div className="mr1-field"><small>{D.landing.f2}</small><span><em className="mr1-fill mr1-fill--2" /></span></div>
        <p className="mr1-hbtn">{D.landing.btn}</p>
        <p className="mr1-hdone"><svg viewBox="0 0 20 20"><path d="m4.5 10.5 3.6 3.6 7.4-8" /></svg>{D.landing.done}</p>
      </div>
    </div>
  </div>;
}
