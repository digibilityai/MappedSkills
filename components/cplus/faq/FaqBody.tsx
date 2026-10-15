import Link from 'next/link';
import { BOOKING_HREF, CONTACT_HREF, InlineLink, Mark } from '@/components/direction-c/primitives';
import { FAQ_PLAIN as F } from './content';
import './faq.css';
import { GROUPS, QAS } from './faqData';
import { FaqTools } from './FaqTools';
import { Breadcrumb } from '../Breadcrumb';

/**
 * C+ FAQ (/faq): the approved prototype's page body (proto/direction-c-plus 0a8b611, FaqH.tsx `Faq`), unchanged in
 * markup and copy. Production changes only: the breadcrumb's Home link, the "How it starts" links and the CTAs point at
 * the live routes (`/`, `/how-it-works`, CONTACT_HREF and BOOKING_HREF) instead of prototype paths. The questions and
 * answers are the production ones (./faqData.tsx); the route emits its FAQPage structured data from the same array.
 * The "How it starts" band is not a question and is not in the structured data.
 */

/* Stable anchors derived from the text, so a link to a question survives reordering elsewhere. */
const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
const qid = (q: string) => 'q-' + slug(q);
const gid = (g: string) => 'g-' + slug(g);
const num = (i: number) => String(i + 1).padStart(2, '0');

const GROUPED = GROUPS.map((g) => ({ g, items: QAS.filter((qa) => qa.group === g) })).filter((x) => x.items.length);

export function FaqBody() {
  return (
    <>
      {/* hero + index */}
      <section className="b-hero fq-hero" aria-labelledby="fq-h1">
        <div className="px-wrap fq-hero-g">
          <div>
            <Breadcrumb current={F.crumb} />
            <h1 id="fq-h1" className="b-h1 fq-h1">
              {F.h1}
            </h1>
            <p className="b-lede">{F.lede}</p>
            <p className="fq-side">{F.side}</p>
          </div>

          {/* Desktop: every question, under its group. */}
          <nav className="fq-index fq-index-full" aria-label={F.indexLabel}>
            <p className="fq-index-h">{F.indexTitle(QAS.length)}</p>
            <ol className="fq-index-g">
              {GROUPED.map(({ g, items }, gi) => (
                <li key={g}>
                  <a className="fq-index-grp" href={'#' + gid(g)}>
                    <span className="fq-index-n" aria-hidden="true">
                      {num(gi)}
                    </span>
                    {g}
                  </a>
                  <ul>
                    {items.map((qa) => (
                      <li key={qa.q}>
                        <a href={'#' + qid(qa.q)}>{qa.q}</a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </nav>

          {/* Mobile: the five groups only, so the answers stay close. */}
          <nav className="fq-index fq-index-groups" aria-label={F.indexLabel}>
            <p className="fq-index-h">{F.groupsTitle}</p>
            <ol>
              {GROUPED.map(({ g, items }, gi) => (
                <li key={g}>
                  <a href={'#' + gid(g)}>
                    <span className="fq-index-n" aria-hidden="true">
                      {num(gi)}
                    </span>
                    <span className="fq-index-t">{g}</span>
                    <span className="fq-index-c">{F.count(items.length)}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* the five groups */}
      <div className="fq-body" id="fq-body">
        <div className="px-wrap fq-tools-w">
          <FaqTools scope="#fq-body" total={QAS.length} />
        </div>
        {GROUPED.map(({ g, items }, gi) => (
          <section key={g} className={'b-sec fq-grp' + (gi % 2 === 0 ? ' b-paper' : '')} aria-labelledby={gid(g)}>
            <div className="px-wrap fq-grp-g">
              <div className="fq-grp-head">
                <span className="fq-grp-n" aria-hidden="true">
                  {num(gi)}
                </span>
                <h2 id={gid(g)} className="fq-grp-h">
                  {g}
                </h2>
                <p className="fq-grp-c">{F.count(items.length)}</p>
              </div>
              <ul className="fq-list">
                {items.map((qa) => (
                  <li key={qa.q}>
                    <details id={qid(qa.q)} className="fq-d">
                      <summary>
                        <span className="fq-q">{qa.q}</span>
                        <span className="fq-pm" aria-hidden="true" />
                      </summary>
                      <div className="fq-a">{qa.a}</div>
                    </details>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      {/* how it starts (ink): owner-confirmed process only — not a question, not structured data */}
      <section className="b-sec b-ink fq-start" aria-labelledby="fq-h-start">
        <div className="px-wrap">
          <p className="b-kicker">{F.start.kicker}</p>
          <h2 id="fq-h-start" className="b-h2">
            {F.start.h.a} <span className="b-named">{F.start.h.b}</span>
          </h2>
          <p className="fq-start-first">
            <Mark state="owned" /> {F.start.first}
          </p>
          <ol className="fq-flow">
            {F.start.steps.map((s, i) => (
              <li key={s} className={i === F.start.steps.length - 1 ? 'is-last' : undefined}>
                <span className="fq-flow-n" aria-hidden="true">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
          <ul className="fq-start-notes">
            {F.start.notes.map((n) => (
              <li key={n}>
                <Mark state="owned" /> {n}
              </li>
            ))}
          </ul>
          <p className="fq-start-links">
            <Link href="/how-it-works">{F.start.method} →</Link>
            <Link href={CONTACT_HREF}>{F.start.contact} →</Link>
          </p>
        </div>
      </section>

      {/* something not answered here (paper): production copy and links */}
      <section className="b-sec b-paper fq-more" aria-labelledby="fq-h-more">
        <div className="px-wrap">
          <h2 className="b-kicker" id="fq-h-more">
            {F.more.label}
          </h2>
          <p className="b-h2 b-h2-s">{F.more.statement}</p>
          <p className="b-body fq-more-b">
            {F.more.a}
            <InlineLink href="/how-it-works">{F.more.methodLink}</InlineLink>
            {F.more.b}
            <InlineLink href="/pricing">{F.more.pricingLink}</InlineLink>
            {F.more.c}
          </p>
        </div>
      </section>

      {/* close (tangerine): production copy and destinations */}
      <section className="b-close" aria-labelledby="fq-h-close">
        <div className="px-wrap b-close-in">
          <div>
            <p className="b-kicker fq-close-k">{F.close.label}</p>
            <h2 id="fq-h-close" className="b-h2">
              {F.close.h}
            </h2>
            <p className="b-lede">{F.close.body}</p>
          </div>
          <div className="dc-actions">
            <Link href={CONTACT_HREF} className="dc-btn dc-btn-primary">
              <Mark />
              {F.close.primary}
            </Link>
            <Link href={BOOKING_HREF} className="dc-btn dc-btn-secondary">
              <Mark />
              {F.close.secondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
