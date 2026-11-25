import { OFERTAS, PVPC_POTENCIA_DIA, type Oferta } from '../data/ofertas';
import { costeAnual, type Consumo, type Potencia } from './calculo';
import type { PeriodAverages } from './pvpc';

export interface Perfil {
  id: string;
  nombre: string;
  descripcion: string;
  consumo: Consumo;
  potencia: Potencia;
}

// Reparto típico de un hogar sin discriminación horaria: 25 % punta, 26 % llano, 49 % valle.
const reparto = (kwh: number): Consumo => ({ punta: Math.round(kwh * 0.25), llano: Math.round(kwh * 0.26), valle: Math.round(kwh * 0.49) });

export const PERFILES: Perfil[] = [
  { id: 'pequeno', nombre: 'Piso pequeño', descripcion: '1.800 kWh al año, 3,45 kW', consumo: reparto(1800), potencia: { p1: 3.45, p2: 3.45 } },
  { id: 'tipico', nombre: 'Hogar típico', descripcion: '3.000 kWh al año, 3,45 kW', consumo: reparto(3000), potencia: { p1: 3.45, p2: 3.45 } },
  { id: 'grande', nombre: 'Casa grande', descripcion: '5.000 kWh al año, 5,75 kW', consumo: reparto(5000), potencia: { p1: 5.75, p2: 5.75 } },
];

export interface FilaRanking {
  compania: string;
  oferta: Oferta | null; // null = PVPC
  nombre: string;
  total: number;
}

/** La tarifa más barata de cada compañía para un perfil, más el PVPC, de menor a mayor coste anual. */
export function rankingCompanias(perfil: Perfil, pvpc: PeriodAverages | null): FilaRanking[] {
  const kwh = perfil.consumo.punta + perfil.consumo.llano + perfil.consumo.valle;
  const mejores = new Map<string, FilaRanking>();
  for (const o of OFERTAS) {
    if (o.oculta || (o.maxKwhAno && kwh >= o.maxKwhAno)) continue;
    const total = costeAnual(o.energia, o.potencia, o.cuotaMensual ?? 0, perfil.potencia, perfil.consumo);
    const actual = mejores.get(o.compania);
    if (!actual || total < actual.total) mejores.set(o.compania, { compania: o.compania, oferta: o, nombre: o.nombre, total });
  }
  const filas = [...mejores.values()];
  if (pvpc) {
    filas.push({
      compania: 'PVPC',
      oferta: null,
      nombre: 'Tarifa regulada',
      total: costeAnual({ punta: pvpc.punta, llano: pvpc.llano, valle: pvpc.valle }, PVPC_POTENCIA_DIA, 0, perfil.potencia, perfil.consumo),
    });
  }
  return filas.sort((a, b) => a.total - b.total);
}

export const enlaceComparador = (p: Perfil) =>
  `/comparador-tarifas-luz?kw1=${p.potencia.p1}&kw2=${p.potencia.p2}&punta=${p.consumo.punta}&llano=${p.consumo.llano}&valle=${p.consumo.valle}`;
