// Ofertas de luz para hogares (peaje 2.0TD, península), sin impuestos.
// Recogidas a mano de la web oficial de cada comercializadora. Revisar al menos cada mes:
// las compañías cambian precios sin aviso.
//
// energia: €/kWh. Un solo valor = mismo precio las 24 h; tres valores = punta, llano, valle.
// potencia: €/kW y día para P1 (punta) y P2 (valle).

export interface Oferta {
  id: string;
  compania: string;
  nombre: string;
  energia: { unico: number } | { punta: number; llano: number; valle: number };
  potencia: { p1: number; p2: number };
  cuotaMensual?: number; // € al mes, si la hay
  maxKwhAno?: number; // la oferta solo vale por debajo de este consumo anual
  oculta?: boolean; // datos guardados pero no se muestran en el comparador
  condiciones: string[]; // lo que hay que saber antes de contratar
  url: string; // página oficial de la tarifa
  afiliado?: { url: string; red: string }; // solo si hay acuerdo activo: se marca «Patrocinado»
  consultado: string; // AAAA-MM-DD
}

export const OFERTAS: Oferta[] = [
  {
    id: 'niba-zen',
    compania: 'niba',
    nombre: 'niba Zen',
    energia: { unico: 0.147 },
    potencia: { p1: 0.099, p2: 0.099 },
    condiciones: ['Sin permanencia', 'Contratación solo online'],
    url: 'https://niba.es/',
    consultado: '2026-11-25',
  },
  {
    id: 'niba-tres',
    compania: 'niba',
    nombre: 'niba Tres',
    energia: { punta: 0.217, llano: 0.167, valle: 0.097 },
    potencia: { p1: 0.097, p2: 0.097 },
    condiciones: ['Sin permanencia', 'Contratación solo online'],
    url: 'https://niba.es/',
    consultado: '2026-11-25',
  },
  {
    id: 'octopus-relax',
    compania: 'Octopus Energy',
    nombre: 'Octopus Relax',
    energia: { unico: 0.149 },
    // La web publica 3,60 €/kW al mes, calculado para 30 días.
    potencia: { p1: 0.12, p2: 0.12 },
    condiciones: ['Precio fijo 12 meses'],
    url: 'https://octopusenergy.es/precios',
    consultado: '2026-11-25',
  },
  {
    id: 'octopus-3',
    compania: 'Octopus Energy',
    nombre: 'Octopus 3',
    energia: { punta: 0.166, llano: 0.15, valle: 0.139 },
    potencia: { p1: 0.12, p2: 0.12 },
    condiciones: ['Precio fijo 12 meses'],
    url: 'https://octopusenergy.es/precios',
    consultado: '2026-11-25',
  },
  {
    id: 'gana-24h',
    compania: 'Gana Energía',
    nombre: 'Tarifa 24 horas',
    energia: { unico: 0.149 },
    potencia: { p1: 0.099, p2: 0.099 },
    condiciones: ['Sin permanencia', 'Precio fijo 12 meses', 'Hasta 15 kW'],
    url: 'https://ganaenergia.com/tarifas-luz/24-horas',
    consultado: '2026-11-25',
  },
  {
    id: 'gana-tramos',
    compania: 'Gana Energía',
    nombre: 'Tarifa Tramos Horarios',
    energia: { punta: 0.201, llano: 0.134, valle: 0.11 },
    potencia: { p1: 0.099, p2: 0.099 },
    condiciones: ['Sin permanencia', 'Precio fijo 12 meses', 'Hasta 15 kW'],
    url: 'https://ganaenergia.com/tarifas-luz/tramos-horarios',
    consultado: '2026-11-25',
  },
  {
    id: 'endesa-conecta',
    compania: 'Endesa',
    nombre: 'Conecta Luz',
    energia: { unico: 0.12999 },
    // La web publica 2,849 €/kW; se interpreta como mensual (30 días).
    potencia: { p1: 0.094967, p2: 0.094967 },
    condiciones: ['Precio con 10 % de descuento el primer año (después 0,144433 €/kWh)', 'Sin permanencia', 'Solo online'],
    url: 'https://www.endesa.com/es/luz-y-gas/luz',
    consultado: '2026-11-25',
  },
  {
    id: 'endesa-conecta-3p',
    compania: 'Endesa',
    nombre: 'Conecta 3 Periodos',
    energia: { punta: 0.20241, llano: 0.13401, valle: 0.11061 },
    potencia: { p1: 0.094967, p2: 0.094967 },
    condiciones: ['Precio con 10 % de descuento el primer año', 'Sin permanencia'],
    url: 'https://www.endesa.com/es/luz-y-gas/luz',
    consultado: '2026-11-25',
  },
  {
    id: 'naturgy-por-uso',
    compania: 'Naturgy',
    nombre: 'Tarifa Por Uso Luz',
    energia: { unico: 0.148 },
    potencia: { p1: 0.12303, p2: 0.061562 },
    condiciones: ['Sin penalización por permanencia'],
    url: 'https://www.naturgy.es/hogar/luz',
    consultado: '2026-11-25',
  },
  {
    id: 'naturgy-noche',
    compania: 'Naturgy',
    nombre: 'Tarifa Noche Luz',
    energia: { punta: 0.218, llano: 0.145, valle: 0.11 },
    potencia: { p1: 0.12303, p2: 0.061562 },
    condiciones: ['Sin penalización por permanencia'],
    url: 'https://www.naturgy.es/hogar/luz',
    consultado: '2026-11-25',
  },
  {
    id: 'totalenergies-siempre',
    compania: 'TotalEnergies',
    nombre: 'A tu Aire Luz Siempre',
    energia: { unico: 0.1199 },
    potencia: { p1: 0.094493, p2: 0.094493 },
    maxKwhAno: 4000,
    condiciones: ['Precio para consumos de menos de 4.000 kWh al año', 'Sin permanencia'],
    url: 'https://www.totalenergies.es/es/hogares/tarifas-luz/a-tu-aire-siempre',
    consultado: '2026-11-25',
  },
  {
    id: 'holaluz-clasica',
    compania: 'Holaluz',
    nombre: 'Tarifa Clásica',
    energia: { unico: 0.169 },
    potencia: { p1: 0.12, p2: 0.12 },
    condiciones: ['Precio si contratas online (0,179 €/kWh por otros canales)', 'Sin permanencia', 'Precio fijo 12 meses'],
    url: 'https://www.holaluz.com/luz/tarifas-luz',
    consultado: '2026-11-25',
  },
  {
    id: 'holaluz-3',
    compania: 'Holaluz',
    nombre: 'Tarifa 3',
    energia: { punta: 0.265, llano: 0.186, valle: 0.166 },
    potencia: { p1: 0.12, p2: 0.12 },
    condiciones: ['Sin permanencia', 'Precio fijo 12 meses'],
    url: 'https://www.holaluz.com/luz/tarifas-luz',
    consultado: '2026-11-25',
  },
  {
    id: 'repsol-sin-horarios',
    compania: 'Repsol',
    nombre: 'Tarifa Sin Horarios',
    energia: { unico: 0.1649 },
    potencia: { p1: 0.099726, p2: 0.099726 },
    condiciones: ['Sin el servicio Asistente 24h (con él: 0,1499 €/kWh y 4,99 € al mes)', 'Sin permanencia'],
    url: 'https://www.repsol.es/particulares/hogar/luz-y-gas/tarifas/tarifa-sin-horarios/',
    consultado: '2026-11-25',
  },
  {
    id: 'iberdrola-online',
    compania: 'Iberdrola',
    nombre: 'Plan Online',
    energia: { unico: 0.1519 },
    potencia: { p1: 0.106822, p2: 0.106822 },
    condiciones: ['Precio estable 12 meses', 'Sin permanencia', 'Gestión 100 % online'],
    url: 'https://www.iberdrola.es/luz/tarifas/plan-online',
    consultado: '2026-11-25',
  },
  {
    id: 'iberdrola-online-3p',
    compania: 'Iberdrola',
    nombre: 'Plan Online 3 Periodos',
    energia: { punta: 0.208952, llano: 0.153952, valle: 0.120952 },
    potencia: { p1: 0.090411, p2: 0.030137 },
    condiciones: ['Precio estable 12 meses', 'Sin permanencia'],
    url: 'https://www.iberdrola.es/luz/tarifas/plan-online-tres-periodos',
    consultado: '2026-11-25',
  },
];

// Impuestos y costes regulados vigentes en noviembre de 2026.
export const FISCALIDAD = {
  iee: 0.0511269632, // Impuesto especial sobre la electricidad (tipo ordinario)
  iva: 0.21, // IVA (la rebaja al 10 % no se activó en noviembre ni en diciembre de 2026)
  alquilerContadorMes: 0.81, // contador digital monofásico, €/mes
  revisado: '2026-11-25',
};

// Término de potencia del PVPC 2.0TD en 2026: peajes + cargos (BOE 27/12/2025 y Resolución CNMC)
// más el margen de comercialización fijo de 3,113 €/kW y año (RD 216/2014).
export const PVPC_POTENCIA_DIA = {
  p1: (23.324952 + 4.379461 + 3.113) / 365,
  p2: (0.44377 + 0.281653) / 365,
};
