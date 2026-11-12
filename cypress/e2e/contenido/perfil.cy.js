describe('Contenido · perfil y enlaces profesionales', () => {
  beforeEach(() => {
    cy.visit('/perfil.html');
  });

  it('PER-01 · presenta identidad, especialidad y experiencia QA', () => {
    cy.title().should('include', 'Perfil profesional');
    cy.get('html').should('have.attr', 'lang', 'es');
    cy.get('h1').should('have.length', 1).and('contain', 'Pablo');
    cy.get('.role').should('contain', 'QA Tester');
    cy.get('#experience').should('contain', 'QA Automation Trainee');
    cy.get('#skills').should('contain', 'Cypress');
    cy.get('#education').should('contain', 'Cypress Automation Bootcamp');
  });

  it('PER-03 · ofrece destinos profesionales correctos y seguros', () => {
    cy.get('#contacto a[href="mailto:pablogmdev@proton.me"]').should('be.visible');
    cy.get('#contacto a[href="https://github.com/Pablosky76"]').should('have.attr', 'target', '_blank');
    cy.get('#contacto a[href="https://github.com/Pablosky76"]').should('have.attr', 'rel').and('include', 'noopener');

    cy.get('#contacto a[href="https://www.linkedin.com/in/pablogutierrezmata"]').should('have.attr', 'target', '_blank');
    cy.get('#contacto a[href="https://www.linkedin.com/in/pablogutierrezmata"]').should('have.attr', 'rel').and('include', 'noopener');
  });
});
