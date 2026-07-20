import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ContentItem = { slug: string; title: string; description: string; date: string; content: string; tags?: string[] };
const root = path.join(process.cwd(), "content");
export function getCollection(collection: "blog" | "projects" | "notes"): ContentItem[] { const dir = path.join(root, collection); return fs.readdirSync(dir).filter((file) => file.endsWith(".mdx")).map((file) => { const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8")); const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date); return { slug: file.replace(/\.mdx$/, ""), title: data.title, description: data.description, date, tags: data.tags, content } }).sort((a,b) => b.date.localeCompare(a.date)); }
export function getItem(collection: "blog" | "projects" | "notes", slug: string) { return getCollection(collection).find((item) => item.slug === slug); }
