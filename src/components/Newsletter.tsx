import { useState } from "react";
import { Mail, ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Newsletter({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  };

  return (
    <div className={cn("rounded-2xl border border-border bg-card p-8", className)}>
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Mail className="h-5 w-5 text-foreground" />
        </div>
        <h3 className="text-2xl font-semibold tracking-tight text-card-foreground">
          Subscribe to the newsletter
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Get the latest posts and resources delivered straight to your inbox. No spam, ever.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            className="h-11 flex-1"
            aria-label="Email address"
          />
          <Button type="submit" className="h-11 gap-2">
            Subscribe
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        {status === "success" && (
          <p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-green-500">
            <Check className="h-4 w-4" />
            Thanks for subscribing!
          </p>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm text-destructive">Please enter a valid email address.</p>
        )}
      </div>
    </div>
  );
}
