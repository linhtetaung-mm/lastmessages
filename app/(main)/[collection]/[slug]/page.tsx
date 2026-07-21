import { notFound } from "next/navigation";
import Link from "next/link";
import { MdxContent } from "@/components/mdx-content";
import { getCollection, getItem } from "@/lib/content";
const valid = ["blog", "projects", "notes"] as const;
export function generateStaticParams() {
  return valid.flatMap((collection) =>
    getCollection(collection).map(({ slug }) => ({ collection, slug })),
  );
}
export default async function EntryPage({
  params,
}: {
  params: Promise<{ collection: string; slug: string }>;
}) {
  const { collection, slug } = await params;
  if (!valid.includes(collection as (typeof valid)[number])) notFound();
  const item = getItem(collection as (typeof valid)[number], slug);
  if (!item) notFound();
  return (
    <article className="mx-auto max-w-3xl">
      <Link href={`/${collection}`} className="text-sm text-[var(--accent)]">
        ← {collection}
      </Link>
      <header className="mb-10 mt-8 border-b border-[var(--line)] pb-8">
        <p className="font-mono text-xs uppercase tracking-[.18em] text-[var(--muted)]">
          {item.date}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-.045em] sm:text-6xl">
          {item.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
          {item.description}
        </p>
      </header>
      <MdxContent source={item.content} />
    </article>
  );
}
