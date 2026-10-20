/**
 * End-to-end test of scripts/export-enquiries.cjs against a DISPOSABLE MariaDB.
 * Skipped unless EXPORT_TEST_DB_ADMIN_USER / _PASSWORD are set, and refuses any
 * host that is not loopback. Creates its own database and users, applies the
 * real migrations with scripts/db-migrate.cjs, seeds synthetic leads, and drops
 * everything afterwards.
 *
 *   EXPORT_TEST_DB_HOST=127.0.0.1 EXPORT_TEST_DB_PORT=33071 \
 *   EXPORT_TEST_DB_ADMIN_USER=root EXPORT_TEST_DB_ADMIN_PASSWORD=… \
 *   node --test tests/export-enquiries.db.test.cjs
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const SCRIPT = path.join(ROOT, 'scripts', 'export-enquiries.cjs');
const HOST = process.env.EXPORT_TEST_DB_HOST || '127.0.0.1';
const PORT = process.env.EXPORT_TEST_DB_PORT || '3306';
const ADMIN_USER = process.env.EXPORT_TEST_DB_ADMIN_USER;
const ADMIN_PASSWORD = process.env.EXPORT_TEST_DB_ADMIN_PASSWORD;
const enabled = Boolean(ADMIN_USER && ADMIN_PASSWORD);
if (enabled && !['127.0.0.1', 'localhost', '::1'].includes(HOST)) {
  throw new Error('export-enquiries.db.test refuses a non-loopback database host');
}

const suffix = crypto.randomBytes(4).toString('hex');
const DB = `export_test_${suffix}`;
const APP = { user: `exp_app_${suffix}`, password: crypto.randomBytes(12).toString('hex') };
const RO = { user: `exp_ro_${suffix}`, password: crypto.randomBytes(12).toString('hex') };
const SECRET_MARKER = 'WEBHOOK-SECRET-MARKER-9f3a';

/** Synthetic leads. `in` says whether 2026-10-01..2026-10-31 should export it. */
const LEADS = [
  { at: '2026-09-30 23:59:59.999', in: false, name: 'Before Range', email: 'before@example.test' },
  { at: '2026-10-01 00:00:00.000', in: true, name: 'First Moment', email: 'first@example.test',
    phone: '+44 20 7946 0000', source_page: '/contact', marketing_consent: 1,
    marketing_consent_text: 'I agree to occasional emails', marketing_consent_at: '2026-10-01 00:00:00.000',
    first_source: 'google', first_medium: 'organic', first_landing_page: '/seo', first_referrer_host: 'google.com',
    first_term: 'seo agency', first_touch_at: '2026-09-28 08:00:00.000', first_source_derived: 1,
    latest_source: 'newsletter', latest_medium: 'email', latest_campaign: 'oct', attribution_status: 'complete' },
  { at: '2026-10-15 12:30:00.250', in: true, name: '=HYPERLINK("http://evil.test","click")', email: 'formula@example.test',
    company: '@SUM(1+1)', message: '-2+3\nsecond line, with comma and "quotes"', website: '+cmd|calc',
    first_campaign: '=1+1', source_page: '/pricing', attribution_status: 'partial' },
  { at: '2026-10-20 09:00:00.000', in: true, name: 'Ünïcödé Ñame ₹ 日本', email: 'unicode@example.test',
    message: 'Café — naïve 😀', screening: 'suspect' },
  { at: '2026-10-31 23:59:59.999', in: true, name: 'Last Moment', email: 'last@example.test' },
  { at: '2026-11-01 00:00:00.000', in: false, name: 'After Range', email: 'after@example.test' },
];

let mysql;
let admin;
let outDir;

function run(args, env) {
  const r = spawnSync(process.execPath, [SCRIPT, ...args], {
    cwd: ROOT, encoding: 'utf8',
    env: { PATH: process.env.PATH, HOME: os.homedir(), DB_HOST: HOST, DB_PORT: PORT, DB_NAME: DB, ...env },
  });
  return { code: r.status, out: r.stdout + r.stderr };
}
const asApp = { DB_USER: APP.user, DB_PASSWORD: APP.password };
const asRo = { ...asApp, EXPORT_DB_USER: RO.user, EXPORT_DB_PASSWORD: RO.password };

