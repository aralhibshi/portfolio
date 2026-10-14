"use client";

import { useEffect } from "react";
import {
  ArrowRightIcon,
  CopyIcon,
  DownloadSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  MoonIcon,
  SunIcon,
} from "@phosphor-icons/react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { navItems, profile } from "@/content/site";
import { cvFileName } from "@/lib/cv";
import { useThemeToggle } from "@/hooks/use-theme-toggle";

// Same dated filename as the page's download links.
function downloadCv() {
  const link = document.createElement("a");
  link.href = profile.cv;
  link.download = cvFileName;
  link.click();
}

type CommandMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const { toggleTheme } = useThemeToggle();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  const run = (action: () => void) => {
    onOpenChange(false);
    action();
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Command menu"
      description="Jump to a section or run an action"
    >
      <Command>
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Navigate">
            {navItems.map((item) => (
              <CommandItem
                key={item.id}
                value={`go ${item.label}`}
                onSelect={() => run(() => document.getElementById(item.id)?.scrollIntoView())}
              >
                <ArrowRightIcon />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem value="copy email" onSelect={() => run(() => navigator.clipboard.writeText(profile.email))}>
              <CopyIcon />
              Copy email address
            </CommandItem>
            <CommandItem value="download cv resume" onSelect={() => run(downloadCv)}>
              <DownloadSimpleIcon />
              Download CV
            </CommandItem>
            <CommandItem value="toggle theme dark light" onSelect={() => run(toggleTheme)}>
              <SunIcon className="hidden dark:block" />
              <MoonIcon className="dark:hidden" />
              Toggle theme
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Elsewhere">
            <CommandItem value="linkedin" onSelect={() => run(() => window.open(profile.links.linkedin, "_blank"))}>
              <LinkedinLogoIcon />
              LinkedIn
            </CommandItem>
            <CommandItem value="github" onSelect={() => run(() => window.open(profile.links.github, "_blank"))}>
              <GithubLogoIcon />
              GitHub
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
