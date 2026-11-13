// Consulta del PDF sin abrir un visor.
// https://docs.cypress.io/api/commands/request#download-a-pdf-file
describe('Documentos · descarga del CV', () => {
  beforeEach(() => {
    cy.visit('/perfil.html');
  });

  it('PER-04 · entrega un CV PDF real desde el enlace de descarga', () => {
    cy.get('.profile-ctas a[download]').should('contain', 'Descargar CV')
      .invoke('attr', 'href').then((href) => {
        cy.request({ url: href, encoding: 'binary' }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.headers['content-type']).to.include('application/pdf');
          // Un PDF empieza por estos cinco caracteres.
          expect(response.body.slice(0, 5)).to.eq('%PDF-');
          expect(response.body.length).to.be.greaterThan(1000);
        });
      });
  });
});
