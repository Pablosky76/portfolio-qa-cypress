describe('Paneles de la experiencia interactiva', () => {
  beforeEach(() => cy.enterRealm());

  it('REI-01 · abre y cierra el contacto profesional', () => {
    cy.get('#contact-action').click();
    cy.get('#contact-dialog').should('be.visible')
      .find('a[href="mailto:pablogmdev@proton.me"]').should('be.visible');
    cy.get('#close-contact').click();
    cy.get('#contact-dialog').should('not.be.visible');
  });

  it('REI-02 · muestra la ayuda y permite cerrarla', () => {
    cy.get('#help').click();
    cy.get('#help-dialog').should('be.visible').and('contain', 'WASD').and('contain', 'flechas');
    cy.get('#close-help').click();
    cy.get('#help-dialog').should('not.be.visible');
  });

  it('REI-03 · recorre las cinco secciones del currículum', () => {
    cy.get('#cv-top').click();
    cy.get('#journal').should('be.visible');
    const sections = { about: 'Pablo', experience: 'OPPLUS', projects: 'Cypress', skills: 'Java', education: 'MEDAC' };
    Object.entries(sections).forEach(([tab, content]) => {
      cy.get(`#journal [data-tab="${tab}"]`).click().should('have.class', 'selected');
      cy.get('#journal-content').should('contain', content);
      // El artículo puede ser mayor que el diálogo: comprobar su encabezado visible.
      cy.get('#journal-content').find('h2, h3').first().scrollIntoView().should('be.visible');
    });
    cy.get('#close-journal').click();
    cy.get('#journal').should('not.be.visible');
  });

  it('REI-04 · abre un mapa con destinos disponibles', () => {
    cy.get('#map-action').click();
    cy.get('#map-dialog').should('be.visible');
    cy.get('#realm-map').should('be.visible').and('have.attr', 'role', 'img');
    cy.get('#map-list button').should('have.length.at.least', 1).first().should('be.enabled');
    cy.get('#close-map').click();
    cy.get('#map-dialog').should('not.be.visible');
  });

  it('REI-05 · cambia a controles móviles y conserva las preferencias al reabrir', () => {
    cy.get('#controls-action').click();
    cy.get('#controls-dialog').should('be.visible');
    cy.get('[data-layout="mobile"]').click().should('have.attr', 'aria-pressed', 'true');
    cy.get('#motion-choice').select('reduced');
    cy.get('#music-enabled').should('not.be.checked');
    cy.get('#controls-confirm').click();
    cy.get('#touch-pad').should('be.visible');
    cy.get('#controls-action').click();
    cy.get('[data-layout="mobile"]').should('have.attr', 'aria-pressed', 'true');
    cy.get('#motion-choice').should('have.value', 'reduced');
    cy.get('#music-enabled').should('not.be.checked');
  });
});
