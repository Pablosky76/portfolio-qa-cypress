describe('Recuperación · almacenamiento limitado y datos antiguos', () => {

  it('DAT-01 · permite explorar si no se puede leer el almacenamiento', () => {
    cy.visit('/', { onBeforeLoad(ventana) {
      cy.stub(ventana.Storage.prototype, 'getItem').throws(new Error('Almacenamiento bloqueado'));
    } });
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-continue').click();
    cy.get('#controls-dialog', { timeout: 60000 }).should('be.visible');
    cy.get('#music-enabled').uncheck();
    cy.get('#controls-confirm').click();
    cy.get('#map-action').click();
    cy.get('#map-dialog').should('be.visible');
  });

  it('DAT-02 · permite explorar cuando se agota la cuota de guardado', () => {
    cy.visit('/', { onBeforeLoad(ventana) {
      cy.stub(ventana.Storage.prototype, 'setItem').throws(new Error('Cuota agotada'));
    } });
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-continue').click();
    cy.get('#controls-dialog', { timeout: 60000 }).should('be.visible');
    cy.get('#music-enabled').uncheck();
    cy.get('#controls-confirm').click();
    cy.get('#marker').click();
    cy.get('body').should('have.class', 'inside');
    cy.get('#leave').click();
    cy.get('body').should('not.have.class', 'inside');
  });

  it('DAT-03 · descarta crónicas desconocidas y duplicadas de una visita', () => {
    cy.visit('/', { onBeforeLoad(ventana) {
      ventana.localStorage.setItem('pablo-realm-visit-v1', JSON.stringify({ version: 1, x: 2.4, z: 9, discovered: ['about', 'about', 'desconocida'] }));
    } });
    cy.get('label[for=entry-realm]').click();
    cy.get('#entry-selection').should('contain', '1 de 5 crónicas');
    cy.get('#entry-continue').click();
    cy.get('#controls-dialog', { timeout: 60000 }).should('be.visible');
    cy.get('#music-enabled').uncheck();
    cy.get('#controls-confirm').click();
    cy.get('#chronicle-count').should('contain', '1 / 5');
  });

  it('DAT-04 · limita las coordenadas y el zoom de una visita fuera de rango', () => {
    cy.visit('/', { onBeforeLoad(ventana) {
      ventana.localStorage.setItem('pablo-realm-visit-v1', JSON.stringify({ version: 1, x: 9999, z: -9999, radius: 9999 }));
    } });
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-continue').click();
    cy.get('#controls-dialog', { timeout: 60000 }).should('be.visible');
    cy.get('#music-enabled').uncheck();
    cy.get('#controls-confirm').click();
    cy.window().should((ventana) => {
      const visita = JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'));
      expect(visita.x).to.be.within(-23.3, 21.15);
      expect(visita.z).to.be.within(-21.8, 17.5);
      expect(visita.radius).to.eq(45);
    });
  });

  it('DAT-05 · ignora preferencias guardadas con una estructura incorrecta', () => {
    cy.visit('/', { onBeforeLoad(ventana) {
      ventana.localStorage.setItem('pablo-realm-preferences', '["mobile", "full"]');
    } });
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-continue').click();
    cy.get('#controls-dialog', { timeout: 60000 }).should('be.visible');
    cy.get('#motion-choice').should('have.value', 'system');
    cy.get('#quality-choice').should('have.value', 'auto');
    cy.get('#music-volume').should('have.value', '14');
  });
});
