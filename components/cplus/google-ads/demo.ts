'use client';

/**
 * Guided-demonstration coordinator for the Google Ads page (G1.3c, Commit 1: infrastructure only).
 *
 * Nothing in this commit registers a demonstration, so no observer, timer or listener is ever created. The rules it
 * implements are the approved ones: a demonstration plays once, one at a time, in page order; it starts when its region
 * has been in view for DWELL_MS; any manual interaction, Escape, Pause or reduced motion stops it for good; it never
 * loops and never replays. A demonstration that is scrolled past before it runs is marked done without playing.
 */

export type DemoState = 'idle' | 'queued' | 'running' | 'done';

export type DemoStep = {
  /** Milliseconds this step stays active before the next one (or the end). */
  hold: number;
};

export type DemoSpec = {
  id: string;
  /** Page order; lower plays first. */
  order: number;
  el: HTMLElement;
  steps: DemoStep[];
  /** Called when step `i` becomes active (the first call is immediate on start). */
  onStep: (i: number) => void;
  /** Called when the demonstration ends on its own, or is cut short because it left the screen or the tab hid. */
  onRest: () => void;
  /** Called on every state change, so a Pause control can be shown only while `running`. */
  onState?: (s: DemoState) => void;
};

/** The region must stay in view this long before it starts (filters out fast scrolling). */
export const DWELL_MS = 400;
/** Fonts may delay the start by at most this long. */
export const FONT_WAIT_MS = 1000;
/** Share of the region, or of the viewport height for tall regions, that counts as "in view". */
export const ENTER_RATIO = 0.4;
export const ENTER_VIEWPORT = 0.45;
/** A running demonstration is cut short when less than this share of its region is visible. */
export const LEAVE_RATIO = 0.2;

type Entry = {
  spec: DemoSpec;
  state: DemoState;
  io: IntersectionObserver | null;
  inView: boolean;
  dwell: ReturnType<typeof setTimeout> | null;
  step: ReturnType<typeof setTimeout> | null;
  detach: () => void;
};

const entries = new Map<string, Entry>();
let active: Entry | null = null;
let fontsReady = false;
let fontsWait: Promise<void> | null = null;
let docDetach: (() => void) | null = null;
let mql: MediaQueryList | null = null;
let pumpTimer: ReturnType<typeof setTimeout> | null = null;
/** Demonstrations whose dwell ends within this window of each other are ordered by page position, not arrival. */
const COALESCE_MS = 100;

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function setState(e: Entry, s: DemoState) {
  if (e.state === s) return;
  e.state = s;
  e.spec.onState?.(s);
}

/** Removes the region listeners exactly once. */
function detach(e: Entry) {
  const d = e.detach;
  e.detach = () => {};
  d();
}

function clearTimers(e: Entry) {
  if (e.dwell) clearTimeout(e.dwell);
  if (e.step) clearTimeout(e.step);
  e.dwell = null;
  e.step = null;
}

/** Ends a demonstration for good: timers, observer and listeners are all released here. */
function finish(e: Entry, rest: boolean) {
  const wasRunning = e.state === 'running';
  clearTimers(e);
  e.io?.disconnect();
  e.io = null;
  detach(e);
  if (rest && wasRunning) e.spec.onRest();
  setState(e, 'done');
  if (active === e) {
    active = null;
    syncDocument();
  }
  pump();
  syncGlobal();
}

function syncDocument() {
  // The Escape listener exists only while a demonstration runs.
  if (active && !docDetach) {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape' && active) finish(active, false);
    };
    document.addEventListener('keydown', onKey);
    docDetach = () => document.removeEventListener('keydown', onKey);
  } else if (!active && docDetach) {
    docDetach();
    docDetach = null;
  }
}

function run(e: Entry, i: number) {
  if (e.state !== 'running') return;
  e.spec.onStep(i);
  e.step = setTimeout(() => {
    e.step = null;
    if (i + 1 < e.spec.steps.length) run(e, i + 1);
    else finish(e, true);
  }, e.spec.steps[i].hold);
}

function start(e: Entry) {
  active = e;
  setState(e, 'running');
  syncDocument();
  run(e, 0);
}

/** Starts the lowest-ordered queued demonstration that is still in view, if nothing is running. */
function pump() {
  if (active || !fontsReady) return;
  const next = [...entries.values()].filter((x) => x.state === 'queued').sort((a, b) => a.spec.order - b.spec.order)[0];
  if (!next) return;
  if (next.inView) start(next);
  else finish(next, false);
}

function whenFontsReady(): Promise<void> {
  if (!fontsWait) {
    const ready: Promise<unknown> = document.fonts?.ready ?? Promise.resolve();
    let ceiling: ReturnType<typeof setTimeout> | undefined;
    const cap = new Promise((r) => {
      ceiling = setTimeout(r, FONT_WAIT_MS);
    });
    fontsWait = Promise.race([ready, cap]).then(() => {
      clearTimeout(ceiling);
      fontsReady = true;
    });
  }
  return fontsWait;
}

