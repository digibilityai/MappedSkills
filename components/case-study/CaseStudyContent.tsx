import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, type Document } from '@contentful/rich-text-types';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Gauge,
  Layers,
  Target,
  Wrench,
  Zap,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import type { CaseStudyParsedSections } from '@/lib/contentful/types';

const proseOptions: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children) => (
      <p className="text-base sm:text-lg leading-relaxed text-foreground mb-4 last:mb-0">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (_node, children) => (
      <ul className="list-disc pl-6 space-y-2 mb-4 text-foreground">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node, children) => (
      <ol className="list-decimal pl-6 space-y-2 mb-4 text-foreground">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node, children) => <li className="leading-relaxed">{children}</li>,
    [BLOCKS.QUOTE]: (_node, children) => (
      <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground my-4">
        {children}
      </blockquote>
    ),
    [INLINES.HYPERLINK]: (node, children) => {
      const href = node.data?.uri as string | undefined;
      return (
        <a
          href={href}
          className="text-accent hover:underline underline-offset-4"
          target={href?.startsWith('http') ? '_blank' : undefined}
          rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

function ProseDocument({ document }: { document: Document }) {
  if (!document?.content?.length) return null;
  return <div>{documentToReactComponents(document, proseOptions)}</div>;
}

function hasDocumentContent(document?: Document | null): boolean {
  if (!document?.content?.length) return false;
  return document.content.some((block) => {
    const walk = (node: { nodeType?: string; value?: string; content?: unknown[] }): string => {
      if (node.nodeType === 'text') return node.value || '';
      if (!node.content) return '';
      return (node.content as Array<{ nodeType?: string; value?: string; content?: unknown[] }>)
        .map(walk)
        .join('');
    };
    return walk(block as { nodeType?: string; value?: string; content?: unknown[] }).trim().length > 0;
  });
}

const CHALLENGE_ICONS = [AlertTriangle, Target, Gauge, Layers];
const SERVICE_ICONS = [CheckCircle2, Zap, Layers, Target];
const TOOL_ICONS = [Wrench, Gauge, Layers, Zap];

type CaseStudyContentProps = {
  sections: CaseStudyParsedSections;
  conclusionJson?: Document | null;
};

export function CaseStudyContent({ sections, conclusionJson }: CaseStudyContentProps) {
  const {
    problemStatement,
    businessGoals,
    challenges,
    strategyAndTactics,
    servicesProvided,
    toolsAndTechnologies,
    resultsMetrics,
    beforeAfter,
    extras,
  } = sections;

  return (
    <>
      {problemStatement && hasDocumentContent(problemStatement) ? (
        <Section className="bg-secondary/5">
          <Container>
            <div className="max-w-7xl">
              <h2 className="text-3xl font-bold font-heading tracking-tight mb-6">Problem Statement</h2>
              <ProseDocument document={problemStatement} />
            </div>
          </Container>
        </Section>
      ) : null}

      {businessGoals && hasDocumentContent(businessGoals) ? (
        <Section>
          <Container>
            <div className="max-w-7xl">
              <h2 className="text-3xl font-bold font-heading tracking-tight mb-6">Business Goals</h2>
              <ProseDocument document={businessGoals} />
            </div>
          </Container>
        </Section>
      ) : null}

      {challenges && challenges.length > 0 ? (
        <Section className="border-y border-border bg-secondary/5">
          <Container>
            <div className="max-w-7xl">
              <h2 className="text-3xl font-bold font-heading tracking-tight mb-8">Challenges</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {challenges.map((item, idx) => {
                  const Icon = CHALLENGE_ICONS[idx % CHALLENGE_ICONS.length];
                  return (
                    <Card key={`${item.title}-${idx}`} className="p-6 sm:p-8 hover:translate-y-0">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <h3 className="text-lg font-semibold font-heading mb-2">{item.title}</h3>
                      {item.body ? (
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {item.body}
                        </p>
                      ) : null}
                    </Card>
                  );
                })}
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {strategyAndTactics && hasDocumentContent(strategyAndTactics) ? (
        <Section>
          <Container>
            <div className="max-w-7xl">
              <h2 className="text-3xl font-bold font-heading tracking-tight mb-6">Strategy and Tactics</h2>
              <Card className="p-6 sm:p-10 hover:translate-y-0 border-accent/20 bg-gradient-to-br from-accent/5 via-background to-secondary/20">
                <ProseDocument document={strategyAndTactics} />
              </Card>
            </div>
          </Container>
        </Section>
      ) : null}

      {servicesProvided && servicesProvided.length > 0 ? (
        <Section className="border-y border-border bg-secondary/5">
          <Container>
            <div className="max-w-7xl">
              <h2 className="text-3xl font-bold font-heading tracking-tight mb-8">Services Provided</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {servicesProvided.map((item, idx) => {
                  const Icon = SERVICE_ICONS[idx % SERVICE_ICONS.length];
                  return (
                    <Card key={`${item.title}-${idx}`} className="p-6 sm:p-8 hover:translate-y-0">
                      <div className="mb-4 flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                          <Icon className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">
                            Service {idx + 1}
                          </p>
                          <h3 className="text-lg font-semibold font-heading">{item.title}</h3>
                        </div>
                      </div>
                      {item.body ? (
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {item.body}
                        </p>
                      ) : null}
                    </Card>
                  );
                })}
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {toolsAndTechnologies && toolsAndTechnologies.length > 0 ? (
        <Section>
          <Container>
            <div className="max-w-7xl">
              <h2 className="text-3xl font-bold font-heading tracking-tight mb-8">
                Tools and Technologies
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {toolsAndTechnologies.map((item, idx) => {
                  const Icon = TOOL_ICONS[idx % TOOL_ICONS.length];
                  return (
                    <div
                      key={`${item.title}-${idx}`}
                      className="rounded-xl border border-border/60 bg-secondary/20 p-5 sm:p-6"
                    >
                      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-foreground text-background">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="font-semibold font-heading mb-2 text-base">{item.title}</h3>
                      {item.body ? (
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {resultsMetrics && resultsMetrics.length > 0 ? (
        <Section className="border-y border-border bg-secondary/5">
          <Container>
            <div className="max-w-7xl">
              <h2 className="text-3xl font-bold font-heading tracking-tight mb-8">Results & Metrics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {resultsMetrics.map((metric, idx) => (
                  <div
                    key={`${metric.label}-${idx}`}
                    className="relative overflow-hidden rounded-xl border border-border/50 bg-background p-6 sm:p-8"
                  >
                    <div className="absolute left-0 top-0 h-full w-1 bg-accent" />
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                      {metric.label}
                    </p>
                    <p className="text-lg sm:text-xl font-semibold font-heading text-foreground leading-snug">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {beforeAfter && beforeAfter.rows.length > 0 ? (
        <Section>
          <Container>
            <div className="max-w-7xl">
              <h2 className="text-3xl font-bold font-heading tracking-tight mb-8">
                Before & After Comparisons
              </h2>
              <div className="overflow-x-auto rounded-xl border border-border/60">
                <table className="w-full min-w-[560px] border-collapse text-left">
                  <thead>
                    <tr className="bg-foreground text-background">
                      {(beforeAfter.headers.length
                        ? beforeAfter.headers
                        : ['Metric', 'Before', 'After']
                      ).map((header) => (
                        <th
                          key={header}
                          className="px-4 sm:px-6 py-4 text-sm font-semibold tracking-wide"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {beforeAfter.rows.map((row, idx) => (
                      <tr
                        key={`${row.metric}-${idx}`}
                        className={idx % 2 === 0 ? 'bg-background' : 'bg-secondary/30'}
                      >
                        <td className="px-4 sm:px-6 py-4 font-medium text-foreground border-t border-border/40">
                          {row.metric}
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-muted-foreground border-t border-border/40">
                          {row.before}
                        </td>
                        <td className="px-4 sm:px-6 py-4 border-t border-border/40">
                          <span className="inline-flex items-center gap-2 font-semibold text-accent">
                            {row.after}
                            <ArrowRight className="h-3.5 w-3.5 opacity-70" />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {extras?.map((extra) =>
        hasDocumentContent(extra.document) ? (
          <Section key={extra.title} className="border-t border-border">
            <Container>
              <div className="max-w-7xl">
                <h2 className="text-3xl font-bold font-heading tracking-tight mb-6">{extra.title}</h2>
                <ProseDocument document={extra.document} />
              </div>
            </Container>
          </Section>
        ) : null
      )}

      {conclusionJson && hasDocumentContent(conclusionJson) ? (
        <Section className="border-y border-border bg-secondary/5">
          <Container>
            <div className="max-w-7xl">
              <h2 className="text-3xl font-bold font-heading tracking-tight mb-6">Conclusion</h2>
              <ProseDocument document={conclusionJson} />
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
