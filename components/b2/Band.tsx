import { ActionLink } from '../paid-advertising/ActionLink';

/** The one closing action of a B2 page: full-bleed tangerine, Ink text (white on tangerine fails contrast). */
export function Band({ id, h, body, children }: { id: string; h: string; body: string; children?: React.ReactNode }) {
  return (
    <section className="b2-band" aria-labelledby={id}>
      <div className="pa-wrap">
        <h2 id={id}>{h}</h2>
        <p>{body}</p>
        <div className="pa-actions">
          <ActionLink variant="dark" />
          {children}
        </div>
      </div>
    </section>
  );
}
