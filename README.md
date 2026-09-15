# Jennifer Builds

A quiet, minimalist personal engineering blog built with [Astro](https://astro.build) and deployed to GitHub Pages via GitHub Actions. The content is the design: typography, whitespace, and readability, with almost no visual decoration.

## Features

- 📝 **Markdown posts** — write in `src/content/blog/`
- 🔍 **Full-text search** — powered by [Pagefind](https://pagefind.app), index built at build time, no backend
- 🏷️ **Tags & categories** — auto-generated tag and category pages, kept out of the way
- 📡 **RSS & sitemap** — generated at build time
- 🚀 **Auto deploy** — push to `main` and the site rebuilds and publishes itself

## Local development

Requires **Node.js ≥ 22.12**.

```bash
npm install
npm run dev      # http://localhost:4321
```

## Writing a new post

Create a `.md` file under `src/content/blog/`:

```markdown
---
title: 'Post title'
description: 'A one-line summary'
pubDate: 2026-09-13
tags: ['TagA', 'TagB']
category: 'AI & Agents'
---

Your content here……
```

## Build & preview

```bash
npm run build    # astro build + pagefind search index
npm run preview  # preview the production build (search works here)
```

> Note: search depends on the Pagefind index, so it only works after `build` / `preview`.
> In `dev` mode the search page shows a "index not generated yet" notice — that's expected.

## Deploy to GitHub Pages

1. Push this project to its repository's `main` branch.
2. Site config lives in `astro.config.mjs` (`site`, and `base` only for project sites).
3. Update the site title and description in `src/consts.ts`.
4. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
5. Push — the workflow builds and publishes automatically.

## Project structure

```
├── .github/workflows/deploy.yml   # GitHub Actions deploy workflow
├── src/
│   ├── content/blog/              # Markdown posts
│   ├── content.config.ts          # Content collection (frontmatter schema)
│   ├── layouts/BaseLayout.astro   # Global layout
│   ├── components/                # Header / Footer / PostLine
│   ├── pages/                     # Home, blog, tags, categories, search, about, RSS
│   ├── lib/                       # paths / reading-time / slugify helpers
│   └── styles/global.css          # Global styles (monochrome variables)
└── astro.config.mjs               # site / base / Shiki config
```
