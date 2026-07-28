import * as React from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeShiki from "@shikijs/rehype";

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, { behavior: "wrap", properties: { className: ["heading-anchor"] } })
  .use(rehypeShiki, { theme: "github-dark" })
  .use(rehypeStringify);

export async function MarkdownRenderer({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const html = await processor.process(children);
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: String(html) }}
    />
  );
}
