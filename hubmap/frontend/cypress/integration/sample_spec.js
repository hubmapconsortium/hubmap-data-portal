/* eslint no-undef: 0 */
// TODO: Configure eslint to recognize "cy" as a global.
describe('HuBMAP', function() {
  it('Has a homepage', function() {
    cy.server();
    cy.route('http://localhost:8000/api/?format=json', 'fixture:base.json');
    cy.route('http://localhost:8000/api/colors/?format=json', 'fixture:colors.json');
    cy.route('http://localhost:8000/api/genes/?format=json', 'fixture:genes.json');

    cy.visit('http://localhost:3000');

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
})
