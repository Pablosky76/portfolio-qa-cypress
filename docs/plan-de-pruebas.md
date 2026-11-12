# Plan de pruebas · 120 casos

Aplicación: Archivo de la Alianza. Ampliación: 12 de noviembre de 2026.

## Riesgos y alcance

Prioridad alta: acceso al portfolio y CV, recuperación frente a fallos, conservación de visitas, controles utilizables y accesibilidad. Prioridad media: cámara, montura, mapa y preferencias. Los casos del mundo verifican estados observables y movimiento, sin certificar toda la física o el render.

## Inventario por tanda

### Tanda 1 · 40 casos

Comando: `npm run test:tanda1`.

| Categoría | ID | Escenario |
| --- | --- | --- |
| [entrada](../cypress/e2e/entrada/bienvenida.cy.js) | ENT-01 | exige elegir un recorrido antes de continuar |
| [entrada](../cypress/e2e/entrada/bienvenida.cy.js) | ENT-02 | permite cambiar de recorrido manteniendo una sola elección |
| [entrada](../cypress/e2e/entrada/bienvenida.cy.js) | ENT-03 | abre el perfil profesional desde la bienvenida |
| [navegacion](../cypress/e2e/navegacion/perfil.cy.js) | PER-02 | navega a todas las secciones desde el menú |
| [navegacion](../cypress/e2e/navegacion/perfil.cy.js) | PER-05 | vuelve a la elección de recorrido |
| [contenido](../cypress/e2e/contenido/perfil.cy.js) | PER-01 | presenta identidad, especialidad y experiencia QA |
| [contenido](../cypress/e2e/contenido/perfil.cy.js) | PER-03 | ofrece destinos profesionales correctos y seguros |
| [documentos](../cypress/e2e/documentos/cv.cy.js) | PER-04 | entrega un CV PDF real desde el enlace de descarga |
| [responsive](../cypress/e2e/responsive/perfil.cy.js) | PER-06 | mantiene contenido y contacto utilizables en móvil |
| [responsive](../cypress/e2e/responsive/perfil.cy.js) | PER-07 | mantiene contenido y contacto utilizables en escritorio |
| [interacciones](../cypress/e2e/interacciones/reino.cy.js) | REI-01 | abre y cierra el contacto profesional |
| [interacciones](../cypress/e2e/interacciones/reino.cy.js) | REI-02 | muestra la ayuda y permite cerrarla |
| [interacciones](../cypress/e2e/interacciones/reino.cy.js) | REI-03 | recorre las cinco secciones del currículum |
| [interacciones](../cypress/e2e/interacciones/reino.cy.js) | REI-04 | abre un mapa con destinos disponibles |
| [interacciones](../cypress/e2e/interacciones/reino.cy.js) | REI-05 | cambia a controles móviles y conserva las preferencias al reabrir |
| [mundo3d](../cypress/e2e/mundo3d/acciones.cy.js) | MUN-01 | prepara una superficie de render con tamaño válido |
| [mundo3d](../cypress/e2e/mundo3d/acciones.cy.js) | MUN-02 | invoca la montura desde la plaza |
| [mundo3d](../cypress/e2e/mundo3d/acciones.cy.js) | MUN-03 | desmonta y recupera el estado del centinela |
| [mundo3d](../cypress/e2e/mundo3d/acciones.cy.js) | MUN-04 | activa la cámara de retrato |
| [mundo3d](../cypress/e2e/mundo3d/acciones.cy.js) | MUN-05 | vuelve del retrato a la vista de ciudad |
| [mundo3d](../cypress/e2e/mundo3d/acciones.cy.js) | MUN-06 | inicia un salto y vuelve a estar en el suelo |
| [mundo3d](../cypress/e2e/mundo3d/acciones.cy.js) | MUN-07 | la tecla V cambia la cámara cuando el mundo tiene foco |
| [mundo3d](../cypress/e2e/mundo3d/acciones.cy.js) | MUN-08 | la tecla M activa la montura |
| [mundo3d](../cypress/e2e/mundo3d/acciones.cy.js) | MUN-09 | Espacio dispara el salto desde el mundo |
| [mundo3d](../cypress/e2e/mundo3d/acciones.cy.js) | MUN-10 | W desplaza al personaje y guarda una posición diferente |
| [ajustes](../cypress/e2e/ajustes/preferencias.cy.js) | AJU-01 | vuelve de controles móviles a PC |
| [ajustes](../cypress/e2e/ajustes/preferencias.cy.js) | AJU-02 | activa el movimiento ambiental completo |
| [ajustes](../cypress/e2e/ajustes/preferencias.cy.js) | AJU-03 | reduce el movimiento ambiental tras activarlo |
| [ajustes](../cypress/e2e/ajustes/preferencias.cy.js) | AJU-04 | ajusta el volumen y actualiza su porcentaje |
| [ajustes](../cypress/e2e/ajustes/preferencias.cy.js) | AJU-05 | la música desactivada deja el audio en pausa |
| [ajustes](../cypress/e2e/ajustes/preferencias.cy.js) | AJU-06 | permite seleccionar calidad automática |
| [ajustes](../cypress/e2e/ajustes/preferencias.cy.js) | AJU-07 | conserva la preferencia de detalle al reabrir ajustes |
| [ajustes](../cypress/e2e/ajustes/preferencias.cy.js) | AJU-08 | el acceso rápido cambia de fluida a automática |
| [castillo](../cypress/e2e/castillo/recorridos.cy.js) | CAS-01 | entra al castillo y muestra sus cinco objetos |
| [castillo](../cypress/e2e/castillo/recorridos.cy.js) | CAS-02 | sale del castillo con Volver a la plaza |
| [castillo](../cypress/e2e/castillo/recorridos.cy.js) | CAS-03 | sale por el control de la puerta |
| [castillo](../cypress/e2e/castillo/recorridos.cy.js) | CAS-04 | impide montar dentro del castillo |
| [castillo](../cypress/e2e/castillo/recorridos.cy.js) | CAS-05 | desmonta al entrar con la montura invocada |
| [castillo](../cypress/e2e/castillo/recorridos.cy.js) | CAS-06 | registra la primera crónica sin duplicarla al reabrir |
| [castillo](../cypress/e2e/castillo/recorridos.cy.js) | CAS-07 | completa cinco crónicas al leer todas las secciones |

