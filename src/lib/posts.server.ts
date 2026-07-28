import matter from "gray-matter";

import { calculateReadingTime, formatReadingTime } from "./readingTime";
import {
  createExcerpt,
  formatDate,
  frontmatterSchema,
  type PostSummary,
  type PostWithToc,
} from "./posts";
import { extractToc } from "./toc";
import { getCoverImage } from "./covers";


// Load all .mdx files as raw strings at build time. This is safe for the edge
// because the content is bundled into the server bundle and never read from disk.
const rawModules = import.meta.glob<string>("/content/**/*.mdx", {
  query: "?raw",
  eager: true,
  import: "default",
});

function parsePost(path: string, source: string): PostWithToc {
  const slug = path.split("/").pop()?.replace(/\.mdx$/, "");
  if (!slug) throw new Error(`Could not derive slug from ${path}`);

  const parsed = matter(source);
  const frontmatter = frontmatterSchema.parse(parsed.data);
  const content = parsed.content;
  const readingTime = calculateReadingTime(content);
  const toc = extractToc(content);
  const cover = getCoverImage(slug) ?? frontmatter.cover ?? "";

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    dateFormatted: formatDate(frontmatter.date),
    tags: frontmatter.tags,
    cover,
    category: frontmatter.category,
    featured: frontmatter.featured,
    content,
    readingTime,
    excerpt: createExcerpt(content),
    toc,
  };
}


export function getAllPosts(): PostSummary[] {
  return Object.entries(rawModules)
    .map(([path, source]) => parsePost(path, source))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      dateFormatted: post.dateFormatted,
      tags: post.tags,
      cover: post.cover,
      category: post.category,
      featured: post.featured,
      readingTime: post.readingTime,
      excerpt: post.excerpt,
    }));
}

export function getPostBySlug(slug: string): PostWithToc | undefined {
  const entry = Object.entries(rawModules).find(([path]) =>
    path.endsWith(`/${slug}.mdx`)
  );
  if (!entry) return undefined;
  return parsePost(entry[0], entry[1]);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getFormattedReadingTime(post: { readingTime: number }): string {
  return formatReadingTime(post.readingTime);
}
