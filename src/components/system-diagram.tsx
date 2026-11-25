/**
 * Hero visual: a live-looking system diagram of the kind of product Outnext
 * builds end to end. Pure SVG + CSS (no JavaScript). Lines draw in once on
 * load, then small pulses travel along the connections. All motion is
 * disabled for reduced-motion users (see globals.css).
 */

type Node = {
  id: string;
  x: number;
  y: number;
  label: string;
  sub: string;
  core?: boolean;
};

const W = 164;
const H = 58;
const COL = [0, 190, 380];
const ROW = [20, 214, 410];

const nodes: Node[] = [
  { id: "app", x: COL[0], y: ROW[0], label: "Customer app", sub: "iOS and Android" },
  { id: "web", x: COL[1], y: ROW[0], label: "Web platform", sub: "Next.js" },
  { id: "admin", x: COL[2], y: ROW[0], label: "Admin panel", sub: "Roles and reports" },
  { id: "ai", x: COL[0], y: ROW[1], label: "AI agent", sub: "LLM with RAG" },
  { id: "api", x: COL[1], y: ROW[1] - 4, label: "API", sub: "Business logic", core: true },
  { id: "auto", x: COL[2], y: ROW[1], label: "Automations", sub: "n8n workflows" },
  { id: "db", x: COL[0], y: ROW[2], label: "Database", sub: "PostgreSQL" },
  { id: "pay", x: COL[1], y: ROW[2], label: "Payments", sub: "Razorpay, Stripe" },
  { id: "msg", x: COL[2], y: ROW[2], label: "Messaging", sub: "WhatsApp and email" },
];

const cx = (c: number) => COL[c] + W / 2;
const apiTop = ROW[1] - 4;
const apiBottom = ROW[1] - 4 + H + 8;
const midY = ROW[1] + H / 2;

/** Each edge: path + whether it carries an animated pulse */
const edges: { d: string; flow: boolean }[] = [
  { d: `M${cx(0)} ${ROW[0] + H} C${cx(0)} 150 ${cx(1) - 30} 150 ${cx(1) - 30} ${apiTop}`, flow: true },
  { d: `M${cx(1)} ${ROW[0] + H} L${cx(1)} ${apiTop}`, flow: true },
  { d: `M${cx(2)} ${ROW[0] + H} C${cx(2)} 150 ${cx(1) + 30} 150 ${cx(1) + 30} ${apiTop}`, flow: true },
  { d: `M${COL[0] + W} ${midY} L${COL[1]} ${midY}`, flow: false },
  { d: `M${COL[1] + W} ${midY} L${COL[2]} ${midY}`, flow: false },
  { d: `M${cx(1) - 30} ${apiBottom} C${cx(1) - 30} 350 ${cx(0) + 22} 350 ${cx(0) + 22} ${ROW[2]}`, flow: true },
  { d: `M${cx(1)} ${apiBottom} L${cx(1)} ${ROW[2]}`, flow: true },
  { d: `M${cx(0) - 22} ${ROW[1] + H} L${cx(0) - 22} ${ROW[2]}`, flow: true },
  { d: `M${cx(2)} ${ROW[1] + H} L${cx(2)} ${ROW[2]}`, flow: true },
];

export function SystemDiagram() {
  return (
    <figure className="relative">
      <svg
        viewBox="-4 0 552 492"
        className="ox-diagram h-auto w-full overflow-visible"
        role="img"
        aria-labelledby="ox-diagram-title"
      >
        <title id="ox-diagram-title">
          Diagram of a typical product Outnext builds: a customer app, web platform and admin panel connect to one
          API, which works with an AI agent, automations, a database, payments, and WhatsApp and email notifications.
        </title>
        <defs>
          <linearGradient id="ox-core" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#36d1ff" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#4f7bff" stopOpacity="0.06" />
          </linearGradient>
        </defs>

        {/* Connections */}
        <g fill="none" strokeWidth="1">
          {edges.map((e, i) => (
            <path
              key={`e${i}`}
              d={e.d}
              pathLength={1}
              className="ox-edge"
              stroke="var(--color-line-strong)"
              style={{ ["--d" as string]: `${0.35 + i * 0.06}s` }}
            />
          ))}
          {edges.map((e, i) =>
            e.flow ? (
              <path
                key={`f${i}`}
                d={e.d}
                pathLength={1}
                className="ox-flow"
                stroke="var(--color-signal)"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{ ["--d" as string]: `${1.3 + ((i * 0.53) % 2.4)}s` }}
              />
            ) : null,
          )}
        </g>

        {/* Nodes */}
        {nodes.map((n, i) => {
          const h = n.core ? H + 8 : H;
          return (
            <g key={n.id} className="ox-node" style={{ ["--d" as string]: `${0.05 + i * 0.05}s` }}>
              <rect x={n.x} y={n.y} width={W} height={h} rx={9} fill="var(--color-surface)" />
              <rect
                x={n.x}
                y={n.y}
                width={W}
                height={h}
                rx={9}
                fill={n.core ? "url(#ox-core)" : "none"}
                stroke={n.core ? "var(--color-signal)" : "var(--color-line-strong)"}
                strokeOpacity={n.core ? 0.75 : 1}
              />
              <circle
                cx={n.x + 16}
                cy={n.y + h / 2 - 6.5}
                r={3}
                fill={n.core ? "var(--color-signal)" : "var(--color-faint)"}
                className={`ox-dot${n.core ? " ox-blink" : ""}`}
              />
              <text
                x={n.x + 28}
                y={n.y + h / 2 - 1}
                className="ox-label fill-ink font-sans"
                fontSize={n.core ? 19 : 16}
                fontWeight={n.core ? 600 : 500}
                letterSpacing="-0.01em"
              >
                {n.label}
              </text>
              <text x={n.x + 28} y={n.y + h / 2 + 15} className="ox-sub fill-faint font-mono" fontSize={11.5}>
                {n.sub}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-5 max-w-[46ch] t-small text-faint">
        A typical system we build and run: apps, platform, API, AI, automations and data, designed by one team.
      </figcaption>
    </figure>
  );
}
