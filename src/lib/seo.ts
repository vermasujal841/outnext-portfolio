import type { Metadata } from "next";
import { company, contact, siteUrl, social } from "@/content/site";

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path === "/" ? "" : path}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  /** Use the full title as-is instead of "Title | Outnext" */
  absoluteTitle?: boolean;
};

export function pageMetadata({ title, description, path, noindex, absoluteTitle }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: absoluteTitle ? title : `${title} | ${company.name}`,
      description,
      siteName: company.name,
      locale: "en_IN",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${company.name}: software, AI and product engineering` }],
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle ? title : `${title} | ${company.name}`,
      description,
      images: ["/opengraph-image"],
    },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

/* ── Structured data ─────────────────────────────────────────────────────── */

const orgId = `${siteUrl}/#organization`;

function postalAddress() {
  const a = company.registeredOffice;
  return {
    "@type": "PostalAddress",
    streetAddress: a.street,
    addressLocality: a.locality,
    addressRegion: a.region,
    postalCode: a.postalCode,
    addressCountry: a.country,
  };
}

export function organizationJsonLd() {
  const sameAs = social.map((s) => s.href).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: company.name,
        legalName: company.legalName,
        url: siteUrl,
        description: company.description,
        foundingDate: company.incorporated,
        address: postalAddress(),
        identifier: { "@type": "PropertyValue", propertyID: "CIN", value: company.cin },
        ...(contact.email ? { email: contact.email } : {}),
        ...(contact.phone ? { telephone: contact.phone } : {}),
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#localbusiness`,
        name: company.name,
        url: siteUrl,
        parentOrganization: { "@id": orgId },
        address: postalAddress(),
        ...(contact.phone ? { telephone: contact.phone } : {}),
        ...(contact.email ? { email: contact.email } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: company.name,
        publisher: { "@id": orgId },
        inLanguage: "en-IN",
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(input: { name: string; description: string; path: string; services: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@id": orgId },
    serviceType: input.name,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: input.name,
      itemListElement: input.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s },
      })),
    },
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
