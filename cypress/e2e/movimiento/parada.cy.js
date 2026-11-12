describe('Movimiento · entradas y parada segura', () => {
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


  it('INP-01 · las flechas también desplazan al personaje', () => {
    cy.window().should((ventana) => {
      expect(ventana.localStorage.getItem('pablo-realm-visit-v1')).not.to.eq(null);
    });
    cy.window().then((ventana) => {
      cy.wrap(JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'))).as('inicio');
    });
    cy.get('#scene').focus().trigger('keydown', { key: 'ArrowUp', eventConstructor: 'KeyboardEvent' });
    cy.get('@inicio').then((inicio) => {
      cy.window().should((ventana) => {
        const visita = JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'));
        expect(Math.hypot(visita.x - inicio.x, visita.z - inicio.z)).to.be.greaterThan(0.2);
      });
    });
    cy.get('#scene').trigger('keyup', { key: 'ArrowUp', eventConstructor: 'KeyboardEvent' });
  });

  it('INP-02 · soltar la tecla detiene el desplazamiento', () => {
    cy.window().should((ventana) => {
      expect(ventana.localStorage.getItem('pablo-realm-visit-v1')).not.to.eq(null);
    });
    cy.window().then((ventana) => {
      cy.wrap(JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'))).as('inicio');
    });
    cy.get('#scene').focus().trigger('keydown', { key: 'w', eventConstructor: 'KeyboardEvent' });
    cy.get('@inicio').then((inicio) => {
      cy.window().should((ventana) => {
        const visita = JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'));
        expect(Math.hypot(visita.x - inicio.x, visita.z - inicio.z)).to.be.greaterThan(0.2);
      });
    });
    cy.get('#scene').trigger('keyup', { key: 'w', eventConstructor: 'KeyboardEvent' });
    // Dejamos que termine la inercia y comparamos dos guardados posteriores.
    cy.then(() => Date.now()).then((parada) => {
      cy.window().should((ventana) => {
        const visita = JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'));
        expect(visita.savedAt).to.be.greaterThan(parada + 1000);
      });
    });
    cy.window().then((ventana) => {
      const parado = JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'));
      cy.window().should((actual) => {
        const visita = JSON.parse(actual.localStorage.getItem('pablo-realm-visit-v1'));
        expect(visita.savedAt).to.be.greaterThan(parado.savedAt);
        expect(Math.hypot(visita.x - parado.x, visita.z - parado.z)).to.be.lessThan(0.02);
      });
    });
  });

  it('INP-03 · perder el foco de la ventana libera las teclas de movimiento', () => {
    cy.window().should((ventana) => {
      expect(ventana.localStorage.getItem('pablo-realm-visit-v1')).not.to.eq(null);
    });
    cy.window().then((ventana) => {
      cy.wrap(JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'))).as('inicio');
    });
    cy.get('#scene').focus().trigger('keydown', { key: 'w', eventConstructor: 'KeyboardEvent' });
    cy.get('@inicio').then((inicio) => {
      cy.window().should((ventana) => {
        const visita = JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'));
        expect(Math.hypot(visita.x - inicio.x, visita.z - inicio.z)).to.be.greaterThan(0.2);
      });
    });
    cy.window().trigger('blur');
    // Dejamos que termine la inercia y comparamos dos guardados posteriores.
    cy.then(() => Date.now()).then((parada) => {
      cy.window().should((ventana) => {
        const visita = JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'));
        expect(visita.savedAt).to.be.greaterThan(parada + 1000);
      });
    });
    cy.window().then((ventana) => {
      const parado = JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'));
      cy.window().should((actual) => {
        const visita = JSON.parse(actual.localStorage.getItem('pablo-realm-visit-v1'));
        expect(visita.savedAt).to.be.greaterThan(parado.savedAt);
        expect(Math.hypot(visita.x - parado.x, visita.z - parado.z)).to.be.lessThan(0.02);
      });
    });
  });

  it('INP-04 · cerrar un diálogo no reanuda una tecla que se mantenía pulsada', () => {
    cy.window().should((ventana) => {
      expect(ventana.localStorage.getItem('pablo-realm-visit-v1')).not.to.eq(null);
    });
    cy.window().then((ventana) => {
      cy.wrap(JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'))).as('inicio');
    });
    cy.get('#scene').focus().trigger('keydown', { key: 'w', eventConstructor: 'KeyboardEvent' });
    cy.get('@inicio').then((inicio) => {
      cy.window().should((ventana) => {
        const visita = JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'));
        expect(Math.hypot(visita.x - inicio.x, visita.z - inicio.z)).to.be.greaterThan(0.2);
      });
    });
    cy.get('#help').click();
    cy.get('#help-dialog').should('be.visible');
    cy.get('#close-help').click();
    cy.get('#help-dialog').should('not.be.visible');
    // Dejamos que termine la inercia y comparamos dos guardados posteriores.
    cy.then(() => Date.now()).then((parada) => {
      cy.window().should((ventana) => {
        const visita = JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'));
        expect(visita.savedAt).to.be.greaterThan(parada + 1000);
      });
    });
    cy.window().then((ventana) => {
      const parado = JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'));
      cy.window().should((actual) => {
        const visita = JSON.parse(actual.localStorage.getItem('pablo-realm-visit-v1'));
        expect(visita.savedAt).to.be.greaterThan(parado.savedAt);
        expect(Math.hypot(visita.x - parado.x, visita.z - parado.z)).to.be.lessThan(0.02);
      });
    });
    cy.get('#scene').trigger('keyup', { key: 'w', eventConstructor: 'KeyboardEvent' });
  });

  it('INP-05 · arrastrar y soltar el joystick mueve y detiene al personaje', () => {
    cy.window().should((ventana) => {
      expect(ventana.localStorage.getItem('pablo-realm-visit-v1')).not.to.eq(null);
    });
    cy.window().then((ventana) => {
      cy.wrap(JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'))).as('inicio');
    });
    cy.get('#controls-action').click();
    cy.get('[data-layout=mobile]').click();
    cy.get('#controls-confirm').click();
    cy.get('#joystick-pad').realMouseDown({ position: 'center' });
    cy.get('#joystick-pad').realMouseMove(0, -35, { position: 'center', keepMouseDownButton: 'left' });
    cy.get('@inicio').then((inicio) => {
      cy.window().should((ventana) => {
        const visita = JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'));
        expect(Math.hypot(visita.x - inicio.x, visita.z - inicio.z)).to.be.greaterThan(0.2);
      });
    });
    cy.get('#joystick-pad').realMouseUp();
    // Dejamos que termine la inercia y comparamos dos guardados posteriores.
    cy.then(() => Date.now()).then((parada) => {
      cy.window().should((ventana) => {
        const visita = JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'));
        expect(visita.savedAt).to.be.greaterThan(parada + 1000);
      });
    });
    cy.window().then((ventana) => {
      const parado = JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'));
      cy.window().should((actual) => {
        const visita = JSON.parse(actual.localStorage.getItem('pablo-realm-visit-v1'));
        expect(visita.savedAt).to.be.greaterThan(parado.savedAt);
        expect(Math.hypot(visita.x - parado.x, visita.z - parado.z)).to.be.lessThan(0.02);
      });
    });
  });

  it('INP-06 · perder el foco durante el joystick no deja movimiento atascado', () => {
    cy.window().should((ventana) => {
      expect(ventana.localStorage.getItem('pablo-realm-visit-v1')).not.to.eq(null);
    });
    cy.window().then((ventana) => {
      cy.wrap(JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'))).as('inicio');
    });
    cy.get('#controls-action').click();
    cy.get('[data-layout=mobile]').click();
    cy.get('#controls-confirm').click();
    cy.get('#joystick-pad').realMouseDown({ position: 'center' });
    cy.get('#joystick-pad').realMouseMove(0, -35, { position: 'center', keepMouseDownButton: 'left' });
    cy.get('@inicio').then((inicio) => {
      cy.window().should((ventana) => {
        const visita = JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'));
        expect(Math.hypot(visita.x - inicio.x, visita.z - inicio.z)).to.be.greaterThan(0.2);
      });
    });
    cy.window().trigger('blur');
    cy.get('#joystick-pad').realMouseUp();
    // Dejamos que termine la inercia y comparamos dos guardados posteriores.
    cy.then(() => Date.now()).then((parada) => {
      cy.window().should((ventana) => {
        const visita = JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'));
        expect(visita.savedAt).to.be.greaterThan(parada + 1000);
      });
    });
    cy.window().then((ventana) => {
      const parado = JSON.parse(ventana.localStorage.getItem('pablo-realm-visit-v1'));
      cy.window().should((actual) => {
        const visita = JSON.parse(actual.localStorage.getItem('pablo-realm-visit-v1'));
        expect(visita.savedAt).to.be.greaterThan(parado.savedAt);
        expect(Math.hypot(visita.x - parado.x, visita.z - parado.z)).to.be.lessThan(0.02);
      });
    });
  });
});
