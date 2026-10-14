import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * For lookups the code guarantees (fixed lists indexed in range): narrows away `undefined`, and fails loudly
 * with a clear message instead of rendering broken output if that guarantee is ever broken.
 */
export function defined<T>(value: T | undefined, what: string): T {
  if (value === undefined) throw new Error(`Expected ${what} to exist`);
  return value;
}
