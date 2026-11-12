describe('Accesibilidad automática · castillo, noche y pantallas pequeñas', () => {
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


  it('AXE-09 · ayuda del viajero', () => {
    cy.get('#help').click();
    cy.get('#help-dialog').should('be.visible');
    cy.injectAxe();
    cy.checkA11y(null, null, (problemas) => {
      cy.writeFile('cypress/reports/axe/AXE-09.json', problemas);
    });
  });

  it('AXE-10 · interior del castillo', () => {
    cy.get('#marker').click();
    cy.get('body').should('have.class', 'inside');
    cy.injectAxe();
    cy.checkA11y(null, null, (problemas) => {
      cy.writeFile('cypress/reports/axe/AXE-10.json', problemas);
    });
  });

  it('AXE-11 · plaza en modo nocturno', () => {
    cy.get('#theme-action').click();
    cy.get('body').should('have.class', 'night');
    cy.injectAxe();
    cy.checkA11y(null, null, (problemas) => {
      cy.writeFile('cypress/reports/axe/AXE-11.json', problemas);
    });
  });

  it('AXE-12 · mapa en una pantalla móvil', () => {
    cy.viewport(390, 844);
    cy.get('#map-action').click();
    cy.get('#map-dialog').should('be.visible');
    cy.injectAxe();
    cy.checkA11y(null, null, (problemas) => {
      cy.writeFile('cypress/reports/axe/AXE-12.json', problemas);
    });
  });
});
