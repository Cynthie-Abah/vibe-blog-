import * as React from "react";
import type { Components } from "react-markdown";

import { CopyCodeButton } from "./CopyCodeButton";
import { cn } from "@/lib/utils";

function Code({
  children,
  className,
  inline,
  ...props
}: React.HTMLAttributes<HTMLElement> & { inline?: boolean }) {
  if (inline) {
    return (
      <code
        className={cn(
          "rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground",
          className
        )}
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

function Pre({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = React.useRef<HTMLPreElement>(null);
  const [language, setLanguage] = React.useState("text");

  React.useEffect(() => {
    const code = preRef.current?.querySelector("code");
    if (code) {
      const match = /language-(\w+)/.exec(code.className || "");
      if (match) setLanguage(match[1]);
    }
  }, [children]);

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border border-border bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-xs font-medium text-white/60 uppercase">{language}</span>
        <CopyCodeButton preRef={preRef} />
      </div>
      <div className="overflow-x-auto p-4 text-sm leading-relaxed">
        <pre
          ref={preRef}
          {...props}
          className={cn("!bg-transparent", props.className)}
        >
          {children}
        </pre>
      </div>
    </div>
  );
}

function Heading({
  as: Component,
  id,
  children,
  className,
}: {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Component id={id} className={className}>
      {children}
    </Component>
  );
}

export const mdxComponents: Components = {
  h1: ({ children, id }) => (
    <Heading
      as="h1"
      id={id}
      className="mb-6 mt-12 text-3xl font-bold tracking-tight text-foreground"
    >
      {children}
    </Heading>
  ),
  h2: ({ children, id }) => (
    <Heading
      as="h2"
      id={id}
      className="mb-4 mt-10 text-2xl font-semibold tracking-tight text-foreground"
    >
      {children}
    </Heading>
  ),
  h3: ({ children, id }) => (
    <Heading
      as="h3"
      id={id}
      className="mb-3 mt-8 text-xl font-semibold tracking-tight text-foreground"
    >
      {children}
    </Heading>
  ),
  h4: ({ children, id }) => (
    <Heading
      as="h4"
      id={id}
      className="mb-2 mt-6 text-lg font-semibold text-foreground"
    >
      {children}
    </Heading>
  ),
  p: ({ children }) => (
    <p className="mb-5 leading-7 text-foreground/90">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mb-5 list-disc space-y-2 pl-6 text-foreground/90">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 list-decimal space-y-2 pl-6 text-foreground/90">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mb-6 border-l-2 border-primary pl-5 italic text-foreground/80">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-border" />,
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt || ""}
      loading="lazy"
      className="my-8 rounded-xl border border-border shadow-sm"
    />
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm text-foreground/90">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-muted/50">{children}</thead>,
  th: ({ children }) => (
    <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-border px-4 py-3">{children}</td>
  ),
  tr: ({ children }) => <tr className="transition-colors hover:bg-muted/30">{children}</tr>,
  code: (props) => <Code {...(props as React.HTMLAttributes<HTMLElement> & { inline?: boolean })} />,
  pre: Pre,
};
