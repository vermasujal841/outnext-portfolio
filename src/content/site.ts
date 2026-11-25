/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT: company facts, contact details, social links
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every value set to `PENDING` has NOT been provided yet.
 *  While NEXT_PUBLIC_SHOW_PLACEHOLDERS=true, the site shows a clearly marked
 *  "Pending" slot wherever such a value is used. Set it to false before launch
 *  to hide every unfilled slot.
 *
 *  To fill a value, replace `PENDING` with the real value (a string).
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const PENDING = null;
export type Maybe<T> = T | null;

/** Off by default. Set NEXT_PUBLIC_SHOW_PLACEHOLDERS=true locally to see unfilled slots while editing. */
export const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true";

/** Canonical origin. PENDING: set NEXT_PUBLIC_SITE_URL to Outnext's real domain. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const company = {
  /** Brand name used in copy */
  name: "Outnext",
  /** Confirmed by client (registration banner) */
  legalName: "Outnext Private Limited",
  /** Confirmed by client (registration banner) */
  cin: "U82990RJ2026PTC111605",
  /** Year of incorporation, from the CIN */
  incorporated: "2026",
  /** Confirmed by client: registered office */
  registeredOffice: {
    lines: ["C/o Jitender Singh, Nathawatpura", "Piprali, Sikar", "Rajasthan 332001, India"],
    street: "C/o Jitender Singh, Nathawatpura, Piprali",
    locality: "Sikar",
    region: "Rajasthan",
    postalCode: "332001",
    country: "IN",
    countryName: "India",
  },
  /** Brand line used in the footer and final CTA */
  tagline: "Your technology partner for what's next.",
  /** Default meta description */
  description:
    "Outnext is a software engineering company. We design, build and maintain web platforms, mobile apps, SaaS products, AI systems and business automations for startups and growing businesses.",
} as const;

export const contact: {
  email: Maybe<string>;
  phone: Maybe<string>;
  /** Digits only, with country code, e.g. "919876543210" */
  whatsapp: Maybe<string>;
  hours: Maybe<string>;
  /** Person to contact for queries and grievances (Companies (Incorporation) Rules 2014, Rule 26) */
  grievanceContact: Maybe<{ name: string; email: string }>;
  /** Show the Google Map of the registered office on the contact page */
  showMap: boolean;
} = {
  email: "support@gostuds.com",
  /** Official contact: founder Raghvendra Singh */
  phone: "+91 87428 65525",
  /** Founder's WhatsApp (Raghvendra Singh) */
  whatsapp: "918742865525",
  hours: "10:00 AM – 8:00 PM IST",
  grievanceContact: { name: "Sujal Verma", email: "sujal@gostuds.com" },
  showMap: true,
};

export type SocialLink = { label: string; href: Maybe<string> };

/** Add only the profiles that exist. Leave href as PENDING until the URL is provided. */
export const social: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/gostuds/" },
  { label: "Instagram", href: "https://www.instagram.com/gostudsofficial/" },
];

/**
 * Logo: drafted by Claude (25 Nov 2026). Files in public/brand/:
 * outnext-logo.svg (dark backgrounds), outnext-logo-dark.svg (light backgrounds),
 * outnext-mark.svg (symbol only), plus PNG exports. Favicon: src/app/icon.svg.
 */
export const logo: { src: Maybe<string>; width: number; height: number } = {
  src: "/brand/outnext-logo.svg",
  width: 145,
  height: 28,
};

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
] as const;

export function whatsappHref(message?: string): Maybe<string> {
  if (!contact.whatsapp) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${contact.whatsapp}${text}`;
}
