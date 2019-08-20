/* eslint no-undef: 0 */
// TODO: Configure eslint to recognize "cy" as a global.
describe('HuBMAP', () => {
  beforeEach(() => {
    cy.server();
    const api = 'http://localhost:8000/api';
    cy.route(`${api}/?format=json`, 'fixture:base.json');
    cy.route(`${api}/colors/?format=json`, 'fixture:colors.json');
    cy.route(`${api}/genes/?format=json`, 'fixture:genes.json');
    // Mocking the OAuth response and iframe interaction is hard,
    // but the UI really just depends on this cookie:
    cy.setCookie('email', 'test@gmail.com')
  });

  it('Handles un-logged in', () => {
    cy.clearCookie('email', 'test@gmail.com');
    cy.visit('/');
    cy.contains('Login');
  });

  it('Has a homepage', () => {
    cy.visit('/');

    // Header:
    cy.contains('Browse');
    cy.contains('Help');
    cy.contains('Logged in').click();
    cy.contains('Globus email: test@gmail.com');
    cy.contains('Logout from Globus');

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
})
