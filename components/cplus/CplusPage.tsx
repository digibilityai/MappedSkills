import type { ReactNode } from 'react';
import { DcPage } from '@/components/direction-c/primitives';
import { CplusMotion } from './CplusMotion';
import './cplus.css';

/* Marks JavaScript as available (`html.px-js`) before first paint, as the approved prototype's page shell does, so the
   no-JavaScript fallbacks (every tab panel shown, toggles hidden) never flash for a JavaScript-capable visitor. */
const FIRST_PAINT = `try{document.documentElement.classList.add('px-js')}catch(e){}`;

/**
 * Production page shell for an integrated C+ page: the Direction C page scope plus the C+ hybrid roots
 * (`px px-b px-h`, as in the approved prototype), the first-paint script and the one-shot reveal. The prototype's
 * review bar and concept switching are deliberately not included. The site header and footer come from the root layout.
 */
export function CplusPage({ children }: { children: ReactNode }) {
  return (
    <DcPage className="px px-b px-h">
      <script dangerouslySetInnerHTML={{ __html: FIRST_PAINT }} />
      <CplusMotion />
      {children}
    </DcPage>
  );
}
