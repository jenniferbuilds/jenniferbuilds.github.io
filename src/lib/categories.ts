import { slugify } from './slugify';

export interface CategoryMeta {
  icon: string;
  description: string;
}

/** The long-term direction of this blog, reflected in its categories. */
export const CATEGORY_META: Record<string, CategoryMeta> = {
  'AI & Agents': {
    icon: '🤖',
    description: 'Agents, LLMs, RAG, MCP, tool calling, memory, evaluation',
  },
  'Software Engineering': {
    icon: '🏗️',
    description: 'Architecture, system design, distributed systems, performance',
  },
  'Developer Tools': {
    icon: '🛠️',
    description: 'CLI, GitHub, developer experience, vibe coding, open source',
  },
  'Learning': {
    icon: '🧠',
    description: 'Technical notes, paper notes, book notes, interview prep',
  },
  'Building': {
    icon: '✍️',
    description: 'Projects, experiments, lessons learned, architecture decisions',
  },
};

export const CATEGORY_ORDER = Object.keys(CATEGORY_META);

export interface CategorySummary {
  label: string;
  slug: string;
  count: number;
  icon: string;
  description: string;
}

/** Build display-ready summaries (known categories first, then any custom ones). */
export function summarizeCategories(categories: string[]): CategorySummary[] {
  const counts = new Map<string, number>();
  for (const c of categories) counts.set(c, (counts.get(c) ?? 0) + 1);

  const known = CATEGORY_ORDER.map((label) => ({
    label,
    slug: slugify(label),
    count: counts.get(label) ?? 0,
    ...CATEGORY_META[label],
  }));

  const extra = [...counts.keys()]
    .filter((c) => !(c in CATEGORY_META))
    .map((label) => ({
      label,
      slug: slugify(label),
      count: counts.get(label)!,
      icon: '📁',
      description: '',
    }));

  return [...known, ...extra];
}
