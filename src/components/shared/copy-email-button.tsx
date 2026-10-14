"use client";

import { CheckIcon, CopyIcon } from "@phosphor-icons/react";

import { profile } from "@/content/site";
import { useCopy } from "@/hooks/use-copy";
import { cn } from "@/lib/utils";

// The email itself is the button: one click copies it, which works even without a mail app configured.
export function CopyEmailButton({ className }: { className?: string }) {
  const { copied, copy } = useCopy();

  return (
    <button
      type="button"
      onClick={() => copy(profile.email)}
      className={cn(
        "group bg-foreground text-background hover:bg-foreground/85 focus-visible:ring-ring/50 inline-flex items-center gap-3 px-5 py-3.5 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        className
      )}
    >
      <span className="truncate font-mono text-base sm:text-lg">{profile.email}</span>
      <span className="bg-background/15 inline-flex shrink-0 items-center gap-1.5 px-2 py-1 font-mono text-[11px]">
        {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </span>
    </button>
  );
}
