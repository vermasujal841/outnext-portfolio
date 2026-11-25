/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PORTFOLIO / CASE STUDIES
 * ─────────────────────────────────────────────────────────────────────────────
 *  Outnext has closed one client so far: Dhanshree Export.
 *
 *  To add a project: put images in /public/images/work/<slug>/ (and any
 *  walkthrough video in /public/videos/work/<slug>/), add an entry below and
 *  set `ready: true` once every field is filled. Entries with `ready: false`
 *  show "Pending" markers, are excluded from the sitemap and carry `noindex`.
 *  Never add results that weren't measured.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { Maybe } from "./site";

export type ProjectMedia = { src: string; alt: string; width: number; height: number };

export type Project = {
  slug: string;
  /** false = unfinished entry (noindex, hidden when placeholders are off) */
  ready: boolean;
  featured: boolean;
  title: Maybe<string>;
  /** Client name, or an anonymised description if the client hasn't approved naming */
  client: Maybe<string>;
  industry: Maybe<string>;
  /** Matches a service category slug */
  category: Maybe<string>;
  projectType: Maybe<string>;
  year: Maybe<string>;
  url: Maybe<string>;
  summary: Maybe<string>;
  problem: Maybe<string>;
  solution: Maybe<string>;
  features: string[];
  stack: string[];
  challenges: Maybe<string>;
  /** Only measured outcomes. Leave empty if there are none. */
  results: { value: string; label: string }[];
  /** Cover image. Also used as the poster frame when there is a video. */
  cover: Maybe<string>;
  /** Optional muted walkthrough video, shown in place of the cover image */
  video: Maybe<{ mp4: string; webm: string; width: number; height: number }>;
  screenshots: ProjectMedia[];
};

/**
 * Dhanshree Export. Sources: brief from the client and a screen recording of
 * the site (25 Nov 2026). Original recording: assets-source/work/.
 * Client contact: Rajeev Tholia (internal reference only; his phone number is
 * confidential and is not stored anywhere in this project).
 */
const dhanshreeExport: Project = {
  slug: "dhanshree-export",
  ready: true,
  featured: true,
  title: "Dhanshree Export",
  client: "Dhanshree Export",
  industry: "Precious gemstones",
  category: "web-development",
  projectType: "Business website",
  year: "2026",
  url: "https://studiogemstone.com/",
  summary:
    "A cinematic website for a Jaipur manufacturer, wholesaler and exporter of precious and semi-precious gemstones, built in Next.js so that 2K and 4K imagery loads fast.",
  problem:
    "Dhanshree Export needed a website that does justice to its gemstones and presents the business to wholesale and export buyers. The site also had to load quickly, even though it depends on large, high-resolution imagery.",
  solution:
    "We designed and built the site in Next.js around full-screen, scroll-driven gemstone visuals, and reworked how its 2K and 4K frames and images are loaded from cloud storage so the experience stays fast.",
  features: [
    "Full-screen hero with scroll-driven gemstone sequences, from rough crystal to cut stone",
    "3D rotating gemstone catalogue with a card for each stone",
    "Services section covering manufacturing, cutting, polishing and bulk wholesale supply",
    "In-house services and “Why choose us” sections for buyers",
    "Enquiry form for wholesale, custom manufacturing and export orders",
    "Sticky header that switches between dark and light themes as sections change",
  ],
  stack: ["Next.js"],
  challenges:
    "The site relies on 2K and 4K frames and images served from a cloud server. The main challenge was reducing how long those large files took to load without giving up the visual quality the brand depends on.",
  results: [],
  cover: "/images/work/dhanshree-export/hero.jpg",
  video: {
    mp4: "/videos/work/dhanshree-export/walkthrough.mp4",
    webm: "/videos/work/dhanshree-export/walkthrough.webm",
    width: 1600,
    height: 730,
  },
  screenshots: [
    { src: "/images/work/dhanshree-export/hero.jpg", alt: "Dhanshree Export homepage hero with a rough emerald crystal", width: 1600, height: 730 },
    { src: "/images/work/dhanshree-export/emerald-sequence.jpg", alt: "Scroll-driven sequence showing a cut emerald, titled Formed by Nature", width: 1600, height: 730 },
    { src: "/images/work/dhanshree-export/gemstone-catalogue.jpg", alt: "3D rotating gemstone catalogue showing amazonite and chalcedony cards", width: 1600, height: 730 },
    { src: "/images/work/dhanshree-export/services.jpg", alt: "Our Services section listing gemstone manufacturing, cutting, polishing and cabochons", width: 1600, height: 730 },
  ],
};

export const projects: Project[] = [dhanshreeExport];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
