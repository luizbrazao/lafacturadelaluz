// Consumos orientativos por aparato. Cada valor lleva su fuente; si no hay fuente pública fiable,
// la página pide al usuario la potencia de la placa del aparato y explica la cuenta.
export interface Aparato {
  slug: string;
  nombre: string; // "lavadora"
  articulo: 'un' | 'una';
  kwh: number; // por uso (o por hora si porHora)
  rango: string;
  unidad: string; // "lavado", "hora de uso"...
  porHora?: boolean; // el consumo se expresa por hora de uso
  horas: number; // duración que usamos para buscar la ventana más barata
  usosSemana: number; // para la estimación mensual
  continuo?: { kwhAno: number }; // aparatos que no se pueden mover de hora (frigorífico)
  explicacion: string;
  consejo: string;
  fuente?: { nombre: string; url: string };
}

export const APARATOS: Aparato[] = [
  {
    slug: 'lavadora',
    nombre: 'lavadora',
    articulo: 'una',
    kwh: 0.5,
    rango: 'unos 0,4 a 0,5 kWh con el programa Eco 40-60 de una lavadora moderna; bastante más con agua caliente',
    unidad: 'lavado',
    horas: 2,
    usosSemana: 4,
    explicacion:
      'La etiqueta energética da el consumo por cada 100 lavados en el programa Eco 40-60. Si pone 49 kWh, cada lavado gasta 0,49 kWh. La OCU calcula que el programa Eco gasta de media un 33 % menos que el algodón normal a 40 ºC, y que el consumo por ciclo no debería pasar de 0,87 kWh.',
    consejo: 'Casi toda la energía se va en calentar el agua: lavar en frío o en Eco ahorra más que cambiar de hora.',
    fuente: { nombre: 'OCU, lavadoras y etiqueta energética', url: 'https://www.ocu.org/electrodomesticos/lavadora/noticias/lavadoras-etiquetado-energetico' },
  },
  {
    slug: 'lavavajillas',
    nombre: 'lavavajillas',
    articulo: 'un',
    kwh: 0.75,
    rango: 'unos 250 a 300 kWh al año, que con un lavado al día son unos 0,7 a 0,8 kWh por lavado',
    unidad: 'lavado',
    horas: 3,
    usosSemana: 7,
    explicacion:
      'La etiqueta da el consumo por cada 100 lavados en programa Eco. Divide entre 100 y tendrás los kWh de cada lavado. Endesa estima entre 250 y 300 kWh al año por equipo.',
    consejo: 'Ponlo lleno y con el programa Eco. Muchos permiten retrasar el inicio para que funcione en las horas baratas.',
    fuente: { nombre: 'Endesa, qué electrodoméstico consume más', url: 'https://www.endesa.com/es/blog/blog-de-endesa/electrodomesticos/que-electrodomestico-consume-mas-electricidad' },
  },
  {
    slug: 'secadora',
    nombre: 'secadora',
    articulo: 'una',
    kwh: 2.5,
    rango: 'entre 2,1 y 4,2 kWh por programa según Endesa; las de bomba de calor gastan menos',
    unidad: 'secado',
    horas: 2,
    usosSemana: 3,
    explicacion:
      'Es de los aparatos que más gastan por uso. La etiqueta da el consumo por cada 100 ciclos de secado: divide entre 100. Las de bomba de calor suelen estar en las mejores clases de la etiqueta.',
    consejo: 'Centrifuga bien antes de secar y, si puedes, tiende la ropa. Si la usas, que sea en las horas baratas.',
    fuente: { nombre: 'Endesa, consejos para reducir el consumo de la lavadora', url: 'https://www.endesa.com/es/blog/blog-de-endesa/luz/consejos-reducir-consumo-lavadora' },
  },
  {
    slug: 'horno',
    nombre: 'horno',
    articulo: 'un',
    kwh: 0.9,
    rango: 'entre 0,81 y 1,03 kWh por ciclo en modo normal y unos 0,7 kWh con aire (convección), según los datos de la etiqueta que recoge la OCU',
    unidad: 'uso de una hora',
    horas: 1,
    usosSemana: 2,
    explicacion: 'El dato de la etiqueta es un ciclo estándar. Un asado largo o a temperatura alta gasta más; precalentar también suma.',
    consejo: 'Usa el modo con aire, no precalientes si la receta no lo necesita y apágalo unos minutos antes de terminar.',
    fuente: { nombre: 'OCU, Horno clásico: ¿cuánto te cuesta al año?', url: 'https://www.ocu.org/electrodomesticos/hornos/noticias/hornos-consumo-anual' },
  },
  {
    slug: 'freidora-de-aire',
    nombre: 'freidora de aire',
    articulo: 'una',
    kwh: 0.3,
    rango: 'unos 0,3 kWh para una ración de patatas en la prueba de la OCU, frente a 0,86 kWh en el horno',
    unidad: 'uso',
    horas: 1,
    usosSemana: 4,
    explicacion: 'Gasta poco porque calienta un espacio pequeño y apenas necesita precalentarse. Una de 1.500 W funcionando 20 minutos gasta 0,5 kWh como máximo.',
    consejo: 'Para raciones pequeñas gasta bastante menos que el horno. Para cantidades grandes, el horno puede compensar.',
    fuente: { nombre: 'OCU, freidora de aire, horno o vitro', url: 'https://www.ocu.org/electrodomesticos/freidoras/consejos/freidora-aire-horno-vitro' },
  },
  {
    slug: 'vitroceramica',
    nombre: 'vitrocerámica',
    articulo: 'una',
    kwh: 1.5,
    rango: 'entre 1,2 y 2,5 kWh según el IDAE; la inducción gasta entre un 20 y un 40 % menos según la OCU',
    unidad: 'hora de uso',
    porHora: true,
    horas: 1,
    usosSemana: 7,
    explicacion: 'Depende de cuántos fuegos enciendas y a qué potencia. Con un fuego a media potencia gastas bastante menos que el dato de la placa.',
    consejo: 'Tapa las ollas, usa recipientes del tamaño del fuego y aprovecha el calor residual apagando antes.',
    fuente: { nombre: 'Repsol, qué gasta más: vitrocerámica o freidora de aire (dato del IDAE)', url: 'https://www.repsol.es/particulares/asesoramiento-consumo/que-gasta-mas-vitroceramica-o-freidora-aire/' },
  },
  {
    slug: 'frigorifico',
    nombre: 'frigorífico',
    articulo: 'un',
    kwh: 0.68,
    rango: 'entre 100 y 300 kWh al año un frigorífico eficiente, según el IDAE',
    unidad: 'día',
    horas: 24,
    usosSemana: 7,
    continuo: { kwhAno: 250 },
    explicacion: 'Funciona todo el día, así que no puedes elegir la hora. El consumo anual viene en la etiqueta energética, en kWh al año.',
    consejo: 'Lo que sí puedes hacer: no lo pongas junto al horno o al sol, deja espacio detrás y pon el frigorífico a unos 5 ºC.',
    fuente: { nombre: 'El Cronista, con datos del IDAE', url: 'https://www.cronista.com/espana/actualidad-es/el-electrodomestico-que-todos-tienen-en-casa-gasta-65-veces-mas-que-la-nevera-y-dispara-la-factura-de-luz' },
  },
  {
    slug: 'termo-electrico',
    nombre: 'termo eléctrico',
    articulo: 'un',
    kwh: 1.5,
    rango: 'lo que marque su potencia: un termo de 1.500 W gasta 1,5 kWh por cada hora que está calentando',
    unidad: 'hora calentando',
    porHora: true,
    horas: 3,
    usosSemana: 7,
    explicacion: 'Mira la potencia en la placa del termo. Lo que gasta al día depende del agua caliente que uses y del aislamiento.',
    consejo: 'Con un programador o un enchufe con horario puedes hacer que caliente solo en las horas baratas.',
  },
  {
    slug: 'radiador-electrico',
    nombre: 'radiador eléctrico',
    articulo: 'un',
    kwh: 1.5,
    rango: 'lo que marque su potencia: uno de 1.500 W gasta 1,5 kWh por hora a máxima potencia; con termostato, menos',
    unidad: 'hora de uso',
    porHora: true,
    horas: 1,
    usosSemana: 14,
    explicacion: 'La potencia está en la placa del aparato. El termostato lo apaga y enciende, así que en la práctica gasta menos que su potencia máxima.',
    consejo: 'Calienta solo la habitación en la que estás y baja el termostato: cada grado menos se nota en la factura.',
  },
  {
    slug: 'aire-acondicionado',
    nombre: 'aire acondicionado',
    articulo: 'un',
    kwh: 1,
    rango: 'depende de la potencia eléctrica del equipo (no de la frigorífica) y de lo que trabaje; aquí usamos 1 kWh por hora como ejemplo',
    unidad: 'hora de uso',
    porHora: true,
    horas: 1,
    usosSemana: 14,
    explicacion: 'La etiqueta indica la potencia eléctrica que consume. Un equipo inverter, una vez alcanzada la temperatura, consume bastante menos que su máximo.',
    consejo: 'Cada grado más de termostato en verano reduce el consumo. Cierra persianas en las horas de sol.',
  },
];
