import type { NextConfig } from "next";

import { cv, cvFileName } from "./src/lib/cv";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Opening the CV in a tab and saving it, or linking to it directly, still gives a dated filename.
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
