// Date maths for the career ladder. Dates are "YYYY-MM" strings; stage end months are exclusive.

/** "YYYY-MM" → months since year 0, so a stage's length is a simple subtraction. */
export const toMonths = (yyyyMm: string) => Number(yyyyMm.slice(0, 4)) * 12 + (Number(yyyyMm.slice(5, 7)) - 1);

/** 23 → "1 yr 11 mo", 12 → "1 yr", 3 → "3 mo". */
export function formatDuration(months: number) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y} yr`, m && `${m} mo`].filter(Boolean).join(" ");
}
