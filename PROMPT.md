Build a minimal, fast, content-first personal website using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **MDX**.

## Design

* Overall aesthetic: minimal, elegant, developer-focused.
* Background color for the entire site **must always be `rgb(11, 33, 66)`**.
* Use a restrained color palette that complements the background.
* Prefer whitespace, typography, and subtle motion over decorative elements.
* Responsive by default.
* Dark theme only.
* Keep dependencies minimal.

## Layout

Persistent navigation with routes:

* `/`
* `/blog`
* `/projects`
* `/notes`
* `/media`
* `/puzzles`
* `/login`

Navigation should be simple and unobtrusive.

## Pages

### `/`

Landing page with:

* Short introduction
* Small profile section
* Links to all sections
* Featured/latest content if available

### `/blog`

Render MDX articles from a local `content/blog` directory.

### `/projects`

Render project write-ups from `content/projects`.

### `/notes`

Render short MDX notes from `content/notes`.

### `/media`

Display curated YouTube playlists as embedded cards or links.

### `/puzzles`

Index page for interactive puzzles. Design it so additional puzzles can be added easily.

### `/login`

This is **not authentication**.

Create a terminal-inspired "Access Terminal" page implementing a 4-digit crack-code puzzle.

Use the provided passcode logic exactly (I'll replace it later). Show previous attempts and feedback, shake on failure, and display a simple "Access Granted" state on success. No backend, authentication, cookies, or user accounts.

## Architecture

Organize the project cleanly.

```
app/
components/
content/
  blog/
  projects/
  notes/
hooks/
lib/
public/
```

Separate reusable UI from page logic.

## Content

Use MDX with frontmatter for blog, projects, and notes.

Generate a few placeholder entries so the site looks complete.

## Styling

* Tailwind CSS
* Clean typography
* Rounded corners
* Soft shadows
* Minimal hover effects
* Subtle transitions only
* No heavy animations

## Code

* TypeScript everywhere.
* Prefer Server Components.
* Use Client Components only where required (login puzzle, future puzzles).
* Keep components small and reusable.
* Avoid unnecessary libraries.

## Extras

Include:

* favicon
* sitemap
* robots.txt
* Open Graph metadata
* 404 page

Do **not** add authentication, CMS, analytics, databases, or unnecessary features.

The result should feel like a polished, timeless developer portfolio with an emphasis on readability, performance, and simplicity.
