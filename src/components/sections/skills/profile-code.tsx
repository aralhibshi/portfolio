import { Fragment } from "react";

import { markets, profile } from "@/content/site";

// Tiny hand-rolled syntax highlighting; a full highlighter would be overkill for one static snippet.
const Kw = ({ children }: { children: React.ReactNode }) => <span className="text-brand">{children}</span>;
const Str = ({ children }: { children: React.ReactNode }) => (
  <span className="text-emerald-700 dark:text-emerald-300">&quot;{children}&quot;</span>
);
const Num = ({ children }: { children: React.ReactNode }) => (
  <span className="text-amber-700 dark:text-amber-300">{children}</span>
);
const Comment = ({ children }: { children: React.ReactNode }) => (
  <span className="text-muted-foreground">{children}</span>
);

const lines: React.ReactNode[] = [
  <Comment key="c">{"// the short version"}</Comment>,
  <>
    <Kw>export const</Kw> ahmed = {"{"}
  </>,
  <>
    {"  "}role: <Str>{profile.role}</Str>,
  </>,
  <>
    {"  "}base: <Str>{profile.location}</Str>,
  </>,
  <>
    {"  "}stack: [<Str>TypeScript</Str>, <Str>React Native</Str>,
  </>,
  <>
    {"          "}
    <Str>Node.js</Str>, <Str>AWS</Str>],
  </>,
  <>
    {"  "}shipped: {"{ "}markets: <Num>{markets.length}</Num>
    {" }"},
  </>,
  <>
    {"  "}ownership: <Str>end-to-end</Str>,
  </>,
  <>
    {"  "}openTo: <Str>senior roles</Str>,
  </>,
  <>
    {"} "}
    <Kw>satisfies</Kw> Engineer;
    <span
      aria-hidden
      className="bg-brand ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse motion-reduce:animate-none"
    />
  </>,
];

export function ProfileCode() {
  return (
    <figure className="bg-card overflow-hidden border shadow-[0_8px_20px_-14px_rgb(0_0_0/0.12)]">
      <div className="bg-muted/60 flex items-center gap-2 border-b px-4 py-2.5" aria-hidden>
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="text-muted-foreground ml-2 font-mono text-[11px]">ahmed.ts</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[11.5px] leading-6 sm:text-[12.5px]">
        <code>
          {lines.map((line, i) => (
            <Fragment key={i}>
              {line}
              {i < lines.length - 1 && "\n"}
            </Fragment>
          ))}
        </code>
      </pre>
    </figure>
  );
}
