# Portfolio QA · Cypress

128 casos para el [portfolio 3D de Pablo Gutiérrez Mata](https://pablo-archivo-de-la-alianza.wintryapricot2.chatgpt.site), organizados en tres tandas. Cubren tanto el recorrido profesional como el mundo interactivo.

## Las tres tandas

| Tanda | Casos | Objetivo | Herramientas añadidas |
| --- | ---: | --- | --- |
| 1 | 41 | Entrada, perfil, CV, personaje, cámara, salto, castillo y ajustes | Cypress y reporte Mochawesome |
| 2 | 44 | Teclado, foco, mapa, pantallas, cámara, movimiento y contacto | Testing Library y eventos nativos con cypress-real-events |
| 3 | 43 | Visitas guardadas, errores de carga y accesibilidad | cypress-axe y axe-core |

Son 128 escenarios distintos, no 128 ejecuciones del mismo caso en diferentes navegadores. La reorganización smoke integra los bloques de teclado y lectura: la batería tiene 128 casos, ocho de ellos seleccionados como smoke. Los resultados anteriores de 120 casos son históricos. Los 24 archivos se agrupan en cinco áreas; las tandas son grupos de ejecución independientes de las carpetas. El [plan e inventario](docs/plan-de-pruebas.md) relaciona los IDs con sus escenarios; los [resultados](docs/resultados.md) distinguen comprobaciones aprobadas, fallos y límites.

## Organización por áreas

| Carpeta | Contenido | Casos | Comando |
| --- | --- | ---: | --- |
| `entrada/` | Bienvenida, contenido profesional, CV, pantallas y contacto | 12 | `npm run test:area:entrada` |
| `navegacion/` | Menús, paneles, castillo, mapa y foco del teclado | 35 | `npm run test:area:navegacion` |
| `personaje/` | Acciones, cámara, movimiento, controles y preferencias | 38 | `npm run test:area:personaje` |
| `persistencia/` | Visitas guardadas y recuperación ante fallos | 27 | `npm run test:area:persistencia` |
| `accesibilidad/` | Auditorías automáticas con axe | 16 | `npm run test:area:accesibilidad` |

Los comandos por categoría seleccionan archivos completos: algunos incluyen casos smoke de otras categorías al compartir archivo. `test:area:entrada` reúne toda el área de entrada. Las tandas son de 41, 44 y 43 casos y no dependen de cuántas carpetas haya.

## Ejecutar

Necesitas Node.js 22, npm y Google Chrome instalado. GitHub Actions utiliza Node 22 y Chrome del entorno de ejecución.

```bash
npm ci
npm test
npm run test:tanda1
npm run test:tanda2
npm run test:tanda3
npm run cy:open
```

`npm test` ejecuta los 128 casos. Las tandas ejecutan 41, 44 y 43 respectivamente. También existen comandos por categoría, por ejemplo `npm run test:mapa`, `npm run test:persistencia` y `npm run test:accesibilidad`. `test:smoke` conserva los 10 casos de entrada y perfil; `test:realm` conserva el alias de los cinco casos iniciales de interacciones.

Para otro despliegue compatible: `CYPRESS_BASE_URL=https://tu-despliegue.example npm test`. Si ejecutas desde una aplicación basada en Electron: `env -u ELECTRON_RUN_AS_NODE npm test`.

## Leer el código

Cada `it` tiene un objetivo y un ID. La preparación está visible en el `beforeEach`; no hay comandos propios ni bucles generando casos. Se usan `visit`, `get`, `click` y `should` como base. Los escenarios con teclado, almacenamiento y fallos de red añaden comandos concretos explicados en la [guía de Cypress](docs/guia-cypress.md).

Los casos están adaptados a esta aplicación. La documentación explica los comandos; no contiene estos tests completos ni sustituye entenderlos. Las bibliotecas adicionales tienen sus propias referencias oficiales.

## Reportes y ejecución automática

Mochawesome genera `cypress/reports/html/index.html` con resultados por categoría y capturas de fallos. Los informes de axe con barreras detectadas se guardan en `cypress/reports/axe`. Los resultados generados están excluidos de Git. Cada ejecución reemplaza el HTML anterior y limpia los JSON de axe anteriores.

GitHub Actions ejecuta las tres tandas en trabajos separados y conserva reportes y capturas durante 14 días. Los fallos de accesibilidad hacen fallar la tanda correspondiente: no se silencian reglas ni se marcan casos como aprobados cuando fallan.

## Qué se simula y qué se prueba realmente

- Los recorridos normales usan el sitio publicado real.
- Las pruebas de recuperación interceptan recursos concretos para provocar errores de red o preparan almacenamiento inválido antes de cargar la página.
- Las pruebas de copia simulan permiso concedido o denegado; no modifican tu portapapeles.
- La prueba de compatibilidad simula que no existe WebGL y deja que la aplicación ejecute su render alternativo.
- `cy.press` comprueba Tab; `cy.realPress` comprueba Enter y Escape en Chrome; `trigger` envía eventos sintéticos para los manejadores del juego. No equivale a una prueba física de teclado, ratón o joystick.
- Se observa el desplazamiento mediante la posición guardada por la aplicación. No se llama a funciones internas para mover al personaje.

## Límites

128 casos no garantizan por sí solos una calidad total. No hay comparación de píxeles, medición de FPS, pruebas completas de colisiones ni comprobación visual de mallas y animaciones. Un canvas visible con dimensiones válidas no demuestra que todos los objetos 3D se dibujen correctamente. Los tamaños de pantalla simulados no sustituyen dispositivos táctiles reales.

Axe detecta parte de los problemas del documento HTML; no evalúa la comprensión de la escena 3D ni certifica conformidad WCAG. Quedan revisiones manuales de lector de pantalla, contraste visual sobre la escena, navegación completa, rendimiento, audio y dispositivos reales. El sitio puede cambiar independientemente de este repositorio; los fallos deben investigarse antes de modificar una expectativa.

## Mantenimiento de herramientas

Versiones fijadas en `package-lock.json`. Cypress 15.21.1 y el reporte 5.0.0 sustituyen versiones con avisos de seguridad. Los `overrides` de `glob` y `minimatch` se limitan a Mocha, que todavía declara versiones vulnerables en sus dependencias. Retirarlos cuando Mocha incorpore versiones corregidas y repetir la batería y la generación del HTML. No son dependencias que se publiquen en el portfolio.

Para revisar herramientas: `npm audit`. Un resultado sin avisos solo describe la base de vulnerabilidades disponible en ese momento.

Los cambios de accesibilidad detectados por esta batería se registran en [incidencias](docs/incidencias.md), con su reproducción y corrección. Sirven como ejemplos concretos para explicar cómo una prueba aporta información y protege una corrección.

Para estudiar los casos antes de una entrevista: [entender y explicar el proyecto](docs/explicar-el-proyecto.md).

Las acciones oficiales de GitHub se fijan en versiones concretas: [checkout 7.0.1](https://github.com/actions/checkout/releases/tag/v7.0.1), [setup-node 7.1.0](https://github.com/actions/setup-node/releases/tag/v7.1.0) y [upload-artifact 7.0.2](https://github.com/actions/upload-artifact/releases/tag/v7.0.2). Su entorno interno usa Node 24; los tests del proyecto siguen ejecutándose con Node 22.


## Smoke y regresión

`npm run test:smoke` selecciona ocho casos existentes en dos archivos, sin copiar sus cuerpos. `npm run test:regresion` ejecuta todos los casos, incluida esa misma selección. `npm run test:estructura` comprueba IDs únicos y la cobertura de las tandas antes de abrir Chrome. Consulta [smoke](docs/smoke.md) para el alcance y los límites.

## Validar una versión

Consulta [regresión](docs/regresion.md) antes de ejecutar y completa el [registro de validación](docs/validacion-pendiente.md) con evidencias reales. Actions compara las huellas de los recursos declarados al principio/final de cada trabajo. Una diferencia invalida la referencia de versión. `npm run test:infra` comprueba esa herramienta sin abrir el navegador ni acceder al sitio.
