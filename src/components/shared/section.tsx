import { Reveal } from "@/components/shared/reveal";
import { SectionLabel, type SectionId } from "@/components/shared/section-label";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: SectionId;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, label, title, intro, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("border-b", className)}>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <Reveal className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[12rem_1fr]">
          <SectionLabel id={id} label={label} />
          <div className="max-w-3xl">
            <h2 id={`${id}-title`} className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              {title}
            </h2>
            {intro && <p className="text-muted-foreground mt-4 text-lg text-pretty">{intro}</p>}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
