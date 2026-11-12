# Entender y explicar el proyecto

El objetivo no es memorizar 120 tests. Es entender por qué existen, qué evidencia aportan y qué se hizo cuando fallaron.

## Seis casos para empezar

| Caso | Riesgo | Cómo se comprueba | Límite que conviene explicar |
| --- | --- | --- | --- |
| PER-04 | El enlace al CV descarga un archivo incorrecto | HTTP, tipo PDF y cabecera `%PDF-` | No comprueba la maquetación de todas las páginas |
| VIS-06 | Reiniciar conserva datos de una visita anterior | Descubrir una crónica, activar noche y empezar de nuevo | El guardado es local, no una cuenta sincronizada |
| REC-06 | El visitante queda bloqueado si no carga el mundo | Interceptar la descarga y comprobar recuperación | Se simula ese fallo concreto, no toda una caída de Internet |
| INP-03 | El personaje sigue andando al cambiar de ventana | Mantener una tecla, perder foco y observar dos guardados sin desplazamiento | Se comprueba la posición, no un vídeo del movimiento |
| CAM-04 | Arrastrar deja de girar la cámara | Arrastre nativo y cambio en la orientación guardada | No certifica que la cámara nunca atraviese geometría |
| AXE-06 | El mapa resulta confuso para tecnologías de asistencia | Auditoría del documento con el mapa abierto | Debe completarse con lector de pantalla y revisión humana |

## Cómo leer un test

1. Lee el título e identifica el riesgo.
2. Revisa el `beforeEach`: qué estado prepara y por qué.
3. Localiza la acción principal y las aserciones que demuestran su efecto.
4. Consulta el comando en la documentación enlazada en la guía.
5. Ejecuta ese archivo en Cypress y observa los pasos.
6. Explica con tus palabras qué cambio de la aplicación debería hacerlo fallar.

## Decisiones que merecen una explicación

- **Tres tandas de 40:** separan funcionalidad básica, interacción y resistencia/accesibilidad; se pueden ejecutar y revisar independientemente.
- **Sin pausas fijas:** se espera a un estado o una petición. En movimiento, el guardado periódico sirve de evidencia.
- **Sin reintentos que tapen fallos:** se investiga si el defecto está en el producto, la prueba o el entorno.
- **Eventos nativos cuando hacen falta:** Enter y Escape se contrastaron con ejemplos mínimos antes de cambiar de comando. El comportamiento esperado se mantuvo.
- **Datos inválidos preparados:** permiten reproducir corrupción o falta de permisos sin dañar datos de un visitante real.
- **Axe con reglas completas:** un fallo bloquea la tanda. No demuestra por sí solo conformidad de accesibilidad.
- **120 E2E y 33 tests del motor:** son capas diferentes y se cuentan por separado. Los E2E protegen recorridos; los del motor ejercitan cálculos y colisiones aislados.

## Un ejemplo de investigación

La primera ejecución de 100 casos terminó con 97 aprobados y tres auditorías fallidas. Los informes localizaron nombres accesibles incoherentes, un enlace de créditos poco distinguible y una estructura ARIA incorrecta en el mapa. Las correcciones se hicieron en el sitio y después se volvió a ejecutar la batería. El historial de incidencias conserva qué se observó y cómo se corrigió.

No conviene afirmar que el juego está libre de errores, que se ha probado en todos los móviles o que se ha medido su rendimiento si esas comprobaciones no se han realizado. Reconocer el alcance de una prueba es parte del trabajo de QA.
