import { BabyIcon, ClipboardTextIcon, FlowArrowIcon, MoonStarsIcon, ScalesIcon } from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";

import { CountUp } from "@/components/shared/count-up";
import { GridBackdrop } from "@/components/shared/grid-backdrop";
import { HighlightList } from "@/components/sections/work/highlight-list";
import { KeyDecisions } from "@/components/sections/work/key-decisions";
import { PipelineDiagram } from "@/components/sections/work/pipeline-diagram";
import { ProjectionChart } from "@/components/sections/work/projection-chart";
import { RamadanFlagTimeline } from "@/components/sections/work/ramadan-flag-timeline";
import { Reveal } from "@/components/shared/reveal";
import { MealSizing } from "@/components/sections/work/meal-sizing";
import { StoryRecap } from "@/components/sections/work/story-recap";
import { Section } from "@/components/shared/section";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { flagship, projects, sectionCopy, teamProjects, workCopy } from "@/content/site";
import type { Project, ProjectIcon } from "@/content/types";
import { cn } from "@/lib/utils";

const projectIcons: Record<ProjectIcon, Icon> = {
  kids: BabyIcon,
  weight: ScalesIcon,
  pipeline: FlowArrowIcon,
  onboarding: MoonStarsIcon,
  planner: ClipboardTextIcon,
};

function ProjectGlyph({ icon, className }: { icon: ProjectIcon; className?: string }) {
  const Glyph = projectIcons[icon];
  return (
    <span
      aria-hidden
      className={cn(
        "border-brand/30 bg-brand/10 text-brand grid size-10 shrink-0 place-items-center border transition-transform duration-300 group-hover/spot:-rotate-6",
        className
      )}
    >
      <Glyph weight="duotone" className="size-5" />
    </span>
  );
}

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
      {items.map((item) => (
        <li key={item}>
          <Badge variant="outline" className="font-mono font-normal">
            {item}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

function ProjectVisual({ visual }: { visual: NonNullable<Project["visual"]> }) {
  switch (visual) {
    case "migration-pipeline":
      return (
        <div className="mx-auto max-w-2xl">
          <PipelineDiagram />
        </div>
      );
    case "weight-projection":
      return (
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="w-full min-w-0 flex-1">
            <ProjectionChart />
          </div>
          <StoryRecap />
        </div>
      );
    case "ramadan-flag":
      return <RamadanFlagTimeline />;
  }
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <SpotlightCard className="h-full">
      <article className="flex h-full flex-col p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-muted-foreground font-mono text-xs">{project.kicker}</p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight">{project.name}</h3>
          </div>
          <ProjectGlyph icon={project.icon} />
        </div>
        <p className="text-muted-foreground mt-3 text-pretty">{project.summary}</p>
        {project.metric && (
          <p className="border-brand mt-5 flex items-baseline gap-3 border-l-2 pl-3">
            <span className="font-mono text-3xl font-medium tracking-tight">
              <CountUp value={project.metric.value} />
            </span>
            <span className="text-muted-foreground font-mono text-xs">{project.metric.label}</span>
          </p>
        )}
        {project.visual && (
          <div className="bg-muted/30 mt-5 border p-4">
            <ProjectVisual visual={project.visual} />
          </div>
        )}
        <HighlightList items={project.highlights} className="mt-5 text-sm" />
        {project.decisions && <KeyDecisions items={project.decisions} className="mt-5" />}
        <div className="mt-auto pt-6">
          <Stack items={project.stack} />
        </div>
      </article>
    </SpotlightCard>
  );
}

function ProjectGrid({ items, className }: { items: Project[]; className?: string }) {
  return (
    // Revealed as one unit: fading cells individually would expose the gap-px border fill.
    <Reveal className={cn("bg-border grid gap-px border md:grid-cols-2", className)}>
      {items.map((project, i) => {
        // An odd one out stretches across both columns instead of leaving an empty cell.
        const spansRow = i === items.length - 1 && items.length % 2 === 1;
        return (
          <div key={project.name} className={cn("h-full", spansRow && "md:col-span-2")}>
            <ProjectCard project={project} />
          </div>
        );
      })}
    </Reveal>
  );
}

export function Work() {
  return (
    <Section id="work" {...sectionCopy.work}>
      <Reveal>
        <SpotlightCard className="border">
          <article className="grid md:grid-cols-[1.4fr_1fr]">
            <div className="p-6 md:p-10">
              <div className="flex items-center gap-4">
                <ProjectGlyph icon={flagship.icon} className="size-12" />
                <p className="text-brand font-mono text-xs">{flagship.kicker}</p>
              </div>
              <h3 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">{flagship.name}</h3>
              <p className="text-muted-foreground mt-4 max-w-xl text-lg text-pretty">{flagship.summary}</p>
              <HighlightList items={flagship.highlights} className="mt-6 space-y-2" />
              {flagship.decisions && <KeyDecisions items={flagship.decisions} className="mt-6" />}
              <div className="mt-8">
                <Stack items={flagship.stack} />
              </div>
            </div>
            {flagship.metric && (
              <div className="bg-muted/50 relative flex flex-col justify-between gap-10 overflow-hidden border-t p-6 md:border-t-0 md:border-l md:p-10">
                <GridBackdrop className="[mask-image:linear-gradient(to_top,transparent,black)] opacity-60" />
                <MealSizing className="relative" />
                <div>
                  <p className="relative font-mono text-6xl font-medium tracking-tighter md:text-7xl">
                    {flagship.metric.value}
                  </p>
                  <p className="text-muted-foreground relative mt-3 font-mono text-sm">{flagship.metric.label}</p>
                </div>
              </div>
            )}
          </article>
        </SpotlightCard>
      </Reveal>

      <ProjectGrid items={projects} className="border-t-0" />

      <Reveal className="mt-20 mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="text-xl font-semibold tracking-tight">{workCopy.teamHeading}</h3>
        <p className="text-muted-foreground font-mono text-xs">{workCopy.teamNote}</p>
      </Reveal>
      <ProjectGrid items={teamProjects} />
    </Section>
  );
}
