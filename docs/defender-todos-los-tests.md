# Cómo defender mi proyecto de QA con Cypress

Guía de estudio de Pablo Gutiérrez Mata. Revisión: 14 de noviembre de 2026.

Código de referencia del repositorio QA: `a9bb54443c36f97e097422410292b9f24be1b1b2`. Si cambian los tests, revisa las fichas y sus enlaces antes de usar la guía.

Esta guía acompaña al código real del proyecto. No sustituye ejecutar los casos ni demuestra por sí sola que los domines. Las respuestas en primera persona son modelos para adaptar después de comprobarlas con tus propias manos.

**Uso recomendado:** empieza por las secciones 1–3, practica los seis casos de la sección 5 y después estudia el pipeline. Utiliza las 128 fichas como consulta y registro de práctica, no como un texto para memorizar de principio a fin.

## Índice

1. [Presentación y autoría](#1-presentación-y-autoría).
2. [Mapa del proyecto](#2-mapa-del-proyecto).
3. [Fundamentos que debo poder explicar](#3-fundamentos-que-debo-poder-explicar).
4. [Cómo se prepara y se observa el juego](#4-cómo-se-prepara-y-se-observa-el-juego).
5. [Seis explicaciones a fondo](#5-seis-explicaciones-a-fondo).
6. [Cómo defender el pipeline](#6-cómo-defender-el-pipeline).
7. [Incidencias reales y resultados](#7-incidencias-reales-y-resultados).
8. [Preguntas difíciles y mejoras](#8-preguntas-difíciles-y-mejoras).
9. [Práctica y autoevaluación](#9-práctica-y-autoevaluación).
10. [Referencias oficiales](#10-referencias-oficiales).
11. [Fichas de los 128 casos](#11-fichas-de-los-128-casos).

## 1. Presentación y autoría

### Una presentación de un minuto

> Es mi proyecto personal de QA sobre un portfolio 3D publicado en Vercel. La batería tiene 128 escenarios E2E con Cypress: entrada, navegación, personaje, persistencia y accesibilidad. Ocho escenarios forman una smoke; la regresión se reparte en tres tandas. GitHub Actions ejecuta las pruebas y guarda informes, capturas y huellas del contenido examinado. El proyecto incluye defectos reales detectados por la regresión, como controles superpuestos en móvil.

### Qué significa decir «es mi proyecto»

Puedes identificarlo como tu proyecto personal y describir su propiedad y finalidad. La escritura del código se realizó con apoyo importante de IA. «Es mi proyecto» no equivale a «he escrito de forma independiente todas las líneas».

Si te preguntan por la ayuda recibida:

> He utilizado IA como apoyo para construir y revisar la batería. Mi objetivo es comprender los riesgos, validar los resultados y mantener los casos. Puedo mostrar qué partes he revisado, qué cambios he hecho personalmente y qué decisiones puedo justificar.

Usa la última frase solo para las partes que ya hayas practicado. Si todavía no puedes explicar el cálculo de huellas o un stub, di que es una parte que estás estudiando y abre el código. No conviertas una explicación aprendida en un relato de acciones personales que aún no has realizado.

Para concretar tu aportación, completa esta ficha con trabajo real:

| Aportación personal | ID o archivo | Cambio que hice | Cómo lo validé |
| --- | --- | --- | --- |
| Pendiente de completar | | | |
| Pendiente de completar | | | |
| Pendiente de completar | | | |

### Tres demostraciones que pesan más que memorizar

- Escribir un caso pequeño desde cero y explicar cada aserción.
- Provocar un defecto en una copia local y mostrar que el test lo detecta.
- Investigar un fallo: distinguir producto, prueba, entorno y cancelación del workflow.

## 2. Mapa del proyecto

| Elemento | Qué contiene | Qué no debo confundir |
| --- | --- | --- |
| `portfolio-3d` | Código del juego, páginas y 57 comprobaciones con el runner de Node | No son los 128 E2E |
| `portfolio-qa-cypress` | 24 archivos de Cypress, configuración, pipeline y evidencias | No contiene un servidor del juego |
| Vercel | Sirve la aplicación en producción | Un despliegue correcto no demuestra que las pruebas hayan pasado |
| GitHub Actions de QA | Smoke y tres trabajos de regresión contra Vercel | No se ejecuta por cada despliegue del otro repositorio automáticamente |
| Mochawesome | Informe HTML y JSON de Cypress | No es el motor de ejecución de los tests |
| axe-core / cypress-axe | Detección automática de determinadas barreras del HTML | No certifica accesibilidad completa ni el canvas |

Destino habitual: <https://portfolio-3d-9mtr.vercel.app>.

Los cinco directorios agrupan funcionalidades; las tres tandas son selecciones de archivos y no equivalen a tres carpetas.

- Tanda 1: 41 casos.
- Tanda 2: 44 casos.
- Tanda 3: 43 casos.
- Total: 128 escenarios distintos.
- Smoke: ENT-01, ENT-03, PER-01, PER-04, REI-01, MUN-01, MUN-02 y TEC-13. Son parte de esos 128.

Si se ejecutan smoke y después las tres tandas, se realizan 136 ejecuciones de casos, pero siguen existiendo 128 escenarios únicos. Las cinco comprobaciones de infraestructura tampoco se suman a ese contador. Hay 13 escenarios AXE y LEC-02 añade otra auditoría dentro de un escenario de lectura.

### Archivos que debo saber localizar

- [Configuración](../cypress.config.cjs): destino, tiempos, navegador mediante los comandos npm y reporte.
- [Comandos y dependencias](../package.json).
- [Soporte](../cypress/support/e2e.js): registro de bibliotecas, sin comandos propios del proyecto.
- [Workflow QA](../.github/workflows/cypress.yml).
- [Inventario](plan-de-pruebas.md).
- [Incidencias](incidencias.md) y [resultados](resultados.md).
- [Huella del sitio](../scripts/site-fingerprint.cjs) y [comprobación de inventario](../scripts/check-suite.cjs).

### Ejecutar sin memorizar comandos largos

Desde la raíz del repositorio QA, con Node compatible y Chrome:

```bash
npm ci
npm run cy:open
npm run test:smoke
npm run test:tanda1
npm run test:tanda2
npm run test:tanda3
npm run test:regresion
npm run test:estructura
npm run test:infra
```

Un archivo:

```bash
npx cypress run --browser chrome --spec 'cypress/e2e/personaje/pantallas.cy.js'
```

Otro alojamiento:

```bash
CYPRESS_BASE_URL=http://127.0.0.1:4173 npm run test:smoke
```

Ese servidor debe estar arrancado y ofrecer las rutas del portfolio. Para reproducir los casos que esperan `/perfil` y `/proyecto`, debe respetar las redirecciones de las páginas HTML. Cambiar `CYPRESS_BASE_URL` no arranca un servidor.

Si el entorno de la aplicación de escritorio lo requiere, la ejecución usada en este equipo fue:

```bash
env -u ELECTRON_RUN_AS_NODE CYPRESS_CACHE_FOLDER="$PWD/.cache/Cypress" npm run test:smoke
```

Es una adaptación del equipo, no una condición del producto ni una receta obligatoria para otros ordenadores.

## 3. Fundamentos que debo poder explicar

### Estructura de un caso

`describe` organiza; `it` define el escenario; `beforeEach` prepara su estado. Dentro del caso busco preparación, acción y resultado. Varias aserciones pueden demostrar un mismo resultado: no hace falta dividir cada atributo en un caso diferente.

```js
cy.get('label[for="entry-profile"]').click();
cy.get('#entry-continue').click();
cy.location('pathname').should('eq', '/perfil');
cy.get('h1').should('contain', 'Gutiérrez Mata');
```

Puedo explicar quién usa esa ruta, por qué compruebo URL y contenido, y qué ocurriría si el enlace abre una página equivocada.

### Cola de comandos, consultas y aserciones

Los comandos de Cypress se encolan. El código de JavaScript que rodea los comandos no espera automáticamente a que la página cambie. No trato `cy.get()` como si devolviera un elemento DOM de forma síncrona; trabajo con la cadena, un alias o `.then()`.

Una consulta enlazada a `.should()` puede repetirse hasta satisfacer las aserciones o agotar su tiempo. Eso no repite un clic indefinidamente ni vuelve a ejecutar todo el test. Referencias: [retry-ability](https://docs.cypress.io/app/core-concepts/retry-ability) y [should](https://docs.cypress.io/api/commands/should).

`.then()` sirve para leer o transformar un valor una vez o preparar un stub. Si la condición necesita esperar al próximo guardado, la coloco en `.should()`. La devolución de llamada de `.should()` puede ejecutarse varias veces: evito acciones que cambien el sistema dentro de ella.

### Timeout frente a pausa fija y reintento del test

- `timeout: 60000` permite esperar hasta 60 segundos un estado; si llega antes, continúa antes.
- `cy.wait('@mundo')` espera una petición identificada.
- `cy.wait(3000)` sería una pausa fija; no es el patrón utilizado aquí.
- `retries: 0` evita volver a ejecutar automáticamente un test fallido. Las consultas de Cypress siguen teniendo su espera y repetición normales.

El tiempo de carga de página está configurado en 60 segundos y el de comandos habitual en 10 segundos. Los límites de trabajo de Actions son distintos: protegen la duración total del job.

### Aislamiento

La batería no desactiva el aislamiento E2E predeterminado de Cypress. El estado de un test no debe depender del anterior; cada preparación abre el recorrido necesario. Una recarga dentro de VIS-01 forma parte del mismo caso y permite comprobar el guardado. Referencia: [test isolation](https://docs.cypress.io/app/core-concepts/test-isolation).

Si un caso solo pasa después de ejecutar otro, investigo esa dependencia. No cambio el orden como solución.

### Selección de elementos

| Selector | Motivo en este proyecto | Fragilidad que debo reconocer |
| --- | --- | --- |
| `#mount-action` | Identifica un control concreto | Puede romperse al renombrar el ID sin cambiar comportamiento |
| `findByRole('button', { name: ... })` | Comprueba rol y nombre accesible además de encontrar el control | Un cambio legítimo de texto requiere revisar el contrato |
| `findByLabelText(...)` | Usa la asociación entre etiqueta y campo | No equivale a una revisión completa de lector de pantalla |
| `label[for=...]` | Pulsa la etiqueta visible de un radio | Depende de la asociación y del identificador |
| `.class` | A veces representa estado observable del producto | Está acoplada a una convención del HTML |

No digo que todos los selectores sigan una estrategia ideal de `data-cy`: no es cierto. Una posible mejora es incorporar atributos de prueba estables cuando el objetivo no sea comprobar el nombre accesible. No necesito un Page Object Model para justificar una batería pequeña y explícita; sí debo reconocer repetición de preparación y valorar cuándo extraerla.

### Visible, existente e interactuable

Un elemento puede existir y estar oculto. `be.visible` no comprueba por sí solo que todos los pasos del usuario sean posibles. `.click()` realiza comprobaciones adicionales, como no estar cubierto. Precisamente por eso MOV-08 y MOV-05 detectaron superposiciones reales. `force: true` habría omitido esas comprobaciones de interacción y ocultado ese problema.

### Qué simulo

- En CON-01/02 sustituyo `clipboard.writeText`; no compruebo el permiso real del sistema.
- En DAT preparo errores de la API Storage; no lleno el disco real.
- En REC-06/07/09 interrumpo recursos concretos con `intercept`.
- En REC-10 simulo ausencia de WebGL; la aplicación ejecuta su alternativa.
- En MUN y parte de TEC/INP uso `trigger`, que produce eventos sintéticos para manejadores del juego.
- En Enter/Escape y arrastres concretos uso `cypress-real-events` sobre Chromium. Eso no convierte un ordenador en un teléfono físico.

## 4. Cómo se prepara y se observa el juego

La preparación habitual visita `/`, elige reino, continúa y espera los ajustes. Selecciona PC, apaga música, elige calidad fluida y movimiento reducido, confirma y comprueba el cierre del diálogo. Algunas suites, como las de lectura o fallos, tienen preparaciones diferentes: hay que leer cada archivo.

Esto reduce variabilidad y ruido en las comprobaciones; no demuestra ahorro de batería ni fija todos los factores del entorno. `viewport` cambia dimensiones, no simula rendimiento, GPU, teclado móvil ni lector de pantalla de un dispositivo real.

### Estados y almacenamiento usados como evidencia

- `inside` y `portrait-mode`: estados observables en el HTML.
- `aria-pressed`: estado de controles conmutables.
- `aria-busy`: evolución del salto según el contrato del botón.
- `pablo-realm-visit-v1`: JSON de visita con posición, radio de cámara, orientación, estado y fecha de guardado.
- `pablo-realm-preferences`: preferencias de controles, sonido, movimiento y calidad.

En movimiento leo posición guardada en vez de llamar a una función privada que teletransporte al personaje. Es una evidencia indirecta: puedo detectar desplazamiento y parada, pero no demostrar toda la animación ni todas las colisiones. También me acopla al formato y frecuencia de guardado; si cambian, debo investigar y adaptar la estrategia con criterio.

`Math.hypot(dx, dz)` calcula distancia en el plano. Un umbral pequeño evita depender de coordenadas exactas. Los límites 10/38 de rueda, 45 de un radio recuperado, y los márgenes de posición proceden de contratos distintos del producto; no son constantes universales de Cypress.

## 5. Seis explicaciones a fondo

### PER-04: un PDF real

1. Abro el perfil y localizo el enlace de descarga.
2. Leo su `href` con `invoke`.
3. Hago `cy.request` con codificación binaria.
4. Compruebo HTTP 200, tipo PDF, inicio `%PDF-` y más de 1000 caracteres en la cadena binaria.

Una respuesta 200 puede contener HTML de error: por eso no basta el estado HTTP. El tamaño es una señal mínima, no valida el contenido completo. No compruebo que el archivo se haya guardado en Descargas, que todos los datos sean correctos ni su maquetación. `cy.request` lo realiza Cypress; no es una petición de la aplicación interceptada por `cy.intercept`.

Pregunta práctica: ¿qué aserción falla si el servidor entrega HTML con HTTP 200? Contesta señalando las comprobaciones concretas.

### REC-06: falla la descarga del mundo

Registro `intercept('GET', '**/app.js', { forceNetworkError: true })` antes de activar la carga. El alias `mundo` permite esperar esa petición. Después verifico mensaje, bienvenida utilizable, mundo oculto, botón habilitado y ausencia del estado ocupado.

No sustituyo el código del juego por una respuesta satisfactoria inventada. Provoco una indisponibilidad concreta y observo la recuperación. REC-07 añade el camino alternativo al perfil; REC-09 trata el interior. Son riesgos distintos.

En esa suite se desactiva la caché de Chrome y se restaura después. Un módulo servido desde caché puede no producir la petición necesaria para el intercept. Referencia: [intercept y caché](https://docs.cypress.io/api/commands/intercept#cyintercept-and-request-caching). El comando de automatización de Chrome es una dependencia del entorno Chromium que debo poder reconocer.

### INP-03: detener al perder el foco

1. Espero que exista una visita guardada y conservo su posición inicial.
2. Envío `keydown` de W al canvas con foco.
3. Espero un desplazamiento superior a 0,2 unidades.
4. Envío `blur` a la ventana, sin depender de un `keyup` normal.
5. Espero un guardado cuya fecha sea posterior al margen para terminar la inercia.
6. Comparo dos guardados posteriores: su distancia debe ser menor que 0,02.

La fecha asegura que estoy observando una muestra nueva. Dos lecturas inmediatas del mismo JSON podrían dar una falsa sensación de parada. No es una prueba física del cambio de aplicación ni de toda la política de tiempo; `blur` se dispara de forma sintética.

### TEC-15: foco dentro de la mochila

Abro la mochila, compruebo foco en el objeto seleccionado y pulso Shift+Tab para llegar a cerrar. Otro Shift+Tab debe permanecer dentro del diálogo. Tab vuelve al cierre. El objetivo es comprobar el comportamiento de los límites del foco, no escribir un recorrido ciego con cientos de pulsaciones.

No examina todos los elementos intermedios ni sustituye usar un lector de pantalla. TEC-14 comprueba Escape y retorno al botón; TEC-13 comprueba apertura/cierre con I desde el mundo; TEC-17 comprueba reabrir desde el control de origen.

### AXE-06 y LEC-02: accesibilidad y límites

Preparo primero el estado que quiero auditar y después uso `injectAxe` y `checkA11y`. En los casos AXE se escriben JSON con problemas en `cypress/reports/axe/`. LEC-02 combina ancho de la ficha, enlace al workflow y otra auditoría, sin usar ese callback de escritura.

Axe comprueba reglas automáticas sobre el documento alcanzable por su análisis. Un diálogo cerrado o una sección no examinada no queda certificada por haber auditado otra pantalla. El éxito no prueba comprensión, lector de pantalla, contraste dinámico del canvas ni conformidad WCAG completa. No se filtran reglas para silenciar fallos.

### MOV-08: un defecto que sí detectó la batería

En móvil intento entrar mediante el marcador del castillo y salir por la puerta. El clic inicial falló porque la mochila cubría el marcador. La corrección reservó espacio en el producto; el test conservó su interacción. La regresión también detectó después el mapa cubierto por zonas vacías de la cabecera en MOV-05/AXE-12.

Para defenderlo, enseño el mensaje de elemento cubierto, la corrección y una ejecución posterior. No digo «solo actualicé el test para que pasara» ni atribuyo a una captura una inspección visual que no realicé.

## 6. Cómo defender el pipeline

### Leer el YAML de arriba abajo

| Clave | Significado real aquí |
| --- | --- |
| `push` y `pull_request`, rama `main` | Disparan el workflow del repositorio QA por esos eventos |
| `workflow_dispatch` | Permite lanzamiento manual |
| `CYPRESS_BASE_URL` | Hace que Cypress y las huellas usen producción de Vercel |
| `contents: read` | Los trabajos no necesitan permisos de escritura para ejecutar pruebas |
| `concurrency` | Agrupa por referencia Git y cancela una ejecución anterior del mismo grupo al llegar otra |
| `ubuntu-latest` | Entorno alojado de GitHub; no garantiza misma imagen para siempre |
| `setup-node` con 22 | Versión de Node del proyecto en CI |
| `npm ci` | Instala según el lockfile; no es equivalente a actualizar dependencias |
| `needs: smoke` | Las tandas requieren éxito de smoke |
| `matrix: tanda [1,2,3]` | Crea tres trabajos de regresión |
| `fail-fast: false` | Un fallo de una tanda no cancela automáticamente sus hermanas de la matriz |
| `if: always()` | Intenta recoger evidencias aunque haya fallos anteriores; no garantiza que existan archivos si no llegaron a generarse |
| `retention-days: 14` | Los artefactos no son un alojamiento permanente de informes |

No confundo el runtime interno de una Action con Node 22, que ejecuta los comandos de este proyecto. Las versiones de Actions y dependencias están fijadas en archivos; no afirmo que nunca puedan cambiar sus dependencias remotas.

### Orden de ejecución

```text
Repositorio QA: push / PR a main / ejecución manual
    ↓
Inventario + pruebas de la herramienta de evidencia
    ↓
Instalación reproducible + huella inicial
    ↓
Smoke: ocho casos + huella final
    ↓ si el trabajo completo aprueba
Tanda 1 (41)   Tanda 2 (44)   Tanda 3 (43)
    ↓              ↓              ↓
Informe HTML + capturas + huellas de cada trabajo
```

El hecho de que los ocho tests smoke pasen no basta si después falla su comparación de huellas: el job no aprueba y sus dependientes no continúan.

### Qué significa cada resultado

| Estado | Lectura correcta |
| --- | --- |
| Success | Pasaron los pasos exigidos de ese trabajo o ejecución |
| Failure | Algún paso falló; puede ser instalación, evidencia o un test |
| Cancelled | La ejecución fue interrumpida; no equivale a 128 fallos |
| Skipped | El trabajo no se ejecutó, por ejemplo por fallo de una dependencia |
| In progress | Aún no existe un resultado definitivo |

Ejemplo real: la ejecución #9 fue cancelada cuando llegó la posterior; #10 aprobó smoke y las tres tandas. No diagnostico todos los tests a partir de un icono de un job.

### Por qué calculo una huella

La web pública puede cambiar con independencia del repositorio de pruebas. La herramienta descarga 30 recursos declarados y calcula hashes SHA-256. Ordena sus rutas y obtiene una referencia agregada. Smoke produce el output que las tandas reciben; cada trabajo compara inicio y final y guarda JSON con URL, fecha, commit QA y recursos.

La huella no es el commit del sitio ni un test de seguridad. No incluye todos los recursos: audio y vendor están fuera. Dos lecturas iguales no descartan que el contenido cambiara momentáneamente entre ellas. En el HTML solo se normalizan identificadores por petición del script de Cloudflare (`r`, `t`, `ray`), porque de otro modo daban cambios falsos. Las cinco pruebas de infraestructura comprueban orden, variaciones, fallos HTTP, lista de recursos y normalización limitada.

En ejecución local, el campo `qaCommit` puede ser null si no se proporciona `GITHUB_SHA`. El script respeta `CYPRESS_BASE_URL`, igual que Cypress. Si apunto cada herramienta a un dominio diferente, la evidencia deja de corresponder a los tests.

### CI y despliegue son flujos distintos

Vercel publica desde el repositorio del juego. El workflow de QA se dispara desde su propio repositorio. No hay actualmente un disparador automático entre ambos ni un bloqueo de promoción que garantice «solo se publica si pasa QA».

El repositorio del juego tiene además `quality.yml`, con las 57 comprobaciones del motor y una comprobación de que las páginas generadas coincidan con sus fuentes. Es una capa separada. Puedo proponer como mejora enlazar una publicación terminada con E2E y comprobar el despliegue exacto; no digo que ya está hecho.

## 7. Incidencias reales y resultados

| Historia | Qué demuestra | Evidencia |
| --- | --- | --- |
| Primeras auditorías: 97/100 | Hubo defectos del producto detectados por reglas de accesibilidad | [Historial de incidencias](incidencias.md) |
| Montura/mochila sobre acceso al castillo: 127/128 | Cypress detectó un control cubierto, no solo un atributo | MOV-08 y su corrección documentada |
| Cabecera sobre mapa: 126/128 | Un cambio de presentación puede romper interacción móvil | MOV-05 y AXE-12 |
| Huellas HTML distintas sin cambio funcional | La herramienta de evidencia también puede tener defectos | Normalización limitada de Cloudflare y su prueba |
| Ejecución local bloqueada | Un run interrumpido no se cuenta como aprobado | Registro del reinicio y repetición completa |

La ejecución remota [#10](https://github.com/Pablosky76/portfolio-qa-cypress/actions/runs/43623981562) aprobó 8/8 en smoke y 41/41, 44/44 y 43/43 en las tandas. Corresponde a la publicación examinada y al commit QA `6d256a1`. Sus artefactos caducan el 28 de noviembre de 2026. Consulto [resultados](resultados.md) para el historial y no la presento como prueba de cualquier cambio futuro.

## 8. Preguntas difíciles y mejoras

**¿Por qué 128?** Es el inventario actual de escenarios, no un umbral científico de calidad. No afirmo cobertura del 100 % porque no se ha medido así. Priorizar riesgos aporta más que aumentar el contador.

**¿Son unitarios?** Los 128 son E2E del navegador. Algunos sustituyen APIs para provocar condiciones. Las 57 comprobaciones del código del juego y las cinco de infraestructura son otras capas.

**¿Por qué Chrome?** La batería usa eventos y automatización de Chromium. No he acreditado con estos resultados Firefox, Safari ni teléfonos físicos. Ampliaría navegadores evaluando primero las dependencias de los casos.

**¿Por qué no hay POM?** La preparación es repetida y visible para poder leer los casos. Es una decisión sencilla, con coste de mantenimiento. Si crece la duplicación, extraería preparación compartida sin ocultar las acciones y los resultados del escenario.

**¿Por qué compruebas clases y localStorage?** Son evidencias disponibles de los estados. Reconozco el acoplamiento; una mejora sería disponer de contratos observables más estables y complementar con comprobaciones independientes.

**¿De dónde salen los valores esperados?** Del comportamiento acordado y del código del producto revisado, no de cambiar una cifra hasta ver verde. Si cambia el contrato, reviso producto, test y documentación. No uso la implementación como única prueba de que un requisito es correcto.

**¿Cómo sabes que no es un falso positivo?** Compruebo que el caso puede fallar por una causa relevante, reproduzco la condición y contrasto la evidencia. Un test que pasa con el comportamiento roto puede tener un selector o una aserción insuficientes.

**¿Y los falsos fallos o flakiness?** Repito un caso aislado para investigar, miro foco, tiempos, peticiones, caché y entorno. No activo reintentos o añado pausas para esconderlo. `retries: 0` no demuestra ausencia de flakiness.

**¿Qué no cubres del 3D?** Los tests de DOM no comparan píxeles ni acreditan todos los modelos, animaciones, colisiones, FPS o memoria GPU. Incluso un canvas vacío puede tener dimensiones correctas.

**¿Qué ocurre si falla un test?** Leo ID, paso y mensaje; compruebo versión y entorno; reproduzco; clasifico la causa; corrijo; repito la categoría y la regresión pertinente; guardo el resultado sin borrar el fallo histórico.

**¿Hiciste tú todo el trabajo sin ayuda?** No afirmo eso. Explico el apoyo de IA y demuestro con código qué entiendo, qué he validado y qué puedo mantener. La guía sirve para practicar, no para sustituir esa demostración.

**¿Qué mejorarías primero?** Enlazar validación con despliegue exacto, añadir revisión manual y dispositivos reales, mejorar selectores y preparación, medir flakiness, y dar acceso duradero a informes. Lo priorizaría por riesgo y tiempo, no prometiendo implementar todo a la vez.

## 9. Práctica y autoevaluación

### Plan de estudio por sesiones

| Sesión | Trabajo práctico | Resultado que debo poder enseñar |
| --- | --- | --- |
| 1 | ENT-01/03, PER-01/04, REI-01 | Un caso básico escrito sin copiar y una explicación del PDF |
| 2 | AJU, CAS y MAP | Preparación reproducible y diferencia entre iniciar y completar una ruta |
| 3 | TEC, MOV y LEC | Foco de entrada/salida, viewport y una superposición reproducida |
| 4 | VIS, DAT y REC | Datos válidos/invalidos, stub e intercept sin mezclar conceptos |
| 5 | CAM e INP | Alias de posición inicial, condiciones temporales y límites de la evidencia |
| 6 | AXE y workflow | Interpretación de una barrera, un artefacto y los estados de los jobs |
| 7 | Simulación de entrevista | Presentación breve, demostración en directo y discusión de mejoras |

No son tiempos garantizados. Repite las sesiones que necesites.

### Ejercicios que debo hacer en una copia local

1. Crear un caso pequeño que compruebe un enlace existente y su destino.
2. Ocultar el acceso QA en la copia local: comprobar que el escenario pertinente falla y restaurarlo.
3. Servir HTML donde se espera PDF: explicar las aserciones que lo rechazan.
4. Provocar una superposición móvil: reproducir el fallo de clic sin `force` y corregir CSS.
5. Preparar una visita con JSON inválido y explicar por qué se hace antes de cargar la aplicación.
6. Cambiar una opción, recargar y demostrar persistencia dentro del mismo caso.
7. Explicar por qué dos guardados idénticos de la misma fecha no prueban una parada.
8. Abrir un informe fallido y redactar reproducción, esperado, observado, entorno y evidencia.
9. Dibujar el pipeline y explicar qué ocurre si falla la instalación, smoke, una tanda o la huella.
10. Cambiar el destino con `CYPRESS_BASE_URL` y comprobar que la herramienta de evidencias usa el mismo origen.

No ejecutes estos cambios de producto contra producción ni publiques un defecto solo para practicar. No subas ramas con pruebas deliberadamente rotas sin indicar su finalidad.

### Autoevaluación de cada ficha

Marca una ficha como dominada solo cuando puedas, sin leer su respuesta:

- Explicar usuario afectado y riesgo.
- Localizar preparación, acción y aserciones en el archivo.
- Justificar los datos y umbrales relevantes.
- Decir qué no comprueba.
- Predecir un fallo concreto y comprobarlo en un entorno controlado.
- Hacer un cambio pequeño y justificar cómo lo validas.

Escala útil: 0, no lo explico; 1, lo explico mirando código; 2, lo ejecuto y modifico; 3, puedo investigar un fallo y defender sus límites. Conocer el título no equivale a dominar el caso.

### Simulación de entrevista de diez minutos

- Minutos 0–1: finalidad, alcance y apoyo recibido.
- Minutos 1–3: ejecutar un caso sencillo y explicar cada comando.
- Minutos 3–5: enseñar un defecto real y su regresión.
- Minutos 5–7: leer `needs`, matriz, cancelación y artefactos en el YAML.
- Minutos 7–9: explicar un caso avanzado y una limitación real.
- Minuto 9–10: proponer la mejora que priorizarías y por qué.

## 10. Referencias oficiales

La documentación explica los comandos; los selectores, datos y resultados esperados de estos casos proceden de la aplicación.

- [Primer E2E](https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test).
- [Repetición de consultas](https://docs.cypress.io/app/core-concepts/retry-ability).
- [Aislamiento](https://docs.cypress.io/app/core-concepts/test-isolation).
- [Aserciones should](https://docs.cypress.io/api/commands/should) y [then](https://docs.cypress.io/api/commands/then).
- [visit / onBeforeLoad](https://docs.cypress.io/api/commands/visit).
- [request](https://docs.cypress.io/api/commands/request), [intercept](https://docs.cypress.io/api/commands/intercept) y [stub](https://docs.cypress.io/api/commands/stub).
- [trigger](https://docs.cypress.io/api/commands/trigger), [press](https://docs.cypress.io/api/commands/press) y [viewport](https://docs.cypress.io/api/commands/viewport).
- [Testing Library](https://testing-library.com/docs/cypress-testing-library/intro/).
- [cypress-real-events](https://github.com/dmtrKovalenko/cypress-real-events).
- [cypress-axe](https://github.com/component-driven/cypress-axe).
- [Mochawesome reporter](https://github.com/LironEr/cypress-mochawesome-reporter).
- [Sintaxis de workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax).
- [Artefactos de Actions](https://docs.github.com/en/actions/how-tos/writing-workflows/choosing-what-your-workflow-does/storing-and-sharing-data-from-a-workflow).

## 11. Fichas de los 128 casos

Las fichas se ordenan por familia funcional. Cada una enlaza su archivo y la línea del caso en el commit de referencia. «Práctica» es una tarea de aprendizaje pendiente, no una afirmación de algo que ya hayas hecho.

| Familia | Casos | Consulta |
| --- | ---: | --- |
| ENT · Entrada | 3 | [Ir a ENT](#ent-casos) |
| PER · Perfil profesional | 7 | [Ir a PER](#per-casos) |
| REI · Paneles del reino | 5 | [Ir a REI](#rei-casos) |
| MUN · Acciones del mundo | 10 | [Ir a MUN](#mun-casos) |
| AJU · Ajustes | 8 | [Ir a AJU](#aju-casos) |
| CAS · Castillo y crónicas | 7 | [Ir a CAS](#cas-casos) |
| TEC · Teclado y foco | 17 | [Ir a TEC](#tec-casos) |
| MAP · Mapa | 6 | [Ir a MAP](#map-casos) |
| MOV · Pantallas y controles móviles | 8 | [Ir a MOV](#mov-casos) |
| CON · Contacto | 4 | [Ir a CON](#con-casos) |
| CAM · Cámara | 4 | [Ir a CAM](#cam-casos) |
| INP · Movimiento y parada | 6 | [Ir a INP](#inp-casos) |
| VIS · Persistencia | 12 | [Ir a VIS](#vis-casos) |
| DAT · Almacenamiento y datos inválidos | 5 | [Ir a DAT](#dat-casos) |
| REC · Recuperación | 10 | [Ir a REC](#rec-casos) |
| AXE · Accesibilidad automática | 13 | [Ir a AXE](#axe-casos) |
| LEC · Lectura y ficha QA | 3 | [Ir a LEC](#lec-casos) |

<a id="ent-casos"></a>

### ENT · Entrada

#### ENT-01 · exige elegir un recorrido antes de continuar

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/entrada/smoke-perfil.cy.js#L7) · [Archivo local](../cypress/e2e/entrada/smoke-perfil.cy.js) · Tanda 1 · **Smoke**

- **Riesgo:** Entrar sin elegir recorrido o no encontrar el proyecto QA.
- **Cómo lo explico:** Compruebo bienvenida, Continuar deshabilitado, instrucción y mundo oculto; abro el enlace QA y verifico /proyecto y su sección de pipeline.
- **Límite:** No prueba todavía la carga del reino ni los artefactos de GitHub.
- **Práctica:** Oculta el enlace QA en una copia local y predice qué paso falla.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### ENT-02 · permite cambiar de recorrido manteniendo una sola elección

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/entrada/bienvenida.cy.js#L7) · [Archivo local](../cypress/e2e/entrada/bienvenida.cy.js) · Tanda 1

- **Riesgo:** Que ambos radios queden seleccionados o Continuar no responda al cambio.
- **Cómo lo explico:** Elijo perfil y después reino; compruebo exclusión entre radios y botón habilitado.
- **Límite:** No continúa ninguno de los recorridos.
- **Práctica:** Explica por qué hace falta comprobar que el perfil deja de estar marcado.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### ENT-03 · abre el perfil profesional desde la bienvenida

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/entrada/smoke-perfil.cy.js#L17) · [Archivo local](../cypress/e2e/entrada/smoke-perfil.cy.js) · Tanda 1 · **Smoke**

- **Riesgo:** Que el recorrido profesional abra una página equivocada o cargue la escena.
- **Cómo lo explico:** Pulso perfil y Continuar; verifico /perfil, encabezado y ausencia de canvas.
- **Límite:** No comprueba cada dato profesional ni todas las peticiones; REC-08 observa app.js.
- **Práctica:** Distingue ausencia de canvas de ausencia de descarga del módulo 3D.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

<a id="per-casos"></a>

### PER · Perfil profesional

#### PER-01 · presenta identidad, especialidad y experiencia QA

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/entrada/smoke-perfil.cy.js#L32) · [Archivo local](../cypress/e2e/entrada/smoke-perfil.cy.js) · Tanda 1 · **Smoke**

- **Riesgo:** Que falten identidad y datos esenciales del perfil.
- **Cómo lo explico:** Verifico título, idioma español, un solo h1, rol, experiencia QA, Cypress y formación.
- **Límite:** Presencia de texto no acredita exactitud de todo el CV ni vigencia de fechas.
- **Práctica:** Elimina una habilidad del HTML local y señala la aserción que debería fallar.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### PER-02 · navega a todas las secciones desde el menú

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/perfil.cy.js#L6) · [Archivo local](../cypress/e2e/navegacion/perfil.cy.js) · Tanda 1

- **Riesgo:** Que el menú lleve a secciones vacías o a anclas equivocadas.
- **Cómo lo explico:** Pulso experiencia, tecnologías, formación y contacto; compruebo hash, visibilidad y h2 no vacío.
- **Límite:** No examina todos los enlaces posibles de la página.
- **Práctica:** Explica por qué el hash correcto sin contenido visible no sería suficiente.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### PER-03 · ofrece destinos profesionales correctos y seguros

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/entrada/contenido-perfil.cy.js#L6) · [Archivo local](../cypress/e2e/entrada/contenido-perfil.cy.js) · Tanda 1

- **Riesgo:** Que los enlaces profesionales tengan un destino o apertura inadecuados.
- **Cómo lo explico:** Verifico mailto y destinos de GitHub/LinkedIn, target y presencia de noopener.
- **Límite:** No inicio sesión ni valido disponibilidad o contenido de servicios externos.
- **Práctica:** Cambia solo el href de un enlace local y predice el fallo.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### PER-04 · entrega un CV PDF real desde el enlace de descarga

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/entrada/smoke-perfil.cy.js#L50) · [Archivo local](../cypress/e2e/entrada/smoke-perfil.cy.js) · Tanda 1 · **Smoke**

- **Riesgo:** Descargar HTML o un archivo incorrecto en lugar del CV.
- **Cómo lo explico:** Leo href y hago request binario: 200, tipo PDF, prefijo %PDF- y longitud superior a 1000.
- **Límite:** No comprueba guardado en Descargas, texto profesional ni diseño del PDF.
- **Práctica:** Explica cómo puede haber HTTP 200 y aun así fallar el caso.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### PER-05 · vuelve a la elección de recorrido

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/perfil.cy.js#L28) · [Archivo local](../cypress/e2e/navegacion/perfil.cy.js) · Tanda 1

- **Riesgo:** Que el visitante no pueda volver a elegir recorrido.
- **Cómo lo explico:** Pulso world-link; verifico /, bienvenida y existencia de ambos radios.
- **Límite:** No comprueba restauración de posición ni historial de navegación del navegador.
- **Práctica:** Señala la diferencia entre should exist y be.visible en este caso.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### PER-06 · mantiene contenido y contacto utilizables en móvil

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/entrada/perfil-responsive.cy.js#L7) · [Archivo local](../cypress/e2e/entrada/perfil-responsive.cy.js) · Tanda 1

- **Riesgo:** Perfil o contacto inutilizables en un ancho móvil.
- **Cómo lo explico:** A 390×844 compruebo h1, PDF, ancho con margen de 1 px, contacto y captura del viewport.
- **Límite:** No es un teléfono físico ni una comparación visual automática de la captura.
- **Práctica:** Explica por qué se permite un píxel y qué significa scrollWidth.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### PER-07 · mantiene contenido y contacto utilizables en escritorio

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/entrada/perfil-responsive.cy.js#L25) · [Archivo local](../cypress/e2e/entrada/perfil-responsive.cy.js) · Tanda 1

- **Riesgo:** Regresión de contenido o contacto en escritorio.
- **Cómo lo explico:** Repito las comprobaciones del perfil a 1440×900 y guardo una captura.
- **Límite:** No valida todas las resoluciones intermedias ni el diseño por píxeles.
- **Práctica:** Compara su riesgo con PER-06 sin decir que son el mismo navegador repetido sin propósito.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

<a id="rei-casos"></a>

### REI · Paneles del reino

#### REI-01 · abre y cierra el contacto profesional

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/smoke-reino.cy.js#L17) · [Archivo local](../cypress/e2e/personaje/smoke-reino.cy.js) · Tanda 1 · **Smoke**

- **Riesgo:** Contacto inaccesible desde el juego o diálogo que no cierra.
- **Cómo lo explico:** Abro contacto, verifico diálogo y correo visible y lo cierro.
- **Límite:** No comprueba que se envíe correo ni la copia al portapapeles.
- **Práctica:** Quita el manejador de cierre local y predice la aserción fallida.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### REI-02 · muestra la ayuda y permite cerrarla

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/paneles-reino.cy.js#L17) · [Archivo local](../cypress/e2e/navegacion/paneles-reino.cy.js) · Tanda 1

- **Riesgo:** Ayuda inaccesible o sin instrucciones esenciales.
- **Cómo lo explico:** Abro ayuda, compruebo WASD y flechas y verifico cierre.
- **Límite:** No comprueba todas las instrucciones ni su comprensión.
- **Práctica:** Explica por qué aparecer el diálogo no basta para validar la ayuda.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### REI-03 · recorre las cinco secciones del currículum

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/paneles-reino.cy.js#L24) · [Archivo local](../cypress/e2e/navegacion/paneles-reino.cy.js) · Tanda 1

- **Riesgo:** Pestañas del CV que cambian apariencia sin mostrar su contenido.
- **Cómo lo explico:** Recorro las cinco secciones, compruebo selección, texto y encabezado visible tras scroll; cierro.
- **Límite:** No valida exhaustivamente el contenido profesional ni conserva crónicas tras recarga.
- **Práctica:** Distingue comprobar la clase selected de comprobar el contenido de la pestaña.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### REI-04 · abre un mapa con destinos disponibles

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/paneles-reino.cy.js#L66) · [Archivo local](../cypress/e2e/navegacion/paneles-reino.cy.js) · Tanda 1

- **Riesgo:** Mapa vacío o controles de destino deshabilitados.
- **Cómo lo explico:** Abro mapa, verifico SVG con role group y al menos un botón habilitado; cierro.
- **Límite:** MAP-01 comprueba los seis destinos; este caso no lo hace.
- **Práctica:** Explica por qué un SVG interactivo no se trata aquí como una imagen única.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### REI-05 · cambia a controles móviles y conserva las preferencias al reabrir

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/paneles-reino.cy.js#L75) · [Archivo local](../cypress/e2e/navegacion/paneles-reino.cy.js) · Tanda 1

- **Riesgo:** Cambiar a móvil sin guardar la preferencia durante la visita.
- **Cómo lo explico:** Selecciono móvil y movimiento reducido, verifico joystick y ajustes al reabrir.
- **Límite:** No hay recarga; la persistencia entre cargas se prueba en VIS.
- **Práctica:** Compara reabrir ajustes con recargar la página.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

<a id="mun-casos"></a>

### MUN · Acciones del mundo

#### MUN-01 · prepara una superficie de render con tamaño válido

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/smoke-reino.cy.js#L45) · [Archivo local](../cypress/e2e/personaje/smoke-reino.cy.js) · Tanda 1 · **Smoke**

- **Riesgo:** Entrar al mundo sin superficie válida o sin acceso al proyecto QA.
- **Cómo lo explico:** Compruebo canvas visible con dimensiones internas positivas, estado exploring, enlace QA y foco; guardo captura.
- **Límite:** No demuestra que existan mallas visibles ni un render 3D correcto.
- **Práctica:** Explica por qué un canvas vacío también podría pasar parte de estas aserciones.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### MUN-02 · invoca la montura desde la plaza

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/smoke-reino.cy.js#L56) · [Archivo local](../cypress/e2e/personaje/smoke-reino.cy.js) · Tanda 1 · **Smoke**

- **Riesgo:** Que invocar montura no cambie el estado del personaje.
- **Cómo lo explico:** Pulso montar; verifico aria-pressed true, texto Desmontar y nombre Sable de la noche.
- **Límite:** No mide velocidad ni animación de la montura.
- **Práctica:** Indica qué incoherencia detecta comprobar botón y nombre a la vez.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### MUN-03 · desmonta y recupera el estado del centinela

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/acciones.cy.js#L20) · [Archivo local](../cypress/e2e/personaje/acciones.cy.js) · Tanda 1

- **Riesgo:** Quedar montado o con identidad incoherente al desmontar.
- **Cómo lo explico:** Monto y desmonto; espero aria-pressed false, texto Montar y Centinela lunar.
- **Límite:** No comprueba trayectoria ni colisiones después de desmontar.
- **Práctica:** Distingue el estado inicial comprobado del resultado final.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### MUN-04 · activa la cámara de retrato

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/acciones.cy.js#L28) · [Archivo local](../cypress/e2e/personaje/acciones.cy.js) · Tanda 1

- **Riesgo:** Que el control de retrato no active el modo esperado.
- **Cómo lo explico:** Activo cámara; compruebo portrait-mode, aria-pressed true y texto Ver ciudad.
- **Límite:** No compara el encuadre ni la geometría de la cámara.
- **Práctica:** Explica qué contrato de estado observa el HTML.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### MUN-05 · vuelve del retrato a la vista de ciudad

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/acciones.cy.js#L34) · [Archivo local](../cypress/e2e/personaje/acciones.cy.js) · Tanda 1

- **Riesgo:** No poder regresar de retrato a ciudad.
- **Cómo lo explico:** Activo y desactivo retrato; compruebo eliminación de clase y aria-pressed false.
- **Límite:** No demuestra que el ángulo visual concreto sea el correcto.
- **Práctica:** Describe qué añade respecto a MUN-04.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### MUN-06 · inicia un salto y vuelve a estar en el suelo

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/acciones.cy.js#L42) · [Archivo local](../cypress/e2e/personaje/acciones.cy.js) · Tanda 1

- **Riesgo:** Salto que no comienza o queda ocupado para siempre.
- **Cómo lo explico:** Pulso saltar; compruebo mensaje y transición aria-busy true a false.
- **Límite:** Es evidencia del ciclo del estado, no una prueba completa de la trayectoria física.
- **Práctica:** Quita en local el restablecimiento de aria-busy y explica el timeout.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### MUN-07 · la tecla V cambia la cámara cuando el mundo tiene foco

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/acciones.cy.js#L49) · [Archivo local](../cypress/e2e/personaje/acciones.cy.js) · Tanda 1

- **Riesgo:** Atajo V desconectado del mundo con foco.
- **Cómo lo explico:** Enfoco canvas y envío keydown/keyup sintéticos; espero portrait-mode.
- **Límite:** No es entrada física real ni prueba el atajo dentro de un diálogo.
- **Práctica:** Explica por qué importa focus antes de trigger.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### MUN-08 · la tecla M activa la montura

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/acciones.cy.js#L55) · [Archivo local](../cypress/e2e/personaje/acciones.cy.js) · Tanda 1

- **Riesgo:** Atajo M que no invoca montura.
- **Cómo lo explico:** Enfoco mundo, envío M y liberación; verifico estado y nombre Sable.
- **Límite:** No cubre repetición de tecla ni montura dentro del castillo.
- **Práctica:** Separa este objetivo de TEC-09 y CAS-04.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### MUN-09 · Espacio dispara el salto desde el mundo

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/acciones.cy.js#L62) · [Archivo local](../cypress/e2e/personaje/acciones.cy.js) · Tanda 1

- **Riesgo:** Que Espacio no llegue al manejador de salto.
- **Cómo lo explico:** Enfoco mundo, envío la tecla espacio y compruebo mensaje y ciclo busy.
- **Límite:** No demuestra ausencia de doble salto; las reglas físicas son otra capa.
- **Práctica:** Explica por qué el valor de key es un espacio y no el texto Space.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### MUN-10 · W desplaza al personaje y guarda una posición diferente

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/acciones.cy.js#L70) · [Archivo local](../cypress/e2e/personaje/acciones.cy.js) · Tanda 1

- **Riesgo:** W sin efecto o guardado que no refleja desplazamiento.
- **Cómo lo explico:** Espero visita, guardo posición, mantengo W y espero distancia mayor que 0,2; libero.
- **Límite:** No asegura dirección exacta, fluidez ni parada posterior.
- **Práctica:** Explica el cálculo de Math.hypot y por qué leo una posición inicial.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

<a id="aju-casos"></a>

### AJU · Ajustes

#### AJU-01 · vuelve de controles móviles a PC

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/preferencias.cy.js#L20) · [Archivo local](../cypress/e2e/personaje/preferencias.cy.js) · Tanda 1

- **Riesgo:** Quedar bloqueado en controles móviles al volver a PC.
- **Cómo lo explico:** Paso a móvil y después a PC; compruebo data-controls y joystick oculto.
- **Límite:** No acredita un teclado o un dispositivo móvil físicos.
- **Práctica:** Añade mentalmente la comprobación intermedia que evita un falso aprobado.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### AJU-02 · activa el movimiento ambiental completo

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/preferencias.cy.js#L32) · [Archivo local](../cypress/e2e/personaje/preferencias.cy.js) · Tanda 1

- **Riesgo:** Preferencia de movimiento completo no aplicada o no retenida al reabrir.
- **Cómo lo explico:** Selecciono full, verifico data-motion y valor del selector al volver a ajustes.
- **Límite:** No comprueba visualmente cada animación ni persiste tras recarga.
- **Práctica:** Explica la diferencia entre el atributo del body y la opción del select.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### AJU-03 · reduce el movimiento ambiental tras activarlo

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/preferencias.cy.js#L41) · [Archivo local](../cypress/e2e/personaje/preferencias.cy.js) · Tanda 1

- **Riesgo:** No poder reducir el movimiento después de activarlo.
- **Cómo lo explico:** Paso de full a reduced y compruebo ambos estados del body.
- **Límite:** No evalúa por sí solo comodidad del usuario o todas las transiciones CSS.
- **Práctica:** Explica por qué no basta verificar reduced sin preparar antes full.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### AJU-04 · ajusta el volumen y actualiza su porcentaje

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/preferencias.cy.js#L49) · [Archivo local](../cypress/e2e/personaje/preferencias.cy.js) · Tanda 1

- **Riesgo:** Desacuerdo entre volumen seleccionado y porcentaje mostrado.
- **Cómo lo explico:** Asigno 5 al input, disparo input, verifico 5 % y conservación al reabrir.
- **Límite:** No mueve un control con un dedo ni mide volumen acústico.
- **Práctica:** Explica por qué invoke val necesita trigger input en este caso.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### AJU-05 · la música desactivada deja el audio en pausa

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/preferencias.cy.js#L58) · [Archivo local](../cypress/e2e/personaje/preferencias.cy.js) · Tanda 1

- **Riesgo:** Música reproduciéndose pese a estar desactivada.
- **Cómo lo explico:** La preparación la apaga; compruebo botón no pulsado, audio.paused y checkbox desmarcado.
- **Límite:** No prueba el inicio de reproducción cuando se activa ni sonido audible.
- **Práctica:** Indica qué demuestra paused frente al atributo aria-pressed.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### AJU-06 · permite seleccionar calidad automática

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/preferencias.cy.js#L67) · [Archivo local](../cypress/e2e/personaje/preferencias.cy.js) · Tanda 1

- **Riesgo:** Calidad automática que no se refleja en controles.
- **Cómo lo explico:** Selecciono auto, confirmo, verifico acceso rápido Auto y select al reabrir.
- **Límite:** No mide si el algoritmo escoge el nivel óptimo ni FPS.
- **Práctica:** Distingue selección del modo y eficacia de ese modo.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### AJU-07 · conserva la preferencia de detalle al reabrir ajustes

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/preferencias.cy.js#L76) · [Archivo local](../cypress/e2e/personaje/preferencias.cy.js) · Tanda 1

- **Riesgo:** Pérdida de la preferencia de detalle en la misma visita.
- **Cómo lo explico:** Selecciono detail, reabro y verifico valor y texto de estado no vacío.
- **Límite:** No verifica cada objeto detallado ni mantiene la opción tras reload.
- **Práctica:** Explica la debilidad de not.be.empty frente a un mensaje preciso.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### AJU-08 · el acceso rápido cambia de fluida a automática

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/preferencias.cy.js#L85) · [Archivo local](../cypress/e2e/personaje/preferencias.cy.js) · Tanda 1

- **Riesgo:** Acceso rápido sin sincronizar con el panel de ajustes.
- **Cómo lo explico:** Parto de Fluida, pulso acceso y compruebo Auto y select auto.
- **Límite:** No recorre todos los modos del control ni mide rendimiento.
- **Práctica:** Explica qué incoherencia detectaría entre dos controles del mismo estado.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

<a id="cas-casos"></a>

### CAS · Castillo y crónicas

#### CAS-01 · entra al castillo y muestra sus cinco objetos

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/castillo.cy.js#L20) · [Archivo local](../cypress/e2e/navegacion/castillo.cy.js) · Tanda 1

- **Riesgo:** Entrada al castillo sin contenido ni salida visible.
- **Cómo lo explico:** Pulso marcador; compruebo inside, salida, cinco marcadores interiores y exterior oculto.
- **Límite:** Cinco marcadores no acredita el render visual de toda la sala.
- **Práctica:** Explica por qué existe una comprobación de salida en una prueba de entrada.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### CAS-02 · sale del castillo con Volver a la plaza

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/castillo.cy.js#L29) · [Archivo local](../cypress/e2e/navegacion/castillo.cy.js) · Tanda 1

- **Riesgo:** El botón Volver a la plaza no restaura el exterior.
- **Cómo lo explico:** Entro, pulso leave y verifico salida de inside, botón oculto y marcador visible.
- **Límite:** No mide posición exacta de aparición.
- **Práctica:** Diferencia una transición real del simple ocultado del botón.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### CAS-03 · sale por el control de la puerta

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/castillo.cy.js#L38) · [Archivo local](../cypress/e2e/navegacion/castillo.cy.js) · Tanda 1

- **Riesgo:** Puerta visual y estado de visita desincronizados al salir.
- **Cómo lo explico:** Uso exit-portal y compruebo exterior, portal oculto y inside false guardado.
- **Límite:** No es un recorrido físico caminando hasta cruzar toda la geometría.
- **Práctica:** Explica qué aporta el almacenamiento además de la clase del body.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### CAS-04 · impide montar dentro del castillo

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/castillo.cy.js#L49) · [Archivo local](../cypress/e2e/navegacion/castillo.cy.js) · Tanda 1

- **Riesgo:** Montar en una zona donde la regla lo prohíbe.
- **Cómo lo explico:** Dentro del castillo pulso montar y espero estado false y mensaje de espera en plaza.
- **Límite:** No prueba cada combinación de acciones durante el salto.
- **Práctica:** Describe el requisito antes de explicar el selector.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### CAS-05 · desmonta al entrar con la montura invocada

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/castillo.cy.js#L57) · [Archivo local](../cypress/e2e/navegacion/castillo.cy.js) · Tanda 1

- **Riesgo:** Entrar al castillo conservando una montura incompatible.
- **Cómo lo explico:** Monto fuera, entro y verifico inside, montura false y nombre Centinela lunar.
- **Límite:** No certifica la animación de desmontaje ni ausencia de clipping.
- **Práctica:** Señala la precondición que diferencia este caso de CAS-04.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### CAS-06 · registra la primera crónica sin duplicarla al reabrir

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/castillo.cy.js#L66) · [Archivo local](../cypress/e2e/navegacion/castillo.cy.js) · Tanda 1

- **Riesgo:** Contar repetidamente la misma crónica.
- **Cómo lo explico:** Compruebo 0/5, abro/cierro perfil y espero 1/5; repito y debe seguir 1/5.
- **Límite:** No comprueba aún la conservación después de recargar.
- **Práctica:** Explica por qué abrir dos veces es esencial para el riesgo de duplicados.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### CAS-07 · completa cinco crónicas al leer todas las secciones

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/castillo.cy.js#L77) · [Archivo local](../cypress/e2e/navegacion/castillo.cy.js) · Tanda 1

- **Riesgo:** No completar el progreso al leer las cinco secciones.
- **Cómo lo explico:** Abro CV, recorro las cuatro pestañas restantes y espero 5/5.
- **Límite:** No valida cada contenido; REI-03 aporta esa comprobación.
- **Práctica:** Explica por qué el perfil inicial también cuenta aunque no se pulse su pestaña.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

<a id="tec-casos"></a>

### TEC · Teclado y foco

#### TEC-01 · Escape cierra la ayuda y devuelve el foco al botón de origen

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/teclado.cy.js#L18) · [Archivo local](../cypress/e2e/navegacion/teclado.cy.js) · Tanda 2

- **Riesgo:** Escape que cierra ayuda pero deja perdido el foco.
- **Cómo lo explico:** Abro ayuda por rol/nombre; pulso Escape y espero cierre y foco en help.
- **Límite:** No valida toda la interacción de lector de pantalla.
- **Práctica:** Justifica devolver el foco al origen y no siempre al canvas.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### TEC-02 · Escape cierra el mapa y devuelve el foco al botón de origen

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/teclado.cy.js#L26) · [Archivo local](../cypress/e2e/navegacion/teclado.cy.js) · Tanda 2

- **Riesgo:** Escape del mapa sin retorno utilizable.
- **Cómo lo explico:** Abro mapa por nombre accesible; Escape debe cerrar y enfocar map-action.
- **Límite:** No comprueba rutas del mapa.
- **Práctica:** Explica qué pasaría si cerrara el diálogo pero el foco quedara dentro.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### TEC-03 · Escape cierra el currículum

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/teclado.cy.js#L34) · [Archivo local](../cypress/e2e/navegacion/teclado.cy.js) · Tanda 2

- **Riesgo:** Escape no cierra el CV o pierde su punto de entrada.
- **Cómo lo explico:** Abro journal; Escape cierra y devuelve foco a cv-top.
- **Límite:** No examina todos los elementos del CV.
- **Práctica:** Explica por qué el retorno de foco es parte del resultado.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### TEC-04 · Escape cierra el contacto

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/teclado.cy.js#L42) · [Archivo local](../cypress/e2e/navegacion/teclado.cy.js) · Tanda 2

- **Riesgo:** Contacto que no se puede abandonar con teclado.
- **Cómo lo explico:** Abro contacto, pulso Escape y verifico cierre y foco en contact-action.
- **Límite:** No comprueba envío de correo.
- **Práctica:** Describe la preparación y el resultado sin depender de un clic de cierre.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### TEC-05 · Tab avanza entre los controles del contacto

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/teclado.cy.js#L50) · [Archivo local](../cypress/e2e/navegacion/teclado.cy.js) · Tanda 2

- **Riesgo:** Orden de tabulación que salta controles esenciales.
- **Cómo lo explico:** Desde cerrar contacto, Tab pasa al mailto y después a Copiar correo.
- **Límite:** No recorre todo el orden de foco ni todas las combinaciones de Shift+Tab.
- **Práctica:** Explica qué representa Cypress.Keyboard.Keys.TAB.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### TEC-06 · Enter activa el cierre de la ayuda

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/teclado.cy.js#L59) · [Archivo local](../cypress/e2e/navegacion/teclado.cy.js) · Tanda 2

- **Riesgo:** Botón de cierre que no responde a Enter.
- **Cómo lo explico:** Compruebo foco en Cerrar ayuda, envío realPress Enter y verifico cierre.
- **Límite:** No prueba todos los botones de la aplicación.
- **Práctica:** Explica por qué no sustituyo Enter por click aunque ambos cierren.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### TEC-07 · un atajo dentro de un diálogo no mueve la cámara

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/teclado.cy.js#L66) · [Archivo local](../cypress/e2e/navegacion/teclado.cy.js) · Tanda 2

- **Riesgo:** Atajos del juego activos dentro de un diálogo.
- **Cómo lo explico:** Envío V sobre cerrar ayuda y compruebo que no entra en retrato y el diálogo sigue abierto.
- **Límite:** El evento es sintético y se comprueba ese atajo concreto.
- **Práctica:** Localiza el requisito de separación entre diálogo y controles del mundo.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### TEC-08 · el atajo de montura no actúa con foco en la barra

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/teclado.cy.js#L73) · [Archivo local](../cypress/e2e/navegacion/teclado.cy.js) · Tanda 2

- **Riesgo:** Montura activada al escribir M con foco en la barra.
- **Cómo lo explico:** Enfoco help y envío M; la montura debe permanecer desactivada.
- **Límite:** No prueba todos los campos editables ni cualquier tecla.
- **Práctica:** Explica por qué preparar montura false importa para interpretar el resultado.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### TEC-09 · mantener M no alterna la montura repetidamente

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/teclado.cy.js#L78) · [Archivo local](../cypress/e2e/navegacion/teclado.cy.js) · Tanda 2

- **Riesgo:** Mantener M alterna continuamente montar/desmontar.
- **Cómo lo explico:** Envío un keydown normal y otro repeat true; al soltar espero montura true.
- **Límite:** No mide frecuencia del teclado físico.
- **Práctica:** Explica por qué un segundo evento normal sería otra intención del usuario.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### TEC-10 · mantener V no alterna la cámara repetidamente

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/teclado.cy.js#L85) · [Archivo local](../cypress/e2e/navegacion/teclado.cy.js) · Tanda 2

- **Riesgo:** Mantener V alterna la cámara repetidamente.
- **Cómo lo explico:** Envío V normal, V repetida y keyup; retrato debe seguir activo.
- **Límite:** No prueba todos los modos de cámara.
- **Práctica:** Relaciona repeat con idempotencia del manejador de atajos.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### TEC-11 · los selectores de ajustes tienen etiquetas utilizables

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/teclado.cy.js#L92) · [Archivo local](../cypress/e2e/navegacion/teclado.cy.js) · Tanda 2

- **Riesgo:** Selectores sin asociación utilizable con sus etiquetas.
- **Cómo lo explico:** Uso findByLabelText para cambiar y reabrir movimiento y calidad; verifico valores.
- **Límite:** Una etiqueta localizable no certifica toda la accesibilidad del formulario.
- **Práctica:** Compara este selector con buscar solamente el ID.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### TEC-12 · una pestaña del CV se puede activar con Enter

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/teclado.cy.js#L102) · [Archivo local](../cypress/e2e/navegacion/teclado.cy.js) · Tanda 2

- **Riesgo:** Pestaña del CV que solo responde al ratón.
- **Cómo lo explico:** Enfoco Formación por rol/nombre, envío Enter y compruebo MEDAC y aria-pressed true.
- **Límite:** No recorre toda la tabulación hasta llegar a ella.
- **Práctica:** Explica por qué enfocar directamente limita el alcance del caso.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### TEC-13 · I abre y cierra la mochila y devuelve el foco al mundo

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/smoke-reino.cy.js#L80) · [Archivo local](../cypress/e2e/personaje/smoke-reino.cy.js) · Tanda 1 · **Smoke**

- **Riesgo:** Mochila sin apertura/cierre mediante el atajo I.
- **Cómo lo explico:** Con foco en canvas envío I; verifico panel y foco en selección; otra I cierra y retorna al mundo.
- **Límite:** No comprueba persistencia de cada objeto seleccionado.
- **Práctica:** Distingue este retorno al mundo del retorno al botón de TEC-14.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### TEC-14 · Escape devuelve el foco al botón de mochila

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/teclado.cy.js#L110) · [Archivo local](../cypress/e2e/navegacion/teclado.cy.js) · Tanda 2

- **Riesgo:** Escape deja el foco o aria-expanded desincronizados.
- **Cómo lo explico:** Abro con botón; Escape cierra y devuelve foco al botón con aria-expanded false.
- **Límite:** No prueba todas las rutas de cierre posibles.
- **Práctica:** Explica por qué origen de apertura cambia el destino del foco.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### TEC-15 · Tab mantiene el foco dentro de la mochila

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/teclado.cy.js#L118) · [Archivo local](../cypress/e2e/navegacion/teclado.cy.js) · Tanda 2

- **Riesgo:** Tab escapa de un diálogo modal abierto.
- **Cómo lo explico:** Desde el objeto seleccionado uso Shift+Tab para llegar al cierre y al límite; el foco sigue dentro y Tab vuelve al cierre.
- **Límite:** No visita todos los controles intermedios de la mochila.
- **Práctica:** Dibuja el ciclo observado y explica la aserción closest inventory-dialog.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### TEC-16 · I no abre la mochila mientras otro diálogo está activo

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/teclado.cy.js#L129) · [Archivo local](../cypress/e2e/navegacion/teclado.cy.js) · Tanda 2

- **Riesgo:** I abre una segunda modal sobre la ayuda.
- **Cómo lo explico:** Con ayuda abierta pulso I; la ayuda sigue visible y la mochila oculta.
- **Límite:** No prueba cada pareja posible de diálogos.
- **Práctica:** Explica por qué impedir dos modales simultáneas protege la interacción.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### TEC-17 · el botón de cerrar permite reabrir desde el control de origen

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/teclado.cy.js#L136) · [Archivo local](../cypress/e2e/navegacion/teclado.cy.js) · Tanda 2

- **Riesgo:** Cerrar mochila impide reabrirla con teclado.
- **Cómo lo explico:** Cierro con botón, verifico foco en origen, pulso Enter y espero mochila y selección enfocada.
- **Límite:** No recorre todos los objetos del inventario.
- **Práctica:** Explica por qué esta secuencia detecta más que abrir dos veces por clic.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

<a id="map-casos"></a>

### MAP · Mapa

#### MAP-01 · el mapa enumera los seis lugares del distrito

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/mapa.cy.js#L18) · [Archivo local](../cypress/e2e/navegacion/mapa.cy.js) · Tanda 2

- **Riesgo:** Mapa incompleto o destinos que desaparecen.
- **Cómo lo explico:** Verifico seis botones y los seis nombres esperados en la lista.
- **Límite:** No comprueba todavía la ruta hacia cada destino.
- **Práctica:** Distingue cantidad correcta de identidad correcta de los destinos.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### MAP-02 · elegir el castillo desde la lista inicia su recorrido

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/mapa.cy.js#L24) · [Archivo local](../cypress/e2e/navegacion/mapa.cy.js) · Tanda 2

- **Riesgo:** Elegir castillo no inicia el recorrido.
- **Cómo lo explico:** Pulso su botón de lista y espero cierre de mapa y mensaje de seguimiento.
- **Límite:** El mensaje prueba inicio, no llegada ni validez de toda la ruta.
- **Práctica:** Señala qué prueba adicional exigirías para afirmar que llegó al castillo.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### MAP-03 · Enter activa un destino del mapa gráfico

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/mapa.cy.js#L31) · [Archivo local](../cypress/e2e/navegacion/mapa.cy.js) · Tanda 2

- **Riesgo:** Destino gráfico inutilizable mediante Enter.
- **Cómo lo explico:** Enfoco Establos por rol/nombre, envío Enter y verifico cierre y mensaje de ruta.
- **Límite:** No recorre la tabulación previa ni prueba un clic físico sobre el SVG.
- **Práctica:** Explica por qué aquí se usa cy.press para un manejador concreto del mapa.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### MAP-04 · el mapa señala la posición actual del personaje

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/mapa.cy.js#L39) · [Archivo local](../cypress/e2e/navegacion/mapa.cy.js) · Tanda 2

- **Riesgo:** Indicador del jugador fuera del mapa.
- **Cómo lo explico:** Leo cx/cy del punto SVG y verifico intervalos visibles 10–480 y 10–340.
- **Límite:** No demuestra correspondencia exacta entre coordenadas del mapa y del mundo.
- **Práctica:** Propón una comprobación independiente de ubicación real como mejora.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### MAP-05 · elegir una ruta desde el castillo devuelve al exterior

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/mapa.cy.js#L47) · [Archivo local](../cypress/e2e/navegacion/mapa.cy.js) · Tanda 2

- **Riesgo:** Seleccionar destino desde el interior deja bloqueado el personaje.
- **Cómo lo explico:** Entro al castillo, elijo Taberna y compruebo exterior, mapa cerrado, inside false y desplazamiento guardado.
- **Límite:** No demuestra llegada a la taberna ni calidad del algoritmo de rutas.
- **Práctica:** Explica por qué aquí se usa posición y no solo el mensaje de estado.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### MAP-06 · iniciar una ruta cancela la cámara de retrato

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/navegacion/mapa.cy.js#L63) · [Archivo local](../cypress/e2e/navegacion/mapa.cy.js) · Tanda 2

- **Riesgo:** Ruta y retrato permanecen activos de forma incompatible.
- **Cómo lo explico:** Activo retrato, elijo Herrería y espero desactivación de portrait-mode y aria-pressed false.
- **Límite:** No comprueba toda la transición visual de cámara.
- **Práctica:** Distingue incompatibilidad de modos de una medición de encuadre.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

<a id="mov-casos"></a>

### MOV · Pantallas y controles móviles

#### MOV-01 · el canvas ocupa la ventana del móvil sin desbordarla

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/pantallas.cy.js#L16) · [Archivo local](../cypress/e2e/personaje/pantallas.cy.js) · Tanda 2

- **Riesgo:** Canvas o acceso QA fuera de la pantalla móvil.
- **Cómo lo explico:** A 390×844 compruebo rectángulo del canvas, ancho del documento y enlace QA visible; guardo captura.
- **Límite:** No acredita que el 3D esté bien dibujado ni prueba un teléfono real.
- **Práctica:** Explica tamaño interno del canvas frente a su rectángulo CSS.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### MOV-02 · el canvas se adapta al girar la pantalla

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/pantallas.cy.js#L27) · [Archivo local](../cypress/e2e/personaje/pantallas.cy.js) · Tanda 2

- **Riesgo:** Girar la pantalla rompe tamaño o controles.
- **Cómo lo explico:** Cambio a 844×390; verifico canvas y que montar sigue funcionando.
- **Límite:** Viewport no reproduce sensores ni toda la rotación de un dispositivo.
- **Práctica:** Explica qué se comprueba además de las dimensiones.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### MOV-03 · volver a escritorio conserva el modo elegido

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/pantallas.cy.js#L38) · [Archivo local](../cypress/e2e/personaje/pantallas.cy.js) · Tanda 2

- **Riesgo:** Volver a escritorio sobrescribe la disposición elegida.
- **Cómo lo explico:** Tras preparar móvil paso a 1440×900; compruebo data-controls mobile, joystick y ancho.
- **Límite:** No prueba preferencia guardada después de recargar.
- **Práctica:** Distingue tamaño de pantalla de preferencia explícita del visitante.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### MOV-04 · los botones de cámara y montura son utilizables en móvil

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/pantallas.cy.js#L47) · [Archivo local](../cypress/e2e/personaje/pantallas.cy.js) · Tanda 2

- **Riesgo:** Cámara o montura no responden desde controles móviles.
- **Cómo lo explico:** Pulso ambos botones y compruebo retrato y aria-pressed de montura.
- **Límite:** Se ejecuta en Chrome de escritorio con viewport móvil.
- **Práctica:** Explica por qué no puedes afirmar interacción táctil física.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### MOV-05 · el mapa permite elegir destino en móvil

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/pantallas.cy.js#L54) · [Archivo local](../cypress/e2e/personaje/pantallas.cy.js) · Tanda 2

- **Riesgo:** Mapa móvil tapado o elección de destino inutilizable.
- **Cómo lo explico:** Pulso Abrir mapa, desplazo hasta Establos, elijo y compruebo cierre y mensaje.
- **Límite:** Prueba inicio del recorrido, no llegada a destino.
- **Práctica:** Reproduce una zona de cabecera que cubra el mapa y conserva el clic normal.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### MOV-06 · la ayuda se puede leer y cerrar en móvil

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/pantallas.cy.js#L61) · [Archivo local](../cypress/e2e/personaje/pantallas.cy.js) · Tanda 2

- **Riesgo:** Ayuda móvil oculta instrucciones o no permite cerrar.
- **Cómo lo explico:** Abro por nombre, compruebo texto joystick y cierro por botón accesible.
- **Límite:** No certifica comprensión ni lectura con asistencia.
- **Práctica:** Explica el valor de usar nombre accesible en ambos controles.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### MOV-07 · los ajustes siguen disponibles en una pantalla estrecha

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/pantallas.cy.js#L68) · [Archivo local](../cypress/e2e/personaje/pantallas.cy.js) · Tanda 2

- **Riesgo:** Ajustes inaccesibles en 320 píxeles.
- **Cómo lo explico:** Cambio viewport, abro ajustes, selecciono full y desplazo hasta confirmar; verifico estado y cierre.
- **Límite:** No es zoom real al 400 % ni una prueba de todos los campos.
- **Práctica:** Justifica scrollIntoView en lugar de force true.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### MOV-08 · la puerta permite regresar a la plaza en móvil

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/pantallas.cy.js#L77) · [Archivo local](../cypress/e2e/personaje/pantallas.cy.js) · Tanda 2

- **Riesgo:** Acceso al castillo o salida por puerta bloqueados en móvil.
- **Cómo lo explico:** Pulso marker, verifico interior, salgo por botón de puerta y espero exterior y joystick.
- **Límite:** No comprueba todos los puntos de colisión del edificio.
- **Práctica:** Explica el defecto real de la mochila y por qué no se relajó el clic.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

<a id="con-casos"></a>

### CON · Contacto

#### CON-01 · confirma la copia cuando el navegador la permite

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/entrada/contacto.cy.js#L18) · [Archivo local](../cypress/e2e/entrada/contacto.cy.js) · Tanda 2

- **Riesgo:** Copia permitida sin confirmación o con correo equivocado.
- **Cómo lo explico:** Stub de writeText que resuelve; compruebo una llamada exacta y mensaje Correo copiado.
- **Límite:** No modifica ni verifica el portapapeles real del sistema.
- **Práctica:** Explica qué comprueba calledOnceWithExactly además del mensaje.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### CON-02 · ofrece una alternativa cuando se rechaza la copia

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/entrada/contacto.cy.js#L28) · [Archivo local](../cypress/e2e/entrada/contacto.cy.js) · Tanda 2

- **Riesgo:** Permiso de copia denegado deja al usuario sin alternativa.
- **Cómo lo explico:** Stub que rechaza; verifico instrucción alternativa y enlace mailto visible.
- **Límite:** No reproduce el diálogo nativo real de permisos.
- **Práctica:** Distingue un rechazo de Promise de una respuesta HTTP fallida.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### CON-03 · el contacto del reino apunta a los perfiles profesionales

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/entrada/contacto.cy.js#L38) · [Archivo local](../cypress/e2e/entrada/contacto.cy.js) · Tanda 2

- **Riesgo:** Perfiles profesionales mal enlazados desde el juego.
- **Cómo lo explico:** Compruebo href de GitHub y LinkedIn y rel del enlace GitHub.
- **Límite:** No navego por terceros ni valido su contenido.
- **Práctica:** Explica qué parte de la seguridad de enlaces se comprueba y cuál no.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### CON-04 · se puede consultar el perfil ligero desde el reino

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/entrada/contacto.cy.js#L44) · [Archivo local](../cypress/e2e/entrada/contacto.cy.js) · Tanda 2

- **Riesgo:** No poder pasar del juego al perfil ligero.
- **Cómo lo explico:** Pulso Perfil profesional; verifico ruta, encabezado y ausencia de scene.
- **Límite:** No demuestra por sí solo que nunca se descargara código 3D antes.
- **Práctica:** Compara el alcance con REC-08, que comienza en la bienvenida.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

<a id="cam-casos"></a>

### CAM · Cámara

#### CAM-01 · la rueda acerca la cámara sin mover al personaje

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/camara.cy.js#L18) · [Archivo local](../cypress/e2e/personaje/camara.cy.js) · Tanda 2

- **Riesgo:** Zoom que mueve indebidamente al personaje.
- **Cómo lo explico:** Guardo inicio, envío rueda -200 y compruebo radio menor con x/z dentro de 0,02.
- **Límite:** No valida la imagen final ni una distancia física en pantalla.
- **Práctica:** Explica por qué hay aserciones de radio y de posición en el mismo caso.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### CAM-02 · el zoom no atraviesa su límite cercano

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/camara.cy.js#L36) · [Archivo local](../cypress/e2e/personaje/camara.cy.js) · Tanda 2

- **Riesgo:** Rueda atraviesa el límite cercano del zoom.
- **Cómo lo explico:** Envío un delta grande negativo y espero radio guardado igual a 10.
- **Límite:** No comprueba todos los radios intermedios ni colisiones de cámara.
- **Práctica:** Explica de dónde debe proceder el límite 10.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### CAM-03 · el zoom respeta su límite lejano

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/camara.cy.js#L45) · [Archivo local](../cypress/e2e/personaje/camara.cy.js) · Tanda 2

- **Riesgo:** Rueda aleja más allá del límite permitido.
- **Cómo lo explico:** Envío delta positivo grande y espero radio 38.
- **Límite:** No equivale al máximo 45 que se sanea al recuperar una visita.
- **Práctica:** Justifica que CAM-03 y DAT-04 observan contratos distintos.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### CAM-04 · arrastrar el mundo cambia su orientación

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/camara.cy.js#L54) · [Archivo local](../cypress/e2e/personaje/camara.cy.js) · Tanda 2

- **Riesgo:** Arrastre sin efecto o captura de puntero rota.
- **Cómo lo explico:** Guardo yaw inicial, mantengo ratón, desplazo y suelto; espero cambio absoluto mayor que 0,1.
- **Límite:** No demuestra ausencia de atraviesos de geometría.
- **Práctica:** Explica por qué los comandos realMouseDown/Move/Up se usan como secuencia.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

<a id="inp-casos"></a>

### INP · Movimiento y parada

#### INP-01 · las flechas también desplazan al personaje

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/movimiento.cy.js#L18) · [Archivo local](../cypress/e2e/personaje/movimiento.cy.js) · Tanda 2

- **Riesgo:** Las flechas dejan de mover al personaje.
- **Cómo lo explico:** Guardo posición, envío ArrowUp al canvas y espero distancia mayor que 0,2; libero.
- **Límite:** No mide dirección exacta ni parada posterior.
- **Práctica:** Compara este caso con MUN-10 sin confundir las teclas.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### INP-02 · soltar la tecla detiene el desplazamiento

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/movimiento.cy.js#L35) · [Archivo local](../cypress/e2e/personaje/movimiento.cy.js) · Tanda 2

- **Riesgo:** Movimiento atascado después de soltar W.
- **Cómo lo explico:** Confirmo movimiento, envío keyup y comparo dos guardados nuevos después del margen de inercia: distancia menor que 0,02.
- **Límite:** Depende de guardado periódico y no prueba todas las velocidades.
- **Práctica:** Explica por qué savedAt evita comparar dos lecturas del mismo estado.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### INP-03 · perder el foco de la ventana libera las teclas de movimiento

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/movimiento.cy.js#L67) · [Archivo local](../cypress/e2e/personaje/movimiento.cy.js) · Tanda 2

- **Riesgo:** Seguir caminando al perder el foco sin recibir keyup.
- **Cómo lo explico:** Tras movimiento envío blur a ventana y comparo guardados posteriores sin desplazamiento.
- **Límite:** El cambio de foco es sintético, no un cambio físico de aplicación.
- **Práctica:** Describe la diferencia de riesgo respecto a INP-02.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### INP-04 · cerrar un diálogo no reanuda una tecla que se mantenía pulsada

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/movimiento.cy.js#L99) · [Archivo local](../cypress/e2e/personaje/movimiento.cy.js) · Tanda 2

- **Riesgo:** Cerrar una modal reanuda una tecla anterior.
- **Cómo lo explico:** Mantengo W, abro y cierro ayuda y compruebo parada en guardados posteriores.
- **Límite:** No prueba todas las modales ni combinaciones de entradas.
- **Práctica:** Explica por qué se libera W al final y no se usa para provocar la parada comprobada.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### INP-05 · arrastrar y soltar el joystick mueve y detiene al personaje

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/movimiento.cy.js#L135) · [Archivo local](../cypress/e2e/personaje/movimiento.cy.js) · Tanda 2

- **Riesgo:** Joystick que no mueve o no se detiene al soltar.
- **Cómo lo explico:** Paso a móvil, hago arrastre nativo sobre joystick, confirmo desplazamiento y compruebo parada tras soltar.
- **Límite:** Usa ratón, no el subsistema táctil de un teléfono físico.
- **Práctica:** Explica keepMouseDownButton y el cambio de disposición dentro del caso.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### INP-06 · perder el foco durante el joystick no deja movimiento atascado

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/personaje/movimiento.cy.js#L171) · [Archivo local](../cypress/e2e/personaje/movimiento.cy.js) · Tanda 2

- **Riesgo:** Joystick atascado tras perder el foco.
- **Cómo lo explico:** Mantengo arrastre, confirmo movimiento, envío blur y después mouseUp; compruebo parada.
- **Límite:** Con blur seguido de mouseUp, el caso no aísla por completo el efecto individual de blur.
- **Práctica:** Propón una prueba complementaria que distinga liberar foco de soltar el puntero.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

<a id="vis-casos"></a>

### VIS · Persistencia

#### VIS-01 · conserva la noche después de recargar

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/visitas.cy.js#L18) · [Archivo local](../cypress/e2e/persistencia/visitas.cy.js) · Tanda 3

- **Riesgo:** Perder la noche al recargar.
- **Cómo lo explico:** Activo noche, recargo, continúo visita y verifico clase night y botón pulsado.
- **Límite:** No prueba persistencia entre dominios ni sincronización de cuenta.
- **Práctica:** Explica por qué reload aquí no contradice el aislamiento entre tests.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### VIS-02 · conserva la vuelta al día después de recargar

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/visitas.cy.js#L32) · [Archivo local](../cypress/e2e/persistencia/visitas.cy.js) · Tanda 3

- **Riesgo:** Guardar siempre noche aunque se vuelva al día.
- **Cómo lo explico:** Activo y desactivo noche; recargo y verifico ausencia de clase y botón false.
- **Límite:** No mide cambios visuales de iluminación.
- **Práctica:** Explica por qué es importante probar explícitamente el estado false.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### VIS-03 · restaura la montura en el exterior

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/visitas.cy.js#L46) · [Archivo local](../cypress/e2e/persistencia/visitas.cy.js) · Tanda 3

- **Riesgo:** Visita exterior que pierde montura.
- **Cómo lo explico:** Monto, recargo y continúo; compruebo botón pulsado y nombre Sable.
- **Límite:** No verifica posición exacta ni estado montado dentro del castillo.
- **Práctica:** Señala la precondición exterior de este contrato.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### VIS-04 · continúa dentro del castillo

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/visitas.cy.js#L60) · [Archivo local](../cypress/e2e/persistencia/visitas.cy.js) · Tanda 3

- **Riesgo:** Continuar una visita interior devuelve indebidamente a la plaza.
- **Cómo lo explico:** Entro, recargo y continúo; espero inside y salida visible.
- **Límite:** No comprueba conservación de todas las decoraciones ni coordenadas.
- **Práctica:** Explica por qué compruebo una salida utilizable además del estado interior.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### VIS-05 · conserva las crónicas descubiertas

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/visitas.cy.js#L74) · [Archivo local](../cypress/e2e/persistencia/visitas.cy.js) · Tanda 3

- **Riesgo:** Perder o duplicar progreso de crónicas tras recarga.
- **Cómo lo explico:** Descubro perfil y proyectos; compruebo 2/5 antes y después de continuar.
- **Límite:** No cubre por sí solo crónicas desconocidas o duplicadas importadas.
- **Práctica:** Compara con DAT-03, que prepara datos inválidos.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### VIS-06 · empezar de nuevo borra el progreso y la noche

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/visitas.cy.js#L89) · [Archivo local](../cypress/e2e/persistencia/visitas.cy.js) · Tanda 3

- **Riesgo:** Empezar de nuevo conserva progreso anterior.
- **Cómo lo explico:** Activo noche y descubro perfil; recargo, reinicio y verifico 0/5, día y exterior.
- **Límite:** No afirma borrar todas las preferencias de usuario o cada clave de almacenamiento.
- **Práctica:** Explica la diferencia entre reiniciar visita y borrar toda la configuración.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### VIS-07 · conserva la disposición móvil tras recargar

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/visitas.cy.js#L102) · [Archivo local](../cypress/e2e/persistencia/visitas.cy.js) · Tanda 3

- **Riesgo:** Perder la disposición móvil guardada.
- **Cómo lo explico:** Elijo móvil, recargo y verifico selección y data-controls mobile en ajustes.
- **Límite:** No necesita un teléfono físico para comprobar ese dato.
- **Práctica:** Distingue este caso de MOV-03, que solo cambia viewport.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### VIS-08 · conserva la preferencia de movimiento completo

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/visitas.cy.js#L114) · [Archivo local](../cypress/e2e/persistencia/visitas.cy.js) · Tanda 3

- **Riesgo:** Preferencia de movimiento completo no recuperada.
- **Cómo lo explico:** Selecciono full, recargo y verifico select y atributo del body.
- **Límite:** No certifica que todas las animaciones respeten el valor.
- **Práctica:** Distingue almacenamiento correcto de comportamiento visual correcto.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### VIS-09 · conserva la calidad automática

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/visitas.cy.js#L126) · [Archivo local](../cypress/e2e/persistencia/visitas.cy.js) · Tanda 3

- **Riesgo:** Calidad automática no conservada.
- **Cómo lo explico:** Cambio a auto, recargo y compruebo el selector recuperado.
- **Límite:** No mide decisiones del algoritmo automático.
- **Práctica:** Explica por qué la preparación fluida permite observar un cambio real.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### VIS-10 · conserva un volumen elegido por el visitante

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/visitas.cy.js#L137) · [Archivo local](../cypress/e2e/persistencia/visitas.cy.js) · Tanda 3

- **Riesgo:** Volumen guardado distinto del mostrado al volver.
- **Cómo lo explico:** Asigno 8 y evento input, recargo y verifico valor y etiqueta 8 %.
- **Límite:** No mide amplitud real del audio.
- **Práctica:** Explica cómo comprobarías por separado que el audio aplica ese volumen.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### VIS-11 · no vuelve a activar la música silenciada

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/visitas.cy.js#L149) · [Archivo local](../cypress/e2e/persistencia/visitas.cy.js) · Tanda 3

- **Riesgo:** Música vuelve a activarse sin consentimiento al recargar.
- **Cómo lo explico:** La preparación ya la desactiva; recargo y verifico checkbox y audio pausado.
- **Límite:** No trata cambios de permisos del navegador ni errores del archivo de sonido.
- **Práctica:** Señala de dónde sale el estado silenciado inicial.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### VIS-12 · una visita guardada no impide elegir el perfil ligero

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/visitas.cy.js#L160) · [Archivo local](../cypress/e2e/persistencia/visitas.cy.js) · Tanda 3

- **Riesgo:** Visita guardada obliga a cargar el mundo.
- **Cómo lo explico:** Guardo visita interior, recargo, veo reinicio disponible, cambio a perfil y verifico su ruta y h1.
- **Límite:** No traslada almacenamiento entre Vercel y Sites.
- **Práctica:** Explica por qué elegir perfil debe ocultar Empezar de nuevo.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

<a id="dat-casos"></a>

### DAT · Almacenamiento y datos inválidos

#### DAT-01 · permite explorar si no se puede leer el almacenamiento

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/almacenamiento.cy.js#L3) · [Archivo local](../cypress/e2e/persistencia/almacenamiento.cy.js) · Tanda 3

- **Riesgo:** Storage bloqueado impide incluso explorar.
- **Cómo lo explico:** Antes de iniciar, stub de getItem lanza error; entro y compruebo mapa utilizable.
- **Límite:** No reproduce todas las políticas privadas del navegador.
- **Práctica:** Explica por qué uso Storage.prototype antes de la aplicación.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### DAT-02 · permite explorar cuando se agota la cuota de guardado

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/almacenamiento.cy.js#L16) · [Archivo local](../cypress/e2e/persistencia/almacenamiento.cy.js) · Tanda 3

- **Riesgo:** Fallo al guardar rompe la navegación.
- **Cómo lo explico:** Stub de setItem que lanza error; entro y salgo del castillo.
- **Límite:** No prueba la cuota real ni demuestra que el progreso pueda conservarse sin almacenamiento.
- **Práctica:** Distingue degradación funcional de persistencia exitosa.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### DAT-03 · descarta crónicas desconocidas y duplicadas de una visita

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/almacenamiento.cy.js#L31) · [Archivo local](../cypress/e2e/persistencia/almacenamiento.cy.js) · Tanda 3

- **Riesgo:** Crónicas duplicadas o desconocidas inflan el progreso.
- **Cómo lo explico:** Preparo about repetida y desconocida; compruebo resumen 1 de 5 y contador 1/5.
- **Límite:** No prueba todas las estructuras posibles de JSON.
- **Práctica:** Explica la combinación de deduplicar y validar identificadores.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### DAT-04 · limita las coordenadas y el zoom de una visita fuera de rango

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/almacenamiento.cy.js#L44) · [Archivo local](../cypress/e2e/persistencia/almacenamiento.cy.js) · Tanda 3

- **Riesgo:** Coordenadas extremas dejan al visitante fuera del mundo.
- **Cómo lo explico:** Preparo x/z/radius extremos y compruebo rangos x [-23,3;21,15], z [-21,8;17,5] y radio 45.
- **Límite:** No demuestra una ubicación libre de todos los obstáculos.
- **Práctica:** Compara saneamiento de visita con límites de la rueda 10/38.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### DAT-05 · ignora preferencias guardadas con una estructura incorrecta

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/almacenamiento.cy.js#L61) · [Archivo local](../cypress/e2e/persistencia/almacenamiento.cy.js) · Tanda 3

- **Riesgo:** JSON válido con tipo incorrecto aceptado como preferencias.
- **Cómo lo explico:** Guardo un array y compruebo recuperación de system, auto y volumen 14.
- **Límite:** No es JSON sintácticamente corrupto; ese riesgo está en REC-04.
- **Práctica:** Explica la diferencia entre parsear correctamente y validar estructura.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

<a id="rec-casos"></a>

### REC · Recuperación

#### REC-01 · ignora una visita con JSON corrupto

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/fallos.cy.js#L14) · [Archivo local](../cypress/e2e/persistencia/fallos.cy.js) · Tanda 3

- **Riesgo:** JSON de visita corrupto rompe la bienvenida.
- **Cómo lo explico:** Preparo {roto antes de cargar y verifico nueva exploración, sin reinicio visible y con Continuar habilitado.
- **Límite:** No entra al mundo en este caso.
- **Práctica:** Explica por qué no basta comprobar que la página devuelve HTTP 200.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### REC-02 · ignora una versión de visita no compatible

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/fallos.cy.js#L24) · [Archivo local](../cypress/e2e/persistencia/fallos.cy.js) · Tanda 3

- **Riesgo:** Visita de una versión desconocida se restaura incorrectamente.
- **Cómo lo explico:** Guardo version 99 y verifico que se ofrece explorar desde cero.
- **Límite:** No prueba una migración completa entre todas las versiones.
- **Práctica:** Distingue ignorar una versión no soportada de migrar una versión antigua conocida.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### REC-03 · rechaza posiciones de visita que no son números

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/fallos.cy.js#L34) · [Archivo local](../cypress/e2e/persistencia/fallos.cy.js) · Tanda 3

- **Riesgo:** Posición no numérica contamina el estado del juego.
- **Cómo lo explico:** Guardo x como texto y verifico ruta de nueva exploración.
- **Límite:** No prueba todos los casos de NaN, infinito o números fuera de rango.
- **Práctica:** Explica la relación con DAT-04 sin confundir tipo y rango.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### REC-04 · recupera valores por defecto si las preferencias están corruptas

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/fallos.cy.js#L44) · [Archivo local](../cypress/e2e/persistencia/fallos.cy.js) · Tanda 3

- **Riesgo:** Preferencias con JSON roto impiden entrar o producen opciones inválidas.
- **Cómo lo explico:** Preparo JSON corrupto y verifico system, auto y volumen 14 en ajustes.
- **Límite:** No demuestra por sí solo todos los valores por defecto del producto.
- **Práctica:** Compara con DAT-05, que usa JSON válido con estructura incorrecta.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### REC-05 · limita el volumen e ignora opciones guardadas desconocidas

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/fallos.cy.js#L56) · [Archivo local](../cypress/e2e/persistencia/fallos.cy.js) · Tanda 3

- **Riesgo:** Volumen extremo y opciones desconocidas aceptados sin saneamiento.
- **Cómo lo explico:** Guardo volume 5 y opciones inválidas; espero volumen UI 25, system y auto.
- **Límite:** No es una prueba de reproducción audible; la escala guardada difiere del porcentaje UI.
- **Práctica:** Explica por qué no se espera 5 en el selector de volumen.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### REC-06 · muestra una salida clara si no se descarga el mundo

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/fallos.cy.js#L68) · [Archivo local](../cypress/e2e/persistencia/fallos.cy.js) · Tanda 3

- **Riesgo:** Fallo de app.js deja una pantalla bloqueada.
- **Cómo lo explico:** Intercepto error de red, espero alias y compruebo mensaje, bienvenida, botón habilitado y busy eliminado.
- **Límite:** Solo simula ese recurso; no una caída completa de Internet.
- **Práctica:** Explica por qué registro intercept antes de pulsar Continuar.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### REC-07 · permite entrar al perfil después de fallar el mundo

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/fallos.cy.js#L81) · [Archivo local](../cypress/e2e/persistencia/fallos.cy.js) · Tanda 3

- **Riesgo:** Tras fallar el mundo no existe una alternativa profesional.
- **Cómo lo explico:** Provoco error de app.js y después elijo perfil; verifico ruta y h1.
- **Límite:** No comprueba todas las posibles recuperaciones del mundo.
- **Práctica:** Distingue recuperación al perfil de reintentar la descarga del 3D.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### REC-08 · el recorrido profesional no descarga el módulo 3D

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/fallos.cy.js#L95) · [Archivo local](../cypress/e2e/persistencia/fallos.cy.js) · Tanda 3

- **Riesgo:** Perfil ligero descarga innecesariamente el módulo 3D.
- **Cómo lo explico:** Espío app.js, elijo perfil y verifico cero peticiones observadas y canvas ausente.
- **Límite:** No demuestra ausencia de todo recurso 3D imaginable o de futuras descargas tras la aserción.
- **Práctica:** Explica el alcance temporal de una aserción negativa sobre peticiones.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### REC-09 · mantiene la plaza utilizable si falla el interior

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/fallos.cy.js#L105) · [Archivo local](../cypress/e2e/persistencia/fallos.cy.js) · Tanda 3

- **Riesgo:** Interior que falla deja plaza o ayuda inutilizables.
- **Cómo lo explico:** Intercepto archive-decor.js, intento entrar y compruebo exterior, marcador y apertura de ayuda.
- **Límite:** No verifica todos los errores de cada recurso de decoración.
- **Práctica:** Explica por qué poder abrir ayuda es evidencia de recuperación utilizable.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### REC-10 · conserva controles funcionales cuando WebGL no está disponible

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/persistencia/fallos.cy.js#L121) · [Archivo local](../cypress/e2e/persistencia/fallos.cy.js) · Tanda 3

- **Riesgo:** Sin WebGL la aplicación queda inutilizable.
- **Cómo lo explico:** Stub devuelve null solo para contextos WebGL; conservo getContext original para otros, entro, monto y abro mapa.
- **Límite:** No comprueba calidad visual de la alternativa ni hardware real sin WebGL.
- **Práctica:** Explica por qué no devuelvo null para todos los tipos de contexto.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

<a id="axe-casos"></a>

### AXE · Accesibilidad automática

#### AXE-01 · bienvenida en escritorio

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/accesibilidad/paginas.cy.js#L3) · [Archivo local](../cypress/e2e/accesibilidad/paginas.cy.js) · Tanda 3

- **Riesgo:** Barreras HTML detectables automáticamente en bienvenida de escritorio.
- **Cómo lo explico:** Visito / y espero la bienvenida. Inyecto axe, ejecuto sus reglas predeterminadas y escribo los problemas en AXE-01.json si aparecen.
- **Límite:** El aprobado se limita al documento examinado en escritorio; no certifica canvas, comprensión, lector de pantalla o toda la aplicación.
- **Práctica:** Localiza el estado previo a injectAxe; en una copia local introduce una barrera y explica la regla y el nodo del informe.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### AXE-02 · perfil profesional en escritorio

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/accesibilidad/paginas.cy.js#L12) · [Archivo local](../cypress/e2e/accesibilidad/paginas.cy.js) · Tanda 3

- **Riesgo:** Barreras HTML detectables automáticamente en perfil de escritorio.
- **Cómo lo explico:** Visito /perfil y compruebo Pablo en el h1. Inyecto axe, ejecuto sus reglas predeterminadas y escribo los problemas en AXE-02.json si aparecen.
- **Límite:** El aprobado se limita al documento examinado en escritorio; no certifica canvas, comprensión, lector de pantalla o toda la aplicación.
- **Práctica:** Localiza el estado previo a injectAxe; en una copia local introduce una barrera y explica la regla y el nodo del informe.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### AXE-03 · perfil profesional en móvil

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/accesibilidad/paginas.cy.js#L21) · [Archivo local](../cypress/e2e/accesibilidad/paginas.cy.js) · Tanda 3

- **Riesgo:** Barreras HTML detectables automáticamente en perfil móvil.
- **Cómo lo explico:** Uso 390×844, visito /perfil y compruebo su encabezado. Inyecto axe, ejecuto sus reglas predeterminadas y escribo los problemas en AXE-03.json si aparecen.
- **Límite:** El aprobado se limita al documento examinado a 390×844; no certifica canvas, comprensión, lector de pantalla o toda la aplicación.
- **Práctica:** Localiza el estado previo a injectAxe; en una copia local introduce una barrera y explica la regla y el nodo del informe.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### AXE-04 · exploración de la plaza

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/accesibilidad/reino.cy.js#L18) · [Archivo local](../cypress/e2e/accesibilidad/reino.cy.js) · Tanda 3

- **Riesgo:** Barreras HTML detectables automáticamente en plaza del reino.
- **Cómo lo explico:** Entro al reino mediante la preparación habitual. Inyecto axe, ejecuto sus reglas predeterminadas y escribo los problemas en AXE-04.json si aparecen.
- **Límite:** El aprobado se limita al documento examinado con el mundo abierto; no certifica canvas, comprensión, lector de pantalla o toda la aplicación.
- **Práctica:** Localiza el estado previo a injectAxe; en una copia local introduce una barrera y explica la regla y el nodo del informe.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### AXE-05 · diálogo de ajustes

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/accesibilidad/reino.cy.js#L25) · [Archivo local](../cypress/e2e/accesibilidad/reino.cy.js) · Tanda 3

- **Riesgo:** Barreras HTML detectables automáticamente en diálogo de ajustes.
- **Cómo lo explico:** Abro ajustes y espero su visibilidad. Inyecto axe, ejecuto sus reglas predeterminadas y escribo los problemas en AXE-05.json si aparecen.
- **Límite:** El aprobado se limita al documento examinado con ajustes abiertos; no certifica canvas, comprensión, lector de pantalla o toda la aplicación.
- **Práctica:** Localiza el estado previo a injectAxe; en una copia local introduce una barrera y explica la regla y el nodo del informe.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### AXE-06 · diálogo del mapa

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/accesibilidad/reino.cy.js#L34) · [Archivo local](../cypress/e2e/accesibilidad/reino.cy.js) · Tanda 3

- **Riesgo:** Barreras HTML detectables automáticamente en mapa.
- **Cómo lo explico:** Abro el mapa y verifico su diálogo. Inyecto axe, ejecuto sus reglas predeterminadas y escribo los problemas en AXE-06.json si aparecen.
- **Límite:** El aprobado se limita al documento examinado con mapa abierto; no certifica canvas, comprensión, lector de pantalla o toda la aplicación.
- **Práctica:** Localiza el estado previo a injectAxe; en una copia local introduce una barrera y explica la regla y el nodo del informe.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### AXE-07 · diálogo de contacto

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/accesibilidad/reino.cy.js#L43) · [Archivo local](../cypress/e2e/accesibilidad/reino.cy.js) · Tanda 3

- **Riesgo:** Barreras HTML detectables automáticamente en contacto.
- **Cómo lo explico:** Abro contacto y espero su diálogo. Inyecto axe, ejecuto sus reglas predeterminadas y escribo los problemas en AXE-07.json si aparecen.
- **Límite:** El aprobado se limita al documento examinado con contacto abierto; no certifica canvas, comprensión, lector de pantalla o toda la aplicación.
- **Práctica:** Localiza el estado previo a injectAxe; en una copia local introduce una barrera y explica la regla y el nodo del informe.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### AXE-08 · currículum del reino

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/accesibilidad/reino.cy.js#L52) · [Archivo local](../cypress/e2e/accesibilidad/reino.cy.js) · Tanda 3

- **Riesgo:** Barreras HTML detectables automáticamente en CV dentro del juego.
- **Cómo lo explico:** Abro journal y verifico visibilidad. Inyecto axe, ejecuto sus reglas predeterminadas y escribo los problemas en AXE-08.json si aparecen.
- **Límite:** El aprobado se limita al documento examinado con CV abierto; no certifica canvas, comprensión, lector de pantalla o toda la aplicación.
- **Práctica:** Localiza el estado previo a injectAxe; en una copia local introduce una barrera y explica la regla y el nodo del informe.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### AXE-09 · ayuda del viajero

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/accesibilidad/otros-estados.cy.js#L18) · [Archivo local](../cypress/e2e/accesibilidad/otros-estados.cy.js) · Tanda 3

- **Riesgo:** Barreras HTML detectables automáticamente en ayuda.
- **Cómo lo explico:** Abro ayuda y espero su diálogo. Inyecto axe, ejecuto sus reglas predeterminadas y escribo los problemas en AXE-09.json si aparecen.
- **Límite:** El aprobado se limita al documento examinado con ayuda abierta; no certifica canvas, comprensión, lector de pantalla o toda la aplicación.
- **Práctica:** Localiza el estado previo a injectAxe; en una copia local introduce una barrera y explica la regla y el nodo del informe.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### AXE-10 · interior del castillo

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/accesibilidad/otros-estados.cy.js#L27) · [Archivo local](../cypress/e2e/accesibilidad/otros-estados.cy.js) · Tanda 3

- **Riesgo:** Barreras HTML detectables automáticamente en interior del castillo.
- **Cómo lo explico:** Entro y compruebo inside antes de auditar. Inyecto axe, ejecuto sus reglas predeterminadas y escribo los problemas en AXE-10.json si aparecen.
- **Límite:** El aprobado se limita al documento examinado dentro del castillo; no certifica canvas, comprensión, lector de pantalla o toda la aplicación.
- **Práctica:** Localiza el estado previo a injectAxe; en una copia local introduce una barrera y explica la regla y el nodo del informe.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### AXE-11 · plaza en modo nocturno

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/accesibilidad/otros-estados.cy.js#L36) · [Archivo local](../cypress/e2e/accesibilidad/otros-estados.cy.js) · Tanda 3

- **Riesgo:** Barreras HTML detectables automáticamente en plaza nocturna.
- **Cómo lo explico:** Activo noche y compruebo la clase night. Inyecto axe, ejecuto sus reglas predeterminadas y escribo los problemas en AXE-11.json si aparecen.
- **Límite:** El aprobado se limita al documento examinado en modo nocturno; no certifica canvas, comprensión, lector de pantalla o toda la aplicación.
- **Práctica:** Localiza el estado previo a injectAxe; en una copia local introduce una barrera y explica la regla y el nodo del informe.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### AXE-12 · mapa en una pantalla móvil

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/accesibilidad/otros-estados.cy.js#L45) · [Archivo local](../cypress/e2e/accesibilidad/otros-estados.cy.js) · Tanda 3

- **Riesgo:** Barreras HTML detectables automáticamente en mapa móvil.
- **Cómo lo explico:** Cambio a 390×844, abro mapa y espero el diálogo. Inyecto axe, ejecuto sus reglas predeterminadas y escribo los problemas en AXE-12.json si aparecen.
- **Límite:** El aprobado se limita al documento examinado a 390×844 con mapa abierto; no certifica canvas, comprensión, lector de pantalla o toda la aplicación.
- **Práctica:** Localiza el estado previo a injectAxe; en una copia local introduce una barrera y explica la regla y el nodo del informe.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### AXE-13 · bienvenida en una pantalla estrecha

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/accesibilidad/entrada-movil.cy.js#L3) · [Archivo local](../cypress/e2e/accesibilidad/entrada-movil.cy.js) · Tanda 3

- **Riesgo:** Barreras HTML detectables automáticamente en bienvenida estrecha.
- **Cómo lo explico:** Uso 320×568, verifico bienvenida, enlace QA y ancho sin desbordamiento. Inyecto axe, ejecuto sus reglas predeterminadas y escribo los problemas en AXE-13.json si aparecen.
- **Límite:** El aprobado se limita al documento examinado a 320×568; no certifica canvas, comprensión, lector de pantalla o toda la aplicación.
- **Práctica:** Localiza el estado previo a injectAxe; en una copia local introduce una barrera y explica la regla y el nodo del informe.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

<a id="lec-casos"></a>

### LEC · Lectura y ficha QA

#### LEC-01 · el perfil cabe en una pantalla de 320 píxeles

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/accesibilidad/lectura.cy.js#L2) · [Archivo local](../cypress/e2e/accesibilidad/lectura.cy.js) · Tanda 3

- **Riesgo:** Perfil que exige desplazamiento horizontal en 320 píxeles.
- **Cómo lo explico:** A 320×780 compruebo h1 y ancho del documento no mayor que el visible.
- **Límite:** No equivale a zoom real al 400 % ni certifica tamaño de todas las letras.
- **Práctica:** Explica el motivo de no comparar una captura por píxeles.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### LEC-02 · la ficha del proyecto cabe en 390 píxeles

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/accesibilidad/lectura.cy.js#L11) · [Archivo local](../cypress/e2e/accesibilidad/lectura.cy.js) · Tanda 3

- **Riesgo:** Ficha QA ilegible en móvil o desconectada de su workflow.
- **Cómo lo explico:** A 390×780 verifico título, enlace YAML, auditoría axe y ausencia de desbordamiento.
- **Límite:** No acredita que GitHub esté disponible o que su última ejecución apruebe.
- **Práctica:** Señala por separado las aserciones de contenido, accesibilidad y tamaño.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________

#### LEC-03 · la mochila se abre en móvil sin desbordamiento y ofrece un cierre amplio

[Código del caso](https://github.com/Pablosky76/portfolio-qa-cypress/blob/a9bb54443c36f97e097422410292b9f24be1b1b2/cypress/e2e/accesibilidad/lectura.cy.js#L23) · [Archivo local](../cypress/e2e/accesibilidad/lectura.cy.js) · Tanda 3

- **Riesgo:** Mochila móvil desbordada o sin acceso claro al proyecto QA.
- **Cómo lo explico:** Compruebo selección quality y texto 128, ancho del diálogo, cierre de al menos 44×44 y retorno de foco.
- **Límite:** No comprueba todos los enlaces del objeto ni un lector de pantalla real.
- **Práctica:** Explica por qué se mide el botón de cierre además de comprobar que existe.

Mi nivel comprobado: ☐ 0 · ☐ 1 · ☐ 2 · ☐ 3. Evidencia de mi práctica: ____________________
