import { wallClients } from '@/lib/clients';
import { ClientLogo } from './ClientLogo';

/** Share of a band's width by shape: wide marks get more room so they read larger; near-square marks get less. */
const GROW = { wide: 1.5, mid: 1.15, square: 1.05 } as const;

/**
 * The homepage client showcase: the clients the register says may be shown (alphabetical, dealt round-robin into three
 * bands so each band is a mix and the counts differ by at most one). Three bands on desktop, a static three-column grid
 * below 1081 px. Each logo sits in an equal cell, so a band can never overflow its container. No marquee: the bands only
 * drift a few pixels with the scroll (CSS, client-logos.css), and not at all with reduced motion.
 */
export function ClientLogoWall() {
  const clients = wallClients();
  if (!clients.length) return null;
  const rows: typeof clients[] = [[], [], []];
  clients.forEach((c, i) => rows[i % 3].push(c));
  return (
    <div className="cl-bands">
      {rows.map((row, r) => (
        <ul key={r} className={`cl-band cl-band-${r + 1}`} role="list" aria-label={`Clients, group ${r + 1} of 3`} data-rv="" style={{ '--i': r + 1 } as React.CSSProperties}>
          {row.map((c) => (
            <li key={c.key} style={{ '--g': GROW[c.logo?.fit ?? 'mid'] } as React.CSSProperties}>
              <ClientLogo client={c} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