### Tanda 2 · 40 casos

Comando: `npm run test:tanda2`.

| Categoría | ID | Escenario |
| --- | --- | --- |
| [teclado](../cypress/e2e/teclado/foco.cy.js) | TEC-01 | Escape cierra la ayuda y devuelve el foco al mundo |
| [teclado](../cypress/e2e/teclado/foco.cy.js) | TEC-02 | Escape cierra el mapa y devuelve el foco al mundo |
| [teclado](../cypress/e2e/teclado/foco.cy.js) | TEC-03 | Escape cierra el currículum |
| [teclado](../cypress/e2e/teclado/foco.cy.js) | TEC-04 | Escape cierra el contacto |
| [teclado](../cypress/e2e/teclado/foco.cy.js) | TEC-05 | Tab avanza entre los controles del contacto |
| [teclado](../cypress/e2e/teclado/foco.cy.js) | TEC-06 | Enter activa el cierre de la ayuda |
| [teclado](../cypress/e2e/teclado/foco.cy.js) | TEC-07 | un atajo dentro de un diálogo no mueve la cámara |
| [teclado](../cypress/e2e/teclado/foco.cy.js) | TEC-08 | el atajo de montura no actúa con foco en la barra |
| [teclado](../cypress/e2e/teclado/foco.cy.js) | TEC-09 | mantener M no alterna la montura repetidamente |
| [teclado](../cypress/e2e/teclado/foco.cy.js) | TEC-10 | mantener V no alterna la cámara repetidamente |
| [teclado](../cypress/e2e/teclado/foco.cy.js) | TEC-11 | los selectores de ajustes tienen etiquetas utilizables |
| [teclado](../cypress/e2e/teclado/foco.cy.js) | TEC-12 | una pestaña del CV se puede activar con Enter |
| [mapa](../cypress/e2e/mapa/rutas.cy.js) | MAP-01 | el mapa enumera los seis lugares del distrito |
| [mapa](../cypress/e2e/mapa/rutas.cy.js) | MAP-02 | elegir el castillo desde la lista inicia su recorrido |
| [mapa](../cypress/e2e/mapa/rutas.cy.js) | MAP-03 | Enter activa un destino del mapa gráfico |
| [mapa](../cypress/e2e/mapa/rutas.cy.js) | MAP-04 | el mapa señala la posición actual del personaje |
| [mapa](../cypress/e2e/mapa/rutas.cy.js) | MAP-05 | elegir una ruta desde el castillo devuelve al exterior |
| [mapa](../cypress/e2e/mapa/rutas.cy.js) | MAP-06 | iniciar una ruta cancela la cámara de retrato |
| [adaptacion3d](../cypress/e2e/adaptacion3d/pantallas.cy.js) | MOV-01 | el canvas ocupa la ventana del móvil sin desbordarla |
| [adaptacion3d](../cypress/e2e/adaptacion3d/pantallas.cy.js) | MOV-02 | el canvas se adapta al girar la pantalla |
| [adaptacion3d](../cypress/e2e/adaptacion3d/pantallas.cy.js) | MOV-03 | volver a escritorio conserva el modo elegido |
| [adaptacion3d](../cypress/e2e/adaptacion3d/pantallas.cy.js) | MOV-04 | los botones de cámara y montura son utilizables en móvil |
| [adaptacion3d](../cypress/e2e/adaptacion3d/pantallas.cy.js) | MOV-05 | el mapa permite elegir destino en móvil |
| [adaptacion3d](../cypress/e2e/adaptacion3d/pantallas.cy.js) | MOV-06 | la ayuda se puede leer y cerrar en móvil |
| [adaptacion3d](../cypress/e2e/adaptacion3d/pantallas.cy.js) | MOV-07 | los ajustes siguen disponibles en una pantalla estrecha |
| [adaptacion3d](../cypress/e2e/adaptacion3d/pantallas.cy.js) | MOV-08 | la puerta permite regresar a la plaza en móvil |
| [contacto](../cypress/e2e/contacto/portapapeles.cy.js) | CON-01 | confirma la copia cuando el navegador la permite |
| [contacto](../cypress/e2e/contacto/portapapeles.cy.js) | CON-02 | ofrece una alternativa cuando se rechaza la copia |
| [contacto](../cypress/e2e/contacto/portapapeles.cy.js) | CON-03 | el contacto del reino apunta a los perfiles profesionales |
| [contacto](../cypress/e2e/contacto/portapapeles.cy.js) | CON-04 | se puede consultar el perfil ligero desde el reino |
| [camara](../cypress/e2e/camara/raton.cy.js) | CAM-01 | la rueda acerca la cámara sin mover al personaje |
| [camara](../cypress/e2e/camara/raton.cy.js) | CAM-02 | el zoom no atraviesa su límite cercano |
| [camara](../cypress/e2e/camara/raton.cy.js) | CAM-03 | el zoom respeta su límite lejano |
| [camara](../cypress/e2e/camara/raton.cy.js) | CAM-04 | arrastrar el mundo cambia su orientación |
| [movimiento](../cypress/e2e/movimiento/parada.cy.js) | INP-01 | las flechas también desplazan al personaje |
| [movimiento](../cypress/e2e/movimiento/parada.cy.js) | INP-02 | soltar la tecla detiene el desplazamiento |
| [movimiento](../cypress/e2e/movimiento/parada.cy.js) | INP-03 | perder el foco de la ventana libera las teclas de movimiento |
| [movimiento](../cypress/e2e/movimiento/parada.cy.js) | INP-04 | cerrar un diálogo no reanuda una tecla que se mantenía pulsada |
| [movimiento](../cypress/e2e/movimiento/parada.cy.js) | INP-05 | arrastrar y soltar el joystick mueve y detiene al personaje |
| [movimiento](../cypress/e2e/movimiento/parada.cy.js) | INP-06 | perder el foco durante el joystick no deja movimiento atascado |

