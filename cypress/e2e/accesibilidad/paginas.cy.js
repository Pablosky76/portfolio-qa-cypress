describe('Accesibilidad automática · entrada y perfil', () => {

  it('AXE-01 · bienvenida en escritorio', () => {
    cy.visit('/');
    cy.get('#welcome').should('be.visible');
    cy.injectAxe();
    cy.checkA11y(null, null, (problemas) => {
      cy.writeFile('cypress/reports/axe/AXE-01.json', problemas);
    });
  });

  it('AXE-02 · perfil profesional en escritorio', () => {
    cy.visit('/perfil');
    cy.get('h1').should('contain', 'Pablo');
    cy.injectAxe();
    cy.checkA11y(null, null, (problemas) => {
      cy.writeFile('cypress/reports/axe/AXE-02.json', problemas);
    });
  });

  it('AXE-03 · perfil profesional en móvil', () => {
    cy.viewport(390, 844);
    cy.visit('/perfil');
    cy.get('h1').should('contain', 'Pablo');
    cy.injectAxe();
    cy.checkA11y(null, null, (problemas) => {
      cy.writeFile('cypress/reports/axe/AXE-03.json', problemas);
    });
  });
});
