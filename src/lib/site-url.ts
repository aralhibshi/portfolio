// The canonical address. Vercel redirects www to the apex domain, so the apex is the one search engines and
// link previews should see.
export const PRODUCTION_URL = "https://ahmedalhibshi.dev";

// Every Vercel build (production and previews) uses the production address, so previews never get
// indexed under their own URLs and social previews always resolve. Local builds use localhost.
// NEXT_PUBLIC_SITE_URL overrides both, e.g. for testing another domain.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL ? PRODUCTION_URL : "http://localhost:3000");
