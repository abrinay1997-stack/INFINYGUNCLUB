// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://abrinay1997-stack.github.io',
  base: '/INFINYGUNCLUB',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap({ i18n: { defaultLocale: 'es', locales: { es: 'es-PA', en: 'en-US' } } }),
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  image: { domains: [] },
  compressHTML: true,
  build: { format: 'directory' },
});
