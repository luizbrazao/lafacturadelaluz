import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://lafacturadelaluz.es',
  adapter: cloudflare(),
  // La web no usa sesiones. Sin esto el adaptador pide un KV «SESSION» que `wrangler preview` no sabe crear
  // y las vistas previas de las ramas fallan (error 10021).
  session: false,
  trailingSlash: 'never',
  build: { format: 'file' },
});
