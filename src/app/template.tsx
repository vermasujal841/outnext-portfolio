/**
 * Page transition: a short CSS fade that replays on every navigation
 * (templates remount per route). Pure CSS, so it doesn't wait for JavaScript
 * and is switched off for reduced-motion users in globals.css.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
