import helloWorld from "@/assets/blog/hello-world.jpg";
import buildingMyBlog from "@/assets/blog/building-my-blog.jpg";
import learningReact from "@/assets/blog/learning-react.jpg";
import javascriptTips from "@/assets/blog/javascript-tips.jpg";
import nextjsGuide from "@/assets/blog/nextjs-guide.jpg";
import accessibility from "@/assets/blog/accessibility.jpg";

export const coverImages: Record<string, string> = {
  "hello-world": helloWorld,
  "building-my-blog": buildingMyBlog,
  "learning-react": learningReact,
  "javascript-tips": javascriptTips,
  "nextjs-guide": nextjsGuide,
  accessibility,
};

export function getCoverImage(slug: string): string | undefined {
  return coverImages[slug];
}
