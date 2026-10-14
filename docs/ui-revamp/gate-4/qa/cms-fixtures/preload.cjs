/**
 * GATE 4 · B0 — Contentful fixture preload.
 *
 * Loaded with `NODE_OPTIONS=--require <this file>` into `next build` and
 * `next start` of a SCRATCH copy of the application (never the deployed one).
 * It replaces `globalThis.fetch` before Next.js wraps it, and answers ONLY:
 *   - POST https://graphql.contentful.com/...  → fixtures.cjs (by operation name)
 *   - GET  https://images.ctfassets.net/...    → a 1×1 PNG
 * Every other request passes through untouched. No application file changes:
 * the real client (lib/contentful/client.ts), queries, mappers and components run.
 *
 * Requires CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN to be NON-EMPTY so
 * the client builds a request; the serve/build commands set the placeholder
 * value "fixture". They are not credentials and reach no Contentful service.
 */
const { resolve } = require('./fixtures.cjs');

const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGO4cenYfwAIZgNwdBuzEgAAAABJRU5ErkJggg==', 'base64');
const realFetch = globalThis.fetch;

globalThis.fetch = async function fixtureFetch(input, init) {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input?.url;
  if (url && url.startsWith('https://graphql.contentful.com/')) {
    let body = init?.body;
    if (!body && input && typeof input === 'object' && 'text' in input) body = await input.text();
    const { query = '', variables = {} } = JSON.parse(String(body || '{}'));
    const op = (/query\s+(\w+)/.exec(query) || [])[1] || '';
    const data = resolve(op, variables);
    if (process.env.FIXTURE_LOG) console.log(`[fixture] ${op} ${JSON.stringify(variables)}`);
    return new Response(JSON.stringify({ data }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
  if (url && url.startsWith('https://images.ctfassets.net/')) {
    return new Response(PNG, { status: 200, headers: { 'Content-Type': 'image/png' } });
  }
  return realFetch(input, init);
};
