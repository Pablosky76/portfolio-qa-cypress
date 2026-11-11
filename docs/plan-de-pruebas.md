# Plan de pruebas

Aplicación: Archivo de la Alianza, versión publicada 9 al iniciar el proyecto.
Fecha de diseño: 11 de noviembre de 2026.

## Riesgos que cubrimos

Un reclutador puede quedarse bloqueado en la entrada, no encontrar información o descargar un CV incorrecto. Un visitante del reino puede perder acceso a los paneles o a los controles. Priorizamos esos recorridos antes de automatizar movimientos dentro del canvas.

| ID | Escenario | Resultado esperado | Prioridad |
| --- | --- | --- | --- |
| ENT-01 | Abrir la bienvenida sin elegir | Continuar desactivado y mundo oculto | Alta |
| ENT-02 | Cambiar de perfil a reino | Solo una opción seleccionada y Continuar habilitado | Alta |
| ENT-03 | Continuar por perfil profesional | Página de perfil visible, sin canvas | Alta |
| PER-01 | Consultar presentación profesional | Nombre, rol, experiencia y herramientas QA presentes | Alta |
| PER-02 | Usar los cuatro enlaces del menú | Fragmento correcto y sección con título | Alta |
| PER-03 | Consultar contacto | Correo, GitHub y LinkedIn correctos; enlaces externos protegidos con noopener | Alta |
| PER-04 | Solicitar el recurso del enlace de CV | HTTP 200, application/pdf y cabecera %PDF- | Alta |
| PER-05 | Volver a explorar el reino | Bienvenida con ambos recorridos | Media |
| PER-06 | Consultar perfil a 390×844 | Contenido y contacto visibles, sin desbordamiento horizontal | Alta |
| PER-07 | Consultar perfil a 1440×900 | Contenido y contacto visibles, sin desbordamiento horizontal | Alta |
| REI-01 | Abrir y cerrar contacto | Diálogo y correo visibles; cierre efectivo | Alta |
| REI-02 | Abrir y cerrar ayuda | Instrucciones de teclado presentes; cierre efectivo | Media |
| REI-03 | Recorrer las cinco pestañas del CV | Selección y contenido correspondientes; cierre efectivo | Alta |
| REI-04 | Abrir y cerrar mapa | Mapa con destinos habilitados; cierre efectivo | Media |
| REI-05 | Elegir controles móviles y reabrir ajustes | Joystick visible y preferencias conservadas al reabrir | Alta |

## Ejecución y criterio de salida

Ejecutar entrada/perfil para feedback rápido y después la suite completa. Una versión de esta batería se considera validada cuando los 15 casos terminan sin fallos, se genera el HTML y las incidencias observadas están documentadas. Diferenciar siempre resultado local de resultado en GitHub Actions.

Cada prueba arranca aislada. No se realizan compras, envíos de correo ni cambios remotos de datos. Las preferencias solo afectan al navegador de pruebas.

## Revisión manual complementaria

Pendiente de ejecutar como una campaña separada: movimiento y colisiones, entrada/salida del castillo, cámara, audio, contraste, navegación completa por teclado, lector de pantalla y pruebas táctiles en dispositivo real. No se declara conformidad de accesibilidad a partir de estas comprobaciones parciales.
