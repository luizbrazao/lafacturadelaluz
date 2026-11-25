// Enlaces de salida que no son tarifas de luz (por ejemplo, servicios para quien se muda).
// Pasan por /ir/<id> igual que las ofertas, para contar el clic.

export interface Enlace {
  id: string;
  nombre: string; // marca, para el registro del clic
  url: string; // página oficial
  afiliado?: { url: string; red: string }; // solo si hay acuerdo activo: se marca «Patrocinado»
  consultado: string; // AAAA-MM-DD
}

export const ENLACES: Enlace[] = [
  {
    id: 'anyvan-mudanza',
    nombre: 'AnyVan',
    // Presupuesto instantáneo de mudanza por ruta.
    url: 'https://www.anyvan.com/es/precios-instantaneos/mudanzas/ruta',
    consultado: '2026-11-25',
  },
];

// Precios de ejemplo publicados por AnyVan en www.anyvan.com/es (consultado el 25/11/2026).
// Son ejemplos de trabajos concretos, no tarifas: el precio real depende de lo que muevas y de la fecha.
export const EJEMPLOS_MUDANZA = {
  fuente: 'https://www.anyvan.com/es',
  consultado: '2026-11-25',
  casos: [
    { ruta: 'Tarragona → Barcelona', precio: 203 },
    { ruta: 'Dentro de Madrid (Tetuán → Pirámides)', precio: 338 },
    { ruta: 'Burgos → Pontevedra', precio: 473 },
    { ruta: 'Catarroja → Alginet (Valencia)', precio: 650 },
  ],
};
