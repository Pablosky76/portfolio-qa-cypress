// Estructura básica: abrir la página, realizar una acción y comprobar el resultado.
// https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test
describe('Entrada al portfolio', () => {
  // beforeEach abre la página antes de cada caso.
  beforeEach(() => {
    cy.visit('/');
  });

  it('ENT-01 · exige elegir un recorrido antes de continuar', () => {
    cy.get('#welcome-title').should('be.visible').and('contain', 'Dos formas de descubrirla');
    cy.get('#entry-continue').should('be.disabled');
    cy.get('#entry-selection').should('contain', 'Elige una opción');
    cy.get('#realm-shell').should('not.be.visible');
  });

  it('ENT-02 · permite cambiar de recorrido manteniendo una sola elección', () => {
    cy.get('label[for="entry-profile"]').click();
    cy.get('#entry-profile').should('be.checked');
    cy.get('#entry-continue').should('be.enabled');
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-realm').should('be.checked');
    cy.get('#entry-profile').should('not.be.checked');
    cy.get('#entry-continue').should('be.enabled');
  });

  it('ENT-03 · abre el perfil profesional desde la bienvenida', () => {
    cy.get('label[for="entry-profile"]').click();
    cy.get('#entry-continue').click();
    // El alojamiento redirige perfil.html a su URL canónica sin extensión.
    cy.location('pathname').should('eq', '/perfil');
    cy.get('h1').should('be.visible').and('contain', 'Gutiérrez Mata');
    cy.get('canvas').should('not.exist');
  });
});
