export interface ComponentInfo {
  name: string;
  path: string;
}

// Import all UI component modules eagerly using Vite's glob import
const modules = import.meta.glob('../components/ui/*.tsx', { eager: true });

const components: ComponentInfo[] = Object.keys(modules).map((p) => {
  const name = p.split('/').pop()?.replace('.tsx', '') || '';
  return { name, path: p };
});

export interface SearchResult {
  steps: string[];
  best: ComponentInfo | null;
}

/**
 * Intermediate agent that searches the component library for the best match.
 */
export function intermediateAgent(query: string): SearchResult {
  const steps: string[] = [];
  steps.push(`Analyzing query "${query}"`);

  const matches = components.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );
  steps.push(`Found ${matches.length} matching component(s)`);

  if (matches.length === 0) {
    return { steps, best: null };
  }

  const best = matches[0];
  steps.push(`Chose component "${best.name}" as best match`);
  return { steps, best };
}

/**
 * Front generation agent that produces a simple usage snippet.
 */
export function frontGenerationAgent(best: ComponentInfo | null): string[] {
  const steps: string[] = [];
  if (!best) {
    steps.push('No matching component found.');
    return steps;
  }

  steps.push(`Here is a simple usage example for ${best.name}:`);
  steps.push('```tsx');
  steps.push(`<${best.name} />`);
  steps.push('```');
  steps.push('Integrate this snippet with your backend logic as needed.');
  return steps;
}
