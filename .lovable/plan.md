Build the full blog in this TanStack Start project, adapting the Next.js App Router concept to TanStack Router file-based routing. The result will be a fast, accessible, dark-by-default blog with MDX posts, a reading experience, search, and SEO.

````text
Routes
├── /                Home
├── /blog            Blog listing
├── /blog/$slug      Article
├── /about           About
├── /projects        Projects
├── /contact         Contact
├── /rss.xml         RSS feed
└── /sitemap.xml     Sitemap
````

## 1. Design system & global setup
- Update `src/styles.css` with a clean, minimal dark-first palette (slate/ink tones, soft shadows, rounded corners, 760px reading width tokens).
- Set default dark mode on `<html>` in `__root.tsx` and build a manual theme toggle (no system toggle, dark is default).
- Update `__root.tsx` with shared `Navbar`, `Footer`, and default web metadata (favicon, viewport, JSON-LD WebSite).

## 2. Dependencies
Install runtime-safe packages for edge/Worker:
- `@mdx-js/mdx` + `@mdx-js/react` — compile and render MDX.
- `gray-matter` — frontmatter parsing.
- `@shikijs/rehype` — syntax highlighting.
- `remark-gfm` — GitHub-flavored markdown.
- `rehype-slug` + `rehype-autolink-headings` — heading anchors for TOC.

## 3. Content infrastructure
- Create `content/` with six sample posts: `hello-world.mdx`, `building-my-blog.mdx`, `learning-react.mdx`, `javascript-tips.mdx`, `nextjs-guide.mdx`, `accessibility.mdx`.
- `src/lib/posts.ts` — post type, frontmatter schema, helpers for listing, filtering, related posts, featured/latest.
- `src/lib/readingTime.ts` — word/reading-time estimator.
- `src/lib/posts.functions.ts` — `createServerFn` wrappers that use `import.meta.glob` to read `.mdx` files at build time and compile them safely on the server.
- `src/lib/mdx.ts` — MDX compilation pipeline with Shiki, GFM, slug headings.
- `src/lib/toc.ts` — extract table of contents from compiled MDX headings.

## 4. Components
- `src/components/Navbar.tsx` — minimal sticky nav with logo, links, theme toggle.
- `src/components/Footer.tsx` — social links, copyright.
- `src/components/BlogCard.tsx` — cover, title, excerpt, date, tags, reading time.
- `src/components/Search.tsx` — client-side search overlay for posts.
- `src/components/ReadingProgress.tsx` — top progress bar on article pages.
- `src/components/ThemeToggle.tsx` — sun/moon toggle.
- `src/components/Newsletter.tsx` — CTA form with local success state.
- `src/components/TOC.tsx` — sticky table of contents.
- `src/components/MDXComponents.tsx` — typography-aware wrappers (headings, code blocks with copy button, images, blockquotes).
- `src/components/CopyCodeButton.tsx` — copy-to-clipboard for fenced code.
- `src/components/GiscusComments.tsx` — Giscus embed.
- `src/components/ShareButtons.tsx` — share links for article.
- `src/components/ViewCounter.tsx` / `src/components/LikeButton.tsx` — client-side localStorage UI (no backend yet).

## 5. Routes
- `src/routes/index.tsx` — hero, featured posts, latest articles, categories, newsletter, social links.
- `src/routes/blog.index.tsx` — grid/list of all posts, category filter, search button.
- `src/routes/blog.$slug.tsx` — article layout with cover, reading time, tags, TOC, prev/next, related posts, share, comments, like/view UI.
- `src/routes/about.tsx` — bio, skills, experience, tech stack, resume download link, projects.
- `src/routes/projects.tsx` — project cards with GitHub/live demo links.
- `src/routes/contact.tsx` — contact form + social links.
- `src/routes/rss[.]xml.ts` — server route generating RSS 2.0.
- `src/routes/sitemap[.]xml.ts` — server route listing all indexable routes.
- Update `public/robots.txt` to keep `Allow: /` and add a `Sitemap: /sitemap.xml` directive once the route exists.

## 6. SEO & metadata
- Per-route `head()` with unique title, description, canonical, Open Graph, Twitter card.
- JSON-LD for home (WebSite), blog listing (Blog), articles (Article).
- No placeholder og:image; generate cover images for sample posts and use them for article cards/OG.

## 7. Assets
- Generate cover images for the six sample posts under `src/assets/blog/` and reference them in frontmatter and OG tags.

## 8. Verification
- Run `bun run build` to confirm no route-tree mismatch or MDX bundling errors.
- Check key pages render with correct metadata and dark mode.

Notes
- This is TanStack Start, so it uses file-based routing and server functions rather than Next.js App Router. All requested features (home, blog, about, projects, contact, search, TOC, reading time, dark mode, SEO, RSS, sitemap, comments, newsletter) are preserved in that architecture.
- View counter and like button are client-side localStorage only; they can be wired to Lovable Cloud later if you want persistent counts.
