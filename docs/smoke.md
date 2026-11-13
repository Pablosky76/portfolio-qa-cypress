# Smoke · ocho comprobaciones esenciales

Estado: integrado; smoke local aprobado (8/8) contra Sites v18 el 13 de noviembre de 2026. La regresión y Actions se registran en resultados.

| ID | Comprueba | Archivo |
| --- | --- | --- |
| ENT-01 | Entrada disponible y elección requerida | entrada/smoke-perfil.cy.js |
| ENT-03 | Acceso al perfil desde la entrada, sin canvas | entrada/smoke-perfil.cy.js |
| PER-01 | Identidad, experiencia, tecnologías y formación | entrada/smoke-perfil.cy.js |
| PER-04 | CV responde con cabecera y contenido PDF | entrada/smoke-perfil.cy.js |
| REI-01 | Contacto abre, muestra correo y cierra | personaje/smoke-reino.cy.js |
| MUN-01 | Canvas visible con tamaño válido y modo de exploración | personaje/smoke-reino.cy.js |
| MUN-02 | Montura cambia estado y nombre observables | personaje/smoke-reino.cy.js |
| TEC-13 | I abre/cierra mochila y recupera foco en el mundo | personaje/smoke-reino.cy.js |

Los cuerpos y preparaciones se trasladan desde sus suites de origen: no se duplican, ni se registran mediante bucles. Cada caso conserva su ID. Smoke es una selección de la regresión; ejecutarla primero y después toda la regresión repite esa selección deliberadamente, sin duplicar código.

Los comandos de categoría que antes seleccionaban archivos ahora partidos incluyen su archivo smoke compartido. Por ello test:entrada, test:contenido y test:documentos también ejecutan los otros casos profesionales esenciales; test:interacciones, test:mundo3d y test:teclado incluyen los esenciales del reino. test:area:* sigue agrupando por carpeta. Los casos individuales se localizan por su ID.

## Ejecución

1. `npm run test:estructura`: IDs únicos, ocho casos smoke, rutas válidas y todos los archivos en una sola tanda.
2. `npm ci` y `npm run test:smoke`: abrir Chrome y ejecutar lo esencial.
3. `npm run test:regresion`: batería completa. También se conservan las tres tandas de CI.

GitHub Actions hace smoke primero; las tandas dependen de su éxito. Si falla, las tandas quedan omitidas, no aprobadas. Reportes smoke y de cada tanda usan artefactos distintos. No publicar cambios del sitio durante la ejecución: anotar versión/commit del sitio estable, commit QA, fecha y enlace del run en resultados.

La ejecución inicial local tardó 11 segundos según Cypress. Smoke comprueba fallos graves, no reemplaza colisiones completas, lector de pantalla, zoom, FPS ni dispositivos reales. Canvas visible no garantiza corrección visual del 3D.
