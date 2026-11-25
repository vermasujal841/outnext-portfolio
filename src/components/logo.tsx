import Image from "next/image";
import Link from "next/link";
import { company, logo } from "@/content/site";
import { Pending } from "./pending";

/**
 * Logo from `logo.src` in content/site.ts (public/brand/outnext-logo.svg).
 * If `logo.src` is cleared, the brand name is shown as a plain text wordmark.
 */
export function Logo({ onClick, showPending = false }: { onClick?: () => void; showPending?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <Link
        href="/"
        onClick={onClick}
        className="inline-flex items-center rounded-sm text-ink"
        aria-label={`${company.name} home`}
      >
        {logo.src ? (
          <Image src={logo.src} alt={company.name} width={logo.width} height={logo.height} loading="eager" />
        ) : (
          <span className="text-[1.3rem] font-semibold tracking-[-0.045em]">{company.name}</span>
        )}
      </Link>
      {!logo.src && showPending ? <span className="hidden xl:block">
          <Pending label="logo" />
        </span> : null}
    </span>
  );
}
