import { cn } from "@/lib/utils";

export function HighlightList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn("space-y-1.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-pretty">
          <span aria-hidden className="text-brand font-mono">
            →
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
