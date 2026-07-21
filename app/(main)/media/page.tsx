import { PageHeading } from "@/components/page-heading";
const playlists = [
  {
    title: "Designing in public",
    note: "Conversations about craft, tools, and making a life around the work.",
    url: "https://www.youtube.com/results?search_query=designing+in+public",
  },
  {
    title: "Small systems",
    note: "Thoughtful software, calm technology, and the joy of constraints.",
    url: "https://www.youtube.com/results?search_query=small+software+systems",
  },
  {
    title: "Late night listening",
    note: "A gently evolving collection for focused, unhurried hours.",
    url: "https://www.youtube.com/results?search_query=late+night+instrumental+music",
  },
];
export default function MediaPage() {
  return (
    <div>
      <PageHeading eyebrow="Media" title="Things worth a little time.">
        A handpicked shelf of moving images and sounds. Links open on YouTube.
      </PageHeading>
      <div className="grid gap-4 md:grid-cols-2">
        {playlists.map((item) => (
          <a
            key={item.title}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-[var(--line)] bg-white/[.025] p-6 transition hover:-translate-y-0.5 hover:border-[rgba(145,215,199,.5)]"
          >
            <span className="text-[var(--accent)]">▶</span>
            <h2 className="mt-8 text-xl font-medium">
              {item.title}{" "}
              <span className="text-sm text-[var(--muted)]">↗</span>
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              {item.note}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
