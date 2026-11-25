import type { APIRoute } from 'astro';
import { OFERTAS } from '../../data/ofertas';

export const prerender = false;

// Cuenta el clic y redirige a la web de la compañía (o al enlace de afiliado, si existe).
// No guarda IP ni identificadores: solo oferta, página de origen y país.
export const GET: APIRoute = async ({ params, url, request }) => {
  const oferta = OFERTAS.find((o) => o.id === params.id);
  if (!oferta) return new Response('Not found', { status: 404 });

  const destino = oferta.afiliado?.url ?? oferta.url;
  const de = (url.searchParams.get('de') ?? '').slice(0, 120);
  const origen = de.startsWith('/') ? de : '';
  const pais = (request as Request & { cf?: { country?: string } }).cf?.country ?? '';

  try {
    const { env } = await import('cloudflare:workers');
    (env as { CLICKS?: { writeDataPoint: (p: unknown) => void } }).CLICKS?.writeDataPoint({
      indexes: [oferta.id],
      blobs: [oferta.id, oferta.compania, origen, pais, oferta.afiliado ? oferta.afiliado.red : ''],
      doubles: [1],
    });
  } catch {
    // Sin binding (desarrollo): solo log.
  }
  console.log(JSON.stringify({ evento: 'salida', oferta: oferta.id, origen, pais, afiliado: Boolean(oferta.afiliado) }));

  return new Response(null, {
    status: 302,
    headers: {
      Location: destino,
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  });
};
