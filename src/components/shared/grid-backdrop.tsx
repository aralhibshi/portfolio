import { cn } from "@/lib/utils";

// Decorative engineering-paper grid. Pass a mask-image utility to fade it where needed.
export function GridBackdrop({ className }: { className?: string }) {
  return <div aria-hidden className={cn("bg-grid pointer-events-none absolute inset-0 opacity-70", className)} />;
}
