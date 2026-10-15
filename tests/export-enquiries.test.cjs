const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {
  COLUMNS, SELECT_SQL, UsageError, parseArgs, dateRange, cellValue, toCsv, resolveOutputPath, writeExport, connectionConfig,
} = require('../scripts/export-enquiries.cjs');

const tmpDir = () => fs.mkdtempSync(path.join(os.tmpdir(), 'export-enquiries-'));

test('selects only the approved columns, never delivery metadata', () => {
  const cols = COLUMNS.map(([, c]) => c);
  for (const forbidden of ['crm_payload', 'crm_delivered_at', 'crm_attempts', 'crm_last_attempt_at',
    'idempotency_key', 'notification_status', 'updated_at']) {
    assert.ok(!cols.includes(forbidden), forbidden);
    assert.ok(!SELECT_SQL.includes(forbidden), forbidden);
  }
  assert.ok(!/\*/.test(SELECT_SQL));
  assert.match(SELECT_SQL, /^SELECT /);
  for (const required of ['name', 'email', 'phone', 'company', 'message', 'created_at', 'source_page',
    'marketing_consent', 'marketing_consent_text', 'marketing_consent_at', 'first_source', 'latest_source', 'attribution_status']) {
    assert.ok(cols.includes(required), required);
  }
});

test('requires both dates and an output file', () => {
  assert.throws(() => parseArgs(['--to', '2026-10-01', '--out', 'x.csv']), UsageError);
  assert.throws(() => parseArgs(['--from', '2026-10-01', '--out', 'x.csv']), UsageError);
  assert.throws(() => parseArgs(['--from', '2026-10-01', '--to', '2026-10-02']), UsageError);
  assert.throws(() => parseArgs(['--from', '2026-10-01', '--to', '2026-10-02', '--out', 'x.csv', '--bogus']), UsageError);
  const o = parseArgs(['--from=2026-10-01', '--to', '2026-10-02', '--out', 'x.csv', '--no-bom']);
  assert.deepEqual([o.from, o.to, o.out, o.bom, o.maxRows], ['2026-10-01', '2026-10-02', 'x.csv', false, 5000]);
});

test('bounds the row limit', () => {
  const base = ['--from', '2026-10-01', '--to', '2026-10-02', '--out', 'x.csv'];
  for (const bad of ['0', '-1', '1.5', 'abc', '50001']) assert.throws(() => parseArgs([...base, '--max-rows', bad]), UsageError, bad);
  assert.equal(parseArgs([...base, '--max-rows', '50000']).maxRows, 50000);
});

test('validates dates strictly and prevents unbounded ranges', () => {
  for (const bad of ['2026-1-01', '2026-02-30', '2026-13-01', '20261001', '2026-10-01T00:00', '1999-12-31', "2026-10-01' OR 1=1"]) {
    assert.throws(() => dateRange(bad, '2026-10-31'), UsageError, bad);
  }
  assert.throws(() => dateRange('2026-10-02', '2026-10-01'), UsageError);
  assert.throws(() => dateRange('2025-01-01', '2026-01-02'), /367 days/);
  assert.deepEqual(dateRange('2025-01-01', '2026-01-01'),
    { lower: '2025-01-01 00:00:00.000', upper: '2026-01-02 00:00:00.000', days: 366 });
  assert.deepEqual(dateRange('2026-10-31', '2026-10-31'),
    { lower: '2026-10-31 00:00:00.000', upper: '2026-11-01 00:00:00.000', days: 1 });
  assert.equal(dateRange('2028-02-28', '2028-02-29').upper, '2028-03-01 00:00:00.000');
});

test('neutralises spreadsheet formulas in text fields', () => {
  for (const evil of ['=HYPERLINK("http://x","y")', '+1+1', '-2+3', '@SUM(A1)', '\tcmd', '\r=1', '\n=1',
    '  =1+1', '＝1+1', '＋1', '－1', '＠A1']) {
    assert.ok(cellValue(evil, 'text').startsWith("'"), JSON.stringify(evil));
  }
  for (const safe of ['Hello', 'a=b', 'café ₹', '', '1-2']) assert.equal(cellValue(safe, 'text'), safe);
  assert.equal(cellValue('+44 20 7946 0000', 'text'), "'+44 20 7946 0000");
  assert.equal(cellValue('2026-10-01 10:00:00.000', 'raw'), '2026-10-01 10:00:00.000');
  assert.equal(cellValue(null, 'text'), '');
  assert.equal(cellValue(1, 'yesno'), 'yes');
  assert.equal(cellValue(0, 'yesno'), 'no');
  assert.equal(cellValue(null, 'yesno'), '');
  assert.equal(cellValue('a\u0000b', 'text'), 'ab');
});

