// @ts-check
import { defineConfig } from "astro/config";
import path from "path";
import { fileURLToPath } from "url";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import icon from "astro-icon";

// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scssPaths = ["./src/assets/css/01-utils/tokens.scss"];

// https://astro.build/config
export default defineConfig({
  site: "https://www.designtokens.org/",
  integrations: [sitemap(), robotsTxt(), icon({ iconDir: "src/assets/vectors" })],
  prefetch: true,
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: scssPaths.reduce((acc, scssPath) => {
            const pathToImport = path.resolve(__dirname, scssPath);
            if (acc) {
              console.log(`${acc} @use '${pathToImport}' as *;`);
              return `${acc} @use '${pathToImport}' as *;`;
            }
            console.log(`@use '${pathToImport}' as *;`);

            return `@use '${pathToImport}' as *;`;
          }, ""),
        },
      },
    },
  },
});
