import type { NextConfig } from "next";

import { cv, cvFileName } from "./src/lib/cv";

const nextConfig: NextConfig = {
  // Lets other devices on your network (e.g. a phone) use the dev server. Set per machine in .env.local,
  // e.g. ALLOWED_DEV_ORIGINS=192.168.1.20, so no local address is committed. Dev server only.
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(",").map((origin) => origin.trim()) ?? [],
  async headers() {
    return [
      {
        // Opening the CV in a tab and saving it, or linking to it directly, still gives the proper filename.
        source: cv.path,
        headers: [
          {
            key: "Content-Disposition",
            value: `inline; filename="${cvFileName}"; filename*=UTF-8''${encodeURIComponent(cvFileName)}`,
          },
          { key: "X-CV-Version", value: `v${cv.version} (${cv.date})` },
        ],
      },
    ];
  },
};

export default nextConfig;
