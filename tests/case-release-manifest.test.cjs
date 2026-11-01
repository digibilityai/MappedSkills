// Guards the Contentful release manifest (DEC-117) against the live caseStudies schema: every rich-text field allows only paragraphs and lists
// (enabledNodeTypes ["unordered-list","ordered-list"], "Only paragraphs and lists are allowed"; found by the owner-run check on 2026-11-01 when two
// headings were rejected) and, in practice, only the bold mark. The Delivery API does not expose this rule, so it is pinned here.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'docs/case-release/manifest/manifest.json'), 'utf8'));
const ALLOWED_NODES = new Set(['document', 'paragraph', 'text', 'list-item', 'unordered-list', 'ordered-list']);
const ALLOWED_MARKS = new Set(['bold']);
const RICH = ['problem', 'whatWeDid', 'impact'];

/** Node types and marks a rich-text document uses that the live schema does not allow. */
function violations(node, out = new Set()) {
  if (Array.isArray(node)) { node.forEach((n) => violations(n, out)); return out; }
  if (!node || typeof node !== 'object') return out;
  if (node.nodeType && !ALLOWED_NODES.has(node.nodeType)) out.add(`node ${node.nodeType}`);
  for (const m of node.marks ?? []) if (!ALLOWED_MARKS.has(m.type)) out.add(`mark ${m.type}`);
  for (const c of node.content ?? []) violations(c, out);
  return out;
}
const text = (n) => (n.nodeType === 'text' ? n.value : (n.content ?? []).map(text).join(''));

test('every rich-text field of every manifest entry uses only paragraphs, lists and the bold mark', () => {
  assert.strictEqual(manifest.entries.length, 20);
  for (const e of manifest.entries) for (const f of RICH) {
    if (e.action.startsWith('NO CHANGE')) continue; // live content, never written
    assert.deepStrictEqual([...violations(e.fields[f])], [], `${e.route} ${f}`);
  }
});

test('the two former sub-headings are bold paragraphs with the approved wording, in place', () => {
  const impact = (slug) => manifest.entries.find((e) => e.route === `/portfolio/${slug}`).fields.impact.content;
  for (const [slug, heading, next] of [
    ['anybodycanbake-meta-ads', 'A return to profitability with continued adaptation', 'Amit reports that price revisions and international expansion'],
    ['phoenix-laundry-google-ads', 'Customer lifetime value is a separate business estimate', 'The business supplied an average customer lifetime value of ₹50,000'],
  ]) {
    const c = impact(slug); const i = c.findIndex((n) => text(n) === heading);
    assert.ok(i > 0, `${slug}: sub-heading text kept`);
    assert.strictEqual(c[i].nodeType, 'paragraph'); assert.deepStrictEqual(c[i].content.map((t) => t.marks.map((m) => m.type)), [['bold']], 'bold, as the other lead lines');
    assert.ok(text(c[i + 1]).startsWith(next), `${slug}: the paragraph after it is unchanged`);
  }
});

test('the guard fails on an unsupported node or mark (proven, not assumed)', () => {
  const doc = { nodeType: 'document', content: [{ nodeType: 'heading-3', content: [{ nodeType: 'text', value: 'x', marks: [] }] }, { nodeType: 'paragraph', content: [{ nodeType: 'text', value: 'y', marks: [{ type: 'italic' }] }] }] };
  assert.deepStrictEqual([...violations(doc)].sort(), ['mark italic', 'node heading-3']);
});

test('the release content source builds no heading for Contentful', () => {
  for (const f of ['lib/case-study-local-batch.ts', 'lib/case-study-local-final-four.ts', 'lib/case-study-local-preview.ts']) assert.ok(!/\bh3\(/.test(fs.readFileSync(path.join(root, f), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')), `${f}: no h3()`);
});
