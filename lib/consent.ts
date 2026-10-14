/**
 * SESSION 33 — PHASE H2 — Google Consent Mode v2, and the one place its
 * vocabulary is written down.
 *
 * WHAT THIS MODULE IS. The consent STATE layer: the storage key, the two
 * choices, the reads and writes, the `consent` commands, and the inline
 * bootstrap that establishes the denied default before anything else in the
 * document runs. It renders nothing. `components/analytics/ConsentProvider.tsx`
 * holds the React state, `ConsentBanner.tsx` is the interface, and
 * `lib/gtm.tsx` is the only consumer that loads a third-party script.
 *
 * THE BINDING OWNER DECISION THIS IMPLEMENTS, unchanged and not extended:
 *
 *   Default, before any decision — analytics_storage DENIED, ad_storage DENIED,
 *   ad_user_data DENIED, ad_personalization DENIED.
 *   On explicit acceptance — analytics_storage GRANTED. THE THREE ADVERTISING
 *   SIGNALS STAY DENIED, in this phase, unconditionally.
 *   On rejection — all four stay denied.
 *
 * There is no code path in this repository that can grant `ad_storage`,
 * `ad_user_data` or `ad_personalization`. They are written as the literal
 * string `'denied'` at every site below, never derived from a variable, so
 * enabling advertising consent requires an edit and a review rather than a
 * configuration change.
 *
 * WHY A RAW `arguments` OBJECT AND NOT AN ARRAY OR A PLAIN OBJECT. A consent
 * command is not a dataLayer event. Google's tag reads consent commands by
 * recognising an `arguments` object pushed onto `dataLayer` — the shape
 * produced by `function gtag(){dataLayer.push(arguments)}`. Pushing
 * `['consent','update',{...}]` or `{event:'consent_update'}` instead produces
 * something the tag never interprets as a consent signal, which fails SILENTLY:
 * the site would look consent-aware and the tag would keep its previous state.
 * The session brief names this specifically — "do not fake consent with
 * ordinary dataLayer events" — so the real command shape is used at both call
 * sites, here and in the bootstrap string.
 *
 * `window.gtag` IS DELIBERATELY NOT DEFINED. Three components in this
 * repository still contain `typeof window.gtag === 'function'` guards left over
 * from a pre-H2 implementation — `components/blog/SocialShare.tsx`,
 * `components/filters/CategoryFilter.tsx`, `components/forms/CalendlyButton.tsx`
 * — and they emit event names that are not in the approved H2 taxonomy.
 * Publishing a shim under that global would activate all three at once. The
 * shim below is a local function inside a closure and escapes nowhere.
 *
 * NOTHING HERE CAN THROW INTO THE APPLICATION. Every storage access and every
 * push is wrapped, and every failure resolves to DENIED — the safe direction.
 * A visitor whose browser refuses storage is treated as undecided, is asked,
 * and is measured only if they say yes in that session.
 */

/**
 * THE CONSENT STORAGE KEY. `localStorage`, first-party, this origin only.
 *
 * WHY `localStorage` AND NOT A COOKIE. A cookie would be sent on every request
 * and would tempt a server-side read; reading it in the root layout would call
 * `cookies()`, and that opts EVERY route in this application out of static
 * rendering. `AnalyticsRouteListener` already refuses `useSearchParams()` for
 * exactly that reason. The consent decision is a client concern, it is read by
 * a client script, and it stays on the client.
 *
 * WHY A BARE STRING VALUE AND NOT JSON. This key is read by the inline
 * bootstrap in the document head, which is the most ordering-sensitive script
 * on the page. A bare `'granted'` / `'denied'` has no parse step and therefore
 * no parse-failure branch. Nothing else is stored: no timestamp, no visitor id,
 * no fingerprint, no PII. The value cannot identify anybody.
 *
 * VERSIONED IN THE KEY ITSELF. If the set of consent signals this site asks
 * about ever changes, the new question ships under `ms.consent.v2` and every
 * visitor is asked again, rather than a stale answer being reinterpreted as an
 * answer to a question that was never put to them.
 */
export const CONSENT_STORAGE_KEY = 'ms.consent.v1';

/** The two decisions a visitor can record, and their exact stored values. */
export type ConsentChoice = 'granted' | 'denied';

/**
 * `unset` is a real, distinct state and is never collapsed into `denied`.
 * Both are treated identically for DELIVERY — no container loads in either —
 * but only `unset` shows the banner. Storing a refusal has to silence the
 * question; failing to read storage must not.
 */
export type ConsentState = ConsentChoice | 'unset';

/** The advertising signals. Denied in this phase, at every call site. */
const ADVERTISING_DENIED = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
} as const;

