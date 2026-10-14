import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";

import { GridBackdrop } from "@/components/shared/grid-backdrop";
import { profile } from "@/content/site";
import { cn } from "@/lib/utils";

// Resolved at build time: the page is static, so this runs once per deploy, not per visit.
const hasPhoto = existsSync(path.join(process.cwd(), "public", profile.photo));

function Corner({ className }: { className: string }) {
  return <span aria-hidden className={cn("border-brand absolute size-4", className)} />;
}

export function Portrait({ className }: { className?: string }) {
  return (
    <figure className={cn("group relative", className)}>
      <div className="bg-muted relative aspect-[4/5] overflow-hidden border">
        {hasPhoto ? (
          <Image
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            fill
            sizes="(min-width: 768px) 360px, 100vw"
            className="object-cover grayscale-[35%] transition-[filter,scale] duration-700 ease-out group-hover:scale-[1.02] group-hover:grayscale-0"
            priority={false}
          />
        ) : (
          <>
            <GridBackdrop className="[mask-image:radial-gradient(circle_at_50%_40%,black,transparent_75%)]" />
            <span className="text-muted-foreground/60 absolute inset-0 grid place-items-center font-mono text-6xl font-semibold tracking-tighter">
              {profile.initials}
            </span>
          </>
        )}
        <div
          aria-hidden
          className="from-background/70 pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent"
        />
      </div>
      {/* Viewfinder corners, offset outside the frame */}
      <Corner className="-top-2 -left-2 border-t border-l" />
      <Corner className="-top-2 -right-2 border-t border-r" />
      <Corner className="-bottom-2 -left-2 border-b border-l" />
      <Corner className="-right-2 -bottom-2 border-r border-b" />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-4 font-mono text-[11px]">
        <span>{profile.name}</span>
        <span className="text-muted-foreground">{profile.location}</span>
      </figcaption>
    </figure>
  );
}
