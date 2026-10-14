"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CaretDownIcon } from "@phosphor-icons/react";

import { careerStages } from "@/content/site";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
// Most recent first, the way a CV reads.
const roles = [...careerStages].reverse();

// Compact, expandable role list: one line per role, highlights on demand. The current role starts open.
export function RoleList() {
  const [open, setOpen] = useState<string | null>(roles[0]?.title ?? null);
  const reduceMotion = useReducedMotion();

  return (
    <ol className="divide-y border-y">
      {roles.map((role, i) => {
        const isOpen = open === role.title;
        const panelId = `role-${i}`;
        return (
          <li key={role.title}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : role.title)}
              className="group focus-visible:ring-ring/50 grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-x-4 gap-y-1 py-4 text-left outline-none focus-visible:ring-2 sm:grid-cols-[auto_1fr_auto_auto]"
            >
              <span
                aria-hidden
                className={cn("size-2 translate-y-[-1px] transition-colors", isOpen ? "bg-brand" : "bg-brand/30")}
              />
              <span className="min-w-0">
                <span className="group-hover:text-brand font-semibold transition-colors">{role.title}</span>
                <span className="text-muted-foreground ml-2 font-mono text-xs">{role.org}</span>
              </span>
              <span className="text-muted-foreground col-start-2 font-mono text-xs sm:col-start-auto">
                {role.period}
              </span>
              <CaretDownIcon
                aria-hidden
                className={cn(
                  "text-muted-foreground row-start-1 size-4 transition-transform duration-300 sm:row-start-auto",
                  "col-start-3 sm:col-start-auto",
                  isOpen && "rotate-180"
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-2 pb-5 pl-6">
                    {role.points.map((point, j) => (
                      <motion.li
                        key={point}
                        className="text-muted-foreground flex gap-3 text-pretty"
                        initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.08 + j * 0.05, ease: EASE }}
                      >
                        <span aria-hidden className="text-brand font-mono">
                          →
                        </span>
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}
