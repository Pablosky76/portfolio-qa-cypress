# Presentación para LinkedIn

He convertido mi portfolio en un proyecto práctico de QA Automation: una aplicación 3D que también sirve como banco de pruebas.

Soy Pablo Gutiérrez Mata y estoy buscando una oportunidad como QA Junior / QA Automation. Quería mostrar cómo trabajo con escenarios, fallos y evidencias, además del resultado visual.

El proyecto reúne 128 escenarios E2E con Cypress, organizados en cinco áreas:

• Entrada y contenido: acceso al perfil, contacto y descarga del CV.
• Navegación: menús, mapa, paneles y gestión del foco.
• Personaje y controles: movimiento, cámara, salto y preferencias.
• Persistencia y recuperación: guardado de visitas, datos corruptos y errores de carga simulados.
• Accesibilidad: navegación por teclado y auditorías automáticas con axe en diferentes estados de la interfaz.

La integración continua está en GitHub Actions: primero ejecuta ocho casos smoke y después la regresión en tres tandas. Conserva informes HTML, capturas cuando hay fallos y una huella de los recursos para detectar cambios del sitio durante la ejecución. Las pruebas apuntan al portfolio publicado en Vercel.

La última ejecución revisada ha aprobado los 128 escenarios, además de la selección smoke, sobre la versión publicada.

Un ejemplo real: las pruebas móviles detectaron que una cabecera interceptaba el acceso al mapa. Se corrigió la interfaz y se mantuvieron las comprobaciones que habían descubierto el defecto.

Los tests no garantizan la ausencia de errores: la revisión visual del 3D, los dispositivos físicos y la accesibilidad manual necesitan comprobaciones complementarias. Estoy aprendiendo a definir ese alcance y a explicar qué evidencia aporta cada prueba.

Puedes explorar el proyecto y revisar el código y los resultados:

Portfolio: https://portfolio-3d-9mtr.vercel.app
Proyecto de QA: https://portfolio-3d-9mtr.vercel.app/proyecto
Tests y documentación: https://github.com/Pablosky76/portfolio-qa-cypress
Pipeline: https://github.com/Pablosky76/portfolio-qa-cypress/actions/runs/43866615545

Me encantaría recibir feedback de profesionales de QA y conectar con equipos que estén incorporando perfiles junior.

#QA #Cypress #TestAutomation #GitHubActions #OpenToWork
