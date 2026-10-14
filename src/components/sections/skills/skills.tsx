import { ProfileCode } from "@/components/sections/skills/profile-code";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { TechIcon } from "@/components/sections/skills/tech-icon";
import { coreStack, sectionCopy } from "@/content/site";

export function Skills() {
  return (
    <Section id="skills" {...sectionCopy.skills}>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-12">
        <Reveal>
          <ProfileCode />
        </Reveal>

        <div>
          <Reveal>
            <h3 className="text-muted-foreground mb-4 font-mono text-xs tracking-wider uppercase">Daily drivers</h3>
            <ul className="bg-border grid grid-cols-2 gap-px border sm:grid-cols-3 xl:grid-cols-4">
              {coreStack.map((tech) => (
                <li
                  key={tech.name}
                  className="group bg-background hover:bg-muted/60 flex flex-col gap-3 p-4 transition-colors"
                >
                  <TechIcon
                    icon={tech.icon}
                    className="text-muted-foreground group-hover:text-brand transition-[color,scale] duration-300 group-hover:scale-110"
                  />
                  <span className="text-sm">{tech.name}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
