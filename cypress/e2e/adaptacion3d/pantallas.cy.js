describe('Pantallas · mundo en móvil y cambios de tamaño', () => {
  beforeEach(() => {
    cy.viewport(390, 844);
    cy.visit('/');
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-continue').click();
    cy.get('#controls-dialog', { timeout: 60000 }).should('be.visible');
    cy.get('[data-layout="mobile"]').click();
    cy.get('#music-enabled').uncheck();
    cy.get('#quality-choice').select('fluid');
    cy.get('#motion-choice').select('reduced');
    cy.get('#controls-confirm').click();
    cy.get('#controls-dialog').should('not.be.visible');
  });

  it('MOV-01 · el canvas ocupa la ventana del móvil sin desbordarla', () => {
    cy.get('#scene').should(($canvas) => {
      const rect = $canvas[0].getBoundingClientRect();
      expect(rect.width).to.eq(390);
      expect(rect.height).to.eq(844);
    });
    cy.document().its('documentElement.scrollWidth').should('eq', 390);
    cy.screenshot('plaza-movil');
  });

  it('MOV-02 · el canvas se adapta al girar la pantalla', () => {
    cy.viewport(844, 390);
    cy.get('#scene').should(($canvas) => {
      const rect = $canvas[0].getBoundingClientRect();
      expect(rect.width).to.eq(844);
      expect(rect.height).to.eq(390);
    });
    cy.get('#mount-action').click();
    cy.get('#mount-action').should('have.attr', 'aria-pressed', 'true');
  });

  it('MOV-03 · volver a escritorio conserva el modo elegido', () => {
    cy.viewport(1440, 900);
    cy.get('body').should('have.attr', 'data-controls', 'mobile');
    cy.get('#touch-pad').should('be.visible');
    cy.get('#scene').should(($canvas) => {
      expect($canvas[0].getBoundingClientRect().width).to.eq(1440);
    });
  });

  it('MOV-04 · los botones de cámara y montura son utilizables en móvil', () => {
    cy.get('#camera-action').click();
    cy.get('body').should('have.class', 'portrait-mode');
    cy.get('#mount-action').click();
    cy.get('#mount-action').should('have.attr', 'aria-pressed', 'true');
  });

  it('MOV-05 · el mapa permite elegir destino en móvil', () => {
    cy.findByRole('button', { name: 'Abrir mapa del reino' }).click();
    cy.get('#map-list').findByRole('button', { name: /Establos/ }).scrollIntoView().click();
    cy.get('#map-dialog').should('not.be.visible');
    cy.get('#status').should('contain', 'Establos');
  });

  it('MOV-06 · la ayuda se puede leer y cerrar en móvil', () => {
    cy.findByRole('button', { name: 'Cómo explorar' }).click();
    cy.findByRole('dialog', { name: 'Guía del viajero' }).should('contain', 'joystick');
    cy.findByRole('button', { name: 'Cerrar ayuda' }).click();
    cy.get('#help-dialog').should('not.be.visible');
  });

  it('MOV-07 · los ajustes siguen disponibles en una pantalla estrecha', () => {
    cy.viewport(320, 568);
    cy.get('#controls-action').click();
    cy.findByLabelText('Movimiento ambiental').select('full');
    cy.get('#controls-confirm').scrollIntoView().click();
    cy.get('body').should('have.attr', 'data-motion', 'full');
    cy.get('#controls-dialog').should('not.be.visible');
  });

  it('MOV-08 · la puerta permite regresar a la plaza en móvil', () => {
    cy.get('#marker').click();
    cy.get('body').should('have.class', 'inside');
    cy.findByRole('button', { name: 'Salir a la plaza · Puerta del castillo' }).click();
    cy.get('body').should('not.have.class', 'inside');
    cy.get('#touch-pad').should('be.visible');
  });
});
