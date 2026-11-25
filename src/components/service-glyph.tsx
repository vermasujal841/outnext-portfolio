import type { GlyphKind } from "@/content/services";

/** Small line drawings for each service category, in the same line language as the hero diagram. */
export function ServiceGlyph({ kind, className = "" }: { kind: GlyphKind; className?: string }) {
  const line = "var(--color-line-strong)";
  const sig = "var(--color-signal)";
  const fill = "var(--color-surface)";

  const content: Record<GlyphKind, React.ReactNode> = {
    web: (
      <>
        <rect x="8" y="10" width="104" height="70" rx="6" fill={fill} stroke={line} />
        <path d="M8 22h104" stroke={line} />
        <circle cx="16" cy="16" r="1.8" fill={line} />
        <circle cx="22" cy="16" r="1.8" fill={line} />
        <circle cx="28" cy="16" r="1.8" fill={line} />
        <rect x="18" y="32" width="46" height="6" rx="2" fill={line} />
        <rect x="18" y="43" width="32" height="4" rx="2" fill={line} opacity=".6" />
        <rect x="18" y="56" width="24" height="9" rx="3" fill="none" stroke={sig} />
        <rect x="72" y="32" width="30" height="36" rx="4" fill="none" stroke={line} />
      </>
    ),
    mobile: (
      <>
        <rect x="40" y="4" width="40" height="80" rx="8" fill={fill} stroke={line} />
        <path d="M54 10h12" stroke={line} strokeLinecap="round" />
        {[22, 36, 50].map((y, i) => (
          <g key={y}>
            <rect x="47" y={y} width="9" height="9" rx="2" fill="none" stroke={i === 0 ? sig : line} />
            <rect x="60" y={y + 1} width="14" height="3" rx="1.5" fill={line} />
            <rect x="60" y={y + 6} width="9" height="2" rx="1" fill={line} opacity=".6" />
          </g>
        ))}
        <rect x="47" y="66" width="26" height="8" rx="3" fill="none" stroke={line} />
      </>
    ),
    saas: (
      <>
        <rect x="6" y="10" width="108" height="70" rx="6" fill={fill} stroke={line} />
        <path d="M30 10v70" stroke={line} />
        {[20, 28, 36].map((y) => (
          <rect key={y} x="12" y={y} width="12" height="3" rx="1.5" fill={line} />
        ))}
        {[
          [40, 18],
          [52, 28],
          [64, 12],
          [76, 34],
          [88, 24],
        ].map(([x, h], i) => (
          <rect key={x} x={x} y={52 - h} width="7" height={h} rx="1.5" fill={i === 3 ? sig : line} opacity={i === 3 ? 0.9 : 1} />
        ))}
        <path d="M38 60h68M38 67h68M38 74h48" stroke={line} />
      </>
    ),
    ai: (
      <>
        {[20, 44, 68].flatMap((y1) =>
          [30, 58].map((y2) => <path key={`${y1}-${y2}`} d={`M20 ${y1}L60 ${y2}`} stroke={line} />),
        )}
        <path d="M60 30L100 44M60 58L100 44" stroke={sig} />
        {[
          [20, 20],
          [20, 44],
          [20, 68],
          [60, 30],
          [60, 58],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="6" fill={fill} stroke={line} />
        ))}
        <circle cx="100" cy="44" r="8" fill={fill} stroke={sig} />
        <circle cx="100" cy="44" r="2.5" fill={sig} />
      </>
    ),
    automation: (
      <>
        <rect x="4" y="34" width="26" height="20" rx="5" fill={fill} stroke={sig} />
        <path d="M30 44h14" stroke={line} />
        <path d="M58 30l14 14-14 14-14-14z" fill={fill} stroke={line} />
        <path d="M72 44h6c4 0 6-2 6-6V26h6M84 44v18h6" stroke={line} fill="none" />
        <rect x="90" y="16" width="26" height="20" rx="5" fill={fill} stroke={line} />
        <rect x="90" y="52" width="26" height="20" rx="5" fill={fill} stroke={line} />
        <path d="M11 44h12" stroke={sig} strokeLinecap="round" />
      </>
    ),
    search: (
      <>
        <circle cx="34" cy="34" r="18" fill={fill} stroke={line} />
        <path d="M47 47l12 12" stroke={line} strokeWidth="3" strokeLinecap="round" />
        {[
          [70, 18, 40, true],
          [70, 32, 32, false],
          [70, 46, 36, false],
          [70, 60, 26, false],
        ].map(([x, y, w, hi]) => (
          <g key={y as number}>
            <rect x={x as number} y={y as number} width="6" height="6" rx="1.5" fill={hi ? sig : line} />
            <rect x={(x as number) + 10} y={(y as number) + 1} width={w as number} height="4" rx="2" fill={hi ? sig : line} opacity={hi ? 0.85 : 1} />
          </g>
        ))}
      </>
    ),
  };

  return (
    <svg viewBox="0 0 120 88" fill="none" strokeWidth="1" className={className} aria-hidden="true">
      {content[kind]}
    </svg>
  );
}
