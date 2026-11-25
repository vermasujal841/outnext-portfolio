import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] text-[0.9375rem] font-medium leading-none whitespace-nowrap transition-[background-color,border-color,color,transform] duration-200 ease-[var(--ease-out-quart)] active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-signal text-[#04121a] hover:bg-[#6bdeff]",
  secondary: "border border-line-strong text-ink hover:border-signal/60 hover:bg-white/[0.03]",
  ghost: "text-ink underline-offset-4 decoration-line-strong hover:text-signal hover:underline",
};

// Size classes are kept separate from variants so callers never pass conflicting h-/px- utilities.
const sizes: Record<Variant, Record<Size, string>> = {
  primary: { sm: "h-10 px-4", md: "h-11 px-5", lg: "h-12 px-6" },
  secondary: { sm: "h-10 px-4", md: "h-11 px-5", lg: "h-12 px-6" },
  ghost: { sm: "h-9 px-2", md: "h-11 px-2", lg: "h-12 px-2" },
};

export function buttonClass(variant: Variant = "primary", className = "", size: Size = "md") {
  return `${base} ${variants[variant]} ${sizes[variant][size]} ${className}`;
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant; size?: Size };

export function ButtonLink({ variant = "primary", size = "md", className = "", ...props }: ButtonLinkProps) {
  return <Link className={buttonClass(variant, className, size)} {...props} />;
}
