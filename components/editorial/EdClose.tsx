import Link from 'next/link';
import { BOOKING_HREF, CONTACT_HREF } from '@/components/direction-c/primitives';
import './editorial.css';

/** The approved burnt closing band (as /work, /faq and every B2 page): headline, one sentence, a primary pill and a text link. */
export function EdClose({ id, h, body, primary, secondary, primaryHref = CONTACT_HREF, secondaryHref = BOOKING_HREF }: {
  id: string;
  h: string;
  body: string;
  primary: string;
  secondary: string;
  primaryHref?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="ed-close" id={id === 'pr-h-media' ? 'pr-media' : undefined} aria-labelledby={id} tabIndex={id === 'pr-h-media' ? -1 : undefined}>
      <div className="ed-w">
        <h2 id={id}>{h}</h2>
        <p>{body}</p>
        <div className="ed-act">
          <Link className="ed-btn" href={primaryHref}>
            {primary}
          </Link>
          <Link className="ed-link" href={secondaryHref}>
            {secondary} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
