import { defineMiddleware } from 'astro:middleware';

// Evita que la URL de pruebas (*.workers.dev) se indexe en Google como copia del dominio real.
export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  if (new URL(context.request.url).hostname.endsWith('.workers.dev')) {
    response.headers.set('X-Robots-Tag', 'noindex');
  }
  return response;
});
