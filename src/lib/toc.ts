import { remark } from "remark";
import remarkMdx from "remark-mdx";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";
import type { TocItem } from "./posts";

function headingToString(node: { children?: unknown[] }): string {
  const parts: string[] = [];

  function walk(children: unknown[]) {
    for (const child of children) {
      if (typeof child === "string") {
        parts.push(child);
      } else if (child && typeof child === "object" && "value" in child && typeof child.value === "string") {
        parts.push(child.value);
      } else if (child && typeof child === "object" && "children" in child && Array.isArray(child.children)) {
        walk(child.children as unknown[]);
      }
    }
  }

  if (node.children) {
    walk(node.children);
  }

  return parts.join("");
}

export function extractToc(content: string): TocItem[] {
  const tree = remark().use(remarkMdx).use(remarkGfm).parse(content);
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];

  visit(tree, "heading", (node) => {
    if (node.depth < 2 || node.depth > 3) return;
    const text = headingToString(node as unknown as { children?: unknown[] });
    const id = slugger.slug(text);
    items.push({ id, text, depth: node.depth });
  });

  return items;
}
