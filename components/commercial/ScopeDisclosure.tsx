'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * PHASE J — STAGE 2 — the ScopeList disclosure leaf.
 *
 * WHAT IT DOES: collapses a server-rendered set of `<details>` down to one open
 * member and keeps it that way. Nothing else.
 *
 * ---------------------------------------------------------------------------
 * WHY IT TOUCHES ONLY THE `open` ATTRIBUTE — this is the whole safety argument.
 *
 * During the Phase J design gate, Prototype A moved the selected panel into a
 * second container and emptied that container with `innerHTML = ''` before each
 * move. Cycling the six items DESTROYED two panels and permanently deleted two
 * paragraphs of approved copy from the page
 * (docs/28-phase-j-visual-interaction/04_PROTOTYPE_REVIEW.md §5, defect 1).
 *
 * That class of failure is not defended against here — it is made STRUCTURALLY
 * IMPOSSIBLE. This component never creates, moves, clones, replaces or removes
 * a node. It sets a boolean attribute on elements the server rendered. There is
 * no code path that can change the document's content, so no amount of cycling,
 * resizing or rapid clicking can lose a scope item or duplicate one.
 *
 * ---------------------------------------------------------------------------
 * WHY `<details>` RATHER THAN A TABLIST. A tablist's non-selected panels must be
 * hidden by script, which means the SERVER has to decide what a reader with no
 * JavaScript sees. `<details open>` inverts that: the server sends every panel
 * OPEN, so no-JS, a failed hydration and a crawler all get the complete set in
 * raw HTML, and collapsing is purely an enhancement this file adds afterwards.
 * `<summary>` is also natively focusable and natively toggled by Enter and
 * Space, so the keyboard contract does not depend on this file being correct.
 *
 * NOT USED: the native `name` attribute, which gives browsers a built-in
 * exclusive accordion. With `name` set, a browser closes all but one member AT
 * PARSE TIME — which would silently collapse the page for a reader with no
 * JavaScript and defeat the reason `<details>` was chosen. Exclusivity is done
 * here instead, where it can only ever apply once scripting is running.
 */
export function ScopeDisclosure({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLDetailsElement>('details[data-scope-item]'));
    // A set of one discloses nothing. Leave it exactly as the server sent it.
    if (items.length < 2) return;

    // Collapse to the first member. This is the ONLY content-visibility change
    // this component ever makes, and it is reversible by the reader.
    items.forEach((d, i) => {
      d.open = i === 0;
    });
    root.setAttribute('data-scope-ready', 'true');

    /* Exclusivity. `toggle` fires after the browser has already applied the
       reader's action, so this only ever CLOSES siblings — it never fights the
       element the reader just opened, and it cannot loop: closing a sibling
       fires its own `toggle` with `open === false`, which returns immediately. */
    const onToggle = (event: Event) => {
      const opened = event.target as HTMLDetailsElement;
      if (!opened.open) return;
      items.forEach((d) => {
        if (d !== opened) d.open = false;
      });
    };

    /* Roving the keyboard between summaries. An enhancement on top of the
       native contract, not a replacement for it: Enter and Space still toggle,
       Tab still moves, and removing this block would cost no functionality. */
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      if (key !== 'ArrowDown' && key !== 'ArrowUp' && key !== 'Home' && key !== 'End') return;
      const summaries = items.map((d) => d.querySelector('summary'));
      const here = summaries.indexOf(document.activeElement as HTMLElement);
      if (here === -1) return;
      let next: number;
      if (key === 'ArrowDown') next = (here + 1) % summaries.length;
      else if (key === 'ArrowUp') next = (here - 1 + summaries.length) % summaries.length;
      else if (key === 'Home') next = 0;
      else next = summaries.length - 1;
      event.preventDefault();
      summaries[next]?.focus();
    };

    items.forEach((d) => d.addEventListener('toggle', onToggle));
    root.addEventListener('keydown', onKeyDown);

    return () => {
      items.forEach((d) => d.removeEventListener('toggle', onToggle));
      root.removeEventListener('keydown', onKeyDown);
      /* Unmount restores the server state. A reader who navigates away and back
         must not find a page that has quietly kept five of six items shut with
         no script running to reopen them. */
      root.removeAttribute('data-scope-ready');
      items.forEach((d) => {
        d.open = true;
      });
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
