describe('Accesibilidad automática · entrada móvil', () => {

  it('AXE-13 · bienvenida en una pantalla estrecha', () => {
    cy.viewport(320, 568);
    cy.visit('/');
    cy.get('#welcome').should('be.visible');
    cy.findByRole('link', { name: 'Descargar CV' }).should('be.visible');
    cy.get('#qa-entry-link').scrollIntoView().should('be.visible').and('have.attr', 'href', 'proyecto.html');
    cy.get('#welcome').should(($welcome) => {
      expect($welcome[0].scrollWidth).to.be.at.most($welcome[0].clientWidth);
    });
    cy.injectAxe();
    cy.checkA11y(null, null, (problemas) => {
      cy.writeFile('cypress/reports/axe/AXE-13.json', problemas);
    });
  });
});
