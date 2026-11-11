describe('Perfil profesional', () => {
  beforeEach(() => cy.visit('/perfil.html'));

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
    ['experience', 'skills', 'education', 'contacto'].forEach((section) => {
      cy.get(`nav[aria-label="Secciones del perfil"] a[href="#${section}"]`).click();
      cy.location('hash').should('eq', `#${section}`);
      cy.get(`#${section}`).should('be.visible').find('h2').should('not.be.empty');
    });
  });

  it('PER-03 · ofrece destinos profesionales correctos y seguros', () => {
    cy.get('#contacto a[href="mailto:pablogmdev@proton.me"]').should('be.visible');
    const destinations = [
      'https://github.com/Pablosky76',
      'https://www.linkedin.com/in/pablogutierrezmata'
    ];
    destinations.forEach((href) => {
      cy.get(`#contacto a[href="${href}"]`)
        .should('have.attr', 'target', '_blank')
        .and('have.attr', 'rel').and('include', 'noopener');
    });
  });

  it('PER-04 · entrega un CV PDF real desde el enlace de descarga', () => {
    cy.get('.profile-ctas a[download]').should('contain', 'Descargar CV')
      .invoke('attr', 'href').then((href) => {
        cy.request({ url: href, encoding: 'binary' }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.headers['content-type']).to.include('application/pdf');
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

  [[390, 844, 'móvil'], [1440, 900, 'escritorio']].forEach(([width, height, device], index) => {
    it(`PER-0${6 + index} · mantiene contenido y contacto utilizables en ${device}`, () => {
      cy.viewport(width, height);
      cy.get('h1').should('be.visible');
      cy.get('.profile-ctas a[download]').should('be.visible');
      cy.document().then((doc) => {
        expect(doc.documentElement.scrollWidth, 'sin desbordamiento horizontal')
          .to.be.at.most(doc.documentElement.clientWidth + 1);
      });
      cy.get('#contacto').scrollIntoView();
      cy.get('#contacto a[href^="mailto:"]').should('be.visible');
      cy.get('#contacto a[download]').should('be.visible');
      cy.screenshot(`perfil-${device}`, { capture: 'viewport' });
    });
  });
});
