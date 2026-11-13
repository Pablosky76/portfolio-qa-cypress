describe('Cámara · rueda y arrastre nativos', () => {
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


  it('CAM-01 · la rueda acerca la cámara sin mover al personaje', () => {
    cy.window().should((ventana) => {
      expect(ventana.localStorage.getItem('pablo-realm-visit-v1')).not.to.eq(null);
    });
    cy.window().then((ventana) => {
      cy.wrap(JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'))).as('inicio');
    });
    cy.get('#scene').realMouseWheel({ deltaY: -200 });
    cy.get('@inicio').then((inicio) => {
      cy.window().should((ventana) => {
        const visita = JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'));
        expect(visita.radius).to.be.lessThan(inicio.radius);
        expect(visita.x).to.be.closeTo(inicio.x, 0.02);
        expect(visita.z).to.be.closeTo(inicio.z, 0.02);
      });
    });
  });

  it('CAM-02 · el zoom no atraviesa su límite cercano', () => {
    cy.get('#scene').realMouseWheel({ deltaY: -5000 });
    cy.window().should((ventana) => {
      const visita = JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'));
      expect(visita).not.to.eq(null);
      expect(visita.radius).to.eq(10);
    });
  });

  it('CAM-03 · el zoom respeta su límite lejano', () => {
    cy.get('#scene').realMouseWheel({ deltaY: 5000 });
    cy.window().should((ventana) => {
      const visita = JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'));
      expect(visita).not.to.eq(null);
      expect(visita.radius).to.eq(38);
    });
  });

  it('CAM-04 · arrastrar el mundo cambia su orientación', () => {
    cy.window().should((ventana) => {
      expect(ventana.localStorage.getItem('pablo-realm-visit-v1')).not.to.eq(null);
    });
    cy.window().then((ventana) => {
      cy.wrap(JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'))).as('inicio');
    });
    cy.get('#scene').realMouseDown({ position: 'center' });
    cy.get('#scene').realMouseMove(100, 30, { position: 'center', keepMouseDownButton: 'left' });
    cy.get('#scene').realMouseUp();
    cy.get('@inicio').then((inicio) => {
      cy.window().should((ventana) => {
        const visita = JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'));
        expect(Math.abs(visita.yaw - inicio.yaw)).to.be.greaterThan(0.1);
      });
    });
  });
});
