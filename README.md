# last messages

A minimal, content-first personal website built with Next.js, TypeScript, Tailwind CSS, and local MDX content.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To create a production build:

```bash
npm run build
npm start
```

## Site sections

- `/` — introduction and latest writing
- `/blog` — long-form MDX articles
- `/projects` — project write-ups
- `/notes` — short MDX notes
- `/media` — curated YouTube links
- `/puzzles` — interactive experiments
- `/login` — four-digit access-terminal puzzle; it is not authentication

## Content

Add a `.mdx` file to one of these directories:

```text
content/blog/
content/projects/
content/notes/
```

Every entry needs frontmatter in this shape:

```mdx
---
title: A clear title
description: A short summary for listing pages.
date: 2026-07-20
tags: [optional, tags]
---

Your MDX content goes here.
```

The site discovers, sorts, and statically generates these entries at build time.

## Customization

- Update site metadata and the production URL in `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts`.
- Change the terminal puzzle code in `app/login/page.tsx` (`PASSCODE`).
- Adjust the global palette and typography in `app/globals.css`.

The site background is intentionally fixed at `rgb(11, 33, 66)`.
