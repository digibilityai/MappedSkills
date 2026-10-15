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
 * NO PERSONAL INFORMATION: the stored value is a timestamp and nothing else.
 *
 * NEITHER FUNCTION CAN THROW. Storage can be unavailable (private modes, blocked site data, quota); a failure to set
 * the marker must never break a submission that has already succeeded, and a failure to read it means neutral content.
 */

const STORAGE_KEY = 'ms.enquiry.confirmed.v1';
const MAX_AGE_MS = 10 * 60 * 1000;

/** Called after a genuine 2xx from `/api/enquiry`, and from nowhere else. */
export function markEnquiryConfirmed(): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    /* Storage unavailable: the visitor sees the neutral page, the enquiry itself is unaffected. */
  }
}

/** True once for a marker younger than ten minutes. The marker is removed whether or not it was still valid. */
export function consumeEnquiryConfirmation(): boolean {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw === null) return false;
    window.sessionStorage.removeItem(STORAGE_KEY);
    const setAt = Number(raw);
    const age = Date.now() - setAt;
    // A future timestamp (clock change, hand-edited value) is treated as invalid rather than as fresh.
    return Number.isFinite(setAt) && age >= 0 && age <= MAX_AGE_MS;
  } catch {
    return false;
  }
}
