/**
 * The one-time `/thank-you` confirmation signal.
 *
 * `ContactForm` sets it ONLY inside its `response.ok` branch, i.e. after `POST /api/enquiry` returned 2xx, and
 * `/thank-you` consumes it once on arrival. Without a fresh marker the page shows neutral content, so a direct visit,
 * a reload, a bookmark or a shared link never claims that an enquiry arrived.
 *
 * THIS IS A UI SIGNAL, NOT AUTHENTICATION. Anyone can write to their own `sessionStorage`; doing so only changes what
 * their own browser displays. It authorises nothing, fires nothing and is never sent anywhere.
 *
 * NO PERSONAL INFORMATION: the stored value is a timestamp, prefixed `call:` for a `/schedule-call` request (DEC-062)
 * so `/thank-you` can show the call-request confirmation. A bare timestamp (the original format) means an enquiry.
 *
 * NEITHER FUNCTION CAN THROW. Storage can be unavailable (private modes, blocked site data, quota); a failure to set
 * the marker must never break a submission that has already succeeded, and a failure to read it means neutral content.
 */

const STORAGE_KEY = 'ms.enquiry.confirmed.v1';
const MAX_AGE_MS = 10 * 60 * 1000;

export type ConfirmationKind = 'enquiry' | 'call';

/** Called after a genuine 2xx from `/api/enquiry`, and from nowhere else. */
export function markEnquiryConfirmed(kind: ConfirmationKind = 'enquiry'): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, (kind === 'call' ? 'call:' : '') + String(Date.now()));
  } catch {
    /* Storage unavailable: the visitor sees the neutral page, the enquiry itself is unaffected. */
  }
}

/**
 * The kind of a marker younger than ten minutes, once; otherwise null. The marker is removed whether or not it was
 * still valid.
 */
export function consumeEnquiryConfirmation(): ConfirmationKind | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;
    window.sessionStorage.removeItem(STORAGE_KEY);
    const kind: ConfirmationKind = raw.startsWith('call:') ? 'call' : 'enquiry';
    const setAt = Number(kind === 'call' ? raw.slice(5) : raw);
    const age = Date.now() - setAt;
    // A future timestamp (clock change, hand-edited value) is treated as invalid rather than as fresh.
    return Number.isFinite(setAt) && raw !== '' && age >= 0 && age <= MAX_AGE_MS ? kind : null;
  } catch {
    return null;
  }
}
