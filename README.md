# Portfolio QA · Cypress

Batería de pruebas E2E del [portfolio interactivo de Pablo Gutiérrez Mata](https://pablo-archivo-de-la-alianza.wintryapricot2.chatgpt.site). Un proyecto de QA que comprueba la propia experiencia que presenta mi trabajo.

## Objetivo

Verificar que un visitante puede elegir su recorrido, consultar mi perfil, acceder al CV y usar los paneles del mundo interactivo. Los casos se ejecutan sobre el sitio público real, sin simular sus respuestas.

## Alcance: 15 casos

| Suite | Casos | Comprobaciones |
| --- | ---: | --- |
| Entrada | 3 | Elección obligatoria, selección única y acceso al perfil |
| Perfil | 7 | Contenido, navegación, enlaces de contacto, PDF, vuelta al inicio y dos tamaños de pantalla |
| Reino | 5 | Contacto, ayuda, pestañas del CV, mapa y preferencias de controles |

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
| `npm run test:smoke` | Ejecutar entrada y perfil (10 casos) |
| `npm run test:realm` | Ejecutar los paneles del reino (5 casos) |

Para otro despliegue compatible: `CYPRESS_BASE_URL=https://tu-despliegue.example npm test`.

Si ejecutas desde una aplicación basada en Electron y el proceso no arranca, prueba `env -u ELECTRON_RUN_AS_NODE npm test`.

## Reportes y ejecución automática

Mochawesome genera `cypress/reports/html/index.html`, con detalle por caso y capturas de fallos. Las comprobaciones de diseño guardan además capturas de móvil y escritorio. Los reportes generados no se guardan en Git.

GitHub Actions ejecuta la batería en pushes y pull requests a `main`, o manualmente. El reporte y las capturas se conservan como artefactos durante 14 días. No necesita Cypress Cloud ni credenciales del sitio.

## Decisiones de diseño

- IDs existentes para los controles; atributos semánticos y destinos concretos para los enlaces.
- Aislamiento de pruebas activado: cada caso empieza sin cookies ni almacenamiento de la visita anterior.
- Esperas por estados visibles, sin pausas fijas ni reintentos que oculten fallos.
- No se ignoran errores JavaScript de la aplicación.
- Un único comando reutilizable para entrar al reino. Las aserciones permanecen junto a cada escenario.
- La música se desactiva y se selecciona calidad fluida durante las pruebas del reino.
- El CV se comprueba por estado HTTP, tipo de contenido y cabecera binaria PDF.

## Límites

Los casos del reino comprueban su interfaz HTML. No certifican la geometría 3D, colisiones, animaciones ni fidelidad visual del avatar. Las capturas son evidencia, no una comparación automática de imágenes. La revisión responsive cubre 390×844 y 1440×900; no equivale a probar dispositivos físicos. Los enlaces externos se verifican por su destino, sin enviar correos ni visitar servicios de terceros.

El sitio puede cambiar de forma independiente a este repositorio. Una caída, cambios de contenido o restricciones del alojamiento pueden causar fallos que deben investigarse, no ocultarse.

## Referencias

- [Configuración de Cypress](https://docs.cypress.io/app/references/configuration)
- [Navegadores de Cypress](https://docs.cypress.io/app/references/launching-browsers)
