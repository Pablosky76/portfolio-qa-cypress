describe('Navegación · menú y vuelta al inicio', () => {
  beforeEach(() => {
    cy.visit('/perfil.html');
  });

  it('PER-02 · navega a todas las secciones desde el menú', () => {
    cy.get('nav[aria-label="Secciones del perfil"] a[href="#experience"]').click();
    cy.location('hash').should('eq', '#experience');
    cy.get('#experience').should('be.visible');
    cy.get('#experience h2').should('not.be.empty');

    cy.get('nav[aria-label="Secciones del perfil"] a[href="#skills"]').click();
    cy.location('hash').should('eq', '#skills');
    cy.get('#skills').should('be.visible');
    cy.get('#skills h2').should('not.be.empty');

    cy.get('nav[aria-label="Secciones del perfil"] a[href="#education"]').click();
    cy.location('hash').should('eq', '#education');
    cy.get('#education').should('be.visible');
    cy.get('#education h2').should('not.be.empty');

    cy.get('nav[aria-label="Secciones del perfil"] a[href="#contacto"]').click();
    cy.location('hash').should('eq', '#contacto');
    cy.get('#contacto').should('be.visible');
    cy.get('#contacto h2').should('not.be.empty');
  });

  it('PER-05 · vuelve a la elección de recorrido', () => {
    cy.get('.world-link').click();
    cy.location('pathname').should('eq', '/');
    cy.get('#welcome').should('be.visible');
    cy.get('#entry-profile').should('exist');
    cy.get('#entry-realm').should('exist');
  });
});
