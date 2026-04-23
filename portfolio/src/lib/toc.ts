export interface TocEntry {
  id: string;
  text: string;
  level: number;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function extractToc(content: string): TocEntry[] {
  const headings: TocEntry[] = [];
  const seen = new Map<string, number>();

  const lines = content.split("\n");
  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!match) continue;

    const level = match[1].length;
    const text = match[2].trim();
    const baseSlug = slugify(text);

    const count = seen.get(baseSlug) ?? 0;
    seen.set(baseSlug, count + 1);
    const id = count > 0 ? `${baseSlug}-${count}` : baseSlug;

    headings.push({ id, text, level });
  }

  return headings;
}