---
title: 'How to Build a GitHub Pages Blog with Astro'
description: 'From zero to deployed: build a static blog with Astro and publish it to GitHub Pages with GitHub Actions.'
pubDate: 2026-09-05
tags: ['Astro', 'GitHub', 'Tutorial']
category: 'Tech'
---

This post covers the tech stack behind this blog and how it gets deployed.

## Tech stack

- **[Astro](https://astro.build)**: a modern static site generator that ships zero JS by default
- **Content Collections**: type-safe Markdown content management
- **Pagefind**: static search with a build-time index — no backend required
- **GitHub Actions + Pages**: push code, get a deployed site automatically

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:4321 to preview. Edits hot-reload instantly.

## Writing a new post

Create a `.md` file under `src/content/blog/` with frontmatter:

```markdown
---
title: 'Post title'
description: 'A one-line summary'
pubDate: 2026-09-10
tags: ['TagA', 'TagB']
category: 'Tech'
---

Your content here……
```

## Build & search index

```bash
npm run build    # astro build + pagefind index generation
npm run preview  # preview the production build (search works here)
```

## Deployment

Push to the `main` branch on GitHub and `.github/workflows/deploy.yml` builds and publishes the site to GitHub Pages automatically — no manual steps needed.
