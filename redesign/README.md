# Rediseño «Reloj clara»

Carpeta de documentación del rediseño de lafacturadelaluz.es (noviembre de 2026). El sitio no cambia de stack, de URLs, de cálculos ni de fuentes de datos.

## Qué se decidió

- Dirección visual: reloj de 24 horas sobre el fondo claro, con alternancia «Reloj | Barras» (reloj por defecto).
- El H1 de la portada no cambia. La frase grande cambia con la hora: si la hora más barata aún no ha llegado, la anuncia; si ya pasó, dice cómo está la luz ahora y cuándo baja o sube.
- «Ver tarifa» pasa a ser un botón. Mismos enlaces `/ir/<id>`, mismos `rel`.
- Menú con cuatro entradas: Precio hoy, Precio mañana, Comparar tarifas y Guías (ancla a la lista de guías del pie). En móvil, botón «Menú».
- La portada añade el bloque «Las tarifas más baratas este mes» con el mismo cálculo que `/compania-luz-mas-barata`.

## Investigación

Auditoría del sitio anterior, comparación con 14 competidores y referencias: informe «La Factura de la Luz: pesquisa de redesign, fases 1 a 3» (artefacto de Claude). Resumen de los problemas que este rediseño corrige:

1. La frase grande hablaba de una hora que ya había pasado y no decía el precio de ahora.
2. Las barras de las horas baratas tenían 1,29:1 de contraste sobre el fondo. Ahora todos los tonos superan 3:1.
3. El valor de una barra solo salía en `title`. Ahora cada hora es un botón con `aria-label` y el precio se lee al tocarla.
4. «Ver tarifa» era un enlace de texto y la portada no llevaba al comparador.
5. El foco amarillo tenía 1,68:1. Ahora es tinta, 3 px.

## Sistema de diseño

Los tokens están en `src/styles/global.css` (`:root`). Los nombres antiguos (`--l0` a `--l4`, `--bulb`) siguen existiendo como alias.

| Token | Valor | Uso |
|---|---|---|
| `--paper` | `#f6f7f4` | Fondo |
| `--ink` | `#1c2228` | Texto, botón principal, foco |
| `--slate` | `#5e6873` | Texto secundario |
| `--rule` / `--rule-strong` | `#d9ddd6` / `#7b847d` | Líneas / bordes de controles |
| `--scale-0` a `--scale-4` | `#3f9a84` `#2c7f76` `#6f5a9a` `#5a3a80` `#3c2054` | Precio, de más barato a más caro |
| `--now-bg` | `#fff6d1` | Fila de la hora actual |
| `--ok` / `--ok-bg` | `#256b63` / `#e6f2ee` | «La más barata» |

Tipografía: Bricolage Grotesque 700 en títulos y cifras, Figtree en el resto, servidas con `@fontsource`.

Componentes: reloj, barras, alternancia y tabla viven en `src/components/DayView.astro`; `.btn`, `.badge` y `.table-scroll` en `global.css`.

## Cómo se probó

`astro dev` con los datos de prueba, en 360, 390, 768, 1024, 1440 y 1920 px, sobre nueve páginas: sin desbordamiento horizontal ni errores de JavaScript. Se comprobó el toque en una hora, la alternancia, que la elección se recuerda al recargar, el foco con teclado, el menú móvil y que los enlaces `/ir/` siguen redirigiendo.

Capturas en `capturas/`.

## Pendiente

- Probar la lectura del reloj de 24 horas con 4 o 5 personas.
- Índice lateral en guías, ranking y fichas (la columna derecha sigue vacía en escritorio).
- Tabla ancha de batería virtual con primera columna fija.
- Imagen para compartir (`og:image`) con el reloj.
- Medir Core Web Vitals en producción tras el despliegue.
- Las capturas `desk_*.png` y `mob_*.png` de la raíz son del diseño anterior; se pueden mover aquí o borrar.
