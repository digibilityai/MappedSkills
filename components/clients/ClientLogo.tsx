import Image from 'next/image';
import type { Client } from '@/lib/clients';
import './client-logos.css';

/**
 * One client logo on a neutral light tile, shown exactly as supplied (`unoptimized`: the committed web copy is served byte for
 * byte, so the optimiser cannot re-encode or resample the colours): scaled to fit (never stretched, recoloured or
 * upscaled beyond its own pixels), with the client's name as its alt text. `chip` is the small tile laid over case-study
 * artwork; `wall` is the tile in the homepage section.
 */
export function ClientLogo({ client, variant = 'wall', sizes }: { client: Client; variant?: 'wall' | 'chip' | 'tile'; sizes?: string }) {
  const l = client.logo;
  if (!l || client.display !== 'show') return null;
  return (
    <span className={`cl-tile cl-v-${variant} cl-${l.fit}`}>
      <Image src={l.src} alt={client.name} width={l.w} height={l.h} sizes={sizes ?? (variant === 'chip' ? '160px' : '200px')} unoptimized />
    </span>
  );
}
