// Precio PVPC 2.0TD (península) por hora, desde la API pública REData de Red Eléctrica.
// Los valores vienen en €/MWh sin impuestos; aquí se convierten a €/kWh.
import fixtures from '../fixtures/pvpc.json';

export const TZ = 'Europe/Madrid';

export interface HourPrice {
  hour: number; // 0-23, hora de inicio en horario peninsular
  price: number; // €/kWh sin impuestos
}

export interface DayPrices {
  date: string; // AAAA-MM-DD
  hours: HourPrice[];
  avg: number;
  min: HourPrice;
  max: HourPrice;
}

const API = 'https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real';

/** Fecha AAAA-MM-DD en Madrid, desplazada `offsetDays` días. */
export function madridDate(offsetDays = 0, now = new Date()): string {
  const d = new Date(now.getTime() + offsetDays * 86_400_000);
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
}

/** Hora actual (0-23) en Madrid. */
export function madridHour(now = new Date()): number {
  return Number(new Intl.DateTimeFormat('en-GB', { timeZone: TZ, hour: '2-digit', hourCycle: 'h23' }).format(now));
}

function summarize(date: string, eurMWh: number[], hoursOfDay?: number[]): DayPrices {
  const hours = eurMWh.map((v, i) => ({ hour: hoursOfDay?.[i] ?? i, price: v / 1000 }));
  const avg = hours.reduce((s, h) => s + h.price, 0) / hours.length;
  const min = hours.reduce((a, b) => (b.price < a.price ? b : a));
  const max = hours.reduce((a, b) => (b.price > a.price ? b : a));
  return { date, hours, avg, min, max };
}

/** Devuelve los precios de un día o null si REE aún no los ha publicado. */
export async function getDayPrices(date: string): Promise<DayPrices | null> {
  if (import.meta.env.DEV) {
    const data = (fixtures as Record<string, number[]>)[date];
    if (data) return summarize(date, data);
    // En desarrollo se usa el último día de prueba como "hoy" y no hay "mañana".
    const keys = Object.keys(fixtures).sort();
    if (date > keys[keys.length - 1]) return null;
    return summarize(date, (fixtures as Record<string, number[]>)[keys[keys.length - 1]]);
  }

  const url = `${API}?start_date=${date}T00:00&end_date=${date}T23:59&time_trunc=hour`;
  try {
    const res = await fetch(url, {
      headers: { accept: 'application/json' },
      // Caché en el borde de Cloudflare para no llamar a REE en cada visita.
      cf: { cacheTtl: 900, cacheEverything: true },
    } as RequestInit);
    if (!res.ok) return null;
    const json: any = await res.json();
    const serie = json?.included?.find((s: any) => s.id === '1001');
    const raw: any[] | undefined = serie?.attributes?.values;
    if (!raw || raw.length < 23) return null; // 23 o 25 horas en los días de cambio de hora
    const values = raw.map((v) => Number(v.value));
    const hoursOfDay = raw.map((v) => Number(String(v.datetime).slice(11, 13)));
    return summarize(date, values, hoursOfDay);
  } catch {
    return null;
  }
}

/** Ventana de N horas consecutivas con la media más baja. */
export function cheapestWindow(day: DayPrices, length: number): { start: number; end: number; avg: number } {
  let best = { start: 0, end: length, avg: Infinity };
  for (let i = 0; i + length <= day.hours.length; i++) {
    const slice = day.hours.slice(i, i + length);
    const avg = slice.reduce((s, h) => s + h.price, 0) / length;
    if (avg < best.avg) best = { start: i, end: i + length, avg };
  }
  return best;
}

export const fmtPrice = (p: number) =>
  new Intl.NumberFormat('es-ES', { minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(p);

export const fmtHour = (h: number) => `${String(h % 24).padStart(2, '0')}:00`;

export const fmtLongDate = (date: string) =>
  new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }).format(
    new Date(`${date}T12:00:00Z`),
  );

/** Nivel 0-4 relativo al día (0 = de las más baratas). */
export function level(day: DayPrices, price: number): number {
  const span = day.max.price - day.min.price || 1;
  return Math.min(4, Math.floor(((price - day.min.price) / span) * 5));
}
