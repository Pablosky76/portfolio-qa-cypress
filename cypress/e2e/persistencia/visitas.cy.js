describe('Persistencia · continuar la visita y preferencias', () => {
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


  it('VIS-01 · conserva la noche después de recargar', () => {
    cy.get('#theme-action').click();
    cy.get('body').should('have.class', 'night');
    cy.reload();
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-selection').should('contain', 'Continúa tu visita');
    cy.get('#entry-continue').click();
    cy.get('#controls-dialog', { timeout: 60000 }).should('be.visible');
    cy.get('#controls-confirm').click();
    cy.get('#controls-dialog').should('not.be.visible');
    cy.get('body').should('have.class', 'night');
    cy.get('#theme-action').should('have.attr', 'aria-pressed', 'true');
  });

  it('VIS-02 · conserva la vuelta al día después de recargar', () => {
    cy.get('#theme-action').click();
    cy.get('#theme-action').click();
    cy.reload();
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-selection').should('contain', 'Continúa tu visita');
    cy.get('#entry-continue').click();
    cy.get('#controls-dialog', { timeout: 60000 }).should('be.visible');
    cy.get('#controls-confirm').click();
    cy.get('#controls-dialog').should('not.be.visible');
    cy.get('body').should('not.have.class', 'night');
    cy.get('#theme-action').should('have.attr', 'aria-pressed', 'false');
  });

  it('VIS-03 · restaura la montura en el exterior', () => {
    cy.get('#mount-action').click();
    cy.get('#mount-action').should('have.attr', 'aria-pressed', 'true');
    cy.reload();
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-selection').should('contain', 'Continúa tu visita');
    cy.get('#entry-continue').click();
    cy.get('#controls-dialog', { timeout: 60000 }).should('be.visible');
    cy.get('#controls-confirm').click();
    cy.get('#controls-dialog').should('not.be.visible');
    cy.get('#mount-action').should('have.attr', 'aria-pressed', 'true');
    cy.get('#avatar-title').should('contain', 'Sable');
  });

  it('VIS-04 · continúa dentro del castillo', () => {
    cy.get('#marker').click();
    cy.get('body').should('have.class', 'inside');
    cy.reload();
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-selection').should('contain', 'Continúa tu visita');
    cy.get('#entry-continue').click();
    cy.get('#controls-dialog', { timeout: 60000 }).should('be.visible');
    cy.get('#controls-confirm').click();
    cy.get('#controls-dialog').should('not.be.visible');
    cy.get('body').should('have.class', 'inside');
    cy.get('#leave').should('be.visible');
  });

  it('VIS-05 · conserva las crónicas descubiertas', () => {
    cy.get('#cv-top').click();
    cy.get('[data-tab=projects]').click();
    cy.get('#close-journal').click();
    cy.get('#chronicle-count').should('contain', '2 / 5');
    cy.reload();
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-selection').should('contain', 'Continúa tu visita');
    cy.get('#entry-continue').click();
    cy.get('#controls-dialog', { timeout: 60000 }).should('be.visible');
    cy.get('#controls-confirm').click();
    cy.get('#controls-dialog').should('not.be.visible');
    cy.get('#chronicle-count').should('contain', '2 / 5');
  });

  it('VIS-06 · empezar de nuevo borra el progreso y la noche', () => {
    cy.get('#theme-action').click();
    cy.get('#cv-top').click();
    cy.get('#close-journal').click();
    cy.reload();
    cy.get('label[for="entry-realm"]').click();
    cy.get('#restart-visit').should('be.visible').click();
    cy.get('#controls-dialog', { timeout: 60000 }).should('be.visible');
    cy.get('#controls-confirm').click();
    cy.get('#chronicle-count').should('contain', '0 / 5');
    cy.get('body').should('not.have.class', 'night').and('not.have.class', 'inside');
  });

  it('VIS-07 · conserva la disposición móvil tras recargar', () => {
    cy.get('#controls-action').click();
    cy.get('[data-layout=mobile]').click();
    cy.get('#controls-confirm').click();
    cy.reload();
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-continue').click();
    cy.get('#controls-dialog', { timeout: 60000 }).should('be.visible');
    cy.get('[data-layout=mobile]').should('have.attr', 'aria-pressed', 'true');
    cy.get('body').should('have.attr', 'data-controls', 'mobile');
  });

  it('VIS-08 · conserva la preferencia de movimiento completo', () => {
    cy.get('#controls-action').click();
    cy.get('#motion-choice').select('full');
    cy.get('#controls-confirm').click();
    cy.reload();
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-continue').click();
    cy.get('#controls-dialog', { timeout: 60000 }).should('be.visible');
    cy.get('#motion-choice').should('have.value', 'full');
    cy.get('body').should('have.attr', 'data-motion', 'full');
  });

  it('VIS-09 · conserva la calidad automática', () => {
    cy.get('#controls-action').click();
    cy.get('#quality-choice').select('auto');
    cy.get('#controls-confirm').click();
    cy.reload();
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-continue').click();
    cy.get('#controls-dialog', { timeout: 60000 }).should('be.visible');
    cy.get('#quality-choice').should('have.value', 'auto');
  });

  it('VIS-10 · conserva un volumen elegido por el visitante', () => {
    cy.get('#controls-action').click();
    cy.get('#music-volume').invoke('val', 8).trigger('input');
    cy.get('#controls-confirm').click();
    cy.reload();
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-continue').click();
    cy.get('#controls-dialog', { timeout: 60000 }).should('be.visible');
    cy.get('#music-volume').should('have.value', '8');
    cy.get('#volume-value').should('have.text', '8 %');
  });

  it('VIS-11 · no vuelve a activar la música silenciada', () => {
    cy.reload();
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-continue').click();
    cy.get('#controls-dialog', { timeout: 60000 }).should('be.visible');
    cy.get('#music-enabled').should('not.be.checked');
    cy.get('#realm-score').should(($audio) => {
      expect($audio[0].paused).to.eq(true);
    });
  });

  it('VIS-12 · una visita guardada no impide elegir el perfil ligero', () => {
    cy.get('#marker').click();
    cy.get('body').should('have.class', 'inside');
    cy.reload();
    cy.get('label[for="entry-realm"]').click();
    cy.get('#restart-visit').should('be.visible');
    cy.get('label[for="entry-profile"]').click();
    cy.get('#restart-visit').should('not.be.visible');
    cy.get('#entry-continue').click();
    cy.location('pathname').should('match', /\/perfil(?:\.html)?$/);
    cy.get('h1').should('contain', 'Pablo');
  });
});