/**
 * Reads the stored decision. FAILS CLOSED — any error, any unrecognised value,
 * and any environment without storage returns `unset`, which grants nothing and
 * loads nothing.
 */
export function readStoredConsent(): ConsentState {
  if (typeof window === 'undefined') return 'unset';
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored === 'granted') return 'granted';
    if (stored === 'denied') return 'denied';
    return 'unset';
  } catch {
    /* Private window, disabled site data, sandboxed frame. Treated as undecided. */
    return 'unset';
  }
}

/**
 * Records the decision. A write failure is swallowed: the choice still applies
 * to THIS page load, because the caller updates React state and pushes the
 * consent command regardless. The visitor is simply asked again next time,
 * which is the honest outcome when their browser will not remember.
 */
export function writeStoredConsent(choice: ConsentChoice): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    /* Storage unavailable — the decision is honoured for this page load only. */
  }
}

/** The `gtag()` shim shape: variadic, returns nothing, escapes nowhere. */
type ConsentCommand = (...args: unknown[]) => void;

/**
 * Pushes a Consent Mode v2 `update` command onto `dataLayer`.
 *
 * ADVERTISING IS RESTATED AS DENIED ON EVERY UPDATE. A `consent update` changes
 * only the keys it names, so naming just `analytics_storage` would have been
 * enough — but restating the three advertising signals means that no ordering
 * of commands, and no future edit that adds another update site, can leave an
 * advertising signal granted by omission.
 *
 * THE DENIED DEFAULT IS GUARANTEED FIRST (E6-A1 R1, DEC-038). On a page whose
 * bootstrap never executed — see `CONSENT_GUARD_SCRIPT` — a banner decision
 * would otherwise be the first consent command in `dataLayer`.
 */
export function pushConsentUpdate(choice: ConsentChoice): void {
  if (typeof window === 'undefined') return;
  ensureConsentDefault();
  try {
    const target = window as unknown as { dataLayer?: unknown[] };
    if (!Array.isArray(target.dataLayer)) target.dataLayer = [];
    const layer = target.dataLayer;
    // A function expression with no declared parameters, so `arguments` is the
    // real arguments object at runtime. A rest parameter would compile to a
    // plain array under this project's ES6 target and would never be read as a
    // consent command.
    const gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      layer.push(arguments);
    } as ConsentCommand;
    gtag('consent', 'update', {
      analytics_storage: choice === 'granted' ? 'granted' : 'denied',
      ...ADVERTISING_DENIED,
    });
  } catch {
    /* Measurement never breaks the page. */
  }
}

/**
 * THE BOOTSTRAP. Rendered as a plain inline `<script>` in the document `<head>`
 * by `app/layout.tsx`, above everything else in that head.
 *
 * WHY A RAW `<script>` AND NOT `next/script`. Ordering here is the whole point,
 * and it must be a property of the document rather than of a framework
 * strategy. A raw inline script in `<head>` executes synchronously, in source
 * order, before the body parses, before React hydrates and before any
 * `afterInteractive` script is inserted. That is the only arrangement in which
 * it is STRUCTURALLY impossible for a Google tag to observe a granted state
 * that the visitor never chose: the denied default is already the first entry
 * in `dataLayer` before any other code in this application has run.
 *
 * WHAT IT DOES, IN ORDER — and the order is the contract:
 *   1. Creates `dataLayer` if absent. `lib/analytics.ts` does the same, so
 *      whichever runs first, neither clobbers the other's queue.
 *   2. Pushes `consent default` with ALL FOUR SIGNALS DENIED. Unconditional.
 *      There is no branch, no region list and no exception.
 *   3. Reads the stored decision, inside try/catch, and pushes
 *      `consent update` with `analytics_storage: 'granted'` ONLY for a stored
 *      `'granted'`. Advertising is restated as denied even on that path.
 *
 * `wait_for_update` IS DELIBERATELY ABSENT. It exists for implementations that
 * resolve consent asynchronously, and it makes tags hold their fire for a
 * timeout. Step 3 is synchronous and in the same script as step 2, so the final
 * state for a returning visitor is settled before the script ends. Adding a
 * timeout would introduce a window this design does not have.
 *
 * IT SETS NO COOKIE, SENDS NO REQUEST AND LOADS NOTHING. It writes two entries
 * into a first-party array in the visitor's own tab and reads one key they
 * previously agreed to store.
 *
 * SAFE TO INLINE. Every value in the emitted string is a literal written here.
 * Nothing is interpolated from user input, from a route, from a query string or
 * from an environment variable, so there is no injection surface.
 */
