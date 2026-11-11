import 'cypress-mochawesome-reporter/register';

// Cada caso comienza con el aislamiento de cookies y almacenamiento de Cypress.
// No se ignoran excepciones de la aplicación ni se simulan respuestas del sitio.
Cypress.Commands.add('enterRealm', () => {
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
