// Fichas de compañía. Los precios salen de OFERTAS; aquí solo va lo que no es precio.
// Notas de Trustpilot consultadas el 25/11/2026 (revisar cada pocos meses).
export interface Marca {
  slug: string;
  compania: string; // igual que Oferta.compania
  web: string;
  trustpilot: { nota: number; opiniones: number; unaEstrella: number; url: string; fecha: string };
  notas: { texto: string; fuente?: { nombre: string; url: string } }[];
  paginaHoy?: string; // página de precio de hoy de la compañía, si existe
}

export const MARCAS: Marca[] = [
  {
    slug: 'iberdrola',
    compania: 'Iberdrola',
    web: 'https://www.iberdrola.es',
    trustpilot: { nota: 4.4, opiniones: 26782, unaEstrella: 10, url: 'https://es.trustpilot.com/review/www.iberdrola.es', fecha: '2026-11-25' },
    notas: [
      { texto: 'El Plan Online 3 Periodos cobra muy poco por la potencia en valle (0,030 €/kW al día), por eso sale bien en casas con más potencia o con coche eléctrico.' },
      { texto: 'El PVPC del grupo no lo vende Iberdrola sino Curenergía, otra empresa del mismo grupo.' },
    ],
    paginaHoy: '/precio-luz-hoy-iberdrola',
  },
  {
    slug: 'octopus-energy',
    compania: 'Octopus Energy',
    web: 'https://octopusenergy.es',
    trustpilot: { nota: 4.8, opiniones: 26820, unaEstrella: 2, url: 'https://es.trustpilot.com/review/octopusenergy.es', fecha: '2026-11-25' },
    notas: [
      { texto: 'Publica la potencia como 3,60 €/kW al mes (calculado para 30 días). Equivale a 0,12 €/kW al día, de las más caras de las que comparamos.' },
      { texto: 'La empresa que factura en España es Octopus Energy España, S.L.U.' },
    ],
  },
  {
    slug: 'gana-energia',
    compania: 'Gana Energía',
    web: 'https://ganaenergia.com',
    trustpilot: { nota: 4.6, opiniones: 7138, unaEstrella: 8, url: 'https://es.trustpilot.com/review/ganaenergia.com', fecha: '2026-11-25' },
    notas: [
      { texto: 'Mismo precio de potencia en punta y en valle (0,099 €/kW al día) y tarifas para hasta 15 kW.' },
    ],
  },
  {
    slug: 'holaluz',
    compania: 'Holaluz',
    web: 'https://www.holaluz.com',
    trustpilot: { nota: 4.0, opiniones: 8698, unaEstrella: 24, url: 'https://es.trustpilot.com/review/holaluz.com', fecha: '2026-11-25' },
    notas: [
      { texto: 'La Tarifa Clásica cuesta 0,169 €/kWh si la contratas online y 0,179 €/kWh por otros canales.' },
      {
        texto:
          'En julio de 2026 el Ministerio para la Transición Ecológica abrió un procedimiento para retirarle la habilitación como comercializadora y traspasar sus clientes. Lo archivó a finales de agosto de 2026 y Holaluz sigue operando con normalidad.',
        fuente: { nombre: 'elDiario.es', url: 'https://www.eldiario.es/economia/holaluz-anuncia-archivo-procedimiento-inhabilitacion-reitera-corriente-pago_1_13473317.html' },
      },
    ],
  },
];
