// Derechos de acometida en baja tensión (Orden ITC/3519/2009, anexo V), sin IVA.
// Vigentes en 2026 según la guía de la CNMC «Cómo modificar las condiciones del contrato».
export const ACOMETIDA = {
  extensionKw: 17.374714, // €/kW: alta nueva o suministro dado de baja hace más de 3 años
  accesoKw: 19.703137, // €/kW: toda alta o reactivación, y al subir potencia
  enganche: 9.04476, // € fijo por actuación
  vigenciaExtensionAnos: 3,
};

export type Situacion = 'nueva' | 'baja-mas-3' | 'baja-menos-3';

export function costeAlta(kw: number, situacion: Situacion, iva: number) {
  const extension = situacion === 'baja-menos-3' ? 0 : kw * ACOMETIDA.extensionKw;
  const acceso = kw * ACOMETIDA.accesoKw;
  const enganche = ACOMETIDA.enganche;
  const base = extension + acceso + enganche;
  return { extension, acceso, enganche, base, total: base * (1 + iva) };
}
