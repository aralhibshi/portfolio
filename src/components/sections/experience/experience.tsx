import { CareerLadder } from "@/components/sections/experience/career-ladder";
import { Reveal } from "@/components/shared/reveal";
import { RoleList } from "@/components/sections/experience/role-list";
import { Section } from "@/components/shared/section";
import { education, sectionCopy } from "@/content/site";

export function Experience() {
  return (
    <Section id="experience" {...sectionCopy.experience}>
      <div className="space-y-12">
        <Reveal>
          <CareerLadder />
        </Reveal>

        <Reveal>
          <RoleList />
          <ul className="mt-6 space-y-2">
            {education.map((item) => (
              <li
                key={item.title}
                className="text-muted-foreground flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm"
              >
                <span className="font-mono text-xs tracking-wider uppercase">Education</span>
                <span className="text-foreground font-medium">{item.title}</span>
                <span className="font-mono text-xs">
                  {item.org} · {item.period}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
