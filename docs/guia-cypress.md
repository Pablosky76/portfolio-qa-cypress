# Cómo leer los tests

La idea es poder seguir cada caso de arriba abajo: preparar la página, hacer algo y comprobar qué ocurre. Es la estructura que explica la [guía del primer test de Cypress](https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test).

## Por dónde empezar

Todos los archivos están en `cypress/e2e/`, separados por categoría:

1. `entrada/bienvenida.cy.js`: abrir la web, elegir una opción y continuar.
2. `navegacion/perfil.cy.js`: recorrer el menú y volver al inicio.
3. `contenido/perfil.cy.js`: comprobar información y enlaces profesionales.
4. `documentos/cv.cy.js`: comprobar el PDF.
5. `responsive/perfil.cy.js`: consultar el perfil en móvil y escritorio.
6. `interacciones/reino.cy.js`: preparar la entrada al mundo y probar sus paneles.

Por ejemplo, `npm run test:navegacion` ejecuta solo los dos casos de navegación. `npm test` ejecuta los 120 casos de las tres tandas. Los comandos completos están en el README.

`describe` agrupa casos, `it` define un caso y `beforeEach` prepara la página antes de cada uno. Están escritos por separado para que sea fácil ver qué falla. Se conservan los identificadores del plan de pruebas.

## Un ejemplo del proyecto

```js
cy.get('label[for="entry-profile"]').click();
cy.get('#entry-continue').click();
cy.location('pathname').should('eq', '/perfil');
cy.get('h1').should('be.visible').and('contain', 'Gutiérrez Mata');
```

Primero se pulsa la etiqueta del recorrido profesional. Después se continúa. Por último se comprueban la ruta y el encabezado de la página. El selector con `#` busca un ID del HTML. El alojamiento redirige `perfil.html` a `/perfil`, por eso se espera esa ruta.

## Documentación utilizada

