import { QuotesIcon } from "@phosphor-icons/react/ssr";

import { MarkerHighlight } from "@/components/sections/references/marker-highlight";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { testimonials, sectionCopy } from "@/content/site";

function HighlightedQuote({ quote, highlight }: { quote: string; highlight?: string }) {
  const at = highlight ? quote.indexOf(highlight) : -1;
  if (!highlight || at === -1) return quote;
  return (
    <>
      {quote.slice(0, at)}
      <MarkerHighlight>{highlight}</MarkerHighlight>
      {quote.slice(at + highlight.length)}
    </>
  );
}

export function References() {
  return (
    <Section id="references" {...sectionCopy.references}>
      <div className="grid gap-6 lg:grid-cols-2">
        {testimonials.map((testimonial, i) => (
          <Reveal key={testimonial.name} delay={i * 0.08} className="h-full">
            <SpotlightCard className="h-full border">
              <figure className="flex h-full flex-col p-6 md:p-10">
                <QuotesIcon aria-hidden weight="fill" className="text-brand size-8" />
                <blockquote className="mt-6 flex-1">
                  <p className="text-xl leading-snug font-medium tracking-tight text-pretty md:text-2xl">
                    “<HighlightedQuote quote={testimonial.quote} highlight={testimonial.highlight} />”
                  </p>
                  {testimonial.more && <p className="text-muted-foreground mt-5 text-pretty">“{testimonial.more}”</p>}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t pt-6">
                  <span
                    aria-hidden
                    className="bg-muted grid size-10 shrink-0 place-items-center font-mono text-xs font-semibold"
                  >
                    {testimonial.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </span>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {testimonial.title} · {testimonial.relation}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
