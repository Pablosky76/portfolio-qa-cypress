describe('Interacciones · paneles y preferencias del reino', () => {
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

  it('REI-02 · muestra la ayuda y permite cerrarla', () => {
    cy.get('#help').click();
    cy.get('#help-dialog').should('be.visible').and('contain', 'WASD').and('contain', 'flechas');
    cy.get('#close-help').click();
    cy.get('#help-dialog').should('not.be.visible');
  });

  it('REI-03 · recorre las cinco secciones del currículum', () => {
    cy.get('#cv-top').click();
    cy.get('#journal').should('be.visible');
    // Perfil
    cy.get('#journal [data-tab="about"]').click();
    cy.get('#journal [data-tab="about"]').should('have.class', 'selected');
    cy.get('#journal-content').should('contain', 'Pablo');
    cy.get('#journal-content').find('h2, h3').first().scrollIntoView();
    cy.get('#journal-content').find('h2, h3').first().should('be.visible');

    // Trayectoria
    cy.get('#journal [data-tab="experience"]').click();
    cy.get('#journal [data-tab="experience"]').should('have.class', 'selected');
    cy.get('#journal-content').should('contain', 'OPPLUS');
    cy.get('#journal-content').find('h2, h3').first().scrollIntoView();
    cy.get('#journal-content').find('h2, h3').first().should('be.visible');

    // Proyectos
    cy.get('#journal [data-tab="projects"]').click();
    cy.get('#journal [data-tab="projects"]').should('have.class', 'selected');
    cy.get('#journal-content').should('contain', 'Cypress');
    cy.get('#journal-content').find('h2, h3').first().scrollIntoView();
    cy.get('#journal-content').find('h2, h3').first().should('be.visible');

    // Habilidades
    cy.get('#journal [data-tab="skills"]').click();
    cy.get('#journal [data-tab="skills"]').should('have.class', 'selected');
    cy.get('#journal-content').should('contain', 'Java');
    cy.get('#journal-content').find('h2, h3').first().scrollIntoView();
    cy.get('#journal-content').find('h2, h3').first().should('be.visible');

    // Formación
    cy.get('#journal [data-tab="education"]').click();
    cy.get('#journal [data-tab="education"]').should('have.class', 'selected');
    cy.get('#journal-content').should('contain', 'MEDAC');
    cy.get('#journal-content').find('h2, h3').first().scrollIntoView();
    cy.get('#journal-content').find('h2, h3').first().should('be.visible');

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
    cy.get('[data-layout="mobile"]').click();
    cy.get('[data-layout="mobile"]').should('have.attr', 'aria-pressed', 'true');
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
