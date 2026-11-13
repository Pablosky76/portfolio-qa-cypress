# Regresión · comprobar antes de dar una versión por válida

Estado: paquete integrado. Consulta docs/resultados.md y docs/validacion-pendiente.md para las ejecuciones reales; los resultados históricos se conservan.

## Aplicar el paquete una sola vez

Base remota revisada: 0846771f6d333faa2035bc9d518ef2d3f60a1dbe. El parche final contiene teclado, lectura, smoke y este bloque de regresión; sustituye los parches anteriores.

1. Revisar main remoto y conservar cualquier cambio posterior de otro chat. Ejecutar `git apply --check RUTA_AL_PARCHE` antes de aplicar. Si no encaja, reconciliar el diff; no forzarlo ni restablecer el repositorio.
2. Aplicar una vez. No copiar además teclado.cy.js o lectura.cy.js por separado.
3. Ejecutar `npm ci`, `npm run test:estructura` y `npm run test:infra`.
4. Mantener el sitio sin publicaciones durante toda la validación. Ejecutar `npm run test:smoke` y después `npm run test:regresion`, o dejar que Actions haga smoke y las tres tandas dependientes.
5. Investigar cada fallo antes de cambiar las expectativas. Repetir la categoría afectada después de corregir; ejecutar la regresión completa tras el último cambio relevante.

## Qué cubre

128 escenarios únicos, ocho seleccionados como smoke. La regresión incluye entrada, perfil/CV, contacto, paneles, mapa, castillo, personaje, teclado, persistencia, recuperación, lectura y accesibilidad automática. Son 128 escenarios, no 128 ejecuciones por navegador.

Las cinco comprobaciones de test:infra pertenecen a las herramientas de evidencia; no se suman a los 128 E2E. Los tests locales del motor pertenecen al repositorio del sitio y tampoco se suman.

## Referencia del despliegue

Actions lee una lista explícita de HTML, JS, CSS y CV con SHA-256. En el HTML se normalizan únicamente los identificadores por petición del script de seguridad de Cloudflare (`r`, `t`, `ray`); los demás bytes se conservan. La primera lectura de smoke genera una referencia; el final de smoke y el inicio/final de cada tanda deben coincidir con ella. Los JSON registran URL, fecha, commit QA y hashes por recurso en qa-evidence/. Se guardan junto con informes y capturas en artefactos de 14 días.

Esta comparación detecta diferencias presentes en esas lecturas. No garantiza que el sitio no haya cambiado momentáneamente y vuelto a su estado anterior durante las pruebas. Tampoco incluye todos los recursos: audio y vendor quedan fuera de la lista. No llamar a la referencia "commit del sitio": es una huella de bytes publicados. Anotar aparte la versión y commit de Sites cuando se conozcan.

Un recurso ausente o una lectura fallida invalidan la comprobación; no se omiten silenciosamente. Si smoke falla, las tandas dependientes no se ejecutan: informar que quedaron omitidas, no aprobadas.

En ejecución local se pueden usar `node scripts/site-fingerprint.cjs before` y después `EXPECTED_SITE_FINGERPRINT=HUELLA node scripts/site-fingerprint.cjs after`. Usar en ambos pasos la misma CYPRESS_BASE_URL que en Cypress. La referencia no se publica ni requiere secretos.

## Investigar un fallo

- Leer ID, nombre del caso, error y captura. Consultar el informe de esa tanda.
- Reproducir el comportamiento antes de decidir si falla el producto, el test o el entorno.
- Cambiar la expectativa solo si el comportamiento deseado cambió y queda documentado. Ejemplo: Escape ahora devuelve el foco al botón que abrió el panel.
- Si falla la huella del sitio, repetir con un despliegue estable; no mezclar esa ejecución con una anterior para anunciar un aprobado completo.
- No añadir esperas fijas, reintentos o excepciones ignoradas solo para obtener verde.

## Registro al terminar

Completar docs/validacion-pendiente.md con datos reales y enlaces. Conservar los fallos anteriores como historial. No asignar conformidad WCAG, precisión visual 3D o rendimiento móvil a partir del éxito de Cypress/axe.

Pendientes manuales: lector de pantalla, zoom real 200/400%, contraste sobre escena cambiante, WebGL/FPS/memoria y teléfonos físicos.
