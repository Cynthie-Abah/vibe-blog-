import { ExternalLink, Github } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  image?: string;
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group flex flex-col overflow-hidden border-border/60 bg-card transition-all hover:border-border hover:shadow-sm">
      {project.image && (
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-card-foreground">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      </CardHeader>
      <CardContent className="mt-auto flex gap-3">
        {project.demo && (
          <Button variant="default" size="sm" className="gap-2" asChild>
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Live demo
            </a>
          </Button>
        )}
        {project.github && (
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              Source
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
