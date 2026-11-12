describe('Contacto · copia de correo y enlaces', () => {
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


  it('CON-01 · confirma la copia cuando el navegador la permite', () => {
    cy.window().then((ventana) => {
      cy.stub(ventana.navigator.clipboard, 'writeText').resolves().as('copiar');
    });
    cy.get('#contact-action').click();
    cy.findByRole('button', { name: 'Copiar correo' }).click();
    cy.get('@copiar').should('have.been.calledOnceWithExactly', 'pablogmdev@proton.me');
    cy.get('#copy-state').should('have.text', 'Correo copiado');
  });

  it('CON-02 · ofrece una alternativa cuando se rechaza la copia', () => {
    cy.window().then((ventana) => {
      cy.stub(ventana.navigator.clipboard, 'writeText').rejects(new Error('Permiso denegado'));
    });
    cy.get('#contact-action').click();
    cy.findByRole('button', { name: 'Copiar correo' }).click();
    cy.get('#copy-state').should('contain', 'Selecciona el correo para copiarlo');
    cy.get('.contact-email').should('be.visible').and('have.attr', 'href', 'mailto:pablogmdev@proton.me');
  });

  it('CON-03 · el contacto del reino apunta a los perfiles profesionales', () => {
    cy.get('#contact-action').click();
    cy.get('#contact-dialog').findByRole('link', { name: /GitHub/ }).should('have.attr', 'href', 'https://github.com/Pablosky76').and('have.attr', 'rel', 'noopener noreferrer');
    cy.get('#contact-dialog').findByRole('link', { name: /LinkedIn/ }).should('have.attr', 'href', 'https://www.linkedin.com/in/pablogutierrezmata');
  });

  it('CON-04 · se puede consultar el perfil ligero desde el reino', () => {
    cy.findByRole('link', { name: 'Perfil profesional' }).click();
    cy.location('pathname').should('match', /\/perfil(?:\.html)?$/);
    cy.get('h1').should('contain', 'Pablo');
    cy.get('#scene').should('not.exist');
  });
});
