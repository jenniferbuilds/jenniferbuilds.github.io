// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://jenniferbuilds.github.io',
  // Project site — the repo is named "jenniferbuilds", so all paths need this base.
  // If you rename the repo to "jenniferbuilds.github.io" (user site), remove the line below.
  base: '/jenniferbuilds',
});
