# Registro de validación

## Validación ampliada · 13 de noviembre de 2026

Sitio público v18, commit de Sites `e833c91f0f39446ce584b81fd34e3a24e6d82d6d`. Batería QA integrada en `ab08f95`. Entorno local: Cypress 15.21.1, Chrome 157 sin ventana, Node 25.8.1 (Actions usa Node 22).

- Smoke: **8/8 aprobados**, 9 segundos según Cypress.
- Regresión: **128/128 aprobados**, 0 fallidos, 0 pendientes y 0 omitidos, 24 archivos, 4 min 53 s según Cypress.
- Adaptación móvil tras corregir MOV-08: **8/8 aprobados**.
- Inventario: 128 IDs únicos; conserva los 120 originales; tandas 41/44/43 sin omisiones ni duplicados.
- Infraestructura: cinco comprobaciones aprobadas.
- Huella normalizada inicial/final coincidente: `de8a09ccfd887041f4a1cb16c1e9e5df59ee7cec8f8b0f0dbdca77acbe8f551a`. Solo se normalizan los identificadores por petición de Cloudflare; véase regresion.md.

La primera regresión ampliada dio 127/128 y detectó una superposición de la mochila sobre el acceso al castillo en móvil. Se corrigió el producto, se repitió la categoría y después smoke y regresión completas. La primera herramienta de huellas también detectó diferencias debidas a identificadores variables de Cloudflare; se corrigió y añadió una comprobación específica. Los detalles se conservan en incidencias.md.

[Actions de esta integración](https://github.com/Pablosky76/portfolio-qa-cypress/actions/runs/43449756131): **completado correctamente**. Smoke 8/8; regresión 128/128 repartidos en tandas de 41, 44 y 43 casos. Los cuatro trabajos terminaron con éxito, incluidas las comparaciones inicial/final del sitio. La selección smoke pertenece a los 128 escenarios; no se suma como ocho casos únicos adicionales.

Informes, capturas y huellas disponibles hasta el **27 de noviembre de 2026**:

- [Smoke](https://github.com/Pablosky76/portfolio-qa-cypress/actions/runs/43449756131/artifacts/14049667923).
- [Tanda 1](https://github.com/Pablosky76/portfolio-qa-cypress/actions/runs/43449756131/artifacts/14051506996).
- [Tanda 2](https://github.com/Pablosky76/portfolio-qa-cypress/actions/runs/43449756131/artifacts/14052970318).
- [Tanda 3](https://github.com/Pablosky76/portfolio-qa-cypress/actions/runs/43449756131/artifacts/14051811305).

Informe local: `cypress/reports/html/index.html`. Evidencias locales: `qa-evidence/site-before.json` y `site-after.json`; son archivos generados excluidos de Git.

Pendientes manuales: zoom real 200/400 %, lector de pantalla, contraste sobre escena cambiante, WebGL/FPS/memoria y teléfonos físicos. El éxito de Cypress no sustituye estas revisiones.
