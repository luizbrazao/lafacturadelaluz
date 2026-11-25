// Grandes grupos con comercializadora de referencia (PVPC) y comercializadora libre.
// Fuentes: listados de comercializadoras de la CNMC y webs de cada comercializadora (consultado 25/11/2026).
export interface Empresa {
  slug: string;
  nombre: string;
  cor: { nombre: string; razon: string; web: string; antes?: string };
  ofertas: string[]; // ids de OFERTAS del mismo grupo en el mercado libre
}

export const EMPRESAS: Empresa[] = [
  {
    slug: 'endesa',
    nombre: 'Endesa',
    cor: {
      nombre: 'Energía XXI',
      razon: 'Energía XXI Comercializadora de Referencia, S.L.U.',
      web: 'https://www.energiaxxi.com',
    },
    ofertas: ['endesa-conecta', 'endesa-conecta-3p'],
  },
  {
    slug: 'iberdrola',
    nombre: 'Iberdrola',
    cor: {
      nombre: 'Curenergía',
      razon: 'Curenergía Comercializador de Último Recurso',
      web: 'https://www.curenergia.es',
    },
    ofertas: ['iberdrola-online', 'iberdrola-online-3p'],
  },
  {
    slug: 'naturgy',
    nombre: 'Naturgy',
    cor: {
      nombre: 'Comercializadora Regulada',
      razon: 'Comercializadora Regulada del grupo Naturgy',
      web: 'https://www.comercializadoraregulada.es',
      antes: 'Gas & Power',
    },
    ofertas: ['naturgy-por-uso', 'naturgy-noche'],
  },
];
