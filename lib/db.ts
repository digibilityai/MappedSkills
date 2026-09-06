/**
 * SESSION 31 — PHASE H1 — durable enquiry persistence: connection layer.
 *
 * MariaDB / MySQL-compatible, reached over `localhost` on the production host.
 * The four connection values are supplied to the Node process as environment
 * variables and are NEVER read into, logged from, or defaulted by this file:
 *
 *   DB_HOST · DB_USER · DB_PASSWORD · DB_NAME
 *
 * Names only appear here. No value, no fragment of a value, and no assembled
 * connection string is ever written to a log, an error message, a response
 * body or a build artefact. `logSafeConfig()` exists so operational logging has
 * something safe to print and never reaches for the pool options object.
 *
 * WHY A LAZY SINGLETON POOL. The deployment target is cPanel / CloudLinux under
 * Passenger with a 512 MB ceiling (`CURRENT_INTEGRATIONS.md` §1), so:
 *   - the pool is created on FIRST USE, never at module load, so `next build`
 *     — which imports every route module to collect its exports — never opens a
 *     socket and never needs credentials to be present;
 *   - it is cached on `globalThis` so dev HMR and repeated route invocations
 *     reuse one pool instead of leaking a new one per compile;
 *   - `connectionLimit` is deliberately small. This is one low-traffic enquiry
 *     form on a shared host, not an application server.
 */
import mysql from 'mysql2/promise';

if (typeof window !== 'undefined') {
  // A hard stop rather than a silent no-op: if this module is ever pulled into
  // a client bundle, the four variable NAMES would ship to the browser and the
  // import graph would be wrong in a way that is easy to miss in review.
  throw new Error('lib/db is server-only and must never be imported by a client component.');
}

/** The four required variable names, in one place, so nothing else hardcodes them. */
export const DB_ENV_VARS = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'] as const;

/** Thrown when configuration is absent. Carries no value, only missing NAMES. */
export class DbConfigError extends Error {
  readonly missing: string[];
  constructor(missing: string[]) {
    super(`Database configuration incomplete. Missing: ${missing.join(', ')}`);
    this.name = 'DbConfigError';
    this.missing = missing;
  }
}

function readConfig() {
  const missing = DB_ENV_VARS.filter((name) => {
    const value = process.env[name];
    return typeof value !== 'string' || value.trim() === '';
  });
  if (missing.length > 0) throw new DbConfigError(missing);

  return {
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    // Not one of the four owner-supplied values. Optional, and 3306 is the
    // MariaDB default, so the documented four remain sufficient on their own.
    port: Number.parseInt(process.env.DB_PORT ?? '3306', 10) || 3306,
  };
}

/**
 * Non-secret description of the active configuration, for logs and for the
 * verification script. Deliberately reports only the DATABASE NAME and PORT —
 * host is reported as configured/absent rather than echoed, and user and
 * password are never represented here in any form.
 */
export function logSafeConfig(): Record<string, string | number | boolean> {
  return {
    driver: 'mysql2',
    database: process.env.DB_NAME ?? '(unset)',
    port: Number.parseInt(process.env.DB_PORT ?? '3306', 10) || 3306,
    hostConfigured: typeof process.env.DB_HOST === 'string' && process.env.DB_HOST.trim() !== '',
    userConfigured: typeof process.env.DB_USER === 'string' && process.env.DB_USER.trim() !== '',
    passwordConfigured:
      typeof process.env.DB_PASSWORD === 'string' && process.env.DB_PASSWORD.trim() !== '',
  };
}

type PoolCache = { pool: mysql.Pool | null };
const globalCache = globalThis as unknown as { __mappedskillsDbPool?: PoolCache };
const cache: PoolCache = (globalCache.__mappedskillsDbPool ??= { pool: null });

export function getPool(): mysql.Pool {
  if (cache.pool) return cache.pool;
  const config = readConfig();

  cache.pool = mysql.createPool({
    ...config,
    waitForConnections: true,
    // Small on purpose — see the header note on the 512 MB ceiling.
    connectionLimit: 4,
    // Bounded rather than 0 (unlimited): under a burst, failing fast is safer
    // than queueing requests until the process runs out of memory.
    queueLimit: 20,
    connectTimeout: 10_000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10_000,
    // The driver's own escaping is used for every value (see `lib/enquiries.ts`),
    // so multi-statement support is off: it is the feature that turns an
    // escaping mistake into a second executable statement.
    multipleStatements: false,
    charset: 'utf8mb4_unicode_ci',
    timezone: 'Z',
    dateStrings: false,
  });

  return cache.pool;
}

/**
 * Connectivity check. Establishes exactly the three things §4 of the session
 * brief asks for — a connection opens, the selected database is reachable, and
 * a trivial query succeeds — and returns a PASS/FAIL shape carrying no secret.
 */
export async function checkConnection(): Promise<
  { ok: true; database: string | null } | { ok: false; reason: string; code?: string }
> {
  let connection: mysql.PoolConnection | undefined;
  try {
    connection = await getPool().getConnection();
    const [rows] = await connection.query('SELECT DATABASE() AS db, 1 AS ping');
    const row = (rows as Array<{ db: string | null; ping: number }>)[0];
    if (!row || row.ping !== 1) return { ok: false, reason: 'unexpected_query_result' };
    return { ok: true, database: row.db };
  } catch (error) {
    // Only the driver's error CODE is surfaced. Driver messages can contain the
    // user and host, so `error.message` is deliberately not propagated.
    const code = (error as { code?: string })?.code;
    if (error instanceof DbConfigError) {
      return { ok: false, reason: 'configuration_incomplete', code: error.missing.join(',') };
    }
    return { ok: false, reason: 'connection_failed', code };
  } finally {
    connection?.release();
  }
}
