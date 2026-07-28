import { createFileRoute } from "@tanstack/react-router";
import { Download, Mail, MapPin, Briefcase, GraduationCap, Code2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SITE } from "@/lib/posts";

const skills = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "GraphQL",
  "Design Systems",
  "Accessibility",
  "Performance",
  "TanStack",
  "Testing",
];

const experience = [
  {
    role: "Senior Frontend Engineer",
    company: "Vercel",
    period: "2023 — Present",
    description: "Building the next generation of developer tools and web frameworks.",
  },
  {
    role: "Frontend Engineer",
    company: "Linear",
    period: "2020 — 2023",
    description: "Crafted performant, accessible UI components for issue tracking workflows.",
  },
  {
    role: "UI Developer",
    company: "Stripe",
    period: "2018 — 2020",
    description: "Contributed to design systems and checkout experiences used by millions.",
  },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Alex's Blog" },
      { name: "description", content: "Learn more about Alex Chen, a frontend engineer focused on design systems, accessibility, and performance." },
      { property: "og:title", content: "About — Alex's Blog" },
      { property: "og:description", content: "Learn more about Alex Chen, a frontend engineer focused on design systems, accessibility, and performance." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-[var(--content-width)] px-4 py-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
        <div>
          <p className="text-sm font-medium text-primary">About</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Hey, I'm Alex Chen.
          </h1>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              I'm a frontend engineer who believes the web should be fast, accessible, and a
              pleasure to use. I spend my days building design systems, optimizing performance, and
              making sure products work for everyone.
            </p>
            <p>
              This blog is my personal corner of the internet where I write about what I'm learning,
              the tools I enjoy, and the decisions that go into crafting high-quality software.
            </p>
            <p>
              When I'm not writing code, you'll find me reading, exploring typography, hiking, or
              hunting down the perfect cup of coffee.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button className="gap-2" asChild>
              <a href={`mailto:${SITE.email}`}>
                <Mail className="h-4 w-4" />
                Get in touch
              </a>
            </Button>
            <Button variant="outline" className="gap-2" asChild>
              <a href="/resume.pdf" download>
                <Download className="h-4 w-4" />
                Download resume
              </a>
            </Button>
          </div>

          <section className="mt-16">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold tracking-tight text-foreground">
              <Briefcase className="h-5 w-5 text-primary" />
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((job) => (
                <Card key={job.company} className="border-border/60 bg-card">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                      <h3 className="font-semibold text-card-foreground">{job.role}</h3>
                      <span className="text-sm text-muted-foreground">{job.period}</span>
                    </div>
                    <p className="text-sm font-medium text-primary">{job.company}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{job.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold tracking-tight text-foreground">
              <GraduationCap className="h-5 w-5 text-primary" />
              Education
            </h2>
            <Card className="border-border/60 bg-card">
              <CardHeader className="pb-3">
                <h3 className="font-semibold text-card-foreground">B.S. Computer Science</h3>
                <p className="text-sm text-muted-foreground">University of California, Berkeley</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">2014 — 2018</p>
              </CardContent>
            </Card>
          </section>
        </div>

        <aside className="space-y-6">
          <Card className="border-border/60 bg-card">
            <CardHeader>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-card-foreground">
                <Code2 className="h-5 w-5 text-primary" />
                Skills
              </h2>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card">
            <CardHeader>
              <h2 className="text-lg font-semibold text-card-foreground">Location</h2>
            </CardHeader>
            <CardContent className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              San Francisco, CA
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
