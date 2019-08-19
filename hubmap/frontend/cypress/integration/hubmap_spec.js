/* eslint no-undef: 0 */
// TODO: Configure eslint to recognize "cy" as a global.
// We don't click <a> tags here since hrefs redirect to cross-domain urls, which use
// stubs (to add/remove cookies). HTTP 304 requested urls are not handled by route/request.
describe('HuBMAP', () => {
  before(() => {
    Cypress.Cookies.debug(true);
    cy.server();
    const api = 'http://localhost:8000/api';
    cy.route(`${api}/?format=json`, 'fixture:base.json');
    cy.route(`${api}/colors/?format=json`, 'fixture:colors.json');
    cy.route(`${api}/genes/?format=json`, 'fixture:genes.json');
    //since redirect urls ( multiple HTTP 303/304) are not intercepted by route, are not recommended in cypress.
    cy.setCookie('email', 'test@gmail.com')
  });

  after(() => {
    cy.server()
    .clearCookie('email')
    const api = 'http://localhost:8000/';
    cy.route(`${api}/api/?format=json`, 'fixture:base.json');
    cy.route(`${api}/api/colors/?format=json`, 'fixture:colors.json');
    cy.route(`${api}/api/genes/?format=json`, 'fixture:genes.json');
    cy.visit('/');
    cy.contains('Login');
    Cypress.Cookies.debug(false);
  })

  it('Has a homepage', () => {
    cy.visit('/');

    // Header:
    cy.contains('Browse');
    cy.contains('Help');

    // Charts:
    cy.contains('# of Cells per Tissue, by Center');
    cy.contains('# Images per Tissue, by Center');
    cy.contains('Caltech');
    cy.contains('Abdomen');

    // Table:
    cy.contains('Experiments From HuBMAP Consortium');
    cy.contains('Imaging Mass Spec.');

    cy.contains('Experiments by Center');

    // Footer:
    cy.contains('Supported by the NIH Common Fund');

    cy.get('#loggedin-menu').should('exist');

    // auth cookie should be present
    cy.getCookie('email').should('exist');

    // UI should reflect this user being logged in
    cy.get('#loggedinemail').should('contain', 'test@gmail.com').should('exist')
    cy.get('#loggedin-menu').children().get('#logout-menuitem').should('exist')
    cy.get('#loggedin-menu').children().get('#logout-menuitem')
      .children()
      .get('#logout')
      .should('exist');
  });

})
