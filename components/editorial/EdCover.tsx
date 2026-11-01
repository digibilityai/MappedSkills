import './editorial.css';

/** The typographic cover used where an article has no image: its topic on deep ink with one orange square. No picture, no claim. */
export function EdCover({ topic }: { topic: string }) {
  return (
    <div className="ed-cover" aria-hidden="true">
      <i />
      <b>{topic}</b>
    </div>
  );
}
