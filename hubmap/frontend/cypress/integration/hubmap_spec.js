/* eslint no-undef: 0 */
// TODO: Configure eslint to recognize "cy" as a global.
describe('HuBMAP', () => {
  before(() => {
    cy.server();
    const api = 'http://localhost:8000/api';
    cy.route(`${api}/?format=json`, 'fixture:base.json');
    cy.route(`${api}/colors/?format=json`, 'fixture:colors.json');
    cy.route(`${api}/genes/?format=json`, 'fixture:genes.json');
  });

  it('Has a homepage', () => {
    cy.visit('/');

    // Header:
    cy.contains('Browse');
    cy.contains('Help');
    cy.contains('Login');

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
  });

  describe('The Login Page', function () {
    before(() => {
      cy.server();
      const api = 'http://localhost:8000/';
      cy.route(`${api}/api/?format=json`, 'fixture:base.json');
      cy.route(`${api}/api/colors/?format=json`, 'fixture:colors.json');
      cy.route(`${api}/api/genes/?format=json`, 'fixture:genes.json');
      cy.route(`${api}/auth/login/globus`, 'fixture:login.json');
      cy.setCookie('email', 'test@gmail.com')
    });

    it('sets auth cookie when logging in via form submission', function () {
      // click login
      cy.get('login').click()
  
      // we should be redirected to / (home)
      cy.url().should('include', '/')

      cy.get("loggedin-menu").should('exist')
  
      // our auth cookie should be present
      cy.getCookie('email').should('exist')
  
      // UI should reflect this user being logged in
      cy.get('loggedinemail').should('contain', 'test')
    })
  })
})
