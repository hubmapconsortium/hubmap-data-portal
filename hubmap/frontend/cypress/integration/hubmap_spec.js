/* eslint no-undef: 0 */
// TODO: Configure eslint to recognize "cy" as a global.
describe('HuBMAP', () => {
  beforeEach(() => {
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

  it('Has a working browse menu', () => {
    cy.visit('/');
    cy.contains('Browse').click();
    cy.contains('Data Analysis').click();

    cy.location('pathname').should('eq', '/dataanalysis')
    cy.contains('Search by Tissue'); // TODO: more
    cy.contains('Browse').click();
    cy.contains('Experiments').click();

    cy.location('pathname').should('eq', '/experiments')
    cy.contains('Experiments'); // TODO: more
    cy.contains('Browse').click();
    cy.contains('Pipelines').click();

    cy.location('pathname').should('eq', '/pipelines')
    cy.contains('Pipelines'); // TODO: more
  });
})
