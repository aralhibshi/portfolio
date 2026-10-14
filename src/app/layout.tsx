import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

import { Providers } from "@/components/layout/providers";
import { profile } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const title = `${profile.name} — ${profile.role}`;
const description = `${profile.role} in Bahrain. ${profile.summary}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Software Engineer",
    "Senior Software Engineer",
    "Full-Stack Engineer",
    "React Native",
    "TypeScript",
    "Node.js",
    "AWS Serverless",
    "Bahrain",
    "GCC",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    title,
    description,
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#121317" },
  ],
};

// On a refresh only, start over from the top so entrance animations play again, as on a first visit.
// Runs before the page paints. Restoration is set to manual on every load because the browser decides
// whether to restore using the value saved for this page; shared links with a #section still jump there.
const resetOnReloadScript = `(() => {
  try {
    history.scrollRestoration = "manual";
    const nav = performance.getEntriesByType("navigation")[0];
    if (!nav || nav.type !== "reload") return;
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    const toTop = () => window.scrollTo(0, 0);
    toTop();
    window.addEventListener("load", toTop, { once: true });
  } catch {}
})();`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Hamala", addressCountry: "BH" },
  sameAs: [profile.links.linkedin, profile.links.github],
  alumniOf: [{ "@type": "Organization", name: "Calo Inc." }],
  knowsAbout: ["TypeScript", "React Native", "Node.js", "AWS Serverless", "DynamoDB", "Event-driven architecture"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn("h-full antialiased", geistSans.variable, jetbrainsMono.variable)}
    >
      <body className="flex min-h-full flex-col">
        <script dangerouslySetInnerHTML={{ __html: resetOnReloadScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          className="bg-foreground text-background sr-only z-50 px-3 py-2 font-mono text-xs focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
