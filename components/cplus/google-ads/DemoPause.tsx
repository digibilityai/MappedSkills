'use client';

import { stopDemo } from './demo';

/**
 * The Pause control present while a demonstration runs (WCAG 2.2.2). Invisible until it has keyboard focus (see `.ga-pause`),
 * so it moves nothing. The explicit tabIndex matters: Safari's default Tab order skips buttons without a tabindex attribute. Pressing it ends that demonstration for
 * good; focus is handed back by the coordinator callback.
 */
export function DemoPause({ id, text, aria }: { id: string; text: string; aria: string }) {
  return (
    <button type="button" tabIndex={0} className="ga-pause" data-demo-pause="" aria-label={aria} onClick={() => stopDemo(id)}
      // once revealed (44px), make sure all of it is on screen: the browser's own scroll-into-view ran for the 1px hidden box
      onFocus={(e) => e.currentTarget.scrollIntoView({ block: 'nearest', inline: 'nearest' })}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
        <rect x="2" y="1" width="3.5" height="12" fill="currentColor" />
        <rect x="8.5" y="1" width="3.5" height="12" fill="currentColor" />
      </svg>
      <span>{text}</span>
    </button>
  );
}
