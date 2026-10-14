#!/usr/bin/env node
/**
 * Host-only lead export: website enquiries for a date range, to a CSV file.
 *
 *   node scripts/export-enquiries.cjs --from 2026-10-01 --to 2026-10-31 --out ~/lead-exports/2026-10.csv
 *
 *   --from YYYY-MM-DD   first day, inclusive (required)
 *   --to   YYYY-MM-DD   last day, inclusive (required)
 *   --out  PATH         output file, must end in .csv (required)
 *   --max-rows N        refuse (and write nothing) above N rows; default 5000, ceiling 50000
 *   --force             replace an existing output file
 *   --no-bom            omit the UTF-8 byte-order mark (it is there so Excel reads UTF-8)
 *
 * Days are the DATABASE server's calendar days: `created_at` is filled by the
 * column default CURRENT_TIMESTAMP(3), i.e. the server's session time zone, and
 * is exported exactly as stored. The summary line names that time zone.
 *
 * SAFETY PROPERTIES:
 *   - READ ONLY. One SELECT, inside START TRANSACTION READ ONLY, then ROLLBACK.
 *     If EXPORT_DB_USER and EXPORT_DB_PASSWORD are set (a SELECT-only account),
 *     they are used instead of the app's DB_USER / DB_PASSWORD.
 *   - EXPLICIT COLUMNS. Contact details, message, submission time, source page,
 *     consent and attribution. Never the CRM payload, delivery state, idempotency
 *     key or notification status. No `SELECT *`.
 *   - BOUNDED. Both dates are required, the range is at most 366 days, and a
 *     result above --max-rows aborts rather than truncating silently.
 *   - FORMULA-SAFE CSV. Every field is quoted; a text field that a spreadsheet
 *     would evaluate (leading = + - @, tab, CR, LF, or their full-width forms)
 *     is prefixed with an apostrophe. A phone number such as +44… therefore
 *     appears as '+44… — that is intended.
 *   - NO PERSONAL DATA IN LOGS. Prints counts, the range, the output path and the
 *     database time zone only; errors print a driver code, never a message.
 *   - NOT WEB-REACHABLE. Refuses to write inside the application directory or
 *     any `public_html` / `www` directory. The file is created with mode 0600.
 */
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const APP_ROOT = path.resolve(__dirname, '..');
const MAX_RANGE_DAYS = 366;
const DEFAULT_MAX_ROWS = 5000;
const MAX_ROWS_CEILING = 50000;

/** [CSV header, column, kind]. The only columns that can ever leave the database. */
const COLUMNS = [
  ['enquiry_id', 'id', 'raw'],
  ['submitted_at', 'created_at', 'datetime'],
  ['name', 'name', 'text'],
  ['email', 'email', 'text'],
  ['phone', 'phone', 'text'],
  ['company', 'company', 'text'],
  ['website', 'website', 'text'],
  ['message', 'message', 'text'],
  ['source_page', 'source_page', 'text'],
  ['marketing_consent', 'marketing_consent', 'yesno'],
  ['marketing_consent_text', 'marketing_consent_text', 'text'],
  ['marketing_consent_at', 'marketing_consent_at', 'datetime'],
  ['screening', 'screening', 'text'],
  ['first_landing_page', 'first_landing_page', 'text'],
  ['first_referrer_host', 'first_referrer_host', 'text'],
  ['first_source', 'first_source', 'text'],
  ['first_medium', 'first_medium', 'text'],
  ['first_campaign', 'first_campaign', 'text'],
  ['first_content', 'first_content', 'text'],
  ['first_term', 'first_term', 'text'],
  ['first_touch_at', 'first_touch_at', 'datetime'],
  ['first_source_derived', 'first_source_derived', 'yesno'],
  ['latest_source', 'latest_source', 'text'],
  ['latest_medium', 'latest_medium', 'text'],
  ['latest_campaign', 'latest_campaign', 'text'],
  ['latest_referrer_host', 'latest_referrer_host', 'text'],
  ['attribution_status', 'attribution_status', 'text'],
];

// Datetimes are formatted by the server to a fixed millisecond precision; the
// driver's own conversion drops a zero fraction, so 10:00:00.000 would print as
// 10:00:00 next to 10:00:00.250.
const selectExpr = ([, c, kind]) =>
  kind === 'datetime' ? `LEFT(DATE_FORMAT(\`${c}\`, '%Y-%m-%d %H:%i:%s.%f'), 23) AS \`${c}\`` : `\`${c}\``;

const SELECT_SQL = `SELECT ${COLUMNS.map(selectExpr).join(', ')}
  FROM \`enquiries\`
 WHERE \`enquiries\`.\`created_at\` >= ? AND \`enquiries\`.\`created_at\` < ?
 ORDER BY \`enquiries\`.\`created_at\`, \`enquiries\`.\`id\`
 LIMIT ?`;

class UsageError extends Error {}

