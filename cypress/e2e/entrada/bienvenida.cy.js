// https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test
describe('Entrada · elección de recorrido', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('ENT-02 · permite cambiar de recorrido manteniendo una sola elección', () => {
    cy.get('label[for="entry-profile"]').click();
    cy.get('#entry-profile').should('be.checked');
    cy.get('#entry-continue').should('be.enabled');
    cy.get('label[for="entry-realm"]').click();
    cy.get('#entry-realm').should('be.checked');
    cy.get('#entry-profile').should('not.be.checked');
    cy.get('#entry-continue').should('be.enabled');
  });
});
