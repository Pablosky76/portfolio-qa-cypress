# Cómo leer los tests

La idea es poder seguir cada caso de arriba abajo: preparar la página, hacer algo y comprobar qué ocurre. Es la estructura que explica la [guía del primer test de Cypress](https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test).

## Por dónde empezar

1. `entrada.cy.js`: abrir la web, elegir una opción y comprobar la navegación.
2. `perfil.cy.js`: contenido, enlaces, CV y tamaños de pantalla.
3. `reino.cy.js`: preparar la entrada al mundo y probar sus paneles.

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
