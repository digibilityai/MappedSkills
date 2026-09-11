#!/usr/bin/env node
/**
 * SESSION 31 — PHASE H1 — schema migration and connectivity check.
 *
 *   node scripts/db-migrate.cjs            apply any unapplied migrations
 *   node scripts/db-migrate.cjs --verify   connectivity check only, no writes
 *   node scripts/db-migrate.cjs --status   list migrations and their state
 *
 * or, equivalently, `npm run db:migrate` / `npm run db:verify`.
 *
 * SAFETY PROPERTIES, which are the whole point of this file:
 *
 *   - IDEMPOTENT. A ledger table records which migration files have run, so a
 *     second invocation applies nothing. Safe to wire into every deploy.
 *   - NEVER DESTRUCTIVE. This script issues no DROP, no TRUNCATE and no DELETE,
 *     and it refuses to apply a migration file containing any of them. Schema
 *     removal is a decision that belongs to a human with a backup, not to an
 *     automated deploy step.
 *   - EXPLICIT AND REVIEWABLE. Every schema change is a new numbered .sql file
 *     that is read in review as SQL. Editing an already-applied file is
 *     detected and refused, because that is the change that silently applies to
 *     fresh installs only and lets environments drift apart.
 *   - NOT IN THE REQUEST PATH. No page render and no route handler runs DDL.
 *
 * NO CREDENTIAL IS PRINTED. Configuration is read from the environment by NAME
 * (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) and this script reports only which
 * names are present, the database name and the port. It never echoes a value, a
 * fragment of one, or an assembled connection string, and it never prints a
 * driver error message — driver messages routinely embed the user and host —
 * only the driver's error code.
 */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const mysql = require('mysql2/promise');

const MIGRATIONS_DIR = path.join(__dirname, '..', 'db', 'migrations');
const LEDGER_TABLE = 'schema_migrations';
const REQUIRED_ENV = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];

/** Refused inside a migration file. See "NEVER DESTRUCTIVE" above. */
const DESTRUCTIVE = /\b(DROP|TRUNCATE|DELETE)\s/i;

const LEDGER_DDL = `
CREATE TABLE IF NOT EXISTS \`${LEDGER_TABLE}\` (
  \`version\`    VARCHAR(191) NOT NULL,
  \`checksum\`   CHAR(64)     NOT NULL,
  \`applied_at\` DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (\`version\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
`;

function readConfig() {
  const missing = REQUIRED_ENV.filter((name) => {
    const value = process.env[name];
    return typeof value !== 'string' || value.trim() === '';
  });
  if (missing.length > 0) {
    console.error('FAIL — database configuration incomplete.');
    console.error(`Missing environment variable(s): ${missing.join(', ')}`);
    console.error('Set them on the Node process (cPanel > Setup Node.js App > Environment variables).');
    console.error('This script never prints or requests a value; only names are shown.');
    process.exit(2);
  }
  return {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number.parseInt(process.env.DB_PORT || '3306', 10) || 3306,
    multipleStatements: false,
    charset: 'utf8mb4_unicode_ci',
    connectTimeout: 10000,
  };
}

/** Non-secret summary, safe to print anywhere. */
function describe(config) {
  return {
    driver: `mysql2@${require('mysql2/package.json').version}`,
    database: config.database,
    port: config.port,
    hostConfigured: true,
    userConfigured: true,
    passwordConfigured: true,
  };
}

function loadMigrations() {
  if (!fs.existsSync(MIGRATIONS_DIR)) return [];
  return fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((file) => file.endsWith('.sql'))
    .sort()
    .map((file) => {
      const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8');
      return {
        version: file,
        sql,
        checksum: crypto.createHash('sha256').update(sql).digest('hex'),
      };
    });
}

/**
 * Splits a migration file into statements. The connection runs with
 * `multipleStatements: false` — the setting that stops an escaping mistake
 * anywhere in the codebase from becoming a second executable statement — so
 * each has to be sent on its own.
 *
 * The split is naive on purpose: a semicolon ends a statement. Migration files
 * are DDL written by hand and reviewed as SQL, so they must not contain a
 * semicolon inside a string literal. Nothing here interpolates user input;
 * these files are read from disk, never from a request.
 */
function statementsOf(sql) {
  return sql
    .split(/;\s*$/m)
    .map((part) =>
      part
        .split('\n')
        .filter((line) => !line.trim().startsWith('--'))
        .join('\n')
        .trim()
    )
    .filter((part) => part.length > 0);
}

