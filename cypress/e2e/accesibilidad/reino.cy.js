describe('Accesibilidad automática · estados del reino', () => {
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


  it('AXE-04 · exploración de la plaza', () => {
    cy.injectAxe();
    cy.checkA11y(null, null, (problemas) => {
      cy.writeFile('cypress/reports/axe/AXE-04.json', problemas);
    });
  });

  it('AXE-05 · diálogo de ajustes', () => {
    cy.get('#controls-action').click();
    cy.get('#controls-dialog').should('be.visible');
    cy.injectAxe();
    cy.checkA11y(null, null, (problemas) => {
      cy.writeFile('cypress/reports/axe/AXE-05.json', problemas);
    });
  });

  it('AXE-06 · diálogo del mapa', () => {
    cy.get('#map-action').click();
    cy.get('#map-dialog').should('be.visible');
    cy.injectAxe();
    cy.checkA11y(null, null, (problemas) => {
      cy.writeFile('cypress/reports/axe/AXE-06.json', problemas);
    });
  });

  it('AXE-07 · diálogo de contacto', () => {
    cy.get('#contact-action').click();
    cy.get('#contact-dialog').should('be.visible');
    cy.injectAxe();
    cy.checkA11y(null, null, (problemas) => {
      cy.writeFile('cypress/reports/axe/AXE-07.json', problemas);
    });
  });

  it('AXE-08 · currículum del reino', () => {
    cy.get('#cv-top').click();
    cy.get('#journal').should('be.visible');
    cy.injectAxe();
    cy.checkA11y(null, null, (problemas) => {
      cy.writeFile('cypress/reports/axe/AXE-08.json', problemas);
    });
  });
});
