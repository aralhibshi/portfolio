import { ImageResponse } from "next/og";

import { profile } from "@/content/site";
import { brand } from "@/lib/brand";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#fbfaf7",
        color: "#1c1a17",
        backgroundImage:
          "linear-gradient(to right, #e7e4de 1px, transparent 1px), linear-gradient(to bottom, #e7e4de 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            background: "#1c1a17",
            color: "#fbfaf7",
            fontWeight: 700,
          }}
        >
          {profile.initials}
        </div>
        <span style={{ color: "#6b655d" }}>{profile.location}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{profile.name}</div>
        <div style={{ fontSize: 40, color: brand.light.hex }}>{profile.role}</div>
        <div style={{ fontSize: 28, color: "#6b655d" }}>TypeScript · React Native · Node.js · AWS Serverless</div>
      </div>
    </div>,
    size
  );
}
