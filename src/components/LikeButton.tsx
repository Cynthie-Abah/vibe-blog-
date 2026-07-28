import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LikeButton({ slug }: { slug: string }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const key = `blog-likes-${slug}`;
    const stored = localStorage.getItem(key);
    const isLiked = localStorage.getItem(`blog-liked-${slug}`) === "1";
    setLiked(isLiked);
    setCount(stored ? parseInt(stored, 10) : Math.floor(Math.random() * 80) + 10);
  }, [slug]);

  const handleClick = () => {
    const key = `blog-likes-${slug}`;
    const likeKey = `blog-liked-${slug}`;
    const nextLiked = !liked;
    setLiked(nextLiked);
    setCount((c) => (nextLiked ? c + 1 : Math.max(0, c - 1)));
    localStorage.setItem(likeKey, nextLiked ? "1" : "0");
    localStorage.setItem(key, String(nextLiked ? count + 1 : Math.max(0, count - 1)));
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      className={cn("gap-2", liked && "border-destructive text-destructive")}
      aria-label={liked ? "Unlike this post" : "Like this post"}
    >
      <Heart className={cn("h-4 w-4", liked && "fill-current")} />
      {count} {count === 1 ? "like" : "likes"}
    </Button>
  );
}
