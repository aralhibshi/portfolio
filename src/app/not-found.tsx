import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";

import { GridBackdrop } from "@/components/shared/grid-backdrop";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex flex-1 items-center overflow-hidden">
      <GridBackdrop className="[mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-6">
        <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
          <span className="text-brand">404</span> / Not found
        </p>
        <h1 className="mt-6 max-w-2xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl">
          This route isn&apos;t in the sitemap.
        </h1>
        <pre className="text-muted-foreground mt-8 font-mono text-sm">
          <span className="text-brand">$</span> curl -I this-page{"\n"}HTTP/2 404 · it never shipped
        </pre>
        <Button size="lg" className="mt-10" asChild>
          <Link href="/">
            <ArrowLeftIcon />
            Back to the portfolio
          </Link>
        </Button>
      </div>
    </main>
  );
}
