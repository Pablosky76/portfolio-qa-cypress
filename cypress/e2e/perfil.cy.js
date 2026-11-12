describe('Perfil profesional', () => {
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

  it('PER-02 · navega a todas las secciones desde el menú', () => {
    cy.get('nav[aria-label="Secciones del perfil"] a[href="#experience"]').click();
    cy.location('hash').should('eq', '#experience');
    cy.get('#experience').should('be.visible');
    cy.get('#experience h2').should('not.be.empty');

    cy.get('nav[aria-label="Secciones del perfil"] a[href="#skills"]').click();
    cy.location('hash').should('eq', '#skills');
    cy.get('#skills').should('be.visible');
    cy.get('#skills h2').should('not.be.empty');

    cy.get('nav[aria-label="Secciones del perfil"] a[href="#education"]').click();
    cy.location('hash').should('eq', '#education');
    cy.get('#education').should('be.visible');
    cy.get('#education h2').should('not.be.empty');

    cy.get('nav[aria-label="Secciones del perfil"] a[href="#contacto"]').click();
    cy.location('hash').should('eq', '#contacto');
    cy.get('#contacto').should('be.visible');
    cy.get('#contacto h2').should('not.be.empty');
  });

  it('PER-03 · ofrece destinos profesionales correctos y seguros', () => {
    cy.get('#contacto a[href="mailto:pablogmdev@proton.me"]').should('be.visible');
    cy.get('#contacto a[href="https://github.com/Pablosky76"]').should('have.attr', 'target', '_blank');
    cy.get('#contacto a[href="https://github.com/Pablosky76"]').should('have.attr', 'rel').and('include', 'noopener');

    cy.get('#contacto a[href="https://www.linkedin.com/in/pablogutierrezmata"]').should('have.attr', 'target', '_blank');
    cy.get('#contacto a[href="https://www.linkedin.com/in/pablogutierrezmata"]').should('have.attr', 'rel').and('include', 'noopener');
  });

  // cy.request permite consultar el PDF sin abrir un visor.
  // https://docs.cypress.io/api/commands/request#download-a-pdf-file
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

  it('PER-05 · vuelve a la elección de recorrido', () => {
    cy.get('.world-link').click();
    cy.location('pathname').should('eq', '/');
    cy.get('#welcome').should('be.visible');
    cy.get('#entry-profile').should('exist');
    cy.get('#entry-realm').should('exist');
  });

  // cy.viewport cambia el tamaño de la pantalla del navegador de pruebas.
  // https://docs.cypress.io/api/commands/viewport
  it('PER-06 · mantiene contenido y contacto utilizables en móvil', () => {
    cy.viewport(390, 844);
    cy.get('h1').should('be.visible');
    cy.get('.profile-ctas a[download]').should('be.visible');

    // El contenido no debe ser más ancho que la pantalla (se permite 1 px de redondeo).
    cy.document().then((documento) => {
      const anchoContenido = documento.documentElement.scrollWidth;
      const anchoPantalla = documento.documentElement.clientWidth;
      expect(anchoContenido).to.be.at.most(anchoPantalla + 1);
    });

    cy.get('#contacto').scrollIntoView();
    cy.get('#contacto a[href^="mailto:"]').should('be.visible');
    cy.get('#contacto a[download]').should('be.visible');
    cy.screenshot('perfil-móvil', { capture: 'viewport' });
  });

  it('PER-07 · mantiene contenido y contacto utilizables en escritorio', () => {
    cy.viewport(1440, 900);
    cy.get('h1').should('be.visible');
    cy.get('.profile-ctas a[download]').should('be.visible');

    // El contenido no debe ser más ancho que la pantalla (se permite 1 px de redondeo).
    cy.document().then((documento) => {
      const anchoContenido = documento.documentElement.scrollWidth;
      const anchoPantalla = documento.documentElement.clientWidth;
      expect(anchoContenido).to.be.at.most(anchoPantalla + 1);
    });

    cy.get('#contacto').scrollIntoView();
    cy.get('#contacto a[href^="mailto:"]').should('be.visible');
    cy.get('#contacto a[download]').should('be.visible');
    cy.screenshot('perfil-escritorio', { capture: 'viewport' });
  });
});
