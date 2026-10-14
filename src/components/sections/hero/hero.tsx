import {
  ArrowDownIcon,
  DownloadSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  MapPinIcon,
} from "@phosphor-icons/react/ssr";

import { CountUp } from "@/components/shared/count-up";
import { GridBackdrop } from "@/components/shared/grid-backdrop";
import { LocalTime } from "@/components/sections/hero/local-time";
import { MarketsMap } from "@/components/sections/hero/markets-map";
import { Reveal } from "@/components/shared/reveal";
import { ScribbleUnderline } from "@/components/sections/hero/scribble-underline";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { Button } from "@/components/ui/button";
import { heroCopy, profile, stats } from "@/content/site";
import { cvFileName } from "@/lib/cv";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b">
      <GridBackdrop className="[mask-image:radial-gradient(ellipse_80%_70%_at_70%_0%,black,transparent)]" />
      <div
        aria-hidden
        className="bg-brand/10 pointer-events-none absolute -top-40 right-[-10%] hidden size-[640px] rounded-full blur-[120px] dark:block"
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-16 sm:px-6 md:pt-24 md:pb-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <div>
            <Reveal>
              <p className="bg-background/60 inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-xs backdrop-blur">
                <span className="relative flex size-2">
                  <span className="bg-brand absolute inline-flex size-full animate-ping rounded-full opacity-60 motion-reduce:animate-none" />
                  <span className="bg-brand relative inline-flex size-2 rounded-full" />
                </span>
                {profile.availability}
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-8 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl">
                {heroCopy.lead}{" "}
                <span className="text-brand">
                  <ScribbleUnderline>{heroCopy.emphasis}</ScribbleUnderline>
                </span>
                {heroCopy.tail}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-muted-foreground mt-8 font-mono text-sm text-balance">
                {profile.role} · TypeScript · React Native · Node.js · AWS
              </p>
              <p className="mt-4 max-w-2xl text-lg text-pretty md:text-xl">{profile.summary}</p>
              <p className="text-muted-foreground mt-4 flex items-center gap-1.5 font-mono text-xs">
                <MapPinIcon className="size-3.5" />
                {profile.location} · <LocalTime />
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                <Button size="lg" asChild>
                  <a href={profile.cv} download={cvFileName}>
                    <DownloadSimpleIcon />
                    Download CV
                  </a>
                </Button>
                <Button size="icon-lg" variant="outline" asChild>
                  <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <LinkedinLogoIcon />
                  </a>
                </Button>
                <Button size="icon-lg" variant="outline" asChild>
                  <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <GithubLogoIcon />
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="mx-auto w-full max-w-sm lg:max-w-none">
            <MarketsMap />
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <dl className="bg-border mt-14 grid grid-cols-2 gap-px border md:mt-20 md:grid-cols-4">
            {stats.map((stat) => (
              <SpotlightCard key={stat.label} className="flex flex-col-reverse justify-end gap-2 p-5 md:p-6">
                <dt className="text-muted-foreground text-sm text-pretty">{stat.label}</dt>
                <dd className="font-mono text-3xl font-medium tracking-tight md:text-4xl">
                  <CountUp value={stat.value} />
                </dd>
              </SpotlightCard>
            ))}
          </dl>
        </Reveal>

        <a
          href="#about"
          className="text-muted-foreground hover:text-foreground mt-10 hidden items-center gap-2 font-mono text-xs transition-colors md:inline-flex"
        >
          <ArrowDownIcon className="size-3.5" />
          Scroll
        </a>
      </div>
    </section>
  );
}
