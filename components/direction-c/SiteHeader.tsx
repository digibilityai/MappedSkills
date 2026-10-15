'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';
import { PRIMARY_LINKS, SERVICE_GROUPS, SERVICES_HUB, SERVICE_ROUTES } from '@/components/direction-c/nav';

/**
 * UI REVAMP GATE 2 — DIRECTION C — header and navigation.
 *
 * - NOT STICKY. `position: relative`, in normal flow (DEC-018 §4.5 "0 fixed /
 *   sticky"; DEC-030 records `sticky top-0` as an unapproved regression).
 * - Full navigation at ≥1200px; below that, Contact Us + Menu (removes the
 *   1024–1080 overflow, Gate 0 R2).
 * - Services is a SPLIT CONTROL (Gate 3 R1): a real link to /services, then a
 *   button that discloses the service links in chain order — not
 *   `role="menu"` (Gate 0 §14). Closed links are `inert`, Escape closes and
 *   returns focus to the button, an outside click closes.
 * - The mobile menu is in page flow and opens with Contact Us and Book a call
 *   FIRST. While it is open the bar's own CTA pair is withdrawn, so there is
 *   one Contact Us on screen (DEC-034 ruling 4) — same destinations, same
 *   labels. A "Company" label heads the company links (DEC-034 ruling 6).
 *
 * LIVE-1 (DEC-033) is a defect of the LEGACY sticky header and is NOT fixed by
 * this component: every route other than /, /services and /seo still renders
 * the legacy header, and production is untouched. This header simply does not
 * contain the structure that produces it.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const svcBtn = useRef<HTMLButtonElement>(null);
  const svcWrap = useRef<HTMLDivElement>(null);

  /* A route change closes both surfaces. Adjusted during render (React's
     "storing information from previous renders" pattern), not in an effect. */
  const [shownFor, setShownFor] = useState(pathname);
  if (shownFor !== pathname) {
    setShownFor(pathname);
    setMenuOpen(false);
    setSvcOpen(false);
  }

  useEffect(() => {
    if (!menuOpen && !svcOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (svcOpen) {
        setSvcOpen(false);
        svcBtn.current?.focus();
      }
      if (menuOpen) {
        setMenuOpen(false);
        menuBtn.current?.focus();
      }
    };
    const onDown = (e: MouseEvent) => {
      if (svcOpen && svcWrap.current && !svcWrap.current.contains(e.target as Node)) setSvcOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [menuOpen, svcOpen]);

  const current = (href: string) => (pathname === href ? 'page' : undefined);
  const inServices = pathname ? SERVICE_ROUTES.has(pathname) : false;

  return (
    <header className={cn('dc dc-hdr', menuOpen && 'dc-menu-open')}>
      <div className="dc-wrap dc-bar" ref={svcWrap}>
        <span className="dc-logo">
          <Logo priority />
        </span>

        <nav className="dc-nav" aria-label="Primary">
          {/* Gate 3 R1: a split control. "Services" is a real link to the
              hub, so the route works with a click, a tap, and with no
              JavaScript; the adjacent button only discloses the panel. */}
          <Link
            className="dc-svc-link"
            href={SERVICES_HUB.href}
            aria-current={current(SERVICES_HUB.href)}
            data-current={inServices ? '' : undefined}
          >
            Services
          </Link>
          <button
            ref={svcBtn}
            type="button"
            className="dc-svc-btn"
            aria-label="Services submenu"
            aria-expanded={svcOpen}
            aria-controls="dc-svc-panel"
            data-current={inServices ? '' : undefined}
            onClick={() => setSvcOpen((v) => !v)}
          >
            <span className="dc-chev" aria-hidden="true" />
          </button>
          {/* without JavaScript the disclosure cannot open: hide the dead
              button and leave the working link */}
          <noscript>
            <style>{'.dc-svc-btn{display:none!important}'}</style>
          </noscript>
          <div className="dc-svc-panel" id="dc-svc-panel" data-open={svcOpen} inert={!svcOpen}>
            <div className="dc-wrap dc-g12">
              {SERVICE_GROUPS.map((group) => (
                <div className="dc-svc-group" key={group.stage}>
                  <p className="dc-label">
                    <span className={cn('dc-mk', group.mark)} aria-hidden="true" />
                    {group.stage}
                  </p>
                  {group.links.map((l) => (
                    <Link key={l.href} href={l.href} aria-current={current(l.href)} onClick={() => setSvcOpen(false)}>
                      {l.label}
                    </Link>
                  ))}
                  {group.stage === 'Measure' && (
                    <Link href={SERVICES_HUB.href} aria-current={current(SERVICES_HUB.href)} onClick={() => setSvcOpen(false)}>
                      {SERVICES_HUB.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
          {PRIMARY_LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={current(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="dc-right">
          <Link className="dc-book" href="/schedule-call">
            Book a call
          </Link>
          <Link className="dc-btn dc-btn-primary" href="/contact">
            <span className="dc-mk" aria-hidden="true" />
            Contact Us
          </Link>
          <button
            ref={menuBtn}
            type="button"
            className="dc-menu-btn"
            aria-expanded={menuOpen}
            aria-controls="dc-mnav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="dc-bars" aria-hidden="true" />
            <span className="dc-lbl">{menuOpen ? 'Close menu' : 'Menu'}</span>
          </button>
        </div>
      </div>

      {/* in normal flow; CTAs first; a chosen link closes the menu */}
      <nav
        className="dc-mnav dc-wrap"
        id="dc-mnav"
        aria-label="Mobile"
        hidden={!menuOpen}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('a')) setMenuOpen(false);
        }}
      >
        <div className="dc-actions">
          <Link className="dc-btn dc-btn-primary" href="/contact">
            <span className="dc-mk" aria-hidden="true" />
            Contact Us
          </Link>
          <Link className="dc-btn dc-btn-secondary" href="/schedule-call">
            <span className="dc-mk" aria-hidden="true" />
            Book a call
          </Link>
        </div>
        <div className="dc-m-svc">
          <Link className="dc-m-all" href="/services" aria-current={current('/services')}>
            Services <span aria-hidden="true">&rarr;</span>
          </Link>
          {SERVICE_GROUPS.map((group) => (
            <div className="dc-m-grp" key={group.stage}>
              <p className="dc-label">
                <span className={cn('dc-mk', group.mark)} aria-hidden="true" />
                {group.stage}
              </p>
              <ul>
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} aria-current={current(l.href)}>
                      {l.short ?? l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="dc-label dc-m-co" id="dc-m-co">
          Company
        </p>
        <ul className="dc-m-main" aria-labelledby="dc-m-co">
          {PRIMARY_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={current(l.href)}>
                {l.label} <span aria-hidden="true">&rarr;</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
