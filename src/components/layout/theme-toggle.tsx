"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { useThemeToggle } from "@/hooks/use-theme-toggle";

export function ThemeToggle() {
  const { toggleTheme } = useThemeToggle();

  return (
    <Button variant="ghost" size="icon" aria-label="Toggle colour theme" onClick={toggleTheme}>
      <SunIcon className="hidden dark:block" />
      <MoonIcon className="dark:hidden" />
    </Button>
  );
}
