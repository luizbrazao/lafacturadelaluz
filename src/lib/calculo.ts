import { FISCALIDAD, type Oferta } from '../data/ofertas';

export interface Consumo {
  punta: number; // kWh al año
  llano: number;
  valle: number;
}
export interface Potencia {
  p1: number; // kW punta
  p2: number; // kW valle
}
type Precio = Oferta['energia'];

/** Coste anual con impuestos (IEE, contador e IVA). */
export function costeAnual(energia: Precio, precioPotencia: { p1: number; p2: number }, cuotaMensual: number, kw: Potencia, c: Consumo) {
  const e =
    'unico' in energia
      ? (c.punta + c.llano + c.valle) * energia.unico
      : c.punta * energia.punta + c.llano * energia.llano + c.valle * energia.valle;
  const p = (kw.p1 * precioPotencia.p1 + kw.p2 * precioPotencia.p2) * 365;
  const base = e + p + cuotaMensual * 12;
  const iee = base * FISCALIDAD.iee;
  const contador = FISCALIDAD.alquilerContadorMes * 12;
  return (base + iee + contador) * (1 + FISCALIDAD.iva);
}

export const eur = (n: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
