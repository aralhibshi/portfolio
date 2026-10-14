const NUMBER = /\d[\d,]*/g;

/**
 * Scales every number in a label by `progress` (0–1), keeping the surrounding text and any thousands
 * separators: ("~5,000", 0.5) → "~2,500", ("6–8 services", 0.5) → "3–4 services".
 */
export function interpolateNumbers(label: string, progress: number) {
  return label.replace(NUMBER, (token) => {
    const target = Number(token.replaceAll(",", ""));
    const current = Math.round(target * progress);
    return token.includes(",") ? current.toLocaleString("en-US") : String(current);
  });
}
