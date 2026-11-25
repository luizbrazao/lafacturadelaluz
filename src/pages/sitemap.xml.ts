import type { APIRoute } from 'astro';

const pages = ['/', '/precio-luz-manana', '/comparador-tarifas-luz', '/compania-luz-mas-barata', '/dar-de-alta-la-luz', '/cambio-titular-luz', '/companias/iberdrola', '/companias/octopus-energy', '/companias/gana-energia', '/companias/holaluz', '/precio-luz-hoy-endesa', '/precio-luz-hoy-iberdrola', '/precio-luz-hoy-naturgy', '/bono-social-luz', '/que-potencia-contratar', '/tarifa-luz-coche-electrico', '/como-ganamos-dinero', '/aviso-legal', '/privacidad', '/cookies'];

export const GET: APIRoute = ({ site }) => {
  const urls = pages.map((p) => `<url><loc>${new URL(p, site).href}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
