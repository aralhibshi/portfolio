import { ConsoleGreeting } from "@/components/layout/console-greeting";
import { AmbientAurora } from "@/components/layout/ambient-aurora";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { About } from "@/components/sections/about/about";
import { Contact } from "@/components/sections/contact/contact";
import { Experience } from "@/components/sections/experience/experience";
import { Hero } from "@/components/sections/hero/hero";
import { References } from "@/components/sections/references/references";
import { Skills } from "@/components/sections/skills/skills";
import { Work } from "@/components/sections/work/work";

export default function Home() {
  return (
    <>
      <AmbientAurora />
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Work />
        <References />
        <Skills />
        <Contact />
      </main>
      <SiteFooter />
      <ConsoleGreeting />
    </>
  );
}
