import './editorial.css';

export type OtpItem = { id: string; text: string; sub?: boolean };
export type OtpGroup = { label: string; items: OtpItem[] };

/**
 * "On this page" for the article, release and report templates. Wide screens: a static (not sticky) list. Narrower than 1081 px: one collapsed
 * control, a native `details` element, so Enter and Space open it and it works without script. Both render the same links to the page's existing anchors;
 * CSS shows one of them. With `groups` (the report's reading chapters) the same links are listed under numbered chapter names; every heading keeps its
 * own text and anchor.
 */
export function OnThisPage({ items, groups, label = 'On this page' }: { items: OtpItem[]; groups?: OtpGroup[] | null; label?: string }) {
  const total = groups ? groups.reduce((a, g) => a + g.items.length, 0) : items.length;
  if (total < 2) return null;
  const links = (list: OtpItem[]) => (
    <ol>
      {list.map((i) => (
        <li key={i.id} className={i.sub ? 'is-sub' : undefined}>
          <a href={`#${i.id}`}>{i.text}</a>
        </li>
      ))}
    </ol>
  );
  const list = groups ? (
    <ol className="ed-otp-g">
      {groups.map((g, n) => (
        <li key={g.label}>
          <p className="ed-otp-gh">
            <span aria-hidden="true">{String(n + 1).padStart(2, '0')}</span> {g.label}
          </p>
          {links(g.items)}
        </li>
      ))}
    </ol>
  ) : (
    links(items)
  );
  return (
    <div className="ed-otp">
      <nav className="ed-otp-d" aria-label={label}>
        <p className="ed-otp-h">{label}</p>
        {list}
      </nav>
      <details className="ed-otp-m">
        <summary>
          <span>{label}</span>
          <span className="ed-otp-n">{groups ? `${groups.length} chapters` : `${total} sections`}</span>
        </summary>
        <nav aria-label={label}>{list}</nav>
      </details>
    </div>
  );
}
