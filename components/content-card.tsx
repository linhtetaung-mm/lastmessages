import Link from "next/link";
import type { ContentItem } from "@/lib/content";
export function ContentCard({
  item,
  basePath,
}: {
  item: ContentItem;
  basePath: string;
}) {
  return (
    <article className="group border-b border-[var(--line)] py-6 first:border-t">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <Link
          href={`${basePath}/${item.slug}`}
          className="text-lg font-medium tracking-tight transition group-hover:text-[var(--accent)]"
        >
          {item.title}
        </Link>
        <time className="text-xs text-[var(--muted)]">{item.date}</time>
      </div>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
        {item.description}
      </p>
    </article>
  );
}
