#!/usr/bin/env node
/**
 * cPanel cron: resend enquiries the CRM has not acknowledged.
 *
 *   * /5 * * * *  cd <app dir> && <node> scripts/crm-retry.cjs
 *
 * Needs DB_HOST/DB_USER/DB_PASSWORD/DB_NAME and MAPPEDSKILLS_CRM_LEAD_URL in the
 * environment, or in the app's `.env` (loaded here without overriding anything
 * already set). The webhook secret is read from ~/.mappedskills-lead-webhook-secret.
 * Prints counts only.
 */
const fs = require('node:fs');
const path = require('node:path');
const mysql = require('mysql2/promise');
const { retryPending } = require('../lib/crm-delivery.cjs');

async function main() {
  const envFile = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envFile) && typeof process.loadEnvFile === 'function') process.loadEnvFile(envFile);

  const required = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'MAPPEDSKILLS_CRM_LEAD_URL'];
  const missing = required.filter((n) => !(process.env[n] || '').trim());
  if (missing.length) {
    console.error(`crm-retry: missing environment: ${missing.join(', ')}`);
    process.exit(2);
  }

  const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number.parseInt(process.env.DB_PORT || '3306', 10) || 3306,
    connectionLimit: 1,
    timezone: 'Z',
    charset: 'utf8mb4_unicode_ci',
  });
  try {
    console.log('crm-retry:', JSON.stringify(await retryPending({ db })));
  } finally {
    await db.end();
  }
}

main().catch((error) => {
  console.error(`crm-retry: failed (${error?.code ?? error?.name ?? 'error'})`);
  process.exit(1);
});
