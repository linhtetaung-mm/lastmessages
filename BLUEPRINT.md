# Website Blueprint — `last messages`

## Purpose

`last messages` is a minimal, dark-mode personal website for a developer/creator. It is a durable home for writing, project documentation, quick notes, selected media, and small interactive experiments.

The site should feel polished, quiet, and timeless. Its job is to make the content easy to discover and pleasant to read—not to compete with it.

## Product principles

1. **Content first.** Typography, spacing, and legibility are more important than visual decoration.
2. **Small and fast.** Keep dependencies and client-side JavaScript to a minimum.
3. **Static by default.** Content is local MDX and should be generated at build time whenever possible.
4. **Dark only.** Do not add a light theme or a theme switcher unless explicitly requested.
5. **Calm interaction.** Use small hover states and subtle transitions; avoid heavy animation, gradients, visual noise, and intrusive UI.
6. **No product infrastructure.** Do not add authentication, accounts, a database, analytics, a CMS, cookies, or a backend without explicit approval.

## Required visual language

- The whole site background must always be `rgb(11, 33, 66)` (`#0b2142`).
- Main text is a cool off-white; secondary text is muted blue-gray.
- Accent color is soft mint (`#91d7c7`), used sparingly for links, status, and small labels.
- Borders are faint and cool-toned. Cards should have rounded corners and very soft contrast.
- Layout is centered with a maximum reading width. Preserve ample whitespace.
- Use the existing global styles in `app/globals.css` as the design source of truth.

## Technology

| Area | Choice |
| --- | --- |
| Framework | Next.js 15, App Router |
| Language | TypeScript with strict checking |
| Styling | Tailwind CSS v4 plus a small global stylesheet |
| Content | Local `.mdx` files with YAML frontmatter |
| MDX rendering | `next-mdx-remote/rsc` |
| Frontmatter parsing | `gray-matter` |
| Rendering model | React Server Components by default |

## Repository map

```text
app/                         Routes, metadata routes, and global styling
  [collection]/              Dynamic routes for blog, projects, and notes
  login/                     Client-side access-terminal puzzle
  media/                     Curated media page
  puzzles/                   Puzzle directory
  globals.css                Palette, prose styling, and minimal motion
  layout.tsx                 Shared navigation, footer, and metadata
  page.tsx                   Home page
  sitemap.ts                 Sitemap endpoint
  robots.ts                  Robots endpoint
components/                  Reusable presentational components
  content-card.tsx           Listing card for an MDX item
  mdx-content.tsx            Server-side MDX compiler/renderer
  navigation.tsx             Persistent site navigation
  page-heading.tsx           Shared section heading pattern
content/                     Build-time MDX source files
  blog/
  projects/
  notes/
lib/
  content.ts                 File discovery, frontmatter parsing, sorting
public/                      Static assets (add future assets here)
```

## Routes and intended behavior

| Route | Purpose | Implementation notes |
| --- | --- | --- |
| `/` | Landing page | Intro, section links, and the two latest blog posts. |
| `/blog` | Writing index | Lists all `content/blog/*.mdx` entries, newest first. |
| `/blog/[slug]` | Article page | Generated from a blog MDX file. |
| `/projects` | Project index | Lists all `content/projects/*.mdx` entries. |
| `/projects/[slug]` | Project page | Generated from a project MDX file. |
| `/notes` | Short-note index | Lists all `content/notes/*.mdx` entries. |
| `/notes/[slug]` | Note page | Generated from a note MDX file. |
| `/media` | Curated watch/listen shelf | Currently uses simple external YouTube search links. Keep embeds optional and lightweight. |
| `/puzzles` | Puzzle index | Add future puzzle cards here. |
| `/login` | Access-terminal puzzle | A playful four-digit code puzzle; never represent this as real authentication. |
| `/sitemap.xml` | Search crawler sitemap | Update the production URL before deployment. |
| `/robots.txt` | Crawler directives | Update the production URL before deployment. |

## MDX content contract

The content loader (`lib/content.ts`) reads every `.mdx` file in a collection directory and exposes these fields:

```ts
type ContentItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
  tags?: string[];
};
```

