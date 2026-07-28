import { z } from "zod";

export const frontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z
    .union([z.date(), z.string().date()])
    .transform((value) =>
      value instanceof Date ? value.toISOString().split("T")[0] : value
    ),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  featured: z.boolean().default(false),
  category: z.string().default("General"),
});


export type Frontmatter = z.infer<typeof frontmatterSchema>;

export type PostSummary = {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateFormatted: string;
  tags: string[];
  cover: string;
  category: string;
  featured: boolean;
  readingTime: number;
  excerpt: string;
};

export type Post = PostSummary & {
  content: string;
};

export type TocItem = {
  id: string;
  text: string;
  depth: number;
};

export type PostWithToc = Post & {
  toc: TocItem[];
};


export const SITE = {
  title: "Alex's Blog",
  description: "A fast, accessible, and entirely personal blog about engineering, design, and the craft of building for the web.",
  author: "Alex Chen",
  url: "https://alexchen.blog",
  twitter: "@alexchen",
  github: "alexchen",
  linkedin: "alexchen",
  email: "hello@example.com",
};


export function sortByDateDesc<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getCategories(posts: PostSummary[]): string[] {
  const categories = new Set(posts.map((p) => p.category));
  return Array.from(categories).sort();
}

export function getTags(posts: PostSummary[]): string[] {
  const tags = new Set(posts.flatMap((p) => p.tags));
  return Array.from(tags).sort();
}

export function getFeaturedPosts(posts: PostSummary[]): PostSummary[] {
  return sortByDateDesc(posts.filter((p) => p.featured));
}

export function getLatestPosts(posts: PostSummary[], limit = 6): PostSummary[] {
  return sortByDateDesc(posts).slice(0, limit);
}

export function getRelatedPosts(currentSlug: string, posts: PostSummary[], limit = 3): PostSummary[] {
  const current = posts.find((p) => p.slug === currentSlug);
  if (!current) return [];

  const scored = posts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => {
      const sharedTags = p.tags.filter((t) => current.tags.includes(t)).length;
      const sameCategory = p.category === current.category ? 1 : 0;
      return { post: p, score: sharedTags + sameCategory };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || +new Date(b.post.date) - +new Date(a.post.date));

  return scored.slice(0, limit).map((s) => s.post);
}


export function createExcerpt(content: string, maxLength = 160): string {
  const plain = content
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= maxLength) return plain;
  return plain.slice(0, maxLength).replace(/\s+\S*$/, "") + "…";
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
