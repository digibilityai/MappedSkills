'use client';

import { stopDemo } from './demo';

/**
 * The Pause control shown while a demonstration runs (WCAG 2.2.2). Visible text "Pause"; the accessible name contains
 * it. It hangs above its region (see `.ga-pause`) so showing it moves nothing. Pressing it ends that demonstration for
 * good; focus is handed back by the coordinator callback.
 */
export function DemoPause({ id, text, aria }: { id: string; text: string; aria: string }) {
  return (
    <button type="button" className="ga-pause" data-demo-pause="" aria-label={aria} onClick={() => stopDemo(id)}>
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
        <rect x="2" y="1" width="3.5" height="12" fill="currentColor" />
        <rect x="8.5" y="1" width="3.5" height="12" fill="currentColor" />
      </svg>
      <span>{text}</span>
    </button>
  );
}
