import { Search as SearchIcon, X } from "lucide-react";
import { useState, useMemo } from "react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/posts";
import { Link } from "@tanstack/react-router";

export function Search({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        post.content.toLowerCase().includes(q)
    );
  }, [query, posts]);

  return (
    <div className="relative">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search articles, tags, topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 pl-10 pr-10 text-base"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {query && (
        <div className="mt-2 rounded-lg border border-border bg-card p-2 shadow-sm">
          {results.length === 0 ? (
            <p className="px-3 py-4 text-sm text-muted-foreground">
              No articles found for "{query}".
            </p>
          ) : (
            <ul className="space-y-1">
              {results.map((post) => (
                <li key={post.slug}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="flex flex-col gap-1 rounded-md px-3 py-2 transition-colors hover:bg-muted"
                  >
                    <span className="font-medium text-foreground">{post.title}</span>
                    <span className="line-clamp-1 text-sm text-muted-foreground">
                      {post.description}
                    </span>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[10px]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
