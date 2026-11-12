describe('Accesibilidad automática · entrada móvil', () => {

  it('AXE-13 · bienvenida en una pantalla estrecha', () => {
    cy.viewport(320, 568);
    cy.visit('/');
    cy.get('#welcome').should('be.visible');
    cy.injectAxe();
    cy.checkA11y(null, null, (problemas) => {
      cy.writeFile('cypress/reports/axe/AXE-13.json', problemas);
    });
  });
});
