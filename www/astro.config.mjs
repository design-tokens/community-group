// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.designtokens.org/',
  integrations: [
    sitemap(),
    robotsTxt(),
    icon({ iconDir: 'src/assets/vectors' }),
  ],
  prefetch: true,
  redirects: {
    // Note: only needed for dev. The prod site handles these automatically
    // TODO: investigate moving URLs out of public/ and into src/pages/. public/ was a remnant of pre-Astro setup.
    '/TR/drafts/': '/TR/drafts/index.html',
    '/TR/drafts/color/': '/TR/drafts/color/index.html',
    '/TR/drafts/format/': '/TR/drafts/format/index.html',
    '/TR/drafts/resolver/': '/TR/drafts/resolver/index.html',
    '/TR/first-editors-draft/': '/TR/first-editors-draft/index.html',
    '/TR/first-editors-draft/format/':
      '/TR/first-editors-draft/format/index.html',
    '/TR/second-editors-draft/': '/TR/second-editors-draft/index.html',
    '/TR/second-editors-draft/format/':
      '/TR/second-editors-draft/format/index.html',
    '/TR/third-editors-draft/': '/TR/third-editors-draft/index.html',
    '/TR/third-editors-draft/color/':
      '/TR/third-editors-draft/color/index.html',
    '/TR/third-editors-draft/format/':
      '/TR/third-editors-draft/format/index.html',
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use './src/assets/css/01-utils/tokens.scss' as *;
          `,
        },
      },
    },
  },
});
