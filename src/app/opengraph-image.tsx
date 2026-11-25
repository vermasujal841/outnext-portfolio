import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { company } from "@/content/site";
import { hero } from "@/content/company";

export const alt = `${company.name}: ${hero.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const svg = await readFile(join(process.cwd(), "public/brand/outnext-logo.svg"));
  const logoSrc = `data:image/svg+xml;base64,${svg.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#070a10",
          backgroundImage:
            "linear-gradient(to right, rgba(26,36,56,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,36,56,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "#e8edf5",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
        <img src={logoSrc} alt={company.name} width={228} height={44} />
        <div style={{ display: "flex", fontSize: 76, fontWeight: 600, lineHeight: 1.02, letterSpacing: -3, maxWidth: 980 }}>
          {hero.headline}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#8f9bb1" }}>
          Web platforms, mobile apps, SaaS, AI and automation
        </div>
      </div>
    ),
    size,
  );
}
