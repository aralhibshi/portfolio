"use client";

import { useEffect } from "react";

import { profile } from "@/content/site";
import { brand } from "@/lib/brand";

let greeted = false; // Strict Mode runs effects twice in development

// A hello for anyone who opens DevTools to see how the site is built.
export function ConsoleGreeting() {
  useEffect(() => {
    if (greeted) return;
    greeted = true;
    console.log(
      `%cHey there, fellow engineer 👋%c\n\nBuilt with Next.js 16, React 19, Tailwind CSS v4 and a WebGL globe.\nCode: ${profile.links.github}\nHiring? ${profile.email}`,
      `font: 600 14px/1.6 ui-monospace, monospace; color: ${brand.light.hex};`,
      "font: 12px/1.6 ui-monospace, monospace;"
    );
  }, []);

  return null;
}