function parseArgs(argv) {
  const opts = { maxRows: DEFAULT_MAX_ROWS, force: false, bom: true };
  const takes = { '--from': 'from', '--to': 'to', '--out': 'out', '--max-rows': 'maxRows' };
  for (let i = 0; i < argv.length; i++) {
    let arg = argv[i];
    let value;
    const eq = arg.indexOf('=');
    if (arg.startsWith('--') && eq > 0) [arg, value] = [arg.slice(0, eq), arg.slice(eq + 1)];
    if (arg === '--force') opts.force = true;
    else if (arg === '--no-bom') opts.bom = false;
    else if (arg === '--help' || arg === '-h') opts.help = true;
    else if (takes[arg]) {
      if (value === undefined) value = argv[++i];
      if (value === undefined || value === '') throw new UsageError(`${arg} needs a value`);
      opts[takes[arg]] = value;
    } else throw new UsageError(`unknown argument: ${arg}`);
  }
  if (opts.help) return opts;
  for (const name of ['from', 'to', 'out']) if (!opts[name]) throw new UsageError(`--${name} is required`);
  const n = Number(opts.maxRows);
  if (!Number.isInteger(n) || n < 1 || n > MAX_ROWS_CEILING) {
    throw new UsageError(`--max-rows must be a whole number from 1 to ${MAX_ROWS_CEILING}`);
  }
  opts.maxRows = n;
  return opts;
}

/** Strict YYYY-MM-DD that is a real calendar date. Returns epoch ms at UTC midnight. */
function parseDay(label, value) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) throw new UsageError(`--${label} must be YYYY-MM-DD`);
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const t = Date.UTC(y, mo - 1, d);
  const back = new Date(t);
  if (y < 2000 || back.getUTCFullYear() !== y || back.getUTCMonth() !== mo - 1 || back.getUTCDate() !== d) {
    throw new UsageError(`--${label} is not a valid date`);
  }
  return t;
}

const DAY_MS = 86_400_000;
const fmtDay = (t) => new Date(t).toISOString().slice(0, 10);

/** Inclusive day range -> half-open DATETIME bounds as stored by the database. */
function dateRange(from, to) {
  const start = parseDay('from', from);
  const end = parseDay('to', to);
  if (end < start) throw new UsageError('--to is before --from');
  const days = (end - start) / DAY_MS + 1;
  if (days > MAX_RANGE_DAYS) throw new UsageError(`range is ${days} days; the maximum is ${MAX_RANGE_DAYS}`);
  return { lower: `${fmtDay(start)} 00:00:00.000`, upper: `${fmtDay(end + DAY_MS)} 00:00:00.000`, days };
}

/** Leading characters that make Excel, LibreOffice or Sheets evaluate a cell. */
const FORMULA_START = /^[=+\-@\t\r\n＝＋－＠]/;

function neutraliseFormula(text) {
  return FORMULA_START.test(text) || FORMULA_START.test(text.trimStart()) ? `'${text}` : text;
}

function cellValue(value, kind) {
  if (value === null || value === undefined) return '';
  if (kind === 'yesno') return Number(value) === 1 ? 'yes' : 'no';
  let text = String(value).replace(/\u0000/g, '');
  if (kind === 'text') text = neutraliseFormula(text);
  return text;
}

const quote = (text) => `"${text.replace(/"/g, '""')}"`;

function toCsv(rows, { bom = true } = {}) {
  const lines = [COLUMNS.map(([header]) => quote(header)).join(',')];
  for (const row of rows) lines.push(COLUMNS.map(([, col, kind]) => quote(cellValue(row[col], kind))).join(','));
  return (bom ? '﻿' : '') + lines.join('\r\n') + '\r\n';
}

const isInside = (child, parent) => {
  const rel = path.relative(parent, child);
  return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel));
};

/** Resolves --out and refuses anywhere a web server or a release swap could reach. */
function resolveOutputPath(out, { force = false, appRoot = APP_ROOT } = {}) {
  const expanded = out.startsWith('~/') ? path.join(os.homedir(), out.slice(2)) : out;
  const file = path.resolve(expanded);
  if (path.extname(file).toLowerCase() !== '.csv') throw new UsageError('--out must end in .csv');
  const dir = path.dirname(file);
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) throw new UsageError('--out directory does not exist');
  const realDir = fs.realpathSync(dir);
  const realApp = fs.existsSync(appRoot) ? fs.realpathSync(appRoot) : appRoot;
  // Release directories sit beside the app as <app>.new / <app>.old-*; refuse those too.
  const appSiblings = new RegExp(`^${path.basename(realApp).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\..*)?$`);
  const segments = realDir.split(path.sep);
  if (
    isInside(realDir, realApp) ||
    segments.some((s) => s === 'public_html' || s === 'www') ||
    (path.dirname(realApp) !== realApp && isInside(realDir, path.dirname(realApp)) &&
      appSiblings.test(path.relative(path.dirname(realApp), realDir).split(path.sep)[0]))
  ) {
    throw new UsageError('--out must be outside the application and any web-served directory');
  }
  const target = path.join(realDir, path.basename(file));
  if (fs.existsSync(target) && !force) throw new UsageError('--out already exists (use --force to replace it)');
  return target;
}

