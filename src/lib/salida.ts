import type { Oferta } from '../data/ofertas';

/** Enlace de salida a la web de la compañía, pasando por /ir/ para contar el clic. */
export function salida(o: Pick<Oferta, 'id' | 'afiliado'>, de: string) {
  return {
    href: `/ir/${o.id}?de=${encodeURIComponent(de)}`,
    rel: o.afiliado ? 'sponsored nofollow noopener' : 'nofollow noopener',
  };
}
