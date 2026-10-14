import {
  ArrowUpRightIcon,
  DownloadSimpleIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";

import { profile } from "@/content/site";
import { cvFileName } from "@/lib/cv";
import { cn } from "@/lib/utils";

// A channel either opens in a new tab or downloads a file, never both.
type Channel = { label: string; href: string; icon: Icon; handle: string } & (
  { kind: "external" } | { kind: "download"; filename: string }
);

const channels: Channel[] = [
  {
    kind: "external",
    label: "LinkedIn",
    href: profile.links.linkedin,
    icon: LinkedinLogoIcon,
    handle: "in/aralhibshi",
  },
  { kind: "external", label: "GitHub", href: profile.links.github, icon: GithubLogoIcon, handle: "@aralhibshi" },
  { kind: "download", label: "CV", href: profile.cv, icon: DownloadSimpleIcon, handle: "PDF", filename: cvFileName },
];

const linkBehaviour = (channel: Channel) =>
  channel.kind === "download" ? { download: channel.filename } : { target: "_blank", rel: "noopener noreferrer" };

// Shared by the Contact section and the hero's contact dialog so the two never drift apart.
export function ContactChannels({ stacked = false, className }: { stacked?: boolean; className?: string }) {
  return (
    <ul className={cn("bg-border grid gap-px border", !stacked && "sm:grid-cols-3", className)}>
      {channels.map((channel) => (
        <li key={channel.label}>
          <a
            href={channel.href}
            {...linkBehaviour(channel)}
            className={cn(
              "group bg-background hover:bg-muted flex items-center justify-between gap-4 transition-colors",
              stacked ? "px-4 py-3" : "p-5"
            )}
          >
            <span className="flex items-center gap-3">
              <channel.icon className="size-5" />
              <span>
                <span className="block font-medium">{channel.label}</span>
                <span className="text-muted-foreground block font-mono text-xs">{channel.handle}</span>
              </span>
            </span>
            <ArrowUpRightIcon className="text-muted-foreground group-hover:text-foreground size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function MailAppLink({ className }: { className?: string }) {
  return (
    <a
      href={`mailto:${profile.email}`}
      className={cn(
        "text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 font-mono text-xs underline-offset-4 transition-colors hover:underline",
        className
      )}
    >
      <EnvelopeSimpleIcon className="size-3.5" />
      or open in your mail app
    </a>
  );
}