function eligible(r: IntersectionObserverEntry): boolean {
  const vh = r.rootBounds?.height ?? window.innerHeight;
  return r.intersectionRatio >= ENTER_RATIO || r.intersectionRect.height >= vh * ENTER_VIEWPORT;
}

function onIntersect(e: Entry, r: IntersectionObserverEntry) {
  const was = e.inView;
  e.inView = eligible(r);
  if (e.state === 'idle') {
    if (e.inView && !was) {
      if (e.dwell) clearTimeout(e.dwell);
      e.dwell = setTimeout(() => {
        e.dwell = null;
        if (!e.inView || e.state !== 'idle') return;
        setState(e, 'queued');
        whenFontsReady().then(() => {
          if (pumpTimer) return;
          pumpTimer = setTimeout(() => {
            pumpTimer = null;
            pump();
          }, COALESCE_MS);
        });
      }, DWELL_MS);
    } else if (!e.inView) {
      if (e.dwell) {
        clearTimeout(e.dwell);
        e.dwell = null;
      }
      // Scrolled past before it ever ran: done, no replay later.
      if (r.boundingClientRect.bottom < 0) finish(e, false);
    }
  } else if (e.state === 'queued') {
    if (!e.inView && r.boundingClientRect.bottom < 0) finish(e, false);
  } else if (e.state === 'running' && r.intersectionRatio < LEAVE_RATIO && !e.inView) {
    finish(e, true);
  }
}

function onHidden() {
  if (document.visibilityState === 'hidden' && active) finish(active, true);
}

function onMotionChange() {
  if (mql?.matches) for (const e of [...entries.values()]) if (e.state !== 'done') finish(e, false);
}

/** The page-wide listeners (tab visibility, reduced-motion change) exist only while a demonstration can still play. */
function syncGlobal() {
  const needed = [...entries.values()].some((x) => x.state !== 'done');
  if (needed && !mql) {
    document.addEventListener('visibilitychange', onHidden);
    mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    mql.addEventListener('change', onMotionChange);
  } else if (!needed && mql) {
    document.removeEventListener('visibilitychange', onHidden);
    mql.removeEventListener('change', onMotionChange);
    mql = null;
    if (pumpTimer) clearTimeout(pumpTimer);
    pumpTimer = null;
  }
}

/**
 * Registers a demonstration. Returns a cleanup that releases everything. Under reduced motion, or without
 * IntersectionObserver, nothing is observed and nothing ever plays.
 */
export function registerDemo(spec: DemoSpec): () => void {
  if (entries.has(spec.id) || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return () => {};
  const e: Entry = { spec, state: 'idle', io: null, inView: false, dwell: null, step: null, detach: () => {} };
  entries.set(spec.id, e);
  syncGlobal();

  // Manual interaction anywhere in the region cancels the demonstration, before or during playback.
  // A tap is a click; touchstart is deliberately not used, so scrolling over the region does not cancel it.
  // The Pause control sits inside the region: reaching or pressing it must not count as "manual interaction".
  const stop = (ev: Event) => {
    if ((ev.target as Element | null)?.closest?.('[data-demo-pause]')) return;
    finish(e, false);
  };
  const el = spec.el;
  el.addEventListener('click', stop);
  el.addEventListener('keydown', stop);
  el.addEventListener('focusin', stop);
  e.detach = () => {
    el.removeEventListener('click', stop);
    el.removeEventListener('keydown', stop);
    el.removeEventListener('focusin', stop);
  };

  e.io = new IntersectionObserver((list) => list.forEach((r) => onIntersect(e, r)), { threshold: [0, 0.2, 0.4, 0.45, 0.5, 0.75, 1] });
  e.io.observe(el);

  return () => {
    clearTimers(e);
    e.io?.disconnect();
    e.io = null;
    detach(e);
    if (active === e) {
      active = null;
      syncDocument();
    }
    entries.delete(spec.id);
    pump();
    syncGlobal();
  };
}

/** Stops one demonstration for good (the Pause control). */
export function stopDemo(id: string) {
  const e = entries.get(id);
  if (e && e.state !== 'done') finish(e, false);
}

/**
 * Puts focus somewhere sensible when the Pause control, which had focus, disappears (the demonstration ended or was
 * paused): the selected tab or the checked radio of the region, else the region itself.
 */
export function restoreFocus(root: HTMLElement) {
  const a = document.activeElement;
  if (!a || !(a as HTMLElement).hasAttribute?.('data-demo-pause')) return;
  const target = root.querySelector<HTMLElement>('[role="tab"][aria-selected="true"], input[type="radio"]:checked');
  if (target) target.focus();
  else {
    if (!root.hasAttribute('tabindex')) root.setAttribute('tabindex', '-1');
    root.focus();
  }
}
