import { profile } from "@/content/site";

// Evaluated at build time (the page is static), so this is the moment the current version shipped.
const builtAt = new Date();
const shippedOn = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(builtAt);
const commitSha = process.env.VERCEL_GIT_COMMIT_SHA;

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 font-mono text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {builtAt.getFullYear()} {profile.name}
        </p>
        <p>
          Shipped <time dateTime={builtAt.toISOString()}>{shippedOn}</time>
          {" · "}
          {commitSha ? (
            <a
              href={`${profile.links.source}/commit/${commitSha}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-brand transition-colors"
            >
              {commitSha.slice(0, 7)}
            </a>
          ) : (
            "local build"
          )}
          {" · "}
          <a
            href={profile.links.source}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground underline-offset-4 transition-colors hover:underline"
          >
            View source
          </a>
        </p>
        <a href="#top" className="hover:text-foreground transition-colors">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
