describe('Lectura · pantallas estrechas y controles', () => {
  it('LEC-01 · el perfil cabe en una pantalla de 320 píxeles', () => {
    cy.viewport(320, 780);
    cy.visit('/perfil.html');
    cy.get('h1').should('contain', 'Pablo');
    cy.document().then(doc => {
      expect(doc.documentElement.scrollWidth).to.be.at.most(doc.documentElement.clientWidth);
    });
  });

  it('LEC-02 · la ficha del proyecto cabe en 390 píxeles', () => {
    cy.viewport(390, 780);
    cy.visit('/proyecto.html');
    cy.get('h1').should('contain', 'Un reino de ideas');
    cy.document().then(doc => {
      expect(doc.documentElement.scrollWidth).to.be.at.most(doc.documentElement.clientWidth);
    });
  });

  it('LEC-03 · la mochila se abre en móvil sin desbordamiento y ofrece un cierre amplio', () => {
    cy.viewport(390, 780);
    cy.visit('/');
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-continue').click();
    cy.get('#controls-dialog', { timeout: 60000 }).should('be.visible');
    cy.get('[data-layout="mobile"]').click();
    cy.get('#music-enabled').uncheck();
    cy.get('#controls-confirm').click();
    cy.get('#inventory-action').click();
    cy.get('#inventory-dialog').should('be.visible').then($dialog => {
      expect($dialog[0].scrollWidth).to.be.at.most($dialog[0].clientWidth);
    });
    cy.get('#inventory-close').then($button => {
      const rect = $button[0].getBoundingClientRect();
      expect(rect.width).to.be.at.least(44);
      expect(rect.height).to.be.at.least(44);
    });
    cy.get('#inventory-close').click();
    cy.get('#inventory-action').should('have.focus');
  });
});
