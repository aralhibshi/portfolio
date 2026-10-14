import { DatabaseIcon, LightningIcon, QueueIcon } from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import {
  siBitbucket,
  siGithubactions,
  siJest,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siServerless,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

import type { CoreStackIcon } from "@/content/site";
import { cn } from "@/lib/utils";

// simple-icons doesn't ship AWS marks (trademark policy), so those fall back to Phosphor glyphs.
const icons: Record<CoreStackIcon, SimpleIcon | Icon> = {
  typescript: siTypescript,
  react: siReact,
  reactnative: siReact, // React Native's official mark is the React logo
  nextjs: siNextdotjs,
  nodejs: siNodedotjs,
  lambda: LightningIcon,
  dynamodb: DatabaseIcon,
  sqs: QueueIcon,
  serverless: siServerless,
  bitbucket: siBitbucket,
  githubactions: siGithubactions,
  jest: siJest,
};

export function TechIcon({ icon, className }: { icon: CoreStackIcon; className?: string }) {
  const source = icons[icon];

  if ("path" in source) {
    return (
      <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className={cn("size-6", className)}>
        <path d={source.path} />
      </svg>
    );
  }

  const Glyph = source;
  return <Glyph aria-hidden weight="bold" className={cn("size-6", className)} />;
}
