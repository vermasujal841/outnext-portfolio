"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

/**
 * Google Map that loads only when asked, so the third-party iframe doesn't
 * slow the page or set cookies before the visitor wants it.
 */
export function MapEmbed({ query, label }: { query: string; label: string }) {
  const [loaded, setLoaded] = useState(false);
  const q = encodeURIComponent(query);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-panel)] border border-line bg-surface">
      {loaded ? (
        <iframe
          title={`Map: ${label}`}
          src={`https://www.google.com/maps?q=${q}&output=embed`}
          className="absolute inset-0 h-full w-full border-0 [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.6)]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-start justify-end gap-4 bg-grid p-6">
          <MapPin className="text-signal" size={22} aria-hidden />
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="rounded-[var(--radius-control)] border border-line-strong bg-base px-4 py-2 t-small text-ink hover:border-signal/60"
            >
              Load Google Map
            </button>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${q}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[var(--radius-control)] px-2 py-2 t-small text-muted underline decoration-line-strong underline-offset-4 hover:text-ink"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
