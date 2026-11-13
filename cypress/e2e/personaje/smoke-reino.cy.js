describe('Smoke · Interacciones · paneles y preferencias del reino', () => {
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

  it('REI-01 · abre y cierra el contacto profesional', () => {
    cy.get('#contact-action').click();
    cy.get('#contact-dialog').should('be.visible')
      .find('a[href="mailto:pablogmdev@proton.me"]').should('be.visible');
    cy.get('#close-contact').click();
    cy.get('#contact-dialog').should('not.be.visible');
  });
});

// Tanda 1 · Cypress: acciones y resultados observables.
// https://docs.cypress.io/api/commands/trigger
describe('Smoke · Mundo 3D · personaje y cámara', () => {
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


  it('MUN-01 · prepara una superficie de render con tamaño válido', () => {
    cy.get('#scene').should('be.visible').then(($canvas) => {
      expect($canvas[0].width).to.be.greaterThan(0);
      expect($canvas[0].height).to.be.greaterThan(0);
    });
    cy.get('body').should('have.class', 'exploring');
    cy.get('#scene').should('have.focus');
    cy.screenshot('plaza-escritorio');
  });

  it('MUN-02 · invoca la montura desde la plaza', () => {
    cy.get('#mount-action').click();
    cy.get('#mount-action').should('have.attr', 'aria-pressed', 'true').and('contain', 'Desmontar');
    cy.get('#avatar-title').should('have.text', 'Sable de la noche');
  });
});

describe('Smoke · Teclado · foco, diálogos y atajos', () => {
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


  it('TEC-13 · I abre y cierra la mochila y devuelve el foco al mundo', () => {
    cy.get('#scene').focus();
    cy.realPress('I');
    cy.get('#inventory-dialog').should('be.visible');
    cy.get('#inventory-grid button[aria-pressed="true"]').should('have.focus');
    cy.realPress('I');
    cy.get('#inventory-dialog').should('not.be.visible');
    cy.get('#scene').should('have.focus');
  });
});
