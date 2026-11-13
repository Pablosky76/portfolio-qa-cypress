describe('Contenido · perfil y enlaces profesionales', () => {
  beforeEach(() => {
    cy.visit('/perfil.html');
  });

  it('PER-03 · ofrece destinos profesionales correctos y seguros', () => {
    cy.get('#contacto a[href="mailto:pablogmdev@proton.me"]').should('be.visible');
    cy.get('#contacto a[href="https://github.com/Pablosky76"]').should('have.attr', 'target', '_blank');
    cy.get('#contacto a[href="https://github.com/Pablosky76"]').should('have.attr', 'rel').and('include', 'noopener');

    cy.get('#contacto a[href="https://www.linkedin.com/in/pablogutierrezmata"]').should('have.attr', 'target', '_blank');
    cy.get('#contacto a[href="https://www.linkedin.com/in/pablogutierrezmata"]').should('have.attr', 'rel').and('include', 'noopener');
  });
});
