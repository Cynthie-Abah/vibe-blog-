import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const key = `blog-views-${slug}`;
    const stored = localStorage.getItem(key);
    const count = stored ? parseInt(stored, 10) : Math.floor(Math.random() * 500) + 50;
    localStorage.setItem(key, String(count + 1));
    setViews(count + 1);
  }, [slug]);

  if (views === null) return null;

  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      <Eye className="h-3.5 w-3.5" />
      {views.toLocaleString()} views
    </span>
  );
}
