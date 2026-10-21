#!/usr/bin/env node
// G6 simplified — command line for migration.mjs (byte-identical to S2-R1 apart from this line). NOT EXECUTED.
//
//   node cli.mjs plan          --space <id> --environment staging --out <new dir>
//   node cli.mjs apply         --space <id> --environment staging --out <new dir> --confirm <id>/staging
//   node cli.mjs rollback-plan --space <id> --environment staging --out <new dir> --snapshot <before-content-type.json> --strategy omit|delete
//   node cli.mjs rollback      (as rollback-plan) --confirm <id>/staging
//
// The Management token is read ONLY from the CONTENTFUL_MANAGEMENT_TOKEN environment variable, never from arguments,
// files or other variables, and is never printed. CONTENTFUL_ENVIRONMENT / CONTENTFUL_SPACE_ID are deliberately ignored.

import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import {
  CmaError, GuardError, MIGRATION_ID, PreconditionError, assertAllowedEnvironment, assertId, createCmaClient,
  makeRedactor, runForward, runRollback,
} from './migration.mjs';

const MODES = ['plan', 'apply', 'rollback-plan', 'rollback'];
const FLAGS = ['space', 'environment', 'out', 'confirm', 'snapshot', 'strategy'];

export function parseArgs(argv) {
  const [mode, ...rest] = argv;
  if (!MODES.includes(mode)) throw new GuardError(`First argument must be one of: ${MODES.join(', ')}.`);
  const opts = { mode };
  for (let i = 0; i < rest.length; i += 2) {
    const key = rest[i]?.startsWith('--') ? rest[i].slice(2) : null;
    if (!key || !FLAGS.includes(key)) throw new GuardError(`Unknown argument "${rest[i]}". Tokens are never accepted as arguments.`);
    if (rest[i + 1] === undefined || rest[i + 1].startsWith('--')) throw new GuardError(`--${key} needs a value.`);
    opts[key] = rest[i + 1];
  }
  if (argv.some((a) => /CFPAT-|token/i.test(a))) throw new GuardError('Arguments look like they contain a token. Use the environment variable.');
  assertId('space ID (--space)', opts.space);
  assertAllowedEnvironment(opts.environment);
  if (!opts.out) throw new GuardError('--out <new directory> is required.');
  const writes = mode === 'apply' || mode === 'rollback';
  if (writes && opts.confirm !== `${opts.space}/${opts.environment}`) {
    throw new GuardError(`--confirm must be exactly "${opts.space}/${opts.environment}" for ${mode}.`);
  }
  if (mode.startsWith('rollback') && (!opts.snapshot || !opts.strategy)) {
    throw new GuardError('Rollback needs --snapshot <before-content-type.json> and --strategy omit|delete.');
  }
  return opts;
}

async function main() {
  const token = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
  const redact = makeRedactor(token);
  const log = (line) => process.stdout.write(`${redact(line)}\n`);
  try {
    const opts = parseArgs(process.argv.slice(2));
    const outDir = resolve(opts.out);
    await mkdir(outDir, { recursive: true });
    if ((await readdir(outDir)).length) throw new GuardError(`--out ${outDir} is not empty. Use a new directory per run.`);
    const write = (name, content) => writeFile(join(outDir, name), redact(content), { flag: 'wx' });
    const client = createCmaClient({
      token, spaceId: opts.space, environmentId: opts.environment,
      readOnly: opts.mode === 'plan' || opts.mode === 'rollback-plan',
    });
    log(`${MIGRATION_ID} — mode ${opts.mode} — space ${opts.space} — environment ${opts.environment} — output ${outDir}`);
    const ctx = {
      client, write, log, mode: opts.mode, spaceId: opts.space, environmentId: opts.environment,
      now: () => new Date().toISOString(),
    };
    let code;
    if (opts.mode.startsWith('rollback')) {
      const snapshot = JSON.parse(await readFile(resolve(opts.snapshot), 'utf8'));
      code = await runRollback({ ...ctx, snapshot, strategy: opts.strategy });
    } else {
      code = await runForward(ctx);
    }
    process.exitCode = code;
  } catch (e) {
    log(`${e instanceof GuardError ? 'REFUSED' : e instanceof PreconditionError ? 'PRECONDITION' : e instanceof CmaError ? 'API ERROR' : 'ERROR'}: ${e.message}`);
    process.exitCode = e instanceof GuardError ? 1 : e instanceof PreconditionError ? 2 : 3;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main();
