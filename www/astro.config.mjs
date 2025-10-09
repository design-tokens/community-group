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
