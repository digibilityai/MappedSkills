import { ActionPair } from '@/components/direction-c/primitives';
import { HOME } from './home/content';

/**
 * The shared C+ closing section (proto/direction-c-plus 0a8b611, ConceptB.tsx `Close`), unchanged, used by the
 * approved Home, How It Works and Conversion Optimization designs. ActionPair links to the live /contact and
 * /schedule-call.
 */
export function Close({ h, body }: { h: string; body: string }) {
  return (
    <section className="b-close" aria-labelledby="b-close-h">
      <div className="px-wrap b-close-in" data-rv="">
        <div>
          <h2 id="b-close-h" className="b-h2">
            {h}
          </h2>
          <p className="b-lede">{body}</p>
        </div>
        <ActionPair primaryLabel={HOME.hero.primary} />
      </div>
    </section>
  );
}
