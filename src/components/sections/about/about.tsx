import { Portrait } from "@/components/sections/about/portrait";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { principles, sectionCopy } from "@/content/site";

export function About() {
  return (
    <Section id="about" {...sectionCopy.about}>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-12">
        <Reveal className="mx-auto w-full max-w-[18rem] md:max-w-none">
          <Portrait />
        </Reveal>

        <Reveal delay={0.05} className="bg-border grid gap-px self-start border sm:grid-cols-2">
          {principles.map((principle, i) => (
            <SpotlightCard key={principle.title} className="h-full p-6 md:p-8">
              <p className="text-brand font-mono text-xs">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{principle.title}</h3>
              <p className="text-muted-foreground mt-3 text-pretty">{principle.body}</p>
            </SpotlightCard>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
