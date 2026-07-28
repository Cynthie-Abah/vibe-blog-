import * as React from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeShiki from "@shikijs/rehype";
import type { PluggableList } from "unified";

/**
 * Reusable Markdown renderer configuration. Since the project uses the edge
 * runtime, we use react-markdown with rehype plugins instead of a heavy runtime
 * MDX compiler. This gives us syntax highlighting, GitHub-flavored Markdown,
 * and heading anchors without sacrificing build or runtime performance.
 */
export const markdownPlugins = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "wrap", properties: { className: ["heading-anchor"] } }],
    [rehypeShiki, { theme: "github-dark" }],
  ] satisfies PluggableList,
};

export function MarkdownRenderer({
  children,
  components,
}: {
  children: string;
  components?: Components;
}) {
  return (
    <ReactMarkdown
      remarkPlugins={markdownPlugins.remarkPlugins}
      rehypePlugins={markdownPlugins.rehypePlugins as PluggableList}
      components={components}
    >
      {children}
    </ReactMarkdown>
  );
}
