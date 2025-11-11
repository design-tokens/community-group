// @ts-check
import { defineConfig } from 'astro/config';
import pagefind from 'astro-pagefind';
import sitemap from '@astrojs/sitemap';
import preact from '@astrojs/preact';
import robotsTxt from 'astro-robots-txt';
import icon from 'astro-icon';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkDirective from 'remark-directive';
import rehypeAutoToc from './md-plugins/rehype-auto-toc.js';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.designtokens.org/',
  integrations: [
    sitemap(),
    robotsTxt(),
    icon({ iconDir: 'src/assets/vectors' }),
    pagefind(),
    preact({ compat: true }), // compat: true is needed to use React libraries
  ],
  devToolbar: {
    enabled: false,
  },
  prefetch: true,
  markdown: {
    shikiConfig: {
      theme: 'ayu-dark',
    },
    remarkRehype: {
      allowDangerousHtml: true,
    },
    remarkPlugins: [remarkDirective],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeAutoToc],
  },
  vite: {
    css: {
      transformer: 'lightningcss',
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
