import { Link } from "@tanstack/react-router";
import { Clock, Calendar } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { PostSummary } from "@/lib/posts";

export function BlogCard({ post, featured = false }: { post: PostSummary; featured?: boolean }) {

  return (
    <Link to="/blog/$slug" params={{ slug: post.slug }}>
      <Card
        className={`group overflow-hidden border-border/60 bg-card transition-all hover:border-border hover:shadow-sm ${
          featured ? "flex flex-col md:flex-row" : ""
        }`}
      >
        <div
          className={`overflow-hidden bg-muted ${
            featured ? "aspect-[16/9] w-full md:w-2/5" : "aspect-[16/9]"
          }`}
        >
          <img
            src={post.cover}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className={featured ? "flex flex-1 flex-col justify-center" : ""}>
          <CardHeader className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <h3 className="text-xl font-semibold leading-tight tracking-tight text-card-foreground transition-colors group-hover:text-primary">
              {post.title}
            </h3>
            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {post.description}
            </p>
          </CardHeader>
          <CardContent className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {post.dateFormatted}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime} min read
            </span>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
