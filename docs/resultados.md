# Resultados de validación

## Última revisión · 13 de noviembre de 2026

**120 tests aprobados, 0 fallidos y 0 omitidos** en la [ejecución 43386709260](https://github.com/Pablosky76/portfolio-qa-cypress/actions/runs/43386709260), sobre el commit `825fa69635f9ef28440602b2eba260c3c2b8f4eb` y el sitio público versión 10.

| Tanda | Resultado | Duración de tests | Informe |
| --- | --- | --- | --- |
| 1 | 40 / 40 | 11 min 28 s | [portfolio-qa-tanda1-5](https://github.com/Pablosky76/portfolio-qa-cypress/actions/runs/43386709260/artifacts/14019656346) |
| 2 | 40 / 40 | 10 min 23 s | [portfolio-qa-tanda2-5](https://github.com/Pablosky76/portfolio-qa-cypress/actions/runs/43386709260/artifacts/14019104393) |
| 3 | 40 / 40 | 5 min 43 s | [portfolio-qa-tanda3-5](https://github.com/Pablosky76/portfolio-qa-cypress/actions/runs/43386709260/artifacts/14019014121) |

Las acciones oficiales actualizadas completan la instalación, ejecución y subida de los tres artefactos. Sus registros ya no muestran el aviso de retirada de Node 20. Los informes caducan el 27 de noviembre de 2026. Auditoría local de dependencias repetida el 13 de noviembre: **0 vulnerabilidades conocidas**.

La revisión visual interactiva del render 3D sigue pendiente por el permiso guardado del navegador; tampoco se declara validación en dispositivos físicos ni conformidad completa de accesibilidad. El detalle de alcance y las evidencias anteriores se conservan debajo.


## Ampliación a 120 casos · 12 de noviembre de 2026

**Validación local de la versión corregida: 120 aprobados, 0 fallidos, 0 omitidos.** Duración de las suites: 3 minutos y 31 segundos. Entorno: macOS, Node 25.8.1, Cypress 15.21.1, Chrome 157 sin interfaz; sitio servido localmente con las mismas rutas de entrada y perfil.

| Tanda | Casos | Resultado local |
| --- | ---: | --- |
| Funcionalidad del portfolio y mundo | 40 | 40 aprobados |
| Interacción, pantallas, cámara y movimiento | 40 | 40 aprobados |
| Persistencia, recuperación y accesibilidad | 40 | 40 aprobados |

Los 33 tests del motor del repositorio del sitio también terminan correctamente. No se suman al contador de 120 E2E. Las 13 auditorías de axe forman parte de esos 120 y no detectaron infracciones en los estados examinados.

`npm audit`: 0 vulnerabilidades conocidas al validar esta versión. Se actualizan Cypress y el reporte, y se fijan dependencias indirectas corregidas de Mocha; los motivos están en el README.

### Defectos encontrados y correcciones

La primera ejecución de 100 casos contra el sitio público anterior obtuvo 97 aprobados y tres auditorías fallidas. Se corrigieron en la aplicación los nombres accesibles, las regiones de información, el enlace de créditos y el mapa. El [registro de incidencias](incidencias.md) conserva la evidencia y la corrección.

En las pruebas se investigaron también fallos del entorno: Enter y Escape se reprodujeron en controles mínimos y se resolvieron con eventos nativos; se desactiva la caché durante los fallos de red simulados. La prueba de salida del castillo observa desplazamiento guardado, porque un aviso de proximidad sustituye al mensaje transitorio de ruta. La prueba de parada al cerrar un diálogo comprueba que no se reanuda una tecla anterior; el guardado periódico se pausa mientras el diálogo permanece abierto.

### Límite de verificación visual

Se inspeccionaron capturas de Cypress de la interfaz, pero la escena no quedó suficientemente representada para validar visualmente el render. Se solicitó revisión interactiva; el navegador la bloqueó por un permiso guardado, incluso después de la autorización del usuario. Queda pendiente revisar la escena dibujada, además de dispositivos físicos, lector de pantalla y rendimiento sostenido. Los resultados automáticos no sustituyen esas comprobaciones.

### Sitio público · versión 10

El sitio corregido se publicó correctamente desde el commit fuente `7b53180e99f56ae1de4c7200b8ec92a1eceabf7a`. La ejecución completa contra [producción](https://pablo-archivo-de-la-alianza.wintryapricot2.chatgpt.site) terminó con **120 aprobados, 0 fallidos y 0 omitidos**, en aproximadamente 4 minutos y 39 segundos, el 12 de noviembre de 2026. Incluye las 13 auditorías de accesibilidad. Mismo entorno local de Cypress y Chrome indicado arriba.

### GitHub Actions · comprobado el 13 de noviembre de 2026

La [ejecución 43318709467](https://github.com/Pablosky76/portfolio-qa-cypress/actions/runs/43318709467) terminó correctamente sobre el commit `3f311ab04e0b30baac75c414f8e5957d903d4820`: **120 aprobados, 0 fallidos y 0 omitidos**. Las tres tandas completaron también la subida de informes y capturas.

| Tanda | Resultado | Duración de tests | Informe |
| --- | --- | --- | --- |
| 1 | 40 / 40 | 11 min 32 s | [portfolio-qa-tanda1-4](https://github.com/Pablosky76/portfolio-qa-cypress/actions/runs/43318709467/artifacts/13989368955) |
| 2 | 40 / 40 | 7 min 31 s | [portfolio-qa-tanda2-4](https://github.com/Pablosky76/portfolio-qa-cypress/actions/runs/43318709467/artifacts/13989992400) |
| 3 | 40 / 40 | 8 min 4 s | [portfolio-qa-tanda3-4](https://github.com/Pablosky76/portfolio-qa-cypress/actions/runs/43318709467/artifacts/13990745338) |

Entorno remoto: Ubuntu, Node 22.23.4, Cypress 15.21.1 y Chrome 156/157 según el ejecutor. Los artefactos estaban disponibles al revisarlos y caducan el 26 de noviembre de 2026.

### Mantenimiento del flujo automático

Los registros mostraron un aviso de retirada de Node 20 en las acciones antiguas. Se actualizan las acciones oficiales a checkout 7.0.1, setup-node 7.1.0 y upload-artifact 7.0.2, que utilizan Node 24 para ejecutar la infraestructura. El proyecto continúa usando Node 22. No cambian los 120 escenarios ni sus expectativas. La nueva ejecución completó las tres tandas y la subida de artefactos correctamente; su resultado está registrado al principio de este documento.


## Baterías por categoría · 12 de noviembre de 2026

La reorganización conserva los 15 casos y sus comprobaciones. La ejecución local completa ha terminado con **15 correctos, 0 fallidos y 0 omitidos**, en aproximadamente 17 segundos de ejecución de las suites, y ha generado el reporte HTML por categoría.

| Categoría | Correctos / total |
| --- | ---: |
| Entrada | 3 / 3 |
| Navegación | 2 / 2 |
| Contenido | 2 / 2 |
| Documentos | 1 / 1 |
| Diseño adaptable | 2 / 2 |
| Interacciones | 5 / 5 |

Se ha comprobado también que cada comando de categoría selecciona su archivo y que `test:smoke` selecciona los cinco archivos sin 3D (10 casos), sin duplicados. Entorno local: macOS, Node.js 25.8.1, Cypress 15.15.0 y Electron 138.

La [ejecución de las seis baterías en GitHub Actions](https://github.com/Pablosky76/portfolio-qa-cypress/actions/runs/43266576542) terminó **correctamente** sobre el commit `974e91371726a155e31b4c75089c69592df5ef75`. El reporte y las capturas se guardaron en el artefacto `portfolio-qa-3`.

## Versión simplificada · 12 de noviembre de 2026

Tras sustituir los bucles por pasos explícitos y mover la preparación del reino a su `beforeEach`, se ha ejecutado de nuevo la batería completa en local: **15 correctos, 0 fallidos, 0 omitidos**, en aproximadamente 21 segundos de ejecución de las suites. Se ha generado un nuevo reporte HTML. Se mantiene el mismo alcance de comprobaciones.

Entorno local: macOS, Node.js 25.8.1, Cypress 15.15.0 y Electron 138.

La [ejecución de GitHub Actions de esta versión](https://github.com/Pablosky76/portfolio-qa-cypress/actions/runs/43265200563) también terminó **correctamente**, sobre el commit `5d40a5590d9f7398855d7aa34e281b74abde8fbc`. El reporte y las capturas están disponibles en el artefacto `portfolio-qa-2`. El apartado inferior conserva la evidencia de la primera versión.

## Ejecución local · 11 de noviembre de 2026

Resultado: **15 correctos, 0 fallidos, 0 omitidos**. Duración de las tres suites: aproximadamente 20 segundos, sin incluir arranque del navegador.

| Suite | Correctos / total |
| --- | ---: |
| Entrada | 3 / 3 |
| Perfil | 7 / 7 |
| Reino | 5 / 5 |

Entorno: macOS, Node.js 25.8.1, Cypress 15.15.0 y Electron 138 sin interfaz. Sitio público de producción, versión 9 identificada al iniciar la revisión. La versión de Node en CI es 22.

Evidencia generada: `cypress/reports/html/index.html` y capturas del perfil en móvil y escritorio. No se versionan los archivos generados.

En este entorno se instaló el navegador dentro del proyecto. Para repetir aquí:

```bash
env -u ELECTRON_RUN_AS_NODE CYPRESS_CACHE_FOLDER="$PWD/.cache/Cypress" npm test
```

En un clon nuevo, utilizar las instrucciones normales de instalación del README.

## Ajustes durante el diseño

La primera pasada obtuvo 13/15. Se corrigieron dos expectativas del test tras inspeccionar el comportamiento real:

- El alojamiento redirige `/perfil.html` a `/perfil`; el caso comprueba ahora esa ruta canónica y el contenido del perfil.
- El artículo del CV supera la altura del diálogo. Se comprueba su contenido y se desplaza hasta el encabezado antes de verificar visibilidad.

La segunda pasada completa obtuvo 15/15. Estos ajustes no requirieron cambios en el sitio. No se han desactivado casos ni ignorado errores para conseguir ese resultado.

## GitHub Actions

La [primera ejecución remota](https://github.com/Pablosky76/portfolio-qa-cypress/actions/runs/43106941896) terminó **correctamente** el 11 de noviembre de 2026 a las 22:55 (Europe/Madrid), sobre el commit `48a4233dbcc1bab9519c0b6a13a8c2900c158101`. Estado comprobado el 12 de noviembre de 2026.

GitHub confirmó el éxito de la ejecución de la batería y de la subida del reporte y las capturas. El artefacto `portfolio-qa-1` está disponible en esa ejecución y tiene caducidad prevista para el 25 de noviembre de 2026 a las 22:55 (Europe/Madrid).

Esto verifica la primera ejecución en Ubuntu con Node.js 22, además de la pasada local. No supone que todas las futuras versiones del sitio estén verificadas: cada ejecución comprueba el despliegue público disponible en ese momento.
