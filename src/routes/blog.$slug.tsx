import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MarkdownRenderer } from "@/lib/mdx";
import { mdxComponents } from "@/components/MDXComponents";
import { TOC } from "@/components/TOC";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ShareButtons } from "@/components/ShareButtons";
import { GiscusComments } from "@/components/GiscusComments";
import { LikeButton } from "@/components/LikeButton";
import { ViewCounter } from "@/components/ViewCounter";
import { BlogCard } from "@/components/BlogCard";
import { Newsletter } from "@/components/Newsletter";
import { getPostBySlug } from "@/lib/posts.functions";
import { getAllPosts } from "@/lib/posts.functions";
import { getRelatedPosts, type PostSummary } from "@/lib/posts";

import { SITE } from "@/lib/posts";
import { getCoverImage } from "@/lib/covers";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const [post, allPosts] = await Promise.all([
      getPostBySlug({ data: { slug: params.slug } }),
      getAllPosts(),
    ]);
    if (!post) throw notFound();
    const index = allPosts.findIndex((p: PostSummary) => p.slug === post.slug);
    const related = getRelatedPosts(post.slug, allPosts, 3);
    return {
      post,
      related,
      prev: index > 0 ? allPosts[index - 1] : null,
      next: index < allPosts.length - 1 ? allPosts[index + 1] : null,
    };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Not found — Alex's Blog" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} — Alex's Blog` },
        { name: "description", content: post.description },
        { name: "author", content: SITE.author },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
        { property: "article:published_time", content: post.date },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
    };
  },
  component: BlogPostPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-[var(--content-width)] px-4 py-24 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Article not found</h1>
      <p className="mt-4 text-muted-foreground">
        The article you're looking for doesn't exist or has been moved.
      </p>
      <Button className="mt-6" asChild>
        <Link to="/blog">Back to blog</Link>
      </Button>
    </div>
  ),
});

function BlogPostPage() {
  const { post, related, prev, next } = Route.useLoaderData();
  const cover = getCoverImage(post.slug) || post.cover;

  return (
    <>
      <ReadingProgress />
      <article className="mx-auto max-w-[var(--content-width)] px-4 py-12">
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to blog
          </Link>
        </div>

        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{post.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {post.dateFormatted}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readingTime} min read
            </span>
            <ViewCounter slug={post.slug} />
          </div>
        </header>

        {cover && (
          <div className="mb-12 overflow-hidden rounded-2xl border border-border">
            <img
              src={cover}
              alt={post.title}
              className="w-full object-cover"
              loading="eager"
            />
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[1fr_240px]">
          <MarkdownRenderer className="prose-custom">
            {post.content}
          </MarkdownRenderer>
          <aside className="hidden lg:block">

            <div className="sticky top-24 space-y-6">
              <TOC items={post.toc} />
            </div>
          </aside>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
          <div className="flex items-center gap-4">
            <LikeButton slug={post.slug} />
          </div>
          <ShareButtons title={post.title} url={`${SITE.url}/blog/${post.slug}`} />
        </div>

        {/* Prev/Next */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {prev ? (
            <Link
              to="/blog/$slug"
              params={{ slug: prev.slug }}
              className="group flex flex-col rounded-xl border border-border/60 bg-card p-5 transition-colors hover:border-border"
            >
              <span className="mb-2 flex items-center text-xs text-muted-foreground">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </span>
              <span className="font-medium text-foreground transition-colors group-hover:text-primary">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              to="/blog/$slug"
              params={{ slug: next.slug }}
              className="group flex flex-col items-end rounded-xl border border-border/60 bg-card p-5 text-right transition-colors hover:border-border"
            >
              <span className="mb-2 flex items-center text-xs text-muted-foreground">
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </span>
              <span className="font-medium text-foreground transition-colors group-hover:text-primary">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
              Related articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((post: PostSummary) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Newsletter */}
        <section className="mt-16">
          <Newsletter />
        </section>

        {/* Comments */}
        <GiscusComments />
      </article>
    </>
  );
}
