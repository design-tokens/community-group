// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
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
