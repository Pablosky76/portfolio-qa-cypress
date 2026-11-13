// https://docs.cypress.io/api/commands/viewport
describe('Diseño adaptable · móvil y escritorio', () => {
  beforeEach(() => {
    cy.visit('/perfil.html');
  });

  it('PER-06 · mantiene contenido y contacto utilizables en móvil', () => {
    cy.viewport(390, 844);
    cy.get('h1').should('be.visible');
    cy.get('.profile-ctas a[download]').should('be.visible');

    // El contenido no debe ser más ancho que la pantalla (se permite 1 px de redondeo).
    cy.document().then((documento) => {
      const anchoContenido = documento.documentElement.scrollWidth;
      const anchoPantalla = documento.documentElement.clientWidth;
      expect(anchoContenido).to.be.at.most(anchoPantalla + 1);
    });

    cy.get('#contacto').scrollIntoView();
    cy.get('#contacto a[href^="mailto:"]').should('be.visible');
    cy.get('#contacto a[download]').should('be.visible');
    cy.screenshot('perfil-móvil', { capture: 'viewport' });
  });

  it('PER-07 · mantiene contenido y contacto utilizables en escritorio', () => {
    cy.viewport(1440, 900);
    cy.get('h1').should('be.visible');
    cy.get('.profile-ctas a[download]').should('be.visible');

    // El contenido no debe ser más ancho que la pantalla (se permite 1 px de redondeo).
    cy.document().then((documento) => {
      const anchoContenido = documento.documentElement.scrollWidth;
      const anchoPantalla = documento.documentElement.clientWidth;
      expect(anchoContenido).to.be.at.most(anchoPantalla + 1);
    });

    cy.get('#contacto').scrollIntoView();
    cy.get('#contacto a[href^="mailto:"]').should('be.visible');
    cy.get('#contacto a[download]').should('be.visible');
    cy.screenshot('perfil-escritorio', { capture: 'viewport' });
  });
});
