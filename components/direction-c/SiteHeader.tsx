'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';
import {
  CALL_LINK,
  CONTACT_LINK,
  PRIMARY_LINKS,
  PROBLEM_LINK,
  SERVICE_GROUPS,
  SERVICES_HUB,
  SERVICE_ROUTES,
} from '@/components/direction-c/nav';
import { siteMetadata } from '@/lib/metadata';

/** Desktop navigation from 64em (1024px at the default text size). In em so that
    enlarged browser text moves to the menu before the bar crowds. Mirrors the CSS. */
const DESKTOP_QUERY = '(min-width: 64em)';

/**
 * DIRECTION C — header and navigation (navigation redesign, R2 prototype:
 * docs/nav-redesign/prototype/index.html).
 *
 * - NOT STICKY. `position: relative`, in normal flow (DEC-018 §4.5; DEC-030).
 * - Desktop (≥64em): Services is ONE disclosure button. Its compact panel lists
 *   the services by stage, then "All services" (/services) and the contextual
 *   problem link. A disclosure of links, not `role="menu"`: closed links are
 *   `inert`, Tab keeps its normal order, ArrowDown on the button opens the
 *   panel, Up/Down/Home/End move through its links, Escape closes and returns
 *   focus, and an outside click or focus closes it. Without JavaScript the
 *   button is replaced by a plain link to /services.
 * - Below 64em: "Contact us" and a Menu button. The menu is in page flow; its
 *   Services section starts closed. While the menu is open the bar's "Contact
 *   us" steps aside, so the menu carries the one visible primary CTA, with
 *   "Request a call" and the email as secondary actions.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [mSvcOpen, setMSvcOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const svcBtn = useRef<HTMLButtonElement>(null);
  const svcItem = useRef<HTMLLIElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const focusFirstOnOpen = useRef(false);

  /* A route change closes every surface. Adjusted during render (React's
     "storing information from previous renders" pattern), not in an effect. */
  const [shownFor, setShownFor] = useState(pathname);
  if (shownFor !== pathname) {
    setShownFor(pathname);
    setMenuOpen(false);
    setMSvcOpen(false);
    setSvcOpen(false);
  }

  const closeMenu = () => {
    setMenuOpen(false);
    setMSvcOpen(false);
  };

  useEffect(() => {
    if (!menuOpen && !svcOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (svcOpen) {
        setSvcOpen(false);
        svcBtn.current?.focus();
        return;
      }
      if (menuOpen) {
        setMenuOpen(false);
        setMSvcOpen(false);
        menuBtn.current?.focus();
      }
    };
    const outside = (e: Event) => {
      if (svcOpen && svcItem.current && !svcItem.current.contains(e.target as Node)) setSvcOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', outside);
    document.addEventListener('focusin', outside);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', outside);
      document.removeEventListener('focusin', outside);
    };
  }, [menuOpen, svcOpen]);

  /* Crossing the desktop breakpoint closes whichever pattern no longer applies. */
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = (m: MediaQueryListEvent) => {
      if (m.matches) {
        setMenuOpen(false);
        setMSvcOpen(false);
      } else setSvcOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  /* Keep the panel inside the right-hand page gutter. It is anchored to the
     Services button and is normally well clear of the edge; this only moves it
     when it would not fit (for example with enlarged text). Laid out while
     closed too, so the hidden panel can never widen the page. */
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const place = () => {
      el.style.removeProperty('left');
      const box = el.getBoundingClientRect();
      if (!box.width) return;
      const gutter = parseFloat(getComputedStyle(el.closest('.dc-bar') ?? el).paddingRight) || 0;
      const over = box.right - (document.documentElement.clientWidth - gutter);
      if (over > 0) el.style.left = `${parseFloat(getComputedStyle(el).left) - over}px`;
    };
    place();
    /* the panel's size follows the text size; the window's follows the viewport */
    const ro = new ResizeObserver(place);
    ro.observe(el);
    window.addEventListener('resize', place);
    document.fonts?.ready.then(place);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', place);
    };
  }, [svcOpen]);

  const panelLinks = () => Array.from(panel.current?.querySelectorAll<HTMLAnchorElement>('a') ?? []);

  /* ArrowDown on the button opens the panel and moves to its first link, once
     the panel is no longer `inert` (after the commit). */
  useEffect(() => {
    if (svcOpen && focusFirstOnOpen.current) panel.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    focusFirstOnOpen.current = false;
  }, [svcOpen]);

  const onSvcBtnKey = (e: ReactKeyboardEvent) => {
    if (e.key !== 'ArrowDown') return;
    e.preventDefault();
    if (svcOpen) {
      panelLinks()[0]?.focus();
      return;
    }
    focusFirstOnOpen.current = true;
    setSvcOpen(true);
  };

  const onPanelKey = (e: ReactKeyboardEvent) => {
    const links = panelLinks();
    const i = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (i < 0) return;
    let next: HTMLElement | null | undefined;
    if (e.key === 'ArrowDown') next = links[(i + 1) % links.length];
    else if (e.key === 'ArrowUp') next = i === 0 ? svcBtn.current : links[i - 1];
    else if (e.key === 'Home') next = links[0];
    else if (e.key === 'End') next = links[links.length - 1];
    else return;
    e.preventDefault();
    next?.focus();
  };

  const current = (href: string) => (pathname === href ? 'page' : undefined);
  const inServices = pathname ? SERVICE_ROUTES.has(pathname) : false;

  return (
    <header className={cn('dc dc-hdr', menuOpen && 'dc-menu-open')}>
      <div className="dc-wrap dc-bar">
        <span className="dc-logo">
          <Logo priority />
        </span>

        <nav className="dc-nav" aria-label="Primary">
          <ul className="dc-nav-list">
            <li className="dc-nav-svc" ref={svcItem}>
              <button
                ref={svcBtn}
                type="button"
                className="dc-svc-btn"
                aria-expanded={svcOpen}
                aria-controls="dc-svc-panel"
                data-current={inServices ? '' : undefined}
                onClick={() => setSvcOpen((v) => !v)}
                onKeyDown={onSvcBtnKey}
              >
                Services
                <span className="dc-chev" aria-hidden="true" />
              </button>
              <div
                ref={panel}
                className="dc-panel"
                id="dc-svc-panel"
                data-open={svcOpen}
                inert={!svcOpen}
                onKeyDown={onPanelKey}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('a')) setSvcOpen(false);
                }}
              >
                <div className="dc-sp-rows">
                  {SERVICE_GROUPS.map((group, gi) => (
                    <section className="dc-sp-row" key={group.stage} aria-labelledby={`dc-st-${group.mark}`}>
                      <div className="dc-sp-hd">
                        <h2 className="dc-label" id={`dc-st-${group.mark}`}>
                          <span className={cn('dc-mk', group.mark)} aria-hidden="true" />
                          {group.stage}
                          <span className="dc-sp-num" aria-hidden="true">
                            {String(gi + 1).padStart(2, '0')}
                          </span>
                        </h2>
                        <p className="dc-sp-line">{group.line}</p>
                      </div>
                      <ul className="dc-sp-links">
                        {group.links.map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} aria-current={current(l.href)}>
                              <span className="t">{l.label}</span>
                              <span className="d">{l.desc}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
                <div className="dc-panel-ft">
                  <Link className="dc-all" href={SERVICES_HUB.href} aria-current={current(SERVICES_HUB.href)}>
                    {SERVICES_HUB.label} <span className="s">{SERVICES_HUB.desc}</span>{' '}
                    <span className="dc-arr" aria-hidden="true">
                      &rarr;
                    </span>
                  </Link>
                  <Link className="dc-ctx" href={PROBLEM_LINK.href} aria-current={current(PROBLEM_LINK.href)}>
                    {PROBLEM_LINK.label}
                  </Link>
                </div>
              </div>
              {/* without JavaScript the disclosure cannot open: hide the dead
                  button and offer the hub as a plain link */}
              <noscript>
                <style>{'.dc-svc-btn{display:none!important}'}</style>
                <a className="dc-svc-nojs" href={SERVICES_HUB.href}>
                  Services
                </a>
              </noscript>
            </li>
            {PRIMARY_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={current(l.href)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="dc-right">
          <Link className="dc-btn dc-btn-primary" href={CONTACT_LINK.href}>
            <span className="dc-mk" aria-hidden="true" />
            {CONTACT_LINK.label}
          </Link>
          <button
            ref={menuBtn}
            type="button"
            className="dc-menu-btn"
            aria-expanded={menuOpen}
            aria-controls="dc-mnav"
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
          >
            <span className="dc-bars" aria-hidden="true" />
            <span className="dc-lbl">{menuOpen ? 'Close menu' : 'Menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile and tablet menu: in page flow, main links first, the one CTA at the end.
          A chosen link closes the menu. */}
      <nav
        className="dc-mnav"
        id="dc-mnav"
        aria-label="Mobile"
        hidden={!menuOpen}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('a')) closeMenu();
        }}
      >
        <div className="dc-wrap dc-m-inner">
          <ul className="dc-m-list">
            <li>
              <button
                type="button"
                className="dc-m-svc-btn"
                aria-expanded={mSvcOpen}
                aria-controls="dc-m-svc"
                data-current={inServices ? '' : undefined}
                onClick={() => setMSvcOpen((v) => !v)}
              >
                <span className="dc-m-svc-lbl">Services</span>
                <span className="dc-pm" aria-hidden="true" />
              </button>
              <div className="dc-m-svc" id="dc-m-svc" hidden={!mSvcOpen}>
                <Link className="dc-m-all" href={SERVICES_HUB.href} aria-current={current(SERVICES_HUB.href)}>
                  {SERVICES_HUB.label}{' '}
                  <span className="dc-arr" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
                <div className="dc-m-stages">
                  {SERVICE_GROUPS.map((group) => (
                    <div className="dc-m-stage" key={group.stage}>
                      <h2 className="dc-label" id={`dc-m-${group.mark}`}>
                        <span className={cn('dc-mk', group.mark)} aria-hidden="true" />
                        {group.stage} <span className="s">{group.line.replace(/\.$/, '')}</span>
                      </h2>
                      <ul aria-labelledby={`dc-m-${group.mark}`}>
                        {group.links.map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} aria-current={current(l.href)}>
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <Link className="dc-m-ctx" href={PROBLEM_LINK.href} aria-current={current(PROBLEM_LINK.href)}>
                  {PROBLEM_LINK.label}
                </Link>
              </div>
            </li>
            {PRIMARY_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={current(l.href)}>
                  {l.label}{' '}
                  <span className="dc-arr" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="dc-m-act">
            <Link className="dc-btn dc-btn-primary" href={CONTACT_LINK.href}>
              <span className="dc-mk" aria-hidden="true" />
              {CONTACT_LINK.label}
            </Link>
            <div className="dc-m-sub">
              <Link className="call" href={CALL_LINK.href}>
                {CALL_LINK.label}
              </Link>
              <a className="mail" href={`mailto:${siteMetadata.email}`}>
                {siteMetadata.email}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
