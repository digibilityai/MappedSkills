import type { Document } from '@contentful/rich-text-types';

/** Builders for Contentful-shaped rich text in the development-only fixtures (`lib/case-study-local-preview.ts`, `lib/case-study-local-batch.ts`). */
export type Run = string | { b: string };
const t = (value: string, bold = false) => ({ nodeType: 'text', value, marks: bold ? [{ type: 'bold' }] : [], data: {} });
const runs = (parts: Run[]) => parts.map((p) => (typeof p === 'string' ? t(p) : t(p.b, true)));
export const p = (...parts: Run[]) => ({ nodeType: 'paragraph', data: {}, content: runs(parts) });
export const h3 = (text: string) => ({ nodeType: 'heading-3', data: {}, content: [t(text)] });
export const li = (...parts: Run[]) => ({ nodeType: 'list-item', data: {}, content: [p(...parts)] });
export const ul = (...items: ReturnType<typeof li>[]) => ({ nodeType: 'unordered-list', data: {}, content: items });
export const doc = (...content: unknown[]) => ({ nodeType: 'document', data: {}, content }) as unknown as Document;