test('writes RFC 4180 CSV with every field quoted', () => {
  const row = Object.fromEntries(COLUMNS.map(([, c]) => [c, null]));
  Object.assign(row, { id: '7', name: 'Ann "Q" Lee', message: 'line 1\nline 2, comma', marketing_consent: 1 });
  const csv = toCsv([row]);
  assert.ok(csv.startsWith('﻿"enquiry_id","submitted_at"'));
  assert.ok(csv.endsWith('\r\n'));
  assert.ok(csv.includes('"Ann ""Q"" Lee"'));
  assert.ok(csv.includes('"line 1\nline 2, comma"'));
  assert.ok(!toCsv([], { bom: false }).startsWith('﻿'));
  assert.equal(toCsv([], { bom: false }).split('\r\n')[0].split(',').length, COLUMNS.length);
});

test('refuses unsafe output locations', () => {
  const root = tmpDir();
  const app = path.join(root, 'mappedskills.com');
  for (const d of [app, `${app}.new`, path.join(app, 'public'), path.join(root, 'public_html'), path.join(root, 'exports')]) {
    fs.mkdirSync(d, { recursive: true });
  }
  const opts = { appRoot: app };
  assert.throws(() => resolveOutputPath(path.join(app, 'leads.csv'), opts), /outside the application/);
  assert.throws(() => resolveOutputPath(path.join(app, 'public', 'leads.csv'), opts), /outside the application/);
  assert.throws(() => resolveOutputPath(path.join(`${app}.new`, 'leads.csv'), opts), /outside the application/);
  assert.throws(() => resolveOutputPath(path.join(root, 'public_html', 'leads.csv'), opts), /outside the application/);
  assert.throws(() => resolveOutputPath(path.join(root, 'exports', 'leads.txt'), opts), /\.csv/);
  assert.throws(() => resolveOutputPath(path.join(root, 'missing', 'leads.csv'), opts), /does not exist/);
  const ok = resolveOutputPath(path.join(root, 'exports', 'leads.csv'), opts);
  assert.equal(path.basename(ok), 'leads.csv');
  fs.symlinkSync(app, path.join(root, 'exports', 'link'));
  assert.throws(() => resolveOutputPath(path.join(root, 'exports', 'link', 'leads.csv'), opts), /outside the application/);
  fs.rmSync(root, { recursive: true, force: true });
});

test('writes 0600, never overwrites without --force and leaves no temp file', () => {
  const dir = tmpDir();
  const file = path.join(dir, 'leads.csv');
  writeExport(resolveOutputPath(file, { appRoot: '/nonexistent-app' }), 'a\r\n');
  assert.equal(fs.statSync(file).mode & 0o777, 0o600);
  assert.throws(() => resolveOutputPath(file, { appRoot: '/nonexistent-app' }), /already exists/);
  writeExport(resolveOutputPath(file, { force: true, appRoot: '/nonexistent-app' }), 'b\r\n');
  assert.equal(fs.readFileSync(file, 'utf8'), 'b\r\n');
  assert.deepEqual(fs.readdirSync(dir), ['leads.csv']);
  fs.rmSync(dir, { recursive: true, force: true });
});

test('prefers a dedicated read-only account and names only missing variables', () => {
  const base = { DB_HOST: 'h', DB_NAME: 'n', DB_USER: 'app', DB_PASSWORD: 'p' };
  assert.equal(connectionConfig(base).options.user, 'app');
  assert.equal(connectionConfig(base).readOnlyAccount, false);
  const ro = connectionConfig({ ...base, EXPORT_DB_USER: 'ro', EXPORT_DB_PASSWORD: 'q' });
  assert.deepEqual([ro.options.user, ro.options.password, ro.readOnlyAccount], ['ro', 'q', true]);
  assert.equal(ro.options.multipleStatements, false);
  assert.throws(() => connectionConfig({ DB_HOST: 'h', DB_PASSWORD: 'secret-value' }), (e) =>
    e instanceof UsageError && /DB_USER, DB_NAME/.test(e.message) && !e.message.includes('secret-value'));
});