async function main() {
  const mode = process.argv.includes('--verify')
    ? 'verify'
    : process.argv.includes('--status')
      ? 'status'
      : 'migrate';

  const config = readConfig();
  let connection;

  try {
    connection = await mysql.createConnection(config);
  } catch (error) {
    console.error('FAIL — could not connect.');
    console.error(`Driver error code: ${error && error.code ? error.code : 'unknown'}`);
    console.error('Configuration (no values):', describe(config));
    process.exit(1);
  }

  try {
    // --- Connectivity: connection open, database selected, query succeeds ---
    const [rows] = await connection.query('SELECT DATABASE() AS db, VERSION() AS version, 1 AS ping');
    const { db, version, ping } = rows[0];
    if (ping !== 1 || db !== config.database) {
      console.error('FAIL — connected, but the expected database is not selected.');
      process.exit(1);
    }
    console.log('PASS — connection opened.');
    console.log(`PASS — database selected: ${db}`);
    console.log(`PASS — test query succeeded. Server: ${version}`);
    console.log('Configuration (no values):', describe(config));

    if (mode === 'verify') {
      console.log('\nVerify only. No schema change attempted.');
      return;
    }

    // --- Ledger --------------------------------------------------------------
    await connection.query(LEDGER_DDL);
    const [appliedRows] = await connection.query(
      `SELECT \`version\`, \`checksum\` FROM \`${LEDGER_TABLE}\``
    );
    const applied = new Map(appliedRows.map((row) => [row.version, row.checksum]));

    const migrations = loadMigrations();
    if (migrations.length === 0) {
      console.log('\nNo migration files found.');
      return;
    }

    if (mode === 'status') {
      console.log('\nMigrations:');
      for (const migration of migrations) {
        const state = !applied.has(migration.version)
          ? 'PENDING'
          : applied.get(migration.version) === migration.checksum
            ? 'applied'
            : 'APPLIED — FILE MODIFIED SINCE';
        console.log(`  ${migration.version}  ${state}`);
      }
      return;
    }

    console.log('');
    let appliedCount = 0;
    for (const migration of migrations) {
      if (applied.has(migration.version)) {
        if (applied.get(migration.version) !== migration.checksum) {
          // Refused rather than reapplied. Reapplying could be destructive, and
          // ignoring it silently is how two environments end up with different
          // schemas and nothing to show for it.
          console.error(`FAIL — ${migration.version} was already applied but has been edited since.`);
          console.error('Add a NEW numbered migration instead of editing an applied one.');
          process.exit(1);
        }
        console.log(`  skip   ${migration.version} (already applied)`);
        continue;
      }

      const statements = statementsOf(migration.sql);
      // Checked against the statements, not the raw file, so a comment that
      // merely mentions one of these words does not block a safe migration.
      if (statements.some((statement) => DESTRUCTIVE.test(statement))) {
        console.error(`FAIL — ${migration.version} contains DROP/TRUNCATE/DELETE.`);
        console.error('This script will not run destructive statements against production data.');
        process.exit(1);
      }

      // The ledger row is written in the same transaction as the change, so a
      // failure part-way cannot leave a migration recorded as applied when it
      // is not. DDL is not transactional in MySQL/MariaDB — an interrupted
      // CREATE TABLE is not rolled back — but `CREATE TABLE IF NOT EXISTS` is
      // safely re-runnable, which is why migration 001 is written that way.
      await connection.beginTransaction();
      try {
        for (const statement of statements) {
          await connection.query(statement);
        }
        await connection.execute(
          `INSERT INTO \`${LEDGER_TABLE}\` (\`version\`, \`checksum\`) VALUES (?, ?)`,
          [migration.version, migration.checksum]
        );
        await connection.commit();
      } catch (error) {
        await connection.rollback().catch(() => {});
        console.error(`FAIL — ${migration.version} did not apply.`);
        console.error(`Driver error code: ${error && error.code ? error.code : 'unknown'}`);
        process.exit(1);
      }
      console.log(`  apply  ${migration.version} (${statements.length} statement(s))`);
      appliedCount += 1;
    }

    console.log(
      appliedCount === 0
        ? '\nPASS — schema already up to date. Nothing changed.'
        : `\nPASS — ${appliedCount} migration(s) applied.`
    );
  } finally {
    await connection.end().catch(() => {});
  }
}

main().catch((error) => {
  console.error('FAIL — unexpected error.');
  console.error(`Error code: ${error && error.code ? error.code : 'unknown'}`);
  process.exit(1);
});
