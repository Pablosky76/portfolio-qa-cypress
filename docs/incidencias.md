# Incidencias detectadas en el portfolio

La batería no modifica el sitio publicado. Estos hallazgos se corrigieron en la aplicación y se conservan como historial de QA. Los casos permanecen activos para detectar regresiones.

## A11Y-01 · Nombres accesibles distintos al texto visible de la plaza

- **Caso:** AXE-04.
- **Regla:** `label-content-name-mismatch` (impacto serious según axe).
- **Reproducción:** elegir reino, entrar y auditar el documento visible.
- **Observado:** axe señala la marca, el acceso al castillo, controles de sonido/salto/calidad y varias etiquetas de personajes y lugares. El nombre accesible no incluye su texto visible completo.
- **Esperado:** nombres coherentes con los textos mostrados, para permitir identificarlos también mediante voz y tecnologías de asistencia.
- **Propuesta:** revisar `aria-label`; conservar el texto visible en el nombre y marcar como decorativos los símbolos o atajos que no deban formar parte de él. No retirar nombres sin comprobar el resultado.

## A11Y-02 · Contenido de la plaza fuera de regiones semánticas

- **Caso:** AXE-04.
- **Regla:** `region` (impacto moderate).
- **Observado:** instrucciones, ubicación, etiqueta del personaje, barra de acciones y otros elementos no quedan dentro de regiones semánticas.
- **Esperado:** estructura de regiones que permita orientarse en la interfaz sin depender de su disposición visual.
- **Propuesta:** agrupar los controles y la información del mundo en regiones con nombres apropiados; validar también el recorrido con lector de pantalla.

## A11Y-03 · Enlace de créditos poco distinguible

- **Caso:** AXE-05.
- **Regla:** `link-in-text-block` (impacto serious).
- **Reproducción:** abrir los ajustes del reino y revisar el enlace de créditos.
- **Observado:** axe informa un contraste de 1,12:1 entre enlace y texto circundante, sin subrayado u otra distinción adicional.
- **Esperado:** reconocer el enlace sin depender únicamente de un cambio de color.
- **Propuesta:** añadir un subrayado persistente y comprobar los estados de foco.

## A11Y-04 · Semántica del mapa interactivo

- **Caso:** AXE-06.
- **Reglas:** `aria-prohibited-attr`, `nested-interactive`, `label-content-name-mismatch` (impacto serious).
- **Reproducción:** abrir el mapa y auditar el documento visible.
- **Observado:** el círculo de posición tiene `aria-label` sin un rol válido; el SVG con `role="img"` contiene destinos enfocables; los números visibles de los destinos no forman parte de sus nombres accesibles.
- **Esperado:** un mapa cuya semántica represente sus controles interactivos y una alternativa de navegación clara.
- **Propuesta:** decidir si el gráfico debe ser decorativo con la lista como navegación, o una región interactiva con nombres y roles válidos. Comprobar después teclado y lector de pantalla.

## Evidencia y límites

Los JSON completos de cada ejecución están en `cypress/reports/axe`, junto al reporte HTML y las capturas. Estos hallazgos no equivalen a una auditoría completa de accesibilidad. Las propuestas requieren comprobación sobre la aplicación antes de dar las incidencias por resueltas.


## Corrección y comprobación

- **A11Y-01:** texto visible conservado en nombres de controles, personajes y destinos; nombre del salto estable y estado en `aria-busy`.
- **A11Y-02:** instrucciones dentro del área principal; ubicación, personaje y acciones en regiones identificadas; acceso directo en una navegación propia. Cabecera y pie mantienen su posición semántica de primer nivel.
- **A11Y-03:** créditos con subrayado persistente.
- **A11Y-04:** mapa con `role="group"`, círculo de posición con `role="img"` y nombres de destinos que incluyen sus números visibles.

Las 13 auditorías de la versión 10 corregida pasan en local y contra el sitio público sin excluir reglas; la ejecución de GitHub Actions del 13 de noviembre también las confirma. Pendiente completar la revisión manual con lector de pantalla; no se declara conformidad WCAG completa.
