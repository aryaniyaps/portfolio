import type { Root, Element } from "hast";

const rehypeCodeMeta: () => (tree: Root) => void = () => (tree: Root) => {
  visit(tree);
};

function visit(node: Root | Element): void {
  if (!("children" in node)) return;

  for (const child of node.children) {
    if (child.type !== "element") {
      continue;
    }

    if (
      child.tagName === "code" &&
      Array.isArray(child.properties?.className)
    ) {
      const cls = child.properties.className as string[];
      const langClass = cls.find((c) => c.startsWith("language-"));
      if (!langClass) {
        visit(child);
        continue;
      }

      const raw = langClass.replace("language-", "");
      const colonIdx = raw.indexOf(":");
      if (colonIdx === -1) {
        visit(child);
        continue;
      }

      const lang = raw.slice(0, colonIdx);
      const filename = raw.slice(colonIdx + 1);

      cls[cls.indexOf(langClass)] = "language-" + lang;

      const existingMeta = (child.data?.meta ??
        child.properties?.metastring ??
        "") as string;

      const newMeta = existingMeta
        ? existingMeta + " title=\"" + filename + "\""
        : "title=\"" + filename + "\"";

      if (!child.data) child.data = {};
      child.data.meta = newMeta;
      child.properties.metastring = newMeta;
    }

    visit(child);
  }
}

export default rehypeCodeMeta;