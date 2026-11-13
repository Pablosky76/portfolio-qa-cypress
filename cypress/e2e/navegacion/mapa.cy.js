describe('Mapa · orientación y recorridos', () => {
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


  it('MAP-01 · el mapa enumera los seis lugares del distrito', () => {
    cy.get('#map-action').click();
    cy.get('#map-list').findAllByRole('button').should('have.length', 6);
    cy.get('#map-list').should('contain', 'Castillo del Archivo').and('contain', 'Taberna del León Dorado').and('contain', 'Herrería de la Alianza').and('contain', 'Torre de los Magos').and('contain', 'Botica de la Luna').and('contain', 'Establos de la Luna');
  });

  it('MAP-02 · elegir el castillo desde la lista inicia su recorrido', () => {
    cy.get('#map-action').click();
    cy.get('#map-list').findByRole('button', { name: /Castillo del Archivo/ }).click();
    cy.get('#map-dialog').should('not.be.visible');
    cy.get('#status').should('contain', 'Siguiendo el camino hacia Castillo del Archivo');
  });

  it('MAP-03 · Enter activa un destino del mapa gráfico', () => {
    cy.get('#map-action').click();
    cy.findByRole('button', { name: /Ir a Establos de la Luna/ }).focus();
    cy.press(Cypress.Keyboard.Keys.ENTER);
    cy.get('#map-dialog').should('not.be.visible');
    cy.get('#status').should('contain', 'Siguiendo el camino hacia Establos de la Luna');
  });

  it('MAP-04 · el mapa señala la posición actual del personaje', () => {
    cy.get('#map-action').click();
    cy.get('#realm-map .map-player').should(($punto) => {
      expect(Number($punto.attr('cx'))).to.be.within(10, 480);
      expect(Number($punto.attr('cy'))).to.be.within(10, 340);
    });
  });

  it('MAP-05 · elegir una ruta desde el castillo devuelve al exterior', () => {
    cy.get('#marker').click();
    cy.get('body').should('have.class', 'inside');
    cy.get('#map-action').click();
    cy.get('#map-list').findByRole('button', { name: /Taberna del León Dorado/ }).click();
    cy.get('body').should('not.have.class', 'inside');
    cy.get('#map-dialog').should('not.be.visible');
    // Al salir aparece también un aviso de proximidad a la puerta.
    // Comprobamos el recorrido por el desplazamiento real guardado.
    cy.window().should((ventana) => {
      const visita = JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'));
      expect(visita.inside).to.eq(false);
      expect(Math.hypot(visita.x - 3, visita.z + 5.5)).to.be.greaterThan(0.3);
    });
  });

  it('MAP-06 · iniciar una ruta cancela la cámara de retrato', () => {
    cy.get('#camera-action').click();
    cy.get('body').should('have.class', 'portrait-mode');
    cy.get('#map-action').click();
    cy.get('#map-list').findByRole('button', { name: /Herrería/ }).click();
    cy.get('body').should('not.have.class', 'portrait-mode');
    cy.get('#camera-action').should('have.attr', 'aria-pressed', 'false');
  });
});
