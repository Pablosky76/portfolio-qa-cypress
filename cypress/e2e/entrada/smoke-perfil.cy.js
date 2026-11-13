// https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test
describe('Smoke · Entrada · elección de recorrido', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('ENT-01 · exige elegir un recorrido antes de continuar', () => {
    cy.get('#welcome-title').should('be.visible').and('contain', 'Dos formas de descubrirla');
    cy.get('#entry-continue').should('be.disabled');
    cy.get('#entry-selection').should('contain', 'Elige una opción');
    cy.get('#realm-shell').should('not.be.visible');
  });

  it('ENT-03 · abre el perfil profesional desde la bienvenida', () => {
    cy.get('label[for="entry-profile"]').click();
    cy.get('#entry-continue').click();
    // El alojamiento redirige perfil.html a su URL canónica sin extensión.
    cy.location('pathname').should('eq', '/perfil');
    cy.get('h1').should('be.visible').and('contain', 'Gutiérrez Mata');
    cy.get('canvas').should('not.exist');
  });
});

describe('Smoke · Contenido · perfil y enlaces profesionales', () => {
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
});

// Consulta del PDF sin abrir un visor.
// https://docs.cypress.io/api/commands/request#download-a-pdf-file
describe('Smoke · Documentos · descarga del CV', () => {
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
