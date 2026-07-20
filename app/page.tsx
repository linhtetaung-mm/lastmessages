import Link from "next/link";
import { ContentCard } from "@/components/content-card";
import { getCollection } from "@/lib/content";
const sections = [
  ["Blog", "Longer thinking, field notes, and build logs.", "/blog"],
  ["Projects", "Experiments made to be used and examined.", "/projects"],
  ["Notes", "Small observations worth keeping.", "/notes"],
  ["Media", "A short, changing watch list.", "/media"],
  ["Puzzles", "Tiny systems to poke at.", "/puzzles"],
] as const;
export default function Home() {
  const latest = getCollection("blog").slice(0, 2);
  return (
    <div>
      <section className="max-w-3xl py-10 sm:py-16">
        <p className="mb-5 font-mono text-xs uppercase tracking-[.2em] text-[var(--accent)]">
          Hello, internet
        </p>
        <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-7xl">
          I make useful things and leave notes about the process.
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--muted)]">
          A small corner for work, curiosities, and the occasional unfinished
          idea. Built for reading slowly.
        </p>
      </section>
      <section className="grid gap-px border-y border-[var(--line)] sm:grid-cols-2">
        {sections.map(([name, description, href]) => (
          <Link key={href} href={href} className="group px-0 py-6 sm:pr-10">
            <h2 className="text-lg font-medium group-hover:text-[var(--accent)]">
              {name} <span className="text-[var(--accent)]">↗</span>
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              {description}
            </p>
          </Link>
        ))}
      </section>
      <section className="mt-20 max-w-3xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-medium tracking-tight">Latest writing</h2>
          <Link href="/blog" className="text-sm text-[var(--accent)]">
            All posts →
          </Link>
        </div>
        {latest.map((item) => (
          <ContentCard key={item.slug} item={item} basePath="/blog" />
        ))}
      </section>
    </div>
  );
}
