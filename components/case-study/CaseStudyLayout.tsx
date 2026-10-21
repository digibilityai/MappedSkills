import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { ProseDocument } from '@/components/case-study/CaseStudyContent';
import type { CmsCaseStudy } from '@/lib/contentful/types';

type CaseStudyLayoutProps = {
  content: NonNullable<CmsCaseStudy['newLayout']>;
};

/**
 * The approved case-study body: The Problem, What We Did, The Impact and an optional evidence note.
 * Hero/context, the optional testimonial and the CTA are rendered by the page around it.
 * Every block is the editor's own text, rendered as written: nothing here computes, derives or adds a figure.
 */
export function CaseStudyLayout({ content }: CaseStudyLayoutProps) {
  const blocks = [
    { id: 'problem', title: 'The Problem', doc: content.problem },
    { id: 'what-we-did', title: 'What We Did', doc: content.whatWeDid },
    { id: 'impact', title: 'The Impact', doc: content.impact },
  ];
  return (
    <>
      {blocks.map((b, i) => (
        <Section key={b.id} className={i % 2 === 1 ? 'border-y border-border bg-secondary/5' : undefined}>
          <Container>
            <div className="max-w-3xl break-words" data-case-study-block={b.id}>
              <h2 className="text-3xl font-bold font-heading tracking-tight mb-6">{b.title}</h2>
              <ProseDocument document={b.doc} />
              {/* The evidence note belongs to The Impact, so it sits inside that block rather than in a section of its own. */}
              {b.id === 'impact' && content.evidenceNote ? (
                <div className="mt-8 rounded-lg border border-border/60 bg-secondary/20 p-4 sm:p-5" data-case-study-block="evidence">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Evidence</p>
                  <p className="text-sm sm:text-base text-foreground leading-relaxed">{content.evidenceNote}</p>
                </div>
              ) : null}
            </div>
          </Container>
        </Section>
      ))}
    </>
  );
}