/** Writes via an exclusive 0600 temp file and a rename, so a failure never leaves a partial export. */
function writeExport(target, content) {
  const tmp = path.join(path.dirname(target), `.${path.basename(target)}.${process.pid}.tmp`);
  const fd = fs.openSync(tmp, 'wx', 0o600);
  try {
    fs.writeSync(fd, content);
    fs.fsyncSync(fd);
  } finally {
    fs.closeSync(fd);
  }
  try {
    fs.renameSync(tmp, target);
    fs.chmodSync(target, 0o600);
  } catch (error) {
    fs.rmSync(tmp, { force: true });
    throw error;
  }
}

function connectionConfig(env = process.env) {
  const dedicated = (env.EXPORT_DB_USER || '').trim() && (env.EXPORT_DB_PASSWORD || '').trim();
  const required = dedicated ? ['DB_HOST', 'DB_NAME'] : ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
  const missing = required.filter((n) => !(env[n] || '').trim());
  if (missing.length) throw new UsageError(`missing environment: ${missing.join(', ')}`);
  return {
    readOnlyAccount: Boolean(dedicated),
    options: {
      host: env.DB_HOST,
      user: dedicated ? env.EXPORT_DB_USER : env.DB_USER,
      password: dedicated ? env.EXPORT_DB_PASSWORD : env.DB_PASSWORD,
      database: env.DB_NAME,
      port: Number.parseInt(env.DB_PORT || '3306', 10) || 3306,
      charset: 'utf8mb4_unicode_ci',
      dateStrings: true,
      supportBigNumbers: true,
      bigNumberStrings: true,
      multipleStatements: false,
      connectTimeout: 10_000,
    },
  };
}

async function fetchRows(options, { lower, upper, maxRows }) {
  const mysql = require('mysql2/promise');
  const conn = await mysql.createConnection(options);
  try {
    await conn.query('SET SESSION TRANSACTION READ ONLY');
    await conn.query('START TRANSACTION READ ONLY');
    const [[tz]] = await conn.query('SELECT @@session.time_zone AS session_tz, @@system_time_zone AS system_tz');
    const [rows] = await conn.execute(SELECT_SQL, [lower, upper, String(maxRows + 1)]);
    await conn.query('ROLLBACK');
    const timeZone = tz.session_tz === 'SYSTEM' ? `SYSTEM (${tz.system_tz})` : tz.session_tz;
    return { rows, timeZone };
  } finally {
    await conn.end();
  }
}

const USAGE = 'usage: node scripts/export-enquiries.cjs --from YYYY-MM-DD --to YYYY-MM-DD --out FILE.csv [--max-rows N] [--force] [--no-bom]';

async function main(argv = process.argv.slice(2)) {
  const opts = parseArgs(argv);
  if (opts.help) {
    console.log(USAGE);
    return 0;
  }
  const range = dateRange(opts.from, opts.to);
  const target = resolveOutputPath(opts.out, { force: opts.force });

  const envFile = path.join(APP_ROOT, '.env');
  if (fs.existsSync(envFile) && typeof process.loadEnvFile === 'function') process.loadEnvFile(envFile);
  require('./load-host-env.cjs').loadHostEnv();
  const { options, readOnlyAccount } = connectionConfig();

  const { rows, timeZone } = await fetchRows(options, { ...range, maxRows: opts.maxRows });
  if (rows.length > opts.maxRows) {
    console.error(
      `export-enquiries: more than ${opts.maxRows} enquiries in ${opts.from}..${opts.to}; nothing written. ` +
        'Narrow the range or raise --max-rows.',
    );
    return 3;
  }
  writeExport(target, toCsv(rows, { bom: opts.bom }));
  console.log(
    `export-enquiries: ${rows.length} enquiries, ${opts.from}..${opts.to} (database time zone ${timeZone}), ` +
      `account ${readOnlyAccount ? 'EXPORT_DB_USER' : 'DB_USER'} in a read-only transaction -> ${target}`,
  );
  return 0;
}

if (require.main === module) {
  main().then(
    (code) => process.exit(code),
    (error) => {
      if (error instanceof UsageError) {
        console.error(`export-enquiries: ${error.message}\n${USAGE}`);
        process.exit(2);
      }
      console.error(`export-enquiries: failed (${error?.code ?? error?.name ?? 'error'}); nothing written`);
      process.exit(1);
    },
  );
}

module.exports = {
  COLUMNS, SELECT_SQL, MAX_RANGE_DAYS, MAX_ROWS_CEILING, UsageError,
  parseArgs, dateRange, cellValue, toCsv, resolveOutputPath, writeExport, connectionConfig, main,
};
