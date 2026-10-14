"use client";

import { useSyncExternalStore } from "react";

import { profile } from "@/content/site";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: profile.timeZoneId,
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

function subscribe(onChange: () => void) {
  const timer = setInterval(onChange, 15_000);
  return () => clearInterval(timer);
}

const getTime = () => formatter.format(new Date());

// The page is static, so the time only exists in the browser; the server renders the UTC offset instead.
export function LocalTime() {
  const time = useSyncExternalStore(subscribe, getTime, () => null);

  return (
    <span suppressHydrationWarning>
      {time ? (
        <>
          <time className="text-foreground tabular-nums">{time}</time> local time
        </>
      ) : (
        profile.timezone
      )}
    </span>
  );
}