export const CONSENT_BOOTSTRAP_SCRIPT = `(function(w){
w.dataLayer=w.dataLayer||[];
function gtag(){w.dataLayer.push(arguments);}
gtag('consent','default',{'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','analytics_storage':'denied'});
var c=null;try{c=w.localStorage.getItem('${CONSENT_STORAGE_KEY}');}catch(e){}
if(c==='granted'){gtag('consent','update',{'analytics_storage':'granted','ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied'});}
})(window);`;

/** A `consent default` command as the bootstrap pushes it: an `arguments` object. */
function isConsentCommand(entry: unknown, kind: 'default' | 'update'): boolean {
  if (typeof entry !== 'object' || entry === null) return false;
  const command = entry as { 0?: unknown; 1?: unknown };
  return command[0] === 'consent' && command[1] === kind;
}

/**
 * E6-A1 R1 (DEC-038) — the denied default, guaranteed where the bootstrap did
 * not run.
 *
 * WHY THIS EXISTS. A `notFound()` thrown inside a route segment (an unknown
 * `/blog`, `/portfolio`, `/research` or `/press` slug; `/launch-checklist`) is
 * served as Next's client-rendered error shell, `<html id="__next_error__">`.
 * That document has no layout `<head>`. React inserts the bootstrap `<script>`
 * on the client, and a script inserted that way is never executed. Without
 * this guard, a returning visitor who had accepted reached the container with
 * no consent command at all (`GATE_4_E6_GTM_CONSENT_AUDIT.md` §4).
 *
 * THE GUARD IS PART OF THE CONTAINER LOADER. `lib/gtm.tsx` runs it at the top
 * of the one inline script that injects `gtm.js`, so the container cannot be
 * requested before it has run. It does exactly what the bootstrap would have
 * done, with the same literals, and nothing else:
 *   - a `consent default` already in `dataLayer` (every page that served the
 *     layout) — it returns at once. No duplicate command is ever written;
 *   - otherwise it PREPENDS `consent default` (all four denied) and, ONLY for a
 *     stored `'granted'` with no `consent update` already queued, the
 *     `consent update` the bootstrap would have replayed. Prepending puts them
 *     where the bootstrap puts them: ahead of any `page_view` already queued,
 *     which no container has read yet, because no container exists yet.
 * If a container were somehow already running it appends instead, because a
 * running container no longer reads index 0. That branch is unreachable while
 * this loader is the only one.
 *
 * It grants nothing the visitor did not choose: the three advertising signals
 * are literal `'denied'`. It cannot throw. It sets no cookie and sends nothing.
 * Nothing is interpolated except the storage key constant above.
 */
export const CONSENT_GUARD_SCRIPT = `(function(w){try{
var l=w.dataLayer;if(!Array.isArray(l)){l=w.dataLayer=[];}
var u=false;for(var i=0;i<l.length;i++){var x=l[i];if(x&&typeof x==='object'&&x[0]==='consent'){if(x[1]==='default')return;if(x[1]==='update')u=true;}}
function a(){return arguments;}
var q=[a('consent','default',{'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','analytics_storage':'denied'})];
var c=null;try{c=w.localStorage.getItem('${CONSENT_STORAGE_KEY}');}catch(e){}
if(c==='granted'&&!u){q.push(a('consent','update',{'analytics_storage':'granted','ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied'}));}
if(w.__msGtmLoaded){for(var j=0;j<q.length;j++){l.push(q[j]);}}else{l.unshift.apply(l,q);}
}catch(e){}})(window);`;

/**
 * The same guarantee for a banner decision, without the replay: the decision
 * being pushed IS the visitor's choice. If no `consent default` is in
 * `dataLayer`, the denied default is prepended, so the update that follows can
 * never be the first consent command. A no-op on every page that served the
 * layout. Same literals as the bootstrap; cannot throw.
 */
export function ensureConsentDefault(): void {
  if (typeof window === 'undefined') return;
  try {
    const target = window as unknown as { dataLayer?: unknown[]; __msGtmLoaded?: boolean };
    if (!Array.isArray(target.dataLayer)) target.dataLayer = [];
    const layer = target.dataLayer;
    if (layer.some((entry) => isConsentCommand(entry, 'default'))) return;
    // As in `pushConsentUpdate`: no declared parameters, so `arguments` is the
    // real arguments object, the shape Google's tag reads as a command.
    const command = function () {
      // eslint-disable-next-line prefer-rest-params
      return arguments;
    } as (...args: unknown[]) => IArguments;
    const denied = command('consent', 'default', {
      ...ADVERTISING_DENIED,
      analytics_storage: 'denied',
    });
    if (target.__msGtmLoaded) layer.push(denied);
    else layer.unshift(denied);
  } catch {
    /* Measurement never breaks the page. */
  }
}
