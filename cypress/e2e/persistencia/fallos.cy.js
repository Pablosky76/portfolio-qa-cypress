describe('Recuperación · datos inválidos y recursos no disponibles', () => {
  beforeEach(() => {
    // Un recurso ya cacheado no pasa por intercept: forzamos peticiones reales.
    cy.then(() => Cypress.automation('remote:debugger:protocol', {
      command: 'Network.setCacheDisabled', params: { cacheDisabled: true }
    }));
  });
  afterEach(() => {
    cy.then(() => Cypress.automation('remote:debugger:protocol', {
      command: 'Network.setCacheDisabled', params: { cacheDisabled: false }
    }));
  });

  it('REC-01 · ignora una visita con JSON corrupto', () => {
    cy.visit('/', { onBeforeLoad(ventana) {
      ventana.localStorage.setItem('pablo-realm-visit-v1', '{roto');
    } });
    cy.get('label[for="entry-realm"]').click();
    cy.get('#restart-visit').should('not.be.visible');
    cy.get('#entry-selection').should('contain', 'Explora la ciudad');
    cy.get('#entry-continue').should('be.enabled');
  });

  it('REC-02 · ignora una versión de visita no compatible', () => {
    cy.visit('/', { onBeforeLoad(ventana) {
      ventana.localStorage.setItem('pablo-realm-visit-v1', JSON.stringify({ version: 99, x: 2, z: 9 }));
    } });
    cy.get('label[for="entry-realm"]').click();
    cy.get('#restart-visit').should('not.be.visible');
    cy.get('#entry-selection').should('contain', 'Explora la ciudad');
    cy.get('#entry-continue').should('be.enabled');
  });

  it('REC-03 · rechaza posiciones de visita que no son números', () => {
    cy.visit('/', { onBeforeLoad(ventana) {
      ventana.localStorage.setItem('pablo-realm-visit-v1', JSON.stringify({ version: 1, x: 'error', z: 9 }));
    } });
    cy.get('label[for="entry-realm"]').click();
    cy.get('#restart-visit').should('not.be.visible');
    cy.get('#entry-selection').should('contain', 'Explora la ciudad');
    cy.get('#entry-continue').should('be.enabled');
  });

  it('REC-04 · recupera valores por defecto si las preferencias están corruptas', () => {
    cy.visit('/', { onBeforeLoad(ventana) {
      ventana.localStorage.setItem('pablo-realm-preferences', '{roto');
    } });
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-continue').click();
    cy.get('#controls-dialog', { timeout: 60000 }).should('be.visible');
    cy.get('#motion-choice').should('have.value', 'system');
    cy.get('#quality-choice').should('have.value', 'auto');
    cy.get('#music-volume').should('have.value', '14');
  });

  it('REC-05 · limita el volumen e ignora opciones guardadas desconocidas', () => {
    cy.visit('/', { onBeforeLoad(ventana) {
      ventana.localStorage.setItem('pablo-realm-preferences', JSON.stringify({ volume: 5, motion: 'error', quality: 'error', music: false }));
    } });
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-continue').click();
    cy.get('#controls-dialog', { timeout: 60000 }).should('be.visible');
    cy.get('#music-volume').should('have.value', '25');
    cy.get('#motion-choice').should('have.value', 'system');
    cy.get('#quality-choice').should('have.value', 'auto');
  });

  it('REC-06 · muestra una salida clara si no se descarga el mundo', () => {
    cy.intercept('GET', '**/app.js', { forceNetworkError: true }).as('mundo');
    cy.visit('/');
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-continue').click();
    cy.wait('@mundo');
    cy.get('#welcome').should('be.visible');
    cy.get('#welcome-state').should('contain', 'No se ha podido abrir el mundo');
    cy.get('#realm-shell').should('not.be.visible');
    cy.get('#entry-continue').should('be.enabled');
    cy.get('#welcome').should('not.have.attr', 'aria-busy');
  });

  it('REC-07 · permite entrar al perfil después de fallar el mundo', () => {
    cy.intercept('GET', '**/app.js', { forceNetworkError: true }).as('mundo');
    cy.visit('/');
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-continue').click();
    cy.wait('@mundo');
    cy.get('#welcome').should('be.visible');
    cy.get('#welcome-state').should('contain', 'No se ha podido abrir el mundo');
    cy.get('label[for=entry-profile]').click();
    cy.get('#entry-continue').click();
    cy.location('pathname').should('match', /\/perfil(?:\.html)?$/);
    cy.get('h1').should('contain', 'Pablo');
  });

  it('REC-08 · el recorrido profesional no descarga el módulo 3D', () => {
    cy.intercept('GET', '**/app.js').as('mundo');
    cy.visit('/');
    cy.get('label[for=entry-profile]').click();
    cy.get('#entry-continue').click();
    cy.get('h1').should('contain', 'Pablo');
    cy.get('@mundo.all').should('have.length', 0);
    cy.get('#scene').should('not.exist');
  });

  it('REC-09 · mantiene la plaza utilizable si falla el interior', () => {
    cy.intercept('GET', '**/archive-decor.js', { forceNetworkError: true }).as('interior');
    cy.visit('/');
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-continue').click();
    cy.get('#controls-dialog', { timeout: 60000 }).should('be.visible');
    cy.get('#music-enabled').uncheck();
    cy.get('#controls-confirm').click();
    cy.get('#marker').click();
    cy.wait('@interior');
    cy.get('body').should('not.have.class', 'inside');
    cy.get('#marker').should('be.visible');
    cy.get('#help').click();
    cy.get('#help-dialog').should('be.visible');
  });

  it('REC-10 · conserva controles funcionales cuando WebGL no está disponible', () => {
    // Solo se simula la ausencia de WebGL; el render alternativo lo ejecuta la aplicación.
    cy.visit('/', { onBeforeLoad(ventana) {
      const getContext = ventana.HTMLCanvasElement.prototype.getContext;
      cy.stub(ventana.HTMLCanvasElement.prototype, 'getContext').callsFake(function(tipo, opciones) {
        if (tipo === 'webgl' || tipo === 'webgl2' || tipo === 'experimental-webgl') return null;
        return getContext.call(this, tipo, opciones);
      });
    } });
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-continue').click();
    cy.get('#controls-dialog', { timeout: 60000 }).should('be.visible');
    cy.get('#music-enabled').uncheck();
    cy.get('#controls-confirm').click();
    cy.get('#scene').should('be.visible');
    cy.get('#mount-action').click();
    cy.get('#mount-action').should('have.attr', 'aria-pressed', 'true');
    cy.get('#map-action').click();
    cy.get('#map-dialog').should('be.visible');
  });
});
