import { notFound } from "next/navigation";
import { ContentCard } from "@/components/content-card";
import { PageHeading } from "@/components/page-heading";
import { getCollection } from "@/lib/content";
const copy = { blog: ["Writing", "Notes from the workbench—on building, learning, and paying attention."], projects: ["Projects", "A growing archive of tools, experiments, and things made with care."], notes: ["Notes", "Short thoughts, references, and ideas that did not need a full essay."] } as const;
export function generateStaticParams() { return Object.keys(copy).map((collection) => ({ collection })); }
export default async function CollectionPage({ params }: { params: Promise<{ collection: string }> }) { const { collection } = await params; if (!(collection in copy)) notFound(); const key = collection as keyof typeof copy; const [eyebrow, title] = copy[key]; return <div><PageHeading eyebrow={eyebrow} title={title}>{key === "notes" ? "Collected in public so I can find them again." : "Selected work and working notes."}</PageHeading><section>{getCollection(key).map((item) => <ContentCard key={item.slug} item={item} basePath={`/${key}`} />)}</section></div>; }
