// Test-only loader: lets node:test require the application's TypeScript (and its `@/` alias) without a build step.
// Uses the repository's own `typescript` to transpile; nothing is written to disk.
const Module = require('node:module');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const root = path.join(__dirname, '..', '..');
const EXT = ['.ts', '.tsx', '.js'];

if (!Module._extensions['.ts']) {
  Module._extensions['.ts'] = (module, filename) => {
    const out = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
      fileName: filename,
    });
    module._compile(out.outputText, filename);
  };
  Module._extensions['.tsx'] = Module._extensions['.ts'];
  const resolve = Module._resolveFilename;
  Module._resolveFilename = function (request, ...rest) {
    if (request.startsWith('@/')) {
      const base = path.join(root, request.slice(2));
      for (const e of ['', ...EXT]) if (fs.existsSync(base + e) && fs.statSync(base + e).isFile()) return base + e;
      for (const e of EXT) if (fs.existsSync(path.join(base, 'index' + e))) return path.join(base, 'index' + e);
    }
    return resolve.call(this, request, ...rest);
  };
}

/** Fresh load (module cache cleared for application files) so env-dependent constants are re-read. */
function load(rel) {
  for (const k of Object.keys(require.cache)) if (k.startsWith(root) && !k.includes('node_modules')) delete require.cache[k];
  return require(path.join(root, rel));
}
module.exports = { load, root };