| Referencia | Dónde se aplica |
| --- | --- |
| [Primer test E2E](https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test) | Estructura de los archivos, `visit`, selección de elementos y clics |
| [should](https://docs.cypress.io/api/commands/should) | Visibilidad, texto, atributos y estados de botones |
| [request](https://docs.cypress.io/api/commands/request) | Consulta del CV con `encoding: 'binary'` en PER-04 |
| [viewport](https://docs.cypress.io/api/commands/viewport) | PER-06 y PER-07, móvil y escritorio |

Son referencias de los comandos, no la fuente del contenido profesional ni de los selectores. Los selectores y resultados esperados proceden del portfolio.

## Las comprobaciones que requieren más explicación

**El PDF.** Se obtiene el `href` del enlace y se consulta con `cy.request`. Dentro de `.then` se comprueba la respuesta recibida: HTTP 200, tipo PDF, cabecera `%PDF-` y un tamaño mínimo. Esto detecta, por ejemplo, un enlace que entregue una página HTML en lugar del CV. No demuestra que el texto del CV esté actualizado.

**El ancho de página.** `scrollWidth` es el ancho del contenido y `clientWidth` el ancho visible. Si el primero es mayor, puede haber desplazamiento horizontal. Se permite un píxel de diferencia por redondeo. Son propiedades del navegador; `cy.document` permite acceder al documento.

**El panel del CV.** Algunas pestañas tienen más texto del que cabe en el diálogo. Se comprueba el contenido y se desplaza hasta su encabezado antes de verificar que sea visible.

**La preparación del reino.** El `beforeEach` elige el recorrido, espera a que aparezcan los ajustes y selecciona PC, calidad fluida y música desactivada. El tiempo máximo de 60 segundos da margen a la carga del mundo; no obliga a esperar un minuto.

## Decisiones sencillas

- Hay algo de repetición para poder leer cada escenario sin saltar a otras funciones.
- Móvil y escritorio tienen su propio `it`.
- Las cinco pestañas del CV se prueban con pasos explícitos.
- El archivo `support/e2e.js` solo activa el reporte.
- No se han añadido pausas fijas ni se han quitado comprobaciones para simplificar.

Antes de presentar el proyecto, conviene ejecutar un caso en `npm run cy:open`, seguir sus comandos y explicar qué fallo detectaría cada `should`. Los enlaces ayudan a estudiar los comandos; entender los resultados esperados requiere conocer el sitio.


## Ampliación en tres tandas

Estudia primero `mundo3d/acciones.cy.js`: interacción seguida de una aserción. Después, `teclado/foco.cy.js`: `findByRole` busca el control por el nombre que expone a tecnologías de asistencia. Por último, `recuperacion/fallos.cy.js`: el test prepara una condición de fallo y comprueba cómo responde la aplicación.

| Comando o biblioteca | Para qué se usa aquí | Documentación |
| --- | --- | --- |
| `trigger` | Eventos de los manejadores del juego; no son entrada física real | [Cypress: trigger](https://docs.cypress.io/api/commands/trigger) |
| `press` | Tab y el manejador Enter del mapa en Chrome | [Cypress: press](https://docs.cypress.io/api/commands/press) |
| `intercept` y `wait('@alias')` | Provocar un fallo de descarga y esperar esa petición | [Cypress: intercept](https://docs.cypress.io/api/commands/intercept) |
| `stub` | Simular permisos de portapapeles o ausencia de WebGL | [Cypress: stub](https://docs.cypress.io/api/commands/stub) |
| `visit` con `onBeforeLoad` | Preparar datos guardados corruptos antes de iniciar la aplicación | [Cypress: visit](https://docs.cypress.io/api/commands/visit) |
| `reload` | Comprobar persistencia real dentro del mismo caso | [Cypress: reload](https://docs.cypress.io/api/commands/reload) |
| `findByRole` y `findByLabelText` | Seleccionar controles por nombre y etiqueta | [Testing Library para Cypress](https://testing-library.com/docs/cypress-testing-library/intro/) |
| `injectAxe` y `checkA11y` | Auditar el documento visible y guardar los problemas | [cypress-axe](https://github.com/component-driven/cypress-axe) |

`then` permite leer una vez un objeto del navegador o configurar un stub. `should` vuelve a comprobar una condición hasta que se cumple o termina el tiempo de espera. En el test de movimiento se usa `should` porque la aplicación guarda la posición periódicamente; no añadimos una pausa fija de tres segundos.

Un test puede tener varias aserciones que describan un único resultado, como entrar al castillo y mostrar su salida. No se convierte cada atributo en otro test para aumentar el contador. Las auditorías abarcan el documento visible completo, con todas las reglas predeterminadas de axe; no llevan `skipFailures` ni filtros para ocultar errores.

Para explicar un caso: indica el riesgo, la preparación, la acción y la evidencia que demuestra el resultado. Para explicar sus límites: distingue el estado HTML observado de lo que realmente se ve y se siente al jugar.


## Eventos nativos: un problema real de las pruebas

En el entorno local, `cy.press` no activaba botones HTML con Enter ni cerraba diálogos nativos con Escape. Se reprodujo el problema en controles mínimos, sin lógica del portfolio, con Cypress 15.15.0 y 15.21.1. Los mismos dos ejemplos pasaron con `cypress-real-events`. Por eso los casos de Enter y Escape utilizan `cy.realPress`, conservando la acción y la expectativa original.

Los casos CAM e INP usan `realMouseWheel`, `realMouseDown`, `realMouseMove` y `realMouseUp` para ejercitar captura de puntero y arrastre. Referencia: [documentación de cypress-real-events](https://github.com/dmtrKovalenko/cypress-real-events). Estos comandos requieren un navegador Chromium; la batería está configurada para Chrome. No son comandos propios escritos para el proyecto.

Los tests de parada esperan guardados posteriores a la frenada y comprueban que la posición ya no cambia. El umbral de tiempo pertenece a la condición observada; no se usa una pausa fija para dar por hecho que el personaje se ha detenido.

En `recuperacion/fallos.cy.js` se desactiva la caché de Chrome durante cada caso y se restaura al terminar. Si el módulo ya está en caché, no se hace una petición y `intercept` no puede simular su fallo. Es una de las soluciones descritas en [Cypress: intercept y caché](https://docs.cypress.io/api/commands/intercept#cyintercept-and-request-caching). Esta preparación afecta al navegador de pruebas, no al sitio publicado.
