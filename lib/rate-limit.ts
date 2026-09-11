/**
 * SESSION 31 — PHASE H1 — abuse layer 4: rate limiting.
 *
 * `FORM_AND_BOOKING_SPEC.md` §8 layer 4 asks for rate limiting "by IP and by
 * email address, with sane windows". This is the smallest thing that does that
 * and does not require infrastructure nobody has chosen.
 *
 * WHAT THIS IS, STATED HONESTLY. An in-process fixed-window counter. It is
 * therefore:
 *   - RESET BY EVERY RESTART. Under Passenger a process is recycled on idle and
 *     on deploy, so a determined attacker can clear the counter by waiting.
 *   - NOT SHARED between processes if the host ever runs more than one.
 *   - DEPENDENT ON A PROXY HEADER for the address, which a direct client can
 *     forge.
 * It is a speed bump against casual abuse, not a security control, and the
 * durable protection against the thing that actually matters — duplicate rows —
 * is the database's unique index, not this.
 *
 * NO IP ADDRESS IS EVER STORED. Session brief §24 forbids durably storing an
 * address, and this module never writes one anywhere: the key is a SHA-256 of
 * the address salted with a value generated fresh at process start, so the map
 * cannot be reversed into addresses even by something reading process memory,
 * and nothing survives the process. The same treatment is applied to the email
 * key, so the limiter never holds a readable address of either kind.
 */
import { createHash, randomBytes } from 'node:crypto';

/** Regenerated per process. Nothing depends on it being stable across restarts. */
const SALT = randomBytes(32);

const WINDOW_MS = 10 * 60 * 1000;
/** Generous. A real person correcting a validation error must never hit this. */
const MAX_PER_IP = 8;
const MAX_PER_EMAIL = 5;

interface Bucket {
  count: number;
  resetAt: number;
}

type Store = Map<string, Bucket>;
const globalCache = globalThis as unknown as { __mappedskillsRateLimit?: Store };
const buckets: Store = (globalCache.__mappedskillsRateLimit ??= new Map());

function hash(scope: string, value: string): string {
  return createHash('sha256').update(SALT).update(scope).update(value).digest('base64url');
}

/**
 * Drops expired buckets. Called on each check, which is enough: the map only
 * grows while requests arrive, and every arrival cleans up after the last.
 */
function prune(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

function hit(key: string, limit: number, now: number): boolean {
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  bucket.count += 1;
  return bucket.count <= limit;
}

/**
 * Best-effort client address from the proxy chain. Returns `null` rather than a
 * placeholder when nothing usable is present — a shared fallback key would rate
 * limit every anonymous visitor against every other one.
 */
export function clientAddress(headers: Headers): string | null {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return headers.get('x-real-ip')?.trim() || null;
}

export interface RateLimitInput {
  address: string | null;
  email: string | null;
}

/** `true` when the request may proceed. */
export function allowSubmission({ address, email }: RateLimitInput): boolean {
  const now = Date.now();
  prune(now);

  // Both counters are incremented before the result is combined, so a request
  // that trips one limit still counts against the other. Short-circuiting here
  // would let an attacker rotate one key to keep the other's window empty.
  const addressOk = address === null ? true : hit(hash('ip', address), MAX_PER_IP, now);
  const emailOk = email === null ? true : hit(hash('email', email), MAX_PER_EMAIL, now);

  return addressOk && emailOk;
}

/** Test seam. Not called by the request path. */
export function __resetRateLimitForTests(): void {
  buckets.clear();
}
