import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);

  // www.lafacturadelaluz.es -> lafacturadelaluz.es (una sola versión para Google)
  if (url.hostname.startsWith('www.')) {
    url.hostname = url.hostname.slice(4);
    return Response.redirect(url.toString(), 301);
  }

  const response = await next();
  // Evita que la URL de pruebas (*.workers.dev) se indexe como copia del dominio real.
  if (url.hostname.endsWith('.workers.dev')) {
    response.headers.set('X-Robots-Tag', 'noindex');
  }
  return response;
});
