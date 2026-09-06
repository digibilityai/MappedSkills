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
 */
export function pushConsentUpdate(choice: ConsentChoice): void {
  if (typeof window === 'undefined') return;
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
