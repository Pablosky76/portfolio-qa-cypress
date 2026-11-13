// Tanda 1 · Cypress: acciones y resultados observables.
// https://docs.cypress.io/api/commands/trigger
describe('Ajustes · controles, movimiento y sonido', () => {
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


  it('AJU-01 · vuelve de controles móviles a PC', () => {
    cy.get('#controls-action').click();
    cy.get('[data-layout="mobile"]').click();
    cy.get('#controls-confirm').click();
    cy.get('body').should('have.attr', 'data-controls', 'mobile');
    cy.get('#controls-action').click();
    cy.get('[data-layout="pc"]').click();
    cy.get('#controls-confirm').click();
    cy.get('body').should('have.attr', 'data-controls', 'pc');
    cy.get('#touch-pad').should('not.be.visible');
  });

  it('AJU-02 · activa el movimiento ambiental completo', () => {
    cy.get('#controls-action').click();
    cy.get('#motion-choice').select('full');
    cy.get('body').should('have.attr', 'data-motion', 'full');
    cy.get('#controls-confirm').click();
    cy.get('#controls-action').click();
    cy.get('#motion-choice').should('have.value', 'full');
  });

  it('AJU-03 · reduce el movimiento ambiental tras activarlo', () => {
    cy.get('#controls-action').click();
    cy.get('#motion-choice').select('full');
    cy.get('body').should('have.attr', 'data-motion', 'full');
    cy.get('#motion-choice').select('reduced');
    cy.get('body').should('have.attr', 'data-motion', 'reduced');
  });

  it('AJU-04 · ajusta el volumen y actualiza su porcentaje', () => {
    cy.get('#controls-action').click();
    cy.get('#music-volume').invoke('val', '5').trigger('input');
    cy.get('#volume-value').should('have.text', '5 %');
    cy.get('#controls-confirm').click();
    cy.get('#controls-action').click();
    cy.get('#music-volume').should('have.value', '5');
  });

  it('AJU-05 · la música desactivada deja el audio en pausa', () => {
    cy.get('#sound').should('have.attr', 'aria-pressed', 'false');
    cy.get('#realm-score').should(($audio) => {
      expect($audio[0].paused).to.eq(true);
    });
    cy.get('#controls-action').click();
    cy.get('#music-enabled').should('not.be.checked');
  });

  it('AJU-06 · permite seleccionar calidad automática', () => {
    cy.get('#controls-action').click();
    cy.get('#quality-choice').select('auto');
    cy.get('#controls-confirm').click();
    cy.get('#quality-action').should('contain', 'Auto');
    cy.get('#controls-action').click();
    cy.get('#quality-choice').should('have.value', 'auto');
  });

  it('AJU-07 · conserva la preferencia de detalle al reabrir ajustes', () => {
    cy.get('#controls-action').click();
    cy.get('#quality-choice').select('detail');
    cy.get('#controls-confirm').click();
    cy.get('#controls-action').click();
    cy.get('#quality-choice').should('have.value', 'detail');
    cy.get('#quality-status').should('not.be.empty');
  });

  it('AJU-08 · el acceso rápido cambia de fluida a automática', () => {
    cy.get('#quality-action').should('contain', 'Fluida');
    cy.get('#quality-action').click();
    cy.get('#quality-action').should('contain', 'Auto');
    cy.get('#controls-action').click();
    cy.get('#quality-choice').should('have.value', 'auto');
  });
});
