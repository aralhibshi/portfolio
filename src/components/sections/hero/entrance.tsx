import { cn } from "@/lib/utils";

type EntranceProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds, matching Reveal's API. */
  delay?: number;
};

// Above-the-fold counterpart to Reveal: the same fade-and-rise, but as a CSS animation that starts on first
// paint. Reveal waits for JavaScript, which would hold back the hero (the page's largest paint) on slow phones.
export function Entrance({ children, className, delay = 0 }: EntranceProps) {
  return (
    <div
      className={cn(
        "animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:animate-none",
        className
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
