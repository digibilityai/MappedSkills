import { BLOCKS, type Document, type TopLevelBlock } from '@contentful/rich-text-types';
import type {
  CaseStudyBeforeAfterRow,
  CaseStudyHeadingCard,
  CaseStudyMetric,
  CaseStudyParsedSections,
} from '@/lib/contentful/types';

type RichNode = {
  nodeType?: string;
  value?: string;
  content?: RichNode[];
  data?: unknown;
};

function collectText(node: RichNode | null | undefined): string {
  if (!node) return '';
  if (node.nodeType === 'text') return node.value || '';
  if (!node.content) return '';
  return node.content.map((child) => collectText(child)).join('');
}

function normalizeHeading(text: string): string {
  return text.replace(/\s+/g, ' ').trim().toLowerCase();
}

function toDocument(blocks: TopLevelBlock[]): Document {
  return {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: blocks,
  };
}

function documentToPlainText(document?: Document | null): string {
  if (!document?.content) return '';
  return document.content
    .map((block) => collectText(block as RichNode).trim())
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isHeading2(block: TopLevelBlock): boolean {
  return block.nodeType === BLOCKS.HEADING_2;
}

function isHeading3(block: TopLevelBlock): boolean {
  return block.nodeType === BLOCKS.HEADING_3;
}

function isHeading4(block: TopLevelBlock): boolean {
  return block.nodeType === BLOCKS.HEADING_4;
}

function isAnySectionHeading(block: TopLevelBlock): boolean {
  if (isHeading2(block) || isHeading4(block)) return true;
  if (isHeading3(block)) {
    const text = normalizeHeading(collectText(block as RichNode));
    return text.includes('before') && text.includes('after');
  }
  return false;
}

/** Split h4 title + following body blocks until next heading. */
function parseHeadingCards(blocks: TopLevelBlock[]): CaseStudyHeadingCard[] {
  const cards: CaseStudyHeadingCard[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];
    if (!isHeading4(block)) {
      i += 1;
      continue;
    }

    const title = collectText(block as RichNode).trim();
    i += 1;
    const bodyBlocks: TopLevelBlock[] = [];

    while (i < blocks.length && !isAnySectionHeading(blocks[i])) {
      bodyBlocks.push(blocks[i]);
      i += 1;
    }

    const body = bodyBlocks
      .map((b) => collectText(b as RichNode).trim())
      .filter(Boolean)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (title) {
      cards.push({ title, body });
    }
  }

  return cards;
}

function cellText(cell: RichNode): string {
  return collectText(cell).replace(/\s+/g, ' ').trim();
}

function parseTwoColumnMetrics(blocks: TopLevelBlock[]): CaseStudyMetric[] {
  const metrics: CaseStudyMetric[] = [];

  for (const block of blocks) {
    if (block.nodeType !== BLOCKS.TABLE) continue;
    const rows = (block as RichNode).content || [];

    for (const row of rows) {
      if (row.nodeType !== BLOCKS.TABLE_ROW) continue;
      const cells = (row.content || []).filter(
        (c) => c.nodeType === BLOCKS.TABLE_CELL || c.nodeType === BLOCKS.TABLE_HEADER_CELL
      );
      if (cells.length < 2) continue;

      const label = cellText(cells[0]);
      const value = cellText(cells[1]);
      if (!label && !value) continue;
      metrics.push({ label, value });
    }
  }

  return metrics;
}

function parseBeforeAfterTable(blocks: TopLevelBlock[]): CaseStudyParsedSections['beforeAfter'] {
  for (const block of blocks) {
    if (block.nodeType !== BLOCKS.TABLE) continue;
    const rows = (block as RichNode).content || [];
    if (!rows.length) continue;

    let headers = ['Metric', 'Before', 'After'];
    const dataRows: CaseStudyBeforeAfterRow[] = [];
    let startIndex = 0;

    const firstRow = rows[0];
    const firstCells = (firstRow?.content || []).filter(
      (c) => c.nodeType === BLOCKS.TABLE_CELL || c.nodeType === BLOCKS.TABLE_HEADER_CELL
    );
    const hasHeaderCells = firstCells.some((c) => c.nodeType === BLOCKS.TABLE_HEADER_CELL);

    if (hasHeaderCells || firstCells.length >= 3) {
      const headerTexts = firstCells.map(cellText);
      const looksLikeHeader = hasHeaderCells ||
        headerTexts.some((t) => /metric|before|after/i.test(t));
      if (looksLikeHeader) {
        headers = [
          headerTexts[0] || 'Metric',
          headerTexts[1] || 'Before',
          headerTexts[2] || 'After',
        ];
        startIndex = 1;
      }
    }

    for (let i = startIndex; i < rows.length; i += 1) {
      const row = rows[i];
      if (row.nodeType !== BLOCKS.TABLE_ROW) continue;
      const cells = (row.content || []).filter(
        (c) => c.nodeType === BLOCKS.TABLE_CELL || c.nodeType === BLOCKS.TABLE_HEADER_CELL
      );
      if (cells.length < 3) continue;

      dataRows.push({
        metric: cellText(cells[0]),
        before: cellText(cells[1]),
        after: cellText(cells[2]),
      });
    }

    if (dataRows.length) {
      return { headers, rows: dataRows };
    }
  }

  return undefined;
}

