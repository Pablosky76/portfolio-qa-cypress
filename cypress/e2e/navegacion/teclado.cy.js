describe('Teclado · foco, diálogos y atajos', () => {
  // Antes de cada test, entramos al reino con la música desactivada.
  beforeEach(() => {
    cy.visit('/');
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-continue').click();
    cy.get('#controls-dialog', { timeout: 60000 }).should('be.visible');
    cy.get('[data-layout="pc"]').click();
    cy.get('#music-enabled').uncheck();
    cy.get('#quality-choice').select('fluid');
    cy.get('#motion-choice').select('reduced');
    cy.get('#controls-confirm').click();
    cy.get('#controls-dialog').should('not.be.visible');
    cy.get('#realm-shell').should('be.visible');
  });


  it('TEC-01 · Escape cierra la ayuda y devuelve el foco al botón de origen', () => {
    cy.findByRole('button', { name: 'Cómo explorar' }).click();
    cy.findByRole('dialog', { name: 'Guía del viajero' }).should('be.visible');
    cy.realPress('Escape');
    cy.get('#help-dialog').should('not.be.visible');
    cy.get('#help').should('have.focus');
  });

  it('TEC-02 · Escape cierra el mapa y devuelve el foco al botón de origen', () => {
    cy.findByRole('button', { name: 'Abrir mapa del reino' }).click();
    cy.findByRole('dialog', { name: 'Mapa del reino' }).should('be.visible');
    cy.realPress('Escape');
    cy.get('#map-dialog').should('not.be.visible');
    cy.get('#map-action').should('have.focus');
  });

  it('TEC-03 · Escape cierra el currículum', () => {
    cy.get('#cv-top').click();
    cy.findByRole('dialog', { name: 'Pablo Gutiérrez Mata' }).should('be.visible');
    cy.realPress('Escape');
    cy.get('#journal').should('not.be.visible');
    cy.get('#cv-top').should('have.focus');
  });

  it('TEC-04 · Escape cierra el contacto', () => {
    cy.get('#contact-action').click();
    cy.findByRole('dialog', { name: 'Contacto profesional' }).should('be.visible');
    cy.realPress('Escape');
    cy.get('#contact-dialog').should('not.be.visible');
    cy.get('#contact-action').should('have.focus');
  });

  it('TEC-05 · Tab avanza entre los controles del contacto', () => {
    cy.get('#contact-action').click();
    cy.findByRole('button', { name: 'Cerrar contacto' }).should('have.focus');
    cy.press(Cypress.Keyboard.Keys.TAB);
    cy.focused().should('have.attr', 'href', 'mailto:pablogmdev@proton.me');
    cy.press(Cypress.Keyboard.Keys.TAB);
    cy.findByRole('button', { name: 'Copiar correo' }).should('have.focus');
  });

  it('TEC-06 · Enter activa el cierre de la ayuda', () => {
    cy.get('#help').click();
    cy.findByRole('button', { name: 'Cerrar ayuda' }).should('have.focus');
    cy.realPress('Enter');
    cy.get('#help-dialog').should('not.be.visible');
  });

  it('TEC-07 · un atajo dentro de un diálogo no mueve la cámara', () => {
    cy.get('#help').click();
    cy.findByRole('button', { name: 'Cerrar ayuda' }).trigger('keydown', { key: 'v', eventConstructor: 'KeyboardEvent' });
    cy.get('body').should('not.have.class', 'portrait-mode');
    cy.get('#help-dialog').should('be.visible');
  });

  it('TEC-08 · el atajo de montura no actúa con foco en la barra', () => {
    cy.get('#help').focus().trigger('keydown', { key: 'm', eventConstructor: 'KeyboardEvent' });
    cy.get('#mount-action').should('have.attr', 'aria-pressed', 'false');
  });

  it('TEC-09 · mantener M no alterna la montura repetidamente', () => {
    cy.get('#scene').focus().trigger('keydown', { key: 'm', eventConstructor: 'KeyboardEvent' });
    cy.get('#scene').trigger('keydown', { key: 'm', repeat: true, eventConstructor: 'KeyboardEvent' });
    cy.get('#scene').trigger('keyup', { key: 'm', eventConstructor: 'KeyboardEvent' });
    cy.get('#mount-action').should('have.attr', 'aria-pressed', 'true');
  });

  it('TEC-10 · mantener V no alterna la cámara repetidamente', () => {
    cy.get('#scene').focus().trigger('keydown', { key: 'v', eventConstructor: 'KeyboardEvent' });
    cy.get('#scene').trigger('keydown', { key: 'v', repeat: true, eventConstructor: 'KeyboardEvent' });
    cy.get('#scene').trigger('keyup', { key: 'v', eventConstructor: 'KeyboardEvent' });
    cy.get('body').should('have.class', 'portrait-mode');
  });

  it('TEC-11 · los selectores de ajustes tienen etiquetas utilizables', () => {
    cy.get('#controls-action').click();
    cy.findByLabelText('Movimiento ambiental').select('system');
    cy.findByLabelText('Calidad del mundo').select('auto');
    cy.get('#controls-confirm').click();
    cy.get('#controls-action').click();
    cy.findByLabelText('Movimiento ambiental').should('have.value', 'system');
    cy.findByLabelText('Calidad del mundo').should('have.value', 'auto');
  });

  it('TEC-12 · una pestaña del CV se puede activar con Enter', () => {
    cy.get('#cv-top').click();
    cy.findByRole('button', { name: 'Formación', exact: true }).focus();
    cy.realPress('Enter');
    cy.get('#journal-content').should('contain', 'MEDAC');
    cy.findByRole('button', { name: 'Formación', exact: true }).should('have.attr', 'aria-pressed', 'true');
  });

  it('TEC-14 · Escape devuelve el foco al botón de mochila', () => {
    cy.get('#inventory-action').click();
    cy.get('#inventory-dialog').should('be.visible');
    cy.realPress('Escape');
    cy.get('#inventory-dialog').should('not.be.visible');
    cy.get('#inventory-action').should('have.focus').and('have.attr', 'aria-expanded', 'false');
  });

  it('TEC-15 · Tab mantiene el foco dentro de la mochila', () => {
    cy.get('#inventory-action').click();
    cy.get('#inventory-grid button[aria-pressed="true"]').should('have.focus');
    cy.realPress(['Shift', 'Tab']);
    cy.get('#inventory-close').should('have.focus');
    cy.realPress(['Shift', 'Tab']);
    cy.focused().closest('#inventory-dialog').should('exist');
    cy.realPress('Tab');
    cy.get('#inventory-close').should('have.focus');
  });

  it('TEC-16 · I no abre la mochila mientras otro diálogo está activo', () => {
    cy.get('#help').click();
    cy.realPress('I');
    cy.get('#help-dialog').should('be.visible');
    cy.get('#inventory-dialog').should('not.be.visible');
  });

  it('TEC-17 · el botón de cerrar permite reabrir desde el control de origen', () => {
    cy.get('#inventory-action').click();
    cy.get('#inventory-close').click();
    cy.get('#inventory-action').should('have.focus');
    cy.realPress('Enter');
    cy.get('#inventory-dialog').should('be.visible');
    cy.get('#inventory-grid button[aria-pressed="true"]').should('have.focus');
  });
});
