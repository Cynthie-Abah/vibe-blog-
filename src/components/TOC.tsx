import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/posts";

export function TOC({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav className="rounded-xl border border-border bg-card p-5">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Table of Contents
      </h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(
              "text-sm",
              item.depth === 2 ? "ml-0" : "ml-4",
              item.depth > 3 ? "hidden" : ""
            )}
          >
            <a
              href={`#${item.id}`}
              className="block text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
