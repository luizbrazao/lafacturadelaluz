// Ofertas de batería virtual para hogares (2.0TD, península), recogidas a mano de la web oficial de cada compañía.
// Precios sin impuestos salvo que se indique. Revisar cada mes: los precios de excedentes cambian a menudo.

export interface OfertaBV {
  slug: string; // para /bateria-virtual/<slug>
  compania: string;
  nombreBateria: string;
  tarifa: string; // tarifa con la que se contrata
  bateria: boolean; // false = solo compensación simplificada, sin batería virtual
  excedente: number; // €/kWh sin impuestos para quien ya tiene placas
  excedenteNota?: string;
  cuotaMes: number; // € al mes sin impuestos
  cuotaNota?: string;
  energia: string; // precio de la energía de la tarifa asociada, tal como lo publica la compañía
  potencia: string;
  caducidad: string;
  aplica: string; // a qué parte de la factura se puede aplicar el saldo
  compartir: string;
  limites: string;
  otras: string[];
  fuentes: { texto: string; url: string }[];
  url: string; // página oficial a la que enlazamos
  afiliado?: { url: string; red: string }; // solo si hay acuerdo activo: se marca «Patrocinado»
  consultado: string; // AAAA-MM-DD
}

export const BATERIAS: OfertaBV[] = [
  {
    slug: 'octopus',
    compania: 'Octopus Energy',
    nombreBateria: 'Octopus Solar Wallet',
    tarifa: 'Octopus Solar',
    bateria: true,
    excedente: 0.035,
    excedenteNota: '0,07 €/kWh si instalas las placas con Octopus (solo al contratar la instalación).',
    cuotaMes: 0,
    energia: 'Punta 0,244 · llano 0,177 · valle 0,146 €/kWh, precio fijo 12 meses',
    potencia: '3,60 €/kW al mes en punta y en valle (calculado para 30 días)',
    caducidad: 'No caduca.',
    aplica: 'Al total de la factura, incluida la potencia.',
    compartir: 'Con cualquier otro suministro de Octopus, también de familiares.',
    limites:
      'Una vez compensada la factura, el máximo que pasa al monedero cada mes equivale a 1.000 kWh (lo explica Octopus en su blog; una casa normal no llega).',
    otras: ['Sin permanencia.'],
    fuentes: [
      { texto: 'Solar Wallet', url: 'https://octopusenergy.es/solar-wallet' },
      { texto: 'Tarifa Octopus Solar', url: 'https://octopusenergy.es/precios/tarifa-solar' },
      { texto: 'Límite de 1.000 kWh al mes', url: 'https://octopusenergy.es/blog/nuevas-condiciones-excedentes-solares' },
    ],
    url: 'https://octopusenergy.es/solar-wallet',
    consultado: '2026-11-26',
  },
  {
    slug: 'iberdrola',
    compania: 'Iberdrola',
    nombreBateria: 'Solar Cloud',
    tarifa: 'Plan Solar',
    bateria: true,
    excedente: 0.07,
    excedenteNota: 'Precio del Plan Solar para la compensación simplificada. Solar Cloud valora el excedente al precio de tu plan.',
    cuotaMes: 3.45,
    cuotaNota:
      'En hogares, Solar Cloud viene con el Asistente Smart Avanzado: 4,17 €/mes con impuestos (unos 3,45 € sin IVA). Solo hace falta si tus excedentes valen más que la energía que compras a la red.',
    energia: '0,149900 €/kWh de 19:00 a 08:59 y 0,299800 €/kWh de 09:00 a 18:59, todos los días (oferta válida hasta el 30/11/2026)',
    potencia: '0,106822 €/kW al día en punta y en valle',
    caducidad: '24 meses.',
    aplica: 'Primero a la energía; después, mientras quede saldo, a la potencia y a los costes regulados.',
    compartir: 'Con otros contratos de Iberdrola del mismo titular, por ejemplo una segunda vivienda.',
    limites: 'Máximo de 1.000 € acumulados al mes. No disponible con Curenergía (PVPC).',
    otras: ['Precio fijo 12 meses; después se actualiza con el IPC.', 'Sin permanencia.'],
    fuentes: [
      { texto: 'Plan Solar', url: 'https://www.iberdrola.es/luz/tarifas/plan-solar' },
      { texto: 'Condiciones particulares del Plan Solar (PDF)', url: 'https://www.iberdrola.es/documents/20122/18844088/cond_part_plansolar_es.pdf' },
      { texto: 'Asistente Smart Avanzado y Solar Cloud', url: 'https://www.iberdrola.es/eficiencia-energetica/productos/asistente-smart-avanzado' },
    ],
    url: 'https://www.iberdrola.es/luz/tarifas/plan-solar',
    consultado: '2026-11-26',
  },
  {
    slug: 'repsol',
    compania: 'Repsol',
    nombreBateria: 'Batería Virtual de Repsol',
    tarifa: 'Tarifa Batería Virtual',
    bateria: true,
    excedente: 0.06,
    cuotaMes: 1.99,
    energia: '0,179900 €/kWh las 24 horas (0,169900 €/kWh si añades el Asistente 24h Plus de 6,99 €/mes)',
    potencia: '0,099726 €/kW al día en punta y en valle',
    caducidad: 'No caduca.',
    aplica: 'A las facturas siguientes de luz y gas, hasta dejarlas en 0 €.',
    compartir: 'Entre tus contratos de Repsol, por ejemplo una segunda vivienda, desde la app Repsol Vivit.',
    limites: 'La web no publica un tope.',
    otras: ['Precio fijo 12 meses.'],
    fuentes: [{ texto: 'Tarifa Batería Virtual', url: 'https://www.repsol.es/particulares/hogar/energia-solar/tarifas/tarifa-bateria-virtual/' }],
    url: 'https://www.repsol.es/particulares/hogar/energia-solar/tarifas/tarifa-bateria-virtual/',
    consultado: '2026-11-26',
  },
  {
    slug: 'endesa',
    compania: 'Endesa',
    nombreBateria: 'Batería Virtual de Endesa',
    tarifa: 'Endesa Solar Plus & Batería Virtual',
    bateria: true,
    excedente: 0.06,
    cuotaMes: 2,
    energia: '0,184900 €/kWh (0,171957 €/kWh el primer año con el descuento del 7 % para altas nuevas)',
    potencia: '2,849 €/kW al mes en punta y en valle',
    caducidad: 'La web no lo indica.',
    aplica: 'Como pago a cuenta del importe neto de las facturas siguientes.',
    compartir: 'Solo en el mismo suministro (CUPS).',
    limites: 'La web no publica un tope.',
    otras: ['Precios y condiciones actualizados por Endesa el 15/10/2026.'],
    fuentes: [{ texto: 'Endesa Solar Plus & Batería Virtual', url: 'https://www.endesa.com/es/luz-y-gas/catalogo-solar/endesa-solar-plus-bateria-virtual' }],
    url: 'https://www.endesa.com/es/luz-y-gas/catalogo-solar/endesa-solar-plus-bateria-virtual',
    consultado: '2026-11-26',
  },
  {
    slug: 'naturgy',
    compania: 'Naturgy',
    nombreBateria: 'Batería Virtual Solar',
    tarifa: 'Tarifa por Uso o Tarifa Solar (no vale con tarifa plana)',
    bateria: true,
    excedente: 0.06,
    excedenteNota: 'Naturgy indica que el precio puede revisarse cada mes.',
    cuotaMes: 0,
    cuotaNota: 'Naturgy la anuncia gratis con su tarifa de luz.',
    energia: 'Tarifa por Uso: 0,148 €/kWh (consultado el 25/11/2026)',
    potencia: 'Tarifa por Uso: 0,12303 €/kW al día en punta y 0,061562 en valle',
    caducidad: '5 años desde la última factura que sumó saldo.',
    aplica: 'A facturas de luz, gas u otros servicios de Naturgy, en cualquier concepto.',
    compartir: 'Con otros suministros de los que seas titular.',
    limites: 'Solo para consumos de menos de 0,4 GWh al año.',
    otras: [],
    fuentes: [{ texto: 'Batería Virtual Solar', url: 'https://www.naturgy.es/hogar/solar/bateria_virtual' }],
    url: 'https://www.naturgy.es/hogar/solar/bateria_virtual',
    consultado: '2026-11-26',
  },
  {
    slug: 'totalenergies',
    compania: 'TotalEnergies',
    nombreBateria: 'Sin batería virtual',
    tarifa: 'A tu Aire Siempre',
    bateria: false,
    excedente: 0.07,
    cuotaMes: 0,
    energia: '0,1199 €/kWh las 24 horas',
    potencia: '0,094493 €/kW al día en punta y en valle',
    caducidad: 'No hay saldo: lo que no se compensa en el mes se pierde.',
    aplica: 'Solo a la energía consumida de la red en el mismo mes.',
    compartir: 'No.',
    limites: 'La compensación no puede superar el coste de la energía del mes; la factura nunca llega a 0 €.',
    otras: [],
    fuentes: [{ texto: 'Compensación de excedentes', url: 'https://www.totalenergies.es/es/hogares/autoconsumo-solar/compensacion-excedentes' }],
    url: 'https://www.totalenergies.es/es/hogares/autoconsumo-solar/compensacion-excedentes',
    consultado: '2026-11-26',
  },
];
