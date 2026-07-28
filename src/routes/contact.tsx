import { createFileRoute } from "@tanstack/react-router";
import { Mail, Github, Linkedin, Twitter, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { SITE } from "@/lib/posts";

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/alex" },
  { icon: Github, label: "GitHub", href: "https://github.com/alex" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/alex" },
  { icon: Mail, label: "Email", href: `mailto:${SITE.email}` },
];

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Alex's Blog" },
      { name: "description", content: "Get in touch with Alex Chen. Send a message, connect on social media, or drop an email." },
      { property: "og:title", content: "Contact — Alex's Blog" },
      { property: "og:description", content: "Get in touch with Alex Chen. Send a message, connect on social media, or drop an email." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-[var(--content-width)] px-4 py-16">
      <div className="mb-12 max-w-2xl">
        <p className="text-sm font-medium text-primary">Contact</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Say hello
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Have a question, project idea, or just want to chat? I'd love to hear from you.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
        <Card className="border-border/60 bg-card">
          <CardContent className="p-6">
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks for reaching out! This is a demo form.");
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What's this about?" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Your message..."
                  rows={6}
                  required
                />
              </div>
              <Button type="submit" className="gap-2">
                <Send className="h-4 w-4" />
                Send message
              </Button>
            </form>
          </CardContent>
        </Card>

        <aside className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground">Connect</h2>
          <div className="flex flex-col gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 rounded-lg border border-border/60 bg-card p-3 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </a>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
