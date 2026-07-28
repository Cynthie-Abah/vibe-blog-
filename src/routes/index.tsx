import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, Twitter, Github, Linkedin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/BlogCard";
import { Newsletter } from "@/components/Newsletter";
import { getAllPosts } from "@/lib/posts.functions";
import { getFeaturedPosts, getLatestPosts, type PostSummary } from "@/lib/posts";



export const Route = createFileRoute("/")({
  loader: async () => {
    const posts: PostSummary[] = await getAllPosts();
    return {
      featured: getFeaturedPosts(posts),
      latest: getLatestPosts(posts, 6),
    };
  },

  head: () => ({
    meta: [
      { title: "Alex's Blog — Writing on code, design, and the web" },
      { name: "description", content: "A fast, accessible, and entirely personal blog about engineering, design, and the craft of building for the web." },
      { property: "og:title", content: "Alex's Blog — Writing on code, design, and the web" },
      { property: "og:description", content: "A fast, accessible, and entirely personal blog about engineering, design, and the craft of building for the web." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const { featured, latest } = Route.useLoaderData();
  const heroPost = featured[0] ?? latest[0];

  return (
    <div className="mx-auto max-w-[var(--content-width)] px-4">
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Hi, I'm Alex Chen</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Writing on code, design, and the craft of building for the web.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            A personal space where I share what I'm learning about frontend engineering, accessibility, and the tools that shape how we create software.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/blog">
                Read the blog
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/about">About me</Link>
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-4">
            <a href="https://twitter.com/alex" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://github.com/alex" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com/in/alex" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-foreground">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Featured */}
      {heroPost && (
        <section className="pb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Featured</h2>
            <Link to="/blog" className="text-sm font-medium text-primary hover:underline">
              View all
            </Link>
          </div>
          <BlogCard post={heroPost} featured />
        </section>
      )}

      {/* Latest */}
      <section className="py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Latest articles</h2>
          <Link to="/blog" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {latest.slice(0, 4).map((post: PostSummary) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <Newsletter />
      </section>
    </div>
  );
}