type SectionKey =
  | 'problemStatement'
  | 'businessGoals'
  | 'challenges'
  | 'strategyAndTactics'
  | 'servicesProvided'
  | 'toolsAndTechnologies'
  | 'resultsMetrics'
  | 'beforeAfter'
  | 'unknown';

function matchSectionKey(heading: string): SectionKey {
  const h = normalizeHeading(heading);

  if (h.includes('problem')) return 'problemStatement';
  if (h.includes('business goal')) return 'businessGoals';
  if (h.includes('challenge')) return 'challenges';
  if (h.includes('strategy')) return 'strategyAndTactics';
  if (h.includes('services provided') || h === 'services') return 'servicesProvided';
  if (h.includes('tools') || h.includes('technologies')) return 'toolsAndTechnologies';
  if (h.includes('result') || h.includes('metric')) return 'resultsMetrics';
  if (h.includes('before') && h.includes('after')) return 'beforeAfter';
  return 'unknown';
}

/**
 * Parse case study Content rich text into optional designed sections.
 * Missing sections simply won't appear on the page.
 */
export function parseCaseStudyContent(document?: Document | null): CaseStudyParsedSections {
  if (!document?.content?.length) return {};

  const blocks = document.content as TopLevelBlock[];
  const sections: CaseStudyParsedSections = { extras: [] };

  type RawSection = { title: string; key: SectionKey; blocks: TopLevelBlock[] };
  const rawSections: RawSection[] = [];

  let current: RawSection | null = null;

  for (const block of blocks) {
    const isH2 = isHeading2(block);
    const isBeforeAfterH3 =
      isHeading3(block) &&
      normalizeHeading(collectText(block as RichNode)).includes('before') &&
      normalizeHeading(collectText(block as RichNode)).includes('after');

    if (isH2 || isBeforeAfterH3) {
      const title = collectText(block as RichNode).trim();
      if (!title) continue;
      current = {
        title,
        key: matchSectionKey(title),
        blocks: [],
      };
      rawSections.push(current);
      continue;
    }

    if (current) {
      current.blocks.push(block);
    }
  }

  for (const section of rawSections) {
    switch (section.key) {
      case 'problemStatement':
        sections.problemStatement = toDocument(section.blocks);
        break;
      case 'businessGoals':
        sections.businessGoals = toDocument(section.blocks);
        break;
      case 'challenges':
        sections.challenges = parseHeadingCards(section.blocks);
        break;
      case 'strategyAndTactics':
        sections.strategyAndTactics = toDocument(section.blocks);
        break;
      case 'servicesProvided':
        sections.servicesProvided = parseHeadingCards(section.blocks);
        break;
      case 'toolsAndTechnologies':
        sections.toolsAndTechnologies = parseHeadingCards(section.blocks);
        break;
      case 'resultsMetrics': {
        // Before & After may be nested as h3 inside Results in some entries
        const nestedBeforeAfterIndex = section.blocks.findIndex(
          (b) =>
            isHeading3(b) &&
            normalizeHeading(collectText(b as RichNode)).includes('before') &&
            normalizeHeading(collectText(b as RichNode)).includes('after')
        );

        if (nestedBeforeAfterIndex >= 0) {
          const metricsBlocks = section.blocks.slice(0, nestedBeforeAfterIndex);
          const beforeAfterBlocks = section.blocks.slice(nestedBeforeAfterIndex + 1);
          sections.resultsMetrics = parseTwoColumnMetrics(metricsBlocks);
          sections.beforeAfter = parseBeforeAfterTable(beforeAfterBlocks);
        } else {
          sections.resultsMetrics = parseTwoColumnMetrics(section.blocks);
        }
        break;
      }
      case 'beforeAfter':
        sections.beforeAfter = parseBeforeAfterTable(section.blocks);
        break;
      default:
        sections.extras?.push({
          title: section.title,
          document: toDocument(section.blocks),
        });
        break;
    }
  }

  if (sections.extras && sections.extras.length === 0) {
    delete sections.extras;
  }

  return sections;
}

export function excerptFromDocument(document?: Document | null, maxLength = 180): string {
  const text = documentToPlainText(document);
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
}

export function firstHighlightFromSections(sections: CaseStudyParsedSections): string {
  const firstMetric = sections.resultsMetrics?.[0];
  if (firstMetric?.value) return firstMetric.value;
  if (firstMetric?.label) return firstMetric.label;

  const firstRow = sections.beforeAfter?.rows?.[0];
  if (firstRow?.after && firstRow?.metric) {
    return `${firstRow.metric}: ${firstRow.after}`;
  }
  if (firstRow?.after) return firstRow.after;

  return '';
}

export function serviceLabelFromSections(sections: CaseStudyParsedSections): string {
  const services = sections.servicesProvided || [];
  if (!services.length) return 'Case Study';
  return services
    .slice(0, 2)
    .map((s) => s.title)
    .join(' + ');
}