### Tanda 3 · 40 casos

Comando: `npm run test:tanda3`.

| Categoría | ID | Escenario |
| --- | --- | --- |
| [persistencia](../cypress/e2e/persistencia/visitas.cy.js) | VIS-01 | conserva la noche después de recargar |
| [persistencia](../cypress/e2e/persistencia/visitas.cy.js) | VIS-02 | conserva la vuelta al día después de recargar |
| [persistencia](../cypress/e2e/persistencia/visitas.cy.js) | VIS-03 | restaura la montura en el exterior |
| [persistencia](../cypress/e2e/persistencia/visitas.cy.js) | VIS-04 | continúa dentro del castillo |
| [persistencia](../cypress/e2e/persistencia/visitas.cy.js) | VIS-05 | conserva las crónicas descubiertas |
| [persistencia](../cypress/e2e/persistencia/visitas.cy.js) | VIS-06 | empezar de nuevo borra el progreso y la noche |
| [persistencia](../cypress/e2e/persistencia/visitas.cy.js) | VIS-07 | conserva la disposición móvil tras recargar |
| [persistencia](../cypress/e2e/persistencia/visitas.cy.js) | VIS-08 | conserva la preferencia de movimiento completo |
| [persistencia](../cypress/e2e/persistencia/visitas.cy.js) | VIS-09 | conserva la calidad automática |
| [persistencia](../cypress/e2e/persistencia/visitas.cy.js) | VIS-10 | conserva un volumen elegido por el visitante |
| [persistencia](../cypress/e2e/persistencia/visitas.cy.js) | VIS-11 | no vuelve a activar la música silenciada |
| [persistencia](../cypress/e2e/persistencia/visitas.cy.js) | VIS-12 | una visita guardada no impide elegir el perfil ligero |
| [recuperacion](../cypress/e2e/recuperacion/almacenamiento.cy.js) | DAT-01 | permite explorar si no se puede leer el almacenamiento |
| [recuperacion](../cypress/e2e/recuperacion/almacenamiento.cy.js) | DAT-02 | permite explorar cuando se agota la cuota de guardado |
| [recuperacion](../cypress/e2e/recuperacion/almacenamiento.cy.js) | DAT-03 | descarta crónicas desconocidas y duplicadas de una visita |
| [recuperacion](../cypress/e2e/recuperacion/almacenamiento.cy.js) | DAT-04 | limita las coordenadas y el zoom de una visita fuera de rango |
| [recuperacion](../cypress/e2e/recuperacion/almacenamiento.cy.js) | DAT-05 | ignora preferencias guardadas con una estructura incorrecta |
| [recuperacion](../cypress/e2e/recuperacion/fallos.cy.js) | REC-01 | ignora una visita con JSON corrupto |
| [recuperacion](../cypress/e2e/recuperacion/fallos.cy.js) | REC-02 | ignora una versión de visita no compatible |
| [recuperacion](../cypress/e2e/recuperacion/fallos.cy.js) | REC-03 | rechaza posiciones de visita que no son números |
| [recuperacion](../cypress/e2e/recuperacion/fallos.cy.js) | REC-04 | recupera valores por defecto si las preferencias están corruptas |
| [recuperacion](../cypress/e2e/recuperacion/fallos.cy.js) | REC-05 | limita el volumen e ignora opciones guardadas desconocidas |
| [recuperacion](../cypress/e2e/recuperacion/fallos.cy.js) | REC-06 | muestra una salida clara si no se descarga el mundo |
| [recuperacion](../cypress/e2e/recuperacion/fallos.cy.js) | REC-07 | permite entrar al perfil después de fallar el mundo |
| [recuperacion](../cypress/e2e/recuperacion/fallos.cy.js) | REC-08 | el recorrido profesional no descarga el módulo 3D |
| [recuperacion](../cypress/e2e/recuperacion/fallos.cy.js) | REC-09 | mantiene la plaza utilizable si falla el interior |
| [recuperacion](../cypress/e2e/recuperacion/fallos.cy.js) | REC-10 | conserva controles funcionales cuando WebGL no está disponible |
| [accesibilidad](../cypress/e2e/accesibilidad/entrada-movil.cy.js) | AXE-13 | bienvenida en una pantalla estrecha |
| [accesibilidad](../cypress/e2e/accesibilidad/otros-estados.cy.js) | AXE-09 | ayuda del viajero |
| [accesibilidad](../cypress/e2e/accesibilidad/otros-estados.cy.js) | AXE-10 | interior del castillo |
| [accesibilidad](../cypress/e2e/accesibilidad/otros-estados.cy.js) | AXE-11 | plaza en modo nocturno |
| [accesibilidad](../cypress/e2e/accesibilidad/otros-estados.cy.js) | AXE-12 | mapa en una pantalla móvil |
| [accesibilidad](../cypress/e2e/accesibilidad/paginas.cy.js) | AXE-01 | bienvenida en escritorio |
| [accesibilidad](../cypress/e2e/accesibilidad/paginas.cy.js) | AXE-02 | perfil profesional en escritorio |
| [accesibilidad](../cypress/e2e/accesibilidad/paginas.cy.js) | AXE-03 | perfil profesional en móvil |
| [accesibilidad](../cypress/e2e/accesibilidad/reino.cy.js) | AXE-04 | exploración de la plaza |
| [accesibilidad](../cypress/e2e/accesibilidad/reino.cy.js) | AXE-05 | diálogo de ajustes |
| [accesibilidad](../cypress/e2e/accesibilidad/reino.cy.js) | AXE-06 | diálogo del mapa |
| [accesibilidad](../cypress/e2e/accesibilidad/reino.cy.js) | AXE-07 | diálogo de contacto |
| [accesibilidad](../cypress/e2e/accesibilidad/reino.cy.js) | AXE-08 | currículum del reino |

## Criterio de salida

Los 120 casos deben ejecutarse sin omisiones ni fallos para declarar la regresión aprobada. Los 33 tests del motor viven en el repositorio del sitio y no se incluyen en este contador. Un fallo de axe o funcional impide aprobar la regresión aunque el resto pase. Documentar navegador, fecha, versión del sitio, resultados y defectos.

## Revisión manual complementaria

Colisiones en las geometrías publicadas, mallas y animaciones, rendimiento en visitas largas, joystick y pellizco en dispositivos reales, sonido audible y recorrido con lector de pantalla. La simulación de ratón sobre el joystick no equivale a probar un teléfono. Los tests unitarios del motor aportan evidencia sobre la física aislada, no una certificación de toda la escena.
