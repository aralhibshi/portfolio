"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CommandIcon } from "@phosphor-icons/react";

import { CommandMenu } from "@/components/layout/command-menu";
import { ContactPopover } from "@/components/layout/contact-popover";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { navItems, profile } from "@/content/site";
import { useSectionProgress } from "@/components/layout/use-section-progress";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { active, fills } = useSectionProgress();

  return (
    <header className="bg-background/80 supports-backdrop-filter:bg-background/60 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5 font-mono text-sm font-medium">
          <span className="bg-foreground text-background grid size-7 place-items-center text-xs font-semibold">
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        <nav aria-label="Sections" className="hidden h-14 items-stretch gap-1 lg:flex">
          {navItems.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "text-muted-foreground hover:text-foreground relative flex items-center px-2.5 font-mono text-xs transition-colors",
                active === item.id && "text-foreground"
              )}
            >
              {item.label}
              {/* Story-style segment on the header border: full once read, partial while reading, empty ahead. */}
              <span aria-hidden className="absolute inset-x-2.5 -bottom-px h-px overflow-hidden">
                <motion.span className="bg-brand absolute inset-0 origin-left" style={{ scaleX: fills[i] }} />
              </span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ContactPopover size="sm" align="end" />
          <Button variant="outline" size="sm" className="font-mono" onClick={() => setMenuOpen(true)}>
            <CommandIcon className="lg:hidden" />
            <span className="lg:hidden">Menu</span>
            <kbd className="text-muted-foreground hidden lg:inline">⌘K</kbd>
          </Button>
          <ThemeToggle />
        </div>
      </div>
      <ScrollProgress />
      <CommandMenu open={menuOpen} onOpenChange={setMenuOpen} />
    </header>
  );
}
