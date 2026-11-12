# Portfolio QA · Cypress

Batería de pruebas E2E del [portfolio interactivo de Pablo Gutiérrez Mata](https://pablo-archivo-de-la-alianza.wintryapricot2.chatgpt.site). Un proyecto de QA que comprueba la propia experiencia que presenta mi trabajo.

## Objetivo

Verificar que un visitante puede elegir su recorrido, consultar mi perfil, acceder al CV y usar los paneles del mundo interactivo. Los casos se ejecutan sobre el sitio público real, sin simular sus respuestas.

## Baterías por categoría: 15 casos

| Categoría | Casos | Comprobaciones |
| --- | ---: | --- |
| [Entrada](cypress/e2e/entrada/bienvenida.cy.js) | 3 | Elección obligatoria, selección única y acceso al perfil |
| [Navegación](cypress/e2e/navegacion/perfil.cy.js) | 2 | Menú de secciones y vuelta al inicio |
| [Contenido](cypress/e2e/contenido/perfil.cy.js) | 2 | Identidad, experiencia QA y enlaces profesionales |
| [Documentos](cypress/e2e/documentos/cv.cy.js) | 1 | Descarga de un CV PDF válido |
| [Diseño adaptable](cypress/e2e/responsive/perfil.cy.js) | 2 | Móvil y escritorio, sin desbordamiento horizontal |
| [Interacciones](cypress/e2e/interacciones/reino.cy.js) | 5 | Contacto, ayuda, pestañas del CV, mapa y preferencias |

Cada categoría tiene su carpeta y su título en el reporte. Los identificadores originales se conservan para seguir relacionando los casos con el plan de pruebas. Cada test pertenece a una sola categoría principal.

Consultar el [plan de pruebas](docs/plan-de-pruebas.md) y los [resultados de validación](docs/resultados.md).

## Puesta en marcha

Necesitas Node.js 22 y npm. GitHub Actions utiliza esa versión de Node. La instalación de Cypress descarga su navegador de pruebas.

```bash
git clone https://github.com/Pablosky76/portfolio-qa-cypress.git
cd portfolio-qa-cypress
npm ci
npm test
```

| Comando | Uso |
| --- | --- |
| `npm test` | Ejecutar los 15 casos |
| `npm run cy:open` | Abrir Cypress para explorar los casos |
| `npm run test:entrada` | Entrada (3 casos) |
| `npm run test:navegacion` | Navegación (2 casos) |
| `npm run test:contenido` | Contenido y enlaces (2 casos) |
| `npm run test:documentos` | CV en PDF (1 caso) |
| `npm run test:responsive` | Móvil y escritorio (2 casos) |
| `npm run test:interacciones` | Paneles y controles del reino (5 casos) |
| `npm run test:smoke` | Entrada y perfil sin 3D (10 casos, como en la versión inicial) |
| `npm run test:realm` | Alias del comando de interacciones, conservado por compatibilidad |

`npm test` ejecuta la regresión completa. `test:smoke` es una selección para una comprobación rápida, no una séptima categoría: reutiliza los mismos archivos, sin duplicar tests.

Para otro despliegue compatible: `CYPRESS_BASE_URL=https://tu-despliegue.example npm test`.

Si ejecutas desde una aplicación basada en Electron y el proceso no arranca, prueba `env -u ELECTRON_RUN_AS_NODE npm test`.

## Reportes y ejecución automática

Mochawesome genera `cypress/reports/html/index.html`, agrupado por categoría, con detalle por caso y capturas de fallos. Si se ejecuta una sola batería, el reporte contiene solo esa selección y reemplaza el anterior. Las comprobaciones de diseño guardan además capturas de móvil y escritorio. Los reportes generados no se guardan en Git.

GitHub Actions ejecuta la batería en pushes y pull requests a `main`, o manualmente. El reporte y las capturas se conservan como artefactos durante 14 días. No necesita Cypress Cloud ni credenciales del sitio.

## Decisiones de diseño

- IDs existentes para los controles; atributos semánticos y destinos concretos para los enlaces.
- Aislamiento de pruebas activado: cada caso empieza sin cookies ni almacenamiento de la visita anterior.
- Esperas por estados visibles, sin pausas fijas ni reintentos que oculten fallos.
- No se ignoran errores JavaScript de la aplicación.
- Pasos escritos de forma explícita, sin bucles que generen tests ni comandos personalizados. La preparación del reino está en el `beforeEach` de su archivo.
- La música se desactiva y se selecciona calidad fluida durante las pruebas del reino.
- El CV se comprueba por estado HTTP, tipo de contenido y cabecera binaria PDF.

## Límites

Los casos del reino comprueban su interfaz HTML. No certifican la geometría 3D, colisiones, animaciones ni fidelidad visual del avatar. Las capturas son evidencia, no una comparación automática de imágenes. La revisión responsive cubre 390×844 y 1440×900; no equivale a probar dispositivos físicos. Los enlaces externos se verifican por su destino, sin enviar correos ni visitar servicios de terceros.

El sitio puede cambiar de forma independiente a este repositorio. Una caída, cambios de contenido o restricciones del alojamiento pueden causar fallos que deben investigarse, no ocultarse.

## Referencias

Los escenarios están adaptados al comportamiento de este portfolio. La documentación explica los comandos utilizados; no contiene estos casos completos. La [guía de lectura](docs/guia-cypress.md) relaciona cada parte del código con su referencia y explica las comprobaciones menos evidentes.

- [Primer test: visitar, interactuar y comprobar](https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test)
- [Comprobar resultados con should](https://docs.cypress.io/api/commands/should)
- [Consultar recursos con request](https://docs.cypress.io/api/commands/request)
- [Cambiar el tamaño de pantalla con viewport](https://docs.cypress.io/api/commands/viewport)
- [Configuración de Cypress](https://docs.cypress.io/app/references/configuration)
- [Navegadores de Cypress](https://docs.cypress.io/app/references/launching-browsers)
