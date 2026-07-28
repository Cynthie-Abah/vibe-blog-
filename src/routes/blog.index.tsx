import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useMemo } from "react";

import { BlogCard } from "@/components/BlogCard";
import { Search } from "@/components/Search";
import { Newsletter } from "@/components/Newsletter";
import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/lib/posts.functions";
import { getCategories, getTags, type PostSummary } from "@/lib/posts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    const posts: PostSummary[] = await getAllPosts();
    return { posts, categories: getCategories(posts), tags: getTags(posts) };
  },
  head: () => ({
    meta: [
      { title: "Blog — Alex's Blog" },
      { name: "description", content: "Articles about frontend engineering, accessibility, React, TypeScript, and the craft of building for the web." },
      { property: "og:title", content: "Blog — Alex's Blog" },
      { property: "og:description", content: "Articles about frontend engineering, accessibility, React, TypeScript, and the craft of building for the web." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { posts, categories, tags } = Route.useLoaderData();
  const search: { q?: string; category?: string; tag?: string } = useSearch({ from: "/blog/" });

  const filtered = useMemo(() => {
    let result = [...posts];
    if (search.q) {
      const q = search.q.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t: string) => t.toLowerCase().includes(q))
      );
    }
    if (search.category) {
      result = result.filter((p) => p.category === search.category);
    }
    if (search.tag) {
      result = result.filter((p) => p.tags.includes(search.tag!));
    }
    return result;
  }, [posts, search.q, search.category, search.tag]);

  return (
    <div className="mx-auto max-w-[var(--content-width)] px-4 py-16">
      <div className="mb-12 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Blog
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Articles about frontend engineering, accessibility, React, TypeScript, and the craft of building for the web.
        </p>
      </div>

      <div className="mb-10">
        <Search posts={posts} />
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">Categories:</span>
        {categories.map((category: string) => (

          <a
            key={category}
            href={`/blog?category=${encodeURIComponent(category)}`}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
              search.category === category
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {category}
          </a>
        ))}
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">Tags:</span>
        {tags.slice(0, 12).map((tag: string) => (

          <a
            key={tag}
            href={`/blog?tag=${encodeURIComponent(tag)}`}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
              search.tag === tag
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {tag}
          </a>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">No articles found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {filtered.map((post: PostSummary) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      <section className="py-16">
        <Newsletter />
      </section>
    </div>
  );
}