/** Minimal RFC 4180 parser, enough to read the export back. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let i = 0;
  while (i < text.length) {
    assert.equal(text[i], '"', `field at ${i} is not quoted`);
    let field = '';
    i++;
    for (;;) {
      if (text[i] === '"' && text[i + 1] === '"') { field += '"'; i += 2; }
      else if (text[i] === '"') { i++; break; }
      else field += text[i++];
    }
    row.push(field);
    if (text[i] === ',') i++;
    else { assert.equal(text.slice(i, i + 2), '\r\n'); i += 2; rows.push(row); row = []; }
  }
  return rows;
}

async function tableFingerprint() {
  const [[c]] = await admin.query(`CHECKSUM TABLE \`${DB}\`.\`enquiries\` EXTENDED`);
  const [[n]] = await admin.query(`SELECT COUNT(*) AS n, MAX(updated_at) AS u FROM \`${DB}\`.\`enquiries\``);
  return `${c.Checksum}/${n.n}/${n.u}`;
}

test('export against a disposable MariaDB', { skip: !enabled && 'EXPORT_TEST_DB_ADMIN_* not set' }, async (t) => {
  mysql = require('mysql2/promise');
  admin = await mysql.createConnection({ host: HOST, port: Number(PORT), user: ADMIN_USER, password: ADMIN_PASSWORD, dateStrings: true });
  outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'export-db-test-'));
  t.after(async () => {
    await admin.query(`DROP DATABASE IF EXISTS \`${DB}\``);
    await admin.query(`DROP USER IF EXISTS '${APP.user}'@'%', '${RO.user}'@'%'`);
    await admin.end();
    fs.rmSync(outDir, { recursive: true, force: true });
  });

  await admin.query(`CREATE DATABASE \`${DB}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await admin.query(`CREATE USER '${APP.user}'@'%' IDENTIFIED BY '${APP.password}'`);
  await admin.query(`GRANT ALL PRIVILEGES ON \`${DB}\`.* TO '${APP.user}'@'%'`);
  const migrate = spawnSync(process.execPath, [path.join(ROOT, 'scripts', 'db-migrate.cjs')], {
    cwd: ROOT, encoding: 'utf8',
    env: { PATH: process.env.PATH, HOME: os.homedir(), DB_HOST: HOST, DB_PORT: PORT, DB_NAME: DB, ...asApp },
  });
  assert.equal(migrate.status, 0, migrate.stdout + migrate.stderr);
  await admin.query(`CREATE USER '${RO.user}'@'%' IDENTIFIED BY '${RO.password}'`);
  await admin.query(`GRANT SELECT ON \`${DB}\`.\`enquiries\` TO '${RO.user}'@'%'`);

  for (const [n, lead] of LEADS.entries()) {
    await admin.query(
      `INSERT INTO \`${DB}\`.\`enquiries\` SET ?`,
      [{
        idempotency_key: crypto.randomUUID(), created_at: lead.at, company: 'Synthetic Co', message: 'Synthetic enquiry',
        crm_payload: JSON.stringify({ secret: SECRET_MARKER, n }), crm_attempts: 3, crm_delivered_at: lead.at,
        notification_status: 'failed',
        ...Object.fromEntries(Object.entries(lead).filter(([k]) => !['at', 'in'].includes(k))),
      }],
    );
  }
  const before = await tableFingerprint();
  const expected = LEADS.filter((l) => l.in);
  const range = ['--from', '2026-10-01', '--to', '2026-10-31'];
  const pii = LEADS.flatMap((l) => [l.name, l.email]).concat(['Synthetic enquiry', 'Café']);

  await t.test('exports the inclusive day range with the dedicated read-only account', () => {
    const out = path.join(outDir, 'october.csv');
    const r = run([...range, '--out', out], asRo);
    assert.equal(r.code, 0, r.out);
    assert.match(r.out, /4 enquiries, 2026-10-01\.\.2026-10-31 .*account EXPORT_DB_USER in a read-only transaction/);
    for (const p of pii) assert.ok(!r.out.includes(p), `log leaked ${p}`);
    assert.equal(fs.statSync(out).mode & 0o777, 0o600);

    const text = fs.readFileSync(out, 'utf8');
    assert.ok(text.startsWith('﻿'));
    assert.ok(!text.includes(SECRET_MARKER) && !text.includes('crm_') && !text.includes('failed'));
    const [header, ...rows] = parseCsv(text.slice(1));
    assert.equal(header.length, 30);
    assert.ok(!header.includes('idempotency_key') && !header.includes('notification_status'));
    assert.deepEqual(rows.map((r) => r[header.indexOf('email')]), expected.map((l) => l.email));
    assert.deepEqual(rows.map((r) => r[header.indexOf('submitted_at')]), expected.map((l) => l.at));
    const col = (r, name) => r[header.indexOf(name)];
    const [first, formula, unicode] = rows;
    assert.equal(col(first, 'phone'), "'+44 20 7946 0000");
    assert.equal(col(first, 'marketing_consent'), 'yes');
    assert.equal(col(first, 'marketing_consent_text'), 'I agree to occasional emails');
    assert.equal(col(first, 'first_source'), 'google');
    assert.equal(col(first, 'first_source_derived'), 'yes');
    assert.equal(col(first, 'latest_campaign'), 'oct');
    assert.equal(col(formula, 'name'), `'${LEADS[2].name}`);
    assert.equal(col(formula, 'company'), "'@SUM(1+1)");
    assert.equal(col(formula, 'website'), "'+cmd|calc");
    assert.equal(col(formula, 'first_campaign'), "'=1+1");
    assert.equal(col(formula, 'message'), `'${LEADS[2].message}`);
    assert.equal(col(formula, 'marketing_consent'), 'no');
    assert.equal(col(unicode, 'name'), LEADS[3].name);
    assert.equal(col(unicode, 'message'), LEADS[3].message);
    assert.equal(col(unicode, 'screening'), 'suspect');
    assert.equal(col(unicode, 'attribution_status'), 'unavailable');
  });

  await t.test('works with the app account inside a read-only transaction', () => {
    const r = run([...range, '--out', path.join(outDir, 'app.csv'), '--no-bom'], asApp);
    assert.equal(r.code, 0, r.out);
    assert.match(r.out, /account DB_USER in a read-only transaction/);
    assert.ok(!fs.readFileSync(path.join(outDir, 'app.csv'), 'utf8').startsWith('﻿'));
  });

  await t.test('the read-only mechanisms really refuse writes', async () => {
    const app = await mysql.createConnection({ host: HOST, port: Number(PORT), database: DB, user: APP.user, password: APP.password });
    await app.query('SET SESSION TRANSACTION READ ONLY');
    await app.query('START TRANSACTION READ ONLY');
    await assert.rejects(app.query("UPDATE enquiries SET name = 'x'"), { code: 'ER_CANT_EXECUTE_IN_READ_ONLY_TRANSACTION' });
    await app.end();
    const ro = await mysql.createConnection({ host: HOST, port: Number(PORT), database: DB, user: RO.user, password: RO.password });
    await assert.rejects(ro.query("UPDATE enquiries SET name = 'x'"), { code: 'ER_TABLEACCESS_DENIED_ERROR' });
    await assert.rejects(ro.query('SELECT 1 FROM schema_migrations'), { code: 'ER_TABLEACCESS_DENIED_ERROR' });
    await ro.end();
  });

  await t.test('aborts above --max-rows and writes nothing', () => {
    const out = path.join(outDir, 'capped.csv');
    const r = run([...range, '--out', out, '--max-rows', '3'], asRo);
    assert.equal(r.code, 3, r.out);
    assert.match(r.out, /more than 3 enquiries/);
    assert.ok(!fs.existsSync(out));
    assert.equal(run([...range, '--out', out, '--max-rows', '4'], asRo).code, 0);
  });

  await t.test('refuses bad input before touching the database', () => {
    const out = path.join(outDir, 'bad.csv');
    for (const args of [
      ['--from', '2026-10-01', '--out', out],
      ['--from', '2026-02-30', '--to', '2026-03-01', '--out', out],
      ['--from', '2024-01-01', '--to', '2026-01-01', '--out', out],
      ['--from', "2026-10-01' OR '1'='1", '--to', '2026-10-31', '--out', out],
      [...range, '--out', path.join(ROOT, 'leads.csv')],
      [...range, '--out', path.join(outDir, 'october.csv')],
    ]) {
      const r = run(args, { ...asRo, DB_HOST: '203.0.113.1' });
      assert.equal(r.code, 2, `${args.join(' ')}\n${r.out}`);
    }
    assert.ok(!fs.existsSync(out));
  });

  await t.test('a connection failure names only a code', () => {
    const r = run([...range, '--out', path.join(outDir, 'denied.csv')], { ...asApp, DB_PASSWORD: 'wrong-password-value' });
    assert.equal(r.code, 1);
    assert.match(r.out, /failed \(ER_ACCESS_DENIED_ERROR\); nothing written/);
    for (const s of ['wrong-password-value', APP.user, HOST]) assert.ok(!r.out.includes(s), s);
    assert.ok(!fs.existsSync(path.join(outDir, 'denied.csv')));
  });

  await t.test('never modifies the table', async () => {
    assert.equal(await tableFingerprint(), before);
  });
});
