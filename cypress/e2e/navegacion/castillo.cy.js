// Tanda 1 · Cypress: acciones y resultados observables.
// https://docs.cypress.io/api/commands/trigger
describe('Castillo · entrada, salida y descubrimientos', () => {
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


  it('CAS-01 · entra al castillo y muestra sus cinco objetos', () => {
    cy.get('#marker').click();
    cy.get('body').should('have.class', 'inside');
    cy.get('#leave').should('be.visible');
    cy.get('.room-marker').should('have.length', 5);
    cy.get('#marker').should('not.be.visible');
    cy.screenshot('castillo-escritorio');
  });

  it('CAS-02 · sale del castillo con Volver a la plaza', () => {
    cy.get('#marker').click();
    cy.get('body').should('have.class', 'inside');
    cy.get('#leave').click();
    cy.get('body').should('not.have.class', 'inside');
    cy.get('#leave').should('not.be.visible');
    cy.get('#marker').should('be.visible');
  });

  it('CAS-03 · sale por el control de la puerta', () => {
    cy.get('#marker').click();
    cy.get('#exit-portal').should('be.visible').click();
    cy.get('body').should('not.have.class', 'inside');
    cy.get('#exit-portal').should('not.be.visible');
    cy.window().should((ventana) => {
      const visita = JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'));
      expect(visita.inside).to.eq(false);
    });
  });

  it('CAS-04 · impide montar dentro del castillo', () => {
    cy.get('#marker').click();
    cy.get('body').should('have.class', 'inside');
    cy.get('#mount-action').click();
    cy.get('#mount-action').should('have.attr', 'aria-pressed', 'false');
    cy.get('#status').should('contain', 'Tu sable te espera en la plaza');
  });

  it('CAS-05 · desmonta al entrar con la montura invocada', () => {
    cy.get('#mount-action').click();
    cy.get('#mount-action').should('have.attr', 'aria-pressed', 'true');
    cy.get('#marker').click();
    cy.get('body').should('have.class', 'inside');
    cy.get('#mount-action').should('have.attr', 'aria-pressed', 'false');
    cy.get('#avatar-title').should('have.text', 'Centinela lunar');
  });

  it('CAS-06 · registra la primera crónica sin duplicarla al reabrir', () => {
    cy.get('#chronicle-count').should('contain', '0 / 5');
    cy.get('#cv-top').click();
    cy.get('#journal').should('be.visible');
    cy.get('#close-journal').click();
    cy.get('#chronicle-count').should('contain', '1 / 5');
    cy.get('#cv-top').click();
    cy.get('#close-journal').click();
    cy.get('#chronicle-count').should('contain', '1 / 5');
  });

  it('CAS-07 · completa cinco crónicas al leer todas las secciones', () => {
    cy.get('#cv-top').click();
    cy.get('[data-tab="experience"]').click();
    cy.get('[data-tab="projects"]').click();
    cy.get('[data-tab="skills"]').click();
    cy.get('[data-tab="education"]').click();
    cy.get('#close-journal').click();
    cy.get('#chronicle-count').should('contain', '5 / 5');
  });
});
