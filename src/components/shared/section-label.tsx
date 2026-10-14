import { navItems } from "@/content/site";
import { cn } from "@/lib/utils";

type SectionId = (typeof navItems)[number]["id"];

// Numbering follows the nav order, so reordering sections never leaves stale "03"s behind.
function sectionNumber(id: SectionId) {
  return String(navItems.findIndex((item) => item.id === id) + 1).padStart(2, "0");
}

export function SectionLabel({ id, label, className }: { id: SectionId; label: string; className?: string }) {
  return (
    <p className={cn("text-muted-foreground font-mono text-xs tracking-wider uppercase", className)}>
      <span className="text-brand">{sectionNumber(id)}</span> / {label}
    </p>
  );
}

export type { SectionId };
