import { cn } from "@/lib/utils";

// The reasoning behind a build, kept visually secondary to the highlights.
export function KeyDecisions({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <div className={cn("border-brand/40 border-l-2 pl-4", className)}>
      <p className="text-muted-foreground font-mono text-[11px] tracking-wider uppercase">Key decisions</p>
      <ul className="mt-2 space-y-1.5 text-sm text-pretty">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
