# Resultados de validación

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
