import { ContactChannels, MailAppLink } from "@/components/shared/contact-channels";
import { CopyEmailButton } from "@/components/shared/copy-email-button";
import { GridBackdrop } from "@/components/shared/grid-backdrop";
import { Reveal } from "@/components/shared/reveal";
import { SectionLabel } from "@/components/shared/section-label";
import { contactCopy } from "@/content/site";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden">
      <GridBackdrop className="[mask-image:radial-gradient(ellipse_70%_60%_at_50%_100%,black,transparent)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-36">
        <Reveal>
          <SectionLabel id="contact" label={contactCopy.label} />
          <h2
            id="contact-title"
            className="mt-6 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl"
          >
            {contactCopy.title} <span className="text-muted-foreground">{contactCopy.titleAside}</span>
          </h2>
          <p className="text-muted-foreground mt-6 max-w-xl text-lg text-pretty">{contactCopy.intro}</p>
        </Reveal>

        <Reveal delay={0.05} className="mt-10 flex flex-col items-start gap-3">
          <CopyEmailButton />
          <MailAppLink />
        </Reveal>

        <Reveal delay={0.1}>
          <ContactChannels className="mt-16" />
        </Reveal>
      </div>
    </section>
  );
}
