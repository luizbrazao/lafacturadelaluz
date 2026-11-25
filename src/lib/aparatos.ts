import { FISCALIDAD, OFERTAS } from '../data/ofertas';
import type { Aparato } from '../data/aparatos';
import { cheapestWindow, type DayPrices } from './pvpc';

/** Multiplicador de impuestos sobre la energía: impuesto eléctrico e IVA. */
export const IMPUESTOS = (1 + FISCALIDAD.iee) * (1 + FISCALIDAD.iva);

/** Precio fijo de referencia: mediana de las ofertas de precio único que comparamos (sin impuestos). */
export const PRECIO_FIJO_REF = (() => {
  const p = OFERTAS.filter((o) => !o.oculta && 'unico' in o.energia)
    .map((o) => (o.energia as { unico: number }).unico)
    .sort((a, b) => a - b);
  return p[Math.floor(p.length / 2)];
})();

export function expensiveWindow(day: DayPrices, length: number) {
  let worst = { start: 0, end: length, avg: -Infinity };
  for (let i = 0; i + length <= day.hours.length; i++) {
    const avg = day.hours.slice(i, i + length).reduce((s, h) => s + h.price, 0) / length;
    if (avg > worst.avg) worst = { start: i, end: i + length, avg };
  }
  return worst;
}

export interface CosteAparato {
  ahora: number;
  mejor: { start: number; end: number; coste: number };
  peor: { start: number; end: number; coste: number };
  mesMedia: number; // al mes, usando a horas medias de hoy
  mesMejor: number; // al mes, usándolo siempre en la mejor franja
  mesFijo: number; // al mes, con un precio fijo típico
  precioAhora: number;
}

/** Costes con impuestos. Para aparatos por hora, el coste es por hora de uso. */
export function costes(a: Aparato, day: DayPrices, hora: number): CosteAparato {
  const precioAhora = day.hours.find((h) => h.hour === hora)?.price ?? day.avg;
  const ventana = Math.min(a.horas, day.hours.length);
  const mejor = cheapestWindow(day, ventana);
  const peor = expensiveWindow(day, ventana);
  const usosMes = (a.usosSemana * 52) / 12;
  const kwhMes = a.continuo ? a.continuo.kwhAno / 12 : a.kwh * usosMes;
  return {
    precioAhora,
    ahora: a.kwh * precioAhora * IMPUESTOS,
    mejor: { start: mejor.start, end: mejor.end, coste: a.kwh * mejor.avg * IMPUESTOS },
    peor: { start: peor.start, end: peor.end, coste: a.kwh * peor.avg * IMPUESTOS },
    mesMedia: kwhMes * day.avg * IMPUESTOS,
    mesMejor: kwhMes * mejor.avg * IMPUESTOS,
    mesFijo: kwhMes * PRECIO_FIJO_REF * IMPUESTOS,
  };
}

export const centimos = (n: number) =>
  n < 1
    ? `${(n * 100).toLocaleString('es-ES', { maximumFractionDigits: 1 })} céntimos`
    : `${n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
