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

// ---------------------------------------------------------------------------
// Media del PVPC por periodo (punta, llano, valle) en los últimos 30 días.

export interface PeriodAverages {
  punta: number;
  llano: number;
  valle: number;
  desde: string;
  hasta: string;
}

// Festivos nacionales de fecha fija: todo el día es valle. (Viernes Santo no se incluye.)
const FESTIVOS = ['01-01', '01-06', '05-01', '08-15', '10-12', '11-01', '12-06', '12-08', '12-25'];

/** Periodo 2.0TD de una hora peninsular. */
export function periodo(date: string, hour: number): 'punta' | 'llano' | 'valle' {
  const wd = new Date(`${date}T12:00:00Z`).getUTCDay();
  if (wd === 0 || wd === 6 || FESTIVOS.includes(date.slice(5))) return 'valle';
  if ((hour >= 10 && hour < 14) || (hour >= 18 && hour < 22)) return 'punta';
  if ((hour >= 8 && hour < 10) || (hour >= 14 && hour < 18) || hour >= 22) return 'llano';
  return 'valle';
}

export async function getPvpcPeriodAverages(): Promise<PeriodAverages | null> {
  const hasta = madridDate(-1);
  const desde = madridDate(-30);
  if (import.meta.env.DEV) {
    // Medias reales calculadas el 25/11/2026 con datos del 26/10 al 24/11.
    return { punta: 0.27592, llano: 0.20839, valle: 0.17958, desde: '2026-10-26', hasta: '2026-11-24' };
  }
  const url = `${API}?start_date=${desde}T00:00&end_date=${hasta}T23:59&time_trunc=hour`;
  try {
    const res = await fetch(url, { cf: { cacheTtl: 21_600, cacheEverything: true } } as RequestInit);
    if (!res.ok) return null;
    const json: any = await res.json();
    const raw: any[] | undefined = json?.included?.find((s: any) => s.id === '1001')?.attributes?.values;
    if (!raw || raw.length < 24 * 20) return null;
    const acc = { punta: [0, 0], llano: [0, 0], valle: [0, 0] };
    for (const v of raw) {
      const dt = String(v.datetime);
      const p = periodo(dt.slice(0, 10), Number(dt.slice(11, 13)));
      acc[p][0] += Number(v.value);
      acc[p][1] += 1;
    }
    const avg = (k: keyof typeof acc) => acc[k][0] / acc[k][1] / 1000;
    return { punta: avg('punta'), llano: avg('llano'), valle: avg('valle'), desde, hasta };
  } catch {
    return null;
  }
}
