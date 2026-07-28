import { Github, Linkedin, Twitter, Rss } from "lucide-react";
import { Link } from "@tanstack/react-router";

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/alex" },
  { icon: Github, label: "GitHub", href: "https://github.com/alex" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/alex" },
  { icon: Rss, label: "RSS", href: "/rss.xml" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="mx-auto flex max-w-[var(--content-width)] flex-col items-center justify-between gap-6 px-4 md:flex-row">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Alex Chen. All rights reserved.
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={link.label}
            >
              <link.icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <Link to="/blog" className="transition-colors hover:text-foreground">
            Blog
          </Link>
          <Link to="/about" className="transition-colors hover:text-foreground">
            About
          </Link>
          <Link to="/contact" className="transition-colors hover:text-foreground">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