Each MDX file should start with frontmatter:

```mdx
---
title: Clear, human title
description: One concise sentence used in index cards and the page header.
date: 2026-07-20
tags: [optional, relevant-tags]
---

Start writing here.
```

### Content rules

- Filenames become URLs: `content/blog/my-post.mdx` becomes `/blog/my-post`.
- Dates are normalized to `YYYY-MM-DD` and sorted newest first.
- Keep titles and descriptions present; they are required by the current UI.
- Prefer semantic MDX: headings, paragraphs, lists, links, inline code, and small code samples.
- If introducing custom MDX components, register and document them in `components/mdx-content.tsx`; keep them server-compatible unless interactivity is genuinely needed.

## Key implementation details

### Content rendering

`lib/content.ts` uses Node’s filesystem APIs, so it is server-only by design. It parses frontmatter with `gray-matter`, normalizes YAML date objects to strings, and sorts entries.

`app/[collection]/page.tsx` is the shared listing route for `blog`, `projects`, and `notes`. `app/[collection]/[slug]/page.tsx` is the corresponding article route. Both use static parameter generation so known content is built ahead of time.

### Client boundary

Almost everything should remain a Server Component. `app/login/page.tsx` is a Client Component because it manages input, attempt history, and a failure animation.

Use a Client Component only for browser APIs, event handlers, local state, or actual interactive puzzles. Keep client components narrow; pass them data from server components where practical.

### Access Terminal puzzle

- The code is a local constant named `PASSCODE` in `app/login/page.tsx`.
- It accepts exactly four numerical characters.
- Attempts exist only in React state, so they disappear when the page reloads.
- Success changes the terminal to an “Access Granted” state.
- Failure records feedback and briefly shakes the terminal.
- This is intentionally not authentication. Do not add sessions, cookies, user records, security claims, or server-side verification without a new product decision.

## Making common changes

### Add a post, project, or note

Create an MDX file in the appropriate `content/` subdirectory following the content contract. No routing changes are required.

### Add a navigation section

1. Create the route under `app/`.
2. Add it to `components/navigation.tsx`.
3. Add a concise home-page link in `app/page.tsx` if it should be a core section.
4. Add it to `app/sitemap.ts`.
5. Retain the same heading, spacing, and link styles.

### Add a puzzle

1. Create a route under `app/puzzles/` (for example, `app/puzzles/word-grid/page.tsx`).
2. Use a Client Component only for interactive state.
3. Add a card to `app/puzzles/page.tsx`.
4. Keep logic self-contained and avoid persistence unless the request explicitly needs it.
5. Add the route to the sitemap if it is public and permanent.

### Change branding or deployment URL

Replace the placeholder `https://example.com` consistently in:

- `app/layout.tsx` (`metadataBase`)
- `app/sitemap.ts`
- `app/robots.ts`

Also update the title, description, favicon, and footer copy if the personal brand changes.

## Guardrails for future agents

- Preserve the fixed background color requirement.
- Do not replace local MDX with a CMS unless directly asked.
- Do not add an authentication package to make `/login` “real.” It is a game-like access puzzle.
- Avoid UI component libraries unless there is a strong, explicit reason; the project’s small components are intentional.
- Avoid large images, auto-playing video, analytics scripts, large icon packs, and font downloads by default.
- Do not convert server-rendered content pages to client components merely for convenience.
- Keep path aliases (`@/*`) working when moving files.
- Before handing off changes, run `npm run build`. This verifies TypeScript, static generation, and route compilation.

## Current verification status

The project has been successfully production-built with `npm run build`. The build statically generates all content pages, sitemap, robots endpoint, and the 404 page.

## Suggested future improvements

These are safe directions if requested, provided they preserve the principles above:

- Add tags and tag-filter pages for MDX collections.
- Add readable estimated-time and previous/next links to long-form posts.
- Add lightweight syntax highlighting for code-heavy writing.
- Replace the media search links with real, owner-provided playlist URLs.
- Add additional self-contained puzzles.
- Add a small `public/` social preview image and reference it in Open Graph metadata.
- Add an RSS feed generated from blog MDX.
