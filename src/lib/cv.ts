// The CV served at /ahmed-alhibshi-cv.pdf. Whenever public/ahmed-alhibshi-cv.pdf is replaced, bump the minor
// version (1.0 → 1.1 → 1.2 …) and set `date` to the new file's date:
// they set the download filename, a response header, and must match the PDF's embedded metadata.
// Kept dependency-free so next.config.ts can import it.
export const cv = {
  path: "/ahmed-alhibshi-cv.pdf",
  version: "1.0",
  date: "2026-10-14",
} as const;

export const cvFileName = `${cv.date} - Ahmed Alhibshi - CV - Full-Stack Software Engineer.pdf`;
