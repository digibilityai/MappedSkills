/**
 * Where a recorded headline takes its orange emphasis (R3): the part after its first colon, else after its first vertical bar, else none. Pure styling:
 * `before + emphasis` is always exactly the recorded text, so the heading's text, metadata and structured data never change.
 */
export function splitAfterMarker(title: string): { before: string; emphasis: string } {
  const m = /^(.*?[:|])(\s+)(\S[\s\S]*)$/.exec(title);
  if (!m) return { before: title, emphasis: '' };
  return { before: m[1] + m[2], emphasis: m[3] };
}
