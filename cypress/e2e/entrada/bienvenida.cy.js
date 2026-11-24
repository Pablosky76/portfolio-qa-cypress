// https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test
describe('Portada · información para selección', () => {
  it('ENT-02 · ofrece el CV y el contacto directamente sin cargar el juego', () => {
    cy.intercept('GET', '**/app.js').as('mundo');
    cy.visit('/');
    cy.findByRole('link', { name: 'Contacto' }).should('be.visible')
      .and('have.attr', 'href', 'mailto:pablogmdev@proton.me');
    cy.findByRole('link', { name: 'Descargar CV' }).should('be.visible')
      .and($link => expect($link).to.have.attr('download')).invoke('attr', 'href').then((href) => {
        cy.request({ url: href, encoding: 'binary' }).then(({ body, headers }) => {
          expect(headers['content-type']).to.include('application/pdf');
          expect(body.slice(0, 5)).to.eq('%PDF-');
        });
      });
    cy.findByRole('link', { name: 'Pruebas' }).should('be.visible')
      .and('have.attr', 'href', 'https://github.com/Pablosky76/portfolio-qa-cypress/tree/main/cypress/e2e');
    cy.findByRole('link', { name: 'Pipeline' }).should('be.visible')
      .and('have.attr', 'href', 'https://github.com/Pablosky76/portfolio-qa-cypress/actions/workflows/cypress.yml');
    cy.get('@mundo.all').should('have.length', 0);
  });
});
