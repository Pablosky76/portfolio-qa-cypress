// Tanda 1 · Cypress: acciones y resultados observables.
// https://docs.cypress.io/api/commands/trigger
describe('Mundo 3D · personaje y cámara', () => {
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


  it('MUN-03 · desmonta y recupera el estado del centinela', () => {
    cy.get('#mount-action').click();
    cy.get('#mount-action').should('have.attr', 'aria-pressed', 'true');
    cy.get('#mount-action').click();
    cy.get('#mount-action').should('have.attr', 'aria-pressed', 'false').and('contain', 'Montar');
    cy.get('#avatar-title').should('have.text', 'Centinela lunar');
  });

  it('MUN-04 · activa la cámara de retrato', () => {
    cy.get('#camera-action').click();
    cy.get('body').should('have.class', 'portrait-mode');
    cy.get('#camera-action').should('have.attr', 'aria-pressed', 'true').and('contain', 'Ver ciudad');
  });

  it('MUN-05 · vuelve del retrato a la vista de ciudad', () => {
    cy.get('#camera-action').click();
    cy.get('body').should('have.class', 'portrait-mode');
    cy.get('#camera-action').click();
    cy.get('body').should('not.have.class', 'portrait-mode');
    cy.get('#camera-action').should('have.attr', 'aria-pressed', 'false');
  });

  it('MUN-06 · inicia un salto y vuelve a estar en el suelo', () => {
    cy.get('#jump-action').click();
    cy.get('#status').should('contain', 'Salto lunar');
    cy.get('#jump-action').should('have.attr', 'aria-busy', 'true');
    cy.get('#jump-action').should('have.attr', 'aria-busy', 'false');
  });

  it('MUN-07 · la tecla V cambia la cámara cuando el mundo tiene foco', () => {
    cy.get('#scene').focus().trigger('keydown', { key: 'v', eventConstructor: 'KeyboardEvent' });
    cy.get('#scene').trigger('keyup', { key: 'v', eventConstructor: 'KeyboardEvent' });
    cy.get('body').should('have.class', 'portrait-mode');
  });

  it('MUN-08 · la tecla M activa la montura', () => {
    cy.get('#scene').focus().trigger('keydown', { key: 'm', eventConstructor: 'KeyboardEvent' });
    cy.get('#scene').trigger('keyup', { key: 'm', eventConstructor: 'KeyboardEvent' });
    cy.get('#mount-action').should('have.attr', 'aria-pressed', 'true');
    cy.get('#avatar-title').should('contain', 'Sable');
  });

  it('MUN-09 · Espacio dispara el salto desde el mundo', () => {
    cy.get('#scene').focus().trigger('keydown', { key: ' ', eventConstructor: 'KeyboardEvent' });
    cy.get('#scene').trigger('keyup', { key: ' ', eventConstructor: 'KeyboardEvent' });
    cy.get('#status').should('contain', 'Salto lunar');
    cy.get('#jump-action').should('have.attr', 'aria-busy', 'true');
    cy.get('#jump-action').should('have.attr', 'aria-busy', 'false');
  });

  it('MUN-10 · W desplaza al personaje y guarda una posición diferente', () => {
    // La visita se guarda periódicamente. Se lee como evidencia, sin mover al personaje desde el test.
    cy.window().should((ventana) => {
      expect(ventana.localStorage.getItem('pablo-realm-visit-v1')).not.to.eq(null);
    });
    cy.window().then((ventana) => {
      const inicio = JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'));
      cy.get('#scene').focus().trigger('keydown', { key: 'w', eventConstructor: 'KeyboardEvent' });
      cy.window().should((actual) => {
        const visita = JSON.parse(actual.localStorage.getItem('pablo-realm-visit-v1'));
        expect(Math.hypot(visita.x - inicio.x, visita.z - inicio.z)).to.be.greaterThan(0.2);
      });
      cy.get('#scene').trigger('keyup', { key: 'w', eventConstructor: 'KeyboardEvent' });
    });
  });
});
