# My Blog

A static blog built with [Astro](https://astro.build), automatically deployed to GitHub Pages via GitHub Actions.

## Features

- 📝 **Markdown posts** — write in `src/content/blog/`
- 🌙 **Dark mode** — follows system preference / manual toggle, remembers the choice
- 🔍 **Full-text search** — powered by [Pagefind](https://pagefind.app), index built at build time, no backend
- 🏷️ **Tags & categories** — auto-generated tag and category pages
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
category: 'Tech'
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

1. Create a GitHub repository (e.g. `blog`) and push this project to its `main` branch.
2. Edit `astro.config.mjs`:
   - Set `site` to `https://<your-username>.github.io`
   - If the repo is named `<your-username>.github.io`, no `base` is needed.
     Otherwise (e.g. repo named `blog`), uncomment and set `base: '/blog'`
3. Update the site title and description in `src/consts.ts`.
4. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
5. Push — the workflow builds and publishes automatically. Your site will be at:
   - `https://<your-username>.github.io/` (user site)
   - `https://<your-username>.github.io/<repo>/` (project site)

## Project structure

```
├── .github/workflows/deploy.yml   # GitHub Actions deploy workflow
├── src/
│   ├── content/blog/              # Markdown posts
│   ├── content.config.ts          # Content collection (frontmatter schema)
│   ├── layouts/BaseLayout.astro   # Global layout (dark-mode init)
│   ├── components/                # Header / Footer / ThemeToggle / PostCard
│   ├── pages/                     # Home, blog, tags, categories, search, about
│   ├── lib/paths.ts               # base-path helper
│   └── styles/global.css          # Global styles (light/dark variables)
└── astro.config.mjs               # site / base config
```
