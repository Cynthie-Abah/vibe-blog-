import { createFileRoute } from "@tanstack/react-router";

import { ProjectCard, type Project } from "@/components/ProjectCard";

const projects: Project[] = [
  {
    title: "Next.js Starter Kit",
    description:
      "A production-ready starter with TypeScript, Tailwind, MDX, and a complete design system. Designed for speed and accessibility.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    github: "https://github.com/alex/nextjs-starter",
    demo: "https://nextjs-starter-demo.vercel.app",
  },
  {
    title: "React Design System",
    description:
      "A composable component library with accessible primitives, dark mode support, and thorough documentation.",
    tags: ["React", "Storybook", "A11y"],
    github: "https://github.com/alex/react-design-system",
    demo: "https://react-design-system.vercel.app",
  },
  {
    title: "Personal Dashboard",
    description:
      "A minimalist dashboard for tracking habits, notes, and reading lists. Built with TanStack and Lovable Cloud.",
    tags: ["TanStack", "Lovable Cloud", "React"],
    github: "https://github.com/alex/personal-dashboard",
    demo: "https://personal-dashboard-demo.lovable.app",
  },
  {
    title: "Markdown Blog Engine",
    description:
      "A fast, static blog engine with Shiki syntax highlighting, table of contents, and automatic RSS and sitemap generation.",
    tags: ["MDX", "Shiki", "RSS"],
    github: "https://github.com/alex/markdown-blog",
    demo: "https://markdown-blog-demo.vercel.app",
  },
  {
    title: "Accessibility Audit CLI",
    description:
      "A command-line tool that runs axe-core audits across pages and produces actionable reports for teams.",
    tags: ["Node.js", "axe-core", "CLI"],
    github: "https://github.com/alex/a11y-audit-cli",
  },
  {
    title: "Weather PWA",
    description:
      "A lightweight progressive web app for local weather with offline support and a clean, focused interface.",
    tags: ["PWA", "React", "TypeScript"],
    github: "https://github.com/alex/weather-pwa",
    demo: "https://weather-pwa-demo.vercel.app",
  },
];

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Alex's Blog" },
      { name: "description", content: "A selection of projects built by Alex Chen, including open-source tools, design systems, and web applications." },
      { property: "og:title", content: "Projects — Alex's Blog" },
      { property: "og:description", content: "A selection of projects built by Alex Chen, including open-source tools, design systems, and web applications." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[var(--content-width)] px-4 py-16">
      <div className="mb-12 max-w-2xl">
        <p className="text-sm font-medium text-primary">Projects</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Things I've built
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A mix of open-source tools, experiments, and products I've worked on. Most are built to
          solve a problem I ran into while writing software.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
