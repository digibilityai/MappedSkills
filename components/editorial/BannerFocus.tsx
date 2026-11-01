'use client';

import { useEffect } from 'react';

/**
 * Keeps keyboard focus out from behind the first-visit consent banner (DEC-112, DEC-114). One shared listener for the whole document: any number of
 * pages or components may mount this, and the listener is attached once and removed when the last one unmounts (client navigation included).
 *
 * It acts only when ALL of these hold: the last input was the keyboard (a mouse, pen or touch press never moves the page), the focused control
 * matches `:focus-visible`, it is not in the banner or the site header (so menus are untouched), and its bottom edge, with room for the focus ring,
 * sits behind the banner. It then scrolls by the least amount that clears the banner (16 px of air), and never so far that the control's own top
 * leaves the view. A control that is already visible causes no scroll. The banner, the consent choice and every form are untouched.
 */
let mounts = 0;
let keyboard = false;
const RING = 6;
const AIR = 16;

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Tab' || e.key.startsWith('Arrow') || e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') keyboard = true;
};
const onPointer = () => {
  keyboard = false;
};
const onFocus = (ev: FocusEvent) => {
  const el = ev.target as HTMLElement | null;
  const banner = document.querySelector<HTMLElement>('.consent-banner');
  if (!keyboard || !el || !banner || banner.contains(el) || el.closest('header') || !el.matches(':focus-visible')) return;
  const r = el.getBoundingClientRect();
  const top = banner.getBoundingClientRect().top;
  if (r.bottom + RING <= top) return;
  const by = Math.min(r.bottom + RING - top + AIR, r.top - AIR);
  if (by > 0) window.scrollBy({ top: by, behavior: 'instant' });
};

export function BannerFocus() {
  useEffect(() => {
    if (mounts++ === 0) {
      document.addEventListener('keydown', onKey, true);
      document.addEventListener('pointerdown', onPointer, true);
      document.addEventListener('mousedown', onPointer, true);
      document.addEventListener('touchstart', onPointer, true);
      document.addEventListener('focusin', onFocus);
    }
    return () => {
      if (--mounts === 0) {
        document.removeEventListener('keydown', onKey, true);
        document.removeEventListener('pointerdown', onPointer, true);
        document.removeEventListener('mousedown', onPointer, true);
        document.removeEventListener('touchstart', onPointer, true);
        document.removeEventListener('focusin', onFocus);
        keyboard = false;
      }
    };
  }, []);
  return null;
}
