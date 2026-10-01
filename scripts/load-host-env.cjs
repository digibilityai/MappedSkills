/**
 * cPanel keeps the Node app's environment (DB_*) in the CloudLinux selector
 * config, not in `.env` and not in a shell or cron environment. This fills any
 * variable that is still unset from that config so the migration tool and the
 * CRM retry cron see what the running app sees. Never overrides, never prints.
 * A no-op anywhere the config does not exist (local development, CI).
 */
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

function loadHostEnv() {
  try {
    const app = path.basename(path.resolve(__dirname, '..')).replace(/\.new$/, '');
    const cfg = JSON.parse(fs.readFileSync(path.join(os.homedir(), '.cl.selector', 'node-selector.json'), 'utf8'));
    for (const [name, value] of Object.entries(cfg[app]?.env_vars ?? {})) {
      if (process.env[name] === undefined && typeof value === 'string') process.env[name] = value;
    }
  } catch {
    /* not on the cPanel host */
  }
}

module.exports = { loadHostEnv };
