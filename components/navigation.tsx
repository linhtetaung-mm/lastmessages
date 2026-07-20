import Link from "next/link";
const links = [
  ["Blog", "/blog"],
  ["Projects", "/projects"],
  ["Notes", "/notes"],
  ["Media", "/media"],
  ["Puzzles", "/puzzles"],
] as const;
export function Navigation() {
  return (
    <header className="shell flex flex-wrap items-center justify-between gap-5 py-7 text-sm">
      <Link href="/" className="font-semibold tracking-tight">
        last messages<span className="text-[var(--accent)]">.</span>
      </Link>
      <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[var(--muted)]">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="transition hover:text-[var(--ink)]"
          >
            {label}
          </Link>
        ))}
        {/* <Link
          href="/login"
          className="text-[var(--accent)] transition hover:text-white"
        >
          terminal ↗
        </Link> */}
      </nav>
    </header>
  );
}
