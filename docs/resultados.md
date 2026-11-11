# Resultados de validación

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

Workflow preparado para ejecutar los mismos 15 casos. Su primera ejecución remota se verificará tras publicar el código; el resultado local no se presenta como resultado de CI.
